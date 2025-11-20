// Backpack menu component (bottom-center)
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
      }}
    >
      {/* Radial menu buttons (Items & Codex) */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            gap: '16px',
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
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#8b5cf6',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Codex"
          >
            📖
          </button>
        </div>
      )}

      {/* Main backpack button - elevated */}
      <button
        onClick={toggleMenu}
        className="hud-button"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: isOpen ? '#ef4444' : '#f59e0b',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          fontSize: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isOpen ? 'rotate(45deg) translateY(-4px)' : 'rotate(0deg) translateY(-4px)',
          transition: 'all 0.3s',
        }}
      >
        {isOpen ? '✕' : '🎒'}
      </button>
    </div>
  );
}
