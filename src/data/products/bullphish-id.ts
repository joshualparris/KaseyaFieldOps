import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'bullphish-id',
  name: 'BullPhish ID',
  description: 'Security awareness training and phishing simulation.',
  iconName: 'Fish',
  color: 'bg-emerald-600',
  order: 5,
};

export const scenarios: Scenario[] = [
  {
    id: 'bpid-campaign-setup',
    moduleId: 'bullphish-id',
    title: 'Phishing Campaign Setup',
    description: 'Setting up a monthly phishing simulation for a client.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client requests a monthly phishing test. You need to create a campaign. What is the first thing you must ensure is configured on the client\'s network before sending test emails?',
        options: [
          { id: 'opt-1-1', text: 'Whitelist the BullPhish ID sending IP addresses and domains in the client\'s email filter (e.g., INKY, M365 Defender).', isCorrect: true, feedback: 'Crucial step. If you don\'t whitelist, the security tools will block the simulations, and the test is invalid.', nextStepId: 'step-2' },
          { id: 'opt-1-2', text: 'Tell the users the test is coming.', isCorrect: false, feedback: 'Announcing the test defeats the purpose of an unannounced simulation.', nextStepId: 'step-1' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Whitelisting is done. You are selecting a phishing template. What type of template should you choose for their first test?',
        options: [
          { id: 'opt-2-1', text: 'A highly sophisticated, targeted spear-phishing attack.', isCorrect: false, feedback: 'Start simple. Baseline their awareness before using advanced tactics.', nextStepId: 'step-2' },
          { id: 'opt-2-2', text: 'A generic, broad-based template like a "Password Expiry" or "Package Delivery" notice.', isCorrect: true, feedback: 'Correct. Establish a baseline with common phishing themes first.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'How should you schedule the delivery of the emails?',
        options: [
          { id: 'opt-3-1', text: 'Stagger the delivery randomly over a few days or weeks.', isCorrect: true, feedback: 'Yes. If they all arrive at 9:00 AM on Monday, one user will warn the whole office.' }
        ]
      }
    }
  },
  {
    id: 'bpid-campaign-results',
    moduleId: 'bullphish-id',
    title: 'Interpreting Campaign Results',
    description: 'Analyzing the report after a phishing campaign completes.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The campaign finished. The report shows a 20% "Clicked" rate and a 5% "Submitted Data" rate. What does "Submitted Data" mean?',
        options: [
          { id: 'opt-1-1', text: 'The user clicked the link in the email and then entered credentials into the fake landing page.', isCorrect: true, feedback: 'Correct. This is a severe failure, as it represents actual compromised credentials in a real attack.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'What should you do with the users who submitted data?',
        options: [
          { id: 'opt-2-1', text: 'Automatically enroll them in remedial security awareness training.', isCorrect: true, feedback: 'Yes. BullPhish allows for automatic training enrollment based on campaign failures.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The client is upset about the 20% click rate. How do you respond?',
        options: [
          { id: 'opt-3-1', text: 'Explain this is a baseline. The goal of ongoing training and testing is to drive this number down over time, proving ROI.', isCorrect: true, feedback: 'Correct. The initial high number proves the service is needed.' }
        ]
      }
    }
  },
  {
    id: 'bpid-training-rollout',
    moduleId: 'bullphish-id',
    title: 'Security Awareness Training Rollout',
    description: 'Deploying compliance training to an entire organization.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A healthcare client needs to roll out HIPAA compliance training to all 100 employees via BullPhish ID. How do you import the users?',
        options: [
          { id: 'opt-1-1', text: 'Sync them automatically using the Microsoft Entra ID (Azure AD) or Google Workspace integration.', isCorrect: true, feedback: 'Correct. Directory sync is the most efficient and accurate way to manage users.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You set up the training campaign. What is a key setting to ensure users actually complete the course?',
        options: [
          { id: 'opt-2-1', text: 'Enable automated reminder emails for users who have not completed the course before the deadline.', isCorrect: true, feedback: 'Yes. Users often forget; automated nagging is necessary for compliance.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'A user claims they completed the training, but the report shows them as "Incomplete." What is the likely cause?',
        options: [
          { id: 'opt-3-1', text: 'They watched the video but failed or did not take the quiz at the end.', isCorrect: true, feedback: 'Correct. Completion requires passing the quiz, not just playing the video.' }
        ]
      }
    }
  },
  {
    id: 'bpid-false-positives',
    moduleId: 'bullphish-id',
    title: 'Investigating False Positives',
    description: 'A campaign shows 100% click rate instantly.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You launch a campaign, and within 5 minutes, the dashboard shows every single user clicked the link. What happened?',
        options: [
          { id: 'opt-1-1', text: 'An email security gateway (like M365 Defender or INKY) scanned the emails and "clicked" the links automatically.', isCorrect: true, feedback: 'Correct. This is a classic symptom of missing or incorrect whitelisting.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you fix this for future campaigns?',
        options: [
          { id: 'opt-2-1', text: 'Review the whitelisting documentation and bypass link scanning for BullPhish IP addresses in the security gateway.', isCorrect: true, feedback: 'Yes, you must tell the security tools not to inspect these specific test emails.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What should you do about the ruined campaign data?',
        options: [
          { id: 'opt-3-1', text: 'Cancel/delete the campaign results, fix the whitelisting, and run a new campaign.', isCorrect: true, feedback: 'Correct. The data is hopelessly skewed; you must start over.' }
        ]
      }
    }
  },
  {
    id: 'bpid-custom-template',
    moduleId: 'bullphish-id',
    title: 'Creating a Custom Phishing Template',
    description: 'Building a relevant local lure for a specific client.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client wants a phishing test that looks like it comes from their local HR portal ("AcmeHR"). How do you do this in BullPhish?',
        options: [
          { id: 'opt-1-1', text: 'Use the Template Builder to create a custom email and landing page matching their HR portal.', isCorrect: true, feedback: 'Correct. Custom templates yield higher engagement and test specific localized risks.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You are designing the email. To make it convincing, you want to spoof the sender address to hr@acme.com. Is this possible?',
        options: [
          { id: 'opt-2-1', text: 'Yes, but it requires configuring custom SMTP sending profiles and updating the client\'s SPF/DKIM records to allow BullPhish to send on their behalf.', isCorrect: true, feedback: 'Yes. Spoofing internal domains requires DNS authentication to bypass spam filters.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'If you cannot modify their DNS, what is the alternative?',
        options: [
          { id: 'opt-3-1', text: 'Use a lookalike domain provided by BullPhish (e.g., hr-acme-portal.com).', isCorrect: true, feedback: 'Correct. Lookalike domains are easier to deploy and test users\' ability to spot subtle URL differences.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-bpid-1', moduleId: 'bullphish-id', question: 'What is the absolute most critical pre-requisite before running a phishing simulation?', answer: 'Whitelisting the BullPhish IP addresses and domains in the client\'s email security and spam filters.' },
  { id: 'fc-bpid-2', moduleId: 'bullphish-id', question: 'What does "Staggered Delivery" mean in a campaign?', answer: 'Sending the phishing emails randomly over a period of time (e.g., 5 days) so employees don\'t receive them simultaneously and warn each other.' },
  { id: 'fc-bpid-3', moduleId: 'bullphish-id', question: 'What is the difference between "Clicked" and "Submitted Data"?', answer: 'Clicked means they opened the bad link. Submitted Data means they fell for the fake landing page and entered credentials.' },
  { id: 'fc-bpid-4', moduleId: 'bullphish-id', question: 'How can you automate user management in BullPhish ID?', answer: 'Use Directory Sync integrations with Microsoft Entra ID (Azure AD) or Google Workspace.' },
  { id: 'fc-bpid-5', moduleId: 'bullphish-id', question: 'What happens if a security tool "clicks" all the links in a test campaign?', answer: 'It ruins the data, resulting in a false 100% click rate. You must fix whitelisting to bypass link scanning.' },
  { id: 'fc-bpid-6', moduleId: 'bullphish-id', question: 'What is "Catch and Release"?', answer: 'A feature where a user who clicks a phishing link is immediately redirected to a short training video explaining what they did wrong.' },
  { id: 'fc-bpid-7', moduleId: 'bullphish-id', question: 'Can you use your own domain for phishing simulations?', answer: 'Yes, using custom SMTP profiles, but it requires configuring SPF/DKIM records to authorize BullPhish to send as that domain.' },
  { id: 'fc-bpid-8', moduleId: 'bullphish-id', question: 'What is a "Lookalike Domain"?', answer: 'A domain that looks similar to a trusted domain (e.g., paypa1.com instead of paypal.com) used in phishing templates.' },
  { id: 'fc-bpid-9', moduleId: 'bullphish-id', question: 'How do users prove they completed a training course?', answer: 'They must watch the material and successfully pass the quiz at the end of the module.' },
  { id: 'fc-bpid-10', moduleId: 'bullphish-id', question: 'What is automated remedial training?', answer: 'A feature that automatically assigns a training course to a user who fails a phishing simulation (e.g., clicks a link).' },
  { id: 'fc-bpid-11', moduleId: 'bullphish-id', question: 'Why should you start with generic phishing templates for a new client?', answer: 'To establish a baseline of their security awareness before testing them with highly sophisticated spear-phishing.' },
  { id: 'fc-bpid-12', moduleId: 'bullphish-id', question: 'What is the purpose of Automated Reminders?', answer: 'To automatically email users who have not yet completed assigned training before the due date.' },
  { id: 'fc-bpid-13', moduleId: 'bullphish-id', question: 'Can BullPhish ID simulate internal HR emails?', answer: 'Yes, using custom templates and optionally spoofing the internal domain if DNS records are properly configured.' },
  { id: 'fc-bpid-14', moduleId: 'bullphish-id', question: 'What reporting metric is most critical for proving ROI to a client?', answer: 'The reduction in the "Click Rate" and "Submitted Data Rate" over time across multiple campaigns.' },
  { id: 'fc-bpid-15', moduleId: 'bullphish-id', question: 'If a user opens an email but does not click a link, is it a failure?', answer: 'Opening an email is tracked, but is generally not considered a failure unless they click a link or download an attachment.' }
];
