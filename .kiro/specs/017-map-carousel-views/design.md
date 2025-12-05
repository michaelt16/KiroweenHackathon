# Design Document

## Overview

The Map Carousel Views feature adds horizontal navigation to the map screen, creating three distinct visual spaces: Cork Board (left), Map (center), and Shop (right). This design focuses on maximum visual impact with minimal implementation complexity, using static mock data and existing analog horror components to create an impressive demo for judges.

**Design Philosophy**: Visual showcase over deep functionality. Each view is a carefully crafted static scene that demonstrates polish and attention to detail.

---

## Architecture

### Component Hierarchy

```
MapCarouselContainer
├── CarouselWrapper (handles swipe/navigation)
│   ├── CorkBoardView (left, index 0)
│   │   ├── CorkTexture (background)
│   │   ├── MockPolaroids (5-8 static photos)
│   │   ├── RedStringConnections (SVG lines)
│   │   ├── StickyNotes (3-5 notes)
│   │   ├── IndexCards (2-3 cards)
│   │   └── Decorations (pins, clips, tape)
│   │
│   ├── MapView (center, index 1) - EXISTING
│   │   └── [Current map implementation]
│   │
│   └── ShopView (right, index 2)
│       ├── StorefrontBackground (aged paper/wood)
│       ├── ShelfDisplay (wooden shelves)
│       ├── MockItems (4-6 items)
│       ├── PriceTags (handwritten)
│       └── ClosedStamp (overlay)
│
└── NavigationArrows
    ├── LeftArrow (conditional)
    └── RightArrow (conditional)
```

### State Management

```typescript
interface CarouselState {
  currentView: 'corkboard' | 'map' | 'shop';
  currentIndex: 0 | 1 | 2;
  isAnimating: boolean;
}

// Simple state - no complex data needed
const [currentIndex, setCurrentIndex] = useState(1); // Start on map
const [isAnimating, setIsAnimating] = useState(false);
```

---

## Components and Interfaces

### 1. CarouselWrapper Component

**Purpose**: Container that handles horizontal navigation and view switching

**Props**:
```typescript
interface CarouselWrapperProps {
  children: React.ReactNode[]; // [CorkBoard, Map, Shop]
  initialIndex?: number; // Default: 1 (map)
  onViewChange?: (index: number) => void;
}
```

**Implementation**:
```typescript
// Uses CSS transforms for smooth transitions
const translateX = -currentIndex * 100; // -100%, 0%, 100%

<div style={{
  display: 'flex',
  width: '300vw', // 3 views
  transform: `translateX(${translateX}vw)`,
  transition: 'transform 300ms ease-in-out',
}}>
  {children}
</div>
```

**Swipe Detection**:
- Track touch start/move/end
- Minimum 50px horizontal movement to trigger
- Snap to nearest view on release
- Disable during animation

---

### 2. CorkBoardView Component

**Purpose**: Detective-style investigation history board with mock cases

**Layout**:
```
┌─────────────────────────────────────┐
│  🔴 INVESTIGATION BOARD 🔴          │
│                                     │
│    📷        📷                     │
│   [Photo]   [Photo]  📝            │
│      \       /      [Note]         │
│       \     /                      │
│        \   /        📷             │
│         \ /        [Photo]         │
│          X                         │
│         / \         📝             │
│        /   \       [Note]          │
│    📷        📷                     │
│   [Photo]   [Photo]                │
│                                     │
│  📎 Case #2847  📎 Case #2901      │
└─────────────────────────────────────┘
```

