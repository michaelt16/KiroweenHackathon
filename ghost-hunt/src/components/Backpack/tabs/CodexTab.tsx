import React, { useState } from 'react';
import type { BackpackMode } from '../types';
import { BinderView } from '../../analog/templates/BinderView';
import { PolaroidPhoto } from '../../analog/elements/PolaroidPhoto';

interface GhostEntry {
  id: string;
  name: string;
  threat: 'LOW' | 'MEDIUM' | 'HIGH';
  speed: 'SLOW' | 'NORMAL' | 'FAST';
  evidence: string[];
  description: string;
  discovered: boolean;
  photoUrl?: string;
  category: string;
}

const GHOST_ENTRIES: GhostEntry[] = [
  {
    id: 'wraith',
    name: 'WRAITH',
    threat: 'HIGH',
    speed: 'FAST',
    evidence: ['EMF 5', 'Freezing', 'Spirit Box'],
    description: 'Very fast entity. Difficult to track. Can teleport.',
    discovered: true,
    photoUrl: '/assets/images/ghost1.png',
    category: 'aggressive',
  },
  {
    id: 'shade',
    name: 'SHADE',
    threat: 'LOW',
    speed: 'SLOW',
    evidence: ['Freezing', 'Ghost Writing', 'EMF 5'],
    description: 'Shy ghost. Rarely aggressive. Prefers solitude.',
    discovered: true,
    category: 'passive',
  },
  {
    id: 'poltergeist',
    name: 'POLTERGEIST',
    threat: 'MEDIUM',
    speed: 'NORMAL',
    evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
    description: 'Throws objects. Creates disturbances. Feeds on chaos.',
    discovered: false,
    category: 'aggressive',
  },
  {
    id: 'banshee',
    name: 'BANSHEE',
    threat: 'HIGH',
    speed: 'NORMAL',
    evidence: ['Fingerprints', 'Ghost Orbs', 'Freezing'],
    description: 'Targets one person. Deadly scream. Hunts relentlessly.',
    discovered: true,
    category: 'aggressive',
  },
  {
    id: 'demon',
    name: 'DEMON',
    threat: 'HIGH',
    speed: 'FAST',
    evidence: ['Freezing', 'Ghost Writing', 'Spirit Box'],
    description: 'Most dangerous. Attacks frequently. Extremely aggressive.',
    discovered: false,
    category: 'aggressive',
  },
  {
    id: 'peccy',
    name: 'PECCY',
    threat: 'HIGH',
    speed: 'FAST',
    evidence: ['???', '???', '???', '???', '???'],
    description: '??????? ???????? ??????? EXTREMELY DANGEROUS. Origin unknown. Behavior unpredictable. DO NOT APPROACH. ??????? ???????? ???????',
    discovered: false,
    photoUrl: undefined, // No image - will show ??? placeholder
    category: 'aggressive',
  },
];

interface CodexTabProps {
  mode: BackpackMode;
  ghosts?: GhostEntry[];
}

const CodexTab: React.FC<CodexTabProps> = ({
  mode,
  ghosts = GHOST_ENTRIES,
}) => {
  const [selectedGhost, setSelectedGhost] = useState<GhostEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const isReadOnly = mode === 'investigation';

  // Filter ghosts by category
  const filteredGhosts = activeCategory === 'all' 
    ? ghosts 
    : ghosts.filter(g => g.category === activeCategory);

  // Binder tabs for ghost categories
  const binderTabs = [
    { id: 'all', label: 'ALL', color: '#d8d4c8' },
    { id: 'aggressive', label: 'AGGRESSIVE', color: '#e8d4c4' },
    { id: 'passive', label: 'PASSIVE', color: '#d8e4d4' },
  ];

  const handleGhostClick = (ghost: GhostEntry) => {
    if (ghost.discovered) {
      setSelectedGhost(ghost);
    }
  };

  const handleCloseDetail = () => {
    setSelectedGhost(null);
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'HIGH': return '#cc0000';
      case 'MEDIUM': return '#ff8800';
      case 'LOW': return '#ffaa00';
      default: return '#4a3a2a';
    }
  };

  return (
    <>
      <BinderView
        tabs={binderTabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
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
            borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
            paddingBottom: '8px',
            marginBottom: '16px',
          }}
        >
          📖 GHOST CODEX
          {isReadOnly && (
            <span
              style={{
                fontSize: '11px',
                marginLeft: '12px',
                color: '#4a3a2a',
                fontWeight: 'normal',
              }}
            >
              (READ-ONLY)
            </span>
          )}
        </div>

        {/* Ghost list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredGhosts.map((ghost) => (
            <div
              key={ghost.id}
              onClick={() => handleGhostClick(ghost)}
              style={{
                padding: '16px',
                background: ghost.discovered ? '#e8e4dc' : 'rgba(139, 69, 19, 0.1)',
                border: ghost.discovered ? '2px solid rgba(139, 69, 19, 0.4)' : '2px dashed rgba(139, 69, 19, 0.3)',
                borderRadius: '6px',
                cursor: ghost.discovered ? 'pointer' : 'not-allowed',
                opacity: ghost.discovered ? 1 : 0.5,
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Texture overlay */}
              {ghost.discovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                    opacity: 0.3,
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
                {/* Photo/Silhouette - Using PolaroidPhoto component */}
                <div style={{ flexShrink: 0 }}>
                  {ghost.discovered && ghost.photoUrl ? (
                    <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center' }}>
                      <PolaroidPhoto
                        src={ghost.photoUrl}
                        caption={ghost.name.toLowerCase()}
                        damage="medium"
                        withTape={false}
                        seed={ghost.id}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        background: '#1a1a1a',
                        border: '3px solid #e8e4dc',
                        padding: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        opacity: 0.3,
                      }}
                    >
                      👻
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  {/* Name */}
                  <div
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1a0f0a',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ghost.discovered ? ghost.name : '???'}
                  </div>

                  {ghost.discovered && (
                    <>
                      {/* Stats */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: '"Courier New", monospace',
                            fontSize: '11px',
                            color: getThreatColor(ghost.threat),
                            fontWeight: 'bold',
                          }}
                        >
                          THREAT: {ghost.threat}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Courier New", monospace',
                            fontSize: '11px',
                            color: '#4a3a2a',
                          }}
                        >
                          SPEED: {ghost.speed}
                        </div>
                      </div>

                      {/* Evidence */}
                      <div
                        style={{
                          fontFamily: '"Caveat", cursive',
                          fontSize: '12px',
                          color: '#4a3a2a',
                          lineHeight: '1.6',
                        }}
                      >
                        Evidence: {ghost.evidence.join(', ')}
                      </div>
                    </>
                  )}

                  {!ghost.discovered && (
                    <div
                      style={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: '13px',
                        color: '#4a3a2a',
                        fontStyle: 'italic',
                      }}
                    >
                      Not yet discovered
                    </div>
                  )}
                </div>
              </div>

              {/* Tape decoration */}
              {ghost.discovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '20%',
                    width: '40px',
                    height: '12px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    transform: 'rotate(3deg)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </BinderView>

      {/* Detail view */}
      {selectedGhost && (
        <div
          onClick={handleCloseDetail}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '500px',
              width: '100%',
              background: '#d8d4c8',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              maxHeight: '80vh',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1a0f0a',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              {selectedGhost.name}
            </div>

            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '15px',
                color: '#1a0f0a',
                lineHeight: '1.8',
                marginBottom: '16px',
              }}
            >
              {selectedGhost.description}
            </div>

            <button
              onClick={handleCloseDetail}
              style={{
                padding: '10px 20px',
                background: '#8b7355',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CodexTab;
