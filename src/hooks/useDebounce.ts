import { useEffect, useState } from 'react';

/**
 * A custom hook that delays updating a value for a specified time.
 * Useful for reducing the frequency of updates in response to rapid changes.
 *
 * @param value - The value to be debounced
 * @param delay - The delay in milliseconds before the value updates
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
