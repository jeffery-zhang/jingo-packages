import { IVirtualListHandler, IVirtualListSharedProps } from '..';
export interface IFixedHeightVirtualListProps extends IVirtualListSharedProps {
    rowHeight?: number;
}
export declare const FixedHeightVirtualList: import("react").ForwardRefExoticComponent<IFixedHeightVirtualListProps & import("react").RefAttributes<IVirtualListHandler>>;
