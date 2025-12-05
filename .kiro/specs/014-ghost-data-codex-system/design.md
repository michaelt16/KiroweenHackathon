# Design Document

## Overview

This design document outlines the **Ghost Data & Codex System** - the foundational data layer and UI for all ghost types in Ghost Hunt. The system consists of three main components:

1. **Ghost Data Store** - Centralized, type-safe storage for all 7 ghost behavioral profiles
2. **Codex UI** - (/codex) Analog horror-styled encyclopedia for viewing ghost information
3. **Field Journal System** - (/field-journals) First-person horror narratives from previous agents that provide gameplay hints

This system serves as the foundation for Spec 015 (Investigation Tools) and must be completed first.

---

## Architecture

### High-Level Component Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Ghost Data Store                      │
│  (Single source of truth for all ghost properties)      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ├──────────────────┬──────────────────┐
                  ▼                  ▼                  ▼
         ┌────────────────┐  ┌──────────────┐  ┌──────────────┐
         │  Codex Screen  │  │ Investigation│  │  Deduction   │
         │      UI        │  │    Tools     │  │   System     │
         └────────────────┘  └──────────────┘  └──────────────┘
```

### Data Flow

1. **Initialization**: Ghost data loads on app start
2. **Query**: Components request ghost data via hooks/context
3. **Display**: Codex renders ghost info with locked/unlocked states
4. **Investigation**: Tools query active ghost's behavioral profile
5. **Unlock**: Successful identification unlocks ghost in Evidence Tab

---

## Components and Interfaces

### ⚠️ Important: Existing UI Components

**The following UI components ALREADY EXIST and should be updated, not recreated:**

1. **`src/screens/CodexScreen.tsx`** ✅ - Displays ghost encyclopedia
2. **`src/screens/FieldJournalsScreen.tsx`** ✅ - Displays field journals with pagination
3. **`src/components/Codex/GhostCodex.tsx`** ✅ - Wood table wrapper
4. **`src/components/Codex/GhostCodexContent.tsx`** ✅ - Manila folder content

**This spec focuses on:**
- Creating the Ghost Data Store
- Populating ghost data with all 7 profiles
- Connecting existing UI to the new data store
- Writing field journal stories for each ghost

---

### 1. Ghost Data Store (NEW)

**Location**: `src/stores/ghostStore.ts`

**Purpose**: Centralized state management for all ghost data

**Implementation**: Zustand store (already used in project)

```typescript
interface GhostStore {
  ghosts: Record<GhostType, GhostData>;
  unlockedGhosts: Set<GhostType>;
  
  // Queries
  getGhost: (type: GhostType) => GhostData;
  isUnlocked: (type: GhostType) => boolean;
  getAllGhosts: () => GhostData[];
  
  // Mutations
  unlockGhost: (type: GhostType) => void;
  
