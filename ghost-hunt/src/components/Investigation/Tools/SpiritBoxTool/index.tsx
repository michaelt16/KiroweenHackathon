/**
 * SpiritBoxTool - Main Component
 * 
 * Spirit Box tool with oscilloscope-style display.
 * Handles both view mode (inventory) and investigation mode (active hunt).
 * 
 * Follows 007 Investigation Tools Design System with:
 * - Heavy steel gradient casing (matches Radar/EMF)
 * - 3-5 texture layers (metal, rust, dust)
 * - 10-15+ damage elements
 * - Etched-style labels
 * - Deep oscilloscope display inset with thick bezel
 */

import { useState, useEffect, useMemo, memo, useRef } from 'react';
import type { SpiritBoxToolProps } from './types';
import { SpiritBoxDisplay } from './SpiritBoxDisplay';
import { SpiritBoxCasing } from './SpiritBoxCasing';
import { MetalCasing } from '../shared/casings/MetalCasing';
import { Scratches } from '../shared/damage/Scratches';
import { Gouges } from '../shared/damage/Gouges';
import { RustSpots } from '../shared/damage/RustSpots';
import { EdgeChips } from '../shared/damage/EdgeChips';
import { Fingerprints } from '../shared/damage/Fingerprints';
import { RainStreaks } from '../shared/damage/RainStreaks';
import { Screws } from '../shared/hardware/Screws';
import { VentGrilles } from '../shared/hardware/VentGrilles';
import { WeldSeams } from '../shared/hardware/WeldSeams';
import { TapePatches } from '../shared/hardware/TapePatches';
import { EtchedLabel } from '../shared/labels/EtchedLabel';
import { TextureOverlays } from '../shared/textures/TextureOverlays';
import { useGhostRelationship } from '../../../../hooks/useGhostRelationship';
import { useInvestigationStore } from '../../../../stores/investigationStore';
import { checkSpiritBoxLock, getRandomWord, calculateEMFLevel } from '../../../../utils/toolBehaviors';
import { selectContextualWord, shouldGhostRespond, type QuestionId } from '../../../../data/spiritBoxWords';
import { useGhostStore } from '../../../../stores/ghostStore';

