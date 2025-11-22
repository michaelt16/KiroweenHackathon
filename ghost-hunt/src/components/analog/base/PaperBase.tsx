import React from 'react';
import wrinkledpaper from '../../../assets/texture/wrinkledpaper.png';
import dust from '../../../assets/texture/dust.png';
import { getDamageVariant } from '../utils/randomization';

interface PaperBaseProps {
  children: React.ReactNode;
  variant?: 'aged' | 'clean' | 'damaged';
  seed?: string | number;
}

export function PaperBase({ children, variant = 'aged', seed = Date.now() }: PaperBaseProps) {
  const colors = {
    aged: '#d8d4c8',
    clean: '#f4f0e6',
    damaged: '#c4b49a',
  };

  const rotations = [0.3, 0.5, 0.8, 1.2, 1.5, 1.8];
  const rotation = rotations[getDamageVariant(seed, rotations.length)];

  const wrinkleOpacity = {
    aged: 0.6,
    clean: 0.4,
    damaged: 0.8,
  };

  const dustOpacity = {
    aged: 0.35,
    clean: 0.2,
    damaged: 0.5,
  };

  return (
    <div style={{
      position: 'relative',
      background: colors[variant],
      padding: '50px',
      borderRadius: '4px',
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.6)',
    }}>
      {/* Wrinkled texture layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${wrinkledpaper})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: wrinkleOpacity[variant],
        pointerEvents: 'none',
        borderRadius: '4px',
      }} />

      {/* Dust overlay layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${dust})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: dustOpacity[variant],
        pointerEvents: 'none',
        borderRadius: '4px',
      }} />

      {/* Edge darkening */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.15) 100%)',
        pointerEvents: 'none',
        borderRadius: '4px',
      }} />

      {/* Vertical fold crease */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.1) 80%, transparent 100%)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
