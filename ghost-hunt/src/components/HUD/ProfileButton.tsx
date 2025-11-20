// Profile button component (bottom-left)
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
        gap: '4px',
      }}
    >
      {/* Avatar */}
      <button
        onClick={onOpenProfile}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hud-button"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#6b46c1',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}
      >
        👤
      </button>

      {/* XP Bar */}
      <div
        style={{
          width: '60px',
          height: '4px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            width: '30%', // Mock XP progress
            height: '100%',
            backgroundColor: '#4ade80',
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  );
}
