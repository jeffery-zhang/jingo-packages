import { AwaitTimerOptions, IAwaitTimer, LoopCallback } from './types'

export * from './types'

export class AwaitTimer implements IAwaitTimer {
  private _timer: ReturnType<typeof setTimeout> | null = null
  private _isStopped: boolean = true
  private _options: AwaitTimerOptions = {
    immediate: false,
    autoStart: true,
  }

  public get isStopped() {
    return this._isStopped
  }

  constructor(private readonly _callback: LoopCallback, private readonly _delay: number, options?: AwaitTimerOptions) {
    if (options) this._options = { ...this._options, ...options }
    if (this._options.autoStart) this.start()
  }

  private async _invokeCallback() {
    try {
      await this._callback()
    } catch (error) {
      console.error('An Error Occured while polling')
      throw error as Error
    }
  }

  private _runLoop() {
    if (this._isStopped) return

    if (this._timer) clearTimeout(this._timer)
    this._timer = setTimeout(async () => {
      await this._invokeCallback()
      this._runLoop()
    }, this._delay)
  }

  public async start() {
    this._isStopped = false
    if (this._options.immediate) {
      await this._invokeCallback()
    }
    this._runLoop()
  }
  public stop() {
    if (this._timer) clearTimeout(this._timer)
    this._isStopped = true
  }
  public destroy() {
    this.stop()
    this._timer = null
  }
}
