// Game state context for player position, dev mode, and inventory
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Position, InventoryItem, ToolType } from '../types/game';
import { DEFAULT_POSITION } from '../data/mockData';

interface GameState {
  playerPosition: Position;
  devModeEnabled: boolean;
  inventory: InventoryItem[];
}

interface GameStateContextType extends GameState {
  setPlayerPosition: (position: Position) => void;
  setDevModeEnabled: (enabled: boolean) => void;
  addToInventory: (toolType: ToolType) => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [playerPosition, setPlayerPosition] = useState<Position>(DEFAULT_POSITION);
  const [devModeEnabled, setDevModeEnabled] = useState<boolean>(true); // Default to true for demo
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const handleSetPlayerPosition = (position: Position) => {
    console.log('📍 Player position updated:', position);
    setPlayerPosition(position);
  };

  const handleSetDevModeEnabled = (enabled: boolean) => {
    console.log('🔧 Dev mode state changed:', enabled);
    setDevModeEnabled(enabled);
  };

  const addToInventory = (toolType: ToolType) => {
    console.log('🎒 Adding to inventory:', toolType);
    setInventory((prev) => {
      const existing = prev.find((item) => item.type === toolType);
      if (existing) {
        return prev.map((item) =>
          item.type === toolType ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { type: toolType, quantity: 1 }];
    });
  };

  return (
    <GameStateContext.Provider
      value={{
        playerPosition,
        devModeEnabled,
        inventory,
        setPlayerPosition: handleSetPlayerPosition,
        setDevModeEnabled: handleSetDevModeEnabled,
        addToInventory,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within GameStateProvider');
  }
  return context;
}
