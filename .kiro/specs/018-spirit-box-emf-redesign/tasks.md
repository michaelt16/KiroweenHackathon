# Implementation Plan

## Phase 1: Data Model Updates

- [x] 1. Update Ghost Store Data Models





  - Remove `EMFPersonality` enum from `ghostStore.ts`
  - Add `SpiritBoxPersonality` enum (Aggressive, Shy, Chaotic, Contradictory)
  - Create word pool data structures for all three questions
  - Update `GhostData` interface to remove `emfPersonality` field
  - Add `spiritBoxResponse` field with word pools and response frequency
  - _Requirements: 1, 6, 7_

- [x] 2. Create Spirit Box Word Pool Constants





  - Create new file `src/data/spiritBoxWords.ts`
  - Define Q1 word pools (Common, Aggressive, Shy, Chaotic, Unique)
  - Define Q2 word pools (Common, Aggressive, Shy, Chaotic, Unique)
  - Define Q3 word pools (Common, Aggressive, Shy, Chaotic, Unique)
  - Export word selection helper functions
  - _Requirements: 5, 6, 11_

- [x] 3. Update Ghost Definitions with Spirit Box Data





  - Update all 7 ghost definitions in `ghostStore.ts`
  - Add `spiritBoxResponse` configuration for each ghost
  - Set correct response frequencies (Aggressive: 75%, Shy: 35%, Chaotic: 55%)
  - Assign word pools to each ghost based on personality
  - Configure Trickster with ALL word pools
  - _Requirements: 6, 7, 8, 11_

## Phase 2: Investigation Store Updates

- [x] 4. Update Investigation Store Evidence System





  - Remove `emfPersonality` from `evidenceChecklist` in `investigationStore.ts`
  - Add `spiritBoxPersonality` field to `evidenceChecklist`
  - Update `EvidenceEntry` type to include `questionContext` and `wordCategory`
  - Add `spiritBoxState` to track question cooldown
  - _Requirements: 3, 9_

- [x] 5. Add Spirit Box Question State Management





  - Add `questionCooldown` boolean to investigation store
  - Add `cooldownEndTime` timestamp
  - Add `wordsHeard` array to track all responses
  - Create actions: `startQuestionCooldown()`, `endQuestionCooldown()`
  - _Requirements: 3, 4_

## Phase 3: EMF Meter Simplification

- [x] 6. Simplify EMF Meter Component






  - Open `src/components/Investigation/Tools/EMFTool.tsx` (or equivalent)
  - Remove all personality display logic
  - Remove personality noise from EMF calculation
  - Update `calculateEMFLevel()` to use pure distance calculation
  - Remove personality-related UI elements
  - Test EMF shows only 0-5 levels based on distance
  - _Requirements: 1_

- [x] 7. Update EMF Evidence Logging





  - Remove `personality` field from EMF evidence entries
  - Update `logEvidence()` calls to exclude personality data
  - Verify EMF evidence only logs level and distance
  - _Requirements: 1_

## Phase 4: Spirit Box Question System

- [x] 8. Add Question UI to Spirit Box Component









  - Open `src/components/Investigation/Tools/SpiritBoxTool.tsx` (or equivalent)
  - Add three question buttons: "What do you want?", "Where are you?", "Are you here?"
  - Show buttons only when **BOTH knobs are locked** (Knob A + Knob B)
  - Hide buttons when either knob is not locked
  - Show helpful messages: "TUNE BOTH KNOBS", "KNOB A LOCKED - TUNE KNOB B", etc.
  - Add button styling (analog horror aesthetic)
  - _Requirements: 2, 3, 12_
  - **✅ COMPLETE**: Questions now require both Knob A and Knob B to be locked before appearing
-

- [x] 9. Implement Question Click Handler






  - Create `handleQuestionAsked(questionId)` function
  - Check if cooldown is active (disable if true)
  - Get current ghost type from investigation store
  - Roll for response based on ghost's response frequency
  - If responds: select word from appropriate pools
  - If no response: display "No response..." with static effect
  - _Requirements: 3, 4, 7_


- [x] 10. Implement Context-Aware Word Selection






  - Create `selectContextualWord(ghostType, questionId)` function
  - Roll for word category (30% common, 55% personality, 15% unique)
  - Select from appropriate word pool based on question
  - Handle Trickster special case (uses ALL personality words)
  - Return selected word/phrase
  - _Requirements: 6, 8, 11_

- [x] 11. Add Word Display Animation







  - Display selected word with typed-out animation (0.5-1s)
  - Apply green phosphor glow effect (CRT aesthetic)
  - Clear previous word before showing new one
  - Add whispered audio effect (optional for MVP)
  - _Requirements: 13_

