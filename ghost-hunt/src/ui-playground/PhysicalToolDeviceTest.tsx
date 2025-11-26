// Test page for PhysicalToolDevice component
import React from 'react';
import { PhysicalToolDevice } from '../components/Equipment/PhysicalToolDevice';

export function PhysicalToolDeviceTest() {
  const tools: Array<'radar' | 'emf' | 'thermal' | 'audio' | 'camera'> = [
    'radar',
    'emf',
    'thermal',
    'audio',
    'camera',
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#1a1a1a',
        padding: '40px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: '"Courier New", monospace',
            color: '#00ff55',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          PhysicalToolDevice Component Test
        </h1>

        {/* Mobile size (60px) */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: '"Courier New", monospace',
              color: 'rgba(200,200,200,0.7)',
              marginBottom: '20px',
            }}
          >
            Mobile Size (60px)
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              flexWrap: 'wrap',
              background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
              padding: '30px',
              borderRadius: '8px',
            }}
          >
            {tools.map((tool) => (
              <div key={tool} style={{ textAlign: 'center' }}>
                <PhysicalToolDevice
                  toolType={tool}
                  size={60}
                  onClick={() => console.log(`Clicked ${tool}`)}
                />
                <div
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    color: 'rgba(200,200,200,0.5)',
                    marginTop: '20px',
                    textTransform: 'uppercase',
                  }}
                >
                  {tool}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop size (80px) */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: '"Courier New", monospace',
              color: 'rgba(200,200,200,0.7)',
              marginBottom: '20px',
            }}
          >
            Desktop Size (80px)
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              flexWrap: 'wrap',
              background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
              padding: '30px',
              borderRadius: '8px',
            }}
          >
            {tools.map((tool) => (
              <div key={tool} style={{ textAlign: 'center' }}>
                <PhysicalToolDevice
                  toolType={tool}
                  size={80}
                  onClick={() => console.log(`Clicked ${tool}`)}
                />
                <div
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    color: 'rgba(200,200,200,0.5)',
                    marginTop: '20px',
                    textTransform: 'uppercase',
                  }}
                >
                  {tool}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In foam cutout context */}
        <div>
          <h2
            style={{
              fontFamily: '"Courier New", monospace',
              color: 'rgba(200,200,200,0.7)',
              marginBottom: '20px',
            }}
          >
            In Foam Cutout Context (70px)
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '16px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
              padding: '28px',
              borderRadius: '8px',
              border: '3px solid #000',
              boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.95), inset 0 -6px 12px rgba(0,0,0,0.8)',
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool}
                style={{
                  background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.98), inset 0 -3px 8px rgba(0,0,0,0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <PhysicalToolDevice
                  toolType={tool}
                  size={70}
                  onClick={() => console.log(`Clicked ${tool}`)}
                />
                <div
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '9px',
                    color: 'rgba(200,200,200,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                  }}
                >
                  {tool}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
