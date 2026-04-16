import { useState, useEffect } from "react";

/**
 * useLocalStorage — 封装 localStorage 读写
 * @param {string} key - 存储键名
 * @param {*} initialValue - 默认值
 * @returns {[any, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`[useLocalStorage] 读取 "${key}" 失败:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`[useLocalStorage] 写入 "${key}" 失败:`, err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
