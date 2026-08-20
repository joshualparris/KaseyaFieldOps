import type { AppModule, Scenario, Flashcard } from '../types';

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
    id: 'saas-missing-user',
    moduleId: 'datto-saas-protection',
    title: 'Missing User in Backup',
    description: 'A newly onboarded employee is not showing up in the Datto SaaS Protection backups for M365.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A client submits a ticket that their new hire, Bob, is not being backed up in Datto SaaS Protection. You log into the dashboard. What is the first thing you should check?',
        options: [
          { id: 'opt-1-1', text: 'Check if Bob has a valid Microsoft 365 license assigned.', isCorrect: true, feedback: 'Correct. Datto SaaS Protection typically auto-discovers users based on them having a valid M365 license (like Business Basic or higher).', nextStepId: 'step-2' },
          { id: 'opt-1-2', text: 'Manually run a backup for the entire tenant.', isCorrect: false, feedback: 'Running a backup won\'t help if the user hasn\'t been discovered or licensed yet.', nextStepId: 'step-1' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You confirm Bob has an M365 Business Standard license. Why might he still not be in SaaS Protection?',
        options: [
          { id: 'opt-2-1', text: 'The auto-add functionality is disabled in the SaaS Protection settings.', isCorrect: true, feedback: 'Yes. If "Auto Add New Users" is turned off, you must manually select and add new users to the backup task.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You enable Auto-Add for the tenant. What happens next?',
        options: [
          { id: 'opt-3-1', text: 'Bob will be picked up during the next automatic sync (usually within 24 hours), or you can force a sync now.', isCorrect: true, feedback: 'Correct. You can wait for the sync or force one from the dashboard to add him immediately.' }
        ]
      }
    }
  },
  {
    id: 'saas-restore-email',
    moduleId: 'datto-saas-protection',
    title: 'Restoring a Deleted Email',
    description: 'A user accidentally permanently deleted a critical email folder.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A user calls in a panic because they Shift+Deleted their "Contracts 2025" folder in Outlook. You go to Datto SaaS Protection. How do you find the data?',
        options: [
          { id: 'opt-1-1', text: 'Navigate to the user\'s Exchange backup, select a snapshot from before the deletion, and browse/search for the folder.', isCorrect: true, feedback: 'Correct. You must select a point-in-time snapshot before the data was deleted to restore it.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You locate the "Contracts 2025" folder in yesterday\'s snapshot. What restore option should you choose?',
        options: [
          { id: 'opt-2-1', text: 'Restore directly to the user\'s mailbox.', isCorrect: true, feedback: 'Yes, doing a direct restore is usually the most seamless for the user.', nextStepId: 'step-3' },
          { id: 'opt-2-2', text: 'Export to PST.', isCorrect: false, feedback: 'While possible, exporting to PST and requiring the user to import it is a poor experience compared to a direct restore.', nextStepId: 'step-2' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'When you choose to restore directly, where does the data go by default?',
        options: [
          { id: 'opt-3-1', text: 'It restores to a new folder named "Datto Restore - [Date/Time]" in the user\'s mailbox.', isCorrect: true, feedback: 'Correct. It does not overwrite existing data; it places the restored items in a clearly marked folder.' }
        ]
      }
    }
  },
  {
    id: 'saas-sharepoint-site',
    moduleId: 'datto-saas-protection',
    title: 'SharePoint Site Backup',
    description: 'A newly created SharePoint site is missing from the backup.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The client created a new "Marketing 2026" SharePoint site yesterday, but it is not listed in SaaS Protection. What is the cause?',
        options: [
          { id: 'opt-1-1', text: 'SharePoint sites, unlike users, are not always auto-added depending on settings. You need to check the Site discovery and auto-add settings.', isCorrect: true, feedback: 'Correct. SharePoint discovery can be handled differently than user discovery.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You see the site in the "Unprotected Sites" list. How do you protect it?',
        options: [
          { id: 'opt-2-1', text: 'Select the site and click "Protect" to assign a license and begin backing it up.', isCorrect: true, feedback: 'Yes, manually assigning protection moves it to the active backup queue.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Once protected, when will the first backup complete?',
        options: [
          { id: 'opt-3-1', text: 'An initial backup is scheduled immediately and may take some time depending on the site size.', isCorrect: true, feedback: 'Correct. The initial ingestion takes longer, subsequent backups are incremental.' }
        ]
      }
    }
  },
  {
    id: 'saas-seat-limit',
    moduleId: 'datto-saas-protection',
    title: 'Seat Limit Reached',
    description: 'Backups are failing for new users due to a licensing cap.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You get an alert that SaaS Protection failed to add 3 new users. The error says "Seat limit reached". What does this mean?',
        options: [
          { id: 'opt-1-1', text: 'The MSP\'s committed seat count or a hard cap set for the tenant has been exceeded.', isCorrect: true, feedback: 'Correct. Many environments use hard caps to prevent unexpected billing overages.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'How do you resolve this?',
        options: [
          { id: 'opt-2-1', text: 'Increase the seat cap in the Datto Partner Portal for this tenant.', isCorrect: true, feedback: 'Yes, you need to authorize billing for more seats to allow the users to be protected.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Alternatively, how could you free up seats without increasing the cap?',
        options: [
          { id: 'opt-3-1', text: 'Unprotect archived or departed users (keeping in mind retention policies) to free up their licenses.', isCorrect: true, feedback: 'Correct. Unprotecting stops future backups and frees the seat, though the historical data retention depends on the product (e.g., Infinite Cloud Retention).' }
        ]
      }
    }
  },
  {
    id: 'saas-onedrive-ransomware',
    moduleId: 'datto-saas-protection',
    title: 'OneDrive Ransomware Recovery',
    description: 'A user\'s OneDrive was hit by ransomware and all files are encrypted.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'A user clicked a bad link and their entire OneDrive is filled with .locked files. You need to restore it. What is the best approach?',
        options: [
          { id: 'opt-1-1', text: 'Use the Point-in-Time restore feature in Datto SaaS Protection for their OneDrive.', isCorrect: true, feedback: 'Correct. This is exactly what Point-in-Time restore is for—rolling back mass changes.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You select a snapshot from the day before the infection. Do you do a destructive or non-destructive restore?',
        options: [
          { id: 'opt-2-1', text: 'Generally, a destructive restore (overwriting existing data) is preferred here to wipe out the encrypted files, but verify with the client first.', isCorrect: true, feedback: 'Correct. Overwriting removes the bad files, but you must ensure you have the right point in time.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'Before doing a destructive restore, what must you confirm?',
        options: [
          { id: 'opt-3-1', text: 'Confirm the user\'s endpoint is completely cleaned of the ransomware, otherwise it will just encrypt the restored files again.', isCorrect: true, feedback: 'Crucial step. Never restore data to an infected environment.' }
        ]
      }
    }
  },
  {
    id: 'saas-export-offboarding',
    moduleId: 'datto-saas-protection',
    title: 'Exporting Data for Offboarding',
    description: 'A client requests an export of a departed executive\'s emails.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'The CEO of a client resigned. The client requests a full copy of their mailbox provided on a secure drive. How do you extract this from SaaS Protection?',
        options: [
          { id: 'opt-1-1', text: 'Navigate to the user\'s Exchange backup, select the latest snapshot, and choose the Export option.', isCorrect: true, feedback: 'Correct. Exporting is the right function for taking data out of the system.', nextStepId: 'step-2' }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'What format will the Exchange export be in?',
        options: [
          { id: 'opt-2-1', text: 'It will export as a PST file.', isCorrect: true, feedback: 'Yes, PST is the standard format for Exchange/Outlook data exports.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'The export is large (50GB). How do you retrieve it once initiated?',
        options: [
          { id: 'opt-3-1', text: 'SaaS Protection processes the export in the background. You download it from the Exports tab once it is ready.', isCorrect: true, feedback: 'Correct. You don\'t have to keep the browser open. It processes asynchronously.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-saas-1', moduleId: 'datto-saas-protection', question: 'How often does Datto SaaS Protection back up M365/Google Workspace by default?', answer: 'Three times a day automatically.' },
  { id: 'fc-saas-2', moduleId: 'datto-saas-protection', question: 'What is the default retention period for Datto SaaS Protection?', answer: 'Typically Infinite Cloud Retention (ICR), meaning data is kept forever as long as the service is active, but 1-year options exist.' },
  { id: 'fc-saas-3', moduleId: 'datto-saas-protection', question: 'Does pausing a user\'s backup delete their historical data?', answer: 'No, pausing (or unprotecting) stops new backups and frees a license seat, but historical data remains per the retention policy.' },
  { id: 'fc-saas-4', moduleId: 'datto-saas-protection', question: 'What format are OneDrive/Google Drive files exported in?', answer: 'A standard ZIP file containing the original file formats.' },
  { id: 'fc-saas-5', moduleId: 'datto-saas-protection', question: 'What does a "Partial" backup status mean?', answer: 'The backup ran, but some items failed to back up (e.g., due to API throttling from Microsoft/Google or a corrupt item).' },
  { id: 'fc-saas-6', moduleId: 'datto-saas-protection', question: 'Where do direct restores of emails go by default in M365?', answer: 'To a newly created folder named "Datto Restore" with the date and time, to prevent overwriting existing data.' },
  { id: 'fc-saas-7', moduleId: 'datto-saas-protection', question: 'Can Datto SaaS Protection back up Microsoft Teams chats?', answer: 'Yes, it backs up Teams channels, files, and conversations, though API limitations sometimes affect private 1:1 chats depending on configuration.' },
  { id: 'fc-saas-8', moduleId: 'datto-saas-protection', question: 'What happens if you turn on "Auto-Add New Users"?', answer: 'SaaS Protection will automatically detect new users with valid licenses in the tenant and begin backing them up without manual intervention.' },
  { id: 'fc-saas-9', moduleId: 'datto-saas-protection', question: 'Is Datto SaaS Protection subject to Microsoft/Google API throttling?', answer: 'Yes. If a tenant is heavily utilized, Microsoft/Google may throttle the API, causing backups to take longer or fail temporarily.' },
  { id: 'fc-saas-10', moduleId: 'datto-saas-protection', question: 'How do you restore a deleted SharePoint document library?', answer: 'Go to the SharePoint section, select the site, pick a snapshot prior to deletion, and select the library to restore.' },
  { id: 'fc-saas-11', moduleId: 'datto-saas-protection', question: 'Can you restore a Google Workspace email to a different user\'s account?', answer: 'Yes, cross-user restores are supported in both Google Workspace and M365.' },
  { id: 'fc-saas-12', moduleId: 'datto-saas-protection', question: 'What is a "destructive restore"?', answer: 'A restore that overwrites the existing data in the destination with the data from the backup.' },
  { id: 'fc-saas-13', moduleId: 'datto-saas-protection', question: 'If a user is hard-deleted in M365, what happens to their SaaS Protection backup?', answer: 'The backups are retained indefinitely (if on ICR) even if the user is deleted in M365.' },
  { id: 'fc-saas-14', moduleId: 'datto-saas-protection', question: 'What permission level is required to authorize SaaS Protection for an M365 tenant?', answer: 'Global Administrator.' },
  { id: 'fc-saas-15', moduleId: 'datto-saas-protection', question: 'How are exports downloaded?', answer: 'Via the web browser from the Exports tab once the background generation is complete.' },
  { id: 'fc-saas-16', moduleId: 'datto-saas-protection', question: 'What is Point-in-Time Restore?', answer: 'A feature that allows you to roll back an entire mailbox or drive to its exact state at a specific past backup, useful for ransomware.' },
  { id: 'fc-saas-17', moduleId: 'datto-saas-protection', question: 'Can you search for specific emails inside a backup without restoring?', answer: 'Yes, you can use the search bar to find emails by subject, sender, or date within a snapshot.' }
];
