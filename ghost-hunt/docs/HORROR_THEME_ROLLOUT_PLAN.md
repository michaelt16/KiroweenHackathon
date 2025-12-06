# Horror Theme Rollout Plan 🔥

## 🎯 Mission
Apply the AAA analog horror aesthetic from the 3 visual guides (Ghost Entry, Player Notes, Evidence Board) across the ENTIRE app!

---

## 📋 Screens to Transform

### 1. 🗺️ Map Screen (MapRootScreen.tsx)
**Current**: Digital map with markers
**Transform to**: Aged paper map with hand-drawn markers
- Cork board texture background
- Polaroid photos for hotspots
- Sticky notes for objectives
- Tape and pins
- Hand-drawn circles and X marks
- Coffee stains and wrinkles
- Fold crease down middle

### 2. 👤 Profile Screen (ProfilePanel.tsx)
**Inspiration**: `assets/inspiration/profile.png`
**Transform to**: ID Badge / Case File aesthetic (mobile version)
- Polaroid photo with tape
- Handwritten agent details
- Stamped classifications
- Worn paper texture
- Fingerprints
- Case number
- Investigation stats as handwritten notes
- Burn marks and stains

### 3. 📖 Codex Screen (CodexScreen.tsx)
**Current**: Digital ghost list
**Transform to**: Field journal with ghost entries
- Leather-bound journal aesthetic
- Each ghost as a journal page
- Polaroid photos of ghosts
- Handwritten notes
- Evidence checkboxes
- Coffee stains
- Torn pages
- Sticky note bookmarks

### 4. 🎒 Inventory Screen (InventoryScreen.tsx)
**Current**: Digital item list
**Transform to**: Equipment locker / Field kit
- Cork board with pinned items
- Polaroid photos of equipment
- Handwritten labels
- Quantity in red marker
- Tape holding cards
- Worn paper tags
- Supply checklist aesthetic

### 5. 🔍 Investigation Screen (InvestigationScreen.tsx)
**Current**: Digital radar interface
**Transform to**: Field scanner with analog overlays
- Keep digital radar core
- Add paper overlay frames
- Handwritten notes in corners
- Sticky notes for readings
- Polaroid evidence snapshots
- Tape holding UI elements
- VHS static effects

---

## 🎨 Core Design System

### Color Palette
```css
/* Paper */
--paper-aged: #c4b49a
--paper-light: #e8e4d8
--paper-cream: #f5f1e8
--paper-yellow: #fbbf24

/* Ink */
--ink-dark: #1a0f0a
--ink-medium: #0a0a0a
--ink-red: #8b0000
--ink-blood: #dc2626

/* Cork/Wood */
--cork-base: #8b7355
--wood-dark: #654321

/* Backgrounds */
--bg-dark: #0d0a08
--bg-medium: #1a1510
```

### Typography
```css
/* Handwritten */
font-family: 'Caveat', cursive

/* Typewriter */
font-family: 'Courier New', monospace

/* Stamps */
font-family: 'Impact', sans-serif
```

### Texture Layers
1. Base color
2. Wrinkled paper texture (multiply, 0.7-0.8)
3. Dust/grain overlay (overlay, 0.4-0.5)
4. Water damage vignette (radial gradient)
5. Specific damage (burns, tears, stains)

### Effects Library
- **Ink bleed**: `textShadow: '2px 2px 4px rgba(139,0,0,0.5)'`
- **Text jitter**: `transform: 'rotate(-0.5deg) translateX(-0.4px)'`
- **Polaroid shadow**: `boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)'`
- **Tape**: Yellowed tape texture at angles
- **Fingerprints**: Radial gradient ellipses
- **Blood smears**: Linear gradient overlays
- **Fold crease**: Vertical line with gradient
- **VHS noise**: Repeating scanlines

---

## 🔧 Reusable Components to Create

