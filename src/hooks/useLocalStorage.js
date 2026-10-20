import { useState, useEffect } from 'react'

/**
 * 带 localStorage 持久化的 useState
 * @param {string} key - localStorage 存储键
 * @param {*} initialValue - 初始值
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 忽略存储失败（如隐私模式）
    }
  }, [key, value])

  return [value, setValue]
}

/**
 * 生成唯一 ID
 */
export function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
