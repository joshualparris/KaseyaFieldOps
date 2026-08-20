const fs = require('fs');

const azureData = `import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-azure-backup',
  name: 'Datto Cloud Workload Backups (Azure VM & Entra ID)',
  description: 'Datto Backup for Microsoft Azure (VMs) and Datto Backup for Microsoft Entra ID. Note: These are distinct products with different management portals and architectures.',
  iconName: 'Cloud',
  color: 'bg-cyan-600',
  order: 4
};

export const scenarios: Scenario[] = [
  {
    id: 'ab-ca-policy',
    moduleId: 'datto-azure-backup',
    title: 'Entra ID: Conditional Access policy accidentally deleted',
    description: 'An administrator accidentally deleted a critical Conditional Access policy from Microsoft Entra ID.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client calls in a panic. Which product and portal do you use to restore this?',
        options: [
          { id: 'opt1', text: 'Use Datto Backup for Microsoft Entra ID, managed via the UniView portal.', isCorrect: true, feedback: 'Correct. UniView manages Entra ID backups.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Use Datto SaaS Protection.', isCorrect: false, feedback: 'Incorrect. SaaS Protection is for Microsoft 365 data (Exchange, OneDrive, SharePoint), not Entra ID configuration.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'In UniView, you locate the backup. Can you restore just the specific policy?',
        options: [
          { id: 'opt1', text: 'Yes, Datto supports granular object-level restores, so you can restore just the missing Conditional Access policy.', isCorrect: true, feedback: 'Correct. Granular restore is supported.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What happens if you try to restore a policy that already exists?',
        options: [
          { id: 'opt1', text: 'Datto\\'s current behavior generally skips restoring existing records rather than overwriting modifications.', isCorrect: true, feedback: 'Correct. Existing records are typically skipped.' }
        ]
      }
    }
  },
  {
    id: 'ab-vm-management',
    moduleId: 'datto-azure-backup',
    title: 'Azure VM BCDR: Managing backups',
    description: 'A client wants to know where their Datto Backup for Microsoft Azure (VMs) is managed.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client assumes Azure VM backups are managed in UniView. Is this correct?',
        options: [
          { id: 'opt1', text: 'No, Azure VM BCDR uses Cloud SIRIS/BCDR management in the Datto Partner Portal.', isCorrect: true, feedback: 'Correct. Azure VM BCDR is managed via the Datto Partner Portal, unlike Entra ID or Azure Files which use UniView.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'Where is the data for Azure VM backups ultimately stored?',
        options: [
          { id: 'opt1', text: 'It uses a Cloud SIRIS for the initial backup and replicates the data to the secure Datto Cloud.', isCorrect: true, feedback: 'Correct. This separates the backup data from the Azure subscription environment.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'Why is it important to store the backups in the Datto Cloud rather than Azure Blob Storage?',
        options: [
          { id: 'opt1', text: 'If a threat actor compromises the Azure subscription, they cannot wipe the backups because the data resides outside Azure in the isolated Datto Cloud.', isCorrect: true, feedback: 'Correct. Separation of environments protects against total subscription compromise.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'ab-c1', moduleId: 'datto-azure-backup', question: 'What does Datto Backup for Microsoft Entra ID protect?', answer: 'Identity and configuration objects like users, groups, roles, applications, and Conditional Access policies.' },
  { id: 'ab-c2', moduleId: 'datto-azure-backup', question: 'What portal manages Datto Backup for Microsoft Entra ID?', answer: 'The UniView portal.' },
  { id: 'ab-c3', moduleId: 'datto-azure-backup', question: 'How is Datto Backup for Microsoft Entra ID different from Datto SaaS Protection?', answer: 'Entra ID Backup protects identity/tenant configuration. SaaS Protection protects user mailbox and file data (Exchange, OneDrive, SharePoint, Teams).' },
  { id: 'ab-c4', moduleId: 'datto-azure-backup', question: 'Can Datto Backup for Microsoft Entra ID perform granular restores?', answer: 'Yes, it supports granular object-level restores (e.g., restoring a single user or Conditional Access policy).' },
  { id: 'ab-c5', moduleId: 'datto-azure-backup', question: 'How does Datto handle restoring an Entra ID object that already exists in the cloud?', answer: 'The current restore behavior skips existing records and does not overwrite modifications to existing ones.' },
  { id: 'ab-c6', moduleId: 'datto-azure-backup', question: 'What portal manages Datto Backup for Microsoft Azure (Azure VM BCDR)?', answer: 'Cloud SIRIS/BCDR management in the Datto Partner Portal (not UniView).' },
  { id: 'ab-c7', moduleId: 'datto-azure-backup', question: 'Where is Datto Backup for Microsoft Azure (VMs) backup data ultimately stored?', answer: 'It is replicated into the Datto Cloud.' },
  { id: 'ab-c8', moduleId: 'datto-azure-backup', question: 'Why does Datto Backup for Microsoft Azure store data in the Datto Cloud?', answer: 'To isolate the backups from the Azure environment, ensuring that a compromised Azure subscription cannot be used to destroy the backups.' },
  { id: 'ab-c9', moduleId: 'datto-azure-backup', question: 'Is Datto Backup for Azure Files/Blob managed the same way as Azure VMs?', answer: 'No, Azure Files/Blob backup is managed through UniView, while Azure VM BCDR uses the Datto Partner Portal.' },
  { id: 'ab-c10', moduleId: 'datto-azure-backup', question: 'Does Datto Backup for Microsoft Entra ID provide a "change-tracking diff" feature?', answer: 'Official documentation supports restore reporting and granular object restores, but does not specify a pre-restore visual "audit diff" workflow.' }
];

export const realTickets = [
  {
    id: 't-ab-1',
    date: '2024-02-10T10:00:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Need to restore a deleted Conditional Access policy in Entra ID.',
    initialThought: 'Use Datto Backup for Microsoft Entra ID.',
    investigation: 'Logged into the UniView portal and located the Entra ID backup.',
    resolution: 'Performed a granular object restore of the specific Conditional Access policy.',
    lessonsLearned: 'Entra ID backups are managed in UniView and support granular restores.',
    fasterNextTime: 'Ensure all clients have Entra ID backup enabled to protect identity configurations.'
  },
  {
    id: 't-ab-2',
    date: '2024-03-05T13:45:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Client wants to verify their Azure VM backups are secure from Azure subscription compromise.',
    initialThought: 'Explain Datto\\'s storage architecture.',
    investigation: 'Reviewed the Datto Backup for Microsoft Azure architecture docs.',
    resolution: 'Informed the client that Azure VM backups are replicated to the isolated Datto Cloud, protecting them even if the Azure tenant is breached.',
    lessonsLearned: 'Separating backup storage from the primary production environment is a critical security control.',
    fasterNextTime: 'Include this architectural advantage in sales/security briefings.'
  }
];
`;
fs.writeFileSync('src/data/products/datto-azure-backup.ts', azureData);
