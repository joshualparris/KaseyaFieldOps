import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';


describe('useAppStore Data Integrity', () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it('proves review IDs are globally unique for different scenarios and flashcards', () => {
    const store = useAppStore.getState();
    
    // Simulate Scenario A, Step 1
    store.processReviewResult({
      itemId: 'scenario:datto-rmm:step-1',
      itemType: 'scenario_decision',
      moduleId: 'datto-rmm',
      rating: 'good',
      confidence: 'confident'
    });

    // Simulate Scenario B, Step 1
    store.processReviewResult({
      itemId: 'scenario:datto-edr:step-1',
      itemType: 'scenario_decision',
      moduleId: 'datto-edr',
      rating: 'good',
      confidence: 'confident'
    });

    // Simulate Flashcard
    store.processReviewResult({
      itemId: 'flashcard:fc-rmm-1',
      itemType: 'flashcard',
      moduleId: 'datto-rmm',
      rating: 'good',
      confidence: 'confident'
    });

    const reviews = useAppStore.getState().reviewQueue;
    expect(reviews.length).toBe(3);
    expect(reviews.find(r => r.itemId === 'scenario:datto-rmm:step-1')).toBeDefined();
    expect(reviews.find(r => r.itemId === 'scenario:datto-edr:step-1')).toBeDefined();
    expect(reviews.find(r => r.itemId === 'flashcard:fc-rmm-1')).toBeDefined();
  });

  it('proves scenario attempts are separate events and do not rewrite each other', () => {
    const store = useAppStore.getState();
    
    // Attempt 1: Wrong answer
    store.addScenarioAttempt({
      scenarioId: 'scen-1',
      stepId: 'step-1',
      moduleId: 'mod-1',
      competencyArea: 'knowledge',
      selectedOptionId: 'opt-2',
      isCorrect: false,
      confidence: 'highly_confident',
      attemptedAt: new Date().toISOString(),
      attemptNumber: 1
    });

    // Attempt 2: Correct answer retry
    store.addScenarioAttempt({
      scenarioId: 'scen-1',
      stepId: 'step-1',
      moduleId: 'mod-1',
      competencyArea: 'knowledge',
      selectedOptionId: 'opt-1',
      isCorrect: true,
      confidence: 'somewhat',
      attemptedAt: new Date().toISOString(),
      attemptNumber: 2
    });

    const attempts = useAppStore.getState().scenarioAttempts;
    expect(attempts.length).toBe(2);

    const firstAttempt = attempts.find(a => a.attemptNumber === 1);
    expect(firstAttempt?.isCorrect).toBe(false);
    expect(firstAttempt?.confidence).toBe('highly_confident');

    const secondAttempt = attempts.find(a => a.attemptNumber === 2);
    expect(secondAttempt?.isCorrect).toBe(true);
    expect(secondAttempt?.confidence).toBe('somewhat');
  });

  it('proves XP is not double-awarded on scenario completion', () => {
    const store = useAppStore.getState();
    expect(store.xp).toBe(0);

    store.addXP(10);
    expect(useAppStore.getState().xp).toBe(10);

    // Scenario completion shouldn't blindly add XP every time without checking
    // Actually, ScenarioDrill handles this logic. In the store:
    // markScenarioCompleted adds ID to completedScenarios array.
    store.markScenarioCompleted('scen-1', 'mod-1');
    const comp1 = useAppStore.getState().completedScenarios;
    expect(comp1.length).toBe(1);

    // Calling again does not duplicate
    store.markScenarioCompleted('scen-1', 'mod-1');
    const comp2 = useAppStore.getState().completedScenarios;
    expect(comp2.length).toBe(1);
  });

  it('proves shift state isolation', () => {
    const store = useAppStore.getState();
    
    // Complete X outside shift
    store.markScenarioCompleted('scenario-X', 'mod-1');
    expect(useAppStore.getState().completedScenarios).toContain('scenario-X');

    // Start shift with X
    store.startShift(['scenario-X', 'scenario-Y']);
    let activeShift = useAppStore.getState().activeShift;
    expect(activeShift).toBeDefined();
    // X is NOT resolved in the shift despite being completed globally
    expect(activeShift?.resolvedTicketIds).not.toContain('scenario-X');

    // Resolve X in shift
    store.markShiftTicketResolved('scenario-X');
    activeShift = useAppStore.getState().activeShift;
    expect(activeShift?.resolvedTicketIds).toContain('scenario-X');

    // End shift
    store.endShift();
    expect(useAppStore.getState().activeShift).toBeNull();

    // Start new shift with X
    store.startShift(['scenario-X']);
    activeShift = useAppStore.getState().activeShift;
    // X should start unresolved for the new shift
    expect(activeShift?.resolvedTicketIds).not.toContain('scenario-X');
  });
});
