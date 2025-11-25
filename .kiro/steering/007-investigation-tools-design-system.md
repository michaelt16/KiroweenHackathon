# 🔦 Investigation Tools - Design System

## ✅ STATUS: ALL TOOLS COMPLETE

**All five investigation tools are FINAL and COMPLETE:**

1. ✅ **RadarToolMock.tsx** - Circular CRT radar display (heavy steel casing)
2. ✅ **EMFMeterMock.tsx** - LED bar graph meter (heavy steel casing)
3. ✅ **ThermalScannerMock.tsx** - FLIR E5-style handheld thermal imager (rubberized plastic)
4. ✅ **CameraViewfinderMock.tsx** - 1980s Polaroid ghost camera (rubberized plastic)
5. ✅ **SpiritBoxMock.tsx** - Oscilloscope frequency scanner (heavy steel casing)

**These mock files represent the FINAL, DEFINITIVE designs. Use them as the primary reference for all investigation tool implementations.**

---

## 🎯 Philosophy

**You are holding a real ghost-hunting device in your hands.**

Investigation tools are full-screen, immersive, realistic simulations of paranormal equipment. Unlike the paper-based analog horror components (which are for UI screens like Codex and Profile), these tools are **physical devices** that fill the entire viewport and make you feel like you're actually holding equipment in the field.

**End Goal**: When a player opens the EMF Meter, Camera, Thermal Scanner, Radar, or Spirit Box, they should feel like they're looking through/at an actual piece of worn, field-tested paranormal investigation equipment.

---

## ⚠️ REFERENCE IMPLEMENTATIONS - FINAL DESIGNS

**All five investigation tools are now complete and represent the FINAL, DEFINITIVE designs:**

1. **RadarToolMock.tsx** - Circular CRT radar display with heavy steel casing
2. **EMFMeterMock.tsx** - LED bar graph meter with industrial steel housing
3. **ThermalScannerMock.tsx** - FLIR E5-style handheld thermal imager with rubberized plastic body
4. **CameraViewfinderMock.tsx** - Chunky 1980s Polaroid ghost camera with instant film ejection
5. **SpiritBoxMock.tsx** - Oscilloscope-style frequency scanner with analog controls

**These are the FINAL implementations. Use them as the definitive reference for:**
- Exact visual style, texture layering, damage patterns, and depth system
- Full-screen, immersive layouts (all tools fill 100% viewport)
- Material-specific textures (steel for Radar/EMF, plastic/rubber for Thermal/Camera)
- Screen/display inset depths and bezel styles
- Control placement and physical button design
- Wear and damage element distribution

**Key Visual Characteristics (Universal across all tools)**:
- **Full-screen layouts**: All tools fill 100% viewport (no centered containers)
- **Heavy texture layering**: 3-5 texture layers per device (base, scratches, dust, wrinkles)
- **Extensive damage**: 7-15+ damage elements per device (screws, tape, scratches, chips, labels)
- **Deep screen insets**: 25-40px depth for displays/viewfinders
- **Thick bezels**: 28-35px offset for metal tools, 8-12px for plastic tools
- **Material-specific casings**: 
  - **Metal tools (Radar, EMF, Spirit Box)**: Heavy steel gradient with metallic textures
  - **Plastic tools (Thermal, Camera)**: Black rubberized plastic with smooth plastic texture
- **Etched-style labels**: 40-50% opacity, light top highlight + dark bottom shadow
- **Industrial hardware**: Screws, vent grilles, weld lines, serial numbers

---

## 🌍 SECTION A — CORE PRINCIPLES (Universal Truth Layer)

### ❌ NEVER Use:
- Clean, pristine devices
- Bright, saturated colors
- Cartoon-y or playful aesthetics
- Modern smartphone UI patterns
- Flat design without depth
- Perfect alignment or symmetry
- Glossy, new-looking surfaces

### ✅ ALWAYS Use:
- **Full-screen, immersive layouts** - All tools MUST fill 100% viewport (no centered containers with max-width constraints)
- **Heavy texture layering** - 3-5 texture layers per device (base material, scratches, dust, wrinkles)
- **Realistic wear and damage** - 7-15+ damage elements per device (screws, tape, scratches, chips, labels)
- **Deep shadows and beveled edges** - Physical depth through inset shadows (8-12px for plastic, deeper for metal)
- **Authentic device aesthetics** - 1980s-90s equipment feel, not modern smartphone UI
- **Functional displays** - CRT/LED/LCD characteristics with appropriate glow effects
- **Material-specific textures** - Metal tools use steel gradients, plastic tools use smooth plastic texture image
- **Tape patches, scratches, rust spots** - Extensive wear patterns
- **Handwritten labels and serial numbers** - Etched-style text with 40-50% opacity
- **Imperfect alignment and rotation** - Intentional slight rotations and offsets for "lived-in" feel

### 🎨 Core Color Palette (HEAVY INDUSTRIAL - Match Radar/EMF):

```typescript
// Device Casings - HEAVY STEEL GRADIENT (EXACT - Match Radar/EMF)
'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)'

// Individual casing colors (for reference)
'#3a3a3a'  // Light gray metal (top of gradient)
'#2a2a2a'  // Medium gray metal
'#1f1f1f'  // Dark metal
'#1a1a1a'  // Very dark metal
'#0f0f0f'  // Darkest metal (bottom of gradient)

// Bezel Colors (for thick metallic bezels)
'#6a6a6a'  // Light bezel highlight
'#5a5a5a'  // Medium bezel
'#4a4a4a'  // Dark bezel
'#3a3a3a'  // Darker bezel
'#2a2a2a'  // Darkest bezel

// Displays
'#0a1a0a'  // Green CRT background
'#0a0a0a'  // Black LCD/screen/LED background
'#1a0a2a'  // Purple thermal background

// Display Colors
'#00ff00'  // Green CRT glow
'#00ff55'  // Green LED (EMF levels 1-2)
'#ffff00'  // Yellow LED (EMF level 3)
'#ff8800'  // Orange LED (EMF level 4)
'#ff0000'  // Red warning/REC/LED (EMF level 5)
'#ff6600'  // Orange frequency
'#6699ff'  // Blue cold spot

// Damage/Wear Colors
'rgba(255,255,255,0.35)'   // Light scratches (exposed metal)
'rgba(0,0,0,0.6)'           // Dark scratches (deep gouges)
'rgba(0,0,0,0.9)'           // Deep gouges
'rgba(50,30,20,0.8)'        // Burnt edges (heat damage)
'rgba(100,80,60,0.4)'       // Rain streaks
'rgba(0,0,0,0.4)'           // Fingerprint smudges
'rgba(255,255,255,0.1)'     // Top bevel highlight
'rgba(0,0,0,0.8)'           // Bottom bevel shadow

// Label Colors (ETCHED STYLE - 40-50% opacity)
'rgba(200,200,200,0.5)'     // Handwritten labels (Caveat)
'rgba(200,200,200,0.45)'    // Printed labels (Courier)
'rgba(150,150,150,0.45)'    // Serial numbers
'rgba(180,180,150,0.45)'    // Calibration notes
```

---

## 🧩 SECTION B — TOOL CATEGORIES

### Category 1: CRT/Screen-Based Tools
**Examples**: Radar, Thermal Scanner

**Characteristics**:
- Large circular or rectangular screen
- Thick metal bezel around display
- Deep inset (screen sits inside casing)
- CRT glow effects
- Scanlines and grain
- Heavy metal construction

---

### Category 2: LED/Meter Tools
**Examples**: EMF Meter

**Characteristics**:
- LED bar graphs or segments
- Plastic casing with scratches
- Recessed display area
- Physical-looking screws
- Tape patches on battery covers
- Handwritten calibration notes

---

### Category 3: Viewfinder Tools
**Examples**: Camera

**Characteristics**:
- Viewfinder frame aesthetic
- Film grain and VHS effects
- REC indicator and timestamp
- Battery indicator
- Crosshairs and focus brackets
- Heavy vignetting
- Dust on lens

---

### Category 4: Radio/Audio Tools
**Examples**: Spirit Box

**Characteristics**:
- Oscilloscope waveform display
- Frequency readout
- Physical knobs (tune, volume)
- Bent antenna
- Dark plastic casing
- EVP text overlays

---

## 📐 SECTION C — UNIVERSAL CONSTRUCTION RULES

### Rule 1: Full-Screen Layout

**EVERY tool MUST**:
```typescript
{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
}
```

**Purpose**: Complete immersion - no UI chrome, just the device

---

### Rule 2: Layered Depth System

**Layer Order** (back to front):
1. **Background** (optional camera view, z-index: 0)
2. **Device Casing** (main body, z-index: 1)
3. **Texture Overlays** (metal, plastic, dust, z-index: 2-5)
4. **Damage Elements** (scratches, rust, z-index: 6-10)
5. **Display/Screen** (functional area, z-index: 11-15)
6. **Screen Effects** (grain, scanlines, z-index: 16-20)
7. **UI Elements** (text, indicators, z-index: 21-25)

