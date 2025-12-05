# Design Document

## Overview

This design document outlines the **Investigation Tools & Ghost Interaction System** - connecting existing tool UI components to the Ghost Data Store (Spec 014) and implementing the behavior logic that makes them functional.

**⚠️ CRITICAL: This spec is about WIRING, not UI creation**

All investigation tool UI already exists and is beautifully styled (Specs 009, 012, 013):
- ✅ `RadarTool.tsx` - Complete with CRT display, bezel, damage
- ✅ `EMFTool.tsx` - Complete with LED matrix, heavy steel casing
- ✅ `CameraTool.tsx` - Complete with Polaroid viewfinder, shutter button
- ✅ `SpiritBoxTool.tsx` - Complete with oscilloscope, waveform display
- ✅ `ThermalTool.tsx` - Complete with thermal gradient, FLIR styling
- ✅ `FieldKitDrawer.tsx` - Complete with tabs, worn bag aesthetic
- ✅ `DevModeControls.tsx` - Complete with movement controls

**This spec focuses on:**
1. Connecting tools to Ghost Data Store
2. Implementing tool behavior logic (EMF personalities, Spirit Box tuning, Camera manifestations)
3. Wiring up Dev Mode controls
4. Implementing evidence logging
5. Enabling camera cooldown mechanics

---

## Architecture

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Ghost Data Store                      │
│              (Spec 014 - Already Complete)               │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ├──────────────────┬──────────────────┬──────────────────┐
                  ▼                  ▼                  ▼                  ▼
         ┌────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
         │  Investigation │  │   Dev Mode   │  │   Evidence   │  │    Camera    │
         │  Context/Store │  │   Controls   │  │   Logging    │  │   Cooldown   │
         └────────┬───────┘  └──────────────┘  └──────────────┘  └──────────────┘
                  │
                  │
         ┌────────▼─────────────────────────────────────────┐
         │     useGhostRelationship Hook                     │
         │     (Centralized Calculation System)             │
         │     - distance                                    │
         │     - bearing                                    │
         │     - relativeBearing                            │
         │     - isInForwardCone                            │
         │     - ghostBehavior                              │
         │     - Updates automatically                      │
         └────────┬─────────────────────────────────────────┘
                  │
                  ├──────────────────┬──────────────────┬──────────────────┐
                  ▼                  ▼                  ▼                  ▼
         ┌────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
         │   RadarTool    │  │   EMFTool    │  │  CameraTool  │  │ SpiritBoxTool│
         │  (Existing UI) │  │ (Existing UI)│  │ (Existing UI)│  │ (Existing UI)│
         └────────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### Centralized Ghost Relationship System

**Key Architecture Decision**: All tools use a centralized `useGhostRelationship()` hook instead of calculating distance/bearing independently. This ensures:

- **Single Source of Truth**: All tools use the same calculation logic
- **Consistency**: No risk of different tools showing different values
- **Performance**: Calculations happen once, shared across components
- **Maintainability**: Fix bugs in one place, not multiple
- **Real GPS Ready**: When real GPS is added, just update the hook

**Hook Location**: `src/hooks/useGhostRelationship.ts`

**What it provides**:
- `distance`: Distance to ghost in meters (Haversine formula)
- `bearing`: Absolute bearing to ghost (0-360°, where 0° = North)
- `relativeBearing`: Relative to player heading (0-360°, where 0° = straight ahead)
- `isInForwardCone`: Whether ghost is within ±45° forward detection arc
- `ghostBehavior`: Complete ghost behavior profile (EMF personality, thermal reading, etc.)
- `ghostType`: Active ghost type (for reference)
- `isValid`: Whether positions are available

**All tools now use this hook**:
- ✅ RadarTool: Uses `relationship.bearing`, `relationship.relativeBearing`, `relationship.isInForwardCone`
- ✅ EMFTool: Uses `relationship.distance`, `relationship.ghostBehavior.emfPersonality`
- ✅ DebugOverlay: Uses `relationship.distance`, `relationship.bearing`, `relationship.relativeBearing`
- 🔄 CameraTool: Should use `relationship.distance`, `relationship.ghostBehavior.cameraManifestations`
- 🔄 ThermalTool: Should use `relationship.distance`, `relationship.ghostBehavior.thermalReading`

---

