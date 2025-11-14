import I, { forwardRef as ue, useRef as J, useState as K, useImperativeHandle as le, useCallback as fe, useLayoutEffect as de } from "react";
var k = { exports: {} }, b = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function ge() {
  if (G) return b;
  G = 1;
  var f = Symbol.for("react.transitional.element"), m = Symbol.for("react.fragment");
  function d(s, c, l) {
    var v = null;
    if (l !== void 0 && (v = "" + l), c.key !== void 0 && (v = "" + c.key), "key" in c) {
      l = {};
      for (var T in c)
        T !== "key" && (l[T] = c[T]);
    } else l = c;
    return c = l.ref, {
      $$typeof: f,
      type: s,
      key: v,
      ref: c !== void 0 ? c : null,
      props: l
    };
  }
  return b.Fragment = m, b.jsx = d, b.jsxs = d, b;
}
var D = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var q;
function ye() {
  return q || (q = 1, process.env.NODE_ENV !== "production" && (function() {
    function f(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === ie ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case y:
          return "Fragment";
        case Z:
          return "Profiler";
        case w:
          return "StrictMode";
        case te:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case oe:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case R:
            return "Portal";
          case ee:
            return r.displayName || "Context";
          case Q:
            return (r._context.displayName || "Context") + ".Consumer";
          case re:
            var i = r.render;
            return r = r.displayName, r || (r = i.displayName || i.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case ae:
            return i = r.displayName || null, i !== null ? i : f(r.type) || "Memo";
          case x:
            i = r._payload, r = r._init;
            try {
              return f(r(i));
            } catch {
            }
        }
      return null;
    }
    function m(r) {
      return "" + r;
    }
    function d(r) {
      try {
        m(r);
        var i = !1;
      } catch {
        i = !0;
      }
      if (i) {
        i = console;
        var g = i.error, p = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g.call(
          i,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          p
        ), m(r);
      }
    }
    function s(r) {
      if (r === y) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === x)
        return "<...>";
      try {
        var i = f(r);
        return i ? "<" + i + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function c() {
      var r = M.A;
      return r === null ? null : r.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function v(r) {
      if (F.call(r, "key")) {
        var i = Object.getOwnPropertyDescriptor(r, "key").get;
        if (i && i.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function T(r, i) {
      function g() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          i
        ));
      }
      g.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: g,
        configurable: !0
      });
    }
    function a() {
      var r = f(this.type);
      return Y[r] || (Y[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function t(r, i, g, p, N, L) {
      var _ = g.ref;
      return r = {
        $$typeof: E,
        type: r,
        key: i,
        props: g,
        _owner: p
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: a
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: N
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: L
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function u(r, i, g, p, N, L) {
      var _ = i.children;
      if (_ !== void 0)
        if (p)
          if (se(_)) {
            for (p = 0; p < _.length; p++)
              n(_[p]);
            Object.freeze && Object.freeze(_);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else n(_);
      if (F.call(i, "key")) {
        _ = f(r);
        var S = Object.keys(i).filter(function(ce) {
          return ce !== "key";
        });
        p = 0 < S.length ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}", H[_ + p] || (S = 0 < S.length ? "{" + S.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          p,
          _,
          S,
          _
        ), H[_ + p] = !0);
      }
      if (_ = null, g !== void 0 && (d(g), _ = "" + g), v(i) && (d(i.key), _ = "" + i.key), "key" in i) {
        g = {};
        for (var C in i)
          C !== "key" && (g[C] = i[C]);
      } else g = i;
      return _ && T(
        g,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), t(
        r,
        _,
        g,
        c(),
        N,
        L
      );
    }
    function n(r) {
      e(r) ? r._store && (r._store.validated = 1) : typeof r == "object" && r !== null && r.$$typeof === x && (r._payload.status === "fulfilled" ? e(r._payload.value) && r._payload.value._store && (r._payload.value._store.validated = 1) : r._store && (r._store.validated = 1));
    }
    function e(r) {
      return typeof r == "object" && r !== null && r.$$typeof === E;
    }
    var o = I, E = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), Q = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), oe = Symbol.for("react.activity"), ie = Symbol.for("react.client.reference"), M = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = Object.prototype.hasOwnProperty, se = Array.isArray, j = console.createTask ? console.createTask : function() {
      return null;
    };
    o = {
      react_stack_bottom_frame: function(r) {
        return r();
      }
    };
    var U, Y = {}, $ = o.react_stack_bottom_frame.bind(
      o,
      l
    )(), V = j(s(l)), H = {};
    D.Fragment = y, D.jsx = function(r, i, g) {
      var p = 1e4 > M.recentlyCreatedOwnerStacks++;
      return u(
        r,
        i,
        g,
        !1,
        p ? Error("react-stack-top-frame") : $,
        p ? j(s(r)) : V
      );
    }, D.jsxs = function(r, i, g) {
      var p = 1e4 > M.recentlyCreatedOwnerStacks++;
      return u(
        r,
        i,
        g,
        !0,
        p ? Error("react-stack-top-frame") : $,
        p ? j(s(r)) : V
      );
    };
  })()), D;
}
var W;
function me() {
  return W || (W = 1, process.env.NODE_ENV === "production" ? k.exports = ge() : k.exports = ye()), k.exports;
}
var A = me();
function pe({ index: f, offset: m, rowHeight: d, children: s }) {
  return /* @__PURE__ */ A.jsx(
    "div",
    {
      style: {
        position: "absolute",
        width: "100%",
        height: d,
        top: m
      },
      children: s ? s(f) : null
    }
  );
}
var P = { exports: {} }, h = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z;
function _e() {
  if (z) return h;
  z = 1;
  var f = I;
  function m(a) {
    var t = "https://react.dev/errors/" + a;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + a + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var s = {
    d: {
      f: d,
      r: function() {
        throw Error(m(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, c = Symbol.for("react.portal");
  function l(a, t, u) {
    var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: n == null ? null : "" + n,
      children: a,
      containerInfo: t,
      implementation: u
    };
  }
  var v = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(a, t) {
    if (a === "font") return "";
    if (typeof t == "string")
      return t === "use-credentials" ? t : "";
  }
  return h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, h.createPortal = function(a, t) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
      throw Error(m(299));
    return l(a, t, null, u);
  }, h.flushSync = function(a) {
    var t = v.T, u = s.p;
    try {
      if (v.T = null, s.p = 2, a) return a();
    } finally {
      v.T = t, s.p = u, s.d.f();
    }
  }, h.preconnect = function(a, t) {
    typeof a == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, s.d.C(a, t));
  }, h.prefetchDNS = function(a) {
    typeof a == "string" && s.d.D(a);
  }, h.preinit = function(a, t) {
    if (typeof a == "string" && t && typeof t.as == "string") {
      var u = t.as, n = T(u, t.crossOrigin), e = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
      u === "style" ? s.d.S(
        a,
        typeof t.precedence == "string" ? t.precedence : void 0,
        {
          crossOrigin: n,
          integrity: e,
          fetchPriority: o
        }
      ) : u === "script" && s.d.X(a, {
        crossOrigin: n,
        integrity: e,
        fetchPriority: o,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0
      });
    }
  }, h.preinitModule = function(a, t) {
    if (typeof a == "string")
      if (typeof t == "object" && t !== null) {
        if (t.as == null || t.as === "script") {
          var u = T(
            t.as,
            t.crossOrigin
          );
          s.d.M(a, {
            crossOrigin: u,
            integrity: typeof t.integrity == "string" ? t.integrity : void 0,
            nonce: typeof t.nonce == "string" ? t.nonce : void 0
          });
        }
      } else t == null && s.d.M(a);
  }, h.preload = function(a, t) {
    if (typeof a == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
      var u = t.as, n = T(u, t.crossOrigin);
      s.d.L(a, u, {
        crossOrigin: n,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        type: typeof t.type == "string" ? t.type : void 0,
        fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
        referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
        imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
        imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
        media: typeof t.media == "string" ? t.media : void 0
      });
    }
  }, h.preloadModule = function(a, t) {
    if (typeof a == "string")
      if (t) {
        var u = T(t.as, t.crossOrigin);
        s.d.m(a, {
          as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
          crossOrigin: u,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0
        });
      } else s.d.m(a);
  }, h.requestFormReset = function(a) {
    s.d.r(a);
  }, h.unstable_batchedUpdates = function(a, t) {
    return a(t);
  }, h.useFormState = function(a, t, u) {
    return v.H.useFormState(a, t, u);
  }, h.useFormStatus = function() {
    return v.H.useHostTransitionStatus();
  }, h.version = "19.2.0", h;
}
var O = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B;
function ve() {
  return B || (B = 1, process.env.NODE_ENV !== "production" && (function() {
    function f() {
    }
    function m(n) {
      return "" + n;
    }
    function d(n, e, o) {
      var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        m(E);
        var R = !1;
      } catch {
        R = !0;
      }
      return R && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && E[Symbol.toStringTag] || E.constructor.name || "Object"
      ), m(E)), {
        $$typeof: t,
        key: E == null ? null : "" + E,
        children: n,
        containerInfo: e,
        implementation: o
      };
    }
    function s(n, e) {
      if (n === "font") return "";
      if (typeof e == "string")
        return e === "use-credentials" ? e : "";
    }
    function c(n) {
      return n === null ? "`null`" : n === void 0 ? "`undefined`" : n === "" ? "an empty string" : 'something with type "' + typeof n + '"';
    }
    function l(n) {
      return n === null ? "`null`" : n === void 0 ? "`undefined`" : n === "" ? "an empty string" : typeof n == "string" ? JSON.stringify(n) : typeof n == "number" ? "`" + n + "`" : 'something with type "' + typeof n + '"';
    }
    function v() {
      var n = u.H;
      return n === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), n;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var T = I, a = {
      d: {
        f,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: f,
        C: f,
        L: f,
        m: f,
        X: f,
        S: f,
        M: f
      },
      p: 0,
      findDOMNode: null
    }, t = Symbol.for("react.portal"), u = T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), O.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, O.createPortal = function(n, e) {
      var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return d(n, e, null, o);
    }, O.flushSync = function(n) {
      var e = u.T, o = a.p;
      try {
        if (u.T = null, a.p = 2, n)
          return n();
      } finally {
        u.T = e, a.p = o, a.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, O.preconnect = function(n, e) {
      typeof n == "string" && n ? e != null && typeof e != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        l(e)
      ) : e != null && typeof e.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        c(e.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        c(n)
      ), typeof n == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, a.d.C(n, e));
    }, O.prefetchDNS = function(n) {
      if (typeof n != "string" || !n)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          c(n)
        );
      else if (1 < arguments.length) {
        var e = arguments[1];
        typeof e == "object" && e.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          l(e)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          l(e)
        );
      }
      typeof n == "string" && a.d.D(n);
    }, O.preinit = function(n, e) {
      if (typeof n == "string" && n ? e == null || typeof e != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        l(e)
      ) : e.as !== "style" && e.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        l(e.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        c(n)
      ), typeof n == "string" && e && typeof e.as == "string") {
        var o = e.as, E = s(o, e.crossOrigin), R = typeof e.integrity == "string" ? e.integrity : void 0, y = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
        o === "style" ? a.d.S(
          n,
          typeof e.precedence == "string" ? e.precedence : void 0,
          {
            crossOrigin: E,
            integrity: R,
            fetchPriority: y
          }
        ) : o === "script" && a.d.X(n, {
          crossOrigin: E,
          integrity: R,
          fetchPriority: y,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0
        });
      }
    }, O.preinitModule = function(n, e) {
      var o = "";
      if (typeof n == "string" && n || (o += " The `href` argument encountered was " + c(n) + "."), e !== void 0 && typeof e != "object" ? o += " The `options` argument encountered was " + c(e) + "." : e && "as" in e && e.as !== "script" && (o += " The `as` option encountered was " + l(e.as) + "."), o)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          o
        );
      else
        switch (o = e && typeof e.as == "string" ? e.as : "script", o) {
          case "script":
            break;
          default:
            o = l(o), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              o,
              n
            );
        }
      typeof n == "string" && (typeof e == "object" && e !== null ? (e.as == null || e.as === "script") && (o = s(
        e.as,
        e.crossOrigin
      ), a.d.M(n, {
        crossOrigin: o,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0,
        nonce: typeof e.nonce == "string" ? e.nonce : void 0
      })) : e == null && a.d.M(n));
    }, O.preload = function(n, e) {
      var o = "";
      if (typeof n == "string" && n || (o += " The `href` argument encountered was " + c(n) + "."), e == null || typeof e != "object" ? o += " The `options` argument encountered was " + c(e) + "." : typeof e.as == "string" && e.as || (o += " The `as` option encountered was " + c(e.as) + "."), o && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        o
      ), typeof n == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
        o = e.as;
        var E = s(
          o,
          e.crossOrigin
        );
        a.d.L(n, o, {
          crossOrigin: E,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
          type: typeof e.type == "string" ? e.type : void 0,
          fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
          referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
          imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
          imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
          media: typeof e.media == "string" ? e.media : void 0
        });
      }
    }, O.preloadModule = function(n, e) {
      var o = "";
      typeof n == "string" && n || (o += " The `href` argument encountered was " + c(n) + "."), e !== void 0 && typeof e != "object" ? o += " The `options` argument encountered was " + c(e) + "." : e && "as" in e && typeof e.as != "string" && (o += " The `as` option encountered was " + c(e.as) + "."), o && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        o
      ), typeof n == "string" && (e ? (o = s(
        e.as,
        e.crossOrigin
      ), a.d.m(n, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: o,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0
      })) : a.d.m(n));
    }, O.requestFormReset = function(n) {
      a.d.r(n);
    }, O.unstable_batchedUpdates = function(n, e) {
      return n(e);
    }, O.useFormState = function(n, e, o) {
      return v().useFormState(n, e, o);
    }, O.useFormStatus = function() {
      return v().useHostTransitionStatus();
    }, O.version = "19.2.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), O;
}
var X;
function Ee() {
  if (X) return P.exports;
  X = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (f(), P.exports = _e()) : P.exports = ve(), P.exports;
}
var he = Ee();
const Oe = 300, Te = 40, Re = 2, Se = "@jingoz/react-virtual-list-fixed-height-item", De = ue(function({
  className: f = "",
  style: m = {},
  total: d = 0,
  viewHeight: s = Oe,
  padding: c = Re,
  rowHeight: l = Te,
  children: v
}, T) {
  const a = J(null), [t, u] = K(0), n = Math.max(d * l, s), e = Math.max(Math.floor(t / l) - c, 0), o = Math.min(Math.floor((t + s) / l) + c, d), E = [];
  for (let y = e; y < o; y++)
    E.push(/* @__PURE__ */ A.jsx(pe, { index: y, offset: y * l, rowHeight: l, children: v }, `${Se}-${y}`));
  const R = () => {
    he.flushSync(() => {
      requestAnimationFrame(() => {
        var w;
        const y = ((w = a.current) == null ? void 0 : w.scrollTop) || 0;
        u(y);
      });
    });
  };
  return le(T, () => ({
    scrollTo: (y) => {
      y < 0 || y > d || a.current && (y < e + c || y > o - c) && a.current.scrollTo(0, y * l);
    }
  })), /* @__PURE__ */ A.jsx("div", { ref: a, className: `virtual-list-viewer ${f}`, style: { ...m, height: s, overflowY: "auto" }, onScroll: R, children: /* @__PURE__ */ A.jsx("div", { className: "virtual-list-container", style: { position: "relative", height: n }, children: E }) });
});
function Ae({ children: f }) {
  const [m, d] = K({ width: 0, height: 0 }), s = J(null), c = fe(() => f(m), [m]);
  return de(() => {
    if (!s.current) return;
    const { width: l, height: v } = s.current.getBoundingClientRect();
    d({ width: l, height: v });
  }, []), /* @__PURE__ */ A.jsx("div", { ref: s, style: { width: "100%", height: "100%" }, children: c() });
}
export {
  Ae as AutoSizer,
  De as FixedHeightVirtualList
};
