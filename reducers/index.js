(function() {
    function a(a) {
        getApp();
        for (var c in a) if (a.hasOwnProperty(c)) {
            var d = a[c];
            a[c] = b(d);
        }
    }
    function b(a) {
        var b = getApp(), c = a.img_data || [], d = c.map(function(a) {
            var c = Math.floor;
            if (a) {
                var d = a.w / (b.sysInfo.windowWidth - 40), e = a.h / (.8 * b.sysInfo.windowHeight), f = a.w / a.h;
                return r({}, a, {
                    widthRate: d,
                    heightRate: e,
                    w_h_Rate: f,
                    height: d > e ? c((b.sysInfo.windowWidth - 40) / f) : a.w ? c(.8 * b.sysInfo.windowHeight) : 220,
                    width: d < e ? c(.8 * b.sysInfo.windowHeight * f) : c(b.sysInfo.windowWidth - 40)
                });
            }
        });
        return r({}, a, {
            img_data: d,
            postTime: s.getBeforeTime(a.ct),
            pv: 1e5 < a.pv ? "100000+" : a.pv,
            uv: 1e5 < a.uv ? "100000+" : a.uv
        });
    }
    var c = require("../xng_modules/redux1/dist/redux.min.js"), d = c.combineReducers, e = require("./feedFlow.js"), f = require("./userGroup.js"), g = require("./active.js"), h = require("./publicGroup.js"), i = require("./recommend.js"), j = require("./allAlbum.js"), k = require("./me.js"), l = require("./othersInfo.js"), m = require("./postMoment.js"), n = require("./ui.js"), o = require("../const/actionType.js"), p = require("../xng_modules/lodash.merge/index.js"), q = require("../xng_modules/array-union/index.js"), r = require("../xng_modules/object-assign/index.js"), s = require("../common/utils.js"), t = require("../common/wxUtils.js"), u = require("../xng_modules/es6-promise.min.js").Promise, v = d({
        me: k,
        feedFlow: e,
        postMoment: m,
        allAlbum: j,
        userGroup: f,
        publicGroup: h,
        entities: function() {
            var c, d = 0 >= arguments.length || void 0 === arguments[0] ? {
                feedFlowList: {},
                tabFeedFlowList: {},
                othersMomentList: {}
            } : arguments[0], e = arguments[1], f = e.momID, g = e.gid, h = e.mid, i = e.ac, j = e.imgIndex, k = e.page, l = e.needOverride, m = d.feedFlowList;
            m[g] = m[g] || {}, m[g].groupData = m[g].groupData || {}, m[g].feedList = m[g].feedList || {};
            var n = m[g], p = n.feedList, t = n.groupData, u = p[f], v = d.tabFeedFlowList;
            v[g] = v[g] || {};
            var w = {};
            i && (v[g][i] = v[g][i] || {}, v[g][i].feedList = v[g][i].feedList || {}, w = v[g][i]);
            var x, y, z, A = w.feedList || {}, B = A[f], C = e.fakeID, D = e.contentObj, E = e.commentID, F = e.fakeCommentID, G = e.tomid, H = e.belongMid, I = d.othersMomentList, J = e.isPersonalAllPublicFeeds;
            switch (h && (I[h] = I[h] || {}, I[h].userInfo = I[h].userInfo || {}, I[h].focusList = I[h].focusList || {}, 
            I[h].fansList = I[h].fansList || {}, I[h].feedList = I[h].feedList || {}, I[h].feedList[g] = I[h].feedList[g] || {}, 
            z = I[h].feedList[g][f], J && (z = I[h].feedList[1e4][f])), H && (I[H] = I[H] || {}, 
            I[H].userInfo = I[H].userInfo || {}, I[H].focusList = I[H].focusList || {}, I[H].fansList = I[H].fansList || {}, 
            I[H].feedList = I[H].feedList || {}, I[H].feedList[g] = I[H].feedList[g] || {}, 
            z = I[H].feedList[g][f]), e.type) {
              case o.GET_USER_FOCUS_LIST_SUCCESS:
                return c = s.uniqueObjArr(e.response.data.list, "mid") || [], I[h].focusList = {
                    list: 0 === e.startNum ? c : s.uniqueObjArr(q(I[h].focusList.list, c), "mid"),
                    hasNext: 0 !== c.length
                }, d;

              case o.GET_USER_FANS_LIST_SUCCESS:
                return c = s.uniqueObjArr(e.response.data.list, "mid") || [], I[h].fansList = {
                    list: 0 === e.startNum ? c : s.uniqueObjArr(q(I[h].fansList.list, c), "mid"),
                    hasNext: 0 !== c.length
                }, d;

              case o.SET_FOLLOW_SUCCESS:
                return I[G] && I[G].userInfo && (I[G].userInfo.isFollow = 1, I[G].userInfo.fansCount += 1), 
                H ? (((I[H].focusList.list || []).find(function(a) {
                    return a.mid === G;
                }) || {}).isFollow = 1, ((I[H].fansList.list || []).find(function(a) {
                    return a.mid === G;
                }) || {}).isFollow = 1) : (Object.keys(I).forEach(function(a) {
                    var b = I[a], c = b.focusList && b.focusList.list || [];
                    (c.find(function(a) {
                        return a.mid === G;
                    }) || {}).isFollow = 1;
                }, this), Object.keys(I).forEach(function(a) {
                    var b = I[a], c = b.fansList && b.fansList.list || [];
                    (c.find(function(a) {
                        return a.mid === G;
                    }) || {}).isFollow = 1;
                }, this)), d;

              case o.UNSET_FOLLOW_SUCCESS:
                return I[G] && I[G].userInfo && (I[G].userInfo.isFollow = 0, I[G].userInfo.fansCount = 0 > I[G].userInfo.fansCount - 1 ? 0 : I[G].userInfo.fansCount - 1), 
                H ? (((I[H].focusList.list || []).find(function(a) {
                    return a.mid === G;
                }) || {}).isFollow = 0, ((I[H].fansList.list || []).find(function(a) {
                    return a.mid === G;
                }) || {}).isFollow = 0) : (Object.values(I).forEach(function(a) {
                    var b = a.focusList && a.focusList.list || [];
                    (b.find(function(a) {
                        return a.mid === G;
                    }) || {}).isFollow = 0;
                }, this), Object.values(I).forEach(function(a) {
                    var b = a.fansList && a.fansList.list || [];
                    (b.find(function(a) {
                        return a.mid === G;
                    }) || {}).isFollow = 0;
                }, this)), d;

              case o.FETCH_USER_GROUPIN_SUCCESS:
                return I[h].userInfo = e.response.userInfo, I[h].feedList[g] = r({}, I[h].feedList[g], e.response.entities.feedFlow), 
                d;

              case o.FEED_FLOW_SUCCESS:
                return a(e.response.entities.feedFlow), n.feedList = l ? e.response.entities.feedFlow : r({}, p, e.response.entities.feedFlow), 
                t.isOwner = e.response.isOwner, d;

              case o.TAB_FEED_FLOW_SUCCESS:
                return a(e.response.entities.feedFlow), w.feedList = l ? e.response.entities.feedFlow : r({}, A, e.response.entities.feedFlow), 
                t.isOwner = e.response.isOwner, d;

              case o.POST_MOMENT_SUCCESS:
                var K = e.response.data.id, L = s.deepCopyObj(e.response.data.info), M = e.resFeedImageArr || [], N = r({}, L, 0 < M.length ? {
                    img_data: M
                } : {});
                return p[K] = b(N), d;

              case o.GROUP_INFO_SUCCESS:
                var O, P = e.response.data.group_data.type, Q = e.response.data.group_data.pub, R = e.response.data.group_data.sub_typ || 0, S = e.response.data.banner || null, T = 2 === R, U = e.response.data.group_data.tablist && 0 < e.response.data.group_data.tablist.length;
                switch (P) {
                  case 0:
                    O = 1 === R ? "活动" : Q ? "公开" : "私密";
                    break;

                  case 10:
                    O = Q ? "公开影集" : "私密影集";
                    break;

                  case 1:
                    O = T ? "作业" : "微信群绑定相册";
                    break;

                  case 2:
                    O = "个人相册";
                    break;

                  default:
                }
                return n.groupData = e.response.data.group_data, n.groupData.banner = S, n.groupData.isManager = e.response.data.manager || 0, 
                n.groupData.isInGroup = e.response.data.is_in_group || 0, n.groupData.groupTag = O, 
                n.groupData.isTiaGroup = T, n.groupData.isMultiTabGroup = U, d;

              case o.TIA_USER_SIGN_SUCCESS:
                return t.clockin = 10, d;

              case o.JOIN_GROUP_SUCCESS:
                return t.isInGroup = 1, d;

              case o.QUIT_GROUP_SUCCESS:
                return t.isInGroup = 0, d;

              case o.SHARE_MOMENT_REQUEST:
                return u && (u.share_count = (u.share_count || 0) + 1), B && (B.share_count = (B.share_count || 0) + 1), 
                z && (z.share_count = (z.share_count || 0) + 1), d;

              case o.SHARE_MOMENT_FAILURE:
                return u && (u.share_count = (u.share_count || 0) - 1), B && (B.share_count = (B.share_count || 0) - 1), 
                z && (z.share_count = (z.share_count || 0) - 1), d;

              case o.TOP_MOMENT_SUCCESS:
                return u && (u.top = 1), d;

              case o.UNTOP_MOMENT_SUCCESS:
                return u && (u.top = 0), d;

              case o.FAVOR_MOMENT_REQUEST:
                return "feedFlowPage" === k ? (u && (u.favor_data.shouldAnimatePlay = !0), B && (B.favor_data.shouldAnimatePlay = !0)) : "personalProfilePage" === k && z && (z.favor_data.shouldAnimatePlay = !0), 
                u && (u.favor_data.has_favor = 1), B && (B.favor_data.has_favor = 1), z && (z.favor_data.has_favor = 1), 
                u && (u.favor_data.total = (u.favor_data.total || 0) + 1), B && (B.favor_data.total = (B.favor_data.total || 0) + 1), 
                z && (z.favor_data.total = (z.favor_data.total || 0) + 1), d;

              case o.UNFAVOR_MOMENT_FAILURE:
                return u && (u.favor_data.has_favor = 1), B && (B.favor_data.has_favor = 1), z && (z.favor_data.has_favor = 1), 
                u && (u.favor_data.total = (u.favor_data.total || 0) + 1), B && (B.favor_data.total = (B.favor_data.total || 0) + 1), 
                z && (z.favor_data.total = (z.favor_data.total || 0) + 1), d;

              case o.UNFAVOR_MOMENT_REQUEST:
              case o.FAVOR_MOMENT_FAILURE:
                return "feedFlowPage" === k ? (u && (u.favor_data.shouldAnimatePlay = !1), B && (B.favor_data.shouldAnimatePlay = !1)) : "personalProfilePage" === k && z && (z.favor_data.shouldAnimatePlay = !1), 
                u && (u.favor_data.has_favor = 0), B && (B.favor_data.has_favor = 0), z && (z.favor_data.has_favor = 0), 
                u && (u.favor_data.total = (u.favor_data.total || 0) - 1), B && (B.favor_data.total = (B.favor_data.total || 0) - 1), 
                z && (z.favor_data.total = (z.favor_data.total || 0) - 1), d;

              case o.RESET_FAVOR_ANIMATE:
                return "feedFlowPage" === k ? (u && (u.favor_data.shouldAnimatePlay = !1), B && (B.favor_data.shouldAnimatePlay = !1)) : "personalProfilePage" === k && z && (z.favor_data.shouldAnimatePlay = !1), 
                d;

              case o.IMG_LOAD_ERROR:
                return "feedFlowPage" === k ? (u && !i && (u.img_data[j].isPicErr = !0), B && i && (B.img_data[j].isPicErr = !0)) : "personalProfilePage" === k && z && (z.img_data[j].isPicErr = !0), 
                d;

              case o.IMG_RELOAD:
                return "feedFlowPage" === k ? (u && !i && (u.img_data[j].isPicErr = !1), B && i && (B.img_data[j].isPicErr = !1)) : "personalProfilePage" === k && z && (z.img_data[j].isPicErr = !1), 
                d;

              case o.SUBMIT_COMMENT_REQUEST:
                return u && u.comments_some.push(D), B && B.comments_some.push(D), z && z.comments_some.push(D), 
                u && (u.comments_count = (u.comments_count || 0) + 1), B && (B.comments_count = (B.comments_count || 0) + 1), 
                z && (z.comments_count = (z.comments_count || 0) + 1), d;

              case o.SUBMIT_COMMENT_SUCCESS:
                return u && (x = u.comments_some || [], y = x.find(function(a) {
                    return a.fakeID === C;
                }), y && (y.id = e.response.data.id)), B && (x = B.comments_some || [], y = x.find(function(a) {
                    return a.fakeID === C;
                }), y && (y.id = e.response.data.id)), z && (x = z.comments_some || [], y = x.find(function(a) {
                    return a.fakeID === C;
                }), y && (y.id = e.response.data.id)), d;

              case o.DEL_COMMENT_REQUEST:
                return u && (u.comments_count = (u.comments_count || 0) - 1, u.comments_some = u.comments_some.filter(function(a) {
                    return E ? a.id !== E : F ? a.fakeID !== F : a;
                })), B && (B.comments_count = (B.comments_count || 0) - 1, B.comments_some = B.comments_some.filter(function(a) {
                    return E ? a.id !== E : F ? a.fakeID !== F : a;
                })), z && (z.comments_count = (z.comments_count || 0) - 1, z.comments_some = z.comments_some.filter(function(a) {
                    return E ? a.id !== E : F ? a.fakeID !== F : a;
                })), d;

              case o.MODIFY_GRP_NAME_SUCCESS:
                return t.name = e.name, d;

              case o.MODIFY_GRP_PUBLIC_SUCCESS:
                return t.pub = e.pub, t.groupTag = e.pub ? "公开" : "私密", d;

              case o.MODIFY_GRP_DESC_SUCCESS:
                return t.desc = e.desc, d;

              default:
                return d;
            }
        },
        wx: function() {
            var a, b = 0 >= arguments.length || arguments[0] === void 0 ? {
                user: {}
            } : arguments[0], c = arguments[1];
            switch (c.type) {
              case o.WX_LOGIN_SUCCESS:
              case o.WX_JS_USERINFO_SUCCESS:
                return r({}, b, c.response.data);

              case o.GET_XBD_USERINFO_SUCCESS:
                return a = r({}, b.user, c.response.data), r({}, b, {
                    user: a
                });

              case o.CHANGE_PUSH_STATE_REQUEST:
                return a = r({}, b.user), "on" === c.state ? a.rpst = 10 : "off" === c.state && (a.rpst = -10), 
                r({}, b, {
                    user: a
                });

              case o.LOGIN_SUCCESS:
                return r({}, b, c.response.data);

              case o.MODIFY_OWN_NICK_SUCCESS:
                return a = b.user, a.nick = c.nickname, b;

              case o.FETCH_MY_MOMENT_LIST_SUCCESS:
                return a = r({}, b.user, {
                    fansCount: c.response.data.fansCount,
                    followCount: c.response.data.followCount
                }), r({}, b, {
                    user: a
                });

              case o.SET_FOLLOW_SUCCESS:
                return a = r({}, b.user, {
                    followCount: b.user.followCount + 1
                }), r({}, b, {
                    user: a
                });

              case o.UNSET_FOLLOW_SUCCESS:
                return a = r({}, b.user, {
                    followCount: 0 > b.user.followCount - 1 ? 0 : b.user.followCount - 1
                }), r({}, b, {
                    user: a
                });

              default:
                return b;
            }
        },
        errorMessage: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? null : arguments[0], b = arguments[1], c = b.type, d = b.error;
            if (c === o.RESET_ERROR_MESSAGE) return null;
            return d ? b.error : a;
        },
        othersInfo: l,
        recommend: i,
        active: g,
        ui: n
    });
    module.exports = v;
})();