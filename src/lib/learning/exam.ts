import { aggregatedScenarios, aggregatedCards } from '../../data/products';
// Removed unused imports

export type ExamQuestionType = 'multiple_choice' | 'flashcard';

export interface ExamOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ExamQuestion {
  id: string; // Unique ID for the exam question
  type: ExamQuestionType;
  moduleId: string;
  questionText: string;
  options?: ExamOption[]; // For multiple choice
  correctAnswerText?: string; // For flashcards
  referenceId: string; // ID of the original scenario step or flashcard
  scenarioId?: string; // If it belongs to a scenario
}

export interface ExamConfig {
  moduleIds: string[];
  questionCount: number;
  isTimed: boolean;
  timeLimitMinutes?: number;
}

export function generateExamSession(config: ExamConfig): ExamQuestion[] {
  const availableQuestions: ExamQuestion[] = [];

  // Extract Scenario Steps
  const filteredScenarios = aggregatedScenarios.filter(s => config.moduleIds.includes(s.moduleId));
  filteredScenarios.forEach(scenario => {
    Object.values(scenario.steps).forEach(step => {
      // Only use steps that have options as multiple choice questions
      if (step.options && step.options.length > 0) {
        availableQuestions.push({
          id: `exam-mc-${scenario.id}-${step.id}`,
          type: 'multiple_choice',
          moduleId: scenario.moduleId,
          questionText: step.text,
          options: step.options.map(o => ({
            id: o.id,
            text: o.text,
            isCorrect: o.isCorrect,
            feedback: o.feedback || (o.isCorrect ? 'Correct.' : 'Incorrect.'),
          })),
          referenceId: step.id,
          scenarioId: scenario.id,
        });
      }
    });
  });

  // Extract Flashcards
  const filteredCards = aggregatedCards.filter(c => config.moduleIds.includes(c.moduleId));
  filteredCards.forEach(card => {
    availableQuestions.push({
      id: `exam-fc-${card.id}`,
      type: 'flashcard',
      moduleId: card.moduleId,
      questionText: card.question,
      correctAnswerText: card.answer,
      referenceId: card.id,
    });
  });

  // Shuffle and pick
  const shuffled = [...availableQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
}
