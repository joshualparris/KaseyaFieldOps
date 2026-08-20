import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'darkweb-id',
  name: 'Dark Web ID',
  description: 'Dark web monitoring and credential exposure alerts.',
  iconName: 'UserX',
  color: 'bg-stone-800',
  order: 4,
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
