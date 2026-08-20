import { describe, it, expect } from 'vitest';
import { modules } from '../../data/modules';
import { scenarios } from '../../data/scenarios';
import { deck } from '../../data/deck';

describe('Content Integrity Validation', () => {
  it('should have unique module IDs', () => {
    const ids = modules.map(m => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique scenario IDs', () => {
    const ids = scenarios.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique flashcard IDs', () => {
    const ids = deck.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should only reference valid module IDs in scenarios, flashcards, and ticket cases', () => {
    const validModuleIds = new Set(modules.map(m => m.id));

    scenarios.forEach(s => {
      expect(validModuleIds.has(s.moduleId)).toBe(true);
    });

    deck.forEach(c => {
      expect(validModuleIds.has(c.moduleId)).toBe(true);
    });
  });

  it('should ensure all scenario step options point to a valid step or end the scenario', () => {
    scenarios.forEach(scenario => {
      const stepIds = Object.keys(scenario.steps);
      expect(stepIds.includes(scenario.firstStepId)).toBe(true);

      stepIds.forEach(stepId => {
        const step = scenario.steps[stepId];
        step.options.forEach(option => {
          if (option.nextStepId) {
            expect(stepIds.includes(option.nextStepId)).toBe(true);
          }
        });
      });
    });
  });

  it('should ensure every scenario has at least one completion path (a path with no nextStepId)', () => {
    scenarios.forEach(scenario => {
      const stepIds = Object.keys(scenario.steps);
      let hasCompletion = false;

      stepIds.forEach(stepId => {
        const step = scenario.steps[stepId];
        step.options.forEach(option => {
          if (!option.nextStepId) {
            hasCompletion = true;
          }
        });
      });

      expect(hasCompletion).toBe(true);
    });
  });
});
