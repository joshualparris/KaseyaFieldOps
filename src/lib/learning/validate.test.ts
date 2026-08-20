import { describe, it, expect } from 'vitest';
import { aggregatedModules, aggregatedScenarios, aggregatedCards } from '../../data/products/index';

describe('Content Structural Integrity', () => {
  it('should have unique IDs across all scenarios and flashcards', () => {
    const ids = new Set<string>();
    
    for (const sc of aggregatedScenarios) {
      expect(ids.has(sc.id)).toBe(false);
      ids.add(sc.id);
      
      expect(sc.steps[sc.firstStepId]).toBeDefined();
      
      for (const stepKey in sc.steps) {
        const step = sc.steps[stepKey];
        expect(step.id).toBe(stepKey);
        
        for (const opt of step.options) {
          if (opt.nextStepId) {
            expect(sc.steps[opt.nextStepId]).toBeDefined();
          }
        }
      }
    }
    
    for (const fc of aggregatedCards) {
      expect(ids.has(fc.id)).toBe(false);
      ids.add(fc.id);
    }
  });

  it('should have matching module IDs', () => {
    const moduleIds = new Set(aggregatedModules.map(m => m.id));
    
    for (const sc of aggregatedScenarios) {
      expect(moduleIds.has(sc.moduleId)).toBe(true);
    }
    for (const fc of aggregatedCards) {
      expect(moduleIds.has(fc.moduleId)).toBe(true);
    }
  });

  it('prints the exact inventory', () => {
    let totalSteps = 0;
    let totalOptions = 0;
    
    for (const sc of aggregatedScenarios) {
      totalSteps += Object.keys(sc.steps).length;
      for (const stepKey in sc.steps) {
        totalOptions += sc.steps[stepKey].options.length;
      }
    }
    
    console.log(`\n\n=== INVENTORY REPORT ===`);
    console.log(`Modules: ${aggregatedModules.length}`);
    console.log(`Scenarios: ${aggregatedScenarios.length}`);
    console.log(`Flashcards: ${aggregatedCards.length}`);
    console.log(`Scenario Steps: ${totalSteps}`);
    console.log(`Scenario Options: ${totalOptions}`);
    console.log(`Total Learning Items (Scenarios + Flashcards): ${aggregatedScenarios.length + aggregatedCards.length}`);
    console.log(`========================\n\n`);
  });
});
