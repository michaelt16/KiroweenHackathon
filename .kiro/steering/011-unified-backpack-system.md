# 011 - Unified Backpack System

## Purpose

This document defines the **unified backpack system** that serves as the primary inventory and navigation interface across both Overworld (map) and Investigation modes. The backpack provides context-aware content while maintaining consistent interaction patterns and analog horror aesthetics.

---

## Core Principle: One Backpack, Two Contexts

**The backpack is the same component, but its contents adapt to where you are.**

This creates:
- **Consistent UX** - Same button, same location, same interaction
- **Context-aware content** - Different tabs based on game mode
- **Familiar pattern** - Players always know where to find their stuff
- **Clean UI** - No duplicate buttons or confusing navigation

---

## Backpack Structure

### Physical Design

The backpack should feel like a **worn field investigator's bag**:
- Aged leather or canvas texture
- Visible wear (scratches, stains, patches)
- Brass buckles or zippers
- Handwritten labels or tags
- Slight rotation for authenticity

### Button Placement

- **Position**: Bottom-center of screen
- **Size**: 60-70px diameter (comfortable thumb reach)
- **Visual**: Backpack icon with subtle glow
- **Active state**: Highlighted when open
- **Haptic**: Vibration on tap (if supported)

### Drawer Animation

- **Slide up** from bottom when opened
- **Height**: 50-60% of screen height
- **Duration**: 300ms ease-in-out
- **Background**: Aged paper with textures
- **Border**: Worn edges, tape strips

---

## Context-Aware Tabs

### Overworld Mode Tabs

When on the map (exploring, collecting supplies):

| Tab | Icon | Content |
|-----|------|---------|
| **Inventory** | 🎒 | Supplies (film, boosts, charms) |
| **Codex** | 📖 | Full ghost encyclopedia |
| **Profile** | 🆔 | Stats, level, XP, achievements |
| **Settings** | ⚙️ | Game settings, preferences |

