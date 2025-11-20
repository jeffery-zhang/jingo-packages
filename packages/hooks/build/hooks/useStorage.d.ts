/**
 * Hook for using local or session storage
 * @param key
 * @param initialValue
 * @param type default 'local'
 * @returns {[T | null, (value: T) => void]}
 */
export declare function useStorage<T>(key: string, initialValue?: T | null, type?: 'session' | 'local'): [T | null, (value: T) => void];
