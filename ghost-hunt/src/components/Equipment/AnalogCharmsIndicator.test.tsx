import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AnalogCharmsIndicator } from './AnalogCharmsIndicator';

describe('AnalogCharmsIndicator', () => {
  it('renders with correct count', () => {
    const { container } = render(<AnalogCharmsIndicator count={7} />);
    expect(container.textContent).toContain('7');
  });

  it('clamps count to 0-99 range (negative)', () => {
    const { container } = render(<AnalogCharmsIndicator count={-5} />);
    expect(container.textContent).toContain('0');
  });

  it('clamps count to 0-99 range (over max)', () => {
    const { container } = render(<AnalogCharmsIndicator count={150} />);
    expect(container.textContent).toContain('99');
  });

  it('displays CHARMS label', () => {
    const { container } = render(<AnalogCharmsIndicator count={10} />);
    expect(container.textContent).toContain('CHARMS');
  });

  it('renders with correct dimensions', () => {
    const { container } = render(<AnalogCharmsIndicator count={10} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('120px');
    expect(wrapper.style.height).toBe('70px');
  });

  it('renders tally marks for count of 5', () => {
    const { container } = render(<AnalogCharmsIndicator count={5} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    // Should have 1 group of 5 (4 vertical lines + 1 diagonal)
    const lines = svg?.querySelectorAll('line');
    expect(lines?.length).toBe(5); // 4 vertical + 1 diagonal
  });

  it('renders tally marks for count of 7', () => {
    const { container } = render(<AnalogCharmsIndicator count={7} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    // Should have 1 group of 5 + 2 remainder lines
    const lines = svg?.querySelectorAll('line');
    expect(lines?.length).toBe(7); // 5 (group) + 2 (remainder)
  });

  it('renders tally marks for count of 12', () => {
    const { container } = render(<AnalogCharmsIndicator count={12} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    // Should have 2 groups of 5 + 2 remainder lines
    const lines = svg?.querySelectorAll('line');
    expect(lines?.length).toBe(12); // 10 (2 groups) + 2 (remainder)
  });

  it('renders no tally marks for count of 0', () => {
    const { container } = render(<AnalogCharmsIndicator count={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    const lines = svg?.querySelectorAll('line');
    expect(lines?.length).toBe(0);
  });

  it('has aged paper background color', () => {
    const { container } = render(<AnalogCharmsIndicator count={10} />);
    const paperCard = container.querySelector('div > div') as HTMLElement;
    expect(paperCard.style.background).toContain('#d8d4c8');
  });

  it('has tape strip at top', () => {
    const { container } = render(<AnalogCharmsIndicator count={10} />);
    // Check for tape element (should be positioned absolutely at top)
    const elements = container.querySelectorAll('div');
    const tapeElement = Array.from(elements).find(el => {
      const style = (el as HTMLElement).style;
      return style.position === 'absolute' && 
             style.top === '-5px' &&
             style.backgroundImage.includes('tape');
    });
    expect(tapeElement).toBeTruthy();
  });
});
