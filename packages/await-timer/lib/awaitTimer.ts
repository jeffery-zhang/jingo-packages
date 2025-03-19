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

  async _runLoop() {
    if (this._isStopped) return
    if (this._timer) clearTimeout(this._timer)
    if (this._options.immediate) {
      try {
        await this._callback()
      } catch (error) {
        console.error('An Error Occured in the loop: ')
        throw error as Error
      }
    }
    this._timer = setTimeout(() => this._runLoop(), this._delay)
  }

  start() {
    this._isStopped = false
    this._runLoop()
  }
  stop() {
    if (this._timer) clearTimeout(this._timer)
    this._isStopped = true
  }
  destroy() {
    this.stop()
    this._timer = null
  }
}
