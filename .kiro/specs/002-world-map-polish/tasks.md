# World Map Polish – Tasks

## Part 1: Visual Polish & Atmosphere

### Phase 1 – Tile Layer Update

- [ ] Replace default Leaflet tile layer with chosen dark tile provider
- [ ] Update attribution config to ensure proper display
- [ ] Verify mobile zoom and smooth panning

### Phase 2 – Gradient Overlay

- [ ] Add radial + vertical gradient overlay div
- [ ] Ensure overlay does not block map interaction
- [ ] Tune opacity + blending for correct mood

### Phase 3 – HUD Container

- [ ] Wrap profile/backpack/clippy into a HUD container
- [ ] Apply consistent circular button styles
- [ ] Add center elevation for backpack button
- [ ] Ensure tap targets are at least 44px

### Phase 4 – Attribution Styling

- [ ] Override Leaflet attribution CSS
- [ ] Move attribution above HUD with margin adjustments
- [ ] Reduce font and add translucent background

### Phase 5 – UI Animations

- [ ] Implement marker shrink/fade on collection
- [ ] Create toast system (lightweight)
- [ ] Animate backpack open/close
- [ ] Add button tap scale animation
- [ ] Add Clippy tooltip animation

### Phase 6 – Polish QA

- [ ] Test on mobile Safari + Android Chrome
- [ ] Verify that attribution remains visible/legal
- [ ] Confirm CPU/GPU load acceptable
- [ ] Ensure HUD doesn't overlap important map elements

---

## Part 2: UX Improvements & Icon System

### Task 1: Add Visible Collection Radius Around Player

**Goal:** From one glance, you should know if you're in range of a tool.

**Implementation:**
- [ ] Draw a translucent circle centered on the player with radius = `COLLECTION_RADIUS` (50 meters)
- [ ] Style circle with soft teal or purple edge, low fill opacity
- [ ] Make circle move with player as they teleport
- [ ] Highlight tools inside the circle (brighter / glowing / pulsing)
- [ ] Dim tools outside the circle (neutral appearance)

**Visual Requirements:**
- Circle: `#2dd4bf` (teal) with 0.1 fill opacity, 0.6 stroke opacity
- In-range tools: Add glow effect + pulse animation
- Out-of-range tools: Reduce opacity to 0.6

---

### Task 2: Replace Emojis with Consistent Icon System

**Goal:** Create a cohesive, professional look with consistent markers.

#### 2.1 Player Marker
- [ ] Replace default Leaflet pin with a glowing circle
  - Inner circle (solid color)
  - Outer ring (glow effect)
  - Colors: Teal or purple gradient

#### 2.2 Tool Markers
- [ ] Use colored circular markers with symbols
  - **EMF:** Green circle
  - **Spirit Box:** Purple circle
  - **Thermal Cam:** Blue circle
  - **Salt:** Yellow/white circle
- [ ] Add consistent glow style to all markers
- [ ] Ensure all markers are same size (30-40px)

#### 2.3 Hotspot Markers
- [ ] Create larger circular marker (40-50px)
- [ ] Add ring around it
- [ ] Add small symbol in the middle (skull or portal)
- [ ] Use ghost glow color (`#a78bfa`)

#### 2.4 HUD Icons
- [ ] Pick one icon library (Lucide, Tabler, Phosphor, or Heroicons)
- [ ] Replace emoji icons in HUD with SVG icons
- [ ] Ensure consistent sizing across all HUD elements

**Asset Strategy:**
- **Phase 1 (Now):** Use CSS circles + simple SVG icons
- **Phase 2 (Weekend):** Optionally upgrade to 2D game assets from itch.io or Kenney.nl
- **Principle:** Clean + consistent > fancy but mismatched

---

### Task 3: Enhance HUD Bar Design

**Goal:** Make the HUD feel like a real "bar", not floating stuff.

**Implementation:**
- [ ] Ensure all three buttons (Profile, Backpack, Clippy) are the same size
- [ ] Apply same border, shadow, and hover/tap effect to all buttons
- [ ] Make backpack slightly "popped up" (elevated) as the main CTA
- [ ] Use consistent spacing and alignment
- [ ] Ensure labels (Items, Codex) use one font and size pattern

**Visual Requirements:**
- Button size: 56-64px diameter
- Consistent border: `1px solid rgba(255, 255, 255, 0.1)`
- Consistent shadow: `0 4px 12px rgba(0, 0, 0, 0.3)`
- Hover scale: `1.1`
- Tap scale: `0.95`

---



## Success Criteria

**Part 1 Complete When:**
- ✅ Dark map theme applied
- ✅ Atmospheric gradient overlay visible
- ✅ HUD in cohesive glassmorphic container
- ✅ Attribution styled and positioned correctly
- ✅ Smooth animations on all interactions

**Part 2 Complete When:**
- ✅ Collection radius visible and functional
- ✅ All markers use consistent icon system (no emojis)
- ✅ Clear visual feedback for in/out of range
- ✅ HUD feels like a unified design element
- ✅ Professional, game-quality appearance
