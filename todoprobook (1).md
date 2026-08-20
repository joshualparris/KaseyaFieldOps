# todoprobook.md — Deep Backlog for ProBook Antigravity

**Ownership:** `src/data/products/{datto-saas-protection,darkweb-id,bullphish-id,inky}.ts`
and your own feature folders (`src/features/onboarding/`, `src/features/product-map/`,
`src/features/reference/`, `src/features/search/`). You do NOT own `App.tsx`,
`AppLayout.tsx`, `Home.tsx`, `useAppStore.ts`, `types.ts`. Flag, don't edit.

## Priority 0 — your known bug, fix first
- [x] Remove all fake-progress seeding from `OnboardingModal.tsx`. Every module starts
      at zero on first run, no exceptions, no "illusion of pre-existing training."

---

## SECTION A — INKY: named scenarios (grounded in real product mechanics)

Real mechanics: INKY replaced Datto SaaS Defense/Graphus as Kaseya's primary email
security. It's GenAI-powered — flags spoofed brands, analyzes sender intent, and shows
**dynamic banners** that coach users in real time on the email itself. It has outbound
DLP: admins define policies (keywords, domains, data patterns like credit cards/SSNs),
matching outbound mail gets auto-encrypted with a secure portal link for the recipient.
It integrates tightly with BullPhish ID — critically, INKY will NOT mark a BullPhish
simulation as real phishing, and gives positive feedback when a user correctly reports
a simulated phish. Setup is fast (~30 min initial install, ~15 min per new customer
onboarding) and it manages via SSO (Microsoft/Google) through the KaseyaOne portal.

- [ ] "Client migrating from Graphus/SaaS Defense to INKY" — full migration-scenario
      chain: what changes for the client, what to communicate, connector/DNS
      reconfiguration steps, verifying mail flow post-cutover.
- [ ] "BullPhish simulation got flagged as a real threat" — this should NOT happen per
      the real integration; build a scenario where a tech investigates why an INKY/
      BullPhish integration isn't behaving as expected (misconfigured integration
      link) rather than assuming it's just a normal false positive.
- [ ] "User reports a phish correctly during a real BullPhish campaign" — walk through
      what INKY/BullPhish should show the user (positive/congratulations feedback)
      and what the tech should check if that feedback isn't appearing.
- [ ] "Setting up outbound DLP policy for a healthcare client" — client needs
      SSN/PHI-pattern detection on outbound mail; tech configures keyword/pattern
      policy and confirms auto-encryption + secure portal delivery is working.
- [ ] "Dynamic banner not appearing on a suspicious email" — a genuinely spoofed
      email isn't getting a warning banner; troubleshoot policy/sensitivity
      configuration rather than assuming the product is broken.
- [ ] "New customer onboarding — the 15-minute setup" — walk through what actually
      happens during that fast onboarding window (SSO connection, initial scan,
      policy defaults) so a tech isn't caught off guard by how little manual config
      there typically is.
- [ ] "Pre-release connector configuration issue" (from the actual INKY webinar
      topics Josh is enrolled in) — connector/integration setup failure during an
      early-access or pre-release rollout.

### Recall cards (15+)
- [ ] What INKY replaced (Datto SaaS Defense / Graphus)
- [ ] What triggers a dynamic banner vs outright blocking an email
- [ ] What INKY's outbound DLP does when it matches a sensitive pattern (auto-encrypt
      + secure portal link, no software needed for the recipient)
- [ ] The specific behavior guarantee between INKY and BullPhish ID (won't flag
      simulations, gives congratulations feedback on correct reporting)
- [ ] How INKY is accessed (KaseyaOne portal, SSO via Microsoft/Google)
- [ ] Rough setup time expectations (30 min initial, 15 min per new customer)
- [ ] 9+ more of your own choosing covering license tiers (Advanced vs Pro),
      shared/resource mailbox handling, and brand-forgery detection specifics

## SECTION B — DarkWeb ID: named scenarios

Real mechanic: continuous dark web monitoring for compromised credentials tied to a
client's domain/users, part of the "Prevent" pillar in the Kaseya 365 User bundle.

- [ ] "Credential exposure alert — genuine breach or old recycled data" — tech
      investigates an alert to determine if the exposed credential is current/active
      or a years-old dump of a already-changed password.
- [ ] "Client asks how far back the monitoring goes" — real-world context: some MSPs
      report finding credentials in dumps dating back 10-15 years; build a scenario
      explaining monitoring scope and why old exposures still matter (password
      reuse risk).
- [ ] "Notifying a client about a confirmed breach" — communication-focused scenario:
      what to say, what immediate actions to recommend (forced password reset, MFA
      check), and what NOT to do (panic messaging, vague alerts).
