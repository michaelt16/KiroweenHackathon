import tape from '../../../assets/texture/tape.png';
import dust from '../../../assets/texture/dust.png';
import { getDamageVariant } from '../utils/randomization';

interface PolaroidPhotoProps {
  src: string;
  caption?: string;
  rotation?: number;
  damage?: 'light' | 'medium' | 'heavy';
  withTape?: boolean;
  seed?: string | number;
}

export function PolaroidPhoto({ 
  src, 
  caption = 'evidence photo', 
  rotation, 
  damage = 'medium', 
  withTape = true,
  seed = Date.now() 
}: PolaroidPhotoProps) {
  const rotations = [-8, -5, -3, 3, 5, 8];
  const finalRotation = rotation ?? rotations[getDamageVariant(seed, rotations.length)];
  
  const tapeRotations = [-12, -8, -5, 5, 8, 12];
  const seedNum = typeof seed === 'number' ? seed : Date.now();
  const tapeRotation = tapeRotations[getDamageVariant(seedNum + 1, tapeRotations.length)];

  const staticOpacity = {
    light: 0.5,
    medium: 0.7,
    heavy: 0.9,
  };

  return (
    <div style={{
      position: 'relative',
      width: '220px',
      transform: `rotate(${finalRotation}deg) perspective(600px) rotateY(-2deg)`,
    }}>
      {/* Tape */}
      {withTape && (
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
      )}

      {/* Polaroid frame */}
      <div style={{
        background: '#e8e4dc',
        padding: '12px 12px 45px 12px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
      }}>
        {/* Photo content */}
        <div style={{
          width: '100%',
          height: '180px',
          background: '#1a1a1a',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img 
            src={src} 
            alt="Evidence"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          
          {/* Static/grain overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            mixBlendMode: 'overlay',
            opacity: staticOpacity[damage],
          }} />

          {/* Damage effects */}
          {damage === 'heavy' && (
            <>
              {/* Scratch marks */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '5px',
                width: '30px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transform: 'rotate(15deg)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '10px',
                width: '25px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                transform: 'rotate(-20deg)',
              }} />
            </>
          )}
        </div>

        {/* Handwritten caption */}
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: '17px',
          color: '#1a1a1a',
          marginTop: '8px',
          textAlign: 'center',
          transform: 'rotate(-2deg) translateX(-1px)',
          letterSpacing: '0.5px',
        }}>
          {caption}
        </div>
      </div>
    </div>
  );
}
