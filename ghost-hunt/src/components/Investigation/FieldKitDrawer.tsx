// Field Kit Drawer - Tablet-style UI with tabs
import { useState } from 'react';
import { ToolsTab } from './FieldKit/ToolsTab';
import { PhotosTab } from './FieldKit/PhotosTab';
import { EvidenceTab } from './FieldKit/EvidenceTab';
import { CodexTab } from './FieldKit/CodexTab';

type TabType = 'tools' | 'photos' | 'evidence' | 'codex';

interface FieldKitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeToolIcon?: string; // Icon to display in handle
}

export function FieldKitDrawer({ isOpen, onClose, activeToolIcon = '📡' }: FieldKitDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tools');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'tools', label: 'Tools', icon: '🔧' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'evidence', label: 'Evidence', icon: '📋' },
    { id: 'codex', label: 'Codex', icon: '📖' },
  ];

  return (
    <>
      {/* Handle - Always visible */}
      <div
        onClick={() => !isOpen && onClose()}
        style={{
          position: 'fixed',
          bottom: isOpen ? '400px' : '0',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          width: '120px',
          height: '40px',
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          border: '2px solid rgba(45, 212, 191, 0.3)',
          borderBottom: 'none',
          transition: 'bottom 0.3s ease-out',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Active Tool Icon */}
        <span style={{ fontSize: '20px' }}>{activeToolIcon}</span>
        
        {/* Handle Indicator */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: 'rgba(45, 212, 191, 0.5)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          bottom: isOpen ? '0' : '-400px',
          left: '0',
          right: '0',
          height: '400px',
          backgroundColor: 'rgba(11, 15, 26, 0.98)',
          borderTop: '2px solid rgba(45, 212, 191, 0.3)',
          zIndex: 1999,
          transition: 'bottom 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Tab Headers */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(45, 212, 191, 0.2)',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 8px',
                backgroundColor: activeTab === tab.id ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#2dd4bf' : '#9ca3af',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #2dd4bf' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '20px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
          }}
        >
          {activeTab === 'tools' && <ToolsTab onSelectTool={onClose} />}
          {activeTab === 'photos' && <PhotosTab />}
          {activeTab === 'evidence' && <EvidenceTab />}
          {activeTab === 'codex' && <CodexTab />}
        </div>
      </div>
    </>
  );
}
