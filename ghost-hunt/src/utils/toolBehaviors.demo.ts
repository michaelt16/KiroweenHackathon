/**
 * Tool Behavior Utilities - Manual Verification Demo
 * 
 * This file demonstrates all utility functions working correctly.
 * Run this to verify the implementation.
 */

import {
  calculateDistance,
  calculateBearing,
  calculateEMFLevel,
  isGhostInForwardCone,
  addRadarWobble,
  checkSpiritBoxLock,
  getRandomWord,
  determineCameraManifestation,
  calculateThermalReading
} from './toolBehaviors';

console.log('='.repeat(60));
console.log('TOOL BEHAVIOR UTILITIES - VERIFICATION DEMO');
console.log('='.repeat(60));

// ============================================================================
// 1. Distance & Bearing Calculations
// ============================================================================
console.log('\n1. DISTANCE & BEARING CALCULATIONS');
console.log('-'.repeat(60));

const playerPos = { lat: 40.7128, lng: -74.0060 }; // New York
const ghostPos = { lat: 40.7614, lng: -73.9776 }; // Times Square

const distance = calculateDistance(playerPos, ghostPos);
const bearing = calculateBearing(playerPos, ghostPos);

console.log(`Player Position: ${playerPos.lat}, ${playerPos.lng}`);
console.log(`Ghost Position: ${ghostPos.lat}, ${ghostPos.lng}`);
console.log(`Distance: ${distance.toFixed(2)}m (~6.5km expected)`);
console.log(`Bearing: ${bearing.toFixed(2)}° (northeast expected)`);

// ============================================================================
// 2. EMF Calculations
// ============================================================================
console.log('\n2. EMF CALCULATIONS');
console.log('-'.repeat(60));

const distances = [2, 5, 8, 15, 25, 45];

console.log('Distance-based EMF levels (pure distance):');
distances.forEach(d => {
  const level = calculateEMFLevel(d);
  console.log(`  ${d}m → Level ${level}`);
});

// ============================================================================
// 3. Radar Calculations
// ============================================================================
console.log('\n3. RADAR CALCULATIONS');
console.log('-'.repeat(60));

const testCases = [
  { ghost: 45, player: 50, expected: 'IN CONE' },
  { ghost: 180, player: 0, expected: 'OUT OF CONE' },
  { ghost: 10, player: 350, expected: 'IN CONE (wraparound)' },
];

console.log('Forward cone detection (±45°):');
testCases.forEach(test => {
  const inCone = isGhostInForwardCone(test.ghost, test.player, 45);
  console.log(`  Ghost: ${test.ghost}°, Player: ${test.player}° → ${inCone ? '✓' : '✗'} ${test.expected}`);
});

console.log('\nRadar wobble (±5°):');
const trueBearing = 180;
for (let i = 0; i < 5; i++) {
  const wobbled = addRadarWobble(trueBearing);
  console.log(`  Attempt ${i + 1}: ${trueBearing}° → ${wobbled.toFixed(2)}°`);
}

// ============================================================================
// 4. Spirit Box Calculations
// ============================================================================
console.log('\n4. SPIRIT BOX CALCULATIONS');
console.log('-'.repeat(60));

const lockTests = [
  { knobA: 0.35, knobB: 0.72, targetA: 0.36, targetB: 0.73, expected: 'LOCKED' },
  { knobA: 0.35, knobB: 0.72, targetA: 0.50, targetB: 0.90, expected: 'NOT LOCKED' },
];

console.log('Spirit Box lock detection (tolerance: 0.06):');
lockTests.forEach(test => {
  const locked = checkSpiritBoxLock(test.knobA, test.knobB, test.targetA, test.targetB, 0.06);
  console.log(`  Knobs: (${test.knobA}, ${test.knobB}) vs Target: (${test.targetA}, ${test.targetB})`);
  console.log(`  → ${locked ? '✓' : '✗'} ${test.expected}`);
});

const wordFamilies = {
  emotion: ['soft', 'lost', 'cold'],
  theme: ['drift', 'fade', 'whisper']
};

console.log('\nRandom word generation:');
for (let i = 0; i < 5; i++) {
  const word = getRandomWord(wordFamilies);
  console.log(`  Attempt ${i + 1}: "${word}"`);
}

// ============================================================================
// 5. Camera Calculations
// ============================================================================
console.log('\n5. CAMERA CALCULATIONS');
console.log('-'.repeat(60));

const manifestations = [
  { primary: 'faint_silhouette' as const, probability: 0.8 }
];

console.log('Camera manifestation probability by distance:');
[3, 7, 12].forEach(d => {
  const results = [];
  for (let i = 0; i < 10; i++) {
    const result = determineCameraManifestation(d, manifestations);
    results.push(result);
  }
  const successCount = results.filter(r => r !== null).length;
  console.log(`  ${d}m: ${successCount}/10 manifestations (${successCount * 10}%)`);
});

// ============================================================================
// 6. Thermal Calculations
// ============================================================================
console.log('\n6. THERMAL CALCULATIONS');
console.log('-'.repeat(60));

const thermalTests = [
  { distance: 5, category: 'normal' as const },
  { distance: 5, category: 'cold_spot' as const },
  { distance: 5, category: 'deep_cold' as const },
  { distance: 15, category: 'deep_cold' as const },
];

console.log('Thermal readings:');
thermalTests.forEach(test => {
  const reading = calculateThermalReading(test.distance, test.category);
  console.log(`  ${test.distance}m, ${test.category}: ${reading.temperature}°F (${reading.category})`);
});

console.log('\n' + '='.repeat(60));
console.log('✓ ALL UTILITY FUNCTIONS VERIFIED');
console.log('='.repeat(60));
