// Photos Tab - Film Strip Display with White Borders
import { useInvestigation } from '../../../context/InvestigationContext';
import './PhotosTab.css';

export function PhotosTab() {
  const { photos } = useInvestigation();

  // Sort photos by timestamp (newest first)
  const sortedPhotos = [...photos].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="photos-tab">
      <h3 className="photos-tab-title">📷 Photo Evidence</h3>

      {photos.length === 0 ? (
        <div className="photos-empty">
          No photos taken yet.<br />
          Switch to Camera tool to capture evidence.
        </div>
      ) : (
        <div className="film-strip">
          {sortedPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`film-photo ${photo.status === 'developing' ? 'developing' : ''} ${photo.quality}`}
            >
              {/* White Border - Printable Photo Style */}
              <div className="photo-border">
                {/* Photo Content */}
                <div className="photo-content">
                  {photo.status === 'developing' ? (
                    <div className="photo-developing">
                      <div className="developing-spinner" />
                      <div className="developing-text">DEVELOPING</div>
                    </div>
                  ) : (
                    <div className="photo-result">
                      {photo.quality === 'strong' && (
                        <div className="photo-strong">
                          <div className="photo-icon">👻</div>
                          <div className="photo-label">STRONG</div>
                        </div>
                      )}
                      {photo.quality === 'faint' && (
                        <div className="photo-faint">
                          <div className="photo-icon">~</div>
                          <div className="photo-label">FAINT</div>
                        </div>
                      )}
                      {photo.quality === 'none' && (
                        <div className="photo-none">
                          <div className="photo-icon">✗</div>
                          <div className="photo-label">NONE</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Info */}
              <div className="photo-info">
                <div className="photo-time">
                  {new Date(photo.timestamp).toLocaleTimeString()}
                </div>
                {photo.status === 'ready' && (
                  <div className={`photo-quality ${photo.quality}`}>
                    {photo.quality === 'strong'
                      ? '✓ STRONG MANIFESTATION'
                      : photo.quality === 'faint'
                      ? '~ Faint Silhouette'
                      : '✗ Nothing Captured'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
