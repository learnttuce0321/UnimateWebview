import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebounceWithReset<T>(
  value: T,
  delay: number
): [T, (resetValue: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isResetting = useRef(false);

  useEffect(() => {
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const reset = useCallback((resetValue: T) => {
    isResetting.current = true;
    setDebouncedValue(resetValue);
  }, []);

  return [debouncedValue, reset];
}
