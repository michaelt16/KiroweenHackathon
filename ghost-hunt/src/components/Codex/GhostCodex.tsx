import { useState } from 'react';
import './GhostCodex.css';

interface Ghost {
  id: string;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  encounterCount: number;
  characteristics: string[];
  imageUrl?: string;
  isLocked: boolean;
}

// Mock data
const MOCK_GHOSTS: Ghost[] = [
  {
    id: '001',
    name: 'WRAITH',
    threatLevel: 'HIGH',
    encounterCount: 3,
    characteristics: ['Fast movement', 'Strong EMF', 'Rare whispers'],
    isLocked: false,
  },
  {
    id: '002',
    name: 'SHADE',
    threatLevel: 'MEDIUM',
    encounterCount: 5,
    characteristics: ['Frequent whispers', 'Cold spots', 'Passive'],
    isLocked: false,
  },
  {
    id: '003',
    name: 'POLTERGEIST',
    threatLevel: 'HIGH',
    encounterCount: 2,
    characteristics: ['Motion spikes', 'Static distortion', 'Aggressive'],
    isLocked: false,
  },
  {
    id: '004',
    name: 'UNKNOWN',
    threatLevel: 'LOW',
    encounterCount: 0,
    characteristics: ['???', '???', '???'],
    isLocked: true,
  },
];

export function GhostCodex() {
  const [selectedGhost, setSelectedGhost] = useState<Ghost>(MOCK_GHOSTS[0]);

  return (
    <div className="ghost-codex">
      {/* Header */}
      <div className="codex-header">
        <div className="codex-title">PARANORMAL DATABASE</div>
        <div className="codex-subtitle">CLASSIFIED</div>
      </div>

      {/* Ghost List */}
      <div className="codex-list">
        {MOCK_GHOSTS.map((ghost) => (
          <button
            key={ghost.id}
            className={`codex-list-item ${selectedGhost.id === ghost.id ? 'active' : ''} ${ghost.isLocked ? 'locked' : ''}`}
            onClick={() => setSelectedGhost(ghost)}
          >
            <span className="codex-list-id">{ghost.id}</span>
            <span className="codex-list-name">{ghost.name}</span>
            <span className="codex-list-threat">{ghost.threatLevel}</span>
          </button>
        ))}
      </div>

      {/* Ghost Card */}
      <div className="codex-card">
        <GhostCard ghost={selectedGhost} />
      </div>
    </div>
  );
}

function GhostCard({ ghost }: { ghost: Ghost }) {
  if (ghost.isLocked) {
    return (
      <div className="ghost-card ghost-card-locked">
        <div className="ghost-image-placeholder">
          <div className="ghost-silhouette">?</div>
        </div>
        <div className="ghost-name">UNKNOWN ENTITY</div>
        <div className="ghost-locked-text">ENCOUNTER TO UNLOCK</div>
      </div>
    );
  }

  return (
    <div className="ghost-card">
      {/* Ghost Image */}
      <div className="ghost-image">
        {ghost.imageUrl ? (
          <img src={ghost.imageUrl} alt={ghost.name} className="ghost-img" />
        ) : (
          <div className="ghost-image-placeholder">
            <div className="ghost-silhouette">👻</div>
          </div>
        )}
      </div>

      {/* Ghost Info */}
      <div className="ghost-info">
        <div className="ghost-name">{ghost.name}</div>
        <div className="ghost-meta">
          <div className="ghost-meta-item">
            <span className="ghost-meta-label">THREAT:</span>
            <span className={`ghost-meta-value threat-${ghost.threatLevel.toLowerCase()}`}>
              {ghost.threatLevel}
            </span>
          </div>
          <div className="ghost-meta-item">
            <span className="ghost-meta-label">ENCOUNTERS:</span>
            <span className="ghost-meta-value">{ghost.encounterCount}</span>
          </div>
        </div>

        {/* Characteristics */}
        <div className="ghost-characteristics">
          <div className="ghost-characteristics-title">CHARACTERISTICS:</div>
          <ul className="ghost-characteristics-list">
            {ghost.characteristics.map((char, i) => (
              <li key={i}>{char}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
