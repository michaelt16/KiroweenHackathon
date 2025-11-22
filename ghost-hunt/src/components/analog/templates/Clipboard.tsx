import React from 'react';

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
        background: 'linear-gradient(135deg, #2a2520 0%, #3a3530 50%, #2a2520 100%)',
        padding: '80px 30px 40px 30px',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.6)',
      }}>
        {/* Metal clip */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '50px',
          background: 'linear-gradient(180deg, #888 0%, #666 50%, #444 100%)',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 4px 8px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2)',
          zIndex: 2,
        }}>
          {/* Clip spring mechanism */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(-8px)',
            width: '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(8px)',
            width: '80px',
            height: '3px',
            background: '#333',
            borderRadius: '2px',
          }} />
          
          {/* Clip shine */}
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '10px',
            right: '10px',
            height: '15px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
            borderRadius: '4px 4px 0 0',
          }} />
        </div>

        {/* Paper content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