**Example**:
```typescript
// Background
<div style={{ zIndex: 0 }}>Camera view</div>

// Casing
<div style={{ zIndex: 1 }}>
  {/* Texture overlays */}
  <div style={{ zIndex: 2 }}>Metal texture</div>
  <div style={{ zIndex: 3 }}>Dust</div>
  
  {/* Damage */}
  <div style={{ zIndex: 6 }}>Scratches</div>
  <div style={{ zIndex: 7 }}>Rust spots</div>
  
  {/* Display */}
  <div style={{ zIndex: 11 }}>Screen content</div>
  <div style={{ zIndex: 16 }}>Film grain</div>
  
  {/* UI */}
  <div style={{ zIndex: 21 }}>Text overlays</div>
</div>
```

---

### Rule 3: Physical Depth (Bevels & Shadows)

**ALL casings MUST have**:
- Inset shadows (device body recessed)
- Beveled edges (light on top, dark on bottom) - **8-12px deep**
- Deep screen inset (screen sits inside device)

**Device Casing - Material Types:**

**METAL TOOLS (Radar, EMF, Spirit Box)** - Heavy Industrial Steel:
```typescript
// Base casing background - HEAVY INDUSTRIAL STEEL
background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',

// Heavy inset shadows for recessed device body
boxShadow: 
  'inset 0 6px 12px rgba(255,255,255,0.06), ' +   // Top highlight (subtle)
  'inset 0 -12px 24px rgba(0,0,0,0.98), ' +       // Bottom shadow (DEEP)
  'inset 4px 0 8px rgba(0,0,0,0.9), ' +          // Left shadow
  'inset -4px 0 8px rgba(0,0,0,0.9)',            // Right shadow
```

**PLASTIC/RUBBER TOOLS (Thermal Scanner, Camera)** - Black Rubberized Plastic:
```typescript
// Base casing background - Black rubberized plastic with texture
background: `
  url(${smoothPlastic}),
  linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
`,
backgroundSize: '300px 300px, cover',
backgroundRepeat: 'repeat, no-repeat',
backgroundBlendMode: 'overlay, normal',

// Inset shadows for plastic casing (slightly softer than metal)
boxShadow: 
  'inset 0 4px 8px rgba(255,255,255,0.04), ' +   // Top highlight (subtle)
  'inset 0 -10px 18px rgba(0,0,0,0.9), ' +       // Bottom shadow
  'inset 5px 0 10px rgba(0,0,0,0.9), ' +         // Left shadow
  'inset -5px 0 10px rgba(0,0,0,0.9), ' +        // Right shadow
  '0 20px 35px rgba(0,0,0,0.55), ' +             // Drop shadow
  '0 8px 15px rgba(0,0,0,0.35)',                 // Additional depth
```

**Beveled Edges** (8-12px deep for machined metal finish):
```typescript
// Top bevel
{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '8px',  // or '12px' for deeper bevel
  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
}

// Bottom bevel
{
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '8px',
  background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
}

// Left/Right bevels (similar pattern)
```

**Screen Inset** (DEEP CAVITY - 25-40px depth):
```typescript
// Screen container with deep recess
boxShadow: 
  'inset 0 30px 70px rgba(0,0,0,0.99), ' +       // DEEP shadow (30px+)
  'inset 0 18px 45px rgba(0,0,0,0.98), ' +       // Multiple shadow layers
  'inset 0 10px 25px rgba(0,0,0,0.97), ' +      // For depth
  'inset 0 5px 15px rgba(0,0,0,0.95), ' +        // Additional depth
  'inset 0 0 150px rgba(0,255,0,0.22)',         // Ambient glow (for CRT)
```

---

### Rule 4: Texture Layering (HEAVY INDUSTRIAL - Match Radar/EMF)

**EVERY device MUST have 3-5 texture layers** with EXACT specifications:

1. **Metal Texture Overlay** (PRIMARY - Always present)
   ```typescript
   {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundImage: `url(${metalTexture})`,
     backgroundSize: 'cover',
     mixBlendMode: 'overlay',
     opacity: 0.6,  // EXACT: 0.6 for metal tools
     pointerEvents: 'none',
     zIndex: 2,
   }
   ```

2. **Rust/Wear Overlay** (SECONDARY - Heavy industrial wear)
   ```typescript
   {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundImage: `url(${rust})`,
     backgroundSize: 'cover',
     mixBlendMode: 'multiply',
     opacity: 0.4,  // EXACT: 0.4 for rust layer
     pointerEvents: 'none',
     zIndex: 3,
   }
   ```

3. **Dust/Grime Layer** (TERTIARY - Environmental buildup)
   ```typescript
   {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundImage: `url(${dust})`,
     backgroundSize: 'cover',
     mixBlendMode: 'multiply',
     opacity: 0.3,  // EXACT: 0.3 for dust layer
     pointerEvents: 'none',
     zIndex: 4,
   }
   ```

4. **Additional Plastic/Dark Texture** (For plastic tools like EMF)
   ```typescript
   {
     backgroundImage: `url(${plasticDark})`,
     backgroundSize: 'cover',
     mixBlendMode: 'multiply',
     opacity: 0.25,  // Additional layer for plastic tools
     zIndex: 5,
   }
   ```

**Layer Order** (z-index stacking):
- z-index 2: Metal texture
- z-index 3: Rust overlay
- z-index 4: Dust layer
- z-index 5: Additional plastic/dark texture (if applicable)

**CRITICAL**: These opacity values create the exact heavy industrial look seen in Radar and EMF. Do not deviate.

---

### Rule 5: Damage & Wear (HEAVY INDUSTRIAL - Extensive Field Damage)

**EVERY device MUST have 10-15+ damage elements** to achieve the heavy industrial look:

#### Deep Scratches (6-8 per device - Multiple layers)
```typescript
// Light scratches (exposed metal)
{[
  { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.5 },
  { bottom: '20%', right: '8%', width: '130px', angle: 30, opacity: 0.55 },
  { top: '60%', left: '3%', width: '120px', angle: 45, opacity: 0.5 },
  { top: '35%', right: '5%', width: '110px', angle: -35, opacity: 0.6 },
  { bottom: '35%', left: '6%', width: '125px', angle: 40, opacity: 0.55 },
  // ... 2-3 more
].map((scratch, i) => (
  <div
    key={`light-scratch-${i}`}
    style={{
      position: 'absolute',
      ...(scratch.top ? { top: scratch.top } : {}),
      ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
      ...(scratch.left ? { left: scratch.left } : {}),
      ...(scratch.right ? { right: scratch.right } : {}),
      width: scratch.width,
      height: '2px',
      background: 'rgba(255,255,255,0.35)',  // Light scratches (exposed metal)
      transform: `rotate(${scratch.angle}deg)`,
      opacity: scratch.opacity,
      boxShadow: '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)',
      pointerEvents: 'none',
      zIndex: 6,
    }}
  />
))}

// Dark scratches (deep gouges)
{[
  { top: '18px', right: '22px', width: '55px', angle: -32, opacity: 0.5 },
  { bottom: '32px', left: '32px', width: '40px', angle: 22, opacity: 0.4 },
  // ... 3-5 more
].map((scratch, i) => (
  <div
    key={`dark-scratch-${i}`}
    style={{
      position: 'absolute',
      ...scratch,
      width: scratch.width,
      height: '2px',
      background: 'rgba(0,0,0,0.6)',  // Dark scratches (deep gouges)
      transform: `rotate(${scratch.angle}deg)`,
      opacity: scratch.opacity,
      boxShadow: '0 0 2px rgba(0,0,0,0.8)',
      pointerEvents: 'none',
      zIndex: 8,
    }}
  />
))}
```

#### Deep Gouges (Heavier than scratches - 3-5 per device)
```typescript
{[
  { top: '15%', left: '8%', width: '120px', angle: -35, depth: '2px', opacity: 0.7 },
  { bottom: '20%', right: '10%', width: '100px', angle: 40, depth: '2px', opacity: 0.65 },
  // ... 1-3 more
].map((gouge, i) => (
  <div
    key={`gouge-${i}`}
    style={{
      position: 'absolute',
      ...(gouge.top ? { top: gouge.top } : {}),
      ...(gouge.bottom ? { bottom: gouge.bottom } : {}),
      ...(gouge.left ? { left: gouge.left } : {}),
      ...(gouge.right ? { right: gouge.right } : {}),
      width: gouge.width,
      height: gouge.depth,
      background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(50,30,20,0.8) 50%, rgba(0,0,0,0.9) 100%)',
      transform: `rotate(${gouge.angle}deg)`,
      opacity: gouge.opacity,
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7)',
      pointerEvents: 'none',
      zIndex: 8,
    }}
  />
))}
```

