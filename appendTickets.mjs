import fs from 'fs';
import path from 'path';

const files = [
  'datto-saas-protection.ts',
  'inky.ts',
  'darkweb-id.ts',
  'bullphish-id.ts'
];

const appendContents = {
  'datto-saas-protection.ts': `
export const ticketCases: RealTicketCase[] = [
  {
    id: 'saas-ticket-1',
    date: '2023-11-15T14:30:00Z',
    moduleId: 'datto-saas-protection',
    symptoms: 'Client submitted a ticket stating a terminated employee\\'s mailbox is missing from their M365 environment and needs to retrieve a contract from 3 years ago.',
    initialThought: 'The client probably hard-deleted the user in M365 without converting to a shared mailbox first.',
    investigation: 'Checked Datto SaaS Protection dashboard for the tenant. Found the user under the "Unprotected" or archived list. The Infinite Cloud Retention (ICR) policy means the data was still there even though the user was purged from Microsoft.',
    resolution: 'Used Point-in-Time Restore in Datto SaaS to perform an export of the user\\'s entire mailbox to a PST file. Provided the PST securely to the client\\'s HR department.',
    lessonsLearned: 'Always verify if ICR is enabled for a tenant. Datto SaaS protects against administrative mistakes like deleting a user without archiving them natively.',
    fasterNextTime: 'Instead of searching M365 audit logs for the deletion event first, immediately check the SaaS Protection archives to see if the data is safely retained.'
  },
  {
    id: 'saas-ticket-2',
    date: '2024-02-10T09:15:00Z',
    moduleId: 'datto-saas-protection',
    symptoms: 'Alert: "SaaS Protection Backup Failed - Seat Limit Reached" for a newly onboarded VIP user.',
    initialThought: 'The client\\'s license count wasn\\'t incremented when the new user was created in M365.',
    investigation: 'Logged into the partner portal and verified the seat cap for the tenant was set to 50. Checked the M365 tenant, and they had exactly 51 active licensed users. The auto-add feature attempted to protect the new user but was blocked by the hard cap.',
    resolution: 'Accessed the Datto Partner Portal, increased the SaaS Protection seat cap for the client from 50 to 55, and forced a manual sync. The new VIP user successfully backed up.',
    lessonsLearned: 'Hard caps prevent unexpected billing overages but require manual intervention during onboarding. Align onboarding checklists to include bumping the backup seat cap.',
    fasterNextTime: 'Include "Check/Increase Datto SaaS Seat Cap" in the standard new-user onboarding SOP to prevent the alert from firing in the first place.'
  },
  {
    id: 'saas-ticket-3',
    date: '2024-05-22T11:45:00Z',
    moduleId: 'datto-saas-protection',
    symptoms: 'User reports all files in their OneDrive are appended with .locked and they cannot open anything.',
    initialThought: 'Classic ransomware infection encrypting synced local files and propagating the changes to the cloud OneDrive.',
    investigation: 'Immediately disabled the user\\'s sign-in and revoked M365 sessions to stop the spread. Verified the endpoint was infected. Checked SaaS Protection and found the latest backup from 2 hours ago contained the unencrypted files.',
    resolution: 'Wiped and isolated the infected endpoint. Used the Point-in-Time Restore feature in SaaS Protection to perform a destructive restore of the user\\'s OneDrive, rolling it back to the snapshot from before the infection.',
    lessonsLearned: 'Destructive restores are powerful for ransomware recovery because they overwrite the encrypted files with clean versions automatically, saving hours of manual cleanup.',
    fasterNextTime: 'Don\\'t waste time trying to clean the infected endpoint; isolate it immediately, verify the backup health, and proceed with a full point-in-time restore.'
  }
];
`,
  'inky.ts': `
export const ticketCases: RealTicketCase[] = [
  {
    id: 'inky-ticket-1',
    date: '2023-10-05T08:20:00Z',
    moduleId: 'inky',
    symptoms: 'User reports a yellow INKY banner on an email from a regular vendor asking to update wire transfer details.',
    initialThought: 'Probably a false positive or the vendor is using a new invoicing system.',
    investigation: 'Checked the INKY dashboard for the specific message ID. INKY flagged it as "First Time Sender" and noted a lookalike domain (e.g., vendor-billing.com instead of vendor.com). The email was a Business Email Compromise (BEC) attempt impersonating the vendor.',
    resolution: 'Classified the email as Malicious in INKY, which automatically moved it to quarantine. Advised the user to contact the vendor via a known good phone number to verify. Added the lookalike domain to the blocklist.',
    lessonsLearned: 'Never ignore yellow banners on financial requests. INKY\\'s stylometry and domain analysis often catch BEC attempts that standard SPF/DKIM checks pass because the attacker registered a new, valid domain.',
    fasterNextTime: 'Train users to immediately escalate any email requesting payment changes, regardless of banner color, and use INKY\\'s domain analysis tool first.'
  },
  {
    id: 'inky-ticket-2',
    date: '2024-01-12T13:10:00Z',
    moduleId: 'inky',
    symptoms: 'Alert: Outbound email blocked by INKY due to malicious content originating from an internal user.',
    initialThought: 'An internal user\\'s account has been compromised and is being used to send spam/phishing.',
    investigation: 'Reviewed the blocked outbound message in INKY. It contained a generic "Please view secure document" phishing link. The user had successfully logged in from an anomalous IP in a foreign country (M365 logs confirmed).',
    resolution: 'Immediately disabled the user\\'s AD/M365 account, revoked sessions, and reset the password. Checked for inbox rules (found a rule forwarding emails to an external address and deleted it). INKY prevented the company from being blacklisted by blocking the outbound spam.',
    lessonsLearned: 'Internal/Outbound scanning in INKY is just as critical as inbound. It acts as an early warning system for compromised accounts.',
    fasterNextTime: 'Create an automated runbook in the PSA/RMM to instantly lock an M365 account when an INKY outbound malicious alert is generated.'
  },
  {
    id: 'inky-ticket-3',
    date: '2024-06-18T16:00:00Z',
    moduleId: 'inky',
    symptoms: 'Client complains that INKY is adding banners to their automated internal ticketing system emails, making them hard to read.',
    initialThought: 'The internal ticketing system is sending unauthenticated mail or spoofing the internal domain.',
    investigation: 'Checked INKY logs. The ticketing system was sending emails from "support@clientdomain.com" but originating from a third-party IP address that was not listed in the client\\'s SPF record.',
    resolution: 'Instead of whitelisting the ticketing system in INKY, updated the client\\'s SPF and DKIM records to properly authenticate the third-party sender. Once authenticated, INKY stopped flagging the emails as spoofed.',
    lessonsLearned: 'Fix the root cause (DNS authentication) rather than creating bypass rules in the security tool.',
    fasterNextTime: 'Before deploying INKY in Active Mode, leave it in Passive Mode for 2 weeks to identify and fix all third-party services sending on behalf of the client.'
  }
];
`,
  'darkweb-id.ts': `
export const ticketCases: RealTicketCase[] = [
  {
    id: 'dwid-ticket-1',
    date: '2023-09-12T07:45:00Z',
    moduleId: 'darkweb-id',
    symptoms: 'High severity alert from Dark Web ID: Compromised credential found for the CEO in a recent botnet log dump.',
    initialThought: 'The CEO\\'s laptop might be infected with malware (keylogger or stealer).',
    investigation: 'Reviewed the alert in Dark Web ID. The source was listed as "Botnet/Malware". The exposed data included not just the email and password, but system information indicating it was harvested directly from a device. Correlated the timestamp with endpoint logs and found the CEO had installed a dubious browser extension on their home PC.',
    resolution: 'Forced a password reset for the CEO across all corporate accounts. Enforced MFA session revocation. Advised the CEO to stop using the compromised home PC for work until it was formatted.',
    lessonsLearned: 'Botnet source alerts are significantly higher risk than third-party database dumps because they indicate active malware stealing current, live credentials directly from the user\\'s keystrokes.',
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
    symptoms: 'Dark Web ID alerts that a client\\'s public static IP address was posted on a hacker forum discussing RDP brute-forcing.',
    initialThought: 'The client\\'s firewall might have port 3389 open to the internet.',
    investigation: 'Checked the client\\'s firewall configuration remotely. Discovered a misconfigured NAT rule that was forwarding RDP traffic directly to an internal server. Reviewed the server\\'s event logs and saw thousands of failed login attempts.',
    resolution: 'Immediately disabled the NAT rule, closing port 3389. Implemented a VPN requirement for remote access. Verified no successful logins occurred during the brute-force window.',
    lessonsLearned: 'Dark Web ID monitors infrastructure (IPs), not just identities. This provides threat intelligence on active targeting.',
    fasterNextTime: 'Automate external port scans for all client IPs to detect open RDP before it ends up on a targeting list.'
  }
];
`,
  'bullphish-id.ts': `
export const ticketCases: RealTicketCase[] = [
  {
    id: 'bpid-ticket-1',
    date: '2023-08-10T11:00:00Z',
    moduleId: 'bullphish-id',
    symptoms: 'Client complains that 100% of their users clicked the phishing link in the latest BullPhish ID campaign.',
    initialThought: 'The email security gateway scanned the links and triggered false positives.',
    investigation: 'Checked the campaign logs. All "clicks" occurred within 3 minutes of the emails being sent, and the source IP addresses of the clicks belonged to Microsoft (M365 Defender). The client\\'s IT contact had accidentally removed the BullPhish IP addresses from their Advanced Delivery bypass policy.',
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
    initialThought: 'The emails are failing SPF/DKIM checks because they are spoofing the client\\'s internal domain without proper DNS authorization.',
    investigation: 'The tech used the client\\'s exact domain (hr@clientdomain.com) in the BullPhish sender profile. The client\\'s DMARC policy is set to "reject", so the receiving server rejected the unauthenticated emails.',
    resolution: 'Instead of modifying the client\\'s complex DNS to authorize BullPhish to send as their domain, purchased a lookalike domain (e.g., clientdomain-hr.com) through BullPhish, authenticated it, and ran the campaign from that domain instead. It successfully bypassed the spam filters.',
    lessonsLearned: 'Spoofing internal domains for simulations is technically complex and risky for mail flow. Lookalike domains achieve the same training goal with zero impact on production DNS.',
    fasterNextTime: 'Always default to using lookalike domains for custom campaigns unless the client specifically mandates testing their internal spoofing defenses.'
  }
];
`
};

for (const file of files) {
  const filePath = path.join('src', 'data', 'products', file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  let newContent = content;
  if (!newContent.includes('RealTicketCase')) {
    newContent = newContent.replace(
      "import type { AppModule, Scenario, Flashcard } from '../types';",
      "import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';"
    );
  }
  
  newContent += '\n' + appendContents[file];
  fs.writeFileSync(filePath, newContent);
  console.log('Updated ' + file);
}
