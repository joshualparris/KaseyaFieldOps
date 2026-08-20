# Factual Audit (2026-08-20)

## Overview
A fourth-pass, transparent factual audit has been completed. The previous "100% coverage" metric was identified as an artifact of bulk automation. This audit replaces that approach with a strictly manual/honest mapping of claims to authoritative sources. 

Where explicit KB URLs could not be confidently mapped to specific operational steps, the claims have been accurately downgraded to `needs-live-portal-confirmation` or `partially-verified` rather than artificially assigning a generic module URL to them.

## Key Changes
- **Evidence Model**: Replaced `sourceRefs` array with `evidenceRefs` object array supporting strict statuses: `verified`, `partially-verified`, `official-sources-conflict`, `general-practice`, `needs-live-portal-confirmation`, and `unsupported`.
- **Datto EDR Restored**: The 11 scenarios and 16 flashcards that were lost during v3 have been restored and placed under the strict structural tests baseline regression guard.
- **Kaseya 365 Corrections**: Accurately mapped User and Endpoint pillars based on explicit Help Center docs. RMM Policy conflict was updated to correctly reflect that precedence depends on the policy type.
- **Azure Backup Fix**: Adjusted terminology away from "immutable" to "versioned" where appropriate, matching File Protection.
- **SaaS Protection**: Corrected wording to "up to three times a day" and specified the exact restore folder naming convention.

## Confidence Levels
Because this audit honestly reflects the mapping of claims to KB URLs without faking links, the confidence levels are mixed, reflecting the reality of relying on public documentation vs live portal experience.

- **Datto RMM**: MEDIUM CONFIDENCE. (Many operational steps require live portal confirmation).
- **Datto EDR**: MEDIUM CONFIDENCE. (General management workflows need live validation).
- **Kaseya 365**: HIGH CONFIDENCE. (Composition lists explicitly verified).
- **Datto BCDR**: HIGH CONFIDENCE. (Inverse Chain, Screenshot, Virtualization verified).
- **Datto Azure Backup**: MEDIUM CONFIDENCE. (Workflows require portal confirmation).
- **Datto SaaS Protection**: HIGH CONFIDENCE. (Frequency and retention verified).
- **File Protection**: MEDIUM CONFIDENCE.
- **BullPhish ID & INKY**: MEDIUM CONFIDENCE.
- **Dark Web ID**: MEDIUM CONFIDENCE. (Taxonomy explicitly corrected to distinguish botnets from direct malware/keyloggers).
