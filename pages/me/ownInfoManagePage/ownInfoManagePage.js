(function() {
    var a = Math.floor, b = getApp(), c = require("../../../config/config.js"), d = require("../../../common/utils.js"), e = require("../../../xng_modules/object-assign/index.js"), f = b.store.dispatch, g = require("../../../actions/index.js"), h = require("../../../actions/me.js");
    Page({
        data: {
            navBar: {
                midText: "修改资料",
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap"
            },
            toast: {
                hidden: !0,
                text: ""
            },
            userInfo: {},
            storageInfo: {},
            haveUpdateFn: !1,
            version: "-"
        },
        tplMsgFormSubmit: d.tplMsgFormSubmit,
        onLoad: function() {
            var d = b.xu.token, e = this;
            this.setData({
                haveUpdateFn: !!wx.getUpdateManager,
                version: c.versionCode
            }), wx.setNavigationBarTitle({
                title: "修改资料"
            }), b.xu.mta.Page.init(), wx.getStorageInfo({
                success: function(b) {
                    console.log(b), e.setData({
                        storageInfo: {
                            currentSize: .01 * a(100 * (b.currentSize / 1024)),
                            keys: b.keys
                        }
                    });
                }
            }), f(h.getXbdUserInfo({
                token: d
            }));
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(b.store.getState());
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = a.wx.user, d = c && c.rpst;
            this.setData({
                userInfo: c,
                pushState: d
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onAcceptWxMsgSwitchChange: function(a) {
            var c = a.detail.value, d = b.xu.token;
            console.log("switch1 发生 change 事件，携带值为", a.detail.value), f(h.changePushState({
                token: d,
                state: c ? "on" : "off"
            }));
        },
        handleRequestErr: function(a) {
            b.xu.showToast(a);
        },
        handleNavToModifyOwnNamePage: function() {
            wx.navigateTo({
                url: "../ModifyOwnInfoPage/ModifyOwnInfoPage?nick=" + this.data.userInfo.nick + "&&attr=nick"
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.src, c = [];
            c.push(b), wx.previewImage({
                urls: c
            });
        },
        handleClearStorage: function() {
            var b = this, c = this.data.storageInfo.keys, d = [ "xng_mini_app_needShowBuildGroupGuide", "xng_mini_app_neverPostMoment" ];
            c.forEach(function(a) {
                -1 === d.indexOf(a) && wx.removeStorageSync(a);
            }, this), wx.showToast({
                title: "清除成功"
            }), wx.getStorageInfo({
                success: function(c) {
                    console.log(c.keys), b.setData({
                        storageInfo: {
                            currentSize: .01 * a(100 * (c.currentSize / 1024)),
                            keys: c.keys
                        }
                    });
                }
            });
        },
        handleCheckUpdate: function() {
            var a = wx.getUpdateManager && wx.getUpdateManager();
            a && (a.onCheckForUpdate(function(a) {
                console.log(a.hasUpdate), a.hasUpdate || b.xu.showToast("已是最新版本");
            }), a.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(b) {
                        b.confirm && a.applyUpdate();
                    }
                });
            }), a.onUpdateFailed(function() {
                b.xu.showToast("新的版本下载失败, 请手动重启微信或稍后重试");
            }));
        }
    });
})();