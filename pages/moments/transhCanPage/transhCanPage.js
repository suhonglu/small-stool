(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/allAlbum.js"), d = require("../../../config/config.js"), e = require("../../../common/utils.js"), f = require("../../../common/utils.js").formatUnixTime2YMD, g = require("../../../xng_modules/array-find-index/index.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../xng_modules/lodash.merge/index.js"), j = a.sysInfo.windowWidth, k = a.sysInfo.pixelRatio;
    Page({
        data: {
            navBar: {
                bgColor: "black",
                midText: "回收站",
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
            reachBottomFetchFail: !1
        },
        tplMsgFormSubmit: e.tplMsgFormSubmit,
        mapStateToData: function(b) {
            var c = this.data.gid, d = b.entities.feedFlowList[c].groupData, e = a.xu.token, i = b.allAlbum.recycleImgs.photos, j = b.allAlbum.recycleImgs.hasNext, k = b.allAlbum.recycleImgs.isFetching, l = [];
            i.forEach(function(a) {
                var b = f(a.upt, " / "), c = f(a.upt);
                (0 == l.length || -1 === g(l, function(a) {
                    return a.displayTime == b;
                })) && l.push({
                    displayTime: b,
                    displayTime2: c,
                    photos: []
                });
                var d = g(l, function(a) {
                    return a.displayTime == b;
                });
                l[d].photos.push(a);
            }), this.setData({
                imageBoxWidth: a.sysInfo.windowWidth ? (a.sysInfo.windowWidth - 40 + 4) / 3 - 4 : 60,
                photos: i.map(function(a) {
                    return h(a, {
                        isChecked: !1
                    });
                }),
                groupInfo: d,
                token: e,
                hasNext: j,
                isFetching: k,
                nextStartTime: i[i.length - 1] ? i[i.length - 1].upt : -1,
                photoGroups: l
            });
        },
        onLoad: function(d) {
            a.xu.mta.Page.init();
            var e = this;
            this.setData({
                gid: d.gid
            }), this.mapStateToData(a.store.getState()), wx.showLoading && wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var f = this.data.groupInfo.id, g = a.xu.token;
            b(c.acFetchRecycleImgs({
                token: g,
                gid: f,
                success: function() {
                    e.setData({
                        hasContent: !!e.data.photos.length
                    }), wx.hideLoading && wx.hideLoading();
                },
                fail: function(a) {
                    wx.hideLoading && wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        },
        onReady: function() {},
        onShow: function() {},
        onReachBottom: function() {
            var a = this, d = this.data.inSelectMode, e = this.data.groupInfo.id, f = this.data.token, g = this.data.nextStartTime;
            if (this.setData({
                reachBottomFetchFail: !1
            }), this.data.hasNext && !this.data.isFetching) {
                wx.showNavigationBarLoading();
                var h = a.getCheckedPhotos().map(function(a) {
                    return a.id;
                });
                b(c.acFetchRecycleImgs({
                    token: f,
                    gid: e,
                    nextStartTime: g,
                    success: function() {
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
                    },
                    fail: function() {
                        wx.hideNavigationBarLoading(), a.setData({
                            reachBottomFetchFail: !0
                        });
                    }
                }));
            }
        },
        onHide: function() {},
        onUnload: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        selectImg: function() {
            this.data.hasContent && this.setData({
                navBar: {
                    bgColor: "black",
                    midText: "回收站",
                    hasBackBtn: !0,
                    onLeftTap: "onNavBarLeftTap",
                    rightBtns: [ {
                        text: "取消",
                        handleTap: "cancelSelectImg"
                    } ]
                },
                inSelectMode: 1
            });
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
                    midText: "回收站",
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
            var b = a.currentTarget.dataset.src, c = a.currentTarget.dataset.qid, e = this.data.token, f = this.data.groupInfo.id, g = this;
            console.log(a.currentTarget.dataset.photoIndex), g.data.previewURLs.length ? wx.previewImage({
                current: b,
                urls: g.data.previewURLs
            }) : this.request500pics(d.apiDomain + "/group/get_recycle_imgs", e, f, -1, function() {
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
        request500pics: function(a, b, c, e, f) {
            var g = Math.floor, h = this;
            wx.request({
                url: a,
                data: {
                    qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + g(j * k) + "x/quality/97/interlace/1",
                    small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + g(j * k / 3) + "x" + g(j * k / 3) + "r/interlace/1/format/jpg",
                    gid: c,
                    token: b,
                    start_t: e,
                    limit: d.fetchNum
                },
                method: "POST",
                success: function(d) {
                    var g = d.data.data.list, i = g.map(function(a) {
                        return a.url;
                    }), j = h.data.previewURLs.concat(i);
                    return h.setData({
                        previewURLs: j
                    }), 500 <= j.length || 0 === i.length ? void f() : void (e = g[g.length - 1].upt, 
                    h.request500pics(a, b, c, e, f));
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
        onRecoverImg: function() {
            var b = this, c = this.getCheckedPhotos().map(function(a) {
                return a.id;
            });
            if (0 === c.length) return void a.xu.showToast("请选择想要恢复的照片");
            var d = this.data.groupInfo.id, e = this.data.token;
            wx.showModal({
                title: "确定恢复吗?",
                content: "恢复后可以在群相册里看到",
                confirmText: "确定",
                success: function(a) {
                    a.confirm && b.handleRecoverImgs(c);
                }
            });
        },
        handleRecoverImgs: function(d) {
            var e = this, f = this.data.groupInfo.id, g = this.data.token, h = getCurrentPages(), i = h[h.length - 1], j = h[h.length - 2];
            wx.showLoading && wx.showLoading({
                title: "恢复中",
                mask: !0
            }), b(c.recoverImgs({
                token: g,
                gid: f,
                ids: d,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), e.setData({
                        inSelectMode: !1,
                        navBar: {
                            bgColor: "black",
                            midText: "回收站",
                            hasBackBtn: !0,
                            rightText: "选择",
                            onLeftTap: "onNavBarLeftTap",
                            onRightTap: "selectImg"
                        },
                        hasContent: !!e.data.photos.length
                    }), b(c.acFetchAlbum(g, f, null, function() {
                        j.mapStateToData(a.store.getState()), j.setData({
                            hasContent: !0
                        });
                    }));
                },
                fail: function(a) {
                    wx.hideLoading && wx.hideLoading(), e.handleRequestErr(a);
                }
            }));
        }
    });
})();