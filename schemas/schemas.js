(function() {
    var a = require("../xng_modules/normalizr/dist/normalizr.min.js"), b = a.Schema, c = a.arrayOf, d = new b("feedFlow", {
        idAttribute: "id"
    }), e = new b("hotFeedFlow", {
        idAttribute: "id"
    });
    module.exports = {
        FEED_FLOW: c(d),
        HOT_FEED_FLOW: c(e)
    };
})();