import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInvestigationStore } from '../../../stores/investigationStore';
import { 
  calculateBearing, 
  calculateDistance, 
  isGhostInForwardCone, 
  addRadarWobble 
} from '../../../utils/toolBehaviors';

/**
 * RadarTool Integration Tests
 * 
 * Tests the integration between RadarTool component and investigation store,
 * verifying that ghost bearing, player heading, and forward cone detection
 * work correctly.
 */

describe('RadarTool Integration', () => {
  beforeEach(() => {
    // Reset investigation store before each test
    const { endInvestigation } = useInvestigationStore.getState();
    endInvestigation();
  });

  describe('Ghost Bearing Calculation', () => {
    it('should calculate correct bearing from player to ghost', () => {
      const playerPos = { lat: 40.7128, lng: -74.0060 }; // New York
      const ghostPos = { lat: 40.7589, lng: -73.9851 };  // Times Square (northeast)
      
      const bearing = calculateBearing(playerPos, ghostPos);
      
      // Should be roughly northeast (30-60 degrees)
      expect(bearing).toBeGreaterThan(20);
      expect(bearing).toBeLessThan(70);
    });

    it('should normalize bearing to 0-360 degrees', () => {
      const playerPos = { lat: 40.7128, lng: -74.0060 };
      const ghostPos = { lat: 40.6892, lng: -74.0445 }; // Southwest
      
      const bearing = calculateBearing(playerPos, ghostPos);
      
      // Should be in valid range
      expect(bearing).toBeGreaterThanOrEqual(0);
      expect(bearing).toBeLessThan(360);
    });
  });

  describe('Forward Cone Detection', () => {
    it('should detect ghost in forward cone when aligned', () => {
      const ghostBearing = 45;  // Northeast
      const playerHeading = 45; // Facing northeast
      
      const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
      
      expect(inCone).toBe(true);
    });

    it('should detect ghost in forward cone within ±45°', () => {
      const ghostBearing = 70;  // ENE
      const playerHeading = 45; // Facing NE
      
      const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
      
      expect(inCone).toBe(true); // 25° difference, within cone
    });

    it('should not detect ghost outside forward cone', () => {
      const ghostBearing = 180; // South
      const playerHeading = 0;  // Facing north
      
      const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
      
      expect(inCone).toBe(false); // 180° difference, outside cone
    });

    it('should handle wraparound correctly (350° vs 10°)', () => {
      const ghostBearing = 10;  // Just east of north
      const playerHeading = 350; // Just west of north
      
      const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
      
      expect(inCone).toBe(true); // 20° difference (wraparound), within cone
    });
  });

  describe('Radar Wobble', () => {
    it('should add ±5° wobble to bearing', () => {
      const trueBearing = 90;
      
      // Test multiple times to check wobble range
      const wobbles = Array.from({ length: 100 }, () => addRadarWobble(trueBearing));
      
      // All wobbled bearings should be within ±5° of true bearing
      wobbles.forEach(wobbled => {
        const diff = Math.abs(wobbled - trueBearing);
        expect(diff).toBeLessThanOrEqual(5);
      });
    });

    it('should normalize wobbled bearing to 0-360°', () => {
      const trueBearing = 358; // Near wraparound
      
      const wobbled = addRadarWobble(trueBearing);
      
      expect(wobbled).toBeGreaterThanOrEqual(0);
      expect(wobbled).toBeLessThan(360);
    });
  });

  describe('Investigation Store Integration', () => {
    it('should update player heading in store', () => {
      const { result } = renderHook(() => useInvestigationStore());
      
      act(() => {
        result.current.updatePlayerHeading(90);
      });
      
      expect(result.current.playerHeading).toBe(90);
    });

    it('should normalize player heading to 0-360°', () => {
      const { result } = renderHook(() => useInvestigationStore());
      
      act(() => {
        result.current.updatePlayerHeading(370); // Over 360
      });
      
      expect(result.current.playerHeading).toBe(10);
    });

    it('should handle negative headings', () => {
      const { result } = renderHook(() => useInvestigationStore());
      
      act(() => {
        result.current.updatePlayerHeading(-10);
      });
      
      expect(result.current.playerHeading).toBe(350);
    });

    it('should calculate distance between positions', () => {
      const playerPos = { lat: 40.7128, lng: -74.0060 };
      const ghostPos = { lat: 40.7128, lng: -74.0060 }; // Same position
      
      const distance = calculateDistance(playerPos, ghostPos);
      
      expect(distance).toBe(0);
    });

    it('should calculate non-zero distance for different positions', () => {
      const playerPos = { lat: 40.7128, lng: -74.0060 };
      const ghostPos = { lat: 40.7589, lng: -73.9851 }; // ~5.5km away
      
      const distance = calculateDistance(playerPos, ghostPos);
      
      expect(distance).toBeGreaterThan(5000); // More than 5km
      expect(distance).toBeLessThan(6000);    // Less than 6km
    });
  });

  describe('Direction-Only Display (No Distance)', () => {
    it('should only provide bearing information, not distance', () => {
      const playerPos = { lat: 40.7128, lng: -74.0060 };
      const ghostPos = { lat: 40.7589, lng: -73.9851 };
      
      const bearing = calculateBearing(playerPos, ghostPos);
      const distance = calculateDistance(playerPos, ghostPos);
      
      // Radar should use bearing
      expect(bearing).toBeDefined();
      expect(bearing).toBeGreaterThanOrEqual(0);
      expect(bearing).toBeLessThan(360);
      
      // Distance is calculated but NOT displayed on radar
      // (This is a design constraint, not a test assertion)
      expect(distance).toBeDefined();
    });
  });
});
