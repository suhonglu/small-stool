(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../actions/postMoment.js"), f = require("../../../actions/feedFlow.js"), g = require("../../../actions/userGroup.js"), h = require("../../../actions/recommend.js"), i = require("../../../xng_modules/object-assign/index.js"), j = require("../../../common/utils.js"), k = require("../../../common/wxUtils.js"), l = require("../../../xng_modules/array-find-index/index.js"), m = require("../../../config/config.js"), n = require("../../../xng_modules/es6-promise.min.js").Promise;
    Page({
        tplMsgFormSubmit: j.tplMsgFormSubmit,
        data: {},
        onLoad: function(b) {
            var c, d;
            a.xu.mta.Page.init(), this.gid = b.gid, this.path = b.path, this.lessonid = b.lessonid, 
            c = {
                gid: b.gid,
                lessonid: b.lessonid,
                state: "questionnaire"
            }, d = this.path + "/train/?" + j.encodeSearchParams(c), this.setData({
                webViewUrl: d
            });
        },
        onShow: function() {}
    });
})();