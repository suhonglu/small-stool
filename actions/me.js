(function() {
    var a = Math.floor, b = require("../const/actionType.js"), c = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, d = require("../config/config.js"), e = require("../schemas/schemas.js"), f = getApp(), g = f.sysInfo.pixelRatio, h = f.sysInfo.windowWidth * g, i = f.sysInfo.windowHeight * g;
    module.exports = {
        fetchPrivateAlbum: function(c, e, f, g) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_PRIVATE_ALBUM_REQUEST, b.FETCH_PRIVATE_ALBUM_SUCCESS, b.FETCH_PRIVATE_ALBUM_FAILURE ],
                    url: d.apiDomain + "/photo/list",
                    param: JSON.stringify({
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        s_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + a(h / 3) + "x" + a(h / 3) + "r/interlace/1/format/jpg",
                        token: c,
                        start_t: e,
                        limit: d.fetchNum
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: f,
                    failCallback: g
                },
                limit: d.fetchNum,
                start_t: e
            };
        },
        fetchInteractionList: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_INTERACTION_LIST_REQUEST, b.FETCH_INTERACTION_LIST_SUCCESS, b.FETCH_INTERACTION_LIST_FAILURE ],
                    url: d.apiDomain + "/group/interaction_list",
                    param: JSON.stringify({
                        token: c.token,
                        start: c.start,
                        limit: c.limit || 10,
                        cid: c.cid,
                        gid: c.gid,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x" + a(.8 * i) + "/quality/97/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: c.success,
                    failCallback: c.fail,
                    completeCallback: c.complete
                },
                limit: c.limit || 10,
                start: c.start
            };
        },
        fetchMyMomentList: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_MY_MOMENT_LIST_REQUEST, b.FETCH_MY_MOMENT_LIST_SUCCESS, b.FETCH_MY_MOMENT_LIST_FAILURE ],
                    url: d.apiDomain + "/group/get_oneself_moment_list",
                    param: JSON.stringify({
                        token: c.token,
                        start_id: c.nextStartID,
                        limit: c.limit || d.fetchNum,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x" + a(.8 * i) + "/quality/97/interlace/1/format/jpg"
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
                start_id: c.nextStartID
            };
        },
        fetchOneXngAlbumInfo: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_ONE_XNG_ALBUM_INFO_REQUEST, b.FETCH_ONE_XNG_ALBUM_INFO_SUCCESS, b.FETCH_ONE_XNG_ALBUM_INFO_FAILURE ],
                    url: d.apiDomain_XNG + "/album/open",
                    param: JSON.stringify({
                        lid: c.lid,
                        e: +new Date() + 36e5,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        s_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: c.success,
                    failCallback: c.fail
                }
            };
        },
        fetchMyXngAlbumList: function(c) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_MY_XNG_ALBUM_LIST_REQUEST, b.FETCH_MY_XNG_ALBUM_LIST_SUCCESS, b.FETCH_MY_XNG_ALBUM_LIST_FAILURE ],
                    url: d.apiDomain_XNG + "/album/list",
                    param: JSON.stringify({
                        token: c.token,
                        start_t: c.start_t || -1,
                        limit: c.limit || 30,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h / 3) + "x/quality/97/interlace/1"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: c.success,
                    failCallback: c.fail,
                    completeCallback: c.complete
                },
                limit: c.limit || 30,
                startTime: c.start_t || -1
            };
        },
        fetchMyTiaMissionList: function(a) {
            return {
                SERVER_API: {
                    types: [ b.FETCH_MY_TIA_MISSION_LIST_REQUEST, b.FETCH_MY_TIA_MISSION_LIST_SUCCESS, b.FETCH_MY_TIA_MISSION_LIST_FAILURE ],
                    url: d.apiDomain + "/group/get_homework",
                    param: JSON.stringify({
                        gid: a.gid,
                        token: a.token,
                        start_num: a.startNum || 0,
                        limit: a.limit || 20
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                limit: a.limit || 20,
                startNum: a.startNum || 0,
                gid: a.gid
            };
        },
        modifyOwnNick: function(a) {
            return {
                SERVER_API: {
                    types: [ b.MODIFY_OWN_NICK_REQUEST, b.MODIFY_OWN_NICK_SUCCESS, b.MODIFY_OWN_NICK_FAILURE ],
                    url: d.apiDomain + "/user/modify_nickname",
                    param: JSON.stringify({
                        token: a.token,
                        nickname: a.value
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                nickname: a.value
            };
        },
        getNewmsgCount: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_NEW_MSG_COUNT_REQUEST, b.GET_NEW_MSG_COUNT_SUCCESS, b.GET_NEW_MSG_COUNT_FAILURE ],
                    url: d.apiDomain + "/group/get_allgroups_newmsg_total",
                    param: JSON.stringify({
                        token: a.token
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
        getAvatarFrameGroup: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_AVATAR_FRAME_GROUP_REQUEST, b.GET_AVATAR_FRAME_GROUP_SUCCESS, b.GET_AVATAR_FRAME_GROUP_FAILURE ],
                    url: d.apiDomain + "/hat/get_decoration_info",
                    param: JSON.stringify({
                        token: a.token
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                }
            };
        },
        fetchMyTiaCourseList: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_MY_TIA_COURSE_LIST_REQUEST, b.GET_MY_TIA_COURSE_LIST_SUCCESS, b.GET_MY_TIA_COURSE_LIST_FAILURE ],
                    url: d.apiDomain + "/lesson/list_lesson",
                    param: JSON.stringify({
                        xbd_group_id: +a.gid,
                        token: a.token
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                gid: +a.gid
            };
        },
        fetchMyTiaCourseDetail: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_MY_TIA_COURSE_DETAIL_REQUEST, b.GET_MY_TIA_COURSE_DETAIL_SUCCESS, b.GET_MY_TIA_COURSE_DETAIL_FAILURE ],
                    url: d.apiDomain + "/lesson/get_lesson_detail",
                    param: JSON.stringify({
                        token: a.token,
                        xbd_group_id: +a.gid,
                        lesson_id: +a.lessonId,
                        pos: +a.position
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
                lessonId: a.lessonId
            };
        },
        fetchUserFocusList: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_USER_FOCUS_LIST_REQUEST, b.GET_USER_FOCUS_LIST_SUCCESS, b.GET_USER_FOCUS_LIST_FAILURE ],
                    url: d.apiDomain + "/follow/get_user_follow",
                    param: JSON.stringify({
                        token: a.token,
                        qmid: a.mid,
                        start_num: a.startNum || 0,
                        limit: a.limit || 20
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                mid: a.mid,
                startNum: a.startNum || 0,
                isMyself: a.isMyself
            };
        },
        fetchUserFansList: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_USER_FANS_LIST_REQUEST, b.GET_USER_FANS_LIST_SUCCESS, b.GET_USER_FANS_LIST_FAILURE ],
                    url: d.apiDomain + "/follow/get_user_fans",
                    param: JSON.stringify({
                        token: a.token,
                        qmid: a.mid,
                        start_num: a.startNum || 0,
                        limit: a.limit || 20
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                mid: a.mid,
                startNum: a.startNum || 0,
                isMyself: a.isMyself
            };
        },
        setFollow: function(a) {
            return {
                SERVER_API: {
                    types: [ b.SET_FOLLOW_REQUEST, b.SET_FOLLOW_SUCCESS, b.SET_FOLLOW_FAILURE ],
                    url: d.apiDomain + "/follow/set_follow",
                    param: JSON.stringify({
                        token: a.token,
                        tomid: a.tomid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                tomid: a.tomid,
                isMyself: a.isMyself,
                belongMid: a.belongMid,
                momID: a.momID
            };
        },
        unsetFollow: function(a) {
            return {
                SERVER_API: {
                    types: [ b.UNSET_FOLLOW_REQUEST, b.UNSET_FOLLOW_SUCCESS, b.UNSET_FOLLOW_FAILURE ],
                    url: d.apiDomain + "/follow/unset_follow",
                    param: JSON.stringify({
                        token: a.token,
                        tomid: a.tomid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail,
                    completeCallback: a.complete
                },
                tomid: a.tomid,
                isMyself: a.isMyself,
                belongMid: a.belongMid
            };
        },
        changePushState: function(a) {
            return {
                SERVER_API: {
                    types: [ b.CHANGE_PUSH_STATE_REQUEST, b.CHANGE_PUSH_STATE_SUCCESS, b.CHANGE_PUSH_STATE_FAILURE ],
                    url: d.apiDomain + "/user/modify_recommend_push",
                    param: JSON.stringify({
                        token: a.token,
                        recommend_push: a.state
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    completeCallback: a.complete
                },
                state: a.state
            };
        },
        getXbdUserInfo: function(a) {
            return {
                SERVER_API: {
                    types: [ b.GET_XBD_USERINFO_REQUEST, b.GET_XBD_USERINFO_SUCCESS, b.GET_XBD_USERINFO_FAILURE ],
                    url: d.apiDomain + "/user/get_userinfo",
                    param: JSON.stringify({
                        token: a.token
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    completeCallback: a.complete
                }
            };
        }
    };
})();