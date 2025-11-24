import React, { useState } from 'react';
import { UnifiedBackpack, BackpackMode } from '../components/Backpack';
import { BackpackProvider } from '../context/BackpackContext';

/**
 * Demo component for the Unified Backpack System
 * 
 * This demonstrates:
 * - Context-aware tab rendering (Overworld vs Investigation modes)
 * - Smooth animations and transitions
 * - Analog horror styling
 * - All 8 tab components
 */
const UnifiedBackpackDemo: React.FC = () => {
  const [mode, setMode] = useState<BackpackMode>('overworld');

  const handleToolSelect = (toolId: string) => {
    console.log('Tool selected:', toolId);
  };

  return (
    <BackpackProvider initialMode={mode}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: mode === 'overworld' 
            ? 'linear-gradient(135deg, #2a4a2a 0%, #1a3a1a 100%)'
            : 'linear-gradient(135deg, #1a1a2a 0%, #0a0a1a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          transition: 'background 0.5s ease',
        }}
      >
        {/* Mode indicator */}
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            zIndex: 1001,
          }}
        >
          {mode} MODE
        </div>

        {/* Mode switcher */}
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '12px',
            zIndex: 1001,
          }}
        >
          <button
            onClick={() => setMode('overworld')}
            style={{
              padding: '10px 20px',
              background: mode === 'overworld' ? '#8b7355' : 'rgba(139, 115, 85, 0.3)',
              border: '2px solid #8b7355',
              borderRadius: '6px',
              color: '#fff',
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            OVERWORLD
          </button>
          <button
            onClick={() => setMode('investigation')}
            style={{
              padding: '10px 20px',
              background: mode === 'investigation' ? '#8b7355' : 'rgba(139, 115, 85, 0.3)',
              border: '2px solid #8b7355',
              borderRadius: '6px',
              color: '#fff',
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            INVESTIGATION
          </button>
        </div>

        {/* Instructions */}
        <div
          style={{
            maxWidth: '600px',
            textAlign: 'center',
            color: '#fff',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.8',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>
            🎒 Unified Backpack System Demo
          </h2>
          <p style={{ marginBottom: '12px', opacity: 0.9 }}>
            Click the backpack button at the bottom to open the drawer.
          </p>
          <p style={{ opacity: 0.8 }}>
            Switch between Overworld and Investigation modes to see different tabs.
          </p>
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
              fontSize: '12px',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>OVERWORLD TABS:</div>
            <div>🎒 Inventory • 📖 Codex • 🆔 Profile • ⚙️ Settings</div>
            <div style={{ fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>
              INVESTIGATION TABS:
            </div>
            <div>🔧 Tools • 📸 Photos • 🔍 Evidence • 📝 Journal • 📖 Codex</div>
          </div>
        </div>

        {/* Unified Backpack */}
        <UnifiedBackpack
          mode={mode}
          onToolSelect={handleToolSelect}
        />
      </div>
    </BackpackProvider>
  );
};

export default UnifiedBackpackDemo;
