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
  FontSize = 'fsize',
  Italic = 'italic',
  Bold = 'bold',
  UnderLine = 'uline',
  DeleteLine = 'sline',
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

export enum NonDisplayStyles {
  Color = 'color',
  // 文本背景色
  Background = 'hlight',
  // 文本是否从右到左
  Rtl = 'rtl',
}
