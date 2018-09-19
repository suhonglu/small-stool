(function() {
    var a = Math.floor, b = require("../const/actionType.js"), c = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, d = require("../config/config.js"), e = require("../schemas/schemas.js"), f = require("../xng_modules/object-assign/index.js");
    module.exports = {
        acFetchFeedFlow: function(g) {
            var h = g.token, i = g.gid, j = g.startID, k = g.needOverride, l = g.success, m = g.fail, n = g.complete, o = g.noclean, p = g.pre, q = g.contain_start, r = getApp(), s = r.sysInfo.pixelRatio, t = r.sysInfo.windowWidth * s, u = r.sysInfo.windowHeight * s;
            return {
                SERVER_API: {
                    types: [ b.FEED_FLOW_REQUEST, b.FEED_FLOW_SUCCESS, b.FEED_FLOW_FAILURE ],
                    url: d.apiDomain + "/group/get_group_contents",
                    param: JSON.stringify({
                        token: h,
                        gid: i,
                        start_id: j,
                        limit: g.limit || d.fetchNum,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(t) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(t) + "x/quality/97/interlace/1",
                        noclean: o,
                        pre: p,
                        contain_start: q
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return f({}, c(a.data.list, e.FEED_FLOW), {
                            groupInfo: a.data.group_data,
                            isInGroup: a.data.is_in_group,
                            isOwner: a.data.owner
                        });
                    },
                    successCallback: l,
                    failCallback: m,
                    completeCallback: n
                },
                limit: g.limit || d.fetchNum,
                start_id: j,
                gid: i,
                needOverride: k
            };
        },
        acFetchTabFeedFlow: function(g) {
            var h = g.action, i = g.token, j = g.gid, k = g.startID, l = g.needOverride, m = g.success, n = g.fail, o = g.complete, p = g.noclean, q = g.pre, r = g.contain_start, s = getApp(), t = s.sysInfo.pixelRatio, u = s.sysInfo.windowWidth * t, v = s.sysInfo.windowHeight * t;
            return {
                SERVER_API: {
                    types: [ b.TAB_FEED_FLOW_REQUEST, b.TAB_FEED_FLOW_SUCCESS, b.TAB_FEED_FLOW_FAILURE ],
                    url: d.apiDomain + "/group/get_group_tab_contents",
                    param: JSON.stringify({
                        ac: h,
                        token: i,
                        gid: j,
                        start_id: k,
                        limit: g.limit || d.fetchNum,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(u) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(u) + "x/quality/97/interlace/1",
                        noclean: p,
                        pre: q,
                        contain_start: r
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return f({}, c(a.data.list, e.FEED_FLOW), {
                            groupInfo: a.data.group_data,
                            isInGroup: a.data.is_in_group,
                            isOwner: a.data.owner
                        });
                    },
                    successCallback: m,
                    failCallback: n,
                    completeCallback: o
                },
                limit: g.limit || d.fetchNum,
                start_id: k,
                gid: j,
                ac: g.action,
                needOverride: l
            };
        },
        cutFeedFlow: function(a) {
            return {
                type: b.CUT_FEED_FLOW,
                gid: a.gid
            };
        },
        playVideo: function(a) {
            return {
                type: b.PLAY_VIDEO,
                info: a.info
            };
        },
        joinGroup: function(a, c, e, f) {
            return {
                SERVER_API: {
                    types: [ b.JOIN_GROUP_REQUEST, b.JOIN_GROUP_SUCCESS, b.JOIN_GROUP_FAILURE ],
                    url: d.apiDomain + "/group/join_one_group",
                    param: JSON.stringify({
                        token: a,
                        gid: c
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: e,
                    failCallback: f
                },
                gid: c
            };
        },
        quitGroup: function(a, c) {
            return {
                SERVER_API: {
                    types: [ b.QUIT_GROUP_REQUEST, b.QUIT_GROUP_SUCCESS, b.QUIT_GROUP_FAILURE ],
                    url: d.apiDomain + "/group/quit_one_group",
                    param: JSON.stringify({
                        token: a,
                        gid: c
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    }
                },
                gid: c
            };
        },
        acFetchGroupInfo: function(a, c, e, f) {
            return {
                SERVER_API: {
                    types: [ b.GROUP_INFO_REQUEST, b.GROUP_INFO_SUCCESS, b.GROUP_INFO_FAILURE ],
                    url: d.apiDomain + "/group/get_one_group_info",
                    param: JSON.stringify({
                        token: a,
                        gid: c,
                        g_hs: "imageMogr2/gravity/center/rotate/$/thumbnail/!120x120r/crop/120x120/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: e,
                    failCallback: f
                },
                gid: c
            };
        },
        shareMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.SHARE_MOMENT_REQUEST, b.SHARE_MOMENT_SUCCESS, b.SHARE_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/share_content",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success
                },
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                ac: a.ac,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        XngAlbumUvPlus: function(a) {
            return {
                SERVER_API: {
                    types: [ b.XNG_ALBUM_UV_PLUS_REQUEST, b.XNG_ALBUM_UV_PLUS_SUCCESS, b.XNG_ALBUM_UV_PLUS_FAILURE ],
                    url: d.apiDomain_XNG + "/favor/detail",
                    param: JSON.stringify({
                        token: a.token,
                        lid: a.lid,
                        id: a.aid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success
                },
                momID: a.momID,
                gid: a.gid,
                mid: a.mid
            };
        },
        favorMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.FAVOR_MOMENT_REQUEST, b.FAVOR_MOMENT_SUCCESS, b.FAVOR_MOMENT_FAILURE ],
                    url: d.apiDomain + "/favor/set_favor",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        id: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success
                },
                page: a.page,
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                ac: a.ac,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        unFavorMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.UNFAVOR_MOMENT_REQUEST, b.UNFAVOR_MOMENT_SUCCESS, b.UNFAVOR_MOMENT_FAILURE ],
                    url: d.apiDomain + "/favor/unset_favor",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        id: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success
                },
                page: a.page,
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                ac: a.ac,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        submitComment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.SUBMIT_COMMENT_REQUEST, b.SUBMIT_COMMENT_SUCCESS, b.SUBMIT_COMMENT_FAILURE ],
                    url: d.apiDomain + "/comments/submit_comments",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        id: a.momID,
                        text: a.comment,
                        to_mid: a.targetMID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                contentObj: a.contentObj,
                fakeID: a.fakeID,
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                targetMID: a.targetMID,
                ac: a.ac,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        fetchComments: function(a, c, e, f, g, h) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_COMMENT_REQUEST, b.FETCH_COMMENT_SUCCESS, b.FETCH_COMMENT_FAILURE ],
                    url: d.apiDomain + "/comments/get_comments",
                    param: JSON.stringify({
                        gid: a,
                        id: c,
                        start_t: e || -1,
                        limit: f || 50
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: g,
                    failCallback: h
                },
                gid: a
            };
        },
        delMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.DEL_MOMENT_REQUEST, b.DEL_MOMENT_SUCCESS, b.DEL_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/del_moment",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        id: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                momID: a.momID,
                gid: a.gid,
                ac: a.action
            };
        },
        foldMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.FOLD_MOMENT_REQUEST, b.FOLD_MOMENT_SUCCESS, b.FOLD_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/fold_moment",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        id: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                momID: a.momID,
                gid: a.gid,
                ac: a.action
            };
        },
        delComment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.DEL_COMMENT_REQUEST, b.DEL_COMMENT_SUCCESS, b.DEL_COMMENT_FAILURE ],
                    url: d.apiDomain + "/comments/del_comments",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID,
                        id: a.commentID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                commentID: a.commentID,
                fakeCommentID: a.fakeCommentID,
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                ac: a.ac,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        topMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.TOP_MOMENT_REQUEST, b.TOP_MOMENT_SUCCESS, b.TOP_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/set_group_content_top",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid,
                momID: a.momID,
                ac: a.action
            };
        },
        unTopMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.UNTOP_MOMENT_REQUEST, b.UNTOP_MOMENT_SUCCESS, b.UNTOP_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/cancel_group_content_top",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid,
                momID: a.momID
            };
        },
        complainMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.COMPLAIN_MOMENT_REQUEST, b.COMPLAIN_MOMENT_SUCCESS, b.COMPLAIN_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/complain",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID,
                        text: a.text
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                gid: a.gid,
                momID: a.momID
            };
        },
        dislikeMoment: function(a) {
            return {
                SERVER_API: {
                    types: [ b.DISLIKE_MOMENT_REQUEST, b.DISLIKE_MOMENT_SUCCESS, b.DISLIKE_MOMENT_FAILURE ],
                    url: d.apiDomain + "/group/dislike",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        cid: a.momID
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                gid: a.gid,
                momID: a.momID
            };
        },
        checkIfHaveSigned: function(a) {
            return {
                SERVER_API: {
                    types: [ b.CHECK_IF_HAVE_SIGNED_REQUEST, b.CHECK_IF_HAVE_SIGNED_SUCCESS, b.CHECK_IF_HAVE_SIGNED_FAILURE ],
                    url: d.apiDomain + "/group/xxxx",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                }
            };
        },
        tiaUserSign: function(a) {
            return {
                SERVER_API: {
                    types: [ b.TIA_USER_SIGN_REQUEST, b.TIA_USER_SIGN_SUCCESS, b.TIA_USER_SIGN_FAILURE ],
                    url: d.apiDomain + "/group/clockin",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid
            };
        }
    };
})();