### 1. `<PaperCard>`
Aged paper container with all damage layers
```tsx
<PaperCard 
  damage="heavy" | "medium" | "light"
  rotation={-2}
  stains={true}
>
  Content
</PaperCard>
```

### 2. `<PolaroidPhoto>`
Photo frame with tape and shadows
```tsx
<PolaroidPhoto
  src={image}
  caption="handwritten text"
  rotation={-5}
  tape="top" | "corner"
/>
```

### 3. `<StickyNote>`
Yellow sticky note with wrinkles
```tsx
<StickyNote
  color="yellow" | "pink" | "blue"
  rotation={3}
>
  Quick note
</StickyNote>
```

### 4. `<HandwrittenText>`
Text with jitter and ink bleed
```tsx
<HandwrittenText
  size="large" | "medium" | "small"
  color="black" | "red"
  jitter={true}
>
  Handwritten content
</HandwrittenText>
```

### 5. `<CorkBoard>`
Cork texture background
```tsx
<CorkBoard>
  <PinnedItem />
  <PinnedItem />
</CorkBoard>
```

### 6. `<TapeCorner>`
Tape decoration
```tsx
<TapeCorner
  position="top-left" | "top-right"
  rotation={8}
/>
```

### 7. `<StampMark>`
Urgent/classified stamps
```tsx
<StampMark
  text="URGENT" | "CLASSIFIED"
  color="red" | "black"
  rotation={15}
/>
```

---

## 📱 Mobile Optimization

### Touch Targets
- Minimum 44px tap areas
- Generous padding around interactive elements
- Clear visual feedback on tap

### Readability
- Handwritten text minimum 18px
- High contrast on textured backgrounds
- Avoid thin fonts on heavy textures

### Performance
- Optimize texture images (WebP format)
- Lazy load heavy textures
- Use CSS for simple effects
- Limit simultaneous animations

---

## 🎯 Implementation Order

### Phase 1: Foundation (Priority 1)
1. ✅ Create reusable components library
2. ✅ Set up design tokens/CSS variables
3. ✅ Optimize texture assets

### Phase 2: Core Screens (Priority 2)
1. 👤 **Profile Screen** - ID badge aesthetic (inspiration reference)
2. 🗺️ **Map Screen** - Aged paper map
3. 📖 **Codex Screen** - Field journal

### Phase 3: Secondary Screens (Priority 3)
1. 🎒 **Inventory Screen** - Equipment locker
2. 🔍 **Investigation Screen** - Analog overlay

### Phase 4: Polish (Priority 4)
1. Transitions between screens
2. Loading states
3. Error states
4. Empty states

---

## 🎨 Screen-Specific Details

### Profile Screen (Mobile ID Badge)
**Inspiration**: `profile.png`

**Layout**:
```
┌─────────────────────┐
│  [TAPE]             │
│  ┌───────────┐      │
│  │ POLAROID  │      │
│  │  PHOTO    │      │
│  │           │      │
│  └───────────┘      │
│  Agent M.           │
│  Level: 5           │
│  ─────────────      │
│  Investigations: 12 │
│  Ghosts: 8          │
│  Success: 87%       │
│  [FINGERPRINT]      │
│  [BURN MARK]        │
└─────────────────────┘
```

**Elements**:
- Aged paper background
- Polaroid with tape at top
- Handwritten agent name
- Typewriter stats
- Classified stamp
- Case number
- Fingerprint smudge
- Coffee stain
- Fold crease

### Map Screen (Aged Paper Map)
**Layout**:
```
┌─────────────────────┐
│ [Compass Rose]      │
│                     │
│    ✗ (You)          │
│                     │
│  ⭕ Hotspot 1       │
│                     │
│  📦 Supply          │
│                     │
│  ⭕ Hotspot 2       │
│                     │
│ [Sticky Note]       │
└─────────────────────┘
```

**Elements**:
- Aged paper texture
- Hand-drawn X for player
- Red circles for hotspots
- Sketched supply boxes
- Compass rose corner
- Sticky notes for objectives
- Coffee stains
- Fold lines
- Torn edges

