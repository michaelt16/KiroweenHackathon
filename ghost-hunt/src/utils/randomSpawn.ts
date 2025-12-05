// Random spawn utilities for supplies and field journals
// Spawns items randomly near the player position with Pokemon Go-style spacing

import type { SupplyNode, FieldJournalNode, SupplyType } from '../types/game';
import { useGhostStore } from '../stores/ghostStore';

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Same as used in overpassAPI.ts for consistency
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Generate random position near a center point
 * @param centerLat - Center latitude
 * @param centerLng - Center longitude
 * @param minRadius - Minimum distance in meters
 * @param maxRadius - Maximum distance in meters
 * @returns Random position within the radius
 */
export function generateRandomPosition(
  centerLat: number,
  centerLng: number,
  minRadius: number = 50,
  maxRadius: number = 200
): { lat: number; lng: number } {
  // Random angle (0-2π)
  const angle = Math.random() * 2 * Math.PI;
  
  // Random distance within radius range
  const distance = minRadius + Math.random() * (maxRadius - minRadius);
  
  // Convert to lat/lng offset
  // 1 degree lat ≈ 111km, 1 degree lng ≈ 111km * cos(lat)
  const latOffset = (distance * Math.cos(angle)) / 111000;
  const lngOffset = (distance * Math.sin(angle)) / (111000 * Math.cos((centerLat * Math.PI) / 180));
  
  return {
    lat: centerLat + latOffset,
    lng: centerLng + lngOffset,
  };
}

/**
 * Generate a spread-out position that's far enough from existing positions
 * Similar to Pokemon Go's spawn spacing (minimum 50-80m between spawns)
 */
function generateSpreadOutPosition(
  centerLat: number,
  centerLng: number,
  existingPositions: Array<{ lat: number; lng: number }>,
  minRadius: number,
  maxRadius: number,
  minDistance: number = 60, // Minimum 60m between spawns (Pokemon Go-style)
  maxAttempts: number = 50
): { lat: number; lng: number } | null {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const position = generateRandomPosition(centerLat, centerLng, minRadius, maxRadius);
    
    // Check if this position is far enough from all existing positions
    const isFarEnough = existingPositions.every(existing => {
      const distance = calculateDistance(existing.lat, existing.lng, position.lat, position.lng);
      return distance >= minDistance;
    });
    
    if (isFarEnough) {
      return position;
    }
  }
  
  // If we couldn't find a good position after max attempts, return a random one anyway
  // (better than nothing, but might be close to others)
  return generateRandomPosition(centerLat, centerLng, minRadius, maxRadius);
}

/**
 * Generate random supply nodes scattered across a large area (not just near player)
 * Uses POI locations as anchor points to ensure consistent coverage
 * @param centerLat - Center latitude (player or map center)
 * @param centerLng - Center longitude (player or map center)
 * @param poiLocations - Array of POI locations to use as anchor points for scattering
 * @param radiusMeters - Radius to scatter across (default: 2500m - same as POI fetch)
 * @returns Array of supply nodes
 */
export function generateRandomSupplies(
  centerLat: number,
  centerLng: number,
  poiLocations: Array<{ lat: number; lng: number }> = [],
  radiusMeters: number = 2500
): SupplyNode[] {
  const supplies: SupplyNode[] = [];
  const existingPositions: Array<{ lat: number; lng: number }> = [];
  
  // Minimum 60m between supplies (Pokemon Go-style spacing)
  const MIN_SPAWN_DISTANCE = 60;
  
  // Generate more supplies across the larger area (20-30 total)
  const totalCount = Math.floor(Math.random() * 11) + 20; // 20-30 supplies
  
  // Use POI locations as anchor points, plus random positions
  const anchorPoints: Array<{ lat: number; lng: number }> = [];
  
  // Add POI locations as anchor points (spawn near POIs)
  poiLocations.forEach(poi => {
    // Add 2-3 supplies near each POI (within 50-150m)
    for (let i = 0; i < Math.floor(Math.random() * 2) + 2; i++) {
      const offset = generateRandomPosition(poi.lat, poi.lng, 50, 150);
      anchorPoints.push(offset);
    }
  });
  
  // Add random positions across the entire area
  const randomCount = totalCount - anchorPoints.length;
  for (let i = 0; i < randomCount; i++) {
    const randomPos = generateRandomPosition(centerLat, centerLng, 100, radiusMeters);
    anchorPoints.push(randomPos);
  }
  
  // Now spawn supplies at these anchor points, ensuring spacing
  for (const anchor of anchorPoints) {
    if (supplies.length >= totalCount) break;
    
    // Try to find a position that's spread out from others
    const position = generateSpreadOutPosition(
      anchor.lat,
      anchor.lng,
      existingPositions,
      30, // Min radius: 30m
      100, // Max radius: 100m (smaller since we're using anchor points)
      MIN_SPAWN_DISTANCE
    );
    
    if (!position) {
      // Skip if we can't find a good position
      continue;
    }
    
    existingPositions.push(position);
    
    // Distribution: 60% film, 20% boost, 20% charm
    const roll = Math.random();
    let type: SupplyType;
    let rarity: 'common' | 'uncommon';
    let amount: number;

    if (roll < 0.6) {
      type = 'film';
      rarity = 'common';
      amount = Math.floor(Math.random() * 3) + 3; // 3-5
    } else if (roll < 0.8) {
      type = 'boost';
      rarity = 'uncommon';
      amount = 1;
    } else {
      type = 'charm';
      rarity = 'uncommon';
      amount = 1;
    }

    supplies.push({
      id: `supply-${Date.now()}-${supplies.length}`,
      lat: position.lat,
      lng: position.lng,
      type,
      amount,
      rarity,
    });
  }

  return supplies;
}

