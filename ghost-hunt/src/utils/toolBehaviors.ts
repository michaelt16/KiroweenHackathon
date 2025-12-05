/**
 * Tool Behavior Utilities
 * 
 * This module contains all tool calculation logic for investigation mode.
 * Each function implements specific ghost detection mechanics based on
 * distance, ghost personality, and other behavioral factors.
 */

import type { 
  ThermalReading, 
  CameraManifestationType,
  WordFamily 
} from '../types/investigation';

// ============================================================================
// DISTANCE & BEARING CALCULATIONS
// ============================================================================

/**
 * Calculate distance between two GPS positions using Haversine formula
 * @param pos1 - First position {lat, lng}
 * @param pos2 - Second position {lat, lng}
 * @returns Distance in meters
 */
export function calculateDistance(
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Calculate bearing (direction) from one position to another
 * @param pos1 - Starting position {lat, lng}
 * @param pos2 - Target position {lat, lng}
 * @returns Bearing in degrees (0-360°)
 */
export function calculateBearing(
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
): number {
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  
  // Normalize to 0-360°
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

// ============================================================================
// EMF METER CALCULATIONS
// ============================================================================

/**
 * Calculate EMF level based on pure distance (no personality)
 * @param distance - Distance to ghost in meters
 * @returns EMF level (0-5)
 */
export function calculateEMFLevel(distance: number): number {
  // Pure distance-based calculation (no personality noise)
  if (distance > 40) return 0;
  if (distance > 20) return 1;
  if (distance > 10) return 2;
  if (distance > 6) return 3;
  if (distance > 3) return 4;
  return 5;
}

// ============================================================================
// RADAR CALCULATIONS
// ============================================================================

/**
 * Check if ghost is within the forward detection cone
 * @param ghostBearing - Direction to ghost (0-360°)
 * @param playerHeading - Direction player is facing (0-360°)
 * @param coneAngle - Detection cone angle (default ±45°)
 * @returns True if ghost is in forward cone
 */
export function isGhostInForwardCone(
  ghostBearing: number,
  playerHeading: number,
  coneAngle: number = 45
): boolean {
  // Calculate angle difference
  let diff = Math.abs(ghostBearing - playerHeading);
  
  // Handle wraparound (e.g., 350° vs 10°)
  if (diff > 180) {
    diff = 360 - diff;
  }
  
  return diff <= coneAngle;
}

/**
 * Add wobble to radar blip bearing for realism
 * @param bearing - True bearing to ghost (0-360°)
 * @returns Bearing with ±5° wobble applied
 */
export function addRadarWobble(bearing: number): number {
  // ±5° wobble
  const wobble = (Math.random() - 0.5) * 10;
  let wobbledBearing = bearing + wobble;
  
  // Normalize to 0-360°
  wobbledBearing = (wobbledBearing + 360) % 360;
  
  return wobbledBearing;
}

// ============================================================================
// SPIRIT BOX CALCULATIONS
// ============================================================================

/**
 * Check if Spirit Box knobs are locked to ghost's signature
 * @param knobA - Current Knob A value (0.0-1.0)
 * @param knobB - Current Knob B value (0.0-1.0)
 * @param targetA - Ghost's target Knob A frequency (0.0-1.0)
 * @param targetB - Ghost's target Knob B frequency (0.0-1.0)
 * @param tolerance - Acceptable deviation (default 0.06)
 * @returns True if both knobs are within tolerance
 */
export function checkSpiritBoxLock(
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

/**
 * Get random word from ghost's word families
 * @param wordFamilies - Ghost's emotion and theme word families
 * @returns Random word from combined families
 */
export function getRandomWord(wordFamilies: WordFamily): string {
  const allWords = [...wordFamilies.emotion, ...wordFamilies.theme];
  
  if (allWords.length === 0) {
    return 'unknown';
  }
  
  const randomIndex = Math.floor(Math.random() * allWords.length);
  return allWords[randomIndex];
}

// ============================================================================
// CAMERA CALCULATIONS
// ============================================================================

/**
 * Determine camera manifestation based on distance and ghost profile
 * @param distance - Distance to ghost in meters
 * @param manifestations - Ghost's camera manifestation profile
 * @returns Manifestation type or null if nothing captured
 */
export function determineCameraManifestation(
  distance: number,
  manifestations: Array<{
    primary: CameraManifestationType;
    probability: number;
  }>
): CameraManifestationType | null {
  // Distance affects probability multiplier
  let probabilityMultiplier = 1.0;
  
  if (distance < 5) {
    // Close range: 80-95% chance (high multiplier)
    probabilityMultiplier = 1.0;
  } else if (distance < 10) {
    // Medium range: 50-70% chance
    probabilityMultiplier = 0.7;
  } else {
    // Far range: 10-30% chance
    probabilityMultiplier = 0.3;
  }

  // Roll for manifestation
  const roll = Math.random();
  let cumulative = 0;

  for (const manifest of manifestations) {
    cumulative += manifest.probability * probabilityMultiplier;
    
    if (roll <= cumulative) {
      return manifest.primary;
    }
  }

  // No manifestation (too far or unlucky roll)
  return null;
}

// ============================================================================
// THERMAL SCANNER CALCULATIONS
// ============================================================================

/**
 * Calculate thermal reading based on distance and ghost's thermal category
 * @param distance - Distance to ghost in meters
 * @param thermalCategory - Ghost's thermal category
 * @returns Temperature reading and category
 */
export function calculateThermalReading(
  distance: number,
  thermalCategory: ThermalReading
): { temperature: number; category: ThermalReading } {
  // Only show cold readings when close (<10m)
  if (distance > 10) {
    return {
      temperature: 68, // Normal ambient temperature (°F)
      category: 'normal'
    };
  }

  // Return reading based on ghost's thermal category
  switch (thermalCategory) {
    case 'normal':
      return {
        temperature: 68,
        category: 'normal'
      };
      
    case 'cold_spot':
      return {
        temperature: 45, // Cold spot (8-12°C range)
        category: 'cold_spot'
      };
      
    case 'deep_cold':
      return {
        temperature: 32, // Deep cold (<8°C)
        category: 'deep_cold'
      };
      
    default:
      return {
        temperature: 68,
        category: 'normal'
      };
  }
}
