# World Map MVP – Requirements

## Goal
Implement the primary game shell:
- Map-centered main view.
- Basic Dev Mode so you can move without leaving your house.
- Simple interactions:
  - See nearby tools and hotspots on the map.
  - Collect tools into an inventory.
  - Open Inventory and Codex via the backpack.
  - See a Clippy-like ghost assistant icon.

No investigation gameplay yet.

## User Stories

### Map + Player
- As a player, I want to see a map centered on my position so I feel like I’m exploring my area.
- As a player, I want to see my avatar marker on the map.

### Dev Mode (At-Home Testing)
- As a developer, I want a Dev Mode toggle so I can move my avatar without GPS.
- In Dev Mode, I can move by either:
  - Tap-to-teleport on the map, or
  - A simple joystick (pick one for MVP).

### Tools (Collectible Nodes)
- As a player, I want to see tool icons around me on the map.
- As a player, when I tap a tool:
  - I can see its name + rarity (mock).
  - If I’m in range, I can collect it.
- Collected tools disappear from the map and go to my inventory.

### Hotspots
- As a player, I want to see hotspot markers (future mission locations).
- Tapping a hotspot shows:
  - Name
  - Status: “Locked – Investigation Mode coming soon”.

### Inventory & Codex (via Backpack)
- As a player, I tap the backpack at the bottom center:
  - It opens two circular buttons: Items + Codex.
- As a player, tapping Items opens Inventory screen/list of collected tools.
- As a player, tapping Codex opens Codex screen:
  - MVP: “No ghosts discovered yet” or placeholder ghosts.

### HUD Layout (Pokémon Go-style)
- Bottom-left: Profile icon with small XP bar underneath.
- Bottom-center: Backpack button:
  - Default: backpack.
  - When open: turns into X and shows two circles (Items + Codex) above it.
- Bottom-right: Clippy ghost icon:
  - Tap → simple tooltip: “Assistant coming soon”.

### Non-Functional
- App should run fully in Dev Mode without GPS permission.
- Initial map + player marker should appear within ~3–5s of launch.
