// Camera tool - Film Camera with vintage aesthetic
import { useState, useEffect } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import './Camera.css';

export function Camera() {
  const { suppliesForRun, photos, takePhoto } = useInvestigation();
  const [isFlashing, setIsFlashing] = useState(false);
  const [showNoFilmWarning, setShowNoFilmWarning] = useState(false);
  const [showDevelopingWarning, setShowDevelopingWarning] = useState(false);
  const [shutterPressed, setShutterPressed] = useState(false);

  // Check if there's a photo currently developing
  const hasPhotosDeveloping = photos.some((photo) => photo.status === 'developing');

  const handleShutterClick = () => {
    // Check if a photo is still developing
    if (hasPhotosDeveloping) {
      setShowDevelopingWarning(true);
      setTimeout(() => setShowDevelopingWarning(false), 2000);
      return;
    }

    const success = takePhoto();
    
    if (success) {
      // Shutter press animation
      setShutterPressed(true);
      setTimeout(() => setShutterPressed(false), 100);
      
      // Flash effect
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);
    } else {
      // Show "no film" warning
      setShowNoFilmWarning(true);
      setTimeout(() => setShowNoFilmWarning(false), 2000);
    }
  };

  return (
    <div className="camera-container">
      {/* Film Camera Viewfinder Frame */}
      <div className="camera-viewfinder">
        {/* Viewfinder corners */}
        <div className="viewfinder-corner viewfinder-tl" />
        <div className="viewfinder-corner viewfinder-tr" />
        <div className="viewfinder-corner viewfinder-bl" />
        <div className="viewfinder-corner viewfinder-br" />
        
        {/* Center crosshair */}
        <div className="viewfinder-crosshair">
          <div className="crosshair-line crosshair-h" />
          <div className="crosshair-line crosshair-v" />
          <div className="crosshair-dot" />
        </div>

        {/* Focus indicator */}
        <div className="focus-indicator">
          <div className="focus-ring" />
        </div>
      </div>

      {/* Film Camera Body - Bottom Panel */}
      <div className="camera-body">
        {/* Film Counter Display */}
        <div className="film-counter">
          <div className="film-counter-label">FILM</div>
          <div className={`film-counter-value ${suppliesForRun.film === 0 ? 'empty' : ''}`}>
            {suppliesForRun.film > 0 ? suppliesForRun.film : '00'}
          </div>
          <div className="film-counter-icon">🎞️</div>
        </div>

        {/* Camera Info Display */}
        <div className="camera-info">
          <div className="camera-info-item">
            <span className="info-label">F/</span>
            <span className="info-value">2.8</span>
          </div>
          <div className="camera-info-item">
            <span className="info-label">ISO</span>
            <span className="info-value">400</span>
          </div>
          <div className="camera-info-item">
            <span className="info-label">1/60</span>
          </div>
        </div>
      </div>

      {/* Shutter Button - Big Film Camera Style */}
      <button
        onClick={handleShutterClick}
        disabled={suppliesForRun.film === 0 || hasPhotosDeveloping}
        className={`camera-shutter ${shutterPressed ? 'pressed' : ''} ${hasPhotosDeveloping ? 'developing' : ''} ${suppliesForRun.film === 0 ? 'no-film' : ''}`}
        title={hasPhotosDeveloping ? 'Photo developing...' : suppliesForRun.film === 0 ? 'No film' : 'Take photo'}
      >
        <div className="shutter-button-inner">
          {hasPhotosDeveloping ? (
            <div className="developing-indicator">
              <div className="developing-spinner" />
              <span>DEVELOPING</span>
            </div>
          ) : (
            <div className="shutter-icon">📸</div>
          )}
        </div>
      </button>

      {/* Flash Effect */}
      {isFlashing && (
        <div className="camera-flash">
          <div className="flash-overlay" />
        </div>
      )}

      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* No Film Warning */}
      {showNoFilmWarning && (
        <div className="camera-warning no-film-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-text">
            <div className="warning-title">NO FILM</div>
            <div className="warning-subtitle">Collect film supplies</div>
          </div>
        </div>
      )}

      {/* Developing Warning */}
      {showDevelopingWarning && (
        <div className="camera-warning developing-warning">
          <div className="warning-icon">⏳</div>
          <div className="warning-text">
            <div className="warning-title">DEVELOPING</div>
            <div className="warning-subtitle">Wait for photo to develop</div>
          </div>
        </div>
      )}
    </div>
  );
}
