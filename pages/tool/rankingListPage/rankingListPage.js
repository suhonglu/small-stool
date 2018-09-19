(function() {
    var a = require("../../../actions/index.js"), b = require("../../../actions/active.js"), c = getApp(), d = c.store.dispatch, e = require("../../../common/utils.js"), f = require("../../../common/wxUtils.js"), g = c.sysInfo, h = g.windowWidth, i = g.windowHeight;
    Page({
        data: {
            toast: {
                hidden: !0,
                text: ""
            }
        },
        tplMsgFormSubmit: e.tplMsgFormSubmit,
        onLoad: function(a) {
            var b = this;
            c.xu.mta.Page.init(), f.setChannelData(a), f.handleFetchUserInfo(c).then(function(a) {
                b.setData({
                    ownWxNick: a.nickName
                });
            }), this.handleInitialize();
        },
        onShow: function() {},
        onReady: function() {},
        onShareAppMessage: function() {
            var a = this.data.gameTimes, b = this.data.counter, c = this.data.ownWxNick;
            return {
                title: c + "送你一个红包, 点击领取>>"
            };
        },
        handleInitialize: function() {
            this.setData();
        },
        onRryAgainBtnClick: function() {
            var a = getCurrentPages(), b = a[a.length - 2];
            wx.navigateBack(), b.handleReadyToRestart && b.handleReadyToRestart();
        }
    });
})();