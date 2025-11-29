import { useState } from 'react';
import smoothPlastic from '../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../assets/texture/scratchedplasticdark.png';
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';

// Icon Variations Playground
// Demonstrates different icon/button styles for analog horror aesthetic
export function IconVariationsMock() {
  const [activeStyle, setActiveStyle] = useState<'physical' | 'handdrawn' | 'panel'>('physical');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttons = [
    { id: 'profile', label: 'PROFILE', icon: '👤' },
    { id: 'kit', label: 'KIT', icon: '🎒' },
    { id: 'codex', label: 'CODEX', icon: '📖' },
    { id: 'location', label: 'LOC', icon: '📍' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      padding: '40px',
      overflow: 'auto',
    }}>
      {/* Style Selector */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
      }}>
        {(['physical', 'handdrawn', 'panel'] as const).map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            style={{
              padding: '12px 24px',
              background: activeStyle === style ? 'rgba(45, 212, 191, 0.2)' : 'rgba(30, 30, 30, 0.8)',
              border: `2px solid ${activeStyle === style ? 'rgba(45, 212, 191, 0.6)' : 'rgba(100, 100, 100, 0.3)'}`,
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Physical Control Buttons Style */}
      {activeStyle === 'physical' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
        }}>
          <h2 style={{ color: '#fff', fontFamily: '"Courier New", monospace', margin: 0 }}>
            PHYSICAL CONTROL BUTTONS
          </h2>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {buttons.map((btn) => (
              <div key={btn.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setActiveButton(activeButton === btn.id ? null : btn.id)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    background: `
                      url(${smoothPlastic}),
                      linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #111111 100%)
                    `,
                    backgroundSize: '200px 200px, cover',
                    backgroundRepeat: 'repeat, no-repeat',
                    backgroundBlendMode: 'overlay, normal',
                    border: '3px solid rgba(100, 100, 100, 0.4)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: `
                      inset 0 3px 6px rgba(255,255,255,0.05),
                      inset 0 -6px 12px rgba(0,0,0,0.8),
                      ${activeButton === btn.id ? '0 0 20px rgba(45, 212, 191, 0.6),' : ''}
                      0 4px 12px rgba(0,0,0,0.6)
                    `,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                    transform: activeButton === btn.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {/* Texture overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${scratchedPlasticDark})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'overlay',
                    opacity: 0.15,
                    borderRadius: '5px',
                    pointerEvents: 'none',
                  }} />
                  
                  {/* Icon */}
                  <div style={{
                    fontSize: '32px',
                    filter: activeButton === btn.id ? 'brightness(1.3)' : 'brightness(1)',
                    transition: 'filter 0.2s',
                  }}>
                    {btn.icon}
                  </div>
                  
                  {/* LED indicator */}
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: activeButton === btn.id ? '#00ff00' : 'rgba(100, 100, 100, 0.3)',
                    boxShadow: activeButton === btn.id ? '0 0 8px #00ff00' : 'none',
                    transition: 'all 0.2s',
                  }} />
                </button>
                
                {/* Etched label */}
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '10px',
                  color: 'rgba(200, 200, 200, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textShadow: `
                    0 1px 2px rgba(255,255,255,0.1),
                    0 -1px 2px rgba(0,0,0,0.8)
                  `,
                }}>
                  {btn.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hand-drawn Icon Style */}
      {activeStyle === 'handdrawn' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
        }}>
          <h2 style={{ color: '#fff', fontFamily: '"Courier New", monospace', margin: 0 }}>
            HAND-DRAWN ICON STYLE
          </h2>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {buttons.map((btn) => (
              <div key={btn.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setActiveButton(activeButton === btn.id ? null : btn.id)}
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                    background: '#1a1a1a',
                    border: '2px solid rgba(200, 200, 200, 0.3)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: `
                      inset 0 2px 4px rgba(0,0,0,0.6),
                      ${activeButton === btn.id ? '0 0 20px rgba(45, 212, 191, 0.4),' : ''}
                      0 4px 12px rgba(0,0,0,0.8)
                    `,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    transform: `rotate(${Math.random() * 2 - 1}deg) ${activeButton === btn.id ? 'scale(1.05)' : 'scale(1)'}`,
                  }}
                >
                  {/* Hand-drawn icon (simple line art style) */}
                  <div style={{
                    fontSize: '36px',
                    filter: 'grayscale(0.7)',
                    opacity: activeButton === btn.id ? 1 : 0.7,
                    transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                  }}>
                    {btn.icon}
                  </div>
                  
                  {/* Handwritten label */}
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '12px',
                    color: activeButton === btn.id ? 'rgba(45, 212, 191, 0.9)' : 'rgba(200, 200, 200, 0.6)',
                    transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  }}>
                    {btn.label.toLowerCase()}
                  </div>
                </button>
                
                {/* Tape patch (some buttons) */}
                {Math.random() > 0.5 && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '30px',
                    height: '18px',
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    transform: 'rotate(15deg)',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrated Device Panel Style */}
      {activeStyle === 'panel' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
        }}>
          <h2 style={{ color: '#fff', fontFamily: '"Courier New", monospace', margin: 0 }}>
            INTEGRATED DEVICE PANEL
          </h2>
          <div style={{
            position: 'relative',
            padding: '30px 40px',
            background: `
              url(${smoothPlastic}),
              linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #111111 100%)
            `,
            backgroundSize: '300px 300px, cover',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundBlendMode: 'overlay, normal',
            borderRadius: '12px',
            border: '3px solid rgba(100, 100, 100, 0.4)',
            boxShadow: `
              inset 0 4px 8px rgba(255,255,255,0.04),
              inset 0 -8px 16px rgba(0,0,0,0.9),
              0 8px 24px rgba(0,0,0,0.8)
            `,
          }}>
            {/* Texture overlays */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${scratchedPlasticDark})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
              borderRadius: '9px',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.08,
              borderRadius: '9px',
              pointerEvents: 'none',
            }} />

            {/* Panel label */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: '"Courier New", monospace',
              fontSize: '10px',
              color: 'rgba(200, 200, 200, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            }}>
              FIELD KIT CONTROL
            </div>

            {/* Buttons grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '30px',
            }}>
              {buttons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveButton(activeButton === btn.id ? null : btn.id)}
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    background: activeButton === btn.id 
                      ? 'rgba(45, 212, 191, 0.1)' 
                      : 'rgba(0, 0, 0, 0.3)',
                    border: `2px solid ${activeButton === btn.id ? 'rgba(45, 212, 191, 0.5)' : 'rgba(100, 100, 100, 0.3)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: `
                      inset 0 2px 4px rgba(0,0,0,0.6),
                      ${activeButton === btn.id ? '0 0 16px rgba(45, 212, 191, 0.4),' : ''}
                      0 2px 8px rgba(0,0,0,0.6)
                    `,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    fontSize: '32px',
                    filter: activeButton === btn.id ? 'brightness(1.3)' : 'brightness(1)',
                  }}>
                    {btn.icon}
                  </div>
                  
                  {/* Label */}
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '9px',
                    color: activeButton === btn.id ? 'rgba(45, 212, 191, 0.9)' : 'rgba(200, 200, 200, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  }}>
                    {btn.label}
                  </div>
                  
                  {/* LED indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: activeButton === btn.id ? '#00ff00' : 'rgba(100, 100, 100, 0.3)',
                    boxShadow: activeButton === btn.id ? '0 0 8px #00ff00' : 'none',
                  }} />
                </button>
              ))}
            </div>

            {/* Corner screws */}
            {[
              { top: '12px', left: '12px' },
              { top: '12px', right: '12px' },
              { bottom: '12px', left: '12px' },
              { bottom: '12px', right: '12px' },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...pos,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255,255,255,0.1),
                    inset 0 -1px 2px rgba(0,0,0,0.8),
                    0 2px 4px rgba(0,0,0,0.6)
                  `,
                }}
              />
            ))}

            {/* Serial number */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: '"Courier New", monospace',
              fontSize: '8px',
              color: 'rgba(100, 100, 100, 0.3)',
              letterSpacing: '1px',
            }}>
              SN: FK-1985-{Math.floor(Math.random() * 1000)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




