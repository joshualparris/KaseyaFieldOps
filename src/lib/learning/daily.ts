import type { UserState } from '../../data/types';
import { aggregatedScenarios } from '../../data/products';

export type SessionTaskType = 'review' | 'mistake_repair' | 'practical_activity' | 'product_selection';

export interface SessionTask {
  id: string;
  type: SessionTaskType;
  referenceId: string; // The ID of the review item, mistake, or scenario
}

export interface DailySession {
  tasks: SessionTask[];
  estimatedMinutes: number;
}

export function generateDailySession(state: UserState): DailySession {
  const tasks: SessionTask[] = [];
  const now = new Date();
  
  // 1. Due spaced reviews (Priority 1)
  // Get items due today or earlier
  const dueReviews = state.reviewQueue.filter(r => new Date(r.nextReviewDate) <= now);
  
  // Sort by nextReviewDate (oldest first) and limit to max 10 for a 10-minute session
  dueReviews.sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());
  const selectedReviews = dueReviews.slice(0, 10);
  
  selectedReviews.forEach(r => {
    tasks.push({
      id: `task-rev-${r.itemId}`,
      type: 'review',
      referenceId: r.itemId,
    });
  });

  // 2. Recent Mistakes (Priority 2)
  // Get unresolved mistakes or recent ones (e.g. less than 3 repairs)
  const unresolvedMistakes = state.mistakeBank.filter(m => !m.resolved && m.repairCount < 3);
  unresolvedMistakes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first
  
  const selectedMistakes = unresolvedMistakes.slice(0, 2); // Max 2 mistake repairs per day
  selectedMistakes.forEach(m => {
    tasks.push({
      id: `task-mstk-${m.id}`,
      type: 'mistake_repair',
      referenceId: m.id,
    });
  });

  // 3. One short practical activity (Scenario Drill)
  // Find a scenario that hasn't been completed yet, or one with a weak competency
  const availableScenarios = aggregatedScenarios.filter(s => !state.completedScenarios.includes(s.id));
  if (availableScenarios.length > 0) {
    // Pick a random one for interleaving, or we could pick based on lowest competency
    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    tasks.push({
      id: `task-prac-${availableScenarios[randomIndex].id}`,
      type: 'practical_activity',
      referenceId: availableScenarios[randomIndex].id,
    });
  }

  // 4. Product-selection retrieval drill
  // A generic task for the shift simulator or product map drill
  tasks.push({
    id: `task-prodsel-${Date.now()}`,
    type: 'product_selection',
    referenceId: 'mixed-triage-drill',
  });

  // Interleave the tasks to avoid monotony
  // We'll keep the practical activity for the end, but shuffle reviews and mistakes
  const reviewsAndMistakes = tasks.filter(t => t.type === 'review' || t.type === 'mistake_repair');
  const otherTasks = tasks.filter(t => t.type !== 'review' && t.type !== 'mistake_repair');
  
  // Simple Fisher-Yates shuffle for reviews and mistakes
  for (let i = reviewsAndMistakes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reviewsAndMistakes[i], reviewsAndMistakes[j]] = [reviewsAndMistakes[j], reviewsAndMistakes[i]];
  }

  const finalTasks = [...reviewsAndMistakes, ...otherTasks];
  
  // Estimate time: Review/Mistake (30s), Practical (4m), ProdSel (2m)
  let estimatedMinutes = 0;
  finalTasks.forEach(t => {
    if (t.type === 'review' || t.type === 'mistake_repair') estimatedMinutes += 0.5;
    else if (t.type === 'practical_activity') estimatedMinutes += 4;
    else if (t.type === 'product_selection') estimatedMinutes += 2;
  });

  return {
    tasks: finalTasks,
    estimatedMinutes: Math.ceil(estimatedMinutes),
  };
}
