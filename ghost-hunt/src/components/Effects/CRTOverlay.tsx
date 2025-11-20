// CRT Overlay - Scanlines, Static, Flicker, Chromatic Aberration
import { useEffect, useRef, useState } from 'react';
import './CRTOverlay.css';

interface CRTOverlayProps {
  intensity?: number; // 0-1, default 0.5
  scanlineSpacing?: number; // pixels, default 3
  staticOpacity?: number; // 0-1, default 0.08
  flickerEnabled?: boolean; // default true
}

export function CRTOverlay({
  intensity = 0.5,
  scanlineSpacing = 3,
  staticOpacity = 0.08,
  flickerEnabled = true,
}: CRTOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFlickering, setIsFlickering] = useState(false);

  // Generate static noise texture (cached)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (small, will be repeated)
    canvas.width = 256;
    canvas.height = 256;

    // Generate noise
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 255 * staticOpacity; // A
    }

    ctx.putImageData(imageData, 0, 0);
  }, [staticOpacity]);

  // Random flicker effect
  useEffect(() => {
    if (!flickerEnabled) return;

    const triggerFlicker = () => {
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 100);

      // Schedule next flicker (random 3-8 seconds)
      const nextFlicker = 3000 + Math.random() * 5000;
      setTimeout(triggerFlicker, nextFlicker);
    };

    const initialDelay = 3000 + Math.random() * 5000;
    const timeout = setTimeout(triggerFlicker, initialDelay);

    return () => clearTimeout(timeout);
  }, [flickerEnabled]);

  return (
    <div 
      className={`crt-overlay ${isFlickering ? 'flickering' : ''}`}
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

      {/* Chromatic Aberration (applied via CSS) */}
      <div className="crt-chromatic" />
    </div>
  );
}
