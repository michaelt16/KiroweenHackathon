# Investigation Mode Cleanup Plan

## Current Situation Analysis

### 🔴 The Problem: Component Duplication & Confusion

We have **THREE different radar implementations**:

1. **Old Radar** (`src/components/Radar/`)
   - `RadarCanvas.tsx` - Original radar view
   - `GhostBlip.tsx` - Ghost blip component
   - `NoiseOverlay.tsx` - Noise effects
   - Status: ❓ Still used as fallback in FieldScanner

2. **Tool Wrappers** (`src/components/Tools/`)
   - `RadarTool.tsx` - Wrapper that imports RadarToolMock
   - `EMFMeterTool.tsx` - Wrapper
   - `ThermalScannerTool.tsx` - Wrapper
   - `AudioReceiverTool.tsx` - Wrapper
   - `CameraTool.tsx` - Wrapper
   - Status: ⚠️ Currently just render mocks, no real functionality

3. **New Production Components** (`src/components/Investigation/Tools/`)
   - `RadarTool.tsx` - NEW production component (task 3.1-3.3 complete)
   - Status: ✅ Has animations, but not integrated

4. **UI Playground Mocks** (`src/ui-playground/tools/`)
   - `RadarToolMock.tsx` - Visual reference
   - `EMFMeterMock.tsx` - Visual reference
   - `ThermalScannerMock.tsx` - Visual reference
   - `CameraViewfinderMock.tsx` - Visual reference
   - `SpiritBoxMock.tsx` - Visual reference
   - Status: ✅ Keep as visual reference only

### 🍝 The Spaghetti

```
InvestigationScreen
  └─ FieldScanner
      ├─ activeTool === 'radar' → RadarTool (wrapper)
      │   └─ imports RadarToolMock (playground)
      │
      ├─ !activeTool (fallback) → RadarCanvas (old)
      │   ├─ GhostBlip
      │   └─ NoiseOverlay
      │
      └─ NEW: RadarTool (production) exists but not used!
```

**Result**: Confusion, duplication, unclear which component to use.

---

## 🎯 Cleanup Strategy

### Option A: Clean Up First (RECOMMENDED)

**Pros:**
- Clear foundation before continuing
- No confusion about which components to use
- Easier to implement remaining tasks
- Better code quality

**Cons:**
- Takes time upfront
- Delays completing spec 009

**Steps:**
1. Delete old Radar components
2. Update tool wrappers to use production components
3. Remove mock imports from wrappers
4. Continue with spec 009 tasks

### Option B: Finish 009 First, Then Clean Up

**Pros:**
- Complete the spec faster
- See full picture before cleaning

**Cons:**
- More confusion during implementation
- Risk of building on wrong foundation
- Harder to clean up later

---

## 📋 Recommended Cleanup Plan

### Phase 1: Audit & Document (30 min)

**Goal**: Understand what's actually being used

1. ✅ List all radar-related components
2. ✅ Check what FieldScanner imports
3. ✅ Check what InvestigationScreen uses
4. ✅ Identify dead code

### Phase 2: Delete Old Radar (15 min)

**Goal**: Remove the old radar implementation

**Delete:**
- ❌ `src/components/Radar/RadarCanvas.tsx`
- ❌ `src/components/Radar/RadarCanvas.css`
- ❌ `src/components/Radar/GhostBlip.tsx`
- ❌ `src/components/Radar/NoiseOverlay.tsx`
- ❌ `src/components/Radar/NoiseOverlay.css`
- ❌ `src/components/Radar/` (entire folder if empty)

**Why**: These are replaced by the new production components.

### Phase 3: Update Tool Wrappers (30 min)

**Goal**: Make wrappers use production components

**For each tool wrapper in `src/components/Tools/`:**

```typescript
// BEFORE (RadarTool.tsx wrapper)
import RadarToolMock from '../../ui-playground/tools/RadarToolMock';

export function RadarTool({ mode }: RadarToolProps) {
  return <RadarToolMock />;
}

// AFTER
import { RadarTool as RadarToolProduction } from '../Investigation/Tools/RadarTool';
import { useInvestigation } from '../../context/InvestigationContext';

export function RadarTool({ mode }: RadarToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  return (
    <RadarToolProduction
      mode={mode}
      ghostBearing={investigation?.ghostBearing ?? 45}
      playerHeading={investigation?.playerHeading ?? 0}
      isGhostInCone={investigation?.isGhostInCone ?? false}
      isGhostMoving={investigation?.isGhostMoving ?? false}
    />
  );
}
```

**Update:**
- ✅ `RadarTool.tsx` wrapper
- ⏳ `EMFMeterTool.tsx` wrapper (when EMF production component is ready)
- ⏳ `ThermalScannerTool.tsx` wrapper (when Thermal production component is ready)
- ⏳ `AudioReceiverTool.tsx` wrapper (when Audio production component is ready)
- ⏳ `CameraTool.tsx` wrapper (when Camera production component is ready)

### Phase 4: Update FieldScanner (15 min)

**Goal**: Remove fallback to old radar

