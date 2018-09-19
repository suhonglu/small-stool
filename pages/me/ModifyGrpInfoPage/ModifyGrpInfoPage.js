(function() {
    var a = getApp(), b = require("../../../config/config.js"), c = require("../../../common/utils.js"), d = require("../../../xng_modules/object-assign/index.js"), e = a.store.dispatch, f = require("../../../actions/userGroup.js"), g = require("../../../actions/index.js");
    Page({
        data: {
            navBar: {
                hasBackBtn: !0,
                onLeftTap: "onNavBarLeftTap",
                rightText: "确定",
                rightDisable: !0,
                onRightTap: "handleModifyGrpInfo"
            },
            toast: {
                hidden: !0,
                text: ""
            },
            gid: "",
            targetAttr: "",
            inpInitValue: "",
            inpLiveValue: ""
        },
        tplMsgFormSubmit: c.tplMsgFormSubmit,
        onLoad: function(b) {
            a.xu.mta.Page.init();
            var c = a.xu.token, d = b.gid, e = b.attr;
            this.setData({
                gid: d,
                targetAttr: e
            });
        },
        onReady: function() {
            var a = this.data.inpBeforeValue;
            this.setData({
                inpInitValue: a
            });
        },
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        mapStateToData: function(a) {
            var b = this.data.gid, c = this.data.targetAttr, d = a.entities.feedFlowList[b].groupData, e = d[c];
            this.setData({
                inpBeforeValue: e
            });
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        handleRequestErr: function(b) {
            a.xu.showToast(b);
        },
        handleInput: function(a) {
            var b = a.detail.value.trim(), c = this, e = this.data.navBar;
            this.setData({
                inpLiveValue: b,
                navBar: d({}, e, {
                    rightDisable: !b
                })
            });
        },
        handleModifyGrpInfo: function() {
            var a = this.data.inpLiveValue, b = this.data.targetAttr;
            this.modifyGrpInfoFn(b, a);
        },
        modifyGrpInfoFn: function(b, c) {
            var d = this;
            console.log(b, c);
            var f = "";
            switch (b) {
              case "name":
                f = "modifyGrpName";
                break;

              case "desc":
                f = "modifyGrpDesc";
                break;

              default:
                return;
            }
            var h = a.xu.token, i = this.data.gid;
            wx.showLoading && wx.showLoading({
                title: "修改中",
                mask: !0
            }), e(g[f]({
                token: h,
                gid: i,
                value: c,
                success: function() {
                    wx.hideLoading && wx.hideLoading(), wx.navigateBack(), wx.showToast({
                        title: "修改成功",
                        duration: 1e3
                    });
                },
                fail: function(a) {
                    wx.hideLoading && wx.hideLoading();
                    var b = d.data.inpLiveValue;
                    d.setData({
                        inpInitValue: b
                    }), d.handleRequestErr(a);
                }
            }));
        }
    });
})();