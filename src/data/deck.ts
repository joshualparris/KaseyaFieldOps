import { Flashcard } from './types';

export const deck: Flashcard[] = [
  {
    id: 'fc-rmm-1',
    moduleId: 'datto-rmm',
    question: 'What is the primary purpose of Datto RMM?',
    answer: 'Remote Monitoring and Management: managing endpoints, running remote actions, patching, and monitoring device health proactively.',
  },
  {
    id: 'fc-rmm-2',
    moduleId: 'datto-rmm',
    question: 'Where would you look in Datto RMM to see if a device is online?',
    answer: 'The Device Summary page or the Devices list, looking for the green online indicator next to the hostname.',
  },
  {
    id: 'fc-edr-1',
    moduleId: 'datto-edr',
    question: 'What does "Isolation" mean in Datto EDR?',
    answer: 'Cutting off the endpoint\'s network access to everything except the Datto EDR management console to contain a threat while allowing investigation.',
  },
  {
    id: 'fc-backup-1',
    moduleId: 'datto-backup',
    question: 'What is a "Recovery Point"?',
    answer: 'A specific snapshot in time of a protected system that can be used for restoration.',
  },
  {
    id: 'fc-inky-1',
    moduleId: 'inky',
    question: 'What does a Yellow INKY banner indicate?',
    answer: 'Caution. It highlights something unusual, like a first-time sender or external sender, but not necessarily malicious.',
  },
  {
    id: 'fc-inky-2',
    moduleId: 'inky',
    question: 'What does a Red INKY banner indicate?',
    answer: 'Danger. The email is highly likely to be malicious, phishing, or a scam. Links and attachments are often disabled.',
  }
];
