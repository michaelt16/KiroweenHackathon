// Codex screen - Analog Horror UI (Physical journal/case file)
import { GhostCodex } from '../components/Codex/GhostCodex';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';
import { useGhostStore, GhostType } from '../stores/ghostStore';

export function CodexScreen() {
  const { unlockGhost, getAllGhosts } = useGhostStore();
  const allGhosts = getAllGhosts();
  
  // Dev mode: Unlock all ghosts for testing
  const handleUnlockAll = () => {
    Object.values(GhostType).forEach(type => {
      unlockGhost(type);
    });
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Back to Map Button - Floating on top */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
      }}>
        <BackToMapButton />
      </div>
      
      {/* Dev Mode: Unlock All Button - Floating on top right */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <button
          onClick={handleUnlockAll}
          style={{
            padding: '10px 16px',
            background: '#8b0000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          🔓 Unlock All (Dev)
        </button>
      </div>
      
      {/* Full screen GhostCodex */}
      <GhostCodex />
    </div>
  );
}
