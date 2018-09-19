(function() {
    var a = require("../const/actionType.js"), b = require("../xng_modules/normalizr/dist/normalizr.min.js").normalize, c = require("../config/config.js"), d = require("../schemas/schemas.js"), e = getApp(), f = require("../xng_modules/object-assign/index.js"), g = e.sysInfo.pixelRatio, h = e.sysInfo.windowWidth * g, i = e.sysInfo.windowHeight * g;
    module.exports = {
        getActiveList: function(b) {
            return {
                SERVER_API: {
                    types: [ a.GET_ACTIVE_LIST_REQUEST, a.GET_ACTIVE_LIST_SUCCESS, a.GET_ACTIVE_LIST_FAILURE ],
                    url: c.apiDomain + "/activity/list_activity",
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
        },
        getCardInfo: function(b) {
            return {
                SERVER_API: {
                    types: [ a.GET_CARD_INFO_REQUEST, a.GET_CARD_INFO_SUCCESS, a.GET_CARD_INFO_FAILURE ],
                    url: c.apiDomain + "/activity/get_card_info",
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
        },
        uploadRedBagGameScore: function(b) {
            return {
                SERVER_API: {
                    types: [ a.UPLOAD_RED_BAG_GAME_SCORE_REQUEST, a.UPLOAD_RED_BAG_GAME_SCORE_SUCCESS, a.UPLOAD_RED_BAG_GAME_SCORE_FAILURE ],
                    url: c.apiDomain + "/activity/up_score",
                    param: JSON.stringify({
                        token: b.token,
                        score: b.score
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