# Kaseya 365 Fact Check Report

| Item ID | Claim | Verdict | Source URL | Action |
| :--- | :--- | :--- | :--- | :--- |
| k365-onboarding-conflict | Installing Datto EDR/AV over active third-party AV causes performance degradation; RMM should be used to script removal first. | VERIFIED | https://www.datto.com/help/en/edr/working-with-third-party-products.htm | N/A |
| k365-policy-hierarchy | Device-level policies override Site and Global policies for K365 EDR/RMM. | INCORRECT | https://rmm.datto.com/help/en/Content/4POLICY/Policy.htm | Rewrote scenario to focus on RMM Monitoring Policies. Clarified that Site-level overrides Global-level, and device exceptions are handled via Filters. |
| k365-patch-compliance | Global Device Filters and Quick Jobs can be used to quickly deploy targeted zero-day patches. | VERIFIED | https://rmm.datto.com/help/en/Content/2DEVICES/Filters.htm | N/A |
| k365-backup-verification | Endpoint Backup allows file-level restores via portal; missing backups require local/cloud-sync fallback. | VERIFIED | https://www.datto.com/help/en/endpoint-backup/restore-files | N/A |
| k365-threat-containment | RMM Web Remote/Agent Browser bypasses EDR isolation to allow investigation. | VERIFIED | https://www.datto.com/help/en/edr/respond-to-threats.htm | N/A |
| k365-inky-replacement | INKY is the premier email security solution in Kaseya 365 User, replacing Datto SaaS Defense and Graphus. | VERIFIED | https://www.datto.com/help/en/saasdefense/end-of-life | N/A |
| k365-kaseyaone-nav | KaseyaOne portal (one.kaseya.com) provides unified SSO to modules like Dark Web ID. | VERIFIED | https://one.kaseya.com/ | N/A |
| fc-k365-1 | Core components of K365 Endpoint are RMM, EDR, AV, Endpoint Backup. | VERIFIED BUT NEEDS QUALIFICATION | https://www.kaseya.com/products/kaseya-365/ | Added Patch Management to the list for completeness as it is a core feature. |
| fc-k365-2 | Third-party AV conflicts cause kernel panics. | OUTDATED | N/A | Toned down "kernel panics" (rare on modern Windows) to "unexpected issues". |
| fc-k365-3 | RMM policy hierarchy: Device > Site > Global. | INCORRECT | https://rmm.datto.com/help/en/Content/4POLICY/Policy.htm | Corrected to: Site > Global, with device exceptions handled via Filters/Groups. |
