(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/othersInfo.js"), g = require("../../../actions/postMoment.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../common/utils.js"), j = require("../../../common/wxUtils.js"), k = require("../../../xng_modules/array-find-index/index.js"), l = require("../../../config/config.js"), m = require("../../../const/common.js");
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
            currentUserInfo: {},
            showOpenData: !0,
            shouldBackUpWordShow: !1,
            commentInp: "",
            commentLiveInp: "",
            commentLiveMap: {},
            nextStartTime: -1,
            hasNext: !0,
            reachBottomFetchFail: !1,
            windowWidth: a.sysInfo.windowWidth,
            videoPlayLock: !1,
            shakeController: {}
        },
        tplMsgFormSubmit: i.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = this.data.gid, d = this.data.mid, e = b.wx.user, f = b.entities.feedFlowList && b.entities.feedFlowList[c] && b.entities.feedFlowList[c].groupData || {}, g = b.entities.othersMomentList && b.entities.othersMomentList[d] && b.entities.othersMomentList[d].userInfo || {}, j = b.othersInfo.otherUsersList[d] && b.othersInfo.otherUsersList[d][c] && b.othersInfo.otherUsersList[d][c].hasNext, k = b.entities.othersMomentList && b.entities.othersMomentList[d] && b.entities.othersMomentList[d].feedList && b.entities.othersMomentList[d].feedList[c] || [], l = b.othersInfo.otherUsersList && b.othersInfo.otherUsersList[d] && b.othersInfo.otherUsersList[d][c] && b.othersInfo.otherUsersList[d][c].ids || [], m = {
                navGroup: [ {
                    navPath: "/pages/me/userFocusListPage/userFocusListPage?mid=" + d + "&belonggid=" + c,
                    name: "关注",
                    num: g.followCount
                }, {
                    navPath: "/pages/me/userFansListPage/userFansListPage?mid=" + d + "&belonggid=" + c,
                    name: "粉丝",
                    num: g.fansCount
                } ]
            }, n = l && l.map(function(b) {
                var c = k[b], d = i.getBeforeTime(c.ct), e = c.img_data || [], f = e.map(function(b) {
                    if (b) {
                        var c = b.w / (a.sysInfo.windowWidth - 40), d = b.h / (.8 * a.sysInfo.windowHeight), e = b.w / b.h;
                        return h({}, b, {
                            widthRate: c,
                            heightRate: d,
                            w_h_Rate: e,
                            height: c > d ? (a.sysInfo.windowWidth - 40) / e : .8 * a.sysInfo.windowHeight,
                            width: c < d ? .8 * a.sysInfo.windowHeight * e : a.sysInfo.windowWidth - 40
                        });
                    }
                }), g = 1e5 < c.pv ? "100000+" : c.pv, j = 1e5 < c.uv ? "100000+" : c.uv;
                return h({}, c, {
                    postTime: d,
                    img_data: f,
                    pv: g,
                    uv: j
                });
            });
            this.setData({
                hasNext: j,
                list: n,
                userInfo: e,
                socialBar: m,
                currentUserInfo: g,
                currentGroupInfo: f,
                nextStartTime: n[n.length - 1] ? n[n.length - 1].ct : -1,
                imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 3 - 1 : 60,
                imageHalfWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 1) / 2 - 1 : 60,
                imageFullWidth: a.sysInfo.windowWidth ? a.sysInfo.windowWidth - 40 : 200,
                imageMaxHeight: .8 * a.sysInfo.windowHeight
            });
        },
        onLoad: function(c) {
            var e = this, f = c.gid, g = c.mid, h = a.sysInfo.SDKVersion && 124 <= 1 * a.sysInfo.SDKVersion.replace(/\./g, "");
            this.setData({
                shouldShowFeedShareBtn: h,
                mid: g,
                gid: f,
                isPersonalAllPublicFeeds: "10000" === f
            }), this.needBreak = j.handleDealMaxPageStackBug(m.MAX_PAGE_STACK_COUNT);
            this.needBreak || (a.xu.mta.Page.init(), j.getUserAuthorize(a, b, d, e.onStandBy));
        },
        onStandBy: function() {
            var c = this.data.gid, d = this.data.mid;
            1 === getCurrentPages().length && this.setData({
                isFirstPage: !0,
                navBar: h({}, this.data.navBar, {
                    faBackBtn: "newspaper-o",
                    littleTag: m.BACK_BTN_TEXT
                })
            }), b(f.fetchUserGroupInList({
                token: a.xu.token,
                gid: c,
                mid: d,
                success: function() {
                    console.log("拉取第一页成功");
                },
                fail: function(b) {
                    a.xu.showToast(b);
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
            var b = a.data.currentGroupInfo;
            1 !== b.type && wx.setNavigationBarTitle({
                title: b.name || "小板凳"
            }), b.name && 12 < b.name.length && (b.name = b.name.substr(0, 10) + "...");
        },
        onShow: function() {
            this.needBreak || this.mapStateToData(a.store.getState());
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, l, n = this, o = this.data.gid, p = this.data.mid, q = this.data.isPersonalAllPublicFeeds, r = this.data.currentUserInfo.nick, s = a.xu.token;
            if (d[0] && "button" === d[0].from && "forPageShare" !== d[0].target.dataset.duty) {
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
            } else k = "pages/me/personalProfilePage/personalProfilePage?mid=" + p + "&gid=10000", 
            l = r + "的主页";
            return g && b(c.shareMoment({
                token: s,
                gid: o,
                momID: g,
                mid: p,
                isPersonalAllPublicFeeds: q
            })), {
                title: l,
                path: k,
                imageUrl: i,
                success: function(a) {
                    console.log("转发成功的结果", a);
                }
            };
        },
        onReachBottom: function() {
            var c = this, d = this.data.gid, e = this.data.mid, g = c.data.list, h = c.data.hasNext, i = c.data.nextStartTime;
            this.setData({
                reachBottomFetchFail: !1
            });
            h && b(f.fetchUserGroupInList({
                token: a.xu.token,
                gid: d,
                mid: e,
                start_t: i,
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
            }));
        },
        onPullDownRefresh: function() {
            var c = this, d = this.data.gid, e = this.data.mid;
            c.setData({
                shouldBackUpWordShow: !1
            }), b(f.fetchUserGroupInList({
                token: a.xu.token,
                gid: d,
                mid: e,
                success: function() {
                    console.log("拉取第一页成功"), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), 
                    wx.hideLoading && wx.hideLoading(), c.setData({
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
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading(), 
                    a.xu.showToast(b);
                }
            }));
        },
        onPhotoTap: function(a) {
            var c = a.currentTarget.dataset.src, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = this.data.list[e].img_data, h = a.currentTarget.dataset.momid, i = this.data.gid, j = this.data.mid, k = g.map(function(a) {
                return a.url;
            }), l = g[f].isPicErr;
            l ? b(d.imgReload({
                page: "personalProfilePage",
                mid: j,
                gid: i,
                momID: h,
                imgIndex: f
            })) : wx.previewImage({
                current: c,
                urls: k
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
            var e = d.currentTarget.dataset.src, f = this, g = d.currentTarget.dataset.gid, h = this.data.mid, i = a.xu.token, j = d.currentTarget.dataset.momid, k = d.currentTarget.dataset.lid, l = d.currentTarget.dataset.aid, n = d.currentTarget.dataset.momtype, o = d.currentTarget.dataset.feedindex, p = d.currentTarget.dataset.photoindex, q = this.data.list[o], r = q.img_data[p], s = r.r_url;
            this.data.videoPlayLock || (b(c.playVideo({
                info: {
                    gid: g,
                    momID: j,
                    src: s,
                    rUrl: s,
                    feedType: n,
                    lid: k,
                    aid: l,
                    hasFavor: q.favor_data.has_favor,
                    originPage: "personalProfilePage",
                    fromMid: h,
                    shareInfo: {
                        path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + g + (j ? "&itemID=" + j : ""),
                        img: r.url,
                        desc: q.share_desc || q.txt || (a.xu.userInfo.nickName || "") + m.FEED_SHARE_WORD_BODY + "视频" + m.FEED_SHARE_WORD_TAIL
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
            var c = a.currentTarget.dataset.feedindex, e = a.currentTarget.dataset.photoindex, f = this.data.list[c].img_data, g = a.currentTarget.dataset.momid, h = this.data.gid;
            console.log(c, e);
            var i = this.data.mid;
            b(d.imgLoadError({
                page: "personalProfilePage",
                mid: i,
                gid: h,
                momID: g,
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
            var f = this, g = a.xu.token, h = e.currentTarget.dataset.gid, i = e.currentTarget.dataset.momid, j = this.data.mid, k = this.data.isPersonalAllPublicFeeds, l = e.currentTarget.dataset.feedindex, m = f.data.list[l].favor_data.has_favor;
            m ? b(c.unFavorMoment({
                page: "personalProfilePage",
                token: g,
                gid: h,
                momID: i,
                mid: j,
                isPersonalAllPublicFeeds: k,
                success: function() {
                    console.log("取消点赞成功");
                }
            })) : (b(c.favorMoment({
                page: "personalProfilePage",
                token: g,
                gid: h,
                momID: i,
                mid: j,
                isPersonalAllPublicFeeds: k,
                success: function() {
                    console.log("点赞成功"), f.handleShakeShareIco(i);
                }
            })), setTimeout(function() {
                b(d.resetFavorAnimate({
                    page: "personalProfilePage",
                    token: g,
                    gid: h,
                    momID: i,
                    mid: j,
                    isPersonalAllPublicFeeds: k
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
            var d = this, e = this.data.commentLiveInp, f = this.data.replyTargetUserData, g = a.xu.token, i = this.data.userInfo, j = this.data.targetMomID, k = this.data.targetMomIndex, l = this.data.targetMomGid, m = this.data.mid, n = this.data.isPersonalAllPublicFeeds, o = new Date().getTime();
            if (!e) return void a.xu.showToast("输入内容不能为空");
            this.setData({
                isCommentInpShow: !1
            }), d.handleHideKeyboard();
            var p = h({}, d.data.commentLiveMap);
            p[j] = "", d.setData({
                commentLiveMap: p
            }), b(c.submitComment({
                token: g,
                gid: l,
                momID: j,
                comment: e,
                targetMID: f && f.mid,
                fakeID: o,
                contentObj: {
                    txt: e,
                    user_data: i,
                    to_user_data: f,
                    fakeID: o
                },
                mid: m,
                isPersonalAllPublicFeeds: n,
                success: function() {
                    d.handleShakeShareIco(j);
                }
            }));
        },
        delCommentFn: function(d) {
            var e = this, f = d.currentTarget.dataset.gid, g = a.xu.token, h = d.currentTarget.dataset.momid, i = d.currentTarget.dataset.commentid, j = d.currentTarget.dataset.fakecommentid, k = this.data.mid, l = this.data.isPersonalAllPublicFeeds;
            b(c.delComment({
                token: g,
                gid: f,
                momID: h,
                commentID: i,
                mid: k,
                fakeCommentID: j,
                isPersonalAllPublicFeeds: l
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
        handlePreviousAvatar: function(a) {
            var b = a.currentTarget.dataset.src, c = [];
            c.push(b), wx.previewImage({
                urls: c
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.redirectTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
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
                    wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        },
        handleFocus: function() {
            var c = this.data.currentUserInfo.isFollow;
            switch (c) {
              case 0:
                b(e.setFollow({
                    token: a.xu.token,
                    tomid: this.data.currentUserInfo.mid
                }));
                break;

              case 1:
                b(e.unsetFollow({
                    token: a.xu.token,
                    tomid: this.data.currentUserInfo.mid
                }));
                break;

              default:
            }
        }
    });
})();