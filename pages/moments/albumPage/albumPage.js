(function() {
    var a = Math.floor, b = getApp(), c = b.store.dispatch, d = require("../../../actions/allAlbum.js"), e = require("../../../config/config.js"), f = require("../../../common/utils.js"), g = require("../../../common/utils.js").formatUnixTime2YMD, h = require("../../../xng_modules/array-find-index/index.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../xng_modules/lodash.merge/index.js"), k = b.sysInfo.windowWidth, l = b.sysInfo.pixelRatio;
    Page({
        data: {
            navBar: {
                bgColor: "black",
                midText: "相册",
                hasBackBtn: !0,
                rightText: "选择",
                onLeftTap: "onNavBarLeftTap",
                onRightTap: "selectImg"
            },
            hasContent: !0,
            inSelectMode: 0,
            groupInfo: {},
            token: "",
            imageBoxWidth: 60,
            photos: [],
            photoGroups: [],
            previewURLs: [],
            actionSheet: {
                hidden: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            nextStartTime: -1,
            hasNext: !0,
            isFetching: !1,
            isOwner: !1,
            reachBottomFetchFail: !1
        },
        tplMsgFormSubmit: f.tplMsgFormSubmit,
        mapStateToData: function(a) {
            var c = this.data.gid, d = a.entities.feedFlowList[c] ? a.entities.feedFlowList[c].groupData : {}, e = b.xu.token, f = a.allAlbum.allAlbum.photos, j = a.allAlbum.allAlbum.hasNext, k = a.allAlbum.allAlbum.isOwner, l = a.allAlbum.allAlbum.isFetching, m = [];
            f.forEach(function(a) {
                var b = g(a.upt, " / "), c = g(a.upt);
                (0 == m.length || -1 === h(m, function(a) {
                    return a.displayTime == b;
                })) && m.push({
                    displayTime: b,
                    displayTime2: c,
                    photos: []
                });
                var d = h(m, function(a) {
                    return a.displayTime == b;
                });
                m[d].photos.push(a);
            }), this.setData({
                imageBoxWidth: b.sysInfo.windowWidth ? (b.sysInfo.windowWidth - 40 + 4) / 3 - 4 : 60,
                photos: f.map(function(a) {
                    return i(a, {
                        isChecked: !1
                    });
                }),
                groupInfo: d,
                token: e,
                hasNext: j,
                isFetching: l,
                nextStartTime: f[f.length - 1] ? f[f.length - 1].upt : -1,
                photoGroups: m,
                isOwner: !!k
            });
        },
        onLoad: function(a) {
            b.xu.mta.Page.init();
            var e = this;
            this.setData({
                gid: a.gid
            }), this.mapStateToData(b.store.getState()), wx.showLoading && wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var f = this.data.groupInfo.id, g = b.xu.token;
            c(d.acFetchAlbum(g, f, null, function() {
                e.setData({
                    hasContent: !!e.data.photos.length
                }), wx.hideLoading && wx.hideLoading();
            }, function(a) {
                wx.hideLoading && wx.hideLoading(), e.handleRequestErr(a);
            }));
        },
        onReady: function() {},
        onShow: function() {},
        onReachBottom: function() {
            var a = this, b = this.data.inSelectMode, e = this.data.groupInfo.id, f = this.data.token, g = this.data.nextStartTime;
            if (this.setData({
                reachBottomFetchFail: !1
            }), this.data.hasNext && !this.data.isFetching) {
                wx.showNavigationBarLoading();
                var h = a.getCheckedPhotos().map(function(a) {
                    return a.id;
                });
                c(d.acFetchAlbum(f, e, g, function() {
                    a.setData({
                        photoGroups: a.data.photoGroups.map(function(a) {
                            var b = a.photos.map(function(a) {
                                return -1 != h.indexOf(a.id) && (a.isChecked = !0), a;
                            });
                            return a.photos = b, a;
                        })
                    }), wx.hideNavigationBarLoading(), a.setData({
                        reachBottomFetchFail: !0
                    });
                }, function() {
                    wx.hideNavigationBarLoading(), a.setData({
                        reachBottomFetchFail: !0
                    });
                }));
            }
        },
        onHide: function() {},
        onUnload: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        handleRequestErr: function(a) {
            b.xu.showToast(a);
        },
        selectImg: function() {
            if (this.data.hasContent) {
                var a = this.data.isOwner;
                this.setData({
                    navBar: {
                        bgColor: "black",
                        midText: "相册",
                        hasBackBtn: !0,
                        onLeftTap: "onNavBarLeftTap",
                        rightBtns: a ? [ {
                            text: "取消",
                            handleTap: "cancelSelectImg"
                        }, {
                            faClassName: "fa-trash",
                            handleTap: "onDeleteImg"
                        } ] : [ {
                            text: "取消",
                            handleTap: "cancelSelectImg"
                        } ]
                    },
                    inSelectMode: 1
                });
            }
        },
        cancelSelectImg: function() {
            var a = this.data.photoGroups.map(function(a) {
                return a;
            });
            a.forEach(function(a) {
                a.photos.forEach(function(a) {
                    a.isChecked = !1;
                }), a.hasSelectAll = !1;
            }), this.setData({
                navBar: {
                    bgColor: "black",
                    midText: "相册",
                    hasBackBtn: !0,
                    onLeftTap: "onNavBarLeftTap",
                    rightText: "选择",
                    onRightTap: "selectImg"
                },
                inSelectMode: 0,
                photoGroups: a
            });
        },
        onPicErr: function(a) {
            var b = a.currentTarget.dataset.groupidx, c = a.currentTarget.dataset.index, d = this.data.photoGroups.map(function(a) {
                return a;
            });
            console.log(b, c), d[b].photos[c].small_url = "../../../src/image/image_error.png", 
            this.setData({
                photoGroups: d
            });
        },
        onPhotoTap: function(a) {
            var b = a.currentTarget.dataset.src, c = a.currentTarget.dataset.qid, d = this.data.token, f = this.data.groupInfo.id, g = this;
            console.log(a.currentTarget.dataset.photoIndex), g.data.previewURLs.length ? wx.previewImage({
                current: b,
                urls: g.data.previewURLs
            }) : this.request500pics(e.apiDomain + "/group/get_group_images", d, f, -1, function() {
                wx.previewImage({
                    current: b,
                    urls: g.data.previewURLs
                });
            });
        },
        onCheckPhoto: function(a) {
            console.log(a.currentTarget.dataset);
            var b = a.currentTarget.dataset.groupidx, c = a.currentTarget.dataset.index, d = this.data.photoGroups.concat([]);
            d[b].photos[c].isChecked = !d[b].photos[c].isChecked, d[b].hasSelectAll = d[b].photos.every(function(a) {
                return !0 == a.isChecked;
            }), this.setData({
                photoGroups: d
            });
        },
        onOneGroupSelect: function(a) {
            var b = a.currentTarget.dataset.groupidx, c = this.data.photoGroups.concat([]);
            c[b].hasSelectAll ? c[b].photos.forEach(function(a) {
                a.isChecked = !1;
            }) : c[b].photos.forEach(function(a) {
                a.isChecked = !0;
            }), c[b].hasSelectAll = c[b].photos.every(function(a) {
                return !0 == a.isChecked;
            }), this.setData({
                photoGroups: c
            });
        },
        getCheckedPhotos: function() {
            var a = [], b = this.data.photoGroups.map(function(a) {
                return a;
            });
            return b.forEach(function(b) {
                b.photos.forEach(function(b) {
                    b.isChecked && a.push(b);
                });
            }), console.log(a), a;
        },
        request500pics: function(b, c, d, f, g) {
            var h = this;
            wx.request({
                url: b,
                data: {
                    qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(k * l) + "x/quality/97/interlace/1",
                    small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + a(k * l / 3) + "x" + a(k * l / 3) + "r/interlace/1/format/jpg",
                    gid: d,
                    token: c,
                    start_t: f,
                    limit: e.fetchNum
                },
                method: "POST",
                success: function(a) {
                    var e = a.data.data.list, i = e.map(function(a) {
                        return a.url;
                    }), j = h.data.previewURLs.concat(i);
                    return h.setData({
                        previewURLs: j
                    }), 500 <= j.length || 0 === i.length ? void g() : void (f = e[e.length - 1].upt, 
                    h.request500pics(b, c, d, f, g));
                },
                fail: function() {},
                complete: function() {}
            });
        },
        downloadimg: function(a) {
            var b = this, c = a.i ? a.i : 0, d = a.success ? a.success : 0, e = a.fail ? a.fail : 0;
            wx.downloadFile({
                url: a.urls[c],
                success: function(b) {
                    d++, a.successCB(b.tempFilePath);
                },
                fail: function() {
                    e++, console.log("第" + c + "个 当前失败数:" + e);
                },
                complete: function() {
                    console.log(c), c++, c == a.urls.length ? (console.log("执行完毕"), console.log("成功：" + d + " 失败：" + e), 
                    b.setData({
                        toast: {
                            hidden: !1,
                            text: "保存完毕"
                        }
                    }), setTimeout(function() {
                        b.setData({
                            toast: {
                                hidden: !0
                            }
                        });
                    }, 3e3)) : (console.log(c), a.i = c, a.success = d, a.fail = e, b.downloadimg(a));
                }
            });
        },
        onSaveLocal: function() {
            var a = this, b = this.getCheckedPhotos().map(function(a) {
                return a.url;
            });
            if (0 === b.length) return void a.cancelSelectImg();
            this.downloadimg({
                urls: b,
                successCB: function(b) {
                    wx.saveImageToPhotosAlbum({
                        filePath: b,
                        success: function() {
                            console.log("成功下载到本地");
                        },
                        fail: function() {
                            console.log("失败下载到本地");
                        },
                        complete: function() {
                            a.cancelSelectImg();
                        }
                    });
                }
            });
        },
        onSaveCloud: function() {
            var b = this.getCheckedPhotos().map(function(a) {
                return a.qid;
            }), c = this;
            if (0 === b.length) return void c.cancelSelectImg();
            var d = this.data.groupInfo.id, f = this.data.token;
            wx.request({
                url: e.apiDomain + "/group/save_img_2_xng",
                data: {
                    arr_qids: b,
                    gid: d,
                    qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(k * l) + "x/quality/97/interlace/1/format/jpg",
                    small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + a(k * l / 3) + "x" + a(k * l / 3) + "r/interlace/1/format/jpg",
                    token: f
                },
                header: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                success: function(a) {
                    console.log(a), c.setData({
                        toast: {
                            hidden: !1,
                            text: "保存完成,失败数:" + a.data.data.fail_list.length
                        }
                    });
                },
                fail: function() {
                    c.setData({
                        toast: {
                            hidden: !1,
                            text: "保存失败"
                        }
                    });
                },
                complete: function() {
                    c.setData({
                        actionSheet: {
                            hidden: !0
                        }
                    }), c.cancelSelectImg(), console.log("保存请求结束"), setTimeout(function() {
                        c.setData({
                            toast: {
                                hidden: !0
                            }
                        });
                    }, 1e3);
                }
            });
        },
        onDeleteImg: function() {
            var a = this, c = this.getCheckedPhotos().map(function(a) {
                return a.id;
            });
            if (0 === c.length) return void b.xu.showToast("请选择想要刪除的照片");
            var d = this.data.groupInfo.id, e = this.data.token;
            wx.showModal({
                title: "确定删除吗?",
                content: "删除后可以在回收站恢复",
                confirmText: "确定",
                success: function(b) {
                    b.confirm && a.handleDelImgs(c);
                }
            });
        },
        handleDelImgs: function(a) {
            var b = this, e = this.data.groupInfo.id, f = this.data.token;
            wx.showLoading && wx.showLoading({
                title: "删除中",
                mask: !0
            }), c(d.delImgs({
                token: f,
                gid: e,
                ids: a,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), b.setData({
                        inSelectMode: !1,
                        navBar: {
                            bgColor: "black",
                            midText: "相册",
                            hasBackBtn: !0,
                            rightText: "选择",
                            onLeftTap: "onNavBarLeftTap",
                            onRightTap: "selectImg"
                        },
                        hasContent: !!b.data.photos.length
                    });
                },
                fail: function(a) {
                    wx.hideLoading && wx.hideLoading(), b.handleRequestErr(a);
                }
            }));
        },
        onTranshCanEntryTap: function() {
            var a = this.data.gid;
            wx.navigateTo({
                url: "../transhCanPage/transhCanPage?gid=" + a
            });
        }
    });
})();