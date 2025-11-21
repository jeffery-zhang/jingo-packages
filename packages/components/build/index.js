import fe, { forwardRef as ee, useRef as I, useState as Y, useImperativeHandle as re, useEffect as te, useMemo as Z, useCallback as V, useLayoutEffect as me } from "react";
var $ = { exports: {} }, w = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q;
function de() {
  if (Q) return w;
  Q = 1;
  var d = Symbol.for("react.transitional.element"), v = Symbol.for("react.fragment");
  function o(s, n, t) {
    var a = null;
    if (t !== void 0 && (a = "" + t), n.key !== void 0 && (a = "" + n.key), "key" in n) {
      t = {};
      for (var _ in n)
        _ !== "key" && (t[_] = n[_]);
    } else t = n;
    return n = t.ref, {
      $$typeof: d,
      type: s,
      key: a,
      ref: n !== void 0 ? n : null,
      props: t
    };
  }
  return w.Fragment = v, w.jsx = o, w.jsxs = o, w;
}
var N = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H;
function pe() {
  return H || (H = 1, process.env.NODE_ENV !== "production" && (function() {
    function d(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === ce ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case A:
          return "Fragment";
        case O:
          return "Profiler";
        case p:
          return "StrictMode";
        case E:
          return "Suspense";
        case M:
          return "SuspenseList";
        case le:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case k:
            return "Portal";
          case l:
            return e.displayName || "Context";
          case F:
            return (e._context.displayName || "Context") + ".Consumer";
          case c:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case g:
            return r = e.displayName || null, r !== null ? r : d(e.type) || "Memo";
          case T:
            r = e._payload, e = e._init;
            try {
              return d(e(r));
            } catch {
            }
        }
      return null;
    }
    function v(e) {
      return "" + e;
    }
    function o(e) {
      try {
        v(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var u = r.error, f = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return u.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          f
        ), v(e);
      }
    }
    function s(e) {
      if (e === A) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === T)
        return "<...>";
      try {
        var r = d(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = D.A;
      return e === null ? null : e.getOwner();
    }
    function t() {
      return Error("react-stack-top-frame");
    }
    function a(e) {
      if (W.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function _(e, r) {
      function u() {
        q || (q = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      u.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: u,
        configurable: !0
      });
    }
    function R() {
      var e = d(this.type);
      return G[e] || (G[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function y(e, r, u, f, C, z) {
      var m = u.ref;
      return e = {
        $$typeof: j,
        type: e,
        key: r,
        props: u,
        _owner: f
      }, (m !== void 0 ? m : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: R
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: C
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: z
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function S(e, r, u, f, C, z) {
      var m = r.children;
      if (m !== void 0)
        if (f)
          if (ue(m)) {
            for (f = 0; f < m.length; f++)
              i(m[f]);
            Object.freeze && Object.freeze(m);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else i(m);
      if (W.call(r, "key")) {
        m = d(e);
        var P = Object.keys(r).filter(function(ie) {
          return ie !== "key";
        });
        f = 0 < P.length ? "{key: someKey, " + P.join(": ..., ") + ": ...}" : "{key: someKey}", B[m + f] || (P = 0 < P.length ? "{" + P.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          f,
          m,
          P,
          m
        ), B[m + f] = !0);
      }
      if (m = null, u !== void 0 && (o(u), m = "" + u), a(r) && (o(r.key), m = "" + r.key), "key" in r) {
        u = {};
        for (var U in r)
          U !== "key" && (u[U] = r[U]);
      } else u = r;
      return m && _(
        u,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), y(
        e,
        m,
        u,
        n(),
        C,
        z
      );
    }
    function i(e) {
      h(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === T && (e._payload.status === "fulfilled" ? h(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function h(e) {
      return typeof e == "object" && e !== null && e.$$typeof === j;
    }
    var b = fe, j = Symbol.for("react.transitional.element"), k = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), F = Symbol.for("react.consumer"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), le = Symbol.for("react.activity"), ce = Symbol.for("react.client.reference"), D = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = Object.prototype.hasOwnProperty, ue = Array.isArray, L = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var q, G = {}, J = b.react_stack_bottom_frame.bind(
      b,
      t
    )(), X = L(s(t)), B = {};
    N.Fragment = A, N.jsx = function(e, r, u) {
      var f = 1e4 > D.recentlyCreatedOwnerStacks++;
      return S(
        e,
        r,
        u,
        !1,
        f ? Error("react-stack-top-frame") : J,
        f ? L(s(e)) : X
      );
    }, N.jsxs = function(e, r, u) {
      var f = 1e4 > D.recentlyCreatedOwnerStacks++;
      return S(
        e,
        r,
        u,
        !0,
        f ? Error("react-stack-top-frame") : J,
        f ? L(s(e)) : X
      );
    };
  })()), N;
}
var K;
function ve() {
  return K || (K = 1, process.env.NODE_ENV === "production" ? $.exports = de() : $.exports = pe()), $.exports;
}
var x = ve();
const Te = ee(function({
  className: d = "",
  style: v = {},
  total: o = 0,
  viewHeight: s = ne,
  padding: n = se,
  rowHeight: t = oe,
  children: a
}, _) {
  const R = I(null), [y, S] = Y(0), i = Math.max(o * t, s), h = Math.max(Math.floor(y / t) - n, 0), b = Math.min(Math.floor((y + s) / t) + n, o), j = h * t, k = [];
  for (let p = h; p < b; p++)
    k.push(
      /* @__PURE__ */ x.jsx("div", { "data-index": p, className: "virtual-list-render-item", style: { height: t }, children: a == null ? void 0 : a(p) }, `${ae}-${p}`)
    );
  const A = () => {
    requestAnimationFrame(() => {
      var O;
      const p = ((O = R.current) == null ? void 0 : O.scrollTop) || 0;
      S(p);
    });
  };
  return re(_, () => ({
    scrollTo: (p) => {
      p < 0 || p > o || R.current && (p < h + n || p > b - n) && R.current.scrollTo(0, p * t);
    }
  })), /* @__PURE__ */ x.jsxs(
    "div",
    {
      ref: R,
      className: `virtual-list-viewer ${d}`,
      style: { ...v, position: "relative", height: s, overflowY: "auto" },
      onScroll: A,
      children: [
        /* @__PURE__ */ x.jsx("div", { className: "virtual-list-phantom", style: { position: "absolute", width: "100%", height: i, top: 0, left: 0, zIndex: -1 } }),
        /* @__PURE__ */ x.jsx(
          "div",
          {
            className: "virtual-list-render-area",
            style: { position: "absolute", width: "100%", left: 0, top: 0, transform: `translate3d(0px, ${j}px, 0px)` },
            children: k
          }
        )
      ]
    }
  );
}), Ee = (d, v) => {
  let o = 0, s = d.length - 1, n = -1;
  for (; o <= s; ) {
    const t = Math.floor((o + s) / 2), a = d[t];
    if (a === v)
      return t + 1;
    a < v ? o = t + 1 : a > v && ((n === -1 || n > t) && (n = t), s = t - 1);
  }
  return n;
}, _e = ({ children: d, offset: v, index: o, adjust: s }) => {
  const n = I(null);
  return te(() => {
    if (n.current) {
      const t = new ResizeObserver((a) => {
        if (a[0]) {
          const _ = a[0].borderBoxSize[0].blockSize;
          s(o, _);
        }
      });
      return t.observe(n.current), () => t.disconnect();
    }
    return () => {
    };
  }, [o, s]), /* @__PURE__ */ x.jsx(
    "div",
    {
      className: "virtual-list-render-item",
      style: {
        position: "absolute",
        width: "100%",
        transform: `translate3d(0, ${v}px, 0)`
      },
      ref: n,
      children: d
    }
  );
}, Re = ee(function({
  className: d = "",
  style: v = {},
  total: o = 0,
  viewHeight: s = ne,
  padding: n = se,
  estimateRowHeight: t = oe,
  children: a
}, _) {
  const [R, y] = Y(0), S = I(null), i = I([]), [h, b] = Y(o * t);
  te(() => {
    const l = Array.from({ length: o }, (c, E) => ({
      index: E,
      height: t,
      top: E * t,
      bottom: E * t + t
    }));
    i.current = l, b(l[l.length - 1].bottom);
  }, [o, t]);
  const j = (l) => Ee(
    i.current.map((c) => c.bottom),
    l
  ), { start: k, end: A } = Z(() => {
    let l = j(R), c = l;
    if (i.current[l]) {
      const E = i.current[l].top + s;
      for (; c < o && i.current[c].top < E; )
        c++;
    }
    return {
      start: Math.max(0, l - n),
      end: Math.min(o, c + n)
    };
  }, [R, o, h, s, n]), p = V((l, c) => {
    if (c <= 0) return;
    const E = i.current[l];
    if (!E) return;
    const M = E.height, g = c - M;
    if (g !== 0) {
      E.height = c, E.bottom = E.bottom + g;
      for (let T = l + 1; T < o; T++)
        i.current[T].top = i.current[T - 1].bottom, i.current[T].bottom = i.current[T].bottom + g;
      b(i.current[i.current.length - 1].bottom);
    }
  }, []), O = V((l) => {
    const c = l.currentTarget.scrollTop;
    requestAnimationFrame(() => {
      y(c);
    });
  }, []);
  re(_, () => ({
    scrollTo: (l) => {
      S.current && i.current[l] && (S.current.scrollTop = i.current[l].top);
    }
  }));
  const F = Z(() => {
    const l = [];
    for (let c = k; c < A; c++) {
      const E = i.current[c];
      E && l.push(
        /* @__PURE__ */ x.jsx(_e, { offset: E.top, index: c, adjust: p, children: a == null ? void 0 : a(c) }, `${ae}-${c}`)
      );
    }
    return l;
  }, [k, A, a, p]);
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      ref: S,
      className: `virtual-list-viewer ${d}`,
      style: { ...v, position: "relative", height: s, overflowY: "auto" },
      onScroll: O,
      children: /* @__PURE__ */ x.jsx("div", { className: "virtual-list-phantom", style: { position: "relative", width: "100%", height: h }, children: F })
    }
  );
}), ne = 300, oe = 40, se = 4, ae = "@jingoz/react-virtual-list-fixed-height-item";
function he({ children: d }) {
  const [v, o] = Y({ width: 0, height: 0 }), s = I(null), n = V(() => d(v), [v]);
  return me(() => {
    if (!s.current) return;
    const { width: t, height: a } = s.current.getBoundingClientRect();
    o({ width: t, height: a });
  }, []), /* @__PURE__ */ x.jsx("div", { ref: s, style: { width: "100%", height: "100%" }, children: n() });
}
export {
  he as AutoSizer,
  se as DEFAULT_PADDING,
  oe as DEFAULT_ROW_HEIGHT,
  ne as DEFAULT_VIEW_HEIGHT,
  Re as DynamicHeightVirtualList,
  Te as FixedHeightVirtualList,
  ae as VIRTUAL_LIST_ITEM_KEY
};
