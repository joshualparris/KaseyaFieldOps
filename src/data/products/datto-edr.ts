import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-edr',
  name: 'Datto EDR',
  description: 'Endpoint Detection and Response.',
  iconName: 'ShieldAlert',
  color: 'bg-red-600',
  order: 2,
  problemSolved: 'Traditional antivirus relies on known signatures, meaning zero-day malware and fileless attacks bypass them. Datto EDR monitors behavioral patterns to detect and isolate advanced threats before they spread.',
  mentalModel: 'Think of traditional AV like a bouncer checking IDs against a blacklist. Datto EDR is the security camera system watching behavior—even if the ID is valid, if the person starts breaking things, EDR locks the doors (network isolation) and alerts you.',
  actualUseCases: [
    'Detecting ransomware that bypassed traditional AV.',
    'Isolating an infected laptop so it cannot encrypt network file shares.',
    'Investigating a suspicious process tree (e.g., PowerShell launching an unknown executable).',
  ],
  commonWorkflows: [
    'Reviewing the Smart Investigate behavioral analysis for a critical alert.',
    'Isolating an endpoint via the EDR console.',
    'Deploying the EDR agent silently via Datto RMM.',
  ],
  whenNotToUse: [
    'Do not use EDR to manage software patching or IT automation (use Datto RMM).',
    'Do not use EDR to restore encrypted files (use Datto Backup / BCDR).',
  ],
  keyTerminology: [
    { term: 'Smart Investigate', definition: 'AI-powered behavioral analysis that explains why a process was flagged.' },
    { term: 'Network Isolation', definition: 'Cutting off the endpoint from the LAN/WAN while keeping a secure connection to the EDR console for remediation.' },
    { term: 'Process Tree', definition: 'A visual timeline showing the parent-child relationships of executed files to trace the origin of an attack.' },
  ],
  relatedProducts: ['Datto RMM', 'Datto AV'],
  commonConfusions: [
    'Confused with Datto AV: Datto AV is the next-gen antivirus component (often bundled with EDR) that blocks known threats. EDR detects and responds to behavioral anomalies.',
    'Confused with Datto RMM: RMM manages the health and performance of the device; EDR secures it against active threats.',
  ],
  sources: [
    {
      title: "Datto EDR Overview",
      url: "https://www.datto.com/products/edr/",
      verifiedAt: "2026-08-20T00:00:00Z",
      supports: ["Smart Investigate", "Behavioral detection", "Datto RMM Integration"]
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
        id: 'step-1',
        text: 'Datto EDR generates a critical alert for SERVER-FS01: "Rapid File Modification/Encryption behavior detected." What is your IMMEDIATE action?',
        options: [
          { id: 'opt-1-1', text: 'Log into the server via RDP to investigate.', isCorrect: false, feedback: 'Too slow, and logging in could expose your admin credentials to a compromised host.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Isolate the endpoint from the network using the EDR console.', isCorrect: true, feedback: 'Correct. Containment is the priority to stop lateral movement and further encryption. The device will maintain contact with EDR.', nextStepId: 'step-2' }
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
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-edr-1', moduleId: 'datto-edr', question: 'What is the primary difference between traditional AV and EDR?', answer: 'Traditional AV blocks known bad files (signatures). EDR monitors behavioral patterns to catch new, unknown threats.' },
  { id: 'fc-edr-2', moduleId: 'datto-edr', question: 'If an endpoint is infected, how do you prevent it from infecting the rest of the network?', answer: 'Use the Network Isolation feature in Datto EDR.' },
  { id: 'fc-edr-3', moduleId: 'datto-edr', question: 'How is Datto EDR most commonly deployed?', answer: 'Silently via Datto RMM integration.' },
  { id: 'fc-edr-4', moduleId: 'datto-edr', question: 'What does the "Smart Investigate" feature do?', answer: 'It provides an AI-powered summary explaining why a specific behavior or process was flagged as suspicious.' }
];
