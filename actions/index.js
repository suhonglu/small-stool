(function() {
    var a = Math.floor, b = require("../config/config.js"), c = require("../const/actionType.js"), d = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, e = require("../xng_modules/object-assign/index.js");
    module.exports = {
        resetErrorMessage: function() {
            return {
                type: c.RESET_ERROR_MESSAGE
            };
        },
        resetGroupMember: function() {
            return {
                type: c.RESET_GROUP_MEMBER
            };
        },
        acSetEnterStatus: function(a) {
            return {
                type: c.SET_ENTER_STATUS,
                status: a
            };
        },
        imgLoadError: function(a) {
            return {
                page: a.page,
                type: c.IMG_LOAD_ERROR,
                momID: a.momID,
                gid: a.gid,
                imgIndex: a.imgIndex,
                mid: a.mid,
                ac: a.ac
            };
        },
        imgNeedGif: function(a) {
            return {
                page: a.page,
                type: c.IMG_NEED_GIF,
                momID: a.momID,
                gid: a.gid,
                imgIndex: a.imgIndex,
                mid: a.mid,
                ac: a.ac
            };
        },
        imgReload: function(a) {
            return {
                page: a.page,
                type: c.IMG_RELOAD,
                momID: a.momID,
                gid: a.gid,
                imgIndex: a.imgIndex,
                mid: a.mid,
                ac: a.ac
            };
        },
        acWxFetchSession: function(a, d, e) {
            return {
                SERVER_API: {
                    types: [ c.WX_FETCH_SESSION_REQUEST, c.WX_FETCH_SESSION_SUCCESS, c.WX_FETCH_SESSION_FAILURE ],
                    url: b.apiDomain + "/auth/wx_xbd_miniapp_code",
                    param: JSON.stringify({
                        code: a
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: d,
                    failCallback: e
                }
            };
        },
        acWxMpLogin: function(a, d, e, f, g, h, i) {
            return {
                SERVER_API: {
                    types: [ c.WX_LOGIN_REUQEST, c.WX_LOGIN_SUCCESS, c.WX_LOGIN_FAILURE ],
                    url: b.apiDomain + "/auth/wx_xbdminiapp_login",
                    param: JSON.stringify({
                        proj: "xbd",
                        mini_session: a,
                        raw_data: d,
                        signature: e,
                        encrypted_data: f,
                        iv: g
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: h,
                    failCallback: i
                }
            };
        },
        acMpLogin: function(a) {
            return {
                SERVER_API: {
                    types: [ c.LOGIN_REUQEST, c.LOGIN_SUCCESS, c.LOGIN_FAILURE ],
                    url: b.apiDomain + "/auth/wx_xbdminiapp_login_without_auth",
                    param: JSON.stringify({
                        mini_session: a.mini_session
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
        acWxJsUserinfo: function(a, d, e) {
            return {
                SERVER_API: {
                    types: [ c.WX_JS_USERINFO_REQUEST, c.WX_JS_USERINFO_SUCCESS, c.WX_JS_USERINFO_FAILURE ],
                    url: b.apiDomain + "/auth/wxjsanduserinfo",
                    param: JSON.stringify({
                        t: Date.now(),
                        token: a,
                        proj: "xbd"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: d,
                    failCallback: e
                }
            };
        },
        acUserDefaultGrp: function(a) {
            return {
                SERVER_API: {
                    types: [ c.DEFAULT_GROUP_REQUEST, c.DEFAULT_GROUP_SUCCESS, c.DEFAULT_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/default_group",
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
        acWxPayOrder: function(a) {
            return {
                SERVER_API: {
                    types: [ c.WX_PAY_ORDER_REQUEST, c.WX_PAY_ORDER_SUCCESS, c.WX_PAY_ORDER_FAILURE ],
                    url: b.apiDomain + "/pay/wx_unified_order",
                    param: JSON.stringify({
                        token: a.token,
                        total_fee: 100 * a.wxPaySum,
                        trade_type: "JSAPI",
                        body: a.desc,
                        pay_type: a.payType,
                        pay_src: 2
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
        resetSaveToXngState: function() {
            return {
                type: c.RESET_SAVE_IMG_TO_XNG_STATE
            };
        },
        saveImgToXng: function(a, d, e) {
            return {
                SERVER_API: {
                    types: [ c.SAVE_IMG_TO_XNG_REQUEST, c.SAVE_IMG_TO_XNG_SUCCESS, c.SAVE_IMG_TO_XNG_FAILURE ],
                    url: b.apiDomain + "/group/save_img_2_xng",
                    param: JSON.stringify({
                        qid: e,
                        gid: d,
                        qs: "imageMogr2/gravity/center/rotate/$/thumbnail/!800x800r/crop/800x800/interlace/1/format/jpg",
                        token: a,
                        small_qs: "imageMogr2/gravity/center/rotate/$/thumbnail/!120x120r/crop/120x120/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    }
                }
            };
        },
        getUserGroupsList: function(d, e, f) {
            var g = getApp(), h = g.sysInfo.pixelRatio, i = g.sysInfo.windowWidth * h;
            return {
                SERVER_API: {
                    types: [ c.GET_USER_GROUP_LIST_REQUEST, c.GET_USER_GROUP_LIST_SUCCESS, c.GET_USER_GROUP_LIST_FAILURE ],
                    url: b.apiDomain + "/group/get_user_groups",
                    param: JSON.stringify({
                        token: d,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(i / 3) + "x" + a(i / 3) + "/quality/97/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: e,
                    failCallback: f
                }
            };
        },
        getPublicGroupsList: function(d) {
            var e = getApp(), f = e.sysInfo.pixelRatio, g = e.sysInfo.windowWidth * f;
            return {
                SERVER_API: {
                    types: [ c.GET_PUBLIC_GROUP_LIST_REQUEST, c.GET_PUBLIC_GROUP_LIST_SUCCESS, c.GET_PUBLIC_GROUP_LIST_FAILURE ],
                    url: b.apiDomain + "/recommend/get_pub_groups",
                    param: JSON.stringify({
                        token: d.token,
                        start: d.start,
                        limit: b.fetchNum,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(g / 3) + "x" + a(g / 3) + "/quality/97/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: d.success,
                    failCallback: d.fail
                },
                start: d.start,
                limit: b.fetchNum
            };
        },
        getPublicGroupsBasisList: function(a) {
            var d = getApp(), e = d.sysInfo.pixelRatio, f = d.sysInfo.windowWidth * e;
            return {
                SERVER_API: {
                    types: [ c.GET_PUBLIC_GROUP_BASIS_LIST_REQUEST, c.GET_PUBLIC_GROUP_BASIS_LIST_SUCCESS, c.GET_PUBLIC_GROUP_BASIS_LIST_FAILURE ],
                    url: b.apiDomain + "/recommend/get_pub_groups_basis_info",
                    param: JSON.stringify({
                        token: a.token,
                        start: a.start,
                        limit: 30
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                start: a.start,
                limit: 30
            };
        },
        getUserGroupsBasisList: function(a) {
            var d = getApp(), e = d.sysInfo.pixelRatio, f = d.sysInfo.windowWidth * e;
            return {
                SERVER_API: {
                    types: [ c.GET_USER_GROUP_BASIS_LIST_REQUEST, c.GET_USER_GROUP_BASIS_LIST_SUCCESS, c.GET_USER_GROUP_BASIS_LIST_FAILURE ],
                    url: b.apiDomain + "/group/get_user_groups_basic_info",
                    param: JSON.stringify({
                        token: a.token,
                        start_num: a.startNum,
                        limit: 30
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                startNum: a.startNum,
                limit: 30
            };
        },
        resetFavorAnimate: function(a) {
            return {
                type: c.RESET_FAVOR_ANIMATE,
                page: a.page,
                momID: a.momID,
                gid: a.gid,
                mid: a.mid,
                isPersonalAllPublicFeeds: a.isPersonalAllPublicFeeds
            };
        },
        fetchRecommendThumbnail: function(d) {
            var e = getApp(), f = e.sysInfo.pixelRatio, g = e.sysInfo.windowWidth * f;
            return {
                SERVER_API: {
                    types: [ c.FETCH_RECOMMEND_THUMBNAIL_REQUEST, c.FETCH_RECOMMEND_THUMBNAIL_SUCCESS, c.FETCH_RECOMMEND_THUMBNAIL_FAILURE ],
                    url: b.apiDomain + "/recommend/get_recommends",
                    param: JSON.stringify({
                        token: d.token,
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(g / 3) + "x" + a(g / 3) + "/quality/97/interlace/1/format/jpg"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: d.success,
                    failCallback: d.fail
                }
            };
        },
        joinGroup: function(a, d) {
            return {
                SERVER_API: {
                    types: [ c.JOIN_GROUP_REQUEST, c.JOIN_GROUP_SUCCESS, c.JOIN_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/join_one_group",
                    param: JSON.stringify({
                        token: a,
                        gid: d
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    }
                }
            };
        },
        quitGroup: function(a, d, e) {
            return {
                SERVER_API: {
                    types: [ c.QUIT_GROUP_REQUEST, c.QUIT_GROUP_SUCCESS, c.QUIT_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/quit_one_group",
                    param: JSON.stringify({
                        token: a,
                        gid: d
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: e
                }
            };
        },
        addGroup: function(a, d, e, f, g) {
            return {
                SERVER_API: {
                    types: [ c.ADD_GROUP_REQUEST, c.ADD_GROUP_SUCCESS, c.ADD_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/add_one_group",
                    param: JSON.stringify({
                        token: a,
                        desc: d,
                        name: e
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: f,
                    failCallback: g
                }
            };
        },
        addPersonalGroup: function(a, d, e, f, g) {
            return {
                SERVER_API: {
                    types: [ c.ADD_GROUP_REQUEST, c.ADD_GROUP_SUCCESS, c.ADD_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/add_oneself_group",
                    param: JSON.stringify({
                        token: a,
                        desc: d,
                        name: e
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: f,
                    failCallback: g
                }
            };
        },
        addAlbumGroup: function(a, d, e, f, g) {
            return {
                SERVER_API: {
                    types: [ c.ADD_GROUP_REQUEST, c.ADD_GROUP_SUCCESS, c.ADD_GROUP_FAILURE ],
                    url: b.apiDomain + "/group/create_album_group",
                    param: JSON.stringify({
                        token: a,
                        desc: d,
                        name: e
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: f,
                    failCallback: g
                }
            };
        },
        modifyGrpName: function(a) {
            return {
                SERVER_API: {
                    types: [ c.MODIFY_GRP_NAME_REQUEST, c.MODIFY_GRP_NAME_SUCCESS, c.MODIFY_GRP_NAME_FAILURE ],
                    url: b.apiDomain + "/group/modify_group_name",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        name: a.value
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid,
                name: a.value
            };
        },
        modifyGrpPub: function(a) {
            return {
                SERVER_API: {
                    types: [ c.MODIFY_GRP_PUBLIC_REQUEST, c.MODIFY_GRP_PUBLIC_SUCCESS, c.MODIFY_GRP_PUBLIC_FAILURE ],
                    url: b.apiDomain + "/group/modify_group_public",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        pub: a.pub
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid,
                pub: a.pub
            };
        },
        modifyGrpDesc: function(a) {
            return {
                SERVER_API: {
                    types: [ c.MODIFY_GRP_DESC_REQUEST, c.MODIFY_GRP_DESC_SUCCESS, c.MODIFY_GRP_DESC_FAILURE ],
                    url: b.apiDomain + "/group/modify_group_desc",
                    param: JSON.stringify({
                        token: a.token,
                        gid: a.gid,
                        desc: a.value
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: a.success,
                    failCallback: a.fail
                },
                gid: a.gid,
                desc: a.value
            };
        },
        sendFormIDs: function(a) {
            return {
                SERVER_API: {
                    types: [ c.SEND_FORMIDS_REQUEST, c.SEND_FORMIDS_SUCCESS, c.SEND_FORMIDS_FAILURE ],
                    url: b.apiDomain + "/group/send_formids",
                    param: JSON.stringify({
                        token: a.token,
                        formids: a.formids
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
        buildGroupByShare: function(a) {
            return {
                SERVER_API: {
                    types: [ c.BUILD_GROUP_BY_SHARE_REQUEST, c.BUILD_GROUP_BY_SHARE_SUCCESS, c.BUILD_GROUP_BY_SHARE_FAILURE ],
                    url: b.apiDomain + "/group/add_one_group_share",
                    param: JSON.stringify({
                        token: a.token,
                        mini_session: a.mini_session,
                        encrypted_data: a.encrypted_data,
                        iv: a.iv
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
        decryptShareInfo2openGid: function(a) {
            return {
                SERVER_API: {
                    types: [ c.DECRYPT_SHARE_INFO_2_OPENGID_REQUEST, c.DECRYPT_SHARE_INFO_2_OPENGID_SUCCESS, c.DECRYPT_SHARE_INFO_2_OPENGID_FAILURE ],
                    url: b.apiDomain + "/group/decrypt_share_info",
                    param: JSON.stringify({
                        token: a.token,
                        mini_session: a.mini_session,
                        encrypted_data: a.encrypted_data,
                        iv: a.iv,
                        trigger: a.trigger
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
        getUrlsByQids: function(a) {
            return {
                SERVER_API: {
                    types: [ c.GET_URLS_BY_QIDS_REQUEST, c.GET_URLS_BY_QIDS_SUCCESS, c.GET_URLS_BY_QIDS_FAILURE ],
                    url: b.apiDomain + "/resource/get_res_url",
                    param: JSON.stringify({
                        token: a.token,
                        qids: a.qids,
                        qs: a.qs
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
        }
    };
})();