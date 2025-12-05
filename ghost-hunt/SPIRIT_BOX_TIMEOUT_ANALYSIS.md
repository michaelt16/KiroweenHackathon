# Spirit Box Timeout & Cooldown Analysis

## Intended Flow

### When Word Appears:
1. User tunes correctly → `isLocked = true`
2. EMF is 3-5 → `canRespond = true`
3. Ghost responds → `setShowWord(true)`, `setCurrentWord(word)`
4. **Set timeout for 3 seconds** → `wordTimeoutRef.current = setTimeout(...)`
5. Word displays on screen for 3 seconds

### After 3 Seconds (Timeout Fires):
1. `setShowWord(false)` → Word disappears
2. `setCurrentWord('')` → Clear word text
3. `setIsLocked(false)` → Clear signal lock
4. `lockSpiritBox()` → Start 5-second cooldown
5. `generateNewSpiritBoxSignature()` → New random signature

### During 5-Second Cooldown:
1. `isSpiritBoxLocked()` returns `true`
2. "COOLDOWN..." message shows
3. Can't get new words (even if tuned correctly)
4. After 5 seconds → Auto-unlocks

## Current Implementation Issues

### Problem 1: useEffect Dependencies
The main useEffect (line 176) has these dependencies:
```typescript
}, [
  mode,
  knobA,        // ⚠️ Changes when user moves knobs
  knobB,        // ⚠️ Changes when user moves knobs
  relationship.isValid,
  relationship.ghostBehavior,
  dynamicSignature,  // ⚠️ Changes when signature regenerates
  emfLevel,
]);
```

**Issue:** When `knobA` or `knobB` changes (user moves knobs), the useEffect re-runs. Even though we preserve timeouts when `showWord` is true, the cleanup function might still clear them.

### Problem 2: Cleanup Function
```typescript
return () => {
  if (wordTimeoutRef.current) {
    clearTimeout(wordTimeoutRef.current);  // ⚠️ This clears timeout on re-run!
  }
  // ...
};
```

**Issue:** Every time the useEffect re-runs (due to dependency changes), the cleanup function runs FIRST, which clears the timeout before the new effect runs.

### Problem 3: isProcessingRef Check
```typescript
if (isProcessingRef.current) return;
```

**Issue:** If `isProcessingRef.current` is `true` when the useEffect runs again, it returns early and doesn't preserve the timeout logic.

## Proposed Solution

### Option 1: Separate useEffect for Timeout Management (RECOMMENDED)
- Create a dedicated useEffect that ONLY manages timeouts
- Only runs when `showWord` or `isWaitingForResponse` changes
- Doesn't clear timeouts unnecessarily

### Option 2: Use useRef for Timeout IDs (Current approach, but fix cleanup)
- Keep timeout refs
- Fix cleanup to NOT clear if word is showing
- Add guards to prevent clearing active timeouts

### Option 3: Move Timeout Logic Outside useEffect
- Use a separate function that sets timeouts
- Only call it when word appears (not in main useEffect)
- Less reactive, more explicit

## Recommended Fix: Option 1

Create a separate useEffect that:
1. Only watches `showWord` and `isWaitingForResponse`
2. Sets timeout when word appears
3. Cleans up timeout when word disappears or component unmounts
4. Doesn't interfere with main lock-checking useEffect

This separates concerns:
- **Main useEffect**: Checks lock status, triggers word generation
- **Timeout useEffect**: Manages word display timing and cleanup



