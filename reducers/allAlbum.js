(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = b({
        allAlbum: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                photos: [],
                hasNext: !0
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.ALL_ALBUM_REQUEST:
                return e({}, a, {
                    isFetching: !0,
                    hasNext: !0
                });

              case c.ALL_ALBUM_SUCCESS:
                return d({}, a, {
                    isFetching: !1,
                    isOwner: b.response.data.owner,
                    photos: b.start_t ? f(a.photos, b.response.data.list) : b.response.data.list,
                    hasNext: b.response.data.list.length >= b.limit
                });

              case c.DEL_IMGS_SUCCESS:
                return d({}, a, {
                    photos: a.photos.filter(function(a) {
                        return -1 === b.ids.indexOf(a.id);
                    })
                });

              case c.ALL_ALBUM_FAILURE:
                return e({}, a, {
                    isFetching: !1
                });

              case c.RESET_ALBUM_WALL:
                return {
                    photos: [],
                    hasNext: !0
                };

              default:
                return a;
            }
        },
        recycleImgs: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                photos: [],
                hasNext: !0
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.RECYCLE_IMGS_REQUEST:
                return e({}, a, {
                    isFetching: !0,
                    hasNext: !0
                });

              case c.RECYCLE_IMGS_SUCCESS:
                return d({}, a, {
                    isFetching: !1,
                    photos: b.start_t ? f(a.photos, b.response.data.list) : b.response.data.list,
                    hasNext: b.response.data.list.length >= b.limit
                });

              case c.RECOVER_IMGS_SUCCESS:
                return d({}, a, {
                    photos: a.photos.filter(function(a) {
                        return -1 === b.ids.indexOf(a.id);
                    })
                });

              case c.RECYCLE_IMGS_FAILURE:
                return e({}, a, {
                    isFetching: !1
                });

              case c.RESET_RECYCLE_ALBUM_WALL:
                return {
                    photos: [],
                    hasNext: !0
                };

              default:
                return a;
            }
        }
    });
    module.exports = g;
})();