/**
 * Generate random field journal nodes scattered across a large area
 * Uses POI locations as anchor points to ensure consistent coverage
 * @param centerLat - Center latitude (player or map center)
 * @param centerLng - Center longitude (player or map center)
 * @param poiLocations - Array of POI locations to use as anchor points
 * @param radiusMeters - Radius to scatter across (default: 2500m - same as POI fetch)
 * @returns Array of field journal nodes
 */
export function generateRandomFieldJournals(
  centerLat: number,
  centerLng: number,
  poiLocations: Array<{ lat: number; lng: number }> = [],
  radiusMeters: number = 2500
): FieldJournalNode[] {
  const journals: FieldJournalNode[] = [];
  const existingPositions: Array<{ lat: number; lng: number }> = [];
  
  // Access store directly (not a hook, so we use getState())
  const ghosts = useGhostStore.getState().getAllGhosts();
  
  // Get available journal IDs (one per ghost type)
  const availableJournalIds = ghosts.map(ghost => `journal-${ghost.id}`);
  
  // Generate more journals across the larger area (5-8 total, still rare)
  const totalCount = Math.floor(Math.random() * 4) + 5; // 5-8 journals
  
  // Shuffle and take random ones
  const shuffled = [...availableJournalIds].sort(() => Math.random() - 0.5);
  const selectedJournalIds = shuffled.slice(0, Math.min(totalCount, availableJournalIds.length));

  // Minimum 80m between journals (they're rarer, so space them out more)
  const MIN_JOURNAL_DISTANCE = 80;
  
  // Use POI locations as anchor points, plus random positions
  const anchorPoints: Array<{ lat: number; lng: number }> = [];
  
  // Add POI locations as anchor points (spawn near POIs, but rarer)
  poiLocations.forEach(poi => {
    // 30% chance to add a journal near each POI (within 100-200m)
    if (Math.random() < 0.3) {
      const offset = generateRandomPosition(poi.lat, poi.lng, 100, 200);
      anchorPoints.push(offset);
    }
  });
  
  // Add random positions across the entire area
  const randomCount = totalCount - anchorPoints.length;
  for (let i = 0; i < randomCount; i++) {
    const randomPos = generateRandomPosition(centerLat, centerLng, 200, radiusMeters);
    anchorPoints.push(randomPos);
  }

  selectedJournalIds.forEach((journalId, index) => {
    if (index >= anchorPoints.length) return;
    
    const anchor = anchorPoints[index];
    
    // Try to find a position that's spread out from others
    const position = generateSpreadOutPosition(
      anchor.lat,
      anchor.lng,
      existingPositions,
      50, // Min radius: 50m
      150, // Max radius: 150m
      MIN_JOURNAL_DISTANCE
    );
    
    if (!position) {
      // Skip if we can't find a good position
      return;
    }
    
    existingPositions.push(position);
    
    journals.push({
      id: `field-journal-${Date.now()}-${index}`,
      lat: position.lat,
      lng: position.lng,
      journalId,
    });
  });

  return journals;
}



