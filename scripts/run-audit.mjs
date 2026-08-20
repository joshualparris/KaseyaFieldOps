import { aggregatedModules, aggregatedScenarios, aggregatedCards } from '../src/data/products/index.ts';
import { extractAndSave } from './extract-factual-claims.mjs';
import { validateLedger } from './validate-factual-ledger.mjs';

try {
  extractAndSave(aggregatedModules, aggregatedScenarios, aggregatedCards);
  const result = validateLedger();
  console.log(result);
} catch (e) {
  console.error(e);
}
