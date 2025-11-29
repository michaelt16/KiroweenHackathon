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

const EMFToolComponent = ({ 
  mode, 
  emfLevel = 0, 
  isFlickering = false 
}: EMFToolProps) => {
  // Internal state for view mode
  const [mockEmfLevel, setMockEmfLevel] = useState(0);
  const [mockFlickering, setMockFlickering] = useState(false);

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

  // Use mock data in view mode, real data in investigation mode
  const effectiveEmfLevel = mode === 'view' ? mockEmfLevel : emfLevel;
  const effectiveFlickering = mode === 'view' ? mockFlickering : isFlickering;

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
