(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/postMoment.js"), d = require("../../../actions/index.js"), e = require("../../../actions/feedFlow.js"), f = require("../../../config/config.js"), g = a.sysInfo.windowWidth, h = require("../../../common/utils.js"), i = require("../../../common/wxUtils.js"), j = require("../../../const/postTips.js"), k = [], l = [];
    Page({
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0,
                rightText: "发送",
                onRightTap: "onPostBtnClick"
            },
            actionSheet: {
                hidden: !0,
                buttons: []
            },
            toast: {
                hidden: !0,
                text: ""
            },
            widthStyle: (g - 40 + 4) / 3 - 4,
            tempFilePaths: [],
            desc: "",
            gid: null,
            groupInfo: {},
            shouldChooseGroup: !1,
            maxCount: null,
            uploadType: 0
        },
        tplMsgFormSubmit: h.tplMsgFormSubmit,
        mapStateToData: function(a) {
            var b = 1e4 === this.data.gid ? {} : a.entities.feedFlowList[this.data.gid].groupData;
            this.setData({
                groupInfo: b
            });
        },
        onLoad: function(b) {
            a.xu.mta.Page.init(), l = [], this.setData({
                gid: +b.gid,
                shouldChooseGroup: !b.gid
            });
        },
        onReady: function() {
            this.setData({
                tempFilePaths: k
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
        onContinueUploadTap: function() {
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
        onUploadTap: function() {
            var a = 1e4 === this.data.gid;
            this.setData({
                actionSheet: {
                    type: 2,
                    tip: a ? j.RECOMMEND_TIPS : j.COMMON_TIPS,
                    hidden: !1,
                    onCancel: "handleHideAS",
                    buttons: [ {
                        name: "发图片",
                        onTap: "selectCommonImgsFn",
                        src: "../../../src/img/feed/xbd_img.png"
                    }, {
                        name: "发动图",
                        onTap: "selectGifFn",
                        src: "../../../src/img/feed/xbd_gif.png"
                    }, {
                        name: "发视频",
                        onTap: "selectVideoFn",
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
        selectCommonImgsFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                sizeType: [ "compressed" ],
                success: function(b) {
                    a.setData({
                        tempFilePaths: b.tempFilePaths.slice(0, 9),
                        maxCount: 9,
                        uploadType: 0
                    });
                }
            });
        },
        selectGifFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseImage({
                sourceType: [ "album" ],
                count: 1,
                sizeType: [ "original" ],
                success: function(b) {
                    a.setData({
                        tempFilePaths: b.tempFilePaths,
                        maxCount: 1,
                        uploadType: 1
                    });
                }
            });
        },
        selectVideoFn: function() {
            var a = this;
            this.handleHideAS(), wx.chooseVideo({
                sourceType: [ "album" ],
                camera: "front",
                success: function(b) {
                    var c = [];
                    c.push(b.tempFilePath), a.setData({
                        videoDuration: h.formatSecondToZeroCard(Math.floor(b.duration)),
                        tempFilePaths: c,
                        maxCount: 1,
                        uploadType: 2
                    });
                }
            });
        },
        onPostBtnClick: function() {
            var d = this, e = a.xu.token, f = this.data.tempFilePaths, g = this.data.desc, h = this.data.gid, i = this.data.uploadType, j = this.data.shouldChooseGroup, k = getCurrentPages(), l = k[k.length - 1], m = k[k.length - 2];
            if (0 === f.length && 0 === g.trim().length) return void a.xu.showToast("发布内容不能为空");
            if (j) return b(c.getChooseImgs({
                tempFilePaths: f,
                desc: g,
                needShowPercent: 0 !== i,
                isVideo: 2 === i
            })), void wx.redirectTo({
                url: "../../post/chooseTargetGrpPage/chooseTargetGrpPage"
            });
            if (0 === f.length && 0 !== g.trim().length) return wx.showLoading && wx.showLoading({
                title: "发表中",
                mask: !0
            }), void b(c.postMoment({
                token: e,
                gid: h,
                qids: [],
                desc: g,
                success: function(a) {
                    wx.hideLoading && wx.hideLoading(), wx.navigateBack(), m.refreshContent && m.refreshContent(function() {
                        m.setData({
                            newestPostMomID: a && a.id
                        });
                    });
                },
                fail: function(b) {
                    wx.hideLoading(), a.xu.showToast(b);
                }
            }));
            switch (i) {
              case 0:
                d.handlePostMoment(f);
                break;

              case 1:
                d.handlePostMoment(f, !0);
                break;

              case 2:
                d.handlePostMoment(f, !0, !0);
                break;

              default:
            }
        },
        handlePostMoment: function(b, c, d) {
            var e = this, f = this.data.groupInfo.isInGroup, g = a.xu.token, h = this.data.gid, i = this.data.desc, j = c ? "uploadLocalImgPRO" : "uploadLocalImg";
            c || setTimeout(function() {
                wx.hideLoading && wx.hideLoading(), wx.showLoading && wx.showLoading({
                    title: "发表中",
                    mask: !0
                });
            }, 100), this[j]({
                isVideo: d,
                tempPaths: b,
                formData: {
                    token: g,
                    gid: h
                },
                successCB: function(a) {
                    e.postMomentFn(b, a, c);
                }
            });
        },
        postMomentFn: function(d, e, f) {
            console.log(e);
            var g = this, h = a.xu.token, j = this.data.gid, k = this.data.desc, l = getCurrentPages(), m = l[l.length - 1], n = l[l.length - 2];
            i.createProImageObjArr(d).then(function(a) {
                b(c.postMoment({
                    token: h,
                    gid: j,
                    qids: e,
                    desc: k,
                    resFeedImageArr: a,
                    success: function(a) {
                        wx.navigateBack(), n.refreshContent ? n.refreshContent(function() {
                            f && wx.showLoading && wx.showLoading({
                                title: "已完成100%",
                                mask: !0
                            }), n.setData({
                                newestPostMomID: a && a.id
                            });
                        }) : f && wx.showLoading && wx.showLoading({
                            title: "已完成100%",
                            mask: !0
                        });
                    },
                    fail: function() {
                        wx.hideLoading && wx.hideLoading(), wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(a) {
                                a.confirm ? (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), g.postMomentFn(d, e)) : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                }));
            });
        },
        uploadLocalImg: function(a) {
            for (var b = this, c = a.tempPaths, d = a.formData, e = a.successCB, g = a.failureCB, h = [], j = 0; j < c.length; j++) (function(j) {
                var i = c[j];
                wx.uploadFile({
                    url: f.uploadUrl,
                    filePath: i,
                    name: "file",
                    formData: d,
                    success: function(a) {
                        console.log(a);
                        var d = JSON.parse(a.data).ret;
                        h[j] = 1 === d ? JSON.parse(a.data).data.list[0].qid || -1 : -1, console.log(h[j]), 
                        console.log(j, h, h.length, c.length, b.checkIfArrIsFull(h, c.length));
                    },
                    fail: function() {
                        h[j] = -1, console.log(j, h, h.length, c.length, b.checkIfArrIsFull(h, c.length));
                    },
                    complete: function() {
                        b.checkIfArrIsFull(h, c.length) && (console.log(h), h.find(function(a) {
                            return -1 === a;
                        }) ? (wx.hideLoading && wx.hideLoading(), h = [], uploadNeedBreak = !0, g && g(res), 
                        wx.showModal({
                            title: "上传失败",
                            content: "网络原因,上传图片失败,是否重试?",
                            confirmText: "重试",
                            success: function(c) {
                                c.confirm ? (wx.showLoading && wx.showLoading({
                                    title: "发表中",
                                    mask: !0
                                }), b.uploadLocalImg(a)) : c.cancel && console.log("用户点击取消");
                            }
                        })) : (console.log("传完了"), e && e(h)));
                    }
                });
            })(j);
        },
        uploadLocalImgPRO: function(a) {
            var b = a.isVideo, c = this, d = a.tempPaths[0], e = a.tempPaths, g = a.formData, h = a.successCB, i = a.failureCB, j = [], k = wx.uploadFile({
                url: b ? f.uploadVideoUrl : f.uploadUrl,
                filePath: d,
                name: "file",
                formData: g,
                success: function(a) {
                    console.log(a);
                    var b = JSON.parse(a.data).ret;
                    j[0] = 1 === b ? JSON.parse(a.data).data.list[0].qid || -1 : -1, console.log(j[0]), 
                    console.log(0, j, j.length, e.length, c.checkIfArrIsFull(j, e.length));
                },
                fail: function() {
                    j[0] = -1, console.log(0, j, j.length, e.length, c.checkIfArrIsFull(j, e.length));
                },
                complete: function() {
                    c.checkIfArrIsFull(j, e.length) && (console.log(j), j.find(function(a) {
                        return -1 === a;
                    }) ? (wx.hideLoading && wx.hideLoading(), j = [], uploadNeedBreak = !0, i && i(res), 
                    wx.showModal({
                        title: "上传失败",
                        content: "网络原因,上传图片失败,是否重试?",
                        confirmText: "重试",
                        success: function(b) {
                            b.confirm ? (wx.showLoading && wx.showLoading({
                                title: "发表中",
                                mask: !0
                            }), c.uploadLocalImgPRO(a)) : b.cancel && console.log("用户点击取消");
                        }
                    })) : (console.log("传完了"), h && h(j)));
                }
            });
            k && k.onProgressUpdate(function(a) {
                wx.showLoading && wx.showLoading({
                    title: "已完成" + (0 > a.progress - 1 ? 0 : a.progress - 1) + "%",
                    mask: !0
                });
            });
        },
        checkIfArrIsFull: function(a, b) {
            if (a.length !== b) return !1;
            for (var c, d = 0; d < a.length; d++) if (c = a[d], !c) return !1;
            return !0;
        },
        onPhotoTap: function(a) {
            var b = a.currentTarget.dataset.photoIndex, c = this.data.tempFilePaths;
            wx.previewImage({
                current: c[b],
                urls: c
            });
        },
        onVideoTap: function(a) {
            var b = a.currentTarget.dataset.photoIndex, c = this.data.tempFilePaths, d = c[b];
            wx.navigateTo({
                url: "../../common/videoPlayPage/videoPlayPage?src=" + encodeURIComponent(d)
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
        }
    });
})();