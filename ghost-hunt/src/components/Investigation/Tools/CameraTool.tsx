import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import smoothPlastic from '../../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../../assets/texture/scratchedplasticdark.png';
import wrinkledPaper from '../../../assets/texture/wrinkledpaper.png';
import dust from '../../../assets/texture/dust.png';
import dirtyGlass from '../../../assets/texture/dirtyglass.png';
import filmgrain from '../../../assets/texture/filmgrain.png';
import tape from '../../../assets/texture/tape.png';
import { useGhostRelationship } from '../../../hooks/useGhostRelationship';
import { useInvestigationStore } from '../../../stores/investigationStore';
import { determineCameraManifestation, calculateEMFLevel } from '../../../utils/toolBehaviors';
import type { PhotoEntry } from '../../../stores/investigationStore';

/**
 * CameraTool - Production component for Polaroid ghost camera
 * 
 * Shows viewfinder with REC indicator, timestamp, and photo capture
 * 
 * Supports two modes:
 * - 'view': Inventory viewer mode with internal mock state
 * - 'investigation': Active investigation mode with real camera data
 * 
 * Design reference: src/ui-playground/tools/CameraViewfinderMock.tsx
 */

export interface CameraToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props
  filmCount?: number;
  battery?: number;
  onCapture?: () => void;
}

