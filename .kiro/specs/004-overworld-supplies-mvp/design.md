# 📦 Overworld Supplies MVP — Design

## 1. System Overview

The Overworld Supplies system replaces the tool collection mechanic with a resource management system. Players collect consumable supplies that fuel their Field Scanner's effectiveness during investigations.

**Key Principle**: The Field Scanner and its modules are always available. Supplies enhance and enable specific features.

---

## 2. Data Structures

### Supplies Type

```typescript
interface Supplies {
  film: number;        // Camera flash ammo
  boosts: number;      // Clarity enhancement count
  charms: number;      // Sanity protection count
}

const STARTER_KIT: Supplies = {
  film: 3,
  boosts: 1,
  charms: 0,
};
```

### Supply Node Type

```typescript
interface SupplyNode {
  id: string;
  type: 'film' | 'boost' | 'charm';
  position: { lat: number; lng: number };
  amount: number;      // How much to grant
  rarity: 'common' | 'uncommon' | 'rare';
}
```

### Supply Pickup Amounts

```typescript
const SUPPLY_AMOUNTS = {
  film: { min: 3, max: 5 },
  boost: 1,
  charm: 1,
};
```

---

## 3. State Management

### Supplies Context

Create a new `SuppliesContext` to manage supply state:

```typescript
interface SuppliesContextType {
  supplies: Supplies;
  addFilm: (amount: number) => void;
  addBoost: () => void;
  addCharm: () => void;
  consumeFilm: () => boolean;  // Returns false if no film
  consumeBoost: () => void;
  consumeCharm: () => void;
  resetSupplies: () => void;
  maxSupplies: () => void;      // Dev mode
}
```

### LocalStorage Integration

**Key**: `ghost-hunt-supplies`

**Save Strategy**: Debounced writes (300ms) to avoid excessive I/O

**Load Strategy**: On app mount, read from localStorage or initialize with starter kit

```typescript
const saveSupplies = debounce((supplies: Supplies) => {
  localStorage.setItem('ghost-hunt-supplies', JSON.stringify(supplies));
}, 300);

const loadSupplies = (): Supplies => {
  const saved = localStorage.getItem('ghost-hunt-supplies');
  return saved ? JSON.parse(saved) : STARTER_KIT;
};
```

---

## 4. Map System Changes

### Supply Node Rendering

**Reuse Existing Infrastructure**: Repurpose `ToolMarker` component as `SupplyMarker`

**Visual Distinctions**:

| Supply Type | Icon | Glow Color | Glow Size | Rarity |
|-------------|------|------------|-----------|--------|
| Film | 🎞️ | `#3b82f6` (blue) | Small (20px) | Common |
| Boost | ⚡ | `#f59e0b` (amber) | Medium (30px) | Uncommon |
| Charm | 🔮 | `#a855f7` (purple) | Medium (30px) | Uncommon |

**CSS Glow Effect**:
```css
.supply-node {
  box-shadow: 0 0 var(--glow-size) var(--glow-color);
  animation: pulse 2s ease-in-out infinite;
}
```

### Supply Spawning

**MVP**: Fixed spawn locations (reuse existing tool spawn system)

**Spawn Distribution**:
- 60% Film (common)
- 20% Boosts (uncommon)
- 20% Charms (uncommon)

**Spawn Locations**: Cluster near starting area and hotspots

**Future-Ready**: Design allows for random spawns around player radius

---

## 5. Collection Flow

### Interaction Sequence

1. **Player approaches node** → Highlight + show collection radius
2. **Player taps node** → Open supply card modal
3. **Supply card displays**:
   - Supply icon (large)
   - Supply name
   - Amount to be collected
   - "Collect" button (enabled if in range)
4. **Player taps "Collect"**:
   - Add supplies to Field Kit
   - Remove node from map
   - Show toast: "+3 Film" (or appropriate message)
   - Save to localStorage
5. **Node disappears** from map

### Supply Card Component

```typescript
interface SupplyCardProps {
  supply: SupplyNode;
  inRange: boolean;
  onCollect: () => void;
  onClose: () => void;
}
```

**Mobile-First Design**:
- Bottom sheet modal
- Large tap targets
- Clear visual feedback
- Swipe-to-dismiss

---

## 6. Inventory UI Changes

### Backpack Menu Update

**Old Structure**:
```
Backpack
├── Inventory (Tool List)
└── Codex
```

**New Structure**:
```
Backpack
├── Field Kit (Supply Counts)
└── Codex
```

### Field Kit Display

```typescript
<div className="field-kit">
  <h2>Field Kit</h2>
  
  <div className="supply-item">
    <span className="icon">🎞️</span>
    <span className="label">Film</span>
    <span className="count">{supplies.film}</span>
  </div>
  
  <div className="supply-item">
    <span className="icon">⚡</span>
    <span className="label">Boosts</span>
    <span className="count">{supplies.boosts}</span>
  </div>
  
  <div className="supply-item">
    <span className="icon">🔮</span>
    <span className="label">Charms</span>
    <span className="count">{supplies.charms}</span>
  </div>
</div>
```

**Styling**:
- Glassmorphic cards
- Dimmed when count === 0
- Pulse animation when supplies are added

