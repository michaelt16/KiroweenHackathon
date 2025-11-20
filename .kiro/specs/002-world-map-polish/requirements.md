# World Map Polish – Requirements

## Purpose

Enhance the visual presentation of the World Map screen so it looks like a **cohesive, game-quality experience** rather than a raw Leaflet map with floating icons. This includes map stylization, HUD design, overlays, attribution cleanup, and subtle animations.

---

## Functional Requirements

### 1. Custom Tile Style

**Objective:** Replace default Leaflet tiles with a dark, stylized tile provider.

**Requirements:**
- Must support mobile zoom levels (up to ~18)
- Must include proper attribution
- Dark, minimalist aesthetic for night exploration vibe

### 2. Map Overlay System

**Objective:** Add full-screen gradient overlays for atmosphere.

**Requirements:**
- Overlays must:
  - Improve HUD readability
  - Add mood/atmosphere (spooky/night vibes)
  - **Not block map interactions** (pointer-events: none)

### 3. HUD Container Styling

**Objective:** Profile, Backpack, and Clippy icons must be placed inside a cohesive HUD layout.

**Requirements:**
- Be centered or bottom-aligned
- Use consistent icon sizing (mobile-friendly, 44px+ tap targets)
- Avoid looking like unstyled PNGs
- Glassmorphism or translucent bar design

### 4. Attribution Styling

**Objective:** Keep attribution visible (legally required) but styled minimally.

**Requirements:**
- Smaller font (10-12px)
- Dark translucent background
- Shift above HUD to avoid overlapping
- Rounded pill shape

### 5. UI Animations

**Objective:** Add small polish animations for feedback.

**Requirements:**
- Tool collection feedback (fade out / pop animation / toast)
- Backpack open/close scale & fade transitions
- HUD button tap scaling
- Clippy tooltip animation

---

## Performance Requirements

- Overlay must **not noticeably reduce FPS** on mobile
- Tile loading must remain smooth
- No layout shifts during map movement

---

## Non-Functional Requirements

- Must remain **fully compatible** with current world-map-mvp implementation
- **No breaking changes** to teleport, markers, or HUD logic
- Visual changes only, no functional changes unless explicitly stated
