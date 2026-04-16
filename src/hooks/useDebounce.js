import { useState, useEffect } from "react";

/**
 * useDebounce — 防抖 Hook
 * @param {*} value - 需要防抖的值
 * @param {number} delay - 延迟毫秒数，默认 300
 * @returns {*} 防抖后的值
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
