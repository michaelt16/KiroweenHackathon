# Design Document - Spec 008: Full UI Transformation

## Overview

This spec transforms Ghost Hunt's entire user interface to match the established analog horror aesthetic. Building upon Spec 007 (Investigation Tools Design System) and Spec 006 (Analog Horror Component System), this creates a cohesive experience where every screen feels authentic to the 1980s-90s paranormal investigation theme.

**Core Philosophy:** The entire game should feel like you're using real ghost-hunting equipment and reviewing physical case files, not interacting with a modern mobile app.

**Visual Identity:** Heavy industrial equipment, aged paper documentation, detective corkboards, and authentic retro tech - all with extensive wear, damage, and texture.

---

## Architecture

### Component Structure

```
src/
├── screens/
│   ├── MapRootScreen.tsx          # Corkboard map (✅ COMPLETE)
│   ├── CodexScreen.tsx            # Physical journal/case file
│   ├── ProfilePanel.tsx           # ID badge/case file
│   ├── InventoryScreen.tsx        # Equipment log
│   └── InvestigationScreen.tsx    # Investigation tools (✅ COMPLETE)
├── components/
│   ├── analog/                     # Paper UI components (Spec 006)
│   │   ├── PaperBase.tsx
│   │   ├── StickyNote.tsx
│   │   ├── PolaroidPhoto.tsx
│   │   ├── Tape.tsx
│   │   └── PushPin.tsx
│   ├── tools/                      # Investigation tools (Spec 007)
│   │   ├── RadarToolMock.tsx       # ✅ COMPLETE
│   │   ├── EMFMeterMock.tsx        # ✅ COMPLETE
│   │   ├── ThermalScannerMock.tsx  # ✅ COMPLETE
│   │   ├── CameraViewfinderMock.tsx # ✅ COMPLETE
│   │   └── SpiritBoxMock.tsx       # ✅ COMPLETE
│   └── Effects/
│       ├── CRTOverlay.tsx
│       ├── VHSEffect.tsx
│       └── GlitchTransition.tsx
├── assets/
│   └── texture/
│       ├── corkboardtexture.png    # ✅ EXISTS
│       ├── wrinkledpaper.png       # ✅ EXISTS
│       ├── dust.png                 # ✅ EXISTS
│       ├── tape.png                 # ✅ EXISTS
│       ├── filmgrain.png            # ✅ EXISTS
│       ├── smoothplastictexture.png # ✅ EXISTS
│       └── [other textures]         # ✅ EXISTS
└── styles/
    └── analog-horror.css            # Global analog horror styles
```

---

## Screen-by-Screen Design

### 1. Map Screen (MapRootScreen.tsx)

**Status:** ✅ COMPLETE - Already transformed to corkboard aesthetic

**Design Elements:**
- Full-screen corkboard background
- Paper map pinned with 4 corner push pins
- Slight rotation (1.5deg) for natural placement
- Desaturated, photocopy-style Leaflet map
- Red push pins with paper tag labels
- Hand-drawn red circles for selected locations
- Polaroid photos connected by red thread
- Sticky notes overlapping edges
- Masking tape strips on map edges

**Reference:** See `MapRootScreen.tsx` for complete implementation

---

### 2. Codex Screen (CodexScreen.tsx)

**Status:** 🔄 TO TRANSFORM

**Current State:** Modern card-based layout

**Target Design:**
- Aged paper journal or case file book
- Handwritten titles (Caveat font)
- Typewriter data (Courier New font)
- Coffee stains, tape, scratches
- Texture overlays (wrinkled paper, dust)
- Polaroid photos with tape
- Page turn transitions
- Static burst between entries

**Design Mockup:**
```
┌─────────────────────────────────────┐
│  [Aged Paper Background]            │
│  ┌───────────────────────────────┐  │
│  │  [Coffee Stain]               │  │
│  │                               │  │
│  │  [Handwritten Title]          │  │
│  │  "POLTERGEIST"                │  │
│  │                               │  │
│  │  [Polaroid Photo]             │  │
│  │  [with tape]                  │  │
│  │                               │  │
│  │  [Typewriter Data]            │  │
│  │  TYPE: POLTERGEIST            │  │
│  │  THREAT: HIGH                 │  │
│  │                               │  │
│  │  [Handwritten Notes]          │  │
│  │  "Very aggressive..."         │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│  [Tape, Scratches, Stains]          │
└─────────────────────────────────────┘
```

