# Design Document

## Overview

This document outlines the design for transforming the Investigation Mode UI to use the finalized 007-standard tool designs. The transformation will extract visual components from playground mocks and integrate them with existing investigation functionality, creating immersive, full-screen tool interfaces that display real ghost-hunting data.

**Key Design Goals:**
1. Maintain exact visual aesthetic from playground mocks
2. Preserve all existing investigation functionality
3. Create reusable, prop-driven tool components
4. Ensure smooth performance on mobile devices
5. Support seamless tool switching

---

## Architecture

### High-Level Component Structure

```
InvestigationScreen
├── InvestigationProvider (context)
├── FieldScanner (current radar) → RadarTool (new)
├── FieldKitDrawer (tool switcher)
│   ├── Tool selection UI
│   └── Active tool indicator
└── Tool Components (new)
    ├── RadarTool
    ├── EMFTool
    ├── ThermalTool
    ├── CameraTool
    └── SpiritBoxTool
```

### Component Hierarchy

```typescript
// New tool component structure
<ToolContainer>
  <ToolCasing material="metal|plastic">
    <TextureLayer type="base" />
    <TextureLayer type="dust" />
    <TextureLayer type="wrinkled" />
    <DamageLayer>
      <Scratches />
      <RustSpots />
      <TapePatches />
      <ChippedCorners />
    </DamageLayer>
    <ToolDisplay>
      {/* Tool-specific display content */}
      <DisplayEffects>
        <Scanlines />
        <Grain />
        <Glow />
      </DisplayEffects>
    </ToolDisplay>
    <ToolLabels>
      <HandwrittenLabel />
      <SerialNumber />
    </ToolLabels>
  </ToolCasing>
</ToolContainer>
```

---

## Components and Interfaces

### 1. Base Tool Components

#### ToolContainer
**Purpose:** Full-screen wrapper for all investigation tools

**Props:**
```typescript
interface ToolContainerProps {
  children: React.ReactNode;
  zIndex?: number;
}
```

**Responsibilities:**
- Provide full-screen layout (100vw × 100vh)
- Handle z-index layering
- Manage background color

---

#### ToolCasing
**Purpose:** Device body with material-specific styling

**Props:**
```typescript
interface ToolCasingProps {
  material: 'metal' | 'plastic-light' | 'plastic-dark';
  children: React.ReactNode;
}
```

**Responsibilities:**
- Apply material-specific gradients
- Add beveled edges for depth
- Include inset shadows

---

#### TextureLayer
**Purpose:** Reusable texture overlay component

**Props:**
```typescript
interface TextureLayerProps {
  type: 'base' | 'dust' | 'wrinkled' | 'rust';
  opacity?: number;
  blendMode?: 'multiply' | 'overlay' | 'screen';
  zIndex?: number;
}
```

**Responsibilities:**
- Load and display texture image
- Apply blend mode and opacity
- Position absolutely with proper z-index

---

#### DamageLayer
**Purpose:** Container for damage elements (scratches, rust, etc.)

**Props:**
```typescript
interface DamageLayerProps {
  scratches?: ScratchConfig[];
  rustSpots?: RustSpotConfig[];
  tapePatches?: TapePatchConfig[];
  chippedCorners?: ChipConfig[];
}

interface ScratchConfig {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  width: string;
  angle: number;
  opacity: number;
  color: 'light' | 'dark';
}

interface RustSpotConfig {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: string;
  opacity: number;
}

interface TapePatchConfig {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  width: string;
  height: string;
  rotation: number;
  opacity: number;
}

interface ChipConfig {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: string;
  clipPath: string;
}
```

**Responsibilities:**
- Render damage elements at specified positions
- Apply proper z-index (6-10)
- Support deterministic randomization based on tool ID

---

### 2. Tool-Specific Components

#### RadarTool
**Purpose:** Circular CRT radar display with ghost detection (DIRECTION ONLY - per Spec 006)

**Props:**
```typescript
interface RadarToolProps {
  ghostBearing: number;        // 0-360 degrees (direction to ghost)
  playerHeading: number;       // 0-360 degrees (player facing direction)
  isGhostInCone: boolean;      // Is ghost within ±45° forward cone?
  isGhostMoving: boolean;
  sweepSpeed?: number;         // degrees per frame
}
```

