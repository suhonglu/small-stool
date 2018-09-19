(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = require("../common/wxUtils.js"), i = g.findArrayItem, j = g.checkDoesArrHaveContent, k = function(a, b) {
        return i(a, function(a) {
            return a.id == b;
        });
    }, l = b({
        interaction: function() {
            var a, b, g = 0 >= arguments.length || arguments[0] === void 0 ? h.getStorageSync("home-interactionPage_data") || {
                list: [],
                hasNext: !0,
                unreadCount: 0
            } : arguments[0], i = arguments[1], j = g.list, l = i.momID, m = i.fakeID, n = i.contentObj, o = i.commentID, p = i.fakeCommentID, q = i.imgIndex, r = i.page;
            switch (i.type) {
              case c.FETCH_INTERACTION_LIST_SUCCESS:
                var s = d({}, g, {
                    list: 0 === i.start ? i.response.data.list : f(g.list, i.response.data.list),
                    hasNext: 0 !== i.response.data.list.length
                });
                return 10 >= s.list.length && wx.setStorage({
                    key: "home-interactionPage_data",
                    data: s
                }), s;

              case c.SHARE_MOMENT_REQUEST:
                return k(j, l) ? (k(j, l).share_count = (k(j, l).share_count || 0) + 1, e({}, g, {
                    feedFlow: j
                })) : g;

              case c.SHARE_MOMENT_FAILURE:
                return k(j, l) ? (k(j, l).share_count = (k(j, l).share_count || 0) - 1, e({}, g, {
                    feedFlow: j
                })) : g;

              case c.FAVOR_MOMENT_REQUEST:
                return k(j, l) ? (k(j, l).favor_data.has_favor = 1, "interactionPage" === r && (k(j, l).favor_data.shouldAnimatePlay = !0), 
                k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) + 1, e({}, g, {
                    feedFlow: j
                })) : g;

              case c.UNFAVOR_MOMENT_FAILURE:
                return k(j, l) ? (k(j, l).favor_data.has_favor = 1, k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) + 1, 
                e({}, g, {
                    feedFlow: j
                })) : g;

              case c.UNFAVOR_MOMENT_REQUEST:
              case c.FAVOR_MOMENT_FAILURE:
                return console.log(j), k(j, l) ? ("interactionPage" === r && (k(j, l).favor_data.shouldAnimatePlay = !1), 
                k(j, l).favor_data.has_favor = 0, k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) - 1, 
                e({}, g, {
                    feedFlow: j
                })) : g;

              case c.RESET_FAVOR_ANIMATE:
                return k(j, l) ? ("interactionPage" === r && (k(j, l).favor_data.shouldAnimatePlay = !1), 
                e({}, g, {
                    feedFlow: j
                })) : g;

              case c.SUBMIT_COMMENT_REQUEST:
                return k(j, l) ? (k(j, l).comments_some.push(n), k(j, l).comments_count = (k(j, l).comments_count || 0) + 1, 
                e({}, g, {
                    feedFlow: j
                })) : g;

              case c.SUBMIT_COMMENT_SUCCESS:
                return k(j, l) ? (a = k(j, l).comments_some || [], b = a.find(function(a) {
                    return a.fakeID === m;
                }), b.id = i.response.data.id, e({}, g, {
                    feedFlow: j
                })) : g;

              case c.DEL_COMMENT_REQUEST:
                return k(j, l) ? (k(j, l).comments_count = (k(j, l).comments_count || 0) - 1, k(j, l).comments_some = k(j, l).comments_some.filter(function(a) {
                    return o ? a.id !== o : p ? a.fakeID !== p : a;
                }), e({}, g, {
                    feedFlow: j
                })) : g;

              case c.GET_USER_GROUP_LIST_SUCCESS:
                return d({}, g, {
                    unreadCount: i.response.data.new_interaction_count
                });

              case c.FETCH_RECOMMEND_LIST_SUCCESS:
                return d({}, g, {
                    unreadCount: i.response.data.new_interaction_count
                });

              case c.CLEAR_INTERACTION_ICO:
                return d({}, g, {
                    unreadCount: 0
                });

              case c.SUBMIT_FAKE_COMMENT:
                return k(j, l) ? (k(j, l).comments_some.push(n), e({}, g, {
                    feedFlow: j
                })) : g;

              case c.IMG_LOAD_ERROR:
                return "interactionPage" === r ? k(j, l) ? (k(j, l).img_data[q].isPicErr = !0, e({}, g, {
                    feedFlow: j
                })) : g : g;

              case c.IMG_RELOAD:
                return "interactionPage" === r ? k(j, l) ? (k(j, l).img_data[q].isPicErr = !1, e({}, g, {
                    feedFlow: j
                })) : g : g;

              default:
                return g;
            }
        },
        ownFocusList: function() {
            var a, b = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0
            } : arguments[0], e = arguments[1], h = e.isMyself, i = e.tomid, j = b.list.find(function(a) {
                return a.mid === i;
            }) || {};
            switch (e.type) {
              case c.GET_USER_FOCUS_LIST_SUCCESS:
                return h ? (a = g.uniqueObjArr(e.response.data.list, "mid") || [], d({}, b, {
                    list: 0 === e.startNum ? a : g.uniqueObjArr(f(b.list, a), "mid"),
                    hasNext: 0 !== a.length
                })) : b;

              case c.SET_FOLLOW_SUCCESS:
                return j.isFollow = 1, b;

              case c.UNSET_FOLLOW_SUCCESS:
                return j.isFollow = 0, b;

              default:
                return b;
            }
        },
        ownFansList: function() {
            var a, b = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0
            } : arguments[0], e = arguments[1], h = e.isMyself, i = e.tomid, j = b.list.find(function(a) {
                return a.mid === i;
            }) || {};
            switch (e.type) {
              case c.GET_USER_FANS_LIST_SUCCESS:
                return h ? (a = g.uniqueObjArr(e.response.data.list, "mid") || [], d({}, b, {
                    list: 0 === e.startNum ? a : g.uniqueObjArr(f(b.list, a), "mid"),
                    hasNext: 0 !== a.length
                })) : b;

              case c.SET_FOLLOW_SUCCESS:
                return j.isFollow = 1, b;

              case c.UNSET_FOLLOW_SUCCESS:
                return j.isFollow = 0, b;

              default:
                return b;
            }
        },
        ownMomentList: function() {
            var a, b, g = 0 >= arguments.length || arguments[0] === void 0 ? h.getStorageSync("home-mePage_data") || {
                list: [],
                hasNext: !0,
                unreadCount: 0,
                kf: !1
            } : arguments[0], i = arguments[1], j = g.list, l = i.momID, m = i.imgIndex, n = i.fakeID, o = i.contentObj, p = i.commentID, q = i.fakeCommentID, r = i.page;
            switch (i.type) {
              case c.FETCH_MY_MOMENT_LIST_SUCCESS:
                var s = d({}, g, {
                    list: 0 === i.start_id ? i.response.data.list : f(g.list, i.response.data.list),
                    hasNext: 0 !== i.response.data.list.length,
                    kf: !!i.response.data.kf
                });
                return 10 >= s.list.length && wx.setStorage({
                    key: "home-mePage_data",
                    data: s
                }), s;

              case c.SHARE_MOMENT_REQUEST:
                return k(j, l) ? (k(j, l).share_count = (k(j, l).share_count || 0) + 1, e({}, g, {
                    list: j
                })) : g;

              case c.SHARE_MOMENT_FAILURE:
                return k(j, l) ? (k(j, l).share_count = (k(j, l).share_count || 0) - 1, e({}, g, {
                    list: j
                })) : g;

              case c.FAVOR_MOMENT_REQUEST:
                return k(j, l) ? ("myOwnProfilePage" === r && (k(j, l).favor_data.shouldAnimatePlay = !0), 
                k(j, l).favor_data.has_favor = 1, k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) + 1, 
                e({}, g, {
                    list: j
                })) : g;

              case c.UNFAVOR_MOMENT_FAILURE:
                return k(j, l) ? (k(j, l).favor_data.has_favor = 1, k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) + 1, 
                e({}, g, {
                    list: j
                })) : g;

              case c.UNFAVOR_MOMENT_REQUEST:
              case c.FAVOR_MOMENT_FAILURE:
                return console.log(j), k(j, l) ? ("myOwnProfilePage" === r && (k(j, l).favor_data.shouldAnimatePlay = !1), 
                k(j, l).favor_data.has_favor = 0, k(j, l).favor_data.total = (k(j, l).favor_data.total || 0) - 1, 
                e({}, g, {
                    list: j
                })) : g;

              case c.RESET_FAVOR_ANIMATE:
                return console.log(j), k(j, l) ? ("myOwnProfilePage" === r && (k(j, l).favor_data.shouldAnimatePlay = !1), 
                e({}, g, {
                    list: j
                })) : g;

              case c.SUBMIT_COMMENT_REQUEST:
                return k(j, l) ? (k(j, l).comments_some.push(o), k(j, l).comments_count = (k(j, l).comments_count || 0) + 1, 
                e({}, g, {
                    list: j
                })) : g;

              case c.SUBMIT_COMMENT_SUCCESS:
                return k(j, l) ? (a = k(j, l).comments_some || [], b = a.find(function(a) {
                    return a.fakeID === n;
                }), b.id = i.response.data.id, e({}, g, {
                    list: j
                })) : g;

              case c.DEL_COMMENT_REQUEST:
                return k(j, l) ? (k(j, l).comments_count = (k(j, l).comments_count || 0) - 1, k(j, l).comments_some = k(j, l).comments_some.filter(function(a) {
                    return p ? a.id !== p : q ? a.fakeID !== q : a;
                }), e({}, g, {
                    list: j
                })) : g;

              case c.SUBMIT_FAKE_COMMENT:
                return k(j, l) ? (k(j, l).comments_some.push(o), e({}, g, {
                    list: j
                })) : g;

              case c.DEL_MOMENT_SUCCESS:
                return console.log(j, l), j = j.filter(function(a) {
                    return a.id !== l;
                }), d({}, g, {
                    list: j
                });

              case c.IMG_LOAD_ERROR:
                return "myOwnProfilePage" === r ? k(j, l) ? (k(j, l).img_data[m].isPicErr = !0, 
                e({}, g, {
                    list: j
                })) : g : g;

              case c.IMG_RELOAD:
                return "myOwnProfilePage" === r ? k(j, l) ? (k(j, l).img_data[m].isPicErr = !1, 
                e({}, g, {
                    list: j
                })) : g : g;

              default:
                return g;
            }
        },
        ownXngAlbumList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0,
                nextStartTime: -1
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.FETCH_MY_XNG_ALBUM_LIST_SUCCESS:
                var e = b.response.data.list.map(function(a) {
                    return a.time = g.formatUnixTime4YMDHM(a.t, !0, "."), a;
                }), h = d({}, a, {
                    list: -1 === b.startTime ? e : f(a.list, e),
                    hasNext: e.length >= b.limit,
                    nextStartTime: b.response.data.next_t
                });
                return wx.setStorage({
                    key: "myOwn-xng-album_data",
                    data: h
                }), h;

              default:
                return a;
            }
        },
        ownTiaMissionList: function() {
            var a = 0 >= arguments.length || void 0 === arguments[0] ? {} : arguments[0], b = arguments[1], e = b.gid;
            if ("undefined" == typeof e) return a;
            switch (a[e] = a[e] || {
                list: [],
                hasNext: !0,
                nextStartTime: -1
            }, b.type) {
              case c.FETCH_MY_TIA_MISSION_LIST_SUCCESS:
                var g = b.response.data.list || [], h = {};
                return h[e] = {
                    list: 0 === b.startNum ? g : f(a[e].list, g),
                    hasNext: g.length >= b.limit,
                    nextStartNum: g[g.length - 1] ? g[g.length - 1].sort_num : 0
                }, d({}, a, h);

              default:
                return a;
            }
        },
        ownTiaCourseList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {} : arguments[0], b = arguments[1], e = b.gid, f = b.lessonId, g = {};
            switch (b.type) {
              case c.GET_MY_TIA_COURSE_LIST_SUCCESS:
                var h = b.response.data.list || [];
                return g[e] = {
                    list: h
                }, d({}, a, g);

              case c.GET_MY_TIA_COURSE_DETAIL_SUCCESS:
                var i = b.response.data.lesson || {};
                i.details.forEach(function(a, b) {
                    a.id = "text_" + b;
                });
                var j = a[e].lessonDetailList || {};
                return j[f] = i, g[e] = d({}, a[e], {
                    lessonDetailList: j
                }), console.log(a, g), d({}, a, g);

              default:
                return a;
            }
        },
        publicMiniAppController: function() {
            var a, b = 0 >= arguments.length || arguments[0] === void 0 ? {
                shouleSensitiveContentHide: !1
            } : arguments[0], e = arguments[1];
            switch (e.type) {
              case c.GET_USER_GROUP_LIST_SUCCESS:
                return a = d({}, b, {
                    shouleSensitiveContentHide: !!e.response.data.nosend
                }), a;

              case c.FETCH_RECOMMEND_LIST_SUCCESS:
                return a = d({}, b, {
                    shouleSensitiveContentHide: !!e.response.data.nosend
                }), a;

              default:
                return b;
            }
        }
    });
    module.exports = l;
})();