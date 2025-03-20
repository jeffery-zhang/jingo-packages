import { IFileWithHash } from './types'

export class FileWithHash implements IFileWithHash {
  // full file hash
  private _fileHash: string = ''

  public get fullHash() {
    return this._fileHash
  }
  public get fileSize() {
    return this._file?.size ?? 0
  }
  public get fileName() {
    return this._file?.name ?? ''
  }
  public get fileType() {
    const name = this._file?.name
    return (name?.substring(name.lastIndexOf('.'), name.length) || '').toLowerCase()
  }
  public get filePath() {
    // exclude filename in path
    return (
      this._file?.webkitRelativePath
        .split('/')
        .filter(s => s !== this.fileName)
        .join('/') ?? ''
    )
  }

  constructor(protected _file?: File) {}

  // calculate hash from arrayBuffer
  protected async _arrayBufferToHash(origin: ArrayBuffer): Promise<string | undefined> {
    try {
      const hash = await window.crypto.subtle.digest('SHA-256', origin)
      const uint8Array = new Uint8Array(hash)
      return [...uint8Array].map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('')
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }

  // calculate full file hash
  public calcFileHash(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._file) return reject(new Error('file not exists'))
      // read file content
      const reader = new FileReader()
      reader.readAsArrayBuffer(this._file)
      reader.onload = async e => {
        if (!e.target?.result) return reject(new Error('read file error'))
        const data = await this._arrayBufferToHash(e.target.result as ArrayBuffer)
        if (!data) return Promise.reject(new Error('calculate hash error'))
        this._fileHash = data
        resolve()
      }
    })
  }
}
