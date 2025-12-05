import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ghostImages } from './ghostImages';
import {
  Q1_COMMON,
  Q1_AGGRESSIVE,
  Q1_SHY,
  Q1_CHAOTIC,
  Q1_UNIQUE,
  Q2_COMMON,
  Q2_AGGRESSIVE,
  Q2_SHY,
  Q2_CHAOTIC,
  Q2_UNIQUE,
  Q3_COMMON,
  Q3_AGGRESSIVE,
  Q3_SHY,
  Q3_CHAOTIC,
  Q3_UNIQUE,
} from '../data/spiritBoxWords';

// ============================================================================
// ENUMS
// ============================================================================

export enum GhostType {
  WRAITH = 'wraith',
  SHADE = 'shade',
  POLTERGEIST = 'poltergeist',
  BANSHEE = 'banshee',
  PHANTOM = 'phantom',
  ONYX = 'onyx',
  TRICKSTER = 'trickster',
}

export enum SpiritBoxPersonality {
  AGGRESSIVE = 'aggressive',  // Wraith, Onyx, Trickster - 70-80% response rate
  SHY = 'shy',                // Banshee, Shade - 30-40% response rate
  CHAOTIC = 'chaotic',        // Poltergeist, Phantom - 50-60% response rate
  CONTRADICTORY = 'contradictory', // Trickster only - uses all word pools
}

export enum CameraManifestationType {
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

export enum ThermalReading {
  NORMAL = 'normal',       // Ambient temp
  COLD_SPOT = 'cold_spot', // Chill zone
  DEEP_COLD = 'deep_cold', // <8°C
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface SpiritBoxSignature {
  knobA: number;  // 0.0 - 1.0 (carrier frequency target)
  knobB: number;  // 0.0 - 1.0 (modulation frequency target)
  tolerance: number; // Universal: 0.06 for all ghosts (MVP)
}

export interface WordPools {
  common: string[];           // 20-40% chance - all ghosts
  personality: string[];      // 50-60% chance - personality-specific
  unique: string[];           // 10-20% chance - ghost-specific
}

export interface QuestionWordPools {
  q1: WordPools;  // "What do you want?" (Intent/Motivation)
  q2: WordPools;  // "Where are you?" (Location/Presence)
  q3: WordPools;  // "Are you here?" (Confirmation/Proximity)
}

export interface ResponseBehavior {
  frequency: number;          // 0.3-0.8 (30-80% response rate)
  wordPools: QuestionWordPools;
  personality: SpiritBoxPersonality | SpiritBoxPersonality[]; // Can have multiple
}

// Legacy interface - kept for backward compatibility during migration
export interface WordFamily {
  emotion: string[];  // e.g., ['soft', 'lost', 'cold']
  theme: string[];    // e.g., ['drift', 'fade', 'whisper']
}

export interface CameraManifestation {
  primary: CameraManifestationType;
  secondary?: CameraManifestationType;
  probability: number; // 0.0 - 1.0
}

export interface FieldJournal {
  agentName: string;
  date: string;
  story: string; // Multi-paragraph horror story
  fate: 'escaped' | 'traumatized' | 'missing' | 'deceased';
}

// EMF Personality type (exported for use in other files)
export type EMFPersonality = 'calm' | 'unstable' | 'shy' | 'aggressive' | 'mischievous';

export interface GhostData {
  id: GhostType;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  difficulty: 'EASIEST' | 'EASY' | 'MEDIUM' | 'HARD' | 'HARDEST';
  
  // Behavioral Profile
  emfPersonality: EMFPersonality;
  spiritBoxSignature: SpiritBoxSignature;
  spiritBoxResponse: ResponseBehavior;  // NEW: Spirit Box word pools and response frequency
  wordFamilies: WordFamily;  // LEGACY: Kept for backward compatibility
  cameraManifestations: CameraManifestation[];
  thermalReading: ThermalReading;
  
  // Display Data
  description: string;
  characteristics: string[];
  
  // Field Journal
  fieldJournal: FieldJournal;
  
  // Unlock State
  isUnlocked: boolean;
  encounterCount: number;
  
