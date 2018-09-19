(function() {
    var a, b, c, d, f, g = Math.PI, h = Math.sqrt, e = getApp(), i = e.store.dispatch, j = require("../../../actions/feedFlow.js"), k = require("../../../actions/index.js"), l = require("../../../actions/me.js"), m = require("../../../actions/postMoment.js"), n = require("../../../xng_modules/es6-promise.min.js"), o = require("../../../xng_modules/object-assign/index.js"), p = require("../../../common/utils.js"), q = require("../../../common/wxUtils.js"), r = require("../../../xng_modules/array-find-index/index.js"), s = require("../../../config/config.js"), t = require("../../../const/common.js"), u = !0, v = wx.createCanvasContext("avatarEditor"), w = wx.createCanvasContext("avatarHat"), x = {
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0
    }, y = {
        url: "../../../src/image/caiShen_hat.jpg",
        foldLength: 30
    }, z = {}, A = 0, B = 0, C = 1, D = x.rotate, E = x.rotate, F = {};
    Page({
        tplMsgFormSubmit: p.tplMsgFormSubmit,
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "handleNavBack"
            },
            willSaveAvatar: !1,
            width: 180,
            height: 180,
            scale: 1,
            shouldResetWxAvatarBtnShow: !1,
            avatar: x,
            hat: y,
            circle: z
        },
        syncPositionData: function() {
            this.setData({
                avatar: x,
                hat: y,
                circle: z
            });
        },
        onLoad: function() {
            wx.redirectTo({
                url: "/pages/tool/avatarEditorFramePage/avatarEditorFramePage?currentFrameId=10001&channel=5"
            });
        },
        onShareAppMessage: function() {
            var a = this.data.shareDesc;
            return {
                title: a || "我的财神头像太棒了! 也送你一个"
            };
        },
        handleFetchHatData: function() {
            var a = this, b = e.xu.token, c = this.data.hatID;
            return new n(function(d) {
                c ? i(l.getHatInfo({
                    token: b,
                    hatID: c,
                    success: function(b) {
                        console.log(b), y.url = b.hat_url, a.setData({
                            shareDesc: b.share_desc
                        });
                    },
                    complete: function() {
                        d();
                    }
                })) : d();
            });
        },
        handleFetchMainData: function() {
            var a = this, b = e.xu.token;
            this.handleFetchHatData().then(this.handleDealWithHatData).then(this.handleInitAvatarCanvas), 
            1 === getCurrentPages().length && this.setData({
                isFirstPage: !0,
                navBar: o({}, a.data.navBar, {
                    faBackBtn: "newspaper-o",
                    littleTag: t.BACK_BTN_TEXT
                })
            });
        },
        handleDealWithHatData: function() {
            wx.showLoading && wx.showLoading({
                title: "加载中...",
                mask: !0
            });
            var a = this;
            return new n(function(b, c) {
                wx.getImageInfo({
                    src: y.url,
                    success: function(c) {
                        console.log("解析帽子图片信息成功", c);
                        var d = c.height / c.width;
                        y.w = a.data.width, y.h = Math.floor(d * y.w), a.setData({
                            hat: y
                        }), w.drawImage(y.url, 0, 0, y.w, y.h), w.draw(), x.w = a.data.height - (y.h - y.foldLength), 
                        x.y = y.h - y.foldLength + x.w / 2, x.x = a.data.width / 2, x.scale = 1, z.x = x.x, 
                        z.y = x.y, z.r = x.w / 2, F.w = x.w, F.y = x.y, F.x = x.x, b();
                    },
                    fail: function() {
                        wx.hideLoading && wx.hideLoading(), e.xu.showToast("解析帽子图片失败, 点击左上角黄色按钮返回,然后重新打开该页面", 5e3), 
                        c();
                    }
                });
            });
        },
        handleDownloadUserAvatar: function(a) {
            return new n(function(b, d) {
                wx.downloadFile({
                    url: a,
                    success: function(a) {
                        200 === a.statusCode && (x.url = a.tempFilePath, x.h = x.w, c = x.url, F.h = x.h, 
                        b());
                    },
                    fail: d
                });
            });
        },
        handleFetchUserAvatar: function() {
            return new n(function(a, b) {
                wx.getUserInfo({
                    success: function(b) {
                        e.xu.userInfo = b.userInfo, a(b.userInfo.avatarUrl);
                    },
                    fail: b
                });
            });
        },
        handleInitAvatarCanvas: function() {
            e.xu.userInfo ? this.handleDownloadUserAvatar(e.xu.userInfo.avatarUrl).then(this.drawIt).then(function() {
                wx.hideLoading && wx.hideLoading();
            }).catch(function() {
                wx.hideLoading && wx.hideLoading(), e.xu.showToast("网络错误, 点击左上角黄色按钮返回,然后重新打开该页面", 5e3);
            }) : this.handleFetchUserAvatar().then(this.handleDownloadUserAvatar).then(this.drawIt).then(function() {
                wx.hideLoading && wx.hideLoading();
            }).catch(function() {
                wx.hideLoading && wx.hideLoading(), e.xu.showToast("网络错误, 点击左上角黄色按钮返回,然后重新打开该页面", 5e3);
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            1 === a.length ? wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage"
            }) : wx.navigateBack();
        },
        handleResetTransform: function() {
            x.scale = 1, x.rotate = 0, x.h = F.h, x.w = F.w, x.y = F.y, x.x = F.x, this.setData({
                scale: x.scale,
                navBar: o({}, this.data.navBar, {
                    rightText: null,
                    onRightTap: null
                })
            }), C = x.scale, this.drawIt();
        },
        handleResetAvatarSrc: function() {
            x.scale = 1, x.rotate = 0, x.y = F.y, x.x = F.x, x.h = F.w, F.h = x.h, x.url = c, 
            this.setData({
                shouldResetWxAvatarBtnShow: !1
            }), this.drawIt();
        },
        start: function(c) {
            console.log("按下几根手指", c.touches.length), 1 === c.touches.length ? (u = !0, d = c.touches[0].clientX, 
            f = c.touches[0].clientY) : 2 === c.touches.length && (u = !1, a = c.touches[1].clientX - c.touches[0].clientX, 
            b = c.touches[1].clientY - c.touches[0].clientY, B = h(a * a + b * b), E = 180 * Math.atan(b / a) / g, 
            C = x.scale, this.setData({
                scale: x.scale
            }), 0 > a && (0 > b ? E -= 180 : E += 180));
        },
        end: function(a) {
            console.log("抬起几根手指", a.touches.length);
        },
        moveHat: function(c) {
            if (console.log("移动几根手指", c.touches.length), 1 === c.touches.length) u && (x.x += c.touches[0].clientX - d, 
            x.y += c.touches[0].clientY - f, d = c.touches[0].clientX, f = c.touches[0].clientY); else if (2 === c.touches.length) u = !1, 
            a = c.touches[1].clientX - c.touches[0].clientX, b = c.touches[1].clientY - c.touches[0].clientY, 
            A = h(a * a + b * b), x.scale = C * (A / B), this.setData({
                scale: x.scale
            }); else return;
            this.setData({
                navBar: o({}, this.data.navBar, {
                    rightText: "还原",
                    onRightTap: "handleResetTransform"
                })
            }), this.drawIt();
        },
        rotateHat: function(a) {
            x.rotate = a.detail.value, this.drawIt();
        },
        scaleHat: function(a) {
            x.scale = a.detail.value;
            var b = 0 !== x.rotate || 1 !== x.scale || x.x !== F.x || x.y !== F.y || x.h !== F.h || x.w !== F.w;
            this.setData({
                scale: x.scale,
                shouldResetBtnShow: b,
                navBar: o({}, this.data.navBar, b ? {
                    rightText: "还原",
                    onRightTap: "handleResetTransform"
                } : {
                    rightText: null,
                    onRightTap: null
                })
            }), C = x.scale, this.drawIt();
        },
        changeHat: function(a) {
            x.url = a.currentTarget.dataset.url, this.drawIt();
        },
        drawHat: function() {
            v.drawImage(y.url, 0, 0, y.w, y.h);
        },
        drawBackground: function() {
            v.rect(0, 0, this.data.canvasW, this.data.canvasH), v.setFillStyle("white"), v.fill();
        },
        drawCircleClip: function() {
            v.beginPath(), v.arc(z.x, z.y, z.r, 0, 2 * g), v.clip && v.clip();
        },
        drawRectArea: function() {
            v.translate(.25 * this.data.width / 2, .25 * this.data.height / 2);
        },
        drawAvatar: function() {
            v.translate(x.x, x.y), v.scale(x.scale, x.scale), v.drawImage(x.url, -x.w / 2, -x.h / 2, x.w, x.h);
        },
        drawIt: function() {
            this.drawBackground(), this.drawRectArea(), v.save(), this.drawCircleClip(), this.drawAvatar(), 
            v.restore(), v.draw();
        },
        finalDrawIt: function(a) {
            this.drawBackground(), this.drawRectArea(), v.save(), this.drawCircleClip(), this.drawAvatar(), 
            v.restore(), this.drawHat(), v.draw(!1, a);
        },
        onUploadImgBtnTap: function() {
            var a = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album" ],
                success: function(b) {
                    x.url = b.tempFilePaths[0], wx.getImageInfo({
                        src: x.url,
                        success: function(b) {
                            x.scale = 1, x.rotate = 0, x.y = F.y, x.x = F.x, x.h = b.height / b.width * x.w, 
                            F.h = x.h, a.setData({
                                shouldResetWxAvatarBtnShow: !0
                            }), a.drawIt();
                        },
                        fail: function() {
                            a.drawIt();
                        }
                    });
                }
            });
        },
        handleCreateShareImg: function() {
            var a = this;
            return new n(function(b) {
                wx.canvasToTempFilePath({
                    y: a.data.width / 8,
                    width: a.data.canvasW,
                    height: a.data.height,
                    canvasId: "avatarEditor",
                    complete: b
                });
            });
        },
        handleDelayFn: function(a) {
            return new n(function(b) {
                setTimeout(b, a);
            });
        },
        handleSaveOriginAvatar: function(a) {
            var b = this, c = a.tempFilePath;
            wx.canvasToTempFilePath({
                canvasId: "avatarEditor",
                success: function(a) {
                    wx.saveImageToPhotosAlbum({
                        filePath: a.tempFilePath,
                        success: function() {
                            wx.showToast({
                                title: "保存成功"
                            }), wx.navigateTo({
                                url: "../avatarResultSharePage/avatarResultSharePage?url=" + a.tempFilePath + (c ? "&shareUrl=" + c : "")
                            });
                        },
                        fail: function() {
                            wx.hideLoading && wx.hideLoading();
                        },
                        complete: function() {
                            b.setData({
                                willSaveAvatar: !1
                            });
                        }
                    });
                }
            });
        },
        handleGetDownloadAuthorityFail: function(a, b) {
            this;
            wx.getSetting ? wx.getSetting({
                success: function(c) {
                    var d = c.authSetting["scope.writePhotosAlbum"];
                    "undefined" == typeof d ? b && b() : (console.log("用户拒绝授权", a), wx.showModal({
                        title: "允许授权保存到相册",
                        content: '• 点击下方【去授权】打开"保存到相册"开关，返回即可',
                        confirmText: "去授权",
                        success: function(a) {
                            if (a.confirm || !a.cancel) {
                                if (console.log("用户点击确定"), !wx.openSetting) return void wx.showModal({
                                    title: "微信版本过低",
                                    content: "当前微信版本过低, 请升级微信后重新打开",
                                    confirmText: "我知道了",
                                    showCancel: !1
                                });
                                wx.openSetting({
                                    success: function(a) {
                                        a.authSetting["scope.writePhotosAlbum"] ? (console.log("用户亲自设置了授权"), b && b()) : console.log("用户不愿意设置授权");
                                    },
                                    fail: function() {
                                        console.log("调用打开 小程序设置 api失败");
                                    }
                                });
                            } else a.cancel && console.log("用户点击取消");
                        }
                    }));
                }
            }) : (console.log("用户拒绝授权", a), wx.showModal({
                title: "允许授权保存到相册",
                content: '• 点击下方【去授权】打开"保存到相册"开关，返回即可',
                confirmText: "去授权",
                success: function(a) {
                    if (a.confirm || !a.cancel) {
                        if (console.log("用户点击确定"), !wx.openSetting) return void wx.showModal({
                            title: "微信版本过低",
                            content: "当前微信版本过低, 请升级微信后重新打开",
                            confirmText: "我知道了",
                            showCancel: !1
                        });
                        wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.writePhotosAlbum"] ? (console.log("用户亲自设置了授权"), b && b()) : console.log("用户不愿意设置授权");
                            },
                            fail: function() {
                                console.log("调用打开 小程序设置 api失败");
                            }
                        });
                    } else a.cancel && console.log("用户点击取消");
                }
            }));
        },
        handleCheckJudgeDownloadImgAuth: function(a) {
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
                    }) : a && a();
                }
            });
        },
        saveToPhoto: function() {
            if (!wx.saveImageToPhotosAlbum) return wx.hideLoading && wx.hideLoading(), void wx.showModal({
                title: "微信版本过低",
                content: "当前微信版本过低, 无法保存您生成的头像到本地, 请更新微信后重新打开",
                confirmText: "我知道了",
                showCancel: !1
            });
            var a = this;
            this.handleCheckJudgeDownloadImgAuth(function() {
                wx.showLoading && wx.showLoading({
                    title: "保存中...",
                    mask: !0
                }), a.setData({
                    willSaveAvatar: !0
                }), q.isHigherVersionSDK(e.sysInfo.SDKVersion, "1.7.0") ? a.finalDrawIt(a.handleDelayFn(1e3).then(a.handleCreateShareImg).then(a.handleSaveOriginAvatar)) : (a.finalDrawIt(), 
                a.handleDelayFn(3e3).then(a.handleCreateShareImg).then(a.handleSaveOriginAvatar));
            });
        }
    });
})();