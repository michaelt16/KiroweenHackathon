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
      {/* Handle - Always visible - Game-like */}
      <div
        onClick={() => !isOpen && onClose()}
        style={{
          position: 'fixed',
          bottom: isOpen ? '400px' : '0',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          width: '140px',
          height: '48px',
          background: isOpen 
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 26, 0.98) 100%)'
            : 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 26, 0.95) 100%)',
          borderTopLeftRadius: '18px',
          borderTopRightRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          border: `3px solid ${isOpen ? 'rgba(45, 212, 191, 0.5)' : 'rgba(45, 212, 191, 0.3)'}`,
          borderBottom: 'none',
          transition: 'all 0.3s ease-out',
          boxShadow: isOpen
            ? '0 -6px 20px rgba(0, 0, 0, 0.5), 0 0 16px rgba(45, 212, 191, 0.2)'
            : '0 -4px 16px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.5)';
            e.currentTarget.style.boxShadow = '0 -6px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(45, 212, 191, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.3)';
            e.currentTarget.style.boxShadow = '0 -4px 16px rgba(0, 0, 0, 0.4)';
          }
        }}
      >
        {/* Active Tool Icon */}
        <span style={{ 
          fontSize: '24px',
          filter: 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.5))',
        }}>
          {activeToolIcon}
        </span>
        
        {/* Handle Indicator */}
        <div
          style={{
            width: '48px',
            height: '5px',
            background: isOpen 
              ? 'linear-gradient(90deg, rgba(45, 212, 191, 0.3) 0%, rgba(45, 212, 191, 0.7) 50%, rgba(45, 212, 191, 0.3) 100%)'
              : 'rgba(45, 212, 191, 0.5)',
            borderRadius: '3px',
            boxShadow: isOpen ? '0 0 8px rgba(45, 212, 191, 0.4)' : 'none',
          }}
        />
      </div>

      {/* Drawer - Game-like */}
      <div
        style={{
          position: 'fixed',
          bottom: isOpen ? '0' : '-400px',
          left: '0',
          right: '0',
          height: '400px',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 26, 0.98) 100%)',
          borderTop: '3px solid rgba(45, 212, 191, 0.4)',
          zIndex: 1999,
          transition: 'bottom 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 
            '0 -8px 32px rgba(0, 0, 0, 0.6), ' +
            '0 0 24px rgba(45, 212, 191, 0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Tab Headers - Game-like */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid rgba(45, 212, 191, 0.3)',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(10, 15, 26, 0.9) 100%)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '14px 8px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(180deg, rgba(45, 212, 191, 0.15) 0%, rgba(45, 212, 191, 0.05) 100%)'
                  : 'transparent',
                color: activeTab === tab.id ? 'rgba(45, 212, 191, 1)' : 'rgba(156, 163, 175, 0.7)',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid rgba(45, 212, 191, 0.8)' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 'bold' : '600',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                fontFamily: 'Courier New, monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = 'rgba(45, 212, 191, 0.8)';
                  e.currentTarget.style.background = 'rgba(45, 212, 191, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = 'rgba(156, 163, 175, 0.7)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ 
                fontSize: '22px',
                filter: activeTab === tab.id ? 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.6))' : 'none',
                transition: 'filter 0.2s ease',
              }}>
                {tab.icon}
              </span>
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
