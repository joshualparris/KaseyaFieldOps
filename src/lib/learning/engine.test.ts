import { describe, it, expect, vi } from 'vitest';
import { calculateNextReview, calculateMastery } from './engine';
import type { ReviewItem } from '../../data/types';

const baseItem: ReviewItem = {
  itemId: 'test-card-1',
  itemType: 'flashcard',
  moduleId: 'datto-rmm',
  firstSeen: '2026-08-01T00:00:00Z',
  lastReviewed: null,
  nextReviewDate: '2026-08-01T00:00:00Z',
  reviewCount: 0,
  successCount: 0,
  failureCount: 0,
  streak: 0,
  interval: 0,
  easeFactor: 2.5,
  difficulty: 0.5,
  masteryEstimate: 0,
  lastConfidence: null,
};

describe('Learning Engine: SM-2 Spaced Repetition', () => {

  it('initializes correct nextReviewDate for first successful review', () => {
    const fakeNow = new Date('2026-08-02T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(fakeNow);

    const result = calculateNextReview(baseItem, 'good', 'confident');
    
    expect(result.reviewCount).toBe(1);
    expect(result.successCount).toBe(1);
    expect(result.streak).toBe(1);
    expect(result.interval).toBe(1); // First successful interval is 1 day
    
    // nextReviewDate should be 1 day from fakeNow
    const expectedNext = new Date(fakeNow);
    expectedNext.setDate(expectedNext.getDate() + 1);
    expect(result.nextReviewDate).toBe(expectedNext.toISOString());

    vi.useRealTimers();
  });

  it('penalizes highly confident incorrect answers heavily', () => {
    const fakeNow = new Date('2026-08-02T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(fakeNow);

    const result = calculateNextReview(baseItem, 'again', 'highly_confident');
    
    expect(result.failureCount).toBe(1);
    expect(result.streak).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.difficulty).toBeGreaterThan(0.5); // Difficulty increases
    
    // nextReviewDate should be only a few hours away (4 hours)
    const expectedNext = new Date(fakeNow);
    expectedNext.setHours(expectedNext.getHours() + 4);
    expect(result.nextReviewDate).toBe(expectedNext.toISOString());

    vi.useRealTimers();
  });

  it('increases interval properly on consecutive correct answers', () => {
    let item = calculateNextReview(baseItem, 'good', 'confident'); // Day 1, int: 1
    item = calculateNextReview(item, 'good', 'confident'); // Day 2, int: 6
    
    expect(item.streak).toBe(2);
    expect(item.interval).toBe(6);
    
    item = calculateNextReview(item, 'good', 'confident'); // Day 3, int: 6 * 2.5 = 15
    expect(item.streak).toBe(3);
    expect(item.interval).toBe(15); // Math.round(6 * 2.5)
  });
});

describe('Learning Engine: Mastery Calculation', () => {
  it('returns 0 mastery for unreviewed items', () => {
    const item = { ...baseItem };
    expect(calculateMastery(item)).toBe(0);
  });

  it('increases mastery on consecutive successes', () => {
    const item = { 
      ...baseItem,
      reviewCount: 3,
      successCount: 3,
      streak: 3,
      interval: 15,
      easeFactor: 2.5
    };
    const mastery = calculateMastery(item);
    expect(mastery).toBeGreaterThan(0);
    expect(mastery).toBeLessThan(100);
    // Interval score: 15/30 * 40 = 20
    // Streak score: 3/5 * 40 = 24
    // Ease score: (2.5-1.3)/1.7 * 20 = 14.1
    // Total approx 58
    expect(mastery).toBe(58);
  });

  it('penalizes mastery for high failure rates', () => {
    const item = { 
      ...baseItem,
      reviewCount: 10,
      successCount: 5,
      failureCount: 5, // 50% failure
      streak: 1,
      interval: 1,
      easeFactor: 1.5
    };
    const mastery = calculateMastery(item);
    // Even if it was recently correct, the high failure rate pulls it down
    expect(mastery).toBeLessThan(20);
  });
});
