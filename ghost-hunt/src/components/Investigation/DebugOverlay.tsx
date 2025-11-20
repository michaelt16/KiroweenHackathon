// Debug overlay for monitoring sensor data and performance
import { useState } from 'react';
import type { GPSPosition } from '../../utils/gps';

interface DebugOverlayProps {
  playerPosition: GPSPosition | null;
  playerHeading: number | null;
  ghostPosition: GPSPosition | null;
  ghostDistance: number;
  ghostBearing: number;
  gpsAccuracy: number;
  compassAccuracy: number;
  ghostType?: string;
  sanity?: number;
}

export function DebugOverlay({
  playerPosition,
  playerHeading,
  ghostPosition,
  ghostDistance,
  ghostBearing,
  gpsAccuracy,
  compassAccuracy,
  ghostType,
  sanity,
}: DebugOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '8px 12px',
          backgroundColor: 'rgba(34, 197, 94, 0.9)',
          border: '2px solid rgba(74, 222, 128, 0.5)',
          borderRadius: '8px',
          color: '#dcfce7',
          fontSize: '12px',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold',
        }}
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '2px solid rgba(34, 197, 94, 0.5)',
        borderRadius: '12px',
        padding: '16px',
        minWidth: '280px',
        maxWidth: '320px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        fontFamily: 'monospace',
        fontSize: '11px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(34, 197, 94, 0.3)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#86efac',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          🐛 Debug Info
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          style={{
            padding: '4px 8px',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '4px',
            color: '#86efac',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Hide
        </button>
      </div>

      {/* GPS Section */}
      <div
        style={{
          marginBottom: '12px',
          padding: '8px',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '6px',
        }}
      >
        <div style={{ color: '#86efac', fontWeight: 'bold', marginBottom: '6px' }}>
          📍 GPS Data
        </div>
        {playerPosition ? (
          <>
            <div style={{ color: '#d1fae5' }}>
              Lat: {playerPosition.lat.toFixed(6)}
            </div>
            <div style={{ color: '#d1fae5' }}>
              Lng: {playerPosition.lng.toFixed(6)}
            </div>
            <div style={{ color: '#86efac', marginTop: '4px' }}>
              Accuracy: ±{gpsAccuracy.toFixed(1)}m
            </div>
            <div style={{ color: '#64748b', fontSize: '9px', marginTop: '4px' }}>
              Updated: {new Date(playerPosition.timestamp).toLocaleTimeString()}
            </div>
          </>
        ) : (
          <div style={{ color: '#ef4444' }}>No GPS signal</div>
        )}
      </div>

      {/* Compass Section */}
      <div
        style={{
          marginBottom: '12px',
          padding: '8px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '6px',
        }}
      >
        <div style={{ color: '#93c5fd', fontWeight: 'bold', marginBottom: '6px' }}>
          🧭 Compass Data
        </div>
        {playerHeading !== null ? (
          <>
            <div style={{ color: '#dbeafe' }}>
              Heading: {playerHeading.toFixed(1)}°
            </div>
            <div style={{ color: '#93c5fd', marginTop: '4px' }}>
              Accuracy: ±{compassAccuracy.toFixed(1)}°
            </div>
            <div style={{ color: '#64748b', fontSize: '9px', marginTop: '4px' }}>
              {getCardinalDirection(playerHeading)}
            </div>
          </>
        ) : (
          <div style={{ color: '#ef4444' }}>No compass data</div>
        )}
      </div>

      {/* Ghost Section */}
      <div
        style={{
          marginBottom: '12px',
          padding: '8px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '6px',
        }}
      >
        <div style={{ color: '#fca5a5', fontWeight: 'bold', marginBottom: '6px' }}>
          👻 Ghost Data
        </div>
        {ghostPosition ? (
          <>
            <div style={{ color: '#fecaca' }}>
              Distance: {ghostDistance.toFixed(1)}m
            </div>
            <div style={{ color: '#fecaca' }}>
              Bearing: {ghostBearing.toFixed(1)}°
            </div>
            <div style={{ color: '#64748b', fontSize: '9px', marginTop: '4px' }}>
              {getCardinalDirection(ghostBearing)}
            </div>
            {playerHeading !== null && (
              <div style={{ color: '#fca5a5', marginTop: '4px' }}>
                Relative: {getRelativeAngle(ghostBearing, playerHeading).toFixed(1)}°
              </div>
            )}
          </>
        ) : (
          <div style={{ color: '#ef4444' }}>Ghost not spawned</div>
        )}
      </div>

      {/* Game State Section */}
      {(ghostType || sanity !== undefined) && (
        <div
          style={{
            padding: '8px',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '6px',
          }}
        >
          <div style={{ color: '#c4b5fd', fontWeight: 'bold', marginBottom: '6px' }}>
            🎮 Game State
          </div>
          {ghostType && (
            <div style={{ color: '#e9d5ff' }}>Type: {ghostType}</div>
          )}
          {sanity !== undefined && (
            <div style={{ color: '#e9d5ff' }}>Sanity: {sanity}%</div>
          )}
        </div>
      )}

      {/* Performance Hint */}
      <div
        style={{
          marginTop: '12px',
          padding: '6px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '4px',
          fontSize: '9px',
          color: '#64748b',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        Debug overlay may impact performance
      </div>
    </div>
  );
}

// Helper: Get cardinal direction from degrees
function getCardinalDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
}

// Helper: Calculate relative angle between bearing and heading
function getRelativeAngle(bearing: number, heading: number): number {
  let relative = bearing - heading;
  
  // Normalize to -180 to 180
  while (relative > 180) relative -= 360;
  while (relative < -180) relative += 360;
  
  return relative;
}
