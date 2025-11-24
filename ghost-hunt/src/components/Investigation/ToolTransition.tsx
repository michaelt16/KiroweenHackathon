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
      {/* Static burst effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              transparent 2px,
              transparent 4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 0px,
              transparent 2px,
              transparent 4px
            )
          `,
          animation: 'staticNoise 0.1s infinite',
        }}
      />
      
      {/* Flash overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.2) 0%, transparent 70%)',
          animation: 'flash 0.3s ease-out',
        }}
      />
      
      <style>{`
        @keyframes staticNoise {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(2px, 2px); }
        }
        
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
