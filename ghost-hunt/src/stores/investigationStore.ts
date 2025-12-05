import { create } from 'zustand';
import { GhostType, useGhostStore } from './ghostStore';
import { Position } from '../types/game';
import type { 
  ThermalReadingState, 
  CameraManifestationState 
} from '../data/ghosts';
import { generateTricksterTraits, type GhostDefinition } from '../data/ghosts';

// Spirit Box Personality types (replaces EMF Personality)
export type SpiritBoxPersonality = 
  | 'unknown'
  | 'aggressive'  // Wraith, Onyx, Trickster
  | 'shy'         // Banshee, Shade
  | 'chaotic'     // Poltergeist, Phantom
  | 'contradictory'; // Trickster only (uses all words)

// ============================================================================
// TYPES
// ============================================================================

export type ToolType = 'radar' | 'emf' | 'camera' | 'spiritbox' | 'thermal';

export interface EvidenceEntry {
  id: string;
  timestamp: number;
  type: 'emf' | 'spiritbox' | 'thermal' | 'photo';
  data: {
    // EMF (simplified - no personality)
    level?: number;
    distance?: number;
    
    // Spirit Box (expanded)
    word?: string;
    wordCategory?: 'common' | 'personality' | 'unique';
    question?: string; // Which question was asked
    questionContext?: 'q1' | 'q2' | 'q3'; // Question context for word selection (q1, q2, q3)
    responded?: boolean; // Did ghost respond or show "No response"
    frequency?: { knobA: number; knobB: number };
    
    // Thermal
    temperature?: number;
    category?: string;
    
    // Photo
    manifestation?: string | null;
  };
}

