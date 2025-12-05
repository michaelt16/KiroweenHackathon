// HUD Container - Game-like Floating Buttons
import { type ReactNode } from 'react';

interface HUDContainerProps {
  children: ReactNode;
}

export function HUDContainer({ children }: HUDContainerProps) {
  return (
    <div
      data-hud-container
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 20px 24px 20px',
        pointerEvents: 'none',
        gap: '20px',
        background: 'transparent',
      }}
    >
      {children}
    </div>
  );
}
