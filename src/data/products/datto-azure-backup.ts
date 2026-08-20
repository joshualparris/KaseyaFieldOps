import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-azure-backup',
  name: 'Datto Backup for Microsoft Azure',
  description: 'Cloud-native backup for Azure VMs, SQL databases, and Azure workloads.',
  iconName: 'Cloud',
  color: 'bg-cyan-600',
  order: 4
};

export const scenarios: Scenario[] = [
  {
    id: 'azure-vm-backup-config',
    moduleId: 'datto-azure-backup',
    title: 'Configure backup for a new Azure VM',
    description: 'A new Azure VM was provisioned. You need to configure its backup policy.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A new Azure VM needs to be protected. What is your first step?',
        options: [
          {
            id: 'opt1',
            text: 'Select the VM in the Datto Azure Backup portal and initiate the protection workflow.',
            isCorrect: true,
            feedback: 'Correct! The portal allows you to easily discover and protect unmanaged VMs.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Install a physical Datto SIRIS device in the Azure datacenter.',
            isCorrect: false,
            feedback: 'Incorrect. Azure Backup is a cloud-native solution and does not use physical hardware.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You are setting up the protection. What must you configure?',
        options: [
          {
            id: 'opt1',
            text: 'Configure the backup policy, defining schedule and retention settings.',
            isCorrect: true,
            feedback: 'Correct! The policy dictates how often the VM is backed up and how long those backups are kept.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Set the VM to shut down during every backup.',
            isCorrect: false,
            feedback: 'Incorrect. Cloud backups utilize snapshots and do not require the VM to be shut down.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The policy is applied. What is the final step?',
        options: [
          {
            id: 'opt1',
            text: 'Verify the initial backup completes successfully.',
            isCorrect: true,
            feedback: 'Correct! Always verify the initial full backup completes to ensure the VM is protected.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Delete the VM to test a restore immediately.',
            isCorrect: false,
            feedback: 'Incorrect. Never delete a production VM just to test a backup!'
          }
        ]
      }
    }
  },
  {
    id: 'azure-restore-vm',
    moduleId: 'datto-azure-backup',
    title: 'Restore failed Azure VM from backup',
    description: 'An Azure VM has failed due to a bad update. You need to restore it.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'An Azure VM has failed to boot after an update. What do you do?',
        options: [
          {
            id: 'opt1',
            text: 'Identify the failure time and select a recovery point from just before the update.',
            isCorrect: true,
            feedback: 'Correct! Selecting a clean recovery point is critical to resolving the issue.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Rebuild the VM from scratch manually.',
            isCorrect: false,
            feedback: 'Incorrect. Restoring from backup is much faster and retains all configurations and data.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You found the correct recovery point. How do you restore the VM?',
        options: [
          {
            id: 'opt1',
            text: 'Choose the appropriate restore type (e.g., replace existing VM or create new VM).',
            isCorrect: true,
            feedback: 'Correct! Depending on the situation, you may want to overwrite the broken VM or spin up a new one side-by-side.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Download the VHD file to your local laptop.',
            isCorrect: false,
            feedback: 'Incorrect. Downloading cloud disks locally is extremely slow and unnecessary when restoring within Azure.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The restore process has finished. What now?',
        options: [
          {
            id: 'opt1',
            text: 'Boot the restored VM and verify services and connectivity.',
            isCorrect: true,
            feedback: 'Correct! Always confirm the restored VM is functioning normally before closing the ticket.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Assume it works and close the ticket.',
            isCorrect: false,
            feedback: 'Incorrect. Always verify the restore was successful.'
          }
        ]
      }
    }
  },
  {
    id: 'azure-sql-recovery',
    moduleId: 'datto-azure-backup',
    title: 'Azure SQL database corruption, need point-in-time restore',
    description: 'A client\'s Azure SQL database suffered logical corruption.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A user ran a script that corrupted an Azure SQL database. What is your first step?',
        options: [
          {
            id: 'opt1',
            text: 'Identify the exact time the corruption occurred to find the correct recovery point.',
            isCorrect: true,
            feedback: 'Correct! Point-in-time restores require knowing exactly when the bad transaction happened.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Delete the SQL database immediately.',
            isCorrect: false,
            feedback: 'Incorrect. Never delete the original database until the restore is confirmed successful.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You have identified the time. How do you proceed?',
        options: [
          {
            id: 'opt1',
            text: 'Initiate a point-in-time restore of the database to a new database name.',
            isCorrect: true,
            feedback: 'Correct! Restoring to a new database allows you to verify the data without overwriting the current state.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Restore the entire VM hosting the SQL server.',
            isCorrect: false,
            feedback: 'Incorrect. For Azure SQL (PaaS) or targeted SQL restores, restoring the whole VM is unnecessary and disruptive.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'The database is restored. What is the final step?',
        options: [
          {
            id: 'opt1',
            text: 'Verify the data with the client, then point the application to the new database.',
            isCorrect: true,
            feedback: 'Correct! Verifying data and repointing the app ensures a smooth recovery.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Leave the old corrupted database active for the application.',
            isCorrect: false,
            feedback: 'Incorrect. The application needs to connect to the recovered database.'
          }
        ]
      }
    }
  },
  {
    id: 'azure-backup-cost',
    moduleId: 'datto-azure-backup',
    title: 'Azure backup costs spike unexpectedly',
    description: 'The monthly Azure backup bill has doubled. You need to investigate and optimize.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'You notice a spike in Azure Backup costs. How do you investigate?',
        options: [
          {
            id: 'opt1',
            text: 'Review usage reports to identify which VMs or policies are driving up storage consumption.',
            isCorrect: true,
            feedback: 'Correct! Understanding where the storage is being used is key to controlling costs.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Cancel all backups immediately to save money.',
            isCorrect: false,
            feedback: 'Incorrect. Canceling backups exposes the client to massive risk.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'You find a large VM is backing up hourly and retaining data for 5 years. What should you do?',
        options: [
          {
            id: 'opt1',
            text: 'Optimize the backup policy to match business requirements, perhaps reducing frequency or retention.',
            isCorrect: true,
            feedback: 'Correct! Aligning the policy with actual business needs (not over-retaining) saves costs.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Shrink the VM\'s disks.',
            isCorrect: false,
            feedback: 'Incorrect. Shrinking disks is difficult, risky, and doesn\'t solve the retention policy issue.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'You have adjusted the policy. What is the next step?',
        options: [
          {
            id: 'opt1',
            text: 'Monitor the storage consumption over the next billing cycle to verify savings.',
            isCorrect: true,
            feedback: 'Correct! Verification ensures your changes had the intended financial impact.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Tell the client they can never restore data older than a week.',
            isCorrect: false,
            feedback: 'Incorrect. You must balance cost with realistic compliance requirements.'
          }
        ]
      }
    }
  },
  {
    id: 'azure-vs-onprem',
    moduleId: 'datto-azure-backup',
    title: 'Client asks whether to use Azure backup or on-prem BCDR',
    description: 'A client is migrating to the cloud and wants advice on backup strategy.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'A client asks if they need an on-prem Datto SIRIS for their new Azure VMs. What is your response?',
        options: [
          {
            id: 'opt1',
            text: 'Assess their workload location. Cloud-native workloads should use Datto Backup for Azure.',
            isCorrect: true,
            feedback: 'Correct! Cloud workloads are best protected by cloud-native backup solutions to avoid egress fees and latency.',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Tell them to buy an on-prem SIRIS and VPN it to Azure.',
            isCorrect: false,
            feedback: 'Incorrect. Backing up Azure VMs to an on-prem device is inefficient and costly due to bandwidth usage.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The client wants to know the difference in features. What do you explain?',
        options: [
          {
            id: 'opt1',
            text: 'Compare features: Azure backup focuses on cloud recovery, while SIRIS provides local virtualizations.',
            isCorrect: true,
            feedback: 'Correct! Understanding the specific feature sets helps the client make an informed choice.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Tell them they are exactly the same product.',
            isCorrect: false,
            feedback: 'Incorrect. They use different technologies tailored to their respective environments.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'How do you finalize the recommendation?',
        options: [
          {
            id: 'opt1',
            text: 'Make a recommendation based on their architecture (Azure Backup for their cloud infrastructure).',
            isCorrect: true,
            feedback: 'Correct! Recommending the right tool for the right environment builds trust.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Tell them they don\'t need backups in the cloud because Azure is highly available.',
            isCorrect: false,
            feedback: 'Incorrect. High availability does not protect against ransomware or accidental deletion.'
          }
        ]
      }
    }
  },
  {
    id: 'azure-cross-region',
    moduleId: 'datto-azure-backup',
    title: 'Need cross-region restore for compliance',
    description: 'A client requires backups to be stored in a different geographic region for compliance.',
    firstStepId: 'step1',
    steps: {
      step1: {
        id: 'step1',
        text: 'The client requests compliance with a mandate requiring geographically separated backups. What do you do?',
        options: [
          {
            id: 'opt1',
            text: 'Check the current backup vault configuration to see its replication settings.',
            isCorrect: true,
            feedback: 'Correct! You must determine if the vault is currently LRS (Local) or GRS (Geo-Redundant).',
            nextStepId: 'step2'
          },
          {
            id: 'opt2',
            text: 'Manually copy files to an AWS bucket.',
            isCorrect: false,
            feedback: 'Incorrect. You should use built-in Azure features to ensure compliance and automation.',
            nextStepId: 'step2'
          }
        ]
      },
      step2: {
        id: 'step2',
        text: 'The vault is currently locally redundant. How do you fix this?',
        options: [
          {
            id: 'opt1',
            text: 'Enable geo-redundancy (GRS) and Cross Region Restore (CRR) for the vault.',
            isCorrect: true,
            feedback: 'Correct! Enabling CRR ensures backups are replicated to a secondary region and can be restored there.',
            nextStepId: 'step3'
          },
          {
            id: 'opt2',
            text: 'Create a new VM in another region and sync files with Robocopy.',
            isCorrect: false,
            feedback: 'Incorrect. This is unmanaged, brittle, and not a true enterprise backup solution.'
          }
        ]
      },
      step3: {
        id: 'step3',
        text: 'Geo-redundancy is enabled. How do you prove compliance?',
        options: [
          {
            id: 'opt1',
            text: 'Test a restore in the secondary region and document the success for the client.',
            isCorrect: true,
            feedback: 'Correct! Testing the restore proves the configuration works and satisfies compliance auditors.',
            nextStepId: undefined
          },
          {
            id: 'opt2',
            text: 'Just send them a screenshot of the settings page.',
            isCorrect: false,
            feedback: 'Incorrect. A screenshot doesn\'t prove the restore process actually works.'
          }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'ab-1', moduleId: 'datto-azure-backup', question: 'Azure backup vs on-prem BCDR differences', answer: 'Azure Backup is cloud-native, designed to protect workloads already in Azure. On-prem BCDR requires physical appliances to protect local servers.' },
  { id: 'ab-2', moduleId: 'datto-azure-backup', question: 'Azure VM backup fundamentals', answer: 'It uses Azure VM extensions to take application-consistent snapshots of the VM\'s disks without requiring downtime.' },
  { id: 'ab-3', moduleId: 'datto-azure-backup', question: 'Azure-specific recovery options', answer: 'Options include creating a new VM, restoring disks to attach to an existing VM, or file-level recovery directly from the cloud snapshot.' },
  { id: 'ab-4', moduleId: 'datto-azure-backup', question: 'Cloud restore time expectations', answer: 'Generally faster than downloading offsite backups to an on-prem location, as data stays within the Azure backbone, but depends on VM size.' },
  { id: 'ab-5', moduleId: 'datto-azure-backup', question: 'Azure backup agents', answer: 'The Microsoft Azure Recovery Services (MARS) agent or VM extensions are used to coordinate the backup process within the guest OS.' },
  { id: 'ab-6', moduleId: 'datto-azure-backup', question: 'Geo-redundant storage (GRS)', answer: 'A storage option that replicates backup data to a secondary Azure region hundreds of miles away to protect against regional outages.' },
  { id: 'ab-7', moduleId: 'datto-azure-backup', question: 'Azure recovery vault', answer: 'A storage entity in Azure that houses data such as backup copies, recovery points, and backup policies.' },
  { id: 'ab-8', moduleId: 'datto-azure-backup', question: 'Backup scheduling in Azure', answer: 'Policies define when snapshots are taken (e.g., daily at 2 AM) and how long they are retained based on daily, weekly, monthly, and yearly rules.' },
  { id: 'ab-9', moduleId: 'datto-azure-backup', question: 'Cost management', answer: 'Costs are driven by the amount of backend storage consumed. Optimizing retention policies and cleaning up orphaned snapshots reduces costs.' },
  { id: 'ab-10', moduleId: 'datto-azure-backup', question: 'Azure SQL backup', answer: 'Provides built-in, automated backups for Azure SQL databases, supporting point-in-time restores up to the minute.' },
  { id: 'ab-11', moduleId: 'datto-azure-backup', question: 'Cross-region restore', answer: 'A feature that allows you to restore Azure VMs and databases in a secondary region if the primary region goes down.' },
  { id: 'ab-12', moduleId: 'datto-azure-backup', question: 'Managed disk snapshots', answer: 'Point-in-time, read-only copies of managed disks used as the foundation for Azure VM backups.' },
  { id: 'ab-13', moduleId: 'datto-azure-backup', question: 'Azure backup monitoring', answer: 'Using the Azure Portal or Datto integrations to track backup job success/failure and generate alerts for missing backups.' },
  { id: 'ab-14', moduleId: 'datto-azure-backup', question: 'Backup encryption in Azure', answer: 'Backup data is encrypted at rest automatically using Microsoft-managed keys or customer-managed keys for enhanced security.' },
  { id: 'ab-15', moduleId: 'datto-azure-backup', question: 'Azure Policy for backup compliance', answer: 'Using Azure Policy to automatically enforce that all new VMs are assigned a backup policy upon creation.' },
  { id: 'ab-16', moduleId: 'datto-azure-backup', question: 'Differences from Datto BCDR appliance', answer: 'No physical hardware needed, no local network bottleneck, and deeply integrated with Azure Resource Manager APIs.' }
];


export const realTickets = [
  {
    id: 't-ab-1',
    date: '2024-02-10T10:00:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Azure VM backup job is taking 12+ hours to complete and causing performance degradation on the VM.',
    initialThought: 'The backup is likely taking a full snapshot instead of an incremental, or the Azure storage account IOPS are bottlenecking.',
    investigation: 'Checked the Datto Azure Backup logs. Found that CBT (Changed Block Tracking) was disabled due to a previous agent crash, forcing a full hash of the disk over the network. Also checked Azure Monitor and saw high Disk Queue Length.',
    resolution: 'Reinstalled the Datto Azure Backup agent to repair the CBT driver. Scheduled a maintenance window to run the subsequent full backup during off-hours. After the full backup finished, incrementals returned to 5-minute durations.',
    lessonsLearned: 'CBT driver failures in Azure environments are disastrous for backup performance because of the way Azure meters disk IOPS.',
    fasterNextTime: 'Set up an alert for backup duration exceeding 2 hours so we catch CBT failures before the client complains about performance.'
  },
  {
    id: 't-ab-2',
    date: '2024-03-05T13:45:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Client wants to restore an Azure VM to a different region (East US to West US) for a disaster recovery test.',
    initialThought: 'Datto Azure Backup stores data in the SIRIS Cloud, so we can restore it anywhere, but we need to ensure the target Azure subscription and VNet are configured correctly.',
    investigation: 'Logged into the Datto Cloud portal. Initiated a cloud virtualization. Realized the client\'s Azure subscription didn\'t have a VNet set up in West US, so the restored VM wouldn\'t have connectivity.',
    resolution: 'Created a new Resource Group and VNet in West US. Configured the Datto restore job to target that specific Resource Group and VNet. Booted the VM and verified connectivity via a temporary VPN gateway.',
    lessonsLearned: 'Cross-region restores require Azure infrastructure prep (VNets, Subnets, NSGs) before the Datto restore can actually complete successfully.',
    fasterNextTime: 'Pre-build a "DR-Test" Resource Group in the alternate region using Terraform or ARM templates so it\'s always ready.'
  },
  {
    id: 't-ab-3',
    date: '2024-04-12T16:20:00Z',
    moduleId: 'datto-azure-backup',
    symptoms: 'Azure backup billing is unexpectedly high this month.',
    initialThought: 'Retention policies might be set too long, or the VM is generating a massive amount of churn (delta data).',
    investigation: 'Analyzed the Datto backup usage report. The protected size hadn\'t changed much, but the local Azure storage consumption for the backup cache had spiked. Discovered a temp SQL database was on the C: drive and churning 50GB a day.',
    resolution: 'Moved the temp SQL database to the Azure ephemeral temp drive (D:) and excluded that drive from the Datto backup policy. Deleted the stale large snapshots from the Datto cloud.',
    lessonsLearned: 'Always exclude Azure temp drives and SQL tempdb from backups. They churn data uselessly and inflate cloud storage costs.',
    fasterNextTime: 'Implement a deployment checklist that mandates SQL tempdb is placed on an excluded volume before backups are enabled.'
  }
];
