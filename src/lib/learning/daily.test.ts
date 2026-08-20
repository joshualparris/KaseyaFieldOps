import { describe, it, expect } from 'vitest';
import { generateDailySession } from './daily';
import { isLeech, calculateRetentionTrend } from './engine';
import type { UserState } from '../../data/types';

describe('Learning Engine: Daily Session Generation', () => {
  const getMockState = (): UserState => ({
    schemaVersion: 2,
    xp: 100,
    completedScenarios: [],
    competencies: {},
    reviewQueue: [],
    mistakeBank: [],
    ticketCases: [],
  });

  it('generates an empty session when no data is available', () => {
    const state = getMockState();
    // Assuming scenarios length from aggregated is > 0, it should at least pull 1 practical activity and 1 product selection
    const session = generateDailySession(state);
    
    expect(session.tasks.some(t => t.type === 'product_selection')).toBe(true);
    // Might have a practical activity if scenarios exist
  });

  it('prioritizes due reviews up to the limit', () => {
    const state = getMockState();
    const now = new Date();
    
    // Create 15 due reviews
    for (let i = 0; i < 15; i++) {
      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - (15 - i)); // due for a while
      state.reviewQueue.push({
        itemId: `fc-${i}`,
        itemType: 'flashcard',
        moduleId: 'general',
        firstSeen: pastDate.toISOString(),
        lastReviewed: null,
        nextReviewDate: pastDate.toISOString(),
        reviewCount: 0,
        successCount: 0,
        failureCount: 0,
        streak: 0,
        interval: 0,
        easeFactor: 2.5,
        difficulty: 0.5,
        masteryEstimate: 0,
        lastConfidence: null,
      });
    }

    const session = generateDailySession(state);
    const reviewTasks = session.tasks.filter(t => t.type === 'review');
    
    // Should cap at 10 reviews
    expect(reviewTasks.length).toBe(10);
    // Should select the oldest ones first, so fc-0 through fc-9 should be present
    const reviewIds = reviewTasks.map(t => t.referenceId);
    expect(reviewIds).toContain('fc-0');
    expect(reviewIds).not.toContain('fc-14'); // The most recent one shouldn't be included
  });

  it('includes up to 2 unresolved mistakes', () => {
    const state = getMockState();
    
    // Create 3 unresolved mistakes
    for (let i = 0; i < 3; i++) {
      state.mistakeBank.push({
        id: `mstk-${i}`,
        date: new Date().toISOString(),
        moduleId: 'general',
        activityType: 'scenario',
        userAnswer: 'wrong',
        expectedReasoning: 'right',
        explanation: 'because',
        confidenceBeforeAnswer: 'confident',
        severity: 'medium',
        repairCount: 0,
        resolved: false,
      });
    }

    const session = generateDailySession(state);
    const mistakeTasks = session.tasks.filter(t => t.type === 'mistake_repair');
    
    expect(mistakeTasks.length).toBe(2);
  });

  it('handles zero cards due (all cards future dated)', () => {
    const state = getMockState();
    const now = new Date();
    
    // Add 5 cards, all due in the future
    for (let i = 0; i < 5; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(now.getDate() + 5);
      state.reviewQueue.push({
        itemId: `fc-${i}`,
        itemType: 'flashcard',
        moduleId: 'general',
        firstSeen: now.toISOString(),
        lastReviewed: now.toISOString(),
        nextReviewDate: futureDate.toISOString(),
        reviewCount: 1,
        successCount: 1,
        failureCount: 0,
        streak: 1,
        interval: 5,
        easeFactor: 2.5,
        difficulty: 0.5,
        masteryEstimate: 50,
        lastConfidence: 'confident',
      });
    }

    const session = generateDailySession(state);
    const reviewTasks = session.tasks.filter(t => t.type === 'review');
    expect(reviewTasks.length).toBe(0); // None should be due
  });

  it('handles ties in priority scoring by falling back to ease factor/interval', () => {
    const state = getMockState();
    const now = new Date();
    
    // Add 15 cards due today, all with same due date
    for (let i = 0; i < 15; i++) {
      state.reviewQueue.push({
        itemId: `fc-${i}`,
        itemType: 'flashcard',
        moduleId: 'general',
        firstSeen: now.toISOString(),
        lastReviewed: now.toISOString(),
        nextReviewDate: now.toISOString(),
        reviewCount: 1,
        successCount: 1,
        failureCount: 0,
        streak: 1,
        interval: i, // different intervals to break ties
        easeFactor: 2.5,
        difficulty: 0.5,
        masteryEstimate: 0,
        lastConfidence: 'confident',
      });
    }

    const session = generateDailySession(state);
    const reviewTasks = session.tasks.filter(t => t.type === 'review');
    expect(reviewTasks.length).toBe(10);
    // Lower intervals should be prioritized in a tie
    const reviewIds = reviewTasks.map(t => t.referenceId);
    expect(reviewIds).toContain('fc-0'); // Lowest interval
    expect(reviewIds).not.toContain('fc-14'); // Highest interval
  });
});

describe('Leech Detection', () => {
  it('should not mark a new item as a leech', () => {
    const item = {
      itemId: 'test', itemType: 'flashcard' as const, moduleId: 'gen', firstSeen: '', lastReviewed: null, nextReviewDate: '',
      reviewCount: 1, successCount: 1, failureCount: 0, streak: 1, interval: 1, easeFactor: 2.5, difficulty: 0.5, masteryEstimate: 0, lastConfidence: null
    };
    expect(isLeech(item)).toBe(false);
  });

  it('should mark an item with 5+ failures as a leech', () => {
    const item = {
      itemId: 'test', itemType: 'flashcard' as const, moduleId: 'gen', firstSeen: '', lastReviewed: null, nextReviewDate: '',
      reviewCount: 5, successCount: 0, failureCount: 5, streak: 0, interval: 1, easeFactor: 1.3, difficulty: 1, masteryEstimate: 0, lastConfidence: null
    };
    expect(isLeech(item)).toBe(true);
  });
});

describe('Retention Trend', () => {
  it('returns null if there are no items', () => {
    expect(calculateRetentionTrend([])).toBeNull();
  });

  it('should calculate the correct percentage based on success and review counts', () => {
    const item1 = {
      itemId: 't1', itemType: 'flashcard' as const, moduleId: 'gen', firstSeen: '', lastReviewed: null, nextReviewDate: '',
      reviewCount: 4, successCount: 3, failureCount: 1, streak: 3, interval: 5, easeFactor: 2.5, difficulty: 0.5, masteryEstimate: 50, lastConfidence: null
    };
    const item2 = {
      itemId: 't2', itemType: 'flashcard' as const, moduleId: 'gen', firstSeen: '', lastReviewed: null, nextReviewDate: '',
      reviewCount: 6, successCount: 6, failureCount: 0, streak: 6, interval: 10, easeFactor: 2.8, difficulty: 0.2, masteryEstimate: 80, lastConfidence: null
    };
    
    // Total reviews = 10, total success = 9 => 90%
    expect(calculateRetentionTrend([item1, item2])).toBe(90);
  });
});
