// Backpack menu component - Equipment Control Panel
import { useState } from 'react';

interface BackpackMenuProps {
  onOpenInventory: () => void;
  onOpenCodex: () => void;
}

export function BackpackMenu({ onOpenInventory, onOpenCodex }: BackpackMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
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
      }}
    >
      {/* Radial menu buttons (Items & Codex) */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            animation: 'fadeIn 0.2s',
          }}
        >
          <button
            onClick={() => {
              onOpenInventory();
              setIsOpen(false);
            }}
            className="hud-button"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid rgba(45, 212, 191, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(45, 212, 191, 0.1)',
              cursor: 'pointer',
              fontSize: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: 'rgba(45, 212, 191, 0.8)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(45, 212, 191, 0.3), inset 0 0 8px rgba(45, 212, 191, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.2)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(45, 212, 191, 0.05)';
            }}
            title="Items"
          >
            🎒
          </button>

          <button
            onClick={() => {
              onOpenCodex();
              setIsOpen(false);
            }}
            className="hud-button"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid rgba(45, 212, 191, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(45, 212, 191, 0.1)',
              cursor: 'pointer',
              fontSize: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: 'rgba(45, 212, 191, 0.8)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(45, 212, 191, 0.3), inset 0 0 8px rgba(45, 212, 191, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.2)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(45, 212, 191, 0.05)';
            }}
            title="Codex"
          >
            📖
          </button>
        </div>
      )}

      {/* Main backpack button - BIG CENTER GAME BUTTON */}
      <button
        onClick={toggleMenu}
        className="hud-button"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '18px',
          backgroundColor: isOpen 
            ? 'rgba(45, 212, 191, 0.2)' 
            : 'rgba(15, 23, 42, 0.95)',
          border: `3px solid ${isOpen ? 'rgba(45, 212, 191, 0.6)' : 'rgba(45, 212, 191, 0.4)'}`,
          boxShadow: isOpen
            ? '0 0 24px rgba(45, 212, 191, 0.6), 0 8px 24px rgba(0, 0, 0, 0.7), inset 0 0 16px rgba(45, 212, 191, 0.2)'
            : '0 8px 24px rgba(0, 0, 0, 0.7), inset 0 3px 0 rgba(45, 212, 191, 0.15), inset 0 -3px 0 rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          fontSize: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isOpen ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
          transition: 'all 0.3s ease',
          color: isOpen ? 'rgba(45, 212, 191, 1)' : 'rgba(45, 212, 191, 0.9)',
          textShadow: isOpen 
            ? '0 0 16px rgba(45, 212, 191, 0.8)' 
            : '0 0 12px rgba(45, 212, 191, 0.5)',
          filter: isOpen ? 'brightness(1.2)' : 'brightness(1)',
        }}
        title={isOpen ? 'Close' : 'Field Kit'}
      >
        {isOpen ? '✕' : '🎒'}
      </button>
    </div>
  );
}
