(function() {
    var a = getApp(), b = require("../../../config/config.js"), c = require("../../../common/utils.js"), d = require("../../../xng_modules/object-assign/index.js"), e = a.store.dispatch, f = require("../../../actions/feedFlow.js"), g = 30;
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap"
            },
            toast: {
                hidden: !0,
                text: ""
            },
            momID: "",
            gid: "",
            userInfo: {},
            commentInp: "",
            hasContent: !0,
            commentList: [],
            isFetching: !0,
            hasNext: !0,
            nextStartTime: -1,
            isCommentBoxShow: !0,
            reachBottomFetchFail: !1
        },
        tplMsgFormSubmit: c.tplMsgFormSubmit,
        showToast: function(a, b) {
            var c = this;
            c.setData({
                toast: {
                    hidden: !1,
                    text: a
                }
            }), setTimeout(function() {
                c.setData({
                    toast: {
                        hidden: !0,
                        text: ""
                    }
                });
            }, b || 3e3);
        },
        fetchComments: function(a) {
            var b = this, h = this.data.gid, i = this.data.momID, j = this.data.nextStartTime, k = this.data.commentList;
            b.setData({
                isFetching: !0
            }), e(f.fetchComments(h, i, j, g, function(e) {
                var f = e.list, h = "[object Array]" === Object.prototype.toString.call(f) ? k.concat(f) : k;
                b.setData({
                    commentList: h.map(function(a) {
                        var b = c.getBeforeTime(a.ct);
                        return d({}, a, {
                            postTime: b
                        });
                    }),
                    isFetching: !1,
                    hasNext: f.length === g,
                    nextStartTime: f[f.length - 1] ? f[f.length - 1].ct : -1
                }), 0 === h.length && b.setData({
                    hasContent: !1
                }), a && "function" == typeof a.successCB && a.successCB();
            }, function(c) {
                b.setData({
                    isFetching: !1
                }), a && "function" == typeof a.failureCB ? a.failureCB() : b.showToast(c);
            }));
        },
        onLoad: function(b) {
            wx.setNavigationBarTitle({
                title: "全部评论"
            }), a.xu.mta.Page.init();
            var c = b.momID, d = b.gid, e = b.mid;
            this.setData({
                momID: c,
                gid: d,
                mid: e,
                commentInpPlaceHolder: "留下您的神语录吧(140字以内)"
            });
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(a.store.getState()), this.fetchComments();
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = a.wx.user;
            this.setData({
                gid: b,
                userInfo: c
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {
            console.log("到底了");
            var a = this;
            this.setData({
                reachBottomFetchFail: !1
            }), this.data.hasNext && !this.data.isFetching && this.fetchComments({
                successCB: function() {
                    a.setData({
                        reachBottomFetchFail: !0
                    });
                },
                failureCB: function() {
                    a.setData({
                        reachBottomFetchFail: !0
                    });
                }
            });
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        submitComment: function() {
            var b = this, c = this.data.userInfo, d = this.data.commentInp, g = this.data.replyTargetUserData, h = a.xu.token, i = this.data.momID, j = this.data.gid, k = new Date().getTime(), l = this.data.mid;
            if (!d) return void b.showToast("输入内容不能为空");
            this.setData({
                isCommentBoxShow: !1,
                isCommentReplyBoxShow: !1,
                replyTargetUserData: null
            }), this.setData({
                isCommentBoxShow: !0
            });
            var m = b.data.commentList.concat([]);
            m.unshift({
                user_data: c,
                to_user_data: g,
                txt: d,
                postTime: "刚刚",
                fakeID: k
            }), wx.showToast({
                title: "发送成功",
                duration: 1e3
            }), b.setData({
                hasContent: !0,
                commentList: m,
                commentInp: ""
            }), e(f.submitComment({
                token: h,
                gid: j,
                momID: i,
                comment: d,
                targetMID: g && g.mid,
                fakeID: k,
                contentObj: {
                    txt: d,
                    user_data: c,
                    to_user_data: g,
                    fakeID: k
                },
                mid: l,
                success: function(a) {
                    console.log(a);
                    var c = m.find(function(a) {
                        return a.fakeID === k;
                    });
                    c.id = a.id, b.setData({
                        commentList: m
                    });
                }
            }));
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        handleInput: function(a) {
            var b = a.detail.value.trim();
            this.setData({
                commentInp: b
            });
        },
        handleInpReply: function(a) {
            var b = this.data.commentList, c = a.currentTarget.dataset.commentindex, d = b[c].user_data;
            this.setData({
                isCommentReplyBoxShow: !0,
                isCommentBoxShow: !1,
                commentInpPlaceHolder: "回复 " + d.nick,
                replyTargetUserData: d
            });
        },
        handleHideReplyKeyboard: function() {
            this.setData({
                isCommentReplyBoxShow: !1,
                isCommentBoxShow: !0,
                replyTargetUserData: null,
                commentInp: ""
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
                            c.confirm ? (console.log("用户点击确定"), b.delCommentFn(a)) : c.cancel && console.log("用户点击取消");
                        }
                    }) : void 0;
                },
                fail: function(a) {
                    console.log(a.errMsg);
                }
            });
        },
        handleAvatarClick: function(a) {
            var b = a.currentTarget.dataset.gid, c = a.currentTarget.dataset.mid, d = a.currentTarget.dataset.nick;
            wx.navigateTo({
                url: "../../me/personalProfilePage/personalProfilePage?mid=" + c + "&gid=" + b
            });
        },
        delCommentFn: function(b) {
            var c = this, d = this.data.gid, g = a.xu.token, h = this.data.momID, i = b.currentTarget.dataset.commentid, j = b.currentTarget.dataset.fakecommentid, k = c.data.commentList.filter(function(a) {
                if (i) return a.id !== i;
                return j ? a.fakeID !== j : a;
            });
            c.setData({
                commentList: k,
                hasContent: !!k.length
            }), e(f.delComment({
                token: g,
                gid: d,
                momID: h,
                commentID: i,
                fakeCommentID: j,
                success: function() {}
            }));
        }
    });
})();