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
