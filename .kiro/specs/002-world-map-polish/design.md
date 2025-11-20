# World Map Polish – Design

## 1. Tile Layer Styling

### Selected Style

Use a **dark, minimalist tile provider** such as:
- **Carto Dark Matter** (recommended)
- Stadia Dark
- MapTiler Dark Vector raster tiles (with attribution)

### Visual Goals

- **Low detail** (roads + water + shapes only)
- **Minimal colors** (dark navy, desaturated grey)
- **No bright POIs** or labels distracting from game UI
- Provides a **"night exploration" atmosphere**

---

## 2. Full-Screen Overlay

### Purpose

Give the map a game feel, improve contrast for HUD, reduce visual noise.

### Overlay Composition

**Two layers:**

1. **Radial gradient from center** (slight vignette)
   - Dark edges, lighter center
   
2. **Vertical bottom-up gradient**
   - Darkens lower portion behind HUD
   - Adds cinematic depth

### Technical Requirements

- `pointer-events: none`
- Sit above the map, below HUD (z-index: 400)

---

## 3. HUD Container

### Goal

Make bottom UI appear like a **single cohesive bar** rather than floating icons.

### Layout

- **Full-width container** at the bottom
- Icons arranged:
  - **Profile** (left)
  - **Backpack** (center, slightly elevated)
  - **Clippy** (right)

### Visual Style

- **Glassmorphism** or soft dark "pill"
- Slight blur or translucent background
- Soft inner border or glow
- **56–64px circular buttons**

### Interaction

**Tap feedback:**
- Scale down to 0.95 for 120ms

**Backpack expansion:**
- Smooth fade + scale for the Items/Codex buttons

---

## 4. Attribution Styling

### Rules

- Must remain **visible** (legal requirement)

### Styling

- **Font-size:** 10–12px
- **Background:** `rgba(0, 0, 0, 0.5)`
- **Shape:** Rounded pill
- **Position:** Slightly above HUD

**Purpose:** Keep legality while not breaking immersion.

---

## 5. UI Feedback / Microinteractions

### Tool Collection

**Marker behavior:**
- Shrinks + fades out

**Toast notification:**
- Text: "+1 EMF Reader Added"
- Styled with:
  - Dark translucent depth
  - Soft animation
  - Auto-dismiss 1.2s

### Backpack

**Expand radial menu:**
- Items button (left)
- Codex button (right)
- **Animation:** opacity + translateY + scale

### Clippy Tooltip

**Tooltip bubble:**
- Soft pop-in
- Dark background
- Rounded bubble
- Auto-dismiss after 3s

---

## 6. Color & Vibe Guide

### Primary Palette

- **Deep navy:** `#0b0f1a`
- **Desaturated blue-gray:** `#1e293b`
- **Teal/ghost glow:** `#2dd4bf`
- **Purple accents:** `#a78bfa`
- **Soft neutral white:** `#f1f5f9` (for icons)

### Atmosphere Vibe

- Night exploration
- Soft haze
- Slight neon ghost glow
