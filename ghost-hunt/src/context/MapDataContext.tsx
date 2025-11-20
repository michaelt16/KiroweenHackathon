// Map data context for tool nodes and hotspots
import { createContext, useContext, useState, ReactNode } from 'react';
import type { ToolNode, Hotspot } from '../types/game';
import { MOCK_TOOL_NODES, MOCK_HOTSPOTS } from '../data/mockData';

interface MapDataContextType {
  toolNodes: ToolNode[];
  hotspots: Hotspot[];
  removeToolNode: (id: string) => void;
}

const MapDataContext = createContext<MapDataContextType | undefined>(undefined);

export function MapDataProvider({ children }: { children: ReactNode }) {
  const [toolNodes, setToolNodes] = useState<ToolNode[]>(MOCK_TOOL_NODES);
  const [hotspots] = useState<Hotspot[]>(MOCK_HOTSPOTS);

  const removeToolNode = (id: string) => {
    setToolNodes((prev) => prev.filter((node) => node.id !== id));
  };

  return (
    <MapDataContext.Provider value={{ toolNodes, hotspots, removeToolNode }}>
      {children}
    </MapDataContext.Provider>
  );
}

export function useMapData() {
  const context = useContext(MapDataContext);
  if (!context) {
    throw new Error('useMapData must be used within MapDataProvider');
  }
  return context;
}
