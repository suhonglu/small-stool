(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/postMoment.js"), d = require("../../../actions/index.js"), e = require("../../../actions/feedFlow.js"), f = require("../../../config/config.js"), g = a.sysInfo.windowWidth, h = require("../../../common/utils.js"), i = [], j = [];
    Page({
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0,
                rightText: "发送",
                onRightTap: "onNavBarRightTap"
            },
            groupList: [],
            groupInfo: {},
            token: "",
            widthStyle: (g - 40 + 4) / 3 - 4,
            shouldChooseGroup: !1,
            tempFilePaths: [],
            desc: "",
            toast: {
                hidden: !0,
                text: ""
            },
            isGrpChoosePanelShow: !1
        },
        tplMsgFormSubmit: h.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = this.data.gid, d = b.entities.feedFlowList[c].groupData, e = b.userGroup.userGroupList, f = a.xu.token;
            this.setData({
                groupInfo: d,
                groupList: e,
                token: f
            });
        },
        onLoad: function(b) {
            a.xu.mta.Page.init(), this.setData({
                gid: b.gid
            });
            var c = a.store.getState();
            i = c.postMoment.aheadChosenFiles, j = [], this.setData({
                shouldChooseGroup: !!b.shouldChooseGroup
            });
        },
        onReady: function() {
            this.setData({
                tempFilePaths: i
            });
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onHide: function() {},
        onUnload: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onUploadTap: function() {
            var a = this, b = this.data.tempFilePaths;
            wx.chooseImage({
                sourceType: [ "album" ],
                success: function(c) {
                    var d = b.concat(c.tempFilePaths).slice(0, 9);
                    a.setData({
                        tempFilePaths: d
                    });
                }
            });
        },
        uploadImg: function(a) {
            for (var b = this, c = a.paths, d = a.url, e = !1, f = 0; f < c.length && !e; f++) (function(f) {
                var g = c[f];
                wx.uploadFile({
                    url: d,
                    filePath: g,
                    name: "file",
                    formData: a.formData,
                    success: function(b) {
                        j.push(JSON.parse(b.data).data.list[0].qid), console.log(b, f, j), c.length === j.length && (wx.hideLoading && wx.hideLoading(), 
                        a.successCB(j));
                    },
                    fail: function() {
                        console.log("第" + f + "张失败了", j), wx.hideLoading && wx.hideLoading(), j = [], e = !0, 
                        wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(c) {
                                c.confirm ? (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), b.uploadImg(a)) : c.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            })(f);
        },
        postFeedFn: function(a, d) {
            var e = this, g = this.data.token, h = this.data.desc, i = this.data.tempFilePaths, j = getCurrentPages(), k = j[j.length - 1], l = j[j.length - 2];
            if (wx.showLoading && wx.showLoading({
                title: "发表中",
                mask: !0
            }), 0 === i.length && 0 !== h.trim().length) return void b(c.postMoment({
                token: g,
                gid: a,
                qids: [],
                desc: h,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), d ? d() : (l.refreshContent(), wx.navigateBack());
                }
            }));
            var m = {
                successCB: function(b) {
                    console.log("所有图片上传完毕"), e.handlePostFeed(g, a, b, h);
                },
                url: f.uploadUrl,
                paths: i,
                formData: {
                    token: g,
                    gid: a
                }
            };
            console.log(m), this.uploadImg(m);
        },
        handlePostFeed: function a(d, f, g, h, i) {
            var j = getCurrentPages(), k = j[j.length - 1], l = j[j.length - 2];
            b(c.postMoment({
                token: d,
                gid: f,
                qids: g,
                desc: h,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), i ? i() : b(e.acFetchFeedFlow({
                        token: d,
                        gid: f,
                        start_t: -1,
                        needOverride: !0,
                        success: function() {
                            wx.navigateBack(), l.refreshContent();
                        },
                        fail: function() {
                            wx.navigateBack(), l.refreshContent();
                        }
                    }));
                },
                fail: function() {
                    wx.hideLoading && wx.hideLoading(), wx.showModal({
                        title: "上传失败",
                        content: "网络原因,上传图片失败,是否重试?",
                        confirmText: "重试",
                        success: function(b) {
                            b.confirm ? (wx.showLoading && wx.showLoading({
                                title: "发表中",
                                mask: !0
                            }), a(d, f, g, h)) : b.cancel && console.log("用户点击取消");
                        }
                    });
                }
            }));
        },
        onNavBarRightTap: function() {
            var b = this, c = this.data.groupInfo.id, d = this.data.token, e = this.data.desc, f = this.data.tempFilePaths;
            return console.log(f, e), j = [], 0 === f.length && 0 === e.trim().length ? void a.xu.showToast("发布内容不能为空") : void (b.data.shouldChooseGroup ? this.handleOpenGrpPanel() : this.postFeedFn(c));
        },
        onPhotoTap: function(a) {
            var b = a.currentTarget.dataset.photoIndex, c = this.data.tempFilePaths;
            wx.previewImage({
                current: c[b],
                urls: c
            });
        },
        onDelPhoto: function(a) {
            console.log("删除这张图片");
            var b = a.currentTarget.dataset.index, c = this.data.tempFilePaths;
            c.splice(b, 1), this.setData({
                tempFilePaths: c
            });
        },
        bindTextAreaInput: function(a) {
            this.setData({
                desc: a.detail.value
            });
        },
        handleOpenGrpPanel: function() {
            this.setData({
                isGrpChoosePanelShow: !0
            });
        },
        handleCloseGrpPanel: function() {
            this.setData({
                isGrpChoosePanelShow: !1
            });
        },
        onGrpSelected: function(a) {
            var b = a.currentTarget.dataset.grpid;
            this.setData({
                isGrpChoosePanelShow: !1
            }), this.postFeedFn(b, function() {
                wx.redirectTo({
                    url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + b
                });
            });
        }
    });
})();