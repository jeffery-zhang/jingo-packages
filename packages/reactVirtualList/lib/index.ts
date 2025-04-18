export type TVirtualListChildren = (index: number) => React.ReactNode

export interface IVirtualListSharedProps {
  className?: string
  style?: React.CSSProperties
  total?: number
  viewHeight?: number
  padding?: number
  children?: TVirtualListChildren
}

export interface IVirtualListHandler {
  scrollTo: (index: number) => void
}

export const DEFAULT_VIEW_HEIGHT = 300
export const DEFAULT_ROW_HEIGHT = 40
export const DEFAULT_PADDING = 2
