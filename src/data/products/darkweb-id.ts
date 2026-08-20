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
  ],
  sources: [
    {
      title: "Dark Web ID Product Overview",
      url: "https://www.kaseya.com/products/dark-web-id/",
      verifiedAt: "2026-08-20T00:00:00Z",
      supports: ["Credential exposure alerts", "Live search capabilities", "PSA integrations"]
    }
  ]
};


export const scenarios: Scenario[] = [
  {
    id: 'dwid-credential-exposure',
    moduleId: 'darkweb-id',
    title: 'Credential Exposure Alert',
    description: 'An alert fires indicating a client\'s employee credentials were found on the dark web.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You receive a Dark Web ID alert: "Compromised Credential Found" for jsmith@clientdomain.com. What is your first step?',
        options: [
          { id: 'opt-1-1', text: 'Immediately reset jsmith\'s Active Directory and M365 passwords.', isCorrect: false, feedback: 'While password resets are important, you should verify the alert details first. Is it an old breach or a new one? Is the password partially obfuscated?', nextStepId: 'step-1' },
          { id: 'opt-1-2', text: 'Review the alert details in Dark Web ID to determine the source of the breach, the date, and if the password is plain text or hashed.', isCorrect: true, feedback: 'Correct. You must analyze the context to determine the severity and response.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The alert shows a plain-text password from a recent breach of a third-party fitness app. What does this mean?',
        options: [
          { id: 'opt-2-1', text: 'The fitness app was breached, not the client\'s network. The risk is if the user reused their work password on the fitness app.', isCorrect: true, feedback: 'Exactly. Password reuse is the primary threat vector here.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What is the appropriate action to take with the user?',
        options: [
          { id: 'opt-3-1', text: 'Force a corporate password reset for jsmith, advise them of the third-party breach, and remind them not to reuse work passwords.', isCorrect: true, feedback: 'Correct. Protect the corporate network first, then educate the user.' }
        ]
      }
    }
  },
  {
    id: 'dwid-noise-reduction',
    moduleId: 'darkweb-id',
    title: 'Verifying Breach vs. Noise',
    description: 'A client receives a high volume of alerts for a single domain and is concerned about a breach.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client is panicking because they received 50 Dark Web ID alerts in one day. How do you investigate?',
        options: [
          { id: 'opt-1-1', text: 'Check if the alerts stem from a single, known historic data dump (like the "Collection #1" breach from years ago) that was recently re-indexed.', isCorrect: true, feedback: 'Correct. Dark Web ID sometimes ingests old data from new sources. Identifying a historic dump reduces panic.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You confirm the source is indeed a massive dump of old LinkedIn credentials from 2012. What do you tell the client?',
        options: [
          { id: 'opt-2-1', text: 'Explain it is a re-surface of old data. Ask if they have enforced any password changes or MFA since 2012.', isCorrect: true, feedback: 'Yes. Contextualize the threat. If they\'ve changed passwords since, the risk is minimal.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'They implemented MFA and a 90-day password policy in 2020. What is the conclusion?',
        options: [
          { id: 'opt-3-1', text: 'The exposed credentials are dead and useless. The alert is informational, and no immediate remediation is required.', isCorrect: true, feedback: 'Correct. Document the findings and reassure the client.' }
        ]
      }
    }
  },
  {
    id: 'dwid-client-notification',
    moduleId: 'darkweb-id',
    title: 'Client Notification Workflow',
    description: 'Setting up automated reporting for a new managed client.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You are onboarding a new client to Dark Web ID. They want a monthly report of their exposure but don\'t want to be spammed with every individual alert. How do you configure this?',
        options: [
          { id: 'opt-1-1', text: 'Set up a Scheduled Report in Dark Web ID to send a monthly summary to the client\'s IT contact, and route real-time alerts only to the MSP PSA.', isCorrect: true, feedback: 'Correct. This separates operational noise from executive reporting.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Where do you configure the real-time alerts to go to the MSP PSA?',
        options: [
          { id: 'opt-2-1', text: 'In the Integrations section, configure the PSA integration to map alerts to a specific ticket board and company.', isCorrect: true, feedback: 'Yes. Proper mapping ensures techs see actionable alerts immediately.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The client also wants to monitor a specific VIP\'s personal email address. Can you do this?',
        options: [
          { id: 'opt-3-1', text: 'Yes, you can add personal email addresses as specific targets to monitor under the client\'s organization.', isCorrect: true, feedback: 'Correct. Dark Web ID allows monitoring domains, IPs, and specific individual email addresses.' }
        ]
      }
    }
  },
  {
    id: 'dwid-ip-monitoring',
    moduleId: 'darkweb-id',
    title: 'Monitoring IP Addresses',
    description: 'An alert fires for a compromised server IP rather than an email address.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You get an alert that a client\'s public IP address was found on a hacker forum. What does this usually indicate?',
        options: [
          { id: 'opt-1-1', text: 'It may indicate an open port, a vulnerable service, or that the IP is listed on a target list for RDP brute-forcing.', isCorrect: true, feedback: 'Correct. IP exposure implies infrastructure targeting, not necessarily credential theft.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'What is your immediate investigative step?',
        options: [
          { id: 'opt-2-1', text: 'Scan the client\'s public IP for open ports (especially 3389/RDP) and check firewall logs for incoming attacks.', isCorrect: true, feedback: 'Yes. You need to secure the perimeter immediately.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You find RDP was accidentally left open to the internet. You close it. What should you do next?',
        options: [
          { id: 'opt-3-1', text: 'Review server login logs to see if any brute-force attacks were successful while it was open.', isCorrect: true, feedback: 'Correct. Closing the door is step one; checking if anyone got inside is step two.' }
        ]
      }
    }
  },
  {
    id: 'dwid-prospecting',
    moduleId: 'darkweb-id',
    title: 'Running a Prospecting Search',
    description: 'Using Dark Web ID to generate a report for a sales meeting.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A sales rep asks you to run a Dark Web scan for a potential client, "Acme Corp" (acme.com), before a meeting. What feature do you use?',
        options: [
          { id: 'opt-1-1', text: 'Use the Live Search or Prospecting tool to run a one-time domain search and generate a PDF report.', isCorrect: true, feedback: 'Correct. The prospecting tool is designed exactly for pre-sales intelligence without setting up full monitoring.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The report shows 15 exposed credentials. Before handing it to sales, what should you verify?',
        options: [
          { id: 'opt-2-1', text: 'Check the dates of the breaches. If they are all 10 years old, it\'s less impactful than if there are breaches from last month.', isCorrect: true, feedback: 'Yes. Sales needs context to present the data effectively, not just raw numbers.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Sales asks if we can show the plain text passwords in the report. Can we?',
        options: [
          { id: 'opt-3-1', text: 'By default, passwords are obfuscated in prospecting reports for security and privacy reasons.', isCorrect: true, feedback: 'Correct. Providing plain text passwords of a non-client is a massive security liability.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-dwid-1', moduleId: 'darkweb-id', question: 'What is the primary function of Dark Web ID?', answer: 'To monitor the dark web for compromised credentials, domains, and IP addresses associated with a client.' },
  { id: 'fc-dwid-2', moduleId: 'darkweb-id', question: 'Does Dark Web ID prevent breaches?', answer: 'No, it is a detective control. It alerts you AFTER data has been exposed, allowing for rapid response.' },
  { id: 'fc-dwid-3', moduleId: 'darkweb-id', question: 'What is a "Live Search"?', answer: 'A one-time search used by sales and account managers to find exposures for a prospect without setting up continuous monitoring.' },
  { id: 'fc-dwid-4', moduleId: 'darkweb-id', question: 'Why might an exposed password be shown with asterisks (e.g., P@ss****)?', answer: 'Dark Web ID obfuscates passwords by default to protect the user, while showing enough to prove to the user it was their real password.' },
  { id: 'fc-dwid-5', moduleId: 'darkweb-id', question: 'What does a "Third-Party Breach" mean?', answer: 'The user\'s credentials were stolen from an external service (like LinkedIn or Canva), not directly from the corporate network.' },
  { id: 'fc-dwid-6', moduleId: 'darkweb-id', question: 'Why is a third-party breach dangerous to a company?', answer: 'Because users frequently reuse the same password across multiple personal and professional accounts.' },
  { id: 'fc-dwid-7', moduleId: 'darkweb-id', question: 'Can Dark Web ID monitor personal email addresses?', answer: 'Yes, you can add specific personal email addresses (like VIPs\' Gmail or Yahoo accounts) to a client\'s watch list.' },
  { id: 'fc-dwid-8', moduleId: 'darkweb-id', question: 'What does "Botnet" source mean in an alert?', answer: 'The data was likely harvested by malware/keyloggers running directly on an infected device, which is a high-severity indicator.' },
  { id: 'fc-dwid-9', moduleId: 'darkweb-id', question: 'How can you reduce the noise of historic breach alerts for a new client?', answer: 'Acknowledge/clear the backlog of old alerts upon initial onboarding so only new, net-new exposures generate active tickets.' },
  { id: 'fc-dwid-10', moduleId: 'darkweb-id', question: 'Can Dark Web ID monitor IP addresses?', answer: 'Yes, you can input public static IPs or ranges to see if they are being discussed on hacker forums.' },
  { id: 'fc-dwid-11', moduleId: 'darkweb-id', question: 'How do alerts get into the MSP PSA?', answer: 'Via the Integrations section, which can create tickets automatically based on alert severity.' },
  { id: 'fc-dwid-12', moduleId: 'darkweb-id', question: 'What is a "Combo List"?', answer: 'A compiled list of emails and passwords from various breaches, often used by attackers for credential stuffing.' },
  { id: 'fc-dwid-13', moduleId: 'darkweb-id', question: 'If a user has MFA enabled, is an exposed password still a risk?', answer: 'Yes, though the risk is heavily mitigated. The attacker cannot log in directly, but the user should still change the password.' },
  { id: 'fc-dwid-14', moduleId: 'darkweb-id', question: 'What is the "Dark Web"?', answer: 'A hidden part of the internet requiring specialized software (like Tor) to access, where illicit data is often traded.' },
  { id: 'fc-dwid-15', moduleId: 'darkweb-id', question: 'What should be the immediate technical response to a high-risk credential exposure?', answer: 'Force a password reset for the affected user and terminate their active sessions in AD/M365.' }
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

