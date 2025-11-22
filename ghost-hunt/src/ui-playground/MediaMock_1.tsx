import React from 'react';

// Texture imports
import coffeestain from '../assets/texture/coffeestain.png';
import dust from '../assets/texture/dust.png';
import rippedpaper from '../assets/texture/rippedpaper.png';
import tape from '../assets/texture/tape.png';
import wrinkledpaper from '../assets/texture/wrinkledpaper.png';
import ghost1 from '../assets/images/ghost1.png';
import ghost2 from '../assets/images/ghost2.png';

// Media Mock 1 - Near-exact Phasmophobia-inspired
export function MediaMock_1() {
  const photos = [
    { id: 1, title: 'Ghost Manifestation', value: '$40', tier: 'S', notes: 'Clear apparition', image: ghost1 },
    { id: 2, title: 'EMF Spike', value: '$20', tier: 'A', notes: 'Level 5 reading', image: ghost2 },
    { id: 3, title: 'Fingerprints', value: '$15', tier: 'B', notes: 'On door handle', image: ghost1 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '20px 10px',
      position: 'relative',
    }}>
      {/* Journal Page */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#d8d4c8',
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '40px 25px',
        position: 'relative',
        minHeight: '700px',
        transform: 'rotate(-0.5deg)',
      }}>
        {/* Wrinkled paper texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.7,
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
          opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Water damage edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Fold crease */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, transparent)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          right: '50px',
          width: '150px',
          height: '150px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.4,
          transform: 'rotate(-20deg)',
          pointerEvents: 'none',
        }} />

        {/* Ripped corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          backgroundImage: `url(${rippedpaper})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          pointerEvents: 'none',
        }} />

        {/* Grid background (faded) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 24px,
              rgba(139, 69, 19, 0.08) 25px,
              rgba(139, 69, 19, 0.08) 26px
            )
          `,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{
            marginBottom: '25px',
            paddingBottom: '15px',
            borderBottom: '2px solid #1a0f0a',
            transform: 'rotate(-0.3deg)',
          }}>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '8px',
              textAlign: 'center',
            }}>
              MEDIA - PHOTOS
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              color: '#8B4513',
              textAlign: 'center',
            }}>
              Evidence Captured: {photos.length}/3
            </div>
          </div>

          {/* Photo entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                style={{
                  position: 'relative',
                  paddingBottom: '20px',
                  borderBottom: index < photos.length - 1 ? '1px dashed #8B4513' : 'none',
                  transform: `rotate(${index % 2 === 0 ? '0.3deg' : '-0.4deg'})`,
                }}
              >
                {/* Polaroid photo */}
                <div style={{
                  position: 'relative',
                  width: '180px',
                  margin: '0 auto 15px',
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                }}>
                  {/* Tape */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-5deg' : '5deg'})`,
                    width: '70px',
                    height: '25px',
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    zIndex: 2,
                  }} />

                  {/* Polaroid frame */}
                  <div style={{
                    background: '#e8e4dc',
                    padding: '10px 10px 35px 10px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '140px',
                      background: '#1a1a1a',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <img 
                        src={photo.image} 
                        alt={photo.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Static overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dust})`,
                        mixBlendMode: 'overlay',
                        opacity: 0.6,
                      }} />
                    </div>

                    {/* Caption */}
                    <div style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '14px',
                      color: '#1a1a1a',
                      marginTop: '6px',
                      textAlign: 'center',
                      transform: 'rotate(-1deg)',
                    }}>
                      {photo.title}
                    </div>
                  </div>

                  {/* Trash icon */}
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '20px',
                    height: '20px',
                    background: 'rgba(220, 38, 38, 0.8)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    cursor: 'pointer',
                    zIndex: 3,
                  }}>
                    🗑️
                  </div>
                </div>

                {/* Photo details */}
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  color: '#1a0f0a',
                  textAlign: 'center',
                }}>
                  <div style={{ 
                    marginBottom: '6px',
                    transform: 'rotate(0.2deg)',
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Value:</span> {photo.value}
                  </div>
                  <div style={{ 
                    marginBottom: '6px',
                    transform: 'rotate(-0.3deg)',
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Tier:</span>{' '}
                    <span style={{
                      padding: '2px 8px',
                      background: photo.tier === 'S' ? '#22c55e' : photo.tier === 'A' ? '#f59e0b' : '#8B4513',
                      color: '#fff',
                      borderRadius: '3px',
                      fontSize: '11px',
                    }}>
                      {photo.tier}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '16px',
                    color: '#4a0000',
                    marginTop: '8px',
                    transform: 'rotate(0.4deg)',
                  }}>
                    {photo.notes}
                  </div>
                </div>

                {/* Fingerprint stamp */}
                {index === 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '40px',
                    height: '50px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
                    transform: 'rotate(25deg)',
                    pointerEvents: 'none',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Page number */}
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            color: '#8B4513',
          }}>
            Page 1 of 1
          </div>
        </div>

        {/* Side tabs */}
        <div style={{
          position: 'absolute',
          right: '-15px',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {['Photos', 'Audio', 'Video'].map((tab, i) => (
            <div
              key={tab}
              style={{
                background: i === 0 ? '#8B4513' : '#d8d4c8',
                color: i === 0 ? '#fff' : '#1a0f0a',
                padding: '8px 12px',
                fontSize: '10px',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                borderRadius: '0 4px 4px 0',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaMock_1;
