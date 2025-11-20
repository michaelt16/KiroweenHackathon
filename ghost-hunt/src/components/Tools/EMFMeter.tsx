// EMF Meter - Electromagnetic Field Detector
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export function EMFMeter() {
  const { ghostPosition, ghostType } = useInvestigation();
  const [emfLevel, setEmfLevel] = useState(0);
  const [peakLevel, setPeakLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // EMF multiplier based on ghost type
      const emfMultipliers: Record<string, number> = {
        Wraith: 2.5,      // Very high EMF (key trait)
        Shade: 0.3,       // Very low EMF
        Poltergeist: 0.8, // Low-medium EMF
      };
      
      const multiplier = emfMultipliers[ghostType] || 1;
      
      // EMF increases when ghost is closer, modified by ghost type
      const baseLevel = (1 - ghostPosition.distance) * 100 * multiplier;
      const noise = Math.random() * 15 - 7.5;
      const newLevel = Math.max(0, Math.min(100, baseLevel + noise));
      setEmfLevel(newLevel);
      
      // Track peak
      if (newLevel > peakLevel) {
        setPeakLevel(newLevel);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [ghostPosition.distance, ghostType, peakLevel]);

  // Get EMF level category
  const getLevel = () => {
    if (emfLevel < 20) return 1;
    if (emfLevel < 40) return 2;
    if (emfLevel < 60) return 3;
    if (emfLevel < 80) return 4;
    return 5;
  };

  const level = getLevel();
  const isHighActivity = level >= 4;

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

        {/* Digital Display */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: isHighActivity ? '#ef4444' : '#10b981',
              fontWeight: 'bold',
              textShadow: `0 0 20px ${isHighActivity ? '#ef4444' : '#10b981'}`,
              animation: isHighActivity ? 'pulse 0.5s ease-in-out infinite' : 'none',
            }}
          >
            {emfLevel.toFixed(1)}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(16, 185, 129, 0.7)',
              marginTop: '4px',
            }}
          >
            mG (milligauss)
          </div>
        </div>

        {/* Level Bars */}
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
                  level >= barLevel
                    ? barLevel >= 4
                      ? '#ef4444'
                      : barLevel >= 3
                      ? '#f59e0b'
                      : '#10b981'
                    : 'rgba(100, 100, 100, 0.3)',
                borderRadius: '4px',
                transition: 'all 0.2s',
                boxShadow:
                  level >= barLevel
                    ? `0 0 10px ${barLevel >= 4 ? '#ef4444' : barLevel >= 3 ? '#f59e0b' : '#10b981'}`
                    : 'none',
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: isHighActivity ? '#ef4444' : '#10b981',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
          {level === 1 && 'NORMAL'}
          {level === 2 && 'SLIGHT ACTIVITY'}
          {level === 3 && 'MODERATE ACTIVITY'}
          {level === 4 && '⚠️ HIGH ACTIVITY'}
          {level === 5 && '🚨 EXTREME ACTIVITY'}
        </div>

        {/* Peak Reading */}
        <div
          style={{
            marginTop: '16px',
            padding: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'rgba(16, 185, 129, 0.7)',
            fontFamily: 'monospace',
          }}
        >
          <span>PEAK:</span>
          <span>{peakLevel.toFixed(1)} mG</span>
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
