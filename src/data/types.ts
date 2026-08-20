import { z } from 'zod';

export type EvidenceStatus =
  | 'verified'
  | 'partially-verified'
  | 'official-sources-conflict'
  | 'general-practice'
  | 'needs-live-portal-confirmation'
  | 'unsupported';

export type EvidenceRef = {
  sourceId: string;
  status: EvidenceStatus;
  note?: string;
};

export type Source = {
  id: string;
  title: string;
  url?: string;
  verifiedAt?: string;
  evidenceSummary: string;
  relevantSection?: string;
};

export type ScenarioStep = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    nextStepId?: string;
  }[];
  evidenceRefs?: EvidenceRef[];
};

export type Scenario = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  firstStepId: string;
  steps: Record<string, ScenarioStep>;
};

export type Flashcard = {
  id: string;
  moduleId: string;
  question: string;
  answer: string;
  evidenceRefs?: EvidenceRef[];
};

export type RealTicketCase = {
  id: string;
  moduleId: string;
  symptom: string;
  investigation: string;
  resolution: string;
};

export type AppModule = {
  id: string;
  name: string;
  description: string;
  icon: string;
  sources?: Source[];
};

// Zod schemas for runtime validation
export const EvidenceStatusSchema = z.enum([
  'verified',
  'partially-verified',
  'official-sources-conflict',
  'general-practice',
  'needs-live-portal-confirmation',
  'unsupported'
]);

export const EvidenceRefSchema = z.object({
  sourceId: z.string(),
  status: EvidenceStatusSchema,
  note: z.string().optional()
});

export const SourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().optional(),
  verifiedAt: z.string().optional(),
  evidenceSummary: z.string(),
  relevantSection: z.string().optional()
});

export const ScenarioStepSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.object({
    id: z.string(),
    text: z.string(),
    isCorrect: z.boolean(),
    feedback: z.string(),
    nextStepId: z.string().optional()
  })),
  evidenceRefs: z.array(EvidenceRefSchema).optional()
});

export const ScenarioSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  description: z.string(),
  firstStepId: z.string(),
  steps: z.record(z.string(), ScenarioStepSchema)
});

export const FlashcardSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  question: z.string(),
  answer: z.string(),
  evidenceRefs: z.array(EvidenceRefSchema).optional()
});

export const RealTicketCaseSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  symptom: z.string(),
  investigation: z.string(),
  resolution: z.string()
});

export const AppModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  sources: z.array(SourceSchema).optional()
});
