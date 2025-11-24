import { useState, useEffect, useMemo, memo } from 'react';
import metalTexture from '../../../assets/texture/metalscratchedtexture.png';
import plasticDark from '../../../assets/texture/scratchedplasticdark.png';
import dust from '../../../assets/texture/dust.png';
import rust from '../../../assets/texture/brownrust.png';
import tape from '../../../assets/texture/tape.png';
import filmgrain from '../../../assets/texture/filmgrain.png';

/**
 * EMFTool - Production component for K-II style EMF meter
 * 
 * Shows electromagnetic field levels (0-5) with LED bar graph
 * 
 * Supports two modes:
 * - 'view': Inventory viewer mode with internal mock state
 * - 'investigation': Active investigation mode with real EMF data
 * 
 * Design reference: src/ui-playground/tools/EMFMeterMock.tsx
 */

export interface EMFToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props
  emfLevel?: number;           // 0-5 (EMF reading level)
  isFlickering?: boolean;      // Level 5 flickering effect
  lastSpikeTime?: number;      // Timestamp of last spike
}

const EMFToolComponent = ({
  mode,
  emfLevel = 0,
  isFlickering = false,
  lastSpikeTime,
}: EMFToolProps) => {
  // Internal state for view mode
  const [mockEmfLevel, setMockEmfLevel] = useState(0);
  const [mockFlickering, setMockFlickering] = useState(false);

  // Memoize EMF data calculations
  const effectiveEmfLevel = useMemo(() => 
    mode === 'view' ? mockEmfLevel : emfLevel,
    [mode, mockEmfLevel, emfLevel]
  );
  
  const effectiveFlickering = useMemo(() => 
    mode === 'view' ? mockFlickering : isFlickering,
    [mode, mockFlickering, isFlickering]
  );

  useEffect(() => {
    if (mode === 'view') {
      let animationId: number;
      let lastTime = performance.now();
      
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        
        // Throttle to ~1.25fps (800ms per frame)
        if (deltaTime >= 800) {
          lastTime = currentTime;
          
          // Random EMF spikes for demo
          const spike = Math.random();
          if (spike > 0.95) {
            setMockEmfLevel(5);
            setMockFlickering(true);
            setTimeout(() => setMockFlickering(false), 200);
          } else if (spike > 0.85) {
            setMockEmfLevel(Math.floor(Math.random() * 3) + 2);
          } else {
            setMockEmfLevel(Math.random() > 0.7 ? 1 : 0);
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [mode]);

  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
        
        @keyframes ledFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
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
        {/* Layer 0: Background */}
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
        
        {/* Layer 1: Device Casing - HEAVY STEEL (match Radar) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
          boxShadow: 
            'inset 0 6px 12px rgba(255,255,255,0.06), ' +
            'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
            'inset 4px 0 8px rgba(0,0,0,0.9), ' +
            'inset -4px 0 8px rgba(0,0,0,0.9)',
          zIndex: 1,
        }}>
          
          {/* Uneven lighting - Hotspot top-left, falloff bottom-right */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 85% 85%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          
          {/* Directional brushed-metal texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 10px)',
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          {/* Deeper beveled edges */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '12px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '12px',
            background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          {/* Device Architecture: Top Section */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10%',
            background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
            borderBottom: '2px solid rgba(0,0,0,0.8)',
            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
          }} />
          
          {/* Device Architecture: Middle Section (LED area) */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: 0,
            right: 0,
            bottom: '25%',
            background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
          }} />
          
          {/* Device Architecture: Bottom Section */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25%',
            background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
            borderTop: '2px solid rgba(0,0,0,0.8)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }} />
          
          {/* Metal texture overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${metalTexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          {/* Rust overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${rust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          
          {/* Dust layer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 4,
          }} />
          
          {/* Additional plastic dark texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${plasticDark})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.25,
            pointerEvents: 'none',
            zIndex: 5,
          }} />
          
          {/* LED Display Panel */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '400px',
            height: '45%',
            background: '#0a0a0a',
            borderRadius: '8px',
            boxShadow: 
              'inset 0 8px 20px rgba(0,0,0,0.95), ' +
              'inset 0 4px 10px rgba(0,0,0,0.9), ' +
              '0 2px 6px rgba(0,0,0,0.8)',
            border: '3px solid #1a1a1a',
            zIndex: 11,
          }}>
            {/* LED Matrix - 5 columns × 8 segments */}
            <div style={{
              display: 'flex',
              gap: '10px',
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 21,
              padding: '12px',
              alignItems: 'flex-end',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}>
              {[1, 2, 3, 4, 5].map((level) => {
                const isActive = effectiveEmfLevel >= level;
                const colors = ['#00ff55', '#00ff55', '#ffff00', '#ff8800', '#ff0000'];
                const darkColors = ['#002200', '#002200', '#332200', '#331100', '#220000'];
                const color = colors[level - 1];
                const darkColor = darkColors[level - 1];
                const segmentsPerColumn = 8;
                
                return (
                  <div
                    key={level}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      flex: 1,
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {[...Array(segmentsPerColumn)].map((_, segmentIndex) => {
                      const reverseIndex = segmentsPerColumn - 1 - segmentIndex;
                      const segmentActive = isActive && (reverseIndex < (effectiveEmfLevel >= level ? segmentsPerColumn : 0));
                      
                      const isLevel5 = level === 5 && effectiveEmfLevel >= 5;
                      
                      let activeColor = color;
                      let activeDark = darkColor;
                      if (isLevel5) {
                        activeColor = '#ff0000';
                        activeDark = '#440000';
                      }
                      
                      const baseBrightness = segmentActive 
                        ? (isLevel5 ? 1.0 : 0.9 + Math.random() * 0.1)
                        : 0.08;
                      
                      const pulse = isLevel5 ? (Math.sin(Date.now() / 100) * 0.15 + 1) : 1;
                      const shimmer = segmentActive ? (Math.sin(Date.now() / 200 + segmentIndex * 0.5) * 0.05 + 1) : 1;
                      const flickerOpacity = effectiveFlickering && segmentActive ? 0.65 : (baseBrightness * shimmer * pulse);
                      
                      const brightnessVariation = 0.95 + Math.random() * 0.1;
                      const finalOpacity = flickerOpacity * brightnessVariation;
                      
                      return (
                        <div
                          key={`${level}-${segmentIndex}`}
                          style={{
                            width: '100%',
                            flex: 1,
                            minHeight: '10px',
                            background: segmentActive
                              ? `linear-gradient(to top, ${activeColor}, ${activeColor}aa, ${activeDark}88)`
                              : '#0a0a0a',
                            borderRadius: '3px',
                            boxShadow: segmentActive
                              ? isLevel5
                                ? `0 0 20px ${activeColor}, 0 0 40px ${activeColor}dd, 0 0 60px ${activeColor}aa, inset 0 2px 4px rgba(255,255,255,0.5)`
                                : `0 0 10px ${activeColor}, 0 0 20px ${activeColor}dd, inset 0 2px 4px rgba(255,255,255,0.4)`
                              : 'inset 0 1px 2px rgba(0,0,0,0.95)',
                            opacity: finalOpacity,
                            transition: isLevel5 ? 'opacity 0.05s' : 'opacity 0.1s',
                            position: 'relative',
                            border: segmentActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.7)',
                            filter: segmentActive 
                              ? isLevel5 
                                ? `blur(0.3px) brightness(${shimmer * pulse * brightnessVariation}) contrast(1.2)`
                                : `blur(0.2px) brightness(${shimmer * brightnessVariation})`
                              : 'none',
                          }}
                        >
                          {/* Film grain overlay */}
                          {segmentActive && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundImage: `url(${filmgrain})`,
                              backgroundSize: 'cover',
                              mixBlendMode: 'screen',
                              opacity: 0.3,
                              pointerEvents: 'none',
                            }} />
                          )}
                          
                          {/* LED glow bleed */}
                          {segmentActive && (
                            <div style={{
                              position: 'absolute',
                              left: '-3px',
                              right: '-3px',
                              top: '20%',
                              bottom: '20%',
                              background: `linear-gradient(90deg, transparent, ${color}33, ${color}44, ${color}33, transparent)`,
                              filter: 'blur(3px)',
                              pointerEvents: 'none',
                              zIndex: -1,
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            {/* Level labels */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-around',
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: 'rgba(200,200,200,0.5)',
              zIndex: 22,
            }}>
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} style={{ flex: 1, textAlign: 'center' }}>
                  {level}
                </div>
              ))}
            </div>
          </div>
          
          {/* Handwritten label */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '25px',
            fontFamily: '"Caveat", cursive',
            fontSize: '13px',
            color: 'rgba(200,200,200,0.5)',
            transform: 'rotate(-1.2deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.3), ' +
              '0 1px 2px rgba(0,0,0,0.9), ' +
              '1px 1px 3px rgba(0,0,0,0.8)',
            letterSpacing: '0.5px',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            EMF METER
          </div>
          
          {/* Model name */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '25px',
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.45)',
            transform: 'rotate(0.8deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            letterSpacing: '1px',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            K-II METER
          </div>
          
          {/* Serial number */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '25px',
            fontFamily: '"Courier New", monospace',
            fontSize: '8px',
            color: 'rgba(150,150,150,0.45)',
            transform: 'rotate(0.4deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            SN: EMF-2019-K2
          </div>
          
          {/* Calibration note */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '25px',
            fontFamily: '"Caveat", cursive',
            fontSize: '10px',
            color: 'rgba(180,180,150,0.45)',
            transform: 'rotate(-0.5deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            cal. 03/19
          </div>
          
          {/* Additional damage elements from mock */}
          
          {/* Calibration screw */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '6%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #3a3a3a 0%, #1a1a1a 60%, #0a0a0a 100%)',
            boxShadow: 
              'inset 0 1px 2px rgba(255,255,255,0.1), ' +
              'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
              '0 2px 4px rgba(0,0,0,0.8)',
            border: '1px solid rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '6px',
              height: '0.5px',
              background: '#0a0a0a',
            }} />
          </div>
          
          {/* Warning light (red LED indicator) */}
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: effectiveEmfLevel >= 4 
              ? 'radial-gradient(circle at 30% 30%, #ff0000 0%, #aa0000 50%, #660000 100%)'
              : 'radial-gradient(circle at 30% 30%, #3a1a1a 0%, #1a0a0a 60%, #0a0a0a 100%)',
            boxShadow: effectiveEmfLevel >= 4
              ? `0 0 8px rgba(255,0,0,0.8), 0 0 16px rgba(255,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.9)`
              : 'inset 0 1px 2px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)',
            border: '1px solid rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'all 0.3s',
          }} />
          
          {/* Fake toggle switch */}
          <div style={{
            position: 'absolute',
            top: '8%',
            right: '12%',
            width: '24px',
            height: '14px',
            borderRadius: '7px',
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
            boxShadow: 
              'inset 0 2px 4px rgba(0,0,0,0.9), ' +
              'inset 0 -1px 2px rgba(255,255,255,0.1), ' +
              '0 2px 4px rgba(0,0,0,0.8)',
            border: '1px solid rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <div style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #0a0a0a 100%)',
              boxShadow: 
                'inset 0 1px 2px rgba(255,255,255,0.15), ' +
                'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                '0 1px 2px rgba(0,0,0,0.8)',
              transition: 'left 0.2s',
            }} />
          </div>
          
          {/* Micro-indentations (small dents/scratches) */}
          {[
            { top: '18%', left: '7%', size: '3px' },
            { top: '42%', right: '7%', size: '2.5px' },
            { bottom: '22%', left: '7%', size: '3px' },
            { top: '28%', left: '50%', size: '2px', transform: 'translateX(-50%)' },
          ].map((dent, i) => (
            <div
              key={`dent-${i}`}
              style={{
                position: 'absolute',
                ...(dent.top ? { top: dent.top } : {}),
                ...(dent.bottom ? { bottom: dent.bottom } : {}),
                ...(dent.left ? { left: dent.left } : {}),
                ...(dent.right ? { right: dent.right } : {}),
                ...(dent.transform ? { transform: dent.transform } : {}),
                width: dent.size,
                height: dent.size,
                background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                borderRadius: '50%',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.8)',
                pointerEvents: 'none',
                zIndex: 9,
              }}
            />
          ))}
          
          {/* Industrial vent slits (like radar) */}
          {[
            { left: '3%', top: '18%', bottom: '27%', count: 8 },
            { right: '3%', top: '18%', bottom: '27%', count: 8 },
            { left: '5%', top: '60%', bottom: '68%', count: 6 },
            { right: '5%', top: '60%', bottom: '68%', count: 6 },
          ].map((vent, i) => (
            <div
              key={`vent-${i}`}
              style={{
                position: 'absolute',
                ...(vent.left ? { left: vent.left } : {}),
                ...(vent.right ? { right: vent.right } : {}),
                top: vent.top,
                bottom: vent.bottom,
                width: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                pointerEvents: 'none',
              }}
            >
              {[...Array(vent.count)].map((_, j) => (
                <div
                  key={j}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.95) 100%)',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.9)',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
          ))}
          
          {/* Tape patches with edges overhanging frame */}
          {[
            { top: '5%', left: '-8px', width: '60px', height: '18px', rotation: -2.5, opacity: 0.7 },
            { bottom: '15%', right: '-10px', width: '55px', height: '16px', rotation: 1.8, opacity: 0.65 },
            { top: '12%', left: '8%', width: '45px', height: '14px', rotation: 0.5, opacity: 0.6 },
          ].map((tapeItem, i) => (
            <div
              key={`tape-${i}`}
              style={{
                position: 'absolute',
                ...(tapeItem.top ? { top: tapeItem.top } : {}),
                ...(tapeItem.bottom ? { bottom: tapeItem.bottom } : {}),
                ...(tapeItem.left ? { left: tapeItem.left } : {}),
                ...(tapeItem.right ? { right: tapeItem.right } : {}),
                width: tapeItem.width,
                height: tapeItem.height,
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: tapeItem.opacity,
                transform: `rotate(${tapeItem.rotation}deg)`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
                pointerEvents: 'none',
                zIndex: 12,
              }}
            />
          ))}
          
          {/* BAT OK label on tape */}
          <div style={{
            position: 'absolute',
            bottom: '25px',
            right: '8%',
            fontFamily: '"Courier New", monospace',
            fontSize: '8px',
            color: 'rgba(150,150,150,0.45)',
            transform: 'rotate(0.3deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            BAT OK
          </div>
          
        </div>
        {/* End of device casing */}
      </div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const EMFTool = memo(EMFToolComponent);
export default EMFTool;
