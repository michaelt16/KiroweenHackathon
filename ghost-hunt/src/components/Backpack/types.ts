export type BackpackMode = 'overworld' | 'investigation';

export interface BackpackState {
  isOpen: boolean;
  activeTab: string;
  mode: BackpackMode;
  lastOverworldTab: string;
  lastInvestigationTab: string;
}
