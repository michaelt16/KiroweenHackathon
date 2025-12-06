# Spec 009 Radar Design Fix

## Issue

Spec 009 (Investigation UI Transformation) had conflicting requirements with Spec 006 (The Hunt: Compass & GPS) regarding the Radar tool functionality.

### The Problem

- **Spec 006** defines Radar as **direction-only** detection (compass-based)
- **Spec 009** tasks included "Add range indicator" which would show distance
- This violated the core gameplay principle: **Radar = direction, EMF = distance**

## Root Cause

The original RadarToolMock had a "RNG: 150m" indicator that was copied into the spec, but this contradicts the intended gameplay design from Spec 006.

## What Was Fixed

### 1. Created Steering Document (010-radar-design.md)

Added persistent context document that defines:
- ✅ Radar shows DIRECTION only, NOT distance
- ✅ Ghost blip appears ONLY when in ±45° forward cone
- ✅ Range rings are visual reference only (NO distance labels)
- ✅ Displays "HDG: XXX°" and "TARGET: XXX°" (when visible)
- ✅ NO distance indicators anywhere

### 2. Updated Spec 009 Tasks (tasks.md)

**Changed:**
```markdown
- Add range indicator (bottom-right, CRT-style text)
```

**To:**
```markdown
- Add target bearing indicator (bottom-center, shows "TARGET: XXX°" ONLY when ghost is in forward cone)
- Add north indicator (rotates to always point north)
```

**Also clarified:**
```markdown
- Implement range rings (3 circles: 50px, 100px, 150px radius) - NO distance labels, visual reference only
```

### 3. Updated Spec 009 Design (design.md)

**Fixed RadarToolProps interface:**
```typescript
// BEFORE (WRONG)
interface RadarToolProps {
  ghostBearing: number;
  ghostDistance: number;  // ❌ Should not be here
  playerHeading: number;
  isGhostMoving: boolean;
}

// AFTER (CORRECT)
interface RadarToolProps {
  ghostBearing: number;        // 0-360 degrees (direction to ghost)
  playerHeading: number;       // 0-360 degrees (player facing direction)
  isGhostInCone: boolean;      // Is ghost within ±45° forward cone?
  isGhostMoving: boolean;
  sweepSpeed?: number;
}
```

**Fixed RadarData interface:**
```typescript
// BEFORE (WRONG)
interface RadarData {
  ghostBearing: number;
  ghostDistance: number;  // ❌ Should not be here
  playerHeading: number;
  isGhostMoving: boolean;
}

// AFTER (CORRECT)
interface RadarData {
  ghostBearing: number;       // 0-360 degrees (direction to ghost)
  isGhostInCone: boolean;     // Is ghost within ±45° forward cone?
  playerHeading: number;      // 0-360 degrees (player facing direction)
  isGhostMoving: boolean;
  // NOTE: ghostDistance is NOT included - Radar shows direction only (Spec 006)
}
```

**Added Important Design Note:**
```markdown
**Important Design Note (from Spec 006):**
- **Radar shows DIRECTION only, NOT distance**
- Ghost blip appears ONLY when within ±45° forward cone
- Range rings are visual reference only (NO distance labels)
- Displays "HDG: XXX°" for player heading
- Displays "TARGET: XXX°" for ghost bearing (only when in cone)
- NO distance indicators anywhere (no "120m", "RNG: 150m", etc.)
- This is fundamental to gameplay: Radar = direction, EMF = distance
```

## Why This Matters

### Gameplay Design

The separation of information is **fundamental** to the gameplay loop:

| Tool | Shows | Doesn't Show |
|------|-------|--------------|
| **Radar** | Direction (bearing) | Distance |
| **EMF** | Distance (proximity) | Direction |

This forces players to:
1. **Spin with Radar** → Find which direction to face
2. **Walk with EMF** → Close the distance by listening to beeps
3. **Switch between tools** → Strategic tool juggling

If Radar showed distance, players would never need EMF, breaking the core gameplay loop.

### Physical Gameplay

- **Radar requires rotation** - Spin your body to scan
- **EMF requires walking** - Move in real space to close distance
- **Together** - Hunt the ghost like a real investigator

## Implementation Impact

### What Needs to Change

1. **Remove "RNG: 150m" indicator** from RadarTool component
2. **Add "TARGET: XXX°" indicator** that only shows when ghost is in cone
3. **Add north indicator** that always points north
4. **Ensure range rings have NO labels** (they're visual reference only)
5. **Update props interface** to use `isGhostInCone` instead of `ghostDistance`

### What Stays the Same

- ✅ All visual enhancements (CRT glow, scanlines, static, bloom)
- ✅ Sweep animation (rotates with player heading)
- ✅ Ghost blip (red pulsing dot)
- ✅ Range rings (circles for visual reference)
- ✅ Heading display ("HDG: XXX°")
- ✅ All damage and texture elements

## Next Steps

1. Update RadarTool component to remove distance indicators
2. Add target bearing indicator (conditional on `isGhostInCone`)
3. Add north indicator
4. Update props to match new interface
5. Test with investigation context integration

## Files Modified

- ✅ `.kiro/steering/010-radar-design.md` (NEW - persistent context)
- ✅ `.kiro/specs/009-investigation-ui-transformation/tasks.md` (fixed task 3.2)
- ✅ `.kiro/specs/009-investigation-ui-transformation/design.md` (fixed props and data models)

## Files That Need Updates

- ⏳ `ghost-hunt/src/components/Investigation/Tools/RadarTool.tsx` (remove RNG indicator, add TARGET indicator)
- ⏳ `ghost-hunt/src/ui-playground/tools/RadarToolMock.tsx` (reference implementation - should be updated too)

## Summary

The radar is a **compass**, not a **GPS**. It tells you **which way to turn**, not **how far to walk**. This is now properly documented and enforced across all specs.

---

**Status**: Spec 009 Fixed
**Authority**: Aligned with Spec 006
**Last Updated**: 2024
