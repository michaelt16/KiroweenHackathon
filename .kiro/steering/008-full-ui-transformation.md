---
inclusion: always
---

# 🎨 Full UI Transformation - Design System

## ✅ STATUS: IN PROGRESS

**Current State:**
- ✅ Map Screen - COMPLETE (corkboard aesthetic)
- ✅ Investigation Tools - COMPLETE (all 5 tools finalized)
- 🔄 Codex Screen - TO TRANSFORM
- 🔄 Profile Screen - TO TRANSFORM
- 🔄 Inventory Screen - TO TRANSFORM

**This steering file guides the transformation of all remaining UI screens to match the established analog horror aesthetic.**

---

## 🎯 Philosophy

**The entire game should feel like authentic 1980s-90s paranormal investigation equipment and documentation.**

Every screen should feel like you're using real ghost-hunting equipment or reviewing physical case files, not interacting with a modern mobile app. The aesthetic should be consistent across all screens, creating an immersive, cohesive experience.

**End Goal**: When players navigate through the game, they should feel like they're in a real investigation room, using real equipment, and reviewing real case files - all with the wear, damage, and authenticity of decades-old equipment and documentation.

---

## 🌍 SECTION A — CORE PRINCIPLES (Universal Truth Layer)

**These rules apply to ALL UI screens, no exceptions.**

### ❌ NEVER Use:
- Clean, pristine white backgrounds (`#fff`)
- Modern mobile app UI patterns
- Bright, saturated, happy colors
- Perfect alignment or symmetry
- Flat design without texture or depth
- Cartoon-y or playful aesthetics
- Modern flat icons or vector graphics
- Glossy, new-looking surfaces

### ✅ ALWAYS Use:
- **Aged paper colors** - Never pure white (`#c4b49a`, `#d8d4c8`, `#e8e4dc`, `#f4f0e6`)
- **Heavy texture layering** - 3-5 texture layers per screen (base, wrinkles, dust, damage)
- **Extensive damage elements** - Coffee stains, tape, scratches, fingerprints, burns, tears
- **Organic rotation** - All elements slightly rotated (0.3deg - 2deg) for natural placement
- **Handwritten typography** - Caveat font for titles, notes, labels
- **Typewriter typography** - Courier New for data, stats, technical information
- **Deep shadows** - Physical depth through inset shadows and bevels
- **Authentic materials** - Paper, cork, steel, plastic textures
- **Imperfect alignment** - Intentional slight rotations and offsets

### 🎨 Core Color Palette:

```typescript
// Paper (NEVER pure white)
'#c4b49a'  // Darkest aged
'#d8d4c8'  // Medium aged
'#e8e4dc'  // Light aged
'#f4f0e6'  // Lightest acceptable

// Ink
'#1a0f0a'  // Dark brown/black
'#4a0000'  // Dark red (urgent)
'#8b0000'  // Blood red (warnings)
'#cc0000'  // Bright red (pins, circles)

// Corkboard
'#8B6F47'  // Light cork
'#6B5230'  // Medium cork
'#5A4228'  // Dark cork

// Damage
'rgba(139, 69, 19, 0.3)'   // Coffee stains
'rgba(0, 0, 0, 0.4)'       // Water damage
'rgba(139, 0, 0, 0.2)'     // Blood smears
'rgba(40, 20, 0, 0.6)'     // Burn marks
```

### 📐 Universal Spacing:

```typescript
lineHeight: '1.8-2'        // Generous for handwriting
letterSpacing: '0.5px-2px' // Varies by urgency
marginBottom: '20px-25px'  // Between sections
```

---

## 🧩 SECTION B — SCREEN-SPECIFIC RULES

### 📍 Map Screen (MapRootScreen.tsx)

**Status:** ✅ COMPLETE

**Reference Implementation:** See `MapRootScreen.tsx`

**Key Elements:**
- Full-screen corkboard background
- Paper map pinned with 4 corner push pins
- Slight rotation (1.5deg)
- Desaturated, photocopy-style Leaflet map
- Red push pins with paper tag labels
- Hand-drawn red circles for selected locations
- Polaroid photos connected by red thread
- Sticky notes overlapping edges
- Masking tape strips

