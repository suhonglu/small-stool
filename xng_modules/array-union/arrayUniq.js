module.exports = "Set" in global ? "function" == typeof Set.prototype.forEach && function() {
    var a = !1;
    return new Set([ !0 ]).forEach(function(b) {
        a = b;
    }), !0 === a;
}() ? function(a) {
    var b = [];
    return new Set(a).forEach(function(a) {
        b.push(a);
    }), b;
} : function(a) {
    var b = new Set();
    return a.filter(function(a) {
        return !b.has(a) && (b.add(a), !0);
    });
} : function(a) {
    for (var b = [], c = 0; c < a.length; c++) -1 === b.indexOf(a[c]) && b.push(a[c]);
    return b;
};