export type TRect = {
    width: number;
    height: number;
};
export interface IAutoSizerProps {
    children: ({ width, height }: TRect) => React.ReactNode;
}
export declare function AutoSizer({ children }: IAutoSizerProps): import("react/jsx-runtime").JSX.Element;
