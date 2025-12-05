import { describe, it, expect } from 'vitest';
import { GhostType } from './ghostStore';
import {
  validateDeductionOverlap,
  generateOverlapReport,
  printValidationReport,
} from './ghostValidation';

// Import the initial ghost data from the store
// We'll need to access it directly for testing
import { useGhostStore } from './ghostStore';

describe('Ghost Data Validation', () => {
  it('should validate all 7 ghost profiles for deduction overlap', () => {
    // Get all ghosts from the store
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;

    // Validate deduction overlap
    const result = validateDeductionOverlap(ghosts);
    const report = generateOverlapReport(ghosts);

    // Print the report for visibility
    printValidationReport(result, report);

    // Assert that validation passes
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should ensure at least 2 ghosts share each EMF personality', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;
    const report = generateOverlapReport(ghosts);

    for (const [personality, ghostTypes] of report.emfPersonalities.entries()) {
      expect(ghostTypes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('should ensure at least 2 ghosts share each camera manifestation (except Phantom invisible)', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;
    const report = generateOverlapReport(ghosts);

    for (const [manifestation, ghostTypes] of report.cameraManifestations.entries()) {
      // Phantom's INVISIBLE is allowed to be unique
      if (manifestation === 'invisible') {
        // Check if Phantom is the only one with high probability
        const phantom = ghosts[GhostType.PHANTOM];
        const invisibleManif = phantom?.cameraManifestations.find(
          (m) => m.primary === 'invisible'
        );
        if (invisibleManif && invisibleManif.probability >= 0.9) {
          // This is expected - skip this check
          continue;
        }
      }

      expect(ghostTypes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('should ensure at least 2 ghosts share each thermal reading', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;
    const report = generateOverlapReport(ghosts);

    for (const [reading, ghostTypes] of report.thermalReadings.entries()) {
      expect(ghostTypes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('should ensure each Spirit Box word appears in at least 2 ghost families', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;
    const report = generateOverlapReport(ghosts);

    for (const [word, ghostTypes] of report.spiritBoxWords.entries()) {
      expect(ghostTypes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('should ensure no ghost is uniquely identifiable by a single trait', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;
    const report = generateOverlapReport(ghosts);

    expect(report.uniquelyIdentifiableGhosts).toHaveLength(0);
  });

  it('should validate camera manifestation probabilities sum to 1.0', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;

    for (const ghost of Object.values(ghosts)) {
      const totalProbability = ghost.cameraManifestations.reduce(
        (sum, m) => sum + m.probability,
        0
      );
      expect(Math.abs(totalProbability - 1.0)).toBeLessThan(0.01);
    }
  });

  it('should validate Spirit Box frequencies are in range [0, 1]', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;

    for (const ghost of Object.values(ghosts)) {
      expect(ghost.spiritBoxSignature.knobA).toBeGreaterThanOrEqual(0);
      expect(ghost.spiritBoxSignature.knobA).toBeLessThanOrEqual(1);
      expect(ghost.spiritBoxSignature.knobB).toBeGreaterThanOrEqual(0);
      expect(ghost.spiritBoxSignature.knobB).toBeLessThanOrEqual(1);
    }
  });

  it('should validate word families are not empty', () => {
    const store = useGhostStore.getState();
    const ghosts = store.ghosts;

    for (const ghost of Object.values(ghosts)) {
      expect(ghost.wordFamilies.emotion.length).toBeGreaterThan(0);
      expect(ghost.wordFamilies.theme.length).toBeGreaterThan(0);
    }
  });
});
