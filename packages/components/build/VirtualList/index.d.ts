export type TVirtualListChildren = (index: number) => React.ReactNode;
export interface IVirtualListSharedProps {
    className?: string;
    style?: React.CSSProperties;
    total?: number;
    viewHeight?: number;
    padding?: number;
    children?: TVirtualListChildren;
}
export interface IVirtualListRef {
    scrollTo: (index: number) => void;
}
export * from './FixedHeight';
export * from './DynamicHeight';
export declare const DEFAULT_VIEW_HEIGHT = 300;
export declare const DEFAULT_ROW_HEIGHT = 40;
export declare const DEFAULT_PADDING = 4;
export declare const VIRTUAL_LIST_ITEM_KEY = "@jingoz/react-virtual-list-fixed-height-item";
