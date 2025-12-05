// Debug overlay for monitoring sensor data and performance
import { useState, useMemo } from 'react';
import type { GPSPosition } from '../../utils/gps';
import { useInvestigationStore } from '../../stores/investigationStore';
import { useGhostRelationship } from '../../hooks/useGhostRelationship';
import { calculateEMFLevel } from '../../utils/toolBehaviors';

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
  
  // ✅ Use centralized ghost relationship hook (single source of truth)
  const relationship = useGhostRelationship();
  
  // Calculate current EMF level from centralized relationship
  const emfData = useMemo(() => {
    if (!relationship.isValid || !relationship.ghostBehavior) {
      return null;
    }
    
    // ✅ Use centralized relationship data
    const distance = relationship.distance;
    const emfLevel = calculateEMFLevel(distance);
    
    return {
      level: emfLevel,
      distance,
    };
  }, [relationship.isValid, relationship.distance]);
  
  // EMF level descriptions (distance-based only)
  const emfLevelInfo: Record<number, string> = {
    0: 'No signal (>40m)',
    1: 'Weak signal (20-40m)',
    2: 'Moderate signal (10-20m)',
    3: 'Strong signal (6-10m)',
    4: 'Very strong (3-6m)',
    5: 'Maximum (<3m)',
  };
  
  // Distance thresholds for EMF levels
  const emfThresholds = [
    { level: 5, distance: '<3m' },
    { level: 4, distance: '3-6m' },
    { level: 3, distance: '6-10m' },
    { level: 2, distance: '10-20m' },
    { level: 1, distance: '20-40m' },
    { level: 0, distance: '>40m' },
  ];

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
        {relationship.isValid ? (
          <>
            <div style={{ color: '#fecaca' }}>
              Distance: {relationship.distance.toFixed(1)}m
            </div>
            <div style={{ color: '#fecaca' }}>
              Bearing: {relationship.bearing.toFixed(1)}°
            </div>
            <div style={{ color: '#64748b', fontSize: '9px', marginTop: '4px' }}>
              {getCardinalDirection(relationship.bearing)}
            </div>
            {playerHeading !== null && (
              <div style={{ color: '#fca5a5', marginTop: '4px' }}>
                Relative: {relationship.relativeBearing.toFixed(1)}°
              </div>
            )}
            {relationship.ghostType && (
              <div style={{ color: '#fecaca', marginTop: '4px', fontSize: '9px' }}>
                Type: {relationship.ghostType}
              </div>
            )}
          </>
        ) : (
          <div style={{ color: '#ef4444' }}>Ghost not spawned</div>
        )}
      </div>

      {/* EMF Section */}
      {emfData && (
        <div
          style={{
            marginBottom: '12px',
            padding: '8px',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            borderRadius: '6px',
            border: `2px solid ${
              emfData.level >= 4 
                ? 'rgba(239, 68, 68, 0.5)' 
                : emfData.level >= 2 
                ? 'rgba(251, 191, 36, 0.5)' 
                : 'rgba(34, 197, 94, 0.5)'
            }`,
          }}
        >
          <div style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '6px' }}>
            ⚡ EMF Meter
          </div>
          <div style={{ color: '#fef3c7', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
            Level: {emfData.level}/5
          </div>
          <div style={{ color: '#fde68a', marginBottom: '4px' }}>
            Distance: {emfData.distance.toFixed(1)}m
          </div>
          <div style={{ 
            marginTop: '6px', 
            paddingTop: '6px', 
            borderTop: '1px solid rgba(251, 191, 36, 0.3)',
            fontSize: '9px',
          }}>
            <div style={{ color: '#fde68a', marginBottom: '4px', fontWeight: 'bold' }}>
              Distance Thresholds:
            </div>
            {emfThresholds.map((threshold) => (
              <div 
                key={threshold.level}
                style={{ 
                  color: threshold.level === emfData.level ? '#fbbf24' : '#fde68a',
                  fontWeight: threshold.level === emfData.level ? 'bold' : 'normal',
                }}
              >
                Level {threshold.level}: {threshold.distance}
              </div>
            ))}
          </div>
        </div>
      )}

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
