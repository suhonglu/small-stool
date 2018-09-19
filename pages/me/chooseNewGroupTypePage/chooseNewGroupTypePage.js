(function() {
    var a = require("../../../actions/allAlbum.js"), b = require("../../../actions/index.js"), c = getApp(), d = c.store.dispatch, e = require("../../../common/utils.js"), f = require("../../../const/toastText.js");
    Page({
        data: {
            types: [ {
                name: "绑定相册",
                icoClass: "fa fa-weixin",
                desc: "分享到群聊，绑定微信群",
                hasShareFn: !0,
                onTap: "",
                bgSrc: "../../../src/image/grass&guitar.jpg"
            }, {
                name: "群相册",
                icoClass: "fa fa-group",
                desc: "可以分享出去, 大家一起玩",
                onTap: "handleBuildCommonGrp",
                bgSrc: "../../../src/image/woman_inWild.jpg"
            }, {
                name: "个人相册",
                icoClass: "fa fa-lock",
                desc: "私密相册, 个人私有",
                onTap: "handleBuildPersonGrp",
                bgSrc: "../../../src/image/dandelion.jpg"
            } ],
            toast: {
                hidden: !0,
                text: ""
            }
        },
        tplMsgFormSubmit: e.tplMsgFormSubmit,
        onLoad: function() {
            wx.setNavigationBarTitle({
                title: "新建群类型"
            }), c.xu.mta.Page.init(), wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            });
        },
        onReady: function() {},
        onShareAppMessage: function() {
            var a = c.xu.token;
            return {
                title: "邀请您关注群相册",
                path: "/pages/moments/feedFlowPage/feedFlowPage",
                imageUrl: "../../../src/image/xbd-Logo.jpg",
                success: function(e) {
                    e.shareTickets ? (wx.showLoading && wx.showLoading({
                        title: "创建中...",
                        mask: !0
                    }), c.handleBuildShareGroup(e.shareTickets[0]).then(function(c) {
                        d(b.getUserGroupsList(a)), wx.redirectTo({
                            url: "/pages/moments/feedFlowPage/feedFlowPage?gid=" + c.list.id,
                            success: function() {
                                wx.showToast({
                                    title: "创建成功"
                                });
                            }
                        });
                    }).catch(function() {
                        wx.hideLoading && wx.hideLoading(), c.xu.showToast(f.BUILD_SHARE_GROUP_ERROR);
                    })) : c.handleDecryptShareInfo(e.shareTickets[0]);
                }
            };
        },
        handleBuildCommonGrp: function() {
            wx.redirectTo({
                url: "../../me/buildGroupPage/buildGroupPage"
            });
        },
        handleBuildPersonGrp: function() {
            wx.redirectTo({
                url: "../../me/buildGroupPage/buildGroupPage?type=2"
            });
        },
        handleNavBack: function() {
            wx.navigateBack();
        }
    });
})();