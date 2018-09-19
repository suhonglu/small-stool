(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/postMoment.js"), e = require("../../../actions/feedFlow.js"), f = require("../../../actions/userGroup.js"), g = require("../../../actions/recommend.js"), h = require("../../../xng_modules/object-assign/index.js"), i = require("../../../common/utils.js"), j = require("../../../common/wxUtils.js"), k = require("../../../xng_modules/array-find-index/index.js"), l = require("../../../config/config.js");
    Page({
        tplMsgFormSubmit: i.tplMsgFormSubmit,
        data: {
            filePath: "",
            imageBoxWidth: a.sysInfo.windowWidth ? Math.floor((a.sysInfo.windowWidth - 40 + 8) / 3) - 8 : 60,
            needShowHatGroupEntry: !1
        },
        onLoad: function(c) {
            a.xu.mta.Page.init();
            var d = this;
            this.setData({
                imgUrl: c.url,
                filePath: c.shareUrl,
                activeGid: c.gid,
                initQid: c.qid,
                currentFrameId: c.currentFrameId,
                shareDesc: decodeURIComponent(c.shareDesc || "")
            }), b(f.getHatGroup({
                token: a.xu.token,
                gid: d.data.activeGid,
                success: function(a) {
                    console.log(a), d.setData({
                        hatGroupInfo: a.ginfo
                    });
                }
            }));
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function() {
            var a = this, b = this.data.filePath, c = this.data.shareDesc, d = this.data.initQid, e = this.data.currentFrameId, f = "/pages/tool/avatarEditorFramePage/avatarEditorFramePage" + (e ? "?currentFrameId=" + e : "") + (d ? "&qid=" + d : "");
            return console.log("分享链接是", f), {
                title: c || "我的装饰太棒了! 也送你一个",
                path: f,
                imageUrl: b,
                success: function() {
                    a.setData({
                        needShowHatGroupEntry: !0
                    });
                }
            };
        },
        onPhotoTap: function() {
            var a = this.data.imgUrl;
            wx.previewImage({
                current: a,
                urls: [ a ]
            });
        },
        onHatGroupEntryTap: function(a) {
            var b = a.currentTarget.dataset.gid;
            wx.navigateTo({
                url: "../../moments/feedFlowPage/feedFlowPage?gid=" + b
            });
        },
        handleSaveOriginWxAvatar: function() {
            a.xu.userInfo ? this.handleDownloadUserAvatar(a.xu.userInfo.avatarUrl).then(function() {
                a.xu.showToast("保存成功");
            }).catch(function() {
                a.xu.showToast("保存失败, 请点击重试");
            }) : this.handleFetchUserAvatar().then(this.handleDownloadUserAvatar).then(function() {
                a.xu.showToast("保存成功");
            }).catch(function() {
                a.xu.showToast("保存失败, 请点击重试");
            });
        },
        handleFetchUserAvatar: function() {
            return new Promise(function(b, c) {
                wx.getUserInfo({
                    success: function(c) {
                        a.xu.userInfo = c.userInfo, b(c.userInfo.avatarUrl);
                    },
                    fail: c
                });
            });
        },
        handleDownloadUserAvatar: function(a) {
            return console.log(a), new Promise(function(b, c) {
                wx.downloadFile({
                    url: a,
                    success: function(a) {
                        wx.saveImageToPhotosAlbum({
                            filePath: a.tempFilePath,
                            success: b,
                            fail: c
                        });
                    },
                    fail: c
                });
            });
        },
        onRetryBtnClick: function() {
            var a = getCurrentPages(), b = a[a.length - 2];
            b.setData({
                mode: "edit"
            }), wx.navigateBack();
        }
    });
})();