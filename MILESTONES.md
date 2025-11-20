# Ghost Hunt - Development Milestones

This document tracks the major development milestones for the Ghost Hunt project.

## Branch Structure

### `003-investigation-mode-mvp` (Current)
**Completed**: Investigation Mode MVP
- Full-screen radar interface with sweeping animation
- Ghost behavior engine with 3 ghost types (Wraith, Shade, Poltergeist)
- 5 interactive paranormal tools (EMF, Thermal, Audio, Camera, Static)
- Sanity system with color-coded drain
- Radar sweep detection system
- Mobile-first deduction UI
- Result screen with success/failure feedback

**Features**:
- Radar-based ghost hunting
- Real-time anomaly generation
- Tool-based evidence gathering
- Ghost identification mini-game
- Atmospheric neon aesthetic

**Tech Stack**:
- React + TypeScript + Vite
- Leaflet for mapping
- HTML5 Canvas for radar
- React Context for state management

---

## Milestone History

### 001 - World Map MVP
**Status**: Integrated into main (no separate branch)
**Features**:
- Leaflet map integration
- Player marker with GPS tracking
- Tool spawn nodes
- Hotspot markers
- Basic collection mechanics
- Dev Mode for testing

### 002 - World Map Polish
**Status**: Integrated into main (no separate branch)
**Features**:
- Dark theme with custom tiles
- Glassmorphic HUD design
- Profile button with XP bar
- Backpack menu (Inventory + Codex)
- Clippy assistant icon
- Collection radius visualization
- Improved mobile UX

### 003 - Investigation Mode MVP ✅
**Status**: Branch created (`003-investigation-mode-mvp`)
**Features**: See above

### 004 - [Next Milestone]
**Status**: Upcoming
**Planned Features**: TBD

---

## For Blog Posts

Each milestone can be showcased separately:

**Milestone 001**: "Building a Pokémon Go-style Map with React & Leaflet"
- Map setup, markers, GPS tracking, collection mechanics

**Milestone 002**: "Polishing the Ghost Hunt Map Experience"
- Dark theme, HUD design, mobile-first UX

**Milestone 003**: "Creating an Atmospheric Radar-Based Investigation System"
- Canvas animations, ghost AI, tool interactions, deduction gameplay

---

## How to View Each Milestone

```bash
# View Investigation Mode MVP
git checkout 003-investigation-mode-mvp

# Return to latest
git checkout main
```

---

## Notes

- Milestones 001 and 002 were developed iteratively and are part of the main branch history
- Milestone 003 has a dedicated branch for easy reference
- Future milestones (004+) will have dedicated branches from the start
