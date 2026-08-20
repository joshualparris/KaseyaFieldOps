import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState } from '../data/types';

interface AppState extends UserState {
  hasCompletedOnboarding?: boolean;
  completeOnboarding: () => void;
  addXP: (amount: number) => void;
  markScenarioCompleted: (scenarioId: string, moduleId: string) => void;
  updateReviewQueue: (cardId: string, isCorrect: boolean) => void;
  resetProgress: () => void;
}

const initialState: UserState & { hasCompletedOnboarding: boolean } = {
  xp: 0,
  completedScenarios: [],
  moduleProgress: {},
  reviewQueue: [],
  hasCompletedOnboarding: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      completeOnboarding: () => set((state) => ({
        hasCompletedOnboarding: true,
        xp: state.xp + 100,
        moduleProgress: {
          ...state.moduleProgress,
          'datto-rmm': 100,
          'kaseya-365': 20,
          'datto-edr': 20,
          'datto-saas-protection': 20,
          'datto-file-protection': 20,
          'datto-backup': 20,
          'datto-azure-backup': 20,
          'darkweb-id': 20,
          'bullphish-id': 20,
          'inky': 20,
        }
      })),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      markScenarioCompleted: (scenarioId, moduleId) => set((state) => {
        if (state.completedScenarios.includes(scenarioId)) return state;
        
        const newCompleted = [...state.completedScenarios, scenarioId];
        // naive progress calculation: just add 10% per scenario for demo
        const currentProgress = state.moduleProgress[moduleId] || 0;
        const newProgress = Math.min(100, currentProgress + 20);
        
        return {
          completedScenarios: newCompleted,
          moduleProgress: { ...state.moduleProgress, [moduleId]: newProgress },
          xp: state.xp + 50, // bonus for completing scenario
        };
      }),
      
      updateReviewQueue: (cardId, isCorrect) => set((state) => {
        const queue = [...state.reviewQueue];
        const existingIdx = queue.findIndex(q => q.cardId === cardId);
        
        const now = new Date();
        let nextReview = new Date();
        
        if (existingIdx >= 0) {
          const item = queue[existingIdx];
          if (isCorrect) {
            // SM-2 logic simplified
            item.interval = item.interval === 0 ? 1 : item.interval === 1 ? 6 : Math.round(item.interval * item.easeFactor);
            item.easeFactor = item.easeFactor + 0.1;
          } else {
            item.interval = 1;
            item.easeFactor = Math.max(1.3, item.easeFactor - 0.2);
          }
          nextReview.setDate(now.getDate() + item.interval);
          item.nextReviewDate = nextReview.toISOString();
          queue[existingIdx] = item;
        } else {
          // New card
          if (isCorrect) {
            nextReview.setDate(now.getDate() + 1);
            queue.push({ cardId, interval: 1, easeFactor: 2.5, nextReviewDate: nextReview.toISOString() });
          } else {
            nextReview.setHours(now.getHours() + 1); // Review again soon
            queue.push({ cardId, interval: 0, easeFactor: 2.5, nextReviewDate: nextReview.toISOString() });
          }
        }
        
        return { 
          reviewQueue: queue,
          xp: state.xp + (isCorrect ? 5 : 1)
        };
      }),

      resetProgress: () => set(initialState),
    }),
    {
      name: 'kaseya-field-ops-storage',
    }
  )
);
