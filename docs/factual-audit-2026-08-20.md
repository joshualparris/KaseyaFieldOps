# Kaseya Field Ops - Second-Pass Corrective Factual Audit Report

## Repository State
- **Branch:** `fix/audit-and-repair`
- **Updates:** Merged `main` cleanly into this branch, preserving all newer UI components and testing frameworks.
- **Testing:** The structural testing script `content.test.ts` was renamed to `content-structure.test.ts` to reflect its actual scope (verifying IDs, presence of sources, and absence of placeholders, rather than factual correctness). A new claim-level mapping (`supports: ["scenario:id", "flashcard:id"]`) enforces that source metadata explicitly ties to defined UI elements.

## Regression Repair
- **Datto EDR Content Restored:** The previous audit mistakenly deleted hundreds of lines of valid Datto EDR scenarios (handling false positives, living off the land, triage prioritization, full IR chain). 
  - **Before Restoration (End of 1st Audit):** 1 scenario, 4 flashcards.
  - **After Restoration & Verification:** 11 detailed scenarios, 16 flashcards.
  - **Action Taken:** Each scenario claim was manually verified against official Datto documentation. Path exclusions were explicitly called out as dangerous, and behavioral delay in ransomware encryption (requiring rollback) was correctly explained.

## Product Audit Table & Confidence

| Module | Confidence | Summary of Actions & Qualifications |
| :--- | :--- | :--- |
| **Datto RMM** | HIGH | Verified Execution Context, Web Remote, Agent Browser, and policy hierarchy. Sources mapped directly to scenarios. |
| **Datto EDR** | HIGH | Restored full incident-response workflows. Qualified "always" statements regarding isolation. Verified Smart Investigate and Network Isolation. |
| **Datto Backup (BCDR)** | HIGH | Verified SIRIS vs ALTO, Local/Cloud Virtualization, Inverse Chain, and Screenshot Verification. Replaced generic product page source with specific Datto Continuity Help documentation. |
| **Datto Backup for Azure** | MEDIUM | **OFFICIAL SOURCES CONFLICT.** The product marketing page lists Azure Blob Storage as "coming soon", whereas the technical KB (KB370000000046) explicitly supports it. The application now explicitly teaches this discrepancy and warns the technician to check the live portal before committing to a client. Verified "Virtual SIRIS" architecture. |
| **Datto File Protection** | HIGH | Verified file-level endpoints, 180-day retention, and distinction from Endpoint Backup/SaaS Protection. |
| **Datto SaaS Protection** | HIGH | Verified M365/Google Workspace coverage, Infinite Cloud Retention (ICR) defaults, cross-user restore, and Backupify migration. |
| **Dark Web ID** | HIGH | Verified Live Search vs botnet data, PSA integration, and that credential exposure does not strictly imply a current valid password. |
| **BullPhish ID** | HIGH | Qualified INKY integration. While INKY handles BPID without manual IP allowlisting inside INKY, the technician still must select BPID in INKY's phishing-awareness settings AND configure M365 Advanced Delivery. |
| **INKY** | HIGH | Clarified Graphus EOL timeline (June 30, 2027) based on current Kaseya documentation. Graphus migration instructions were updated to state Graphus must be disabled either via INKY setup or manually *before* installing INKY to prevent conflicts. |
| **Kaseya 365** | HIGH | Verified Endpoint vs User bundles, deployment prerequisites (e.g., legacy AV removal), and qualified absolute statements around global policy baseline exceptions. |

## Official-Source Contradictions
- **Datto Backup for Microsoft Azure - Blob Storage:** 
  - *Source A:* `https://www.datto.com/products/backup-for-microsoft-azure/` states Blob storage is "coming soon".
  - *Source B:* `https://continuity.datto.com/help/Content/kb/DBMA/KB370000000046.htm` treats Azure Blob Storage as supported.
  - *Resolution:* Included a specific flashcard `fc-azure-2` explicitly warning the technician about the conflicting documentation and advising a live portal check.

## Factual Corrections Made in this Pass
1. **Graphus Migration:** Explicitly noted Graphus must be disabled first to prevent conflicts during INKY deployment.
2. **BullPhish ID / INKY Integration:** Adjusted the wording to ensure technicians understand M365 Advanced Delivery is still required, even if INKY automatically handles the IPs itself.
3. **Absolute Statements:** Audited `kaseya-365.ts` to replace "always," "never," and "100%" with qualified guidelines ("generally preferred," "avoid," "thoroughly verified").
4. **Source Specificity:** All generic `supports` strings were replaced with strict `scenario:id.step` and `flashcard:id` references to make the fact-check auditable.
5. **Azure Blob Storage:** Documented the official contradiction.

## Remaining Uncertainty
- **Graphus Automated Migration Tooling:** As the June 30, 2027 EOL approaches, the exact UI prompts in KaseyaOne for migrating from Graphus to INKY may change. The application currently teaches the required architectural sequence rather than specific UI button clicks to future-proof the knowledge.
- **Azure Blob Storage Support:** As noted, official public documentation remains divided. 

The repository now accurately balances verifiable facts, official source mapping, and the practical nuances of a live MSP environment without discarding complex technical workflows.
