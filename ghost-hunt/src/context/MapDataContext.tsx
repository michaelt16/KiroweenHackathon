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
  resetFieldJournalNodes: () => void;
  setHotspots: (hotspots: Hotspot[]) => void;
  setSupplyNodes: (nodes: SupplyNode[]) => void;
  setFieldJournalNodes: (nodes: FieldJournalNode[]) => void;
}

const MapDataContext = createContext<MapDataContextType | undefined>(undefined);

export function MapDataProvider({ children }: { children: ReactNode }) {
  const [supplyNodes, setSupplyNodesState] = useState<SupplyNode[]>(MOCK_SUPPLY_NODES);
  const [hotspots, setHotspotsState] = useState<Hotspot[]>(MOCK_HOTSPOTS);
  const [fieldJournalNodes, setFieldJournalNodesState] = useState<FieldJournalNode[]>(MOCK_FIELD_JOURNAL_NODES);

  const removeSupplyNode = (id: string) => {
    console.log('🗑️ Removing supply node:', id);
    setSupplyNodesState((prev) => prev.filter((node) => node.id !== id));
  };

  const setSupplyNodes = (nodes: SupplyNode[]) => {
    setSupplyNodesState(nodes);
  };

  const setHotspots = (newHotspots: Hotspot[]) => {
    setHotspotsState(newHotspots);
  };

  const setFieldJournalNodes = (nodes: FieldJournalNode[]) => {
    setFieldJournalNodesState(nodes);
  };

  const removeFieldJournalNode = (id: string) => {
    console.log('🗑️ Removing field journal node:', id);
    setFieldJournalNodesState((prev) => prev.filter((node) => node.id !== id));
  };

  const resetFieldJournalNodes = () => {
    console.log('🔄 Resetting all field journal nodes to map');
    setFieldJournalNodesState([...MOCK_FIELD_JOURNAL_NODES]);
  };

  return (
    <MapDataContext.Provider value={{ 
      supplyNodes, 
      hotspots, 
      fieldJournalNodes, 
      removeSupplyNode, 
      removeFieldJournalNode,
      resetFieldJournalNodes,
      setHotspots,
      setSupplyNodes,
      setFieldJournalNodes
    }}>
      {children}
    </MapDataContext.Provider>
  );
}

export function useMapData() {
  const context = useContext(MapDataContext);
  if (!context) {
    // More helpful error message for debugging
    console.error('MapDataContext is undefined. Make sure MapDataProvider wraps the component.');
    console.trace('Stack trace:');
    throw new Error('useMapData must be used within MapDataProvider. If you see this during hot reload, try refreshing the page.');
  }
  return context;
}