**Visual Style**: Lighter, more organized (you're at base)

---

### Investigation Mode Tabs

When actively hunting a ghost:

| Tab | Icon | Content |
|-----|------|---------|
| **Tools** | 🔧 | Equipment selection (Radar, EMF, etc.) |
| **Photos** | 📸 | Captured evidence photos |
| **Evidence & Deduction** | 🔍 | Evidence checklist + ghost narrowing |
| **Field Journal** | 📝 | Quick reference notes, tips |
| **Codex** | 📖 | Ghost encyclopedia (read-only) |

**Visual Style**: Darker, more urgent (you're in the field)

---

## Tab Design Guidelines

### Tab Visual Style

Tabs should look like **vintage folder tabs** or **notebook dividers**:

```
┌─────────┬─────────┬─────────┬─────────┐
│ TOOLS   │ PHOTOS  │ EVIDENCE│ JOURNAL │  ← Active tab: lighter, raised
└─────────┴─────────┴─────────┴─────────┘
  ▲ Aged paper texture, worn edges
```

**Active Tab**:
- Lighter background (aged paper highlight)
- Slightly raised (shadow effect)
- Underline or border accent
- Typewriter font (Courier New)

**Inactive Tab**:
- Darker background
- Recessed appearance
- Muted text color
- Same font, lower opacity

### Tab Content Styling

All tab content follows **006 Analog Horror Component System**:
- Aged paper backgrounds
- Wrinkled texture overlays
- Coffee stains, tape, scratches
- Handwritten fonts (Caveat) for notes
- Typewriter fonts (Courier New) for data
- Polaroid-style photos
- Worn edges and damage

---

## Key Tabs Deep Dive

### 1. Tools Tab (Investigation Mode)

**Purpose**: Select investigation equipment

**Layout**:
```
┌─────────────────────────────────┐
│  🔧 FIELD EQUIPMENT             │
│                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐    │
│  │ 📡  │  │ 📊  │  │ 🌡️  │    │
│  │RADAR│  │ EMF │  │THRML│    │
│  └─────┘  └─────┘  └─────┘    │
│                                 │
│  ┌─────┐  ┌─────┐              │
│  │ 📻  │  │ 📷  │              │
│  │AUDIO│  │ CAM │              │
│  └─────┘  └─────┘              │
└─────────────────────────────────┘
```

**Features**:
- Tool cards with proper icons (from ToolIcon component)
- Tool name and brief description
- Active tool highlighted
- Aged card styling with textures
- Tap to select and close backpack

---

### 2. Photos Tab (Investigation Mode)

**Purpose**: Review captured evidence photos

**Layout**:
```
┌─────────────────────────────────┐
│  📸 EVIDENCE PHOTOS             │
│                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐    │
│  │     │  │     │  │     │    │
│  │ 📷  │  │ 📷  │  │ 📷  │    │
│  │     │  │     │  │     │    │
│  └─────┘  └─────┘  └─────┘    │
│  12:34   12:35   12:36        │
└─────────────────────────────────┘
```

**Features**:
- Polaroid-style photo frames
- Timestamps below each photo
- Tape strips attaching photos
- Slight rotation for each photo
- Tap to view full-screen
- Empty state: "No photos captured"

---

### 3. Evidence & Deduction Tab (Investigation Mode)

**Purpose**: Track evidence and narrow down ghost types

**Layout**:
```
┌─────────────────────────────────┐
│  🔍 EVIDENCE & DEDUCTION        │
│                                 │
│  EVIDENCE COLLECTED:            │
│  ☑ EMF Level 5                  │
│  ☑ Freezing Temps               │
│  ☐ Spirit Box Response          │
│  ☐ Ghost Orbs                   │
│  ☐ Ghost Writing                │
│  ☐ Fingerprints                 │
│                                 │
│  POSSIBLE GHOSTS:               │
│  ⭕ WRAITH (High confidence)    │
│  ⭕ BANSHEE (Medium confidence) │
│  ⭕ DEMON (Low confidence)      │
└─────────────────────────────────┘
```

**Features**:
- Evidence checklist (auto-checked as evidence is found)
- Real-time ghost type filtering
- Confidence indicators (red circles, underlines)
- Handwritten notes in margins
- Case file aesthetic
- "Identify Ghost" button when narrowed to 1-2 types

**Deduction Logic**:
1. Start with all ghost types visible
2. As evidence is collected, filter to matching ghosts
3. Show confidence level based on evidence strength
4. Highlight final ghost when only one remains

---

### 4. Field Journal Tab (Investigation Mode)

**Purpose**: Quick reference for investigation tips

**Layout**:
```
┌─────────────────────────────────┐
│  📝 FIELD JOURNAL               │
│                                 │
│  TOOL USAGE TIPS:               │
│  • Radar shows direction only   │
│  • EMF detects proximity        │
│  • Thermal reveals cold spots   │
│                                 │
│  GHOST BEHAVIOR SIGNS:          │
│  • EMF spikes = nearby          │
│  • Whispers = communication     │
│  • Cold = presence              │
│                                 │
│  SAFETY REMINDERS:              │
│  • Watch your sanity            │
│  • Don't stay too long          │
│  • Trust your instincts         │
└─────────────────────────────────┘
```

**Features**:
- Handwritten font (Caveat)
- Organized by category
- Bullet points with scribbles
- Coffee stains and wear
- Scrollable content
- Quick tips for new players

---

### 5. Codex Tab (Both Modes)

**Purpose**: Ghost encyclopedia reference

**Overworld Mode**:
- Full access to all discovered ghosts
- Detailed information and stats
- Can browse and learn

**Investigation Mode**:
- Read-only reference
- Quick lookup during hunt
- Same content, different context

**Layout**:
```
┌─────────────────────────────────┐
│  📖 GHOST CODEX                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ WRAITH                  │   │
│  │ ┌─────┐                 │   │
│  │ │     │ Threat: HIGH    │   │
│  │ │ 📷  │ Speed: FAST     │   │
│  │ │     │ Evidence:       │   │
│  │ └─────┘ • EMF 5         │   │
│  │         • Freezing      │   │
│  │         • Spirit Box    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features**:
- Journal page aesthetic
- Polaroid ghost photos
- Typewritten stats
- Handwritten notes
- Tape and pins
- Scrollable list of ghosts

---

### 6. Inventory Tab (Overworld Mode)

**Purpose**: View collected supplies

**Layout**:
```
┌─────────────────────────────────┐
│  🎒 FIELD SUPPLIES              │
│                                 │
│  🎞️ FILM ROLLS ............ 12  │
│  ⚡ SCANNER BOOSTS ......... 3   │
│  🔮 PROTECTIVE CHARMS ...... 5   │
│                                 │
│  EQUIPMENT STATUS:              │
│  ✓ All tools operational        │
│  ✓ Battery: 87%                 │
│  ✓ GPS: Active                  │
└─────────────────────────────────┘
```

**Features**:
- Equipment log aesthetic
- Typewriter font for counts
- Checkmarks and scribbles
- Supply icons
- Status indicators
- Aged paper background

---

## Implementation Guidelines

### Component Structure

```typescript
<UnifiedBackpack mode="overworld" | "investigation">
  <BackpackButton onClick={toggleOpen} />
  
  <BackpackDrawer isOpen={isOpen}>
    <TabBar tabs={contextAwareTabs} />
    
    <TabContent>
      {mode === 'overworld' ? (
        <>
          <InventoryTab />
          <CodexTab />
          <ProfileTab />
          <SettingsTab />
        </>
      ) : (
        <>
          <ToolsTab />
          <PhotosTab />
          <EvidenceDeductionTab />
          <FieldJournalTab />
          <CodexTab />
        </>
      )}
    </TabContent>
  </BackpackDrawer>
</UnifiedBackpack>
```

### State Management

```typescript
interface BackpackState {
  isOpen: boolean;
  activeTab: string;
  mode: 'overworld' | 'investigation';
  lastOverworldTab: string;
  lastInvestigationTab: string;
}
```

### Context Switching Logic

```typescript
// When entering investigation mode
const enterInvestigation = () => {
  setMode('investigation');
  setActiveTab(lastInvestigationTab || 'tools');
};

// When exiting investigation mode
const exitInvestigation = () => {
  setMode('overworld');
  setActiveTab(lastOverworldTab || 'inventory');
};
```

---

## Visual Consistency Rules

### Colors

**Overworld Mode** (lighter, organized):
- Background: `#d8d4c8` (light aged paper)
- Text: `#1a0f0a` (dark brown/black)
- Accent: `#8b7355` (cork brown)
- Borders: `rgba(139, 69, 19, 0.4)` (light brown)

**Investigation Mode** (darker, urgent):
- Background: `#c4b49a` (darker aged paper)
- Text: `#1a0f0a` (dark brown/black)
- Accent: `#d4a574` (warm highlight)
- Borders: `rgba(139, 69, 19, 0.6)` (darker brown)

### Typography

- **Handwritten**: `"Caveat", cursive` (14-18px)
- **Technical**: `"Courier New", monospace` (11-14px)
- **Headings**: `"Caveat", cursive` (18-24px, bold)

### Textures

All tabs must include:
- Wrinkled paper texture (multiply blend, 0.3-0.4 opacity)
- Dust overlay (overlay blend, 0.15-0.2 opacity)
- Coffee stains (2-3 per tab, random positions)
- Tape strips (1-2 per tab, crooked)
- Scratches and wear (subtle, varied)

---

## Animation Specifications

### Backpack Open/Close

```typescript
// Open animation
{
  from: { bottom: '-60%' },
  to: { bottom: '0' },
  duration: 300,
  easing: 'ease-in-out'
}

// Close animation
{
  from: { bottom: '0' },
  to: { bottom: '-60%' },
  duration: 300,
  easing: 'ease-in-out'
}
```

### Tab Switching

```typescript
// Fade transition
{
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 200,
  easing: 'ease-in'
}
```

### Button Feedback

```typescript
// Tap animation
{
  scale: [1, 0.95, 1],
  duration: 150,
  easing: 'ease-out'
}
```

---

## Performance Considerations

### Lazy Loading

- Only render active tab content
- Preload adjacent tabs for smooth switching
- Unload inactive tab content after 5 seconds

### Texture Optimization

- Cache all texture images on first load
- Use CSS for simple effects (gradients, shadows)
- Compress texture images (WebP format)

### Animation Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `height`, `width`, or `top/left`
- Debounce rapid tab switches

---

## Testing Checklist

When implementing the unified backpack:

- [ ] Backpack opens/closes smoothly in both modes
- [ ] Tabs switch without lag
- [ ] Context switching works correctly
- [ ] Evidence filtering updates in real-time
- [ ] Photos display correctly
- [ ] Tools can be selected from Tools tab
- [ ] Codex is accessible in both modes
- [ ] Analog horror styling is consistent
- [ ] Textures load without blocking UI
- [ ] Performance is smooth on mobile devices

---

## Related Documents

- **Spec 009**: Investigation UI Transformation (tool designs)
- **Steering 006**: Analog Horror Component System (visual guidelines)
- **Steering 007**: Investigation Tools Design System (tool aesthetics)
- **Steering 008**: Full UI Transformation (overall design philosophy)

---

**Status**: Active Design Document
**Authority**: Defines unified backpack system across all game modes
**Last Updated**: 2024
