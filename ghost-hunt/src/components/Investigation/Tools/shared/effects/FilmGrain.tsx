import React from 'react';
import filmgrain from '../../../../../assets/texture/filmgrain.png';

interface FilmGrainProps {
  opacity?: number;
  animate?: boolean;
}

/**
 * FilmGrain - Animated film grain overlay
 * 
 * Features:
 * - Film grain texture
 * - Optional animation (flicker)
 * - Overlay blend mode
 * - Customizable opacity
 * 
 * Usage:
 * <FilmGrain opacity={0.6} animate={true} />
 */
export const FilmGrain: React.FC<FilmGrainProps> = ({ 
  opacity = 0.6,
  animate = true 
}) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${filmgrain})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity,
          pointerEvents: 'none',
          zIndex: 16,
          animation: animate ? 'grain 0.15s infinite' : 'none',
        }}
      />
      
      {animate && (
        <style>{`
          @keyframes grain {
            0%, 100% { opacity: ${opacity}; }
            50% { opacity: ${opacity * 0.97}; }
          }
        `}</style>
      )}
    </>
  );
};
