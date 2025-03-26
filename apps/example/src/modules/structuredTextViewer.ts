import { StructuredTextCompiler } from './structuredTextCompiler'

export class StructuredTextViewer extends StructuredTextCompiler {
  constructor(public readonly container: HTMLElement, public readonly originText: string) {
    super(container, originText)
    try {
      this._gatherParsedCollection()
    } catch (error) {
      throw error as Error
    }
  }

  // 销毁
  public override destroy() {
    super.destroy()
  }
}
