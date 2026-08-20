
import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-file-protection',
  name: 'Datto File Protection',
  description: 'Agent-based file and folder backup. Perfect for mobile workforces and endpoint file protection.',
  iconName: 'Files',
  color: 'bg-green-600',
  order: 5
};

// FLAG: The scenarios below are based on sound general file-backup/versioning practice (as per deep backlog instructions).
// Please review once direct Datto File Protection documentation/portal access is available.
export const scenarios: Scenario[] = [
  {
    id: 'fp-ransomware-rollback',
    moduleId: 'datto-file-protection',
    title: 'Ransomware rollback at the file level',
    description: 'A user\'s local machine was hit with ransomware, encrypting their My Documents folder. The encrypted files were synced to Datto File Protection.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The encrypted files synced to the cloud. Is the data lost?',
        options: [
          { id: 'opt1', text: 'No. Datto File Protection retains previous versions of files. The encrypted file is just stored as the newest version.', isCorrect: true, feedback: 'Correct. Syncing an encrypted file does not delete the good versions.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'There are 5,000 encrypted files in the folder. Do you have to restore them one by one?',
        options: [
          { id: 'opt1', text: 'No, use the Revert feature to roll the entire folder structure back to a specific point in time (e.g., yesterday at 8 AM).', isCorrect: true, feedback: 'Correct. Revert is designed for mass rollbacks.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'Before you Revert, what must you ensure?',
        options: [
          { id: 'opt1', text: 'The endpoint must be isolated and wiped/cleaned of the ransomware, otherwise it will just re-encrypt the restored files.', isCorrect: true, feedback: 'Correct. Always remediate the threat before restoring.' }
        ]
      }
    }
  },
  {
    id: 'fp-sync-conflict',
    moduleId: 'datto-file-protection',
    title: 'Sync client conflict — two versions of the same file',
    description: 'A user edited a spreadsheet offline on an airplane. Meanwhile, a colleague edited the same synced file online. The user just connected to Wi-Fi.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'When the offline user connects, what does Datto File Protection do?',
        options: [
          { id: 'opt1', text: 'It uploads the offline user\'s file as a "Conflict" branch/copy to prevent silently overwriting the colleague\'s changes.', isCorrect: true, feedback: 'Correct. DFP safely saves both versions.', nextStepId: 'step2' },
          { id: 'opt2', text: 'It merges the Excel rows automatically.', isCorrect: false, feedback: 'Incorrect. DFP does file-level versioning, not internal document merging.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The user complains they can\'t see their colleague\'s data in their file. How do you resolve this?',
        options: [
          { id: 'opt1', text: 'Explain they must manually open both versions and copy/paste the data to merge them in Excel, then delete the conflict copy.', isCorrect: true, feedback: 'Correct. Manual merging is required for file-level conflicts.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'How can you prevent this in the future for highly collaborative spreadsheets?',
        options: [
          { id: 'opt1', text: 'Move highly collaborative real-time documents to SaaS platforms like SharePoint/Teams which support simultaneous co-authoring.', isCorrect: true, feedback: 'Correct. DFP is a backup/sync tool, not a real-time co-authoring engine.' }
        ]
      }
    }
  },
  {
    id: 'fp-accidental-overwrite',
    moduleId: 'datto-file-protection',
    title: 'Client accidentally overwrote a shared file',
    description: 'A user accidentally saved over a critical shared PowerPoint presentation with a blank template.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The user needs the version from 2 hours ago. Where do you go?',
        options: [
          { id: 'opt1', text: 'Log into the Datto File Protection portal, locate the file, and view its Version History.', isCorrect: true, feedback: 'Correct.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You see the version from 2 hours ago. What are your restore options?',
        options: [
          { id: 'opt1', text: 'You can download that specific version directly, or promote it to become the current active version.', isCorrect: true, feedback: 'Correct.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You restore it. Will this revert the other files in the folder?',
        options: [
          { id: 'opt1', text: 'No, restoring a single file\'s version does not affect the rest of the folder.', isCorrect: true, feedback: 'Correct. Version history is granular.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fp-c1', moduleId: 'datto-file-protection', question: 'What is the core difference between Datto File Protection and Datto BCDR?', answer: 'File Protection is for individual files/folders (no OS image, no virtualization). BCDR takes full system images.' },
  { id: 'fp-c2', moduleId: 'datto-file-protection', question: 'What does "version history" provide that a daily snapshot doesn\'t?', answer: 'It tracks every save/change made to a file, allowing you to restore intermediate versions from the middle of the day.' },
  { id: 'fp-c3', moduleId: 'datto-file-protection', question: 'How does DFP handle a file edited by two people simultaneously offline?', answer: 'It creates a Conflict copy when they sync, preserving both files so data isn\'t silently overwritten.' },
  { id: 'fp-c4', moduleId: 'datto-file-protection', question: 'What feature do you use to recover from a mass ransomware encryption of a folder?', answer: 'The "Revert" feature, which rolls the entire directory structure back to a specific point in time.' },
  { id: 'fp-c5', moduleId: 'datto-file-protection', question: 'Can you use DFP to virtualize a crashed laptop?', answer: 'No, it does not back up the OS or applications.' },
  { id: 'fp-c6', moduleId: 'datto-file-protection', question: 'What happens if a user deletes a file locally?', answer: 'It is removed locally, but retained in the cloud for the duration of the retention policy.' },
  { id: 'fp-c7', moduleId: 'datto-file-protection', question: 'Is DFP a replacement for SharePoint co-authoring?', answer: 'No, it is a backup/sync tool. Co-authoring requires SaaS platforms.' },
  { id: 'fp-c8', moduleId: 'datto-file-protection', question: 'Can DFP backup network shares (NAS)?', answer: 'It is primarily designed for Windows/Mac endpoints, though Server agents exist for basic file server sync.' },
  { id: 'fp-c9', moduleId: 'datto-file-protection', question: 'What happens if a device is marked as Lost/Stolen in the portal?', answer: 'The agent will remote-wipe the synced data the next time it connects to the internet.' },
  { id: 'fp-c10', moduleId: 'datto-file-protection', question: 'How do you migrate a user to a new laptop with DFP?', answer: 'Install the agent, log in, and select "Restore from another device" to sync the old profile down.' }
];

export const realTickets = [
  {
    id: 't-fp-1',
    date: '2024-05-01T08:30:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'A user\'s laptop was stolen. Needs files on new laptop.',
    initialThought: 'Perfect use case for DFP device restore.',
    investigation: 'Marked old device as Lost/Stolen in portal.',
    resolution: 'Installed agent on new laptop, ran "Restore from another device".',
    lessonsLearned: 'DFP handles device migrations easily.',
    fasterNextTime: 'Create zero-touch deployment script.'
  },
  {
    id: 't-fp-2',
    date: '2024-06-15T14:00:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'User missing offline changes to shared Excel file.',
    initialThought: 'Likely a versioning conflict.',
    investigation: 'Found a "Conflict" branch created when user came online.',
    resolution: 'Had user manually merge changes into current live version.',
    lessonsLearned: 'Conflicts require manual Excel merging.',
    fasterNextTime: 'Move to SharePoint for co-authoring.'
  },
  {
    id: 't-fp-3',
    date: '2024-07-22T09:45:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'Ransomware encrypted My Documents.',
    initialThought: 'Rollback folder to yesterday using DFP.',
    investigation: 'Agent uploaded encrypted files, but previous versions intact.',
    resolution: 'Wiped laptop. Used Revert feature in portal to rollback folder.',
    lessonsLearned: 'Revert feature is a lifesaver for mass encryption.',
    fasterNextTime: 'Enable DFP ransomware detection alerts.'
  }
];
