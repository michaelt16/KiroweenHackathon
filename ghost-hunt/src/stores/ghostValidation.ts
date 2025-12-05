import {
  GhostType,
  GhostData,
  EMFPersonality,
  CameraManifestationType,
  ThermalReading,
} from './ghostStore';

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface DeductionOverlapReport {
  emfPersonalities: Map<EMFPersonality, GhostType[]>;
  cameraManifestations: Map<CameraManifestationType, GhostType[]>;
  thermalReadings: Map<ThermalReading, GhostType[]>;
  spiritBoxWords: Map<string, GhostType[]>;
  uniquelyIdentifiableGhosts: GhostType[];
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates that no ghost is uniquely identifiable by a single trait
 */
export function validateDeductionOverlap(
  ghosts: Record<GhostType, GhostData>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Generate overlap report
  const report = generateOverlapReport(ghosts);

  // Requirement 13.1: Ensure at least 2 ghosts share each EMF personality
  for (const [personality, ghostTypes] of report.emfPersonalities.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `EMF Personality "${personality}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  // Requirement 13.2: Ensure at least 2 ghosts share each camera manifestation
  // (except Phantom's guaranteed Invisible)
  for (const [manifestation, ghostTypes] of report.cameraManifestations.entries()) {
    // Phantom's INVISIBLE is allowed to be unique (95% probability)
    if (manifestation === CameraManifestationType.INVISIBLE) {
      // Check if Phantom has high probability for INVISIBLE
      const phantom = ghosts[GhostType.PHANTOM];
      const invisibleManif = phantom?.cameraManifestations.find(
        (m) => m.primary === CameraManifestationType.INVISIBLE
      );
      if (invisibleManif && invisibleManif.probability >= 0.9) {
        // This is expected - Phantom is nearly always invisible
        continue;
      }
    }

    if (ghostTypes.length < 2) {
      errors.push(
        `Camera Manifestation "${manifestation}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  // Requirement 13.3: Ensure at least 2 ghosts share each thermal reading
  for (const [reading, ghostTypes] of report.thermalReadings.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `Thermal Reading "${reading}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  // Requirement 13.4: Ensure each Spirit Box word appears in at least 2 ghost families
  for (const [word, ghostTypes] of report.spiritBoxWords.entries()) {
    if (ghostTypes.length < 2) {
      errors.push(
        `Spirit Box word "${word}" is only used by ${ghostTypes.length} ghost(s): ${ghostTypes.join(', ')}. Minimum 2 required.`
      );
    }
  }

  // Requirement 13.5: Ensure no ghost is uniquely identifiable by a single trait
  if (report.uniquelyIdentifiableGhosts.length > 0) {
    errors.push(
      `The following ghosts are uniquely identifiable by a single trait: ${report.uniquelyIdentifiableGhosts.join(', ')}`
    );
  }

  // Additional validation: Check that all ghosts have valid data
  for (const [ghostType, ghost] of Object.entries(ghosts)) {
    // Validate camera manifestation probabilities sum to ~1.0
    const totalProbability = ghost.cameraManifestations.reduce(
      (sum, m) => sum + m.probability,
      0
    );
    if (Math.abs(totalProbability - 1.0) > 0.01) {
      errors.push(
        `${ghost.name}: Camera manifestation probabilities sum to ${totalProbability.toFixed(2)}, expected 1.0`
      );
    }

    // Validate Spirit Box frequencies are in range
    if (
      ghost.spiritBoxSignature.knobA < 0 ||
      ghost.spiritBoxSignature.knobA > 1
    ) {
      errors.push(
        `${ghost.name}: Spirit Box knobA (${ghost.spiritBoxSignature.knobA}) is out of range [0, 1]`
      );
    }
    if (
      ghost.spiritBoxSignature.knobB < 0 ||
      ghost.spiritBoxSignature.knobB > 1
    ) {
      errors.push(
        `${ghost.name}: Spirit Box knobB (${ghost.spiritBoxSignature.knobB}) is out of range [0, 1]`
      );
    }

    // Validate word families are not empty
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

/**
 * Generates a detailed overlap report for all ghost traits
 */
export function generateOverlapReport(
  ghosts: Record<GhostType, GhostData>
): DeductionOverlapReport {
  const emfPersonalities = new Map<EMFPersonality, GhostType[]>();
  const cameraManifestations = new Map<CameraManifestationType, GhostType[]>();
  const thermalReadings = new Map<ThermalReading, GhostType[]>();
  const spiritBoxWords = new Map<string, GhostType[]>();

  // Collect all traits
  for (const [ghostType, ghost] of Object.entries(ghosts)) {
    const type = ghostType as GhostType;

    // EMF Personalities
    if (!emfPersonalities.has(ghost.emfPersonality)) {
      emfPersonalities.set(ghost.emfPersonality, []);
    }
    emfPersonalities.get(ghost.emfPersonality)!.push(type);

    // Camera Manifestations
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

    // Thermal Readings
    if (!thermalReadings.has(ghost.thermalReading)) {
      thermalReadings.set(ghost.thermalReading, []);
    }
    thermalReadings.get(ghost.thermalReading)!.push(type);

    // Spirit Box Words
    const allWords = [
      ...ghost.wordFamilies.emotion,
      ...ghost.wordFamilies.theme,
    ];
    for (const word of allWords) {
      if (!spiritBoxWords.has(word)) {
        spiritBoxWords.set(word, []);
      }
      spiritBoxWords.get(word)!.push(type);
    }
  }

  // Find uniquely identifiable ghosts
  const uniquelyIdentifiableGhosts: GhostType[] = [];

  for (const [ghostType, ghost] of Object.entries(ghosts)) {
    const type = ghostType as GhostType;

    // Check if this ghost is the only one with its EMF personality
    if (emfPersonalities.get(ghost.emfPersonality)?.length === 1) {
      uniquelyIdentifiableGhosts.push(type);
      continue;
    }

    // Check if this ghost is the only one with its thermal reading
    if (thermalReadings.get(ghost.thermalReading)?.length === 1) {
      uniquelyIdentifiableGhosts.push(type);
      continue;
    }

    // Check if this ghost has a unique camera manifestation
    let hasUniqueCamera = false;
    for (const manifestation of ghost.cameraManifestations) {
      // Skip Phantom's INVISIBLE (it's allowed to be unique)
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

/**
 * Prints a human-readable validation report
 */
export function printValidationReport(
  result: ValidationResult,
  report: DeductionOverlapReport
): void {
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
