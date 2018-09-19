(function() {
    var a, b = getApp(), c = b.store.dispatch, d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/postMoment.js"), g = require("../../../actions/feedFlow.js"), h = require("../../../actions/userGroup.js"), i = require("../../../actions/recommend.js"), j = require("../../../xng_modules/object-assign/index.js"), k = require("../../../common/utils.js"), l = require("../../../common/wxUtils.js"), m = require("../../../xng_modules/array-find-index/index.js"), n = require("../../../config/config.js");
    Page({
        data: {
            isShowShareAnim: !1,
            needShowWxLogoShare: !1,
            isTourist: !1
        },
        mapStateToData: function(a) {
            var b = a.ui.targetVideo || {};
            this.setData({
                videoInfo: b
            });
        },
        onLoad: function() {
            var a = this;
            b.xu.mta.Page.init(), l.handleCheckAuthority("scope.userInfo").then(function(c) {
                a.setData({
                    isTourist: !c && !b.xu.token
                });
            }), setTimeout(function() {
                a.setData({
                    longTimeLater: !0
                });
            }, 8e3);
        },
        onReady: function() {
            this.videoContext = wx.createVideoContext("iVideo"), this.onStandBy();
        },
        onShow: function() {
            this.mapStateToData(b.store.getState());
        },
        onStandBy: function() {
            var a = this, d = this.data.videoInfo, f = this.data.isTourist, h = b.xu.token, i = d.gid, k = d.momID, l = d.lid, m = d.aid, n = d.rUrl, o = d.feedType;
            10 !== o || f || (c(g.XngAlbumUvPlus({
                token: h,
                gid: i,
                momID: k,
                lid: l,
                aid: m
            })), c(e.fetchOneXngAlbumInfo({
                lid: l
            })).then(function(a) {
                c(g.playVideo({
                    info: j({}, d, {
                        src: a.v_url
                    })
                }));
            }).catch(function() {}));
        },
        onHide: function() {},
        onUnload: function() {},
        onReachBottom: function() {},
        handleQuitPreview: function() {
            wx.navigateBack();
        },
        onShareAppMessage: function() {
            var a = this.data.videoInfo, d = this.data.isTourist, e = a.shareInfo || {}, f = a.gid, h = a.momID, i = b.xu.token, j = 1e4 === f ? "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=1" + (h ? "&itemID=" + h : "") + (f ? "&groupID=" + f : "") : e.path;
            return h && !d && c(g.shareMoment({
                token: i,
                gid: f,
                momID: h
            })), {
                title: e.desc,
                path: j,
                imageUrl: e.img || "../../../src/image/grass&guitar.jpg",
                success: function() {}
            };
        },
        onVideoTimeUpDdate: function(b) {
            var c = this, d = null;
            !this.data.isShowShareAnim && .9 < b.detail.currentTime / b.detail.duration && (this.setData({
                isShowShareAnim: !0
            }), d = setTimeout(function() {
                c.setData({
                    needShowWxLogoShare: !c.data.needShowWxLogoShare
                }), a && clearInterval(a), a = setInterval(function() {
                    c.setData({
                        needShowWxLogoShare: !c.data.needShowWxLogoShare
                    });
                }, 4e3);
            }, 250));
        },
        onMaskDoubleTap: function(a) {
            var b = this.data.videoInfo, c = b.hasFavor, d = a.timeStamp, e = this.lastTapTime;
            this.lastTapTime = d, 300 > d - e && (this.setData({
                isDoubleTap: !1
            }), this.setData({
                isDoubleTap: !0
            }), !c && this.handleFavorVideo());
        },
        handleGetUserInfo: function(a) {
            var c = a.detail.userInfo;
            c && (wx.showToast({
                title: "登录成功"
            }), b.xu.userInfo = c, l.setStorageSync("wx_user_info", c), this.setData({
                isTourist: !1
            }));
        },
        handleFavorVideo: function() {
            var a = this, d = b.xu.token, e = this.data.videoInfo, f = e.gid, h = e.momID, i = e.hasFavor, j = e.originPage, k = e.fromMid, l = e.ac;
            i ? c(g.unFavorMoment({
                page: j,
                token: d,
                gid: f,
                momID: h,
                mid: k,
                ac: l
            })) : c(g.favorMoment({
                page: j,
                token: d,
                gid: f,
                momID: h,
                mid: k,
                ac: l
            }));
        },
        handleShareVideo: function() {
            wx.navigateTo({
                url: "../customShareCardPage/customShareCardPage"
            });
        }
    });
})();