import React from 'react';

// Texture imports
import smoothPlastic from '../../../../../assets/texture/smoothplastictexture.png';
import scratchedPlastic from '../../../../../assets/texture/scratchedplastic1.png';
import dust from '../../../../../assets/texture/dust.png';
import wrinkledPaper from '../../../../../assets/texture/wrinkledpaper.png';

interface PlasticCasingProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PlasticCasing - Black rubberized plastic casing for plastic tools (Thermal Scanner, Camera)
 * 
 * Features:
 * - Black rubberized plastic with texture
 * - 4 texture layers (smooth plastic, scratched plastic, dust, wrinkled)
 * - Inset shadows for plastic casing (slightly softer than metal)
 * - Drop shadows for depth
 * 
 * Usage:
 * <PlasticCasing>
 *   {tool content}
 * </PlasticCasing>
 */
export const PlasticCasing: React.FC<PlasticCasingProps> = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`plastic-casing ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        
        // Black rubberized plastic with texture
        background: `
          url(${smoothPlastic}),
          linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
        `,
        backgroundSize: '300px 300px, cover',
        backgroundRepeat: 'repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal',
        
        // Inset shadows for plastic casing (slightly softer than metal)
        boxShadow: 
          'inset 0 4px 8px rgba(255,255,255,0.04), ' +   // Top highlight (subtle)
          'inset 0 -10px 18px rgba(0,0,0,0.9), ' +       // Bottom shadow
          'inset 5px 0 10px rgba(0,0,0,0.9), ' +         // Left shadow
          'inset -5px 0 10px rgba(0,0,0,0.9), ' +        // Right shadow
          '0 20px 35px rgba(0,0,0,0.55), ' +             // Drop shadow
          '0 8px 15px rgba(0,0,0,0.35)',                 // Additional depth
        
        ...style,
      }}
    >
      {/* Scratched Plastic Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${scratchedPlastic})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Dust Layer */}
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
      
      {/* Wrinkled/Worn Texture */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${wrinkledPaper})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 4,
      }} />
      
      {/* Top bevel (8px for plastic) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      
      {/* Bottom bevel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      
      {/* Left bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '8px',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      
      {/* Right bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '8px',
        background: 'linear-gradient(270deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 6,
        width: '100%',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  );
};
