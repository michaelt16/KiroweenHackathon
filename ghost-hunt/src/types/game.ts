// Core game types based on design spec

export type Position = {
  lat: number;
  lng: number;
};

// Supply system types
export type SupplyType = 'film' | 'boost' | 'charm';
export type Rarity = 'common' | 'uncommon' | 'rare';

export type SupplyNode = {
  id: string;
  lat: number;
  lng: number;
  type: SupplyType;
  amount: number;
  rarity: Rarity;
};

export type Hotspot = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'locked' | 'unlocked';
};

// Legacy types for backward compatibility
export type ToolType = 'emf' | 'thermal' | 'audio' | 'camera' | 'radar';

export type ToolNode = {
  id: string;
  lat: number;
  lng: number;
  type: ToolType; // Changed from 'tool' to 'type' to match usage
  rarity: Rarity; // Added rarity field
};

export type InventoryItem = {
  id: string;
  type: ToolType | SupplyType;
  quantity: number;
};

// Field Journal types
export type FieldJournalNode = {
  id: string;
  lat: number;
  lng: number;
  journalId: string; // References the journal entry ID
};

export interface JournalEntry {
  id: string;
  date: string;
  location: string;
  agentName: string;
  agentStatus: 'MISSING' | 'DECEASED' | 'RETIRED' | 'ACTIVE';
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  notes: string[];
  evidence: string[];
  photos?: string[];
  finalEntry?: string; // Last entry before agent went missing/died
}