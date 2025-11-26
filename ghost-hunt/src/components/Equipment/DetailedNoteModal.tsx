// Detailed Note Modal - Shows expanded instructions when card is clicked
import React from 'react';
import tapeTexture from '../../assets/texture/tape.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';

interface DetailedNoteModalProps {
  title: string;
  detailedText: string;
  onClose: () => void;
}

export function DetailedNoteModal({ title, detailedText, onClose }: DetailedNoteModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20000,
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          transform: 'rotate(-0.8deg)',
        }}
      >
        {/* Tape strips at top */}
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '20%',
            width: '60px',
            height: '20px',
            backgroundImage: `url(${tapeTexture})`,
            backgroundSize: 'cover',
            opacity: 0.8,
            transform: 'rotate(-5deg)',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '20%',
            width: '60px',
            height: '20px',
            backgroundImage: `url(${tapeTexture})`,
            backgroundSize: 'cover',
            opacity: 0.8,
            transform: 'rotate(8deg)',
            zIndex: 2,
          }}
        />

        {/* Aged paper note - analog horror style */}
        <div
          style={{
            background: '#d8d4c8',
            padding: '35px 30px',
            borderRadius: '4px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          {/* Wrinkled texture layer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledpaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.6,
            pointerEvents: 'none',
            borderRadius: '4px',
          }} />

          {/* Dust overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.3,
            pointerEvents: 'none',
            borderRadius: '4px',
          }} />

          {/* Edge darkening */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
            pointerEvents: 'none',
            borderRadius: '4px',
          }} />

          {/* Vertical fold crease */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%, transparent)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }} />

          {/* Coffee stain */}
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, rgba(139, 69, 19, 0.15) 40%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Horizontal lines (notebook style) */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${70 + i * 28}px`,
                left: '25px',
                right: '25px',
                height: '1px',
                background: 'rgba(139, 69, 19, 0.2)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          ))}

          {/* Title - handwritten with ink bleed */}
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '18px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              textShadow: '1px 1px 2px rgba(26, 15, 10, 0.3)',
              transform: 'rotate(-0.3deg)',
            }}
          >
            {title}
          </div>

          {/* Underline under title */}
          <div style={{
            width: '60%',
            height: '2px',
            background: 'rgba(26, 15, 10, 0.4)',
            margin: '0 auto 20px',
            position: 'relative',
            zIndex: 1,
            transform: 'rotate(-0.2deg)',
          }} />

          {/* Detailed instructions - handwritten with micro-jitter */}
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '17px',
              color: '#1a0f0a',
              lineHeight: '2',
              whiteSpace: 'pre-line',
              position: 'relative',
              zIndex: 1,
              textShadow: '0.5px 0.5px 1px rgba(26, 15, 10, 0.2)',
            }}
          >
            {detailedText.split('\n').map((line, i) => (
              <div 
                key={i}
                style={{
                  transform: `rotate(${(Math.sin(i) * 0.4)}deg) translateX(${Math.cos(i) * 0.5}px)`,
                  marginBottom: '4px',
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Close instruction */}
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '13px',
              color: 'rgba(26, 15, 10, 0.5)',
              textAlign: 'center',
              marginTop: '25px',
              position: 'relative',
              zIndex: 1,
              transform: 'rotate(0.2deg)',
            }}
          >
            (tap anywhere to close)
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b0000 0%, #6b0000 50%, #4a0000 100%)',
            border: '2px solid #2a0000',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
            zIndex: 3,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
