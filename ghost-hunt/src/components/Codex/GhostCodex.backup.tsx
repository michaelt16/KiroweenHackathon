import { useState } from 'react';
import { PolaroidPhoto } from '../analog/elements/PolaroidPhoto';
import { HandwrittenText } from '../analog/elements/HandwrittenText';
import { TypewrittenText } from '../analog/elements/TypewrittenText';
import { OfficialStamp } from '../analog/elements/OfficialStamp';
import { DamageOverlay } from '../analog/base/DamageOverlay';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import cardboard from '../../assets/texture/cardboard.png';
import woodtable from '../../assets/texture/woodtable.png';
import approvedstamp from '../../assets/texture/approvedstamp.png';
import ghost1Image from '../../assets/images/ghost1.png';
import ghost2Image from '../../assets/images/ghost2.png';
import ghost3Image from '../../assets/images/ghost3.png';
import peccyImage from '../../assets/images/peccy.png';
import './GhostCodex.css';

interface Ghost {
  id: string;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  description: string;
  emfReaction: string;
  thermalReaction: string;
  audioReaction: string;
  cameraReaction: string;
  identificationSteps: string[];
  weaknesses: string[];
  imageUrl?: string;
  isLocked: boolean;
}

// Expanded ghost data with tool reactions
const GHOST_DATA: Ghost[] = [
  {
    id: '001',
    name: 'WRAITH',
    threatLevel: 'HIGH',
    description: 'A fast-moving entity with strong electromagnetic presence. Known for rapid sanity drain and aggressive behavior. Moves quickly through walls and responds aggressively to provocation.',
    emfReaction: 'HIGH to EXTREME (60-100 mG). Constant high activity, frequent red bars. EMF meter goes crazy.',
    thermalReaction: 'NORMAL (58-65°F). Rare cold spots (20% chance). Usually shows normal temperature.',
    audioReaction: 'LOW (20-40%). Rare whispers (15% chance). Mostly quiet, infrequent communication.',
    cameraReaction: 'Rarely manifests in photos. Best identified through EMF readings.',
    identificationSteps: [
      '1. Check EMF Meter → HIGH/EXTREME readings',
      '2. Check Thermal Scanner → Normal temps, no cold spots',
      '3. Check Audio Receiver → Very few whispers',
      '4. Conclusion: High EMF + No Cold + No Audio = WRAITH'
    ],
    weaknesses: ['Salt barriers temporarily slow movement', 'UV light'],
    imageUrl: ghost1Image,
    isLocked: false,
  },
  {
    id: '002',
    name: 'SHADE',
    threatLevel: 'MEDIUM',
    description: 'A shy, passive entity that prefers darkness and solitude. Communicates through whispers and cold spots. Rarely aggressive unless provoked. Most active when investigator is alone.',
    emfReaction: 'LOW (10-20 mG). Low, stable readings. Usually shows NORMAL or SLIGHT ACTIVITY.',
    thermalReaction: 'FREEZING (20-35°F). Frequent cold spots (70% chance). Often shows FREEZING with many blue spots.',
    audioReaction: 'VERY HIGH (80-100%). Frequent whispers (60% chance). Constant activity, frequent communication.',
    cameraReaction: 'Rarely appears in photos. Best identified through Thermal and Audio.',
    identificationSteps: [
      '1. Check EMF Meter → LOW readings',
      '2. Check Thermal Scanner → FREEZING temps, many cold spots',
      '3. Check Audio Receiver → Frequent whispers',
      '4. Conclusion: Low EMF + Cold + Whispers = SHADE'
    ],
    weaknesses: ['Light sources', 'Group presence', 'Easiest to identify in complete darkness'],
    imageUrl: ghost2Image,
    isLocked: false,
  },
  {
    id: '003',
    name: 'POLTERGEIST',
    threatLevel: 'HIGH',
    description: 'A chaotic entity known for physical disturbances and visual anomalies. Highly active and unpredictable. Feeds on fear and chaos. Can throw multiple objects at once.',
    emfReaction: 'MODERATE (30-50 mG). Medium readings with fluctuation. Shows SLIGHT to MODERATE ACTIVITY.',
    thermalReaction: 'NORMAL (62-68°F). Very rare cold spots (10% chance). Usually shows normal temperature.',
    audioReaction: 'LOW-MEDIUM (30-50%). Rare whispers (20% chance). Moderate activity, occasional whispers.',
    cameraReaction: 'Frequently appears in photos. Best identified through camera manifestations.',
    identificationSteps: [
      '1. Check EMF Meter → MODERATE readings',
      '2. Check Thermal Scanner → Normal temps',
      '3. Check Audio Receiver → Few whispers',
      '4. Take photos → Look for manifestations',
      '5. Conclusion: Medium EMF + No Cold + No Audio + Photos = POLTERGEIST'
    ],
    weaknesses: ['Calm environment', 'Smudge sticks', 'Keep area organized to track activity'],
    imageUrl: ghost3Image,
    isLocked: false,
  },
  {
    id: '004',
    name: 'PECCY',
    threatLevel: 'LOW',
    description: 'Non-ghost anomaly. Small, rounded figure with bright orange glow. Appears near Amazon fulfillment centers, warehouses, and industrial sites. Behavior resembles a lost child mascot - curious, playful, never hostile. Vanishes when approached directly. Investigators report feeling watched but never threatened. Entity seems drawn to familiar workplace environments, possibly seeking something or someone it remembers.',
    emfReaction: 'HIGH (60-80 mG). Strong EMF spikes from excitement, not aggression. Equipment reacts to emotional energy. Peccy doesn\'t understand he\'s triggering the tools.',
    thermalReaction: 'WARM (70-75°F). Opposite of typical ghost behavior. Shows warm readings on thermal camera. No cold spots detected.',
    audioReaction: 'NONE (0%). No whispers or verbal communication. Silent entity. May cause equipment static from proximity.',
    cameraReaction: 'FREQUENTLY VISIBLE. Orange silhouette appears in photos. Subject often waving or tilting head. Film may overexpose due to energy presence. Best documented anomaly.',
    identificationSteps: [
      '1. Check Location → Warehouse, fulfillment center, or industrial site',
      '2. Check EMF Meter → HIGH readings (excitement, not threat)',
      '3. Check Thermal Scanner → WARM temps (not cold like ghosts)',
      '4. Check Audio Receiver → No whispers or communication',
      '5. Take photos → Orange glow, friendly posture, often waving',
      '6. Conclusion: High EMF + Warm + No Audio + Visible = PECCY'
    ],
    weaknesses: [
      'Sensitive to fear - disappears if investigators scream or run',
      'Avoids direct approach - vanishes when confronted',
      'Speak softly and calmly to observe longer',
      'DO NOT treat as hostile - he\'s just lost and curious',
      'Never appears in residential or burial sites - only workplaces'
    ],
    imageUrl: peccyImage,
    isLocked: false,
  },
  {
    id: '005',
    name: 'UNKNOWN',
    threatLevel: 'LOW',
    description: '???',
    emfReaction: '???',
    thermalReaction: '???',
    audioReaction: '???',
    cameraReaction: '???',
    identificationSteps: ['Encounter to unlock'],
    weaknesses: ['???'],
    isLocked: true,
  },
  {
    id: '006',
    name: 'UNKNOWN',
    threatLevel: 'LOW',
    description: '???',
    emfReaction: '???',
    thermalReaction: '???',
    audioReaction: '???',
    cameraReaction: '???',
    identificationSteps: ['Encounter to unlock'],
    weaknesses: ['???'],
    isLocked: true,
  },
  {
    id: '007',
    name: 'UNKNOWN',
    threatLevel: 'LOW',
    description: '???',
    emfReaction: '???',
    thermalReaction: '???',
    audioReaction: '???',
    cameraReaction: '???',
    identificationSteps: ['Encounter to unlock'],
    weaknesses: ['???'],
    isLocked: true,
  },

];

