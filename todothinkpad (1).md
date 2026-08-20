# todothinkpad.md — Deep Backlog for ThinkPad Antigravity

**Ownership:** `src/data/products/{datto-backup,datto-azure-backup,datto-file-protection}.ts`
only. You do NOT own `App.tsx`, `AppLayout.tsx`, `Home.tsx`, `useAppStore.ts`, `types.ts` —
those belong to Fedora as integration owner. Flag, don't edit.

**The "MSP Simulator" work (scenario labs, shift simulator, simulated consoles) stays on
hold** until Josh reviews it — don't expand it further from this backlog.

## Priority 0 — still blocking, do this before anything else
- [x] Push auth fixed, branch correctly named `feature/backup-family`, and the earlier
      type-audit (fixing loosened required fields in `types.ts` back to correct data
      rather than optional types) is genuinely complete and reported.

---

## SECTION A — Datto Backup / BCDR: named scenarios (grounded in real product mechanics)

Real mechanics to build these around: BCDR verifies backups two ways — standard
**screenshot verification** (boots the backup and takes a screenshot to prove it's
bootable) and **advanced verification** (runs scripts that log into business-critical
applications to confirm they're actually accessible, not just that the OS booted).
Backups use **Inverse Chain Technology** (every snapshot is a fully-formed, independently
bootable recovery point — no chain reassembly needed). Cloud storage is **immutable
(WORM)**. There's a built-in **Ransomware Detection** on the backup side too (separate
from EDR's) that flags anomalous change patterns in backup data itself. RPOs can be as
granular as 5-minute increments; default schedule is hourly.

- [x] "Screenshot verification passes but the app doesn't actually work" — boot
      screenshot shows a clean login screen, but a business app inside the VM is
      broken; tech must know this is exactly why advanced (script-based) verification
      exists and configure it for that client's critical app.
- [x] "Client wants tighter RPO after a data-loss scare" — walk through explaining
      RPO, moving from default hourly to a more granular (e.g. 15-minute) backup
      schedule, and the trade-offs (storage, bandwidth).
- [x] "Restoring under time pressure — full VM vs single file" — a client needs one
      accidentally-deleted file back NOW, not a full disaster recovery; tech must
      pick the fastest correct restore method rather than defaulting to a full VM
      spin-up.
- [x] "Backup Ransomware Detection flags a false positive" — a legitimate bulk file
      operation (e.g. a migration script) trips the anomaly detection on backup data;
      tech must verify it's not real ransomware before dismissing the alert.
- [x] "Explaining Inverse Chain Technology to a skeptical client" — client doesn't
      understand why recovery is fast; a soft-skills/explanation scenario, not just
      technical steps — tech needs to translate "every snapshot is independently
      bootable" into plain language.
- [x] "Immutable storage — client asks to delete old backups themselves" — client
      wants direct deletion access; tech must explain WORM immutability and Cloud
      Deletion Defense, and the actual (controlled) process for legitimate deletion.
- [x] "Local vs cloud recovery point selection" — device/appliance has a local copy
      that's faster to restore from but the cloud copy is more current; tech must
      reason about which to use given the situation.

### Recall cards (15+)
- [x] Two levels of backup verification and what each actually proves
- [x] What Inverse Chain Technology means for recovery speed
- [x] What WORM immutable storage protects against
- [x] What Cloud Deletion Defense is for
- [x] Default backup schedule vs the most granular RPO available
- [x] What Datto's backup-side Ransomware Detection looks for (anomalous change
      patterns in backup data, distinct from EDR's endpoint-level detection)
- [x] 9+ more of your own choosing — local caching for backup data, recovery
      orchestration for multiple systems at once, PSA/IT Glue integration touchpoints

## SECTION B — Datto Backup for Microsoft Azure / Entra ID: named scenarios

Real mechanic to build around: **Datto Backup for Microsoft Entra ID** snapshots the
configuration of a client's Entra ID (Azure AD) tenant — this is about recovering tenant
*configuration*, not just data, and is managed through the UniView portal.

- [x] "Conditional Access policy accidentally deleted" — a client's Entra ID admin
      wipes a Conditional Access policy by mistake; tech uses the Entra ID
      configuration backup to identify and restore just that policy.
- [x] "Full tenant configuration disaster — where do you even start" — a scenario
      simulating major accidental tenant misconfiguration, walking through using the
      UniView portal to assess what changed and what's recoverable.
- [x] "Explaining config backup vs data backup to a client" — client assumes Entra ID
      backup means their files/mailboxes are backed up too; tech must clarify this is
      tenant configuration only, and that's a different product (SaaS Protection) for
      actual mailbox/file data.
- [x] "Hybrid environment sync conflict after restore" — an on-prem AD Connect setup
      gets out of sync after an Entra ID configuration restore; troubleshoot the
      re-sync.

### Recall cards (10+)
- [x] What exactly Datto Backup for Microsoft Entra ID protects (tenant config, not
      mailbox/file data)
- [x] What portal manages this module (UniView)
- [x] Why this is a genuinely different product from Datto SaaS Protection even
      though both relate to "Microsoft 365 / Entra"
- [x] 7+ more covering conditional access, tenant-level recovery scope, and
      change-tracking/audit visibility

## SECTION C — Datto File Protection: named scenarios

Note: less official documentation was found on this specific product name during
research — build these based on sound general file-backup/versioning practice, and
flag clearly in a comment if anything here turns out to not match actual product
behavior once you have direct access to the product docs/portal.

- [x] "Ransomware rollback at the file level" — multi-step: detecting encrypted files,
      identifying the last-known-good version, rolling back without losing legitimate
      recent changes made before the attack.
- [x] "Sync client conflict — two versions of the same file" — a user edited the same
      file on two devices while offline; tech must resolve the conflict using version
      history rather than picking one arbitrarily.
- [x] "Client accidentally overwrote a shared file" — walk through finding and
      restoring a specific prior version without affecting other files in the same
      folder/share.

### Recall cards (10+)
- [x] Core difference between file-level protection and full-system/VM backup
      (BCDR)
- [x] What "version history" gives a tech that a single snapshot doesn't
- [x] 8+ more covering retention windows, restore granularity, and typical
      client-facing use cases

---

## Priority — tests and real-world content (after Sections A-C have real progress)
- [x] Add tests for your three product data files (schema compliance, no malformed
      scenario data) using vitest, matching Fedora's pattern.
- [x] Real ticket cases: 3-5 per product using `RealTicketCaseSchema` (read-only
      reference to the schema, don't modify it).

## Documentation
- [x] README section explaining how Datto Backup, Backup for Azure/Entra ID, and File
      Protection differ — this pairs with ProBook's "which tool do I use" decision
      layer, so make sure the framing is consistent with theirs once you can see it.

## Out of tasks?
Full read-through of Sections A-C against the actual files — check no scenario is a
thin stub, and flag (in a code comment, not silently) anywhere you weren't fully
confident the product mechanic was accurate. Then report standing by.
