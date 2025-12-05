import { useState } from 'react';
import { PolaroidPhoto } from '../analog/elements/PolaroidPhoto';
import { HandwrittenText } from '../analog/elements/HandwrittenText';
import { TypewrittenText } from '../analog/elements/TypewrittenText';
import { DamageOverlay } from '../analog/base/DamageOverlay';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import approvedstamp from '../../assets/texture/approvedstamp.png';
import { useGhostStore, GhostData } from '../../stores/ghostStore';
import { playPaperClick } from '../../utils/soundEffects';

// GhostCodexContent - Just the manila folder (tabs + content), no wood table background
// This can be used standalone in the backpack drawer OR wrapped with wood table in /codex route

export function GhostCodexContent() {
  // Get all ghosts from the store
  const { getAllGhosts, isUnlocked } = useGhostStore();
  const allGhosts = getAllGhosts();
  
  const [selectedGhost, setSelectedGhost] = useState<GhostData | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);

  const handleGhostSelect = (ghost: GhostData) => {
    // Allow viewing locked ghosts (they'll show silhouette + "???")
    setTransitionKey(prev => prev + 1);
    setSelectedGhost(ghost);
  };

  const threatColors = {
    LOW: '#1a0f0a',
    MEDIUM: '#4a0000',
    HIGH: '#8b0000',
    EXTREME: '#cc0000',
  };

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Folder tabs - horizontal with wrapping (4 per row) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
          background: '#c4b49a',
          position: 'relative',
          zIndex: 2,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
        }}>
          {/* COVER TAB - First tab */}
          <button
            onClick={() => setSelectedGhost(null as any)}
            style={{
              flex: '1 1 25%',
              minWidth: isMobile ? '80px' : '120px',
              padding: '12px 8px',
              border: 'none',
              background: selectedGhost === null ? '#d8d4c8' : '#b4a49a',
              color: selectedGhost === null ? '#1a0f0a' : '#4a3a2a',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              fontWeight: selectedGhost === null ? 'bold' : 'normal',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease-in',
              borderRight: '1px solid rgba(139, 69, 19, 0.3)',
              borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
              boxShadow: selectedGhost === null
                ? '0 -2px 4px rgba(0,0,0,0.1)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {selectedGhost === null && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#d8d4c8',
                }} />
              </>
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>COVER</span>
          </button>
          
          {/* Ghost tabs */}
          {allGhosts.map((ghost) => {
            const isActive = ghost.id === selectedGhost?.id;
            const ghostIsUnlocked = isUnlocked(ghost.id);
            const displayName = ghostIsUnlocked ? ghost.name : '???';
            
            return (
              <button
                key={ghost.id}
                onClick={() => handleGhostSelect(ghost)}
                style={{
                  flex: '1 1 25%', // 4 tabs per row
                  minWidth: isMobile ? '80px' : '120px',
                  padding: '12px 8px',
                  border: 'none',
                  background: isActive ? '#d8d4c8' : '#b4a49a',
                  color: isActive ? '#1a0f0a' : '#4a3a2a',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease-in',
                  borderRight: '1px solid rgba(139, 69, 19, 0.3)',
                  borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
                  opacity: ghostIsUnlocked ? 1 : 0.4,
                  boxShadow: isActive 
                    ? '0 -2px 4px rgba(0,0,0,0.1)' 
                    : 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {isActive && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#d8d4c8',
                    }} />
                  </>
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{displayName}</span>
              </button>
            );
          })}
        </div>

        {/* Folder frame - matching BackpackDrawer style */}
        <div style={{
          padding: isMobile ? '12px' : '20px',
          position: 'relative',
          zIndex: 1,
          background: '#c4b49a', // Brown folder color (darker than paper)
          minHeight: '100vh',
        }}>
          {/* Wrinkled texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: 'none',
          }} />
          
          {/* Dust overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dust'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23dust)' opacity='0.2'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: 'none',
          }} />
          
          {selectedGhost === null ? (
            // COVER PAGE - Clean folder with proper typography
            <div style={{
              padding: isMobile ? '60px 20px' : '120px 40px',
              textAlign: 'center',
              minHeight: '600px',
              position: 'relative',
            }}>
              {/* CLASSIFIED stamp - top right */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '30px' : '50px',
                right: isMobile ? '30px' : '80px',
                transform: `rotate(15deg)`,
                border: '4px solid #8b0000',
                padding: '8px 16px',
                fontFamily: 'Impact, sans-serif',
                fontSize: isMobile ? '20px' : '24px',
                color: '#8b0000',
                letterSpacing: '3px',
                opacity: 0.7,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
                CLASSIFIED
              </div>
              
              {/* APPROVED stamp - bottom left */}
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '80px' : '120px',
                left: isMobile ? '20px' : '60px',
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                backgroundImage: `url(${approvedstamp})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                transform: 'rotate(-8deg)',
                opacity: 0.6,
                pointerEvents: 'none',
              }} />
              
              {/* Main title - handwritten */}
              <HandwrittenText urgency="calm" fontSize={isMobile ? "42px" : "64px"} style={{ 
                marginBottom: '20px', 
                color: '#1a0f0a',
                lineHeight: '1.2',
              }}>
                PARANORMAL DATABASE
              </HandwrittenText>
              
              {/* Subtitle - typewriter */}
              <TypewrittenText variant="standard" fontSize={isMobile ? "14px" : "18px"} style={{
                letterSpacing: '5px',
                marginBottom: '80px',
                color: '#1a0f0a',
              }}>
                CLASSIFIED FIELD CODEX
              </TypewrittenText>
              
              {/* Property label - typewriter */}
              <TypewrittenText variant="faded" fontSize={isMobile ? "11px" : "13px"} style={{
                letterSpacing: '2px',
                color: '#4a3a2a',
                marginBottom: '100px',
              }}>
                PROPERTY OF PARANORMAL INVESTIGATION UNIT
              </TypewrittenText>
              
              {/* Instructions - typewriter */}
              <TypewrittenText variant="faded" fontSize={isMobile ? "10px" : "12px"} style={{
                letterSpacing: '1px',
                color: '#6a5a4a',
              }}>
                SELECT A DIVIDER TO VIEW ENTITY FILES
              </TypewrittenText>
              
              {/* Serial number - bottom */}
              <TypewrittenText variant="faded" fontSize={isMobile ? "9px" : "10px"} style={{
                position: 'absolute',
                bottom: isMobile ? '20px' : '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                letterSpacing: '1px',
                color: '#6a5a4a',
              }}>
                FILE NO: PDB-1985-CODEX-A
              </TypewrittenText>
            </div>
          ) : (
            // PAPER CONTENT - Only for ghost pages
            <div style={{
              background: '#d8d4c8',
              backgroundImage: `url(${wrinkledpaper})`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
              padding: isMobile ? '20px' : '40px',
              minHeight: '600px',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
              position: 'relative',
            }}>
              <DamageOverlay type="coffee" opacity={0.3} seed={selectedGhost.id} />
              
              <div key={transitionKey} style={{ position: 'relative', zIndex: 1 }}>
                <GhostDetails ghost={selectedGhost} threatColors={threatColors} />
              </div>
            </div>
          )}
        </div>
    </>
  );
}

function GhostDetails({ ghost, threatColors }: { ghost: GhostData; threatColors: Record<string, string> }) {
  const isMobile = window.innerWidth < 768;
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const { isUnlocked } = useGhostStore();
  const ghostIsUnlocked = isUnlocked(ghost.id);
  
  if (!ghostIsUnlocked) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        {/* Silhouette image */}
        <div style={{
          width: '200px',
          height: '200px',
          margin: '0 auto 24px',
          background: '#c4b49a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #1a0f0a',
          transform: 'rotate(1deg)',
          position: 'relative',
          overflow: 'hidden',
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
            <TypewrittenText variant="faded" fontSize="48px">?</TypewrittenText>
          )}
        </div>
        <TypewrittenText variant="carbon" fontSize="18px" style={{ marginBottom: '12px' }}>
          ???
        </TypewrittenText>
        <HandwrittenText urgency="calm" fontSize="16px" color="#4a0000">
          Encounter to unlock
        </HandwrittenText>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: isMobile ? '20px 16px' : '40px 50px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? '16px' : '32px',
      maxWidth: '100%',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <HandwrittenText 
          urgency={ghost.threatLevel === 'HIGH' || ghost.threatLevel === 'EXTREME' ? 'urgent' : 'calm'} 
          fontSize={isMobile ? "32px" : "40px"}
          style={{ marginBottom: isMobile ? '8px' : '12px' }}
        >
          {ghost.name}
        </HandwrittenText>
        <TypewrittenText 
          variant="standard" 
          fontSize={isMobile ? "12px" : "14px"}
          color={threatColors[ghost.threatLevel]}
          style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          THREAT LEVEL: {ghost.threatLevel}
        </TypewrittenText>
      </div>

      {/* Polaroid Photo - Clickable to expand */}
      {ghost.imageUrl && (
        <>
          <div 
            style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => {
              playPaperClick();
              setExpandedImage(ghost.imageUrl!);
            }}
          >
            <PolaroidPhoto
              src={ghost.imageUrl}
              caption={`${ghost.name.toLowerCase()} sighting`}
              damage="heavy"
              seed={ghost.id}
              extraDarkness={ghost.id === 'onyx' || ghost.name === 'Onyx'}
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
              }}>
                <PolaroidPhoto
                  src={expandedImage}
                  caption={`${ghost.name.toLowerCase()} sighting`}
                  damage="heavy"
                  seed={ghost.id + '-expanded'}
                  extraDarkness={ghost.id === 'onyx' || ghost.name === 'Onyx'}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Description */}
      <div>
        <TypewrittenText variant="faded" fontSize={isMobile ? "10px" : "12px"} style={{ marginBottom: isMobile ? '6px' : '12px', textTransform: 'uppercase' }}>
          Description
        </TypewrittenText>
        <HandwrittenText urgency="calm" fontSize={isMobile ? "15px" : "16px"} style={{ 
          lineHeight: isMobile ? '1.6' : '1.8',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}>
          {ghost.description}
        </HandwrittenText>
      </div>

      {/* Investigation Hints */}
      <div style={{
        background: 'rgba(139, 0, 0, 0.08)',
        padding: isMobile ? '12px' : '20px',
        border: '2px solid rgba(139, 0, 0, 0.25)',
        transform: 'rotate(0.3deg)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ 
          marginBottom: isMobile ? '10px' : '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 'bold',
          color: '#8b0000',
        }}>
          Investigation Hints
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '14px' }}>
          {/* Spirit Box Vocabulary */}
          {ghost.wordFamilies && (
            <div>
              <TypewrittenText variant="standard" fontSize={isMobile ? "9px" : "10px"} style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                Spirit Box Vocabulary:
              </TypewrittenText>
              <HandwrittenText urgency="calm" fontSize={isMobile ? "13px" : "14px"} style={{ paddingLeft: '10px', lineHeight: '1.5' }}>
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
            <TypewrittenText variant="standard" fontSize={isMobile ? "9px" : "10px"} style={{ marginBottom: '4px', fontWeight: 'bold' }}>
              Photo Manifestations:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "13px" : "14px"} style={{ paddingLeft: '10px', lineHeight: '1.5' }}>
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
            <TypewrittenText variant="standard" fontSize={isMobile ? "9px" : "10px"} style={{ marginBottom: '4px', fontWeight: 'bold' }}>
              Temperature Behavior:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "13px" : "14px"} style={{ paddingLeft: '10px', lineHeight: '1.5' }}>
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
        background: 'rgba(0,0,0,0.05)',
        padding: isMobile ? '12px' : '24px',
        border: '1px solid rgba(0,0,0,0.1)',
        transform: 'rotate(-0.3deg)',
      }}>
        <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "13px"} style={{ 
          marginBottom: isMobile ? '8px' : '20px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 'bold',
        }}>
          Characteristics
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '12px' }}>
          {ghost.characteristics.map((characteristic, i) => (
            <HandwrittenText 
              key={i}
              urgency="calm" 
              fontSize={isMobile ? "14px" : "15px"}
              style={{
                paddingLeft: isMobile ? '10px' : '16px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                lineHeight: '1.5',
              }}
            >
              • {characteristic}
            </HandwrittenText>
          ))}
        </div>
      </div>
    </div>
  );
}
