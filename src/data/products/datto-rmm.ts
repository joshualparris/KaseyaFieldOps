import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-rmm',
  name: 'Datto RMM',
  description: 'Remote Monitoring and Management for endpoints.',
  iconName: 'MonitorDot',
  color: 'bg-blue-600',
  order: 1,
};

export const scenarios: Scenario[] = [
  {
    id: 'rmm-offline-endpoint',
    moduleId: 'datto-rmm',
    title: 'Offline Endpoint Triage',
    description: 'A client reports a critical laptop hasn\'t checked in for 6 days.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You receive a ticket: "Jane\'s laptop (LAPTOP-014) is offline and hasn\'t checked into Datto RMM in 6 days." What is your first investigative step?',
        options: [
          {
            id: 'opt-1-1',
            text: 'Reboot the device from the Datto RMM console.',
            isCorrect: false,
            feedback: 'The device is offline in RMM, so a remote reboot command will just queue and not execute until it checks in.',
            nextStepId: 'step-1',
          },
          {
            id: 'opt-1-2',
            text: 'Check the device details in Datto RMM for Last Check-In Time and Last Logged In User.',
            isCorrect: true,
            feedback: 'Correct. You need to gather facts first. Is it truly 6 days? Who was using it last?',
            nextStepId: 'step-2',
          }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You see the last check-in was indeed 6 days ago. The last logged-in user was jsmith. What else should you check in the RMM console before reaching out?',
        options: [
          {
            id: 'opt-2-1',
            text: 'Check if there is an active Datto EDR alert for the device.',
            isCorrect: true,
            feedback: 'Good thinking. If EDR isolated the device, that would explain why it is offline in RMM.',
            nextStepId: 'step-3',
          }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You check Datto EDR, but there are no alerts. You contact Jane. She says she has been on vacation and left the laptop at home, turned off. What is your ticket note?',
        options: [
          {
            id: 'opt-3-2',
            text: 'Investigated offline status for LAPTOP-014. Verified 6 days offline in RMM, no EDR isolations. Contacted user jsmith, who confirmed she is on vacation and device is powered off. No further action needed.',
            isCorrect: true,
            feedback: 'Excellent. You gathered evidence, formed a hypothesis, tested it with the user, and documented clearly.',
          }
        ]
      }
    }
  },
  {
    id: 'rmm-policy-conflict',
    moduleId: 'datto-rmm',
    title: 'Policy Conflict Resolution',
    description: 'A newly deployed monitoring policy isn\'t applying to a specific server.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You created a "High CPU Alert" policy at the Global level, but SERVER-01 is not generating alerts when CPU hits 99%. Where do you look first?',
        options: [
          { id: 'opt-1-1', text: 'Re-push the agent to the server.', isCorrect: false, feedback: 'Reinstalling is a last resort. Check configuration first.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Check the device\'s active policies in its Device Summary page.', isCorrect: true, feedback: 'Correct. You need to verify if the policy is actually applied or being overridden.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The Device Summary shows a different policy named "Legacy Server CPU" is applied. Why did this happen?',
        options: [
          { id: 'opt-2-1', text: 'Site-level policies override Global-level policies.', isCorrect: true, feedback: 'Exactly. RMM policies follow a hierarchy: Device > Site > Global. The Legacy policy is likely at the Site level.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How should you resolve this so all servers use the new Global policy?',
        options: [
          { id: 'opt-3-1', text: 'Delete the Legacy Site-level policy.', isCorrect: true, feedback: 'Yes, removing the lower-level override allows the Global policy to apply correctly.' }
        ]
      }
    }
  },
  {
    id: 'rmm-patch-failure',
    moduleId: 'datto-rmm',
    title: 'Patch Management Failure',
    description: 'A critical Windows update fails repeatedly on a specific site.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'Ten workstations at a client site show as "Failed" for the latest cumulative update in the Patch Management dashboard. What is the first investigative step?',
        options: [
          { id: 'opt-1-1', text: 'Check the Patch Status details for the specific error code across the failed devices.', isCorrect: true, feedback: 'Correct. Finding a common error code helps identify the root cause.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The error code is 0x8024402c, indicating a Windows Update connectivity issue. What is the most likely cause for an entire site failing with this?',
        options: [
          { id: 'opt-2-1', text: 'A firewall or content filter at the site is blocking access to Microsoft Update servers.', isCorrect: true, feedback: 'Yes, site-wide connectivity issues usually point to network-level blocking.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You confirm a new firewall rule was added yesterday. What is your next action?',
        options: [
          { id: 'opt-3-1', text: 'Adjust the firewall rule to allow Windows Update traffic, then trigger a manual patch scan in RMM.', isCorrect: true, feedback: 'Correct. Fix the network issue, then use RMM to verify the fix.' }
        ]
      }
    }
  },
  {
    id: 'rmm-component-script',
    moduleId: 'datto-rmm',
    title: 'Custom Component Deployment',
    description: 'A custom PowerShell script deployed via RMM is failing silently.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You wrote a PowerShell script to clean temp files and added it as an RMM component. It runs, but files aren\'t deleted and there is no error output. What do you check?',
        options: [
          { id: 'opt-1-1', text: 'Check if the component is set to run as "System" or "Logged in User".', isCorrect: true, feedback: 'Correct. If it runs as System, it won\'t have access to the user\'s AppData Temp folder without specific coding.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'It is running as "System". The script uses $env:TEMP. Why did it fail silently?',
        options: [
          { id: 'opt-2-1', text: 'For the System account, $env:TEMP points to C:\\Windows\\Temp, not the user profile temp folder.', isCorrect: true, feedback: 'Exactly. It deleted the System temp files, which you didn\'t notice.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How do you fix the component?',
        options: [
          { id: 'opt-3-1', text: 'Change the execution context in the RMM component settings to "Logged in User".', isCorrect: true, feedback: 'Correct, this is the simplest fix if you want to target the user profile.' }
        ]
      }
    }
  },
  {
    id: 'rmm-alert-fatigue',
    moduleId: 'datto-rmm',
    title: 'Managing Alert Fatigue',
    description: 'A disk space monitor is generating hundreds of tickets for small non-system drives.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The helpdesk is overwhelmed with "Low Disk Space" tickets for small recovery partitions (e.g., Drive E: 500MB). How do you adjust the RMM monitor?',
        options: [
          { id: 'opt-1-1', text: 'Modify the monitor to exclude drives based on drive letter or size.', isCorrect: true, feedback: 'Correct. You can configure exclusions in the monitor settings.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You open the monitor settings. What is the most robust way to exclude recovery partitions across all clients?',
        options: [
          { id: 'opt-2-1', text: 'Add a WMI filter to the monitor to only target System Drives, or exclude drives under 5GB.', isCorrect: true, feedback: 'Yes. Filtering by size or system flag is more robust than relying on drive letters.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'After updating the policy, you still see old alerts open in the dashboard. What should you do?',
        options: [
          { id: 'opt-3-1', text: 'Bulk resolve the existing alerts from the Alerts page, as the new policy will prevent future ones.', isCorrect: true, feedback: 'Correct. Updating a policy doesn\'t automatically close previously generated alerts.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-rmm-1', moduleId: 'datto-rmm', question: 'What is the primary purpose of Datto RMM?', answer: 'Remote Monitoring and Management: managing endpoints, running remote actions, patching, and monitoring device health proactively.' },
  { id: 'fc-rmm-2', moduleId: 'datto-rmm', question: 'Where would you look in Datto RMM to see if a device is online?', answer: 'The Device Summary page or the Devices list, looking for the green online indicator next to the hostname.' },
  { id: 'fc-rmm-3', moduleId: 'datto-rmm', question: 'What is the policy inheritance hierarchy in Datto RMM?', answer: 'Global level is overridden by Site level, which is overridden by Device level.' },
  { id: 'fc-rmm-4', moduleId: 'datto-rmm', question: 'What is a "Component" in Datto RMM?', answer: 'A reusable script, application installer, or monitor definition that can be deployed via jobs or policies.' },
  { id: 'fc-rmm-5', moduleId: 'datto-rmm', question: 'How do you force an immediate check-in for an online device?', answer: 'Use the "Request Device Audit" or "Request Check-in" action from the device summary.' },
  { id: 'fc-rmm-6', moduleId: 'datto-rmm', question: 'What does "Execution Context" mean in a component?', answer: 'Whether the script runs as the "System" account (admin rights, no user profile) or "Logged In User" (user rights, accesses user profile).' },
  { id: 'fc-rmm-7', moduleId: 'datto-rmm', question: 'What is a "Job" in Datto RMM?', answer: 'A scheduled or immediate task to deploy a component to one or more devices.' },
  { id: 'fc-rmm-8', moduleId: 'datto-rmm', question: 'What is a "Site" in Datto RMM terminology?', answer: 'A logical grouping of devices, typically representing a specific client or a physical location.' },
  { id: 'fc-rmm-9', moduleId: 'datto-rmm', question: 'How do you deploy third-party software updates?', answer: 'Using the Software Management policies, which handle automated patching for supported third-party apps.' },
  { id: 'fc-rmm-10', moduleId: 'datto-rmm', question: 'What is the "Web Remote" feature?', answer: 'The built-in browser-based remote control tool in Datto RMM for screen sharing and command-line access.' },
  { id: 'fc-rmm-11', moduleId: 'datto-rmm', question: 'What is a "Filter" in Datto RMM?', answer: 'A dynamic search query used to group devices based on specific criteria (e.g., OS version, missing patches) for targeting policies or jobs.' },
  { id: 'fc-rmm-12', moduleId: 'datto-rmm', question: 'Why might a device show as "Online" but fail to execute a job?', answer: 'The Datto RMM agent service on the endpoint might be hung, or there could be a localized network/firewall issue blocking the job payload.' },
  { id: 'fc-rmm-13', moduleId: 'datto-rmm', question: 'What is the purpose of the "Agent Browser"?', answer: 'A technician tool to interact with a device\'s file system, registry, services, and processes in the background without disturbing the user.' },
  { id: 'fc-rmm-14', moduleId: 'datto-rmm', question: 'How can you automatically resolve an alert when a problem is fixed?', answer: 'Configure the monitor with an "Auto-Resolve" condition (e.g., if CPU drops below 80% for 5 minutes, resolve the alert).' },
  { id: 'fc-rmm-15', moduleId: 'datto-rmm', question: 'What is a "Quick Job"?', answer: 'A way to instantly deploy a single component to selected devices without setting up a full scheduled job.' }
];
