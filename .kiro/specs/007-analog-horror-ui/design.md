# Design Document - Spec 007: Analog Horror UI

## Overview

This spec transforms Ghost Hunt's visual aesthetic from cartoony to atmospheric analog horror using pure code-based effects (CSS, Canvas, SVG). The design creates a "found footage" paranormal investigation experience with CRT/VHS effects, monochrome green displays, and retro tech UI elements inspired by Demonologist and FNAF.

**Core Philosophy:** Every UI element should feel like authentic 1980s-90s paranormal investigation equipment - oscilloscopes, CRT monitors, VHS cameras, and analog sensors.

---

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Effects/
│   │   ├── CRTOverlay.tsx          # Scanlines + static
│   │   ├── VHSEffect.tsx           # Tracking lines + chromatic aberration
│   │   ├── GlitchTransition.tsx    # Screen transition effects
│   │   └── StaticBurst.tsx         # Static burst animation
│   ├── Investigation/
│   │   ├── RadarDisplay.tsx        # Enhanced oscilloscope radar
│   │   ├── ToolFrame.tsx           # Retro tech bezel wrapper
│   │   └── AtmosphereLayer.tsx     # Vignette + particles
│   ├── Codex/
│   │   ├── GhostCodex.tsx          # Case files interface
│   │   ├── GhostCard.tsx           # Individual ghost entry
│   │   └── CodexTransition.tsx     # Static burst between entries
│   ├── Profile/
│   │   ├── ProfileBadge.tsx        # Security badge card
│   │   └── StatsDisplay.tsx        # Investigation stats
│   └── HUD/
│       ├── BottomControlPanel.tsx  # Redesigned tool bar
│       ├── ToolButton.tsx          # Individual tool button
│       └── SanityDisplay.tsx       # Glitchy sanity bar
├── styles/
│   ├── crt-effects.css             # CRT/VHS effect styles
│   ├── monochrome-green.css        # Color scheme variables
│   └── retro-tech.css              # Bezel and frame styles
└── utils/
    ├── glitchEffects.ts            # Glitch animation utilities
    └── canvasNoise.ts              # Noise/grain generation
```

---

## Components and Interfaces

### 1. CRT/VHS Effects System

#### CRTOverlay Component

```typescript
interface CRTOverlayProps {
  intensity?: number; // 0-1, default 0.5
  scanlineSpacing?: number; // pixels, default 3
  staticOpacity?: number; // 0-1, default 0.08
  flickerEnabled?: boolean; // default true
}

// Renders:
// - Horizontal scanlines (CSS repeating-linear-gradient)
// - Static noise texture (Canvas, cached)
// - Subtle flicker animation (CSS animation)
// - Chromatic aberration (CSS text-shadow with RGB split)
```

**Implementation:**
- Fixed position overlay covering entire screen
- Pointer-events: none (doesn't block interactions)
- Uses CSS mix-blend-mode for authentic CRT look
- Canvas-generated noise texture (256x256, cached, repeated)

#### VHSEffect Component

```typescript
interface VHSEffectProps {
  active: boolean; // Show tracking lines
  duration?: number; // ms, default 300
}

// Renders:
// - Vertical tracking lines (animated)
// - Horizontal distortion bars
// - Color bleeding effect
```

---

### 2. Enhanced Radar Display

#### RadarDisplay Component

```typescript
interface RadarDisplayProps {
  ghostBearing: number; // 0-360°
  playerHeading: number; // 0-360°
  compassAccuracy: number; // degrees
  isGhostInCone: boolean;
}

// Visual Elements:
// - Concentric range rings (SVG circles)
// - Rotating sweep line with glow trail
// - Pulsing ghost blip (when in cone)
// - Grid overlay (subtle)
// - Cardinal direction labels (N/S/E/W)
// - Retro tech bezel frame
// - Noise texture background
```

**Styling:**
```css
.radar-display {
  background: #0a0e0f;
  border: 2px solid #00ff41;
  box-shadow: 
    0 0 10px #00ff4144,
    inset 0 0 20px #00ff4122;
  position: relative;
}

.radar-sweep {
  background: linear-gradient(
    90deg,
    transparent 0%,
    #00ff4188 50%,
    transparent 100%
  );
  filter: blur(2px);
  animation: sweep 4s linear infinite;
}

.ghost-blip {
  width: 12px;
  height: 12px;
  background: #00ff41;
  border-radius: 50%;
  box-shadow: 0 0 20px #00ff41;
  animation: pulse 1s ease-in-out infinite;
}
```

---

### 3. Retro Tech Tool Frames

#### ToolFrame Component

```typescript
interface ToolFrameProps {
  toolName: string;
  children: React.ReactNode;
  status?: string; // e.g., "ACTIVE", "STANDBY"
  signalStrength?: number; // 0-100
}

