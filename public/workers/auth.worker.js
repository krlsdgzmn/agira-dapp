"use strict";
(() => {
  var yu = Object.create;
  var li = Object.defineProperty;
  var wu = Object.getOwnPropertyDescriptor;
  var gu = Object.getOwnPropertyNames;
  var mu = Object.getPrototypeOf,
    xu = Object.prototype.hasOwnProperty;
  var ut = (r, t) => () => (r && (t = r((r = 0))), t);
  var At = (r, t) => () => (
      t || r((t = { exports: {} }).exports, t), t.exports
    ),
    _u = (r, t) => {
      for (var e in t) li(r, e, { get: t[e], enumerable: !0 });
    },
    bu = (r, t, e, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of gu(t))
          !xu.call(r, i) &&
            i !== e &&
            li(r, i, {
              get: () => t[i],
              enumerable: !(n = wu(t, i)) || n.enumerable,
            });
      return r;
    };
  var Be = (r, t, e) => (
    (e = r != null ? yu(mu(r)) : {}),
    bu(
      t || !r || !r.__esModule
        ? li(e, "default", { value: r, enumerable: !0 })
        : e,
      r,
    )
  );
  var di = At((rn) => {
    "use strict";
    rn.byteLength = Au;
    rn.toByteArray = Tu;
    rn.fromByteArray = Iu;
    var fe = [],
      Jt = [],
      Eu = typeof Uint8Array < "u" ? Uint8Array : Array,
      hi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (Le = 0, so = hi.length; Le < so; ++Le)
      (fe[Le] = hi[Le]), (Jt[hi.charCodeAt(Le)] = Le);
    var Le, so;
    Jt[45] = 62;
    Jt[95] = 63;
    function oo(r) {
      var t = r.length;
      if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var e = r.indexOf("=");
      e === -1 && (e = t);
      var n = e === t ? 0 : 4 - (e % 4);
      return [e, n];
    }
    function Au(r) {
      var t = oo(r),
        e = t[0],
        n = t[1];
      return ((e + n) * 3) / 4 - n;
    }
    function vu(r, t, e) {
      return ((t + e) * 3) / 4 - e;
    }
    function Tu(r) {
      var t,
        e = oo(r),
        n = e[0],
        i = e[1],
        s = new Eu(vu(r, n, i)),
        o = 0,
        c = i > 0 ? n - 4 : n,
        u;
      for (u = 0; u < c; u += 4)
        (t =
          (Jt[r.charCodeAt(u)] << 18) |
          (Jt[r.charCodeAt(u + 1)] << 12) |
          (Jt[r.charCodeAt(u + 2)] << 6) |
          Jt[r.charCodeAt(u + 3)]),
          (s[o++] = (t >> 16) & 255),
          (s[o++] = (t >> 8) & 255),
          (s[o++] = t & 255);
      return (
        i === 2 &&
          ((t = (Jt[r.charCodeAt(u)] << 2) | (Jt[r.charCodeAt(u + 1)] >> 4)),
          (s[o++] = t & 255)),
        i === 1 &&
          ((t =
            (Jt[r.charCodeAt(u)] << 10) |
            (Jt[r.charCodeAt(u + 1)] << 4) |
            (Jt[r.charCodeAt(u + 2)] >> 2)),
          (s[o++] = (t >> 8) & 255),
          (s[o++] = t & 255)),
        s
      );
    }
    function Bu(r) {
      return (
        fe[(r >> 18) & 63] + fe[(r >> 12) & 63] + fe[(r >> 6) & 63] + fe[r & 63]
      );
    }
    function Su(r, t, e) {
      for (var n, i = [], s = t; s < e; s += 3)
        (n =
          ((r[s] << 16) & 16711680) +
          ((r[s + 1] << 8) & 65280) +
          (r[s + 2] & 255)),
          i.push(Bu(n));
      return i.join("");
    }
    function Iu(r) {
      for (
        var t, e = r.length, n = e % 3, i = [], s = 16383, o = 0, c = e - n;
        o < c;
        o += s
      )
        i.push(Su(r, o, o + s > c ? c : o + s));
      return (
        n === 1
          ? ((t = r[e - 1]), i.push(fe[t >> 2] + fe[(t << 4) & 63] + "=="))
          : n === 2 &&
            ((t = (r[e - 2] << 8) + r[e - 1]),
            i.push(fe[t >> 10] + fe[(t >> 4) & 63] + fe[(t << 2) & 63] + "=")),
        i.join("")
      );
    }
  });
  var nn = At((pi) => {
    pi.read = function (r, t, e, n, i) {
      var s,
        o,
        c = i * 8 - n - 1,
        u = (1 << c) - 1,
        y = u >> 1,
        w = -7,
        _ = e ? i - 1 : 0,
        N = e ? -1 : 1,
        q = r[t + _];
      for (
        _ += N, s = q & ((1 << -w) - 1), q >>= -w, w += c;
        w > 0;
        s = s * 256 + r[t + _], _ += N, w -= 8
      );
      for (
        o = s & ((1 << -w) - 1), s >>= -w, w += n;
        w > 0;
        o = o * 256 + r[t + _], _ += N, w -= 8
      );
      if (s === 0) s = 1 - y;
      else {
        if (s === u) return o ? NaN : (q ? -1 : 1) * (1 / 0);
        (o = o + Math.pow(2, n)), (s = s - y);
      }
      return (q ? -1 : 1) * o * Math.pow(2, s - n);
    };
    pi.write = function (r, t, e, n, i, s) {
      var o,
        c,
        u,
        y = s * 8 - i - 1,
        w = (1 << y) - 1,
        _ = w >> 1,
        N = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        q = n ? 0 : s - 1,
        P = n ? 1 : -1,
        G = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
      for (
        t = Math.abs(t),
          isNaN(t) || t === 1 / 0
            ? ((c = isNaN(t) ? 1 : 0), (o = w))
            : ((o = Math.floor(Math.log(t) / Math.LN2)),
              t * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
              o + _ >= 1 ? (t += N / u) : (t += N * Math.pow(2, 1 - _)),
              t * u >= 2 && (o++, (u /= 2)),
              o + _ >= w
                ? ((c = 0), (o = w))
                : o + _ >= 1
                  ? ((c = (t * u - 1) * Math.pow(2, i)), (o = o + _))
                  : ((c = t * Math.pow(2, _ - 1) * Math.pow(2, i)), (o = 0)));
        i >= 8;
        r[e + q] = c & 255, q += P, c /= 256, i -= 8
      );
      for (
        o = (o << i) | c, y += i;
        y > 0;
        r[e + q] = o & 255, q += P, o /= 256, y -= 8
      );
      r[e + q - P] |= G * 128;
    };
  });
  var vo = At((nr) => {
    "use strict";
    var yi = di(),
      er = nn(),
      ao =
        typeof Symbol == "function" && typeof Symbol.for == "function"
          ? Symbol.for("nodejs.util.inspect.custom")
          : null;
    nr.Buffer = T;
    nr.SlowBuffer = Pu;
    nr.INSPECT_MAX_BYTES = 50;
    var sn = 2147483647;
    nr.kMaxLength = sn;
    T.TYPED_ARRAY_SUPPORT = Nu();
    !T.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
    function Nu() {
      try {
        let r = new Uint8Array(1),
          t = {
            foo: function () {
              return 42;
            },
          };
        return (
          Object.setPrototypeOf(t, Uint8Array.prototype),
          Object.setPrototypeOf(r, t),
          r.foo() === 42
        );
      } catch {
        return !1;
      }
    }
    Object.defineProperty(T.prototype, "parent", {
      enumerable: !0,
      get: function () {
        if (T.isBuffer(this)) return this.buffer;
      },
    });
    Object.defineProperty(T.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (T.isBuffer(this)) return this.byteOffset;
      },
    });
    function _e(r) {
      if (r > sn)
        throw new RangeError(
          'The value "' + r + '" is invalid for option "size"',
        );
      let t = new Uint8Array(r);
      return Object.setPrototypeOf(t, T.prototype), t;
    }
    function T(r, t, e) {
      if (typeof r == "number") {
        if (typeof t == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number',
          );
        return xi(r);
      }
      return lo(r, t, e);
    }
    T.poolSize = 8192;
    function lo(r, t, e) {
      if (typeof r == "string") return Ru(r, t);
      if (ArrayBuffer.isView(r)) return Fu(r);
      if (r == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof r,
        );
      if (
        le(r, ArrayBuffer) ||
        (r && le(r.buffer, ArrayBuffer)) ||
        (typeof SharedArrayBuffer < "u" &&
          (le(r, SharedArrayBuffer) || (r && le(r.buffer, SharedArrayBuffer))))
      )
        return gi(r, t, e);
      if (typeof r == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number',
        );
      let n = r.valueOf && r.valueOf();
      if (n != null && n !== r) return T.from(n, t, e);
      let i = Ou(r);
      if (i) return i;
      if (
        typeof Symbol < "u" &&
        Symbol.toPrimitive != null &&
        typeof r[Symbol.toPrimitive] == "function"
      )
        return T.from(r[Symbol.toPrimitive]("string"), t, e);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof r,
      );
    }
    T.from = function (r, t, e) {
      return lo(r, t, e);
    };
    Object.setPrototypeOf(T.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(T, Uint8Array);
    function ho(r) {
      if (typeof r != "number")
        throw new TypeError('"size" argument must be of type number');
      if (r < 0)
        throw new RangeError(
          'The value "' + r + '" is invalid for option "size"',
        );
    }
    function Uu(r, t, e) {
      return (
        ho(r),
        r <= 0
          ? _e(r)
          : t !== void 0
            ? typeof e == "string"
              ? _e(r).fill(t, e)
              : _e(r).fill(t)
            : _e(r)
      );
    }
    T.alloc = function (r, t, e) {
      return Uu(r, t, e);
    };
    function xi(r) {
      return ho(r), _e(r < 0 ? 0 : _i(r) | 0);
    }
    T.allocUnsafe = function (r) {
      return xi(r);
    };
    T.allocUnsafeSlow = function (r) {
      return xi(r);
    };
    function Ru(r, t) {
      if (
        ((typeof t != "string" || t === "") && (t = "utf8"), !T.isEncoding(t))
      )
        throw new TypeError("Unknown encoding: " + t);
      let e = po(r, t) | 0,
        n = _e(e),
        i = n.write(r, t);
      return i !== e && (n = n.slice(0, i)), n;
    }
    function wi(r) {
      let t = r.length < 0 ? 0 : _i(r.length) | 0,
        e = _e(t);
      for (let n = 0; n < t; n += 1) e[n] = r[n] & 255;
      return e;
    }
    function Fu(r) {
      if (le(r, Uint8Array)) {
        let t = new Uint8Array(r);
        return gi(t.buffer, t.byteOffset, t.byteLength);
      }
      return wi(r);
    }
    function gi(r, t, e) {
      if (t < 0 || r.byteLength < t)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (r.byteLength < t + (e || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let n;
      return (
        t === void 0 && e === void 0
          ? (n = new Uint8Array(r))
          : e === void 0
            ? (n = new Uint8Array(r, t))
            : (n = new Uint8Array(r, t, e)),
        Object.setPrototypeOf(n, T.prototype),
        n
      );
    }
    function Ou(r) {
      if (T.isBuffer(r)) {
        let t = _i(r.length) | 0,
          e = _e(t);
        return e.length === 0 || r.copy(e, 0, 0, t), e;
      }
      if (r.length !== void 0)
        return typeof r.length != "number" || Ei(r.length) ? _e(0) : wi(r);
      if (r.type === "Buffer" && Array.isArray(r.data)) return wi(r.data);
    }
    function _i(r) {
      if (r >= sn)
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            sn.toString(16) +
            " bytes",
        );
      return r | 0;
    }
    function Pu(r) {
      return +r != r && (r = 0), T.alloc(+r);
    }
    T.isBuffer = function (t) {
      return t != null && t._isBuffer === !0 && t !== T.prototype;
    };
    T.compare = function (t, e) {
      if (
        (le(t, Uint8Array) && (t = T.from(t, t.offset, t.byteLength)),
        le(e, Uint8Array) && (e = T.from(e, e.offset, e.byteLength)),
        !T.isBuffer(t) || !T.isBuffer(e))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (t === e) return 0;
      let n = t.length,
        i = e.length;
      for (let s = 0, o = Math.min(n, i); s < o; ++s)
        if (t[s] !== e[s]) {
          (n = t[s]), (i = e[s]);
          break;
        }
      return n < i ? -1 : i < n ? 1 : 0;
    };
    T.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    };
    T.concat = function (t, e) {
      if (!Array.isArray(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (t.length === 0) return T.alloc(0);
      let n;
      if (e === void 0) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
      let i = T.allocUnsafe(e),
        s = 0;
      for (n = 0; n < t.length; ++n) {
        let o = t[n];
        if (le(o, Uint8Array))
          s + o.length > i.length
            ? (T.isBuffer(o) || (o = T.from(o)), o.copy(i, s))
            : Uint8Array.prototype.set.call(i, o, s);
        else if (T.isBuffer(o)) o.copy(i, s);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        s += o.length;
      }
      return i;
    };
    function po(r, t) {
      if (T.isBuffer(r)) return r.length;
      if (ArrayBuffer.isView(r) || le(r, ArrayBuffer)) return r.byteLength;
      if (typeof r != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof r,
        );
      let e = r.length,
        n = arguments.length > 2 && arguments[2] === !0;
      if (!n && e === 0) return 0;
      let i = !1;
      for (;;)
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return e;
          case "utf8":
          case "utf-8":
            return mi(r).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return e * 2;
          case "hex":
            return e >>> 1;
          case "base64":
            return Ao(r).length;
          default:
            if (i) return n ? -1 : mi(r).length;
            (t = ("" + t).toLowerCase()), (i = !0);
        }
    }
    T.byteLength = po;
    function Mu(r, t, e) {
      let n = !1;
      if (
        ((t === void 0 || t < 0) && (t = 0),
        t > this.length ||
          ((e === void 0 || e > this.length) && (e = this.length), e <= 0) ||
          ((e >>>= 0), (t >>>= 0), e <= t))
      )
        return "";
      for (r || (r = "utf8"); ; )
        switch (r) {
          case "hex":
            return ju(this, t, e);
          case "utf8":
          case "utf-8":
            return wo(this, t, e);
          case "ascii":
            return Gu(this, t, e);
          case "latin1":
          case "binary":
            return Ku(this, t, e);
          case "base64":
            return Lu(this, t, e);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Du(this, t, e);
          default:
            if (n) throw new TypeError("Unknown encoding: " + r);
            (r = (r + "").toLowerCase()), (n = !0);
        }
    }
    T.prototype._isBuffer = !0;
    function He(r, t, e) {
      let n = r[t];
      (r[t] = r[e]), (r[e] = n);
    }
    T.prototype.swap16 = function () {
      let t = this.length;
      if (t % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let e = 0; e < t; e += 2) He(this, e, e + 1);
      return this;
    };
    T.prototype.swap32 = function () {
      let t = this.length;
      if (t % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let e = 0; e < t; e += 4) He(this, e, e + 3), He(this, e + 1, e + 2);
      return this;
    };
    T.prototype.swap64 = function () {
      let t = this.length;
      if (t % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let e = 0; e < t; e += 8)
        He(this, e, e + 7),
          He(this, e + 1, e + 6),
          He(this, e + 2, e + 5),
          He(this, e + 3, e + 4);
      return this;
    };
    T.prototype.toString = function () {
      let t = this.length;
      return t === 0
        ? ""
        : arguments.length === 0
          ? wo(this, 0, t)
          : Mu.apply(this, arguments);
    };
    T.prototype.toLocaleString = T.prototype.toString;
    T.prototype.equals = function (t) {
      if (!T.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t ? !0 : T.compare(this, t) === 0;
    };
    T.prototype.inspect = function () {
      let t = "",
        e = nr.INSPECT_MAX_BYTES;
      return (
        (t = this.toString("hex", 0, e)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > e && (t += " ... "),
        "<Buffer " + t + ">"
      );
    };
    ao && (T.prototype[ao] = T.prototype.inspect);
    T.prototype.compare = function (t, e, n, i, s) {
      if (
        (le(t, Uint8Array) && (t = T.from(t, t.offset, t.byteLength)),
        !T.isBuffer(t))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof t,
        );
      if (
        (e === void 0 && (e = 0),
        n === void 0 && (n = t ? t.length : 0),
        i === void 0 && (i = 0),
        s === void 0 && (s = this.length),
        e < 0 || n > t.length || i < 0 || s > this.length)
      )
        throw new RangeError("out of range index");
      if (i >= s && e >= n) return 0;
      if (i >= s) return -1;
      if (e >= n) return 1;
      if (((e >>>= 0), (n >>>= 0), (i >>>= 0), (s >>>= 0), this === t))
        return 0;
      let o = s - i,
        c = n - e,
        u = Math.min(o, c),
        y = this.slice(i, s),
        w = t.slice(e, n);
      for (let _ = 0; _ < u; ++_)
        if (y[_] !== w[_]) {
          (o = y[_]), (c = w[_]);
          break;
        }
      return o < c ? -1 : c < o ? 1 : 0;
    };
    function yo(r, t, e, n, i) {
      if (r.length === 0) return -1;
      if (
        (typeof e == "string"
          ? ((n = e), (e = 0))
          : e > 2147483647
            ? (e = 2147483647)
            : e < -2147483648 && (e = -2147483648),
        (e = +e),
        Ei(e) && (e = i ? 0 : r.length - 1),
        e < 0 && (e = r.length + e),
        e >= r.length)
      ) {
        if (i) return -1;
        e = r.length - 1;
      } else if (e < 0)
        if (i) e = 0;
        else return -1;
      if ((typeof t == "string" && (t = T.from(t, n)), T.isBuffer(t)))
        return t.length === 0 ? -1 : co(r, t, e, n, i);
      if (typeof t == "number")
        return (
          (t = t & 255),
          typeof Uint8Array.prototype.indexOf == "function"
            ? i
              ? Uint8Array.prototype.indexOf.call(r, t, e)
              : Uint8Array.prototype.lastIndexOf.call(r, t, e)
            : co(r, [t], e, n, i)
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    function co(r, t, e, n, i) {
      let s = 1,
        o = r.length,
        c = t.length;
      if (
        n !== void 0 &&
        ((n = String(n).toLowerCase()),
        n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")
      ) {
        if (r.length < 2 || t.length < 2) return -1;
        (s = 2), (o /= 2), (c /= 2), (e /= 2);
      }
      function u(w, _) {
        return s === 1 ? w[_] : w.readUInt16BE(_ * s);
      }
      let y;
      if (i) {
        let w = -1;
        for (y = e; y < o; y++)
          if (u(r, y) === u(t, w === -1 ? 0 : y - w)) {
            if ((w === -1 && (w = y), y - w + 1 === c)) return w * s;
          } else w !== -1 && (y -= y - w), (w = -1);
      } else
        for (e + c > o && (e = o - c), y = e; y >= 0; y--) {
          let w = !0;
          for (let _ = 0; _ < c; _++)
            if (u(r, y + _) !== u(t, _)) {
              w = !1;
              break;
            }
          if (w) return y;
        }
      return -1;
    }
    T.prototype.includes = function (t, e, n) {
      return this.indexOf(t, e, n) !== -1;
    };
    T.prototype.indexOf = function (t, e, n) {
      return yo(this, t, e, n, !0);
    };
    T.prototype.lastIndexOf = function (t, e, n) {
      return yo(this, t, e, n, !1);
    };
    function Cu(r, t, e, n) {
      e = Number(e) || 0;
      let i = r.length - e;
      n ? ((n = Number(n)), n > i && (n = i)) : (n = i);
      let s = t.length;
      n > s / 2 && (n = s / 2);
      let o;
      for (o = 0; o < n; ++o) {
        let c = parseInt(t.substr(o * 2, 2), 16);
        if (Ei(c)) return o;
        r[e + o] = c;
      }
      return o;
    }
    function ku(r, t, e, n) {
      return on(mi(t, r.length - e), r, e, n);
    }
    function $u(r, t, e, n) {
      return on(Xu(t), r, e, n);
    }
    function Vu(r, t, e, n) {
      return on(Ao(t), r, e, n);
    }
    function qu(r, t, e, n) {
      return on(Ju(t, r.length - e), r, e, n);
    }
    T.prototype.write = function (t, e, n, i) {
      if (e === void 0) (i = "utf8"), (n = this.length), (e = 0);
      else if (n === void 0 && typeof e == "string")
        (i = e), (n = this.length), (e = 0);
      else if (isFinite(e))
        (e = e >>> 0),
          isFinite(n)
            ? ((n = n >>> 0), i === void 0 && (i = "utf8"))
            : ((i = n), (n = void 0));
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported",
        );
      let s = this.length - e;
      if (
        ((n === void 0 || n > s) && (n = s),
        (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      i || (i = "utf8");
      let o = !1;
      for (;;)
        switch (i) {
          case "hex":
            return Cu(this, t, e, n);
          case "utf8":
          case "utf-8":
            return ku(this, t, e, n);
          case "ascii":
          case "latin1":
          case "binary":
            return $u(this, t, e, n);
          case "base64":
            return Vu(this, t, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return qu(this, t, e, n);
          default:
            if (o) throw new TypeError("Unknown encoding: " + i);
            (i = ("" + i).toLowerCase()), (o = !0);
        }
    };
    T.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    };
    function Lu(r, t, e) {
      return t === 0 && e === r.length
        ? yi.fromByteArray(r)
        : yi.fromByteArray(r.slice(t, e));
    }
    function wo(r, t, e) {
      e = Math.min(r.length, e);
      let n = [],
        i = t;
      for (; i < e; ) {
        let s = r[i],
          o = null,
          c = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
        if (i + c <= e) {
          let u, y, w, _;
          switch (c) {
            case 1:
              s < 128 && (o = s);
              break;
            case 2:
              (u = r[i + 1]),
                (u & 192) === 128 &&
                  ((_ = ((s & 31) << 6) | (u & 63)), _ > 127 && (o = _));
              break;
            case 3:
              (u = r[i + 1]),
                (y = r[i + 2]),
                (u & 192) === 128 &&
                  (y & 192) === 128 &&
                  ((_ = ((s & 15) << 12) | ((u & 63) << 6) | (y & 63)),
                  _ > 2047 && (_ < 55296 || _ > 57343) && (o = _));
              break;
            case 4:
              (u = r[i + 1]),
                (y = r[i + 2]),
                (w = r[i + 3]),
                (u & 192) === 128 &&
                  (y & 192) === 128 &&
                  (w & 192) === 128 &&
                  ((_ =
                    ((s & 15) << 18) |
                    ((u & 63) << 12) |
                    ((y & 63) << 6) |
                    (w & 63)),
                  _ > 65535 && _ < 1114112 && (o = _));
          }
        }
        o === null
          ? ((o = 65533), (c = 1))
          : o > 65535 &&
            ((o -= 65536),
            n.push(((o >>> 10) & 1023) | 55296),
            (o = 56320 | (o & 1023))),
          n.push(o),
          (i += c);
      }
      return Hu(n);
    }
    var uo = 4096;
    function Hu(r) {
      let t = r.length;
      if (t <= uo) return String.fromCharCode.apply(String, r);
      let e = "",
        n = 0;
      for (; n < t; )
        e += String.fromCharCode.apply(String, r.slice(n, (n += uo)));
      return e;
    }
    function Gu(r, t, e) {
      let n = "";
      e = Math.min(r.length, e);
      for (let i = t; i < e; ++i) n += String.fromCharCode(r[i] & 127);
      return n;
    }
    function Ku(r, t, e) {
      let n = "";
      e = Math.min(r.length, e);
      for (let i = t; i < e; ++i) n += String.fromCharCode(r[i]);
      return n;
    }
    function ju(r, t, e) {
      let n = r.length;
      (!t || t < 0) && (t = 0), (!e || e < 0 || e > n) && (e = n);
      let i = "";
      for (let s = t; s < e; ++s) i += Zu[r[s]];
      return i;
    }
    function Du(r, t, e) {
      let n = r.slice(t, e),
        i = "";
      for (let s = 0; s < n.length - 1; s += 2)
        i += String.fromCharCode(n[s] + n[s + 1] * 256);
      return i;
    }
    T.prototype.slice = function (t, e) {
      let n = this.length;
      (t = ~~t),
        (e = e === void 0 ? n : ~~e),
        t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
        e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
        e < t && (e = t);
      let i = this.subarray(t, e);
      return Object.setPrototypeOf(i, T.prototype), i;
    };
    function Rt(r, t, e) {
      if (r % 1 !== 0 || r < 0) throw new RangeError("offset is not uint");
      if (r + t > e)
        throw new RangeError("Trying to access beyond buffer length");
    }
    T.prototype.readUintLE = T.prototype.readUIntLE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Rt(t, e, this.length);
      let i = this[t],
        s = 1,
        o = 0;
      for (; ++o < e && (s *= 256); ) i += this[t + o] * s;
      return i;
    };
    T.prototype.readUintBE = T.prototype.readUIntBE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Rt(t, e, this.length);
      let i = this[t + --e],
        s = 1;
      for (; e > 0 && (s *= 256); ) i += this[t + --e] * s;
      return i;
    };
    T.prototype.readUint8 = T.prototype.readUInt8 = function (t, e) {
      return (t = t >>> 0), e || Rt(t, 1, this.length), this[t];
    };
    T.prototype.readUint16LE = T.prototype.readUInt16LE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 2, this.length), this[t] | (this[t + 1] << 8)
      );
    };
    T.prototype.readUint16BE = T.prototype.readUInt16BE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 2, this.length), (this[t] << 8) | this[t + 1]
      );
    };
    T.prototype.readUint32LE = T.prototype.readUInt32LE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Rt(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
          this[t + 3] * 16777216
      );
    };
    T.prototype.readUint32BE = T.prototype.readUInt32BE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Rt(t, 4, this.length),
        this[t] * 16777216 +
          ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      );
    };
    T.prototype.readBigUInt64LE = Se(function (t) {
      (t = t >>> 0), rr(t, "offset");
      let e = this[t],
        n = this[t + 7];
      (e === void 0 || n === void 0) && Ir(t, this.length - 8);
      let i =
          e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24,
        s = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + n * 2 ** 24;
      return BigInt(i) + (BigInt(s) << BigInt(32));
    });
    T.prototype.readBigUInt64BE = Se(function (t) {
      (t = t >>> 0), rr(t, "offset");
      let e = this[t],
        n = this[t + 7];
      (e === void 0 || n === void 0) && Ir(t, this.length - 8);
      let i =
          e * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t],
        s = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n;
      return (BigInt(i) << BigInt(32)) + BigInt(s);
    });
    T.prototype.readIntLE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Rt(t, e, this.length);
      let i = this[t],
        s = 1,
        o = 0;
      for (; ++o < e && (s *= 256); ) i += this[t + o] * s;
      return (s *= 128), i >= s && (i -= Math.pow(2, 8 * e)), i;
    };
    T.prototype.readIntBE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Rt(t, e, this.length);
      let i = e,
        s = 1,
        o = this[t + --i];
      for (; i > 0 && (s *= 256); ) o += this[t + --i] * s;
      return (s *= 128), o >= s && (o -= Math.pow(2, 8 * e)), o;
    };
    T.prototype.readInt8 = function (t, e) {
      return (
        (t = t >>> 0),
        e || Rt(t, 1, this.length),
        this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t]
      );
    };
    T.prototype.readInt16LE = function (t, e) {
      (t = t >>> 0), e || Rt(t, 2, this.length);
      let n = this[t] | (this[t + 1] << 8);
      return n & 32768 ? n | 4294901760 : n;
    };
    T.prototype.readInt16BE = function (t, e) {
      (t = t >>> 0), e || Rt(t, 2, this.length);
      let n = this[t + 1] | (this[t] << 8);
      return n & 32768 ? n | 4294901760 : n;
    };
    T.prototype.readInt32LE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Rt(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    };
    T.prototype.readInt32BE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Rt(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    };
    T.prototype.readBigInt64LE = Se(function (t) {
      (t = t >>> 0), rr(t, "offset");
      let e = this[t],
        n = this[t + 7];
      (e === void 0 || n === void 0) && Ir(t, this.length - 8);
      let i =
        this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (n << 24);
      return (
        (BigInt(i) << BigInt(32)) +
        BigInt(
          e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24,
        )
      );
    });
    T.prototype.readBigInt64BE = Se(function (t) {
      (t = t >>> 0), rr(t, "offset");
      let e = this[t],
        n = this[t + 7];
      (e === void 0 || n === void 0) && Ir(t, this.length - 8);
      let i = (e << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
      return (
        (BigInt(i) << BigInt(32)) +
        BigInt(
          this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n,
        )
      );
    });
    T.prototype.readFloatLE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 4, this.length), er.read(this, t, !0, 23, 4)
      );
    };
    T.prototype.readFloatBE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 4, this.length), er.read(this, t, !1, 23, 4)
      );
    };
    T.prototype.readDoubleLE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 8, this.length), er.read(this, t, !0, 52, 8)
      );
    };
    T.prototype.readDoubleBE = function (t, e) {
      return (
        (t = t >>> 0), e || Rt(t, 8, this.length), er.read(this, t, !1, 52, 8)
      );
    };
    function Lt(r, t, e, n, i, s) {
      if (!T.isBuffer(r))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > i || t < s)
        throw new RangeError('"value" argument is out of bounds');
      if (e + n > r.length) throw new RangeError("Index out of range");
    }
    T.prototype.writeUintLE = T.prototype.writeUIntLE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), (n = n >>> 0), !i)) {
        let c = Math.pow(2, 8 * n) - 1;
        Lt(this, t, e, n, c, 0);
      }
      let s = 1,
        o = 0;
      for (this[e] = t & 255; ++o < n && (s *= 256); )
        this[e + o] = (t / s) & 255;
      return e + n;
    };
    T.prototype.writeUintBE = T.prototype.writeUIntBE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), (n = n >>> 0), !i)) {
        let c = Math.pow(2, 8 * n) - 1;
        Lt(this, t, e, n, c, 0);
      }
      let s = n - 1,
        o = 1;
      for (this[e + s] = t & 255; --s >= 0 && (o *= 256); )
        this[e + s] = (t / o) & 255;
      return e + n;
    };
    T.prototype.writeUint8 = T.prototype.writeUInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 1, 255, 0),
        (this[e] = t & 255),
        e + 1
      );
    };
    T.prototype.writeUint16LE = T.prototype.writeUInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 2, 65535, 0),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    };
    T.prototype.writeUint16BE = T.prototype.writeUInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 2, 65535, 0),
        (this[e] = t >>> 8),
        (this[e + 1] = t & 255),
        e + 2
      );
    };
    T.prototype.writeUint32LE = T.prototype.writeUInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 4, 4294967295, 0),
        (this[e + 3] = t >>> 24),
        (this[e + 2] = t >>> 16),
        (this[e + 1] = t >>> 8),
        (this[e] = t & 255),
        e + 4
      );
    };
    T.prototype.writeUint32BE = T.prototype.writeUInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 4, 4294967295, 0),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = t & 255),
        e + 4
      );
    };
    function go(r, t, e, n, i) {
      Eo(t, n, i, r, e, 7);
      let s = Number(t & BigInt(4294967295));
      (r[e++] = s),
        (s = s >> 8),
        (r[e++] = s),
        (s = s >> 8),
        (r[e++] = s),
        (s = s >> 8),
        (r[e++] = s);
      let o = Number((t >> BigInt(32)) & BigInt(4294967295));
      return (
        (r[e++] = o),
        (o = o >> 8),
        (r[e++] = o),
        (o = o >> 8),
        (r[e++] = o),
        (o = o >> 8),
        (r[e++] = o),
        e
      );
    }
    function mo(r, t, e, n, i) {
      Eo(t, n, i, r, e, 7);
      let s = Number(t & BigInt(4294967295));
      (r[e + 7] = s),
        (s = s >> 8),
        (r[e + 6] = s),
        (s = s >> 8),
        (r[e + 5] = s),
        (s = s >> 8),
        (r[e + 4] = s);
      let o = Number((t >> BigInt(32)) & BigInt(4294967295));
      return (
        (r[e + 3] = o),
        (o = o >> 8),
        (r[e + 2] = o),
        (o = o >> 8),
        (r[e + 1] = o),
        (o = o >> 8),
        (r[e] = o),
        e + 8
      );
    }
    T.prototype.writeBigUInt64LE = Se(function (t, e = 0) {
      return go(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    T.prototype.writeBigUInt64BE = Se(function (t, e = 0) {
      return mo(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    T.prototype.writeIntLE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), !i)) {
        let u = Math.pow(2, 8 * n - 1);
        Lt(this, t, e, n, u - 1, -u);
      }
      let s = 0,
        o = 1,
        c = 0;
      for (this[e] = t & 255; ++s < n && (o *= 256); )
        t < 0 && c === 0 && this[e + s - 1] !== 0 && (c = 1),
          (this[e + s] = (((t / o) >> 0) - c) & 255);
      return e + n;
    };
    T.prototype.writeIntBE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), !i)) {
        let u = Math.pow(2, 8 * n - 1);
        Lt(this, t, e, n, u - 1, -u);
      }
      let s = n - 1,
        o = 1,
        c = 0;
      for (this[e + s] = t & 255; --s >= 0 && (o *= 256); )
        t < 0 && c === 0 && this[e + s + 1] !== 0 && (c = 1),
          (this[e + s] = (((t / o) >> 0) - c) & 255);
      return e + n;
    };
    T.prototype.writeInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 1, 127, -128),
        t < 0 && (t = 255 + t + 1),
        (this[e] = t & 255),
        e + 1
      );
    };
    T.prototype.writeInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 2, 32767, -32768),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    };
    T.prototype.writeInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 2, 32767, -32768),
        (this[e] = t >>> 8),
        (this[e + 1] = t & 255),
        e + 2
      );
    };
    T.prototype.writeInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 4, 2147483647, -2147483648),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        (this[e + 2] = t >>> 16),
        (this[e + 3] = t >>> 24),
        e + 4
      );
    };
    T.prototype.writeInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Lt(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = t & 255),
        e + 4
      );
    };
    T.prototype.writeBigInt64LE = Se(function (t, e = 0) {
      return go(
        this,
        t,
        e,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    });
    T.prototype.writeBigInt64BE = Se(function (t, e = 0) {
      return mo(
        this,
        t,
        e,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    });
    function xo(r, t, e, n, i, s) {
      if (e + n > r.length) throw new RangeError("Index out of range");
      if (e < 0) throw new RangeError("Index out of range");
    }
    function _o(r, t, e, n, i) {
      return (
        (t = +t),
        (e = e >>> 0),
        i || xo(r, t, e, 4, 34028234663852886e22, -34028234663852886e22),
        er.write(r, t, e, n, 23, 4),
        e + 4
      );
    }
    T.prototype.writeFloatLE = function (t, e, n) {
      return _o(this, t, e, !0, n);
    };
    T.prototype.writeFloatBE = function (t, e, n) {
      return _o(this, t, e, !1, n);
    };
    function bo(r, t, e, n, i) {
      return (
        (t = +t),
        (e = e >>> 0),
        i || xo(r, t, e, 8, 17976931348623157e292, -17976931348623157e292),
        er.write(r, t, e, n, 52, 8),
        e + 8
      );
    }
    T.prototype.writeDoubleLE = function (t, e, n) {
      return bo(this, t, e, !0, n);
    };
    T.prototype.writeDoubleBE = function (t, e, n) {
      return bo(this, t, e, !1, n);
    };
    T.prototype.copy = function (t, e, n, i) {
      if (!T.isBuffer(t)) throw new TypeError("argument should be a Buffer");
      if (
        (n || (n = 0),
        !i && i !== 0 && (i = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        i > 0 && i < n && (i = n),
        i === n || t.length === 0 || this.length === 0)
      )
        return 0;
      if (e < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("sourceEnd out of bounds");
      i > this.length && (i = this.length),
        t.length - e < i - n && (i = t.length - e + n);
      let s = i - n;
      return (
        this === t && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(e, n, i)
          : Uint8Array.prototype.set.call(t, this.subarray(n, i), e),
        s
      );
    };
    T.prototype.fill = function (t, e, n, i) {
      if (typeof t == "string") {
        if (
          (typeof e == "string"
            ? ((i = e), (e = 0), (n = this.length))
            : typeof n == "string" && ((i = n), (n = this.length)),
          i !== void 0 && typeof i != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !T.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (t.length === 1) {
          let o = t.charCodeAt(0);
          ((i === "utf8" && o < 128) || i === "latin1") && (t = o);
        }
      } else
        typeof t == "number"
          ? (t = t & 255)
          : typeof t == "boolean" && (t = Number(t));
      if (e < 0 || this.length < e || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= e) return this;
      (e = e >>> 0), (n = n === void 0 ? this.length : n >>> 0), t || (t = 0);
      let s;
      if (typeof t == "number") for (s = e; s < n; ++s) this[s] = t;
      else {
        let o = T.isBuffer(t) ? t : T.from(t, i),
          c = o.length;
        if (c === 0)
          throw new TypeError(
            'The value "' + t + '" is invalid for argument "value"',
          );
        for (s = 0; s < n - e; ++s) this[s + e] = o[s % c];
      }
      return this;
    };
    var tr = {};
    function bi(r, t, e) {
      tr[r] = class extends e {
        constructor() {
          super(),
            Object.defineProperty(this, "message", {
              value: t.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${r}]`),
            this.stack,
            delete this.name;
        }
        get code() {
          return r;
        }
        set code(i) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0,
          });
        }
        toString() {
          return `${this.name} [${r}]: ${this.message}`;
        }
      };
    }
    bi(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function (r) {
        return r
          ? `${r} is outside of buffer bounds`
          : "Attempt to access memory outside buffer bounds";
      },
      RangeError,
    );
    bi(
      "ERR_INVALID_ARG_TYPE",
      function (r, t) {
        return `The "${r}" argument must be of type number. Received type ${typeof t}`;
      },
      TypeError,
    );
    bi(
      "ERR_OUT_OF_RANGE",
      function (r, t, e) {
        let n = `The value of "${r}" is out of range.`,
          i = e;
        return (
          Number.isInteger(e) && Math.abs(e) > 2 ** 32
            ? (i = fo(String(e)))
            : typeof e == "bigint" &&
              ((i = String(e)),
              (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) &&
                (i = fo(i)),
              (i += "n")),
          (n += ` It must be ${t}. Received ${i}`),
          n
        );
      },
      RangeError,
    );
    function fo(r) {
      let t = "",
        e = r.length,
        n = r[0] === "-" ? 1 : 0;
      for (; e >= n + 4; e -= 3) t = `_${r.slice(e - 3, e)}${t}`;
      return `${r.slice(0, e)}${t}`;
    }
    function Wu(r, t, e) {
      rr(t, "offset"),
        (r[t] === void 0 || r[t + e] === void 0) && Ir(t, r.length - (e + 1));
    }
    function Eo(r, t, e, n, i, s) {
      if (r > e || r < t) {
        let o = typeof t == "bigint" ? "n" : "",
          c;
        throw (
          (s > 3
            ? t === 0 || t === BigInt(0)
              ? (c = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}`)
              : (c = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}`)
            : (c = `>= ${t}${o} and <= ${e}${o}`),
          new tr.ERR_OUT_OF_RANGE("value", c, r))
        );
      }
      Wu(n, i, s);
    }
    function rr(r, t) {
      if (typeof r != "number")
        throw new tr.ERR_INVALID_ARG_TYPE(t, "number", r);
    }
    function Ir(r, t, e) {
      throw Math.floor(r) !== r
        ? (rr(r, e), new tr.ERR_OUT_OF_RANGE(e || "offset", "an integer", r))
        : t < 0
          ? new tr.ERR_BUFFER_OUT_OF_BOUNDS()
          : new tr.ERR_OUT_OF_RANGE(
              e || "offset",
              `>= ${e ? 1 : 0} and <= ${t}`,
              r,
            );
    }
    var zu = /[^+/0-9A-Za-z-_]/g;
    function Yu(r) {
      if (((r = r.split("=")[0]), (r = r.trim().replace(zu, "")), r.length < 2))
        return "";
      for (; r.length % 4 !== 0; ) r = r + "=";
      return r;
    }
    function mi(r, t) {
      t = t || 1 / 0;
      let e,
        n = r.length,
        i = null,
        s = [];
      for (let o = 0; o < n; ++o) {
        if (((e = r.charCodeAt(o)), e > 55295 && e < 57344)) {
          if (!i) {
            if (e > 56319) {
              (t -= 3) > -1 && s.push(239, 191, 189);
              continue;
            } else if (o + 1 === n) {
              (t -= 3) > -1 && s.push(239, 191, 189);
              continue;
            }
            i = e;
            continue;
          }
          if (e < 56320) {
            (t -= 3) > -1 && s.push(239, 191, 189), (i = e);
            continue;
          }
          e = (((i - 55296) << 10) | (e - 56320)) + 65536;
        } else i && (t -= 3) > -1 && s.push(239, 191, 189);
        if (((i = null), e < 128)) {
          if ((t -= 1) < 0) break;
          s.push(e);
        } else if (e < 2048) {
          if ((t -= 2) < 0) break;
          s.push((e >> 6) | 192, (e & 63) | 128);
        } else if (e < 65536) {
          if ((t -= 3) < 0) break;
          s.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (e & 63) | 128);
        } else if (e < 1114112) {
          if ((t -= 4) < 0) break;
          s.push(
            (e >> 18) | 240,
            ((e >> 12) & 63) | 128,
            ((e >> 6) & 63) | 128,
            (e & 63) | 128,
          );
        } else throw new Error("Invalid code point");
      }
      return s;
    }
    function Xu(r) {
      let t = [];
      for (let e = 0; e < r.length; ++e) t.push(r.charCodeAt(e) & 255);
      return t;
    }
    function Ju(r, t) {
      let e,
        n,
        i,
        s = [];
      for (let o = 0; o < r.length && !((t -= 2) < 0); ++o)
        (e = r.charCodeAt(o)),
          (n = e >> 8),
          (i = e % 256),
          s.push(i),
          s.push(n);
      return s;
    }
    function Ao(r) {
      return yi.toByteArray(Yu(r));
    }
    function on(r, t, e, n) {
      let i;
      for (i = 0; i < n && !(i + e >= t.length || i >= r.length); ++i)
        t[i + e] = r[i];
      return i;
    }
    function le(r, t) {
      return (
        r instanceof t ||
        (r != null &&
          r.constructor != null &&
          r.constructor.name != null &&
          r.constructor.name === t.name)
      );
    }
    function Ei(r) {
      return r !== r;
    }
    var Zu = (function () {
      let r = "0123456789abcdef",
        t = new Array(256);
      for (let e = 0; e < 16; ++e) {
        let n = e * 16;
        for (let i = 0; i < 16; ++i) t[n + i] = r[e] + r[i];
      }
      return t;
    })();
    function Se(r) {
      return typeof BigInt > "u" ? Qu : r;
    }
    function Qu() {
      throw new Error("BigInt not supported");
    }
  });
  function To(r) {
    let t = 0,
      e = 0,
      n = "";
    function i(s) {
      return (
        t < 0 ? (e |= s >> -t) : (e = (s << t) & 248),
        t > 3 ? ((t -= 8), 1) : (t < 4 && ((n += an[e >> 3]), (t += 5)), 0)
      );
    }
    for (let s = 0; s < r.length; ) s += i(r[s]);
    return n + (t < 0 ? an[e >> 3] : "");
  }
  function Bo(r) {
    let t = 0,
      e = 0,
      n = new Uint8Array(((r.length * 4) / 3) | 0),
      i = 0;
    function s(o) {
      let c = ir[o.toLowerCase()];
      if (c === void 0)
        throw new Error(`Invalid character: ${JSON.stringify(o)}`);
      (c <<= 3),
        (e |= c >>> t),
        (t += 5),
        t >= 8 &&
          ((n[i++] = e),
          (t -= 8),
          t > 0 ? (e = (c << (5 - t)) & 255) : (e = 0));
    }
    for (let o of r) s(o);
    return n.slice(0, i);
  }
  var an,
    ir,
    So = ut(() => {
      (an = "abcdefghijklmnopqrstuvwxyz234567"), (ir = Object.create(null));
      for (let r = 0; r < an.length; r++) ir[an[r]] = r;
      ir[0] = ir.o;
      ir[1] = ir.i;
    });
  function Io(r) {
    let t = new Uint8Array(r),
      e = -1;
    for (let n = 0; n < t.length; n++) {
      let s = (t[n] ^ e) & 255;
      e = tf[s] ^ (e >>> 8);
    }
    return (e ^ -1) >>> 0;
  }
  var tf,
    No = ut(() => {
      tf = new Uint32Array([
        0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615,
        3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864,
        162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666,
        4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639,
        325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465,
        4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242,
        1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684,
        3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665,
        651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731,
        3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812,
        795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534,
        2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059,
        2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813,
        2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878,
        1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704,
        2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405,
        1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311,
        2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856,
        1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306,
        3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015,
        1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873,
        3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842,
        3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804,
        225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377,
        4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355,
        426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852,
        4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558,
        953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859,
        3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669,
        829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366,
        3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608,
        733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221,
        2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151,
        1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112,
        2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610,
        1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567,
        2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745,
        1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938,
        2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836,
        1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897,
        3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203,
        1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724,
        3020668471, 3272380065, 1510334235, 755167117,
      ]);
    });
  function ef(r) {
    return (
      r instanceof Uint8Array ||
      (r != null && typeof r == "object" && r.constructor.name === "Uint8Array")
    );
  }
  function cn(r, ...t) {
    if (!ef(r)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(r.length))
      throw new Error(
        `Uint8Array expected of length ${t}, not of length=${r.length}`,
      );
  }
  function vi(r, t = !0) {
    if (r.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && r.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function Uo(r, t) {
    cn(r);
    let e = t.outputLen;
    if (r.length < e)
      throw new Error(
        `digestInto() expects output buffer of length at least ${e}`,
      );
  }
  var Ti = ut(() => {});
  var un,
    Ro = ut(() => {
      un =
        typeof globalThis == "object" && "crypto" in globalThis
          ? globalThis.crypto
          : void 0;
    });
  function Bi(r) {
    if (typeof r != "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
    return new Uint8Array(new TextEncoder().encode(r));
  }
  function Si(r) {
    return typeof r == "string" && (r = Bi(r)), cn(r), r;
  }
  function Fo(...r) {
    let t = 0;
    for (let n = 0; n < r.length; n++) {
      let i = r[n];
      cn(i), (t += i.length);
    }
    let e = new Uint8Array(t);
    for (let n = 0, i = 0; n < r.length; n++) {
      let s = r[n];
      e.set(s, i), (i += s.length);
    }
    return e;
  }
  function Nr(r) {
    let t = (n) => r().update(Si(n)).digest(),
      e = r();
    return (
      (t.outputLen = e.outputLen),
      (t.blockLen = e.blockLen),
      (t.create = () => r()),
      t
    );
  }
  function Oo(r = 32) {
    if (un && typeof un.getRandomValues == "function")
      return un.getRandomValues(new Uint8Array(r));
    throw new Error("crypto.getRandomValues must be defined");
  }
  var ln,
    ne,
    td,
    fn,
    ed,
    Ur = ut(() => {
      Ro();
      Ti();
      (ln = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength)),
        (ne = (r, t) => (r << (32 - t)) | (r >>> t)),
        (td = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68);
      (fn = class {
        clone() {
          return this._cloneInto();
        }
      }),
        (ed = {}.toString);
    });
  function rf(r, t, e, n) {
    if (typeof r.setBigUint64 == "function") return r.setBigUint64(t, e, n);
    let i = BigInt(32),
      s = BigInt(4294967295),
      o = Number((e >> i) & s),
      c = Number(e & s),
      u = n ? 4 : 0,
      y = n ? 0 : 4;
    r.setUint32(t + u, o, n), r.setUint32(t + y, c, n);
  }
  var Po,
    Mo,
    sr,
    Ii = ut(() => {
      Ti();
      Ur();
      (Po = (r, t, e) => (r & t) ^ (~r & e)),
        (Mo = (r, t, e) => (r & t) ^ (r & e) ^ (t & e)),
        (sr = class extends fn {
          constructor(t, e, n, i) {
            super(),
              (this.blockLen = t),
              (this.outputLen = e),
              (this.padOffset = n),
              (this.isLE = i),
              (this.finished = !1),
              (this.length = 0),
              (this.pos = 0),
              (this.destroyed = !1),
              (this.buffer = new Uint8Array(t)),
              (this.view = ln(this.buffer));
          }
          update(t) {
            vi(this);
            let { view: e, buffer: n, blockLen: i } = this;
            t = Si(t);
            let s = t.length;
            for (let o = 0; o < s; ) {
              let c = Math.min(i - this.pos, s - o);
              if (c === i) {
                let u = ln(t);
                for (; i <= s - o; o += i) this.process(u, o);
                continue;
              }
              n.set(t.subarray(o, o + c), this.pos),
                (this.pos += c),
                (o += c),
                this.pos === i && (this.process(e, 0), (this.pos = 0));
            }
            return (this.length += t.length), this.roundClean(), this;
          }
          digestInto(t) {
            vi(this), Uo(t, this), (this.finished = !0);
            let { buffer: e, view: n, blockLen: i, isLE: s } = this,
              { pos: o } = this;
            (e[o++] = 128),
              this.buffer.subarray(o).fill(0),
              this.padOffset > i - o && (this.process(n, 0), (o = 0));
            for (let _ = o; _ < i; _++) e[_] = 0;
            rf(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
            let c = ln(t),
              u = this.outputLen;
            if (u % 4)
              throw new Error("_sha2: outputLen should be aligned to 32bit");
            let y = u / 4,
              w = this.get();
            if (y > w.length)
              throw new Error("_sha2: outputLen bigger than state");
            for (let _ = 0; _ < y; _++) c.setUint32(4 * _, w[_], s);
          }
          digest() {
            let { buffer: t, outputLen: e } = this;
            this.digestInto(t);
            let n = t.slice(0, e);
            return this.destroy(), n;
          }
          _cloneInto(t) {
            t || (t = new this.constructor()), t.set(...this.get());
            let {
              blockLen: e,
              buffer: n,
              length: i,
              finished: s,
              destroyed: o,
              pos: c,
            } = this;
            return (
              (t.length = i),
              (t.pos = c),
              (t.finished = s),
              (t.destroyed = o),
              i % e && t.buffer.set(n),
              t
            );
          }
        });
    });
  var nf,
    Ie,
    Ne,
    hn,
    Ni,
    Co,
    ko,
    Ui = ut(() => {
      Ii();
      Ur();
      (nf = new Uint32Array([
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
      ])),
        (Ie = new Uint32Array([
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225,
        ])),
        (Ne = new Uint32Array(64)),
        (hn = class extends sr {
          constructor() {
            super(64, 32, 8, !1),
              (this.A = Ie[0] | 0),
              (this.B = Ie[1] | 0),
              (this.C = Ie[2] | 0),
              (this.D = Ie[3] | 0),
              (this.E = Ie[4] | 0),
              (this.F = Ie[5] | 0),
              (this.G = Ie[6] | 0),
              (this.H = Ie[7] | 0);
          }
          get() {
            let { A: t, B: e, C: n, D: i, E: s, F: o, G: c, H: u } = this;
            return [t, e, n, i, s, o, c, u];
          }
          set(t, e, n, i, s, o, c, u) {
            (this.A = t | 0),
              (this.B = e | 0),
              (this.C = n | 0),
              (this.D = i | 0),
              (this.E = s | 0),
              (this.F = o | 0),
              (this.G = c | 0),
              (this.H = u | 0);
          }
          process(t, e) {
            for (let _ = 0; _ < 16; _++, e += 4) Ne[_] = t.getUint32(e, !1);
            for (let _ = 16; _ < 64; _++) {
              let N = Ne[_ - 15],
                q = Ne[_ - 2],
                P = ne(N, 7) ^ ne(N, 18) ^ (N >>> 3),
                G = ne(q, 17) ^ ne(q, 19) ^ (q >>> 10);
              Ne[_] = (G + Ne[_ - 7] + P + Ne[_ - 16]) | 0;
            }
            let { A: n, B: i, C: s, D: o, E: c, F: u, G: y, H: w } = this;
            for (let _ = 0; _ < 64; _++) {
              let N = ne(c, 6) ^ ne(c, 11) ^ ne(c, 25),
                q = (w + N + Po(c, u, y) + nf[_] + Ne[_]) | 0,
                G = ((ne(n, 2) ^ ne(n, 13) ^ ne(n, 22)) + Mo(n, i, s)) | 0;
              (w = y),
                (y = u),
                (u = c),
                (c = (o + q) | 0),
                (o = s),
                (s = i),
                (i = n),
                (n = (q + G) | 0);
            }
            (n = (n + this.A) | 0),
              (i = (i + this.B) | 0),
              (s = (s + this.C) | 0),
              (o = (o + this.D) | 0),
              (c = (c + this.E) | 0),
              (u = (u + this.F) | 0),
              (y = (y + this.G) | 0),
              (w = (w + this.H) | 0),
              this.set(n, i, s, o, c, u, y, w);
          }
          roundClean() {
            Ne.fill(0);
          }
          destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
          }
        }),
        (Ni = class extends hn {
          constructor() {
            super(),
              (this.A = -1056596264),
              (this.B = 914150663),
              (this.C = 812702999),
              (this.D = -150054599),
              (this.E = -4191439),
              (this.F = 1750603025),
              (this.G = 1694076839),
              (this.H = -1090891868),
              (this.outputLen = 28);
          }
        }),
        (Co = Nr(() => new hn())),
        (ko = Nr(() => new Ni()));
    });
  function $o(r) {
    return ko.create().update(new Uint8Array(r)).digest();
  }
  var Vo = ut(() => {
    Ui();
  });
  var dn,
    sf,
    qo,
    of,
    af,
    cf,
    vt,
    Zt = ut(() => {
      So();
      No();
      Vo();
      (dn = "__principal__"),
        (sf = 2),
        (qo = 4),
        (of = "aaaaa-aa"),
        (af = (r) => {
          var t;
          return new Uint8Array(
            ((t = r.match(/.{1,2}/g)) !== null && t !== void 0 ? t : []).map(
              (e) => parseInt(e, 16),
            ),
          );
        }),
        (cf = (r) =>
          r.reduce((t, e) => t + e.toString(16).padStart(2, "0"), "")),
        (vt = class r {
          constructor(t) {
            (this._arr = t), (this._isPrincipal = !0);
          }
          static anonymous() {
            return new this(new Uint8Array([qo]));
          }
          static managementCanister() {
            return this.fromHex(of);
          }
          static selfAuthenticating(t) {
            let e = $o(t);
            return new this(new Uint8Array([...e, sf]));
          }
          static from(t) {
            if (typeof t == "string") return r.fromText(t);
            if (Object.getPrototypeOf(t) === Uint8Array.prototype)
              return new r(t);
            if (typeof t == "object" && t !== null && t._isPrincipal === !0)
              return new r(t._arr);
            throw new Error(
              `Impossible to convert ${JSON.stringify(t)} to Principal.`,
            );
          }
          static fromHex(t) {
            return new this(af(t));
          }
          static fromText(t) {
            let e = t;
            if (t.includes(dn)) {
              let o = JSON.parse(t);
              dn in o && (e = o[dn]);
            }
            let n = e.toLowerCase().replace(/-/g, ""),
              i = Bo(n);
            i = i.slice(4, i.length);
            let s = new this(i);
            if (s.toText() !== e)
              throw new Error(
                `Principal "${s.toText()}" does not have a valid checksum (original value "${e}" may not be a valid Principal ID).`,
              );
            return s;
          }
          static fromUint8Array(t) {
            return new this(t);
          }
          isAnonymous() {
            return this._arr.byteLength === 1 && this._arr[0] === qo;
          }
          toUint8Array() {
            return this._arr;
          }
          toHex() {
            return cf(this._arr).toUpperCase();
          }
          toText() {
            let t = new ArrayBuffer(4);
            new DataView(t).setUint32(0, Io(this._arr));
            let n = new Uint8Array(t),
              i = Uint8Array.from(this._arr),
              s = new Uint8Array([...n, ...i]),
              c = To(s).match(/.{1,5}/g);
            if (!c) throw new Error();
            return c.join("-");
          }
          toString() {
            return this.toText();
          }
          toJSON() {
            return { [dn]: this.toText() };
          }
          compareTo(t) {
            for (
              let e = 0;
              e < Math.min(this._arr.length, t._arr.length);
              e++
            ) {
              if (this._arr[e] < t._arr[e]) return "lt";
              if (this._arr[e] > t._arr[e]) return "gt";
            }
            return this._arr.length < t._arr.length
              ? "lt"
              : this._arr.length > t._arr.length
                ? "gt"
                : "eq";
          }
          ltEq(t) {
            let e = this.compareTo(t);
            return e == "lt" || e == "eq";
          }
          gtEq(t) {
            let e = this.compareTo(t);
            return e == "gt" || e == "eq";
          }
        });
    });
  var Qt,
    or = ut(() => {
      Qt = class r extends Error {
        constructor(t) {
          super(t),
            (this.message = t),
            Object.setPrototypeOf(this, r.prototype);
        }
      };
    });
  function Fi(...r) {
    let t = new Uint8Array(r.reduce((n, i) => n + i.byteLength, 0)),
      e = 0;
    for (let n of r) t.set(new Uint8Array(n), e), (e += n.byteLength);
    return t;
  }
  function Ri(r) {
    return new DataView(r.buffer, r.byteOffset, r.byteLength).buffer;
  }
  function pn(r) {
    return r instanceof Uint8Array
      ? Ri(r)
      : r instanceof ArrayBuffer
        ? r
        : Array.isArray(r)
          ? Ri(new Uint8Array(r))
          : "buffer" in r
            ? pn(r.buffer)
            : Ri(new Uint8Array(r));
  }
  var Ue,
    yn = ut(() => {
      Ue = class {
        constructor(t, e = t?.byteLength || 0) {
          (this._buffer = pn(t || new ArrayBuffer(0))),
            (this._view = new Uint8Array(this._buffer, 0, e));
        }
        get buffer() {
          return pn(this._view.slice());
        }
        get byteLength() {
          return this._view.byteLength;
        }
        read(t) {
          let e = this._view.subarray(0, t);
          return (this._view = this._view.subarray(t)), e.slice().buffer;
        }
        readUint8() {
          let t = this._view[0];
          return (this._view = this._view.subarray(1)), t;
        }
        write(t) {
          let e = new Uint8Array(t),
            n = this._view.byteLength;
          this._view.byteOffset + this._view.byteLength + e.byteLength >=
          this._buffer.byteLength
            ? this.alloc(e.byteLength)
            : (this._view = new Uint8Array(
                this._buffer,
                this._view.byteOffset,
                this._view.byteLength + e.byteLength,
              )),
            this._view.set(e, n);
        }
        get end() {
          return this._view.byteLength === 0;
        }
        alloc(t) {
          let e = new ArrayBuffer(((this._buffer.byteLength + t) * 1.2) | 0),
            n = new Uint8Array(e, 0, this._view.byteLength + t);
          n.set(this._view), (this._buffer = e), (this._view = n);
        }
      };
    });
  var Oi = ut(() => {});
  function Lo() {
    throw new Error("unexpected end of buffer");
  }
  function Rr(r, t) {
    return r.byteLength < t && Lo(), r.read(t);
  }
  function ar(r) {
    let t = r.readUint8();
    return t === void 0 && Lo(), t;
  }
  function Re(r) {
    if ((typeof r == "number" && (r = BigInt(r)), r < BigInt(0)))
      throw new Error("Cannot leb encode negative values.");
    let t = (r === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(r)))) + 1,
      e = new Ue(new ArrayBuffer(t), 0);
    for (;;) {
      let n = Number(r & BigInt(127));
      if (((r /= BigInt(128)), r === BigInt(0))) {
        e.write(new Uint8Array([n]));
        break;
      } else e.write(new Uint8Array([n | 128]));
    }
    return e.buffer;
  }
  function cr(r) {
    let t = BigInt(1),
      e = BigInt(0),
      n;
    do (n = ar(r)), (e += BigInt(n & 127).valueOf() * t), (t *= BigInt(128));
    while (n >= 128);
    return e;
  }
  function Kt(r) {
    typeof r == "number" && (r = BigInt(r));
    let t = r < BigInt(0);
    t && (r = -r - BigInt(1));
    let e = (r === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(r)))) + 1,
      n = new Ue(new ArrayBuffer(e), 0);
    for (;;) {
      let s = i(r);
      if (
        ((r /= BigInt(128)),
        (t && r === BigInt(0) && s & 64) ||
          (!t && r === BigInt(0) && !(s & 64)))
      ) {
        n.write(new Uint8Array([s]));
        break;
      } else n.write(new Uint8Array([s | 128]));
    }
    function i(s) {
      let o = s % BigInt(128);
      return Number(t ? BigInt(128) - o - BigInt(1) : o);
    }
    return n.buffer;
  }
  function Ho(r) {
    let t = new Uint8Array(r.buffer),
      e = 0;
    for (; e < t.byteLength; e++)
      if (t[e] < 128) {
        if (!(t[e] & 64)) return cr(r);
        break;
      }
    let n = new Uint8Array(Rr(r, e + 1)),
      i = BigInt(0);
    for (let s = n.byteLength - 1; s >= 0; s--)
      i = i * BigInt(128) + BigInt(128 - (n[s] & 127) - 1);
    return -i - BigInt(1);
  }
  function Go(r, t) {
    if (BigInt(r) < BigInt(0)) throw new Error("Cannot write negative values.");
    return Pi(r, t);
  }
  function Pi(r, t) {
    r = BigInt(r);
    let e = new Ue(new ArrayBuffer(Math.min(1, t)), 0),
      n = 0,
      i = BigInt(256),
      s = BigInt(0),
      o = Number(r % i);
    for (e.write(new Uint8Array([o])); ++n < t; )
      r < 0 && s === BigInt(0) && o !== 0 && (s = BigInt(1)),
        (o = Number((r / i - s) % BigInt(256))),
        e.write(new Uint8Array([o])),
        (i *= BigInt(256));
    return e.buffer;
  }
  function Mi(r, t) {
    let e = BigInt(ar(r)),
      n = BigInt(1),
      i = 0;
    for (; ++i < t; ) {
      n *= BigInt(256);
      let s = BigInt(ar(r));
      e = e + n * s;
    }
    return e;
  }
  function Ko(r, t) {
    let e = Mi(r, t),
      n = BigInt(2) ** (BigInt(8) * BigInt(t - 1) + BigInt(7));
    return e >= n && (e -= n * BigInt(2)), e;
  }
  var Ci = ut(() => {
    yn();
  });
  function wn(r) {
    let t = BigInt(r);
    if (r < 0) throw new RangeError("Input must be non-negative");
    return BigInt(1) << t;
  }
  var jo = ut(() => {});
  function uf(r) {
    if (ar(r) !== 1) throw new Error("Cannot decode principal");
    let e = Number(cr(r));
    return vt.fromUint8Array(new Uint8Array(Rr(r, e)));
  }
  function Dt(r) {
    let t = JSON.stringify(r, (e, n) =>
      typeof n == "bigint" ? `BigInt(${n})` : n,
    );
    return t && t.length > Do ? t.substring(0, Do - 3) + "..." : t;
  }
  var Do,
    Fr,
    jt,
    ki,
    $i,
    Vi,
    qi,
    Li,
    Hi,
    Gi,
    Ki,
    ji,
    gn,
    ur,
    fr,
    Or,
    Di,
    Sd,
    Id,
    Nd,
    Ud,
    Rd,
    Fd,
    Od,
    Pd,
    Md,
    Cd,
    kd,
    $d,
    Vd,
    qd,
    Ld,
    Hd,
    Gd,
    Kd,
    jd,
    zi = ut(() => {
      Zt();
      yn();
      Oi();
      Ci();
      jo();
      (Do = 400),
        (Fr = class {
          display() {
            return this.name;
          }
          valueToString(t) {
            return Dt(t);
          }
          buildTypeTable(t) {
            t.has(this) || this._buildTypeTableImpl(t);
          }
        }),
        (jt = class extends Fr {
          checkType(t) {
            if (this.name !== t.name)
              throw new Error(
                `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
              );
            return t;
          }
          _buildTypeTableImpl(t) {}
        }),
        (ki = class extends Fr {
          checkType(t) {
            if (t instanceof Or) {
              let e = t.getType();
              if (typeof e > "u")
                throw new Error("type mismatch with uninitialized type");
              return e;
            }
            throw new Error(
              `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
            );
          }
          encodeType(t) {
            return t.indexOf(this.name);
          }
        }),
        ($i = class extends jt {
          accept(t, e) {
            return t.visitEmpty(this, e);
          }
          covariant(t) {
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue() {
            throw new Error("Empty cannot appear as a function argument");
          }
          valueToString() {
            throw new Error("Empty cannot appear as a value");
          }
          encodeType() {
            return Kt(-17);
          }
          decodeValue() {
            throw new Error("Empty cannot appear as an output");
          }
          get name() {
            return "empty";
          }
        }),
        (Vi = class extends Fr {
          checkType(t) {
            throw new Error("Method not implemented for unknown.");
          }
          accept(t, e) {
            throw t.visitType(this, e);
          }
          covariant(t) {
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue() {
            throw new Error("Unknown cannot appear as a function argument");
          }
          valueToString() {
            throw new Error("Unknown cannot appear as a value");
          }
          encodeType() {
            throw new Error("Unknown cannot be serialized");
          }
          decodeValue(t, e) {
            let n = e.decodeValue(t, e);
            Object(n) !== n && (n = Object(n));
            let i;
            return (
              e instanceof Or ? (i = () => e.getType()) : (i = () => e),
              Object.defineProperty(n, "type", {
                value: i,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
              n
            );
          }
          _buildTypeTableImpl() {
            throw new Error("Unknown cannot be serialized");
          }
          get name() {
            return "Unknown";
          }
        }),
        (qi = class extends jt {
          accept(t, e) {
            return t.visitBool(this, e);
          }
          covariant(t) {
            if (typeof t == "boolean") return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            return new Uint8Array([t ? 1 : 0]);
          }
          encodeType() {
            return Kt(-2);
          }
          decodeValue(t, e) {
            switch ((this.checkType(e), ar(t))) {
              case 0:
                return !1;
              case 1:
                return !0;
              default:
                throw new Error("Boolean value out of range");
            }
          }
          get name() {
            return "bool";
          }
        }),
        (Li = class extends jt {
          accept(t, e) {
            return t.visitNull(this, e);
          }
          covariant(t) {
            if (t === null) return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue() {
            return new ArrayBuffer(0);
          }
          encodeType() {
            return Kt(-1);
          }
          decodeValue(t, e) {
            return this.checkType(e), null;
          }
          get name() {
            return "null";
          }
        }),
        (Hi = class extends jt {
          accept(t, e) {
            return t.visitReserved(this, e);
          }
          covariant(t) {
            return !0;
          }
          encodeValue() {
            return new ArrayBuffer(0);
          }
          encodeType() {
            return Kt(-16);
          }
          decodeValue(t, e) {
            return e.name !== this.name && e.decodeValue(t, e), null;
          }
          get name() {
            return "reserved";
          }
        }),
        (Gi = class extends jt {
          accept(t, e) {
            return t.visitText(this, e);
          }
          covariant(t) {
            if (typeof t == "string") return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            let e = new TextEncoder().encode(t),
              n = Re(e.byteLength);
            return Fi(n, e);
          }
          encodeType() {
            return Kt(-15);
          }
          decodeValue(t, e) {
            this.checkType(e);
            let n = cr(t),
              i = Rr(t, Number(n));
            return new TextDecoder("utf8", { fatal: !0 }).decode(i);
          }
          get name() {
            return "text";
          }
          valueToString(t) {
            return '"' + t + '"';
          }
        }),
        (Ki = class extends jt {
          accept(t, e) {
            return t.visitInt(this, e);
          }
          covariant(t) {
            if (typeof t == "bigint" || Number.isInteger(t)) return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            return Kt(t);
          }
          encodeType() {
            return Kt(-4);
          }
          decodeValue(t, e) {
            return this.checkType(e), Ho(t);
          }
          get name() {
            return "int";
          }
          valueToString(t) {
            return t.toString();
          }
        }),
        (ji = class extends jt {
          accept(t, e) {
            return t.visitNat(this, e);
          }
          covariant(t) {
            if (
              (typeof t == "bigint" && t >= BigInt(0)) ||
              (Number.isInteger(t) && t >= 0)
            )
              return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            return Re(t);
          }
          encodeType() {
            return Kt(-3);
          }
          decodeValue(t, e) {
            return this.checkType(e), cr(t);
          }
          get name() {
            return "nat";
          }
          valueToString(t) {
            return t.toString();
          }
        }),
        (gn = class extends jt {
          constructor(t) {
            if ((super(), (this._bits = t), t !== 32 && t !== 64))
              throw new Error("not a valid float type");
          }
          accept(t, e) {
            return t.visitFloat(this, e);
          }
          covariant(t) {
            if (typeof t == "number" || t instanceof Number) return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            let e = new ArrayBuffer(this._bits / 8),
              n = new DataView(e);
            return (
              this._bits === 32
                ? n.setFloat32(0, t, !0)
                : n.setFloat64(0, t, !0),
              e
            );
          }
          encodeType() {
            let t = this._bits === 32 ? -13 : -14;
            return Kt(t);
          }
          decodeValue(t, e) {
            this.checkType(e);
            let n = Rr(t, this._bits / 8),
              i = new DataView(n);
            return this._bits === 32
              ? i.getFloat32(0, !0)
              : i.getFloat64(0, !0);
          }
          get name() {
            return "float" + this._bits;
          }
          valueToString(t) {
            return t.toString();
          }
        }),
        (ur = class extends jt {
          constructor(t) {
            super(), (this._bits = t);
          }
          accept(t, e) {
            return t.visitFixedInt(this, e);
          }
          covariant(t) {
            let e = wn(this._bits - 1) * BigInt(-1),
              n = wn(this._bits - 1) - BigInt(1),
              i = !1;
            if (typeof t == "bigint") i = t >= e && t <= n;
            else if (Number.isInteger(t)) {
              let s = BigInt(t);
              i = s >= e && s <= n;
            } else i = !1;
            if (i) return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            return Pi(t, this._bits / 8);
          }
          encodeType() {
            let t = Math.log2(this._bits) - 3;
            return Kt(-9 - t);
          }
          decodeValue(t, e) {
            this.checkType(e);
            let n = Ko(t, this._bits / 8);
            return this._bits <= 32 ? Number(n) : n;
          }
          get name() {
            return `int${this._bits}`;
          }
          valueToString(t) {
            return t.toString();
          }
        }),
        (fr = class extends jt {
          constructor(t) {
            super(), (this._bits = t);
          }
          accept(t, e) {
            return t.visitFixedNat(this, e);
          }
          covariant(t) {
            let e = wn(this._bits),
              n = !1;
            if (
              (typeof t == "bigint" && t >= BigInt(0)
                ? (n = t < e)
                : Number.isInteger(t) && t >= 0
                  ? (n = BigInt(t) < e)
                  : (n = !1),
              n)
            )
              return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            return Go(t, this._bits / 8);
          }
          encodeType() {
            let t = Math.log2(this._bits) - 3;
            return Kt(-5 - t);
          }
          decodeValue(t, e) {
            this.checkType(e);
            let n = Mi(t, this._bits / 8);
            return this._bits <= 32 ? Number(n) : n;
          }
          get name() {
            return `nat${this._bits}`;
          }
          valueToString(t) {
            return t.toString();
          }
        }),
        (Or = class r extends ki {
          constructor() {
            super(...arguments),
              (this._id = r._counter++),
              (this._type = void 0);
          }
          accept(t, e) {
            if (!this._type) throw Error("Recursive type uninitialized.");
            return t.visitRec(this, this._type, e);
          }
          fill(t) {
            this._type = t;
          }
          getType() {
            return this._type;
          }
          covariant(t) {
            if (this._type && this._type.covariant(t)) return !0;
            throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
          }
          encodeValue(t) {
            if (!this._type) throw Error("Recursive type uninitialized.");
            return this._type.encodeValue(t);
          }
          _buildTypeTableImpl(t) {
            if (!this._type) throw Error("Recursive type uninitialized.");
            t.add(this, new Uint8Array([])),
              this._type.buildTypeTable(t),
              t.merge(this, this._type.name);
          }
          decodeValue(t, e) {
            if (!this._type) throw Error("Recursive type uninitialized.");
            return this._type.decodeValue(t, e);
          }
          get name() {
            return `rec_${this._id}`;
          }
          display() {
            if (!this._type) throw Error("Recursive type uninitialized.");
            return `\u03BC${this.name}.${this._type.name}`;
          }
          valueToString(t) {
            if (!this._type) throw Error("Recursive type uninitialized.");
            return this._type.valueToString(t);
          }
        });
      Or._counter = 0;
      Di = class extends jt {
        accept(t, e) {
          return t.visitPrincipal(this, e);
        }
        covariant(t) {
          if (t && t._isPrincipal) return !0;
          throw new Error(`Invalid ${this.display()} argument: ${Dt(t)}`);
        }
        encodeValue(t) {
          let e = t.toUint8Array(),
            n = Re(e.byteLength);
          return Fi(new Uint8Array([1]), n, e);
        }
        encodeType() {
          return Kt(-24);
        }
        decodeValue(t, e) {
          return this.checkType(e), uf(t);
        }
        get name() {
          return "principal";
        }
        valueToString(t) {
          return `${this.name} "${t.toText()}"`;
        }
      };
      (Sd = new $i()),
        (Id = new Hi()),
        (Nd = new Vi()),
        (Ud = new qi()),
        (Rd = new Li()),
        (Fd = new Gi()),
        (Od = new Ki()),
        (Pd = new ji()),
        (Md = new gn(32)),
        (Cd = new gn(64)),
        (kd = new ur(8)),
        ($d = new ur(16)),
        (Vd = new ur(32)),
        (qd = new ur(64)),
        (Ld = new fr(8)),
        (Hd = new fr(16)),
        (Gd = new fr(32)),
        (Kd = new fr(64)),
        (jd = new Di());
    });
  var Yi = ut(() => {});
  var Wo = ut(() => {
    zi();
    Zt();
    Yi();
  });
  var zo = ut(() => {});
  var lr = ut(() => {
    Wo();
    Yi();
    zi();
    Oi();
    Ci();
    yn();
    zo();
  });
  var Pr = At((dr) => {
    "use strict";
    var Xi = di(),
      hr = nn(),
      Yo =
        typeof Symbol == "function" && typeof Symbol.for == "function"
          ? Symbol.for("nodejs.util.inspect.custom")
          : null;
    dr.Buffer = B;
    dr.SlowBuffer = wf;
    dr.INSPECT_MAX_BYTES = 50;
    var mn = 2147483647;
    dr.kMaxLength = mn;
    B.TYPED_ARRAY_SUPPORT = lf();
    !B.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
    function lf() {
      try {
        var r = new Uint8Array(1),
          t = {
            foo: function () {
              return 42;
            },
          };
        return (
          Object.setPrototypeOf(t, Uint8Array.prototype),
          Object.setPrototypeOf(r, t),
          r.foo() === 42
        );
      } catch {
        return !1;
      }
    }
    Object.defineProperty(B.prototype, "parent", {
      enumerable: !0,
      get: function () {
        if (B.isBuffer(this)) return this.buffer;
      },
    });
    Object.defineProperty(B.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (B.isBuffer(this)) return this.byteOffset;
      },
    });
    function be(r) {
      if (r > mn)
        throw new RangeError(
          'The value "' + r + '" is invalid for option "size"',
        );
      var t = new Uint8Array(r);
      return Object.setPrototypeOf(t, B.prototype), t;
    }
    function B(r, t, e) {
      if (typeof r == "number") {
        if (typeof t == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number',
          );
        return ts(r);
      }
      return Zo(r, t, e);
    }
    B.poolSize = 8192;
    function Zo(r, t, e) {
      if (typeof r == "string") return df(r, t);
      if (ArrayBuffer.isView(r)) return pf(r);
      if (r == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof r,
        );
      if (
        he(r, ArrayBuffer) ||
        (r && he(r.buffer, ArrayBuffer)) ||
        (typeof SharedArrayBuffer < "u" &&
          (he(r, SharedArrayBuffer) || (r && he(r.buffer, SharedArrayBuffer))))
      )
        return Zi(r, t, e);
      if (typeof r == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number',
        );
      var n = r.valueOf && r.valueOf();
      if (n != null && n !== r) return B.from(n, t, e);
      var i = yf(r);
      if (i) return i;
      if (
        typeof Symbol < "u" &&
        Symbol.toPrimitive != null &&
        typeof r[Symbol.toPrimitive] == "function"
      )
        return B.from(r[Symbol.toPrimitive]("string"), t, e);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof r,
      );
    }
    B.from = function (r, t, e) {
      return Zo(r, t, e);
    };
    Object.setPrototypeOf(B.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(B, Uint8Array);
    function Qo(r) {
      if (typeof r != "number")
        throw new TypeError('"size" argument must be of type number');
      if (r < 0)
        throw new RangeError(
          'The value "' + r + '" is invalid for option "size"',
        );
    }
    function hf(r, t, e) {
      return (
        Qo(r),
        r <= 0
          ? be(r)
          : t !== void 0
            ? typeof e == "string"
              ? be(r).fill(t, e)
              : be(r).fill(t)
            : be(r)
      );
    }
    B.alloc = function (r, t, e) {
      return hf(r, t, e);
    };
    function ts(r) {
      return Qo(r), be(r < 0 ? 0 : es(r) | 0);
    }
    B.allocUnsafe = function (r) {
      return ts(r);
    };
    B.allocUnsafeSlow = function (r) {
      return ts(r);
    };
    function df(r, t) {
      if (
        ((typeof t != "string" || t === "") && (t = "utf8"), !B.isEncoding(t))
      )
        throw new TypeError("Unknown encoding: " + t);
      var e = ta(r, t) | 0,
        n = be(e),
        i = n.write(r, t);
      return i !== e && (n = n.slice(0, i)), n;
    }
    function Ji(r) {
      for (
        var t = r.length < 0 ? 0 : es(r.length) | 0, e = be(t), n = 0;
        n < t;
        n += 1
      )
        e[n] = r[n] & 255;
      return e;
    }
    function pf(r) {
      if (he(r, Uint8Array)) {
        var t = new Uint8Array(r);
        return Zi(t.buffer, t.byteOffset, t.byteLength);
      }
      return Ji(r);
    }
    function Zi(r, t, e) {
      if (t < 0 || r.byteLength < t)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (r.byteLength < t + (e || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var n;
      return (
        t === void 0 && e === void 0
          ? (n = new Uint8Array(r))
          : e === void 0
            ? (n = new Uint8Array(r, t))
            : (n = new Uint8Array(r, t, e)),
        Object.setPrototypeOf(n, B.prototype),
        n
      );
    }
    function yf(r) {
      if (B.isBuffer(r)) {
        var t = es(r.length) | 0,
          e = be(t);
        return e.length === 0 || r.copy(e, 0, 0, t), e;
      }
      if (r.length !== void 0)
        return typeof r.length != "number" || rs(r.length) ? be(0) : Ji(r);
      if (r.type === "Buffer" && Array.isArray(r.data)) return Ji(r.data);
    }
    function es(r) {
      if (r >= mn)
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            mn.toString(16) +
            " bytes",
        );
      return r | 0;
    }
    function wf(r) {
      return +r != r && (r = 0), B.alloc(+r);
    }
    B.isBuffer = function (t) {
      return t != null && t._isBuffer === !0 && t !== B.prototype;
    };
    B.compare = function (t, e) {
      if (
        (he(t, Uint8Array) && (t = B.from(t, t.offset, t.byteLength)),
        he(e, Uint8Array) && (e = B.from(e, e.offset, e.byteLength)),
        !B.isBuffer(t) || !B.isBuffer(e))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (t === e) return 0;
      for (
        var n = t.length, i = e.length, s = 0, o = Math.min(n, i);
        s < o;
        ++s
      )
        if (t[s] !== e[s]) {
          (n = t[s]), (i = e[s]);
          break;
        }
      return n < i ? -1 : i < n ? 1 : 0;
    };
    B.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    };
    B.concat = function (t, e) {
      if (!Array.isArray(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (t.length === 0) return B.alloc(0);
      var n;
      if (e === void 0) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
      var i = B.allocUnsafe(e),
        s = 0;
      for (n = 0; n < t.length; ++n) {
        var o = t[n];
        if (he(o, Uint8Array))
          s + o.length > i.length
            ? B.from(o).copy(i, s)
            : Uint8Array.prototype.set.call(i, o, s);
        else if (B.isBuffer(o)) o.copy(i, s);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        s += o.length;
      }
      return i;
    };
    function ta(r, t) {
      if (B.isBuffer(r)) return r.length;
      if (ArrayBuffer.isView(r) || he(r, ArrayBuffer)) return r.byteLength;
      if (typeof r != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof r,
        );
      var e = r.length,
        n = arguments.length > 2 && arguments[2] === !0;
      if (!n && e === 0) return 0;
      for (var i = !1; ; )
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return e;
          case "utf8":
          case "utf-8":
            return Qi(r).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return e * 2;
          case "hex":
            return e >>> 1;
          case "base64":
            return oa(r).length;
          default:
            if (i) return n ? -1 : Qi(r).length;
            (t = ("" + t).toLowerCase()), (i = !0);
        }
    }
    B.byteLength = ta;
    function gf(r, t, e) {
      var n = !1;
      if (
        ((t === void 0 || t < 0) && (t = 0),
        t > this.length ||
          ((e === void 0 || e > this.length) && (e = this.length), e <= 0) ||
          ((e >>>= 0), (t >>>= 0), e <= t))
      )
        return "";
      for (r || (r = "utf8"); ; )
        switch (r) {
          case "hex":
            return Sf(this, t, e);
          case "utf8":
          case "utf-8":
            return ra(this, t, e);
          case "ascii":
            return Tf(this, t, e);
          case "latin1":
          case "binary":
            return Bf(this, t, e);
          case "base64":
            return Af(this, t, e);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return If(this, t, e);
          default:
            if (n) throw new TypeError("Unknown encoding: " + r);
            (r = (r + "").toLowerCase()), (n = !0);
        }
    }
    B.prototype._isBuffer = !0;
    function Ge(r, t, e) {
      var n = r[t];
      (r[t] = r[e]), (r[e] = n);
    }
    B.prototype.swap16 = function () {
      var t = this.length;
      if (t % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var e = 0; e < t; e += 2) Ge(this, e, e + 1);
      return this;
    };
    B.prototype.swap32 = function () {
      var t = this.length;
      if (t % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var e = 0; e < t; e += 4) Ge(this, e, e + 3), Ge(this, e + 1, e + 2);
      return this;
    };
    B.prototype.swap64 = function () {
      var t = this.length;
      if (t % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var e = 0; e < t; e += 8)
        Ge(this, e, e + 7),
          Ge(this, e + 1, e + 6),
          Ge(this, e + 2, e + 5),
          Ge(this, e + 3, e + 4);
      return this;
    };
    B.prototype.toString = function () {
      var t = this.length;
      return t === 0
        ? ""
        : arguments.length === 0
          ? ra(this, 0, t)
          : gf.apply(this, arguments);
    };
    B.prototype.toLocaleString = B.prototype.toString;
    B.prototype.equals = function (t) {
      if (!B.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t ? !0 : B.compare(this, t) === 0;
    };
    B.prototype.inspect = function () {
      var t = "",
        e = dr.INSPECT_MAX_BYTES;
      return (
        (t = this.toString("hex", 0, e)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > e && (t += " ... "),
        "<Buffer " + t + ">"
      );
    };
    Yo && (B.prototype[Yo] = B.prototype.inspect);
    B.prototype.compare = function (t, e, n, i, s) {
      if (
        (he(t, Uint8Array) && (t = B.from(t, t.offset, t.byteLength)),
        !B.isBuffer(t))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof t,
        );
      if (
        (e === void 0 && (e = 0),
        n === void 0 && (n = t ? t.length : 0),
        i === void 0 && (i = 0),
        s === void 0 && (s = this.length),
        e < 0 || n > t.length || i < 0 || s > this.length)
      )
        throw new RangeError("out of range index");
      if (i >= s && e >= n) return 0;
      if (i >= s) return -1;
      if (e >= n) return 1;
      if (((e >>>= 0), (n >>>= 0), (i >>>= 0), (s >>>= 0), this === t))
        return 0;
      for (
        var o = s - i,
          c = n - e,
          u = Math.min(o, c),
          y = this.slice(i, s),
          w = t.slice(e, n),
          _ = 0;
        _ < u;
        ++_
      )
        if (y[_] !== w[_]) {
          (o = y[_]), (c = w[_]);
          break;
        }
      return o < c ? -1 : c < o ? 1 : 0;
    };
    function ea(r, t, e, n, i) {
      if (r.length === 0) return -1;
      if (
        (typeof e == "string"
          ? ((n = e), (e = 0))
          : e > 2147483647
            ? (e = 2147483647)
            : e < -2147483648 && (e = -2147483648),
        (e = +e),
        rs(e) && (e = i ? 0 : r.length - 1),
        e < 0 && (e = r.length + e),
        e >= r.length)
      ) {
        if (i) return -1;
        e = r.length - 1;
      } else if (e < 0)
        if (i) e = 0;
        else return -1;
      if ((typeof t == "string" && (t = B.from(t, n)), B.isBuffer(t)))
        return t.length === 0 ? -1 : Xo(r, t, e, n, i);
      if (typeof t == "number")
        return (
          (t = t & 255),
          typeof Uint8Array.prototype.indexOf == "function"
            ? i
              ? Uint8Array.prototype.indexOf.call(r, t, e)
              : Uint8Array.prototype.lastIndexOf.call(r, t, e)
            : Xo(r, [t], e, n, i)
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    function Xo(r, t, e, n, i) {
      var s = 1,
        o = r.length,
        c = t.length;
      if (
        n !== void 0 &&
        ((n = String(n).toLowerCase()),
        n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")
      ) {
        if (r.length < 2 || t.length < 2) return -1;
        (s = 2), (o /= 2), (c /= 2), (e /= 2);
      }
      function u(q, P) {
        return s === 1 ? q[P] : q.readUInt16BE(P * s);
      }
      var y;
      if (i) {
        var w = -1;
        for (y = e; y < o; y++)
          if (u(r, y) === u(t, w === -1 ? 0 : y - w)) {
            if ((w === -1 && (w = y), y - w + 1 === c)) return w * s;
          } else w !== -1 && (y -= y - w), (w = -1);
      } else
        for (e + c > o && (e = o - c), y = e; y >= 0; y--) {
          for (var _ = !0, N = 0; N < c; N++)
            if (u(r, y + N) !== u(t, N)) {
              _ = !1;
              break;
            }
          if (_) return y;
        }
      return -1;
    }
    B.prototype.includes = function (t, e, n) {
      return this.indexOf(t, e, n) !== -1;
    };
    B.prototype.indexOf = function (t, e, n) {
      return ea(this, t, e, n, !0);
    };
    B.prototype.lastIndexOf = function (t, e, n) {
      return ea(this, t, e, n, !1);
    };
    function mf(r, t, e, n) {
      e = Number(e) || 0;
      var i = r.length - e;
      n ? ((n = Number(n)), n > i && (n = i)) : (n = i);
      var s = t.length;
      n > s / 2 && (n = s / 2);
      for (var o = 0; o < n; ++o) {
        var c = parseInt(t.substr(o * 2, 2), 16);
        if (rs(c)) return o;
        r[e + o] = c;
      }
      return o;
    }
    function xf(r, t, e, n) {
      return xn(Qi(t, r.length - e), r, e, n);
    }
    function _f(r, t, e, n) {
      return xn(Rf(t), r, e, n);
    }
    function bf(r, t, e, n) {
      return xn(oa(t), r, e, n);
    }
    function Ef(r, t, e, n) {
      return xn(Ff(t, r.length - e), r, e, n);
    }
    B.prototype.write = function (t, e, n, i) {
      if (e === void 0) (i = "utf8"), (n = this.length), (e = 0);
      else if (n === void 0 && typeof e == "string")
        (i = e), (n = this.length), (e = 0);
      else if (isFinite(e))
        (e = e >>> 0),
          isFinite(n)
            ? ((n = n >>> 0), i === void 0 && (i = "utf8"))
            : ((i = n), (n = void 0));
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported",
        );
      var s = this.length - e;
      if (
        ((n === void 0 || n > s) && (n = s),
        (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      i || (i = "utf8");
      for (var o = !1; ; )
        switch (i) {
          case "hex":
            return mf(this, t, e, n);
          case "utf8":
          case "utf-8":
            return xf(this, t, e, n);
          case "ascii":
          case "latin1":
          case "binary":
            return _f(this, t, e, n);
          case "base64":
            return bf(this, t, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Ef(this, t, e, n);
          default:
            if (o) throw new TypeError("Unknown encoding: " + i);
            (i = ("" + i).toLowerCase()), (o = !0);
        }
    };
    B.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    };
    function Af(r, t, e) {
      return t === 0 && e === r.length
        ? Xi.fromByteArray(r)
        : Xi.fromByteArray(r.slice(t, e));
    }
    function ra(r, t, e) {
      e = Math.min(r.length, e);
      for (var n = [], i = t; i < e; ) {
        var s = r[i],
          o = null,
          c = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
        if (i + c <= e) {
          var u, y, w, _;
          switch (c) {
            case 1:
              s < 128 && (o = s);
              break;
            case 2:
              (u = r[i + 1]),
                (u & 192) === 128 &&
                  ((_ = ((s & 31) << 6) | (u & 63)), _ > 127 && (o = _));
              break;
            case 3:
              (u = r[i + 1]),
                (y = r[i + 2]),
                (u & 192) === 128 &&
                  (y & 192) === 128 &&
                  ((_ = ((s & 15) << 12) | ((u & 63) << 6) | (y & 63)),
                  _ > 2047 && (_ < 55296 || _ > 57343) && (o = _));
              break;
            case 4:
              (u = r[i + 1]),
                (y = r[i + 2]),
                (w = r[i + 3]),
                (u & 192) === 128 &&
                  (y & 192) === 128 &&
                  (w & 192) === 128 &&
                  ((_ =
                    ((s & 15) << 18) |
                    ((u & 63) << 12) |
                    ((y & 63) << 6) |
                    (w & 63)),
                  _ > 65535 && _ < 1114112 && (o = _));
          }
        }
        o === null
          ? ((o = 65533), (c = 1))
          : o > 65535 &&
            ((o -= 65536),
            n.push(((o >>> 10) & 1023) | 55296),
            (o = 56320 | (o & 1023))),
          n.push(o),
          (i += c);
      }
      return vf(n);
    }
    var Jo = 4096;
    function vf(r) {
      var t = r.length;
      if (t <= Jo) return String.fromCharCode.apply(String, r);
      for (var e = "", n = 0; n < t; )
        e += String.fromCharCode.apply(String, r.slice(n, (n += Jo)));
      return e;
    }
    function Tf(r, t, e) {
      var n = "";
      e = Math.min(r.length, e);
      for (var i = t; i < e; ++i) n += String.fromCharCode(r[i] & 127);
      return n;
    }
    function Bf(r, t, e) {
      var n = "";
      e = Math.min(r.length, e);
      for (var i = t; i < e; ++i) n += String.fromCharCode(r[i]);
      return n;
    }
    function Sf(r, t, e) {
      var n = r.length;
      (!t || t < 0) && (t = 0), (!e || e < 0 || e > n) && (e = n);
      for (var i = "", s = t; s < e; ++s) i += Of[r[s]];
      return i;
    }
    function If(r, t, e) {
      for (var n = r.slice(t, e), i = "", s = 0; s < n.length - 1; s += 2)
        i += String.fromCharCode(n[s] + n[s + 1] * 256);
      return i;
    }
    B.prototype.slice = function (t, e) {
      var n = this.length;
      (t = ~~t),
        (e = e === void 0 ? n : ~~e),
        t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
        e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
        e < t && (e = t);
      var i = this.subarray(t, e);
      return Object.setPrototypeOf(i, B.prototype), i;
    };
    function Ft(r, t, e) {
      if (r % 1 !== 0 || r < 0) throw new RangeError("offset is not uint");
      if (r + t > e)
        throw new RangeError("Trying to access beyond buffer length");
    }
    B.prototype.readUintLE = B.prototype.readUIntLE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Ft(t, e, this.length);
      for (var i = this[t], s = 1, o = 0; ++o < e && (s *= 256); )
        i += this[t + o] * s;
      return i;
    };
    B.prototype.readUintBE = B.prototype.readUIntBE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Ft(t, e, this.length);
      for (var i = this[t + --e], s = 1; e > 0 && (s *= 256); )
        i += this[t + --e] * s;
      return i;
    };
    B.prototype.readUint8 = B.prototype.readUInt8 = function (t, e) {
      return (t = t >>> 0), e || Ft(t, 1, this.length), this[t];
    };
    B.prototype.readUint16LE = B.prototype.readUInt16LE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 2, this.length), this[t] | (this[t + 1] << 8)
      );
    };
    B.prototype.readUint16BE = B.prototype.readUInt16BE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 2, this.length), (this[t] << 8) | this[t + 1]
      );
    };
    B.prototype.readUint32LE = B.prototype.readUInt32LE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Ft(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
          this[t + 3] * 16777216
      );
    };
    B.prototype.readUint32BE = B.prototype.readUInt32BE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Ft(t, 4, this.length),
        this[t] * 16777216 +
          ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      );
    };
    B.prototype.readIntLE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Ft(t, e, this.length);
      for (var i = this[t], s = 1, o = 0; ++o < e && (s *= 256); )
        i += this[t + o] * s;
      return (s *= 128), i >= s && (i -= Math.pow(2, 8 * e)), i;
    };
    B.prototype.readIntBE = function (t, e, n) {
      (t = t >>> 0), (e = e >>> 0), n || Ft(t, e, this.length);
      for (var i = e, s = 1, o = this[t + --i]; i > 0 && (s *= 256); )
        o += this[t + --i] * s;
      return (s *= 128), o >= s && (o -= Math.pow(2, 8 * e)), o;
    };
    B.prototype.readInt8 = function (t, e) {
      return (
        (t = t >>> 0),
        e || Ft(t, 1, this.length),
        this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t]
      );
    };
    B.prototype.readInt16LE = function (t, e) {
      (t = t >>> 0), e || Ft(t, 2, this.length);
      var n = this[t] | (this[t + 1] << 8);
      return n & 32768 ? n | 4294901760 : n;
    };
    B.prototype.readInt16BE = function (t, e) {
      (t = t >>> 0), e || Ft(t, 2, this.length);
      var n = this[t + 1] | (this[t] << 8);
      return n & 32768 ? n | 4294901760 : n;
    };
    B.prototype.readInt32LE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Ft(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    };
    B.prototype.readInt32BE = function (t, e) {
      return (
        (t = t >>> 0),
        e || Ft(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    };
    B.prototype.readFloatLE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 4, this.length), hr.read(this, t, !0, 23, 4)
      );
    };
    B.prototype.readFloatBE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 4, this.length), hr.read(this, t, !1, 23, 4)
      );
    };
    B.prototype.readDoubleLE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 8, this.length), hr.read(this, t, !0, 52, 8)
      );
    };
    B.prototype.readDoubleBE = function (t, e) {
      return (
        (t = t >>> 0), e || Ft(t, 8, this.length), hr.read(this, t, !1, 52, 8)
      );
    };
    function Ht(r, t, e, n, i, s) {
      if (!B.isBuffer(r))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > i || t < s)
        throw new RangeError('"value" argument is out of bounds');
      if (e + n > r.length) throw new RangeError("Index out of range");
    }
    B.prototype.writeUintLE = B.prototype.writeUIntLE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), (n = n >>> 0), !i)) {
        var s = Math.pow(2, 8 * n) - 1;
        Ht(this, t, e, n, s, 0);
      }
      var o = 1,
        c = 0;
      for (this[e] = t & 255; ++c < n && (o *= 256); )
        this[e + c] = (t / o) & 255;
      return e + n;
    };
    B.prototype.writeUintBE = B.prototype.writeUIntBE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), (n = n >>> 0), !i)) {
        var s = Math.pow(2, 8 * n) - 1;
        Ht(this, t, e, n, s, 0);
      }
      var o = n - 1,
        c = 1;
      for (this[e + o] = t & 255; --o >= 0 && (c *= 256); )
        this[e + o] = (t / c) & 255;
      return e + n;
    };
    B.prototype.writeUint8 = B.prototype.writeUInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 1, 255, 0),
        (this[e] = t & 255),
        e + 1
      );
    };
    B.prototype.writeUint16LE = B.prototype.writeUInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 2, 65535, 0),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    };
    B.prototype.writeUint16BE = B.prototype.writeUInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 2, 65535, 0),
        (this[e] = t >>> 8),
        (this[e + 1] = t & 255),
        e + 2
      );
    };
    B.prototype.writeUint32LE = B.prototype.writeUInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 4, 4294967295, 0),
        (this[e + 3] = t >>> 24),
        (this[e + 2] = t >>> 16),
        (this[e + 1] = t >>> 8),
        (this[e] = t & 255),
        e + 4
      );
    };
    B.prototype.writeUint32BE = B.prototype.writeUInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 4, 4294967295, 0),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = t & 255),
        e + 4
      );
    };
    B.prototype.writeIntLE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), !i)) {
        var s = Math.pow(2, 8 * n - 1);
        Ht(this, t, e, n, s - 1, -s);
      }
      var o = 0,
        c = 1,
        u = 0;
      for (this[e] = t & 255; ++o < n && (c *= 256); )
        t < 0 && u === 0 && this[e + o - 1] !== 0 && (u = 1),
          (this[e + o] = (((t / c) >> 0) - u) & 255);
      return e + n;
    };
    B.prototype.writeIntBE = function (t, e, n, i) {
      if (((t = +t), (e = e >>> 0), !i)) {
        var s = Math.pow(2, 8 * n - 1);
        Ht(this, t, e, n, s - 1, -s);
      }
      var o = n - 1,
        c = 1,
        u = 0;
      for (this[e + o] = t & 255; --o >= 0 && (c *= 256); )
        t < 0 && u === 0 && this[e + o + 1] !== 0 && (u = 1),
          (this[e + o] = (((t / c) >> 0) - u) & 255);
      return e + n;
    };
    B.prototype.writeInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 1, 127, -128),
        t < 0 && (t = 255 + t + 1),
        (this[e] = t & 255),
        e + 1
      );
    };
    B.prototype.writeInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 2, 32767, -32768),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    };
    B.prototype.writeInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 2, 32767, -32768),
        (this[e] = t >>> 8),
        (this[e + 1] = t & 255),
        e + 2
      );
    };
    B.prototype.writeInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 4, 2147483647, -2147483648),
        (this[e] = t & 255),
        (this[e + 1] = t >>> 8),
        (this[e + 2] = t >>> 16),
        (this[e + 3] = t >>> 24),
        e + 4
      );
    };
    B.prototype.writeInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e = e >>> 0),
        n || Ht(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = t & 255),
        e + 4
      );
    };
    function na(r, t, e, n, i, s) {
      if (e + n > r.length) throw new RangeError("Index out of range");
      if (e < 0) throw new RangeError("Index out of range");
    }
    function ia(r, t, e, n, i) {
      return (
        (t = +t),
        (e = e >>> 0),
        i || na(r, t, e, 4, 34028234663852886e22, -34028234663852886e22),
        hr.write(r, t, e, n, 23, 4),
        e + 4
      );
    }
    B.prototype.writeFloatLE = function (t, e, n) {
      return ia(this, t, e, !0, n);
    };
    B.prototype.writeFloatBE = function (t, e, n) {
      return ia(this, t, e, !1, n);
    };
    function sa(r, t, e, n, i) {
      return (
        (t = +t),
        (e = e >>> 0),
        i || na(r, t, e, 8, 17976931348623157e292, -17976931348623157e292),
        hr.write(r, t, e, n, 52, 8),
        e + 8
      );
    }
    B.prototype.writeDoubleLE = function (t, e, n) {
      return sa(this, t, e, !0, n);
    };
    B.prototype.writeDoubleBE = function (t, e, n) {
      return sa(this, t, e, !1, n);
    };
    B.prototype.copy = function (t, e, n, i) {
      if (!B.isBuffer(t)) throw new TypeError("argument should be a Buffer");
      if (
        (n || (n = 0),
        !i && i !== 0 && (i = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        i > 0 && i < n && (i = n),
        i === n || t.length === 0 || this.length === 0)
      )
        return 0;
      if (e < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("sourceEnd out of bounds");
      i > this.length && (i = this.length),
        t.length - e < i - n && (i = t.length - e + n);
      var s = i - n;
      return (
        this === t && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(e, n, i)
          : Uint8Array.prototype.set.call(t, this.subarray(n, i), e),
        s
      );
    };
    B.prototype.fill = function (t, e, n, i) {
      if (typeof t == "string") {
        if (
          (typeof e == "string"
            ? ((i = e), (e = 0), (n = this.length))
            : typeof n == "string" && ((i = n), (n = this.length)),
          i !== void 0 && typeof i != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !B.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (t.length === 1) {
          var s = t.charCodeAt(0);
          ((i === "utf8" && s < 128) || i === "latin1") && (t = s);
        }
      } else
        typeof t == "number"
          ? (t = t & 255)
          : typeof t == "boolean" && (t = Number(t));
      if (e < 0 || this.length < e || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= e) return this;
      (e = e >>> 0), (n = n === void 0 ? this.length : n >>> 0), t || (t = 0);
      var o;
      if (typeof t == "number") for (o = e; o < n; ++o) this[o] = t;
      else {
        var c = B.isBuffer(t) ? t : B.from(t, i),
          u = c.length;
        if (u === 0)
          throw new TypeError(
            'The value "' + t + '" is invalid for argument "value"',
          );
        for (o = 0; o < n - e; ++o) this[o + e] = c[o % u];
      }
      return this;
    };
    var Nf = /[^+/0-9A-Za-z-_]/g;
    function Uf(r) {
      if (((r = r.split("=")[0]), (r = r.trim().replace(Nf, "")), r.length < 2))
        return "";
      for (; r.length % 4 !== 0; ) r = r + "=";
      return r;
    }
    function Qi(r, t) {
      t = t || 1 / 0;
      for (var e, n = r.length, i = null, s = [], o = 0; o < n; ++o) {
        if (((e = r.charCodeAt(o)), e > 55295 && e < 57344)) {
          if (!i) {
            if (e > 56319) {
              (t -= 3) > -1 && s.push(239, 191, 189);
              continue;
            } else if (o + 1 === n) {
              (t -= 3) > -1 && s.push(239, 191, 189);
              continue;
            }
            i = e;
            continue;
          }
          if (e < 56320) {
            (t -= 3) > -1 && s.push(239, 191, 189), (i = e);
            continue;
          }
          e = (((i - 55296) << 10) | (e - 56320)) + 65536;
        } else i && (t -= 3) > -1 && s.push(239, 191, 189);
        if (((i = null), e < 128)) {
          if ((t -= 1) < 0) break;
          s.push(e);
        } else if (e < 2048) {
          if ((t -= 2) < 0) break;
          s.push((e >> 6) | 192, (e & 63) | 128);
        } else if (e < 65536) {
          if ((t -= 3) < 0) break;
          s.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (e & 63) | 128);
        } else if (e < 1114112) {
          if ((t -= 4) < 0) break;
          s.push(
            (e >> 18) | 240,
            ((e >> 12) & 63) | 128,
            ((e >> 6) & 63) | 128,
            (e & 63) | 128,
          );
        } else throw new Error("Invalid code point");
      }
      return s;
    }
    function Rf(r) {
      for (var t = [], e = 0; e < r.length; ++e) t.push(r.charCodeAt(e) & 255);
      return t;
    }
    function Ff(r, t) {
      for (var e, n, i, s = [], o = 0; o < r.length && !((t -= 2) < 0); ++o)
        (e = r.charCodeAt(o)),
          (n = e >> 8),
          (i = e % 256),
          s.push(i),
          s.push(n);
      return s;
    }
    function oa(r) {
      return Xi.toByteArray(Uf(r));
    }
    function xn(r, t, e, n) {
      for (var i = 0; i < n && !(i + e >= t.length || i >= r.length); ++i)
        t[i + e] = r[i];
      return i;
    }
    function he(r, t) {
      return (
        r instanceof t ||
        (r != null &&
          r.constructor != null &&
          r.constructor.name != null &&
          r.constructor.name === t.name)
      );
    }
    function rs(r) {
      return r !== r;
    }
    var Of = (function () {
      for (var r = "0123456789abcdef", t = new Array(256), e = 0; e < 16; ++e)
        for (var n = e * 16, i = 0; i < 16; ++i) t[n + i] = r[e] + r[i];
      return t;
    })();
  });
  var Mr = At((aa, _n) => {
    (function (r) {
      "use strict";
      var t,
        e = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
        n = Math.ceil,
        i = Math.floor,
        s = "[BigNumber Error] ",
        o = s + "Number primitive has more than 15 significant digits: ",
        c = 1e14,
        u = 14,
        y = 9007199254740991,
        w = [
          1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
        ],
        _ = 1e7,
        N = 1e9;
      function q(O) {
        var $,
          it,
          z,
          R = (S.prototype = { constructor: S, toString: null, valueOf: null }),
          ot = new S(1),
          tt = 20,
          at = 4,
          ht = -7,
          Bt = 21,
          Pt = -1e7,
          kt = 1e7,
          re = !1,
          M = 1,
          U = 0,
          L = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: "\xA0",
            suffix: "",
          },
          H = "0123456789abcdefghijklmnopqrstuvwxyz",
          J = !0;
        function S(a, f) {
          var l,
            b,
            g,
            x,
            v,
            d,
            m,
            A,
            E = this;
          if (!(E instanceof S)) return new S(a, f);
          if (f == null) {
            if (a && a._isBigNumber === !0) {
              (E.s = a.s),
                !a.c || a.e > kt
                  ? (E.c = E.e = null)
                  : a.e < Pt
                    ? (E.c = [(E.e = 0)])
                    : ((E.e = a.e), (E.c = a.c.slice()));
              return;
            }
            if ((d = typeof a == "number") && a * 0 == 0) {
              if (((E.s = 1 / a < 0 ? ((a = -a), -1) : 1), a === ~~a)) {
                for (x = 0, v = a; v >= 10; v /= 10, x++);
                x > kt ? (E.c = E.e = null) : ((E.e = x), (E.c = [a]));
                return;
              }
              A = String(a);
            } else {
              if (!e.test((A = String(a)))) return z(E, A, d);
              E.s = A.charCodeAt(0) == 45 ? ((A = A.slice(1)), -1) : 1;
            }
            (x = A.indexOf(".")) > -1 && (A = A.replace(".", "")),
              (v = A.search(/e/i)) > 0
                ? (x < 0 && (x = v),
                  (x += +A.slice(v + 1)),
                  (A = A.substring(0, v)))
                : x < 0 && (x = A.length);
          } else {
            if ((j(f, 2, H.length, "Base"), f == 10 && J))
              return (E = new S(a)), D(E, tt + E.e + 1, at);
            if (((A = String(a)), (d = typeof a == "number"))) {
              if (a * 0 != 0) return z(E, A, d, f);
              if (
                ((E.s = 1 / a < 0 ? ((A = A.slice(1)), -1) : 1),
                S.DEBUG && A.replace(/^0\.0*|\./, "").length > 15)
              )
                throw Error(o + a);
            } else E.s = A.charCodeAt(0) === 45 ? ((A = A.slice(1)), -1) : 1;
            for (l = H.slice(0, f), x = v = 0, m = A.length; v < m; v++)
              if (l.indexOf((b = A.charAt(v))) < 0) {
                if (b == ".") {
                  if (v > x) {
                    x = m;
                    continue;
                  }
                } else if (
                  !g &&
                  ((A == A.toUpperCase() && (A = A.toLowerCase())) ||
                    (A == A.toLowerCase() && (A = A.toUpperCase())))
                ) {
                  (g = !0), (v = -1), (x = 0);
                  continue;
                }
                return z(E, String(a), d, f);
              }
            (d = !1),
              (A = it(A, f, 10, E.s)),
              (x = A.indexOf(".")) > -1
                ? (A = A.replace(".", ""))
                : (x = A.length);
          }
          for (v = 0; A.charCodeAt(v) === 48; v++);
          for (m = A.length; A.charCodeAt(--m) === 48; );
          if ((A = A.slice(v, ++m))) {
            if (((m -= v), d && S.DEBUG && m > 15 && (a > y || a !== i(a))))
              throw Error(o + E.s * a);
            if ((x = x - v - 1) > kt) E.c = E.e = null;
            else if (x < Pt) E.c = [(E.e = 0)];
            else {
              if (
                ((E.e = x),
                (E.c = []),
                (v = (x + 1) % u),
                x < 0 && (v += u),
                v < m)
              ) {
                for (v && E.c.push(+A.slice(0, v)), m -= u; v < m; )
                  E.c.push(+A.slice(v, (v += u)));
                v = u - (A = A.slice(v)).length;
              } else v -= m;
              for (; v--; A += "0");
              E.c.push(+A);
            }
          } else E.c = [(E.e = 0)];
        }
        (S.clone = q),
          (S.ROUND_UP = 0),
          (S.ROUND_DOWN = 1),
          (S.ROUND_CEIL = 2),
          (S.ROUND_FLOOR = 3),
          (S.ROUND_HALF_UP = 4),
          (S.ROUND_HALF_DOWN = 5),
          (S.ROUND_HALF_EVEN = 6),
          (S.ROUND_HALF_CEIL = 7),
          (S.ROUND_HALF_FLOOR = 8),
          (S.EUCLID = 9),
          (S.config = S.set =
            function (a) {
              var f, l;
              if (a != null)
                if (typeof a == "object") {
                  if (
                    (a.hasOwnProperty((f = "DECIMAL_PLACES")) &&
                      ((l = a[f]), j(l, 0, N, f), (tt = l)),
                    a.hasOwnProperty((f = "ROUNDING_MODE")) &&
                      ((l = a[f]), j(l, 0, 8, f), (at = l)),
                    a.hasOwnProperty((f = "EXPONENTIAL_AT")) &&
                      ((l = a[f]),
                      l && l.pop
                        ? (j(l[0], -N, 0, f),
                          j(l[1], 0, N, f),
                          (ht = l[0]),
                          (Bt = l[1]))
                        : (j(l, -N, N, f), (ht = -(Bt = l < 0 ? -l : l)))),
                    a.hasOwnProperty((f = "RANGE")))
                  )
                    if (((l = a[f]), l && l.pop))
                      j(l[0], -N, -1, f),
                        j(l[1], 1, N, f),
                        (Pt = l[0]),
                        (kt = l[1]);
                    else if ((j(l, -N, N, f), l)) Pt = -(kt = l < 0 ? -l : l);
                    else throw Error(s + f + " cannot be zero: " + l);
                  if (a.hasOwnProperty((f = "CRYPTO")))
                    if (((l = a[f]), l === !!l))
                      if (l)
                        if (
                          typeof crypto < "u" &&
                          crypto &&
                          (crypto.getRandomValues || crypto.randomBytes)
                        )
                          re = l;
                        else throw ((re = !l), Error(s + "crypto unavailable"));
                      else re = l;
                    else throw Error(s + f + " not true or false: " + l);
                  if (
                    (a.hasOwnProperty((f = "MODULO_MODE")) &&
                      ((l = a[f]), j(l, 0, 9, f), (M = l)),
                    a.hasOwnProperty((f = "POW_PRECISION")) &&
                      ((l = a[f]), j(l, 0, N, f), (U = l)),
                    a.hasOwnProperty((f = "FORMAT")))
                  )
                    if (((l = a[f]), typeof l == "object")) L = l;
                    else throw Error(s + f + " not an object: " + l);
                  if (a.hasOwnProperty((f = "ALPHABET")))
                    if (
                      ((l = a[f]),
                      typeof l == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(l))
                    )
                      (J = l.slice(0, 10) == "0123456789"), (H = l);
                    else throw Error(s + f + " invalid: " + l);
                } else throw Error(s + "Object expected: " + a);
              return {
                DECIMAL_PLACES: tt,
                ROUNDING_MODE: at,
                EXPONENTIAL_AT: [ht, Bt],
                RANGE: [Pt, kt],
                CRYPTO: re,
                MODULO_MODE: M,
                POW_PRECISION: U,
                FORMAT: L,
                ALPHABET: H,
              };
            }),
          (S.isBigNumber = function (a) {
            if (!a || a._isBigNumber !== !0) return !1;
            if (!S.DEBUG) return !0;
            var f,
              l,
              b = a.c,
              g = a.e,
              x = a.s;
            t: if ({}.toString.call(b) == "[object Array]") {
              if ((x === 1 || x === -1) && g >= -N && g <= N && g === i(g)) {
                if (b[0] === 0) {
                  if (g === 0 && b.length === 1) return !0;
                  break t;
                }
                if (
                  ((f = (g + 1) % u),
                  f < 1 && (f += u),
                  String(b[0]).length == f)
                ) {
                  for (f = 0; f < b.length; f++)
                    if (((l = b[f]), l < 0 || l >= c || l !== i(l))) break t;
                  if (l !== 0) return !0;
                }
              }
            } else if (
              b === null &&
              g === null &&
              (x === null || x === 1 || x === -1)
            )
              return !0;
            throw Error(s + "Invalid BigNumber: " + a);
          }),
          (S.maximum = S.max =
            function () {
              return ct(arguments, -1);
            }),
          (S.minimum = S.min =
            function () {
              return ct(arguments, 1);
            }),
          (S.random = (function () {
            var a = 9007199254740992,
              f =
                (Math.random() * a) & 2097151
                  ? function () {
                      return i(Math.random() * a);
                    }
                  : function () {
                      return (
                        ((Math.random() * 1073741824) | 0) * 8388608 +
                        ((Math.random() * 8388608) | 0)
                      );
                    };
            return function (l) {
              var b,
                g,
                x,
                v,
                d,
                m = 0,
                A = [],
                E = new S(ot);
              if ((l == null ? (l = tt) : j(l, 0, N), (v = n(l / u)), re))
                if (crypto.getRandomValues) {
                  for (
                    b = crypto.getRandomValues(new Uint32Array((v *= 2)));
                    m < v;

                  )
                    (d = b[m] * 131072 + (b[m + 1] >>> 11)),
                      d >= 9e15
                        ? ((g = crypto.getRandomValues(new Uint32Array(2))),
                          (b[m] = g[0]),
                          (b[m + 1] = g[1]))
                        : (A.push(d % 1e14), (m += 2));
                  m = v / 2;
                } else if (crypto.randomBytes) {
                  for (b = crypto.randomBytes((v *= 7)); m < v; )
                    (d =
                      (b[m] & 31) * 281474976710656 +
                      b[m + 1] * 1099511627776 +
                      b[m + 2] * 4294967296 +
                      b[m + 3] * 16777216 +
                      (b[m + 4] << 16) +
                      (b[m + 5] << 8) +
                      b[m + 6]),
                      d >= 9e15
                        ? crypto.randomBytes(7).copy(b, m)
                        : (A.push(d % 1e14), (m += 7));
                  m = v / 7;
                } else throw ((re = !1), Error(s + "crypto unavailable"));
              if (!re)
                for (; m < v; ) (d = f()), d < 9e15 && (A[m++] = d % 1e14);
              for (
                v = A[--m],
                  l %= u,
                  v && l && ((d = w[u - l]), (A[m] = i(v / d) * d));
                A[m] === 0;
                A.pop(), m--
              );
              if (m < 0) A = [(x = 0)];
              else {
                for (x = -1; A[0] === 0; A.splice(0, 1), x -= u);
                for (m = 1, d = A[0]; d >= 10; d /= 10, m++);
                m < u && (x -= u - m);
              }
              return (E.e = x), (E.c = A), E;
            };
          })()),
          (S.sum = function () {
            for (var a = 1, f = arguments, l = new S(f[0]); a < f.length; )
              l = l.plus(f[a++]);
            return l;
          }),
          (it = (function () {
            var a = "0123456789";
            function f(l, b, g, x) {
              for (var v, d = [0], m, A = 0, E = l.length; A < E; ) {
                for (m = d.length; m--; d[m] *= b);
                for (d[0] += x.indexOf(l.charAt(A++)), v = 0; v < d.length; v++)
                  d[v] > g - 1 &&
                    (d[v + 1] == null && (d[v + 1] = 0),
                    (d[v + 1] += (d[v] / g) | 0),
                    (d[v] %= g));
              }
              return d.reverse();
            }
            return function (l, b, g, x, v) {
              var d,
                m,
                A,
                E,
                I,
                F,
                k,
                Y,
                ft = l.indexOf("."),
                wt = tt,
                W = at;
              for (
                ft >= 0 &&
                  ((E = U),
                  (U = 0),
                  (l = l.replace(".", "")),
                  (Y = new S(b)),
                  (F = Y.pow(l.length - ft)),
                  (U = E),
                  (Y.c = f(yt(G(F.c), F.e, "0"), 10, g, a)),
                  (Y.e = Y.c.length)),
                  k = f(l, b, g, v ? ((d = H), a) : ((d = a), H)),
                  A = E = k.length;
                k[--E] == 0;
                k.pop()
              );
              if (!k[0]) return d.charAt(0);
              if (
                (ft < 0
                  ? --A
                  : ((F.c = k),
                    (F.e = A),
                    (F.s = x),
                    (F = $(F, Y, wt, W, g)),
                    (k = F.c),
                    (I = F.r),
                    (A = F.e)),
                (m = A + wt + 1),
                (ft = k[m]),
                (E = g / 2),
                (I = I || m < 0 || k[m + 1] != null),
                (I =
                  W < 4
                    ? (ft != null || I) && (W == 0 || W == (F.s < 0 ? 3 : 2))
                    : ft > E ||
                      (ft == E &&
                        (W == 4 ||
                          I ||
                          (W == 6 && k[m - 1] & 1) ||
                          W == (F.s < 0 ? 8 : 7)))),
                m < 1 || !k[0])
              )
                l = I ? yt(d.charAt(1), -wt, d.charAt(0)) : d.charAt(0);
              else {
                if (((k.length = m), I))
                  for (--g; ++k[--m] > g; )
                    (k[m] = 0), m || (++A, (k = [1].concat(k)));
                for (E = k.length; !k[--E]; );
                for (ft = 0, l = ""; ft <= E; l += d.charAt(k[ft++]));
                l = yt(l, A, d.charAt(0));
              }
              return l;
            };
          })()),
          ($ = (function () {
            function a(b, g, x) {
              var v,
                d,
                m,
                A,
                E = 0,
                I = b.length,
                F = g % _,
                k = (g / _) | 0;
              for (b = b.slice(); I--; )
                (m = b[I] % _),
                  (A = (b[I] / _) | 0),
                  (v = k * m + A * F),
                  (d = F * m + (v % _) * _ + E),
                  (E = ((d / x) | 0) + ((v / _) | 0) + k * A),
                  (b[I] = d % x);
              return E && (b = [E].concat(b)), b;
            }
            function f(b, g, x, v) {
              var d, m;
              if (x != v) m = x > v ? 1 : -1;
              else
                for (d = m = 0; d < x; d++)
                  if (b[d] != g[d]) {
                    m = b[d] > g[d] ? 1 : -1;
                    break;
                  }
              return m;
            }
            function l(b, g, x, v) {
              for (var d = 0; x--; )
                (b[x] -= d),
                  (d = b[x] < g[x] ? 1 : 0),
                  (b[x] = d * v + b[x] - g[x]);
              for (; !b[0] && b.length > 1; b.splice(0, 1));
            }
            return function (b, g, x, v, d) {
              var m,
                A,
                E,
                I,
                F,
                k,
                Y,
                ft,
                wt,
                W,
                V,
                _t,
                xe,
                Ve,
                qe,
                Vt,
                st,
                qt = b.s == g.s ? 1 : -1,
                Mt = b.c,
                gt = g.c;
              if (!Mt || !Mt[0] || !gt || !gt[0])
                return new S(
                  !b.s || !g.s || (Mt ? gt && Mt[0] == gt[0] : !gt)
                    ? NaN
                    : (Mt && Mt[0] == 0) || !gt
                      ? qt * 0
                      : qt / 0,
                );
              for (
                ft = new S(qt),
                  wt = ft.c = [],
                  A = b.e - g.e,
                  qt = x + A + 1,
                  d ||
                    ((d = c),
                    (A = P(b.e / u) - P(g.e / u)),
                    (qt = (qt / u) | 0)),
                  E = 0;
                gt[E] == (Mt[E] || 0);
                E++
              );
              if ((gt[E] > (Mt[E] || 0) && A--, qt < 0)) wt.push(1), (I = !0);
              else {
                for (
                  Ve = Mt.length,
                    Vt = gt.length,
                    E = 0,
                    qt += 2,
                    F = i(d / (gt[0] + 1)),
                    F > 1 &&
                      ((gt = a(gt, F, d)),
                      (Mt = a(Mt, F, d)),
                      (Vt = gt.length),
                      (Ve = Mt.length)),
                    xe = Vt,
                    W = Mt.slice(0, Vt),
                    V = W.length;
                  V < Vt;
                  W[V++] = 0
                );
                (st = gt.slice()),
                  (st = [0].concat(st)),
                  (qe = gt[0]),
                  gt[1] >= d / 2 && qe++;
                do {
                  if (((F = 0), (m = f(gt, W, Vt, V)), m < 0)) {
                    if (
                      ((_t = W[0]),
                      Vt != V && (_t = _t * d + (W[1] || 0)),
                      (F = i(_t / qe)),
                      F > 1)
                    )
                      for (
                        F >= d && (F = d - 1),
                          k = a(gt, F, d),
                          Y = k.length,
                          V = W.length;
                        f(k, W, Y, V) == 1;

                      )
                        F--,
                          l(k, Vt < Y ? st : gt, Y, d),
                          (Y = k.length),
                          (m = 1);
                    else
                      F == 0 && (m = F = 1), (k = gt.slice()), (Y = k.length);
                    if (
                      (Y < V && (k = [0].concat(k)),
                      l(W, k, V, d),
                      (V = W.length),
                      m == -1)
                    )
                      for (; f(gt, W, Vt, V) < 1; )
                        F++, l(W, Vt < V ? st : gt, V, d), (V = W.length);
                  } else m === 0 && (F++, (W = [0]));
                  (wt[E++] = F),
                    W[0] ? (W[V++] = Mt[xe] || 0) : ((W = [Mt[xe]]), (V = 1));
                } while ((xe++ < Ve || W[0] != null) && qt--);
                (I = W[0] != null), wt[0] || wt.splice(0, 1);
              }
              if (d == c) {
                for (E = 1, qt = wt[0]; qt >= 10; qt /= 10, E++);
                D(ft, x + (ft.e = E + A * u - 1) + 1, v, I);
              } else (ft.e = A), (ft.r = +I);
              return ft;
            };
          })());
        function h(a, f, l, b) {
          var g, x, v, d, m;
          if ((l == null ? (l = at) : j(l, 0, 8), !a.c)) return a.toString();
          if (((g = a.c[0]), (v = a.e), f == null))
            (m = G(a.c)),
              (m =
                b == 1 || (b == 2 && (v <= ht || v >= Bt))
                  ? X(m, v)
                  : yt(m, v, "0"));
          else if (
            ((a = D(new S(a), f, l)),
            (x = a.e),
            (m = G(a.c)),
            (d = m.length),
            b == 1 || (b == 2 && (f <= x || x <= ht)))
          ) {
            for (; d < f; m += "0", d++);
            m = X(m, x);
          } else if (((f -= v), (m = yt(m, x, "0")), x + 1 > d)) {
            if (--f > 0) for (m += "."; f--; m += "0");
          } else if (((f += x - d), f > 0))
            for (x + 1 == d && (m += "."); f--; m += "0");
          return a.s < 0 && g ? "-" + m : m;
        }
        function ct(a, f) {
          for (var l, b, g = 1, x = new S(a[0]); g < a.length; g++)
            (b = new S(a[g])),
              (!b.s || (l = nt(x, b)) === f || (l === 0 && x.s === f)) &&
                (x = b);
          return x;
        }
        function Z(a, f, l) {
          for (var b = 1, g = f.length; !f[--g]; f.pop());
          for (g = f[0]; g >= 10; g /= 10, b++);
          return (
            (l = b + l * u - 1) > kt
              ? (a.c = a.e = null)
              : l < Pt
                ? (a.c = [(a.e = 0)])
                : ((a.e = l), (a.c = f)),
            a
          );
        }
        z = (function () {
          var a = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
            f = /^([^.]+)\.$/,
            l = /^\.([^.]+)$/,
            b = /^-?(Infinity|NaN)$/,
            g = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function (x, v, d, m) {
            var A,
              E = d ? v : v.replace(g, "");
            if (b.test(E)) x.s = isNaN(E) ? null : E < 0 ? -1 : 1;
            else {
              if (
                !d &&
                ((E = E.replace(a, function (I, F, k) {
                  return (
                    (A = (k = k.toLowerCase()) == "x" ? 16 : k == "b" ? 2 : 8),
                    !m || m == A ? F : I
                  );
                })),
                m && ((A = m), (E = E.replace(f, "$1").replace(l, "0.$1"))),
                v != E)
              )
                return new S(E, A);
              if (S.DEBUG)
                throw Error(
                  s + "Not a" + (m ? " base " + m : "") + " number: " + v,
                );
              x.s = null;
            }
            x.c = x.e = null;
          };
        })();
        function D(a, f, l, b) {
          var g,
            x,
            v,
            d,
            m,
            A,
            E,
            I = a.c,
            F = w;
          if (I) {
            t: {
              for (g = 1, d = I[0]; d >= 10; d /= 10, g++);
              if (((x = f - g), x < 0))
                (x += u),
                  (v = f),
                  (m = I[(A = 0)]),
                  (E = i((m / F[g - v - 1]) % 10));
              else if (((A = n((x + 1) / u)), A >= I.length))
                if (b) {
                  for (; I.length <= A; I.push(0));
                  (m = E = 0), (g = 1), (x %= u), (v = x - u + 1);
                } else break t;
              else {
                for (m = d = I[A], g = 1; d >= 10; d /= 10, g++);
                (x %= u),
                  (v = x - u + g),
                  (E = v < 0 ? 0 : i((m / F[g - v - 1]) % 10));
              }
              if (
                ((b =
                  b ||
                  f < 0 ||
                  I[A + 1] != null ||
                  (v < 0 ? m : m % F[g - v - 1])),
                (b =
                  l < 4
                    ? (E || b) && (l == 0 || l == (a.s < 0 ? 3 : 2))
                    : E > 5 ||
                      (E == 5 &&
                        (l == 4 ||
                          b ||
                          (l == 6 &&
                            (x > 0 ? (v > 0 ? m / F[g - v] : 0) : I[A - 1]) %
                              10 &
                              1) ||
                          l == (a.s < 0 ? 8 : 7)))),
                f < 1 || !I[0])
              )
                return (
                  (I.length = 0),
                  b
                    ? ((f -= a.e + 1),
                      (I[0] = F[(u - (f % u)) % u]),
                      (a.e = -f || 0))
                    : (I[0] = a.e = 0),
                  a
                );
              if (
                (x == 0
                  ? ((I.length = A), (d = 1), A--)
                  : ((I.length = A + 1),
                    (d = F[u - x]),
                    (I[A] = v > 0 ? i((m / F[g - v]) % F[v]) * d : 0)),
                b)
              )
                for (;;)
                  if (A == 0) {
                    for (x = 1, v = I[0]; v >= 10; v /= 10, x++);
                    for (v = I[0] += d, d = 1; v >= 10; v /= 10, d++);
                    x != d && (a.e++, I[0] == c && (I[0] = 1));
                    break;
                  } else {
                    if (((I[A] += d), I[A] != c)) break;
                    (I[A--] = 0), (d = 1);
                  }
              for (x = I.length; I[--x] === 0; I.pop());
            }
            a.e > kt ? (a.c = a.e = null) : a.e < Pt && (a.c = [(a.e = 0)]);
          }
          return a;
        }
        function C(a) {
          var f,
            l = a.e;
          return l === null
            ? a.toString()
            : ((f = G(a.c)),
              (f = l <= ht || l >= Bt ? X(f, l) : yt(f, l, "0")),
              a.s < 0 ? "-" + f : f);
        }
        return (
          (R.absoluteValue = R.abs =
            function () {
              var a = new S(this);
              return a.s < 0 && (a.s = 1), a;
            }),
          (R.comparedTo = function (a, f) {
            return nt(this, new S(a, f));
          }),
          (R.decimalPlaces = R.dp =
            function (a, f) {
              var l,
                b,
                g,
                x = this;
              if (a != null)
                return (
                  j(a, 0, N),
                  f == null ? (f = at) : j(f, 0, 8),
                  D(new S(x), a + x.e + 1, f)
                );
              if (!(l = x.c)) return null;
              if (((b = ((g = l.length - 1) - P(this.e / u)) * u), (g = l[g])))
                for (; g % 10 == 0; g /= 10, b--);
              return b < 0 && (b = 0), b;
            }),
          (R.dividedBy = R.div =
            function (a, f) {
              return $(this, new S(a, f), tt, at);
            }),
          (R.dividedToIntegerBy = R.idiv =
            function (a, f) {
              return $(this, new S(a, f), 0, 1);
            }),
          (R.exponentiatedBy = R.pow =
            function (a, f) {
              var l,
                b,
                g,
                x,
                v,
                d,
                m,
                A,
                E,
                I = this;
              if (((a = new S(a)), a.c && !a.isInteger()))
                throw Error(s + "Exponent not an integer: " + C(a));
              if (
                (f != null && (f = new S(f)),
                (d = a.e > 14),
                !I.c ||
                  !I.c[0] ||
                  (I.c[0] == 1 && !I.e && I.c.length == 1) ||
                  !a.c ||
                  !a.c[0])
              )
                return (
                  (E = new S(Math.pow(+C(I), d ? a.s * (2 - Ot(a)) : +C(a)))),
                  f ? E.mod(f) : E
                );
              if (((m = a.s < 0), f)) {
                if (f.c ? !f.c[0] : !f.s) return new S(NaN);
                (b = !m && I.isInteger() && f.isInteger()), b && (I = I.mod(f));
              } else {
                if (
                  a.e > 9 &&
                  (I.e > 0 ||
                    I.e < -1 ||
                    (I.e == 0
                      ? I.c[0] > 1 || (d && I.c[1] >= 24e7)
                      : I.c[0] < 8e13 || (d && I.c[0] <= 9999975e7)))
                )
                  return (
                    (x = I.s < 0 && Ot(a) ? -0 : 0),
                    I.e > -1 && (x = 1 / x),
                    new S(m ? 1 / x : x)
                  );
                U && (x = n(U / u + 2));
              }
              for (
                d
                  ? ((l = new S(0.5)), m && (a.s = 1), (A = Ot(a)))
                  : ((g = Math.abs(+C(a))), (A = g % 2)),
                  E = new S(ot);
                ;

              ) {
                if (A) {
                  if (((E = E.times(I)), !E.c)) break;
                  x ? E.c.length > x && (E.c.length = x) : b && (E = E.mod(f));
                }
                if (g) {
                  if (((g = i(g / 2)), g === 0)) break;
                  A = g % 2;
                } else if (((a = a.times(l)), D(a, a.e + 1, 1), a.e > 14))
                  A = Ot(a);
                else {
                  if (((g = +C(a)), g === 0)) break;
                  A = g % 2;
                }
                (I = I.times(I)),
                  x
                    ? I.c && I.c.length > x && (I.c.length = x)
                    : b && (I = I.mod(f));
              }
              return b
                ? E
                : (m && (E = ot.div(E)), f ? E.mod(f) : x ? D(E, U, at, v) : E);
            }),
          (R.integerValue = function (a) {
            var f = new S(this);
            return a == null ? (a = at) : j(a, 0, 8), D(f, f.e + 1, a);
          }),
          (R.isEqualTo = R.eq =
            function (a, f) {
              return nt(this, new S(a, f)) === 0;
            }),
          (R.isFinite = function () {
            return !!this.c;
          }),
          (R.isGreaterThan = R.gt =
            function (a, f) {
              return nt(this, new S(a, f)) > 0;
            }),
          (R.isGreaterThanOrEqualTo = R.gte =
            function (a, f) {
              return (f = nt(this, new S(a, f))) === 1 || f === 0;
            }),
          (R.isInteger = function () {
            return !!this.c && P(this.e / u) > this.c.length - 2;
          }),
          (R.isLessThan = R.lt =
            function (a, f) {
              return nt(this, new S(a, f)) < 0;
            }),
          (R.isLessThanOrEqualTo = R.lte =
            function (a, f) {
              return (f = nt(this, new S(a, f))) === -1 || f === 0;
            }),
          (R.isNaN = function () {
            return !this.s;
          }),
          (R.isNegative = function () {
            return this.s < 0;
          }),
          (R.isPositive = function () {
            return this.s > 0;
          }),
          (R.isZero = function () {
            return !!this.c && this.c[0] == 0;
          }),
          (R.minus = function (a, f) {
            var l,
              b,
              g,
              x,
              v = this,
              d = v.s;
            if (((a = new S(a, f)), (f = a.s), !d || !f)) return new S(NaN);
            if (d != f) return (a.s = -f), v.plus(a);
            var m = v.e / u,
              A = a.e / u,
              E = v.c,
              I = a.c;
            if (!m || !A) {
              if (!E || !I) return E ? ((a.s = -f), a) : new S(I ? v : NaN);
              if (!E[0] || !I[0])
                return I[0]
                  ? ((a.s = -f), a)
                  : new S(E[0] ? v : at == 3 ? -0 : 0);
            }
            if (((m = P(m)), (A = P(A)), (E = E.slice()), (d = m - A))) {
              for (
                (x = d < 0) ? ((d = -d), (g = E)) : ((A = m), (g = I)),
                  g.reverse(),
                  f = d;
                f--;
                g.push(0)
              );
              g.reverse();
            } else
              for (
                b = (x = (d = E.length) < (f = I.length)) ? d : f, d = f = 0;
                f < b;
                f++
              )
                if (E[f] != I[f]) {
                  x = E[f] < I[f];
                  break;
                }
            if (
              (x && ((g = E), (E = I), (I = g), (a.s = -a.s)),
              (f = (b = I.length) - (l = E.length)),
              f > 0)
            )
              for (; f--; E[l++] = 0);
            for (f = c - 1; b > d; ) {
              if (E[--b] < I[b]) {
                for (l = b; l && !E[--l]; E[l] = f);
                --E[l], (E[b] += c);
              }
              E[b] -= I[b];
            }
            for (; E[0] == 0; E.splice(0, 1), --A);
            return E[0]
              ? Z(a, E, A)
              : ((a.s = at == 3 ? -1 : 1), (a.c = [(a.e = 0)]), a);
          }),
          (R.modulo = R.mod =
            function (a, f) {
              var l,
                b,
                g = this;
              return (
                (a = new S(a, f)),
                !g.c || !a.s || (a.c && !a.c[0])
                  ? new S(NaN)
                  : !a.c || (g.c && !g.c[0])
                    ? new S(g)
                    : (M == 9
                        ? ((b = a.s),
                          (a.s = 1),
                          (l = $(g, a, 0, 3)),
                          (a.s = b),
                          (l.s *= b))
                        : (l = $(g, a, 0, M)),
                      (a = g.minus(l.times(a))),
                      !a.c[0] && M == 1 && (a.s = g.s),
                      a)
              );
            }),
          (R.multipliedBy = R.times =
            function (a, f) {
              var l,
                b,
                g,
                x,
                v,
                d,
                m,
                A,
                E,
                I,
                F,
                k,
                Y,
                ft,
                wt,
                W = this,
                V = W.c,
                _t = (a = new S(a, f)).c;
              if (!V || !_t || !V[0] || !_t[0])
                return (
                  !W.s || !a.s || (V && !V[0] && !_t) || (_t && !_t[0] && !V)
                    ? (a.c = a.e = a.s = null)
                    : ((a.s *= W.s),
                      !V || !_t
                        ? (a.c = a.e = null)
                        : ((a.c = [0]), (a.e = 0))),
                  a
                );
              for (
                b = P(W.e / u) + P(a.e / u),
                  a.s *= W.s,
                  m = V.length,
                  I = _t.length,
                  m < I &&
                    ((Y = V), (V = _t), (_t = Y), (g = m), (m = I), (I = g)),
                  g = m + I,
                  Y = [];
                g--;
                Y.push(0)
              );
              for (ft = c, wt = _, g = I; --g >= 0; ) {
                for (
                  l = 0, F = _t[g] % wt, k = (_t[g] / wt) | 0, v = m, x = g + v;
                  x > g;

                )
                  (A = V[--v] % wt),
                    (E = (V[v] / wt) | 0),
                    (d = k * A + E * F),
                    (A = F * A + (d % wt) * wt + Y[x] + l),
                    (l = ((A / ft) | 0) + ((d / wt) | 0) + k * E),
                    (Y[x--] = A % ft);
                Y[x] = l;
              }
              return l ? ++b : Y.splice(0, 1), Z(a, Y, b);
            }),
          (R.negated = function () {
            var a = new S(this);
            return (a.s = -a.s || null), a;
          }),
          (R.plus = function (a, f) {
            var l,
              b = this,
              g = b.s;
            if (((a = new S(a, f)), (f = a.s), !g || !f)) return new S(NaN);
            if (g != f) return (a.s = -f), b.minus(a);
            var x = b.e / u,
              v = a.e / u,
              d = b.c,
              m = a.c;
            if (!x || !v) {
              if (!d || !m) return new S(g / 0);
              if (!d[0] || !m[0]) return m[0] ? a : new S(d[0] ? b : g * 0);
            }
            if (((x = P(x)), (v = P(v)), (d = d.slice()), (g = x - v))) {
              for (
                g > 0 ? ((v = x), (l = m)) : ((g = -g), (l = d)), l.reverse();
                g--;
                l.push(0)
              );
              l.reverse();
            }
            for (
              g = d.length,
                f = m.length,
                g - f < 0 && ((l = m), (m = d), (d = l), (f = g)),
                g = 0;
              f;

            )
              (g = ((d[--f] = d[f] + m[f] + g) / c) | 0),
                (d[f] = c === d[f] ? 0 : d[f] % c);
            return g && ((d = [g].concat(d)), ++v), Z(a, d, v);
          }),
          (R.precision = R.sd =
            function (a, f) {
              var l,
                b,
                g,
                x = this;
              if (a != null && a !== !!a)
                return (
                  j(a, 1, N),
                  f == null ? (f = at) : j(f, 0, 8),
                  D(new S(x), a, f)
                );
              if (!(l = x.c)) return null;
              if (((g = l.length - 1), (b = g * u + 1), (g = l[g]))) {
                for (; g % 10 == 0; g /= 10, b--);
                for (g = l[0]; g >= 10; g /= 10, b++);
              }
              return a && x.e + 1 > b && (b = x.e + 1), b;
            }),
          (R.shiftedBy = function (a) {
            return j(a, -y, y), this.times("1e" + a);
          }),
          (R.squareRoot = R.sqrt =
            function () {
              var a,
                f,
                l,
                b,
                g,
                x = this,
                v = x.c,
                d = x.s,
                m = x.e,
                A = tt + 4,
                E = new S("0.5");
              if (d !== 1 || !v || !v[0])
                return new S(
                  !d || (d < 0 && (!v || v[0])) ? NaN : v ? x : 1 / 0,
                );
              if (
                ((d = Math.sqrt(+C(x))),
                d == 0 || d == 1 / 0
                  ? ((f = G(v)),
                    (f.length + m) % 2 == 0 && (f += "0"),
                    (d = Math.sqrt(+f)),
                    (m = P((m + 1) / 2) - (m < 0 || m % 2)),
                    d == 1 / 0
                      ? (f = "5e" + m)
                      : ((f = d.toExponential()),
                        (f = f.slice(0, f.indexOf("e") + 1) + m)),
                    (l = new S(f)))
                  : (l = new S(d + "")),
                l.c[0])
              ) {
                for (m = l.e, d = m + A, d < 3 && (d = 0); ; )
                  if (
                    ((g = l),
                    (l = E.times(g.plus($(x, g, A, 1)))),
                    G(g.c).slice(0, d) === (f = G(l.c)).slice(0, d))
                  )
                    if (
                      (l.e < m && --d,
                      (f = f.slice(d - 3, d + 1)),
                      f == "9999" || (!b && f == "4999"))
                    ) {
                      if (!b && (D(g, g.e + tt + 2, 0), g.times(g).eq(x))) {
                        l = g;
                        break;
                      }
                      (A += 4), (d += 4), (b = 1);
                    } else {
                      (!+f || (!+f.slice(1) && f.charAt(0) == "5")) &&
                        (D(l, l.e + tt + 2, 1), (a = !l.times(l).eq(x)));
                      break;
                    }
              }
              return D(l, l.e + tt + 1, at, a);
            }),
          (R.toExponential = function (a, f) {
            return a != null && (j(a, 0, N), a++), h(this, a, f, 1);
          }),
          (R.toFixed = function (a, f) {
            return (
              a != null && (j(a, 0, N), (a = a + this.e + 1)), h(this, a, f)
            );
          }),
          (R.toFormat = function (a, f, l) {
            var b,
              g = this;
            if (l == null)
              a != null && f && typeof f == "object"
                ? ((l = f), (f = null))
                : a && typeof a == "object"
                  ? ((l = a), (a = f = null))
                  : (l = L);
            else if (typeof l != "object")
              throw Error(s + "Argument not an object: " + l);
            if (((b = g.toFixed(a, f)), g.c)) {
              var x,
                v = b.split("."),
                d = +l.groupSize,
                m = +l.secondaryGroupSize,
                A = l.groupSeparator || "",
                E = v[0],
                I = v[1],
                F = g.s < 0,
                k = F ? E.slice(1) : E,
                Y = k.length;
              if (
                (m && ((x = d), (d = m), (m = x), (Y -= x)), d > 0 && Y > 0)
              ) {
                for (x = Y % d || d, E = k.substr(0, x); x < Y; x += d)
                  E += A + k.substr(x, d);
                m > 0 && (E += A + k.slice(x)), F && (E = "-" + E);
              }
              b = I
                ? E +
                  (l.decimalSeparator || "") +
                  ((m = +l.fractionGroupSize)
                    ? I.replace(
                        new RegExp("\\d{" + m + "}\\B", "g"),
                        "$&" + (l.fractionGroupSeparator || ""),
                      )
                    : I)
                : E;
            }
            return (l.prefix || "") + b + (l.suffix || "");
          }),
          (R.toFraction = function (a) {
            var f,
              l,
              b,
              g,
              x,
              v,
              d,
              m,
              A,
              E,
              I,
              F,
              k = this,
              Y = k.c;
            if (
              a != null &&
              ((d = new S(a)),
              (!d.isInteger() && (d.c || d.s !== 1)) || d.lt(ot))
            )
              throw Error(
                s +
                  "Argument " +
                  (d.isInteger() ? "out of range: " : "not an integer: ") +
                  C(d),
              );
            if (!Y) return new S(k);
            for (
              f = new S(ot),
                A = l = new S(ot),
                b = m = new S(ot),
                F = G(Y),
                x = f.e = F.length - k.e - 1,
                f.c[0] = w[(v = x % u) < 0 ? u + v : v],
                a = !a || d.comparedTo(f) > 0 ? (x > 0 ? f : A) : d,
                v = kt,
                kt = 1 / 0,
                d = new S(F),
                m.c[0] = 0;
              (E = $(d, f, 0, 1)),
                (g = l.plus(E.times(b))),
                g.comparedTo(a) != 1;

            )
              (l = b),
                (b = g),
                (A = m.plus(E.times((g = A)))),
                (m = g),
                (f = d.minus(E.times((g = f)))),
                (d = g);
            return (
              (g = $(a.minus(l), b, 0, 1)),
              (m = m.plus(g.times(A))),
              (l = l.plus(g.times(b))),
              (m.s = A.s = k.s),
              (x = x * 2),
              (I =
                $(A, b, x, at)
                  .minus(k)
                  .abs()
                  .comparedTo($(m, l, x, at).minus(k).abs()) < 1
                  ? [A, b]
                  : [m, l]),
              (kt = v),
              I
            );
          }),
          (R.toNumber = function () {
            return +C(this);
          }),
          (R.toPrecision = function (a, f) {
            return a != null && j(a, 1, N), h(this, a, f, 2);
          }),
          (R.toString = function (a) {
            var f,
              l = this,
              b = l.s,
              g = l.e;
            return (
              g === null
                ? b
                  ? ((f = "Infinity"), b < 0 && (f = "-" + f))
                  : (f = "NaN")
                : (a == null
                    ? (f =
                        g <= ht || g >= Bt ? X(G(l.c), g) : yt(G(l.c), g, "0"))
                    : a === 10 && J
                      ? ((l = D(new S(l), tt + g + 1, at)),
                        (f = yt(G(l.c), l.e, "0")))
                      : (j(a, 2, H.length, "Base"),
                        (f = it(yt(G(l.c), g, "0"), 10, a, b, !0))),
                  b < 0 && l.c[0] && (f = "-" + f)),
              f
            );
          }),
          (R.valueOf = R.toJSON =
            function () {
              return C(this);
            }),
          (R._isBigNumber = !0),
          O != null && S.set(O),
          S
        );
      }
      function P(O) {
        var $ = O | 0;
        return O > 0 || O === $ ? $ : $ - 1;
      }
      function G(O) {
        for (var $, it, z = 1, R = O.length, ot = O[0] + ""; z < R; ) {
          for ($ = O[z++] + "", it = u - $.length; it--; $ = "0" + $);
          ot += $;
        }
        for (R = ot.length; ot.charCodeAt(--R) === 48; );
        return ot.slice(0, R + 1 || 1);
      }
      function nt(O, $) {
        var it,
          z,
          R = O.c,
          ot = $.c,
          tt = O.s,
          at = $.s,
          ht = O.e,
          Bt = $.e;
        if (!tt || !at) return null;
        if (((it = R && !R[0]), (z = ot && !ot[0]), it || z))
          return it ? (z ? 0 : -at) : tt;
        if (tt != at) return tt;
        if (((it = tt < 0), (z = ht == Bt), !R || !ot))
          return z ? 0 : !R ^ it ? 1 : -1;
        if (!z) return (ht > Bt) ^ it ? 1 : -1;
        for (
          at = (ht = R.length) < (Bt = ot.length) ? ht : Bt, tt = 0;
          tt < at;
          tt++
        )
          if (R[tt] != ot[tt]) return (R[tt] > ot[tt]) ^ it ? 1 : -1;
        return ht == Bt ? 0 : (ht > Bt) ^ it ? 1 : -1;
      }
      function j(O, $, it, z) {
        if (O < $ || O > it || O !== i(O))
          throw Error(
            s +
              (z || "Argument") +
              (typeof O == "number"
                ? O < $ || O > it
                  ? " out of range: "
                  : " not an integer: "
                : " not a primitive number: ") +
              String(O),
          );
      }
      function Ot(O) {
        var $ = O.c.length - 1;
        return P(O.e / u) == $ && O.c[$] % 2 != 0;
      }
      function X(O, $) {
        return (
          (O.length > 1 ? O.charAt(0) + "." + O.slice(1) : O) +
          ($ < 0 ? "e" : "e+") +
          $
        );
      }
      function yt(O, $, it) {
        var z, R;
        if ($ < 0) {
          for (R = it + "."; ++$; R += it);
          O = R + O;
        } else if (((z = O.length), ++$ > z)) {
          for (R = it, $ -= z; --$; R += it);
          O += R;
        } else $ < z && (O = O.slice(0, $) + "." + O.slice($));
        return O;
      }
      (t = q()),
        (t.default = t.BigNumber = t),
        typeof define == "function" && define.amd
          ? define(function () {
              return t;
            })
          : typeof _n < "u" && _n.exports
            ? (_n.exports = t)
            : (r || (r = typeof self < "u" && self ? self : window),
              (r.BigNumber = t));
    })(aa);
  });
  var ua = At((up, ca) => {
    ca.exports = function (t, e, n) {
      var i = new t.Uint8Array(n),
        s = e.pushInt,
        o = e.pushInt32,
        c = e.pushInt32Neg,
        u = e.pushInt64,
        y = e.pushInt64Neg,
        w = e.pushFloat,
        _ = e.pushFloatSingle,
        N = e.pushFloatDouble,
        q = e.pushTrue,
        P = e.pushFalse,
        G = e.pushUndefined,
        nt = e.pushNull,
        j = e.pushInfinity,
        Ot = e.pushInfinityNeg,
        X = e.pushNaN,
        yt = e.pushNaNNeg,
        O = e.pushArrayStart,
        $ = e.pushArrayStartFixed,
        it = e.pushArrayStartFixed32,
        z = e.pushArrayStartFixed64,
        R = e.pushObjectStart,
        ot = e.pushObjectStartFixed,
        tt = e.pushObjectStartFixed32,
        at = e.pushObjectStartFixed64,
        ht = e.pushByteString,
        Bt = e.pushByteStringStart,
        Pt = e.pushUtf8String,
        kt = e.pushUtf8StringStart,
        re = e.pushSimpleUnassigned,
        M = e.pushTagStart,
        U = e.pushTagStart4,
        L = e.pushTagStart8,
        H = e.pushTagUnassigned,
        J = e.pushBreak,
        S = t.Math.pow,
        h = 0,
        ct = 0,
        Z = 0;
      function D(p) {
        for (
          p = p | 0, h = 0, ct = p;
          (h | 0) < (ct | 0) &&
          ((Z = pu[i[h] & 255](i[h] | 0) | 0), !((Z | 0) > 0));

        );
        return Z | 0;
      }
      function C(p) {
        return (p = p | 0), (((h | 0) + (p | 0)) | 0) < (ct | 0) ? 0 : 1;
      }
      function a(p) {
        return (p = p | 0), (i[p | 0] << 8) | i[(p + 1) | 0] | 0;
      }
      function f(p) {
        return (
          (p = p | 0),
          (i[p | 0] << 24) |
            (i[(p + 1) | 0] << 16) |
            (i[(p + 2) | 0] << 8) |
            i[(p + 3) | 0] |
            0
        );
      }
      function l(p) {
        return (p = p | 0), s(p | 0), (h = (h + 1) | 0), 0;
      }
      function b(p) {
        return (
          (p = p | 0),
          C(1) | 0 ? 1 : (s(i[(h + 1) | 0] | 0), (h = (h + 2) | 0), 0)
        );
      }
      function g(p) {
        return (
          (p = p | 0),
          C(2) | 0 ? 1 : (s(a((h + 1) | 0) | 0), (h = (h + 3) | 0), 0)
        );
      }
      function x(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (o(a((h + 1) | 0) | 0, a((h + 3) | 0) | 0), (h = (h + 5) | 0), 0)
        );
      }
      function v(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (u(
                a((h + 1) | 0) | 0,
                a((h + 3) | 0) | 0,
                a((h + 5) | 0) | 0,
                a((h + 7) | 0) | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function d(p) {
        return (p = p | 0), s((-1 - ((p - 32) | 0)) | 0), (h = (h + 1) | 0), 0;
      }
      function m(p) {
        return (
          (p = p | 0),
          C(1) | 0
            ? 1
            : (s((-1 - (i[(h + 1) | 0] | 0)) | 0), (h = (h + 2) | 0), 0)
        );
      }
      function A(p) {
        p = p | 0;
        var et = 0;
        return C(2) | 0
          ? 1
          : ((et = a((h + 1) | 0) | 0),
            s((-1 - (et | 0)) | 0),
            (h = (h + 3) | 0),
            0);
      }
      function E(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (c(a((h + 1) | 0) | 0, a((h + 3) | 0) | 0), (h = (h + 5) | 0), 0)
        );
      }
      function I(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (y(
                a((h + 1) | 0) | 0,
                a((h + 3) | 0) | 0,
                a((h + 5) | 0) | 0,
                a((h + 7) | 0) | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function F(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return (
          (Q = (p - 64) | 0),
          C(Q | 0) | 0
            ? 1
            : ((et = (h + 1) | 0),
              (rt = (((h + 1) | 0) + (Q | 0)) | 0),
              ht(et | 0, rt | 0),
              (h = rt | 0),
              0)
        );
      }
      function k(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(1) | 0 ||
          ((Q = i[(h + 1) | 0] | 0),
          (et = (h + 2) | 0),
          (rt = (((h + 2) | 0) + (Q | 0)) | 0),
          C((Q + 1) | 0) | 0)
          ? 1
          : (ht(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function Y(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(2) | 0 ||
          ((Q = a((h + 1) | 0) | 0),
          (et = (h + 3) | 0),
          (rt = (((h + 3) | 0) + (Q | 0)) | 0),
          C((Q + 2) | 0) | 0)
          ? 1
          : (ht(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function ft(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(4) | 0 ||
          ((Q = f((h + 1) | 0) | 0),
          (et = (h + 5) | 0),
          (rt = (((h + 5) | 0) + (Q | 0)) | 0),
          C((Q + 4) | 0) | 0)
          ? 1
          : (ht(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function wt(p) {
        return (p = p | 0), 1;
      }
      function W(p) {
        return (p = p | 0), Bt(), (h = (h + 1) | 0), 0;
      }
      function V(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return (
          (Q = (p - 96) | 0),
          C(Q | 0) | 0
            ? 1
            : ((et = (h + 1) | 0),
              (rt = (((h + 1) | 0) + (Q | 0)) | 0),
              Pt(et | 0, rt | 0),
              (h = rt | 0),
              0)
        );
      }
      function _t(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(1) | 0 ||
          ((Q = i[(h + 1) | 0] | 0),
          (et = (h + 2) | 0),
          (rt = (((h + 2) | 0) + (Q | 0)) | 0),
          C((Q + 1) | 0) | 0)
          ? 1
          : (Pt(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function xe(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(2) | 0 ||
          ((Q = a((h + 1) | 0) | 0),
          (et = (h + 3) | 0),
          (rt = (((h + 3) | 0) + (Q | 0)) | 0),
          C((Q + 2) | 0) | 0)
          ? 1
          : (Pt(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function Ve(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 0;
        return C(4) | 0 ||
          ((Q = f((h + 1) | 0) | 0),
          (et = (h + 5) | 0),
          (rt = (((h + 5) | 0) + (Q | 0)) | 0),
          C((Q + 4) | 0) | 0)
          ? 1
          : (Pt(et | 0, rt | 0), (h = rt | 0), 0);
      }
      function qe(p) {
        return (p = p | 0), 1;
      }
      function Vt(p) {
        return (p = p | 0), kt(), (h = (h + 1) | 0), 0;
      }
      function st(p) {
        return (p = p | 0), $((p - 128) | 0), (h = (h + 1) | 0), 0;
      }
      function qt(p) {
        return (
          (p = p | 0),
          C(1) | 0 ? 1 : ($(i[(h + 1) | 0] | 0), (h = (h + 2) | 0), 0)
        );
      }
      function Mt(p) {
        return (
          (p = p | 0),
          C(2) | 0 ? 1 : ($(a((h + 1) | 0) | 0), (h = (h + 3) | 0), 0)
        );
      }
      function gt(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (it(a((h + 1) | 0) | 0, a((h + 3) | 0) | 0), (h = (h + 5) | 0), 0)
        );
      }
      function zc(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (z(
                a((h + 1) | 0) | 0,
                a((h + 3) | 0) | 0,
                a((h + 5) | 0) | 0,
                a((h + 7) | 0) | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function Yc(p) {
        return (p = p | 0), O(), (h = (h + 1) | 0), 0;
      }
      function mt(p) {
        p = p | 0;
        var et = 0;
        return (
          (et = (p - 160) | 0),
          C(et | 0) | 0 ? 1 : (ot(et | 0), (h = (h + 1) | 0), 0)
        );
      }
      function Xc(p) {
        return (
          (p = p | 0),
          C(1) | 0 ? 1 : (ot(i[(h + 1) | 0] | 0), (h = (h + 2) | 0), 0)
        );
      }
      function Jc(p) {
        return (
          (p = p | 0),
          C(2) | 0 ? 1 : (ot(a((h + 1) | 0) | 0), (h = (h + 3) | 0), 0)
        );
      }
      function Zc(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (tt(a((h + 1) | 0) | 0, a((h + 3) | 0) | 0), (h = (h + 5) | 0), 0)
        );
      }
      function Qc(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (at(
                a((h + 1) | 0) | 0,
                a((h + 3) | 0) | 0,
                a((h + 5) | 0) | 0,
                a((h + 7) | 0) | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function tu(p) {
        return (p = p | 0), R(), (h = (h + 1) | 0), 0;
      }
      function Qe(p) {
        return (p = p | 0), M((p - 192) | 0 | 0), (h = (h + 1) | 0), 0;
      }
      function P0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function M0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function C0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function k0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function Ut(p) {
        return (p = p | 0), M((p - 192) | 0 | 0), (h = (h + 1) | 0), 0;
      }
      function $0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function V0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function q0(p) {
        return (p = p | 0), M(p | 0), (h = (h + 1) | 0), 0;
      }
      function eu(p) {
        return (
          (p = p | 0),
          C(1) | 0 ? 1 : (M(i[(h + 1) | 0] | 0), (h = (h + 2) | 0), 0)
        );
      }
      function ru(p) {
        return (
          (p = p | 0),
          C(2) | 0 ? 1 : (M(a((h + 1) | 0) | 0), (h = (h + 3) | 0), 0)
        );
      }
      function nu(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (U(a((h + 1) | 0) | 0, a((h + 3) | 0) | 0), (h = (h + 5) | 0), 0)
        );
      }
      function iu(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (L(
                a((h + 1) | 0) | 0,
                a((h + 3) | 0) | 0,
                a((h + 5) | 0) | 0,
                a((h + 7) | 0) | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function Et(p) {
        return (p = p | 0), re(((p | 0) - 224) | 0), (h = (h + 1) | 0), 0;
      }
      function su(p) {
        return (p = p | 0), P(), (h = (h + 1) | 0), 0;
      }
      function ou(p) {
        return (p = p | 0), q(), (h = (h + 1) | 0), 0;
      }
      function au(p) {
        return (p = p | 0), nt(), (h = (h + 1) | 0), 0;
      }
      function cu(p) {
        return (p = p | 0), G(), (h = (h + 1) | 0), 0;
      }
      function uu(p) {
        return (
          (p = p | 0),
          C(1) | 0 ? 1 : (re(i[(h + 1) | 0] | 0), (h = (h + 2) | 0), 0)
        );
      }
      function fu(p) {
        p = p | 0;
        var et = 0,
          rt = 0,
          Q = 1,
          en = 0,
          Sr = 0,
          L0 = 0;
        return C(2) | 0
          ? 1
          : ((et = i[(h + 1) | 0] | 0),
            (rt = i[(h + 2) | 0] | 0),
            (et | 0) & 128 && (Q = -1),
            (en = +(((et | 0) & 124) >> 2)),
            (Sr = +((((et | 0) & 3) << 8) | rt)),
            +en == 0
              ? w(+(+Q * 5960464477539063e-23 * +Sr))
              : +en == 31
                ? +Q == 1
                  ? +Sr > 0
                    ? X()
                    : j()
                  : +Sr > 0
                    ? yt()
                    : Ot()
                : w(+(+Q * S(2, +(+en - 25)) * +(1024 + Sr))),
            (h = (h + 3) | 0),
            0);
      }
      function lu(p) {
        return (
          (p = p | 0),
          C(4) | 0
            ? 1
            : (_(
                i[(h + 1) | 0] | 0,
                i[(h + 2) | 0] | 0,
                i[(h + 3) | 0] | 0,
                i[(h + 4) | 0] | 0,
              ),
              (h = (h + 5) | 0),
              0)
        );
      }
      function hu(p) {
        return (
          (p = p | 0),
          C(8) | 0
            ? 1
            : (N(
                i[(h + 1) | 0] | 0,
                i[(h + 2) | 0] | 0,
                i[(h + 3) | 0] | 0,
                i[(h + 4) | 0] | 0,
                i[(h + 5) | 0] | 0,
                i[(h + 6) | 0] | 0,
                i[(h + 7) | 0] | 0,
                i[(h + 8) | 0] | 0,
              ),
              (h = (h + 9) | 0),
              0)
        );
      }
      function dt(p) {
        return (p = p | 0), 1;
      }
      function du(p) {
        return (p = p | 0), J(), (h = (h + 1) | 0), 0;
      }
      var pu = [
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        l,
        b,
        g,
        x,
        v,
        dt,
        dt,
        dt,
        dt,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        d,
        m,
        A,
        E,
        I,
        dt,
        dt,
        dt,
        dt,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        F,
        k,
        Y,
        ft,
        wt,
        dt,
        dt,
        dt,
        W,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        V,
        _t,
        xe,
        Ve,
        qe,
        dt,
        dt,
        dt,
        Vt,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        st,
        qt,
        Mt,
        gt,
        zc,
        dt,
        dt,
        dt,
        Yc,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        mt,
        Xc,
        Jc,
        Zc,
        Qc,
        dt,
        dt,
        dt,
        tu,
        Qe,
        Qe,
        Qe,
        Qe,
        Qe,
        Qe,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        Ut,
        eu,
        ru,
        nu,
        iu,
        dt,
        dt,
        dt,
        dt,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        Et,
        su,
        ou,
        au,
        cu,
        uu,
        fu,
        lu,
        hu,
        dt,
        dt,
        dt,
        du,
      ];
      return { parse: D };
    };
  });
  var Cr = At((Wt) => {
    "use strict";
    var ns = Mr().BigNumber;
    Wt.MT = {
      POS_INT: 0,
      NEG_INT: 1,
      BYTE_STRING: 2,
      UTF8_STRING: 3,
      ARRAY: 4,
      MAP: 5,
      TAG: 6,
      SIMPLE_FLOAT: 7,
    };
    Wt.TAG = {
      DATE_STRING: 0,
      DATE_EPOCH: 1,
      POS_BIGINT: 2,
      NEG_BIGINT: 3,
      DECIMAL_FRAC: 4,
      BIGFLOAT: 5,
      BASE64URL_EXPECTED: 21,
      BASE64_EXPECTED: 22,
      BASE16_EXPECTED: 23,
      CBOR: 24,
      URI: 32,
      BASE64URL: 33,
      BASE64: 34,
      REGEXP: 35,
      MIME: 36,
    };
    Wt.NUMBYTES = {
      ZERO: 0,
      ONE: 24,
      TWO: 25,
      FOUR: 26,
      EIGHT: 27,
      INDEFINITE: 31,
    };
    Wt.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
    Wt.SYMS = {
      NULL: Symbol("null"),
      UNDEFINED: Symbol("undef"),
      PARENT: Symbol("parent"),
      BREAK: Symbol("break"),
      STREAM: Symbol("stream"),
    };
    Wt.SHIFT32 = Math.pow(2, 32);
    Wt.SHIFT16 = Math.pow(2, 16);
    Wt.MAX_SAFE_HIGH = 2097151;
    Wt.NEG_ONE = new ns(-1);
    Wt.TEN = new ns(10);
    Wt.TWO = new ns(2);
    Wt.PARENT = {
      ARRAY: 0,
      OBJECT: 1,
      MAP: 2,
      TAG: 3,
      BYTE_STRING: 4,
      UTF8_STRING: 5,
    };
  });
  var bn = At((te) => {
    "use strict";
    var { Buffer: Pf } = Pr(),
      la = Mr().BigNumber,
      ha = Cr(),
      fa = ha.SHIFT32,
      Mf = ha.SHIFT16,
      Cf = 2097151;
    te.parseHalf = function (t) {
      var e, n, i;
      return (
        (i = t[0] & 128 ? -1 : 1),
        (e = (t[0] & 124) >> 2),
        (n = ((t[0] & 3) << 8) | t[1]),
        e
          ? e === 31
            ? i * (n ? NaN : 1 / 0)
            : i * Math.pow(2, e - 25) * (1024 + n)
          : i * 5960464477539063e-23 * n
      );
    };
    function kf(r) {
      return r < 16 ? "0" + r.toString(16) : r.toString(16);
    }
    te.arrayBufferToBignumber = function (r) {
      let t = r.byteLength,
        e = "";
      for (let n = 0; n < t; n++) e += kf(r[n]);
      return new la(e, 16);
    };
    te.buildMap = (r) => {
      let t = new Map(),
        e = Object.keys(r),
        n = e.length;
      for (let i = 0; i < n; i++) t.set(e[i], r[e[i]]);
      return t;
    };
    te.buildInt32 = (r, t) => r * Mf + t;
    te.buildInt64 = (r, t, e, n) => {
      let i = te.buildInt32(r, t),
        s = te.buildInt32(e, n);
      return i > Cf ? new la(i).times(fa).plus(s) : i * fa + s;
    };
    te.writeHalf = function (t, e) {
      let n = Pf.allocUnsafe(4);
      n.writeFloatBE(e, 0);
      let i = n.readUInt32BE(0);
      if (i & 8191) return !1;
      var s = (i >> 16) & 32768;
      let o = (i >> 23) & 255,
        c = i & 8388607;
      if (o >= 113 && o <= 142) s += ((o - 112) << 10) + (c >> 13);
      else if (o >= 103 && o < 113) {
        if (c & ((1 << (126 - o)) - 1)) return !1;
        s += (c + 8388608) >> (126 - o);
      } else return !1;
      return t.writeUInt16BE(s, 0), !0;
    };
    te.keySorter = function (r, t) {
      var e = r[0].byteLength,
        n = t[0].byteLength;
      return e > n ? 1 : n > e ? -1 : r[0].compare(t[0]);
    };
    te.isNegativeZero = (r) => r === 0 && 1 / r < 0;
    te.nextPowerOf2 = (r) => {
      let t = 0;
      if (r && !(r & (r - 1))) return r;
      for (; r !== 0; ) (r >>= 1), (t += 1);
      return 1 << t;
    };
  });
  var as = At((hp, da) => {
    "use strict";
    var os = Cr(),
      $f = os.MT,
      En = os.SIMPLE,
      is = os.SYMS,
      ss = class r {
        constructor(t) {
          if (typeof t != "number")
            throw new Error("Invalid Simple type: " + typeof t);
          if (t < 0 || t > 255 || (t | 0) !== t)
            throw new Error("value must be a small positive integer: " + t);
          this.value = t;
        }
        toString() {
          return "simple(" + this.value + ")";
        }
        inspect() {
          return "simple(" + this.value + ")";
        }
        encodeCBOR(t) {
          return t._pushInt(this.value, $f.SIMPLE_FLOAT);
        }
        static isSimple(t) {
          return t instanceof r;
        }
        static decode(t, e) {
          switch ((e == null && (e = !0), t)) {
            case En.FALSE:
              return !1;
            case En.TRUE:
              return !0;
            case En.NULL:
              return e ? null : is.NULL;
            case En.UNDEFINED:
              return e ? void 0 : is.UNDEFINED;
            case -1:
              if (!e) throw new Error("Invalid BREAK");
              return is.BREAK;
            default:
              return new r(t);
          }
        }
      };
    da.exports = ss;
  });
  var us = At((dp, pa) => {
    "use strict";
    var cs = class r {
      constructor(t, e, n) {
        if (
          ((this.tag = t),
          (this.value = e),
          (this.err = n),
          typeof this.tag != "number")
        )
          throw new Error("Invalid tag type (" + typeof this.tag + ")");
        if (this.tag < 0 || (this.tag | 0) !== this.tag)
          throw new Error("Tag must be a positive integer: " + this.tag);
      }
      toString() {
        return `${this.tag}(${JSON.stringify(this.value)})`;
      }
      encodeCBOR(t) {
        return t._pushTag(this.tag), t.pushAny(this.value);
      }
      convert(t) {
        var e, n;
        if (
          ((n = t?.[this.tag]),
          typeof n != "function" &&
            ((n = r["_tag" + this.tag]), typeof n != "function"))
        )
          return this;
        try {
          return n.call(r, this.value);
        } catch (i) {
          return (e = i), (this.err = e), this;
        }
      }
    };
    pa.exports = cs;
  });
  var hs = At((pp, wa) => {
    "use strict";
    var ya = self.location
        ? self.location.protocol + "//" + self.location.host
        : "",
      fs = self.URL,
      ls = class {
        constructor(t = "", e = ya) {
          (this.super = new fs(t, e)),
            (this.path = this.pathname + this.search),
            (this.auth =
              this.username && this.password
                ? this.username + ":" + this.password
                : null),
            (this.query =
              this.search && this.search.startsWith("?")
                ? this.search.slice(1)
                : null);
        }
        get hash() {
          return this.super.hash;
        }
        get host() {
          return this.super.host;
        }
        get hostname() {
          return this.super.hostname;
        }
        get href() {
          return this.super.href;
        }
        get origin() {
          return this.super.origin;
        }
        get password() {
          return this.super.password;
        }
        get pathname() {
          return this.super.pathname;
        }
        get port() {
          return this.super.port;
        }
        get protocol() {
          return this.super.protocol;
        }
        get search() {
          return this.super.search;
        }
        get searchParams() {
          return this.super.searchParams;
        }
        get username() {
          return this.super.username;
        }
        set hash(t) {
          this.super.hash = t;
        }
        set host(t) {
          this.super.host = t;
        }
        set hostname(t) {
          this.super.hostname = t;
        }
        set href(t) {
          this.super.href = t;
        }
        set origin(t) {
          this.super.origin = t;
        }
        set password(t) {
          this.super.password = t;
        }
        set pathname(t) {
          this.super.pathname = t;
        }
        set port(t) {
          this.super.port = t;
        }
        set protocol(t) {
          this.super.protocol = t;
        }
        set search(t) {
          this.super.search = t;
        }
        set searchParams(t) {
          this.super.searchParams = t;
        }
        set username(t) {
          this.super.username = t;
        }
        createObjectURL(t) {
          return this.super.createObjectURL(t);
        }
        revokeObjectURL(t) {
          this.super.revokeObjectURL(t);
        }
        toJSON() {
          return this.super.toJSON();
        }
        toString() {
          return this.super.toString();
        }
        format() {
          return this.toString();
        }
      };
    function Vf(r) {
      if (typeof r == "string") return new fs(r).toString();
      if (!(r instanceof fs)) {
        let t = r.username && r.password ? `${r.username}:${r.password}@` : "",
          e = r.auth ? r.auth + "@" : "",
          n = r.port ? ":" + r.port : "",
          i = r.protocol ? r.protocol + "//" : "",
          s = r.host || "",
          o = r.hostname || "",
          c = r.search || (r.query ? "?" + r.query : ""),
          u = r.hash || "",
          y = r.pathname || "",
          w = r.path || y + c;
        return `${i}${t || e}${s || o + n}${w}${u}`;
      }
    }
    wa.exports = {
      URLWithLegacySupport: ls,
      URLSearchParams: self.URLSearchParams,
      defaultBase: ya,
      format: Vf,
    };
  });
  var xa = At((yp, ma) => {
    "use strict";
    var { URLWithLegacySupport: ga, format: qf } = hs();
    ma.exports = (r, t = {}, e = {}, n) => {
      let i = t.protocol ? t.protocol.replace(":", "") : "http";
      i = (e[i] || n || i) + ":";
      let s;
      try {
        s = new ga(r);
      } catch {
        s = {};
      }
      let o = Object.assign({}, t, {
        protocol: i || s.protocol,
        host: t.host || s.host,
      });
      return new ga(r, qf(o)).toString();
    };
  });
  var ds = At((wp, _a) => {
    "use strict";
    var {
        URLWithLegacySupport: Lf,
        format: Hf,
        URLSearchParams: Gf,
        defaultBase: Kf,
      } = hs(),
      jf = xa();
    _a.exports = {
      URL: Lf,
      URLSearchParams: Gf,
      format: Hf,
      relative: jf,
      defaultBase: Kf,
    };
  });
  var ps = At((gp, Ea) => {
    "use strict";
    var { Buffer: pr } = Pr(),
      ba = nn(),
      Df = Mr().BigNumber,
      Wf = ua(),
      $t = bn(),
      lt = Cr(),
      zf = as(),
      Yf = us(),
      { URL: Xf } = ds(),
      kr = class r {
        constructor(t) {
          (t = t || {}),
            !t.size || t.size < 65536
              ? (t.size = 65536)
              : (t.size = $t.nextPowerOf2(t.size)),
            (this._heap = new ArrayBuffer(t.size)),
            (this._heap8 = new Uint8Array(this._heap)),
            (this._buffer = pr.from(this._heap)),
            this._reset(),
            (this._knownTags = Object.assign(
              {
                0: (e) => new Date(e),
                1: (e) => new Date(e * 1e3),
                2: (e) => $t.arrayBufferToBignumber(e),
                3: (e) => lt.NEG_ONE.minus($t.arrayBufferToBignumber(e)),
                4: (e) => lt.TEN.pow(e[0]).times(e[1]),
                5: (e) => lt.TWO.pow(e[0]).times(e[1]),
                32: (e) => new Xf(e),
                35: (e) => new RegExp(e),
              },
              t.tags,
            )),
            (this.parser = Wf(
              global,
              {
                log: console.log.bind(console),
                pushInt: this.pushInt.bind(this),
                pushInt32: this.pushInt32.bind(this),
                pushInt32Neg: this.pushInt32Neg.bind(this),
                pushInt64: this.pushInt64.bind(this),
                pushInt64Neg: this.pushInt64Neg.bind(this),
                pushFloat: this.pushFloat.bind(this),
                pushFloatSingle: this.pushFloatSingle.bind(this),
                pushFloatDouble: this.pushFloatDouble.bind(this),
                pushTrue: this.pushTrue.bind(this),
                pushFalse: this.pushFalse.bind(this),
                pushUndefined: this.pushUndefined.bind(this),
                pushNull: this.pushNull.bind(this),
                pushInfinity: this.pushInfinity.bind(this),
                pushInfinityNeg: this.pushInfinityNeg.bind(this),
                pushNaN: this.pushNaN.bind(this),
                pushNaNNeg: this.pushNaNNeg.bind(this),
                pushArrayStart: this.pushArrayStart.bind(this),
                pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
                pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
                pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
                pushObjectStart: this.pushObjectStart.bind(this),
                pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
                pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
                pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
                pushByteString: this.pushByteString.bind(this),
                pushByteStringStart: this.pushByteStringStart.bind(this),
                pushUtf8String: this.pushUtf8String.bind(this),
                pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
                pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
                pushTagUnassigned: this.pushTagUnassigned.bind(this),
                pushTagStart: this.pushTagStart.bind(this),
                pushTagStart4: this.pushTagStart4.bind(this),
                pushTagStart8: this.pushTagStart8.bind(this),
                pushBreak: this.pushBreak.bind(this),
              },
              this._heap,
            ));
        }
        get _depth() {
          return this._parents.length;
        }
        get _currentParent() {
          return this._parents[this._depth - 1];
        }
        get _ref() {
          return this._currentParent.ref;
        }
        _closeParent() {
          var t = this._parents.pop();
          if (t.length > 0) throw new Error(`Missing ${t.length} elements`);
          switch (t.type) {
            case lt.PARENT.TAG:
              this._push(this.createTag(t.ref[0], t.ref[1]));
              break;
            case lt.PARENT.BYTE_STRING:
              this._push(this.createByteString(t.ref, t.length));
              break;
            case lt.PARENT.UTF8_STRING:
              this._push(this.createUtf8String(t.ref, t.length));
              break;
            case lt.PARENT.MAP:
              if (t.values % 2 > 0)
                throw new Error("Odd number of elements in the map");
              this._push(this.createMap(t.ref, t.length));
              break;
            case lt.PARENT.OBJECT:
              if (t.values % 2 > 0)
                throw new Error("Odd number of elements in the map");
              this._push(this.createObject(t.ref, t.length));
              break;
            case lt.PARENT.ARRAY:
              this._push(this.createArray(t.ref, t.length));
              break;
            default:
              break;
          }
          this._currentParent &&
            this._currentParent.type === lt.PARENT.TAG &&
            this._dec();
        }
        _dec() {
          let t = this._currentParent;
          t.length < 0 || (t.length--, t.length === 0 && this._closeParent());
        }
        _push(t, e) {
          let n = this._currentParent;
          switch ((n.values++, n.type)) {
            case lt.PARENT.ARRAY:
            case lt.PARENT.BYTE_STRING:
            case lt.PARENT.UTF8_STRING:
              n.length > -1
                ? (this._ref[this._ref.length - n.length] = t)
                : this._ref.push(t),
                this._dec();
              break;
            case lt.PARENT.OBJECT:
              n.tmpKey != null
                ? ((this._ref[n.tmpKey] = t), (n.tmpKey = null), this._dec())
                : ((n.tmpKey = t),
                  typeof n.tmpKey != "string" &&
                    ((n.type = lt.PARENT.MAP), (n.ref = $t.buildMap(n.ref))));
              break;
            case lt.PARENT.MAP:
              n.tmpKey != null
                ? (this._ref.set(n.tmpKey, t), (n.tmpKey = null), this._dec())
                : (n.tmpKey = t);
              break;
            case lt.PARENT.TAG:
              this._ref.push(t), e || this._dec();
              break;
            default:
              throw new Error("Unknown parent type");
          }
        }
        _createParent(t, e, n) {
          this._parents[this._depth] = {
            type: e,
            length: n,
            ref: t,
            values: 0,
            tmpKey: null,
          };
        }
        _reset() {
          (this._res = []),
            (this._parents = [
              {
                type: lt.PARENT.ARRAY,
                length: -1,
                ref: this._res,
                values: 0,
                tmpKey: null,
              },
            ]);
        }
        createTag(t, e) {
          let n = this._knownTags[t];
          return n ? n(e) : new Yf(t, e);
        }
        createMap(t, e) {
          return t;
        }
        createObject(t, e) {
          return t;
        }
        createArray(t, e) {
          return t;
        }
        createByteString(t, e) {
          return pr.concat(t);
        }
        createByteStringFromHeap(t, e) {
          return t === e ? pr.alloc(0) : pr.from(this._heap.slice(t, e));
        }
        createInt(t) {
          return t;
        }
        createInt32(t, e) {
          return $t.buildInt32(t, e);
        }
        createInt64(t, e, n, i) {
          return $t.buildInt64(t, e, n, i);
        }
        createFloat(t) {
          return t;
        }
        createFloatSingle(t, e, n, i) {
          return ba.read([t, e, n, i], 0, !1, 23, 4);
        }
        createFloatDouble(t, e, n, i, s, o, c, u) {
          return ba.read([t, e, n, i, s, o, c, u], 0, !1, 52, 8);
        }
        createInt32Neg(t, e) {
          return -1 - $t.buildInt32(t, e);
        }
        createInt64Neg(t, e, n, i) {
          let s = $t.buildInt32(t, e),
            o = $t.buildInt32(n, i);
          return s > lt.MAX_SAFE_HIGH
            ? lt.NEG_ONE.minus(new Df(s).times(lt.SHIFT32).plus(o))
            : -1 - (s * lt.SHIFT32 + o);
        }
        createTrue() {
          return !0;
        }
        createFalse() {
          return !1;
        }
        createNull() {
          return null;
        }
        createUndefined() {}
        createInfinity() {
          return 1 / 0;
        }
        createInfinityNeg() {
          return -1 / 0;
        }
        createNaN() {
          return NaN;
        }
        createNaNNeg() {
          return NaN;
        }
        createUtf8String(t, e) {
          return t.join("");
        }
        createUtf8StringFromHeap(t, e) {
          return t === e ? "" : this._buffer.toString("utf8", t, e);
        }
        createSimpleUnassigned(t) {
          return new zf(t);
        }
        pushInt(t) {
          this._push(this.createInt(t));
        }
        pushInt32(t, e) {
          this._push(this.createInt32(t, e));
        }
        pushInt64(t, e, n, i) {
          this._push(this.createInt64(t, e, n, i));
        }
        pushFloat(t) {
          this._push(this.createFloat(t));
        }
        pushFloatSingle(t, e, n, i) {
          this._push(this.createFloatSingle(t, e, n, i));
        }
        pushFloatDouble(t, e, n, i, s, o, c, u) {
          this._push(this.createFloatDouble(t, e, n, i, s, o, c, u));
        }
        pushInt32Neg(t, e) {
          this._push(this.createInt32Neg(t, e));
        }
        pushInt64Neg(t, e, n, i) {
          this._push(this.createInt64Neg(t, e, n, i));
        }
        pushTrue() {
          this._push(this.createTrue());
        }
        pushFalse() {
          this._push(this.createFalse());
        }
        pushNull() {
          this._push(this.createNull());
        }
        pushUndefined() {
          this._push(this.createUndefined());
        }
        pushInfinity() {
          this._push(this.createInfinity());
        }
        pushInfinityNeg() {
          this._push(this.createInfinityNeg());
        }
        pushNaN() {
          this._push(this.createNaN());
        }
        pushNaNNeg() {
          this._push(this.createNaNNeg());
        }
        pushArrayStart() {
          this._createParent([], lt.PARENT.ARRAY, -1);
        }
        pushArrayStartFixed(t) {
          this._createArrayStartFixed(t);
        }
        pushArrayStartFixed32(t, e) {
          let n = $t.buildInt32(t, e);
          this._createArrayStartFixed(n);
        }
        pushArrayStartFixed64(t, e, n, i) {
          let s = $t.buildInt64(t, e, n, i);
          this._createArrayStartFixed(s);
        }
        pushObjectStart() {
          this._createObjectStartFixed(-1);
        }
        pushObjectStartFixed(t) {
          this._createObjectStartFixed(t);
        }
        pushObjectStartFixed32(t, e) {
          let n = $t.buildInt32(t, e);
          this._createObjectStartFixed(n);
        }
        pushObjectStartFixed64(t, e, n, i) {
          let s = $t.buildInt64(t, e, n, i);
          this._createObjectStartFixed(s);
        }
        pushByteStringStart() {
          this._parents[this._depth] = {
            type: lt.PARENT.BYTE_STRING,
            length: -1,
            ref: [],
            values: 0,
            tmpKey: null,
          };
        }
        pushByteString(t, e) {
          this._push(this.createByteStringFromHeap(t, e));
        }
        pushUtf8StringStart() {
          this._parents[this._depth] = {
            type: lt.PARENT.UTF8_STRING,
            length: -1,
            ref: [],
            values: 0,
            tmpKey: null,
          };
        }
        pushUtf8String(t, e) {
          this._push(this.createUtf8StringFromHeap(t, e));
        }
        pushSimpleUnassigned(t) {
          this._push(this.createSimpleUnassigned(t));
        }
        pushTagStart(t) {
          this._parents[this._depth] = {
            type: lt.PARENT.TAG,
            length: 1,
            ref: [t],
          };
        }
        pushTagStart4(t, e) {
          this.pushTagStart($t.buildInt32(t, e));
        }
        pushTagStart8(t, e, n, i) {
          this.pushTagStart($t.buildInt64(t, e, n, i));
        }
        pushTagUnassigned(t) {
          this._push(this.createTag(t));
        }
        pushBreak() {
          if (this._currentParent.length > -1)
            throw new Error("Unexpected break");
          this._closeParent();
        }
        _createObjectStartFixed(t) {
          if (t === 0) {
            this._push(this.createObject({}));
            return;
          }
          this._createParent({}, lt.PARENT.OBJECT, t);
        }
        _createArrayStartFixed(t) {
          if (t === 0) {
            this._push(this.createArray([]));
            return;
          }
          this._createParent(new Array(t), lt.PARENT.ARRAY, t);
        }
        _decode(t) {
          if (t.byteLength === 0) throw new Error("Input too short");
          this._reset(), this._heap8.set(t);
          let e = this.parser.parse(t.byteLength);
          if (this._depth > 1) {
            for (; this._currentParent.length === 0; ) this._closeParent();
            if (this._depth > 1) throw new Error("Undeterminated nesting");
          }
          if (e > 0) throw new Error("Failed to parse");
          if (this._res.length === 0) throw new Error("No valid result");
        }
        decodeFirst(t) {
          return this._decode(t), this._res[0];
        }
        decodeAll(t) {
          return this._decode(t), this._res;
        }
        static decode(t, e) {
          return (
            typeof t == "string" && (t = pr.from(t, e || "hex")),
            new r({ size: t.length }).decodeFirst(t)
          );
        }
        static decodeAll(t, e) {
          return (
            typeof t == "string" && (t = pr.from(t, e || "hex")),
            new r({ size: t.length }).decodeAll(t)
          );
        }
      };
    kr.decodeFirst = kr.decode;
    Ea.exports = kr;
  });
  var Ta = At((mp, va) => {
    "use strict";
    var { Buffer: ys } = Pr(),
      Jf = ps(),
      Zf = bn(),
      ws = class r extends Jf {
        createTag(t, e) {
          return `${t}(${e})`;
        }
        createInt(t) {
          return super.createInt(t).toString();
        }
        createInt32(t, e) {
          return super.createInt32(t, e).toString();
        }
        createInt64(t, e, n, i) {
          return super.createInt64(t, e, n, i).toString();
        }
        createInt32Neg(t, e) {
          return super.createInt32Neg(t, e).toString();
        }
        createInt64Neg(t, e, n, i) {
          return super.createInt64Neg(t, e, n, i).toString();
        }
        createTrue() {
          return "true";
        }
        createFalse() {
          return "false";
        }
        createFloat(t) {
          let e = super.createFloat(t);
          return Zf.isNegativeZero(t) ? "-0_1" : `${e}_1`;
        }
        createFloatSingle(t, e, n, i) {
          return `${super.createFloatSingle(t, e, n, i)}_2`;
        }
        createFloatDouble(t, e, n, i, s, o, c, u) {
          return `${super.createFloatDouble(t, e, n, i, s, o, c, u)}_3`;
        }
        createByteString(t, e) {
          let n = t.join(", ");
          return e === -1 ? `(_ ${n})` : `h'${n}`;
        }
        createByteStringFromHeap(t, e) {
          return `h'${ys.from(super.createByteStringFromHeap(t, e)).toString("hex")}'`;
        }
        createInfinity() {
          return "Infinity_1";
        }
        createInfinityNeg() {
          return "-Infinity_1";
        }
        createNaN() {
          return "NaN_1";
        }
        createNaNNeg() {
          return "-NaN_1";
        }
        createNull() {
          return "null";
        }
        createUndefined() {
          return "undefined";
        }
        createSimpleUnassigned(t) {
          return `simple(${t})`;
        }
        createArray(t, e) {
          let n = super.createArray(t, e);
          return e === -1 ? `[_ ${n.join(", ")}]` : `[${n.join(", ")}]`;
        }
        createMap(t, e) {
          let n = super.createMap(t),
            i = Array.from(n.keys()).reduce(Aa(n), "");
          return e === -1 ? `{_ ${i}}` : `{${i}}`;
        }
        createObject(t, e) {
          let n = super.createObject(t),
            i = Object.keys(n).reduce(Aa(n), "");
          return e === -1 ? `{_ ${i}}` : `{${i}}`;
        }
        createUtf8String(t, e) {
          let n = t.join(", ");
          return e === -1 ? `(_ ${n})` : `"${n}"`;
        }
        createUtf8StringFromHeap(t, e) {
          return `"${ys.from(super.createUtf8StringFromHeap(t, e)).toString("utf8")}"`;
        }
        static diagnose(t, e) {
          return (
            typeof t == "string" && (t = ys.from(t, e || "hex")),
            new r().decodeFirst(t)
          );
        }
      };
    va.exports = ws;
    function Aa(r) {
      return (t, e) => (t ? `${t}, ${e}: ${r[e]}` : `${e}: ${r[e]}`);
    }
  });
  var Ua = At((xp, Na) => {
    "use strict";
    var { Buffer: de } = Pr(),
      { URL: Qf } = ds(),
      ms = Mr().BigNumber,
      gs = bn(),
      St = Cr(),
      ie = St.MT,
      An = St.NUMBYTES,
      Ba = St.SHIFT32,
      Sa = St.SYMS,
      yr = St.TAG,
      tl = (St.MT.SIMPLE_FLOAT << 5) | St.NUMBYTES.TWO,
      el = (St.MT.SIMPLE_FLOAT << 5) | St.NUMBYTES.FOUR,
      rl = (St.MT.SIMPLE_FLOAT << 5) | St.NUMBYTES.EIGHT,
      nl = (St.MT.SIMPLE_FLOAT << 5) | St.SIMPLE.TRUE,
      il = (St.MT.SIMPLE_FLOAT << 5) | St.SIMPLE.FALSE,
      sl = (St.MT.SIMPLE_FLOAT << 5) | St.SIMPLE.UNDEFINED,
      Ia = (St.MT.SIMPLE_FLOAT << 5) | St.SIMPLE.NULL,
      ol = new ms("0x20000000000000"),
      al = de.from("f97e00", "hex"),
      cl = de.from("f9fc00", "hex"),
      ul = de.from("f97c00", "hex");
    function fl(r) {
      return {}.toString.call(r).slice(8, -1);
    }
    var xs = class r {
      constructor(t) {
        (t = t || {}),
          (this.streaming = typeof t.stream == "function"),
          (this.onData = t.stream),
          (this.semanticTypes = [
            [Qf, this._pushUrl],
            [ms, this._pushBigNumber],
          ]);
        let e = t.genTypes || [],
          n = e.length;
        for (let i = 0; i < n; i++) this.addSemanticType(e[i][0], e[i][1]);
        this._reset();
      }
      addSemanticType(t, e) {
        let n = this.semanticTypes.length;
        for (let i = 0; i < n; i++)
          if (this.semanticTypes[i][0] === t) {
            let o = this.semanticTypes[i][1];
            return (this.semanticTypes[i][1] = e), o;
          }
        return this.semanticTypes.push([t, e]), null;
      }
      push(t) {
        return (
          t &&
            ((this.result[this.offset] = t),
            (this.resultMethod[this.offset] = 0),
            (this.resultLength[this.offset] = t.length),
            this.offset++,
            this.streaming && this.onData(this.finalize())),
          !0
        );
      }
      pushWrite(t, e, n) {
        return (
          (this.result[this.offset] = t),
          (this.resultMethod[this.offset] = e),
          (this.resultLength[this.offset] = n),
          this.offset++,
          this.streaming && this.onData(this.finalize()),
          !0
        );
      }
      _pushUInt8(t) {
        return this.pushWrite(t, 1, 1);
      }
      _pushUInt16BE(t) {
        return this.pushWrite(t, 2, 2);
      }
      _pushUInt32BE(t) {
        return this.pushWrite(t, 3, 4);
      }
      _pushDoubleBE(t) {
        return this.pushWrite(t, 4, 8);
      }
      _pushNaN() {
        return this.push(al);
      }
      _pushInfinity(t) {
        let e = t < 0 ? cl : ul;
        return this.push(e);
      }
      _pushFloat(t) {
        let e = de.allocUnsafe(2);
        if (gs.writeHalf(e, t) && gs.parseHalf(e) === t)
          return this._pushUInt8(tl) && this.push(e);
        let n = de.allocUnsafe(4);
        return (
          n.writeFloatBE(t, 0),
          n.readFloatBE(0) === t
            ? this._pushUInt8(el) && this.push(n)
            : this._pushUInt8(rl) && this._pushDoubleBE(t)
        );
      }
      _pushInt(t, e, n) {
        let i = e << 5;
        return t < 24
          ? this._pushUInt8(i | t)
          : t <= 255
            ? this._pushUInt8(i | An.ONE) && this._pushUInt8(t)
            : t <= 65535
              ? this._pushUInt8(i | An.TWO) && this._pushUInt16BE(t)
              : t <= 4294967295
                ? this._pushUInt8(i | An.FOUR) && this._pushUInt32BE(t)
                : t <= Number.MAX_SAFE_INTEGER
                  ? this._pushUInt8(i | An.EIGHT) &&
                    this._pushUInt32BE(Math.floor(t / Ba)) &&
                    this._pushUInt32BE(t % Ba)
                  : e === ie.NEG_INT
                    ? this._pushFloat(n)
                    : this._pushFloat(t);
      }
      _pushIntNum(t) {
        return t < 0
          ? this._pushInt(-t - 1, ie.NEG_INT, t)
          : this._pushInt(t, ie.POS_INT);
      }
      _pushNumber(t) {
        switch (!1) {
          case t === t:
            return this._pushNaN(t);
          case isFinite(t):
            return this._pushInfinity(t);
          case t % 1 !== 0:
            return this._pushIntNum(t);
          default:
            return this._pushFloat(t);
        }
      }
      _pushString(t) {
        let e = de.byteLength(t, "utf8");
        return this._pushInt(e, ie.UTF8_STRING) && this.pushWrite(t, 5, e);
      }
      _pushBoolean(t) {
        return this._pushUInt8(t ? nl : il);
      }
      _pushUndefined(t) {
        return this._pushUInt8(sl);
      }
      _pushArray(t, e) {
        let n = e.length;
        if (!t._pushInt(n, ie.ARRAY)) return !1;
        for (let i = 0; i < n; i++) if (!t.pushAny(e[i])) return !1;
        return !0;
      }
      _pushTag(t) {
        return this._pushInt(t, ie.TAG);
      }
      _pushDate(t, e) {
        return t._pushTag(yr.DATE_EPOCH) && t.pushAny(Math.round(e / 1e3));
      }
      _pushBuffer(t, e) {
        return t._pushInt(e.length, ie.BYTE_STRING) && t.push(e);
      }
      _pushNoFilter(t, e) {
        return t._pushBuffer(t, e.slice());
      }
      _pushRegexp(t, e) {
        return t._pushTag(yr.REGEXP) && t.pushAny(e.source);
      }
      _pushSet(t, e) {
        if (!t._pushInt(e.size, ie.ARRAY)) return !1;
        for (let n of e) if (!t.pushAny(n)) return !1;
        return !0;
      }
      _pushUrl(t, e) {
        return t._pushTag(yr.URI) && t.pushAny(e.format());
      }
      _pushBigint(t) {
        let e = yr.POS_BIGINT;
        t.isNegative() && ((t = t.negated().minus(1)), (e = yr.NEG_BIGINT));
        let n = t.toString(16);
        n.length % 2 && (n = "0" + n);
        let i = de.from(n, "hex");
        return this._pushTag(e) && this._pushBuffer(this, i);
      }
      _pushBigNumber(t, e) {
        if (e.isNaN()) return t._pushNaN();
        if (!e.isFinite())
          return t._pushInfinity(e.isNegative() ? -1 / 0 : 1 / 0);
        if (e.isInteger()) return t._pushBigint(e);
        if (!(t._pushTag(yr.DECIMAL_FRAC) && t._pushInt(2, ie.ARRAY)))
          return !1;
        let n = e.decimalPlaces(),
          i = e.multipliedBy(new ms(10).pow(n));
        return t._pushIntNum(-n)
          ? i.abs().isLessThan(ol)
            ? t._pushIntNum(i.toNumber())
            : t._pushBigint(i)
          : !1;
      }
      _pushMap(t, e) {
        return t._pushInt(e.size, ie.MAP)
          ? this._pushRawMap(e.size, Array.from(e))
          : !1;
      }
      _pushObject(t) {
        if (!t) return this._pushUInt8(Ia);
        for (var e = this.semanticTypes.length, n = 0; n < e; n++)
          if (t instanceof this.semanticTypes[n][0])
            return this.semanticTypes[n][1].call(t, this, t);
        var i = t.encodeCBOR;
        if (typeof i == "function") return i.call(t, this);
        var s = Object.keys(t),
          o = s.length;
        return this._pushInt(o, ie.MAP)
          ? this._pushRawMap(
              o,
              s.map((c) => [c, t[c]]),
            )
          : !1;
      }
      _pushRawMap(t, e) {
        e = e
          .map(function (i) {
            return (i[0] = r.encode(i[0])), i;
          })
          .sort(gs.keySorter);
        for (var n = 0; n < t; n++)
          if (!this.push(e[n][0]) || !this.pushAny(e[n][1])) return !1;
        return !0;
      }
      write(t) {
        return this.pushAny(t);
      }
      pushAny(t) {
        var e = fl(t);
        switch (e) {
          case "Number":
            return this._pushNumber(t);
          case "String":
            return this._pushString(t);
          case "Boolean":
            return this._pushBoolean(t);
          case "Object":
            return this._pushObject(t);
          case "Array":
            return this._pushArray(this, t);
          case "Uint8Array":
            return this._pushBuffer(this, de.isBuffer(t) ? t : de.from(t));
          case "Null":
            return this._pushUInt8(Ia);
          case "Undefined":
            return this._pushUndefined(t);
          case "Map":
            return this._pushMap(this, t);
          case "Set":
            return this._pushSet(this, t);
          case "URL":
            return this._pushUrl(this, t);
          case "BigNumber":
            return this._pushBigNumber(this, t);
          case "Date":
            return this._pushDate(this, t);
          case "RegExp":
            return this._pushRegexp(this, t);
          case "Symbol":
            switch (t) {
              case Sa.NULL:
                return this._pushObject(null);
              case Sa.UNDEFINED:
                return this._pushUndefined(void 0);
              default:
                throw new Error("Unknown symbol: " + t.toString());
            }
          default:
            throw new Error(
              "Unknown type: " + typeof t + ", " + (t ? t.toString() : ""),
            );
        }
      }
      finalize() {
        if (this.offset === 0) return null;
        for (
          var t = this.result,
            e = this.resultLength,
            n = this.resultMethod,
            i = this.offset,
            s = 0,
            o = 0;
          o < i;
          o++
        )
          s += e[o];
        var c = de.allocUnsafe(s),
          u = 0,
          y = 0;
        for (o = 0; o < i; o++) {
          switch (((y = e[o]), n[o])) {
            case 0:
              t[o].copy(c, u);
              break;
            case 1:
              c.writeUInt8(t[o], u, !0);
              break;
            case 2:
              c.writeUInt16BE(t[o], u, !0);
              break;
            case 3:
              c.writeUInt32BE(t[o], u, !0);
              break;
            case 4:
              c.writeDoubleBE(t[o], u, !0);
              break;
            case 5:
              c.write(t[o], u, y, "utf8");
              break;
            default:
              throw new Error("unkown method");
          }
          u += y;
        }
        var w = c;
        return this._reset(), w;
      }
      _reset() {
        (this.result = []),
          (this.resultMethod = []),
          (this.resultLength = []),
          (this.offset = 0);
      }
      static encode(t) {
        let e = new r();
        if (!e.pushAny(t)) throw new Error("Failed to encode input");
        return e.finalize();
      }
    };
    Na.exports = xs;
  });
  var vn = At((It) => {
    "use strict";
    It.Diagnose = Ta();
    It.Decoder = ps();
    It.Encoder = Ua();
    It.Simple = as();
    It.Tagged = us();
    It.decodeAll = It.Decoder.decodeAll;
    It.decodeFirst = It.Decoder.decodeFirst;
    It.diagnose = It.Diagnose.diagnose;
    It.encode = It.Encoder.encode;
    It.decode = It.Decoder.decode;
    It.leveldb = {
      decode: It.Decoder.decodeAll,
      encode: It.Encoder.encode,
      buffer: !0,
      name: "cbor",
    };
  });
  function pe(...r) {
    let t = new Uint8Array(r.reduce((n, i) => n + i.byteLength, 0)),
      e = 0;
    for (let n of r) t.set(new Uint8Array(n), e), (e += n.byteLength);
    return t.buffer;
  }
  function Tt(r) {
    return [...new Uint8Array(r)]
      .map((t) => t.toString(16).padStart(2, "0"))
      .join("");
  }
  function Gt(r) {
    if (!ll.test(r)) throw new Error("Invalid hexadecimal string.");
    let t = [...r]
      .reduce(
        (e, n, i) => ((e[(i / 2) | 0] = (e[(i / 2) | 0] || "") + n), e),
        [],
      )
      .map((e) => Number.parseInt(e, 16));
    return new Uint8Array(t).buffer;
  }
  function _s(r, t) {
    if (r.byteLength !== t.byteLength) return r.byteLength - t.byteLength;
    let e = new Uint8Array(r),
      n = new Uint8Array(t);
    for (let i = 0; i < e.length; i++) if (e[i] !== n[i]) return e[i] - n[i];
    return 0;
  }
  function Tn(r, t) {
    return _s(r, t) === 0;
  }
  function Ke(r) {
    return new DataView(r.buffer, r.byteOffset, r.byteLength).buffer;
  }
  function Bn(r) {
    return r instanceof Uint8Array
      ? Ke(r)
      : r instanceof ArrayBuffer
        ? r
        : Array.isArray(r)
          ? Ke(new Uint8Array(r))
          : "buffer" in r
            ? Bn(r.buffer)
            : Ke(new Uint8Array(r));
  }
  var ll,
    zt = ut(() => {
      ll = new RegExp(/^[0-9a-fA-F]+$/);
    });
  function Fe(r) {
    return Ke(Co.create().update(new Uint8Array(r)).digest());
  }
  function Sn(r) {
    if (r instanceof Ra.default.Tagged) return Sn(r.value);
    if (typeof r == "string") return Fa(r);
    if (typeof r == "number") return Fe(Re(r));
    if (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) return Fe(r);
    if (Array.isArray(r)) {
      let t = r.map(Sn);
      return Fe(pe(...t));
    } else {
      if (r && typeof r == "object" && r._isPrincipal)
        return Fe(r.toUint8Array());
      if (typeof r == "object" && r !== null && typeof r.toHash == "function")
        return Sn(r.toHash());
      if (typeof r == "object") return bs(r);
      if (typeof r == "bigint") return Fe(Re(r));
    }
    throw Object.assign(
      new Error(`Attempt to hash a value of unsupported type: ${r}`),
      { value: r },
    );
  }
  function wr(r) {
    return bs(r);
  }
  function bs(r) {
    let n = Object.entries(r)
        .filter(([, o]) => o !== void 0)
        .map(([o, c]) => {
          let u = Fa(o),
            y = Sn(c);
          return [u, y];
        })
        .sort(([o], [c]) => _s(o, c)),
      i = pe(...n.map((o) => pe(...o)));
    return Fe(i);
  }
  var Ra,
    Fa,
    $r = ut(() => {
      lr();
      Ra = Be(vn());
      Ui();
      zt();
      Fa = (r) => {
        let t = new TextEncoder().encode(r);
        return Fe(t);
      };
    });
  var vs = At((pt) => {
    "use strict";
    Object.defineProperty(pt, "__esModule", { value: !0 });
    var pl = 9007199254740992;
    function Ae(r, ...t) {
      let e = new Uint8Array(
        r.byteLength + t.reduce((i, s) => i + s.byteLength, 0),
      );
      e.set(new Uint8Array(r), 0);
      let n = r.byteLength;
      for (let i of t) e.set(new Uint8Array(i), n), (n += i.byteLength);
      return e.buffer;
    }
    function se(r, t, e) {
      e = e.replace(/[^0-9a-fA-F]/g, "");
      let n = 2 ** (t - 24);
      e = e.slice(-n * 2).padStart(n * 2, "0");
      let i = [(r << 5) + t].concat(e.match(/../g).map((s) => parseInt(s, 16)));
      return new Uint8Array(i).buffer;
    }
    function In(r, t) {
      if (t < 24) return new Uint8Array([(r << 5) + t]).buffer;
      {
        let e = t <= 255 ? 24 : t <= 65535 ? 25 : t <= 4294967295 ? 26 : 27;
        return se(r, e, t.toString(16));
      }
    }
    function Oa(r) {
      let t = [];
      for (let e = 0; e < r.length; e++) {
        let n = r.charCodeAt(e);
        n < 128
          ? t.push(n)
          : n < 2048
            ? t.push(192 | (n >> 6), 128 | (n & 63))
            : n < 55296 || n >= 57344
              ? t.push(224 | (n >> 12), 128 | ((n >> 6) & 63), 128 | (n & 63))
              : (e++,
                (n = ((n & 1023) << 10) | (r.charCodeAt(e) & 1023)),
                t.push(
                  240 | (n >> 18),
                  128 | ((n >> 12) & 63),
                  128 | ((n >> 6) & 63),
                  128 | (n & 63),
                ));
      }
      return Ae(new Uint8Array(In(3, r.length)), new Uint8Array(t));
    }
    function yl(r, t) {
      if (r == 14277111) return Ae(new Uint8Array([217, 217, 247]), t);
      if (r < 24) return Ae(new Uint8Array([192 + r]), t);
      {
        let e = r <= 255 ? 24 : r <= 65535 ? 25 : r <= 4294967295 ? 26 : 27,
          n = 2 ** (e - 24),
          i = r
            .toString(16)
            .slice(-n * 2)
            .padStart(n * 2, "0"),
          s = [192 + e].concat(i.match(/../g).map((o) => parseInt(o, 16)));
        return new Uint8Array(s).buffer;
      }
    }
    pt.tagged = yl;
    function Vr(r) {
      return new Uint8Array(r).buffer;
    }
    pt.raw = Vr;
    function Es(r) {
      if (isNaN(r)) throw new RangeError("Invalid number.");
      r = Math.min(Math.max(0, r), 23);
      let t = [0 + r];
      return new Uint8Array(t).buffer;
    }
    pt.uSmall = Es;
    function Pa(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, r), 255)), (r = r.toString(16)), se(0, 24, r)
      );
    }
    pt.u8 = Pa;
    function Ma(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, r), 65535)),
        (r = r.toString(16)),
        se(0, 25, r)
      );
    }
    pt.u16 = Ma;
    function Ca(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, r), 4294967295)),
        (r = r.toString(16)),
        se(0, 26, r)
      );
    }
    pt.u32 = Ca;
    function As(r, t) {
      if (typeof r == "string" && t == 16) {
        if (r.match(/[^0-9a-fA-F]/)) throw new RangeError("Invalid number.");
        return se(0, 27, r);
      }
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, r), pl)), (r = r.toString(16)), se(0, 27, r)
      );
    }
    pt.u64 = As;
    function ka(r) {
      if (isNaN(r)) throw new RangeError("Invalid number.");
      if (r === 0) return Es(0);
      r = Math.min(Math.max(0, -r), 24) - 1;
      let t = [32 + r];
      return new Uint8Array(t).buffer;
    }
    pt.iSmall = ka;
    function $a(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, -r - 1), 255)),
        (r = r.toString(16)),
        se(1, 24, r)
      );
    }
    pt.i8 = $a;
    function Va(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, -r - 1), 65535)),
        (r = r.toString(16)),
        se(1, 25, r)
      );
    }
    pt.i16 = Va;
    function qa(r, t) {
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, -r - 1), 4294967295)),
        (r = r.toString(16)),
        se(1, 26, r)
      );
    }
    pt.i32 = qa;
    function La(r, t) {
      if (typeof r == "string" && t == 16) {
        if (
          (r.startsWith("-") ? (r = r.slice(1)) : (r = "0"),
          r.match(/[^0-9a-fA-F]/) || r.length > 16)
        )
          throw new RangeError("Invalid number.");
        let e = !1,
          n = r.split("").reduceRight((i, s) => {
            if (e) return s + i;
            let o = parseInt(s, 16) - 1;
            return o >= 0 ? ((e = !0), o.toString(16) + i) : "f" + i;
          }, "");
        return e ? se(1, 27, n) : As(0);
      }
      if (((r = parseInt("" + r, t)), isNaN(r)))
        throw new RangeError("Invalid number.");
      return (
        (r = Math.min(Math.max(0, -r - 1), 9007199254740992)),
        (r = r.toString(16)),
        se(1, 27, r)
      );
    }
    pt.i64 = La;
    function wl(r) {
      return r >= 0
        ? r < 24
          ? Es(r)
          : r <= 255
            ? Pa(r)
            : r <= 65535
              ? Ma(r)
              : r <= 4294967295
                ? Ca(r)
                : As(r)
        : r >= -24
          ? ka(r)
          : r >= -255
            ? $a(r)
            : r >= -65535
              ? Va(r)
              : r >= -4294967295
                ? qa(r)
                : La(r);
    }
    pt.number = wl;
    function gl(r) {
      return Ae(In(2, r.byteLength), r);
    }
    pt.bytes = gl;
    function ml(r) {
      return Oa(r);
    }
    pt.string = ml;
    function xl(r) {
      return Ae(In(4, r.length), ...r);
    }
    pt.array = xl;
    function _l(r, t = !1) {
      r instanceof Map || (r = new Map(Object.entries(r)));
      let e = Array.from(r.entries());
      return (
        t && (e = e.sort(([n], [i]) => n.localeCompare(i))),
        Ae(In(5, r.size), ...e.map(([n, i]) => Ae(Oa(n), i)))
      );
    }
    pt.map = _l;
    function bl(r) {
      let t = new Float32Array([r]);
      return Ae(new Uint8Array([250]), new Uint8Array(t.buffer));
    }
    pt.singleFloat = bl;
    function El(r) {
      let t = new Float64Array([r]);
      return Ae(new Uint8Array([251]), new Uint8Array(t.buffer));
    }
    pt.doubleFloat = El;
    function Al(r) {
      return r ? Ha() : Ga();
    }
    pt.bool = Al;
    function Ha() {
      return Vr(new Uint8Array([245]));
    }
    pt.true_ = Ha;
    function Ga() {
      return Vr(new Uint8Array([244]));
    }
    pt.false_ = Ga;
    function vl() {
      return Vr(new Uint8Array([246]));
    }
    pt.null_ = vl;
    function Tl() {
      return Vr(new Uint8Array([247]));
    }
    pt.undefined_ = Tl;
  });
  var Ka = At((Oe) => {
    "use strict";
    var Bl =
      (Oe && Oe.__importStar) ||
      function (r) {
        if (r && r.__esModule) return r;
        var t = {};
        if (r != null)
          for (var e in r) Object.hasOwnProperty.call(r, e) && (t[e] = r[e]);
        return (t.default = r), t;
      };
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    var oe = Bl(vs()),
      Sl = [
        ArrayBuffer,
        Uint8Array,
        Uint16Array,
        Uint32Array,
        Int8Array,
        Int16Array,
        Int32Array,
        Float32Array,
        Float64Array,
      ],
      Nn = class {
        constructor(t, e = !1) {
          (this._serializer = t),
            (this._stable = e),
            (this.name = "jsonDefault"),
            (this.priority = -100);
        }
        match(t) {
          return (
            ["undefined", "boolean", "number", "string", "object"].indexOf(
              typeof t,
            ) != -1
          );
        }
        encode(t) {
          switch (typeof t) {
            case "undefined":
              return oe.undefined_();
            case "boolean":
              return oe.bool(t);
            case "number":
              return Math.floor(t) === t ? oe.number(t) : oe.doubleFloat(t);
            case "string":
              return oe.string(t);
            case "object":
              if (t === null) return oe.null_();
              if (Array.isArray(t))
                return oe.array(
                  t.map((e) => this._serializer.serializeValue(e)),
                );
              if (Sl.find((e) => t instanceof e)) return oe.bytes(t.buffer);
              if (Object.getOwnPropertyNames(t).indexOf("toJSON") !== -1)
                return this.encode(t.toJSON());
              if (t instanceof Map) {
                let e = new Map();
                for (let [n, i] of t.entries())
                  e.set(n, this._serializer.serializeValue(i));
                return oe.map(e, this._stable);
              } else {
                let e = new Map();
                for (let [n, i] of Object.entries(t))
                  e.set(n, this._serializer.serializeValue(i));
                return oe.map(e, this._stable);
              }
            default:
              throw new Error("Invalid value.");
          }
        }
      };
    Oe.JsonDefaultCborEncoder = Nn;
    var Un = class {
      constructor() {
        (this.name = "cborEncoder"), (this.priority = -90);
      }
      match(t) {
        return typeof t == "object" && typeof t.toCBOR == "function";
      }
      encode(t) {
        return t.toCBOR();
      }
    };
    Oe.ToCborEncoder = Un;
    var Rn = class {
      constructor() {
        this._encoders = new Set();
      }
      static withDefaultEncoders(t = !1) {
        let e = new this();
        return e.addEncoder(new Nn(e, t)), e.addEncoder(new Un()), e;
      }
      removeEncoder(t) {
        for (let e of this._encoders.values())
          e.name == t && this._encoders.delete(e);
      }
      addEncoder(t) {
        this._encoders.add(t);
      }
      getEncoderFor(t) {
        let e = null;
        for (let n of this._encoders)
          (!e || n.priority > e.priority) && n.match(t) && (e = n);
        if (e === null) throw new Error("Could not find an encoder for value.");
        return e;
      }
      serializeValue(t) {
        return this.getEncoderFor(t).encode(t);
      }
      serialize(t) {
        return this.serializeValue(t);
      }
    };
    Oe.CborSerializer = Rn;
    var Ts = class extends Rn {
      serialize(t) {
        return oe.raw(
          new Uint8Array([
            ...new Uint8Array([217, 217, 247]),
            ...new Uint8Array(super.serializeValue(t)),
          ]),
        );
      }
    };
    Oe.SelfDescribeCborSerializer = Ts;
  });
  var qr = At((je) => {
    "use strict";
    function Il(r) {
      for (var t in r) je.hasOwnProperty(t) || (je[t] = r[t]);
    }
    var Nl =
      (je && je.__importStar) ||
      function (r) {
        if (r && r.__esModule) return r;
        var t = {};
        if (r != null)
          for (var e in r) Object.hasOwnProperty.call(r, e) && (t[e] = r[e]);
        return (t.default = r), t;
      };
    Object.defineProperty(je, "__esModule", { value: !0 });
    Il(Ka());
    var Ul = Nl(vs());
    je.value = Ul;
  });
  function ja(r) {
    let t = r.byteLength,
      e = BigInt(0);
    for (let n = 0; n < t; n++) e = e * BigInt(256) + BigInt(r[n]);
    return e;
  }
  function Fn(r) {
    let t = new Uint8Array(r),
      e = new Us({
        size: t.byteLength,
        tags: { 2: (n) => ja(n), 3: (n) => -ja(n), [Ns.Semantic]: (n) => n },
      });
    try {
      return e.decodeFirst(t);
    } catch (n) {
      throw new Error(`Failed to decode CBOR: ${n}, input: ${Tt(t)}`);
    }
  }
  var Da,
    De,
    Wa,
    Bs,
    Ss,
    Is,
    Rs,
    Ns,
    Us,
    Lr = ut(() => {
      (Da = Be(vn())), (De = Be(qr())), (Wa = Be(qr()));
      zt();
      (Bs = class {
        get name() {
          return "Principal";
        }
        get priority() {
          return 0;
        }
        match(t) {
          return t && t._isPrincipal === !0;
        }
        encode(t) {
          return De.value.bytes(t.toUint8Array());
        }
      }),
        (Ss = class {
          get name() {
            return "Buffer";
          }
          get priority() {
            return 1;
          }
          match(t) {
            return t instanceof ArrayBuffer || ArrayBuffer.isView(t);
          }
          encode(t) {
            return De.value.bytes(new Uint8Array(t));
          }
        }),
        (Is = class {
          get name() {
            return "BigInt";
          }
          get priority() {
            return 1;
          }
          match(t) {
            return typeof t == "bigint";
          }
          encode(t) {
            return t > BigInt(0)
              ? De.value.tagged(2, De.value.bytes(Gt(t.toString(16))))
              : De.value.tagged(
                  3,
                  De.value.bytes(Gt((BigInt("-1") * t).toString(16))),
                );
          }
        }),
        (Rs = Wa.SelfDescribeCborSerializer.withDefaultEncoders(!0));
      Rs.addEncoder(new Bs());
      Rs.addEncoder(new Ss());
      Rs.addEncoder(new Is());
      (function (r) {
        (r[(r.Uint64LittleEndian = 71)] = "Uint64LittleEndian"),
          (r[(r.Semantic = 55799)] = "Semantic");
      })(Ns || (Ns = {}));
      Us = class extends Da.default.Decoder {
        createByteString(t) {
          return pe(...t);
        }
        createByteStringFromHeap(t, e) {
          return t === e
            ? new ArrayBuffer(0)
            : new Uint8Array(this._heap.slice(t, e));
        }
      };
    });
  function Os(r) {
    return (
      r instanceof Uint8Array ||
      (r != null && typeof r == "object" && r.constructor.name === "Uint8Array")
    );
  }
  function Ps(r) {
    if (!Os(r)) throw new Error("Uint8Array expected");
  }
  function Mn(r) {
    Ps(r);
    let t = "";
    for (let e = 0; e < r.length; e++) t += Pl[r[e]];
    return t;
  }
  function Xa(r) {
    if (typeof r != "string")
      throw new Error("hex string expected, got " + typeof r);
    return BigInt(r === "" ? "0" : `0x${r}`);
  }
  function Ya(r) {
    if (r >= ve._0 && r <= ve._9) return r - ve._0;
    if (r >= ve._A && r <= ve._F) return r - (ve._A - 10);
    if (r >= ve._a && r <= ve._f) return r - (ve._a - 10);
  }
  function Ja(r) {
    if (typeof r != "string")
      throw new Error("hex string expected, got " + typeof r);
    let t = r.length,
      e = t / 2;
    if (t % 2)
      throw new Error(
        "padded hex string expected, got unpadded hex of length " + t,
      );
    let n = new Uint8Array(e);
    for (let i = 0, s = 0; i < e; i++, s += 2) {
      let o = Ya(r.charCodeAt(s)),
        c = Ya(r.charCodeAt(s + 1));
      if (o === void 0 || c === void 0) {
        let u = r[s] + r[s + 1];
        throw new Error(
          'hex string expected, got non-hex character "' +
            u +
            '" at index ' +
            s,
        );
      }
      n[i] = o * 16 + c;
    }
    return n;
  }
  function Za(r) {
    return Xa(Mn(r));
  }
  function mr(r) {
    return Ps(r), Xa(Mn(Uint8Array.from(r).reverse()));
  }
  function Ms(r, t) {
    return Ja(r.toString(16).padStart(t * 2, "0"));
  }
  function Gr(r, t) {
    return Ms(r, t).reverse();
  }
  function ye(r, t, e) {
    let n;
    if (typeof t == "string")
      try {
        n = Ja(t);
      } catch (s) {
        throw new Error(
          `${r} must be valid hex string, got "${t}". Cause: ${s}`,
        );
      }
    else if (Os(t)) n = Uint8Array.from(t);
    else throw new Error(`${r} must be hex string or Uint8Array`);
    let i = n.length;
    if (typeof e == "number" && i !== e)
      throw new Error(`${r} expected ${e} bytes, got ${i}`);
    return n;
  }
  function Cs(...r) {
    let t = 0;
    for (let n = 0; n < r.length; n++) {
      let i = r[n];
      Ps(i), (t += i.length);
    }
    let e = new Uint8Array(t);
    for (let n = 0, i = 0; n < r.length; n++) {
      let s = r[n];
      e.set(s, i), (i += s.length);
    }
    return e;
  }
  function xr(r, t, e = {}) {
    let n = (i, s, o) => {
      let c = Ml[s];
      if (typeof c != "function")
        throw new Error(`Invalid validator "${s}", expected function`);
      let u = r[i];
      if (!(o && u === void 0) && !c(u, r))
        throw new Error(
          `Invalid param ${String(i)}=${u} (${typeof u}), expected ${s}`,
        );
    };
    for (let [i, s] of Object.entries(t)) n(i, s, !1);
    for (let [i, s] of Object.entries(e)) n(i, s, !0);
    return r;
  }
  var jp,
    Fl,
    Ol,
    Pl,
    ve,
    Qa,
    Ml,
    Kr = ut(() => {
      (jp = BigInt(0)), (Fl = BigInt(1)), (Ol = BigInt(2));
      Pl = Array.from({ length: 256 }, (r, t) =>
        t.toString(16).padStart(2, "0"),
      );
      ve = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
      (Qa = (r) => (Ol << BigInt(r - 1)) - Fl),
        (Ml = {
          bigint: (r) => typeof r == "bigint",
          function: (r) => typeof r == "function",
          boolean: (r) => typeof r == "boolean",
          string: (r) => typeof r == "string",
          stringOrUint8Array: (r) => typeof r == "string" || Os(r),
          isSafeInteger: (r) => Number.isSafeInteger(r),
          array: (r) => Array.isArray(r),
          field: (r, t) => t.Fp.isValid(r),
          hash: (r) =>
            typeof r == "function" && Number.isSafeInteger(r.outputLen),
        });
    });
  function bt(r, t) {
    let e = r % t;
    return e >= Nt ? e : t + e;
  }
  function ql(r, t, e) {
    if (e <= Nt || t < Nt) throw new Error("Expected power/modulo > 0");
    if (e === xt) return Nt;
    let n = xt;
    for (; t > Nt; ) t & xt && (n = (n * r) % e), (r = (r * r) % e), (t >>= xt);
    return n;
  }
  function ae(r, t, e) {
    let n = r;
    for (; t-- > Nt; ) (n *= n), (n %= e);
    return n;
  }
  function rc(r, t) {
    if (r === Nt || t <= Nt)
      throw new Error(
        `invert: expected positive integers, got n=${r} mod=${t}`,
      );
    let e = bt(r, t),
      n = t,
      i = Nt,
      s = xt,
      o = xt,
      c = Nt;
    for (; e !== Nt; ) {
      let y = n / e,
        w = n % e,
        _ = i - o * y,
        N = s - c * y;
      (n = e), (e = w), (i = o), (s = c), (o = _), (c = N);
    }
    if (n !== xt) throw new Error("invert: does not exist");
    return bt(i, t);
  }
  function Ll(r) {
    let t = (r - xt) / We,
      e,
      n,
      i;
    for (e = r - xt, n = 0; e % We === Nt; e /= We, n++);
    for (i = We; i < r && ql(i, t, r) !== r - xt; i++);
    if (n === 1) {
      let o = (r + xt) / ks;
      return function (u, y) {
        let w = u.pow(y, o);
        if (!u.eql(u.sqr(w), y)) throw new Error("Cannot find square root");
        return w;
      };
    }
    let s = (e + xt) / We;
    return function (c, u) {
      if (c.pow(u, t) === c.neg(c.ONE))
        throw new Error("Cannot find square root");
      let y = n,
        w = c.pow(c.mul(c.ONE, i), e),
        _ = c.pow(u, s),
        N = c.pow(u, e);
      for (; !c.eql(N, c.ONE); ) {
        if (c.eql(N, c.ZERO)) return c.ZERO;
        let q = 1;
        for (let G = c.sqr(N); q < y && !c.eql(G, c.ONE); q++) G = c.sqr(G);
        let P = c.pow(w, xt << BigInt(y - q - 1));
        (w = c.sqr(P)), (_ = c.mul(_, P)), (N = c.mul(N, w)), (y = q);
      }
      return _;
    };
  }
  function Hl(r) {
    if (r % ks === kl) {
      let t = (r + xt) / ks;
      return function (n, i) {
        let s = n.pow(i, t);
        if (!n.eql(n.sqr(s), i)) throw new Error("Cannot find square root");
        return s;
      };
    }
    if (r % ec === tc) {
      let t = (r - tc) / ec;
      return function (n, i) {
        let s = n.mul(i, We),
          o = n.pow(s, t),
          c = n.mul(i, o),
          u = n.mul(n.mul(c, We), o),
          y = n.mul(c, n.sub(u, n.ONE));
        if (!n.eql(n.sqr(y), i)) throw new Error("Cannot find square root");
        return y;
      };
    }
    return r % Vl, Ll(r);
  }
  function ic(r) {
    let t = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger",
      },
      e = Gl.reduce((n, i) => ((n[i] = "function"), n), t);
    return xr(r, e);
  }
  function Kl(r, t, e) {
    if (e < Nt) throw new Error("Expected power > 0");
    if (e === Nt) return r.ONE;
    if (e === xt) return t;
    let n = r.ONE,
      i = t;
    for (; e > Nt; ) e & xt && (n = r.mul(n, i)), (i = r.sqr(i)), (e >>= xt);
    return n;
  }
  function jl(r, t) {
    let e = new Array(t.length),
      n = t.reduce(
        (s, o, c) => (r.is0(o) ? s : ((e[c] = s), r.mul(s, o))),
        r.ONE,
      ),
      i = r.inv(n);
    return (
      t.reduceRight(
        (s, o, c) => (r.is0(o) ? s : ((e[c] = r.mul(s, e[c])), r.mul(s, o))),
        i,
      ),
      e
    );
  }
  function $s(r, t) {
    let e = t !== void 0 ? t : r.toString(2).length,
      n = Math.ceil(e / 8);
    return { nBitLength: e, nByteLength: n };
  }
  function sc(r, t, e = !1, n = {}) {
    if (r <= Nt) throw new Error(`Expected Field ORDER > 0, got ${r}`);
    let { nBitLength: i, nByteLength: s } = $s(r, t);
    if (s > 2048)
      throw new Error("Field lengths over 2048 bytes are not supported");
    let o = Hl(r),
      c = Object.freeze({
        ORDER: r,
        BITS: i,
        BYTES: s,
        MASK: Qa(i),
        ZERO: Nt,
        ONE: xt,
        create: (u) => bt(u, r),
        isValid: (u) => {
          if (typeof u != "bigint")
            throw new Error(
              `Invalid field element: expected bigint, got ${typeof u}`,
            );
          return Nt <= u && u < r;
        },
        is0: (u) => u === Nt,
        isOdd: (u) => (u & xt) === xt,
        neg: (u) => bt(-u, r),
        eql: (u, y) => u === y,
        sqr: (u) => bt(u * u, r),
        add: (u, y) => bt(u + y, r),
        sub: (u, y) => bt(u - y, r),
        mul: (u, y) => bt(u * y, r),
        pow: (u, y) => Kl(c, u, y),
        div: (u, y) => bt(u * rc(y, r), r),
        sqrN: (u) => u * u,
        addN: (u, y) => u + y,
        subN: (u, y) => u - y,
        mulN: (u, y) => u * y,
        inv: (u) => rc(u, r),
        sqrt: n.sqrt || ((u) => o(c, u)),
        invertBatch: (u) => jl(c, u),
        cmov: (u, y, w) => (w ? y : u),
        toBytes: (u) => (e ? Gr(u, s) : Ms(u, s)),
        fromBytes: (u) => {
          if (u.length !== s)
            throw new Error(`Fp.fromBytes: expected ${s}, got ${u.length}`);
          return e ? mr(u) : Za(u);
        },
      });
    return Object.freeze(c);
  }
  function oc(r, t) {
    if (!r.isOdd) throw new Error("Field doesn't have isOdd");
    let e = r.sqrt(t);
    return r.isOdd(e) ? r.neg(e) : e;
  }
  var Nt,
    xt,
    We,
    kl,
    ks,
    tc,
    ec,
    $l,
    Vl,
    nc,
    Gl,
    Cn = ut(() => {
      Kr();
      (Nt = BigInt(0)),
        (xt = BigInt(1)),
        (We = BigInt(2)),
        (kl = BigInt(3)),
        (ks = BigInt(4)),
        (tc = BigInt(5)),
        (ec = BigInt(8)),
        ($l = BigInt(9)),
        (Vl = BigInt(16));
      (nc = (r, t) => (bt(r, t) & xt) === xt),
        (Gl = [
          "create",
          "isValid",
          "is0",
          "neg",
          "inv",
          "sqrt",
          "sqr",
          "eql",
          "add",
          "sub",
          "mul",
          "pow",
          "div",
          "addN",
          "subN",
          "mulN",
          "sqrN",
        ]);
    });
  function ac(r, t) {
    let e = (i, s) => {
        let o = s.negate();
        return i ? o : s;
      },
      n = (i) => {
        let s = Math.ceil(t / i) + 1,
          o = 2 ** (i - 1);
        return { windows: s, windowSize: o };
      };
    return {
      constTimeNegate: e,
      unsafeLadder(i, s) {
        let o = r.ZERO,
          c = i;
        for (; s > Dl; ) s & Vs && (o = o.add(c)), (c = c.double()), (s >>= Vs);
        return o;
      },
      precomputeWindow(i, s) {
        let { windows: o, windowSize: c } = n(s),
          u = [],
          y = i,
          w = y;
        for (let _ = 0; _ < o; _++) {
          (w = y), u.push(w);
          for (let N = 1; N < c; N++) (w = w.add(y)), u.push(w);
          y = w.double();
        }
        return u;
      },
      wNAF(i, s, o) {
        let { windows: c, windowSize: u } = n(i),
          y = r.ZERO,
          w = r.BASE,
          _ = BigInt(2 ** i - 1),
          N = 2 ** i,
          q = BigInt(i);
        for (let P = 0; P < c; P++) {
          let G = P * u,
            nt = Number(o & _);
          (o >>= q), nt > u && ((nt -= N), (o += Vs));
          let j = G,
            Ot = G + Math.abs(nt) - 1,
            X = P % 2 !== 0,
            yt = nt < 0;
          nt === 0 ? (w = w.add(e(X, s[j]))) : (y = y.add(e(yt, s[Ot])));
        }
        return { p: y, f: w };
      },
      wNAFCached(i, s, o, c) {
        let u = i._WINDOW_SIZE || 1,
          y = s.get(i);
        return (
          y || ((y = this.precomputeWindow(i, u)), u !== 1 && s.set(i, c(y))),
          this.wNAF(u, y, o)
        );
      },
    };
  }
  function cc(r) {
    return (
      ic(r.Fp),
      xr(
        r,
        { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
        { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" },
      ),
      Object.freeze({ ...$s(r.n, r.nBitLength), ...r, p: r.Fp.ORDER })
    );
  }
  var Dl,
    Vs,
    uc = ut(() => {
      Cn();
      Kr();
      (Dl = BigInt(0)), (Vs = BigInt(1));
    });
  var qs = ut(() => {
    zt();
  });
  var kn = ut(() => {
    lr();
  });
  var oy,
    jr = ut(() => {
      Lr();
      or();
      $r();
      zt();
      Zt();
      qs();
      kn();
      oy = Gt(
        "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100",
      );
    });
  var $n = ut(() => {
    Zt();
    or();
    jr();
    zt();
    Lr();
    kn();
  });
  var Qh = Be(vo());
  var Ai;
  (function (r) {
    (r[(r.SysFatal = 1)] = "SysFatal"),
      (r[(r.SysTransient = 2)] = "SysTransient"),
      (r[(r.DestinationInvalid = 3)] = "DestinationInvalid"),
      (r[(r.CanisterReject = 4)] = "CanisterReject"),
      (r[(r.CanisterError = 5)] = "CanisterError");
  })(Ai || (Ai = {}));
  Zt();
  or();
  Zt();
  $r();
  zt();
  var hl = function (r, t) {
      var e = {};
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) &&
          t.indexOf(n) < 0 &&
          (e[n] = r[n]);
      if (r != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, n = Object.getOwnPropertySymbols(r); i < n.length; i++)
          t.indexOf(n[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(r, n[i]) &&
            (e[n[i]] = r[n[i]]);
      return e;
    },
    dl = new TextEncoder().encode(`
ic-request`),
    Ee = class {
      getPrincipal() {
        return (
          this._principal ||
            (this._principal = vt.selfAuthenticating(
              new Uint8Array(this.getPublicKey().toDer()),
            )),
          this._principal
        );
      }
      async transformRequest(t) {
        let { body: e } = t,
          n = hl(t, ["body"]),
          i = await wr(e);
        return Object.assign(Object.assign({}, n), {
          body: {
            content: e,
            sender_pubkey: this.getPublicKey().toDer(),
            sender_sig: await this.sign(pe(dl, i)),
          },
        });
      }
    },
    gr = class {
      getPrincipal() {
        return vt.anonymous();
      }
      async transformRequest(t) {
        return Object.assign(Object.assign({}, t), {
          body: { content: t.body },
        });
      }
    };
  Lr();
  $r();
  zt();
  lr();
  var Rl = Be(qr());
  var Fs;
  (function (r) {
    r.Call = "call";
  })(Fs || (Fs = {}));
  var qp = BigInt(1e6),
    Lp = 60 * 1e3;
  function Pn(r) {
    let t = [];
    return (
      r.forEach((e, n) => {
        t.push([n, e]);
      }),
      t
    );
  }
  or();
  var Hr = class extends Qt {
    constructor(t, e) {
      super(t),
        (this.response = e),
        (this.name = this.constructor.name),
        Object.setPrototypeOf(this, new.target.prototype);
    }
  };
  $n();
  jr();
  Ii();
  var Vn = BigInt(4294967295),
    Ls = BigInt(32);
  function hc(r, t = !1) {
    return t
      ? { h: Number(r & Vn), l: Number((r >> Ls) & Vn) }
      : { h: Number((r >> Ls) & Vn) | 0, l: Number(r & Vn) | 0 };
  }
  function Xl(r, t = !1) {
    let e = new Uint32Array(r.length),
      n = new Uint32Array(r.length);
    for (let i = 0; i < r.length; i++) {
      let { h: s, l: o } = hc(r[i], t);
      [e[i], n[i]] = [s, o];
    }
    return [e, n];
  }
  var Jl = (r, t) => (BigInt(r >>> 0) << Ls) | BigInt(t >>> 0),
    Zl = (r, t, e) => r >>> e,
    Ql = (r, t, e) => (r << (32 - e)) | (t >>> e),
    th = (r, t, e) => (r >>> e) | (t << (32 - e)),
    eh = (r, t, e) => (r << (32 - e)) | (t >>> e),
    rh = (r, t, e) => (r << (64 - e)) | (t >>> (e - 32)),
    nh = (r, t, e) => (r >>> (e - 32)) | (t << (64 - e)),
    ih = (r, t) => t,
    sh = (r, t) => r,
    oh = (r, t, e) => (r << e) | (t >>> (32 - e)),
    ah = (r, t, e) => (t << e) | (r >>> (32 - e)),
    ch = (r, t, e) => (t << (e - 32)) | (r >>> (64 - e)),
    uh = (r, t, e) => (r << (e - 32)) | (t >>> (64 - e));
  function fh(r, t, e, n) {
    let i = (t >>> 0) + (n >>> 0);
    return { h: (r + e + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
  }
  var lh = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0),
    hh = (r, t, e, n) => (t + e + n + ((r / 2 ** 32) | 0)) | 0,
    dh = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0),
    ph = (r, t, e, n, i) => (t + e + n + i + ((r / 2 ** 32) | 0)) | 0,
    yh = (r, t, e, n, i) =>
      (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0),
    wh = (r, t, e, n, i, s) => (t + e + n + i + s + ((r / 2 ** 32) | 0)) | 0;
  var gh = {
      fromBig: hc,
      split: Xl,
      toBig: Jl,
      shrSH: Zl,
      shrSL: Ql,
      rotrSH: th,
      rotrSL: eh,
      rotrBH: rh,
      rotrBL: nh,
      rotr32H: ih,
      rotr32L: sh,
      rotlSH: oh,
      rotlSL: ah,
      rotlBH: ch,
      rotlBL: uh,
      add: fh,
      add3L: lh,
      add3H: hh,
      add4L: dh,
      add4H: ph,
      add5H: wh,
      add5L: yh,
    },
    K = gh;
  Ur();
  var [mh, xh] = K.split(
      [
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817",
      ].map((r) => BigInt(r)),
    ),
    Pe = new Uint32Array(80),
    Me = new Uint32Array(80),
    Hs = class extends sr {
      constructor() {
        super(128, 64, 16, !1),
          (this.Ah = 1779033703),
          (this.Al = -205731576),
          (this.Bh = -1150833019),
          (this.Bl = -2067093701),
          (this.Ch = 1013904242),
          (this.Cl = -23791573),
          (this.Dh = -1521486534),
          (this.Dl = 1595750129),
          (this.Eh = 1359893119),
          (this.El = -1377402159),
          (this.Fh = -1694144372),
          (this.Fl = 725511199),
          (this.Gh = 528734635),
          (this.Gl = -79577749),
          (this.Hh = 1541459225),
          (this.Hl = 327033209);
      }
      get() {
        let {
          Ah: t,
          Al: e,
          Bh: n,
          Bl: i,
          Ch: s,
          Cl: o,
          Dh: c,
          Dl: u,
          Eh: y,
          El: w,
          Fh: _,
          Fl: N,
          Gh: q,
          Gl: P,
          Hh: G,
          Hl: nt,
        } = this;
        return [t, e, n, i, s, o, c, u, y, w, _, N, q, P, G, nt];
      }
      set(t, e, n, i, s, o, c, u, y, w, _, N, q, P, G, nt) {
        (this.Ah = t | 0),
          (this.Al = e | 0),
          (this.Bh = n | 0),
          (this.Bl = i | 0),
          (this.Ch = s | 0),
          (this.Cl = o | 0),
          (this.Dh = c | 0),
          (this.Dl = u | 0),
          (this.Eh = y | 0),
          (this.El = w | 0),
          (this.Fh = _ | 0),
          (this.Fl = N | 0),
          (this.Gh = q | 0),
          (this.Gl = P | 0),
          (this.Hh = G | 0),
          (this.Hl = nt | 0);
      }
      process(t, e) {
        for (let X = 0; X < 16; X++, e += 4)
          (Pe[X] = t.getUint32(e)), (Me[X] = t.getUint32((e += 4)));
        for (let X = 16; X < 80; X++) {
          let yt = Pe[X - 15] | 0,
            O = Me[X - 15] | 0,
            $ = K.rotrSH(yt, O, 1) ^ K.rotrSH(yt, O, 8) ^ K.shrSH(yt, O, 7),
            it = K.rotrSL(yt, O, 1) ^ K.rotrSL(yt, O, 8) ^ K.shrSL(yt, O, 7),
            z = Pe[X - 2] | 0,
            R = Me[X - 2] | 0,
            ot = K.rotrSH(z, R, 19) ^ K.rotrBH(z, R, 61) ^ K.shrSH(z, R, 6),
            tt = K.rotrSL(z, R, 19) ^ K.rotrBL(z, R, 61) ^ K.shrSL(z, R, 6),
            at = K.add4L(it, tt, Me[X - 7], Me[X - 16]),
            ht = K.add4H(at, $, ot, Pe[X - 7], Pe[X - 16]);
          (Pe[X] = ht | 0), (Me[X] = at | 0);
        }
        let {
          Ah: n,
          Al: i,
          Bh: s,
          Bl: o,
          Ch: c,
          Cl: u,
          Dh: y,
          Dl: w,
          Eh: _,
          El: N,
          Fh: q,
          Fl: P,
          Gh: G,
          Gl: nt,
          Hh: j,
          Hl: Ot,
        } = this;
        for (let X = 0; X < 80; X++) {
          let yt = K.rotrSH(_, N, 14) ^ K.rotrSH(_, N, 18) ^ K.rotrBH(_, N, 41),
            O = K.rotrSL(_, N, 14) ^ K.rotrSL(_, N, 18) ^ K.rotrBL(_, N, 41),
            $ = (_ & q) ^ (~_ & G),
            it = (N & P) ^ (~N & nt),
            z = K.add5L(Ot, O, it, xh[X], Me[X]),
            R = K.add5H(z, j, yt, $, mh[X], Pe[X]),
            ot = z | 0,
            tt = K.rotrSH(n, i, 28) ^ K.rotrBH(n, i, 34) ^ K.rotrBH(n, i, 39),
            at = K.rotrSL(n, i, 28) ^ K.rotrBL(n, i, 34) ^ K.rotrBL(n, i, 39),
            ht = (n & s) ^ (n & c) ^ (s & c),
            Bt = (i & o) ^ (i & u) ^ (o & u);
          (j = G | 0),
            (Ot = nt | 0),
            (G = q | 0),
            (nt = P | 0),
            (q = _ | 0),
            (P = N | 0),
            ({ h: _, l: N } = K.add(y | 0, w | 0, R | 0, ot | 0)),
            (y = c | 0),
            (w = u | 0),
            (c = s | 0),
            (u = o | 0),
            (s = n | 0),
            (o = i | 0);
          let Pt = K.add3L(ot, at, Bt);
          (n = K.add3H(Pt, R, tt, ht)), (i = Pt | 0);
        }
        ({ h: n, l: i } = K.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)),
          ({ h: s, l: o } = K.add(this.Bh | 0, this.Bl | 0, s | 0, o | 0)),
          ({ h: c, l: u } = K.add(this.Ch | 0, this.Cl | 0, c | 0, u | 0)),
          ({ h: y, l: w } = K.add(this.Dh | 0, this.Dl | 0, y | 0, w | 0)),
          ({ h: _, l: N } = K.add(this.Eh | 0, this.El | 0, _ | 0, N | 0)),
          ({ h: q, l: P } = K.add(this.Fh | 0, this.Fl | 0, q | 0, P | 0)),
          ({ h: G, l: nt } = K.add(this.Gh | 0, this.Gl | 0, G | 0, nt | 0)),
          ({ h: j, l: Ot } = K.add(this.Hh | 0, this.Hl | 0, j | 0, Ot | 0)),
          this.set(n, i, s, o, c, u, y, w, _, N, q, P, G, nt, j, Ot);
      }
      roundClean() {
        Pe.fill(0), Me.fill(0);
      }
      destroy() {
        this.buffer.fill(0),
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    };
  var Gs = Nr(() => new Hs());
  Ur();
  Cn();
  Kr();
  Kr();
  uc();
  var ce = BigInt(0),
    Yt = BigInt(1),
    qn = BigInt(2),
    _h = BigInt(8),
    bh = { zip215: !0 };
  function Eh(r) {
    let t = cc(r);
    return (
      xr(
        r,
        { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" },
        {
          adjustScalarBytes: "function",
          domain: "function",
          uvRatio: "function",
          mapToCurve: "function",
        },
      ),
      Object.freeze({ ...t })
    );
  }
  function Ln(r) {
    let t = Eh(r),
      {
        Fp: e,
        n,
        prehash: i,
        hash: s,
        randomBytes: o,
        nByteLength: c,
        h: u,
      } = t,
      y = qn << (BigInt(c * 8) - Yt),
      w = e.create,
      _ =
        t.uvRatio ||
        ((M, U) => {
          try {
            return { isValid: !0, value: e.sqrt(M * e.inv(U)) };
          } catch {
            return { isValid: !1, value: ce };
          }
        }),
      N = t.adjustScalarBytes || ((M) => M),
      q =
        t.domain ||
        ((M, U, L) => {
          if (U.length || L)
            throw new Error("Contexts/pre-hash are not supported");
          return M;
        }),
      P = (M) => typeof M == "bigint" && ce < M,
      G = (M, U) => P(M) && P(U) && M < U,
      nt = (M) => M === ce || G(M, y);
    function j(M, U) {
      if (G(M, U)) return M;
      throw new Error(`Expected valid scalar < ${U}, got ${typeof M} ${M}`);
    }
    function Ot(M) {
      return M === ce ? M : j(M, n);
    }
    let X = new Map();
    function yt(M) {
      if (!(M instanceof O)) throw new Error("ExtendedPoint expected");
    }
    class O {
      constructor(U, L, H, J) {
        if (
          ((this.ex = U), (this.ey = L), (this.ez = H), (this.et = J), !nt(U))
        )
          throw new Error("x required");
        if (!nt(L)) throw new Error("y required");
        if (!nt(H)) throw new Error("z required");
        if (!nt(J)) throw new Error("t required");
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static fromAffine(U) {
        if (U instanceof O) throw new Error("extended point not allowed");
        let { x: L, y: H } = U || {};
        if (!nt(L) || !nt(H)) throw new Error("invalid affine point");
        return new O(L, H, Yt, w(L * H));
      }
      static normalizeZ(U) {
        let L = e.invertBatch(U.map((H) => H.ez));
        return U.map((H, J) => H.toAffine(L[J])).map(O.fromAffine);
      }
      _setWindowSize(U) {
        (this._WINDOW_SIZE = U), X.delete(this);
      }
      assertValidity() {
        let { a: U, d: L } = t;
        if (this.is0()) throw new Error("bad point: ZERO");
        let { ex: H, ey: J, ez: S, et: h } = this,
          ct = w(H * H),
          Z = w(J * J),
          D = w(S * S),
          C = w(D * D),
          a = w(ct * U),
          f = w(D * w(a + Z)),
          l = w(C + w(L * w(ct * Z)));
        if (f !== l) throw new Error("bad point: equation left != right (1)");
        let b = w(H * J),
          g = w(S * h);
        if (b !== g) throw new Error("bad point: equation left != right (2)");
      }
      equals(U) {
        yt(U);
        let { ex: L, ey: H, ez: J } = this,
          { ex: S, ey: h, ez: ct } = U,
          Z = w(L * ct),
          D = w(S * J),
          C = w(H * ct),
          a = w(h * J);
        return Z === D && C === a;
      }
      is0() {
        return this.equals(O.ZERO);
      }
      negate() {
        return new O(w(-this.ex), this.ey, this.ez, w(-this.et));
      }
      double() {
        let { a: U } = t,
          { ex: L, ey: H, ez: J } = this,
          S = w(L * L),
          h = w(H * H),
          ct = w(qn * w(J * J)),
          Z = w(U * S),
          D = L + H,
          C = w(w(D * D) - S - h),
          a = Z + h,
          f = a - ct,
          l = Z - h,
          b = w(C * f),
          g = w(a * l),
          x = w(C * l),
          v = w(f * a);
        return new O(b, g, v, x);
      }
      add(U) {
        yt(U);
        let { a: L, d: H } = t,
          { ex: J, ey: S, ez: h, et: ct } = this,
          { ex: Z, ey: D, ez: C, et: a } = U;
        if (L === BigInt(-1)) {
          let k = w((S - J) * (D + Z)),
            Y = w((S + J) * (D - Z)),
            ft = w(Y - k);
          if (ft === ce) return this.double();
          let wt = w(h * qn * a),
            W = w(ct * qn * C),
            V = W + wt,
            _t = Y + k,
            xe = W - wt,
            Ve = w(V * ft),
            qe = w(_t * xe),
            Vt = w(V * xe),
            st = w(ft * _t);
          return new O(Ve, qe, st, Vt);
        }
        let f = w(J * Z),
          l = w(S * D),
          b = w(ct * H * a),
          g = w(h * C),
          x = w((J + S) * (Z + D) - f - l),
          v = g - b,
          d = g + b,
          m = w(l - L * f),
          A = w(x * v),
          E = w(d * m),
          I = w(x * m),
          F = w(v * d);
        return new O(A, E, F, I);
      }
      subtract(U) {
        return this.add(U.negate());
      }
      wNAF(U) {
        return z.wNAFCached(this, X, U, O.normalizeZ);
      }
      multiply(U) {
        let { p: L, f: H } = this.wNAF(j(U, n));
        return O.normalizeZ([L, H])[0];
      }
      multiplyUnsafe(U) {
        let L = Ot(U);
        return L === ce
          ? it
          : this.equals(it) || L === Yt
            ? this
            : this.equals($)
              ? this.wNAF(L).p
              : z.unsafeLadder(this, L);
      }
      isSmallOrder() {
        return this.multiplyUnsafe(u).is0();
      }
      isTorsionFree() {
        return z.unsafeLadder(this, n).is0();
      }
      toAffine(U) {
        let { ex: L, ey: H, ez: J } = this,
          S = this.is0();
        U == null && (U = S ? _h : e.inv(J));
        let h = w(L * U),
          ct = w(H * U),
          Z = w(J * U);
        if (S) return { x: ce, y: Yt };
        if (Z !== Yt) throw new Error("invZ was invalid");
        return { x: h, y: ct };
      }
      clearCofactor() {
        let { h: U } = t;
        return U === Yt ? this : this.multiplyUnsafe(U);
      }
      static fromHex(U, L = !1) {
        let { d: H, a: J } = t,
          S = e.BYTES;
        U = ye("pointHex", U, S);
        let h = U.slice(),
          ct = U[S - 1];
        h[S - 1] = ct & -129;
        let Z = mr(h);
        Z === ce || (L ? j(Z, y) : j(Z, e.ORDER));
        let D = w(Z * Z),
          C = w(D - Yt),
          a = w(H * D - J),
          { isValid: f, value: l } = _(C, a);
        if (!f) throw new Error("Point.fromHex: invalid y coordinate");
        let b = (l & Yt) === Yt,
          g = (ct & 128) !== 0;
        if (!L && l === ce && g)
          throw new Error("Point.fromHex: x=0 and x_0=1");
        return g !== b && (l = w(-l)), O.fromAffine({ x: l, y: Z });
      }
      static fromPrivateKey(U) {
        return tt(U).point;
      }
      toRawBytes() {
        let { x: U, y: L } = this.toAffine(),
          H = Gr(L, e.BYTES);
        return (H[H.length - 1] |= U & Yt ? 128 : 0), H;
      }
      toHex() {
        return Mn(this.toRawBytes());
      }
    }
    (O.BASE = new O(t.Gx, t.Gy, Yt, w(t.Gx * t.Gy))),
      (O.ZERO = new O(ce, Yt, Yt, ce));
    let { BASE: $, ZERO: it } = O,
      z = ac(O, c * 8);
    function R(M) {
      return bt(M, n);
    }
    function ot(M) {
      return R(mr(M));
    }
    function tt(M) {
      let U = c;
      M = ye("private key", M, U);
      let L = ye("hashed private key", s(M), 2 * U),
        H = N(L.slice(0, U)),
        J = L.slice(U, 2 * U),
        S = ot(H),
        h = $.multiply(S),
        ct = h.toRawBytes();
      return { head: H, prefix: J, scalar: S, point: h, pointBytes: ct };
    }
    function at(M) {
      return tt(M).pointBytes;
    }
    function ht(M = new Uint8Array(), ...U) {
      let L = Cs(...U);
      return ot(s(q(L, ye("context", M), !!i)));
    }
    function Bt(M, U, L = {}) {
      (M = ye("message", M)), i && (M = i(M));
      let { prefix: H, scalar: J, pointBytes: S } = tt(U),
        h = ht(L.context, H, M),
        ct = $.multiply(h).toRawBytes(),
        Z = ht(L.context, ct, S, M),
        D = R(h + Z * J);
      Ot(D);
      let C = Cs(ct, Gr(D, e.BYTES));
      return ye("result", C, c * 2);
    }
    let Pt = bh;
    function kt(M, U, L, H = Pt) {
      let { context: J, zip215: S } = H,
        h = e.BYTES;
      (M = ye("signature", M, 2 * h)), (U = ye("message", U)), i && (U = i(U));
      let ct = mr(M.slice(h, 2 * h)),
        Z,
        D,
        C;
      try {
        (Z = O.fromHex(L, S)),
          (D = O.fromHex(M.slice(0, h), S)),
          (C = $.multiplyUnsafe(ct));
      } catch {
        return !1;
      }
      if (!S && Z.isSmallOrder()) return !1;
      let a = ht(J, D.toRawBytes(), Z.toRawBytes(), U);
      return D.add(Z.multiplyUnsafe(a))
        .subtract(C)
        .clearCofactor()
        .equals(O.ZERO);
    }
    return (
      $._setWindowSize(8),
      {
        CURVE: t,
        getPublicKey: at,
        sign: Bt,
        verify: kt,
        ExtendedPoint: O,
        utils: {
          getExtendedPublicKey: tt,
          randomPrivateKey: () => o(e.BYTES),
          precompute(M = 8, U = O.BASE) {
            return U._setWindowSize(M), U.multiply(BigInt(3)), U;
          },
        },
      }
    );
  }
  Cn();
  var js = BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    ),
    dc = BigInt(
      "19681161376707505956807079304988542015446066515923890162744021073123829784752",
    ),
    Uy = BigInt(0),
    Ah = BigInt(1),
    Ks = BigInt(2),
    vh = BigInt(5),
    pc = BigInt(10),
    Th = BigInt(20),
    Bh = BigInt(40),
    yc = BigInt(80);
  function Sh(r) {
    let t = js,
      n = (((r * r) % t) * r) % t,
      i = (ae(n, Ks, t) * n) % t,
      s = (ae(i, Ah, t) * r) % t,
      o = (ae(s, vh, t) * s) % t,
      c = (ae(o, pc, t) * o) % t,
      u = (ae(c, Th, t) * c) % t,
      y = (ae(u, Bh, t) * u) % t,
      w = (ae(y, yc, t) * y) % t,
      _ = (ae(w, yc, t) * y) % t,
      N = (ae(_, pc, t) * o) % t;
    return { pow_p_5_8: (ae(N, Ks, t) * r) % t, b2: n };
  }
  function Ih(r) {
    return (r[0] &= 248), (r[31] &= 127), (r[31] |= 64), r;
  }
  function Nh(r, t) {
    let e = js,
      n = bt(t * t * t, e),
      i = bt(n * n * t, e),
      s = Sh(r * i).pow_p_5_8,
      o = bt(r * n * s, e),
      c = bt(t * o * o, e),
      u = o,
      y = bt(o * dc, e),
      w = c === r,
      _ = c === bt(-r, e),
      N = c === bt(-r * dc, e);
    return (
      w && (o = u),
      (_ || N) && (o = y),
      nc(o, e) && (o = bt(-o, e)),
      { isValid: w || _, value: o }
    );
  }
  var Te = sc(js, void 0, !0),
    Ds = {
      a: BigInt(-1),
      d: BigInt(
        "37095705934669439343138083508754565189542113879843219016388785533085940283555",
      ),
      Fp: Te,
      n: BigInt(
        "7237005577332262213973186563042994240857116359379907606001950938285454250989",
      ),
      h: BigInt(8),
      Gx: BigInt(
        "15112221349535400772501151409588531511454012693041857206046113283949847762202",
      ),
      Gy: BigInt(
        "46316835694926478169428394003475163141307993866256225615783033603165251855960",
      ),
      hash: Gs,
      randomBytes: Oo,
      adjustScalarBytes: Ih,
      uvRatio: Nh,
    },
    _r = Ln(Ds);
  function wc(r, t, e) {
    if (t.length > 255) throw new Error("Context is too big");
    return Fo(
      Bi("SigEd25519 no Ed25519 collisions"),
      new Uint8Array([e ? 1 : 0, t.length]),
      t,
      r,
    );
  }
  var Ry = Ln({ ...Ds, domain: wc }),
    Fy = Ln({ ...Ds, domain: wc, prehash: Gs });
  var Uh = (Te.ORDER + BigInt(3)) / BigInt(8),
    Oy = Te.pow(Ks, Uh),
    Py = Te.sqrt(Te.neg(Te.ONE)),
    My = (Te.ORDER - BigInt(5)) / BigInt(8),
    Cy = BigInt(486662);
  var ky = oc(Te, Te.neg(BigInt(486664)));
  var $y = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    Vy = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    qy = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    Ly = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    );
  var Hy = BigInt(
    "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  );
  var Rh, Fh, Oh, Ph;
  (Rh = new WeakMap()),
    (Fh = new WeakMap()),
    (Oh = Symbol.iterator),
    (Ph = Symbol.toStringTag);
  zt();
  var gc = (r) => {
      if (r <= 127) return 1;
      if (r <= 255) return 2;
      if (r <= 65535) return 3;
      if (r <= 16777215) return 4;
      throw new Error("Length too long (> 4 bytes)");
    },
    mc = (r, t, e) => {
      if (e <= 127) return (r[t] = e), 1;
      if (e <= 255) return (r[t] = 129), (r[t + 1] = e), 2;
      if (e <= 65535)
        return (r[t] = 130), (r[t + 1] = e >> 8), (r[t + 2] = e), 3;
      if (e <= 16777215)
        return (
          (r[t] = 131),
          (r[t + 1] = e >> 16),
          (r[t + 2] = e >> 8),
          (r[t + 3] = e),
          4
        );
      throw new Error("Length too long (> 4 bytes)");
    },
    Ws = (r, t) => {
      if (r[t] < 128) return 1;
      if (r[t] === 128) throw new Error("Invalid length 0");
      if (r[t] === 129) return 2;
      if (r[t] === 130) return 3;
      if (r[t] === 131) return 4;
      throw new Error("Length too long (> 4 bytes)");
    },
    Mh = (r, t) => {
      let e = Ws(r, t);
      if (e === 1) return r[t];
      if (e === 2) return r[t + 1];
      if (e === 3) return (r[t + 1] << 8) + r[t + 2];
      if (e === 4) return (r[t + 1] << 16) + (r[t + 2] << 8) + r[t + 3];
      throw new Error("Length too long (> 4 bytes)");
    },
    xc = Uint8Array.from([48, 12, 6, 10, 43, 6, 1, 4, 1, 131, 184, 67, 1, 1]),
    ze = Uint8Array.from([48, 5, 6, 3, 43, 101, 112]),
    Dy = Uint8Array.from([
      48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 10,
    ]);
  function br(r, t) {
    let e = 2 + gc(r.byteLength + 1),
      n = t.byteLength + e + r.byteLength,
      i = 0,
      s = new Uint8Array(1 + gc(n) + n);
    return (
      (s[i++] = 48),
      (i += mc(s, i, n)),
      s.set(t, i),
      (i += t.byteLength),
      (s[i++] = 3),
      (i += mc(s, i, r.byteLength + 1)),
      (s[i++] = 0),
      s.set(new Uint8Array(r), i),
      s
    );
  }
  var Dr = (r, t) => {
    let e = 0,
      n = (c, u) => {
        if (i[e++] !== c) throw new Error("Expected: " + u);
      },
      i = new Uint8Array(r);
    if (
      (n(48, "sequence"), (e += Ws(i, e)), !Tn(i.slice(e, e + t.byteLength), t))
    )
      throw new Error("Not the expected OID.");
    (e += t.byteLength), n(3, "bit string");
    let s = Mh(i, e) - 1;
    (e += Ws(i, e)), n(0, "0 padding");
    let o = i.slice(e);
    if (s !== o.length)
      throw new Error(
        `DER payload mismatch: Expected length ${s} actual length ${o.length}`,
      );
    return o;
  };
  var _c = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    bc = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    Hn,
    Gn,
    Kn = class r {
      constructor(t) {
        if (
          (Hn.set(this, void 0),
          Gn.set(this, void 0),
          t.byteLength !== r.RAW_KEY_LENGTH)
        )
          throw new Error("An Ed25519 public key must be exactly 32bytes long");
        _c(this, Hn, t, "f"), _c(this, Gn, r.derEncode(t), "f");
      }
      static from(t) {
        return this.fromDer(t.toDer());
      }
      static fromRaw(t) {
        return new r(t);
      }
      static fromDer(t) {
        return new r(this.derDecode(t));
      }
      static derEncode(t) {
        return br(t, ze).buffer;
      }
      static derDecode(t) {
        let e = Dr(t, ze);
        if (e.length !== this.RAW_KEY_LENGTH)
          throw new Error("An Ed25519 public key must be exactly 32bytes long");
        return e;
      }
      get rawKey() {
        return bc(this, Hn, "f");
      }
      get derKey() {
        return bc(this, Gn, "f");
      }
      toDer() {
        return this.derKey;
      }
      toRaw() {
        return this.rawKey;
      }
    };
  (Hn = new WeakMap()), (Gn = new WeakMap());
  Kn.RAW_KEY_LENGTH = 32;
  kn();
  var Ch, kh, $h, Vh;
  (Ch = new WeakSet()),
    (kh = function (t, ...e) {
      this.notify(t, ...e);
    });
  ($h = new WeakSet()),
    (Vh = function (t, ...e) {
      this.log(t, ...e);
    });
  var we = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    Ct = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    ge,
    jn,
    Dn,
    Wn,
    zn,
    Yn,
    Xn,
    Jn,
    Er;
  var Zn = class r {
    constructor(t = r.default) {
      ge.set(this, void 0),
        jn.set(this, void 0),
        Dn.set(this, void 0),
        Wn.set(this, void 0),
        zn.set(this, void 0),
        Yn.set(this, void 0),
        Xn.set(this, void 0),
        Jn.set(this, void 0),
        Er.set(this, 0);
      let {
        initialInterval: e = 500,
        randomizationFactor: n = 0.5,
        multiplier: i = 1.5,
        maxInterval: s = 6e4,
        maxElapsedTime: o = 9e5,
        maxIterations: c = 10,
        date: u = Date,
      } = t;
      we(this, ge, e, "f"),
        we(this, jn, n, "f"),
        we(this, Dn, i, "f"),
        we(this, Wn, s, "f"),
        we(this, Jn, u, "f"),
        we(this, zn, u.now(), "f"),
        we(this, Yn, o, "f"),
        we(this, Xn, c, "f");
    }
    get ellapsedTimeInMsec() {
      return Ct(this, Jn, "f").now() - Ct(this, zn, "f");
    }
    get currentInterval() {
      return Ct(this, ge, "f");
    }
    get count() {
      return Ct(this, Er, "f");
    }
    get randomValueFromInterval() {
      let t = Ct(this, jn, "f") * Ct(this, ge, "f"),
        e = Ct(this, ge, "f") - t,
        n = Ct(this, ge, "f") + t;
      return Math.random() * (n - e) + e;
    }
    incrementCurrentInterval() {
      var t;
      return (
        we(
          this,
          ge,
          Math.min(Ct(this, ge, "f") * Ct(this, Dn, "f"), Ct(this, Wn, "f")),
          "f",
        ),
        we(this, Er, ((t = Ct(this, Er, "f")), t++, t), "f"),
        Ct(this, ge, "f")
      );
    }
    next() {
      return this.ellapsedTimeInMsec >= Ct(this, Yn, "f") ||
        Ct(this, Er, "f") >= Ct(this, Xn, "f")
        ? null
        : (this.incrementCurrentInterval(), this.randomValueFromInterval);
    }
  };
  (ge = new WeakMap()),
    (jn = new WeakMap()),
    (Dn = new WeakMap()),
    (Wn = new WeakMap()),
    (zn = new WeakMap()),
    (Yn = new WeakMap()),
    (Xn = new WeakMap()),
    (Jn = new WeakMap()),
    (Er = new WeakMap());
  Zn.default = {
    initialInterval: 500,
    randomizationFactor: 0.5,
    multiplier: 1.5,
    maxInterval: 6e4,
    maxElapsedTime: 9e5,
    maxIterations: 10,
    date: Date,
  };
  var ee = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    Wr,
    Ce,
    Lh,
    Hh,
    Gh,
    Kh,
    jh,
    Ec,
    Dh,
    Wh,
    zh,
    zs;
  (function (r) {
    (r.Received = "received"),
      (r.Processing = "processing"),
      (r.Replied = "replied"),
      (r.Rejected = "rejected"),
      (r.Unknown = "unknown"),
      (r.Done = "done");
  })(zs || (zs = {}));
  var xw = 5 * 60 * 1e3;
  (Ce = new WeakMap()),
    (Lh = new WeakMap()),
    (Hh = new WeakMap()),
    (Gh = new WeakMap()),
    (Kh = new WeakMap()),
    (jh = new WeakMap()),
    (Ec = new WeakMap()),
    (zh = new WeakMap()),
    (Wr = new WeakSet()),
    (Dh = async function r(t) {
      var e, n;
      let {
          ecid: i,
          transformedRequest: s,
          body: o,
          requestId: c,
          backoff: u,
          tries: y,
        } = t,
        w = y === 0 ? 0 : u.next();
      if (
        (this.log(
          `fetching "/api/v2/canister/${i.toString()}/query" with tries:`,
          { tries: y, backoff: u, delay: w },
        ),
        w === null)
      )
        throw new Qt(
          `Timestamp failed to pass the watermark after retrying the configured ${ee(this, Ce, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
        );
      w > 0 && (await new Promise((P) => setTimeout(P, w)));
      let _;
      try {
        this.log(
          `fetching "/api/v2/canister/${i.toString()}/query" with request:`,
          s,
        );
        let P = await this._fetch(
          "" + new URL(`/api/v2/canister/${i.toString()}/query`, this._host),
          Object.assign(
            Object.assign(Object.assign({}, this._fetchOptions), s.request),
            { body: o },
          ),
        );
        if (P.status === 200) {
          let G = Fn(await P.arrayBuffer());
          _ = Object.assign(Object.assign({}, G), {
            httpDetails: {
              ok: P.ok,
              status: P.status,
              statusText: P.statusText,
              headers: Pn(P.headers),
            },
            requestId: c,
          });
        } else
          throw new Hr(
            `Server returned an error:
  Code: ${P.status} (${P.statusText})
  Body: ${await P.text()}
`,
            {
              ok: P.ok,
              status: P.status,
              statusText: P.statusText,
              headers: Pn(P.headers),
            },
          );
      } catch (P) {
        if (y < ee(this, Ce, "f"))
          return (
            this.log.warn(`Caught exception while attempting to make query:
  ${P}
  Retrying query.`),
            await ee(this, Wr, "m", r).call(
              this,
              Object.assign(Object.assign({}, t), { tries: y + 1 }),
            )
          );
        throw P;
      }
      let N =
        (n = (e = _.signatures) === null || e === void 0 ? void 0 : e[0]) ===
          null || n === void 0
          ? void 0
          : n.timestamp;
      if (!ee(this, Ec, "f")) return _;
      if (!N)
        throw new Error(
          "Timestamp not found in query response. This suggests a malformed or malicious response.",
        );
      let q = Number(BigInt(N) / BigInt(1e6));
      if (
        (this.log("watermark and timestamp", {
          waterMark: this.waterMark,
          timestamp: q,
        }),
        Number(this.waterMark) > q)
      ) {
        let P = new Qt("Timestamp is below the watermark. Retrying query.");
        if (
          (this.log.error("Timestamp is below", P, {
            timestamp: N,
            waterMark: this.waterMark,
          }),
          y < ee(this, Ce, "f"))
        )
          return await ee(this, Wr, "m", r).call(
            this,
            Object.assign(Object.assign({}, t), { tries: y + 1 }),
          );
        throw new Qt(
          `Timestamp failed to pass the watermark after retrying the configured ${ee(this, Ce, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
        );
      }
      return _;
    }),
    (Wh = async function r(t) {
      let { request: e, backoff: n, tries: i } = t,
        s = i === 0 ? 0 : n.next();
      if (s === null)
        throw new Qt(
          `Timestamp failed to pass the watermark after retrying the configured ${ee(this, Ce, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
        );
      s > 0 && (await new Promise((y) => setTimeout(y, s)));
      let o;
      try {
        o = await e();
      } catch (y) {
        if (ee(this, Ce, "f") > i)
          return (
            this.log.warn(`Caught exception while attempting to make request:
  ${y}
  Retrying request.`),
            await ee(this, Wr, "m", r).call(this, {
              request: e,
              backoff: n,
              tries: i + 1,
            })
          );
        throw y;
      }
      if (o.ok) return o;
      let c = await o.clone().text(),
        u = `Server returned an error:
  Code: ${o.status} (${o.statusText})
  Body: ${c}
`;
      if (i < ee(this, Ce, "f"))
        return await ee(this, Wr, "m", r).call(this, {
          request: e,
          backoff: n,
          tries: i + 1,
        });
      throw new Hr(u, {
        ok: o.ok,
        status: o.status,
        statusText: o.statusText,
        headers: Pn(o.headers),
      });
    });
  Zt();
  var Ac;
  (function (r) {
    (r.Error = "err"),
      (r.GetPrincipal = "gp"),
      (r.GetPrincipalResponse = "gpr"),
      (r.Query = "q"),
      (r.QueryResponse = "qr"),
      (r.Call = "c"),
      (r.CallResponse = "cr"),
      (r.ReadState = "rs"),
      (r.ReadStateResponse = "rsr"),
      (r.Status = "s"),
      (r.StatusResponse = "sr");
  })(Ac || (Ac = {}));
  or();
  lr();
  jr();
  zt();
  var Qn = {};
  _u(Qn, {
    backoff: () => Ic,
    chain: () => Nc,
    conditionalDelay: () => Bc,
    defaultStrategy: () => vc,
    maxAttempts: () => Xh,
    once: () => Tc,
    throttle: () => Jh,
    timeout: () => Sc,
  });
  zt();
  var Yh = 5 * 60 * 1e3;
  function vc() {
    return Nc(Bc(Tc(), 1e3), Ic(1e3, 1.2), Sc(Yh));
  }
  function Tc() {
    let r = !0;
    return async () => (r ? ((r = !1), !0) : !1);
  }
  function Bc(r, t) {
    return async (e, n, i) => {
      if (await r(e, n, i)) return new Promise((s) => setTimeout(s, t));
    };
  }
  function Xh(r) {
    let t = r;
    return async (e, n, i) => {
      if (--t <= 0)
        throw new Error(`Failed to retrieve a reply for request after ${r} attempts:
  Request ID: ${Tt(n)}
  Request status: ${i}
`);
    };
  }
  function Jh(r) {
    return () => new Promise((t) => setTimeout(t, r));
  }
  function Sc(r) {
    let t = Date.now() + r;
    return async (e, n, i) => {
      if (Date.now() > t)
        throw new Error(`Request timed out after ${r} msec:
  Request ID: ${Tt(n)}
  Request status: ${i}
`);
    };
  }
  function Ic(r, t) {
    let e = r;
    return () =>
      new Promise((n) =>
        setTimeout(() => {
          (e *= t), n();
        }, e),
      );
  }
  function Nc(...r) {
    return async (t, e, n) => {
      for (let i of r) await i(t, e, n);
    };
  }
  Zt();
  zt();
  var Dw = Symbol.for("ic-agent-metadata");
  var Ww = { pollingStrategyFactory: Qn.defaultStrategy };
  jr();
  Zt();
  $n();
  $r();
  qs();
  zt();
  $n();
  Lr();
  var ri = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    ke = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    ti,
    ei,
    Ar,
    vr;
  function Uc(r) {
    return r !== null && typeof r == "object";
  }
  var Ye = class r {
    constructor(t) {
      if (
        (ti.set(this, void 0),
        ei.set(this, void 0),
        t.byteLength !== r.RAW_KEY_LENGTH)
      )
        throw new Error("An Ed25519 public key must be exactly 32bytes long");
      ri(this, ti, t, "f"), ri(this, ei, r.derEncode(t), "f");
    }
    static from(t) {
      if (typeof t == "string") {
        let e = Gt(t);
        return this.fromRaw(e);
      } else if (Uc(t)) {
        let e = t;
        if (Uc(e) && Object.hasOwnProperty.call(e, "__derEncodedPublicKey__"))
          return this.fromDer(e);
        if (ArrayBuffer.isView(e)) {
          let n = e;
          return this.fromRaw(Bn(n.buffer));
        } else {
          if (e instanceof ArrayBuffer) return this.fromRaw(e);
          if ("rawKey" in e) return this.fromRaw(e.rawKey);
          if ("derKey" in e) return this.fromDer(e.derKey);
          if ("toDer" in e) return this.fromDer(e.toDer());
        }
      }
      throw new Error(
        "Cannot construct Ed25519PublicKey from the provided key.",
      );
    }
    static fromRaw(t) {
      return new r(t);
    }
    static fromDer(t) {
      return new r(this.derDecode(t));
    }
    static derEncode(t) {
      let e = br(t, ze).buffer;
      return (e.__derEncodedPublicKey__ = void 0), e;
    }
    static derDecode(t) {
      let e = Dr(t, ze);
      if (e.length !== this.RAW_KEY_LENGTH)
        throw new Error("An Ed25519 public key must be exactly 32bytes long");
      return e;
    }
    get rawKey() {
      return ke(this, ti, "f");
    }
    get derKey() {
      return ke(this, ei, "f");
    }
    toDer() {
      return this.derKey;
    }
    toRaw() {
      return this.rawKey;
    }
  };
  (ti = new WeakMap()), (ei = new WeakMap());
  Ye.RAW_KEY_LENGTH = 32;
  var Xe = class r extends Ee {
    constructor(t, e) {
      super(),
        Ar.set(this, void 0),
        vr.set(this, void 0),
        ri(this, Ar, Ye.from(t), "f"),
        ri(this, vr, new Uint8Array(e), "f");
    }
    static generate(t) {
      if (t && t.length !== 32)
        throw new Error("Ed25519 Seed needs to be 32 bytes long.");
      t || (t = _r.utils.randomPrivateKey()),
        Tn(t, new Uint8Array(new Array(32).fill(0))) &&
          console.warn(
            "Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.",
          );
      let e = new Uint8Array(32);
      for (let i = 0; i < 32; i++) e[i] = new Uint8Array(t)[i];
      let n = _r.getPublicKey(e);
      return r.fromKeyPair(n, e);
    }
    static fromParsedJson(t) {
      let [e, n] = t;
      return new r(Ye.fromDer(Gt(e)), Gt(n));
    }
    static fromJSON(t) {
      let e = JSON.parse(t);
      if (Array.isArray(e)) {
        if (typeof e[0] == "string" && typeof e[1] == "string")
          return this.fromParsedJson([e[0], e[1]]);
        throw new Error(
          "Deserialization error: JSON must have at least 2 items.",
        );
      }
      throw new Error(
        `Deserialization error: Invalid JSON type for string: ${JSON.stringify(t)}`,
      );
    }
    static fromKeyPair(t, e) {
      return new r(Ye.fromRaw(t), e);
    }
    static fromSecretKey(t) {
      let e = _r.getPublicKey(new Uint8Array(t));
      return r.fromKeyPair(e, t);
    }
    toJSON() {
      return [Tt(ke(this, Ar, "f").toDer()), Tt(ke(this, vr, "f"))];
    }
    getKeyPair() {
      return { secretKey: ke(this, vr, "f"), publicKey: ke(this, Ar, "f") };
    }
    getPublicKey() {
      return ke(this, Ar, "f");
    }
    async sign(t) {
      let e = new Uint8Array(t),
        n = Ke(_r.sign(e, ke(this, vr, "f").slice(0, 32)));
      return (
        Object.defineProperty(n, "__signature__", {
          enumerable: !1,
          value: void 0,
        }),
        n
      );
    }
    static verify(t, e, n) {
      let [i, s, o] = [t, e, n].map(
        (c) => (
          typeof c == "string" && (c = Gt(c)),
          c instanceof Uint8Array && (c = c.buffer),
          new Uint8Array(c)
        ),
      );
      return _r.verify(s, i, o);
    }
  };
  (Ar = new WeakMap()), (vr = new WeakMap());
  var Ys = class r extends Error {
    constructor(t) {
      super(t), (this.message = t), Object.setPrototypeOf(this, r.prototype);
    }
  };
  function Rc(r) {
    if (typeof global < "u" && global.crypto && global.crypto.subtle)
      return global.crypto.subtle;
    if (r) return r;
    if (typeof crypto < "u" && crypto.subtle) return crypto.subtle;
    throw new Ys(
      "Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto",
    );
  }
  var zr = class r extends Ee {
    constructor(t, e, n) {
      super(),
        (this._keyPair = t),
        (this._derKey = e),
        (this._subtleCrypto = n);
    }
    static async generate(t) {
      let {
          extractable: e = !1,
          keyUsages: n = ["sign", "verify"],
          subtleCrypto: i,
        } = t ?? {},
        s = Rc(i),
        o = await s.generateKey({ name: "ECDSA", namedCurve: "P-256" }, e, n),
        c = await s.exportKey("spki", o.publicKey);
      return new this(o, c, s);
    }
    static async fromKeyPair(t, e) {
      let n = Rc(e),
        i = await n.exportKey("spki", t.publicKey);
      return new r(t, i, n);
    }
    getKeyPair() {
      return this._keyPair;
    }
    getPublicKey() {
      let t = this._derKey,
        e = Object.create(this._keyPair.publicKey);
      return (
        (e.toDer = function () {
          return t;
        }),
        e
      );
    }
    async sign(t) {
      let e = { name: "ECDSA", hash: { name: "SHA-256" } };
      return (
        this._keyPair.privateKey,
        await this._subtleCrypto.sign(e, this._keyPair.privateKey, t)
      );
    }
  };
  Zt();
  var Tr = Be(qr());
  Zt();
  var e0 = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    Yr = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    $e,
    ni = class {
      constructor(t) {
        $e.set(this, void 0), e0(this, $e, t, "f");
      }
      get rawKey() {
        return Yr(this, $e, "f").rawKey;
      }
      get derKey() {
        return Yr(this, $e, "f").derKey;
      }
      toDer() {
        return Yr(this, $e, "f").toDer();
      }
      getPublicKey() {
        return Yr(this, $e, "f");
      }
      getPrincipal() {
        return vt.from(Yr(this, $e, "f").rawKey);
      }
      transformRequest() {
        return Promise.reject(
          "Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.",
        );
      }
    };
  $e = new WeakMap();
  var r0 = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    n0 = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    i0 = function (r, t) {
      var e = {};
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) &&
          t.indexOf(n) < 0 &&
          (e[n] = r[n]);
      if (r != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, n = Object.getOwnPropertySymbols(r); i < n.length; i++)
          t.indexOf(n[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(r, n[i]) &&
            (e[n[i]] = r[n[i]]);
      return e;
    },
    ii,
    s0 = new TextEncoder().encode("ic-request-auth-delegation"),
    o0 = new TextEncoder().encode(`
ic-request`);
  function Xs(r) {
    if (typeof r != "string" || r.length < 64)
      throw new Error("Invalid public key.");
    return Gt(r);
  }
  var Br = class {
    constructor(t, e, n) {
      (this.pubkey = t), (this.expiration = e), (this.targets = n);
    }
    toCBOR() {
      return Tr.value.map(
        Object.assign(
          {
            pubkey: Tr.value.bytes(this.pubkey),
            expiration: Tr.value.u64(this.expiration.toString(16), 16),
          },
          this.targets && {
            targets: Tr.value.array(
              this.targets.map((t) => Tr.value.bytes(t.toUint8Array())),
            ),
          },
        ),
      );
    }
    toJSON() {
      return Object.assign(
        { expiration: this.expiration.toString(16), pubkey: Tt(this.pubkey) },
        this.targets && { targets: this.targets.map((t) => t.toHex()) },
      );
    }
  };
  async function a0(r, t, e, n) {
    let i = new Br(t.toDer(), BigInt(+e) * BigInt(1e6), n),
      s = new Uint8Array([...s0, ...new Uint8Array(wr(i))]),
      o = await r.sign(s);
    return { delegation: i, signature: o };
  }
  var Je = class r {
      constructor(t, e) {
        (this.delegations = t), (this.publicKey = e);
      }
      static async create(
        t,
        e,
        n = new Date(Date.now() + 15 * 60 * 1e3),
        i = {},
      ) {
        var s, o;
        let c = await a0(t, e, n, i.targets);
        return new r(
          [
            ...(((s = i.previous) === null || s === void 0
              ? void 0
              : s.delegations) || []),
            c,
          ],
          ((o = i.previous) === null || o === void 0 ? void 0 : o.publicKey) ||
            t.getPublicKey().toDer(),
        );
      }
      static fromJSON(t) {
        let { publicKey: e, delegations: n } =
          typeof t == "string" ? JSON.parse(t) : t;
        if (!Array.isArray(n)) throw new Error("Invalid delegations.");
        let i = n.map((s) => {
          let { delegation: o, signature: c } = s,
            { pubkey: u, expiration: y, targets: w } = o;
          if (w !== void 0 && !Array.isArray(w))
            throw new Error("Invalid targets.");
          return {
            delegation: new Br(
              Xs(u),
              BigInt("0x" + y),
              w &&
                w.map((_) => {
                  if (typeof _ != "string") throw new Error("Invalid target.");
                  return vt.fromHex(_);
                }),
            ),
            signature: Xs(c),
          };
        });
        return new this(i, Xs(e));
      }
      static fromDelegations(t, e) {
        return new this(t, e);
      }
      toJSON() {
        return {
          delegations: this.delegations.map((t) => {
            let { delegation: e, signature: n } = t,
              { targets: i } = e;
            return {
              delegation: Object.assign(
                { expiration: e.expiration.toString(16), pubkey: Tt(e.pubkey) },
                i && { targets: i.map((s) => s.toHex()) },
              ),
              signature: Tt(n),
            };
          }),
          publicKey: Tt(this.publicKey),
        };
      }
    },
    Xr = class extends Ee {
      constructor(t, e) {
        super(), (this._inner = t), (this._delegation = e);
      }
      static fromDelegation(t, e) {
        return new this(t, e);
      }
      getDelegation() {
        return this._delegation;
      }
      getPublicKey() {
        return {
          derKey: this._delegation.publicKey,
          toDer: () => this._delegation.publicKey,
        };
      }
      sign(t) {
        return this._inner.sign(t);
      }
      async transformRequest(t) {
        let { body: e } = t,
          n = i0(t, ["body"]),
          i = await wr(e);
        return Object.assign(Object.assign({}, n), {
          body: {
            content: e,
            sender_sig: await this.sign(
              new Uint8Array([...o0, ...new Uint8Array(i)]),
            ),
            sender_delegation: this._delegation.delegations,
            sender_pubkey: this._delegation.publicKey,
          },
        });
      }
    },
    Jr = class r extends ni {
      constructor(t, e) {
        super(t), ii.set(this, void 0), r0(this, ii, e, "f");
      }
      get delegation() {
        return n0(this, ii, "f");
      }
      static fromDelegation(t, e) {
        return new r(t, e);
      }
    };
  ii = new WeakMap();
  function si(r, t) {
    for (let { delegation: i } of r.delegations)
      if (+new Date(Number(i.expiration / BigInt(1e6))) <= +Date.now())
        return !1;
    let e = [],
      n = t?.scope;
    n &&
      (Array.isArray(n)
        ? e.push(...n.map((i) => (typeof i == "string" ? vt.fromText(i) : i)))
        : e.push(typeof n == "string" ? vt.fromText(n) : n));
    for (let i of e) {
      let s = i.toText();
      for (let { delegation: o } of r.delegations) {
        if (o.targets === void 0) continue;
        let c = !0;
        for (let u of o.targets)
          if (u.toText() === s) {
            c = !1;
            break;
          }
        if (c) return !1;
      }
    }
    return !0;
  }
  var c0 = Be(vn());
  lr();
  var Fc;
  (function (r) {
    r[(r.ECDSA_WITH_SHA256 = -7)] = "ECDSA_WITH_SHA256";
  })(Fc || (Fc = {}));
  var Oc = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"],
    Zr = class {
      constructor(t = {}) {
        var e;
        (this.callbacks = []),
          (this.idleTimeout = 10 * 60 * 1e3),
          (this.timeoutID = void 0);
        let { onIdle: n, idleTimeout: i = 10 * 60 * 1e3 } = t || {};
        (this.callbacks = n ? [n] : []), (this.idleTimeout = i);
        let s = this._resetTimer.bind(this);
        window.addEventListener("load", s, !0),
          Oc.forEach(function (c) {
            document.addEventListener(c, s, !0);
          });
        let o = (c, u) => {
          let y;
          return (...w) => {
            let _ = this,
              N = function () {
                (y = void 0), c.apply(_, w);
              };
            clearTimeout(y), (y = window.setTimeout(N, u));
          };
        };
        if (t?.captureScroll) {
          let c = o(
            s,
            (e = t?.scrollDebounce) !== null && e !== void 0 ? e : 100,
          );
          window.addEventListener("scroll", c, !0);
        }
        s();
      }
      static create(t = {}) {
        return new this(t);
      }
      registerCallback(t) {
        this.callbacks.push(t);
      }
      exit() {
        clearTimeout(this.timeoutID),
          window.removeEventListener("load", this._resetTimer, !0);
        let t = this._resetTimer.bind(this);
        Oc.forEach(function (e) {
          document.removeEventListener(e, t, !0);
        }),
          this.callbacks.forEach((e) => e());
      }
      _resetTimer() {
        let t = this.exit.bind(this);
        window.clearTimeout(this.timeoutID),
          (this.timeoutID = window.setTimeout(t, this.idleTimeout));
      }
    };
  var u0 = (r, t) => t.some((e) => r instanceof e),
    Pc,
    Mc;
  function f0() {
    return (
      Pc ||
      (Pc = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
    );
  }
  function l0() {
    return (
      Mc ||
      (Mc = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey,
      ])
    );
  }
  var Cc = new WeakMap(),
    Zs = new WeakMap(),
    kc = new WeakMap(),
    Js = new WeakMap(),
    to = new WeakMap();
  function h0(r) {
    let t = new Promise((e, n) => {
      let i = () => {
          r.removeEventListener("success", s),
            r.removeEventListener("error", o);
        },
        s = () => {
          e(me(r.result)), i();
        },
        o = () => {
          n(r.error), i();
        };
      r.addEventListener("success", s), r.addEventListener("error", o);
    });
    return (
      t
        .then((e) => {
          e instanceof IDBCursor && Cc.set(e, r);
        })
        .catch(() => {}),
      to.set(t, r),
      t
    );
  }
  function d0(r) {
    if (Zs.has(r)) return;
    let t = new Promise((e, n) => {
      let i = () => {
          r.removeEventListener("complete", s),
            r.removeEventListener("error", o),
            r.removeEventListener("abort", o);
        },
        s = () => {
          e(), i();
        },
        o = () => {
          n(r.error || new DOMException("AbortError", "AbortError")), i();
        };
      r.addEventListener("complete", s),
        r.addEventListener("error", o),
        r.addEventListener("abort", o);
    });
    Zs.set(r, t);
  }
  var Qs = {
    get(r, t, e) {
      if (r instanceof IDBTransaction) {
        if (t === "done") return Zs.get(r);
        if (t === "objectStoreNames") return r.objectStoreNames || kc.get(r);
        if (t === "store")
          return e.objectStoreNames[1]
            ? void 0
            : e.objectStore(e.objectStoreNames[0]);
      }
      return me(r[t]);
    },
    set(r, t, e) {
      return (r[t] = e), !0;
    },
    has(r, t) {
      return r instanceof IDBTransaction && (t === "done" || t === "store")
        ? !0
        : t in r;
    },
  };
  function $c(r) {
    Qs = r(Qs);
  }
  function p0(r) {
    return r === IDBDatabase.prototype.transaction &&
      !("objectStoreNames" in IDBTransaction.prototype)
      ? function (t, ...e) {
          let n = r.call(oi(this), t, ...e);
          return kc.set(n, t.sort ? t.sort() : [t]), me(n);
        }
      : l0().includes(r)
        ? function (...t) {
            return r.apply(oi(this), t), me(Cc.get(this));
          }
        : function (...t) {
            return me(r.apply(oi(this), t));
          };
  }
  function y0(r) {
    return typeof r == "function"
      ? p0(r)
      : (r instanceof IDBTransaction && d0(r),
        u0(r, f0()) ? new Proxy(r, Qs) : r);
  }
  function me(r) {
    if (r instanceof IDBRequest) return h0(r);
    if (Js.has(r)) return Js.get(r);
    let t = y0(r);
    return t !== r && (Js.set(r, t), to.set(t, r)), t;
  }
  var oi = (r) => to.get(r);
  function qc(
    r,
    t,
    { blocked: e, upgrade: n, blocking: i, terminated: s } = {},
  ) {
    let o = indexedDB.open(r, t),
      c = me(o);
    return (
      n &&
        o.addEventListener("upgradeneeded", (u) => {
          n(me(o.result), u.oldVersion, u.newVersion, me(o.transaction), u);
        }),
      e &&
        o.addEventListener("blocked", (u) => e(u.oldVersion, u.newVersion, u)),
      c
        .then((u) => {
          s && u.addEventListener("close", () => s()),
            i &&
              u.addEventListener("versionchange", (y) =>
                i(y.oldVersion, y.newVersion, y),
              );
        })
        .catch(() => {}),
      c
    );
  }
  var w0 = ["get", "getKey", "getAll", "getAllKeys", "count"],
    g0 = ["put", "add", "delete", "clear"],
    eo = new Map();
  function Vc(r, t) {
    if (!(r instanceof IDBDatabase && !(t in r) && typeof t == "string"))
      return;
    if (eo.get(t)) return eo.get(t);
    let e = t.replace(/FromIndex$/, ""),
      n = t !== e,
      i = g0.includes(e);
    if (
      !(e in (n ? IDBIndex : IDBObjectStore).prototype) ||
      !(i || w0.includes(e))
    )
      return;
    let s = async function (o, ...c) {
      let u = this.transaction(o, i ? "readwrite" : "readonly"),
        y = u.store;
      return (
        n && (y = y.index(c.shift())),
        (await Promise.all([y[e](...c), i && u.done]))[0]
      );
    };
    return eo.set(t, s), s;
  }
  $c((r) => ({
    ...r,
    get: (t, e, n) => Vc(t, e) || r.get(t, e, n),
    has: (t, e) => !!Vc(t, e) || r.has(t, e),
  }));
  var Lc = "auth-client-db",
    Hc = "ic-keyval",
    m0 = async (r = Lc, t = Hc, e) => (
      ai &&
        localStorage != null &&
        localStorage.getItem(Xt) &&
        (localStorage.removeItem(Xt), localStorage.removeItem(ue)),
      await qc(r, e, {
        upgrade: (n) => {
          n.objectStoreNames,
            n.objectStoreNames.contains(t) && n.clear(t),
            n.createObjectStore(t);
        },
      })
    );
  async function x0(r, t, e) {
    return await r.get(t, e);
  }
  async function _0(r, t, e, n) {
    return await r.put(t, n, e);
  }
  async function b0(r, t, e) {
    return await r.delete(t, e);
  }
  var Qr = class r {
    constructor(t, e) {
      (this._db = t), (this._storeName = e);
    }
    static async create(t) {
      let { dbName: e = Lc, storeName: n = Hc, version: i = Gc } = t ?? {},
        s = await m0(e, n, i);
      return new r(s, n);
    }
    async set(t, e) {
      return await _0(this._db, this._storeName, t, e);
    }
    async get(t) {
      var e;
      return (e = await x0(this._db, this._storeName, t)) !== null &&
        e !== void 0
        ? e
        : null;
    }
    async remove(t) {
      return await b0(this._db, this._storeName, t);
    }
  };
  var E0 = function (r, t, e, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof t == "function" ? r !== t || !i : !t.has(r))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(r, e) : i ? (i.value = e) : t.set(r, e), e;
    },
    A0 = function (r, t, e, n) {
      if (e === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? r !== t || !n : !t.has(r))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
    },
    ci,
    ue = "identity",
    Xt = "delegation",
    Kc = "iv",
    Gc = 1,
    ai = typeof window < "u",
    tn = class {
      constructor(t = "ic-", e) {
        (this.prefix = t), (this._localStorage = e);
      }
      get(t) {
        return Promise.resolve(
          this._getLocalStorage().getItem(this.prefix + t),
        );
      }
      set(t, e) {
        return (
          this._getLocalStorage().setItem(this.prefix + t, e), Promise.resolve()
        );
      }
      remove(t) {
        return (
          this._getLocalStorage().removeItem(this.prefix + t), Promise.resolve()
        );
      }
      _getLocalStorage() {
        if (this._localStorage) return this._localStorage;
        let t =
          typeof window > "u"
            ? typeof global > "u"
              ? typeof self > "u"
                ? void 0
                : self.localStorage
              : global.localStorage
            : window.localStorage;
        if (!t) throw new Error("Could not find local storage.");
        return t;
      }
    },
    Ze = class {
      constructor(t) {
        ci.set(this, void 0), E0(this, ci, t ?? {}, "f");
      }
      get _db() {
        return new Promise((t) => {
          if (this.initializedDb) {
            t(this.initializedDb);
            return;
          }
          Qr.create(A0(this, ci, "f")).then((e) => {
            (this.initializedDb = e), t(e);
          });
        });
      }
      async get(t) {
        return await (await this._db).get(t);
      }
      async set(t, e) {
        await (await this._db).set(t, e);
      }
      async remove(t) {
        await (await this._db).remove(t);
      }
    };
  ci = new WeakMap();
  var v0 = "https://identity.ic0.app",
    T0 = "#authorize",
    ro = "ECDSA",
    no = "Ed25519",
    B0 = 500,
    S0 = "UserInterrupt",
    ui = class {
      constructor(t, e, n, i, s, o, c, u) {
        (this._identity = t),
          (this._key = e),
          (this._chain = n),
          (this._storage = i),
          (this.idleManager = s),
          (this._createOptions = o),
          (this._idpWindow = c),
          (this._eventHandler = u),
          this._registerDefaultIdleCallback();
      }
      static async create(t = {}) {
        var e, n, i;
        let s = (e = t.storage) !== null && e !== void 0 ? e : new Ze(),
          o = (n = t.keyType) !== null && n !== void 0 ? n : ro,
          c = null;
        if (t.identity) c = t.identity;
        else {
          let _ = await s.get(ue);
          if (!_ && ai)
            try {
              let N = new tn(),
                q = await N.get(Xt),
                P = await N.get(ue);
              q &&
                P &&
                o === ro &&
                (console.log(
                  "Discovered an identity stored in localstorage. Migrating to IndexedDB",
                ),
                await s.set(Xt, q),
                await s.set(ue, P),
                (_ = q),
                await N.remove(Xt),
                await N.remove(ue));
            } catch (N) {
              console.error(
                "error while attempting to recover localstorage: " + N,
              );
            }
          if (_)
            try {
              typeof _ == "object"
                ? o === no && typeof _ == "string"
                  ? (c = await Xe.fromJSON(_))
                  : (c = await zr.fromKeyPair(_))
                : typeof _ == "string" && (c = Xe.fromJSON(_));
            } catch {}
        }
        let u = new gr(),
          y = null;
        if (c)
          try {
            let _ = await s.get(Xt);
            if (typeof _ == "object" && _ !== null)
              throw new Error(
                "Delegation chain is incorrectly stored. A delegation chain should be stored as a string.",
              );
            t.identity
              ? (u = t.identity)
              : _ &&
                ((y = Je.fromJSON(_)),
                si(y)
                  ? "toDer" in c
                    ? (u = Jr.fromDelegation(c, y))
                    : (u = Xr.fromDelegation(c, y))
                  : (await io(s), (c = null)));
          } catch (_) {
            console.error(_), await io(s), (c = null);
          }
        let w;
        return (
          !((i = t.idleOptions) === null || i === void 0) && i.disableIdle
            ? (w = void 0)
            : (y || t.identity) && (w = Zr.create(t.idleOptions)),
          c ||
            (o === no
              ? ((c = await Xe.generate()),
                await s.set(ue, JSON.stringify(c.toJSON())))
              : (t.storage &&
                  o === ro &&
                  console.warn(
                    `You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${no}' as the key type, as it can serialize to a string`,
                  ),
                (c = await zr.generate()),
                await s.set(ue, c.getKeyPair()))),
          new this(u, c, y, s, w, t)
        );
      }
      _registerDefaultIdleCallback() {
        var t, e;
        let n =
          (t = this._createOptions) === null || t === void 0
            ? void 0
            : t.idleOptions;
        !n?.onIdle &&
          !n?.disableDefaultIdleCallback &&
          ((e = this.idleManager) === null ||
            e === void 0 ||
            e.registerCallback(() => {
              this.logout(), location.reload();
            }));
      }
      async _handleSuccess(t, e) {
        var n, i;
        let s = t.delegations.map((y) => ({
            delegation: new Br(
              y.delegation.pubkey,
              y.delegation.expiration,
              y.delegation.targets,
            ),
            signature: y.signature.buffer,
          })),
          o = Je.fromDelegations(s, t.userPublicKey.buffer),
          c = this._key;
        if (!c) return;
        (this._chain = o),
          "toDer" in c
            ? (this._identity = Jr.fromDelegation(c, this._chain))
            : (this._identity = Xr.fromDelegation(c, this._chain)),
          (n = this._idpWindow) === null || n === void 0 || n.close();
        let u =
          (i = this._createOptions) === null || i === void 0
            ? void 0
            : i.idleOptions;
        !this.idleManager &&
          !u?.disableIdle &&
          ((this.idleManager = Zr.create(u)),
          this._registerDefaultIdleCallback()),
          this._removeEventListener(),
          delete this._idpWindow,
          this._chain &&
            (await this._storage.set(Xt, JSON.stringify(this._chain.toJSON()))),
          e?.(t);
      }
      getIdentity() {
        return this._identity;
      }
      async isAuthenticated() {
        return (
          !this.getIdentity().getPrincipal().isAnonymous() &&
          this._chain !== null
        );
      }
      async login(t) {
        var e, n, i, s;
        let o = BigInt(8) * BigInt(36e11),
          c = new URL(
            ((e = t?.identityProvider) === null || e === void 0
              ? void 0
              : e.toString()) || v0,
          );
        (c.hash = T0),
          (n = this._idpWindow) === null || n === void 0 || n.close(),
          this._removeEventListener(),
          (this._eventHandler = this._getEventHandler(
            c,
            Object.assign(
              {
                maxTimeToLive:
                  (i = t?.maxTimeToLive) !== null && i !== void 0 ? i : o,
              },
              t,
            ),
          )),
          window.addEventListener("message", this._eventHandler),
          (this._idpWindow =
            (s = window.open(
              c.toString(),
              "idpWindow",
              t?.windowOpenerFeatures,
            )) !== null && s !== void 0
              ? s
              : void 0);
        let u = () => {
          this._idpWindow &&
            (this._idpWindow.closed
              ? this._handleFailure(S0, t?.onError)
              : setTimeout(u, B0));
        };
        u();
      }
      _getEventHandler(t, e) {
        return async (n) => {
          var i, s, o;
          if (n.origin !== t.origin) {
            console.warn(
              `WARNING: expected origin '${t.origin}', got '${n.origin}' (ignoring)`,
            );
            return;
          }
          let c = n.data;
          switch (c.kind) {
            case "authorize-ready": {
              let u = Object.assign(
                {
                  kind: "authorize-client",
                  sessionPublicKey: new Uint8Array(
                    (i = this._key) === null || i === void 0
                      ? void 0
                      : i.getPublicKey().toDer(),
                  ),
                  maxTimeToLive: e?.maxTimeToLive,
                  allowPinAuthentication: e?.allowPinAuthentication,
                  derivationOrigin:
                    (s = e?.derivationOrigin) === null || s === void 0
                      ? void 0
                      : s.toString(),
                },
                e?.customValues,
              );
              (o = this._idpWindow) === null ||
                o === void 0 ||
                o.postMessage(u, t.origin);
              break;
            }
            case "authorize-client-success":
              try {
                await this._handleSuccess(c, e?.onSuccess);
              } catch (u) {
                this._handleFailure(u.message, e?.onError);
              }
              break;
            case "authorize-client-failure":
              this._handleFailure(c.text, e?.onError);
              break;
            default:
              break;
          }
        };
      }
      _handleFailure(t, e) {
        var n;
        (n = this._idpWindow) === null || n === void 0 || n.close(),
          e?.(t),
          this._removeEventListener(),
          delete this._idpWindow;
      }
      _removeEventListener() {
        this._eventHandler &&
          window.removeEventListener("message", this._eventHandler),
          (this._eventHandler = void 0);
      }
      async logout(t = {}) {
        if (
          (await io(this._storage),
          (this._identity = new gr()),
          (this._chain = null),
          t.returnTo)
        )
          try {
            window.history.pushState({}, "", t.returnTo);
          } catch {
            window.location.href = t.returnTo;
          }
      }
    };
  async function io(r) {
    await r.remove(ue), await r.remove(Xt), await r.remove(Kc);
  }
  var am = BigInt(144e11);
  var jc = 1e3;
  var Dc = () =>
    ui.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    });
  onmessage = ({ data: r }) => {
    let { msg: t } = r;
    switch (t) {
      case "junoStartAuthTimer":
        I0();
        return;
      case "junoStopAuthTimer":
        Wc();
        return;
    }
  };
  var fi,
    I0 = () => (fi = setInterval(async () => await N0(), jc)),
    Wc = () => {
      fi && (clearInterval(fi), (fi = void 0));
    },
    N0 = async () => {
      let [r, t] = await Promise.all([U0(), R0()]);
      if (r && t.valid && t.delegation !== null) {
        O0(t.delegation);
        return;
      }
      F0();
    },
    U0 = async () => (await Dc()).isAuthenticated(),
    R0 = async () => {
      let t = await new Ze().get(Xt),
        e = t !== null ? Je.fromJSON(t) : null;
      return { valid: e !== null && si(e), delegation: e };
    },
    F0 = () => {
      Wc(), postMessage({ msg: "junoSignOutAuthTimer" });
    },
    O0 = (r) => {
      let t = r.delegations[0]?.delegation.expiration;
      if (t === void 0) return;
      let e = new Date(Number(t / BigInt(1e6))).getTime() - Date.now();
      postMessage({
        msg: "junoDelegationRemainingTime",
        data: { authRemainingTime: e },
      });
    };
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
