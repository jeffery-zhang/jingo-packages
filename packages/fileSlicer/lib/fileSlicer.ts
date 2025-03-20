import { FileWithHash } from './fileWithHash'
import { IChunkItem, IFileSlicer } from './types'

export const DEFAULT_CHUNK_SIZE = 20 * 1024 * 1024

export class ChunkItem implements IChunkItem {
  constructor(public body: ArrayBuffer, public partialHash: string, public position: number, public offset: number) {}
}

export class FileSlicer extends FileWithHash implements IFileSlicer {
  private _chunks: IChunkItem[] = []

  public get chunks() {
    return this._chunks
  }

  constructor(_file?: File, public chunkSize: number = DEFAULT_CHUNK_SIZE) {
    super(_file)
  }

  public splitFile(start?: number, end?: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._file) return reject(new Error('文件不存在'))
      let position = start ?? 0
      const endPosition = end ?? this.fileSize
      const reader = new FileReader()

      const read = () => {
        // 超出文件长度
        if (position >= endPosition) {
          resolve()
          return
        }

        const slice = this._file!.slice(position, position + this.chunkSize)

        reader.readAsArrayBuffer(slice)
      }

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (!e.target?.result) return reject(new Error('文件读取失败'))
        const result = e.target.result
        const sliceHash = await this._arrayBufferToHash(result as ArrayBuffer)
        if (sliceHash) {
          this._chunks.push(
            new ChunkItem(result as ArrayBuffer, sliceHash, position, position + this.chunkSize > endPosition ? endPosition - position : this.chunkSize),
          )
        }
        position += this.chunkSize

        read()
      }

      reader.addEventListener('error', () => {
        return reject(new Error('文件读取失败'))
      })

      read()
    })
  }

  public destroy(all: boolean = false): void {
    if (all) {
      this._file = undefined
    }
    this._chunks = []
  }
}
