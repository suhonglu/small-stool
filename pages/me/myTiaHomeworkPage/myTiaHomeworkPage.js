(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../xng_modules/es6-promise.min.js").Promise;
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0,
                midText: "提交作业"
            },
            signalCard: {
                hidden: !0,
                signal: "",
                handletap: "handleSignalCardtap"
            },
            toast: {
                hidden: !0
            },
            actionSheet: {
                hidden: !0
            },
            missionList: [],
            reachBottomFetchFail: !1,
            hasNext: !0,
            nextStartNum: -1,
            gid: 1,
            currentTargetMissionID: null
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = a.me.ownTiaMissionList[b].list, d = a.me.ownTiaMissionList[b].hasNext, e = a.me.ownTiaMissionList[b].nextStartNum;
            this.setData({
                missionList: c,
                hasNext: d,
                nextStartNum: e
            });
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onLoad: function(b) {
            wx.setNavigationBarTitle({
                title: "提交作业"
            }), a.xu.mta.Page.init(), this.setData({
                gid: b.gid || 1
            }), this.handleFetchMainData();
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
            var c = this, e = this.data.nextStartNum, f = this.data.hasNext, g = a.xu.token, h = this.data.gid;
            this.setData({
                reachBottomFetchFail: !1
            }), f && (wx.showNavigationBarLoading(), b(d.fetchMyTiaMissionList({
                gid: h,
                token: g,
                startNum: e,
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
        handleFetchMainData: function() {
            var c = a.xu.token, e = this.data.gid;
            wx.showNavigationBarLoading(), b(d.fetchMyTiaMissionList({
                gid: e,
                token: c,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
                }
            }));
        },
        onSubmitHomeworkBtnTap: function(a) {
            var b = a.currentTarget.dataset.missionid, c = a.currentTarget.dataset.signal;
            this.setData({
                currentTargetMissionID: b,
                signalCard: i({}, this.data.signalCard, {
                    signal: c
                })
            }), this.postCommonImgsFn();
        },
        onSignInBtnTap: function(a) {
            var b = this, c = a.currentTarget.dataset.signal;
            this.setData({
                signalCard: i({}, b.data.signalCard, {
                    hidden: !1,
                    signal: c
                })
            });
        },
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        postCommonImgsFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                sizeType: [ "compressed" ],
                success: function(b) {
                    var c = b.tempFilePaths;
                    a.handlePostMoment(c);
                }
            });
        },
        handlePostMoment: function(b, c, d) {
            var e = this, f = a.xu.token, g = this.data.gid;
            return 0 === b.length ? void a.xu.showToast("发布内容不能为空") : void (setTimeout(function() {
                wx.hideLoading && wx.hideLoading(), wx.showLoading && wx.showLoading({
                    title: "发表中",
                    mask: !0
                });
            }, 300), this.uploadLocalImg({
                isVideo: d,
                tempPaths: b,
                formData: {
                    token: f,
                    gid: g
                },
                successCB: function(a) {
                    e.postMomentFn(b, a, c);
                }
            }));
        },
        uploadLocalImg: function(a) {
            for (var b = this, c = a.tempPaths, d = a.formData, e = a.successCB, f = a.failureCB, g = [], h = 0; h < c.length; h++) (function(h) {
                var i = c[h];
                wx.uploadFile({
                    url: m.uploadUrl,
                    filePath: i,
                    name: "file",
                    formData: d,
                    success: function(a) {
                        var b = JSON.parse(a.data).ret;
                        g[h] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1;
                    },
                    fail: function() {
                        g[h] = -1;
                    },
                    complete: function() {
                        if (b.checkIfArrIsFull(g, c.length)) {
                            console.log(g);
                            var d = g.find(function(a) {
                                return -1 === a;
                            });
                            d ? (wx.hideLoading && wx.hideLoading(), g = [], f && f(res), wx.showModal({
                                title: "上传失败",
                                content: "网络原因,上传图片失败,是否重试?",
                                confirmText: "重试",
                                success: function(c) {
                                    c.confirm && (wx.showLoading && wx.showLoading({
                                        title: "发表中",
                                        mask: !0
                                    }), b.uploadLocalImg(a));
                                }
                            })) : e && e(g);
                        }
                    }
                });
            })(h);
        },
        postMomentFn: function(c, d) {
            var f = this, g = a.xu.token, h = this.data.gid, j = this.data.currentTargetMissionID, l = this.data.currentTargetMissionTitle, m = this.data.signalCard.signal;
            k.createProImageObjArr(c).then(function(a) {
                b(e.postMoment({
                    token: g,
                    gid: h,
                    qids: d,
                    hwid: j,
                    resFeedImageArr: a,
                    desc: l,
                    success: function(a) {
                        var b = a && a.id, c = getCurrentPages(), d = c[c.length - 2];
                        wx.navigateBack(), d.refreshContent ? d.refreshContent(function() {
                            d.setData({
                                newestPostMomID: b,
                                signalCard: i({}, d.data.signalCard, {
                                    hidden: !m,
                                    signal: m
                                })
                            });
                        }) : d.setData({
                            newestPostMomID: b,
                            signalCard: i({}, d.data.signalCard, {
                                hidden: !m,
                                signal: m
                            })
                        });
                    },
                    fail: function() {
                        wx.hideLoading && wx.hideLoading(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,发表图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(a) {
                                a.confirm && (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), f.postMomentFn(c, d));
                            }
                        });
                    }
                }));
            });
        },
        checkIfArrIsFull: function(a, b) {
            if (a.length !== b) return !1;
            for (var c, d = 0; d < a.length; d++) if (c = a[d], !c) return !1;
            return !0;
        },
        handleCopyWord: function(b) {
            this;
            return new n(function(c, d) {
                wx.setClipboardData ? wx.setClipboardData({
                    data: b,
                    success: function() {
                        c();
                    },
                    fail: d
                }) : (a.xu.showLowVersionAlert(), d());
            });
        },
        handleSignalCardtap: function() {
            var b = this, c = this.data.signalCard.signal;
            this.handleCopyWord(c).then(function() {
                b.setData({
                    signalCard: i({}, b.data.signalCard, {
                        hidden: !0
                    })
                }), a.xu.showToast("复制成功! 快去小年糕公众号收集卡片吧!");
            }).catch(function() {
                b.setData({
                    signalCard: i({}, b.data.signalCard, {
                        hidden: !0
                    })
                }), a.xu.showToast("复制失败! 请稍后重试");
            });
        }
    });
})();