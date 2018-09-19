(function() {
    function a(a, b, c) {
        switch (c.length) {
          case 0:
            return a.call(b);

          case 1:
            return a.call(b, c[0]);

          case 2:
            return a.call(b, c[0], c[1]);

          case 3:
            return a.call(b, c[0], c[1], c[2]);
        }
        return a.apply(b, c);
    }
    function b(a, b) {
        var c = a ? a.length : 0;
        return !!c && -1 < g(a, b, 0);
    }
    function c(a, b, c) {
        for (var d = -1, e = a ? a.length : 0; ++d < e; ) if (c(b, a[d])) return !0;
        return !1;
    }
    function d(a, b) {
        for (var c = -1, d = b.length, e = a.length; ++c < d; ) a[e + c] = b[c];
        return a;
    }
    function e(a, b) {
        for (var c = -1, d = a ? a.length : 0; ++c < d; ) if (b(a[c], c, a)) return !0;
        return !1;
    }
    function f(a, b, c, d) {
        for (var e = a.length, f = c + (d ? 1 : -1); d ? f-- : ++f < e; ) if (b(a[f], f, a)) return f;
        return -1;
    }
    function g(a, b, c) {
        if (b !== b) return f(a, h, c);
        for (var d = c - 1, e = a.length; ++d < e; ) if (a[d] === b) return d;
        return -1;
    }
    function h(a) {
        return a !== a;
    }
    function i(a) {
        return function(b) {
            return null == b ? void 0 : b[a];
        };
    }
    function j(a, b) {
        for (var c = -1, d = Array(a); ++c < a; ) d[c] = b(c);
        return d;
    }
    function k(a, b) {
        return a.has(b);
    }
    function l(a, b) {
        return null == a ? void 0 : a[b];
    }
    function m(a) {
        var b = !1;
        if (null != a && "function" != typeof a.toString) try {
            b = !!(a + "");
        } catch (a) {}
        return b;
    }
    function n(a) {
        var b = -1, c = Array(a.size);
        return a.forEach(function(a, d) {
            c[++b] = [ d, a ];
        }), c;
    }
    function o(a) {
        var b = -1, c = Array(a.size);
        return a.forEach(function(a) {
            c[++b] = a;
        }), c;
    }
    function p(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function q(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function r(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function s(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.__data__ = new r(); ++b < c; ) this.add(a[b]);
    }
    function t(a) {
        this.__data__ = new q(a);
    }
    function u(a, b) {
        var c = Ob(a) || da(a) ? j(a.length, String) : [], d = c.length;
        for (var e in a) (b || mb.call(a, e)) && !(!!d && ("length" == e || T(e, d))) && c.push(e);
        return c;
    }
    function v(a, b) {
        for (var c = a.length; c--; ) if (ca(a[c][0], b)) return c;
        return -1;
    }
    function w(a, b, c, e, f) {
        var g = -1, h = a.length;
        for (c || (c = S), f || (f = []); ++g < h; ) {
            var i = a[g];
            0 < b && c(i) ? 1 < b ? w(i, b - 1, c, e, f) : d(f, i) : !e && (f[f.length] = i);
        }
        return f;
    }
    function x(a, b) {
        b = U(b, a) ? [ b ] : K(b);
        for (var c = 0, d = b.length; null != a && c < d; ) a = a[$(b[c++])];
        return c && c == d ? a : void 0;
    }
    function y(a, b) {
        return null != a && b in Object(a);
    }
    function z(a, b, c, d, e) {
        return !(a !== b) || (null != a && null != b && (ia(a) || ja(b)) ? A(a, b, z, c, d, e) : a !== a && b !== b);
    }
    function A(a, b, c, d, e, f) {
        var g = Ob(a), h = Ob(b), i = za, j = za;
        g || (i = Lb(a), i = i == ya ? Ha : i), h || (j = Lb(b), j = j == ya ? Ha : j);
        var k = i == Ha && !m(a), l = j == Ha && !m(b), n = i == j;
        if (n && !k) return f || (f = new t()), g || Pb(a) ? L(a, b, c, d, e, f) : M(a, b, i, c, d, e, f);
        if (!(e & va)) {
            var o = k && mb.call(a, "__wrapped__"), p = l && mb.call(b, "__wrapped__");
            if (o || p) {
                var q = o ? a.value() : a, r = p ? b.value() : b;
                return f || (f = new t()), c(q, r, d, e, f);
            }
        }
        return !!n && (f || (f = new t()), N(a, b, c, d, e, f));
    }
    function B(a, b, c, d) {
        var e = c.length, f = e, g = !d;
        if (null == a) return !f;
        for (a = Object(a); e--; ) {
            var h = c[e];
            if (g && h[2] ? h[1] !== a[h[0]] : !(h[0] in a)) return !1;
        }
        for (;++e < f; ) {
            h = c[e];
            var i = h[0], j = a[i], k = h[1];
            if (!(g && h[2])) {
                var l = new t();
                if (d) var m = d(j, k, i, a, b, l);
                if (void 0 === m ? !z(k, j, d, ua | va, l) : !m) return !1;
            } else if (void 0 === j && !(i in a)) return !1;
        }
        return !0;
    }
    function C(a) {
        if (!ia(a) || W(a)) return !1;
        var b = ga(a) || m(a) ? ob : Wa;
        return b.test(_(a));
    }
    function D(a) {
        return "function" == typeof a ? a : null == a ? pa : "object" == typeof a ? Ob(a) ? G(a[0], a[1]) : F(a) : qa(a);
    }
    function E(a) {
        if (!X(a)) return ub(a);
        var b = [];
        for (var c in Object(a)) mb.call(a, c) && "constructor" != c && b.push(c);
        return b;
    }
    function F(a) {
        var b = P(a);
        return 1 == b.length && b[0][2] ? Z(b[0][0], b[0][1]) : function(c) {
            return c === a || B(c, a, b);
        };
    }
    function G(a, b) {
        return U(a) && Y(b) ? Z($(a), b) : function(c) {
            var d = ma(c, a);
            return d === void 0 && d === b ? na(c, a) : z(b, d, void 0, ua | va);
        };
    }
    function H(a) {
        return function(b) {
            return x(b, a);
        };
    }
    function I(a) {
        if ("string" == typeof a) return a;
        if (ka(a)) return Jb ? Jb.call(a) : "";
        var b = a + "";
        return "0" == b && 1 / a == -wa ? "-0" : b;
    }
    function J(a, d, e) {
        var f = -1, g = b, h = a.length, i = !0, j = [], l = j;
        if (e) i = !1, g = c; else if (h >= ra) {
            var m = d ? null : Kb(a);
            if (m) return o(m);
            i = !1, g = k, l = new s();
        } else l = d ? [] : j;
        outer: for (;++f < h; ) {
            var n = a[f], p = d ? d(n) : n;
            if (n = e || 0 !== n ? n : 0, i && p === p) {
                for (var q = l.length; q--; ) if (l[q] === p) continue outer;
                d && l.push(p), j.push(n);
            } else g(l, p, e) || (l !== j && l.push(p), j.push(n));
        }
        return j;
    }
    function K(a) {
        return Ob(a) ? a : Mb(a);
    }
    function L(a, b, c, d, f, g) {
        var h = f & va, i = a.length, j = b.length;
        if (i != j && !(h && j > i)) return !1;
        var k = g.get(a);
        if (k && g.get(b)) return k == b;
        var l = -1, m = !0, n = f & ua ? new s() : void 0;
        for (g.set(a, b), g.set(b, a); ++l < i; ) {
            var o = a[l], p = b[l];
            if (d) var q = h ? d(p, o, l, b, a, g) : d(o, p, l, a, b, g);
            if (void 0 !== q) {
                if (q) continue;
                m = !1;
                break;
            }
            if (n) {
                if (!e(b, function(a, b) {
                    if (!n.has(b) && (o === a || c(o, a, d, f, g))) return n.add(b);
                })) {
                    m = !1;
                    break;
                }
            } else if (!(o === p || c(o, p, d, f, g))) {
                m = !1;
                break;
            }
        }
        return g["delete"](a), g["delete"](b), m;
    }
    function M(a, b, c, d, e, f, g) {
        switch (c) {
          case Pa:
            if (a.byteLength != b.byteLength || a.byteOffset != b.byteOffset) return !1;
            a = a.buffer, b = b.buffer;

          case Oa:
            return a.byteLength == b.byteLength && d(new qb(a), new qb(b));

          case Aa:
          case Ba:
          case Ga:
            return ca(+a, +b);

          case Ca:
            return a.name == b.name && a.message == b.message;

          case Ja:
          case La:
            return a == b + "";

          case Fa:
            var h = n;

          case Ka:
            var i = f & va;
            if (h || (h = o), a.size != b.size && !i) return !1;
            var j = g.get(a);
            if (j) return j == b;
            f |= ua, g.set(a, b);
            var k = L(h(a), h(b), d, e, f, g);
            return g["delete"](a), k;

          case Ma:
            if (Ib) return Ib.call(a) == Ib.call(b);
        }
        return !1;
    }
    function N(a, b, c, d, e, f) {
        var g = e & va, h = oa(a), i = h.length, j = oa(b), k = j.length;
        if (i != k && !g) return !1;
        for (var l, m = i; m--; ) if (l = h[m], g ? !(l in b) : !mb.call(b, l)) return !1;
        var n = f.get(a);
        if (n && f.get(b)) return n == b;
        var o = !0;
        f.set(a, b), f.set(b, a);
        for (var p = g; ++m < i; ) {
            l = h[m];
            var q = a[l], r = b[l];
            if (d) var s = g ? d(r, q, l, b, a, f) : d(q, r, l, a, b, f);
            if (void 0 === s ? !(q === r || c(q, r, d, e, f)) : !s) {
                o = !1;
                break;
            }
            p || (p = "constructor" == l);
        }
        if (o && !p) {
            var t = a.constructor, u = b.constructor;
            t != u && "constructor" in a && "constructor" in b && !("function" == typeof t && t instanceof t && "function" == typeof u && u instanceof u) && (o = !1);
        }
        return f["delete"](a), f["delete"](b), o;
    }
    function O(a, b) {
        var c = a.__data__;
        return V(b) ? c["string" == typeof b ? "string" : "hash"] : c.map;
    }
    function P(a) {
        for (var b = oa(a), c = b.length; c--; ) {
            var d = b[c], e = a[d];
            b[c] = [ d, e, Y(e) ];
        }
        return b;
    }
    function Q(a, b) {
        var c = l(a, b);
        return C(c) ? c : void 0;
    }
    function R(a, b, c) {
        b = U(b, a) ? [ b ] : K(b);
        for (var d, e = -1, f = b.length; ++e < f; ) {
            var g = $(b[e]);
            if (!(d = null != a && c(a, g))) break;
            a = a[g];
        }
        if (d) return d;
        var f = a ? a.length : 0;
        return !!f && ha(f) && T(g, f) && (Ob(a) || da(a));
    }
    function S(a) {
        return Ob(a) || da(a) || !!(tb && a && a[tb]);
    }
    function T(a, b) {
        return b = null == b ? xa : b, !!b && ("number" == typeof a || Xa.test(a)) && -1 < a && 0 == a % 1 && a < b;
    }
    function U(a, b) {
        if (Ob(a)) return !1;
        var c = typeof a;
        return "number" == c || "symbol" == c || "boolean" == c || null == a || ka(a) || Ra.test(a) || !Qa.test(a) || null != b && a in Object(b);
    }
    function V(a) {
        var b = typeof a;
        return "string" == b || "number" == b || "symbol" == b || "boolean" == b ? "__proto__" !== a : null === a;
    }
    function W(a) {
        return !!kb && kb in a;
    }
    function X(a) {
        var b = a && a.constructor, c = "function" == typeof b && b.prototype || ib;
        return a === c;
    }
    function Y(a) {
        return a === a && !ia(a);
    }
    function Z(a, b) {
        return function(c) {
            return null != c && c[a] === b && (b !== void 0 || a in Object(c));
        };
    }
    function $(a) {
        if ("string" == typeof a || ka(a)) return a;
        var b = a + "";
        return "0" == b && 1 / a == -wa ? "-0" : b;
    }
    function _(a) {
        if (null != a) {
            try {
                return lb.call(a);
            } catch (a) {}
            try {
                return a + "";
            } catch (a) {}
        }
        return "";
    }
    function aa(a) {
        var b = a ? a.length : 0;
        return b ? a[b - 1] : void 0;
    }
    function ba(a, b) {
        if ("function" != typeof a || b && "function" != typeof b) throw new TypeError(sa);
        var c = function() {
            var d = arguments, e = b ? b.apply(this, d) : d[0], f = c.cache;
            if (f.has(e)) return f.get(e);
            var g = a.apply(this, d);
            return c.cache = f.set(e, g), g;
        };
        return c.cache = new (ba.Cache || r)(), c;
    }
    function ca(a, b) {
        return a === b || a !== a && b !== b;
    }
    function da(a) {
        return fa(a) && mb.call(a, "callee") && (!rb.call(a, "callee") || nb.call(a) == ya);
    }
    function ea(a) {
        return null != a && ha(a.length) && !ga(a);
    }
    function fa(a) {
        return ja(a) && ea(a);
    }
    function ga(a) {
        var b = ia(a) ? nb.call(a) : "";
        return b == Da || b == Ea;
    }
    function ha(a) {
        return "number" == typeof a && -1 < a && 0 == a % 1 && a <= xa;
    }
    function ia(a) {
        var b = typeof a;
        return !!a && ("object" == b || "function" == b);
    }
    function ja(a) {
        return !!a && "object" == typeof a;
    }
    function ka(a) {
        return "symbol" == typeof a || ja(a) && nb.call(a) == Ma;
    }
    function la(a) {
        return null == a ? "" : I(a);
    }
    function ma(a, b, c) {
        var d = null == a ? void 0 : x(a, b);
        return d === void 0 ? c : d;
    }
    function na(a, b) {
        return null != a && R(a, b, y);
    }
    function oa(a) {
        return ea(a) ? u(a) : E(a);
    }
    function pa(a) {
        return a;
    }
    function qa(a) {
        return U(a) ? i($(a)) : H(a);
    }
    var ra = 200, sa = "Expected a function", ta = "__lodash_hash_undefined__", ua = 1, va = 2, wa = 1 / 0, xa = 9007199254740991, ya = "[object Arguments]", za = "[object Array]", Aa = "[object Boolean]", Ba = "[object Date]", Ca = "[object Error]", Da = "[object Function]", Ea = "[object GeneratorFunction]", Fa = "[object Map]", Ga = "[object Number]", Ha = "[object Object]", Ia = "[object Promise]", Ja = "[object RegExp]", Ka = "[object Set]", La = "[object String]", Ma = "[object Symbol]", Na = "[object WeakMap]", Oa = "[object ArrayBuffer]", Pa = "[object DataView]", Qa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ra = /^\w*$/, Sa = /^\./, Ta = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ua = /[\\^$.*+?()[\]{}|]/g, Va = /\\(\\)?/g, Wa = /^\[object .+?Constructor\]$/, Xa = /^(?:0|[1-9]\d*)$/, Ya = {};
    Ya["[object Float32Array]"] = Ya["[object Float64Array]"] = Ya["[object Int8Array]"] = Ya["[object Int16Array]"] = Ya["[object Int32Array]"] = Ya["[object Uint8Array]"] = Ya["[object Uint8ClampedArray]"] = Ya["[object Uint16Array]"] = Ya["[object Uint32Array]"] = !0, 
    Ya[ya] = Ya[za] = Ya[Oa] = Ya[Aa] = Ya[Pa] = Ya[Ba] = Ya[Ca] = Ya[Da] = Ya[Fa] = Ya[Ga] = Ya[Ha] = Ya[Ja] = Ya[Ka] = Ya[La] = Ya[Na] = !1;
    var Za = "object" == typeof global && global && global.Object === Object && global, $a = "object" == typeof self && self && self.Object === Object && self, _a = Za || $a || Function("return this")(), ab = "object" == typeof exports && exports && !exports.nodeType && exports, bb = ab && "object" == typeof module && module && !module.nodeType && module, cb = bb && bb.exports === ab, db = cb && Za.process, eb = function() {
        try {
            return db && db.binding("util");
        } catch (a) {}
    }(), fb = eb && eb.isTypedArray, gb = Array.prototype, hb = Function.prototype, ib = Object.prototype, jb = _a["__core-js_shared__"], kb = function() {
        var a = /[^.]+$/.exec(jb && jb.keys && jb.keys.IE_PROTO || "");
        return a ? "Symbol(src)_1." + a : "";
    }(), lb = hb.toString, mb = ib.hasOwnProperty, nb = ib.toString, ob = RegExp("^" + lb.call(mb).replace(Ua, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), pb = _a.Symbol, qb = _a.Uint8Array, rb = ib.propertyIsEnumerable, sb = gb.splice, tb = pb ? pb.isConcatSpreadable : void 0, ub = function(a, b) {
        return function(c) {
            return a(b(c));
        };
    }(Object.keys, Object), vb = Math.max, wb = Q(_a, "DataView"), xb = Q(_a, "Map"), yb = Q(_a, "Promise"), zb = Q(_a, "Set"), Ab = Q(_a, "WeakMap"), Bb = Q(Object, "create"), Cb = _(wb), Db = _(xb), Eb = _(yb), Fb = _(zb), Gb = _(Ab), Hb = pb ? pb.prototype : void 0, Ib = Hb ? Hb.valueOf : void 0, Jb = Hb ? Hb.toString : void 0;
    p.prototype.clear = function() {
        this.__data__ = Bb ? Bb(null) : {};
    }, p.prototype["delete"] = function(a) {
        return this.has(a) && delete this.__data__[a];
    }, p.prototype.get = function(a) {
        var b = this.__data__;
        if (Bb) {
            var c = b[a];
            return c === ta ? void 0 : c;
        }
        return mb.call(b, a) ? b[a] : void 0;
    }, p.prototype.has = function(a) {
        var b = this.__data__;
        return Bb ? b[a] !== void 0 : mb.call(b, a);
    }, p.prototype.set = function(a, b) {
        var c = this.__data__;
        return c[a] = Bb && void 0 === b ? ta : b, this;
    }, q.prototype.clear = function() {
        this.__data__ = [];
    }, q.prototype["delete"] = function(a) {
        var b = this.__data__, c = v(b, a);
        if (0 > c) return !1;
        var d = b.length - 1;
        return c == d ? b.pop() : sb.call(b, c, 1), !0;
    }, q.prototype.get = function(a) {
        var b = this.__data__, c = v(b, a);
        return 0 > c ? void 0 : b[c][1];
    }, q.prototype.has = function(a) {
        return -1 < v(this.__data__, a);
    }, q.prototype.set = function(a, b) {
        var c = this.__data__, d = v(c, a);
        return 0 > d ? c.push([ a, b ]) : c[d][1] = b, this;
    }, r.prototype.clear = function() {
        this.__data__ = {
            hash: new p(),
            map: new (xb || q)(),
            string: new p()
        };
    }, r.prototype["delete"] = function(a) {
        return O(this, a)["delete"](a);
    }, r.prototype.get = function(a) {
        return O(this, a).get(a);
    }, r.prototype.has = function(a) {
        return O(this, a).has(a);
    }, r.prototype.set = function(a, b) {
        return O(this, a).set(a, b), this;
    }, s.prototype.add = s.prototype.push = function(a) {
        return this.__data__.set(a, ta), this;
    }, s.prototype.has = function(a) {
        return this.__data__.has(a);
    }, t.prototype.clear = function() {
        this.__data__ = new q();
    }, t.prototype["delete"] = function(a) {
        return this.__data__["delete"](a);
    }, t.prototype.get = function(a) {
        return this.__data__.get(a);
    }, t.prototype.has = function(a) {
        return this.__data__.has(a);
    }, t.prototype.set = function(a, b) {
        var c = this.__data__;
        if (c instanceof q) {
            var d = c.__data__;
            if (!xb || d.length < ra - 1) return d.push([ a, b ]), this;
            c = this.__data__ = new r(d);
        }
        return c.set(a, b), this;
    };
    var Kb = zb && 1 / o(new zb([ , -0 ]))[1] == wa ? function(a) {
        return new zb(a);
    } : function() {}, Lb = function(a) {
        return nb.call(a);
    };
    (wb && Lb(new wb(new ArrayBuffer(1))) != Pa || xb && Lb(new xb()) != Fa || yb && Lb(yb.resolve()) != Ia || zb && Lb(new zb()) != Ka || Ab && Lb(new Ab()) != Na) && (Lb = function(a) {
        var b = nb.call(a), c = b == Ha ? a.constructor : void 0, d = c ? _(c) : void 0;
        if (d) switch (d) {
          case Cb:
            return Pa;

          case Db:
            return Fa;

          case Eb:
            return Ia;

          case Fb:
            return Ka;

          case Gb:
            return Na;
        }
        return b;
    });
    var Mb = ba(function(a) {
        a = la(a);
        var b = [];
        return Sa.test(a) && b.push(""), a.replace(Ta, function(a, c, d, e) {
            b.push(d ? e.replace(Va, "$1") : c || a);
        }), b;
    }), Nb = function(b, c) {
        return c = vb(void 0 === c ? b.length - 1 : c, 0), function() {
            for (var d = arguments, e = -1, f = vb(d.length - c, 0), g = Array(f); ++e < f; ) g[e] = d[c + e];
            e = -1;
            for (var h = Array(c + 1); ++e < c; ) h[e] = d[e];
            return h[c] = g, a(b, this, h);
        };
    }(function(a) {
        var b = aa(a);
        return fa(b) && (b = void 0), J(w(a, 1, fa, !0), D(b, 2));
    });
    ba.Cache = r;
    var Ob = Array.isArray, Pb = fb ? function(a) {
        return function(b) {
            return a(b);
        };
    }(fb) : function(a) {
        return ja(a) && ha(a.length) && !!Ya[nb.call(a)];
    };
    module.exports = Nb;
})();