/**
 * PerformanceMonitor Component
 * 
 * Displays real-time performance metrics for investigation tools
 * including FPS, frame time, and memory usage.
 */

import React, { useState, useEffect } from 'react';
import { PerformanceMonitor as PerfMonitor } from '../../utils/animationUtils';

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function PerformanceMonitor({
  enabled = false,
  position = 'top-right',
}: PerformanceMonitorProps): React.ReactNode {
  const [fps, setFps] = useState(0);
  const [frameTime, setFrameTime] = useState(0);
  const [minFps, setMinFps] = useState(0);
  const [maxFps, setMaxFps] = useState(0);
  const [memory, setMemory] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const monitor = new PerfMonitor(60);
    let animationId: number;

    const updateMetrics = () => {
      monitor.recordFrame();
      
      setFps(Math.round(monitor.getAverageFPS()));
      setFrameTime(Math.round(monitor.getAverageFrameTime() * 10) / 10);
      setMinFps(Math.round(monitor.getMinFPS()));
      setMaxFps(Math.round(monitor.getMaxFPS()));

      // Get memory usage if available (Chrome only)
      if ('memory' in performance) {
        const mem = (performance as any).memory;
        setMemory(Math.round(mem.usedJSHeapSize / 1048576)); // Convert to MB
      }

      animationId = requestAnimationFrame(updateMetrics);
    };

    animationId = requestAnimationFrame(updateMetrics);

    return () => {
      cancelAnimationFrame(animationId);
      monitor.reset();
    };
  }, [enabled]);

  if (!enabled) return null;

  const positionStyles = {
    'top-left': { top: '80px', left: '12px' },
    'top-right': { top: '80px', right: '12px' },
    'bottom-left': { bottom: '12px', left: '12px' },
    'bottom-right': { bottom: '12px', right: '12px' },
  };

  const getPerformanceColor = (fps: number) => {
    if (fps >= 55) return '#00ff00'; // Green - Good
    if (fps >= 45) return '#ffff00'; // Yellow - OK
    if (fps >= 30) return '#ff8800'; // Orange - Poor
    return '#ff0000'; // Red - Bad
  };

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        border: '1px solid rgba(0, 255, 0, 0.3)',
        borderRadius: '6px',
        padding: '10px 12px',
        fontFamily: '"Courier New", monospace',
        fontSize: '11px',
        color: '#00ff00',
        minWidth: '140px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)',
        pointerEvents: 'none',
      }}
    >
      <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '12px' }}>
        PERFORMANCE
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>FPS:</span>
        <span style={{ color: getPerformanceColor(fps), fontWeight: 'bold' }}>
          {fps}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>Frame:</span>
        <span>{frameTime}ms</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>Min/Max:</span>
        <span>{minFps}/{maxFps}</span>
      </div>
      
      {memory !== null && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(0, 255, 0, 0.2)' }}>
          <span>Memory:</span>
          <span>{memory}MB</span>
        </div>
      )}
      
      <div style={{ 
        marginTop: '8px', 
        paddingTop: '6px', 
        borderTop: '1px solid rgba(0, 255, 0, 0.2)',
        fontSize: '9px',
        opacity: 0.7,
        textAlign: 'center'
      }}>
        Target: 60 FPS
      </div>
    </div>
  );
}
