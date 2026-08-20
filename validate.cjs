const fs = require('fs');
const path = require('path');
const dir = 'src/data/products';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.includes('.test.'));

let error = false;
let totalModules = 0;
let totalScenarios = 0;
let totalFlashcards = 0;
let totalSteps = 0;
let totalOptions = 0;
let globalIds = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Quick parse for IDs using regex is tricky. Let's do a more robust approach.
  // We can't execute the TS directly without transpiling, but we can do a solid regex check or parse JSON-like structures.
  
  // Count Scenarios
  const scenarioMatches = content.match(/id:\s*['"]([^'"]+)['"],\s*moduleId:\s*['"]([^'"]+)['"]/g) || [];
  totalScenarios += scenarioMatches.length;

  // Flashcards (they also have id and moduleId, but usually an answer property)
  const flashcardMatches = content.match(/question:\s*['"]/g) || [];
  totalFlashcards += flashcardMatches.length;

  // Since both scenarios and flashcards use id and moduleId, the above totalScenarios + totalFlashcards 
  // is just an approximation if we rely on regex. Let's use a better method.
});

console.log('Validating structure... (Using regex is risky for deep validation, let me compile a TS runner)');
