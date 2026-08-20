todoprobook.md — Standing Backlog for ProBook Antigravity
Rule for all tasks below: you own src/data/products/{datto-saas-protection, darkweb-id,bullphish-id,inky}.ts and your own feature folders (src/features/onboarding/, src/features/product-map/, src/features/reference/, src/features/search/). You do NOT own App.tsx, AppLayout.tsx, Home.tsx, useAppStore.ts, or types.ts (except reading RealTicketCaseSchema etc for reference) — those belong to Fedora as integration owner. If a task needs a change there, stop and flag it instead of editing it yourself.

When you finish a task, check it off (- [x]) and commit along with your work. When you run out of tasks, do a final commit noting you're out of backlog, and stand by.

- [x] Priority 0 — fix your own known issue
Your onboarding flow (OnboardingModal.tsx) currently seeds fake XP/mastery/ progress data on first run "to give the illusion of pre-existing training." Remove that entirely. First run should start every module at zero — no exceptions. This was flagged during integration review; fixing it yourself now is cleaner than Fedora having to reverse-engineer your code later.

- [x] Priority 1 — already in progress
Finish feat/real-ticket-cases: 3-5 realistic ticket examples per your four owned modules (SaaS Protection, INKY, DarkWeb ID, BullPhish ID), matching the RealTicketCaseSchema fields.

- [x] Priority 2 — content depth (src/data/products/ only, your four modules)
INKY: deeper connector/deployment troubleshooting scenarios (pre-release setup issues, integration failures) — draw on the actual INKY webinar topics Josh is enrolled in (pre-release setup, banner customization edge cases, migration from Graphus/SaaS Defense).
DarkWeb ID: client communication templates/scripts for reporting a confirmed breach, severity triage scenarios (real exposure vs noise).
BullPhish ID: campaign analytics interpretation scenarios — reading a completed phishing simulation's results and deciding next steps/training.
Datto SaaS Protection: licensing/seat management edge cases, M365 vs Google Workspace configuration differences.

- [x] Priority 3 — your owned UI features
Product Map: add filtering/search within the map view (e.g. filter by category: Manage/Protect/Detect/Respond/Recover/Human Security).
Command Palette: expand available shortcuts, verify keyboard-only navigation works end to end (open, search, select, close).
Accessibility pass on your own components: label coverage, color contrast, keyboard nav — CommandPalette, ProductMap, QuickReference, OnboardingModal.
Mobile responsiveness check on your own pages/components at common breakpoints (not a full app-wide pass — just what you own).

- [x] Priority 4 — documentation
Short notes in your module files or a README section explaining the "confusable pairs" decision-layer content, so future contributors understand why it's structured that way.

- [x] Out of tasks?
Do a content-quality pass on your four modules and the decision-layer content (consistency, no duplicate scenarios, terminology matching the rest of the app) then report standing by.
