import { IVirtualListRef, IVirtualListSharedProps } from '.';
export interface IDynamicHeightVirtualListProps extends IVirtualListSharedProps {
    estimateRowHeight: number;
}
export declare const DynamicHeightVirtualList: import("react").ForwardRefExoticComponent<IDynamicHeightVirtualListProps & import("react").RefAttributes<IVirtualListRef>>;
