// Profile button component - Game-like Big Button
import { useState } from 'react';

interface ProfileButtonProps {
  onOpenProfile: () => void;
}

export function ProfileButton({ onOpenProfile }: ProfileButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'auto',
        marginBottom: '8px', // Slightly elevated
      }}
    >
      {/* Avatar - Big Game Button */}
      <button
        onClick={onOpenProfile}
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
        title="Profile"
      >
        👤
      </button>

      {/* XP Bar - Status Indicator */}
      <div
        style={{
          width: '68px',
          height: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(45, 212, 191, 0.2)',
        }}
      >
        <div
          style={{
            width: '30%', // Mock XP progress
            height: '100%',
            background: 'linear-gradient(90deg, rgba(45, 212, 191, 1) 0%, rgba(94, 234, 212, 0.8) 100%)',
            boxShadow: '0 0 6px rgba(45, 212, 191, 0.6)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
