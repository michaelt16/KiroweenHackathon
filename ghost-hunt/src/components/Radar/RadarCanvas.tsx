// Radar canvas component - circular radar with sweeping rings
import { useEffect, useRef, useState } from 'react';
import './RadarCanvas.css';

interface RadarCanvasProps {
  onSweepAngleChange?: (angle: number) => void;
}

export function RadarCanvas({ onSweepAngleChange }: RadarCanvasProps = {}) {
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
    const maxRadius = size / 2 - 20;

    let sweepAngle = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0b0f1a';
      ctx.fillRect(0, 0, size, size);

      // Draw concentric rings
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshairs
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.stroke();

      // Draw sweeping line
      ctx.save();
      ctx.translate(centerX, centerY);
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

      // Draw center player marker
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
  }, []);

  return (
    <div className="radar-container">
      <canvas ref={canvasRef} className="radar-canvas" />
    </div>
  );
}
