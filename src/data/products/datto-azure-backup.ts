
import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-azure-backup',
  name: 'Datto Backup for Azure & Entra ID',
  description: 'Cloud-native backup for Azure VMs and Microsoft Entra ID (Azure AD) tenant configuration. Managed via UniView.',
  iconName: 'Cloud',
  color: 'bg-cyan-600',
  order: 4
};

export const scenarios: Scenario[] = [
  {
    id: 'ab-ca-policy',
    moduleId: 'datto-azure-backup',
    title: 'Conditional Access policy accidentally deleted',
    description: 'An administrator accidentally deleted a critical Conditional Access policy, locking some users out.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client calls in a panic. Where do you go to restore the Entra ID configuration?',
        options: [
          { id: 'opt1', text: 'Log into the UniView portal to access Datto Backup for Microsoft Entra ID.', isCorrect: true, feedback: 'Correct. UniView is the portal for managing Entra ID backups.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Log into the Datto SaaS Protection portal.', isCorrect: false, feedback: 'Incorrect. SaaS Protection is for Microsoft 365 data (mailboxes, OneDrive), not Entra ID configuration.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'In UniView, you find the backup from yesterday. How do you find the deleted policy?',
        options: [
          { id: 'opt1', text: 'Use the audit/change-tracking view to see a diff of what was removed since yesterday, and select only that CA policy to restore.', isCorrect: true, feedback: 'Correct. You can perform granular restores of specific configuration items.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What happens when you restore the Conditional Access policy?',
        options: [
          { id: 'opt1', text: 'It is recreated in the tenant exactly as it was, and users can immediately authenticate correctly again.', isCorrect: true, feedback: 'Correct. The API pushes the configuration back to Entra ID.' }
        ]
      }
    }
  },
  {
    id: 'ab-tenant-disaster',
    moduleId: 'datto-azure-backup',
    title: 'Full tenant configuration disaster — where do you even start',
    description: 'A rogue script modified hundreds of groups, roles, and conditional access policies across the tenant.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The tenant is completely broken. Can you just click "Restore All" to yesterday?',
        options: [
          { id: 'opt1', text: 'Yes, you can initiate a full tenant configuration rollback from UniView, but it requires careful review of the changes.', isCorrect: true, feedback: 'Correct. A full restore is possible but must be treated as a major DR event.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'Before rolling back, what should you verify?',
        options: [
          { id: 'opt1', text: 'Check the change-tracking audit log to understand exactly what the script modified, so you don\'t overwrite legitimate changes made by other admins.', isCorrect: true, feedback: 'Correct. Always review the diff before a massive restore.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'After the restore completes, what is the best practice?',
        options: [
          { id: 'opt1', text: 'Verify the critical applications and authentication flows are working, and revoke the API credentials used by the rogue script.', isCorrect: true, feedback: 'Correct.' }
        ]
      }
    }
  },
  {
    id: 'ab-config-vs-data',
    moduleId: 'datto-azure-backup',
    title: 'Explaining config backup vs data backup to a client',
    description: 'A client wants to know why they are paying for both Entra ID Backup and SaaS Protection.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client says: "If Entra ID backup backs up my Microsoft cloud, why do I need SaaS protection for emails?"',
        options: [
          { id: 'opt1', text: 'Explain that Entra ID backup ONLY protects tenant configuration (users, groups, roles, policies), not the actual data (emails, files) inside those accounts.', isCorrect: true, feedback: 'Correct. They are two different products for two different layers.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Tell them Entra ID backup covers emails too, but SaaS protection is just for compliance archiving.', isCorrect: false, feedback: 'Incorrect. Entra ID backup does not back up mailbox data.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The client asks: "So if someone deletes my SharePoint site, Entra ID backup won\'t help?"',
        options: [
          { id: 'opt1', text: 'Exactly. That requires Datto SaaS Protection, which backs up the actual SharePoint files and lists.', isCorrect: true, feedback: 'Correct.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'How do you summarize the value of Entra ID backup then?',
        options: [
          { id: 'opt1', text: 'It prevents a malicious admin or bad script from locking everyone out of the company by wiping security policies and access rules.', isCorrect: true, feedback: 'Correct. It\'s for identity and access disaster recovery.' }
        ]
      }
    }
  },
  {
    id: 'ab-hybrid-sync',
    moduleId: 'datto-azure-backup',
    title: 'Hybrid environment sync conflict after restore',
    description: 'You restored an Entra ID group, but the on-prem AD Connect is now throwing sync errors.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You restored a deleted group in Entra ID. Why is the local AD Connect server complaining?',
        options: [
          { id: 'opt1', text: 'The group was originally synced from on-prem AD. Restoring it purely in the cloud creates a conflict because the source of truth (on-prem) still thinks it\'s deleted.', isCorrect: true, feedback: 'Correct. AD Connect expects on-prem to be the master for synced objects.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'How should you resolve this?',
        options: [
          { id: 'opt1', text: 'Restore the group in the on-prem Active Directory first, then let AD Connect sync it back up to Entra ID.', isCorrect: true, feedback: 'Correct. For hybrid objects, the on-prem AD is the authority.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What is Entra ID backup actually best used for in a hybrid environment?',
        options: [
          { id: 'opt1', text: 'Restoring Cloud-Only objects (like Conditional Access policies, cloud-only groups, and App Registrations) that don\'t exist on-prem.', isCorrect: true, feedback: 'Correct. Cloud-only config is where Entra ID backup shines in hybrid setups.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'ab-c1', moduleId: 'datto-azure-backup', question: 'What exactly does Datto Backup for Microsoft Entra ID protect?', answer: 'Tenant configuration (users, groups, roles, Conditional Access policies, App Registrations), not mailbox or file data.' },
  { id: 'ab-c2', moduleId: 'datto-azure-backup', question: 'What portal manages Datto Backup for Entra ID?', answer: 'The UniView portal.' },
  { id: 'ab-c3', moduleId: 'datto-azure-backup', question: 'How is this different from Datto SaaS Protection?', answer: 'SaaS Protection backs up actual user data (Exchange, OneDrive, SharePoint, Teams). Entra ID backup protects the tenant\'s identity and security configuration.' },
  { id: 'ab-c4', moduleId: 'datto-azure-backup', question: 'Can you restore a single Conditional Access policy?', answer: 'Yes, the tool supports granular restoration of individual configuration items.' },
  { id: 'ab-c5', moduleId: 'datto-azure-backup', question: 'What visibility does the tool provide before a restore?', answer: 'A change-tracking audit view (diff) showing exactly what was added, modified, or deleted.' },
  { id: 'ab-c6', moduleId: 'datto-azure-backup', question: 'How does it handle hybrid AD environments?', answer: 'It is best used for Cloud-Only objects. Objects synced via AD Connect should generally be restored on-prem to avoid sync conflicts.' },
  { id: 'ab-c7', moduleId: 'datto-azure-backup', question: 'Does Datto Azure Backup for VMs store data in Azure Blob Storage?', answer: 'No, it stores it in the secure Datto Cloud (SIRIS architecture) to separate the backup from the Azure environment.' },
  { id: 'ab-c8', moduleId: 'datto-azure-backup', question: 'Why is separating backup storage from Azure important?', answer: 'If a threat actor compromises the Azure subscription, they cannot wipe the backups because they live in the isolated Datto Cloud.' },
  { id: 'ab-c9', moduleId: 'datto-azure-backup', question: 'Does Azure VM backup support File-level restores?', answer: 'Yes, just like on-prem SIRIS.' },
  { id: 'ab-c10', moduleId: 'datto-azure-backup', question: 'Can you perform a cross-region restore with Datto Azure Backup?', answer: 'Yes, because the data is in the Datto Cloud, it can be restored to a different Azure region (provided the VNet infrastructure is prepped).' }
];

export const realTickets = [
  {
    id: 't-ab-1',
    date: '2024-02-10T10:00:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Azure VM backup job is taking 12+ hours to complete.',
    initialThought: 'CBT (Changed Block Tracking) might be disabled.',
    investigation: 'Checked logs, found CBT disabled, forcing a full hash of disk.',
    resolution: 'Reinstalled agent to repair CBT driver. Scheduled full backup off-hours.',
    lessonsLearned: 'CBT failures in Azure cause massive IOPS costs and slow backups.',
    fasterNextTime: 'Alert on backup duration exceeding 2 hours.'
  },
  {
    id: 't-ab-2',
    date: '2024-03-05T13:45:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Client wants DR test in West US (different region).',
    initialThought: 'We need to prep the target VNet first.',
    investigation: 'Initiated cloud virtualization, noticed no VNet in West US.',
    resolution: 'Created VNet, configured restore to target it. Booted VM.',
    lessonsLearned: 'Cross-region restores require Azure infrastructure prep.',
    fasterNextTime: 'Pre-build a DR-Test Resource Group with Terraform.'
  },
  {
    id: 't-ab-3',
    date: '2024-04-12T16:20:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'High backup billing due to massive churn.',
    initialThought: 'Tempdb or pagefile is being backed up.',
    investigation: 'Analyzed usage, found SQL tempdb on C: drive churning 50GB/day.',
    resolution: 'Moved tempdb to Azure ephemeral D: drive and excluded it.',
    lessonsLearned: 'Always exclude Azure temp drives from backups.',
    fasterNextTime: 'Mandate tempdb placement check before enabling backups.'
  }
];
