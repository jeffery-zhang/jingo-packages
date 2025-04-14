import { TReadonlyStoreApi, TState } from './types';
export declare function useStore<S extends TReadonlyStoreApi<unknown>>(api: S): TState<S>;
export declare function useStore<S extends TReadonlyStoreApi<unknown>, P>(api: S, selector: (state: TState<S>) => P): P;
