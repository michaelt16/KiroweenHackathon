// Ghost definitions with key traits for deduction
import type { GhostType } from '../types/investigation';

export type TraitState = 'unknown' | 'present' | 'ruled_out';

// EMF Personality states (can be specific personality or ruled out)
// Only 4 types for balanced overlap: CALM, UNSTABLE, SHY, AGGRESSIVE
export type EMFPersonalityState = 
  | 'unknown' 
  | 'calm' 
  | 'unstable' 
  | 'shy' 
  | 'aggressive' 
  | 'ruled_out';

// Thermal Reading states (can be specific reading or ruled out)
export type ThermalReadingState = 
  | 'unknown' 
  | 'normal' 
  | 'cold_spot' 
  | 'deep_cold' 
  | 'ruled_out';

// Camera Manifestation states (can be specific type or ruled out)
export type CameraManifestationState = 
  | 'unknown' 
  | 'faint_silhouette' 
  | 'motion_blur' 
  | 'screaming_face' 
  | 'deep_shadow' 
  | 'invisible' 
  | 'faint_glitch' 
  | 'shadow_silhouette' 
  | 'glitch_streaks' 
  | 'half_formed_body' 
  | 'ruled_out';

export type EvidenceTrait = 
  | 'spiritBoxPersonality' // Spirit Box personality type (aggressive, shy, chaotic, contradictory)
  | 'whispers'          // Spirit Box words/communication
  | 'thermalReading'    // Thermal reading type (normal, cold_spot, deep_cold)
  | 'cameraManifestation'; // Camera manifestation type

export interface GhostDefinition {
  id: GhostType;
  name: string;
  description: string;
  keyTraits: {
    emfPersonality: EMFPersonalityState;
    spiritBoxPersonality?: 'aggressive' | 'shy' | 'chaotic' | 'contradictory'; // New field for Spirit Box personality
    whispers: TraitState;
    thermalReading: ThermalReadingState;
    // Support multiple possible camera manifestations (ghosts can show different ones)
    cameraManifestation: CameraManifestationState | CameraManifestationState[];
  };
}

// Ghost definitions with intentional overlap - requires 3+ pieces of evidence to identify
// This matches the intended gameplay loop: use multiple tools, take multiple photos, gather hints
export const GHOST_DEFINITIONS: Record<GhostType, GhostDefinition> = {
  Wraith: {
    id: 'Wraith',
    name: 'Wraith',
    description: 'A fast-moving entity with strong electromagnetic presence. Known for rapid sanity drain and aggressive behavior.',
    keyTraits: {
      emfPersonality: 'aggressive',        // AGGRESSIVE personality (fast movement = aggressive spikes)
      spiritBoxPersonality: 'aggressive',  // Aggressive Spirit Box (70-80% response)
      whispers: 'ruled_out',               // Rarely communicates via Spirit Box
      thermalReading: 'normal',            // NORMAL thermal reading
      // Can show either manifestation - requires multiple photos to be sure
      cameraManifestation: ['faint_silhouette', 'shadow_silhouette'],
    },
  },
  Shade: {
    id: 'Shade',
    name: 'Shade',
    description: 'A shy, passive entity that prefers darkness. Communicates through whispers and cold spots.',
    keyTraits: {
      emfPersonality: 'shy',               // SHY personality
      spiritBoxPersonality: 'shy',         // Shy Spirit Box (30-40% response)
      whispers: 'present',                 // Frequent audio communication via Spirit Box
      thermalReading: 'normal',            // NORMAL thermal reading (shared with Wraith)
      // Can show either manifestation
      cameraManifestation: ['half_formed_body', 'invisible'],
    },
  },
  Poltergeist: {
    id: 'Poltergeist',
    name: 'Poltergeist',
    description: 'A chaotic entity known for physical disturbances and visual anomalies. Highly active and unpredictable.',
    keyTraits: {
      emfPersonality: 'unstable',          // UNSTABLE personality (random jitter pattern)
      spiritBoxPersonality: 'chaotic',     // Chaotic Spirit Box (50-60% response)
      whispers: 'ruled_out',               // Minimal audio communication (shared with Wraith)
      thermalReading: 'cold_spot',         // COLD_SPOT thermal reading (shared with Banshee)
      // Can show either manifestation
      cameraManifestation: ['motion_blur', 'screaming_face'],
    },
  },
  Banshee: {
    id: 'Banshee',
    name: 'Banshee',
    description: 'An aggressive spirit driven by intense emotion and rage.',
    keyTraits: {
      emfPersonality: 'aggressive',        // AGGRESSIVE personality (shared with Wraith)
      spiritBoxPersonality: 'shy',         // Shy Spirit Box (30-40% response)
      whispers: 'present',                 // Communicates via Spirit Box (shared with Shade, Phantom, Onyx)
      thermalReading: 'cold_spot',         // COLD_SPOT thermal reading (shared with Poltergeist)
      // Can show either manifestation
      cameraManifestation: ['screaming_face', 'deep_shadow'],
    },
  },
  Phantom: {
    id: 'Phantom',
    name: 'Phantom',
    description: 'An uncanny entity that refuses to be photographed and brings extreme cold.',
    keyTraits: {
      emfPersonality: 'calm',              // CALM personality
      spiritBoxPersonality: 'chaotic',     // Chaotic Spirit Box (50-60% response)
      whispers: 'present',                 // Communicates via Spirit Box (shared with Shade, Banshee, Onyx)
      thermalReading: 'deep_cold',         // DEEP_COLD thermal reading (shared with Onyx)
      // Can show either manifestation
      cameraManifestation: ['invisible', 'faint_glitch'],
    },
  },
  Onyx: {
    id: 'Onyx',
    name: 'Onyx',
    description: 'A psychology-heavy entity associated with depths and shadows.',
    keyTraits: {
      emfPersonality: 'shy',               // SHY personality (shared with Shade)
      spiritBoxPersonality: 'aggressive',  // Aggressive Spirit Box (70-80% response)
      whispers: 'present',                 // Communicates via Spirit Box (shared with Shade, Banshee, Phantom)
      thermalReading: 'deep_cold',         // DEEP_COLD thermal reading (shared with Phantom)
      // Can show either manifestation
      cameraManifestation: ['shadow_silhouette', 'deep_shadow'],
    },
  },
  Trickster: {
    id: 'Trickster',
    name: 'Trickster',
    description: 'The most challenging entity - deceptive, playful, and maddening. Shows contradictory traits that don\'t match any ghost definition.',
    keyTraits: {
      // Trickster shows RANDOM contradictory traits - this is a placeholder
      // Actual traits are generated dynamically and guaranteed to NOT match any real ghost
      emfPersonality: 'unstable',          // Placeholder - will be random
      spiritBoxPersonality: 'contradictory', // Contradictory Spirit Box (uses all words)
      whispers: 'present',                 // Placeholder - will be random
      thermalReading: 'cold_spot',         // Placeholder - will be random
      cameraManifestation: 'glitch_streaks', // Placeholder - will be random
    },
  },
  Peccy: {
    id: 'Peccy',
    name: 'PECCY',
    description: 'Non-ghost anomaly. Friendly, childlike entity found near Amazon fulfillment centers and warehouses. Appears curious and playful. Causes equipment spikes due to excitement, not hostility. No threat detected.',
    keyTraits: {
      emfPersonality: 'calm',              // CALM personality (excitement causes high EMF)
      spiritBoxPersonality: 'chaotic',     // Chaotic Spirit Box (playful, excited)
      whispers: 'ruled_out',               // No verbal communication
      thermalReading: 'normal',            // NORMAL thermal (warm, opposite of ghosts)
      cameraManifestation: 'faint_silhouette', // Appears in photos (orange glow - using faint_silhouette as placeholder)
    },
  },
};

