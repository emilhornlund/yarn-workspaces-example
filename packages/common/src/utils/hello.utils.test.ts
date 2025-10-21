import { describe, expect, it } from 'vitest';

import { greet } from './hello.utils';

describe('greet', () => {
  it('returns a proper greeting for a given name', () => {
    expect(greet('Emil')).toBe('Hello, Emil!');
  });

  it('handles empty names gracefully', () => {
    expect(greet('')).toBe('Hello, !');
  });

  it('trims whitespace from the name if needed', () => {
    expect(greet('  World  ')).toBe('Hello, World!');
  });
});
