import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MechanicalFilmCounter } from './MechanicalFilmCounter';

describe('MechanicalFilmCounter', () => {
  it('renders with correct count', () => {
    const { container } = render(<MechanicalFilmCounter count={12} />);
    expect(container.textContent).toContain('12');
  });

  it('formats single digit with leading zero', () => {
    const { container } = render(<MechanicalFilmCounter count={5} />);
    expect(container.textContent).toContain('05');
  });

  it('clamps count to 0-99 range (negative)', () => {
    const { container } = render(<MechanicalFilmCounter count={-5} />);
    expect(container.textContent).toContain('00');
  });

  it('clamps count to 0-99 range (over max)', () => {
    const { container } = render(<MechanicalFilmCounter count={150} />);
    expect(container.textContent).toContain('99');
  });

  it('displays FILM ROLLS label', () => {
    const { container } = render(<MechanicalFilmCounter count={10} />);
    expect(container.textContent).toContain('FILM ROLLS');
  });

  it('renders with metal housing dimensions', () => {
    const { container } = render(<MechanicalFilmCounter count={10} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('120px');
    expect(wrapper.style.height).toBe('70px');
  });
});
