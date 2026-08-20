import type { AppModule, Scenario, Flashcard, RealTicketCase } from '../types';

export const module: AppModule = {
  id: 'datto-saas-protection',
  name: 'Datto SaaS Protection',
  description: 'Cloud-to-cloud backup for Microsoft 365 and Google Workspace.',
  iconName: 'CloudRain',
  color: 'bg-cyan-600',
  order: 2,
  problemSolved: 'Microsoft and Google do not back up your cloud data natively. They ensure uptime, but if a user deletes a file or gets ransomware, the data is gone. SaaS Protection provides an independent backup of that data.',
  mentalModel: 'It is a safety net for cloud emails and files. It connects directly to Microsoft/Google APIs and copies the data to Datto\'s cloud three times a day.',
  keyTerminology: [
    { term: 'Point-in-Time Restore', definition: 'Rolling back a mailbox or OneDrive to exactly how it looked at a specific time in the past.' },
    { term: 'Destructive Restore', definition: 'Overwriting the current live data with the backup data (useful for wiping out ransomware).' },
    { term: 'ICR (Infinite Cloud Retention)', definition: 'Keeping backups forever as long as the subscription is active, even if the user is deleted.' }
  ],
  actualUseCases: [
    'Restoring an email a user accidentally permanently deleted',
    'Rolling back a OneDrive that was encrypted by ransomware',
    'Exporting a departed executive\'s mailbox to a PST file for legal retention',
    'Restoring a deleted SharePoint document library'
  ],
  commonWorkflows: [
    'Connecting a new M365 tenant and enabling Auto-Add',
    'Performing a direct-to-mailbox restore of a lost folder',
    'Managing seat caps and unprotecting archived users to free up licenses'
  ],
  whenNotToUse: [
    'Do not use this to back up local files on a laptop (use File Protection).',
    'Do not use this to back up an Azure VM or on-prem server (use BCDR/Azure Backup).',
    'Do not use this to block phishing emails (use INKY).'
  ],
  relatedProducts: ['Datto Backup', 'Datto File Protection', 'INKY'],
  commonConfusions: [
    'Confused with INKY: SaaS Protection backs up emails, INKY blocks bad emails.',
    'Confused with Datto Backup (BCDR): SaaS Protection is for M365 cloud data, BCDR is for whole servers.',
    'Confused with Datto File Protection: SaaS Protection backs up OneDrive/SharePoint, File Protection backs up the local C: drive.'
  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'saas-backupify-migration',
    moduleId: 'datto-saas-protection',
    title: 'Migrating a client from Backupify to Datto SaaS Protection',
    description: 'Understanding the transition from the legacy Backupify brand to Datto SaaS Protection.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A long-time client asks about their "Backupify" service. What should you tell them?',
        options: [
          { id: 'opt-1-1', text: 'Backupify was acquired and rebranded as Datto SaaS Protection. It provides the same core M365 and Google Workspace backups but with an improved platform.', isCorrect: true, feedback: 'Correct. Datto SaaS Protection is the modern evolution of Backupify.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Does migrating from the old Backupify platform to the new Datto SaaS Protection require exporting and re-importing all historical data?',
        options: [
          { id: 'opt-2-1', text: 'Typically, Datto handles the backend migration of data seamlessly for existing partners, retaining historical backups.', isCorrect: true, feedback: 'Correct. The transition is designed to be seamless for the data retention.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'What is a primary benefit of the modern SaaS Protection platform over legacy Backupify?',
        options: [
          { id: 'opt-3-1', text: 'Tighter integration with Kaseya IT Complete, better partner portal management, and streamlined billing.', isCorrect: true, feedback: 'Correct. It integrates directly into the MSP\'s workflow.' }
        ]
      }
    }
  },
  {
    id: 'saas-restore-vs-full',
    moduleId: 'datto-saas-protection',
    title: 'Recovering a single deleted mailbox item vs a full mailbox restore',
    description: 'Choosing the right restore method for different data loss scenarios.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A user accidentally deleted a single critical email from yesterday. How do you recover it?',
        options: [
          { id: 'opt-1-1', text: 'Use the search function within the user\'s backup snapshot, locate the specific email, and perform a granular item-level restore.', isCorrect: true, feedback: 'Correct. You don\'t need to restore the whole mailbox for one email.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'Later, another user falls victim to a malicious script that encrypts or deletes their entire inbox. What is the appropriate action?',
        options: [
          { id: 'opt-2-1', text: 'Perform a full Point-in-Time Restore of the entire mailbox, rolling it back to the snapshot taken before the attack.', isCorrect: true, feedback: 'Correct. Point-in-Time restore is designed for mass recovery.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'When you perform a direct item-level restore of an email, where does it go?',
        options: [
          { id: 'opt-3-1', text: 'It creates a new folder in their mailbox called "Datto Restore" containing the item, preventing overwrites.', isCorrect: true, feedback: 'Correct. This makes it easy for the user to find the recovered item safely.' }
        ]
      }
    }
  },
  {
    id: 'saas-google-vs-m365',
    moduleId: 'datto-saas-protection',
    title: 'Google Workspace vs M365 configuration differences',
    description: 'Understanding the scope of backups across different cloud platforms.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You are setting up SaaS Protection for a Google Workspace client. What core components are backed up?',
        options: [
          { id: 'opt-1-1', text: 'Gmail, Google Drive, Calendar, Contacts, and Shared Drives.', isCorrect: true, feedback: 'Correct. These are the core Google Workspace services covered.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How does this compare to a Microsoft 365 backup?',
        options: [
          { id: 'opt-2-1', text: 'M365 backups cover Exchange, OneDrive, SharePoint, and Teams.', isCorrect: true, feedback: 'Correct. SaaS Protection handles the distinct architecture of both platforms natively.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Can you restore a Google Workspace email directly into a Microsoft 365 mailbox using SaaS Protection?',
        options: [
          { id: 'opt-3-1', text: 'No. While you can export data, you cannot perform direct cross-platform restores (e.g., Google to M365).', isCorrect: true, feedback: 'Correct. Direct restores must stay within the same platform ecosystem.' }
        ]
      }
    }
  },
  {
    id: 'saas-licensing-mismatch',
    moduleId: 'datto-saas-protection',
    title: 'Licensing/seat count mismatch after new hires',
    description: 'Resolving backup failures caused by exceeding the seat limit.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client hired 5 new people. The Auto-Add feature is on, but you get an alert that backups failed for the new users due to "Seat Limit Reached". Why?',
        options: [
          { id: 'opt-1-1', text: 'The MSP has a hard cap set for this tenant in the Datto Partner Portal to prevent unexpected billing, and it was exceeded.', isCorrect: true, feedback: 'Correct. Hard caps require manual intervention when growth occurs.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you fix this to get the new users backed up immediately?',
        options: [
          { id: 'opt-2-1', text: 'Log into the Datto Partner Portal and increase the SaaS Protection seat cap for this specific client.', isCorrect: true, feedback: 'Correct. Authorizing more seats allows the backups to proceed.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'If the client refuses to pay for more seats, what is an alternative way to free up licenses?',
        options: [
          { id: 'opt-3-1', text: 'Unprotect archived or terminated users. This stops new backups and frees the seat, while historical data retention depends on the ICR policy.', isCorrect: true, feedback: 'Correct. Managing licenses by unprotecting inactive users is a common cost-saving practice.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-saas-1', moduleId: 'datto-saas-protection', question: 'What legacy product name is Datto SaaS Protection formerly known as?', answer: 'Backupify.' },
  { id: 'fc-saas-2', moduleId: 'datto-saas-protection', question: 'Which Kaseya 365 pillar does Datto SaaS Protection belong to?', answer: 'Recover.' },
  { id: 'fc-saas-3', moduleId: 'datto-saas-protection', question: 'What is the difference between Datto SaaS Protection and Datto Backup for Microsoft Entra ID?', answer: 'SaaS Protection backs up user data (emails, files in Exchange/OneDrive). Datto Backup for Entra ID backs up the tenant\'s configuration, policies, and directory structure.' },
  { id: 'fc-saas-4', moduleId: 'datto-saas-protection', question: 'How often does Datto SaaS Protection perform automated backups?', answer: 'Three times a day.' },
  { id: 'fc-saas-5', moduleId: 'datto-saas-protection', question: 'What is ICR (Infinite Cloud Retention)?', answer: 'A retention policy where backups are kept forever as long as the subscription is active, even if the user is deleted from M365.' },
  { id: 'fc-saas-6', moduleId: 'datto-saas-protection', question: 'What is Point-in-Time Restore?', answer: 'The ability to roll back an entire mailbox, OneDrive, or SharePoint site to exactly how it looked at a specific time (vital for ransomware recovery).' },
  { id: 'fc-saas-7', moduleId: 'datto-saas-protection', question: 'Where do granular email restores go by default?', answer: 'To a newly created folder in the user\'s mailbox labeled "Datto Restore [Date/Time]".' },
  { id: 'fc-saas-8', moduleId: 'datto-saas-protection', question: 'Which two major cloud platforms does SaaS Protection support?', answer: 'Microsoft 365 and Google Workspace.' },
  { id: 'fc-saas-9', moduleId: 'datto-saas-protection', question: 'What does the "Auto-Add New Users" feature do?', answer: 'It automatically detects and begins backing up newly created, licensed users in the tenant without manual intervention.' },
  { id: 'fc-saas-10', moduleId: 'datto-saas-protection', question: 'How can you resolve a "Seat Limit Reached" error without buying more licenses?', answer: 'By unprotecting (pausing) backups for inactive, archived, or terminated users to free up their license seats.' }
];

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
