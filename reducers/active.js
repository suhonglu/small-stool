(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = g.findArrayItem, i = g.checkDoesArrHaveContent, j = b({
        activeList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_ACTIVE_LIST_SUCCESS:
                return b.response.data.actlist;

              default:
                return a;
            }
        },
        bannerList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_ACTIVE_LIST_SUCCESS:
                return b.response.data.bannerlist;

              default:
                return a;
            }
        },
        blessCardList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_CARD_INFO_SUCCESS:
                return b.response.data.list;

              default:
                return a;
            }
        }
    });
    module.exports = j;
})();