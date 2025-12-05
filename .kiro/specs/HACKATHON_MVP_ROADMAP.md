# 🎯 Hackathon MVP Roadmap

## Overview

This document outlines the 4-phase spec approach to build the Investigation Mode MVP for the hackathon. Each spec builds on the previous one, creating a complete ghost-hunting experience.

---

## 📋 Phase Breakdown

### ✅ Spec 014: Ghost Data & Codex System
**Status**: Requirements Complete
**Timeline**: Start immediately
**Dependencies**: None

**What it does**:
- Creates data structure for all 7 ghost types
- Implements Codex UI with locked/unlocked states
- Writes atmospheric journal entries with subtle hints
- Validates deduction overlap (no single-trait identification)
- Provides Ghost Behavior API for tools

**Deliverables**:
- Ghost data store with all 7 profiles
- Codex screen with analog horror styling
- Journal entries for each ghost
- Type-safe ghost data interfaces

**Why first**: Foundation for everything else. Tools need ghost data to function.

---

### 🔄 Spec 015: Investigation Tools & Ghost Interaction (Dev Mode)
**Status**: Not started
**Timeline**: After 014 complete
**Dependencies**: Spec 014

**What it does**:
- Implements Radar tool (direction-only, ±5° wobble)
- Implements EMF Meter (distance + personality noise)
- Implements Camera (7s cooldown, manifestation types)
- Implements Spirit Box (dual-knob tuning, word system)
- Implements Thermal Scanner (3 temperature states)
- Uses **Dev Mode** for testing (simulated ghost position, no GPS)
- Creates tool-switching UI during investigation
- Implements Evidence Tab for collected clues

**Deliverables**:
- All 5 investigation tools functional
- Dev Mode controls (set ghost position, type, distance)
- Tool drawer with tab system
- Evidence logging system
- 7-second camera cooldown mechanic

**Why second**: Core gameplay loop. Players need tools to gather evidence.

---

### 📍 Spec 016: GPS-Based Ghost Positioning & Radar Navigation
**Status**: Not started
**Timeline**: After 015 complete
**Dependencies**: Spec 015

**What it does**:
- Integrates real GPS for player position
- Calculates ghost bearing (0-360°) relative to player heading
- Calculates distance between player and ghost
- Updates Radar to show real direction to ghost
- Updates EMF to show real distance to ghost
- Implements compass heading (device orientation)
- Creates hotspot entry system (walk to location to start investigation)

**Deliverables**:
- GPS integration for player position
- Bearing calculation (player → ghost)
- Distance calculation (player ↔ ghost)
- Device compass integration
- Hotspot proximity detection
- Real-world investigation mode

**Why third**: Brings investigation into the real world. This is the "Pokémon Go" moment.

---

### 🗺️ Spec 017: Overworld GPS Movement & Hotspot Discovery
**Status**: Not started
**Timeline**: After 016 complete
**Dependencies**: Spec 016

**What it does**:
- Implements real-time GPS tracking on map
- Shows player marker moving as you walk IRL
- Places hotspot markers on map (haunted locations)
- Implements proximity detection (walk close to enter)
- Creates supply node spawning (film, boosts, charms)
- Implements tap-to-collect for supplies
- Adds "Enter Investigation" button when in range

**Deliverables**:
- Live GPS map with player tracking
- Hotspot markers with proximity detection
- Supply node spawning and collection
- Smooth map updates as player moves
- Investigation entry flow from map

**Why fourth**: Completes the exploration loop. Now it's a full location-based game.

---

## 🎮 MVP Feature Checklist

After all 4 specs are complete, you'll have:

### Core Gameplay
- [x] 7 unique ghost types with distinct behaviors
- [x] 5 investigation tools (Radar, EMF, Camera, Spirit Box, Thermal)
- [x] Evidence-based deduction system
- [x] Codex with journal entries
- [x] Real-world GPS exploration
- [x] Hotspot discovery and investigation

### Investigation Loop
- [x] Walk to hotspot in real world
- [x] Enter investigation mode
- [x] Use Radar to find direction
- [x] Use EMF to confirm distance
- [x] Take photos when close (7s cooldown)
- [x] Use Spirit Box and Thermal for additional clues
- [x] Review evidence in Evidence Tab
- [x] Make deduction (select ghost type)
- [x] Unlock ghost in Codex

### Technical Features
- [x] GPS integration
- [x] Device compass/heading
- [x] Distance and bearing calculations
- [x] Dev Mode for testing without GPS
- [x] Analog horror UI styling
- [x] Type-safe ghost data system

---

## 🚀 Post-MVP Extensions (If Time Permits)

### Nice-to-Have Features
- Ritual system (banish/bind ghost)
- XP and leveling
- Multiple difficulty tiers
- Ghost movement (non-static)
- Sanity drain mechanics
- Multiplayer investigations
- More ghost types (expand beyond 7)
- Tool upgrades
- Rare artifacts

### Polish
- Sound effects for tools
- Haptic feedback
- Animation polish
- Tutorial system
- Achievement system

---

## 📊 Estimated Timeline

| Spec | Estimated Time | Priority |
|------|----------------|----------|
| 014: Ghost Data & Codex | 2-3 days | CRITICAL |
| 015: Tools & Interaction | 3-4 days | CRITICAL |
| 016: GPS Positioning | 2-3 days | CRITICAL |
| 017: Overworld Movement | 2-3 days | CRITICAL |

**Total MVP**: ~9-13 days

**Buffer for polish/bugs**: 2-3 days

**Hackathon-ready**: ~12-16 days

---

## 🎯 Success Criteria

The MVP is complete when:
1. ✅ Player can walk around IRL and see their position on map
2. ✅ Player can discover hotspots by walking close to them
3. ✅ Player can enter investigation mode at a hotspot
4. ✅ Player can use all 5 tools to gather evidence
5. ✅ Player can deduce ghost type from overlapping clues
6. ✅ Player can view unlocked ghosts in Codex
7. ✅ All 7 ghost types are implemented and testable

---

## 📝 Next Steps

1. **Review Spec 014 requirements** (already created)
2. **Approve or request changes** to requirements
3. **Move to design phase** for Spec 014
4. **Create tasks** for Spec 014
5. **Begin implementation** of ghost data system
6. **Repeat for Specs 015, 016, 017**

---

**Status**: Roadmap Complete
**Last Updated**: 2024
**Target**: Hackathon MVP
