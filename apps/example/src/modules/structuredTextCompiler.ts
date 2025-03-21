import { IParsedTextStructure } from './structuredTextParser'
import { Styles } from './types'

// 编译为可以描述 dom 元素的对象
export interface ICompiledTextStructure {
  tagName: string
  attributes: NamedNodeMap
  style: Record<string, string>
  textContent: string
}

export interface IStructuredTextCompiler {
  // 结构化文本解析对象
  origin: IParsedTextStructure
  // 编译后对象
  compiled: ICompiledTextStructure
}

export class CompiledTextStructure implements ICompiledTextStructure {
  constructor(public tagName: string, public attributes: NamedNodeMap, public style: Record<string, string>, public textContent: string) {}
}

export class StructuredTextCompiler implements IStructuredTextCompiler {
  constructor(public readonly origin: IParsedTextStructure, public readonly compiled: ICompiledTextStructure) {}

  public static fromParsedTextStructure(origin: IParsedTextStructure) {
    const style: Record<string, string> = {}
    for (const key in origin.attributes) {
      if (Object.values(Styles).includes(key as Styles)) {
        
      }
    }
  }
}
