import { useEffect, useState } from 'react'

/**
 * Hook for using local or session storage
 * @param key
 * @param initialValue
 * @param type default 'local'
 * @returns {[T | null, (value: T) => void, () => void]}
 */
export function useStorage<T>(key: string, initialValue: T | null = null, type: 'session' | 'local' = 'local'): [T | null, (value: T) => void, () => void] {
  const storage = type === 'session' ? sessionStorage : localStorage

  const [value, setValue] = useState<T | null>(() => {
    const jsonValue = storage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    return initialValue
  })

  const clearStorage = () => {
    storage.removeItem(key)
    setValue(null)
  }

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue, clearStorage]
}
