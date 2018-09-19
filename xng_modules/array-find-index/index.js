module.exports = function(a, b, c) {
    if ("function" == typeof Array.prototype.findIndex) return a.findIndex(b, c);
    if ("function" != typeof b) throw new TypeError("predicate must be a function");
    var d = Object(a), e = d.length;
    if (0 === e) return -1;
    for (var f = 0; f < e; f++) if (b.call(c, d[f], f, d)) return f;
    return -1;
};