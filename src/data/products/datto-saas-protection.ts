import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-saas-protection',
  name: 'Datto SaaS Protection',
  description: 'Backup for Microsoft 365 and Google Workspace.',
  iconName: 'DatabaseBackup',
  color: 'bg-sky-500',
  order: 6,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
