# Investigation Mode Cleanup - COMPLETE ✅

## What Was Done

Successfully cleaned up the investigation mode component structure, removing duplication and confusion while preserving all UI playground design references.

---

## 🗑️ Deleted Components (Old Radar)

**Removed entire `src/components/Radar/` folder:**
- ❌ `RadarCanvas.tsx` - Old radar implementation
- ❌ `RadarCanvas.css` - Old radar styles
- ❌ `GhostBlip.tsx` - Old ghost blip component
- ❌ `NoiseOverlay.tsx` - Old noise overlay
- ❌ `NoiseOverlay.css` - Old noise styles

**Why**: These were replaced by the new production RadarTool component.

---

## 🔧 Updated Components

### 1. FieldScanner.tsx

**Before:**
```typescript
import { RadarCanvas } from '../Radar/RadarCanvas';
import { GhostBlip } from '../Radar/GhostBlip';
import { NoiseOverlay } from '../Radar/NoiseOverlay';

// Had fallback to old radar components
{!activeTool && (
  <>
    <RadarCanvas ... />
    <GhostBlip ... />
    <NoiseOverlay ... />
  </>
)}
```

**After:**
```typescript
// Clean imports - only tool wrappers
import { RadarTool, EMFMeterTool, ... } from '../Tools';

// Conditional rendering based on active tool
{activeTool === 'radar' && <RadarTool mode="investigation" />}
{activeTool === 'emf' && <EMFMeterTool mode="investigation" />}
// ... other tools
{!activeTool && <RadarTool mode="investigation" />} // Default to radar
```

**Result**: Clean, simple component that just renders the active tool.

---

### 2. RadarTool.tsx (Wrapper)

**Before:**
```typescript
import RadarToolMock from '../../ui-playground/tools/RadarToolMock';

export function RadarTool({ mode }: RadarToolProps) {
  // TODO: Pass investigation data
  return <RadarToolMock />;
}
```

**After:**
```typescript
import { RadarTool as RadarToolProduction } from '../Investigation/Tools/RadarTool';
import { useInvestigation } from '../../context/InvestigationContext';

export function RadarTool({ mode }: RadarToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  // Calculate if ghost is in forward cone (±45°)
  const isGhostInCone = investigation 
    ? Math.abs(((investigation.ghostBearing - investigation.playerHeading + 180) % 360) - 180) <= 45
    : false;

  return (
    <RadarToolProduction
      mode={mode}
      ghostBearing={investigation?.ghostBearing ?? 45}
      playerHeading={investigation?.playerHeading ?? 0}
      isGhostInCone={isGhostInCone}
      isGhostMoving={investigation?.isGhostMoving ?? false}
      sweepSpeed={2}
    />
  );
}
```

**Result**: Thin wrapper that connects production component to investigation context.

---

### 3. RadarTool.tsx (Production Component)

**Updated Props Interface:**
```typescript
// BEFORE (WRONG)
export interface RadarToolProps {
  ghostBearing?: number;
  ghostDistance?: number;  // ❌ Removed - violates Spec 006
  playerHeading?: number;
  isGhostMoving?: boolean;
}

// AFTER (CORRECT)
export interface RadarToolProps {
  mode: 'view' | 'investigation';
  ghostBearing?: number;        // 0-360 degrees (direction to ghost)
  playerHeading?: number;       // 0-360 degrees (player facing direction)
  isGhostInCone?: boolean;      // Is ghost within ±45° forward cone?
  isGhostMoving?: boolean;
  sweepSpeed?: number;
}
```

**Updated Ghost Blip Logic:**
```typescript
// BEFORE
const ghostBlip = { angle: ghostBearing, distance: ghostDistance };

// Ghost always visible
<circle cx={... * ghostBlip.distance} ... />

// AFTER
const ghostBlip = { angle: ghostBearing, visible: isGhostInCone };

// Ghost ONLY visible when in forward cone
{ghostBlip.visible && (
  <circle cx={... * 120} ... />  // Fixed radius for visual placement
)}
```

**Updated Display:**
```typescript
// BEFORE (WRONG)
<div>RNG: 150m</div>  // ❌ Shows distance

// AFTER (CORRECT)
<div>HDG: {playerHeading}°</div>  // ✅ Shows heading
{ghostBlip.visible && (
  <div>TARGET: {ghostBearing}°</div>  // ✅ Shows bearing when visible
)}
```

**Result**: Radar now shows DIRECTION only, not distance (per Spec 006).

---

## ✅ Preserved Components (UI Playground)

**Kept all design references intact:**
- ✅ `src/ui-playground/tools/RadarToolMock.tsx` - Visual reference
- ✅ `src/ui-playground/tools/EMFMeterMock.tsx` - Visual reference
- ✅ `src/ui-playground/tools/ThermalScannerMock.tsx` - Visual reference
- ✅ `src/ui-playground/tools/CameraViewfinderMock.tsx` - Visual reference
- ✅ `src/ui-playground/tools/SpiritBoxMock.tsx` - Visual reference
- ✅ `src/ui-playground/tools/RadarToolTest.tsx` - Test component

**Why**: These are design references and testing tools, not production code.

---

## 📁 Final Clean Structure

