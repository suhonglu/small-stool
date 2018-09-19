(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../xng_modules/es6-promise.min.js").Promise;
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {
            toast: {
                hidden: !0
            },
            picPreviewer: {
                hidden: !0,
                onHidePreviewer: "onHidePreviewer"
            },
            enterIndex: 0,
            tutorialList: [],
            feedFlow: null
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = this.data.lessonId, d = a.entities.feedFlowList[b], e = a.me.ownTiaCourseList[b] && a.me.ownTiaCourseList[b].lessonDetailList || {}, f = e[c] || {};
            console.log(e, f), this.setData({
                currentLessonDetail: f,
                tutorialList: f.details || [],
                feedFlow: d
            });
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onScroll: function(b) {
            var c = b.detail.scrollHeight, d = b.detail.scrollTop, e = a.sysInfo.windowHeight;
            this.shouldNotScrollToNew = c - d - e > e / 2, this.shouldNotScrollToNew || this.setData({
                newUnreadCount: 0
            });
        },
        handleLocateEnterIndex: function() {
            for (var a, b = this.data.tutorialList, c = this.data.currentLessonDetail, d = c.period, e = c.current_time, f = c.begin_time, g = 0, h = b.length - 1, j = 0; j < b.length; j++) if (a = b[j], 
            g += a.duration, g > e - f) {
                h = j;
                break;
            }
            return this.setData({
                enterIndex: h
            }), 2 === d && this.setData({
                newID: "text_" + h
            }), h;
        },
        handleAutoPlay: function a() {
            var b = this, c = this.data.enterIndex, d = this.data.tutorialList, e = d[c + 1];
            console.log(e), e && setTimeout(function() {
                var d = b.data.newUnreadCount || 0;
                c++, d++, b.setData({
                    enterIndex: c
                }), b.shouldNotScrollToNew ? b.setData({
                    newUnreadCount: d
                }) : b.setData({
                    newID: "text_" + c
                }), a.call(b);
            }, 1e3 * e.duration);
        },
        handleScrollToBottom: function() {
            var a = this.data.enterIndex;
            this.setData({
                newID: "text_" + a
            });
        },
        handleFetchCourseDetail: function() {
            var c = this, e = a.xu.token, f = this.data.gid, g = this.data.lessonId, h = this.data.position;
            return wx.showNavigationBarLoading(), new n(function(i, j) {
                b(d.fetchMyTiaCourseDetail({
                    token: e,
                    gid: f,
                    lessonId: g,
                    position: h,
                    fail: function(b) {
                        j(b), a.xu.showToast(b);
                    },
                    success: function(a) {
                        var b = a.lesson.title;
                        wx.setNavigationBarTitle({
                            title: b
                        }), i();
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), c.setData({
                            hasLoad: !0
                        });
                    }
                }));
            });
        },
        onLoad: function(b) {
            var c = this;
            wx.setNavigationBarTitle({
                title: "上课了"
            }), a.xu.mta.Page.init(), this.setData({
                gid: b.gid || 1,
                lessonId: b.lessonId,
                position: b.position
            }), this.handleFetchCourseDetail().then(function() {
                c.handleLocateEnterIndex(), c.handleAutoPlay();
            });
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        handlePreviewImg: function(a) {
            var b = a.currentTarget.dataset.src;
            wx.previewImage({
                current: b,
                urls: [ b ]
            });
        },
        handleNavToSignCalendarThenShowShareImg: function() {
            var c = this, d = a.xu.token, e = this.data.gid;
            b(f.tiaUserSign({
                token: d,
                gid: e
            })).then(function(a) {
                c.handleNavToSignCalendar(a, !0);
            });
        },
        handleNavToSignCalendar: function() {
            wx.navigateTo({
                url: "../../tia/tiaSignCalendarPage/tiaSignCalendarPage?gid=" + this.data.gid
            });
        },
        goToSignIn: function() {
            var c = this.data.feedFlow, d = this, e = a.xu.token, g = this.data.gid;
            return 10 <= c.groupData.clockin ? void this.handleNavToSignCalendar() : void b(f.tiaUserSign({
                token: e,
                gid: g
            })).then(function() {
                d.handleNavToSignCalendar();
            });
        },
        handleAskForHelp: function() {
            a.xu.showToast("课程结束后，您可到微信群里提问，老师会把常见问题汇总后发到群里");
        },
        handleNavToQuestionnaire: function(b) {
            var c = this.data.gid, d = this.data.lessonId, e = a.xu.token, f = b.currentTarget.dataset.path;
            wx.navigateTo({
                url: "../../tia/tiaQuestionnairePage/tiaQuestionnairePage?gid=" + c + "&lessonid=" + d + "&path=" + f
            });
        }
    });
})();