**Important Design Note (from Spec 006):**
- **Radar shows DIRECTION only, NOT distance**
- Ghost blip appears ONLY when within ±45° forward cone
- Range rings are visual reference only (NO distance labels like "50m", "100m")
- Displays "HDG: XXX°" for player heading
- Displays "TARGET: XXX°" for ghost bearing (only when in cone)
- NO distance indicators anywhere (no "120m", "RNG: 150m", etc.)
- This is fundamental to gameplay: Radar = direction, EMF = distance

**Key Features:**
- Circular CRT screen with thick metal bezel
- Animated sweep line that rotates with player heading
- Ghost blip at bearing angle (ONLY when in forward cone)
- Range rings (visual reference only, no distance labels)
- Compass heading indicator ("HDG: XXX°")
- Target bearing indicator ("TARGET: XXX°" when ghost visible)
- North indicator (always points north)
- CRT glow and scanline effects

**Visual Elements (from RadarToolMock):**
- Heavy steel casing with weld lines
- Thick metal bezel (35px+)
- Deep screen inset
- Corner reinforcement plates
- Vent grilles on sides
- Extensive rust and scratches

---

#### EMFTool
**Purpose:** LED bar graph meter for electromagnetic field detection

**Props:**
```typescript
interface EMFToolProps {
  emfLevel: number;           // 0-5
  isFlickering: boolean;
  lastSpikeTime?: number;
}
```

**Key Features:**
- 5 LED columns × 5 segments each
- Color progression (green → yellow → orange → red)
- Glow effects when active
- Flickering animation on spikes
- Level labels (1-5)

**Visual Elements (from EMFMeterMock):**
- Dark gray plastic casing
- Recessed display with screws
- Tape on battery cover
- Calibration note (handwritten)
- Multiple scratches and wear

---

#### ThermalTool
**Purpose:** Thermal imaging camera for cold spot detection

**Props:**
```typescript
interface ThermalToolProps {
  coldSpots: ColdSpot[];
  ambientTemp: number;        // Celsius
  scanLinePosition: number;   // 0-100%
}

interface ColdSpot {
  x: number;                  // pixels from left
  y: number;                  // pixels from top
  intensity: number;          // 0-1
  radius: number;             // pixels
}
```

**Key Features:**
- Thermal gradient background
- Animated scan lines
- Cold spot visualization (blue glow)
- Temperature readout
- Anomaly warning indicator
- Crosshair overlay

**Visual Elements (from ThermalScannerMock):**
- Yellowed plastic casing
- Dirty glass overlay
- Film grain effect
- Temperature display
- Status indicators

---

#### CameraTool
**Purpose:** 1980s Polaroid camera viewfinder

**Props:**
```typescript
interface CameraToolProps {
  filmCount: number;
  batteryLevel: number;       // 0-100%
  isRecording: boolean;
  timestamp: string;          // HH:MM:SS
  onCapture: () => void;
}
```

**Key Features:**
- 4:3 aspect ratio viewfinder frame
- Blinking REC indicator
- Live timestamp display
- Battery indicator
- Film grain and VHS effects
- Crosshairs and focus brackets
- Hair on lens effects

**Visual Elements (from CameraViewfinderMock):**
- Black camera body frame
- Heavy vignetting
- Rust on frame corners
- Multiple texture layers
- VHS glitch effects

---

#### SpiritBoxTool
**Purpose:** Oscilloscope-style EVP recorder

**Props:**
```typescript
interface SpiritBoxToolProps {
  waveform: number[];         // Array of amplitude values 0-1
  frequency: number;          // MHz
  staticLevel: number;        // 0-1
  evpResponse?: string;       // Current EVP text
  showResponse: boolean;
}
```

**Key Features:**
- Oscilloscope waveform display
- Grid lines overlay
- Animated waveform
- EVP text overlay (fades in/out)
- Frequency display
- Static level indicator
- Physical knobs (visual only for MVP)

**Visual Elements (from SpiritBoxMock):**
- Dark brown/black plastic casing
- Bent antenna
- Oscilloscope screen
- Frequency readout
- Heavy dust and grime

---

## Data Models

### Investigation Tool State

