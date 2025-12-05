/**
 * EMFTool - Main Component
 * 
 * EMF Meter tool with LED bar graph display.
 * Handles both view mode (inventory) and investigation mode (active hunt).
 * 
 * Follows 007 Investigation Tools Design System with:
 * - Heavy steel gradient casing (matches Radar)
 * - 3-5 texture layers (metal, rust, dust)
 * - 10-15+ damage elements
 * - Etched-style labels
 * - Deep LED display inset with thick bezel
 */

import { useState, useEffect, memo } from 'react';
import type { EMFToolProps } from './types';
import { LEDDisplay } from './LEDDisplay';
import { EMFCasing } from './EMFCasing';
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
import { useInvestigationStore } from '../../../../stores/investigationStore';
import { useGhostRelationship } from '../../../../hooks/useGhostRelationship';
import { calculateEMFLevel } from '../../../../utils/toolBehaviors';

const EMFToolComponent = ({ 
  mode, 
  emfLevel = 0, 
  isFlickering = false 
}: EMFToolProps) => {
  // Internal state for view mode
  const [mockEmfLevel, setMockEmfLevel] = useState(0);
  const [mockFlickering, setMockFlickering] = useState(false);
  
  // Investigation mode state
  const [calculatedEmfLevel, setCalculatedEmfLevel] = useState(0);
  const [investigationFlickering, setInvestigationFlickering] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [lastLoggedLevel, setLastLoggedLevel] = useState(0);
  
  // ✅ Use centralized ghost relationship hook (single source of truth)
  const relationship = useGhostRelationship();

  // Mock animation for view mode
  useEffect(() => {
    if (mode === 'view') {
      // Random EMF spikes for demonstration (matches EMFMeterMock pattern)
      const interval = setInterval(() => {
        const spike = Math.random();
        if (spike > 0.95) {
          // Rare Level 5 spike with flickering
          setMockEmfLevel(5);
          setMockFlickering(true);
          setTimeout(() => setMockFlickering(false), 200);
        } else if (spike > 0.85) {
          // Medium spikes (Level 2-4)
          setMockEmfLevel(Math.floor(Math.random() * 3) + 2);
        } else {
          // Low activity (Level 0-1)
          setMockEmfLevel(Math.random() > 0.7 ? 1 : 0);
        }
      }, 800);

      return () => clearInterval(interval);
    } else {
      // Reset mock state when not in view mode
      setMockEmfLevel(0);
      setMockFlickering(false);
    }
  }, [mode]);
  
  // Investigation mode: Calculate EMF level from centralized relationship
  useEffect(() => {
    if (mode === 'investigation' && relationship.isValid) {
      // ✅ Use centralized relationship data (distance only - no personality)
      const distance = relationship.distance;
        
      // Calculate EMF level using pure distance
        const level = calculateEMFLevel(distance);
        
      console.log('📊 EMF:', distance.toFixed(1) + 'm', '→ Level', level);
        
        setCalculatedEmfLevel(level);
        
        // Visual feedback for level 4-5
        if (level >= 4) {
          // Flickering effect
          setInvestigationFlickering(true);
          setTimeout(() => setInvestigationFlickering(false), 200);
          
          // Screen shake for level 5
          if (level === 5) {
            setScreenShake(true);
            setTimeout(() => setScreenShake(false), 300);
          }
          
          // Log evidence when reaching level 4-5 (only once per level change)
          if (level !== lastLoggedLevel && level >= 4) {
            const evidenceEntry = {
              id: `emf-${Date.now()}-${Math.random()}`,
              timestamp: Date.now(),
              type: 'emf' as const,
              data: {
                level,
                distance: Math.round(distance * 10) / 10, // Round to 1 decimal
              },
            };
            
            useInvestigationStore.getState().logEvidence(evidenceEntry);
            setLastLoggedLevel(level);
          }
        } else {
          // Reset last logged level when dropping below 4
          if (lastLoggedLevel >= 4 && level < 4) {
            setLastLoggedLevel(level);
          }
        }
    } else {
      // Reset investigation state when not in investigation mode or invalid relationship
      setCalculatedEmfLevel(0);
      setInvestigationFlickering(false);
      setScreenShake(false);
      if (mode !== 'investigation') {
      setLastLoggedLevel(0);
      }
    }
  }, [
    mode, 
    relationship.isValid,
    relationship.distance,
    lastLoggedLevel,
  ]);

  // Use mock data in view mode, real data in investigation mode
  const effectiveEmfLevel = mode === 'view' 
    ? mockEmfLevel 
    : (mode === 'investigation' ? calculatedEmfLevel : emfLevel);
  const effectiveFlickering = mode === 'view' 
    ? mockFlickering 
    : (mode === 'investigation' ? investigationFlickering : isFlickering);

  console.log('🎯 EMFTool render:', {
    mode,
    calculatedEmfLevel,
    effectiveEmfLevel,
    effectiveFlickering
  });

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
      // Screen shake animation for level 5
      animation: screenShake ? 'emfScreenShake 0.3s ease-in-out' : 'none',
    }}>
      {/* Layer 0: Background gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
        opacity: 0.3,
        zIndex: 0,
      }} />
      
      {/* Red glow overlay for level 4-5 */}
      {effectiveEmfLevel >= 4 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.15) 0%, transparent 70%)',
          opacity: effectiveEmfLevel === 5 ? 0.8 : 0.5,
          animation: effectiveFlickering ? 'emfRedPulse 0.2s ease-in-out' : 'none',
          pointerEvents: 'none',
          zIndex: 25,
        }} />
      )}
      
      {/* Layer 1: Metal Casing with all components */}
      <MetalCasing>
        {/* Texture Overlays */}
        <TextureOverlays type="metal" />
        
        {/* Damage Elements */}
        <Scratches variant="light" count={6} seed="emf-light" />
        <Scratches variant="dark" count={5} seed="emf-dark" />
        <Gouges count={4} seed="emf-gouges" />
        <RustSpots count={5} seed="emf-rust" />
        <EdgeChips count={6} seed="emf-chips" />
        <Fingerprints count={3} seed="emf-prints" />
        <RainStreaks count={4} seed="emf-rain" />
        
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
        <TapePatches count={2} seed="emf-tape" />
        
        {/* Labels (Etched Style) */}
        <EtchedLabel
          text="EMF METER"
          position={{ top: '8px', left: '25px' }}
          font="caveat"
          fontSize="13px"
          rotation={-1.2}
        />
        <EtchedLabel
          text="K-II METER"
          position={{ top: '3%', left: '50%' }}
          font="courier"
          fontSize="9px"
          rotation={0.4}
        />
        <EtchedLabel
          text="SN: EMF-2019-K2"
          position={{ bottom: '8px', left: '15%' }}
          font="courier"
          fontSize="8px"
          rotation={0.4}
        />
        <EtchedLabel
          text="cal. 03/19"
          position={{ bottom: '8px', right: '15%' }}
          font="caveat"
          fontSize="10px"
          rotation={-0.5}
        />
        
        {/* EMF-Specific Casing Details */}
        <EMFCasing emfLevel={effectiveEmfLevel} />
        
        {/* LED Display */}
        <LEDDisplay 
          emfLevel={effectiveEmfLevel} 
          isFlickering={effectiveFlickering}
        />
      </MetalCasing>
    </div>
  );
};

export const EMFTool = memo(EMFToolComponent);

// Add CSS animations for screen shake and red pulse
const style = document.createElement('style');
style.textContent = `
  @keyframes emfScreenShake {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-2px, 2px); }
    20% { transform: translate(2px, -2px); }
    30% { transform: translate(-2px, -2px); }
    40% { transform: translate(2px, 2px); }
    50% { transform: translate(-2px, 2px); }
    60% { transform: translate(2px, -2px); }
    70% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
    90% { transform: translate(-2px, 2px); }
  }
  
  @keyframes emfRedPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
`;
document.head.appendChild(style);
