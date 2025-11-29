// Investigation mode types
export type GhostType = 'Wraith' | 'Shade' | 'Poltergeist' | 'Peccy';

export type InvestigationMode = 'investigating' | 'deducing' | 'ritual' | 'complete' | 'success' | 'failure';

export type AnomalyType = 'emf' | 'cold' | 'whisper' | 'motion' | 'static' | 'silhouette';

export interface GhostPosition {
  angle: number; // 0-360 degrees
  distance: number; // 0-1 (normalized radius)
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  timestamp: number;
  intensity: number;
}

export interface InvestigationState {
  ghostType: GhostType;
  ghostPosition: GhostPosition;
  sanity: number; // 0-100
  events: Anomaly[];
  toolsEnabled: {
    emf: boolean;
    thermal: boolean;
    audio: boolean;
    camera: boolean;
    static: boolean;
  };
  mode: InvestigationMode;
}
