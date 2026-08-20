import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState, ReviewItem, Mistake, FieldTicketCase, ModuleCompetency, ConfidenceLevel, ReviewRating, ScenarioAttempt, ActiveShift } from '../data/types';
import { calculateNextReview, calculateMastery } from '../lib/learning/engine';

const CURRENT_SCHEMA_VERSION = 3;

interface AppState extends UserState {
  hasCompletedOnboarding?: boolean;
  completeOnboarding: () => void;
  addXP: (amount: number) => void;
  markScenarioCompleted: (scenarioId: string, moduleId: string) => void;
  
  // Learning Engine Actions
  processReviewResult: (result: { itemId: string, itemType: 'flashcard' | 'scenario_decision' | 'mistake_repair' | 'ticket_case', moduleId: string, rating: ReviewRating, confidence: ConfidenceLevel | null }) => void;
  addMistake: (mistake: Omit<Mistake, 'id' | 'repairCount' | 'resolved'>) => void;
  resolveMistake: (mistakeId: string) => void;
  addTicketCase: (ticket: Omit<FieldTicketCase, 'id'>) => void;
  addScenarioAttempt: (attempt: Omit<ScenarioAttempt, 'id'>) => void;
  updateCompetency: (moduleId: string, area: keyof ModuleCompetency, amount: number) => void;
  
  // Setup/Reset
  resetProgress: () => void;
  
  // Shift State
  activeShift: ActiveShift | null;
  startShift: (scenarioIds: string[]) => void;
  endShift: () => void;
  markShiftTicketResolved: (scenarioId: string) => void;
}

const defaultCompetency: ModuleCompetency = {
  knowledge: 0, recognition: 0, investigation: 0, decisionMaking: 0, procedure: 0, documentation: 0, retention: 0
};

const initialState: UserState & { hasCompletedOnboarding: boolean, activeShift: ActiveShift | null } = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  xp: 0,
  completedScenarios: [],
  competencies: {},
  reviewQueue: [],
  mistakeBank: [],
  ticketCases: [],
  scenarioAttempts: [],
  hasCompletedOnboarding: false,
  activeShift: null,
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
        const activeShift = state.activeShift ? { ...state.activeShift, mistakesThisShift: state.activeShift.mistakesThisShift + 1 } : null;
        return { mistakeBank: [...state.mistakeBank, newMistake], ...(activeShift ? { activeShift } : {}) };
      }),

      resolveMistake: (mistakeId) => set((state) => ({
        mistakeBank: state.mistakeBank.map(m => m.id === mistakeId ? { ...m, resolved: true, repairCount: m.repairCount + 1 } : m)
      })),

      addTicketCase: (ticketData) => set((state) => {
        const id = 'tkt-' + Date.now().toString(36);
        return { ticketCases: [...state.ticketCases, { ...ticketData, id }] };
      }),

      addScenarioAttempt: (attemptData) => set((state) => {
        const id = 'att-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        return { scenarioAttempts: [...state.scenarioAttempts, { ...attemptData, id }] };
      }),

      updateCompetency: (moduleId, area, amount) => set((state) => {
        const comps = { ...state.competencies };
        if (!comps[moduleId]) comps[moduleId] = { ...defaultCompetency };
        comps[moduleId][area] = Math.min(100, Math.max(0, comps[moduleId][area] + amount));
        return { competencies: comps };
      }),

      startShift: (scenarioIds) => set({ 
        activeShift: {
          id: 'shift-' + Date.now().toString(36),
          startedAt: new Date().toISOString(),
          ticketIds: scenarioIds,
          resolvedTicketIds: [],
          mistakesThisShift: 0
        }
      }),
      endShift: () => set({ activeShift: null }),
      markShiftTicketResolved: (scenarioId) => set((state) => {
        if (!state.activeShift) return state;
        return {
          activeShift: {
            ...state.activeShift,
            resolvedTicketIds: [...state.activeShift.resolvedTicketIds, scenarioId]
          }
        };
      }),

      resetProgress: () => set(initialState),
    }),
    {
      name: 'kaseya-field-ops-storage',
      version: CURRENT_SCHEMA_VERSION,
      migrate: (persistedState: any, version: number) => {
        const oldState = persistedState as any;
        if (version < 3) {
          return {
            ...initialState,
            ...oldState,
            scenarioAttempts: oldState.scenarioAttempts || [],
            reviewQueue: (oldState.reviewQueue || []).map((q: any) => ({
              ...q,
              itemType: q.itemType || 'flashcard',
              itemId: q.itemId || q.cardId || `legacy-${Date.now()}`
            }))
          };
        }
        return persistedState;
      },
    }
  )
);
