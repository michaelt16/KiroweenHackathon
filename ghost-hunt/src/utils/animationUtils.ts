/**
 * Animation Utilities
 * 
 * Provides optimized animation helpers using requestAnimationFrame
 * and throttling to maintain 60fps performance.
 */

/**
 * Throttle function to limit execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * RequestAnimationFrame-based animation loop with 60fps throttling
 */
export class AnimationLoop {
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private readonly targetFPS: number;
  private readonly frameInterval: number;
  private isRunning: boolean = false;

  constructor(targetFPS: number = 60) {
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
  }

  start(callback: (deltaTime: number) => void): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();

    const animate = (currentTime: number) => {
      if (!this.isRunning) return;

      this.animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - this.lastFrameTime;

      // Throttle to target FPS
      if (deltaTime >= this.frameInterval) {
        this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
        callback(deltaTime);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  isActive(): boolean {
    return this.isRunning;
  }
}

/**
 * Create a throttled animation loop
 */
export function createAnimationLoop(
  callback: (deltaTime: number) => void,
  targetFPS: number = 60
): { start: () => void; stop: () => void; isActive: () => boolean } {
  const loop = new AnimationLoop(targetFPS);

  return {
    start: () => loop.start(callback),
    stop: () => loop.stop(),
    isActive: () => loop.isActive(),
  };
}

/**
 * Debounce function for delayed execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Linear interpolation for smooth transitions
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Easing functions for smooth animations
 */
export const easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

/**
 * Performance monitor for tracking frame rates
 */
export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private readonly maxSamples: number;
  private lastFrameTime: number = 0;

  constructor(maxSamples: number = 60) {
    this.maxSamples = maxSamples;
  }

  recordFrame(): void {
    const now = performance.now();
    if (this.lastFrameTime > 0) {
      const frameTime = now - this.lastFrameTime;
      this.frameTimes.push(frameTime);
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift();
      }
    }
    this.lastFrameTime = now;
  }

  getAverageFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const avgFrameTime =
      this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return 1000 / avgFrameTime;
  }

  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }

  getMinFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const maxFrameTime = Math.max(...this.frameTimes);
    return 1000 / maxFrameTime;
  }

  getMaxFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const minFrameTime = Math.min(...this.frameTimes);
    return 1000 / minFrameTime;
  }

  reset(): void {
    this.frameTimes = [];
    this.lastFrameTime = 0;
  }
}
