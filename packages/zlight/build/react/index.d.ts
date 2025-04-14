import { TCreatorFn } from '../vanilla';
import { TCreator } from './types';
export * from './types';
export * from './useStore';
export declare function createStateImpl<S>(createFn: TCreatorFn<S>): any;
export declare const create: TCreator;
