import { TVirtualListChildren } from '.';
export interface IRenderItemProps {
    index: number;
    offset: number;
    rowHeight: number;
    children?: TVirtualListChildren;
}
export declare function RenderItem({ index, offset, rowHeight, children }: IRenderItemProps): import("react/jsx-runtime").JSX.Element;
