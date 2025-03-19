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
    _runLoop(): Promise<void>;
    start(): void;
    stop(): void;
    destroy(): void;
}
