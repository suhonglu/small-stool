(function() {
    var a = require("../xng_modules/es6-promise.min.js").Promise, b = 0, c = 0;
    module.exports = {
        generateUUID: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var b = 0 | 16 * Math.random(), c = "x" === a ? b : 8 | 3 & b;
                return c.toString(16);
            });
        },
        checkIfUserInfoExist: function(b, c, d) {
            return new a(function(a) {
                b.xu.user ? a() : c(d.acWxJsUserinfo(b.xu.token)).then(function(c) {
                    var d = c.user;
                    b.xu.user = d, b.xu.mid = d.mid, a();
                }).catch(function() {
                    a();
                });
            });
        },
        getUserAuthorize: function(a, b, c, d) {
            var e = getCurrentPages(), f = e[e.length - 1], g = f.__route__.split("/"), h = g && 1 < g.length ? g[g.length - 1] : f.__route__, i = this, j = a.xu.shareTicket;
            if (console.log("两个数据:是否是tia的, shareticket", a.globalData.needCheckTIAsUser, j), 
            1 !== e.length) a.xu.shareTicket = null, i.checkIfUserInfoExist(a, b, c).then(d); else if (i.isHigherVersionSDK(a.sysInfo.SDKVersion, "1.1.0") || a.xu.showLowVersionAlert(), 
            j) {
                a.globalData.needCheckTIAsUser = !1, a.handleDecryptShareInfo(j, 1).then(function(e) {
                    console.log("点击卡片获取到的解析信息", e);
                    var f = e.shareOriginOpenGid, g = e.shareBuildGrpID, h = e.go;
                    a.xu.shareTicket = null, h ? wx.navigateTo({
                        url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + g,
                        success: function() {
                            i.checkIfUserInfoExist(a, b, c).then(d);
                        }
                    }) : i.checkIfUserInfoExist(a, b, c).then(d);
                }).catch(function() {
                    i.checkIfUserInfoExist(a, b, c).then(d);
                });
            } else a.globalData.needCheckTIAsUser ? (a.globalData.needCheckTIAsUser = !1, b(c.acUserDefaultGrp({
                token: a.xu.token,
                success: function(e) {
                    console.log(e), e.go ? i.checkIfUserInfoExist(a, b, c).then(function() {
                        wx.navigateTo({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + e.gid,
                            success: function() {
                                i.checkIfUserInfoExist(a, b, c).then(d);
                            }
                        });
                    }) : i.checkIfUserInfoExist(a, b, c).then(d);
                },
                fail: function() {
                    i.checkIfUserInfoExist(a, b, c).then(d);
                }
            }))) : (a.globalData.needCheckTIAsUser = !1, i.checkIfUserInfoExist(a, b, c).then(d));
        },
        hasUserInfoAuth: function() {
            wx.getSetting({
                success: function(a) {
                    return a.authSetting["scope.userInfo"];
                }
            });
        },
        objToQuery: function(a) {
            var b = "?";
            for (var c in a) if (a.hasOwnProperty(c)) {
                var d = a[c];
                b += c + "=" + d + "&";
            }
            return b = b.slice(0, b.length - 1), b;
        },
        isHigherVersionSDK: function(a, b) {
            return a && 1 * a.replace(/\./g, "") >= b.replace(/\./g, "");
        },
        setStorageSync: function(a, c) {
            b++;
            try {
                wx.setStorageSync(a, c);
            } catch (d) {
                3 > b ? this.setStorageSync(a, c) : b = 0;
            }
        },
        getStorageSync: function(a) {
            c++;
            try {
                return wx.getStorageSync(a);
            } catch (b) {
                3 > c ? this.getStorageSync(a) : c = 0;
            }
        },
        getImageInfo: function(b) {
            return new a(function(a, c) {
                wx.getImageInfo({
                    src: b,
                    success: a,
                    fail: c
                });
            });
        },
        createProImageObjArr: function(b) {
            var c = this, d = [], e = [];
            return console.log(b), new a(function(f) {
                return b && 0 !== b.length ? void (e = b.map(function(a) {
                    return c.getImageInfo(a);
                }), a.all(e).then(function(a) {
                    d = a.map(function(a, c) {
                        return {
                            w: a.width,
                            h: a.height,
                            url: b[c],
                            small_url: b[c]
                        };
                    }), f(d);
                }).catch(function() {
                    f(d || []);
                })) : f();
            });
        },
        setChannelData: function(a) {
            var b = getCurrentPages(), c = b[b.length - 1], d = a && a.channel || 0;
            c.setData({
                channel: d
            });
        },
        handleFetchUserInfo: function(b) {
            return new a(function(a, c) {
                var d = b.xu.userInfo;
                console.log(d), d ? a(d) : wx.getUserInfo({
                    success: function(c) {
                        b.xu.userInfo = c.userInfo, a(c.userInfo);
                    },
                    fail: c
                });
            });
        },
        handleCheckAuthority: function(b) {
            return new a(function(a, c) {
                wx.getSetting || c(), wx.getSetting({
                    success: function(c) {
                        var d = !!c.authSetting[b];
                        a(d);
                    },
                    fail: c
                });
            });
        },
        getUserInfoPro: function() {
            wx.navigateTo({
                url: "../../common/authorityRequstPage/authorityRequstPage",
                success: function() {}
            });
        },
        handleCheckSaveUsability: function() {
            return !!wx.saveImageToPhotosAlbum || (wx.showModal({
                title: "微信版本过低",
                content: "当前微信版本过低, 无法保存您生成的图片到本地, 请更新微信后重新打开",
                confirmText: "我知道了",
                showCancel: !1
            }), !1);
        },
        handleConfirmDownloadImgAuthExist: function() {
            return new a(function(a) {
                wx.getSetting({
                    success: function(b) {
                        var c = b.authSetting["scope.writePhotosAlbum"];
                        !1 === c ? wx.showModal({
                            title: "允许授权保存到相册",
                            content: '• 点击下方【去授权】打开"保存到相册"开关，返回即可',
                            confirmText: "去授权",
                            success: function(a) {
                                if (a.confirm || !a.cancel) {
                                    if (!wx.openSetting) return void wx.showModal({
                                        title: "微信版本过低",
                                        content: "当前微信版本过低, 请升级微信后重新打开",
                                        confirmText: "我知道了",
                                        showCancel: !1
                                    });
                                    wx.openSetting({
                                        success: function(a) {
                                            a.authSetting["scope.writePhotosAlbum"] ? console.log("用户亲自设置了授权") : console.log("用户不愿意设置授权");
                                        },
                                        fail: function() {
                                            console.log("调用打开 小程序设置 api失败");
                                        }
                                    });
                                } else a.cancel && console.log("用户点击取消");
                            }
                        }) : a();
                    }
                });
            });
        },
        handleDownLoadTargetLink: function(b) {
            return new a(function(a, c) {
                wx.downloadFile({
                    url: b,
                    success: function(b) {
                        if (200 === b.statusCode) {
                            var d = b.tempFilePath;
                            a(d);
                        } else c();
                    },
                    fail: c
                });
            });
        },
        handleSaveTempPathToLocal: function(b) {
            return new a(function(a, c) {
                wx.saveImageToPhotosAlbum({
                    filePath: b,
                    success: a,
                    fail: c
                });
            });
        },
        handleSaveTargetImgToLocal: function(a) {
            var b = this.handleCheckSaveUsability();
            return b ? this.handleConfirmDownloadImgAuthExist().then(this.handleDownLoadTargetLink.bind(this, a)).then(this.handleSaveTempPathToLocal).then(function() {
                wx.hideLoading && wx.hideLoading();
            }) : void 0;
        },
        handleObjToQuery: function(a) {
            var b = "", c = "";
            return Object.keys(a).forEach(function(d, e) {
                c = d + "=" + a[d], b += 0 === e ? "?" + c : "&" + c;
            }), b;
        },
        handleDealMaxPageStackBug: function(a) {
            var b = getCurrentPages(), c = b.length, d = b[b.length - 1], e = d.route, f = d.options, g = e + this.handleObjToQuery(f), h = 0, i = !1;
            return c >= a && b.slice(0, -2).find(function(a, b) {
                return a.route === e && (i = !0, h = c - b - 1, console.log("/" + g), setTimeout(function() {
                    wx.navigateBack({
                        delta: h
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/" + g
                        });
                    }, 500);
                }, 2e3), !0);
            }), i;
        },
        handleGetCurrentPageName: function() {
            var a = getCurrentPages(), b = a[a.length - 1], c = b.__route__.split("/"), d = c && 1 < c.length ? c[c.length - 1] : b.__route__;
            return d;
        }
    };
})();