**Mock Data Structure**:
```typescript
interface MockPolaroid {
  id: string;
  position: { x: string; y: string }; // e.g., '15%', '25%'
  rotation: number; // -12 to 12 degrees
  imageUrl: string; // Ghost silhouette or static
  caption: string; // "Wraith - 12/15/24"
  pinColor: 'red' | 'silver';
}

const MOCK_POLAROIDS: MockPolaroid[] = [
  {
    id: 'case-001',
    position: { x: '12%', y: '15%' },
    rotation: -8,
    imageUrl: '/assets/mock/ghost-silhouette-1.png',
    caption: 'Wraith - Whitmore St.',
    pinColor: 'red',
  },
  {
    id: 'case-002',
    position: { x: '45%', y: '20%' },
    rotation: 5,
    imageUrl: '/assets/mock/ghost-silhouette-2.png',
    caption: 'Shade - Oak Park',
    pinColor: 'red',
  },
  // ... 5-8 total
];
```

**Red String Connections**:
```typescript
interface StringConnection {
  from: string; // Polaroid ID
  to: string; // Polaroid ID
  color: string; // '#dc2626' (red)
  thickness: number; // 2-3px
}

const MOCK_STRINGS: StringConnection[] = [
  { from: 'case-001', to: 'case-003', color: '#dc2626', thickness: 2 },
  { from: 'case-002', to: 'case-004', color: '#dc2626', thickness: 2 },
  { from: 'case-003', to: 'case-005', color: '#dc2626', thickness: 3 },
  // ... 4-6 connections creating web pattern
];

// Render as SVG paths
<svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
  {MOCK_STRINGS.map(conn => (
    <line
      key={`${conn.from}-${conn.to}`}
      x1={getPolaroidCenter(conn.from).x}
      y1={getPolaroidCenter(conn.from).y}
      x2={getPolaroidCenter(conn.to).x}
      y2={getPolaroidCenter(conn.to).y}
      stroke={conn.color}
      strokeWidth={conn.thickness}
      opacity={0.8}
    />
  ))}
</svg>
```

**Sticky Notes**:
```typescript
interface MockStickyNote {
  id: string;
  position: { x: string; y: string };
  rotation: number; // -20 to 20 degrees
  color: 'yellow' | 'pink' | 'blue';
  text: string;
  size: 'small' | 'medium';
}

const MOCK_STICKY_NOTES: MockStickyNote[] = [
  {
    id: 'note-1',
    position: { x: '70%', y: '18%' },
    rotation: -12,
    color: 'yellow',
    text: 'EMF spike pattern\nmatches Wraith',
    size: 'small',
  },
  {
    id: 'note-2',
    position: { x: '25%', y: '65%' },
    rotation: 8,
    color: 'pink',
    text: 'Check thermal\nreadings again',
    size: 'medium',
  },
  // ... 3-5 total
];
```

**Index Cards**:
```typescript
interface MockIndexCard {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  title: string;
  details: string[];
}

const MOCK_INDEX_CARDS: MockIndexCard[] = [
  {
    id: 'card-1',
    position: { x: '8%', y: '70%' },
    rotation: -5,
    title: 'CASE #2847',
    details: [
      'Location: Whitmore St.',
      'Date: 12/15/24',
      'Result: SUCCESS',
    ],
  },
  // ... 2-3 total
];
```

**Cork Texture Background**:
```typescript
<div style={{
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${corkTexture})`,
  backgroundSize: 'cover',
  position: 'relative',
}}>
  {/* Coffee stains */}
  <div style={{
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: '180px',
    height: '180px',
    backgroundImage: `url(${coffeeStain})`,
    opacity: 0.4,
  }} />
  
  {/* Pin holes scattered */}
  {MOCK_PIN_HOLES.map(hole => (
    <div key={hole.id} style={{
      position: 'absolute',
      ...hole.position,
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.6)',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
    }} />
  ))}
  
  {/* Tape residue */}
  {MOCK_TAPE_MARKS.map(mark => (
    <div key={mark.id} style={{
      position: 'absolute',
      ...mark.position,
      width: '40px',
      height: '15px',
      background: 'rgba(255,255,200,0.2)',
      transform: `rotate(${mark.rotation}deg)`,
    }} />
  ))}
