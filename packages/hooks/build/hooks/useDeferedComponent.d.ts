export declare function useDeferredComponent<T extends React.ComponentType<any>>(importFn: () => Promise<{
    default: T;
}>): T | null;