- [ ] "Multiple alerts for the same user — noise or pattern" — tech must recognize
      when repeated alerts indicate an ongoing credential-stuffing risk vs isolated
      old exposures.

### Recall cards (10+)
- [ ] What Dark Web ID actually monitors for
- [ ] Why an old/already-changed exposed credential still matters to flag
- [ ] Where Dark Web ID sits in the Kaseya 365 User bundle (Prevent pillar)
- [ ] 7+ more covering alert severity triage, remediation steps, and client
      reporting cadence

## SECTION C — BullPhish ID: named scenarios

Real mechanic: phishing simulation kits + animated multilingual video training with
quizzes; a campaign reportedly takes about 10 minutes to set up including template
selection; results are analyzed/reported; used for both security and compliance/
insurance requirements.

- [ ] "Setting up a monthly phishing campaign in ~10 minutes" — walk through template
      selection, targeting, and scheduling efficiently — a realistic "this shouldn't
      take long" scenario.
- [ ] "Interpreting poor campaign results" — a client's click-through rate is high;
      tech must translate results into a remediation plan (targeted training, not
      just "tell them not to click things").
- [ ] "Client needs proof of training for cyber insurance" — compliance-focused
      scenario: generating and presenting the right reporting to satisfy an
      insurance/compliance requirement.
- [ ] "Multilingual workforce training rollout" — client has non-English-speaking
      staff; tech configures video training content appropriately.

### Recall cards (10+)
- [ ] Roughly how long a campaign takes to set up and why that matters for adoption
- [ ] What BullPhish training combines (video + quizzes, not just simulated emails)
- [ ] Where BullPhish sits in the Kaseya 365 User bundle (Prevent pillar, alongside
      Dark Web ID)
- [ ] 7+ more covering campaign types/templates, reporting/analytics, and the
      INKY integration behavior (cross-reference Section A's INKY cards so these
      two modules' content doesn't contradict each other)

## SECTION D — Datto SaaS Protection: named scenarios

Real mechanic: SaaS backup/recovery for Microsoft 365 and Google Workspace; part of the
"Recover" pillar of Kaseya 365 User. Existing Backupify customers are being migrated to
Datto SaaS Protection — a real, current migration scenario.

- [ ] "Migrating a client from Backupify to Datto SaaS Protection" — full migration
      chain: what changes, what needs re-verification post-migration, communicating
      the change to the client.
- [ ] "Recovering a single deleted mailbox item vs a full mailbox restore" — tech
      picks the right restore granularity for a client's specific ask (one email vs
      an entire departing-employee mailbox).
- [ ] "Google Workspace vs M365 configuration differences" — same product, different
      underlying platform quirks; a scenario highlighting where the setup/restore
      process diverges.
- [ ] "Licensing/seat count mismatch after new hires" — client added staff but backup
      coverage didn't automatically extend; tech identifies and fixes the seat gap.

### Recall cards (10+)
- [ ] What's being migrated away from (Backupify) and why that matters for existing
      clients
- [ ] Where SaaS Protection sits in the Kaseya 365 User bundle (Recover pillar)
- [ ] What Datto Backup for Entra ID does NOT cover that SaaS Protection DOES
      (mailbox/file data vs tenant configuration — cross-reference with ThinkPad's
      Azure/Entra module so these two don't contradict each other)
- [ ] 7+ more covering retention windows, restore workflows, and platform-specific
      (M365 vs Google Workspace) differences

---

## SECTION E — Your owned UI features
- [x] Product Map: add filtering by category (Manage/Protect/Detect/Respond/Recover/
      Human Security) — use the real Kaseya 365 pillar language (Prevent/Respond/
      Recover) where it applies to the security-suite products specifically.
- [x] Command Palette: expand shortcuts, verify full keyboard-only navigation.
- [x] Accessibility pass on CommandPalette, ProductMap, QuickReference,
      OnboardingModal.
- [x] Mobile responsiveness check on your own pages/components.
- [x] Expand the "which tool do I use" decision layer with a new entry: Datto Backup
      for Entra ID vs Datto SaaS Protection (config vs data — coordinate with
      ThinkPad so the framing matches what they write for Section B above).

## Priority — real ticket cases (after Sections A-D have real progress)
- [x] 3-5 realistic tickets per module using `RealTicketCaseSchema` (read-only
      reference, don't modify the schema).

## Out of tasks?
Full read-through of Sections A-D — check no scenario is a thin stub, check
terminology is consistent across your four modules and with what you already wrote
in QuickReference. Then report standing by.
