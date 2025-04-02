export declare class EnhancedAbortController extends AbortController {
    private _isDisposed;
    private _timer;
    /**
     * @param delay ms
     */
    constructor(delay?: number);
    private _onAbort;
    private _createTimeout;
    private _clearTimeout;
    private _throwIfDisposed;
    abortAfter(delay: number): void;
    destroy(): void;
}
