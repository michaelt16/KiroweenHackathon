
// Texture imports
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';
import ghost1 from '../assets/images/ghost1.png';
import ghost2 from '../assets/images/ghost2.png';

// Media Mock 3 - Cleaner Codex version (personal book the agent carries)
export function MediaMock_3() {
  const photos = [
    { id: 1, title: 'Ghost Manifestation', value: '$40', tier: 'S', notes: 'Clear apparition', image: ghost1 },
    { id: 2, title: 'EMF Spike', value: '$20', tier: 'A', notes: 'Level 5 reading', image: ghost2 },
    { id: 3, title: 'Fingerprints', value: '$15', tier: 'B', notes: 'On door handle', image: ghost1 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1612',
      padding: '20px 10px',
      position: 'relative',
    }}>
      {/* Cleaner Journal Page */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#f4f0e6', // Lighter, cleaner paper
        borderRadius: '6px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.7)',
        padding: '40px 25px',
        position: 'relative',
        minHeight: '700px',
        transform: 'rotate(-0.2deg)', // Minimal tilt
      }}>
        {/* Subtle dust overlay only */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.15, // Very subtle
          pointerEvents: 'none',
        }} />

        {/* Subtle edge darkening */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)', // Much lighter
          pointerEvents: 'none',
        }} />

        {/* Clean grid background */}
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
              rgba(139, 69, 19, 0.06) 25px,
              rgba(139, 69, 19, 0.06) 26px
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
            borderBottom: '2px solid #8B4513',
          }}>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#2d1810',
              marginBottom: '8px',
              textAlign: 'center',
              letterSpacing: '1px',
            }}>
              MEDIA - PHOTOS
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '13px',
              color: '#8B4513',
              textAlign: 'center',
            }}>
              Evidence Captured: {photos.length}/3
            </div>
          </div>

          {/* Photo entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                style={{
                  position: 'relative',
                  paddingBottom: '18px',
                  borderBottom: index < photos.length - 1 ? '1px solid #d4c4a8' : 'none',
                }}
              >
                {/* Polaroid photo - CLEANER */}
                <div style={{
                  position: 'relative',
                  width: '180px',
                  margin: '0 auto 15px',
                  transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`, // Minimal tilt
                }}>
                  {/* Tape - cleaner */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`,
                    width: '70px',
                    height: '25px',
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    zIndex: 2,
                    opacity: 0.8,
                  }} />

                  {/* Polaroid frame - CLEANER */}
                  <div style={{
                    background: '#faf8f3',
                    padding: '10px 10px 35px 10px',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
                    border: '1px solid #e0dcd4',
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
                      {/* Minimal static overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dust})`,
                        mixBlendMode: 'overlay',
                        opacity: 0.3, // Very subtle
                      }} />
                    </div>

                    {/* Caption - CLEANER */}
                    <div style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '14px',
                      color: '#2d1810',
                      marginTop: '6px',
                      textAlign: 'center',
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
                    background: 'rgba(139, 69, 19, 0.8)',
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

                {/* Photo details - CLEANER */}
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  color: '#2d1810',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold' }}>Value:</span> {photo.value}
                  </div>
                  <div style={{ marginBottom: '6px' }}>
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
                    fontSize: '15px',
                    color: '#8B4513',
                    marginTop: '8px',
                  }}>
                    {photo.notes}
                  </div>
                </div>
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

        {/* Side tabs - CLEANER */}
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
                background: i === 0 ? '#8B4513' : '#f4f0e6',
                color: i === 0 ? '#fff' : '#2d1810',
                padding: '8px 12px',
                fontSize: '10px',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                borderRadius: '0 4px 4px 0',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                border: '1px solid #d4c4a8',
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Bookmark ribbon */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '60px',
          width: '30px',
          height: '80px',
          background: 'linear-gradient(180deg, #8B4513 0%, #6d3410 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
        }} />
      </div>
    </div>
  );
}

export default MediaMock_3;
