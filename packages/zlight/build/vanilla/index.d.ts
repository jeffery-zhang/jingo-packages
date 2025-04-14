import { IStoreApi } from './store';
import { TCreatorFn } from './types';
export * from './store';
export * from './types';
export declare function createStoreVanillaImpl(fn: TCreatorFn<any>): IStoreApi<ReturnType<typeof fn>>;
export declare function createStoreVanillaImpl<S>(fn: TCreatorFn<S>): IStoreApi<S>;