## End-to-End Flows

### 📸 Flow 1: Taking a Photo (Complete Journey)

**User Action**: Player presses shutter button on Camera

```
1. USER PRESSES SHUTTER BUTTON
   ↓
2. CameraTool.tsx → handleShutterClick()
   ↓
3. Check: Is camera locked? (isCameraLocked())
   ├─ YES → Show "DEVELOPING..." and exit
   └─ NO → Continue
   ↓
4. Get current investigation state from Investigation Store:
   - playerPosition: { lat: 40.7128, lng: -74.0060 }
   - ghostPosition: { lat: 40.7130, lng: -74.0062 }
   - activeGhostType: 'wraith'
   ↓
5. Calculate distance (haversine formula):
   - distance = 8.5 meters
   ↓
6. Get ghost data from Ghost Store:
   - ghostStore.getGhost('wraith')
   - Returns: { cameraManifestations: [...], ... }
   ↓
7. Call determineCameraManifest ation(distance, manifestations):
   - distance < 10m → 70% probability multiplier
   - Roll: 0.45
   - Result: 'faint_silhouette'
   ↓
8. Create photo entry:
   {
     id: 'photo-1701234567890-0.123',
     timestamp: 1701234567890,
     distance: 8.5,
     manifestation: 'faint_silhouette'
   }
   ↓
9. Store photo in Investigation Store:
   - investigationStore.photos.push(photoEntry)
   ↓
10. Lock camera for 7 seconds:
    - investigationStore.cameraLocked = true
    - investigationStore.cameraUnlockTime = Date.now() + 7000
    - setTimeout(() => unlock, 7000)
    ↓
11. Decrement film count:
    - investigationStore.filmCount -= 1
    ↓
12. Update UI:
    - CameraTool shows "DEVELOPING..." overlay
    - Shutter button disabled
    - Film counter shows 9 remaining
    ↓
13. Player opens Field Kit Drawer → Photos Tab
    ↓
14. PhotosTab.tsx reads from Investigation Store:
    - photos = investigationStore.photos
    - Maps over photos array
    ↓
15. Display photo in Polaroid frame:
    - Timestamp: "23:47:12"
    - Manifestation: "Faint Silhouette"
    - Distance: "8.5m"
    - Tape and rotation for authenticity
```

**Storage Location**: `investigationStore.photos[]` (in-memory Zustand store)

**Persistence**: Photos cleared when investigation ends (MVP). Future: localStorage or backend.

---

### 📡 Flow 2: EMF Reading (Real-Time Updates)

**User Action**: Player walks closer to ghost with EMF tool active

```
1. PLAYER MOVES (every 50ms update)
   ↓
2. Investigation Store updates:
   - playerPosition: { lat: 40.7129, lng: -74.0061 }
   ↓
3. EMFTool.tsx (useEffect hook, 800ms interval):
   ↓
4. Get current state:
   - playerPosition from Investigation Store
   - ghostPosition from Investigation Store
   - activeGhostType from Investigation Store
   ↓
5. Calculate distance:
   - distance = 5.2 meters
   ↓
6. Get ghost EMF personality from Ghost Store:
   - ghostStore.getGhost('wraith')
   - Returns: { emfPersonality: 'calm', ... }
   ↓
7. Call calculateEMFLevel(distance, personality):
   - distance = 5.2m → baseLevel = 4 (3-6m range)
   - personality = 'calm' → noise = 0
   - finalLevel = 4
   ↓
8. Update EMFTool display:
   - LED columns 1-4 light up green/yellow
   - Column 5 stays dark
   ↓
9. Check if level >= 4 (photo-worthy):
   - YES → Log to evidence
   ↓
10. Create evidence entry:
    {
      id: 'evidence-1701234567890-0.456',
      timestamp: 1701234567890,
      type: 'emf',
      data: {
        level: 4,
        personality: 'calm',
        distance: 5.2
      }
    }
    ↓
11. Store in Investigation Store:
    - investigationStore.evidence.push(evidenceEntry)
    ↓
12. Player opens Field Kit Drawer → Evidence Tab
    ↓
13. EvidenceTab.tsx reads from Investigation Store:
    - evidence = investigationStore.evidence
    - Filters and groups by type
    ↓
14. Display evidence entry:
    - "23:47:15 - EMF SPIKE: Level 4"
    - "Distance: 5.2m"
    - "Pattern: Calm (consistent)"
```