// Renders:
// - Corner brackets (SVG)
// - Tool name header (uppercase, glowing)
// - Status indicator
// - Signal strength bar
// - Content area with bezel
```

**Frame Styles:**
```css
.tool-frame {
  border: 2px solid #00ff41;
  padding: 16px;
  position: relative;
}

.tool-frame::before,
.tool-frame::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00ff88;
}

.tool-frame::before {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
}

.tool-frame::after {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
}

.tool-header {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #00ff41;
  text-shadow: 0 0 10px #00ff41;
}
```

---

### 4. Ghost Codex Interface

#### GhostCodex Component

```typescript
interface GhostCodexProps {
  ghosts: GhostEntry[];
  selectedGhostId?: string;
  onSelectGhost: (id: string) => void;
}

interface GhostEntry {
  id: string;
  name: string;
  isUnlocked: boolean;
  imageUrl?: string; // Placeholder or final asset
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  encounters: number;
  characteristics: string[];
  description?: string;
}
```

#### GhostCard Component

```typescript
interface GhostCardProps {
  ghost: GhostEntry;
  isSelected: boolean;
}

// Visual Layout:
// ┌─────────────────────────────────┐
// │ PARANORMAL DATABASE - CLASSIFIED│
// ├─────────────────────────────────┤
// │                                 │
// │      [Ghost Image/Silhouette]   │
// │      (Floating animation)       │
// │                                 │
// │ ENTITY: WRAITH                  │
// │ THREAT: ████████░░ HIGH         │
// │ ENCOUNTERS: 3                   │
// │                                 │
// │ CHARACTERISTICS:                │
// │ • Fast movement                 │
// │ • Strong EMF signature          │
// │ • Aggressive behavior           │
// │                                 │
// └─────────────────────────────────┘
```

**Ghost Image Animation:**
```css
.ghost-image {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px #00ff4188);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.ghost-image.locked {
  filter: brightness(0) drop-shadow(0 0 10px #00ff41);
  opacity: 0.3;
}
```

---

### 5. Profile Badge

#### ProfileBadge Component

```typescript
interface ProfileBadgeProps {
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: string;
  clearanceLevel: number;
  stats: {
    investigationsCompleted: number;
    ghostsCaught: number;
    successRate: number;
  };
}

// Visual Layout:
// ┌─────────────────────────────────┐
// │ INVESTIGATOR ID                 │
// ├─────────────────────────────────┤
// │ ┌─────┐                         │
// │ │ [?] │ AGENT: [USERNAME]       │
// │ └─────┘ RANK: ROOKIE            │
// │                                 │
// │ LEVEL: 5  ████████░░ 80%       │
// │                                 │
// │ INVESTIGATIONS: 12              │
// │ GHOSTS CAUGHT: 8                │
// │ SUCCESS RATE: 67%               │
// │                                 │
// │ [CLEARANCE: LEVEL 2]            │
// └─────────────────────────────────┘
```

---

### 6. Bottom HUD with Field Kit Drawer

#### BottomHUD Component

```typescript
interface BottomHUDProps {
  activeTool: ToolId;
  sanity: number;
  filmCount: number;
  isFieldKitOpen: boolean;
  onToggleFieldKit: () => void;
}

// Visual Layout (Closed):
// ┌─────────────────────────────────────────┐
// │                                         │
// │  📡 RADAR - ACTIVE                      │
// │                                         │
// │  SANITY: ████████░░ 80%                │
// │                                         │
// │  [🎒 FIELD KIT]        [FILM: 3]       │
// │                                         │
// └─────────────────────────────────────────┘

// Visual Layout (Open - Drawer slides up):
// ┌─────────────────────────────────────────┐
// │ ╔═══════════════════════════════════╗   │
// │ ║ FIELD KIT - SELECT TOOL           ║   │
// │ ╠═══════════════════════════════════╣   │
// │ ║ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   ║   │
// │ ║ │ 📡│ │ 📊│ │ 🌡️│ │ 📻│ │ 📷│   ║   │
// │ ║ │RAD│ │EMF│ │THM│ │AUD│ │CAM│   ║   │
// │ ║ └───┘ └───┘ └───┘ └───┘ └───┘   ║   │
// │ ╚═══════════════════════════════════╝   │
// │                                         │
// │  SANITY: ████████░░ 80%                │
// │  [🎒 CLOSE]            [FILM: 3]       │
// └─────────────────────────────────────────┘
```

**Design Philosophy:**
- **Intentional friction** - Opening drawer creates skill expression
- **Quick tool juggling** - Tap backpack → select tool → drawer closes
- **Time pressure** - Every second counts during investigation
- **No arrow cycling** - Must open drawer to see all options

#### FieldKitDrawer Component

```typescript
interface FieldKitDrawerProps {
  isOpen: boolean;
  activeTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
  onClose: () => void;
}

// Renders:
// - Slide-up drawer with retro tech styling
// - All 5 tools in a row
// - Active tool highlighted with glow
// - Corner brackets on drawer
// - "FIELD KIT - SELECT TOOL" header
```

**Drawer Styling:**
```css
.field-kit-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0a0e0f;
  border-top: 2px solid #00ff41;
  box-shadow: 0 -4px 20px #00ff4144;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
}

