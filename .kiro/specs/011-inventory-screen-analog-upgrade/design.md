# Design Document

## Overview

The Inventory Screen Analog Upgrade transforms the existing Field Investigation Kit screen into a fully immersive 1980s paranormal investigator's equipment case. The current implementation already has a solid foundation with a metal suitcase exterior, foam cutout interior, and LED-style counters. This upgrade enhances every element to achieve maximum analog-horror authenticity by:

- Replacing tool emoji icons with miniature physical device renders
- Transforming supply counters into mechanical/analog gauges
- Adding extensive wear, damage, and physical details
- Enhancing foam cutouts with realistic depth and texture
- Upgrading all hardware (screws, latches, handle) with authentic styling
- Adding serial numbers, calibration notes, and warning labels

The design follows Spec 007 (Investigation Tools Design System) for material consistency and Spec 006 (Analog Horror Component System) for texture and damage patterns.

## Architecture

### Component Structure

```
InventoryScreen
├── BackToMapButton (existing)
├── EquipmentCase (enhanced)
│   ├── CaseExterior
│   │   ├── MetalTextureLayers (3 layers)
│   │   ├── Latches (2, enhanced)
│   │   ├── Handle (enhanced)
│   │   ├── DamageElements (scratches, rust, chips)
│   │   └── LabelPlate (enhanced with etched text)
│   └── CaseInterior
│       ├── FoamTexture (enhanced)
│       ├── ToolsSection
│       │   ├── SectionLabel (etched typewriter)
│       │   └── ToolGrid
│       │       └── PhysicalToolDevice × 5 (NEW)
│       │           ├── MiniatureDevice (metal or plastic)
│       │           ├── CornerScrews (4)
│       │           ├── TapeLabel (handwritten)
│       │           ├── LEDIndicator (status)
│       │           └── DropShadow (depth)
│       ├── SuppliesSection
│       │   ├── SectionLabel (etched typewriter)
│       │   └── SuppliesGrid
│       │       ├── MechanicalFilmCounter (NEW)
│       │       ├── LEDBoostGauge (NEW)
│       │       └── AnalogCharmsIndicator (NEW)
│       └── PhysicalDetails (NEW)
│           ├── SerialNumber
│           ├── CalibrationNotes
│           ├── WarningLabels
│           ├── ManufacturingStamps
│           └── WeldLines
└── ToolViewerModal (enhanced styling)
```

### Material System

Following Spec 007's material guidelines:

**Case Exterior:**
- Heavy steel gradient: `linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)`
- Metal texture overlay (0.6 opacity)
- Rust overlay (0.4 opacity)
- Dust layer (0.3 opacity)