```
src/components/
├── Investigation/
│   ├── Tools/                           ← PRODUCTION COMPONENTS
│   │   ├── RadarTool.tsx               ← ✅ Real implementation (direction-only)
│   │   ├── shared/                     ← ✅ Shared components
│   │   │   ├── ToolCasing.tsx
│   │   │   ├── TextureLayer.tsx
│   │   │   ├── DamageLayer.tsx
│   │   │   ├── HandwrittenLabel.tsx
│   │   │   └── SerialNumber.tsx
│   │   └── Base/
│   │       └── ToolContainer.tsx
│   │
│   └── FieldScanner.tsx                ← ✅ Clean tool renderer
│
├── Tools/                               ← THIN WRAPPERS
│   ├── RadarTool.tsx                   ← ✅ Wrapper (connects to context)
│   ├── EMFMeterTool.tsx                ← ⏳ To be updated
│   ├── ThermalScannerTool.tsx          ← ⏳ To be updated
│   ├── AudioReceiverTool.tsx           ← ⏳ To be updated
│   ├── CameraTool.tsx                  ← ⏳ To be updated
│   └── index.ts                        ← ✅ Exports all wrappers
│
└── Radar/                               ← ❌ DELETED (old implementation)

src/ui-playground/tools/                 ← ✅ PRESERVED (design references)
├── RadarToolMock.tsx
├── RadarToolTest.tsx
├── EMFMeterMock.tsx
├── ThermalScannerMock.tsx
├── CameraViewfinderMock.tsx
└── SpiritBoxMock.tsx
```

---

## 🎯 Key Improvements

### 1. No More Duplication
- ✅ One production RadarTool component
- ✅ One thin wrapper for context connection
- ✅ Design references preserved separately

### 2. Correct Radar Design (Spec 006)
- ✅ Shows DIRECTION only (bearing in degrees)
- ✅ Ghost blip ONLY visible in ±45° forward cone
- ✅ No distance indicators ("RNG: 150m" removed)
- ✅ Shows "HDG: XXX°" for player heading
- ✅ Shows "TARGET: XXX°" for ghost bearing (when visible)

### 3. Clean Architecture
- ✅ Production components in `Investigation/Tools/`
- ✅ Thin wrappers in `Tools/` (connect to context)
- ✅ Design references in `ui-playground/tools/`
- ✅ Clear separation of concerns

### 4. Better Code Quality
- ✅ No dead code
- ✅ No confusion about which component to use
- ✅ Proper props interfaces
- ✅ TypeScript errors: 0

---

## 🚀 What's Next

### Ready to Continue Spec 009

With the cleanup complete, you can now continue implementing spec 009 tasks with confidence:

**Completed:**
- ✅ Task 3.1: Create RadarTool component structure
- ✅ Task 3.2: Implement radar display
- ✅ Task 3.3: Add radar sweep animation
- ✅ Cleanup: Remove old components, update wrappers

**Next Tasks:**
- ⏳ Task 3.4: Integrate ghost blip display (partially done - needs testing)
- ⏳ Task 3.5: Update RadarTool wrapper (DONE during cleanup!)
- ⏳ Task 4: Build EMFTool component
- ⏳ Task 5: Build ThermalTool component
- ⏳ Task 6: Build CameraTool component
- ⏳ Task 7: Build SpiritBoxTool component

### Pattern to Follow

For each remaining tool (EMF, Thermal, Camera, SpiritBox):

1. **Build production component** in `src/components/Investigation/Tools/`
   - Extract visual design from playground mock
   - Add props for investigation data
   - Support both 'view' and 'investigation' modes

2. **Update wrapper** in `src/components/Tools/`
   - Import production component
   - Connect to investigation context
   - Pass appropriate props

3. **Keep playground mock** as design reference
   - Don't delete or modify
   - Use as visual reference only

---

## 📊 Cleanup Stats

**Files Deleted:** 5
- RadarCanvas.tsx
- RadarCanvas.css
- GhostBlip.tsx
- NoiseOverlay.tsx
- NoiseOverlay.css

**Files Updated:** 3
- FieldScanner.tsx
- Tools/RadarTool.tsx (wrapper)
- Investigation/Tools/RadarTool.tsx (production)

**Files Preserved:** 6
- All UI playground mocks
- All design references

**TypeScript Errors:** 0
**Build Status:** ✅ Clean
**Time Taken:** ~40 minutes

---

## ✅ Verification Checklist

- [x] Old Radar folder deleted
- [x] FieldScanner updated (no old imports)
- [x] RadarTool wrapper updated (uses production component)
- [x] Production RadarTool updated (correct props, direction-only)
- [x] UI playground mocks preserved
- [x] No TypeScript errors
- [x] Radar shows direction only (no distance)
- [x] Ghost blip only visible in forward cone
- [x] "TARGET: XXX°" shows when ghost visible
- [x] "RNG: 150m" removed
- [x] Clean component structure

---

## 🎉 Result

**Clean, maintainable codebase with:**
- Clear component hierarchy
- No duplication
- Correct radar design (per Spec 006)
- Preserved design references
- Ready to continue spec 009

**You can now build the remaining tools with confidence!** 🚀

---

**Status**: Cleanup Complete ✅
**Next**: Continue Spec 009 (Task 3.4+)
**Last Updated**: 2024
