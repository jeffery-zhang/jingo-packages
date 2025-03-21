var w = Object.defineProperty;
var y = (s, e, r) => e in s ? w(s, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[e] = r;
var u = (s, e, r) => y(s, typeof e != "symbol" ? e + "" : e, r);
class g {
  constructor(e) {
    // full file hash
    u(this, "_fileHash", "");
    this._file = e;
  }
  get fullHash() {
    return this._fileHash;
  }
  get fileSize() {
    var e;
    return ((e = this._file) == null ? void 0 : e.size) ?? 0;
  }
  get fileName() {
    var e;
    return ((e = this._file) == null ? void 0 : e.name) ?? "";
  }
  get fileType() {
    var r;
    const e = (r = this._file) == null ? void 0 : r.name;
    return ((e == null ? void 0 : e.substring(e.lastIndexOf("."), e.length)) || "").toLowerCase();
  }
  get filePath() {
    var e;
    return ((e = this._file) == null ? void 0 : e.webkitRelativePath.split("/").filter((r) => r !== this.fileName).join("/")) ?? "";
  }
  // calculate hash from arrayBuffer
  async _arrayBufferToHash(e) {
    try {
      const r = await window.crypto.subtle.digest("SHA-256", e);
      return [...new Uint8Array(r)].map((n) => n.toString(16).padStart(2, "0").toUpperCase()).join("");
    } catch (r) {
      throw console.error(r), new Error("calculate hash error");
    }
  }
  // calculate full file hash
  calcFileHash() {
    return new Promise((e, r) => {
      if (!this._file) return r(new Error("file not exists"));
      const i = new FileReader();
      i.readAsArrayBuffer(this._file), i.onload = async (n) => {
        var t;
        if (!((t = n.target) != null && t.result)) return r(new Error("read file error"));
        const a = await this._arrayBufferToHash(n.target.result);
        if (!a) return Promise.reject(new Error("calculate hash error"));
        this._fileHash = a, e();
      };
    });
  }
}
const p = 1 * 1024 * 1024;
class H {
  constructor(e, r, i, n) {
    this.body = e, this.partialHash = r, this.position = i, this.offset = n;
  }
}
class S extends g {
  constructor(r, i = p) {
    super(r);
    u(this, "_chunks", []);
    this.chunkSize = i;
  }
  get chunks() {
    return this._chunks;
  }
  splitFile(r, i) {
    return new Promise((n, a) => {
      if (!this._file) return a(new Error("file not exists"));
      let t = r ?? 0;
      const h = i ?? this.fileSize, l = new FileReader(), c = () => {
        if (t >= h) {
          n();
          return;
        }
        const o = this._file.slice(t, t + this.chunkSize);
        l.readAsArrayBuffer(o);
      };
      l.onload = async (o) => {
        var _;
        if (!((_ = o.target) != null && _.result)) return a(new Error("read file error"));
        const f = o.target.result, d = await this._arrayBufferToHash(f);
        d && this._chunks.push(
          new H(f, d, t, t + this.chunkSize > h ? h - t : this.chunkSize)
        ), t += this.chunkSize, c();
      }, l.addEventListener("error", () => a(new Error("read file error"))), c();
    });
  }
  destroy() {
    this._file = void 0, this._chunks = [];
  }
}
export {
  S as FileSlicer,
  g as FileWithHash
};
