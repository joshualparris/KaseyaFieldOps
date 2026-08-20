const fs = require('fs');

const fpData = `import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-file-protection',
  name: 'Datto File Protection',
  description: 'Cloud backup service designed to protect endpoint files and folders (laptops/workstations).',
  iconName: 'Files',
  color: 'bg-green-600',
  order: 5
};

export const scenarios: Scenario[] = [
  {
    id: 'fp-ransomware-rollback',
    moduleId: 'datto-file-protection',
    title: 'Ransomware rollback at the file level',
    description: 'A user\\'s local machine was hit with ransomware, encrypting their My Documents folder. The encrypted files were backed up to Datto File Protection.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The encrypted files backed up to the cloud. Is the original data lost?',
        options: [
          { id: 'opt1', text: 'No. Datto File Protection retains previous versions of files for at least 180 days. The encrypted file is just stored as a new version.', isCorrect: true, feedback: 'Correct. Backing up an encrypted file does not automatically purge the healthy versions.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'There are 5,000 encrypted files in the folder. What is an efficient way to recover them?',
        options: [
          { id: 'opt1', text: 'Use the Revert feature to roll the affected files back to their state prior to the ransomware incident.', isCorrect: true, feedback: 'Correct. Revert helps administrators restore files to a clean, pre-infection state.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'Before restoring the data to the user\\'s machine, what is a critical prerequisite?',
        options: [
          { id: 'opt1', text: 'The endpoint must be completely cleaned or rebuilt to ensure the ransomware is removed, otherwise it may just re-encrypt the restored files.', isCorrect: true, feedback: 'Correct. Always remediate the endpoint threat before restoring data.' }
        ]
      }
    }
  },
  {
    id: 'fp-deleted-file-recovery',
    moduleId: 'datto-file-protection',
    title: 'Recovering an accidentally deleted file',
    description: 'A user accidentally deleted a critical project folder from their laptop and emptied the recycle bin.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The user panics because the file is gone from their machine. How can you verify if it is backed up?',
        options: [
          { id: 'opt1', text: 'Log into the Datto File Protection portal and check the user\\'s device backup archive to see if the folder was included in their backup path.', isCorrect: true, feedback: 'Correct. The portal provides visibility into exactly what data is safely backed up.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You locate the folder in the portal. How can you get the data back to the user?',
        options: [
          { id: 'opt1', text: 'You can download the files directly from the portal or initiate a restore operation to push the files back to the user\\'s device.', isCorrect: true, feedback: 'Correct. Administrators have flexible restore options.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What happens to files that are deleted locally on the endpoint?',
        options: [
          { id: 'opt1', text: 'They are removed from the local device but retained in the Datto File Protection cloud according to the retention policy.', isCorrect: true, feedback: 'Correct. Deleting a file locally does not immediately delete the cloud backup.' }
        ]
      }
    }
  },
  {
    id: 'fp-accidental-overwrite',
    moduleId: 'datto-file-protection',
    title: 'User accidentally saved over a critical document',
    description: 'A user accidentally saved over a critical PowerPoint presentation with a blank template and closed the application.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The user needs the version of the presentation from earlier this morning. Where do you go?',
        options: [
          { id: 'opt1', text: 'Log into the Datto File Protection portal, locate the file, and view its version history.', isCorrect: true, feedback: 'Correct. File Protection retains versions of modified files.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You see several versions from earlier today. What can you do with them?',
        options: [
          { id: 'opt1', text: 'You can download the specific version from earlier this morning and provide it to the user.', isCorrect: true, feedback: 'Correct. You can retrieve specific historical versions.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'How long are file versions generally retained in Datto File Protection?',
        options: [
          { id: 'opt1', text: 'Versions are retained for at least 180 days, with retention gradually becoming sparser over that six-month period.', isCorrect: true, feedback: 'Correct. Datto uses significant versioning technology to manage versions over 180 days.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fp-c1', moduleId: 'datto-file-protection', question: 'What is the primary use case for Datto File Protection?', answer: 'Providing cloud-based file and folder backup for endpoint devices like laptops and workstations.' },
  { id: 'fp-c2', moduleId: 'datto-file-protection', question: 'How long does Datto File Protection retain file versions?', answer: 'Versions are retained for at least 180 days, using a sparse retention model over time.' },
  { id: 'fp-c3', moduleId: 'datto-file-protection', question: 'Does Datto File Protection support multi-user offline conflict resolution (like conflict copies)?', answer: 'No. It is a cloud backup service, not a multi-user collaboration or sync tool like Datto Workplace.' },
  { id: 'fp-c4', moduleId: 'datto-file-protection', question: 'What feature can assist in recovering from a mass ransomware encryption event?', answer: 'The "Revert" feature, which helps restore files to a clean, pre-infection state.' },
  { id: 'fp-c5', moduleId: 'datto-file-protection', question: 'Can you use Datto File Protection to boot a crashed laptop (local virtualization)?', answer: 'No. It only backs up files and folders, not the operating system or applications. Full image backup requires a BCDR solution.' },
  { id: 'fp-c6', moduleId: 'datto-file-protection', question: 'What happens to the cloud backup if a user deletes a file locally?', answer: 'The file is retained in the cloud archive based on the service\\'s retention policy; it is not immediately purged.' },
  { id: 'fp-c7', moduleId: 'datto-file-protection', question: 'Is Datto File Protection a replacement for Microsoft SharePoint?', answer: 'No. SharePoint is a collaboration platform designed for real-time co-authoring. File Protection is an endpoint backup solution.' },
  { id: 'fp-c8', moduleId: 'datto-file-protection', question: 'What happens when you use the "Disable - Lost Device" feature?', answer: 'It prevents the compromised device from connecting to the File Protection service, protecting the backup archive from unauthorized access.' },
  { id: 'fp-c9', moduleId: 'datto-file-protection', question: 'Does "Disable - Lost Device" remotely wipe the endpoint\\'s hard drive?', answer: 'No. It simply disables the device\\'s access to the Datto File Protection service. Remote wipe was a feature of Datto Workplace.' },
  { id: 'fp-c10', moduleId: 'datto-file-protection', question: 'How can you recover data if a laptop is completely destroyed?', answer: 'Administrators can restore the backed-up files from the portal, or the user can install the agent on a new device and initiate a restore.' }
];

export const realTickets = [
  {
    id: 't-fp-1',
    date: '2024-05-01T08:30:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'A user\\'s laptop was stolen. We need to secure their backups.',
    initialThought: 'We need to prevent the stolen laptop from accessing the cloud archive.',
    investigation: 'Logged into the File Protection portal and located the device record.',
    resolution: 'Used the "Disable - Lost Device" action to block the device from connecting to the service.',
    lessonsLearned: 'Disable - Lost Device protects the backup archive, but does not wipe the physical laptop.',
    fasterNextTime: 'Ensure clients have MDM (like Intune) for actual remote wipe capabilities.'
  },
  {
    id: 't-fp-2',
    date: '2024-06-15T14:00:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'User accidentally deleted a large folder of marketing assets.',
    initialThought: 'Verify if the folder was in the backup path.',
    investigation: 'Checked the portal and confirmed the folder was successfully backing up.',
    resolution: 'Initiated a restore of the folder from the portal to the user\\'s device.',
    lessonsLearned: 'Cloud backup prevents permanent data loss from accidental deletion.',
    fasterNextTime: 'Train users on how to request restores through the standard ticketing process.'
  },
  {
    id: 't-fp-3',
    date: '2024-07-22T09:45:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'Ransomware encrypted a user\\'s local files.',
    initialThought: 'Use the Revert feature to roll back the changes.',
    investigation: 'Confirmed the encrypted files had backed up, but previous clean versions were still available in the 180-day history.',
    resolution: 'Isolated and cleaned the endpoint. Used the Revert feature in the portal to restore the files to their state prior to the attack.',
    lessonsLearned: 'The Revert feature is highly effective for mass file corruption events.',
    fasterNextTime: 'Deploy Datto EDR to catch ransomware before it encrypts the files.'
  }
];
`;
fs.writeFileSync('src/data/products/datto-file-protection.ts', fpData);
