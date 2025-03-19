# await-timer

await-timer 是一个 npm 包，提供了实现轮询功能的能力，用于替代 setInterval，并且可以确保传入的回调函数执行完毕后再开始下一次的循环。

## 安装

使用 npm 进行安装：

```sh
npm install @jingoz/await-timer
```

或者使用 yarn 进行安装：

```sh
yarn add @jingoz/await-timer
```

或者使用 pnpm 进行安装：

```sh
pnpm add @jingoz/await-timer
```

## 使用方法

```ts
import { AwaitTimer } from '@jingoz/await-timer'
import type { IAwaitTimer, AwaitTimerOptions, LoopCallback } from '@jingoz/await-timer'

// 定义你的回调函数
const callback: LoopCallback = async () => {
  // 在这里编写你的轮询逻辑
}

// 实例化 AwaitTimer
const options: AwaitTimerOptions = {
  immediate: true, // 是否立即执行第一次循环，默认为 false
  autoStart: true, // 是否自动开始循环，默认为 true
}

const timer: IAwaitTimer = new AwaitTimer(callback, options)

// 启动轮询
timer.start()

// 停止轮询
timer.stop()

// 销毁实例
timer.destroy()
```
