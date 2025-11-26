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
import { RadarToolMock } from './tools/RadarToolMock';
import { EMFMeterMock } from './tools/EMFMeterMock';
import { ThermalScannerMock } from './tools/ThermalScannerMock';
import { SpiritBoxMock } from './tools/SpiritBoxMock';
import { CameraViewfinderMock } from './tools/CameraViewfinderMock';
import { RadarToolTest } from './tools/RadarToolTest';
import { IconVariationsMock } from './IconVariationsMock';
import { MapVariationsMock } from './MapVariationsMock';
import { CorkboardMapView } from './CorkboardMapView';
import { PhysicalToolDeviceTest } from './PhysicalToolDeviceTest';
import { MechanicalFilmCounterDemo } from './MechanicalFilmCounterDemo';
import { LEDBoostGaugeDemo } from './LEDBoostGaugeDemo';
import { AnalogCharmsIndicatorDemo } from './AnalogCharmsIndicatorDemo';
import { InvestigationDrawerMock } from './InvestigationDrawerMock';

type Screen = 'profile' | 'codex' | 'investigation' | 'map' | 'horror-ghost' | 'horror-notes' | 'horror-evidence' | 'horror-id' | 'horror-id-texture' | 'horror-map' | 'horror-codex' | 'horror-investigation' | 'example-codex' | 'example-report' | 'example-case' | 'codex-journal' | 'component-system' | 'investigation-log' | 'ghost-codex-book' | 'profile-cork' | 'profile-clipboard' | 'media-1' | 'media-2' | 'media-3' | 'media-4' | 'tool-radar' | 'tool-radar-test' | 'tool-emf' | 'tool-thermal' | 'tool-spirit' | 'tool-camera' | 'icon-variations' | 'map-variations' | 'corkboard-map' | 'physical-tool-device-test' | 'mechanical-film-counter' | 'led-boost-gauge' | 'analog-charms-indicator' | 'investigation-drawer';
type Style = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export function PlaygroundRouter() {
  const [activeScreen, setActiveScreen] = useState<Screen>('profile');
  const [activeStyle, setActiveStyle] = useState<Style>('A');
  const [navbarExpanded, setNavbarExpanded] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setNavbarExpanded(!navbarExpanded)}
        style={{
          position: 'fixed',
          top: '8px',
          left: '8px',
          zIndex: 1001,
          padding: '8px 12px',
          background: '#1a1a1a',
          color: '#fff',
          border: '2px solid #333',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
        title={navbarExpanded ? 'Collapse navbar' : 'Expand navbar'}
      >
        {navbarExpanded ? '▼' : '▲'}
      </button>

      {/* Control Panel */}
      {navbarExpanded && (
        <div style={{ 
          background: '#1a1a1a', 
          padding: '16px', 
          borderBottom: '2px solid #333',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1000,
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

          {/* Investigation Tools Section */}
          <div style={{ 
            borderLeft: '2px solid #f59e0b', 
            marginLeft: '8px', 
            paddingLeft: '12px',
            display: 'flex',
            gap: '8px',
          }}>
            <button
              onClick={() => setActiveScreen('tool-radar')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-radar' ? '#f59e0b' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📡 Radar
            </button>
            <button
              onClick={() => setActiveScreen('tool-radar-test')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-radar-test' ? '#22c55e' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📡 Radar (NEW)
            </button>
            <button
              onClick={() => setActiveScreen('tool-emf')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-emf' ? '#f59e0b' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ⚡ EMF Meter
            </button>
            <button
              onClick={() => setActiveScreen('tool-thermal')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-thermal' ? '#f59e0b' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🌡️ Thermal
            </button>
            <button
              onClick={() => setActiveScreen('tool-spirit')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-spirit' ? '#f59e0b' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📻 Spirit Box
            </button>
            <button
              onClick={() => setActiveScreen('tool-camera')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'tool-camera' ? '#f59e0b' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📷 Camera
            </button>
          </div>
        </div>

        {/* UI Rework Section */}
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #333' }}>
          <div style={{ color: '#999', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            UI Rework
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveScreen('physical-tool-device-test')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'physical-tool-device-test' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔧 Physical Tool Device
            </button>
            <button
              onClick={() => setActiveScreen('mechanical-film-counter')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'mechanical-film-counter' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🎞️ Film Counter
            </button>
            <button
              onClick={() => setActiveScreen('led-boost-gauge')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'led-boost-gauge' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ⚡ LED Boost Gauge
            </button>
            <button
              onClick={() => setActiveScreen('analog-charms-indicator')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'analog-charms-indicator' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔮 Charms Indicator
            </button>
            <button
              onClick={() => setActiveScreen('icon-variations')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'icon-variations' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🎨 Icon Variations
            </button>
            <button
              onClick={() => setActiveScreen('map-variations')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'map-variations' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🗺️ Map Variations
            </button>
            <button
              onClick={() => setActiveScreen('corkboard-map')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'corkboard-map' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📌 Corkboard Map
            </button>
            <button
              onClick={() => setActiveScreen('investigation-drawer')}
              style={{
                padding: '8px 16px',
                background: activeScreen === 'investigation-drawer' ? '#10b981' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🎒 Investigation Drawer
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
      )}

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
        {activeScreen === 'tool-radar' && <RadarToolMock />}
        {activeScreen === 'tool-radar-test' && <RadarToolTest />}
        {activeScreen === 'tool-emf' && <EMFMeterMock />}
        {activeScreen === 'tool-thermal' && <ThermalScannerMock />}
        {activeScreen === 'tool-spirit' && <SpiritBoxMock />}
        {activeScreen === 'tool-camera' && <CameraViewfinderMock />}
        {activeScreen === 'physical-tool-device-test' && <PhysicalToolDeviceTest />}
        {activeScreen === 'mechanical-film-counter' && <MechanicalFilmCounterDemo />}
        {activeScreen === 'led-boost-gauge' && <LEDBoostGaugeDemo />}
        {activeScreen === 'analog-charms-indicator' && <AnalogCharmsIndicatorDemo />}
        {activeScreen === 'icon-variations' && <IconVariationsMock />}
        {activeScreen === 'map-variations' && <MapVariationsMock />}
        {activeScreen === 'corkboard-map' && <CorkboardMapView />}
        {activeScreen === 'investigation-drawer' && <InvestigationDrawerMock />}
      </div>
    </div>
  );
}
