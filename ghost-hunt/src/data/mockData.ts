// Mock data as per design spec
import type { Position, ToolNode, Hotspot } from '../types/game';

// Default starting position (San Francisco)
export const DEFAULT_POSITION: Position = { lat: 37.7749, lng: -122.4194 };

// Example tool nodes scattered around starting position
export const MOCK_TOOL_NODES: ToolNode[] = [
  // Close to player
  {
    id: 'tool-1',
    lat: 37.7750,
    lng: -122.4190,
    type: 'EMF',
    rarity: 'Common',
  },
  {
    id: 'tool-2',
    lat: 37.7745,
    lng: -122.4200,
    type: 'SpiritBox',
    rarity: 'Rare',
  },
  {
    id: 'tool-3',
    lat: 37.7755,
    lng: -122.4185,
    type: 'ThermalCam',
    rarity: 'Epic',
  },
  {
    id: 'tool-4',
    lat: 37.7740,
    lng: -122.4195,
    type: 'Salt',
    rarity: 'Common',
  },
  // More scattered around
  {
    id: 'tool-5',
    lat: 37.7752,
    lng: -122.4198,
    type: 'EMF',
    rarity: 'Common',
  },
  {
    id: 'tool-6',
    lat: 37.7747,
    lng: -122.4188,
    type: 'ThermalCam',
    rarity: 'Rare',
  },
  {
    id: 'tool-7',
    lat: 37.7758,
    lng: -122.4192,
    type: 'Salt',
    rarity: 'Common',
  },
  {
    id: 'tool-8',
    lat: 37.7742,
    lng: -122.4202,
    type: 'SpiritBox',
    rarity: 'Epic',
  },
  // Further out
  {
    id: 'tool-9',
    lat: 37.7765,
    lng: -122.4175,
    type: 'EMF',
    rarity: 'Rare',
  },
  {
    id: 'tool-10',
    lat: 37.7738,
    lng: -122.4208,
    type: 'ThermalCam',
    rarity: 'Epic',
  },
  {
    id: 'tool-11',
    lat: 37.7754,
    lng: -122.4178,
    type: 'Salt',
    rarity: 'Common',
  },
  {
    id: 'tool-12',
    lat: 37.7744,
    lng: -122.4212,
    type: 'SpiritBox',
    rarity: 'Rare',
  },
];

// Example hotspots
export const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-1',
    lat: 37.7760,
    lng: -122.4180,
    name: 'Abandoned Victorian House',
    status: 'locked',
  },
  {
    id: 'hotspot-2',
    lat: 37.7735,
    lng: -122.4210,
    name: 'Old Cemetery',
    status: 'locked',
  },
  {
    id: 'hotspot-3',
    lat: 37.7770,
    lng: -122.4195,
    name: 'Haunted Hospital',
    status: 'locked',
  },
  {
    id: 'hotspot-4',
    lat: 37.7730,
    lng: -122.4185,
    name: 'Cursed Chapel',
    status: 'locked',
  },
  {
    id: 'hotspot-5',
    lat: 37.7755,
    lng: -122.4215,
    name: 'Forgotten Asylum',
    status: 'locked',
  },
];
