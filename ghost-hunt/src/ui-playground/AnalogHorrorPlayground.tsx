// Analog Horror Playground - View all the dark mocks
import { useState } from 'react';
import { JournalHorrorMock } from './JournalHorrorMock';
import { EvidenceBoardMock } from './EvidenceBoardMock';
import { CorruptedDatabaseMock } from './CorruptedDatabaseMock';
import { SketchbookProfile } from './sketchbook/SketchbookProfile';
import { SketchbookFieldNotes } from './sketchbook/SketchbookFieldNotes';
import { SketchbookEvidence } from './sketchbook/SketchbookEvidence';
import { AnalogHorrorHybridMock } from './AnalogHorrorHybridMock';

type MockType = 
  | 'journal-ghost' | 'journal-notes' | 'journal-evidence'
  | 'evidence-board'
  | 'corrupted-list' | 'corrupted-entry' | 'corrupted-error'
  | 'sketchbook-profile' | 'sketchbook-notes' | 'sketchbook-evidence'
  | 'hybrid-profile' | 'hybrid-codex' | 'hybrid-map' | 'hybrid-investigation';

export function AnalogHorrorPlayground() {
  const [activeMock, setActiveMock] = useState<MockType>('hybrid-profile');

  const renderMock = () => {
    switch (activeMock) {
      // Journal Horror
      case 'journal-ghost': return <JournalHorrorMock page="ghost-entry" />;
      case 'journal-notes': return <JournalHorrorMock page="player-notes" />;
      case 'journal-evidence': return <JournalHorrorMock page="evidence" />;
      
      // Evidence Board
      case 'evidence-board': return <EvidenceBoardMock />;
      
      // Corrupted Database
      case 'corrupted-list': return <CorruptedDatabaseMock screen="entity-list" />;
      case 'corrupted-entry': return <CorruptedDatabaseMock screen="entity-entry" />;
      case 'corrupted-error': return <CorruptedDatabaseMock screen="error" />;
      
      // Sketchbook
      case 'sketchbook-profile': return <SketchbookProfile />;
      case 'sketchbook-notes': return <SketchbookFieldNotes />;
      case 'sketchbook-evidence': return <SketchbookEvidence />;
      
      // Hybrid
      case 'hybrid-profile': return <AnalogHorrorHybridMock screen="profile" />;
      case 'hybrid-codex': return <AnalogHorrorHybridMock screen="codex" />;
      case 'hybrid-map': return <AnalogHorrorHybridMock screen="map" />;
      case 'hybrid-investigation': return <AnalogHorrorHybridMock screen="investigation" />;
      
      default: return <AnalogHorrorHybridMock screen="profile" />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '12px 20px',
        borderBottom: '2px solid #8b0000',
        maxHeight: '120px',
        overflowY: 'auto',
      }}>
        <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
          🎨 ANALOG HORROR PLAYGROUND
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px' }}>
          {/* Journal Horror */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#999', fontSize: '10px' }}>Journal:</span>
            {[
              { id: 'journal-ghost', label: 'Ghost' },
              { id: 'journal-notes', label: 'Notes' },
              { id: 'journal-evidence', label: 'Evidence' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveMock(btn.id as MockType)}
                style={{
                  padding: '4px 8px',
                  background: activeMock === btn.id ? '#8b0000' : '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Evidence Board */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#999', fontSize: '10px' }}>Board:</span>
            <button
              onClick={() => setActiveMock('evidence-board')}
              style={{
                padding: '4px 8px',
                background: activeMock === 'evidence-board' ? '#8b0000' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px',
              }}
            >
              Evidence
            </button>
          </div>

          {/* Corrupted DB */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#999', fontSize: '10px' }}>Database:</span>
            {[
              { id: 'corrupted-list', label: 'List' },
              { id: 'corrupted-entry', label: 'Entry' },
              { id: 'corrupted-error', label: 'Error' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveMock(btn.id as MockType)}
                style={{
                  padding: '4px 8px',
                  background: activeMock === btn.id ? '#00ff00' : '#333',
                  color: activeMock === btn.id ? '#000' : '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Sketchbook */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#999', fontSize: '10px' }}>Sketchbook:</span>
            {[
              { id: 'sketchbook-profile', label: 'Profile' },
              { id: 'sketchbook-notes', label: 'Notes' },
              { id: 'sketchbook-evidence', label: 'Evidence' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveMock(btn.id as MockType)}
                style={{
                  padding: '4px 8px',
                  background: activeMock === btn.id ? '#8b7355' : '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Hybrid (Recommended) */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#2dd4bf', fontSize: '10px', fontWeight: 'bold' }}>⭐ Hybrid:</span>
            {[
              { id: 'hybrid-profile', label: 'Profile' },
              { id: 'hybrid-codex', label: 'Codex' },
              { id: 'hybrid-map', label: 'Map' },
              { id: 'hybrid-investigation', label: 'Investigation' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveMock(btn.id as MockType)}
                style={{
                  padding: '4px 8px',
                  background: activeMock === btn.id ? '#2dd4bf' : '#333',
                  color: activeMock === btn.id ? '#000' : '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: activeMock === btn.id ? 'bold' : 'normal',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mock Display */}
      <div style={{ flex: 1, overflow: 'auto', background: '#000', paddingTop: '120px' }}>
        {renderMock()}
      </div>
    </div>
  );
}
