(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/userGroup.js"), f = require("../../../actions/recommend.js"), g = require("../../../actions/postMoment.js"), h = require("../../../actions/me.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../const/fetchTrigger.js"), o = require("../../../const/postTips.js"), p = require("../../../const/common.js");
    Page({
        data: {
            updateCount: 0,
            banner: null,
            subNotice: null,
            broadcast: "",
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0
            },
            dialog: {
                hidden: !0
            },
            favorHeart: {
                show: !1
            },
            isCommentInpShow: !1,
            commentInpPlaceHolder: "评论",
            commentInp: "",
            commentLiveInp: "",
            list: [],
            shakeController: {},
            hasLoad: !1,
            reachBottomFetchFail: !1,
            hasSlideDown: !1,
            shouldSlideDownTipHide: !1,
            windowWidth: a.sysInfo.windowWidth,
            isTourist: !1,
            lastFetchTriggerEvent: null
        },
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        capacity: 100,
        commentLiveMap: {},
        videoPlayLock: !1,
        imgErrorCount: 0,
        imgCorrectCount: 0,
        imgErrCounter: {},
        lastTapTime: 0,
        canReloadTargetImg: 1,
        mapStateToData: function(b) {
            var c = Math.floor, d = b.wx.user, e = b.recommend.recommendData.hasNext, f = b.recommend.recommendData.sendDesc || "", g = b.recommend.recommendData.desc || "", h = b.recommend.banner, i = b.recommend.subNotice, j = b.recommend.recommendData.list.map(function(b) {
                var d = 1e5 < b.pv ? "100000+" : b.pv, e = 1e5 < b.uv ? "100000+" : b.uv, f = b.img_data || [], g = b.comments_some || [], h = f.map(function(d) {
                    var e = d.w / (a.sysInfo.windowWidth - 40), f = d.h / (.8 * a.sysInfo.windowHeight), g = d.w / d.h;
                    return d ? {
                        type: d.type,
                        qid: d.qid,
                        r_url: d.r_url,
                        url: d.url,
                        lid: b.lid,
                        aid: b.aid,
                        small_url: d.small_url,
                        isPicErr: d.isPicErr,
                        height: c(e > f ? (a.sysInfo.windowWidth - 40) / g : .8 * a.sysInfo.windowHeight),
                        width: c(e < f ? .8 * a.sysInfo.windowHeight * g : a.sysInfo.windowWidth - 40)
                    } : void 0;
                }), i = g.map(function(a) {
                    return {
                        id: a.id,
                        fakeID: a.fakeID,
                        txt: a.txt,
                        user_mid: a.user_data.mid,
                        user_nick: a.user_data.nick,
                        user_vip: a.user_data.user_v,
                        to_user_mid: a.to_user_data && a.to_user_data.mid,
                        to_user_nick: a.to_user_data && a.to_user_data.nick,
                        to_user_vip: a.to_user_data && a.to_user_data.user_v
                    };
                }), j = b.ginfo || {}, k = b.favor_data || {}, l = b.user_data || {};
                return j.name && 14 < j.name.length && (j.name = j.name.substr(0, 13) + "..."), 
                {
                    img_data: h,
                    comments_some: i,
                    pv: d,
                    uv: e,
                    comments_count: b.comments_count,
                    isFake: b.isFake,
                    txt: b.txt,
                    type: b.type,
                    ctype: b.ctype,
                    favor_total: k.total,
                    has_favor: k.has_favor,
                    favor_shouldAnimatePlay: k.shouldAnimatePlay,
                    gid: b.gid,
                    gname: j.name,
                    gtype: j.type,
                    opengid: j.opengid,
                    id: b.id,
                    share_count: b.share_count,
                    share_desc: b.share_desc,
                    sort_num: b.sort_num,
                    hurl: l.hurl,
                    mid: l.mid,
                    nick: l.nick,
                    isFollow: l.isFollow
                };
            });
            this.setData({
                hasNext: e,
                banner: h,
                subNotice: i,
                list: j,
                isOverload: j.length >= this.capacity,
                broadcast: g,
                sendDesc: f,
                userInfo: d,
                imageBoxWidth: c(a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 39) / 3 - 1 : 60),
                imageHalfWidth: c(a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 39) / 2 - 1 : 60),
                imageFullWidth: c(a.sysInfo.windowWidth ? a.sysInfo.windowWidth - 40 : 200),
                imageMaxHeight: c(.8 * a.sysInfo.windowHeight)
            });
        },
        onLoad: function(b) {
            var c = b.chid || 1, d = b.itemID || null, e = b.groupID || null, f = k.isHigherVersionSDK(a.sysInfo.SDKVersion, "1.2.4");
            this.pageFirstLoadOriginPath = b.src, this.options = b, this.isFromShareCard = !!d, 
            this.shouldNotShareFeedAutoPlay = !!b.noAutoPlay, this.firstLoadTime = +new Date(), 
            a.xu.mta.Page.init(), wx.setNavigationBarTitle({
                title: "推荐"
            }), k.setChannelData(b), this.setData({
                chid: c,
                hrefID: d,
                hrefGID: e,
                shouldShowFeedShareBtn: f
            }), this.onDidLoad();
        },
        onDidLoad: function() {
            var c = this;
            k.handleCheckAuthority("scope.userInfo").then(function(e) {
                var f = !1;
                f = !e && !a.xu.token, c.setData({
                    isTourist: f
                }), f ? c.onStandBy() : c.isFromShareCard ? k.checkIfUserInfoExist(a, b, d).then(c.onStandBy()) : k.getUserAuthorize(a, b, d, c.onStandBy);
            });
        },
        onReady: function() {
            a.xu.logger && a.xu.logger.logTraffic("initRenderTime", i({
                bt: this.firstLoadTime,
                tt: +new Date() - this.firstLoadTime
            }));
        },
        onShow: function() {
            b(d.resetGroupMember()), this.mapStateToData(a.store.getState());
        },
        onStandBy: function() {
            var c = this, e = a.xu.token, g = this.data.chid || 1, h = this.data.hrefID, i = this.data.hrefGID, j = this.data.isTourist, k = 1 === getCurrentPages().length, l = 0 === a.store.getState().recommend.recommendData.list.length || h;
            return console.log("needFetchNewData", l), console.log("isTourist", j), j ? void b(f.fetchFakeRecommendList({
                startNum: h || 0,
                chid: g,
                cid: h,
                gid: i,
                limit: 5,
                needOverride: !0,
                contain_start: h ? 1 : 0
            })).then(function(a) {
                c.isFromShareCard && !c.shouldNotShareFeedAutoPlay && a.list[0].img_data && "video" === a.list[0].img_data[0].type && c.handlePreviewMedia({
                    currentTarget: {
                        dataset: {
                            feedindex: 0,
                            imgindex: 0
                        }
                    }
                });
            }) : void (l && b(f.fetchRecommendList({
                pageFirstLoadOriginPath: c.pageFirstLoadOriginPath,
                fetchTrigger: !!h ? n.BY_ENTER_SHARE : n.BY_PAGE_INIT,
                token: e,
                startNum: h || 0,
                chid: g,
                cid: h,
                gid: i,
                limit: 5,
                needOverride: !0,
                contain_start: h ? 1 : 0
            })).then(function(a) {
                c.setData({
                    hasLoad: !0,
                    updateCount: a.update_count
                }), c.isFromShareCard && !c.shouldNotShareFeedAutoPlay && a.list[0].img_data && "video" === a.list[0].img_data[0].type && c.handlePreviewMedia({
                    currentTarget: {
                        dataset: {
                            feedindex: 0,
                            imgindex: 0
                        }
                    }
                }), setTimeout(function() {
                    c.setData({
                        updateCount: 0
                    });
                }, 4e3);
            }).then(function() {
                k && b(d.getUserGroupsList(e));
            }).catch(function(b) {
                c.setData({
                    hasLoad: !0
                }), a.xu.showToast(b);
            }));
        },
        onHide: function() {
            this.handlePostPicLogger(), this.setData({
                reachBottomFetchFail: !0
            });
        },
        onUnload: function() {
            this.handlePostPicLogger();
        },
        onAuthRequestPageReturn: function() {
            var a = this.data.lastFetchTriggerEvent;
            switch (a) {
              case n.BY_REFRESH_PAGE:
                this.onPullDownRefresh();
                break;

              case n.BY_FETCH_MORE:
                this.handleFetchMore();
                break;

              default:
            }
            this.setData({
                isTourist: !1
            });
        },
        onPullDownRefresh: function() {
            var c = this, d = this.data.chid || 1, e = this.data.hasPrev && !1, g = this.data.list;
            this.setData({
                lastFetchTriggerEvent: n.BY_REFRESH_PAGE
            }), b(f.fetchRecommendList({
                fetchTrigger: n.BY_REFRESH_PAGE,
                token: a.xu.token,
                startNum: 0,
                chid: d,
                limit: 5,
                success: function(a) {
                    var b = a.update_count;
                    c.setData({
                        navBar: i({}, c.data.navBar, {
                            midNum: 0
                        }),
                        updateCount: b
                    }), setTimeout(function() {
                        c.setData({
                            updateCount: 0
                        });
                    }, 4e3);
                },
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading();
                }
            }));
        },
        onReachBottom: function() {
            var c = this, d = this.data.list, e = this.data.hasNext, g = this.data.isTourist, h = this.data.chid, i = this.data.isOverload, j = d[d.length - 1];
            if (j) return this.setData({
                reachBottomFetchFail: !1
            }), !e || i ? void 0 : g ? void this.setData({
                reachBottomFetchFail: !0
            }) : void (this.setData({
                lastFetchTriggerEvent: n.BY_FETCH_MORE
            }), b(f.fetchRecommendList({
                fetchTrigger: n.BY_FETCH_MORE,
                token: a.xu.token,
                startNum: j.sort_num,
                chid: h,
                complete: function() {
                    c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            })));
        },
        handleFetchMore: function() {
            var c = this, d = this.data.list, e = this.data.hasNext, g = this.data.chid, h = this.data.isOverload, i = d[d.length - 1];
            i && (this.setData({
                reachBottomFetchFail: !1
            }), !e || h || (this.setData({
                lastFetchTriggerEvent: n.BY_FETCH_MORE
            }), b(f.fetchRecommendList({
                fetchTrigger: n.BY_FETCH_MORE,
                token: a.xu.token,
                startNum: i.sort_num,
                chid: g,
                complete: function() {
                    c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            }))));
        },
        onShareAppMessage: function(d) {
            var e, f, g, h, i, j, k, l, m, n, o, q = d[0] || {}, r = a.xu.token, s = this.data.chid, t = this.data.isTourist;
            if ("button" === q.from && (e = q.target.dataset.index, f = this.data.list[e], f)) switch (g = f.gid, 
            h = f.sort_num, i = f.img_data[0], j = i.type, l = i.url, m = f.share_desc || f.txt, 
            j) {
              case "video":
                k = "视频";
                break;

              case "gif":
                k = "动态图";
                break;

              default:
                k = "图片";
            }
            return n = "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=" + s + (h ? "&itemID=" + h : "") + (g ? "&groupID=" + g : ""), 
            o = h ? m || (a.xu.userInfo.nickName || "") + p.FEED_SHARE_WORD_BODY + k + p.FEED_SHARE_WORD_TAIL : "这有一堆精彩的图片, 分享给你", 
            h && !t && b(c.shareMoment({
                token: r,
                gid: g,
                momID: h
            })), {
                title: o,
                path: n,
                imageUrl: l || "../../../src/image/grass&guitar.jpg",
                success: function() {}
            };
        },
        onListTouchMove: function() {
            this.handleHideSlideDownTip();
        },
        onPicErr: function(a) {
            var c, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.photoindex, g = a.currentTarget.dataset.momid, h = a.currentTarget.dataset.gid;
            this.imgErrCounter[g] = this.imgErrCounter[g] || {}, this.imgErrCounter[g][e] = this.imgErrCounter[g][e] || 0, 
            this.imgErrCounter[g][e] += 1, c = this.imgErrCounter[g][e], 2 > c && this.canReloadTargetImg ? (b(d.imgLoadError({
                page: "recommendFeedFlowPage",
                gid: h,
                momID: g,
                imgIndex: f
            })), b(d.imgReload({
                page: "recommendFeedFlowPage",
                gid: h,
                momID: g,
                imgIndex: f
            }))) : (this.imgErrCounter[g][e] = 0, b(d.imgLoadError({
                page: "recommendFeedFlowPage",
                gid: h,
                momID: g,
                imgIndex: f
            })), this.imgErrorCount += 1);
        },
        onPicLoad: function(a) {
            var c = a.currentTarget.dataset.needgif, e = a.currentTarget.dataset.isvideo, f = a.currentTarget.dataset.ispicerr, g = a.currentTarget.dataset.feedindex, h = a.currentTarget.dataset.photoindex, i = a.currentTarget.dataset.momid, j = a.currentTarget.dataset.gid;
            !f && e && b(d.imgNeedGif({
                page: "recommendFeedFlowPage",
                gid: j,
                momID: i,
                imgIndex: h
            })), this.imgCorrectCount += 1;
        },
        onFeedTap: function(a) {
            var b = this, c = a.timeStamp, d = this.lastTapTime;
            this.lastTapTime = c, 400 > c - d && b.handleFavorMedia(a);
        },
        onPhotoTap: function(a) {
            var b = this, c = a.timeStamp, d = this.data.isTourist, e = this.lastTapTime;
            return this.lastTapTime = c, d ? (b.handlePreviewMedia(a), !1) : void (400 > c - e ? (clearTimeout(this.tapTimer), 
            b.handleFavorMedia(a)) : this.tapTimer = setTimeout(function() {
                b.handlePreviewMedia(a);
            }, 400));
        },
        handleOpenPushSwitcher: function(c) {
            var d = this, e = c.currentTarget.dataset.state, f = a.xu.token;
            b(h.changePushState({
                token: f,
                state: e
            }));
        },
        handleFavorMedia: function(d) {
            var e = this, f = d.currentTarget.dataset.feedindex, g = this.data.list[f], h = g.has_favor, i = g.gid, j = g.sort_num, k = a.xu.token;
            this.handleShowFavorHeart({
                X: d.touches[0].clientX,
                Y: d.touches[0].clientY
            }), h || b(c.favorMoment({
                page: "recommendFeedFlowPage",
                token: k,
                gid: i,
                momID: j
            })).then(e.handleShakeShareIco.bind(e, j));
        },
        handleGetUserInfo: function(b) {
            var c = b.detail.userInfo;
            c && (wx.showToast({
                title: "登录成功"
            }), a.xu.userInfo = c, k.setStorageSync("wx_user_info", c), this.setData({
                isTourist: !1
            }), this.handleFetchMore());
        },
        handlePreviewMedia: function(e) {
            var f = this, g = this.data.chid, h = e.currentTarget.dataset.feedindex, i = e.currentTarget.dataset.imgindex, j = this.data.list[h], k = j.img_data[i], l = k && !k.isPicErr, m = k.r_url, n = k.type, o = k.lid, q = k.aid, r = j.type, s = j.gid, t = j.sort_num, u = a.xu.token;
            return l ? ("video" === n ? !this.videoPlayLock && (b(c.playVideo({
                info: {
                    gid: s,
                    momID: t,
                    src: m,
                    rUrl: m,
                    feedType: r,
                    lid: o,
                    aid: q,
                    hasFavor: j.has_favor,
                    originPage: "recommendFeedFlowPage",
                    fromMid: j.mid,
                    shareInfo: {
                        path: "pages/moments/recommendFeedFlowPage/recommendFeedFlowPage?chid=" + g + (t ? "&itemID=" + t : "") + (s ? "&groupID=" + s : ""),
                        img: k.url,
                        desc: j.share_desc || j.txt || (a.xu.userInfo.nickName || "") + p.FEED_SHARE_WORD_BODY + "视频" + p.FEED_SHARE_WORD_TAIL
                    }
                }
            })), this.videoPlayLock = !0, f.handleNavToVideoPlayer(m).then(function() {
                f.videoPlayLock = !1;
            })) : wx.previewImage({
                current: k.url,
                urls: j.img_data.map(function(a) {
                    return a.url;
                })
            }), !1) : (this.canReloadTargetImg = 0, b(d.imgReload({
                page: "recommendFeedFlowPage",
                gid: s,
                momID: t,
                imgIndex: i
            })), j.img_data.forEach(function(a, c) {
                a.isPicErr && b(d.imgReload({
                    page: "recommendFeedFlowPage",
                    gid: s,
                    momID: t,
                    imgIndex: c
                }));
            }, this), this.canReloadTargetImg = 1, !1);
        },
        handlePostPicLogger: function() {
            a.xu.logger && (a.xu.logger.logTraffic("photoStatus", i({
                st: 0,
                count: this.imgErrorCount,
                path: getCurrentPages()[getCurrentPages().length - 1].__route__
            })), a.xu.logger.logTraffic("photoStatus", i({
                st: 1,
                count: this.imgCorrectCount,
                path: getCurrentPages()[getCurrentPages().length - 1].__route__
            }))), this.imgErrorCount = 0, this.imgCorrectCount = 0;
        },
        handleRefresh: function() {
            wx.pageScrollTo && wx.pageScrollTo({
                scrollTop: 0
            }), this.onPullDownRefresh();
        },
        handleNavToVideoPlayer: function(a) {
            return new Promise(function(b) {
                wx.navigateTo({
                    url: "../../common/videoPlayProPage/videoPlayProPage?src=" + encodeURIComponent(a),
                    complete: b
                });
            });
        },
        handleNavToRecommendGrpList: function() {
            wx.navigateTo({
                url: "../../moments/publicGroupListPage/publicGroupListPage?chid=1"
            });
        },
        handleNavToFullFnPostPage: function() {
            this.handleHideAS(), wx.navigateTo({
                url: "../../post/postIndexProPage/postIndexProPage?gid=10000"
            });
        },
        handleNavToProfile: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + 1e4
            });
        },
        handleFocusCurrentPerson: function(c) {
            var d = c.currentTarget.dataset.feedindex, e = this.data.list[d], f = e.gid, g = e.sort_num, i = e.mid;
            b(h.setFollow({
                token: a.xu.token,
                tomid: i,
                momID: g
            }));
        },
        handleNavToGroup: function(a) {
            var b = a.currentTarget.dataset.feedindex, c = this.data.list[b], d = c.gid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + d
            });
        },
        onOperateBtnTap: function(a) {
            var b = this, c = this.data.userInfo.mid, d = a.currentTarget.dataset.feedindex, e = this.data.list[d] || {}, f = e.isFake, g = e.mid, h = g === c && f;
            this.setData({
                operateTargetIndex: d
            }), wx.showActionSheet({
                itemList: h ? [ "删除" ] : [ "举报", "不喜欢" ],
                success: function(c) {
                    if (h) wx.showModal({
                        title: "删除",
                        content: "确定删除吗?",
                        success: function(c) {
                            c.confirm && b.handleDelete(a);
                        }
                    }); else switch (c.tapIndex) {
                      case 0:
                        b.setData({
                            dialog: {
                                hidden: !1,
                                textarea: {
                                    maxLength: 30,
                                    placeholder: "请输入举报理由(最多30字)",
                                    handleInput: "handleInputComplainReason"
                                },
                                title: "确定举报吗?",
                                buttons: [ {
                                    name: "确定",
                                    operateBtn: !0,
                                    onTap: "handleComplain"
                                }, {
                                    name: "取消"
                                } ],
                                handleHide: "handleHideDialog"
                            }
                        });
                        break;

                      case 1:
                        b.handleDislike().then(function() {
                            wx.showToast({
                                title: "不喜欢"
                            });
                        });
                        break;

                      default:
                    }
                }
            });
        },
        handleInputComplainReason: function(a) {
            var b = a.detail.value.trim();
            this.setData({
                complainInput: b
            });
        },
        handleHideDialog: function() {
            this.setData({
                dialog: {
                    hidden: !0
                }
            });
        },
        handleComplain: function() {
            var d = this, e = a.xu.token, f = this.data.complainInput, g = this.data.operateTargetIndex, h = this.data.list[g], i = h.sort_num, j = h.gid;
            b(c.complainMoment({
                token: e,
                gid: j,
                momID: i,
                text: f,
                success: function() {
                    wx.showToast({
                        title: "举报成功",
                        duration: 1e3
                    });
                },
                fail: function(b) {
                    wx.hideLoading(), a.xu.showToast(b);
                },
                complete: function() {
                    d.setData({
                        complainInput: ""
                    });
                }
            }));
        },
        handleDislike: function() {
            var d = a.xu.token, e = this.data.operateTargetIndex, f = this.data.list[e], g = f.sort_num, h = f.gid;
            return b(c.dislikeMoment({
                token: d,
                gid: h,
                momID: g,
                success: function() {},
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {}
            }));
        },
        handleDelete: function(d) {
            var e = this, f = a.xu.token, g = d.currentTarget.dataset.feedindex, h = this.data.list[g], i = h.sort_num, j = h.gid;
            b(c.delMoment({
                token: f,
                gid: j,
                momID: i
            })).then(function() {
                wx.showToast({
                    title: "删除成功",
                    duration: 1e3
                });
            }).catch(function(b) {
                wx.hideLoading(), a.xu.showToast(b);
            });
        },
        handleShowFavorHeart: function(a) {
            var b = this;
            this.setData({
                "favorHeart.show": !1
            }), b.setData({
                "favorHeart.show": !0,
                "favorHeart.X": a.X,
                "favorHeart.Y": a.Y
            });
        },
        handleFavor: function(d) {
            var e = this, f = d.currentTarget.dataset.index, g = this.data.list[f], h = g.gid, i = g.sort_num, j = g.has_favor, k = a.xu.token;
            j ? b(c.unFavorMoment({
                page: "recommendFeedFlowPage",
                token: k,
                gid: h,
                momID: i
            })) : b(c.favorMoment({
                page: "recommendFeedFlowPage",
                token: k,
                gid: h,
                momID: i
            })).then(e.handleShakeShareIco.bind(e, i));
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
        handleDeleteComment: function(a) {
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
                }
            });
        },
        delCommentFn: function(d) {
            var e = a.xu.token, f = d.currentTarget.dataset.gid, g = d.currentTarget.dataset.momid, h = d.currentTarget.dataset.commentid, i = d.currentTarget.dataset.fakecommentid;
            b(c.delComment({
                token: e,
                gid: f,
                momID: g,
                commentID: h,
                fakeCommentID: i
            }));
        },
        handleInpReply: function(a) {
            var b = this.data.list, c = a.currentTarget.dataset.momid, d = a.currentTarget.dataset.gid, e = a.currentTarget.dataset.feedindex, f = a.currentTarget.dataset.commentindex, g = b[e].comments_some[f].user_nick, h = b[e].comments_some[f].user_mid, i = this.commentLiveMap;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "回复 " + g,
                commentInp: i[c] || "",
                commentLiveInp: i[c] || "",
                replyTargetUserNick: g,
                replyTargetUserMid: h,
                targetMomID: c,
                targetMomIndex: e,
                targetMomGid: d
            });
        },
        handleHideKeyboard: function() {
            this.setData({
                isCommentInpShow: !1,
                replyTargetUserNick: null,
                replyTargetUserMid: null
            });
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = this, d = i({}, this.commentLiveMap);
            d[c.data.targetMomID] = b, this.commentLiveMap = d, this.setData({
                commentLiveInp: b
            });
        },
        handleSubmitComment: function() {
            var d = this, e = i({}, d.commentLiveMap), f = this.data.targetMomGid, g = this.data.targetMomID, h = this.data.commentLiveInp, j = this.data.replyTargetUserNick, k = this.data.replyTargetUserMid, l = a.xu.token, m = this.data.userInfo, n = new Date().getTime(), o = this.data.mid, p = this.data.targetMomIndex;
            this.setData({
                isCommentInpShow: !1
            }), d.handleHideKeyboard(), e[g] = "", this.commentLiveMap = e, b(c.submitComment({
                token: l,
                gid: f,
                momID: g,
                comment: h,
                targetMID: k,
                fakeID: n,
                contentObj: {
                    txt: h,
                    user_data: m,
                    to_user_data: {
                        nick: j,
                        mid: k
                    },
                    fakeID: n
                },
                success: function() {
                    d.handleShakeShareIco(g);
                }
            }));
        },
        emptyFn: function() {},
        handleNavToAllComment: function(a) {
            var b = a.currentTarget.dataset.feedindex, c = this.data.list[b], d = c.gid, e = c.sort_num, f = this.data.userInfo.mid;
            wx.navigateTo({
                url: "../../moments/commentPage/commentPage?momID=" + e + "&gid=" + d + "&mid=" + f
            });
        },
        handleInpComment: function(a) {
            var b = a.currentTarget.dataset.feedindex, c = this.data.list[b], d = c.gid, e = c.sort_num, f = this.commentLiveMap;
            this.setData({
                isCommentInpShow: !0,
                commentInpPlaceHolder: "留下您的神语录吧(140字以内)",
                targetMomID: e,
                targetMomIndex: b,
                targetMomGid: d,
                commentInp: f[e] || "",
                commentLiveInp: f[e] || ""
            });
        },
        handlePostBtnTap: function() {
            var a = this.data.sendDesc;
            this.setData({
                actionSheet: {
                    type: 2,
                    tip: a || o.RECOMMEND_TIPS,
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
                    }, {
                        name: "文字+",
                        onTap: "postTextPlusFn",
                        src: "../../../src/img/feed/xbd_textPlus.png"
                    } ]
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
                },
                fail: function() {
                    wx.showModal({
                        title: "处理失败",
                        content: "当前文件可能体积过大, 请尝试选择体积较小的文件",
                        confirmText: "我知道了",
                        showCancel: !1
                    });
                }
            });
        },
        postTextPlusFn: function() {
            this.handleNavToFullFnPostPage();
        },
        handlePostMoment: function(b, c, d) {
            var e = this, f = a.xu.token, g = c ? "uploadLocalImgPRO" : "uploadLocalImg";
            return 0 === b.length ? void a.xu.showToast("发布内容不能为空") : void (!c && (wx.hideLoading(), 
            wx.showLoading({
                title: "提交中",
                mask: !0
            })), this[g]({
                isVideo: d,
                tempPaths: b,
                formData: {
                    token: f,
                    gid: 1e4
                },
                successCB: function(a) {
                    e.postMomentFn(b, a, c);
                }
            }));
        },
        uploadLocalImg: function(b) {
            var c, d = this, e = b.tempPaths, f = b.formData, g = b.successCB, h = b.failureCB, k = [];
            e.forEach(function(l, n) {
                wx.uploadFile({
                    url: m.uploadUrl,
                    filePath: l,
                    name: "file",
                    formData: f,
                    success: function(a) {
                        var b = JSON.parse(a.data).ret;
                        k[n] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1;
                    },
                    fail: function() {
                        k[n] = -1;
                    },
                    complete: function() {
                        j.checkIfArrIsFull(k, e.length) && (c = k.some(function(a) {
                            return -1 === a;
                        }), c ? (wx.hideLoading(), k = [], h && h(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(a) {
                                a.confirm && (wx.showLoading({
                                    title: "提交中",
                                    mask: !0
                                }), d.uploadLocalImg(b));
                            }
                        })) : 0 === k.length ? (wx.hideLoading(), a.xu.showToast("没有检测到要发的内容, 请重启微信后重试")) : g && g(k));
                    }
                });
            });
        },
        uploadLocalImgPRO: function(b) {
            var c = this, d = b.isVideo, e = b.tempPaths[0], f = b.tempPaths, g = b.formData, h = b.successCB, i = b.failureCB, j = [], k = wx.uploadFile({
                url: d ? m.uploadVideoUrl : m.uploadUrl,
                filePath: e,
                name: "file",
                formData: g,
                success: function(a) {
                    var b = a.statusCode;
                    j[0] = 200 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1;
                },
                fail: function() {
                    j[0] = -1;
                },
                complete: function() {
                    var d = j.find(function(a) {
                        return -1 === a;
                    });
                    d ? (wx.hideLoading(), j = [], i && i(), wx.showModal({
                        title: "上传失败",
                        content: "网络原因,上传图片失败,是否重试?",
                        confirmText: "重试",
                        success: function(a) {
                            a.confirm && (wx.showLoading({
                                title: "提交中",
                                mask: !0
                            }), c.uploadLocalImgPRO(b));
                        }
                    })) : 0 === j.length ? (wx.hideLoading(), a.xu.showToast("没有检测到要发的内容, 请重启微信后重试")) : h && h(j);
                }
            });
            k && k.onProgressUpdate(function(a) {
                var b = 0 > a.progress - 1 ? 0 : a.progress - 1;
                wx.showLoading({
                    title: "已完成" + b + "%",
                    mask: !0
                });
            });
        },
        refreshContent: function(a) {
            a && a(), wx.pageScrollTo ? setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: 0
                }), wx.showLoading({
                    mask: !1
                }), wx.hideLoading();
            }, 500) : wx.hideLoading();
        },
        postMomentFn: function(c, d, e) {
            var f = this, h = a.xu.token;
            k.createProImageObjArr(c).then(function(a) {
                b(g.postMoment({
                    token: h,
                    gid: 1e4,
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
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        handleManualRefresh: function() {
            var a = wx.startPullDownRefresh;
            a ? wx.startPullDownRefresh() : this.handleRefresh();
        },
        handleHideSlideDownTip: function() {
            var a = this;
            this.data.shouldSlideDownTipHide || (this.setData({
                hasSlideDown: !0
            }), setTimeout(function() {
                a.setData({
                    shouldSlideDownTipHide: !0
                });
            }, 1e3));
        },
        handleSlideDown: function() {
            wx.pageScrollTo && wx.pageScrollTo({
                scrollTop: 600
            }), this.handleHideSlideDownTip();
        }
    });
})();