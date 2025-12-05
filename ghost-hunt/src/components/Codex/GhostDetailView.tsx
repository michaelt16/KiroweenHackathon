import { useState } from 'react';
import { PaperBase } from '../analog/base/PaperBase';
import { DamageOverlay } from '../analog/base/DamageOverlay';
import { PolaroidPhoto } from '../analog/elements/PolaroidPhoto';
import { HandwrittenText } from '../analog/elements/HandwrittenText';
import { TypewrittenText } from '../analog/elements/TypewrittenText';
import { GhostData } from '../../stores/ghostStore';
import { playPaperClick } from '../../utils/soundEffects';

interface GhostDetailViewProps {
  ghost: GhostData;
  isUnlocked: boolean;
  onBack: () => void;
}

export function GhostDetailView({ ghost, isUnlocked, onBack }: GhostDetailViewProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const isMobile = window.innerWidth < 768;

  const threatColors = {
    LOW: '#1a0f0a',
    MEDIUM: '#4a0000',
    HIGH: '#8b0000',
    EXTREME: '#cc0000',
  };

  return (
    <PaperBase variant="aged" style={{ 
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Damage overlay */}
      <DamageOverlay type="coffee" opacity={0.3} seed={ghost.id} />
      
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: isMobile ? '12px' : '20px',
          left: isMobile ? '12px' : '20px',
          padding: '8px 16px',
          background: 'rgba(139, 69, 19, 0.2)',
          border: '2px solid rgba(139, 69, 19, 0.4)',
          borderRadius: '4px',
          fontFamily: '"Courier New", monospace',
          fontSize: isMobile ? '10px' : '12px',
          color: '#1a0f0a',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139, 69, 19, 0.3)';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(139, 69, 19, 0.2)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        ← Back
      </button>

      {/* Content */}
      <div style={{ 
        padding: isMobile ? '60px 20px 20px' : '80px 50px 40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {!isUnlocked ? (
          // Locked state - show silhouette
          <LockedGhostView ghost={ghost} isMobile={isMobile} />
        ) : (
          // Unlocked state - show full details
          <UnlockedGhostView 
            ghost={ghost} 
            isMobile={isMobile}
            threatColors={threatColors}
            expandedImage={expandedImage}
            setExpandedImage={setExpandedImage}
          />
        )}
      </div>
    </PaperBase>
  );
}

function LockedGhostView({ ghost, isMobile }: { ghost: GhostData; isMobile: boolean }) {
  return (
    <div style={{ textAlign: 'center', padding: isMobile ? '40px 20px' : '60px 40px' }}>
      {/* Silhouette image */}
      <div style={{
        width: isMobile ? '180px' : '220px',
        height: isMobile ? '180px' : '220px',
        margin: '0 auto 24px',
        background: '#c4b49a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #1a0f0a',
        transform: 'rotate(1deg)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        {ghost.silhouetteUrl ? (
          <img 
            src={ghost.silhouetteUrl} 
            alt="Ghost silhouette"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.3) contrast(1.5)',
            }}
          />
        ) : (
          <TypewrittenText variant="faded" fontSize={isMobile ? "42px" : "56px"}>
            ?
          </TypewrittenText>
        )}
      </div>

      {/* Unknown name */}
      <TypewrittenText 
        variant="carbon" 
        fontSize={isMobile ? "20px" : "24px"} 
        style={{ 
          marginBottom: '16px',
          letterSpacing: '2px',
        }}
      >
        ???
      </TypewrittenText>

      {/* Unlock message */}
      <HandwrittenText 
        urgency="calm" 
        fontSize={isMobile ? "18px" : "20px"} 
        color="#4a0000"
        style={{ marginBottom: '12px' }}
      >
        Encounter to unlock
      </HandwrittenText>

      {/* Additional info */}
      <TypewrittenText 
        variant="faded" 
        fontSize={isMobile ? "11px" : "13px"}
        style={{ 
          marginTop: '24px',
          fontStyle: 'italic',
        }}
      >
        This entity has not been documented yet.
        <br />
        Complete an investigation to reveal its identity.
      </TypewrittenText>
    </div>
  );
}