</div>
```

---

### 3. ShopView Component

**Purpose**: Vintage storefront display with mock items

**Layout**:
```
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║   PARANORMAL SUPPLY CO.      ║  │
│  ║         EST. 1985            ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🎞️    ⚡    🔮    📷      │   │ Shelf 1
│  │ Film  Boost Charm Camera    │   │
│  │ $5    $10   $15   $20       │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🌡️    📻    🔦    🧿      │   │ Shelf 2
│  │Thermal Audio Light Artifact │   │
│  │ $25    $30   $8    $50      │   │
│  └─────────────────────────────┘   │
│                                     │
│        ╔═══════════════╗            │
│        ║    CLOSED     ║            │
│        ║  Coming Soon  ║            │
│        ╚═══════════════╝            │
└─────────────────────────────────────┘
```

**Mock Data Structure**:
```typescript
interface MockShopItem {
  id: string;
  name: string;
  icon: string; // Emoji or image
  price: number;
  shelf: 1 | 2;
  position: number; // 0-3 (left to right)
  description: string;
}

const MOCK_SHOP_ITEMS: MockShopItem[] = [
  {
    id: 'film-roll',
    name: 'Film Roll',
    icon: '🎞️',
    price: 5,
    shelf: 1,
    position: 0,
    description: 'Standard 35mm film\n+3 camera shots',
  },
  {
    id: 'scanner-boost',
    name: 'Scanner Boost',
    icon: '⚡',
    price: 10,
    shelf: 1,
    position: 1,
    description: 'Enhanced detection\n+10% clarity',
  },
  {
    id: 'protective-charm',
    name: 'Charm',
    icon: '🔮',
    price: 15,
    shelf: 1,
    position: 2,
    description: 'Sanity protection\n+10% resistance',
  },
  {
    id: 'camera-battery',
    name: 'Camera Battery',
    icon: '📷',
    price: 20,
    shelf: 1,
    position: 3,
    description: 'Extra power\n+5 flash shots',
  },
  // ... 4-6 total items
];
```

**Storefront Background**:
```typescript
<div style={{
  width: '100vw',
  height: '100vh',
  background: `
    linear-gradient(180deg, #d8d4c8 0%, #c4b49a 100%),
    url(${woodTexture})
  `,
  backgroundBlendMode: 'multiply',
  position: 'relative',
}}>
  {/* Store sign */}
  <div style={{
    position: 'absolute',
    top: '8%',
    left: '50%',
    transform: 'translateX(-50%) rotate(-1deg)',
    padding: '20px 40px',
    background: '#1a0f0a',
    border: '4px solid #8b7355',
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
  }}>
    <div style={{
      fontFamily: '"Courier New", monospace',
      fontSize: '24px',
      color: '#d8d4c8',
      textAlign: 'center',
      letterSpacing: '2px',
    }}>
      PARANORMAL SUPPLY CO.
    </div>
    <div style={{
      fontFamily: '"Courier New", monospace',
      fontSize: '14px',
      color: '#8b7355',
      textAlign: 'center',
      marginTop: '8px',
    }}>
      EST. 1985
    </div>
  </div>
  
  {/* Wooden shelves */}
  {/* Items */}
  {/* Closed stamp */}
</div>
```

**Shelf Display**:
```typescript
<div style={{
  position: 'absolute',
  top: '30%',
  left: '10%',
  right: '10%',
  height: '120px',
  background: `
    linear-gradient(180deg, #5a4228 0%, #3a2818 100%),
    url(${woodGrain})
  `,
  backgroundBlendMode: 'overlay',
  borderRadius: '4px',
  boxShadow: 
    'inset 0 4px 8px rgba(0,0,0,0.6), ' +
    '0 8px 16px rgba(0,0,0,0.4)',
  border: '2px solid #2a1808',
}}>
  {/* Items on shelf */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: '0 20px',
  }}>
    {MOCK_SHOP_ITEMS.filter(item => item.shelf === 1).map(item => (
      <ShopItemCard key={item.id} item={item} />
    ))}
  </div>
