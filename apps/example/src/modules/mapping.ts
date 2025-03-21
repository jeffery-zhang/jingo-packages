import { Styles } from './types'

export const attributeToStyleName: Map<Styles, string> = new Map([
  [Styles.FontSize, 'font-size'],
  [Styles.Italic, 'font-style'],
  [Styles.Bold, 'font-weight'],
  [Styles.UnderLine, 'text-decoration-line'],
  [Styles.DeleteLine, 'text-decoration-line'],
])

export function getStyleKeyValueFromAttributeValues(key: Styles, value: string): string {
  switch (true) {
    case key === Styles.FontSize:
      return `${attributeToStyleName.get(key)}: ${value}px`
    case key === Styles.Italic:
      return value === '0' ? '' : `${attributeToStyleName.get(key)}: italic`
    case key === Styles.Bold:
      return value === '0' ? '' : `${attributeToStyleName.get(key)}: bold`
    case key === Styles.UnderLine:
      return !value ? '' : `${attributeToStyleName.get(key)}: underline`
    case key === Styles.DeleteLine:
      return !value ? '' : `${attributeToStyleName.get(key)}: line-through`
    default:
      return ''
  }
}
