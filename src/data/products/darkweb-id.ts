import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'darkweb-id',
  name: 'DarkWeb ID',
  description: 'Compromised credential monitoring.',
  iconName: 'VenetianMask',
  color: 'bg-slate-800',
  order: 7,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
