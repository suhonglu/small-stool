(function() {
    var a = getApp(), b = require("../../../config/config.js"), c = require("../../../common/utils.js"), d = require("../../../common/wxUtils.js"), e = require("../../../xng_modules/object-assign/index.js"), f = a.store.dispatch, g = require("../../../actions/userGroup.js"), h = require("../../../actions/index.js");
    Page({
        data: {
            navBar: {
                midText: "相册成员",
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap",
                rightBtns: [ {
                    src: "../../../src/img/group/icon_add_member.png",
                    handleTap: "handleAddMember",
                    hasShareFn: !0
                }, {
                    src: "../../../src/img/group/icon_reduce_member.png",
                    handleTap: "handleDelMember"
                } ]
            },
            dialog: {
                hidden: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            showOpenData: !0,
            shouldBackUpWordShow: !1,
            groupInfo: {},
            userInfo: {},
            groupOwnerInfo: {},
            isOwner: !1,
            groupMemberList: [],
            hasNext: !0,
            reachBottomFetchFail: !1,
            memberListRequestLock: 0,
            memberShowCount: 50,
            isAllMemberListShow: !1
        },
        tplMsgFormSubmit: c.tplMsgFormSubmit,
        onLoad: function(b) {
            this.setData({
                gid: b.gid
            }), wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            }), a.xu.mta.Page.init(), this.mapStateToData(a.store.getState());
            var c = a.xu.token, d = this.data.gid, e = this.data.groupInfo.pub;
            this.setData({
                isPublic: e
            }), wx.showLoading && wx.showLoading({
                title: "加载中",
                mask: !0
            }), f(g.fetchMemberList({
                token: c,
                gid: d,
                limit: this.data.memberShowCount,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    wx.hideLoading && wx.hideLoading();
                }
            }));
        },
        onReady: function() {
            var a = this, b = this.data.gid, c = this.data.groupInfo;
            10001 == b && wx.hideShareMenu && wx.hideShareMenu(), this.setData({
                rightBtns: 2 === c.type ? [] : [ {
                    src: "../../../src/img/group/icon_add_member.png",
                    handleTap: "handleAddMember",
                    hasShareFn: 10001 != b
                }, {
                    src: "../../../src/img/group/icon_reduce_member.png",
                    handleTap: "handleDelMember"
                } ]
            }), setTimeout(function() {
                a.setData({
                    shouldBackUpWordShow: !0
                });
            }, 2e3);
        },
        onShow: function() {
            this.mapStateToData(a.store.getState()), this.setData({
                hasNext: !0
            });
        },
        mapStateToData: function(a) {
            var b = this.data.gid, d = a.entities.feedFlowList[b] ? a.entities.feedFlowList[b].groupData : {}, e = (a.userGroup.currentGroupMemberList || []).map(function(a) {
                return a.joinTime = c.formatUnixTime2YMD(a.t), a;
            }), f = e.find(function(a) {
                return a.user_data.owner;
            }), g = f && f.user_data, h = a.wx.user, i = g && h.mid === g.mid;
            this.setData({
                groupInfo: d,
                userInfo: h,
                groupMemberList: e,
                groupOwnerInfo: g,
                isOwner: i,
                navBar: {
                    midText: "相册成员",
                    hasBackBtn: !0,
                    onLeftTap: "onNavBarLeftTap",
                    rightBtns: 2 === d.type ? [] : i ? [ {
                        src: "../../../src/img/group/icon_add_member.png",
                        handleTap: "handleAddMember",
                        hasShareFn: 10001 != b
                    }, {
                        src: "../../../src/img/group/icon_reduce_member.png",
                        handleTap: "handleDelMember"
                    } ] : [ {
                        src: "../../../src/img/group/icon_add_member.png",
                        handleTap: "handleAddMember",
                        hasShareFn: 10001 != b
                    } ]
                }
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onShareAppMessage: function() {
            var b = this, c = this.data.gid, d = a.store.getState().feedFlow.feedList.list[c] && a.store.getState().feedFlow.feedList.list[c].ids[0] && a.store.getState().entities.feedFlowList[c].feedList[a.store.getState().feedFlow.feedList.list[c].ids[0]].img_data[0].url, e = this.data.groupInfo.name, f = this.data.groupInfo.type;
            return console.log("分享链接为: ", "/pages/moments/feedFlowPage/feedFlowPage?gid=" + c), 
            {
                title: "邀请您关注" + (1 !== f && e ? '"' + e + '"' : "") + "群相册",
                path: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + c,
                imageUrl: d,
                success: function(b) {
                    console.log("转发成功的结果", b), a.handleDecryptShareInfo(b.shareTickets[0]);
                }
            };
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        handleKickOutMember: function(a) {
            console.log(a.currentTarget.dataset.mid);
        },
        handleAddMember: function() {
            var b = this.data.gid;
            10001 === b && a.xu.showToast("该相册禁止分享"), wx.login({
                success: function(b) {
                    console.log("loginSuccess-----"), f(h.acWxFetchSession(b.code, function(b) {
                        d.setStorageSync("mini_session", b.mini_session), a.xu.mini_session = d.getStorageSync("mini_session");
                    }));
                }
            });
        },
        handleDelMember: function() {
            wx.navigateTo({
                url: "../kickoutMemberPage/kickoutMemberPage?gid=" + this.data.gid
            });
        },
        handleNavToModifyGrpNamePage: function() {
            var a = this.data.isOwner, b = 1 === this.data.groupInfo.type;
            a ? wx.navigateTo({
                url: "../ModifyGrpInfoPage/ModifyGrpInfoPage?gid=" + this.data.gid + "&&attr=name"
            }) : wx.showModal({
                title: "您还没有权限",
                content: "只有群主才能修改哦",
                showCancel: !1,
                confirmText: "我知道了"
            });
        },
        onScrollViewReachBottom: function() {
            var b = this, c = this.data.groupMemberList, d = c[c.length - 1].sort_num, e = a.xu.token, h = this.data.gid, i = this.data.memberShowCount, j = this.data.hasNext, k = this.data.memberListRequestLock;
            !k && j && (this.setData({
                memberListRequestLock: 1,
                reachBottomFetchFail: !1
            }), wx.showNavigationBarLoading(), f(g.fetchMemberList({
                token: e,
                gid: h,
                limit: i,
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
                    b.setData({
                        memberListRequestLock: 0,
                        reachBottomFetchFail: !0
                    }), wx.hideNavigationBarLoading();
                }
            })));
        },
        onSwitchTap: function() {
            var a = this.data.isOwner, b = 1 === this.data.groupInfo.type;
            a ? b && this.setData({
                dialog: {
                    hidden: !1,
                    title: "非法操作",
                    bodyList: [ " ● 微信群绑定相册不能公开哦", " ● 请回到列表页创建非绑定相册" ],
                    buttons: [ {
                        operateBtn: !0,
                        name: "我知道了",
                        onTap: "handleHideDialog"
                    } ]
                }
            }) : wx.showModal({
                title: "您还没有权限",
                content: "只有群主才能修改哦",
                showCancel: !1,
                confirmText: "我知道了"
            });
        },
        handleHideDialog: function() {
            this.setData({
                dialog: {
                    hidden: !0
                }
            });
        },
        handleNavToModifyGrpDescPage: function() {
            var a = this.data.isOwner;
            a ? wx.navigateTo({
                url: "../ModifyGrpInfoPage/ModifyGrpInfoPage?gid=" + this.data.gid + "&&attr=desc"
            }) : wx.showModal({
                title: "您还没有权限",
                content: "只有群主才能修改哦",
                showCancel: !1,
                confirmText: "我知道了"
            });
        },
        handlePublishGrp: function(b) {
            var c = b.detail.value, d = a.xu.token, e = this.data.gid;
            console.log(c);
            var g = this.data.isOwner;
            g ? f(h.modifyGrpPub({
                token: d,
                gid: e,
                pub: c ? 1 : 0
            })) : wx.showModal({
                title: "您还没有权限",
                content: "只有群主才能修改哦",
                showCancel: !1,
                confirmText: "我知道了"
            });
        },
        handleNavToModifyGrpTypePage: function() {
            a.xu.showToast("暂时不能修改");
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.navigateTo({
                url: "../personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
        },
        handleQuitGroup: function() {
            var b = a.xu.token, c = this.data.gid, d = getCurrentPages();
            wx.showActionSheet({
                itemList: [ "退出群组" ],
                success: function(a) {
                    var e = a.tapIndex;
                    0 === e ? wx.showModal({
                        title: "退出",
                        content: "确定退出吗?",
                        success: function(a) {
                            a.confirm ? (console.log("用户点击确定"), f(h.quitGroup(b, c, function() {
                                console.log(d.length), wx.reLaunch({
                                    url: "../../me/groupListPage/groupListPage"
                                });
                            }))) : a.cancel && console.log("用户点击取消");
                        }
                    }) : void 0;
                },
                fail: function(a) {
                    console.log(a.errMsg);
                }
            });
        },
        handleOpenAllMemberListCard: function() {
            this.setData({
                isAllMemberListShow: !0
            });
        },
        handleCloseAllMemberListCard: function() {
            this.setData({
                isAllMemberListShow: !1
            });
        }
    });
})();