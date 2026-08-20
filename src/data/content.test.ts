import { describe, it, expect } from 'vitest';
import { aggregatedModules as modules, aggregatedScenarios as scenarios, aggregatedCards as flashcards } from './products';


describe('Content Quality Audit', () => {
  it('every module has sources defined', () => {
    modules.forEach(mod => {
      expect(mod.sources).toBeDefined();
      expect(mod.sources?.length).toBeGreaterThan(0);
    });
  });

  it('source URLs use approved official domains', () => {
    const approvedDomains = ['datto.com', 'kaseya.com', 'help.bullphishid.kaseya.com', 'help.one.kaseya.com', 'inky.com'];
    modules.forEach(mod => {
      mod.sources?.forEach(src => {
        if (!src.url) return;
        try {
          const urlObj = new URL(src.url);
          const domain = urlObj.hostname;
          expect(approvedDomains.includes(domain) || domain.endsWith('.datto.com') || domain.endsWith('.kaseya.com')).toBe(true);
        } catch (e) {
          throw new Error(`Invalid URL found in module ${mod.id}: ${src.url}`);
        }
      });
    });
  });

  it('every module has at least one scenario', () => {
    modules.forEach(mod => {
      const moduleScenarios = scenarios.filter(s => s.moduleId === mod.id);
      expect(moduleScenarios.length).toBeGreaterThan(0);
    });
  });

  it('every module has at least one flashcard', () => {
    modules.forEach(mod => {
      const moduleCards = flashcards.filter(c => c.moduleId === mod.id);
      expect(moduleCards.length).toBeGreaterThan(0);
    });
  });

  it('scenario IDs are unique', () => {
    const ids = scenarios.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('flashcard IDs are unique', () => {
    const ids = flashcards.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('every scenario references a valid module', () => {
    const moduleIds = new Set(modules.map(m => m.id));
    scenarios.forEach(s => {
      expect(moduleIds.has(s.moduleId)).toBe(true);
    });
  });

  it('every flashcard references a valid module', () => {
    const moduleIds = new Set(modules.map(m => m.id));
    flashcards.forEach(c => {
      expect(moduleIds.has(c.moduleId)).toBe(true);
    });
  });

  it('no placeholder content is present', () => {
    const placeholderStrings = ['Content pending', 'placeholder', 'Lorem ipsum', 'TODO'];
    
    // Check modules
    modules.forEach(mod => {
      const stringified = JSON.stringify(mod).toLowerCase();
      placeholderStrings.forEach(ph => {
        expect(stringified.includes(ph.toLowerCase())).toBe(false);
      });
    });

    // Check scenarios
    scenarios.forEach(s => {
      const stringified = JSON.stringify(s).toLowerCase();
      placeholderStrings.forEach(ph => {
        expect(stringified.includes(ph.toLowerCase())).toBe(false);
      });
    });
    
    // Check flashcards
    flashcards.forEach(c => {
      const stringified = JSON.stringify(c).toLowerCase();
      placeholderStrings.forEach(ph => {
        expect(stringified.includes(ph.toLowerCase())).toBe(false);
      });
    });
  });
});
