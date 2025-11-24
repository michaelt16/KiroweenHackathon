// Mock data as per design spec
import type { Position, SupplyNode, Hotspot, SupplyType, FieldJournalNode } from '../types/game';

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

// Example hotspots - SAFETY RULE: Must be in parks or safe pedestrian areas, NOT on roads
// See steering/009-safety-investigation-node-placement.md for full safety guidelines
// All locations positioned in park-like areas or safe zones, minimum 50m from roads
export const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-1',
    lat: 37.7770,  // Positioned in park area (Golden Gate Park vicinity)
    lng: -122.4185,
    name: 'Abandoned Victorian House',
    status: 'unlocked',
  },
  {
    id: 'hotspot-2',
    lat: 37.7740,  // Park location, away from all roads
    lng: -122.4215,
    name: 'Abandoned Classroom',
    status: 'unlocked',
  },
  {
    id: 'hotspot-3',
    lat: 37.7775,  // Safe park area, no road access required
    lng: -122.4200,
    name: 'Haunted Hospital',
    status: 'unlocked',
  },
  {
    id: 'hotspot-4',
    lat: 37.7735,  // Park interior, safe pedestrian access only
    lng: -122.4190,
    name: 'Cursed Chapel',
    status: 'unlocked',
  },
  {
    id: 'hotspot-5',
    lat: 37.7760,  // Park location, minimum 50m from nearest road
    lng: -122.4220,
    name: 'Forgotten Asylum',
    status: 'unlocked',
  },
];

// Field Journal nodes - RARE spawns (only 1-2% chance or specific rare locations)
// These are rare collectibles with pre-written stories
// Only a few spawn at a time to make them special finds
export const MOCK_FIELD_JOURNAL_NODES: FieldJournalNode[] = [
  // Rare spawn - only 1-2 of these will appear at a time
  {
    id: 'field-journal-node-1',
    lat: 37.7753,  // Park area, safe location
    lng: -122.4195,
    journalId: 'journal-001',
  },
  {
    id: 'field-journal-node-2',
    lat: 37.7743,  // Park area, safe location
    lng: -122.4205,
    journalId: 'journal-004',  // Different story
  },
  {
    id: 'field-journal-node-3',
    lat: 37.7762,  // Park area, safe location
    lng: -122.4180,
    journalId: 'journal-007',  // Different story
  },
  // Additional rare spawns - can add more journal IDs from the 15 available stories
  {
    id: 'field-journal-node-4',
    lat: 37.7758,  // Park area, safe location
    lng: -122.4192,
    journalId: 'journal-011',  // Different story
  },
  {
    id: 'field-journal-node-5',
    lat: 37.7748,  // Park area, safe location
    lng: -122.4208,
    journalId: 'journal-014',  // Different story
  },
];
