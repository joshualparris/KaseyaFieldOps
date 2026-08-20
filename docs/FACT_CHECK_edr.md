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
