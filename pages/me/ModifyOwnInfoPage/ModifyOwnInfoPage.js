(function() {
    var a = getApp(), b = require("../../../config/config.js"), c = require("../../../common/utils.js"), d = require("../../../xng_modules/object-assign/index.js"), e = a.store.dispatch, f = require("../../../actions/me.js"), g = require("../../../actions/index.js");
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap",
                rightText: "确定",
                rightDisable: !0,
                onRightTap: "handleModifyOwnInfo"
            },
            toast: {
                hidden: !0,
                text: ""
            },
            nick: "",
            targetAttr: "",
            inpInitValue: "",
            inpLiveValue: ""
        },
        tplMsgFormSubmit: c.tplMsgFormSubmit,
        onLoad: function(b) {
            a.xu.mta.Page.init();
            var c = a.xu.token, d = b.nick, e = b.attr;
            this.setData({
                nick: d,
                targetAttr: e
            });
        },
        onReady: function() {
            var a = this.data.inpBeforeValue;
            this.setData({
                inpInitValue: a
            });
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        mapStateToData: function(a) {
            var b = this.data.nick, c = this.data.targetAttr, d = a.wx.user, e = d[c];
            this.setData({
                inpBeforeValue: e
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = this, e = this.data.navBar;
            this.setData({
                inpLiveValue: b,
                navBar: d({}, e, {
                    rightDisable: !b
                })
            });
        },
        handleModifyOwnInfo: function() {
            var a = this.data.inpLiveValue, b = this.data.targetAttr;
            this.modifyOwnInfoFn(b, a);
        },
        modifyOwnInfoFn: function(b, c) {
            var d = this;
            console.log(b, c);
            var g = "";
            switch (b) {
              case "nick":
                g = "modifyOwnNick";
                break;

              default:
                return;
            }
            var h = a.xu.token, i = this.data.nick;
            wx.showLoading && wx.showLoading({
                title: "修改中",
                mask: !0
            }), e(f[g]({
                token: h,
                nick: i,
                value: c,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), wx.navigateBack(), e(f.fetchMyMomentList({
                        token: h,
                        nextStartID: 0
                    })), wx.showToast({
                        title: "修改成功",
                        duration: 1e3
                    });
                },
                fail: function(a) {
                    wx.hideLoading && wx.hideLoading();
                    var b = d.data.inpLiveValue;
                    d.setData({
                        inpInitValue: b
                    }), d.handleRequestErr(a);
                }
            }));
        }
    });
})();