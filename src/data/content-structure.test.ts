import { describe, it, expect } from 'vitest';
import { aggregatedModules as modules, aggregatedScenarios as scenarios, aggregatedCards as flashcards } from './products';

const APPROVED_DOMAINS = [
  'datto.com',
  'kaseya.com',
  'fileprotection.datto.com',
  'help.fileprotection.datto.com',
  'help.inky.com',
  'help.bullphishid.kaseya.com',
  'help.darkwebid.kaseya.com',
  'saasprotection.datto.com',
  'help.one.kaseya.com',
  'rmm.datto.com',
  'continuity.datto.com',
  'edr.datto.com',
  'microsoft.com'
];

describe('Content Structure and Evidence Coverage', () => {
  it('source URLs use approved authoritative domains and are not fake', () => {
    modules.forEach(mod => {
      mod.sources?.forEach(src => {
        if (!src.url) return; // Allow omitted URLs for unverified claims, but if present must be real
        expect(src.url).not.toContain('/pending'); // No fake urls
        
        const url = new URL(src.url);
        const hostname = url.hostname;
        
        const isApproved = APPROVED_DOMAINS.some(domain => 
          hostname === domain || hostname.endsWith(`.${domain}`)
        );
        
        expect(isApproved).toBe(true);
      });
    });
  });

  it('every product module has 100% evidence coverage and references only its own sources', () => {
    // Map module ID to its valid source IDs
    const moduleSources = new Map<string, Set<string>>();
    modules.forEach(mod => {
      const validIds = new Set<string>();
      mod.sources?.forEach(src => validIds.add(src.id));
      moduleSources.set(mod.id, validIds);
    });

    modules.forEach(mod => {
      let total = 0;
      let covered = 0;
      
      const modSources = moduleSources.get(mod.id) || new Set();

      const modScenarios = scenarios.filter(s => s.moduleId === mod.id);
      for (const scenario of modScenarios) {
        for (const step of Object.values(scenario.steps)) {
          total++;
          if (step.evidenceRefs && step.evidenceRefs.length > 0) {
            let valid = true;
            for (const ref of step.evidenceRefs) {
              if (!modSources.has(ref.sourceId)) {
                valid = false;
                console.log(`Invalid sourceId: ${ref.sourceId} in module ${mod.id}. Valid sources:`, Array.from(modSources));
              }
            }
            if (valid) covered++;
          } else {
            console.log('Missing evidenceRefs on step:', step.id, 'in module', mod.id);
          }
        }
      }

      const modCards = flashcards.filter(c => c.moduleId === mod.id);
      for (const card of modCards) {
        total++;
        if (card.evidenceRefs && card.evidenceRefs.length > 0) {
          let valid = true;
          for (const ref of card.evidenceRefs) {
            if (!modSources.has(ref.sourceId)) {
              valid = false;
            }
          }
          if (valid) covered++;
        }
      }

      if (total > 0) {
        const percent = (covered / total) * 100;
        if (percent < 100) {
           throw new Error(`Module ${mod.id} is below 100% evidence coverage. Covered ${covered}/${total} (${percent}%). Check scenarios and flashcards for missing or cross-module sourceRefs.`);
        }
        expect(percent).toBe(100);
      }
    });
  });

  it('content counts meet regression baselines', () => {
    const baselines = {
      'datto-edr': { scenarios: 11, cards: 16 }
    };
    
    for (const [moduleId, baseline] of Object.entries(baselines)) {
      const modScenarios = scenarios.filter(s => s.moduleId === moduleId);
      const modCards = flashcards.filter(c => c.moduleId === moduleId);
      
      expect(modScenarios.length).toBeGreaterThanOrEqual(baseline.scenarios);
      expect(modCards.length).toBeGreaterThanOrEqual(baseline.cards);
    }
  });
});
