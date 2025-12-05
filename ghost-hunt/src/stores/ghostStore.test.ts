import { describe, it, expect } from 'vitest';
import { GhostType, SpiritBoxPersonality } from './ghostStore';
import {
  Q1_COMMON,
  Q1_AGGRESSIVE,
  Q1_SHY,
  Q1_CHAOTIC,
  Q1_UNIQUE,
  Q2_COMMON,
  Q2_AGGRESSIVE,
  Q2_SHY,
  Q2_CHAOTIC,
  Q2_UNIQUE,
  Q3_COMMON,
  Q3_AGGRESSIVE,
  Q3_SHY,
  Q3_CHAOTIC,
  Q3_UNIQUE,
} from '../data/spiritBoxWords';

// Import the initial ghosts data directly
import { useGhostStore } from './ghostStore';

describe('Ghost Store - Spirit Box Word Pools', () => {
  it('should have word pools configured for all ghosts', () => {
    const store = useGhostStore.getState();
    const allGhosts = store.getAllGhosts();

    expect(allGhosts).toHaveLength(7);

    allGhosts.forEach((ghost) => {
      expect(ghost.spiritBoxResponse).toBeDefined();
      expect(ghost.spiritBoxResponse.wordPools).toBeDefined();
      expect(ghost.spiritBoxResponse.wordPools.q1).toBeDefined();
      expect(ghost.spiritBoxResponse.wordPools.q2).toBeDefined();
      expect(ghost.spiritBoxResponse.wordPools.q3).toBeDefined();
    });
  });

  it('should have correct response frequencies', () => {
    const store = useGhostStore.getState();

    // Aggressive ghosts: 75% (0.75)
    expect(store.getGhost(GhostType.WRAITH)?.spiritBoxResponse.frequency).toBe(0.75);
    expect(store.getGhost(GhostType.ONYX)?.spiritBoxResponse.frequency).toBe(0.75);
    expect(store.getGhost(GhostType.TRICKSTER)?.spiritBoxResponse.frequency).toBe(0.75);

    // Shy ghosts: 35% (0.35)
    expect(store.getGhost(GhostType.SHADE)?.spiritBoxResponse.frequency).toBe(0.35);
    expect(store.getGhost(GhostType.BANSHEE)?.spiritBoxResponse.frequency).toBe(0.35);

    // Chaotic ghosts: 55% (0.55)
    expect(store.getGhost(GhostType.POLTERGEIST)?.spiritBoxResponse.frequency).toBe(0.55);
    expect(store.getGhost(GhostType.PHANTOM)?.spiritBoxResponse.frequency).toBe(0.55);
  });

  it('should have correct personality assignments', () => {
    const store = useGhostStore.getState();

    // Aggressive
    expect(store.getGhost(GhostType.WRAITH)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.AGGRESSIVE);
    expect(store.getGhost(GhostType.ONYX)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.AGGRESSIVE);

    // Shy
    expect(store.getGhost(GhostType.SHADE)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.SHY);
    expect(store.getGhost(GhostType.BANSHEE)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.SHY);

    // Chaotic
    expect(store.getGhost(GhostType.POLTERGEIST)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.CHAOTIC);
    expect(store.getGhost(GhostType.PHANTOM)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.CHAOTIC);

    // Contradictory
    expect(store.getGhost(GhostType.TRICKSTER)?.spiritBoxResponse.personality).toBe(SpiritBoxPersonality.CONTRADICTORY);
  });

  it('should have common words for all ghosts', () => {
    const store = useGhostStore.getState();
    const allGhosts = store.getAllGhosts();

    allGhosts.forEach((ghost) => {
      expect(ghost.spiritBoxResponse.wordPools.q1.common).toEqual(Q1_COMMON);
      expect(ghost.spiritBoxResponse.wordPools.q2.common).toEqual(Q2_COMMON);
      expect(ghost.spiritBoxResponse.wordPools.q3.common).toEqual(Q3_COMMON);
    });
  });

  it('should have correct personality words for Wraith (Aggressive)', () => {
    const store = useGhostStore.getState();
    const wraith = store.getGhost(GhostType.WRAITH);

    expect(wraith?.spiritBoxResponse.wordPools.q1.personality).toEqual(Q1_AGGRESSIVE);
    expect(wraith?.spiritBoxResponse.wordPools.q2.personality).toEqual(Q2_AGGRESSIVE);
    expect(wraith?.spiritBoxResponse.wordPools.q3.personality).toEqual(Q3_AGGRESSIVE);
  });

  it('should have correct personality words for Shade (Shy)', () => {
    const store = useGhostStore.getState();
    const shade = store.getGhost(GhostType.SHADE);

    expect(shade?.spiritBoxResponse.wordPools.q1.personality).toEqual(Q1_SHY);
    expect(shade?.spiritBoxResponse.wordPools.q2.personality).toEqual(Q2_SHY);
    expect(shade?.spiritBoxResponse.wordPools.q3.personality).toEqual(Q3_SHY);
  });

  it('should have correct personality words for Poltergeist (Chaotic)', () => {
    const store = useGhostStore.getState();
    const poltergeist = store.getGhost(GhostType.POLTERGEIST);

    expect(poltergeist?.spiritBoxResponse.wordPools.q1.personality).toEqual(Q1_CHAOTIC);
    expect(poltergeist?.spiritBoxResponse.wordPools.q2.personality).toEqual(Q2_CHAOTIC);
    expect(poltergeist?.spiritBoxResponse.wordPools.q3.personality).toEqual(Q3_CHAOTIC);
  });

  it('should have ALL personality words for Trickster', () => {
    const store = useGhostStore.getState();
    const trickster = store.getGhost(GhostType.TRICKSTER);

    // Q1 should have all aggressive, shy, and chaotic words
    const expectedQ1 = [...Q1_AGGRESSIVE, ...Q1_SHY, ...Q1_CHAOTIC];
    expect(trickster?.spiritBoxResponse.wordPools.q1.personality).toEqual(expectedQ1);

    // Q2 should have all aggressive, shy, and chaotic words
    const expectedQ2 = [...Q2_AGGRESSIVE, ...Q2_SHY, ...Q2_CHAOTIC];
    expect(trickster?.spiritBoxResponse.wordPools.q2.personality).toEqual(expectedQ2);

    // Q3 should have all aggressive, shy, and chaotic words
    const expectedQ3 = [...Q3_AGGRESSIVE, ...Q3_SHY, ...Q3_CHAOTIC];
    expect(trickster?.spiritBoxResponse.wordPools.q3.personality).toEqual(expectedQ3);
  });

  it('should have correct unique words for each ghost', () => {
    const store = useGhostStore.getState();

    expect(store.getGhost(GhostType.WRAITH)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.wraith);
    expect(store.getGhost(GhostType.SHADE)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.shade);
    expect(store.getGhost(GhostType.POLTERGEIST)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.poltergeist);
    expect(store.getGhost(GhostType.BANSHEE)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.banshee);
    expect(store.getGhost(GhostType.PHANTOM)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.phantom);
    expect(store.getGhost(GhostType.ONYX)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.onyx);
    expect(store.getGhost(GhostType.TRICKSTER)?.spiritBoxResponse.wordPools.q1.unique).toEqual(Q1_UNIQUE.trickster);
  });

  it('should have non-empty word pools for all questions', () => {
    const store = useGhostStore.getState();
    const allGhosts = store.getAllGhosts();

    allGhosts.forEach((ghost) => {
      // Common words should not be empty
      expect(ghost.spiritBoxResponse.wordPools.q1.common.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q2.common.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q3.common.length).toBeGreaterThan(0);

      // Personality words should not be empty
      expect(ghost.spiritBoxResponse.wordPools.q1.personality.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q2.personality.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q3.personality.length).toBeGreaterThan(0);

      // Unique words should not be empty
      expect(ghost.spiritBoxResponse.wordPools.q1.unique.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q2.unique.length).toBeGreaterThan(0);
      expect(ghost.spiritBoxResponse.wordPools.q3.unique.length).toBeGreaterThan(0);
    });
  });
});
