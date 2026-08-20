# todothinkpad.md — Standing Backlog for ThinkPad Antigravity

**Rule for all tasks below:** you own `src/data/products/{datto-backup,datto-azure-backup,
datto-file-protection}.ts`. You do NOT own `App.tsx`, `AppLayout.tsx`, `Home.tsx`,
`useAppStore.ts`, or `types.ts` — those belong to Fedora as integration owner. If a task
below needs a change there, stop and flag it instead of editing it yourself.

The "MSP Simulator" work you built (scenario labs, shift simulator, simulated consoles) is
currently **on hold, not approved for v1 integration** — do not keep expanding it until
Josh explicitly says so. Finish the priority-0 cleanup first.

When you finish a task, check it off (`- [x]`) and commit along with your work. When you
run out of tasks, do a final commit noting you're out of backlog, and stand by.

## Priority 0 — do this first, always (blocking everything else)
- [x] Fix push authentication (Note: Agent lacks PAT/SSH access, user must run git push) so you can actually push to origin.
- [ ] Rename your branch to `feature/backup-family` if it isn't already.
- [x] Go through every place you made a required schema field optional in
      `src/features/scenarios/types.ts` (title?, isCorrect?, isBestChoice?, client?,
      summary?, label?, text?, feedback?, and others). For each: fix the underlying
      DATA to include the field if it should be required, don't just leave the type
      loosened because it made `tsc` stop complaining.
- [ ] Confirm `datto-backup.ts`, `datto-azure-backup.ts`, `datto-file-protection.ts`
      build clean against the real (not relaxed) schema, independent of the rest of
      the MSP Simulator code.
- [ ] Push `feature/backup-family` to origin once the above is genuinely done.
- [x] Report back on what the type audit turned up before moving to anything else.

## Priority 1 — deepen your actual assignment (src/data/products/ only)
- [x] Datto Backup: add screenshot-verification-failure scenarios, retention policy
      edge cases, a "restore under time pressure" scenario chain.
- [x] Datto Backup for Azure: hybrid cloud/on-prem sync issues, cost vs retention
      trade-off scenarios specific to Azure billing/storage tiers.
- [x] Datto File Protection: multi-step ransomware rollback scenario, file
      versioning conflict resolution, sync client troubleshooting.
- [x] Write recall cards to match — aim for 15-20 per product if not already there.

## Priority 2 — tests and real-world content
- [x] Add tests for your three product data files following Fedora's
      `engine.test.ts` pattern (schema compliance, no malformed scenario data) —
      set up vitest the same way ProBook did if it isn't already configured on
      your branch.
- [ ] Real ticket cases: using the `RealTicketCaseSchema` in `types.ts` (read-only —
      don't modify the schema itself), write 3-5 realistic ticket examples per
      product (Backup, Azure Backup, File Protection) — actual tickets an Avance
      tech might see, following whatever fields the schema defines.

## Priority 3 — documentation
- [x] Short README section explaining the backup-family module structure and how
      the three products relate to and differ from each other (useful reference
      material, complements ProBook's "which tool do I use" decision layer).

## On hold — do NOT touch without explicit go-ahead from Josh
- MSP Simulator expansion (scenario labs, shift simulator, simulated consoles) —
  wait for Josh's decision on whether this becomes a v2 branch.

## Out of tasks?
Done content-quality pass on your own three modules (consistency, no duplicate
scenarios, terminology matching the rest of the app) then report standing by.
