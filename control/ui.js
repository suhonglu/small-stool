(function() {
    var a = null;
    module.exports = {
        showToast: function(b, c, d) {
            if (c = 2 > arguments.length || void 0 === arguments[1] ? 2e3 : arguments[1], "undefined" != typeof getCurrentPages && null !== getCurrentPages) {
                var e = getCurrentPages(), f = e[e.length - 1];
                a && clearTimeout(a), f.setData({
                    toast: {
                        hidden: !1,
                        text: b
                    }
                }), a = setTimeout(function() {
                    f.setData({
                        toast: {
                            hidden: !0,
                            text: ""
                        }
                    }), d && d();
                }, c);
            }
        },
        showLowVersionAlert: function() {
            wx.showModal({
                title: "微信版本过低",
                content: "当前微信版本过低, 可能影响您的使用体验, 建议升级微信后重新打开",
                confirmText: "我知道了",
                showCancel: !1
            });
        }
    };
})();