(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = g.findArrayItem, i = g.checkDoesArrHaveContent;
    module.exports = b({
        targetVideo: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {} : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.PLAY_VIDEO:
                return b.info;

              case c.FAVOR_MOMENT_REQUEST:
              case c.UNFAVOR_MOMENT_FAILURE:
                return d({}, a, {
                    hasFavor: 1
                });

              case c.UNFAVOR_MOMENT_REQUEST:
              case c.FAVOR_MOMENT_FAILURE:
                return d({}, a, {
                    hasFavor: 0
                });

              default:
                return a;
            }
        }
    });
})();