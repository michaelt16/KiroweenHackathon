import { useState, useEffect } from 'react';
import { musicManager, getMusicMuted, toggleMusicMute } from '../../utils/musicManager';

export function MusicToggleButton() {
  const [isMuted, setIsMuted] = useState(() => getMusicMuted());

  useEffect(() => {
    // Update state when mute state changes externally
    const checkMuteState = () => {
      const currentMuted = getMusicMuted();
      setIsMuted(currentMuted);
    };
    
    // Check periodically (in case it changes elsewhere)
    const interval = setInterval(checkMuteState, 200);
    
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newMutedState = toggleMusicMute();
    setIsMuted(newMutedState);
    
    console.log('🔊 Music mute toggled:', newMutedState ? 'MUTED' : 'UNMUTED');
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        position: 'absolute',
        top: '80px',
        left: '80px', // Positioned next to the eye toggle button
        zIndex: 1000,
        width: '50px',
        height: '50px',
        background: '#d8d4c8', // Aged paper color
        border: '2px solid #1a0f0a', // Dark ink
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        color: '#1a0f0a',
        fontFamily: '"Courier New", monospace',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s ease',
        transform: 'rotate(0.5deg)', // Slight rotation for analog horror feel
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#c4b49a'; // Darker aged paper
        e.currentTarget.style.transform = 'rotate(0.5deg) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#d8d4c8';
        e.currentTarget.style.transform = 'rotate(0.5deg) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
      }}
      title={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {/* Damage overlay for analog horror effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }} />
      {/* Speaker icon - muted or unmuted */}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {isMuted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}