- [x] 12. Implement Question Cooldown System







  - Start 2-3 second cooldown after question asked
  - Disable question buttons during cooldown
  - Show cooldown timer (optional visual feedback)
  - Auto-enable buttons when cooldown ends
  - Cancel cooldown if signal lock is lost
  - _Requirements: 3, 4_
-

- [ ] 13. Add "No Response" Handling







  - Display "No response..." text with static effect
  - Play static audio (optional)
  - Log non-response as evidence
  - Allow asking another question after cooldown
  - _Requirements: 4, 13_

## Phase 5: Evidence Tab Integration
- [ ] 14. Update Evidence Tab UI




- [ ] 14. Update Evidence Tab UI

  - Open Evidence Tab component
  - Remove "EMF Personality" selector
  - Add "Spirit Box Personality" selector
  - Options: Aggressive, Shy, Chaotic, Contradictory, Unknown
  - Update styling to match analog horror aesthetic
  - _Requirements: 9_
-

- [ ] 15. Update Ghost Filtering Logic




  - Update `filterGhostsByEvidence()` function
  - Remove EMF personality filtering
  - Add Spirit Box personality filtering
  - Handle Trickster's Contradictory personality
  - Verify filtering narrows to 2-3 ghosts with one tool
  - Verify filtering narrows to 1-2 ghosts with multiple tools
  - _Requirements: 9, 10_
-
 

- [x] 16. Update Evidence Display


  - Show Spirit Box words heard during investigation
  - Display word categories (Common, Personality, Unique)
  - Show response frequency pattern
  - Allow player to select personality based on words
  - _Requirements: 9_

## Phase 6: Testing & Polish

- [ ] 17. Test EMF Meter Simplification
  - Verify EMF shows only distance (0-5 levels)
  - Test distance thresholds (40m, 20m, 10m, 6m, 3m)
  - Verify no personality information displayed
  - Test in Dev Mode with different ghost types
  - _Requirements: 1_

- [ ] 18. Test Spirit Box Question System
  - Test all three questions with each ghost type
  - Verify response frequencies (Aggressive: 70-80%, Shy: 30-40%, Chaotic: 50-60%)
  - Test word selection from correct pools
  - Verify context-aware responses (words match questions)
  - Test question cooldown (2-3 seconds)
  - _Requirements: 3, 4, 6, 7, 11_

- [ ] 19. Test Trickster Contradictions
  - Test Trickster responds with aggressive frequency (70-80%)
  - Verify Trickster uses words from ALL personalities
  - Ask multiple questions and verify contradictory responses
  - Test unique Trickster words ("again again", "look up", "behind you")
  - Verify player can identify Trickster by contradictions
  - _Requirements: 8_

- [ ] 20. Test Evidence Tab Integration
  - Test Spirit Box personality selection
  - Verify ghost filtering works correctly
  - Test with each personality (Aggressive, Shy, Chaotic, Contradictory)
  - Verify Wraith appears for Aggressive
  - Verify Banshee/Shade appear for Shy
  - Verify Poltergeist/Phantom appear for Chaotic
  - Verify only Trickster appears for Contradictory
  - _Requirements: 9, 10_

- [ ] 21. Test Multi-Tool Deduction
  - Test Spirit Box alone narrows to 2-3 ghosts
  - Test Spirit Box + Camera narrows to 1-2 ghosts
  - Test Spirit Box + Camera + Thermal confirms 1 ghost
  - Verify no single tool can identify ghost alone
  - _Requirements: 10_

## Phase 7: Dev Mode Support

- [ ] 22. Add Dev Mode Controls for Spirit Box
  - Add "Force Response" button (bypasses response frequency)
  - Add ghost type selector
  - Display current ghost's response frequency
  - Show word pools for current ghost
  - Log word category on selection (Common/Personality/Unique)
  - _Requirements: 14_

- [ ] 23. Add Dev Mode Word Pool Inspector
  - Display all word pools for selected ghost
  - Show Q1, Q2, Q3 words separately
  - Highlight unique words
  - Show Trickster's full word pool (all personalities)
  - _Requirements: 14_

## Phase 8: Final Cleanup

- [ ] 24. Remove Unused EMF Personality Code
  - Search codebase for `EMFPersonality` references
  - Remove unused imports and types
  - Remove personality noise calculation functions
  - Clean up any EMF personality UI components
  - _Requirements: 1_

- [ ] 25. Update Documentation
  - Update steering document 014-ghost-tool-mechanics.md
  - Document new Spirit Box question system
  - Document word pool system
  - Update ghost deduction examples
  - _Requirements: All_

- [ ] 26. Final QA Pass
  - Test complete investigation flow
  - Verify all requirements met
  - Test on mobile (if applicable)
  - Check performance
  - Verify analog horror aesthetic maintained
  - _Requirements: All_
