import { TagAttributes } from './tagAttributes'
import { TagId, Tags } from './types'
import { buildAttributesFromStyles, buildStylesFromAttributes, generateElementId } from './utils'

export type StyleDescription = Record<string, string>

// 结构化文本解析后的描述需要关注的信息的对象
export class ParsedTextStructure {
  constructor(
    // 标签 id, 格式为 d-p-i[-s], s 表示前端拆分后的标记, 从 0 开始按顺序递增
    public id: TagId,
    // 标签名称
    public tagName: string,
    // 所有属性的集合
    public attributes: TagAttributes,
    // 实际的内容文本
    public textContent: string,
    // 解析后的元素样式
    public styles?: StyleDescription,
  ) {
    // 没有初始化样式对象时就从属性集中解析
    if (!styles) this.parseAttributesToStyles()
  }

  // tagAttributes 解析为样式对象
  public parseAttributesToStyles(): void {
    this.styles = buildStylesFromAttributes(this.attributes)
  }

  // 样式对象反解析为 tagAttributes
  public parseStylesToAttributes(): void {
    if (!this.styles) return
    const styleAttributes = ParsedTextStructure.parsePassedStylesToAttributes(this.styles, this.attributes)
    this.attributes.mergeFrom(styleAttributes)
  }

  // 描述对象反解析为结构化字符串
  public deparseStructureToString(): string {
    const [d, p, i] = this.id.split('-')
    this.attributes.setAttribute('d', d)
    this.attributes.setAttribute('p', p)
    this.attributes.setAttribute('i', i)

    let htmlString = `<${this.tagName}`

    if (this.styles) {
      const styleAttrs = ParsedTextStructure.parsePassedStylesToAttributes(this.styles, this.attributes)
      this.attributes.mergeFrom(styleAttrs)
    }

    for (const [key, value] of this.attributes.entries()) {
      htmlString += ` ${key}='${value}'`
    }

    htmlString += `>${this.textContent}</${this.tagName}>`

    return htmlString
  }

  // 克隆
  public clone(): ParsedTextStructure {
    return new ParsedTextStructure(this.id, this.tagName, this.attributes.clone(), this.textContent, { ...this.styles })
  }

  public static parsePassedStylesToAttributes(styles: StyleDescription, originAttr?: TagAttributes): TagAttributes {
    return buildAttributesFromStyles(styles, originAttr)
  }
}

// 解析后的描述对象集合
export class ParsedStructureCollection {
  constructor(public collection: ParsedTextStructure[]) {}

  // 根据下标获取描述对象
  public getStructureByIndex(index: number): ParsedTextStructure | undefined {
    return this.collection[index]
  }

  // 根据 id 获取描述对象
  public getStructureById(id: string): ParsedTextStructure | undefined {
    return this.collection.find(item => item.id === id)
  }

  // 从描述对象的集合中生成结构化文本字符串
  public deparseCollectionToString(): string {
    return this.collection.map(item => item.deparseStructureToString()).join('') || ''
  }

  public destroy(): void {
    this.collection = []
  }

  // 从结构化文本字符串中解析出描述对象的集合
  public static parseFromStructuredText(structuredText: string): ParsedStructureCollection {
    const results: ParsedTextStructure[] = []

    try {
      const parser = new DOMParser()
      const t = parser.parseFromString(structuredText, 'text/html')
      // 构建 dom 元素集合
      const elements = t.body.querySelectorAll(Object.values(Tags).join(',').toLocaleLowerCase())

      for (let i = 0; i < elements.length; i++) {
        const ele = elements[i]
        // 创建属性集
        const tagAttributes = TagAttributes.fromNamedNodeMap(ele.attributes)
        // 获取元素和描述对象的 id
        const id = generateElementId(tagAttributes)
        const result: ParsedTextStructure = new ParsedTextStructure(id, ele.tagName, tagAttributes, ele.textContent || '')
        results.push(result)
      }

      if (results.length === 0) throw new Error('没有解析到结构化文本')

      return new ParsedStructureCollection(results)
    } catch (error) {
      throw error as Error
    }
  }

  // 允许迭代
  *[Symbol.iterator]() {
    for (const item of this.collection) yield item
  }
}
