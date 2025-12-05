import React from 'react';
import dust from '../../../assets/texture/dust.png';

interface StorefrontSignProps {
  storeName: string;
  establishedDate: string;
}

export const StorefrontSign: React.FC<StorefrontSignProps> = ({ 
  storeName, 
  establishedDate 
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'min(15%, 80px)',
        left: '50%',
        transform: 'translateX(-50%) rotate(-1deg)',
        background: '#1a0f0a',
        padding: 'min(16px, 4vw) min(32px, 8vw)',
        borderRadius: '8px',
        border: 'min(3px, 1vw) solid #8b7355',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
        zIndex: 10,
        position: 'relative',
        maxWidth: '90vw',
      }}
    >
      {/* Dust overlay on sign for analog horror */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          borderRadius: '8px',
          pointerEvents: 'none',
        }}
      />
      
      {/* Main store name */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: 'clamp(20px, 4vw, 24px)',
          color: '#d8d4c8',
          textAlign: 'center',
          letterSpacing: '2px',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 1,
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {storeName}
      </div>
      
      {/* Established date */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          color: '#8b7355',
          textAlign: 'center',
          marginTop: '8px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {establishedDate}
      </div>
    </div>
  );
};

