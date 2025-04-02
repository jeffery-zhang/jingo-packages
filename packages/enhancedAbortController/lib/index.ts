export class EnhancedAbortController extends AbortController {
  private _isDisposed: boolean = false
  private _timer: ReturnType<typeof setTimeout> | null = null

  /**
   * @param delay ms
   */
  constructor(delay?: number) {
    super()

    this.signal.addEventListener('abort', this._onAbort)

    if (delay) this._createTimeout(delay)
  }

  private _onAbort = () => {
    this._clearTimeout()
  }

  private _createTimeout(delay: number) {
    this._throwIfDisposed()
    this.signal.throwIfAborted()
    this._clearTimeout()
    this._timer = setTimeout(() => this.abort(), delay)
  }

  private _clearTimeout() {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  private _throwIfDisposed() {
    if (this._isDisposed) {
      throw new Error('EnhancedAbortController instance is disposed')
    }
  }

  public abortAfter(delay: number) {
    this._createTimeout(delay)
  }

  public destroy() {
    if (this._isDisposed) return

    this._isDisposed = true
  }
}
