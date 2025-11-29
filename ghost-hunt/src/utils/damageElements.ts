// Damage element generation utility for analog horror aesthetic
// Based on Spec 007 Investigation Tools Design System

export interface DamageElement {
  type: 'light-scratch' | 'dark-scratch' | 'rust' | 'chip' | 'smudge' | 'tape';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: {
    width: string;
    height: string;
  };
  rotation?: number;
  opacity: number;
  note?: string; // For tape patches
  clipPath?: string; // For paint chips
}

// Raw data interfaces for internal use
interface ScratchData {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  angle: number;
  opacity: number;
}

interface RustSpotData {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
}

interface ChipData {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  clipPath: string;
  opacity: number;
}

interface SmudgeData {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
}

interface TapePatchData {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  rotation: number;
  opacity: number;
  note: string;
}

// Generate light scratches (6-8 per device)
export function generateLightScratches(count: number = 7): DamageElement[] {
  const scratches: ScratchData[] = [
    { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.5 },
    { bottom: '20%', right: '8%', width: '130px', angle: 30, opacity: 0.55 },
    { top: '60%', left: '3%', width: '120px', angle: 45, opacity: 0.5 },
    { top: '35%', right: '5%', width: '110px', angle: -35, opacity: 0.6 },
    { bottom: '35%', left: '6%', width: '125px', angle: 40, opacity: 0.55 },
    { top: '45%', right: '12%', width: '140px', angle: -20, opacity: 0.52 },
    { bottom: '50%', left: '10%', width: '115px', angle: 35, opacity: 0.58 },
    { top: '25%', left: '15%', width: '135px', angle: -30, opacity: 0.54 },
  ];

  return scratches.slice(0, count).map((scratch) => ({
    type: 'light-scratch',
    position: {
      ...(scratch.top ? { top: scratch.top } : {}),
      ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
      ...(scratch.left ? { left: scratch.left } : {}),
      ...(scratch.right ? { right: scratch.right } : {}),
    },
    size: {
      width: scratch.width,
      height: '2px',
    },
    rotation: scratch.angle,
    opacity: scratch.opacity,
  }));
}

// Generate dark scratches (3-5 per device)
export function generateDarkScratches(count: number = 4): DamageElement[] {
  const scratches: ScratchData[] = [
    { top: '18px', right: '22px', width: '55px', angle: -32, opacity: 0.5 },
    { bottom: '32px', left: '32px', width: '40px', angle: 22, opacity: 0.4 },
    { top: '40%', right: '15%', width: '60px', angle: 28, opacity: 0.45 },
    { bottom: '45%', left: '20%', width: '50px', angle: -25, opacity: 0.48 },
    { top: '70%', right: '8%', width: '45px', angle: 35, opacity: 0.42 },
  ];

  return scratches.slice(0, count).map((scratch) => ({
    type: 'dark-scratch',
    position: {
      ...(scratch.top ? { top: scratch.top } : {}),
      ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
      ...(scratch.left ? { left: scratch.left } : {}),
      ...(scratch.right ? { right: scratch.right } : {}),
    },
    size: {
      width: scratch.width,
      height: '2px',
    },
    rotation: scratch.angle,
    opacity: scratch.opacity,
  }));
}

// Generate rust spots (5-7 scattered)
export function generateRustSpots(count: number = 6): DamageElement[] {
  const spots: RustSpotData[] = [
    { top: '18%', left: '15%', size: '14px', opacity: 0.55 },
    { top: '45%', right: '12%', size: '16px', opacity: 0.6 },
    { bottom: '22%', left: '18%', size: '12px', opacity: 0.5 },
    { bottom: '30%', right: '15%', size: '15px', opacity: 0.58 },
    { top: '70%', left: '20%', size: '13px', opacity: 0.52 },
    { top: '55%', right: '25%', size: '14px', opacity: 0.56 },
    { bottom: '60%', left: '8%', size: '15px', opacity: 0.54 },
  ];

  return spots.slice(0, count).map((spot) => ({
    type: 'rust',
    position: {
      ...(spot.top ? { top: spot.top } : {}),
      ...(spot.bottom ? { bottom: spot.bottom } : {}),
      ...(spot.left ? { left: spot.left } : {}),
      ...(spot.right ? { right: spot.right } : {}),
    },
    size: {
      width: spot.size,
      height: spot.size,
    },
    opacity: spot.opacity,
  }));
}