**Storage Location**: `investigationStore.evidence[]` (in-memory Zustand store)

**Update Frequency**: 800ms (realistic meter response)

---

### 🎙️ Flow 3: Spirit Box Word (Player Interaction)

**User Action**: Player adjusts knobs to tune Spirit Box

```
1. PLAYER ADJUSTS KNOB A (slider input)
   ↓
2. SpiritBoxTool.tsx → setKnobA(0.36)
   - Local state: knobA = 0.36
   ↓
3. PLAYER ADJUSTS KNOB B (slider input)
   ↓
4. SpiritBoxTool.tsx → setKnobB(0.73)
   - Local state: knobB = 0.73
   ↓
5. useEffect hook (runs on knob change):
   ↓
6. Get active ghost from Investigation Store:
   - activeGhostType = 'wraith'
   ↓
7. Get ghost Spirit Box signature from Ghost Store:
   - ghostStore.getGhost('wraith')
   - Returns: { 
       spiritBoxSignature: { knobA: 0.35, knobB: 0.72, tolerance: 0.06 },
       wordFamilies: { emotion: ['soft', 'lost', 'cold'], theme: ['drift', 'fade', 'whisper'] }
     }
   ↓
8. Call checkSpiritBoxLock(0.36, 0.73, 0.35, 0.72, 0.06):
   - diffA = |0.36 - 0.35| = 0.01 ≤ 0.06 ✓
   - diffB = |0.73 - 0.72| = 0.01 ≤ 0.06 ✓
   - Result: LOCKED
   ↓
9. Display "SIGNAL LOCKED" on oscilloscope
   ↓
10. Call getRandomWord(wordFamilies):
    - allWords = ['soft', 'lost', 'cold', 'drift', 'fade', 'whisper']
    - Random pick: 'cold'
    ↓
11. Display word on oscilloscope:
    - "...cold..." (fades in/out over 3s)
    ↓
12. Create evidence entry:
    {
      id: 'evidence-1701234567891-0.789',
      timestamp: 1701234567891,
      type: 'spiritbox',
      data: {
        word: 'cold',
        frequency: { knobA: 0.36, knobB: 0.73 }
      }
    }
    ↓
13. Store in Investigation Store:
    - investigationStore.evidence.push(evidenceEntry)
    ↓
14. Player opens Evidence Tab:
    - "23:47:20 - SPIRIT BOX: 'cold'"
    - "Frequency: A=0.36, B=0.73"
```

**Storage Location**: `investigationStore.evidence[]`

**Knob State**: Local component state (not persisted)

---

### 🎮 Flow 4: Dev Mode Ghost Positioning

**User Action**: Developer sets ghost position for testing

```
1. DEVELOPER OPENS DEV MODE CONTROLS
   ↓
2. DevModeControls.tsx renders:
   - Ghost type dropdown
   - Distance slider (0-50m)
   - Bearing slider (0-360°)
   - "Randomize" button
   ↓
3. DEVELOPER SELECTS GHOST TYPE
   ↓
4. DevModeControls → onChange:
   - investigationStore.setActiveGhostType('banshee')
   ↓
5. DEVELOPER SETS DISTANCE = 12m
   ↓
6. DevModeControls → onChange:
   - Calculate ghost position from player position + distance + bearing
   - playerPosition = { lat: 40.7128, lng: -74.0060 }
   - bearing = 45° (northeast)
   - distance = 12m
   ↓
7. Convert to lat/lng offset:
   - latOffset = 12 * cos(45°) * (1/111000) = 0.000076
   - lngOffset = 12 * sin(45°) * (1/111000) = 0.000076
   ↓
8. Calculate ghost position:
   - ghostPosition = {
       lat: 40.7128 + 0.000076 = 40.712876,
       lng: -74.0060 + 0.000076 = -74.005924
     }
   ↓
9. Update Investigation Store:
   - investigationStore.setGhostPosition(ghostPosition)
   ↓
10. ALL TOOLS UPDATE AUTOMATICALLY:
    - RadarTool recalculates bearing
    - EMFTool recalculates distance → new EMF level
    - CameraTool uses new distance for manifestation probability
    - ThermalTool uses new distance for cold spot detection
    ↓
11. DevModeControls displays:
    - "Ghost: Banshee"
    - "Distance: 12.0m"
    - "Bearing: 45°"
```

