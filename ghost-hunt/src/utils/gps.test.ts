// GPS utilities tests
import { describe, it, expect } from 'vitest';
import {
  haversineDistance,
  calculateBearing,
  normalizeDistance,
  spawnGhostPosition,
  GPSSmoother,
  type GPSPosition,
} from './gps';

describe('GPS Utilities', () => {
  describe('haversineDistance', () => {
    it('should calculate distance between two points', () => {
      const pos1: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };
      const pos2: GPSPosition = { lat: 40.7614, lng: -73.9776, accuracy: 10, timestamp: Date.now() };

      const distance = haversineDistance(pos1, pos2);

      // Distance between these NYC coordinates is approximately 5.8km
      expect(distance).toBeGreaterThan(5000);
      expect(distance).toBeLessThan(6000);
    });

    it('should return 0 for same position', () => {
      const pos: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };

      const distance = haversineDistance(pos, pos);

      expect(distance).toBe(0);
    });

    it('should handle positions across equator', () => {
      const pos1: GPSPosition = { lat: 10, lng: 0, accuracy: 10, timestamp: Date.now() };
      const pos2: GPSPosition = { lat: -10, lng: 0, accuracy: 10, timestamp: Date.now() };

      const distance = haversineDistance(pos1, pos2);

      // 20 degrees of latitude ≈ 2,222km
      expect(distance).toBeGreaterThan(2200000);
      expect(distance).toBeLessThan(2250000);
    });
  });

  describe('calculateBearing', () => {
    it('should calculate bearing north', () => {
      const from: GPSPosition = { lat: 40, lng: -74, accuracy: 10, timestamp: Date.now() };
      const to: GPSPosition = { lat: 41, lng: -74, accuracy: 10, timestamp: Date.now() };

      const bearing = calculateBearing(from, to);

      // Should be approximately 0° (north)
      expect(bearing).toBeGreaterThan(359);
      expect(bearing).toBeLessThan(1);
    });

    it('should calculate bearing east', () => {
      const from: GPSPosition = { lat: 40, lng: -74, accuracy: 10, timestamp: Date.now() };
      const to: GPSPosition = { lat: 40, lng: -73, accuracy: 10, timestamp: Date.now() };

      const bearing = calculateBearing(from, to);

      // Should be approximately 90° (east)
      expect(bearing).toBeGreaterThan(89);
      expect(bearing).toBeLessThan(91);
    });

    it('should calculate bearing south', () => {
      const from: GPSPosition = { lat: 40, lng: -74, accuracy: 10, timestamp: Date.now() };
      const to: GPSPosition = { lat: 39, lng: -74, accuracy: 10, timestamp: Date.now() };

      const bearing = calculateBearing(from, to);

      // Should be approximately 180° (south)
      expect(bearing).toBeGreaterThan(179);
      expect(bearing).toBeLessThan(181);
    });

    it('should calculate bearing west', () => {
      const from: GPSPosition = { lat: 40, lng: -74, accuracy: 10, timestamp: Date.now() };
      const to: GPSPosition = { lat: 40, lng: -75, accuracy: 10, timestamp: Date.now() };

      const bearing = calculateBearing(from, to);

      // Should be approximately 270° (west)
      expect(bearing).toBeGreaterThan(269);
      expect(bearing).toBeLessThan(271);
    });

    it('should return value between 0-360', () => {
      const from: GPSPosition = { lat: 40, lng: -74, accuracy: 10, timestamp: Date.now() };
      const to: GPSPosition = { lat: 41, lng: -73, accuracy: 10, timestamp: Date.now() };

      const bearing = calculateBearing(from, to);

      expect(bearing).toBeGreaterThanOrEqual(0);
      expect(bearing).toBeLessThan(360);
    });
  });

  describe('normalizeDistance', () => {
    it('should normalize distance to 0-1 range', () => {
      expect(normalizeDistance(0, 50)).toBe(0);
      expect(normalizeDistance(25, 50)).toBe(0.5);
      expect(normalizeDistance(50, 50)).toBe(1);
    });

    it('should clamp values above max to 1', () => {
      expect(normalizeDistance(100, 50)).toBe(1);
      expect(normalizeDistance(200, 50)).toBe(1);
    });

    it('should handle negative values', () => {
      expect(normalizeDistance(-10, 50)).toBe(0);
    });

    it('should use default max distance of 50m', () => {
      expect(normalizeDistance(25)).toBe(0.5);
      expect(normalizeDistance(50)).toBe(1);
    });
  });

  describe('spawnGhostPosition', () => {
    it('should spawn within specified radius', () => {
      const hotspot: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };
      const radius = 50; // meters

      const ghostPos = spawnGhostPosition(hotspot, radius);

      const distance = haversineDistance(hotspot, ghostPos);

      expect(distance).toBeLessThanOrEqual(radius);
      expect(distance).toBeGreaterThanOrEqual(0);
    });

    it('should spawn at different positions each time', () => {
      const hotspot: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };

      const pos1 = spawnGhostPosition(hotspot, 50);
      const pos2 = spawnGhostPosition(hotspot, 50);
      const pos3 = spawnGhostPosition(hotspot, 50);

      // Very unlikely all three are identical
      const allSame = pos1.lat === pos2.lat && pos2.lat === pos3.lat && pos1.lng === pos2.lng && pos2.lng === pos3.lng;

      expect(allSame).toBe(false);
    });

    it('should use default radius of 50m', () => {
      const hotspot: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };

      const ghostPos = spawnGhostPosition(hotspot);

      const distance = haversineDistance(hotspot, ghostPos);

      expect(distance).toBeLessThanOrEqual(50);
    });
  });

  describe('GPSSmoother', () => {
    it('should return single position unchanged', () => {
      const smoother = new GPSSmoother();
      const pos: GPSPosition = { lat: 40.7128, lng: -74.006, accuracy: 10, timestamp: Date.now() };

      const smoothed = smoother.addPosition(pos);

      expect(smoothed.lat).toBe(pos.lat);
      expect(smoothed.lng).toBe(pos.lng);
    });

    it('should smooth multiple positions', () => {
      const smoother = new GPSSmoother();

      const pos1: GPSPosition = { lat: 40.71, lng: -74.0, accuracy: 10, timestamp: Date.now() };
      const pos2: GPSPosition = { lat: 40.72, lng: -74.01, accuracy: 10, timestamp: Date.now() };
      const pos3: GPSPosition = { lat: 40.73, lng: -74.02, accuracy: 10, timestamp: Date.now() };

      smoother.addPosition(pos1);
      smoother.addPosition(pos2);
      const smoothed = smoother.addPosition(pos3);

      // Smoothed should be weighted average (last position weighted most)
      // weights: [0.2, 0.3, 0.5]
      const expectedLat = (40.71 * 0.2 + 40.72 * 0.3 + 40.73 * 0.5) / 1.0;
      const expectedLng = (-74.0 * 0.2 + -74.01 * 0.3 + -74.02 * 0.5) / 1.0;

      expect(smoothed.lat).toBeCloseTo(expectedLat, 5);
      expect(smoothed.lng).toBeCloseTo(expectedLng, 5);
    });

    it('should keep only last 3 positions', () => {
      const smoother = new GPSSmoother();

      const positions: GPSPosition[] = [
        { lat: 40.71, lng: -74.0, accuracy: 10, timestamp: Date.now() },
        { lat: 40.72, lng: -74.01, accuracy: 10, timestamp: Date.now() },
        { lat: 40.73, lng: -74.02, accuracy: 10, timestamp: Date.now() },
        { lat: 40.74, lng: -74.03, accuracy: 10, timestamp: Date.now() },
      ];

      positions.forEach((pos) => smoother.addPosition(pos));

      // After 4 positions, first one should be dropped
      // Smoother should only use last 3
      const smoothed = smoother.addPosition({ lat: 40.75, lng: -74.04, accuracy: 10, timestamp: Date.now() });

      // Should be weighted average of positions 3, 4, 5 (not 1, 2)
      expect(smoothed.lat).toBeGreaterThan(40.73);
    });

    it('should reset correctly', () => {
      const smoother = new GPSSmoother();

      smoother.addPosition({ lat: 40.71, lng: -74.0, accuracy: 10, timestamp: Date.now() });
      smoother.addPosition({ lat: 40.72, lng: -74.01, accuracy: 10, timestamp: Date.now() });

      smoother.reset();

      const pos: GPSPosition = { lat: 40.73, lng: -74.02, accuracy: 10, timestamp: Date.now() };
      const smoothed = smoother.addPosition(pos);

      // After reset, should return position unchanged
      expect(smoothed.lat).toBe(pos.lat);
      expect(smoothed.lng).toBe(pos.lng);
    });

    it('should use max accuracy from all positions', () => {
      const smoother = new GPSSmoother();

      smoother.addPosition({ lat: 40.71, lng: -74.0, accuracy: 10, timestamp: Date.now() });
      smoother.addPosition({ lat: 40.72, lng: -74.01, accuracy: 25, timestamp: Date.now() });
      const smoothed = smoother.addPosition({ lat: 40.73, lng: -74.02, accuracy: 15, timestamp: Date.now() });

      // Should use worst (highest) accuracy
      expect(smoothed.accuracy).toBe(25);
    });
  });
});
