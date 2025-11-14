import { useState as f, useEffect as l, useRef as a, useCallback as d, useSyncExternalStore as h } from "react";
function C(e) {
  const [n, r] = f(null);
  return l(() => {
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
class g {
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
  const t = a(null);
  return l(() => (t.current || (t.current = new g(e, n, {
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
  const [r, t] = f(!1), i = a(null), o = a(null), u = d((...s) => {
    i.current && clearTimeout(i.current), o.current = s, t(!0), i.current = setTimeout(async () => {
      try {
        await e(...o.current);
      } catch (c) {
        throw console.log(c), c;
      } finally {
        t(!1);
      }
    }, n);
  }, []);
  return l(() => () => {
    i.current && (clearTimeout(i.current), i.current = null);
  }, []), [u, r];
}
function I(e, n = 1e3) {
  const r = a(!1), [t, i] = f(!1), o = a(null), u = d(async (...s) => {
    if (!r.current) {
      r.current = !0, i(!0);
      try {
        await e(...s);
      } catch (c) {
        throw console.log(c), c;
      } finally {
        o.current = setTimeout(() => {
          r.current = !1, i(!1);
        }, n);
      }
    }
  }, []);
  return l(() => () => {
    o.current && clearTimeout(o.current);
  }, []), [u, t];
}
function v() {
  return navigator.onLine;
}
function y(e) {
  return document.addEventListener("online", e), document.addEventListener("offline", e), () => {
    document.removeEventListener("online", e), document.removeEventListener("offline", e);
  };
}
function L() {
  return h(y, v);
}
function b(e) {
  return document.addEventListener("visibilitychange", e), () => {
    document.removeEventListener("visibilitychange", e);
  };
}
function w() {
  return document.visibilityState !== "hidden";
}
function O() {
  return h(b, w);
}
function k(e, n = null, r = "local") {
  const t = r === "session" ? sessionStorage : localStorage, [i, o] = f(() => {
    const s = t.getItem(e);
    return s != null ? JSON.parse(s) : n;
  }), u = () => {
    t.removeItem(e), o(null);
  };
  return l(() => {
    t.setItem(e, JSON.stringify(i));
  }, [i]), [i, o, u];
}
export {
  T as useDebounce,
  C as useDeferredComponent,
  E as useInterval,
  L as useIsOnline,
  k as useStorage,
  I as useThrottle,
  O as useisWindowVisible
};
