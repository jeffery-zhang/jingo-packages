import { ForwardedRef, forwardRef, ReactElement, useImperativeHandle, useRef, useState } from 'react'
import { DEFAULT_PADDING, DEFAULT_ROW_HEIGHT, DEFAULT_VIEW_HEIGHT, IVirtualListHandler, IVirtualListSharedProps } from '..'
import { IRenderItemProps, RenderItem } from '../RenderItem'

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
  ref: ForwardedRef<IVirtualListHandler>,
) {
  const viewer = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState<number>(0)
  console.log(total)

  // 容器总高度
  const containerHeight = Math.max(total * rowHeight, viewHeight)
  // 渲染起始索引
  const startIndex = Math.max(Math.floor(scrollTop / containerHeight) - padding, 0)
  // 渲染结束索引
  const endIndex = Math.min(Math.ceil((scrollTop + viewHeight) / containerHeight) + padding, total)

  // 根据索引渲染子组件
  const items: ReactElement<IRenderItemProps>[] = []
  for (let i = startIndex; i < endIndex; i++) {
    items.push(<RenderItem key={`${FIXED_HEIGHT_LIST_ITEM_KEY}-${i}`} index={i} offset={i * rowHeight} rowHeight={rowHeight} children={children} />)
  }

  // 监听滚动
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      setScrollTop(e.currentTarget.scrollTop)
    })
  }

  useImperativeHandle(ref, () => ({
    scrollTo: () => {},
  }))

  return (
    <div ref={viewer} className={`virtual-list-viewer ${className}`} style={{ ...style, height: viewHeight, overflowY: 'auto' }} onScroll={onScroll}>
      <div className='virtual-list-container' style={{ position: 'relative', height: containerHeight }}>
        {items}
      </div>
    </div>
  )
})
