(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/tia.js");
    Page({
        data: {},
        onLoad: function(d) {
            var e = a.xu.token;
            b(c.fetchProfileInfo({
                token: e,
                success: function(a) {
                    a.group && a.group.id ? "course" === d.to ? wx.navigateTo({
                        url: "/pages/tia/tiaCourseListPage/tiaCourseListPage?gid=" + a.group.id
                    }) : "homework" === d.to && wx.navigateTo({
                        url: "/pages/me/myTiaHomeworkPage/myTiaHomeworkPage?gid=" + a.group.id
                    }) : wx.switchTab({
                        url: "/pages/moments/recommendFeedFlowPage/recommendFeedFlowPage"
                    });
                }
            }));
        }
    });
})();