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
  
  // Sort by nextReviewDate (oldest first), then by interval for ties
  dueReviews.sort((a, b) => {
    const timeDiff = new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
    if (timeDiff !== 0) return timeDiff;
    return a.interval - b.interval;
  });
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
  const availableScenarios = aggregatedScenarios.filter(s => !state.completedScenarios.includes(s.id));
  if (availableScenarios.length > 0) {
    let targetScenario = availableScenarios[0];
    
    if (state.completedScenarios.length > 0) {
      // Find weakest module
      let weakestModuleId: string | null = null;
      let weakestScore = Infinity;
      
      for (const [moduleId, comps] of Object.entries(state.competencies)) {
        const vals = Object.values(comps).filter(v => v > 0);
        if (vals.length > 0) {
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
          if (avg < weakestScore) {
            weakestScore = avg;
            weakestModuleId = moduleId;
          }
        }
      }
      
      if (weakestModuleId) {
        const weakScenarios = availableScenarios.filter(s => s.moduleId === weakestModuleId);
        if (weakScenarios.length > 0) {
          targetScenario = weakScenarios[0];
        }
      }
    } else {
      // Brand new learner: look for orientation or first module
      const orientation = availableScenarios.find(s => s.moduleId === 'orientation' || s.title.toLowerCase().includes('intro'));
      if (orientation) targetScenario = orientation;
    }
    
    tasks.push({
      id: `task-prac-${targetScenario.id}`,
      type: 'practical_activity',
      referenceId: targetScenario.id,
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
  
  // Simple deterministic interleave
  reviewsAndMistakes.sort((a, b) => a.id.localeCompare(b.id));

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
