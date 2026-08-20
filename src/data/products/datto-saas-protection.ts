import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'datto-saas-protection',
  name: 'Datto SaaS Protection',
  description: 'Backup for Microsoft 365 and Google Workspace.',
  iconName: 'DatabaseBackup',
  color: 'bg-sky-500',
  order: 6,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];


export const ticketCases: RealTicketCase[] = [
  {
    id: 'saas-ticket-1',
    date: '2023-11-15T14:30:00Z',
    moduleId: 'datto-saas-protection',
    symptoms: 'Client submitted a ticket stating a terminated employee\'s mailbox is missing from their M365 environment and needs to retrieve a contract from 3 years ago.',
    initialThought: 'The client probably hard-deleted the user in M365 without converting to a shared mailbox first.',
    investigation: 'Checked Datto SaaS Protection dashboard for the tenant. Found the user under the "Unprotected" or archived list. The Infinite Cloud Retention (ICR) policy means the data was still there even though the user was purged from Microsoft.',
    resolution: 'Used Point-in-Time Restore in Datto SaaS to perform an export of the user\'s entire mailbox to a PST file. Provided the PST securely to the client\'s HR department.',
    lessonsLearned: 'Always verify if ICR is enabled for a tenant. Datto SaaS protects against administrative mistakes like deleting a user without archiving them natively.',
    fasterNextTime: 'Instead of searching M365 audit logs for the deletion event first, immediately check the SaaS Protection archives to see if the data is safely retained.'
  },
  {
    id: 'saas-ticket-2',
    date: '2024-02-10T09:15:00Z',
    moduleId: 'datto-saas-protection',
    symptoms: 'Alert: "SaaS Protection Backup Failed - Seat Limit Reached" for a newly onboarded VIP user.',
    initialThought: 'The client\'s license count wasn\'t incremented when the new user was created in M365.',
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
    investigation: 'Immediately disabled the user\'s sign-in and revoked M365 sessions to stop the spread. Verified the endpoint was infected. Checked SaaS Protection and found the latest backup from 2 hours ago contained the unencrypted files.',
    resolution: 'Wiped and isolated the infected endpoint. Used the Point-in-Time Restore feature in SaaS Protection to perform a destructive restore of the user\'s OneDrive, rolling it back to the snapshot from before the infection.',
    lessonsLearned: 'Destructive restores are powerful for ransomware recovery because they overwrite the encrypted files with clean versions automatically, saving hours of manual cleanup.',
    fasterNextTime: 'Don\'t waste time trying to clean the infected endpoint; isolate it immediately, verify the backup health, and proceed with a full point-in-time restore.'
  }
];