**Implementation Notes:**
- Use `PaperBase` component from Spec 006
- Apply damage variants (coffee stains, tape, scratches)
- Use `PolaroidPhoto` component for ghost images
- Apply texture overlays (wrinkled paper, dust)
- Use Caveat font for handwritten text
- Use Courier New for technical data
- Add static burst transitions between entries

---

### 3. Profile Screen (ProfilePanel.tsx)

**Status:** 🔄 TO TRANSFORM

**Current State:** Modern card-based layout

**Target Design:**
- Physical ID badge or case file card
- Aged paper/card stock background
- Typewriter data for stats
- Handwritten notes
- Fingerprints, stains, wear
- Texture overlays
- Achievement stamps with tape

**Design Mockup:**
```
┌─────────────────────────────────────┐
│  [Aged Card Stock Background]      │
│  ┌───────────────────────────────┐  │
│  │  [Fingerprint]                │  │
│  │                               │  │
│  │  INVESTIGATOR ID              │  │
│  │  [Typewriter Font]            │  │
│  │                               │  │
│  │  NAME: [Player Name]          │  │
│  │  CASES SOLVED: 12             │  │
│  │  THREAT LEVEL: MEDIUM         │  │
│  │                               │  │
│  │  [Handwritten Notes]           │  │
│  │  "Keep investigating..."      │  │
│  │                               │  │
│  │  [Achievement Stamps]          │  │
│  │  [with tape]                  │  │
│  └───────────────────────────────┘  │
│  [Wear, Stains, Scratches]           │
└─────────────────────────────────────┘
```

**Implementation Notes:**
- Use `PaperBase` component with card stock variant
- Apply damage elements (fingerprints, stains)
- Use typewriter font for data
- Use handwritten font for notes
- Add achievement stamps using `Tape` component
- Apply texture overlays

---

### 4. Inventory Screen (InventoryScreen.tsx)

**Status:** 🔄 TO TRANSFORM

**Current State:** Modern list-based layout

**Target Design:**
- Physical equipment log or supply checklist
- Aged paper background
- Typewriter font for item names
- Handwritten font for notes
- Checkmarks, scribbles, stains
- Texture overlays
- Visual feedback on collection (static burst)

**Design Mockup:**
```
┌─────────────────────────────────────┐
│  [Aged Paper Background]            │
│  ┌───────────────────────────────┐  │
│  │  EQUIPMENT LOG                │  │
│  │  [Typewriter Font]            │  │
│  │                               │  │
│  │  [✓] Film Roll x5             │  │
│  │  [✓] Scanner Boost x2         │  │
│  │  [ ] Charm                    │  │
│  │                               │  │
│  │  [Handwritten Notes]           │  │
│  │  "Need more film..."          │  │
│  │                               │  │
│  │  [Scribbles, Stains]           │  │
│  └───────────────────────────────┘  │
│  [Tape, Scratches]                  │
└─────────────────────────────────────┘
```

**Implementation Notes:**
- Use `PaperBase` component
- Apply damage elements (checkmarks, scribbles)
- Use typewriter font for items
- Use handwritten font for notes
- Add static burst on item collection
- Apply texture overlays

---

### 5. Investigation Tools

**Status:** ✅ COMPLETE - All 5 tools finalized

**Reference:** See Spec 007 (Investigation Tools Design System)

**Tools:**
1. ✅ RadarToolMock.tsx - Circular CRT radar (heavy steel)
2. ✅ EMFMeterMock.tsx - LED bar graph (heavy steel)
3. ✅ ThermalScannerMock.tsx - FLIR E5 thermal imager (rubberized plastic)
4. ✅ CameraViewfinderMock.tsx - 1980s Polaroid camera (rubberized plastic)
5. ✅ SpiritBoxMock.tsx - Oscilloscope scanner (heavy steel)

---

## Visual Style Guide

### Typography

**Handwritten Text:**
- Font: `'Caveat', cursive`
- Use for: Titles, notes, labels, warnings
- Size: 14px - 24px
- Color: `#1a0f0a` (dark brown/black)
- Effects: Text shadow for ink bleed, slight rotation

