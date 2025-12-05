# Requirements Document

## Introduction

This specification defines the redesign of the Spirit Box and EMF Meter investigation tools. The Spirit Box becomes the primary tool for discovering ghost personality through an interactive question-and-answer system with frequency tuning. The EMF Meter is simplified to provide pure distance measurement without personality detection. This redesign ensures no single tool can identify a ghost - players must combine evidence from multiple tools (Spirit Box, EMF, Camera, Thermal) to deduce the ghost type.

## Glossary

- **Spirit Box**: Investigation tool that reveals ghost personality through frequency tuning and interactive questions
- **EMF Meter**: Investigation tool that displays electromagnetic field strength based on distance to ghost (0-5 scale)
- **Ghost Personality**: Behavioral classification (Aggressive, Lost, Chaotic, Shy, Contradictory) revealed exclusively through Spirit Box
- **Common Word Pool**: Words that all ghosts can say (e.g., "Here", "You", "Me"), adding ambiguity to deduction
- **Personality Word Pool**: Words specific to personality types (e.g., Aggressive: "Run", "Die"; Shy: "Hide", "Quiet")
- **Response Frequency**: Percentage chance a ghost will respond to a question based on personality (30-80%)
- **Signal Lock**: State when Spirit Box frequency knobs (Knob A and Knob B) are tuned within tolerance
- **Question System**: Three interactive questions players can ask after achieving signal lock
- **Word Overlap**: Design principle where words are shared between ghosts with similar traits, preventing single-tool identification

## Requirements

### Requirement 1: EMF Meter Distance Measurement

**User Story:** As a player, I want the EMF Meter to show how close I am to the ghost, so that I can navigate toward or away from it during investigation.

#### Acceptance Criteria

1. WHEN the player is within 40 meters of the ghost, THEN the EMF Meter SHALL display a reading between 0 and 5 based on distance
2. WHEN the player is more than 40 meters from the ghost, THEN the EMF Meter SHALL display a reading of 0
3. WHEN the player moves closer to the ghost, THEN the EMF Meter SHALL increase the displayed level
4. WHEN the player moves farther from the ghost, THEN the EMF Meter SHALL decrease the displayed level
5. WHEN the EMF Meter displays readings, THEN the system SHALL NOT include any personality-based information

### Requirement 2: Spirit Box Frequency Tuning

**User Story:** As a player, I want to tune the Spirit Box frequency using two knobs, so that I can establish communication with the ghost.

#### Acceptance Criteria

1. WHEN the player adjusts Knob A (Carrier Frequency), THEN the Spirit Box SHALL update the frequency value between 0.0 and 1.0
2. WHEN the player adjusts Knob B (Modulation Frequency), THEN the Spirit Box SHALL update the frequency value between 0.0 and 1.0
3. WHEN both knobs are within tolerance of the ghost's target frequency, THEN the Spirit Box SHALL achieve Signal Lock state
4. WHEN Signal Lock is achieved, THEN the Spirit Box SHALL display visual feedback (green glow, "LOCKED" indicator)
5. WHEN Signal Lock is lost, THEN the Spirit Box SHALL remove the question buttons and display "SIGNAL LOST" message

### Requirement 3: Spirit Box Question System

**User Story:** As a player, I want to ask the ghost questions after achieving signal lock, so that I can learn about its personality through its responses.

#### Acceptance Criteria

1. WHEN Signal Lock is achieved, THEN the Spirit Box SHALL display three question buttons: "Are you friendly?", "Are you here?", "Why are you here?"
2. WHEN the player clicks a question button, THEN the Spirit Box SHALL send the question to the ghost
3. WHEN a question is sent, THEN the Spirit Box SHALL disable question buttons for 2-3 seconds (cooldown period)
4. WHEN the cooldown period ends, THEN the Spirit Box SHALL re-enable question buttons if still locked
5. WHEN Signal Lock is lost during cooldown, THEN the Spirit Box SHALL cancel the cooldown and hide question buttons

### Requirement 4: Ghost Response Behavior

**User Story:** As a player, I want ghosts to respond to questions based on their personality, so that I can deduce their behavioral traits through conversation patterns.

#### Acceptance Criteria

1. WHEN a ghost receives a question, THEN the system SHALL determine response based on the ghost's Response Frequency (30-80% depending on personality)
2. WHEN a ghost decides to respond, THEN the system SHALL select a word from the ghost's word pools (Common, Personality-specific, or Unique)
3. WHEN a ghost decides not to respond, THEN the Spirit Box SHALL display "No response..." with static/noise effect
4. WHEN a word is selected, THEN the Spirit Box SHALL display the word with typed-out animation and whispered audio
5. WHEN multiple questions are asked, THEN the system SHALL vary responses to create conversation-like interaction

