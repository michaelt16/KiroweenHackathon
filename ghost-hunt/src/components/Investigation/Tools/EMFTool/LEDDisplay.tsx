/**
 * LEDDisplay Component
 * 
 * LED matrix display for EMF Meter showing 5 columns × 8 segments.
 * Implements color progression: green → yellow → orange → red
 * Extracted from EMFMeterMock.tsx
 */

import { memo } from 'react';
import type { LEDDisplayProps } from './types';
import filmgrain from '../../../../assets/texture/filmgrain.png';
import dust from '../../../../assets/texture/dust.png';

const LEDDisplayComponent = ({ 
  emfLevel, 
  isFlickering, 
  columns = 5, 
  segmentsPerColumn = 8 
}: LEDDisplayProps) => {
  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
      `}</style>
      
      {/* LED Display Panel */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '400px',
        height: '45%',
        background: '#0a0a0a',
        borderRadius: '8px',
        boxShadow: 
          'inset 0 8px 20px rgba(0,0,0,0.95), ' +
          'inset 0 4px 10px rgba(0,0,0,0.9), ' +
          '0 2px 6px rgba(0,0,0,0.8)',
        border: '3px solid #1a1a1a',
        zIndex: 11,
      }}>
        {/* THICK Metallic Bezel Ring - Raised Above LED Panel */}
        <div style={{
          position: 'absolute',
          top: '-28px',
          left: '-28px',
          right: '-28px',
          bottom: '-28px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 15%, #3a3a3a 30%, #4a4a4a 50%, #3a3a3a 70%, #2a2a2a 85%, #1a1a1a 100%)`,
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
          {/* Bezel screws at cardinal points */}
          {[
            { top: '18px', left: '50%', transform: 'translateX(-50%)' },
            { bottom: '18px', left: '50%', transform: 'translateX(-50%)' },
            { top: '50%', left: '18px', transform: 'translateY(-50%)' },
            { top: '50%', right: '18px', transform: 'translateY(-50%)' },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...pos,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                  'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                border: '1px solid rgba(0,0,0,0.7)',
                zIndex: 10,
              }}
            >
              {/* Screw slot */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '1.5px',
                background: '#0a0a0a',
                boxShadow: '0 0 2px rgba(0,0,0,0.9)',
              }} />
            </div>
          ))}
          
          {/* DEEP Shadow beneath bezel */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            right: '32px',
            bottom: '32px',
            borderRadius: '8px',
            boxShadow: 
              'inset 0 0 60px rgba(0,0,0,0.99), ' +
              'inset 0 0 100px rgba(0,0,0,0.98), ' +
              'inset 0 0 140px rgba(0,0,0,0.96), ' +
              'inset 0 0 180px rgba(0,0,0,0.94)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />
        </div>
        
        {/* LED Matrix - 5 columns × 8 segments */}
        <div style={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 21,
        padding: '12px',
        alignItems: 'flex-end',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        {[1, 2, 3, 4, 5].map((level) => {
          const isActive = emfLevel >= level;
          const colors = ['#00ff55', '#00ff55', '#ffff00', '#ff8800', '#ff0000'];
          const darkColors = ['#002200', '#002200', '#332200', '#331100', '#220000'];
          const color = colors[level - 1];
          const darkColor = darkColors[level - 1];
          
          return (
            <div
              key={level}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {[...Array(segmentsPerColumn)].map((_, segmentIndex) => {
                // Segments fill from bottom to top
                const reverseIndex = segmentsPerColumn - 1 - segmentIndex;
                const segmentActive = isActive && (reverseIndex < (emfLevel >= level ? segmentsPerColumn : 0));
                
                // Color assignment based on level
                const isLevel5 = level === 5 && emfLevel >= 5;
                const isLevel4 = level === 4 && emfLevel >= 4;
                const isLevel3 = level === 3 && emfLevel >= 3;
                const isLevel1_2 = (level === 1 || level === 2) && emfLevel >= level;
                
                let activeColor = color;
                let activeDark = darkColor;
                if (isLevel5) {
                  activeColor = '#ff0000';
                  activeDark = '#440000';
                } else if (isLevel4) {
                  activeColor = '#ff8800';
                  activeDark = '#331100';
                } else if (isLevel3) {
                  activeColor = '#ffff00';
                  activeDark = '#332200';
                } else if (isLevel1_2) {
                  activeColor = '#00ff55';
                  activeDark = '#002200';
                }
                
                const toxicRed = isLevel5 ? '#ff0000' : activeColor;
                const toxicDark = isLevel5 ? '#440000' : activeDark;
                
                // Brightness and effects
                const baseBrightness = segmentActive 
                  ? (isLevel5 ? 1.0 : 0.9 + Math.random() * 0.1)
                  : 0.08;
                
                const pulse = isLevel5 ? (Math.sin(Date.now() / 100) * 0.15 + 1) : 1;
                const shimmer = segmentActive ? (Math.sin(Date.now() / 200 + segmentIndex * 0.5) * 0.05 + 1) : 1;
                const flickerOpacity = isFlickering && segmentActive ? 0.65 : (baseBrightness * shimmer * pulse);
                
                const randomFlicker = Math.random() > 0.85 ? (Math.sin(Date.now() / 150 + segmentIndex * 10) * 0.2 + 0.8) : 1;
                
                // Color variation
                const colorVariation = segmentActive ? (Math.random() * 0.12 - 0.06) : 0;
                const adjustedColor = segmentActive 
                  ? toxicRed.replace('#', '').match(/.{2}/g)?.map((hex) => {
                      const val = parseInt(hex, 16);
                      const adjusted = Math.max(0, Math.min(255, val + (colorVariation * 255)));
                      return Math.floor(adjusted).toString(16).padStart(2, '0');
                    }).join('') || toxicRed
                  : toxicRed;
                
                const barRotation = (Math.random() * 0.5 - 0.25) + (segmentIndex % 2 === 0 ? 0.3 : -0.3);
                const brightnessVariation = 0.95 + Math.random() * 0.1;
                const hasChippedEdge = Math.random() > 0.7;
                const finalOpacity = flickerOpacity * randomFlicker * brightnessVariation;
                
                return (
                  <div
                    key={`${level}-${segmentIndex}`}
                    style={{
                      width: '100%',
                      flex: 1,
                      minHeight: '10px',
                      background: segmentActive
                        ? `linear-gradient(to top, #${adjustedColor}ff, #${adjustedColor}aa, ${toxicDark}88)`
                        : '#0a0a0a',
                      borderRadius: hasChippedEdge ? '2px 3px 2px 3px' : '3px',
                      boxShadow: segmentActive
                        ? isLevel5
                          ? `0 0 20px ${toxicRed}ff, 0 0 40px ${toxicRed}dd, 0 0 60px ${toxicRed}aa, 0 0 90px ${toxicRed}88, inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.5)`
                          : `0 0 10px ${activeColor}ff, 0 0 20px ${activeColor}dd, 0 0 30px ${activeColor}aa, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.5)`
                        : 'inset 0 1px 2px rgba(0,0,0,0.95)',
                      opacity: finalOpacity,
                      transition: isLevel5 ? 'opacity 0.05s, filter 0.05s' : 'opacity 0.1s, filter 0.1s',
                      position: 'relative',
                      border: segmentActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.7)',
                      filter: segmentActive 
                        ? isLevel5 
                          ? `blur(0.3px) brightness(${shimmer * pulse * brightnessVariation}) contrast(1.2)`
                          : `blur(0.2px) brightness(${shimmer * brightnessVariation})`
                        : 'none',
                      transform: `rotate(${barRotation}deg)`,
                    }}
                  >
                    {/* Light bleed */}
                    {segmentActive && !isLevel5 && (
                      <div style={{
                        position: 'absolute',
                        left: '-3px',
                        right: '-3px',
                        top: '20%',
                        bottom: '20%',
                        background: `linear-gradient(90deg, transparent, ${color}33, ${color}44, ${color}33, transparent)`,
                        filter: 'blur(3px)',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }} />
                    )}
                    
                    {/* Level 5 red bleed */}
                    {segmentActive && isLevel5 && (
                      <div style={{
                        position: 'absolute',
                        left: '-5px',
                        right: '-5px',
                        top: '10%',
                        bottom: '10%',
                        background: `linear-gradient(90deg, transparent, ${toxicRed}55, ${toxicRed}88, ${toxicRed}55, transparent)`,
                        filter: 'blur(5px)',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }} />
                    )}
                    
                    {/* Film grain */}
                    {segmentActive && (
                      <>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${filmgrain})`,
                          backgroundSize: '200% 200%',
                          backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`,
                          mixBlendMode: 'screen',
                          opacity: isLevel5 ? 0.25 : (0.15 + Math.random() * 0.1),
                          pointerEvents: 'none',
                          animation: 'grain 0.3s steps(1) infinite',
                        }} />
                        
                        {/* CRT shimmer */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                          opacity: 0.3 + Math.sin(Date.now() / 300 + segmentIndex) * 0.1,
                          pointerEvents: 'none',
                        }} />
                        
                        {/* Level 5 heat distortion */}
                        {isLevel5 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%)',
                            opacity: 0.4 + Math.sin(Date.now() / 150) * 0.2,
                            filter: 'blur(1px)',
                            pointerEvents: 'none',
                          }} />
                        )}
                      </>
                    )}
                    
                    {/* Dust overlay */}
                    {segmentActive && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dust})`,
                        backgroundSize: 'cover',
                        mixBlendMode: 'multiply',
                        opacity: 0.2 + Math.random() * 0.1,
                        pointerEvents: 'none',
                      }} />
                    )}
                    
                    {/* LED separator */}
                    {segmentIndex < segmentsPerColumn - 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-1.5px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'rgba(0,0,0,0.8)',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      {/* Ambient glow beneath bezel */}
      {emfLevel > 0 && (
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '32px',
          borderRadius: '8px',
          background: emfLevel >= 5 
            ? `radial-gradient(ellipse at center, rgba(255,0,0,0.15) 0%, rgba(255,136,0,0.1) 30%, transparent 70%)`
            : emfLevel >= 3
            ? `radial-gradient(ellipse at center, rgba(255,255,0,0.12) 0%, rgba(255,136,0,0.08) 30%, transparent 70%)`
            : `radial-gradient(ellipse at center, rgba(0,255,85,0.1) 0%, rgba(0,255,85,0.06) 30%, transparent 70%)`,
          boxShadow: emfLevel >= 5
            ? '0 0 20px rgba(255,0,0,0.3), 0 0 40px rgba(255,136,0,0.2)'
            : emfLevel >= 3
            ? '0 0 18px rgba(255,255,0,0.25), 0 0 35px rgba(255,136,0,0.15)'
            : '0 0 15px rgba(0,255,85,0.2), 0 0 30px rgba(0,255,85,0.12)',
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'screen',
        }} />
      )}
      
      {/* Glow reflection off metal frame */}
      {emfLevel > 0 && (
        <div style={{
          position: 'absolute',
          top: '-32px',
          left: '-32px',
          right: '-32px',
          bottom: '-32px',
          borderRadius: '12px',
          background: emfLevel >= 4
            ? 'radial-gradient(ellipse at center, transparent 60%, rgba(255,136,0,0.08) 80%, rgba(255,136,0,0.04) 100%)'
            : 'radial-gradient(ellipse at center, transparent 60%, rgba(0,255,85,0.06) 80%, rgba(0,255,85,0.03) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(15px)',
        }} />
      )}
      
        {/* Level labels */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '48px',
          fontFamily: '"Courier New", monospace',
          fontSize: '11px',
          color: 'rgba(150,150,150,0.4)',
          zIndex: 22,
        }}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span style={{ color: emfLevel >= 5 ? '#ff0000' : 'rgba(150,150,150,0.4)' }}>5</span>
        </div>
      </div>
    </>
  );
};

export const LEDDisplay = memo(LEDDisplayComponent);
