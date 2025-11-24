
// Texture imports
import coffeestain from '../assets/texture/coffeestain.png';
import corkboardtexture from '../assets/texture/corkboardtexture.png';
import dust from '../assets/texture/dust.png';
import wrinkledpaper from '../assets/texture/wrinkledpaper.png';
import ghost1 from '../assets/images/ghost1.png';
import ghost2 from '../assets/images/ghost2.png';

// Media Mock 4 - Hybrid version with cork board + taped photos inside the book
export function MediaMock_4() {
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
      {/* Journal with Cork Board Insert */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#2d2419', // Leather journal cover
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '15px',
        position: 'relative',
        minHeight: '700px',
        transform: 'rotate(-0.4deg)',
      }}>
        {/* Leather texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 2px,
              transparent 10px
            )
          `,
          borderRadius: '8px',
          pointerEvents: 'none',
        }} />

        {/* Cork board page inside */}
        <div style={{
          background: '#8b7355',
          borderRadius: '4px',
          padding: '30px 20px',
          position: 'relative',
          minHeight: '670px',
        }}>
          {/* Cork texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${corkboardtexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.9,
            pointerEvents: 'none',
            borderRadius: '4px',
          }} />

          {/* Darkening edges */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Title card pinned to cork */}
            <div style={{
              background: '#f4f0e6',
              padding: '15px',
              marginBottom: '25px',
              transform: 'rotate(-0.5deg)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              border: '2px solid #8B4513',
              position: 'relative',
            }}>
              {/* Push pin */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                backgroundColor: '#dc2626',
                borderRadius: '50% 50% 50% 0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                zIndex: 2,
              }} />

              {/* Wrinkled overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledpaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.5,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  marginBottom: '6px',
                  textAlign: 'center',
                }}>
                  MEDIA - PHOTOS
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  color: '#8B4513',
                  textAlign: 'center',
                }}>
                  Evidence: {photos.length}/3
                </div>
              </div>
            </div>

            {/* Photos pinned to cork board */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Polaroid pinned to cork */}
                  <div style={{
                    position: 'relative',
                    width: '180px',
                    transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`,
                  }}>
                    {/* Push pin */}
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#dc2626',
                      borderRadius: '50% 50% 50% 0',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                      zIndex: 3,
                    }} />

                    {/* Polaroid frame */}
                    <div style={{
                      background: '#e8e4dc',
                      padding: '10px 10px 35px 10px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
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
                      background: 'rgba(220, 38, 38, 0.9)',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      cursor: 'pointer',
                      zIndex: 4,
                    }}>
                      🗑️
                    </div>
                  </div>

                  {/* Info card pinned below photo */}
                  <div style={{
                    marginTop: '15px',
                    background: '#fef3c7',
                    padding: '12px',
                    width: '160px',
                    transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    position: 'relative',
                  }}>
                    {/* Push pin */}
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#dc2626',
                      borderRadius: '50% 50% 50% 0',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                      zIndex: 2,
                    }} />

                    <div style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '12px',
                      color: '#1a1a1a',
                      textAlign: 'center',
                    }}>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>Value:</span> {photo.value}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>Tier:</span>{' '}
                        <span style={{
                          padding: '2px 6px',
                          background: photo.tier === 'S' ? '#22c55e' : photo.tier === 'A' ? '#f59e0b' : '#8B4513',
                          color: '#fff',
                          borderRadius: '2px',
                          fontSize: '10px',
                        }}>
                          {photo.tier}
                        </span>
                      </div>
                      <div style={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: '14px',
                        color: '#8B4513',
                        marginTop: '6px',
                      }}>
                        {photo.notes}
                      </div>
                    </div>
                  </div>

                  {/* String connecting photo to info card */}
                  <div style={{
                    position: 'absolute',
                    top: '160px',
                    left: '50%',
                    width: '1px',
                    height: '30px',
                    background: 'rgba(139, 69, 19, 0.3)',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              ))}
            </div>

            {/* Page number on cork */}
            <div style={{
              marginTop: '25px',
              textAlign: 'center',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              color: '#f4f0e6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}>
              Page 1 of 1
            </div>
          </div>

          {/* Coffee stain on cork */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            right: '30px',
            width: '100px',
            height: '100px',
            backgroundImage: `url(${coffeestain})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.5,
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Side tabs on leather cover */}
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
                background: i === 0 ? '#8B4513' : '#3d2f1f',
                color: '#fff',
                padding: '8px 12px',
                fontSize: '10px',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                borderRadius: '0 4px 4px 0',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                border: i === 0 ? '2px solid #d4c4a8' : 'none',
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

export default MediaMock_4;
