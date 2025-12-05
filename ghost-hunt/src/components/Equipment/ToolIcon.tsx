// Tool icons for equipment inventory
// Using actual art and structure from the mock tool components, scaled down

import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import rust from '../../assets/texture/brownrust.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import smoothPlastic from '../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../assets/texture/scratchedplasticdark.png';
import dirtyGlass from '../../assets/texture/dirtyglass.png';
import crtTexture from '../../assets/texture/crtexture.png';

interface ToolIconProps {
  toolType: 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';
  size?: number;
}

export function ToolIcon({ toolType, size = 80 }: ToolIconProps) {
  const iconStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
  };

  switch (toolType) {
    case 'radar':
      return (
        <div style={iconStyle}>
          {/* Radar - Using same structure as RadarToolMock, scaled down */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
            boxShadow: 
              'inset 0 6px 12px rgba(255,255,255,0.06), ' +
              'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
              'inset 4px 0 8px rgba(0,0,0,0.9), ' +
              'inset -4px 0 8px rgba(0,0,0,0.9), ' +
              '0 8px 24px rgba(0,0,0,0.9), ' +
              '0 4px 12px rgba(0,0,0,0.7), ' +
              '0 0 0 1px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateZ(10px) rotateX(5deg) rotateY(-5deg)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(15px) rotateX(2deg) rotateY(-2deg) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(10px) rotateX(5deg) rotateY(-5deg) scale(1)';
          }}
          >
            {/* Beveled edges */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '8px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '8px',
              background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }} />
            
            {/* Metal texture overlay - same as mock */}
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
            }} />
            
            {/* Rust/wear overlay - same as mock */}
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
            }} />
            
            {/* Dust/grime layer - same as mock */}
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
            }} />
            
            {/* 3D Depth highlight */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '30%',
              height: '30%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(8px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* CRT Screen - same structure as mock, with 3D depth */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              right: '15%',
              bottom: '15%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #0a2a0a 0%, #051505 100%)',
              border: '2px solid #1a3a1a',
              boxShadow: 
                'inset 0 0 30px rgba(0,100,0,0.3), ' +
                'inset 0 -8px 16px rgba(0,0,0,0.8), ' +
                '0 4px 8px rgba(0,0,0,0.6)',
              transform: 'translateZ(5px)',
            }}>
              {/* CRT texture */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${crtTexture})`,
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.3,
                borderRadius: '50%',
              }} />
              
              {/* Sweep line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(0,255,0,0.8) 0%, transparent 100%)',
                transformOrigin: 'bottom center',
                transform: 'translate(-50%, -100%) rotate(45deg)',
              }} />
              
              {/* Center dot */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '3px',
                height: '3px',
                background: '#00ff00',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 6px rgba(0,255,0,0.8)',
              }} />
              
              {/* Concentric rings */}
              {[1, 2, 3].map((ring) => (
                <div key={ring} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${ring * 25}%`,
                  height: `${ring * 25}%`,
                  border: '1px solid rgba(0,255,0,0.2)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                }} />
              ))}
            </div>
            
            {/* Corner screws - same style as mock */}
            {[
              { top: '8px', left: '8px' },
              { top: '8px', right: '8px' },
              { bottom: '8px', left: '8px' },
              { bottom: '8px', right: '8px' },
            ].map((screw, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...screw,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                  'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                border: '1px solid rgba(0,0,0,0.7)',
                zIndex: 10,
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
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                  width: '4px',
                  height: '0.5px',
                  background: '#0a0a0a',
                }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'emf':
      return (
        <div style={iconStyle}>
          {/* EMF Meter - Using same structure as EMFMeterMock, scaled down */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
            boxShadow: 
              'inset 0 6px 12px rgba(255,255,255,0.06), ' +
              'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
              'inset 4px 0 8px rgba(0,0,0,0.9), ' +
              'inset -4px 0 8px rgba(0,0,0,0.9), ' +
              '0 8px 24px rgba(0,0,0,0.9), ' +
              '0 4px 12px rgba(0,0,0,0.7), ' +
              '0 0 0 1px rgba(0,0,0,0.5)',
            borderRadius: '6px',
            padding: '8px',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateZ(10px) rotateX(5deg) rotateY(5deg)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(15px) rotateX(2deg) rotateY(2deg) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(10px) rotateX(5deg) rotateY(5deg) scale(1)';
          }}
          >
            {/* Beveled edges */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '12px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '12px',
              background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
            }} />
            
            {/* Metal texture overlay - same as mock */}
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
            }} />
            
            {/* Rust overlay - same as mock */}
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
            }} />
            
            {/* Dust overlay - same as mock */}
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
            }} />
            
            {/* 3D Depth highlight */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '8%',
              width: '25%',
              height: '20%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 70%)',
              borderRadius: '4px',
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Display area - same structure as mock, with 3D depth */}
            <div style={{
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              borderRadius: '3px',
              padding: '6px',
              height: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '3px',
              position: 'relative',
              zIndex: 2,
              boxShadow: 
                'inset 0 2px 4px rgba(0,0,0,0.8), ' +
                '0 2px 4px rgba(0,0,0,0.5)',
              transform: 'translateZ(5px)',
            }}>
              {/* LED Bars - same style as mock */}
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} style={{
                  height: '4px',
                  background: level <= 2 ? '#00ff00' : level === 3 ? '#ffaa00' : '#ff0000',
                  borderRadius: '2px',
                  width: `${level * 18}%`,
                  boxShadow: level <= 2 
                    ? '0 0 3px rgba(0,255,0,0.6)' 
                    : level === 3 
                    ? '0 0 3px rgba(255,170,0,0.6)' 
                    : '0 0 3px rgba(255,0,0,0.6)',
                }} />
              ))}
            </div>
            
            {/* Corner screws - same style as mock */}
            {[
              { top: '6px', left: '6px' },
              { top: '6px', right: '6px' },
              { bottom: '6px', left: '6px' },
              { bottom: '6px', right: '6px' },
            ].map((screw, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...screw,
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                  'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                border: '1px solid rgba(0,0,0,0.7)',
                zIndex: 10,
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '3px',
                  height: '0.5px',
                  background: '#0a0a0a',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                  width: '3px',
                  height: '0.5px',
                  background: '#0a0a0a',
                }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'thermal':
      return (
        <div style={iconStyle}>
          {/* Thermal Scanner - Using same structure as ThermalScannerMock, scaled down */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `
              url(${smoothPlastic}),
              linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #111111 100%)
            `,
            backgroundSize: '200px 200px, cover',
            backgroundBlendMode: 'overlay',
            borderRadius: '8px',
            boxShadow: 
              'inset 0 4px 8px rgba(255,255,255,0.04), ' +
              'inset 0 -10px 18px rgba(0,0,0,0.9), ' +
              'inset 5px 0 10px rgba(0,0,0,0.9), ' +
              'inset -5px 0 10px rgba(0,0,0,0.9), ' +
              '0 12px 26px rgba(0,0,0,0.9)',
            padding: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Smooth plastic texture - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${smoothPlastic})`,
              backgroundSize: '150px 150px',
              mixBlendMode: 'multiply',
              opacity: 0.4,
            }} />
            
            {/* Scratched plastic - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
            }} />
            
            {/* Dust - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.08,
            }} />
            
            {/* 3D Depth highlight */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '10%',
              width: '30%',
              height: '25%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 70%)',
              clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Screen - Trapezoid shape, same as mock, with 3D depth */}
            <div style={{
              clipPath: 'polygon(5% 0%, 95% 0%, 92% 100%, 8% 100%)',
              background: 'linear-gradient(135deg, #1a1a3a 0%, #0a0a2a 100%)',
              border: '2px solid #2a2a4a',
              borderRadius: '4px',
              height: '65%',
              position: 'relative',
              zIndex: 2,
              boxShadow: 
                'inset 0 2px 4px rgba(0,0,0,0.8), ' +
                'inset 0 -4px 8px rgba(0,0,0,0.6), ' +
                '0 2px 4px rgba(0,0,0,0.5)',
              transform: 'translateZ(5px)',
            }}>
              {/* Thermal gradient - same as mock */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(0,255,255,0.4) 0%, rgba(0,100,200,0.2) 50%, transparent 100%)',
              }} />
              
              {/* Crosshair - same as mock */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                height: '50%',
                border: '1px solid rgba(0,255,255,0.5)',
                borderRadius: '50%',
              }} />
            </div>
          </div>
        </div>
      );

    case 'audio':
      return (
        <div style={iconStyle}>
          {/* Audio Receiver - Using same structure as SpiritBoxMock, scaled down */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
            boxShadow: 
              'inset 0 6px 12px rgba(255,255,255,0.06), ' +
              'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
              'inset 4px 0 8px rgba(0,0,0,0.9), ' +
              'inset -4px 0 8px rgba(0,0,0,0.9), ' +
              '0 8px 24px rgba(0,0,0,0.9), ' +
              '0 4px 12px rgba(0,0,0,0.7), ' +
              '0 0 0 1px rgba(0,0,0,0.5)',
            borderRadius: '6px',
            padding: '8px',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateZ(10px) rotateX(5deg) rotateY(-5deg)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(15px) rotateX(2deg) rotateY(-2deg) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(10px) rotateX(5deg) rotateY(-5deg) scale(1)';
          }}
          >
            {/* Beveled edges */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            }} />
            
            {/* Metal texture overlay - same as mock */}
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
            }} />
            
            {/* Rust overlay - same as mock */}
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
            }} />
            
            {/* 3D Depth highlight */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '8%',
              width: '25%',
              height: '20%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 70%)',
              borderRadius: '4px',
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Display area - oscilloscope style, same as mock, with 3D depth */}
            <div style={{
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              borderRadius: '3px',
              padding: '6px',
              height: '60%',
              position: 'relative',
              zIndex: 2,
              boxShadow: 
                'inset 0 2px 4px rgba(0,0,0,0.8), ' +
                '0 2px 4px rgba(0,0,0,0.5)',
              transform: 'translateZ(5px)',
            }}>
              {/* Waveform - same style as mock */}
              <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                <polyline
                  points="0,50 15,40 30,45 45,35 60,50 75,40 90,45 100,50"
                  fill="none"
                  stroke="#00ff00"
                  strokeWidth="1.5"
                />
                {/* Grid lines - same as mock */}
                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(0,255,0,0.2)" strokeWidth="0.5" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(0,255,0,0.3)" strokeWidth="0.5" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(0,255,0,0.2)" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Corner screws - same style as mock */}
            {[
              { top: '6px', left: '6px' },
              { top: '6px', right: '6px' },
              { bottom: '6px', left: '6px' },
              { bottom: '6px', right: '6px' },
            ].map((screw, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...screw,
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                  'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                border: '1px solid rgba(0,0,0,0.7)',
                zIndex: 10,
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '3px',
                  height: '0.5px',
                  background: '#0a0a0a',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                  width: '3px',
                  height: '0.5px',
                  background: '#0a0a0a',
                }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'camera':
      return (
        <div style={iconStyle}>
          {/* Camera - Using same structure as CameraViewfinderMock, scaled down */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `
              url(${smoothPlastic}),
              linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)
            `,
            backgroundSize: '200px 200px, cover',
            backgroundBlendMode: 'overlay',
            borderRadius: '12px',
            boxShadow: 
              'inset 0 4px 8px rgba(255,255,255,0.04), ' +
              'inset 0 -12px 20px rgba(0,0,0,0.95), ' +
              'inset 6px 0 12px rgba(0,0,0,0.9), ' +
              'inset -6px 0 12px rgba(0,0,0,0.9), ' +
              '0 12px 32px rgba(0,0,0,0.9), ' +
              '0 6px 16px rgba(0,0,0,0.7), ' +
              '0 0 0 1px rgba(0,0,0,0.5)',
            padding: '6px',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateZ(10px) rotateX(-5deg) rotateY(5deg)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(15px) rotateX(-2deg) rotateY(2deg) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(10px) rotateX(-5deg) rotateY(5deg) scale(1)';
          }}
          >
            {/* Smooth plastic texture - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${smoothPlastic})`,
              backgroundSize: '150px 150px',
              mixBlendMode: 'multiply',
              opacity: 0.4,
            }} />
            
            {/* Scratched plastic - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
            }} />
            
            {/* Dust - same as mock */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.08,
            }} />
            
            {/* 3D Depth highlight */}
            <div style={{
              position: 'absolute',
              top: '5%',
              right: '8%',
              width: '20%',
              height: '15%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              borderRadius: '4px',
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            
            {/* Viewfinder - same structure as mock, with 3D depth */}
            <div style={{
              background: '#1a1a1a',
              border: '2px solid #2a2a2a',
              borderRadius: '4px',
              height: '70%',
              position: 'relative',
              zIndex: 2,
              boxShadow: 
                'inset 0 2px 4px rgba(0,0,0,0.8), ' +
                'inset 0 -4px 8px rgba(0,0,0,0.6), ' +
                '0 2px 4px rgba(0,0,0,0.5)',
              transform: 'translateZ(5px)',
            }}>
              {/* Flash - same as mock */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '10px',
                height: '10px',
                background: '#ffaa00',
                borderRadius: '50%',
                boxShadow: '0 0 6px rgba(255,170,0,0.6)',
              }} />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
