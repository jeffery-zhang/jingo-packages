import { useSyncExternalStore } from 'react'

function getIsOnline() {
  return navigator.onLine
}

function subscribe(callback: (...args: any) => any) {
  document.addEventListener('online', callback)
  document.addEventListener('offline', callback)

  return () => {
    document.removeEventListener('online', callback)
    document.removeEventListener('offline', callback)
  }
}

/**
 * Judge whether the network is online
 * @returns {boolean}
 */
export function useIsOnline(): boolean {
  const isOnline = useSyncExternalStore(subscribe, getIsOnline)

  return isOnline
}
