(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/userGroup.js"), f = require("../../../actions/recommend.js"), g = require("../../../actions/postMoment.js"), h = require("../../../actions/me.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../const/common.js");
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "handleNavBack",
                midText: "推荐",
                onMidTap: "onNavMidTap",
                rightText: "发现",
                onRightTap: "handleNavToRecommendGrpList"
            },
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            list: [],
            desc: "",
            userInfo: {},
            commentInp: "",
            commentLiveInp: "",
            commentLiveMap: {},
            hasPrev: !1,
            reachBottomFetchFail: !1,
            windowWidth: a.sysInfo.windowWidth,
            videoPlayLock: !1
        },
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = this, d = b.wx.user, e = b.recommend.recommendData.hasNext, f = b.recommend.recommendData.desc, g = b.me.interaction.unreadCount, h = b.recommend.recommendData.list.map(function(b) {
                var c = j.getBeforeTime(b.ct), d = j.getBeforeTime(b.rt), e = j.getBeforeTime(b.itime), f = b.img_data || [], g = f.map(function(b) {
                    if (b) {
                        var c = b.w / (a.sysInfo.windowWidth - 40), d = b.h / (.8 * a.sysInfo.windowHeight), e = b.w / b.h;
                        return i({}, b, {
                            widthRate: c,
                            heightRate: d,
                            w_h_Rate: e,
                            height: c > d ? (a.sysInfo.windowWidth - 40) / e : .8 * a.sysInfo.windowHeight,
                            width: c < d ? .8 * a.sysInfo.windowHeight * e : a.sysInfo.windowWidth - 40
                        });
                    }
                }), h = b.ginfo || {};
                return h.name && 9 < h.name.length && (h.name = h.name.substr(0, 8) + "..."), i({}, b, {
                    selectedTime: d,
                    postTime: c,
                    recentMsgTime: e,
                    img_data: g,
                    ginfo: h
                });
            });
            this.setData({
                hasNext: e,
                list: h,
                desc: f,
                userInfo: d,
                navBar: i({}, c.data.navBar, {
                    leftNum: g
                }),
                imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 3 - 1 : 60,
                imageHalfWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 2 - 1 : 60,
                imageFullWidth: a.sysInfo.windowWidth ? a.sysInfo.windowWidth - 40 : 200,
                imageMaxHeight: .8 * a.sysInfo.windowHeight
            });
        },
        onLoad: function(c) {
            a.xu.mta.Page.init();
            var e = this;
            k.setChannelData(c), k.getUserAuthorize(a, b, d, e.handleFetchMainData.bind(e, c));
        },
        handleFetchMainData: function(c) {
            var e = a.xu.token, g = this;
            console.log("ttookkeenn", e);
            var j = c.chid || 1, k = c.itemID, l = c.groupID;
            console.log("option, hrefID, chid:::", c, k, j);
            var m = a.sysInfo.SDKVersion && 124 <= 1 * a.sysInfo.SDKVersion.replace(/\./g, "");
            g.setData({
                chid: j,
                hrefID: k,
                shouldShowFeedShareBtn: m
            }), k && g.setData({
                hasPrev: !0
            }), b(f.fetchRecommendList({
                token: a.xu.token,
                startNum: k || 0,
                cid: k,
                gid: l,
                chid: j,
                limit: 5,
                contain_start: k ? 1 : 0,
                success: function() {
                    console.log("onload里拉取第一页成功"), 1 === getCurrentPages().length && (g.setData({
                        navBar: i({}, g.data.navBar, {})
                    }), b(d.getUserGroupsList(e, function(a) {
                        var b = a.list.length;
                        1 < b || g.setData({
                            navBar: i({}, g.data.navBar, {})
                        });
                    })), b(h.getNewmsgCount({
                        token: e,
                        success: function(a) {
                            var b = 99 < a.total ? "99+" : a.total;
                            b && g.setData({
                                navBar: i({}, g.data.navBar, {})
                            });
                        }
                    }))), b(d.getPublicGroupsList({
                        token: e
                    }));
                },
                fail: function(b) {
                    a.xu.showToast(b);
                },
                needOverride: !0
            }));
        },
        onReady: function() {
            this;
        },
        testFn: function() {
            wx.navigateTo({
                url: "../recommendFeedFlowPage/recommendFeedFlowPage?chid=1&itemID=192"
            });
        },
        onShow: function() {
            b(d.resetGroupMember()), this.mapStateToData(a.store.getState());
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, l = this, m = this.data.chid, o = a.xu.token;
            if (d[0] && "button" === d[0].from) {
                switch (console.log(d[0].target), i = d[0].target.dataset.sharesrc, j = d[0].target.dataset.sharedesc, 
                f = d[0].target.dataset.itemid, g = d[0].target.dataset.gid, h = d[0].target.dataset.momid, 
                d[0].target.dataset.sharesrctype) {
                  case "video":
                    e = "视频";
                    break;

                  case "gif":
                    e = "动态图";
                    break;

                  default:
                    e = "图片";
                }
                k = d[0].target.dataset.gid;
            }
            return console.log("分享链接为", "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=" + m + (h ? "&itemID=" + h : "") + (g ? "&groupID=" + g : "")), 
            h && b(c.shareMoment({
                token: o,
                gid: k,
                momID: h
            })), {
                title: e ? j || (a.xu.userInfo.nickName || "") + n.FEED_SHARE_WORD_BODY + e + n.FEED_SHARE_WORD_TAIL : "我发现了好玩的群相册",
                path: "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=" + m + (h ? "&itemID=" + h : "") + (g ? "&groupID=" + g : ""),
                imageUrl: i,
                success: function(a) {
                    console.log("转发成功的结果", a);
                }
            };
        },
        onReachBottom: function() {
            var c = this, d = c.data.list, e = c.data.hasNext, g = c.data.chid;
            d[d.length - 1] && (this.setData({
                reachBottomFetchFail: !1
            }), e && b(f.fetchRecommendList({
                token: a.xu.token,
                startNum: d[d.length - 1].sort_num,
                chid: g,
                success: function() {
                    console.log("拉取下一页成功"), c.setData({
                        reachBottomFetchFail: !0
                    });
                },
                fail: function() {
                    c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            })));
        },
        onPullDownRefresh: function() {
            var c = this, d = this.data.chid || 1, e = this.data.hasPrev && !1, g = this.data.hrefID, h = this.data.list;
            b(f.fetchRecommendList({
                token: a.xu.token,
                startNum: 0,
                chid: d,
                limit: 5,
                success: function() {
                    console.log("下拉拉取第一页成功"), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), 
                    wx.hideLoading && wx.hideLoading();
                },
                fail: function(b) {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading(), 
                    a.xu.showToast(b);
                }
            }));
        },
        onNavMidTap: function() {
            wx.pageScrollTo && wx.pageScrollTo({
                scrollTop: 0
            }), this.onPullDownRefresh();
        },
        onPhotoTap: function(a) {
            var b = a.currentTarget.dataset.src, c = a.currentTarget.dataset.feedindex, d = this.data.list[c].img_data, e = d.map(function(a) {
                return a.url;
            });
            wx.previewImage({
                current: b,
                urls: e
            });
        },
        onVideoTap: function(d) {
            var e = d.currentTarget.dataset.src, f = this, g = d.currentTarget.dataset.gid, h = a.xu.token, i = d.currentTarget.dataset.momid, j = d.currentTarget.dataset.lid, k = d.currentTarget.dataset.aid, l = d.currentTarget.dataset.momtype, m = d.currentTarget.dataset.feedindex, o = d.currentTarget.dataset.photoindex, p = this.data.list[m], q = p.img_data[o], r = q.r_url;
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
                    originPage: "personalProfilePage",
                    shareInfo: {
                        path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + g + (i ? "&itemID=" + i : ""),
                        img: q.url,
                        desc: p.share_desc || (a.xu.userInfo.nickName || "") + n.FEED_SHARE_WORD_BODY + "视频" + n.FEED_SHARE_WORD_TAIL
                    }
                }
            })), this.setData({
                videoPlayLock: !0
            }), wx.navigateTo({
                url: "../../common/videoPlayPage/videoPlayPage?src=" + encodeURIComponent(e),
                complete: function() {
                    f.setData({
                        videoPlayLock: !1
                    });
                }
            }));
        },
        onPicErr: function(a) {
            var b = a.currentTarget.dataset.feedindex, c = a.currentTarget.dataset.photoindex, d = this.data.list.concat();
            d[b].img_data[c] && (d[b].img_data[c].small_url = "../../../src/image/image_error.png"), 
            this.setData({
                list: d
            });
        },
        onPostBtnTap: function() {
            this;
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
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        onInteractionEntryTap: function() {
            b(e.clearInteractionIco()), wx.navigateTo({
                url: "../../me/interactionPage/interactionPage"
            });
        },
        postCommonImgsFn: function() {
            this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                sizeType: [ "compressed" ],
                success: function(a) {
                    var c = a.tempFilePaths;
                    b(g.getChooseImgs({
                        tempFilePaths: c
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postGifFn: function() {
            this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                count: 1,
                sizeType: [ "original" ],
                success: function(a) {
                    var c = a.tempFilePaths;
                    b(g.getChooseImgs({
                        tempFilePaths: c,
                        needShowPercent: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postVideoFn: function() {
            this;
            this.handleHideAS(), wx.chooseVideo({
                sourceType: [ "album" ],
                camera: "front",
                success: function(a) {
                    var c = [];
                    c.push(a.tempFilePath), console.log(c), b(g.getChooseImgs({
                        tempFilePaths: c,
                        needShowPercent: !0,
                        isVideo: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
        },
        handleFavor: function(e) {
            var f = this, g = a.xu.token, h = e.currentTarget.dataset.gid, i = e.currentTarget.dataset.momid, j = e.currentTarget.dataset.feedindex, k = f.data.list[j].favor_data.has_favor;
            k ? b(c.unFavorMoment({
                token: g,
                gid: h,
                momID: i,
                success: function() {
                    console.log("取消点赞成功");
                }
            })) : (b(c.favorMoment({
                token: g,
                gid: h,
                momID: i,
                success: function() {
                    console.log("点赞成功");
                }
            })), setTimeout(function() {
                b(d.resetFavorAnimate({
                    token: g,
                    gid: h,
                    momID: i
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
        handleMoreComment: function(a) {
            var b = a.currentTarget.dataset.momid, c = a.currentTarget.dataset.gid, d = a.currentTarget.dataset.feedindex, e = this.data.userInfo.mid;
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
            var b = this.data.list, c = a.currentTarget.dataset.momid, d = a.currentTarget.dataset.gid, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.commentindex, g = b[e].comments_some[f].user_data, h = this.data.commentLiveMap;
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
            var b = a.detail.value.trim(), c = this, d = i({}, this.data.commentLiveMap);
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
        handleNavToRecommendGrpList: function() {
            wx.navigateTo({
                url: "../../moments/publicGroupListPage/publicGroupListPage?chid=1"
            });
        },
        handleFeedListPage: function(a) {
            var b = a.currentTarget.dataset.origingid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + b
            });
        },
        submitComment: function() {
            var d = this, e = this.data.targetMomGid, f = this.data.targetMomID, g = this.data.commentLiveInp, h = this.data.replyTargetUserData, j = a.xu.token, k = this.data.userInfo, l = new Date().getTime(), m = this.data.mid, n = this.data.targetMomIndex;
            if (!g) return void a.xu.showToast("输入内容不能为空");
            this.setData({
                isCommentInpShow: !1
            }), d.handleHideKeyboard();
            var o = i({}, d.data.commentLiveMap);
            o[f] = "", d.setData({
                commentLiveMap: o
            }), b(c.submitComment({
                token: j,
                gid: e,
                momID: f,
                comment: g,
                targetMID: h && h.mid,
                fakeID: l,
                contentObj: {
                    txt: g,
                    user_data: k,
                    to_user_data: h,
                    fakeID: l
                }
            }));
        },
        delCommentFn: function(d) {
            var e = this, f = d.currentTarget.dataset.gid, g = a.xu.token, h = d.currentTarget.dataset.momid, i = d.currentTarget.dataset.commentid, j = d.currentTarget.dataset.fakecommentid;
            b(c.delComment({
                token: g,
                gid: f,
                momID: h,
                commentID: i,
                fakeCommentID: j
            }));
        },
        deleteComment: function(a) {
            var b = this;
            wx.showActionSheet({
                itemList: [ "删除评论" ],
                success: function(c) {
                    var d = c.tapIndex;
                    0 === d ? wx.showModal({
                        title: "删除",
                        content: "确定删除评论吗?",
                        success: function(c) {
                            c.confirm ? (console.log("用户点击确定"), b.delCommentFn(a)) : c.cancel && console.log("用户点击取消");
                        }
                    }) : void 0;
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
        handleNavToFullFnPostPage: function() {
            wx.navigateTo({
                url: "../../post/postIndexProPage/postIndexProPage"
            });
        }
    });
})();