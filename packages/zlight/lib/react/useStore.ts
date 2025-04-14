import { useSyncExternalStore } from 'react'
import { TReadonlyStoreApi, TState } from './types'

const returnSelf = (args: any) => args

export function useStore<S extends TReadonlyStoreApi<unknown>>(api: S): TState<S>

export function useStore<S extends TReadonlyStoreApi<unknown>, P>(api: S, selector: (state: TState<S>) => P): P

export function useStore<S, P>(api: TReadonlyStoreApi<S>, selector: (state: S) => P = returnSelf): P {
  const partial = useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState()),
  )

  return partial
}
