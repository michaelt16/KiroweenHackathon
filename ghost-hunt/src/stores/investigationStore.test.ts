import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useInvestigationStore } from './investigationStore';

describe('Investigation Store - Question Cooldown System', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useInvestigationStore.setState({
      spiritBoxState: {
        questionCooldown: false,
        cooldownEndTime: null,
        wordsHeard: [],
      },
    });
    
    // Use fake timers
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    // Restore real timers
    vi.useRealTimers();
  });
  
  it('should start question cooldown with correct end time', () => {
    const store = useInvestigationStore.getState();
    const startTime = Date.now();
    
    store.startQuestionCooldown();
    
    const state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(true);
    expect(state.spiritBoxState.cooldownEndTime).toBeGreaterThan(startTime);
    expect(state.spiritBoxState.cooldownEndTime).toBeLessThanOrEqual(startTime + 2500);
  });
  
  it('should auto-end cooldown after 2.5 seconds', () => {
    const store = useInvestigationStore.getState();
    
    store.startQuestionCooldown();
    
    // Verify cooldown is active
    let state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(true);
    
    // Fast-forward time by 2.5 seconds
    vi.advanceTimersByTime(2500);
    
    // Verify cooldown ended
    state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(false);
    expect(state.spiritBoxState.cooldownEndTime).toBe(null);
  });
  
  it('should manually end cooldown', () => {
    const store = useInvestigationStore.getState();
    
    store.startQuestionCooldown();
    
    // Verify cooldown is active
    let state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(true);
    
    // Manually end cooldown
    store.endQuestionCooldown();
    
    // Verify cooldown ended
    state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(false);
    expect(state.spiritBoxState.cooldownEndTime).toBe(null);
  });
  
  it('should track words heard', () => {
    const store = useInvestigationStore.getState();
    
    store.addWordHeard('behind');
    store.addWordHeard('cold');
    store.addWordHeard('here');
    
    const state = useInvestigationStore.getState();
    expect(state.spiritBoxState.wordsHeard).toEqual(['behind', 'cold', 'here']);
  });
  
  it('should not end cooldown prematurely if cooldown time does not match', () => {
    const store = useInvestigationStore.getState();
    
    // Start first cooldown
    store.startQuestionCooldown();
    const firstCooldownTime = useInvestigationStore.getState().spiritBoxState.cooldownEndTime;
    
    // Fast-forward 1 second
    vi.advanceTimersByTime(1000);
    
    // Start second cooldown (simulating rapid question clicks)
    store.startQuestionCooldown();
    const secondCooldownTime = useInvestigationStore.getState().spiritBoxState.cooldownEndTime;
    
    // Verify second cooldown time is different
    expect(secondCooldownTime).not.toBe(firstCooldownTime);
    
    // Fast-forward to when first cooldown would have ended
    vi.advanceTimersByTime(1500);
    
    // Verify cooldown is still active (because second cooldown is still running)
    const state = useInvestigationStore.getState();
    expect(state.spiritBoxState.questionCooldown).toBe(true);
    
    // Fast-forward to when second cooldown ends
    vi.advanceTimersByTime(1000);
    
    // Verify cooldown ended
    const finalState = useInvestigationStore.getState();
    expect(finalState.spiritBoxState.questionCooldown).toBe(false);
  });
});
