// Radar canvas component - circular radar with sweeping rings
import { useEffect, useRef } from 'react';
import './RadarCanvas.css';

interface RadarCanvasProps {
  onSweepAngleChange?: (angle: number) => void;
  playerHeading?: number | null; // Player's compass heading (0-360°)
  ghostBearing?: number; // Bearing to ghost (0-360°)
  compassAccuracy?: number; // Compass accuracy in degrees
}

export function RadarCanvas({
  onSweepAngleChange,
  playerHeading = null,
  ghostBearing,
  compassAccuracy = 20,
}: RadarCanvasProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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
      // Clear canvas
      ctx.fillStyle = '#0b0f1a';
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

      // Draw concentric rings
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, (maxRadius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshairs
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';
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

        // Cone edges
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(maxRadius * Math.cos(-Math.PI / 4), maxRadius * Math.sin(-Math.PI / 4));
        ctx.moveTo(0, 0);
        ctx.lineTo(maxRadius * Math.cos(Math.PI / 4), maxRadius * Math.sin(Math.PI / 4));
        ctx.stroke();
      }

      // Draw sweeping line
      ctx.save();
      ctx.rotate(sweepAngle);

      // Gradient for sweep
      const gradient = ctx.createLinearGradient(0, 0, maxRadius, 0);
      gradient.addColorStop(0, 'rgba(45, 212, 191, 0)');
      gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.3)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0.8)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.stroke();

      ctx.restore();

      // Draw north indicator (rotates opposite to heading)
      ctx.save();
      if (playerHeading !== null) {
        // North indicator stays fixed to true north
        const northAngle = (playerHeading * Math.PI) / 180;
        ctx.rotate(northAngle);
      }

      // North marker
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', 0, -maxRadius - 25);

      // North arrow
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -maxRadius - 15);
      ctx.lineTo(-5, -maxRadius - 10);
      ctx.moveTo(0, -maxRadius - 15);
      ctx.lineTo(5, -maxRadius - 10);
      ctx.stroke();

      ctx.restore();

      ctx.restore(); // Restore main rotation

      // Draw center player marker (always centered, not rotated)
      ctx.fillStyle = '#2dd4bf';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.stroke();

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
            background: 'rgba(11, 15, 26, 0.8)',
            border: '1px solid rgba(45, 212, 191, 0.3)',
            borderRadius: '8px',
            padding: '8px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>
            Heading
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2dd4bf' }}>
            {Math.round(playerHeading)}°
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
            background: 'rgba(11, 15, 26, 0.8)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '8px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>
            Target
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
            {Math.round(ghostBearing)}°
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
            background: 'rgba(251, 191, 36, 0.9)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
            maxWidth: '80%',
          }}
        >
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <div style={{ fontSize: '12px', color: '#78350f' }}>
            Low compass accuracy (±{Math.round(compassAccuracy)}°)
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
            background: 'rgba(71, 85, 105, 0.9)',
            border: '1px solid rgba(100, 116, 139, 0.5)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
            maxWidth: '80%',
          }}
        >
          <span style={{ fontSize: '16px' }}>🧭</span>
          <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
            Rotate your body to scan for the ghost
          </div>
        </div>
      )}
    </div>
  );
}
