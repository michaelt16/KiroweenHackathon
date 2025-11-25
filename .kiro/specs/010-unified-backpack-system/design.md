# Design Document - Unified Backpack System

## Overview

The Unified Backpack System is a context-aware UI component that serves as the primary inventory and navigation interface across both Overworld and Investigation modes. It provides a consistent interaction pattern while adapting its content based on the current game mode, maintaining the analog horror aesthetic throughout.

## Architecture

### High-Level Component Structure

```
UnifiedBackpack (Root Component)
├── BackpackButton (Bottom-center trigger)
├── BackpackDrawer (Slide-up container)
│   ├── TabBar (Context-aware tabs)
│   └── TabContent (Dynamic content area)
│       ├── Overworld Tabs
│       │   ├── InventoryTab
│       │   ├── CodexTab
│       │   ├── ProfileTab
│       │   └── SettingsTab
│       └── Investigation Tabs
│           ├── ToolsTab
│           ├── PhotosTab
│           ├── EvidenceDeductionTab
│           ├── FieldJournalTab
│           └── CodexTab (shared)
```

### State Management

The backpack uses a centralized state management approach:

```typescript
interface BackpackState {
  isOpen: boolean;
  mode: 'overworld' | 'investigation';
  activeTab: string;
  lastOverworldTab: string;
  lastInvestigationTab: string;
}
```

## Components and Interfaces

### 1. UnifiedBackpack Component

**Purpose**: Root component that manages backpack state and context switching

**Props**:
```typescript
interface UnifiedBackpackProps {
  mode: 'overworld' | 'investigation';
  onModeChange?: (mode: 'overworld' | 'investigation') => void;
}
```

**Responsibilities**:
- Manage open/closed state
- Handle context switching
- Coordinate tab rendering
- Apply analog horror styling

---

### 2. BackpackButton Component

**Purpose**: Bottom-center button that triggers backpack open/close

**Props**:
```typescript
interface BackpackButtonProps {
  isOpen: boolean;
  onClick: () => void;
}
```

**Visual Design**:
- 60-70px diameter circular button
- Aged leather/canvas texture
- Backpack icon with subtle glow
- Active state highlighting
- Haptic feedback on tap

---

### 3. BackpackDrawer Component

**Purpose**: Slide-up container that holds tabs and content

**Props**:
```typescript
interface BackpackDrawerProps {
  isOpen: boolean;
  mode: 'overworld' | 'investigation';
  children: React.ReactNode;
}
```

**Animation**:
- Slide up from bottom (300ms ease-in-out)
- Height: 50-60% of screen
- Background: Aged paper with textures
- Border: Worn edges, tape strips

---

### 4. TabBar Component

**Purpose**: Displays context-aware tabs

**Props**:
```typescript
interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface Tab {
  id: string;
  label: string;
  icon?: string;
}
```

**Visual Design**:
- Vintage folder tab aesthetic
- Active tab: lighter, raised
- Inactive tab: darker, recessed
- Typewriter font (Courier New)

---

### 5. Tab Components

#### ToolsTab (Investigation Mode)

**Purpose**: Display and select investigation tools

**Props**:
```typescript
interface ToolsTabProps {
  activeTool: string;
  onToolSelect: (toolId: string) => void;
}
```

**Features**:
- Grid layout of tool cards
- ToolIcon components
- Tool names and descriptions
- Active tool highlighting
- Aged card styling

---

#### PhotosTab (Investigation Mode)

**Purpose**: Display captured evidence photos

**Props**:
```typescript
interface PhotosTabProps {
  photos: Photo[];
  onPhotoTap: (photoId: string) => void;
}

interface Photo {
  id: string;
  url: string;
  timestamp: Date;
}
```

**Features**:
- Polaroid-style photo frames
- Timestamps below photos
- Tape strips attaching photos
- Slight rotation for authenticity
- Empty state message

---

#### EvidenceDeductionTab (Investigation Mode)

**Purpose**: Track evidence and narrow down ghost types

**Props**:
```typescript
interface EvidenceDeductionTabProps {
  evidence: EvidenceType[];
  possibleGhosts: GhostType[];
  onIdentifyGhost: (ghostId: string) => void;
}

interface EvidenceType {
  id: string;
  name: string;
  collected: boolean;
}

interface GhostType {
  id: string;
  name: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
}
```

**Features**:
- Evidence checklist (auto-checked)
- Real-time ghost filtering
- Confidence indicators
- Case file aesthetic
- "Identify Ghost" button

**Deduction Logic**:
```typescript
const filterGhosts = (evidence: EvidenceType[], allGhosts: GhostType[]) => {
  const collectedEvidence = evidence.filter(e => e.collected).map(e => e.id);
  
  return allGhosts.filter(ghost => {
    return collectedEvidence.every(evidenceId => 
      ghost.evidence.includes(evidenceId)
    );
  });
};
```

---

#### FieldJournalTab (Investigation Mode)

**Purpose**: Quick reference notes and tips

**Props**:
```typescript
interface FieldJournalTabProps {
  entries: JournalEntry[];
}

interface JournalEntry {
  category: 'tool_usage' | 'ghost_signs' | 'safety';
  title: string;
  content: string;
}
```

**Features**:
- Handwritten font (Caveat)
- Organized by category
- Bullet points with scribbles
- Coffee stains and wear
- Scrollable content

---

#### CodexTab (Both Modes)

**Purpose**: Ghost encyclopedia reference

**Props**:
```typescript
interface CodexTabProps {
  mode: 'overworld' | 'investigation';
  ghosts: GhostEntry[];
  onGhostSelect: (ghostId: string) => void;
}

interface GhostEntry {
  id: string;
  name: string;
  discovered: boolean;
  threat: 'low' | 'medium' | 'high';
  speed: 'slow' | 'medium' | 'fast';
  evidence: string[];
  photo?: string;
}
```

