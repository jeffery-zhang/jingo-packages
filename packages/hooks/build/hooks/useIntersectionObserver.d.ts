export interface IUseIntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnVisible?: boolean;
}
export type UseIntersectionObserverReturnValue<T> = [(node: T | null) => void, IntersectionObserverEntry | null];
export declare function useIntersectionObserver<T extends HTMLElement>({ root, rootMargin, threshold, freezeOnVisible, }?: IUseIntersectionObserverOptions): UseIntersectionObserverReturnValue<T>;
