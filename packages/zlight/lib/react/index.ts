import { createStoreVanillaImpl, TCreatorFn } from '../vanilla'
import { TCreator } from './types'
import { useStore } from './useStore'

export * from './types'
export * from './useStore'

export function createStateImpl<S>(createFn: TCreatorFn<S>) {
  const api = createStoreVanillaImpl(createFn)
  const useBoundStore: any = (selector: (state: S) => any) => useStore(api, selector)
  Object.assign(useBoundStore, api)

  return useBoundStore
}

export const create: TCreator = <S>(createStateFn: TCreatorFn<S>) => createStateImpl(createStateFn)
