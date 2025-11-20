import { useEffect, useState } from 'react'

export interface IUseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnVisible?: boolean
}

export type UseIntersectionObserverReturnValue<T> = [(node: T | null) => void, IntersectionObserverEntry | null]

export function useIntersectionObserver<T extends HTMLElement>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  freezeOnVisible = false,
}: IUseIntersectionObserverOptions = {}): UseIntersectionObserverReturnValue<T> {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [target, setTarget] = useState<T | null>(null)

  const isFrozen = entry?.isIntersecting && freezeOnVisible

  useEffect(() => {
    if (!target) return console.error('useIntersectionObserver: no target element')
    if (!('IntersectionObserver' in window)) return console.error('useIntersectionObserver: IntersectionObserver is not supported')
    if (isFrozen) return

    const options: IntersectionObserverInit = {
      root,
      rootMargin,
      threshold,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e?.target === target) setEntry(e)
        if (isFrozen) observer.unobserve(e.target)
      })
    }, options)

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [target, root, rootMargin, JSON.stringify(threshold), freezeOnVisible, isFrozen])

  return [setTarget, entry]
}
