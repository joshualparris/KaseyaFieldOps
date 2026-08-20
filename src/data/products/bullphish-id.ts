import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'bullphish-id',
  name: 'BullPhish ID',
  description: 'Security awareness training and phishing simulation.',
  iconName: 'Fish',
  color: 'bg-emerald-600',
  order: 5,
  problemSolved: 'The biggest vulnerability in any network is the human. Technical controls (firewalls, email filters) fail, and users click bad links. BullPhish trains users not to click by testing them with safe, simulated attacks.',
  mentalModel: 'It is a fire drill for email. You send fake phishing emails to employees. If they click, they get enrolled in training instead of getting hacked.',
  keyTerminology: [
    { term: 'Simulated Phishing', definition: 'Sending safe, fake malicious emails to test user awareness.' },
    { term: 'Catch and Release', definition: 'Immediately showing a training video right after a user clicks a test link.' },
    { term: 'Submitted Data', definition: 'The highest severity failure—the user clicked the link AND typed their password into the fake landing page.' }
  ],
  actualUseCases: [
    'Running a monthly test to see who clicks fake "UPS Delivery" emails',
    'Rolling out mandatory annual HIPAA compliance training videos',
    'Automatically assigning remedial training to users who fail tests'
  ],
  commonWorkflows: [
    'Whitelisting BullPhish IP addresses in the client\'s email filter',
    'Syncing users from Microsoft 365 / Azure AD',
    'Creating custom localized phishing templates'
  ],
  whenNotToUse: [
    'Do not use this to stop real incoming phishing emails (use INKY).',
    'Do not use this to check if credentials are already leaked on the dark web (use Dark Web ID).'
  ],
  relatedProducts: ['Dark Web ID', 'INKY'],
  commonConfusions: [
    'Confused with INKY: BullPhish sends fake tests, INKY stops real attacks.',
    'Confused with Dark Web ID: BullPhish prevents future credential theft via training, Dark Web ID monitors for past theft.'
  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'bpid-10-min-setup',
    moduleId: 'bullphish-id',
    title: 'Setting up a monthly phishing campaign in ~10 minutes',
    description: 'Configuring a recurring phishing simulation quickly.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You need to set up a monthly phishing campaign for a client. What is the most crucial prerequisite to ensure the emails actually reach the users?',
        options: [
          { id: 'opt-1-1', text: 'Whitelist the BullPhish ID sending IP addresses in the client\'s email filter (e.g., INKY or M365 Defender).', isCorrect: true, feedback: 'Correct. Without whitelisting, the security tools will block the simulations.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Whitelisting is done. How long does the actual campaign creation in the BullPhish ID portal take?',
        options: [
          { id: 'opt-2-1', text: 'Approximately 10 minutes using built-in templates and automated scheduling.', isCorrect: true, feedback: 'Correct. The platform is designed for rapid deployment of recurring campaigns.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How should you schedule the delivery of the simulated emails?',
        options: [
          { id: 'opt-3-1', text: 'Stagger the delivery over several days so users don\'t receive them all at once and warn each other.', isCorrect: true, feedback: 'Correct. Staggered delivery ensures accurate test results.' }
        ]
      }
    }
  },
  {
    id: 'bpid-poor-results',
    moduleId: 'bullphish-id',
    title: 'Interpreting poor campaign results',
    description: 'Handling a high click rate on a recent phishing simulation.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A recent phishing campaign report shows a 25% Click Rate and 10% Submitted Data rate. The client is upset. How do you frame this?',
        options: [
          { id: 'opt-1-1', text: 'Explain that this establishes a baseline. The goal is to prove ROI by driving these numbers down over subsequent months.', isCorrect: true, feedback: 'Correct. High initial failure rates justify the need for the training service.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'What does "Submitted Data" mean in this context?',
        options: [
          { id: 'opt-2-1', text: 'The user clicked the link and entered their credentials into the fake landing page.', isCorrect: true, feedback: 'Correct. This is a critical failure representing compromised credentials.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What is the automated next step for users who failed?',
        options: [
          { id: 'opt-3-1', text: 'BullPhish ID can automatically enroll them in remedial security awareness training.', isCorrect: true, feedback: 'Correct. Automated remediation turns failures into immediate learning opportunities.' }
        ]
      }
    }
  },
  {
    id: 'bpid-cyber-insurance',
    moduleId: 'bullphish-id',
    title: 'Client needs proof of training for cyber insurance',
    description: 'Generating compliance reports for cyber liability insurance audits.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client is renewing their cyber liability insurance. The carrier requires proof that all employees undergo regular security awareness training. Where do you get this?',
        options: [
          { id: 'opt-1-1', text: 'Generate a comprehensive compliance report from the BullPhish ID dashboard showing training completion rates.', isCorrect: true, feedback: 'Correct. BullPhish ID provides audit-ready reporting.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'The report shows 5 users are marked "Incomplete". Why might this be?',
        options: [
          { id: 'opt-2-1', text: 'They may have watched the video but failed or neglected to take the quiz at the end.', isCorrect: true, feedback: 'Correct. Both video completion and passing the quiz are required.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How do you ensure those 5 users finish before the audit?',
        options: [
          { id: 'opt-3-1', text: 'Use BullPhish ID to send automated reminder emails to users with incomplete training.', isCorrect: true, feedback: 'Correct. Automated nagging helps achieve 100% compliance.' }
        ]
      }
    }
  },
  {
    id: 'bpid-multilingual',
    moduleId: 'bullphish-id',
    title: 'Multilingual workforce training rollout',
    description: 'Deploying training to an international team.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client has offices in the US, Mexico, and France. How does BullPhish ID accommodate this?',
        options: [
          { id: 'opt-1-1', text: 'BullPhish ID offers phishing templates and training modules in multiple languages.', isCorrect: true, feedback: 'Correct. Localized training is far more effective.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Can you target specific languages to specific groups?',
        options: [
          { id: 'opt-2-1', text: 'Yes, by organizing users into groups (e.g., via Entra ID sync) and assigning the appropriately translated campaigns to each group.', isCorrect: true, feedback: 'Correct. Segmentation ensures users receive relevant content.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What happens if you send a Spanish template, but the fake landing page is in English?',
        options: [
          { id: 'opt-3-1', text: 'It creates a discrepancy that might tip off the user, ruining the simulation. Ensure both email and landing page templates match the target language.', isCorrect: true, feedback: 'Correct. Consistency is key for a realistic simulation.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-bpid-1', moduleId: 'bullphish-id', question: 'What is the typical setup time for a recurring BullPhish ID campaign?', answer: 'Approximately 10 minutes.' },
  { id: 'fc-bpid-2', moduleId: 'bullphish-id', question: 'What are the two required components for a user to complete a training module?', answer: 'Watching the animated video and passing the associated quiz.' },
  { id: 'fc-bpid-3', moduleId: 'bullphish-id', question: 'Which Kaseya 365 pillar does BullPhish ID belong to?', answer: 'Prevent.' },
  { id: 'fc-bpid-4', moduleId: 'bullphish-id', question: 'What must be done before launching a phishing campaign?', answer: 'Whitelist BullPhish ID IP addresses and domains in the client\'s email security gateway (like INKY or M365 Defender).' },
  { id: 'fc-bpid-5', moduleId: 'bullphish-id', question: 'How does BullPhish ID integrate natively with INKY?', answer: 'INKY automatically recognizes BullPhish ID simulations (via API integration) and allows them to bypass filters without showing red warning banners.' },
  { id: 'fc-bpid-6', moduleId: 'bullphish-id', question: 'What is "Catch and Release"?', answer: 'A feature where a user who clicks a fake phishing link is immediately redirected to a short, contextual training video explaining their mistake.' },
  { id: 'fc-bpid-7', moduleId: 'bullphish-id', question: 'What does "Submitted Data" mean in campaign analytics?', answer: 'The user clicked the phishing link AND entered their credentials into the simulated landing page (the highest severity failure).' },
  { id: 'fc-bpid-8', moduleId: 'bullphish-id', question: 'How do you handle users who consistently fail simulations?', answer: 'Utilize automated remedial training to automatically assign extra security awareness courses to users who click links.' },
  { id: 'fc-bpid-9', moduleId: 'bullphish-id', question: 'How can you automate user management in BullPhish ID?', answer: 'By syncing users automatically via integrations with Microsoft Entra ID (Azure AD) or Google Workspace.' },
  { id: 'fc-bpid-10', moduleId: 'bullphish-id', question: 'Why is Staggered Delivery important?', answer: 'It delivers test emails randomly over a set period, preventing employees from receiving them simultaneously and warning each other.' }
];

export const ticketCases: RealTicketCase[] = [
  {
    id: 'bpid-ticket-1',
    date: '2023-08-10T11:00:00Z',
    moduleId: 'bullphish-id',
    symptoms: 'Client complains that 100% of their users clicked the phishing link in the latest BullPhish ID campaign.',
    initialThought: 'The email security gateway scanned the links and triggered false positives.',
    investigation: 'Checked the campaign logs. All "clicks" occurred within 3 minutes of the emails being sent, and the source IP addresses of the clicks belonged to Microsoft (M365 Defender). The client\'s IT contact had accidentally removed the BullPhish IP addresses from their Advanced Delivery bypass policy.',
    resolution: 'Re-added the BullPhish IP addresses to the M365 Defender Advanced Delivery simulation bypass list. Scrapped the ruined campaign data and scheduled a new, identical campaign for the following week.',
    lessonsLearned: 'Whitelisting is brittle and must be verified before every major campaign, especially if the client makes their own tenant changes.',
    fasterNextTime: 'Implement a pre-flight checklist that sends a single test email to an admin account to verify link-scanning bypass before launching to 500 users.'
  },
  {
    id: 'bpid-ticket-2',
    date: '2024-04-15T09:30:00Z',
    moduleId: 'bullphish-id',
    symptoms: 'A user clicked a simulated phishing link, entered their credentials, and is now locked out of their M365 account.',
    initialThought: 'An automated security response triggered because the user failed the test severely.',
    investigation: 'Checked the PSA ticket history and M365 logs. The MSP had built a logic app that automatically disabled accounts if they reached the "Submitted Data" state in a BullPhish ID campaign to enforce immediate remedial training.',
    resolution: 'Contacted the user, explained they failed a simulated phishing test, and guided them to complete the required 15-minute remedial training module. Once completed, re-enabled their M365 account.',
    lessonsLearned: 'Automated punitive measures for failing phishing tests are effective but generate helpdesk tickets. The helpdesk needs a clear SOP for handling these lockouts.',
    fasterNextTime: 'Instead of full lockouts, use Conditional Access to restrict access to sensitive apps until the remedial training is completed, reducing complete work stoppage.'
  },
  {
    id: 'bpid-ticket-3',
    date: '2024-08-05T15:45:00Z',
    moduleId: 'bullphish-id',
    symptoms: 'Client requests a custom phishing campaign impersonating a specific internal HR policy update, but the emails are landing in Spam.',
    initialThought: 'The emails are failing SPF/DKIM checks because they are spoofing the client\'s internal domain without proper DNS authorization.',
    investigation: 'The tech used the client\'s exact domain (hr@clientdomain.com) in the BullPhish sender profile. The client\'s DMARC policy is set to "reject", so the receiving server rejected the unauthenticated emails.',
    resolution: 'Instead of modifying the client\'s complex DNS to authorize BullPhish to send as their domain, purchased a lookalike domain (e.g., clientdomain-hr.com) through BullPhish, authenticated it, and ran the campaign from that domain instead. It successfully bypassed the spam filters.',
    lessonsLearned: 'Spoofing internal domains for simulations is technically complex and risky for mail flow. Lookalike domains achieve the same training goal with zero impact on production DNS.',
    fasterNextTime: 'Always default to using lookalike domains for custom campaigns unless the client specifically mandates testing their internal spoofing defenses.'
  }
];
