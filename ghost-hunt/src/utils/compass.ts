// Compass utilities for heading and angle calculations

/**
 * Normalize angle to 0-360° range
 * @param angle Angle in degrees (can be negative or > 360)
 * @returns Normalized angle (0-360°)
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
 * Used for smoothing compass readings without wrap-around issues
 * @param angles Array of angles in degrees
 * @returns Mean angle (0-360°)
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
 * Compass heading smoother to reduce jitter
 * Uses circular mean with weighted moving average
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