```typescript
// BEFORE
{activeTool === 'radar' && <RadarTool mode="investigation" />}
{!activeTool && (
  <>
    <RadarCanvas ... />  // OLD - DELETE THIS
    <GhostBlip ... />
    <NoiseOverlay ... />
  </>
)}

// AFTER
{activeTool === 'radar' && <RadarTool mode="investigation" />}
{activeTool === 'emf' && <EMFMeterTool mode="investigation" />}
{activeTool === 'thermal' && <ThermalScannerTool mode="investigation" />}
{activeTool === 'audio' && <AudioReceiverTool mode="investigation" />}
{activeTool === 'camera' && <CameraTool mode="investigation" />}
{/* No fallback needed - always have an active tool */}
```

### Phase 5: Keep Playground Mocks (0 min)

**Goal**: Preserve visual references

**Keep as-is:**
- ✅ `src/ui-playground/tools/RadarToolMock.tsx`
- ✅ `src/ui-playground/tools/EMFMeterMock.tsx`
- ✅ `src/ui-playground/tools/ThermalScannerMock.tsx`
- ✅ `src/ui-playground/tools/CameraViewfinderMock.tsx`
- ✅ `src/ui-playground/tools/SpiritBoxMock.tsx`

**Why**: These are visual references for design, not production code.

---

## 📁 Final Clean Structure

```
src/components/
├── Investigation/
│   ├── Tools/                    ← PRODUCTION COMPONENTS
│   │   ├── RadarTool.tsx        ← Real implementation
│   │   ├── EMFTool.tsx          ← Real implementation (future)
│   │   ├── ThermalTool.tsx      ← Real implementation (future)
│   │   ├── CameraTool.tsx       ← Real implementation (future)
│   │   ├── SpiritBoxTool.tsx    ← Real implementation (future)
│   │   └── shared/              ← Shared components
│   │       ├── ToolCasing.tsx
│   │       ├── TextureLayer.tsx
│   │       └── DamageLayer.tsx
│   │
│   ├── FieldScanner.tsx         ← Uses tool wrappers
│   └── FieldKitDrawer.tsx       ← Tool switcher
│
├── Tools/                        ← THIN WRAPPERS
│   ├── RadarTool.tsx            ← Wrapper: passes props to production
│   ├── EMFMeterTool.tsx         ← Wrapper: passes props to production
│   ├── ThermalScannerTool.tsx   ← Wrapper: passes props to production
│   ├── AudioReceiverTool.tsx    ← Wrapper: passes props to production
│   ├── CameraTool.tsx           ← Wrapper: passes props to production
│   └── index.ts                 ← Exports all wrappers
│
└── Radar/                        ← DELETE THIS FOLDER
    ❌ RadarCanvas.tsx
    ❌ GhostBlip.tsx
    ❌ NoiseOverlay.tsx

src/ui-playground/tools/          ← VISUAL REFERENCE (KEEP)
├── RadarToolMock.tsx            ← Design reference only
├── EMFMeterMock.tsx             ← Design reference only
├── ThermalScannerMock.tsx       ← Design reference only
├── CameraViewfinderMock.tsx     ← Design reference only
└── SpiritBoxMock.tsx            ← Design reference only
```

---

## 🎯 Decision Time

### Recommendation: **Clean Up First**

**Why:**
1. **Clarity**: Know exactly which components to use
2. **Foundation**: Build on solid ground
3. **Speed**: Faster to implement remaining tasks
4. **Quality**: Better code, less confusion

**Time Investment:**
- Cleanup: ~1.5 hours
- Benefit: Saves 3+ hours of confusion later

### If You Choose to Clean Up First:

**Next Steps:**
1. ✅ Delete `src/components/Radar/` folder
2. ✅ Update `RadarTool.tsx` wrapper to use production component
3. ✅ Update `FieldScanner.tsx` to remove fallback
4. ✅ Test that investigation mode still works
5. ✅ Continue with spec 009 tasks (3.4, 3.5, etc.)

### If You Choose to Finish 009 First:

**Next Steps:**
1. ⚠️ Continue building production components
2. ⚠️ Risk of confusion about which to use
3. ⚠️ Clean up after all tools are done
4. ⚠️ Might need to refactor later

---

## 🚨 Critical Question

**Do you want to:**

**A) Clean up now** (1.5 hours, then smooth sailing)
- Delete old Radar components
- Update wrappers
- Clear foundation
- Continue spec 009

**B) Finish 009 first** (faster short-term, messier long-term)
- Keep building on current structure
- Clean up after all tools done
- Risk of more confusion

**C) Hybrid approach** (clean as you go)
- Clean up Radar now (since it's done)
- Clean up other tools as you build them
- Gradual cleanup

---

## 💡 My Recommendation

**Choose Option A: Clean Up Now**

**Reasoning:**
- You already have a working RadarTool production component
- The old Radar components are dead code
- Cleaning now prevents building on wrong foundation
- Spec 009 will be easier to complete with clean structure
- Better code quality = less technical debt

**Time Breakdown:**
- Delete old Radar: 5 min
- Update RadarTool wrapper: 15 min
- Update FieldScanner: 10 min
- Test: 10 min
- **Total: 40 minutes**

Then you can continue spec 009 with confidence!

---

**What do you want to do?**
