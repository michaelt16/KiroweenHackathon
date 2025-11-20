// EMF Meter overlay
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export function EMFMeter() {
  const { toolsEnabled, ghostPosition } = useInvestigation();
  const [emfLevel, setEmfLevel] = useState(0);

  useEffect(() => {
    if (!toolsEnabled.emf) {
      setEmfLevel(0);
      return;
    }

    const interval = setInterval(() => {
      // EMF increases when ghost is closer
      const baseLevel = (1 - ghostPosition.distance) * 100;
      const noise = Math.random() * 20 - 10;
      setEmfLevel(Math.max(0, Math.min(100, baseLevel + noise)));
    }, 500);

    return () => clearInterval(interval);
  }, [toolsEnabled.emf, ghostPosition.distance]);

  if (!toolsEnabled.emf) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        left: '20px',
        zIndex: 900,
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        border: '2px solid #10b981',
        minWidth: '150px',
      }}
    >
      <div style={{ fontSize: '12px', color: '#10b981', marginBottom: '8px' }}>
        EMF METER
      </div>
      <div
        style={{
          height: '8px',
          background: 'rgba(16, 185, 129, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${emfLevel}%`,
            background: '#10b981',
            transition: 'width 0.3s',
            boxShadow: '0 0 10px #10b981',
          }}
        />
      </div>
      <div style={{ fontSize: '10px', color: '#10b981', marginTop: '4px' }}>
        {emfLevel.toFixed(0)}%
      </div>
    </div>
  );
}
