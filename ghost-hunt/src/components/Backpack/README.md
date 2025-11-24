# 🎒 Unified Backpack System

The unified backpack system serves as the primary inventory and navigation interface across both Overworld (map) and Investigation modes.

## Core Principle

**One Backpack, Two Contexts**

The backpack is the same component, but its contents adapt to where you are. This creates:
- Consistent UX - Same button, same location, same interaction
- Context-aware content - Different tabs based on game mode
- Familiar pattern - Players always know where to find their stuff
- Clean UI - No duplicate buttons or confusing navigation

## Components

### UnifiedBackpack
Main container component that manages state and renders the backpack system.

```tsx
import { UnifiedBackpack } from './components/Backpack';

<UnifiedBackpack
  mode="overworld" // or "investigation"
  onToolSelect={(toolId) => console.log(toolId)}
  onClose={() => console.log('Backpack closed')}
/>
```

### BackpackButton
Bottom-center button with aged leather/canvas texture.

### BackpackDrawer
Slide-up drawer with aged paper background and analog horror styling.

### TabBar
Vintage folder tab aesthetic with active/inactive states.

### TabContent
Lazy-loaded tab content with preloading and unloading.

## Tabs

### Overworld Mode (4 tabs)
1. **Inventory** 🎒 - Supplies (film, boosts, charms)
2. **Codex** 📖 - Full ghost encyclopedia
3. **Profile** 🆔 - Stats, level, XP, achievements
4. **Settings** ⚙️ - Game settings, preferences

### Investigation Mode (5 tabs)
1. **Tools** 🔧 - Equipment selection (Radar, EMF, etc.)
2. **Photos** 📸 - Captured evidence photos
3. **Evidence** 🔍 - Evidence checklist + ghost narrowing
4. **Journal** 📝 - Quick reference notes, tips
5. **Codex** 📖 - Ghost encyclopedia (read-only)

## Context Management

Use the `BackpackProvider` to manage backpack state across your app:

```tsx
import { BackpackProvider } from './context/BackpackContext';

<BackpackProvider initialMode="overworld">
  <App />
</BackpackProvider>
```

Access backpack state with the `useBackpack` hook:

```tsx
import { useBackpack } from './context/BackpackContext';

const { backpackState, openBackpack, closeBackpack, setActiveTab } = useBackpack();
```

## Styling

All tabs follow the **006 Analog Horror Component System**:
- Aged paper backgrounds
- Wrinkled texture overlays
- Coffee stains, tape, scratches
- Handwritten fonts (Caveat) for notes
- Typewriter fonts (Courier New) for data
- Polaroid-style photos
- Worn edges and damage

## Performance

- **Lazy loading**: Only active tab content is rendered
- **Preloading**: Adjacent tabs are preloaded for smooth switching
- **Unloading**: Inactive tabs are unloaded after 5 seconds
- **Debouncing**: Rapid tab switches are debounced (200ms)
- **Texture caching**: All textures are cached on first load

## Demo

See `UnifiedBackpackDemo.tsx` in the ui-playground folder for a complete demo.

## Related Documents

- **Spec 010**: Unified Backpack System (requirements, design, tasks)
- **Steering 006**: Analog Horror Component System (visual guidelines)
- **Steering 011**: Unified Backpack System (detailed design)
