(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js");
    Page({
        data: {},
        authGet: !1,
        onLoad: function() {
            this;
            a.xu.mta.Page.init();
        },
        onUnload: function() {
            var a = getCurrentPages(), b = a[a.length - 2], c = b.options;
            if (this.authGet) b.onAuthRequestPageReturn ? b.onAuthRequestPageReturn() : b.onLoad && b.onLoad(c); else {
                if ("pages/moments/recommendFeedFlowPage/recommendFeedFlowPage" === b.route) return !1;
                b.onLoad && b.onLoad(c);
            }
        },
        handleGetUserInfo: function(b) {
            var c = b.detail.userInfo;
            c && (this.authGet = !0, a.xu.userInfo = c, k.setStorageSync("wx_user_info", c), 
            wx.navigateBack());
        }
    });
})();