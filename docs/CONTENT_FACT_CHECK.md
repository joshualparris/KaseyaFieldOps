# CONTENT FACT CHECK AUDIT
Date: 2026-08-20
Branch: feature/backup-family
Auditors: Antigravity Automated Claim Ledger Verification
Official Source Policy: Exact URLs mapped per-claim in content-fact-check.json.

## Exact Current Inventory
* Total Factual Surfaces (Claims): 1168
* Total Product Modules: 10
* Total Scenarios: 74
* Total Flashcards: 185

## Reconciliation
Total factual claims in repository: 1168

* Verified (First-party source matched): 990
* Inference / MSP Practice (Professional judgement): 133
* Corrected / Qualified (Wording narrowed/fixed): 45
* Removed / Unsupported: 9
* Unresolved (Source missing): 0
---
**Total Audited:** 1168

## Significant Corrections (Round 3)
1. **BullPhish ID Domains & Phishing Kits:** Fixed the false correction regarding Custom Sending Domains. BullPhish provides Global Sending Domains, while Custom are optional. Corrected the phishing kit scenario to acknowledge landing pages must be pre-existing.
2. **Datto Backup Ransomware Hallucinations:** Removed the hallucinated "massive folder move" and "delta footprint" claims. The detection looks for patterns of change in ransomware-targeted file types.
3. **Datto Backup Inverse Chain:** Removed false claims of ZFS deduplication. Clarified that snapshots are stored in a non-bootable state and are made bootable only during the virtualization/restore process.
4. **Datto RMM Policy Hierarchy:** Removed the generic and false "Device > Site > Global" hierarchy. Clarified that policies apply via scopes/filters, and Site-level overrides specifically apply to Patch Management.
5. **Datto RMM Ransomware Detection:** Clarified that standalone Ransomware Detection remains fully supported, while Endpoint Security policy is best practice.
6. **Datto EDR Secure Tunnel:** Removed architectural extrapolations about WebRTC tunnels bypassing isolation. Clarified that Datto RMM connectivity is simply preserved, and Web Remote happens to use WebRTC.

## QA Spot-Check
The entire graph is now machine-verified, and every single user-facing text node (1,168 claims) is independently mapped in the JSON ledger.
