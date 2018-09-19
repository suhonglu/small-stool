(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = b({
        feedList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: {}
            } : arguments[0], b = arguments[1], d = b.gid, e = b.momID, g = b.needOverride, h = a.list;
            if (!d) return a;
            h[d] = h[d] || {
                ids: [],
                hasNext: !0
            };
            var i, j = h[d];
            switch (b.type) {
              case c.FEED_FLOW_SUCCESS:
                return j.ids = g ? b.response.result : f(j.ids, b.response.result), j.hasNext = b.response.result.length >= b.limit, 
                a;

              case c.DEL_MOMENT_SUCCESS:
              case c.FOLD_MOMENT_SUCCESS:
                return j.ids = j.ids.filter(function(a) {
                    return a !== e;
                }), a;

              case c.TOP_MOMENT_SUCCESS:
                i = j.ids;
                var k = i.find(function(a) {
                    return a === e;
                });
                return i = i.filter(function(a) {
                    return a !== e;
                }), i.unshift(k), j.ids = i, a;

              case c.CUT_FEED_FLOW:
                return i = j.ids, i.splice(20), a;

              case c.POST_MOMENT_SUCCESS:
                var l = b.response.data.id;
                return i = j.ids, i.unshift(l), j.ids = i, a;

              default:
                return a;
            }
        },
        tabFeedList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: {}
            } : arguments[0], b = arguments[1], d = b.gid, e = b.ac, g = b.needOverride, h = b.momID;
            if (!e || !d) return a;
            var i = a.list;
            i[d] = i[d] || {}, i[d][e] = i[d][e] || {
                ids: [],
                hasNext: !0
            };
            var j = i[d][e];
            switch (b.type) {
              case c.TAB_FEED_FLOW_SUCCESS:
                return j.ids = g ? b.response.result : f(j.ids, b.response.result), j.hasNext = b.response.result.length >= b.limit, 
                a;

              case c.DEL_MOMENT_SUCCESS:
              case c.FOLD_MOMENT_SUCCESS:
                return j.ids = j.ids.filter(function(a) {
                    return a !== h;
                }), a;

              case c.TOP_MOMENT_SUCCESS:
                ids = j.ids;
                var k = ids.find(function(a) {
                    return a === h;
                });
                return ids = ids.filter(function(a) {
                    return a !== h;
                }), ids.unshift(k), j.ids = ids, a;

              default:
                return a;
            }
        }
    });
    module.exports = g;
})();