#### Rust Spots (5-7 scattered across device)
```typescript
{[
  { top: '18%', left: '15%', size: '14px', opacity: 0.55 },
  { top: '45%', right: '12%', size: '16px', opacity: 0.6 },
  { bottom: '22%', left: '18%', size: '12px', opacity: 0.5 },
  { bottom: '30%', right: '15%', size: '15px', opacity: 0.58 },
  { top: '70%', left: '20%', size: '13px', opacity: 0.52 },
  // ... 2-3 more
].map((rustSpot, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(rustSpot.top ? { top: rustSpot.top } : {}),
      ...(rustSpot.bottom ? { bottom: rustSpot.bottom } : {}),
      ...(rustSpot.left ? { left: rustSpot.left } : {}),
      ...(rustSpot.right ? { right: rustSpot.right } : {}),
      width: rustSpot.size,
      height: rustSpot.size,
      backgroundImage: `url(${rust})`,
      backgroundSize: 'cover',
      mixBlendMode: 'multiply',
      opacity: rustSpot.opacity,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 7,
    }}
  />
))}
```

#### Chipped Paint Areas (4-6 per device - Corners + edges)
```typescript
{[
  { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
  { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
  { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
  { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
  // Additional chips around display cavities
  { top: '16%', left: '12%', width: '20px', height: '20px', clipPath: 'polygon(0% 0%, 60% 0%, 0% 60%)', opacity: 0.7 },
].map((chip, i) => (
  <div
    key={`chip-${i}`}
    style={{
      position: 'absolute',
      ...(chip.top ? { top: chip.top } : {}),
      ...(chip.bottom ? { bottom: chip.bottom } : {}),
      ...(chip.left ? { left: chip.left } : {}),
      ...(chip.right ? { right: chip.right } : {}),
      width: chip.width,
      height: chip.height,
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
      clipPath: chip.clipPath,
      opacity: chip.opacity,
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
      pointerEvents: 'none',
      zIndex: 8,
    }}
  />
))}
```

#### Weld Lines/Seams (3-5 per device - Industrial construction)
```typescript
{[
  { top: '12%', left: '10%', right: '10%', height: '1px', opacity: 0.5 },
  { top: '25%', left: '8%', right: '8%', height: '1px', opacity: 0.4 },
  { bottom: '15%', left: '12%', right: '12%', height: '1px', opacity: 0.45 },
  // Vertical seams
  { top: '10%', left: '6%', width: '2px', bottom: '25%', opacity: 0.5 },
  { top: '10%', right: '6%', width: '2px', bottom: '25%', opacity: 0.5 },
].map((weld, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(weld.top ? { top: weld.top } : {}),
      ...(weld.bottom ? { bottom: weld.bottom } : {}),
      left: weld.left,
      right: weld.right,
      ...(weld.width ? { width: weld.width } : {}),
      ...(weld.height ? { height: weld.height } : {}),
      background: weld.width 
        ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)'
        : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
      opacity: weld.opacity,
      pointerEvents: 'none',
    }}
  />
))}
```

#### Tape Patches (3-5 per device - Crooked, clustered)
```typescript
{[
  { top: '5%', left: '-15px', width: '60px', height: '3px', rotation: -15, opacity: 0.8 },
  { top: '50%', right: '-20px', width: '50px', height: '4px', rotation: 20, opacity: 0.75 },
  { bottom: '8%', left: '-12px', width: '45px', height: '3px', rotation: 10, opacity: 0.7 },
  // Tape patches on casing
  { bottom: '12px', right: '10px', width: '85px', height: '32px', rotation: -14, opacity: 0.9 },
  { top: '12px', right: '5px', width: '52px', height: '20px', rotation: 16, opacity: 0.8 },
].map((tape, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(tape.top ? { top: tape.top } : {}),
      ...(tape.bottom ? { bottom: tape.bottom } : {}),
      ...(tape.left ? { left: tape.left } : {}),
      ...(tape.right ? { right: tape.right } : {}),
      width: tape.width,
      height: tape.height,
      backgroundImage: `url(${tape})`,
      backgroundSize: 'cover',
      mixBlendMode: i === 1 ? 'multiply' : 'normal',
      transform: `rotate(${tape.rotation}deg)`,
      opacity: tape.opacity,
      boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
      pointerEvents: 'none',
      zIndex: 12,
    }}
  />
))}
```

#### Fingerprint Smudges (3-5 per device)
```typescript
{[
  { top: '25%', left: '12%', size: '30px', opacity: 0.3 },
  { bottom: '28%', right: '10%', size: '25px', opacity: 0.25 },
  { top: '50%', right: '8%', size: '28px', opacity: 0.28 },
].map((smudge, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(smudge.top ? { top: smudge.top } : {}),
      ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
      ...(smudge.left ? { left: smudge.left } : {}),
      ...(smudge.right ? { right: smudge.right } : {}),
      width: smudge.size,
      height: smudge.size,
      background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      filter: 'blur(3px)',
      zIndex: 8,
    }}
  />
))}
```

#### Grime Buildup Around Screws (4 per device - One per corner)
```typescript
{[
  { top: '12px', left: '12px', size: '25px', opacity: 0.6 },
  { top: '12px', right: '12px', size: '28px', opacity: 0.65 },
  { bottom: '12px', left: '12px', size: '26px', opacity: 0.62 },
  { bottom: '12px', right: '12px', size: '24px', opacity: 0.6 },
].map((grime, i) => (
  <div
    key={`screw-grime-${i}`}
    style={{
      position: 'absolute',
      ...(grime.top ? { top: grime.top } : {}),
      ...(grime.bottom ? { bottom: grime.bottom } : {}),
      ...(grime.left ? { left: grime.left } : {}),
      ...(grime.right ? { right: grime.right } : {}),
      width: grime.size,
      height: grime.size,
      backgroundImage: `url(${dust})`,
      backgroundSize: 'cover',
      mixBlendMode: 'multiply',
      opacity: grime.opacity,
      borderRadius: '50%',
      filter: 'blur(3px)',
      pointerEvents: 'none',
      zIndex: 11,
    }}
  />
))}
```

#### Rain Streaks (3-5 per device - Vertical weathering)
```typescript
{[
  { left: '8%', top: '10%', bottom: '30%', width: '1px', opacity: 0.3 },
  { left: '25%', top: '15%', bottom: '40%', width: '1px', opacity: 0.25 },
  { right: '12%', top: '12%', bottom: '35%', width: '1px', opacity: 0.28 },
].map((streak, i) => (
  <div
    key={`rain-${i}`}
    style={{
      position: 'absolute',
      ...(streak.left ? { left: streak.left } : {}),
      ...(streak.right ? { right: streak.right } : {}),
      top: streak.top,
      bottom: streak.bottom,
      width: streak.width,
      background: 'linear-gradient(180deg, transparent 0%, rgba(100,80,60,0.4) 30%, rgba(100,80,60,0.5) 70%, transparent 100%)',
      opacity: streak.opacity,
      filter: 'blur(0.5px)',
      pointerEvents: 'none',
      zIndex: 7,
    }}
  />
))}
```

#### Burnt Edges Around Display Cavities (4 per device - Heat damage)
```typescript
{[
  { top: '16%', left: '12%', right: '12%', height: '3px', opacity: 0.5 },
  { bottom: '16%', left: '12%', right: '12%', height: '3px', opacity: 0.55 },
  { top: '16%', bottom: '16%', left: '12%', width: '3px', opacity: 0.48 },
  { top: '16%', bottom: '16%', right: '12%', width: '3px', opacity: 0.52 },
].map((burnt, i) => (
  <div
    key={`burnt-${i}`}
    style={{
      position: 'absolute',
      ...(burnt.top ? { top: burnt.top } : {}),
      ...(burnt.bottom ? { bottom: burnt.bottom } : {}),
      ...(burnt.left ? { left: burnt.left } : {}),
      ...(burnt.right ? { right: burnt.right } : {}),
      ...(burnt.width ? { width: burnt.width } : {}),
      ...(burnt.height ? { height: burnt.height } : {}),
      background: 'linear-gradient(90deg, rgba(50,20,10,0.8) 0%, rgba(30,10,5,0.9) 50%, rgba(50,20,10,0.8) 100%)',
      opacity: burnt.opacity,
      filter: 'blur(2px)',
      pointerEvents: 'none',
      zIndex: 10,
    }}
  />
))}
```

---

### Rule 6: Labels & Text (ETCHED STYLE - Match Radar/EMF)

**EVERY device MUST have** labels with **ETCHED METAL** appearance:

#### Handwritten Label (ETCHED STYLE)
```typescript
<div style={{
  position: 'absolute',
  top: '8px',
  left: '25px',
  fontFamily: '"Caveat", cursive',
  fontSize: '14px',  // or '13px' for EMF
  color: 'rgba(200,200,200,0.5)',  // 40-50% opacity (NOT 0.4)
  transform: 'rotate(-1.5deg)',  // Slight rotation (-1.5deg to 1.5deg)
  textShadow: 
    '0 -1px 1px rgba(255,255,255,0.3), ' +  // Light top highlight (ETCHED)
    '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow (ETCHED)
    '1px 1px 3px rgba(0,0,0,0.8)',           // Additional depth
  letterSpacing: '0.5px',
  pointerEvents: 'none',
  zIndex: 21,
}}>
  RADAR UNIT B
</div>
```

