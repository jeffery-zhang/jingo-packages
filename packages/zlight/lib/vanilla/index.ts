import { IStoreApi, VanillaStoreApi } from './store'
import { TCreatorFn } from './types'

export * from './store'
export * from './types'

export function createStoreVanillaImpl(fn: TCreatorFn<any>): IStoreApi<ReturnType<typeof fn>>

export function createStoreVanillaImpl<S>(fn: TCreatorFn<S>): IStoreApi<S>

export function createStoreVanillaImpl<S>(fn: TCreatorFn<S>): IStoreApi<S> {
  const api = new VanillaStoreApi<S>()
  const state = fn(api.setState, api.getState)
  api.setState(state)
  return api
}
