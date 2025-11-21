// Codex screen - Game-like Mobile UI (Pokemon Go inspired)
import { GhostCodex } from '../components/Codex/GhostCodex';
import { CRTOverlay } from '../components/Effects/CRTOverlay';
import { TopStatusBar } from '../components/HUD/TopStatusBar';

export function CodexScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0f14',
        color: '#cbd5e1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle CRT Overlay */}
      <CRTOverlay intensity={0.2} scanlineSpacing={4} staticOpacity={0.02} flickerEnabled={false} />
      
      {/* Top Status Bar */}
      <TopStatusBar />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        paddingTop: '80px',
      }}>
        <GhostCodex />
      </div>
    </div>
  );
}
