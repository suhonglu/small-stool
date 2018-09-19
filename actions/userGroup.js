(function() {
    var a = require("../const/actionType.js"), b = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, c = require("../config/config.js"), d = require("../schemas/schemas.js"), e = getApp(), f = e.sysInfo.pixelRatio, g = e.sysInfo.windowWidth * f;
    module.exports = {
        fetchMemberList: function(b) {
            var d = Math.floor;
            return {
                SERVER_API: {
                    types: [ a.FETCH_GROUP_MEMBER_REQUEST, a.FETCH_GROUP_MEMBER_SUCCESS, a.FETCH_GROUP_MEMBER_FAILURE ],
                    url: c.apiDomain + "/group/get_group_users",
                    param: JSON.stringify({
                        h_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + d(g / 5 || 100) + "x" + d(g / 5 || 100) + "r/interlace/1/format/jpg",
                        token: b.token,
                        gid: b.gid,
                        limit: b.limit,
                        start_num: b.startNum,
                        contain_start: 0
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail,
                    completeCallback: b.complete
                },
                limit: b.limit,
                startNum: b.startNum
            };
        },
        kickoutMember: function(b, d, e, f, g) {
            return {
                SERVER_API: {
                    types: [ a.KICKOUT_GROUP_MEMBER_REQUEST, a.KICKOUT_GROUP_MEMBER_SUCCESS, a.KICKOUT_GROUP_MEMBER_FAILURE ],
                    url: c.apiDomain + "/group/kick_someone",
                    param: JSON.stringify({
                        gid: d,
                        token: b,
                        kick_mids: e
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: f,
                    failCallback: g
                },
                mids: e
            };
        },
        clearUnreadIco: function(b) {
            return {
                type: a.CLEAR_UNREAD_ICO,
                gid: b.gid
            };
        },
        clearInteractionIco: function() {
            return {
                type: a.CLEAR_INTERACTION_ICO
            };
        },
        topGroup: function(b) {
            return {
                SERVER_API: {
                    types: [ a.TOP_GROUP_REQUEST, a.TOP_GROUP_SUCCESS, a.TOP_GROUP_FAILURE ],
                    url: c.apiDomain + "/group/set_user_group_top",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail
                },
                gid: b.gid
            };
        },
        unTopGroup: function(b) {
            return {
                SERVER_API: {
                    types: [ a.UNTOP_GROUP_REQUEST, a.UNTOP_GROUP_SUCCESS, a.UNTOP_GROUP_FAILURE ],
                    url: c.apiDomain + "/group/cancel_user_group_top",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail
                },
                gid: b.gid
            };
        },
        getHatGroup: function(b) {
            return {
                SERVER_API: {
                    types: [ a.GET_HAT_GROUP_REQUEST, a.GET_HAT_GROUP_SUCCESS, a.GET_HAT_GROUP_FAILURE ],
                    url: c.apiDomain + "/hat/get_hat_group",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail
                }
            };
        }
    };
})();