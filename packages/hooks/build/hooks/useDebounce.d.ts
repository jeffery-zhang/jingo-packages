/**
 * Hook to debounce callback execution
 * @param callback callback
 * @param debounceTimeMs ms
 * @returns [debouncedCallback, isDebouncing]
 */
export declare function useDebounce<T extends (...args: any[]) => any>(callback: T, debounceTimeMs?: number): [(...args: Parameters<T>) => void, boolean];