// Helper to get trait label
export const TRAIT_LABELS: Record<EvidenceTrait, string> = {
  spiritBoxPersonality: 'Spirit Box Personality',
  whispers: 'Spirit Box Words',
  thermalReading: 'Thermal Reading',
  cameraManifestation: 'Camera Manifestation',
};

// Options for each trait type
export const EMF_PERSONALITY_OPTIONS: Array<{ value: EMFPersonalityState; label: string }> = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'calm', label: 'Calm' },
  { value: 'unstable', label: 'Unstable' },
  { value: 'shy', label: 'Shy' },
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'ruled_out', label: 'Ruled Out' },
];

export const THERMAL_READING_OPTIONS: Array<{ value: ThermalReadingState; label: string }> = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'normal', label: 'Normal' },
  { value: 'cold_spot', label: 'Cold Spot' },
  { value: 'deep_cold', label: 'Deep Cold' },
  { value: 'ruled_out', label: 'Ruled Out' },
];

export const CAMERA_MANIFESTATION_OPTIONS: Array<{ value: CameraManifestationState; label: string }> = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'faint_silhouette', label: 'Faint Silhouette' },
  { value: 'motion_blur', label: 'Motion Blur' },
  { value: 'screaming_face', label: 'Screaming Face' },
  { value: 'deep_shadow', label: 'Deep Shadow' },
  { value: 'invisible', label: 'Invisible' },
  { value: 'faint_glitch', label: 'Faint Glitch' },
  { value: 'shadow_silhouette', label: 'Shadow Silhouette' },
  { value: 'glitch_streaks', label: 'Glitch Streaks' },
  { value: 'half_formed_body', label: 'Half-Formed Body' },
  { value: 'ruled_out', label: 'Ruled Out' },
];

