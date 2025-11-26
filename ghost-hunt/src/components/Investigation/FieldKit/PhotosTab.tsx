// Photos Tab - Fresh Polaroids on Dark Surface (Production)
import React from 'react';
import { useInvestigation } from '../../../context/InvestigationContext';
import { PolaroidPhoto } from '../../analog/elements/PolaroidPhoto';
import ghost1Image from '../../../assets/images/ghost1.png';

export function PhotosTab() {
  const { photos } = useInvestigation();

  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
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
                <PolaroidPhoto
                  src={ghost1Image}
                  caption={formatTimestamp(photo.timestamp)}
                  damage="light"
                  seed={photo.id}
                />
                {/* Show developing status */}
                {photo.status === 'developing' && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}>
                    Developing...
                  </div>
                )}
                {/* Show photo quality when ready */}
                {photo.status === 'ready' && photo.quality !== 'none' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: photo.quality === 'strong' ? 'rgba(255,0,0,0.8)' : 'rgba(255,165,0,0.8)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}>
                    {photo.quality === 'strong' ? '👻 STRONG' : '~ Faint'}
                  </div>
                )}
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
  );
}
