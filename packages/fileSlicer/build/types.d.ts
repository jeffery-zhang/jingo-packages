export interface IFileWithHash {
    fullHash: string;
    fileSize: number;
    fileName: string;
    fileType: string;
    filePath: string;
    calcFileHash(): Promise<void>;
}
export interface IFileSlicer extends IFileWithHash {
    chunkSize: number;
    chunks: IChunkItem[];
    splitFile(start?: number, end?: number): Promise<void>;
    destroy(): void;
}
export interface IChunkItem {
    body: ArrayBuffer;
    partialHash: string;
    position: number;
    offset: number;
}
