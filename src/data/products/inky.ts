import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'inky',
  name: 'INKY',
  description: 'Advanced email security and phishing prevention.',
  iconName: 'MailWarning',
  color: 'bg-purple-600',
  order: 10,
  problemSolved: 'Standard email filters miss sophisticated phishing and Business Email Compromise (BEC) attacks. Users get tricked into clicking bad links or paying fake invoices.',
  mentalModel: 'INKY acts as a smart bodyguard for your inbox. It reads every email, looks for red flags (like fake logos or weird sender addresses), and stamps a colored warning banner directly on the email so the user knows if it\'s safe.',
  keyTerminology: [
    { term: 'Phish Fence', definition: 'The core engine that analyzes emails using machine learning and computer vision.' },
    { term: 'Banner', definition: 'The visual warning (Red, Yellow, Gray) injected at the top of the email body.' },
    { term: 'Passive Mode', definition: 'Monitoring mode where INKY scores emails but does not show banners or quarantine anything.' }
  ],
  actualUseCases: [
    'Stopping a fake "Urgent Invoice" email from reaching the CFO',
    'Warning a user that an email is from a first-time sender',
    'Detecting an internal compromised account sending spam'
  ],
  commonWorkflows: [
    'Investigating a user-reported email via the INKY dashboard',
    'Reclassifying a false positive (legitimate email marked as spam)',
    'Deploying INKY in Passive Mode for a new client'
  ],
  whenNotToUse: [
    'Do not use this to restore an email that was deleted a month ago (use SaaS Protection).',
    'Do not use this to send simulated phishing tests (use BullPhish ID).'
  ],
  relatedProducts: ['Datto SaaS Protection', 'BullPhish ID'],
  commonConfusions: [
    'Confused with SaaS Protection: INKY secures incoming mail, SaaS Protection backs up the mailbox.',
    'Confused with BullPhish ID: INKY blocks real attacks, BullPhish ID simulates fake ones for training.'
  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'inky-migration',
    moduleId: 'inky',
    title: 'Client migrating from Graphus/SaaS Defense to INKY',
    description: 'A client is moving from the legacy Datto SaaS Defense or Graphus product to INKY.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The client is currently using Graphus for email security and is ready to switch to INKY. What is the first critical step?',
        options: [
          { id: 'opt-1-1', text: 'Uninstall Graphus/SaaS Defense connectors to prevent mail flow conflicts.', isCorrect: true, feedback: 'Correct. Running two inline API security solutions will cause mail delivery delays and false positives.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Once the legacy tool is removed, how long does the INKY setup take?',
        options: [
          { id: 'opt-2-1', text: 'Approximately 15 minutes per new customer via KaseyaOne SSO.', isCorrect: true, feedback: 'Correct! The initial setup takes ~30 mins, but subsequent clients take about 15 minutes.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How do you verify the deployment was successful?',
        options: [
          { id: 'opt-3-1', text: 'Send a test email from an external domain and ensure the INKY dynamic banner appears.', isCorrect: true, feedback: 'Correct. The dynamic banner is the easiest visual verification.' }
        ]
      }
    }
  },
  {
    id: 'inky-bp-simulation',
    moduleId: 'inky',
    title: 'BullPhish simulation got flagged as a real threat',
    description: 'INKY flagged a BullPhish ID simulation email as malicious.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You just launched a BullPhish ID campaign, and users are getting red INKY banners on the simulated phishing emails. Why did this happen?',
        options: [
          { id: 'opt-1-1', text: 'The BullPhish ID integration in INKY wasn\'t fully configured or synced.', isCorrect: true, feedback: 'Correct. INKY natively integrates with BullPhish ID and should automatically whitelist its simulations.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you fix this integration issue?',
        options: [
          { id: 'opt-2-1', text: 'Ensure the API integration between BullPhish ID and INKY is active in the portal.', isCorrect: true, feedback: 'Correct. The API integration ensures INKY knows which emails are safe simulations.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Once fixed, what happens to future BullPhish ID emails?',
        options: [
          { id: 'opt-3-1', text: 'INKY bypasses scanning for those specific simulations so they reach the inbox as intended.', isCorrect: true, feedback: 'Correct. They will not receive red banners or be quarantined.' }
        ]
      }
    }
  },
  {
    id: 'inky-bp-report',
    moduleId: 'inky',
    title: 'User reports a phish correctly during a real BullPhish campaign',
    description: 'A user correctly identifies and reports a BullPhish ID simulation email using INKY.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'During a BullPhish ID simulation, a user correctly uses the INKY "Report this Email" button on the fake phishing email. What happens?',
        options: [
          { id: 'opt-1-1', text: 'INKY recognizes it as a BullPhish ID simulation and provides positive feedback to the user.', isCorrect: true, feedback: 'Correct. INKY handles the report gracefully and congratulates the user for spotting the simulation.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How does this appear in the BullPhish ID reporting dashboard?',
        options: [
          { id: 'opt-2-1', text: 'The user is marked as having successfully reported the phishing attempt.', isCorrect: true, feedback: 'Correct. The integration works both ways, updating the training metrics.' }
        ]
      }
    }
  },
  {
    id: 'inky-outbound-dlp',
    moduleId: 'inky',
    title: 'Setting up outbound DLP policy for a healthcare client',
    description: 'Configuring Data Loss Prevention (DLP) for outbound emails containing PHI.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A healthcare client needs to ensure any email containing patient data (PHI) is sent securely. How does INKY handle this?',
        options: [
          { id: 'opt-1-1', text: 'Configure an Outbound DLP policy in INKY to detect sensitive information like SSNs or medical record numbers.', isCorrect: true, feedback: 'Correct. INKY scans outbound mail as well as inbound.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'When the DLP policy is triggered by a doctor sending an unencrypted email with PHI, what does INKY do?',
        options: [
          { id: 'opt-2-1', text: 'INKY auto-encrypts the email and sends the recipient a secure portal link to view the message.', isCorrect: true, feedback: 'Correct. This ensures compliance without requiring the doctor to manually click an "Encrypt" button.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How does the recipient access the secure message?',
        options: [
          { id: 'opt-3-1', text: 'They click the link, authenticate (often via a one-time passcode), and view the message in the secure INKY portal.', isCorrect: true, feedback: 'Correct. This is a standard and compliant way to handle outbound PHI.' }
        ]
      }
    }
  },
  {
    id: 'inky-missing-banner',
    moduleId: 'inky',
    title: 'Dynamic banner not appearing on a suspicious email',
    description: 'A user receives an external email but there is no INKY banner.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A user forwards a suspicious email to IT, noting that there was no colored INKY banner on it. What is the most likely reason?',
        options: [
          { id: 'opt-1-1', text: 'The email was sent from another internal user, or INKY is in passive mode.', isCorrect: true, feedback: 'Correct. If it is internal and internal scanning is off, or if it is passive mode, banners won\'t appear.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You check INKY and confirm the policy is Active and the email was external. What else could cause this?',
        options: [
          { id: 'opt-2-1', text: 'The sender might be explicitly whitelisted, bypassing banner injection.', isCorrect: true, feedback: 'Correct. Whitelisting a sender can remove the banner, which is why it should be used sparingly.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You find the domain was whitelisted by a previous tech. What should you do?',
        options: [
          { id: 'opt-3-1', text: 'Remove the explicit whitelist entry and let INKY\'s AI score the emails naturally.', isCorrect: true, feedback: 'Correct. AI-driven tools work best when allowed to score normally.' }
        ]
      }
    }
  },
  {
    id: 'inky-onboarding',
    moduleId: 'inky',
    title: 'New customer onboarding - the 15-minute setup',
    description: 'Deploying INKY for a brand new customer quickly.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You need to deploy INKY to a new M365 customer. What is the access method used by MSPs?',
        options: [
          { id: 'opt-1-1', text: 'Log in using KaseyaOne SSO.', isCorrect: true, feedback: 'Correct. KaseyaOne provides unified access to the INKY portal.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Once in the portal, you authorize the M365 tenant. How long should this new customer setup take?',
        options: [
          { id: 'opt-2-1', text: 'About 15 minutes per new customer after the initial 30-minute master setup.', isCorrect: true, feedback: 'Correct. The process is streamlined via APIs.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The API is connected. What must you configure in M365 for mail to flow through INKY?',
        options: [
          { id: 'opt-3-1', text: 'INKY automatically creates the necessary mail flow rules and connectors in Exchange Online.', isCorrect: true, feedback: 'Correct. The API integration handles the heavy lifting of connector creation.' }
        ]
      }
    }
  },
  {
    id: 'inky-prerelease-connector',
    moduleId: 'inky',
    title: 'Pre-release connector configuration issue',
    description: 'Troubleshooting mail flow rules during a pre-release phase.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'During a pre-release trial, mail is bypassing INKY entirely. You check the M365 mail flow rules. What might be wrong?',
        options: [
          { id: 'opt-1-1', text: 'Another transport rule is set to "Stop processing more rules" before the INKY rule is evaluated.', isCorrect: true, feedback: 'Correct. Rule priority in Exchange Online is critical.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you fix this?',
        options: [
          { id: 'opt-2-1', text: 'Move the INKY mail flow rule to a higher priority (Priority 0 or 1).', isCorrect: true, feedback: 'Correct. INKY must inspect mail before other routing rules discard it.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'After fixing the priority, you want to test silently. What mode should INKY be in?',
        options: [
          { id: 'opt-3-1', text: 'Passive Mode / Monitor Only.', isCorrect: true, feedback: 'Correct. This tests mail flow without showing banners or blocking emails.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-inky-1', moduleId: 'inky', question: 'Which older Kaseya email security products did INKY replace?', answer: 'Graphus and Datto SaaS Defense.' },
  { id: 'fc-inky-2', moduleId: 'inky', question: 'How do dynamic banners differ from blocking triggers?', answer: 'Banners warn the user and provide context (e.g., "External Sender"), whereas blocking triggers prevent the email from ever reaching the inbox.' },
  { id: 'fc-inky-3', moduleId: 'inky', question: 'What is the default behavior of INKY\'s Outbound DLP?', answer: 'It scans outgoing emails for sensitive data (like PHI or SSNs) and can automatically encrypt the email, sending the recipient a secure portal link.' },
  { id: 'fc-inky-4', moduleId: 'inky', question: 'How does INKY integrate with BullPhish ID?', answer: 'INKY natively integrates with BullPhish ID to automatically recognize simulated phishing campaigns, ensuring they are not blocked or flagged with red banners.' },
  { id: 'fc-inky-5', moduleId: 'inky', question: 'What happens when a user reports a BullPhish ID simulation using the INKY report button?', answer: 'INKY gives the user positive feedback (congratulating them for spotting the fake phish) and updates the BullPhish ID reporting metrics.' },
  { id: 'fc-inky-6', moduleId: 'inky', question: 'How do MSPs access the INKY admin portal?', answer: 'Through KaseyaOne SSO.' },
  { id: 'fc-inky-7', moduleId: 'inky', question: 'What is the typical setup time for INKY?', answer: 'About 30 minutes for the initial partner setup, and then 15 minutes per new customer.' },
  { id: 'fc-inky-8', moduleId: 'inky', question: 'What does a Yellow INKY banner indicate?', answer: 'Caution. It highlights unusual characteristics like a first-time sender, lookalike domain, or suspicious tone.' },
  { id: 'fc-inky-9', moduleId: 'inky', question: 'What does a Red INKY banner indicate?', answer: 'Danger. The email is highly likely to be phishing, malware, or BEC, and links are often disabled.' },
  { id: 'fc-inky-10', moduleId: 'inky', question: 'Does INKY require changing MX records?', answer: 'No, it integrates via API and Exchange Online mail flow connectors.' },
  { id: 'fc-inky-11', moduleId: 'inky', question: 'What is "Passive Mode"?', answer: 'A deployment state where INKY analyzes mail and scores it, but does not inject banners or quarantine messages, useful for baselining.' },
  { id: 'fc-inky-12', moduleId: 'inky', question: 'How does INKY detect Business Email Compromise (BEC)?', answer: 'It uses AI and stylometry to analyze sender behavior, tone, and lookalike domains, rather than relying solely on known bad links or attachments.' },
  { id: 'fc-inky-13', moduleId: 'inky', question: 'Can INKY scan internal, user-to-user emails?', answer: 'Yes, if configured to do so, which is critical for detecting lateral movement from compromised accounts.' },
  { id: 'fc-inky-14', moduleId: 'inky', question: 'How are false positives handled in INKY?', answer: 'Admins can reclassify legitimate emails as "Safe" in the dashboard, which helps train INKY\'s machine learning model for that specific tenant.' },
  { id: 'fc-inky-15', moduleId: 'inky', question: 'Does INKY charge licensing for shared mailboxes?', answer: 'Typically, INKY licenses per active user mailbox, similar to M365 licensing, often excluding unpaid shared mailboxes, but check current pricing tiers.' }
];

export const ticketCases: RealTicketCase[] = [
  {
    id: 'inky-ticket-1',
    date: '2023-10-05T08:20:00Z',
    moduleId: 'inky',
    symptoms: 'User reports a yellow INKY banner on an email from a regular vendor asking to update wire transfer details.',
    initialThought: 'Probably a false positive or the vendor is using a new invoicing system.',
    investigation: 'Checked the INKY dashboard for the specific message ID. INKY flagged it as "First Time Sender" and noted a lookalike domain (e.g., vendor-billing.com instead of vendor.com). The email was a Business Email Compromise (BEC) attempt impersonating the vendor.',
    resolution: 'Classified the email as Malicious in INKY, which automatically moved it to quarantine. Advised the user to contact the vendor via a known good phone number to verify. Added the lookalike domain to the blocklist.',
    lessonsLearned: 'Never ignore yellow banners on financial requests. INKY\'s stylometry and domain analysis often catch BEC attempts that standard SPF/DKIM checks pass because the attacker registered a new, valid domain.',
    fasterNextTime: 'Train users to immediately escalate any email requesting payment changes, regardless of banner color, and use INKY\'s domain analysis tool first.'
  },
  {
    id: 'inky-ticket-2',
    date: '2024-01-12T13:10:00Z',
    moduleId: 'inky',
    symptoms: 'Alert: Outbound email blocked by INKY due to malicious content originating from an internal user.',
    initialThought: 'An internal user\'s account has been compromised and is being used to send spam/phishing.',
    investigation: 'Reviewed the blocked outbound message in INKY. It contained a generic "Please view secure document" phishing link. The user had successfully logged in from an anomalous IP in a foreign country (M365 logs confirmed).',
    resolution: 'Immediately disabled the user\'s AD/M365 account, revoked sessions, and reset the password. Checked for inbox rules (found a rule forwarding emails to an external address and deleted it). INKY prevented the company from being blacklisted by blocking the outbound spam.',
    lessonsLearned: 'Internal/Outbound scanning in INKY is just as critical as inbound. It acts as an early warning system for compromised accounts.',
    fasterNextTime: 'Create an automated runbook in the PSA/RMM to instantly lock an M365 account when an INKY outbound malicious alert is generated.'
  },
  {
    id: 'inky-ticket-3',
    date: '2024-06-18T16:00:00Z',
    moduleId: 'inky',
    symptoms: 'Client complains that INKY is adding banners to their automated internal ticketing system emails, making them hard to read.',
    initialThought: 'The internal ticketing system is sending unauthenticated mail or spoofing the internal domain.',
    investigation: 'Checked INKY logs. The ticketing system was sending emails from "support@clientdomain.com" but originating from a third-party IP address that was not listed in the client\'s SPF record.',
    resolution: 'Instead of whitelisting the ticketing system in INKY, updated the client\'s SPF and DKIM records to properly authenticate the third-party sender. Once authenticated, INKY stopped flagging the emails as spoofed.',
    lessonsLearned: 'Fix the root cause (DNS authentication) rather than creating bypass rules in the security tool.',
    fasterNextTime: 'Before deploying INKY in Active Mode, leave it in Passive Mode for 2 weeks to identify and fix all third-party services sending on behalf of the client.'
  }
];
