// Clippy-like ghost assistant - Equipment Status Indicator
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
        pointerEvents: 'auto',
        marginBottom: '8px', // Slightly elevated
      }}
    >
      {/* Tooltip - Equipment Status Display */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '70px',
            right: '0',
            backgroundColor: 'rgba(10, 15, 26, 0.98)',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(45, 212, 191, 0.3)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(45, 212, 191, 0.2)',
            maxWidth: '180px',
            animation: 'fadeIn 0.2s',
            fontFamily: 'Courier New, monospace',
          }}
        >
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            color: 'rgba(45, 212, 191, 0.9)',
            textShadow: '0 0 8px rgba(45, 212, 191, 0.3)',
            letterSpacing: '0.5px',
          }}>
            ASSISTANT READY
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '16px',
              width: '0',
              height: '0',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(10, 15, 26, 0.98)',
            }}
          />
        </div>
      )}

      {/* Assistant button - Game-like Big Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hud-button"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '14px',
          backgroundColor: isHovered 
            ? 'rgba(45, 212, 191, 0.15)' 
            : 'rgba(15, 23, 42, 0.95)',
          border: `2px solid ${isHovered ? 'rgba(45, 212, 191, 0.5)' : 'rgba(45, 212, 191, 0.3)'}`,
          boxShadow: 
            isHovered
              ? '0 0 20px rgba(45, 212, 191, 0.5), 0 4px 16px rgba(0, 0, 0, 0.6), inset 0 0 12px rgba(45, 212, 191, 0.15)'
              : '0 6px 20px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(45, 212, 191, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          fontSize: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          transition: 'all 0.2s ease',
          color: isHovered ? 'rgba(45, 212, 191, 1)' : 'rgba(45, 212, 191, 0.8)',
          filter: isHovered ? 'brightness(1.3)' : 'brightness(1)',
          textShadow: isHovered ? '0 0 12px rgba(45, 212, 191, 0.6)' : '0 0 8px rgba(45, 212, 191, 0.4)',
        }}
        title="Assistant"
      >
        👻
      </button>
    </div>
  );
}
