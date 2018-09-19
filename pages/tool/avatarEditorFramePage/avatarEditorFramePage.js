(function() {
    var a, b, c, d, f, g = Math.sqrt, e = Math.floor, h = getApp(), i = h.store.dispatch, j = require("../../../actions/index.js"), k = require("../../../actions/me.js"), l = require("../../../xng_modules/es6-promise.min.js"), m = require("../../../xng_modules/object-assign/index.js"), n = require("../../../common/utils.js"), o = require("../../../common/wxUtils.js"), p = require("../../../config/config.js"), q = require("../../../const/common.js"), r = !0, s = wx.createCanvasContext("avatarEditor"), t = {}, u = {
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0
    }, v = {
        url: ""
    }, w = 0, x = 0, y = 1, z = u.rotate, A = u.rotate;
    Page({
        tplMsgFormSubmit: n.tplMsgFormSubmit,
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "handleNavBack"
            },
            currentFrameIndex: 0,
            width: 180,
            height: 180,
            frameGroup: [],
            mode: "edit",
            previewSrc: ""
        },
        onLoad: function(a) {
            this.setData({
                currentFrameId: a.currentFrameId,
                initQid: a.qid,
                canvasW: 1.25 * this.data.width,
                canvasH: 1.25 * this.data.height
            }), this.handleInitConfigData(), h.xu.mta.Page.init(), o.setChannelData(a), wx.setNavigationBarTitle({
                title: "小板凳"
            }), wx.showLoading && wx.showLoading({
                title: "加载中...",
                mask: !0
            }), o.getUserAuthorize(h, i, j, this.handleFetchMainData), a.qid && this.setData({
                firstEnterPreviewMode: !0,
                finalQid: a.qid
            });
        },
        handleInitConfigData: function() {
            u.w = u.h = this.data.height, u.y = this.data.canvasH / 2, u.x = this.data.canvasW / 2, 
            u.scale = 1, t.w = u.w, t.y = u.y, t.x = u.x, t.h = u.h, v.w = this.data.canvasW;
        },
        handleFetchMainData: function() {
            this.handleDealUnreadCount(), this.handleFetchHatsList().then(this.handleInitCanvas).then(this.handleDealWithInitQidDisplay).catch(function() {
                wx.hideLoading && wx.hideLoading(), h.xu.showToast("获取素材资源组失败, 点击左上角黄色按钮返回,然后重新打开该页面", 5e3);
            });
        },
        handleFindIndexById: function(a, b) {
            var c;
            return b.find(function(b, d) {
                if (b.id == a) return c = d, !0;
            }), c;
        },
        handleInitCanvas: function() {
            var a = this, b = this.data.frameGroup, c = this.data.currentFrameId, d = this.handleFindIndexById(c, b) || 0;
            return this.setData({
                currentFrameId: b[d].id,
                currentFrameIndex: d
            }), l.all([ a.handleDealHatLink(b[d].url), a.handleDealUserAvatarLink() ]).then(function() {
                a.data.initQid || a.onAvatarFrameSwitch(d);
            }).then(function() {
                wx.hideLoading && wx.hideLoading();
            }).catch(function() {
                h.xu.showToast("网络错误, 点击左上角黄色按钮返回,然后重新打开该页面", 5e3), wx.hideLoading && wx.hideLoading();
            });
        },
        handleGetCurrentFrameInfo: function(a) {
            var b = this.data.frameGroup, c = this.data.currentFrameIndex;
            return a ? b[c][a] : b[c];
        },
        onShareAppMessage: function() {
            var a = this.data.finalQid, b = this.data.currentFrameId, c = this.handleGetCurrentFrameInfo("share_desc"), d = this.data.shareUrl, e = "/pages/tool/avatarEditorFramePage/avatarEditorFramePage" + (b ? "?currentFrameId=" + b : "") + (a ? "&qid=" + a : "");
            return console.log("分享链接为", e), {
                imageUrl: d,
                title: c || "我的装饰太棒了! 也送你一个",
                path: e
            };
        },
        onUnload: function() {
            u = {
                url: "",
                scale: 1,
                rotate: 0,
                x: 0,
                y: 0
            }, v = {
                url: ""
            };
        },
        handleDownLoadTargetLink: function(a) {
            return new l(function(b, c) {
                wx.downloadFile({
                    url: a,
                    success: function(a) {
                        if (200 === a.statusCode) {
                            var d = a.tempFilePath;
                            b(d);
                        } else c();
                    },
                    fail: c
                });
            });
        },
        handleFetchHatsList: function() {
            var a = this, b = h.xu.token;
            return new l(function(c, d) {
                i(k.getAvatarFrameGroup({
                    token: b,
                    success: function(b) {
                        a.setData({
                            frameGroup: b.list
                        }), c(b.list);
                    },
                    fail: d
                }));
            });
        },
        handleHideRecoverBtn: function() {
            this.setData({
                navBar: m({}, this.data.navBar, {
                    rightText: null,
                    onRightTap: null
                })
            });
        },
        handleShowRecoverBtn: function() {
            this.setData({
                navBar: m({}, this.data.navBar, {
                    rightText: "还原",
                    onRightTap: "handleResetTransform"
                })
            });
        },
        handleDealUnreadCount: function() {
            var a = this, b = h.xu.token;
            1 === getCurrentPages().length && this.setData({
                isFirstPage: !0,
                navBar: m({}, a.data.navBar, {
                    faBackBtn: "newspaper-o",
                    littleTag: q.BACK_BTN_TEXT
                })
            });
        },
        handleDealWithInitQidDisplay: function() {
            var a = this, b = this.data.initQid, c = h.xu.token;
            b && (wx.showLoading && wx.showLoading({
                title: "加载中...",
                mask: !0
            }), i(j.getUrlsByQids({
                token: c,
                qids: [ b ],
                success: function(b) {
                    console.log(b), a.setData({
                        mode: "preview",
                        previewSrc: b.list[0].url
                    });
                },
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            })));
        },
        handleDealWithHatHeight: function(a) {
            this;
            return new l(function(b, c) {
                wx.getImageInfo({
                    src: a,
                    success: function(a) {
                        var c = a.height / a.width;
                        v.h = e(c * v.w), b();
                    },
                    fail: c
                });
            });
        },
        handleDealUserAvatarLink: function() {
            var a = this;
            return new l(function(b, d) {
                a.handleFetchUserAvatar().then(a.handleDownLoadTargetLink).then(function(a) {
                    u.url = a, c = u.url, b();
                }).catch(d);
            });
        },
        handleDealHatLink: function(a) {
            var b = this, c = this.data.frameGroup, d = this.data.currentFrameIndex;
            return new l(function(e, f) {
                b.handleDownLoadTargetLink(a).then(function(a) {
                    b.handleDealWithHatHeight(a).then(function() {
                        c[d].tempPath = a, b.setData({
                            frameGroup: c
                        }), v.url = a, e();
                    }).catch(f);
                }).catch(f);
            });
        },
        handleFetchUserAvatar: function() {
            return new l(function(a, b) {
                var c = h.xu.userInfo;
                c ? a(c.avatarUrl) : wx.getUserInfo({
                    success: function(b) {
                        h.xu.userInfo = b.userInfo, a(b.userInfo.avatarUrl);
                    },
                    fail: b
                });
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            1 === a.length ? wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage"
            }) : wx.navigateBack();
        },
        handleResetTransform: function() {
            u.scale = 1, u.rotate = 0, u.h = t.h, u.w = t.w, u.y = t.y, u.x = t.x, y = u.scale, 
            this.drawIt(), this.handleHideRecoverBtn();
        },
        handleResetAvatarSrc: function() {
            u.scale = 1, u.rotate = 0, u.y = t.y, u.x = t.x, u.h = t.w, t.h = u.h, u.url = c, 
            this.setData({
                shouldResetWxAvatarBtnShow: !1
            }), this.drawIt();
        },
        start: function(c) {
            1 === c.touches.length ? (r = !0, d = c.touches[0].clientX, f = c.touches[0].clientY) : 2 === c.touches.length && (r = !1, 
            a = c.touches[1].clientX - c.touches[0].clientX, b = c.touches[1].clientY - c.touches[0].clientY, 
            x = g(a * a + b * b), A = 180 * Math.atan(b / a) / Math.PI, y = u.scale, 0 > a && (0 > b ? A -= 180 : A += 180));
        },
        moveHat: function(c) {
            if (1 === c.touches.length) r && (u.x += c.touches[0].clientX - d, u.y += c.touches[0].clientY - f, 
            d = c.touches[0].clientX, f = c.touches[0].clientY); else if (2 === c.touches.length) r = !1, 
            a = c.touches[1].clientX - c.touches[0].clientX, b = c.touches[1].clientY - c.touches[0].clientY, 
            w = g(a * a + b * b), u.scale = y * (w / x); else return;
            this.handleShowRecoverBtn(), this.drawIt();
        },
        onFrameThumbnailClick: function(a) {
            var b = +a.currentTarget.dataset.index;
            this.onAvatarFrameSwitch(b);
        },
        onFrameBarPageArrowNextClick: function() {
            var a = this.data.currentFrameIndex, b = this.data.frameGroup, c = b.length;
            a++, a < c && this.onAvatarFrameSwitch(a);
        },
        onFrameBarPageArrowPrevClick: function() {
            var a = this.data.currentFrameIndex, b = this.data.frameGroup;
            a--, a >= 0 && this.onAvatarFrameSwitch(a);
        },
        handleCreateShareImg: function() {
            var a = this;
            return new l(function(b, c) {
                wx.canvasToTempFilePath({
                    canvasId: "avatarEditor",
                    y: a.data.width / 8,
                    width: a.data.canvasW,
                    height: a.data.height,
                    success: function(a) {
                        b(a.tempFilePath);
                    },
                    fail: c
                });
            });
        },
        handleCanvasToTempFilePath: function(a) {
            return new l(function(b, c) {
                wx.canvasToTempFilePath({
                    canvasId: a,
                    success: function(a) {
                        b(a.tempFilePath);
                    },
                    fail: c
                });
            });
        },
        handleWxUploadImg2Qid: function(a) {
            var b = this;
            return new l(function(c, d) {
                wx.uploadFile({
                    url: p.uploadUrl,
                    filePath: a.filePath,
                    name: "file",
                    formData: a.formData,
                    success: function(a) {
                        var d = JSON.parse(a.data).ret;
                        if (1 === d) {
                            var e = JSON.parse(a.data).data.list[0].qid;
                            b.setData({
                                finalQid: e
                            }), c(e);
                        }
                    },
                    fail: d,
                    complete: a.complete
                });
            });
        },
        handleConfirmProject: function() {
            wx.showLoading && wx.showLoading({
                title: "处理中...",
                mask: !0
            });
            var a = h.xu.token, b = this, c = this.handleGetCurrentFrameInfo("gid"), d = this.data.currentFrameIndex, e = this.data.frameGroup[d], f = e && e.id;
            l.all([ this.handleCreateShareImg(), this.handleCanvasToTempFilePath("avatarEditor") ]).then(function(c) {
                var d = c[0], e = c[1];
                b.setData({
                    shareUrl: d,
                    previewSrc: e
                }), b.handleWxUploadImg2Qid({
                    filePath: e,
                    formData: {
                        token: a,
                        gid: 1
                    },
                    complete: function() {
                        wx.hideLoading && wx.hideLoading(), b.setData({
                            mode: "preview"
                        }), b.handleHideRecoverBtn();
                    }
                }).then(function(a) {
                    b.setData({
                        finalQid: a
                    });
                });
            }).catch(function() {
                h.xu.showToast("制作失败, 请重试"), wx.hideLoading && wx.hideLoading();
            });
        },
        onRemakeBtnTap: function() {
            this.onAvatarFrameSwitch(this.data.currentFrameIndex), this.setData({
                shareUrl: "",
                finalQid: null,
                mode: "edit",
                firstEnterPreviewMode: !1
            });
        },
        handleChangeAvatarFrame: function(a) {
            var b = this, d = this.data.frameGroup, f = this.data.currentFrameIndex, g = d[a] || {}, h = d[f] || {}, i = g.tempPath, j = g.cacheDefaultAvatarPath, k = g.defaultAvatar, l = h.defaultAvatar;
            l && !this.data.hasCustomOtherAvatar && (u.url = c, u.scale = 1, u.rotate = 0, u.y = t.y, 
            u.x = t.x, this.handleHideRecoverBtn()), k && !this.data.hasCustomOtherAvatar && (u.url = j, 
            u.scale = 1, u.rotate = 0, u.y = t.y, u.x = t.x, this.handleHideRecoverBtn()), this.setData({
                mode: "edit",
                currentFrameIndex: a,
                currentFrameId: g.id
            }), v.url = i, wx.getImageInfo({
                src: v.url,
                success: function(a) {
                    var c = a.height / a.width;
                    v.w = b.data.canvasW, v.h = e(c * v.w), b.drawIt();
                }
            });
        },
        handleWriteCache: function(a, b, c) {
            var d = this.data.frameGroup;
            d[a][b] = c, this.setData({
                frameGroup: d
            });
        },
        handleConfirmDefaultAvatarCache: function(a) {
            var b = this, c = this.data.frameGroup, d = c[a] || {}, e = d.cacheDefaultAvatarPath;
            return new l(function(c, f) {
                d.defaultAvatar ? e ? c() : b.handleDownLoadTargetLink(d.defaultAvatar).then(function(d) {
                    b.handleWriteCache(a, "cacheDefaultAvatarPath", d), c();
                }).catch(f) : c();
            });
        },
        handleConfirmFrameCache: function(a) {
            var b = this, c = this.data.frameGroup[a], d = c && c.tempPath;
            return new l(function(e, f) {
                d ? e() : b.handleDownLoadTargetLink(c.url).then(function(c) {
                    b.handleWriteCache(a, "tempPath", c), e();
                }).catch(f);
            });
        },
        onAvatarFrameSwitch: function(a) {
            var b = this;
            return wx.showLoading({
                title: "加载中"
            }), l.all([ b.handleConfirmDefaultAvatarCache(a), b.handleConfirmFrameCache(a) ]).then(function() {
                b.handleChangeAvatarFrame(a), wx.hideLoading();
            }).catch(function() {
                h.xu.showToast("获取素材资源失败"), wx.hideLoading();
            });
        },
        drawHat: function() {
            s.drawImage(v.url, 0, 0, v.w, v.h);
        },
        drawBackground: function() {
            s.rect(0, 0, this.data.canvasW, this.data.canvasH), s.setFillStyle("white"), s.fill();
        },
        drawAvatar: function() {
            s.translate(u.x, u.y), s.scale(u.scale, u.scale), s.drawImage(u.url, -u.w / 2, -u.h / 2, u.w, u.h);
        },
        drawIt: function() {
            console.log(u, v), this.drawBackground(), s.save(), this.drawAvatar(), s.restore(), 
            this.drawHat(), s.draw();
        },
        onUploadImgBtnTap: function() {
            var a = this;
            return new l(function(b, c) {
                wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: [ "album" ],
                    success: function(d) {
                        u.url = d.tempFilePaths[0], wx.getImageInfo({
                            src: u.url,
                            success: function(c) {
                                u.scale = 1, u.rotate = 0, u.y = t.y, u.x = t.x, u.h = c.height / c.width * u.w, 
                                t.h = u.h, a.setData({
                                    hasCustomOtherAvatar: !0,
                                    shouldResetWxAvatarBtnShow: !0
                                }), a.drawIt(), b();
                            },
                            fail: function() {
                                a.drawIt(), c();
                            }
                        });
                    }
                });
            });
        },
        onRemakeAndReturnBtnTap: function() {
            this.onUploadImgBtnTap().then(this.onRemakeBtnTap);
        },
        handleDelayFn: function(a) {
            return new l(function(b) {
                setTimeout(b, a);
            });
        },
        handleSaveCanvasToLocal: function(a) {
            var b = this, c = this.data.finalQid, d = this.data.currentFrameId, e = this.handleGetCurrentFrameInfo("share_desc"), f = this.handleGetCurrentFrameInfo("gid");
            wx.canvasToTempFilePath({
                canvasId: "avatarEditor",
                success: function(b) {
                    var g = b.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: g,
                        success: function() {
                            wx.showToast({
                                title: "保存成功"
                            }), wx.navigateTo({
                                url: "../avatarResultSharePage/avatarResultSharePage?url=" + g + (a ? "&shareUrl=" + a : "") + (f ? "&gid=" + f : "") + (e ? "&shareDesc=" + encodeURIComponent(e) : "") + (d ? "&currentFrameId=" + d : "") + (c ? "&qid=" + c : "")
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "保存失败"
                            });
                        },
                        complete: function() {
                            wx.hideLoading && wx.hideLoading();
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
        handleConfirmDownloadImgAuthExist: function() {
            return new l(function(a) {
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
        handleSaveTempPathToLocal: function(a) {
            return new l(function(b, c) {
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function() {
                        wx.showToast({
                            title: "保存成功"
                        }), b();
                    },
                    fail: function() {
                        c();
                    },
                    complete: function() {}
                });
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
        onSaveBtnClick: function() {
            var a = this, b = this.data.mode, c = this.data.firstEnterPreviewMode, d = this.data.previewSrc, e = this.data.shareUrl, f = this.data.finalQid, g = this.data.currentFrameId, i = this.handleGetCurrentFrameInfo("share_desc"), j = this.handleGetCurrentFrameInfo("gid"), k = this.handleCheckSaveUsability();
            k && this.handleConfirmDownloadImgAuthExist().then(function() {
                switch (wx.showLoading && wx.showLoading({
                    title: "保存中...",
                    mask: !0
                }), b) {
                  case "preview":
                    if (c) return void a.handleDownLoadTargetLink(d).then(a.handleSaveTempPathToLocal).then(function() {
                        wx.hideLoading && wx.hideLoading();
                    });
                    a.handleSaveTempPathToLocal(d).then(function() {
                        wx.hideLoading && wx.hideLoading(), wx.navigateTo({
                            url: "../avatarResultSharePage/avatarResultSharePage?url=" + d + (e ? "&shareUrl=" + e : "") + (j ? "&gid=" + j : "") + (i ? "&shareDesc=" + encodeURIComponent(i) : "") + (g ? "&currentFrameId=" + g : "") + (f ? "&qid=" + f : "")
                        });
                    });
                    break;

                  case "edit":
                    o.isHigherVersionSDK(h.sysInfo.SDKVersion, "1.7.0") ? a.drawIt(a.handleDelayFn(1e3).then(a.handleCreateShareImg).then(a.handleSaveCanvasToLocal)) : (a.drawIt(), 
                    a.handleDelayFn(3e3).then(a.handleCreateShareImg).then(a.handleSaveCanvasToLocal));
                    break;

                  default:
                }
            });
        }
    });
})();