export function GhostCodex() {
  const [selectedGhost, setSelectedGhost] = useState<Ghost>(GHOST_DATA[0]);
  const [transitionKey, setTransitionKey] = useState(0);

  const handleGhostSelect = (ghost: Ghost) => {
    if (ghost.isLocked) return;
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
    // LAYER 1: Wood table (full screen background)
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      background: '#3d2817',
      backgroundImage: `url(${woodtable})`,
      backgroundSize: 'cover',
      margin: 0,
      padding: 0,
      overflow: 'auto',
      position: 'relative',
    }}>
        
        {/* Space at top to show table texture */}
        <div style={{ height: isMobile ? '100px' : '150px' }} />
        
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
          {GHOST_DATA.map((ghost) => {
            const isActive = ghost.id === selectedGhost?.id;
            return (
              <button
                key={ghost.id}
                onClick={() => handleGhostSelect(ghost)}
                disabled={ghost.isLocked}
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
                  cursor: ghost.isLocked ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease-in',
                  borderRight: '1px solid rgba(139, 69, 19, 0.3)',
                  borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
                  opacity: ghost.isLocked ? 0.4 : 1,
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
                <span style={{ position: 'relative', zIndex: 1 }}>{ghost.name}</span>
              </button>
            );
          })}
        </div>

        {/* Folder frame - matching BackpackDrawer style */}
        <div style={{
          padding: isMobile ? '20px' : '40px',
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
    </div>
  );
}

