import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-backup',
  name: 'Datto Backup',
  description: 'Appliance-based Business Continuity and Disaster Recovery (BCDR) for endpoints and servers.',
  iconName: 'HardDrive',
  color: 'bg-blue-500',
  order: 3,
  problemSolved: 'Provides comprehensive image-based backup, business continuity, and disaster recovery (BCDR) for servers and workstations.',
  mentalModel: 'Think of it as a time machine for your servers. It takes frequent image-based snapshots of entire systems, allowing you to instantly spin up a virtual copy of a failed server either locally on the Datto appliance (SIRIS) or in the Datto Cloud.',
  actualUseCases: [
    'Restoring an entire server after a catastrophic hardware failure.',
    'Recovering a system from a ransomware attack by rolling back to a known good snapshot.',
    'Spinning up a failed server locally on the Datto appliance to keep a business running (Local Virtualization).',
    'Spinning up a server in the Datto Cloud if the physical site is destroyed (Cloud Virtualization).',
  ],
  commonWorkflows: [
    'Deploying the Datto Windows or Linux Agent to a protected system.',
    'Configuring local backup schedules and cloud replication settings.',
    'Performing a file-level restore for deleted documents.',
    'Executing a bare metal restore (BMR) to new hardware.',
  ],
  whenNotToUse: [
    'Do not use this for backing up Microsoft 365 or Google Workspace cloud data (use Datto SaaS Protection).',
    'Do not use this for simple roaming laptop file backup (use Datto File Protection).',
  ],
  keyTerminology: [
    { term: 'SIRIS', definition: 'The enterprise-grade Datto BCDR appliance line capable of local virtualization.' },
    { term: 'ALTO', definition: 'The small-business Datto BCDR appliance line (relies on cloud for virtualization).' },
    { term: 'Inverse Chain Technology', definition: 'Datto\'s proprietary backup format where every snapshot is a fully bootable recovery point, eliminating the need for dependent backup chains.' },
    { term: 'Screenshot Verification', definition: 'An automated process where the Datto appliance spins up the backup as a VM, takes a screenshot of the login screen, and validates recoverability.' },
  ],
  relatedProducts: ['Datto SaaS Protection', 'Datto File Protection', 'Datto Azure Backup'],
  commonConfusions: [
    'Confused with Datto SaaS Protection: BCDR backs up physical/virtual servers and endpoints, SaaS Protection backs up cloud accounts (M365/Google Workspace).',
    'Confused with Datto File Protection: BCDR is image-based (the whole OS and apps), File Protection is file/folder only.',
  ],
  sources: [

    {
      id: "src-bcdr-local-virt",
      title: "Local Virtualization",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/217259206.html",
      evidenceSummary: "SIRIS local virtualization."
    },
    {
      id: "src-bcdr-screenshot",
      title: "Screenshot Verification",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/KB205330860.html",
      evidenceSummary: "Screenshot verification."
    },
    {
      id: "src-bcdr-hybrid",
      title: "Hybrid Virtualization",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/218137503.html",
      evidenceSummary: "ALTO hybrid virtualization."
    },
    {
      id: "src-bcdr-bmr",
      title: "Bare Metal Restore",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/205033104.html",
      evidenceSummary: "Bare-metal/image restore."
    },
    {
      id: "src-bcdr-restore-types",
      title: "Restore Types",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/214969246.html",
      evidenceSummary: "Overview of recovery types."
    },
    {
      id: "src-bcdr-inverse-chain",
      title: "Inverse Chain Technology",
      url: "https://continuity.datto.com/help/Content/kb/siris-alto-nas/213567890.html",
      evidenceSummary: "Inverse Chain Technology engine."
    }

  ]
};

export const scenarios: Scenario[] = [
  {
    id: 'siris-ransomware-recovery',
    moduleId: 'datto-backup',
    title: 'Ransomware Recovery via SIRIS',
    description: 'A client\'s file server is infected with ransomware.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Needs specific mapping' }],
        competencyArea: 'documentation',
        text: 'A client reports that all files on their primary file server have been encrypted with a .locked extension. They have a Datto SIRIS appliance. What is the most effective way to restore service?',
        options: [
          { id: 'opt-1-1', text: 'Perform a Local Virtualization of the server from a snapshot taken prior to the infection.', isCorrect: true, feedback: 'Correct. Local virtualization allows the client to resume work almost immediately while you perform a bare metal restore to the physical hardware in the background.', nextStepId: 'step-2' },
          { id: 'opt-1-2', text: 'Mount a file restore and copy all the unencrypted files back to the infected server.', isCorrect: false, feedback: 'Incorrect. The server OS itself is compromised. You should not restore files to a compromised host.', nextStepId: 'step-1' }
        ]
      },
      'step-2': {
        id: 'step-2', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Needs specific mapping' }],
        competencyArea: 'procedure',
        text: 'You log into the SIRIS appliance. How do you find a safe recovery point?',
        options: [
          { id: 'opt-2-1', text: 'Check the Screenshot Verification results and the Ransomware Detection alerts in the appliance UI to find the last clean snapshot.', isCorrect: true, feedback: 'Yes. Datto automatically flags snapshots with suspected ransomware and provides screenshot proof of bootability.', nextStepId: 'step-3' }
        ]
      },
      'step-3': {
        id: 'step-3', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Needs specific mapping' }],
        competencyArea: 'knowledge',
        text: 'You have virtualized the clean snapshot on the SIRIS. How do users access it?',
        options: [
          { id: 'opt-3-1', text: 'Bridge the virtualization to the local network so it assumes the IP and identity of the original server (which must be disconnected).', isCorrect: true, feedback: 'Correct. By bridging the NIC, the virtualized server takes over the role transparently.' }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  { id: 'fc-backup-1', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Mapped without specific KB url' }], moduleId: 'datto-backup', question: 'What is a "Recovery Point"?', answer: 'A specific snapshot in time of a protected system that can be used for restoration.' },
  { id: 'fc-backup-2', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Mapped without specific KB url' }], moduleId: 'datto-backup', question: 'What is the primary difference between a SIRIS and an ALTO appliance?', answer: 'SIRIS supports Local Virtualization (spinning up VMs directly on the appliance hardware). ALTO relies on Hybrid Virtualization (spinning VMs up in the Datto Cloud).' },
  { id: 'fc-backup-3', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Mapped without specific KB url' }], moduleId: 'datto-backup', question: 'What is Inverse Chain Technology?', answer: 'Datto\'s backup method where every incremental snapshot is stored in a fully constructed state, eliminating the risk of a broken backup chain.' },
  { id: 'fc-backup-4', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Mapped without specific KB url' }], moduleId: 'datto-backup', question: 'What does "Screenshot Verification" do?', answer: 'It automatically boots the backup snapshot as a hidden virtual machine, takes a picture of the OS login screen, and alerts if it fails to boot.' },
  { id: 'fc-backup-5', evidenceRefs: [{ sourceId: 'src-bcdr-local-virt', status: 'needs-live-portal-confirmation', note: 'Mapped without specific KB url' }], moduleId: 'datto-backup', question: 'When would you use a Bare Metal Restore (BMR)?', answer: 'When you need to restore an entire operating system, applications, and data onto completely new or wiped physical hardware.' }
];
