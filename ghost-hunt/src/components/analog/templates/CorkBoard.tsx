import React from 'react';
import { PushPin } from '../base/PushPin';
import { DamageOverlay } from '../base/DamageOverlay';

interface CorkBoardProps {
  children: React.ReactNode;
  boardId?: string;
}

/**
 * CorkBoard Template - Evidence board with pinned elements
 * Purpose: Detective-style investigation board
 * 
 * Composition:
 * - Cork texture background
 * - Scattered pinned elements
 * - Light damage overlays
 * - String connections (optional)
 */
export function CorkBoard({ children, boardId = 'board' }: CorkBoardProps) {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#8b7355',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.9) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.9) 0%, transparent 50%),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        )
      `,
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
      padding: '40px',
    }}>
      {/* Cork texture noise */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-radial-gradient(circle at 30% 40%, rgba(0,0,0,0.05) 0%, transparent 3px)',
        pointerEvents: 'none',
      }} />

      {/* Light damage on cork */}
      <DamageOverlay type="coffee" opacity={0.2} seed={boardId} />
      <DamageOverlay type="fingerprint" opacity={0.15} seed={boardId + '-print'} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// Export sub-components
CorkBoard.Pin = PushPin;
