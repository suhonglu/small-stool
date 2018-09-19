(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../common/utils.js"), j = require("../../../common/wxUtils.js"), k = require("../../../xng_modules/array-find-index/index.js"), l = require("../../../config/config.js"), m = require("../../../const/postTips.js");
    Page({
        data: {
            navBar: {
                midText: "发现",
                hasBackBtn: !0,
                onLeftTap: "handleNavBack"
            },
            actionSheet: {
                hidden: !0,
                buttons: []
            },
            toast: {
                hidden: !0,
                text: ""
            },
            imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 8) / 3 - 8 : 60,
            hasContent: !0,
            hasLoad: !1,
            initialFail: !1,
            groupList: []
        },
        tplMsgFormSubmit: i.tplMsgFormSubmit,
        mapStateToData: function(a) {
            var b = a.publicGroup.publicGroupList.list, c = a.publicGroup.publicGroupList.hasNext;
            this.setData({
                groupList: b,
                hasNext: c,
                hasContent: b && !!b.length
            });
        },
        onLoad: function(d) {
            a.xu.mta.Page.init(), j.setChannelData(d);
            var e = this;
            j.getUserAuthorize(a, b, c, e.handleFetchMainData);
        },
        handleFetchMainData: function() {
            var e = this, g = a.xu.token;
            b(c.getPublicGroupsList({
                token: g,
                success: function(a) {
                    e.setData({
                        hasLoad: !0
                    }), wx.hideLoading && wx.hideLoading(), 1 === getCurrentPages().length && (e.setData({
                        navBar: h({}, e.data.navBar, {
                            faBackBtn: "newspaper-o",
                            littleTag: "切换相册"
                        })
                    }), b(d.getNewmsgCount({
                        token: g,
                        success: function(a) {
                            var b = 99 < a.total ? "99+" : a.total;
                            console.log(a), b && e.setData({
                                navBar: h({}, e.data.navBar, {
                                    faBackBtn: "newspaper-o",
                                    littleTag: b
                                })
                            });
                        }
                    })));
                    var c = a.list.concat();
                    c.splice(3), c.forEach(function(a) {
                        var c = a.id;
                        b(f.acFetchGroupInfo(g, c)), b(f.acFetchFeedFlow({
                            token: g,
                            gid: c,
                            start_t: -1,
                            needOverride: !0,
                            noclean: 1
                        }));
                    }, e);
                },
                fail: function(b) {
                    e.setData({
                        hasLoad: !0,
                        initialFail: !0
                    }), wx.hideLoading && wx.hideLoading(), a.xu.showToast(b);
                }
            }));
        },
        onReady: function() {
            this;
        },
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onShareAppMessage: function() {
            return {
                title: "我发现了好玩的群相册"
            };
        },
        onPullDownRefresh: function() {
            var d = a.xu.token, e = this;
            wx.showNavigationBarLoading(), b(c.getPublicGroupsList({
                token: d,
                success: function() {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
                },
                fail: function(b) {
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), a.xu.showToast(b);
                }
            }));
        },
        onReachBottom: function() {
            var d = a.xu.token, e = this, f = this.data.hasNext, g = this.data.groupList;
            f && (wx.showNavigationBarLoading(), b(c.getPublicGroupsList({
                token: d,
                start: g.length,
                success: function() {
                    wx.hideNavigationBarLoading();
                },
                fail: function(b) {
                    wx.hideNavigationBarLoading(), a.xu.showToast(b);
                }
            })));
        },
        onPostBtnTap: function() {
            this;
            this.setData({
                actionSheet: {
                    type: 2,
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
                    } ]
                }
            });
        },
        handleHideAS: function() {
            this.setData({
                actionSheet: {
                    hidden: !0
                }
            });
        },
        postCommonImgsFn: function() {
            this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                sizeType: [ "compressed" ],
                success: function(a) {
                    var c = a.tempFilePaths;
                    b(e.getChooseImgs({
                        tempFilePaths: c
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postGifFn: function() {
            this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                count: 1,
                sizeType: [ "original" ],
                success: function(a) {
                    var c = a.tempFilePaths;
                    b(e.getChooseImgs({
                        tempFilePaths: c,
                        needShowPercent: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        postVideoFn: function() {
            this;
            this.handleHideAS(), wx.chooseVideo({
                sourceType: [ "album" ],
                camera: "front",
                success: function(a) {
                    var c = [];
                    c.push(a.tempFilePath), console.log(c), b(e.getChooseImgs({
                        tempFilePaths: c,
                        needShowPercent: !0,
                        isVideo: !0
                    })), wx.navigateTo({
                        url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
                    });
                }
            });
        },
        handleNavBack: function() {
            var a = getCurrentPages();
            if (1 === a.length) {
                var b = wx.reLaunch || wx.redirectTo;
                b({
                    url: "../../me/groupListPage/groupListPage"
                });
            } else wx.navigateBack();
        },
        onPicErr: function(a) {
            var b = a.currentTarget.dataset.groupindex, c = a.currentTarget.dataset.photoindex;
            console.log(b, c);
            var d = this.data.groupList.concat();
            d[b] && (d[b].imageList[c].url = "../../../src/image/image_error.png", d[b].imageList[c].cover = "../../../src/image/image_error.png"), 
            this.setData({
                groupList: d
            });
        },
        onGroupItemTap: function(a) {
            var b = this, c = a.currentTarget.dataset.gid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + c
            });
        },
        handleNavToFullFnPostPage: function() {
            wx.navigateTo({
                url: "../../post/postIndexProPage/postIndexProPage"
            });
        }
    });
})();