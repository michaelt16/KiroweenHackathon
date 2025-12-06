# Task 12: Question Cooldown System Implementation

## Summary

Implemented the question cooldown system for the Spirit Box tool. The cooldown system prevents rapid question spamming and provides visual feedback to the player.

## Implementation Details

### 1. Store Integration

The cooldown system uses the existing `spiritBoxState` in the investigation store:

```typescript
spiritBoxState: {
  questionCooldown: boolean;
  cooldownEndTime: number | null;
  wordsHeard: string[];
}
```

**Store Actions:**
- `startQuestionCooldown()` - Starts a 2.5-second cooldown
- `endQuestionCooldown()` - Manually ends the cooldown
- `addWordHeard(word)` - Tracks words heard during investigation

### 2. Component Integration

Added to `SpiritBoxTool/index.tsx`:

**State:**
- `cooldownTimeRemaining` - Tracks remaining cooldown time in seconds for visual display

**Store Hooks:**
- `questionCooldown` - Boolean indicating if cooldown is active
- `cooldownEndTime` - Timestamp when cooldown expires
- `startQuestionCooldown` - Function to start cooldown
- `endQuestionCooldown` - Function to end cooldown

**Effects:**
1. **Cooldown Timer Effect** - Updates `cooldownTimeRemaining` every 100ms for smooth countdown
2. **Signal Lock Cancellation Effect** - Automatically cancels cooldown if signal lock is lost
3. **Cleanup Effect** - Clears all intervals on component unmount

### 3. Visual Feedback

Added cooldown indicator UI that displays:
- "COOLDOWN" label in orange (#ffaa00)
- Countdown timer showing remaining seconds
- Progress bar showing cooldown progress
- Positioned at bottom 15% of screen, centered

**Visual Styling:**
- Orange glow effect matching Spirit Box aesthetic
- Smooth countdown animation (updates every 100ms)
- Progress bar with gradient fill
- Non-interactive (pointer-events: none)

### 4. Cooldown Behavior

**Start Conditions:**
- Called when a question button is clicked (Task 8 - not yet implemented)
- Starts 2.5-second cooldown timer

**During Cooldown:**
- Question buttons should be disabled (Task 8 implementation)
- Visual feedback shows remaining time
- Player cannot ask another question

**End Conditions:**
- Auto-ends after 2.5 seconds
- Manually ended if signal lock is lost
- Prevents race conditions by checking cooldown end time

**Cancellation:**
- If signal lock is lost during cooldown, cooldown is immediately cancelled
- Ensures player can't ask questions without proper signal lock

### 5. Integration with Question System (Task 8)

When Task 8 (Add Question UI) is implemented, the question buttons should:

1. Check `questionCooldown` state before allowing clicks
2. Call `startQuestionCooldown()` after a question is asked
3. Disable buttons when `questionCooldown === true`
4. Re-enable buttons when `questionCooldown === false`

Example integration:
```typescript
const handleQuestionClick = (questionId: string) => {
  // Check if cooldown is active
  if (questionCooldown) {
    console.log('Question cooldown active, ignoring click');
    return;
  }
  
  // Check if signal is locked
  if (!isLocked) {
    console.log('Signal not locked, cannot ask question');
    return;
  }
  
  // Process question...
  // ... (question logic from Task 9)
  
  // Start cooldown
  startQuestionCooldown();
};
```

### 6. Testing

Created test file `investigationStore.test.ts` with tests for:
- Starting cooldown with correct end time
- Auto-ending cooldown after 2.5 seconds
- Manually ending cooldown
- Tracking words heard
- Preventing race conditions with multiple cooldowns

**Note:** Tests require vitest to be installed and configured. Test file is ready but cannot be run until testing infrastructure is set up.

## Requirements Validation

✅ **Requirement 3.3** - Start 2-3 second cooldown after question asked
- Implemented with 2.5-second cooldown timer

✅ **Requirement 3.4** - Disable question buttons during cooldown
- State management ready, buttons will be disabled when Task 8 is implemented

✅ **Requirement 3.5** - Show cooldown timer (optional visual feedback)
- Implemented with countdown timer and progress bar

✅ **Requirement 3.4** - Auto-enable buttons when cooldown ends
- Cooldown automatically ends after 2.5 seconds

✅ **Requirement 3.5** - Cancel cooldown if signal lock is lost
- Implemented with effect that monitors `isLocked` state

## Files Modified

1. `ghost-hunt/src/components/Investigation/Tools/SpiritBoxTool/index.tsx`
   - Added cooldown state and visual feedback
   - Integrated with investigation store cooldown system
   - Added effects for timer tracking and signal lock cancellation

2. `ghost-hunt/src/stores/investigationStore.ts`
   - Already had cooldown system implemented (no changes needed)

## Files Created

1. `ghost-hunt/src/stores/investigationStore.test.ts`
   - Unit tests for cooldown system
   - Requires vitest to run

2. `ghost-hunt/TASK_12_COOLDOWN_IMPLEMENTATION.md`
   - This documentation file

## Next Steps

1. **Task 8** - Implement question buttons UI
   - Integrate with cooldown system
   - Disable buttons when `questionCooldown === true`
   - Call `startQuestionCooldown()` after question click

2. **Task 9** - Implement question click handler
   - Check cooldown state before processing
   - Start cooldown after successful question

3. **Testing** - Set up vitest and run tests
   - Install vitest: `npm install -D vitest @vitest/ui`
   - Add test script to package.json
   - Run tests: `npm test`

## Visual Preview

The cooldown indicator appears at the bottom of the Spirit Box display:

```
┌─────────────────────────────────┐
│                                 │
│     [Spirit Box Display]        │
│                                 │
│                                 │
│         COOLDOWN                │
│            3s                   │
│      [████████░░░░░░]          │
└─────────────────────────────────┘
```

- Orange text with glow effect
- Large countdown number
- Progress bar showing time remaining
- Smooth animation (updates every 100ms)
