var r = Object.defineProperty;
var o = (e, t, s) => t in e ? r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var i = (e, t, s) => o(e, typeof t != "symbol" ? t + "" : t, s);
import { useSyncExternalStore as c } from "react";
class l {
  constructor() {
    i(this, "isInitialized", !1);
    i(this, "initialState", {});
    i(this, "state", {});
    i(this, "listeners", /* @__PURE__ */ new Set());
    i(this, "setState", (t) => {
      const s = typeof t == "function" ? t(this.state) : t;
      if (!this.isInitialized) {
        this.initialState = s, this.state = s, this.isInitialized = !0;
        return;
      }
      if (!Object.is(s, this.state)) {
        const n = this.state;
        this.state = Object.assign({}, n, s);
        for (const a of this.listeners)
          a(this.state, n);
      }
    });
    i(this, "getState", () => this.state);
    i(this, "getInitialState", () => this.initialState);
    i(this, "subscribe", (t) => (this.listeners.add(t), () => this.listeners.delete(t)));
  }
}
function S(e) {
  const t = new l(), s = e(t.setState, t.getState);
  return t.setState(s), t;
}
const u = (e) => e;
function h(e, t = u) {
  return c(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
}
function f(e) {
  const t = S(e), s = (n) => h(t, n);
  return Object.assign(s, t), s;
}
const g = (e) => f(e);
export {
  l as VanillaStoreApi,
  g as create,
  f as createStateImpl,
  S as createStoreVanillaImpl,
  h as useStore
};
