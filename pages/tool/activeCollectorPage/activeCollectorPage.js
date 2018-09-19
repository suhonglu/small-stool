(function() {
    var a = require("../../../actions/index.js"), b = require("../../../actions/active.js"), c = getApp(), d = c.store.dispatch, e = require("../../../common/utils.js"), f = require("../../../common/wxUtils.js");
    Page({
        data: {
            activeList: [],
            toast: {
                hidden: !0,
                text: ""
            }
        },
        tplMsgFormSubmit: e.tplMsgFormSubmit,
        onLoad: function(b) {
            c.xu.mta.Page.init(), f.setChannelData(b), wx.showLoading && wx.showLoading({
                title: "加载中...",
                mask: !0
            }), f.getUserAuthorize(c, d, a, this.handleFetchMainData);
        },
        onShow: function() {
            this.mapStateToData(c.store.getState());
        },
        handleFetchMainData: function() {
            var a = c.xu.token;
            d(b.getActiveList({
                token: a,
                complete: function() {
                    wx.hideLoading && wx.hideLoading(), wx.stopPullDownRefresh();
                }
            }));
        },
        mapStateToData: function(a) {
            var b = a.active.activeList, c = a.active.bannerList;
            this.setData({
                activeList: b,
                bannerList: c
            });
        },
        onReady: function() {},
        onShareAppMessage: function() {},
        onPullDownRefresh: function() {
            this.handleFetchMainData();
        }
    });
})();