export interface PhotoEntry {
  id: string;
  timestamp: number;
  distance: number;
  manifestation: string | null;
  status: 'developing' | 'ready'; // Photo development status
  imageData?: string; // Optional: base64 image data (future)
}

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface InvestigationStore {
  // Active investigation state
  isActive: boolean;
  activeGhostType: GhostType | null;
  ghostPosition: Position | null;
  playerPosition: Position | null;
  playerHeading: number; // 0-360°
  
  // Dev Mode state
  devMode: {
    enabled: boolean;
    simulatedGhostPosition: Position | null;
    simulatedPlayerPosition: Position | null;
    simulatedPlayerHeading: number;
  };
  
  // Tool state
  activeTool: ToolType;
  cameraLocked: boolean;
  cameraUnlockTime: number | null;
  filmCount: number;
  
  // Spirit Box dynamic state (changes after each word/response)
  spiritBoxSignature: { knobA: number; knobB: number; tolerance: number } | null;
  spiritBoxKnobs: { knobA: number; knobB: number } | null; // Current knob positions
  spiritBoxLocked: boolean; // Lock after getting a word (cooldown)
  spiritBoxUnlockTime: number | null; // When the lock expires
  
  // Trickster dynamic traits (generated when Trickster is active)
  tricksterTraits: GhostDefinition['keyTraits'] | null;
  
  // Evidence state (WHERE EVERYTHING IS STORED)
  evidence: EvidenceEntry[];  // All EMF, Spirit Box, Thermal evidence
  photos: PhotoEntry[];       // All captured photos
  
  // Evidence checklist (Phasmophobia-style)
  evidenceChecklist: {
    spiritBoxPersonality: SpiritBoxPersonality;
    whispers: 'present' | 'ruled_out' | 'unknown';
    thermalReading: ThermalReadingState;
    cameraManifestation: CameraManifestationState;
  };
  selectedGhost: GhostType | null; // Player's ghost selection
  
  // Spirit Box question state
  spiritBoxState: {
    questionCooldown: boolean;
    cooldownEndTime: number | null;
    wordsHeard: string[]; // Track all words heard during investigation
  };
  
  // Rewards (for future use - UI only for now)
  investigationRewards: {
    money: number;
    xp: number;
  } | null;
  
  // Actions
  startInvestigation: (ghostType: GhostType, position: Position) => void;
  endInvestigation: () => void;
  updatePlayerPosition: (position: Position) => void;
  updatePlayerHeading: (heading: number) => void;
  setActiveTool: (tool: ToolType) => void;
  capturePhoto: (photo: PhotoEntry) => void;
  updatePhotoStatus: (photoId: string, status: 'developing' | 'ready') => void;
  logEvidence: (evidence: EvidenceEntry) => void;
  
  // Camera cooldown actions
  lockCamera: () => void;
  unlockCamera: () => void;
  isCameraLocked: () => boolean;
  
  // Spirit Box actions
  setSpiritBoxSignature: (signature: { knobA: number; knobB: number; tolerance: number }) => void;
  generateNewSpiritBoxSignature: () => void;
  setSpiritBoxKnobs: (knobs: { knobA: number; knobB: number }) => void;
  lockSpiritBox: () => void;
  unlockSpiritBox: () => void;
  isSpiritBoxLocked: () => boolean;
  
  // Dev Mode actions
  enableDevMode: () => void;
  disableDevMode: () => void;
  setSimulatedGhostPosition: (position: Position) => void;
  setSimulatedPlayerPosition: (position: Position) => void;
  setSimulatedPlayerHeading: (heading: number) => void;
  setActiveGhostType: (ghostType: GhostType) => void;
  
  // Evidence checklist actions
  setEvidenceState: (
    trait: 'spiritBoxPersonality' | 'whispers' | 'thermalReading' | 'cameraManifestation',
    state: SpiritBoxPersonality | 'present' | 'ruled_out' | 'unknown' | ThermalReadingState | CameraManifestationState
  ) => void;
  setSelectedGhost: (ghostType: GhostType | null) => void;
  
  // Spirit Box question state actions
  startQuestionCooldown: () => void;
  endQuestionCooldown: () => void;
  addWordHeard: (word: string) => void;
  
  // Investigation completion
  completeInvestigation: (selectedGhost: GhostType) => { isCorrect: boolean; rewards: { money: number; xp: number } };
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  isActive: false,
  activeGhostType: null,
  ghostPosition: null,
  playerPosition: null,
  playerHeading: 0,
  
  devMode: {
    enabled: false,
    simulatedGhostPosition: null,
    simulatedPlayerPosition: null,
    simulatedPlayerHeading: 0,
  },
  
  activeTool: 'radar' as ToolType,
  cameraLocked: false,
  cameraUnlockTime: null,
  filmCount: 10, // Default film count
  spiritBoxSignature: null, // Dynamic signature (changes after each word)
  spiritBoxKnobs: null, // Current knob positions
  spiritBoxLocked: false,
  spiritBoxUnlockTime: null,
  tricksterTraits: null, // Generated when Trickster is active
  
  evidence: [],
  photos: [],
  evidenceChecklist: {
    spiritBoxPersonality: 'unknown',
    whispers: 'unknown',
    thermalReading: 'unknown',
    cameraManifestation: 'unknown',
  },
  selectedGhost: null,
  spiritBoxState: {
    questionCooldown: false,
    cooldownEndTime: null,
    wordsHeard: [],
  },
  investigationRewards: null,
};

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useInvestigationStore = create<InvestigationStore>((set, get) => ({
  ...initialState,
  
  // Start investigation
  startInvestigation: (ghostType: GhostType, position: Position) => {
    // Get ghost's Spirit Box signature from ghost store
    const getActiveGhostBehavior = useGhostStore.getState().getActiveGhostBehavior;
    const ghostBehavior = getActiveGhostBehavior(ghostType);
    
    // Use ghost's signature from ghost store (each ghost has unique signature)
    // This will be the initial signature, then it changes dynamically after each response
    const initialSignature = ghostBehavior?.spiritBoxSignature || {
      knobA: Math.random(),
      knobB: Math.random(),
      tolerance: 0.06,
    };
    
    // Generate Trickster's random contradictory traits if it's Trickster
    const tricksterTraits = ghostType === GhostType.TRICKSTER 
      ? generateTricksterTraits() 
      : null;
    
    set({
      isActive: true,
      activeGhostType: ghostType,
      ghostPosition: position,
      activeTool: 'radar', // Default to radar
      evidence: [],
      photos: [],
      cameraLocked: false,
      cameraUnlockTime: null,
      filmCount: 10, // Reset film count to 10 for new investigation
      spiritBoxSignature: initialSignature,
      tricksterTraits, // Store generated traits for Trickster
    });
  },
  
  // End investigation
  endInvestigation: () => {
    set({
      ...initialState,
      // Preserve dev mode state
      devMode: get().devMode,
    });
  },
  
  // Update player position
  updatePlayerPosition: (position: Position) => {
    set({ playerPosition: position });
  },
  
  // Update player heading
  updatePlayerHeading: (heading: number) => {
    // Normalize to 0-360°
    const normalizedHeading = ((heading % 360) + 360) % 360;
    set({ playerHeading: normalizedHeading });
  },
  
  // Set active tool
  setActiveTool: (tool: ToolType) => {
    const previousTool = get().activeTool;
    set({ activeTool: tool });
    
    // ✅ When switching TO Spirit Box, generate NEW RANDOM signature (fresh start)
    // Each time you switch to Spirit Box, you get a completely new randomized frequency to find
    // Use the same function as the dev mode button for consistency
    if (tool === 'spiritbox' && previousTool !== 'spiritbox') {
      get().generateNewSpiritBoxSignature(); // Use the same function as dev mode button
      set({ 
        spiritBoxKnobs: null, // Reset knobs when switching to Spirit Box
      });
      console.log('🔄 Spirit Box: New RANDOM signature generated on tool switch (using generateNewSpiritBoxSignature)');
    }
  },
  
  // Capture photo
  capturePhoto: (photo: PhotoEntry) => {
    const photoId = photo.id;
    set((state) => ({
      photos: [...state.photos, photo],
      filmCount: Math.max(0, state.filmCount - 1),
    }));
    
    // After 7 seconds, mark photo as ready (reveal manifestation)
    setTimeout(() => {
      set((state) => ({
        photos: state.photos.map((p) =>
          p.id === photoId ? { ...p, status: 'ready' as const } : p
        ),
      }));
    }, 7000);
  },
  
  // Update photo status (for manual updates if needed)
  updatePhotoStatus: (photoId: string, status: 'developing' | 'ready') => {
    set((state) => ({
      photos: state.photos.map((p) =>
        p.id === photoId ? { ...p, status } : p
      ),
    }));
  },
  
  // Log evidence
  logEvidence: (evidence: EvidenceEntry) => {
    set((state) => ({
      evidence: [...state.evidence, evidence],
    }));
  },
  
  // Lock camera for 7 seconds
  lockCamera: () => {
    const unlockTime = Date.now() + 7000;
    set({
      cameraLocked: true,
      cameraUnlockTime: unlockTime,
    });
    
    // Auto-unlock after 7 seconds
    setTimeout(() => {
      const currentState = get();
      // Only unlock if the unlock time matches (prevents race conditions)
      if (currentState.cameraUnlockTime === unlockTime) {
        get().unlockCamera();
      }
    }, 7000);
  },
  
  // Unlock camera
  unlockCamera: () => {
    set({
      cameraLocked: false,
      cameraUnlockTime: null,
    });
  },
  
  // Check if camera is locked
  isCameraLocked: () => {
    const state = get();
    if (!state.cameraLocked) return false;
    
    // Check if cooldown expired
    if (state.cameraUnlockTime && Date.now() >= state.cameraUnlockTime) {
      get().unlockCamera();
      return false;
    }
    
    return true;
  },
  
  // Set Spirit Box signature
  setSpiritBoxSignature: (signature: { knobA: number; knobB: number; tolerance: number }) => {
    set({ spiritBoxSignature: signature });
  },
  
  // Generate new random Spirit Box signature (after word response)
  generateNewSpiritBoxSignature: () => {
    const newSignature = {
      knobA: Math.random(),
      knobB: Math.random(),
      tolerance: 0.06,
    };
    set({ spiritBoxSignature: newSignature });
  },
  
  // Set current Spirit Box knob positions
  setSpiritBoxKnobs: (knobs: { knobA: number; knobB: number }) => {
    set({ spiritBoxKnobs: knobs });
  },
  
  // Lock Spirit Box for 5 seconds (cooldown after getting a word)
  lockSpiritBox: () => {
    const unlockTime = Date.now() + 15000; // 15 second cooldown
    set({
      spiritBoxLocked: true,
      spiritBoxUnlockTime: unlockTime,
    });
    
    // Generate new signature after 14.5 seconds (BEFORE unlock to prevent flash)
    setTimeout(() => {
      const currentState = get();
      // Only generate if the unlock time matches (prevents race conditions)
      if (currentState.spiritBoxUnlockTime === unlockTime) {
        console.log('🔄 Store: Generating new Spirit Box signature (14.5s - before unlock)');
        get().generateNewSpiritBoxSignature();
      }
    }, 14500);
    
    // Auto-unlock after 15 seconds
    setTimeout(() => {
      const currentState = get();
      // Only unlock if the unlock time matches (prevents race conditions)
      if (currentState.spiritBoxUnlockTime === unlockTime) {
        console.log('🔓 Store: Unlocking Spirit Box (15s)');
        get().unlockSpiritBox();
      }
    }, 15000);
  },
  
  // Unlock Spirit Box
  unlockSpiritBox: () => {
    set({
      spiritBoxLocked: false,
      spiritBoxUnlockTime: null,
    });
  },
  
  // Check if Spirit Box is locked
  isSpiritBoxLocked: () => {
    const state = get();
    if (!state.spiritBoxLocked) return false;
    
    // Check if cooldown expired
    if (state.spiritBoxUnlockTime && Date.now() >= state.spiritBoxUnlockTime) {
      get().unlockSpiritBox();
      return false;
    }
    
    return true;
  },
  
  // Enable Dev Mode
  enableDevMode: () => {
    set((state) => ({
      devMode: {
        ...state.devMode,
        enabled: true,
      },
    }));
  },
  
  // Disable Dev Mode
  disableDevMode: () => {
    set((state) => ({
      devMode: {
        ...state.devMode,
        enabled: false,
      },
    }));
  },
  
  // Set simulated ghost position (Dev Mode)
  setSimulatedGhostPosition: (position: Position) => {
    set((state) => ({
      ghostPosition: position,
      devMode: {
        ...state.devMode,
        simulatedGhostPosition: position,
      },
    }));
  },
  
  // Set simulated player position (Dev Mode)
  setSimulatedPlayerPosition: (position: Position) => {
    set((state) => ({
      playerPosition: position,
      devMode: {
        ...state.devMode,
        simulatedPlayerPosition: position,
      },
    }));
  },
  
  // Set simulated player heading (Dev Mode)
  setSimulatedPlayerHeading: (heading: number) => {
    // Normalize to 0-360°
    const normalizedHeading = ((heading % 360) + 360) % 360;
    set((state) => ({
      playerHeading: normalizedHeading,
      devMode: {
        ...state.devMode,
        simulatedPlayerHeading: normalizedHeading,
      },
    }));
  },
  
  // Set active ghost type (Dev Mode)
  setActiveGhostType: (ghostType: GhostType) => {
    // Initialize Spirit Box signature from ghost store when ghost type is set
    const getActiveGhostBehavior = useGhostStore.getState().getActiveGhostBehavior;
    const ghostBehavior = getActiveGhostBehavior(ghostType);
    
    // Use ghost's signature from ghost store (each ghost has unique signature)
    const initialSignature = ghostBehavior?.spiritBoxSignature || {
      knobA: Math.random(),
      knobB: Math.random(),
      tolerance: 0.06,
    };
    
    // Generate Trickster's random contradictory traits if it's Trickster
    const tricksterTraits = ghostType === GhostType.TRICKSTER 
      ? generateTricksterTraits() 
      : null;
    
    set((state) => ({
      activeGhostType: ghostType,
      spiritBoxSignature: initialSignature,
      tricksterTraits, // Store generated traits for Trickster
    }));
  },
  
  // Evidence checklist actions
  setEvidenceState: (
    trait: 'spiritBoxPersonality' | 'whispers' | 'thermalReading' | 'cameraManifestation',
    state: SpiritBoxPersonality | 'present' | 'ruled_out' | 'unknown' | ThermalReadingState | CameraManifestationState
  ) => {
    set((currentState) => ({
      evidenceChecklist: {
        ...currentState.evidenceChecklist,
        [trait]: state,
      },
    }));
  },
  
  setSelectedGhost: (ghostType: GhostType | null) => {
    set({ selectedGhost: ghostType });
  },
  
  // Complete investigation - check if correct and calculate rewards
  completeInvestigation: (selectedGhost: GhostType) => {
    const state = get();
    const isCorrect = selectedGhost === state.activeGhostType;
    
    // Debug logging
    console.log('🎯 Investigation Complete:', {
      selectedGhost,
      activeGhostType: state.activeGhostType,
      isCorrect,
      selectedType: typeof selectedGhost,
      activeType: typeof state.activeGhostType,
      selectedValue: selectedGhost?.toString(),
      activeValue: state.activeGhostType?.toString(),
    });
    
    // Calculate rewards (UI only for now - not actually applied)
    // Base rewards
    const baseMoney = isCorrect ? 500 : 100;
    const baseXP = isCorrect ? 200 : 50;
    
    // Bonus for correct identification
    const moneyBonus = isCorrect ? 250 : 0;
    const xpBonus = isCorrect ? 100 : 0;
    
    const rewards = {
      money: baseMoney + moneyBonus,
      xp: baseXP + xpBonus,
    };
    
    set({ investigationRewards: rewards });
    
    // Return result for use by EvidenceTab
    return { isCorrect, rewards };
  },
  
  // Spirit Box question state actions
  startQuestionCooldown: () => {
    const cooldownEndTime = Date.now() + 2500; // 2-3 seconds cooldown
    set({
      spiritBoxState: {
        ...get().spiritBoxState,
        questionCooldown: true,
        cooldownEndTime,
      },
    });
    
    // Auto-end cooldown after 2.5 seconds
    setTimeout(() => {
      const currentState = get();
      // Only end if the cooldown time matches (prevents race conditions)
      if (currentState.spiritBoxState.cooldownEndTime === cooldownEndTime) {
        get().endQuestionCooldown();
      }
    }, 2500);
  },
  
  endQuestionCooldown: () => {
    set({
      spiritBoxState: {
        ...get().spiritBoxState,
        questionCooldown: false,
        cooldownEndTime: null,
      },
    });
  },
  
  addWordHeard: (word: string) => {
    set((state) => ({
      spiritBoxState: {
        ...state.spiritBoxState,
        wordsHeard: [...state.spiritBoxState.wordsHeard, word],
      },
    }));
  },
}));
