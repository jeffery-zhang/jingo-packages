var r = Object.defineProperty;
var a = (i, t, s) => t in i ? r(i, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[t] = s;
var e = (i, t, s) => a(i, typeof t != "symbol" ? t + "" : t, s);
class _ {
  constructor(t, s, o) {
    e(this, "_timer", null);
    e(this, "_isStopped", !0);
    e(this, "_options", {
      immediate: !1,
      autoStart: !0
    });
    this._callback = t, this._delay = s, o && (this._options = { ...this._options, ...o }), this._options.autoStart && this.start();
  }
  get isStopped() {
    return this._isStopped;
  }
  async _invokeCallback() {
    try {
      await this._callback();
    } catch (t) {
      throw console.error("An Error Occured while polling"), t;
    }
  }
  _runLoop() {
    this._isStopped || (this._timer && clearTimeout(this._timer), this._timer = setTimeout(async () => {
      await this._invokeCallback(), this._runLoop();
    }, this._delay));
  }
  async start() {
    this._isStopped = !1, this._options.immediate && await this._invokeCallback(), this._runLoop();
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
