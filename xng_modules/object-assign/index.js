function a(a) {
    if (null === a || a === void 0) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
}

var b = Object.prototype.hasOwnProperty, c = Object.prototype.propertyIsEnumerable;

module.exports = function() {
    try {
        if (!Object.assign) return !1;
        var a = new String("abc");
        if (a[5] = "de", "5" === Object.getOwnPropertyNames(a)[0]) return !1;
        for (var b = {}, c = 0; 10 > c; c++) b["_" + String.fromCharCode(c)] = c;
        var d = Object.getOwnPropertyNames(b).map(function(a) {
            return b[a];
        });
        if ("0123456789" !== d.join("")) return !1;
        var e = {};
        return [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t" ].forEach(function(a) {
            e[a] = a;
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, e)).join("");
    } catch (a) {
        return !1;
    }
}() ? Object.assign : function(d) {
    for (var e, f, g = a(d), h = 1; h < arguments.length; h++) {
        for (var j in e = Object(arguments[h]), e) b.call(e, j) && (g[j] = e[j]);
        if (Object.getOwnPropertySymbols) {
            f = Object.getOwnPropertySymbols(e);
            for (var k = 0; k < f.length; k++) c.call(e, f[k]) && (g[f[k]] = e[f[k]]);
        }
    }
    return g;
};