function UnlockedGhostView({ 
  ghost, 
  isMobile, 
  threatColors,
  expandedImage,
  setExpandedImage,
}: { 
  ghost: GhostData; 
  isMobile: boolean;
  threatColors: Record<string, string>;
  expandedImage: string | null;
  setExpandedImage: (url: string | null) => void;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? '20px' : '32px',
      maxWidth: '100%',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    }}>
      {/* Title Section */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <HandwrittenText 
          urgency={ghost.threatLevel === 'HIGH' || ghost.threatLevel === 'EXTREME' ? 'urgent' : 'calm'} 
          fontSize={isMobile ? "36px" : "48px"}
          style={{ marginBottom: isMobile ? '8px' : '12px' }}
        >
          {ghost.name}
        </HandwrittenText>
        <TypewrittenText 
          variant="standard" 
          fontSize={isMobile ? "12px" : "14px"}
          color={threatColors[ghost.threatLevel]}
          style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            fontWeight: 'bold',
          }}
        >
          THREAT LEVEL: {ghost.threatLevel}
        </TypewrittenText>
        <TypewrittenText 
          variant="faded" 
          fontSize={isMobile ? "10px" : "12px"}
          style={{ 
            marginTop: '4px',
            textTransform: 'uppercase', 
            letterSpacing: '1px',
          }}
        >
          Difficulty: {ghost.difficulty}
        </TypewrittenText>
      </div>

      {/* Polaroid Photo - Clickable to expand */}
      {ghost.imageUrl && (
        <>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              cursor: 'pointer',
              marginTop: isMobile ? '12px' : '20px',
            }}
            onClick={() => {
              playPaperClick();
              setExpandedImage(ghost.imageUrl!);
            }}
          >
            <PolaroidPhoto
              src={ghost.imageUrl}
              caption={`${ghost.name.toLowerCase()} sighting`}
              damage="medium"
              seed={ghost.id}
            />
          </div>
          
          {/* Expanded Polaroid modal */}
          {expandedImage && (
            <div
              onClick={() => {
                playPaperClick();
                setExpandedImage(null);
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                cursor: 'pointer',
                padding: '20px',
              }}
            >
              <div style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                transform: 'scale(1.2)',
              }}>
                <PolaroidPhoto
                  src={expandedImage}
                  caption={`${ghost.name.toLowerCase()} sighting`}
                  damage="medium"
                  seed={ghost.id + '-expanded'}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Description */}
      <div>
        <TypewrittenText 
          variant="faded" 
          fontSize={isMobile ? "10px" : "12px"} 
          style={{ 
            marginBottom: isMobile ? '8px' : '12px', 
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Description
        </TypewrittenText>
        <HandwrittenText 
          urgency="calm" 
          fontSize={isMobile ? "16px" : "18px"} 
          style={{ 
            lineHeight: isMobile ? '1.7' : '1.9',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {ghost.description}
        </HandwrittenText>
      </div>

      {/* Tool Reactions Section */}
      <div style={{
        background: 'rgba(0,0,0,0.05)',
        padding: isMobile ? '16px' : '24px',
        border: '2px solid rgba(0,0,0,0.1)',
        transform: 'rotate(-0.3deg)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <TypewrittenText 
          variant="standard" 
          fontSize={isMobile ? "11px" : "13px"} 
          style={{ 
            marginBottom: isMobile ? '12px' : '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold',
          }}
        >
          Tool Reactions
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '16px' }}>
          {/* EMF */}
          <div>
            <TypewrittenText 
              variant="standard" 
              fontSize={isMobile ? "10px" : "11px"}
              style={{ marginBottom: '4px', fontWeight: 'bold' }}
            >
              EMF Meter:
            </TypewrittenText>
            <HandwrittenText 
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{ paddingLeft: '12px' }}
            >
              {ghost.emfPersonality ? ghost.emfPersonality.charAt(0).toUpperCase() + ghost.emfPersonality.slice(1) + ' pattern' : 'Unknown pattern'}
            </HandwrittenText>
          </div>

          {/* Camera */}
          <div>
            <TypewrittenText 
              variant="standard" 
              fontSize={isMobile ? "10px" : "11px"}
              style={{ marginBottom: '4px', fontWeight: 'bold' }}
            >
              Camera:
            </TypewrittenText>
            <HandwrittenText 
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{ paddingLeft: '12px' }}
            >
              {ghost.cameraManifestations.map(m => 
                m.primary.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              ).join(', ')}
            </HandwrittenText>
          </div>

          {/* Thermal */}
          <div>
            <TypewrittenText 
              variant="standard" 
              fontSize={isMobile ? "10px" : "11px"}
              style={{ marginBottom: '4px', fontWeight: 'bold' }}
            >
              Thermal Scanner:
            </TypewrittenText>
            <HandwrittenText 
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{ paddingLeft: '12px' }}
            >
              {ghost.thermalReading.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </HandwrittenText>
          </div>
        </div>
      </div>

      {/* Investigation Hints */}
      <div style={{
        background: 'rgba(139, 0, 0, 0.08)',
        padding: isMobile ? '16px' : '24px',
        border: '2px solid rgba(139, 0, 0, 0.25)',
        transform: 'rotate(0.4deg)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <TypewrittenText 
          variant="standard" 
          fontSize={isMobile ? "11px" : "13px"} 
          style={{ 
            marginBottom: isMobile ? '12px' : '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold',
            color: '#8b0000',
          }}
        >
          Investigation Hints
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
          {/* Spirit Box Vocabulary */}
          {ghost.wordFamilies && (
            <div>
              <TypewrittenText 
                variant="standard" 
                fontSize={isMobile ? "10px" : "11px"}
                style={{ marginBottom: '6px', fontWeight: 'bold' }}
              >
                Spirit Box Vocabulary:
              </TypewrittenText>
              <HandwrittenText 
                urgency="calm" 
                fontSize={isMobile ? "14px" : "15px"}
                style={{ paddingLeft: '12px', lineHeight: '1.6' }}
              >
                <span style={{ fontStyle: 'italic' }}>Emotion words:</span> {ghost.wordFamilies.emotion.join(', ')}
                <br />
                <span style={{ fontStyle: 'italic' }}>Theme words:</span> {ghost.wordFamilies.theme.join(', ')}
                {ghost.spiritBoxResponse && (
                  <>
                    <br />
                    <span style={{ fontStyle: 'italic' }}>Response rate:</span> {Math.round(ghost.spiritBoxResponse.frequency * 100)}% ({Array.isArray(ghost.spiritBoxResponse.personality) ? ghost.spiritBoxResponse.personality.join('/') : ghost.spiritBoxResponse.personality.toLowerCase()} personality)
                  </>
                )}
              </HandwrittenText>
            </div>
          )}

          {/* Photo Manifestations */}
          <div>
            <TypewrittenText 
              variant="standard" 
              fontSize={isMobile ? "10px" : "11px"}
              style={{ marginBottom: '6px', fontWeight: 'bold' }}
            >
              Photo Manifestations:
            </TypewrittenText>
            <HandwrittenText 
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{ paddingLeft: '12px', lineHeight: '1.6' }}
            >
              {ghost.cameraManifestations.map((m, idx) => {
                const manifestName = m.primary.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                const prob = Math.round(m.probability * 100);
                return (
                  <span key={idx}>
                    {manifestName} ({prob}% chance)
                    {idx < ghost.cameraManifestations.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </HandwrittenText>
          </div>

          {/* Temperature Behavior */}
          <div>
            <TypewrittenText 
              variant="standard" 
              fontSize={isMobile ? "10px" : "11px"}
              style={{ marginBottom: '6px', fontWeight: 'bold' }}
            >
              Temperature Behavior:
            </TypewrittenText>
            <HandwrittenText 
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{ paddingLeft: '12px', lineHeight: '1.6' }}
            >
              {(() => {
                const reading = ghost.thermalReading.toLowerCase();
                if (reading === 'deep_cold') {
                  return 'Extreme cold - temperatures drop well below freezing, often to sub-zero levels. Breath visible, equipment may malfunction.';
                } else if (reading === 'cold_spot') {
                  return 'Cold spots - localized temperature drops appear suddenly and disappear. Temperature can drop 5-10°C in specific areas.';
                } else if (reading === 'normal') {
                  return 'Normal temperature - no significant temperature changes detected. Ambient temperature remains stable.';
                }
                return ghost.thermalReading.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              })()}
            </HandwrittenText>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div style={{
        background: 'rgba(139, 69, 19, 0.05)',
        padding: isMobile ? '16px' : '24px',
        border: '2px solid rgba(139, 69, 19, 0.2)',
        transform: 'rotate(0.2deg)',
      }}>
        <TypewrittenText 
          variant="standard" 
          fontSize={isMobile ? "11px" : "13px"} 
          style={{ 
            marginBottom: isMobile ? '12px' : '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold',
          }}
        >
          Characteristics
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
          {ghost.characteristics.map((characteristic, i) => (
            <HandwrittenText 
              key={i}
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{
                paddingLeft: isMobile ? '12px' : '16px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                lineHeight: '1.6',
              }}
            >
              • {characteristic}
            </HandwrittenText>
          ))}
        </div>
      </div>

      {/* Encounter Stats */}
      <div style={{
        marginTop: isMobile ? '12px' : '20px',
        padding: isMobile ? '12px' : '16px',
        background: 'rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '4px',
      }}>
        <TypewrittenText 
          variant="faded" 
          fontSize={isMobile ? "9px" : "10px"}
          style={{ textAlign: 'center' }}
        >
          Encounters: {ghost.encounterCount} | ID: {ghost.id.toUpperCase()}
        </TypewrittenText>
      </div>
    </div>
  );
}
