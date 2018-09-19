(function() {
    var a = getApp();
    Page({
        data: {
            pics: [ "../../../src/img/tutorial/changeWeixinAvatar/step_1.jpg", "../../../src/img/tutorial/changeWeixinAvatar/step_2.jpg", "../../../src/img/tutorial/changeWeixinAvatar/step_3.jpg", "../../../src/img/tutorial/changeWeixinAvatar/step_4.jpg" ]
        },
        onLoad: function() {
            wx.setNavigationBarTitle({
                title: "教程-修改微信头像"
            }), a.xu.mta.Page.init();
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function() {
            return {
                title: "如何修改微信头像"
            };
        },
        onPhotoTap: function() {}
    });
})();