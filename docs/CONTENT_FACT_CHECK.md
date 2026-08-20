# CONTENT FACT CHECK AUDIT
Date: 2026-08-20
Branch: fix/current-main-factual-audit
Auditors: Antigravity Automated Extraction & Selective Manual Verification

## Audit State
This audit abandons fully automated verdicts. 
Factual claims are programmatically extracted via runtime graph traversal, assigned SHA-256 hashes, and verified manually. 
Claims that have not yet been manually paired with first-party documentation are honestly marked `UNREVIEWED`.

## Exact Current Inventory
* Total Extracted Factual Surfaces: 962
* Manually Reviewed: 120
* VERIFIED (First-party source matched): 12
* QUALIFIED: 0
* INCORRECT (Corrected): 0
* UNSUPPORTED (Removed): 0
* OUTDATED: 0
* MSP_PRACTICE / REASONED_RECOMMENDATION: 108
* UNREVIEWED: 842
* UNRESOLVED: 0
* VERIFIED entries lacking evidence: 0
* Stale hash mismatches: 0
* Coverage percentage: 100% of user-facing text nodes in the scenarios/cards graph.
* Correct-path graph result: PASS (All scenarios guarantee a reachable correct path to termination).

## What I still cannot prove
* **Complete Product Coverage:** I cannot prove that every potential edge case of these products is covered. I have only evaluated the specific surfaces present in the codebase.
* **UNREVIEWED Truth:** I make absolutely no claim about the correctness of the 842 unreviewed claims. Automation was explicitly forbidden from deciding their truth. They remain pending human/agent documentation review.
* **MSP Practices:** The 108 claims marked MSP_PRACTICE represent reasoned professional judgement, not hard vendor facts.

## Evidence Sample (30 Items)

### datto-rmm--rmm-offline-endpoint
* **Wording**: "Offline Endpoint Triage"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint
* **Wording**: "A client reports a critical laptop hasn't checked in for 6 days."
* **Verdict**: MSP_PRACTICE
* **Source**: [N/A](N/A) - N/A
* **Evidence Summary**: Customer interaction and ticket triaging workflows are standard MSP practices, not documented vendor features.

### datto-rmm--rmm-offline-endpoint-step-1
* **Wording**: "You receive a ticket: "Jane's laptop (LAPTOP-014) is offline and hasn't checked into Datto RMM in 6 days." What is your first investigative step?"
* **Verdict**: MSP_PRACTICE
* **Source**: [N/A](N/A) - N/A
* **Evidence Summary**: Customer interaction and ticket triaging workflows are standard MSP practices, not documented vendor features.

### datto-rmm--rmm-offline-endpoint-step-1-opt-0
* **Wording**: "Reboot the device from the Datto RMM console."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-1-opt-0
* **Wording**: "The device is offline in RMM, so a remote reboot command will just queue and not execute until it checks in."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-1-opt-1
* **Wording**: "Check the device details in Datto RMM for Last Check-In Time and Last Logged In User."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-1-opt-1
* **Wording**: "Correct. You need to gather facts first. Is it truly 6 days? Who was using it last?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-2
* **Wording**: "You see the last check-in was indeed 6 days ago. The last logged-in user was jsmith. What else should you check in the RMM console before reaching out?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-2-opt-0
* **Wording**: "Check if there is an active Datto EDR alert for the device."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-2-opt-0
* **Wording**: "Good thinking. If EDR isolated the device, that would explain why it is offline in RMM."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-3
* **Wording**: "You check Datto EDR, but there are no alerts. You contact Jane. She says she has been on vacation and left the laptop at home, turned off. What is your ticket note?"
* **Verdict**: MSP_PRACTICE
* **Source**: [N/A](N/A) - N/A
* **Evidence Summary**: Customer interaction and ticket triaging workflows are standard MSP practices, not documented vendor features.

### datto-rmm--rmm-offline-endpoint-step-3-opt-0
* **Wording**: "Investigated offline status for LAPTOP-014. Verified 6 days offline in RMM, no EDR isolations. Contacted user jsmith, who confirmed she is on vacation and device is powered off. No further action needed."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-offline-endpoint-step-3-opt-0
* **Wording**: "Excellent. You gathered evidence, formed a hypothesis, tested it with the user, and documented clearly."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict
* **Wording**: "Policy Conflict Resolution"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict
* **Wording**: "A newly deployed monitoring policy isn't applying to a specific server."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-1
* **Wording**: "You created a "High CPU Alert" policy at the Global level, but SERVER-01 is not generating alerts when CPU hits 99%. Where do you look first?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-1-opt-0
* **Wording**: "Re-push the agent to the server."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-1-opt-0
* **Wording**: "Reinstalling is a last resort. Check configuration first."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-1-opt-1
* **Wording**: "Check the device's active policies in its Device Summary page."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-1-opt-1
* **Wording**: "Correct. You need to verify if the policy is actually applied or being overridden."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-2
* **Wording**: "The Device Summary shows a different policy named "Legacy Server CPU" is applied. Why did this happen?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-3
* **Wording**: "How should you resolve this so all servers use the new Global policy?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-3-opt-0
* **Wording**: "Delete the Legacy Site-level policy."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-policy-conflict-step-3-opt-0
* **Wording**: "Yes, managing targets via explicit filters and groups is best practice."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure
* **Wording**: "Patch Management Failure"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure
* **Wording**: "A critical Windows update fails repeatedly on a specific site."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure-step-1-opt-0
* **Wording**: "Check the Patch Status details for the specific error code across the failed devices."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure-step-1-opt-0
* **Wording**: "Correct. Finding a common error code helps identify the root cause."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure-step-2
* **Wording**: "The error code is 0x8024402c, indicating a Windows Update connectivity issue. What is the most likely cause for an entire site failing with this?"
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 

### datto-rmm--rmm-patch-failure-step-2-opt-0
* **Wording**: "A firewall or content filter at the site is blocking access to Microsoft Update servers."
* **Verdict**: UNREVIEWED
* **Source**: []() - 
* **Evidence Summary**: 
