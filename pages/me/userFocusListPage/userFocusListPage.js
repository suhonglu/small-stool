(function() {
    var a = getApp(), b = a.store.dispatch, c = require("../../../actions/index.js"), d = require("../../../actions/me.js"), e = require("../../../common/wxUtils.js");
    Page({
        data: {
            personList: {
                list: [],
                focusHandler: "handleFocus",
                itemTapHandler: "handleNavProfile"
            },
            isFetching: !0,
            hasNext: !0
        },
        mapStateToData: function(a) {
            var b = this.mid === +this.hrefMid, c = b ? a.me.ownFocusList : a.entities.othersMomentList[this.hrefMid].focusList, d = c.list, e = c.hasNext;
            this.setData({
                "personList.list": d,
                hasNext: e
            });
        },
        onLoad: function(d) {
            this.hrefMid = d.mid, this.belongGid = d.belonggid, this.mid = a.store.getState().wx.user.mid, 
            a.xu.mta.Page.init(), wx.setNavigationBarTitle({
                title: "关注列表"
            }), e.getUserAuthorize(a, b, c, this.onStandBy);
        },
        onReady: function() {},
        onShow: function() {
            this.mapStateToData(a.store.getState());
        },
        onStandBy: function() {
            this.handleFetchList();
        },
        onHide: function() {},
        onUnload: function() {},
        onPullDownRefresh: function() {
            wx.showNavigationBarLoading(), this.handleFetchList().then(function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }).catch(function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            });
        },
        onReachBottom: function() {
            var a = this.data.personList.list, b = a[a.length - 1].sort_num, c = this.data.hasNext;
            c && this.handleFetchList(b);
        },
        handleFetchList: function(c) {
            var e = this;
            return this.setData({
                isFetching: !0
            }), b(d.fetchUserFocusList({
                token: a.xu.token,
                mid: this.hrefMid,
                isMyself: this.mid === +this.hrefMid,
                startNum: c,
                fail: function(b) {
                    a.xu.showToast(b);
                },
                complete: function() {
                    e.setData({
                        isFetching: !1
                    });
                }
            }));
        },
        handleFocus: function(c) {
            var e = c.currentTarget.dataset.index, f = this.data.personList.list[e], g = f.isFollow;
            switch (g) {
              case 0:
                b(d.setFollow({
                    token: a.xu.token,
                    tomid: f.mid,
                    isMyself: this.mid === +this.hrefMid,
                    belongMid: this.hrefMid
                }));
                break;

              case 1:
                b(d.unsetFollow({
                    token: a.xu.token,
                    tomid: f.mid,
                    isMyself: this.mid === +this.hrefMid,
                    belongMid: this.hrefMid
                }));
                break;

              default:
            }
        },
        handleNavProfile: function(a) {
            var b = a.currentTarget.dataset.index, c = this.data.personList.list[b], d = this.belongGid, e = c.mid;
            wx.navigateTo({
                url: "../personalProfilePage/personalProfilePage?mid=" + e + (d ? "&gid=" + d : "")
            });
        }
    });
})();