// Demo page for LEDBoostGauge component
import { useState } from 'react';
import { LEDBoostGauge } from '../components/Equipment/LEDBoostGauge';

export function LEDBoostGaugeDemo() {
  const [count, setCount] = useState(60);
  const max = 99;

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
        LEDBoostGauge Component Demo
      </h1>

      {/* Main gauge display */}
      <div style={{
        background: '#2a2a2a',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
      }}>
        <LEDBoostGauge count={count} max={max} />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        <button
          onClick={() => setCount(Math.max(0, count - 5))}
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
          minWidth: '150px',
          textAlign: 'center',
        }}>
          Count: {count} / {max}
        </div>

        <button
          onClick={() => setCount(Math.min(max, count + 5))}
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
        {[0, 10, 20, 40, 60, 80, 99].map((preset) => (
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

      {/* Segment indicator */}
      <div style={{
        color: '#2dd4bf',
        fontFamily: '"Courier New", monospace',
        fontSize: '14px',
        textAlign: 'center',
      }}>
        Active Segments: {Math.min(5, Math.ceil((count / max) * 5))} / 5
      </div>

      {/* Multiple gauges showcase */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '40px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Empty (0)</div>
          <LEDBoostGauge count={0} max={max} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>1 Segment (15)</div>
          <LEDBoostGauge count={15} max={max} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>3 Segments (50)</div>
          <LEDBoostGauge count={50} max={max} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>Full (99)</div>
          <LEDBoostGauge count={99} max={max} />
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
          <li>Housing: Dark plastic with inset shadows</li>
          <li>LED bar: Horizontal, 5 segments</li>
          <li>Segment size: 16px × 35px each</li>
          <li>Gap: 5px between segments</li>
          <li>Active segments: Teal (#2dd4bf) with bloom</li>
          <li>Inactive segments: Dark gray (#1a1a1a) with outline</li>
          <li>Label: "SCANNER BOOSTS" (Courier, 9px, etched)</li>
          <li>Housing screws: 4 corners (5px diameter)</li>
          <li>Texture overlays: Metal, rust, dust, film grain</li>
          <li>Vignette effect on LED block</li>
          <li>Slight brightness variation per segment</li>
        </ul>
      </div>
    </div>
  );
}
