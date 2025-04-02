var r = Object.defineProperty;
var o = (i, e, t) => e in i ? r(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var s = (i, e, t) => o(i, typeof e != "symbol" ? e + "" : e, t);
class n extends AbortController {
  /**
   * @param delay ms
   */
  constructor(t) {
    super();
    s(this, "_isDisposed", !1);
    s(this, "_timer", null);
    s(this, "_onAbort", () => {
      this._clearTimeout();
    });
    this.signal.addEventListener("abort", this._onAbort), t && this._createTimeout(t);
  }
  _createTimeout(t) {
    this._throwIfDisposed(), this.signal.throwIfAborted(), this._clearTimeout(), this._timer = setTimeout(() => this.abort(), t);
  }
  _clearTimeout() {
    this._timer && (clearTimeout(this._timer), this._timer = null);
  }
  _throwIfDisposed() {
    if (this._isDisposed)
      throw new Error("EnhancedAbortController instance is disposed");
  }
  abortAfter(t) {
    this._createTimeout(t);
  }
  destroy() {
    this._isDisposed || (this._isDisposed = !0);
  }
}
export {
  n as EnhancedAbortController
};
