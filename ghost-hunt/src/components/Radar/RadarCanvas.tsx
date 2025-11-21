// Radar canvas component - circular radar with sweeping rings
import { useEffect, useRef } from 'react';
import './RadarCanvas.css';

interface RadarCanvasProps {
  onSweepAngleChange?: (angle: number) => void;
  playerHeading?: number | null; // Player's compass heading (0-360°)
  ghostBearing?: number; // Bearing to ghost (0-360°)
  compassAccuracy?: number; // Compass accuracy in degrees
}

// Helper function to get cardinal direction from heading
function getCardinalDirection(heading: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(heading / 22.5) % 16;
  return directions[index];
}

export function RadarCanvas({
  onSweepAngleChange,
  playerHeading = null,
  ghostBearing,
  compassAccuracy = 20,
}: RadarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size / 2 - 60; // More padding for compass rose

    let sweepAngle = 0;

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#0a0f14';
      ctx.fillRect(0, 0, size, size);

      // Save context for rotation
      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotate entire radar based on player heading (if available)
      if (playerHeading !== null) {
        // Rotate so player's heading points up
        // Convert heading to radians and rotate counter-clockwise
        const headingRad = (-playerHeading * Math.PI) / 180;
        ctx.rotate(headingRad);
      }

      // Draw concentric rings - subtle
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, (maxRadius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshairs
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -maxRadius);
      ctx.lineTo(0, maxRadius);
      ctx.moveTo(-maxRadius, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.stroke();

      // Draw forward cone visualization (±45°)
      if (playerHeading !== null) {
        ctx.fillStyle = 'rgba(45, 212, 191, 0.05)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, maxRadius, -Math.PI / 4, Math.PI / 4);
        ctx.closePath();
        ctx.fill();

        // Cone edges - subtle
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(maxRadius * Math.cos(-Math.PI / 4), maxRadius * Math.sin(-Math.PI / 4));
        ctx.moveTo(0, 0);
        ctx.lineTo(maxRadius * Math.cos(Math.PI / 4), maxRadius * Math.sin(Math.PI / 4));
        ctx.stroke();
      }

      // Draw sweeping line - subtle
      ctx.save();
      ctx.rotate(sweepAngle);

      // Gradient for sweep
      const gradient = ctx.createLinearGradient(0, 0, maxRadius, 0);
      gradient.addColorStop(0, 'rgba(45, 212, 191, 0)');
      gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.2)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0.5)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(45, 212, 191, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();

      // Draw compass rose (cardinal directions)
      ctx.save();
      if (playerHeading !== null) {
        // Compass rose stays fixed to true directions
        const northAngle = (playerHeading * Math.PI) / 180;
        ctx.rotate(northAngle);
      }

      const directions = [
        { label: 'N', angle: 0, color: '#2dd4bf' },
        { label: 'E', angle: Math.PI / 2, color: '#64748b' },
        { label: 'S', angle: Math.PI, color: '#64748b' },
        { label: 'W', angle: (3 * Math.PI) / 2, color: '#64748b' },
      ];

      directions.forEach(({ label, angle, color }) => {
        ctx.save();
        ctx.rotate(angle);

        // Direction label - subtle
        ctx.fillStyle = color;
        ctx.font = label === 'N' ? 'bold 18px monospace' : 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (label === 'N') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(45, 212, 191, 0.4)';
        }
        ctx.fillText(label, 0, -maxRadius - 30);
        ctx.shadowBlur = 0;

        // Direction tick mark
        ctx.strokeStyle = color;
        ctx.lineWidth = label === 'N' ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(0, -maxRadius - 10);
        ctx.lineTo(0, -maxRadius - 18);
        ctx.stroke();

        ctx.restore();
      });

      // Draw degree markings every 30°
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6; // 30° increments
        // Skip cardinal directions (already drawn)
        if (i % 3 !== 0) {
          ctx.save();
          ctx.rotate(angle);

          // Small tick mark
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -maxRadius - 5);
          ctx.lineTo(0, -maxRadius - 12);
          ctx.stroke();

          ctx.restore();
        }
      }

      ctx.restore();

      ctx.restore(); // Restore main rotation

      // Draw forward direction indicator (always points up - your heading)
      if (playerHeading !== null) {
        ctx.save();
        ctx.translate(centerX, centerY);

        // Forward arrow/chevron - subtle
        ctx.strokeStyle = '#2dd4bf';
        ctx.fillStyle = 'rgba(45, 212, 191, 0.2)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(45, 212, 191, 0.3)';
        ctx.beginPath();
        ctx.moveTo(0, -maxRadius + 15);
        ctx.lineTo(-8, -maxRadius + 25);
        ctx.lineTo(0, -maxRadius + 20);
        ctx.lineTo(8, -maxRadius + 25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Forward line
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, -maxRadius + 30);
        ctx.lineTo(0, -30);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      }

      // Draw center player marker (always centered, not rotated)
      ctx.fillStyle = '#2dd4bf';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(45, 212, 191, 0.5)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Outer ring
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 9, 0, Math.PI * 2);
      ctx.stroke();

      // Player direction indicator (small triangle pointing up)
      ctx.fillStyle = '#2dd4bf';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 14);
      ctx.lineTo(centerX - 5, centerY - 8);
      ctx.lineTo(centerX + 5, centerY - 8);
      ctx.closePath();
      ctx.fill();

      // Update sweep angle
      sweepAngle += 0.02;
      if (sweepAngle > Math.PI * 2) sweepAngle = 0;

      // Notify parent of sweep angle
      if (onSweepAngleChange) {
        onSweepAngleChange(sweepAngle);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playerHeading, ghostBearing, compassAccuracy, onSweepAngleChange]);

  return (
    <div className="radar-container">
      <canvas ref={canvasRef} className="radar-canvas" />

      {/* Heading Display */}
      {playerHeading !== null && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 15, 20, 0.95)',
            border: '1px solid rgba(51, 65, 85, 0.8)',
            borderRadius: '4px',
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'monospace' }}>
            HEADING
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#cbd5e1', fontFamily: 'monospace' }}>
            {Math.round(playerHeading)}°
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
            {getCardinalDirection(playerHeading)}
          </div>
        </div>
      )}

      {/* Target Bearing Display (when ghost is in forward cone) */}
      {playerHeading !== null && ghostBearing !== undefined && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(10, 15, 20, 0.95)',
            border: '1px solid rgba(45, 212, 191, 0.4)',
            borderRadius: '4px',
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 0 8px rgba(45, 212, 191, 0.2)',
          }}
        >
          <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'monospace' }}>
            TARGET
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2dd4bf', fontFamily: 'monospace' }}>
            {Math.round(ghostBearing)}°
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
            {getCardinalDirection(ghostBearing)}
          </div>
        </div>
      )}

      {/* Compass Accuracy Warning */}
      {compassAccuracy > 20 && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 15, 20, 0.95)',
            border: '1px solid rgba(251, 191, 36, 0.5)',
            borderRadius: '4px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
            maxWidth: '80%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <span style={{ fontSize: '14px' }}>⚠️</span>
          <div style={{ fontSize: '11px', color: '#fbbf24', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
            Low accuracy (±{Math.round(compassAccuracy)}°)
          </div>
        </div>
      )}

      {/* Manual Rotation Hint (when no compass) */}
      {playerHeading === null && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 15, 20, 0.95)',
            border: '1px solid rgba(51, 65, 85, 0.8)',
            borderRadius: '4px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
            maxWidth: '80%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <span style={{ fontSize: '14px' }}>🧭</span>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
            Rotate to scan
          </div>
        </div>
      )}
    </div>
  );
}
