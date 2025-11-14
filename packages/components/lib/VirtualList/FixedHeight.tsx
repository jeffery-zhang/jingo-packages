import { ForwardedRef, forwardRef, ReactElement, UIEventHandler, useImperativeHandle, useRef, useState } from 'react'
import { IRenderItemProps, RenderItem } from './RenderItem'
import { flushSync } from 'react-dom'

export type TVirtualListChildren = (index: number) => React.ReactNode

export interface IVirtualListSharedProps {
  className?: string
  style?: React.CSSProperties
  total?: number
  viewHeight?: number
  padding?: number
  children?: TVirtualListChildren
}

export interface IVirtualListRef {
  scrollTo: (index: number) => void
}

const DEFAULT_VIEW_HEIGHT = 300
const DEFAULT_ROW_HEIGHT = 40
const DEFAULT_PADDING = 2

export interface IFixedHeightVirtualListProps extends IVirtualListSharedProps {
  rowHeight?: number
}

const FIXED_HEIGHT_LIST_ITEM_KEY = '@jingoz/react-virtual-list-fixed-height-item'

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

  // 容器总高度
  const containerHeight = Math.max(total * rowHeight, viewHeight)
  // 渲染起始索引
  const startIndex = Math.max(Math.floor(scrollTop / rowHeight) - padding, 0)
  // 渲染结束索引
  const endIndex = Math.min(Math.floor((scrollTop + viewHeight) / rowHeight) + padding, total)

  // 根据索引渲染子组件
  const items: ReactElement<IRenderItemProps>[] = []
  for (let i = startIndex; i < endIndex; i++) {
    items.push(<RenderItem key={`${FIXED_HEIGHT_LIST_ITEM_KEY}-${i}`} index={i} offset={i * rowHeight} rowHeight={rowHeight} children={children} />)
  }

  // 监听滚动
  const onScroll: UIEventHandler<HTMLDivElement> = () => {
    flushSync(() => {
      requestAnimationFrame(() => {
        const sTop = viewer.current?.scrollTop || 0
        setScrollTop(sTop)
      })
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
    <div ref={viewer} className={`virtual-list-viewer ${className}`} style={{ ...style, height: viewHeight, overflowY: 'auto' }} onScroll={onScroll}>
      <div className='virtual-list-container' style={{ position: 'relative', height: containerHeight }}>
        {items}
      </div>
    </div>
  )
})
