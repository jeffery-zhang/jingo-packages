import { useSyncExternalStore } from 'react'

function subscribe(callback: (...args: any) => any) {
  document.addEventListener('visibilitychange', callback)

  return () => {
    document.removeEventListener('visibilitychange', callback)
  }
}

function getSnapshot() {
  return document.visibilityState !== 'hidden'
}

/**
 * Judge whether the window is visible
 * @returns {boolean}
 */
export function useisWindowVisible(): boolean {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot)

  return isVisible
}