  // For investigation tools
  getActiveGhostBehavior: () => GhostBehavior | null;
}
```

---

### 2. Codex Screen Integration (UPDATE EXISTING)

**Location**: `src/screens/CodexScreen.tsx` ✅ Already exists

**Current State**: 
- Uses `<GhostCodex>` wrapper (wood table background)
- Uses `<GhostCodexContent>` for manila folder display
- Already has analog horror styling

**Required Changes**:
- Import and use `useGhostStore()` hook
- Map over all 7 ghosts from store
- Display locked/unlocked states
- Show silhouettes for locked ghosts
- Add navigation to ghost detail view

**What to Display in Codex**:
- Ghost name and threat level
- Polaroid photo (if unlocked)
- Description
- Characteristics
- Tool reactions (EMF, Camera, Thermal)

**What NOT to Display in Codex**:
- ❌ Field journal stories - These belong in the separate Field Journals screen (/field-journals)
- The Codex is an encyclopedia of ghost types
- Field Journals are separate narrative entries from previous agents



---

### 3. Field Journals Integration (UPDATE EXISTING)

**Location**: `src/screens/FieldJournalsScreen.tsx` ✅ Already exists

**Current State**:
- Uses `<EvidencePage>` template with heavy damage
- Displays journal entries with pagination
- Uses `<HandwrittenText>`, `<TypewrittenText>`, `<PolaroidPhoto>`
- Already has analog horror styling

**Required Changes**:
- Import and use `useGhostStore()` hook
- Convert each ghost's `fieldJournal` to a `JournalEntry`
- Only show journals for unlocked ghosts
- Update `JournalEntry` type to match `GhostData.fieldJournal` structure
- Map ghost field journals to existing journal display format



---

## Data Models

### GhostType Enum

```typescript
enum GhostType {
  WRAITH = 'wraith',
  SHADE = 'shade',
  POLTERGEIST = 'poltergeist',
  BANSHEE = 'banshee',
  PHANTOM = 'phantom',
  ONYX = 'onyx',
  TRICKSTER = 'trickster',
}
```

---

### EMFPersonality Enum

```typescript
enum EMFPersonality {
  CALM = 'calm',           // Consistent, smooth
  UNSTABLE = 'unstable',   // Chaotic ±1 jitter
  SHY = 'shy',             // Reads lower until close
  AGGRESSIVE = 'aggressive', // Spikes early
  MISCHIEVOUS = 'mischievous', // Oscillating sin-wave
}
```

---

### SpiritBoxSignature Type

```typescript
interface SpiritBoxSignature {
  knobA: number;  // 0.0 - 1.0 (carrier frequency target)
  knobB: number;  // 0.0 - 1.0 (modulation frequency target)
  tolerance: number; // Universal: 0.06 for all ghosts (MVP)
}

// MVP: All ghosts use same tolerance (0.06)
// Tuning difficulty does NOT identify ghost type
// The WORDS are the evidence, not the tuning behavior
// Audio effects (whisper, static, etc.) are post-MVP polish
```

---

### CameraManifestationType Enum

```typescript
enum CameraManifestationType {
  FAINT_SILHOUETTE = 'faint_silhouette',
  MOTION_BLUR = 'motion_blur',
  SCREAMING_FACE = 'screaming_face',
  DEEP_SHADOW = 'deep_shadow',
  INVISIBLE = 'invisible',
  FAINT_GLITCH = 'faint_glitch',
  SHADOW_SILHOUETTE = 'shadow_silhouette',
  GLITCH_STREAKS = 'glitch_streaks',
  HALF_FORMED_BODY = 'half_formed_body',
}
```



---

### ThermalReading Enum

```typescript
enum ThermalReading {
  NORMAL = 'normal',       // Ambient temp
  COLD_SPOT = 'cold_spot', // Chill zone
  DEEP_COLD = 'deep_cold', // <8°C
}
```

---

### WordFamily Type

```typescript
interface WordFamily {
  emotion: string[];  // e.g., ['soft', 'lost', 'cold']
  theme: string[];    // e.g., ['behind', 'mine', 'playful']
}
```

---

### GhostData Interface (Complete)

```typescript
interface GhostData {
  id: GhostType;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  difficulty: 'EASIEST' | 'EASY' | 'MEDIUM' | 'HARD' | 'HARDEST';
  
  // Behavioral Profile
  emfPersonality: EMFPersonality;
  spiritBoxSignature: SpiritBoxSignature;
  wordFamilies: WordFamily; // Emotion + Theme families
  cameraManifestations: {
    primary: CameraManifestationType;
    secondary?: CameraManifestationType;
    probability: number; // 0.0 - 1.0
  }[];
  thermalReading: ThermalReading;
  
  // Display Data
  description: string; // Short description
  characteristics: string[]; // Bullet points
  
  // Field Journal
  fieldJournal: {
    agentName: string;
    date: string;
    story: string; // Multi-paragraph horror story
    fate: 'escaped' | 'traumatized' | 'missing' | 'deceased';
  };
  
  // Unlock State
  isUnlocked: boolean;
  encounterCount: number;
  