// Generate Trickster's random contradictory traits
// Guarantees the combination doesn't match any real ghost
export function generateTricksterTraits(): GhostDefinition['keyTraits'] {
  const emfOptions: EMFPersonalityState[] = ['calm', 'unstable', 'shy', 'aggressive'];
  const whisperOptions: TraitState[] = ['present', 'ruled_out'];
  const thermalOptions: ThermalReadingState[] = ['normal', 'cold_spot', 'deep_cold'];
  const cameraOptions: CameraManifestationState[] = [
    'faint_silhouette', 'motion_blur', 'screaming_face', 'deep_shadow',
    'invisible', 'faint_glitch', 'shadow_silhouette', 'glitch_streaks', 'half_formed_body'
  ];

  // Try up to 100 times to find a combination that doesn't match any ghost
  for (let attempt = 0; attempt < 100; attempt++) {
    const randomCameraManifestation = cameraOptions[Math.floor(Math.random() * cameraOptions.length)] as CameraManifestationState;
    const randomTraits: GhostDefinition['keyTraits'] = {
      emfPersonality: emfOptions[Math.floor(Math.random() * emfOptions.length)] as EMFPersonalityState,
      whispers: whisperOptions[Math.floor(Math.random() * whisperOptions.length)] as TraitState,
      thermalReading: thermalOptions[Math.floor(Math.random() * thermalOptions.length)] as ThermalReadingState,
      cameraManifestation: randomCameraManifestation,
    };

    // Check if this combination matches any real ghost (excluding Trickster)
    let matchesAnyGhost = false;
    for (const [ghostKey, ghostDef] of Object.entries(GHOST_DEFINITIONS)) {
      if (ghostKey === 'Trickster' || ghostKey === 'Peccy') continue; // Skip Trickster and Peccy
      
      // Check if traits match (handle camera manifestation as array)
      const ghostManifestations = Array.isArray(ghostDef.keyTraits.cameraManifestation)
        ? ghostDef.keyTraits.cameraManifestation
        : [ghostDef.keyTraits.cameraManifestation];
      
      if (
        ghostDef.keyTraits.emfPersonality === randomTraits.emfPersonality &&
        ghostDef.keyTraits.whispers === randomTraits.whispers &&
        ghostDef.keyTraits.thermalReading === randomTraits.thermalReading &&
        ghostManifestations.includes(randomCameraManifestation)
      ) {
        matchesAnyGhost = true;
        break;
      }
    }

    // If it doesn't match any ghost, return it
    if (!matchesAnyGhost) {
      return randomTraits;
    }
  }

  // Fallback: return a known contradictory combination
  return {
    emfPersonality: 'aggressive',
    whispers: 'ruled_out',
    thermalReading: 'deep_cold',
    cameraManifestation: 'screaming_face',
  };
}

// Helper to check if ghost matches evidence
export function doesGhostMatchEvidence(
  ghostTraits: GhostDefinition['keyTraits'],
  evidence: Partial<{
    spiritBoxPersonality?: string;
    whispers: TraitState;
    thermalReading: ThermalReadingState;
    cameraManifestation: CameraManifestationState;
  }>
): boolean {
  // Check Spirit Box Personality (primary filtering method)
  // Requirements 9, 10: Spirit Box personality filtering replaces EMF personality
  if (evidence.spiritBoxPersonality && evidence.spiritBoxPersonality !== 'unknown') {
    // Handle Trickster's Contradictory personality
    // Requirement 9: Trickster is identified by selecting "Contradictory" personality
    if (evidence.spiritBoxPersonality === 'contradictory') {
      // Only Trickster has contradictory personality
      return ghostTraits.spiritBoxPersonality === 'contradictory';
    }
    
    // For other personalities, check if ghost matches
    if (ghostTraits.spiritBoxPersonality && evidence.spiritBoxPersonality !== ghostTraits.spiritBoxPersonality) {
      // If specific personality selected, must match ghost
      return false;
    }
  }

  // Check Whispers (simple present/ruled_out)
  if (evidence.whispers && evidence.whispers !== 'unknown') {
    if (evidence.whispers === 'present' && ghostTraits.whispers === 'ruled_out') {
      return false;
    }
    if (evidence.whispers === 'ruled_out' && ghostTraits.whispers === 'present') {
      return false;
    }
  }

  // Check Thermal Reading
  if (evidence.thermalReading && evidence.thermalReading !== 'unknown') {
    if (evidence.thermalReading === 'ruled_out') {
      // If ruled out, skip (doesn't make sense to rule out thermal)
    } else if (evidence.thermalReading !== ghostTraits.thermalReading) {
      // If specific reading selected, must match ghost
      return false;
    }
  }

  // Check Camera Manifestation (can be array of possibilities)
  if (evidence.cameraManifestation && evidence.cameraManifestation !== 'unknown') {
    if (evidence.cameraManifestation === 'ruled_out') {
      // If ruled out, skip (doesn't make sense to rule out camera)
    } else {
      const ghostManifestations = Array.isArray(ghostTraits.cameraManifestation)
        ? ghostTraits.cameraManifestation
        : [ghostTraits.cameraManifestation];
      
      // If specific manifestation selected, must be one of the ghost's possible manifestations
      if (!ghostManifestations.includes(evidence.cameraManifestation)) {
        return false;
      }
    }
  }

  return true;
}
