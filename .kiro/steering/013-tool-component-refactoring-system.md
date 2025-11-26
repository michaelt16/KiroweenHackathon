# 013 - Tool Component Refactoring System

## 🎯 Purpose

This document defines the **component-based refactoring approach** for investigation tools. The goal is to break down monolithic 1000+ line tool files into maintainable, reusable components while ensuring **pixel-perfect consistency** between inventory view and investigation mode.

---

## 🔑 Core Principle: One Tool, Two Modes, Same Appearance

**Investigation tools must look IDENTICAL in both contexts:**

- **Inventory View (`mode="view"`)**: Static display for inspection, no interactive functionality
- **Investigation Mode (`mode="investigation"`)**: Same visual appearance + live interactive functionality

**This is achieved by:**
1. Extracting all visual elements into shared components
2. Using the same visual components in both modes
3. Adding interactive logic only in investigation mode

---

## 📦 Component Architecture

### Shared Component Library

All tools share common visual elements organized into categories:

```
/shared/
  /casings/          - MetalCasing, PlasticCasing
  /damage/           - Scratches, Gouges, RustSpots, EdgeChips, Fingerprints, RainStreaks
  /hardware/         - Screws, VentGrilles, WeldSeams, TapePatches
  /labels/           - EtchedLabel, SerialNumber, HandwrittenNote
  /textures/         - TextureOverlays, BezelRing
  /effects/          - FilmGrain, DirtyGlass
  index.ts           - Master export
```

### Tool-Specific Components

Each tool has its own folder with specialized components:

```
/EMFTool/
  index.tsx          - Main component (handles mode switching)
  types.ts           - TypeScript interfaces
  LEDDisplay.tsx     - LED matrix display
  EMFCasing.tsx      - EMF-specific casing details

/RadarTool/
  index.tsx          - Main component
  types.ts           - TypeScript interfaces
  RadarDisplay.tsx   - Circular CRT radar
  RadarCasing.tsx    - Radar-specific casing details

/ThermalTool/
  index.tsx          - Main component
  types.ts           - TypeScript interfaces
  ThermalDisplay.tsx - Thermal viewfinder
  ThermalCasing.tsx  - FLIR E5-style body

/CameraTool/
  index.tsx          - Main component
  types.ts           - TypeScript interfaces
  CameraViewfinder.tsx - 4:3 viewfinder
  CameraCasing.tsx   - Polaroid-style body

/SpiritBoxTool/
  index.tsx          - Main component
  types.ts           - TypeScript interfaces
  SpiritBoxDisplay.tsx - Oscilloscope waveform
  SpiritBoxCasing.tsx - Radio-style body
```

---

## 🎨 Visual Consistency Rules

### Reference Implementation: Mock Files

**The mock files are the source of truth:**

- `EMFMeterMock.tsx` → Production `EMFTool`
- `RadarToolMock.tsx` → Production `RadarTool`
- `ThermalScannerMock.tsx` → Production `ThermalTool`
- `CameraViewfinderMock.tsx` → Production `CameraTool`
- `SpiritBoxMock.tsx` → Production `SpiritBoxTool`

**Production tools MUST match mocks pixel-perfect.**

### Material Types

**Metal Tools** (Radar, EMF, Spirit Box):
- Heavy steel gradient casing
- Metal texture overlay (0.6 opacity)
- Rust overlay (0.4 opacity)
- Dust layer (0.3 opacity)
- Deep inset shadows
- Thick metallic bezels (28-35px offset)

**Plastic Tools** (Thermal, Camera):
- Black rubberized plastic casing
- Smooth plastic texture
- Scratched plastic overlay (0.15 opacity)
- Dust layer (0.08 opacity)
- Softer inset shadows
- Thinner bezels (8-12px offset)

### Damage Elements (10-15+ per device)

**Every tool MUST have:**
- 6-8 light scratches (exposed metal)
- 3-5 dark scratches (deep gouges)
- 3-5 deep gouges (heavier damage)
- 5-7 rust spots (scattered)
- 4-6 edge chips (corners + edges)
- 3-5 fingerprint smudges
- 3-5 rain streaks (vertical weathering)
- 4 corner screws (large, 12-18px)
- Weld lines/seams (3-5 per device)
- Tape patches (3-5, crooked)

### Labels (Etched Style)

**All labels use etched metal appearance:**
- 40-50% opacity
- Light top highlight: `rgba(255,255,255,0.2-0.3)`
- Dark bottom shadow: `rgba(0,0,0,0.9)`
- Slight rotation (0.3deg - 1.5deg)

**Label Types:**
- Handwritten (Caveat font, 13-14px)
- Serial numbers (Courier New, 8-9px)
- Engineering labels (Courier New, 10-11px)
- Calibration notes (Caveat font, 10px)

---

## 🔧 Implementation Pattern

### Tool Component Structure

