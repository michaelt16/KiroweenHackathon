import { useState, useEffect } from 'react';
import plasticDark from '../../assets/texture/scratchedplasticdark.png';
import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import rust from '../../assets/texture/brownrust.png';
import filmgrain from '../../assets/texture/filmgrain.png';

// K-II style EMF meter with analog damage
// Follows 007 Investigation Tools Design System
export function EMFMeterMock() {
  const [emfLevel, setEmfLevel] = useState(0);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random EMF spikes
      const spike = Math.random();
      if (spike > 0.95) {
        setEmfLevel(5);
        setFlickering(true);
        setTimeout(() => setFlickering(false), 200);
      } else if (spike > 0.85) {
        setEmfLevel(Math.floor(Math.random() * 3) + 2);
      } else {
        setEmfLevel(Math.random() > 0.7 ? 1 : 0);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
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
      
      {/* Layer 1: Device Casing - Full-screen physical slab - HEAVY STEEL (match Radar) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',  // Match Radar
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
        
        {/* Directional brushed-metal texture (linear scratches) */}
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
        }} />        {/* Deeper beveled edges for machined metal finish */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '12px',  // Deeper bevel
          background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12px',  // Deeper bevel
          background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '12px',  // Deeper bevel
          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '12px',  // Deeper bevel
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
          height: '10%',  // Reduced to accommodate higher LED panel
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
        
        {/* Welded metal seams (like radar) - Aligned with casing sections */}
        {[
          { top: '10%', left: '8%', right: '8%', height: '2px', opacity: 0.6 },  // Top seam - aligns with top section end
          { bottom: '25%', left: '10%', right: '10%', height: '2px', opacity: 0.55 },  // Bottom seam - aligns with bottom section start
          { top: '10%', left: '6%', width: '2px', bottom: '25%', opacity: 0.5 },  // Left vertical seam
          { top: '10%', right: '6%', width: '2px', bottom: '25%', opacity: 0.5 },  // Right vertical seam
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
        
        {/* 4 Large corner screws (match Radar) */}
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
              width: '14px',  // Larger screws like Radar
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
          background: emfLevel >= 4 
            ? 'radial-gradient(circle at 30% 30%, #ff0000 0%, #aa0000 50%, #660000 100%)'
            : 'radial-gradient(circle at 30% 30%, #3a1a1a 0%, #1a0a0a 60%, #0a0a0a 100%)',
          boxShadow: emfLevel >= 4
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
        
        {/* Calibration label */}
        <div style={{
          position: 'absolute',
          top: '7%',
          left: '20%',
          fontFamily: '"Courier New", monospace',
          fontSize: '7px',
          color: 'rgba(150,150,150,0.5)',
          transform: 'rotate(0.2deg)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          CAL
        </div>
        
        {/* Battery label */}
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          fontFamily: '"Courier New", monospace',
          fontSize: '7px',
          color: 'rgba(150,150,150,0.5)',
          transform: 'rotate(0.5deg)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          BAT
        </div>
        
        {/* Small printed text around frame */}
        {[
          { top: '14%', left: '5%', text: '9V', rotation: 0.3 },
          { top: '65%', left: '5%', text: '±0.1V', rotation: -0.2 },
          { bottom: '20%', right: '5%', text: 'DC', rotation: 0.4 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(item.top ? { top: item.top } : {}),
              ...(item.bottom ? { bottom: item.bottom } : {}),
              ...(item.left ? { left: item.left } : {}),
              ...(item.right ? { right: item.right } : {}),
              fontFamily: '"Courier New", monospace',
              fontSize: '5px',
              color: 'rgba(120,120,120,0.3)',
              transform: `rotate(${item.rotation}deg)`,
              letterSpacing: '0.2px',
              pointerEvents: 'none',
              zIndex: 21,
            }}
          >
            {item.text}
          </div>
        ))}
        
        {/* Micro-indentations (small dents/scratches) */}
        {[
          { top: '18%', left: '7%', size: '3px' },
          { top: '42%', right: '7%', size: '2.5px' },
          { bottom: '22%', left: '7%', size: '3px' },
          { top: '28%', left: '50%', size: '2px', transform: 'translateX(-50%)' },
        ].map((dent, i) => (
          <div
            key={i}
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
        
        {/* Localized rust around screws */}
        {[
          { top: '12%', left: '8%', size: '16px' },  // Moved up 10%
          { top: '12%', right: '8%', size: '14px' },  // Moved up 10%
          { bottom: '27%', left: '10%', size: '15px' },
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
              opacity: 0.5,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 9,
            }}
          />
        ))}
        
        {/* Industrial vent slits (like radar) */}
        {[
          { left: '3%', top: '18%', bottom: '27%', count: 8 },  // Moved up 10%
          { right: '3%', top: '18%', bottom: '27%', count: 8 },  // Moved up 10%
          { left: '5%', top: '60%', bottom: '68%', count: 6 },
          { right: '5%', top: '60%', bottom: '68%', count: 6 },
        ].map((vent, i) => (
          <div
            key={i}
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
        
        {/* Layer 2-5: Texture Overlays (3-5 layers like Radar) */}
        {/* Metal texture overlay (match Radar) */}
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
        
        {/* Rust/wear overlay (match Radar) */}
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
        
        {/* Dust/grime layer (match Radar) */}
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
        
        {/* Dark grime layer */}
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
        
        {/* Additional plastic dark texture layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${plasticDark})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 6,
        }} />
        
        {/* Layer 6-10: Damage Elements - Match radar intensity */}
        {/* Deep scratches on casing */}
        {[
          { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.6 },
          { bottom: '20%', right: '8%', width: '130px', angle: 30, opacity: 0.55 },
          { top: '60%', left: '3%', width: '120px', angle: 45, opacity: 0.5 },
          { top: '35%', right: '5%', width: '110px', angle: -35, opacity: 0.6 },
          { bottom: '35%', left: '6%', width: '125px', angle: 40, opacity: 0.55 },
          { top: '45%', left: '8%', width: '100px', angle: -20, opacity: 0.5 },
        ].map((scratch, i) => (
          <div
            key={`light-scratch-${i}`}
            style={{
              position: 'absolute',
              top: scratch.top,
              bottom: scratch.bottom,
              left: scratch.left,
              right: scratch.right,
              width: scratch.width,
              height: '2px',
              background: 'rgba(255,255,255,0.35)',  // Boosted contrast
              transform: `rotate(${scratch.angle}deg)`,
              opacity: scratch.opacity,
              boxShadow: '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)',  // Boosted contrast
              pointerEvents: 'none',
              zIndex: 6,
            }}
          />
        ))}
        
        {/* Deeper ambient occlusion under LED housing */}
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '15%',
          right: '15%',
          height: '45vh',
          maxHeight: '450px',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
          zIndex: 9,
        }} />
        
        {/* Rust specks scattered (like radar) */}
        {[
          { top: '18%', left: '15%', size: '14px', opacity: 0.55 },
          { top: '45%', right: '12%', size: '16px', opacity: 0.6 },
          { bottom: '22%', left: '18%', size: '12px', opacity: 0.5 },
          { bottom: '30%', right: '15%', size: '15px', opacity: 0.58 },
          { top: '70%', left: '20%', size: '13px', opacity: 0.52 },
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
        
        {/* Fingerprint smudges (subtle) */}
        {[
          { top: '25%', left: '12%', size: '30px', opacity: 0.3 },
          { bottom: '28%', right: '10%', size: '25px', opacity: 0.25 },
          { top: '50%', right: '8%', size: '28px', opacity: 0.28 },
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
              background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              filter: 'blur(3px)',
              zIndex: 8,
            }}
          />
        ))}
        
        {/* Multiple scuffs and scratches (dark scratches) */}
        {[
          { top: '18px', right: '22px', width: '55px', angle: -32, opacity: 0.5 },
          { bottom: '32px', left: '32px', width: '40px', angle: 22, opacity: 0.4 },
          { top: '45%', right: '12px', width: '30px', angle: -15, opacity: 0.35 },
          { bottom: '50px', right: '25px', width: '45px', angle: 28, opacity: 0.45 },
          { top: '60px', left: '20px', width: '35px', angle: 12, opacity: 0.3 },
        ].map((scratch, i) => (
          <div
            key={`dark-scratch-${i}`}
            style={{
              position: 'absolute',
              top: scratch.top,
              bottom: scratch.bottom,
              left: scratch.left,
              right: scratch.right,
              width: scratch.width,
              height: '2px',
              background: 'rgba(0,0,0,0.6)',
              transform: `rotate(${scratch.angle}deg)`,
              opacity: scratch.opacity,
              boxShadow: '0 0 2px rgba(0,0,0,0.8)',
              pointerEvents: 'none',
              zIndex: 8,
            }}
          />
        ))}

        {/* HEAVY INDUSTRIAL WEAR - Deep gouges, edge chipping, grime buildup, rain streaks, burnt edges */}
        {/* Deep gouges (heavier than scratches) */}
        {[
          { top: '15%', left: '8%', width: '120px', angle: -35, depth: '2px', opacity: 0.7 },
          { bottom: '20%', right: '10%', width: '100px', angle: 40, depth: '2px', opacity: 0.65 },
          { top: '55%', left: '5%', width: '90px', angle: 25, depth: '1.5px', opacity: 0.6 },
          { bottom: '35%', left: '12%', width: '85px', angle: -28, depth: '2px', opacity: 0.68 },
        ].map((gouge, i) => (
          <div
            key={`gouge-${i}`}
            style={{
              position: 'absolute',
              ...(gouge.top ? { top: gouge.top } : {}),
              ...(gouge.bottom ? { bottom: gouge.bottom } : {}),
              ...(gouge.left ? { left: gouge.left } : {}),
              ...(gouge.right ? { right: gouge.right } : {}),
              width: gouge.width,
              height: gouge.depth,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(50,30,20,0.8) 50%, rgba(0,0,0,0.9) 100%)',
              transform: `rotate(${gouge.angle}deg)`,
              opacity: gouge.opacity,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7)',
              pointerEvents: 'none',
              zIndex: 8,
            }}
          />
        ))}
        
        {/* Edge chipping (more aggressive) */}
        {[
          { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
          { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
          { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
          { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
          // Additional chipping around LED cavity
          { top: '16%', left: '12%', width: '20px', height: '20px', clipPath: 'polygon(0% 0%, 60% 0%, 0% 60%)', opacity: 0.7 },
          { top: '16%', right: '12%', width: '22px', height: '22px', clipPath: 'polygon(100% 0%, 100% 60%, 40% 0%)', opacity: 0.72 },
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
        
        {/* Grime buildup around screws (heavier) */}
        {[
          { top: '12px', left: '12px', size: '25px', opacity: 0.6 },
          { top: '12px', right: '12px', size: '28px', opacity: 0.65 },
          { bottom: '12px', left: '12px', size: '26px', opacity: 0.62 },
          { bottom: '12px', right: '12px', size: '24px', opacity: 0.6 },
        ].map((grime, i) => (
          <div
            key={`screw-grime-${i}`}
            style={{
              position: 'absolute',
              ...(grime.top ? { top: grime.top } : {}),
              ...(grime.bottom ? { bottom: grime.bottom } : {}),
              ...(grime.left ? { left: grime.left } : {}),
              ...(grime.right ? { right: grime.right } : {}),
              width: grime.size,
              height: grime.size,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: grime.opacity,
              borderRadius: '50%',
              filter: 'blur(3px)',
              pointerEvents: 'none',
              zIndex: 11,
            }}
          />
        ))}
        
        {/* Faint vertical streaks (rain marks) */}
        {[
          { left: '8%', top: '10%', bottom: '30%', width: '1px', opacity: 0.3 },
          { left: '25%', top: '15%', bottom: '40%', width: '1px', opacity: 0.25 },
          { right: '12%', top: '12%', bottom: '35%', width: '1px', opacity: 0.28 },
          { right: '28%', top: '18%', bottom: '45%', width: '1px', opacity: 0.22 },
        ].map((streak, i) => (
          <div
            key={`rain-${i}`}
            style={{
              position: 'absolute',
              ...(streak.left ? { left: streak.left } : {}),
              ...(streak.right ? { right: streak.right } : {}),
              top: streak.top,
              bottom: streak.bottom,
              width: streak.width,
              background: 'linear-gradient(180deg, transparent 0%, rgba(100,80,60,0.4) 30%, rgba(100,80,60,0.5) 70%, transparent 100%)',
              opacity: streak.opacity,
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
              zIndex: 7,
            }}
          />
        ))}
        
        {/* Burnt edges around LED cavity */}
        {[
          { top: '16%', left: '12%', right: '12%', height: '3px', opacity: 0.5 },
          { bottom: '16%', left: '12%', right: '12%', height: '3px', opacity: 0.55 },
          { top: '16%', bottom: '16%', left: '12%', width: '3px', opacity: 0.48 },
          { top: '16%', bottom: '16%', right: '12%', width: '3px', opacity: 0.52 },
        ].map((burnt, i) => (
          <div
            key={`burnt-${i}`}
            style={{
              position: 'absolute',
              ...(burnt.top ? { top: burnt.top } : {}),
              ...(burnt.bottom ? { bottom: burnt.bottom } : {}),
              ...(burnt.left ? { left: burnt.left } : {}),
              ...(burnt.right ? { right: burnt.right } : {}),
              ...(burnt.width ? { width: burnt.width } : {}),
              ...(burnt.height ? { height: burnt.height } : {}),
              background: 'linear-gradient(90deg, rgba(50,20,10,0.8) 0%, rgba(30,10,5,0.9) 50%, rgba(50,20,10,0.8) 100%)',
              opacity: burnt.opacity,
              filter: 'blur(2px)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
        ))}
        
        {/* Tape pieces with edges overhanging frame */}
        {[
          { top: '5%', left: '-8px', width: '60px', height: '18px', rotation: -2.5, opacity: 0.7 },
          { bottom: '15%', right: '-10px', width: '55px', height: '16px', rotation: 1.8, opacity: 0.65 },
          { top: '12%', left: '8%', width: '45px', height: '14px', rotation: 0.5, opacity: 0.6 },
        ].map((tape, i) => (
          <div
            key={`tape-${i}`}
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
              mixBlendMode: 'multiply',
              opacity: tape.opacity,
              transform: `rotate(${tape.rotation}deg)`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />
        ))}
        
        {/* Tape patches overlapping display edges (1-2 pieces like radar) */}
        {[
          { top: '14%', left: '10%', width: '50px', height: '16px', rotation: 1.2, opacity: 0.65, overlap: '8px' },
          { bottom: '14%', right: '10%', width: '48px', height: '14px', rotation: -0.8, opacity: 0.6, overlap: '10px' },
        ].map((tape, i) => (
          <div
            key={`display-tape-${i}`}
            style={{
              position: 'absolute',
              ...(tape.top ? { top: tape.top } : {}),
              ...(tape.bottom ? { bottom: tape.bottom } : {}),
              ...(tape.left ? { left: tape.left, marginLeft: `-${tape.overlap}` } : {}),
              ...(tape.right ? { right: tape.right, marginRight: `-${tape.overlap}` } : {}),
              width: tape.width,
              height: tape.height,
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: tape.opacity,
              transform: `rotate(${tape.rotation}deg)`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
              zIndex: 27,  // Above glass
            }}
          />
        ))}

        {/* Labels & Text - ETCHED STYLE (match Radar) - Light top highlight, dark bottom shadow, 40-50% opacity */}
        {/* Handwritten label - EMF METER */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '25px',
          fontFamily: '"Caveat", cursive',
          fontSize: '13px',
          color: 'rgba(200,200,200,0.45)',  // 40-50% opacity
          transform: 'rotate(-1.2deg)',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.3), ' +  // Light top highlight
            '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
            '1px 1px 3px rgba(0,0,0,0.8)',
          letterSpacing: '0.5px',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          EMF METER
        </div>

        {/* Engineering Labels - Top Section - ETCHED STYLE */}
        {[
          { top: '3%', left: '12%', label: 'EMF', rotation: -0.5, fontSize: '11px' },
          { top: '3%', left: '22%', label: 'LEVEL', rotation: 0.4, fontSize: '10px' },
          { top: '3%', left: '32%', label: 'PWR', rotation: -0.3, fontSize: '10px' },
          { top: '3%', right: '15%', label: 'CAL', rotation: 0.6, fontSize: '10px' },
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
              color: 'rgba(200,200,200,0.45)',  // 40-50% opacity
              transform: `rotate(${label.rotation}deg)`,  // 0.3°-0.6° rotation
              textShadow: 
                '0 -1px 1px rgba(255,255,255,0.25), ' +  // Light top highlight
                '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
                '1px 1px 3px rgba(0,0,0,0.8)',
              letterSpacing: '0.5px',
              pointerEvents: 'none',
              zIndex: 21,
            }}
          >
            {label.label}
          </div>
        ))}
        
        {/* Model name - K-II METER - ETCHED */}
        <div style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          transform: 'translateX(-50%) rotate(0.4deg)',  // 0.3°-0.6° rotation
          fontFamily: '"Courier New", monospace',
          fontSize: '9px',
          color: 'rgba(180,180,180,0.45)',  // 40-50% opacity
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.25), ' +  // Light top highlight
            '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
            '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          K-II METER
        </div>
        
        {/* Serial number - ETCHED STYLE */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '15%',
          fontFamily: '"Courier New", monospace',
          fontSize: '8px',
          color: 'rgba(150,150,150,0.45)',  // 40-50% opacity
          transform: 'rotate(0.4deg)',  // 0.3°-0.6° rotation
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
            '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
            '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          SN: EMF-2019-K2
        </div>
        
        {/* Handwritten calibration note - ETCHED */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '15%',
          fontFamily: '"Caveat", cursive',
          fontSize: '10px',
          color: 'rgba(180,180,150,0.45)',  // 40-50% opacity
          transform: 'rotate(-0.5deg)',  // 0.3°-0.6° rotation
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
            '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
            '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          cal. 03/19
        </div>
        
        {/* BAT OK label - ETCHED */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          right: '8%',
          fontFamily: '"Courier New", monospace',
          fontSize: '8px',
          color: 'rgba(150,150,150,0.45)',  // 40-50% opacity
          transform: 'rotate(0.3deg)',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
            '0 1px 2px rgba(0,0,0,0.9), ' +  // Dark bottom shadow
            '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          BAT OK
        </div>
        
        {/* Tiny unreadable engineering text */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          left: '12%',
          fontFamily: '"Courier New", monospace',
          fontSize: '6px',
          color: 'rgba(120,120,120,0.3)',
          transform: 'rotate(-0.2deg)',
          letterSpacing: '0.3px',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          MFR: 1985 | V: 2.1 | R: 0.05Ω
        </div>

        {/* Layer 11-15: LED Housing - Deeply Recessed Cavity - COMPACT SQUARE (45-55% vertical, aspect ratio ~1.2:1) */}
        <div style={{
          position: 'absolute',
          top: '18%',  // Centered vertically for compact layout
          left: '50%',
          transform: emfLevel >= 5 
            ? `translateX(-50%) translate(${Math.sin(Date.now() / 80) * 1.5}px, ${Math.cos(Date.now() / 90) * 1.5}px)`  // Level 5: Light screen shake (1-2px jitter)
            : 'translateX(-50%)',
          width: 'min(90vw, 650px)',  // Responsive width - use 90vw on mobile (with padding), max 650px
          height: 'min(50vh, 500px)',  // Reduced height by 40% (was 65vh, now 50vh = 45-55% of device)
          maxWidth: '650px',
          maxHeight: '500px',
          aspectRatio: '1.2',  // Slightly vertical rectangle
          boxSizing: 'border-box',  // Ensure padding is included in width
          transition: emfLevel >= 5 ? 'transform 0.05s' : 'transform 0.2s',  // Level 5: Faster shake
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
          boxShadow: 
            'inset 0 10px 30px rgba(0,0,0,0.99), ' +
            'inset 0 5px 15px rgba(0,0,0,0.97), ' +
            'inset 0 2px 8px rgba(0,0,0,0.95)',
          borderRadius: '12px',
          zIndex: 11,
        }}>
          
          {/* THICK Metallic Bezel Ring - Raised Above LED Panel (like radar) - SLIGHTLY REDUCED */}
          <div style={{
            position: 'absolute',
            top: '-28px',  // Reduced for mobile compatibility
            left: '-28px',
            right: '-28px',
            bottom: '-28px',
            borderRadius: '12px',
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
            border: '5px solid rgba(0,0,0,0.8)',  // Thicker border
            borderTop: '4px solid rgba(255,255,255,0.1)',
            zIndex: 12,
          }}>
            
            {/* Ambient bounce light around LED panel (subtle green/yellow tint on bezel) */}
            {emfLevel > 0 && (
              <div style={{
                position: 'absolute',
                top: '32px',
                left: '32px',
                right: '32px',
                bottom: '32px',
                borderRadius: '8px',
                background: emfLevel >= 5 
                  ? `radial-gradient(ellipse at center, rgba(255,0,0,0.25) 0%, rgba(255,136,0,0.18) 30%, rgba(255,136,0,0.1) 50%, transparent 80%)`
                  : emfLevel >= 3
                  ? `radial-gradient(ellipse at center, rgba(255,255,0,0.22) 0%, rgba(255,136,0,0.15) 30%, rgba(255,255,0,0.08) 50%, transparent 80%)`
                  : `radial-gradient(ellipse at center, rgba(0,255,85,0.2) 0%, rgba(0,255,85,0.12) 30%, rgba(0,255,85,0.06) 50%, transparent 80%)`,
                boxShadow: emfLevel >= 5
                  ? '0 0 30px rgba(255,0,0,0.4), 0 0 60px rgba(255,136,0,0.3), 0 0 90px rgba(255,136,0,0.2)'
                  : emfLevel >= 3
                  ? '0 0 25px rgba(255,255,0,0.35), 0 0 50px rgba(255,136,0,0.25), 0 0 75px rgba(255,255,0,0.15)'
                  : '0 0 20px rgba(0,255,85,0.3), 0 0 40px rgba(0,255,85,0.2), 0 0 60px rgba(0,255,85,0.12)',
                pointerEvents: 'none',
                zIndex: 1,
                mixBlendMode: 'screen',
              }} />
            )}
            
            {/* STRONGER bezel shadow for more depth (match radar) */}
            <div style={{
              position: 'absolute',
              top: '32px',  // Adjusted for reduced bezel
              left: '32px',
              right: '32px',
              bottom: '32px',
              borderRadius: '8px',
              boxShadow: 
                'inset 0 0 60px rgba(0,0,0,0.99), ' +  // Stronger shadow
                'inset 0 0 100px rgba(0,0,0,0.98), ' +
                'inset 0 0 140px rgba(0,0,0,0.96), ' +
                'inset 0 0 180px rgba(0,0,0,0.94)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Uneven grime around bezel (dirty finger marks) */}
            {[
              { top: '5%', right: '20%', size: '50px', opacity: 0.45 },  // Moved up 10%
              { bottom: '20%', left: '18%', size: '45px', opacity: 0.4 },
              { top: '50%', left: '22%', size: '40px', opacity: 0.42 },
            ].map((grime, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...(grime.top ? { top: grime.top } : {}),
                  ...(grime.bottom ? { bottom: grime.bottom } : {}),
                  ...(grime.left ? { left: grime.left } : {}),
                  ...(grime.right ? { right: grime.right } : {}),
                  width: grime.size,
                  height: grime.size,
                  backgroundImage: `url(${dust})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'multiply',
                  opacity: grime.opacity,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            ))}
            
            {/* Deeper scratches around LED panel edges */}
            {[
              { top: '10%', left: '12%', width: '45px', angle: -30, opacity: 0.65 },  // Moved up 10%
              { bottom: '25%', right: '15%', width: '50px', angle: 35, opacity: 0.6 },
              { top: '25%', right: '10%', width: '38px', angle: -22, opacity: 0.58 },  // Moved up 10%
              { top: '35%', left: '14%', width: '42px', angle: 28, opacity: 0.62 },  // Moved up 10%
              { bottom: '40%', left: '16%', width: '40px', angle: -25, opacity: 0.6 },
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
                  background: 'rgba(0,0,0,0.7)',
                  transform: `rotate(${scratch.angle}deg)`,
                  opacity: scratch.opacity,
                  boxShadow: '0 0 2px rgba(0,0,0,0.8)',
                  pointerEvents: 'none',
                }}
              />
            ))}
            
            {/* Structural screws at corners (like radar) */}
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
          
          {/* LED Panel Container - DEEP INSET CAVITY (25-40px depth matching Radar) - LARGER SIZE */}
          <div style={{
            position: 'absolute',
            top: '12%',  // Less inset to make display 25-35% larger
            left: '12%',  // Less inset
            right: '12%',  // Less inset
            bottom: '12%',  // Less inset
            background: '#0a0a0a',
            borderRadius: '8px',
            border: '4px solid #000',
            boxShadow: 
              'inset 0 25px 60px rgba(0,0,0,0.99), ' +  // Deeper shadow (25-40px depth)
              'inset 0 15px 40px rgba(0,0,0,0.98), ' +
              'inset 0 8px 20px rgba(0,0,0,0.97), ' +
              'inset 0 0 100px rgba(0,0,0,0.96), ' +
              'inset 0 0 150px rgba(0,0,0,0.94), ' +
              'inset 0 -5px 10px rgba(0,0,0,0.9)',  // Dark occlusion shadow at bottom
            padding: '14px',  // Reduced padding for larger bars
            transform: 'rotate(0.8deg)',  // Slight tilt for imperfection (0.8°-1.3°)
            zIndex: 13,
          }}>
            
            {/* DIRTY GLASS COVER - Physical layer above LEDs with fingerprints, dust, smudges, scratches */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 26,
              backgroundImage: `url(${dirtyGlass})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.4,
            }}>
              {/* Additional smudges on glass */}
              {[
                { top: '20%', left: '12%', size: '45px', opacity: 0.35 },
                { bottom: '25%', right: '15%', size: '40px', opacity: 0.3 },
                { top: '45%', left: '18%', size: '35px', opacity: 0.32 },
                { top: '60%', right: '20%', size: '38px', opacity: 0.28 },
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
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(6px)',
                    opacity: smudge.opacity,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              
              {/* Fingerprints on glass */}
              {[
                { top: '30%', right: '20%', size: '28px', opacity: 0.25 },
                { bottom: '30%', left: '22%', size: '25px', opacity: 0.22 },
                { top: '55%', left: '15%', size: '22px', opacity: 0.2 },
              ].map((fp, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...(fp.top ? { top: fp.top } : {}),
                    ...(fp.bottom ? { bottom: fp.bottom } : {}),
                    ...(fp.left ? { left: fp.left } : {}),
                    ...(fp.right ? { right: fp.right } : {}),
                    width: fp.size,
                    height: fp.size,
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    borderRadius: '50%',
                    filter: 'blur(4px)',
                    opacity: fp.opacity,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              
              {/* Oily smudges */}
              {[
                { top: '40%', left: '25%', size: '30px', opacity: 0.2 },
                { bottom: '35%', right: '18%', size: '32px', opacity: 0.18 },
              ].map((smudge, i) => (
                <div
                  key={`oil-${i}`}
                  style={{
                    position: 'absolute',
                    ...(smudge.top ? { top: smudge.top } : {}),
                    ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
                    ...(smudge.left ? { left: smudge.left } : {}),
                    ...(smudge.right ? { right: smudge.right } : {}),
                    width: smudge.size,
                    height: smudge.size,
                    background: 'radial-gradient(ellipse, rgba(200,200,180,0.15) 0%, transparent 65%)',
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    opacity: smudge.opacity,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              
              {/* Faint scratches on glass */}
              {[
                { top: '15%', left: '10%', width: '60px', angle: -25, opacity: 0.15 },
                { bottom: '20%', right: '12%', width: '55px', angle: 30, opacity: 0.12 },
                { top: '50%', left: '8%', width: '45px', angle: 20, opacity: 0.1 },
              ].map((scratch, i) => (
                <div
                  key={`glass-scratch-${i}`}
                  style={{
                    position: 'absolute',
                    ...(scratch.top ? { top: scratch.top } : {}),
                    ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
                    ...(scratch.left ? { left: scratch.left } : {}),
                    ...(scratch.right ? { right: scratch.right } : {}),
                    width: scratch.width,
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    transform: `rotate(${scratch.angle}deg)`,
                    opacity: scratch.opacity,
                    filter: 'blur(0.5px)',
                    pointerEvents: 'none',
                  }}
                />
              ))}
              
              {/* Small crack or chipped corner in glass */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '18px',
                height: '18px',
                clipPath: 'polygon(100% 0%, 100% 60%, 40% 0%)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                opacity: 0.7,
                pointerEvents: 'none',
              }} />
              
              {/* Level 5: Thin crack on glass (cosmetic) */}
              {emfLevel >= 5 && (
                <div style={{
                  position: 'absolute',
                  top: '25%',
                  left: '15%',
                  width: '80px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,0,0,0.4), transparent)',
                  transform: 'rotate(-15deg)',
                  filter: 'blur(1px)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                }} />
              )}
              
              {/* Dust on glass */}
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
                borderRadius: '8px',
                pointerEvents: 'none',
              }} />
            </div>
            
            {/* Darker vignette on LED window (stronger than radar) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 23,
              borderRadius: '8px',
            }} />
            
            {/* Subtle CRT-like noise overlay */}
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
              opacity: 0.15,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 24,
            }} />
            
            {/* Dust and small debris overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: '120% 120%',
              backgroundPosition: '50% 50%',
              mixBlendMode: 'multiply',
              opacity: 0.35,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 25,
            }} />
          
          {/* Screws inside display housing (2-3 screws) */}
          {[
            { top: '10px', left: '10px' },
            { top: '10px', right: '10px' },
            { bottom: '10px', left: '10px' },
          ].map((corner, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...(corner.top ? { top: corner.top } : {}),
                ...(corner.bottom ? { bottom: corner.bottom } : {}),
                ...(corner.left ? { left: corner.left } : {}),
                ...(corner.right ? { right: corner.right } : {}),
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 60%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 1px 2px rgba(255,255,255,0.15), ' +
                  'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                zIndex: 20,
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
          
          
          {/* Scratches on screen corners */}
          {[
            { top: '6px', left: '15px', width: '40px', angle: -30, opacity: 0.5 },
            { top: '6px', right: '15px', width: '38px', angle: 30, opacity: 0.45 },
          ].map((scratch, i) => (
            <div
              key={`screen-scratch-${i}`}
              style={{
                position: 'absolute',
                top: scratch.top,
                left: scratch.left,
                right: scratch.right,
                width: scratch.width,
                height: '1.5px',
                background: 'rgba(255,255,255,0.25)',
                transform: `rotate(${scratch.angle}deg)`,
                opacity: scratch.opacity,
                boxShadow: '0 0 2px rgba(0,0,0,0.7)',
                pointerEvents: 'none',
                zIndex: 18,
              }}
            />
          ))}          
          
            {/* Layer 16-20: Screen Effects - Texture overlays on LED panel */}
            {/* Stronger vignette (match radar) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
              zIndex: 16,
              borderRadius: '8px',
            }} />
            
            {/* Deeper shadow falloff */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
              zIndex: 15,
              borderRadius: '8px',
            }} />
            
            {/* Dark plastic texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${plasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 17,
            }} />
            
            {/* Dust/dirt over LED panel */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 18,
            }} />
            
            {/* Layer 21-25: Realistic LED Matrix - BOTTOM→TOP (Radiation Counter Style) - 5 columns × 8 segments - LARGER SIZE */}
            <div style={{
              display: 'flex',
              gap: '10px',  // Slightly larger gap
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 21,
              padding: '12px',  // Reduced padding for 25-35% larger bars
              alignItems: 'flex-end',  // Align to bottom
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}>
              {[1, 2, 3, 4, 5].map((level) => {
                const isActive = emfLevel >= level;
                const colors = ['#00ff55', '#00ff55', '#ffff00', '#ff8800', '#ff0000'];
                const darkColors = ['#002200', '#002200', '#332200', '#331100', '#220000'];
                const color = colors[level - 1];
                const darkColor = darkColors[level - 1];
                const segmentsPerColumn = 8;  // 8 segments per column
                
                return (
                  <div
                    key={level}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      flex: 1,
                      height: '100%',
                      justifyContent: 'flex-end',  // Stack from bottom
                    }}
                  >
                    {[...Array(segmentsPerColumn)].map((_, segmentIndex) => {
                      // Segments fill from bottom to top - reverse index so bottom segments activate first
                      const reverseIndex = segmentsPerColumn - 1 - segmentIndex;
                      const segmentActive = isActive && (reverseIndex < (emfLevel >= level ? segmentsPerColumn : 0));
                      
                      // Bar lighting rules based on level
                      const isLevel5 = level === 5 && emfLevel >= 5;
                      const isLevel4 = level === 4 && emfLevel >= 4;
                      const isLevel3 = level === 3 && emfLevel >= 3;
                      const isLevel1_2 = (level === 1 || level === 2) && emfLevel >= level;
                      
                      // Color assignment based on level
                      let activeColor = color;
                      let activeDark = darkColor;
                      if (isLevel5) {
                        activeColor = '#ff0000';  // Red glow
                        activeDark = '#440000';
                      } else if (isLevel4) {
                        activeColor = '#ff8800';  // Orange glow
                        activeDark = '#331100';
                      } else if (isLevel3) {
                        activeColor = '#ffff00';  // Yellow glow
                        activeDark = '#332200';
                      } else if (isLevel1_2) {
                        activeColor = '#00ff55';  // Green glow
                        activeDark = '#002200';
                      }
                      
                      const toxicRed = isLevel5 ? '#ff0000' : activeColor;
                      const toxicDark = isLevel5 ? '#440000' : activeDark;
                      
                      // Inactive segments: Much darker - only ON LEDs glow brightly
                      const baseBrightness = segmentActive 
                        ? (isLevel5 ? 1.0 : 0.9 + Math.random() * 0.1)  // Brighter when active, max for Level 5
                        : 0.08;  // Much darker when off
                      
                      // Level 5: Aggressive flicker and pulse
                      const pulse = isLevel5 ? (Math.sin(Date.now() / 100) * 0.15 + 1) : 1;
                      const shimmer = segmentActive ? (Math.sin(Date.now() / 200 + segmentIndex * 0.5) * 0.05 + 1) : 1;
                      const flickerOpacity = flickering && segmentActive ? 0.65 : (baseBrightness * shimmer * pulse);
                      
                      // Random flicker for unstable EMF energy (affects random bars)
                      const randomFlicker = Math.random() > 0.85 ? (Math.sin(Date.now() / 150 + segmentIndex * 10) * 0.2 + 0.8) : 1;
                      
                      // Uneven color variation (real LEDs aren't perfect)
                      const colorVariation = segmentActive ? (Math.random() * 0.12 - 0.06) : 0;
                      const adjustedColor = segmentActive 
                        ? toxicRed.replace('#', '').match(/.{2}/g)?.map((hex) => {
                            const val = parseInt(hex, 16);
                            const adjusted = Math.max(0, Math.min(255, val + (colorVariation * 255)));
                            return Math.floor(adjusted).toString(16).padStart(2, '0');
                          }).join('') || toxicRed
                        : toxicRed;
                      
                      // Slight rotation variation (0.5°-1° random per bar)
                      const barRotation = (Math.random() * 0.5 - 0.25) + (segmentIndex % 2 === 0 ? 0.3 : -0.3);
                      
                      // Brightness variation per bar
                      const brightnessVariation = 0.95 + Math.random() * 0.1;
                      
                      // Chipped edges (random wear)
                      const hasChippedEdge = Math.random() > 0.7;
                      
                      const finalOpacity = flickerOpacity * randomFlicker * brightnessVariation;
                      
                      return (
                        <div
                          key={`${level}-${segmentIndex}`}
                          style={{
                            width: '100%',
                            flex: 1,  // Equal height segments
                            minHeight: '10px',  // Larger bars (25-35% increase from 8px)
                            background: segmentActive
                              ? `linear-gradient(to top, #${adjustedColor}ff, #${adjustedColor}aa, ${toxicDark}88)`  // Bottom→top gradient
                              : '#0a0a0a',  // Inactive: faint dark plastic
                            borderRadius: hasChippedEdge ? '2px 3px 2px 3px' : '3px',  // Chipped edges variation
                            boxShadow: segmentActive
                              ? isLevel5
                                ? `0 0 20px ${toxicRed}ff, 0 0 40px ${toxicRed}dd, 0 0 60px ${toxicRed}aa, 0 0 90px ${toxicRed}88, inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.5)`  // Massive Level 5 glow
                                : `0 0 10px ${activeColor}ff, 0 0 20px ${activeColor}dd, 0 0 30px ${activeColor}aa, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.5)`  // Normal glow with light bleed
                              : 'inset 0 1px 2px rgba(0,0,0,0.95)',  // Much darker inactive
                            opacity: finalOpacity,
                            transition: isLevel5 ? 'opacity 0.05s, filter 0.05s' : 'opacity 0.1s, filter 0.1s',
                            position: 'relative',
                            border: segmentActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.7)',
                            filter: segmentActive 
                              ? isLevel5 
                                ? `blur(0.3px) brightness(${shimmer * pulse * brightnessVariation}) contrast(1.2)`  // Level 5: More intense
                                : `blur(0.2px) brightness(${shimmer * brightnessVariation})`  // Normal shimmer with variation
                              : 'none',
                            transform: `rotate(${barRotation}deg)`,  // Slight rotation per bar (0.5°-1°)
                          }}
                        >
                          {/* Horizontal light smear for LED bleed (outer glow) */}
                          {segmentActive && !isLevel5 && (
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
                          {/* Level 5: Aggressive red bleed into bezel */}
                          {segmentActive && isLevel5 && (
                            <div style={{
                              position: 'absolute',
                              left: '-5px',
                              right: '-5px',
                              top: '10%',
                              bottom: '10%',
                              background: `linear-gradient(90deg, transparent, ${toxicRed}55, ${toxicRed}88, ${toxicRed}55, transparent)`,
                              filter: 'blur(5px)',
                              pointerEvents: 'none',
                              zIndex: -1,
                            }} />
                          )}
                          {/* Internal noise/imperfections with subtle flicker */}
                          {segmentActive && (
                            <>
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: `url(${filmgrain})`,
                                backgroundSize: '200% 200%',
                                backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`,
                                mixBlendMode: 'screen',
                                opacity: isLevel5 ? 0.25 : (0.15 + Math.random() * 0.1),
                                pointerEvents: 'none',
                                animation: 'grain 0.3s steps(1) infinite',
                              }} />
                              {/* Subtle CRT-style shimmer overlay */}
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                                opacity: 0.3 + Math.sin(Date.now() / 300 + segmentIndex) * 0.1,
                                pointerEvents: 'none',
                              }} />
                              {/* Level 5: Heat distortion shimmer */}
                              {isLevel5 && (
                                <div style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%)',
                                  opacity: 0.4 + Math.sin(Date.now() / 150) * 0.2,
                                  filter: 'blur(1px)',
                                  pointerEvents: 'none',
                                }} />
                              )}
                            </>
                          )}
                          
                          {/* Dust overlay */}
                          {segmentActive && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundImage: `url(${dust})`,
                              backgroundSize: 'cover',
                              mixBlendMode: 'multiply',
                              opacity: 0.2 + Math.random() * 0.1,
                              pointerEvents: 'none',
                            }} />
                          )}
                          
                          {/* Dark edge between LEDs for physical separation */}
                          {segmentIndex < segmentsPerColumn - 1 && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-1.5px',
                              left: 0,
                              right: 0,
                              height: '1px',
                              background: 'rgba(0,0,0,0.8)',
                              pointerEvents: 'none',
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            {/* Ambient green lighting beneath bezel (match Radar's screen glow) */}
            {emfLevel > 0 && (
              <div style={{
                position: 'absolute',
                top: '32px',
                left: '32px',
                right: '32px',
                bottom: '32px',
                borderRadius: '8px',
                background: emfLevel >= 5 
                  ? `radial-gradient(ellipse at center, rgba(255,0,0,0.15) 0%, rgba(255,136,0,0.1) 30%, transparent 70%)`
                  : emfLevel >= 3
                  ? `radial-gradient(ellipse at center, rgba(255,255,0,0.12) 0%, rgba(255,136,0,0.08) 30%, transparent 70%)`
                  : `radial-gradient(ellipse at center, rgba(0,255,85,0.1) 0%, rgba(0,255,85,0.06) 30%, transparent 70%)`,
                boxShadow: emfLevel >= 5
                  ? '0 0 20px rgba(255,0,0,0.3), 0 0 40px rgba(255,136,0,0.2)'
                  : emfLevel >= 3
                  ? '0 0 18px rgba(255,255,0,0.25), 0 0 35px rgba(255,136,0,0.15)'
                  : '0 0 15px rgba(0,255,85,0.2), 0 0 30px rgba(0,255,85,0.12)',
                pointerEvents: 'none',
                zIndex: 1,
                mixBlendMode: 'screen',
              }} />
            )}
            
            {/* Subtle glow reflection off metal frame (like Radar's CRT glow) */}
            {emfLevel > 0 && (
              <div style={{
                position: 'absolute',
                top: '-32px',
                left: '-32px',
                right: '-32px',
                bottom: '-32px',
                borderRadius: '12px',
                background: emfLevel >= 4
                  ? 'radial-gradient(ellipse at center, transparent 60%, rgba(255,136,0,0.08) 80%, rgba(255,136,0,0.04) 100%)'
                  : 'radial-gradient(ellipse at center, transparent 60%, rgba(0,255,85,0.06) 80%, rgba(0,255,85,0.03) 100%)',
                pointerEvents: 'none',
                zIndex: 0,
                filter: 'blur(15px)',
              }} />
            )}
            
            {/* Level labels */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '48px',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              color: 'rgba(150,150,150,0.4)',
              zIndex: 22,
            }}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span style={{ color: emfLevel >= 5 ? '#ff0000' : 'rgba(150,150,150,0.4)' }}>5</span>
            </div>
          </div>
        </div>

        {/* Tape patches with handwritten markings - Crooked and clustered */}
        {/* Tape with handwritten note */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '10px',
          width: '85px',
          height: '32px',
          backgroundImage: `url(${tape})`,
          backgroundSize: 'cover',
          transform: 'rotate(-14deg)',  // Noticeably crooked
          opacity: 0.9,
          boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {/* Handwritten text on tape */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(14deg)',
            fontFamily: '"Caveat", cursive',
            fontSize: '9px',
            color: 'rgba(0,0,0,0.7)',
            whiteSpace: 'nowrap',
          }}>
            BAT OK
          </div>
        </div>
        
        {/* Additional tape patch - clustered */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '5px',
          width: '52px',
          height: '20px',
          backgroundImage: `url(${tape})`,
          backgroundSize: 'cover',
          transform: 'rotate(16deg)',  // Crooked
          opacity: 0.8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />
        
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

        {/* Cracked corners (additional damage) */}
        {[
          { bottom: '0', left: '0', width: '18px', height: '18px' },
          { top: '0', left: '0', width: '12px', height: '12px' },
        ].map((crack, i) => (
          <div
            key={`crack-${i}`}
            style={{
              position: 'absolute',
              top: crack.top,
              bottom: crack.bottom,
              left: crack.left,
              width: crack.width,
              height: crack.height,
              borderLeft: '2px solid rgba(0,0,0,0.7)',
              borderBottom: '2px solid rgba(0,0,0,0.7)',
              pointerEvents: 'none',
              zIndex: 9,
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
}

export default EMFMeterMock;
