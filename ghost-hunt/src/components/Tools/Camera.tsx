// Camera tool - Full-screen Polaroid/Handheld Camcorder Hybrid
// Analog horror instant camera with rubberized plastic body
import { useState, useEffect } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import smoothPlastic from '../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../assets/texture/scratchedplasticdark.png';
import wrinkledPaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import filmgrain from '../../assets/texture/filmgrain.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';

export function Camera() {
  const { suppliesForRun, photos, takePhoto } = useInvestigation();
  const [isFlashing, setIsFlashing] = useState(false);
  const [showNoFilmWarning, setShowNoFilmWarning] = useState(false);
  const [showDevelopingWarning, setShowDevelopingWarning] = useState(false);
  const [shutterPressed, setShutterPressed] = useState(false);
  const [recentPhoto, setRecentPhoto] = useState<string | null>(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);

  // Check if there's a photo currently developing
  const hasPhotosDeveloping = photos.some((photo) => photo.status === 'developing');

  // Get the most recent completed photo
  useEffect(() => {
    const completedPhoto = photos
      .filter((p) => p.status === 'ready')
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0];
    
    // Generate a data URL for the photo preview (since Photo doesn't have imageUrl)
    if (completedPhoto) {
      // Create a simple placeholder image data URL
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#2d2d2d';
        ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
        setRecentPhoto(canvas.toDataURL());
      }
    }
  }, [photos]);

  const handleShutterClick = () => {
    // Check if a photo is still developing
    if (hasPhotosDeveloping) {
      setShowDevelopingWarning(true);
      setTimeout(() => setShowDevelopingWarning(false), 2000);
      return;
    }

    const success = takePhoto();
    
    if (success) {
      // Shutter press animation
      setShutterPressed(true);
      setTimeout(() => setShutterPressed(false), 100);
      
      // Flash effect
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);

      // Show photo preview after a delay (simulating ejection)
      setTimeout(() => {
        setShowPhotoPreview(true);
        setTimeout(() => setShowPhotoPreview(false), 4000);
      }, 800);
    } else {
      // Show "no film" warning
      setShowNoFilmWarning(true);
      setTimeout(() => setShowNoFilmWarning(false), 2000);
    }
  };

  return (
    <>
      <style>{`
        @keyframes photoEject {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(1.05);
            opacity: 0.95;
          }
        }
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        {/* Background vignette */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
          opacity: 0.3,
          zIndex: 0,
        }} />

        {/* MAIN DEVICE CONTAINER - Centered, handheld Polaroid-style */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 750px)',
          height: 'min(90vh, 900px)',
          maxWidth: '750px',
          maxHeight: '900px',
          zIndex: 1,
        }}>
          
          {/* ============================================ */}
          {/* CAMERA BODY - Rubberized plastic casing */}
          {/* ============================================ */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              url(${smoothPlastic}),
              linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #111111 100%)
            `,
            backgroundSize: '300px 300px, cover',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundBlendMode: 'overlay, normal',
            borderRadius: '12px',
            boxShadow: `
              inset 0 4px 8px rgba(255,255,255,0.04),
              inset 0 -10px 18px rgba(0,0,0,0.9),
              inset 5px 0 10px rgba(0,0,0,0.9),
              inset -5px 0 10px rgba(0,0,0,0.9),
              0 20px 35px rgba(0,0,0,0.55),
              0 8px 15px rgba(0,0,0,0.35)
            `,
          }}>
            
            {/* Body vignette */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
              opacity: 0.5,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 5,
            }} />

            {/* Additional smooth plastic texture layer */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${smoothPlastic})`,
              backgroundSize: '250px 250px',
              backgroundRepeat: 'repeat',
              mixBlendMode: 'multiply',
              opacity: 0.5,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 1,
            }} />

            {/* Scratched plastic overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 2,
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
              mixBlendMode: 'screen',
              opacity: 0.08,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 3,
            }} />

            {/* Wrinkled paper overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.12,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 4,
            }} />

            {/* ============================================ */}
            {/* VIEWFINDER - Deep inset with beveled frame */}
            {/* ============================================ */}
            <div style={{
              position: 'absolute',
              top: '12%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(78vw, 480px)',
              aspectRatio: '4 / 3',
              zIndex: 11,
            }}>
              {/* Viewfinder frame - Deep inset */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#050505',
                borderRadius: '8px',
                boxShadow: `
                  inset 0 3px 6px rgba(255,255,255,0.04),
                  inset 0 -8px 16px rgba(0,0,0,0.95),
                  inset 0 30px 70px rgba(0,0,0,0.99),
                  0 0 40px rgba(0,0,0,0.9)
                `,
                overflow: 'hidden',
              }}>
                {/* Viewfinder glow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `
                    radial-gradient(circle at 50% 45%, rgba(45, 212, 191, 0.16), transparent 65%),
                    radial-gradient(circle at 50% 100%, rgba(45, 212, 191, 0.12), transparent 70%)
                  `,
                  mixBlendMode: 'screen',
                  borderRadius: '8px',
                  zIndex: 1,
                  boxShadow: '0 0 25px rgba(45, 212, 191, 0.25)',
                }} />

                {/* Viewfinder content - Live view */}
                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  zIndex: 2,
                }}>
                  {/* Film grain overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${filmgrain})`,
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'overlay',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    animation: 'grain 8s steps(10) infinite',
                  }} />

                  {/* Viewfinder corners */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    width: '30px',
                    height: '30px',
                    borderTop: '3px solid rgba(45, 212, 191, 0.6)',
                    borderLeft: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRadius: '4px 0 0 0',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '30px',
                    height: '30px',
                    borderTop: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRight: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRadius: '0 4px 0 0',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    width: '30px',
                    height: '30px',
                    borderBottom: '3px solid rgba(45, 212, 191, 0.6)',
                    borderLeft: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRadius: '0 0 0 4px',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '30px',
                    height: '30px',
                    borderBottom: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRight: '3px solid rgba(45, 212, 191, 0.6)',
                    borderRadius: '0 0 4px 0',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }} />

                  {/* Crosshair */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    pointerEvents: 'none',
                    zIndex: 4,
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'rgba(45, 212, 191, 0.5)',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 4px rgba(45, 212, 191, 0.4)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      width: '2px',
                      height: '100%',
                      background: 'rgba(45, 212, 191, 0.5)',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 4px rgba(45, 212, 191, 0.4)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'rgba(45, 212, 191, 0.8)',
                      boxShadow: '0 0 8px rgba(45, 212, 191, 0.6)',
                    }} />
                  </div>

                  {/* Focus ring */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    border: '2px dashed rgba(45, 212, 191, 0.4)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 3,
                    opacity: 0.6,
                    animation: 'pulse 2s ease-in-out infinite',
                  }} />
                </div>

                {/* Dirty glass overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${dirtyGlass})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay',
                  opacity: 0.15,
                  pointerEvents: 'none',
                  borderRadius: '8px',
                  zIndex: 5,
                }} />
              </div>
            </div>

            {/* ============================================ */}
            {/* PHOTO EJECTION SLOT - Polaroid-style */}
            {/* ============================================ */}
            <div style={{
              position: 'absolute',
              top: '58%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(60vw, 360px)',
              height: '8px',
              backgroundColor: '#0a0a0a',
              borderRadius: '4px',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.9),
                inset 0 -2px 4px rgba(255,255,255,0.05),
                0 2px 8px rgba(0,0,0,0.8)
              `,
              zIndex: 12,
            }}>
              {/* Slot inner shadow */}
              <div style={{
                position: 'absolute',
                inset: '2px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)',
                borderRadius: '2px',
              }} />
            </div>

            {/* ============================================ */}
            {/* POLAROID PHOTO PREVIEW - Ejects when photo taken */}
            {/* ============================================ */}
            {showPhotoPreview && recentPhoto && (
              <div style={{
                position: 'absolute',
                top: '62%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(55vw, 320px)',
                zIndex: 20,
                animation: 'photoEject 0.8s ease-out forwards',
                pointerEvents: 'none',
              }}>
                {/* Polaroid frame */}
                <div style={{
                  background: '#e8e4dc',
                  padding: '12px 12px 45px 12px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
                  borderRadius: '2px',
                }}>
                  {/* Photo content */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: '#1a1a1a',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '2px',
                  }}>
                    <img 
                      src={recentPhoto} 
                      alt="Evidence"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    
                    {/* Film grain overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${filmgrain})`,
                      backgroundSize: '200% 200%',
                      mixBlendMode: 'overlay',
                      opacity: 0.6,
                      pointerEvents: 'none',
                      animation: 'grain 8s steps(10) infinite',
                    }} />
                  </div>

                  {/* Handwritten caption */}
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '17px',
                    color: '#1a1a1a',
                    marginTop: '8px',
                    textAlign: 'center',
                    transform: 'rotate(-0.5deg)',
                  }}>
                    evidence photo
                  </div>
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* CAMERA CONTROLS - Film counter, info, shutter */}
            {/* ============================================ */}
            
            {/* Film Counter Display */}
            <div style={{
              position: 'absolute',
              bottom: '18%',
              left: '8%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '10px 16px',
              background: 'rgba(0,0,0,0.6)',
              border: '2px solid rgba(45, 212, 191, 0.3)',
              borderRadius: '10px',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.5),
                0 0 12px rgba(45, 212, 191, 0.2)
              `,
              minWidth: '90px',
              zIndex: 15,
            }}>
              <div style={{
                fontSize: '10px',
                color: 'rgba(45, 212, 191, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: '"Courier New", monospace',
                fontWeight: 600,
              }}>
                FILM
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: suppliesForRun.film === 0 ? 'rgba(239, 68, 68, 1)' : 'rgba(45, 212, 191, 1)',
                textShadow: suppliesForRun.film === 0 
                  ? '0 0 12px rgba(239, 68, 68, 0.6)' 
                  : '0 0 12px rgba(45, 212, 191, 0.6)',
                fontFamily: '"Courier New", monospace',
                lineHeight: 1,
              }}>
                {suppliesForRun.film > 0 ? suppliesForRun.film : '00'}
              </div>
              <div style={{
                fontSize: '20px',
                filter: 'drop-shadow(0 0 4px rgba(45, 212, 191, 0.4))',
              }}>
                🎞️
              </div>
            </div>

            {/* Camera Info Display */}
            <div style={{
              position: 'absolute',
              bottom: '18%',
              right: '8%',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              zIndex: 15,
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 10px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: '6px',
              }}>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(45, 212, 191, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: '"Courier New", monospace',
                }}>
                  F/
                </span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'rgba(45, 212, 191, 0.9)',
                  fontFamily: '"Courier New", monospace',
                }}>
                  2.8
                </span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 10px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: '6px',
              }}>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(45, 212, 191, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: '"Courier New", monospace',
                }}>
                  ISO
                </span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'rgba(45, 212, 191, 0.9)',
                  fontFamily: '"Courier New", monospace',
                }}>
                  400
                </span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 10px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: '6px',
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'rgba(45, 212, 191, 0.9)',
                  fontFamily: '"Courier New", monospace',
                }}>
                  1/60
                </span>
              </div>
            </div>

            {/* Shutter Button */}
            <button
              onClick={handleShutterClick}
              disabled={suppliesForRun.film === 0 || hasPhotosDeveloping}
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: `4px solid ${
                  suppliesForRun.film === 0 
                    ? 'rgba(239, 68, 68, 0.5)' 
                    : hasPhotosDeveloping 
                    ? 'rgba(251, 191, 36, 0.5)' 
                    : 'rgba(45, 212, 191, 0.5)'
                }`,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 26, 0.98) 100%)',
                cursor: suppliesForRun.film === 0 || hasPhotosDeveloping ? 'not-allowed' : 'pointer',
                pointerEvents: 'auto',
                transition: 'all 0.2s ease',
                boxShadow: `
                  0 8px 24px rgba(0,0,0,0.6),
                  0 0 20px ${
                    suppliesForRun.film === 0 
                      ? 'rgba(239, 68, 68, 0.3)' 
                      : hasPhotosDeveloping 
                      ? 'rgba(251, 191, 36, 0.3)' 
                      : 'rgba(45, 212, 191, 0.3)'
                  },
                  inset 0 2px 4px rgba(45, 212, 191, 0.1)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 16,
                opacity: (suppliesForRun.film === 0 || hasPhotosDeveloping) ? 0.5 : 1,
                transform: shutterPressed 
                  ? 'translateX(-50%) scale(0.95)' 
                  : 'translateX(-50%) scale(1)',
              }}
              onMouseEnter={(e) => {
                if (suppliesForRun.film > 0 && !hasPhotosDeveloping) {
                  e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!shutterPressed) {
                  e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
                }
              }}
            >
              {hasPhotosDeveloping ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(251, 191, 36, 0.3)',
                    borderTopColor: 'rgba(251, 191, 36, 1)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <span style={{
                    fontSize: '9px',
                    color: 'rgba(251, 191, 36, 0.9)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 600,
                  }}>
                    DEVELOPING
                  </span>
                </div>
              ) : (
                <div style={{
                  fontSize: '40px',
                  filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.6))',
                }}>
                  📸
                </div>
              )}
            </button>

            {/* ============================================ */}
            {/* WEAR & DAMAGE - Screws, tape, scratches */}
            {/* ============================================ */}
            
            {/* Corner screws */}
            {[
              { top: '20px', left: '20px' },
              { top: '20px', right: '20px' },
              { bottom: '20px', left: '20px' },
              { bottom: '20px', right: '20px' },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...pos,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255,255,255,0.1),
                    inset 0 -1px 2px rgba(0,0,0,0.8),
                    0 2px 4px rgba(0,0,0,0.6)
                  `,
                  zIndex: 6,
                }}
              />
            ))}

            {/* Tape patch */}
            <div style={{
              position: 'absolute',
              top: '15%',
              right: '12%',
              width: '60px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              transform: 'rotate(8deg)',
              opacity: 0.7,
              zIndex: 7,
            }} />

            {/* Scratches */}
            {[
              { top: '25%', left: '10%', width: '80px', angle: -15 },
              { top: '70%', right: '15%', width: '60px', angle: 20 },
            ].map((scratch, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: scratch.top,
                  [scratch.left ? 'left' : 'right']: scratch.left || scratch.right,
                  width: scratch.width,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  transform: `rotate(${scratch.angle}deg)`,
                  opacity: 0.4,
                  zIndex: 6,
                }}
              />
            ))}

            {/* Labels */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: '"Caveat", cursive',
              fontSize: '14px',
              color: 'rgba(200,200,200,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              zIndex: 8,
            }}>
              POLAROID-1985
            </div>

            <div style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: 'rgba(100,100,100,0.3)',
              letterSpacing: '1px',
              zIndex: 8,
            }}>
              SERIAL: P-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </div>
          </div>
        </div>

        {/* Flash Effect */}
        {isFlashing && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 100,
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'white',
              opacity: 0.95,
              animation: 'flash 0.3s ease-out',
            }} />
          </div>
        )}

        {/* Film Grain Overlay - Global */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${filmgrain})`,
          backgroundSize: '200% 200%',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 50,
          animation: 'grain 8s steps(10) infinite',
        }} />

        {/* No Film Warning */}
        {showNoFilmWarning && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 32px',
            background: 'rgba(15, 23, 42, 0.98)',
            border: '2px solid rgba(239, 68, 68, 0.6)',
            borderRadius: '16px',
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.6),
              0 0 24px rgba(239, 68, 68, 0.4)
            `,
            zIndex: 200,
            animation: 'warning-pulse 0.5s ease-in-out',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: '32px' }}>⚠️</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: '"Courier New", monospace',
                color: 'rgba(239, 68, 68, 1)',
              }}>
                NO FILM
              </div>
              <div style={{
                fontSize: '12px',
                opacity: 0.8,
                fontFamily: '"Courier New", monospace',
                color: 'rgba(239, 68, 68, 0.9)',
              }}>
                Collect film supplies
              </div>
            </div>
          </div>
        )}

        {/* Developing Warning */}
        {showDevelopingWarning && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 32px',
            background: 'rgba(15, 23, 42, 0.98)',
            border: '2px solid rgba(251, 191, 36, 0.6)',
            borderRadius: '16px',
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.6),
              0 0 24px rgba(251, 191, 36, 0.4)
            `,
            zIndex: 200,
            animation: 'warning-pulse 0.5s ease-in-out',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: '32px' }}>⏳</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: '"Courier New", monospace',
                color: 'rgba(251, 191, 36, 1)',
              }}>
                DEVELOPING
              </div>
              <div style={{
                fontSize: '12px',
                opacity: 0.8,
                fontFamily: '"Courier New", monospace',
                color: 'rgba(251, 191, 36, 0.9)',
              }}>
                Wait for photo to develop
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes flash {
          0% { opacity: 0.95; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes warning-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </>
  );
}
