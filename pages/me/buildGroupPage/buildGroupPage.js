(function() {
    var a = require("../../../actions/allAlbum.js"), b = require("../../../actions/index.js"), c = getApp(), d = c.store.dispatch, f = require("../../../common/utils.js");
    Page({
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0
            },
            toast: {
                hidden: !0,
                text: ""
            }
        },
        tplMsgFormSubmit: f.tplMsgFormSubmit,
        onLoad: function(a) {
            wx.setNavigationBarTitle({
                title: "新建相册"
            }), c.xu.mta.Page.init();
            var b = +a.type;
            this.setData({
                type: b
            });
        },
        formSubmitQuit: function(a) {
            var e = a.detail.value.gid, f = c.xu.token;
            d(b.quitGroup(f, e));
        },
        formSubmitAdd: function(a) {
            var e = this, g = this.data.type, h = a.detail.value, i = c.xu.token, j = h.desc.trim(), k = h.name.trim();
            f.tplMsgFormSubmit(a), wx.showLoading && wx.showLoading({
                title: "新建中",
                mask: !0
            });
            var l;
            switch (g) {
              case 2:
                l = "addPersonalGroup";
                break;

              case 10:
                l = "addAlbumGroup";
                break;

              default:
                l = "addGroup";
            }
            d(b[l](i, j, k, function(a) {
                wx.showToast({
                    title: "新建成功",
                    duration: 3e3
                }), wx.reLaunch ? wx.reLaunch({
                    url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + a.list.id
                }) : wx.redirectTo({
                    url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + a.list.id
                });
            }, function(a) {
                wx.hideLoading && wx.hideLoading(), c.xu.showToast(a);
            }));
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        }
    });
})();