#### Serial Number (ETCHED STYLE)
```typescript
<div style={{
  position: 'absolute',
  bottom: '8px',
  left: '15%',  // or '25px' for fixed positioning
  fontFamily: '"Courier New", monospace',
  fontSize: '8px',  // or '9px'
  color: 'rgba(150,150,150,0.45)',  // 40-50% opacity
  transform: 'rotate(0.4deg)',  // 0.3deg to 0.6deg rotation
  textShadow: 
    '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
    '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow
    '1px 1px 3px rgba(0,0,0,0.8)',
  pointerEvents: 'none',
  zIndex: 21,
}}>
  SN: RD-1985-7B
</div>
```

#### Printed Engineering Labels (ETCHED STYLE - Top Section)
```typescript
{[
  { top: '8%', left: '12%', label: 'PWR', rotation: -0.8, fontSize: '11px' },
  { top: '8%', left: '22%', label: 'GAIN', rotation: 1.2, fontSize: '10px' },
  { top: '8%', left: '32%', label: 'RANGE', rotation: -0.5, fontSize: '11px' },
  { top: '8%', right: '15%', label: 'TILT', rotation: 0.9, fontSize: '10px' },
].map((label, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(label.top ? { top: label.top } : {}),
      ...(label.bottom ? { bottom: label.bottom } : {}),
      ...(label.left ? { left: label.left } : {}),
      ...(label.right ? { right: label.right } : {}),
      fontFamily: '"Courier New", monospace',
      fontSize: label.fontSize,
      color: 'rgba(200,200,200,0.5)',  // 40-50% opacity
      transform: `rotate(${label.rotation}deg)`,  // 0.3deg to 1.5deg rotation
      textShadow: 
        '0 -1px 1px rgba(255,255,255,0.25), ' +  // Light top highlight
        '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow
        '1px 1px 3px rgba(0,0,0,0.8)',
      letterSpacing: '0.5px',
      pointerEvents: 'none',
      zIndex: 21,
    }}
  >
    {label.label}
  </div>
))}
```

#### Handwritten Calibration Note (ETCHED STYLE)
```typescript
<div style={{
  position: 'absolute',
  bottom: '8px',
  right: '15%',
  fontFamily: '"Caveat", cursive',
  fontSize: '10px',
  color: 'rgba(180,180,150,0.45)',  // 40-50% opacity
  transform: 'rotate(-0.5deg)',  // 0.3deg to 0.6deg rotation
  textShadow: 
    '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
    '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow
    '1px 1px 3px rgba(0,0,0,0.8)',
  pointerEvents: 'none',
  zIndex: 21,
}}>
  cal. 03/19
</div>
```

**CRITICAL ETCHED STYLE RULES**:
- **Opacity**: Always 40-50% (0.4-0.5), NOT lower
- **Text Shadow**: MUST have light top highlight + dark bottom shadow (creates etched metal effect)
- **Rotation**: Slight rotation (0.3deg to 1.5deg) for imperfection
- **Font Sizes**: Handwritten (13-14px), Serial (8-9px), Labels (10-11px)

---

### Rule 7: Screws & Hardware (HEAVY INDUSTRIAL - Match Radar/EMF)

**Screws MUST**:
- Be placed at corners (4 large corner screws) OR cardinal points (for bezels)
- Have realistic shading (radial gradient)
- Include screw slot detail (single slot OR cross-slot)
- Cast subtle shadows
- **Size**: 12-18px diameter (larger for structural screws, smaller for decorative)

#### Corner Screws (4 per device - Large structural screws)
```typescript
{[
  { top: '12px', left: '12px' },
  { top: '12px', right: '12px' },
  { bottom: '12px', left: '12px' },
  { bottom: '12px', right: '12px' },
].map((screw, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(screw.top ? { top: screw.top } : {}),
      ...(screw.bottom ? { bottom: screw.bottom } : {}),
      ...(screw.left ? { left: screw.left } : {}),
      ...(screw.right ? { right: screw.right } : {}),
      width: '14px',  // Larger for corner screws (12-18px)
      height: '14px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
      boxShadow: 
        'inset 0 2px 3px rgba(255,255,255,0.3), ' +
        'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
        '0 2px 4px rgba(0,0,0,0.8)',
      border: '1px solid rgba(0,0,0,0.7)',
      pointerEvents: 'none',
      zIndex: 10,
    }}
  >
    {/* Single slot screw */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '6px',
      height: '0.5px',
      background: '#0a0a0a',
    }} />
    {/* Cross-slot (optional - for some screws) */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(90deg)',
      width: '6px',
      height: '0.5px',
      background: '#0a0a0a',
    }} />
  </div>
))}
```

#### Bezel Screws (4 per bezel - Cardinal points)
```typescript
{[
  { top: '18px', left: '50%', transform: 'translateX(-50%)' },
  { bottom: '18px', left: '50%', transform: 'translateX(-50%)' },
  { top: '50%', left: '18px', transform: 'translateY(-50%)' },
  { top: '50%', right: '18px', transform: 'translateY(-50%)' },
].map((pos, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...pos,
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
      boxShadow: 
        'inset 0 2px 3px rgba(255,255,255,0.3), ' +
        'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
        '0 2px 4px rgba(0,0,0,0.8)',
      border: '1px solid rgba(0,0,0,0.7)',
      zIndex: 10,
    }}
  >
    {/* Screw slot */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '8px',
      height: '1.5px',
      background: '#0a0a0a',
      boxShadow: '0 0 2px rgba(0,0,0,0.9)',
    }} />
  </div>
))}
```

#### Corner Reinforcement Plates (For metal tools like Radar)
```typescript
{[
  { top: '22px', left: '18px', rotation: 0 },
  { top: '22px', right: '18px', rotation: 0 },
  { bottom: '28px', left: '18px', rotation: 0 },
  { bottom: '28px', right: '18px', rotation: 0 },
].map((corner, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(corner.top ? { top: corner.top } : {}),
      ...(corner.bottom ? { bottom: corner.bottom } : {}),
      ...(corner.left ? { left: corner.left } : {}),
      ...(corner.right ? { right: corner.right } : {}),
      width: '12px',
      height: '12px',
      background: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)',
      borderRadius: '2px',
      boxShadow: 
        'inset 0 1px 2px rgba(255,255,255,0.1), ' +
        'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
        '0 1px 2px rgba(0,0,0,0.8)',
      border: '1px solid rgba(0,0,0,0.6)',
    }}
  >
    {/* Corner screw inside plate */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 60%, #0a0a0a 100%)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.9)',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '4px',
        height: '0.5px',
        background: '#0a0a0a',
      }} />
    </div>
  </div>
))}
```

#### Vent Grilles (For metal tools - Industrial cooling)
```typescript
{[
  { left: '8px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '120px', count: 15 },
  { right: '8px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '120px', count: 15 },
].map((vent, i) => (
  <div
    key={i}
    style={{
      position: 'absolute',
      ...(vent.left ? { left: vent.left } : {}),
      ...(vent.right ? { right: vent.right } : {}),
      top: vent.top,
      transform: vent.transform,
      width: vent.width,
      height: vent.height,
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
    }}
  >
    {[...Array(vent.count)].map((_, j) => (
      <div
        key={j}
        style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
        }}
      />
    ))}
  </div>
))}
```

---

## 🧲 SECTION G — HERO ELEMENT & COMPOSITION

Every investigation tool must have a clear **"hero" element** (screen, LED array, viewfinder, waveform) that dominates the device and draws the eye immediately.

### Hero Scale Rules

**On mobile viewport, the hero element should occupy:**

- **60–75% of the device width**
- **45–60% of the device height**

The hero should **never** feel like a small panel floating in the center with huge empty margins.

**❌ Bad Examples:**
```typescript
// Hero too small
heroWidth: '40%',   // < 50% of device width
heroHeight: '30%',  // < 35% of device height
// Result: Feels like a UI card, not a physical device
```

**✅ Good Examples:**
```typescript
// Hero dominates device
heroWidth: '70%',   // >= 65% of device width
heroHeight: '55%',  // >= 50% of device height
// Result: Feels like you're holding the actual equipment
```

### Hero Positioning Rules

**Avoid perfect, sterile centering.**

- Slightly offset the hero **vertically** (position it higher, like real equipment)
- Keep room **below** for labels, serial numbers, tape, etc.
- Horizontal centering is fine, but vertical should favor the top

**Example:**
```typescript
// Hero container positioning
heroContainer: {
  position: 'absolute',
  top: '15%',        // Higher on device, not centered
  left: '50%',
  transform: 'translateX(-50%)',  // Only center horizontally
  width: 'min(70vw, 70vh)',
  height: 'min(70vw, 70vh)',
  maxWidth: '500px',
  maxHeight: '500px',
}
```

