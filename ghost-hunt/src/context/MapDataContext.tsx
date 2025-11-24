// Map data context for supply nodes and hotspots
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SupplyNode, Hotspot, FieldJournalNode } from '../types/game';
import { MOCK_SUPPLY_NODES, MOCK_HOTSPOTS, MOCK_FIELD_JOURNAL_NODES } from '../data/mockData';

interface MapDataContextType {
  supplyNodes: SupplyNode[];
  hotspots: Hotspot[];
  fieldJournalNodes: FieldJournalNode[];
  removeSupplyNode: (id: string) => void;
  removeFieldJournalNode: (id: string) => void;
}

const MapDataContext = createContext<MapDataContextType | undefined>(undefined);

export function MapDataProvider({ children }: { children: ReactNode }) {
  const [supplyNodes, setSupplyNodes] = useState<SupplyNode[]>(MOCK_SUPPLY_NODES);
  const [hotspots] = useState<Hotspot[]>(MOCK_HOTSPOTS);
  const [fieldJournalNodes, setFieldJournalNodes] = useState<FieldJournalNode[]>(MOCK_FIELD_JOURNAL_NODES);

  const removeSupplyNode = (id: string) => {
    console.log('🗑️ Removing supply node:', id);
    setSupplyNodes((prev) => prev.filter((node) => node.id !== id));
  };

  const removeFieldJournalNode = (id: string) => {
    console.log('🗑️ Removing field journal node:', id);
    setFieldJournalNodes((prev) => prev.filter((node) => node.id !== id));
  };

  return (
    <MapDataContext.Provider value={{ supplyNodes, hotspots, fieldJournalNodes, removeSupplyNode, removeFieldJournalNode }}>
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
