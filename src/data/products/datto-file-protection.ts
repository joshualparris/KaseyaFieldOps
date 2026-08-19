import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-file-protection',
  name: 'Datto File Protection',
  description: 'Secure, reliable file backup for endpoints.',
  iconName: 'FileLock2',
  color: 'bg-indigo-500',
  order: 5,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
