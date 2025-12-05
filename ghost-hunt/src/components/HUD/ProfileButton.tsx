// Profile button component - Mini ID Card Icon (Analog Horror)
import { useState, useEffect } from 'react';
import pfp from '../../assets/images/agent/pfp.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';
import { playButtonClick } from '../../utils/soundEffects';

interface ProfileButtonProps {
  onOpenProfile: () => void;
}

export function ProfileButton({ onOpenProfile }: ProfileButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [agentPhoto, setAgentPhoto] = useState(pfp);
  const level = 1; // TODO: Get from game state

  useEffect(() => {
    const updatePhoto = () => {
      const savedPhoto = localStorage.getItem('agentPhoto');
      if (savedPhoto) {
        setAgentPhoto(savedPhoto);
      }
    };
    
    // Initial load
    updatePhoto();
    
    // Listen for storage changes
    window.addEventListener('storage', updatePhoto);
    
    // Listen for custom event (for same-window updates)
    window.addEventListener('agentPhotoUpdated', updatePhoto);
    
    return () => {
      window.removeEventListener('storage', updatePhoto);
      window.removeEventListener('agentPhotoUpdated', updatePhoto);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'auto',
      }}
    >
      {/* Mini ID Card - Clickable */}
      <button
        onClick={() => {
          playButtonClick();
          onOpenProfile();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        style={{
          position: 'relative',
          width: '72px',
          height: '88px',
          background: '#d8d4c8', // Aged paper
          border: '2px solid #1a0f0a',
          borderRadius: '4px',
          padding: '4px',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none',
          transform: (isHovered || isPressed) ? 'scale(1.15) rotate(0.3deg)' : 'rotate(-0.3deg)',
          transition: 'transform 0.2s ease',
          boxShadow: (isHovered || isPressed)
            ? '0 6px 20px rgba(0, 0, 0, 0.8), 0 3px 12px rgba(0, 0, 0, 0.6)'
            : '0 6px 20px rgba(0, 0, 0, 0.7), 0 3px 12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          zIndex: (isHovered || isPressed) ? 100 : 1,
        }}
        title="Profile"
      >
        {/* Aged paper texture overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Header stripe */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '16px',
          background: 'linear-gradient(135deg, #8b0000 0%, #4a0000 100%)',
          borderRadius: '2px 2px 0 0',
          zIndex: 2,
        }}>
          <div style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '6px',
            color: '#f4f0e6',
            textAlign: 'center',
            paddingTop: '4px',
            letterSpacing: '0.5px',
            lineHeight: 1,
          }}>
            AGENT
          </div>
        </div>

        {/* Photo */}
        <div style={{
          marginTop: '18px',
          width: '100%',
          height: '42px',
          border: '1px solid #1a0f0a',
          background: '#1a1a1a',
          overflow: 'hidden',
          borderRadius: '2px',
          position: 'relative',
          zIndex: 2,
        }}>
          <img 
            src={agentPhoto}
            alt="Agent"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Level badge */}
        <div style={{
          marginTop: '4px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: '1px solid #92400e',
          borderRadius: '2px',
          padding: '2px 4px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '8px',
            color: '#1a0f0a',
            fontWeight: 'bold',
            lineHeight: 1,
          }}>
            L{level}
          </div>
        </div>

        {/* ID number */}
        <div style={{
          marginTop: '2px',
          fontFamily: '"Courier New", monospace',
          fontSize: '6px',
          color: '#1a0f0a',
          textAlign: 'center',
          lineHeight: 1,
          position: 'relative',
          zIndex: 2,
        }}>
          PI-0001
        </div>
      </button>

      {/* XP Bar - Status Indicator (Analog Style) */}
      <div
        style={{
          width: '76px',
          height: '4px',
          backgroundColor: '#1a0f0a',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.8)',
          border: '1px solid #2a2520',
        }}
      >
        <div
          style={{
            width: '30%', // Mock XP progress
            height: '100%',
            background: '#1a0f0a',
            boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.5)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
