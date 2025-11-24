import { useState, useEffect } from 'react';
import smoothPlastic from '../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../assets/texture/scratchedplasticdark.png';
import wrinkledPaper from '../../assets/texture/wrinkledpaper.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import filmgrain from '../../assets/texture/filmgrain.png';
import crtTexture from '../../assets/texture/crtexture.png';

// Thermal Scanner - FLIR E5-style Handheld Infrared Camera
// Trapezoid screen housing + handheld body - Injection-molded plastic
export function ThermalScannerMock() {
  const [coldSpot, setColdSpot] = useState({ x: 150, y: 120, intensity: 0 });
  const [scanLines, setScanLines] = useState(0);
  const [temperature, setTemperature] = useState(68);
  const [hotSpot, setHotSpot] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLines((prev) => (prev + 1) % 100);
      
      // Random cold spot movement
      if (Math.random() > 0.95) {
        setColdSpot({
          x: 80 + Math.random() * 160,
          y: 60 + Math.random() * 120,
          intensity: 0.6 + Math.random() * 0.4,
        });
        setTemperature(68 - (coldSpot.intensity * 30));
      }
      
      // Random hot spot detection
      if (Math.random() > 0.97) {
        setHotSpot(true);
        setTimeout(() => setHotSpot(false), 3000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [coldSpot.intensity]);

  const isFreezingCold = temperature < 40;
  const isCold = temperature < 50;

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
          
          {/* ============================================ */}
          {/* TOP-HEAVY "HEAD" SECTION - Professional tool head */}
          {/* ============================================ */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '55%',
            zIndex: 10,
          }}>
            {/* Top head section - ONE solid device with smooth plastic texture base */}
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
                'inset 0 4px 8px rgba(255,255,255,0.04), ' +   // Top highlight
                'inset 0 -10px 18px rgba(0,0,0,0.9), ' +       // Bottom shadow
                'inset 5px 0 10px rgba(0,0,0,0.9), ' +         // Left shadow
                'inset -5px 0 10px rgba(0,0,0,0.9), ' +        // Right shadow
                '0 12px 26px rgba(0,0,0,0.9)',                 // Drop shadow
            }}>
              
              {/* Body vignette - Ground the top section - Reduced opacity to show texture */}
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
              {/* Additional smooth plastic texture layer for more visibility */}
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
              
              {/* (B) Dark plastic scratch texture - Reduced opacity to not hide smooth plastic */}
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
              
              {/* (C) Dust / micro-noise - Reduced opacity */}
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
              
              {/* Light scratches */}
              {[
                { top: '15%', left: '10%', width: '50px', angle: -15, opacity: 0.3 },
                { top: '25%', right: '8%', width: '45px', angle: 20, opacity: 0.25 },
              ].map((scratch, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: scratch.top,
                    ...(scratch.left ? { left: scratch.left } : {}),
                    ...(scratch.right ? { right: scratch.right } : {}),
                    width: scratch.width,
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
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
              
              {/* Worn edges & corner distress - Grey plastic rub marks */}
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
                  key={i}
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
                  key={i}
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
                  key={i}
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
              
              {/* Beveled edges - Deep bevel around frame */}
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
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '12px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
                clipPath: 'polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)',
                pointerEvents: 'none',
                zIndex: 4,
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '12px',
                background: 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
                clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)',
                pointerEvents: 'none',
                zIndex: 4,
              }} />
              
              {/* Screws on SIDES - Not on front frame */}
              {[
                { top: '20%', left: '0', side: 'left' },
                { top: '60%', left: '0', side: 'left' },
                { top: '20%', right: '0', side: 'right' },
                { top: '60%', right: '0', side: 'right' },
              ].map((screw, i) => (
                <div
                  key={i}
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
                  key={i}
                  style={{
                    position: 'absolute',
                    top: label.top,
                    ...(label.left ? { left: label.left } : {}),
                    ...(label.right ? { right: label.right } : {}),
                    fontFamily: '"Courier New", monospace',
                    fontSize: label.fontSize,
                    color: 'rgba(100,100,100,0.4)',  // Lower contrast
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
              
              {/* Scratches on plastic */}
              {[
                { top: '15%', left: '12%', width: '60px', angle: -18, opacity: 0.4 },
                { top: '35%', right: '10%', width: '55px', angle: 22, opacity: 0.35 },
                { bottom: '20%', left: '15%', width: '50px', angle: -25, opacity: 0.38 },
              ].map((scratch, i) => (
                <div
                  key={i}
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
                    zIndex: 5,
                  }}
                />
              ))}
              
              {/* Fingerprint smudges */}
              {[
                { top: '20%', left: '10%', size: '24px', opacity: 0.2 },
                { top: '50%', right: '8%', size: '22px', opacity: 0.18 },
              ].map((smudge, i) => (
                <div
                  key={i}
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
              
              {/* FLIR-1985 label - Top center */}
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
              
              {/* WARNING label - Top right */}
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
              
              {/* Screen glow - EMF style, always active */}
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
                ...(hotSpot ? {
                  boxShadow: '0 0 50px rgba(255, 120, 0, 0.55)',
                  transition: 'box-shadow 0.18s ease-out',
                } : {
                  boxShadow: '0 0 25px rgba(0, 255, 100, 0.25)',
                  transition: 'box-shadow 0.18s ease-out',
                }),
              }} />
              {/* ACTUAL THERMAL SCREEN - Embedded in bezel, keep existing content */}
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
                  {/* Thermographic gradient - Purple/blue → yellow → orange → white */}
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
                  
                  {/* Cold spot visualization */}
                  <div style={{
                    position: 'absolute',
                    left: `${coldSpot.x}px`,
                    top: `${coldSpot.y}px`,
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, rgba(100,150,255,${coldSpot.intensity * 0.8}) 0%, rgba(50,100,200,${coldSpot.intensity * 0.6}) 30%, rgba(20,50,150,${coldSpot.intensity * 0.4}) 60%, transparent 100%)`,
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(20px)',
                    animation: 'pulse 2s infinite',
                    zIndex: 7,
                    boxShadow: `0 0 40px rgba(100,150,255,${coldSpot.intensity * 0.5})`,
                  }} />
                  
                  {/* Crosshair overlay */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 8 }}>
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(100,255,100,0.5)" strokeWidth="1.5" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(100,255,100,0.5)" strokeWidth="1.5" />
                    <circle cx="50%" cy="50%" r="40" fill="none" stroke="rgba(100,255,100,0.4)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="20" fill="none" stroke="rgba(100,255,100,0.6)" strokeWidth="1" />
                  </svg>
                  
                  {/* Temperature marker reticle */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    border: '2px solid rgba(255,200,100,0.8)',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px rgba(255,200,100,0.6)',
                    zIndex: 9,
                    pointerEvents: 'none',
                  }} />
                  
                  {/* Dirty glass overlay with smudges */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${dirtyGlass})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'overlay',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    zIndex: 15,
                  }} />
                  
                  {/* FLIR-style HUD - Temperature readout box */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.9)',
                    border: `2px solid ${isFreezingCold ? 'rgba(102,153,255,0.7)' : isCold ? 'rgba(153,255,153,0.6)' : 'rgba(200,200,200,0.5)'}`,
                    borderRadius: '4px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '16px',
                    color: isFreezingCold ? 'rgba(102,153,255,1)' : isCold ? 'rgba(153,255,153,1)' : 'rgba(255,255,255,0.9)',
                    textShadow: 
                      `0 0 8px ${isFreezingCold ? '#6699ff' : isCold ? '#99ff99' : 'transparent'}, ` +
                      '0 1px 2px rgba(0,0,0,0.9)',
                    letterSpacing: '1px',
                    zIndex: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  }}>
                    <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>TEMP</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{temperature.toFixed(1)}°F</div>
                    <div style={{ fontSize: '9px', opacity: 0.6, marginTop: '4px' }}>
                      {isFreezingCold ? '❄️ FREEZING' : isCold ? '🧊 COLD' : '— NORMAL'}
                    </div>
                  </div>
                  
                  {/* Status bar - Bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.85)',
                    border: '1px solid rgba(102,255,102,0.4)',
                    borderRadius: '4px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    color: 'rgba(102,255,102,0.9)',
                    textShadow: '0 0 4px rgba(102,255,102,0.4), 0 1px 2px rgba(0,0,0,0.9)',
                    zIndex: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>SCAN ACTIVE</span>
                    <span>MODE: IR</span>
                    <span>RNG: 15m</span>
                  </div>
                  
                  {/* HOT SPOT DETECTED warning */}
                  {hotSpot && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      padding: '12px 20px',
                      background: 'rgba(255,100,0,0.95)',
                      border: '2px solid rgba(255,150,0,0.9)',
                      borderRadius: '4px',
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px',
                      color: '#fff',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(255,150,0,0.8), 0 2px 4px rgba(0,0,0,0.9)',
                      animation: 'blink 0.5s infinite',
                      zIndex: 17,
                      boxShadow: '0 0 30px rgba(255,150,0,0.7), 0 4px 12px rgba(0,0,0,0.8)',
                    }}>
                      ⚠ HOT SPOT DETECTED
                    </div>
                  )}
                </div>
              </div>
          </div>
          
          {/* ============================================ */}
          {/* TAPERED HANDLE/Grip Section - Bottom 45% - Pistol grip style */}
          {/* ============================================ */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75%',  // Narrower - tapers down
            height: '45%',
            zIndex: 5,
          }}>
            {/* Tapered handle - ONE solid device, slightly narrower with soft taper */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
              background: `
                url(${smoothPlastic}),
                linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #111111 70%, #111111 100%)
              `,
              backgroundSize: '300px 300px, cover',
              backgroundRepeat: 'repeat, no-repeat',
              backgroundBlendMode: 'overlay, normal',
              borderRadius: '4px 4px 12px 12px',
              boxShadow: 
                'inset 0 4px 8px rgba(255,255,255,0.04), ' +   // Top highlight
                'inset 0 -10px 18px rgba(0,0,0,0.9), ' +       // Bottom shadow
                'inset 5px 0 10px rgba(0,0,0,0.9), ' +         // Left shadow
                'inset -5px 0 10px rgba(0,0,0,0.9), ' +        // Right shadow
                '0 12px 26px rgba(0,0,0,0.9)',                 // Drop shadow
            }}>
              
              {/* Body vignette - Ground the device - Reduced opacity to show texture */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
                opacity: 0.5,
                pointerEvents: 'none',
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                zIndex: 5,
              }} />
              {/* Additional smooth plastic texture layer for handle - More visible */}
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
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                zIndex: 1,
              }} />
              
              {/* (B) Dark plastic scratch texture - Reduced opacity to show smooth plastic */}
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
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                zIndex: 2,
              }} />
              
              {/* (C) Dust / micro-noise - Reduced opacity */}
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
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                zIndex: 3,
              }} />
              
              {/* (D) Wrinkled film / old vinyl */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledPaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.15,
                pointerEvents: 'none',
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                zIndex: 4,
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
                clipPath: 'polygon(12% 0%, 88% 0%, 95% 100%, 5% 100%)',
                filter: 'contrast(1.05) brightness(0.98)',
                mixBlendMode: 'overlay',
                opacity: 0.22,
                pointerEvents: 'none',
                zIndex: 5,
              }} />
              
              {/* Corner chipping on handle */}
              {[
                { bottom: '0', left: '5%', width: '18px', height: '18px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)' },
                { bottom: '0', right: '5%', width: '18px', height: '18px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)' },
              ].map((chip, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    bottom: chip.bottom,
                    ...(chip.left ? { left: chip.left } : {}),
                    ...(chip.right ? { right: chip.right } : {}),
                    width: chip.width,
                    height: chip.height,
                    background: 'linear-gradient(135deg, #111111 0%, #0a0a0a 50%, #000 100%)',
                    clipPath: chip.clipPath,
                    opacity: 0.8,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    zIndex: 6,
                  }}
                />
              ))}
              
              {/* Injection-mold seams */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 5,
              }} />
              
              {/* THICK Rubberized side grips - Dark charcoal, matte with subtle shine */}
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '-8px',
                bottom: '15%',
                width: '36px',
                clipPath: 'polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)',
                background: 'linear-gradient(90deg, rgba(20,20,20,0.98) 0%, rgba(15,15,15,0.95) 30%, rgba(12,12,12,0.92) 50%, rgba(15,15,15,0.95) 70%, rgba(20,20,20,0.98) 100%)',
                borderRadius: '0 18px 18px 0',
                boxShadow: 
                  'inset 5px 0 10px rgba(0,0,0,0.95), ' +
                  'inset 0 3px 6px rgba(0,0,0,0.9), ' +
                  '0 0 0 1px rgba(0,0,0,0.8)',
                zIndex: 7,
              }}>
                {/* Subtle shine on rubber - Mostly matte */}
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  left: '15%',
                  width: '40%',
                  height: '30%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 80%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />
                
                {/* Molded grip ridges - Subtle texture */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.7) 1px, transparent 5px)',
                  borderRadius: '0 18px 18px 0',
                  zIndex: 2,
                }} />
                {/* Additional molded texture */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, transparent 3px)',
                  borderRadius: '0 18px 18px 0',
                  opacity: 0.6,
                  zIndex: 3,
                }} />
              </div>
              <div style={{
                position: 'absolute',
                top: '15%',
                right: '-8px',
                bottom: '15%',
                width: '36px',
                clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)',
                background: 'linear-gradient(270deg, rgba(20,20,20,0.98) 0%, rgba(15,15,15,0.95) 30%, rgba(12,12,12,0.92) 50%, rgba(15,15,15,0.95) 70%, rgba(20,20,20,0.98) 100%)',
                borderRadius: '18px 0 0 18px',
                boxShadow: 
                  'inset -5px 0 10px rgba(0,0,0,0.95), ' +
                  'inset 0 3px 6px rgba(0,0,0,0.9), ' +
                  '0 0 0 1px rgba(0,0,0,0.8)',
                zIndex: 7,
              }}>
                {/* Subtle shine on rubber */}
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  right: '15%',
                  width: '40%',
                  height: '30%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 80%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />
                
                {/* Molded grip ridges */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.7) 1px, transparent 5px)',
                  borderRadius: '18px 0 0 18px',
                  zIndex: 2,
                }} />
                {/* Additional molded texture */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, transparent 3px)',
                  borderRadius: '18px 0 0 18px',
                  opacity: 0.6,
                  zIndex: 3,
                }} />
              </div>
              
              {/* Screws on sides of handle */}
              {[
                { top: '25%', left: '-4px', side: 'left' },
                { top: '65%', left: '-4px', side: 'left' },
                { top: '25%', right: '-4px', side: 'right' },
                { top: '65%', right: '-4px', side: 'right' },
              ].map((screw, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: screw.top,
                    ...(screw.left !== undefined ? { left: screw.left } : {}),
                    ...(screw.right !== undefined ? { right: screw.right } : {}),
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, rgba(80,80,80,0.8) 0%, rgba(40,40,40,0.7) 40%, rgba(0,0,0,0.95) 100%)',
                    boxShadow: 
                      'inset 0 2px 3px rgba(255,255,255,0.2), ' +
                      'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                      '0 2px 6px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,0,0,0.8)',
                    zIndex: 11,
                    transform: screw.side === 'left' ? 'translateX(-50%)' : 'translateX(50%)',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '5px',
                    height: '0.5px',
                    background: '#000',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    width: '5px',
                    height: '0.5px',
                    background: '#000',
                  }} />
                </div>
              ))}
              
              {/* Buttons - Mounted on leather texture with circular shadows */}
              {[
                { top: '25%', left: '15%', type: 'triangle', label: 'MODE' },
                { top: '25%', left: '30%', type: 'circle', label: 'ZOOM' },
                { top: '25%', left: '45%', type: 'circle', label: 'IR/UV' },
                { top: '25%', right: '20%', type: 'circle', label: 'REC' },
              ].map((button, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: button.top,
                    ...(button.left ? { left: button.left } : {}),
                    ...(button.right ? { right: button.right } : {}),
                    width: button.type === 'triangle' ? '0' : '20px',
                    height: button.type === 'triangle' ? '0' : '20px',
                    borderLeft: button.type === 'triangle' ? '10px solid transparent' : 'none',
                    borderRight: button.type === 'triangle' ? '10px solid transparent' : 'none',
                    borderBottom: button.type === 'triangle' ? '18px solid rgba(0,0,0,0.8)' : 'none',
                    borderRadius: button.type === 'circle' ? '50%' : '0',
                    background: button.type === 'circle' ? 'radial-gradient(circle at 30% 30%, rgba(50,50,50,0.8) 0%, rgba(0,0,0,0.9) 100%)' : 'transparent',
                    boxShadow: 
                      button.type === 'circle' 
                        ? 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'
                        : 'inset 0 2px 4px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)',
                    zIndex: 7,
                  }}
                >
                  {button.type === 'circle' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.9)',
                    }} />
                  )}
                  {/* Button label - Lower contrast */}
                  <div style={{
                    position: 'absolute',
                    top: button.type === 'triangle' ? '22px' : '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '7px',
                    color: 'rgba(100,100,100,0.35)',
                    whiteSpace: 'nowrap',
                    textShadow: '0 1px 1px rgba(0,0,0,0.9)',
                  }}>
                    {button.label}
                  </div>
                </div>
              ))}
              
              {/* LED indicator - Mounted with circular shadow */}
              <div style={{
                position: 'absolute',
                top: '30%',
                right: '15%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(0,255,0,0.9) 0%, rgba(0,200,0,0.7) 50%, rgba(0,0,0,0.9) 100%)',
                boxShadow: 
                  '0 0 8px rgba(0,255,0,0.8), ' +
                  'inset 0 1px 2px rgba(255,255,255,0.3), ' +
                  '0 0 12px rgba(0,0,0,0.6)',
                animation: 'pulse 2s infinite',
                zIndex: 8,
              }} />
              
              {/* HOT SPOT warning sticker - Lower contrast, printed feel */}
              <div style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translateX(-50%) rotate(-1deg)',
                width: '80px',
                height: '35px',
                background: 'linear-gradient(135deg, rgba(255,100,0,0.3) 0%, rgba(255,50,0,0.2) 100%)',
                border: '2px solid rgba(255,150,0,0.5)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1), 0 0 8px rgba(0,0,0,0.5)',
                zIndex: 9,
              }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: 'rgba(255,180,0,0.8)',
                  fontWeight: 'bold',
                  textShadow: '0 0 3px rgba(255,150,0,0.5), 0 1px 2px rgba(0,0,0,0.9)',
                }}>
                  ⚠ HOT SPOT
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '7px',
                  color: 'rgba(255,150,0,0.6)',
                  marginTop: '2px',
                }}>
                  WARNING
                </div>
              </div>
              
              {/* Plastic seams - Horizontal lines */}
              {[
                { top: '15%', opacity: 0.6 },
                { top: '60%', opacity: 0.5 },
              ].map((seam, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: seam.top,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                    opacity: seam.opacity,
                    pointerEvents: 'none',
                    zIndex: 6,
                  }}
                />
              ))}
              
              
              {/* Scuffs and scratches */}
              {[
                { top: '35%', left: '20%', width: '50px', angle: -15, opacity: 0.3 },
                { top: '55%', right: '18%', width: '45px', angle: 20, opacity: 0.28 },
              ].map((scratch, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(scratch.top ? { top: scratch.top } : {}),
                    ...(scratch.left ? { left: scratch.left } : {}),
                    ...(scratch.right ? { right: scratch.right } : {}),
                    width: scratch.width,
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    transform: `rotate(${scratch.angle}deg)`,
                    opacity: scratch.opacity,
                    pointerEvents: 'none',
                    zIndex: 6,
                  }}
                />
              ))}
              
              {/* Dust trapped in seams */}
              {[
                { top: '15%', left: '10%', right: '10%', height: '2px' },
                { top: '60%', left: '12%', right: '12%', height: '1.5px' },
              ].map((seam, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: seam.top,
                    left: seam.left,
                    right: seam.right,
                    height: seam.height,
                    backgroundImage: `url(${dust})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'multiply',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    zIndex: 7,
                  }}
                />
              ))}
              
              {/* Serial number on bottom rubber grip */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%) rotate(0.2deg)',
                fontFamily: '"Courier New", monospace',
                fontSize: '8px',
                color: 'rgba(120,120,120,0.5)',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 10,
              }}>
                SN: TH-1985-IR7
              </div>
              
              {/* Warning label - Bottom */}
              <div style={{
                position: 'absolute',
                bottom: '25px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-0.3deg)',
                fontFamily: '"Courier New", monospace',
                fontSize: '7px',
                color: 'rgba(200,150,100,0.5)',
                textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 10,
                textAlign: 'center',
              }}>
                DO NOT EXPOSE TO DIRECT SUNLIGHT
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThermalScannerMock;