</div>
```

**Shop Item Card**:
```typescript
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
}}>
  {/* Item icon/image */}
  <div style={{
    fontSize: '48px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
  }}>
    {item.icon}
  </div>
  
  {/* Item name */}
  <div style={{
    fontFamily: '"Caveat", cursive',
    fontSize: '16px',
    color: '#1a0f0a',
    textAlign: 'center',
  }}>
    {item.name}
  </div>
  
  {/* Price tag (handwritten) */}
  <div style={{
    background: '#f4f0e6',
    padding: '4px 12px',
    borderRadius: '2px',
    transform: 'rotate(-3deg)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  }}>
    <div style={{
      fontFamily: '"Caveat", cursive',
      fontSize: '18px',
      color: '#4a0000',
      fontWeight: 'bold',
    }}>
      ${item.price}
    </div>
  </div>
</div>
```

**Closed Stamp Overlay**:
```typescript
<div style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(12deg)',
  padding: '20px 40px',
  border: '6px solid #8b0000',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.95)',
  boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
  opacity: 0.9,
}}>
  <div style={{
    fontFamily: 'Impact, sans-serif',
    fontSize: '48px',
    color: '#8b0000',
    letterSpacing: '4px',
    textAlign: 'center',
  }}>
    CLOSED
  </div>
  <div style={{
    fontFamily: '"Caveat", cursive',
    fontSize: '24px',
    color: '#4a0000',
    textAlign: 'center',
    marginTop: '8px',
  }}>
    Coming Soon
  </div>
</div>
```

---

### 4. NavigationArrows Component

**Purpose**: Visual indicators and tap targets for carousel navigation

**Props**:
```typescript
interface NavigationArrowsProps {
  currentIndex: number;
  onNavigate: (direction: 'left' | 'right') => void;
  isAnimating: boolean;
}
```

**Implementation**:
```typescript
<>
  {/* Left Arrow (hidden on cork board) */}
  {currentIndex > 0 && (
    <button
      onClick={() => onNavigate('left')}
      disabled={isAnimating}
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)',
        border: '2px solid rgba(255,255,255,0.3)',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      ←
    </button>
  )}
  
  {/* Right Arrow (hidden on shop) */}
  {currentIndex < 2 && (
    <button
      onClick={() => onNavigate('right')}
      disabled={isAnimating}
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)',
        border: '2px solid rgba(255,255,255,0.3)',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      →
    </button>
  )}
</>
```

**Alternative: Hand-Drawn Arrow Style**:
```typescript
// Use SVG hand-drawn arrows for analog aesthetic
<svg width="50" height="50" viewBox="0 0 50 50">
  <path
    d="M 10 25 L 30 15 L 30 22 L 40 22 L 40 28 L 30 28 L 30 35 Z"
    fill="#d8d4c8"
    stroke="#1a0f0a"
    strokeWidth="2"
    style={{
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
    }}
  />
