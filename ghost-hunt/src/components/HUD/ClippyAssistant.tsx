// Clippy-like ghost assistant (bottom-right)
import { useState } from 'react';

export function ClippyAssistant() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log('👻 Clippy assistant clicked');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            backgroundColor: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            maxWidth: '200px',
            animation: 'fadeIn 0.2s',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
            I'll help you investigate soon! 👻
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '20px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid white',
            }}
          />
        </div>
      )}

      {/* Assistant button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hud-button"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#ec4899',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1) rotate(10deg)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}
      >
        👻
      </button>
    </div>
  );
}
