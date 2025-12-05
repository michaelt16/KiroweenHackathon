// Deduction UI - player selects which ghost they think it is
import { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import type { GhostType } from '../../types/investigation';

const GHOST_INFO: Record<GhostType, { traits: string[] }> = {
  Wraith: {
    traits: [
      '⚡ Strong EMF activity',
      '🏃 Fast movement patterns',
      '❄️ Rarely shows cold spots',
    ],
  },
  Shade: {
    traits: [
      '👻 Frequent whispers',
      '❄️ Heavy cold spot presence',
      '🐌 Slow, passive movement',
    ],
  },
  Poltergeist: {
    traits: [
      '📡 Motion spike heavy',
      '⚡ Static distortions common',
      '📷 Camera distortion frequent',
    ],
  },
};

export function DeductionUI() {
  const { ghostType, setMode } = useInvestigation();
  const [selectedGhost, setSelectedGhost] = useState<GhostType | null>(null);
  const [showResult, setShowResult] = useState(false);

  const allGhosts: GhostType[] = ['Wraith', 'Shade', 'Poltergeist', 'Banshee', 'Phantom', 'Onyx', 'Trickster'];

  const handleConfirm = () => {
    if (!selectedGhost) return;
    
    console.log('🎯 Player guessed:', selectedGhost, 'Actual:', ghostType);
    setShowResult(true);
    
    // After showing result, move to ritual/complete
    setTimeout(() => {
      setMode('complete');
    }, 3000);
  };

  const isCorrect = selectedGhost === ghostType;

  if (showResult) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 'clamp(48px, 15vw, 64px)', marginBottom: '20px' }}>
          {isCorrect ? '✅' : '❌'}
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 8vw, 36px)', marginBottom: '20px' }}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </h1>
        <p style={{ fontSize: 'clamp(18px, 5vw, 24px)', marginBottom: '10px' }}>
          The ghost was: <strong>{ghostType}</strong>
        </p>
        {isCorrect && (
          <p style={{ fontSize: 'clamp(14px, 4vw, 18px)', opacity: 0.8 }}>
            Pengu is performing the banishment ritual...
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
        color: 'white',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(20px, 5vw, 32px)',
          marginTop: '20px',
          marginBottom: '24px',
          textAlign: 'center',
          lineHeight: '1.2',
        }}
      >
        Which ghost is haunting this location?
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
        }}
      >
        {allGhosts.map((ghost) => (
          <div
            key={ghost}
            onClick={() => setSelectedGhost(ghost)}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: selectedGhost === ghost ? '#1e40af' : '#1f2937',
              border: selectedGhost === ghost ? '3px solid #3b82f6' : '2px solid #374151',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: selectedGhost === ghost
                ? '0 0 30px rgba(59, 130, 246, 0.5)'
                : 'none',
            }}
          >
            <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '12px' }}>
              👻
            </div>
            <h2 style={{ fontSize: '22px', textAlign: 'center', marginBottom: '12px' }}>
              {ghost}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '1.6' }}>
              {GHOST_INFO[ghost].traits.map((trait, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedGhost}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '16px 32px',
          backgroundColor: selectedGhost ? '#10b981' : '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: selectedGhost ? 'pointer' : 'not-allowed',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          opacity: selectedGhost ? 1 : 0.5,
          marginBottom: '20px',
        }}
      >
        Confirm Selection
      </button>
    </div>
  );
}
