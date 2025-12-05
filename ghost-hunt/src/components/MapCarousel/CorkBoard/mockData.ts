// Mock data for Cork Board investigation history (Match History)

import WraithImage from '../../../assets/images/ghosts/Wraith.png';
import ShadeImage from '../../../assets/images/ghosts/Shade.png';
import PoltergeistImage from '../../../assets/images/ghosts/Poltergeist.png';
import BansheeImage from '../../../assets/images/ghosts/Banshee.png';
import PhantomImage from '../../../assets/images/ghosts/Phantom.png';

export interface MockPolaroid {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  imageUrl: string;
  caption: string;
  pinColor: 'red' | 'silver';
  // Match history data
  result: 'success' | 'failure';
  ghostType: string;
  location: string;
  date: string;
  reward: number; // Money earned
  xp: number;
}

export interface StringConnection {
  from: string;
  to: string;
  color: string;
  thickness: number;
}

export interface MockStickyNote {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  color: 'yellow' | 'pink' | 'blue';
  text: string;
  size: 'small' | 'medium';
}

export interface MockIndexCard {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  title: string;
  details: string[];
}

export interface PinHole {
  id: string;
  position: { x: string; y: string };
}

export interface TapeMark {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  width: string;
  height: string;
}

// Mock Polaroid photos (5 items) - Positioned lower to fill bottom area
export const MOCK_POLAROIDS: MockPolaroid[] = [
  {
    id: 'case-001',
    position: { x: '20%', y: '42%' },
    rotation: -8,
    imageUrl: WraithImage,
    caption: 'Wraith',
    pinColor: 'red',
    result: 'success',
    ghostType: 'Wraith',
    location: 'Whitmore St.',
    date: '12/15/24',
    reward: 250,
    xp: 100,
  },
  {
    id: 'case-002',
    position: { x: '50%', y: '45%' },
    rotation: 5,
    imageUrl: ShadeImage,
    caption: 'Shade',
    pinColor: 'red',
    result: 'success',
    ghostType: 'Shade',
    location: 'Oak Park',
    date: '12/16/24',
    reward: 200,
    xp: 80,
  },
  {
    id: 'case-003',
    position: { x: '80%', y: '42%' },
    rotation: -6,
    imageUrl: PhantomImage,
    caption: 'Phantom',
    pinColor: 'silver',
    result: 'failure',
    ghostType: 'Unknown',
    location: 'Mill Rd.',
    date: '12/17/24',
    reward: 0,
    xp: 20,
  },
  {
    id: 'case-004',
    position: { x: '30%', y: '76%' },
    rotation: 7,
    imageUrl: BansheeImage,
    caption: 'Banshee',
    pinColor: 'red',
    result: 'success',
    ghostType: 'Banshee',
    location: 'Chapel',
    date: '12/18/24',
    reward: 300,
    xp: 120,
  },
  {
    id: 'case-005',
    position: { x: '70%', y: '74%' },
    rotation: -10,
    imageUrl: PoltergeistImage,
    caption: 'Poltergeist',
    pinColor: 'silver',
    result: 'failure',
    ghostType: 'Unknown',
    location: 'Asylum',
    date: '12/19/24',
    reward: 0,
    xp: 15,
  },
];

// Red string connections (4-6 connections)
export const MOCK_STRINGS: StringConnection[] = [
  { from: 'case-001', to: 'case-003', color: '#dc2626', thickness: 2 },
  { from: 'case-002', to: 'case-004', color: '#dc2626', thickness: 2 },
  { from: 'case-003', to: 'case-005', color: '#dc2626', thickness: 3 },
  { from: 'case-004', to: 'case-006', color: '#dc2626', thickness: 2 },
  { from: 'case-001', to: 'case-005', color: '#dc2626', thickness: 2 },
];

// Sticky notes (2 notes) - Match history stats, positioned higher to avoid bottom nav
export const MOCK_STICKY_NOTES: MockStickyNote[] = [
  {
    id: 'note-1',
    position: { x: '15%', y: '15%' },
    rotation: -8,
    color: 'yellow',
    text: 'Total: $1,525\n5 Hunts',
    size: 'small',
  },
  {
    id: 'note-2',
    position: { x: '85%', y: '15%' },
    rotation: 5,
    color: 'pink',
    text: '60% Success\n+575 XP',
    size: 'small',
  },
];

// Index cards (1 card) - Recent investigation summary, positioned at top partially covered by cork
export const MOCK_INDEX_CARDS: MockIndexCard[] = [
  {
    id: 'card-1',
    position: { x: '50%', y: '12%' },
    rotation: -1,
    title: 'RECENT HUNTS',
    details: [
      'Last 7 Days: 5 Investigations',
      'Successful: 3',
      'Failed: 2',
      'Avg Reward: $305',
    ],
  },
];

// Pin holes (10-15 scattered)
export const MOCK_PIN_HOLES: PinHole[] = [
  { id: 'pin-1', position: { x: '20%', y: '25%' } },
  { id: 'pin-2', position: { x: '35%', y: '30%' } },
  { id: 'pin-3', position: { x: '55%', y: '35%' } },
  { id: 'pin-4', position: { x: '65%', y: '28%' } },
  { id: 'pin-5', position: { x: '82%', y: '32%' } },
  { id: 'pin-6', position: { x: '18%', y: '48%' } },
  { id: 'pin-7', position: { x: '38%', y: '52%' } },
  { id: 'pin-8', position: { x: '58%', y: '48%' } },
  { id: 'pin-9', position: { x: '72%', y: '55%' } },
  { id: 'pin-10', position: { x: '88%', y: '52%' } },
  { id: 'pin-11', position: { x: '25%', y: '70%' } },
  { id: 'pin-12', position: { x: '42%', y: '75%' } },
];

// Tape residue marks (5-8 faded rectangles)
export const MOCK_TAPE_MARKS: TapeMark[] = [
  {
    id: 'tape-1',
    position: { x: '30%', y: '12%' },
    rotation: -8,
    width: '40px',
    height: '15px',
  },
  {
    id: 'tape-2',
    position: { x: '62%', y: '15%' },
    rotation: 12,
    width: '35px',
    height: '12px',
  },
  {
    id: 'tape-3',
    position: { x: '10%', y: '38%' },
    rotation: -15,
    width: '38px',
    height: '14px',
  },
  {
    id: 'tape-4',
    position: { x: '68%', y: '42%' },
    rotation: 10,
    width: '42px',
    height: '16px',
  },
  {
    id: 'tape-5',
    position: { x: '35%', y: '68%' },
    rotation: -5,
    width: '36px',
    height: '13px',
  },
  {
    id: 'tape-6',
    position: { x: '75%', y: '72%' },
    rotation: 8,
    width: '40px',
    height: '15px',
  },
];
