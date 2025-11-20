### World Map MVP – Design
## 1. Screen: MapRootScreen

The main screen of the game. The map is always the background layer.

Background

Full-screen interactive map.

Overlays (stacked above the map)

Player marker.

Tool markers (spawn nodes).

Hotspot markers.

Bottom HUD:

Profile icon + XP bar.

Backpack menu.

Clippy assistant.

Dev Mode badge (if enabled).

## 2. Player Position
State Shape
type Position = {
  lat: number;
  lng: number;
};


playerPosition is stored globally or in shared state.

Normal Mode

Uses GPS location updates.

Automatically recenters on new GPS coordinates.

Dev Mode (for at-home testing)

Boolean flag: devModeEnabled.

When enabled:

GPS is ignored.

A visible “Dev Mode” badge is shown at the top of the screen.

Movement is controlled by:

Option A (MVP): Tap-to-teleport

Map onPress → set playerPosition to tapped coordinates.

Option B (optional): On-screen joystick (if time allows).

## 3. State Management

**Approach**: React Context API

For MVP, we'll use React Context to manage global state including:
- Player position
- Dev mode flag
- Inventory (collected tools)
- Available tool nodes and hotspots

Context will be structured as:
- `GameStateContext` - player position, dev mode, inventory
- `MapDataContext` - tool nodes, hotspots (mock data)

## 4. Distance Calculation

**Collection Radius**: 50 meters

**Distance Formula**: Haversine formula for calculating distance between two lat/lng coordinates:

```typescript
function haversineDistance(
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

const COLLECTION_RADIUS = 50; // meters
```

## 5. Spawn Data (Mocked for MVP)

Spawn data is hardcoded and not loaded from a backend for MVP.

**Type Definitions:**

```typescript
type ToolNode = {
  id: string;
  lat: number;
  lng: number;
  type: 'EMF' | 'SpiritBox' | 'ThermalCam' | 'Salt';
  rarity: 'Common' | 'Rare' | 'Epic';
};

type Hotspot = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'locked' | 'unlocked';
};
```

**Mock Data Examples:**

```typescript
// Default starting position (San Francisco)
const DEFAULT_POSITION = { lat: 37.7749, lng: -122.4194 };

// Example tool nodes scattered around starting position
const MOCK_TOOL_NODES: ToolNode[] = [
  {
    id: 'tool-1',
    lat: 37.7750,
    lng: -122.4190,
    type: 'EMF',
    rarity: 'Common',
  },
  {
    id: 'tool-2',
    lat: 37.7745,
    lng: -122.4200,
    type: 'SpiritBox',
    rarity: 'Rare',
  },
  {
    id: 'tool-3',
    lat: 37.7755,
    lng: -122.4185,
    type: 'ThermalCam',
    rarity: 'Epic',
  },
  {
    id: 'tool-4',
    lat: 37.7740,
    lng: -122.4195,
    type: 'Salt',
    rarity: 'Common',
  },
];

// Example hotspots
const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-1',
    lat: 37.7760,
    lng: -122.4180,
    name: 'Abandoned Victorian House',
    status: 'locked',
  },
  {
    id: 'hotspot-2',
    lat: 37.7735,
    lng: -122.4210,
    name: 'Old Cemetery',
    status: 'locked',
  },
];
```

These will later be replaced with dynamic spawning.

## 6. Marker Interaction
Tool Nodes

Visual: small pin icon representing the tool type.

Tapping a tool node opens a bottom-sheet containing:

Tool name

Mock rarity (Common/Rare/Epic)

Collect button

Collect Button Logic

Enabled only if the player is within radius
distance(playerPosition, toolPosition) < COLLECTION_RADIUS

When collected:

Remove the tool from the map.

Add the tool to the player’s inventory state.

Hotspots

Visual: larger, distinct icon.

Tapping a hotspot opens a mini-sheet containing:

Hotspot name

Status text:
"Locked – Investigation Mode coming soon"

## 7. HUD Layout (Pokémon Go–Style)

The HUD sits at the bottom of the screen and does not obstruct the map.

Profile (Bottom-Left)

Circular avatar icon anchored to the bottom-left.

Thin XP bar directly under it (2–4px tall).

Tapping the profile opens a simple Profile panel showing:

Player name (placeholder)

Level (mock)

XP / XP-to-next-level (mock)

Backpack Menu (Bottom-Center)

Default State

Large circular backpack icon.

No extra buttons visible.

Expanded State

Tapping the backpack:

The backpack icon morphs into an X (close button).

Two circular buttons appear above it in a short arc or row:

Items → opens Inventory

Codex → opens Codex

Closing Behavior

Tapping the X
or

Tapping outside the radial menu
→ collapses the menu and restores the backpack icon.

Clippy Assistant (Bottom-Right)

Small circular icon anchored bottom-right.

Use a placeholder icon for now; you will provide custom art later.

Tapping displays a tooltip/toast:

"I’ll help you investigate soon!"

This assistant will later deliver hints, lore, and mission alerts.

## 8. Inventory Screen

A simple UI for listing collected tools.

Displays list items like:

Tool name

Quantity collected

Scrollable list

May use full-screen modal or slide-up panel

MVP does not require sorting, filtering, or tool details.

## 9. Codex Screen

A simple screen representing the ghost “Pokédex.”

For MVP

Text: "No ghosts discovered yet."

Optional

Add placeholder ghost entries:

Ghost Name

Silhouette icon

Description placeholder

Codex will expand significantly in later phases.