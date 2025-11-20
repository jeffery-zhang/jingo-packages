import { useState as l, useEffect as a, useRef as c, useCallback as d, useSyncExternalStore as h } from "react";
function C(e) {
  const [n, r] = l(null);
  return a(() => {
    "requestIdleCallback" in window ? requestIdleCallback(
      async () => {
        try {
          const t = await e();
          r(() => t.default);
        } catch (t) {
          throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
        }
      },
      { timeout: 100 }
    ) : setTimeout(async () => {
      try {
        const t = await e();
        r(() => t.default);
      } catch (t) {
        throw console.log("useDeferedComponent: ", t), new Error("useDeferedComponent: " + t);
      }
    }, 1);
  }, []), n;
}
var p = Object.defineProperty, _ = (e, n, r) => n in e ? p(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, m = (e, n, r) => _(e, typeof n != "symbol" ? n + "" : n, r);
class y {
  constructor(n, r, t) {
    m(this, "_timer", null), m(this, "_isStopped", !0), m(this, "_options", {
      immediate: !1,
      autoStart: !0
    }), this._callback = n, this._delay = r, t && (this._options = { ...this._options, ...t }), this._options.autoStart && this.start();
  }
  get isStopped() {
    return this._isStopped;
  }
  async _invokeCallback() {
    try {
      await this._callback();
    } catch (n) {
      throw console.error("An Error Occured while polling"), n;
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
function E(e, n, r = !0) {
  const t = c(null);
  return a(() => (t.current || (t.current = new y(e, n, {
    immediate: r
  })), () => {
    t.current && (t.current.destroy(), t.current = null);
  }), [e, n, r]), [
    () => {
      var i;
      (i = t.current) == null || i.start();
    },
    () => {
      var i;
      (i = t.current) == null || i.stop();
    }
  ];
}
function T(e, n = 1e3) {
  const [r, t] = l(!1), i = c(null), o = c(null), s = d((...f) => {
    i.current && clearTimeout(i.current), o.current = f, t(!0), i.current = setTimeout(async () => {
      try {
        await e(...o.current);
      } catch (u) {
        throw console.log(u), u;
      } finally {
        t(!1);
      }
    }, n);
  }, []);
  return a(() => () => {
    i.current && (clearTimeout(i.current), i.current = null);
  }, []), [s, r];
}
function L(e, n = 1e3) {
  const r = c(!1), [t, i] = l(!1), o = c(null), s = d(async (...f) => {
    if (!r.current) {
      r.current = !0, i(!0);
      try {
        await e(...f);
      } catch (u) {
        throw console.log(u), u;
      } finally {
        o.current = setTimeout(() => {
          r.current = !1, i(!1);
        }, n);
      }
    }
  }, []);
  return a(() => () => {
    o.current && clearTimeout(o.current);
  }, []), [s, t];
}
function g() {
  return navigator.onLine;
}
function b(e) {
  return document.addEventListener("online", e), document.addEventListener("offline", e), () => {
    document.removeEventListener("online", e), document.removeEventListener("offline", e);
  };
}
function I() {
  return h(b, g);
}
function v(e) {
  return document.addEventListener("visibilitychange", e), () => {
    document.removeEventListener("visibilitychange", e);
  };
}
function w() {
  return document.visibilityState !== "hidden";
}
function O() {
  return h(v, w);
}
function k(e, n = null, r = "local") {
  const t = r === "session" ? sessionStorage : localStorage, [i, o] = l(() => {
    const s = t.getItem(e);
    return s != null ? JSON.parse(s) : n;
  });
  return a(() => {
    t.setItem(e, JSON.stringify(i));
  }, [i]), [i, o];
}
export {
  T as useDebounce,
  C as useDeferredComponent,
  E as useInterval,
  I as useIsOnline,
  k as useStorage,
  L as useThrottle,
  O as useisWindowVisible
};
