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
  },
  {
    id: 'rmm-agent-reinstall',
    moduleId: 'datto-rmm',
    title: 'Agent Re-enrollment Procedure',
    description: 'An endpoint agent is completely broken and must be manually re-enrolled.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The RMM agent on a critical Windows server is permanently disconnected. The service refuses to start. You have RDP access. What is the cleanest way to reinstall?',
        options: [
          { id: 'opt-1-1', text: 'Download a new agent installer from the site and run it over the broken one.', isCorrect: false, feedback: 'Running the installer over a broken installation often leaves corrupt registry keys intact.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Use the official Datto RMM Agent Uninstall Tool (or script) to cleanly scrub the registry and ProgramData, then reinstall using a fresh site installer.', isCorrect: true, feedback: 'Correct. A clean scrub is required when the agent service is deeply corrupted.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'After reinstalling, the server appears as a duplicate record in the RMM console. How do you fix this?',
        options: [
          { id: 'opt-2-1', text: 'Merge the devices in the RMM console or delete the old offline record.', isCorrect: true, feedback: 'Yes. The new installation generated a new Unique Identifier (UID), so you must manually clean up the old record.' }
        ]
      }
    }
  },
  {
    id: 'rmm-multi-site-policy',
    moduleId: 'datto-rmm',
    title: 'Multi-Site Policy Propagation',
    description: 'A global policy change is acting differently across various client sites.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You updated a Global monitoring policy to alert at 90% memory usage instead of 95%. However, Client A is still alerting at 95%, while Client B updated to 90%. Why?',
        options: [
          { id: 'opt-1-1', text: 'Client A has a Site-level policy overriding the Global policy.', isCorrect: true, feedback: 'Correct. Site policies take precedence over Global policies.', nextStepId: 'step-2' },
          { id: 'opt-1-2', text: 'The Global policy hasn\'t finished syncing to Client A yet.', isCorrect: false, feedback: 'Policy syncs are generally immediate. It is much more likely an override exists.', nextStepId: 'step-1' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You check Client A\'s site policies but find NO memory monitoring policies. Why is it still overriding?',
        options: [
          { id: 'opt-2-1', text: 'A Device-level override was placed on all servers at Client A.', isCorrect: true, feedback: 'Yes. If it\'s not at the Site level, individual Device-level overrides are the next place to look.' }
        ]
      }
    }
  },
  {
    id: 'rmm-script-timeout',
    moduleId: 'datto-rmm',
    title: 'Script Deployment Timeout',
    description: 'A data collection script is timing out on multiple endpoints.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You pushed a PowerShell script to gather local admin accounts. The job fails with a "Timeout" error after 10 minutes on most endpoints. What is the likely cause?',
        options: [
          { id: 'opt-1-1', text: 'The script requires user interaction (like a prompt) and is hanging because it is running silently as System.', isCorrect: true, feedback: 'Correct. Background scripts must be completely silent. Any prompt will hang the execution until it hits the timeout limit.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you prevent this in the future?',
        options: [
          { id: 'opt-2-1', text: 'Test the script locally using PsExec running as SYSTEM to simulate the RMM environment before deploying.', isCorrect: true, feedback: 'Excellent. This is the best way to catch silent prompts or System-account quirks.' }
        ]
      }
    }
  },
  {
    id: 'rmm-mac-deployment',
    moduleId: 'datto-rmm',
    title: 'macOS Agent Deployment',
    description: 'Dealing with Privacy & Security prompts during a Mac deployment.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You deploy the Datto RMM agent to a new MacBook. The agent checks in, but features like Web Remote and screenshot capture do not work. Why?',
        options: [
          { id: 'opt-1-1', text: 'The macOS firewall is blocking inbound connections.', isCorrect: false, feedback: 'Web Remote uses outbound connections, so inbound firewall rules do not affect it.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'The agent lacks Full Disk Access and Screen Recording permissions in macOS System Settings.', isCorrect: true, feedback: 'Correct. Apple requires explicit user approval or an MDM profile for these permissions.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How can you deploy the agent to 50 Macs without manually clicking "Allow" on every single one?',
        options: [
          { id: 'opt-2-1', text: 'Deploy the agent via an MDM (like Jamf or Datto MDM) alongside a Privacy Preferences Policy Control (PPPC) profile.', isCorrect: true, feedback: 'Yes. An MDM is required to silently grant these permissions on modern macOS.' }
        ]
      }
    }
  },
  {
    id: 'rmm-network-discovery',
    moduleId: 'datto-rmm',
    title: 'Network Discovery Deployment',
    description: 'Scanning a new client subnet to find unmanaged devices.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You onboard a new site and need to find all unmanaged switches and printers. How do you configure Network Discovery?',
        options: [
          { id: 'opt-1-1', text: 'Install the Datto RMM agent on a server, designate it as a Network Node, and configure a scan job for the local subnet.', isCorrect: true, feedback: 'Correct. You need a beachhead device (Node) to perform the localized SNMP/ping sweeps.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The scan completes but fails to pull manufacturer names and models for the switches. What is missing?',
        options: [
          { id: 'opt-2-1', text: 'You need to add the switches\' SNMP read-only community strings to the Network Discovery configuration.', isCorrect: true, feedback: 'Correct. Without SNMP credentials, the Node can only ping the devices and cannot query their details.' }
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
