(function() {
    function a(c, f, g, h, i, j) {
        return new d(function(d, k) {
            var l = getApp(), m = l ? l.xu : {
                uid: e.getStorageSync("xng_mini_app_uid")
            };
            f && "" !== f || (f = JSON.stringify({
                uid: m.uid
            })), "object" != ("undefined" == typeof f ? "undefined" : typeof f) && (f = JSON.parse(f)), 
            f.uid = f.uid || m.uid || "", f.proj = "xbd", f.env = b.xngEnv, f.version_code = b.versionCode, 
            f.sdk_version = l.sysInfo.SDKVersion, f.weichat_version = l.sysInfo.version;
            +new Date();
            if ("token" in f) l.fetchTokenFn(function(b) {
                if (f.token = b, "POST" == g) try {
                    wx.request({
                        url: c,
                        data: f,
                        header: {
                            "Content-Type": "application/json"
                        },
                        method: g,
                        success: function(b) {
                            b.data && 1 === b.data.ret ? d(h(b.data)) : b.data && -100 === b.data.ret ? (wx.hideLoading && wx.hideLoading(), 
                            l.xu.showToast(b.data.desc), j && j()) : b.data && 100201 === b.data.ret ? (wx.removeStorageSync("xng_mini_app_token"), 
                            l.xu.token = "", a(c, f, g, h, i).then(d).catch(k)) : k(b.data);
                        },
                        fail: function(a) {
                            k(a);
                        },
                        complete: function() {}
                    });
                } catch (a) {}
            }); else if ("POST" == g) try {
                wx.request({
                    url: c,
                    data: f,
                    header: {
                        "Content-Type": "application/json"
                    },
                    method: g,
                    success: function(a) {
                        a.data && 1 === a.data.ret ? d(h(a.data)) : a.data && -100 === a.data.ret ? l.xu.showToast(a.data.desc) : k(a.data);
                    },
                    fail: function(a) {
                        k(a);
                    },
                    complete: function() {}
                });
            } catch (a) {}
        });
    }
    var b = require("../config/config.js"), c = require("../xng_modules/object-assign/index.js"), d = require("../xng_modules/es6-promise.min.js").Promise, e = require("../common/wxUtils.js");
    module.exports = function() {
        return function(b) {
            return function(e) {
                function f(a) {
                    var b = c({}, e, a);
                    return delete b.SERVER_API, b;
                }
                var g = e.SERVER_API;
                if ("undefined" == typeof g) return b(e);
                var h = g.types, i = g.url, j = g.param, k = g.method, l = g.normalizeFunc, m = g.successCallback, n = g.failCallback, o = g.completeCallback, p = g.logInfo;
                if ("string" != typeof i) throw new Error("Specify a string url.");
                if ("string" != typeof j) throw new Error("Specify a string param.");
                if (!Array.isArray(h) || 3 !== h.length) throw new Error("Expected an array of three action types.");
                if (!h.every(function(a) {
                    return "string" == typeof a;
                })) throw new Error("Expected action types to be strings.");
                var q = h[0], r = h[1], s = h[2];
                return b(f({
                    type: q
                })), new d(function(c, d) {
                    a(i, j, k, l, p || {}, o).then(function(a) {
                        b(f({
                            response: a,
                            type: r
                        })), m && m(a.data), o && o(a.data), c(a.data);
                    }).catch(function(a) {
                        var c = a.msg || a.message || "网络错误，请稍后再试";
                        b(f({
                            type: s,
                            response: a,
                            msg: c
                        })), n && n(c, a.ret), o && o(c, a.ret), d(c);
                    });
                });
            };
        };
    };
})();