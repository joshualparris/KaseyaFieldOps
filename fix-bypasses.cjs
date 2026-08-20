const fs = require('fs');

let rmmContent = fs.readFileSync('src/data/products/datto-rmm.ts', 'utf8');
rmmContent = rmmContent.replace(
  /as it bypasses network isolation/g,
  "as the Datto RMM agent maintains connectivity during isolation"
);
fs.writeFileSync('src/data/products/datto-rmm.ts', rmmContent);

let k365Content = fs.readFileSync('src/data/products/kaseya-365.ts', 'utf8');
k365Content = k365Content.replace(
  /\(which bypasses isolation\)/g,
  "(which maintains connectivity during isolation)"
);
fs.writeFileSync('src/data/products/kaseya-365.ts', k365Content);
