import { create } from '@jingoz/zlight'

interface IStore {
  count: number
  setCount: (count: number) => void
}

export const useStore = create<IStore>(set => ({
  count: 1,
  setCount: (count: number) => set({ count }),
}))
