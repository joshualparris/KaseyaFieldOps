import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-edr',
  name: 'Datto EDR',
  description: 'Endpoint Detection and Response.',
  iconName: 'ShieldAlert',
  color: 'bg-red-600',
  order: 2,
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
        id: 'step-1',
        text: 'Datto EDR generates a critical alert for SERVER-FS01: "Rapid File Modification/Encryption behavior detected." What is your IMMEDIATE action?',
        options: [
          { id: 'opt-1-1', text: 'Log into the server via RDP to investigate.', isCorrect: false, feedback: 'Too slow, and logging in could expose your admin credentials to a compromised host.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Isolate the endpoint from the network using the EDR console.', isCorrect: true, feedback: 'Correct. Containment is the priority to stop lateral movement and further encryption.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The server is isolated. It can only communicate with the EDR console. What do you do next?',
        options: [
          { id: 'opt-2-1', text: 'Review the Process Tree in the alert details to identify the source process.', isCorrect: true, feedback: 'Yes. You need to identify what process triggered the alert to confirm if it\'s a true positive.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The process tree shows `wscript.exe` spawning an unknown executable `enc.exe` from the Temp folder. What is your conclusion?',
        options: [
          { id: 'opt-3-1', text: 'This is a true positive ransomware attack. Leave isolated, kill the process, and prepare for remediation/restore.', isCorrect: true, feedback: 'Correct. Scripts launching unknown executables from Temp that encrypt files is classic malware behavior.' }
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
        id: 'step-1',
        text: 'An alert triggers for `AccountingApp.exe` injecting code into `explorer.exe`. You recognize this as a known, poorly-written line-of-business app used by the client. What should you do?',
        options: [
          { id: 'opt-1-1', text: 'Delete the alert and ignore it.', isCorrect: false, feedback: 'Ignoring it means it will just trigger again tomorrow. You need to manage the detection.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Investigate the alert details to confirm the file hash and path match the known application.', isCorrect: true, feedback: 'Correct. Never assume it\'s a false positive without verifying the evidence. Malware can masquerade as legitimate apps.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You confirm the hash and path match the legitimate accounting software. How do you stop future alerts?',
        options: [
          { id: 'opt-2-1', text: 'Add the file hash to the EDR Whitelist / Allowed List.', isCorrect: true, feedback: 'Yes. Whitelisting the specific hash is the safest way to allow the app while maintaining security.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What is a risk of whitelisting the file path instead of the hash?',
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
        id: 'step-1',
        text: 'You see an alert: "Suspicious PowerShell Execution". The command line includes `-ExecutionPolicy Bypass -enc JABzAD0ATgBlAHcALQBPAGIAagBl...`. What does the `-enc` flag mean?',
        options: [
          { id: 'opt-1-1', text: 'The command is Base64 encoded.', isCorrect: true, feedback: 'Correct. Attackers often use Base64 encoding to obfuscate malicious scripts and bypass basic string matching.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you determine if this script is malicious or a legitimate IT automation script?',
        options: [
          { id: 'opt-2-1', text: 'Decode the Base64 string to read the actual script contents.', isCorrect: true, feedback: 'Yes. You must decode it to understand its intent.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The decoded script attempts to download a file from `http://malicious-ip.com/payload.exe`. What is your action?',
        options: [
          { id: 'opt-3-1', text: 'Isolate the endpoint, kill the PowerShell process tree, and investigate how the script was launched.', isCorrect: true, feedback: 'Correct. Contain the threat and trace it back to the initial infection vector.' }
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
        id: 'step-1',
        text: 'Datto EDR alerts on `psexec.exe` being dropped in the Windows directory and executed on SERVER-01. You see the source IP is from a workstation, LAPTOP-05. What is happening?',
        options: [
          { id: 'opt-1-1', text: 'Possible lateral movement. An attacker on LAPTOP-05 is trying to execute code remotely on SERVER-01.', isCorrect: true, feedback: 'Correct. PsExec is a common tool for lateral movement.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Which machine should you isolate first?',
        options: [
          { id: 'opt-2-1', text: 'LAPTOP-05, as it is the source of the attack.', isCorrect: true, feedback: 'Yes. Cut off the attacker\'s foothold. You should also consider isolating SERVER-01 if you suspect the execution succeeded.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
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
        id: 'step-1',
        text: 'You receive three alerts simultaneously:\n1. Adware detected on a workstation.\n2. Credential dumping attempt (`lsass.exe` memory access) on a domain controller.\n3. Potentially Unwanted Program (PUP) installed on a laptop.\nWhich do you triage first?',
        options: [
          { id: 'opt-1-1', text: 'Alert 2 (Credential dumping on DC).', isCorrect: true, feedback: 'Correct. Credential dumping on a critical server is a high-severity indicator of a major compromise.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Why is credential dumping on a Domain Controller so critical?',
        options: [
          { id: 'opt-2-1', text: 'If successful, the attacker gains Domain Admin credentials and controls the entire network.', isCorrect: true, feedback: 'Exactly. This is a "game over" scenario that requires immediate isolation and incident response.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What about the Adware and PUP alerts?',
        options: [
          { id: 'opt-3-1', text: 'They are low priority. Investigate them after the critical threat on the DC is contained.', isCorrect: true, feedback: 'Correct. Triage requires prioritizing based on severity and potential impact.' }
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
        id: 'step-1',
        text: 'Detection: You receive a high-severity alert for "Cobalt Strike Beacon Activity" on a user\'s laptop. What is the immediate containment action?',
        options: [
          { id: 'opt-1-1', text: 'Call the user and ask them what they clicked on.', isCorrect: false, feedback: 'Containment must happen before investigation to prevent lateral movement.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Isolate the laptop using the EDR console.', isCorrect: true, feedback: 'Correct. Immediate isolation is required for known command-and-control frameworks.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Containment: The device is isolated. How do you find the root cause (Initial Access)?',
        options: [
          { id: 'opt-2-1', text: 'Review the Process Tree backwards from the Cobalt Strike beacon process.', isCorrect: true, feedback: 'Yes. Tracing the parent processes will usually reveal the initial vector (e.g., Outlook opening a malicious Word document).', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Root Cause: The process tree shows Outlook -> Word -> PowerShell -> Cobalt Strike. What does this indicate?',
        options: [
          { id: 'opt-3-1', text: 'The user opened a malicious email attachment containing a macro that launched PowerShell to download the payload.', isCorrect: true, feedback: 'Correct. This is a classic phishing infection chain.', nextStepId: 'step-4' }
        ]
      },
      'step-4': {
        id: 'step-4',
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
    title: 'Quarantine and Rollback',
    description: 'Using EDR tools to remediate a malware infection.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'An endpoint has been isolated due to a confirmed malware infection. You identify the malicious executable in the Downloads folder. What is the next step to remediate?',
        options: [
          { id: 'opt-1-1', text: 'Use the EDR console to Quarantine the file.', isCorrect: true, feedback: 'Correct. Quarantining encrypts and moves the file so it cannot be executed again.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The malware managed to encrypt several files before the process was killed. How can you recover these files using Datto EDR?',
        options: [
          { id: 'opt-2-1', text: 'Initiate a Ransomware Rollback action for the malicious process.', isCorrect: true, feedback: 'Yes. Datto EDR Ransomware Rollback can revert file changes made by a specific malicious process.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'After quarantine and rollback, what must you do before removing isolation?',
        options: [
          { id: 'opt-3-1', text: 'Run a full deep scan and verify no persistence mechanisms remain.', isCorrect: true, feedback: 'Correct. Always verify the endpoint is completely clean before reconnecting it to the network.' }
        ]
      }
    }
  },
  {
    id: 'edr-ransomware-lifecycle',
    moduleId: 'datto-edr',
    title: 'Ransomware Detection triggers isolation — walk the full lifecycle',
    description: 'Detection via behavioral analysis → automatic isolation → process termination attempt → remote remediation while isolated → recovery via Datto RMM + BCDR restore.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You receive a Ransomware Detection alert for a file server. EDR has automatically isolated the device and attempted to terminate the offending process. What is the immediate next step?',
        options: [
          { id: 'opt-1-1', text: 'Verify the alert details and confirm the process termination was successful.', isCorrect: true, feedback: 'Correct. You must verify if EDR successfully killed the encryption process before proceeding.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The process was killed, but the server is isolated. How do you assess the damage?',
        options: [
          { id: 'opt-2-1', text: 'Use Datto RMM\'s Agent Browser (or Web Remote) to connect to the isolated device and inspect the file shares.', isCorrect: true, feedback: 'Yes. The Datto RMM agent maintains connectivity during isolation, allowing you to investigate the local files remotely.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You find that 5,000 files in the Finance share were encrypted before the process was killed. What is the most reliable way to recover the server?',
        options: [
          { id: 'opt-3-1', text: 'Initiate a Rapid Rollback or Image Restore via the Datto BCDR integration from the RMM console.', isCorrect: true, feedback: 'Correct. Reverting the entire server to a known good backup is the safest way to ensure no persistence remains and recover the files.' }
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
        id: 'step-1',
        text: 'A client is angry that despite paying for Datto EDR, 500 files were encrypted by ransomware before it was stopped. How do you explain this?',
        options: [
          { id: 'opt-1-1', text: 'Explain that behavioral detection requires observing malicious actions (like mass encryption) before it can confidently classify and kill the process, so some initial encryption may occur.', isCorrect: true, feedback: 'Correct. Behavioral analysis isn\'t predictive; it needs to see bad behavior to stop it.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'What Datto feature specifically bridges this gap to save those 500 files?',
        options: [
          { id: 'opt-2-1', text: 'Ransomware Rollback, which tracks disk changes in the background and can revert the specific files encrypted by the stopped process.', isCorrect: true, feedback: 'Yes. Rollback acts as a safety net for the files modified during the detection delay.' }
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
        id: 'step-1',
        text: 'Ransomware was killed by EDR. You want to use Ransomware Rollback to recover the files. How does the Rollback feature actually work under the hood?',
        options: [
          { id: 'opt-1-1', text: 'It runs a lightweight background filter driver that intercepts file changes and keeps temporary copies of modified files up to a defined disk space limit.', isCorrect: true, feedback: 'Correct. It tracks changes on the fly, allowing granular reversion of specific files tied to a malicious process ID.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you initiate the rollback?',
        options: [
          { id: 'opt-2-1', text: 'From the EDR incident or process page, select the malicious process and trigger the Rollback action to revert only the changes made by that specific PID.', isCorrect: true, feedback: 'Yes. You roll back the specific process\'s actions, not the entire machine state.' }
        ]
      }
    }
  },
  {
    id: 'edr-policy-confusion',
    moduleId: 'datto-edr',
    title: 'Endpoint Security policy vs Monitoring policy confusion',
    description: 'Best practice is Ransomware Detection as part of an Endpoint Security policy, not a standalone monitor.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A technician wants to deploy Ransomware Detection to a new client site. They create a standalone Component Monitor in RMM to watch for ransomware. What is wrong with this approach according to best practices?',
        options: [
          { id: 'opt-1-1', text: 'Ransomware Detection should be deployed via an Endpoint Security policy, which ensures the core EDR agent and all necessary protection layers are properly managed together.', isCorrect: true, feedback: 'Correct. While standalone monitors exist, the Endpoint Security policy is the modern, supported method for deploying and configuring EDR and Ransomware Detection.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you fix the misconfiguration?',
        options: [
          { id: 'opt-2-1', text: 'Delete the standalone monitor and create/assign an Endpoint Security policy targeting the site.', isCorrect: true, feedback: 'Yes. Use the unified policy engine to manage endpoint security.' }
        ]
      }
    }
  },
  {
    id: 'edr-ondemand-licensing',
    moduleId: 'datto-edr',
    title: 'OnDemand device can\'t get Ransomware Detection',
    description: 'A tech tries to add protection to a device and it\'s not available.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You are applying an Endpoint Security policy with Datto EDR and Ransomware Detection to a site. You notice that 3 of the 50 devices at the site show "Not Supported" for the policy. Why?',
        options: [
          { id: 'opt-1-1', text: 'Those 3 devices are licensed as "OnDemand" rather than "Managed".', isCorrect: true, feedback: 'Correct. OnDemand devices (which are free) only support basic remote control and audit features. Endpoint Security features require a Managed license.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you enable EDR for those 3 devices?',
        options: [
          { id: 'opt-2-1', text: 'Change their management level in RMM from OnDemand to Managed, consuming an RMM and EDR license.', isCorrect: true, feedback: 'Yes. Upgrading their management level unlocks the ability to apply security policies.' }
        ]
      }
    }
  },
  {
    id: 'edr-legit-encryption',
    moduleId: 'datto-edr',
    title: 'False positive on legitimate encryption software',
    description: 'A backup/encryption tool\'s normal behavior trips detection.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'Datto EDR triggers a Ransomware alert for `VeraCrypt.exe`. The device is isolated. You recognize VeraCrypt as the client\'s approved disk encryption software. What should you do?',
        options: [
          { id: 'opt-1-1', text: 'Use Agent Browser to confirm VeraCrypt was running a scheduled encryption task, then release the isolation and add VeraCrypt\'s certificate or hash to the EDR allowlist.', isCorrect: true, feedback: 'Correct. Legitimate mass-encryption tools will trigger behavioral alerts. You must allowlist them based on strong indicators like hash or cert.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Why not just disable Ransomware Detection on that machine?',
        options: [
          { id: 'opt-2-1', text: 'Because that leaves the machine vulnerable to actual ransomware. Tuning the policy is always better than disabling it.', isCorrect: true, feedback: 'Exactly. Security requires tuning to balance protection and usability.' }
        ]
      }
    }
  },
  {
    id: 'edr-lotl-powershell',
    moduleId: 'datto-edr',
    title: 'Living off the Land: PowerShell Abuse',
    description: 'A second IR chain for a different threat type (e.g. living-off-the-land/PowerShell abuse).',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'Detection: EDR flags `powershell.exe` making an unusual outbound connection to a raw IP address over port 443. There is no known malware hash. What is your containment step?',
        options: [
          { id: 'opt-1-1', text: 'Isolate the machine in the EDR console to cut the potential C2 (Command and Control) connection.', isCorrect: true, feedback: 'Correct. Even if the tool (PowerShell) is legitimate, the behavior is highly suspicious and warrants immediate containment.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Root Cause: You review the process tree. `powershell.exe` was spawned by `taskeng.exe` (Task Scheduler). What does this tell you?',
        options: [
          { id: 'opt-2-1', text: 'The attacker has established persistence via a Scheduled Task.', isCorrect: true, feedback: 'Yes. The malicious PowerShell command is being launched automatically on a schedule.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Remediation: You kill the PowerShell process and verify the script it was running. How do you fully remediate this?',
        options: [
          { id: 'opt-3-1', text: 'Use the RMM Agent Browser to delete the malicious Scheduled Task, remove any dropped scripts, and force a password reset for the compromised user account.', isCorrect: true, feedback: 'Correct. You must break the persistence mechanism, not just kill the active process.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-edr-1', moduleId: 'datto-edr', question: 'What does "Isolation" mean in Datto EDR?', answer: 'Cutting off the endpoint\'s network access to everything except the Datto EDR management console to contain a threat while allowing investigation.' },
  { id: 'fc-edr-2', moduleId: 'datto-edr', question: 'What is a "Process Tree" in an EDR alert?', answer: 'A visual representation showing which process launched another (parent-child relationship), essential for tracing the origin of an attack.' },
  { id: 'fc-edr-3', moduleId: 'datto-edr', question: 'What is the difference between Antivirus (AV) and EDR?', answer: 'AV primarily blocks known bad files using signatures. EDR monitors behavior and processes to detect advanced threats, fileless malware, and provides investigation tools.' },
  { id: 'fc-edr-4', moduleId: 'datto-edr', question: 'Why is `lsass.exe` memory access a critical alert?', answer: 'LSASS stores user credentials in memory. Attackers use tools like Mimikatz to access it and steal passwords (credential dumping).' },
  { id: 'fc-edr-5', moduleId: 'datto-edr', question: 'What is a "File Hash"?', answer: 'A unique mathematical signature for a file (e.g., SHA-256). EDR uses hashes to identify known malware or whitelist safe applications.' },
  { id: 'fc-edr-6', moduleId: 'datto-edr', question: 'What is a "False Positive"?', answer: 'When the EDR system incorrectly identifies legitimate activity or benign software as malicious.' },
  { id: 'fc-edr-7', moduleId: 'datto-edr', question: 'What is "Lateral Movement"?', answer: 'Techniques used by attackers to spread from an initially compromised endpoint to other systems on the network.' },
  { id: 'fc-edr-8', moduleId: 'datto-edr', question: 'Why do attackers use Base64 encoding in PowerShell scripts?', answer: 'To obfuscate the commands, making them unreadable to humans and bypassing simple string-matching security rules.' },
  { id: 'fc-edr-9', moduleId: 'datto-edr', question: 'What action should you take if you suspect a device has active ransomware?', answer: 'Immediately isolate the device from the network using the EDR console to prevent lateral movement and file share encryption.' },
  { id: 'fc-edr-10', moduleId: 'datto-edr', question: 'What is "Ransomware Rollback" (if supported by EDR)?', answer: 'A feature that tracks file modifications in a dedicated directory and allows administrators to revert files altered by a detected ransomware process.' },
  { id: 'fc-edr-11', moduleId: 'datto-edr', question: 'Why is a path exclusion dangerous in EDR?', answer: 'Because an attacker who discovers the exclusion can drop their malware into that folder, and EDR will ignore it.' },
  { id: 'fc-edr-12', moduleId: 'datto-edr', question: 'What is `wscript.exe` or `cscript.exe` used for maliciously?', answer: 'Executing malicious VBScript or JScript payloads, often delivered via phishing macros or droppers.' },
  { id: 'fc-edr-13', moduleId: 'datto-edr', question: 'What does "Living off the Land" (LotL) mean?', answer: 'Attackers using legitimate, built-in system tools (like PowerShell, WMI, PsExec) for malicious purposes to blend in and evade detection.' },
  { id: 'fc-edr-14', moduleId: 'datto-edr', question: 'What is the purpose of killing a process in EDR?', answer: 'To stop an active malicious execution from continuing its attack sequence.' },
  { id: 'fc-edr-15', moduleId: 'datto-edr', question: 'If EDR automatically blocks a threat, why do you still need to investigate?', answer: 'To ensure it was fully remediated, understand how the threat entered (initial vector), and verify no other systems were compromised.' },
  { id: 'fc-edr-16', moduleId: 'datto-edr', question: 'What is Ransomware Rollback?', answer: 'A lightweight background application that tracks disk changes, separate from the detection engine, allowing you to revert specific files modified by a malicious process.' },
  { id: 'fc-edr-17', moduleId: 'datto-edr', question: 'Why might some files still be encrypted even if Ransomware Detection works correctly?', answer: 'Because behavioral detection requires observing malicious actions (like encryption) before it can confidently classify and kill the process, so some initial encryption may occur.' },
  { id: 'fc-edr-18', moduleId: 'datto-edr', question: 'What happens automatically when Ransomware is detected by Datto EDR?', answer: 'The agent will automatically isolate the device from the network and attempt to kill the offending process.' },
  { id: 'fc-edr-19', moduleId: 'datto-edr', question: 'Can you still reach and remediate a device that has been auto-isolated?', answer: 'Yes, the device maintains a secure tunnel to the Datto RMM and EDR platforms for remote remediation.' },
  { id: 'fc-edr-20', moduleId: 'datto-edr', question: 'What is required for full recovery of an endpoint after a major ransomware event?', answer: 'Integration with Datto RMM and BCDR allows you to restore the device to a previous clean state directly from the console.' },
  { id: 'fc-edr-21', moduleId: 'datto-edr', question: 'Where is the best-practice place to configure Ransomware Detection?', answer: 'Within an Endpoint Security policy in RMM, not as a standalone component monitor.' },
  { id: 'fc-edr-22', moduleId: 'datto-edr', question: 'What license type is required for a device to receive an Endpoint Security policy with EDR?', answer: 'The device must be a "Managed" device in RMM, not "OnDemand".' },
  { id: 'fc-edr-23', moduleId: 'datto-edr', question: 'What is the purpose of the EDR "Allowlist" (Whitelist)?', answer: 'To explicitly trust specific file hashes or certificates so legitimate line-of-business applications don\'t trigger false positive alerts.' },
  { id: 'fc-edr-24', moduleId: 'datto-edr', question: 'How do you configure who receives email notifications for EDR alerts?', answer: 'Through the Alert Rules and Notification routing settings in the Datto EDR console or via RMM integration routing.' },
  { id: 'fc-edr-25', moduleId: 'datto-edr', question: 'What operating systems does Datto EDR support?', answer: 'Modern versions of Windows, macOS, and Linux (check official docs for specific supported distributions and versions).' },
  { id: 'fc-edr-26', moduleId: 'datto-edr', question: 'What does the "Respond" action do in Datto EDR?', answer: 'It allows technicians to take manual actions like isolating a host, killing a process, or deleting a file directly from an alert.' },
  { id: 'fc-edr-27', moduleId: 'datto-edr', question: 'Can Datto EDR coexist with a third-party antivirus like Windows Defender?', answer: 'Yes, Datto EDR can work alongside existing AV solutions like Defender, providing a layered defense approach.' },
  { id: 'fc-edr-28', moduleId: 'datto-edr', question: 'What is a "Suspicious Execution" alert?', answer: 'An alert triggered when a known good tool (like PowerShell or WMI) is used in a highly unusual or malicious way.' },
  { id: 'fc-edr-29', moduleId: 'datto-edr', question: 'How often does the Datto EDR agent communicate with the cloud console?', answer: 'It maintains a nearly continuous, lightweight connection to provide real-time alerting and response capabilities.' }
];
