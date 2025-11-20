/**
 * Compass Utilities Module
 * 
 * Provides functions for compass heading and angle calculations including:
 * - Angle normalization (handling wrap-around)
 * - Circular mean for smoothing compass readings
 * - Relative angle calculations
 * - Forward cone detection for radar
 * - Compass heading smoothing
 * 
 * Key Concepts:
 * - Angles wrap around at 360° (e.g., 350° + 20° = 10°)
 * - Circular mean prevents averaging issues (e.g., mean of 350° and 10° is 0°, not 180°)
 * - Relative angles are -180° to 180° (negative = left, positive = right)
 * 
 * @module compass
 */

/**
 * Normalize angle to 0-360° range
 * 
 * Handles negative angles and angles > 360° by wrapping them into the
 * standard compass range. Essential for all compass calculations.
 * 
 * @param angle Angle in degrees (can be any value)
 * @returns Normalized angle (0-360°)
 * 
 * @example
 * normalizeAngle(-45);  // Returns 315°
 * normalizeAngle(370);  // Returns 10°
 * normalizeAngle(720);  // Returns 0°
 */
export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Calculate relative angle between two bearings
 * Handles wrap-around (e.g., 350° to 10° = 20° difference, not 340°)
 * @param bearing Target bearing (0-360°)
 * @param heading Current heading (0-360°)
 * @returns Relative angle (-180° to 180°, where 0° is straight ahead)
 */
export function calculateRelativeAngle(bearing: number, heading: number): number {
  let diff = bearing - heading;

  // Normalize to -180 to 180 range
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }

  return diff;
}

/**
 * Calculate circular mean for a set of angles
 * 
 * Standard arithmetic mean fails for angles due to wrap-around:
 * - Mean of [350°, 10°] should be 0° (not 180°)
 * - Mean of [0°, 90°, 180°, 270°] should be undefined (not 135°)
 * 
 * Circular mean algorithm:
 * 1. Convert each angle to unit vector (sin, cos)
 * 2. Average the vectors
 * 3. Convert back to angle using atan2
 * 
 * This correctly handles wrap-around and produces intuitive results.
 * 
 * @param angles Array of angles in degrees (0-360°)
 * @returns Mean angle (0-360°), or 0° if array is empty
 * 
 * @example
 * circularMean([350, 10]);        // Returns ~0° (not 180°)
 * circularMean([0, 90, 180, 270]); // Returns ~0° (vectors cancel out)
 * circularMean([45, 50, 55]);      // Returns 50°
 */
export function circularMean(angles: number[]): number {
  if (angles.length === 0) return 0;

  // Convert to radians and calculate mean of sin/cos
  let sinSum = 0;
  let cosSum = 0;

  angles.forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  });

  // Calculate mean angle
  const meanRad = Math.atan2(sinSum / angles.length, cosSum / angles.length);
  const meanDeg = (meanRad * 180) / Math.PI;

  return normalizeAngle(meanDeg);
}

/**
 * Check if a bearing is within a forward cone relative to heading
 * @param bearing Target bearing (0-360°)
 * @param heading Current heading (0-360°)
 * @param coneAngle Half-angle of the cone in degrees (default: 45°)
 * @returns True if bearing is within the forward cone
 */
export function isInForwardCone(bearing: number, heading: number, coneAngle: number = 45): boolean {
  const relativeAngle = Math.abs(calculateRelativeAngle(bearing, heading));
  return relativeAngle <= coneAngle;
}

/**
 * Check if a bearing is directly ahead (within a narrow cone)
 * @param bearing Target bearing (0-360°)
 * @param heading Current heading (0-360°)
 * @param threshold Threshold angle in degrees (default: 5°)
 * @returns True if bearing is directly ahead
 */
export function isDirectlyAhead(bearing: number, heading: number, threshold: number = 5): boolean {
  const relativeAngle = Math.abs(calculateRelativeAngle(bearing, heading));
  return relativeAngle <= threshold;
}

/**
 * Compass Heading Smoother
 * 
 * Reduces compass jitter by applying circular mean to heading history.
 * Unlike GPS smoother, this uses unweighted circular mean because compass
 * readings are typically more stable and don't need recency bias.
 * 
 * Algorithm:
 * - Maintains history of last 5 headings
 * - Applies circular mean (handles wrap-around correctly)
 * - Returns smoothed heading
 * 
 * Calibration Process:
 * Device compass calibration typically requires:
 * 1. Move device in figure-8 pattern
 * 2. Rotate device on all axes
 * 3. Avoid magnetic interference (metal, electronics)
 * 4. Calibration improves accuracy from ±30° to ±10°
 * 
 * @example
 * const smoother = new CompassSmoother();
 * 
 * // Add headings as they arrive from device
 * const smoothed1 = smoother.addHeading(45);   // Returns 45°
 * const smoothed2 = smoother.addHeading(50);   // Returns ~47.5°
 * const smoothed3 = smoother.addHeading(355);  // Handles wrap-around correctly
 * 
 * // Check how many readings are stored
 * console.log(smoother.count); // 3
 * 
 * // Reset when needed (e.g., after long pause)
 * smoother.reset();
 */
export class CompassSmoother {
  private headings: number[] = [];
  private maxHeadings = 5;

  /**
   * Add a new heading and get smoothed result
   * @param heading New compass heading (0-360°)
   * @returns Smoothed heading (0-360°)
   */
  addHeading(heading: number): number {
    this.headings.push(normalizeAngle(heading));

    // Keep only last N headings
    if (this.headings.length > this.maxHeadings) {
      this.headings.shift();
    }

    // If only one heading, return it
    if (this.headings.length === 1) {
      return heading;
    }

    // Calculate circular mean
    return circularMean(this.headings);
  }

  /**
   * Reset the smoother
   */
  reset(): void {
    this.headings = [];
  }

  /**
   * Get current number of stored headings
   */
  get count(): number {
    return this.headings.length;
  }
}
