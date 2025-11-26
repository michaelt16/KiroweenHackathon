// Demo page for MechanicalFilmCounter component
import { useState } from 'react';
import { MechanicalFilmCounter } from '../components/Equipment/MechanicalFilmCounter';

export function MechanicalFilmCounterDemo() {
  const [count, setCount] = useState(12);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      padding: '20px',
    }}>
      <h1 style={{
        color: '#ffffff',
        fontFamily: '"Courier New", monospace',
        fontSize: '24px',
        marginBottom: '20px',
      }}>
        MechanicalFilmCounter Component Demo
      </h1>

      {/* Main counter display */}
      <div style={{
        background: '#2a2a2a',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
      }}>
        <MechanicalFilmCounter count={count} />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#3a3a3a',
            color: '#ffffff',
            border: '2px solid #4a4a4a',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
          }}
        >
          - Decrease
        </button>

        <div style={{
          color: '#ffffff',
          fontFamily: '"Courier New", monospace',
          fontSize: '18px',
          minWidth: '100px',
          textAlign: 'center',
        }}>
          Count: {count}
        </div>

        <button
          onClick={() => setCount(Math.min(99, count + 1))}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#3a3a3a',
            color: '#ffffff',
            border: '2px solid #4a4a4a',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
          }}
        >
          + Increase
        </button>
      </div>

      {/* Preset values */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[0, 5, 12, 25, 50, 75, 99].map((preset) => (
          <button
            key={preset}
            onClick={() => setCount(preset)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              background: count === preset ? '#4a4a4a' : '#2a2a2a',
              color: '#ffffff',
              border: '1px solid #3a3a3a',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: '"Courier New", monospace',
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Multiple counters showcase */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '40px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Empty</div>
          <MechanicalFilmCounter count={0} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Low</div>
          <MechanicalFilmCounter count={3} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Medium</div>
          <MechanicalFilmCounter count={42} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Full</div>
          <MechanicalFilmCounter count={99} />
        </div>
      </div>

      {/* Design specs */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#2a2a2a',
        borderRadius: '8px',
        maxWidth: '600px',
        color: '#cccccc',
        fontFamily: '"Courier New", monospace',
        fontSize: '12px',
        lineHeight: '1.6',
      }}>
        <div style={{ color: '#ffffff', marginBottom: '10px', fontSize: '14px' }}>Design Specifications:</div>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Size: 120px × 70px</li>
          <li>Housing: Dark metal gradient with corner screws</li>
          <li>Display: 80px × 45px, deeply inset</li>
          <li>Background: Black LCD (#0a0a0a)</li>
          <li>Digits: White with glow, Courier New, 28px, bold</li>
          <li>3D Effect: Multiple text shadows</li>
          <li>Label: "FILM ROLLS" (Courier, 9px, etched)</li>
          <li>Corner screws: 4 screws (5px diameter)</li>
          <li>Texture overlays: Metal, rust, dust</li>
        </ul>
      </div>
    </div>
  );
}