**Why this matters:**
- Radar: Circular screen at top = feels like you're looking down at the device
- EMF: LED block at top = room below for labels and tape
- Camera: Viewfinder at top = natural hand-held position

---

## 🧷 SECTION H — ASYMMETRY & STORY ELEMENTS

Every device must feel **lived-in** and **field-tested**, not factory-fresh or perfectly symmetrical.

### Required Story Elements

**EVERY device MUST have at least 3 "story" details:**

1. **Handwritten warning / calibration note**
   - Font: `"Caveat", cursive`
   - Example: "DO NOT TRUST" / "CALIBRATED 1985" / "BROKEN - DO NOT USE"
   - Position: Near hero element or on casing
   - Rotation: Slight (-1.5deg to 1.5deg)

2. **Printed label (monospace)**
   - Font: `"Courier New", monospace`
   - Example: "PWR", "GAIN", "RANGE", "TILT", "SN: RD-1985-7B"
   - Position: Top or bottom of device
   - Rotation: Slight (0.5deg to 1.5deg)

3. **Misaligned tape, sticker, or tag**
   - At least one tape patch that's noticeably crooked
   - Rotation: -15deg to 15deg
   - Position: On casing, near edges, or on hero element corners

4. **One corner more damaged than others**
   - Cluster more scratches, rust, or chips in one corner
   - Creates visual weight and tells a story of impact/damage

5. **A single odd element**
   - One different screw (different size or type)
   - Mismatched tape color
   - Crooked label that stands out
   - One wire extending past edge

**Example Implementation:**
```typescript
{/* Handwritten warning label */}
<div style={{
  position: 'absolute',
  top: '12%',
  right: '8%',
  fontFamily: '"Caveat", cursive',
  fontSize: '12px',
  color: 'rgba(200,150,150,0.6)',
  transform: 'rotate(1.2deg)',
  textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
}}>
  DO NOT TRUST
</div>

{/* Printed label with slight rotation */}
<div style={{
  position: 'absolute',
  top: '8%',
  left: '12%',
  fontFamily: '"Courier New", monospace',
  fontSize: '11px',
  color: 'rgba(200,200,200,0.5)',
  transform: 'rotate(-0.8deg)',
}}>
  PWR
</div>

{/* Crooked tape patch */}
<div style={{
  position: 'absolute',
  bottom: '10%',
  left: '5%',
  width: '60px',
  height: '20px',
  backgroundImage: `url(${tape})`,
  backgroundSize: 'cover',
  transform: 'rotate(-12deg)',  // Noticeably crooked
  opacity: 0.8,
}} />
```

### Asymmetry Layout Rules

**❌ Avoid:**
- Perfectly centered hero element
- Identical margins top/bottom
- Symmetrical damage distribution
- All labels perfectly aligned

**✅ Prefer:**
- Hero slightly high (top: 15-18%)
- Labels/tape clustered on one side
- At least one "heavy" corner (more scratches, rust, damage)
- Wires/tape extending past device edges
- One side more worn than the other

**Example: Heavy Corner Pattern:**
```typescript
{/* More damage clustered in bottom-right corner */}
{[
  { bottom: '8%', right: '8%', width: '80px', angle: 35, opacity: 0.6 },
  { bottom: '12%', right: '10%', width: '60px', angle: -25, opacity: 0.5 },
  { bottom: '15%', right: '6%', width: '70px', angle: 40, opacity: 0.55 },
  // More scratches in this corner than others
].map((scratch, i) => (
  <div key={i} style={{ /* scratch styling */ }} />
))}

{/* Rust spot in same corner */}
<div style={{
  position: 'absolute',
  bottom: '10%',
  right: '12%',
  width: '25px',
  height: '25px',
  backgroundImage: `url(${rust})`,
  // ... rust styling
}} />
```

---

## 💡 SECTION I — EMISSIVE ELEMENT RULES (LEDs, CRT, Viewfinder)

Any light-emitting part (LED bars, CRT radar, thermal display, viewfinder) must feel **glowing, dirty, and imperfect** - never flat or clean.

### Universal Emissive Rules

**EVERY emissive element MUST have:**

1. **Noise / Grain over the lit area**
   - Film grain texture overlay
   - `mixBlendMode: 'screen'` or `'overlay'`
   - `opacity: 0.25-0.4`

2. **Soft glow that bleeds into surrounding casing**
   - `boxShadow: '0 0 12px rgba(0,255,80,0.9), 0 0 24px rgba(0,255,80,0.4)'`
   - Glow should extend beyond the element itself

3. **Slight brightness variation between segments**
   - Never use pure flat color (`#00ff00`, `#ff0000`) without variation
   - Use gradients: `linear-gradient(to bottom, #00ff55, #00aa22)`
   - Vary opacity slightly between active segments (0.85-1.0)

4. **Vignette on the whole display area**
   - Edges should feel darker than center
   - `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)`

### LED Bar Graph Specific Rules

**For LED matrices (like EMF Meter), add:**

1. **Tiny "plastic separator" gaps between segments**
   - 1-2px dark gaps between LED bars
   - Creates physical separation feeling

2. **Slightly different opacity/brightness per bar**
   - Not a perfect uniform grid
   - Each active segment: `opacity: 0.88 + Math.random() * 0.12`

3. **Subtle vignette on the whole LED block**
   - Edges feel darker
   - Center feels brighter

**Example: Dirty LED Segment:**
```typescript
<div style={{
  width: '100%',
  height: '18px',
  background: 'linear-gradient(to bottom, #00ff55, #00aa22)',  // Gradient, not flat
  borderRadius: '2px',
  boxShadow: 
    '0 0 12px rgba(0,255,80,0.9), ' +      // Glow
    '0 0 24px rgba(0,255,80,0.4), ' +      // Outer glow
    'inset 0 1px 2px rgba(255,255,255,0.2)',  // Inner highlight
  opacity: 0.9 + Math.random() * 0.1,     // Slight variation
  position: 'relative',
}}>
  {/* Film grain overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${filmgrain})`,
    backgroundSize: 'cover',
    mixBlendMode: 'screen',
    opacity: 0.3,
    pointerEvents: 'none',
  }} />
  
  {/* Dust overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${dust})`,
    backgroundSize: 'cover',
    mixBlendMode: 'multiply',
    opacity: 0.25,
    pointerEvents: 'none',
  }} />
</div>
```

### CRT Screen Specific Rules

**For CRT displays (Radar, Thermal), add:**

1. **Scanlines**
   - `repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)`

2. **CRT Glow Effect**
   - `radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)`
   - `filter: 'blur(20px)'`
   - Extends beyond screen edges

3. **CRT Texture Overlay**
   - `backgroundImage: url(${crtTexture})`
   - `mixBlendMode: 'screen'`
   - `opacity: 0.1-0.15`

4. **Phosphor Persistence**
   - Slight glow trail on moving elements
   - Fade-out effect on static elements

**Example: Complete CRT Display:**
```typescript
<div style={{
  background: '#0a1a0a',
  borderRadius: '50%',
  boxShadow: 
    'inset 0 30px 70px rgba(0,0,0,0.99), ' +
    'inset 0 0 150px rgba(0,255,0,0.22)',
  border: '6px solid #000',
}}>
  {/* CRT Scanlines */}
  <div style={{
    background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
    zIndex: 10,
  }} />
  
  {/* CRT Glow Effect */}
  <div style={{
    background: 'radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: 9,
  }} />
  
  {/* CRT Texture */}
  <div style={{
    backgroundImage: `url(${crtTexture})`,
    mixBlendMode: 'screen',
    opacity: 0.12,
    zIndex: 11,
  }} />
  
  {/* Dust overlay */}
  <div style={{
    backgroundImage: `url(${dust})`,
    mixBlendMode: 'screen',
    opacity: 0.15,
    zIndex: 14,
  }} />
</div>
```

### Viewfinder Specific Rules

**For camera viewfinders, add:**

1. **Film Grain**
   - Heavy grain overlay
   - `opacity: 0.6-0.8`
   - Animated slight flicker

2. **VHS Effects**
   - Occasional horizontal glitch lines
   - Color shift on glitch
   - `mixBlendMode: 'screen'`

3. **Heavy Vignetting**
   - Dark edges, bright center
   - `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)`

---

## 📺 SECTION D — DISPLAY TYPES

### Display Type 1: CRT Screen

**Used in**: Radar, Thermal Scanner

**Characteristics**:
- Circular or rectangular
- Green phosphor glow
- Scanlines
- CRT texture overlay
- Deep inset with thick bezel
- Vignetting

**Example**:
```typescript
<div style={{
  background: '#0a1a0a',
  borderRadius: '50%',  // or '8px' for rectangular
  boxShadow: 
    'inset 0 30px 70px rgba(0,0,0,0.99), ' +
    'inset 0 0 150px rgba(0,255,0,0.22), ' +
    '0 0 3px rgba(0,255,0,0.06)',
  border: '6px solid #000',
}}>
  {/* Scanlines */}
  <div style={{
    background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
    zIndex: 10,
  }} />
  
  {/* CRT Glow */}
  <div style={{
    background: 'radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: 9,
  }} />
  
  {/* CRT Texture */}
  <div style={{
    backgroundImage: `url(${crtTexture})`,
    mixBlendMode: 'screen',
    opacity: 0.1,
    zIndex: 11,
  }} />
