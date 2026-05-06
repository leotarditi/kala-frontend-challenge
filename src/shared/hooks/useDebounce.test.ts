import { renderHook, act } from '@testing-library/react';
import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() =>
      useDebounce('hola', 400)
    );

    expect(result.current).toBe('hola');
  });

  it('should update value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: 'hola',
        },
      }
    );

    rerender({
      value: 'chau',
    });

    expect(result.current).toBe('hola');

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe('chau');
  });

  it('should cancel previous timeout when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: 'a',
        },
      }
    );

    rerender({ value: 'ab' });
    rerender({ value: 'abc' });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe('abc');
  });
});