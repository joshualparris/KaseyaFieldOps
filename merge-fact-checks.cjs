const fs = require('fs');
const path = require('path');
const docsDir = 'docs';
const files = fs.readdirSync(docsDir).filter(f => f.startsWith('FACT_CHECK_') && f.endsWith('.md'));

let content = fs.readFileSync(path.join(docsDir, 'CONTENT_FACT_CHECK.md'), 'utf8');

// If we already appended subagent audits, we should strip them before appending again to avoid duplication
const separatorIndex = content.indexOf('## Subagent Audits');
if (separatorIndex !== -1) {
    content = content.substring(0, separatorIndex);
}

content += '\n\n## Subagent Audits\n\n';

for (const f of files) {
  content += fs.readFileSync(path.join(docsDir, f), 'utf8') + '\n\n---\n\n';
}

fs.writeFileSync(path.join(docsDir, 'CONTENT_FACT_CHECK.md'), content);
console.log('Merged FACT_CHECK files.');
