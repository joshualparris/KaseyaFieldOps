import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-edr',
  name: 'Datto EDR',
  description: 'Endpoint Detection and Response.',
  iconName: 'ShieldAlert',
  color: 'bg-red-600',
  order: 2,
  problemSolved: 'Traditional antivirus relies on known signatures, meaning zero-day malware and fileless attacks bypass them. Datto EDR monitors behavioral patterns to detect and respond to advanced threats.',
  mentalModel: 'Think of traditional AV like a bouncer checking IDs against a blacklist. Datto EDR is the security camera system watching behavior—even if the ID is valid, if the person starts breaking things, EDR alerts you and allows you to lock the doors (network isolation).',
  actualUseCases: [
    'Detecting ransomware that bypassed traditional AV.',
    'Isolating an infected laptop so it cannot reach network file shares.',
    'Investigating a suspicious process tree (e.g., PowerShell launching an unknown executable).',
  ],
  commonWorkflows: [
    'Reviewing the Smart Investigate behavioral analysis for a critical alert.',
    'Isolating an endpoint via the EDR console.',
    'Deploying the EDR agent silently via Datto RMM.',
  ],
  whenNotToUse: [
    'Do not use EDR to manage software patching or IT automation (use Datto RMM).',
    'Do not use EDR to restore an entire operating system state or perform a full bare-metal recovery (use Datto Backup / BCDR). EDR is for granular, file-level ransomware rollback.',
  ],
  keyTerminology: [
    { term: 'Smart Investigate', definition: 'AI-powered behavioral analysis that explains why a process was flagged.' },
    { term: 'Network Isolation', definition: 'Cutting off the endpoint from the LAN/WAN while keeping a secure connection to the EDR console for remediation.' },
    { term: 'Process Tree', definition: 'A visual timeline showing the parent-child relationships of executed files to trace the origin of an attack.' },
  ],
  relatedProducts: ['Datto RMM', 'Datto AV'],
  commonConfusions: [
    'Confused with Datto AV: Datto AV blocks known threats. EDR detects and responds to behavioral anomalies.',
    'Confused with Datto RMM: RMM manages device health; EDR secures it against active threats.',
  ],
  sources: [

    {
      id: "src-edr-av-vs-edr",
      title: "Antivirus vs EDR",
      evidenceSummary: "EDR capabilities vs AV."
    },
    {
      id: "src-edr-defender",
      title: "Microsoft Defender Integration",
      evidenceSummary: "Datto EDR operates alongside Defender."
    },
    {
      id: "src-edr-av-defender",
      title: "Datto AV vs Defender",
      evidenceSummary: "Datto AV requires Defender disabled."
    },
    {
      id: "src-edr-ransomware",
      title: "Ransomware Detection and Rollback",
      evidenceSummary: "Ransomware mitigation features."
    },
    {
      id: "src-edr-isolation",
      title: "EDR Isolation",
      evidenceSummary: "Device isolation mechanics."
    },
    {
      id: "src-edr-general",
      title: "EDR General Management",
      evidenceSummary: "Policies, exclusions, process investigation."
    }

  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'edr-ransomware-alert',
    moduleId: 'datto-edr',
    title: 'Ransomware Behavior Detected',
    description: 'An alert indicates high-speed file encryption on a file server.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'Datto EDR generates a critical alert for SERVER-FS01: "Rapid File Modification/Encryption behavior detected." In an active compromise, what is typically the best IMMEDIATE response action?',
        options: [
          { id: 'opt-1-1', text: 'Log into the server via RDP to investigate.', isCorrect: false, feedback: 'Too slow, and logging in could expose your admin credentials to a compromised host.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Consider isolating the endpoint from the network using the EDR console.', isCorrect: true, feedback: 'Correct. Containment is generally the priority to stop lateral movement and further encryption. The device will maintain contact with EDR.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'decisionMaking',
        text: 'The server is isolated. Normal network connectivity is restricted during isolation. EDR management connectivity remains available. When Datto RMM integration is configured, RMM can be used for remote remediation while isolated. What do you do next?',
        options: [
          { id: 'opt-2-1', text: 'Review the Process Tree in the alert details to identify the source process.', isCorrect: true, feedback: 'Yes. You need to identify what process triggered the alert to confirm if it\'s a true positive.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'The process tree shows `wscript.exe` spawning an unknown executable `enc.exe` from the Temp folder. What is your conclusion?',
        options: [
          { id: 'opt-3-1', text: 'This is likely a true positive ransomware attack. Leave isolated, kill the process if it is still running, and prepare for remediation/restore.', isCorrect: true, feedback: 'Correct. Scripts launching unknown executables from Temp that encrypt files is classic malware behavior.' }
        ]
      }
    }
  },
  {
    id: 'edr-false-positive',
    moduleId: 'datto-edr',
    title: 'Handling a False Positive',
    description: 'A custom LOB application triggers an EDR alert.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'decisionMaking',
        text: 'An alert triggers for `AccountingApp.exe` injecting code into `explorer.exe`. You recognize this as a known, poorly-written line-of-business app used by the client. What should you do?',
        options: [
          { id: 'opt-1-1', text: 'Delete the alert and ignore it.', isCorrect: false, feedback: 'Ignoring it means it will just trigger again tomorrow. You need to manage the detection.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Investigate the alert details to confirm the file hash and path match the known application.', isCorrect: true, feedback: 'Correct. Never assume it\'s a false positive without verifying the evidence. Malware can masquerade as legitimate apps.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'procedure',
        text: 'You confirm the hash and path match the legitimate accounting software. How do you stop future alerts?',
        options: [
          { id: 'opt-2-1', text: 'Create an Allowlist/Suppression Rule for the specific file hash or certificate.', isCorrect: true, feedback: 'Yes. Allowing the specific hash or signed cert is the safest way to allow the app while maintaining security.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'What is a risk of allowing the file path instead of the hash?',
        options: [
          { id: 'opt-3-1', text: 'An attacker could drop malware into that exact folder path to bypass EDR.', isCorrect: true, feedback: 'Correct. Path exclusions are dangerous and should be avoided if hash or certificate exclusions are possible.' }
        ]
      }
    }
  },
  {
    id: 'edr-powershell-enc',
    moduleId: 'datto-edr',
    title: 'Suspicious PowerShell',
    description: 'An alert for an encoded PowerShell command.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'You see an alert: "Suspicious PowerShell Execution". The command line includes `-ExecutionPolicy Bypass -enc JABzAD0ATgBlAHcALQBPAGIAagBl...`. What does the `-enc` flag mean?',
        options: [
          { id: 'opt-1-1', text: 'The command is Base64 encoded.', isCorrect: true, feedback: 'Correct. Attackers often use Base64 encoding to obfuscate malicious scripts and bypass basic string matching.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'procedure',
        text: 'How do you determine if this script is malicious or a legitimate IT automation script?',
        options: [
          { id: 'opt-2-1', text: 'Decode the Base64 string to read the actual script contents.', isCorrect: true, feedback: 'Yes. You must decode it to understand its intent.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'decisionMaking',
        text: 'The decoded script attempts to download a file from `http://malicious-ip.com/payload.exe`. What is your action?',
        options: [
          { id: 'opt-3-1', text: 'Isolate the endpoint, kill the PowerShell process tree if active, and investigate how the script was launched.', isCorrect: true, feedback: 'Correct. Contain the threat and trace it back to the initial infection vector.' }
        ]
      }
    }
  },
  {
    id: 'edr-lateral-movement',
    moduleId: 'datto-edr',
    title: 'Lateral Movement Attempt',
    description: 'Suspicious SMB and PsExec activity detected.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'Datto EDR alerts on `psexec.exe` being dropped in the Windows directory and executed on SERVER-01. You see the source IP is from a workstation, LAPTOP-05. What is likely happening?',
        options: [
          { id: 'opt-1-1', text: 'Possible lateral movement. An attacker on LAPTOP-05 is trying to execute code remotely on SERVER-01.', isCorrect: true, feedback: 'Correct. PsExec is a common tool for lateral movement.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'As a general incident response principle, which machine should you isolate first?',
        options: [
          { id: 'opt-2-1', text: 'LAPTOP-05, as it is the source of the attack, while also assessing SERVER-01.', isCorrect: true, feedback: 'Yes. Cut off the attacker\'s foothold. You should also consider isolating SERVER-01 if you suspect the execution succeeded.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'investigation',
        text: 'You isolate LAPTOP-05. What should you check on SERVER-01?',
        options: [
          { id: 'opt-3-1', text: 'Check the EDR process timeline on SERVER-01 to see if PsExec successfully launched any child processes.', isCorrect: true, feedback: 'Correct. You need to know if the lateral movement attempt achieved execution on the target.' }
        ]
      }
    }
  },
  {
    id: 'edr-triage-priority',
    moduleId: 'datto-edr',
    title: 'Alert Triage Prioritization',
    description: 'Multiple alerts arrive simultaneously. Which do you handle first?',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'You receive three alerts simultaneously:\n1. Adware detected on a workstation.\n2. Credential dumping attempt (`lsass.exe` memory access) on a domain controller.\n3. Potentially Unwanted Program (PUP) installed on a laptop.\nWhich do you triage first?',
        options: [
          { id: 'opt-1-1', text: 'Alert 2 (Credential dumping on DC).', isCorrect: true, feedback: 'Correct. Credential dumping on a critical server is a high-severity indicator of a major compromise.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'Why is credential dumping on a Domain Controller so critical?',
        options: [
          { id: 'opt-2-1', text: 'If successful, the attacker could gain Domain Admin credentials and control the entire network.', isCorrect: true, feedback: 'Exactly. This is a "game over" scenario that requires immediate incident response.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'What about the Adware and PUP alerts?',
        options: [
          { id: 'opt-3-1', text: 'They are lower priority. Investigate them after the critical threat on the DC is contained.', isCorrect: true, feedback: 'Correct. Triage requires prioritizing based on severity and potential impact.' }
        ]
      }
    }
  },
  {
    id: 'edr-full-ir-chain',
    moduleId: 'datto-edr',
    title: 'Full Incident Response Chain',
    description: 'Walk through a complete IR lifecycle from detection to reporting.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'Detection: You receive a high-severity alert for "Cobalt Strike Beacon Activity" on a user\'s laptop. What is a standard containment action?',
        options: [
          { id: 'opt-1-1', text: 'Call the user and ask them what they clicked on.', isCorrect: false, feedback: 'Containment generally must happen before investigation to prevent lateral movement.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Isolate the laptop using the EDR console.', isCorrect: true, feedback: 'Correct. Immediate isolation is often required for known command-and-control frameworks.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'procedure',
        text: 'Containment: The device is isolated. How do you find the root cause (Initial Access)?',
        options: [
          { id: 'opt-2-1', text: 'Review the Process Tree backwards from the Cobalt Strike beacon process.', isCorrect: true, feedback: 'Yes. Tracing the parent processes will usually reveal the initial vector (e.g., Outlook opening a malicious Word document).', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'investigation',
        text: 'Root Cause: The process tree shows Outlook -> Word -> PowerShell -> Cobalt Strike. What does this indicate?',
        options: [
          { id: 'opt-3-1', text: 'The user likely opened a malicious email attachment containing a macro that launched PowerShell to download the payload.', isCorrect: true, feedback: 'Correct. This is a classic phishing infection chain.', nextStepId: 'step-4' }
        ]
      },
      'step-4': {
        id: 'step-4', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'documentation',
        text: 'Reporting: What should you include in the final incident report?',
        options: [
          { id: 'opt-4-1', text: 'Timeline of events, root cause analysis (phishing), actions taken (isolation, remediation), and recommendations (security awareness training).', isCorrect: true, feedback: 'Excellent. A complete report provides actionable insights for the client.' }
        ]
      }
    }
  },
  {
    id: 'edr-quarantine-rollback',
    moduleId: 'datto-edr',
    title: 'Quarantine and Remediation',
    description: 'Using EDR tools to remediate a malware infection.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'recognition',
        text: 'An endpoint has been isolated due to a confirmed malware infection. You identify the malicious executable in the Downloads folder. What is a typical next step?',
        options: [
          { id: 'opt-1-1', text: 'Use the EDR console or Datto RMM Agent Browser to kill the process and quarantine/delete the file.', isCorrect: true, feedback: 'Correct. Removing the file ensures it cannot be executed again.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'The malware managed to change several registry keys before being stopped. If your environment has Datto EDR Ransomware Rollback enabled, how can it help?',
        options: [
          { id: 'opt-2-1', text: 'Rollback can revert specific file changes made by the ransomware process.', isCorrect: true, feedback: 'Yes. EDR rollback features can revert file changes made by a detected malicious process.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'After remediation, what must you do before removing isolation?',
        options: [
          { id: 'opt-3-1', text: 'Verify no persistence mechanisms remain (e.g., Scheduled Tasks, AutoRun keys).', isCorrect: true, feedback: 'Correct. Always verify the endpoint is completely clean before reconnecting it to the network.' }
        ]
      }
    }
  },
  {
    id: 'edr-ransomware-lifecycle',
    moduleId: 'datto-edr',
    title: 'Ransomware Detection triggers isolation — walk the full lifecycle',
    description: 'Detection via behavioral analysis → automatic isolation → process termination attempt → remote remediation while isolated.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'You receive a Ransomware Detection alert. EDR policy was configured to automatically isolate the device and attempt to terminate the offending process. What is the immediate next step?',
        options: [
          { id: 'opt-1-1', text: 'Verify the alert details and confirm the process termination was successful.', isCorrect: true, feedback: 'Correct. You must verify if EDR successfully killed the encryption process before proceeding.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'The process was killed, but the server is isolated. If integrated, how can you assess the damage?',
        options: [
          { id: 'opt-2-1', text: 'Use Datto RMM\'s Agent Browser or Web Remote to connect to the isolated device.', isCorrect: true, feedback: 'Yes. The Datto RMM agent bypasses EDR isolation, allowing you to investigate the local files remotely.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'investigation',
        text: 'You find that files in a share were encrypted before the process was killed. What is a reliable way to recover the server?',
        options: [
          { id: 'opt-3-1', text: 'If protected by Datto BCDR, initiate a restore (Rapid Rollback or Image Restore) from the BCDR or RMM console.', isCorrect: true, feedback: 'Correct. Reverting the entire server to a known good backup is often the safest way to ensure no persistence remains and recover the files.' }
        ]
      }
    }
  },
  {
    id: 'edr-encryption-gap',
    moduleId: 'datto-edr',
    title: 'Encryption started before detection killed the process',
    description: 'Explain why some files still get encrypted even with Ransomware Detection working correctly.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'procedure',
        text: 'A client asks why some files were encrypted by ransomware before it was stopped by EDR. How do you explain this?',
        options: [
          { id: 'opt-1-1', text: 'Explain that behavioral detection requires observing malicious actions (like mass encryption) before it can classify and kill the process. The first few actions may complete before the threshold is met.', isCorrect: true, feedback: 'Correct. Behavioral analysis isn\'t predictive; it needs to see enough bad behavior to act.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'What Datto EDR feature specifically helps bridge this gap?',
        options: [
          { id: 'opt-2-1', text: 'Ransomware Rollback, which tracks disk changes and can revert the specific files encrypted by the stopped process.', isCorrect: true, feedback: 'Yes. Rollback acts as a safety net for the files modified during the detection delay.' }
        ]
      }
    }
  },
  {
    id: 'edr-rollback-specifics',
    moduleId: 'datto-edr',
    title: 'Using Ransomware Rollback to recover specific files',
    description: 'Walk through the rollback application\'s file-tracking/interception mechanism.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'Ransomware was killed by EDR. You want to use Ransomware Rollback to recover the files. How does the Datto EDR Rollback feature track changes?',
        options: [
          { id: 'opt-1-1', text: 'It uses a lightweight background tracking mechanism that maintains temporary copies of modified files up to a defined disk space limit.', isCorrect: true, feedback: 'Correct. It tracks changes, allowing granular reversion of specific files tied to a malicious process ID.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'procedure',
        text: 'How do you initiate the rollback?',
        options: [
          { id: 'opt-2-1', text: 'From the EDR incident or process page, select the malicious process and trigger the Rollback action to revert the changes made by that specific PID.', isCorrect: true, feedback: 'Yes. You roll back the specific process\'s actions.' }
        ]
      }
    }
  },
  {
    id: 'edr-policy-confusion',
    moduleId: 'datto-edr',
    title: 'Endpoint Security policy vs Monitoring policy confusion',
    description: 'Best practice is Ransomware Detection as part of an Endpoint Security policy.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'A technician wants to deploy Ransomware Detection via Datto RMM. What is the current recommended method?',
        options: [
          { id: 'opt-1-1', text: 'Use an Endpoint Security policy in Datto RMM.', isCorrect: true, feedback: 'Correct. The Endpoint Security policy is the modern, supported method for deploying and configuring Datto EDR, AV, and Ransomware Detection together.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }],
        competencyArea: 'knowledge',
        text: 'If a device shows "Not Supported" for the Endpoint Security policy in RMM, what might be the reason?',
        options: [
          { id: 'opt-2-1', text: 'The device is licensed as "OnDemand" rather than "Managed".', isCorrect: true, feedback: 'Yes. Endpoint Security features typically require a Managed license level.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-edr-1', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What is the primary difference between traditional AV and EDR?', answer: 'Traditional AV blocks known bad files (signatures). EDR monitors behavioral patterns to catch new, unknown threats.' },
  { id: 'fc-edr-2', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'If an endpoint is infected, how can you prevent it from infecting the rest of the network?', answer: 'Use the Network Isolation feature in Datto EDR.' },
  { id: 'fc-edr-3', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'How is Datto EDR most commonly deployed by MSPs?', answer: 'Silently via Datto RMM integration (Endpoint Security Policy).' },
  { id: 'fc-edr-4', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What does the "Smart Investigate" feature do?', answer: 'It provides an AI-powered summary explaining why a specific behavior or process was flagged as suspicious.' },
  { id: 'fc-edr-5', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What is a "Process Tree" in an EDR alert?', answer: 'A visual representation showing which process launched another (parent-child relationship), essential for tracing the origin of an attack.' },
  { id: 'fc-edr-6', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Why is `lsass.exe` memory access a critical alert?', answer: 'LSASS stores user credentials in memory. Attackers use tools like Mimikatz to access it and steal passwords (credential dumping).' },
  { id: 'fc-edr-7', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What is "Lateral Movement"?', answer: 'Techniques used by attackers to spread from an initially compromised endpoint to other systems on the network.' },
  { id: 'fc-edr-8', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Why do attackers use Base64 encoding in PowerShell scripts?', answer: 'To obfuscate the commands, making them unreadable to humans and bypassing simple string-matching security rules.' },
  { id: 'fc-edr-9', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What is "Ransomware Rollback" in Datto EDR?', answer: 'A feature that tracks disk changes and can revert files altered by a detected ransomware process.' },
  { id: 'fc-edr-10', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Why is a path exclusion generally dangerous in EDR?', answer: 'Because an attacker who discovers the exclusion can drop their malware into that folder to bypass scanning.' },
  { id: 'fc-edr-11', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What does "Living off the Land" (LotL) mean?', answer: 'Attackers using legitimate, built-in system tools (like PowerShell, WMI, PsExec) for malicious purposes to evade detection.' },
  { id: 'fc-edr-12', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'If EDR automatically blocks a threat, why investigate?', answer: 'To ensure it was fully remediated, understand how the threat entered (initial vector), and verify no other systems were compromised.' },
  { id: 'fc-edr-13', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Can you still reach a device that has been isolated by Datto EDR?', answer: 'Yes, if integrated with Datto RMM, the RMM agent maintains a connection allowing remote remediation.' },
  { id: 'fc-edr-14', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Where should you configure Ransomware Detection in Datto RMM?', answer: 'Within an Endpoint Security policy, not as a standalone component monitor.' },
  { id: 'fc-edr-15', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'What is the purpose of EDR Suppression/Allowlist Rules?', answer: 'To explicitly allow specific file hashes or certificates so legitimate line-of-business applications don\'t trigger false positive alerts.' },
  { id: 'fc-edr-16', evidenceRefs: [{ sourceId: 'src-edr-general', status: 'needs-live-portal-confirmation', note: 'Need specific EDR workflow URLs' }], moduleId: 'datto-edr', question: 'Can Datto EDR coexist with a third-party antivirus like Windows Defender?', answer: 'Yes, Datto EDR can work alongside existing AV solutions like Defender, providing a layered defense.' }
];
