// Codex screen - Analog Horror UI (Physical journal/case file)
import { GhostCodex } from '../components/Codex/GhostCodex';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';

export function CodexScreen() {
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
      
      {/* Full screen GhostCodex */}
      <GhostCodex />
    </div>
  );
}
