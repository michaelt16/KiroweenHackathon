import { useEffect, useRef } from 'react';
import './CRTOverlay.css';

interface CRTOverlayProps {
  intensity?: number; // 0-1, controls overall effect strength
  scanlineSpacing?: number; // pixels between scanlines
  staticOpacity?: number; // 0-1, noise texture opacity
  flickerEnabled?: boolean;
}

export function CRTOverlay({
  intensity = 0.6,
  scanlineSpacing = 3,
  staticOpacity = 0.08,
  flickerEnabled = true,
}: CRTOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate noise texture once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 256;
    canvas.height = 256;

    // Generate noise
    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255;   // A
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <div 
      className="crt-overlay"
      style={{
        opacity: intensity,
        pointerEvents: 'none',
      }}
    >
      {/* Scanlines */}
      <div 
        className="crt-scanlines"
        style={{
          backgroundSize: `100% ${scanlineSpacing}px`,
        }}
      />

      {/* Static Noise */}
      <canvas
        ref={canvasRef}
        className="crt-static"
        style={{
          opacity: staticOpacity,
        }}
      />

      {/* Flicker Effect */}
      {flickerEnabled && <div className="crt-flicker" />}

      {/* Chromatic Aberration (RGB Split) */}
      <div className="crt-aberration" />
    </div>
  );
}