</svg>
```

---

## Data Models

### Mock Data Files

**`/src/data/mockCorkBoard.ts`**:
```typescript
export const MOCK_POLAROIDS: MockPolaroid[] = [ /* ... */ ];
export const MOCK_STRINGS: StringConnection[] = [ /* ... */ ];
export const MOCK_STICKY_NOTES: MockStickyNote[] = [ /* ... */ ];
export const MOCK_INDEX_CARDS: MockIndexCard[] = [ /* ... */ ];
export const MOCK_PIN_HOLES: PinHole[] = [ /* ... */ ];
export const MOCK_TAPE_MARKS: TapeMark[] = [ /* ... */ ];
```

**`/src/data/mockShop.ts`**:
```typescript
export const MOCK_SHOP_ITEMS: MockShopItem[] = [ /* ... */ ];
export const SHOP_CONFIG = {
  storeName: 'PARANORMAL SUPPLY CO.',
  established: '1985',
  status: 'CLOSED',
  statusMessage: 'Coming Soon',
};
```

---

## Error Handling

### Swipe Gesture Edge Cases

1. **Vertical scroll conflict**: Only trigger horizontal swipe if `abs(deltaX) > abs(deltaY) * 2`
2. **Rapid swipes**: Debounce swipe detection, ignore inputs during animation
3. **Incomplete swipes**: Snap to nearest view if swipe distance < 50% of screen width
4. **Edge bouncing**: Prevent swiping beyond first/last view (no rubber band effect)

### Performance Safeguards

1. **Conditional rendering**: Only render active view + adjacent views (preload)
2. **Image optimization**: Use compressed images for mock Polaroids
3. **SVG optimization**: Limit red string connections to 6 maximum
4. **Animation throttling**: Disable further inputs during 300ms transition

---

## Testing Strategy

### Visual Testing

**Cork Board**:
- [ ] All 5-8 Polaroids render with correct positions and rotations
- [ ] Red strings connect correct Polaroids
- [ ] Sticky notes and index cards display properly
- [ ] Cork texture and damage elements visible
- [ ] Push pins appear at top of each Polaroid

**Shop**:
- [ ] Storefront sign displays correctly
- [ ] All items render on correct shelves
- [ ] Price tags show proper styling
- [ ] Closed stamp overlays correctly
- [ ] Wooden shelf texture visible

**Navigation**:
- [ ] Swipe left from map shows cork board
- [ ] Swipe right from map shows shop
- [ ] Arrow buttons work correctly
- [ ] Arrows hide at edges (cork board left, shop right)
- [ ] Transitions are smooth (300ms)
- [ ] No jank or stuttering during animation

### Interaction Testing

- [ ] Tap left arrow navigates left
- [ ] Tap right arrow navigates right
- [ ] Swipe gesture triggers navigation
- [ ] Vertical swipes don't trigger horizontal navigation
- [ ] Rapid swipes don't break animation
- [ ] Navigation disabled during animation

### Mobile Testing

- [ ] Touch targets are 44px minimum
- [ ] Swipe gestures feel natural
- [ ] No accidental map pan when swiping
- [ ] Performance smooth on mid-range devices
- [ ] No layout issues on different screen sizes

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Only render active view
   ```typescript
   {currentIndex === 0 && <CorkBoardView />}
   {currentIndex === 1 && <MapView />}
   {currentIndex === 2 && <ShopView />}
   ```

2. **Image Optimization**:
   - Compress mock Polaroid images to < 50KB each
   - Use WebP format for better compression
   - Lazy load images on cork board

3. **CSS Transforms**: Use `transform: translateX()` instead of `left` for GPU acceleration

4. **Memoization**: Memoize static mock data components
   ```typescript
   const CorkBoardView = React.memo(() => { /* ... */ });
   const ShopView = React.memo(() => { /* ... */ });
   ```

5. **Debouncing**: Debounce swipe detection to prevent excessive re-renders

### Performance Targets

- **Transition time**: 300ms
- **Frame rate**: 60fps during animation
- **Initial load**: < 2s for all views
- **Memory usage**: < 50MB for carousel system

---

## Implementation Notes

### Reusing Existing Components

**From Analog Horror System**:
- `<PolaroidPhoto>` - For cork board Polaroids
- `<StickyNote>` - For cork board notes
- `<PushPin>` - For pinning Polaroids
- `<Tape>` - For tape residue marks
- `<DamageOverlay>` - For coffee stains on cork

**From Investigation Tools**:
- Texture assets (cork, wood, metal, paper)
- Damage patterns (scratches, stains, wear)

### New Components to Create

1. **RedStringConnection** - SVG line component
2. **IndexCard** - Typewritten case card
3. **ShopItemCard** - Item display with price tag
4. **StorefrontSign** - Vintage shop sign
5. **WoodenShelf** - Shelf display container

### File Structure

```
/src/components/MapCarousel/
  index.tsx                    # Main carousel container
  CarouselWrapper.tsx          # Swipe/navigation logic
  NavigationArrows.tsx         # Arrow buttons
  
  /CorkBoard/
    index.tsx                  # Cork board view
    RedStringConnection.tsx    # SVG string lines
    IndexCard.tsx              # Case card component
    mockData.ts                # Static mock data
  
  /Shop/
    index.tsx                  # Shop view
    ShopItemCard.tsx           # Item display
    StorefrontSign.tsx         # Shop sign
    WoodenShelf.tsx            # Shelf container
    mockData.ts                # Static mock data