**Use as reference for:**
- Corkboard texture application
- Paper map frame styling
- Push pin and paper tag implementation
- Red thread SVG connections
- Sticky note placement

---

### 📖 Codex Screen (CodexScreen.tsx)

**Status:** 🔄 TO TRANSFORM

**Target Aesthetic:** Physical journal or case file book

**Required Elements:**
- Aged paper background (`PaperBase` component)
- Handwritten titles (Caveat font, 18-24px)
- Typewriter data (Courier New font, 11-14px)
- Coffee stains, tape, scratches
- Texture overlays (wrinkled paper, dust)
- Polaroid photos with tape (`PolaroidPhoto` component)
- Static burst transitions between entries
- Page turn effects

**Implementation Checklist:**
- [ ] Replace container with `PaperBase` component
- [ ] Apply texture overlays (wrinkled paper, dust)
- [ ] Add damage elements (coffee stains, tape, scratches)
- [ ] Transform ghost entry cards to journal pages
- [ ] Use Caveat font for titles
- [ ] Use Courier New font for data
- [ ] Replace images with `PolaroidPhoto` components
- [ ] Add static burst transitions
- [ ] Add glitch effects on updates

**Reference:** See Spec 006 (Analog Horror Component System) for component usage

---

### 🆔 Profile Screen (ProfilePanel.tsx)

**Status:** 🔄 TO TRANSFORM

**Target Aesthetic:** Physical ID badge or case file card

**Required Elements:**
- Aged paper/card stock background (`PaperBase` component, card variant)
- Typewriter data for stats (Courier New font)
- Handwritten notes (Caveat font)
- Fingerprints, stains, wear
- Texture overlays
- Achievement stamps with tape

**Implementation Checklist:**
- [ ] Replace container with `PaperBase` component (card variant)
- [ ] Apply texture overlays
- [ ] Add damage elements (fingerprints, stains, wear)
- [ ] Use Courier New font for data
- [ ] Use Caveat font for notes
- [ ] Create achievement stamp component
- [ ] Add tape to stamps
- [ ] Apply slight rotation to stamps

**Reference:** See Spec 006 (Analog Horror Component System) for component usage

---

### 📦 Inventory Screen (InventoryScreen.tsx)

**Status:** 🔄 TO TRANSFORM

**Target Aesthetic:** Physical equipment log or supply checklist

**Required Elements:**
- Aged paper background (`PaperBase` component)
- Typewriter font for item names (Courier New)
- Handwritten font for notes (Caveat)
- Checkmarks, scribbles, stains
- Texture overlays
- Static burst on item collection

**Implementation Checklist:**
- [ ] Replace container with `PaperBase` component
- [ ] Apply texture overlays
- [ ] Add damage elements (checkmarks, scribbles, stains)
- [ ] Use Courier New font for items
- [ ] Use Caveat font for notes
- [ ] Add static burst animation on collection
- [ ] Add glitch effect feedback

**Reference:** See Spec 006 (Analog Horror Component System) for component usage

---

### 🔦 Investigation Tools

**Status:** ✅ COMPLETE

**Reference:** See Spec 007 (Investigation Tools Design System)

**All 5 tools are finalized:**
1. ✅ RadarToolMock.tsx - Circular CRT radar (heavy steel)
2. ✅ EMFMeterMock.tsx - LED bar graph (heavy steel)
3. ✅ ThermalScannerMock.tsx - FLIR E5 thermal imager (rubberized plastic)
4. ✅ CameraViewfinderMock.tsx - 1980s Polaroid camera (rubberized plastic)
5. ✅ SpiritBoxMock.tsx - Oscilloscope scanner (heavy steel)

**Use as reference for:**
- Full-screen device layouts
- Material-specific textures
- Screen/display inset depths
- Control placement
- Wear and damage patterns

---

## 🎨 SECTION C — TEXTURE SYSTEM

### Required Texture Assets

All textures should be in `/assets/texture/`:

