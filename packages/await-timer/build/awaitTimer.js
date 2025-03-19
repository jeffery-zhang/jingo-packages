var o = Object.defineProperty;
var h = (i, t, s) => t in i ? o(i, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[t] = s;
var e = (i, t, s) => h(i, typeof t != "symbol" ? t + "" : t, s);
class _ {
  constructor(t, s, r) {
    e(this, "_timer", null);
    e(this, "_isStopped", !0);
    e(this, "_options", {
      immediate: !1,
      autoStart: !0
    });
    this._callback = t, this._delay = s, r && (this._options = { ...this._options, ...r }), this._options.autoStart && this.start();
  }
  get isStopped() {
    return this._isStopped;
  }
  async _runLoop() {
    if (!this._isStopped) {
      if (this._timer && clearTimeout(this._timer), this._options.immediate)
        try {
          await this._callback();
        } catch (t) {
          throw console.error("An Error Occured in the loop: "), t;
        }
      this._timer = setTimeout(() => this._runLoop(), this._delay);
    }
  }
  start() {
    this._isStopped = !1, this._runLoop();
  }
  stop() {
    this._timer && clearTimeout(this._timer), this._isStopped = !0;
  }
  destroy() {
    this.stop(), this._timer = null;
  }
}
export {
  _ as AwaitTimer
};
