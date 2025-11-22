import React from 'react';

// Texture imports
import burnhole from '../assets/texture/burnhole.png';
import coffeestain from '../assets/texture/coffeestain.png';
import dust from '../assets/texture/dust.png';
import rippedpaper from '../assets/texture/rippedpaper.png';
import rippedtexture from '../assets/texture/rippedtexture.png';
import tape from '../assets/texture/tape.png';
import wrinkledpaper from '../assets/texture/wrinkledpaper.png';
import ghost1 from '../assets/images/ghost1.png';
import ghost2 from '../assets/images/ghost2.png';

// Media Mock 2 - Darker horror version (more damage, more stains, harsher shadows)
export function MediaMock_2() {
  const photos = [
    { id: 1, title: 'ENTITY CAPTURED', value: '$40', tier: 'S', notes: 'IT SAW ME', image: ghost1 },
    { id: 2, title: 'EMF OVERLOAD', value: '$20', tier: 'A', notes: 'Equipment failed', image: ghost2 },
    { id: 3, title: 'Evidence', value: '$15', tier: 'B', notes: 'Barely escaped', image: ghost1 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0806',
      padding: '20px 10px',
      position: 'relative',
    }}>
      {/* Heavily Damaged Journal Page */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#c4b49a', // Darker aged paper
        borderRadius: '4px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.95)',
        padding: '40px 25px',
        position: 'relative',
        minHeight: '700px',
        transform: 'rotate(-1.2deg)', // More tilt
      }}>
        {/* VHS noise */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              rgba(0,0,0,0.04) 1px,
              transparent 2px
            )
          `,
          mixBlendMode: 'overlay',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />

        {/* Wrinkled paper texture - HEAVIER */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.85, // More visible
          pointerEvents: 'none',
          borderRadius: '4px',
        }} />

        {/* Dust overlay - HEAVIER */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.6, // More visible
          pointerEvents: 'none',
        }} />

        {/* Water damage - MUCH DARKER edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)', // Much darker
          pointerEvents: 'none',
        }} />

        {/* Fold crease - DARKER */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        {/* Multiple coffee stains */}
        <div style={{
          position: 'absolute',
          top: '120px',
          right: '40px',
          width: '180px',
          height: '180px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7, // More visible
          transform: 'rotate(35deg)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '30px',
          width: '140px',
          height: '140px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }} />

        {/* Burn hole damage */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '20px',
          width: '130px',
          height: '130px',
          backgroundImage: `url(${burnhole})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.8,
          pointerEvents: 'none',
        }} />

        {/* Ripped texture damage */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '200px',
          backgroundImage: `url(${rippedtexture})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        {/* Ripped corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '140px',
          backgroundImage: `url(${rippedpaper})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7,
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
              rgba(139, 0, 0, 0.12) 25px,
              rgba(139, 0, 0, 0.12) 26px
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
            borderBottom: '3px solid #1a0f0a',
            transform: 'rotate(-0.8deg)',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '8px',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
              MEDIA - PHOTOS
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              color: '#8B0000',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              Evidence: {photos.length}/3
            </div>

            {/* Blood smear over header */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              right: '10%',
              height: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.15) 20%, rgba(139,0,0,0.2) 50%, rgba(139,0,0,0.15) 80%, transparent)',
              transform: 'rotate(-1deg)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Photo entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                style={{
                  position: 'relative',
                  paddingBottom: '20px',
                  borderBottom: index < photos.length - 1 ? '2px dashed #4a0000' : 'none',
                  transform: `rotate(${index % 2 === 0 ? '0.8deg' : '-0.9deg'})`,
                }}
              >
                {/* Polaroid photo - MORE TILTED */}
                <div style={{
                  position: 'relative',
                  width: '180px',
                  margin: '0 auto 15px',
                  transform: `rotate(${index % 2 === 0 ? '-4deg' : '4deg'}) perspective(600px) rotateY(${index % 2 === 0 ? '-1deg' : '1deg'})`,
                }}>
                  {/* Tape - MORE CHAOTIC */}
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
                    width: '70px',
                    height: '25px',
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    zIndex: 2,
                  }} />

                  {/* Polaroid frame - HEAVIER SHADOW */}
                  <div style={{
                    background: '#e0dcd4',
                    padding: '10px 10px 35px 10px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.5)',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '140px',
                      background: '#0a0a0a',
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
                      {/* Static overlay - HEAVIER */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dust})`,
                        mixBlendMode: 'overlay',
                        opacity: 0.8,
                      }} />
                    </div>

                    {/* Caption - MORE CHAOTIC */}
                    <div style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '14px',
                      color: '#1a1a1a',
                      marginTop: '6px',
                      textAlign: 'center',
                      transform: 'rotate(-2deg) translateX(-0.5px)',
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
                    background: 'rgba(139, 0, 0, 0.9)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    cursor: 'pointer',
                    zIndex: 3,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
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
                    transform: 'rotate(0.4deg) translateX(0.5px)',
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Value:</span> {photo.value}
                  </div>
                  <div style={{ 
                    marginBottom: '6px',
                    transform: 'rotate(-0.5deg) translateX(-0.6px)',
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Tier:</span>{' '}
                    <span style={{
                      padding: '2px 8px',
                      background: photo.tier === 'S' ? '#22c55e' : photo.tier === 'A' ? '#f59e0b' : '#8B4513',
                      color: '#fff',
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      {photo.tier}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '17px',
                    color: '#8b0000',
                    marginTop: '8px',
                    fontWeight: 'bold',
                    transform: 'rotate(0.6deg) translateX(0.7px)',
                    textShadow: '1.5px 1.5px 3px rgba(139,0,0,0.4)',
                  }}>
                    {photo.notes}
                  </div>
                </div>

                {/* Fingerprint stamps - MORE */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '45px',
                  height: '55px',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
                  transform: 'rotate(30deg)',
                  pointerEvents: 'none',
                }} />

                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '10px',
                    width: '40px',
                    height: '50px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
                    transform: 'rotate(-20deg)',
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
            transform: 'rotate(0.3deg)',
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
                background: i === 0 ? '#8B0000' : '#c4b49a',
                color: i === 0 ? '#fff' : '#1a0f0a',
                padding: '8px 12px',
                fontSize: '10px',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                borderRadius: '0 4px 4px 0',
                boxShadow: '3px 3px 8px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                border: i === 0 ? '2px solid #4a0000' : 'none',
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

export default MediaMock_2;
