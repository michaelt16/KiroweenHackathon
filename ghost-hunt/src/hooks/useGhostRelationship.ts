/**
 * useGhostRelationship Hook
 * 
 * Centralized hook for all ghost relationship calculations.
 * Single source of truth for distance, bearing, and relative positioning.
 * 
 * This hook automatically recalculates when:
 * - Ghost position changes
 * - Player position changes  
 * - Player heading changes
 * - Active ghost type changes
 * 
 * All tools (Radar, EMF, Camera, Thermal) should use this hook
 * instead of calculating independently.
 * 
 * @example
 * ```tsx
 * const relationship = useGhostRelationship();
 * if (relationship.isValid) {
 *   console.log(`Ghost: ${relationship.distance}m at ${relationship.bearing}°`);
 *   // Use relationship.ghostBehavior for tool-specific behavior
 *   const emfLevel = calculateEMFLevel(relationship.distance, relationship.ghostBehavior.emfPersonality);
 * }
 * ```
 */

import { useMemo } from 'react';
import { useInvestigationStore } from '../stores/investigationStore';
import { useGhostStore } from '../stores/ghostStore';
import { 
  calculateDistance, 
  calculateBearing, 
  isGhostInForwardCone 
} from '../utils/toolBehaviors';
import type { GhostBehavior } from '../stores/ghostStore';

export interface GhostRelationship {
  /** Distance to ghost in meters */
  distance: number;
  
  /** Absolute bearing to ghost (0-360°, where 0° = North) */
  bearing: number;
  
  /** Relative bearing (0-360°, where 0° = straight ahead/where player is facing) */
  relativeBearing: number;
  
  /** Is ghost within ±45° forward detection cone? */
  isInForwardCone: boolean;
  
  /** Ghost behavior profile (EMF personality, thermal reading, etc.) */
  ghostBehavior: GhostBehavior | null;
  
  /** Active ghost type (for reference) */
  ghostType: string | null;
  
  /** Are positions available and valid? */
  isValid: boolean;
}

/**
 * Centralized hook for ghost relationship calculations.
 * 
 * This is the SINGLE SOURCE OF TRUTH for all position-based calculations.
 * All tools should use this hook instead of calculating independently.
 * 
 * The hook automatically updates when:
 * - Ghost position changes (dev mode or real GPS)
 * - Player position changes (walking around)
 * - Player heading changes (turning)
 * 
 * @returns GhostRelationship object with distance, bearings, and validity
 */
export function useGhostRelationship(): GhostRelationship {
  // Get positions from store (using selectors for reactivity)
  const ghostPosition = useInvestigationStore((state) => state.ghostPosition);
  const playerPosition = useInvestigationStore((state) => state.playerPosition);
  const playerHeading = useInvestigationStore((state) => state.playerHeading);
  const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
  
  // Get ghost behavior from ghost store
  const { getActiveGhostBehavior } = useGhostStore();

  // Memoize calculation - only recalculates when positions/heading/ghost type change
  return useMemo(() => {
    // If positions not available, return invalid state
    if (!ghostPosition || !playerPosition) {
      return {
        distance: 0,
        bearing: 0,
        relativeBearing: 0,
        isInForwardCone: false,
        ghostBehavior: null,
        ghostType: null,
        isValid: false,
      };
    }

    // Calculate distance using Haversine formula (GPS-accurate)
    const distance = calculateDistance(playerPosition, ghostPosition);
    
    // Calculate absolute bearing (0-360°, where 0° = North)
    // This is the compass direction to the ghost
    const bearing = calculateBearing(playerPosition, ghostPosition);
    
    // Calculate relative bearing (where player is facing = 0°)
    // This is used for radar display (top of screen = where you're facing)
    const relativeBearing = (bearing - playerHeading + 360) % 360;
    
    // Check if ghost is in forward detection cone (±45°)
    // Used for tools that only work when facing the ghost
    const isInForwardCone = isGhostInForwardCone(bearing, playerHeading, 45);
    
    // Get ghost behavior profile (EMF personality, thermal reading, etc.)
    // This is used by tools to determine how the ghost reacts
    const ghostBehavior = activeGhostType 
      ? getActiveGhostBehavior(activeGhostType) 
      : null;

    return {
      distance,
      bearing,
      relativeBearing,
      isInForwardCone,
      ghostBehavior,
      ghostType: activeGhostType,
      isValid: true,
    };
  }, [ghostPosition, playerPosition, playerHeading, activeGhostType, getActiveGhostBehavior]);
}

