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
