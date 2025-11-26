// PhysicalToolDevice - Miniature physical device renders for inventory
// Replaces emoji icons with realistic equipment miniatures

import React from 'react';
import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import rust from '../../assets/texture/brownrust.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import smoothPlastic from '../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../assets/texture/scratchedplasticdark.png';
import { ToolIcon } from './ToolIcon';

export interface PhysicalToolDeviceProps {
  toolType: 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';
  size: number; // 60-80px
  onClick: () => void;
}

export function PhysicalToolDevice({ toolType, size, onClick }: PhysicalToolDeviceProps) {
  const isMobile = size <= 60;
  
  // Determine material type based on tool
  const material = ['radar', 'emf', 'audio'].includes(toolType) ? 'metal' : 'plastic';
  
  // LED status (all ready for MVP)
  const ledStatus = 'ready';
  const ledColor = ledStatus === 'ready' ? '#00ff55' : ledStatus === 'low' ? '#ffaa00' : '#ff0000';
  
  // Tool names for tape labels
  const toolNames: Record<typeof toolType, string> = {
    radar: 'RADAR',
    emf: 'EMF',
    thermal: 'THERMAL',
    audio: 'AUDIO',
    camera: 'CAMERA',
  };
  
  // Base container style
  const containerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  };
  
  // Material-specific casing
  const casingStyle: React.CSSProperties = material === 'metal' 
    ? {
        // Metal tools (Radar, EMF, Audio) - Heavy steel gradient
        background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
        boxShadow: 
          'inset 0 4px 8px rgba(255,255,255,0.06), ' +
          'inset 0 -8px 16px rgba(0,0,0,0.98), ' +
          'inset 3px 0 6px rgba(0,0,0,0.9), ' +
          'inset -3px 0 6px rgba(0,0,0,0.9), ' +
          '0 4px 12px rgba(0,0,0,0.85)',
      }
    : {
        // Plastic tools (Thermal, Camera) - Black rubberized plastic
        background: `
          url(${smoothPlastic}),
          linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
        `,
        backgroundSize: `${size * 3}px ${size * 3}px, cover`,
        backgroundRepeat: 'repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal',
        boxShadow: 
          'inset 0 3px 6px rgba(255,255,255,0.04), ' +
          'inset 0 -8px 14px rgba(0,0,0,0.9), ' +
          'inset 4px 0 8px rgba(0,0,0,0.9), ' +
          'inset -4px 0 8px rgba(0,0,0,0.9), ' +
          '0 4px 12px rgba(0,0,0,0.85)',
      };
  
  return (
    <div 
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Main device casing */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: toolType === 'radar' ? '50%' : '6px',
          ...casingStyle,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Texture Layers */}
        {material === 'metal' ? (
          <>
            {/* Metal texture overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${metalTexture})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
              pointerEvents: 'none',
              zIndex: 2,
            }} />
            
            {/* Rust overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${rust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
              zIndex: 3,
            }} />
            
            {/* Dust layer */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.3,
              pointerEvents: 'none',
              zIndex: 4,
            }} />
          </>
        ) : (
          <>
            {/* Scratched plastic overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
              pointerEvents: 'none',
              zIndex: 2,
            }} />
            
            {/* Dust layer */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.08,
              pointerEvents: 'none',
              zIndex: 3,
            }} />
          </>
        )}
        
        {/* Fingerprint smudges (2-3 per device) */}
        {[
          { top: '25%', left: '15%', size: isMobile ? '12px' : '15px' },
          { bottom: '30%', right: '20%', size: isMobile ? '10px' : '12px' },
        ].map((smudge, i) => (
          <div
            key={`smudge-${i}`}
            style={{
              position: 'absolute',
              ...(smudge.top ? { top: smudge.top } : {}),
              ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
              ...(smudge.left ? { left: smudge.left } : {}),
              ...(smudge.right ? { right: smudge.right } : {}),
              width: smudge.size,
              height: smudge.size,
              background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(2px)',
              opacity: 0.3,
              pointerEvents: 'none',
              zIndex: 8,
            }}
          />
        ))}
        
        {/* Device icon (centered, using CSS art from ToolIcon) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 11,
        }}>
          <ToolIcon toolType={toolType} size={isMobile ? 32 : 40} />
        </div>
        
        {/* LED status indicator (6px circle, top-right) */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '6px' : '8px',
          right: isMobile ? '6px' : '8px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: ledColor,
          boxShadow: `0 0 8px ${ledColor}, 0 0 12px ${ledColor}`,
          zIndex: 21,
        }} />
        
        {/* Corner screws (4 per device, 4px diameter) */}
        {[
          { top: isMobile ? '4px' : '5px', left: isMobile ? '4px' : '5px' },
          { top: isMobile ? '4px' : '5px', right: isMobile ? '4px' : '5px' },
          { bottom: isMobile ? '4px' : '5px', left: isMobile ? '4px' : '5px' },
          { bottom: isMobile ? '4px' : '5px', right: isMobile ? '4px' : '5px' },
        ].map((screw, i) => (
          <div
            key={`screw-${i}`}
            style={{
              position: 'absolute',
              ...screw,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
              boxShadow: 
                'inset 0 1px 2px rgba(255,255,255,0.3), ' +
                'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                '0 1px 2px rgba(0,0,0,0.8)',
              border: '0.5px solid rgba(0,0,0,0.7)',
              zIndex: 10,
            }}
          >
            {/* Screw slot */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '2px',
              height: '0.5px',
              background: '#0a0a0a',
            }} />
          </div>
        ))}
      </div>
      
      {/* Tape label with handwritten text (Caveat font) - BIGGER */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '-10px' : '-12px',
        left: '50%',
        transform: `translateX(-50%) rotate(${
          // Deterministic rotation based on toolType to prevent flickering
          toolType === 'radar' ? -5 :
          toolType === 'emf' ? 3 :
          toolType === 'thermal' ? -7 :
          toolType === 'audio' ? 6 :
          -4 // camera
        }deg)`,
        width: isMobile ? '50px' : '60px',
        height: isMobile ? '14px' : '16px',
        backgroundImage: `url(${tape})`,
        backgroundSize: 'cover',
        opacity: 0.8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 12,
      }}>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: isMobile ? '9px' : '10px',
          color: 'rgba(0,0,0,0.7)',
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '0.3px',
        }}>
          {toolNames[toolType]}
        </div>
      </div>
      
      {/* Drop shadow for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.85)',
        borderRadius: toolType === 'radar' ? '50%' : '6px',
        pointerEvents: 'none',
        zIndex: -1,
      }} />
    </div>
  );
}
