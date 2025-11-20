# 🕵️ Investigation Mode MVP — Requirements

## Goal

Create a **radar-based paranormal investigation interface** where the player uses tools to observe ghost behavior, collect enough behavioral evidence, deduce the ghost type, and complete a ritual.

**Tools enhance detection, but ghost behavior always happens.**

This MVP focuses on:
- Radar UI
- Ghost movement + behavior loop
- Tool interactions
- Behavior-based deduction
- Ritual screen

**No jumpscares, no high-end graphics — atmospheric, minimal, functional.**

---

## User Stories

### Entering Investigation Mode

- As a player, I want to **walk into a hotspot in Map Mode** so the investigation begins
- As a player, I want the **map to disappear** and transition into a ghost-hunting radar screen

### Radar + Movement

- As a player, I want to see **myself at the center of the radar**
- As a player, I want to see a **ghost "blip" moving** on the radar
- As a player, I want the **radar to sweep/pulse** periodically

### Tool Usage

- As a player, I want to **tap tools** (EMF, Thermal, Audio, Camera, Static) during the investigation
- Tools should **amplify specific paranormal behaviors** (e.g., cold spots, whispers, silhouettes)

### Ghost Behavior

As a player, I want the ghost to produce:
- **EMF spikes**
- **Cold anomalies**
- **Motion spikes**
- **Camera manifestations**
- **Audio whispers**
- **Static glitches**
- **Sanity effects** (simple bar drain)

### Deduction

- As a player, I want a **"Deduce Ghost" button** to appear once enough behavior has occurred
- As a player, I want to **choose 1 of 3 ghost archetypes**

### Ritual

- As a player, I want to perform a **simple banish/bind ritual** (hold or tap sequence)
- As a player, I want a **clear success or failure result**

### Exit

- As a player, I want to **return to the Map** after the investigation is over

### Dev Mode

As a developer, I want to simulate all behaviors:
- Ghost type override
- Trigger EMF/Cold/Whispers manually
- Freeze ghost
- Auto-complete deduction

**So I can test everything without leaving home.**
