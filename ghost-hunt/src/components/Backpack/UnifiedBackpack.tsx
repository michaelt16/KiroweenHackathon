import React, { useState, useEffect, useCallback } from 'react';
import { BackpackButton } from './BackpackButton';
import { BackpackDrawer } from './BackpackDrawer';
import { TabBar } from './TabBar';
import { TabContent, OVERWORLD_TABS, INVESTIGATION_TABS } from './TabContent';
import type { BackpackMode, BackpackState } from './types';

export type { BackpackMode, BackpackState };

interface UnifiedBackpackProps {
  mode: BackpackMode;
  onClose?: () => void;
  onToolSelect?: (toolId: string) => void;
}

export const UnifiedBackpack: React.FC<UnifiedBackpackProps> = ({
  mode,
  onClose,
  onToolSelect,
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');
  const [lastOverworldTab, setLastOverworldTab] = useState('inventory');
  const [lastInvestigationTab, setLastInvestigationTab] = useState('tools');

  // Initialize active tab based on mode
  useEffect(() => {
    if (mode === 'overworld') {
      setActiveTab(lastOverworldTab);
    } else {
      setActiveTab(lastInvestigationTab);
    }
  }, [mode, lastOverworldTab, lastInvestigationTab]);

  // Context switching logic
  const handleModeChange = useCallback(() => {
    if (mode === 'overworld') {
      setActiveTab(lastOverworldTab);
    } else {
      setActiveTab(lastInvestigationTab);
    }
  }, [mode, lastOverworldTab, lastInvestigationTab]);

  useEffect(() => {
    handleModeChange();
  }, [handleModeChange]);

  // Toggle backpack open/close
  const toggleBackpack = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Handle tab switching
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    
    // Save last active tab for current mode
    if (mode === 'overworld') {
      setLastOverworldTab(tabId);
    } else {
      setLastInvestigationTab(tabId);
    }
  }, [mode]);

  // Handle close
  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // Handle tool selection (closes backpack)
  const handleToolSelect = useCallback((toolId: string) => {
    onToolSelect?.(toolId);
    handleClose();
  }, [onToolSelect, handleClose]);

  // Get tabs for current mode
  const tabs = mode === 'overworld' ? OVERWORLD_TABS : INVESTIGATION_TABS;

  return (
    <div className="unified-backpack">
      <BackpackButton isOpen={isOpen} onClick={toggleBackpack} />

      <BackpackDrawer isOpen={isOpen} onClose={handleClose}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <TabContent
          mode={mode}
          activeTab={activeTab}
          onToolSelect={handleToolSelect}
        />
      </BackpackDrawer>
    </div>
  );
};