.field-kit-drawer.open {
  transform: translateY(0);
}

.field-kit-drawer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%,
    #00ff41 50%,
    transparent 100%
  );
  animation: scan 2s linear infinite;
}
```

**Tool Button Styling:**
```css
.tool-button {
  width: 60px;
  height: 60px;
  background: #0a0e0f;
  border: 2px solid #003311;
  color: #00ff41;
  transition: all 0.2s;
}

.tool-button:hover {
  border-color: #00ff41;
  box-shadow: 0 0 10px #00ff4144;
}

.tool-button.active {
  border-color: #00ff88;
  background: #00331144;
  box-shadow: 
    0 0 20px #00ff4188,
    inset 0 0 10px #00ff4144;
}

.tool-button.active::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid #00ff88;
  animation: pulse-border 1s ease-in-out infinite;
}
```

**Field Kit Button:**
```css
.field-kit-button {
  padding: 12px 24px;
  background: #0a0e0f;
  border: 2px solid #00ff41;
  color: #00ff41;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.field-kit-button:hover {
  background: #00331144;
  box-shadow: 0 0 15px #00ff4188;
}

.field-kit-button.open {
  border-color: #00ff88;
  box-shadow: 0 0 20px #00ff4188;
}
```

---

### 7. Glitch Transition System

#### GlitchTransition Component

```typescript
interface GlitchTransitionProps {
  isActive: boolean;
  type: 'static-burst' | 'rgb-split' | 'screen-shake' | 'vhs-tracking';
  duration?: number; // ms
  onComplete?: () => void;
}