</div>
```

---

### Display Type 2: LED Bar Graph

**Used in**: EMF Meter

**Characteristics**:
- 5 vertical columns
- 5 segments per column
- Color progression (green → yellow → orange → red)
- Glow effect when active
- Dark when inactive
- **MUST have**: Grain, glow bleed, brightness variation, vignette

**Example**:
```typescript
<div style={{
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  position: 'relative',
  padding: '20px',
  background: '#1a1a1a',
  borderRadius: '8px',
  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.95)',
}}>
  {/* Vignette on LED block */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none',
    zIndex: 5,
  }} />
  
  {/* LED Column */}
  <div style={{
    width: '35px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '4px',  // Plastic separator gaps
  }}>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        style={{
          width: '100%',
          height: '18px',
          background: emfLevel >= i + 1 
            ? 'linear-gradient(to bottom, #00ff55, #00aa22)'  // Gradient, not flat
            : '#003300',
          borderRadius: '2px',
          boxShadow: emfLevel >= i + 1 
            ? '0 0 12px rgba(0,255,80,0.9), 0 0 24px rgba(0,255,80,0.4)' 
            : 'none',
          opacity: emfLevel >= i + 1 ? 0.88 + Math.random() * 0.12 : 0.3,  // Variation
          transition: 'all 0.1s',
          position: 'relative',
        }}
      >
        {/* Film grain overlay */}
        {emfLevel >= i + 1 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${filmgrain})`,
            backgroundSize: 'cover',
            mixBlendMode: 'screen',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />
        )}
      </div>
    ))}
  </div>
</div>
```

---

### Display Type 3: Viewfinder

**Used in**: Camera

**Characteristics**:
- Frame border (like looking through viewfinder)
- REC indicator
- Timestamp
- Battery indicator
- Crosshairs
- Film grain
- VHS effects

**Example**:
```typescript
<div style={{
  width: '100%',
  maxWidth: '640px',
  aspectRatio: '4/3',
  background: '#0a0a0a',
  border: '8px solid #0f0f0f',
  borderRadius: '4px',
  boxShadow: '0 0 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)',
}}>
  {/* Film grain */}
  <div style={{
    backgroundImage: `url(${filmgrain})`,
    mixBlendMode: 'overlay',
    opacity: 0.6,
    animation: 'grain 0.15s infinite',
  }} />
  
  {/* REC indicator */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }}>
    <div style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: '#ff0000',
      boxShadow: '0 0 12px #ff0000',
      animation: 'blink 1s infinite',
    }} />
    <div style={{
      fontFamily: '"Courier New", monospace',
      color: '#ff0000',
      textShadow: '0 0 8px #ff0000',
    }}>
      REC
    </div>
  </div>
</div>
```

---

### Display Type 4: Oscilloscope

**Used in**: Spirit Box

**Characteristics**:
- Waveform visualization
- Grid lines
- Green phosphor color
- EVP text overlays
- Static level indicator

**Example**:
```typescript
<div style={{
  background: '#0a1a0a',
  borderRadius: '6px',
}}>
  {/* Grid lines */}
  <svg width="100%" height="100%">
    {[...Array(9)].map((_, i) => (
      <line
        key={i}
        x1="0"
        y1={i * 20}
        x2="100%"
        y2={i * 20}
        stroke="#00ff00"
        strokeWidth="0.5"
        opacity="0.2"
      />
    ))}
  </svg>
  
  {/* Waveform */}
  <svg width="100%" height="100%">
    <polyline
      points={waveform.map((val, i) => 
        `${(i / waveform.length) * 100}%,${90 - val * 80}`
      ).join(' ')}
      fill="none"
      stroke="#00ff00"
      strokeWidth="2"
      opacity="0.8"
      filter="url(#glow)"
    />
  </svg>
</div>
```

---

## 🔧 SECTION D.5 — THICK METALLIC BEZEL CONSTRUCTION

**CRITICAL**: Display bezels MUST be thick, raised, and heavily textured to match Radar/EMF.

### Bezel Specifications

**Offset**: 28-35px (bezel extends beyond display edges)
**Thickness**: 5px border + shadow depth
**Material**: Heavy metallic with texture overlays

**Complete Bezel Implementation**:
```typescript
{/* THICK Metallic Bezel Ring - Raised Above Display */}
<div style={{
  position: 'absolute',
  top: '-28px',  // or '-35px' for thicker bezel
  left: '-28px',
  right: '-28px',
  bottom: '-28px',
  borderRadius: '50%',  // or '12px' for rectangular displays
  background: `
    linear-gradient(135deg, 
      #5a5a5a 0%, 
      #4a4a4a 15%, 
      #3a3a3a 30%, 
      #4a4a4a 50%, 
      #3a3a3a 70%, 
      #2a2a2a 85%, 
      #1a1a1a 100%
    ),
    url(${metalTexture})
  `,
  backgroundBlendMode: 'overlay',
  backgroundSize: 'cover, cover',
  boxShadow: 
    'inset 0 4px 8px rgba(255,255,255,0.2), ' +   // Top highlight
    'inset 0 -4px 8px rgba(0,0,0,0.9), ' +        // Bottom shadow
    'inset 0 0 80px rgba(0,0,0,0.5), ' +          // Deep ambient shadow
    '0 10px 25px rgba(0,0,0,0.95), ' +            // External shadow
    '0 15px 35px rgba(0,0,0,0.85)',               // Outer shadow
  filter: 'brightness(0.85)',
  border: '5px solid rgba(0,0,0,0.8)',
  borderTop: '4px solid rgba(255,255,255,0.1)',   // Top border highlight
  zIndex: 12,
}}>
  {/* DEEP Shadow beneath bezel for depth */}
  <div style={{
    position: 'absolute',
    top: '32px',  // Match bezel offset
    left: '32px',
    right: '32px',
    bottom: '32px',
    borderRadius: '50%',  // Match display shape
    boxShadow: 
      'inset 0 0 60px rgba(0,0,0,0.99), ' +   // Stronger shadow
      'inset 0 0 100px rgba(0,0,0,0.98), ' +
      'inset 0 0 140px rgba(0,0,0,0.96), ' +
      'inset 0 0 180px rgba(0,0,0,0.94)',
    pointerEvents: 'none',
    zIndex: 1,
  }} />
  
  {/* Brushed metal highlight */}
  <div style={{
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    height: '30%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
    borderRadius: '50%',
    transform: 'rotate(-45deg)',
    pointerEvents: 'none',
  }} />
  
  {/* Rust/wear on bezel */}
  <div style={{
    position: 'absolute',
    top: '15%',
    right: '20%',
    width: '40px',
    height: '40px',
    backgroundImage: `url(${rust})`,
    backgroundSize: 'cover',
    mixBlendMode: 'multiply',
    opacity: 0.4,
    borderRadius: '50%',
    pointerEvents: 'none',
  }} />
  
  {/* Tape patch on bezel */}
  <div style={{
    position: 'absolute',
    bottom: '25%',
    left: '10%',
    width: '50px',
    height: '20px',
    backgroundImage: `url(${tape})`,
    backgroundSize: 'cover',
    transform: 'rotate(-15deg)',
    opacity: 0.7,
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  }} />
  
  {/* Dust/grime on bezel */}
  <div style={{
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '60px',
    height: '60px',
    backgroundImage: `url(${dust})`,
    backgroundSize: 'cover',
    mixBlendMode: 'multiply',
    opacity: 0.3,
    borderRadius: '50%',
    pointerEvents: 'none',
  }} />
  
  {/* Bezel scratches (6+ scratches) */}
  {[
    { top: '25%', left: '15%', width: '30px', angle: -25, opacity: 0.6 },
    { bottom: '30%', right: '20%', width: '35px', angle: 35, opacity: 0.65 },
    // ... 4+ more scratches
  ].map((scratch, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        ...(scratch.top ? { top: scratch.top } : {}),
        ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
        ...(scratch.left ? { left: scratch.left } : {}),
        ...(scratch.right ? { right: scratch.right } : {}),
        width: scratch.width,
        height: '1px',
        background: 'rgba(0,0,0,0.7)',
        transform: `rotate(${scratch.angle}deg)`,
        opacity: scratch.opacity,
        pointerEvents: 'none',
        boxShadow: '0 0 1px rgba(0,0,0,0.8)',
      }}
    />
  ))}
  
  {/* Fingerprint smudges */}
  {[
    { top: '35%', left: '30%', size: '25px' },
    { bottom: '40%', right: '28%', size: '20px' },
  ].map((smudge, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        ...(smudge.top ? { top: smudge.top } : {}),
        ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
        ...(smudge.left ? { left: smudge.left } : {}),
        ...(smudge.right ? { right: smudge.right } : {}),
        width: smudge.size,
        height: smudge.size,
        background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(2px)',
      }}
    />
  ))}
  
  {/* Screws at cardinal points (4 screws) */}
  {[
    { top: '18px', left: '50%', transform: 'translateX(-50%)' },
    { bottom: '18px', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: '18px', transform: 'translateY(-50%)' },
    { top: '50%', right: '18px', transform: 'translateY(-50%)' },
  ].map((pos, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        ...pos,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
        boxShadow: 
          'inset 0 2px 3px rgba(255,255,255,0.3), ' +
          'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
          '0 2px 4px rgba(0,0,0,0.8)',
        border: '1px solid rgba(0,0,0,0.7)',
        zIndex: 10,
      }}
    >
      {/* Screw slot */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8px',
        height: '1.5px',
        background: '#0a0a0a',
        boxShadow: '0 0 2px rgba(0,0,0,0.9)',
      }} />
    </div>
  ))}
</div>
```

