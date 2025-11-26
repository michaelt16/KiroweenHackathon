# Spec 013: Tool Component Refactoring

## Problem Statement

Investigation tool files (EMFMeterMock.tsx, etc.) are 2000+ lines long, making them:
- Difficult to maintain
- Hard to add new features
- Prone to duplication
- Difficult to review

The production tools in `src/components/Investigation/Tools/` are missing many visual details from their mock counterparts, appearing as "cheaper copies."

**Critical Issue**: Tools must look IDENTICAL in both contexts:
- **Inventory View** (`mode="view"`): When clicking on tools in `/inventory` to inspect them
- **Investigation Mode** (`mode="investigation"`): When actively using tools during a hunt

Currently, the inventory view shows beautiful detailed tools, but investigation mode shows simplified versions. This breaks immersion and creates visual inconsistency.

## Goals

1. **Refactor tools into modular components** - Break 2000-line files into manageable pieces
2. **Create reusable shared components** - Extract common visual elements
3. **Match mocks exactly** - Ensure production tools look identical to mocks
4. **Maintain functionality** - Keep all existing features working
5. **Improve maintainability** - Make it easy to add new features
6. **Ensure visual consistency** - Inventory view and investigation mode must look IDENTICAL

## Success Criteria

- ✅ All tool files under 300 lines
- ✅ Shared components handle common visual elements
- ✅ Production tools match mocks pixel-perfect
- ✅ **Inventory view and investigation mode look IDENTICAL**
- ✅ No functionality regressions
- ✅ Easy to add new damage elements or features
- ✅ Clear component hierarchy
- ✅ Both modes use the same visual components

## Non-Goals

- Changing tool functionality or behavior
- Adding new tools
- Modifying investigation mode logic
- Performance optimization (unless needed)

## Architecture Overview

### Current Structure (Bad)
```
src/components/Investigation/Tools/
├── EMFTool.tsx (800 lines, missing details)
├── RadarTool.tsx (600 lines)
├── ThermalTool.tsx (700 lines, missing details)
├── CameraTool.tsx (650 lines, missing details)
└── SpiritBoxTool.tsx (750 lines, missing details)

src/ui-playground/tools/
├── EMFMeterMock.tsx (2001 lines!)
├── RadarToolMock.tsx (1800 lines)
└── ... (other mocks)
```

### New Structure (Good)
```
src/components/Investigation/Tools/
├── shared/
│   ├── casings/
│   │   ├── MetalCasing.tsx          ← Heavy steel gradient + bevels
│   │   ├── PlasticCasing.tsx        ← Rubberized plastic texture
│   │   └── CasingBase.tsx           ← Common casing logic
│   ├── damage/
│   │   ├── Scratches.tsx            ← Light + dark scratches
│   │   ├── Gouges.tsx               ← Deep gouges
│   │   ├── RustSpots.tsx            ← Rust specks
│   │   ├── EdgeChips.tsx            ← Corner chipping
│   │   ├── Fingerprints.tsx         ← Smudges
│   │   └── RainStreaks.tsx          ← Vertical weathering
│   ├── hardware/
│   │   ├── Screws.tsx               ← Corner + bezel screws
│   │   ├── VentGrilles.tsx          ← Industrial vents
│   │   ├── WeldSeams.tsx            ← Metal seams
│   │   └── TapePatches.tsx          ← Tape with overhang
│   ├── labels/
│   │   ├── EtchedLabel.tsx          ← Etched text component
│   │   ├── SerialNumber.tsx         ← Serial number label
│   │   └── HandwrittenNote.tsx      ← Caveat font notes
│   ├── textures/
│   │   ├── TextureOverlays.tsx      ← Metal, rust, dust layers
│   │   └── BezelRing.tsx            ← Thick metallic bezel
│   └── effects/
│       ├── FilmGrain.tsx            ← Grain animation
│       └── DirtyGlass.tsx           ← Glass overlay
├── EMFTool/
│   ├── index.tsx                    ← Main component (200 lines)
│   ├── LEDDisplay.tsx               ← LED matrix (150 lines)
│   └── EMFCasing.tsx                ← EMF-specific details (100 lines)
├── RadarTool/
│   ├── index.tsx                    ← Main component (200 lines)
│   ├── RadarDisplay.tsx             ← CRT screen (150 lines)
│   └── RadarCasing.tsx              ← Radar-specific details (100 lines)
├── ThermalTool/
│   ├── index.tsx
│   ├── ThermalDisplay.tsx
│   └── ThermalCasing.tsx
├── CameraTool/
│   ├── index.tsx
│   ├── CameraViewfinder.tsx
│   └── CameraCasing.tsx
└── SpiritBoxTool/
    ├── index.tsx
    ├── SpiritBoxDisplay.tsx
    └── SpiritBoxCasing.tsx
```

