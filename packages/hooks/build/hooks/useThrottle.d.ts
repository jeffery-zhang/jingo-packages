/**
 * Hook to throttle callback execution
 * @param callback callback
 * @param throttleTimeMs ms
 * @returns [throttledCallback, isThrottling]
 */
export declare function useThrottle<T extends (...args: any[]) => any>(callback: T, throttleTimeMs?: number): [(...args: Parameters<T>) => void, boolean];
