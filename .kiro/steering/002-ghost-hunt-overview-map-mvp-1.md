# Ghost Hunt – Project Overview

## One-Line Pitch
A Pokémon Go–style paranormal investigation game where players walk around, collect ghost-hunting tools, unlock haunted hotspots, and solve ghost cases.

## Core Loop
1. Open map → explore IRL.
2. Collect paranormal tools (spawn nodes).
3. Unlock a Case at a nearby hotspot.
4. Enter Investigation Mode.
5. Use tools to gather 3–5 clues.
6. Clues point to 1 of multiple ghost types.
7. Player selects the correct ghost identity.
8. Perform ritual to bind or banish.
9. Earn rewards + add ghost to Codex.
10. Use currency to unlock harder locations.
11. Repeat.

## Product Philosophy
- **Map-first**: The map is the main screen, always.
- **Mobile-first**: Comfortable to use one-handed while walking.
- **Playable from home**: Dev Mode must let us test everything without leaving the house.
- **Vibes > stats**: Ghost identity, mood, and atmosphere matter more than raw numbers.

## Tech / Architecture (draft)
- Platform: (fill in: e.g. React Native + Expo, Unity, etc.)
- Maps: (e.g. Google Maps SDK / Mapbox / Unity Maps)
- Location:
  - Normal mode: GPS.
  - Dev Mode: simulated movement (joystick or tap-to-teleport).
- Everything in early specs must be testable in Dev Mode.

## UI Principles
- Map is the **root** view.
- Bottom HUD mimics Pokémon Go:
  - Bottom-left: profile icon + XP bar.
  - Bottom-center: backpack → expands to Items + Codex.
  - Bottom-right: Clippy-like ghost assistant icon.
- Investigation view comes later; for now we’re building the shell.
