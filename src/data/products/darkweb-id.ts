import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'darkweb-id',
  name: 'Dark Web ID',
  description: 'Dark web monitoring and credential exposure alerts.',
  iconName: 'UserX',
  color: 'bg-stone-800',
  order: 4,
  problemSolved: 'Users reuse passwords across work and personal apps. When a personal app gets breached, hackers try that same password on the corporate network. Dark Web ID tells you if your users\' passwords have been leaked.',
  mentalModel: 'It is a listener. It constantly scans hacker forums and illicit databases for the domains and email addresses you specify, alerting you when it finds a match.',
  keyTerminology: [
    { term: 'Third-Party Breach', definition: 'When credentials are stolen from an external service (like LinkedIn), not the corporate network.' },
    { term: 'Botnet Source', definition: 'Data harvested directly from a user\'s infected device via keyloggers (high severity).' },
    { term: 'Live Search', definition: 'A one-time prospecting tool used for sales meetings to show a prospect their current exposures.' }
  ],
  actualUseCases: [
    'Forcing a password reset when an employee\'s password leaks',
    'Generating a risk report for a sales prospect',
    'Monitoring a VIP\'s personal email address'
  ],
  commonWorkflows: [
    'Investigating an exposure alert to determine if it\'s new or historic',
    'Setting up automated monthly reporting for a client',
    'Configuring PSA integrations to ticket high-severity alerts'
  ],
  whenNotToUse: [
    'Do not use this to train users or simulate phishing (use BullPhish ID).',
    'Do not use this to block incoming malicious emails (use INKY).'
  ],
  relatedProducts: ['BullPhish ID', 'INKY'],
  commonConfusions: [
    'Confused with BullPhish ID: Dark Web ID monitors real leaks, BullPhish ID trains users with fake ones.'
  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'dwid-genuine-or-recycled',
    moduleId: 'darkweb-id',
    title: 'Credential exposure alert - genuine breach or old recycled data',
    description: 'Determining if a Dark Web ID alert is a new threat or old recycled credentials.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A Dark Web ID alert triggers for a user\'s email and password. How do you first evaluate the risk?',
        options: [
          { id: 'opt-1-1', text: 'Force a password reset immediately without checking the data.', isCorrect: false, feedback: 'You should evaluate the context first to avoid unnecessary disruption.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Check the breach date and the source in the Dark Web ID portal.', isCorrect: true, feedback: 'Correct. The source and date tell you if it is a new breach or a re-compiled list of old data.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The breach date is from 2018 (a recycled combo list). The client enforced MFA in 2021. What is the risk?',
        options: [
          { id: 'opt-2-1', text: 'Low risk. The password is old and MFA is active.', isCorrect: true, feedback: 'Correct. Recycled data is common, and modern controls (like MFA and password rotation) mitigate it.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What should you tell the client?',
        options: [
          { id: 'opt-3-1', text: 'Inform them of the alert, explain it is historic data, and confirm their current security controls protect them.', isCorrect: true, feedback: 'Correct. Communication builds trust and demonstrates the value of the service without causing panic.' }
        ]
      }
    }
  },
  {
    id: 'dwid-monitoring-history',
    moduleId: 'darkweb-id',
    title: 'Client asks how far back the monitoring goes',
    description: 'A prospect asks about the historical depth of Dark Web ID.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'During a sales meeting, a prospect asks: "When you start monitoring my domain, how far back does your database go?"',
        options: [
          { id: 'opt-1-1', text: 'It only monitors from the day we turn it on.', isCorrect: false, feedback: 'Dark Web ID has a massive historical database.', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Dark Web ID searches its historical database going back to 2015 for any past breaches involving your domain.', isCorrect: true, feedback: 'Correct. It immediately surfaces years of historical exposure upon setup.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Why is this historical data valuable for a prospect?',
        options: [
          { id: 'opt-2-1', text: 'It proves that their credentials are already out there, demonstrating immediate need for the product.', isCorrect: true, feedback: 'Correct. Showing actual exposed passwords is a powerful sales tool.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How do you show them this without fully onboarding them?',
        options: [
          { id: 'opt-3-1', text: 'Run a Live Search / Prospecting Report in Dark Web ID.', isCorrect: true, feedback: 'Correct. The Live Search is designed specifically for pre-sales.' }
        ]
      }
    }
  },
  {
    id: 'dwid-breach-notification',
    moduleId: 'darkweb-id',
    title: 'Notifying a client about a confirmed breach',
    description: 'Handling the communication for a high-severity alert.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You receive a high-severity alert: The CEO\'s password was exposed yesterday via a botnet keylogger. What is the immediate technical action?',
        options: [
          { id: 'opt-1-1', text: 'Force a password reset, revoke M365 sessions, and isolate their endpoint.', isCorrect: true, feedback: 'Correct. Botnet sources imply active malware on the device.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Now you must communicate this to the client. What tone should you use?',
        options: [
          { id: 'opt-2-1', text: 'Urgent but controlled. Explain the threat, the actions already taken to secure the account, and the next steps for endpoint remediation.', isCorrect: true, feedback: 'Correct. Do not incite panic, but convey the seriousness of a botnet infection.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Why is this communication so important?',
        options: [
          { id: 'opt-3-1', text: 'It proves the MSP is actively monitoring, reacting quickly, and protecting the business from a potentially devastating ransomware event.', isCorrect: true, feedback: 'Correct. This is the core value proposition of Dark Web ID.' }
        ]
      }
    }
  },
  {
    id: 'dwid-multiple-alerts',
    moduleId: 'darkweb-id',
    title: 'Multiple alerts for the same user - noise or pattern',
    description: 'Analyzing a user who generates frequent exposure alerts.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A specific user (jdoe@client.com) has generated 6 Dark Web ID alerts in the last year from various third-party breaches (Canva, LinkedIn, a fitness app). What is the underlying issue?',
        options: [
          { id: 'opt-1-1', text: 'The user is repeatedly reusing their corporate email address and likely the same password for personal services.', isCorrect: true, feedback: 'Correct. This is a behavioral issue: rampant password and email reuse.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you address this pattern?',
        options: [
          { id: 'opt-2-1', text: 'Enroll the user in targeted Security Awareness Training (via BullPhish ID) focusing on password hygiene and not using work emails for personal apps.', isCorrect: true, feedback: 'Correct. Technical controls must be paired with user education.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What other technical control should be strictly enforced for this user?',
        options: [
          { id: 'opt-3-1', text: 'Strict MFA enforcement on all corporate access.', isCorrect: true, feedback: 'Correct. MFA neutralizes the threat of password reuse.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-dwid-1', moduleId: 'darkweb-id', question: 'What does Dark Web ID monitor?', answer: 'It continuously monitors the dark web for compromised credentials, domains, and IP addresses associated with a client.' },
  { id: 'fc-dwid-2', moduleId: 'darkweb-id', question: 'Why do old, exposed passwords matter?', answer: 'Users often reuse passwords or use predictable variations. An old password can give attackers a starting point for brute-force or credential stuffing attacks.' },
  { id: 'fc-dwid-3', moduleId: 'darkweb-id', question: 'Which Kaseya 365 pillar does Dark Web ID belong to?', answer: 'Prevent.' },
  { id: 'fc-dwid-4', moduleId: 'darkweb-id', question: 'What is a "Third-Party Breach"?', answer: 'When credentials are stolen from an external service (like a social media site) where the user registered with their corporate email.' },
  { id: 'fc-dwid-5', moduleId: 'darkweb-id', question: 'What does a "Botnet" source indicate in an alert?', answer: 'High severity. It means data was likely harvested directly from an infected device via malware or a keylogger.' },
  { id: 'fc-dwid-6', moduleId: 'darkweb-id', question: 'How is Dark Web ID used in sales?', answer: 'Using the Live Search (Prospecting) tool to run a one-time domain scan and generate a report showing a prospect their current exposures.' },
  { id: 'fc-dwid-7', moduleId: 'darkweb-id', question: 'How do alerts integrate with PSA systems?', answer: 'Via integrations, Dark Web ID can automatically create and route tickets in a PSA based on the severity of the exposure.' },
  { id: 'fc-dwid-8', moduleId: 'darkweb-id', question: 'Can Dark Web ID monitor personal email addresses?', answer: 'Yes, you can add specific personal emails (like VIPs) to be monitored under a client\'s organization.' },
  { id: 'fc-dwid-9', moduleId: 'darkweb-id', question: 'Are passwords shown in plain text in the alerts?', answer: 'By default, they are obfuscated (e.g., P@ss****) to protect the user, but show enough characters to prove legitimacy.' },
  { id: 'fc-dwid-10', moduleId: 'darkweb-id', question: 'What is the immediate remediation for a new, high-severity credential exposure?', answer: 'Force a password reset and revoke all active sessions for the user in AD/M365.' }
];

export const ticketCases: RealTicketCase[] = [
  {
    id: 'dwid-ticket-1',
    date: '2023-09-12T07:45:00Z',
    moduleId: 'darkweb-id',
    symptoms: 'High severity alert from Dark Web ID: Compromised credential found for the CEO in a recent botnet log dump.',
    initialThought: 'The CEO\'s laptop might be infected with malware (keylogger or stealer).',
    investigation: 'Reviewed the alert in Dark Web ID. The source was listed as "Botnet/Malware". The exposed data included not just the email and password, but system information indicating it was harvested directly from a device. Correlated the timestamp with endpoint logs and found the CEO had installed a dubious browser extension on their home PC.',
    resolution: 'Forced a password reset for the CEO across all corporate accounts. Enforced MFA session revocation. Advised the CEO to stop using the compromised home PC for work until it was formatted.',
    lessonsLearned: 'Botnet source alerts are significantly higher risk than third-party database dumps because they indicate active malware stealing current, live credentials directly from the user\'s keystrokes.',
    fasterNextTime: 'Treat "Botnet" source alerts as immediate incident response triggers, bypassing standard triage SLAs.'
  },
  {
    id: 'dwid-ticket-2',
    date: '2024-03-05T10:20:00Z',
    moduleId: 'darkweb-id',
    symptoms: 'Client opens a ticket panicked because they received a Dark Web ID monthly report showing 45 exposed credentials.',
    initialThought: 'The client is misinterpreting historic breaches as new, active threats.',
    investigation: 'Reviewed the report with the client. Pointed out the "Breach Date" column. 42 of the 45 exposures were from a 2018 LinkedIn breach and a 2016 MySpace breach. The client had implemented a mandatory password reset and MFA in 2021.',
    resolution: 'Explained that the old credentials are dead and pose no risk to the current environment due to MFA and password rotation. Acknowledged the 3 recent breaches and confirmed those users had already been forced to change passwords.',
    lessonsLearned: 'Raw numbers in reports cause panic. MSPs must contextualize the data and explain the mitigating controls (MFA) already in place.',
    fasterNextTime: 'During the initial onboarding of Dark Web ID, bulk-acknowledge all historic breaches so they do not appear as active threats in the first monthly report.'
  },
  {
    id: 'dwid-ticket-3',
    date: '2024-07-22T14:15:00Z',
    moduleId: 'darkweb-id',
    symptoms: 'Dark Web ID alerts that a client\'s public static IP address was posted on a hacker forum discussing RDP brute-forcing.',
    initialThought: 'The client\'s firewall might have port 3389 open to the internet.',
    investigation: 'Checked the client\'s firewall configuration remotely. Discovered a misconfigured NAT rule that was forwarding RDP traffic directly to an internal server. Reviewed the server\'s event logs and saw thousands of failed login attempts.',
    resolution: 'Immediately disabled the NAT rule, closing port 3389. Implemented a VPN requirement for remote access. Verified no successful logins occurred during the brute-force window.',
    lessonsLearned: 'Dark Web ID monitors infrastructure (IPs), not just identities. This provides threat intelligence on active targeting.',
    fasterNextTime: 'Automate external port scans for all client IPs to detect open RDP before it ends up on a targeting list.'
  }
];
