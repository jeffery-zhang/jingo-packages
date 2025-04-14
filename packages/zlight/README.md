# @jingoz/zlight

一个轻量级的仿 zustand 的 React 状态管理库

## 安装

使用 npm 进行安装：

```sh
npm install @jingoz/zlight
```

或者使用 yarn 进行安装：

```sh
yarn add @jingoz/zlight
```

或者使用 pnpm 进行安装：

```sh
pnpm add @jingoz/zlight
```

## 使用方法

```tsx
// store.ts
import { create } from '@jingoz/weaver'

interface IStore {
  count: number
  setCount: (count: number) => void
}

export const useStore = create<IStore>(set => ({
  count: 1,
  setCount: (count: number) => set({ count }),
}))

// index.tsx
import { useStore } from './store'

export default function ZlightExample() {
  const count = useStore(state => state.count)
  const setCount = useStore(state => state.setCount)

  const onAdd = () => {
    setCount(count + 1)
  }

  return (
    <div className='flex flex-col gap-2 p-5'>
      <button className='btn btn-primary w-12' onClick={onAdd}>
        Add
      </button>
      <span>Inside parent component: {count}</span>
      <ChildComp />
    </div>
  )
}

function ChildComp() {
  const count = useStore(state => state.count)

  return <div>Inside child component: {count}</div>
}
```
