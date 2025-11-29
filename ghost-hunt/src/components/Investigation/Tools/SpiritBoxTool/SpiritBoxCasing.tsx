/**
 * SpiritBoxCasing Component
 * 
 * Spirit Box-specific casing details including:
 * - Physical knobs (tune, volume)
 * - Bent antenna
 * - Radio-style body architecture
 * 
 * Extracted from SpiritBoxMock.tsx
 */

import { memo } from 'react';
import type { SpiritBoxCasingProps } from './types';
import metalTexture from '../../../../assets/texture/metalscratchedtexture.png';

const SpiritBoxCasingComponent = ({}: SpiritBoxCasingProps) => {
  return (
    <>
      {/* Physical knobs - Below frequency display */}
      <div style={{
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        zIndex: 15,
      }}>
        {/* Frequency knob */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
            border: '4px solid rgba(0,0,0,0.8)',
            boxShadow: 
              'inset 0 3px 6px rgba(255,255,255,0.2), ' +
              'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
              '0 6px 16px rgba(0,0,0,0.9)',
            position: 'relative',
          }}>
            {/* Knob indicator */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '18px',
              background: '#ff6600',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(255,102,0,0.6)',
            }} />
            {/* Knob grip ridges */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                  width: '2px',
                  height: '20px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.5)',
            letterSpacing: '1px',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
          }}>
            TUNE
          </div>
        </div>

        {/* Volume knob */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
            border: '4px solid rgba(0,0,0,0.8)',
            boxShadow: 
              'inset 0 3px 6px rgba(255,255,255,0.2), ' +
              'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
              '0 6px 16px rgba(0,0,0,0.9)',
            position: 'relative',
          }}>
            {/* Knob indicator */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '18px',
              background: '#00ff00',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(0,255,0,0.6)',
            }} />
            {/* Knob grip ridges */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                  width: '2px',
                  height: '20px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.5)',
            letterSpacing: '1px',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
          }}>
            VOL
          </div>
        </div>
      </div>

      {/* Bent antenna - Top right */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '8%',
        width: '5px',
        height: '80px',
        background: 'linear-gradient(180deg, #6a6a6a 0%, #4a4a4a 50%, #2a2a2a 100%)',
        transform: 'rotate(12deg)',
        borderRadius: '2px',
        boxShadow: 
          '2px 2px 6px rgba(0,0,0,0.8), ' +
          'inset 0 1px 0 rgba(255,255,255,0.2)',
        zIndex: 10,
      }}>
        {/* Metal texture on antenna */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${metalTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.5,
          borderRadius: '2px',
        }} />
        {/* Antenna tip */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #8a8a8a 0%, #4a4a4a 60%, #1a1a1a 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }} />
      </div>

      {/* Device Architecture sections */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '15%',
        background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
        borderBottom: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />
      
      <div style={{
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        bottom: '30%',
        background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
        zIndex: 1,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
        borderTop: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />

      {/* Weld lines/seams */}
      {[
        { top: '15%', left: '8%', right: '8%', height: '2px', opacity: 0.6 },
        { bottom: '30%', left: '10%', right: '10%', height: '2px', opacity: 0.55 },
        { top: '15%', left: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
        { top: '15%', right: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
      ].map((seam, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(seam.top ? { top: seam.top } : {}),
            ...(seam.bottom ? { bottom: seam.bottom } : {}),
            ...(seam.left ? { left: seam.left } : {}),
            ...(seam.right ? { right: seam.right } : {}),
            ...(seam.width ? { width: seam.width } : {}),
            ...(seam.height ? { height: seam.height } : {}),
            background: seam.width 
              ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
            opacity: seam.opacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}

      {/* Wires extending past edges */}
      {[
        { top: '35%', right: '-18px', width: '55px', height: '3px', rotation: 22 },
        { bottom: '20%', left: '-15px', width: '45px', height: '3px', rotation: -18 },
      ].map((wire, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(wire.top ? { top: wire.top } : {}),
            ...(wire.bottom ? { bottom: wire.bottom } : {}),
            ...(wire.left ? { left: wire.left } : {}),
            ...(wire.right ? { right: wire.right } : {}),
            width: wire.width,
            height: wire.height,
            background: 'linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 100%)',
            transform: `rotate(${wire.rotation}deg)`,
            opacity: 0.8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}
    </>
  );
};

export const SpiritBoxCasing = memo(SpiritBoxCasingComponent);

