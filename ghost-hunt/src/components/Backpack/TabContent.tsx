import React, { Suspense, lazy, useEffect, useState } from 'react';
import type { BackpackMode } from './types';
import type { Tab } from './TabBar';

// Lazy load tab components
const ToolsTab = lazy(() => import('./tabs/ToolsTab'));
const PhotosTab = lazy(() => import('./tabs/PhotosTab'));
const EvidenceDeductionTab = lazy(() => import('./tabs/EvidenceDeductionTab'));
const FieldJournalTab = lazy(() => import('./tabs/FieldJournalTab'));
const CodexTab = lazy(() => import('./tabs/CodexTab'));
const InventoryTab = lazy(() => import('./tabs/InventoryTab'));
const ProfileTab = lazy(() => import('./tabs/ProfileTab'));
const SettingsTab = lazy(() => import('./tabs/SettingsTab'));

// Tab configurations
export const OVERWORLD_TABS: Tab[] = [
  { id: 'inventory', label: 'INVENTORY', icon: '🎒' },
  { id: 'codex', label: 'CODEX', icon: '📖' },
  { id: 'profile', label: 'PROFILE', icon: '🆔' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️' },
];

export const INVESTIGATION_TABS: Tab[] = [
  { id: 'tools', label: 'TOOLS', icon: '🔧' },
  { id: 'photos', label: 'PHOTOS', icon: '📸' },
  { id: 'evidence', label: 'EVIDENCE', icon: '🔍' },
  { id: 'journal', label: 'JOURNAL', icon: '📝' },
  { id: 'codex', label: 'CODEX', icon: '📖' },
];

interface TabContentProps {
  mode: BackpackMode;
  activeTab: string;
  onToolSelect?: (toolId: string) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  mode,
  activeTab,
  onToolSelect,
}) => {
  const [preloadedTabs, setPreloadedTabs] = useState<Set<string>>(new Set([activeTab]));
  const [unloadTimer, setUnloadTimer] = useState<NodeJS.Timeout | null>(null);

  // Preload adjacent tabs
  useEffect(() => {
    const tabs = mode === 'overworld' ? OVERWORLD_TABS : INVESTIGATION_TABS;
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    if (currentIndex !== -1) {
      const adjacentTabs = new Set<string>([activeTab]);
      
      // Preload previous tab
      if (currentIndex > 0) {
        adjacentTabs.add(tabs[currentIndex - 1].id);
      }
      
      // Preload next tab
      if (currentIndex < tabs.length - 1) {
        adjacentTabs.add(tabs[currentIndex + 1].id);
      }
      
      setPreloadedTabs(adjacentTabs);
    }
  }, [activeTab, mode]);

  // Unload inactive tabs after 5 seconds
  useEffect(() => {
    if (unloadTimer) {
      clearTimeout(unloadTimer);
    }

    const timer = setTimeout(() => {
      setPreloadedTabs(new Set([activeTab]));
    }, 5000);

    setUnloadTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeTab]);

  const renderTabContent = () => {
    const shouldRender = preloadedTabs.has(activeTab);
    
    if (!shouldRender) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }

    switch (activeTab) {
      // Investigation mode tabs
      case 'tools':
        return <ToolsTab onToolSelect={onToolSelect} />;
      case 'photos':
        return <PhotosTab />;
      case 'evidence':
        return <EvidenceDeductionTab />;
      case 'journal':
        return <FieldJournalTab />;
      
      // Overworld mode tabs
      case 'inventory':
        return <InventoryTab />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      
      // Shared tabs
      case 'codex':
        return <CodexTab mode={mode} />;
      
      default:
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Tab not found: {activeTab}
          </div>
        );
    }
  };

  return (
    <div
      className="tab-content"
      style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              fontFamily: '"Courier New", monospace',
              color: '#4a3a2a',
            }}
          >
            Loading...
          </div>
        }
      >
        <div
          style={{
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          {renderTabContent()}
        </div>
      </Suspense>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tab-content::-webkit-scrollbar {
          width: 8px;
        }

        .tab-content::-webkit-scrollbar-track {
          background: rgba(139, 69, 19, 0.2);
        }

        .tab-content::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.5);
          border-radius: 4px;
        }

        .tab-content::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.7);
        }
      `}</style>
    </div>
  );
};
