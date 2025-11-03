import { useState as r, useEffect as s } from "react";
function a(o) {
  const [n, t] = r(null);
  return s(() => {
    "requestIdleCallback" in window ? requestIdleCallback(
      async () => {
        try {
          const e = await o();
          t(() => e.default);
        } catch (e) {
          throw console.log("useDeferedComponent: ", e), new Error("useDeferedComponent: " + e);
        }
      },
      { timeout: 100 }
    ) : setTimeout(async () => {
      try {
        const e = await o();
        t(() => e.default);
      } catch (e) {
        throw console.log("useDeferedComponent: ", e), new Error("useDeferedComponent: " + e);
      }
    }, 1);
  }, []), n;
}
export {
  a as useDeferredComponent
};
