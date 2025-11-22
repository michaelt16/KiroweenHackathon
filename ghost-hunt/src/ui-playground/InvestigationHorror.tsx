import React, { useState } from 'react';

// Horror Investigation - Active ghost hunt with field kit
export function InvestigationHorror() {
  const [activeTool, setActiveTool] = useState<string>('radar');
  const [sanity, setSanity] = useState(72);

  const tools = [
    { id: 'radar', name: 'Radar', icon: '📡', active: true },
    { id: 'emf', name: 'EMF', icon: '📊', active: true },
    { id: 'thermal', name: 'Thermal', icon: '🌡️', active: true },
    { id: 'audio', name: 'Audio', icon: '🎵', active: true },
    { id: 'camera', name: 'Camera', icon: '📷', active: true },
  ];

  const evidence = [
    { id: 1, type: 'EMF Level 5', found: true },
    { id: 2, type: 'Freezing Temps', found: true },
    { id: 3, type: 'Spirit Box', found: false },
    { id: 4, type: 'Ghost Orbs', found: false },
    { id: 5, type: 'Ghost Writing', found: false },
  ];

  const photos = [
    { id: 1, timestamp: '3:42 AM', type: 'Manifestation' },
    { id: 2, timestamp: '3:45 AM', type: 'EMF Spike' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.8) 0%, transparent 40%)
        `,
        padding: '15px',
        fontFamily: '"Courier New", monospace',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Vignette effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        
        {/* Top Status Bar */}
        <div
          style={{
            backgroundColor: 'rgba(45, 36, 25, 0.95)',
            border: '2px solid #8B4513',
            borderRadius: '8px',
            padding: '15px 20px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f4f0e6', marginBottom: '4px' }}>
              WHITMORE ESTATE
            </div>
            <div style={{ fontSize: '11px', color: '#8B4513' }}>
              Investigation in progress...
            </div>
          </div>

          {/* Sanity Meter */}
          <div style={{ minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: '#f4f0e6', fontWeight: 'bold' }}>SANITY</span>
              <span style={{ fontSize: '12px', color: sanity < 50 ? '#dc2626' : '#f4f0e6', fontWeight: 'bold' }}>
                {sanity}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#1a1a1a',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '2px solid #8B4513'
              }}
            >
              <div
                style={{
                  width: `${sanity}%`,
                  height: '100%',
                  backgroundColor: sanity < 30 ? '#dc2626' : sanity < 60 ? '#f59e0b' : '#22c55e',
                  backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
                  transition: 'all 0.3s'
                }}
              />
            </div>
          </div>

          {/* Timer */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              border: '2px solid #dc2626',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#dc2626',
              fontFamily: 'monospace'
            }}
          >
            ⏱️ 08:42
          </div>
        </div>

        {/* Main Investigation Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
          
          {/* Left - Radar/Tool Display */}
          <div>
            {/* Radar Display */}
            <div
              style={{
                backgroundColor: '#0f0f0f',
                border: '3px solid #2d1810',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
                position: 'relative',
                minHeight: '400px'
              }}
            >
              {/* Radar Screen */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  maxWidth: '400px',
                  margin: '0 auto',
                  backgroundColor: '#0a0a0a',
                  borderRadius: '50%',
                  border: '3px solid #2dd4bf',
                  position: 'relative',
                  boxShadow: `
                    0 0 20px rgba(45, 212, 191, 0.3),
                    inset 0 0 40px rgba(45, 212, 191, 0.1)
                  `
                }}
              >
                {/* Radar rings */}
                {[1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: `${ring * 30}%`,
                      height: `${ring * 30}%`,
                      border: '1px solid rgba(45, 212, 191, 0.2)',
                      borderRadius: '50%'
                    }}
                  />
                ))}

                {/* Center dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#2dd4bf',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(45, 212, 191, 0.8)'
                  }}
                />

                {/* Ghost blip */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '60%',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#dc2626',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
                    animation: 'pulse 2s infinite'
                  }}
                />

                {/* Compass directions */}
                <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', color: '#2dd4bf', fontSize: '12px', fontWeight: 'bold' }}>N</div>
                <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', color: '#2dd4bf', fontSize: '12px', fontWeight: 'bold' }}>S</div>
                <div style={{ position: 'absolute', top: '50%', left: '5px', transform: 'translateY(-50%)', color: '#2dd4bf', fontSize: '12px', fontWeight: 'bold' }}>W</div>
                <div style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)', color: '#2dd4bf', fontSize: '12px', fontWeight: 'bold' }}>E</div>
              </div>

              {/* Radar Info */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                  color: '#2dd4bf',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🔴 ENTITY DETECTED - 15m NE
              </div>
            </div>

            {/* Tool Buttons */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '10px'
              }}
            >
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  style={{
                    padding: '15px',
                    backgroundColor: activeTool === tool.id ? 'rgba(45, 212, 191, 0.2)' : 'rgba(45, 36, 25, 0.8)',
                    border: `2px solid ${activeTool === tool.id ? '#2dd4bf' : '#8B4513'}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: activeTool === tool.id ? '0 0 15px rgba(45, 212, 191, 0.3)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{tool.icon}</div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: activeTool === tool.id ? '#2dd4bf' : '#f4f0e6'
                    }}
                  >
                    {tool.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Field Kit Drawer */}
          <div>
            {/* Evidence Checklist */}
            <div
              style={{
                backgroundColor: '#f4f0e6',
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 27px,
                    rgba(139, 69, 19, 0.1) 28px,
                    rgba(139, 69, 19, 0.1) 29px
                  )
                `,
                border: '3px solid #8B4513',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                position: 'relative'
              }}
            >
              {/* Tape corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '30px',
                  width: '50px',
                  height: '25px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backgroundImage: `
                    linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
                  `,
                  backgroundSize: '4px 4px',
                  transform: 'rotate(-12deg)',
                  borderRadius: '2px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              />

              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2d1810',
                  marginBottom: '15px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #8B4513'
                }}
              >
                📋 EVIDENCE LOG
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {evidence.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: ev.found ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      border: `2px solid ${ev.found ? '#22c55e' : '#d4c4a8'}`,
                      borderRadius: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #2d1810',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ev.found ? '#22c55e' : 'transparent',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {ev.found && '✓'}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#2d1810',
                        fontWeight: ev.found ? 'bold' : 'normal',
                        textDecoration: ev.found ? 'line-through' : 'none'
                      }}
                    >
                      {ev.type}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div
                style={{
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  borderRadius: '4px',
                  border: '2px dashed #8B4513',
                  fontSize: '11px',
                  color: '#2d1810',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {evidence.filter(e => e.found).length} / {evidence.length} Evidence Found
              </div>
            </div>

            {/* Photos */}
            <div
              style={{
                backgroundColor: '#f4f0e6',
                border: '3px solid #8B4513',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2d1810',
                  marginBottom: '15px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #8B4513'
                }}
              >
                📷 PHOTOS ({photos.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    style={{
                      width: '100%',
                      backgroundColor: '#e8e4dc',
                      padding: '8px 8px 20px 8px',
                      transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      border: '1px solid #d0ccc4'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        border: '1px solid #333',
                        marginBottom: '8px'
                      }}
                    >
                      👻
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: '10px',
                        color: '#1a1a1a',
                        fontFamily: '"Courier New", monospace'
                      }}
                    >
                      {photo.timestamp} - {photo.type}
                    </div>
                  </div>
                ))}
              </div>

              {/* Film count */}
              <div
                style={{
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  borderRadius: '4px',
                  border: '2px dashed #8B4513',
                  fontSize: '11px',
                  color: '#2d1810',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                🎞️ Film Remaining: 3
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  padding: '15px',
                  backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '2px solid #22c55e',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                }}
              >
                ✓ IDENTIFY GHOST
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(220, 38, 38, 0.8)',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '2px solid #dc2626'
                }}
              >
                ⚠️ ABANDON INVESTIGATION
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
}

export default InvestigationHorror;
