(function() {
    var a = Math.floor, b = require("../config/config.js"), c = getApp();
    module.exports = {
        queryToJson: function(a) {
            a = a || location.search || location.hash;
            for (var b, c, d, e, f = a.substr(a.lastIndexOf("?") + 1), g = f.split("&"), h = g.length, j = {}, k = 0; k < h; k++) g[k] && (e = g[k].split("="), 
            b = e[0], c = e[1], d = j[b], "undefined" == typeof d ? j[b] = c : d instanceof Array ? d.push(c) : j[b] = [ d, c ]);
            return j;
        },
        encodeSearchParams: function(a) {
            const b = [];
            return Object.keys(a).forEach(function(c) {
                var d = a[c];
                "undefined" == typeof d && (d = ""), b.push([ c, encodeURIComponent(d) ].join("="));
            }), b.join("&");
        },
        getImgQS: function(a, b) {
            return "imageMogr2/gravity/center/rotate/$/thumbnail/!" + a + "x" + b + "r/crop/" + a + "x" + b + "/interlace/1/format/jpg";
        },
        formatUnixTime: function(a) {
            var b, c, d, e, f, g;
            return b = new Date(a), c = b.getFullYear(), d = b.getMonth() + 1, e = b.getDate(), 
            f = b.getHours(), g = b.getMinutes(), c + "年" + d + "月" + e + "日 " + f + ":" + (10 > g ? "0" + g : g);
        },
        getMusicPlayerTime: function(b) {
            var c, d;
            return c = a(b / 60), d = a(b % 60), (10 > c ? "0" + c : c) + " : " + (10 > d ? "0" + d : d);
        },
        formatUnixTime2YMD: function(a, b) {
            var c, d, e, f;
            return c = new Date(a), d = c.getFullYear(), e = c.getMonth() + 1, f = c.getDate(), 
            b ? d + b + e + b + f : d + "年" + e + "月" + f + "日";
        },
        formatUnixTime2YMDs: function(a) {
            var b, c, d, e;
            return b = new Date(a), c = b.getFullYear(), d = b.getMonth() + 1, e = b.getDate(), 
            c + "/" + d + "/" + e;
        },
        getBeforeTime: function(b) {
            if (b) {
                var c = +new Date() - b, d = a(c / 31536e6);
                return 0 < d ? d + "年前" : (d = a(c / 864e5), 0 < d) ? d + "天前" : (d = a(c / 36e5), 
                0 < d) ? d + "小时前" : (d = a(c / 6e4), 0 < d ? d + "分钟前" : "刚刚");
            }
            return "未知";
        },
        formatTimeOfAlbum: function(a) {
            var b, c, d, e, f, g;
            return b = new Date(a), c = b.getFullYear(), d = b.getMonth() + 1, e = b.getDate(), 
            f = b.getHours(), g = b.getMinutes(), c + "-" + (10 > d ? "0" + d : d) + "-" + (10 > e ? "0" + e : e) + " " + f + ":" + (10 > g ? "0" + g : g);
        },
        formatSecondToZeroCard: function(b) {
            var c, d;
            return c = a(b / 60), d = b % 60, (10 > c ? "0" + c : c) + ":" + (10 > d ? "0" + d : d);
        },
        formatUnixTime4YMDHM: function(a, b, c) {
            var d, e, f, g, h, i;
            d = new Date(a), e = d.getFullYear(), f = d.getMonth() + 1, g = d.getDate(), h = d.getHours(), 
            i = d.getMinutes();
            var j = new Date();
            return b || j.getFullYear() > e ? c ? e + c + f + c + g + " " + h + ":" + (10 > i ? "0" + i : i) : e + "年" + f + "月" + g + "日" : f + "月" + g + "日 " + h + ":" + (10 > i ? "0" + i : i);
        },
        checkAlbumTitleAvailable: function(a) {
            var b = a.trim();
            if (!b) return "影集标题必须要填哦！";
            var c = countCharNum(b);
            return !(128 < c) || "长度不能超过64个字！";
        },
        checkMusicNameAvailable: function(a) {
            var b = a.trim();
            if (!b) return "音乐名称必须要填哦！";
            var c = countCharNum(b);
            return !(52 < c) || "长度不能超过26个字！";
        },
        checkEmail: function(a) {
            var b = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            return !!b.test(a.trim()) || (a.trim().length ? "请输入正确格式的邮箱" : "请输入邮箱");
        },
        countCharNum: function(a) {
            for (var b = 0, c = a.length, d = -1, e = 0; e < c; e++) d = a.charCodeAt(e), b += 0 <= d && 128 >= d ? 1 : 2;
            return b;
        },
        getByteLength: function(a) {
            return (a + "").replace(/[^\x00-\xff]/g, "ci").length;
        },
        subByte: function(a, b, c) {
            return (a += "", c = c || "", 0 > b || getByteLength(a) <= b) ? a + c : (a = a.substr(0, b).replace(/([^\x00-\xff])/g, "$1 ").substr(0, b).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1"), 
            a + c);
        },
        getScreenSize: function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        filterEmoji: function(a) {
            return a && "string" == typeof a ? a.replace(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g, "") : "";
        },
        textLength: function(a) {
            for (var b = 0, c = a.length, d = -1, e = 0; e < c; e++) d = a.charCodeAt(e), b += 0 <= d && 128 >= d ? 1 : 2;
            return b;
        },
        subText: function(a, b) {
            for (var c = 0, d = -1, e = 0; e < a.length; e++) {
                if (d = a.charCodeAt(e), c += 0 <= d && 128 >= d ? 1 : 2, c == b) return a.substring(0, e + 1);
                if (c > b) return a.substring(0, e);
            }
            return a;
        },
        getSliderPosition: function(a, b, c, d) {
            var e = 100 * b / d, f = 100 * c / d;
            return c ? a > f ? f : a < e ? e : a : 100 <= a ? 98 : a < e ? e : a;
        },
        isValidIpv4Addr: function(a) {
            return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(a);
        },
        findArrayItem: function(a, b, c) {
            if ("function" == typeof Array.prototype.find) return a.find(b, c);
            c = c || this;
            var d, e = a.length;
            if ("function" != typeof b) throw new TypeError(b + " is not a function");
            for (d = 0; d < e; d++) if (b.call(c, a[d], d, a)) return a[d];
        },
        formartHLKeyWordsByEM: function(a) {
            var b = /(<em>.*?<\/em>)/g, c = a.split(b);
            return c.map(function(a) {
                return b.test(a) ? {
                    text: a.replace(/(<em>|<\/em>)/g, ""),
                    type: "highLi"
                } : {
                    text: a,
                    type: "normal"
                };
            });
        },
        uniqueObjArr: function(a, b) {
            var c, d = [], e = [];
            if (Array.isArray(a)) for (c = 0; c < a.length; c += 1) -1 === d.indexOf(a[c][b]) && (d.push(a[c][b]), 
            e.push(a[c]));
            return e;
        },
        tplMsgFormSubmit: function(a) {
            var c = a.detail.formId;
            console.log("form发生了submit事件，推送码为：", c);
            var d = getApp(), e = d.xu.globalFormIds;
            e || (e = []), e.push(c), d.xu.globalFormIds = e, console.log("参数", {
                token: d.xu.token,
                formids: d.xu.globalFormIds
            }), wx.request({
                url: b.apiDomain + "/group/send_formids",
                data: {
                    token: d.xu.token,
                    formids: d.xu.globalFormIds
                },
                method: "POST",
                success: function(a) {
                    console.log("成功", a), d.xu.globalFormIds = "";
                },
                fail: function(a) {
                    console.log("错误", a);
                }
            });
        },
        checkDoesArrHaveContent: function() {
            return Array.isArray(arr) && 0 < arr.length;
        },
        createRandomNum: function() {
            var b, c, d = arguments.length;
            if (1 === d) c = arguments[0], b = a(Math.random() * c); else if (2 === d) {
                var e = arguments[0], f = arguments[1];
                c = f - e, b = a(Math.random() * c) + e;
            }
            return b;
        },
        checkIfArrIsFull: function(a, b) {
            var c = 0;
            if (b && a.length !== b) return !1;
            for (c = 0; c < a.length; c += 1) if (!a[c]) return !1;
            return !0;
        },
        deepCopyObj: function(a) {
            return JSON.parse(JSON.stringify(a));
        },
        deepCopyObjPerfectVersion: function(a) {
            var b = Array.isArray(a) ? [] : {};
            if ("object" != typeof a) throw new Error("参数应该是对象");
            if ("undefined" != typeof JSON) b = JSON.parse(JSON.stringify(a)); else for (var c in a) if (a.hasOwnProperty(c)) {
                var d = a[c];
                b[c] = "object" == typeof d && 0 < Object.keys(d).length ? this.deepCopyObjPerfectVersion(d) : d;
            }
            return b;
        }
    };
})();