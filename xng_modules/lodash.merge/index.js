(function() {
    function a(a, b) {
        return a.set(b[0], b[1]), a;
    }
    function b(a, b) {
        return a.add(b), a;
    }
    function c(a, b, c) {
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
    function d(a, b) {
        for (var c = -1, d = a ? a.length : 0; ++c < d && !(!1 === b(a[c], c, a)); ) ;
        return a;
    }
    function e(a, b) {
        for (var c = -1, d = b.length, e = a.length; ++c < d; ) a[e + c] = b[c];
        return a;
    }
    function f(a, b, c, d) {
        var e = -1, f = a ? a.length : 0;
        for (d && f && (c = a[++e]); ++e < f; ) c = b(c, a[e], e, a);
        return c;
    }
    function g(a, b) {
        for (var c = -1, d = Array(a); ++c < a; ) d[c] = b(c);
        return d;
    }
    function h(a, b) {
        return null == a ? void 0 : a[b];
    }
    function i(a) {
        var b = !1;
        if (null != a && "function" != typeof a.toString) try {
            b = !!(a + "");
        } catch (a) {}
        return b;
    }
    function j(a) {
        var b = -1, c = Array(a.size);
        return a.forEach(function(a, d) {
            c[++b] = [ d, a ];
        }), c;
    }
    function k(a, b) {
        return function(c) {
            return a(b(c));
        };
    }
    function l(a) {
        var b = -1, c = Array(a.size);
        return a.forEach(function(a) {
            c[++b] = a;
        }), c;
    }
    function m(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function n(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function o(a) {
        var b = -1, c = a ? a.length : 0;
        for (this.clear(); ++b < c; ) {
            var d = a[b];
            this.set(d[0], d[1]);
        }
    }
    function p(a) {
        this.__data__ = new n(a);
    }
    function q(a, b) {
        var c = Mb(a) || ba(a) ? g(a.length, String) : [], d = c.length;
        for (var e in a) (b || ib.call(a, e)) && !(!!d && ("length" == e || V(e, d))) && c.push(e);
        return c;
    }
    function r(a, b, c) {
        (c === void 0 || aa(a[b], c)) && ("number" != typeof b || c !== void 0 || b in a) || (a[b] = c);
    }
    function s(a, b, c) {
        var d = a[b];
        ib.call(a, b) && aa(d, c) && (c !== void 0 || b in a) || (a[b] = c);
    }
    function t(a, b) {
        for (var c = a.length; c--; ) if (aa(a[c][0], b)) return c;
        return -1;
    }
    function u(a, b) {
        return a && N(b, ka(b), a);
    }
    function v(a, b, c, e, f, g, h) {
        var j;
        if (e && (j = g ? e(a, f, g, h) : e(a)), void 0 !== j) return j;
        if (!ga(a)) return a;
        var k = Mb(a);
        if (!k) {
            var l = Lb(a), m = l == ta || l == ua;
            if (Nb(a)) return E(a, b);
            if (l == xa || l == oa || m && !g) {
                if (i(a)) return g ? a : {};
                if (j = T(m ? {} : a), !b) return O(a, u(j, a));
            } else {
                if (!Ua[l]) return g ? a : {};
                j = U(a, l, v, b);
            }
        } else if (j = S(a), !b) return M(a, j);
        h || (h = new p());
        var n = h.get(a);
        if (n) return n;
        if (h.set(a, j), !k) var o = c ? P(a) : ka(a);
        return d(o || a, function(d, f) {
            o && (f = d, d = a[f]), s(j, f, v(d, b, c, e, f, a, h));
        }), j;
    }
    function w(a) {
        return ga(a) ? qb(a) : {};
    }
    function x(a, b, c) {
        var d = b(a);
        return Mb(a) ? d : e(d, c(a));
    }
    function y(a) {
        if (!ga(a) || Y(a)) return !1;
        var b = ea(a) || i(a) ? lb : Ra;
        return b.test(_(a));
    }
    function z(a) {
        if (!Z(a)) return vb(a);
        var b = [];
        for (var c in Object(a)) ib.call(a, c) && "constructor" != c && b.push(c);
        return b;
    }
    function A(a) {
        if (!ga(a)) return $(a);
        var b = Z(a), c = [];
        for (var d in a) ("constructor" != d || !b && ib.call(a, d)) && c.push(d);
        return c;
    }
    function B(a, b, c, e, f) {
        if (a !== b) {
            if (!(Mb(b) || Ob(b))) var g = A(b);
            d(g || b, function(d, h) {
                if (g && (h = d, d = b[h]), ga(d)) f || (f = new p()), C(a, b, h, c, B, e, f); else {
                    var i = e ? e(a[h], d, h + "", a, b, f) : void 0;
                    void 0 === i && (i = d), r(a, h, i);
                }
            });
        }
    }
    function C(a, b, c, d, e, f, g) {
        var h = a[c], i = b[c], j = g.get(i);
        if (j) return void r(a, c, j);
        var k = f ? f(h, i, c + "", a, b, g) : void 0, l = k === void 0;
        l && (k = i, Mb(i) || Ob(i) ? Mb(h) ? k = h : da(h) ? k = M(h) : (l = !1, k = v(i, !0)) : ia(i) || ba(i) ? ba(h) ? k = ja(h) : !ga(h) || d && ea(h) ? (l = !1, 
        k = v(i, !0)) : k = h : l = !1), l && (g.set(i, k), e(k, i, d, f, g), g["delete"](i)), 
        r(a, c, k);
    }
    function D(a, b) {
        return b = wb(void 0 === b ? a.length - 1 : b, 0), function() {
            for (var d = arguments, e = -1, f = wb(d.length - b, 0), g = Array(f); ++e < f; ) g[e] = d[b + e];
            e = -1;
            for (var h = Array(b + 1); ++e < b; ) h[e] = d[e];
            return h[b] = g, c(a, this, h);
        };
    }
    function E(a, b) {
        if (b) return a.slice();
        var c = new a.constructor(a.length);
        return a.copy(c), c;
    }
    function F(a) {
        var b = new a.constructor(a.byteLength);
        return new ob(b).set(new ob(a)), b;
    }
    function G(a, b) {
        var c = b ? F(a.buffer) : a.buffer;
        return new a.constructor(c, a.byteOffset, a.byteLength);
    }
    function H(b, c, d) {
        var e = c ? d(j(b), !0) : j(b);
        return f(e, a, new b.constructor());
    }
    function I(a) {
        var b = new a.constructor(a.source, Qa.exec(a));
        return b.lastIndex = a.lastIndex, b;
    }
    function J(a, c, d) {
        var e = c ? d(l(a), !0) : l(a);
        return f(e, b, new a.constructor());
    }
    function K(a) {
        return Jb ? Object(Jb.call(a)) : {};
    }
    function L(a, b) {
        var c = b ? F(a.buffer) : a.buffer;
        return new a.constructor(c, a.byteOffset, a.length);
    }
    function M(a, b) {
        var c = -1, d = a.length;
        for (b || (b = Array(d)); ++c < d; ) b[c] = a[c];
        return b;
    }
    function N(a, b, c, d) {
        c || (c = {});
        for (var e = -1, f = b.length; ++e < f; ) {
            var g = b[e], h = d ? d(c[g], a[g], g, c, a) : void 0;
            s(c, g, h === void 0 ? a[g] : h);
        }
        return c;
    }
    function O(a, b) {
        return N(a, Kb(a), b);
    }
    function P(a) {
        return x(a, ka, Kb);
    }
    function Q(a, b) {
        var c = a.__data__;
        return X(b) ? c["string" == typeof b ? "string" : "hash"] : c.map;
    }
    function R(a, b) {
        var c = h(a, b);
        return y(c) ? c : void 0;
    }
    function S(a) {
        var b = a.length, c = a.constructor(b);
        return b && "string" == typeof a[0] && ib.call(a, "index") && (c.index = a.index, 
        c.input = a.input), c;
    }
    function T(a) {
        return "function" != typeof a.constructor || Z(a) ? {} : w(pb(a));
    }
    function U(a, b, c, d) {
        var e = a.constructor;
        return b === Ea ? F(a) : b === qa || b === ra ? new e(+a) : b === Fa ? G(a, d) : b === Ga || b === Ha || b === Ia || b === Ja || b === Ka || b === La || b === Ma || b === Na || b === Oa ? L(a, d) : b === va ? H(a, d, c) : b === wa || b === Ba ? new e(a) : b === za ? I(a) : b === Aa ? J(a, d, c) : b === Ca ? K(a) : void 0;
    }
    function V(a, b) {
        return b = null == b ? na : b, !!b && ("number" == typeof a || Sa.test(a)) && -1 < a && 0 == a % 1 && a < b;
    }
    function W(a, b, c) {
        if (!ga(c)) return !1;
        var d = typeof b;
        return !("number" == d ? !(ca(c) && V(b, c.length)) : !("string" == d && b in c)) && aa(c[b], a);
    }
    function X(a) {
        var b = typeof a;
        return "string" == b || "number" == b || "symbol" == b || "boolean" == b ? "__proto__" !== a : null === a;
    }
    function Y(a) {
        return !!gb && gb in a;
    }
    function Z(a) {
        var b = a && a.constructor, c = "function" == typeof b && b.prototype || eb;
        return a === c;
    }
    function $(a) {
        var b = [];
        if (null != a) for (var c in Object(a)) b.push(c);
        return b;
    }
    function _(a) {
        if (null != a) {
            try {
                return hb.call(a);
            } catch (a) {}
            try {
                return a + "";
            } catch (a) {}
        }
        return "";
    }
    function aa(a, b) {
        return a === b || a !== a && b !== b;
    }
    function ba(a) {
        return da(a) && ib.call(a, "callee") && (!rb.call(a, "callee") || kb.call(a) == oa);
    }
    function ca(a) {
        return null != a && fa(a.length) && !ea(a);
    }
    function da(a) {
        return ha(a) && ca(a);
    }
    function ea(a) {
        var b = ga(a) ? kb.call(a) : "";
        return b == ta || b == ua;
    }
    function fa(a) {
        return "number" == typeof a && -1 < a && 0 == a % 1 && a <= na;
    }
    function ga(a) {
        var b = typeof a;
        return !!a && ("object" == b || "function" == b);
    }
    function ha(a) {
        return !!a && "object" == typeof a;
    }
    function ia(a) {
        if (!ha(a) || kb.call(a) != xa || i(a)) return !1;
        var b = pb(a);
        if (null === b) return !0;
        var c = ib.call(b, "constructor") && b.constructor;
        return "function" == typeof c && c instanceof c && hb.call(c) == jb;
    }
    function ja(a) {
        return N(a, la(a));
    }
    function ka(a) {
        return ca(a) ? q(a) : z(a);
    }
    function la(a) {
        return ca(a) ? q(a, !0) : A(a);
    }
    var ma = "__lodash_hash_undefined__", na = 9007199254740991, oa = "[object Arguments]", pa = "[object Array]", qa = "[object Boolean]", ra = "[object Date]", sa = "[object Error]", ta = "[object Function]", ua = "[object GeneratorFunction]", va = "[object Map]", wa = "[object Number]", xa = "[object Object]", ya = "[object Promise]", za = "[object RegExp]", Aa = "[object Set]", Ba = "[object String]", Ca = "[object Symbol]", Da = "[object WeakMap]", Ea = "[object ArrayBuffer]", Fa = "[object DataView]", Ga = "[object Float32Array]", Ha = "[object Float64Array]", Ia = "[object Int8Array]", Ja = "[object Int16Array]", Ka = "[object Int32Array]", La = "[object Uint8Array]", Ma = "[object Uint8ClampedArray]", Na = "[object Uint16Array]", Oa = "[object Uint32Array]", Pa = /[\\^$.*+?()[\]{}|]/g, Qa = /\w*$/, Ra = /^\[object .+?Constructor\]$/, Sa = /^(?:0|[1-9]\d*)$/, Ta = {};
    Ta[Ga] = Ta[Ha] = Ta[Ia] = Ta[Ja] = Ta[Ka] = Ta[La] = Ta[Ma] = Ta[Na] = Ta[Oa] = !0, 
    Ta[oa] = Ta[pa] = Ta[Ea] = Ta[qa] = Ta[Fa] = Ta[ra] = Ta[sa] = Ta[ta] = Ta[va] = Ta[wa] = Ta[xa] = Ta[za] = Ta[Aa] = Ta[Ba] = Ta[Da] = !1;
    var Ua = {};
    Ua[oa] = Ua[pa] = Ua[Ea] = Ua[Fa] = Ua[qa] = Ua[ra] = Ua[Ga] = Ua[Ha] = Ua[Ia] = Ua[Ja] = Ua[Ka] = Ua[va] = Ua[wa] = Ua[xa] = Ua[za] = Ua[Aa] = Ua[Ba] = Ua[Ca] = Ua[La] = Ua[Ma] = Ua[Na] = Ua[Oa] = !0, 
    Ua[sa] = Ua[ta] = Ua[Da] = !1;
    var Va = "object" == typeof global && global && global.Object === Object && global, Wa = "object" == typeof self && self && self.Object === Object && self, Xa = Va || Wa || Function("return this")(), Ya = "object" == typeof exports && exports && !exports.nodeType && exports, Za = Ya && "object" == typeof module && module && !module.nodeType && module, $a = Za && Za.exports === Ya, _a = $a && Va.process, ab = function() {
        try {
            return _a && _a.binding("util");
        } catch (a) {}
    }(), bb = ab && ab.isTypedArray, cb = Array.prototype, db = Function.prototype, eb = Object.prototype, fb = Xa["__core-js_shared__"], gb = function() {
        var a = /[^.]+$/.exec(fb && fb.keys && fb.keys.IE_PROTO || "");
        return a ? "Symbol(src)_1." + a : "";
    }(), hb = db.toString, ib = eb.hasOwnProperty, jb = hb.call(Object), kb = eb.toString, lb = RegExp("^" + hb.call(ib).replace(Pa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), mb = $a ? Xa.Buffer : void 0, nb = Xa.Symbol, ob = Xa.Uint8Array, pb = k(Object.getPrototypeOf, Object), qb = Object.create, rb = eb.propertyIsEnumerable, sb = cb.splice, tb = Object.getOwnPropertySymbols, ub = mb ? mb.isBuffer : void 0, vb = k(Object.keys, Object), wb = Math.max, xb = R(Xa, "DataView"), yb = R(Xa, "Map"), zb = R(Xa, "Promise"), Ab = R(Xa, "Set"), Bb = R(Xa, "WeakMap"), Cb = R(Object, "create"), Db = _(xb), Eb = _(yb), Fb = _(zb), Gb = _(Ab), Hb = _(Bb), Ib = nb ? nb.prototype : void 0, Jb = Ib ? Ib.valueOf : void 0;
    m.prototype.clear = function() {
        this.__data__ = Cb ? Cb(null) : {};
    }, m.prototype["delete"] = function(a) {
        return this.has(a) && delete this.__data__[a];
    }, m.prototype.get = function(a) {
        var b = this.__data__;
        if (Cb) {
            var c = b[a];
            return c === ma ? void 0 : c;
        }
        return ib.call(b, a) ? b[a] : void 0;
    }, m.prototype.has = function(a) {
        var b = this.__data__;
        return Cb ? b[a] !== void 0 : ib.call(b, a);
    }, m.prototype.set = function(a, b) {
        var c = this.__data__;
        return c[a] = Cb && void 0 === b ? ma : b, this;
    }, n.prototype.clear = function() {
        this.__data__ = [];
    }, n.prototype["delete"] = function(a) {
        var b = this.__data__, c = t(b, a);
        if (0 > c) return !1;
        var d = b.length - 1;
        return c == d ? b.pop() : sb.call(b, c, 1), !0;
    }, n.prototype.get = function(a) {
        var b = this.__data__, c = t(b, a);
        return 0 > c ? void 0 : b[c][1];
    }, n.prototype.has = function(a) {
        return -1 < t(this.__data__, a);
    }, n.prototype.set = function(a, b) {
        var c = this.__data__, d = t(c, a);
        return 0 > d ? c.push([ a, b ]) : c[d][1] = b, this;
    }, o.prototype.clear = function() {
        this.__data__ = {
            hash: new m(),
            map: new (yb || n)(),
            string: new m()
        };
    }, o.prototype["delete"] = function(a) {
        return Q(this, a)["delete"](a);
    }, o.prototype.get = function(a) {
        return Q(this, a).get(a);
    }, o.prototype.has = function(a) {
        return Q(this, a).has(a);
    }, o.prototype.set = function(a, b) {
        return Q(this, a).set(a, b), this;
    }, p.prototype.clear = function() {
        this.__data__ = new n();
    }, p.prototype["delete"] = function(a) {
        return this.__data__["delete"](a);
    }, p.prototype.get = function(a) {
        return this.__data__.get(a);
    }, p.prototype.has = function(a) {
        return this.__data__.has(a);
    }, p.prototype.set = function(a, b) {
        var c = this.__data__;
        if (c instanceof n) {
            var d = c.__data__;
            if (!yb || d.length < 200 - 1) return d.push([ a, b ]), this;
            c = this.__data__ = new o(d);
        }
        return c.set(a, b), this;
    };
    var Kb = tb ? k(tb, Object) : function() {
        return [];
    }, Lb = function(a) {
        return kb.call(a);
    };
    (xb && Lb(new xb(new ArrayBuffer(1))) != Fa || yb && Lb(new yb()) != va || zb && Lb(zb.resolve()) != ya || Ab && Lb(new Ab()) != Aa || Bb && Lb(new Bb()) != Da) && (Lb = function(a) {
        var b = kb.call(a), c = b == xa ? a.constructor : void 0, d = c ? _(c) : void 0;
        if (d) switch (d) {
          case Db:
            return Fa;

          case Eb:
            return va;

          case Fb:
            return ya;

          case Gb:
            return Aa;

          case Hb:
            return Da;
        }
        return b;
    });
    var Mb = Array.isArray, Nb = ub || function() {
        return !1;
    }, Ob = bb ? function(a) {
        return function(b) {
            return a(b);
        };
    }(bb) : function(a) {
        return ha(a) && fa(a.length) && !!Ta[kb.call(a)];
    }, Pb = function(a) {
        return D(function(b, c) {
            var d = -1, e = c.length, f = 1 < e ? c[e - 1] : void 0, g = 2 < e ? c[2] : void 0;
            for (f = 3 < a.length && "function" == typeof f ? (e--, f) : void 0, g && W(c[0], c[1], g) && (f = 3 > e ? void 0 : f, 
            e = 1), b = Object(b); ++d < e; ) {
                var h = c[d];
                h && a(b, h, d, f);
            }
            return b;
        });
    }(function(a, b, c) {
        B(a, b, c);
    });
    module.exports = Pb;
})();