import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-azure-backup',
  name: 'Datto Backup for Microsoft Azure',
  description: 'Cloud-to-cloud backup for Azure workloads.',
  iconName: 'Cloud',
  color: 'bg-cyan-600',
  order: 4,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
