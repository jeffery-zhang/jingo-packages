import { AwaitTimer, IAwaitTimer } from '@jingoz/await-timer'
import { useEffect, useRef } from 'react'

/**
 * Invokes callback every `delay` ms periodically
 * @param {() => void | Promise<void>} callback
 * @param {number} delay
 * @param {boolean} leading invoke callback immediately or not
 * @returns {[() => void, () => void]} [start, stop]
 */
export function useInterval(callback: () => void | Promise<void>, delay: number, leading = true): [() => void, () => void] {
  const awaitTimerRef = useRef<IAwaitTimer>(null)

  useEffect(() => {
    if (!awaitTimerRef.current) {
      awaitTimerRef.current = new AwaitTimer(callback, delay, {
        immediate: leading,
      })
    }

    return () => {
      if (awaitTimerRef.current) {
        awaitTimerRef.current.destroy()
        awaitTimerRef.current = null
      }
    }
  }, [callback, delay, leading])

  return [
    () => {
      awaitTimerRef.current?.start()
    },
    () => {
      awaitTimerRef.current?.stop()
    },
  ]
}
