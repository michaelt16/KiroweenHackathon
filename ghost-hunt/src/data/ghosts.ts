// Ghost definitions with key traits for deduction
import type { GhostType } from '../types/investigation';

export type TraitState = 'unknown' | 'present' | 'ruled_out';

export type EvidenceTrait = 
  | 'emf'
  | 'whispers'
  | 'cold'
  | 'static'
  | 'photos'
  | 'sanityBehavior'
  | 'movement';

export interface GhostDefinition {
  id: GhostType;
  name: string;
  description: string;
  keyTraits: Record<EvidenceTrait, TraitState>;
}

// Ghost definitions based on behavior profiles
export const GHOST_DEFINITIONS: Record<GhostType, GhostDefinition> = {
  Wraith: {
    id: 'Wraith',
    name: 'Wraith',
    description: 'A fast-moving entity with strong electromagnetic presence. Known for rapid sanity drain and aggressive behavior.',
    keyTraits: {
      emf: 'present',           // Strong EMF signature
      whispers: 'ruled_out',    // Rarely communicates
      cold: 'ruled_out',        // No temperature anomalies
      static: 'present',        // Causes visual distortion
      photos: 'ruled_out',      // Rarely manifests in photos
      sanityBehavior: 'present', // Fast sanity drain
      movement: 'present',      // Fast movement (N/A for 005)
    },
  },
  Shade: {
    id: 'Shade',
    name: 'Shade',
    description: 'A shy, passive entity that prefers darkness. Communicates through whispers and cold spots.',
    keyTraits: {
      emf: 'ruled_out',         // Weak EMF
      whispers: 'present',      // Frequent audio communication
      cold: 'present',          // Strong cold spots
      static: 'ruled_out',      // No visual distortion
      photos: 'ruled_out',      // Rarely appears in photos
      sanityBehavior: 'ruled_out', // Slow sanity drain
      movement: 'ruled_out',    // Slow/passive movement (N/A for 005)
    },
  },
  Poltergeist: {
    id: 'Poltergeist',
    name: 'Poltergeist',
    description: 'A chaotic entity known for physical disturbances and visual anomalies. Highly active and unpredictable.',
    keyTraits: {
      emf: 'ruled_out',         // Moderate EMF
      whispers: 'ruled_out',    // Minimal audio
      cold: 'ruled_out',        // No cold spots
      static: 'present',        // Strong visual distortion
      photos: 'present',        // Frequently appears in photos
      sanityBehavior: 'unknown', // Medium sanity drain
      movement: 'present',      // Erratic movement (N/A for 005)
    },
  },
  Peccy: {
    id: 'Peccy',
    name: 'PECCY',
    description: '??????? ???????? ??????? EXTREMELY DANGEROUS. Origin unknown. Behavior unpredictable. DO NOT APPROACH. ??????? ???????? ???????',
    keyTraits: {
      emf: 'present',           // All evidence present - impossible to identify
      whispers: 'present',      // Everything triggers
      cold: 'present',          // Maximum chaos
      static: 'present',        // Complete distortion
      photos: 'present',        // But shows only ????
      sanityBehavior: 'present', // Instant drain
      movement: 'present',      // Unpredictable
    },
  },
};

// Helper to get trait label
export const TRAIT_LABELS: Record<EvidenceTrait, string> = {
  emf: 'EMF Reactivity',
  whispers: 'Whispers (Audio)',
  cold: 'Cold Spots (Thermal)',
  static: 'Static Disturbance',
  photos: 'Photo Manifestation',
  sanityBehavior: 'Sanity Behavior',
  movement: 'Movement Pattern',
};

// Helper to check if ghost matches evidence
export function doesGhostMatchEvidence(
  ghostTraits: Record<EvidenceTrait, TraitState>,
  evidence: Record<EvidenceTrait, TraitState>
): boolean {
  for (const trait of Object.keys(evidence) as EvidenceTrait[]) {
    const evidenceState = evidence[trait];
    const ghostTrait = ghostTraits[trait];

    // If evidence says "present" but ghost has "ruled_out", it's a conflict
    if (evidenceState === 'present' && ghostTrait === 'ruled_out') {
      return false;
    }

    // If evidence says "ruled_out" but ghost has "present", it's a conflict
    if (evidenceState === 'ruled_out' && ghostTrait === 'present') {
      return false;
    }
  }

  return true;
}
