/**
 * The listener is called with the new state and the previous state
 */
export type TListener<S> = (state: S, prev: S) => void;
/**
 * The setState function, accepts a partial state
 */
export type TSetStateFn<S> = (partial: S | Partial<S> | {
    _(state: S): S | Partial<S>;
}['_']) => void;
/**
 * The getState function
 */
export type TGetStateFn<S> = () => S;
/**
 * The creator function type
 */
export type TCreatorFn<S> = (setState: TSetStateFn<S>, getState: TGetStateFn<S>) => S;
