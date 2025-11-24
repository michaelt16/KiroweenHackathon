// Equipment Suitcase - Looking into your field kit
import React, { useState } from 'react';
import { useSupplies } from '../context/SuppliesContext';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';
import { ToolIcon } from '../components/Equipment/ToolIcon';
import { RadarTool, EMFMeterTool, ThermalScannerTool, AudioReceiverTool, CameraTool } from '../components/Tools';

export function InventoryScreen() {
  const { supplies } = useSupplies();
  const isMobile = window.innerWidth < 768;
  const [viewingTool, setViewingTool] = useState<'radar' | 'emf' | 'thermal' | 'audio' | 'camera' | null>(null);

  // Equipment items - tools in suitcase
  const equipmentItems = [
    { id: 'radar', name: 'Radar', toolType: 'radar' as const },
    { id: 'emf', name: 'EMF Meter', toolType: 'emf' as const },
    { id: 'thermal', name: 'Thermal', toolType: 'thermal' as const },
    { id: 'audio', name: 'Audio', toolType: 'audio' as const },
    { id: 'camera', name: 'Camera', toolType: 'camera' as const },
  ];

  // Supply items
  const supplyItems = [
    { icon: '🎞️', label: 'Film', count: supplies.film },
    { icon: '⚡', label: 'Boosts', count: supplies.boosts },
    { icon: '🔮', label: 'Charms', count: supplies.charms },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#1a1a1a',
        padding: isMobile ? '16px' : '24px',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Back button */}
        <div style={{ marginBottom: '20px' }}>
          <BackToMapButton />
        </div>

        {/* Suitcase exterior */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
            border: '4px solid #0f0f0f',
            borderRadius: '12px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.9), inset 0 2px 8px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          {/* Metal texture overlay on suitcase exterior */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/metalscratchedtexture.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Rust/wear overlay on suitcase */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/brownrust.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Dust/grime layer on suitcase */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/dust.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.3,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Latches */}
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '20px',
                [i === 0 ? 'left' : 'right']: '20px',
                width: '40px',
                height: '20px',
                background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
                border: '2px solid #1a1a1a',
                borderRadius: '4px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #6a6a6a, #2a2a2a)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
                }}
              />
            </div>
          ))}

          {/* Handle */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '30px',
              background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              border: '3px solid #0f0f0f',
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(0,0,0,0.6)',
              zIndex: 1,
            }}
          />

          {/* Label plate */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              padding: '12px 20px',
              borderRadius: '6px',
              border: '2px solid #0f0f0f',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
              marginBottom: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '400px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Metal texture overlay - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/metalscratchedtexture.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.6,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Rust/wear overlay - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/brownrust.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Dust/grime layer - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/dust.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.3,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Rivets on label */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  [i < 2 ? 'top' : 'bottom']: '6px',
                  [i % 2 === 0 ? 'left' : 'right']: '10px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #2a2a2a)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
                  zIndex: 1,
                }}
              />
            ))}

            <div
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 'bold',
                color: 'rgba(200,200,200,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              FIELD INVESTIGATION KIT
            </div>
          </div>

          {/* Suitcase interior - foam cutouts */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
              padding: isMobile ? '20px' : '28px',
              borderRadius: '8px',
              border: '3px solid #000',
              boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.95), inset 0 -6px 12px rgba(0,0,0,0.8)',
              position: 'relative',
            }}
          >
            {/* Foam texture */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
                opacity: 0.5,
                pointerEvents: 'none',
                borderRadius: '8px',
              }}
            />

            {/* Tools section */}
            <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '11px' : '12px',
                  color: 'rgba(200,200,200,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                INVESTIGATION TOOLS
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                  gap: isMobile ? '12px' : '16px',
                }}
              >
                {equipmentItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setViewingTool(item.toolType)}
                    style={{
                      background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
                      padding: isMobile ? '12px' : '16px',
                      borderRadius: '8px',
                      border: '2px solid #000',
                      boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.98), inset 0 -3px 8px rgba(0,0,0,0.9)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = 'inset 0 6px 16px rgba(0,0,0,0.98), 0 0 12px rgba(0,255,85,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'inset 0 6px 16px rgba(0,0,0,0.98), inset 0 -3px 8px rgba(0,0,0,0.9)';
                    }}
                  >
                    {/* Foam cutout texture */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='foam'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23foam)' opacity='0.2'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay',
                        opacity: 0.7,
                        pointerEvents: 'none',
                        borderRadius: '8px',
                      }}
                    />

                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      <ToolIcon toolType={item.toolType} size={isMobile ? 50 : 60} />
                      <div
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: isMobile ? '9px' : '10px',
                          color: 'rgba(200,200,200,0.5)',
                          marginTop: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplies section */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '11px' : '12px',
                  color: 'rgba(200,200,200,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                SUPPLIES
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: isMobile ? '12px' : '16px',
                }}
              >
                {supplyItems.map((item) => {
                  const isEmpty = item.count === 0;

                  return (
                    <div
                      key={item.label}
                      style={{
                        background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
                        padding: isMobile ? '14px' : '18px',
                        borderRadius: '8px',
                        border: '2px solid #000',
                        boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.98), inset 0 -3px 8px rgba(0,0,0,0.9)',
                        position: 'relative',
                        opacity: isEmpty ? 0.4 : 1,
                      }}
                    >
                      {/* Foam texture */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='foam'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23foam)' opacity='0.2'/%3E%3C/svg%3E")`,
                          mixBlendMode: 'overlay',
                          opacity: 0.7,
                          pointerEvents: 'none',
                          borderRadius: '8px',
                        }}
                      />

                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* Icon */}
                        <div
                          style={{
                            fontSize: isMobile ? '32px' : '40px',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </div>

                        {/* Label */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily: '"Courier New", monospace',
                              fontSize: isMobile ? '11px' : '12px',
                              color: isEmpty ? 'rgba(150,150,150,0.3)' : 'rgba(200,200,200,0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              marginBottom: '4px',
                              textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                            }}
                          >
                            {item.label}
                          </div>
                        </div>

                        {/* Count - LED display */}
                        <div
                          style={{
                            background: '#000',
                            padding: '6px 14px',
                            borderRadius: '4px',
                            border: '2px solid #0a0a0a',
                            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.95)',
                            minWidth: '60px',
                            textAlign: 'center',
                          }}
                        >
                          <div
                            style={{
                              fontFamily: '"Courier New", monospace',
                              fontSize: isMobile ? '20px' : '24px',
                              fontWeight: 'bold',
                              color: isEmpty ? '#ff0000' : '#00ff55',
                              textShadow: isEmpty
                                ? '0 0 10px rgba(255,0,0,0.9), 0 0 20px rgba(255,0,0,0.5)'
                                : '0 0 10px rgba(0,255,85,0.9), 0 0 20px rgba(0,255,85,0.5)',
                              letterSpacing: '2px',
                            }}
                          >
                            {item.count}
                          </div>
                        </div>

                        {/* Status LED */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: isEmpty ? '#ff0000' : '#00ff55',
                            boxShadow: isEmpty
                              ? '0 0 10px rgba(255,0,0,0.9), 0 0 16px rgba(255,0,0,0.6)'
                              : '0 0 10px rgba(0,255,85,0.9), 0 0 16px rgba(0,255,85,0.6)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Viewer Modal */}
      {viewingTool && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            background: '#0a0a0a',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setViewingTool(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10001,
              width: '50px',
              height: '50px',
              padding: '0',
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              border: '1px solid rgba(220, 38, 38, 0.5)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              color: 'white',
            }}
            title="Close"
          >
            ✕
          </button>

          {/* Tool Component */}
          {viewingTool === 'radar' && <RadarTool mode="view" />}
          {viewingTool === 'emf' && <EMFMeterTool mode="view" />}
          {viewingTool === 'thermal' && <ThermalScannerTool mode="view" />}
          {viewingTool === 'audio' && <AudioReceiverTool mode="view" />}
          {viewingTool === 'camera' && <CameraTool mode="view" />}
        </div>
      )}
    </div>
  );
}
