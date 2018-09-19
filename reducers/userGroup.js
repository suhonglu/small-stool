(function() {
    var a = require("../xng_modules/redux1/dist/redux.min.js"), b = a.combineReducers, c = require("../const/actionType.js"), d = require("../xng_modules/object-assign/index.js"), e = require("../xng_modules/lodash.merge/index.js"), f = require("../xng_modules/array-union/index.js"), g = require("../common/utils.js"), h = require("../common/wxUtils.js"), i = g.findArrayItem, j = b({
        banner: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? null : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_USER_GROUP_LIST_SUCCESS:
                return b.response.data.banner || null;

              default:
                return a;
            }
        },
        userGroupTabs: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? h.getStorageSync("home-listPage_tabs") || [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_USER_GROUP_LIST_SUCCESS:
                var d = b.response.data.tabs || [];
                return wx.setStorage({
                    key: "home-listPage_tabs",
                    data: d
                }), d;

              default:
                return a;
            }
        },
        userGroupList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? h.getStorageSync("home-listPage_data") || {} : arguments[0], b = arguments[1], d = b.gid;
            switch (b.type) {
              case c.GET_USER_GROUP_LIST_SUCCESS:
                var e = b.response.data.tabs || [], g = 1 >= e.length, i = {};
                return g ? i.list = b.response.data.list.map(function(a) {
                    a.imageList = a.imageList.map(function(a) {
                        return a || {};
                    });
                    var b, c = a.type, d = a.pub, e = a.sub_typ || 0;
                    switch (c) {
                      case 0:
                        b = 1 === e ? "活动" : d ? "公开" : "私密";
                        break;

                      case 10:
                        b = d ? "公开影集" : "私密影集";
                        break;

                      case 1:
                        b = 2 === e ? "作业" : "微信群绑定相册";
                        break;

                      case 2:
                        b = "个人相册";
                        break;

                      default:
                    }
                    return a.groupTag = b, a;
                }) : e.forEach(function(a) {
                    var c = a.data_name, d = b.response.data[c];
                    i[c] = d.map(function(a) {
                        var b, c = a.type, d = a.pub, e = a.sub_typ || 0;
                        switch (a.imageList = a.imageList.map(function(a) {
                            return a || {};
                        }), c) {
                          case 0:
                            b = 1 === e ? "活动" : d ? "公开" : "私密";
                            break;

                          case 10:
                            b = d ? "公开影集" : "私密影集";
                            break;

                          case 1:
                            b = 2 === e ? "作业" : "微信群绑定相册";
                            break;

                          case 2:
                            b = "个人相册";
                            break;

                          default:
                        }
                        return a.groupTag = b, a;
                    });
                }), wx.setStorage({
                    key: "home-listPage_data",
                    data: i
                }), i;

              case c.QUIT_GROUP_SUCCESS:
                for (var j in a) if (a.hasOwnProperty(j)) {
                    var k = a[j];
                    a[j] = k.filter(function(a) {
                        return a.id !== d;
                    });
                }
                return a;

              case c.ADD_GROUP_SUCCESS:
                var l = b.response.data.list;
                for (var j in a) if (a.hasOwnProperty(j)) {
                    var k = a[j];
                    a[j] = f(k, l);
                }
                return a;

              case c.TOP_GROUP_SUCCESS:
                for (var j in a) if (a.hasOwnProperty(j)) {
                    var k = a[j], m = k.find(function(a) {
                        return a.id === d;
                    }) || {};
                    m.top = 1;
                    var n = k.filter(function(a) {
                        return a.id !== d;
                    });
                    n.unshift(m), a[j] = n;
                }
                return a;

              case c.UNTOP_GROUP_SUCCESS:
                for (var j in a) if (a.hasOwnProperty(j)) {
                    var k = a[j], m = k.find(function(a) {
                        return a.id === d;
                    }) || {};
                    m.top = 0;
                }
                return a;

              case c.CLEAR_UNREAD_ICO:
                for (var j in a) if (a.hasOwnProperty(j)) {
                    var k = a[j], m = k.find(function(a) {
                        return a.id === d;
                    }) || {};
                    m.new_msg_count = 0;
                }
                return a;

              default:
                return a;
            }
        },
        userGroupBasisList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? {
                list: [],
                hasNext: !0
            } : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_USER_GROUP_BASIS_LIST_SUCCESS:
                return d({}, a, {
                    list: b.startNum ? f(a.list, b.response.data.list) : b.response.data.list,
                    hasNext: b.response.data.list.length >= b.limit
                });

              case c.ADD_GROUP_SUCCESS:
                var e = b.response.data.list;
                return d({}, a, {
                    list: f(e, a.list)
                });

              default:
                return a;
            }
        },
        recommendGroupList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? h.getStorageSync("home-listPage-recommend_data") || [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_USER_GROUP_LIST_SUCCESS:
                var d = b.response.data.recommend.map(function(a) {
                    return a.imageList = a.imageList.map(function(a) {
                        return a || {};
                    }), a;
                });
                return wx.setStorage({
                    key: "home-listPage-recommend_data",
                    data: d
                }), d;

              default:
                return a;
            }
        },
        isFetching: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? 0 : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.GET_USER_GROUP_LIST_REQUEST:
                return 1;

              case c.GET_USER_GROUP_LIST_SUCCESS:
              case c.GET_USER_GROUP_LIST_FAILURE:
                return 0;

              default:
                return a;
            }
        },
        currentGroupMemberList: function() {
            var a = 0 >= arguments.length || arguments[0] === void 0 ? [] : arguments[0], b = arguments[1];
            switch (b.type) {
              case c.FETCH_GROUP_MEMBER_SUCCESS:
                var d = b.startNum || 0;
                return 0 === d ? b.response.data.list : f(a, b.response.data.list);

              case c.KICKOUT_GROUP_MEMBER_SUCCESS:
                var e = b.mids;
                return a.filter(function(a) {
                    return -1 === e.indexOf(a.user_data.mid);
                });

              case c.RESET_GROUP_MEMBER:
                return [];

              default:
                return a;
            }
        }
    });
    module.exports = j;
})();