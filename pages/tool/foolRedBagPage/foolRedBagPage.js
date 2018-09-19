(function() {
    var a = Math.floor, b = require("../../../actions/index.js"), c = require("../../../actions/active.js"), d = getApp(), e = d.store.dispatch, f = require("../../../common/utils.js"), g = require("../../../common/wxUtils.js"), h = d.sysInfo, i = h.windowWidth, j = h.windowHeight, k = [ .6, 1.4 ];
    Page({
        data: {
            toast: {
                hidden: !0,
                text: ""
            },
            initLeftPosition: i / 2,
            initTopPosition: 4 * (j / 7),
            initTriggerSize: 180,
            forbiddenDistance: 150,
            mode: "game",
            counter: 0,
            gameTimes: 10,
            isGaming: !1,
            ownWxNick: "",
            ownWxAvatar: "",
            fromWxNick: "",
            fromWxAvatar: ""
        },
        tplMsgFormSubmit: f.tplMsgFormSubmit,
        onLoad: function(a) {
            var c = this, f = a.userNick && decodeURIComponent(a.userNick), h = a.userNick && decodeURIComponent(a.userAvatar);
            d.xu.mta.Page.init(), g.setChannelData(a), g.getUserAuthorize(d, e, b, c.handleFetchMainData.bind(c, a)), 
            this.handleInitialize(), this.setData({
                fromWxNick: f,
                fromWxAvatar: h
            });
        },
        handleFetchMainData: function() {
            var a = this;
            g.handleFetchUserInfo(d).then(function(b) {
                a.setData({
                    ownWxNick: b.nickName,
                    ownWxAvatar: b.avatarUrl
                });
            });
        },
        onShow: function() {},
        onReady: function() {},
        onShareAppMessage: function() {
            var a = this.data.gameTimes, b = this.data.counter, c = this.data.ownWxNick, d = this.data.ownWxAvatar, e = this.data.gameOver, f = "/pages/tool/foolRedBagPage/foolRedBagPage" + (c ? "?userNick=" + encodeURIComponent(c) + "&userAvatar=" + encodeURIComponent(d) : "");
            return console.log("分享链接是", f), {
                imageUrl: e ? "" : "../../../src/img/festival/fool_festival/read-bag-share.jpg",
                title: e ? "我得了" + b + "分, 不服来战" : c + "送你一个红包, 点击领取>>",
                path: f
            };
        },
        onFoolTriggerClick: function() {
            this.handleMoveFoolTrigger();
        },
        handleMoveFoolTrigger: function() {
            var a = Math.pow, b = this.data.forbiddenDistance, c = this.data.initTriggerSize, d = this.data.leftPosition, e = this.data.topPosition, g = c * (f.createRandomNum(10 * k[0], 10 * k[1]) / 10), h = f.createRandomNum(i), l = f.createRandomNum(j), m = Math.sqrt(a(d - h, 2) + a(e - l, 2)), n = this.data.counter, o = this.data.isGaming, p = this.data.gameOver, q = this.data.mode;
            return m < b || h > 3 * i / 4 && l < j / 5 ? void this.handleMoveFoolTrigger() : void (p || (n++, 
            "game" === q && 1 === n && this.handleStartGame(), this.setData({
                counter: n,
                leftPosition: h,
                topPosition: l,
                triggerSize: g
            })));
        },
        handleStartGame: function() {
            this.setData({
                isGaming: !0
            }), this.timer = setInterval(this.handleSyncTimeCounter, 1e3);
        },
        handleSyncTimeCounter: function() {
            var b = this, c = this.data.remainTimes;
            c--, b.setData({
                remainMin: a(c / 60),
                remainSec: c % 60,
                remainTimes: c
            }), 0 === c && (clearInterval(this.timer), b.handleStopGame());
        },
        handleResetTriggerPosition: function() {
            this.setData({
                leftPosition: i / 2,
                topPosition: j / 2
            });
        },
        handleInitialize: function() {
            this.setData({
                remainTimes: this.data.gameTimes,
                remainMin: a(this.data.gameTimes / 60),
                remainSec: this.data.gameTimes % 60,
                leftPosition: this.data.initLeftPosition,
                topPosition: this.data.initTopPosition,
                triggerSize: this.data.initTriggerSize,
                counter: 0,
                mode: "game",
                gameOver: !1,
                lastHighScore: 0,
                percent: 0
            });
        },
        handleStopGame: function() {
            var a = this, b = this.data.gameTimes, f = this.data.counter, g = d.xu.token;
            this.setData({
                gameOver: !0,
                isGaming: !1
            }), wx.showLoading && wx.showLoading({
                title: "成绩计算中...",
                mask: !0
            }), e(c.uploadRedBagGameScore({
                token: g,
                score: f,
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            })).then(function(b) {
                console.log(b);
                var c = b.last_high_score, d = b.percent;
                a.setData({
                    lastHighScore: c,
                    percent: d
                });
            });
        },
        handleReadyToRestart: function() {
            this.handleInitialize();
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            if (1 === a.length) {
                var b = wx.reLaunch || wx.redirectTo;
                b({
                    url: "../../me/groupListPage/groupListPage"
                });
            } else wx.navigateBack();
        }
    });
})();