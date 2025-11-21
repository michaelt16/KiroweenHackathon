// Profile panel - Game-like Mobile UI (Pokemon Go inspired)
import { ProfileBadge } from '../components/Profile/ProfileBadge';
import { CRTOverlay } from '../components/Effects/CRTOverlay';
import { TopStatusBar } from '../components/HUD/TopStatusBar';

export function ProfilePanel() {
  const level = 1;
  const currentXP = 30;
  const maxXP = 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0f14',
        color: '#cbd5e1',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle CRT Overlay */}
      <CRTOverlay intensity={0.2} scanlineSpacing={4} staticOpacity={0.02} flickerEnabled={false} />
      
      {/* Top Status Bar */}
      <TopStatusBar />
      
      {/* Profile Content */}
      <div style={{ 
        paddingTop: '80px', 
        paddingBottom: '24px',
        paddingLeft: '16px',
        paddingRight: '16px',
        maxWidth: '500px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <ProfileBadge
          username="AGENT_001"
          rank="ROOKIE"
          level={level}
          xp={currentXP}
          xpToNextLevel={maxXP}
          investigationsCompleted={0}
          ghostsCaught={0}
          successRate={0}
        />
      </div>
    </div>
  );
}
