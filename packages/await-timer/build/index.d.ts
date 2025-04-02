import { AwaitTimerOptions, IAwaitTimer, LoopCallback } from './types';
export * from './types';
export declare class AwaitTimer implements IAwaitTimer {
    private readonly _callback;
    private readonly _delay;
    private _timer;
    private _isStopped;
    private _options;
    get isStopped(): boolean;
    constructor(_callback: LoopCallback, _delay: number, options?: AwaitTimerOptions);
    private _invokeCallback;
    private _runLoop;
    start(): Promise<void>;
    stop(): void;
    destroy(): void;
}
