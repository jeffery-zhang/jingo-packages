import { ParsedStructureCollection, ParsedTextStructure, StyleDescription } from './structuredTextParser'
import { TagAttributes } from './tagAttributes'
import { TagId } from './types'
import { buildStylesFromHTMLStyle, generateElementId } from './utils'

export class StructureCollectionUpdater extends ParsedStructureCollection implements Disposable {
  public updatedCollection: ParsedTextStructure[] = []

  constructor(collection: ParsedTextStructure[]) {
    super(collection)
    this.updatedCollection = collection
  }

  // 从 dom 元素集更新描述对象集合
  public updateCollectionByHTMLElements(elements: NodeListOf<Element>) {
    const results: ParsedTextStructure[] = []

    try {
      for (let i = 0; i < elements.length; i++) {
        const ele = elements[i]

        // 创建属性集
        const tagAttributes = TagAttributes.fromNamedNodeMap(ele.attributes)
        // 从属性集中删除 id 和 style 属性
        if (tagAttributes.hasAttribute('id')) tagAttributes.removeAttribute('id')
        if (tagAttributes.hasAttribute('style')) tagAttributes.removeAttribute('style')
        // 获取元素和描述对象的 id
        const id = generateElementId(tagAttributes)
        // 获取内联样式字符串
        const styleString = ele.getAttribute('style')
        let styles: StyleDescription = {}
        // 构建样式对象
        if (styleString) styles = buildStylesFromHTMLStyle(styleString)
        const result: ParsedTextStructure = new ParsedTextStructure(id, ele.tagName, tagAttributes, ele.textContent || '', styles)
        // 从样式对象中更新属性集
        result.parseStylesToAttributes()
        results.push(result)
      }

      if (results.length === 0) throw new Error('没有解析到结构化文本对应的 dom 元素')

      this.updatedCollection = results
    } catch (error) {
      throw error as Error
    }
  }