**Storage Location**: `investigationStore.ghostPosition`, `investigationStore.activeGhostType`

**Update Propagation**: Automatic via Zustand subscriptions (all tools re-render)

---

### 🗂️ Flow 5: Viewing Evidence (Complete Investigation)

**User Action**: Player opens Evidence Tab to review all collected evidence

```
1. PLAYER OPENS FIELD KIT DRAWER
   ↓
2. FieldKitDrawer.tsx renders with tabs
   ↓
3. PLAYER CLICKS "EVIDENCE" TAB
   ↓
4. EvidenceTab.tsx mounts:
   ↓
5. Read from Investigation Store:
   - evidence = investigationStore.evidence
   - Returns array of 12 evidence entries
   ↓
6. Group evidence by type:
   - EMF readings: 4 entries
   - Spirit Box words: 3 entries
   - Thermal readings: 2 entries
   - Photos: 3 entries
   ↓
7. Sort by timestamp (chronological)
   ↓
8. Render evidence list:
   
   📊 EMF READINGS:
   - 23:45:12 - Level 2 (Calm pattern, 15.3m)
   - 23:46:05 - Level 3 (Calm pattern, 9.8m)
   - 23:46:45 - Level 4 (Calm pattern, 5.2m) ⚠️
   - 23:47:10 - Level 5 (Calm pattern, 2.1m) ⚠️
   
   🎙️ SPIRIT BOX:
   - 23:47:20 - "cold"
   - 23:48:05 - "soft"
   - 23:48:30 - "whisper"
   
   🌡️ THERMAL:
   - 23:46:50 - Normal (68°F, 5.5m)
   - 23:47:15 - Normal (68°F, 3.2m)
   
   📸 PHOTOS:
   - 23:47:12 - Faint Silhouette (8.5m)
   - 23:48:00 - Faint Silhouette (4.2m)
   - 23:48:45 - Nothing captured (12.0m)
   ↓
9. Player reviews evidence:
   - EMF: Calm personality → Wraith or Phantom
   - Spirit Box: "cold", "soft", "whisper" → Wraith words
   - Thermal: Normal → Wraith or Shade
   - Photos: Faint Silhouette → Wraith
   ↓
10. Player deduces: WRAITH
```

**Storage Location**: `investigationStore.evidence[]` (all evidence types in one array)

**Display**: Grouped by type, sorted chronologically, styled with analog horror components

### Investigation State Management

**New Store**: `src/stores/investigationStore.ts`

**Purpose**: Single source of truth for all investigation state

**What it stores**:
- **Ghost data**: Active ghost type, ghost position (lat/lng)
- **Player data**: Player position (lat/lng), player heading (0-360°)
- **Tool state**: Active tool, camera locked status, film count
- **Evidence**: All collected evidence entries (EMF, Spirit Box, Thermal, Photos)
- **Dev Mode**: Simulated positions for testing without GPS

**Why Zustand**: Same pattern as Ghost Store, reactive updates, easy to use in components

```typescript
interface InvestigationStore {
  // Active investigation state
  isActive: boolean;
  activeGhostType: GhostType | null;
  ghostPosition: { lat: number; lng: number } | null;
  playerPosition: { lat: number; lng: number } | null;
  playerHeading: number; // 0-360°
  
  // Dev Mode state
  devMode: {
    enabled: boolean;
    simulatedGhostPosition: { lat: number; lng: number } | null;
    simulatedPlayerPosition: { lat: number; lng: number } | null;
    simulatedPlayerHeading: number;
  };
  
  // Tool state
  activeTool: 'radar' | 'emf' | 'camera' | 'spiritbox' | 'thermal';
  cameraLocked: boolean;
  cameraUnlockTime: number | null;
  filmCount: number;
  
  // Evidence state (WHERE EVERYTHING IS STORED)
  evidence: EvidenceEntry[];  // ← All EMF, Spirit Box, Thermal evidence
  photos: PhotoEntry[];       // ← All captured photos
  
  // Actions
  startInvestigation: (ghostType: GhostType, position: { lat: number; lng: number }) => void;
  endInvestigation: () => void;
  updatePlayerPosition: (position: { lat: number; lng: number }) => void;
  updatePlayerHeading: (heading: number) => void;
  setActiveTool: (tool: string) => void;
  capturePhoto: () => void;
  logEvidence: (evidence: EvidenceEntry) => void;
  
  // Dev Mode actions
  enableDevMode: () => void;
  setSimulatedGhostPosition: (position: { lat: number; lng: number }) => void;
  setSimulatedPlayerPosition: (position: { lat: number; lng: number }) => void;
  setSimulatedPlayerHeading: (heading: number) => void;
}
```

