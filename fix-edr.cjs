const fs = require('fs');
let content = fs.readFileSync('src/data/products/datto-edr.ts', 'utf8');

// Replace any unescaped single quote in the word "EDR's"
content = content.replace(/Datto EDR's/g, "Datto EDR\\'s");

// Replace any unescaped single quote in the word "Datto's"
content = content.replace(/Datto's/g, "Datto\\'s");

content = content.replace(/they "do not consume/g, "they \\\"do not consume");
content = content.replace(/they 'do not consume/g, "they \\'do not consume");
content = content.replace(/are free"/g, 'are free\\"');
content = content.replace(/are free'/g, "are free\\'");

fs.writeFileSync('src/data/products/datto-edr.ts', content);
