(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/postMoment.js"), d = require("../../../actions/index.js"), e = require("../../../actions/feedFlow.js"), f = require("../../../config/config.js"), g = a.sysInfo.windowWidth, h = require("../../../common/utils.js"), i = require("../../../common/wxUtils.js"), j = 0, k = 0;
    Page({
        data: {
            tabs: [ "我的相册", "发现相册" ],
            activeIndex: 0,
            sliderOffset: 0,
            sliderLeft: 0,
            actionSheet: {
                hidden: !0,
                buttons: []
            },
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0,
                rightText: "发送",
                midText: "请选择发到哪个相册",
                onRightTap: "onNavBarRightTap"
            },
            publicGroupList: [],
            privateGroupList: [],
            tempFilePaths: {},
            toast: {
                hidden: !0,
                text: ""
            }
        },
        tplMsgFormSubmit: h.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = b.publicGroup.publicGroupBasisList.list, d = b.userGroup.userGroupBasisList.list, e = b.publicGroup.publicGroupBasisList.hasNext, f = b.userGroup.userGroupBasisList.hasNext, g = a.xu.token, h = b.postMoment.aheadChosenFiles;
            this.setData({
                publicGroupList: c,
                privateGroupList: d,
                publicListHasNext: e,
                priviteListHasNext: f,
                token: g,
                tempFilePaths: h
            });
        },
        onLoad: function() {
            a.xu.mta.Page.init(), wx.showNavigationBarLoading(), wx.showLoading && wx.showLoading({
                title: "加载中",
                mask: !0
            }), wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            }), b(d.getUserGroupsBasisList({
                token: a.xu.token,
                success: function() {
                    wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading();
                },
                fail: function(b) {
                    wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading(), a.xu.showToast(b);
                }
            })), b(d.getPublicGroupsBasisList({
                token: a.xu.token,
                success: function() {
                    wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading();
                },
                fail: function(b) {
                    wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading(), a.xu.showToast(b);
                }
            }));
        },
        onReady: function() {
            var b = this;
            this.setData({
                sliderLeft: (a.sysInfo.windowWidth / b.data.tabs.length - 96) / 2,
                sliderOffset: a.sysInfo.windowWidth / b.data.tabs.length * b.data.activeIndex
            });
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onHide: function() {},
        onUnload: function() {
            b(c.resetChooseImgs());
        },
        onPullDownRefresh: function() {
            wx.showNavigationBarLoading(), b(d.getUserGroupsBasisList({
                token: a.xu.token,
                success: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                },
                fail: function(b) {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), a.xu.showToast(b);
                }
            })), b(d.getPublicGroupsBasisList({
                token: a.xu.token,
                success: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                },
                fail: function(b) {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), a.xu.showToast(b);
                }
            }));
        },
        onShareAppMessage: function() {
            this;
            return wx.checkSession({
                success: function() {
                    console.log("//session 未过期，并且在本生命周期一直有效");
                },
                fail: function() {
                    console.log("//登录态过期");
                }
            }), {
                title: "邀请您关注群相册",
                path: "/pages/moments/feedFlowPage/feedFlowPage",
                imageUrl: "../../../src/image/xbd-Logo.jpg",
                success: function(c) {
                    console.log("转发成功的结果", c), c.shareTickets && a.handleDecryptShareInfo(c.shareTickets[0]).then(function(c) {
                        b(d.getUserGroupsBasisList({
                            token: a.xu.token
                        })), wx.reLaunch ? wx.reLaunch({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + c.list.id
                        }) : wx.redirectTo({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + c.list.id
                        });
                    });
                }
            };
        },
        onScrollViewReachBottom: function() {
            console.log("触发了触底事件........==========>");
            var c = this, e = this.data.activeIndex, f = c.data.publicGroupList, g = c.data.privateGroupList, h = c.data.priviteListHasNext, i = c.data.publicListHasNext;
            switch (e) {
              case 0:
                h && !k && (k = 1, b(d.getUserGroupsBasisList({
                    token: a.xu.token,
                    startNum: g[g.length - 1].sort_num,
                    success: function() {
                        console.log("拉取下一页成功"), k = 0;
                    },
                    fail: function(b) {
                        a.xu.showToast(b), k = 0;
                    }
                })));
                break;

              case 1:
                i && !j && (j = 1, b(d.getPublicGroupsBasisList({
                    token: a.xu.token,
                    start: f.length,
                    success: function() {
                        console.log("拉取下一页成功"), j = 0;
                    },
                    fail: function(b) {
                        a.xu.showToast(b), j = 0;
                    }
                })));
                break;

              default:
            }
        },
        tabClick: function(a) {
            this.setData({
                sliderOffset: a.currentTarget.offsetLeft,
                activeIndex: a.currentTarget.id
            });
        },
        handleSwipeSwiper: function(b) {
            var c = b.detail.current;
            this.setData({
                sliderOffset: a.sysInfo.windowWidth / this.data.tabs.length * c,
                activeIndex: c
            });
        },
        onBuildGroupBtnTap: function() {
            wx.navigateTo({
                url: "../../me/chooseNewGroupTypePage/chooseNewGroupTypePage"
            });
        },
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        buildShareGrp: function() {
            this.handleHideAS(), wx.login({
                success: function(c) {
                    console.log("loginSuccess-----"), b(d.acWxFetchSession(c.code, function(b) {
                        i.setStorageSync("mini_session", b.mini_session), a.xu.mini_session = i.getStorageSync("mini_session");
                    }));
                }
            });
        },
        buildCommonGrp: function() {
            wx.navigateTo({
                url: "../../me/buildGroupPage/buildGroupPage"
            }), this.handleHideAS();
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onNavBarRightTap: function() {
            var a = this, b = this.data.tempFilePaths;
            this.handlePostMoment(b);
        },
        onGrpSelected: function(a) {
            var b = a.currentTarget.dataset.grpid;
            this.setData({
                gid: b
            });
        },
        handlePostMoment: function(b) {
            var c = this, d = b.tempFilePaths, e = b.needShowPercent, f = b.desc, g = b.isVideo, h = a.xu.token, i = this.data.gid;
            if (!i) return void a.xu.showToast("请选择您要发表到的一个相册");
            var j = e ? "uploadLocalImgPRO" : "uploadLocalImg";
            return 0 === d.length && 0 === f.trim().length ? void a.xu.showToast("发布内容不能为空") : void (!e && setTimeout(function() {
                wx.hideLoading && wx.hideLoading(), wx.showLoading && wx.showLoading({
                    title: "发表中",
                    mask: !0
                });
            }, 1e3), 0 === d.length && 0 !== f.trim().length ? c.postMomentFn([], [], e, f) : this[j]({
                isVideo: g,
                tempPaths: d,
                formData: {
                    token: h,
                    gid: i
                },
                successCB: function(a) {
                    c.postMomentFn(d, a, e, f);
                }
            }));
        },
        postMomentFn: function(d, e, f, g) {
            console.log(e);
            var h = this, j = a.xu.token, k = this.data.gid;
            i.createProImageObjArr(d).then(function(a) {
                b(c.postMoment({
                    token: j,
                    gid: k,
                    qids: e,
                    desc: g,
                    resFeedImageArr: a,
                    success: function(a) {
                        var b = a && a.id;
                        f && wx.showLoading && wx.showLoading({
                            title: "已完成100%",
                            mask: !0
                        }), setTimeout(function() {
                            wx.showLoading && wx.showLoading({
                                mask: !1
                            }), wx.hideLoading && wx.hideLoading();
                        }, 1e3), wx.redirectTo({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + k + (b ? "&newestPostMomID=" + b : "")
                        });
                    },
                    fail: function() {
                        wx.hideLoading && wx.hideLoading(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(a) {
                                a.confirm ? (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), h.postMomentFn(d, e)) : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                }));
            });
        },
        uploadLocalImg: function(a) {
            for (var b = this, c = a.tempPaths, d = a.formData, e = a.successCB, g = a.failureCB, h = [], j = 0; j < c.length; j++) (function(j) {
                var i = c[j];
                wx.uploadFile({
                    url: f.uploadUrl,
                    filePath: i,
                    name: "file",
                    formData: d,
                    success: function(a) {
                        console.log(a);
                        var d = JSON.parse(a.data).ret;
                        h[j] = 1 === d ? JSON.parse(a.data).data.list[0].qid || -1 : -1, console.log(h[j]), 
                        console.log(j, h, h.length, c.length, b.checkIfArrIsFull(h, c.length));
                    },
                    fail: function() {
                        h[j] = -1, console.log(j, h, h.length, c.length, b.checkIfArrIsFull(h, c.length));
                    },
                    complete: function() {
                        b.checkIfArrIsFull(h, c.length) && (console.log(h), h.find(function(a) {
                            return -1 === a;
                        }) ? (wx.hideLoading && wx.hideLoading(), h = [], uploadNeedBreak = !0, g && g(res), 
                        wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(c) {
                                c.confirm ? (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), b.uploadLocalImg(a)) : c.cancel && console.log("用户点击取消");
                            }
                        })) : (console.log("传完了"), e && e(h)));
                    }
                });
            })(j);
        },
        uploadLocalImgPRO: function(a) {
            var b = a.isVideo, c = this, d = a.tempPaths[0], e = a.tempPaths, g = a.formData, h = a.successCB, i = a.failureCB, j = [], k = wx.uploadFile({
                url: b ? f.uploadVideoUrl : f.uploadUrl,
                filePath: d,
                name: "file",
                formData: g,
                success: function(a) {
                    console.log(a);
                    var b = JSON.parse(a.data).ret;
                    j[0] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1, console.log(j[0]), 
                    console.log(0, j, j.length, e.length, c.checkIfArrIsFull(j, e.length));
                },
                fail: function() {
                    j[0] = -1, console.log(0, j, j.length, e.length, c.checkIfArrIsFull(j, e.length));
                },
                complete: function() {
                    c.checkIfArrIsFull(j, e.length) && (console.log(j), j.find(function(a) {
                        return -1 === a;
                    }) ? (wx.hideLoading && wx.hideLoading(), j = [], uploadNeedBreak = !0, i && i(res), 
                    wx.showModal({
                        title: "上传失败",
                        content: "网络原因,上传图片失败,是否重试?",
                        confirmText: "重试",
                        success: function(b) {
                            b.confirm ? (wx.showLoading && wx.showLoading({
                                title: "发表中",
                                mask: !0
                            }), c.uploadLocalImgPRO(a)) : b.cancel && console.log("用户点击取消");
                        }
                    })) : (console.log("传完了"), h && h(j)));
                }
            });
            k && k.onProgressUpdate(function(a) {
                wx.showLoading && wx.showLoading({
                    title: "已完成" + (0 > a.progress - 1 ? 0 : a.progress - 1) + "%",
                    mask: !0
                }), console.log("上传进度", a.progress), console.log("已经上传的数据长度", a.totalBytesSent), 
                console.log("预期需要上传的数据总长度", a.totalBytesExpectedToSend);
            });
        },
        checkIfArrIsFull: function(a, b) {
            if (a.length !== b) return !1;
            for (var c, d = 0; d < a.length; d++) if (c = a[d], !c) return !1;
            return !0;
        }
    });
})();