**Key Point**: `evidence[]` and `photos[]` arrays are the **single source of truth** for all collected data. Every tool writes to these arrays, and Evidence/Photos tabs read from them.

---

## Components and Interfaces

### ⚠️ Important: Existing Components (UPDATE ONLY)

**All tool components already exist. We are UPDATING them, not creating new ones.**

---

### 1. Investigation Context/Store (NEW)

**Location**: `src/stores/investigationStore.ts`

**Purpose**: Centralized state for active investigation

**Implementation**: Zustand store (matches Ghost Data Store pattern)

**Key Responsibilities**:
- Track active ghost type and position
- Track player position and heading
- Manage tool state (active tool, camera cooldown)
- Store evidence and photos
- Handle Dev Mode simulation

**Note**: Ghost bearing and distance are calculated by `useGhostRelationship()` hook, not in the store.

---

### 1.5. Centralized Ghost Relationship Hook (NEW)

**Location**: `src/hooks/useGhostRelationship.ts`

**Purpose**: Single source of truth for all ghost relationship calculations

**Implementation**: React hook using `useMemo` for performance

**Key Responsibilities**:
- Calculate distance from player to ghost (Haversine formula)
- Calculate absolute bearing to ghost (0-360°, where 0° = North)
- Calculate relative bearing (where player is facing = 0°)
- Check if ghost is in forward detection cone (±45°)
- Fetch active ghost's behavior profile from Ghost Store
- Automatically recalculate when positions/heading/ghost type change

**Usage**:
```typescript
const relationship = useGhostRelationship();
if (relationship.isValid) {
  const emfLevel = calculateEMFLevel(
    relationship.distance,
    relationship.ghostBehavior.emfPersonality
  );
}
```

**Benefits**:
- All tools use the same calculation logic
- No duplicate distance/bearing calculations
- Automatic updates when positions change
- Type-safe access to ghost behavior

### 2. Tool Behavior Logic (NEW)

**Location**: `src/utils/toolBehaviors.ts`

**Purpose**: Calculate tool readings based on ghost data and player position

**Note**: These utilities work with data from `useGhostRelationship()` hook, not raw positions.

#### EMF Behavior

```typescript
function calculateEMFLevel(
  distance: number,
  personality: EMFPersonality
): number {
  // Base level from distance
  let baseLevel = 0;
  if (distance < 3) baseLevel = 5;
  else if (distance < 6) baseLevel = 4;
  else if (distance < 10) baseLevel = 3;
  else if (distance < 20) baseLevel = 2;
  else if (distance < 40) baseLevel = 1;
  
  // Add personality noise
  let noise = 0;
  switch (personality) {
    case 'calm':
      noise = 0; // Consistent
      break;
    case 'unstable':
      noise = Math.random() > 0.5 ? 1 : -1; // Chaotic jitter
      break;
    case 'shy':
      noise = distance > 5 ? -1 : 0; // Reads lower until close
      break;
    case 'aggressive':
      noise = distance > 10 ? 1 : 0; // Spikes early
      break;
    case 'mischievous':
      noise = Math.sin(Date.now() / 1000) > 0 ? 1 : -1; // Oscillating
      break;
  }
  
  // Clamp to 0-5
  return Math.max(0, Math.min(5, baseLevel + noise));
}
```

#### Spirit Box Behavior

```typescript
function checkSpiritBoxLock(
  knobA: number,
  knobB: number,
  targetA: number,
  targetB: number,
  tolerance: number = 0.06
): boolean {
  const diffA = Math.abs(knobA - targetA);
  const diffB = Math.abs(knobB - targetB);
  return diffA <= tolerance && diffB <= tolerance;
}

function getRandomWord(wordFamilies: WordFamily): string {
  const allWords = [...wordFamilies.emotion, ...wordFamilies.theme];
  return allWords[Math.floor(Math.random() * allWords.length)];
}
```

