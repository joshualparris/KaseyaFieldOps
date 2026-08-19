import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-backup',
  name: 'Datto Backup',
  description: 'BCDR and Endpoint backup solutions.',
  iconName: 'HardDrive',
  color: 'bg-blue-500',
  order: 3,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [
  {
    id: 'fc-backup-1',
    moduleId: 'datto-backup',
    question: 'What is a "Recovery Point"?',
    answer: 'A specific snapshot in time of a protected system that can be used for restoration.',
  }
];