---

## 7. Investigation Integration

### Field Kit Sync on Entry

When player enters investigation:

```typescript
const syncFieldKit = (supplies: Supplies) => {
  // Apply boosts
  const clarityBonus = supplies.boosts > 0 ? 0.1 : 0;
  
  // Apply charms
  const sanityProtection = supplies.charms * 0.1;
  
  // Set available film
  const availableFilm = supplies.film;
  
  // Show toast
  showToast('Field Kit Synced', {
    film: availableFilm,
    boost: clarityBonus > 0 ? `+${clarityBonus * 100}% clarity` : 'None',
    charm: supplies.charms,
  });
  
  return { clarityBonus, sanityProtection, availableFilm };
};
```

### Boost Application

**Affects**:
- EMF spike intensity: `baseIntensity * (1 + clarityBonus)`
- Cold spot visibility: `baseOpacity * (1 + clarityBonus)`
- Audio clarity: Reduce noise floor by `clarityBonus * 100%`
- Whisper transcription: Higher confidence threshold

**Implementation**: Modify anomaly generation in `useGhostBehavior`

### Charm Application

**Affects**:
- Sanity drain rate: `baseDrain * (1 - (charms * 0.1))`
- Max reduction: 50% (5 charms)

**Implementation**: Modify sanity drain calculation

```typescript
const effectiveDrain = profile.sanityDrain * (1 - Math.min(0.5, charms * 0.1));
```

---

## 8. Camera Film System

### Film Counter UI

Add to camera tool UI:

```typescript
<div className="film-counter">
  <span className="icon">🎞️</span>
  <span className="count">{availableFilm}</span>
</div>
```

### Shutter Button Logic

```typescript
const handleShutter = () => {
  if (availableFilm <= 0) {
    showToast('No film left – collect more from supplies on the map', {
      type: 'warning',
      duration: 3000,
    });
    return;
  }
  
  // Take photo
  consumeFilm();
  triggerFlash();
  checkForSilhouette();
};
```

**Visual States**:
- `film > 0`: Normal button, white glow
- `film === 0`: Greyed out, red border, disabled cursor

---

## 9. Dev Mode Features

### Debug Panel Additions

```typescript
<div className="dev-supplies">
  <h3>Supplies (Dev)</h3>
  <div>Film: {supplies.film}</div>
  <div>Boosts: {supplies.boosts}</div>
  <div>Charms: {supplies.charms}</div>
  
  <button onClick={resetSupplies}>Reset to Starter Kit</button>
  <button onClick={maxSupplies}>Max All (99)</button>
</div>
```

### Dev Commands

```typescript
const resetSupplies = () => {
  localStorage.removeItem('ghost-hunt-supplies');
  setSupplies(STARTER_KIT);
};

const maxSupplies = () => {
  setSupplies({ film: 99, boosts: 99, charms: 99 });
};
```

---

## 10. Migration Strategy

### Removing Old Tool System

**Components to Update**:
- `ToolMarker.tsx` → Rename/repurpose as `SupplyMarker.tsx`
- `GameStateContext.tsx` → Remove `collectedTools` array
- `MapRootScreen.tsx` → Update node generation logic
- `InventoryScreen.tsx` → Replace tool list with Field Kit

**Data Migration**:
- No migration needed (fresh feature)
- Old `collectedTools` can be ignored/removed

**Backward Compatibility**:
- Not required (complete replacement)

---

## 11. Performance Considerations

### LocalStorage Optimization

- **Debounced writes**: 300ms delay
- **Minimal payload**: Only 3 numbers
- **Error handling**: Fallback to in-memory if localStorage fails

### Map Rendering

- **Reuse existing markers**: No performance impact
- **Supply nodes**: Same count as old tool nodes
- **Glow animations**: CSS-based, GPU-accelerated

---

## 12. Testing Strategy

### Unit Tests

- Supply context operations (add, consume, reset)
- LocalStorage save/load
- Film consumption logic
- Boost/charm effect calculations

### Integration Tests

- Collection flow (tap → collect → update)
- Investigation sync (supplies → effects)
- Camera film depletion
- Persistence across page reloads

### Manual Testing

- Collect each supply type
- Enter investigation with/without supplies
- Deplete film during investigation
- Verify localStorage persistence
- Test Dev Mode commands

---

## 13. UI/UX Polish

### Animations

- **Supply collection**: Scale up + fade out node
- **Toast notifications**: Slide in from top
- **Field Kit update**: Pulse effect on count change
- **Film depletion**: Shake camera button

### Sound Effects (Optional)

- Collection: Soft "ding"
- Film depletion: Camera click
- No film: Error beep

### Accessibility

- Clear labels for all supplies
- High contrast for depleted states
- Keyboard navigation support
- Screen reader announcements

---

## 14. Success Metrics

**For Hackathon Demo**:
- ✅ Supplies persist across page refresh
- ✅ Film system clearly demonstrates resource management
- ✅ Boosts/charms show visible effect
- ✅ UI is intuitive without explanation
- ✅ Dev Mode allows quick testing

**Technical Goals**:
- < 100ms localStorage operations
- No UI jank during collection
- Smooth animations at 60fps
- Mobile-responsive on all screens
