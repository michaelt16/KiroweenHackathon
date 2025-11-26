import React from 'react';

// Texture imports
import metalTexture from '../../../../../assets/texture/metalscratchedtexture.png';
import rust from '../../../../../assets/texture/brownrust.png';
import dust from '../../../../../assets/texture/dust.png';
import plasticDark from '../../../../../assets/texture/scratchedplasticdark.png';

interface MetalCasingProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * MetalCasing - Heavy industrial steel casing for metal tools (Radar, EMF, Spirit Box)
 * 
 * Features:
 * - Heavy steel gradient background
 * - 4 texture layers (metal, rust, dust, plastic dark)
 * - Deep inset shadows for recessed device body
 * - Beveled edges (8-12px deep)
 * 
 * Usage:
 * <MetalCasing>
 *   {tool content}
 * </MetalCasing>
 */
export const MetalCasing: React.FC<MetalCasingProps> = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`metal-casing ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        
        // HEAVY INDUSTRIAL STEEL GRADIENT (EXACT - Match Radar/EMF)
        background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
        
        // Heavy inset shadows for recessed device body
        boxShadow: 
          'inset 0 6px 12px rgba(255,255,255,0.06), ' +   // Top highlight (subtle)
          'inset 0 -12px 24px rgba(0,0,0,0.98), ' +       // Bottom shadow (DEEP)
          'inset 4px 0 8px rgba(0,0,0,0.9), ' +          // Left shadow
          'inset -4px 0 8px rgba(0,0,0,0.9)',            // Right shadow
        
        ...style,
      }}
    >
      {/* Metal Texture Overlay (PRIMARY - Always present) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${metalTexture})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.6,  // EXACT: 0.6 for metal tools
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Rust/Wear Overlay (SECONDARY - Heavy industrial wear) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${rust})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.4,  // EXACT: 0.4 for rust layer
        pointerEvents: 'none',
        zIndex: 3,
      }} />
      
      {/* Dust/Grime Layer (TERTIARY - Environmental buildup) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${dust})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.3,  // EXACT: 0.3 for dust layer
        pointerEvents: 'none',
        zIndex: 4,
      }} />
      
      {/* Additional Plastic/Dark Texture (For tools like EMF) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${plasticDark})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.25,  // Additional layer
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      
      {/* Top bevel (8-12px deep for machined metal finish) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '12px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 6,
      }} />
      
      {/* Bottom bevel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '12px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 6,
      }} />
      
      {/* Left bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '12px',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 6,
      }} />
      
      {/* Right bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '12px',
        background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 6,
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 7,
        width: '100%',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  );
};