**Features**:
- Journal page aesthetic
- Polaroid ghost photos
- Typewritten stats
- Handwritten notes
- Scrollable list

---

#### InventoryTab (Overworld Mode)

**Purpose**: Display collected supplies

**Props**:
```typescript
interface InventoryTabProps {
  supplies: Supplies;
}

interface Supplies {
  film: number;
  boosts: number;
  charms: number;
}
```

**Features**:
- Equipment log aesthetic
- Typewriter font for counts
- Supply icons
- Status indicators
- Aged paper background

---

## Data Models

### Backpack State

```typescript
interface BackpackState {
  isOpen: boolean;
  mode: 'overworld' | 'investigation';
  activeTab: string;
  lastOverworldTab: string;
  lastInvestigationTab: string;
}
```

### Tab Configuration

```typescript
const OVERWORLD_TABS: Tab[] = [
  { id: 'inventory', label: 'INVENTORY', icon: '🎒' },
  { id: 'codex', label: 'CODEX', icon: '📖' },
  { id: 'profile', label: 'PROFILE', icon: '🆔' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️' },
];

const INVESTIGATION_TABS: Tab[] = [
  { id: 'tools', label: 'TOOLS', icon: '🔧' },
  { id: 'photos', label: 'PHOTOS', icon: '📸' },
  { id: 'evidence', label: 'EVIDENCE', icon: '🔍' },
  { id: 'journal', label: 'JOURNAL', icon: '📝' },
  { id: 'codex', label: 'CODEX', icon: '📖' },
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Context Switching Preserves Tab State

*For any* backpack state, when switching from Overworld to Investigation mode and back, the last active tab in each mode should be restored.

**Validates: Requirements 11.3**

### Property 2: Tab Content Matches Mode

*For any* game mode, the displayed tabs should match the expected tabs for that mode (4 tabs for Overworld, 5 tabs for Investigation).

**Validates: Requirements 2.1, 3.1**

### Property 3: Evidence Filtering Correctness

*For any* set of collected evidence, the filtered ghost list should only include ghosts that match ALL collected evidence types.

**Validates: Requirements 12.3**

### Property 4: Animation Timing Bounds

*For any* backpack open/close operation, the animation should complete within 300ms.

**Validates: Requirements 13.1**

### Property 5: Tab Switching Performance

*For any* tab switch operation, the new content should render within 200ms.

**Validates: Requirements 13.2**

## Error Handling

### Context Switching Errors

- **Invalid mode**: Default to 'overworld' mode
- **Missing tab state**: Use default tab for mode

### Evidence Filtering Errors

- **No matching ghosts**: Display "No matches found" message
- **Contradictory evidence**: Show warning indicator

### Performance Errors

- **Slow texture loading**: Show loading indicator
- **Animation lag**: Reduce texture quality on low-end devices

## Testing Strategy

### Unit Tests

- Tab rendering for each mode
- Context switching logic
- Evidence filtering algorithm
- Animation timing
- State persistence

### Property-Based Tests

- Property 1: Context switching preserves state
- Property 2: Tab content matches mode
- Property 3: Evidence filtering correctness
- Property 4: Animation timing bounds
- Property 5: Tab switching performance

### Integration Tests

- Full backpack workflow (open → switch tabs → close)
- Mode switching during investigation
- Evidence collection and deduction flow
- Photo capture and review

## Performance Considerations

### Lazy Loading

- Only render active tab content
- Preload adjacent tabs
- Unload inactive tabs after 5 seconds

### Texture Optimization

- Cache textures on first load
- Use CSS for simple effects
- Compress images (WebP format)

### Animation Performance

- Use `transform` and `opacity` (GPU-accelerated)
- Avoid `height`, `width`, `top/left`
- Debounce rapid tab switches

## Visual Design System

### Colors

**Overworld Mode**:
- Background: `#d8d4c8`
- Text: `#1a0f0a`
- Accent: `#8b7355`
- Borders: `rgba(139, 69, 19, 0.4)`

**Investigation Mode**:
- Background: `#c4b49a`
- Text: `#1a0f0a`
- Accent: `#d4a574`
- Borders: `rgba(139, 69, 19, 0.6)`

### Typography

- Handwritten: `"Caveat", cursive` (14-18px)
- Technical: `"Courier New", monospace` (11-14px)
- Headings: `"Caveat", cursive` (18-24px, bold)

### Textures

- Wrinkled paper (multiply, 0.3-0.4 opacity)
- Dust overlay (overlay, 0.15-0.2 opacity)
- Coffee stains (2-3 per tab)
- Tape strips (1-2 per tab)
- Scratches and wear

## Implementation Notes

### File Structure

```
src/components/Backpack/
├── UnifiedBackpack.tsx
├── BackpackButton.tsx
├── BackpackDrawer.tsx
├── TabBar.tsx
├── tabs/
│   ├── ToolsTab.tsx
│   ├── PhotosTab.tsx
│   ├── EvidenceDeductionTab.tsx
│   ├── FieldJournalTab.tsx
│   ├── CodexTab.tsx
│   ├── InventoryTab.tsx
│   ├── ProfileTab.tsx
│   └── SettingsTab.tsx
└── hooks/
    ├── useBackpackState.ts
    └── useEvidenceFiltering.ts
```

### Dependencies

- React (UI framework)
- Zustand or Context API (state management)
- Framer Motion (animations)
- Analog Horror Component System (styling)

## Future Enhancements

- Swipe gestures for tab switching
- Drag-and-drop for evidence organization
- Voice commands for tool selection
- Multiplayer evidence sharing
- Custom journal entries

---

**Status**: Design Complete - Ready for Implementation
**Last Updated**: 2024
