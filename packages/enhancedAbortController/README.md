# @jingoz/enhanced-abort-controller

EnhancedAbortController 是一种具有超时功能的增强版本的 AbortController，使用 TypeScript 编写。

## 安装

您可以通过 npm 安装该包：

```sh
npm install @jingoz/enhanced-abort-controller
```

## 使用

```typescript
import { EnhancedAbortController } from '@jingoz/enhanced-abort-controller'

// 使用延迟创建 EnhancedAbortController 实例
const enhancedAbortController = new EnhancedAbortController(5000) // 5 秒延迟
// 设置中止超时
enhancedAbortController.abortAfter(3000) // 3 秒

// 如果您想销毁控制器
enhancedAbortController.destroy()
```

## API

### 构造函数

#### new EnhancedAbortController(delay?: number)

- delay: 可选；指定触发超时中止的延迟时间（毫秒）。

### 方法

#### abortAfter(delay: number)

在指定的延迟时间（毫秒）后触发中止操作。

#### destroy()

销毁 EnhancedAbortController 实例。
