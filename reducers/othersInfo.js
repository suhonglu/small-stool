(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = g.findArrayItem, i = g.checkDoesArrHaveContent;
    module.exports = b({
        otherUsersList: function() {
            var a = 0 >= arguments.length || void 0 === arguments[0] ? [] : arguments[0], b = arguments[1], e = b.gid, g = b.mid, h = b.limit, i = b.start_t, j = a || [];
            switch (j[g] = j[g] || [], j[g][e] = j[g][e] || {}, j[g][e].ids = j[g][e].ids || [], 
            b.type) {
              case c.FETCH_USER_GROUPIN_SUCCESS:
                return j[g][e].ids = i && -1 !== i ? f(j[g][e].ids, b.response.result) : b.response.result, 
                j[g][e].hasNext = b.response.result.length === h, d(a, j);

              default:
                return a;
            }
        }
    });
})();