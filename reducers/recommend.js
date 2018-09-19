(function() {
    function a(a) {
        var b = getApp(), c = a.img_data || [], d = c.map(function(a) {
            var c = Math.floor, d = a.w / (b.sysInfo.windowWidth - 40), f = a.h / (.8 * b.sysInfo.windowHeight), g = a.w / a.h;
            return a ? e({}, a, {
                widthRate: d,
                heightRate: f,
                w_h_Rate: g,
                height: d > f ? c((b.sysInfo.windowWidth - 40) / g) : c(.8 * b.sysInfo.windowHeight),
                width: d < f ? c(.8 * b.sysInfo.windowHeight * g) : c(b.sysInfo.windowWidth - 40)
            }) : void 0;
        });
        return e({}, a, {
            img_data: d,
            postTime: h.getBeforeTime(a.ct),
            pv: 1e5 < a.pv ? "100000+" : a.pv,
            uv: 1e5 < a.uv ? "100000+" : a.uv
        });
    }
    var b = require("../xng_modules/redux1/dist/redux.min.js"), c = b.combineReducers, d = require("../const/actionType.js"), e = require("../xng_modules/object-assign/index.js"), f = require("../xng_modules/lodash.merge/index.js"), g = require("../xng_modules/array-union/index.js"), h = require("../common/utils.js"), i = h.findArrayItem, j = h.checkDoesArrHaveContent, k = function(a, b) {
        return (a || []).find(function(a) {
            return a.id == b;
        });
    };
    module.exports = c({
        banner: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? null : arguments[0], b = arguments[1];
            switch (b.type) {
              case d.FETCH_RECOMMEND_LIST_SUCCESS:
                return b.response.data.banner || null;

              default:
                return a;
            }
        },
        subNotice: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? null : arguments[0], b = arguments[1];
            switch (b.type) {
              case d.FETCH_RECOMMEND_LIST_SUCCESS:
                return b.response.data.subNotice || null;

              case d.CHANGE_PUSH_STATE_REQUEST:
                return null;

              default:
                return a;
            }
        },
        recommendData: function() {
            var b, c, i, j, l, m, n, o, p, q = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0,
                unreadCount: 0,
                updateCount: 0
            } : arguments[0], r = arguments[1], s = q.list, t = r.momID, u = 1e4 === r.gid, v = r.fakeID, w = r.contentObj, x = r.commentID, y = r.fakeCommentID, z = r.imgIndex, A = r.page;
            switch (r.type) {
              case d.FETCH_RECOMMEND_LIST_SUCCESS:
              case d.FETCH_FAKE_RECOMMEND_LIST_SUCCESS:
                return j = h.uniqueObjArr(r.response.data.list, "id"), l = e({}, q, {
                    list: 0 === r.startNum || r.needOverride ? j : h.uniqueObjArr(r.pre ? g(j, q.list) : g(q.list, j), "id"),
                    desc: r.response.data.desc,
                    hasNext: r.pre ? q.hasNext : 0 !== j.length,
                    updateCount: r.response.data.update_count,
                    sendDesc: r.response.data.send_desc
                }), l;

              case d.POST_MOMENT_SUCCESS:
                return u ? (m = r.response.data.id, n = h.deepCopyObj(r.response.data.info), o = r.resFeedImageArr || [], 
                p = e({
                    isFake: !0
                }, n, 0 < o.length ? {
                    img_data: o
                } : {}), e({}, q, {
                    list: g([ a(p) ], q.list)
                })) : q;

              case d.DEL_MOMENT_SUCCESS:
                return u ? (i = k(s, t), i ? e({}, q, {
                    list: q.list.filter(function(a) {
                        return a.id !== t;
                    })
                }) : q) : q;

              case d.DISLIKE_MOMENT_SUCCESS:
              case d.COMPLAIN_MOMENT_SUCCESS:
                return i = k(s, t), i ? e({}, q, {
                    list: q.list.filter(function(a) {
                        return a.id !== t;
                    })
                }) : q;

              case d.CUT_FRONT_RECOMMEND_ITEMS:
                return l = e({}, q, {
                    list: q.list.slice(-r.count)
                }), l;

              case d.SHARE_MOMENT_REQUEST:
                return k(s, t) ? (k(s, t).share_count = (k(s, t).share_count || 0) + 1, f({}, q, {
                    list: s
                })) : q;

              case d.SET_FOLLOW_REQUEST:
                return k(s, t) ? (k(s, t).user_data.isFollow = 1, f({}, q, {
                    list: s
                })) : q;

              case d.SHARE_MOMENT_FAILURE:
                return k(s, t) ? (k(s, t).share_count = (k(s, t).share_count || 0) - 1, f({}, q, {
                    list: s
                })) : q;

              case d.FAVOR_MOMENT_REQUEST:
                return k(s, t) ? ("recommendFeedFlowPage" === A && (k(s, t).favor_data.shouldAnimatePlay = !0), 
                k(s, t).favor_data.has_favor = 1, k(s, t).favor_data.total = (k(s, t).favor_data.total || 0) + 1, 
                f({}, q, {
                    list: s
                })) : q;

              case d.UNFAVOR_MOMENT_FAILURE:
                return k(s, t) ? (k(s, t).favor_data.has_favor = 1, k(s, t).favor_data.total = (k(s, t).favor_data.total || 0) + 1, 
                f({}, q, {
                    list: s
                })) : q;

              case d.UNFAVOR_MOMENT_REQUEST:
              case d.FAVOR_MOMENT_FAILURE:
                return console.log(s), k(s, t) ? ("recommendFeedFlowPage" === A && (k(s, t).favor_data.shouldAnimatePlay = !1), 
                k(s, t).favor_data.has_favor = 0, k(s, t).favor_data.total = (k(s, t).favor_data.total || 0) - 1, 
                f({}, q, {
                    list: s
                })) : q;

              case d.RESET_FAVOR_ANIMATE:
                return k(s, t) ? ("recommendFeedFlowPage" === A && (k(s, t).favor_data.shouldAnimatePlay = !1), 
                f({}, q, {
                    list: s
                })) : q;

              case d.SUBMIT_COMMENT_REQUEST:
                return k(s, t) ? (k(s, t).comments_some.push(w), k(s, t).comments_count = (k(s, t).comments_count || 0) + 1, 
                f({}, q, {
                    list: s
                })) : q;

              case d.SUBMIT_COMMENT_SUCCESS:
                return k(s, t) ? (b = k(s, t).comments_some || [], c = b.find(function(a) {
                    return a.fakeID === v;
                }), c.id = r.response.data.id, f({}, q, {
                    list: s
                })) : q;

              case d.DEL_COMMENT_REQUEST:
                return k(s, t) ? (k(s, t).comments_count = (k(s, t).comments_count || 0) - 1, k(s, t).comments_some = k(s, t).comments_some.filter(function(a) {
                    return x ? a.id !== x : y ? a.fakeID !== y : a;
                }), f({}, q, {
                    list: s
                })) : q;

              case d.SUBMIT_FAKE_COMMENT:
                return k(s, t) ? (k(s, t).comments_some.push(w), f({}, q, {
                    list: s
                })) : q;

              case d.IMG_LOAD_ERROR:
                return "recommendFeedFlowPage" === A ? k(s, t) ? (k(s, t).img_data[z].isPicErr = !0, 
                f({}, q, {
                    list: s
                })) : q : q;

              case d.IMG_NEED_GIF:
                return "recommendFeedFlowPage" === A ? k(s, t) ? (k(s, t).img_data[z].needGif = !0, 
                f({}, q, {
                    list: s
                })) : q : q;

              case d.IMG_RELOAD:
                return "recommendFeedFlowPage" === A ? k(s, t) ? (k(s, t).img_data[z].isPicErr = !1, 
                f({}, q, {
                    list: s
                })) : q : q;

              default:
                return q;
            }
        }
    });
})();