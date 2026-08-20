import { describe, it, expect } from 'vitest';
import { ModuleSchema, ScenarioSchema, FlashcardSchema } from '../types';
import { module as dattoBackup, scenarios as dbScenarios, cards as dbCards } from './datto-backup';
import { module as azureBackup, scenarios as abScenarios, cards as abCards } from './datto-azure-backup';
import { module as fileProtection, scenarios as fpScenarios, cards as fpCards } from './datto-file-protection';

describe('Datto Backup Family Data Integrity', () => {
  const products = [
    { name: 'Datto Backup', module: dattoBackup, scenarios: dbScenarios, cards: dbCards },
    { name: 'Datto Azure Backup', module: azureBackup, scenarios: abScenarios, cards: abCards },
    { name: 'Datto File Protection', module: fileProtection, scenarios: fpScenarios, cards: fpCards },
  ];

  for (const product of products) {
    describe(`${product.name}`, () => {
      it('module validates against schema', () => {
        expect(() => ModuleSchema.parse(product.module)).not.toThrow();
      });

      it('scenarios validate against schema', () => {
        for (const scenario of product.scenarios) {
          expect(() => ScenarioSchema.parse(scenario)).not.toThrow();
          // Ensure firstStepId actually exists in steps
          expect(scenario.steps[scenario.firstStepId]).toBeDefined();
        }
      });

      it('flashcards validate against schema', () => {
        for (const card of product.cards) {
          expect(() => FlashcardSchema.parse(card)).not.toThrow();
        }
      });
    });
  }
});