```typescript
interface InvestigationToolState {
  activeTool: ToolType;
  radar: RadarData;
  emf: EMFData;
  thermal: ThermalData;
  camera: CameraData;
  spiritBox: SpiritBoxData;
}

type ToolType = 'radar' | 'emf' | 'thermal' | 'camera' | 'spiritBox';

interface RadarData {
  ghostBearing: number;       // 0-360 degrees (direction to ghost)
  isGhostInCone: boolean;     // Is ghost within ±45° forward cone?
  playerHeading: number;      // 0-360 degrees (player facing direction)
  isGhostMoving: boolean;
  // NOTE: ghostDistance is NOT included - Radar shows direction only (Spec 006)
}

interface EMFData {
  level: number;              // 0-5
  isFlickering: boolean;
  history: number[];          // Last 10 readings
}

interface ThermalData {
  coldSpots: ColdSpot[];
  ambientTemp: number;
  scanLinePosition: number;
}

interface CameraData {
  filmCount: number;
  batteryLevel: number;
  isRecording: boolean;
  capturedPhotos: Photo[];
}

interface SpiritBoxData {
  waveform: number[];
  frequency: number;
  staticLevel: number;
  evpResponse: string | null;
  showResponse: boolean;
}
```

### Tool Configuration

```typescript
interface ToolConfig {
  id: ToolType;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  damageConfig: DamageConfig;
}

interface DamageConfig {
  scratches: ScratchConfig[];
  rustSpots: RustSpotConfig[];
  tapePatches: TapePatchConfig[];
  chippedCorners: ChipConfig[];
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Tool Display Consistency
*For any* investigation tool, when the tool is active, the displayed UI should match the 007 standard visual design from the corresponding playground mock.

**Validates: Requirements 1.1, 2.1, 3.1, 4.1, 5.1**

---

### Property 2: Data Synchronization
*For any* tool displaying investigation data, the displayed values should always reflect the current state from the investigation context within one render cycle.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

---

### Property 3: Tool Switching Preservation
*For any* tool switch operation, all investigation state (ghost position, sanity, evidence, supplies) should remain unchanged after the switch completes.

**Validates: Requirements 6.3**

---

### Property 4: Performance Bounds
*For any* tool animation or update, the frame time should not exceed 16ms (60fps) on target mobile devices.

**Validates: Requirements 8.1, 8.2**

---

### Property 5: Visual Layer Ordering
*For any* tool component, the z-index layering should follow the 007 standard order: background (0) → casing (1) → textures (2-5) → damage (6-10) → display (11-15) → effects (16-20) → UI (21-25).

**Validates: Requirements 9.2**

---

### Property 6: Texture Application
*For any* tool component, the texture layers should include at least 3 layers (base, dust, wrinkled) with appropriate blend modes and opacity values per 007 standard.

**Validates: Requirements 9.1**

---

### Property 7: Damage Element Presence
*For any* tool component, the damage layer should include at least 5 damage elements (scratches, rust, tape, chips) positioned deterministically based on tool ID.

**Validates: Requirements 9.4**

---

### Property 8: Typography Consistency
*For any* text element in a tool UI, handwritten labels should use Caveat font and technical text should use Courier New font per 007 standard.

**Validates: Requirements 9.3**

---

### Property 9: Backward Compatibility
*For any* investigation feature that existed before the UI transformation, the feature should continue to function identically after the transformation.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

---

### Property 10: Tool Transition Speed
*For any* tool switch operation, the transition should complete in under 500ms from user action to new tool fully rendered.

**Validates: Requirements 8.3**

---

## Error Handling

### GPS/Compass Errors
- **Fallback:** Use manual rotation controls
- **User Feedback:** Display calibration prompt
- **Recovery:** Retry sensor initialization

### Tool Rendering Errors
- **Fallback:** Display error overlay with retry button
- **User Feedback:** Show error message
- **Recovery:** Attempt to reload tool component

### Performance Degradation
- **Detection:** Monitor frame times
- **Mitigation:** Reduce effect complexity
- **User Feedback:** Optional "performance mode" toggle

### Data Sync Errors
- **Detection:** Validate props on each render
- **Mitigation:** Use previous valid state
- **User Feedback:** Display "syncing" indicator

---

## Testing Strategy

### Unit Tests
- Test tool component rendering with various prop combinations
- Test texture layer application
- Test damage element positioning
- Test z-index layering
- Test typography application

### Integration Tests
- Test tool switching with investigation context
- Test data flow from ghost behavior to tool displays
- Test GPS/compass integration with radar tool
- Test film count updates with camera tool
- Test EVP response display with spirit box tool

### Property-Based Tests
- **Framework:** fast-check (JavaScript property testing library)
- **Configuration:** Minimum 100 iterations per property test
- **Tagging:** Each test tagged with `Feature: 010-investigation-ui-transformation, Property X`

**Property Tests:**
1. Tool display consistency (visual regression)
2. Data synchronization (state updates)
3. Tool switching preservation (state immutability)
4. Performance bounds (frame timing)
5. Visual layer ordering (z-index validation)
6. Texture application (layer presence)
7. Damage element presence (element count)
8. Typography consistency (font validation)
9. Backward compatibility (feature parity)
10. Tool transition speed (timing validation)

### Visual Regression Tests
- Screenshot comparison with playground mocks
- Verify texture application
- Verify damage element positioning
- Verify color accuracy

### Performance Tests
- Frame rate monitoring during tool animations
- Memory usage profiling
- Tool switching latency measurement
- Texture loading time measurement

---

## Implementation Notes

### Component Extraction Strategy

**Phase 1: Create Base Components**
1. Extract common visual elements (ToolContainer, ToolCasing, TextureLayer, DamageLayer)
2. Create reusable damage components (Scratches, RustSpots, TapePatches, etc.)
3. Test base components in isolation

**Phase 2: Build Tool Components**
1. Start with RadarTool (most complex)
2. Extract visual layers from RadarToolMock
3. Add props for dynamic data
4. Test with real investigation data
5. Repeat for other tools

**Phase 3: Integration**
1. Update InvestigationScreen to use new tool components
2. Connect tools to investigation context
3. Update FieldKitDrawer for tool switching
4. Add transition effects

### Code Reuse from Mocks

**What to reuse directly:**
- Texture layer JSX structure
- Damage element configurations
- Animation keyframes
- Color values and gradients
- Shadow definitions

**What to extract as props:**
- Ghost position/bearing
- EMF levels
- Temperature readings
- Film count
- EVP responses
- Waveform data

**What to simplify for MVP:**
- Complex animations (keep simple versions)
- Random variations (use deterministic configs)
- Dev-only features (remove or make optional)

### Performance Optimization

**Texture Loading:**
- Preload all textures on investigation start
- Use image sprites where possible
- Cache loaded textures in memory

**Animation:**
- Use CSS animations for simple effects
- Use requestAnimationFrame for complex animations
- Throttle updates to 60fps max

**Rendering:**
- Memoize tool components with React.memo
- Use useMemo for expensive calculations
- Avoid unnecessary re-renders

---

## Future Enhancements

### Phase 2 Features (Post-MVP)
- Advanced tool interactions (tap to focus, pinch to zoom)
- Tool-specific ghost reactions
- Enhanced animation effects
- Tool upgrade system
- Custom tool skins

### Phase 3 Features
- Multiplayer tool sharing
- Tool calibration mini-games
- Advanced EVP analysis
- Photo development effects
- Tool damage/repair system

---

## Dependencies

- React 18+
- React Router (for navigation)
- Investigation Context (existing)
- Ghost Behavior Engine (existing)
- GPS/Compass Utilities (existing)
- Texture Assets (from playground mocks)

---

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Performance degradation on low-end devices | High | Medium | Implement performance mode, reduce effects |
| Texture loading delays | Medium | Low | Preload textures, show loading state |
| Complex component extraction | Medium | Medium | Start with simplest tool, iterate |
| Breaking existing functionality | High | Low | Comprehensive testing, feature flags |
| Visual inconsistency with mocks | Medium | Medium | Visual regression tests, design review |

---

## Success Metrics

- All 5 tools render with 007-standard visuals
- 60fps maintained on target devices (iPhone 12, Pixel 5)
- Tool switching completes in < 300ms
- Zero regression in existing investigation features
- Visual match > 95% with playground mocks (automated comparison)
