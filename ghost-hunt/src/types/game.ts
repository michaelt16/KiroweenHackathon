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
  tool: ToolType;
};

export type InventoryItem = {
  id: string;
  type: ToolType | SupplyType;
  quantity: number;
};
