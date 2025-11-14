import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook to throttle callback execution
 * @param callback callback
 * @param throttleTimeMs ms
 * @returns [throttledCallback, isThrottling]
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  throttleTimeMs: number = 1000,
): [(...args: Parameters<T>) => void, boolean] {
  const isWaitingRef = useRef(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const throttledCallback = useCallback(async (...args: Parameters<T>) => {
    if (isWaitingRef.current) {
      return
    }

    isWaitingRef.current = true
    setIsWaiting(true)

    try {
      await callback(...args)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      timerRef.current = setTimeout(() => {
        isWaitingRef.current = false
        setIsWaiting(false)
      }, throttleTimeMs)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return [throttledCallback, isWaiting]
}
