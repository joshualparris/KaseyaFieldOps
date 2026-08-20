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
        text: 'You need to ensure that all Kaseya 365 Endpoint customers have a baseline EDR policy that blocks USB mass storage devices. How should you apply this?',
        options: [
          { id: 'opt-1-1', text: 'Create a Site-level policy for each customer individually.', isCorrect: false, feedback: 'This does not scale. It requires manually creating the policy for every new client.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Create a Global-level baseline policy, and apply it to a Device Filter that captures all K365 managed endpoints.', isCorrect: true, feedback: 'Correct. Global policies ensure a consistent baseline across all tenants automatically.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The CEO of Client A needs an exception to the USB blocking policy. How do you implement this safely?',
        options: [
          { id: 'opt-2-1', text: 'Disable the Global USB blocking policy.', isCorrect: false, feedback: 'Never weaken the global baseline for a single exception.', nextStepId: 'step-2' },
          { id: 'opt-2-2', text: 'Create a Device-level policy specifically for the CEO\'s laptop that allows USB access.', isCorrect: true, feedback: 'Yes. In the hierarchy, Device-level policies override Site and Global policies, keeping the exception tightly scoped.' }
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
          { id: 'opt-1-2', text: 'Use the EDR console to review the process tree and confirm the threat, then use the RMM Web Remote/Agent Browser (which bypasses isolation) to investigate locally.', isCorrect: true, feedback: 'Correct. Isolation blocks normal traffic but allows the RMM/EDR agent tools to connect so you can remediate.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-k365-1', moduleId: 'kaseya-365', question: 'What are the core components of Kaseya 365 Endpoint?', answer: 'Remote Monitoring and Management (RMM), Endpoint Detection and Response (EDR), Antivirus (AV), and Endpoint Backup.' },
  { id: 'fc-k365-2', moduleId: 'kaseya-365', question: 'Why is it dangerous to deploy K365 AV/EDR over an existing third-party AV?', answer: 'It can cause severe system performance degradation, lockups, and kernel panics due to multiple security agents fighting over file access.' },
  { id: 'fc-k365-3', moduleId: 'kaseya-365', question: 'What is the standard policy hierarchy in K365 RMM?', answer: 'Device-level overrides Site-level, which overrides Global-level policies.' },
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
  { id: 'fc-k365-15', moduleId: 'kaseya-365', question: 'How does K365 provide "Unified Visibility"?', answer: 'By integrating RMM, EDR, and Backup status into single dashboard views, reducing the need to switch between multiple portals.' }
];
