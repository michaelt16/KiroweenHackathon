// Investigation Result Overlay - Shows success/failure after deduction
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { useSupplies } from '../../context/SuppliesContext';

export function InvestigationResultOverlay() {
  const navigate = useNavigate();
  const { mode, ghostType, sanity, suppliesForRun, resetInvestigation } = useInvestigation();
  const { supplies, consumeFilm } = useSupplies();
  const hasConsumedSupplies = useRef(false);

  const isSuccess = mode === 'success';
  const isSanityFailure = mode === 'failure' && sanity === 0;

  // Consume film from global supplies when investigation ends
  useEffect(() => {
    if (!hasConsumedSupplies.current) {
      const filmUsed = supplies.film - suppliesForRun.film;
      console.log(`📸 Investigation ended. Film used: ${filmUsed}`);
      
      // Consume the used film from global supplies
      for (let i = 0; i < filmUsed; i++) {
        consumeFilm();
      }
      
      hasConsumedSupplies.current = true;
    }
  }, [supplies.film, suppliesForRun.film, consumeFilm]);

  const handleReturnToMap = () => {
    resetInvestigation();
    navigate('/');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      {/* Result icon */}
      <div
        style={{
          fontSize: '80px',
          marginBottom: '24px',
          animation: 'scaleIn 0.5s ease-out',
        }}
      >
        {isSuccess ? '✅' : isSanityFailure ? '😰' : '❌'}
      </div>

      {/* Result title */}
      <h2
        style={{
          margin: '0 0 16px 0',
          color: isSuccess ? '#10b981' : '#ef4444',
          fontFamily: 'monospace',
          fontSize: '28px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textAlign: 'center',
        }}
      >
        {isSuccess ? 'Correct!' : isSanityFailure ? 'Lost Your Nerve' : 'Incorrect'}
      </h2>

      {/* Result message */}
      <div
        style={{
          maxWidth: '400px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <p
          style={{
            margin: '0 0 12px 0',
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        >
          {isSuccess ? (
            <>
              You correctly identified the <strong style={{ color: '#00ffff' }}>{ghostType}</strong>!
            </>
          ) : isSanityFailure ? (
            <>
              You lost your nerve and had to abandon the investigation.
            </>
          ) : (
            <>
              That wasn't quite right. The entity was a <strong style={{ color: '#00ffff' }}>{ghostType}</strong>.
            </>
          )}
        </p>

        <p
          style={{
            margin: 0,
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'monospace',
            fontSize: '14px',
            fontStyle: 'italic',
          }}
        >
          {isSuccess
            ? '📎 Clippy is handling the banishment ritual.'
            : isSanityFailure
            ? '📎 Clippy pulled you out before things got worse.'
            : '📎 Clippy managed to contain it. Better luck next time!'}
        </p>
      </div>

      {/* Return button */}
      <button
        onClick={handleReturnToMap}
        style={{
          padding: '16px 48px',
          backgroundColor: '#2dd4bf',
          color: '#0b0f1a',
          border: 'none',
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(45, 212, 191, 0.3)',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        🗺️ Return to Map
      </button>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
