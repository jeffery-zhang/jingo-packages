export type AsyncFunction = (...args: any[]) => Promise<any>;
export type SyncFunction = (...args: any[]) => any;
export type LoopCallback = AsyncFunction | SyncFunction;
export interface IAwaitTimer {
    isStopped: boolean;
    start: () => Promise<void>;
    stop: () => void;
    destroy: () => void;
}
export type AwaitTimerOptions = {
    immediate?: boolean;
    autoStart?: boolean;
};
