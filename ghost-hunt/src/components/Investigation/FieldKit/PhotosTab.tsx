// Photos Tab - Fresh Polaroids on Dark Surface (Production)
import React from 'react';
import { useInvestigationStore } from '../../../stores/investigationStore';

export function PhotosTab() {
  // ✅ Use investigation store instead of context
  const photos = useInvestigationStore((state) => state.photos);

  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };
  
  // Format manifestation text for display
  const formatManifestation = (manifestation: string | null | undefined): string => {
    if (!manifestation) return 'Nothing captured';
    
    // Convert snake_case to Title Case
    return manifestation
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
      `}</style>
      <div style={{
        width: '100%',
        height: '100%',
        background: '#1a1612',
        padding: '20px',
        overflow: 'auto',
      }}>
      {/* Title - Handwritten on tape */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        position: 'relative',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '8px 24px',
          transform: 'rotate(-1deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          fontFamily: '"Caveat", cursive',
          fontSize: '18px',
          color: '#1a0f0a',
        }}>
          Evidence Photos - Just Taken
        </div>
      </div>
      
      {/* Polaroids scattered on dark surface */}
      {photos.length > 0 ? (
        <>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {photos.map((photo, i) => (
              <div key={photo.id} style={{ 
                position: 'relative',
                transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
              }}>
                {/* Empty Polaroid - no image, just frame */}
                <div style={{
                  background: '#f5f5f0',
                  width: '280px',
                  height: '320px',
                  padding: '12px',
                  paddingBottom: '60px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(0,0,0,0.1)',
                  borderRadius: '2px',
                  position: 'relative',
                }}>
                  {/* Empty photo area */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: photo.status === 'developing' ? '#1a1a1a' : '#e8e8e0',
                    border: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    {/* Developing overlay - shown for 7 seconds */}
                    {photo.status === 'developing' ? (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        fontFamily: '"Courier New", monospace',
                        fontSize: '16px',
                        color: '#ffff00',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px #ffff00',
                        animation: 'blink 1s infinite',
                      }}>
                        DEVELOPING...
                      </div>
                    ) : (
                      <>
                        {/* Manifestation text overlay - only shown when ready */}
                        {photo.manifestation ? (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            fontFamily: '"Courier New", monospace',
                            fontSize: '14px',
                            color: '#333',
                            fontWeight: 'bold',
                            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                            padding: '8px',
                            background: 'rgba(255,255,255,0.6)',
                            borderRadius: '4px',
                          }}>
                            {formatManifestation(photo.manifestation)}
                          </div>
                        ) : (
                          <div style={{
                            fontFamily: '"Courier New", monospace',
                            fontSize: '12px',
                            color: '#999',
                            fontStyle: 'italic',
                          }}>
                            Nothing captured
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Distance info - always visible */}
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      fontFamily: '"Courier New", monospace',
                      fontSize: '10px',
                      color: photo.status === 'developing' ? '#666' : '#666',
                    }}>
                      {photo.distance.toFixed(1)}m
                    </div>
                  </div>
                  
                  {/* Timestamp caption */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '11px',
                    color: '#333',
                    textAlign: 'center',
                  }}>
                    {formatTimestamp(photo.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Photo count - handwritten on tape */}
          <div style={{
            textAlign: 'center',
            marginTop: '40px',
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '6px 20px',
              transform: 'rotate(1.5deg)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              fontFamily: '"Caveat", cursive',
              fontSize: '14px',
              color: '#1a0f0a',
            }}>
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'} captured
            </div>
          </div>
        </>
      ) : (
        /* Empty state */
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.75)',
            padding: '12px 32px',
            transform: 'rotate(-1deg)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            fontFamily: '"Caveat", cursive',
            fontSize: '16px',
            color: '#1a0f0a',
            lineHeight: '1.8',
          }}>
            No photos yet<br />
            Use the camera tool to capture evidence
          </div>
        </div>
      )}
      </div>
    </>
  );
}
