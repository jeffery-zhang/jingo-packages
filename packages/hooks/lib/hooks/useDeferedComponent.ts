import { useEffect, useState } from 'react'

/**
 * import component lazily
 * @param importFn import function
 * @returns component
 */
export function useDeferredComponent<T extends React.ComponentType<any>>(importFn: () => Promise<{ default: T }>) {
  const [Component, setComponent] = useState<T | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only runs once on mount to set up deferred loading
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        async () => {
          try {
            const mod = await importFn()
            setComponent(() => mod.default)
          } catch (error) {
            console.log('useDeferedComponent: ', error)
            throw new Error('useDeferedComponent: ' + error)
          }
        },
        { timeout: 100 },
      )
    } else {
      setTimeout(async () => {
        try {
          const mod = await importFn()
          setComponent(() => mod.default)
        } catch (error) {
          console.log('useDeferedComponent: ', error)
          throw new Error('useDeferedComponent: ' + error)
        }
      }, 1)
    }
  }, [])

  return Component
}
