const fs = require('fs');
const path = require('path');
const dir = 'src/data/products';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.includes('.test.'));
const words = ['unsupported', 'deprecated', 'legacy', 'bypasses ', 'routes through', 'intercepts'];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    words.forEach(word => {
      if (line.toLowerCase().includes(word.toLowerCase())) {
        console.log(`${file}:${i+1}: contains '${word}' - ${line.trim().substring(0, 150)}`);
      }
    });
  });
});
