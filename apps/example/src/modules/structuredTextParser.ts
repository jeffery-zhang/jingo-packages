import { Tags } from './types'

// 结构化文本解析后的带有需要关注的信息的对象
export interface IParsedTextStructure {
  // 标签名称
  tagName: string
  // 所有属性的集合
  attributes: NamedNodeMap
  // 实际的内容文本
  textContent: string
}

// 解析后的对象集合
export interface IParsedStructureCollection {
  collection: IParsedTextStructure[]
}

export class ParsedTextStructure implements IParsedTextStructure {
  constructor(public tagName: string, public attributes: NamedNodeMap, public textContent: string) {}
}

export class ParsedStructureCollection implements IParsedStructureCollection {
  constructor(public readonly collection: IParsedTextStructure[]) {}

  public static fromStructuredText(structuredText: string): IParsedStructureCollection {
    const newString = structuredText
    const results: IParsedTextStructure[] = []

    const parser = new DOMParser()
    const t = parser.parseFromString(newString, 'text/html')
    const elements = t.body.querySelectorAll(Object.values(Tags).join(',').toLocaleLowerCase())

    for (let i = 0; i < elements.length; i++) {
      const ele = elements[i]
      const result: IParsedTextStructure = new ParsedTextStructure(ele.tagName, ele.attributes, ele.textContent || '')
      results.push(result)
    }

    if (results.length === 0) throw new Error('没有解析到结构化文本')

    return new ParsedStructureCollection(results)
  }
}
