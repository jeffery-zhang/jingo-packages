import { IFileWithHash } from './types';
export declare class FileWithHash implements IFileWithHash {
    protected _file?: File | undefined;
    private _fileHash;
    get fullHash(): string;
    get fileSize(): number;
    get fileName(): string;
    get fileType(): string;
    get filePath(): string;
    constructor(_file?: File | undefined);
    protected _arrayBufferToHash(origin: ArrayBuffer): Promise<string | undefined>;
    calcFileHash(): Promise<void>;
}
