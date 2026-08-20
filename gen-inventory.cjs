const fs = require('fs');
const path = require('path');
const dir = 'src/data/products';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.includes('.test.'));
let report = '# Content Inventory\n\n| Product | File | Branch | Scenarios | Cards | Status |\n|---|---|---|---|---|---|\n';

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const scRegex = /id:\s*['"][^'"]+['"],\s*moduleId:/g;
  const numScenarios = (content.match(scRegex) || []).length;

  const cardsMatch = content.match(/export const cards.*?(?:=\s*\[)([\s\S]*?)\];/);
  let numCards = 0;
  if (cardsMatch) {
     numCards = (cardsMatch[1].match(/\{/g) || []).length;
  }
  
  let status = 'Complete';
  if (numScenarios === 0 && numCards <= 1) status = 'Stub';
  
  let nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
  let name = nameMatch ? nameMatch[1] : file;

  report += `| ${name} | ${file} | feature/backup-family | ${numScenarios} | ${numCards} | ${status} |\n`;
});

fs.writeFileSync('inventory.md', report);
console.log(report);