const SpiritBoxToolComponent = ({ 
  mode, 
  frequency = 87.5, 
  staticLevel = 0.3,
  evpResponse = '',
  showEvp = false,
}: SpiritBoxToolProps) => {
  // Internal state for view mode
  const [mockFrequency, setMockFrequency] = useState(87.5);
  const [mockStaticLevel, setMockStaticLevel] = useState(0.3);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [mockResponse, setMockResponse] = useState('');
  const [mockShowResponse, setMockShowResponse] = useState(false);
  
  // ✅ Use centralized ghost relationship hook (single source of truth)
  const relationship = useGhostRelationship();
  
  // Investigation mode: Knob controls for tuning
  const [knobA, setKnobA] = useState(0.5); // Carrier frequency (0.0-1.0)
  const [knobB, setKnobB] = useState(0.5); // Modulation frequency (0.0-1.0)
  
  // Track if we're syncing from store to prevent circular updates
  const isSyncingFromStoreRef = useRef(false);
  
  // Get store knobs for dev mode auto-calibration (read-only)
  const storeKnobs = useInvestigationStore((state) => state.spiritBoxKnobs);
  
  // Track the last values we wrote to store (to detect external changes)
  const lastWrittenToStoreRef = useRef<{ knobA: number; knobB: number } | null>(null);
  
  // Sync FROM store TO local (for dev mode auto-calibrate button)
  // This ONLY runs when store changes externally (dev mode button), not from our own updates
  useEffect(() => {
    if (mode === 'investigation' && storeKnobs && !isSyncingFromStoreRef.current) {
      const lastWritten = lastWrittenToStoreRef.current;
      
      // Check if this is an external change (dev mode auto-calibrate)
      // vs. our own update (from the effect below) by comparing with what we last wrote
      const isExternalChange = !lastWritten || 
        Math.abs(lastWritten.knobA - storeKnobs.knobA) > 0.001 ||
        Math.abs(lastWritten.knobB - storeKnobs.knobB) > 0.001;
      
      if (isExternalChange) {
        // Only sync if values are significantly different from current local state
        const diffA = Math.abs(knobA - storeKnobs.knobA);
        const diffB = Math.abs(knobB - storeKnobs.knobB);
        
        if (diffA > 0.001 || diffB > 0.001) {
          // External change (dev mode auto-calibrate), sync FROM store TO local
          console.log('🔄 Spirit Box: Syncing from store (dev mode auto-calibrate)', {
            store: storeKnobs,
            local: { knobA, knobB },
            lastWritten
          });
          isSyncingFromStoreRef.current = true;
          setKnobA(storeKnobs.knobA);
          setKnobB(storeKnobs.knobB);
          // Track what we synced
          lastWrittenToStoreRef.current = { knobA: storeKnobs.knobA, knobB: storeKnobs.knobB };
          // Reset flag after state update
          setTimeout(() => {
            isSyncingFromStoreRef.current = false;
          }, 0);
        } else {
          // Values match, just update tracking
          lastWrittenToStoreRef.current = { knobA: storeKnobs.knobA, knobB: storeKnobs.knobB };
        }
      } else {
        // Not an external change - it's our own update, just update tracking
        lastWrittenToStoreRef.current = { knobA: storeKnobs.knobA, knobB: storeKnobs.knobB };
      }
    }
  }, [mode, storeKnobs?.knobA, storeKnobs?.knobB]);
  const [isLocked, setIsLocked] = useState(false);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [showWord, setShowWord] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showNoResponse, setShowNoResponse] = useState(false); // Show "NO RESPONSE" feedback
  const [showFrequencyReset, setShowFrequencyReset] = useState(false); // Show "FREQUENCY RESET" feedback
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0); // Cooldown timer in seconds
  
  // Use refs to track state without causing re-renders
  const lastLoggedWordRef = useRef<string>('');
  const wordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const signatureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const noResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const frequencyResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousSignatureRef = useRef<{ knobA: number; knobB: number } | null>(null);
  const isProcessingRef = useRef(false); // Prevent duplicate processing
  
  // Get investigation store for evidence logging and dynamic signature
  const logEvidence = useInvestigationStore((state) => state.logEvidence);
  const dynamicSignature = useInvestigationStore((state) => state.spiritBoxSignature);
  const generateNewSignature = useInvestigationStore((state) => state.generateNewSpiritBoxSignature);
  const setSpiritBoxKnobs = useInvestigationStore((state) => state.setSpiritBoxKnobs);
  const lockSpiritBox = useInvestigationStore((state) => state.lockSpiritBox);
  const isSpiritBoxLocked = useInvestigationStore((state) => state.isSpiritBoxLocked);
  const devMode = useInvestigationStore((state) => state.devMode);
  const questionCooldown = useInvestigationStore((state) => state.spiritBoxState.questionCooldown);
  const cooldownEndTime = useInvestigationStore((state) => state.spiritBoxState.cooldownEndTime);
  const startQuestionCooldown = useInvestigationStore((state) => state.startQuestionCooldown);
  const endQuestionCooldown = useInvestigationStore((state) => state.endQuestionCooldown);
  const addWordHeard = useInvestigationStore((state) => state.addWordHeard);
  const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
  
  // Get ghost store for ghost behavior
  const getActiveGhostBehavior = useGhostStore((state) => state.getActiveGhostBehavior);
  
  /**
   * Handle question click - Task 9: Implement Question Click Handler
   * 
   * Requirements 3, 4, 7:
   * 1. Check if cooldown is active (disable if true)
   * 2. Get current ghost type from investigation store
   * 3. Roll for response based on ghost's response frequency
   * 4. If responds: select word from appropriate pools
   * 5. If no response: display "No response..." with static effect
   * 6. Log evidence and start cooldown
   */
  const handleQuestionAsked = (questionId: QuestionId) => {
    console.log('🎙️ Question asked:', questionId);
    
    // Check if Spirit Box is locked (during 15-second word display period)
    if (isSpiritBoxLocked()) {
      console.log('❌ Spirit Box locked - ignoring click');
      return;
    }
    
    // Check if player is close enough to ghost (EMF 4-5 required)
    if (emfLevel < 4) {
      console.log('❌ Too far from ghost - EMF level:', emfLevel, '(need 4-5)');
      // Show "TOO FAR" feedback
      setShowNoResponse(true);
      setCurrentWord('');
      setTimeout(() => {
        setShowNoResponse(false);
      }, 2000);
      return;
    }
    
    // Get current ghost type from investigation store (Requirement 4)
    if (!activeGhostType) {
      console.error('❌ No active ghost type - cannot process question');
      return;
    }
    
    console.log('✅ Processing question for ghost:', activeGhostType, '(EMF:', emfLevel, ')');
    
    // Roll for response based on ghost's response frequency (Requirement 7)
    const willRespond = shouldGhostRespond(activeGhostType);
    
    if (willRespond) {
      // Ghost responds - select word from appropriate pools (Requirement 4)
      const { word, category } = selectContextualWord(activeGhostType, questionId);
      
      console.log(`✅ Ghost responds: "${word}" (${category})`);
      
      // Display word (will be handled by state update)
      setCurrentWord(word);
      setShowWord(true);
      setShowNoResponse(false);
      
      // Log evidence (Requirement 4)
      logEvidence({
        id: `spiritbox-${Date.now()}`,
        timestamp: Date.now(),
        type: 'spiritbox',
        data: {
          word,
          wordCategory: category,
          question: getQuestionText(questionId),
          questionContext: questionId,
          responded: true,
          frequency: { knobA, knobB },
        },
      });
      
      // Track word heard
      addWordHeard(word);
      
      // Lock Spirit Box for 15 seconds (shows static/glitch effect)
      // The store will automatically generate new signature after 14.5s and unlock after 15s
      console.log('🔒 Locking Spirit Box for 15 seconds (store will handle signature generation)');
      lockSpiritBox();
      
    } else {
      // Ghost does not respond (Requirement 4)
      console.log('🔇 Ghost does not respond');
      
      // Display "No response..." with static effect
      setShowNoResponse(true);
      setShowWord(false);
      setCurrentWord('');
      
      // Log non-response as evidence (Requirement 4)
      logEvidence({
        id: `spiritbox-${Date.now()}`,
        timestamp: Date.now(),
        type: 'spiritbox',
        data: {
          question: getQuestionText(questionId),
          questionContext: questionId,
          responded: false,
          frequency: { knobA, knobB },
        },
      });
      
      // Hide no response message after 2 seconds
      if (noResponseTimeoutRef.current) {
        clearTimeout(noResponseTimeoutRef.current);
      }
      noResponseTimeoutRef.current = setTimeout(() => {
        setShowNoResponse(false);
      }, 2000);
      
      // Lock Spirit Box for 15 seconds even on no response
      // The store will automatically generate new signature after 14.5s and unlock after 15s
      console.log('🔒 Locking Spirit Box for 15 seconds after no response (store will handle signature generation)');
      lockSpiritBox();
    }
  };
  
  /**
   * Helper function to get question text from question ID
   */
  const getQuestionText = (questionId: QuestionId): string => {
    const questions = {
      q1: 'What do you want?',
      q2: 'Where are you?',
      q3: 'Are you here?',
    };
    return questions[questionId];
  };
  
  // Update store with current knob values (for dev mode display)
  // This is the ONLY place that writes to store from local state
  // The sync effect above handles store -> local (for dev mode auto-calibrate)
  useEffect(() => {
    if (mode === 'investigation' && !isSyncingFromStoreRef.current) {
      // Update store from local state (for dev mode display)
      setSpiritBoxKnobs({ knobA, knobB });
      // Track what we wrote so sync effect knows it's our update, not external
      lastWrittenToStoreRef.current = { knobA, knobB };
    }
  }, [mode, knobA, knobB, setSpiritBoxKnobs]);
  
  // Initialize knobs only once when component mounts in investigation mode
  // Use a ref to track if we've initialized to prevent resets on re-renders
  const hasInitializedRef = useRef(false);
  const activeTool = useInvestigationStore((state) => state.activeTool);
  
  useEffect(() => {
    // Only initialize when switching TO Spirit Box tool (not on every render)
    if (mode === 'investigation' && activeTool === 'spiritbox' && !hasInitializedRef.current) {
      const storeKnobs = useInvestigationStore.getState().spiritBoxKnobs;
      // Only initialize if store knobs are null (first time or tool switch)
      // If store has values, use them (from dev mode auto-calibrate or previous session)
      if (storeKnobs === null) {
        setKnobA(0.5);
        setKnobB(0.5);
        // Update store with initial values
        setSpiritBoxKnobs({ knobA: 0.5, knobB: 0.5 });
      } else {
        // Store has values, use them
        setKnobA(storeKnobs.knobA);
        setKnobB(storeKnobs.knobB);
      }
      hasInitializedRef.current = true;
    } else if (activeTool !== 'spiritbox') {
      // Reset flag when leaving Spirit Box tool (so it re-initializes when switching back)
      hasInitializedRef.current = false;
    }
  }, [mode, activeTool, setSpiritBoxKnobs]);

  const responses = useMemo(() => 
    ['...behind...', '...get out...', '...help...', '...cold...', '...here...'],
    []
  );

  // Calculate EMF level for EMF check
  const emfLevel = useMemo(() => {
    if (mode === 'investigation' && relationship.isValid && relationship.ghostBehavior) {
      return calculateEMFLevel(relationship.distance);
    }
    return 0;
  }, [mode, relationship.isValid, relationship.distance, relationship.ghostBehavior]);

  // Detect frequency reset (when signature changes)
  useEffect(() => {
    if (mode === 'investigation' && dynamicSignature) {
      const currentSig = { knobA: dynamicSignature.knobA, knobB: dynamicSignature.knobB };
      const prevSig = previousSignatureRef.current;
      
      // If signature changed (and we had a previous one), show reset feedback and clear state
      if (prevSig && (prevSig.knobA !== currentSig.knobA || prevSig.knobB !== currentSig.knobB)) {
        console.log('🔄 FREQUENCY RESET DETECTED - New signature:', currentSig);
        console.log('   Previous:', prevSig);
        console.log('   User must re-tune both knobs to new targets');
        setShowFrequencyReset(true);
        
        // ✅ CRITICAL: Immediately set isLocked to false when signature changes
        // This prevents questions from reappearing with the old signature
        console.log('   🔓 Setting isLocked = false (knobs no longer match new target)');
        setIsLocked(false);
        
        // Clear word and other state when signature changes
        setShowWord(false);
        setCurrentWord('');
        setIsWaitingForResponse(false);
        setShowNoResponse(false);
        isProcessingRef.current = false;
        
        // Clear any pending timeouts
        if (wordTimeoutRef.current) {
          clearTimeout(wordTimeoutRef.current);
          wordTimeoutRef.current = null;
        }
        if (signatureTimeoutRef.current) {
          clearTimeout(signatureTimeoutRef.current);
          signatureTimeoutRef.current = null;
        }
        if (noResponseTimeoutRef.current) {
          clearTimeout(noResponseTimeoutRef.current);
          noResponseTimeoutRef.current = null;
        }
        
        // Hide reset message after 2 seconds
        if (frequencyResetTimeoutRef.current) {
          clearTimeout(frequencyResetTimeoutRef.current);
        }
        frequencyResetTimeoutRef.current = setTimeout(() => {
          setShowFrequencyReset(false);
        }, 2000);
      }
      
      // Update previous signature
      previousSignatureRef.current = currentSig;
    }
    
    return () => {
      if (frequencyResetTimeoutRef.current) {
        clearTimeout(frequencyResetTimeoutRef.current);
      }
    };
  }, [mode, dynamicSignature]);

  // Investigation mode: Check if knobs are locked to dynamic signature
  useEffect(() => {
    // Prevent duplicate processing
    if (isProcessingRef.current) return;
    
    // ✅ NEW APPROACH: Don't clear timeouts if Spirit Box is locked (cooldown/glitch mode)
    // The timeout will handle unlocking and clearing the word after 15 seconds
    const isOnCooldown = isSpiritBoxLocked();
    const shouldPreserveTimeouts = isOnCooldown || showWord || isWaitingForResponse;
    
    if (!shouldPreserveTimeouts) {
      // Only clear timeouts if we're not in cooldown and not showing a word/response
      if (wordTimeoutRef.current) {
        clearTimeout(wordTimeoutRef.current);
        wordTimeoutRef.current = null;
      }
      if (signatureTimeoutRef.current) {
        clearTimeout(signatureTimeoutRef.current);
        signatureTimeoutRef.current = null;
      }
      if (noResponseTimeoutRef.current) {
        clearTimeout(noResponseTimeoutRef.current);
        noResponseTimeoutRef.current = null;
      }
    } else {
      // Debug: Log when we're preserving timeouts
      if (isOnCooldown) {
        console.log('🔒 Spirit Box: Preserving timeout - tool is locked (cooldown)');
      } else if (showWord && wordTimeoutRef.current) {
        console.log('🔒 Spirit Box: Preserving timeout - word is showing');
      }
    }
    
    // ✅ NEW SYSTEM: Only check for signal lock, words come from questions only
    if (mode === 'investigation' && relationship.isValid && relationship.ghostBehavior && dynamicSignature) {
      // Check if knobs are locked (tighter tolerance - smaller window but not exact)
      const tolerance = 0.008; // Tighter tolerance (0.8% of range - must be close but not exact)
      const locked = checkSpiritBoxLock(
        knobA,
        knobB,
        dynamicSignature.knobA,
        dynamicSignature.knobB,
        tolerance
      );
      
      console.log('🎙️ Spirit Box: Lock check', {
        knobA: knobA.toFixed(3),
        knobB: knobB.toFixed(3),
        targetA: dynamicSignature.knobA.toFixed(3),
        targetB: dynamicSignature.knobB.toFixed(3),
        tolerance: tolerance.toFixed(3),
        locked,
        emfLevel
      });
      
      setIsLocked(locked);
    } else {
      setIsLocked(false);
    }
    
    // Cleanup timeouts on unmount only (not on re-run)
    // Don't clear timeouts during cooldown - let them complete
    return () => {
      // Only cleanup on component unmount, not on dependency changes
      // The timeouts will complete naturally
    };
  }, [
    mode,
    knobA,
    knobB,
    relationship.isValid,
    relationship.ghostBehavior,
    dynamicSignature,
    emfLevel,
    // Removed isWaitingForResponse and showWord from dependencies to prevent loops
    // Removed generateNewSignature - it's a stable Zustand function
    // Removed logEvidence - it's a stable Zustand function
  ]);
  
  // Investigation mode: Update static level based on lock status
  const investigationStaticLevel = useMemo(() => {
    if (mode === 'investigation') {
      // If Spirit Box is locked (cooldown/glitch mode), show heavy static
      if (isSpiritBoxLocked()) {
        return 0.8; // Heavy static during lock/glitch
      }
      // If signal is locked (tuned correctly), clear static
      if (isLocked) {
        return 0.0; // Clear static when signal locked
      }
    }
    return 0.3; // Normal static when not locked
  }, [mode, isLocked, isSpiritBoxLocked]);
  
  // Investigation mode: Update frequency based on knobs
  const investigationFrequency = useMemo(() => {
    if (mode === 'investigation') {
      // Convert knob values (0.0-1.0) to frequency range (87.0-108.0 MHz)
      return 87.0 + (knobA * 21.0);
    }
    return frequency;
  }, [mode, knobA, frequency]);
  
  // Investigation mode: Use locked word or empty
  const investigationResponse = useMemo(() => {
    if (mode === 'investigation' && isLocked && showWord) {
      return `...${currentWord}...`;
    }
    return '';
  }, [mode, isLocked, showWord, currentWord]);
  
  // Calculate proximity to target for visual feedback (uses dynamic signature)
  const knobProximity = useMemo(() => {
    if (mode === 'investigation' && dynamicSignature) {
      const diffA = Math.abs(knobA - dynamicSignature.knobA);
      const diffB = Math.abs(knobB - dynamicSignature.knobB);
      const maxDiff = Math.max(diffA, diffB);
      const visualTolerance = 0.08; // Wider range for visual feedback (8% - shows "getting close")
      const lockTolerance = 0.008; // Tighter range for actual lock (0.8% - must be close but not exact)
      const proximity = Math.max(0, 1 - (maxDiff / visualTolerance)); // 0 = far, 1 = very close
      
      // Individual knob lock status (for visual indicators)
      const knobALocked = diffA <= lockTolerance;
      const knobBLocked = diffB <= lockTolerance;
      
      return {
        knobA: { 
          diff: diffA, 
          proximity: Math.max(0, 1 - (diffA / visualTolerance)),
          locked: knobALocked 
        },
        knobB: { 
          diff: diffB, 
          proximity: Math.max(0, 1 - (diffB / visualTolerance)),
          locked: knobBLocked 
        },
        overall: proximity,
        bothLocked: knobALocked && knobBLocked,
      };
    }
    return null;
  }, [mode, knobA, knobB, dynamicSignature]);
  
  // Memoize data calculations
  const effectiveFrequency = useMemo(() => 
    mode === 'view' ? mockFrequency : investigationFrequency,
    [mode, mockFrequency, investigationFrequency]
  );
  
  const effectiveStaticLevel = useMemo(() => 
    mode === 'view' ? mockStaticLevel : investigationStaticLevel,
    [mode, mockStaticLevel, investigationStaticLevel]
  );
  
  const effectiveResponse = useMemo(() => 
    mode === 'view' ? mockResponse : investigationResponse,
    [mode, mockResponse, investigationResponse]
  );
  
  const effectiveShowResponse = useMemo(() => {
    const result = mode === 'view' ? mockShowResponse : (mode === 'investigation' ? (isLocked && showWord) : showEvp);
    if (mode === 'investigation') {
      console.log('🎙️ Spirit Box: effectiveShowResponse calculated:', {
        isLocked,
        showWord,
        currentWord,
        result,
        mode
      });
    }
    return result;
  }, [mode, mockShowResponse, isLocked, showWord, showEvp, currentWord]);

  // Mock animation for view mode
  useEffect(() => {
    if (mode === 'view') {
      let animationId: number;
      let lastFreqTime = performance.now();
      let lastStaticTime = performance.now();
      let lastResponseTime = performance.now();
      
      const animate = (currentTime: number) => {
        // Frequency drift (~10fps, 100ms)
        if (currentTime - lastFreqTime >= 100) {
          lastFreqTime = currentTime;
          setMockFrequency((prev) => prev + (Math.random() - 0.5) * 0.1);
        }
        
        // Static variation (~6.67fps, 150ms)
        if (currentTime - lastStaticTime >= 150) {
          lastStaticTime = currentTime;
          setMockStaticLevel(0.2 + Math.random() * 0.6);
        }
        
        // Random EVP responses (~0.5fps, 2000ms)
        if (currentTime - lastResponseTime >= 2000) {
          lastResponseTime = currentTime;
          if (Math.random() > 0.92) {
            setMockResponse(responses[Math.floor(Math.random() * responses.length)]);
            setMockShowResponse(true);
            setTimeout(() => setMockShowResponse(false), 3000);
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [mode, responses]);

  // Waveform generation (both modes) - optimized with requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      // Throttle to ~20fps (50ms per frame)
      if (deltaTime >= 50) {
        lastTime = currentTime;
        const newWave = Array.from({ length: 50 }, () => Math.random() * effectiveStaticLevel);
        setWaveform(newWave);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [effectiveStaticLevel]);
  
  // Cleanup all timeouts and intervals on unmount
  useEffect(() => {
    return () => {
      if (wordTimeoutRef.current) {
        clearTimeout(wordTimeoutRef.current);
      }
      if (signatureTimeoutRef.current) {
        clearTimeout(signatureTimeoutRef.current);
      }
      if (noResponseTimeoutRef.current) {
        clearTimeout(noResponseTimeoutRef.current);
      }
      if (frequencyResetTimeoutRef.current) {
        clearTimeout(frequencyResetTimeoutRef.current);
      }
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  // Track cooldown timer for visual feedback
  useEffect(() => {
    if (mode === 'investigation' && questionCooldown && cooldownEndTime) {
      // Update cooldown timer every 100ms for smooth countdown
      const updateTimer = () => {
        const remaining = Math.max(0, cooldownEndTime - Date.now());
        setCooldownTimeRemaining(Math.ceil(remaining / 1000)); // Convert to seconds, round up
        
        if (remaining <= 0) {
          // Cooldown expired
          setCooldownTimeRemaining(0);
          if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
            cooldownIntervalRef.current = null;
          }
        }
      };
      
      // Initial update
      updateTimer();
      
      // Update every 100ms
      cooldownIntervalRef.current = setInterval(updateTimer, 100);
      
      return () => {
        if (cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
        }
      };
    } else {
      // No cooldown active
      setCooldownTimeRemaining(0);
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
        cooldownIntervalRef.current = null;
      }
    }
  }, [mode, questionCooldown, cooldownEndTime]);
  
  // Cancel cooldown if signal lock is lost
  useEffect(() => {
    if (mode === 'investigation' && questionCooldown && !isLocked) {
      console.log('🔇 Spirit Box: Signal lock lost, canceling question cooldown');
      endQuestionCooldown();
      setCooldownTimeRemaining(0);
    }
  }, [mode, questionCooldown, isLocked, endQuestionCooldown]);
  
  // Debug: Log when component renders
  useEffect(() => {
    console.log('🎙️ SpiritBoxTool rendering:', { 
      mode, 
      isValid: relationship.isValid,
      ghostBehavior: relationship.ghostBehavior ? 'present' : 'null',
      devModeEnabled: devMode.enabled,
      dynamicSignature: dynamicSignature ? 'present' : 'null',
      questionCooldown,
      cooldownTimeRemaining
    });
  }, [mode, relationship.isValid, relationship.ghostBehavior, devMode.enabled, dynamicSignature, questionCooldown, cooldownTimeRemaining]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0a',
      zIndex: 1,
    }}>
      <MetalCasing>
        {/* Texture Overlays */}
        <TextureOverlays type="metal" />
        
        {/* Damage Elements */}
        <Scratches variant="light" count={6} seed="spiritbox-light" />
        <Scratches variant="dark" count={5} seed="spiritbox-dark" />
        <Gouges count={4} seed="spiritbox-gouges" />
        <RustSpots count={5} seed="spiritbox-rust" />
        <EdgeChips count={6} seed="spiritbox-chips" />
        <Fingerprints count={3} seed="spiritbox-prints" />
        <RainStreaks count={4} seed="spiritbox-rain" />
        
        {/* Hardware Elements */}
        <Screws 
          positions={[
            { top: '12px', left: '12px' },
            { top: '12px', right: '12px' },
            { bottom: '12px', left: '12px' },
            { bottom: '12px', right: '12px' },
          ]}
          size={14}
          type="cross"
        />
        <VentGrilles side="left" />
        <VentGrilles side="right" />
        <WeldSeams />
        <TapePatches count={3} seed="spiritbox-tape" />
        
        {/* Labels (Etched Style) */}
        <EtchedLabel
          text="SPIRIT BOX"
          position={{ top: '8px', left: '25px' }}
          font="caveat"
          fontSize="14px"
          rotation={-1.5}
        />
        <EtchedLabel
          text="EVP"
          position={{ top: '3%', left: '12%' }}
          font="courier"
          fontSize="11px"
          rotation={-0.5}
        />
        <EtchedLabel
          text="FREQ"
          position={{ top: '3%', left: '22%' }}
          font="courier"
          fontSize="10px"
          rotation={0.4}
        />
        <EtchedLabel
          text="STATIC"
          position={{ top: '3%', right: '15%' }}
          font="courier"
          fontSize="10px"
          rotation={0.6}
        />
        <EtchedLabel
          text="EVP RECORDER"
          position={{ top: '8px', right: '25px' }}
          font="courier"
          fontSize="10px"
          rotation={0.8}
        />
        <EtchedLabel
          text="SN: SB-1987-2B"
          position={{ bottom: '8px', left: '15%' }}
          font="courier"
          fontSize="8px"
          rotation={0.4}
        />
        
        {/* SpiritBox-Specific Casing Details with Interactive Knobs */}
        <SpiritBoxCasing
          knobA={mode === 'investigation' ? knobA : 0.5}
          knobB={mode === 'investigation' ? knobB : 0.5}
          onKnobAChange={mode === 'investigation' ? setKnobA : undefined}
          onKnobBChange={mode === 'investigation' ? setKnobB : undefined}
          mode={mode}
        />
        
        {/* Investigation Mode: Enhanced Tuning Helper (below knobs) */}
        {mode === 'investigation' && (
          <div style={{
            position: 'absolute',
            top: '78%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '80px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 25, // Higher z-index to ensure visibility
            pointerEvents: 'none', // Don't block interactions
          }}>
            {/* Knob A Helper */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              minWidth: '120px',
            }}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '10px',
                color: '#86efac',
                textShadow: '0 0 4px #86efac',
                letterSpacing: '1px',
                marginBottom: '2px',
              }}>
                TUNE (A)
              </div>
              
              {/* Current Value */}
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: knobProximity && knobProximity.knobA.proximity > 0.5 
                  ? (knobProximity.knobA.proximity > 0.9 ? '#00ff00' : '#ffaa00')
                  : '#86efac',
                textShadow: knobProximity && knobProximity.knobA.proximity > 0.5
                  ? `0 0 ${6 + knobProximity.knobA.proximity * 6}px ${knobProximity.knobA.proximity > 0.9 ? '#00ff00' : '#ffaa00'}`
                  : '0 0 4px #86efac',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'color 0.2s, text-shadow 0.2s',
              }}>
                {knobA.toFixed(3)}
              </div>
              
              {/* Target Value */}
              {dynamicSignature ? (
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: '#666',
                  textAlign: 'center',
                  opacity: 0.7,
                }}>
                  Target: {dynamicSignature.knobA.toFixed(3)}
                </div>
              ) : (
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: '#666',
                  textAlign: 'center',
                  opacity: 0.5,
                }}>
                  Waiting for signal...
                </div>
              )}
              
              {/* Status & Direction */}
              {knobProximity && (
                <>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    color: knobProximity.knobA.locked ? '#00ff00' : 
                           knobProximity.knobA.proximity > 0.5 ? '#ffaa00' : '#666',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: knobProximity.knobA.locked
                      ? '0 0 8px #00ff00'
                      : knobProximity.knobA.proximity > 0.5
                      ? '0 0 4px #ffaa00'
                      : 'none',
                  }}>
                    {knobProximity.knobA.locked ? '✓ LOCKED' :
                     knobProximity.knobA.proximity > 0.5 ? '● CLOSE' : '○ FAR'}
                  </div>
                  
                  {/* Direction Hint */}
                  {!knobProximity.knobA.locked && dynamicSignature && (
                    <div style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '8px',
                      color: '#ffaa00',
                      textAlign: 'center',
                      marginTop: '2px',
                    }}>
                      {knobA < dynamicSignature.knobA ? '→ Turn RIGHT' : '← Turn LEFT'}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Knob B Helper */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              minWidth: '120px',
            }}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '10px',
                color: '#86efac',
                textShadow: '0 0 4px #86efac',
                letterSpacing: '1px',
                marginBottom: '2px',
              }}>
                VOL (B)
              </div>
              
              {/* Current Value */}
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: knobProximity && knobProximity.knobB.proximity > 0.5 
                  ? (knobProximity.knobB.proximity > 0.9 ? '#00ff00' : '#ffaa00')
                  : '#86efac',
                textShadow: knobProximity && knobProximity.knobB.proximity > 0.5
                  ? `0 0 ${6 + knobProximity.knobB.proximity * 6}px ${knobProximity.knobB.proximity > 0.9 ? '#00ff00' : '#ffaa00'}`
                  : '0 0 4px #86efac',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'color 0.2s, text-shadow 0.2s',
              }}>
                {knobB.toFixed(3)}
              </div>
              
              {/* Target Value */}
              {dynamicSignature ? (
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: '#666',
                  textAlign: 'center',
                  opacity: 0.7,
                }}>
                  Target: {dynamicSignature.knobB.toFixed(3)}
                </div>
              ) : (
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: '#666',
                  textAlign: 'center',
                  opacity: 0.5,
                }}>
                  Waiting for signal...
                </div>
              )}
              
              {/* Status & Direction */}
              {knobProximity && (
                <>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    color: knobProximity.knobB.locked ? '#00ff00' : 
                           knobProximity.knobB.proximity > 0.5 ? '#ffaa00' : '#666',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: knobProximity.knobB.locked
                      ? '0 0 8px #00ff00'
                      : knobProximity.knobB.proximity > 0.5
                      ? '0 0 4px #ffaa00'
                      : 'none',
                  }}>
                    {knobProximity.knobB.locked ? '✓ LOCKED' :
                     knobProximity.knobB.proximity > 0.5 ? '● CLOSE' : '○ FAR'}
                  </div>
                  
                  {/* Direction Hint */}
                  {!knobProximity.knobB.locked && dynamicSignature && (
                    <div style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '8px',
                      color: '#ffaa00',
                      textAlign: 'center',
                      marginTop: '2px',
                    }}>
                      {knobB < dynamicSignature.knobB ? '→ Turn RIGHT' : '← Turn LEFT'}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Glitch/Lock Indicator - Shows during 15-second lock after word */}
        {mode === 'investigation' && isSpiritBoxLocked() && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Courier New", monospace',
            fontSize: '16px',
            color: '#ff6666',
            textShadow: '0 0 15px #ff6666, 0 0 30px rgba(255,102,102,0.6)',
            fontWeight: 'bold',
            letterSpacing: '2px',
            zIndex: 20,
            pointerEvents: 'none',
            animation: 'blink 0.5s infinite',
          }}>
            SIGNAL LOCKED...
          </div>
        )}
        

        
        {/* Oscilloscope Display */}
        <SpiritBoxDisplay
          waveform={waveform}
          frequency={effectiveFrequency}
          staticLevel={effectiveStaticLevel}
          evpResponse={effectiveResponse}
          showEvp={effectiveShowResponse}
          isLocked={mode === 'investigation' ? isLocked : false}
          showNoResponse={mode === 'investigation' ? showNoResponse : false}
          showFrequencyReset={mode === 'investigation' ? showFrequencyReset : false}
          onQuestionAsked={mode === 'investigation' ? handleQuestionAsked : undefined}
          questionCooldown={mode === 'investigation' ? isSpiritBoxLocked() : false}
         />

        
      </MetalCasing>
    </div>
  );
};

export const SpiritBoxTool = memo(SpiritBoxToolComponent);


