import { renderHook, act } from '@testing-library/react-native';
import { useDebounceValue } from '../useDebounceValue';

describe('useDebounceValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounceValue('initial', 500));
    expect(result.current[0]).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceValue(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current[0]).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Value should not change immediately
    expect(result.current[0]).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current[0]).toBe('updated');
  });

  it('should reset timer on multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceValue(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // First update
    rerender({ value: 'first', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Second update before debounce completes
    rerender({ value: 'second', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should still be initial
    expect(result.current[0]).toBe('initial');

    // Complete the debounce
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Value should be the latest
    expect(result.current[0]).toBe('second');
  });

  it('should allow manual value setting with setValue', () => {
    const { result } = renderHook(() => useDebounceValue('initial', 500));

    act(() => {
      result.current[1]('manual');
    });

    // Value should update immediately when using setValue
    expect(result.current[0]).toBe('manual');
  });
});
