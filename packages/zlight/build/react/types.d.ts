import { TCreatorFn } from '../vanilla';
import { IStoreApi } from '../vanilla/store';
export type TState<S> = S extends {
    getState: () => infer T;
} ? T : never;
export type TReadonlyStoreApi<S> = Pick<IStoreApi<S>, 'getState' | 'getInitialState' | 'subscribe'>;
export type TCreator = <S>(initializer: TCreatorFn<S>) => TUseBoundStore<IStoreApi<S>>;
export type TUseBoundStore<S extends TReadonlyStoreApi<unknown>> = {
    (): TState<S>;
    <P>(selector: (state: TState<S>) => P): P;
};
