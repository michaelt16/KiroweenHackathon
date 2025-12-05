import React from 'react';
import tape from '../../../assets/texture/tape.png';
import dust from '../../../assets/texture/dust.png';
import filmgrain from '../../../assets/texture/filmgrain.png';
import wrinkledpaper from '../../../assets/texture/wrinkledpaper.png';
import burnhole from '../../../assets/texture/burnhole.png';
import { getDamageVariant } from '../../analog/utils/randomization';
import { MockPolaroid } from './mockData';

interface MatchHistoryPolaroidProps {
  match: MockPolaroid;
}

export const MatchHistoryPolaroid: React.FC<MatchHistoryPolaroidProps> = ({ match }) => {
  const resultColor = match.result === 'success' ? '#2dd4bf' : '#ef4444';
  const resultText = match.result === 'success' ? '✓ SUCCESS' : '✗ FAILED';
  
  // Use match ID as seed for consistent randomization
  const seed = match.id;
  const rotations = [-8, -5, -3, 3, 5, 8];
  const finalRotation = match.rotation ?? rotations[getDamageVariant(seed, rotations.length)];
  
  const tapeRotations = [-12, -8, -5, 5, 8, 12];
  const tapeRotation = tapeRotations[getDamageVariant(seed, tapeRotations.length)];

  const staticOpacity = {
    light: 0.5,
    medium: 0.7,
    heavy: 0.9,
  };
  const damage = match.result === 'success' ? 'medium' : 'heavy';
  // Check if this is Onyx for extra darkening
  const isOnyx = match.ghostType === 'Onyx';

  return (
    <div style={{
      position: 'relative',
      width: 'min(140px, 35vw)', // Mobile-optimized size
      transform: `rotate(${finalRotation}deg) perspective(600px) rotateY(-2deg)`,
    }}>
      {/* Tape */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        left: '50%',
        transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
        width: '100px',
        height: '30px',
        backgroundImage: `url(${tape})`,
        backgroundSize: 'cover',
        zIndex: 2,
      }} />

      {/* Polaroid frame */}
      <div style={{
        background: '#e8e4dc',
        padding: '12px 12px 45px 12px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Damaged border effects */}
        {damage !== 'light' && (
          <>
            {/* Worn edges */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(139, 111, 78, 0.4) 20%, rgba(139, 111, 78, 0.6) 50%, rgba(139, 111, 78, 0.4) 80%, transparent)',
              opacity: damage === 'heavy' ? 0.8 : 0.5,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(139, 111, 78, 0.5) 20%, rgba(139, 111, 78, 0.7) 50%, rgba(139, 111, 78, 0.5) 80%, transparent)',
              opacity: damage === 'heavy' ? 0.9 : 0.6,
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, transparent, rgba(139, 111, 78, 0.4) 20%, rgba(139, 111, 78, 0.6) 50%, rgba(139, 111, 78, 0.4) 80%, transparent)',
              opacity: damage === 'heavy' ? 0.8 : 0.5,
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, transparent, rgba(139, 111, 78, 0.4) 20%, rgba(139, 111, 78, 0.6) 50%, rgba(139, 111, 78, 0.4) 80%, transparent)',
              opacity: damage === 'heavy' ? 0.8 : 0.5,
            }} />
            
            {/* Corner damage */}
            <div style={{
              position: 'absolute',
              top: `${-2 + getDamageVariant(seed + 'corner1', 4)}px`,
              left: `${-2 + getDamageVariant(seed + 'corner1x', 4)}px`,
              width: `${8 + getDamageVariant(seed + 'corner1w', 6)}px`,
              height: `${8 + getDamageVariant(seed + 'corner1h', 6)}px`,
              background: 'radial-gradient(circle, rgba(139, 111, 78, 0.6) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: damage === 'heavy' ? 0.7 : 0.4,
            }} />
            <div style={{
              position: 'absolute',
              top: `${-2 + getDamageVariant(seed + 'corner2', 4)}px`,
              right: `${-2 + getDamageVariant(seed + 'corner2x', 4)}px`,
              width: `${6 + getDamageVariant(seed + 'corner2w', 5)}px`,
              height: `${6 + getDamageVariant(seed + 'corner2h', 5)}px`,
              background: 'radial-gradient(circle, rgba(139, 111, 78, 0.5) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: damage === 'heavy' ? 0.6 : 0.3,
            }} />
            {damage === 'heavy' && (
              <>
                <div style={{
                  position: 'absolute',
                  bottom: `${-2 + getDamageVariant(seed + 'corner3', 4)}px`,
                  left: `${-2 + getDamageVariant(seed + 'corner3x', 4)}px`,
                  width: `${7 + getDamageVariant(seed + 'corner3w', 6)}px`,
                  height: `${7 + getDamageVariant(seed + 'corner3h', 6)}px`,
                  background: 'radial-gradient(circle, rgba(139, 111, 78, 0.6) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0.6,
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: `${-2 + getDamageVariant(seed + 'corner4', 4)}px`,
                  right: `${-2 + getDamageVariant(seed + 'corner4x', 4)}px`,
                  width: `${5 + getDamageVariant(seed + 'corner4w', 5)}px`,
                  height: `${5 + getDamageVariant(seed + 'corner4h', 5)}px`,
                  background: 'radial-gradient(circle, rgba(139, 111, 78, 0.5) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0.5,
                }} />
              </>
            )}
            
            {/* Wrinkles on border */}
            {damage !== 'light' && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${wrinkledpaper})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'multiply',
                  opacity: damage === 'heavy' ? 0.15 : 0.08,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: `${30 + getDamageVariant(seed + 'wrinkle1', 15)}px`,
                  left: `${5 + getDamageVariant(seed + 'wrinkle1x', 30)}%`,
                  width: `${40 + getDamageVariant(seed + 'wrinkle1w', 30)}px`,
                  height: `${20 + getDamageVariant(seed + 'wrinkle1h', 15)}px`,
                  backgroundImage: `url(${wrinkledpaper})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'multiply',
                  opacity: damage === 'heavy' ? 0.2 : 0.12,
                  transform: `rotate(${getDamageVariant(seed + 'wrinkle1r', 10)}deg)`,
                  pointerEvents: 'none',
                }} />
                {damage === 'heavy' && (
                  <div style={{
                    position: 'absolute',
                    top: `${10 + getDamageVariant(seed + 'wrinkle2', 20)}px`,
                    right: `${5 + getDamageVariant(seed + 'wrinkle2x', 25)}%`,
                    width: `${35 + getDamageVariant(seed + 'wrinkle2w', 25)}px`,
                    height: `${18 + getDamageVariant(seed + 'wrinkle2h', 12)}px`,
                    backgroundImage: `url(${wrinkledpaper})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'multiply',
                    opacity: 0.15,
                    transform: `rotate(${-getDamageVariant(seed + 'wrinkle2r', 8)}deg)`,
                    pointerEvents: 'none',
                  }} />
                )}
              </>
            )}
          </>
        )}
        {/* Photo content */}
        <div style={{
          width: '100%',
          height: 'min(110px, 28vw)',
          background: '#1a1a1a',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img 
            src={match.imageUrl} 
            alt={match.ghostType}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top', // Position images at top to show heads
            }}
          />
          
          {/* Heavy static/grain overlay - matching location polaroids */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${filmgrain})`,
            backgroundSize: '200% 200%',
            mixBlendMode: 'overlay',
            opacity: 0.9,
            pointerEvents: 'none',
          }} />
          {/* Additional dust overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.6,
            pointerEvents: 'none',
          }} />


          {/* Burn hole - heavy damage only */}
          {damage === 'heavy' && (
            <div style={{
              position: 'absolute',
              bottom: `${10 + getDamageVariant(seed + 'burn', 30)}px`,
              left: `${15 + getDamageVariant(seed + 'burnx', 25)}px`,
              width: `${20 + getDamageVariant(seed + 'burnw', 15)}px`,
              height: `${20 + getDamageVariant(seed + 'burnh', 15)}px`,
              backgroundImage: `url(${burnhole})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              mixBlendMode: 'multiply',
              opacity: 0.5,
            }} />
          )}

          {/* Additional dark spots/blemishes */}
          {damage === 'heavy' && (
            <>
              <div style={{
                position: 'absolute',
                top: `${15 + getDamageVariant(seed + 'spot1', 60)}%`,
                left: `${10 + getDamageVariant(seed + 'spot1x', 40)}%`,
                width: `${8 + getDamageVariant(seed + 'spot1w', 12)}px`,
                height: `${8 + getDamageVariant(seed + 'spot1h', 12)}px`,
                background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.7,
              }} />
              <div style={{
                position: 'absolute',
                bottom: `${20 + getDamageVariant(seed + 'spot2', 50)}%`,
                right: `${15 + getDamageVariant(seed + 'spot2x', 35)}%`,
                width: `${6 + getDamageVariant(seed + 'spot2w', 10)}px`,
                height: `${6 + getDamageVariant(seed + 'spot2h', 10)}px`,
                background: 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.6,
              }} />
            </>
          )}

          {/* Result badge overlay */}
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: match.result === 'success' ? 'rgba(45, 212, 191, 0.9)' : 'rgba(239, 68, 68, 0.9)',
            padding: '3px 8px',
            borderRadius: '3px',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            letterSpacing: '0.5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            {resultText}
          </div>
        </div>

        {/* Handwritten caption */}
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: '15px',
          color: '#1a1a1a',
          marginTop: '8px',
          textAlign: 'center',
          transform: 'rotate(-2deg) translateX(-1px)',
          letterSpacing: '0.5px',
          fontWeight: 'bold',
        }}>
          {match.caption}
        </div>
        
        {/* Location and date - smaller text below caption */}
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '10px',
          color: '#4a4a4a',
          textAlign: 'center',
          marginTop: '4px',
        }}>
          {match.location} • {match.date}
        </div>
        
        {/* Reward and XP */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '4px',
        }}>
          <span style={{ color: match.reward > 0 ? '#2dd4bf' : '#666' }}>
            ${match.reward}
          </span>
          <span style={{ color: match.xp > 0 ? '#fbbf24' : '#666' }}>
            +{match.xp} XP
          </span>
        </div>
      </div>
    </div>
  );
};
