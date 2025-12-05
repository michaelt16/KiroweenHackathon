/**
 * Spirit Box Word Pool System - Context-Aware Question Responses
 * 
 * This file implements the complete word pool system for the Spirit Box tool's
 * question-and-answer system. It ensures that ghost responses are:
 * 
 * 1. **Context-Aware**: Words match the question asked
 *    - Q1 "What do you want?" → Intent/Motivation words
 *    - Q2 "Where are you?" → Location/Presence words
 *    - Q3 "Are you here?" → Confirmation/Proximity words
 * 
 * 2. **Personality-Specific**: Each ghost type has appropriate responses
 *    - Aggressive (Wraith, Onyx): Threatening, direct words
 *    - Shy (Banshee, Shade): Evasive, quiet words
 *    - Chaotic (Poltergeist, Phantom): Playful, unpredictable words
 *    - Contradictory (Trickster): Uses ALL personality words randomly
 * 
 * 3. **Probabilistic**: Word selection follows specific probabilities
 *    - Common words: 30% (40% for Trickster) - Shared by all ghosts
 *    - Personality words: 55% (45% for Trickster) - Personality-specific
 *    - Unique words: 15% - Ghost-specific signature words
 * 
 * 4. **Multi-Tool Deduction**: No single tool can identify a ghost
 *    - Word overlap between ghosts requires Camera/Thermal/EMF evidence
 *    - Trickster identified by contradictory personality words
 * 
 * **Requirements Implemented:**
 * - Requirement 5: Word Pool System - Common Words
 * - Requirement 6: Word Pool System - Personality Words
 * - Requirement 7: Ghost-Specific Response Frequencies
 * - Requirement 8: Trickster Contradictory Behavior
 * - Requirement 11: Context-Aware Question Responses
 * 
 * **Design Reference:**
 * - `.kiro/specs/018-spirit-box-emf-redesign/design.md` - Data Models section
 */

// ============================================================================
// QUESTION 1: "What do you want?" (Intent/Motivation)
// ============================================================================

export const Q1_COMMON = [
  'help me',
  'stay here',
  'so cold',
  'find me',
  'go back',
];

export const Q1_AGGRESSIVE = [
  'your fear',
  'leave now',
  'your pain',
  'silence you',
  'come closer',
];

export const Q1_SHY = [
  'quiet please',
  'go away',
  'let me',
  'hide now',
  'need peace',
];

export const Q1_CHAOTIC = [
  'break things',
  'make noise',
  'hear me',
  'play now',
  'mine now',
];

export const Q1_UNIQUE = {
  wraith: ['lost soul'],
  banshee: ['mourning song'],
  shade: ['still quiet'],
  poltergeist: ['mess maker'],
  phantom: ['empty echo'],
  onyx: ['deep hunger'],
  trickster: ['again again'], // Glitched repeat
};

// ============================================================================
// QUESTION 2: "Where are you?" (Location/Presence)
// ============================================================================

export const Q2_COMMON = [
  'right here',
  'behind you',
  'nearby now',
  'all around',
  "can't see",
];

export const Q2_AGGRESSIVE = [
  'watching you',
  'right above',
  'waiting here',
  'under you',
  'next to you',
];

export const Q2_SHY = [
  'far away',
  'in shadows',
  'hiding now',
  'too dark',
  'not close',
];

export const Q2_CHAOTIC = [
  'everywhere now',
  'nowhere close',
  'circling you',
  'behind walls',
  'moving fast',
];

export const Q2_UNIQUE = {
  wraith: ['thin veil'],
  banshee: ['doorway edge'],
  shade: ['deep corner'],
  poltergeist: ['inside walls'],
  phantom: ['between worlds'],
  onyx: ['below earth'],
  trickster: ['look up'],
};

// ============================================================================
// QUESTION 3: "Are you here?" (Confirmation/Proximity)
// ============================================================================

export const Q3_COMMON = [
  'maybe so',
  'i am',
  'not now',
  'almost here',
  'very close',
];

export const Q3_AGGRESSIVE = [
  'always here',
  'run now',
  'too late',
  'with you',
  'danger near',
];

export const Q3_SHY = [
  "don't know",
  'soft yes',
  'not sure',
  'stay back',
  'i hide',
];

export const Q3_CHAOTIC = [
  'echo here',
  'laughing no',
  'where again',
  'shift now',
  'almost here',
];

