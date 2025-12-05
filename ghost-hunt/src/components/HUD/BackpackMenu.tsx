// Backpack menu component - Equipment Control Panel (Analog Horror)
import { useState } from 'react';
import { BackpackIconCSS } from './BackpackIconCSS';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';
import { playButtonClick } from '../../utils/soundEffects';

interface BackpackMenuProps {
  onOpenInventory: () => void;
  onOpenCodex: () => void;
  onOpenFieldJournals?: () => void;
}

export function BackpackMenu({ onOpenInventory, onOpenCodex, onOpenFieldJournals }: BackpackMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    playButtonClick();
    console.log('🎒 Backpack menu toggled:', !isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        pointerEvents: 'auto',
        background: 'transparent',
      }}
    >
      {/* Radial menu buttons (Items, Codex, Field Journals) - Floating Icons */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            gap: '16px',
            animation: 'fadeIn 0.2s',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '200px',
            background: 'transparent',
          }}
        >
          <button
            onClick={() => {
              playButtonClick();
              onOpenInventory();
              setIsOpen(false);
            }}
            className="hud-button"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#d8d4c8',
              border: '3px solid #1a0f0a',
              boxShadow: 
                '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              fontSize: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: '#1a0f0a',
              position: 'relative',
              transform: 'translateY(-4px)',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8b0000';
              e.currentTarget.style.boxShadow = 
                '0 12px 32px rgba(0, 0, 0, 0.9), ' +
                '0 6px 16px rgba(0, 0, 0, 0.7), ' +
                '0 3px 8px rgba(0, 0, 0, 0.5), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a0f0a';
              e.currentTarget.style.boxShadow = 
                '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1)';
            }}
            title="Items"
          >
            {/* Aged paper texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${wrinkledpaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
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
              opacity: 0.3,
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <BackpackIconCSS size={32} color="#1a0f0a" />
            </div>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onOpenCodex();
              setIsOpen(false);
            }}
            className="hud-button"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#d8d4c8',
              border: '3px solid #1a0f0a',
              boxShadow: 
                '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              fontSize: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: '#1a0f0a',
              position: 'relative',
              transform: 'translateY(-4px) rotate(0.2deg)',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8b0000';
              e.currentTarget.style.boxShadow = 
                '0 12px 32px rgba(0, 0, 0, 0.9), ' +
                '0 6px 16px rgba(0, 0, 0, 0.7), ' +
                '0 3px 8px rgba(0, 0, 0, 0.5), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05) rotate(-0.2deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a0f0a';
              e.currentTarget.style.boxShadow = 
                '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1) rotate(0.2deg)';
            }}
            title="Codex"
          >
            {/* Aged paper texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${wrinkledpaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
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
              opacity: 0.3,
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>📖</div>
          </button>

          {onOpenFieldJournals && (
            <button
              onClick={() => {
                playButtonClick();
                onOpenFieldJournals();
                setIsOpen(false);
              }}
              className="hud-button"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#d8d4c8',
                border: '3px solid #1a0f0a',
                boxShadow: 
                  '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                  '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                  '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                fontSize: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: '#1a0f0a',
                position: 'relative',
                transform: 'translateY(-4px) rotate(-0.2deg)',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b0000';
                e.currentTarget.style.boxShadow = 
                  '0 12px 32px rgba(0, 0, 0, 0.9), ' +
                  '0 6px 16px rgba(0, 0, 0, 0.7), ' +
                  '0 3px 8px rgba(0, 0, 0, 0.5), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05) rotate(0.2deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a0f0a';
                e.currentTarget.style.boxShadow = 
                  '0 8px 24px rgba(0, 0, 0, 0.8), ' +
                  '0 4px 12px rgba(0, 0, 0, 0.6), ' +
                  '0 2px 6px rgba(0, 0, 0, 0.4), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1) rotate(-0.2deg)';
              }}
              title="Field Journals"
            >
              {/* Aged paper texture */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledpaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
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
                opacity: 0.3,
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>📓</div>
          </button>
          )}
        </div>
      )}

      {/* Main backpack button - BIG CENTER GAME BUTTON */}
      <button
        onClick={toggleMenu}
        className="hud-button"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '6px',
          backgroundColor: isOpen 
            ? '#c4b49a' // Darker when open
            : '#d8d4c8', // Aged paper
          border: `3px solid ${isOpen ? '#8b0000' : '#1a0f0a'}`,
          boxShadow: isOpen
            ? '0 8px 24px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6)'
            : '0 8px 24px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
          fontSize: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isOpen ? 'scale(1.05) rotate(-0.5deg)' : 'rotate(-0.3deg)',
          transition: 'all 0.3s ease',
          color: '#1a0f0a',
          position: 'relative',
          overflow: 'hidden',
        }}
        title={isOpen ? 'Close' : 'Field Kit'}
      >
        {/* Aged paper texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: isOpen ? 0.5 : 0.4,
          pointerEvents: 'none',
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
          opacity: isOpen ? 0.3 : 0.2,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {isOpen ? (
            <span style={{ fontSize: '32px', lineHeight: 1, color: '#1a0f0a' }}>✕</span>
          ) : (
            <BackpackIconCSS size={40} color="#1a0f0a" />
          )}
        </div>
      </button>
    </div>
  );
}
