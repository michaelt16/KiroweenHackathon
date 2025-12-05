import React from 'react';

export const ClosedStamp: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(12deg)',
        padding: 'min(16px, 4vw) min(32px, 8vw)',
        border: 'min(4px, 1.5vw) solid #8b0000',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
        opacity: 0.9,
        zIndex: 1000,
        maxWidth: '85vw',
      }}
    >
      {/* CLOSED text */}
      <div
        style={{
          fontFamily: 'Impact, "Arial Black", sans-serif',
          fontSize: 'clamp(28px, 7vw, 48px)',
          color: '#8b0000',
          letterSpacing: 'clamp(2px, 1vw, 4px)',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: 1.1,
        }}
      >
        CLOSED
      </div>
      
      {/* Coming Soon subtitle */}
      <div
        style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 'clamp(16px, 3.5vw, 24px)',
          color: '#4a0000',
          textAlign: 'center',
          marginTop: 'min(6px, 1.5vw)',
        }}
      >
        Coming Soon
      </div>
    </div>
  );
};