const CameraToolComponent = ({
  mode,
  filmCount = 10,
  battery = 72,
  onCapture,
}: CameraToolProps) => {
  // Internal state for view mode
  const [recording] = useState(true);
  const [timestamp, setTimestamp] = useState('23:47:12');
  const [mockBattery, setMockBattery] = useState(72);
  const [shutterReady, setShutterReady] = useState(true);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [viewfinderGlow, setViewfinderGlow] = useState(0.16);
  const [screenFlash, setScreenFlash] = useState(false);
  
  // ✅ Use centralized ghost relationship hook (single source of truth)
  const relationship = useGhostRelationship();
  
  // Get investigation store state and actions
  const cameraLocked = useInvestigationStore((state) => state.cameraLocked);
  const investigationFilmCount = useInvestigationStore((state) => state.filmCount);
  const lockCamera = useInvestigationStore((state) => state.lockCamera);
  const capturePhoto = useInvestigationStore((state) => state.capturePhoto);
  
  // Use investigation film count in investigation mode, prop in view mode
  const effectiveFilmCount = mode === 'investigation' ? investigationFilmCount : filmCount;

  // Memoize battery calculation
  const effectiveBattery = useMemo(() => 
    mode === 'view' ? mockBattery : battery,
    [mode, mockBattery, battery]
  );

  useEffect(() => {
    // Timestamp update
    const timeInterval = setInterval(() => {
      const now = new Date();
      setTimestamp(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    }, 1000);

    // Battery drain (view mode only)
    const batteryInterval = mode === 'view' ? setInterval(() => {
      setMockBattery((prev) => Math.max(0, prev - 1));
    }, 30000) : null;

    // Viewfinder glow pulse
    const glowInterval = setInterval(() => {
      setViewfinderGlow((prev) => (prev === 0.16 ? 0.22 : 0.16));
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      if (batteryInterval) clearInterval(batteryInterval);
      clearInterval(glowInterval);
    };
  }, [mode]);

  // Memoize shutter click handler
  const handleShutterClick = useCallback(() => {
    // Check if camera is locked (cooldown active)
    if (mode === 'investigation' && cameraLocked) {
      return; // Camera is developing, don't allow capture
    }
    
    if (!shutterReady) return;
    
    // Check if we have film
    if (mode === 'investigation' && effectiveFilmCount <= 0) {
      return; // No film available
    }
    
    setShutterReady(false);
    setShowPhotoPreview(true);
    setViewfinderGlow(0.35);
    setScreenFlash(true);
    
    // Investigation mode: Capture photo with manifestation
    if (mode === 'investigation' && relationship.isValid && relationship.ghostBehavior) {
      // ✅ Use centralized relationship data
      const distance = relationship.distance;
      const manifestations = relationship.ghostBehavior.cameraManifestations || [];
      const emfPersonality = relationship.ghostBehavior.emfPersonality;
      
      // ✅ Calculate EMF level to check if ghost is close enough
      const emfLevel = calculateEMFLevel(distance, emfPersonality);
      
      // ✅ Check if ghost is RIGHT in front (narrow cone ±15°)
      // relativeBearing: 0° = straight ahead, 180° = directly behind, 360° = also straight ahead
      const relativeBearing = relationship.relativeBearing;
      // Calculate angle difference from straight ahead (0°)
      // Handle wraparound: 350° is only 10° away from 0° (wraps around)
      let angleDiff: number;
      if (relativeBearing <= 180) {
        angleDiff = relativeBearing; // 0-180°: difference is just the bearing
      } else {
        angleDiff = 360 - relativeBearing; // 180-360°: difference wraps around (e.g., 350° = 10° from 0°)
      }
      const isRightInFront = angleDiff <= 15; // Within ±15° of straight ahead
      
      // ✅ Camera requirements:
      // 1. Ghost must be RIGHT in front (within ±15°)
      // 2. EMF level must be 3-5 (ghost is close enough)
      let manifestation: string | null = null;
      
      if (isRightInFront && emfLevel >= 3 && emfLevel <= 5) {
        // Ghost is right in front AND EMF is 3-5 - use normal probability logic
        const manifestationResult = determineCameraManifestation(distance, manifestations);
        manifestation = manifestationResult ? manifestationResult : null;
      } else {
        // Ghost is not right in front OR EMF is too low - zero chance of manifestation
        manifestation = null;
      }
      
      // Create photo entry with 'developing' status
      // Manifestation will be revealed after 7 seconds
      const photoEntry: PhotoEntry = {
        id: `photo-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal
        manifestation: manifestation, // Stored but hidden until status is 'ready'
        status: 'developing', // Photo is developing, manifestation hidden
      };
      
      // Store photo in investigation store (this also decrements film count)
      capturePhoto(photoEntry);
      
      // Lock camera for 7 seconds
      lockCamera();
      
      console.log('📸 Photo captured:', {
        distance: distance.toFixed(1) + 'm',
        bearing: relationship.bearing.toFixed(1) + '°',
        relativeBearing: relationship.relativeBearing.toFixed(1) + '°',
        isRightInFront: isRightInFront,
        emfLevel: emfLevel,
        emfRequirement: emfLevel >= 3 && emfLevel <= 5 ? '✓' : '✗',
        manifestation: manifestation || 'Nothing captured (not in front or EMF too low)',
        filmRemaining: effectiveFilmCount - 1,
      });
    }
    
    // Call onCapture callback if provided
    if (onCapture) {
      onCapture();
    }
    
    // Screen flash effect
    setTimeout(() => {
      setScreenFlash(false);
      setViewfinderGlow(0.16);
    }, 200);
    
    // Reset shutter ready after animation
    setTimeout(() => {
      setShutterReady(true);
      setTimeout(() => setShowPhotoPreview(false), 4000);
    }, 500);
  }, [
    shutterReady,
    mode,
    onCapture,
    cameraLocked,
    effectiveFilmCount,
    relationship.isValid,
    relationship.distance,
    relationship.ghostBehavior,
    capturePhoto,
    lockCamera,
  ]);
  
  // Determine if shutter should be disabled
  const isShutterDisabled = mode === 'investigation' 
    ? (cameraLocked || effectiveFilmCount <= 0 || !relationship.isValid)
    : !shutterReady;
  
  // Determine developing status
  const isDeveloping = mode === 'investigation' && cameraLocked;

  return (
    <>
      <style>{`
        @keyframes photoEject {
          0% { transform: translateY(0) scale(0.85); opacity: 0; }
          50% { transform: translateY(-15px) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) scale(1.05); opacity: 0.95; }
        }
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
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
        background: screenFlash ? '#ffffff' : '#0a0a0a',
        transition: 'background 0.2s ease',
      }}>
        
        {/* DEVELOPING... Overlay */}
        {isDeveloping && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            fontFamily: '"Courier New", monospace',
            fontSize: '32px',
            color: '#ffff00',
            textShadow: '0 0 20px #ffff00, 0 0 10px rgba(255,255,0,0.8)',
            letterSpacing: '4px',
            fontWeight: 'bold',
            animation: 'blink 1s infinite',
            pointerEvents: 'none',
          }}>
            DEVELOPING...
          </div>
        )}
        
        {/* MAIN DEVICE BODY - Full-frame vertical Polaroid camera shape */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
          
          {/* DEVICE CASING - Black rubberized plastic texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              url(${smoothPlastic}),
              linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
            `,
            backgroundSize: '300px 300px, cover',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundBlendMode: 'overlay, normal',
            borderRadius: '16px 16px 20px 20px',
            boxShadow: `
              inset 0 4px 8px rgba(255,255,255,0.04),
              inset 0 -12px 20px rgba(0,0,0,0.95),
              inset 6px 0 12px rgba(0,0,0,0.9),
              inset -6px 0 12px rgba(0,0,0,0.9),
              0 25px 40px rgba(0,0,0,0.6),
              0 10px 18px rgba(0,0,0,0.4)
            `,
          }}>
            
            {/* TEXTURE LAYERS */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${smoothPlastic})`,
              backgroundSize: '250px 250px',
              backgroundRepeat: 'repeat',
              mixBlendMode: 'multiply',
              opacity: 0.5,
              pointerEvents: 'none',
              borderRadius: '16px 16px 20px 20px',
              zIndex: 1,
            }} />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
              pointerEvents: 'none',
              borderRadius: '16px 16px 20px 20px',
              zIndex: 2,
            }} />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.08,
              pointerEvents: 'none',
              borderRadius: '16px 16px 20px 20px',
              zIndex: 3,
            }} />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.12,
              pointerEvents: 'none',
              borderRadius: '16px 16px 20px 20px',
              zIndex: 4,
            }} />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.8) 100%)',
              opacity: 0.6,
              pointerEvents: 'none',
              borderRadius: '16px 16px 20px 20px',
              zIndex: 5,
            }} />

            {/* VIEWFINDER - Deep inset with thick bezel */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90vw, 800px)',
              aspectRatio: '4 / 3',
              zIndex: 11,
            }}>
              {/* Viewfinder bezel frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#050505',
                borderRadius: '6px',
                boxShadow: `
                  inset 0 4px 8px rgba(255,255,255,0.03),
                  inset 0 -12px 24px rgba(0,0,0,0.98),
                  inset 0 35px 80px rgba(0,0,0,0.99),
                  0 0 50px rgba(0,0,0,0.95)
                `,
                overflow: 'hidden',
              }}>
                
                {/* Viewfinder glow - EMF style */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `
                    radial-gradient(circle at 50% 45%, rgba(0, 255, 180, ${viewfinderGlow}), transparent 65%),
                    radial-gradient(circle at 50% 100%, rgba(0, 255, 120, ${viewfinderGlow * 0.7}), transparent 70%)
                  `,
                  mixBlendMode: 'screen',
                  borderRadius: '6px',
                  zIndex: 1,
                  transition: 'background 0.3s ease',
                }} />
                
                {/* Scanline effect when active */}
                {viewfinderGlow > 0.25 && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(180deg, transparent, rgba(0,255,180,0.3), transparent)',
                    animation: 'scanline 0.8s linear infinite',
                    pointerEvents: 'none',
                    zIndex: 6,
                  }} />
                )}

                {/* Viewfinder content */}
                <div style={{
                  position: 'absolute',
                  inset: '10px',
                  background: 'radial-gradient(ellipse at center, #1a1a2a 0%, #0a0a15 100%)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  zIndex: 2,
                }}>
                  {/* Simulated dark scene */}
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '20%',
                    width: '100px',
                    height: '150px',
                    background: 'rgba(30,30,40,0.6)',
                    filter: 'blur(3px)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '30%',
                    width: '80px',
                    height: '120px',
                    background: 'rgba(25,25,35,0.5)',
                    filter: 'blur(4px)',
                  }} />

                  {/* Film grain */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${filmgrain})`,
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'overlay',
                    opacity: 0.6,
                    pointerEvents: 'none',
                    animation: 'grain 8s steps(10) infinite',
                  }} />

                  {/* Dust particles */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${dust})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'screen',
                    opacity: 0.2,
                    pointerEvents: 'none',
                  }} />

                  {/* Viewfinder corners */}
                  {[
                    { top: '8px', left: '8px', borders: 'top left' },
                    { top: '8px', right: '8px', borders: 'top right' },
                    { bottom: '8px', left: '8px', borders: 'bottom left' },
                    { bottom: '8px', right: '8px', borders: 'bottom right' },
                  ].map((corner, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        ...corner,
                        width: '28px',
                        height: '28px',
                        borderTop: corner.borders.includes('top') ? '3px solid rgba(45, 212, 191, 0.6)' : 'none',
                        borderLeft: corner.borders.includes('left') ? '3px solid rgba(45, 212, 191, 0.6)' : 'none',
                        borderRight: corner.borders.includes('right') ? '3px solid rgba(45, 212, 191, 0.6)' : 'none',
                        borderBottom: corner.borders.includes('bottom') ? '3px solid rgba(45, 212, 191, 0.6)' : 'none',
                        borderRadius: corner.borders === 'top left' ? '4px 0 0 0' :
                                     corner.borders === 'top right' ? '0 4px 0 0' :
                                     corner.borders === 'bottom left' ? '0 0 0 4px' : '0 0 4px 0',
                        pointerEvents: 'none',
                        zIndex: 3,
                      }}
                    />
                  ))}

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
                      background: 'rgba(255, 255, 255, 0.5)',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      width: '2px',
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.5)',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                    }} />
                  </div>

                  {/* REC indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 25,
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: recording ? '#ff0000' : '#660000',
                      boxShadow: recording ? '0 0 10px #ff0000' : 'none',
                      animation: recording ? 'blink 1s infinite' : 'none',
                    }} />
                    <div style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px',
                      color: '#ff0000',
                      textShadow: '0 0 8px #ff0000, 0 0 4px rgba(255,0,0,0.5)',
                      letterSpacing: '2px',
                      fontWeight: 'bold',
                      filter: 'blur(0.3px)',
                    }}>
                      REC
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '16px',
                    color: '#ffff00',
                    textShadow: '0 0 8px rgba(255,255,0,0.8)',
                    letterSpacing: '2px',
                    zIndex: 25,
                  }}>
                    {timestamp}
                  </div>

                  {/* Battery indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    color: effectiveBattery < 20 ? '#ff0000' : '#00ff00',
                    textShadow: `0 0 6px ${effectiveBattery < 20 ? '#ff0000' : '#00ff00'}`,
                    letterSpacing: '1px',
                    zIndex: 25,
                  }}>
                    BATT {effectiveBattery}%
                  </div>

                  {/* Camera info overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '11px',
                    color: '#ffffff',
                    textShadow: '0 0 6px #ffffff',
                    opacity: 0.7,
                    letterSpacing: '1px',
                    zIndex: 25,
                  }}>
                    <div>F 2.8</div>
                    <div>ISO 3200</div>
                    <div>IR MODE</div>
                  </div>
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
                  borderRadius: '6px',
                  zIndex: 5,
                }} />

                {/* Viewfinder vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
                  pointerEvents: 'none',
                  borderRadius: '6px',
                  zIndex: 4,
                }} />
              </div>

              {/* Bezel screws - 4 corners */}
              {[
                { top: '8px', left: '8px' },
                { top: '8px', right: '8px' },
                { bottom: '8px', left: '8px' },
                { bottom: '8px', right: '8px' },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...pos,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
                    boxShadow: `
                      inset 0 1px 2px rgba(255,255,255,0.1),
                      inset 0 -1px 2px rgba(0,0,0,0.8),
                      0 2px 4px rgba(0,0,0,0.6)
                    `,
                    zIndex: 12,
                  }}
                />
              ))}
            </div>

            {/* FILM EJECTION SLOT */}
            <div style={{
              position: 'absolute',
              top: '58%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(80vw, 600px)',
              height: '10px',
              zIndex: 12,
            }}>
              {/* Slot outer frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0a0a',
                borderRadius: '5px',
                boxShadow: `
                  inset 0 3px 6px rgba(0,0,0,0.95),
                  inset 0 -3px 6px rgba(255,255,255,0.03),
                  0 2px 8px rgba(0,0,0,0.8)
                `,
              }}>
                {/* Slot inner shadow */}
                <div style={{
                  position: 'absolute',
                  inset: '2px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)',
                  borderRadius: '3px',
                }} />
                
                {/* Alignment arrow */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '6px solid rgba(100,100,100,0.3)',
                }} />
              </div>

              {/* Warning labels */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-0.3deg)',
                fontFamily: '"Courier New", monospace',
                fontSize: '9px',
                color: 'rgba(200,200,200,0.4)',
                textAlign: 'center',
                letterSpacing: '0.5px',
                zIndex: 13,
              }}>
                DO NOT PULL FILM
              </div>
              <div style={{
                position: 'absolute',
                top: '28px',
                left: '50%',
                transform: 'translateX(-50%) rotate(0.2deg)',
                fontFamily: '"Courier New", monospace',
                fontSize: '8px',
                color: 'rgba(200,200,200,0.35)',
                textAlign: 'center',
                letterSpacing: '0.5px',
                zIndex: 13,
              }}>
                SHAKE AT OWN RISK
              </div>
            </div>

            {/* SHUTTER BUTTON - Bottom right */}
            <div
              onClick={handleShutterClick}
              style={{
                position: 'absolute',
                bottom: '12%',
                right: '8%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: !isShutterDisabled
                  ? 'radial-gradient(circle at 30% 30%, #ff8844 0%, #ff6622 40%, #cc4400 100%)'
                  : 'radial-gradient(circle at 30% 30%, #884422 0%, #663311 40%, #442200 100%)',
                boxShadow: !isShutterDisabled
                  ? `
                    inset 0 2px 4px rgba(255,255,255,0.3),
                    inset 0 -3px 6px rgba(0,0,0,0.8),
                    0 4px 12px rgba(0,0,0,0.8),
                    0 0 20px rgba(255,136,68,0.4)
                  `
                  : `
                    inset 0 2px 4px rgba(0,0,0,0.9),
                    inset 0 -2px 4px rgba(255,255,255,0.1),
                    0 2px 6px rgba(0,0,0,0.8)
                  `,
                cursor: !isShutterDisabled ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                zIndex: 20,
                border: '3px solid rgba(0,0,0,0.6)',
                opacity: isShutterDisabled ? 0.5 : 1,
              }}
            >
              {/* Shutter icon */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.8)',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)',
              }} />
            </div>

            {/* Status LED */}
            <div style={{
              position: 'absolute',
              bottom: '12%',
              left: '8%',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: !isShutterDisabled ? '#00ff00' : '#ff0000',
              boxShadow: !isShutterDisabled
                ? '0 0 12px #00ff00, inset 0 1px 2px rgba(255,255,255,0.3)'
                : '0 0 12px #ff0000, inset 0 1px 2px rgba(255,255,255,0.3)',
              animation: !isShutterDisabled ? 'none' : 'blink 0.5s infinite',
              zIndex: 20,
            }} />
            
            {/* Film Counter */}
            {mode === 'investigation' && (
              <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                color: effectiveFilmCount <= 0 ? '#ff0000' : '#00ff00',
                textShadow: `0 0 8px ${effectiveFilmCount <= 0 ? '#ff0000' : '#00ff00'}`,
                letterSpacing: '2px',
                zIndex: 20,
              }}>
                FILM: {effectiveFilmCount}
              </div>
            )}

            {/* DAMAGE & WEAR ELEMENTS */}
            
            {/* Corner screws */}
            {[
              { top: '24px', left: '24px' },
              { top: '24px', right: '24px' },
              { bottom: '24px', left: '24px' },
              { bottom: '24px', right: '24px' },
            ].map((pos, i) => (
              <div
                key={`corner-screw-${i}`}
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

            {/* Tape label */}
            <div style={{
              position: 'absolute',
              top: '16%',
              right: '10%',
              width: '80px',
              height: '28px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              transform: 'rotate(5deg)',
              opacity: 0.75,
              zIndex: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '11px',
                color: '#1a1a1a',
                transform: 'rotate(-1deg)',
                fontWeight: 'bold',
              }}>
                POLAROID-1985
              </div>
            </div>

            {/* Scratches */}
            {[
              { top: '22%', left: '8%', width: '90px', angle: -18 },
              { top: '68%', right: '10%', width: '70px', angle: 22 },
              { bottom: '22%', left: '12%', width: '60px', angle: -12 },
            ].map((scratch, i) => (
              <div
                key={`scratch-${i}`}
                style={{
                  position: 'absolute',
                  ...(scratch.top ? { top: scratch.top } : {}),
                  ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
                  ...(scratch.left ? { left: scratch.left } : {}),
                  ...(scratch.right ? { right: scratch.right } : {}),
                  width: scratch.width,
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                  transform: `rotate(${scratch.angle}deg)`,
                  opacity: 0.4,
                  zIndex: 6,
                }}
              />
            ))}

            {/* Serial number label */}
            <div style={{
              position: 'absolute',
              bottom: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: '"Courier New", monospace',
              fontSize: '9px',
              color: 'rgba(100,100,100,0.3)',
              letterSpacing: '1px',
              zIndex: 8,
            }}>
              SN: POL-CAM-1985-GH
            </div>
          </div>
        </div>

        {/* Global film grain overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${filmgrain})`,
          backgroundSize: '200% 200%',
          mixBlendMode: 'overlay',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 50,
          animation: 'grain 8s steps(10) infinite',
        }} />
      </div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const CameraTool = memo(CameraToolComponent);
export default CameraTool;
