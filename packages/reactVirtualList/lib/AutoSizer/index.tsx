import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export type TRect = {
  width: number
  height: number
}

export interface IAutoSizerProps {
  children: ({ width, height }: TRect) => React.ReactNode
}

export function AutoSizer({ children }: IAutoSizerProps) {
  const [rect, setRect] = useState<TRect>({ width: 0, height: 0 })
  const autoSizerRef = useRef<HTMLDivElement>(null)

  const component = useCallback(() => {
    return children(rect)
  }, [rect])

  useLayoutEffect(() => {
    if (!autoSizerRef.current) return
    const { width, height } = autoSizerRef.current.getBoundingClientRect()
    setRect({ width, height })
  }, [])

  return (
    <div ref={autoSizerRef} style={{ width: '100%', height: '100%' }}>
      {component()}
    </div>
  )
}
