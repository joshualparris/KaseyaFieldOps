import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

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
