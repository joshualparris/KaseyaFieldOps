import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  iconName: z.string(),
  color: z.string(),
  order: z.number(),
});

export type AppModule = z.infer<typeof ModuleSchema>;

export const FlashcardSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  question: z.string(),
  answer: z.string(),
});

export type Flashcard = z.infer<typeof FlashcardSchema>;

export const ScenarioStepSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.object({
    id: z.string(),
    text: z.string(),
    isCorrect: z.boolean(),
    feedback: z.string(),
    nextStepId: z.string().optional(),
  })),
});

export type ScenarioStep = z.infer<typeof ScenarioStepSchema>;

export const ScenarioSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  description: z.string(),
  firstStepId: z.string(),
  steps: z.record(z.string(), ScenarioStepSchema),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export const UserStateSchema = z.object({
  xp: z.number(),
  completedScenarios: z.array(z.string()),
  moduleProgress: z.record(z.string(), z.number()),
  reviewQueue: z.array(z.object({
    cardId: z.string(),
    nextReviewDate: z.string(),
    interval: z.number(),
    easeFactor: z.number(),
  })),
});

export type UserState = z.infer<typeof UserStateSchema>;

export const RealTicketCaseSchema = z.object({
  id: z.string(),
  date: z.string(), // ISO date
  moduleId: z.string(),
  symptoms: z.string(),
  initialThought: z.string(),
  investigation: z.string(),
  resolution: z.string(),
  lessonsLearned: z.string(),
  fasterNextTime: z.string(),
});
export type RealTicketCase = z.infer<typeof RealTicketCaseSchema>;
