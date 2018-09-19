(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = g.findArrayItem, i = b({
        publicGroupList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_PUBLIC_GROUP_LIST_SUCCESS:
                return d({}, a, {
                    list: b.start ? f(a.list, b.response.data.list) : b.response.data.list,
                    hasNext: b.response.data.list.length >= b.limit
                });

              default:
                return a;
            }
        },
        publicGroupBasisList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_PUBLIC_GROUP_BASIS_LIST_SUCCESS:
                return d({}, a, {
                    list: b.start ? f(a.list, b.response.data.list) : b.response.data.list,
                    hasNext: b.response.data.list.length >= b.limit
                });

              default:
                return a;
            }
        }
    });
    module.exports = i;
})();