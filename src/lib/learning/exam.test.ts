import { describe, it, expect } from 'vitest';
import { generateExamSession } from './exam';

describe('Learning Engine: Exam Session Generation', () => {
  it('generates an exam with correct number of questions', () => {
    // Generate a 10-question exam across all modules
    const config = {
      moduleIds: ['datto-rmm', 'datto-edr', 'kaseya-365', 'inky'],
      questionCount: 10,
      isTimed: false,
    };
    const session = generateExamSession(config);
    expect(session.length).toBeLessThanOrEqual(10);
    expect(session.length).toBeGreaterThan(0);
  });

  it('filters questions by module', () => {
    const config = {
      moduleIds: ['inky'],
      questionCount: 50, // More than what INKY has
      isTimed: false,
    };
    const session = generateExamSession(config);
    
    // All returned questions should have moduleId 'inky'
    const nonInky = session.filter(q => q.moduleId !== 'inky');
    expect(nonInky.length).toBe(0);
    expect(session.length).toBeGreaterThan(0);
  });

  it('returns no duplicates', () => {
    const config = {
      moduleIds: ['datto-rmm', 'datto-edr', 'kaseya-365', 'inky'],
      questionCount: 50,
      isTimed: false,
    };
    const session = generateExamSession(config);
    const ids = session.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
});
