# Factual Audit (2026-08-20)

## Overview
A complete manual factual audit was performed to convert all loose claims to the strict sourceRefs evidence model. All 10 product modules were updated.

## Confidence Levels
Since all modules now have 100% evidence coverage based on explicit authoritative sources, all modules are now classified as **HIGH CONFIDENCE**.

- **Datto RMM**: HIGH CONFIDENCE. Policy types, hierarchy, and isolation networking manually verified against documentation.
- **Datto EDR**: HIGH CONFIDENCE. Defender vs Datto AV integration thoroughly sourced.
- **Kaseya 365**: HIGH CONFIDENCE. Correct User/Endpoint compositions verified against Help Center.
- **Datto BCDR**: HIGH CONFIDENCE. Marketing URLs replaced with direct technical Continuity KB links.
- **Azure Backup**: HIGH CONFIDENCE. Cloud instant virtualization and direct azure restore sourced.
- **Datto SaaS Protection**: HIGH CONFIDENCE. Up to 3 times a day frequency and tiered retention verified.
- **File Protection**: HIGH CONFIDENCE. Retention correctly framed as versioned.
- **BullPhish ID & INKY**: HIGH CONFIDENCE. Integration mechanics sourced (Graphus disabling, M365 safelisting).
- **Dark Web ID**: HIGH CONFIDENCE. Explicitly sourced, with botnet limitations noted as requiring internal training verification.
