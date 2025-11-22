// UI Playground - Visual Style Exploration
// Pure mockups - no functionality, just aesthetics

import { useState } from 'react';
import { ProfileMock } from './ProfileMock';
import { CodexMock } from './CodexMock';
import { InvestigationMock } from './InvestigationMock';
import { MapMock } from './MapMock';
import { JournalHorrorEnhanced } from './JournalHorrorEnhanced';
import { ProfileHorrorID } from './ProfileHorrorID';
import { ProfileHorrorIDTexture } from './ProfileHorrorIDTexture';
import { MapHorror } from './MapHorror';
import { CodexHorror } from './CodexHorror';
import { InvestigationHorror } from './InvestigationHorror';
import { CodexEntryExample } from './examples/CodexEntryExample';
import { InvestigationReportExample } from './examples/InvestigationReportExample';
import { CaseFileExample } from './examples/CaseFileExample';
import { ComponentSystemDemo } from './examples/ComponentSystemDemo';
import { InvestigationLogMock } from './examples/InvestigationLogMock';
import { GhostCodexJournal } from './examples/GhostCodexJournal';
import { ProfileCorkBoard } from './examples/ProfileCorkBoard';
import { ProfileClipboard } from './examples/ProfileClipboard';
import { CodexJournalMobile } from './CodexJournalMobile';
import { MediaMock_1 } from './MediaMock_1';
import { MediaMock_2 } from './MediaMock_2';
import { MediaMock_3 } from './MediaMock_3';
import { MediaMock_4 } from './MediaMock_4';

