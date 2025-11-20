// HUD Container - cohesive bottom bar
import { ReactNode } from 'react';

interface HUDContainerProps {
  children: ReactNode;
}

export function HUDContainer({ children }: HUDContainerProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0 20px 20px 20px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '500px',
          padding: '16px 20px',
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}
