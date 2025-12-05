import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import corkTexture from '../../../assets/texture/corkboardtexture.png';
import coffeeStain from '../../../assets/texture/coffeestain.png';
import dust from '../../../assets/texture/dust.png';
import wrinkledpaper from '../../../assets/texture/wrinkledpaper.png';
import burnhole from '../../../assets/texture/burnhole.png';
import { PushPin } from '../../analog/base/PushPin';
import { StickyNote } from '../../analog/elements/StickyNote';
import { RedStringConnection } from './RedStringConnection';
import { IndexCard } from './IndexCard';
import { MatchHistoryPolaroid } from './MatchHistoryPolaroid';
import { getDamageVariant } from '../../analog/utils/randomization';
import { playPaperClick } from '../../../utils/soundEffects';
import { MockPolaroid, 
  MOCK_PIN_HOLES, 
  MOCK_TAPE_MARKS, 
  MOCK_POLAROIDS, 
  MOCK_STRINGS,
  MOCK_STICKY_NOTES,
  MOCK_INDEX_CARDS 
} from './mockData';

export const CorkBoardView: React.FC = () => {
  const [zoomedPolaroid, setZoomedPolaroid] = useState<MockPolaroid | null>(null);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: `
          url(${corkTexture}),
          linear-gradient(135deg, #8B6F47 0%, #6B5230 50%, #5A4228 100%)
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply, normal',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cork texture overlay - matches map */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${corkTexture})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />
      
      {/* Cork board vignette - matches map */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
      }} />
      
      {/* Content wrapper - pushes all content down to account for TopStatusBar */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 'calc(100% - 70px)',
      }}>
      {/* Coffee stain overlays (2-3 stains at random positions) - Mobile optimized */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          width: 'min(180px, 25vw)',
          height: 'min(180px, 25vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: 'min(200px, 28vw)',
          height: 'min(200px, 28vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          opacity: 0.35,
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: 'min(160px, 22vw)',
          height: 'min(160px, 22vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          opacity: 0.3,
          transform: 'rotate(-30deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Scattered pin holes (10-15 small circles) */}
      {MOCK_PIN_HOLES.map((hole) => (
        <div
          key={hole.id}
          style={{
            position: 'absolute',
            left: hole.position.x,
            top: hole.position.y,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Tape residue marks (5-8 faded rectangles) */}
      {MOCK_TAPE_MARKS.map((mark) => (
        <div
          key={mark.id}
          style={{
            position: 'absolute',
            left: mark.position.x,
            top: mark.position.y,
            width: mark.width,
            height: mark.height,
            background: 'rgba(255,255,200,0.2)',
            transform: `rotate(${mark.rotation}deg)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Red string connections between Polaroids */}
      <RedStringConnection 
        connections={MOCK_STRINGS} 
        polaroids={MOCK_POLAROIDS}
      />

      {/* Match History Polaroids with push pins */}
      {MOCK_POLAROIDS.map((polaroid) => (
        <div
          key={polaroid.id}
          style={{
            position: 'absolute',
            left: polaroid.position.x,
            top: polaroid.position.y,
            transform: `translate(-50%, -50%)`,
            cursor: 'pointer',
            zIndex: 5,
          }}
          onClick={() => {
            playPaperClick();
            setZoomedPolaroid(polaroid);
          }}
        >
          {/* Push pin at top of Polaroid */}
          <PushPin 
            color={polaroid.pinColor} 
            position={{ top: '-8px', left: '50%' }}
          />
          
          {/* Match History Polaroid */}
          <MatchHistoryPolaroid match={polaroid} />
        </div>
      ))}

      {/* Sticky notes */}
      {MOCK_STICKY_NOTES.map((note) => (
        <div
          key={note.id}
          style={{
            position: 'absolute',
            left: note.position.x,
            top: note.position.y,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <StickyNote
            color={note.color}
            size={note.size}
            rotation={note.rotation}
            withPin={true}
            seed={note.id}
          >
            {note.text}
          </StickyNote>
        </div>
      ))}

      {/* Index cards */}
      {MOCK_INDEX_CARDS.map((card) => (
        <div
          key={card.id}
          style={{
            position: 'absolute',
            left: card.position.x,
            top: card.position.y,
            transform: `translate(-50%, -50%)`,
            zIndex: 3,
          }}
        >
          <IndexCard
            title={card.title}
            details={card.details}
            rotation={card.rotation}
          />
        </div>
      ))}

      {/* Paper clips (3-5 small SVG clips) */}
      {[
        { x: '32%', y: '28%', rotation: 15 },
        { x: '58%', y: '35%', rotation: -20 },
        { x: '22%', y: '62%', rotation: 10 },
        { x: '82%', y: '58%', rotation: -15 },
      ].map((clip, index) => (
        <svg
          key={`clip-${index}`}
          style={{
            position: 'absolute',
            left: clip.x,
            top: clip.y,
            width: '20px',
            height: '40px',
            transform: `rotate(${clip.rotation}deg)`,
            opacity: 0.6,
          }}
          viewBox="0 0 20 40"
        >
          <path
            d="M 5 5 Q 5 2 7 2 L 13 2 Q 15 2 15 5 L 15 30 Q 15 35 10 35 Q 5 35 5 30 Z"
            fill="none"
            stroke="#666"
            strokeWidth="1.5"
          />
        </svg>
      ))}

      {/* Case number labels with handwritten font */}
      {[
        { x: '52%', y: '12%', text: 'Case #2901', rotation: 1.5 },
      ].map((label, index) => (
        <div
          key={`label-${index}`}
          style={{
            position: 'absolute',
            left: label.x,
            top: label.y,
            fontFamily: '"Caveat", cursive',
            fontSize: '14px',
            color: '#4a0000',
            transform: `rotate(${label.rotation}deg)`,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
          }}
        >
          {label.text}
        </div>
      ))}

      </div> {/* End content wrapper */}

      {/* Zoomed Polaroid Modal - Rendered via Portal to escape carousel overflow */}
      {zoomedPolaroid && createPortal(
        <div
          onClick={() => {
            playPaperClick();
            setZoomedPolaroid(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(450px, 90vw)',
              minWidth: '280px',
              background: '#e8e4dc',
              padding: '12px 12px 45px 12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
            }}
          >
            {/* Photo */}
            <div style={{
              width: '100%',
              aspectRatio: '1 / 1',
              background: '#1a1a1a',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img 
                src={zoomedPolaroid.imageUrl} 
                alt={zoomedPolaroid.ghostType}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top', // Position images at top to show heads
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
                opacity: (zoomedPolaroid.result === 'success' ? 0.7 : 0.9) * 1.2,
              }} />

              {/* Damage effects */}
              {zoomedPolaroid.result === 'failure' && (
                <>
                  {/* Burn hole */}
                  <div style={{
                    position: 'absolute',
                    bottom: `${10 + getDamageVariant(zoomedPolaroid.id + 'burn', 30)}px`,
                    left: `${15 + getDamageVariant(zoomedPolaroid.id + 'burnx', 25)}px`,
                    width: `${20 + getDamageVariant(zoomedPolaroid.id + 'burnw', 15)}px`,
                    height: `${20 + getDamageVariant(zoomedPolaroid.id + 'burnh', 15)}px`,
                    backgroundImage: `url(${burnhole})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'multiply',
                    opacity: 0.5,
                  }} />
                  
                  {/* Additional dark spots/blemishes */}
                  <div style={{
                    position: 'absolute',
                    top: `${15 + getDamageVariant(zoomedPolaroid.id + 'spot1', 60)}%`,
                    left: `${10 + getDamageVariant(zoomedPolaroid.id + 'spot1x', 40)}%`,
                    width: `${8 + getDamageVariant(zoomedPolaroid.id + 'spot1w', 12)}px`,
                    height: `${8 + getDamageVariant(zoomedPolaroid.id + 'spot1h', 12)}px`,
                    background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0.7,
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: `${20 + getDamageVariant(zoomedPolaroid.id + 'spot2', 50)}%`,
                    right: `${15 + getDamageVariant(zoomedPolaroid.id + 'spot2x', 35)}%`,
                    width: `${6 + getDamageVariant(zoomedPolaroid.id + 'spot2w', 10)}px`,
                    height: `${6 + getDamageVariant(zoomedPolaroid.id + 'spot2h', 10)}px`,
                    background: 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0.6,
                  }} />
                </>
              )}

              {/* Result badge overlay */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: zoomedPolaroid.result === 'success' ? 'rgba(45, 212, 191, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(12px, 3vw, 14px)',
                fontWeight: 'bold',
                color: '#1a1a1a',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}>
                {zoomedPolaroid.result === 'success' ? '✓ SUCCESS' : '✗ FAILED'}
              </div>
            </div>

            {/* Handwritten caption */}
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 'clamp(20px, 5vw, 26px)',
              color: '#1a1a1a',
              marginTop: '12px',
              textAlign: 'center',
              transform: 'rotate(-2deg) translateX(-1px)',
              letterSpacing: '0.5px',
              fontWeight: 'bold',
            }}>
              {zoomedPolaroid.caption}
            </div>
            
            {/* Location and date */}
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: 'clamp(11px, 3vw, 13px)',
              color: '#4a4a4a',
              textAlign: 'center',
              marginTop: '8px',
            }}>
              {zoomedPolaroid.location} • {zoomedPolaroid.date}
            </div>
            
            {/* Reward and XP */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              fontFamily: '"Courier New", monospace',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontWeight: 'bold',
              marginTop: '12px',
            }}>
              <div style={{ 
                color: zoomedPolaroid.reward > 0 ? '#2dd4bf' : '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span style={{ fontSize: '0.9em' }}>💰</span> ${zoomedPolaroid.reward}
              </div>
              <div style={{ 
                color: zoomedPolaroid.xp > 0 ? '#fbbf24' : '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span style={{ fontSize: '0.9em' }}>⭐</span> +{zoomedPolaroid.xp} XP
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};









