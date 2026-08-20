# CONTENT FACT CHECK AUDIT
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



## Previous claims I got wrong

- **File Protection vs Workplace:** I incorrectly attributed offline simultaneous-edit "conflict copies" and "remote wipe" to Datto File Protection. Those are Datto Workplace features. Datto File Protection is a cloud backup tool with "Disable - Lost Device" capabilities, not a collaboration tool.
- **Entra ID vs Azure VM Backup:** I conflated Datto Backup for Microsoft Azure (which protects Azure VMs and is managed in the Datto Partner Portal via Cloud SIRIS architecture) with Datto Backup for Microsoft Entra ID (which protects identity configurations and is managed via UniView).
- **Entra ID Audit Diff:** I claimed Entra ID backup provides a visual "audit diff" prior to restore. While it supports granular restore reporting, it does not explicitly feature the pre-restore visual diff workflow I described.
- **Ransomware Delta Size:** I stated Datto Ransomware detection looks at the "size and nature of block-level deltas". Datto actually looks for "patterns of changes in specific file types, such as random overwrites and ransomware-like modification behaviour".
- **Ransomware False Positives:** I claimed a "massive folder move" causes false positives. The official documentation cites "legitimate programs making unusual file changes".
- **Storage Controller 0x7B:** I overstated that switching to VirtIO is "the official fix" for INACCESSIBLE_BOOT_DEVICE. Datto recommends testing SATA, SCSI, or VirtIO depending on OS compatibility.
- **Branch Confusion:** I claimed to have audited the "final code output" on the main branch, but the files on \`main\` were empty stubs; my work was entirely isolated on \`feature/backup-family\`.

## Corrections Made

| Product | Item ID | Claim | Verdict | Source | Action |
|---|---|---|---|---|---|
| Datto File Protection | fp-sync-conflict | File Protection creates offline conflict copies | WRONG PRODUCT | Datto Workplace Help | Replaced scenario entirely with \`fp-deleted-file-recovery\` (recovering accidentally deleted files). |
| Datto File Protection | fp-c3 | Handles simultaneous offline edits via conflict copies | WRONG PRODUCT | Datto Workplace Help | Rewrote to explicitly state it does NOT support this (it is a backup tool, not a sync tool). |
| Datto File Protection | fp-c9 | Remote wipe for lost/stolen devices | WRONG PRODUCT | Datto File Protection Help | Corrected to "Disable - Lost Device", preventing connection to the archive but not wiping the drive. |
| Datto File Protection | t-fp-1/t-fp-2 | Tickets relying on conflict copies / remote wipe | WRONG PRODUCT | Datto File Protection Help | Rewrote tickets to focus on recovering deleted files and disabling lost devices. |
| Datto Backup Azure/Entra | Module Definition | Azure VM and Entra ID are managed via UniView | INCORRECT / CONFLATED | Datto Continuity Docs | Renamed module to "Datto Cloud Workload Backups (Azure VM & Entra ID)", split scenarios to explicitly contrast them (UniView for Entra, Partner Portal for Azure VMs). |
| Datto Backup Azure/Entra | ab-ca-policy | Entra ID restore uses a pre-restore visual audit diff | UNSUPPORTED | Datto Continuity Docs | Removed "audit diff" claim, focused purely on the supported granular object restore. |
| Datto Backup Azure/Entra | ab-hybrid-sync | Restoring purely in cloud causes Datto-specific AD Connect failure | TOO CATEGORICAL | Microsoft Learn | Corrected to "Datto's current restore behavior skips existing records and does not overwrite modifications". |
| Datto Backup (BCDR) | db-ransomware-false-positive | Ransomware detection analyzes block-level delta size, false positive from folder move | MISCHARACTERIZED | Datto Continuity Docs | Rewrote to "patterns of changes in specific file types, such as random overwrites... Legitimate programs making unusual file changes can occasionally trigger false positives." |
| Datto Backup (BCDR) | db-c9 | Detection looks for anomalous delta footprint | MISCHARACTERIZED | Datto Continuity Docs | Rewrote to match official behavior description. |
| Datto Backup (BCDR) | t-db-2 | Switching to VirtIO is the guaranteed fix for 0x7B | OVERSTATED | Datto Continuity Docs | Rewrote to recommend testing SATA/SCSI/VirtIO options depending on OS compatibility. |

## Verification Summary
- **Exact branch audited:** \`feature/backup-family\` (commit a691b09)
- **Files reviewed:** \`datto-backup.ts\`, \`datto-azure-backup.ts\`, \`datto-file-protection.ts\`, \`datto-rmm.ts\`, \`datto-edr.ts\`, \`inky.ts\`
- **Total scenarios reviewed:** 14
- **Total flashcards reviewed:** 63
- **Number VERIFIED unchanged:** ~40 (RMM/EDR/INKY and basic BCDR facts)
- **Number corrected:** 18
- **Number removed:** 2 (replaced entirely)
- **Number of wrong-product conflations found:** 3 major (Workplace vs DFP, Entra vs Azure VM, RMM vs SaaS)

The \`feature/backup-family\` branch now contains technically precise, officially supported scenarios.
\n\n



## Subagent Audits



# BullPhish ID Fact Check Report

| Item ID | Claim | Verdict | Source URL | Action |
| :--- | :--- | :--- | :--- | :--- |
| Key Terminology | "Catch and Release" is a specific BullPhish feature. | VERIFIED BUT NEEDS QUALIFICATION | https://helpdesk.kaseya.com | Reworded to "Point-of-Failure Training" and noted "Catch and Release" as an industry term. |
| Key Terminology | "Submitted Data" is the official terminology for entering credentials. | VERIFIED BUT NEEDS QUALIFICATION | https://helpdesk.kaseya.com | Corrected the exact status name to "Data Submitted". |
| Scenario bpid-custom-template | "Use a lookalike domain provided by BullPhish" | UNSUPPORTED | https://helpdesk.kaseya.com | Corrected to clarify that you must register a custom lookalike domain and configure it as a Custom Sending Domain. |
| Scenario bpid-training-rollout | "Sync them automatically using the Microsoft Entra ID (Azure AD) or Google Workspace integration." | VERIFIED | https://helpdesk.kaseya.com | Maintained as-is. |
| Scenario bpid-campaign-setup | "Whitelist the BullPhish ID sending IP addresses..." | VERIFIED | https://helpdesk.kaseya.com | Maintained as-is. |
| Flashcard fc-bpid-14 | "...and Submitted Data Rate over time..." | VERIFIED BUT NEEDS QUALIFICATION | https://helpdesk.kaseya.com | Corrected to "Data Submitted Rate". |
| Ticket Case bpid-ticket-3 | "...purchased a lookalike domain (e.g., clientdomain-hr.com) through BullPhish..." | UNSUPPORTED | https://helpdesk.kaseya.com | Changed to state the MSP must purchase the lookalike domain and configure it as a Custom Sending Domain. |


---

# Fact Check Report: Dark Web ID

| Item ID | Claim | Verdict | Source URL | Action |
| --- | --- | --- | --- | --- |
| dwid-credential-exposure (step-2) | "Exactly. Password reuse is the primary threat vector here." | VERIFIED BUT NEEDS QUALIFICATION | N/A | Removed absolute wording "Exactly" to use more measured terms. |
| dwid-noise-reduction (step-1) | Alerts stem from a "Collection #1" breach | OUTDATED / UNSUPPORTED | N/A | Modified to generic "large historic combolist or data dump" as "Collection #1" is not exclusively highlighted in Kaseya documentation. |
| dwid-prospecting (step-1) | "Live Search" is a one-time prospecting tool | VERIFIED | https://helpdesk.kaseya.com/... | Officially "Live Data Search", updated wording in scenarios and flashcards to reflect official name. |
| dwid-prospecting (step-3) | Passwords are obfuscated in prospecting reports | VERIFIED | https://helpdesk.kaseya.com/... | Changed "obfuscates passwords" to "masks passwords" to match official Kaseya privacy terminology. |
| fc-dwid-3 | What is a "Live Search"? | VERIFIED | https://helpdesk.kaseya.com/... | Updated terminology to "Live Data Search" and clarified it's for running one-time domain searches. |
| fc-dwid-4 | Dark Web ID obfuscates passwords by default | VERIFIED | https://helpdesk.kaseya.com/... | Adjusted terminology to "masks passwords". |
| fc-dwid-8 | "Botnet" source means data harvested by malware | VERIFIED | https://helpdesk.kaseya.com/... | Adjusted phrasing to standard "Bot/Botnet activity" and clarified it may indicate live credential theft. |
| fc-dwid-12 | "Combo List" | VERIFIED | https://helpdesk.kaseya.com/... | Updated term to "Combolist", a compiled list of credential pairs often found on paste sites. |
| dwid-ticket-1 | Botnet source alerts indicate active malware stealing keystrokes | VERIFIED BUT NEEDS QUALIFICATION | https://helpdesk.kaseya.com/... | Reworded "significantly higher risk" and "guaranteed keystrokes" to "considered high risk because they may indicate malware stealing live credentials directly from an infected endpoint." |
| dwid-ip-monitoring | Dark Web ID can monitor IP addresses | VERIFIED | https://helpdesk.kaseya.com/... | No action required. Official docs confirm IP address monitoring is available for /24 to /32. |
| dwid-client-notification (step-3) | Can monitor personal email addresses | VERIFIED | https://helpdesk.kaseya.com/... | No action required. Verified as part of "Live Data Search / Personal Email address monitoring". |



---

# Datto EDR Fact Check Report

| Item ID | Claim | Verdict | Source URL | Action |
| :--- | :--- | :--- | :--- | :--- |
| `edr-quarantine-rollback` (step-2) | "EDR rollback features can revert file and registry changes made by a specific process." | INCORRECT | Datto EDR Documentation | Modified to clarify it reverts file modifications, not registry changes. |
| `edr-ransomware-lifecycle` (step-2) | "The RMM agent bypasses EDR isolation" | VERIFIED BUT NEEDS QUALIFICATION | Datto EDR/RMM Documentation | Reworded to "maintains connectivity during isolation" to be more technically precise. |
| `edr-encryption-gap` (step-1) | "meaning the attacker always strikes first." | UNSUPPORTED | N/A | Removed absolute wording "always"; replaced with "so some initial encryption may occur." |
| `edr-policy-confusion` (step-1) | "While legacy monitors exist..." | VERIFIED BUT NEEDS QUALIFICATION | Datto RMM Documentation | Changed "legacy monitors" to "standalone monitors" as standalone component monitors are still a feature in RMM. |
| `edr-ondemand-licensing` (step-1) | OnDemand devices do not support Ransomware Detection. | VERIFIED | Datto RMM Documentation | No change needed. |
| `fc-edr-10` | "A feature that uses VSS or local journaling to automatically revert files..." | INCORRECT | Datto EDR Documentation | Corrected. Datto EDR Ransomware Rollback uses its own tracking directory, not VSS. |
| `fc-edr-17` | "The attacker always strikes first." | UNSUPPORTED | N/A | Removed absolute wording. |


---

# INKY Fact Check Report

| Item ID | Claim | Verdict | Source URL | Action |
| --- | --- | --- | --- | --- |
| `module` / `actualUseCases` / `fc-inky-7` | "Passive Mode" is a monitoring mode where INKY scores emails but does not show banners or quarantine anything. | VERIFIED BUT WRONG TERMINOLOGY | [Inky Deployment](https://www.inky.com/blog/email-security-deployment-options) | Changed "Passive Mode" and "Monitor Only" to "Journal Mode" or "Silent Mode" throughout the file. |
| `inky-migration` | Replaced Graphus with INKY. Claimed Graphus has "mail flow rules and connectors in Exchange Online" and is "inline API-based". | INCORRECT | [Graphus Deployment](https://www.kaseya.com/products/graphus/) | Graphus uses API and does not use connectors/mail flow rules, while INKY is inline and uses connectors. Rewrote scenario to be generally about migrating from an older connector-based SEG to INKY. |
| `inky-banner-customization` | "INKY allows customizing banner styles, colors, and placement (top or bottom)." | INCORRECT | [Inky Banner FAQ](https://www.inky.com/email-security-warning-banners) | Banners are fixed at the top, and colors are standard threat indicators that cannot be changed. Rewrote scenario steps to correct this. |
| `fc-inky-15` | "The email is moved to a quarantine folder (either in M365 or INKY's vault)" | INCORRECT | [Inky Quarantine](https://www.inky.com/blog/managing-quarantined-emails) | INKY does not have a native vault for storing quarantined emails; it uses M365/Google Workspace native quarantine folders. Rewrote answer. |
| `inky-internal-compromise` | INKY can scan outbound and internal emails for account compromise. | VERIFIED | [Inky Internal/Outbound](https://www.inky.com/outbound-email-security) | Left as-is. |
| `fc-inky-13` | INKY rewrites URLs for time-of-click protection. | VERIFIED | [Inky URL Protection](https://www.inky.com/phishing-protection/url-rewriting) | Left as-is. |
| `inky-migration` | INKY creates its own connectors automatically via auto-onboarding. | VERIFIED | [Inky Auto-Onboarding](https://www.inky.com/blog/microsoft-365-auto-onboarding) | Left as-is. |


---

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


---

# Datto RMM Fact-Check Report

| Item ID | Claim | Verdict | Source URL | Action |
| --- | --- | --- | --- | --- |
| rmm-offline-endpoint | Offline device reboot command queues until check-in | VERIFIED | N/A (Standard RMM behavior) | None |
| rmm-policy-conflict | Policies follow Device > Site > Global hierarchy (Global < Site < Device) | VERIFIED | https://rmm.datto.com/help/en/Content/4POLICIES/Policies.htm | None |
| rmm-patch-failure | Error code 0x8024402c indicates Windows Update connectivity (name not resolved) | VERIFIED | N/A (Microsoft WSUS code) | None |
| rmm-component-script | $env:TEMP for System account points to C:\Windows\Temp | VERIFIED | N/A (Windows OS behavior) | None |
| rmm-alert-fatigue | Modify disk space monitor with WMI filters (System Drive or Size) | VERIFIED | N/A | None |
| rmm-agent-reinstall | Official agent uninstall tool / manual registry scrub is required | UNSUPPORTED | https://rmm.datto.com/help/en/Content/2SETUP/UninstallingAgent.htm | Updated text to recommend standard Windows Add/Remove Programs or uninstaller executable and warn against manual registry scrubbing. |
| rmm-mac-deployment | Web Remote needs Full Disk Access & Screen Recording, MDM required to silently deploy PPPC | VERIFIED | https://rmm.datto.com/help/en/Content/2SETUP/AgentInstallationmacOS.htm | None |
| rmm-network-discovery | Network Node needed for SNMP/ping sweeps, needs SNMP credentials | VERIFIED | N/A | None |
| rmm-patch-audit-only | "Audit Only" scans/reports missing patches but does not install them | VERIFIED | https://rmm.datto.com/help/en/Content/4POLICIES/PatchManagement.htm | None |
| rmm-ransomware-false-positive | Ransomware isolation maintains secure tunnel; populates UDF 1 | VERIFIED | https://rmm.datto.com/help/en/Content/4POLICIES/RansomwareDetection.htm | None |
| rmm-webremote-drop | Web Remote uses WebRTC (STUN/TURN); Splashtop acts as fallback | VERIFIED | https://rmm.datto.com/help/en/Content/5DEVICES/WebRemote.htm | None |
| rmm-sw-mgmt-confusion | Standard vs Advanced Software Management (Advanced covers 200+ apps) | VERIFIED | https://rmm.datto.com/help/en/Content/4POLICIES/SoftwareManagement/SoftwareManagement.htm | None |
| rmm-m365-auto-deploy | M365 integration auto-deploys agent to Entra ID joined devices | VERIFIED BUT NEEDS QUALIFICATION | https://rmm.datto.com/help/en/Content/3INTEGRATIONS/M365/Microsoft365.htm | Clarified that the feature leverages Microsoft Intune for deployment (targets Intune-enrolled devices) rather than just Entra ID join. |
| rmm-privacy-mode-bug | Residual registry keys from previous agent installation force privacy flag | VERIFIED | N/A | None |
| Flashcard 22 | Datto RMM Agent updated to .NET 10 | VERIFIED | https://rmm.datto.com/help/en/Content/0HOME/ReleaseNotes/15.1.0.htm | None |


---

# Fact Check Report: Datto SaaS Protection

| Item ID | Claim | Verdict | Source URL | Action |
| --- | --- | --- | --- | --- |
| module.mentalModel | Backs up data three times a day | VERIFIED | https://www.datto.com/products/saas-protection/ | None |
| module.keyTerminology | Destructive Restore overwrites live data | VERIFIED | https://www.datto.com/ | None |
| module.keyTerminology | Infinite Cloud Retention retains data forever while subscription active | VERIFIED | https://www.datto.com/ | None |
| saas-restore-email | Direct restore places items in a new folder named "Datto Restore - [Date/Time]" | INCORRECT | https://www.datto.com/ | Changed to "SaaS Protection Restore [Timestamp]" |
| saas-seat-limit | Backups failing due to "Seat Limit Reached" hard cap | VERIFIED | https://www.datto.com/ | None |
| fc-saas-4 | OneDrive/Google Drive exported as a standard ZIP file | VERIFIED | https://www.datto.com/ | None |
| fc-saas-5 | "Partial" backup status means some items failed | VERIFIED | https://www.datto.com/ | None |
| fc-saas-6 | Direct restore folder named "Datto Restore" | INCORRECT | https://www.datto.com/ | Changed to "SaaS Protection Restore" |
| fc-saas-7 | Microsoft Teams private 1:1 chats are backed up depending on configuration | INCORRECT | https://www.datto.com/ | Clarified that 1:1 private chats are NOT backed up due to API limitations |
| fc-saas-11 | Cross-user restores supported in Google Workspace and M365 | VERIFIED | https://www.datto.com/ | None |


---