  /**
   * 根据文本选中范围更新对应的样式
   * @param range 选中范围
   * @param style 样式键值对
   * @param checkExistence 检查是否已存在该样式
   */
  public updateStyleWithRange(range: Range, style: { key: string; value: string }, checkExistence?: boolean) {
    console.log(range)

    /**
     * 当选中的范围的开始位置在一个元素的 0 位, 且结束位置在一个元素的最后一位时, 视为选中内容完全匹配单个或多个对象文本
     * 这种情况只需要更新单个或多个对象的样式
     */
    if (range.startOffset === 0 && range.endOffset === range.endContainer.textContent?.length) {
      console.log('完全匹配')
      const startId = range.startContainer.parentElement?.id
      const endId = range.endContainer.parentElement?.id
      if (startId && endId) {
        const startIndex = this.updatedCollection.findIndex(item => item.id === startId)
        const endIndex = this.updatedCollection.findIndex(item => item.id === endId)
        if (checkExistence) {
          // 需要检查样式是否已存在的情况下
          // 判断是否所有选中对象的样式值均相同
          let allItemStylesAreSame = true
          for (let i = startIndex; i <= endIndex; i++) {
            const val = this.updatedCollection[i].styles?.[style.key]
            if (!val || val !== style.value) {
              allItemStylesAreSame = false
              break
            }
          }
          if (!allItemStylesAreSame) {
            // 如果选中的对象中有任意一个不存在这个样式的或者存在样式但值不同的情况, 直接赋值
            for (let i = startIndex; i <= endIndex; i++) {
              this.updatedCollection[i].styles![style.key] = style.value
            }
          } else {
            // 否则删除所有选中对象中的样式属性
            for (let i = startIndex; i <= endIndex; i++) {
              Reflect.deleteProperty(this.updatedCollection[i].styles!, style.key)
            }
          }
        } else {
          for (let i = startIndex; i <= endIndex; i++) {
            this.updatedCollection[i].styles![style.key] = style.value
          }
        }
      }
    } else if (range.startContainer === range.endContainer) {
      /**
       * 当选中范围没有完全匹配且开始位置和结束位置都在同一个标签中时
       */
      console.log('同一个标签中部分文本被选中')
      const id = range.startContainer.parentElement?.id

      if (id) {
        const tagIdentifier = id.substring(0, 5) // 原始标签的 id, 即 d-p-i 的值
        let currentIndex = -1
        const current = this.updatedCollection.find((item, index) => {
          if (item.id === id) {
            currentIndex = index
            return true
          }
          return false
        })
        if (current) {
          /**
           * 创建新的描述对象, 无论 range 的开始结束在哪儿, 假设都要将一个对象拆为 3 个, 当前对象暂时不动, 创建并添加到集合中后再进行逻辑过滤
           * item1 表示被选中的文本所在的对象
           * item2 表示剩余文本所在对象
           */
          const newItem1 = current.clone()
          const newItem2 = current.clone()
          const completeText = current.textContent
          if (!completeText) return
          current.textContent = completeText.substring(0, range.startOffset)
          newItem1.textContent = range.toString()
          if (checkExistence && newItem1.styles?.[style.key] === style.value) {
            // 需要检查样式是否已存在的情况下, 样式值相同则删除样式
            Reflect.deleteProperty(newItem1.styles!, style.key)
          } else {
            // 否则修改样式
            newItem1.styles![style.key] = style.value
          }
          newItem2.textContent = completeText.substring(range.endOffset)
          // 插入到集合中
          this.updatedCollection.splice(currentIndex + 1, 0, newItem1)
          this.updatedCollection.splice(currentIndex + 2, 0, newItem2)
          // 过滤掉文本为空的描述对象
          const filtered = this.updatedCollection.filter(i => !!i.textContent)
          // 从大到小为 d, p, i 属性全都相同的描述对象设置 s 标记的值
          let s = 0
          filtered.forEach(item => {
            if (item.id.startsWith(tagIdentifier)) {
              item.id = `${tagIdentifier}-${s}` as TagId
              item.attributes.setAttribute('s', s.toString())
              s++
            }
          })
          // 更新到集合
          this.updatedCollection = filtered
        }
      }
    } else {
      /**
       * 当选中范围没有完全匹配且开始位置和结束位置不在同一个标签中时
       */
      console.log('不同标签中部分文本被选中')
      const startId = range.startContainer.parentElement?.id
      const endId = range.endContainer.parentElement?.id
      if (!startId || !endId) return
      const startIndex = this.updatedCollection.findIndex(item => item.id === startId)
      const endIndex = this.updatedCollection.findIndex(item => item.id === endId)
      // 选中的开始位置所在的对象
      const start = this.updatedCollection.find(item => item.id === startId)
      // 选中的结束位置所在的对象
      const end = this.updatedCollection.find(item => item.id === endId)
      if (startIndex === -1 || endIndex === -1 || !start || !end) return
      /**
       * 创建新的描述对象, 无论 range 的开始结束在哪儿, 假设都要将开始的对象和结束的对象分别拆为 2 个, 当前对象暂时不动, 创建并添加到集合中后再进行逻辑过滤
       */
      const startNew = start.clone()
      const endNew = end.clone()
      const startTagIdentifier = start.id.substring(0, 5) // 开始位置的原始标签的 id, 即 d-p-i 的值
      const endTagIdentifier = end.id.substring(0, 5) // 结束位置的原始标签的 id, 即 d-p-i 的值
      const completeStartText = start.textContent
      const completeEndText = end.textContent
      start.textContent = completeStartText.substring(0, range.startOffset)
      startNew.textContent = completeStartText.substring(range.startOffset)
      startNew.styles![style.key] = style.value
      end.textContent = completeEndText.substring(range.endOffset)
      endNew.textContent = completeEndText.substring(0, range.endOffset)
      endNew.styles![style.key] = style.value
      // 如果存在中间对象, 则批量修改样式
      for (let i = startIndex + 1; i < endIndex; i++) {
        this.updatedCollection[i].styles![style.key] = style.value
      }
      // 插入到集合中
      this.updatedCollection.splice(startIndex + 1, 0, startNew)
      this.updatedCollection.splice(endIndex + 1, 0, endNew)
      // 过滤掉文本为空的描述对象
      const filtered = this.updatedCollection.filter(i => !!i.textContent)
      // 从大到小为 d, p, i 属性全都相同的描述对象设置 s 标记的值
      let startSId = 0
      let endSId = 0
      filtered.forEach(item => {
        if (item.id.startsWith(startTagIdentifier)) {
          item.id = `${startTagIdentifier}-${startSId}` as TagId
          item.attributes.setAttribute('s', startSId.toString())
          startSId++
        }
        if (item.id.startsWith(endTagIdentifier)) {
          item.id = `${endTagIdentifier}-${endSId}` as TagId
          item.attributes.setAttribute('s', endSId.toString())
          endSId++
        }
      })
      // 更新到集合
      this.updatedCollection = filtered
    }
    range.collapse()
  }

  [Symbol.dispose]() {
    super.destroy()
    this.updatedCollection = []
  }
}
