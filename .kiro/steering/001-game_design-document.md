# Ghost Hunt – Game Design Document (GDD)
## Steering Document — High-Level Vision

---

## 1. High Concept

**Ghost Hunt** is a real-world paranormal investigation simulator, blending the atmospheric ghost-behavior deduction of **Demonologist** with the real-world exploration of **Pokémon Go**. Players physically walk in the real world to collect ghost-hunting tools, locate haunted hotspots, and investigate unpredictable supernatural activity using a radar-based interface.

**The core fantasy:**
> "You are a real ghost hunter in the real world."

---

## 2. Core Gameplay Loop

This loop reflects the true intended flow:

### 1. Explore IRL
- Walk around the real world
- The map shows tool spawn nodes
- Collect tools (EMF, Audio, Thermal, Camera Battery, etc.)
- Backpack fills up

### 2. Find a Haunted Hotspot
- Hotspots appear as large markers on the map
- Walk close enough to activate them
- **Tools are optional, not required**

### 3. Enter Investigation Mode
- Map disappears
- Full-screen **Paranormal Radar** interface appears
- Tools appear as buttons
- Ghost behavior begins immediately

### 4. Use Tools to Interpret Ghost Behavior

**Tools do not generate clues.**
**Tools reveal or enhance the visibility of the ghost's natural behavior.**

Ghost behavior examples:
- EMF spikes
- Cold bursts
- Audio whispers
- Motion anomalies
- Static distortions
- Camera manifestations
- Sanity drain changes

### 5. Interpret the Ghost's Behavior Pattern

Ghosts have personality-based behavior tendencies:
- high EMF
- frequent whispers
- weak motion
- negative temperature
- camera anomalies
- fast/slow sanity drain
- aggressive/patient behavior
- random "fake" anomalies

**Tools make reading these easier, but the ghost always behaves.**

### 6. Deduction

After witnessing enough behavior:
- "Identify the Ghost" becomes available
- Choose 1 of 3 possible ghost archetypes
- Deduce based on **behavior pattern** > "collect X clues"

### 7. Ritual

Simple MVP ritual:
- **Long press to banish** OR
- **Tap sequence to bind**

### 8. Outcome

- **Success** → XP, rewards, ghost added to Codex
- **Failure** → ghost escapes, sanity penalty

### 9. Repeat

- Collect tools
- Explore new hotspots
- Encounter higher-tier ghosts
- Expand your Codex

**This loop captures Demonologist-style behavior deduction AND real-world exploration.**

---

## 3. Game Pillars

### 3.1 Real-World Exploration

Players must walk IRL to:
- collect tools
- find hotspots
- track ghost proximity
- escape danger (future)

### 3.2 Paranormal Tools

**Tools enhance detection, NOT enable it.**

Tools include:
- EMF Meter
- Thermal Scanner
- Audio Receiver / Spirit Box
- Camera (Flash + IR Mode)
- Motion Sensor
- Static Detector

**Tools reveal ghost reactions more clearly.**

### 3.3 Behavioral Evidence (Not "Collect 3 Clues")

Ghost identity emerges from:
- frequency of EMF spikes
- whisper intensity
- cold anomaly consistency
- camera silhouette probability
- sanity drain pattern
- movement tendencies
- radar signature

**Not fixed clue sets.**

### 3.4 Fear Through Uncertainty

- Unpredictable spikes
- Whispers that appear randomly
- Sudden static
- Camera silhouettes
- Atmosphere-focused visuals
- Occasional false signals (later phase)

---

## 4. Map Mode (Exploration)

**This is the root screen.**

### Features:
- Dark-styled Leaflet map
- Player marker
- Tool nodes to collect
- Hotspots to investigate
- Backpack (Inventory + Codex)
- Profile + XP bar
- Clippy ghost assistant
- Dev Mode teleport + simulated movement
- Tap-to-collect UI
- Range circle + highlight for in-range tools

### Purpose:
To prepare for investigations and explore the world.
**Tools are suggestions, not requirements.**

---

## 5. Investigation Mode – Radar System

### 5.1 Overview

Upon entering a hotspot:
- Swap to full-screen paranormal radar
- Player is fixed at center
- Radar sweeps, pulses, and displays anomalies
- Ghost moves semi-randomly
- Tools show interactive buttons
- Behavioral events occur in real-time

### 5.2 Radar Features

- Circular radar with expanding rings
- Ghost blip
- Motion blur effects
- Noise distortion overlay
- Anomaly icons (EMF, Cold, Motion, Static)
- Sanity meter on UI
- "Event log" panel (optional MVP)

### 5.3 Tool Behaviors (Simplified MVP)

#### EMF Meter
- EMF bar increases near ghost
- Occasional spikes even when far (noise)

#### Thermal Scanner
- Cold spots appear as blue pulses
- "Thermal anomaly detected" toasts

#### Audio Receiver
- Random whisper SFX
- Subtitle ghost phrases
- Audio static pulses

#### Camera

**Flash Photo**
- Screen flashes
- 1-second processing
- Photo reveals:
  - nothing
  - faint silhouette
  - noise glitch
  - shadow figure

**IR Mode**
- Red/blue overlay
- Cold silhouettes possible

#### Motion Sensor
- Ghost movement spikes show as larger radar pulses

#### Static Detector
- Radar glitch effect
- Sudden distortion

---

## 6. Ghost Behavior & Deduction

### 6.1 MVP Ghost Archetypes

For MVP, include 3 archetypes:

#### Wraith
- Strong EMF
- Fast movement
- Low whisper frequency
- Rare camera silhouette
- Fast sanity drain

#### Shade
- Frequent whispers
- Cold spot heavy
- Passive movement
- Rare EMF
- Slow sanity drain

#### Poltergeist
- Motion spikes
- Static distortions
- Camera distortion common
- No cold spots
- Medium sanity drain

### 6.2 Deduction Logic

Deduction is based on:
- which anomalies appear most
- the "feel" of the ghost
- which tool reactions dominate
- sanity pattern
- silhouette frequency

**Not just checkboxes.**

---

## 7. Ritual

Simple MVP ritual:
- **Hold to charge** or
- **Tap sequence** or
- **Draw a simple sigil** (future)

### Outcome:
- **Success** → ghost added to Codex
- **Failure** → ghost escapes

---

## 8. Codex

The Codex logs:
- Ghost name
- Appearance silhouette
- Behavior tendencies
- Encounter history
- Difficulty

**Locked ghosts show silhouette only.**

---

## 9. Progression

### MVP progression:
- Player XP
- Ghost Codex expansion
- Unlocking harder hotspots
- Unlocking rarer tool spawns

### Future:
- More ghost types
- Tool upgrades
- Ritual items
- Multiplayer
- Hostile hunts

---

## 10. Dev Mode Requirements

To support fast testing:
- Tap-to-teleport
- Simulated ghost movement
- Simulated EMF/audio/thermal events
- Unlimited tool usage
- Ghost type override
- Event logs

**Dev Mode ensures full testing without leaving home.**

---

## 11. Visual Direction

- Navy/black background
- Neon teal/cyan radar
- Pulses, rings, glows
- Analog paranormal equipment aesthetics
- Noise/grain filters
- Camera flash effects
- Subtle UI animations

---

## 12. MVP Scope Summary

The MVP should include:
- Map exploration
- Tool collection (optional)
- Hotspot entry
- Radar investigation
- Basic tool reactions
- Simplified ghost archetypes
- Behavior-based deduction
- Ritual
- XP + Codex entry
- Dev Mode