```typescript
interface ToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props (optional)
  emfLevel?: number;
  isFlickering?: boolean;
  ghostBearing?: number;
  // ... other interactive props
}

export const EMFTool: React.FC<ToolProps> = ({ mode, emfLevel = 0, isFlickering = false }) => {
  // Mode-specific state
  const [mockLevel, setMockLevel] = useState(3);
  
  // Use mock data in view mode, real data in investigation mode
  const displayLevel = mode === 'view' ? mockLevel : emfLevel;
  const displayFlickering = mode === 'view' ? false : isFlickering;
  
  return (
    <MetalCasing>
      {/* Shared visual components */}
      <TextureOverlays />
      <Scratches seed="emf-001" count={8} />
      <Gouges seed="emf-001" count={4} />
      <RustSpots seed="emf-001" count={6} />
      <EdgeChips seed="emf-001" count={5} />
      <Fingerprints seed="emf-001" count={4} />
      <RainStreaks seed="emf-001" count={4} />
      <Screws positions={cornerPositions} size={14} />
      <VentGrilles side="left" />
      <VentGrilles side="right" />
      <EtchedLabel text="EMF METER" position={{ top: '8px', left: '25px' }} />
      <SerialNumber text="SN: EMF-2019-K2" position={{ bottom: '8px', left: '25px' }} />
      
      {/* Tool-specific components */}
      <EMFCasing />
      <LEDDisplay level={displayLevel} isFlickering={displayFlickering} />
    </MetalCasing>
  );
};
```

### Mode Switching Logic

**View Mode:**
- Static mock data
- No user interaction
- Demonstrates tool appearance
- Used in inventory detail view

**Investigation Mode:**
- Live data from investigation context
- Interactive functionality
- Responds to ghost proximity
- Used during active hunt

---

## 📏 File Size Goals

**Before Refactoring:**
- EMFTool.tsx: ~1200 lines
- RadarTool.tsx: ~1100 lines
- ThermalTool.tsx: ~1000 lines
- CameraTool.tsx: ~900 lines
- SpiritBoxTool.tsx: ~800 lines

**After Refactoring:**
- Each tool main file: ~200-300 lines
- Shared components: Reusable across all tools
- Tool-specific components: ~100-200 lines each

**Total reduction: ~5000 lines → ~2000 lines (60% reduction)**

---

## 🎯 Success Criteria

### Visual Consistency
- [ ] Production tools match mocks pixel-perfect
- [ ] Inventory view and investigation mode look identical
- [ ] All damage elements present (10-15+ per device)
- [ ] All labels use etched style
- [ ] Material-specific textures applied correctly

### Code Quality
- [ ] All tool files under 300 lines
- [ ] Shared components reused across tools
- [ ] No code duplication
- [ ] TypeScript types properly defined
- [ ] Props interfaces documented

### Functionality
- [ ] Both modes work correctly
- [ ] No regressions in investigation mode
- [ ] View mode displays properly in inventory
- [ ] Tool switching works smoothly
- [ ] Performance maintained or improved

---

## 🚀 Implementation Order

### Phase 1: Shared Components Foundation
1. Casings (MetalCasing, PlasticCasing)
2. Damage (Scratches, Gouges, RustSpots, EdgeChips, Fingerprints, RainStreaks)
3. Hardware (Screws, VentGrilles, WeldSeams, TapePatches)
4. Labels (EtchedLabel, SerialNumber, HandwrittenNote)
5. Textures (TextureOverlays, BezelRing)
6. Effects (FilmGrain, DirtyGlass)

### Phase 2: EMFTool (Proof of Concept)
- Refactor EMFTool to use shared components
- Match EMFMeterMock.tsx exactly
- Test both view and investigation modes
- Verify no regressions

### Phase 3-6: Remaining Tools
- RadarTool → Match RadarToolMock.tsx
- ThermalTool → Match ThermalScannerMock.tsx
- CameraTool → Match CameraViewfinderMock.tsx
- SpiritBoxTool → Match SpiritBoxMock.tsx

### Phase 7: Cleanup
- Remove old monolithic files
- Update all imports
- Run linter and type checker
- Documentation
- Final testing

---

## 🔗 Related Documents

- **Steering 007**: Investigation Tools Design System (visual guidelines)
- **Spec 013**: Tool Component Refactoring (implementation tasks)
- **Mock Files**: `/ui-playground/tools/` (reference implementations)

---

## 📝 Key Takeaways

1. **One tool component, two modes** - Same visual code, different data sources
2. **Shared components** - Extract all common visual elements
3. **Mock files are truth** - Production must match mocks exactly
4. **Material-specific styling** - Metal vs plastic tools have different textures
5. **Heavy damage** - 10-15+ damage elements per device for authenticity
6. **Etched labels** - All text uses etched metal appearance
7. **File size reduction** - From 1000+ lines to 200-300 lines per tool

---

**Status**: Active Implementation Guide
**Authority**: Defines refactoring approach for all investigation tools
**Last Updated**: 2024
