/**
 * Performance Testing Utilities
 * 
 * Tools for measuring and testing performance of investigation tools
 */

import { PerformanceMonitor } from './animationUtils';

export interface PerformanceTestResult {
  testName: string;
  averageFPS: number;
  averageFrameTime: number;
  minFPS: number;
  maxFPS: number;
  duration: number;
  passed: boolean;
  details: string;
}

export interface PerformanceTestConfig {
  name: string;
  duration: number; // milliseconds
  targetFPS: number;
  minAcceptableFPS: number;
}

/**
 * Run a performance test for a specified duration
 */
export async function runPerformanceTest(
  config: PerformanceTestConfig
): Promise<PerformanceTestResult> {
  const monitor = new PerformanceMonitor(120); // Sample 120 frames
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    let animationId: number;
    
    const testLoop = () => {
      monitor.recordFrame();
      
      const elapsed = performance.now() - startTime;
      
      if (elapsed >= config.duration) {
        cancelAnimationFrame(animationId);
        
        const avgFPS = monitor.getAverageFPS();
        const avgFrameTime = monitor.getAverageFrameTime();
        const minFPS = monitor.getMinFPS();
        const maxFPS = monitor.getMaxFPS();
        const passed = avgFPS >= config.minAcceptableFPS;
        
        const result: PerformanceTestResult = {
          testName: config.name,
          averageFPS: Math.round(avgFPS * 10) / 10,
          averageFrameTime: Math.round(avgFrameTime * 10) / 10,
          minFPS: Math.round(minFPS * 10) / 10,
          maxFPS: Math.round(maxFPS * 10) / 10,
          duration: config.duration,
          passed,
          details: passed
            ? `✅ Performance acceptable (${Math.round(avgFPS)} FPS avg)`
            : `❌ Performance below target (${Math.round(avgFPS)} FPS avg, expected ${config.minAcceptableFPS}+)`,
        };
        
        resolve(result);
      } else {
        animationId = requestAnimationFrame(testLoop);
      }
    };
    
    animationId = requestAnimationFrame(testLoop);
  });
}

/**
 * Run a suite of performance tests
 */
export async function runPerformanceTestSuite(
  tests: PerformanceTestConfig[]
): Promise<PerformanceTestResult[]> {
  const results: PerformanceTestResult[] = [];
  
  for (const test of tests) {
    console.log(`🧪 Running performance test: ${test.name}`);
    const result = await runPerformanceTest(test);
    results.push(result);
    console.log(result.details);
    
    // Wait a bit between tests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  
  return results;
}

/**
 * Measure tool switching latency
 */
export async function measureToolSwitchLatency(
  switchCallback: () => void
): Promise<number> {
  const startTime = performance.now();
  
  switchCallback();
  
  // Wait for next frame to ensure switch is complete
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const latency = performance.now() - startTime;
      resolve(latency);
    });
  });
}

/**
 * Generate a performance report
 */
export function generatePerformanceReport(
  results: PerformanceTestResult[]
): string {
  const totalTests = results.length;
  const passedTests = results.filter((r) => r.passed).length;
  const failedTests = totalTests - passedTests;
  
  let report = '📊 PERFORMANCE TEST REPORT\n';
  report += '='.repeat(50) + '\n\n';
  
  report += `Total Tests: ${totalTests}\n`;
  report += `Passed: ${passedTests} ✅\n`;
  report += `Failed: ${failedTests} ❌\n`;
  report += `Success Rate: ${Math.round((passedTests / totalTests) * 100)}%\n\n`;
  
  report += 'DETAILED RESULTS:\n';
  report += '-'.repeat(50) + '\n';
  
  results.forEach((result, index) => {
    report += `\n${index + 1}. ${result.testName}\n`;
    report += `   Status: ${result.passed ? '✅ PASS' : '❌ FAIL'}\n`;
    report += `   Average FPS: ${result.averageFPS}\n`;
    report += `   Frame Time: ${result.averageFrameTime}ms\n`;
    report += `   Min/Max FPS: ${result.minFPS} / ${result.maxFPS}\n`;
    report += `   Duration: ${result.duration}ms\n`;
    report += `   Details: ${result.details}\n`;
  });
  
  return report;
}

/**
 * Default performance test configurations
 */
export const DEFAULT_PERFORMANCE_TESTS: PerformanceTestConfig[] = [
  {
    name: 'Radar Tool Animation',
    duration: 5000,
    targetFPS: 60,
    minAcceptableFPS: 45,
  },
  {
    name: 'EMF Tool LED Updates',
    duration: 5000,
    targetFPS: 60,
    minAcceptableFPS: 45,
  },
  {
    name: 'Thermal Tool Scanning',
    duration: 5000,
    targetFPS: 60,
    minAcceptableFPS: 45,
  },
  {
    name: 'Camera Tool Viewfinder',
    duration: 5000,
    targetFPS: 60,
    minAcceptableFPS: 45,
  },
  {
    name: 'Spirit Box Waveform',
    duration: 5000,
    targetFPS: 60,
    minAcceptableFPS: 45,
  },
];

/**
 * Log performance metrics to console
 */
export function logPerformanceMetrics(result: PerformanceTestResult): void {
  console.group(`📊 ${result.testName}`);
  console.log(`Status: ${result.passed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Average FPS: ${result.averageFPS}`);
  console.log(`Frame Time: ${result.averageFrameTime}ms`);
  console.log(`Min FPS: ${result.minFPS}`);
  console.log(`Max FPS: ${result.maxFPS}`);
  console.log(`Duration: ${result.duration}ms`);
  console.log(`Details: ${result.details}`);
  console.groupEnd();
}
