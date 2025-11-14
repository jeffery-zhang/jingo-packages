import { useState as h, useEffect as a, useRef as u, useCallback as m } from "react";
function y(n) {
  const [e, r] = h(null);
  return a(() => {
    "requestIdleCallback" in window ? requestIdleCallback(
      async () => {
        try {
          const t = await n();
          r(() => t.default);
        } catch (t) {
          throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
        }
      },
      { timeout: 100 }
    ) : setTimeout(async () => {
      try {
        const t = await n();
        r(() => t.default);
      } catch (t) {
        throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
      }
    }, 1);
  }, []), e;
}
var p = Object.defineProperty, d = (n, e, r) => e in n ? p(n, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[e] = r, f = (n, e, r) => d(n, typeof e != "symbol" ? e + "" : e, r);
class _ {
  constructor(e, r, t) {
    f(this, "_timer", null), f(this, "_isStopped", !0), f(this, "_options", {
      immediate: !1,
      autoStart: !0
    }), this._callback = e, this._delay = r, t && (this._options = { ...this._options, ...t }), this._options.autoStart && this.start();
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
function b(n, e, r = !0) {
  const t = u(null);
  return a(() => (t.current || (t.current = new _(n, e, {
    immediate: r
  })), () => {
    t.current && (t.current.destroy(), t.current = null);
  }), [n, e, r]), [
    () => {
      var o;
      (o = t.current) == null || o.start();
    },
    () => {
      var o;
      (o = t.current) == null || o.stop();
    }
  ];
}
function C(n, e = 1e3) {
  const [r, t] = h(!1), o = u(null), s = u(null), c = m((...l) => {
    o.current && clearTimeout(o.current), s.current = l, t(!0), o.current = setTimeout(async () => {
      try {
        await n(...s.current);
      } catch (i) {
        throw console.log(i), i;
      } finally {
        t(!1);
      }
    }, e);
  }, []);
  return a(() => () => {
    o.current && (clearTimeout(o.current), o.current = null);
  }, []), [c, r];
}
function g(n, e = 1e3) {
  const r = u(!1), [t, o] = h(!1), s = u(null), c = m(async (...l) => {
    if (!r.current) {
      r.current = !0, o(!0);
      try {
        await n(...l);
      } catch (i) {
        throw console.log(i), i;
      } finally {
        s.current = setTimeout(() => {
          r.current = !1, o(!1);
        }, e);
      }
    }
  }, []);
  return a(() => () => {
    s.current && clearTimeout(s.current);
  }, []), [c, t];
}
export {
  C as useDebounce,
  y as useDeferredComponent,
  b as useInterval,
  g as useThrottle
};
