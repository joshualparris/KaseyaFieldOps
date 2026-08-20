# Branch Reconciliation Note

## Branch: `origin/fix/audit-and-repair`
- **Unique Commits**: `070a912`
- **Useful Changes**: Restores deep scenarios and flashcards for `datto-edr.ts` (e.g., PowerShell investigation, ransomware rollback).
- **Incorrect Changes**: Some original assertions about EDR isolation and ransomware rollback are inaccurate based on current Datto documentation.
- **Superseded Changes**: E2E tests and some UI scaffolding that were already integrated or replaced in `main`.
- **Files Safe to Port**: `docs/factual-audit-2026-08-20.md`, `src/lib/learning/content.test.ts`
- **Files Requiring Manual Reconciliation**: `src/data/products/datto-edr.ts` (Needs surgical extraction of scenarios and rigorous fact-checking of claims).

## Branch: `origin/feature/backup-family`
- **Unique Commits**: `604a688`, `c2a41d2`, `cdd725f`, `a691b09`, `4f6957f`, `10bc494`, `15c71e2`, `e4682bc`, `34b9de2`
- **Useful Changes**: Implements content for the Datto backup family (`datto-backup.ts`, `datto-file-protection.ts`) and corresponding fact check markdown files.
- **Incorrect Changes**: None immediately identified, but content must be validated against the "destructive restore" hallucination.
- **Superseded Changes**: `package-lock.json` modifications.
- **Files Safe to Port**: `src/data/products/datto-backup.ts`, `src/data/products/datto-file-protection.ts`, `docs/FACT_CHECK_*.md`
- **Files Requiring Manual Reconciliation**: `src/data/products/datto-azure-backup.ts`

## Branch: `origin/feat/backlog`
- **Unique Commits**: `8456f65`, `b6f15af`, `c0ccf79`, `bed8c46`, `67a7f4d`, `15fd536`
- **Useful Changes**: Generates deep product content for `bullphish-id`, `darkweb-id`, and `inky`.
- **Incorrect Changes**: `datto-saas-protection.ts` contains the hallucinated "destructive restore" workflow for OneDrive ransomware recovery.
- **Superseded Changes**: `ProductMap`, `QuickReference`, `OnboardingModal` implementations (already manually integrated into `main`).
- **Files Safe to Port**: `src/data/products/bullphish-id.ts`, `src/data/products/darkweb-id.ts`
- **Files Requiring Manual Reconciliation**: `src/data/products/datto-saas-protection.ts`, `src/data/products/inky.ts`