### Requirement 5: Word Pool System - Common Words

**User Story:** As a player, I want all ghosts to occasionally say common words, so that I cannot identify the ghost from a single word and must gather multiple pieces of evidence.

#### Acceptance Criteria

1. WHEN any ghost responds to a question, THEN the system SHALL have a 20-40% chance (varies by ghost) to select from the Common Word Pool
2. WHEN a word is selected from the Common Word Pool, THEN the system SHALL choose from: "Here", "You", "Me", "Now", "Wait", "Stay", "Go", "Look", "See", "Come", "Help"
3. WHEN a common word is displayed, THEN the system SHALL NOT provide unique identification information
4. WHEN players hear common words, THEN the system SHALL require additional evidence from other tools for ghost identification
5. WHEN tracking evidence, THEN the system SHALL log common words separately from personality-specific words

### Requirement 6: Word Pool System - Personality Words

**User Story:** As a player, I want ghosts to say words that match their personality type and answer my questions appropriately, so that I can narrow down the ghost identity when combined with other tool evidence.

#### Acceptance Criteria

1. WHEN an Aggressive ghost (Wraith, Onyx, Trickster) responds, THEN the system SHALL select from Aggressive words appropriate to the question asked
2. WHEN a Shy ghost (Banshee, Shade) responds, THEN the system SHALL select from Shy words appropriate to the question asked
3. WHEN a Chaotic ghost (Poltergeist, Phantom) responds, THEN the system SHALL select from Chaotic words appropriate to the question asked
4. WHEN a question is asked, THEN the system SHALL select words that contextually answer the question (e.g., "Are you friendly?" → "Run", "Die", "No"; "Are you here?" → "Here", "Behind", "Below")
5. WHEN personality words are shared between multiple ghosts, THEN the system SHALL require players to use Camera, Thermal, or EMF evidence to distinguish between them

### Requirement 7: Ghost-Specific Response Frequencies

**User Story:** As a player, I want different ghost types to respond at different rates, so that response frequency becomes part of the deduction process.

#### Acceptance Criteria

1. WHEN a Shy ghost (Banshee, Shade) receives a question, THEN the system SHALL respond 30-40% of the time
2. WHEN an Aggressive ghost (Wraith, Onyx, Trickster) receives a question, THEN the system SHALL respond 70-80% of the time
3. WHEN a Chaotic ghost (Poltergeist, Phantom) receives a question, THEN the system SHALL respond 50-60% of the time
4. WHEN Trickster responds, THEN the system SHALL use aggressive response frequency (70-80%) but select words from ALL personality categories
5. WHEN tracking response patterns, THEN the system SHALL allow players to observe frequency over multiple questions

### Requirement 8: Trickster Contradictory Behavior

**User Story:** As a player, I want the Trickster ghost to give contradictory responses, so that I can identify it by recognizing that its Spirit Box words don't match its other tool evidence.

#### Acceptance Criteria

1. WHEN a Trickster responds to a question, THEN the system SHALL randomly select from ALL personality word categories (Aggressive, Lost, Chaotic, Shy)
2. WHEN a Trickster's words are compared to EMF/Camera/Thermal evidence, THEN the system SHALL create contradictions (e.g., aggressive words but calm EMF)
3. WHEN a player collects evidence from multiple tools, THEN the system SHALL make Trickster identifiable by contradiction pattern
4. WHEN a Trickster uses common words, THEN the system SHALL increase common word frequency to 40% (higher than other ghosts)
5. WHEN a Trickster responds, THEN the system SHALL include unique Trickster words: "Behind", "Tease", "Fool", "Laugh" at 20% frequency

### Requirement 9: Evidence Tab Integration

**User Story:** As a player, I want to select the ghost's personality in the Evidence Tab based on Spirit Box responses, so that I can combine this with other tool evidence to identify the ghost.

#### Acceptance Criteria

1. WHEN the Evidence Tab is opened, THEN the system SHALL display a "Spirit Box Personality" selection field
2. WHEN the player reviews Spirit Box words, THEN the system SHALL allow selection from: Aggressive, Lost, Chaotic, Shy, Contradictory, Unknown
3. WHEN the player selects a personality, THEN the system SHALL filter possible ghosts based on the selected personality
4. WHEN the Evidence Tab is opened, THEN the system SHALL NOT display an "EMF Personality" field (removed from EMF Meter)
5. WHEN combining Spirit Box personality with Camera/Thermal/EMF distance evidence, THEN the system SHALL narrow possible ghosts to 1-2 candidates

