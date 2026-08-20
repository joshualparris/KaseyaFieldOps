import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-backup',
  name: 'Datto Backup',
  description: 'Business Continuity and Disaster Recovery (BCDR) appliance-based backup.',
  iconName: 'HardDrive',
  color: 'bg-blue-500',
  order: 3
};

export const scenarios: Scenario[] = [
  {
    id: 'backup-job-failure',
    moduleId: 'datto-backup',
    title: 'Backup job fails on a server with VSS error',
    description: 'A scheduled backup job has failed. You need to investigate and resolve the issue.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A backup job failed for a critical server. Where do you start troubleshooting?',
        options: [
          {
            id: 'opt1',
            text: 'Check the error details in the Datto Partner Portal.',
            isCorrect: true,
            feedback: 'Correct! The Partner Portal provides specific error codes and logs that point directly to the VSS writer issue.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Reboot the server immediately.',
            isCorrect: false,
            feedback: 'Incorrect. Rebooting without investigating might clear temporary states but does not identify the root cause.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The portal indicates a VSS writer failure. What is your next step?',
        options: [
          {
            id: 'opt1',
            text: 'Log into the server and run `vssadmin list writers` to identify the failing writer.',
            isCorrect: true,
            feedback: 'Good job! This command helps you see exactly which VSS writer is in a failed state.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Delete the backup job and recreate it.',
            isCorrect: false,
            feedback: 'Incorrect. Recreating the job won\'t fix a VSS issue on the host server.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You found a failed VSS writer. How do you resolve this so backups can resume?',
        options: [
          {
            id: 'opt1',
            text: 'Restart the specific service associated with the failed VSS writer, then verify the next backup.',
            isCorrect: true,
            feedback: 'Correct! Restarting the associated service often clears the VSS writer error and allows backups to run successfully.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Disable VSS entirely on the server.',
            isCorrect: false,
            feedback: 'Incorrect. Disabling VSS will break application-aware backups completely.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-screenshot-verify',
    moduleId: 'datto-backup',
    title: 'Screenshot verification shows blue screen',
    description: 'The automated screenshot verification for a server shows a blue screen.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You receive an alert that screenshot verification failed with a BSOD. What should you do first?',
        options: [
          {
            id: 'opt1',
            text: 'Review the screenshot and boot logs in the Datto device UI.',
            isCorrect: true,
            feedback: 'Correct! Reviewing the screenshot and boot logs provides context on why the boot process failed.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Delete all recent backups.',
            isCorrect: false,
            feedback: 'Incorrect. Never delete backups without identifying the problem.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You see the BSOD is related to a storage driver. What do you check next?',
        options: [
          {
            id: 'opt1',
            text: 'Check if there were recent changes or driver updates on the production server.',
            isCorrect: true,
            feedback: 'Correct! Recent changes to the source server often cause boot failures in virtualized environments.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Assume the Datto appliance is broken and request an RMA.',
            isCorrect: false,
            feedback: 'Incorrect. A BSOD is usually an OS or driver issue, not a hardware failure of the appliance.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'It turns out an incompatible update was installed on the source machine. How do you handle the backup?',
        options: [
          {
            id: 'opt1',
            text: 'Determine if it\'s an OS issue vs a backup issue, fix the source machine, and trigger a new backup.',
            isCorrect: true,
            feedback: 'Correct! Fixing the source machine ensures future backups are healthy and bootable.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Ignore the blue screen as long as files are backed up.',
            isCorrect: false,
            feedback: 'Incorrect. A blue screen means bare-metal restore and virtualization will fail, putting the client at risk.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-restore-file',
    moduleId: 'datto-backup',
    title: 'Client needs single file restored from backup',
    description: 'A client accidentally deleted an important spreadsheet and needs it restored.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user deleted "Financials_2024.xlsx" yesterday. What is your first step?',
        options: [
          {
            id: 'opt1',
            text: 'Identify the correct recovery point from before the file was deleted.',
            isCorrect: true,
            feedback: 'Correct! You must select a snapshot taken prior to the deletion event.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Initiate a Bare Metal Restore (BMR) of the entire server.',
            isCorrect: false,
            feedback: 'Incorrect. A BMR is for total system failure, not a single file restore. It would cause massive downtime.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You have found the right snapshot. Which restore method should you use?',
        options: [
          {
            id: 'opt1',
            text: 'Choose "File Restore" to mount the snapshot as a web share or network drive.',
            isCorrect: true,
            feedback: 'Correct! File Restore is the fastest and least disruptive way to retrieve specific files.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Choose "Local Virtualization".',
            isCorrect: false,
            feedback: 'Incorrect. Virtualizing the server is unnecessary for just retrieving a file.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The snapshot is mounted. How do you finish the job?',
        options: [
          {
            id: 'opt1',
            text: 'Navigate to the file, copy it to the original location, and verify with the user.',
            isCorrect: true,
            feedback: 'Correct! Restoring the file and confirming with the user ensures the ticket is fully resolved.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Email the entire 50GB folder to the user.',
            isCorrect: false,
            feedback: 'Incorrect. Emailing large folders is impractical and poses security risks.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-restore-full',
    moduleId: 'datto-backup',
    title: 'Server hardware failure, need full bare-metal restore',
    description: 'A critical server\'s RAID controller has died. You need to perform a full restore to new hardware.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The server hardware is completely dead. What is your immediate priority?',
        options: [
          {
            id: 'opt1',
            text: 'Assess the situation and spin up a local virtualization to minimize downtime while preparing new hardware.',
            isCorrect: true,
            feedback: 'Correct! Local virtualization gets the client back to work immediately while you perform the BMR in the background.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Tell the client they will be down for 3 days while you order parts.',
            isCorrect: false,
            feedback: 'Incorrect. You have a BCDR appliance for exactly this reason! You can virtualize to minimize downtime.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The new hardware has arrived. How do you start the BMR process?',
        options: [
          {
            id: 'opt1',
            text: 'Select the recovery point and prepare a Datto Utilities USB drive to boot the new hardware.',
            isCorrect: true,
            feedback: 'Correct! The Datto Utilities environment is required to image the new hardware from the appliance.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Install Windows Server from scratch and manually copy files over.',
            isCorrect: false,
            feedback: 'Incorrect. A Bare Metal Restore will clone the entire OS, applications, and data, saving hours of work.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The restore completes successfully. What is the final step?',
        options: [
          {
            id: 'opt1',
            text: 'Boot the server, install new drivers, verify network connectivity, and unmount the virtualization.',
            isCorrect: true,
            feedback: 'Correct! Ensuring drivers are updated and testing connectivity is crucial before switching users back to the physical hardware.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Leave the virtualization running alongside the physical server.',
            isCorrect: false,
            feedback: 'Incorrect. Running both will cause network conflicts and data divergence.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-retention-issue',
    moduleId: 'datto-backup',
    title: 'Running out of storage, retention policy review',
    description: 'A Datto device is at 95% capacity. You need to resolve the storage issue.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You receive an alert that the local Datto appliance is almost full. What do you check first?',
        options: [
          {
            id: 'opt1',
            text: 'Check the storage usage in the device UI to see which agents are consuming the most space.',
            isCorrect: true,
            feedback: 'Correct! Identifying the primary consumer of storage helps you target your troubleshooting.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Format the drive to start fresh.',
            isCorrect: false,
            feedback: 'Incorrect. Formatting the drive deletes all backups, causing massive data loss.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You find one server taking up 80% of the space due to large daily changes. What should you do?',
        options: [
          {
            id: 'opt1',
            text: 'Review the retention settings and identify unnecessary snapshots that can be deleted safely.',
            isCorrect: true,
            feedback: 'Correct! Adjusting local retention and pruning old, unnecessary snapshots frees up space.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Stop backing up that server entirely.',
            isCorrect: false,
            feedback: 'Incorrect. Stopping backups leaves the server unprotected.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You have cleared some space, but need a long-term solution. What is best?',
        options: [
          {
            id: 'opt1',
            text: 'Adjust the retention policy to keep fewer local backups, relying more on cloud retention if appropriate.',
            isCorrect: true,
            feedback: 'Correct! Balancing local and cloud retention optimizes local storage while maintaining compliance.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Tell the client they can never save large files again.',
            isCorrect: false,
            feedback: 'Incorrect. This is not a practical solution for a business.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-offsite-sync',
    moduleId: 'datto-backup',
    title: 'Offsite replication is behind/failing',
    description: 'A Datto appliance is failing to sync its backups to the Datto Cloud.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You notice a device hasn\'t synced offsite in 3 days. What is the first thing to check?',
        options: [
          {
            id: 'opt1',
            text: 'Check the sync status and speed on the device\'s web interface.',
            isCorrect: true,
            feedback: 'Correct! Checking the current sync status will tell you if it\'s trying to sync, paused, or stalled.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Assume the cloud is down and ignore it.',
            isCorrect: false,
            feedback: 'Incorrect. If backups don\'t go offsite, the client is vulnerable to site-wide disasters.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The sync is running but very slowly. What could be the issue?',
        options: [
          {
            id: 'opt1',
            text: 'Identify potential bandwidth issues or throttling settings on the appliance/firewall.',
            isCorrect: true,
            feedback: 'Correct! Bandwidth limits or ISP throttling are common causes of slow offsite syncs.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Delete the cloud data to restart the sync.',
            isCorrect: false,
            feedback: 'Incorrect. Deleting cloud data destroys the offsite safety net and will require a massive full base image sync.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You adjust the throttling schedule to allow more bandwidth at night. What else should you do?',
        options: [
          {
            id: 'opt1',
            text: 'Verify cloud connectivity and monitor the sync to ensure it catches up.',
            isCorrect: true,
            feedback: 'Correct! Monitoring ensures your fix actually solved the problem.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Tell the client to buy a new internet connection immediately.',
            isCorrect: false,
            feedback: 'Incorrect. While a faster connection might help, you should verify if schedule changes fix it first.'
          }
        ]
      }
    }
  },
  {
    id: 'backup-stale-rp',
    moduleId: 'datto-backup',
    title: 'Recovery point is 5 days old, needs investigation',
    description: 'A server hasn\'t had a successful backup in 5 days. You must investigate.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The latest recovery point is 5 days old. How do you start?',
        options: [
          {
            id: 'opt1',
            text: 'Check the backup job history and agent logs to see why recent jobs failed.',
            isCorrect: true,
            feedback: 'Correct! The logs will indicate if it\'s a network issue, VSS error, or something else.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Force a backup manually without checking logs.',
            isCorrect: false,
            feedback: 'Incorrect. If the last 5 days failed, a manual backup will likely fail for the same reason.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The logs show the Datto appliance cannot reach the agent over the network. What do you do?',
        options: [
          {
            id: 'opt1',
            text: 'Find the root cause by checking server IP changes, firewall rules, or agent service status.',
            isCorrect: true,
            feedback: 'Correct! Network communication is required for the appliance to pull data from the agent.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Reinstall the entire OS on the server.',
            isCorrect: false,
            feedback: 'Incorrect. Reinstalling the OS is a drastic and unnecessary measure for a simple connectivity issue.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You find the Windows Firewall was turned back on by a group policy, blocking the agent port. How do you fix it?',
        options: [
          {
            id: 'opt1',
            text: 'Adjust the firewall/GPO to allow the port, then force a backup to verify.',
            isCorrect: true,
            feedback: 'Correct! Fixing the firewall rule and verifying with a manual backup ensures the issue is resolved permanently.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Turn off the server.',
            isCorrect: false,
            feedback: 'Incorrect. Turning off the server causes downtime.'
          }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'db-1', moduleId: 'datto-backup', question: 'What is a BCDR appliance?', answer: 'A Business Continuity and Disaster Recovery appliance provides local backups, offsite replication, and instant virtualization to ensure minimal downtime during a disaster.' },
  { id: 'db-2', moduleId: 'datto-backup', question: 'RPO vs RTO', answer: 'RPO (Recovery Point Objective) is the maximum acceptable data loss (e.g., 1 hour of data). RTO (Recovery Time Objective) is the maximum acceptable downtime (e.g., back online in 4 hours).' },
  { id: 'db-3', moduleId: 'datto-backup', question: 'Screenshot verification purpose', answer: 'It automatically boots the backup as a virtual machine and takes a picture of the login screen, proving the backup is healthy and bootable.' },
  { id: 'db-4', moduleId: 'datto-backup', question: 'Inverse chain technology', answer: 'Datto\'s proprietary method where every backup is stored in a fully constructed state, eliminating the need for full/incremental backup chains and reducing failure risks.' },
  { id: 'db-5', moduleId: 'datto-backup', question: 'Local vs offsite recovery', answer: 'Local recovery is used for fast restores when the physical site is intact. Offsite recovery is used when the entire site is destroyed or inaccessible (e.g., fire, flood).' },
  { id: 'db-6', moduleId: 'datto-backup', question: 'VSS (Volume Shadow Copy Service)', answer: 'A Windows service that allows application-aware backups by quiescing data, ensuring databases and files are backed up in a consistent state.' },
  { id: 'db-7', moduleId: 'datto-backup', question: 'Bare-metal restore process', answer: 'The process of restoring an entire system (OS, apps, data) onto entirely new hardware without needing to reinstall the operating system first.' },
  { id: 'db-8', moduleId: 'datto-backup', question: 'Retention policies', answer: 'Rules that dictate how long backups are kept locally and in the cloud, balancing storage usage against compliance and historical data needs.' },
  { id: 'db-9', moduleId: 'datto-backup', question: 'Agent-based vs agentless backup', answer: 'Agent-based installs software on the host OS. Agentless integrates directly with the hypervisor (like VMware or Hyper-V) to back up VMs without installing software on them.' },
  { id: 'db-10', moduleId: 'datto-backup', question: 'Offsite replication', answer: 'The process of securely transmitting local backups to the Datto Cloud to protect against site-wide disasters.' },
  { id: 'db-11', moduleId: 'datto-backup', question: 'Datto Cloud', answer: 'Datto\'s secure, purpose-built cloud infrastructure used for storing offsite backups and spinning up cloud virtualizations during a disaster.' },
  { id: 'db-12', moduleId: 'datto-backup', question: 'SIRIS vs ALTO differences', answer: 'SIRIS is a high-performance enterprise BCDR solution. ALTO is an entry-level solution for small businesses that relies on the cloud for virtualization.' },
  { id: 'db-13', moduleId: 'datto-backup', question: 'Backup verification', answer: 'The process of ensuring a backup is not only completed but also healthy and capable of being restored (e.g., through screenshot verification).' },
  { id: 'db-14', moduleId: 'datto-backup', question: 'Recovery point types', answer: 'Can refer to file-level restores, local virtualization, cloud virtualization, or bare-metal restores, depending on the disaster scenario.' },
  { id: 'db-15', moduleId: 'datto-backup', question: 'Storage management', answer: 'Monitoring appliance capacity, pruning unnecessary snapshots, and configuring retention policies to prevent the device from filling up.' },
  { id: 'db-16', moduleId: 'datto-backup', question: 'Backup frequency best practices', answer: 'Often set to hourly during business hours to maintain a tight RPO, though it depends on the client\'s specific data change rate and needs.' },
  { id: 'db-17', moduleId: 'datto-backup', question: 'Network-attached storage in BCDR', answer: 'Datto devices can act as a NAS for local file sharing, which is then automatically backed up to the cloud.' },
  { id: 'db-18', moduleId: 'datto-backup', question: 'Disaster recovery runbook importance', answer: 'A documented set of procedures ensuring technicians know exactly how to restore services quickly and efficiently during a crisis.' }
];


export const realTickets = [
  {
    id: 't-db-1',
    date: '2023-11-05T09:00:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Client reports that their local file server backup has been failing for three consecutive days with a VSS writer error.',
    initialThought: 'VSS writer issues usually mean something on the Windows server is hung and needs a restart, often the SQL or Exchange writers.',
    investigation: 'Logged into the BCDR appliance and checked the specific job logs. Verified the failure was "VSS_E_WRITERERROR_TIMEOUT". Logged onto the local server, ran vssadmin list writers, and found the Shadow Copy Optimization Writer was in a failed state.',
    resolution: 'Restarted the Volume Shadow Copy service and the associated dependent services. Re-ran vssadmin list writers to ensure it returned to a Stable state. Triggered a manual backup from the Datto appliance which completed successfully.',
    lessonsLearned: 'Always check vssadmin list writers first when Datto reports a VSS timeout. Rebooting the whole server isn\'t always necessary if you can just restart the VSS service.',
    fasterNextTime: 'Write an RMM script to automatically restart the VSS service and alert us before the backup fails completely.'
  },
  {
    id: 't-db-2',
    date: '2023-12-12T14:30:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Screenshot verification failed for the primary Domain Controller. The screenshot shows a BSOD with "INACCESSIBLE_BOOT_DEVICE".',
    initialThought: 'A BSOD on screenshot verify usually indicates a storage controller driver issue injected during the virtualization process on the Datto device.',
    investigation: 'Reviewed the screenshot. Attempted to manually mount and boot the VM on the Datto appliance using a different storage controller (switched from IDE to VirtIO). The VM booted successfully to the Windows login screen.',
    resolution: 'Updated the backup agent on the Domain Controller to the latest version. In the Datto appliance settings for that agent, permanently changed the default storage controller for virtualization to VirtIO. Forced a new backup and screenshot verify, which passed.',
    lessonsLearned: 'The default virtualization storage controller on Datto isn\'t always right for modern Windows Server versions. VirtIO or LSI Logic SAS often works better.',
    fasterNextTime: 'Standardize the agent deployment process to always explicitly set the storage controller rather than leaving it on Auto/IDE.'
  },
  {
    id: 't-db-3',
    date: '2024-01-20T11:15:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Client accidentally deleted an entire folder containing HR documents and needs it restored ASAP.',
    initialThought: 'Standard file restore. Should be quick if the Datto appliance is local and the backup is recent.',
    investigation: 'Logged into the Datto appliance. Found the snapshot from 1 hour prior to the reported deletion time. Mounted a File Restore for that snapshot.',
    resolution: 'Mapped the Datto appliance network share from my admin workstation. Located the deleted HR folder. Used robocopy to restore the folder with original NTFS permissions back to the server. Unmounted the restore on the appliance.',
    lessonsLearned: 'Always use robocopy with the /SEC flag when doing file restores to ensure NTFS permissions are preserved, otherwise HR files might inherit incorrect parent permissions.',
    fasterNextTime: 'Use the Datto RMM integration to trigger a file restore directly rather than manually mapping network drives.'
  }
];
