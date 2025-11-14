import { TVirtualListChildren } from './FixedHeight'

export interface IRenderItemProps {
  index: number
  offset: number
  rowHeight: number
  children?: TVirtualListChildren
}

export function RenderItem({ index, offset, rowHeight, children }: IRenderItemProps) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: rowHeight,
        top: offset,
      }}
    >
      {children ? children(index) : null}
    </div>
  )
}
