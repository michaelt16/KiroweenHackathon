// Mock data as per design spec
import type { Position, SupplyNode, Hotspot, SupplyType } from '../types/game';

// Default starting position (San Francisco)
export const DEFAULT_POSITION: Position = { lat: 37.7749, lng: -122.4194 };

// Supply amounts by type
const SUPPLY_AMOUNTS = {
  film: () => Math.floor(Math.random() * 3) + 3, // 3-5
  boost: () => 1,
  charm: () => 1,
};

// Generate supply nodes (60% film, 20% boost, 20% charm)
const generateSupplyNodes = (): SupplyNode[] => {
  const positions = [
    { lat: 37.7750, lng: -122.4190 },
    { lat: 37.7745, lng: -122.4200 },
    { lat: 37.7755, lng: -122.4185 },
    { lat: 37.7740, lng: -122.4195 },
    { lat: 37.7752, lng: -122.4198 },
    { lat: 37.7747, lng: -122.4188 },
    { lat: 37.7758, lng: -122.4192 },
    { lat: 37.7742, lng: -122.4202 },
    { lat: 37.7765, lng: -122.4175 },
    { lat: 37.7738, lng: -122.4208 },
    { lat: 37.7754, lng: -122.4178 },
    { lat: 37.7744, lng: -122.4212 },
  ];

  return positions.map((pos, index) => {
    // Distribution: 60% film, 20% boost, 20% charm
    const roll = Math.random();
    let type: SupplyType;
    let rarity: 'common' | 'uncommon';

    if (roll < 0.6) {
      type = 'film';
      rarity = 'common';
    } else if (roll < 0.8) {
      type = 'boost';
      rarity = 'uncommon';
    } else {
      type = 'charm';
      rarity = 'uncommon';
    }

    return {
      id: `supply-${index + 1}`,
      lat: pos.lat,
      lng: pos.lng,
      type,
      amount: SUPPLY_AMOUNTS[type](),
      rarity,
    };
  });
};

export const MOCK_SUPPLY_NODES: SupplyNode[] = generateSupplyNodes();

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
