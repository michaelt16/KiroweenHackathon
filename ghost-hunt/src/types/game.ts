// Core game types based on design spec

export type Position = {
  lat: number;
  lng: number;
};

export type ToolType = 'EMF' | 'SpiritBox' | 'ThermalCam' | 'Salt';
export type Rarity = 'Common' | 'Rare' | 'Epic';

export type ToolNode = {
  id: string;
  lat: number;
  lng: number;
  type: ToolType;
  rarity: Rarity;
};

export type Hotspot = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'locked' | 'unlocked';
};

export type InventoryItem = {
  type: ToolType;
  quantity: number;
};
