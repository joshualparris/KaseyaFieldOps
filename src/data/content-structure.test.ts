import { describe, it, expect } from 'vitest';
import { aggregatedModules as modules, aggregatedScenarios as scenarios, aggregatedCards as flashcards } from './products';

const APPROVED_DOMAINS = [
  'datto.com',
  'kaseya.com',
  'help.one.kaseya.com',
  'continuity.datto.com',
  'rmm.datto.com',
  'edr.datto.com',
  'help.fileprotection.datto.com',
  'saasprotection.datto.com',
  'help.bullphishid.kaseya.com',
  'help.inky.com',
  'cisa.gov', // For general practices if needed
];

describe('Content Structure and Evidence Coverage', () => {
  it('source URLs use approved authoritative domains', () => {
    modules.forEach(mod => {
      mod.sources?.forEach(src => {
        const url = new URL(src.url);
        const isApproved = APPROVED_DOMAINS.some(domain => url.hostname.endsWith(domain));
        if (!isApproved) {
          throw new Error(`Invalid source domain: ${url.hostname} in source ${src.id}`);
        }
        expect(isApproved).toBe(true);
      });
    });
  });

  it('every product module has 100% evidence coverage for scenarios and flashcards', () => {
    // Collect all valid source IDs globally
    const validSourceIds = new Set<string>();
    modules.forEach(mod => {
      mod.sources?.forEach(src => validSourceIds.add(src.id));
    });

    const coverageReport: Record<string, { claims: number; sourced: number; percent: number }> = {};

    modules.forEach(mod => {
      let totalClaims = 0;
      let sourcedClaims = 0;

      const modScenarios = scenarios.filter(s => s.moduleId === mod.id);
      modScenarios.forEach(scen => {
        Object.values(scen.steps).forEach(step => {
          totalClaims++;
          if (step.sourceRefs && step.sourceRefs.length > 0) {
            step.sourceRefs.forEach(ref => {
              if (!validSourceIds.has(ref)) {
                throw new Error(`Invalid source reference: ${ref} in step ${step.id}`);
              }
            });
            sourcedClaims++;
          }
        });
      });

      const modCards = flashcards.filter(c => c.moduleId === mod.id);
      modCards.forEach(card => {
        totalClaims++;
        if (card.sourceRefs && card.sourceRefs.length > 0) {
          card.sourceRefs.forEach(ref => {
            if (!validSourceIds.has(ref)) {
              throw new Error(`Invalid source reference: ${ref} in card ${card.id}`);
            }
          });
          sourcedClaims++;
        }
      });

      const percent = totalClaims === 0 ? 100 : (sourcedClaims / totalClaims) * 100;
      coverageReport[mod.id] = { claims: totalClaims, sourced: sourcedClaims, percent };
      
      // Ensure 100% coverage
      if (percent < 100) {
         throw new Error(`Module ${mod.id} is below 100% evidence coverage. Covered ${sourcedClaims}/${totalClaims} (${percent}%). Check scenarios and flashcards for missing sourceRefs.`);
      }
      expect(percent).toBe(100);
    });

    console.log("Evidence Coverage Report:");
    console.table(coverageReport);
  });
});
