import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'bullphish-id',
  name: 'BullPhish ID',
  description: 'Security awareness training and phishing simulation.',
  iconName: 'FishSymbol',
  color: 'bg-orange-500',
  order: 8,
};
export const scenarios: Scenario[] = [];
export const cards: Flashcard[] = [];
