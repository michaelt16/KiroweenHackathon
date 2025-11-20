# Ghost Hunt - World Map MVP

A Pokémon Go-style paranormal investigation game built with React + Vite + Leaflet.

## Project Structure

```
src/
├── context/          # React Context for state management
│   ├── GameStateContext.tsx    # Player position, dev mode, inventory
│   └── MapDataContext.tsx      # Tool nodes and hotspots
├── screens/          # Main screen components
│   ├── MapRootScreen.tsx       # Main map view
│   ├── InventoryScreen.tsx     # Inventory list
│   ├── CodexScreen.tsx         # Ghost codex
│   └── ProfilePanel.tsx        # Player profile
├── types/            # TypeScript type definitions
│   └── game.ts                 # Core game types
├── utils/            # Utility functions
│   ├── distance.ts             # Haversine distance calculation
│   └── leafletSetup.ts         # Leaflet icon configuration
├── data/             # Mock data
│   └── mockData.ts             # Tool nodes and hotspots
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (current version has compatibility warnings)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Features (Task 1 Complete)

✅ Project initialized with Vite + React + TypeScript
✅ Leaflet map integration
✅ React Context for state management
✅ Basic screen structure (Map, Inventory, Codex, Profile)
✅ Type definitions for game entities
✅ Haversine distance calculation utility
✅ Mock data for tool nodes and hotspots
✅ Simple navigation between screens

## Next Steps

- Task 2: Implement map centering and player marker
- Task 3: Add Dev Mode with tap-to-teleport
- Task 4: Add tool node markers and collection
- Task 5: Add hotspot markers
- Task 6: Build Pokémon Go-style HUD
- Task 7: Complete Inventory and Codex views
- Task 8: QA testing

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Map Library**: Leaflet + React-Leaflet
- **State Management**: React Context API
- **Styling**: CSS (will add Tailwind or styled-components later)
