import React, { useState } from 'react';
import { playPaperClick } from '../../../utils/soundEffects';

interface Photo {
  id: string;
  url: string;
  timestamp: string;
  rotation: number;
}

interface PhotosTabProps {
  photos?: Photo[];
}

const PhotosTab: React.FC<PhotosTabProps> = ({ photos = [] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    playPaperClick();
    setSelectedPhoto(photo);
  };

  const handleCloseFullscreen = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1a0f0a',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '8px',
            borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
            paddingBottom: '8px',
          }}
        >
          📸 EVIDENCE PHOTOS
        </div>

        {/* Photos grid */}
        {photos.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '16px',
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  transform: `rotate(${photo.rotation}deg)`,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `rotate(${photo.rotation}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${photo.rotation}deg) scale(1)`;
                }}
              >
                {/* Polaroid frame */}
                <div
                  style={{
                    background: '#e8e4dc',
                    padding: '12px 12px 40px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                    position: 'relative',
                  }}
                >
                  {/* Tape at top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${Math.random() * 6 - 3}deg)`,
                      width: '40px',
                      height: '12px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  />

                  {/* Photo */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: '#1a1a1a',
                      backgroundImage: `url(${photo.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Static overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay',
                        opacity: 0.5,
                      }}
                    />
                  </div>

                  {/* Timestamp */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: '"Caveat", cursive',
                      fontSize: '11px',
                      color: '#4a3a2a',
                      textAlign: 'center',
                    }}
                  >
                    {photo.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              fontFamily: '"Caveat", cursive',
              fontSize: '16px',
              color: '#4a3a2a',
              lineHeight: '1.8',
            }}
          >
            No photos captured
            <br />
            <span style={{ fontSize: '14px', opacity: 0.7 }}>
              Use the camera tool to take evidence photos
            </span>
          </div>
        )}
      </div>

      {/* Fullscreen photo view */}
      {selectedPhoto && (
        <div
          onClick={handleCloseFullscreen}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          <div
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              background: '#e8e4dc',
              padding: '20px 20px 60px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={selectedPhoto.url}
              alt="Evidence photo"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                display: 'block',
              }}
            />
            <div
              style={{
                marginTop: '16px',
                fontFamily: '"Caveat", cursive',
                fontSize: '14px',
                color: '#4a3a2a',
                textAlign: 'center',
              }}
            >
              {selectedPhoto.timestamp}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotosTab;
