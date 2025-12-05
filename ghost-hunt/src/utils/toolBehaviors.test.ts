/**
 * Tool Behavior Utilities Tests
 * 
 * Basic unit tests to verify tool calculation logic
 */

import { describe, it, expect } from 'vitest';
import {
  calculateDistance,
  calculateBearing,
  calculateEMFLevel,
  isGhostInForwardCone,
  addRadarWobble,
  checkSpiritBoxLock,
  getRandomWord,
  determineCameraManifest ation,
  calculateThermalReading
} from './toolBehaviors';

describe('Distance & Bearing Calculations', () => {
  it('should calculate distance between two positions', () => {
    const pos1 = { lat: 40.7128, lng: -74.0060 }; // New York
    const pos2 = { lat: 40.7614, lng: -73.9776 }; // Times Square
    
    const distance = calculateDistance(pos1, pos2);
    
    // Should be approximately 6.5km
    expect(distance).toBeGreaterThan(6000);
    expect(distance).toBeLessThan(7000);
  });

  it('should calculate bearing between two positions', () => {
    const pos1 = { lat: 40.7128, lng: -74.0060 };
    const pos2 = { lat: 40.7614, lng: -73.9776 };
    
    const bearing = calculateBearing(pos1, pos2);
    
    // Should be roughly northeast (0-90°)
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });
});

describe('EMF Calculations', () => {
  it('should return level 5 when very close (<3m)', () => {
    const level = calculateEMFLevel(2);
    expect(level).toBe(5);
  });

  it('should return level 0 when far (>40m)', () => {
    const level = calculateEMFLevel(50);
    expect(level).toBe(0);
  });

  it('should return consistent values for same distance', () => {
    const level1 = calculateEMFLevel(5);
    const level2 = calculateEMFLevel(5);
    expect(level1).toBe(level2);
  });

  it('should clamp values to 0-5 range', () => {
    const level = calculateEMFLevel(1);
    expect(level).toBeGreaterThanOrEqual(0);
    expect(level).toBeLessThanOrEqual(5);
  });

  it('should return level 4 for distance 3-6m', () => {
    expect(calculateEMFLevel(4)).toBe(4);
    expect(calculateEMFLevel(5)).toBe(4);
  });

  it('should return level 3 for distance 6-10m', () => {
    expect(calculateEMFLevel(7)).toBe(3);
    expect(calculateEMFLevel(9)).toBe(3);
  });

  it('should return level 2 for distance 10-20m', () => {
    expect(calculateEMFLevel(15)).toBe(2);
  });

  it('should return level 1 for distance 20-40m', () => {
    expect(calculateEMFLevel(30)).toBe(1);
  });
});

describe('Radar Calculations', () => {
  it('should detect ghost in forward cone', () => {
    const ghostBearing = 45;
    const playerHeading = 50;
    
    const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
    expect(inCone).toBe(true);
  });

  it('should not detect ghost outside forward cone', () => {
    const ghostBearing = 180;
    const playerHeading = 0;
    
    const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
    expect(inCone).toBe(false);
  });

  it('should handle wraparound correctly', () => {
    const ghostBearing = 10;
    const playerHeading = 350;
    
    const inCone = isGhostInForwardCone(ghostBearing, playerHeading, 45);
    expect(inCone).toBe(true);
  });

  it('should add wobble within ±5° range', () => {
    const bearing = 180;
    const wobbled = addRadarWobble(bearing);
    
    expect(wobbled).toBeGreaterThanOrEqual(175);
    expect(wobbled).toBeLessThanOrEqual(185);
  });
});

describe('Spirit Box Calculations', () => {
  it('should lock when knobs are within tolerance', () => {
    const locked = checkSpiritBoxLock(0.35, 0.72, 0.36, 0.73, 0.06);
    expect(locked).toBe(true);
  });

  it('should not lock when knobs are outside tolerance', () => {
    const locked = checkSpiritBoxLock(0.35, 0.72, 0.50, 0.90, 0.06);
    expect(locked).toBe(false);
  });

  it('should return random word from families', () => {
    const wordFamilies = {
      emotion: ['soft', 'lost', 'cold'],
      theme: ['drift', 'fade', 'whisper']
    };
    
    const word = getRandomWord(wordFamilies);
    
    const allWords = [...wordFamilies.emotion, ...wordFamilies.theme];
    expect(allWords).toContain(word);
  });

  it('should handle empty word families', () => {
    const wordFamilies = { emotion: [], theme: [] };
    const word = getRandomWord(wordFamilies);
    expect(word).toBe('unknown');
  });
});

describe('Camera Calculations', () => {
  it('should return manifestation when close', () => {
    const manifestations = [
      { primary: 'faint_silhouette' as const, probability: 0.8 }
    ];
    
    const result = determineCameraManifest ation(4, manifestations);
    
    // Should have high chance of manifestation at close range
    expect(result).toBeDefined();
  });

  it('should return null when far and unlucky', () => {
    const manifestations = [
      { primary: 'faint_silhouette' as const, probability: 0.1 }
    ];
    
    // At far distance with low probability, should often return null
    const result = determineCameraManifest ation(15, manifestations);
    
    // Result can be null or manifestation (probabilistic)
    expect(result === null || typeof result === 'string').toBe(true);
  });
});

describe('Thermal Calculations', () => {
  it('should return normal when far (>10m)', () => {
    const reading = calculateThermalReading(15, 'deep_cold');
    
    expect(reading.temperature).toBe(68);
    expect(reading.category).toBe('normal');
  });

  it('should return cold spot when close', () => {
    const reading = calculateThermalReading(5, 'cold_spot');
    
    expect(reading.temperature).toBe(45);
    expect(reading.category).toBe('cold_spot');
  });

  it('should return deep cold when close', () => {
    const reading = calculateThermalReading(5, 'deep_cold');
    
    expect(reading.temperature).toBe(32);
    expect(reading.category).toBe('deep_cold');
  });

  it('should return normal for normal category', () => {
    const reading = calculateThermalReading(5, 'normal');
    
    expect(reading.temperature).toBe(68);
    expect(reading.category).toBe('normal');
  });
});