## Component Responsibilities

### Shared Components

#### `MetalCasing.tsx`
- Heavy steel gradient background
- Beveled edges (12px deep)
- Uneven lighting (hotspot + falloff)
- Brushed metal texture
- Device architecture sections (top/middle/bottom)

#### `PlasticCasing.tsx`
- Black rubberized plastic texture
- Softer bevels (8px deep)
- Smooth plastic texture overlay
- Grip sections

#### `Scratches.tsx`
```typescript
interface ScratchesProps {
  count?: number;
  type: 'light' | 'dark';
  seed?: string;
}
```
- Generates random scratches based on seed
- Light scratches (exposed metal)
- Dark scratches (deep gouges)

#### `Gouges.tsx`
- Heavier damage than scratches
- Linear gradient for depth
- Inset shadows

#### `RustSpots.tsx`
- Scattered rust using texture image
- Radial placement
- Multiply blend mode

#### `EdgeChips.tsx`
- Corner damage using clip-path
- Multiple chip patterns
- Inset shadows for depth

#### `Screws.tsx`
```typescript
interface ScrewsProps {
  positions: Array<{top?: string, bottom?: string, left?: string, right?: string}>;
  size?: number;
  type?: 'corner' | 'bezel' | 'calibration';
}
```
- Radial gradient for metallic look
- Screw slot (single or cross)
- Inset shadows

#### `VentGrilles.tsx`
- Vertical slit arrays
- Industrial cooling aesthetic
- Configurable count and position

#### `WeldSeams.tsx`
- Horizontal and vertical seams
- Linear gradients for depth
- Aligns with casing sections

#### `TapePatches.tsx`
```typescript
interface TapePatchProps {
  position: {top?: string, bottom?: string, left?: string, right?: string};
  width: string;
  height: string;
  rotation: number;
  overhang?: boolean;
}
```
- Tape texture image
- Crooked rotation
- Optional edge overhang

#### `EtchedLabel.tsx`
```typescript
interface EtchedLabelProps {
  text: string;
  position: {top?: string, bottom?: string, left?: string, right?: string};
  font: 'caveat' | 'courier';
  fontSize: string;
  rotation: number;
}
```
- Light top highlight + dark bottom shadow
- 40-50% opacity
- Slight rotation

#### `TextureOverlays.tsx`
```typescript
interface TextureOverlaysProps {
  type: 'metal' | 'plastic';
}
```
- Metal: metalTexture (0.6) + rust (0.4) + dust (0.3)
- Plastic: smoothPlastic (0.5) + scratchedPlastic (0.15) + dust (0.08)

#### `BezelRing.tsx`
```typescript
interface BezelRingProps {
  offset: number;  // 28-35px
  shape: 'circle' | 'rectangle';
  borderRadius?: string;
}
```
- Thick metallic bezel
- Raised above display
- Metal texture + rust + dust
- Screws at cardinal points
- Deep shadow onto display

### Tool-Specific Components

#### `EMFTool/LEDDisplay.tsx`
- 5 columns × 8 segments LED matrix
- Color progression (green → yellow → orange → red)
- Flickering logic
- Film grain overlay
- Glow effects

#### `RadarTool/RadarDisplay.tsx`
- Circular CRT screen
- Sweep animation
- Ghost blip
- Compass rose
- Scanlines

#### `ThermalTool/ThermalDisplay.tsx`
- Thermal gradient viewfinder
- Cold spot detection
- Crosshair
- Temperature readout

#### `CameraTool/CameraViewfinder.tsx`
- 4:3 aspect ratio viewfinder
- REC indicator
- Timestamp
- Crosshairs
- Film grain

#### `SpiritBoxTool/SpiritBoxDisplay.tsx`
- Oscilloscope waveform
- Frequency readout
- EVP text overlays
- Grid lines

## Implementation Plan

### Phase 1: Create Shared Components (Priority: High)
1. Create folder structure
2. Implement casing components (MetalCasing, PlasticCasing)
3. Implement damage components (Scratches, Gouges, RustSpots, EdgeChips, Fingerprints, RainStreaks)
4. Implement hardware components (Screws, VentGrilles, WeldSeams, TapePatches)
5. Implement label components (EtchedLabel, SerialNumber, HandwrittenNote)
6. Implement texture components (TextureOverlays, BezelRing)
7. Implement effect components (FilmGrain, DirtyGlass)

