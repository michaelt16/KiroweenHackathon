// GhostCodex - Wood table wrapper + GhostCodexContent
// This is the /codex route component that shows the manila folder on a wood table

import { GhostCodexContent } from './GhostCodexContent';
import woodtable from '../../assets/texture/woodtable.png';

export function GhostCodex() {
  const isMobile = window.innerWidth < 768;

  return (
    // LAYER 1: Wood table (full screen background)
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      background: '#3d2817',
      backgroundImage: `url(${woodtable})`,
      backgroundSize: 'cover',
      margin: 0,
      padding: 0,
      overflow: 'auto',
      position: 'relative',
    }}>
      {/* Space at top to show table texture */}
      <div style={{ height: isMobile ? '100px' : '150px' }} />
      
      {/* Manila folder content */}
      <GhostCodexContent />
    </div>
  );
}
