export class TagAttributes {
  constructor(private _attrs: { [key: string]: string }) {}

  public hasAttribute(key: string): boolean {
    return Reflect.has(this._attrs, key)
  }

  public getAttribute(key: string): string | null {
    return this._attrs[key] ?? null
  }

  public setAttribute(key: string, value: string): void {
    this._attrs[key] = value
  }

  public removeAttribute(key: string): void {
    Reflect.deleteProperty(this._attrs, key)
  }

  public mergeFrom(tagAttributes: TagAttributes): void {
    for (const [key, value] of tagAttributes.entries()) {
      this.setAttribute(key, value)
    }
  }

  public entries(): [string, string][] {
    return Object.entries(this._attrs)
  }

  public clone(): TagAttributes {
    return new TagAttributes({ ...this._attrs })
  }

  public static fromNamedNodeMap(attrs: NamedNodeMap): TagAttributes {
    const tagAttributes = new TagAttributes({})
    for (let i = 0; i < attrs.length; i++) {
      if (!attrs[i] || !attrs[i]?.value) continue
      tagAttributes.setAttribute(attrs[i].name, attrs[i].value)
    }
    return tagAttributes
  }
}
