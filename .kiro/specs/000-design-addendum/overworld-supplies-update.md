# 📦 Overworld Supplies – Design Addendum

## 🎯 Purpose

Supplies collected on the overworld map fuel your **Field Scanner** during investigations. They replace the old "pick up tools" mechanic — the player always has a scanner, but supplies determine how effective it will be.

### The New Overworld Loop

1. **Explore** the real world (or Dev Mode)
2. **Collect Supplies** (Film, Boosts, Charms)
3. **Enter Investigation Mode** fully prepared
4. **Use scanner modules** with limited resources

This creates a **prep → hunt → deduce** loop consistent with ghost-hunting shows and Demonologist.

---

## 🧰 Supply Types

### 1. 🎞️ Film Rolls (Camera Ammo)

**Purpose**: Used for Camera Module (flash photos)

**Pickup Amount**: +3 to +5 film per pickup (mock values)

**Rare Variant**: "Cursed Film" → increases silhouette chance

---

### 2. ⚡ Scanner Boosts

**Purpose**: Applies to entire investigation

**Effects**:
- Clearer EMF spikes
- Stronger cold spots
- Less noise in static
- Clearer whisper transcription

**MVP Implementation**: Scanner Boost = simple % clarity buff

---

### 3. 🔮 Charms / Talismans

**Purpose**: Affects sanity & ghost aggression

**Effects**:
- Small sanity drain resistance
- Chance to avoid a ghost "distortion event"
- Reduces false positives

**MVP Implementation**: +10% sanity resistance

---

### 4. 🧿 Rare Artifacts (Optional for v2)

**Purpose**: Temporary upgraded modules

**Types**:
- **Strong EMF**: Enhanced electromagnetic detection
- **Thermal Lens**: Superior cold spot visibility
- **EVP Focus Crystal**: Crystal-clear audio capture

**Trade-off**: Has drawbacks (e.g., more false positives)

---

## 🗺️ Map Display

### Supply Nodes

Replace tool emoji markers with supply-specific icons:

| Supply | Map Icon | Rarity | Behavior |
|--------|----------|--------|----------|
| Film Roll | 🎞️ | Common | Small circular glow |
| Scanner Boost | ⚡ | Uncommon | Medium glow |
| Charm | 🔮 | Uncommon | Soft purple glow |
| Artifact | 🧿 | Rare | Pulsing aura |

> **Note**: Can be replaced with CSS circles or SVG icons for better performance

### Collection Interaction

All nodes use:
1. **Tap** to open supply card
2. **"Collect" button** (within radius)
3. **Adds to inventory** (supplies store)

---

## 🎒 Inventory Changes

### Old: Inventory
- Tool list

### New: Field Kit Prep

**Displays**:
- 🎞️ Film count
- ⚡ Boost count
- 🔮 Charm count
- 🧿 Artifacts (if any)

**Removed**: "Tool list" (scanner tools are default modules)

---

## 🔄 Overworld → Investigation Transition

### When Entering a Hotspot

**Supplies are applied**:
- **Film** = camera shots available
- **Boosts** = event clarity enhancement
- **Charms** = sanity stability
- **Artifacts** = scanner module buffs

### UI Feedback

**Toast Notification**: "Field Kit Synced"

**Quick Summary Display**:
```
Film: 3
Boost: +10% clarity
Charm: +1
```

---

## 💾 Data Structure (MVP)

### Supplies Type

```typescript
type Supplies = {
  film: number;
  boosts: number;
  charms: number;
};
```

### Artifacts (Optional)

```typescript
type Artifact = {
  id: string;
  effect: "strong_emf" | "thermal_plus" | "evp_focus";
  downside: string;
};
```

---

## 🎮 Gameplay Impact

### Before (003)
- Collect individual tools on map
- Tools are binary (have it or don't)
- No resource management

### After (004)
- Collect supplies that fuel scanner
- Limited resources create tension
- Strategic preparation before investigations
- More aligned with ghost-hunting media

---

## 📝 Implementation Notes

**Priority**: High - Changes core collection mechanic

**Affects**:
- Map markers and collection system
- Inventory UI
- Investigation mode initialization
- Game state management

**Backward Compatibility**: Replaces existing tool collection system
