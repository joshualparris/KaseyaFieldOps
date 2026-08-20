import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-file-protection',
  name: 'Datto File Protection',
  description: 'Endpoint file backup, versioning, and ransomware rollback.',
  iconName: 'FileLock2',
  color: 'bg-indigo-500',
  order: 5
};

export const scenarios: Scenario[] = [
  {
    id: 'fp-deleted-file',
    moduleId: 'datto-file-protection',
    title: 'User accidentally deleted important file',
    description: 'A user deleted a critical presentation and emptied their recycle bin.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user calls in a panic because they deleted a file. Where do you go?',
        options: [
          {
            id: 'opt1',
            text: 'Log into the Datto File Protection portal or have the user right-click the folder and access the File Protection context menu.',
            isCorrect: true,
            feedback: 'Correct! File Protection offers both admin portal and user self-service restoration options.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Tell them to run data recovery software on their hard drive.',
            isCorrect: false,
            feedback: 'Incorrect. Data recovery software is unreliable and unnecessary when they have File Protection.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You access the interface. How do you locate the file?',
        options: [
          {
            id: 'opt1',
            text: 'Navigate to the folder and enable "Show deleted files" to find the missing document.',
            isCorrect: true,
            feedback: 'Correct! Deleted files are hidden by default but retained by the system based on policy.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Search their local C: drive.',
            isCorrect: false,
            feedback: 'Incorrect. If the file is deleted locally, you must search the cloud backup.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You found the file. What is the last step?',
        options: [
          {
            id: 'opt1',
            text: 'Restore the specific version to the original location and verify with the user.',
            isCorrect: true,
            feedback: 'Correct! Restoring directly to the original location quickly gets the user back to work.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Download it to your admin PC and email it to them.',
            isCorrect: false,
            feedback: 'Incorrect. This creates a security risk and is less efficient than a direct restore.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-ransomware-rollback',
    moduleId: 'datto-file-protection',
    title: 'Ransomware encrypted user files, need rollback',
    description: 'A user clicked a malicious link and their local files are encrypted.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user reports all their desktop files have .locked extensions. What is your first priority?',
        options: [
          {
            id: 'opt1',
            text: 'Isolate the infected machine from the network immediately to prevent spread.',
            isCorrect: true,
            feedback: 'Correct! Containment is the most critical first step in a ransomware incident.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Pay the ransom.',
            isCorrect: false,
            feedback: 'Incorrect. You should rely on backups, not pay criminals.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The machine is clean/reimaged. How do you recover the files using File Protection?',
        options: [
          {
            id: 'opt1',
            text: 'Identify the exact time of the infection to locate pre-encryption versions.',
            isCorrect: true,
            feedback: 'Correct! You need to know when the encryption started to restore the clean versions.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Restore the latest versions of all files.',
            isCorrect: false,
            feedback: 'Incorrect. The latest versions are the encrypted ones.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You found the time. How do you proceed with the restore?',
        options: [
          {
            id: 'opt1',
            text: 'Use the bulk restore/rollback feature to revert the affected folders to their state right before the infection.',
            isCorrect: true,
            feedback: 'Correct! Bulk rollback is specifically designed to recover quickly from ransomware events.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Manually restore files one by one.',
            isCorrect: false,
            feedback: 'Incorrect. Restoring thousands of files manually would take days.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-sync-conflict',
    moduleId: 'datto-file-protection',
    title: 'Two users editing same file, sync conflict',
    description: 'Two employees edited a shared spreadsheet offline and now there is a sync conflict.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user complains that their changes to a document disappeared after they reconnected to the internet. What likely happened?',
        options: [
          {
            id: 'opt1',
            text: 'A sync conflict occurred because another user saved a newer version to the cloud.',
            isCorrect: true,
            feedback: 'Correct! File Protection handles conflicts by keeping multiple versions if offline edits clash.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'The File Protection agent deleted the file randomly.',
            isCorrect: false,
            feedback: 'Incorrect. Agents do not randomly delete files; this is a classic sync conflict.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'How do you resolve this?',
        options: [
          {
            id: 'opt1',
            text: 'Identify the conflicting versions in the version history for that file.',
            isCorrect: true,
            feedback: 'Correct! The portal will show multiple versions saved around the same time.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Delete the user\'s local profile.',
            isCorrect: false,
            feedback: 'Incorrect. This destroys data and doesn\'t fix the conflict.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You found both versions. What is the best practice?',
        options: [
          {
            id: 'opt1',
            text: 'Restore the alternate version as a separate file, so the users can compare and merge changes.',
            isCorrect: true,
            feedback: 'Correct! Merging data requires human intervention. Providing both files allows them to combine their work.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Delete one version and tell them tough luck.',
            isCorrect: false,
            feedback: 'Incorrect. This causes data loss and angry clients.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-new-device-setup',
    moduleId: 'datto-file-protection',
    title: 'Setting up File Protection on new endpoint',
    description: 'A new employee got a laptop. You need to deploy File Protection.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You are setting up a new laptop. How do you deploy File Protection?',
        options: [
          {
            id: 'opt1',
            text: 'Install the Datto File Protection agent via RMM or manual installation.',
            isCorrect: true,
            feedback: 'Correct! The agent must be installed locally to monitor and backup files.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Just tell them to use a USB drive.',
            isCorrect: false,
            feedback: 'Incorrect. USB drives are easily lost and do not provide automated backups.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The agent is installed. What must you configure?',
        options: [
          {
            id: 'opt1',
            text: 'Configure the protected folders (e.g., Desktop, Documents) via a centralized policy.',
            isCorrect: true,
            feedback: 'Correct! Using policies ensures consistent backup standards across all users in the company.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Tell the user to manually drag files into the backup folder every Friday.',
            isCorrect: false,
            feedback: 'Incorrect. Backups should be automated and continuous.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The policy is applied. What is the final verification?',
        options: [
          {
            id: 'opt1',
            text: 'Verify the initial sync completes and the device shows as "Fully Protected" in the portal.',
            isCorrect: true,
            feedback: 'Correct! Always confirm the first backup succeeds before handing the device to the user.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Uninstall the agent.',
            isCorrect: false,
            feedback: 'Incorrect. Uninstalling the agent stops all backups.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-storage-cleanup',
    moduleId: 'datto-file-protection',
    title: 'File Protection storage growing rapidly',
    description: 'A team\'s storage quota is maxed out due to large files.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You get an alert that a client has exceeded their File Protection storage limit. What do you do?',
        options: [
          {
            id: 'opt1',
            text: 'Identify which users or folders are consuming the most space using portal reports.',
            isCorrect: true,
            feedback: 'Correct! Finding the source of the storage usage is the first step to optimization.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Immediately charge them for double the storage.',
            isCorrect: false,
            feedback: 'Incorrect. You should investigate first to see if it\'s legitimate usage or a configuration error.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You find a user backing up massive temporary video render files. What should you do?',
        options: [
          {
            id: 'opt1',
            text: 'Review the exclusion policy and add file types (e.g., .mp4, .tmp) or specific cache folders to the exclusion list.',
            isCorrect: true,
            feedback: 'Correct! Excluding non-essential large files saves storage and bandwidth.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Delete all their documents.',
            isCorrect: false,
            feedback: 'Incorrect. You should protect important documents while excluding temporary files.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You fixed the policy. What else might you check to reclaim space?',
        options: [
          {
            id: 'opt1',
            text: 'Adjust the retention policy to keep fewer versions of highly modified files.',
            isCorrect: true,
            feedback: 'Correct! Limiting the number of retained versions for rapidly changing files can free up significant space.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Format their hard drive.',
            isCorrect: false,
            feedback: 'Incorrect. That destroys data locally.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-missing-files',
    moduleId: 'datto-file-protection',
    title: 'Files not appearing in File Protection backup',
    description: 'A user claims their files are not backing up.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user says a specific folder isn\'t in their cloud backup. What is your first check?',
        options: [
          {
            id: 'opt1',
            text: 'Check the agent status on their machine to ensure it is running and connected.',
            isCorrect: true,
            feedback: 'Correct! If the agent is stopped or offline, no backups can occur.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Assume they deleted the folder.',
            isCorrect: false,
            feedback: 'Incorrect. Always verify the technical mechanics before blaming the user.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The agent is running normally. What do you check next?',
        options: [
          {
            id: 'opt1',
            text: 'Verify if the specific folder is included in their backup policy.',
            isCorrect: true,
            feedback: 'Correct! If they created a folder in C:\\Temp, it likely isn\'t in the default backup policy.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Reboot the server.',
            isCorrect: false,
            feedback: 'Incorrect. File Protection is an endpoint backup, so the server is irrelevant.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You see the folder path is correct. What is the last thing to check?',
        options: [
          {
            id: 'opt1',
            text: 'Check if there are global exclusions (like file size limits or extensions) blocking the files.',
            isCorrect: true,
            feedback: 'Correct! A global rule blocking files over 5GB might be preventing their specific files from syncing.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Tell the user to buy a new computer.',
            isCorrect: false,
            feedback: 'Incorrect. A configuration check is required, not new hardware.'
          }
        ]
      }
    }
  },
  {
    id: 'fp-version-history',
    moduleId: 'datto-file-protection',
    title: 'Client needs to find specific version of a document from 3 weeks ago',
    description: 'A user messed up a document over several days and needs an older version.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user needs a version of a Word document from exactly 3 weeks ago. What do you do?',
        options: [
          {
            id: 'opt1',
            text: 'Navigate to the file in the web portal or via the right-click context menu.',
            isCorrect: true,
            feedback: 'Correct! Both methods allow you to access the version history.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Tell them to hit Ctrl+Z in Word 500 times.',
            isCorrect: false,
            feedback: 'Incorrect. Word\'s undo history clears when the document is closed.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You have located the file. How do you find the right version?',
        options: [
          {
            id: 'opt1',
            text: 'Browse the version history list, matching the date and time to the user\'s request.',
            isCorrect: true,
            feedback: 'Correct! File Protection keeps historical versions specifically for this reason.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Restore the entire folder to 3 weeks ago.',
            isCorrect: false,
            feedback: 'Incorrect. This would overwrite all other good files with old data.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You found the correct version. What is the safest way to provide it?',
        options: [
          {
            id: 'opt1',
            text: 'Restore it, perhaps appending the date to the filename, so they can compare it to the current version.',
            isCorrect: true,
            feedback: 'Correct! Restoring as a copy prevents accidental overwriting of current work.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Delete the current version and replace it entirely.',
            isCorrect: false,
            feedback: 'Incorrect. They might need elements from the current version.'
          }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fp-1', moduleId: 'datto-file-protection', question: 'File Protection vs full BCDR backup', answer: 'File Protection focuses on user files and endpoint data (laptops/desktops), while BCDR focuses on entire servers, databases, and quick virtualization.' },
  { id: 'fp-2', moduleId: 'datto-file-protection', question: 'File versioning concepts', answer: 'The ability to keep multiple historical copies of a file as it changes over time, allowing users to revert mistakes.' },
  { id: 'fp-3', moduleId: 'datto-file-protection', question: 'Ransomware rollback capability', answer: 'A feature allowing admins to quickly revert entire folders or machines to a point in time before a ransomware infection encrypted the files.' },
  { id: 'fp-4', moduleId: 'datto-file-protection', question: 'Protected folder configuration', answer: 'Administrators can enforce which folders (e.g., Documents, Desktop) are backed up globally via policies, ensuring critical data isn\'t missed.' },
  { id: 'fp-5', moduleId: 'datto-file-protection', question: 'Sync conflict resolution', answer: 'When multiple users edit a file offline, File Protection saves both versions upon reconnection to prevent data loss.' },
  { id: 'fp-6', moduleId: 'datto-file-protection', question: 'Agent installation', answer: 'A lightweight software application installed on Windows or Mac endpoints that monitors and securely uploads file changes.' },
  { id: 'fp-7', moduleId: 'datto-file-protection', question: 'Retention policies for file versions', answer: 'Rules dictating how long deleted files are kept and how many previous versions of modified files are stored.' },
  { id: 'fp-8', moduleId: 'datto-file-protection', question: 'Storage optimization', answer: 'Excluding temporary files, caches, and large media files from backup policies to conserve cloud storage quotas.' },
  { id: 'fp-9', moduleId: 'datto-file-protection', question: 'File restoration process', answer: 'Files can be restored via the web portal by admins or through native OS context menus by end-users.' },
  { id: 'fp-10', moduleId: 'datto-file-protection', question: 'Endpoint backup vs server backup', answer: 'Endpoints (laptops) frequently go offline and change networks, requiring specialized backup agents like File Protection compared to static servers.' },
  { id: 'fp-11', moduleId: 'datto-file-protection', question: 'Supported file types', answer: 'It backs up most standard user files (documents, spreadsheets, images) but is not designed for active databases (like SQL or Exchange).' },
  { id: 'fp-12', moduleId: 'datto-file-protection', question: 'Network drive backup limitations', answer: 'File Protection is designed for local endpoint drives; backing up mapped network drives is generally unsupported or ill-advised.' },
  { id: 'fp-13', moduleId: 'datto-file-protection', question: 'Mobile access to backed-up files', answer: 'Users can often access their backed-up files via mobile apps or web portals, providing secure remote access.' },
  { id: 'fp-14', moduleId: 'datto-file-protection', question: 'Admin portal features', answer: 'Centralized management of deployment, policies, storage quotas, and compliance reporting across all client endpoints.' },
  { id: 'fp-15', moduleId: 'datto-file-protection', question: 'User self-service restore', answer: 'Empowering users to recover their own deleted files or previous versions without creating a support ticket.' },
  { id: 'fp-16', moduleId: 'datto-file-protection', question: 'File Protection vs OneDrive/Google Drive', answer: 'File Protection is a true backup solution with immutable versions and centralized admin control, whereas OneDrive is primarily for sync and collaboration.' },
  { id: 'fp-17', moduleId: 'datto-file-protection', question: 'Compliance and data retention', answer: 'Ensuring that endpoint data backups meet legal or regulatory requirements for keeping data for specific periods (e.g., 7 years).' },
  { id: 'fp-18', moduleId: 'datto-file-protection', question: 'Bandwidth management during sync', answer: 'Configuring the agent to throttle upload speeds during business hours to prevent saturating the office internet connection.' }
];


export const realTickets = [
  {
    id: 't-fp-1',
    date: '2024-05-01T08:30:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'A user\'s laptop was stolen. They bought a new laptop and need all their Desktop and Documents files restored immediately.',
    initialThought: 'Perfect use case for Datto File Protection. We just need to install the agent and do a device restore.',
    investigation: 'Logged into Datto File Protection portal. Confirmed the stolen device had synced recently. Marked the stolen device as "Lost/Stolen" to initiate a remote wipe the next time it connects.',
    resolution: 'Installed the DFP agent on the new laptop. Logged in as the user. Selected "Restore from another device" in the agent interface. Selected the stolen laptop profile and mapped Desktop to Desktop, Documents to Documents. The sync took 45 minutes.',
    lessonsLearned: 'DFP handles device migrations beautifully. Marking the old device as lost/stolen is a crucial security step that must be done before restoring.',
    fasterNextTime: 'Create a zero-touch deployment script for DFP so the agent auto-installs and prompts the user for credentials on first login.'
  },
  {
    id: 't-fp-2',
    date: '2024-06-15T14:00:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'User reports that changes they made to a shared Excel file offline yesterday are missing after connecting to Wi-Fi today.',
    initialThought: 'Likely a versioning conflict where another user edited the file while this user was offline.',
    investigation: 'Checked the file in the DFP web portal. Saw that a new version was uploaded by a colleague 2 hours ago. Looked at the "Versions" tab for the file and found a "Conflict" branch created when our user came online.',
    resolution: 'Downloaded both the current version and the conflict version. Had the user manually merge their offline changes into the current live version. Deleted the conflict branch to clean up the portal.',
    lessonsLearned: 'DFP handles offline conflicts by saving both versions, but it requires manual human intervention to merge the data in Excel.',
    fasterNextTime: 'Train users to check for the "Syncing" icon before opening shared files, or transition highly collaborative Excel files to SaaS/co-authoring platforms.'
  },
  {
    id: 't-fp-3',
    date: '2024-07-22T09:45:00Z',
    moduleId: 'datto-file-protection',
    symptoms: 'A user got hit with a drive-by ransomware payload that encrypted their local My Documents folder.',
    initialThought: 'We need to rollback the folder to yesterday\'s state using DFP before the ransomware synced the encrypted versions.',
    investigation: 'Verified the ransomware only affected the local machine. The DFP agent successfully uploaded the encrypted files, but the previous versions were still intact in the cloud.',
    resolution: 'Isolated and wiped the user\'s laptop to remove the malware. On a clean build, logged into the DFP web portal, selected the My Documents folder, and used the "Revert" feature to roll back the entire folder state to 8:00 AM yesterday. Re-synced the clean files to the laptop.',
    lessonsLearned: 'The Revert feature is a lifesaver for mass ransomware encryption. It rolls back the whole directory structure at a specific point in time.',
    fasterNextTime: 'Enable DFP ransomware detection alerts so the system automatically pauses sync if rapid mass-encryption is detected.'
  }
];