**Case Interior:**
- Dark plastic/foam: `linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)`
- EVA foam texture with grain
- Charcoal gray foam (#2a2a2a to #1a1a1a)

**Tool Devices (Miniature):**
- Metal tools (Radar, EMF, Audio): Heavy steel gradient with metal texture
- Plastic tools (Thermal, Camera): Black rubberized plastic with smooth texture
- Scaled to 60-80px to fit foam cutouts

## Components and Interfaces

### 1. PhysicalToolDevice Component (NEW)

**Purpose:** Miniature physical device render replacing emoji icons

**Interface:**
```typescript
interface PhysicalToolDeviceProps {
  toolType: 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';
  size: number; // 60-80px
  onClick: () => void;
}
```

**Visual Design:**
- Size: 60px × 60px (mobile) to 80px × 80px (desktop)
- Material: Metal gradient for Radar/EMF/Audio, plastic texture for Thermal/Camera
- Corner screws: 4 screws (4px diameter)
- Device icon: Centered, 32-40px
- LED indicator: 6px circle, top-right
  - Green: Ready (#00ff55)
  - Yellow: Low battery (#ffaa00)
  - Red: Error (#ff0000)
- Tape label: 40px × 12px, -8deg to 8deg rotation
- Drop shadow: 0 4px 12px rgba(0,0,0,0.85)

**Texture Layers:**
1. Base material (metal gradient or plastic texture)
2. Scratches overlay (0.15 opacity)
3. Dust layer (0.08 opacity)
4. Fingerprint smudges (2-3 per device)

### 2. MechanicalFilmCounter Component (NEW)

**Purpose:** Physical rotary tally counter for film count

**Interface:**
```typescript
interface MechanicalFilmCounterProps {
  count: number;
}
```

**Visual Design:**
- Size: 120px × 70px
- Housing: Dark metal gradient with corner screws
- Display window: 80px × 45px, deeply inset
- Background: Black LCD (#0a0a0a)
- Digits: White with glow, Courier New, 28px, bold
- Digit styling: Multiple text shadows for 3D effect
- Label: "FILM ROLLS" (Courier, 9px, etched below)
- Corner screws: 4 screws (5px diameter)

**3D Digit Effect:**
```typescript
textShadow: 
  '1px 1px 0 rgba(255,255,255,0.3), ' +
  '2px 2px 0 rgba(0,0,0,0.8), ' +
  '0 0 8px rgba(255,255,255,0.5)'
```


### 3. LEDBoostGauge Component (NEW)

**Purpose:** Physical LED bar gauge for boost count

**Interface:**
```typescript
interface LEDBoostGaugeProps {
  count: number;
  max: number; // typically 99
}
```

**Visual Design:**
- Size: 120px × 70px
- Housing: Dark plastic with inset shadows
- LED bar: Horizontal, 5 segments
- Segment size: 16px × 35px each
- Gap: 5px between segments
- Active segments: Teal (#2dd4bf) with bloom
- Inactive segments: Dark gray (#1a1a1a) with outline
- Label: "SCANNER BOOSTS" (Courier, 9px, etched)
- Housing screws: 4 corners (5px diameter)

**LED Segment Styling:**
```typescript
// Active
background: 'linear-gradient(to bottom, #2dd4bf, #14b8a6)',
boxShadow: '0 0 12px rgba(45, 212, 191, 0.9), 0 0 24px rgba(45, 212, 191, 0.4)',
opacity: 0.9 + Math.random() * 0.1, // Slight variation

// Inactive
background: '#1a1a1a',
border: '1px solid rgba(45, 212, 191, 0.2)',
opacity: 0.3
```

### 4. AnalogCharmsIndicator Component (NEW)

**Purpose:** Simple analog indicator on aged paper card

**Interface:**
```typescript
interface AnalogCharmsIndicatorProps {
  count: number;
}
```

**Visual Design:**
- Size: 120px × 70px
- Background: Aged paper (#d8d4c8)
- Number: Courier New, 36px, bold, centered
- Tally marks: Hand-drawn lines below number (groups of 5)
- Label: "CHARMS" (Caveat, 14px, handwritten)
- Edges: Rough torn effect with clipPath
- Tape strip: 50px × 15px at top, -5deg rotation
- Paper texture: Wrinkled overlay (0.3 opacity)
- Coffee stain: Bottom-right corner (optional)

**Tally Marks Generation:**
```typescript
const tallyGroups = Math.floor(count / 5);
const remainder = count % 5;
// Render groups of 5 with diagonal line, then remainder
```

### 5. Enhanced Foam Cutouts

**Current vs Enhanced:**

**Current:**
- Basic inset shadow
- SVG noise texture
- Simple dark background

**Enhanced:**
- Deep multi-layer shadows: `inset 0 6px 16px rgba(0,0,0,0.95), inset 0 -3px 8px rgba(0,0,0,0.9)`
- EVA foam texture with grain pattern
- Darker foam edges (2px border, #1a1a1a)
- Proper tool spacing (10px padding)
- Foam color gradient: `linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)`

### 6. Damage Elements System

**Scratches (6-8 light, 3-5 dark):**
```typescript
// Light scratches (exposed metal)
{
  width: '80-150px',
  height: '1-2px',
  background: 'rgba(255,255,255,0.35)',
  transform: `rotate(${-45 to 45}deg)`,
  boxShadow: '0 0 2px rgba(0,0,0,0.7)'
}

// Dark scratches (deep gouges)
{
  width: '40-80px',
  height: '2px',
  background: 'rgba(0,0,0,0.6)',
  transform: `rotate(${-45 to 45}deg)`,
  boxShadow: '0 0 1px rgba(0,0,0,0.8)'
}
```

**Rust Spots (5-7):**
```typescript
{
  width: '12-18px',
  height: '12-18px',
  backgroundImage: 'url(/assets/texture/brownrust.png)',
  backgroundSize: 'cover',
  mixBlendMode: 'multiply',
  opacity: 0.5-0.6,
  borderRadius: '50%'
}
```

**Chipped Paint (4-6):**
```typescript
{
  width: '25-40px',
  height: '25-40px',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
  clipPath: 'polygon(0% 0%, 60% 0%, 0% 60%)', // Corner chip
  opacity: 0.7-0.8,
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)'
}
```

**Fingerprint Smudges (3-5 per visible area):**
```typescript
{
  width: '20-30px',
  height: '20-30px',
  background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
  borderRadius: '50%',
  filter: 'blur(2px)',
  opacity: 0.25-0.35
}
```

**Tape Patches (3-5):**
```typescript
{
  width: '50-80px',
  height: '18-25px',
  backgroundImage: 'url(/assets/texture/tape.png)',
  backgroundSize: 'cover',
  transform: `rotate(${-15 to 15}deg)`,
  opacity: 0.7-0.9,
  boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
}
// With handwritten note: Caveat font, 10-12px
```

### 7. Physical Details System

**Serial Number:**
- Position: Bottom-right of case interior
- Text: "FK-1985-A7" (or similar)
- Font: Courier New, 8px
- Style: Etched (light top, dark bottom shadow)
- Color: rgba(150,150,150,0.45)

**Calibration Notes:**
- Position: Near tools section
- Text: "cal. 03/19" or "last insp. 08/85"
- Font: Caveat, 11px
- Style: Handwritten, slight rotation
- Color: rgba(180,180,150,0.45)

**Warning Labels (on tape):**
- Text: "HANDLE WITH CARE", "FRAGILE", "DO NOT DROP"
- Font: Caveat, 10px
- On tape patches with rotation

**Manufacturing Stamps:**
- Text: "INSPECTED", "QC PASS", "MFG 1985"
- Font: Courier New, 8px, bold
- Style: Stamped effect with opacity 0.4
- Red or black ink

**Weld Lines (3-5):**
```typescript
// Horizontal seams
{
  height: '1px',
  background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
  opacity: 0.4-0.5
}
```


## Data Models

### ToolDeviceConfig

```typescript
interface ToolDeviceConfig {
  toolType: 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';
  material: 'metal' | 'plastic';
  icon: string;
  name: string;
  ledStatus: 'ready' | 'low' | 'error';
}

const TOOL_CONFIGS: ToolDeviceConfig[] = [
  { toolType: 'radar', material: 'metal', icon: '📡', name: 'RADAR', ledStatus: 'ready' },
  { toolType: 'emf', material: 'metal', icon: '📊', name: 'EMF', ledStatus: 'ready' },
  { toolType: 'thermal', material: 'plastic', icon: '🌡️', name: 'THERMAL', ledStatus: 'ready' },
  { toolType: 'audio', material: 'metal', icon: '📻', name: 'AUDIO', ledStatus: 'ready' },
  { toolType: 'camera', material: 'plastic', icon: '📷', name: 'CAMERA', ledStatus: 'ready' },
];
```

### SuppliesDisplay

```typescript
interface SuppliesDisplay {
  film: {
    count: number;
    displayType: 'mechanical-counter';
  };
  boosts: {
    count: number;
    max: number;
    displayType: 'led-gauge';
  };
  charms: {
    count: number;
    displayType: 'analog-indicator';
  };
}
```

### DamageElement

```typescript
interface DamageElement {
  type: 'scratch-light' | 'scratch-dark' | 'rust' | 'chip' | 'smudge' | 'tape';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: { width: string; height: string };
  rotation?: number;
  opacity: number;
  note?: string; // For tape patches
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Tool devices render with authentic materials

*For any* tool type, the rendered device should use the correct material (metal for Radar/EMF/Audio, plastic for Thermal/Camera) with appropriate textures and physical details.

**Validates: Requirements 1.1, 1.2**

### Property 2: All tool devices include required physical elements

*For any* tool device render, it should include corner screws, tape label with Caveat font, LED status indicator, and drop shadow for depth.

**Validates: Requirements 1.3, 1.4, 1.5**

### Property 3: Film counter displays as mechanical device

*For any* film count value, the counter should render as a mechanical tally counter with metal housing, black LCD background, white glowing digits, and etched label.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 4: Boost gauge displays as LED bar

*For any* boost count, the gauge should render as a horizontal LED bar with correct number of active segments glowing teal and inactive segments dark gray, in dark plastic housing with etched label.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 5: Charms indicator displays as analog card

*For any* charms count, the indicator should render as an aged paper card with large number, hand-drawn tally marks, handwritten Caveat label, torn edges, and tape strip.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 6: Case displays extensive damage elements

*For any* case render, it should include the required quantities of damage elements: 6-8 light scratches, 3-5 dark scratches, 5-7 rust spots, 4-6 paint chips, 3-5 fingerprints, and 3-5 tape patches.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

### Property 7: Foam cutouts maintain realistic depth

*For any* foam cutout, it should have deep inset shadows, EVA foam texture, darker edges, proper tool spacing (8-12px), and charcoal gray color.

**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

### Property 8: Hardware elements use authentic styling

*For any* hardware element (label, screws, latches, handle, rivets), it should use etched metal styling with appropriate gradients, shadows, and 3D appearance.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 9: Physical details are present

*For any* case render, it should include serial number, calibration notes, warning labels, manufacturing stamps, and weld lines with correct styling and positioning.

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

### Property 10: Tool viewer maintains analog aesthetic

*For any* tool viewing interaction, the modal should maintain full-screen display, preserve analog-horror styling, style close button appropriately, maintain tool functionality, and use smooth physical transitions.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

### Property 11: Existing functionality is preserved

*For any* user interaction, the system should maintain existing tool viewing behavior, display accurate supply counts, navigate correctly on back button, maintain responsive layout, and preserve all game logic.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

## Error Handling

### Missing Texture Assets

**Scenario:** Texture image fails to load

**Handling:**
- Fallback to CSS gradients
- Log warning to console
- Maintain visual structure
- Retry load after 2 seconds

### Invalid Supply Values

**Scenario:** Supply count is negative or exceeds max

**Handling:**
- Clamp to valid range (0-99)
- Display "ERR" in mechanical counter
- Log error to console
- Prevent further operations until reset

### Tool Device Render Errors

**Scenario:** Tool type is invalid or device fails to render

**Handling:**
- Fallback to emoji icon
- Log error to console
- Maintain foam cutout structure
- Show warning indicator

### Performance Issues

**Scenario:** Too many damage elements cause lag

**Handling:**
- Reduce damage element count dynamically
- Simplify shadows on low-end devices
- Disable non-critical textures
- Log performance warning

## Testing Strategy

### Unit Testing

**Component Tests:**
- PhysicalToolDevice renders with correct material
- MechanicalFilmCounter displays correct count
- LEDBoostGauge shows correct active segments
- AnalogCharmsIndicator displays number and tally marks
- Damage elements render in correct quantities
- Foam cutouts have proper depth styling
- Hardware elements use etched styling
- Physical details are present

**Interaction Tests:**
- Tool click opens viewer modal
- Back button navigates to map
- Supply counts update correctly
- Responsive layout works on mobile/desktop
- Tool viewer modal opens/closes smoothly

**Styling Tests:**
- Texture layers applied in correct order
- Z-index stacking is correct
- Colors match specifications
- Fonts are correct (Courier, Caveat)
- Shadows have proper depth


### Property-Based Testing

**Testing Framework:** fast-check (JavaScript property-based testing library)

**Test Configuration:** Minimum 100 iterations per property test

**Property Tests:**

#### Property Test 1: Tool device material consistency
```typescript
// Feature: inventory-screen-analog-upgrade, Property 1: Tool devices render with authentic materials
fc.assert(
  fc.property(
    fc.constantFrom('radar', 'emf', 'thermal', 'audio', 'camera'),
    (toolType) => {
      const rendered = renderPhysicalToolDevice({ toolType, size: 70 });
      const expectedMaterial = ['radar', 'emf', 'audio'].includes(toolType) ? 'metal' : 'plastic';
      return (
        hasCorrectMaterial(rendered, expectedMaterial) &&
        hasPhysicalTextures(rendered) &&
        hasPhysicalDetails(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 2: Tool device required elements
```typescript
// Feature: inventory-screen-analog-upgrade, Property 2: All tool devices include required physical elements
fc.assert(
  fc.property(
    fc.record({
      toolType: fc.constantFrom('radar', 'emf', 'thermal', 'audio', 'camera'),
      size: fc.integer({ min: 60, max: 80 }),
    }),
    (config) => {
      const rendered = renderPhysicalToolDevice(config);
      return (
        hasCornerScrews(rendered, 4) &&
        hasTapeLabel(rendered, 'Caveat') &&
        hasLEDIndicator(rendered) &&
        hasDropShadow(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 3: Film counter mechanical appearance
```typescript
// Feature: inventory-screen-analog-upgrade, Property 3: Film counter displays as mechanical device
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 99 }),
    (filmCount) => {
      const rendered = renderMechanicalFilmCounter({ count: filmCount });
      return (
        hasMechanicalCounterAppearance(rendered) &&
        hasMetalHousing(rendered) &&
        hasBlackLCDBackground(rendered) &&
        hasWhiteGlowingDigits(rendered) &&
        hasEtchedLabel(rendered, 'FILM ROLLS')
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 4: Boost gauge LED segments
```typescript
// Feature: inventory-screen-analog-upgrade, Property 4: Boost gauge displays as LED bar
fc.assert(
  fc.property(
    fc.record({
      count: fc.integer({ min: 0, max: 99 }),
      max: fc.constant(99),
    }),
    (boosts) => {
      const rendered = renderLEDBoostGauge(boosts);
      const expectedActiveSegments = Math.min(5, Math.ceil((boosts.count / boosts.max) * 5));
      return (
        hasLEDBarAppearance(rendered) &&
        hasActiveSegments(rendered, expectedActiveSegments, 'teal') &&
        hasInactiveSegments(rendered, 5 - expectedActiveSegments, 'dark-gray') &&
        hasDarkPlasticHousing(rendered) &&
        hasEtchedLabel(rendered, 'SCANNER BOOSTS')
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 5: Charms analog indicator
```typescript
// Feature: inventory-screen-analog-upgrade, Property 5: Charms indicator displays as analog card
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 99 }),
    (charmsCount) => {
      const rendered = renderAnalogCharmsIndicator({ count: charmsCount });
      return (
        hasAgedPaperCard(rendered) &&
        hasLargeNumber(rendered, charmsCount) &&
        hasTallyMarks(rendered, charmsCount) &&
        hasHandwrittenLabel(rendered, 'CHARMS', 'Caveat') &&
        hasTornEdges(rendered) &&
        hasTapeStrip(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 6: Damage element quantities
```typescript
// Feature: inventory-screen-analog-upgrade, Property 6: Case displays extensive damage elements
fc.assert(
  fc.property(
    fc.constant({}),
    () => {
      const rendered = renderEquipmentCase();
      const damage = getDamageElements(rendered);
      return (
        damage.lightScratches >= 6 && damage.lightScratches <= 8 &&
        damage.darkScratches >= 3 && damage.darkScratches <= 5 &&
        damage.rustSpots >= 5 && damage.rustSpots <= 7 &&
        damage.paintChips >= 4 && damage.paintChips <= 6 &&
        damage.fingerprints >= 3 && damage.fingerprints <= 5 &&
        damage.tapePatches >= 3 && damage.tapePatches <= 5
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 7: Foam cutout depth and styling
```typescript
// Feature: inventory-screen-analog-upgrade, Property 7: Foam cutouts maintain realistic depth
fc.assert(
  fc.property(
    fc.constantFrom('radar', 'emf', 'thermal', 'audio', 'camera'),
    (toolType) => {
      const rendered = renderFoamCutout(toolType);
      return (
        hasDeepInsetShadows(rendered) &&
        hasEVAFoamTexture(rendered) &&
        hasDarkerEdges(rendered) &&
        hasProperToolSpacing(rendered, 8, 12) &&
        hasCharcoalGrayColor(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 8: Hardware authentic styling
```typescript
// Feature: inventory-screen-analog-upgrade, Property 8: Hardware elements use authentic styling
fc.assert(
  fc.property(
    fc.constantFrom('label', 'screw', 'latch', 'handle', 'rivet'),
    (hardwareType) => {
      const rendered = renderHardwareElement(hardwareType);
      return (
        hasEtchedMetalStyle(rendered) &&
        hasAppropriateGradients(rendered) &&
        hasProperShadows(rendered) &&
        has3DAppearance(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 9: Physical details presence
```typescript
// Feature: inventory-screen-analog-upgrade, Property 9: Physical details are present
fc.assert(
  fc.property(
    fc.constant({}),
    () => {
      const rendered = renderEquipmentCase();
      return (
        hasSerialNumber(rendered) &&
        hasCalibrationNotes(rendered) &&
        hasWarningLabels(rendered) &&
        hasManufacturingStamps(rendered) &&
        hasWeldLines(rendered, 3, 5)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 10: Tool viewer analog aesthetic
```typescript
// Feature: inventory-screen-analog-upgrade, Property 10: Tool viewer maintains analog aesthetic
fc.assert(
  fc.property(
    fc.constantFrom('radar', 'emf', 'thermal', 'audio', 'camera'),
    (toolType) => {
      const rendered = renderToolViewerModal(toolType);
      return (
        isFullScreen(rendered) &&
        hasAnalogHorrorStyling(rendered) &&
        hasStyledCloseButton(rendered) &&
        maintainsToolFunctionality(rendered) &&
        hasSmoothTransitions(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property Test 11: Functionality preservation
```typescript
// Feature: inventory-screen-analog-upgrade, Property 11: Existing functionality is preserved
fc.assert(
  fc.property(
    fc.record({
      film: fc.integer({ min: 0, max: 99 }),
      boosts: fc.integer({ min: 0, max: 99 }),
      charms: fc.integer({ min: 0, max: 99 }),
    }),
    (supplies) => {
      const rendered = renderInventoryScreen(supplies);
      return (
        toolClickOpensViewer(rendered) &&
        suppliesMatchContext(rendered, supplies) &&
        backButtonNavigates(rendered) &&
        isResponsive(rendered) &&
        preservesGameLogic(rendered)
      );
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**Full Inventory Flow:**
1. Navigate to Inventory screen
2. Verify case exterior renders with damage
3. Verify foam interior with tool devices
4. Click tool → Verify viewer opens
5. Close viewer → Verify returns to inventory
6. Verify supply counters display correctly
7. Click back → Verify navigates to map

**Cross-Component Tests:**
- Tool devices render correctly in foam cutouts
- Supply counters update when context changes
- Damage elements don't overlap critical UI
- Physical details don't obscure functionality

### Visual Regression Testing

**Screenshot Comparisons:**
- Case exterior with all damage elements
- Case interior with tool devices
- Each supply counter type
- Tool viewer modal for each tool
- Mobile vs desktop layouts
- Empty vs full supply states

**Texture Verification:**
- All texture layers load correctly
- Opacity values are correct
- Z-index stacking is correct
- Blend modes work as expected

## Implementation Notes

### Texture Asset Requirements

**Required Textures:**
- `metalscratchedtexture.png` - Metal surfaces (existing)
- `brownrust.png` - Rust spots (existing)
- `dust.png` - Dust layer (existing)
- `smoothplastictexture.png` - Plastic tool devices
- `scratchedplasticdark.png` - Scratched plastic
- `wrinkledpaper.png` - Charms indicator card
- `tape.png` - Tape patches (existing)

**Texture Specifications:**
- Format: PNG with transparency
- Size: 512×512px minimum
- Compression: Optimized for web
- Location: `/assets/texture/`

### Performance Optimization

**Texture Loading:**
- Preload all textures on screen mount
- Use CSS for simple effects (gradients, shadows)
- Cache texture images in memory
- Lazy load non-critical damage elements

**Rendering Performance:**
- Use `transform` and `opacity` for animations
- Avoid animating `height`, `width`, or `top/left`
- Reduce damage element count on low-end devices
- Simplify shadows for mobile

### Responsive Design

**Mobile (< 768px):**
- Tool devices: 60px × 60px
- Supply counters: Stacked vertically
- Reduced damage element count
- Simplified shadows
- Larger tap targets (44px minimum)

**Desktop (≥ 768px):**
- Tool devices: 80px × 80px
- Supply counters: Horizontal grid
- Full damage element count
- Enhanced shadows and depth
- Hover effects enabled

### Accessibility

**Screen Readers:**
- Proper ARIA labels for all interactive elements
- Announce tool selection changes
- Describe supply counts
- Indicate case state

**Keyboard Navigation:**
- Tab through tools
- Enter/Space to select tool
- Escape to close viewer
- Arrow keys for navigation

**Visual Accessibility:**
- High contrast mode support
- Reduce motion option
- Larger text option
- Color-blind friendly LED colors

### Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallbacks:**
- CSS Grid → Flexbox
- Blend modes → Opacity layers
- Custom fonts → System fonts
- Advanced shadows → Simple shadows

## Migration Strategy

### Phase 1: Tool Devices
1. Create PhysicalToolDevice component
2. Replace emoji icons with miniature devices
3. Add tape labels and LED indicators
4. Test tool clicking functionality

### Phase 2: Supply Counters
1. Create MechanicalFilmCounter component
2. Create LEDBoostGauge component
3. Create AnalogCharmsIndicator component
4. Replace existing counter displays
5. Test supply count updates

### Phase 3: Damage & Details
1. Add scratch generation system
2. Add rust spots and paint chips
3. Add fingerprints and tape patches
4. Add serial numbers and notes
5. Add weld lines and stamps

### Phase 4: Foam Enhancement
1. Enhance foam cutout shadows
2. Add EVA foam texture
3. Improve foam edges
4. Adjust tool spacing

### Phase 5: Hardware Upgrade
1. Enhance label plate styling
2. Upgrade screw rendering
3. Improve latch appearance
4. Enhance handle styling
5. Upgrade rivet appearance

### Phase 6: Polish & Testing
1. Run all property tests
2. Perform visual regression testing
3. Test on mobile devices
4. Optimize performance
5. Final polish and adjustments
