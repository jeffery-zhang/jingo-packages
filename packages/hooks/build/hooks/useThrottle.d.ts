/**
 * Hook to throttle callback execution
 * @param callback callback
 * @param throttleTimeMs ms
 * @returns [throttledCallback, isThrottling]
 */
export declare function useThrottle<T extends (...args: unknown[]) => unknown>(callback: T, throttleTimeMs?: number): [(...args: Parameters<T>) => void, boolean];
