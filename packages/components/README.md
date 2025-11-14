# @jingoz/components

一个轻量、实用的 React Components 集合，提供一些特定场景下常用的组件。后续将持续添加更多高质量工具函数。

---

## 安装

```bash
npm install @jingoz/components
# 或使用 yarn / pnpm
yarn add @jingoz/components
pnpm add @jingoz/components
```

## Components

### AutoSizer

自动撑满父组件并且为内部子组件提供确定宽高的值

#### 用法

```tsx
import { AutoSizer } from '@jingoz/components'

function () {
  return <div style={{ width: 300, height: 200}}>
    <AutoSizer>
      {({ width, height }) => <div style={{ width, height }}></div>}
    </AutoSizer>
  </div>
}
```

### 纵向虚拟列表

渲染大量列表元素时使用以优化性能

#### 用法

```tsx
import { AutoSizer, FixedHeightVirtualList, IVirtualListRef } from '@jingoz/components'
import { useRef } from 'react'

const data = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}))

function () {
  const list = useRef<IVirtualListRef>(null)

  return <div>
    <button onClick={() => list.current?.scrollTo(500)}>Scroll to 500</button>
    <div style={{ width: 400, height: 400 }}>
      <AutoSizer>
        {({ height }) => (
          <FixedHeightVirtualList ref={list} className='mt-5' total={data.length} rowHeight={60} viewHeight={height}>
            {index => <div className='p-4 border-b border-gray-300'>{data[index].name}</div>}
          </FixedHeightVirtualList>
        )}
      </AutoSizer>
    </div>
  </div>
}
```
