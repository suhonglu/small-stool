(function() {
    var a, b = getApp(), c = b.store.dispatch, d = require("../../../actions/index.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../const/toastText.js");
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            tabs: [],
            signalCard: {
                hidden: !0,
                signal: "",
                handletap: "handleSignalCardtap"
            },
            currentTabIndex: 0,
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0
            },
            imageBoxWidth: b.sysInfo.windowWidth ? Math.floor((b.sysInfo.windowWidth - 40 + 8) / 3) - 8 : 60,
            touch_start: null,
            touch_end: null,
            hasContentMap: {},
            hasLoad: !1,
            initialFail: !1,
            needShowBuildGroupGuide: !1,
            groupList: {},
            recommendGroupList: [],
            showOpenData: !0,
            shouldBackUpWordShow: !1,
            failDecryptTimes: 0,
            unreadCount: 0,
            banner: null
        },
        mapStateToData: function(a) {
            var b = a.me.interaction.unreadCount, c = a.userGroup.recommendGroupList, d = a.userGroup.userGroupList, e = a.userGroup.userGroupTabs, f = a.userGroup.banner, g = this.data.currentTabIndex, h = {};
            for (var i in d) if (d.hasOwnProperty(i)) {
                var j = d[i];
                h[i] = !!j.length;
            }
            this.setData({
                tabs: e,
                banner: f,
                groupList: d,
                recommendGroupList: c,
                hasContentMap: h,
                unreadCount: b
            });
        },
        onLoad: function(e) {
            b.xu.mta.Page.init(), k.setChannelData(e), wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            }), a = +new Date(), k.getUserAuthorize(b, c, d, this.handleFetchMainData);
        },
        onReady: function() {
            var c = this;
            setTimeout(function() {
                c.setData({
                    shouldBackUpWordShow: !0
                });
            }, 2e3), b.xu.logger && b.xu.logger.logTraffic("initRenderTime", {
                bt: a,
                tt: +new Date() - a
            });
        },
        onShow: function() {
            var a = b.xu.token;
            this.mapStateToData(b.store.getState()), this.handleSyncDataName(), c(d.resetGroupMember()), 
            this.data.hasLoad && c(d.getUserGroupsList(a));
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            var a = b.xu.token, e = this;
            wx.showNavigationBarLoading(), e.setData({
                shouldBackUpWordShow: !1,
                initialFail: !1,
                hasLoad: !1
            }), c(d.getUserGroupsList(a, function() {
                wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), e.setData({
                    showOpenData: !1,
                    hasLoad: !0
                }), e.setData({
                    showOpenData: !0
                }), setTimeout(function() {
                    e.setData({
                        shouldBackUpWordShow: !0
                    });
                }, 1500), e.handleSyncDataName();
            }, function() {
                wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), b.xu.showToast(n.NORMAL_ERROR), 
                e.setData({
                    initialFail: !0,
                    hasLoad: !0
                });
            }));
        },
        onReachBottom: function() {},
        onShareAppMessage: function(a) {
            var e = b.xu.token, f = a[0] && a[0].from || "menu";
            return {
                title: "邀请您关注群相册",
                path: "button" === f ? "/pages/moments/feedFlowPage/feedFlowPage" : "",
                imageUrl: "../../../src/image/xbd-Logo.jpg",
                success: function(a) {
                    a.shareTickets && ("button" === f ? b.handleBuildShareGroup(a.shareTickets[0]).then(function(a) {
                        c(d.getUserGroupsList(e)), wx.navigateTo({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + a.list.id
                        });
                    }).catch(function(a) {
                        console.log("BUILD_SHARE_GROUP_ERROR", a), b.xu.showToast(n.BUILD_SHARE_GROUP_ERROR);
                    }) : b.handleDecryptShareInfo(a.shareTickets[0]));
                }
            };
        },
        onPicErr: function(a) {
            var b = a.currentTarget.dataset.groupindex, c = a.currentTarget.dataset.photoindex, d = this.data.currentDataName;
            console.log("失败", b, c);
            var e = this.data.groupList, f = e[d];
            f[b].imageList[c].cover = "../../../src/image/image_error.png", this.setData({
                groupList: e
            });
        },
        onRecommendEntryTap: function(a) {
            var b = a.currentTarget.dataset.gid;
            wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=" + b
            });
        },
        onInteractionEntryTap: function() {
            c(g.clearInteractionIco()), wx.navigateTo({
                url: "../../me/interactionPage/interactionPage"
            });
        },
        onBuildGroupBtnTap: function() {
            this.setData({
                needShowBuildGroupGuide: !1
            }), wx.navigateTo({
                url: "../../me/chooseNewGroupTypePage/chooseNewGroupTypePage"
            });
        },
        onPostBtnTap: function() {
            this.setData({
                actionSheet: {
                    hidden: !1,
                    onCancel: "handleHideAS",
                    buttons: [ {
                        name: "图片",
                        onTap: "postCommonImgsFn"
                    }, {
                        name: "GIF动态图",
                        onTap: "postGifFn"
                    }, {
                        name: "视频",
                        onTap: "postVideoFn"
                    } ]
                }
            });
        },
        onGroupItemTap: function(a) {
            var d = this.data.touch_end, e = this.data.touch_start, f = a.currentTarget.dataset.gid, h = a.currentTarget.dataset.noticetxt, i = +a.currentTarget.dataset.isdisableenter;
            return i ? void b.xu.showToast(h) : void (350 > d - e && (c(g.clearUnreadIco({
                gid: f
            })), wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + f
            })));
        },
        onTabTap: function(a) {
            var b = a.currentTarget.dataset.index;
            this.setData({
                currentTabIndex: b
            }), this.handleSyncDataName();
        },
        handleNavToTiaHomeworkSubmitPage: function(a) {
            var b = a.currentTarget.dataset.gid;
            wx.navigateTo({
                url: "../../me/myTiaHomeworkPage/myTiaHomeworkPage?gid=" + b
            });
        },
        handleSyncDataName: function() {
            var a = this.data.tabs || [], b = this.data.currentTabIndex, c = a[b] ? a[b].data_name : "list";
            this.setData({
                currentDataName: c
            });
        },
        handleFetchMainData: function() {
            var a = this, e = b.xu.token, f = this.data.hasContentMap.list;
            c(d.getUserGroupsList(e)).then(function() {
                f || k.setStorageSync("xng_mini_app_needShowBuildGroupGuide", !1), a.setData({
                    hasLoad: !0,
                    needShowBuildGroupGuide: k.getStorageSync("xng_mini_app_needShowBuildGroupGuide")
                }), a.handleSyncDataName(), a.handlePreFetchData();
            }).catch(function() {
                a.setData({
                    hasLoad: !0,
                    initialFail: !0
                }), b.xu.showToast(n.NORMAL_ERROR);
            });
        },
        handlePreFetchData: function() {
            var a = this.data.groupList.list, d = this.data.recommendGroupList, e = b.xu.token;
            a.slice(0, 3).forEach(function(a) {
                var b = a.id;
                c(f.acFetchGroupInfo(e, b)), c(f.acFetchFeedFlow({
                    token: e,
                    gid: b,
                    start_t: -1,
                    needOverride: !0,
                    noclean: 1
                }));
            }, this), d || [].forEach(function(a) {
                var d = a.id;
                0 === b.store.getState().recommend.recommendData.list.length && c(h.fetchRecommendList({
                    token: e,
                    chid: d,
                    startNum: 0
                }));
            }, this);
        },
        handleHideCard: function() {
            this.setData({
                needShowBuildGroupGuide: !1
            }), k.setStorageSync("xng_mini_app_needShowBuildGroupGuide", !1);
        },
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        handleOptGroup: function(a) {
            var d = b.xu.token, e = a.currentTarget.dataset.gid, h = a.currentTarget.dataset.name, i = a.currentTarget.dataset.istopped;
            wx.showActionSheet({
                itemList: i ? [ "取消置顶", "退出相册" ] : [ "置顶", "退出相册" ],
                success: function(a) {
                    var j = a.tapIndex;
                    switch (j) {
                      case 0:
                        wx.showModal({
                            title: i ? "取消置顶" : "置顶",
                            content: "确定" + (i ? "取消置顶" : "置顶") + (h ? '"' + h + '"' : "") + "吗?",
                            success: function(a) {
                                a.confirm && (i ? c(g.unTopGroup({
                                    token: d,
                                    gid: e,
                                    success: function() {
                                        b.xu.showToast(n.SETTING_NEED_REFRESH_MANUAL);
                                    }
                                })) : c(g.topGroup({
                                    token: d,
                                    gid: e
                                })));
                            }
                        });
                        break;

                      case 1:
                        wx.showModal({
                            title: "退出",
                            content: "确定退出" + (h ? '"' + h + '"' : "") + "吗?",
                            success: function(a) {
                                a.confirm && c(f.quitGroup(d, e));
                            }
                        });
                        break;

                      default:
                    }
                }
            });
        },
        handleBuildCommonGrp: function() {
            wx.navigateTo({
                url: "../../me/buildGroupPage/buildGroupPage"
            }), this.handleHideAS();
        },
        handleBuildPersonGrp: function() {
            wx.navigateTo({
                url: "../../me/buildGroupPage/buildGroupPage?type=2"
            }), this.handleHideAS();
        },
        handleNavToFullFnPostPage: function() {
            wx.navigateTo({
                url: "../../post/postIndexProPage/postIndexProPage"
            });
        },
        postCommonImgsFn: function() {
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                sizeType: [ "compressed" ],
                success: function(a) {
                    var b = a.tempFilePaths;
                    c(e.getChooseImgs({
                        tempFilePaths: b
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postGifFn: function() {
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                count: 1,
                sizeType: [ "original" ],
                success: function(a) {
                    var b = a.tempFilePaths;
                    c(e.getChooseImgs({
                        tempFilePaths: b,
                        needShowPercent: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postVideoFn: function() {
            this.handleHideAS(), wx.chooseVideo({
                sourceType: [ "album" ],
                camera: "front",
                success: function(a) {
                    var b = Array(a.tempFilePath);
                    c(e.getChooseImgs({
                        tempFilePaths: b,
                        needShowPercent: !0,
                        isVideo: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        mytouchstart: function(a) {
            this.setData({
                touch_start: a.timeStamp
            });
        },
        mytouchend: function(a) {
            this.setData({
                touch_end: a.timeStamp
            });
        },
        handleCopyWord: function(a) {
            this;
            return new Promise(function(c, d) {
                wx.setClipboardData ? wx.setClipboardData({
                    data: a,
                    success: function() {
                        c();
                    },
                    fail: d
                }) : (b.xu.showLowVersionAlert(), d());
            });
        },
        handleSignalCardtap: function() {
            var a = this, c = this.data.signalCard.signal;
            this.handleCopyWord(c).then(function() {
                a.setData({
                    signalCard: i({}, a.data.signalCard, {
                        hidden: !0
                    })
                }), b.xu.showToast("复制成功! 快去小年糕公众号收集卡片吧!");
            }).catch(function() {
                a.setData({
                    signalCard: i({}, a.data.signalCard, {
                        hidden: !0
                    })
                }), b.xu.showToast("复制失败! 请稍后重试");
            });
        }
    });
})();