#### Camera Behavior

```typescript
function determineCameraManifest ation(
  distance: number,
  manifestations: GhostData['cameraManifestations']
): CameraManifestationType | null {
  // Distance affects probability
  let probabilityMultiplier = 1.0;
  if (distance < 5) probabilityMultiplier = 1.0; // 80-95% chance
  else if (distance < 10) probabilityMultiplier = 0.7; // 50-70% chance
  else probabilityMultiplier = 0.3; // 10-30% chance
  
  // Roll for manifestation
  const roll = Math.random();
  let cumulative = 0;
  
  for (const manifest of manifestations) {
    cumulative += manifest.probability * probabilityMultiplier;
    if (roll <= cumulative) {
      return manifest.primary;
    }
  }
  
  return null; // No manifestation (too far or unlucky)
}
```

#### Thermal Behavior

```typescript
function calculateThermalReading(
  distance: number,
  thermalCategory: ThermalReading
): { temperature: number; category: ThermalReading } {
  // Only show cold readings when close (<10m)
  if (distance > 10) {
    return { temperature: 68, category: 'normal' };
  }
  
  switch (thermalCategory) {
    case 'normal':
      return { temperature: 68, category: 'normal' };
    case 'cold_spot':
      return { temperature: 45, category: 'cold_spot' };
    case 'deep_cold':
      return { temperature: 32, category: 'deep_cold' };
  }
}
```

#### Radar Behavior

```typescript
function isGhostInForwardCone(
  ghostBearing: number,
  playerHeading: number,
  coneAngle: number = 45
): boolean {
  // Calculate angle difference
  let diff = Math.abs(ghostBearing - playerHeading);
  if (diff > 180) diff = 360 - diff;
  
  return diff <= coneAngle;
}

function addRadarWobble(bearing: number): number {
  // ±5° wobble
  return bearing + (Math.random() - 0.5) * 10;
}
```

---

### 3. Update Existing Tool Components (UPDATE)

**All tool components already exist. We are adding props and connecting to investigation store.**

#### RadarTool.tsx (UPDATE) ✅ COMPLETED

**Current State**: Has `mode` prop, displays mock data in view mode

**Completed Changes**:
- ✅ Import `useGhostRelationship()` hook
- ✅ In investigation mode, use `relationship.bearing`, `relationship.relativeBearing`, `relationship.isInForwardCone`
- ✅ Apply radar-specific wobble using `addRadarWobble()` utility
- ✅ Display ghost blip only when in forward cone (±45°)
- ✅ Display player heading and ghost bearing from relationship data

**No UI changes needed** ✅

---

#### EMFTool.tsx (UPDATE) ✅ COMPLETED

**Current State**: Has `mode` prop, displays mock EMF levels in view mode

**Completed Changes**:
- ✅ Import `useGhostRelationship()` hook
- ✅ In investigation mode, use `relationship.distance` and `relationship.ghostBehavior.emfPersonality`
- ✅ Calculate `emfLevel` using `calculateEMFLevel()` utility
- ✅ React to relationship changes (no setInterval needed)
- ✅ Display calculated EMF level with visual feedback

**No UI changes needed** ✅

---

#### CameraTool.tsx (UPDATE)

**Current State**: Has `mode` prop, `onCapture` callback

**Required Changes**:
- Import `useGhostRelationship()` hook
- In investigation mode, when shutter clicked:
  - Check if camera is locked (cooldown active)
  - If not locked, use `relationship.distance` and `relationship.ghostBehavior.cameraManifestations`
  - Call `determineCameraManifest ation()` utility
  - Lock camera for 7 seconds
  - Log photo to evidence store
  - Decrement film count
- Display "DEVELOPING..." when locked
- Disable shutter button when locked

**No UI changes needed** ✅

---

#### SpiritBoxTool.tsx (UPDATE)

**Current State**: Has `mode` prop, displays mock waveform

**Required Changes**:
- Import `useInvestigationStore()` and `useGhostStore()`
- Add knob controls (two sliders for Knob A and Knob B)
- In investigation mode:
  - Get ghost's Spirit Box signature from Ghost Data Store
  - Check if knobs are locked using `checkSpiritBoxLock()` utility
  - If locked, display "SIGNAL LOCKED" and output random word from ghost's word families
  - Log word to evidence store
