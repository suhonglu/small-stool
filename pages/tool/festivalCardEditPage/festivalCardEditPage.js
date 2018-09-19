(function() {
    var a = require("../../../actions/allAlbum.js"), b = require("../../../actions/index.js"), c = getApp(), d = c.store.dispatch, f = require("../../../common/utils.js"), e = require("../../../common/wxUtils.js"), g = require("../../../xng_modules/object-assign/index.js"), h = require("../../../xng_modules/es6-promise.min.js"), i = [ "欢欢喜喜迎狗年，祥瑞降人间。万事如意平安年，祝福满心田。扬眉吐气顺心年，幸福不间断。合家欢乐幸福年，家家乐翩翩。祝君狗年吉祥，万事如意！", "春节欢欢乐乐，烟花灿灿烂烂，爱情甜甜蜜蜜，幸福缠缠绵绵，生活红红火火，好运永永远远，祝福温温馨馨，愿一家人恩恩爱爱、团团圆圆、长长久久。", "新的一年，愿您抱着平安，拥着健康，揣着幸福，携着快乐，搂着温馨，带着甜蜜，带着财运，拽着吉祥，迈入新年，快乐度过每一天!", "春风，一缕一缕，缕缕柔暖；鞭炮，一串一串，串串喜庆；短信，一条一条，条条情深；祝福，一年一年，年年吉祥。狗年，祝福声声，新年快乐！", "送一份思念让你欢笑，送一份祝福让你骄傲，送一份开心让你不老，送一份梦想让你逍遥，送一份真情不要回报，再送一个平安才算可靠，春节好。", "晚上笑一笑睡个美满觉，早晨笑一笑全天有情调，工作之余笑一笑满堂欢喜又热闹，烦恼之时笑一笑一切烦恼全忘掉。祝笑口常开，新年快乐!", "春节将至拜早年：买辆奔驰送你太贵，请你出国旅游浪费，约你海吃一顿伤胃，送你一支玫瑰误会，给你一个热吻不对!只好在此祝福快乐实惠。", "新年之际，祝你：大财、小财、意外财，财源滚滚;亲情、爱情、朋友情，份份真情;爱人、亲人、知心人，人人平安;官运、福运、桃花运，天天走运!", "新春快到，欢声笑语处处有，喜气洋洋快乐多，福到运到祝福到，人旺运旺财运旺，愿君岁末交好运，吉祥如意万事顺，健康平安福满多，大吉大利气更顺!", "最近好吗?工作累了，歇歇脚，让压力藏的藏跑的跑;心情烦了，微微笑，让烦恼躲的躲逃的逃;切记身体健康，开心过每天最为重要。", "狗年到来菩萨忙，各路神仙送吉祥：财神送你金元宝，寿星保你身安康，文殊给你大智慧，观音佑你幸福长，弥勒让你乐不断，福星伴你走四方!春节快乐!", "狗年好吉兆，提前给你拜年了!一拜天地，天地玄黄地久天长;二拜财神，日进斗金飞黄腾达;三拜福星，天罡北斗福从天降;四拜全家，阖家团圆福寿安康!", "年是一颗颗甜蜜的糖果，年是一朵朵缤纷的烟火，年是我们与父母的团圆的时刻，年是我们对家庭的难舍难割，又逢新年，祝福你和家人幸福安康岁岁年年！", "浓浓的情意，深深的祝福，绵绵怀念，切切问候。愿你佳节快乐，健康如意。", "友情是香喷喷的大米饭，热腾腾的涮火锅，火辣辣的二锅头。又馋了吧，新年喝一盅吧！祝福朋友狗年快乐进步！", "淡淡一点的友情很真，淡淡一点的依恋很轻，淡淡一点的思念很深，淡淡一点的祝福最真！祝你春节快乐，狗年财运两旺！ ", "小小祝福暖心中，每天问候有真情；字字吉祥迎喜庆，句句健康送安平。顺心快乐陪伴你，幸福绽放笑得意；美好生活甜蜜蜜，祝你永远都美丽。", "带上我的一份心意，送上蓝天，透过空气，伴随着清风，送到你的身边，致意真诚的祝福：身体健康，心想事成，一帆风顺！", "春风洋溢你，家人关心你，爱情滋润你，财神系着你，朋友忠于你，我这祝福你，幸运之星永远照着你。祝狗年大吉大利！" ];
    Page({
        data: {
            navBar: {
                onLeftTap: "onNavBarLeftTap",
                hasBackBtn: !0
            },
            toast: {
                hidden: !0,
                text: ""
            },
            text: "",
            userName: "",
            toUserName: ""
        },
        tplMsgFormSubmit: f.tplMsgFormSubmit,
        onLoad: function(a) {
            wx.setNavigationBarTitle({
                title: "2018新年快乐"
            }), c.xu.mta.Page.init();
            var b = decodeURIComponent(a.text), d = decodeURIComponent(a.userName), e = decodeURIComponent(a.toUserName), f = decodeURIComponent(a.userAvatar), g = a.id, h = c.store.getState().active.blessCardList.find(function(a) {
                return a.id == g;
            });
            this.setData({
                initText: b,
                startText: b,
                initUserName: d,
                initToUserName: e,
                text: b,
                userName: d,
                toUserName: e,
                userAvatar: f,
                frameId: g,
                themeInfo: h
            });
        },
        handleFetchUserInfo: function() {
            return new h(function(a, b) {
                wx.getUserInfo({
                    success: function(b) {
                        c.xu.userInfo = b.userInfo, a(b.userInfo);
                    },
                    fail: b
                });
            });
        },
        handleBesureWxUserInfo: function() {
            var a = this;
            return new h(function(b) {
                c.xu.userInfo ? b(c.xu.userInfo) : a.handleFetchUserInfo().then(b);
            });
        },
        handleUseWxName: function() {
            var a = this;
            this.handleBesureWxUserInfo().then(function() {
                a.setData({
                    userName: c.xu.userInfo.nickName,
                    initUserName: c.xu.userInfo.nickName
                });
            });
        },
        handleFormInput: function(a) {
            console.log(a);
            var b = a.currentTarget.dataset.name, c = a.detail.value.trim(), d = {};
            d[b] = c, this.setData(d);
        },
        handleSetStorageDraft: function(a, b) {
            var c = e.getStorageSync("user_blessword_draft_obj") || {};
            c[a] = b, e.setStorageSync("user_blessword_draft_obj", c);
        },
        handleDelStorageDraft: function(a) {
            var b = e.getStorageSync("user_blessword_draft_obj") || {};
            b[a] = "", e.setStorageSync("user_blessword_draft_obj", b);
        },
        handleGetStorageDraft: function(a) {
            var b = e.getStorageSync("user_blessword_draft_obj"), c = b[a];
            return c;
        },
        formSubmitAdd: function(a) {
            f.tplMsgFormSubmit(a);
            var b = this.data.frameId, c = this.data.text, d = this.data.userName, e = this.data.toUserName, h = this.data.initText, i = this.data.initUserName, j = this.data.initToUserName, k = getCurrentPages(), l = k[k.length - 2];
            l.setData({
                cardInfo: g({}, l.data.cardInfo, {
                    text: c || h,
                    userName: d || i,
                    toUserName: e || j
                })
            }), this.handleSetStorageDraft(b, c), wx.navigateBack();
        },
        onNavBarLeftTap: function() {
            wx.navigateBack();
        },
        onShareAppMessage: function() {
            var a = this.data.text, b = this.data.userName, c = this.data.toUserName, d = this.data.initText, e = this.data.initUserName, f = this.data.initToUserName, g = this.data.userAvatar, h = this.data.frameId, i = this.data.themeInfo;
            return {
                title: (b || "我") + i.share_desc + a,
                path: "pages/tool/festivalCardPage/festivalCardPage?type=2&text=" + encodeURIComponent(a || d) + "&userName=" + encodeURIComponent(b || e) + "&toUserName=" + encodeURIComponent(c || f) + "&userAvatar=" + encodeURIComponent(g) + "&id=" + h,
                imageUrl: i.url
            };
        },
        handleExchangeText: function() {
            var a = this.data.initText, b = i.indexOf(a);
            -1 === b ? b = this.createRandomNum(i.length) : b + 1 === i.length ? b = 0 : b++, 
            this.setData({
                text: i[b],
                initText: i[b],
                startText: i[b]
            }), wx.removeStorageSync("user_blessword_draft_obj");
        },
        createRandomNum: function(a) {
            var b = Math.floor(Math.random() * a);
            return b;
        },
        handleSetFestivalText: function(a) {
            this.setData({
                text: a
            });
        },
        handleClearText: function() {
            this.setData({
                startText: "",
                text: ""
            });
        }
    });
})();