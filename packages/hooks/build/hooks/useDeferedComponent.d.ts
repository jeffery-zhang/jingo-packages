/**
 * import component lazily
 * @param importFn import function
 * @returns component
 */
export declare function useDeferredComponent<T extends React.ComponentType<any>>(importFn: () => Promise<{
    default: T;
}>): T | null;
