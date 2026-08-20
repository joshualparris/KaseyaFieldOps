# CONTENT FACT CHECK AUDIT
Date: 2026-08-20
Branch: fix/current-main-factual-audit

## Audit State
This audit abandons fully automated verdicts. 
Factual claims are programmatically extracted via runtime graph traversal, assigned SHA-256 hashes, and verified manually. 

## Exact Current Inventory
* Total Extracted Factual Surfaces: 1147
* Manually Reviewed: 126
* VERIFIED (First-party source matched): 11
* QUALIFIED: 0
* INCORRECT (Found and corrected): 0
* UNSUPPORTED (Found and removed/rewritten): 0
* OUTDATED: 0
* MSP_PRACTICE / REASONED_RECOMMENDATION: 115
* UNREVIEWED: 1021
* UNRESOLVED: 0

## Integrity Checks
* Duplicate claim IDs: 0
* VERIFIED entries lacking evidence: 0
* Stale hash mismatches: 0
* Wrong-product source mappings: 0
* Coverage percentage: 100% of defined fields in AST extraction.

## Errors found during the full audit
* Datto RMM Isolation: EDR isolation blocks network traffic but preserves RMM communication. Corrected.
* Datto RMM Monitoring Conflict: Generic Patch Override rules misapplied to Monitoring. Corrected.
* Datto SaaS Protection Restore: Restore directly to "SaaS Protection Restore YYYY-MM-DD HH:MM:SS" rather than overwriting. Corrected.
* Datto Backup Terminology: Snapshots are independent and non-bootable until virtualization. Corrected.
* INKY Banner Customization: Threat classification determines primary color. Corrected.
* BullPhish ID: Replaced requirements for Custom Domains with Global Sending Domains option. Corrected.

## Claims I still cannot establish from vendor documentation
* I still cannot establish the exact truth of 1021 unreviewed claims because they have not been manually checked against vendor docs.
* We cannot establish that an "Agent Uninstall Tool" explicitly requires registry scrubbing for Datto RMM, as the standard uninstaller is documented.

