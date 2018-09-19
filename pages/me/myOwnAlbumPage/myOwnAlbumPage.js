(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js");
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0,
                midText: "我的影集列表"
            },
            toast: {
                hidden: !0
            },
            albumList: [],
            reachBottomFetchFail: !1,
            hasNext: !0,
            nextStartTime: -1,
            targetGid: 1
        },
        mapStateToData: function(a) {
            var b = a.me.ownXngAlbumList.list, c = a.me.ownXngAlbumList.hasNext, d = a.me.ownXngAlbumList.nextStartTime;
            this.setData({
                albumList: b,
                hasNext: c,
                nextStartTime: d
            });
        },
        onLoad: function(d) {
            wx.setNavigationBarTitle({
                title: "我的影集列表"
            }), a.xu.mta.Page.init(), k.setChannelData(d), this.setData({
                targetGid: d.gid || 1
            }), k.getUserAuthorize(a, b, c, this.handleFetchMainData);
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            this.handleFetchMainData();
        },
        onReachBottom: function() {
            var c = this, e = this.data.nextStartTime, f = this.data.hasNext, g = a.xu.token;
            this.setData({
                reachBottomFetchFail: !1
            }), f && (wx.showNavigationBarLoading(), b(d.fetchMyXngAlbumList({
                token: g,
                start_t: e,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            })));
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onAlbumSelected: function(a) {
            var b = a.currentTarget.dataset.lid;
            this.setData({
                targetLid: b
            });
        },
        onPostBtnTap: function c() {
            var d = this, f = this.data.targetLid, g = this.data.targetGid, h = a.xu.token;
            wx.showLoading && wx.showLoading({
                title: "发表中...",
                mask: !0
            }), b(e.postAlbumMoment({
                lid: f,
                gid: g,
                token: h,
                success: function(a) {
                    var b = a && a.id, c = getCurrentPages(), d = c[c.length - 2];
                    wx.navigateBack(), d.refreshContent(function() {
                        d.setData({
                            newestPostMomID: b
                        });
                    });
                },
                fail: function() {
                    wx.showModal({
                        title: "发表失败",
                        content: "网络原因,发表影集失败,是否重试?",
                        confirmText: "重试",
                        success: function(a) {
                            a.confirm && c.call(d);
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            }));
        },
        onVideoTap: function(a) {
            var b = a.currentTarget.dataset.lid;
            this.previewAlbumFn(b);
        },
        handleFetchMainData: function() {
            var c = a.xu.token;
            wx.showNavigationBarLoading(), b(d.fetchMyXngAlbumList({
                token: c,
                start_t: -1,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
            }));
        },
        handlePreviewAlbum: function() {
            var a = this.data.targetLid;
            this.previewAlbumFn(a);
        },
        previewAlbumFn: function(a) {
            var c = this.data.targetGid;
            b(d.fetchOneXngAlbumInfo({
                lid: a,
                success: function(b) {
                    wx.navigateTo({
                        url: "../../common/XNGvideoPlayPage/XNGvideoPlayPage?src=" + encodeURIComponent(b.v_url) + "&targetGid=" + c + "&targetLid=" + a
                    });
                }
            }));
        }
    });
})();