# Implementation Plan

## Overview

This task list implements the Ghost Data & Codex System - the foundation for all 7 ghost types. Tasks are ordered to build incrementally: data structure → ghost profiles → UI integration → testing.

---

## Tasks

- [x] 1. Create Ghost Data Store and Type Definitions





  - Create `src/stores/ghostStore.ts` with Zustand store
  - Define TypeScript enums: `GhostType`, `EMFPersonality`, `CameraManifestationType`, `ThermalReading`
  - Define interfaces: `SpiritBoxSignature`, `WordFamily`, `GhostData`
  - Implement store methods: `getGhost()`, `isUnlocked()`, `getAllGhosts()`, `unlockGhost()`
  - Initialize empty ghost data structure
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Implement Ghost Profiles (All 7 Ghosts)







  - [x] 2.1 Create Wraith profile with complete data

    - EMF: Calm, Spirit Box: (0.35, 0.72), Words: soft/lost/cold + drift/fade/whisper
    - Camera: Faint Silhouette, Thermal: Normal
    - Field journal: Agent K. Morrison story
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  

  - [x] 2.2 Create Shade profile with complete data





    - EMF: Shy, Spirit Box: (0.50, 0.45), Words: silent/unknown/stay + hide/shadow/watch
    - Camera: Half-Formed Body, Thermal: Normal
    - Field journal: Agent T. Chen story
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  
  - [x] 2.3 Create Poltergeist profile with complete data

    - EMF: Unstable, Spirit Box: (0.62, 0.38), Words: noisy/chaotic/mine + break/throw/chaos
    - Camera: Distorted Motion Blur, Thermal: Cold Spot
    - Field journal: Agent R. Patel story

    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 2.4 Create Banshee profile with complete data

    - EMF: Aggressive, Spirit Box: (0.28, 0.91), Words: anger/sorrow/leave + scream/wail/death
    - Camera: Screaming Face, Thermal: Cold Spot

    - Field journal: Agent M. O'Brien story
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 2.5 Create Phantom profile with complete data

    - EMF: Calm, Spirit Box: (0.18, 0.67), Words: hollow/gone/cold + void/empty/nothing

    - Camera: Invisible (95%) / Faint Glitch (5%), Thermal: Deep Cold
    - Field journal: Agent L. Kowalski story
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 2.6 Create Onyx profile with complete data

    - EMF: Shy, Spirit Box: (0.12, 0.23), Words: deep/below/hungry + dark/consume/abyss
    - Camera: Shadow Silhouette, Thermal: Deep Cold / Cold Spot
    - Field journal: Agent S. Nakamura story
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [x] 2.7 Create Trickster profile with complete data

    - EMF: Mischievous, Spirit Box: (0.48, 0.60), Words: playful/teasing/behind + trick/game/mine/fun
    - Camera: Glitch Streaks, Thermal: Cold Spot
    - Field journal: Agent D. Martinez story
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 3. Validate Ghost Data and Deduction Overlap





  - Write validation function to check deduction overlap rules
  - Ensure no ghost is uniquely identifiable by single trait
  - Verify EMF personalities have 2+ ghosts each
  - Verify Camera manifestations have 2+ ghosts each (except Phantom invisible)
  - Verify Thermal readings have 2+ ghosts each
  - Verify Spirit Box words appear in 2+ ghost families
  - Run validation on all 7 ghost profiles
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 4. Integrate Ghost Store with Codex Screen





  - Update `src/screens/CodexScreen.tsx` to use `useGhostStore()` hook
  - Update `src/components/Codex/GhostCodexContent.tsx` to map over all 7 ghosts
  - Display locked state (silhouette + "???") for locked ghosts
  - Display unlocked state (full info) for unlocked ghosts
  - Add tap-to-view-details navigation
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 5. Create Ghost Detail View Component





  - Create `src/components/Codex/GhostDetailView.tsx`
  - Display Polaroid photo (if unlocked) with tape
  - Display typewritten stats (EMF, Camera, Thermal)
  - Display ghost description and characteristics
  - Use analog horror components: `<PaperBase>`, `<TypewrittenText>`, `<HandwrittenText>`
  - Add back button to return to ghost list
  - **Note**: Field journals are NOT displayed in Codex - they appear separately in Field Journals screen (/field-journals)
  - _Requirements: 11.4, 11.5_

- [x] 6. Update Field Journal Stories





  - Keep existing Field Journals screen format and design (no changes to UI)
  - Update the field journal stories in `src/data/fieldJournals.ts` to reflect new ghost characteristics
  - Write new horror stories that hint at ghost behaviors (EMF patterns, camera manifestations, thermal readings)
  - Ensure stories are atmospheric and provide subtle hints without explicitly stating evidence types
  - Stories should reference tool reactions indirectly (e.g., "my EMF meter went haywire" for Unstable personality)
  - Add more variety of stories beyond just the 7 ghost types
  - **Note**: Field journals remain as general horror stories, not tied to specific ghosts in the UI
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [x] 7. Create Ghost Behavior API for Investigation Tools





  - Add `getActiveGhostBehavior()` method to ghost store
  - Create hook `useActiveGhost()` for investigation tools
  - Expose EMF personality for EMF Meter
  - Expose Spirit Box signature (knobA, knobB, tolerance) for Spirit Box
  - Expose word families for Spirit Box word selection
  - Expose camera manifestations for Camera tool
  - Expose thermal reading for Thermal Scanner
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [x] 8. Add Ghost Silhouette Placeholder Images




  - Create or source 7 silhouette images (one per ghost)
  - Place in `/assets/ghosts/` directory
  - Format: PNG or SVG, <20KB each
  - Style: Dark silhouette on transparent background
  - Update ghost profiles with correct `silhouetteUrl` paths
  - _Requirements: 11.3_

- [ ] 9. Implement Ghost Unlock System
  - Add `unlockGhost(type: GhostType)` functionality
  - Persist unlock state to localStorage
  - Load unlock state on app initialization
  - Update Codex UI immediately when ghost unlocks
  - Update Field Journals to show new journal when ghost unlocks
  - _Requirements: 11.3, 11.4_

- [ ] 10. Final Testing and Validation
  - Test all 7 ghosts display correctly in Codex (locked state)
  - Test unlock flow: unlock ghost → Codex updates → Field Journal appears
  - Test ghost detail view shows correct data for each ghost
  - Test field journals display with correct pagination
  - Test deduction overlap: verify no single trait identifies a ghost
  - Test Ghost Behavior API returns correct data for tools
  - Verify all TypeScript types are correct and no errors

---

## Success Criteria

- ✅ All 7 ghost profiles implemented with complete data
- ✅ Codex displays all ghosts with locked/unlocked states
- ✅ Field journals show for unlocked ghosts only
- ✅ Ghost detail view displays full information
- ✅ Deduction overlap validated (no single-trait identification)
- ✅ Ghost Behavior API ready for Spec 015 (Investigation Tools)
- ✅ No TypeScript errors
- ✅ Unlock system persists across sessions

---

**Status**: Ready for Implementation
**Estimated Time**: 2-3 days
**Next Spec**: 015 - Investigation Tools & Ghost Interaction