function GhostDetails({ ghost, threatColors }: { ghost: Ghost; threatColors: Record<string, string> }) {
  const isMobile = window.innerWidth < 768;
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  if (ghost.isLocked) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
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
        }}>
          <TypewrittenText variant="faded" fontSize="48px">?</TypewrittenText>
        </div>
        <TypewrittenText variant="carbon" fontSize="18px" style={{ marginBottom: '12px' }}>
          UNKNOWN ENTITY
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
            onClick={() => setExpandedImage(ghost.imageUrl!)}
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
              onClick={() => setExpandedImage(null)}
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

      {/* Tool Reactions */}
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
          Tool Reactions
        </TypewrittenText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '16px' }}>
          <div>
            <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ marginBottom: isMobile ? '4px' : '6px', fontWeight: 'bold' }}>
              EMF:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "14px" : "15px"} style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}>
              {ghost.emfReaction}
            </HandwrittenText>
          </div>

          <div>
            <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ marginBottom: isMobile ? '4px' : '6px', fontWeight: 'bold' }}>
              THERMAL:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "14px" : "15px"} style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}>
              {ghost.thermalReaction}
            </HandwrittenText>
          </div>

          <div>
            <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ marginBottom: isMobile ? '4px' : '6px', fontWeight: 'bold' }}>
              AUDIO:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "14px" : "15px"} style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}>
              {ghost.audioReaction}
            </HandwrittenText>
          </div>

          <div>
            <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ marginBottom: isMobile ? '4px' : '6px', fontWeight: 'bold' }}>
              CAMERA:
            </TypewrittenText>
            <HandwrittenText urgency="calm" fontSize={isMobile ? "14px" : "15px"} style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}>
              {ghost.cameraReaction}
            </HandwrittenText>
          </div>
        </div>
      </div>

      {/* Identification Steps */}
      <div>
        <TypewrittenText variant="faded" fontSize={isMobile ? "10px" : "12px"} style={{ 
          marginBottom: isMobile ? '8px' : '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          How to Identify
        </TypewrittenText>
        {ghost.identificationSteps.map((step, i) => (
          <HandwrittenText 
            key={i}
            urgency="calm" 
            fontSize={isMobile ? "14px" : "15px"}
            style={{ 
              marginBottom: isMobile ? '6px' : '12px',
              paddingLeft: i === ghost.identificationSteps.length - 1 ? '0' : (isMobile ? '10px' : '20px'),
              color: i === ghost.identificationSteps.length - 1 ? '#8b0000' : '#1a0f0a',
              fontWeight: i === ghost.identificationSteps.length - 1 ? 'bold' : 'normal',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}
          >
            {step}
          </HandwrittenText>
        ))}
      </div>

      {/* Weaknesses */}
      <div style={{
        background: 'rgba(139, 0, 0, 0.05)',
        padding: isMobile ? '10px' : '20px',
        border: '1px dashed rgba(139, 0, 0, 0.3)',
        transform: 'rotate(0.5deg)',
      }}>
        <TypewrittenText variant="standard" fontSize={isMobile ? "10px" : "12px"} style={{ 
          marginBottom: isMobile ? '6px' : '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8b0000',
          fontWeight: 'bold',
        }}>
          Weaknesses & Notes
        </TypewrittenText>
        {ghost.weaknesses.map((weakness, i) => (
          <HandwrittenText 
            key={i}
            urgency="calm" 
            fontSize={isMobile ? "14px" : "15px"}
            style={{ 
              marginBottom: isMobile ? '4px' : '8px',
              paddingLeft: isMobile ? '10px' : '16px',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: '1.5',
            }}
          >
            • {weakness}
          </HandwrittenText>
        ))}
      </div>
    </div>
  );
}
