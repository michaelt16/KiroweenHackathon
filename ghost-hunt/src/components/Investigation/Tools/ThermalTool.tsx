import { useState, useEffect, useMemo, memo } from 'react';
import smoothPlastic from '../../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../../assets/texture/scratchedplasticdark.png';
import wrinkledPaper from '../../../assets/texture/wrinkledpaper.png';
import dirtyGlass from '../../../assets/texture/dirtyglass.png';
import dust from '../../../assets/texture/dust.png';
import tape from '../../../assets/texture/tape.png';
import filmgrain from '../../../assets/texture/filmgrain.png';
import crtTexture from '../../../assets/texture/crtexture.png';

/**
 * ThermalTool - Production component for FLIR E5-style thermal scanner
 * 
 * Shows thermal gradient display with cold spot detection
 * 
 * Supports two modes:
 * - 'view': Inventory viewer mode with internal mock state
 * - 'investigation': Active investigation mode with real thermal data
 * 
 * Design reference: src/ui-playground/tools/ThermalScannerMock.tsx
 */

export interface ThermalToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props
  coldSpots?: Array<{ x: number; y: number; intensity: number }>;
  temperature?: number;
  hotSpotDetected?: boolean;
}

const ThermalToolComponent = ({
  mode,
  coldSpots = [],
  temperature = 68,
  hotSpotDetected = false,
}: ThermalToolProps) => {
  // Internal state for view mode
  const [mockColdSpot, setMockColdSpot] = useState({ x: 150, y: 120, intensity: 0 });
  const [mockScanLines, setMockScanLines] = useState(0);
  const [mockTemperature, setMockTemperature] = useState(68);
  const [mockHotSpot, setMockHotSpot] = useState(false);

  // Memoize data calculations
  const effectiveColdSpots = useMemo(() => 
    mode === 'view' ? [mockColdSpot] : coldSpots,
    [mode, mockColdSpot, coldSpots]
  );
  
  const effectiveTemperature = useMemo(() => 
    mode === 'view' ? mockTemperature : temperature,
    [mode, mockTemperature, temperature]
  );
  
  const effectiveHotSpot = useMemo(() => 
    mode === 'view' ? mockHotSpot : hotSpotDetected,
    [mode, mockHotSpot, hotSpotDetected]
  );
  
  const scanLines = mockScanLines;

  useEffect(() => {
    if (mode === 'view') {
      let animationId: number;
      let lastTime = performance.now();
      
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        
        // Throttle to ~20fps (50ms per frame)
        if (deltaTime >= 50) {
          lastTime = currentTime;
          
          setMockScanLines((prev) => (prev + 1) % 100);
          
          // Random cold spot movement
          if (Math.random() > 0.95) {
            setMockColdSpot({
              x: 80 + Math.random() * 160,
              y: 60 + Math.random() * 120,
              intensity: 0.6 + Math.random() * 0.4,
            });
            setMockTemperature(68 - (mockColdSpot.intensity * 30));
          }
          
          // Random hot spot detection
          if (Math.random() > 0.97) {
            setMockHotSpot(true);
            setTimeout(() => setMockHotSpot(false), 3000);
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [mode, mockColdSpot.intensity]);

  const isFreezingCold = effectiveTemperature < 40;
  const isCold = effectiveTemperature < 50;

  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
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
        {/* Background */}
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
        
        {/* MAIN DEVICE CONTAINER - Full-frame handheld */}
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
          
          {/* TOP-HEAVY "HEAD" SECTION - Professional tool head */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '55%',
            zIndex: 10,
          }}>
            {/* Top head section - Black rubberized plastic with smooth texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
              background: `
                url(${smoothPlastic}),
                linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #111111 100%)
              `,
              backgroundSize: '300px 300px, cover',
              backgroundRepeat: 'repeat, no-repeat',
              backgroundBlendMode: 'overlay, normal',
              borderRadius: '10px 10px 4px 4px',
              boxShadow: 
                'inset 0 4px 8px rgba(255,255,255,0.04), ' +
                'inset 0 -10px 18px rgba(0,0,0,0.9), ' +
                'inset 5px 0 10px rgba(0,0,0,0.9), ' +
                'inset -5px 0 10px rgba(0,0,0,0.9), ' +
                '0 12px 26px rgba(0,0,0,0.9)',
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
                clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
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
                opacity: 0.4,
                pointerEvents: 'none',
                clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
                zIndex: 2,
              }} />
              
              {/* Dark plastic scratch texture */}
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
                clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
                zIndex: 3,
              }} />
              
              {/* Dust / micro-noise */}
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
                clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
                zIndex: 4,
              }} />
              
              {/* Beveled edges */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '16px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                clipPath: 'polygon(8% 0%, 92% 0%, 98% 100%, 2% 100%)',
                pointerEvents: 'none',
                zIndex: 4,
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '12px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
                clipPath: 'polygon(8% 0%, 92% 0%, 98% 100%, 2% 100%)',
                pointerEvents: 'none',
                zIndex: 4,
              }} />
              
              {/* Light scratches */}
              {[
                { top: '15%', left: '10%', width: '50px', angle: -15, opacity: 0.3 },
                { top: '25%', right: '8%', width: '45px', angle: 20, opacity: 0.25 },
                { top: '35%', left: '12%', width: '60px', angle: -18, opacity: 0.4 },
                { bottom: '20%', left: '15%', width: '50px', angle: -25, opacity: 0.38 },
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
                    height: '1px',
                    background: 'rgba(255,255,255,0.15)',
                    transform: `rotate(${scratch.angle}deg)`,
                    opacity: scratch.opacity,
                    pointerEvents: 'none',
                    zIndex: 6,
                  }}
                />
              ))}
              
              {/* Small tape patch on corner */}
              <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '6%',
                width: '40px',
                height: '18px',
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                transform: 'rotate(-12deg)',
                opacity: 0.7,
                boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 7,
              }} />
              
              {/* Worn edges & corner distress */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 3%, transparent 97%, rgba(255,255,255,0.05) 100%),
                  linear-gradient(0deg, rgba(255,255,255,0.05) 0%, transparent 3%, transparent 97%, rgba(255,255,255,0.05) 100%)
                `,
                clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
                filter: 'contrast(1.05) brightness(0.98)',
                mixBlendMode: 'overlay',
                opacity: 0.22,
                pointerEvents: 'none',
                zIndex: 6,
              }} />
              
              {/* Corner chipping */}
              {[
                { top: '0', left: '0', width: '25px', height: '25px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' },
                { top: '0', right: '0', width: '25px', height: '25px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)' },
                { bottom: '0', left: '8%', width: '20px', height: '20px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)' },
                { bottom: '0', right: '8%', width: '20px', height: '20px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)' },
              ].map((chip, i) => (
                <div
                  key={`chip-${i}`}
                  style={{
                    position: 'absolute',
                    ...(chip.top ? { top: chip.top } : {}),
                    ...(chip.bottom ? { bottom: chip.bottom } : {}),
                    ...(chip.left ? { left: chip.left } : {}),
                    ...(chip.right ? { right: chip.right } : {}),
                    width: chip.width,
                    height: chip.height,
                    background: 'linear-gradient(135deg, #111111 0%, #0a0a0a 50%, #000 100%)',
                    clipPath: chip.clipPath,
                    opacity: 0.8,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    zIndex: 7,
                  }}
                />
              ))}
              
              {/* Horizontal scratch lines near top */}
              {[
                { top: '8%', left: '10%', right: '10%', opacity: 0.3 },
                { top: '12%', left: '8%', right: '8%', opacity: 0.25 },
                { top: '16%', left: '12%', right: '12%', opacity: 0.28 },
              ].map((scratch, i) => (
                <div
                  key={`h-scratch-${i}`}
                  style={{
                    position: 'absolute',
                    top: scratch.top,
                    left: scratch.left,
                    right: scratch.right,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.2), rgba(255,255,255,0.15), transparent)',
                    opacity: scratch.opacity,
                    pointerEvents: 'none',
                    zIndex: 7,
                  }}
                />
              ))}
              
              {/* Tiny bumps where screws would be */}
              {[
                { top: '20%', left: '0', side: 'left' },
                { top: '60%', left: '0', side: 'left' },
                { top: '20%', right: '0', side: 'right' },
                { top: '60%', right: '0', side: 'right' },
              ].map((bump, i) => (
                <div
                  key={`bump-${i}`}
                  style={{
                    position: 'absolute',
                    top: bump.top,
                    ...(bump.left !== undefined ? { left: bump.left } : {}),
                    ...(bump.right !== undefined ? { right: bump.right } : {}),
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(50,50,50,0.6) 0%, rgba(0,0,0,0.8) 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    zIndex: 7,
                    transform: bump.side === 'left' ? 'translateX(-50%)' : 'translateX(50%)',
                  }}
                />
              ))}
              
              {/* Injection-mold seams on edges */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '5%',
                right: '5%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 6,
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '8%',
                right: '8%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 6,
              }} />
              
              {/* Curvature highlights - Fake curved plastic on top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '30%',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 30%, transparent 70%)',
                clipPath: 'polygon(8% 0%, 92% 0%, 98% 100%, 2% 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }} />
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '15%',
                right: '15%',
                height: '25%',
                background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 80%)',
                clipPath: 'polygon(8% 0%, 92% 0%, 98% 100%, 2% 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }} />
              
              {/* Screws on SIDES */}
              {[
                { top: '20%', left: '0', side: 'left' },
                { top: '60%', left: '0', side: 'left' },
                { top: '20%', right: '0', side: 'right' },
                { top: '60%', right: '0', side: 'right' },
              ].map((screw, i) => (
                <div
                  key={`screw-${i}`}
                  style={{
                    position: 'absolute',
                    top: screw.top,
                    ...(screw.left !== undefined ? { left: screw.left } : {}),
                    ...(screw.right !== undefined ? { right: screw.right } : {}),
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, rgba(80,80,80,0.8) 0%, rgba(40,40,40,0.7) 40%, rgba(0,0,0,0.95) 100%)',
                    boxShadow: 
                      'inset 0 2px 3px rgba(255,255,255,0.2), ' +
                      'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                      '0 2px 6px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,0,0,0.8)',
                    zIndex: 21,
                    transform: screw.side === 'left' ? 'translateX(-50%)' : 'translateX(50%)',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '6px',
                    height: '0.5px',
                    background: '#000',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    width: '6px',
                    height: '0.5px',
                    background: '#000',
                  }} />
                </div>
              ))}
              
              {/* Labels - Lower contrast, printed on body feel */}
              {[
                { top: '30px', left: '18%', label: 'MODE', fontSize: '9px' },
                { top: '30px', left: '35%', label: 'ZOOM', fontSize: '9px' },
                { top: '30px', right: '25%', label: 'IR/UV', fontSize: '9px' },
              ].map((label, i) => (
                <div
                  key={`label-${i}`}
                  style={{
                    position: 'absolute',
                    top: label.top,
                    ...(label.left ? { left: label.left } : {}),
                    ...(label.right ? { right: label.right } : {}),
                    fontFamily: '"Courier New", monospace',
                    fontSize: label.fontSize,
                    color: 'rgba(100,100,100,0.4)',
                    textShadow: 
                      '0 -1px 1px rgba(255,255,255,0.1), ' +
                      '0 1px 2px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    zIndex: 20,
                    letterSpacing: '0.5px',
                    fontWeight: '400',
                  }}
                >
                  {label.label}
                </div>
              ))}
              
              {/* Fingerprint smudges */}
              {[
                { top: '20%', left: '10%', size: '24px', opacity: 0.2 },
                { top: '50%', right: '8%', size: '22px', opacity: 0.18 },
              ].map((smudge, i) => (
                <div
                  key={`smudge-${i}`}
                  style={{
                    position: 'absolute',
                    ...(smudge.top ? { top: smudge.top } : {}),
                    ...(smudge.left ? { left: smudge.left } : {}),
                    ...(smudge.right ? { right: smudge.right } : {}),
                    width: smudge.size,
                    height: smudge.size,
                    background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    filter: 'blur(3px)',
                    zIndex: 6,
                  }}
                />
              ))}
              
              {/* FLIR-1985 label */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%) rotate(0.5deg)',
                fontFamily: '"Courier New", monospace',
                fontSize: '10px',
                color: 'rgba(200,200,200,0.5)',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 20,
              }}>
                FLIR-1985
              </div>
              
              {/* WARNING label */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '15%',
                fontFamily: '"Courier New", monospace',
                fontSize: '7px',
                color: 'rgba(255,150,0,0.6)',
                textShadow: '0 0 4px rgba(255,150,0,0.4), 0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 20,
              }}>
                ⚠ WARNING
              </div>
              
              {/* HOT SPOT WARNING label */}
              <div style={{
                position: 'absolute',
                bottom: '5%',
                right: '8%',
                fontFamily: '"Caveat", cursive',
                fontSize: '11px',
                color: 'rgba(255,150,0,0.5)',
                transform: 'rotate(-2deg)',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 20,
              }}>
                HOT SPOT WARNING
              </div>
            </div>
            
            {/* Screen frame - EMF-style bezel with dark metal feel */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90vw, 800px)',
              aspectRatio: '4 / 3',
              backgroundColor: '#050505',
              borderRadius: '6px',
              boxShadow: 
                'inset 0 3px 6px rgba(255,255,255,0.04), ' +
                'inset 0 -8px 16px rgba(0,0,0,0.95), ' +
                '0 0 40px rgba(0,0,0,0.9)',
              zIndex: 11,
            }}>
              
              {/* Screen glow - EMF style */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                background: `
                  radial-gradient(circle at 50% 45%, rgba(0, 255, 180, 0.16), transparent 65%),
                  radial-gradient(circle at 50% 100%, rgba(0, 255, 80, 0.12), transparent 70%)
                `,
                mixBlendMode: 'screen',
                zIndex: 1,
                borderRadius: '6px',
                ...(effectiveHotSpot ? {
                  boxShadow: '0 0 50px rgba(255, 120, 0, 0.55)',
                  transition: 'box-shadow 0.18s ease-out',
                } : {
                  boxShadow: '0 0 25px rgba(0, 255, 100, 0.25)',
                  transition: 'box-shadow 0.18s ease-out',
                }),
              }} />
              
              {/* THERMAL SCREEN */}
              <div style={{
                position: 'absolute',
                top: '4%',
                left: '4%',
                right: '4%',
                bottom: '4%',
                borderRadius: '4px',
                background: '#1a0a2a',
                boxShadow: 
                  'inset 0 12px 30px rgba(0,0,0,0.95), ' +
                  'inset 0 6px 15px rgba(0,0,0,0.9), ' +
                  'inset 0 0 80px rgba(100,150,255,0.25)',
                border: '2px solid #000',
                overflow: 'hidden',
                zIndex: 2,
              }}>
                {/* Thermographic gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(ellipse at 30% 40%, rgba(40,20,60,0.95) 0%, rgba(20,10,40,0.85) 30%, rgba(10,5,25,0.75) 60%, rgba(5,2,15,0.9) 100%),
                    radial-gradient(ellipse at 70% 60%, rgba(20,40,80,0.7) 0%, rgba(10,20,50,0.6) 40%, transparent 80%),
                    linear-gradient(180deg, 
                      rgba(120,80,180,0.4) 0%, 
                      rgba(80,120,220,0.3) 20%,
                      rgba(120,170,255,0.25) 40%,
                      rgba(255,200,100,0.2) 60%,
                      rgba(255,150,50,0.15) 80%,
                      rgba(255,255,255,0.1) 100%
                    )
                  `,
                  zIndex: 1,
                }} />
                
                {/* IR noise pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    repeating-linear-gradient(0deg, transparent 0px, rgba(100,150,255,0.03) 1px, transparent 2px),
                    repeating-linear-gradient(90deg, transparent 0px, rgba(100,150,255,0.02) 1px, transparent 2px)
                  `,
                  backgroundSize: '4px 4px, 4px 4px',
                  opacity: 0.6,
                  pointerEvents: 'none',
                  zIndex: 2,
                }} />
                
                {/* Scanlines */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(100,150,255,0.05) 1px, transparent 2px)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }} />
                
                {/* Moving scanline */}
                <div style={{
                  position: 'absolute',
                  top: `${scanLines}%`,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(100,150,255,0.6), rgba(100,150,255,0.8), rgba(100,150,255,0.6), transparent)',
                  boxShadow: '0 0 12px rgba(100,150,255,0.8)',
                  pointerEvents: 'none',
                  zIndex: 11,
                }} />
                
                {/* CRT texture */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${crtTexture})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'screen',
                  opacity: 0.1,
                  pointerEvents: 'none',
                  zIndex: 3,
                }} />
                
                {/* Film grain */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${filmgrain})`,
                  backgroundSize: '150% 150%',
                  backgroundPosition: `${Math.sin(Date.now() / 200) * 10 + 50}% ${Math.cos(Date.now() / 250) * 10 + 50}%`,
                  mixBlendMode: 'overlay',
                  opacity: 0.3,
                  pointerEvents: 'none',
                  zIndex: 4,
                  animation: 'grain 0.2s infinite',
                }} />
                
                {/* Cold spot visualizations */}
                {effectiveColdSpots.map((spot, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${spot.x}px`,
                      top: `${spot.y}px`,
                      width: '120px',
                      height: '120px',
                      transform: 'translate(-50%, -50%)',
                      background: `radial-gradient(circle, rgba(102,153,255,${spot.intensity * 0.8}) 0%, rgba(102,153,255,${spot.intensity * 0.5}) 30%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      pointerEvents: 'none',
                      zIndex: 5,
                      animation: 'pulse 2s infinite',
                    }}
                  />
                ))}
                
                {/* Temperature readout */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  color: isCold ? '#6699ff' : '#ffffff',
                  textShadow: isCold 
                    ? '0 0 8px rgba(102,153,255,0.8), 0 0 16px rgba(102,153,255,0.5)'
                    : '0 0 4px rgba(255,255,255,0.5)',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}>
                  {effectiveTemperature.toFixed(1)}°F
                </div>
                
                {/* Crosshair */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  border: '2px solid rgba(100,150,255,0.6)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 15,
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-20px',
                    right: '-20px',
                    height: '1px',
                    background: 'rgba(100,150,255,0.6)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '-20px',
                    bottom: '-20px',
                    width: '1px',
                    background: 'rgba(100,150,255,0.6)',
                  }} />
                </div>
                
                {/* Anomaly warning */}
                {(isFreezingCold || effectiveHotSpot) && (
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    color: effectiveHotSpot ? '#ff8800' : '#6699ff',
                    textShadow: effectiveHotSpot
                      ? '0 0 8px rgba(255,136,0,0.8)'
                      : '0 0 8px rgba(102,153,255,0.8)',
                    animation: 'blink 1s infinite',
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}>
                    {effectiveHotSpot ? '⚠ HOT SPOT DETECTED' : '❄ COLD ANOMALY'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* HANDLE SECTION - Bottom 45% */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '45%',
            zIndex: 9,
          }}>
            {/* Handle body - Narrower than head */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '100%',
              background: `
                url(${smoothPlastic}),
                linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)
              `,
              backgroundSize: '300px 300px, cover',
              backgroundRepeat: 'repeat, no-repeat',
              backgroundBlendMode: 'overlay, normal',
              borderRadius: '4px 4px 12px 12px',
              boxShadow: 
                'inset 0 4px 8px rgba(255,255,255,0.04), ' +
                'inset 0 -8px 16px rgba(0,0,0,0.9), ' +
                '0 8px 20px rgba(0,0,0,0.8)',
            }}>
              
              {/* Grip texture */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                right: '10%',
                bottom: '15%',
                background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.3) 1px, transparent 2px, transparent 8px)',
                opacity: 0.6,
                pointerEvents: 'none',
              }} />
              
              {/* Serial number on bottom grip */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Courier New", monospace',
                fontSize: '7px',
                color: 'rgba(150,150,150,0.45)',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 20,
              }}>
                SN: FLIR-E5-1985-TH
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const ThermalTool = memo(ThermalToolComponent);
export default ThermalTool;
