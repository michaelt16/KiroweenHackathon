// PolaroidPhoto - Photo frame with tape and shadows
import { CSSProperties } from 'react';
import tape from '../../assets/texture/tape.png';
import dust from '../../assets/texture/dust.png';

interface PolaroidPhotoProps {
  src: string;
  alt?: string;
  caption?: string;
  rotation?: number;
  tapePosition?: 'top' | 'corner' | 'both';
  style?: CSSProperties;
}

export function PolaroidPhoto({
  src,
  alt = '',
  caption,
  rotation = 0,
  tapePosition = 'top',
  style = {},
}: PolaroidPhotoProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        transform: `rotate(${rotation}deg) perspective(600px) rotateY(${rotation > 0 ? -2 : 2}deg)`,
        ...style,
      }}
    >
      {/* Tape at top */}
      {(tapePosition === 'top' || tapePosition === 'both') && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: `translateX(-50%) rotate(${rotation > 0 ? -8 : 8}deg)`,
            width: '80px',
            height: '25px',
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            zIndex: 2,
          }}
        />
      )}

      {/* Polaroid frame */}
      <div
        style={{
          background: '#e8e4dc',
          padding: '10px 10px 35px 10px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: '100%',
            height: '180px',
            background: '#1a1a1a',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Grain overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              mixBlendMode: 'overlay',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Caption */}
        {caption && (
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '16px',
              color: '#1a1a1a',
              marginTop: '8px',
              textAlign: 'center',
              transform: `rotate(${rotation > 0 ? -1 : 1}deg) translateX(${rotation > 0 ? -0.5 : 0.5}px)`,
            }}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
