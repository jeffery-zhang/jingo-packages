export enum Tags {
  // 可翻译
  Translatable = 'T',
  // 不可翻译1, 不同的不可翻译标签需要保证编译回来时能正确提交
  NonTranslatable1 = 'SC',
  // 不可翻译2, 不同的不可翻译标签需要保证编译回来时能正确提交
  NonTranslatable2 = 'IG',
  // 链接
  Link = 'A',
}

export enum Attributes {
  Id = 'd',
  Paragraph = 'p',
  ParagraphIndex = 'i',
}

export enum Styles {
  Italic = 'italic',
  Bold = 'bold',
  UnderLine = 'uline',
  DeleteLine = 'sline',
  FontSize = 'fsize',
  Color = 'color',
  // 文本背景色
  Background = 'hlight',
  // 文本是否从右到左
  Rtl = 'rtl',
}

// 斜体或加粗的值
export enum ItalicOrBoldValues {
  True = '1',
  False = '0',
}

// 下划线或删除线的值
export enum DecorationLineValues {
  Single = 'single',
  Double = 'double',
}

export type StructuredTextEditorOptions = {
  onChange?: (value: string) => void
  emitEditableStatusChange?: (editable: boolean) => void
  emitSelectedTextChange?: (selectedText: string | undefined) => void
}

// 标签 id, 格式为 d-p-i[-s], s 表示前端拆分后的标记, 从 0 开始按顺序递增
export type TagId = `${number}-${number}-${number}${string}`
