(function() {
    var a = require("../const/actionType.js"), b = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, c = require("../config/config.js"), d = require("../schemas/schemas.js"), e = getApp(), f = require("../xng_modules/object-assign/index.js"), g = e.sysInfo.pixelRatio, h = e.sysInfo.windowWidth * g, i = e.sysInfo.windowHeight * g;
    module.exports = {
        fetchUserGroupInList: function(e) {
            var g = Math.floor;
            return {
                SERVER_API: {
                    types: [ a.FETCH_USER_GROUPIN_REQUEST, a.FETCH_USER_GROUPIN_SUCCESS, a.FETCH_USER_GROUPIN_FAILURE ],
                    url: c.apiDomain + "/group/get_user_moment_list",
                    param: JSON.stringify({
                        token: e.token,
                        gid: e.gid,
                        q_mid: e.mid,
                        start_t: e.start_t,
                        limit: e.limit || c.fetchNum,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + g(h) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + g(h) + "x" + g(.8 * i) + "/quality/97/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return f({}, b(a.data.list, d.FEED_FLOW), {
                            userInfo: f({}, a.data.user_data, {
                                fansCount: a.data.fansCount,
                                followCount: a.data.followCount,
                                isFollow: a.data.isFollow
                            })
                        });
                    },
                    successCallback: e.success,
                    failCallback: e.fail
                },
                limit: e.limit || c.fetchNum,
                start_t: e.start_t,
                mid: e.mid,
                gid: e.gid
            };
        }
    };
})();