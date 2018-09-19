(function() {
    var a = require("../const/actionType.js"), b = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, c = require("../config/config.js"), d = require("../schemas/schemas.js");
    module.exports = {
        postMoment: function(b) {
            return {
                SERVER_API: {
                    types: [ a.POST_MOMENT_REQUEST, a.POST_MOMENT_SUCCESS, a.POST_MOMENT_FAILURE ],
                    url: c.apiDomain + "/group/add_moment",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid,
                        hwid: b.hwid,
                        arr_qids: b.qids,
                        txt: b.desc,
                        g_hs: "imageMogr2/gravity/center/rotate/$/thumbnail/!120x120r/crop/120x120/interlace/1"
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail
                },
                gid: b.gid,
                resFeedImageArr: b.resFeedImageArr,
                qids: b.qids
            };
        },
        postAlbumMoment: function(b) {
            return {
                SERVER_API: {
                    types: [ a.POST_MOMENT_REQUEST, a.POST_MOMENT_SUCCESS, a.POST_MOMENT_FAILURE ],
                    url: c.apiDomain + "/album/add_album",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid,
                        lid: b.lid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail,
                    completeCallback: b.complete
                },
                gid: b.gid
            };
        },
        postFakeMoment: function(b) {
            return {
                type: a.POST_FAKE_MOMENT,
                param: b
            };
        },
        getChooseImgs: function(b) {
            return {
                type: a.GET_CHOOSE_IMGS,
                param: b
            };
        },
        resetChooseImgs: function() {
            return {
                type: a.RESET_CHOOSE_IMGS
            };
        }
    };
})();