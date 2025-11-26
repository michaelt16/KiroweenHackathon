import React from 'react';
import metalTexture from '../../../../../assets/texture/metalscratchedtexture.png';
import rust from '../../../../../assets/texture/brownrust.png';
import dust from '../../../../../assets/texture/dust.png';
import tape from '../../../../../assets/texture/tape.png';

interface BezelRingProps {
  offset: number; // 28-35px
  shape: 'circle' | 'rectangle';
  borderRadius?: string;
  children?: React.ReactNode;
}

/**
 * BezelRing - Thick metallic bezel for displays
 * 
 * Features:
 * - Raised above display (negative offset)
 * - Metal texture + rust + dust overlays
 * - Screws at cardinal points
 * - Deep shadow onto display below
 * - Damage elements (scratches, tape, fingerprints)
 * 
 * Usage:
 * <BezelRing offset={28} shape="circle">
 *   <DisplayContent />
 * </BezelRing>
 */
export const BezelRing: React.FC<BezelRingProps> = ({
  offset,
  shape,
  borderRadius = shape === 'circle' ? '50%' : '12px',
  children,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* THICK Metallic Bezel Ring - Raised Above Display */}
      <div style={{
        position: 'absolute',
        top: `-${offset}px`,
        left: `-${offset}px`,
        right: `-${offset}px`,
        bottom: `-${offset}px`,
        borderRadius,
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
        {/* Rust overlay on bezel */}
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
        
        {/* Dust on bezel */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '60px',
          height: '60px',
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        
        {/* Brushed metal highlight */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          right: '10%',
          height: '30%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          borderRadius: '50%',
          transform: 'rotate(-45deg)',
          pointerEvents: 'none',
        }} />
        
        {/* Screws at cardinal points */}
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
      </div>
      
      {/* DEEP Shadow beneath bezel for depth */}
      <div style={{
        position: 'absolute',
        top: `${offset + 4}px`,
        left: `${offset + 4}px`,
        right: `${offset + 4}px`,
        bottom: `${offset + 4}px`,
        borderRadius,
        boxShadow: 
          'inset 0 0 60px rgba(0,0,0,0.99), ' +
          'inset 0 0 100px rgba(0,0,0,0.98), ' +
          'inset 0 0 140px rgba(0,0,0,0.96), ' +
          'inset 0 0 180px rgba(0,0,0,0.94)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      
      {/* Content (display) */}
      <div style={{ position: 'relative', zIndex: 11 }}>
        {children}
      </div>
    </div>
  );
};