// Generate chipped paint areas (4-6 per device)
export function generatePaintChips(count: number = 5): DamageElement[] {
  const chips: ChipData[] = [
    { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
    { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
    { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
    { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
    { top: '16%', left: '12%', width: '20px', height: '20px', clipPath: 'polygon(0% 0%, 60% 0%, 0% 60%)', opacity: 0.7 },
    { bottom: '20%', right: '10%', width: '25px', height: '25px', clipPath: 'polygon(100% 100%, 40% 100%, 100% 40%)', opacity: 0.72 },
  ];

  return chips.slice(0, count).map((chip) => ({
    type: 'chip',
    position: {
      ...(chip.top ? { top: chip.top } : {}),
      ...(chip.bottom ? { bottom: chip.bottom } : {}),
      ...(chip.left ? { left: chip.left } : {}),
      ...(chip.right ? { right: chip.right } : {}),
    },
    size: {
      width: chip.width,
      height: chip.height,
    },
    clipPath: chip.clipPath,
    opacity: chip.opacity,
  }));
}

// Generate fingerprint smudges (3-5 per visible area)
export function generateFingerprints(count: number = 4): DamageElement[] {
  const smudges: SmudgeData[] = [
    { top: '25%', left: '12%', size: '30px', opacity: 0.3 },
    { bottom: '28%', right: '10%', size: '25px', opacity: 0.25 },
    { top: '50%', right: '8%', size: '28px', opacity: 0.28 },
    { bottom: '45%', left: '15%', size: '26px', opacity: 0.27 },
    { top: '65%', right: '18%', size: '29px', opacity: 0.29 },
  ];

  return smudges.slice(0, count).map((smudge) => ({
    type: 'smudge',
    position: {
      ...(smudge.top ? { top: smudge.top } : {}),
      ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
      ...(smudge.left ? { left: smudge.left } : {}),
      ...(smudge.right ? { right: smudge.right } : {}),
    },
    size: {
      width: smudge.size,
      height: smudge.size,
    },
    opacity: smudge.opacity,
  }));
}

// Generate tape patches (3-5 per device, crooked)
export function generateTapePatches(count: number = 4): DamageElement[] {
  const patches: TapePatchData[] = [
    { top: '5%', left: '-15px', width: '60px', height: '3px', rotation: -15, opacity: 0.8, note: '' },
    { top: '50%', right: '-20px', width: '50px', height: '4px', rotation: 20, opacity: 0.75, note: '' },
    { bottom: '8%', left: '-12px', width: '45px', height: '3px', rotation: 10, opacity: 0.7, note: '' },
    { bottom: '12px', right: '10px', width: '85px', height: '32px', rotation: -14, opacity: 0.9, note: 'BAT OK' },
    { top: '12px', right: '5px', width: '52px', height: '20px', rotation: 16, opacity: 0.8, note: 'HANDLE WITH CARE' },
  ];

  return patches.slice(0, count).map((patch) => ({
    type: 'tape',
    position: {
      ...(patch.top ? { top: patch.top } : {}),
      ...(patch.bottom ? { bottom: patch.bottom } : {}),
      ...(patch.left ? { left: patch.left } : {}),
      ...(patch.right ? { right: patch.right } : {}),
    },
    size: {
      width: patch.width,
      height: patch.height,
    },
    rotation: patch.rotation,
    opacity: patch.opacity,
    note: patch.note,
  }));
}

// Generate all damage elements for a case
export function generateCaseDamage() {
  return {
    lightScratches: generateLightScratches(7),
    darkScratches: generateDarkScratches(4),
    rustSpots: generateRustSpots(6),
    paintChips: generatePaintChips(5),
    fingerprints: generateFingerprints(4),
    tapePatches: generateTapePatches(4),
  };
}
