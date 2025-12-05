// Loading overlay for investigation initialization
import React, { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message: string;
  progress?: number; // 0-100
}

export function LoadingOverlay({ isLoading, message, progress }: LoadingOverlayProps): React.ReactNode {
  const [dots, setDots] = useState('');

  // Animate dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(11, 15, 26, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(139, 92, 246, 0.2)',
          borderTop: '4px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '24px',
        }}
      />

      {/* Message */}
      <div
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#a78bfa',
          marginBottom: '8px',
          minHeight: '27px',
        }}
      >
        {message}{dots}
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div
          style={{
            width: '200px',
            height: '4px',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#8b5cf6',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}

      {/* Hint */}
      <div
        style={{
          marginTop: '24px',
          fontSize: '12px',
          color: '#64748b',
          fontStyle: 'italic',
        }}
      >
        Preparing investigation...
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
