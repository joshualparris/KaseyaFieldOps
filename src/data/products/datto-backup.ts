
import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-backup',
  name: 'Datto Backup (BCDR)',
  description: 'Appliance-based (physical/virtual SIRIS/ALTO) image backup. Features Inverse Chain Technology, local virtualization, and immutable cloud storage.',
  iconName: 'HardDrive',
  color: 'bg-blue-600',
  order: 3
};

export const scenarios: Scenario[] = [
  {
    id: 'db-adv-verify',
    moduleId: 'datto-backup',
    title: 'Screenshot verification passes but the app doesn\'t actually work',
    description: 'A daily boot screenshot shows the Windows login screen, but a critical SQL-based application inside the VM is failing to start on restore.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client is angry. "Your report said the backup booted perfectly, but our database is corrupted!" What is your immediate diagnostic step?',
        options: [
          { id: 'opt1', text: 'Explain that the basic screenshot verification only proves the OS can boot, not that internal services successfully started.', isCorrect: true, feedback: 'Correct. Standard screenshot verification only guarantees OS bootablity.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Assume the hypervisor on the Datto appliance is faulty and reboot the appliance.', isCorrect: false, feedback: 'Incorrect. The hypervisor successfully booted the OS; the issue is application-level consistency.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'How do you prevent this from happening on future backups for this server?',
        options: [
          { id: 'opt1', text: 'Configure Advanced Verification scripts on the Datto appliance to log in and query the SQL service after boot.', isCorrect: true, feedback: 'Correct. Advanced Verification runs custom scripts to validate application health.', nextStepId: 'step3' },
          { id: 'opt2', text: 'Increase the RAM allocated to the VM during the verification boot.', isCorrect: false, feedback: 'While lack of RAM can cause services to fail, Advanced Verification is the proper way to explicitly prove the app works.' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What must you do to ensure the Advanced Verification script can actually run?',
        options: [
          { id: 'opt1', text: 'Provide valid guest OS credentials in the Datto appliance settings so the script can authenticate.', isCorrect: true, feedback: 'Yes! Advanced Verification requires guest credentials to run internal checks.' }
        ]
      }
    }
  },
  {
    id: 'db-tighter-rpo',
    moduleId: 'datto-backup',
    title: 'Client wants tighter RPO after a data-loss scare',
    description: 'A client lost 45 minutes of work and is demanding backups every 5 minutes instead of hourly.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client asks, "Why can\'t we just backup every 5 minutes?" What is the primary technical trade-off to explain?',
        options: [
          { id: 'opt1', text: 'More frequent backups (tighter RPO) consume significantly more appliance storage and local network/disk IO bandwidth.', isCorrect: true, feedback: 'Correct. Datto supports 5-minute RPOs, but it requires the infrastructure to support the IO load.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Datto does not support RPOs tighter than 1 hour.', isCorrect: false, feedback: 'Incorrect. Datto supports RPOs as granular as 5 minutes.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You agree to tighten the schedule. Where do you configure this?',
        options: [
          { id: 'opt1', text: 'In the Local Backup & Retention policy for the specific agent on the Datto appliance web interface.', isCorrect: true, feedback: 'Correct.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What should you monitor over the next 24 hours after changing the RPO to 15 minutes?',
        options: [
          { id: 'opt1', text: 'Monitor if backups are queueing up or overlapping, meaning the server can\'t snapshot fast enough.', isCorrect: true, feedback: 'Exactly. Overlapping backups indicate the server cannot sustain the tighter RPO.' }
        ]
      }
    }
  },
  {
    id: 'db-time-pressure',
    moduleId: 'datto-backup',
    title: 'Restoring under time pressure — full VM vs single file',
    description: 'The CEO accidentally deleted an important Excel file 10 minutes before a board meeting.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The CEO calls demanding the file back immediately. What is the fastest recovery method?',
        options: [
          { id: 'opt1', text: 'Mount a Local File Restore on the Datto appliance and access the network share.', isCorrect: true, feedback: 'Correct. A File Restore is instantaneous and doesn\'t require booting an OS.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Spin up a Local Virtualization of the server so the CEO can RDP in.', isCorrect: false, feedback: 'Incorrect. Booting a full VM takes minutes; File Restore takes seconds.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You mount the File Restore. How do you get the file to the CEO?',
        options: [
          { id: 'opt1', text: 'Access the SMB share provided by the Datto appliance, copy the file, and email/transfer it to the CEO.', isCorrect: true, feedback: 'Correct. The appliance exposes the snapshot as an SMB/NFS share.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'After the CEO gets the file, what must you remember to do?',
        options: [
          { id: 'opt1', text: 'Unmount the File Restore on the appliance to free up resources and avoid locking the snapshot.', isCorrect: true, feedback: 'Correct. Always unmount restores when finished.' }
        ]
      }
    }
  },
  {
    id: 'db-ransomware-false-positive',
    moduleId: 'datto-backup',
    title: 'Backup Ransomware Detection flags a false positive',
    description: 'The Datto appliance alerts that Ransomware was detected on the latest backup of the file server.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You receive the Ransomware alert. You check the EDR on the file server, but it shows no active threats. What is likely happening?',
        options: [
          { id: 'opt1', text: 'Datto\'s detection looks for anomalous mass file changes. A legitimate bulk operation like legitimate programs uncharacteristically updating files might have triggered it.', isCorrect: true, feedback: 'Correct. Datto identifies patterns of change in particular ransomware-targeted file types, which can flag false positives on legitimate uncharacteristic file updates.', nextStepId: 'step2' },
          { id: 'opt2', text: 'The EDR agent is broken and failing to report the ransomware.', isCorrect: false, feedback: 'Possible, but given Datto\'s heuristic, a false positive from bulk changes is highly likely and must be verified.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'How do you verify if it is a false positive?',
        options: [
          { id: 'opt1', text: 'Mount a File Restore of the flagged snapshot, inspect the files to see if they are actually encrypted or just moved/renamed.', isCorrect: true, feedback: 'Correct. Inspect the backup contents directly.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You confirm it was just a script compressing old logs. How do you resolve the alert?',
        options: [
          { id: 'opt1', text: 'Dismiss the alert in the Datto appliance UI so it stops alerting for that specific snapshot.', isCorrect: true, feedback: 'Correct. Dismissing the false positive clears the error state.' }
        ]
      }
    }
  },
  {
    id: 'db-inverse-chain',
    moduleId: 'datto-backup',
    title: 'Explaining Inverse Chain Technology to a skeptical client',
    description: 'A client is reviewing their DR plan and asks why they don\'t need to worry about "synthetic fulls" taking all weekend.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client says: "My last IT guy said restoring from incrementals takes hours because you have to rebuild the chain. Why is Datto different?"',
        options: [
          { id: 'opt1', text: 'Explain that Inverse Chain Technology makes every snapshot a fully independent recovery point.', isCorrect: true, feedback: 'Correct. Datto uses ZFS snapshots referencing the base image and block changes without needing a traditional incremental-chain rebuild.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Explain that Datto does take synthetic fulls, but it has a faster CPU.', isCorrect: false, feedback: 'Incorrect. Inverse Chain eliminates the need for traditional synthetic full rebuilds entirely.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The client asks: "Does that mean every snapshot takes up the space of a full backup?"',
        options: [
          { id: 'opt1', text: 'No, it only stores the changed blocks (incrementals), but the filesystem links them instantly to look like a full drive.', isCorrect: true, feedback: 'Correct. ZFS snapshots referencing the base image and block changes make this possible (Datto does not use ZFS deduplication).', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'What is the primary benefit of this during a disaster?',
        options: [
          { id: 'opt1', text: 'There is no traditional incremental-chain rebuild time. You can spin up a VM from a snapshot instantaneously.', isCorrect: true, feedback: 'Correct. Instant virtualization is the core benefit of Inverse Chain.' }
        ]
      }
    }
  },
  {
    id: 'db-immutable-storage',
    moduleId: 'datto-backup',
    title: 'Immutable storage — client asks to delete old backups themselves',
    description: 'A client wants administrative access to the Datto Cloud portal to manually delete older backups for "compliance" reasons.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'Why should you strongly advise against giving the client direct deletion access?',
        options: [
          { id: 'opt1', text: 'The storage is WORM (Write Once Read Many). Uncontrolled deletion access bypasses ransomware protections.', isCorrect: true, feedback: 'Correct. Immutability is the primary defense against threat actors wiping backups.', nextStepId: 'step2' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The client asks, "What if a hacker gets your MSP admin password and deletes everything?"',
        options: [
          { id: 'opt1', text: 'Explain Cloud Deletion Defense, which retains deleted snapshots in a hidden state for a grace period even after an admin deletes them.', isCorrect: true, feedback: 'Correct. CDD is the safety net for malicious admin actions.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The client insists on removing a specific drive from the backups for compliance. How is this done?',
        options: [
          { id: 'opt1', text: 'Exclude the volume in the backup policy, and manually request support to purge the historical data if absolutely required.', isCorrect: true, feedback: 'Correct. Historical purges require careful, verified processes.' }
        ]
      }
    }
  },
  {
    id: 'db-local-vs-cloud',
    moduleId: 'datto-backup',
    title: 'Local vs cloud recovery point selection',
    description: 'A building fire destroys the client\'s server room, but the Datto appliance was in a separate fireproof closet and survived.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The local servers are destroyed. You need to spin up the Domain Controller. Should you virtualize it locally on the surviving Datto appliance, or in the Datto Cloud?',
        options: [
          { id: 'opt1', text: 'Locally on the Datto appliance, because local virtualization provides much faster LAN access and uses the most recent RPO.', isCorrect: true, feedback: 'Correct. If the local appliance survives, local virtualization is almost always faster.', nextStepId: 'step2' },
          { id: 'opt2', text: 'Datto Cloud, because the primary servers are destroyed.', isCorrect: false, feedback: 'Incorrect. If the appliance survived and has power/network, local is faster.' }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The fire department cuts power to the entire block an hour later. The local appliance goes offline. Now what?',
        options: [
          { id: 'opt1', text: 'Failover to the Datto Cloud and boot the last offsite sync point.', isCorrect: true, feedback: 'Correct. The Cloud is your secondary fallback when the local appliance is unavailable.', nextStepId: 'step3' }
        ]
      },
      step3: {
        id: 'step3',
        text: 'When the local appliance comes back online days later, what happens to the cloud data?',
        options: [
          { id: 'opt1', text: 'You can perform a failback, syncing the delta changes from the Cloud VM back down to the local appliance.', isCorrect: true, feedback: 'Correct. Cloud-to-local failback restores the changes made while running in the cloud.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'db-c1', moduleId: 'datto-backup', question: 'What does standard Screenshot Verification actually prove?', answer: 'It proves the OS is bootable and reaches the login screen, but does not guarantee internal applications started correctly.' },
  { id: 'db-c2', moduleId: 'datto-backup', question: 'What is Advanced Verification?', answer: 'A feature that runs custom scripts during the verification boot to log in and explicitly check if services/apps (like SQL) are responding.' },
  { id: 'db-c3', moduleId: 'datto-backup', question: 'What is Inverse Chain Technology?', answer: 'Datto\'s ZFS-based snapshotting where every incremental backup is stored as a fully independent recovery point in a non-bootable state, and made bootable when a restore/virtualization is brought up, without needing a traditional incremental-chain rebuild.' },
  { id: 'db-c4', moduleId: 'datto-backup', question: 'How does Inverse Chain Technology affect recovery speed?', answer: 'It eliminates the conversion and chain-rebuilding time, enabling instant local virtualization.' },
  { id: 'db-c5', moduleId: 'datto-backup', question: 'What does WORM immutable storage protect against?', answer: 'Ransomware or threat actors altering or encrypting the backup data after it has been written.' },
  { id: 'db-c6', moduleId: 'datto-backup', question: 'What is Cloud Deletion Defense (CDD)?', answer: 'A safety net that retains deleted cloud snapshots in a hidden state for a grace period, protecting against malicious or accidental admin deletions.' },
  { id: 'db-c7', moduleId: 'datto-backup', question: 'What is the default Datto Backup schedule?', answer: 'Hourly.' },
  { id: 'db-c8', moduleId: 'datto-backup', question: 'What is the most granular RPO available on Datto?', answer: '5-minute increments.' },
  { id: 'db-c9', moduleId: 'datto-backup', question: 'What does Datto\'s backup-side Ransomware Detection look for?', answer: 'Patterns of changes in specific file types, such as random overwrites and ransomware-like modification behaviour.' },
  { id: 'db-c10', moduleId: 'datto-backup', question: 'What is the fastest way to recover a single deleted file?', answer: 'Local File Restore (mounting the snapshot as an SMB share).' },
  { id: 'db-c11', moduleId: 'datto-backup', question: 'What happens to the backup agent if the storage controller is incompatible during virtualization?', answer: 'The VM may BSOD (often INACCESSIBLE_BOOT_DEVICE or 0x7B). Datto recommends testing SATA, SCSI, or VirtIO storage controllers in the agent settings depending on OS compatibility.' },
  { id: 'db-c12', moduleId: 'datto-backup', question: 'Why must you unmount File Restores when finished?', answer: 'To free up appliance resources and ensure the snapshot isn\'t locked for future operations.' },
  { id: 'db-c13', moduleId: 'datto-backup', question: 'When should you choose Cloud Virtualization over Local Virtualization?', answer: 'When the local appliance is destroyed, offline, or lacks the resources to boot the required VMs.' },
  { id: 'db-c14', moduleId: 'datto-backup', question: 'What is a Failback?', answer: 'The process of syncing data changes made in a Cloud VM back to the local environment after the disaster is resolved.' },
  { id: 'db-c15', moduleId: 'datto-backup', question: 'How do you handle a false positive from Datto Ransomware Detection?', answer: 'Verify the files in a File Restore, then dismiss the alert in the appliance UI.' },
  { id: 'db-c16', moduleId: 'datto-backup', question: 'What credentials are required for Advanced Verification?', answer: 'Guest OS credentials (Windows administrator) configured in the appliance.' }
];

export const realTickets = [
  {
    id: 't-db-1',
    date: '2023-11-05T09:00:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Backup failing for 3 days with VSS writer error.',
    initialThought: 'VSS writer issues usually mean a hung Windows service.',
    investigation: 'Checked logs, found VSS_E_WRITERERROR_TIMEOUT. Ran vssadmin list writers.',
    resolution: 'Restarted VSS services and ran manual backup successfully.',
    lessonsLearned: 'Always check vssadmin list writers first.',
    fasterNextTime: 'Write an RMM script to restart VSS on failure.'
  },
  {
    id: 't-db-2',
    date: '2023-12-12T14:30:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Screenshot verification BSOD.',
    initialThought: 'Storage controller driver issue.',
    investigation: 'Manually mounted with VirtIO controller and booted.',
    resolution: 'Tested different storage controllers and found SATA/SCSI/VirtIO resolved the boot failure.',
    lessonsLearned: 'Default IDE isn\'t always right for modern OS.',
    fasterNextTime: 'Standardize agent deployment settings.'
  },
  {
    id: 't-db-3',
    date: '2024-01-20T11:15:00Z',
    moduleId: 'datto-backup',
    symptoms: 'Deleted HR folder.',
    initialThought: 'Standard file restore via SMB.',
    investigation: 'Found snapshot from 1 hour prior.',
    resolution: 'Mapped drive, used robocopy to restore with NTFS permissions.',
    lessonsLearned: 'Always use robocopy with /SEC flag.',
    fasterNextTime: 'Use Datto RMM integration to trigger restore.'
  }
];
