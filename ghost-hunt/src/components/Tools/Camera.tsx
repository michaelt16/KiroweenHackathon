// Camera tool - Flash photography with film consumption
import { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export function Camera() {
  const { suppliesForRun, takePhoto } = useInvestigation();
  const [isFlashing, setIsFlashing] = useState(false);
  const [showNoFilmWarning, setShowNoFilmWarning] = useState(false);

  const handleShutterClick = () => {
    const success = takePhoto();
    
    if (success) {
      // Flash effect
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);
    } else {
      // Show "no film" warning
      setShowNoFilmWarning(true);
      setTimeout(() => setShowNoFilmWarning(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Flash overlay */}
      {isFlashing && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            opacity: 0.9,
            animation: 'flash 0.2s ease-out',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Camera viewfinder overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '8px',
          pointerEvents: 'none',
        }}
      >
        {/* Crosshair */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            border: '2px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '50%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(0, 255, 255, 0.5)',
              transform: 'translateY(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 255, 0.5)',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>

      {/* Film count display */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '8px',
          color: suppliesForRun.film > 0 ? '#00ffff' : '#ff4444',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        🎞️ {suppliesForRun.film}
      </div>

      {/* No film warning */}
      {showNoFilmWarning && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '16px 24px',
            backgroundColor: 'rgba(255, 68, 68, 0.9)',
            border: '2px solid #ff4444',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: 'pulse 0.5s ease-in-out',
          }}
        >
          NO FILM LEFT<br />
          <span style={{ fontSize: '12px', opacity: 0.8 }}>
            Collect more supplies
          </span>
        </div>
      )}

      {/* Shutter button */}
      <button
        onClick={handleShutterClick}
        disabled={suppliesForRun.film === 0}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px solid rgba(0, 255, 255, 0.5)',
          backgroundColor: suppliesForRun.film > 0 ? 'rgba(0, 255, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)',
          cursor: suppliesForRun.film > 0 ? 'pointer' : 'not-allowed',
          pointerEvents: 'auto',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          opacity: suppliesForRun.film > 0 ? 1 : 0.5,
        }}
        onMouseDown={(e) => {
          if (suppliesForRun.film > 0) {
            e.currentTarget.style.transform = 'translateX(-50%) scale(0.9)';
          }
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
        }}
      >
        📸
      </button>

      <style>
        {`
          @keyframes flash {
            0% { opacity: 0.9; }
            100% { opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
          }
        `}
      </style>
    </div>
  );
}
