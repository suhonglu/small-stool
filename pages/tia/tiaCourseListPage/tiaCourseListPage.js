(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../xng_modules/es6-promise.min.js").Promise;
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0
            },
            toast: {
                hidden: !0
            },
            actionSheet: {
                hidden: !0
            },
            reachBottomFetchFail: !1,
            hasLoad: !1,
            nextStartNum: -1,
            gid: 1,
            currentTargetMissionID: null,
            courseList: []
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = a.me.ownTiaCourseList[b] && a.me.ownTiaCourseList[b].list.map(function(a) {
                var b = j.formatUnixTime(1e3 * a.begin_time), c = j.formatUnixTime(1e3 * a.current_time), d = j.formatUnixTime2YMD(1e3 * a.begin_time), e = j.formatUnixTime2YMD(1e3 * a.current_time), f = "未开始";
                switch (a.period) {
                  case 1:
                    f = "未开始";
                    break;

                  case 2:
                    f = "进行中";
                    break;

                  case 3:
                    f = "点击回看";
                    break;

                  default:
                }
                return i({}, a, {
                    startDate: d,
                    currentDate: e,
                    startTime: b,
                    currentTime: c,
                    status: f
                });
            }), d = (c || []).filter(function(a) {
                return a.startDate === a.currentDate;
            });
            this.setData({
                courseList: c || [],
                todayCourseList: d
            });
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onLoad: function(b) {
            wx.setNavigationBarTitle({
                title: "课程列表"
            }), a.xu.mta.Page.init(), this.setData({
                gid: b.gid || 1
            }), this.handleFetchMainData();
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onPullDownRefresh: function() {
            this.handleFetchMainData();
        },
        onReachBottom: function() {
            var c = this, e = this.data.nextStartNum, f = this.data.hasNext, g = a.xu.token, h = this.data.gid;
            this.setData({
                reachBottomFetchFail: !1
            }), f && (wx.showNavigationBarLoading(), b(d.fetchMyTiaCourseList({
                gid: h,
                token: g,
                startNum: e,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), c.setData({
                        reachBottomFetchFail: !0
                    });
                }
            })));
        },
        handleFetchMainData: function() {
            var c = this, e = a.xu.token, f = this.data.gid;
            wx.showNavigationBarLoading(), b(d.fetchMyTiaCourseList({
                token: e,
                gid: f,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), c.setData({
                        hasLoad: !0
                    });
                }
            }));
        },
        onSubmitHomeworkBtnTap: function(a) {
            var b = a.currentTarget.dataset.missionid, c = a.currentTarget.dataset.signal;
            this.setData({
                currentTargetMissionID: b,
                signalCard: i({}, this.data.signalCard, {
                    signal: c
                })
            }), this.postCommonImgsFn();
        },
        onCourseDetailEntryClick: function(b) {
            var c = this, d = b.currentTarget.dataset.state, e = b.currentTarget.dataset.lessonid, f = b.currentTarget.dataset.position;
            switch (d) {
              case 2:
              case 3:
                this.handleNavToCourseDetail({
                    lessonId: e,
                    position: f
                });
                break;

              case 1:
                a.xu.showToast("课程还未开始");
                break;

              default:
            }
        },
        handleNavToCourseDetail: function(a) {
            var b = this.data.gid, c = a.lessonId, d = a.position;
            wx.navigateTo({
                url: "/pages/tia/tiaCourseDetailPage/tiaCourseDetailPage?gid=" + b + "&lessonId=" + c + "&position=" + d
            });
        },
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        handleCopyWord: function(b) {
            this;
            return new n(function(c, d) {
                wx.setClipboardData ? wx.setClipboardData({
                    data: b,
                    success: function() {
                        c();
                    },
                    fail: d
                }) : (a.xu.showLowVersionAlert(), d());
            });
        }
    });
})();