  // Visual
  imageUrl?: string; // Polaroid photo (if unlocked)
  silhouetteUrl: string; // Locked state image
}
```



---

## Ghost Profiles (Complete Data)

**⚠️ MVP Simplification**: 
- All ghosts use universal tuning tolerance (0.06)
- Audio effects (whisper, static, reverse speech) removed for MVP
- Only target frequencies (knobA, knobB) and word families matter
- Words are the evidence, not tuning behavior or audio style

### Ghost 1: Wraith

```typescript
const WRAITH: GhostData = {
  id: GhostType.WRAITH,
  name: 'Wraith',
  threatLevel: 'HIGH',
  difficulty: 'EASIEST',
  
  emfPersonality: EMFPersonality.CALM,
  spiritBoxSignature: {
    knobA: 0.35,
    knobB: 0.72,
    tolerance: 0.06, // Universal tolerance
  },
  wordFamilies: {
    emotion: ['soft', 'lost', 'cold'],
    theme: ['drift', 'fade', 'whisper'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.FAINT_SILHOUETTE, probability: 0.8 },
    { primary: CameraManifestationType.INVISIBLE, probability: 0.2 },
  ],
  thermalReading: ThermalReading.NORMAL,
  
  description: 'A fast-moving spirit that leaves barely a trace.',
  characteristics: [
    'Very fast movement',
    'Difficult to photograph',
    'Calm electromagnetic signature',
    'Weak vocal presence',
  ],
  
  fieldJournal: {
    agentName: 'K. Morrison',
    date: 'March 15th, 2019',
    story: `The readings were steady, almost too steady. My EMF meter barely flickered as I walked through the abandoned warehouse. I knew it was there - I could feel it watching.

When I finally got close enough to take a photo, I could barely make out a shape. Just a faint outline, like smoke caught in the flash. The image developed, and there it was - barely visible, but unmistakably there.

The Spirit Box picked up whispers. Soft. Lost. Cold. The words sent chills down my spine, but the entity never felt aggressive. It was just... there. Watching. Waiting.

I got out before my sanity broke. Some of us aren't so lucky.`,
    fate: 'escaped',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/wraith-silhouette.png',
};
```



---
### Ghost 2:hade

```typescript
const SHADE: GhostData = {
  id: GhostType.SHADE,
  name: 'Shade',
  threatLevel: 'MEDIUM',
  difficulty: 'EASY',
  
  emfPersonality: Ety.SHY,
  spiritBoxSignature: {
    type: 'hidden_modulation',
    knobA: 0.50, // Doesn't matter
    knobB: 0.45, // Only this matters
    tolerance: 0.12,
  },
  wordFamily: {
    emotion: ['silent', 'unknown', 'stay'],
    theme: ['hide', 'shadow', 'watch'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.HALF_FORMED_BODY, probability: 0.7 },
    { primary: CameraManifestationType.FAINT_SILHOUETTE, probability: 0.3 },
  ],
  thermalReading: ThermalReading.NORMAL,
  
  description: 'A shy entity that avoids detection until you\'re very close.',
  characteristics: [
    'Elusive presence',
    'Difficult to detect at distance',
    'Partially visible in photos',
    'Prefers to remain hidden',
  ],
  
  fieldJournal: {
    agentName: 'T. Chen',
    date: 'July 3rd, 2020',
    story: `It took me hours to find it. My EMF meter stayed low, barely registering anything even when I knew I was in the right area. I had to get uncomfortably close before the readings spiked.

The Spirit Box took forever to tune. I had to adjust both knobs carefully until the static cleared. Once I locked the signal, the words came through: "Silent. Unknown. Stay."

When I finally photographed it, the image showed a half-formed body. Not quite solid, not quite transparent. Like it was caught between worlds, trying to hide even from the camera.

I left quickly. Something about its reluctance to be seen made me deeply uncomfortable. What is it hiding from?`,
    fate: 'escaped',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/shade-silhouette.png',
};
```



---

### Ghost 3: Poltergeist

```typescript
const POLTERGEIST: GhostData = {
  id: GhostType.POLTERGEIST,
  name: 'Poltergeist',
  threatLevel: 'HIGH',
  difficulty: 'MEDIUM',
  
  emfPersonality: EMFPersonality.UNSTABLE,
  spiritBoxSignature: {
    type: 'static_peaks',
    knobA: 0.62,
    knobB: 0.38,
    tolerance: 0.18,
  },
  wordFamily: {
    emotion: ['noisy', 'chaotic', 'mine'],
    theme: ['break', 'throw', 'chaos'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.MOTION_BLUR, probability: 0.75 },
    { primary: CameraManifestationType.GLITCH_STREAKS, probability: 0.25 },
  ],
  thermalReading: ThermalReading.COLD_SPOT,
  
  description: 'A chaotic entity known for erratic behavior and object manipulation.',
  characteristics: [
    'Highly unstable readings',
    'Erratic movement patterns',
    'Cold spots appear suddenly',
    'Aggressive toward equipment',
  ],
  
  fieldJournal: {
    agentName: 'R. Patel',
    date: 'November 22nd, 2018',
    story: `The EMF meter went haywire. One second it was at 2, the next it spiked to 5, then dropped to 1. I couldn't get a stable reading. The entity was moving constantly, or the readings were just... wrong.

My thermal scanner picked up cold spots appearing and disappearing randomly. The temperature would plummet, then return to normal seconds later. No pattern. No logic.

When I tried to photograph it, the image came out as pure motion blur. Like it was moving so fast the camera couldn't capture it. The Spirit Box cut through the chaos with words: "Noisy. Chaotic. Mine."

Equipment started malfunctioning. My flashlight flickered. The EMF meter's display glitched. I got out before it could do worse.`,
    fate: 'escaped',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/poltergeist-silhouette.png',
};
```



---

### Ghost 4: Banshee

```typescript
const BANSHEE: GhostData = {
  id: GhostType.BANSHEE,
  name: 'Banshee',
  threatLevel: 'EXTREME',
  difficulty: 'HARD',
  
  emfPersonality: EMFPersonality.AGGRESSIVE,
  spiritBoxSignature: {
    type: 'dual_precision',
    knobA: 0.28,
    knobB: 0.91,
    tolerance: 0.08, // Very precise
  },
  wordFamily: {
    emotion: ['anger', 'sorrow', 'leave'],
    theme: ['scream', 'wail', 'death'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.SCREAMING_FACE, probability: 0.85 },
    { primary: CameraManifestationType.DEEP_SHADOW, probability: 0.15 },
  ],
  thermalReading: ThermalReading.COLD_SPOT,
  
  description: 'An aggressive spirit driven by intense emotion and rage.',
  characteristics: [
    'Extremely aggressive behavior',
    'EMF spikes even at distance',
    'Terrifying visual manifestations',
    'Emotionally overwhelming presence',
  ],
  
  fieldJournal: {
    agentName: 'M. O\'Brien',
    date: 'October 31st, 2017',
    story: `I knew something was wrong the moment I entered. My EMF meter spiked to 4 before I was even close. This thing was aggressive, announcing its presence like a warning.

The Spirit Box required perfect tuning. Both knobs had to be exactly right, or I got nothing. When I tuned the Spirit Box, the words hit me like a physical force: "Anger. Sorrow. Leave."

I should have listened.

When I took the photo, I saw its face. A screaming, anguished face frozen in the flash. The image burned into my mind. I can still see it when I close my eyes.

The cold was unbearable. My breath came out in clouds. The temperature dropped so fast my hands went numb.

I ran. I'm not ashamed to admit it. Some entities you don't investigate - you survive them.`,
    fate: 'traumatized',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/banshee-silhouette.png',
};
```



---

### Ghost 5: Phantom

```typescript
const PHANTOM: GhostData = {
  id: GhostType.PHANTOM,
  name: 'Phantom',
  threatLevel: 'HIGH',
  difficulty: 'HARD',
  
  emfPersonality: EMFPersonality.CALM,
  spiritBoxSignature: {
    type: 'reverse_speech',
    knobA: 0.18,
    knobB: 0.67,
    tolerance: 0.14,
  },
  wordFamily: {
    emotion: ['hollow', 'gone', 'cold'],
    theme: ['void', 'empty', 'nothing'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.INVISIBLE, probability: 0.95 },
    { primary: CameraManifestationType.FAINT_GLITCH, probability: 0.05 },
  ],
  thermalReading: ThermalReading.DEEP_COLD,
  
  description: 'An uncanny entity that refuses to be photographed and brings extreme cold.',
  characteristics: [
    'Nearly impossible to photograph',
    'Extreme temperature drops',
    'Calm but unsettling presence',
    'Speaks in reverse',
  ],
  
  fieldJournal: {
    agentName: 'L. Kowalski',
    date: 'January 8th, 2021',
    story: `The cold hit me first. Not just cold - bone-deep, unnatural cold. My thermal scanner read 4°C, then 2°C, then below zero. My breath turned to fog instantly.

The EMF readings were steady, almost peaceful. But there was nothing peaceful about this entity.

I took seven photos. Seven. Every single one came back blank. Just the empty room, as if nothing was there. But I could feel it. The weight of its presence was suffocating.

The Spirit Box picked up words through the static: "Hollow. Gone. Cold." The voice was wrong. Inhuman. Empty.

On my eighth photo, I caught a faint glitch in the corner. Just a flicker. Proof it was there, refusing to be seen.

I left before hypothermia set in. My fingers were blue. The cold followed me for days.`,
    fate: 'traumatized',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/phantom-silhouette.png',
};
```



---

### Ghost 6: Onyx

```typescript
const ONYX: GhostData = {
  id: GhostType.ONYX,
  name: 'Onyx',
  threatLevel: 'EXTREME',
  difficulty: 'HARD',
  
  emfPersonality: EMFPersonality.SHY,
  spiritBoxSignature: {
    type: 'low_frequency_hum',
    knobA: 0.12,
    knobB: 0.23,
    tolerance: 0.16,
  },
  wordFamily: {
    emotion: ['deep', 'below', 'hungry'],
    theme: ['dark', 'consume', 'abyss'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.SHADOW_SILHOUETTE, probability: 0.8 },
    { primary: CameraManifestationType.DEEP_SHADOW, probability: 0.2 },
  ],
  thermalReading: ThermalReading.DEEP_COLD,
  
  description: 'A psychology-heavy entity associated with depths and shadows.',
  characteristics: [
    'Difficult to detect until very close',
    'Manifests as pure shadow',
    'Extreme cold presence',
    'Subterranean associations',
  ],
  
  fieldJournal: {
    agentName: 'S. Nakamura',
    date: 'April 17th, 2019',
    story: `The basement felt wrong. Not just dark - oppressively dark, like the shadows were thicker than they should be.

My EMF meter barely registered anything until I was almost on top of it. Then it spiked hard. This entity didn't want to be found.

The Spirit Box was difficult to tune. When I finally locked the signal, the words came through: "Deep. Below. Hungry."

The temperature was arctic. My thermal scanner showed 6°C, then 3°C. The cold seemed to rise from the ground itself, like something was pulling heat down into the earth.

When I photographed it, the image showed a shadow. Not a shadow cast by something - the shadow WAS the thing. A silhouette of pure darkness, denser than the surrounding gloom.

I felt it watching me from below. Waiting. I didn't go back down those stairs.`,
    fate: 'escaped',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/onyx-silhouette.png',
};
```



---

### Ghost 7: Trickster

```typescript
const TRICKSTER: GhostData = {
  id: GhostType.TRICKSTER,
  name: 'Trickster',
  threatLevel: 'HIGH',
  difficulty: 'HARDEST',
  
  emfPersonality: EMFPersonality.MISCHIEVOUS,
  spiritBoxSignature: {
    type: 'chaotic_modulation',
    knobA: 0.48,
    knobB: 0.60,
    tolerance: 0.10,
    driftRate: 0.02, // Lock drifts over time
  },
  wordFamily: {
    emotion: ['playful', 'teasing', 'behind'],
    theme: ['trick', 'game', 'mine', 'fun'],
  },
  cameraManifestations: [
    { primary: CameraManifestationType.GLITCH_STREAKS, probability: 0.7 },
    { primary: CameraManifestationType.MOTION_BLUR, probability: 0.3 },
  ],
  thermalReading: ThermalReading.COLD_SPOT,
  
  description: 'The most challenging entity - deceptive, playful, and maddening.',
  characteristics: [
    'Oscillating EMF patterns',
    'Spirit Box signal drifts',
    'Unpredictable behavior',
    'Enjoys manipulating investigators',
  ],
  
  fieldJournal: {
    agentName: 'D. Martinez',
    date: 'September 9th, 2020',
    story: `It was playing with me from the start. My EMF meter readings oscillated in a perfect sine wave. Up, down, up, down. Too perfect. Too deliberate.

The Spirit Box gave me words through the static: "Playful. Teasing. Behind." It felt like it was mocking me.

Every photo came out as glitch streaks, like it was moving just as I pressed the shutter. Or maybe it was interfering with the camera itself. I couldn't tell what was real anymore.

Cold spots appeared behind me. Always behind me. I'd turn around and they'd be gone. The thermal scanner showed them moving, circling, playing a game I didn't understand.

Through the Spirit Box, between the drifts, I heard: "Behind. Mine. Fun."

I left when I realized I was laughing. Not because anything was funny - because I was losing my mind. That's what it wanted.`,
    fate: 'traumatized',
  },
  
  isUnlocked: false,
  encounterCount: 0,
  silhouetteUrl: '/assets/ghosts/trickster-silhouette.png',
};
```



---

## Error Handling

### Ghost Data Validation

```typescript
function validateGhostData(ghost: GhostData): ValidationResult {
  const errors: string[] = [];
  
  // Ensure deduction overlap
  if (isUniquelyIdentifiable(ghost)) {
    errors.push(`${ghost.name} can be uniquely identified by a single trait`);
  }
  
  // Validate Spirit Box frequencies
  if (ghost.spiritBoxSignature.knobA < 0 || ghost.spiritBoxSignature.knobA > 1) {
    errors.push(`${ghost.name} has invalid knobA frequency`);
  }
  
  // Validate camera manifestation probabilities
  const totalProbability = ghost.cameraManifestations.reduce(
    (sum, m) => sum + m.probability, 0
  );
  if (Math.abs(totalProbability - 1.0) > 0.01) {
    errors.push(`${ghost.name} camera probabilities don't sum to 1.0`);
  }
  
  return { valid: errors.length === 0, errors };
}
```

### Codex Error States

- **No ghosts unlocked**: Show "Investigate ghosts to unlock entries"
- **Ghost data missing**: Show error message, log to console
- **Image load failure**: Show placeholder silhouette
- **Field journal missing**: Show "Journal entry unavailable"

---

## Testing Strategy

### Unit Tests

1. **Ghost Data Validation**
   - Test each ghost profile is valid
   - Test deduction overlap rules
   - Test probability sums

2. **Codex Display**
   - Test locked/unlocked states render correctly
   - Test ghost list displays all 7 types
   - Test detail view shows correct data

3. **Field Journal Rendering**
   - Test handwritten text styling
   - Test multi-paragraph formatting
   - Test agent name and date display

### Integration Tests

1. **Unlock Flow**
   - Test ghost unlocks after successful identification
   - Test Codex updates immediately
   - Test unlock persists across sessions

2. **Ghost Behavior API**
   - Test tools can query active ghost
   - Test EMF personality returns correct pattern
   - Test Spirit Box returns correct frequencies

---

## Performance Considerations

### Data Loading

- Ghost data loaded once on app start
- Stored in Zustand for fast access
- No network requests (all data bundled)

### Image Optimization

- Polaroid images: WebP format, <100KB each
- Silhouettes: SVG or small PNG, <20KB each
- Lazy load images in Codex list

### Codex Rendering

- Virtualized list for ghost entries (if >20 ghosts in future)
- Memoize ghost cards to prevent re-renders
- Debounce search/filter if added later

---

**Status**: Design Complete
**Next Step**: Create tasks.md for implementation
