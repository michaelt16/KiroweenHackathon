import React from 'react';
import woodtexture from '../../../assets/texture/woodtexture.png';

interface ClipboardProps {
  children: React.ReactNode;
}

/**
 * Clipboard Template - Professional clipboard with metal clip
 * Purpose: Official documents, ID cards, forms
 * 
 * Composition:
 * - Dark clipboard backing
 * - Metal clip at top
 * - Paper clipped underneath
 */
export function Clipboard({ children }: ClipboardProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      {/* Clipboard backing */}
      <div style={{
        position: 'relative',
        background: '#4a3a28', // Lighter base wood color to show texture better
        padding: isMobile ? '70px 16px 24px 16px' : '80px 30px 40px 30px',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}>
        {/* Wood texture overlay - More visible */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${woodtexture})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'overlay',
          opacity: 0.9,
          pointerEvents: 'none',
        }} />
        {/* Additional wood texture layer for more visibility */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${woodtexture})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'soft-light',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
        {/* Subtle darkening overlay to maintain contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(42, 37, 32, 0.15) 0%, rgba(58, 47, 32, 0.1) 50%, rgba(42, 37, 32, 0.15) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Metal clip - More metallic */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '15px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '100px' : '120px',
          height: isMobile ? '45px' : '50px',
          background: 'linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 20%, #707070 50%, #505050 80%, #404040 100%)',
          borderRadius: '8px 8px 0 0',
          boxShadow: 
            '0 4px 12px rgba(0,0,0,0.8), ' +
            'inset 0 1px 0 rgba(255,255,255,0.4), ' +
            'inset 0 -1px 0 rgba(0,0,0,0.3), ' +
            '0 0 0 1px rgba(0,0,0,0.2)',
          zIndex: 2,
          border: '1px solid rgba(0,0,0,0.3)',
        }}>
          {/* Clip spring mechanism */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '70px' : '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(-8px)',
            width: isMobile ? '70px' : '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(8px)',
            width: isMobile ? '70px' : '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          
          {/* Clip shine - More metallic highlight */}
          <div style={{
            position: 'absolute',
            top: '3px',
            left: '8px',
            right: '8px',
            height: '18px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            borderRadius: '4px 4px 0 0',
          }} />
          {/* Metallic edge highlight */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '8px',
            right: '8px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }} />
        </div>

        {/* Paper content - Slightly crooked */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1,
          transform: 'rotate(0.8deg)',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
