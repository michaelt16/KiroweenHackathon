import React from 'react';

interface BackpackButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const BackpackButton: React.FC<BackpackButtonProps> = ({ isOpen, onClick }) => {
  const handleClick = () => {
    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onClick();
  };

  return (
    <>
      <button
        className="backpack-button"
        onClick={handleClick}
        aria-label="Open backpack"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          padding: 0,
          overflow: 'hidden',
          boxShadow: isOpen
            ? '0 8px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
            : '0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)',
          transition: 'all 0.15s ease-out',
        }}
      >
        {/* Aged leather/canvas texture background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isOpen
              ? 'linear-gradient(135deg, #8b7355 0%, #6b5230 50%, #5a4228 100%)'
              : 'linear-gradient(135deg, #6b5230 0%, #5a4228 50%, #4a3218 100%)',
            backgroundSize: 'cover',
          }}
        />

        {/* Texture overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.4,
          }}
        />

        {/* Backpack icon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            filter: isOpen ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.3))',
            transition: 'filter 0.15s ease-out',
          }}
        >
          🎒
        </div>

        {/* Wear marks */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '12%',
            width: '15px',
            height: '2px',
            background: 'rgba(0,0,0,0.4)',
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }}
        />
      </button>

      <style>{`
        .backpack-button:active {
          transform: translateX(-50%) scale(0.95);
        }

        @keyframes pulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
          }
          50% {
            transform: translateX(-50%) scale(1.05);
          }
        }
      `}</style>
    </>
  );
};
