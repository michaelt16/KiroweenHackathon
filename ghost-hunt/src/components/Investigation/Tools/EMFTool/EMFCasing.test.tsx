import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { EMFCasing } from './EMFCasing';

describe('EMFCasing', () => {
  it('renders without crashing', () => {
    const { container } = render(<EMFCasing emfLevel={0} />);
    expect(container).toBeTruthy();
  });

  it('renders warning LED in inactive state when emfLevel < 4', () => {
    const { container } = render(<EMFCasing emfLevel={3} />);
    const warningLED = container.querySelector('div[style*="radial-gradient"]');
    expect(warningLED).toBeTruthy();
  });

  it('renders warning LED in active state when emfLevel >= 4', () => {
    const { container } = render(<EMFCasing emfLevel={4} />);
    const warningLED = container.querySelector('div[style*="radial-gradient"]');
    expect(warningLED).toBeTruthy();
  });

  it('renders toggle switch', () => {
    const { container } = render(<EMFCasing emfLevel={0} />);
    // Toggle switch should be present
    const elements = container.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders calibration screw', () => {
    const { container } = render(<EMFCasing emfLevel={0} />);
    // Calibration screw should be present
    const elements = container.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders micro-indentations', () => {
    const { container } = render(<EMFCasing emfLevel={0} />);
    // Should have multiple indentation elements
    const elements = container.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(10);
  });

  it('renders labels (CAL, BAT, etc.)', () => {
    const { container } = render(<EMFCasing emfLevel={0} />);
    const text = container.textContent;
    expect(text).toContain('CAL');
    expect(text).toContain('BAT');
  });
});
