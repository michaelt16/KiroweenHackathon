// Investigation Result Overlay - Shows success/failure after deduction
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { useSupplies } from '../../context/SuppliesContext';
import { useInvestigationStore } from '../../stores/investigationStore';
import { useGhostStore } from '../../stores/ghostStore';

export function InvestigationResultOverlay() {
  const navigate = useNavigate();
  const { mode, ghostType, sanity, suppliesForRun, resetInvestigation } = useInvestigation();
  const { supplies, consumeFilm } = useSupplies();
  const investigationRewards = useInvestigationStore((state) => state.investigationRewards);
  const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
  const getAllGhosts = useGhostStore((state) => state.getAllGhosts);
  const hasConsumedSupplies = useRef(false);

  const isSuccess = mode === 'success';
  const isSanityFailure = mode === 'failure' && sanity === 0;
  
  // Get the actual ghost name for display
  const actualGhostName = activeGhostType 
    ? getAllGhosts().find(g => g.id === activeGhostType)?.name || 'Unknown'
    : 'Unknown';

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

  const endInvestigation = useInvestigationStore((state) => state.endInvestigation);
  const [isReturning, setIsReturning] = useState(false);
  
  const handleReturnToMap = () => {
    // Show loading state immediately
    setIsReturning(true);
    
    // Create a persistent loading overlay on document body
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'navigation-loading';
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
    `;
    
    loadingOverlay.innerHTML = `
      <div style="
        font-size: 48px;
        margin-bottom: 16px;
        animation: spin 1s linear infinite;
      ">⏳</div>
      <div style="
        color: #2dd4bf;
        font-family: monospace;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
      ">Returning to Map...</div>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Reset and navigate
    resetInvestigation();
    endInvestigation();
    navigate('/');
    
    // Remove loading overlay after map loads (or timeout)
    setTimeout(() => {
      const overlay = document.getElementById('navigation-loading');
      if (overlay) {
        overlay.remove();
      }
    }, 3000); // 3 second timeout
  };

  // Only show overlay if we have a result (success or failure mode)
  if (mode !== 'success' && mode !== 'failure') {
    return null;
  }

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
              You correctly identified the <strong style={{ color: '#00ffff' }}>{actualGhostName}</strong>!
            </>
          ) : isSanityFailure ? (
            <>
              You lost your nerve and had to abandon the investigation.
            </>
          ) : (
            <>
              That wasn't quite right. The entity was a <strong style={{ color: '#00ffff' }}>{actualGhostName}</strong>.
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
            ? '📎 Pengu is handling the banishment ritual.'
            : isSanityFailure
            ? '📎 Pengu pulled you out before things got worse.'
            : '📎 Pengu managed to contain it. Better luck next time!'}
        </p>
      </div>

      {/* Rewards Section */}
      {investigationRewards && (
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            marginBottom: '32px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textAlign: 'center',
            }}
          >
            Rewards
          </h3>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Money */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  lineHeight: '1',
                }}
              >
                💰
              </div>
              <div
                style={{
                  color: '#10b981',
                  fontFamily: 'monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                ${investigationRewards.money.toLocaleString()}
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                }}
              >
                Money
              </div>
            </div>

            {/* XP */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  lineHeight: '1',
                }}
              >
                ⭐
              </div>
              <div
                style={{
                  color: '#3b82f6',
                  fontFamily: 'monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {investigationRewards.xp.toLocaleString()}
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                }}
              >
                XP
              </div>
            </div>
          </div>
          
          {/* Note about rewards (for future implementation) */}
          <p
            style={{
              margin: '16px 0 0 0',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'monospace',
              fontSize: '10px',
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            Rewards will be applied to your account
          </p>
        </div>
      )}

      {/* Return button */}
      <button
        onClick={handleReturnToMap}
        disabled={isReturning}
        style={{
          padding: '16px 48px',
          backgroundColor: isReturning ? '#666' : '#2dd4bf',
          color: '#0b0f1a',
          border: 'none',
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isReturning ? 'wait' : 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.2s',
          boxShadow: isReturning ? 'none' : '0 4px 12px rgba(45, 212, 191, 0.3)',
          opacity: isReturning ? 0.7 : 1,
        }}
        onMouseDown={(e) => {
          if (!isReturning) e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          if (!isReturning) e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseLeave={(e) => {
          if (!isReturning) e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isReturning ? '⏳ Loading...' : '🗺️ Return to Map'}
      </button>
      
      {/* Full-screen loading overlay when returning */}
      {isReturning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 4000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            animation: 'spin 1s linear infinite',
          }}>
            ⏳
          </div>
          <div style={{
            color: '#2dd4bf',
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            Returning to Map...
          </div>
        </div>
      )}

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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
