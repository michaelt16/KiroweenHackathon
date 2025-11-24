import type { ReactNode } from 'react';
import './ToolFrame.css';

interface ToolFrameProps {
  toolName: string;
  status?: 'active' | 'standby' | 'error';
  children: ReactNode;
}

export function ToolFrame({ toolName, status = 'active', children }: ToolFrameProps) {
  return (
    <div className="tool-frame">
      {/* Header */}
      <div className="tool-frame-header">
        <div className="tool-frame-title">{toolName}</div>
        <div className={`tool-frame-status tool-frame-status-${status}`}>
          {status === 'active' && '● ACTIVE'}
          {status === 'standby' && '○ STANDBY'}
          {status === 'error' && '✕ ERROR'}
        </div>
      </div>

      {/* Content Area */}
      <div className="tool-frame-content">
        {children}
      </div>

      {/* Corner Brackets */}
      <div className="tool-frame-bracket tool-frame-bracket-tl" />
      <div className="tool-frame-bracket tool-frame-bracket-tr" />
      <div className="tool-frame-bracket tool-frame-bracket-bl" />
      <div className="tool-frame-bracket tool-frame-bracket-br" />
    </div>
  );
}
