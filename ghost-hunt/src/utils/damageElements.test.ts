import { describe, it, expect } from 'vitest';
import {
  generateLightScratches,
  generateDarkScratches,
  generateRustSpots,
  generatePaintChips,
  generateFingerprints,
  generateTapePatches,
  generateCaseDamage,
} from './damageElements';

describe('damageElements', () => {
  describe('generateLightScratches', () => {
    it('should generate the correct number of light scratches', () => {
      const scratches = generateLightScratches(7);
      expect(scratches).toHaveLength(7);
    });

    it('should generate scratches with correct properties', () => {
      const scratches = generateLightScratches(1);
      expect(scratches[0]).toHaveProperty('type', 'light-scratch');
      expect(scratches[0]).toHaveProperty('position');
      expect(scratches[0]).toHaveProperty('size');
      expect(scratches[0]).toHaveProperty('rotation');
      expect(scratches[0]).toHaveProperty('opacity');
      expect(scratches[0].size.height).toBe('2px');
    });

    it('should respect the count parameter', () => {
      expect(generateLightScratches(3)).toHaveLength(3);
      expect(generateLightScratches(8)).toHaveLength(8);
    });
  });

  describe('generateDarkScratches', () => {
    it('should generate the correct number of dark scratches', () => {
      const scratches = generateDarkScratches(4);
      expect(scratches).toHaveLength(4);
    });

    it('should generate scratches with correct type', () => {
      const scratches = generateDarkScratches(1);
      expect(scratches[0].type).toBe('dark-scratch');
    });
  });

  describe('generateRustSpots', () => {
    it('should generate the correct number of rust spots', () => {
      const spots = generateRustSpots(6);
      expect(spots).toHaveLength(6);
    });

    it('should generate rust spots with correct properties', () => {
      const spots = generateRustSpots(1);
      expect(spots[0].type).toBe('rust');
      expect(spots[0].size.width).toBe(spots[0].size.height); // Should be square
    });
  });

  describe('generatePaintChips', () => {
    it('should generate the correct number of paint chips', () => {
      const chips = generatePaintChips(5);
      expect(chips).toHaveLength(5);
    });

    it('should generate chips with correct type', () => {
      const chips = generatePaintChips(1);
      expect(chips[0].type).toBe('chip');
    });
  });

  describe('generateFingerprints', () => {
    it('should generate the correct number of fingerprints', () => {
      const prints = generateFingerprints(4);
      expect(prints).toHaveLength(4);
    });

    it('should generate fingerprints with correct properties', () => {
      const prints = generateFingerprints(1);
      expect(prints[0].type).toBe('smudge');
      expect(prints[0].size.width).toBe(prints[0].size.height); // Should be circular
    });
  });

  describe('generateTapePatches', () => {
    it('should generate the correct number of tape patches', () => {
      const patches = generateTapePatches(4);
      expect(patches).toHaveLength(4);
    });

    it('should generate tape patches with correct properties', () => {
      const patches = generateTapePatches(1);
      expect(patches[0].type).toBe('tape');
      expect(patches[0]).toHaveProperty('rotation');
      expect(patches[0]).toHaveProperty('note');
    });
  });

  describe('generateCaseDamage', () => {
    it('should generate all damage element types', () => {
      const damage = generateCaseDamage();
      
      expect(damage).toHaveProperty('lightScratches');
      expect(damage).toHaveProperty('darkScratches');
      expect(damage).toHaveProperty('rustSpots');
      expect(damage).toHaveProperty('paintChips');
      expect(damage).toHaveProperty('fingerprints');
      expect(damage).toHaveProperty('tapePatches');
    });

    it('should generate correct quantities of each damage type', () => {
      const damage = generateCaseDamage();
      
      expect(damage.lightScratches).toHaveLength(7); // 6-8
      expect(damage.darkScratches).toHaveLength(4); // 3-5
      expect(damage.rustSpots).toHaveLength(6); // 5-7
      expect(damage.paintChips).toHaveLength(5); // 4-6
      expect(damage.fingerprints).toHaveLength(4); // 3-5
      expect(damage.tapePatches).toHaveLength(4); // 3-5
    });
  });
});
