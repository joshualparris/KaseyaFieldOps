import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'kaseya-365',
  name: 'Kaseya 365 Endpoint',
  description: 'Comprehensive endpoint management, security, and backup suite.',
  iconName: 'Layers',
  color: 'bg-green-600',
  order: 9,
};

export const scenarios: Scenario[] = [
  {
    id: 'k365-onboarding-conflict',
    moduleId: 'kaseya-365',
    title: 'Endpoint Enrollment Conflict',
    description: 'Deploying Kaseya 365 Endpoint to a device with existing third-party AV.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You are deploying the Kaseya 365 Endpoint package to a new client site. The endpoints currently have a legacy third-party Antivirus installed. What is the correct deployment order?',
        options: [
          { id: 'opt-1-1', text: 'Deploy the full K365 package immediately to ensure coverage.', isCorrect: false, feedback: 'Installing EDR/AV over an existing, active third-party AV will likely cause extreme performance degradation or system crashes.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Deploy the RMM agent first, use it to script the removal of the legacy AV, then push the K365 Endpoint security components.', isCorrect: true, feedback: 'Correct. The RMM agent acts as your beachhead to cleanly remove conflicting software before deploying the security stack.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You pushed the RMM agent and a script to uninstall the legacy AV, but the script failed on several machines because the legacy AV has tamper protection enabled. What is the most efficient next step?',
        options: [
          { id: 'opt-2-1', text: 'Reboot the machines into Safe Mode manually via RDP.', isCorrect: false, feedback: 'Manual RDP into dozens of machines is too slow and inefficient.', nextStepId: 'step-2' },
          { id: 'opt-2-2', text: 'Use the legacy AV\'s management console to centrally disable tamper protection or push the authorized uninstallation token, then re-run the RMM script.', isCorrect: true, feedback: 'Yes. Centralized management is always preferred. Disable the protection at the source, then automate the removal.' }
        ]
      }
    }
  },
  {
    id: 'k365-policy-hierarchy',
    moduleId: 'kaseya-365',
    title: 'Unified Policy Assignment',
    description: 'Ensuring consistent security postures across multiple clients.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You need to ensure that all K365 managed endpoints have a baseline RMM monitoring policy applied. How should you apply this?',
        options: [
          { id: 'opt-1-1', text: 'Create a Site-level policy for each customer individually.', isCorrect: false, feedback: 'This does not scale. It requires manually creating the policy for every new client.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Create a Global-level baseline policy, and apply it to a Device Filter that captures all K365 managed endpoints.', isCorrect: true, feedback: 'Correct. Global policies ensure a consistent baseline across all tenants automatically.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The CEO of Client A needs an exception to this global monitoring policy. How do you implement this safely in Datto RMM?',
        options: [
          { id: 'opt-2-1', text: 'Disable the Global monitoring policy.', isCorrect: false, feedback: 'Never weaken the global baseline for a single exception.', nextStepId: 'step-2' },
          { id: 'opt-2-2', text: 'Create a Site-level policy specifically for Client A with the required exception, or exclude the CEO\'s laptop via a Device Filter.', isCorrect: true, feedback: 'Yes. In Datto RMM, Site-level policies override Global policies, or you can manage exceptions securely using Device Filters.' }
        ]
      }
    }
  },
  {
    id: 'k365-patch-compliance',
    moduleId: 'kaseya-365',
    title: 'Zero-Day Vulnerability Triage',
    description: 'Identifying and patching a critical vulnerability across the fleet.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A critical Zero-Day vulnerability in Chrome is announced. You need to ensure all K365 endpoints are updated immediately. What is the fastest way to gain visibility into the fleet\'s current exposure?',
        options: [
          { id: 'opt-1-1', text: 'Run a Global Device Filter or Report for devices with Chrome installed but missing the specific patched version.', isCorrect: true, feedback: 'Correct. Leverage the RMM\'s global inventory to instantly identify vulnerable targets.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The filter identifies 400 vulnerable endpoints. What is the best way to remediate them?',
        options: [
          { id: 'opt-2-1', text: 'Create an ad-hoc "Quick Job" that pushes the latest Chrome update via Software Management to the targeted filter.', isCorrect: true, feedback: 'Exactly. Target the remediation only to the vulnerable machines for a rapid, focused patch deployment.' }
        ]
      }
    }
  },
  {
    id: 'k365-backup-verification',
    moduleId: 'kaseya-365',
    title: 'Endpoint Backup Validation',
    description: 'A VIP user deleted an important presentation.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A VIP user calls in a panic. They accidentally deleted their Q3 Board Presentation from their laptop desktop 10 minutes ago and emptied the recycle bin. The laptop is protected by Kaseya 365 Endpoint Backup. What do you do?',
        options: [
          { id: 'opt-1-1', text: 'Log into the K365/Datto Backup portal, locate the device, and initiate a file restore from the most recent recovery point.', isCorrect: true, feedback: 'Correct. Endpoint backup is designed exactly for this scenario.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You check the portal, but the last successful backup was 3 days ago because the laptop was offline. The user created the presentation yesterday. What now?',
        options: [
          { id: 'opt-2-1', text: 'The file is likely lost from the backup perspective. Check if they have Volume Shadow Copies (VSS) or OneDrive folder redirection enabled locally as a fallback.', isCorrect: true, feedback: 'Correct. If the backup didn\'t run, you must rely on alternative local or cloud-sync recovery methods.' }
        ]
      }
    }
  },
  {
    id: 'k365-threat-containment',
    moduleId: 'kaseya-365',
    title: 'Unified Threat Containment',
    description: 'Coordinating RMM and EDR during an active incident.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'K365 Endpoint EDR detects malicious behavior on a workstation and automatically isolates it. The user calls complaining they lost internet. What is your first action?',
        options: [
          { id: 'opt-1-1', text: 'Un-isolate the device so the user can keep working.', isCorrect: false, feedback: 'Never un-isolate a device during an active threat investigation.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Use the EDR console to review the process tree and confirm the threat, then use the RMM Web Remote/Agent Browser (which maintains connectivity during isolation) to investigate locally.', isCorrect: true, feedback: 'Correct. Isolation blocks normal traffic but allows the RMM/EDR agent tools to connect so you can remediate.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You connect via Agent Browser. You see the threat was a macro-enabled Word document. What is the next logical step before un-isolating?',
        options: [
          { id: 'opt-2-1', text: 'Un-isolate now that you know it was just a Word doc.', isCorrect: false, feedback: 'You still need to ensure the malware didn\'t drop persistence or move laterally.', nextStepId: 'step-2' },
          { id: 'opt-2-2', text: 'Use EDR to Quarantine the file and Rollback changes, then run a full scan while still isolated.', isCorrect: true, feedback: 'Correct. Remediate and verify while the device is still safely contained.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The scan comes back clean. How do you return the user to productivity?',
        options: [
          { id: 'opt-3-1', text: 'Remove the isolation from the EDR console, restoring normal network access.', isCorrect: true, feedback: 'Yes. Only remove isolation once you are 100% confident the threat is neutralized.' }
        ]
      }
    }
  },
  {
    id: 'k365-inky-replacement',
    moduleId: 'kaseya-365',
    title: 'Client asks why they\'re paying for two email security products',
    description: 'Tech needs to know INKY replaced Datto SaaS Defense/Graphus as the primary email security in the bundle, and explain the transition.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client reviews their invoice and sees a charge for "Datto SaaS Defense" and also sees "INKY Email Security" listed in their new Kaseya 365 User bundle. They ask why they are paying for both. How do you respond?',
        options: [
          { id: 'opt-1-1', text: 'Explain that INKY is the new premier email security solution included in the Kaseya 365 User bundle, replacing the older SaaS Defense/Graphus products, and the old billing line item should be removed as they migrate.', isCorrect: true, feedback: 'Correct. INKY is the go-forward email security platform in the bundle.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The client asks what makes INKY different from their old solution.',
        options: [
          { id: 'opt-2-1', text: 'INKY uses dynamic color-coded banners injected directly into emails to train users in real-time, plus advanced impersonation protection.', isCorrect: true, feedback: 'Yes. INKY\'s distinctive feature is the inline banner system.' }
        ]
      }
    }
  },
  {
    id: 'k365-kaseyaone-nav',
    moduleId: 'kaseya-365',
    title: 'Where do I even find this module?',
    description: 'KaseyaOne portal navigation, SSO login flow, the "My Modules" tile-based access pattern.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A new technician needs to check a Dark Web ID alert for a client, but they don\'t know the URL for Dark Web ID and don\'t have a direct password for it. How should they access it?',
        options: [
          { id: 'opt-1-1', text: 'Log into the KaseyaOne portal (one.kaseya.com) using their SSO credentials (e.g., Microsoft or Google) and launch Dark Web ID from the "My Modules" grid.', isCorrect: true, feedback: 'Correct. KaseyaOne acts as the unified SSO launchpad for all Kaseya modules.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The technician logs into KaseyaOne but doesn\'t see the Dark Web ID tile in "My Modules". Why?',
        options: [
          { id: 'opt-2-1', text: 'Their user account hasn\'t been granted access to the Dark Web ID module within the KaseyaOne User Management settings.', isCorrect: true, feedback: 'Yes. Tiles only appear for modules the user is explicitly licensed/permissioned to access.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-k365-1', moduleId: 'kaseya-365', question: 'What are the core components of Kaseya 365 Endpoint?', answer: 'Remote Monitoring and Management (RMM), Antivirus (AV), Endpoint Detection and Response (EDR), Patch Management, and Endpoint Backup.' },
  { id: 'fc-k365-2', moduleId: 'kaseya-365', question: 'Why is it dangerous to deploy K365 AV/EDR over an existing third-party AV?', answer: 'It can cause severe system performance degradation, lockups, and unexpected issues due to multiple security agents fighting over file access.' },
  { id: 'fc-k365-3', moduleId: 'kaseya-365', question: 'What is the standard policy hierarchy in Datto RMM (often used in K365)?', answer: 'Site-level policies override Global-level policies. Device-level exceptions are typically handled via Filters or Groups.' },
  { id: 'fc-k365-4', moduleId: 'kaseya-365', question: 'What is a "Baseline" policy?', answer: 'A Global or Site-level policy that establishes the minimum acceptable security or monitoring configuration for all targeted endpoints.' },
  { id: 'fc-k365-5', moduleId: 'kaseya-365', question: 'How do you target a script or patch to only a specific subset of machines across multiple clients?', answer: 'Use a Global Device Filter based on specific criteria (e.g., OS version, missing patch), then target a Job to that filter.' },
  { id: 'fc-k365-6', moduleId: 'kaseya-365', question: 'What is the primary function of Endpoint Backup within K365?', answer: 'To provide continuous, file-level or image-level backup for user devices (laptops/desktops) that may frequently be off the corporate network.' },
  { id: 'fc-k365-7', moduleId: 'kaseya-365', question: 'If a device is "Isolated" by EDR, how do you access it to remediate the threat?', answer: 'The RMM and EDR agent communication channels remain open during isolation, allowing you to use Web Remote or Agent Browser to connect.' },
  { id: 'fc-k365-8', moduleId: 'kaseya-365', question: 'What does "Software Management" do in K365?', answer: 'It automates the discovery, approval, and deployment of OS updates and supported third-party application patches.' },
  { id: 'fc-k365-9', moduleId: 'kaseya-365', question: 'What is a "Zero-Day" vulnerability?', answer: 'A software flaw that is actively being exploited before the vendor has released a patch.' },
  { id: 'fc-k365-10', moduleId: 'kaseya-365', question: 'How can RMM help during a Zero-Day incident?', answer: 'By using filters to quickly identify vulnerable software versions across the entire fleet and pushing a rapid uninstallation script or emergency patch.' },
  { id: 'fc-k365-11', moduleId: 'kaseya-365', question: 'What is the difference between RMM and EDR?', answer: 'RMM is for IT operations (monitoring health, deploying software, remote control). EDR is for security (detecting malicious behavior, isolating threats).' },
  { id: 'fc-k365-12', moduleId: 'kaseya-365', question: 'Why should you test patches on a small group before a global rollout?', answer: 'To ensure the patch doesn\'t cause unexpected crashes or break critical line-of-business applications.' },
  { id: 'fc-k365-13', moduleId: 'kaseya-365', question: 'What is the "Agent Browser"?', answer: 'A tool in the RMM that allows technicians to manage services, registry, files, and command line in the background without interrupting the user.' },
  { id: 'fc-k365-14', moduleId: 'kaseya-365', question: 'What is a "Quick Job"?', answer: 'An ad-hoc, immediate deployment of a script or component to a selected group of devices, rather than a recurring scheduled schedule.' },
  { id: 'fc-k365-15', moduleId: 'kaseya-365', question: 'How does K365 provide "Unified Visibility"?', answer: 'By integrating RMM, EDR, and Backup status into single dashboard views, reducing the need to switch between multiple portals.' },
  { id: 'fc-k365-16', moduleId: 'kaseya-365', question: 'Where in Kaseya 365 do you check if a device is protected by all three core security layers (AV, EDR, Backup)?', answer: 'The Kaseya 365 Executive Dashboard or the device\'s unified Security Posture widget.' },
  { id: 'fc-k365-17', moduleId: 'kaseya-365', question: 'What does a red shield icon typically indicate on the K365 Executive Summary report?', answer: 'A critical failure in one of the security layers, such as the EDR agent being offline or AV definitions being severely out of date.' },
  { id: 'fc-k365-18', moduleId: 'kaseya-365', question: 'How can you verify that Endpoint Backup is running successfully across all devices in a tenant?', answer: 'Use the K365 Backup Compliance Report, which aggregates the last successful backup timestamp for all endpoints.' },
  { id: 'fc-k365-19', moduleId: 'kaseya-365', question: 'If a user complains of slow performance, how does the K365 dashboard help correlate the issue?', answer: 'You can view CPU/Memory alerts from RMM alongside active EDR scans or Backup jobs running concurrently on the same device.' },
  { id: 'fc-k365-20', moduleId: 'kaseya-365', question: 'What is the "Anti-Virus Compliance" widget designed to show?', answer: 'The percentage of devices that have an active AV agent installed and are running the most recent definition updates.' },
  { id: 'fc-k365-21', moduleId: 'kaseya-365', question: 'Is INKY Email Security included in the Kaseya 365 User bundle, or is it a separate purchase?', answer: 'INKY is included as the primary email security solution in the Kaseya 365 User bundle.' },
  { id: 'fc-k365-22', moduleId: 'kaseya-365', question: 'Are BullPhish ID and Dark Web ID included in Kaseya 365 User?', answer: 'Yes, both security awareness training (BullPhish ID) and compromised credential monitoring (Dark Web ID) are included in the User bundle.' },
  { id: 'fc-k365-23', moduleId: 'kaseya-365', question: 'Is Datto SaaS Protection (M365/Google Workspace backup) included in the Kaseya 365 User bundle?', answer: 'Yes, SaaS Protection/Spanning is a core component of the User bundle for protecting cloud data.' },
  { id: 'fc-k365-24', moduleId: 'kaseya-365', question: 'Is SaaS Alerts (cloud application monitoring) included in the Kaseya 365 User bundle?', answer: 'Yes, SaaS Alerts is included to provide monitoring and automated remediation for M365 and Google Workspace environments.' },
  { id: 'fc-k365-25', moduleId: 'kaseya-365', question: 'What is the purpose of KaseyaOne?', answer: 'It is the unified single sign-on (SSO) portal and launchpad for accessing all Kaseya modules (like RMM, EDR, INKY, etc.) from one place.' },
  { id: 'fc-k365-26', moduleId: 'kaseya-365', question: 'If a module is missing from your KaseyaOne "My Modules" grid, what is the most likely cause?', answer: 'Your user account has not been assigned the necessary role or permissions to access that module in KaseyaOne settings.' }
];
