(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/postMoment.js"), g = require("../../../xng_modules/object-assign/index.js"), h = require("../../../common/utils.js"), i = require("../../../common/wxUtils.js"), j = require("../../../xng_modules/array-find-index/index.js"), k = require("../../../config/config.js"), l = require("../../../const/common.js");
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "handleNavBack"
            },
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            list: [],
            userInfo: {},
            showOpenData: !0,
            shouldBackUpWordShow: !1,
            commentInp: "",
            commentLiveInp: "",
            commentLiveMap: {},
            reachBottomFetchFail: !1,
            windowWidth: a.sysInfo.windowWidth,
            videoPlayLock: !1,
            isFirstPage: !1,
            shakeController: {}
        },
        tplMsgFormSubmit: h.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = b.wx.user, d = b.me.interaction.hasNext, e = b.me.interaction.list.map(function(b) {
                var c = h.getBeforeTime(b.ct), d = h.getBeforeTime(b.itime), e = b.img_data || [], f = e.map(function(b) {
                    if (b) {
                        var c = b.w / (a.sysInfo.windowWidth - 40), d = b.h / (.8 * a.sysInfo.windowHeight), e = b.w / b.h;
                        return g({}, b, {
                            widthRate: c,
                            heightRate: d,
                            w_h_Rate: e,
                            height: c > d ? (a.sysInfo.windowWidth - 40) / e : .8 * a.sysInfo.windowHeight,
                            width: c < d ? .8 * a.sysInfo.windowHeight * e : a.sysInfo.windowWidth - 40
                        });
                    }
                }), i = b.ginfo;
                return i.name && 9 < i.name.length && (i.name = i.name.substr(0, 10) + "..."), g({}, b, {
                    postTime: c,
                    recentMsgTime: d,
                    img_data: f,
                    ginfo: i
                });
            });
            this.setData({
                hasNext: d,
                list: e,
                userInfo: c,
                imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 3 - 1 : 60,
                imageHalfWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 2 - 1 : 60,
                imageFullWidth: a.sysInfo.windowWidth ? a.sysInfo.windowWidth - 40 : 200,
                imageMaxHeight: .8 * a.sysInfo.windowHeight
            });
        },
        onLoad: function(c) {
            var e = this, f = c.cid || null, g = c.gid || null;
            this.setData({
                hrefID: f,
                hrefGID: g
            }), a.xu.mta.Page.init(), wx.setNavigationBarTitle({
                title: "互动消息"
            }), wx.hideShareMenu(), i.setChannelData(c), i.getUserAuthorize(a, b, d, e.handleFetchMainData);
        },
        handleFetchMainData: function() {
            var c = this, d = a.xu.token, f = this.data.hrefID, h = this.data.hrefGID, i = a.sysInfo.SDKVersion && 124 <= 1 * a.sysInfo.SDKVersion.replace(/\./g, "");
            this.setData({
                shouldShowFeedShareBtn: i
            }), 1 === getCurrentPages().length && this.setData({
                isFirstPage: !0,
                navBar: g({}, c.data.navBar, {
                    faBackBtn: "newspaper-o",
                    littleTag: l.BACK_BTN_TEXT
                })
            }), b(e.fetchInteractionList({
                token: a.xu.token,
                start: 0,
                cid: f,
                gid: h,
                success: function() {},
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    c.setData({
                        hasLoad: !0
                    });
                }
            }));
        },
        onReady: function() {
            var a = this;
            setTimeout(function() {
                a.setData({
                    shouldBackUpWordShow: !0
                });
            }, 2e3);
        },
        onShow: function() {
            b(d.resetGroupMember()), this.mapStateToData(a.store.getState());
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, m = this, n = a.xu.token;
            if (d[0] && "button" === d[0].from) {
                switch (g = d[0].target.dataset.sharesrc, h = d[0].target.dataset.sharedesc, f = d[0].target.dataset.momid, 
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
                i = d[0].target.dataset.gid, j = 1e4 === i;
            }
            return k = j ? "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=1" + (f ? "&itemID=" + f : "") + (i ? "&groupID=" + i : "") : "/pages/moments/feedFlowPage/feedFlowPage?gid=" + i + (f ? "&itemID=" + f : ""), 
            f && b(c.shareMoment({
                token: n,
                gid: i,
                momID: f
            })), {
                title: h || (a.xu.userInfo.nickName || "") + l.FEED_SHARE_WORD_BODY + e + l.FEED_SHARE_WORD_TAIL,
                path: k,
                imageUrl: g,
                success: function() {}
            };
        },
        onReachBottom: function() {},
        onPullDownRefresh: function() {
            var c = this;
            c.setData({
                shouldBackUpWordShow: !1
            }), b(e.fetchInteractionList({
                token: a.xu.token,
                start: 0,
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
                    c.setData({
                        hasLoad: !0
                    }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading();
                }
            }));
        },
        onPhotoTap: function(a) {
            var c = a.currentTarget.dataset.src, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = this.data.list[e].img_data, h = a.currentTarget.dataset.momid, i = a.currentTarget.dataset.gid, j = g.map(function(a) {
                return a.url;
            }), k = g[f].isPicErr;
            k ? b(d.imgReload({
                page: "interactionPage",
                gid: i,
                momID: h,
                imgIndex: f
            })) : wx.previewImage({
                current: c,
                urls: j
            });
        },
        onVideoTap: function(a) {
            var c = this, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = a.currentTarget.dataset.momid, h = this.data.list[e].img_data, i = this.data.gid, j = h[f].isPicErr;
            j ? b(d.imgReload({
                page: "interactionPage",
                gid: i,
                momID: g,
                imgIndex: f
            })) : c.handleOpenVideo(a);
        },
        handleOpenVideo: function(d) {
            var e = d.currentTarget.dataset.src, f = this, g = d.currentTarget.dataset.gid, h = a.xu.token, i = d.currentTarget.dataset.momid, j = d.currentTarget.dataset.lid, k = d.currentTarget.dataset.aid, m = d.currentTarget.dataset.momtype, n = d.currentTarget.dataset.feedindex, o = d.currentTarget.dataset.photoindex, p = this.data.list[n], q = p.img_data[o], r = q.r_url;
            this.data.videoPlayLock || (b(c.playVideo({
                info: {
                    gid: g,
                    momID: i,
                    src: r,
                    rUrl: r,
                    feedType: m,
                    lid: j,
                    aid: k,
                    hasFavor: p.favor_data.has_favor,
                    originPage: "interactionPage",
                    shareInfo: {
                        path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + g + (i ? "&itemID=" + i : ""),
                        img: q.url,
                        desc: p.share_desc || p.txt || (a.xu.userInfo.nickName || "") + l.FEED_SHARE_WORD_BODY + "视频" + l.FEED_SHARE_WORD_TAIL
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
                page: "interactionPage",
                gid: g,
                momID: f,
                imgIndex: e
            }));
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
            var f = this, g = a.xu.token, h = e.currentTarget.dataset.gid, i = e.currentTarget.dataset.momid, j = e.currentTarget.dataset.feedindex;
            console.log(f.data.list, j);
            var k = f.data.list[j].favor_data.has_favor;
            k ? b(c.unFavorMoment({
                page: "interactionPage",
                token: g,
                gid: h,
                momID: i,
                success: function() {
                    console.log("取消点赞成功");
                }
            })) : (b(c.favorMoment({
                page: "interactionPage",
                token: g,
                gid: h,
                momID: i,
                success: function() {
                    console.log("点赞成功"), f.handleShakeShareIco(i);
                }
            })), setTimeout(function() {
                b(d.resetFavorAnimate({
                    page: "interactionPage",
                    token: g,
                    gid: h,
                    momID: i
                }));
            }, 2e3));
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
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
            var b = this.data.list, c = this.data.commentLiveMap, d = a.currentTarget.dataset.momid, e = a.currentTarget.dataset.gid, f = a.currentTarget.dataset.feedindex, g = a.currentTarget.dataset.commentindex, h = b[f].comments_some[g].user_data;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "回复 " + h.nick,
                replyTargetUserData: h,
                targetMomID: d,
                targetMomIndex: f,
                targetMomGid: e,
                commentInp: c[d] || "",
                commentLiveInp: c[d] || ""
            });
        },
        handleHideKeyboard: function() {
            this.setData({
                isCommentInpShow: !1,
                replyTargetUserData: null
            });
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = g({}, this.data.commentLiveMap);
            c[this.data.targetMomID] = b, this.setData({
                commentLiveMap: c,
                commentLiveInp: b
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            1 === a.length ? wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage"
            }) : wx.navigateBack();
        },
        handleFeedListPage: function(a) {
            var b = a.currentTarget.dataset.origingid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + b
            });
        },
        submitComment: function() {
            var d = this, e = this.data.targetMomGid, f = this.data.targetMomID, h = this.data.commentLiveInp, i = this.data.replyTargetUserData, j = a.xu.token, k = this.data.userInfo, l = new Date().getTime(), m = g({}, d.data.commentLiveMap);
            return h ? void (this.setData({
                isCommentInpShow: !1
            }), d.handleHideKeyboard(), m[f] = "", d.setData({
                commentLiveMap: m
            }), b(c.submitComment({
                token: j,
                gid: e,
                momID: f,
                comment: h,
                targetMID: i && i.mid,
                fakeID: l,
                contentObj: {
                    txt: h,
                    user_data: k,
                    to_user_data: i,
                    fakeID: l
                },
                success: function() {
                    d.handleShakeShareIco(f);
                }
            }))) : void a.xu.showToast("输入内容不能为空");
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
                    switch (d) {
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
        handleOperate: function(a) {
            var b = this;
            wx.showActionSheet({
                itemList: [ "举报" ],
                success: function() {
                    wx.showModal({
                        title: "举报",
                        content: "确定举报吗?",
                        success: function(c) {
                            c.confirm && b.complainMomentFn(a);
                        }
                    });
                }
            });
        },
        complainMomentFn: function(d) {
            var e = this, f = d.currentTarget.dataset.gid, g = a.xu.token, h = d.currentTarget.dataset.momid;
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
                    wx.hideLoading && wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        }
    });
})();