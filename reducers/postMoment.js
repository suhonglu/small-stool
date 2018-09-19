(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = b({
        aheadChosenFiles: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_CHOOSE_IMGS:
                return b.param;

              case c.RESET_CHOOSE_IMGS:
                return null;

              default:
                return a;
            }
        }
    });
    module.exports = g;
})();