(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/tia.js"), d = require("../../../xng_modules/object-assign/index.js"), e = require("../../../common/utils.js"), f = require("../../../common/wxUtils.js"), g = require("../../../xng_modules/array-find-index/index.js"), h = require("../../../config/config.js"), i = require("../../../xng_modules/es6-promise.min.js").Promise, j = require("../../../xng_modules/array-union/index.js");
    Page({
        tplMsgFormSubmit: e.tplMsgFormSubmit,
        data: {
            toast: {
                hidden: !0
            },
            currentYear: "-",
            currentMonth: "-",
            currentDate: "-",
            calendarData: [],
            ruleText: "",
            calendarIndex: null,
            totalSignedDays: 0,
            signDialog: {
                show: !1,
                state: null,
                iconUrl: null
            },
            todaySign: null
        },
        hasShowInitDialog: !1,
        mapStateToData: function() {},
        onLoad: function(b) {
            wx.setNavigationBarTitle({
                title: "签到记录"
            }), a.xu.mta.Page.init();
            var c = !!+b.needShowTodayShareCard, d = new Date().getFullYear(), e = new Date().getMonth() + 1, f = new Date().getDate();
            this.setData({
                needInitializeWithShareCardDisplay: c,
                gid: b.gid,
                currentYear: d,
                currentMonth: e,
                currentDate: f
            }), wx.showLoading && wx.showLoading({
                title: "加载中...",
                mask: !0
            }), this.handleFetchMainData();
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onPullDownRefresh: function() {
            this.handleFetchMainData();
        },
        handleGetTargetCalendar: function(a, b) {
            var c = new Date();
            c.setDate(1), c.setMonth(b - 1), c.setFullYear(a);
            var d = [], e = [], f = [], g = [];
            c.setDate(0);
            var h, j = 6 === c.getDay() ? 0 : c.getDay() + 1, k = c.getDate(), l = c.getFullYear(), m = c.getMonth();
            for (h = 0; h < j; h++) d.unshift({
                num: k - h,
                type: "prev",
                month: m,
                year: l
            });
            c.setDate(1), c.setFullYear(a), c.setMonth(b);
            var n = c.getFullYear(), o = c.getMonth();
            c.setDate(0);
            var p = c.getDate(), q = 6 - c.getDay();
            for (h = 1; h < p + 1; h++) e.push({
                num: h,
                type: "current",
                month: b,
                year: a
            });
            for (35 === j + p + q && (q += 7), 28 === j + p + q && (q += 14), h = 1; h < q + 1; h++) f.push({
                num: h,
                type: "next",
                month: o,
                year: n
            });
            return g = d.concat(e, f), g;
        },
        handleAddZero: function(a) {
            return 10 > a ? "0" + a : a;
        },
        handleFetchMainData: function() {
            var d = this, e = a.xu.token, f = this.data.gid;
            wx.showNavigationBarLoading(), b(c.fetchCurrentSignData({
                token: e,
                gid: f,
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), wx.hideLoading && wx.hideLoading(), 
                    d.setData({
                        hasLoad: !0
                    });
                }
            })).then(function(a) {
                var b = 0, c = d.handleDealWithResData(a), e = d.data.currentMonth, f = d.data.currentYear;
                c.find(function(a, c) {
                    if (a.month === e && a.year === f) return b = c, !0;
                }), d.setData({
                    calendarData: c,
                    calendarIndex: b,
                    enterCalendarIndex: b
                });
            }).then(this.handleInitialDisplay).catch(a.xu.showToast);
        },
        handleDealWithResData: function(a) {
            var b = Math.floor, c = this, d = a.list, e = 0, f = d.map(function(a) {
                return 20 === a.clockin && e++, b(a.date / 100);
            }), g = a.ruleDesc || "暂无";
            this.setData({
                totalSignedDays: e,
                ruleText: g
            });
            for (var h = j(f), k = h.map(function(a) {
                var d = b(a / 100), e = a % 100;
                return {
                    year: d,
                    month: e,
                    dateList: c.handleGetTargetCalendar(d, e).map(function(a) {
                        return {
                            date: a.num,
                            type: a.type,
                            state: 0
                        };
                    })
                };
            }), l = 0; l < d.length; l++) {
                var i = d[l], m = i.date, n = i.clockin, o = i.img, p = b(m / 1e4), q = b(m % 1e4 / 100), r = m % 1e4 % 100;
                k.forEach(function(a) {
                    var b = a.dateList;
                    a.year === p && a.month === q ? b.forEach(function(a) {
                        a.date === r && "current" === a.type && (a.state = n, a.img = o);
                    }) : a.year > p || a.year === p && a.month > q ? b.forEach(function(a) {
                        a.date === r && "prev" === a.type && (a.state = n, a.img = o);
                    }) : (a.year < p || a.year === p && a.month < q) && b.forEach(function(a) {
                        a.date === r && "next" === a.type && (a.state = n, a.img = o);
                    });
                }, this);
            }
            return k;
        },
        handleInitialDisplay: function() {
            var a, b = this.data.currentMonth, c = this.data.currentDate, d = this.data.currentYear, e = this.data.calendarData;
            return e.find(function(e) {
                if (e.year === d && e.month === b) return e.dateList.find(function(b) {
                    if (b.date === c && "current" === b.type) return a = b, !0;
                }), !0;
            }), this.hasShowInitDialog || !a || 0 > a.state ? void this.setData({
                todaySign: a
            }) : void (this.hasShowInitDialog = !0, this.setData({
                signDialog: {
                    show: !0,
                    state: a.state,
                    iconUrl: "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-complete.png"
                },
                todaySign: a
            }));
        },
        onDateCircleTap: function(a) {
            var b = a.currentTarget.dataset.state, c = a.currentTarget.dataset.shareimg, d = a.currentTarget.dataset.date, e = a.currentTarget.dataset.type, f = this.data.currentDate, g = this.data.currentMonth, h = this.data.currentYear, i = this.data.enterCalendarIndex, j = this.data.calendarIndex;
            switch (b) {
              case 0:
                break;

              case 1:
                if (j < i || j === i && ("prev" === e || "current" === e && d < f)) {
                    this.showSignDialog(1, "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-fail.png");
                    break;
                }
                this.showSignDialog(2, "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-no-begin.png");
                break;

              case 10:
                this.showSignDialog(10, "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-complete.png");
                break;

              case 20:
                this.showSignDialog(20, "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-complete.png");
                break;

              default:
            }
        },
        showSignDialog: function(a, b) {
            this.setData({
                signDialog: {
                    show: !0,
                    state: a,
                    iconUrl: b
                }
            });
        },
        closeSignDialog: function() {
            this.setData({
                signDialog: {
                    show: !1,
                    state: null,
                    iconUrl: null
                }
            });
        },
        todaySignTap: function() {
            this.data.todaySign && 10 === this.data.todaySign.state && this.showSignDialog(10, "https://static2.xiaoniangao.cn/mini_xbd/img/tia/sign-in-complete.png");
        },
        handleSwitchMonth: function(a) {
            var b = a.currentTarget.dataset.way, c = this.data.calendarIndex, d = this.data.calendarData, e = d.length - 1;
            switch (b) {
              case "prev":
                c--, 0 > c && (c = 0);
                break;

              case "next":
                c++, c > e && (c = e);
                break;

              default:
            }
            this.setData({
                calendarIndex: c
            });
        }
    });
})();