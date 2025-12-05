// Shared Tool Casing Component
// Base casing for metal and plastic tools with textures and bevels

import React from 'react';
import metalTexture from '../../../assets/texture/metalscratchedtexture.png';
import rust from '../../../assets/texture/brownrust.png';
import dust from '../../../assets/texture/dust.png';
import smoothPlastic from '../../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../../assets/texture/scratchedplasticdark.png';

interface ToolCasingProps {
  material: 'metal' | 'plastic';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function ToolCasing({ material, children, style }: ToolCasingProps) {
  const isMetal = material === 'metal';

  const casingStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...(isMetal ? {
      background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
      boxShadow: 
        'inset 0 6px 12px rgba(255,255,255,0.06), ' +
        'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
        'inset 4px 0 8px rgba(0,0,0,0.9), ' +
        'inset -4px 0 8px rgba(0,0,0,0.9)',
    } : {
      background: `
        url(${smoothPlastic}),
        linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
      `,
      backgroundSize: '300px 300px, cover',
      backgroundRepeat: 'repeat, no-repeat',
      backgroundBlendMode: 'overlay, normal',
      boxShadow: 
        'inset 0 4px 8px rgba(255,255,255,0.04), ' +
        'inset 0 -10px 18px rgba(0,0,0,0.9), ' +
        'inset 5px 0 10px rgba(0,0,0,0.9), ' +
        'inset -5px 0 10px rgba(0,0,0,0.9), ' +
        '0 20px 35px rgba(0,0,0,0.55), ' +
        '0 8px 15px rgba(0,0,0,0.35)',
    }),
    zIndex: 1,
    ...style,
  };

  return (
    <div style={casingStyle}>
      {/* Beveled edges */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: isMetal ? '8px' : '12px',
        background: isMetal 
          ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: isMetal ? '8px' : '12px',
        background: isMetal
          ? 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)'
          : 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: isMetal ? '8px' : '12px',
        background: isMetal
          ? 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 100%)'
          : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: isMetal ? '8px' : '12px',
        background: isMetal
          ? 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, transparent 100%)'
          : 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Texture overlays */}
      {isMetal ? (
        <>
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
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${smoothPlastic})`,
            backgroundSize: '250px 250px',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
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
            zIndex: 3,
          }} />
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
            zIndex: 4,
          }} />
        </>
      )}

      {/* Children (displays, screens, etc.) */}
      {children}
    </div>
  );
}







