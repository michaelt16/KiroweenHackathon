/**
 * Validation Script for Ghost Data
 * 
 * This script validates all 7 ghost profiles to ensure proper deduction overlap.
 * Run with: npx tsx src/stores/runValidation.ts
 */

// Define types locally to avoid Zustand dependency
enum GhostType {
  WRAITH = 'wraith',
  SHADE = 'shade',
  POLTERGEIST = 'poltergeist',
  BANSHEE = 'banshee',
  PHANTOM = 'phantom',
  ONYX = 'onyx',
  TRICKSTER = 'trickster',
}

enum EMFPersonality {
  CALM = 'calm',
  UNSTABLE = 'unstable',
  SHY = 'shy',
  AGGRESSIVE = 'aggressive',
  MISCHIEVOUS = 'mischievous',
}

enum CameraManifestationType {
  FAINT_SILHOUETTE = 'faint_silhouette',
  MOTION_BLUR = 'motion_blur',
  SCREAMING_FACE = 'screaming_face',
  DEEP_SHADOW = 'deep_shadow',
  INVISIBLE = 'invisible',
  FAINT_GLITCH = 'faint_glitch',
  SHADOW_SILHOUETTE = 'shadow_silhouette',
  GLITCH_STREAKS = 'glitch_streaks',
  HALF_FORMED_BODY = 'half_formed_body',
}

enum ThermalReading {
  NORMAL = 'normal',
  COLD_SPOT = 'cold_spot',
  DEEP_COLD = 'deep_cold',
}

interface SpiritBoxSignature {
  knobA: number;
  knobB: number;
  tolerance: number;
}

interface WordFamily {
  emotion: string[];
  theme: string[];
}

interface CameraManifestation {
  primary: CameraManifestationType;
  secondary?: CameraManifestationType;
  probability: number;
}

interface FieldJournal {
  agentName: string;
  date: string;
  story: string;
  fate: 'escaped' | 'traumatized' | 'missing' | 'deceased';
}

interface GhostData {
  id: GhostType;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  difficulty: 'EASIEST' | 'EASY' | 'MEDIUM' | 'HARD' | 'HARDEST';
  emfPersonality: EMFPersonality;
  spiritBoxSignature: SpiritBoxSignature;
  wordFamilies: WordFamily;
  cameraManifestations: CameraManifestation[];
  thermalReading: ThermalReading;
  description: string;
  characteristics: string[];
  fieldJournal: FieldJournal;
  isUnlocked: boolean;
  encounterCount: number;
  imageUrl?: string;
  silhouetteUrl: string;
}

// Validation functions (inline)
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface DeductionOverlapReport {
  emfPersonalities: Map<EMFPersonality, GhostType[]>;
  cameraManifestations: Map<CameraManifestationType, GhostType[]>;
  thermalReadings: Map<ThermalReading, GhostType[]>;
  spiritBoxWords: Map<string, GhostType[]>;
  uniquelyIdentifiableGhosts: GhostType[];
}

function generateOverlapReport(ghosts: Record<GhostType, GhostData>): DeductionOverlapReport {
  const emfPersonalities = new Map<EMFPersonality, GhostType[]>();
  const cameraManifestations = new Map<CameraManifestationType, GhostType[]>();
  const thermalReadings = new Map<ThermalReading, GhostType[]>();
  const spiritBoxWords = new Map<string, GhostType[]>();

  for (const [ghostType, ghost] of Object.entries(ghosts)) {
    const type = ghostType as GhostType;

    if (!emfPersonalities.has(ghost.emfPersonality)) {
      emfPersonalities.set(ghost.emfPersonality, []);
    }
    emfPersonalities.get(ghost.emfPersonality)!.push(type);

    for (const manifestation of ghost.cameraManifestations) {
      if (!cameraManifestations.has(manifestation.primary)) {
        cameraManifestations.set(manifestation.primary, []);
      }
      cameraManifestations.get(manifestation.primary)!.push(type);

      if (manifestation.secondary) {
        if (!cameraManifestations.has(manifestation.secondary)) {
          cameraManifestations.set(manifestation.secondary, []);
        }
        cameraManifestations.get(manifestation.secondary)!.push(type);
      }
    }

    if (!thermalReadings.has(ghost.thermalReading)) {
      thermalReadings.set(ghost.thermalReading, []);
    }
    thermalReadings.get(ghost.thermalReading)!.push(type);

    const allWords = [...ghost.wordFamilies.emotion, ...ghost.wordFamilies.theme];
    for (const word of allWords) {
      if (!spiritBoxWords.has(word)) {
        spiritBoxWords.set(word, []);
      }
      spiritBoxWords.get(word)!.push(type);
    }
  }

  const uniquelyIdentifiableGhosts: GhostType[] = [];

  for (const [ghostType, ghost] of Object.entries(ghosts)) {
    const type = ghostType as GhostType;

    if (emfPersonalities.get(ghost.emfPersonality)?.length === 1) {
      uniquelyIdentifiableGhosts.push(type);
      continue;
    }

    if (thermalReadings.get(ghost.thermalReading)?.length === 1) {
      uniquelyIdentifiableGhosts.push(type);
      continue;
    }

    let hasUniqueCamera = false;
    for (const manifestation of ghost.cameraManifestations) {
      if (
        type === GhostType.PHANTOM &&
        manifestation.primary === CameraManifestationType.INVISIBLE &&
        manifestation.probability >= 0.9
      ) {
        continue;
      }

      if (cameraManifestations.get(manifestation.primary)?.length === 1) {
        hasUniqueCamera = true;
        break;
      }
    }
    if (hasUniqueCamera) {
      uniquelyIdentifiableGhosts.push(type);
      continue;
    }
  }

  return {
    emfPersonalities,
    cameraManifestations,
    thermalReadings,
    spiritBoxWords,
    uniquelyIdentifiableGhosts,
  };
}

