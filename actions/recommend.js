(function() {
    var a = Math.floor, b = require("../const/actionType.js"), c = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, d = require("../config/config.js"), e = require("../schemas/schemas.js"), f = getApp(), g = require("../xng_modules/object-assign/index.js"), h = f.sysInfo.pixelRatio, i = f.sysInfo.windowWidth * h, j = f.sysInfo.windowHeight * h;
    module.exports = {
        fetchRecommendList: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_RECOMMEND_LIST_REQUEST, b.FETCH_RECOMMEND_LIST_SUCCESS, b.FETCH_RECOMMEND_LIST_FAILURE ],
                    url: d.apiDomain + "/recommend/get_recommend_contents",
                    param: JSON.stringify({
                        src: c.pageFirstLoadOriginPath,
                        fetch_trigger: c.fetchTrigger,
                        token: c.token,
                        chid: c.chid || 1,
                        start_num: c.startNum || 0,
                        limit: c.limit || d.fetchNum,
                        gid: c.gid,
                        cid: c.cid,
                        contain_start: c.contain_start,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(i) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(i) + "x" + a(.8 * j) + "/quality/97/interlace/1/format/jpg",
                        noclean: c.noclean,
                        pre: c.pre
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: c.success,
                    failCallback: c.fail,
                    completeCallback: c.complete
                },
                limit: c.limit || d.fetchNum,
                startNum: c.startNum,
                pre: c.pre,
                needOverride: c.needOverride
            };
        },
        fetchFakeRecommendList: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_FAKE_RECOMMEND_LIST_REQUEST, b.FETCH_FAKE_RECOMMEND_LIST_SUCCESS, b.FETCH_FAKE_RECOMMEND_LIST_FAILURE ],
                    url: d.apiDomain + "/recommend/get_recommend_contents_nologin",
                    param: JSON.stringify({
                        chid: c.chid || 1,
                        start_num: c.startNum || 0,
                        limit: c.limit || d.fetchNum,
                        gid: c.gid,
                        cid: c.cid,
                        contain_start: c.contain_start,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(i) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(i) + "x" + a(.8 * j) + "/quality/97/interlace/1/format/jpg",
                        noclean: c.noclean,
                        pre: c.pre
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: c.success,
                    failCallback: c.fail,
                    completeCallback: c.complete
                },
                limit: c.limit || d.fetchNum,
                startNum: c.startNum,
                pre: c.pre,
                needOverride: c.needOverride
            };
        },
        cutFrontRecommendItems: function(a) {
            return {
                type: b.CUT_FRONT_RECOMMEND_ITEMS,
                count: a.count
            };
        },
        getRecommendNewCount: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_RECOMMEND_NEW_COUNT_REQUEST, b.GET_RECOMMEND_NEW_COUNT_SUCCESS, b.GET_RECOMMEND_NEW_COUNT_FAILURE ],
                    url: d.apiDomain + "/recommend/get_recommend_new_count",
                    param: JSON.stringify({
                        token: a.token,
                        chid: a.chid || 1
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                }
            };
        }
    };
})();