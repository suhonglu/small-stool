(function() {
    var a = Math.floor, b = require("../const/actionType.js"), c = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, d = require("../config/config.js"), e = require("../schemas/schemas.js"), f = getApp(), g = f.sysInfo.pixelRatio, h = f.sysInfo.windowWidth * g;
    module.exports = {
        acFetchAlbum: function(c, e, f, g, i) {
            return {
                SERVER_API: {
                    types: [ b.ALL_ALBUM_REQUEST, b.ALL_ALBUM_SUCCESS, b.ALL_ALBUM_FAILURE ],
                    url: d.apiDomain + "/group/get_group_images",
                    param: JSON.stringify({
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + a(h / 3) + "x" + a(h / 3) + "r/interlace/1/format/jpg",
                        gid: e,
                        token: c,
                        start_t: f,
                        limit: 50
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: g,
                    failCallback: i
                },
                limit: 50,
                start_t: f
            };
        },
        acFetchRecycleImgs: function(c) {
            var e = c.token, f = c.gid, g = c.nextStartTime, i = c.success, j = c.fail;
            return {
                SERVER_API: {
                    types: [ b.RECYCLE_IMGS_REQUEST, b.RECYCLE_IMGS_SUCCESS, b.RECYCLE_IMGS_FAILURE ],
                    url: d.apiDomain + "/group/get_recycle_imgs",
                    param: JSON.stringify({
                        qs: "imageMogr2/gravity/north/rotate/$/thumbnail/" + a(h) + "x/quality/97/interlace/1",
                        small_qs: "imageMogr2/gravity/north/rotate/$/thumbnail/!" + a(h / 3) + "x" + a(h / 3) + "r/interlace/1/format/jpg",
                        gid: f,
                        token: e,
                        start_t: g,
                        limit: 50
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: i,
                    failCallback: j
                },
                limit: 50,
                start_t: g
            };
        },
        delImgs: function(a) {
            var c = a.token, e = a.gid, f = a.ids, g = a.success, h = a.fail;
            return {
                SERVER_API: {
                    types: [ b.DEL_IMGS_REQUEST, b.DEL_IMGS_SUCCESS, b.DEL_IMGS_FAILURE ],
                    url: d.apiDomain + "/group/del_imgs",
                    param: JSON.stringify({
                        gid: e,
                        token: c,
                        ids: f
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: g,
                    failCallback: h
                },
                ids: f
            };
        },
        recoverImgs: function(a) {
            var c = a.token, e = a.gid, f = a.ids, g = a.success, h = a.fail;
            return {
                SERVER_API: {
                    types: [ b.RECOVER_IMGS_REQUEST, b.RECOVER_IMGS_SUCCESS, b.RECOVER_IMGS_FAILURE ],
                    url: d.apiDomain + "/group/resume_imgs",
                    param: JSON.stringify({
                        gid: e,
                        token: c,
                        ids: f
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: g,
                    failCallback: h
                },
                ids: f
            };
        },
        resetAlbumWall: function() {
            return {
                type: b.RESET_ALBUM_WALL
            };
        },
        resetRecycleAlbumWall: function() {
            return {
                type: b.RESET_RECYCLE_ALBUM_WALL
            };
        }
    };
})();