- ✅ `corkboardtexture.png` - Cork board background
- ✅ `wrinkledpaper.png` - Paper wrinkles
- ✅ `dust.png` - Dust/grain overlay
- ✅ `tape.png` - Masking tape
- ✅ `filmgrain.png` - Film grain for photos
- ✅ `smoothplastictexture.png` - Plastic device texture
- ✅ `scratchedplasticdark.png` - Scratched plastic
- ✅ `rippedtexture.png` - Torn edges
- ✅ `coffeestain.png` - Coffee stains
- ✅ `burnhole.png` - Burn damage

### Texture Application Pattern

**Standard 3-Layer System:**

```typescript
// Layer 1: Base texture
backgroundImage: `url(${baseTexture})`,
backgroundSize: 'cover',
backgroundBlendMode: 'multiply',
opacity: 1.0,

// Layer 2: Wrinkled paper overlay
backgroundImage: `url(${wrinkledPaper})`,
backgroundSize: 'cover',
mixBlendMode: 'overlay',
opacity: 0.3-0.4,

// Layer 3: Dust/grain overlay
backgroundImage: `url(${dust})`,
backgroundSize: 'cover',
mixBlendMode: 'multiply',
opacity: 0.15-0.2,
```

**Damage Layer (Optional):**
- Coffee stains: Radial gradients with blur
- Tape: Tape texture with rotation
- Scratches: Linear gradients, low opacity
- Fingerprints: Radial gradients, ellipses
- Burns: Radial gradients, dark centers

---

## 📝 SECTION D — TYPOGRAPHY SYSTEM

### Handwritten Typography (Caveat)

**Use for:**
- Titles and headings
- Notes and annotations
- Labels and warnings
- Personal observations

**Style:**
```typescript
fontFamily: '"Caveat", cursive',
fontSize: '14px - 24px',
color: '#1a0f0a',
textShadow: '0 1px 2px rgba(0,0,0,0.3)', // Ink bleed effect
transform: 'rotate(0.3deg - 2deg)', // Slight rotation
```

### Typewriter Typography (Courier New)

**Use for:**
- Data and statistics
- Technical information
- System messages
- Item names

**Style:**
```typescript
fontFamily: '"Courier New", monospace',
fontSize: '11px - 14px',
color: '#1a0f0a' or '#4a0000' (urgent),
letterSpacing: '0.5px - 2px',
textTransform: 'uppercase', // For emphasis
```

---

## 🎬 SECTION E — TRANSITIONS AND EFFECTS

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

## ✅ IMPLEMENTATION CHECKLIST

### Codex Screen
- [ ] Replace container with `PaperBase`
- [ ] Apply texture overlays
- [ ] Add damage elements
- [ ] Transform entry cards
- [ ] Use appropriate typography
- [ ] Add Polaroid photos
- [ ] Implement transitions

### Profile Screen
- [ ] Replace container with `PaperBase` (card variant)
- [ ] Apply texture overlays
- [ ] Add damage elements
- [ ] Use appropriate typography
- [ ] Add achievement stamps
- [ ] Implement transitions

### Inventory Screen
- [ ] Replace container with `PaperBase`
- [ ] Apply texture overlays
- [ ] Add damage elements
- [ ] Transform item list
- [ ] Use appropriate typography
- [ ] Add collection feedback
- [ ] Implement transitions

### Global
- [ ] Review consistency across all screens
- [ ] Optimize performance
- [ ] Test on mobile devices
- [ ] Final polish

---

## 📚 REFERENCE DOCUMENTS

- **Spec 006:** Analog Horror Component System (base components)
- **Spec 007:** Investigation Tools Design System (tool designs)
- **MapRootScreen.tsx:** Reference implementation for corkboard aesthetic
- **Investigation Tools:** Reference implementations for device aesthetics

---

## 🎯 SUCCESS CRITERIA

1. ✅ All screens use consistent analog horror aesthetic
2. ✅ All screens use aged paper textures
3. ✅ All screens use appropriate typography
4. ✅ All screens include damage elements
5. ✅ All transitions feel analog and cohesive
6. ✅ All functionality remains intact
7. ✅ Performance acceptable on target devices
8. ✅ Mobile experience remains functional


