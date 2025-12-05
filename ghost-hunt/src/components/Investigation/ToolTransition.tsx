// Tool Transition Effect - Static burst and fade
import { useEffect, useState } from 'react';

interface ToolTransitionProps {
  isTransitioning: boolean;
  onComplete: () => void;
}

export function ToolTransition({ isTransitioning, onComplete }: ToolTransitionProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isTransitioning) {
      // Fade in quickly
      setOpacity(1);
      
      // Fade out and complete after 300ms
      const timer = setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 200); // Wait for fade out
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onComplete]);

  if (!isTransitioning && opacity === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.2s ease-out',
      }}
    >
      {/* Static burst effect - Green net effect removed */}
      {/* Grid pattern removed per user request */}
      
      {/* Flash overlay - Green/teal effect removed */}
      {/* Radial gradient removed per user request */}
    </div>
  );
}
