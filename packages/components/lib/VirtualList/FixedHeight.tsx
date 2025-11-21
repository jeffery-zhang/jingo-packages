import { ForwardedRef, forwardRef, UIEventHandler, useImperativeHandle, useRef, useState } from 'react'
import { DEFAULT_PADDING, DEFAULT_ROW_HEIGHT, DEFAULT_VIEW_HEIGHT, VIRTUAL_LIST_ITEM_KEY, IVirtualListRef, IVirtualListSharedProps } from '.'

export interface IFixedHeightVirtualListProps extends IVirtualListSharedProps {
  rowHeight?: number
}

export const FixedHeightVirtualList = forwardRef(function (
  {
    className = '',
    style = {},
    total = 0,
    viewHeight = DEFAULT_VIEW_HEIGHT,
    padding = DEFAULT_PADDING,
    rowHeight = DEFAULT_ROW_HEIGHT,
    children,
  }: IFixedHeightVirtualListProps,
  ref: ForwardedRef<IVirtualListRef>,
) {
  const viewer = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState<number>(0)

  // container's height
  const containerHeight = Math.max(total * rowHeight, viewHeight)
  // start index of rendering
  const startIndex = Math.max(Math.floor(scrollTop / rowHeight) - padding, 0)
  // end index of rendering
  const endIndex = Math.min(Math.floor((scrollTop + viewHeight) / rowHeight) + padding, total)
  // render area transform offset
  const transformOffset = startIndex * rowHeight

  // render items
  const items = []
  for (let i = startIndex; i < endIndex; i++) {
    items.push(
      <div key={`${VIRTUAL_LIST_ITEM_KEY}-${i}`} data-index={i} className='virtual-list-render-item' style={{ height: rowHeight }}>
        {children?.(i)}
      </div>,
    )
  }

  // handle scroll
  const onScroll: UIEventHandler<HTMLDivElement> = () => {
    requestAnimationFrame(() => {
      const sTop = viewer.current?.scrollTop || 0
      setScrollTop(sTop)
    })
  }

  useImperativeHandle(ref, () => ({
    scrollTo: index => {
      if (index < 0 || index > total) return
      if (viewer.current && (index < startIndex + padding || index > endIndex - padding)) {
        viewer.current.scrollTo(0, index * rowHeight)
      }
    },
  }))

  return (
    <div
      ref={viewer}
      className={`virtual-list-viewer ${className}`}
      style={{ ...style, position: 'relative', height: viewHeight, overflowY: 'auto' }}
      onScroll={onScroll}
    >
      {/* Phantom div to expand the parent element */}
      <div className='virtual-list-phantom' style={{ position: 'absolute', width: '100%', height: containerHeight, top: 0, left: 0, zIndex: -1 }}></div>
      {/* Render area */}
      <div
        className='virtual-list-render-area'
        style={{ position: 'absolute', width: '100%', left: 0, top: 0, transform: `translate3d(0px, ${transformOffset}px, 0px)` }}
      >
        {items}
      </div>
    </div>
  )
})
