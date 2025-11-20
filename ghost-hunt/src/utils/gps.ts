/**
 * GPS Utilities Module
 * 
 * Provides functions for GPS position calculations including:
 * - Distance calculation using Haversine formula
 * - Bearing calculation for navigation
 * - Position smoothing to reduce GPS jitter
 * - Ghost spawning within radius
 * 
 * @module gps
 */

/**
 * GPS Position interface
 * Represents a geographic coordinate with accuracy and timestamp
 */
export interface GPSPosition {
  /** Latitude in decimal degrees (-90 to 90) */
  lat: number;
  /** Longitude in decimal degrees (-180 to 180) */
  lng: number;
  /** Position accuracy in meters (lower is better) */
  accuracy: number;
  /** Unix timestamp in milliseconds */
  timestamp: number;
}

/**
 * Calculate distance between two GPS positions using Haversine formula
 * 
 * The Haversine formula calculates the great-circle distance between two points
 * on a sphere given their longitudes and latitudes. This is accurate for most
 * use cases on Earth (assumes spherical Earth, not ellipsoid).
 * 
 * Formula:
 * a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlng/2)
 * c = 2 × atan2(√a, √(1−a))
 * d = R × c
 * 
 * Where R is Earth's radius (6,371,000 meters)
 * 
 * @param pos1 First GPS position (starting point)
 * @param pos2 Second GPS position (destination point)
 * @returns Distance in meters (accurate to ~0.5% for distances up to ~1000km)
 * 
 * @example
 * const distance = haversineDistance(
 *   { lat: 40.7128, lng: -74.0060, accuracy: 10, timestamp: Date.now() },
 *   { lat: 40.7580, lng: -73.9855, accuracy: 10, timestamp: Date.now() }
 * );
 * console.log(`Distance: ${distance.toFixed(0)}m`); // ~5800m
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
 * 
 * Calculates the initial bearing (forward azimuth) from the starting point
 * to the destination point. The bearing is the angle between north and the
 * direction to the target, measured clockwise.
 * 
 * Formula:
 * y = sin(Δlng) × cos(lat2)
 * x = cos(lat1) × sin(lat2) − sin(lat1) × cos(lat2) × cos(Δlng)
 * bearing = atan2(y, x)
 * 
 * @param from Starting GPS position (observer location)
 * @param to Target GPS position (destination)
 * @returns Bearing in degrees (0-360°, where 0° = North, 90° = East, 180° = South, 270° = West)
 * 
 * @example
 * const bearing = calculateBearing(
 *   { lat: 40.7128, lng: -74.0060, accuracy: 10, timestamp: Date.now() },
 *   { lat: 40.7580, lng: -73.9855, accuracy: 10, timestamp: Date.now() }
 * );
 * console.log(`Bearing: ${bearing.toFixed(0)}°`); // ~23° (NNE)
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
 * 
 * Generates a random GPS position within a circular area around the hotspot.
 * Uses polar coordinates (angle + distance) for uniform distribution.
 * 
 * Conversion approximations:
 * - 1° latitude ≈ 111km (constant)
 * - 1° longitude ≈ 111km × cos(latitude) (varies by latitude)
 * 
 * @param hotspotPosition Center position (hotspot/player location)
 * @param spawnRadius Maximum spawn radius in meters (default: 50m)
 * @returns Random GPS position within the specified radius
 * 
 * @example
 * const ghostPos = spawnGhostPosition(
 *   { lat: 40.7128, lng: -74.0060, accuracy: 10, timestamp: Date.now() },
 *   30 // Spawn within 30 meters
 * );
 * console.log(`Ghost spawned at: ${ghostPos.lat}, ${ghostPos.lng}`);
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
 * GPS Position Smoother
 * 
 * Reduces GPS jitter by applying a weighted moving average to position history.
 * More recent positions are weighted higher to maintain responsiveness while
 * smoothing out noise.
 * 
 * Algorithm:
 * - Maintains history of last 3 positions
 * - Applies weights: [0.2, 0.3, 0.5] (most recent = highest weight)
 * - Returns weighted average of lat/lng
 * - Preserves worst-case accuracy from history
 * 
 * @example
 * const smoother = new GPSSmoother();
 * 
 * // Add positions as they arrive
 * const smoothed1 = smoother.addPosition(rawPosition1);
 * const smoothed2 = smoother.addPosition(rawPosition2);
 * const smoothed3 = smoother.addPosition(rawPosition3);
 * 
 * // Reset when needed
 * smoother.reset();
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
