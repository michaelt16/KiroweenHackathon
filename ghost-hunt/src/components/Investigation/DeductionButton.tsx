// Deduction button - appears when player has enough evidence
import { useInvestigation } from '../../context/InvestigationContext';

const MIN_EVENTS_FOR_DEDUCTION = 5;

export function DeductionButton() {
  const { events, setMode } = useInvestigation();

  const hasEnoughEvidence = events.length >= MIN_EVENTS_FOR_DEDUCTION;

  const handleDeduce = () => {
    console.log('🔍 Starting deduction phase');
    setMode('deducing');
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <button
        onClick={handleDeduce}
        style={{
          padding: '16px 32px',
          backgroundColor: hasEnoughEvidence ? '#10b981' : '#6b7280',
          color: 'white',
          border: hasEnoughEvidence ? '2px solid #34d399' : '2px solid #9ca3af',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: hasEnoughEvidence ? 'pointer' : 'not-allowed',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: hasEnoughEvidence
            ? '0 0 20px rgba(16, 185, 129, 0.5)'
            : 'none',
          transition: 'all 0.3s',
          opacity: hasEnoughEvidence ? 1 : 0.6,
        }}
        disabled={!hasEnoughEvidence}
      >
        🔍 Identify the Ghost
        {!hasEnoughEvidence && (
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
            ({events.length}/{MIN_EVENTS_FOR_DEDUCTION} clues)
          </div>
        )}
      </button>
    </div>
  );
}
