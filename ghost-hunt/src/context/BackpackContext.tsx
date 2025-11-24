import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { BackpackMode, BackpackState } from '../components/Backpack/types';

interface BackpackContextType {
  backpackState: BackpackState;
  openBackpack: () => void;
  closeBackpack: () => void;
  toggleBackpack: () => void;
  setActiveTab: (tab: string) => void;
  setMode: (mode: BackpackMode) => void;
}

const BackpackContext = createContext<BackpackContextType | undefined>(undefined);

export const useBackpack = () => {
  const context = useContext(BackpackContext);
  if (!context) {
    throw new Error('useBackpack must be used within BackpackProvider');
  }
  return context;
};

interface BackpackProviderProps {
  children: ReactNode;
  initialMode?: BackpackMode;
}

export const BackpackProvider: React.FC<BackpackProviderProps> = ({
  children,
  initialMode = 'overworld',
}) => {
  const [backpackState, setBackpackState] = useState<BackpackState>({
    isOpen: false,
    activeTab: initialMode === 'overworld' ? 'inventory' : 'tools',
    mode: initialMode,
    lastOverworldTab: 'inventory',
    lastInvestigationTab: 'tools',
  });

  const openBackpack = useCallback(() => {
    setBackpackState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const closeBackpack = useCallback(() => {
    setBackpackState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const toggleBackpack = useCallback(() => {
    setBackpackState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    setBackpackState((prev) => {
      const newState = { ...prev, activeTab: tab };
      
      // Update last active tab for current mode
      if (prev.mode === 'overworld') {
        newState.lastOverworldTab = tab;
      } else {
        newState.lastInvestigationTab = tab;
      }
      
      return newState;
    });
  }, []);

  const setMode = useCallback((mode: BackpackMode) => {
    setBackpackState((prev) => ({
      ...prev,
      mode,
      // Switch to last active tab for new mode
      activeTab: mode === 'overworld' ? prev.lastOverworldTab : prev.lastInvestigationTab,
    }));
  }, []);

  // Persist state to localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem('backpackState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setBackpackState((prev) => ({
          ...prev,
          lastOverworldTab: parsed.lastOverworldTab || 'inventory',
          lastInvestigationTab: parsed.lastInvestigationTab || 'tools',
        }));
      } catch (e) {
        console.error('Failed to parse saved backpack state', e);
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('backpackState', JSON.stringify({
      lastOverworldTab: backpackState.lastOverworldTab,
      lastInvestigationTab: backpackState.lastInvestigationTab,
    }));
  }, [backpackState.lastOverworldTab, backpackState.lastInvestigationTab]);

  return (
    <BackpackContext.Provider
      value={{
        backpackState,
        openBackpack,
        closeBackpack,
        toggleBackpack,
        setActiveTab,
        setMode,
      }}
    >
      {children}
    </BackpackContext.Provider>
  );
};
