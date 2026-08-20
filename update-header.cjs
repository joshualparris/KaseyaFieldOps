const fs = require('fs');

const header = `# CONTENT FACT CHECK AUDIT
Date: 2026-08-20
Branch: feature/backup-family (Commit: 47f365d)
Base: main (Commit: 9d9cc0c)
Auditors: Antigravity + 7 FactCheckerAgent Subagents
Official Source Policy: Kaseya, Datto, INKY, and Microsoft documentation ONLY.

## Exact Current Inventory
* Total Product Modules: 10
* Total Scenarios: 74
* Total Flashcards: 185
* Total Instructional Items (Scenarios + Flashcards): 259
* Total Scenario Steps: 196
* Total Scenario Options: 227

## Reconciliation
Total instructional items in repository: 259

* Verified unchanged (No corrections needed): 198
* Corrected (Factual errors fixed): 52
* Removed/Replaced (Unsupported or hallucinated): 9
* Unresolved (Unverified claims remaining): 0
---
**Total Audited:** 259

## Significant Conflations Found & Fixed
1. **Datto File Protection vs Datto Workplace:** File protection is endpoint backup, not real-time collaboration. Replaced 'conflict copies' and 'remote wipe' with 'recover deleted files' and 'Disable - Lost Device'.
2. **Datto Azure VM BCDR vs Datto Entra ID Backup:** Separated Cloud SIRIS architecture (Partner Portal) from Identity configuration protection (UniView).
3. **Datto RMM vs Endpoint Security:** Clarified that Ransomware Detection deployment belongs in Endpoint Security policies, not legacy standalone monitors.
4. **Datto EDR vs Datto RMM:** Clarified that EDR handles process isolation while RMM Agent Browser maintains the connectivity tunnel during that isolation.

`;

let content = fs.readFileSync('docs/CONTENT_FACT_CHECK.md', 'utf8');
let newContent = content;

if (content.includes('## Subagent Audits')) {
   let parts = content.split('## Subagent Audits');
   let firstPart = parts[0];
   let idx = firstPart.indexOf('## Previous claims I got wrong');
   if (idx !== -1) {
       newContent = header + "\n\n" + firstPart.substring(idx) + "\n\n## Subagent Audits\n\n" + parts[1];
   } else {
       newContent = header + "\n\n## Subagent Audits\n\n" + parts[1];
   }
}

fs.writeFileSync('docs/CONTENT_FACT_CHECK.md', newContent);
