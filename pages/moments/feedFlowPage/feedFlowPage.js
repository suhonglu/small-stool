(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/allAlbum.js"), g = require("../../../actions/postMoment.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../common/utils.js"), j = require("../../../common/wxUtils.js"), k = require("../../../xng_modules/es6-promise.min.js").Promise, l = require("../../../config/config.js"), m = require("../../../const/common.js"), n = require("../../../const/postTips.js");
    Page({
        data: {
            tabs: [],
            currentAction: "",
            banner: null,
            signalCard: {
                hidden: !0,
                signal: "",
                handletap: "handleSignalCardtap"
            },
            navBar: {
                hasBackBtn: !0,
                rightDisable: !0,
                onLeftTap: "openGroupListPage"
            },
            dialog: {
                hidden: !0
            },
            toast: {
                hidden: !0
            },
            actionSheet: {
                hidden: !0
            },
            imgCard: {
                hidden: !0,
                src: "",
                handleCloseImgCard: "handleCloseImgCard",
                handleImgClick: "handleImgClick"
            },
            isDescBoxFold: !0,
            shouldBackUpWordShow: !1,
            newestPostMomID: "",
            gid: "",
            groupInfo: {},
            userInfo: {},
            isInGroup: 0,
            isManager: 0,
            isOwner: 0,
            isTiaGroup: 0,
            isActivityGroup: 0,
            feedListMap: {
                new: []
            },
            hasContentMap: {
                new: !1
            },
            hasLoadMap: {
                new: !1
            },
            hasNextMap: {
                new: !0
            },
            reachBottomFetchFailMap: {
                new: !0
            },
            flexStoryIdArray: {},
            targetMomID: "",
            commentInp: "",
            commentLiveInp: "",
            commentLiveMap: {},
            failDecryptTimes: 0,
            videoPlayLock: !1,
            shakeController: {},
            windowWidth: a.sysInfo.windowWidth
        },
        tplMsgFormSubmit: i.tplMsgFormSubmit,
        albumEntryClickable: !0,
        hrefID: null,
        imgErrorCount: 0,
        imgCorrectCount: 0,
        imgErrCounter: {},
        handleChangeCurrentStatus: function(a) {
            var b = a.key, c = a.value, d = this.data.currentAction, e = {};
            e[b + "Map"] = this.data[b + "Map"], e[b + "Map"][d] = c, this.setData(e);
        },
        mapStateToData: function(b) {
            var c, d = Math.floor, e = this.data.gid, f = b.entities.feedFlowList, g = b.entities.tabFeedFlowList, i = f[e] && f[e].groupData || {}, j = i.clockin, k = void 0 === i.isInGroup ? 1 : i.isInGroup, l = i.isManager, m = i.isOwner, n = 10 === i.type, o = 2 === i.type, p = i.isTiaGroup, q = 0 === i.type && 1 === i.sub_typ, r = i.isMultiTabGroup, s = i.pub, t = b.wx.user, u = i.banner, v = i.tablist || [], w = this.data.currentAction, x = r ? g[e] && g[e][w] || {} : f[e] || {}, y = x.feedList || [], z = r ? b.feedFlow.tabFeedList.list[e] && b.feedFlow.tabFeedList.list[e][w] && b.feedFlow.tabFeedList.list[e][w].ids || [] : b.feedFlow.feedList.list[e] && b.feedFlow.feedList.list[e].ids || [], A = z.map(function(a) {
                return y[a];
            }), B = r ? b.feedFlow.tabFeedList.list[e] && b.feedFlow.tabFeedList.list[e][w] && b.feedFlow.tabFeedList.list[e][w].hasNext : b.feedFlow.feedList.list[e] && b.feedFlow.feedList.list[e].hasNext, C = !!A.length, D = [ {
                src: o ? "../../../src/img/feed/icon_group_manage.png" : "../../../src/img/feed/icon_group_member.png",
                handleTap: "onGroupManageEntryTap"
            }, p ? null : {
                src: "../../../src/img/feed/invite_btn.jpg",
                handleTap: "handleAddMember",
                hasShareFn: "10001" !== e
            } ];
            n ? D.unshift({
                handleTap: "handleBuildAlbumGrp",
                text: "建影集群"
            }) : p ? D.unshift(null !== j && j !== void 0 ? {
                handleTap: 10 === j || 20 === j ? "handleNavToSignCalendar" : "handleSignIn",
                text: 20 === j ? "已签到" : "☑签到",
                disable: 0 === j
            } : null) : q ? D.unshift({
                handleTap: "handleOpenActiveIntroImgBox",
                text: "活动说明"
            }) : D.unshift({
                src: "../../../src/img/feed/icon_group_photo_plus_2.jpg",
                handleTap: "onAlbumEntryTap",
                text: "相册"
            }), c = h({}, this.data.navBar, k ? {
                rightBtns: D,
                rightText: null,
                onRightTap: null
            } : {
                rightBtns: null,
                rightText: "关注该相册",
                onRightTap: "onJoinGroup"
            }), this.setData({
                tabs: 1 >= v.length ? [] : v,
                banner: u,
                navBar: c,
                userInfo: t,
                groupInfo: i,
                isInGroup: k,
                isManager: l,
                isAlbumGrp: n,
                isPersonalGrp: o,
                isOwner: m,
                isTiaGroup: p,
                isActivityGroup: q,
                isMultiTabGroup: r,
                imageBoxWidth: d(a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 39) / 3 - 1 : 60),
                imageHalfWidth: d(a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 39) / 2 - 1 : 60),
                imageFullWidth: d(a.sysInfo.windowWidth ? a.sysInfo.windowWidth - 40 : 200),
                imageMaxHeight: d(.8 * a.sysInfo.windowHeight)
            }), this.handleChangeCurrentStatus({
                key: "feedList",
                value: A
            }), this.handleChangeCurrentStatus({
                key: "hasContent",
                value: C
            }), this.handleChangeCurrentStatus({
                key: "hasNext",
                value: B
            });
        },
        onLoad: function(c) {
            var e = this, f = c.gid, g = a.sysInfo.SDKVersion && 124 <= 1 * a.sysInfo.SDKVersion.replace(/\./g, "");
            a.xu.mta.Page.init(), j.setChannelData(c), wx.showShareMenu({
                withShareTicket: !0
            }), "10001" === f && wx.hideShareMenu(), setTimeout(function() {
                e.setData({
                    shouldBackUpWordShow: !0
                });
            }, 2e3), this.hrefID = c.itemID, this.firstLoadTime = +new Date(), this.setData({
                shouldShowFeedShareBtn: g,
                neverPostMoment: j.getStorageSync("xng_mini_app_neverPostMoment"),
                gid: f,
                newestPostMomID: c.newestPostMomID
            }), j.getUserAuthorize(a, b, d, this.onStandBy);
        },
        onStandBy: function() {
            var b = this.data.gid, c = this.hrefID, d = a.xu.shareBuildGrpID;
            return 1 === getCurrentPages().length && this.setData({
                navBar: h({}, this.data.navBar, {
                    faBackBtn: "newspaper-o",
                    littleTag: m.BACK_BTN_TEXT
                })
            }), "" === b || "undefined" === b || "0" === b ? void wx.reLaunch({
                url: "../../me/groupListPage/groupListPage"
            }) : void ("undefined" == typeof b ? d ? (b = d, this.setData({
                gid: b
            }), this.handleGetMainContent()) : wx.reLaunch({
                url: "../../me/groupListPage/groupListPage"
            }) : this.handleGetMainContent());
        },
        handleActiveIntroBoxAutoShow: function() {
            var a = this.data.gid, b = j.getStorageSync("storageActivityIntroController") || {};
            b[a] || (b[a] = !0, j.setStorageSync("storageActivityIntroController", b), this.handleOpenActiveIntroImgBox());
        },
        handleOpenActiveIntroImgBox: function() {
            var a = this.data.groupInfo, b = a.introUrl;
            b && this.handleOpenImgCard({
                src: b
            });
        },
        handleGetMainContent: function() {
            var d = this, e = a.xu.token, f = this.data.gid, g = this.hrefID;
            b(c.acFetchGroupInfo(e, f)).then(function(a) {
                var h = a.group_data, i = a.group_data.isInGroup, j = h.tablist || [], k = d.data.isActivityGroup, m = "new";
                wx.setNavigationBarTitle({
                    title: 1 === h.type ? l.indexTitle : h.name
                }), k && d.handleActiveIntroBoxAutoShow(), i || d.handleOpenANewGroup(), m = k ? g ? "new" : j[0].ac : j[0] && j[0].ac || "new", 
                d.setData({
                    currentAction: m
                }), 0 === j.length ? b(c.acFetchFeedFlow({
                    token: e,
                    gid: f,
                    limit: 5,
                    startID: g || 0,
                    needOverride: !0,
                    contain_start: g ? 1 : 0,
                    success: function() {
                        d.handleChangeCurrentStatus({
                            key: "hasLoad",
                            value: !0
                        }), d.handleChangeCurrentStatus({
                            key: "reachBottomFetchFail",
                            value: !0
                        });
                    },
                    fail: function(a) {
                        d.handleRequestErr(a);
                    }
                })) : b(c.acFetchTabFeedFlow({
                    token: e,
                    gid: f,
                    needOverride: !0,
                    limit: 5,
                    action: m,
                    startID: g || 0,
                    contain_start: g ? 1 : 0,
                    success: function() {
                        d.handleChangeCurrentStatus({
                            key: "hasLoad",
                            value: !0
                        }), d.handleChangeCurrentStatus({
                            key: "reachBottomFetchFail",
                            value: !0
                        });
                    },
                    fail: function(a) {
                        d.handleRequestErr(a);
                    }
                }));
            }).catch(function(b, c) {
                if (-1 === c) {
                    if (!j.isHigherVersionSDK(a.sysInfo.SDKVersion, "1.1.0")) return void a.xu.showLowVersionAlert();
                    wx.showModal({
                        title: "非法操作",
                        content: "您不是从该群相册绑定的微信群点击进入的",
                        showCancel: !1,
                        confirmText: "我知道了",
                        success: function(a) {
                            a.confirm && d.openGroupListPage();
                        }
                    });
                } else d.handleRequestErr(b);
            });
        },
        handleCloseImgCard: function() {
            this.setData({
                imgCard: h({}, this.data.imgCard, {
                    hidden: !0
                })
            });
        },
        handleOpenImgCard: function(a) {
            this.setData({
                imgCard: h({}, this.data.imgCard, {
                    hidden: !1,
                    src: a.src
                })
            });
        },
        handleSignIn: function() {
            var a = j.getStorageSync("tia_sign_tip_has_been_shown");
            a ? this.handleNavToSignCalendarThenShowShareImg() : (j.setStorageSync("tia_sign_tip_has_been_shown", !0), 
            this.handleShowDialog({
                title: "温馨提示",
                closable: !0,
                paragraph: "提交当天的作业以后, 才可以签到哦~",
                buttons: [ {
                    operateBtn: !0,
                    name: "我已了解",
                    onTap: "handleNavToSignCalendarThenShowShareImg"
                } ]
            }));
        },
        handleNavToSignCalendarThenShowShareImg: function() {
            var d = this, e = a.xu.token, f = this.data.gid;
            b(c.tiaUserSign({
                token: e,
                gid: f
            })).then(function(a) {
                d.handleNavToSignCalendar(a, !0);
            });
        },
        handleNavToSignCalendar: function(a, b) {
            var c = this, d = this.data.groupInfo;
            return new k(function(a, d) {
                wx.navigateTo({
                    url: "../../tia/tiaSignCalendarPage/tiaSignCalendarPage?gid=" + c.data.gid + (b ? "&needShowTodayShareCard=1" : ""),
                    success: a,
                    fail: d
                });
            });
        },
        handleHideDialog: function() {
            this.setData({
                dialog: {
                    hidden: !0
                }
            });
        },
        handleShowDialog: function(a) {
            this.setData({
                dialog: {
                    hidden: !1,
                    title: a.title,
                    paragraph: a.paragraph,
                    buttons: a.buttons,
                    closable: a.closable,
                    handleHide: "handleHideDialog",
                    emptyFn: "emptyFn"
                }
            });
        },
        handleShowGrpDescDialog: function() {
            var a = this.data.groupInfo.desc, b = this.data.isActivityGroup;
            !a || b || this.handleShowDialog({
                title: "入群须知",
                paragraph: a,
                buttons: [ {
                    operateBtn: !0,
                    name: "我知道了"
                } ]
            });
        },
        handleShowOperatableGrpDescDialog: function() {
            var a = this.data.groupInfo.desc, b = this.data.isActivityGroup;
            return !a || b ? void this.handleJoinGroup() : void this.handleShowDialog({
                title: "入群须知",
                paragraph: a,
                buttons: [ {
                    operateBtn: !0,
                    name: "关注",
                    onTap: "handleJoinGroup"
                }, {
                    name: "取消"
                } ]
            });
        },
        handleOpenANewGroup: function() {
            var d = this, e = d.data.isInGroup, f = d.data.groupInfo.type, g = d.data.groupInfo.pub, h = d.data.groupInfo.desc, i = d.data.isManager, k = d.data.groupInfo.opengid, l = a.xu.shareOriginOpenGID, n = a.xu.token, o = this.data.gid;
            if (console.log("群组类型: ", f ? "分享建的群" : "普通建的群"), console.log("请求到的群组信息openGid: ", k), 
            console.log("分享进入的来源openGid: ", l), console.log("在不在这个群里: ", e), console.log("-----------"), 
            f !== m.GROUP_BUILD_BY_SHARE || l === k) d.setData({
                navBar: {
                    hasBackBtn: !0,
                    onLeftTap: "openGroupListPage",
                    rightBtns: null,
                    rightText: "关注该相册",
                    onRightTap: "onJoinGroup",
                    rightDisable: !1,
                    faBackBtn: "newspaper-o",
                    littleTag: m.BACK_BTN_TEXT
                }
            }), g || b(c.joinGroup(n, o)).then(d.handleShowGrpDescDialog); else {
                if (!j.isHigherVersionSDK(a.sysInfo.SDKVersion, "1.1.0")) return void a.xu.showLowVersionAlert();
                wx.showModal({
                    title: "非法操作",
                    content: "您不是从该群相册绑定的微信群点击进入的",
                    showCancel: !1,
                    confirmText: "我知道了",
                    success: function(a) {
                        a.confirm && d.openGroupListPage();
                    }
                });
            }
        },
        handleBuildAlbumGrp: function() {
            wx.navigateTo({
                url: "../../me/buildGroupPage/buildGroupPage?type=10"
            });
        },
        onReady: function() {
            a.xu.logger && a.xu.logger.logTraffic("initRenderTime", h({
                bt: this.firstLoadTime,
                tt: +new Date() - this.firstLoadTime
            }));
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onHide: function() {
            this.handlePostPicLogger();
        },
        handlePostPicLogger: function() {
            a.xu.logger && (0 !== this.imgErrorCount && a.xu.logger.logTraffic("photoStatus", h({
                st: 0,
                count: this.imgErrorCount,
                path: getCurrentPages()[getCurrentPages().length - 1].__route__
            })), 0 !== this.imgCorrectCount && a.xu.logger.logTraffic("photoStatus", h({
                st: 1,
                count: this.imgCorrectCount,
                path: getCurrentPages()[getCurrentPages().length - 1].__route__
            }))), this.imgErrorCount = 0, this.imgCorrectCount = 0;
        },
        onUnload: function() {
            var a = this.data.gid;
            b(f.resetRecycleAlbumWall()), b(f.resetAlbumWall()), b(c.cutFeedFlow({
                gid: a
            })), this.handlePostPicLogger();
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, l, n = this, o = d[0] || {}, p = a.xu.token, q = this.data.currentAction, r = this.data.feedListMap, s = this.data.gid, t = this.data.groupInfo.name, u = this.data.groupInfo.type, v = this.data.isMultiTabGroup, w = this.data.isAlbumGrp, x = this.data.feedListMap[q] && this.data.feedListMap[q][0] && this.data.feedListMap[q][0].img_data[0].url;
            if ("button" === o.from) switch (e = d[0].target.dataset.sharesrc, f = d[0].target.dataset.sharedesc, 
            h = d[0].target.dataset.itemid, g = d[0].target.dataset.momid, j = d[0].target.dataset.sharesrctype, 
            j) {
              case "video":
                i = w ? "影集" : "视频";
                break;

              case "gif":
                i = "动态图";
                break;

              default:
                i = "图片";
            }
            return l = "/pages/moments/feedFlowPage/feedFlowPage?gid=" + s + (h ? "&channel=1001&itemID=" + h : ""), 
            k = e ? f || (a.xu.userInfo.nickName || "") + m.FEED_SHARE_WORD_BODY + i + m.FEED_SHARE_WORD_TAIL : "邀请您关注" + (1 !== u && t ? '"' + t + '"' : "") + "群相册", 
            console.log("分享链接是", l), n.setData({
                newestPostMomID: ""
            }), g && b(c.shareMoment({
                token: p,
                gid: s,
                momID: g,
                ac: v ? q : void 0
            })), {
                title: k,
                path: l,
                imageUrl: e || x,
                success: function(b) {
                    a.handleDecryptShareInfo(b.shareTickets[0]);
                }
            };
        },
        tabClick: function(d) {
            var e = this, f = this.data.gid, g = a.xu.token, h = d.currentTarget.dataset.action, i = this.data.feedListMap[h] || [];
            wx.showNavigationBarLoading(), this.setData({
                currentAction: h
            }), e.handleChangeCurrentStatus({
                key: "hasLoad",
                value: i.length
            }), e.handleChangeCurrentStatus({
                key: "reachBottomFetchFail",
                value: i.length
            }), b(c.acFetchTabFeedFlow({
                token: g,
                gid: f,
                needOverride: !0,
                limit: 5,
                action: h,
                success: function() {
                    e.handleChangeCurrentStatus({
                        key: "hasLoad",
                        value: !0
                    });
                },
                fail: function(a) {
                    e.handleRequestErr(a);
                },
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading(), e.handleChangeCurrentStatus({
                        key: "reachBottomFetchFail",
                        value: !0
                    });
                }
            }));
        },
        onRecommendEntryTap: function(a) {
            var b = a.currentTarget.dataset.momid, c = a.currentTarget.dataset.chid || 0, d = this.data.gid;
            wx.navigateTo({
                url: "../../moments/recommendFeedFlowBackUpPage/recommendFeedFlowBackUpPage?chid=" + c + "&itemID=" + b + "&groupID=" + d
            });
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        onPullDownRefresh: function() {
            var d = this, e = this.data.gid, f = a.xu.token, g = this.data.currentAction, h = this.data.isActivityGroup, i = this.data.isMultiTabGroup;
            wx.showNavigationBarLoading(), b(c.acFetchGroupInfo(f, e)).then(function() {
                h || i ? b(c.acFetchTabFeedFlow({
                    token: f,
                    gid: e,
                    needOverride: !0,
                    limit: 5,
                    action: g,
                    success: function() {
                        d.handleChangeCurrentStatus({
                            key: "hasLoad",
                            value: !0
                        });
                    },
                    fail: d.handleRequestErr,
                    complete: function() {
                        wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading();
                    }
                })) : b(c.acFetchFeedFlow({
                    token: f,
                    gid: e,
                    needOverride: !0,
                    limit: 5,
                    success: function() {
                        d.handleChangeCurrentStatus({
                            key: "hasLoad",
                            value: !0
                        });
                    },
                    fail: d.handleRequestErr,
                    complete: function() {
                        wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading();
                    }
                }));
            });
        },
        onReachBottom: function() {
            var d, e = this, f = this.data.gid, g = a.xu.token, h = this.data.currentAction, i = this.data.feedListMap[h], j = this.data.tabs || [], k = this.data.currentAction, l = this.data.isMultiTabGroup, m = this.data.reachBottomFetchFailMap[h];
            i[i.length - 1] && (d = i[i.length - 1].id, e.handleChangeCurrentStatus({
                key: "reachBottomFetchFail",
                value: !1
            }), this.data.hasNextMap[h] && (wx.showNavigationBarLoading(), l ? b(c.acFetchTabFeedFlow({
                token: g,
                gid: f,
                startID: d,
                needOverride: !1,
                action: k,
                complete: function() {
                    wx.hideNavigationBarLoading(), e.handleChangeCurrentStatus({
                        key: "reachBottomFetchFail",
                        value: !0
                    });
                }
            })) : b(c.acFetchFeedFlow({
                token: g,
                gid: f,
                startID: d,
                needOverride: !1,
                complete: function() {
                    wx.hideNavigationBarLoading(), e.handleChangeCurrentStatus({
                        key: "reachBottomFetchFail",
                        value: !0
                    });
                }
            }))));
        },
        handleUnfoldDesc: function() {
            var a = this.data.isDescBoxFold;
            this.setData({
                isDescBoxFold: !a
            });
        },
        onGroupManageEntryTap: function() {
            var b = this.data.gid;
            this.data.isInGroup ? wx.navigateTo({
                url: "../../me/groupManagePage/groupManagePage?gid=" + b
            }) : a.xu.showToast("请先关注该相册");
        },
        onAlbumEntryTap: function() {
            var b = this.data.gid, c = this;
            this.albumEntryClickable && (this.albumEntryClickable = !1, this.data.isInGroup ? wx.navigateTo({
                url: "../albumPage/albumPage?gid=" + b,
                success: function() {
                    c.albumEntryClickable = !0;
                }
            }) : a.xu.showToast("请先关注该相册"));
        },
        handleNavToFullFnPostPage: function() {
            var a = this.data.groupInfo;
            this.handleHideGuideCard(), 10 !== a.type && wx.navigateTo({
                url: "../../post/postIndexProPage/postIndexProPage?gid=" + a.id
            });
        },
        handlePostBtnTap: function() {
            var a = this.data.groupInfo, b = 10 === a.type, c = a.isInGroup;
            return this.handleHideGuideCard(), c ? void (b ? wx.navigateTo({
                url: "../../me/myOwnAlbumPage/myOwnAlbumPage?gid=" + a.id
            }) : this.setData({
                actionSheet: {
                    type: 2,
                    tip: n.COMMON_TIPS,
                    hidden: !1,
                    onCancel: "handleHideAS",
                    buttons: [ {
                        name: "发图片",
                        onTap: "postCommonImgsFn",
                        src: "../../../src/img/feed/xbd_img.png"
                    }, {
                        name: "发动图",
                        onTap: "postGifFn",
                        src: "../../../src/img/feed/xbd_gif.png"
                    }, {
                        name: "发视频",
                        onTap: "postVideoFn",
                        src: "../../../src/img/feed/xbd_video.png"
                    } ]
                }
            })) : void this.handleShowOperatableGrpDescDialog();
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
        postGifFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                count: 1,
                sizeType: [ "original" ],
                success: function(b) {
                    var c = b.tempFilePaths;
                    a.handlePostMoment(c, !0);
                }
            });
        },
        postVideoFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseVideo({
                sourceType: [ "album" ],
                camera: "front",
                success: function(b) {
                    var c = Array(b.tempFilePath);
                    a.handlePostMoment(c, !0, !0);
                }
            });
        },
        handlePostMoment: function(b, c, d) {
            var e = this, f = this.data.groupInfo.isInGroup, g = a.xu.token, h = this.data.gid, i = c ? "uploadLocalImgPRO" : "uploadLocalImg";
            return 0 === b.length ? void a.xu.showToast("发布内容不能为空") : void (!c && (wx.hideLoading(), 
            wx.showLoading({
                title: "提交中",
                mask: !0
            })), this[i]({
                isVideo: d,
                tempPaths: b,
                formData: {
                    token: g,
                    gid: h
                },
                successCB: function(a) {
                    e.postMomentFn(b, a, c);
                }
            }));
        },
        uploadLocalImg: function(a) {
            var b, c = this, d = a.tempPaths, e = a.formData, f = a.successCB, g = a.failureCB, h = [];
            d.forEach(function(j, k) {
                wx.uploadFile({
                    url: l.uploadUrl,
                    filePath: j,
                    name: "file",
                    formData: e,
                    success: function(a) {
                        var b = JSON.parse(a.data).ret;
                        h[k] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1;
                    },
                    fail: function() {
                        h[k] = -1;
                    },
                    complete: function() {
                        i.checkIfArrIsFull(h, d.length) && (b = h.some(function(a) {
                            return -1 === a;
                        }), b ? (wx.hideLoading(), h = [], g && g(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(b) {
                                b.confirm && (wx.showLoading({
                                    title: "提交中",
                                    mask: !0
                                }), c.uploadLocalImg(a));
                            }
                        })) : f && f(h));
                    }
                });
            });
        },
        uploadLocalImgPRO: function(a) {
            var b = this, c = a.isVideo, d = a.tempPaths[0], e = a.tempPaths, f = a.formData, g = a.successCB, h = a.failureCB, i = [], j = wx.uploadFile({
                url: c ? l.uploadVideoUrl : l.uploadUrl,
                filePath: d,
                name: "file",
                formData: f,
                success: function(a) {
                    var b = JSON.parse(a.data).ret;
                    i[0] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1;
                },
                fail: function() {
                    i[0] = -1;
                },
                complete: function() {
                    var c = i.find(function(a) {
                        return -1 === a;
                    });
                    c ? (wx.hideLoading(), i = [], h && h(res), wx.showModal({
                        title: "上传失败",
                        content: "网络原因,上传图片失败,是否重试?",
                        confirmText: "重试",
                        success: function(c) {
                            c.confirm && (wx.showLoading({
                                title: "提交中",
                                mask: !0
                            }), b.uploadLocalImgPRO(a));
                        }
                    })) : g && g(i);
                }
            });
            j && j.onProgressUpdate(function(a) {
                var b = 0 > a.progress - 1 ? 0 : a.progress - 1;
                wx.showLoading({
                    title: "已完成" + b + "%",
                    mask: !0
                });
            });
        },
        postMomentFn: function(c, d, e) {
            var f = this, h = a.xu.token, i = this.data.gid;
            j.createProImageObjArr(c).then(function(a) {
                b(g.postMoment({
                    token: h,
                    gid: i,
                    qids: d,
                    resFeedImageArr: a,
                    success: function(a) {
                        f.setData({
                            newestPostMomID: a && a.id
                        }), f.refreshContent(function() {
                            e && wx.showLoading({
                                title: "已完成100%",
                                mask: !0
                            });
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,发表图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(a) {
                                a.confirm && (wx.showLoading({
                                    title: "提交中",
                                    mask: !0
                                }), f.postMomentFn(c, d));
                            }
                        });
                    }
                }));
            });
        },
        handleJoinGroup: function() {
            var d = a.xu.token, e = this.data.gid;
            return b(c.joinGroup(d, e));
        },
        onJoinGroup: function(d) {
            var e = a.xu.token, f = this.data.gid, g = this.data.groupInfo.desc, h = d ? "active" : "passive";
            switch (h) {
              case "active":
                this.handleShowOperatableGrpDescDialog();
                break;

              case "passive":
                b(c.joinGroup(e, f)).then(this.handleShowGrpDescDialog);
                break;

              default:
            }
        },
        onQuitGroup: function() {
            var d = a.xu.token, e = this.data.gid;
            b(c.quitGroup(d, e));
        },
        openGroupListPage: function() {
            var a = getCurrentPages();
            1 === a.length ? wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage"
            }) : wx.navigateBack();
        },
        onPhotoTap: function(a) {
            var c = this.data.currentAction, e = this.data.isMultiTabGroup, f = this.data.feedListMap[c], g = this.data.gid, h = a.currentTarget.dataset.feedindex, i = a.currentTarget.dataset.photoindex, j = a.currentTarget.dataset.momid, k = a.currentTarget.dataset.src, l = f[h].img_data.map(function(a) {
                return a && a.url;
            }), m = f[h].img_data[i] && !f[h].img_data[i].isPicErr;
            m ? wx.previewImage({
                current: k,
                urls: l
            }) : b(d.imgReload({
                page: "feedFlowPage",
                gid: g,
                momID: j,
                imgIndex: i,
                ac: e ? c : void 0
            }));
        },
        handleImgClick: function(a) {
            var b = a.currentTarget.dataset.src;
            wx.previewImage({
                current: b,
                urls: [ b ]
            });
        },
        onVideoTap: function(a) {
            var c = this.data.currentAction, e = this.data.isMultiTabGroup, f = this.data.feedListMap[c], g = this.data.gid, h = this, i = a.currentTarget.dataset.feedindex, j = a.currentTarget.dataset.photoindex, k = a.currentTarget.dataset.momid, l = a.currentTarget.dataset.src, m = f[i].img_data.map(function(a) {
                return a.url;
            }), n = f[i].img_data[j] && !f[i].img_data[j].isPicErr;
            n ? h.handleOpenVideo(a) : b(d.imgReload({
                page: "feedFlowPage",
                gid: g,
                momID: k,
                imgIndex: j,
                ac: e ? c : void 0
            }));
        },
        onTagTap: function() {
            wx.showModal({
                title: "标签说明",
                content: "开发ing...",
                confirmText: "我知道了",
                showCancel: !1
            });
        },
        onPicErr: function(a) {
            var c, e = this.data.currentAction, f = this.data.isMultiTabGroup, g = this.imgErrCounter, h = this.data.feedListMap[e], i = this.data.gid, j = a.currentTarget.dataset.feedindex, k = a.currentTarget.dataset.photoindex, l = a.currentTarget.dataset.momid;
            g[l] = g[l] || {}, g[l][j] = g[l][j] || 0, g[l][j] += 1, c = g[l][j], console.log("错误图片的坐标: ", j, k), 
            console.log("错的次数", c), 3 > c ? (console.log("重试,错了", c), b(d.imgLoadError({
                page: "feedFlowPage",
                gid: i,
                momID: l,
                imgIndex: k,
                ac: f ? e : void 0
            })), b(d.imgReload({
                page: "feedFlowPage",
                gid: i,
                momID: l,
                imgIndex: k,
                ac: f ? e : void 0
            }))) : (console.log("不重试了, 显示裂图", c), g[l][j] = 0, b(d.imgLoadError({
                page: "feedFlowPage",
                gid: i,
                momID: l,
                imgIndex: k,
                ac: f ? e : void 0
            })), this.imgErrorCount += 1);
        },
        onPicLoad: function() {
            this.imgCorrectCount += 1;
        },
        handleShakeShareIco: function(a) {
            var b = this, c = this.data.shakeController;
            c[a] = !0, this.setData({
                shakeController: c
            }), setTimeout(function() {
                c[a] = !1, b.setData({
                    shakeController: c
                });
            }, 3e3);
        },
        handleFavor: function(e) {
            var f = this, g = this.data.gid, h = this.data.isMultiTabGroup, i = a.xu.token, j = e.currentTarget.dataset.momid, k = e.currentTarget.dataset.feedindex, l = this.data.currentAction, m = this.data.feedListMap[l][k].favor_data.has_favor;
            m ? b(c.unFavorMoment({
                page: "feedFlowPage",
                token: i,
                gid: g,
                momID: j,
                ac: h ? l : void 0,
                success: function() {
                    console.log("取消点赞成功");
                }
            })) : (b(c.favorMoment({
                page: "feedFlowPage",
                token: i,
                gid: g,
                momID: j,
                ac: h ? l : void 0,
                success: function() {
                    console.log("点赞成功"), f.handleShakeShareIco(j);
                }
            })), setTimeout(function() {
                b(d.resetFavorAnimate({
                    page: "feedFlowPage",
                    token: i,
                    gid: g,
                    momID: j,
                    ac: h ? l : void 0
                }));
            }, 2e3));
        },
        handleOperate: function(a) {
            var b = this, c = a.currentTarget.dataset.isfeedowner, d = this.data.isOwner;
            switch (d) {
              case 1:
                b.handleManage(a);
                break;

              default:
                b.handleComplain(a);
            }
        },
        handleManage: function(d) {
            var e = this, f = a.xu.token, g = this.data.gid, h = this.data.currentAction, i = d.currentTarget.dataset.isfeedowner, j = d.currentTarget.dataset.istopped, k = d.currentTarget.dataset.momid, l = this.data.isMultiTabGroup, m = this.data.currentAction, n = l ? m : void 0;
            switch (h) {
              case "new":
                wx.showActionSheet({
                    itemList: [ j ? "取消置顶" : "置顶", "举报", i ? "删除" : "折叠(隐藏)" ],
                    success: function(h) {
                        var l = h.tapIndex;
                        switch (l) {
                          case 0:
                            wx.showModal({
                                title: j ? "取消置顶" : "置顶",
                                content: "确定" + (j ? "取消置顶" : "置顶") + "吗?",
                                success: function(d) {
                                    d.confirm && (j ? b(c.unTopMoment({
                                        token: f,
                                        gid: g,
                                        momID: k,
                                        success: function() {
                                            a.xu.showToast("设置已生效, 请刷新");
                                        }
                                    })) : b(c.topMoment({
                                        token: f,
                                        gid: g,
                                        momID: k,
                                        action: n
                                    })));
                                }
                            });
                            break;

                          case 1:
                            wx.showModal({
                                title: "举报",
                                content: "确定举报吗?",
                                success: function(a) {
                                    a.confirm && e.complainMomentFn(d);
                                }
                            });
                            break;

                          case 2:
                            wx.showModal(i ? {
                                title: "删除",
                                content: "确定删除吗?",
                                success: function(a) {
                                    a.confirm && e.delMomentFn(d);
                                }
                            } : {
                                title: "折叠",
                                content: "确定折叠吗?折叠以后该内容将不会出现在列表里",
                                success: function(a) {
                                    a.confirm && e.foldMomentFn(d);
                                }
                            });
                            break;

                          default:
                        }
                    }
                });
                break;

              default:
                wx.showActionSheet({
                    itemList: [ "举报", i ? "删除" : "折叠(隐藏)" ],
                    success: function(a) {
                        var b = a.tapIndex;
                        switch (b) {
                          case 0:
                            wx.showModal({
                                title: "举报",
                                content: "确定举报吗?",
                                success: function(a) {
                                    a.confirm && e.complainMomentFn(d);
                                }
                            });
                            break;

                          case 1:
                            wx.showModal(i ? {
                                title: "删除",
                                content: "确定删除吗?",
                                success: function(a) {
                                    a.confirm && e.delMomentFn(d);
                                }
                            } : {
                                title: "折叠",
                                content: "确定折叠吗?折叠以后该内容将不会出现在列表里",
                                success: function(a) {
                                    a.confirm && e.foldMomentFn(d);
                                }
                            });
                            break;

                          default:
                        }
                    }
                });
            }
        },
        handleComplain: function(a) {
            var b = this, c = a.currentTarget.dataset.isfeedowner;
            wx.showActionSheet({
                itemList: c ? [ "举报", "删除" ] : [ "举报" ],
                success: function(c) {
                    var d = c.tapIndex;
                    switch (d) {
                      case 0:
                        wx.showModal({
                            title: "举报",
                            content: "确定举报吗?",
                            success: function(c) {
                                c.confirm && b.complainMomentFn(a);
                            }
                        });
                        break;

                      case 1:
                        wx.showModal({
                            title: "删除",
                            content: "确定删除吗?",
                            success: function(c) {
                                c.confirm && b.delMomentFn(a);
                            }
                        });
                        break;

                      default:
                    }
                }
            });
        },
        complainMomentFn: function(d) {
            var e = this, f = this.data.groupInfo.id, g = a.xu.token, h = d.currentTarget.dataset.momid;
            b(c.complainMoment({
                token: g,
                gid: f,
                momID: h,
                success: function() {
                    wx.showToast({
                        title: "举报成功",
                        duration: 1e3
                    });
                },
                fail: function(a) {
                    wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        },
        delMomentFn: function(d) {
            var e = this, f = this.data.groupInfo.id, g = a.xu.token, h = d.currentTarget.dataset.momid, i = this.data.isMultiTabGroup, j = this.data.currentAction, k = i ? j : void 0;
            wx.showLoading({
                title: "删除中",
                mask: !0
            }), b(c.delMoment({
                token: g,
                gid: f,
                momID: h,
                action: k
            })).then(function() {
                wx.showToast({
                    title: "删除成功",
                    duration: 1e3
                });
            }).catch(function(a) {
                wx.hideLoading(), e.handleRequestErr(a);
            });
        },
        foldMomentFn: function(d) {
            var e = this, f = this.data.groupInfo.id, g = a.xu.token, h = d.currentTarget.dataset.momid, i = this.data.isMultiTabGroup, j = this.data.currentAction, k = i ? j : void 0;
            wx.showLoading({
                title: "折叠中",
                mask: !0
            }), b(c.foldMoment({
                token: g,
                gid: f,
                momID: h,
                action: k
            })).then(function() {
                wx.showToast({
                    title: "折叠成功",
                    duration: 1e3
                });
            }).catch(function(a) {
                wx.hideLoading(), e.handleRequestErr(a);
            });
        },
        handleHideGuideCard: function() {
            this.data.neverPostMoment && (this.setData({
                neverPostMoment: !1
            }), j.setStorageSync("xng_mini_app_neverPostMoment", !1));
        },
        handleAddMember: function() {
            var c = this.data.gid;
            return 10001 === c ? void a.xu.showToast("该相册禁止分享") : void wx.login({
                success: function(c) {
                    console.log("loginSuccess-----"), b(d.acWxFetchSession(c.code, function(b) {
                        j.setStorageSync("mini_session", b.mini_session), a.xu.mini_session = j.getStorageSync("mini_session");
                    }));
                }
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
        },
        handleMoreComment: function(a) {
            var b = this.data.gid, c = a.currentTarget.dataset.momid;
            wx.navigateTo({
                url: "../commentPage/commentPage?momID=" + c + "&gid=" + b
            });
        },
        handleInpComment: function(a) {
            var b = this.data.commentLiveMap, c = a.currentTarget.dataset.momid, d = a.currentTarget.dataset.feedindex;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "留下您的神语录吧(140字以内)",
                targetMomID: c,
                commentInp: b[c] || "",
                commentLiveInp: b[c] || ""
            });
        },
        handleInpReply: function(a) {
            var b = this.data.feedListMap[this.data.currentAction], c = a.currentTarget.dataset.momid, d = a.currentTarget.dataset.feedindex, e = a.currentTarget.dataset.commentindex, f = b[d].comments_some[e].user_data, g = this.data.commentLiveMap;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "回复 " + f.nick,
                replyTargetUserData: f,
                targetMomID: c,
                commentInp: g[c] || "",
                commentLiveInp: g[c] || ""
            });
        },
        handleHideKeyboard: function() {
            this.setData({
                isCommentInpShow: !1,
                replyTargetUserData: null
            });
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = this.data.commentLiveMap, d = this.data.targetMomID;
            c[d] = b, this.setData({
                commentLiveInp: b,
                commentLiveMap: c
            });
        },
        handleOpenVideo: function(d) {
            var e = this, f = d.currentTarget.dataset.src, g = d.currentTarget.dataset.momid, h = d.currentTarget.dataset.lid, i = d.currentTarget.dataset.aid, j = d.currentTarget.dataset.momtype, k = this.data.groupInfo.id, l = a.xu.token, n = this.data.currentAction, o = this.data.isMultiTabGroup, p = d.currentTarget.dataset.feedindex, q = d.currentTarget.dataset.photoindex, r = this.data.feedListMap[n][p], s = r.img_data[q], t = s.r_url;
            this.data.videoPlayLock || (b(c.playVideo({
                info: {
                    gid: k,
                    momID: g,
                    src: t,
                    rUrl: t,
                    feedType: j,
                    lid: h,
                    aid: i,
                    hasFavor: r.favor_data.has_favor,
                    originPage: "personalProfilePage",
                    ac: o ? n : void 0,
                    shareInfo: {
                        path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + k + (g ? "&itemID=" + g : ""),
                        img: s.url,
                        desc: r.share_desc || r.txt || (a.xu.userInfo.nickName || "") + m.FEED_SHARE_WORD_BODY + "视频" + m.FEED_SHARE_WORD_TAIL
                    }
                }
            })), this.setData({
                videoPlayLock: !0
            }), wx.navigateTo({
                url: "../../common/videoPlayProPage/videoPlayProPage?src=" + encodeURIComponent(f),
                complete: function() {
                    e.setData({
                        videoPlayLock: !1
                    });
                }
            }));
        },
        handleFlexStoryText: function(a) {
            var b = a.currentTarget.dataset.itemid, c = this.data.flexStoryIdArray;
            c[b] = !c[b], this.setData({
                flexStoryIdArray: c
            });
        },
        submitComment: function() {
            var d = this, e = a.xu.token, f = new Date().getTime(), g = this.data.gid, h = this.data.targetMomID, i = this.data.replyTargetUserData, j = this.data.commentLiveInp, k = this.data.userInfo, l = this.data.currentAction, m = this.data.commentLiveMap, n = this.data.isMultiTabGroup;
            return j ? void (this.handleHideKeyboard(), m[h] = "", this.setData({
                commentLiveMap: m
            }), b(c.submitComment({
                token: e,
                gid: g,
                momID: h,
                comment: j,
                ac: n ? l : void 0,
                targetMID: i && i.mid,
                fakeID: f,
                contentObj: {
                    txt: j,
                    user_data: k,
                    to_user_data: i,
                    fakeID: f
                },
                success: function() {
                    d.handleShakeShareIco(h);
                }
            }))) : void a.xu.showToast("输入内容不能为空");
        },
        delCommentFn: function(d) {
            var e = this, f = this.data.gid, g = this.data.isMultiTabGroup, h = a.xu.token, i = d.currentTarget.dataset.momid, j = this.data.currentAction, k = d.currentTarget.dataset.commentid, l = d.currentTarget.dataset.fakecommentid;
            b(c.delComment({
                token: h,
                gid: f,
                momID: i,
                ac: g ? j : void 0,
                commentID: k,
                fakeCommentID: l
            }));
        },
        deleteComment: function(a) {
            var b = this;
            wx.showActionSheet({
                itemList: [ "删除评论" ],
                success: function(c) {
                    switch (c.tapIndex) {
                      case 0:
                        wx.showModal({
                            title: "删除",
                            content: "确定删除评论吗?",
                            success: function(c) {
                                c.confirm && b.delCommentFn(a);
                            }
                        });
                        break;

                      default:
                    }
                }
            });
        },
        emptyFn: function() {},
        refreshContent: function(b) {
            var c = a.xu.token, d = this.data.gid, e = this.data.isMultiTabGroup, f = this.data.isActivityGroup;
            f ? (this.setData({
                currentAction: "my"
            }), this.onPullDownRefresh()) : e && (this.setData({
                currentAction: "new"
            }), this.onPullDownRefresh()), b && b(), wx.pageScrollTo ? setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: 0
                }), wx.showLoading({
                    mask: !1
                }), wx.hideLoading();
            }, 500) : wx.hideLoading();
        },
        handleCopyWord: function(b) {
            this;
            return new k(function(c, d) {
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
                    signalCard: h({}, b.data.signalCard, {
                        hidden: !0
                    })
                }), a.xu.showToast("复制成功! 快去小年糕公众号收集卡片吧!");
            }).catch(function() {
                b.setData({
                    signalCard: h({}, b.data.signalCard, {
                        hidden: !0
                    })
                }), a.xu.showToast("复制失败! 请稍后重试");
            });
        }
    });
})();