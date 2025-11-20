// Investigation state context
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  GhostType,
  InvestigationState,
  GhostPosition,
  Anomaly,
  AnomalyType,
  InvestigationMode,
} from '../types/investigation';

type ToolId = 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';

interface InvestigationContextType extends InvestigationState {
  activeTool: ToolId;
  setActiveTool: (tool: ToolId) => void;
  setGhostType: (type: GhostType) => void;
  setGhostPosition: (positionOrUpdater: GhostPosition | ((prev: GhostPosition) => GhostPosition)) => void;
  setSanity: (sanityOrUpdater: number | ((prev: number) => number)) => void;
  addAnomaly: (type: AnomalyType, intensity: number) => void;
  toggleTool: (tool: keyof InvestigationState['toolsEnabled']) => void;
  setMode: (mode: InvestigationMode) => void;
  resetInvestigation: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(
  undefined
);

const INITIAL_STATE: InvestigationState = {
  ghostType: 'Wraith', // Will be randomized
  ghostPosition: { angle: 0, distance: 0.5 },
  sanity: 100,
  events: [],
  toolsEnabled: {
    emf: false,
    thermal: false,
    audio: false,
    camera: false,
    static: false,
  },
  mode: 'investigating',
};

export function InvestigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InvestigationState>(INITIAL_STATE);
  const [activeTool, setActiveToolState] = useState<ToolId>('radar');

  const setGhostType = useCallback((type: GhostType) => {
    console.log('👻 Ghost type set:', type);
    setState((prev) => ({ ...prev, ghostType: type }));
  }, []);

  const setGhostPosition = useCallback((positionOrUpdater: GhostPosition | ((prev: GhostPosition) => GhostPosition)) => {
    setState((prev) => {
      const newPosition = typeof positionOrUpdater === 'function'
        ? positionOrUpdater(prev.ghostPosition)
        : positionOrUpdater;
      console.log('👻 Ghost position updated:', newPosition);
      return { ...prev, ghostPosition: newPosition };
    });
  }, []);

  const setSanity = useCallback((sanityOrUpdater: number | ((prev: number) => number)) => {
    setState((prev) => {
      const newSanity = typeof sanityOrUpdater === 'function' 
        ? sanityOrUpdater(prev.sanity)
        : sanityOrUpdater;
      return { ...prev, sanity: Math.max(0, Math.min(100, newSanity)) };
    });
  }, []);

  const addAnomaly = useCallback((type: AnomalyType, intensity: number) => {
    const anomaly: Anomaly = {
      id: `${type}-${Date.now()}`,
      type,
      timestamp: Date.now(),
      intensity,
    };
    console.log('⚡ Anomaly detected:', anomaly);
    setState((prev) => ({
      ...prev,
      events: [...prev.events, anomaly].slice(-20), // Keep last 20 events
    }));
  }, []);

  const toggleTool = useCallback((tool: keyof InvestigationState['toolsEnabled']) => {
    console.log('🔧 Tool toggled:', tool);
    setState((prev) => ({
      ...prev,
      toolsEnabled: {
        ...prev.toolsEnabled,
        [tool]: !prev.toolsEnabled[tool],
      },
    }));
  }, []);

  const setMode = useCallback((mode: InvestigationMode) => {
    console.log('🎮 Investigation mode changed:', mode);
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setActiveTool = useCallback((tool: ToolId) => {
    console.log('🔧 Active tool changed:', tool);
    setActiveToolState(tool);
  }, []);

  const resetInvestigation = useCallback(() => {
    console.log('🔄 Investigation reset');
    setState(INITIAL_STATE);
    setActiveToolState('radar');
  }, []);

  return (
    <InvestigationContext.Provider
      value={{
        ...state,
        activeTool,
        setActiveTool,
        setGhostType,
        setGhostPosition,
        setSanity,
        addAnomaly,
        toggleTool,
        setMode,
        resetInvestigation,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within InvestigationProvider');
  }
  return context;
}