**CRITICAL BEZEL RULES**:
- Bezel MUST be raised above display (negative offset: -28px to -35px)
- Bezel MUST have metal texture overlay + rust + dust
- Bezel MUST have 6+ scratches and wear marks
- Bezel MUST have screws at cardinal points (4 screws)
- Bezel MUST cast deep shadow onto display below
- Bezel MUST have tape patches and fingerprint smudges
- Bezel MUST have brushed metal highlight (angled gradient)

---

## 🎬 SECTION E — EFFECTS & ANIMATIONS

### Effect 1: Film Grain

```typescript
<div style={{
  backgroundImage: `url(${filmgrain})`,
  backgroundSize: 'cover',
  mixBlendMode: 'overlay',
  opacity: 0.6,
  animation: 'grain 0.15s infinite',
}} />

<style>{`
  @keyframes grain {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.97; }
  }
`}</style>
```

---

### Effect 2: Scanlines

```typescript
<div style={{
  background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
}} />
```

---

### Effect 3: CRT Glow

```typescript
<div style={{
  background: 'radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)',
  filter: 'blur(20px)',
}} />
```

---

### Effect 4: Vignette

```typescript
<div style={{
  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
}} />
```

---

### Effect 5: Blinking LED

```typescript
<div style={{
  background: '#ff0000',
  boxShadow: '0 0 12px #ff0000',
  animation: 'blink 1s infinite',
}} />

<style>{`
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.3; }
  }
`}</style>
```

---

### Effect 6: VHS Glitch

```typescript
{vhsGlitch && (
  <div style={{
    position: 'absolute',
    top: `${Math.random() * 80}%`,
    left: 0,
    right: 0,
    height: '20%',
    background: 'rgba(255,0,255,0.3)',
    transform: `translateX(${Math.random() * 20 - 10}px)`,
    mixBlendMode: 'screen',
  }} />
)}
```

---

## 🎯 SECTION F — TOOL-SPECIFIC RULES

### EMF Meter

