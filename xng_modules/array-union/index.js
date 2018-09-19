var a = require("./arrayUniq.js");

module.exports = function() {
    return a([].concat.apply([], arguments));
};