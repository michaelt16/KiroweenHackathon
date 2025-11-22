# 🪪 Agent ID - Horror Profile Screen

## Overview

The **ProfileHorrorID** component creates an authentic paranormal investigator ID card pinned to a cork board background, matching the analog horror aesthetic.

## Design Features

### 🎨 Cork Board Background
- Textured cork surface with realistic grain
- Push pins holding various elements
- Scattered notes and photos
- Authentic bulletin board feel

### 🪪 Central ID Card
- **Government-style ID layout**
- Agent photo/avatar in center
- Official stamps and clearance levels
- Worn paper texture with damage
- Tape corners for authenticity

### 📊 Information Display

#### Header Section
- **Ghost Hunt Division** branding
- Official department stamp
- Clearance level badge

#### Agent Details
- Agent name (uppercase, bold)
- Unique ID number
- Clearance level (stamped)
- Rank/title

#### Stats Section
- **Level & XP Progress Bar**
- Investigations completed
- Ghosts caught
- Success rate percentage
- Current sanity level (color-coded)

#### Authentication
- Signature line
- Official authorization

### 📌 Pinned Elements

#### Yellow Sticky Note (Top Left)
- Current active case
- Status indicator
- Push pin attachment

#### Polaroid Photo (Top Right)
- Last ghost encounter
- Authentic photo frame
- Tilted for realism

#### Warning Note (Bottom)
- Equipment reminder
- Safety protocols
- Yellow warning style

## Visual Aesthetic

### Color Palette
- **Cork Board**: `#3d2f24` (brown cork)
- **ID Card Background**: `#f4f0e6` (aged paper)
- **Borders**: `#8B4513` (saddle brown)
- **Stamps**: `#dc2626` (red)
- **Text**: `#2d1810` (dark brown)

### Damage Effects
- Water stains (bottom right)
- Worn edges
- Subtle rotation for authenticity
- Paper texture overlay
- Ruled lines on paper

### Typography
- **Main Font**: Courier New (typewriter style)
- **Signatures**: Cursive
- **Headers**: Bold, uppercase, spaced

## Component Structure

```tsx
<div> {/* Cork board background */}
  <div> {/* Pinned sticky note */}
  <div> {/* Pinned photo */}
  
  <div> {/* Main ID card */}
    <div> {/* ID card inner */}
      {/* Header & branding */}
      {/* Agent photo */}
      {/* Name & ID */}
      {/* Clearance stamp */}
      {/* Rank */}
      {/* Level & XP bar */}
      {/* Stats grid */}
      {/* Signature */}
    </div>
    {/* Tape corners */}
  </div>
  
  <div> {/* Warning note */}
</div>
```

## Usage

```tsx
import { ProfileHorrorID } from './ProfileHorrorID';

function App() {
  return <ProfileHorrorID />;
}
```

## Customization Points

### Agent Data
```typescript
const agentData = {
  name: 'AGENT MORRISON',
  id: 'GH-2847',
  level: 12,
  clearance: 'LEVEL 3 - RESTRICTED',
  rank: 'Senior Investigator',
  investigations: 47,
  ghostsCaught: 23,
  successRate: 68,
  sanity: 72,
  experience: 8450,
  nextLevel: 9500
};
```

### Dynamic Elements
- **XP Bar**: Automatically calculates progress
- **Sanity Color**: Red warning when < 50%
- **Stats**: All values are dynamic
- **Clearance Badge**: Can be different levels

## Horror Elements

### Authentic Damage
- Water stains on paper
- Worn corners
- Irregular edges
- Faded areas

### Physical Realism
- Push pins with shadows
- Tape with texture
- Slight rotations
- Depth with shadows

### Atmospheric Details
- Cork grain texture
- Paper ruled lines
- Typewriter font
- Official stamps

## Mobile Considerations

- **Responsive Layout**: Centers on all screens
- **Touch Targets**: N/A (display only)
- **Readability**: High contrast text
- **Performance**: CSS-only effects

## Integration Notes

### State Management
Currently uses static data. To integrate:

```typescript
// Connect to player store
const player = usePlayerStore();

const agentData = {
  name: player.name,
  id: player.id,
  level: player.level,
  // ... etc
};
```

### Navigation
Add to main app routing:

```typescript
<Route path="/profile" element={<ProfileHorrorID />} />
```

## Future Enhancements

### Phase 2
- [ ] Animated XP bar fill
- [ ] Sanity pulse effect when low
- [ ] Achievement badges
- [ ] Equipment loadout display

### Phase 3
- [ ] Custom agent photos
- [ ] Unlockable ID card styles
- [ ] Rank progression visuals
- [ ] Case history timeline

### Phase 4
- [ ] Multiplayer team roster
- [ ] Leaderboard integration
- [ ] Special clearance unlocks
- [ ] Prestige system

## Accessibility

- High contrast text
- Clear hierarchy
- Readable font sizes
- Color-blind safe (uses patterns + color)

## Performance

- **CSS-only effects**: No images needed
- **SVG noise**: Inline data URI
- **Minimal DOM**: Efficient structure
- **No animations**: Static display

---

**Status**: ✅ Complete - Ready for UI Playground
**Last Updated**: 2024
**Component**: `ProfileHorrorID.tsx`
