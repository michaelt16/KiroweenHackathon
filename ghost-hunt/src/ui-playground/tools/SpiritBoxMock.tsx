import { useState, useEffect } from 'react';
import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import rust from '../../assets/texture/brownrust.png';
import filmgrain from '../../assets/texture/filmgrain.png';
import crtTexture from '../../assets/texture/crtexture.png';

// Spirit Box - Heavy Industrial Radio + EVP Recorder
// Follows 007 Investigation Tools Design System - Match Radar/EMF aesthetic
export function SpiritBoxMock() {
  const [frequency, setFrequency] = useState(87.5);
  const [staticLevel, setStaticLevel] = useState(0.3);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const responses = ['...behind...', '...get out...', '...help...', '...cold...', '...here...'];

  useEffect(() => {
    // Frequency drift
    const freqInterval = setInterval(() => {
      setFrequency((prev) => prev + (Math.random() - 0.5) * 0.1);
    }, 100);

    // Static variation
    const staticInterval = setInterval(() => {
      setStaticLevel(0.2 + Math.random() * 0.6);
    }, 150);

    // Waveform generation
    const waveInterval = setInterval(() => {
      const newWave = Array.from({ length: 50 }, () => Math.random() * staticLevel);
      setWaveform(newWave);
    }, 50);

    // Random EVP responses
    const responseInterval = setInterval(() => {
      if (Math.random() > 0.92) {
        setResponse(responses[Math.floor(Math.random() * responses.length)]);
        setShowResponse(true);
        setTimeout(() => setShowResponse(false), 3000);
      }
    }, 2000);

    return () => {
      clearInterval(freqInterval);
      clearInterval(staticInterval);
      clearInterval(waveInterval);
      clearInterval(responseInterval);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
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
        background: '#1a1a1a',
    }}>
      {/* Layer 0: Background - Optional camera view behind device */}
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
      
      {/* Layer 1: Device Casing - Full-screen physical slab - HEAVY STEEL (match Radar/EMF) */}
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
        
        {/* Uneven lighting */}
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
          height: '15%',
          background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
          borderBottom: '2px solid rgba(0,0,0,0.8)',
          boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
        }} />
        
        {/* Device Architecture: Middle Section (Display area) */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: 0,
          right: 0,
          bottom: '30%',
          background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
        }} />
        
        {/* Device Architecture: Bottom Section */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
          borderTop: '2px solid rgba(0,0,0,0.8)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
        }} />
        
        {/* Welded metal seams */}
        {[
          { top: '15%', left: '8%', right: '8%', height: '2px', opacity: 0.6 },
          { bottom: '30%', left: '10%', right: '10%', height: '2px', opacity: 0.55 },
          { top: '15%', left: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
          { top: '15%', right: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
        ].map((seam, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(seam.top ? { top: seam.top } : {}),
              ...(seam.bottom ? { bottom: seam.bottom } : {}),
              ...(seam.left ? { left: seam.left } : {}),
              ...(seam.right ? { right: seam.right } : {}),
              ...(seam.width ? { width: seam.width } : {}),
              ...(seam.height ? { height: seam.height } : {}),
              background: seam.width 
                ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
              opacity: seam.opacity,
              pointerEvents: 'none',
            }}
          />
        ))}
        
        {/* 4 Large corner screws */}
        {[
          { top: '12px', left: '12px' },
          { top: '12px', right: '12px' },
          { bottom: '12px', left: '12px' },
          { bottom: '12px', right: '12px' },
        ].map((screw, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(screw.top ? { top: screw.top } : {}),
              ...(screw.bottom ? { bottom: screw.bottom } : {}),
              ...(screw.left ? { left: screw.left } : {}),
              ...(screw.right ? { right: screw.right } : {}),
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
              boxShadow: 
                'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                '0 2px 4px rgba(0,0,0,0.8)',
              border: '1px solid rgba(0,0,0,0.7)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '6px',
              height: '0.5px',
              background: '#0a0a0a',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(90deg)',
              width: '6px',
              height: '0.5px',
              background: '#0a0a0a',
            }} />
          </div>
        ))}
        
        {/* Layer 2-5: Texture Overlays */}
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
        
        {/* Layer 6-10: Damage Elements */}
        {/* Deep scratches */}
        {[
          { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.6 },
          { bottom: '20%', right: '8%', width: '130px', angle: 30, opacity: 0.55 },
          { top: '60%', left: '3%', width: '120px', angle: 45, opacity: 0.5 },
          { top: '35%', right: '5%', width: '110px', angle: -35, opacity: 0.6 },
          { bottom: '35%', left: '6%', width: '125px', angle: 40, opacity: 0.55 },
        ].map((scratch, i) => (
          <div
            key={`light-scratch-${i}`}
            style={{
              position: 'absolute',
              ...(scratch.top ? { top: scratch.top } : {}),
              ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
              ...(scratch.left ? { left: scratch.left } : {}),
              ...(scratch.right ? { right: scratch.right } : {}),
              width: scratch.width,
              height: '2px',
              background: 'rgba(255,255,255,0.35)',
              transform: `rotate(${scratch.angle}deg)`,
              opacity: scratch.opacity,
              boxShadow: '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              zIndex: 6,
            }}
          />
        ))}
        
        {/* Rust specks */}
        {[
          { top: '18%', left: '15%', size: '14px', opacity: 0.55 },
          { top: '45%', right: '12%', size: '16px', opacity: 0.6 },
          { bottom: '22%', left: '18%', size: '12px', opacity: 0.5 },
          { bottom: '30%', right: '15%', size: '15px', opacity: 0.58 },
        ].map((rustSpot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(rustSpot.top ? { top: rustSpot.top } : {}),
              ...(rustSpot.bottom ? { bottom: rustSpot.bottom } : {}),
              ...(rustSpot.left ? { left: rustSpot.left } : {}),
              ...(rustSpot.right ? { right: rustSpot.right } : {}),
              width: rustSpot.size,
              height: rustSpot.size,
              backgroundImage: `url(${rust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: rustSpot.opacity,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 7,
            }}
          />
        ))}
        
        {/* Chipped paint areas */}
        {[
          { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
          { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
          { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
          { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
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
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
              clipPath: chip.clipPath,
              opacity: chip.opacity,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
              pointerEvents: 'none',
              zIndex: 8,
            }}
          />
        ))}

        {/* Vent grilles on sides */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '8px',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
              }}
            />
          ))}
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
              }}
            />
          ))}
        </div>
        
        {/* Labels & Text - ETCHED STYLE */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '25px',
          fontFamily: '"Caveat", cursive',
          fontSize: '14px',
          color: 'rgba(200,200,200,0.5)',
          transform: 'rotate(-1.5deg)',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.3), ' +
            '0 1px 2px rgba(0,0,0,0.9), ' +
            '1px 1px 3px rgba(0,0,0,0.8)',
          letterSpacing: '0.5px',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          SPIRIT BOX
        </div>
        
        {/* Engineering Labels */}
        {[
          { top: '3%', left: '12%', label: 'EVP', rotation: -0.5, fontSize: '11px' },
          { top: '3%', left: '22%', label: 'FREQ', rotation: 0.4, fontSize: '10px' },
          { top: '3%', right: '15%', label: 'STATIC', rotation: 0.6, fontSize: '10px' },
        ].map((label, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(label.top ? { top: label.top } : {}),
              ...(label.left ? { left: label.left } : {}),
              ...(label.right ? { right: label.right } : {}),
              fontFamily: '"Courier New", monospace',
              fontSize: label.fontSize,
              color: 'rgba(200,200,200,0.45)',
              transform: `rotate(${label.rotation}deg)`,
              textShadow: 
                '0 -1px 1px rgba(255,255,255,0.25), ' +
                '0 1px 2px rgba(0,0,0,0.9), ' +
                '1px 1px 3px rgba(0,0,0,0.8)',
              letterSpacing: '0.5px',
              pointerEvents: 'none',
              zIndex: 21,
            }}
          >
            {label.label}
          </div>
        ))}
        
        {/* Serial number */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '15%',
          fontFamily: '"Courier New", monospace',
          fontSize: '8px',
          color: 'rgba(150,150,150,0.45)',
          transform: 'rotate(0.4deg)',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.2), ' +
            '0 1px 2px rgba(0,0,0,0.9), ' +
            '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          SN: SB-1987-2B
        </div>

        {/* Oscilloscope Display Container - RADIO STYLE - Horizontal layout */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(85vw, 750px)',
          height: 'min(35vh, 280px)',
          maxWidth: '750px',
          maxHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 15,
        }}>
          {/* Recessed Cavity */}
        <div style={{
          position: 'relative',
          width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
            boxShadow: 
              'inset 0 12px 36px rgba(0,0,0,0.98), ' +
              'inset 0 6px 18px rgba(0,0,0,0.95), ' +
              'inset 0 3px 9px rgba(0,0,0,0.9)',
          }}>
            {/* THICK Metallic Bezel Ring */}
          <div style={{
            position: 'absolute',
              top: '-25px',
              left: '-25px',
              right: '-25px',
              bottom: '-25px',
              borderRadius: '8px',
              background: `
                linear-gradient(135deg, 
                  #5a5a5a 0%, 
                  #4a4a4a 15%, 
                  #3a3a3a 30%, 
                  #4a4a4a 50%, 
                  #3a3a3a 70%, 
                  #2a2a2a 85%, 
                  #1a1a1a 100%
                ),
                url(${metalTexture})
              `,
              backgroundBlendMode: 'overlay',
              backgroundSize: 'cover, cover',
              boxShadow: 
                'inset 0 4px 8px rgba(255,255,255,0.2), ' +
                'inset 0 -4px 8px rgba(0,0,0,0.9), ' +
                'inset 0 0 80px rgba(0,0,0,0.5), ' +
                '0 10px 25px rgba(0,0,0,0.95), ' +
                '0 15px 35px rgba(0,0,0,0.85)',
              filter: 'brightness(0.85)',
              border: '5px solid rgba(0,0,0,0.8)',
              borderTop: '4px solid rgba(255,255,255,0.1)',
            zIndex: 12,
            }}>
              {/* DEEP Shadow beneath bezel */}
              <div style={{
                position: 'absolute',
                top: '28px',
                left: '28px',
                right: '28px',
                bottom: '28px',
                borderRadius: '4px',
                boxShadow: 
                  'inset 0 0 50px rgba(0,0,0,0.99), ' +
                  'inset 0 0 80px rgba(0,0,0,0.98), ' +
                  'inset 0 0 110px rgba(0,0,0,0.96)',
                pointerEvents: 'none',
                zIndex: 1,
          }} />
          
              {/* Rust/wear on bezel */}
          <div style={{
            position: 'absolute',
                top: '15%',
                right: '20%',
                width: '40px',
                height: '40px',
                backgroundImage: `url(${rust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
                opacity: 0.4,
                borderRadius: '50%',
            pointerEvents: 'none',
          }} />
          
              {/* Tape patch on bezel */}
          <div style={{
            position: 'absolute',
                bottom: '25%',
                left: '10%',
                width: '50px',
                height: '20px',
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                transform: 'rotate(-15deg)',
                opacity: 0.7,
                boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }} />
              
              {/* Bezel scratches */}
              {[
                { top: '25%', left: '15%', width: '30px', angle: -25, opacity: 0.6 },
                { bottom: '30%', right: '20%', width: '35px', angle: 35, opacity: 0.65 },
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
                    background: 'rgba(0,0,0,0.7)',
                    transform: `rotate(${scratch.angle}deg)`,
                    opacity: scratch.opacity,
            pointerEvents: 'none',
                    boxShadow: '0 0 1px rgba(0,0,0,0.8)',
                  }}
                />
              ))}
              
              {/* Screws at corners */}
              {[
                { top: '12px', left: '12px' },
                { top: '12px', right: '12px' },
                { bottom: '12px', left: '12px' },
                { bottom: '12px', right: '12px' },
              ].map((corner, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(corner.top ? { top: corner.top } : {}),
                    ...(corner.bottom ? { bottom: corner.bottom } : {}),
                    ...(corner.left ? { left: corner.left } : {}),
                    ...(corner.right ? { right: corner.right } : {}),
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #2a2a2a 50%, #0a0a0a 100%)',
                    boxShadow: 
                      'inset 0 2px 3px rgba(255,255,255,0.2), ' +
                      'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                      '0 3px 6px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,0,0,0.7)',
                    zIndex: 20,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '10px',
                    height: '1px',
                    background: '#0a0a0a',
          }} />
          <div style={{
            position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    width: '10px',
            height: '1px',
                    background: '#0a0a0a',
                  }} />
                </div>
              ))}
            </div>
            
            {/* Actual Oscilloscope Screen - LESS INSET */}
            <div style={{
              position: 'absolute',
              top: '6%',
              left: '6%',
              right: '6%',
              bottom: '6%',
              borderRadius: '4px',
              background: '#0a1a0a',
              boxShadow: 
                'inset 0 15px 40px rgba(0,0,0,0.99), ' +
                'inset 0 8px 25px rgba(0,0,0,0.98), ' +
                'inset 0 4px 12px rgba(0,0,0,0.97), ' +
                'inset 0 0 100px rgba(0,255,0,0.22)',
              border: '3px solid #000',
              overflow: 'hidden',
            zIndex: 13,
            }}>
          {/* Grid lines */}
              <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.25, zIndex: 1 }}>
            {[...Array(9)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                    y1={`${(i + 1) * 11.11}%`}
                x2="100%"
                    y2={`${(i + 1) * 11.11}%`}
                stroke="#00ff00"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <line
                key={`v-${i}`}
                    x1={`${(i + 1) * 6.66}%`}
                y1="0"
                    x2={`${(i + 1) * 6.66}%`}
                y2="100%"
                stroke="#00ff00"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Waveform */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
            <polyline
                  points={waveform.length > 0 ? waveform
                .map((val, i) => `${(i / waveform.length) * 100}%,${90 - val * 80}`)
                    .join(' ') : ''}
              fill="none"
              stroke="#00ff00"
                  strokeWidth="2.5"
                  opacity="0.9"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feColorMatrix in="coloredBlur" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

              {/* CRT Scanlines */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
                pointerEvents: 'none',
                zIndex: 10,
              }} />
              
              {/* CRT Texture */}
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
                zIndex: 11,
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
                zIndex: 6,
                animation: 'grain 0.2s infinite',
              }} />

          {/* EVP response text */}
          {showResponse && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: '"Courier New", monospace',
                  fontSize: '22px',
              color: '#ff6666',
                  textShadow: 
                    '0 0 15px #ff6666, ' +
                    '0 0 30px rgba(255,102,102,0.6), ' +
                    '0 -1px 1px rgba(255,255,255,0.2), ' +
                    '0 1px 2px rgba(0,0,0,0.9)',
              animation: 'fadeInOut 3s',
              zIndex: 15,
                  letterSpacing: '3px',
                  fontWeight: 'bold',
            }}>
              {response}
            </div>
          )}

              {/* Static indicator - Top right */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.85)',
                border: '1px solid rgba(0,255,0,0.4)',
                borderRadius: '3px',
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: '#00ff00',
            textShadow: 
              '0 0 6px rgba(0,255,0,0.5), ' +
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            opacity: 0.8,
            zIndex: 8,
          }}>
            STATIC: {Math.floor(staticLevel * 100)}%
        </div>

              {/* Dirty glass overlay */}
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
                mixBlendMode: 'multiply',
                opacity: 0.25,
                pointerEvents: 'none',
                zIndex: 14,
                borderRadius: '4px',
              }} />
            </div>
          </div>
        </div>
        
        {/* Frequency Display - Below oscilloscope */}
        <div style={{
          position: 'absolute',
          top: '58%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(85vw, 750px)',
          padding: '14px 20px',
          background: 'rgba(0,0,0,0.9)',
          borderRadius: '6px',
          border: '3px solid rgba(0,0,0,0.8)',
          boxShadow: 
            'inset 0 4px 12px rgba(0,0,0,0.95), ' +
            '0 4px 12px rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 15,
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            color: 'rgba(200,200,200,0.6)',
            letterSpacing: '1px',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
          }}>
            FREQ
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '28px',
            color: '#ff6600',
            textShadow: 
              '0 0 12px rgba(255,102,0,0.8), ' +
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            letterSpacing: '2px',
            fontWeight: 'bold',
          }}>
            {frequency.toFixed(1)} MHz
          </div>
          {/* Flickering LED segments */}
          <div style={{
            display: 'flex',
            gap: '3px',
          }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '5px',
                  height: '14px',
                  background: Math.random() > 0.5 ? '#ff0000' : '#330000',
                  borderRadius: '1px',
                  boxShadow: Math.random() > 0.5 ? '0 0 8px rgba(255,0,0,0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Physical knobs - Below frequency display */}
        <div style={{
          position: 'absolute',
          top: '68%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          zIndex: 15,
        }}>
          {/* Frequency knob */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
              border: '4px solid rgba(0,0,0,0.8)',
              boxShadow: 
                'inset 0 3px 6px rgba(255,255,255,0.2), ' +
                'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
                '0 6px 16px rgba(0,0,0,0.9)',
              position: 'relative',
            }}>
              {/* Knob indicator */}
              <div style={{
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '18px',
                background: '#ff6600',
                borderRadius: '2px',
                boxShadow: '0 0 8px rgba(255,102,0,0.6)',
              }} />
              {/* Knob grip ridges */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                    width: '2px',
                    height: '20px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: 'rgba(200,200,200,0.5)',
              letterSpacing: '1px',
              textShadow: 
                '0 -1px 1px rgba(255,255,255,0.2), ' +
                '0 1px 2px rgba(0,0,0,0.9)',
            }}>
              TUNE
            </div>
          </div>

          {/* Volume knob */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
              border: '4px solid rgba(0,0,0,0.8)',
              boxShadow: 
                'inset 0 3px 6px rgba(255,255,255,0.2), ' +
                'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
                '0 6px 16px rgba(0,0,0,0.9)',
              position: 'relative',
            }}>
              {/* Knob indicator */}
              <div style={{
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '18px',
                background: '#00ff00',
                borderRadius: '2px',
                boxShadow: '0 0 8px rgba(0,255,0,0.6)',
              }} />
              {/* Knob grip ridges */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                    width: '2px',
                    height: '20px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: 'rgba(200,200,200,0.5)',
              letterSpacing: '1px',
              textShadow: 
                '0 -1px 1px rgba(255,255,255,0.2), ' +
                '0 1px 2px rgba(0,0,0,0.9)',
            }}>
              VOL
            </div>
          </div>
        </div>

        {/* Bent antenna - Top right */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '8%',
          width: '5px',
          height: '80px',
          background: 'linear-gradient(180deg, #6a6a6a 0%, #4a4a4a 50%, #2a2a2a 100%)',
          transform: 'rotate(12deg)',
          borderRadius: '2px',
          boxShadow: 
            '2px 2px 6px rgba(0,0,0,0.8), ' +
            'inset 0 1px 0 rgba(255,255,255,0.2)',
          zIndex: 10,
        }}>
          {/* Metal texture on antenna */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${metalTexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.5,
            borderRadius: '2px',
          }} />
          {/* Antenna tip */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #8a8a8a 0%, #4a4a4a 60%, #1a1a1a 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }} />
        </div>

        {/* Tape patches */}
        {[
          { top: '5%', left: '-15px', width: '60px', height: '3px', rotation: -15, opacity: 0.8 },
          { bottom: '12px', right: '10px', width: '85px', height: '32px', rotation: -14, opacity: 0.9 },
          { top: '12px', right: '5px', width: '52px', height: '20px', rotation: 16, opacity: 0.8 },
        ].map((tape, i) => (
          <div
            key={i}
            style={{
          position: 'absolute',
              ...(tape.top ? { top: tape.top } : {}),
              ...(tape.bottom ? { bottom: tape.bottom } : {}),
              ...(tape.left ? { left: tape.left } : {}),
              ...(tape.right ? { right: tape.right } : {}),
              width: tape.width,
              height: tape.height,
          backgroundImage: `url(${tape})`,
          backgroundSize: 'cover',
              transform: `rotate(${tape.rotation}deg)`,
              opacity: tape.opacity,
          boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />
        ))}
        
        {/* Wires extending past edges */}
        {[
          { top: '35%', right: '-18px', width: '55px', height: '3px', rotation: 22 },
          { bottom: '20%', left: '-15px', width: '45px', height: '3px', rotation: -18 },
        ].map((wire, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(wire.top ? { top: wire.top } : {}),
              ...(wire.bottom ? { bottom: wire.bottom } : {}),
              ...(wire.left ? { left: wire.left } : {}),
              ...(wire.right ? { right: wire.right } : {}),
              width: wire.width,
              height: wire.height,
              background: 'linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 100%)',
              transform: `rotate(${wire.rotation}deg)`,
              opacity: 0.8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
}

export default SpiritBoxMock;
