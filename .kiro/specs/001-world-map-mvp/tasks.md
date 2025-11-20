# World Map MVP – Tasks

## 1. Project + Navigation Setup
- [ ] Initialize project (engine + map SDK).
- [ ] Create `MapRootScreen`.
- [ ] Add basic navigation or screen handling for:
  - [ ] MapRootScreen
  - [ ] Inventory view
  - [ ] Codex view
  - [ ] Profile panel

## 2. Map + Player Marker
- [ ] Render map centered on a default coordinate.
- [ ] Create `playerPosition` state.
- [ ] Render player marker at `playerPosition`.
- [ ] Add function to recenter map on `playerPosition`.

## 3. Dev Mode
- [ ] Add `devModeEnabled` flag + simple toggle (UI or config).
- [ ] If Dev Mode:
  - [ ] Skip GPS.
  - [ ] Show “Dev Mode” badge.
  - [ ] Implement tap-to-teleport:
    - [ ] On map tap, update `playerPosition` to tapped coords.

## 4. Tool Nodes
- [ ] Add mock data for ToolNodes.
- [ ] Render tool markers on map.
- [ ] Make tool markers tappable.
- [ ] Show bottom sheet/card with:
  - [ ] Tool name
  - [ ] Rarity
  - [ ] Collect button (disabled if out of range).
- [ ] Implement distance check and enable/disable logic.
- [ ] On collect:
  - [ ] Remove tool from map.
  - [ ] Add tool to inventory state.

## 5. Hotspots
- [ ] Add mock data for Hotspots.
- [ ] Render hotspot markers on map (different icon).
- [ ] On tap, show sheet:
  - [ ] Name
  - [ ] “Locked – Investigation Mode coming soon”.

## 6. Bottom HUD
- [ ] Implement Profile icon bottom-left:
  - [ ] Show avatar placeholder.
  - [ ] Add XP bar below icon (static).
  - [ ] On tap: open Profile panel.
- [ ] Implement Backpack button bottom-center:
  - [ ] Default icon (backpack).
  - [ ] On tap:
    - [ ] Change to X.
    - [ ] Show two circular buttons above:
      - [ ] Items → open Inventory.
      - [ ] Codex → open Codex.
  - [ ] On X tap or background tap: close menu.
- [ ] Implement Clippy ghost icon bottom-right:
  - [ ] On tap: show tooltip/toast “Assistant coming soon”.

## 7. Inventory & Codex Views
- [ ] Inventory:
  - [ ] Render list of tools from inventory state.
- [ ] Codex:
  - [ ] Render placeholder “No ghosts discovered yet”.

## 8. QA Flow
- [ ] Run app with Dev Mode on and GPS permission off.
- [ ] Teleport to a tool node and collect it.
- [ ] Verify:
  - [ ] Tool disappears from map.
  - [ ] Tool appears in Inventory.
- [ ] Tap hotspot and see locked message.
- [ ] Open Profile, Inventory, Codex via HUD.
- [ ] Clippy icon tap shows tooltip.