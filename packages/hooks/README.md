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

| 参数     | 类型       | 描述                                                               |
| -------- | ---------- | ------------------------------------------------------------------ |
| callback | () => void | 每轮执行的回调函数, 支持异步函数, 每次轮询都会等待异步函数执行完毕 |
| delay    | number     | 间隔时间(毫秒)                                                     |
| leading  | boolean    | 是否立即执行第一次回调                                             |

#### 返回值

```ts
[start, stop]: [() => void, () => void]
```

start()：启动/重启定时器
stop()：停止定时器

支持异步回调，自动处理 delay 动态变更。

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
