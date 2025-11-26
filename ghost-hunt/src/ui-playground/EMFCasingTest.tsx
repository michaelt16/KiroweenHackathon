import { useState } from 'react';
import { EMFCasing } from '../components/Investigation/Tools/EMFTool/EMFCasing';

/**
 * Visual test for EMFCasing component
 * 
 * This component allows testing the EMFCasing in isolation
 * with different EMF levels to verify:
 * - Warning LED changes color at level 4+
 * - Toggle switch renders
 * - Calibration screw renders
 * - Micro-indentations render
 * - Labels render correctly
 */
export function EMFCasingTest() {
  const [emfLevel, setEmfLevel] = useState(0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    }}>
      {/* Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '8px',
        zIndex: 1000,
      }}>
        <h3 style={{ color: '#fff', marginBottom: '10px' }}>EMF Level: {emfLevel}</h3>
        <input
          type="range"
          min="0"
          max="5"
          value={emfLevel}
          onChange={(e) => setEmfLevel(Number(e.target.value))}
          style={{ width: '200px' }}
        />
        <div style={{ color: '#fff', fontSize: '12px', marginTop: '10px' }}>
          Warning LED should be red at level 4+
        </div>
      </div>

      {/* Device Casing Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
      }}>
        <EMFCasing emfLevel={emfLevel} />
      </div>

      {/* Legend */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(255,255,255,0.1)',
        padding: '15px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '12px',
        maxWidth: '300px',
        zIndex: 1000,
      }}>
        <h4 style={{ marginBottom: '10px' }}>EMFCasing Elements:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Warning LED (top-left)</li>
          <li>Toggle switch (top-right)</li>
          <li>Calibration screw (right side)</li>
          <li>Micro-indentations (scattered)</li>
          <li>Labels: CAL, BAT, 9V, ±0.1V, DC</li>
          <li>Localized rust spots</li>
        </ul>
      </div>
    </div>
  );
}
