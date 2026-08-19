import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-edr',
  name: 'Datto EDR',
  description: 'Endpoint Detection and Response.',
  iconName: 'ShieldAlert',
  color: 'bg-red-600',
  order: 2,
};

export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