  // Visual
  imageUrl?: string; // Polaroid photo (if unlocked)
  silhouetteUrl: string; // Locked state image
}

// ============================================================================
// GHOST BEHAVIOR API (for investigation tools)
// ============================================================================

export interface GhostBehavior {
  emfPersonality: EMFPersonality;
  spiritBoxSignature: SpiritBoxSignature;
  spiritBoxResponse: ResponseBehavior;  // NEW: Spirit Box behavior
  wordFamilies: WordFamily;  // LEGACY: Kept for backward compatibility
  cameraManifestations: CameraManifestation[];
  thermalReading: ThermalReading;
}

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface GhostStore {
  ghosts: Record<GhostType, GhostData>;
  unlockedGhosts: Set<GhostType>;
  
  // Queries
  getGhost: (type: GhostType) => GhostData | undefined;
  isUnlocked: (type: GhostType) => boolean;
  getAllGhosts: () => GhostData[];
  
  // Mutations
  unlockGhost: (type: GhostType) => void;
  
  // For investigation tools
  getActiveGhostBehavior: (type?: GhostType) => GhostBehavior | null;
}

// ============================================================================
// INITIAL GHOST DATA (Empty structure - will be populated in Task 2)
// ============================================================================

const initialGhosts: Record<GhostType, GhostData> = {
  [GhostType.WRAITH]: {
    id: GhostType.WRAITH,
    name: 'Wraith',
    threatLevel: 'HIGH',
    difficulty: 'EASIEST',
    emfPersonality: 'aggressive',
    spiritBoxSignature: { knobA: 0.35, knobB: 0.72, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.75, // 70-80% (Aggressive)
      personality: SpiritBoxPersonality.AGGRESSIVE,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_AGGRESSIVE, unique: Q1_UNIQUE.wraith },
        q2: { common: Q2_COMMON, personality: Q2_AGGRESSIVE, unique: Q2_UNIQUE.wraith },
        q3: { common: Q3_COMMON, personality: Q3_AGGRESSIVE, unique: Q3_UNIQUE.wraith },
      },
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.wraith,
    silhouetteUrl: '/assets/ghosts/wraith-silhouette.svg',
  },
  [GhostType.SHADE]: {
    id: GhostType.SHADE,
    name: 'Shade',
    threatLevel: 'MEDIUM',
    difficulty: 'EASY',
    emfPersonality: 'shy',
    spiritBoxSignature: { knobA: 0.50, knobB: 0.45, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.35, // 30-40% (Shy)
      personality: SpiritBoxPersonality.SHY,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_SHY, unique: Q1_UNIQUE.shade },
        q2: { common: Q2_COMMON, personality: Q2_SHY, unique: Q2_UNIQUE.shade },
        q3: { common: Q3_COMMON, personality: Q3_SHY, unique: Q3_UNIQUE.shade },
      },
    },
    wordFamilies: {
      emotion: ['silent', 'unknown', 'stay'],
      theme: ['hide', 'shadow', 'watch'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.HALF_FORMED_BODY, probability: 0.7 },
      { primary: CameraManifestationType.FAINT_SILHOUETTE, probability: 0.3 },
    ],
    thermalReading: ThermalReading.NORMAL,
    description: "A shy entity that avoids detection until you're very close.",
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.shade,
    silhouetteUrl: '/assets/ghosts/shade-silhouette.svg',
  },
  [GhostType.POLTERGEIST]: {
    id: GhostType.POLTERGEIST,
    name: 'Poltergeist',
    threatLevel: 'HIGH',
    difficulty: 'MEDIUM',
    emfPersonality: 'unstable',
    spiritBoxSignature: { knobA: 0.62, knobB: 0.38, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.55, // 50-60% (Chaotic)
      personality: SpiritBoxPersonality.CHAOTIC,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_CHAOTIC, unique: Q1_UNIQUE.poltergeist },
        q2: { common: Q2_COMMON, personality: Q2_CHAOTIC, unique: Q2_UNIQUE.poltergeist },
        q3: { common: Q3_COMMON, personality: Q3_CHAOTIC, unique: Q3_UNIQUE.poltergeist },
      },
    },
    wordFamilies: {
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.poltergeist,
    silhouetteUrl: '/assets/ghosts/poltergeist-silhouette.svg',
  },
  [GhostType.BANSHEE]: {
    id: GhostType.BANSHEE,
    name: 'Banshee',
    threatLevel: 'EXTREME',
    difficulty: 'HARD',
    emfPersonality: 'aggressive',
    spiritBoxSignature: { knobA: 0.28, knobB: 0.91, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.35, // 30-40% (Shy)
      personality: SpiritBoxPersonality.SHY,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_SHY, unique: Q1_UNIQUE.banshee },
        q2: { common: Q2_COMMON, personality: Q2_SHY, unique: Q2_UNIQUE.banshee },
        q3: { common: Q3_COMMON, personality: Q3_SHY, unique: Q3_UNIQUE.banshee },
      },
    },
    wordFamilies: {
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
      agentName: "M. O'Brien",
      date: 'October 31st, 2017',
      story: `I knew something was wrong the moment I entered. My EMF meter spiked to 4 before I was even close. This thing was aggressive, announcing its presence like a warning.

The Spirit Box required perfect tuning. Both knobs had to be exactly right, or I got nothing. When I tuned the Spirit Box, the words hit me like a physical force: "Anger. Sorrow. Leave."

I should have listened.

When I took the photo, I saw its face. A screaming, anguished face frozen in the flash. The image burned into my mind. I can still see it when I close my eyes.

The cold was unbearable. My breath came out in clouds. The temperature dropped so fast my hands went numb.

I ran. I'm not ashamed to admit it. Some entities you don't investigate - you survive them.`,
      fate: 'traumatized',
    },
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.banshee,
    silhouetteUrl: '/assets/ghosts/banshee-silhouette.svg',
  },
  [GhostType.PHANTOM]: {
    id: GhostType.PHANTOM,
    name: 'Phantom',
    threatLevel: 'HIGH',
    difficulty: 'HARD',
    emfPersonality: 'calm',
    spiritBoxSignature: { knobA: 0.18, knobB: 0.67, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.55, // 50-60% (Chaotic)
      personality: SpiritBoxPersonality.CHAOTIC,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_CHAOTIC, unique: Q1_UNIQUE.phantom },
        q2: { common: Q2_COMMON, personality: Q2_CHAOTIC, unique: Q2_UNIQUE.phantom },
        q3: { common: Q3_COMMON, personality: Q3_CHAOTIC, unique: Q3_UNIQUE.phantom },
      },
    },
    wordFamilies: {
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.phantom,
    silhouetteUrl: '/assets/ghosts/phantom-silhouette.svg',
  },
  [GhostType.ONYX]: {
    id: GhostType.ONYX,
    name: 'Onyx',
    threatLevel: 'EXTREME',
    difficulty: 'HARD',
    emfPersonality: 'shy',
    spiritBoxSignature: { knobA: 0.12, knobB: 0.23, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.75, // 70-80% (Aggressive)
      personality: SpiritBoxPersonality.AGGRESSIVE,
      wordPools: {
        q1: { common: Q1_COMMON, personality: Q1_AGGRESSIVE, unique: Q1_UNIQUE.onyx },
        q2: { common: Q2_COMMON, personality: Q2_AGGRESSIVE, unique: Q2_UNIQUE.onyx },
        q3: { common: Q3_COMMON, personality: Q3_AGGRESSIVE, unique: Q3_UNIQUE.onyx },
      },
    },
    wordFamilies: {
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.onyx,
    silhouetteUrl: '/assets/ghosts/onyx-silhouette.svg',
  },
  [GhostType.TRICKSTER]: {
    id: GhostType.TRICKSTER,
    name: 'Trickster',
    threatLevel: 'HIGH',
    difficulty: 'HARDEST',
    emfPersonality: 'mischievous',
    spiritBoxSignature: { knobA: 0.48, knobB: 0.60, tolerance: 0.06 },
    spiritBoxResponse: {
      frequency: 0.75, // 70-80% (Aggressive frequency, but uses ALL words)
      personality: SpiritBoxPersonality.CONTRADICTORY,
      wordPools: {
        // Trickster uses ALL personality words to create contradictions
        q1: { 
          common: Q1_COMMON, 
          personality: [...Q1_AGGRESSIVE, ...Q1_SHY, ...Q1_CHAOTIC], 
          unique: Q1_UNIQUE.trickster 
        },
        q2: { 
          common: Q2_COMMON, 
          personality: [...Q2_AGGRESSIVE, ...Q2_SHY, ...Q2_CHAOTIC], 
          unique: Q2_UNIQUE.trickster 
        },
        q3: { 
          common: Q3_COMMON, 
          personality: [...Q3_AGGRESSIVE, ...Q3_SHY, ...Q3_CHAOTIC], 
          unique: Q3_UNIQUE.trickster 
        },
      },
    },
    wordFamilies: {
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
    isUnlocked: true,
    encounterCount: 0,
    imageUrl: ghostImages.trickster,
    silhouetteUrl: '/assets/ghosts/trickster-silhouette.svg',
  },
};

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useGhostStore = create<GhostStore>()(
  persist(
    (set, get) => ({
      ghosts: initialGhosts,
      unlockedGhosts: new Set<GhostType>(),

      // Query: Get a specific ghost by type
      getGhost: (type: GhostType) => {
        return get().ghosts[type];
      },

      // Query: Check if a ghost is unlocked
      isUnlocked: (type: GhostType) => {
        return get().unlockedGhosts.has(type);
      },

      // Query: Get all ghosts as an array
      getAllGhosts: () => {
        return Object.values(get().ghosts);
      },

      // Mutation: Unlock a ghost
      unlockGhost: (type: GhostType) => {
        set((state) => {
          const newUnlockedGhosts = new Set(state.unlockedGhosts);
          newUnlockedGhosts.add(type);

          const updatedGhosts = { ...state.ghosts };
          if (updatedGhosts[type]) {
            updatedGhosts[type] = {
              ...updatedGhosts[type],
              isUnlocked: true,
              encounterCount: updatedGhosts[type].encounterCount + 1,
            };
          }

          return {
            unlockedGhosts: newUnlockedGhosts,
            ghosts: updatedGhosts,
          };
        });
      },

      // For investigation tools: Get active ghost behavior
      getActiveGhostBehavior: (type?: GhostType) => {
        if (!type) return null;

        const ghost = get().ghosts[type];
        if (!ghost) return null;

        return {
          emfPersonality: ghost.emfPersonality,
          spiritBoxSignature: ghost.spiritBoxSignature,
          spiritBoxResponse: ghost.spiritBoxResponse,
          wordFamilies: ghost.wordFamilies,
          cameraManifestations: ghost.cameraManifestations,
          thermalReading: ghost.thermalReading,
        };
      },
    }),
    {
      name: 'ghost-store', // localStorage key
      partialize: (state) => ({
        unlockedGhosts: Array.from(state.unlockedGhosts), // Convert Set to Array for serialization
        ghosts: Object.fromEntries(
          Object.entries(state.ghosts).map(([key, ghost]) => {
            const { imageUrl, silhouetteUrl, ...ghostWithoutImages } = ghost;
            return [
              key,
              {
                ...ghostWithoutImages,
                isUnlocked: state.unlockedGhosts.has(ghost.id),
                encounterCount: ghost.encounterCount,
                // imageUrl and silhouetteUrl are excluded - always use from initialGhosts
              },
            ];
          })
        ),
      }),
      // Rehydrate Set from Array and restore imageUrls from initialGhosts
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.unlockedGhosts)) {
          state.unlockedGhosts = new Set(state.unlockedGhosts as unknown as GhostType[]);
        }
        // Restore imageUrls and ensure all ghost data is complete after rehydration
        if (state?.ghosts) {
          Object.keys(state.ghosts).forEach((key) => {
            const ghostType = key as GhostType;
            if (initialGhosts[ghostType]) {
              // Merge rehydrated data with initial data to ensure all properties are present
              state!.ghosts[ghostType] = {
                ...initialGhosts[ghostType],
                ...state!.ghosts[ghostType],
                // Always use initial images
                imageUrl: initialGhosts[ghostType].imageUrl,
                silhouetteUrl: initialGhosts[ghostType].silhouetteUrl,
                // Preserve unlock state and encounter count from rehydrated data
                isUnlocked: state!.unlockedGhosts.has(ghostType),
                encounterCount: state!.ghosts[ghostType].encounterCount || 0,
              };
            }
          });
        } else {
          // If no ghosts in rehydrated state, use initial ghosts
          state!.ghosts = initialGhosts;
        }
      },
    }
  )
);
