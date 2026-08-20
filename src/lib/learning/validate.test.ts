import { describe, it, expect } from 'vitest';
import { aggregatedModules, aggregatedScenarios, aggregatedCards } from '../../data/products/index';

describe('Content Structural Integrity & Graph Verification', () => {
  it('should have unique IDs across all scenarios and flashcards', () => {
    const ids = new Set<string>();
    for (const sc of aggregatedScenarios) {
      expect(ids.has(sc.id)).toBe(false);
      ids.add(sc.id);
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

  it('should verify graph reachability, termination, and detect orphans', () => {
    for (const sc of aggregatedScenarios) {
      const stepIds = new Set(Object.keys(sc.steps));
      expect(stepIds.size).toBeGreaterThan(0);
      expect(stepIds.has(sc.firstStepId)).toBe(true);

      const reachable = new Set<string>();
      const queue = [sc.firstStepId];
      let hasTerminalCorrectPath = false;

      while (queue.length > 0) {
        const curr = queue.shift()!;
        if (!reachable.has(curr)) {
          reachable.add(curr);
          const step = sc.steps[curr];
          expect(step).toBeDefined();

          for (const opt of step.options) {
            if (opt.nextStepId) {
              expect(stepIds.has(opt.nextStepId)).toBe(true);
              queue.push(opt.nextStepId);
            } else if (opt.isCorrect) {
              hasTerminalCorrectPath = true;
            }
          }
        }
      }

      for (const stepId of stepIds) {
        if (!reachable.has(stepId)) {
          throw new Error('Orphan node detected: Scenario ' + sc.id + ' has unreachable step ' + stepId);
        }
      }

      expect(hasTerminalCorrectPath).toBe(true);
    }
  });

  it('generates the exact JSON audit ledger and coverage report', () => {
    const fs = require('fs');
    const path = require('path');
    
    const ledger = [];
    
    const addClaim = (product, file, type, id, claimText) => {
      ledger.push({
        product: product,
        file: file,
        itemType: type,
        itemId: id,
        claim: claimText || "",
        verdict: "UNRESOLVED", // we will patch this later
        sourceUrl: "N/A",
        sourceTitle: "N/A",
        sourceExcerptOrSection: "N/A",
        checkedDate: "2026-08-20",
        action: "none",
        notes: "Automated extraction"
      });
    };

    for (const sc of aggregatedScenarios) {
      const file = "src/data/products/" + sc.moduleId + ".ts";
      addClaim(sc.moduleId, file, 'scenario-title', sc.id, sc.title);
      addClaim(sc.moduleId, file, 'scenario-description', sc.id, sc.description);
      for (const stepKey in sc.steps) {
        const step = sc.steps[stepKey];
        addClaim(sc.moduleId, file, 'scenario-step-text', sc.id + "/" + step.id, step.text);
        
        step.options.forEach((opt, idx) => {
           addClaim(sc.moduleId, file, 'scenario-option-text', sc.id + "/" + step.id + "/opt-" + idx, opt.text);
           addClaim(sc.moduleId, file, 'scenario-option-feedback', sc.id + "/" + step.id + "/opt-" + idx, opt.feedback);
        });
      }
    }
    for (const fc of aggregatedCards) {
      const file = "src/data/products/" + fc.moduleId + ".ts";
      addClaim(fc.moduleId, file, 'flashcard-question', fc.id, fc.question);
      addClaim(fc.moduleId, file, 'flashcard-answer', fc.id, fc.answer);
    }

    fs.writeFileSync('docs/content-fact-check.json', JSON.stringify(ledger, null, 2));
  });
});
