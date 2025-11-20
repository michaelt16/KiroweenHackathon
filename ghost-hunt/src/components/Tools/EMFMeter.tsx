// EMF Meter - Electromagnetic Field Detector (Distance-Only via Beeping)
import { useEffect, useState, useRef } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

// Beep interval calculation based on distance
// Closer = faster beeps
function calculateBeepInterval(distanceMeters: number, ghostType: string): number {
  // Ghost type multipliers for beep frequency
  const multipliers: Record<string, number> = {
    Wraith: 1.5,      // Faster beeps (high EMF)
    Shade: 0.5,       // Slower beeps (low EMF)
    Poltergeist: 0.8, // Medium beeps
  };
  
  const multiplier = multipliers[ghostType] || 1;
  
  // Base interval: 50m = 3000ms, 0m = 200ms
  const baseInterval = Math.max(200, Math.min(3000, 200 + (distanceMeters * 56)));
  
  // Apply ghost type multiplier (lower = faster)
  return baseInterval / multiplier;
}

// Get proximity level from distance
function getProximityLevel(distanceMeters: number): { level: number; label: string; color: string } {
  if (distanceMeters > 30) return { level: 1, label: 'FAR', color: '#10b981' };
  if (distanceMeters > 20) return { level: 2, label: 'MEDIUM', color: '#10b981' };
  if (distanceMeters > 10) return { level: 3, label: 'CLOSE', color: '#f59e0b' };
  if (distanceMeters > 5) return { level: 4, label: 'VERY CLOSE', color: '#ef4444' };
  return { level: 5, label: 'EXTREMELY CLOSE', color: '#ef4444' };
}

export function EMFMeter() {
  const { ghostDistance, ghostType } = useInvestigation();
  const [isBeeping, setIsBeeping] = useState(false);
  const [bpm, setBpm] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const beepIntervalRef = useRef<number | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Beep function using Web Audio API
  const playBeep = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800; // 800Hz sine wave
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);

    // Visual feedback
    setIsBeeping(true);
    setTimeout(() => setIsBeeping(false), 100);

    // Optional vibration
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Beeping loop based on distance
  useEffect(() => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
    }

    const interval = calculateBeepInterval(ghostDistance, ghostType);
    const beatsPerMinute = Math.round(60000 / interval);
    setBpm(beatsPerMinute);

    // Start beeping
    playBeep(); // Initial beep
    beepIntervalRef.current = window.setInterval(() => {
      playBeep();
    }, interval);

    return () => {
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
      }
    };
  }, [ghostDistance, ghostType]);

  const proximity = getProximityLevel(ghostDistance);
  const isHighActivity = proximity.level >= 4;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      {/* Device Frame */}
      <div
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '32px 24px',
          backgroundColor: 'rgba(20, 30, 40, 0.95)',
          border: '3px solid rgba(16, 185, 129, 0.5)',
          borderRadius: '16px',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontFamily: 'monospace',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(16, 185, 129, 0.7)',
              letterSpacing: '2px',
              marginBottom: '4px',
            }}
          >
            ELECTROMAGNETIC FIELD
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#10b981',
              fontWeight: 'bold',
              letterSpacing: '3px',
            }}
          >
            EMF DETECTOR
          </div>
        </div>

        {/* Beep Frequency Display */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: `3px solid ${isBeeping ? proximity.color : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
            fontFamily: 'monospace',
            transition: 'border-color 0.1s',
            boxShadow: isBeeping ? `0 0 20px ${proximity.color}` : 'none',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: proximity.color,
              fontWeight: 'bold',
              textShadow: `0 0 20px ${proximity.color}`,
              animation: isBeeping ? 'pulse 0.1s ease-in-out' : 'none',
            }}
          >
            {bpm}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(16, 185, 129, 0.7)',
              marginTop: '4px',
            }}
          >
            BPM (beeps per minute)
          </div>
        </div>

        {/* Proximity Bars (5-bar indicator) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            justifyContent: 'center',
          }}
        >
          {[1, 2, 3, 4, 5].map((barLevel) => (
            <div
              key={barLevel}
              style={{
                flex: 1,
                height: `${20 + barLevel * 8}px`,
                backgroundColor:
                  proximity.level >= barLevel
                    ? barLevel >= 4
                      ? '#ef4444'
                      : barLevel >= 3
                      ? '#f59e0b'
                      : '#10b981'
                    : 'rgba(100, 100, 100, 0.3)',
                borderRadius: '4px',
                transition: 'all 0.2s',
                boxShadow:
                  proximity.level >= barLevel
                    ? `0 0 10px ${barLevel >= 4 ? '#ef4444' : barLevel >= 3 ? '#f59e0b' : '#10b981'}`
                    : 'none',
              }}
            />
          ))}
        </div>

        {/* Proximity Status */}
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '16px',
            color: proximity.color,
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginBottom: '12px',
          }}
        >
          {proximity.label}
        </div>

        {/* Hint Text */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '11px',
            color: 'rgba(148, 163, 184, 0.7)',
            fontStyle: 'italic',
          }}
        >
          {isHighActivity ? '🚨 Walk toward the beeping!' : '📡 Listen for faster beeps'}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
}
