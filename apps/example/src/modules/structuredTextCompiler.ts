import { ParsedStructureCollection, ParsedTextStructure } from './structuredTextParser'
import { createElementFromParsedTextStructure } from './utils'

export interface IStructuredTextCompiler {
  // 真实 dom 容器
  container: HTMLElement
  // 原始的结构化文本
  originText: string
  destroy(): void
}

export class StructuredTextCompiler implements IStructuredTextCompiler {
  private _fragment?: DocumentFragment
  private _elements: HTMLElement[] = []

  // 是否已解析
  protected _hasParsed: boolean = false
  // 是否已生成元素
  protected _hasCreated: boolean = false
  // 是否已插入文档
  protected _hasInserted: boolean = false
  // 解析后的描述对象集合
  protected _parsedCollection?: ParsedStructureCollection

  constructor(public readonly container: HTMLElement, public readonly originText: string) {
    this.container = container
    this.originText = originText
  }

  // 从解析后描述对象构建 dom 元素
  protected _createElementFromParsedStructure(parsed: ParsedTextStructure): HTMLElement {
    return createElementFromParsedTextStructure(parsed)
  }

  // 收集解析后的 dom 描述对象
  protected _gatherParsedCollection() {
    if (this._hasParsed) return
    try {
      const parsed = ParsedStructureCollection.parseFromStructuredText(this.originText)
      this._parsedCollection = parsed
      this._hasParsed = true
      this._createElementsFromParsedCollection()
    } catch (error) {
      throw error as Error
    }
  }

  // 从解析后描述对象合集中创建 dom 元素
  protected _createElementsFromParsedCollection() {
    if (this._hasCreated) return
    if (!this._parsedCollection) throw new Error('需要先创建解析后的描述对象集合')
    this._elements = []
    const collections = Array.from(this._parsedCollection)
    for (let i = 0; i < collections.length; i++) {
      const ele = this._createElementFromParsedStructure(collections[i])
      this._elements.push(ele)
    }
    this._hasCreated = true
    this._renderElementsAndInsertFragment()
  }

  // 根据解析后的 dom 描述对象集合创建并插入文档片段
  protected _renderElementsAndInsertFragment() {
    if (this._hasInserted) return
    this._fragment = document.createDocumentFragment()
    const elements: HTMLElement[] = []
    for (let i = 0; i < this._elements.length; i++) {
      const element = this._elements[i]
      if (element) elements.push(element)
    }

    for (const ele of elements) this._fragment.appendChild(ele)
    this.container.appendChild(this._fragment)
    this._hasInserted = true
  }

  // 销毁
  public destroy() {
    this.container.innerHTML = ''
    this._hasParsed = false
    this._hasInserted = false
    this._parsedCollection = undefined
    this._elements = []
    this._fragment = undefined
  }
}