```

---

## Visual Specifications

### Cork Board Colors

```typescript
const CORK_BOARD_COLORS = {
  background: '#8b7355',      // Cork texture base
  pinRed: '#dc2626',          // Red push pins
  pinSilver: '#9ca3af',       // Silver push pins
  stringRed: '#dc2626',       // Red investigation strings
  stickyYellow: '#fef08a',    // Yellow sticky notes
  stickyPink: '#fecdd3',      // Pink sticky notes
  stickyBlue: '#bfdbfe',      // Blue sticky notes
  indexCard: '#f4f0e6',       // Cream index cards
  coffeeStain: 'rgba(139, 69, 19, 0.4)',
  tapeResidue: 'rgba(255, 255, 200, 0.2)',
};
```

### Shop Colors

```typescript
const SHOP_COLORS = {
  background: '#d8d4c8',      // Aged paper wall
  woodShelf: '#5a4228',       // Dark wood shelves
  woodGrain: '#3a2818',       // Wood grain detail
  signBackground: '#1a0f0a',  // Black sign background
  signBorder: '#8b7355',      // Cork/brass border
  signText: '#d8d4c8',        // Cream text
  priceTag: '#f4f0e6',        // Cream price tags
  priceText: '#4a0000',       // Dark red price
  closedStamp: '#8b0000',     // Blood red stamp
};
```

### Typography

```typescript
const TYPOGRAPHY = {
  // Cork board
  stickyNote: {
    fontFamily: '"Caveat", cursive',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  indexCard: {
    fontFamily: '"Courier New", monospace',
    fontSize: '12px',
    lineHeight: '1.5',
  },
  polaroidCaption: {
    fontFamily: '"Caveat", cursive',
    fontSize: '14px',
  },
  
  // Shop
  storeName: {
    fontFamily: '"Courier New", monospace',
    fontSize: '24px',
    letterSpacing: '2px',
  },
  itemName: {
    fontFamily: '"Caveat", cursive',
    fontSize: '16px',
  },
  priceTag: {
    fontFamily: '"Caveat", cursive',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closedStamp: {
    fontFamily: 'Impact, sans-serif',
    fontSize: '48px',
    letterSpacing: '4px',
  },
};
```

---

## Success Criteria

### Visual Polish

- [ ] Cork board looks like a real detective investigation board
- [ ] Red strings create compelling visual web pattern
- [ ] Shop looks like a vintage paranormal supply store
- [ ] All elements use analog horror aesthetic consistently
- [ ] Transitions are smooth and professional

### Judge Impact

- [ ] "Wow" reaction when swiping to cork board
- [ ] Demonstrates attention to detail and polish
- [ ] Shows depth beyond core gameplay
- [ ] Feels like a complete, thought-out experience
- [ ] Memorable visual presentation

### Technical Quality

- [ ] No jank or stuttering during transitions
- [ ] Swipe gestures feel natural and responsive
- [ ] Works smoothly on mobile devices
- [ ] No layout issues on different screen sizes
- [ ] Minimal performance impact on map rendering

---

## Future Enhancements (Post-Hackathon)

1. **Cork Board**:
   - Connect to real investigation history
   - Tap Polaroids to view case details
   - Add/remove strings dynamically
   - Animate string drawing

2. **Shop**:
   - Implement purchase functionality
   - Add item descriptions on tap
   - Show player currency
   - Add shopping cart

3. **Navigation**:
   - Add page indicators (dots)
   - Swipe velocity-based transitions
   - Parallax effects during swipe
   - Haptic feedback on navigation

4. **Additional Views**:
   - Stats/achievements view
   - Social/leaderboard view
   - Settings view