**Casing**: Heavy steel/metal construction (MATCHES RADAR - same gradient)
**Display**: LED bar graph (5 columns × 8 segments per column)
**Colors**: Green (#00ff55, 1-2) → Yellow (#ffff00, 3) → Orange (#ff8800, 4) → Red (#ff0000, 5)
**Special**: Flickering effect on spikes, screen shake at Level 5

**Key Elements**:
- **Same heavy steel casing** as Radar:
  - Same gradient: `linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, ...)`
  - Same texture layers: Metal (0.6), Rust (0.4), Dust (0.3)
  - Same beveled edges (8-12px)
- **Deeply recessed LED housing** (25-40px depth)
  - THICK metallic bezel ring (28px offset, raised above LED panel)
  - Bezel with metal texture + rust + dust overlays
  - Screws at bezel corners (4 screws)
- **LED Panel Container** (DEEP INSET - 12% inset from bezel)
  - Multiple shadow layers for depth
  - Dirty glass cover with fingerprints, smudges, scratches
  - Film grain overlay
  - Dust overlay
- **LED Matrix**: 5 columns × 8 segments
  - Segments fill bottom-to-top
  - Each segment has grain, glow bleed, brightness variation
  - Level 5: Aggressive red glow, flicker, screen shake
- **Extensive damage** (10-15 elements):
  - Deep scratches (light + dark)
  - Rust specks (5-7 spots)
  - Chipped corners (4-6 chips)
  - Weld lines/seams
  - Tape patches (3-5 pieces, crooked)
  - Fingerprint smudges
  - Grime buildup around screws
  - Rain streaks
  - Burnt edges around LED cavity
- **Handwritten label**: "EMF METER" (Caveat font, etched style)
- **Model name**: "K-II METER" (Courier font, etched style)
- **Serial number**: "SN: EMF-2019-K2" (Courier font, etched style)
- **Calibration note**: "cal. 03/19" (Caveat font, etched style)
- **Tape patches**: "BAT OK" handwritten on tape

---

### Camera (FINAL - Polaroid Ghost Camera)

**Casing**: Black rubberized plastic body (vertical Polaroid camera shape)
**Display**: Viewfinder with 4:3 aspect ratio, deep inset with thick bezel
**Colors**: Red (REC), Yellow (timestamp), White (crosshairs), Green/Teal (viewfinder glow)
**Special**: Film grain, instant photo ejection, Polaroid preview, scanline effects

**Key Elements**:
- **Full-screen layout** - Fills 100% viewport
- **Black rubberized plastic casing** - Uses `smoothPlastic` texture with layered overlays
- **Viewfinder** - Deep inset (25-40px), thick black bezel, 4 screws at corners
- **EMF-style glow** - Green/teal radial glow around viewfinder, pulses when active
- **Film ejection slot** - Horizontal recessed slot below viewfinder with warning labels
- **Physical controls**:
  - Chunky shutter button (bottom-right, desaturated orange accent)
  - Status LED (green, blinks when armed)
  - Control labels (MODE, FLASH, IR) above film slot
- **Polaroid photo preview** - Ejects from slot when shutter pressed
- **REC indicator** - Red, blinking, fuzzy/glowy effect
- **Battery indicator** - Text HUD style "BATT 72%" (not modern phone icon)
- **Timestamp** - Live updating, yellow text
- **Crosshairs and focus ring** - Center targeting reticle
- **Extensive damage** - 7+ elements: corner screws, tape label, scratches, serial number
- **Labels**: "POLAROID-1985" on tape patch, serial number at bottom

---

### Thermal Scanner (FINAL - FLIR E5-style Handheld)

**Casing**: Black rubberized plastic (FLIR E5-style handheld device)
**Display**: Thermal gradient viewfinder (purple/blue → yellow → orange → white)
**Colors**: Blue (cold spots), Green (normal), Orange/Red (hot spots), Purple background
**Special**: Scan lines, film grain, crosshair, temperature markers, hot spot detection

**Key Elements**:
- **Full-screen layout** - Fills 100% viewport
- **Black rubberized plastic casing** - Uses `smoothPlastic` texture with layered overlays
- **Trapezoid body shape** - Top-heavy "head" section (55% height) + narrower handle (45% height)
- **Screen frame** - Deep inset with EMF-style bezel and glow
- **Screen glow** - Green for normal, orange/red for hot spot detection
- **Thermal display** - Thermographic gradient, crosshair, temperature readout, scanlines
- **Physical controls**:
  - Recessed buttons (triangular/circular) on handle
  - LED indicator
  - Embossed labels (MODE, ZOOM, IR/UV, REC)
- **Side grips** - Thick rubberized grips (36px wide, dark charcoal)
- **Screws** - Subtle screws on sides of head and handle sections
- **Extensive damage** - 7+ elements: scratches, tape patch, labels, serial number
- **Labels**: "FLIR-1985", "HOT SPOT WARNING", serial number on bottom grip

---

### Radar

**Casing**: Heavy steel/metal construction (HEAVY INDUSTRIAL)
**Display**: Circular CRT screen with THICK metallic bezel
**Colors**: Green phosphor (#00ff00), dark background (#0a1a0a)
**Special**: Sweep animation, ghost blip

**Key Elements**:
- **THICK metal bezel** (35px+ offset, raised above screen)
  - Bezel gradient: `linear-gradient(135deg, #6a6a6a 0%, #5a5a5a 10%, #4a4a4a 25%, ...)`
  - Bezel texture: Metal texture overlay + rust + dust
  - Bezel shadows: Multiple inset shadows for depth
  - Screws at cardinal points (4 screws around bezel)
- **Deep screen inset** (12% inset from bezel edges)
  - Screen sits DEEPLY inside bezel cavity
  - Multiple shadow layers: `inset 0 30px 70px rgba(0,0,0,0.99)`
- **Weld lines and seams** (3-5 horizontal/vertical seams)
- **Corner reinforcement plates** (4 plates at device corners)
- **Vent grilles on sides** (15 slits per side)
- **Extensive rust and scratches** (10-15 damage elements)
- **Tape patches** on bezel and casing
- **Handwritten label**: "RADAR UNIT B" (Caveat font, etched style)
- **Serial number**: "SN: RD-1985-7B" (Courier font, etched style)

---

### Spirit Box

**Casing**: Dark brown/black plastic (radio aesthetic)
**Display**: Oscilloscope waveform + frequency readout
**Colors**: Green (waveform), Orange (frequency), Red (EVP text)
**Special**: Waveform animation, EVP text overlays

**Key Elements**:
- Physical knobs (tune, volume)
- Bent antenna
- Frequency display
- Static level indicator
- EVP response text (fades in/out)
- Heavy dust and grime

---

## ✅ IMPLEMENTATION CHECKLIST

**NOTE: All five investigation tools are now COMPLETE and represent the FINAL designs.**
**Reference the mock files directly: RadarToolMock.tsx, EMFMeterMock.tsx, ThermalScannerMock.tsx, CameraViewfinderMock.tsx, SpiritBoxMock.tsx**

When creating ANY investigation tool:

### Layout & Structure
- [ ] **Full-screen layout** - MUST fill 100% viewport (position: fixed, top: 0, left: 0, right: 0, bottom: 0)
- [ ] **NO centered containers** - Remove maxWidth/maxHeight constraints, use 100% width/height
- [ ] Device casing with appropriate material (steel gradient OR plastic texture)
- [ ] Hero element (screen/viewfinder) sized appropriately for full-screen (min(90vw, 800px) or similar)
- [ ] Room below hero for labels, controls, and tape

### Materials & Textures
- [ ] **Material type selection**:
  - [ ] **Metal tools (Radar, EMF, Spirit Box)**: Heavy steel gradient casing
  - [ ] **Plastic tools (Thermal, Camera)**: Black rubberized plastic with `smoothPlastic` texture
- [ ] 3-5 texture layers with EXACT specifications:
  - [ ] **Metal tools**: Metal texture overlay (`mixBlendMode: 'overlay'`, `opacity: 0.6`), Rust overlay (`mixBlendMode: 'multiply'`, `opacity: 0.4`), Dust layer (`mixBlendMode: 'multiply'`, `opacity: 0.3`)
  - [ ] **Plastic tools**: Smooth plastic base (`mixBlendMode: 'multiply'`, `opacity: 0.5`), Scratched plastic (`mixBlendMode: 'overlay'`, `opacity: 0.15`), Dust (`mixBlendMode: 'screen'`, `opacity: 0.08`), Wrinkled paper (`mixBlendMode: 'overlay'`, `opacity: 0.12`)
- [ ] Beveled edges (8-12px deep for plastic, deeper for metal, light top, dark bottom)
- [ ] Weld lines/seams across device (metal tools only, 3-5 seams, horizontal + vertical)
- [ ] **Metal casing gradient**: `linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)`
- [ ] **Plastic casing**: `url(${smoothPlastic})` with `backgroundSize: '300px 300px'`, `backgroundRepeat: 'repeat'`

### Damage & Wear (HEAVY INDUSTRIAL - 10-15+ elements)
- [ ] Deep scratches (6-8 light scratches + 3-5 dark scratches)
- [ ] Deep gouges (3-5 per device - heavier than scratches)
- [ ] Rust specks (5-7 scattered across device)
- [ ] Chipped paint areas (4-6 per device - corners + edges)
- [ ] Weld lines/seams (3-5 horizontal + vertical seams)
- [ ] Tape patches (3-5 per device - crooked, clustered)
- [ ] Fingerprint smudges (3-5 per device)
- [ ] Grime buildup around screws (4 per device - one per corner)
- [ ] Rain streaks (3-5 vertical weathering marks)
- [ ] Burnt edges around display cavities (4 per device - heat damage)
- [ ] One corner more damaged than others (heavy corner pattern)
- [ ] Wires/tape extending past device edges

### Story Elements (Minimum 3 Required - ETCHED STYLE)
- [ ] Handwritten label (Caveat font, 13-14px, etched style with light top highlight + dark bottom shadow)
- [ ] Printed engineering labels (Courier font, 10-11px, etched style, slight rotation 0.3deg-1.5deg)
- [ ] Warning/calibration note near hero element (Caveat font, etched style)
- [ ] Crooked tape or sticker (rotation -15deg to 15deg, clustered)
- [ ] Serial number (Courier font, 8-9px, etched style, 40-50% opacity)
- [ ] Model name/type label (Courier font, etched style)
- [ ] One odd element (different screw, mismatched tape, etc.)
- [ ] **CRITICAL**: All labels use ETCHED STYLE (light top highlight + dark bottom shadow, 40-50% opacity)

### Hardware (HEAVY INDUSTRIAL)
- [ ] Corner screws (4 large screws, 12-18px diameter, at device corners)
- [ ] Bezel screws (4 screws at cardinal points, 12px diameter, for display bezels)
- [ ] Screw slots (single slot OR cross-slot, dark color #0a0a0a)
- [ ] Corner reinforcement plates (for metal tools like Radar - 4 plates)
- [ ] Vent grilles (for metal tools - 15 slits per side, vertical orientation)
- [ ] Calibration screw (optional - smaller screw, 12px diameter)

### Display/Emissive Elements (HEAVY INDUSTRIAL)
- [ ] Display area with DEEP inset (25-40px depth, multiple shadow layers)
- [ ] THICK metallic bezel (28-35px offset, raised above display)
  - [ ] Bezel gradient with metal texture overlay
  - [ ] Bezel rust + dust overlays
  - [ ] Bezel screws at corners/cardinal points
  - [ ] Bezel scratches and wear
- [ ] Display-specific effects (scanlines, grain, glow)
- [ ] Noise/grain overlay on all lit elements (film grain texture)
- [ ] Soft glow bleeding into casing (ambient bounce light)
- [ ] Brightness variation between segments (0.88-1.0 opacity range)
- [ ] Vignette on display area (radial gradient, darker edges)
- [ ] Dirty glass overlay (fingerprints, smudges, scratches, dust)
- [ ] Never use flat colors without texture
- [ ] Multiple shadow layers for depth: `inset 0 30px 70px rgba(0,0,0,0.99)`

### Asymmetry
- [ ] Labels clustered on one side
- [ ] Asymmetric damage distribution
- [ ] Imperfect rotation/alignment on all text
- [ ] Not perfectly centered layout

### Technical
- [ ] Functional UI elements (text, indicators)
- [ ] Proper z-index layering
- [ ] Realistic shadows throughout

---

## 🎨 TEXTURE ASSETS REQUIRED

### Metal Textures
- `metalscratchedtexture.png` - Brushed metal with scratches
- `brownrust.png` - Rust spots and oxidation

### Plastic Textures
- `scratchedplastic1.png` - Light scratched plastic
- `scratchedplasticdark.png` - Dark scratched plastic

### Screen Textures
- `crtexture.png` - CRT phosphor pattern
- `dirtyglass.png` - Dirty screen protector
- `filmgrain.png` - Film grain overlay

### Damage Textures
- `dust.png` - Dust and grime
- `wrinkledpaper.png` - Aged/wrinkled surface
- `tape.png` - Masking tape
- `coffeestain.png` - Coffee stains (optional)

---

## 🎯 KEY DIFFERENCES FROM ANALOG HORROR COMPONENTS

| Aspect | Analog Horror (Paper UI) | Investigation Tools (Devices) |
|--------|---------------------------|-------------------------------|
| **Purpose** | UI screens (Codex, Profile) | Immersive equipment simulation |
| **Layout** | Partial screen, cards | Full-screen, viewport-filling |
| **Material** | Paper, photos, notes | Metal, plastic, glass |
| **Aesthetic** | Aged documents | Worn equipment |
| **Interaction** | Read, browse | Use, operate |
| **Components** | Reusable LEGO pieces | Unique, monolithic tools |
| **Damage** | Coffee stains, burns, tears | Scratches, rust, chips, tape |
| **Text** | Handwritten, typewritten | LED, CRT, LCD displays |
| **Depth** | Flat with shadows | Deep bevels and insets |

---

## 📝 FINAL RULE

**Investigation tools are NOT built from components.**

Each tool is a **unique, monolithic implementation** that simulates a specific piece of equipment. Unlike the analog horror component system (which uses reusable pieces like `<PaperBase>`, `<Tape>`, `<PolaroidPhoto>`), tools are standalone full-screen experiences.

**However**, they ALL follow the same construction principles:
- Full-screen immersion
- Layered textures
- Physical depth
- Realistic damage
- Authentic device aesthetics

---

**Status**: ✅ INVESTIGATION TOOLS DESIGN SYSTEM
**Last Updated**: 2024
**Authority**: MAXIMUM - This is the standard for all ghost-hunting equipment
