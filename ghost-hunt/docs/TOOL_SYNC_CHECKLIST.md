# Tool Synchronization Checklist

## Problem
The investigation tools in `src/components/Investigation/Tools/` look like "cheaper copies" compared to their mock counterparts in `src/ui-playground/tools/`. The mocks have extensive damage elements, labels, and details that are missing from the production tools.

## Solution
Copy the EXACT implementation from each mock file to its corresponding production tool file, ensuring pixel-perfect matching.

---

## Tools to Update

### 1. EMFTool.tsx ❌ NEEDS UPDATE
**Mock**: `src/ui-playground/tools/EMFMeterMock.tsx` (2001 lines)
**Production**: `src/components/Investigation/Tools/EMFTool.tsx` (current)

**Missing Elements**:
- Engineering labels (EMF, LEVEL, PWR, CAL) with etched style
- Thick metallic bezel ring around LED panel (28px offset)
- Deep LED housing cavity with multiple shadow layers
- Ambient bounce light around LED panel
- Dirty glass overlay on LED panel
- Film grain on LED panel
- Dust overlay on LED panel
- Fingerprint smudges on glass
- Scratches on glass
- Burnt edges around LED cavity
- Grime buildup around screws
- Rain streaks
- Deep gouges
- Edge chipping
- Welded metal seams
- Corner reinforcement plates
- Vent grilles
- Tape patches with edges overhanging
- Localized rust around screws
- Micro-indentations
- Tiny unreadable engineering text
- Multiple printed labels

**Action**: Replace entire EMFTool.tsx content with EMFMeterMock.tsx, then adapt for props interface

---

### 2. RadarTool.tsx ✅ LOOKS GOOD
**Status**: Already matches mock closely

---

### 3. ThermalTool.tsx ❓ NEEDS REVIEW
**Mock**: `src/ui-playground/tools/ThermalScannerMock.tsx`
**Production**: `src/components/Investigation/Tools/ThermalTool.tsx`

**Action**: Compare and update if needed

---

### 4. CameraTool.tsx ❓ NEEDS REVIEW
**Mock**: `src/ui-playground/tools/CameraViewfinderMock.tsx`
**Production**: `src/components/Investigation/Tools/CameraTool.tsx`

**Action**: Compare and update if needed

---

### 5. SpiritBoxTool.tsx ❓ NEEDS REVIEW
**Mock**: `src/ui-playground/tools/SpiritBoxMock.tsx`
**Production**: `src/components/Investigation/Tools/SpiritBoxTool.tsx`

**Action**: Compare and update if needed

---

## Implementation Strategy

For each tool:

1. **Backup current production file**
2. **Copy mock file content** to production file
3. **Preserve props interface** from production file
4. **Adapt state management**:
   - Keep `mode: 'view' | 'investigation'` prop
   - Keep investigation-specific props (emfLevel, ghostBearing, etc.)
   - Keep internal mock state for 'view' mode
5. **Test both modes**:
   - View mode (inventory/backpack)
   - Investigation mode (active hunt)
6. **Verify no regressions**

---

## Priority Order

1. **EMFTool** - Most noticeable difference
2. **ThermalTool** - Check if needs update
3. **CameraTool** - Check if needs update
4. **SpiritBoxTool** - Check if needs update
5. **RadarTool** - Already good, but verify

---

## Testing Checklist

After each tool update:
- [ ] Tool renders correctly in investigation mode
- [ ] Tool renders correctly in view mode (backpack)
- [ ] All damage elements visible
- [ ] All labels visible and properly styled
- [ ] Textures load correctly
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] Matches mock pixel-perfect

