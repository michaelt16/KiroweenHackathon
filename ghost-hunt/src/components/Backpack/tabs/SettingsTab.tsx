import React, { useState } from 'react';

interface SettingsTabProps {
  onSettingChange?: (key: string, value: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ onSettingChange }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [devMode, setDevMode] = useState(false);

  const handleToggle = (key: string, currentValue: boolean, setter: (value: boolean) => void) => {
    const newValue = !currentValue;
    setter(newValue);
    onSettingChange?.(key, newValue);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
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
        }}
      >
        ⚙️ SETTINGS
      </div>

      {/* Audio Settings */}
      <div>
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#4a3a2a',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          AUDIO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Sound Effects */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#e8e4dc',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#1a0f0a',
              }}
            >
              Sound Effects
            </span>
            <button
              onClick={() => handleToggle('sound', soundEnabled, setSoundEnabled)}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: '2px solid rgba(139, 69, 19, 0.5)',
                background: soundEnabled ? '#8b7355' : 'rgba(139, 69, 19, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: soundEnabled ? '26px' : '2px',
                  transition: 'left 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>

          {/* Music */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#e8e4dc',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#1a0f0a',
              }}
            >
              Music
            </span>
            <button
              onClick={() => handleToggle('music', musicEnabled, setMusicEnabled)}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: '2px solid rgba(139, 69, 19, 0.5)',
                background: musicEnabled ? '#8b7355' : 'rgba(139, 69, 19, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: musicEnabled ? '26px' : '2px',
                  transition: 'left 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Gameplay Settings */}
      <div>
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#4a3a2a',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          GAMEPLAY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Haptic Feedback */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#e8e4dc',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#1a0f0a',
              }}
            >
              Haptic Feedback
            </span>
            <button
              onClick={() => handleToggle('haptic', hapticEnabled, setHapticEnabled)}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: '2px solid rgba(139, 69, 19, 0.5)',
                background: hapticEnabled ? '#8b7355' : 'rgba(139, 69, 19, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: hapticEnabled ? '26px' : '2px',
                  transition: 'left 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>

          {/* Dev Mode */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#e8e4dc',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '6px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  color: '#1a0f0a',
                  marginBottom: '2px',
                }}
              >
                Dev Mode
              </div>
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '11px',
                  color: '#4a3a2a',
                }}
              >
                Test without GPS
              </div>
            </div>
            <button
              onClick={() => handleToggle('devMode', devMode, setDevMode)}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '13px',
                border: '2px solid rgba(139, 69, 19, 0.5)',
                background: devMode ? '#8b7355' : 'rgba(139, 69, 19, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: devMode ? '26px' : '2px',
                  transition: 'left 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div
        style={{
          marginTop: '12px',
          padding: '16px',
          background: 'rgba(139, 69, 19, 0.08)',
          border: '2px dashed rgba(139, 69, 19, 0.3)',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            color: '#4a3a2a',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          GHOST HUNT v1.0.0
          <br />
          © 2024 Paranormal Investigations
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
