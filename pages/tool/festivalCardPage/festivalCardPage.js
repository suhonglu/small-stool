(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/feedFlow.js"), d = require("../../../actions/index.js"), e = require("../../../actions/me.js"), f = require("../../../actions/active.js"), g = require("../../../actions/postMoment.js"), h = require("../../../xng_modules/es6-promise.min.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../const/common.js"), o = [ "大吉大利" ], p = [ "大吉大利" ];
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "handleNavBack"
            },
            type: 1,
            cardInfo: {
                text: "",
                userName: "我",
                toUserName: "您"
            },
            cardList: [],
            currentIndex: 0,
            bgMusicIsPlay: !1,
            isThemeSwitcherShow: !1
        },
        mapStateToData: function(a) {
            var b = a.active.blessCardList;
            this.setData({
                cardList: b
            });
        },
        onLoad: function(c) {
            console.log(c);
            var e = c.id, f = +c.type || 1, g = decodeURIComponent(c.text), h = decodeURIComponent(c.userName), i = decodeURIComponent(c.toUserName), j = decodeURIComponent(c.userAvatar);
            this.setData({
                initCardId: e
            }), 2 == f && this.setData({
                type: f,
                cardInfo2: {
                    text: g,
                    userName: h,
                    toUserName: i,
                    userAvatar: j
                }
            }), a.xu.mta.Page.init(), k.setChannelData(c), k.getUserAuthorize(a, b, d, this.handleFetchMainData);
        },
        onReady: function() {
            this.audioCtx = wx.createAudioContext("bgAudio");
        },
        onShow: function() {
            var a = this.data.bgMusicIsPlay;
            a && this.audioCtx && this.audioCtx.play();
        },
        handleSetStorageDraft: function(a, b) {
            var c = k.getStorageSync("user_blessword_draft_obj") || {};
            c[a] = b, k.setStorageSync("user_blessword_draft_obj", c);
        },
        handleDelStorageDraft: function(a) {
            var b = k.getStorageSync("user_blessword_draft_obj") || {};
            b[a] = "", k.setStorageSync("user_blessword_draft_obj", b);
        },
        handleGetStorageDraft: function(a) {
            var b = k.getStorageSync("user_blessword_draft_obj"), c = b[a];
            return c;
        },
        handleOpenThemeSwitcher: function() {
            this.setData({
                isThemeSwitcherShow: !0
            });
        },
        handleCloseThemeSwitcher: function() {
            this.setData({
                isThemeSwitcherShow: !1
            });
        },
        handleSelectTheme: function(a) {
            var b = a.currentTarget.dataset.index, c = this.data.cardList, d = this.data.currentIndex, e = c[d], f = e && e.play, g = e && e.txtLib, h = c[b].page_title || c[b].name + "快乐";
            wx.setNavigationBarTitle({
                title: h
            }), this.audioCtx.pause(), this.setData({
                currentIndex: b,
                bgMusicIsPlay: !1
            }), f && this.handleBesureAudioCtxExist().then(this.handlePlayBgMusic), this.handleInitText();
        },
        handlePlayBgMusic: function() {
            console.log("进来了", this.audioCtx);
            var a = this.data.bgMusicIsPlay;
            a ? this.audioCtx.pause() : this.audioCtx.play(), this.setData({
                bgMusicIsPlay: !a
            });
        },
        handleInitText: function() {
            var a = this, b = this.data.currentIndex, c = this.data.cardList, d = c[b], e = c[b] && c[b].txtLib;
            p = e || o;
            var f, g = this.handleGetStorageDraft(d.id);
            if (g) f = g; else {
                var h = this.createRandomNum(p.length);
                f = p[h];
            }
            a.handleSetFestivalText(f);
        },
        onShareAppMessage: function() {
            var a = this.data.cardInfo, b = a.text, c = a.userName, d = a.toUserName, e = a.userAvatar, f = this.data.cardList[this.data.currentIndex], g = f.id, h = f.share_desc, i = "pages/tool/festivalCardPage/festivalCardPage?type=2&text=" + encodeURIComponent(b) + "&userName=" + encodeURIComponent(c) + "&toUserName=" + encodeURIComponent(d) + "&userAvatar=" + encodeURIComponent(e) + "&id=" + g;
            return console.log("分享链接", i), {
                title: this.data.cardInfo.userName + h + b,
                path: i,
                imageUrl: f.url
            };
        },
        handleNavToCardEditor: function() {
            var a = this.data.cardInfo, b = a.text, c = a.userName, d = a.toUserName, e = a.userAvatar, f = this.data.cardList[this.data.currentIndex], g = f.id;
            wx.navigateTo({
                url: "/pages/tool/festivalCardEditPage/festivalCardEditPage?text=" + encodeURIComponent(b) + "&userName=" + encodeURIComponent(c) + "&toUserName=" + encodeURIComponent(d) + "&userAvatar=" + encodeURIComponent(e) + "&id=" + g
            });
        },
        handleSwitchCardState: function() {
            this.setData({
                type: 1
            });
        },
        handleFetchUserInfo: function() {
            return new h(function(b, c) {
                wx.getUserInfo({
                    success: function(c) {
                        a.xu.userInfo = c.userInfo, b(c.userInfo);
                    },
                    fail: c
                });
            });
        },
        handleBesureWxUserInfo: function() {
            var b = this;
            return new h(function(c) {
                a.xu.userInfo ? c(a.xu.userInfo) : b.handleFetchUserInfo().then(c);
            });
        },
        handleFetchCardInfo: function() {
            var c = a.xu.token;
            return new h(function(a, d) {
                wx.showLoading({
                    title: "加载中"
                }), b(f.getCardInfo({
                    token: c,
                    success: a,
                    fail: d,
                    complete: function() {
                        wx.hideLoading && wx.hideLoading();
                    }
                }));
            });
        },
        handleBesureAudioCtxExist: function() {
            var a = this, b = 0;
            return new h(function(c, d) {
                setInterval(function() {
                    a.audioCtx ? c() : (b++, 4 < b && d());
                }, 1e3);
            });
        },
        handleFetchMainData: function() {
            var b = this, c = a.xu.token, d = this.data.cardInfo, e = this.data.initCardId;
            this.handleFetchCardInfo().then(function(a) {
                var c = a.list;
                c.find(function(a, c) {
                    if (a.id == e) return b.setData({
                        currentIndex: c
                    }), !0;
                }), b.setData({
                    hasLoad: !0
                });
                var d = c[b.data.currentIndex], f = d && d.play, g = d.page_title || d.name + "快乐";
                wx.setNavigationBarTitle({
                    title: g
                }), f && b.handleBesureAudioCtxExist().then(b.handlePlayBgMusic), b.handleInitText();
            }), this.handleBesureWxUserInfo().then(function(a) {
                b.setData({
                    cardInfo: i({}, b.data.cardInfo, {
                        userName: a.nickName,
                        userAvatar: a.avatarUrl
                    })
                }), 1 === getCurrentPages().length && b.setData({
                    isFirstPage: !0,
                    navBar: i({}, b.data.navBar, {
                        faBackBtn: "newspaper-o",
                        littleTag: n.BACK_BTN_TEXT
                    })
                });
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            1 === a.length ? wx.switchTab({
                url: "../../moments/recommendFeedFlowPage/recommendFeedFlowPage"
            }) : wx.navigateBack();
        },
        handleExchangeText: function() {
            var a = this.data.cardInfo, b = this.data.cardInfo.text, c = p.indexOf(b);
            -1 === c ? c = this.createRandomNum(p.length) : c + 1 === p.length ? c = 0 : c++, 
            this.handleSetFestivalText(p[c]), wx.removeStorageSync("user_blessword_draft_obj");
        },
        createRandomNum: function(a) {
            var b = Math.floor(Math.random() * a);
            return b;
        },
        handleSetFestivalText: function(a) {
            var b = this.data.cardInfo;
            this.setData({
                cardInfo: i({}, b, {
                    text: a
                })
            });
        }
    });
})();