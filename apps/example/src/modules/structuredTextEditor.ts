import { StructureCollectionUpdater } from './structureCollectionUpdater'
import { StructuredTextCompiler } from './structuredTextCompiler'
import { StructuredTextEditorOptions, Tags } from './types'
import { createElementFromParsedTextStructure, focusAndLocateToTheEnd, updateElementFromParsedTextStructure } from './utils'

export class StructuredTextEditor extends StructuredTextCompiler {
  private _options: StructuredTextEditorOptions = {}
  private _editable: boolean = false
  private _currentText: string = ''
  private _selectedText: string | undefined
  private _range: Range | undefined

  public get editable(): boolean {
    return this._editable
  }
  public set editable(value: boolean) {
    if (value === this._editable) return
    if (value) {
      this.container.setAttribute('contenteditable', '')
      // 聚焦元素并将光标定位到文本末尾
      focusAndLocateToTheEnd(this.container)
      // 监听输入事件
      this.container.addEventListener('input', this._editableElementListener)
      // 监听鼠标划选文本事件
      this.container.addEventListener('mouseup', this._textSelectionListener)
    } else {
      this.container.removeAttribute('contenteditable')
      this.container.removeEventListener('input', this._editableElementListener)
    }
    this._editable = value
  }
  public get currentText() {
    return this._currentText
  }
  public set currentText(text: string) {
    if (text === this._currentText) return
    this._currentText = text
    this._options.onChange?.(text)
  }
  public get selectedText() {
    return this._selectedText
  }
  public set selectedText(text: string | undefined) {
    if (text === this._selectedText) return
    this._selectedText = text
    this._options.emitSelectedTextChange?.(text)
  }

  constructor(public readonly container: HTMLElement, public readonly originText: string, options?: StructuredTextEditorOptions) {
    super(container, originText)
    this._currentText = originText
    if (options) {
      this._options = {
        ...this._options,
        ...options,
      }
    }
    try {
      this._gatherParsedCollection()
    } catch (error) {
      throw error as Error
    }
  }

  // 可编辑元素监听器
  private _editableElementListener = () => {
    requestIdleCallback(() => {
      if (!this._parsedCollection) throw new Error('需要先创建解析后的描述对象集合')
      console.log('update')

      const eles = this.container.querySelectorAll(Object.values(Tags).join(',').toLocaleLowerCase())
      const updater = new StructureCollectionUpdater(this._parsedCollection?.collection)
      updater.updateCollectionByHTMLElements(eles)
      this._parsedCollection.collection = updater.updatedCollection
      this.currentText = this._parsedCollection.deparseCollectionToString()
      // @todo 手动释放资源, 要自动释放需要 polyfill
      updater[Symbol.dispose]()
    })
  }

  private _textSelectionListener = () => {
    if (!this._parsedCollection) throw new Error('需要先创建解析后的描述对象集合')
    const selection = window.getSelection()
    const selectedText = selection?.toString()
    if (!selectedText) return
    const range = selection?.getRangeAt(0)
    if (!range) return
    this.selectedText = selectedText
    this._range = range
  }

  private _updateDomWithCollection() {
    if (!this._parsedCollection) return
    let previousEle: HTMLElement | undefined
    for (const item of this._parsedCollection) {
      const { id } = item
      const ele = document.getElementById(id)
      if (ele) {
        updateElementFromParsedTextStructure(item, ele)
        previousEle = ele
      } else {
        if (previousEle) {
          const element = createElementFromParsedTextStructure(item)
          previousEle.insertAdjacentElement('afterend', element)
          previousEle = element
        } else {
          const element = createElementFromParsedTextStructure(item)
          previousEle = element
          if (this.container.firstChild) this.container.insertBefore(element, this.container.firstChild)
          else this.container.appendChild(element)
        }
      }
    }
    // 删除在集合中不存在的元素
    this.container.querySelectorAll('*').forEach(ele => {
      if (!this._parsedCollection?.collection.some(i => i.id === ele.id)) this.container.removeChild(ele)
    })
  }

  // 设置选中文本字体颜色
  public setTextColor(color: string) {
    if (!this._selectedText || !this._range || !this._parsedCollection) return

    const updater = new StructureCollectionUpdater(this._parsedCollection?.collection)
    updater.updateStyleWithRange(this._range, { key: 'color', value: color })
    this._parsedCollection.collection = updater.updatedCollection
    this._updateDomWithCollection()
    this.currentText = this._parsedCollection.deparseCollectionToString()
    // @todo 手动释放资源, 要自动释放需要 polyfill
    updater[Symbol.dispose]()
  }

  // 设置选中文本斜体
  public setItalic() {
    if (!this._selectedText || !this._range || !this._parsedCollection) return

    const updater = new StructureCollectionUpdater(this._parsedCollection?.collection)
    updater.updateStyleWithRange(this._range, { key: '', value: 'italic' }, true)
    this._parsedCollection.collection = updater.updatedCollection
    this._updateDomWithCollection()
    this.currentText = this._parsedCollection.deparseCollectionToString()
    // @todo 手动释放资源, 要自动释放需要 polyfill
    updater[Symbol.dispose]()
  }

  // 销毁
  public override destroy() {
    super.destroy()
    this._editable = false
    this._selectedText = undefined
    this._range = undefined
  }
}
