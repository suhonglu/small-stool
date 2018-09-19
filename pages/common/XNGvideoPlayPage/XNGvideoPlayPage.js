(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js");
    Page({
        data: {},
        onLoad: function(b) {
            a.xu.mta.Page.init();
            var c = decodeURIComponent(b.src), d = b.targetGid || null, e = b.targetLid || null;
            this.setData({
                src: c,
                targetGid: d,
                targetLid: e
            });
        },
        onReady: function() {
            this.videoContext = wx.createVideoContext("iVideo");
        },
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onReachBottom: function() {},
        onFullscreenChange: function() {},
        handlePostAlbum: function() {
            var c = this.data.targetLid, d = this.data.targetGid;
            wx.showLoading && wx.showLoading({
                title: "发表中...",
                mask: !0
            }), b(e.postAlbumMoment({
                lid: c,
                gid: d,
                token: a.xu.token,
                success: function(a) {
                    wx.hideLoading && wx.hideLoading();
                    var b = a && a.id, c = getCurrentPages();
                    wx.navigateBack({
                        delta: 2
                    }), c[c.length - 3].refreshContent(function() {
                        c[c.length - 3].setData({
                            newestPostMomID: b
                        });
                    });
                },
                fail: function() {
                    wx.hideLoading && wx.hideLoading(), wx.showModal({
                        title: "发表失败",
                        content: "网络原因,发表影集失败,是否重试?",
                        confirmText: "重试",
                        success: function(a) {
                            a.confirm && fnSelf.call(context);
                        }
                    });
                }
            }));
        },
        handleQuitPreview: function() {
            wx.navigateBack();
        }
    });
})();