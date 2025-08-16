import { useEffect, useState } from 'react';

export function useDebounceValue<T>(value: T, delay: number): [T, (value: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const setValue = (newValue: T) => {
    setDebouncedValue(newValue);
  };

  return [debouncedValue, setValue];
}