export const Q3_UNIQUE = {
  wraith: ['drifting by'],
  banshee: ['still listening'],
  shade: ['watching softly'],
  poltergeist: ['here-here'], // Glitch double
  phantom: ['fading in'],
  onyx: ['heavy breath'],
  trickster: ['behind you'], // Even if said earlier
};

// ============================================================================
// TYPES
// ============================================================================

export type GhostType = 'wraith' | 'banshee' | 'shade' | 'poltergeist' | 'phantom' | 'onyx' | 'trickster';
export type QuestionId = 'q1' | 'q2' | 'q3';
export type WordCategory = 'common' | 'personality' | 'unique';

export interface WordPools {
  common: string[];
  personality: string[];
  unique: string[];
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the appropriate personality word pool for a ghost type
 */
export function getPersonalityWords(
  ghostType: GhostType,
  questionId: QuestionId
): string[] {
  // Trickster uses ALL personality words
  if (ghostType === 'trickster') {
    switch (questionId) {
      case 'q1':
        return [...Q1_AGGRESSIVE, ...Q1_SHY, ...Q1_CHAOTIC];
      case 'q2':
        return [...Q2_AGGRESSIVE, ...Q2_SHY, ...Q2_CHAOTIC];
      case 'q3':
        return [...Q3_AGGRESSIVE, ...Q3_SHY, ...Q3_CHAOTIC];
    }
  }

  // Aggressive ghosts: Wraith, Onyx
  if (ghostType === 'wraith' || ghostType === 'onyx') {
    switch (questionId) {
      case 'q1':
        return Q1_AGGRESSIVE;
      case 'q2':
        return Q2_AGGRESSIVE;
      case 'q3':
        return Q3_AGGRESSIVE;
    }
  }

  // Shy ghosts: Banshee, Shade
  if (ghostType === 'banshee' || ghostType === 'shade') {
    switch (questionId) {
      case 'q1':
        return Q1_SHY;
      case 'q2':
        return Q2_SHY;
      case 'q3':
        return Q3_SHY;
    }
  }

  // Chaotic ghosts: Poltergeist, Phantom
  if (ghostType === 'poltergeist' || ghostType === 'phantom') {
    switch (questionId) {
      case 'q1':
        return Q1_CHAOTIC;
      case 'q2':
        return Q2_CHAOTIC;
      case 'q3':
        return Q3_CHAOTIC;
    }
  }

  // Fallback (should never reach here)
  return [];
}

/**
 * Get the unique words for a specific ghost type and question
 */
export function getUniqueWords(
  ghostType: GhostType,
  questionId: QuestionId
): string[] {
  switch (questionId) {
    case 'q1':
      return Q1_UNIQUE[ghostType] || [];
    case 'q2':
      return Q2_UNIQUE[ghostType] || [];
    case 'q3':
      return Q3_UNIQUE[ghostType] || [];
  }
}

/**
 * Get common words for a question
 */
export function getCommonWords(questionId: QuestionId): string[] {
  switch (questionId) {
    case 'q1':
      return Q1_COMMON;
    case 'q2':
      return Q2_COMMON;
    case 'q3':
      return Q3_COMMON;
  }
}

/**
 * Get complete word pools for a ghost type and question
 */
export function getWordPools(
  ghostType: GhostType,
  questionId: QuestionId
): WordPools {
  return {
    common: getCommonWords(questionId),
    personality: getPersonalityWords(ghostType, questionId),
    unique: getUniqueWords(ghostType, questionId),
  };
}

/**
 * Select a random word from an array
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Select a context-aware word based on ghost type and question
 * 
 * Implements Requirement 6: Word Pool System - Personality Words
 * Implements Requirement 8: Trickster Contradictory Behavior
 * Implements Requirement 11: Context-Aware Question Responses
 * 
 * Word selection probabilities:
 * - Common: 30% (40% for Trickster)
 * - Personality: 55% (45% for Trickster)
 * - Unique: 15%
 * 
 * Context-aware selection ensures:
 * - Words match the question asked (e.g., "What do you want?" gets motivation words)
 * - Trickster uses ALL personality words (creates contradictions)
 * - Each ghost type has appropriate personality-specific responses
 * 
 * @param ghostType - The type of ghost responding
 * @param questionId - The question being asked ('q1', 'q2', or 'q3')
 * @returns Object containing the selected word and its category
 */
export function selectContextualWord(
  ghostType: GhostType,
  questionId: QuestionId
): { word: string; category: WordCategory } {
  // Get word pools for this ghost and question (Requirement 11)
  const pools = getWordPools(ghostType, questionId);
  const roll = Math.random();

  // Trickster has higher common word frequency (Requirement 8)
  const commonThreshold = ghostType === 'trickster' ? 0.4 : 0.3;
  const personalityThreshold = ghostType === 'trickster' ? 0.85 : 0.85;

  // Common words: 30% (40% for Trickster) (Requirement 5)
  if (roll < commonThreshold) {
    if (pools.common.length === 0) {
      console.warn(`No common words available for question ${questionId}`);
      return {
        word: 'error',
        category: 'common',
      };
    }
    return {
      word: randomChoice(pools.common),
      category: 'common',
    };
  }

  // Personality words: 55% (45% for Trickster) (Requirement 6)
  // For Trickster, this includes ALL personality types (Requirement 8)
  if (roll < personalityThreshold) {
    if (pools.personality.length === 0) {
      // Fallback to common if no personality words
      console.warn(`No personality words available for ${ghostType} on question ${questionId}, falling back to common`);
      return {
        word: randomChoice(pools.common),
        category: 'common',
      };
    }
    return {
      word: randomChoice(pools.personality),
      category: 'personality',
    };
  }

  // Unique words: 15% (Requirement 6)
  if (pools.unique.length === 0) {
    // Fallback to personality if no unique words
    console.warn(`No unique words available for ${ghostType} on question ${questionId}, falling back to personality`);
    return {
      word: randomChoice(pools.personality.length > 0 ? pools.personality : pools.common),
      category: pools.personality.length > 0 ? 'personality' : 'common',
    };
  }

  return {
    word: randomChoice(pools.unique),
    category: 'unique',
  };
}

/**
 * Determine if a ghost should respond based on its response frequency
 * 
 * Implements Requirement 7: Ghost-Specific Response Frequencies
 * 
 * Response frequencies:
 * - Aggressive (Wraith, Onyx, Trickster): 70-80% (75% average)
 * - Shy (Banshee, Shade): 30-40% (35% average)
 * - Chaotic (Poltergeist, Phantom): 50-60% (55% average)
 * 
 * @param ghostType - The type of ghost being asked
 * @returns true if ghost will respond, false if "No response..."
 */
export function shouldGhostRespond(ghostType: GhostType): boolean {
  const roll = Math.random();

  // Aggressive ghosts: 75% response rate (Requirement 7)
  if (ghostType === 'wraith' || ghostType === 'onyx' || ghostType === 'trickster') {
    return roll < 0.75;
  }

  // Shy ghosts: 35% response rate (Requirement 7)
  if (ghostType === 'banshee' || ghostType === 'shade') {
    return roll < 0.35;
  }

  // Chaotic ghosts: 55% response rate (Requirement 7)
  if (ghostType === 'poltergeist' || ghostType === 'phantom') {
    return roll < 0.55;
  }

  // Fallback (should never reach here)
  console.warn(`Unknown ghost type: ${ghostType}, using 50% response rate`);
  return roll < 0.5;
}

/**
 * Get the personality type for a ghost
 * 
 * Used for evidence tab filtering and deduction
 * 
 * @param ghostType - The type of ghost
 * @returns The personality classification
 */
export function getGhostPersonality(ghostType: GhostType): 'aggressive' | 'shy' | 'chaotic' | 'contradictory' {
  if (ghostType === 'trickster') {
    return 'contradictory';
  }
  if (ghostType === 'wraith' || ghostType === 'onyx') {
    return 'aggressive';
  }
  if (ghostType === 'banshee' || ghostType === 'shade') {
    return 'shy';
  }
  if (ghostType === 'poltergeist' || ghostType === 'phantom') {
    return 'chaotic';
  }
  
  console.warn(`Unknown ghost type: ${ghostType}, defaulting to chaotic`);
  return 'chaotic';
}

/**
 * Get a human-readable description of the question context
 * 
 * @param questionId - The question ID
 * @returns Description of what the question is asking about
 */
export function getQuestionContext(questionId: QuestionId): string {
  switch (questionId) {
    case 'q1':
      return 'Intent/Motivation - What the ghost wants';
    case 'q2':
      return 'Location/Presence - Where the ghost is';
    case 'q3':
      return 'Confirmation/Proximity - If the ghost is here';
    default:
      return 'Unknown question context';
  }
}
