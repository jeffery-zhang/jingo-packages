import { ForwardedRef, forwardRef, UIEventHandler, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { DEFAULT_PADDING, DEFAULT_ROW_HEIGHT, DEFAULT_VIEW_HEIGHT, VIRTUAL_LIST_ITEM_KEY, IVirtualListRef, IVirtualListSharedProps } from '.'

export interface IDynamicHeightVirtualListProps extends IVirtualListSharedProps {
  estimateRowHeight: number
}

type TPositionData = {
  index: number
  height: number
  top: number
  bottom: number
}

// binary search to find the index
const binaryFindIndex = (arr: number[], value: number) => {
  let start = 0
  let end = arr.length - 1
  let tempIndex = -1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const currValue = arr[mid]
    if (currValue === value) {
      return mid + 1
    } else if (currValue < value) {
      start = mid + 1
    } else if (currValue > value) {
      if (tempIndex === -1 || tempIndex > mid) {
        tempIndex = mid
      }
      end = mid - 1
    }
  }
  return tempIndex
}

const VirtualItem: React.FC<{
  children: React.ReactNode
  offset: number
  index: number
  adjust: (index: number, height: number) => void
}> = ({ children, offset, index, adjust }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      // Use ResizeObserver for robust measurement if content changes size
      const observer = new ResizeObserver(entries => {
        if (entries[0]) {
          const height = entries[0].borderBoxSize[0].blockSize
          adjust(index, height)
        }
      })
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
    return () => {}
  }, [index, adjust])

  return (
    <div
      className='virtual-list-render-item'
      style={{
        position: 'absolute',
        width: '100%',
        transform: `translate3d(0, ${offset}px, 0)`,
      }}
      ref={ref}
    >
      {children}
    </div>
  )
}

export const DynamicHeightVirtualList = forwardRef(function (
  {
    className = '',
    style = {},
    total = 0,
    viewHeight = DEFAULT_VIEW_HEIGHT,
    padding = DEFAULT_PADDING,
    estimateRowHeight = DEFAULT_ROW_HEIGHT,
    children,
  }: IDynamicHeightVirtualListProps,
  ref: ForwardedRef<IVirtualListRef>,
) {
  const [scrollTop, setScrollTop] = useState<number>(0)
  const viewer = useRef<HTMLDivElement>(null)
  const positionsRef = useRef<TPositionData[]>([])
  const [totalHeight, setTotalHeight] = useState<number>(total * estimateRowHeight)

  // Initialize positionsRef and totalHeight
  useEffect(() => {
    const initialPositions: TPositionData[] = Array.from({ length: total }, (_, index) => ({
      index,
      height: estimateRowHeight,
      top: index * estimateRowHeight,
      bottom: index * estimateRowHeight + estimateRowHeight,
    }))
    positionsRef.current = initialPositions
    setTotalHeight(initialPositions[initialPositions.length - 1].bottom)
  }, [total, estimateRowHeight])

  // Binary search to find the start index
  const findStartIndex = (value: number) => {
    return binaryFindIndex(
      positionsRef.current.map(item => item.bottom),
      value,
    )
  }

  // Update start and end index within viewport
  const { start, end } = useMemo(() => {
    let start = findStartIndex(scrollTop)
    let end = start
    if (positionsRef.current[start]) {
      const endPosition = positionsRef.current[start].top + viewHeight

      while (end < total && positionsRef.current[end].top < endPosition) {
        end++
      }
    }

    return {
      start: Math.max(0, start - padding),
      end: Math.min(total, end + padding),
    }
  }, [scrollTop, total, totalHeight, viewHeight, padding])

  // Adjust positions and totalHeight when an item's height changes
  const adjustPositions = useCallback((index: number, height: number) => {
    // observer may invoke callback before unmount and return a 0 height of node, ignore
    if (height <= 0) return
    const target = positionsRef.current[index]
    if (!target) return
    const prevHeight = target.height
    const diff = height - prevHeight
    if (diff === 0) return
    target.height = height
    target.bottom = target.bottom + diff

    for (let i = index + 1; i < total; i++) {
      positionsRef.current[i].top = positionsRef.current[i - 1].bottom
      positionsRef.current[i].bottom = positionsRef.current[i].bottom + diff
    }

    setTotalHeight(positionsRef.current[positionsRef.current.length - 1].bottom)
  }, [])

  // Scroll event handler
  const onScroll: UIEventHandler<HTMLElement> = useCallback(e => {
    const currentScrollTop = e.currentTarget.scrollTop

    requestAnimationFrame(() => {
      setScrollTop(currentScrollTop)
    })
  }, [])

  useImperativeHandle(ref, () => ({
    scrollTo: (index: number) => {
      if (viewer.current && positionsRef.current[index]) {
        viewer.current.scrollTop = positionsRef.current[index].top
      }
    },
  }))

  // Render items
  const items = useMemo(() => {
    const renderItems = []
    for (let i = start; i < end; i++) {
      const target = positionsRef.current[i]
      if (!target) continue
      renderItems.push(
        <VirtualItem offset={target.top} key={`${VIRTUAL_LIST_ITEM_KEY}-${i}`} index={i} adjust={adjustPositions}>
          {children?.(i)}
        </VirtualItem>,
      )
    }

    return renderItems
  }, [start, end, children, adjustPositions])

  return (
    <div
      ref={viewer}
      className={`virtual-list-viewer ${className}`}
      style={{ ...style, position: 'relative', height: viewHeight, overflowY: 'auto' }}
      onScroll={onScroll}
    >
      {/* Phantom div to expand the parent element */}
      <div className='virtual-list-phantom' style={{ position: 'relative', width: '100%', height: totalHeight }}>
        {items}
      </div>
    </div>
  )
})
