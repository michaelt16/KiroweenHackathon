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
      {/* Directional brushed-metal texture (linear scratches) - z-index 2 - ENHANCED */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 10px)',
        backgroundSize: '20px 20px',
        mixBlendMode: 'overlay',
        opacity: 0.8,
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      {/* Additional metallic highlight streaks for more visible glare */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(135deg, transparent 0px, rgba(255,255,255,0.08) 0.5px, transparent 1px, transparent 15px)',
        backgroundSize: '25px 25px',
        mixBlendMode: 'screen',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Metal Texture Overlay (PRIMARY - Always present) - z-index 2 */}
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
      
      {/* Uneven lighting - Hotspot top-left, falloff bottom-right - z-index 3 - ENHANCED GLARE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.06) 30%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />
      {/* Additional bright highlight for stronger glare */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 12% 12%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 10%, transparent 40%)',
        pointerEvents: 'none',
        zIndex: 3,
        mixBlendMode: 'screen',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 85% 85%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.15) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />
      
      {/* Rust/Wear Overlay (SECONDARY - Heavy industrial wear) - z-index 3 */}
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
      
      {/* Dust/Grime Layer (TERTIARY - Environmental buildup) - z-index 4 */}
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
      
      {/* Additional Plastic/Dark Texture (For tools like EMF) - z-index 5 */}
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
      
      {/* Additional plastic dark texture layer (match mock) - z-index 6 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${plasticDark})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 6,
      }} />
      
      {/* Device Architecture: Top Section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '10%',
        background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
        borderBottom: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />
      
      {/* Device Architecture: Middle Section (LED area) */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: 0,
        right: 0,
        bottom: '25%',
        background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
        zIndex: 1,
      }} />
      
      {/* Device Architecture: Bottom Section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '25%',
        background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
        borderTop: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />
      
      {/* Top bevel (8-12px deep for machined metal finish) - z-index 2 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '12px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Bottom bevel - z-index 2 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '12px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Left bevel - z-index 2 */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '12px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Right bevel - z-index 2 */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '12px',
        background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  );
};
