# @jingoz/hooks

一个轻量、实用的 React Hooks 集合，专注于解决常见场景下的痛点。 后续将持续添加更多高质量工具函数。

---

## 安装

```bash
npm install @jingoz/hooks
# 或使用 yarn / pnpm
yarn add @jingoz/hooks
pnpm add @jingoz/hooks
```

## Hooks

### useDeferedComponent

延迟加载 React 组件，支持动态 import()，适用于代码分割和按需加载。

#### 用法

```tsx
import { useDeferedComponent } from '@jingoz/hooks'

function MyComponent() {
  const LazyChart = useDeferedComponent(() => import('./Chart'))

  if (!LazyChart) {
    return <div>Loading...</div>
  }

  return <LazyChart />
}
```

#### 类型

```ts
function useDeferedComponent<T>(importFn: () => Promise<{ default: T }>): T | null
```

返回 null 表示正在加载，组件加载完成后返回实际组件。

### useInterval

灵活的间隔执行 Hook，支持立即执行、启动/停止控制，适用于轮询、动画、计时器等场景。

#### 用法

```tsx
import { useInterval } from '@jingoz/hooks'
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const [start, stop] = useInterval(
    () => {
      setCount(c => c + 1)
    },
    1000,
    true, // 立即执行一次
  )

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

#### 参数

| 参数     | 类型                              | 描述                                                               |
| -------- | --------------------------------- | ------------------------------------------------------------------ |
| callback | () => void 或 () => Promise<void> | 每轮执行的回调函数, 支持异步函数, 每次轮询都会等待异步函数执行完毕 |
| delay    | number                            | 间隔时间(毫秒)                                                     |
| leading  | boolean                           | 是否立即执行第一次回调                                             |

#### 返回值

| 参数     | 类型       | 描述            |
| -------- | ---------- | --------------- |
| [0]start | () => void | 启动/重启定时器 |
| [1]stop  | () => void | 停止定时器      |

### useDebounce, useThrottle

防抖节流的 react hook

#### 用法

```ts
import { useDebounce, useThrottle } from '@jingoz/hooks'

async function callback() {
  return {}
}

const [debouncedCallback, isPending] = useDebounce(callback, 2000)
const [throttledCallback, isWaiting] = useThrottle(callback, 2000)
```

#### 返回值

```ts
[debouncedCallback, isPending]: [(...args: unknown) => void, boolean]
```

| 参数                                     | 类型       | 描述              |
| ---------------------------------------- | ---------- | ----------------- |
| [0]debouncedCallback / throttledCallback | () => void | 防抖/节流回调函数 |
| [1]isPending / isWaiting                 | boolean    | 是否正在等待      |

### useIsOnline

监听网络连接状态

#### 用法

```ts
import { useIsOnline } from '@jingoz/hooks'

const isOnline = useIsOnline()
```

#### 返回值

返回网络是否连接的布尔值

### useisWindowVisible

监听当前窗口是否处于激活状态

#### 用法

```ts
import { useisWindowVisible } from '@jingoz/hooks'

const isWindowVisible = useisWindowVisible()
```

#### 返回值

返回当前窗口是否处于激活状态的布尔值

### useStorage

管理 localStorage 和 sessionStorage, 并且使组件响应他们的值的变化

#### 用法

```ts
import { useStorage } from '@jingoz/hooks'

const [value, setValue, clearValue] = useStorage<string>('value1', 'aaa', 'session')
```

#### 参数

| 参数         | 类型                 | 默认值  | 描述                                                             |
| ------------ | -------------------- | ------- | ---------------------------------------------------------------- |
| key          | string               |         | storage key                                                      |
| initialValue | T                    | null    | 如果 storage 中没有值才使用这个初始值, 否则优先取 storage 中的值 |
| type         | 'session' 或 'local' | 'local' | 使用 sessionStorage 还是 localStorage, 默认 localStorage         |

#### 返回值

| 参数          | 类型               | 描述                    |
| ------------- | ------------------ | ----------------------- |
| [0]value      | T                  | 最新的值                |
| [1]setValue   | (value: T) => void | 更新储存的值的函数      |
| [2]clearValue | () => void         | 清除 storage 中储存的值 |
