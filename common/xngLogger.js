(function() {
    var a = require("../config/config.js"), b = function() {
        var a = getApp();
        if (a && a.xu.uid) return a.xu.uid;
        var b = wx.getStorageSync("xng_mini_app_uid");
        return b || (b = c(), wx.setStorageSync({
            key: "xng_mini_app_uid",
            data: b
        }), a && a.xu && (a.xu.uid = b)), b;
    }, c = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
            return c.toString(16);
        });
    }, d = function(a) {
        if (!a) return "";
        var b = [];
        return Object.keys(a).forEach(function(c) {
            "object" == typeof a[c] ? b.push(c + "=" + JSON.stringify(a[c])) : b.push(c + "=" + a[c]);
        }), b.join("&");
    }, e = function(b, c) {
        var e = a.apiDomain_XNG;
        e += "moniter" === b ? "/monlog" : "traffic" === b ? "/traflog" : "/alllog", wx.request({
            url: e,
            data: d(c),
            header: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
    }, f = function(c, d) {
        var e = getApp(), f = e && e.xu || {};
        if (d.ac = c, d.proj = "xbd", d.sdk_version = e.sysInfo.SDKVersion, d.v = a.versionCode, 
        d.uid = f.uid || b(), f && f.mid && (d.mid = f.mid), f && f.logLevel && (d.level = f.logLevel), 
        f && f.logInfo && f.logInfo.in_samp && (d.samp = f.logInfo.in_samp), "undefined" != typeof getCurrentPages && null !== getCurrentPages) {
            var g = getCurrentPages(), h = g[g.length - 1];
            if (h) {
                var i = h.__route__.split("/");
                d.pg = i && 1 < i.length ? i[i.length - 1] : h.__route__;
            }
        }
        return d;
    }, g = function() {
        return !("online" !== a.xngEnv);
    };
    module.exports = {
        logMoniter: function(a, b) {
            g() && e("moniter", f(a, b));
        },
        logTraffic: function(a, b) {
            g() && e("traffic", f(a, b));
        },
        logAll: function(a, b) {
            g() && e("all", f(a, b || {}));
        }
    };
})();