// Effects:
// - static-burst: Full screen static flash
// - rgb-split: Chromatic aberration
// - screen-shake: Rapid position offset
// - vhs-tracking: Vertical tracking lines
```

**Static Burst Animation:**
```css
@keyframes static-burst {
  0% { opacity: 0; }
  10% { opacity: 1; }
  20% { opacity: 0.8; }
  30% { opacity: 1; }
  40% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.static-burst {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/noise-texture.png');
  mix-blend-mode: screen;
  animation: static-burst 0.3s ease-out;
}
```

---

## Data Models

### Color Palette

```typescript
const MonochromeGreen = {
  // Primary colors
  primary: '#00ff41',      // Bright green
  primaryDark: '#00cc33',  // Darker green
  primaryLight: '#00ff88', // Lighter green
  
  // Background colors
  bgDeep: '#0a0e0f',       // Almost black
  bgDark: '#0f1419',       // Dark gray
  bgMedium: '#1a1f24',     // Medium gray
  
  // Accent colors
  accentDark: '#003311',   // Very dark green
  accentMedium: '#005522', // Medium dark green
  
  // Glow colors (with alpha)
  glowSoft: '#00ff4144',   // 27% opacity
  glowMedium: '#00ff4188', // 53% opacity
  glowStrong: '#00ff41cc', // 80% opacity
  
  // Special states
  warning: '#ffaa00',      // Amber (for low sanity)
  danger: '#ff4444',       // Red (for critical states)
};
```

### Typography

```typescript
const Typography = {
  fontFamily: {
    mono: '"Courier New", "Courier", monospace',
    display: '"Share Tech Mono", monospace', // Optional web font
  },
  
  sizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
  },
  
  weights: {
    normal: 400,
    bold: 700,
  },
  
  letterSpacing: {
    tight: '0.5px',
    normal: '1px',
    wide: '2px',
    wider: '3px',
  },
};
```

### Effect Intensities

```typescript
interface EffectSettings {
  scanlines: {
    spacing: number;      // 2-4px
    opacity: number;      // 0.15-0.25
  };
  static: {
    opacity: number;      // 0.05-0.10
    updateInterval: number; // ms, 100-200
  };
  glow: {
    blur: number;         // 5-15px
    spread: number;       // 0-5px
  };
  flicker: {
    frequency: number;    // seconds between flickers
    duration: number;     // ms per flicker
  };
  chromatic: {
    offset: number;       // 1-2px RGB split
  };
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: CRT Effects Always Visible
*For any* investigation screen render, the CRT overlay (scanlines + static) should be present and visible at the configured opacity level.
**Validates: Requirements 1.1, 1.2**

### Property 2: Color Scheme Consistency
*For any* UI element rendered, all colors should use the monochrome green palette with no other hues (except warning/danger states).
**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: Glow Effect Hierarchy
*For any* interactive element, the glow intensity should increase when hovered/active compared to default state.
**Validates: Requirements 2.3**

### Property 4: Radar Sweep Continuous
*For any* time the radar is active, the sweep line should continuously rotate at a constant speed without interruption.
**Validates: Requirements 3.2**

### Property 5: Ghost Blip Visibility
*For any* radar state where ghost is in forward cone, the ghost blip should be visible and pulsing.
**Validates: Requirements 3.3**

### Property 6: Tool Frame Consistency
*For any* tool activation, the tool frame should display with corner brackets, header, and appropriate bezel styling.
**Validates: Requirements 4.1**

### Property 7: Transition Completion
*For any* screen transition, the glitch effect should complete fully before new content is displayed.
**Validates: Requirements 7.1, 7.2**

### Property 8: Text Glow Visibility
*For any* text element, the glow effect should be visible and proportional to text importance (headers > body > labels).
**Validates: Requirements 8.2, 8.4**

### Property 9: Performance Threshold
*For any* combination of active effects, the frame rate should remain above 30fps on target devices.
**Validates: Requirements 11.1**

### Property 10: Placeholder Fallback
*For any* missing asset, the system should display an appropriate fallback (silhouette, geometric shape, or "PLACEHOLDER" label).
**Validates: Requirements 12.5**

---

## Error Handling

### Missing Assets
- Ghost images: Display silhouette with "UNKNOWN ENTITY" label
- Tool icons: Display geometric shape (circle, square, triangle)
- Textures: Generate with CSS gradients/patterns

### Performance Degradation
- If FPS drops below 30: Reduce effect intensity automatically
- If device is low-end: Provide "Reduce Effects" toggle in settings
- If Canvas fails: Fallback to CSS-only effects

### Browser Compatibility
- If mix-blend-mode unsupported: Use opacity-based effects
- If CSS filters unsupported: Disable chromatic aberration
- If Canvas unsupported: Use static image for noise texture

---

## Testing Strategy

### Visual Regression Testing
- Screenshot comparison for each UI component
- Verify color palette consistency
- Check glow effect rendering
- Validate scanline spacing

### Performance Testing
- Measure FPS with all effects active
- Test on low-end devices (iPhone SE, budget Android)
- Monitor memory usage
- Profile Canvas rendering

### Animation Testing
- Verify sweep rotation speed
- Check pulse timing
- Test flicker randomness
- Validate transition durations

### Accessibility Testing
- Ensure text remains readable with effects
- Verify contrast ratios meet WCAG AA
- Test with effects disabled
- Check for motion sickness triggers

---

## Implementation Notes

### Phase 1: Core Effects System
- CRT overlay component
- VHS effect component
- Color palette CSS variables
- Typography system

### Phase 2: Radar Enhancement
- Oscilloscope-style display
- Sweep animation
- Ghost blip with pulse
- Retro bezel frame

### Phase 3: Tool Frames
- ToolFrame wrapper component
- Corner bracket SVGs
- Tool-specific layouts
- Status indicators

### Phase 4: Codex & Profile
- Ghost card layout
- Floating animation
- Profile badge design
- Stats display

### Phase 5: HUD Redesign
- Bottom control panel
- Tool buttons with glow
- Sanity bar with glitch
- Film counter

### Phase 6: Transitions & Polish
- Glitch transition system
- Static burst effect
- Screen shake
- Final polish pass

---

## Dependencies

### External Libraries
- None required (pure CSS/Canvas/SVG)

### Browser APIs
- Canvas 2D Context (for noise generation)
- requestAnimationFrame (for smooth animations)
- CSS Custom Properties (for theming)

### Placeholder Assets
- 3 ghost images (Unsplash/Pexels - free use)
- Noise texture (generated with Canvas)
- All other visuals: code-generated

---

## Future Enhancements

### Sound Integration (Spec 008)
- Static burst sound on transitions
- Tool activation sounds
- Ambient drone background
- Ghost whispers

### Custom Assets (Post-MVP)
- AI-generated ghost animations
- Custom tool icons
- Professional textures
- Particle sprites

### Advanced Effects (Optional)
- Depth of field blur
- Motion blur on fast movements
- Lens distortion
- Film grain animation

---

**Design Status:** Ready for implementation
**Estimated Effort:** 2-3 weeks
**Risk Level:** Low (all code-based, no external dependencies)
