// Mock data for Shop view

export interface ShopItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  shelf: number; // 1 or 2
  position: number; // Order on shelf (0, 1, 2, etc.)
  description?: string;
}

export interface ShopConfig {
  storeName: string;
  establishedDate: string;
  status: 'closed' | 'open';
}

export const SHOP_CONFIG: ShopConfig = {
  storeName: 'PARANORMAL SUPPLY CO.',
  establishedDate: 'EST. 1985',
  status: 'closed',
};

// Mock shop items (4-6 items) - matching design spec
export const MOCK_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'film-roll',
    name: 'Film',
    icon: '🎞️',
    price: 5,
    shelf: 1,
    position: 0,
    description: 'Standard 35mm film\n+3 camera shots',
  },
  {
    id: 'scanner-boost',
    name: 'Boost',
    icon: '⚡',
    price: 10,
    shelf: 1,
    position: 1,
    description: 'Enhanced detection\n+10% clarity',
  },
  {
    id: 'protective-charm',
    name: 'Charm',
    icon: '🔮',
    price: 15,
    shelf: 1,
    position: 2,
    description: 'Sanity protection\n+10% resistance',
  },
  {
    id: 'camera-battery',
    name: 'Camera',
    icon: '📷',
    price: 20,
    shelf: 1,
    position: 3,
    description: 'Extra power\n+5 flash shots',
  },
  {
    id: 'thermal-camera',
    name: 'Thermal',
    icon: '🌡️',
    price: 25,
    shelf: 2,
    position: 0,
    description: 'Detects temperature\nanomalies',
  },
  {
    id: 'spirit-box',
    name: 'Audio',
    icon: '📻',
    price: 30,
    shelf: 2,
    position: 1,
    description: 'Radio frequency scanner\nfor spirit communication',
  },
  {
    id: 'flashlight',
    name: 'Light',
    icon: '🔦',
    price: 8,
    shelf: 2,
    position: 2,
    description: 'Enhanced flashlight\n+20% brightness',
  },
  {
    id: 'artifact',
    name: 'Artifact',
    icon: '🧿',
    price: 50,
    shelf: 2,
    position: 3,
    description: 'Mystical artifact\nfor spirit detection',
  },
];

