(function() {
    var a = require("../const/actionType.js"), b = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, c = require("../config/config.js"), d = require("../schemas/schemas.js"), e = getApp(), f = require("../xng_modules/object-assign/index.js");
    module.exports = {
        fetchCurrentSignData: function(b) {
            return {
                SERVER_API: {
                    types: [ a.FETCH_CURRENT_SIGN_DATA_REQUEST, a.FETCH_CURRENT_SIGN_DATA_SUCCESS, a.FETCH_CURRENT_SIGN_DATA_FAILURE ],
                    url: c.apiDomain + "/group/get_clockin_list",
                    param: JSON.stringify({
                        token: b.token,
                        gid: b.gid
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail,
                    completeCallback: b.complete
                }
            };
        },
        fetchProfileInfo: function(b) {
            return {
                SERVER_API: {
                    types: [ a.FETCH_PROFILE_INFO_REQUEST, a.FETCH_PROFILE_INFO_SUCCESS, a.FETCH_PROFILE_INFO_FAILURE ],
                    url: c.apiDomain_XNG + "/training/my",
                    param: JSON.stringify({
                        token: b.token
                    }),
                    method: "POST",
                    normalizeFunc: function(a) {
                        return a;
                    },
                    successCallback: b.success,
                    failCallback: b.fail,
                    completeCallback: b.complete
                }
            };
        }
    };
})();