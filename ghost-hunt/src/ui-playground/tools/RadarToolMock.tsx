import { useState, useEffect } from 'react';
import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import crtTexture from '../../assets/texture/crtexture.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';
import rust from '../../assets/texture/brownrust.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import coffeestain from '../../assets/texture/coffeestain.png';
import corkboardtexture from '../../assets/texture/corkboardtexture.png';

// CRT Radar - 1985 basement ghost scanner aesthetic
export function RadarToolMock() {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [ghostBlip, setGhostBlip] = useState({ angle: 45, distance: 120 });

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 2) % 360);
      
      // Ghost moves occasionally
      if (Math.random() > 0.97) {
        setGhostBlip({
          angle: Math.random() * 360,
          distance: 60 + Math.random() * 80,
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
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
      {/* Full-screen device casing - HEAVY STEEL, reaches all edges */}
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
      }}>        {/* Beveled edges for depth */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '8px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '8px',
          background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
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
        }} />
        
        {/* Rust/wear overlay */}
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
        }} />
        
        {/* Dust/grime layer */}
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
        }} />
        
        {/* Weld lines/seams across device */}
        {[
          { top: '12%', left: '10%', right: '10%', height: '1px', opacity: 0.5 },
          { top: '25%', left: '8%', right: '8%', height: '1px', opacity: 0.4 },
          { bottom: '15%', left: '12%', right: '12%', height: '1px', opacity: 0.45 },
        ].map((weld, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(weld.top ? { top: weld.top } : {}),
              ...(weld.bottom ? { bottom: weld.bottom } : {}),
              left: weld.left,
              right: weld.right,
              height: weld.height,
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
              opacity: weld.opacity,
              pointerEvents: 'none',
            }}
          />
        ))}
        
        {/* Deep scratches on casing */}
        {[
          { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.5 },
          { bottom: '20%', right: '8%', width: '120px', angle: 30, opacity: 0.45 },
          { top: '60%', left: '3%', width: '100px', angle: 45, opacity: 0.4 },
          { top: '35%', right: '5%', width: '90px', angle: -35, opacity: 0.5 },
          { bottom: '35%', left: '6%', width: '110px', angle: 40, opacity: 0.45 },
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
              height: '2px',
              background: 'rgba(255,255,255,0.25)',
              transform: `rotate(${scratch.angle}deg)`,
              opacity: scratch.opacity,
              boxShadow: '0 0 3px rgba(0,0,0,0.6), inset 0 0 2px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          />
        ))}
        
        {/* Chipped paint areas */}
        {[
          { top: '8%', left: '8%', width: '25px', height: '25px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' },
          { top: '8%', right: '8%', width: '30px', height: '30px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)' },
          { bottom: '10%', left: '10%', width: '20px', height: '20px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)' },
          { bottom: '10%', right: '10%', width: '28px', height: '28px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)' },
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
              background: '#0a0a0a',
              clipPath: chip.clipPath,
              pointerEvents: 'none',
            }}
          />
        ))}
        
        {/* Rust specks scattered across device */}
        {[
          { top: '18%', left: '15%', size: '12px', opacity: 0.5 },
          { top: '45%', right: '12%', size: '15px', opacity: 0.6 },
          { bottom: '22%', left: '18%', size: '10px', opacity: 0.45 },
          { bottom: '30%', right: '15%', size: '14px', opacity: 0.55 },
          { top: '70%', left: '20%', size: '11px', opacity: 0.5 },
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
            }}
          />
        ))}
        
        {/* 80s-style labels with inconsistent alignment */}
        {[
          { top: '8%', left: '12%', label: 'PWR', rotation: -0.8, fontSize: '11px' },
          { top: '8%', left: '22%', label: 'GAIN', rotation: 1.2, fontSize: '10px' },
          { top: '8%', left: '32%', label: 'RANGE', rotation: -0.5, fontSize: '11px' },
          { top: '8%', right: '15%', label: 'TILT', rotation: 0.9, fontSize: '10px' },
          { bottom: '8%', left: '15%', label: 'SN: RD-1985-7B', rotation: 0.3, fontSize: '8px', color: 'rgba(150,150,150,0.4)' },
        ].map((label, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(label.top ? { top: label.top } : {}),
              ...(label.bottom ? { bottom: label.bottom } : {}),
              ...(label.left ? { left: label.left } : {}),
              ...(label.right ? { right: label.right } : {}),
              fontFamily: '"Courier New", monospace',
              fontSize: label.fontSize,
              color: label.color || 'rgba(200,200,200,0.5)',
              transform: `rotate(${label.rotation}deg)`,
              textShadow: '1px 1px 2px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.6)',
              letterSpacing: '0.5px',
              pointerEvents: 'none',
            }}
          >
            {label.label}
          </div>
        ))}
        
        {/* Wires/tape extending past edges */}
        {[
          { top: '5%', left: '-15px', width: '60px', height: '3px', rotation: -15, opacity: 0.8 },
          { top: '50%', right: '-20px', width: '50px', height: '4px', rotation: 20, opacity: 0.75 },
          { bottom: '8%', left: '-12px', width: '45px', height: '3px', rotation: 10, opacity: 0.7 },
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
              background: i === 1 ? `url(${tape})` : 'linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 100%)',
              backgroundSize: 'cover',
              transform: `rotate(${wire.rotation}deg)`,
              opacity: wire.opacity,
              boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}

        {/* Handwritten label - more worn */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '30px',
          fontFamily: '"Caveat", cursive',
          fontSize: '14px',
          color: 'rgba(200,200,200,0.5)',
          transform: 'rotate(-1.5deg)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.5px',
        }}>
          RADAR UNIT B
        </div>
        
        {/* Serial number sticker - peeling */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '25px',
          fontFamily: '"Courier New", monospace',
          fontSize: '9px',
          color: 'rgba(150,150,150,0.4)',
          transform: 'rotate(1.2deg)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        }}>
          SN: RD-1985-7B
        </div>

        {/* Top panel seam/divider */}
        <div style={{
          position: 'absolute',
          top: '25px',
          left: '20px',
          right: '20px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
        }} />
        
        {/* Side panel seams */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '20px',
          bottom: '30px',
          width: '2px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
          boxShadow: 'inset 1px 0 1px rgba(0,0,0,0.9)',
        }} />
        <div style={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          bottom: '30px',
          width: '2px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
          boxShadow: 'inset -1px 0 1px rgba(0,0,0,0.9)',
        }} />
        
        {/* Corner reinforcement plates */}
        {[
          { top: '22px', left: '18px', rotation: 0 },
          { top: '22px', right: '18px', rotation: 0 },
          { bottom: '28px', left: '18px', rotation: 0 },
          { bottom: '28px', right: '18px', rotation: 0 },
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(corner.top ? { top: corner.top } : {}),
              ...(corner.bottom ? { bottom: corner.bottom } : {}),
              ...(corner.left ? { left: corner.left } : {}),
              ...(corner.right ? { right: corner.right } : {}),
              width: '12px',
              height: '12px',
              background: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)',
              borderRadius: '2px',
              boxShadow: 
                'inset 0 1px 2px rgba(255,255,255,0.1), ' +
                'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                '0 1px 2px rgba(0,0,0,0.8)',
              border: '1px solid rgba(0,0,0,0.6)',
            }}
          >
            {/* Corner screw */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 60%, #0a0a0a 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.9)',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '0.5px',
                background: '#0a0a0a',
              }} />
            </div>
          </div>
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
        
        {/* CRT Screen Container - Positioned towards top */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(70vw, 70vh)',
          height: 'min(70vw, 70vh)',
          maxWidth: '500px',
          maxHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Recessed Cavity - The "hole" the screen sits in */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
            boxShadow: 
              'inset 0 12px 36px rgba(0,0,0,0.98), ' +
              'inset 0 6px 18px rgba(0,0,0,0.95), ' +
              'inset 0 3px 9px rgba(0,0,0,0.9)',
          }}>
            {/* THICK Metallic Bezel Ring - Old Navy Radar Style */}
            <div style={{
              position: 'absolute',
              top: '-35px',
              left: '-35px',
              right: '-35px',
              bottom: '-35px',
              borderRadius: '50%',
              background: `
                linear-gradient(135deg, 
                  #6a6a6a 0%, 
                  #5a5a5a 10%, 
                  #4a4a4a 25%, 
                  #5a5a5a 40%, 
                  #4a4a4a 55%, 
                  #3a3a3a 70%, 
                  #2a2a2a 85%, 
                  #1a1a1a 100%
                ),
                url(${metalTexture})
              `,
              backgroundBlendMode: 'overlay',
              backgroundSize: 'cover, cover',
              boxShadow: 
                'inset 0 3px 6px rgba(255,255,255,0.3), ' +
                'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
                'inset 0 0 80px rgba(0,0,0,0.4), ' +
                '0 8px 20px rgba(0,0,0,0.95), ' +
                '0 12px 30px rgba(0,0,0,0.85), ' +
                '0 0 40px rgba(0,0,0,0.7)',
              filter: 'brightness(0.88) contrast(1.1)',
              border: '5px solid rgba(0,0,0,0.8)',
              borderTop: '4px solid rgba(255,255,255,0.2)',
            }}>
              
              {/* DEEP Shadow beneath bezel for depth */}
              <div style={{
                position: 'absolute',
                top: '35px',
                left: '35px',
                right: '35px',
                bottom: '35px',
                borderRadius: '50%',
                boxShadow: 
                  'inset 0 0 35px rgba(0,0,0,0.95), ' +
                  'inset 0 0 60px rgba(0,0,0,0.85), ' +
                  'inset 0 0 90px rgba(0,0,0,0.7)',
                pointerEvents: 'none',
                zIndex: 1,
              }} />
              {/* Brushed metal highlight */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                right: '10%',
                height: '30%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                borderRadius: '50%',
                transform: 'rotate(-45deg)',
                pointerEvents: 'none',
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
              
              {/* Dust/grime on bezel */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '25%',
                width: '60px',
                height: '60px',
                backgroundImage: `url(${dust})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.3,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />
              
              {/* Bezel scratches - More extensive */}
              {[
                { top: '25%', left: '15%', width: '30px', angle: -25, opacity: 0.6 },
                { bottom: '30%', right: '20%', width: '35px', angle: 35, opacity: 0.65 },
                { top: '40%', right: '15%', width: '25px', angle: -18, opacity: 0.5 },
                { bottom: '45%', left: '18%', width: '28px', angle: 28, opacity: 0.55 },
                { top: '60%', left: '22%', width: '32px', angle: -32, opacity: 0.6 },
                { bottom: '20%', right: '25%', width: '22px', angle: 22, opacity: 0.5 },
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
              
              {/* Fingerprint smudges */}
              {[
                { top: '35%', left: '30%', size: '25px' },
                { bottom: '40%', right: '28%', size: '20px' },
                { top: '55%', right: '35%', size: '22px' },
              ].map((smudge, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(smudge.top ? { top: smudge.top } : {}),
                    ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
                    ...(smudge.left ? { left: smudge.left } : {}),
                    ...(smudge.right ? { right: smudge.right } : {}),
                    width: smudge.size,
                    height: smudge.size,
                    background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    filter: 'blur(2px)',
                  }}
                />
              ))}
              
              {/* Additional grime streaks */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '50px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
                transform: 'rotate(-20deg)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '25%',
                right: '30%',
                width: '45px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 100%)',
                transform: 'rotate(25deg)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
              }} />
              
              {/* Screws around bezel (4 screws at cardinal points) */}
              {[
                { top: '18px', left: '50%', transform: 'translateX(-50%)' },
                { bottom: '18px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '18px', transform: 'translateY(-50%)' },
                { top: '50%', right: '18px', transform: 'translateY(-50%)' },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...pos,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                    boxShadow: 
                      'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                      'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                      '0 2px 4px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,0,0,0.7)',
                    zIndex: 10,
                  }}
                >
                  {/* Screw slot */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '1.5px',
                    background: '#0a0a0a',
                    boxShadow: '0 0 2px rgba(0,0,0,0.9)',
                  }} />
                </div>
              ))}
            </div>
            
            {/* Actual CRT Screen - DEEPLY Inset Inside Bezel */}
            <div style={{
              position: 'absolute',
              top: '12%',
              left: '12%',
              right: '12%',
              bottom: '12%',
              borderRadius: '50%',
              background: '#0a1a0a',
              boxShadow: 
                'inset 0 30px 70px rgba(0,0,0,0.99), ' +
                'inset 0 18px 45px rgba(0,0,0,0.98), ' +
                'inset 0 10px 25px rgba(0,0,0,0.97), ' +
                'inset 0 5px 15px rgba(0,0,0,0.95), ' +
                'inset 0 0 150px rgba(0,255,0,0.22), ' +
                '0 0 3px rgba(0,255,0,0.06)',
              border: '6px solid #000',
              overflow: 'hidden',
            }}>
              
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
              
              {/* CRT Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                right: '-10%',
                bottom: '-10%',
                background: 'radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 9,
                filter: 'blur(20px)',
              }} />
              
              {/* CRT Distortion/Noise */}
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
              
              {/* Screws on screen corners */}
              {[
                { top: '2%', left: '2%' },
                { top: '2%', right: '2%' },
                { bottom: '2%', left: '2%' },
                { bottom: '2%', right: '2%' },
              ].map((corner, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(corner.top ? { top: corner.top } : {}),
                    ...(corner.bottom ? { bottom: corner.bottom } : {}),
                    ...(corner.left ? { left: corner.left } : {}),
                    ...(corner.right ? { right: corner.right } : {}),
                    width: '16px',
                    height: '16px',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 60%, #0a0a0a 100%)',
                    boxShadow: 
                      'inset 0 1px 2px rgba(255,255,255,0.2), ' +
                      'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                      '0 2px 4px rgba(0,0,0,0.8)',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '8px',
                      height: '0.5px',
                      background: '#0a0a0a',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(90deg)',
                      width: '8px',
                      height: '0.5px',
                      background: '#0a0a0a',
                    }} />
                  </div>
                </div>
              ))}
              
              {/* Tape patches on screen corners */}
              {[
                { top: '1%', left: '5%', rotation: -25, width: '40px', height: '15px' },
                { top: '1%', right: '5%', rotation: 25, width: '35px', height: '12px' },
                { bottom: '1%', left: '5%', rotation: 20, width: '38px', height: '14px' },
              ].map((tapePatch, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(tapePatch.top ? { top: tapePatch.top } : {}),
                    ...(tapePatch.bottom ? { bottom: tapePatch.bottom } : {}),
                    ...(tapePatch.left ? { left: tapePatch.left } : {}),
                    ...(tapePatch.right ? { right: tapePatch.right } : {}),
                    width: tapePatch.width,
                    height: tapePatch.height,
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    transform: `rotate(${tapePatch.rotation}deg)`,
                    opacity: 0.8,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    pointerEvents: 'none',
                    zIndex: 19,
                  }}
                />
              ))}
              
              {/* Scratches on screen corners */}
              {[
                { top: '3%', left: '8%', width: '50px', angle: -35, opacity: 0.6 },
                { top: '3%', right: '8%', width: '45px', angle: 35, opacity: 0.55 },
                { bottom: '3%', left: '8%', width: '48px', angle: 30, opacity: 0.6 },
                { bottom: '3%', right: '8%', width: '42px', angle: -30, opacity: 0.55 },
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
                    height: '1.5px',
                    background: 'rgba(255,255,255,0.3)',
                    transform: `rotate(${scratch.angle}deg)`,
                    opacity: scratch.opacity,
                    boxShadow: '0 0 2px rgba(0,0,0,0.7)',
                    pointerEvents: 'none',
                    zIndex: 18,
                  }}
                />
              ))}
              
              {/* CRT texture overlay - stronger */}
              <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${crtTexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.25,
            pointerEvents: 'none',
            zIndex: 12,
          }} />
              {/* Dirty glass overlay - heavier */}
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
            zIndex: 13,
          }} />
              
              {/* Dust particles - more visible */}
              <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'screen',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 14,
          }} />
              
              {/* Additional grime layer */}
              <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: '200% 200%',
            backgroundPosition: '30% 40%',
            mixBlendMode: 'multiply',
            opacity: 0.2,
            pointerEvents: 'none',
            zIndex: 11,
          }} />
              
              {/* Screen burn-in effect */}
              <div style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '60px',
            height: '60px',
            border: '1px solid rgba(0,255,0,0.08)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 10,
          }} />

              {/* Static noise */}
              <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
            animation: 'staticFlicker 0.1s infinite',
            pointerEvents: 'none',
            zIndex: 5,
          }} />

              {/* Radar display */}
              <svg width="100%" height="100%" viewBox="0 0 340 340">
            {/* Range rings */}
            <circle cx="170" cy="170" r="150" fill="none" stroke="#00ff00" strokeWidth="1" opacity="0.3" />
            <circle cx="170" cy="170" r="100" fill="none" stroke="#00ff00" strokeWidth="1" opacity="0.3" />
            <circle cx="170" cy="170" r="50" fill="none" stroke="#00ff00" strokeWidth="1" opacity="0.3" />
            
            {/* Crosshair */}
            <line x1="170" y1="20" x2="170" y2="320" stroke="#00ff00" strokeWidth="1" opacity="0.2" />
            <line x1="20" y1="170" x2="320" y2="170" stroke="#00ff00" strokeWidth="1" opacity="0.2" />

            {/* Sweep line */}
            <line
              x1="170"
              y1="170"
              x2={170 + Math.cos((sweepAngle * Math.PI) / 180) * 150}
              y2={170 + Math.sin((sweepAngle * Math.PI) / 180) * 150}
              stroke="#00ff00"
              strokeWidth="2"
              opacity="0.8"
              filter="url(#glow)"
            />

            {/* Sweep fade trail */}
            <path
              d={`M 170 170 L ${170 + Math.cos(((sweepAngle - 30) * Math.PI) / 180) * 150} ${170 + Math.sin(((sweepAngle - 30) * Math.PI) / 180) * 150} A 150 150 0 0 1 ${170 + Math.cos((sweepAngle * Math.PI) / 180) * 150} ${170 + Math.sin((sweepAngle * Math.PI) / 180) * 150} Z`}
              fill="url(#sweepGradient)"
              opacity="0.4"
            />

            {/* Ghost blip */}
            <circle
              cx={170 + Math.cos((ghostBlip.angle * Math.PI) / 180) * ghostBlip.distance}
              cy={170 + Math.sin((ghostBlip.angle * Math.PI) / 180) * ghostBlip.distance}
              r="6"
              fill="#ff0000"
              opacity="0.9"
              filter="url(#glow)"
            >
              <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite" />
            </circle>

            {/* Glow filter - Enhanced for bloom */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feColorMatrix in="coloredBlur" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="sweepGradient">
                <stop offset="0%" stopColor="#00ff00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
              </radialGradient>
            </defs>
              </svg>

              {/* Compass heading - Vintage CRT Style */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                color: '#00ff00',
                letterSpacing: '2px',
                filter: 'blur(0.3px)',
                textShadow: 
                  '0 0 2px #00ff00, ' +
                  '0 0 4px #00ff00, ' +
                  '0 0 8px rgba(0,255,0,0.6), ' +
                  '1px 0 0 rgba(255,0,0,0.3), ' +
                  '-1px 0 0 rgba(0,0,255,0.3)',
                imageRendering: 'pixelated',
                zIndex: 25,
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `url(${dust})`,
                  backgroundSize: '50px 50px',
                  mixBlendMode: 'overlay',
                  opacity: 0.15,
                  pointerEvents: 'none',
                }} />
                HDG: {Math.floor(sweepAngle)}°
              </div>

              {/* Range indicator - Vintage CRT Style */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#00ff00',
                letterSpacing: '1px',
                filter: 'blur(0.3px)',
                textShadow: 
                  '0 0 2px #00ff00, ' +
                  '0 0 4px rgba(0,255,0,0.5), ' +
                  '0 0 6px rgba(0,255,0,0.4), ' +
                  '1px 0 0 rgba(255,0,0,0.25), ' +
                  '-1px 0 0 rgba(0,0,255,0.25)',
                imageRendering: 'pixelated',
                opacity: 0.7,
                zIndex: 25,
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `url(${dust})`,
                  backgroundSize: '40px 40px',
                  mixBlendMode: 'overlay',
                  opacity: 0.12,
                  pointerEvents: 'none',
                }} />
                RNG: 150m
              </div>
              
              {/* CRT Glass Curvature Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 18,
              }} />
              
              {/* Glass Reflection/Glare Overlay - More Realistic */}
              <div style={{
                position: 'absolute',
                top: '12%',
                left: '18%',
                width: '45%',
                height: '35%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 40%, transparent 100%)',
                borderRadius: '50%',
                transform: 'rotate(-42deg)',
                pointerEvents: 'none',
                zIndex: 20,
                mixBlendMode: 'screen',
                filter: 'blur(1px)',
              }} />
              
              {/* Additional subtle reflection */}
              <div style={{
                position: 'absolute',
                top: '8%',
                right: '12%',
                width: '30%',
                height: '25%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 20,
                mixBlendMode: 'screen',
                filter: 'blur(0.5px)',
              }} />
              
              {/* Faint Scanlines */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,0,0.03) 1px, rgba(0,255,0,0.03) 2px)',
                pointerEvents: 'none',
                zIndex: 19,
                mixBlendMode: 'screen',
              }} />
              
              {/* Bloom Effect on Bright Areas */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0,255,0,0.15) 0%, transparent 60%)',
                filter: 'blur(8px)',
                pointerEvents: 'none',
                zIndex: 17,
                mixBlendMode: 'screen',
                opacity: 0.6,
              }} />
              
              {/* Inner shadow cast by bezel onto screen - Deeper */}
              <div style={{
                position: 'absolute',
                top: '28px',
                left: '28px',
                right: '28px',
                bottom: '28px',
                borderRadius: '50%',
                boxShadow: 
                  'inset 0 0 30px rgba(0,0,0,0.8), ' +
                  'inset 0 0 50px rgba(0,0,0,0.6), ' +
                  'inset 0 4px 12px rgba(0,0,0,0.7)',
                pointerEvents: 'none',
                zIndex: 5,
              }} />
              
              {/* Additional depth shadow layer */}
              <div style={{
                position: 'absolute',
                top: '25px',
                left: '25px',
                right: '25px',
                bottom: '25px',
                borderRadius: '50%',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 4,
              }} />
            </div>
            {/* End of Actual CRT Screen */}
          </div>
          {/* End of Recessed Cavity - The "hole" */}
        </div>
        {/* End of CRT Screen Container - Recessed Cavity */}

        {/* Physical controls */}
        <div style={{
          marginTop: '15px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}>
          {/* Power LED */}
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff00',
            boxShadow: '0 0 10px #00ff00',
            animation: 'pulse 2s infinite',
          }} />

          {/* Label */}
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: '#888',
            letterSpacing: '1px',
          }}>
            PWR
          </div>

          {/* Duct tape repair - using actual tape texture */}
          <div style={{
            marginLeft: 'auto',
            width: '70px',
            height: '24px',
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            transform: 'rotate(-6deg)',
            opacity: 0.85,
            boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }} />
        </div>

        <style>{`
          @keyframes staticFlicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default RadarToolMock;
