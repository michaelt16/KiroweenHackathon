# 🎮 Horror Screens - Complete Set

## Overview

All main game screens now have horror-styled versions matching the analog detective/supernatural contamination aesthetic!

---

## ✅ Completed Screens

### 🪪 **Profile / Agent ID**
**Component**: `ProfileHorrorID.tsx`

**Features**:
- Cork board background
- Central ID card with agent info
- Level & XP progress bar
- Stats grid (investigations, ghosts caught, success rate, sanity)
- Pinned sticky notes and photos
- Push pins and tape details
- Damage effects (water stains)

**View**: Click "🪪 ID (CSS)" in UI Playground

---

### 🗺️ **Map Screen**
**Component**: `MapHorror.tsx`

**Features**:
- Cork board background with texture
- Pinned location cards with status badges
- Hotspot cards with:
  - Status (Active, Available, Locked, Completed)
  - Threat level indicators
  - Distance from player
  - Type (Mansion, Industrial, etc.)
- Supply collection cards (Film, Boosts, Charms)
- Legend for status indicators
- Push pins on all cards
- Damage overlays and rotation

**View**: Click "🗺️ Map" in UI Playground

---

### 📖 **Codex Screen**
**Component**: `CodexHorror.tsx`

**Features**:
- Leather journal aesthetic
- Two-column layout:
  - **Left**: Ghost list with encounter counts
  - **Right**: Detailed ghost entry
- Ghost details include:
  - Name and threat level
  - Polaroid photo
  - Description
  - Evidence types (badges)
  - Behavior patterns
  - Weaknesses
  - Handwritten field notes
- Locked ghosts show "???" until discovered
- Progress tracker
- Coffee stain damage effects
- Ruled paper lines

**View**: Click "📖 Codex" in UI Playground

---

### 🔍 **Investigation Screen**
**Component**: `InvestigationHorror.tsx`

**Features**:
- Dark, atmospheric background
- Top status bar with:
  - Location name
  - Sanity meter (color-coded)
  - Investigation timer
- **Left side**: Radar display
  - Circular radar with rings
  - Ghost blip (pulsing red dot)
  - Compass directions
  - Distance indicator
  - Tool buttons (Radar, EMF, Thermal, Audio, Camera)
- **Right side**: Field kit drawer
  - Evidence checklist with checkboxes
  - Photo gallery (Polaroid style)
  - Film counter
  - Action buttons (Identify Ghost, Abandon)
- Vignette effect for atmosphere
- Glowing effects on active tools

**View**: Click "🔍 Investigation" in UI Playground

---

## 🎨 Shared Design Elements

### Color Palette
- **Cork/Wood**: `#3d2f24`, `#2d2419`
- **Paper**: `#f4f0e6`, `#faf8f3`
- **Borders**: `#8B4513` (saddle brown)
- **Text**: `#2d1810` (dark brown)
- **Accents**: `#dc2626` (red), `#2dd4bf` (cyan)
- **Damage**: `rgba(139, 69, 19, 0.2)` (brown stains)

### Typography
- **Main Font**: Courier New (typewriter)
- **Sizes**: 10px-28px depending on hierarchy
- **Weights**: Normal, bold
- **Spacing**: Uppercase headers with letter-spacing

### Effects
- **Push pins**: Red circular pins with rotation
- **Tape**: Semi-transparent with grid pattern
- **Damage**: Water stains, coffee rings, burn marks
- **Rotation**: Slight tilts (0.3deg - 2deg) for authenticity
- **Shadows**: Multiple layers for depth
- **Ruled lines**: Horizontal lines on paper

---

## 🎮 How to View All Screens

1. Navigate to `/ui-playground` in your app
2. Look for the **Horror section** (red buttons)
3. Click any of these buttons:
   - 🪪 **ID (CSS)** - Agent profile
   - 🗺️ **Map** - Location overview
   - 📖 **Codex** - Ghost encyclopedia
   - 🔍 **Investigation** - Active hunt

---

## 📦 Assets Used

All screens use **CSS-only** effects (no texture images needed):
- Cork texture: CSS gradients + noise SVG
- Paper texture: Gradients + ruled lines
- Tape: Semi-transparent with pattern
- Damage: Radial gradients with blur
- Push pins: CSS shapes with shadows

**Benefits**:
- Fast loading
- No image dependencies
- Easy to customize
- Consistent across screens

---

## 🔄 Integration Notes

### State Management
Currently all screens use **mock data**. To integrate:

```typescript
// Example for Map
const locations = useGameStore(state => state.locations);
const supplies = useSuppliesStore(state => state.supplies);

// Example for Codex
const ghosts = useCodexStore(state => state.ghosts);
const selectedGhost = useCodexStore(state => state.selectedGhost);

// Example for Investigation
const evidence = useInvestigationStore(state => state.evidence);
const sanity = usePlayerStore(state => state.sanity);
```

### Navigation
Add to your router:

```typescript
<Route path="/profile" element={<ProfileHorrorID />} />
<Route path="/map" element={<MapHorror />} />
<Route path="/codex" element={<CodexHorror />} />
<Route path="/investigation" element={<InvestigationHorror />} />
```

---

## 🚀 Next Steps

### Phase 1: Polish
- [ ] Add hover effects
- [ ] Smooth transitions between screens
- [ ] Loading states
- [ ] Empty states (no supplies, no photos, etc.)

### Phase 2: Interactivity
- [ ] Click handlers for all buttons
- [ ] Modal overlays for details
- [ ] Swipe gestures for mobile
- [ ] Animations (page turns, photo development)

### Phase 3: Dynamic Content
- [ ] Connect to real game state
- [ ] Real-time updates
- [ ] Persistence
- [ ] Sync across screens

### Phase 4: Advanced Features
- [ ] Custom agent photos
- [ ] Achievement badges
- [ ] Multiplayer elements
- [ ] Social features

---

## 📱 Mobile Optimization

All screens are **mobile-ready**:
- Responsive layouts
- Touch-friendly tap targets (44px minimum)
- Readable font sizes (11px+)
- High contrast text
- Grid layouts that adapt
- Scrollable content areas

---

## 🎯 Design Philosophy

These screens follow the **"Analog Horror Detective"** aesthetic:

✅ **What We Have**:
- Authentic damage and wear
- Physical elements (pins, tape, paper)
- Typewriter fonts
- Cork board / journal aesthetics
- Supernatural contamination hints
- High contrast for readability
- Professional investigator vibe

❌ **What We Avoid**:
- Overly clean/sterile UI
- Generic mobile app look
- Bright, cheerful colors
- Flat, minimalist design
- Comic sans or playful fonts

---

## 🎨 Customization Guide

### Change Colors
```typescript
// Find and replace these values:
'#3d2f24' // Cork background
'#f4f0e6' // Paper color
'#8B4513' // Border color
'#dc2626' // Red accents
```

### Adjust Damage
```typescript
// Increase/decrease opacity:
backgroundColor: 'rgba(139, 69, 19, 0.2)' // 0.2 = subtle, 0.5 = heavy
filter: 'blur(2px)' // 2px = soft, 5px = heavy blur
```

### Modify Rotation
```typescript
// Make more/less tilted:
transform: 'rotate(0.5deg)' // 0.5 = subtle, 2deg = noticeable
```

---

**Status**: ✅ All Core Screens Complete
**Last Updated**: 2024
**Ready for**: Integration & Testing
