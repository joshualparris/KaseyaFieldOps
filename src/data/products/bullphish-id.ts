import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'bullphish-id',
  name: 'BullPhish ID',
  description: 'Security awareness training and phishing simulation.',
  iconName: 'FishSymbol',
  color: 'bg-orange-500',
  order: 8,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];


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
