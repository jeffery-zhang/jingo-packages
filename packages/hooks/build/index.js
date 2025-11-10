import { useState as a, useEffect as n, useRef as u } from "react";
function m(r) {
  const [e, o] = a(null);
  return n(() => {
    "requestIdleCallback" in window ? requestIdleCallback(
      async () => {
        try {
          const t = await r();
          o(() => t.default);
        } catch (t) {
          throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
        }
      },
      { timeout: 100 }
    ) : setTimeout(async () => {
      try {
        const t = await r();
        o(() => t.default);
      } catch (t) {
        throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
      }
    }, 1);
  }, []), e;
}
var l = Object.defineProperty, c = (r, e, o) => e in r ? l(r, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[e] = o, i = (r, e, o) => c(r, typeof e != "symbol" ? e + "" : e, o);
class h {
  constructor(e, o, t) {
    i(this, "_timer", null), i(this, "_isStopped", !0), i(this, "_options", {
      immediate: !1,
      autoStart: !0
    }), this._callback = e, this._delay = o, t && (this._options = { ...this._options, ...t }), this._options.autoStart && this.start();
  }
  get isStopped() {
    return this._isStopped;
  }
  async _invokeCallback() {
    try {
      await this._callback();
    } catch (e) {
      throw console.error("An Error Occured while polling"), e;
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
function _(r, e, o = !0) {
  const t = u(null);
  return n(() => (t.current || (t.current = new h(r, e, {
    immediate: o
  })), () => {
    t.current && (t.current.destroy(), t.current = null);
  }), [r, e, o]), [
    () => {
      var s;
      (s = t.current) == null || s.start();
    },
    () => {
      var s;
      (s = t.current) == null || s.stop();
    }
  ];
}
export {
  m as useDeferredComponent,
  _ as useInterval
};
