(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = require("../xng_modules/redux-thunk/dist/redux-thunk.min.js").default, c = require("../middleware/serverApiPRO.js"), d = require("../xng_modules/redux-logger/dist/index.min.js"), e = require("../reducers/index.js"), f = require("../config/config.js"), g = a.createStore, h = a.applyMiddleware;
    module.exports = function(a) {
        var i = d({
            duration: !0,
            diff: !0
        });
        return "online" === f.xngEnv ? g(e, a, h(b, c)) : g(e, a, h(b, c, i));
    };
})();