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

import { useState, useEffect, useMemo, memo } from 'react';
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

  const responses = useMemo(() => 
    ['...behind...', '...get out...', '...help...', '...cold...', '...here...'],
    []
  );

  // Memoize data calculations
  const effectiveFrequency = useMemo(() => 
    mode === 'view' ? mockFrequency : frequency,
    [mode, mockFrequency, frequency]
  );
  
  const effectiveStaticLevel = useMemo(() => 
    mode === 'view' ? mockStaticLevel : staticLevel,
    [mode, mockStaticLevel, staticLevel]
  );
  
  const effectiveResponse = useMemo(() => 
    mode === 'view' ? mockResponse : evpResponse,
    [mode, mockResponse, evpResponse]
  );
  
  const effectiveShowResponse = useMemo(() => 
    mode === 'view' ? mockShowResponse : showEvp,
    [mode, mockShowResponse, showEvp]
  );

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
        
        {/* SpiritBox-Specific Casing Details */}
        <SpiritBoxCasing />
        
        {/* Oscilloscope Display */}
        <SpiritBoxDisplay
          waveform={waveform}
          frequency={effectiveFrequency}
          staticLevel={effectiveStaticLevel}
          evpResponse={effectiveResponse}
          showEvp={effectiveShowResponse}
        />
      </MetalCasing>
    </div>
  );
};

export const SpiritBoxTool = memo(SpiritBoxToolComponent);


