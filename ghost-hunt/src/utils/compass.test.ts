// Compass utilities tests
import { describe, it, expect } from 'vitest';
import {
  normalizeAngle,
  calculateRelativeAngle,
  circularMean,
  isInForwardCone,
  isDirectlyAhead,
  CompassSmoother,
} from './compass';

describe('Compass Utilities', () => {
  describe('normalizeAngle', () => {
    it('should keep angles in 0-360 range unchanged', () => {
      expect(normalizeAngle(0)).toBe(0);
      expect(normalizeAngle(90)).toBe(90);
      expect(normalizeAngle(180)).toBe(180);
      expect(normalizeAngle(270)).toBe(270);
      expect(normalizeAngle(359)).toBe(359);
    });

    it('should normalize angles > 360', () => {
      expect(normalizeAngle(360)).toBe(0);
      expect(normalizeAngle(450)).toBe(90);
      expect(normalizeAngle(720)).toBe(0);
    });

    it('should normalize negative angles', () => {
      expect(normalizeAngle(-90)).toBe(270);
      expect(normalizeAngle(-180)).toBe(180);
      expect(normalizeAngle(-270)).toBe(90);
      expect(normalizeAngle(-360)).toBe(0);
    });
  });

  describe('calculateRelativeAngle', () => {
    it('should calculate relative angle for same direction', () => {
      expect(calculateRelativeAngle(90, 90)).toBe(0);
      expect(calculateRelativeAngle(180, 180)).toBe(0);
    });

    it('should calculate relative angle to the right', () => {
      expect(calculateRelativeAngle(90, 0)).toBe(90);
      expect(calculateRelativeAngle(180, 90)).toBe(90);
    });

    it('should calculate relative angle to the left', () => {
      expect(calculateRelativeAngle(0, 90)).toBe(-90);
      expect(calculateRelativeAngle(90, 180)).toBe(-90);
    });

    it('should handle wrap-around correctly', () => {
      // 350° to 10° should be 20° (not 340°)
      expect(calculateRelativeAngle(10, 350)).toBe(20);
      expect(calculateRelativeAngle(350, 10)).toBe(-20);
    });

    it('should return values in -180 to 180 range', () => {
      const result1 = calculateRelativeAngle(270, 90);
      const result2 = calculateRelativeAngle(90, 270);

      expect(result1).toBeGreaterThanOrEqual(-180);
      expect(result1).toBeLessThanOrEqual(180);
      expect(result2).toBeGreaterThanOrEqual(-180);
      expect(result2).toBeLessThanOrEqual(180);
    });
  });

  describe('circularMean', () => {
    it('should return 0 for empty array', () => {
      expect(circularMean([])).toBe(0);
    });

    it('should return single angle unchanged', () => {
      expect(circularMean([90])).toBe(90);
      expect(circularMean([180])).toBe(180);
    });

    it('should calculate mean of similar angles', () => {
      const mean = circularMean([85, 90, 95]);
      expect(mean).toBeCloseTo(90, 0);
    });

    it('should handle wrap-around correctly', () => {
      // Mean of 350° and 10° should be 0° (not 180°)
      const mean = circularMean([350, 10]);
      expect(mean).toBeCloseTo(0, 0);
    });

    it('should handle opposite angles', () => {
      // Mean of 0° and 180° could be either 90° or 270°
      const mean = circularMean([0, 180]);
      expect(mean === 90 || mean === 270).toBe(true);
    });
  });

  describe('isInForwardCone', () => {
    it('should return true when bearing is directly ahead', () => {
      expect(isInForwardCone(90, 90)).toBe(true);
      expect(isInForwardCone(180, 180)).toBe(true);
    });

    it('should return true when bearing is within default 45° cone', () => {
      expect(isInForwardCone(90, 50)).toBe(true); // 40° right
      expect(isInForwardCone(90, 130)).toBe(true); // 40° left
    });

    it('should return false when bearing is outside cone', () => {
      expect(isInForwardCone(90, 0)).toBe(false); // 90° right
      expect(isInForwardCone(90, 180)).toBe(false); // 90° left
    });

    it('should handle custom cone angles', () => {
      expect(isInForwardCone(90, 60, 30)).toBe(true); // 30° within 30° cone
      expect(isInForwardCone(90, 50, 30)).toBe(false); // 40° outside 30° cone
    });

    it('should handle wrap-around', () => {
      expect(isInForwardCone(10, 350)).toBe(true); // 20° difference
      expect(isInForwardCone(350, 10)).toBe(true); // 20° difference
    });
  });

  describe('isDirectlyAhead', () => {
    it('should return true when bearing matches heading', () => {
      expect(isDirectlyAhead(90, 90)).toBe(true);
      expect(isDirectlyAhead(180, 180)).toBe(true);
    });

    it('should return true within default 5° threshold', () => {
      expect(isDirectlyAhead(90, 87)).toBe(true);
      expect(isDirectlyAhead(90, 93)).toBe(true);
    });

    it('should return false outside threshold', () => {
      expect(isDirectlyAhead(90, 80)).toBe(false);
      expect(isDirectlyAhead(90, 100)).toBe(false);
    });

    it('should handle custom thresholds', () => {
      expect(isDirectlyAhead(90, 80, 10)).toBe(true); // 10° within 10° threshold
      expect(isDirectlyAhead(90, 75, 10)).toBe(false); // 15° outside 10° threshold
    });

    it('should handle wrap-around', () => {
      expect(isDirectlyAhead(2, 358)).toBe(true); // 4° difference
      expect(isDirectlyAhead(358, 2)).toBe(true); // 4° difference
    });
  });

  describe('CompassSmoother', () => {
    it('should return single heading unchanged', () => {
      const smoother = new CompassSmoother();
      expect(smoother.addHeading(90)).toBe(90);
    });

    it('should smooth multiple headings', () => {
      const smoother = new CompassSmoother();

      smoother.addHeading(85);
      smoother.addHeading(90);
      const smoothed = smoother.addHeading(95);

      // Should be close to 90
      expect(smoothed).toBeGreaterThan(88);
      expect(smoothed).toBeLessThan(92);
    });

    it('should handle wrap-around correctly', () => {
      const smoother = new CompassSmoother();

      smoother.addHeading(350);
      smoother.addHeading(0);
      const smoothed = smoother.addHeading(10);

      // Should be close to 0, not 120
      expect(smoothed).toBeLessThan(15);
      expect(smoothed > 345 || smoothed < 15).toBe(true);
    });

    it('should keep only last 5 headings', () => {
      const smoother = new CompassSmoother();

      for (let i = 0; i < 10; i++) {
        smoother.addHeading(i * 10);
      }

      expect(smoother.count).toBe(5);
    });

    it('should reset correctly', () => {
      const smoother = new CompassSmoother();

      smoother.addHeading(90);
      smoother.addHeading(95);
      smoother.reset();

      expect(smoother.count).toBe(0);
      expect(smoother.addHeading(180)).toBe(180);
    });

    it('should normalize input headings', () => {
      const smoother = new CompassSmoother();

      const smoothed1 = smoother.addHeading(450); // Should normalize to 90
      const smoothed2 = smoother.addHeading(-90); // Should normalize to 270

      expect(smoothed1).toBe(90);
      // Second one should be mean of 90 and 270
      expect(smoothed2 === 0 || smoothed2 === 180).toBe(true);
    });
  });
});
