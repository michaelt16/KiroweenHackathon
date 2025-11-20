// Photos Tab - Display captured photos and their results
import { useInvestigation } from '../../../context/InvestigationContext';

export function PhotosTab() {
  const { photos } = useInvestigation();

  // Sort photos by timestamp (newest first)
  const sortedPhotos = [...photos].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div
      style={{
        padding: '16px',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          color: '#00ffff',
          fontFamily: 'monospace',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        📷 Photo Evidence
      </h3>

      {photos.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '32px 16px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          No photos taken yet.<br />
          Switch to Camera tool to capture evidence.
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {sortedPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: `1px solid ${
                  photo.status === 'developing'
                    ? 'rgba(255, 255, 0, 0.3)'
                    : photo.quality === 'strong'
                    ? 'rgba(0, 255, 0, 0.5)'
                    : photo.quality === 'faint'
                    ? 'rgba(0, 255, 255, 0.3)'
                    : 'rgba(100, 100, 100, 0.3)'
                }`,
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              {/* Photo header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {new Date(photo.timestamp).toLocaleTimeString()}
                </span>
                {photo.status === 'developing' ? (
                  <span
                    style={{
                      color: '#ffff00',
                      animation: 'pulse 1s ease-in-out infinite',
                    }}
                  >
                    ⏳ Developing...
                  </span>
                ) : (
                  <span
                    style={{
                      color:
                        photo.quality === 'strong'
                          ? '#00ff00'
                          : photo.quality === 'faint'
                          ? '#00ffff'
                          : '#888888',
                      fontWeight: 'bold',
                    }}
                  >
                    {photo.quality === 'strong'
                      ? '✓ STRONG MANIFESTATION'
                      : photo.quality === 'faint'
                      ? '~ Faint Silhouette'
                      : '✗ Nothing Captured'}
                  </span>
                )}
              </div>

              {/* Photo result details */}
              {photo.status === 'ready' && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '4px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '11px',
                  }}
                >
                  {photo.quality === 'strong' && (
                    <>
                      <div>📸 Clear paranormal figure visible</div>
                      <div style={{ marginTop: '4px', opacity: 0.7 }}>
                        Strong evidence of manifestation
                      </div>
                    </>
                  )}
                  {photo.quality === 'faint' && (
                    <>
                      <div>👻 Faint anomaly detected</div>
                      <div style={{ marginTop: '4px', opacity: 0.7 }}>
                        Possible paranormal presence
                      </div>
                    </>
                  )}
                  {photo.quality === 'none' && (
                    <>
                      <div>📷 No anomalies detected</div>
                      <div style={{ marginTop: '4px', opacity: 0.7 }}>
                        Try getting closer to the entity
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}
