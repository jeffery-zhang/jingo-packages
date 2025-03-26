import { ParsedTextStructure, StyleDescription } from './structuredTextParser'
import { TagAttributes } from './tagAttributes'
import { Styles, TagId } from './types'

export const attributeToStyleName: Map<Styles, string> = new Map([
  [Styles.Italic, 'font-style'],
  [Styles.Bold, 'font-weight'],
  [Styles.UnderLine, 'text-decoration-line'],
  [Styles.DeleteLine, 'text-decoration-line'],
  [Styles.Background, 'background-color'],
  [Styles.Color, 'color'],
  [Styles.FontSize, 'font-size'],
  [Styles.Rtl, 'direction'],
])

export const displayStyles = [Styles.Italic, Styles.Bold, Styles.UnderLine, Styles.DeleteLine, /* @todo 测试用 */ Styles.Color]
export const nonDisplayStyles = [Styles.Background, Styles.Color, Styles.FontSize, Styles.Rtl]

/**
 * 从结构化文本标签的键值对中获取 style 描述对象
 */
export function getDisplayStyleKeyValueFromAttributes(
  key: Styles,
  value: string,
):
  | {
      key: string
      value: string
    }
  | undefined {
  if (!displayStyles.includes(key)) return undefined
  switch (true) {
    case key === Styles.Italic:
      return value === '0' ? undefined : { key: attributeToStyleName.get(key)!, value: 'italic' }
    case key === Styles.Bold:
      return value === '0' ? undefined : { key: attributeToStyleName.get(key)!, value: 'bold' }
    case key === Styles.UnderLine:
      return !value ? undefined : { key: attributeToStyleName.get(key)!, value: 'underline' }
    case key === Styles.DeleteLine:
      return !value ? undefined : { key: attributeToStyleName.get(key)!, value: 'line-through' }
    // @todo 测试用
    case key === Styles.Color:
      return { key, value }
    default:
      return undefined
  }
}

/**
 * 从 style 描述对象的键中获取结构化文本标签的属性的键
 */
export function styleKeyToStructuredTextAttrKey(key: string, value: string): string | undefined {
  if (key === 'text-decoration-line') {
    return value === 'line-through' ? Styles.DeleteLine : Styles.UnderLine
  }
  for (const [k, val] of attributeToStyleName.entries()) {
    if (val === key) {
      return k
    }
  }
  return undefined
}

/**
 * 从 style 描述对象的键值中获取结构化文本标签的属性的键值
 */
export function styleValueToStructuredTextAttrValue(value: string): string {
  switch (true) {
    case value === 'italic' || value === 'bold' || value === 'rtl':
      return '1'
    case value === 'underline' || value === 'line-through':
      return 'single'
    case value.includes('px'):
      return value.replace('px', '')
    default:
      return value
  }
}

/**
 * 从元素 TagAttributes 中构建样式对象
 */
export function buildStylesFromAttributes(attributes: TagAttributes): StyleDescription {
  let styles: StyleDescription = {}
  for (const [key, value] of attributes.entries()) {
    if (Object.values(Styles).includes(key as Styles)) {
      const style = getDisplayStyleKeyValueFromAttributes(key as Styles, value)
      if (style) {
        const val = style.value
        styles[attributeToStyleName.get(key as Styles)!] = val
      }
    }
  }

  return styles
}

/**
 * 从 html 的 style 属性中构建样式对象
 */
export function buildStylesFromHTMLStyle(htmlStyle: string): StyleDescription {
  const styles: StyleDescription = {}

  for (const style of htmlStyle.split(';')) {
    const [key, value] = style.split(':')
    if (key && value) styles[key.trim()] = value.trim()
  }

  return styles
}

/**
 * 从元素样式对象中构建 TagAttributes
 */
export function buildAttributesFromStyles(styles: StyleDescription, originAttr?: TagAttributes): TagAttributes {
  const results: TagAttributes = new TagAttributes({})

  Reflect.ownKeys(styles).forEach(key => {
    for (let [k, value] of attributeToStyleName.entries()) {
      if (value === key) {
        const attrKey = styleKeyToStructuredTextAttrKey(key, styles[key])
        let attrValue = styleValueToStructuredTextAttrValue(styles[key])
        if (originAttr && [Styles.DeleteLine, Styles.UnderLine].includes(k as Styles) && originAttr.hasAttribute(k)) {
          // 如果原文本中包含 sline 或 uline 属性且有值且在样式描述对象中有这些样式时, 保留原值
          attrValue = originAttr.getAttribute(k) as string
        }
        if (['color', 'background', 'background-color'].includes(key)) {
          // 颜色值在 element.style.setProperty 方法执行后会转为 rgb 格式, 所以需要判断并将 rgb 转回 hex
          if (isRGBColor(attrValue)) attrValue = rgbToHex(attrValue) ?? ''
        }

        results.setAttribute(attrKey!, attrValue)
        break
      }
    }
  })

  return results
}

/**
 * 根据 d, p, i 的值来创建元素id
 */
export function generateElementId(attributes: TagAttributes): TagId {
  const d = attributes.getAttribute('d')
  if (!d) throw new Error('结构化文本标签没有 d 属性')
  const p = attributes.getAttribute('p')
  if (!p) throw new Error('结构化文本标签没有 p 属性')
  const i = attributes.getAttribute('i')
  if (!i) throw new Error('结构化文本标签没有 i 属性')
  const s = attributes.getAttribute('s')

  return `${Number(d)}-${Number(p)}-${Number(i)}${!!s ? `-${Number(s)}` : ''}`
}

/**
 * 从解析后的 dom 元素描述对象中创建元素
 */
export function createElementFromParsedTextStructure(parsed: ParsedTextStructure): HTMLElement {
  const element = document.createElement(parsed.tagName)
  element.setAttribute('id', parsed.id)
  element.textContent = parsed.textContent
  for (const [key, value] of parsed.attributes.entries()) {
    element.setAttribute(key, value)
  }
  const styles = parsed.styles
  if (styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style.setProperty(key, value)
    }
  }

  return element
}

/**
 * 从解析后的 dom 元素描述对象中更新元素
 */
export function updateElementFromParsedTextStructure(parsed: ParsedTextStructure, element: HTMLElement): void {
  element.setAttribute('id', parsed.id)
  element.textContent = parsed.textContent
  for (const [key, value] of parsed.attributes.entries()) {
    element.setAttribute(key, value)
  }
  const styles = parsed.styles
  if (styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style.setProperty(key, value)
    }
  }
}

/**
 * 创建包含多个 dom 元素的文档片段
 */
export function createFragment(...elements: HTMLElement[]): DocumentFragment {
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < elements.length; i++) fragment.appendChild(elements[i])
  return fragment
}

/**
 * 聚焦元素并将光标定位到文本末尾
 */
export function focusAndLocateToTheEnd(element: HTMLElement) {
  element.focus()
  const range = document.createRange()
  range.selectNodeContents(element)
  range.collapse(false) // 将光标移动到末尾

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

/**
 * 判断字符串是否为 RGB 格式
 */
export function isRGBColor(colorString: string) {
  const rgbRegex = /^rgb((d+),s*(d+),s*(d+))$/
  return rgbRegex.test(colorString)
}

/**
 * 将 RGB 格式的颜色值转换为十六进制格式
 */
export function rgbToHex(rgbString: string) {
  const match = rgbString.match(/^rgb((d+),s*(d+),s*(d+))$/)
  if (match) {
    const r = parseInt(match[1])
    const g = parseInt(match[2])
    const b = parseInt(match[3])
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    return hex
  } else {
    // 不是有效的 RGB 格式
    return null
  }
}