### Requirement 10: Multi-Tool Deduction Requirement

**User Story:** As a player, I want to require evidence from multiple tools to identify the ghost, so that no single tool can solve the investigation alone.

#### Acceptance Criteria

1. WHEN a player uses only the Spirit Box, THEN the system SHALL narrow possible ghosts to 2-3 candidates (not 1)
2. WHEN a player combines Spirit Box personality with Camera evidence, THEN the system SHALL narrow possible ghosts to 1-2 candidates
3. WHEN a player combines Spirit Box, Camera, and Thermal evidence, THEN the system SHALL provide high confidence identification (1 ghost)
4. WHEN word overlap exists between ghosts, THEN the system SHALL require additional tool evidence to distinguish them
5. WHEN a player attempts identification with insufficient evidence, THEN the system SHALL indicate multiple possible ghosts remain

### Requirement 11: Context-Aware Question Responses

**User Story:** As a player, I want ghosts to answer my questions appropriately, so that the conversation feels real and spooky rather than random words.

#### Acceptance Criteria

1. WHEN a player asks "Are you friendly?", THEN Aggressive ghosts SHALL respond with threatening words ("Run", "Die", "No"), Shy ghosts with evasive words ("Hide", "Quiet", "Away"), and Chaotic ghosts with playful words ("Play", "Maybe", "Fun")
2. WHEN a player asks "Are you here?", THEN ghosts SHALL respond with location words ("Here", "Behind", "Below", "Yes", "Close", "Watching")
3. WHEN a player asks "Why are you here?", THEN ghosts SHALL respond with motivation words ("Hungry", "Angry", "Lost", "Trapped", "Waiting", "Mine")
4. WHEN Trickster responds to any question, THEN the system SHALL select words from ANY personality category to create contradictions
5. WHEN a ghost doesn't respond, THEN the system SHALL display "No response..." to indicate the ghost chose not to answer

### Requirement 12: Signal Lock Visual Feedback

**User Story:** As a player, I want clear visual feedback when I achieve signal lock, so that I know when I can start asking questions.

#### Acceptance Criteria

1. WHEN both knobs are far from target frequency (>0.15 difference), THEN the Spirit Box SHALL display "FAR" with red indicator
2. WHEN both knobs are close to target frequency (0.09-0.15 difference), THEN the Spirit Box SHALL display "CLOSE" with yellow indicator
3. WHEN both knobs are very close to target frequency (0.06-0.09 difference), THEN the Spirit Box SHALL display "NEAR" with orange indicator
4. WHEN both knobs are within tolerance (<0.06 difference), THEN the Spirit Box SHALL display "LOCKED" with green glow
5. WHEN signal lock is achieved, THEN the Spirit Box SHALL play a confirmation sound and reveal question buttons

### Requirement 13: Response Display and Audio

**User Story:** As a player, I want ghost responses to feel atmospheric and immersive, so that the Spirit Box interaction enhances the horror experience.

#### Acceptance Criteria

1. WHEN a ghost responds with a word, THEN the Spirit Box SHALL display the word with a typed-out animation (0.5-1 second duration)
2. WHEN a word is displayed, THEN the Spirit Box SHALL play a whispered audio version of the word
3. WHEN no response occurs, THEN the Spirit Box SHALL display static/noise visual effect and play static audio
4. WHEN a word appears, THEN the Spirit Box SHALL apply a green phosphor glow effect (CRT aesthetic)
5. WHEN multiple words are received, THEN the Spirit Box SHALL clear previous words before displaying new ones

### Requirement 14: Dev Mode Testing Support

**User Story:** As a developer, I want to test Spirit Box functionality without physical movement, so that I can verify word pools, response frequencies, and signal lock behavior.

#### Acceptance Criteria

1. WHEN Dev Mode is enabled, THEN the system SHALL allow manual ghost type selection for Spirit Box testing
2. WHEN Dev Mode is enabled, THEN the system SHALL display response frequency percentage for the selected ghost
3. WHEN Dev Mode is enabled, THEN the system SHALL log all word selections with their category (Common, Personality, Unique)
4. WHEN Dev Mode is enabled, THEN the system SHALL allow forcing signal lock regardless of knob positions
5. WHEN Dev Mode is enabled, THEN the system SHALL display a "Force Response" button to bypass response frequency RNG