### Phase 2: Refactor EMFTool (Priority: High)
1. Create EMFTool folder structure
2. Extract LEDDisplay component
3. Extract EMFCasing component
4. Refactor main index.tsx to use shared components
5. Test in both view and investigation modes
6. Verify matches mock exactly

### Phase 3: Refactor RadarTool (Priority: Medium)
1. Create RadarTool folder structure
2. Extract RadarDisplay component
3. Extract RadarCasing component
4. Refactor main index.tsx
5. Test and verify

### Phase 4: Refactor Remaining Tools (Priority: Medium)
1. ThermalTool
2. CameraTool
3. SpiritBoxTool

### Phase 5: Cleanup (Priority: Low)
1. Remove old mock files (or keep as reference)
2. Update documentation
3. Add component usage examples

## Mode System: One Component, Two Contexts

### The Core Pattern

Each tool component handles both modes internally:

```typescript
interface ToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props (optional, only used when mode="investigation")
  emfLevel?: number;
  isFlickering?: boolean;
  ghostBearing?: number;
  // ... other interactive props
}

export const EMFTool: React.FC<ToolProps> = ({ 
  mode, 
  emfLevel = 0, 
  isFlickering = false 
}) => {
  // Mock data for view mode
  const [mockLevel, setMockLevel] = useState(3);
  
  // Use mock data in view mode, real data in investigation mode
  const displayLevel = mode === 'view' ? mockLevel : emfLevel;
  const displayFlickering = mode === 'view' ? false : isFlickering;
  
  return (
    <MetalCasing>
      {/* ALL visual components are the same in both modes */}
      <TextureOverlays />
      <Scratches seed="emf-001" count={8} />
      <Gouges seed="emf-001" count={4} />
      {/* ... all other visual elements ... */}
      
      {/* Display uses mode-appropriate data */}
      <LEDDisplay level={displayLevel} isFlickering={displayFlickering} />
    </MetalCasing>
  );
};
```

### View Mode (Inventory)

**Used when**: Player clicks on tool in `/inventory` to inspect it

**Behavior**:
- Shows static mock data (e.g., EMF level 3)
- No user interaction
- Demonstrates tool appearance
- May cycle through states slowly for demo

**Example**:
```typescript
<EMFTool mode="view" />
```

### Investigation Mode (Active Hunt)

**Used when**: Player is actively using tool during investigation

**Behavior**:
- Shows live data from investigation context
- Responds to ghost proximity
- Interactive functionality enabled
- Real-time updates

**Example**:
```typescript
<EMFTool 
  mode="investigation" 
  emfLevel={ghostDistance < 10 ? 5 : 3}
  isFlickering={ghostDistance < 10}
/>
```

### Visual Consistency Guarantee

**The same visual components are rendered in both modes:**
- Same casing
- Same damage elements
- Same hardware
- Same labels
- Same textures
- Same effects

**Only the data source changes:**
- View mode: Static mock data
- Investigation mode: Live investigation data

This ensures pixel-perfect consistency between inventory and investigation.

## Technical Considerations

### Props Interface Consistency
All tool main components keep the same interface:
```typescript
interface ToolProps {
  mode: 'view' | 'investigation';
  // Tool-specific investigation props
  [key: string]: any;
}
```

### Seed-Based Randomization
All damage elements use deterministic randomization:
```typescript
const seed = `${toolName}-damage`;
<Scratches seed={seed} count={6} type="light" />
```

### Performance
- Memoize shared components
- Use CSS transforms for animations
- Lazy load textures
- Avoid re-renders on GPS updates

### Maintainability
- Each component has clear responsibility
- Props are well-typed
- Components are composable
- Easy to add new damage elements

## Testing Strategy

### Unit Tests
- Test each shared component renders correctly
- Test props are applied correctly
- Test seed-based randomization is deterministic

### Integration Tests
- Test tools render in view mode
- Test tools render in investigation mode
- Test tool switching works
- Test no performance regressions

### Visual Regression Tests
- Compare production tools to mocks
- Ensure pixel-perfect matching
- Test on different screen sizes

## Migration Path

1. **Create shared components** - Build new architecture alongside old
2. **Refactor one tool at a time** - Start with EMF, verify it works
3. **Keep old files as backup** - Don't delete until new version is verified
4. **Test thoroughly** - Each tool must work in both modes
5. **Update gradually** - No need to do all at once

## Success Metrics

- All tool files under 300 lines ✅
- Shared components reused across tools ✅
- Production tools match mocks exactly ✅
- No functionality regressions ✅
- Code review approval ✅
- User testing shows no visual differences ✅

