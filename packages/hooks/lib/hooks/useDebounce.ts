import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook to debounce callback execution
 * @param callback callback
 * @param debounceTimeMs ms
 * @returns [debouncedCallback, isDebouncing]
 */
export function useDebounce<T extends (...args: any[]) => any>(callback: T, debounceTimeMs: number = 1000): [(...args: Parameters<T>) => void, boolean] {
  const [isPending, setIsPending] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const argsRef = useRef<Parameters<T>>(null)

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    argsRef.current = args
    setIsPending(true)

    timerRef.current = setTimeout(async () => {
      try {
        await callback(...(argsRef.current as Parameters<T>))
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        setIsPending(false)
      }
    }, debounceTimeMs)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return [debouncedCallback, isPending]
}
