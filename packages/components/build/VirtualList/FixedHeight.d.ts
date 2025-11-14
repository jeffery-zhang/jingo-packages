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
export interface IFixedHeightVirtualListProps extends IVirtualListSharedProps {
    rowHeight?: number;
}
export declare const FixedHeightVirtualList: import("react").ForwardRefExoticComponent<IFixedHeightVirtualListProps & import("react").RefAttributes<IVirtualListRef>>;
