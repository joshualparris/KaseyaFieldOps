import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { useAppStore } from './useAppStore';

beforeAll(() => {
  const storageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(globalThis, 'localStorage', { value: storageMock });
});

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAppStore.getState().resetProgress();
  });

  it('should initialize with default state', () => {
    const state = useAppStore.getState();
    expect(state.xp).toBe(0);
    expect(state.completedScenarios).toEqual([]);
    expect(state.moduleProgress).toEqual({});
    expect(state.reviewQueue).toEqual([]);
    expect(state.hasCompletedOnboarding).toBe(false);
  });

  describe('addXP', () => {
    it('should add xp to the current state', () => {
      useAppStore.getState().addXP(100);
      expect(useAppStore.getState().xp).toBe(100);

      useAppStore.getState().addXP(50);
      expect(useAppStore.getState().xp).toBe(150);
    });
  });

  describe('markScenarioCompleted', () => {
    it('should mark a scenario as completed and add xp', () => {
      useAppStore.getState().markScenarioCompleted('scenario-1', 'module-1');
      const state = useAppStore.getState();
      expect(state.completedScenarios).toContain('scenario-1');
      expect(state.moduleProgress['module-1']).toBe(20);
      expect(state.xp).toBe(50);
    });

    it('should cap module progress at 100', () => {
      for (let i = 0; i < 6; i++) {
        useAppStore.getState().markScenarioCompleted(`scenario-${i}`, 'module-1');
      }
      const state = useAppStore.getState();
      expect(state.moduleProgress['module-1']).toBe(100);
    });

    it('should not add xp if scenario is already completed', () => {
      useAppStore.getState().markScenarioCompleted('scenario-1', 'module-1');
      useAppStore.getState().markScenarioCompleted('scenario-1', 'module-1');
      const state = useAppStore.getState();
      expect(state.completedScenarios.length).toBe(1);
      expect(state.xp).toBe(50);
    });
  });

  describe('updateReviewQueue', () => {
    it('should add a new card to the queue when correct', () => {
      useAppStore.getState().updateReviewQueue('card-1', true);
      const state = useAppStore.getState();
      expect(state.reviewQueue.length).toBe(1);
      expect(state.reviewQueue[0].cardId).toBe('card-1');
      expect(state.reviewQueue[0].interval).toBe(1);
      expect(state.reviewQueue[0].easeFactor).toBe(2.5);
      expect(state.xp).toBe(5);
    });

    it('should add a new card to the queue when incorrect', () => {
      useAppStore.getState().updateReviewQueue('card-2', false);
      const state = useAppStore.getState();
      expect(state.reviewQueue.length).toBe(1);
      expect(state.reviewQueue[0].cardId).toBe('card-2');
      expect(state.reviewQueue[0].interval).toBe(0);
      expect(state.reviewQueue[0].easeFactor).toBe(2.5);
      expect(state.xp).toBe(1);
    });

    it('should update an existing card in the queue when correct', () => {
      useAppStore.getState().updateReviewQueue('card-3', true);
      useAppStore.getState().updateReviewQueue('card-3', true);
      const state = useAppStore.getState();
      expect(state.reviewQueue.length).toBe(1);
      expect(state.reviewQueue[0].cardId).toBe('card-3');
      expect(state.reviewQueue[0].interval).toBe(6);
      expect(state.reviewQueue[0].easeFactor).toBeCloseTo(2.6);
      expect(state.xp).toBe(10); // 5 + 5
    });

    it('should update an existing card in the queue when incorrect', () => {
      useAppStore.getState().updateReviewQueue('card-4', true);
      useAppStore.getState().updateReviewQueue('card-4', false);
      const state = useAppStore.getState();
      expect(state.reviewQueue.length).toBe(1);
      expect(state.reviewQueue[0].cardId).toBe('card-4');
      expect(state.reviewQueue[0].interval).toBe(1);
      expect(state.reviewQueue[0].easeFactor).toBeCloseTo(2.3);
      expect(state.xp).toBe(6); // 5 + 1
    });
  });
});