- Display waveform based on static level

**Minor UI addition**: Two knob sliders (can be simple range inputs styled to match)

---

#### ThermalTool.tsx (UPDATE)

**Current State**: Has `mode` prop, displays mock thermal gradient

**Required Changes**:
- Import `useGhostRelationship()` hook
- In investigation mode:
  - Use `relationship.distance` and `relationship.ghostBehavior.thermalReading`
  - Calculate thermal reading using `calculateThermalReading()` utility
  - Display temperature and cold spots based on reading
- Log cold readings to evidence store

**No UI changes needed** ✅

---

### 4. Evidence Logging System (NEW)

**Location**: `src/utils/evidenceLogger.ts`

**Purpose**: Log evidence entries with timestamps

```typescript
interface EvidenceEntry {
  id: string;
  timestamp: number;
  type: 'emf' | 'spiritbox' | 'thermal' | 'photo';
  data: {
    // EMF
    level?: number;
    personality?: EMFPersonality;
    
    // Spirit Box
    word?: string;
    frequency?: { knobA: number; knobB: number };
    
    // Thermal
    temperature?: number;
    category?: ThermalReading;
    
    // Photo
    manifestation?: CameraManifestationType | null;
    distance?: number;
  };
}

function logEvidence(entry: Omit<EvidenceEntry, 'id' | 'timestamp'>): void {
  const fullEntry: EvidenceEntry = {
    ...entry,
    id: `evidence-${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
  };
  
  // Add to investigation store
  useInvestigationStore.getState().logEvidence(fullEntry);
}
```

---

### 5. Camera Cooldown System (NEW)

**Location**: `src/utils/cameraCooldown.ts`

**Purpose**: Manage 7-second camera lockout

```typescript
function lockCamera(): void {
  const store = useInvestigationStore.getState();
  store.cameraLocked = true;
  store.cameraUnlockTime = Date.now() + 7000;
  
  setTimeout(() => {
    store.cameraLocked = false;
    store.cameraUnlockTime = null;
  }, 7000);
}

function isCameraLocked(): boolean {
  const store = useInvestigationStore.getState();
  if (!store.cameraLocked) return false;
  
  // Check if cooldown expired
  if (store.cameraUnlockTime && Date.now() >= store.cameraUnlockTime) {
    store.cameraLocked = false;
    store.cameraUnlockTime = null;
    return false;
  }
  
  return true;
}

