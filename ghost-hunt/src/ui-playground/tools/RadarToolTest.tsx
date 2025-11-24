/**
 * RadarToolTest - Test component for the production RadarTool
 * 
 * This component tests the new RadarTool with enhanced animations:
 * - Rotating sweep line (2 degrees per frame)
 * - Sweep fade trail (30-degree arc with gradient)
 * - Enhanced CRT glow effect (radial gradient with blur)
 * - Scanline overlay (repeating linear gradient)
 * - Static noise animation
 * - Bloom effect on bright areas
 * - Mode switching (view vs investigation)
 */

import { useState } from 'react';
import { RadarTool } from '../../components/Investigation/Tools/RadarTool';

export function RadarToolTest() {
  const [mode, setMode] = useState<'view' | 'investigation'>('view');
  const [playerHeading, setPlayerHeading] = useState(0);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Mode Toggle Controls */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '8px',
        color: '#fff',
        fontFamily: 'monospace',
      }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Mode:</strong>
          <button
            onClick={() => setMode('view')}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              background: mode === 'view' ? '#00ff00' : '#333',
              color: mode === 'view' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View
          </button>
          <button
            onClick={() => setMode('investigation')}
            style={{
              marginLeft: '5px',
              padding: '5px 10px',
              background: mode === 'investigation' ? '#00ff00' : '#333',
              color: mode === 'investigation' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Investigation
          </button>
        </div>
        
        {mode === 'investigation' && (
          <div>
            <strong>Player Heading:</strong> {playerHeading}°
            <input
              type="range"
              min="0"
              max="360"
              value={playerHeading}
              onChange={(e) => setPlayerHeading(Number(e.target.value))}
              style={{
                width: '100%',
                marginTop: '5px',
              }}
            />
          </div>
        )}
        
        <div style={{ marginTop: '15px', fontSize: '12px', opacity: 0.7 }}>
          <div>✓ Rotating sweep line</div>
          <div>✓ Sweep fade trail (30°)</div>
          <div>✓ Enhanced CRT glow</div>
          <div>✓ Scanline overlay</div>
          <div>✓ Static noise animation</div>
          <div>✓ Bloom effect</div>
        </div>
      </div>

      {/* RadarTool Component */}
      <RadarTool
        mode={mode}
        ghostBearing={45}
        ghostDistance={120}
        playerHeading={playerHeading}
        isGhostMoving={false}
        sweepSpeed={2}
      />
    </div>
  );
}
