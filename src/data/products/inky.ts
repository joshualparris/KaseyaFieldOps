import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'inky',
  name: 'INKY',
  description: 'Advanced email security and phishing prevention.',
  iconName: 'MailWarning',
  color: 'bg-purple-600',
  order: 10,
};

export const scenarios: Scenario[] = [
  {
    id: 'inky-suspicious-email',
    moduleId: 'inky',
    title: 'Suspicious Email Banner',
    description: 'An executive reports a yellow INKY banner on an email from a vendor.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The CFO forwards an email with a yellow INKY banner saying "First Time Sender". The sender claims to be a known vendor updating their payment details. What do you do?',
        options: [
          {
            id: 'opt-1-1',
            text: 'Whitelist the sender address in INKY to remove the banner.',
            isCorrect: false,
            feedback: 'Never blindly whitelist a first-time sender asking for payment detail changes. This is a classic BEC (Business Email Compromise) indicator.',
            nextStepId: 'step-1',
          },
          {
            id: 'opt-1-2',
            text: 'Analyze the email details in the INKY dashboard to check the sender\'s actual domain, SPF/DKIM/DMARC status.',
            isCorrect: true,
            feedback: 'Correct. You must investigate the technical headers and authentication status first.',
            nextStepId: 'step-2',
          }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'In the INKY dashboard, you see the domain is a lookalike (e.g., vend0r.com instead of vendor.com). What is your next action?',
        options: [
          {
            id: 'opt-2-1',
            text: 'Reply to the sender telling them they are blocked.',
            isCorrect: false,
            feedback: 'Do not engage with threat actors.',
            nextStepId: 'step-2',
          },
          {
            id: 'opt-2-2',
            text: 'Classify the message as Malicious/Phishing in INKY, which moves it to quarantine, and notify the CFO to disregard.',
            isCorrect: true,
            feedback: 'Exactly. Protect the user, classify correctly to train the model, and communicate clearly.',
          }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  {
    id: 'fc-inky-1',
    moduleId: 'inky',
    question: 'What does a Yellow INKY banner indicate?',
    answer: 'Caution. It highlights something unusual, like a first-time sender or external sender, but not necessarily malicious.',
  },
  {
    id: 'fc-inky-2',
    moduleId: 'inky',
    question: 'What does a Red INKY banner indicate?',
    answer: 'Danger. The email is highly likely to be malicious, phishing, or a scam. Links and attachments are often disabled.',
  }
];
