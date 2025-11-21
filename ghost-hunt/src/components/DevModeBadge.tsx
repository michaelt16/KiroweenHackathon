// Dev Mode badge component
import { useGameState } from '../context/GameStateContext';

export function DevModeBadge() {
  const { devModeEnabled, setDevModeEnabled } = useGameState();

  const handleToggle = () => {
    const newState = !devModeEnabled;
    console.log('🔧 Dev Mode toggled:', newState);
    setDevModeEnabled(newState);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '70px',
        right: '12px',
        zIndex: 1000,
        backgroundColor: devModeEnabled ? 'rgba(255, 107, 107, 0.9)' : 'rgba(74, 85, 104, 0.9)',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        border: `1px solid ${devModeEnabled ? 'rgba(255, 107, 107, 0.5)' : 'rgba(74, 85, 104, 0.5)'}`,
        backdropFilter: 'blur(4px)',
      }}
    >
      <span>{devModeEnabled ? '🔧 DEV MODE' : '🔒 NORMAL MODE'}</span>
      <button
        onClick={handleToggle}
        style={{
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        {devModeEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