**Typewriter Text:**
- Font: `'Courier New', monospace`
- Use for: Data, stats, technical information
- Size: 11px - 14px
- Color: `#1a0f0a` or `#4a0000` (urgent)
- Effects: Letter spacing, uppercase for emphasis

### Colors

**Paper Colors (NEVER pure white):**
```typescript
'#c4b49a'  // Darkest aged
'#d8d4c8'  // Medium aged
'#e8e4dc'  // Light aged
'#f4f0e6'  // Lightest acceptable
```

**Ink Colors:**
```typescript
'#1a0f0a'  // Dark brown/black
'#4a0000'  // Dark red (urgent)
'#8b0000'  // Blood red (warnings)
'#cc0000'  // Bright red (pins, circles)
```

**Corkboard Colors:**
```typescript
'#8B6F47'  // Light cork
'#6B5230'  // Medium cork
'#5A4228'  // Dark cork
```

### Textures

**Required Texture Assets:**
- `corkboardtexture.png` - Cork board background
- `wrinkledpaper.png` - Paper wrinkles
- `dust.png` - Dust/grain overlay
- `tape.png` - Masking tape
- `filmgrain.png` - Film grain for photos
- `smoothplastictexture.png` - Plastic device texture
- `scratchedplasticdark.png` - Scratched plastic
- `rippedtexture.png` - Torn edges
- `coffeestain.png` - Coffee stains
- `burnhole.png` - Burn damage

**Texture Application:**
- Base layer: Paper/cork/plastic texture
- Overlay 1: Wrinkled paper (multiply, 0.3-0.4 opacity)
- Overlay 2: Dust (multiply, 0.15-0.2 opacity)
- Overlay 3: Specific damage (stains, burns, tears)

### Damage Elements

**Common Damage Patterns:**
- Coffee stains (radial gradients, blur)
- Tape patches (tape texture, rotation)
- Scratches (linear gradients, low opacity)
- Fingerprints (radial gradients, ellipses)
- Burn holes (radial gradients, dark centers)
- Torn edges (clip-path or ripped texture)

**Damage Distribution:**
- Never perfectly aligned
- Random but controlled placement
- Varies by screen type
- Use seed-based randomization for consistency

---

## Transitions and Effects

### Screen Transitions

**Between Document Screens:**
- Static burst (0.3-0.5s)
- Page turn fade
- Glitch effect

**To Investigation Tools:**
- VHS tracking lines
- Static burst
- Screen shake

**Between Codex Entries:**
- Static burst
- Fade transition
- Glitch effect

### Visual Feedback

**Item Collection:**
- Static burst animation
- Glitch effect
- Subtle screen shake

**Location Selection:**
- Red circle animation
- Polaroid appearance
- Red thread connection

---

## Responsive Design

### Mobile Considerations

**Text Legibility:**
- Minimum font size: 11px
- High contrast text shadows
- Reduce texture opacity if needed

**Touch Targets:**
- Minimum size: 44x44px
- Adequate spacing between elements
- Clear visual feedback

**Performance:**
- Reduce texture resolution on mobile
- Limit animation complexity
- Lazy-load non-critical textures

---

## Implementation Phases

### Phase 1: Foundation
- Review existing components (Spec 006, Spec 007)
- Audit texture assets
- Set up global styles
- Create base paper components

### Phase 2: Map Screen
- ✅ COMPLETE - Already transformed

### Phase 3: Codex Screen
- Transform to journal/case file aesthetic
- Add damage elements
- Apply texture overlays
- Implement transitions

### Phase 4: Profile Screen
- Transform to ID badge/case file
- Add damage elements
- Apply texture overlays
- Add achievement stamps

### Phase 5: Inventory Screen
- Transform to equipment log
- Add damage elements
- Apply texture overlays
- Add collection feedback

### Phase 6: Polish
- Review consistency across all screens
- Optimize performance
- Test on mobile devices
- Final texture adjustments

---

## Success Metrics

1. ✅ All screens use consistent analog horror aesthetic
2. ✅ All screens use aged paper textures
3. ✅ All screens use appropriate typography
4. ✅ All screens include damage elements
5. ✅ All transitions feel analog and cohesive
6. ✅ All functionality remains intact
7. ✅ Performance acceptable on target devices
8. ✅ Mobile experience remains functional



