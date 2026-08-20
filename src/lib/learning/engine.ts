import type { ReviewItem, ReviewRating, ConfidenceLevel } from '../../data/types';

/**
 * Calculates the next review date and parameters based on SM-2 variant.
 */
export function calculateNextReview(
  item: ReviewItem,
  rating: ReviewRating,
  confidence: ConfidenceLevel | null
): ReviewItem {
  const now = new Date();
  const newItem = { ...item };
  
  newItem.lastReviewed = now.toISOString();
  newItem.reviewCount += 1;
  newItem.lastConfidence = confidence;

  // Map rating to a quality score 0-5
  let quality = 0;
  switch (rating) {
    case 'again': quality = 0; break; // Complete blackout
    case 'hard':  quality = 3; break; // Correct with serious difficulty
    case 'good':  quality = 4; break; // Correct with hesitation
    case 'easy':  quality = 5; break; // Perfect response
  }

  // Adjust for confidence if provided
  if (confidence === 'guessing' && quality > 0) {
    quality = Math.max(1, quality - 2); // Guessed right is barely correct
  } else if (confidence === 'highly_confident' && quality === 0) {
    quality = 0; // Confident but wrong = bad, needs rapid review
    newItem.difficulty = Math.min(1, newItem.difficulty + 0.2); // Increase difficulty
  }

  if (quality >= 3) {
    // Correct answer
    newItem.successCount += 1;
    newItem.streak += 1;

    if (newItem.reviewCount === 1) {
      newItem.interval = 1;
    } else if (newItem.reviewCount === 2) {
      newItem.interval = 6;
    } else {
      newItem.interval = Math.round(newItem.interval * newItem.easeFactor);
    }
  } else {
    // Incorrect answer
    newItem.failureCount += 1;
    newItem.streak = 0;
    newItem.interval = 1;
  }

  // Calculate new Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  newItem.easeFactor = newItem.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newItem.easeFactor < 1.3) newItem.easeFactor = 1.3;
  if (newItem.easeFactor > 3.0) newItem.easeFactor = 3.0; // Cap to prevent intervals blowing up

  // Set next review date
  const nextDate = new Date(now);
  nextDate.setDate(now.getDate() + newItem.interval);
  
  // For 'again' or wrong highly confident answers, review sooner (e.g. 4 hours)
  if (quality === 0) {
    nextDate.setDate(now.getDate());
    nextDate.setHours(now.getHours() + 4);
  }
  
  newItem.nextReviewDate = nextDate.toISOString();
  
  return newItem;
}

/**
 * Calculates a mastery estimate (0-100) for a specific item based on history.
 */
export function calculateMastery(item: ReviewItem): number {
  if (item.reviewCount === 0) return 0;
  
  // Base mastery on streak and interval
  let mastery = 0;
  
  if (item.streak > 0) {
    // Interval contributes to mastery - knowing it after 30 days is better than 1 day
    const intervalScore = Math.min(30, item.interval) / 30 * 40; // up to 40%
    const streakScore = Math.min(5, item.streak) / 5 * 40; // up to 40%
    const easeScore = ((item.easeFactor - 1.3) / 1.7) * 20; // up to 20%
    
    mastery = intervalScore + streakScore + easeScore;
  }
  
  // Penalty for high difficulty or many failures
  const failureRatio = item.failureCount / (item.successCount + item.failureCount);
  mastery -= (failureRatio * 20); 
  
  return Math.max(0, Math.min(100, Math.round(mastery)));
}

/**
 * Detects if an item has become a "leech" (too hard to remember).
 * A leech typically has a high failure count compared to successes, or a very low ease factor.
 */
export function isLeech(item: ReviewItem): boolean {
  // If we haven't reviewed it enough, it's not a leech yet
  if (item.reviewCount < 4) return false;
  
  // High failure count
  if (item.failureCount >= 5) return true;
  
  // Or high failure ratio with low ease factor
  const failureRatio = item.failureCount / item.reviewCount;
  if (failureRatio > 0.5 && item.easeFactor <= 1.5) return true;
  
  return false;
}

/**
 * Calculates a retention trend across a set of review items.
 * Returns a value between 0 (failing everything) and 100 (retaining everything well).
 * This can be used for the dashboard.
 */
export function calculateRetentionTrend(queue: ReviewItem[]): number | null {
  if (!queue || queue.length === 0) return null; 
  
  // Filter to items that have been reviewed at least once
  const reviewedItems = queue.filter(q => q.reviewCount > 0);
  if (reviewedItems.length === 0) return null;
  
  let totalSuccess = 0;
  let totalReviews = 0;
  
  reviewedItems.forEach(item => {
    totalSuccess += item.successCount;
    totalReviews += item.reviewCount;
  });
  
  if (totalReviews === 0) return null;
  
  const retention = (totalSuccess / totalReviews) * 100;
  return Math.max(0, Math.min(100, Math.round(retention)));
}