function validateDeductionOverlap(ghosts: Record<GhostType, GhostData>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const report = generateOverlapReport(ghosts);

  for (const [personality, ghostTypes] of report.emfPersonalities.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `EMF Personality "${personality}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  for (const [manifestation, ghostTypes] of report.cameraManifestations.entries()) {
    if (manifestation === CameraManifestationType.INVISIBLE) {
      const phantom = ghosts[GhostType.PHANTOM];
      const invisibleManif = phantom?.cameraManifestations.find(
        (m) => m.primary === CameraManifestationType.INVISIBLE
      );
      if (invisibleManif && invisibleManif.probability >= 0.9) {
        continue;
      }
    }

    if (ghostTypes.length < 2) {
      errors.push(
        `Camera Manifestation "${manifestation}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  for (const [reading, ghostTypes] of report.thermalReadings.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `Thermal Reading "${reading}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  for (const [word, ghostTypes] of report.spiritBoxWords.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `Spirit Box word "${word}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  if (report.uniquelyIdentifiableGhosts.length > 0) {
    errors.push(
      `The following ghosts are uniquely identifiable by a single trait: ${report.uniquelyIdentifiableGhosts.join(', ')}`
    );
  }

  for (const ghost of Object.values(ghosts)) {
    const totalProbability = ghost.cameraManifestations.reduce(
      (sum, m) => sum + m.probability,
      0
    );
    if (Math.abs(totalProbability - 1.0) > 0.01) {
      errors.push(
        `${ghost.name}: Camera manifestation probabilities sum to ${totalProbability.toFixed(2)}, expected 1.0`
      );
    }

    if (ghost.spiritBoxSignature.knobA < 0 || ghost.spiritBoxSignature.knobA > 1) {
      errors.push(
        `${ghost.name}: Spirit Box knobA (${ghost.spiritBoxSignature.knobA}) is out of range [0, 1]`
      );
    }
    if (ghost.spiritBoxSignature.knobB < 0 || ghost.spiritBoxSignature.knobB > 1) {
      errors.push(
        `${ghost.name}: Spirit Box knobB (${ghost.spiritBoxSignature.knobB}) is out of range [0, 1]`
      );
    }

    if (ghost.wordFamilies.emotion.length === 0) {
      errors.push(`${ghost.name}: Emotion word family is empty`);
    }
    if (ghost.wordFamilies.theme.length === 0) {
      errors.push(`${ghost.name}: Theme word family is empty`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function printValidationReport(result: ValidationResult, report: DeductionOverlapReport): void {
  console.log('\n=== GHOST DATA VALIDATION REPORT ===\n');

  if (result.valid) {
    console.log('✅ All validation checks passed!\n');
  } else {
    console.log('❌ Validation failed with the following errors:\n');
    result.errors.forEach((error, i) => {
      console.log(`  ${i + 1}. ${error}`);
    });
    console.log('');
  }

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    result.warnings.forEach((warning, i) => {
      console.log(`  ${i + 1}. ${warning}`);
    });
    console.log('');
  }

  console.log('=== DEDUCTION OVERLAP ANALYSIS ===\n');

  console.log('EMF Personalities:');
  for (const [personality, ghosts] of report.emfPersonalities.entries()) {
    const status = ghosts.length >= 2 ? '✅' : '❌';
    console.log(`  ${status} ${personality}: ${ghosts.length} ghosts (${ghosts.join(', ')})`);
  }
  console.log('');

  console.log('Camera Manifestations:');
  for (const [manifestation, ghosts] of report.cameraManifestations.entries()) {
    const status = ghosts.length >= 2 ? '✅' : '❌';
    console.log(`  ${status} ${manifestation}: ${ghosts.length} ghosts (${ghosts.join(', ')})`);
  }
  console.log('');

  console.log('Thermal Readings:');
  for (const [reading, ghosts] of report.thermalReadings.entries()) {
    const status = ghosts.length >= 2 ? '✅' : '❌';
    console.log(`  ${status} ${reading}: ${ghosts.length} ghosts (${ghosts.join(', ')})`);
  }
  console.log('');

  console.log('Spirit Box Words (sample):');
  let wordCount = 0;
  for (const [word, ghosts] of report.spiritBoxWords.entries()) {
    if (wordCount >= 10) {
      console.log(`  ... and ${report.spiritBoxWords.size - 10} more words`);
      break;
    }
    const status = ghosts.length >= 2 ? '✅' : '❌';
    console.log(`  ${status} "${word}": ${ghosts.length} ghosts (${ghosts.join(', ')})`);
    wordCount++;
  }
  console.log('');

  if (report.uniquelyIdentifiableGhosts.length > 0) {
    console.log('❌ Uniquely Identifiable Ghosts:');
    report.uniquelyIdentifiableGhosts.forEach((ghost) => {
      console.log(`  - ${ghost}`);
    });
  } else {
    console.log('✅ No ghosts are uniquely identifiable by a single trait');
  }
  console.log('');
}

// Import ghost data directly (since we can't use Zustand in a script)
const ghosts: Record<GhostType, GhostData> = {
  [GhostType.WRAITH]: {
    id: GhostType.WRAITH,
    name: 'Wraith',
    threatLevel: 'HIGH',
    difficulty: 'EASIEST',
    emfPersonality: EMFPersonality.CALM,
    spiritBoxSignature: { knobA: 0.35, knobB: 0.72, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['soft', 'lost', 'cold'],
      theme: ['drift', 'fade', 'whisper'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.FAINT_SILHOUETTE, probability: 0.8 },
      { primary: CameraManifestationType.INVISIBLE, probability: 0.2 },
    ],
    thermalReading: ThermalReading.NORMAL,
    description: 'A fast-moving spirit that leaves barely a trace.',
    characteristics: [
      'Very fast movement',
      'Difficult to photograph',
      'Calm electromagnetic signature',
      'Weak vocal presence',
    ],
    fieldJournal: {
      agentName: 'K. Morrison',
      date: 'March 15th, 2019',
      story: 'Field journal story...',
      fate: 'escaped',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/wraith-silhouette.png',
  },
  [GhostType.SHADE]: {
    id: GhostType.SHADE,
    name: 'Shade',
    threatLevel: 'MEDIUM',
    difficulty: 'EASY',
    emfPersonality: EMFPersonality.SHY,
    spiritBoxSignature: { knobA: 0.50, knobB: 0.45, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['silent', 'unknown', 'stay'],
      theme: ['hide', 'shadow', 'watch'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.HALF_FORMED_BODY, probability: 0.7 },
      { primary: CameraManifestationType.FAINT_SILHOUETTE, probability: 0.3 },
    ],
    thermalReading: ThermalReading.NORMAL,
    description: "A shy entity that avoids detection until you're very close.",
    characteristics: [
      'Elusive presence',
      'Difficult to detect at distance',
      'Partially visible in photos',
      'Prefers to remain hidden',
    ],
    fieldJournal: {
      agentName: 'T. Chen',
      date: 'July 3rd, 2020',
      story: 'Field journal story...',
      fate: 'escaped',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/shade-silhouette.png',
  },
  [GhostType.POLTERGEIST]: {
    id: GhostType.POLTERGEIST,
    name: 'Poltergeist',
    threatLevel: 'HIGH',
    difficulty: 'MEDIUM',
    emfPersonality: EMFPersonality.UNSTABLE,
    spiritBoxSignature: { knobA: 0.62, knobB: 0.38, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['noisy', 'chaotic', 'mine'],
      theme: ['break', 'throw', 'chaos'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.MOTION_BLUR, probability: 0.75 },
      { primary: CameraManifestationType.GLITCH_STREAKS, probability: 0.25 },
    ],
    thermalReading: ThermalReading.COLD_SPOT,
    description: 'A chaotic entity known for erratic behavior and object manipulation.',
    characteristics: [
      'Highly unstable readings',
      'Erratic movement patterns',
      'Cold spots appear suddenly',
      'Aggressive toward equipment',
    ],
    fieldJournal: {
      agentName: 'R. Patel',
      date: 'November 22nd, 2018',
      story: 'Field journal story...',
      fate: 'escaped',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/poltergeist-silhouette.png',
  },
  [GhostType.BANSHEE]: {
    id: GhostType.BANSHEE,
    name: 'Banshee',
    threatLevel: 'EXTREME',
    difficulty: 'HARD',
    emfPersonality: EMFPersonality.AGGRESSIVE,
    spiritBoxSignature: { knobA: 0.28, knobB: 0.91, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['anger', 'sorrow', 'leave'],
      theme: ['scream', 'wail', 'death'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.SCREAMING_FACE, probability: 0.85 },
      { primary: CameraManifestationType.DEEP_SHADOW, probability: 0.15 },
    ],
    thermalReading: ThermalReading.COLD_SPOT,
    description: 'An aggressive spirit driven by intense emotion and rage.',
    characteristics: [
      'Extremely aggressive behavior',
      'EMF spikes even at distance',
      'Terrifying visual manifestations',
      'Emotionally overwhelming presence',
    ],
    fieldJournal: {
      agentName: "M. O'Brien",
      date: 'October 31st, 2017',
      story: 'Field journal story...',
      fate: 'traumatized',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/banshee-silhouette.png',
  },
  [GhostType.PHANTOM]: {
    id: GhostType.PHANTOM,
    name: 'Phantom',
    threatLevel: 'HIGH',
    difficulty: 'HARD',
    emfPersonality: EMFPersonality.CALM,
    spiritBoxSignature: { knobA: 0.18, knobB: 0.67, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['hollow', 'gone', 'cold'],
      theme: ['void', 'empty', 'nothing'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.INVISIBLE, probability: 0.95 },
      { primary: CameraManifestationType.FAINT_GLITCH, probability: 0.05 },
    ],
    thermalReading: ThermalReading.DEEP_COLD,
    description: 'An uncanny entity that refuses to be photographed and brings extreme cold.',
    characteristics: [
      'Nearly impossible to photograph',
      'Extreme temperature drops',
      'Calm but unsettling presence',
      'Speaks in reverse',
    ],
    fieldJournal: {
      agentName: 'L. Kowalski',
      date: 'January 8th, 2021',
      story: 'Field journal story...',
      fate: 'traumatized',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/phantom-silhouette.png',
  },
  [GhostType.ONYX]: {
    id: GhostType.ONYX,
    name: 'Onyx',
    threatLevel: 'EXTREME',
    difficulty: 'HARD',
    emfPersonality: EMFPersonality.SHY,
    spiritBoxSignature: { knobA: 0.12, knobB: 0.23, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['deep', 'below', 'hungry'],
      theme: ['dark', 'consume', 'abyss'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.SHADOW_SILHOUETTE, probability: 0.8 },
      { primary: CameraManifestationType.DEEP_SHADOW, probability: 0.2 },
    ],
    thermalReading: ThermalReading.DEEP_COLD,
    description: 'A psychology-heavy entity associated with depths and shadows.',
    characteristics: [
      'Difficult to detect until very close',
      'Manifests as pure shadow',
      'Extreme cold presence',
      'Subterranean associations',
    ],
    fieldJournal: {
      agentName: 'S. Nakamura',
      date: 'April 17th, 2019',
      story: 'Field journal story...',
      fate: 'escaped',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/onyx-silhouette.png',
  },
  [GhostType.TRICKSTER]: {
    id: GhostType.TRICKSTER,
    name: 'Trickster',
    threatLevel: 'HIGH',
    difficulty: 'HARDEST',
    emfPersonality: EMFPersonality.MISCHIEVOUS,
    spiritBoxSignature: { knobA: 0.48, knobB: 0.60, tolerance: 0.06 },
    wordFamilies: {
      emotion: ['playful', 'teasing', 'behind'],
      theme: ['trick', 'game', 'mine', 'fun'],
    },
    cameraManifestations: [
      { primary: CameraManifestationType.GLITCH_STREAKS, probability: 0.7 },
      { primary: CameraManifestationType.MOTION_BLUR, probability: 0.3 },
    ],
    thermalReading: ThermalReading.COLD_SPOT,
    description: 'The most challenging entity - deceptive, playful, and maddening.',
    characteristics: [
      'Oscillating EMF patterns',
      'Spirit Box signal drifts',
      'Unpredictable behavior',
      'Enjoys manipulating investigators',
    ],
    fieldJournal: {
      agentName: 'D. Martinez',
      date: 'September 9th, 2020',
      story: 'Field journal story...',
      fate: 'traumatized',
    },
    isUnlocked: false,
    encounterCount: 0,
    silhouetteUrl: '/assets/ghosts/trickster-silhouette.png',
  },
};

// Run validation
console.log('Running Ghost Data Validation...\n');

const result = validateDeductionOverlap(ghosts);
const report = generateOverlapReport(ghosts);

printValidationReport(result, report);

// Exit with appropriate code
if (result.valid) {
  console.log('✅ All validation checks passed!');
  process.exit(0);
} else {
  console.log('❌ Validation failed. Please fix the errors above.');
  process.exit(1);
}
