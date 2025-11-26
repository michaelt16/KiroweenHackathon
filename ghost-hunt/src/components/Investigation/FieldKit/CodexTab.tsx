// Codex Tab - Ghost Encyclopedia (Production)
import React from 'react';
import { GhostCodexContent } from '../../Codex/GhostCodexContent';

export function CodexTab() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }}>
      <GhostCodexContent />
    </div>
  );
}
