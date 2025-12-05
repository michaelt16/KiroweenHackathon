/**
 * Tests for Spirit Box Word Pool System - Context-Aware Word Selection
 * 
 * This test file validates that the context-aware word selection system
 * works correctly for all ghost types and questions.
 */

import {
  selectContextualWord,
  shouldGhostRespond,
  getGhostPersonality,
  getQuestionContext,
  getWordPools,
  type GhostType,
  type QuestionId,
} from './spiritBoxWords';

describe('Spirit Box Word Pool System', () => {
  describe('selectContextualWord', () => {
    it('should return a word and category for each ghost type and question', () => {
      const ghostTypes: GhostType[] = ['wraith', 'banshee', 'shade', 'poltergeist', 'phantom', 'onyx', 'trickster'];
      const questions: QuestionId[] = ['q1', 'q2', 'q3'];

      ghostTypes.forEach((ghostType) => {
        questions.forEach((questionId) => {
          const result = selectContextualWord(ghostType, questionId);
          
          expect(result).toHaveProperty('word');
          expect(result).toHaveProperty('category');
          expect(typeof result.word).toBe('string');
          expect(result.word.length).toBeGreaterThan(0);
          expect(['common', 'personality', 'unique']).toContain(result.category);
        });
      });
    });

    it('should select words from appropriate pools based on probability', () => {
      const iterations = 1000;
      const results = {
        common: 0,
        personality: 0,
        unique: 0,
      };

      // Test with Wraith (non-Trickster)
      for (let i = 0; i < iterations; i++) {
        const result = selectContextualWord('wraith', 'q1');
        results[result.category]++;
      }

      // Expected: ~30% common, ~55% personality, ~15% unique
      const commonPercent = (results.common / iterations) * 100;
      const personalityPercent = (results.personality / iterations) * 100;
      const uniquePercent = (results.unique / iterations) * 100;

      // Allow 10% margin of error
      expect(commonPercent).toBeGreaterThan(20);
      expect(commonPercent).toBeLessThan(40);
      expect(personalityPercent).toBeGreaterThan(45);
      expect(personalityPercent).toBeLessThan(65);
      expect(uniquePercent).toBeGreaterThan(5);
      expect(uniquePercent).toBeLessThan(25);
    });

    it('should give Trickster higher common word frequency', () => {
      const iterations = 1000;
      const tricksterResults = {
        common: 0,
        personality: 0,
        unique: 0,
      };
      const wraithResults = {
        common: 0,
        personality: 0,
        unique: 0,
      };

      // Test Trickster
      for (let i = 0; i < iterations; i++) {
        const result = selectContextualWord('trickster', 'q1');
        tricksterResults[result.category]++;
      }

      // Test Wraith (for comparison)
      for (let i = 0; i < iterations; i++) {
        const result = selectContextualWord('wraith', 'q1');
        wraithResults[result.category]++;
      }

      const tricksterCommonPercent = (tricksterResults.common / iterations) * 100;
      const wraithCommonPercent = (wraithResults.common / iterations) * 100;

      // Trickster should have ~40% common vs Wraith's ~30%
      expect(tricksterCommonPercent).toBeGreaterThan(wraithCommonPercent);
      expect(tricksterCommonPercent).toBeGreaterThan(30);
      expect(tricksterCommonPercent).toBeLessThan(50);
    });

    it('should return context-appropriate words for each question', () => {
      const ghostType: GhostType = 'wraith';
      
      // Test Q1 (motivation)
      const q1Result = selectContextualWord(ghostType, 'q1');
      const q1Pools = getWordPools(ghostType, 'q1');
      const q1AllWords = [...q1Pools.common, ...q1Pools.personality, ...q1Pools.unique];
      expect(q1AllWords).toContain(q1Result.word);

      // Test Q2 (location)
      const q2Result = selectContextualWord(ghostType, 'q2');
      const q2Pools = getWordPools(ghostType, 'q2');
      const q2AllWords = [...q2Pools.common, ...q2Pools.personality, ...q2Pools.unique];
      expect(q2AllWords).toContain(q2Result.word);

      // Test Q3 (confirmation)
      const q3Result = selectContextualWord(ghostType, 'q3');
      const q3Pools = getWordPools(ghostType, 'q3');
      const q3AllWords = [...q3Pools.common, ...q3Pools.personality, ...q3Pools.unique];
      expect(q3AllWords).toContain(q3Result.word);
    });

    it('should allow Trickster to use ALL personality words', () => {
      const iterations = 100;
      const wordsUsed = new Set<string>();

      for (let i = 0; i < iterations; i++) {
        const result = selectContextualWord('trickster', 'q1');
        if (result.category === 'personality') {
          wordsUsed.add(result.word);
        }
      }

      // Trickster should use words from multiple personality types
      // (Aggressive, Shy, Chaotic words should all appear)
      const pools = getWordPools('trickster', 'q1');
      
      // Check that we're getting variety (at least 5 different personality words)
      expect(wordsUsed.size).toBeGreaterThanOrEqual(5);
      
      // All words used should be in the personality pool
      wordsUsed.forEach((word) => {
        expect(pools.personality).toContain(word);
      });
    });
  });

  describe('shouldGhostRespond', () => {
    it('should return boolean for all ghost types', () => {
      const ghostTypes: GhostType[] = ['wraith', 'banshee', 'shade', 'poltergeist', 'phantom', 'onyx', 'trickster'];

      ghostTypes.forEach((ghostType) => {
        const result = shouldGhostRespond(ghostType);
        expect(typeof result).toBe('boolean');
      });
    });

    it('should respect response frequency rates', () => {
      const iterations = 1000;

      // Test Aggressive ghosts (75% response rate)
      let aggressiveResponses = 0;
      for (let i = 0; i < iterations; i++) {
        if (shouldGhostRespond('wraith')) aggressiveResponses++;
      }
      const aggressivePercent = (aggressiveResponses / iterations) * 100;
      expect(aggressivePercent).toBeGreaterThan(65); // 70-80% range
      expect(aggressivePercent).toBeLessThan(85);

      // Test Shy ghosts (35% response rate)
      let shyResponses = 0;
      for (let i = 0; i < iterations; i++) {
        if (shouldGhostRespond('banshee')) shyResponses++;
      }
      const shyPercent = (shyResponses / iterations) * 100;
      expect(shyPercent).toBeGreaterThan(25); // 30-40% range
      expect(shyPercent).toBeLessThan(45);

      // Test Chaotic ghosts (55% response rate)
      let chaoticResponses = 0;
      for (let i = 0; i < iterations; i++) {
        if (shouldGhostRespond('poltergeist')) chaoticResponses++;
      }
      const chaoticPercent = (chaoticResponses / iterations) * 100;
      expect(chaoticPercent).toBeGreaterThan(45); // 50-60% range
      expect(chaoticPercent).toBeLessThan(65);
    });

    it('should give Trickster aggressive response frequency', () => {
      const iterations = 1000;
      let tricksterResponses = 0;

      for (let i = 0; i < iterations; i++) {
        if (shouldGhostRespond('trickster')) tricksterResponses++;
      }

      const tricksterPercent = (tricksterResponses / iterations) * 100;
      
      // Trickster should respond like aggressive ghosts (70-80%)
      expect(tricksterPercent).toBeGreaterThan(65);
      expect(tricksterPercent).toBeLessThan(85);
    });
  });

  describe('getGhostPersonality', () => {
    it('should return correct personality for each ghost type', () => {
      expect(getGhostPersonality('wraith')).toBe('aggressive');
      expect(getGhostPersonality('onyx')).toBe('aggressive');
      expect(getGhostPersonality('banshee')).toBe('shy');
      expect(getGhostPersonality('shade')).toBe('shy');
      expect(getGhostPersonality('poltergeist')).toBe('chaotic');
      expect(getGhostPersonality('phantom')).toBe('chaotic');
      expect(getGhostPersonality('trickster')).toBe('contradictory');
    });
  });

  describe('getQuestionContext', () => {
    it('should return description for each question', () => {
      expect(getQuestionContext('q1')).toContain('Intent/Motivation');
      expect(getQuestionContext('q2')).toContain('Location/Presence');
      expect(getQuestionContext('q3')).toContain('Confirmation/Proximity');
    });
  });

  describe('getWordPools', () => {
    it('should return word pools with all required properties', () => {
      const ghostTypes: GhostType[] = ['wraith', 'banshee', 'shade', 'poltergeist', 'phantom', 'onyx', 'trickster'];
      const questions: QuestionId[] = ['q1', 'q2', 'q3'];

      ghostTypes.forEach((ghostType) => {
        questions.forEach((questionId) => {
          const pools = getWordPools(ghostType, questionId);
          
          expect(pools).toHaveProperty('common');
          expect(pools).toHaveProperty('personality');
          expect(pools).toHaveProperty('unique');
          expect(Array.isArray(pools.common)).toBe(true);
          expect(Array.isArray(pools.personality)).toBe(true);
          expect(Array.isArray(pools.unique)).toBe(true);
          expect(pools.common.length).toBeGreaterThan(0);
          expect(pools.personality.length).toBeGreaterThan(0);
          // Unique words may be empty for some ghosts
        });
      });
    });

    it('should give Trickster ALL personality words', () => {
      const q1Pools = getWordPools('trickster', 'q1');
      const q2Pools = getWordPools('trickster', 'q2');
      const q3Pools = getWordPools('trickster', 'q3');

      // Trickster should have more personality words than other ghosts
      const wraithQ1Pools = getWordPools('wraith', 'q1');
      
      expect(q1Pools.personality.length).toBeGreaterThan(wraithQ1Pools.personality.length);
      expect(q2Pools.personality.length).toBeGreaterThan(5);
      expect(q3Pools.personality.length).toBeGreaterThan(5);
    });
  });
});
