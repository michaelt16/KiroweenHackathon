// Manual rotation controls for when compass is unavailable
import { useState } from 'react';

interface ManualRotationControlsProps {
  onRotate: (delta: number) => void;
  currentHeading: number;
}

export function ManualRotationControls({ onRotate, currentHeading }: ManualRotationControlsProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '20px',
          padding: '12px',
          backgroundColor: 'rgba(71, 85, 105, 0.9)',
          border: '2px solid rgba(148, 163, 184, 0.5)',
          borderRadius: '50%',
          color: '#e2e8f0',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        🧭
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 100,
      }}
    >
      {/* Heading Display */}
      <div
        style={{
          backgroundColor: 'rgba(11, 15, 26, 0.95)',
          border: '2px solid rgba(148, 163, 184, 0.5)',
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Manual Heading:</span>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#64748b', fontFamily: 'monospace' }}>
          {Math.round(currentHeading)}°
        </span>
      </div>

      {/* Rotation Controls */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {/* Rotate Left */}
        <button
          onClick={() => onRotate(-15)}
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(71, 85, 105, 0.9)',
            border: '2px solid rgba(148, 163, 184, 0.5)',
            borderRadius: '50%',
            color: '#e2e8f0',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s',
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ↶
        </button>

        {/* Center Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>
            Rotate
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            ±15°
          </div>
        </div>

        {/* Rotate Right */}
        <button
          onClick={() => onRotate(15)}
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(71, 85, 105, 0.9)',
            border: '2px solid rgba(148, 163, 184, 0.5)',
            borderRadius: '50%',
            color: '#e2e8f0',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s',
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ↷
        </button>
      </div>

      {/* Hide Button */}
      <button
        onClick={() => setIsVisible(false)}
        style={{
          padding: '6px 12px',
          backgroundColor: 'rgba(71, 85, 105, 0.7)',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '10px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Hide
      </button>
    </div>
  );
}
