// Investigation mode types - ALL 7 GHOSTS
export type GhostType = 'Wraith' | 'Shade' | 'Poltergeist' | 'Banshee' | 'Phantom' | 'Onyx' | 'Trickster' | 'Peccy';

export type InvestigationMode = 'investigating' | 'deducing' | 'ritual' | 'complete' | 'success' | 'failure';

export type AnomalyType = 'emf' | 'cold' | 'whisper' | 'motion' | 'static' | 'silhouette';

// EMF Personality Types (from Spec 014)
export type EMFPersonality = 'calm' | 'unstable' | 'shy' | 'aggressive';

// Thermal Reading Categories (from Spec 014)
export type ThermalReading = 'normal' | 'cold_spot' | 'deep_cold';

// Camera Manifestation Types (from Spec 014)
export type CameraManifestationType = 
  | 'faint_silhouette' 
  | 'motion_blur' 
  | 'screaming_face' 
  | 'deep_shadow' 
  | 'invisible'
  | 'half_formed_body'
  | 'distorted_shape'
  | 'glitch_streaks'
  | 'shadow_silhouette';

// Spirit Box Word Families (from Spec 014)
export interface WordFamily {
  emotion: string[];
  theme: string[];
}

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
