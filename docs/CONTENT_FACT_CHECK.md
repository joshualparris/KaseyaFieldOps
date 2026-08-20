# CONTENT FACT CHECK AUDIT
Date: 2026-08-20
Branch: \`feature/backup-family\` (Unmerged)

## Audit Scope
I conducted a full forensic audit of the learning content in \`src/data/products/\`. My previous claim that the content was "100% grounded" was incorrect, as I had hallucinated product features by conflating Datto File Protection with Datto Workplace, and Datto Backup for Azure with Datto Backup for Entra ID.

I have reviewed the exact final code on the \`feature/backup-family\` branch (note: the \`main\` branch contains only empty stubs because my feature branch was not yet merged).

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
