// Profile panel - Analog Horror UI (Clipboard with ID Card)
import { useState, useRef, useEffect } from 'react';
import { Clipboard } from '../components/analog/templates/Clipboard';
import { IDCard } from '../components/analog/elements/IDCard';
import { HandwrittenText } from '../components/analog/elements/HandwrittenText';
import { TypewrittenText } from '../components/analog/elements/TypewrittenText';
import { DamageOverlay } from '../components/analog/base/DamageOverlay';
import { Tape } from '../components/analog/base/Tape';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';
import pfp from '../assets/images/agent/pfp.png';

export function ProfilePanel() {
  const level = 1;
  const currentXP = 30;
  const maxXP = 100;
  const investigationsCompleted = 0;
  const ghostsCaught = 0;
  const successRate = 0;
  
  // Agent customization state
  const [agentName, setAgentName] = useState(() => {
    const saved = localStorage.getItem('agentName');
    return saved || 'AGENT_001';
  });
  const [agentPhoto, setAgentPhoto] = useState(() => {
    const saved = localStorage.getItem('agentPhoto');
    return saved || pfp;
  });
  
  const [isCardZoomed, setIsCardZoomed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate rank based on level
  const getRank = (level: number) => {
    if (level >= 20) return 'SENIOR INVESTIGATOR';
    if (level >= 10) return 'INVESTIGATOR';
    if (level >= 5) return 'JUNIOR INVESTIGATOR';
    return 'ROOKIE';
  };

  // Handle card click to zoom
  const handleCardClick = () => {
    setIsCardZoomed(true);
  };

  // Handle name change
  const handleNameChange = (newName: string) => {
    setAgentName(newName);
    localStorage.setItem('agentName', newName);
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event('agentNameUpdated'));
  };

  // Handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAgentPhoto(result);
        localStorage.setItem('agentPhoto', result);
        // Dispatch custom event for same-window updates
        window.dispatchEvent(new Event('agentPhotoUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: 'auto',
        backgroundColor: '#0d0a08', // Dark background for clipboard
        padding: '0',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
    >
      {/* Profile Content */}
      <div style={{ 
        paddingTop: window.innerWidth < 768 ? '20px' : '20px', 
        paddingBottom: window.innerWidth < 768 ? '20px' : '40px',
        paddingLeft: window.innerWidth < 768 ? '12px' : '20px',
        paddingRight: window.innerWidth < 768 ? '12px' : '20px',
        position: 'relative', 
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto', 
      }}>
        {/* Back to Map Button */}
        <div style={{ marginBottom: window.innerWidth < 768 ? '16px' : '20px' }}>
          <BackToMapButton />
        </div>
        
        {/* Title above clipboard */}
        <div style={{
          textAlign: 'center',
          marginBottom: window.innerWidth < 768 ? '20px' : '30px',
        }}>
          <h1 style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: window.innerWidth < 768 ? '24px' : '36px',
            color: '#d8d4c8',
            textTransform: 'uppercase',
            letterSpacing: window.innerWidth < 768 ? '2px' : '4px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            margin: 0,
            marginBottom: '10px',
          }}>
            AGENT DOSSIER
          </h1>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: window.innerWidth < 768 ? '11px' : '14px',
            color: '#999',
            margin: 0,
          }}>
            CLASSIFIED - AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        <Clipboard>
          {/* Damage overlays for analog horror aesthetic */}
          <DamageOverlay type="coffee" opacity={0.2} seed="profile-coffee" />
          <DamageOverlay type="ink" opacity={0.15} seed="profile-ink" />
          
          {/* ID Card with tape - Clickable */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: window.innerWidth < 768 ? '20px' : '30px',
        position: 'relative', 
          }}>
            <Tape position="top" size="medium" seed="profile-tape-top" />
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                transition: 'all 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.1) drop-shadow(0 8px 20px rgba(139, 0, 0, 0.4))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'none';
              }}
            >
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              <IDCard 
                agentName={agentName}
                agentId="PI-0001-A"
                rank={getRank(level)}
          level={level}
                photoUrl={agentPhoto}
                stats={{
                  investigations: investigationsCompleted,
                  ghostsCaught: ghostsCaught,
                  successRate: successRate,
                }}
                seed="agent-001-clipboard"
        />
      </div>
            </div>
          </div>

          {/* XP Progress Section */}
          <div style={{
            background: '#f4f0e6',
            padding: window.innerWidth < 768 ? '16px' : '20px',
            borderRadius: '4px',
            border: '2px solid #2a2520',
            marginTop: '20px',
            position: 'relative',
            transform: 'rotate(-0.3deg)',
          }}>
            <DamageOverlay type="coffee" opacity={0.1} seed="xp-section-coffee" />
            <TypewrittenText fontSize={window.innerWidth < 768 ? "14px" : "16px"} fontWeight="bold">
              EXPERIENCE PROGRESS:
            </TypewrittenText>
            <div style={{ marginTop: '10px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                flexWrap: 'wrap',
                gap: '4px',
              }}>
                <TypewrittenText fontSize={window.innerWidth < 768 ? "11px" : "12px"}>
                  {currentXP} / {maxXP} XP
                </TypewrittenText>
                <TypewrittenText fontSize={window.innerWidth < 768 ? "11px" : "12px"}>
                  {Math.round((currentXP / maxXP) * 100)}%
                </TypewrittenText>
              </div>
              <div style={{
                width: '100%',
                height: window.innerWidth < 768 ? '16px' : '20px',
                background: '#c4b49a',
                border: '2px solid #1a0f0a',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(currentXP / maxXP) * 100}%`,
                  height: '100%',
                  background: '#1a0f0a',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </div>

          {/* Performance Notes */}
          <div style={{
            background: '#f4f0e6',
            padding: window.innerWidth < 768 ? '16px' : '20px',
            borderRadius: '4px',
            border: '2px solid #2a2520',
            marginTop: '20px',
            position: 'relative',
            transform: 'rotate(0.3deg)',
          }}>
            <DamageOverlay type="ink" opacity={0.1} seed="notes-section-ink" />
            <TypewrittenText fontSize={window.innerWidth < 768 ? "14px" : "16px"} fontWeight="bold">
              PERFORMANCE NOTES:
            </TypewrittenText>

            <HandwrittenText urgency="calm" fontSize={window.innerWidth < 768 ? "16px" : "18px"}>
              {investigationsCompleted === 0 && ghostsCaught === 0 ? (
                <>
                  New agent. Awaiting first{'\n'}
                  field assignment.{'\n'}
                  {'\n'}
                  Complete training and{'\n'}
                  initial investigation to begin{'\n'}
                  building case history.
                </>
              ) : (
                <>
                  Active field agent with{'\n'}
                  {investigationsCompleted} investigation{investigationsCompleted !== 1 ? 's' : ''} completed.{'\n'}
                  {'\n'}
                  {ghostsCaught > 0 ? (
                    <>
                      Successfully identified{'\n'}
                      {ghostsCaught} entity{ghostsCaught !== 1 ? 'ies' : 'y'}.
                    </>
                  ) : (
                    <>
                      No entities identified yet.{'\n'}
                      Continue investigating.
                    </>
                  )}
                </>
              )}
            </HandwrittenText>

            <div style={{
              borderTop: '1px solid #8b7355',
              marginTop: '15px',
              paddingTop: '15px',
            }}>
              <TypewrittenText fontSize={window.innerWidth < 768 ? "12px" : "14px"} variant="faded">
                Clearance: LEVEL {level} - {getRank(level)}
              </TypewrittenText>
            </div>
          </div>
        </Clipboard>

        {/* Footer note */}
        <div style={{
          textAlign: 'center',
          marginTop: window.innerWidth < 768 ? '20px' : '30px',
          padding: window.innerWidth < 768 ? '12px' : '15px',
          background: 'rgba(42, 37, 32, 0.8)',
          border: '1px solid #5a4f48',
          borderRadius: '8px',
        }}>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: window.innerWidth < 768 ? "10px" : "12px",
            color: '#999',
            margin: 0,
          }}>
            📋 OFFICIAL AGENT DOSSIER - CLIPBOARD FORMAT
          </p>
        </div>
      </div>

      {/* Zoomed ID Card Modal - Centered with Edit Mode */}
      {isCardZoomed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto',
            padding: '40px 20px',
          }}
          onClick={() => setIsCardZoomed(false)}
        >
          <div
            ref={cardRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              pointerEvents: 'auto',
              maxWidth: '500px',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IDCard 
              agentName={agentName}
              agentId="PI-0001-A"
              rank={getRank(level)}
              level={level}
              photoUrl={agentPhoto}
              stats={{
                investigations: investigationsCompleted,
                ghostsCaught: ghostsCaught,
                successRate: successRate,
              }}
              seed="agent-001-zoomed"
            />

            {/* Edit Controls */}
            <div style={{
              width: '100%',
              background: '#d8d4c8',
              padding: '24px',
              borderRadius: '4px',
              border: '2px solid #1a0f0a',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
              transform: 'rotate(-0.3deg)',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  color: '#1a0f0a',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                  Agent Name:
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#f4f0e6',
                    border: '2px solid #1a0f0a',
                    borderRadius: '4px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    color: '#1a0f0a',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  color: '#1a0f0a',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                  Profile Picture:
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={agentPhoto}
                    alt="Agent"
                    style={{
                      width: '100px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '2px solid #1a0f0a',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '10px 20px',
                      background: '#8b0000',
                      border: '2px solid #1a0f0a',
                      borderRadius: '4px',
                      color: '#f4f0e6',
                      fontFamily: '"Courier New", monospace',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#cc0000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#8b0000';
                    }}
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsCardZoomed(false)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: '#8b0000',
              border: '2px solid #1a0f0a',
              borderRadius: '4px',
              color: '#f4f0e6',
              padding: '10px 20px',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              zIndex: 10001,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cc0000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8b0000';
            }}
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
}
