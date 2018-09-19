(function() {
    var a = getApp(), b = require("../../../config/config.js"), c = require("../../../common/utils.js"), d = require("../../../xng_modules/object-assign/index.js"), e = a.store.dispatch, f = require("../../../actions/userGroup.js");
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap",
                rightText: "删除",
                rightDisable: !0,
                onRightTap: "handleKickOutMembers"
            },
            toast: {
                hidden: !0,
                text: ""
            },
            gid: "",
            userInfo: {},
            groupMemberList: [],
            hasNext: !0,
            reachBottomFetchFail: !1,
            selectedCount: 0,
            perPageCount: 50,
            checkStateMap: {}
        },
        tplMsgFormSubmit: c.tplMsgFormSubmit,
        onLoad: function(b) {
            a.xu.mta.Page.init();
            var c = a.xu.token, d = b.gid;
            this.setData({
                gid: d
            });
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        mapStateToData: function(a) {
            var b = (a.userGroup.currentGroupMemberList || []).map(function(a) {
                return a.joinTime = c.formatUnixTime2YMD(a.t), a.isChecked = !1, a;
            }).filter(function(a) {
                return !a.user_data.owner;
            });
            this.setData({
                groupMemberList: b
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            var b = this, c = a.xu.token, d = this.data.gid, g = this.data.perPageCount;
            e(f.fetchMemberList({
                token: c,
                gid: d,
                limit: g,
                success: function() {
                    b.setData({
                        hasNext: !0
                    });
                },
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.stopPullDownRefresh();
                }
            }));
        },
        onReachBottom: function() {
            var b = this, c = this.data.groupMemberList, d = c[c.length - 1].sort_num, g = a.xu.token, h = this.data.gid, i = this.data.hasNext, j = this.data.perPageCount;
            i && (wx.showNavigationBarLoading(), b.setData({
                reachBottomFetchFail: !1
            }), e(f.fetchMemberList({
                token: g,
                gid: h,
                limit: j,
                startNum: d,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                success: function(a) {
                    var c = 0 === a.list.length;
                    c && b.setData({
                        hasNext: !1
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), b.setData({
                        reachBottomFetchFail: !0
                    });
                }
            })));
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onCheckMember: function(a) {
            var b = a.currentTarget.dataset.mid, c = this.data.checkStateMap;
            c[b] = !c[b];
            var d = 0;
            for (var e in c) if (c.hasOwnProperty(e)) {
                var f = c[e];
                f && d++;
            }
            this.setData({
                checkStateMap: c,
                navBar: {
                    hasBackBtn: !0,
                    onLeftTap: "onNavBarLeftTap",
                    rightText: d ? "删除 (" + d + ")" : "删除",
                    rightDisable: !d,
                    onRightTap: "handleKickOutMembers"
                },
                selectedCount: d
            });
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        handleKickOutMembers: function(a) {
            console.log("踢");
            var b = this;
            wx.showModal({
                title: "删除",
                content: "确定删除吗?",
                success: function(c) {
                    c.confirm ? (console.log("用户点击确定"), b.kickMemberFn(a)) : c.cancel && console.log("用户点击取消");
                }
            });
        },
        kickMemberFn: function() {
            var b = this.data.checkStateMap, c = this, d = this.data.gid, g = a.xu.token, h = [];
            for (var i in b) if (b.hasOwnProperty(i)) {
                var j = b[i];
                j && h.push(+i);
            }
            wx.showLoading && wx.showLoading({
                title: "操作中",
                mask: !0
            }), e(f.kickoutMember(g, d, h, function() {
                wx.showToast({
                    title: "操作成功",
                    duration: 1e3
                }), c.setData({
                    navBar: {
                        hasBackBtn: !0,
                        onLeftTap: "onNavBarLeftTap",
                        rightText: "删除",
                        rightDisable: !0,
                        onRightTap: "handleKickOutMembers"
                    },
                    checkStateMap: {},
                    selectedCount: 0
                }), wx.navigateBack();
            }, function(a) {
                wx.hideLoading && wx.hideLoading(), c.handleRequestErr(a), c.setData({
                    navBar: {
                        hasBackBtn: !0,
                        onLeftTap: "onNavBarLeftTap",
                        rightText: "删除",
                        rightDisable: !0,
                        onRightTap: "handleKickOutMembers"
                    },
                    selectedCount: 0
                });
            }));
        }
    });
})();