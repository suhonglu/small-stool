(function() {
    var a = require("./common/xngLogger.js"), b = require("./control/ui.js"), c = require("./common/wxUtils.js"), d = require("./config/config.js"), e = require("./actions/index.js"), f = require("./store/configureStore.js"), g = f(), h = g.dispatch, i = require("mta_analysis.js"), j = require("./xng_modules/es6-promise.min.js").Promise;
    App({
        globalData: {},
        xu: {},
        sysInfo: {},
        store: g,
        loginFailTimes: 0,
        decryptFailTimes: 0,
        onLaunch: function() {
            var a = this;
            "" === c.getStorageSync("xng_mini_app_uid") && c.setStorageSync("xng_mini_app_uid", c.generateUUID()), 
            "" === c.getStorageSync("xng_mini_app_neverPostMoment") && c.setStorageSync("xng_mini_app_neverPostMoment", !0), 
            "" === c.getStorageSync("xng_mini_app_needShowBuildGroupGuide") && c.setStorageSync("xng_mini_app_needShowBuildGroupGuide", !0), 
            this.xu.showToast = b.showToast, this.xu.showLowVersionAlert = b.showLowVersionAlert, 
            this.xu.uid = c.getStorageSync("xng_mini_app_uid"), this.xu.userInfo = c.getStorageSync("wx_user_info"), 
            this.xu.mini_session = c.getStorageSync("mini_session"), this.xu.token = c.getStorageSync("xng_mini_app_token"), 
            this.globalData.needCheckTIAsUser = !0, this.handleMtaAndLog(), g.subscribe(this.onStoreChange), 
            wx.getSystemInfo({
                success: function(b) {
                    a.sysInfo = b;
                }
            });
        },
        onShow: function(a) {
            var b = a ? a.scene : 0;
            switch (this.xu.shareTicket = null, this.xu.shareOriginOpenGID = null, this.xu.shareBuildGrpID = null, 
            this.globalData.needCheckTIAsUser = !0, b) {
              case 1044:
                this.xu.shareTicket = a.shareTicket;
                break;

              default:
            }
        },
        onStoreChange: function() {
            var a = getCurrentPages(), b = a[a.length - 1];
            "undefined" != typeof b && b.mapStateToData && b.mapStateToData(g.getState());
        },
        fetchTokenFn: function(a) {
            var b = this, d = this.xu.token;
            d ? (this.fetchUserInfoFn(), a && a(d)) : wx.login({
                success: function(d) {
                    var f = d.code;
                    h(e.acWxFetchSession(f, function(d) {
                        b.xu.mini_session = d.mini_session, c.setStorageSync("mini_session", d.mini_session), 
                        b.handleWxAuth(a);
                    }));
                },
                fail: function() {
                    console.log("wxloginAPI调用失败");
                }
            });
        },
        fetchUserInfoFn: function() {
            var a = this, b = a.xu.userInfo;
            return new j(function(d, e) {
                b ? d(b) : wx.getUserInfo({
                    success: function(b) {
                        a.xu.userInfo = b.userInfo, c.setStorageSync("wx_user_info", b.userInfo), d(b.userInfo);
                    },
                    fail: e
                });
            });
        },
        handleMtaAndLog: function() {
            this.xu.mta = i, this.xu.logger = a, i.App.init({
                appID: "500495021",
                eventID: "500495913",
                statPullDownFresh: !0,
                statShareApp: !0,
                statReachBottom: !0
            });
        },
        handleWxAuth: function a(b) {
            var d = this;
            c.handleCheckAuthority("scope.userInfo").then(function(f) {
                f ? wx.getUserInfo({
                    success: function(a) {
                        d.xu.userInfo || (d.xu.userInfo = a.userInfo, c.setStorageSync("wx_user_info", a.userInfo)), 
                        h(e.acWxMpLogin(d.xu.mini_session, a.rawData, a.signature, a.encryptedData, a.iv, function(a) {
                            var e = a.user, f = d.xu.shareTicket;
                            d.xu.user = e, d.xu.token = e.token, d.xu.mid = e.mid, c.setStorageSync("xng_mini_app_token", e.token), 
                            d.xu.token = e.token, b && b(e.token), f && d.handleDecryptShareInfo(f);
                        }));
                    },
                    fail: function(c) {
                        d.handleGetAuthorityFail(c, a.bind(d, b));
                    }
                }) : c.getUserInfoPro();
            });
        },
        handleDecryptShareInfoFailFn: function(a, b) {
            var d = this;
            return console.log("session过期了,需要马上重新登录--"), new j(function(f, g) {
                wx.login({
                    success: function(i) {
                        console.log("wxloginSuccess------------------"), h(e.acWxFetchSession(i.code, function(e) {
                            c.setStorageSync("mini_session", e.mini_session), d.xu.mini_session = c.getStorageSync("mini_session"), 
                            d.handleDecryptShareInfo(a, b).then(f).catch(g);
                        }));
                    }
                });
            });
        },
        handleDecryptShareInfo: function(a, b) {
            var d = this, f = c.getStorageSync("mini_session"), g = c.getStorageSync("xng_mini_app_token");
            return new j(function(c, i) {
                wx.getShareInfo({
                    shareTicket: a,
                    success: function(j) {
                        console.log("wx.getShareInfo成功,转发相关信息: ", j), console.log("解析分享信息接口请求的参数", {
                            token: g,
                            mini_session: f,
                            encrypted_data: j.encryptedData,
                            iv: j.iv,
                            trigger: b
                        }), h(e.decryptShareInfo2openGid({
                            token: g,
                            mini_session: f,
                            encrypted_data: j.encryptedData,
                            iv: j.iv,
                            trigger: b,
                            success: function(a) {
                                var b = a.openGId, e = a.id;
                                console.log("成功解码,返回: ", a), console.log("点击源微信群id(openGID): ", b), d.xu.shareOriginOpenGID = b, 
                                d.xu.shareBuildGrpID = e, c({
                                    shareOriginOpenGID: b,
                                    shareBuildGrpID: e,
                                    go: a.go
                                });
                            },
                            fail: function(e, f) {
                                console.log("解码失败,错误信息: ", e, f), -1 === f ? (console.log("验证失败了, -1, 走失败处理的逻辑"), 
                                d.handleDecryptShareInfoFailFn(a, b).then(c).catch(i)) : i(e);
                            }
                        }));
                    },
                    fail: function(a) {
                        i(a);
                    }
                });
            });
        },
        handleBuildShareGroup: function(a) {
            var b = this, d = c.getStorageSync("mini_session"), f = c.getStorageSync("xng_mini_app_token");
            return console.log("使用了全新的mini-session"), new j(function(c, g) {
                wx.getShareInfo({
                    shareTicket: a,
                    success: function(i) {
                        console.log("转发相关信息: ", i), console.log("分享建群的参数", {
                            token: f,
                            mini_session: d,
                            encrypted_data: i.encryptedData,
                            iv: i.iv
                        }), h(e.buildGroupByShare({
                            token: f,
                            mini_session: d,
                            encrypted_data: i.encryptedData,
                            iv: i.iv,
                            success: function(a) {
                                console.log("建群成功"), c(a);
                            },
                            fail: function(d, e) {
                                console.log("估计又非法操作了,session过期了??", d, e, -1 === e), -1 === e ? (console.log("验证失败了, -1, 走失败处理的逻辑"), 
                                b.handleBuildShareGroupFailFn(a).then(c).catch(g)) : g(d);
                            }
                        }));
                    },
                    fail: function(a) {
                        g(a);
                    }
                });
            });
        },
        handleBuildShareGroupFailFn: function(a) {
            var b = this;
            return console.log(a, "重新登录"), new j(function(d, f) {
                wx.login({
                    success: function(g) {
                        console.log("loginSuccess-----"), h(e.acWxFetchSession(g.code, function(e) {
                            c.setStorageSync("mini_session", e.mini_session), b.xu.mini_session = e.mini_session, 
                            b.handleBuildShareGroup(a).then(d).catch(f);
                        }));
                    }
                });
            });
        },
        handleGetAuthorityFail: function a(b, c) {
            var d = this;
            wx.getSetting ? wx.getSetting({
                success: function(e) {
                    var f = e.authSetting["scope.userInfo"];
                    "undefined" == typeof f ? c && c() : (console.log("用户拒绝授权", b), wx.showModal({
                        title: "允许授权才能正常使用",
                        content: "• 点击下方【去授权】打开用户信息开关，返回即可 \r\n• 小程序只获取您的公开信息 (昵称,头像),不会获取隐私, 对您无影响, 请放心授权",
                        showCancel: !1,
                        confirmText: "去授权",
                        success: function(e) {
                            if (e.confirm || !e.cancel) {
                                if (console.log("用户点击确定"), !wx.openSetting) return void wx.showModal({
                                    title: "微信版本过低",
                                    content: "当前微信版本过低, 请升级微信后重新打开",
                                    confirmText: "我知道了",
                                    showCancel: !1
                                });
                                wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.userInfo"] ? (console.log("用户亲自设置了授权"), c && c()) : (console.log("用户不愿意设置授权"), 
                                        a.call(d, b, c));
                                    },
                                    fail: function() {
                                        console.log("调用打开 小程序设置 api失败");
                                    }
                                });
                            } else e.cancel && console.log("用户点击取消");
                        }
                    }));
                }
            }) : (console.log("用户拒绝授权", b), wx.showModal({
                title: "允许授权才能正常使用",
                content: "• 点击下方【去授权】打开用户信息开关，返回即可 \r\n• 小程序只获取您的公开信息 (昵称,头像),不会获取隐私, 对您无影响, 请放心授权",
                showCancel: !1,
                confirmText: "去授权",
                success: function(e) {
                    if (e.confirm || !e.cancel) {
                        if (console.log("用户点击确定"), !wx.openSetting) return void wx.showModal({
                            title: "微信版本过低",
                            content: "当前微信版本过低, 请升级微信后重新打开",
                            confirmText: "我知道了",
                            showCancel: !1
                        });
                        wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.userInfo"] ? (console.log("用户亲自设置了授权"), c && c()) : (console.log("用户不愿意设置授权"), 
                                a.call(d, b, c));
                            },
                            fail: function() {
                                console.log("调用打开 小程序设置 api失败");
                            }
                        });
                    } else e.cancel && console.log("用户点击取消");
                }
            }));
        }
    });
})();