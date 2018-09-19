(function() {
    function b(c) {
        wx.getNetworkType({
            success: function(a) {
                c(a.networkType);
            }
        });
    }
    function c() {
        var b = wx.getSystemInfoSync();
        return {
            adt: encodeURIComponent(b.model),
            scl: b.pixelRatio,
            scr: b.windowWidth + "x" + b.windowHeight,
            lg: b.language,
            fl: b.version,
            jv: encodeURIComponent(b.system),
            tz: encodeURIComponent(b.platform)
        };
    }
    function d() {
        try {
            return wx.getStorageSync(n.prefix + "auid");
        } catch (b) {}
    }
    function e() {
        try {
            var b = h();
            return wx.setStorageSync(n.prefix + "auid", b), b;
        } catch (a) {}
    }
    function f() {
        try {
            return wx.getStorageSync(n.prefix + "ssid");
        } catch (b) {}
    }
    function g() {
        try {
            var b = "s" + h();
            return wx.setStorageSync(n.prefix + "ssid", b), b;
        } catch (a) {}
    }
    function h(b) {
        return (b || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date() % 1e10;
    }
    function i() {
        try {
            var c = getCurrentPages(), a = "/";
            return 0 < c.length && (a = c.pop().__route__), a;
        } catch (a) {
            console.log("get current page path error:" + a);
        }
    }
    function j() {
        var c = {
            dm: "wechat.apps.xx",
            url: i(),
            pvi: "",
            si: "",
            ty: 0
        };
        return c.pvi = function() {
            var a = d();
            return a || (a = e(), c.ty = 1), a;
        }(), c.si = function() {
            var b = f();
            return b || (b = g()), b;
        }(), c;
    }
    function l() {
        var d = c();
        return b(function(b) {
            wx.setStorageSync(n.prefix + "ntdata", b);
        }), d.ct = wx.getStorageSync(n.prefix + "ntdata") || "4g", d;
    }
    function m() {
        return {
            r2: n.app_id,
            r4: "wx",
            ext: "v=" + n.version + (null === k.Data.userInfo ? "" : ";ui=" + JSON.stringify(k.Data.userInfo))
        };
    }
    var n = {
        app_id: "",
        event_id: "",
        api_base: "https://pingtas.qq.com/pingd",
        prefix: "_mta_",
        version: "1.3.3",
        stat_share_app: !1,
        stat_pull_down_fresh: !1,
        stat_reach_bottom: !1
    }, k = {
        App: {
            init: function(b) {
                "appID" in b && (n.app_id = b.appID), "eventID" in b && (n.event_id = b.eventID), 
                "statShareApp" in b && (n.stat_share_app = b.statShareApp), "statPullDownFresh" in b && (n.stat_pull_down_fresh = b.statPullDownFresh), 
                "statReachBottom" in b && (n.stat_reach_bottom = b.statReachBottom), g(), "lauchOpts" in b && (k.Data.lanchInfo = b.lauchOpts, 
                k.Data.lanchInfo.landing = 1);
            }
        },
        Page: {
            init: function() {
                var c = getCurrentPages()[getCurrentPages().length - 1];
                !c.onShow || function() {
                    var a = c.onShow;
                    c.onShow = function() {
                        k.Page.stat(), a.call(this, arguments);
                    };
                }(), n.stat_pull_down_fresh && c.onPullDownRefresh && !function() {
                    var a = c.onPullDownRefresh;
                    c.onPullDownRefresh = function() {
                        k.Event.stat(n.prefix + "pulldownfresh", {
                            url: c.__route__
                        }), a.call(this, arguments);
                    };
                }(), n.stat_reach_bottom && c.onReachBottom && !function() {
                    var a = c.onReachBottom;
                    c.onReachBottom = function() {
                        k.Event.stat(n.prefix + "reachbottom", {
                            url: c.__route__
                        }), a.call(this, arguments);
                    };
                }(), n.stat_share_app && c.onShareAppMessage && !function() {
                    var a = c.onShareAppMessage;
                    c.onShareAppMessage = function() {
                        return k.Event.stat(n.prefix + "shareapp", {
                            url: c.__route__
                        }), a.call(this, arguments);
                    };
                }();
            },
            stat: function() {
                if ("" != n.app_id) {
                    var d = [], a = m(), b = [ j(), a, l() ];
                    k.Data.lanchInfo && (b.push({
                        ht: k.Data.lanchInfo.scene,
                        rdm: "/",
                        rurl: k.Data.lanchInfo.path
                    }), k.Data.lanchInfo.query && k.Data.lanchInfo.query._mta_ref_id && b.push({
                        rarg: k.Data.lanchInfo.query._mta_ref_id
                    }), k.Data.lanchInfo.landing && (a.ext += ";lp=1", delete k.Data.lanchInfo.landing)), 
                    b.push({
                        rand: +new Date()
                    });
                    for (var a = 0, c = b.length; a < c; a++) for (var e in b[a]) b[a].hasOwnProperty(e) && d.push(e + "=" + ("undefined" == typeof b[a][e] ? "" : b[a][e]));
                    wx.request({
                        url: n.api_base + "?" + d.join("&").toLowerCase()
                    });
                }
            }
        },
        Event: {
            stat: function(i, a) {
                if ("" != n.event_id) {
                    var o = [], c = j(), e = m();
                    c.dm = "wxapps.click", c.url = i, e.r2 = n.event_id;
                    var f = "undefined" == typeof a ? {} : a;
                    var d, g = [];
                    for (d in f) f.hasOwnProperty(d) && g.push(d + "=" + f[d]);
                    for (f = g.join(";"), e.r5 = f, f = 0, c = [ c, e, l(), {
                        rand: +new Date()
                    } ], e = c.length; f < e; f++) for (var k in c[f]) c[f].hasOwnProperty(k) && o.push(k + "=" + ("undefined" == typeof c[f][k] ? "" : c[f][k]));
                    wx.request({
                        url: n.api_base + "?" + o.join("&").toLowerCase()
                    });
                }
            }
        },
        Data: {
            userInfo: null,
            lanchInfo: null
        }
    };
    module.exports = k;
})();