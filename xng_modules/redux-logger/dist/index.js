(function() {
    (function(a, b) {
        module.exports = b();
    })(this, function() {
        return function(a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = c[d] = {
                    exports: {},
                    id: d,
                    loaded: !1
                };
                return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports;
            }
            var c = {};
            return b.m = a, b.c = c, b.p = "", b(0);
        }([ function(a, b, c) {
            c(1), a.exports = c(1);
        }, function(a) {
            "use strict";
            function b(a) {
                if (Array.isArray(a)) {
                    for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
                    return c;
                }
                return Array.from(a);
            }
            function c(a) {
                return a && "undefined" != typeof Symbol && a.constructor === Symbol ? "symbol" : typeof a;
            }
            function d(a, d, e, f) {
                switch ("undefined" == typeof a ? "undefined" : c(a)) {
                  case "object":
                    return "function" == typeof a[f] ? a[f].apply(a, b(e)) : a[f];

                  case "function":
                    return a(d);

                  default:
                    return a;
                }
            }
            var e = function(a, b) {
                return Array(b + 1).join(a);
            }, f = function(a, b) {
                return e("0", b - a.toString().length) + a;
            }, g = function(a) {
                return "@ " + f(a.getHours(), 2) + ":" + f(a.getMinutes(), 2) + ":" + f(a.getSeconds(), 2) + "." + f(a.getMilliseconds(), 3);
            }, h = "undefined" != typeof performance && "function" == typeof performance.now ? performance : Date;
            a.exports = function() {
                function a() {
                    z.forEach(function(a, b) {
                        var c = a.started, f = a.startedTime, h = a.action, j = a.prevState, l = a.error, m = a.took, o = a.nextState, q = z[b + 1];
                        q && (o = q.prevState, m = q.started - c);
                        var r = u(h), s = "function" == typeof k ? k(function() {
                            return o;
                        }, h) : k, t = g(f), v = y.title ? "color: " + y.title(r) + ";" : null, w = "action " + (p ? t : "") + " " + r.type + " " + (n ? "(in " + m.toFixed(2) + " ms)" : "");
                        try {
                            s ? y.title ? i.groupCollapsed("%c " + w, v) : i.groupCollapsed(w) : y.title ? i.group("%c " + w, v) : i.group(w);
                        } catch (a) {
                            i.log(w);
                        }
                        var x = d(e, r, [ j ], "prevState"), A = d(e, r, [ r ], "action"), B = d(e, r, [ l, j ], "error"), C = d(e, r, [ o ], "nextState");
                        x && (y.prevState ? i[x]("%c prev state", "color: " + y.prevState(j) + "; font-weight: bold", j) : i[x]("prev state", j)), 
                        A && (y.action ? i[A]("%c action", "color: " + y.action(r) + "; font-weight: bold", r) : i[A]("action", r)), 
                        l && B && (y.error ? i[B]("%c error", "color: " + y.error(l, j) + "; font-weight: bold", l) : i[B]("error", l)), 
                        C && (y.nextState ? i[C]("%c next state", "color: " + y.nextState(o) + "; font-weight: bold", o) : i[C]("next state", o));
                        try {
                            i.groupEnd();
                        } catch (a) {
                            i.log("—— log end ——");
                        }
                    }), z.length = 0;
                }
                var b = 0 >= arguments.length || arguments[0] === void 0 ? {} : arguments[0], c = b.level, e = c === void 0 ? "log" : c, f = b.logger, i = f === void 0 ? console : f, j = b.logErrors, k = b.collapsed, l = b.predicate, m = b.duration, n = m !== void 0 && m, o = b.timestamp, p = !(o !== void 0) || o, q = b.transformer, r = b.stateTransformer, s = r === void 0 ? function(a) {
                    return a;
                } : r, t = b.actionTransformer, u = t === void 0 ? function(a) {
                    return a;
                } : t, v = b.errorTransformer, w = v === void 0 ? function(a) {
                    return a;
                } : v, x = b.colors, y = x === void 0 ? {
                    title: function() {
                        return "#000000";
                    },
                    prevState: function() {
                        return "#9E9E9E";
                    },
                    action: function() {
                        return "#03A9F4";
                    },
                    nextState: function() {
                        return "#4CAF50";
                    },
                    error: function() {
                        return "#F20404";
                    }
                } : x;
                if ("undefined" == typeof i) return function() {
                    return function(a) {
                        return function(b) {
                            return a(b);
                        };
                    };
                };
                q && console.error("Option 'transformer' is deprecated, use stateTransformer instead");
                var z = [];
                return function(b) {
                    var c = b.getState;
                    return function(b) {
                        return function(d) {
                            if ("function" == typeof l && !l(c, d)) return b(d);
                            var f = {};
                            z.push(f), f.started = h.now(), f.startedTime = new Date(), f.prevState = s(c()), 
                            f.action = d;
                            var e;
                            if (!(j !== void 0) || j) try {
                                e = b(d);
                            } catch (a) {
                                f.error = w(a);
                            } else e = b(d);
                            if (f.took = h.now() - f.started, f.nextState = s(c()), a(), f.error) throw f.error;
                            return e;
                        };
                    };
                };
            };
        } ]);
    });
})();