### Codex Screen (Field Journal)
**Layout**:
```
┌─────────────────────┐
│ GHOST HUNTER'S      │
│ JOURNAL             │
│ ─────────────       │
│                     │
│ [TAB: WRAITH]       │
│ ┌───────────┐       │
│ │ POLAROID  │       │
│ └───────────┘       │
│ Name: Wraith        │
│ Threat: HIGH        │
│ Evidence:           │
│ ☑ EMF-5             │
│ ☑ Freezing          │
│ ☐ Orbs              │
│ [Coffee Stain]      │
└─────────────────────┘
```

**Elements**:
- Leather journal cover
- Tabbed pages
- Polaroid photos
- Handwritten entries
- Evidence checkboxes
- Threat level stamps
- Page numbers
- Stains and wear

### Inventory Screen (Equipment Locker)
**Layout**:
```
┌─────────────────────┐
│ FIELD EQUIPMENT     │
│ ═════════════       │
│                     │
│ [📷 Camera]         │
│ Film: 3             │
│                     │
│ [📊 EMF Meter]      │
│ Batteries: Full     │
│                     │
│ [🌡️ Thermal]        │
│ Ready               │
│                     │
└─────────────────────┘
```

**Elements**:
- Cork board background
- Pinned equipment cards
- Polaroid item photos
- Handwritten labels
- Red marker quantities
- Tape holding cards
- Supply checklist

### Investigation Screen (Field Scanner)
**Layout**:
```
┌─────────────────────┐
│ [Sticky: Heading]   │
│                     │
│    ┌─────────┐      │
│    │ RADAR   │      │
│    │  ⚫ 👻   │      │
│    └─────────┘      │
│                     │
│ [Paper: EMF 5.0]    │
│                     │
│ [Tools: 📡📊🌡️]     │
└─────────────────────┘
```

**Elements**:
- Digital radar (keep functional)
- Paper frame overlay
- Sticky notes for readings
- Handwritten annotations
- Tape on corners
- VHS static effects
- Polaroid evidence snapshots

---

## 🔥 Key Principles

### 1. Authentic Chaos
- Nothing perfectly aligned
- Random rotations (-7° to +7°)
- Varied damage on each element
- Natural imperfection

### 2. Layered Depth
- Multiple texture overlays
- Dual shadows for lift
- Overlapping elements
- Z-index hierarchy

### 3. Functional First
- Horror aesthetic never blocks functionality
- Touch targets remain clear
- Text remains readable
- Navigation stays intuitive

### 4. Performance Conscious
- Optimize images
- Use CSS where possible
- Lazy load textures
- Limit animations

### 5. Mobile Optimized
- Larger touch targets
- Readable text sizes
- Simplified layouts
- Fast loading

---

## 📊 Success Metrics

### Visual Quality
- ✅ Matches the 3 horror guide pages
- ✅ Authentic analog horror feel
- ✅ No "cute detective" vibes
- ✅ AAA indie horror quality

### Usability
- ✅ All features remain accessible
- ✅ Text is readable
- ✅ Navigation is clear
- ✅ Touch targets are adequate

### Performance
- ✅ Fast load times
- ✅ Smooth scrolling
- ✅ No jank or lag
- ✅ Works on mid-range phones

---

## 🚀 Let's Build!

Starting with:
1. **Reusable components** - Foundation
2. **Profile Screen** - Your inspiration reference
3. **Map Screen** - Aged paper aesthetic
4. **Codex Screen** - Field journal
5. **Inventory Screen** - Equipment locker
6. **Investigation Screen** - Analog overlay

**Goal**: Every screen feels like it came from the same haunted investigation case file! 🔥👻

---

**Status**: Ready to implement!
**Vision**: Your 3 horror guides applied everywhere!
**Quality**: AAA indie horror across the entire app!
