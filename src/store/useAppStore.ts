import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState, ReviewItem, Mistake, RealTicketCase, ModuleCompetency, ConfidenceLevel, ReviewRating } from '../data/types';
import { calculateNextReview, calculateMastery } from '../lib/learning/engine';

const CURRENT_SCHEMA_VERSION = 2;

interface AppState extends UserState {
  hasCompletedOnboarding?: boolean;
  completeOnboarding: () => void;
  addXP: (amount: number) => void;
  markScenarioCompleted: (scenarioId: string, moduleId: string) => void;
  
  // Learning Engine Actions
  processReviewResult: (result: { itemId: string, itemType: 'flashcard' | 'scenario_decision', moduleId: string, rating: ReviewRating, confidence: ConfidenceLevel | null }) => void;
  addMistake: (mistake: Omit<Mistake, 'id' | 'repairCount' | 'resolved'>) => void;
  resolveMistake: (mistakeId: string) => void;
  addTicketCase: (ticket: Omit<RealTicketCase, 'id'>) => void;
  updateCompetency: (moduleId: string, area: keyof ModuleCompetency, amount: number) => void;
  
  // Setup/Reset
  resetProgress: () => void;
  
  // Shift State
  activeShiftQueue: string[];
  isShiftActive: boolean;
  startShift: (scenarioIds: string[]) => void;
  endShift: () => void;
}

const defaultCompetency: ModuleCompetency = {
  knowledge: 0, recognition: 0, investigation: 0, decisionMaking: 0, procedure: 0, documentation: 0, retention: 0
};

const initialState: UserState & { hasCompletedOnboarding: boolean, activeShiftQueue: string[], isShiftActive: boolean } = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  xp: 0,
  completedScenarios: [],
  competencies: {},
  reviewQueue: [],
  mistakeBank: [],
  ticketCases: [],
  hasCompletedOnboarding: false,
  activeShiftQueue: [],
  isShiftActive: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      completeOnboarding: () => set(() => ({
        // User requested: STRIP OUT fake XP and mastery data. First run starts at zero.
        hasCompletedOnboarding: true,
      })),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      markScenarioCompleted: (scenarioId) => set((state) => {
        if (state.completedScenarios.includes(scenarioId)) return state;
        const newCompleted = [...state.completedScenarios, scenarioId];
        
        return {
          completedScenarios: newCompleted,
          xp: state.xp + 50,
        };
      }),

      processReviewResult: ({ itemId, itemType, moduleId, rating, confidence }) => set((state) => {
        const queue = [...state.reviewQueue];
        const idx = queue.findIndex(q => q.itemId === itemId);
        
        let item: ReviewItem;
        const nowStr = new Date().toISOString();

        if (idx >= 0) {
          item = { ...queue[idx] };
          queue.splice(idx, 1);
        } else {
          item = {
            itemId,
            itemType,
            moduleId,
            firstSeen: nowStr,
            lastReviewed: null,
            nextReviewDate: nowStr,
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
        }

        // Apply SM-2 based spacing engine
        const updatedItem = calculateNextReview(item, rating, confidence);
        updatedItem.masteryEstimate = calculateMastery(updatedItem);
        queue.push(updatedItem);

        // Update competency based on mastery
        const comps = { ...state.competencies };
        if (!comps[updatedItem.moduleId]) {
          comps[updatedItem.moduleId] = { ...defaultCompetency };
        }
        
        // Simple mapping: flashcards boost knowledge/retention
        if (updatedItem.itemType === 'flashcard') {
           comps[updatedItem.moduleId].knowledge = Math.min(100, comps[updatedItem.moduleId].knowledge + (rating === 'easy' ? 2 : rating === 'good' ? 1 : 0));
        }

        return { 
          reviewQueue: queue,
          competencies: comps,
          xp: state.xp + (rating === 'easy' || rating === 'good' ? 5 : 1)
        };
      }),

      addMistake: (mistakeData) => set((state) => {
        const id = 'mstk-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        const newMistake: Mistake = {
          ...mistakeData,
          id,
          repairCount: 0,
          resolved: false,
        };
        return { mistakeBank: [...state.mistakeBank, newMistake] };
      }),

      resolveMistake: (mistakeId) => set((state) => ({
        mistakeBank: state.mistakeBank.map(m => m.id === mistakeId ? { ...m, resolved: true, repairCount: m.repairCount + 1 } : m)
      })),

      addTicketCase: (ticketData) => set((state) => {
        const id = 'tkt-' + Date.now().toString(36);
        return { ticketCases: [...state.ticketCases, { ...ticketData, id }] };
      }),

      updateCompetency: (moduleId, area, amount) => set((state) => {
        const comps = { ...state.competencies };
        if (!comps[moduleId]) comps[moduleId] = { ...defaultCompetency };
        comps[moduleId][area] = Math.min(100, Math.max(0, comps[moduleId][area] + amount));
        return { competencies: comps };
      }),

      startShift: (scenarioIds) => set({ activeShiftQueue: scenarioIds, isShiftActive: true }),
      endShift: () => set({ activeShiftQueue: [], isShiftActive: false }),

      resetProgress: () => set(initialState),
    }),
    {
      name: 'kaseya-field-ops-storage',
      version: CURRENT_SCHEMA_VERSION,
      migrate: (persistedState: any, version: number) => {
        if (version === 0 || version === 1) {
          // Migrate old state to new state
          const oldState = persistedState as any;
          const newState = { ...initialState };
          
          newState.xp = typeof oldState.xp === 'number' ? oldState.xp : 0;
          newState.completedScenarios = Array.isArray(oldState.completedScenarios) ? oldState.completedScenarios : [];
          newState.hasCompletedOnboarding = !!oldState.hasCompletedOnboarding;
          
          // Map old reviewQueue to new ReviewItem format
          if (Array.isArray(oldState.reviewQueue)) {
             newState.reviewQueue = oldState.reviewQueue.map((oldItem: any) => ({
               itemId: oldItem.cardId || `legacy-${Date.now()}`,
               itemType: 'flashcard' as const,
               moduleId: 'unknown',
               firstSeen: new Date().toISOString(),
               lastReviewed: null,
               nextReviewDate: oldItem.nextReviewDate || new Date().toISOString(),
               reviewCount: oldItem.interval > 0 ? 1 : 0,
               successCount: oldItem.interval > 0 ? 1 : 0,
               failureCount: oldItem.interval === 0 ? 1 : 0,
               streak: oldItem.interval > 0 ? 1 : 0,
               interval: oldItem.interval || 0,
               easeFactor: oldItem.easeFactor || 2.5,
               difficulty: 0.5,
               masteryEstimate: 0,
               lastConfidence: null
             }));
          }
          return newState;
        }
        return persistedState;
      },
    }
  )
);