function getRemainingCooldown(): number {
  const store = useInvestigationStore.getState();
  if (!store.cameraUnlockTime) return 0;
  return Math.max(0, store.cameraUnlockTime - Date.now());
}
```

---

### 6. Dev Mode Integration (UPDATE)

**Location**: `src/components/Investigation/DevModeControls.tsx` ✅ Already exists

**Required Changes**:
- Connect to `useInvestigationStore()`
- Add ghost type selector dropdown
- Add ghost position controls (sliders for distance and bearing)
- Add "Randomize Position" button
- Display current ghost type, distance, bearing

**Minor UI additions**: Ghost type dropdown, position sliders

---

### 7. Evidence Tab (UPDATE)

**Location**: `src/components/Investigation/FieldKit/EvidenceTab.tsx` ✅ Already exists

**Required Changes**:
- Import `useInvestigationStore()`
- Display all logged evidence entries
- Format entries with timestamps
- Use analog horror styling (typewritten text, handwritten notes)
- Group by evidence type

**No UI changes needed** ✅ (just populate with real data)

---

### 8. Photos Tab (UPDATE)

**Location**: `src/components/Investigation/FieldKit/PhotosTab.tsx` ✅ Already exists

**Required Changes**:
- Import `useInvestigationStore()`
- Display all captured photos
- Show Polaroid-style frames with timestamps
- Display manifestation result (or "Nothing captured")
- Use tape and rotation for authentic feel

**No UI changes needed** ✅ (just populate with real data)

---

## Data Models

### Investigation State

```typescript
interface InvestigationState {
  isActive: boolean;
  activeGhostType: GhostType | null;
  ghostPosition: GPSPosition | null;
  playerPosition: GPSPosition | null;
  playerHeading: number;
  activeTool: ToolType;
  cameraLocked: boolean;
  cameraUnlockTime: number | null;
  filmCount: number;
  evidence: EvidenceEntry[];
  photos: PhotoEntry[];
}
```

### Dev Mode State

```typescript
interface DevModeState {
  enabled: boolean;
  simulatedGhostType: GhostType | null;
  simulatedGhostPosition: GPSPosition | null;
  simulatedPlayerPosition: GPSPosition | null;
  simulatedPlayerHeading: number;
  simulatedDistance: number;
  simulatedBearing: number;
}
```

### Evidence Entry

```typescript
interface EvidenceEntry {
  id: string;
  timestamp: number;
  type: 'emf' | 'spiritbox' | 'thermal' | 'photo';
  data: {
    level?: number;
    personality?: EMFPersonality;
    word?: string;
    frequency?: { knobA: number; knobB: number };
    temperature?: number;
    category?: ThermalReading;
    manifestation?: CameraManifestationType | null;
    distance?: number;
  };
}
```

### Photo Entry

```typescript
interface PhotoEntry {
  id: string;
  timestamp: number;
  distance: number;
  manifestation: CameraManifestationType | null;
  imageData?: string; // Optional: base64 image data (future)
}
```

---

## Error Handling

### Tool Behavior Errors

- **Invalid ghost type**: Log error, use default behavior
- **Missing ghost data**: Log error, display "NO SIGNAL"
- **Invalid distance**: Clamp to valid range (0-100m)
- **Invalid bearing**: Normalize to 0-360°

### Camera Errors

- **No film**: Disable shutter, display "NO FILM"
- **Camera locked**: Disable shutter, display "DEVELOPING..."
- **Capture failed**: Log error, don't lock camera

### Evidence Logging Errors

- **Storage full**: Log warning, remove oldest entries
- **Invalid entry**: Log error, skip entry

---

## Testing Strategy

### Unit Tests

1. **Tool Behavior Utilities**
   - Test EMF level calculation for all personalities
   - Test Spirit Box lock detection with various tolerances
   - Test Camera manifestation probability at different distances
   - Test Thermal reading calculation
   - Test Radar cone detection

2. **Evidence Logging**
   - Test evidence entry creation
   - Test timestamp generation
   - Test evidence storage

3. **Camera Cooldown**
   - Test camera lock/unlock
   - Test cooldown timer
   - Test remaining time calculation

### Integration Tests

1. **Tool → Store Integration**
   - Test tool reads from investigation store
   - Test tool writes to evidence store
   - Test tool responds to ghost data changes

2. **Dev Mode Integration**
   - Test simulated position updates
   - Test ghost type selection
   - Test distance/bearing calculation

---

## Performance Considerations

### Tool Update Frequency

- **Radar**: 20fps (50ms) - Smooth sweep animation
- **EMF**: 1.25fps (800ms) - Realistic meter response
- **Camera**: On-demand (shutter click)
- **Spirit Box**: 20fps (50ms) - Waveform animation
- **Thermal**: 20fps (50ms) - Scanline animation

### Evidence Storage

- Limit evidence entries to last 100 items
- Clear evidence when investigation ends
- Use efficient data structures (arrays, not objects)

### Camera Cooldown

- Use single setTimeout, not interval
- Clear timeout on investigation end
- Memoize cooldown calculations

---

## Success Criteria

**Functional (New Work)**:
- ✅ All tools connected to Ghost Data Store
- ✅ EMF displays correct levels based on distance and personality
- ✅ Spirit Box locks when knobs aligned, outputs ghost words
- ✅ Camera captures manifestations based on distance, locks for 7s
- ✅ Thermal displays correct readings based on distance and category
- ✅ Radar shows ghost blip only in forward cone
- ✅ Evidence Tab logs all evidence with timestamps
- ✅ Photos Tab displays captured photos
- ✅ Dev Mode allows testing without GPS
- ✅ Camera cooldown prevents rapid-fire photos

**Visual (Already Complete - No New Work)**:
- ✅ All tools use existing analog horror styling
- ✅ Tool drawer and tabs use existing styling
- ✅ Dev Mode controls use existing UI

---

**Status**: Design Complete
**Next Step**: Create tasks.md for implementation