type Screen = 'profile' | 'codex' | 'investigation' | 'map' | 'horror-ghost' | 'horror-notes' | 'horror-evidence' | 'horror-id' | 'horror-id-texture' | 'horror-map' | 'horror-codex' | 'horror-investigation' | 'example-codex' | 'example-report' | 'example-case' | 'codex-journal' | 'component-system' | 'investigation-log' | 'ghost-codex-book' | 'profile-cork' | 'profile-clipboard' | 'media-1' | 'media-2' | 'media-3' | 'media-4';
type Style = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export function PlaygroundRouter() {
  const [activeScreen, setActiveScreen] = useState<Screen>('profile');
  const [activeStyle, setActiveStyle] = useState<Style>('A');

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Control Panel */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '16px', 
        borderBottom: '2px solid #333',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <div style={{ color: '#fff', fontWeight: 'bold', marginRight: '20px' }}>
          🎨 UI PLAYGROUND
        </div>

        {/* Screen Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveScreen('profile')}
            style={{
              padding: '8px 16px',
              background: activeScreen === 'profile' ? '#2dd4bf' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveScreen('codex')}
            style={{
              padding: '8px 16px',
              background: activeScreen === 'codex' ? '#2dd4bf' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Codex
          </button>
          <button
            onClick={() => setActiveScreen('investigation')}
            style={{
              padding: '8px 16px',
              background: activeScreen === 'investigation' ? '#2dd4bf' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Investigation
          </button>
          <button
            onClick={() => setActiveScreen('map')}
            style={{
              padding: '8px 16px',
              background: activeScreen === 'map' ? '#2dd4bf' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Map
          </button>
          
          {/* Horror Enhanced Section */}
          <div style={{ 
            borderLeft: '2px solid #666', 
            marginLeft: '8px', 
            paddingLeft: '12px',
            display: 'flex',
            gap: '8px',
          }}>
            <button
              onClick={() => setActiveScreen('horror-ghost')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-ghost' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              👻 Horror: Ghost
            </button>
            <button
              onClick={() => setActiveScreen('horror-notes')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-notes' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📝 Horror: Notes
            </button>
            <button
              onClick={() => setActiveScreen('horror-evidence')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-evidence' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📋 Horror: Evidence
            </button>
            <button
              onClick={() => setActiveScreen('horror-id')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-id' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🪪 ID (CSS)
            </button>
            <button
              onClick={() => setActiveScreen('horror-id-texture')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-id-texture' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🪪 ID (Texture)
            </button>
            <button
              onClick={() => setActiveScreen('horror-map')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-map' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🗺️ Map
            </button>
            <button
              onClick={() => setActiveScreen('horror-codex')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-codex' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📖 Codex
            </button>
            <button
              onClick={() => setActiveScreen('horror-investigation')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'horror-investigation' ? '#dc2626' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔍 Investigation
            </button>
          </div>

          {/* Document Examples Section */}
          <div style={{ 
            borderLeft: '2px solid #666', 
            marginLeft: '8px', 
            paddingLeft: '12px',
            display: 'flex',
            gap: '8px',
          }}>
            <button
              onClick={() => setActiveScreen('example-codex')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'example-codex' ? '#8b0000' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📖 Codex Entry
            </button>
            <button
              onClick={() => setActiveScreen('example-report')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'example-report' ? '#8b0000' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📝 Field Report
            </button>
            <button
              onClick={() => setActiveScreen('example-case')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'example-case' ? '#8b0000' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📋 Case File
            </button>
            <button
              onClick={() => setActiveScreen('codex-journal')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'codex-journal' ? '#8b0000' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📕 Codex Journal
            </button>
            <button
              onClick={() => setActiveScreen('component-system')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'component-system' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🧩 Component System
            </button>
            <button
              onClick={() => setActiveScreen('investigation-log')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'investigation-log' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📋 Investigation Log
            </button>
            <button
              onClick={() => setActiveScreen('ghost-codex-book')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'ghost-codex-book' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📖 Ghost Codex Book
            </button>
            <button
              onClick={() => setActiveScreen('profile-cork')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'profile-cork' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📌 Profile Cork Board
            </button>
            <button
              onClick={() => setActiveScreen('profile-clipboard')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'profile-clipboard' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📋 Profile Clipboard
            </button>
          </div>

          {/* Media/Photos Section */}
          <div style={{ 
            borderLeft: '2px solid #666', 
            marginLeft: '8px', 
            paddingLeft: '12px',
            display: 'flex',
            gap: '8px',
          }}>
            <button
              onClick={() => setActiveScreen('media-1')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'media-1' ? '#2dd4bf' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📸 Media 1
            </button>
            <button
              onClick={() => setActiveScreen('media-2')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'media-2' ? '#2dd4bf' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📸 Media 2
            </button>
            <button
              onClick={() => setActiveScreen('media-3')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'media-3' ? '#2dd4bf' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📸 Media 3
            </button>
            <button
              onClick={() => setActiveScreen('media-4')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'media-4' ? '#2dd4bf' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📸 Media 4
            </button>
          </div>
        </div>

        {/* Style Selector */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#999', fontSize: '12px' }}>Style:</span>
          {[
            { id: 'A', label: 'Digital' },
            { id: 'B', label: 'Analog' },
            { id: 'C', label: 'Hybrid' },
            { id: 'D', label: 'Bureau' },
            { id: 'E', label: 'Diary' },
            { id: 'F', label: 'Modern+Notes' },
            { id: 'G', label: 'Premium' },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setActiveStyle(style.id as Style)}
              style={{
                padding: '6px 12px',
                background: activeStyle === style.id ? '#8b5cf6' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              {style.id} - {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mock Display */}
      <div style={{ flex: 1, overflow: 'auto', background: '#0a0a0a' }}>
        {activeScreen === 'profile' && <ProfileMock style={activeStyle} />}
        {activeScreen === 'codex' && <CodexMock style={activeStyle} />}
        {activeScreen === 'investigation' && <InvestigationMock style={activeStyle} />}
        {activeScreen === 'map' && <MapMock style={activeStyle} />}
        {activeScreen === 'horror-ghost' && <JournalHorrorEnhanced page="ghost-entry" />}
        {activeScreen === 'horror-notes' && <JournalHorrorEnhanced page="player-notes" />}
        {activeScreen === 'horror-evidence' && <JournalHorrorEnhanced page="evidence" />}
        {activeScreen === 'horror-id' && <ProfileHorrorID />}
        {activeScreen === 'horror-id-texture' && <ProfileHorrorIDTexture />}
        {activeScreen === 'horror-map' && <MapHorror />}
        {activeScreen === 'horror-codex' && <CodexHorror />}
        {activeScreen === 'horror-investigation' && <InvestigationHorror />}
        {activeScreen === 'example-codex' && <CodexEntryExample />}
        {activeScreen === 'example-report' && <InvestigationReportExample />}
        {activeScreen === 'example-case' && <CaseFileExample />}
        {activeScreen === 'codex-journal' && <CodexJournalMobile />}
        {activeScreen === 'component-system' && <ComponentSystemDemo />}
        {activeScreen === 'investigation-log' && <InvestigationLogMock />}
        {activeScreen === 'ghost-codex-book' && <GhostCodexJournal />}
        {activeScreen === 'profile-cork' && <ProfileCorkBoard />}
        {activeScreen === 'profile-clipboard' && <ProfileClipboard />}
        {activeScreen === 'media-1' && <MediaMock_1 />}
        {activeScreen === 'media-2' && <MediaMock_2 />}
        {activeScreen === 'media-3' && <MediaMock_3 />}
        {activeScreen === 'media-4' && <MediaMock_4 />}
      </div>
    </div>
  );
}
