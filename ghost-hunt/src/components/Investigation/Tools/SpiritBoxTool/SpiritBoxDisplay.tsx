/**
 * SpiritBoxDisplay Component
 * 
 * Oscilloscope-style display for Spirit Box showing:
 * - Waveform visualization
 * - Grid lines
 * - Frequency readout
 * - Static level indicator
 * - EVP text overlays
 * 
 * Extracted from SpiritBoxMock.tsx
 */

import { memo } from 'react';
import type { SpiritBoxDisplayProps } from './types';
import crtTexture from '../../../../assets/texture/crtexture.png';
import filmgrain from '../../../../assets/texture/filmgrain.png';
import dirtyGlass from '../../../../assets/texture/dirtyglass.png';
import dust from '../../../../assets/texture/dust.png';
import metalTexture from '../../../../assets/texture/metalscratchedtexture.png';
import rust from '../../../../assets/texture/brownrust.png';
import tape from '../../../../assets/texture/tape.png';
import { DirtyGlass } from '../shared/effects/DirtyGlass';
import { FilmGrain } from '../shared/effects/FilmGrain';

const SpiritBoxDisplayComponent = ({
  waveform,
  frequency,
  staticLevel,
  evpResponse = '',
  showEvp = false,
}: SpiritBoxDisplayProps) => {
  return (
    <>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
      `}</style>
      
      {/* Oscilloscope Display Container */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(85vw, 750px)',
        height: 'min(35vh, 280px)',
        maxWidth: '750px',
        maxHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 15,
      }}>
        {/* Recessed Cavity */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
          boxShadow: 
            'inset 0 12px 36px rgba(0,0,0,0.98), ' +
            'inset 0 6px 18px rgba(0,0,0,0.95), ' +
            'inset 0 3px 9px rgba(0,0,0,0.9)',
        }}>
          {/* THICK Metallic Bezel Ring */}
          <div style={{
            position: 'absolute',
            top: '-25px',
            left: '-25px',
            right: '-25px',
            bottom: '-25px',
            borderRadius: '8px',
            background: `
              linear-gradient(135deg, 
                #5a5a5a 0%, 
                #4a4a4a 15%, 
                #3a3a3a 30%, 
                #4a4a4a 50%, 
                #3a3a3a 70%, 
                #2a2a2a 85%, 
                #1a1a1a 100%
              ),
              url(${metalTexture})
            `,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover, cover',
            boxShadow: 
              'inset 0 4px 8px rgba(255,255,255,0.2), ' +
              'inset 0 -4px 8px rgba(0,0,0,0.9), ' +
              'inset 0 0 80px rgba(0,0,0,0.5), ' +
              '0 10px 25px rgba(0,0,0,0.95), ' +
              '0 15px 35px rgba(0,0,0,0.85)',
            filter: 'brightness(0.85)',
            border: '5px solid rgba(0,0,0,0.8)',
            borderTop: '4px solid rgba(255,255,255,0.1)',
            zIndex: 12,
          }}>
            {/* DEEP Shadow beneath bezel */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '28px',
              right: '28px',
              bottom: '28px',
              borderRadius: '4px',
              boxShadow: 
                'inset 0 0 50px rgba(0,0,0,0.99), ' +
                'inset 0 0 80px rgba(0,0,0,0.98), ' +
                'inset 0 0 110px rgba(0,0,0,0.96)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Rust/wear on bezel */}
            <div style={{
              position: 'absolute',
              top: '15%',
              right: '20%',
              width: '40px',
              height: '40px',
              backgroundImage: `url(${rust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            
            {/* Tape patch on bezel */}
            <div style={{
              position: 'absolute',
              bottom: '25%',
              left: '10%',
              width: '50px',
              height: '20px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              transform: 'rotate(-15deg)',
              opacity: 0.7,
              boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }} />
            
            {/* Bezel scratches */}
            {[
              { top: '25%', left: '15%', width: '30px', angle: -25, opacity: 0.6 },
              { bottom: '30%', right: '20%', width: '35px', angle: 35, opacity: 0.65 },
            ].map((scratch, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...(scratch.top ? { top: scratch.top } : {}),
                  ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
                  ...(scratch.left ? { left: scratch.left } : {}),
                  ...(scratch.right ? { right: scratch.right } : {}),
                  width: scratch.width,
                  height: '1px',
                  background: 'rgba(0,0,0,0.7)',
                  transform: `rotate(${scratch.angle}deg)`,
                  opacity: scratch.opacity,
                  pointerEvents: 'none',
                  boxShadow: '0 0 1px rgba(0,0,0,0.8)',
                }}
              />
            ))}
            
            {/* Screws at corners */}
            {[
              { top: '12px', left: '12px' },
              { top: '12px', right: '12px' },
              { bottom: '12px', left: '12px' },
              { bottom: '12px', right: '12px' },
            ].map((corner, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...(corner.top ? { top: corner.top } : {}),
                  ...(corner.bottom ? { bottom: corner.bottom } : {}),
                  ...(corner.left ? { left: corner.left } : {}),
                  ...(corner.right ? { right: corner.right } : {}),
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #2a2a2a 50%, #0a0a0a 100%)',
                  boxShadow: 
                    'inset 0 2px 3px rgba(255,255,255,0.2), ' +
                    'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                    '0 3px 6px rgba(0,0,0,0.8)',
                  border: '1px solid rgba(0,0,0,0.7)',
                  zIndex: 20,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '1px',
                  background: '#0a0a0a',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                  width: '10px',
                  height: '1px',
                  background: '#0a0a0a',
                }} />
              </div>
            ))}
          </div>
          
          {/* Actual Oscilloscope Screen */}
          <div style={{
            position: 'absolute',
            top: '6%',
            left: '6%',
            right: '6%',
            bottom: '6%',
            borderRadius: '4px',
            background: '#0a1a0a',
            boxShadow: 
              'inset 0 15px 40px rgba(0,0,0,0.99), ' +
              'inset 0 8px 25px rgba(0,0,0,0.98), ' +
              'inset 0 4px 12px rgba(0,0,0,0.97), ' +
              'inset 0 0 100px rgba(0,255,0,0.22)',
            border: '3px solid #000',
            overflow: 'hidden',
            zIndex: 13,
          }}>
            {/* Grid lines */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.25, zIndex: 1 }}>
              {[...Array(9)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${(i + 1) * 11.11}%`}
                  x2="100%"
                  y2={`${(i + 1) * 11.11}%`}
                  stroke="#00ff00"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(15)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i + 1) * 6.66}%`}
                  y1="0"
                  x2={`${(i + 1) * 6.66}%`}
                  y2="100%"
                  stroke="#00ff00"
                  strokeWidth="0.5"
                />
              ))}
            </svg>

            {/* Waveform */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
              <polyline
                points={waveform.length > 0 ? waveform
                  .map((val, i) => `${(i / waveform.length) * 100}%,${90 - val * 80}`)
                  .join(' ') : ''}
                fill="none"
                stroke="#00ff00"
                strokeWidth="2.5"
                opacity="0.9"
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feColorMatrix in="coloredBlur" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* CRT Scanlines */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
              pointerEvents: 'none',
              zIndex: 10,
            }} />
            
            {/* CRT Texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${crtTexture})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.1,
              pointerEvents: 'none',
              zIndex: 11,
            }} />
            
            {/* Film grain */}
            <FilmGrain opacity={0.3} />

            {/* EVP response text */}
            {showEvp && evpResponse && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Courier New", monospace',
                fontSize: '22px',
                color: '#ff6666',
                textShadow: 
                  '0 0 15px #ff6666, ' +
                  '0 0 30px rgba(255,102,102,0.6), ' +
                  '0 -1px 1px rgba(255,255,255,0.2), ' +
                  '0 1px 2px rgba(0,0,0,0.9)',
                animation: 'fadeInOut 3s',
                zIndex: 15,
                letterSpacing: '3px',
                fontWeight: 'bold',
              }}>
                {evpResponse}
              </div>
            )}

            {/* Static indicator - Top right */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              background: 'rgba(0,0,0,0.85)',
              border: '1px solid rgba(0,255,0,0.4)',
              borderRadius: '3px',
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: '#00ff00',
              textShadow: 
                '0 0 6px rgba(0,255,0,0.5), ' +
                '0 -1px 1px rgba(255,255,255,0.2), ' +
                '0 1px 2px rgba(0,0,0,0.9)',
              opacity: 0.8,
              zIndex: 8,
            }}>
              STATIC: {Math.floor(staticLevel * 100)}%
            </div>

            {/* Dirty glass overlay */}
            <DirtyGlass opacity={0.4} />
            
            {/* Dust overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.25,
              pointerEvents: 'none',
              zIndex: 14,
              borderRadius: '4px',
            }} />
          </div>
        </div>
      </div>
      
      {/* Frequency Display - Below oscilloscope */}
      <div style={{
        position: 'absolute',
        top: '58%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(85vw, 750px)',
        padding: '14px 20px',
        background: 'rgba(0,0,0,0.9)',
        borderRadius: '6px',
        border: '3px solid rgba(0,0,0,0.8)',
        boxShadow: 
          'inset 0 4px 12px rgba(0,0,0,0.95), ' +
          '0 4px 12px rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 15,
      }}>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '11px',
          color: 'rgba(200,200,200,0.6)',
          letterSpacing: '1px',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.2), ' +
            '0 1px 2px rgba(0,0,0,0.9)',
        }}>
          FREQ
        </div>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '28px',
          color: '#ff6600',
          textShadow: 
            '0 0 12px rgba(255,102,0,0.8), ' +
            '0 -1px 1px rgba(255,255,255,0.2), ' +
            '0 1px 2px rgba(0,0,0,0.9)',
          letterSpacing: '2px',
          fontWeight: 'bold',
        }}>
          {frequency.toFixed(1)} MHz
        </div>
        {/* Flickering LED segments */}
        <div style={{
          display: 'flex',
          gap: '3px',
        }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '5px',
                height: '14px',
                background: Math.random() > 0.5 ? '#ff0000' : '#330000',
                borderRadius: '1px',
                boxShadow: Math.random() > 0.5 ? '0 0 8px rgba(255,0,0,0.6)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const SpiritBoxDisplay = memo(SpiritBoxDisplayComponent);

