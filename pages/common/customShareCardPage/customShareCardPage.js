(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js");
    Page({
        data: {},
        mapStateToData: function(a) {
            var b = a.ui.targetVideo || {};
            this.setData({
                videoInfo: b
            });
        },
        onLoad: function() {
            a.xu.mta.Page.init();
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function() {
            var c = this.data.videoInfo, d = this.data.inpDesc, e = c.shareInfo || {}, g = c.gid, h = c.momID, i = a.xu.token, j = 1e4 === g ? "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=1" + (h ? "&itemID=" + h : "") + (g ? "&groupID=" + g : "") : e.path;
            return h && b(f.shareMoment({
                token: i,
                gid: g,
                momID: h
            })), {
                title: d || e.desc,
                path: j,
                imageUrl: e.img || "../../../src/image/grass&guitar.jpg",
                success: function() {
                    wx.navigateBack();
                }
            };
        },
        handleInput: function(a) {
            var b = a.detail.value.trim();
            this.setData({
                inpDesc: b
            });
        }
    });
})();