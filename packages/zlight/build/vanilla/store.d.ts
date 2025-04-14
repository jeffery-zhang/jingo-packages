import { TGetStateFn, TListener, TSetStateFn } from './types';
/**
 * The store API
 */
export interface IStoreApi<S> {
    setState: TSetStateFn<S>;
    getState: TGetStateFn<S>;
    getInitialState: TGetStateFn<S>;
    subscribe: (listener: (state: S) => void) => () => void;
}
/**
 * The store API implementation
 */
export declare class VanillaStoreApi<S> implements IStoreApi<S> {
    private isInitialized;
    private initialState;
    private state;
    private listeners;
    setState: TSetStateFn<S>;
    getState: TGetStateFn<S>;
    getInitialState: TGetStateFn<S>;
    subscribe: (listener: TListener<S>) => () => boolean;
}
