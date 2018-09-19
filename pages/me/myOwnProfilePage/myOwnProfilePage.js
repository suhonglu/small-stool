(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/othersInfo.js"), g = require("../../../actions/postMoment.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../common/utils.js"), j = require("../../../common/wxUtils.js"), k = require("../../../xng_modules/array-find-index/index.js"), l = require("../../../config/config.js"), m = require("../../../const/common.js");
    Page({
        data: {
            navBar: {
                leftBtn: {
                    text: "关注我们"
                },
                onLeftTap: "handleFocusUs",
                midText: "",
                rightText: "联系客服",
                onRightTap: "handleContactUs",
                rightBtnHasContactFn: !1
            },
            dialog: {
                hidden: !0
            },
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            enterStatus: "",
            list: [],
            userInfo: {},
            showOpenData: !0,
            shouldBackUpWordShow: !1,
            nextStartID: 0,
            hasNext: !0,
            reachBottomFetchFail: !1
        },
        tplMsgFormSubmit: i.tplMsgFormSubmit,
        mapStateToData: function(a) {
            var b = a.wx.user || {}, c = a.wx.enterStatus, d = b.mid, e = b.nick, f = b.hurl, g = {
                navGroup: [ {
                    navPath: "/pages/me/userFocusListPage/userFocusListPage?mid=" + b.mid + "&belonggid=10000",
                    name: "关注",
                    num: b.followCount
                }, {
                    navPath: "/pages/me/userFansListPage/userFansListPage?mid=" + b.mid + "&belonggid=10000",
                    name: "粉丝",
                    num: b.fansCount
                } ]
            }, i = a.me.ownMomentList.hasNext, j = a.me.ownMomentList.kf, k = a.me.ownMomentList.list;
            this.setData({
                userInfo: b,
                mid: d,
                nick: e,
                hurl: f,
                hasNext: i,
                list: k,
                nextStartID: k[k.length - 1] ? k[k.length - 1].id : 0,
                navBar: h({}, this.data.navBar, {
                    midText: "",
                    rightText: "联系客服",
                    onRightTap: j ? "" : "handleContactUs",
                    rightBtnHasContactFn: !!j
                }),
                socialBar: g
            });
        },
        onLoad: function(c) {
            var e = this, f = this.data.nextStartID;
            a.xu.mta.Page.init(), j.setChannelData(c), wx.setNavigationBarTitle({
                title: "个人中心"
            }), j.getUserAuthorize(a, b, d, e.handleFetchMainData);
        },
        handleFetchMainData: function() {
            var c = this, d = a.sysInfo.SDKVersion && 124 <= 1 * a.sysInfo.SDKVersion.replace(/\./g, "");
            this.setData({
                shouldShowFeedShareBtn: d
            }), b(e.fetchMyMomentList({
                token: a.xu.token,
                nextStartID: 0,
                limit: 15,
                success: function() {
                    console.log("拉取第一页成功");
                },
                fail: function(b) {
                    a.xu.showToast(b);
                }
            }));
        },
        onReady: function() {
            this;
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, l, n = this, o = this.data.gid, p = a.xu.token, q = this.data.mid, r = this.data.nick;
            if (console.log(d[0]), d[0] && "button" === d[0].from && "forPageShare" !== d[0].target.dataset.duty) {
                switch (i = d[0].target.dataset.sharesrc, j = d[0].target.dataset.sharedesc, f = d[0].target.dataset.itemid, 
                g = d[0].target.dataset.momid, d[0].target.dataset.sharesrctype) {
                  case "video":
                    e = "视频";
                    break;

                  case "gif":
                    e = "动态图";
                    break;

                  default:
                    e = "图片";
                }
                o = d[0].target.dataset.gid, h = 1e4 === o, k = h ? "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=1" + (g ? "&itemID=" + g : "") + (o ? "&groupID=" + o : "") : "/pages/moments/feedFlowPage/feedFlowPage?gid=" + o + (g ? "&itemID=" + g : ""), 
                l = j || (a.xu.userInfo.nickName || "") + m.FEED_SHARE_WORD_BODY + e + m.FEED_SHARE_WORD_TAIL;
            } else k = "pages/me/personalProfilePage/personalProfilePage?mid=" + q + "&gid=10000", 
            l = r + "的主页";
            return g && b(c.shareMoment({
                token: p,
                gid: o,
                momID: g
            })), {
                title: l,
                path: k,
                imageUrl: i,
                success: function() {}
            };
        },
        onReachBottom: function() {
            var c = this, d = c.data.list, f = c.data.hasNext, g = c.data.nextStartID;
            this.setData({
                reachBottomFetchFail: !1
            });
            f && b(e.fetchMyMomentList({
                token: a.xu.token,
                nextStartID: g,
                limit: 20,
                complete: function() {
                    c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            }));
        },
        onPullDownRefresh: function() {
            var c = this, d = c.data.nextStartID;
            c.setData({
                shouldBackUpWordShow: !1
            }), b(e.fetchMyMomentList({
                token: a.xu.token,
                nextStartID: 0,
                limit: 15,
                success: function() {
                    c.setData({
                        showOpenData: !1
                    }), c.setData({
                        showOpenData: !0
                    }), setTimeout(function() {
                        c.setData({
                            shouldBackUpWordShow: !0
                        });
                    }, 1500);
                },
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading();
                }
            }));
        },
        onPhotoTap: function(a) {
            var c = a.currentTarget.dataset.src, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = this.data.list[e].img_data, h = a.currentTarget.dataset.momid, i = a.currentTarget.dataset.gid, j = g.map(function(a) {
                return a.url;
            }), k = g[f].isPicErr;
            k ? b(d.imgReload({
                page: "myOwnProfilePage",
                gid: i,
                momID: h,
                imgIndex: f
            })) : wx.previewImage({
                current: c,
                urls: j
            });
        },
        onVideoTap: function(a) {
            var c = this, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = a.currentTarget.dataset.momid, h = this.data.list[e].img_data, i = this.data.gid, j = a.currentTarget.dataset.src, k = h.map(function(a) {
                return a.url;
            }), l = h[f].isPicErr;
            l ? b(d.imgReload({
                page: "recommendFeedFlowPage",
                gid: i,
                momID: g,
                imgIndex: f
            })) : c.handleOpenVideo(a);
        },
        handleOpenVideo: function(d) {
            var e = d.currentTarget.dataset.src, f = this, g = d.currentTarget.dataset.gid, h = a.xu.token, i = d.currentTarget.dataset.momid, j = d.currentTarget.dataset.lid, k = d.currentTarget.dataset.aid, l = d.currentTarget.dataset.momtype, n = d.currentTarget.dataset.feedindex, o = d.currentTarget.dataset.photoindex, p = this.data.list[n], q = p.img_data[o], r = q.r_url;
            this.data.videoPlayLock || (b(c.playVideo({
                info: {
                    gid: g,
                    momID: i,
                    src: r,
                    rUrl: r,
                    feedType: l,
                    lid: j,
                    aid: k,
                    hasFavor: p.favor_data.has_favor,
                    originPage: "myOwnProfilePage",
                    shareInfo: {
                        path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + g + (i ? "&itemID=" + i : ""),
                        img: q.url,
                        desc: p.share_desc || p.txt || (a.xu.userInfo.nickName || "") + m.FEED_SHARE_WORD_BODY + "视频" + m.FEED_SHARE_WORD_TAIL
                    }
                }
            })), this.setData({
                videoPlayLock: !0
            }), wx.navigateTo({
                url: "../../common/videoPlayProPage/videoPlayProPage?src=" + encodeURIComponent(e),
                complete: function() {
                    f.setData({
                        videoPlayLock: !1
                    });
                }
            }));
        },
        onPicErr: function(a) {
            var c = a.currentTarget.dataset.feedindex, e = a.currentTarget.dataset.photoindex, f = a.currentTarget.dataset.momid, g = a.currentTarget.dataset.gid;
            console.log(c, e), b(d.imgLoadError({
                page: "myOwnProfilePage",
                gid: g,
                momID: f,
                imgIndex: e
            }));
        },
        onModifyEntryTap: function() {
            wx.navigateTo({
                url: "../ownInfoManagePage/ownInfoManagePage"
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
        },
        handleContactUs: function() {
            this.setData({
                dialog: {
                    hidden: !1,
                    title: "交个朋友吧",
                    bodyList: [ "• 微信搜索并关注“小板凳群相册公众号”", "• 点击下方复制按钮，粘贴到搜索框即可", "• 关注后能够更方便的使用小板凳，也可以和我们畅聊人生哦(*^__^*)" ],
                    buttons: [ {
                        name: "复制",
                        operateBtn: !0,
                        onTap: "handleCopyXNGpublicName"
                    }, {
                        name: "取消"
                    } ],
                    handleHide: "handleHideDialog"
                }
            });
        },
        handleFocusUs: function() {
            this.setData({
                dialog: {
                    hidden: !1,
                    title: "关注我们吧",
                    bodyList: [ "1. 点击下方按钮进入客服消息", "2. 回复1,然后点击进入链接", "3. 在文章内关注我们" ],
                    buttons: [ {
                        name: '回复"1", 去关注!',
                        operateBtn: !0,
                        openType: "contact",
                        sessionFrom: "follow"
                    } ],
                    handleHide: "handleHideDialog"
                }
            });
        },
        handleHideDialog: function() {
            this.setData({
                dialog: {
                    hidden: !0
                }
            });
        },
        handleCopyXNGpublicName: function() {
            this.handleCopyWord("小板凳群相册公众号");
        },
        handleCopyWord: function(b) {
            var c = this;
            wx.setClipboardData ? wx.setClipboardData({
                data: b,
                success: function() {
                    a.xu.showToast("复制成功"), c.handleHideDialog();
                }
            }) : a.xu.showLowVersionAlert();
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
            var f = this, g = this.data.mid, h = a.xu.token, i = e.currentTarget.dataset.gid, j = e.currentTarget.dataset.momid, k = e.currentTarget.dataset.feedindex;
            console.log(f.data.list, k);
            var l = f.data.list[k].favor_data.has_favor;
            l ? b(c.unFavorMoment({
                page: "myOwnProfilePage",
                token: h,
                gid: i,
                momID: j,
                mid: g,
                success: function() {
                    console.log("取消点赞成功");
                }
            })) : (b(c.favorMoment({
                page: "myOwnProfilePage",
                token: h,
                gid: i,
                momID: j,
                mid: g,
                success: function() {
                    console.log("点赞成功"), f.handleShakeShareIco(j);
                }
            })), setTimeout(function() {
                b(d.resetFavorAnimate({
                    page: "myOwnProfilePage",
                    token: h,
                    gid: i,
                    momID: j,
                    mid: g
                }));
            }, 2e3));
        },
        handleDelete: function(a) {
            var b = this;
            wx.showActionSheet({
                itemList: [ "删除" ],
                success: function(c) {
                    var d = c.tapIndex;
                    0 === d ? wx.showModal({
                        title: "删除",
                        content: "确定删除吗?",
                        success: function(c) {
                            c.confirm ? (console.log("用户点击确定"), b.delMomentFn(a)) : c.cancel && console.log("用户点击取消");
                        }
                    }) : void 0;
                },
                fail: function(a) {
                    console.log(a.errMsg);
                }
            });
        },
        delMomentFn: function(d) {
            var e = this, f = d.currentTarget.dataset.gid, g = a.xu.token, h = d.currentTarget.dataset.momid;
            wx.showLoading && wx.showLoading({
                title: "删除中",
                mask: !0
            }), b(c.delMoment({
                token: g,
                gid: f,
                momID: h,
                success: function() {
                    wx.showToast({
                        title: "删除成功",
                        duration: 1e3
                    });
                },
                fail: function(a) {
                    wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        },
        handleMoreComment: function(a) {
            var b = a.currentTarget.dataset.momid, c = a.currentTarget.dataset.gid, d = a.currentTarget.dataset.feedindex, e = this.data.mid;
            wx.navigateTo({
                url: "../../moments/commentPage/commentPage?momID=" + b + "&gid=" + c + "&mid=" + e
            });
        },
        handleInpComment: function(a) {
            var b = a.currentTarget.dataset.momid, c = a.currentTarget.dataset.feedindex, d = a.currentTarget.dataset.gid, e = this.data.commentLiveMap;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "留下您的神语录吧(140字以内)",
                targetMomID: b,
                targetMomIndex: c,
                targetMomGid: d,
                commentInp: e[b] || "",
                commentLiveInp: e[b] || ""
            });
        },
        handleInpReply: function(a) {
            var b = this.data.list, c = a.currentTarget.dataset.momid, d = a.currentTarget.dataset.gid, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.commentindex, g = b[e].comments_some[f].user_data;
            console.log(g, b, e, f);
            var h = this.data.commentLiveMap;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "回复 " + g.nick,
                replyTargetUserData: g,
                targetMomID: c,
                targetMomIndex: e,
                targetMomGid: d,
                commentInp: h[c] || "",
                commentLiveInp: h[c] || ""
            });
        },
        handleHideKeyboard: function() {
            this.setData({
                isCommentInpShow: !1,
                replyTargetUserData: null
            });
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = this, d = h({}, this.data.commentLiveMap);
            d[c.data.targetMomID] = b, this.setData({
                commentLiveMap: d,
                commentLiveInp: b
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            if (1 === a.length) {
                var b = wx.reLaunch || wx.redirectTo;
                b({
                    url: "../../me/groupListPage/groupListPage"
                });
            } else wx.navigateBack();
        },
        handleFeedListPage: function(a) {
            var b = a.currentTarget.dataset.origingid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + b
            });
        },
        submitComment: function() {
            var d = this, e = this.data.commentLiveInp, f = this.data.replyTargetUserData, g = a.xu.token, i = this.data.userInfo, j = this.data.targetMomID, k = this.data.mid, l = this.data.targetMomIndex, m = this.data.targetMomGid, n = new Date().getTime();
            if (!e) return void a.xu.showToast("输入内容不能为空");
            this.setData({
                isCommentInpShow: !1
            }), d.handleHideKeyboard();
            var o = h({}, d.data.commentLiveMap);
            o[j] = "", d.setData({
                commentLiveMap: o
            }), b(c.submitComment({
                token: g,
                gid: m,
                momID: j,
                comment: e,
                targetMID: f && f.mid,
                fakeID: n,
                contentObj: {
                    txt: e,
                    user_data: i,
                    to_user_data: f,
                    fakeID: n
                },
                mid: k,
                success: function() {
                    d.handleShakeShareIco(j);
                }
            }));
        },
        delCommentFn: function(d) {
            var e = this, f = d.currentTarget.dataset.gid, g = a.xu.token, h = d.currentTarget.dataset.momid, i = d.currentTarget.dataset.commentid, j = d.currentTarget.dataset.fakecommentid, k = this.data.mid;
            b(c.delComment({
                token: g,
                gid: f,
                momID: h,
                commentID: i,
                mid: k,
                fakeCommentID: j
            }));
        },
        deleteComment: function(a) {
            var b = this;
            wx.showActionSheet({
                itemList: [ "删除评论" ],
                success: function(c) {
                    var d = c.tapIndex;
                    switch (d) {
                      case 0:
                        wx.showModal({
                            title: "删除",
                            content: "确定删除评论吗?",
                            success: function(c) {
                                c.confirm ? (console.log("用户点击确定"), b.delCommentFn(a)) : c.cancel && console.log("用户点击取消");
                            }
                        });
                        break;

                      default:
                    }
                },
                fail: function(a) {
                    console.log(a.errMsg);
                }
            });
        },
        emptyFn: function() {},
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        navToGroupListPage: function() {
            wx.switchTab({
                url: "../../me/groupListPage/groupListPage"
            });
        },
        onFeedItemTap: function(a) {
            var b = a.currentTarget.dataset.feedid;
            wx.navigateTo({
                url: "../myOwnFeedsPage/myOwnFeedsPage" + (b ? "?hrefID=" + b : "")
            });
        }
    });
})();