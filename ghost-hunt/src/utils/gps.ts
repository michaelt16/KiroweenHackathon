// GPS utilities for distance and bearing calculations

export interface GPSPosition {
  lat: number;
  lng: number;
  accuracy: number; // Meters
  timestamp: number;
}

/**
 * Calculate distance between two GPS positions using Haversine formula
 * @param pos1 First GPS position
 * @param pos2 Second GPS position
 * @returns Distance in meters
 */
export function haversineDistance(pos1: GPSPosition, pos2: GPSPosition): number {
  const R = 6371000; // Earth radius in meters

  const lat1 = (pos1.lat * Math.PI) / 180;
  const lat2 = (pos2.lat * Math.PI) / 180;
  const deltaLat = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const deltaLng = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Calculate bearing from one GPS position to another
 * @param from Starting GPS position
 * @param to Target GPS position
 * @returns Bearing in degrees (0-360°, where 0° is north)
 */
export function calculateBearing(from: GPSPosition, to: GPSPosition): number {
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const deltaLng = ((to.lng - from.lng) * Math.PI) / 180;

  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;

  return (bearing + 360) % 360; // Normalize to 0-360°
}

/**
 * Convert distance in meters to normalized 0-1 value
 * @param meters Distance in meters
 * @param maxDistance Maximum distance for normalization (default: 50m)
 * @returns Normalized distance (0-1)
 */
export function normalizeDistance(meters: number, maxDistance: number = 50): number {
  return Math.min(1, Math.max(0, meters / maxDistance));
}

/**
 * Spawn a ghost at a random position within radius of a hotspot
 * @param hotspotPosition Center position (hotspot)
 * @param spawnRadius Radius in meters (default: 50m)
 * @returns Random GPS position within radius
 */
export function spawnGhostPosition(hotspotPosition: GPSPosition, spawnRadius: number = 50): GPSPosition {
  // Random angle (0-2π)
  const angle = Math.random() * 2 * Math.PI;

  // Random distance within radius
  const distance = Math.random() * spawnRadius;

  // Convert to lat/lng offset
  // 1 degree lat ≈ 111km, 1 degree lng ≈ 111km * cos(lat)
  const latOffset = (distance * Math.cos(angle)) / 111000;
  const lngOffset = (distance * Math.sin(angle)) / (111000 * Math.cos((hotspotPosition.lat * Math.PI) / 180));

  return {
    lat: hotspotPosition.lat + latOffset,
    lng: hotspotPosition.lng + lngOffset,
    accuracy: 0,
    timestamp: Date.now(),
  };
}

/**
 * GPS position smoother to reduce jitter
 * Uses weighted moving average with more weight on recent positions
 */
export class GPSSmoother {
  private positions: GPSPosition[] = [];
  private maxPositions = 3;
  private weights = [0.2, 0.3, 0.5]; // Last position weighted most

  /**
   * Add a new GPS position and get smoothed result
   * @param position New GPS position
   * @returns Smoothed GPS position
   */
  addPosition(position: GPSPosition): GPSPosition {
    this.positions.push(position);

    // Keep only last N positions
    if (this.positions.length > this.maxPositions) {
      this.positions.shift();
    }

    // If only one position, return it
    if (this.positions.length === 1) {
      return position;
    }

    // Weighted average
    let latSum = 0;
    let lngSum = 0;
    let weightSum = 0;

    this.positions.forEach((p, i) => {
      const weight = this.weights[i] || 0.33;
      latSum += p.lat * weight;
      lngSum += p.lng * weight;
      weightSum += weight;
    });

    return {
      lat: latSum / weightSum,
      lng: lngSum / weightSum,
      accuracy: Math.max(...this.positions.map((p) => p.accuracy)),
      timestamp: Date.now(),
    };
  }

  /**
   * Reset the smoother
   */
  reset(): void {
    this.positions = [];
  }
}
