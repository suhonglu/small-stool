(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../xng_modules/object-assign/index.js"), e = require("../../../common/utils.js"), f = require("../../../xng_modules/array-find-index/index.js"), g = require("../../../config/config.js");
    Page({
        data: {
            dialog: {
                hidden: !1,
                title: "允许授权才能正常使用",
                bodyList: [ "• 小程序不会获取隐私，对您无影响，请放心授权", "• 只获取公开信息（昵称、头像）" ],
                buttons: [ {
                    name: "点击授权",
                    style: "color: #1AAD19",
                    getUserInfoFn: "onAuthorizeSucc",
                    openType: "getUserInfo"
                } ],
                handleHide: "handleHideDialog"
            },
            originPath: "",
            recommendGroupList: [],
            imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 8) / 3 - 8 : 60
        },
        onLoad: function(d) {
            a.xu.mta.Page.init();
            var e = this;
            this.setData({
                originPath: decodeURIComponent(d.originPath)
            }), b(c.fetchRecommendThumbnail({
                success: function(a) {
                    console.log(a), e.setData({
                        recommendGroupList: a.recommend
                    });
                }
            }));
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onAuthorizeSucc: function(d) {
            var e = this;
            if (console.log("res", d.detail.userInfo), !!d.detail.userInfo) {
                var f = d.detail;
                a.xu.userInfo = f.userInfo;
                var g = wx.getStorageSync("mini_session");
                b(c.acWxMpLogin(g, f.rawData, f.signature, f.encryptedData, f.iv, a.handleWxLoginSuccess, a.handleWxLoginFail)), 
                wx.reLaunch({
                    url: e.data.originPath
                });
            }
        }
    });
})();