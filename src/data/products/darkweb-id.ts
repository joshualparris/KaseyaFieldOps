import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'darkweb-id',
  name: 'DarkWeb ID',
  description: 'Compromised credential monitoring.',
  iconName: 'VenetianMask',
  color: 'bg-slate-800',
  order: 7,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];


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
