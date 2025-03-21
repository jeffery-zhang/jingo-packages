import { FileWithHash } from './fileWithHash';
import { IChunkItem, IFileSlicer } from './types';
export declare const DEFAULT_CHUNK_SIZE: number;
export declare class ChunkItem implements IChunkItem {
    body: ArrayBuffer;
    partialHash: string;
    position: number;
    offset: number;
    constructor(body: ArrayBuffer, partialHash: string, position: number, offset: number);
}
export declare class FileSlicer extends FileWithHash implements IFileSlicer {
    chunkSize: number;
    private _chunks;
    get chunks(): IChunkItem[];
    constructor(_file?: File, chunkSize?: number);
    splitFile(start?: number, end?: number): Promise<void>;
    destroy(): void;
}
