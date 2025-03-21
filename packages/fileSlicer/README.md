# @jingoz/file-slicer

@jingoz/file-slicer 是一个 npm 包，提供了文件根据自定义大小分片并计算 hash 的功能。

## 安装

使用 npm 进行安装：

```sh
npm install @jingoz/file-slicer
```

或者使用 yarn 进行安装：

```sh
yarn add @jingoz/file-slicer
```

或者使用 pnpm 进行安装：

```sh
pnpm add @jingoz/file-slicer
```

## 使用方法

```ts
import { FileSlicer } from '@jingoz/file-slicer'

// 通过 input 获取到 file
// 创建实例
const slicer = new FileSlicer(file, 1 * 1024 * 1024)
console.log(slicer.fileName)
console.log(slicer.fileSize)
await calcFullHash()
await splitFile()

// 计算文件完整 hash
const calcFullHash = async () => {
  if (!slicer) return
  await slicer.calcFileHash()
}

// 分片
const splitFile = async () => {
  if (!slicer) return
  await slicer.splitFile()
  slicer.chunks.forEach(chunk => {
    console.log(chunk.partialHash)
  })
}
```
