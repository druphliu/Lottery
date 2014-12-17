function showMsg(e, t, n) {
    var r = null;
    switch (e) {
        case"space":
            r = W("#giftSpace"), r.removeClass(r.attr("data-cls")).addClass(t).attr("data-cls", t).query(".weibo-one-more").attr("href", shareSina("weibo-one-more", n));
            break;
        case"goods":
            r = W("#giftGoods"), r.removeClass(r.attr("data-cls")).addClass(t).attr("data-cls", t).query(".weibo-one-more").attr("href", shareSina("weibo-one-more", n)), W(".pop-sucess .buddy").attr("href", shareSina("weibo-one-more", n));
            break;
        case"info":
            r = W(".pop-userinfo");
            break;
        case"info-confirm":
            r = W(".pop-confirm");
            break;
        case"info-suc":
            r = W(".pop-sucess");
            break;
        case"info-fail":
            r = W(".pop-fail");
            break;
        case"login":
            r = W("#loginPanel"), initLogin();
            break;
        case"nochance":
            r = W(".pop-nochance"), r.query(".tips").html(t);
            break;
        case"invite":
            r = W(".pop-invite")
    }
    if (!r)return;
    var i = Dom.getDocRect();
    W(".window-mask").css({width: i.scrollWidth + "px", height: i.scrollHeight + "px"}).show(), r.show();
    var s = r.getRect(), o = (i.height - s.height) / 2, u = o + i.scrollY, a = u + "px";
    r.css({top: a, left: (i.width - s.width) / 2 + i.scrollX + "px"})
}
function hideMsg(e) {
    W(".window-mask").hide(), e ? W("#loginPanel").hide() : W(".pop, .pop-userinfo, .pop-confirm").hide()
}
function getLastLotterys() {
    Ajax.post("data/getLastLotterys", {act_id: SYS_CONF.actId}, function (e) {
        var t = JSON.parse(e);
        if (!t.errno) {
            var n = t.data.lottery_list;
            n.length > 6 && (n.length = 5);
            var r = "";
            for (var i = 0, s = n.length; i < s; i++)r += '<li><span class="name" title="' + n[i].user_name.encode4Html() + '">' + n[i].user_name.encode4Html() + '</span><span class="info">' + n[i].reward_name + "</span></li>";
            W(".info-list ul").html(r)
        }
    })
}
function shareSina(e, t) {
    var n = "http://service.t.sina.com.cn/share/share.php?", r = "#360\u4e91\u76d8\u5e78\u8fd0\u5927\u8f6c\u76d8#\u5c0f\u4f19\u4f34\u4eec\uff0c\u5feb\u6765\u53c2\u52a0@360\u4e91\u76d8 \u5e78\u8fd0\u5927\u8f6c\u76d8\u6d3b\u52a8\u5427\u3002100%\u4e2d\u5956\uff0c\u5c06\u6709\u673a\u4f1a\u8d62\u5f97iphone5s\u3001360\u7279\u4f9b\u673a\u3001360\u968f\u8eabwifi\u53ca\u8d85\u5927\u4e91\u76d8\u7a7a\u95f4\u7b49\u597d\u793c\uff0c\u8fd8\u80fd\u9886\u53d636T\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\u54e6\uff0c\u4f60\u60ca\u5446\u4e86\u5417\uff1f\u8d76\u5feb\u6765\u8bd5\u8bd5\u4f60\u7684\u624b\u6c14\u5427\uff01>> http://huodong.yunpan.360.cn/nationalday", i = "#360\u4e91\u76d8\u5e78\u8fd0\u5927\u8f6c\u76d8#\u521a\u53c2\u52a0\u4e86@360\u4e91\u76d8 \u5e78\u8fd0\u5927\u8f6c\u76d8\u6d3b\u52a8\uff0c\u7adf\u7136\u62bd\u4e2d\u4e86{$gift}\uff0c\u5c0f\u4f19\u4f34\u4eec\u60ca\u5446\u4e86\u5417\uff1f\u73b0\u5728\u53c2\u4e0e\uff0c\u5c06\u6709\u673a\u4f1a\u8d62\u5f97iphone5s\u3001360\u7279\u4f9b\u673a\u3001360\u968f\u8eabwifi\u53ca\u8d85\u5927\u4e91\u76d8\u7a7a\u95f4\u7b49\u597d\u793c\uff0c100%\u4e2d\u5956\uff0c\u8fd8\u80fd\u9886\u53d636T\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\u54e6\u3002\u8d76\u5feb\u6765\u8bd5\u8bd5\u4f60\u7684\u624b\u6c14\u5427\uff01>>http://huodong.yunpan.360.cn/nationalday";
    return e == "space" ? n += "title=" + encodeURIComponent(r) : n += "title=" + encodeURIComponent(i.tmpl({gift: t})), n += "&appkey=4060160539&cotent=utf8", n += "&pic=" + encodeURIComponent("http://p9.qhimg.com/d/inn/d490e397/lottery-weibo.jpg"), n
}
function init() {
    W(".lucky-mod .btn").on("click", function () {
        Lottery.start()
    }), W(".rule-mod .btn, .pop-invite .btn").on("click", function () {
        if (!SYS_CONF.isLoginYunpan) {
            showMsg("login"), actionAfterLogin = "reload";
            return
        }
        Ajax.get("data/invitecode", function (e) {
            e = e.evalExp(), e && (e.errno ? e.errno == 2006 ? initLogin() : yunpan.Msg.alert(e.errmsg, {type: "warning"}) : e.data && yunpan.cmdCenter.showInviteDia(e))
        })
    }), W(".user-info .weibo").attr("href", shareSina("space")), W(".weibo-one-more, .user-info .weibo").on("click", function () {
        Ajax.post("/lottery/useweibo", {act_id: SYS_CONF.actId}, function () {
        })
    }), W(".action .get-my-gift").on("click", function () {
        hideMsg(), showMsg("info")
    }), W(".pop-userinfo .action .btn").on("click", function () {
        Lottery.submitCheck()
    }), W(".pop-confirm .btn-correct").on("click", function () {
        Lottery.doSubmit("yes")
    }), W(".pop-confirm .btn-wrong").on("click", function () {
        Lottery.doSubmit("no")
    }), W("#giftGoods .close, #giftSpace .close, .pop-sucess .close, .pop-userinfo .close, .pop-confirm .close, .pop-nochance .close, .pop-invite .close, .pop-nochance .btn, .pop-invite .btn, .pop-sucess .btn-close").on("click", function () {
        hideMsg()
    }), W(".pop-fail .btn, .pop-fail .close").click(function () {
        W(".pop-fail").hide(), W(".pop-confirm").hide()
    }), W("#loginPanel .win-close").click(function () {
        hideMsg(!0)
    }), getLastLotterys()
}
function doSomeSecret() {
    var e = "0123456789abcdef", t = SYS_CONF.userSign.split("-"), n = hex_md5(t[0] + t[1]), r = "";
    n = n.split("").slice(8, 24);
    for (var i = 0, s = n.length; i < s; i++)r += e.charAt(Math.round(Math.random() * 15)) + n[i];
    return r + t[1]
}
function initPlaceHolder(e) {
    if (e.length <= 0)return;
    for (var t = 0, n = e.length; t < n; t++) {
        var r = e[t], i = getId(), s = W(r.ipt), o = W('<span id="' + i + '" class="emptyhint" data-ipt="' + r.ipt + '">' + r.txt + "</span>").insertTo("beforebegin", s);
        s.attr("data-tip", i), W(s).focus(function () {
            var e = W(this).attr("data-tip");
            W("#" + e).hide()
        }).blur(function () {
            var e = W(this).attr("data-tip");
            W(this).val() == "" && W("#" + e).show()
        }), o.click(function () {
            W(this).hide(), W(W(this).attr("data-ipt")).focus()
        })
    }
}
function doAction() {
    switch (actionAfterLogin) {
        case"reload":
            location.reload();
            break;
        case"invite":
            showInvite()
    }
    actionAfterLogin = ""
}
function yploginCheck(e) {
    var t;
    e.errno === 0 ? (t = e.data, t.is_yunpan_user ? doAction() : goActive()) : location.reload()
}
function loginStatusCheck(e) {
    var t;
    e.errno === 0 ? (t = e.data, jsonp_url = t.url, loadJs(t.url + "user/yplogin?cross_domain_callback=yploginCheck&t=" + Math.random())) : showMsg("fail")
}
function loginCallback() {
    loadJs("http://yunpan.360.cn/user/getrequesturl?t=" + +(new Date) + "&cross_domain_callback=loginStatusCheck")
}
function checkLoginEmpty() {
    if (!isCheckLoginEmpty)return;
    !loginAccount.html() && loginAccount.css("display") != "none" && loginAccount.css("display", "none"), !lpassword.html() && lpassword.css("display") != "none" && lpassword.css("display", "none"), setTimeout(checkLoginEmpty, 99)
}
function initLogin() {
    W("#loginPanel .content-body").replaceClass("reg-tab", "login-tab"), W("#regist").hide(), W("#login").show(), isCheckLoginEmpty = !0, setTimeout(checkLoginEmpty, 200);
    if (isLoginInited)return;
    QHPass.resConfig.src = "pcw_cloud", QHPass.resConfig.loginAfterSetName = !1, QHPass.showLogin(loginCallback, {
        type: "normal",
        captFlag: !1,
        wrap: "login",
        afterRender: function () {
            isLoginInited = !0, loginAccount = W("#tips-loginAccount"), lpassword = W("#tips-lpassword"), W("#login .submit input").val("")
        },
        cookie_domains: ["", "nc"]
    })
}
function goActive() {
    loadJs("http://yunpan.360.cn/user/ajaxActive?t=" + Math.random() + "&cross_domain_callback=activeSuccess&reg_sign=" + doSomeSecret())
}
function activeSuccess(e) {
    e.errno ? yunpan.Msg.alert(e.errmsg, {
        fn: function () {
            location.reload()
        }
    }) : doAction()
}
(function () {
    function e(e) {
        return r(this, e, 1), this.lazyRender || this.render(), this
    }

    function t(e) {
        return r(this, e, 1), this.lazyRender || this.render(), this
    }

    function n(e) {
        return r(this, e, 1), this.lazyRender || this.render(), this
    }

    var r = QW.ObjectH.mix, i = QW.ArrayH.remove, s = QW.StringH.format, o = QW.Browser.ie6, u = QW.DomU, a = u.createElement, f = u.getDocRect, l = QW.NodeH, c = QW.EventTargetH.addEventListener, h = QW.EventTargetH.removeEventListener, p = l.fire, d = l.hide, v = l.setStyle, m = l.getXY, g = function (e, t, n, r, i) {
        var s = u.getDocRect();
        r == null && (r = (s.width - t) / 2 + s.scrollX), r = Math.max(Math.min(r, s.scrollX + s.width - t), s.scrollX), i == null && (i = (s.height - n) / 2 + s.scrollY), i = Math.max(Math.min(i, s.scrollY + s.height - n), s.scrollY), l.setXY(e, r, i)
    }, y = l.contains, b = l.removeNode, w = QW.EventH, E = w.getTarget, S = w.getKeyCode, x = w.preventDefault, T = QW.CustEvent, N = {VERSION: "0.0.1"};
    (function () {
        function e() {
            var e = a("div", {className: "mask", tabIndex: -1, unselectable: "on"});
            return document.body.insertBefore(e, document.body.firstChild), e
        }

        function t() {
            var e = l.offsetParent, t = document.documentElement, n = l.style;
            if (parseInt(n.top) != e.scrollTop || parseInt(n.left) != e.scrollLeft)n.top = e.scrollTop, n.left = e.scrollLeft;
            t.clientHeight != l.offsetHeight && (n.height = t.clientHeight), t.clientWidth != l.offsetWidth && (n.width = t.clientWidth)
        }

        function n(e) {
            e.keyEsc && (h(document, "keydown", N.keydownHdl), c(document, "keydown", N.keydownHdl))
        }

        var s = 100, u = [], l, p = 0;
        r(N, {
            showPanel: function (r, a, c, h, d, y) {
                r._rendered && r.render(), i(u, r), u.push(r);
                var b = r.oWrap.style;
                r.isVisible ? b.zIndex != s && (b.zIndex = s += 2) : b.zIndex = s += 2, r.withMask && (l = l || e(), v(l, {
                    zIndex: s - 1,
                    display: "block"
                }), o && (t(l), clearInterval(p), p = setInterval(t, 1e3))), h != null && (b.width = h + "px"), d != null && (b.height = d + "px");
                if (r.posCenter) {
                    var w = N.getWrapSize(r);
                    g(r.oWrap, w[0], w[1], a, c)
                } else {
                    a = a || 0, c = c || 0;
                    if (y) {
                        var E = m(y);
                        a += E[0], c += E[1]
                    }
                    if (r.posAdjust) {
                        var w = N.getWrapSize(r), S = f();
                        a = Math.min(a, S.scrollX + S.width - w[0]), a = Math.max(a, S.scrollX), c = Math.min(c, S.scrollY + S.height - w[1]), c = Math.max(c, S.scrollY)
                    }
                    b.left = a + "px", b.top = c + "px"
                }
                b.display = "block", r.isVisible = !0, n(r)
            }, hidePanel: function (e) {
                d(e.oWrap), e.isVisible = !1, i(u, e);
                var t = !1;
                for (var n = u.length - 1; n > -1; n--) {
                    var r = u[n];
                    if (r.withMask) {
                        l.style.zIndex = r.oWrap.style.zIndex - 1, t = !0;
                        break
                    }
                }
                !t && l && (d(l), clearInterval(p))
            }, disposePanel: function (e) {
                b(e.oWrap);
                for (var t in e)e[t] = null
            }, risePanel: function (e) {
                if (!e.isVisible)throw alert("\u7a0b\u5e8f\u9519\u8bef."), "\u9519\u8bef\uff1a\u8fd8\u6ca1\u6709\u6253\u5f00panel\u5462.";
                var t = e.oWrap.style;
                if (t.zIndex != s) {
                    t.zIndex = s += 2, i(u, e), u.push(e);
                    if (e.withMask) {
                        var n = l.style;
                        n.zIndex = s - 1
                    }
                }
            }, keydownHdl: function (e) {
                if (u.length && S(e) == 27) {
                    var t = u[u.length - 1];
                    t.keyEsc && (t.hide(), x(e))
                }
                u.length || h(document, "keydown", N.keydownHdl)
            }, getWrapSize: function (e, t, n) {
                var r = e.oWrap, i = r.style, s = [i.display, i.width, i.height];
                i.display = "block", t && (i.width = t), n && (i.height = n);
                var o = [r.offsetWidth, r.offsetHeight];
                return i.display = s[0], s[1] && (i.width = s[1]), s[2] && (i.height = s[2]), o
            }
        })
    })(), function () {
        function t(e, t) {
            t = t || "", t.tagName ? (e.innerHTML = "", e.appendChild(t)) : e.innerHTML = t
        }

        e.EVENTS = ["beforeshow", "aftershow", "beforehide", "afterhide"], e._elHtml = {
            content: '<div class="panel-content" remark="oContent"><div class="hd"></div><div class="bd"></div><div class="ft"></div></div>',
            closeHdl: '<span class="close"></span>',
            resizeHdl: '<span class="resize"><span></span></span>',
            corner1: '<span class="co1"><span></span></span>',
            corner2: '<span class="co2"><span></span></span>',
            cue: '<span class="cue"></span>',
            shadow: '<span class="sd"></span>'
        }, e.prototype = {
            defaultClassName: "panel",
            wrapId: "",
            className: "",
            title: "",
            header: "",
            body: "Panel Body",
            footer: "",
            withCorner: 0,
            withCue: 0,
            withShadow: 0,
            withClose: 0,
            withMask: 0,
            dragable: 0,
            resizable: 0,
            keyEsc: 0,
            posCenter: 0,
            posAdjust: 0,
            isVisible: !1,
            oWrap: null,
            oContent: null,
            oHeader: null,
            oBody: null,
            oFooter: null,
            oCloseHdl: null,
            oResizeHdl: null,
            oShadow: null,
            oCue: null,
            oCorner1: null,
            oCorner2: null,
            render: function () {
                var n = this;
                if (n._rendered)return;
                var r = a("div", {className: n.defaultClassName + " " + (n.className || "")});
                r.style.display = "none", n.oWrap = r, n.wrapId && (r.id = n.wrapId), d(r);
                var i = e._elHtml, s = [i.content, n.withClose ? i.closeHdl : "", n.resizable ? i.resizeHdl : "", n.withCorner ? i.corner1 + i.corner2 : "", n.withCue ? i.cue : "", n.withShadow ? i.shadow : ""];
                r.innerHTML = s.join("");
                var o = r.childNodes;
                n.oContent = o[0];
                var u = 1;
                n.withClose && (n.oCloseHdl = o[u++]), n.resizable && (n.oResizeHdl = o[u++]), n.withCorner && (n.oCorner1 = o[u++], n.oCorner2 = o[u++]), n.withCue && (n.oCue = o[u++]), n.withShadow && (n.oShadow = o[u++]);
                var o = n.oContent.childNodes;
                n.oHeader = o[0], n.oBody = o[1], n.oFooter = o[2], n.isVisible = !1;
                var f = n.title && "<h3>" + n.title + "</h3>" || n.header;
                f && t(n.oHeader, f), n.body && t(n.oBody, n.body), n.footer && t(n.oFooter, n.footer), n.withClose && c(n.oCloseHdl, "click", function () {
                    n.hide()
                }), n.dragable && n.initDrag(), n.resizable && n.initResize(), document.body.insertBefore(r, document.body.firstChild), T.createEvents(n, e.EVENTS), n._rendered = !0
            },
            show: function (e, t, n, r, i) {
                return this._rendered && this.render(), this.fire("beforeshow") == 0 ? !1 : (N.showPanel(this, e, t, n, r, i), this.fire("aftershow"), !0)
            },
            hide: function () {
                return this.fire("beforehide") == 0 ? !1 : (N.hidePanel(this), this.fire("afterhide"), !0)
            },
            dispose: function () {
                if (this.isVisible)return !1;
                N.disposePanel(this)
            },
            rise: function () {
                N.risePanel(this)
            },
            initDrag: function () {
                var e = this, t = new QW.SimpleDrag({
                    oSrc: this.oWrap,
                    oHdl: this.oHeader,
                    minXAttr: 1,
                    minYAttr: 1,
                    maxXAttr: this.maxXAttr,
                    maxYAttr: this.maxYAttr,
                    withProxy: !0
                });
                t.on("dragstart", function () {
                    e.rise()
                })
            },
            initResize: function () {
                var e = this, t = new QW.SimpleResize({
                    oSrc: this.oWrap,
                    oHdl: this.oResizeHdl,
                    minXAttr: 150,
                    yFixed: !0,
                    withProxy: !0
                });
                t.on("dragstart", function () {
                    e.rise()
                })
            }
        }
    }(), function () {
        t.MENTOR_CLASS = e, t.prototype = {
            posAdjust: 1,
            defaultClassName: "panel panel-popup",
            relatedEls: null,
            _refreshBlurHdl: function (e) {
                this._fnBlur && (h(document, "keydown", this._fnBlur), h(document, "keyup", this._fnBlur), h(document, "mousedown", this._fnBlur), e && (c(document, "keydown", this._fnBlur), c(document, "keyup", this._fnBlur), c(document, "mousedown", this._fnBlur)))
            },
            show: function (e, t, n, r, i) {
                var s = this;
                return s._rendered && s.render(), s._fnBlur = s._fnBlur || function (e) {
                    var t = E(e) || document.body;
                    if (!s.oWrap)return;
                    var n = s.relatedEls || [];
                    n.push(s.oWrap);
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (i == t || y(i, t))return
                    }
                    s.hide()
                }, s.fire("beforeshow") == 0 ? !1 : (N.showPanel(s, e, t, n, r, i), s._refreshBlurHdl(!0), s.fire("aftershow"), !0)
            },
            hide: function () {
                return this.fire("beforehide") == 0 ? !1 : (N.hidePanel(this), this._refreshBlurHdl(!1), this.fire("afterhide"), !0)
            }
        }, r(t.prototype, e.prototype)
    }(), function () {
        n.MENTOR_CLASS = e, n.prototype = {
            defaultClassName: "panel panel-dialog",
            withMask: 1,
            withClose: 1,
            dragable: !!QW.SimpleDrag
        }, r(n.prototype, e.prototype)
    }();
    var C = function () {
        var e = {
            alert: '<div class="panel-dialog-sys panel-alert cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u786e\u5b9a</button></div></div>',
            confirm: '<div class="panel-dialog-sys panel-confirm cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u786e\u5b9a</button><button>\u53d6\u6d88</button></div></div>',
            prompt: '<div class="panel-dialog-sys panel-prompt cls"><div class="msg">{0}</div><div class="ipt-ctn"><input type="text-input"></div><div class="btn-ctn"><button>\u786e\u5b9a</button><button>\u53d6\u6d88</button></div></div>',
            msgbox: '<div class="panel-dialog-sys panel-msgbox cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u662f(Yes)</button><button>\u5426(No)</button><button>\u53d6\u6d88</button></div></div>'
        }, t = {
            getSysDialog: function (t, i, o, u) {
                u = u || {}, r(u, {
                    posCenter: 1,
                    keyEsc: 1,
                    title: "\u7cfb\u7edf\u63d0\u793a",
                    dragable: !!QW.SimpleDrag,
                    body: s(e[t] || "error", i)
                });
                var a = new n(u), f = a.oWrap.getElementsByTagName("button");
                a.dialogButtons = f;
                switch (t) {
                    case"alert":
                        c(f[0], "click", function (e) {
                            a.hide()
                        });
                        break;
                    case"confirm":
                        c(f[0], "click", function (e) {
                            a.returnValue = !0, a.hide()
                        }), c(f[1], "click", function (e) {
                            a.hide()
                        }), a.returnValue = !1;
                        break;
                    case"prompt":
                        var l = a.oWrap.getElementsByTagName("input")[0];
                        a.dialogInput = l, c(l, "keydown", function (e) {
                            S(e) == w.KEY_ENTER && setTimeout(function () {
                                p(f[0], "click")
                            }, 10)
                        }), c(f[0], "click", function (e) {
                            a.returnValue = l.value, a.hide()
                        }), c(f[1], "click", function (e) {
                            a.hide()
                        });
                        break;
                    case"msgbox":
                        c(f[0], "click", function (e) {
                            a.returnValue = !0, a.hide()
                        }), c(f[1], "click", function (e) {
                            a.returnValue = !1, a.hide()
                        }), c(f[2], "click", function (e) {
                            a.hide()
                        })
                }
                return a.on("aftershow", function () {
                    var e = l || f[0];
                    try {
                        e.focus(), e.select()
                    } catch (t) {
                    }
                }), a.on("afterhide", function () {
                    try {
                        o && o(this.returnValue)
                    } finally {
                    }
                }), a
            }, _sysDialog: function (e, t, n, r, i) {
                i = i || {};
                var s = QW.Panel.getSysDialog(e, t, r, i);
                e == "prompt" && (s.dialogInput.value = n || ""), s.show(null, null, i.width || 300, i.height)
            }, alert: function (e, t, n) {
                QW.Panel._sysDialog("alert", e, null, t, n)
            }, confirm: function (e, t, n) {
                QW.Panel._sysDialog("confirm", e, null, t, n)
            }, prompt: function (e, t, n, r) {
                QW.Panel._sysDialog("prompt", e, t, n, r)
            }, msgbox: function (e, t, n) {
                QW.Panel._sysDialog("msgbox", e, null, t, n)
            }
        };
        return t
    }();
    QW.provide({PanelManager: N, BasePanel: e, LayerPopup: t, LayerDialog: n, Panel: C})
})(), function () {
    function e(e) {
        e = e || {}, this.path = e.path || "/", this.domain = e.domain || "", this.expires = e.expires || 31536e6, this.secure = e.secure || ""
    }

    e.prototype = {
        set: function (e, t) {
            var n = new Date;
            typeof this.expires == "number" && n.setTime(n.getTime() + this.expires), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString() + ";path=" + this.path + (this.domain == "" ? "" : "; domain=" + this.domain) + (this.secure ? "; secure" : "")
        }, get: function (e) {
            var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (t = document.cookie.match(n)) ? unescape(t[2]) : ""
        }, remove: function (e) {
            var t = this.expires;
            this.expires = -31536e6, this.set(e, ""), this.expires = t
        }
    }, e.set = function (t, n, r) {
        (new e(r)).set(t, n)
    }, e.get = function (t, n) {
        return (new e(n)).get(t)
    }, e.remove = function (t, n) {
        (new e(n)).remove(t)
    }, QW.provide("Cookie", e)
}(), function () {
    function e(e) {
        r(this, e), this.render()
    }

    function t(e) {
        return document.getElementById(e)
    }

    var n = function (e) {
        var t = document.getElementsByTagName("head")[0] || document.documentElement, n = document.createElement("script"), r = !1;
        n.src = e, n.charset = "utf-8", n.onerror = n.onload = n.onreadystatechange = function () {
            !r && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (r = !0, t.removeChild(n))
        }, t.insertBefore(n, t.firstChild)
    }, r = function (e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }, i = function (e, t) {
        return r(document.createElement(e), t)
    }, s = function (e) {
        return e = e || window.event, e.target || e.srcElement
    }, o = function (e) {
        return e = e || window.event, e.which || e.keyCode || e.charCode
    }, u = function (e) {
        e = e || window.event, e.preventDefault && e.preventDefault() || (e.returnValue = !1)
    }, a = function (e, t) {
        return (new RegExp("(?:^|\\s)" + t + "(?:\\s|$)", "i")).test(e.className)
    }, f = function (e, t) {
        a(e, t) || (e.className = (e.className + " " + t).replace(/^\s+|\s+$/g, ""))
    }, l = function (e, t) {
        a(e, t) && (e.className = e.className.replace(new RegExp("(?:\\s|^)" + t + "(?:\\s|$)", "i"), " ").replace(/^\s+|\s+$/g, ""))
    }, c = function (e, t, n) {
        do if (e.tagName == t)return e; while (e != n && (e = e.parentNode));
        return null
    }, h = function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
    }, p = /msie/i.test(navigator.userAgent);
    e.prototype = {
        width: 0,
        oText: null,
        itemsData: null,
        oMenu: null,
        oWrap: null,
        selectedIndex: -1,
        filteredValue: "",
        filteringValue: "",
        acValue: "",
        closed: !1,
        show: function () {
            this.oText.value && this.oMenu.childNodes.length && (this.oWrap.style.display = "")
        },
        hide: function () {
            this.oWrap.style.display = "none"
        },
        refreshItems: function () {
            var e = this, t = e.itemsData;
            if (t && !t.__isItemsDataRendered) {
                var n = [];
                for (var r = 0; r < t.length; r++)n.push('<li acValue="' + t[r].encode4Html().replace(/"/g, "&quot;") + '">' + t[r].encode4Html() + "</li>");
                e.oMenu.innerHTML = n.join("").replace(/(<\w+)/g, '$1 unselectable="on"'), t.length ? e.show() : e.hide(), e.filteredValue = e.filteringValue, e.acValue = "", e.selectedIndex = -1, t.__isItemsDataRendered = !0
            }
        },
        setSelectedIndex: function (e, t) {
            var n = this, r = n.oMenu.childNodes;
            r.length ? (n.selectedIndex > -1 && l(r[n.selectedIndex], "selected"), e = (e + r.length + 1) % (r.length + 1), e == r.length ? (n.acValue = n.oText.value = n.filteringValue, e = -1) : (n.acValue = n.oText.value = r[e].getAttribute("acValue"), f(r[e], "selected"))) : e = -1, n.selectedIndex = e
        },
        render: function () {
            var e = this;
            if (e._rendered)return;
            e._rendered = !0;
            var t = i("div", {
                className: "ac_wrap",
                innerHTML: "<div class=ac_wrap_inner><div class=ac_menu_ctn><ul class=ac_menu></ul></div></div>".replace(/(<\w+)/g, '$1 unselectable="on"')
            }), n = e.oText;
            W(t).insertTo("afterend", W(n).parentNode());
            var r = e.oMenu = t.getElementsByTagName("ul")[0];
            n.setAttribute("autoComplete", "off"), e.oWrap = t, e.hide(), h(e.oText, "dblclick", function (t) {
                e.show()
            }), h(e.oText, "keydown", function (r) {
                var i = o(r), s = 0;
                switch (i) {
                    case 40:
                        s = 1;
                        break;
                    case 38:
                        s = -1;
                        break;
                    case 27:
                        e.closed || (e.hide(), e.closed = !0, u(r));
                        break;
                    case 13:
                        e.hide(), e.onenter && e.onenter(), u(r)
                }
                s && n.value && (u(r), t.style.display == "none" ? (e.show(), e.closed = !1) : e.setSelectedIndex(e.selectedIndex + s))
            }), h(e.oText, "focus", function (t) {
                e.closed || e.show(), clearInterval(e._refreshTimer), e._refreshTimer = setInterval(function () {
                    var t = n.value;
                    t ? e.closed || (t != e.filteredValue && t != e.filteringValue && t != e.acValue && (e.filteringValue = t, e.refreshData()), e.itemsData && e.refreshItems()) : (e.acValue = e.filteringValue = e.filteredValue = "", e.hide(), e.closed = !1)
                }, 100)
            }), h(e.oText, "blur", function (t) {
                e.hide(), clearInterval(e._refreshTimer)
            }), t.onmousedown = function (e) {
                p && (n.setCapture(), setTimeout(function () {
                    n.releaseCapture()
                }, 10)), u(e)
            }, r.onclick = function (t) {
                var i = s(t), o = c(i, "LI", r);
                if (o) {
                    n.blur(), setTimeout(function () {
                        n.focus()
                    }, 10);
                    var u = 0, a = o;
                    while (a = a.previousSibling)u++;
                    e.setSelectedIndex(u, !0), e.hide(), e.onselectitem && e.onselectitem()
                }
            }, r.onmouseover = function (e) {
                var t = s(e), n = c(t, "LI", r);
                n && f(n, "hover")
            }, r.onmouseout = function (e) {
                var t = s(e), n = c(t, "LI", r);
                n && l(n, "hover")
            }
        }
    }, window.ComboBox = e
}(), function () {
    function e(e) {
        i(this, e, 1), this.lazyRender || this.render()
    }

    function t(t) {
        e.call(this, t)
    }

    function n(e) {
        i(this, e, 1), this.lazyRender || this.render()
    }

    function r(t) {
        e.call(this, t)
    }

    var i = QW.ObjectH.mix, s = QW.FunctionH.lazyApply, o = QW.DomU, u = o.createElement, a = QW.NodeH, f = QW.EventTargetH, l = f.addEventListener, c = f.removeEventListener, h = f.delegate, p = a.ancestorNode, d = a.getCurrentStyle, v = a.setStyle, m = a.getRect, g = a.setRect, y = a.addClass, b = a.removeClass, w = a.marginWidth, E = QW.EventH, S = E.getTarget, x = E.preventDefault, T = E.getPageX, N = E.getPageY, C = QW.CustEvent, k = {
        isDragging: !1,
        oDrag: null,
        startDate: null,
        startX: 0,
        startY: 0,
        pageX: 0,
        pageY: 0,
        deltaX: 0,
        deltaY: 0,
        deltaDeltaX: 0,
        deltaDeltaY: 0,
        mouseDownTarget: null,
        startDrag: function (e, t) {
        }
    };
    (function () {
        var e = function (e) {
            var r = k.oDrag;
            if (r.fire("beforedragstart") === !1)return;
            if (k.isDragging || !r)return;
            k.isDragging = !0, l(document, "mousemove", n), l(document, "mouseup", t), k.startDate = new Date, k.deltaX = k.deltaY = k.deltaDeltaX = k.deltaDeltaY = 0, k.startX = k.pageX = T(e), k.startY = k.pageY = N(e), k.mouseDownTarget = S(e), x(e), r.dragstart(e)
        }, t = function (e) {
            var r = k.oDrag;
            if (!k.isDragging || !r)return;
            r.dragend(e), k.isDragging = !1, k.oDrag = null, c(document, "mousemove", n), c(document, "mouseup", t)
        }, n = function (e) {
            var t = k.oDrag;
            if (!k.isDragging || !t)return;
            var n = T(e), r = N(e);
            k.deltaDeltaX = n - k.pageX, k.deltaDeltaY = r - k.pageY, k.pageX = n, k.pageY = r, k.deltaX = n - k.startX, k.deltaY = r - k.startY, t.drag(e)
        };
        k.startDrag = function (t, n) {
            if (k.isDragging)return;
            k.oDrag = n, e(t)
        }
    })(), function () {
        e.EVENTS = ["dragstart", "drag", "dragend"];
        var t = function (e) {
            return parseFloat(e) || 0
        };
        e.prototype = {
            oSrc: null,
            oHdl: null,
            oProxy: null,
            xAttr: "left",
            yAttr: "top",
            maxXAttr: null,
            minXAttr: null,
            maxYAttr: null,
            minYAttr: null,
            xFixed: !1,
            yFixed: !1,
            className: "proxy-dd",
            withProxy: !1,
            showProxy: !0,
            getProxy: function () {
                var e = null;
                return function () {
                    var t = this.oProxy || e;
                    return t || (t = u("div", {className: this.className}), document.body.appendChild(t), t.style.display = "none"), this.oProxy = t
                }
            }(),
            dragstart: function (e) {
                var n = this;
                n.oHdl.setCapture && n.oHdl.setCapture(), n.startXAttr = t(d(n.oSrc, n.xAttr.replace(/^-/, ""))), n.startYAttr = t(d(n.oSrc, n.yAttr.replace(/^-/, "")));
                if (n.withProxy) {
                    var r = n.getProxy(), i = m(n.oSrc);
                    g(r, i.left, i.top, i.width, i.height, !1), n.startXAttrProxy = t(r.style[n.xAttr.replace(/^-/, "")]), n.startYAttrProxy = t(r.style[n.yAttr.replace(/^-/, "")]), r.__deltaX = r.__deltaY = 0, s(function () {
                        n.showProxy && (r.style.display = "block")
                    }, null, [], 20, function () {
                        return n != k.oDrag || r.style.display != "none" ? -1 : k.deltaX * k.deltaX + k.deltaY * k.deltaY > 4 || new Date - k.startDate > 500 ? 1 : 0
                    })
                }
                n.fire("dragstart")
            },
            drag: function (e) {
                var t = this, n = {X: 1, Y: 1};
                for (var r in n) {
                    var i = r.toLowerCase();
                    if (!t[i + "Fixed"]) {
                        var s = (t[i + "Attr"].indexOf("-") == 0 ? -1 : 1) * k["delta" + r];
                        t["max" + r + "Attr"] != null && (s = Math.min(s, t["max" + r + "Attr"] - t["start" + r + "Attr"])), t["min" + r + "Attr"] != null && (s = Math.max(s, t["min" + r + "Attr"] - t["start" + r + "Attr"]));
                        if (t.withProxy) {
                            try {
                                v(t.oProxy, t[i + "Attr"], t["start" + r + "AttrProxy"] + s + "px")
                            } catch (o) {
                            }
                            t.oProxy["__delta" + r] = s
                        } else v(t.oSrc, t[i + "Attr"].replace(/^-/, ""), t["start" + r + "Attr"] + s + "px")
                    }
                }
                t.fire("drag")
            },
            dragend: function (e) {
                var t = this;
                t.oHdl.releaseCapture && t.oHdl.releaseCapture();
                if (t.withProxy) {
                    var n = t.oProxy;
                    n.style.display = "none", t.xFixed || v(t.oSrc, t.xAttr.replace(/^-/, ""), t.startXAttr + n.__deltaX + "px"), t.yFixed || v(t.oSrc, t.yAttr.replace(/^-/, ""), t.startYAttr + n.__deltaY + "px")
                }
                t.fire("dragend")
            },
            render: function () {
                var t = this;
                if (t._rendered)return;
                C.createEvents(t, e.EVENTS), t.delegateContainer ? h(t.delegateContainer, t.oHdlSelector, "mousedown", function (e) {
                    t.oHdl = this, t.oSrcSelector ? t.oSrc = p(this, t.oSrcSelector) : t.oSrc = t.oHdl, k.startDrag(e && e.core || e, t)
                }) : (t.oHdl = t.oHdl || t.oSrc, l(t.oHdl, "mousedown", function (e) {
                    k.startDrag(e, t)
                })), t._rendered = !0
            }
        }
    }(), function () {
        t.MENTOR_CLASS = e, t.prototype = {
            xAttr: "width",
            yAttr: "height",
            minXAttr: 0,
            minYAttr: 0
        }, i(t.prototype, e.prototype)
    }(), function () {
        n.EVENTS = ["dragstart", "drag", "dragend"], n.prototype = {
            oProxy: null, oHdl: null, getProxy: function () {
                var e = null;
                return function () {
                    var t = this.oProxy || e;
                    return t || (t = u("div", {className: "proxy-rectselector"}), document.body.appendChild(t), t.style.display = "none"), this.oProxy = t
                }
            }(), dragstart: function (e) {
                this.oProxy = this.getProxy();
                var t = this;
                s(function () {
                    t.oProxy.style.display = "block"
                }, null, [], 10, function () {
                    return t != k.oDrag || t.oProxy.style.display != "none" ? -1 : k.deltaX * k.deltaX + k.deltaY * k.deltaY > 2 ? 1 : 0
                }), this.oHdl.setCapture && this.oHdl.setCapture(), g(this.oProxy, k.startX, k.startY, 1, 1), this.fire("dragstart")
            }, drag: function (e) {
                g(this.oProxy, Math.min(k.startX, k.pageX), Math.min(k.startY, k.pageY), Math.abs(k.deltaX), Math.abs(k.deltaY)), this.fire("drag")
            }, dragend: function (e) {
                this.oHdl.releaseCapture && this.oHdl.releaseCapture(), this.oProxy.style.display = "none", this.fire("dragend")
            }, render: function () {
                var e = this;
                if (e._rendered)return;
                C.createEvents(e, n.EVENTS), l(e.oHdl, "mousedown", function (t) {
                    if (e.ignoreLeftButtonDrag && (E.getEvent(t) || {}).button & 2)return;
                    if (e.blackSelectors4Start) {
                        var n = S(t), r = [];
                        while (n)n.tagName && r.push(n), n = n.parentNode;
                        if (QW.Selector.filter(r, e.blackSelectors4Start).length)return;
                        k.startDrag(t, e)
                    } else S(t) == e.oHdl && k.startDrag(t, e)
                }), e._rendered = !0
            }
        }
    }(), function () {
        r.MENTOR_CLASS = e, r.prototype = {
            withProxy: !0, isInline: !1, dragstart: function (t) {
                y(this.oSrc, "dragingModule"), e.prototype.dragstart.call(this, t)
            }, dragend: function (t) {
                b(this.oSrc, "dragingModule"), e.prototype.dragend.call(this, t)
            }, adjustLayout: function (e) {
                var t = this, n = k.pageX, r = k.pageY, i = t.siblings, s = t.containers, o = t.isInline ? "deltaDeltaX" : "deltaDeltaY", u;
                if (e.type == "dragstart")t.__elAnim && t.__elAnim.pause(); else if (e.type == "drag")if (s || i) {
                    var a = !1;
                    u = m(t.oSrc);
                    var f = w(t.oSrc);
                    if (n >= u.left - f[3] && n <= u.right + f[1] && r >= u.top - f[0] && r <= u.bottom + f[2])return;
                    for (var l = 0; i != null && l < i.length; l++) {
                        var c = i[l];
                        if (c == t.oSrc)continue;
                        u = m(c), f = w(c);
                        if (n >= u.left - f[3] && n <= u.right + f[1] && r >= u.top - f[0] && r <= u.bottom + f[2]) {
                            k[o] > 0 ? c.parentNode.insertBefore(t.oSrc, c.nextSibling) : k[o] < 0 && c.parentNode.insertBefore(t.oSrc, c), a = !0;
                            break
                        }
                    }
                    for (var l = 0; !a && s != null && l < s.length; l++) {
                        c = s[l], u = m(c);
                        if (n > u.left + 1 && n < u.right - 1 && r > u.top + 1 && r < u.bottom - 1) {
                            c.lastChild != t.oSrc && (c.appendChild(t.oSrc), a = !0);
                            break
                        }
                    }
                    a && t.oHdl.setCapture && t.oHdl.setCapture()
                }
                if (e.type == "dragend" && t.needAnim && QW.ElAnim) {
                    u = m(t.oSrc), t.oProxy.style.display = "block";
                    var h = new QW.ElAnim(t.oProxy, {
                        width: {to: u.width},
                        height: {to: u.height},
                        left: {to: u.left},
                        top: {to: u.top}
                    }, 300);
                    h.on("end", function () {
                        t.oProxy.style.display = "none"
                    }), h.play(), t.oProxy.__elAnim = h
                }
            }, render: function () {
                var t = this;
                e.prototype.render.call(t)
            }
        }, i(r.prototype, e.prototype)
    }(), QW.provide({DragManager: k, SimpleDrag: e, SimpleResize: t, LayoutDrag: r, RectSelector: n})
}(), namespace("yunpan"), yunpan.dialog = function () {
    function e(e) {
        var n = {
            wrapId: "BasePanel" + ++t,
            className: "panel-t1",
            title: "",
            header: "",
            body: "",
            footer: "",
            withClose: !0,
            withCorner: !1,
            withCue: !1,
            withShadow: !1,
            withBgIframe: !0,
            keyEsc: !0,
            withMask: !0,
            dragable: !!QW.SimpleDrag,
            resizable: !1,
            posCenter: !0,
            posAdjust: !1
        };
        Object.mix(n, e, !0);
        var r = new QW.BasePanel(n);
        n.withClose && W(r.oWrap).query(".close").appendChild(W('<a class="close-link" href="###" onclick="return false;"><span>\u5173\u95ed</span></a>'));
        if (e.buttons) {
            for (var i = 0, s = e.buttons.length; i < s; i++) {
                var o = e.buttons[i], u = o.cls ? " " + o.cls : "", a = o.type ? o.type == "blue" ? "blue" : "gray" : o.text == "\u786e\u5b9a" ? "blue" : "gray", f = o.style ? ' style="' + o.style + '"' : "", l = o.id ? " id=" + o.id : "";
                btnHtml = ['<span class="y-btn y-btn-' + a + u + '"' + f + l + ">", o.withIcon ? '<i class="icon"></i>' : "", o.text, "</span>"].join("");
                var c = W(btnHtml).insertTo("beforeend", r.oFooter);
                o.handler && c.on("click", o.handler)
            }
            W(r.oFooter).css("display", "")
        } else W(r.oFooter).addClass("ft-none");
        return r.on("aftershow", function () {
            var e = W(r.oContent), t = e.getRect();
            W(r.oHeader).css("width", t.width - 16 + "px"), W(r.oFooter).css("width", t.width - 2 + "px"), W('<span class="left-corner"></span><span class="right-corner"></span>').insertTo("beforeend", r.oWrap)
        }), r
    }

    var t = 0;
    return {create: e}
}(), Ajax.prototype._execComplete = function () {
    var e = this, t = e.requester;
    t.onreadystatechange = new Function, e.isLocked = 0, clearTimeout(this._timer);
    if (e.state != Ajax.STATE_CANCEL && e.state != Ajax.STATE_TIMEOUT)if (e.isSuccess()) {
        e.state = Ajax.STATE_SUCCESS;
        var n = /(['"]?)errno\1\s*:\s*(['"]?)\s*(9999|2006)\s*(\2)/i;
        if (n.test(t.responseText) && RegExp.$3 == 9999) {
            yunpan.Msg.forceAlert(t.responseText.evalExp().errmsg, {type: "error"});
            return
        }
        e.fire("succeed")
    } else e.state = Ajax.STATE_ERROR, e.fire("error");
    e.fire("complete")
}, Ajax.post = function (e, t) {
    var n = [].slice.call(arguments, 0);
    return n.push("post"), ObjectH.isObject(n[1]) ? n[1].ajax = 1 : n.splice(1, 0, {ajax: 1}), Ajax.request.apply(null, n)
}, Ajax.get = function (e, t) {
    var n = [].slice.call(arguments, 0);
    return n.push("get"), ObjectH.isObject(n[1]) ? n[1].ajax = 1 : n.splice(1, 0, {ajax: 1}), Ajax.request.apply(null, n)
}, function () {
    "use strict";
    var e = function () {
        var e = /\-([a-z])/g, t = function (e, t) {
            return t.toUpperCase()
        };
        return function (n) {
            return n.replace(e, t)
        }
    }(), t = function (t, n) {
        var r, i, s, o, u, a;
        window.getComputedStyle ? r = window.getComputedStyle(t, null).getPropertyValue(n) : (i = e(n), t.currentStyle ? r = t.currentStyle[i] : r = t.style[i]);
        if (n === "cursor")if (!r || r === "auto") {
            s = t.tagName.toLowerCase(), o = ["a"];
            for (u = 0, a = o.length; u < a; u++)if (s === o[u])return "pointer"
        }
        return r
    }, n = function (e) {
        if (!d.prototype._singleton)return;
        e || (e = window.event);
        var t;
        this !== window ? t = this : e.target ? t = e.target : e.srcElement && (t = e.srcElement), d.prototype._singleton.setCurrent(t)
    }, r = function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }, i = function (e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
    }, s = function (e, t) {
        if (e.addClass)return e.addClass(t), e;
        if (t && typeof t == "string") {
            var n = (t || "").split(/\s+/);
            if (e.nodeType === 1)if (!e.className)e.className = t; else {
                var r = " " + e.className + " ", i = e.className;
                for (var s = 0, o = n.length; s < o; s++)r.indexOf(" " + n[s] + " ") < 0 && (i += " " + n[s]);
                e.className = i.replace(/^\s+|\s+$/g, "")
            }
        }
        return e
    }, o = function (e, t) {
        if (e.removeClass)return e.removeClass(t), e;
        if (t && typeof t == "string" || t === undefined) {
            var n = (t || "").split(/\s+/);
            if (e.nodeType === 1 && e.className)if (t) {
                var r = (" " + e.className + " ").replace(/[\n\t]/g, " ");
                for (var i = 0, s = n.length; i < s; i++)r = r.replace(" " + n[i] + " ", " ");
                e.className = r.replace(/^\s+|\s+$/g, "")
            } else e.className = ""
        }
        return e
    }, u = function () {
        var e, t, n, r = 1;
        return typeof document.body.getBoundingClientRect == "function" && (e = document.body.getBoundingClientRect(), t = e.right - e.left, n = document.body.offsetWidth, r = Math.round(t / n * 100) / 100), r
    }, a = function (e) {
        var n = {left: 0, top: 0, width: 0, height: 0, zIndex: 999999999}, r = t(e, "z-index");
        r && r !== "auto" && (n.zIndex = parseInt(r, 10));
        if (e.getBoundingClientRect) {
            var i = e.getBoundingClientRect(), s, o, a;
            "pageXOffset"in window && "pageYOffset"in window ? (s = window.pageXOffset, o = window.pageYOffset) : (a = u(), s = Math.round(document.documentElement.scrollLeft / a), o = Math.round(document.documentElement.scrollTop / a));
            var f = document.documentElement.clientLeft || 0, l = document.documentElement.clientTop || 0;
            n.left = i.left + s - f, n.top = i.top + o - l, n.width = "width"in i ? i.width : i.right - i.left, n.height = "height"in i ? i.height : i.bottom - i.top
        }
        return n
    }, f = function (e, t) {
        var n = !t || t.useNoCache !== !1;
        return n ? (e.indexOf("?") === -1 ? "?" : "&") + "nocache=" + (new Date).getTime() : ""
    }, l = function (e) {
        var t = [], n = [];
        return e.trustedOrigins && (typeof e.trustedOrigins == "string" ? n.push(e.trustedOrigins) : typeof e.trustedOrigins == "object" && "length"in e.trustedOrigins && (n = n.concat(e.trustedOrigins))), e.trustedDomains && (typeof e.trustedDomains == "string" ? n.push(e.trustedDomains) : typeof e.trustedDomains == "object" && "length"in e.trustedDomains && (n = n.concat(e.trustedDomains))), n.length && t.push("trustedOrigins=" + encodeURIComponent(n.join(","))), typeof e.amdModuleId == "string" && e.amdModuleId && t.push("amdModuleId=" + encodeURIComponent(e.amdModuleId)), typeof e.cjsModuleId == "string" && e.cjsModuleId && t.push("cjsModuleId=" + encodeURIComponent(e.cjsModuleId)), t.join("&")
    }, c = function (e, t) {
        if (t.indexOf)return t.indexOf(e);
        for (var n = 0, r = t.length; n < r; n++)if (t[n] === e)return n;
        return -1
    }, h = function (e) {
        if (typeof e == "string")throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return e.length ? e : [e]
    }, p = function (e, t, n, r, i) {
        i ? window.setTimeout(function () {
            e.call(t, n, r)
        }, 0) : e.call(t, n, r)
    }, d = function (e, t) {
        e && (d.prototype._singleton || this).glue(e);
        if (d.prototype._singleton)return d.prototype._singleton;
        d.prototype._singleton = this, this.options = {};
        for (var n in y)this.options[n] = y[n];
        for (var r in t)this.options[r] = t[r];
        this.handlers = {}, d.detectFlashSupport() && E()
    }, v, m = [];
    d.prototype.setCurrent = function (e) {
        v = e, this.reposition
        ();
        var n = e.getAttribute("title");
        n && this.setTitle(n);
        var r = this.options.forceHandCursor === !0 || t(e, "cursor") === "pointer";
        return g.call(this, r), this
    }, d.prototype.setText = function (e) {
        return e && e !== "" && (this.options.text = e, this.ready() && this.flashBridge.setText(e)), this
    }, d.prototype.setTitle = function (e) {
        return e && e !== "" && this.htmlBridge.setAttribute("title", e), this
    }, d.prototype.setSize = function (e, t) {
        return this.ready() && this.flashBridge.setSize(e, t), this
    }, d.prototype.setHandCursor = function (e) {
        return e = typeof e == "boolean" ? e : !!e, g.call(this, e), this.options.forceHandCursor = e, this
    };
    var g = function (e) {
        this.ready() && this.flashBridge.setHandCursor(e)
    };
    d.version = "1.2.1";
    var y = {
        moviePath: "ZeroClipboard.swf",
        trustedOrigins: null,
        text: null,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        allowScriptAccess: "sameDomain",
        useNoCache: !0,
        forceHandCursor: !1
    };
    d.setDefaults = function (e) {
        for (var t in e)y[t] = e[t]
    }, d.destroy = function () {
        d.prototype._singleton.unglue(m);
        var e = d.prototype._singleton.htmlBridge;
        e.parentNode.removeChild(e), delete d.prototype._singleton
    }, d.detectFlashSupport = function () {
        var e = !1;
        if (typeof ActiveXObject == "function")try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (e = !0)
        } catch (t) {
        }
        return !e && navigator.mimeTypes["application/x-shockwave-flash"] && (e = !0), e
    };
    var b = null, w = null, E = function () {
        var e = d.prototype._singleton, t = document.getElementById("global-zeroclipboard-html-bridge");
        if (!t) {
            var n = {};
            for (var r in e.options)n[r] = e.options[r];
            n.amdModuleId = b, n.cjsModuleId = w;
            var i = l(n), s = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + e.options.moviePath + f(e.options.moviePath, e.options) + '"/>         <param name="allowScriptAccess" value="' + e.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + i + '"/>         <embed src="' + e.options.moviePath + f(e.options.moviePath, e.options) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + i + '"           scale="exactfit">         </embed>       </object>';
            t = document.createElement("div"), t.id = "global-zeroclipboard-html-bridge", t.setAttribute("class", "global-zeroclipboard-container"), t.setAttribute("data-clipboard-ready", !1), t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", t.style.width = "15px", t.style.height = "15px", t.style.zIndex = "9999", t.innerHTML = s, document.body.appendChild(t)
        }
        e.htmlBridge = t, e.flashBridge = document["global-zeroclipboard-flash-bridge"] || t.children[0].lastElementChild
    };
    d.prototype.resetBridge = function () {
        return this.htmlBridge.style.left = "-9999px", this.htmlBridge.style.top = "-9999px", this.htmlBridge.removeAttribute("title"), this.htmlBridge.removeAttribute("data-clipboard-text"), o(v, this.options.activeClass), v = null, this.options.text = null, this
    }, d.prototype.ready = function () {
        var e = this.htmlBridge.getAttribute("data-clipboard-ready");
        return e === "true" || e === !0
    }, d.prototype.reposition = function () {
        if (!v)return !1;
        var e = a(v);
        return this.htmlBridge.style.top = e.top + "px", this.htmlBridge.style.left = e.left + "px", this.htmlBridge.style.width = e.width + "px", this.htmlBridge.style.height = e.height + "px", this.htmlBridge.style.zIndex = e.zIndex + 1, this.setSize(e.width, e.height), this
    }, d.dispatch = function (e, t) {
        d.prototype._singleton.receiveEvent(e, t)
    }, d.prototype.on = function (e, t) {
        var n = e.toString().split(/\s/g);
        for (var r = 0; r < n.length; r++)e = n[r].toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = t);
        return this.handlers.noflash && !d.detectFlashSupport() && this.receiveEvent("onNoFlash", null), this
    }, d.prototype.addEventListener = d.prototype.on, d.prototype.off = function (e, t) {
        var n = e.toString().split(/\s/g);
        for (var r = 0; r < n.length; r++) {
            e = n[r].toLowerCase().replace(/^on/, "");
            for (var i in this.handlers)i === e && this.handlers[i] === t && delete this.handlers[i]
        }
        return this
    }, d.prototype.removeEventListener = d.prototype.off, d.prototype.receiveEvent = function (e, t) {
        e = e.toString().toLowerCase().replace(/^on/, "");
        var n = v, r = !0;
        switch (e) {
            case"load":
                if (t && parseFloat(t.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10) {
                    this.receiveEvent("onWrongFlash", {flashVersion: t.flashVersion});
                    return
                }
                this.htmlBridge.setAttribute("data-clipboard-ready", !0);
                break;
            case"mouseover":
                s(n, this.options.hoverClass);
                break;
            case"mouseout":
                o(n, this.options.hoverClass), this.resetBridge();
                break;
            case"mousedown":
                s(n, this.options.activeClass);
                break;
            case"mouseup":
                o(n, this.options.activeClass);
                break;
            case"datarequested":
                var i = n.getAttribute("data-clipboard-target"), u = i ? document.getElementById(i) : null;
                if (u) {
                    var a = u.value || u.textContent || u.innerText;
                    a && this.setText(a)
                } else {
                    var f = n.getAttribute("data-clipboard-text");
                    f && this.setText(f)
                }
                r = !1;
                break;
            case"complete":
                this.options.text = null
        }
        if (this.handlers[e]) {
            var l = this.handlers[e];
            typeof l == "string" && typeof window[l] == "function" && (l = window[l]), typeof l == "function" && p(l, n, this, t, r)
        }
    }, d.prototype.glue = function (e) {
        e = h(e);
        for (var t = 0; t < e.length; t++)c(e[t], m) == -1 && (m.push(e[t]), r(e[t], "mouseover", n));
        return this
    }, d.prototype.unglue = function (e) {
        e = h(e);
        for (var t = 0; t < e.length; t++) {
            i(e[t], "mouseover", n);
            var r = c(e[t], m);
            r != -1 && m.splice(r, 1)
        }
        return this
    }, typeof define == "function" && define.amd ? define(["require", "exports", "module"], function (e, t, n) {
        return b = n && n.id || null, d
    }) : typeof module == "object" && module && typeof module.exports == "object" && module.exports ? (w = module.id || null, module.exports = d) : window.ZeroClipboard = d
}(), namespace("yunpan"), function () {
    function e(o, u) {
        r || t();
        var a = o.id;
        a || (a = yunpan.id(), o.id = a), s[a] = Object.mix({listeners: {}}, u, !0), r == e.TYPE_ZERO ? i.glue(o) : r == e.TYPE_IE ? W(o).on("click", n) : W(o).on("click", function () {
            var e = s[this.id], t = e.listeners.aftercopy;
            typeof t == "function" && t(!1, this, e)
        })
    }

    function t() {
        var t = yunpan.util.getSwfVersion();
        t && parseInt(t, 10) >= 10 && (!Browser.ie || Browser.ie >= 7) ? r = e.TYPE_ZERO : window.clipboardData ? r = e.TYPE_IE : r = e.TYPE_NOT;
        if (r == e.TYPE_ZERO && !i) {
            var n = "http://s8.qhimg.com/static/f7aa3b1f8b190337/ZeroClipboard.swf";
            ZeroClipboard.setDefaults({
                moviePath: n,
                allowScriptAccess: "always",
                trustedOrigins: [window.location.protocol + "//" + window.location.host]
            }), i = new ZeroClipboard, i.on("dataRequested", function () {
                var e = s[this.id], t = e.listeners.dataRequested, n = e.text;
                typeof t == "function" && (n = t(this, e)), i.setText(n)
            }), i.on("complete", function () {
                var e = s[this.id], t = e.listeners.aftercopy;
                typeof t == "function" && t(!0, this, e)
            })
        }
        e.type = r
    }

    function n() {
        var e = W(this).attr("data-clipboard-text"), t = s[this.id];
        if (!e) {
            e = t.text || "";
            var n = t.listeners.dataRequested;
            typeof n == "function" && (e = n(this, t))
        }
        var r = window.clipboardData.setData("Text", e), n = t.listeners.aftercopy;
        typeof n == "function" && n(r, this, t)
    }

    var r, i, s = {};
    e.TYPE_ZERO = "zero", e.TYPE_IE = "ie", e.TYPE_NOT = "not support", yunpan.Copy2Clipboard = e
}(), yunpan.Msg = function () {
    function e() {
    }

    var t = ['<div class="msg-panel {$type}" style="{$style}">', '<div class="msg-text-box"><div class="msg-text {$type}-tip" style="{$textstyle}">{$text}</div></div>', "</div>"].join(""), n = ['<div class="msg-panel msg-prompt">', '<div class="msg-text-box">', '<div class="msg-text">{$text}\uff1a<input id="{$promptIpt}" value="{$defaultText}"></div>', "</div>", "</div>"].join(""), r = '        <div class="msg-panel msg-prompt">            <div class="msg-text-box">                <div class="msg-text">                <label for="{$promptIpt}">{$text}\uff1a</label>                <textarea id="{$promptIpt}">{$defaultText}</textarea>                </div>            </div>        </div>';
    return {
        forceAlert: function (e, n) {
            n = ObjectH.mix({title: "\u63d0\u793a", type: "ok"}, n, !0);
            var r = yunpan.dialog.create({
                body: t.tmpl({type: "msg-" + n.type, text: e}),
                title: n.title,
                withClose: !1
            });
            return r.show(), r
        }, alert: function (e, n) {
            n = ObjectH.mix({title: "\u64cd\u4f5c\u63d0\u793a", type: "ok"}, n, !0);
            var r = n.dialog_after || null, i = [], s = [];
            n.width && i.push("width:" + n.width + "px"), n.height && i.push("height:" + n.height + "px"), i = i.join(";"), n.textwidth && s.push("width:" + n.textwidth + "px;"), n.textheight && s.push("height:" + n.textheight + "px"), s = s.join(";");
            var o = yunpan.dialog.create({
                body: t.tmpl({type: "msg-" + n.type, text: e, style: i, textstyle: s}),
                title: n.title,
                withMask: n.with_Mask === !1 ? !1 : !0,
                withClose: n.with_close === !1 ? !1 : !0,
                maxXAttr: n.maxXAttr,
                maxYAttr: n.maxYAttr,
                buttons: [{
                    text: "\u786e\u5b9a", handler: function () {
                        o.hide(), o.dispose(), o = null, n.fn && n.fn("yes"), r && (r.show(), r = null)
                    }
                }]
            });
            return o.show(), W(o.oFooter).query(".y-btn").item(0).focus(), o
        }, confirm: function (e, n) {
            n = ObjectH.mix({title: "\u64cd\u4f5c\u63d0\u793a", type: "ok"}, n, !0);
            var r = [], i = [];
            n.width && r.push("width:" + n.width + "px"), n.height && r.push("height:" + n.height + "px"), r = r.join(";"), n.textwidth && i.push("width:" + n.textwidth + "px"), n.textheight && i.push("height:" + n.textheight + "px"), i = i.join(";");
            var s = yunpan.dialog.create({
                body: t.tmpl({type: "msg-" + n.type, text: e, style: r, textstyle: i}),
                title: n.title,
                withClose: n.with_close === !1 ? !1 : !0,
                maxXAttr: n.maxXAttr,
                maxYAttr: n.maxYAttr,
                withMask: n.with_Mask === !1 ? !1 : !0,
                buttons: [{
                    text: n.btnOkText || "\u786e\u5b9a", handler: function () {
                        s.hide(), s.dispose(), s = null, n.fn && n.fn("yes")
                    }
                }, {
                    text: n.btnCancelText || "\u53d6\u6d88", handler: function () {
                        s.hide(), s.dispose(), s = null, n.fn && n.fn("no")
                    }
                }]
            });
            return s.show(), W(s.oFooter).query(".y-btn").item(0).focus(), s
        }, prompt: function (e, t) {
            t = ObjectH.mix({
                title: "\u64cd\u4f5c\u63d0\u793a",
                type: "ok",
                defaultText: "",
                inputId: yunpan.id()
            }, t, !0);
            var i = n;
            t.enable_textarea && (i = r);
            var s = yunpan.dialog.create({
                body: i.tmpl({
                    type: "msg-prompt",
                    text: e,
                    promptIpt: t.inputId,
                    defaultText: t.defaultText
                }),
                title: t.title,
                withClose: !0,
                withMask: t.with_Mask === !1 ? !1 : !0,
                maxXAttr: t.maxXAttr,
                maxYAttr: t.maxYAttr,
                buttons: [{
                    text: "\u786e\u5b9a", handler: function () {
                        t.fn && t.fn("yes", g(t.inputId).value), s.hide()
                    }
                }, {
                    text: "\u53d6\u6d88", handler: function () {
                        t.fn && t.fn("no", g(t.inputId).value), s.hide(), s.dispose(), s = null
                    }
                }]
            });
            return s.show(), setTimeout(function () {
                g(t.inputId).focus()
            }, 1), W("#" + t.inputId).on("keydown", function (e) {
                13 == e.keyCode && W(s.oFooter).query(".x-button").item(0).fire("click")
            }), s
        }
    }
}(), namespace("yunpan.util"), yunpan.util.getSwfVersion = function () {
    var e = !1;
    return function () {
        if (e === !1) {
            var t = navigator;
            if (t.plugins && t.mimeTypes.length) {
                var n = t.plugins["Shockwave Flash"];
                n && n.description && (e = n.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
            } else if (window.ActiveXObject && !window.opera)for (var r = 12; r >= 2; r--)try {
                var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + r);
                if (i) {
                    var s = i.GetVariable("$version");
                    e = s.replace(/WIN/g, "").replace(/,/g, ".")
                }
            } catch (o) {
            }
        }
        return e
    }
}(), yunpan.util.formatByte = function (e, t, n) {
    var r = "";
    Object.isString(e) && (e = parseInt(e)), Object.isString(t) && (t = parseInt(t));
    var i = [1099511627776, 1073741824, 1048576, 1024], s = ["T", "G", "M", "K"];
    t == undefined && (t = 1);
    for (var o = 0; o < i.length; o++) {
        var u = i[o];
        if (e >= u) {
            r = (e / u).toFixed(t) + s[o];
            break
        }
    }
    r || (e > 0 ? r = "1K" : r = "0K");
    if (n || typeof n == "undefined")r += "B";
    return r
}, yunpan.util.formatTime = function (e) {
    var t = [86400, 3600, 60, 1], n = ["\u5929", "\u5c0f\u65f6", "\u5206", "\u79d2"], r = !1, i = "";
    for (var s = 0; s < t.length; s++) {
        var o = t[s], u = n[s], a;
        if (r || e >= o)a = parseInt(e / o), i += a + u, e %= o, r = !0
    }
    return i || "0\u79d2"
}, yunpan.id = yunpan.util.id = function () {
    var e = 0;
    return function () {
        return "x-yp-" + ++e
    }
}(), function () {
    function e(e) {
        r || (r = {});
        try {
            var t = e.cssRules || e.rules, n, i = t.length - 1, s, o;
            for (; i >= 0; --i) {
                n = t[i].selectorText;
                if (n) {
                    n = n.split(","), o = n.length;
                    for (s = 0; s < o; s++)r[n[s].trim().toLowerCase()] = t[i]
                }
            }
        } catch (u) {
        }
    }

    function t(t) {
        if (r === null || t) {
            r = {};
            var n = i.styleSheets, s = 0, o = n.length;
            for (; s < o; s++)try {
                n[s].disabled || e(n[s])
            } catch (u) {
            }
        }
        return r
    }

    function n(e, n) {
        var r = t(n), i;
        if (!Object.isArray(e))return r[e.toLowerCase()];
        for (i = 0; i < e.length; i++)if (r[e[i]])return r[e[i].toLowerCase()];
        return null
    }

    var r = null, i = document, s = /(-[a-z])/gi, o = function (e, t) {
        return t.charAt(1).toUpperCase()
    };
    yunpan.util.createStyleSheet = function (t, n) {
        var r, s = i.getElementsByTagName("head")[0], o = i.createElement("style");
        o.setAttribute("type", "text/css"), n && o.setAttribute("id", n);
        if (Browser.ie)s.appendChild(o), r = o.styleSheet, r.cssText = t; else {
            try {
                o.appendChild(i.createTextNode(t))
            } catch (u) {
                o.cssText = t
            }
            s.appendChild(o), r = o.styleSheet ? o.styleSheet : o.sheet || i.styleSheets[i.styleSheets.length - 1]
        }
        return e(r), r
    }, yunpan.util.updateRule = function (e, t, r) {
        var i, u;
        if (!Object.isArray(e)) {
            i = n(e);
            if (i)return i.style[t.replace(s, o)] = r, !0
        } else for (u = 0; u < e.length; u++)if (yunpan.util.updateRule(e[u], t, r))return !0;
        return !1
    }
}(), namespace("yunpan.tip"), yunpan.tip.TipManager = function () {
    var e = [];
    return {
        hideAll: function () {
            for (var t = 0, n = e.length; t < n; t++)e[t].hide()
        }, create: function (t) {
            this.hideAll();
            var n = new yunpan.tip.Tip(t);
            return e.push(n), n
        }
    }
}(), yunpan.tip.Tip = function () {
    function e(e) {
        this.options = e = Object.mix({
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#000",
            borderOpacity: "1",
            backgroundColor: "#fff",
            backgroundOpactiy: 1,
            width: 200,
            height: 50,
            left: 0,
            top: 0,
            triangleWidth: 11,
            triangleHeight: 6,
            contentCls: "",
            html: "",
            hideType: "delay"
        }, e, !0), e.width = parseInt(e.width), e.height = parseInt(e.height), e.borderRadius = parseInt(e.borderRadius), e.borderWidth = parseInt(e.borderWidth), e.triangleHeight = parseInt(e.triangleHeight), e.triangleWidth = parseInt(e.triangleWidth);
        var n = e.width * 10, r = e.height * 10, i = e.borderWidth * 10, s = (e.borderWidth + e.triangleHeight) * 10, o = i + n, u = s + r, a = e.borderRadius * 10, f = a / 2, l = e.triangleWidth * 10, c = e.triangleHeight * 10, h = [[i, s + a], [i, s + f], [i + f, s], [i + a, s], [i + (n - l) / 2, s], [i + n / 2, s - c], [i + (n + l) / 2, s], [o - a, s], [o - f, s], [o, s + f], [o, s + a], [o, u - a], [o, u - f], [o - f, u], [o - a, u], [i + a, u], [i + f, u], [i, u - f], [i, u - a]];
        for (var p = 0, d = h.length; p < d; p++)h[p] = h[p].join(",");
        var v = "", m = 2 * e.borderWidth + e.width, g = 2 * e.borderWidth + e.height + e.triangleHeight;
        if (t) {
            v = "m " + h[0] + " c " + [h[1], h[2], h[3]].join(",") + " l " + [h[4], h[5], h[6], h[7]].join(",") + " c " + [h[8], h[9], h[10]].join(",") + " l " + h[11] + " c " + [h[12], h[13], h[14]].join(",") + " l " + h[15] + " c " + [h[16], h[17], h[18]].join(",") + " x e";
            var y = ['<v:shape style="position:absolute;z-index:-2;width:' + m + "px;height:" + g + 'px;" ' + 'coordsize="' + m * 10 + "," + g * 10 + '" ' + 'strokecolor="' + e.borderColor + '" ' + 'strokeweight="' + e.borderWidth * 2 + 'px">', '<v:path v="' + v + '"/>', '<v:stroke opacity="' + e.borderOpacity + '" joinstyle="miter"/>', "</v:shape>", '<v:shape style="position:absolute;z-index:-1;width:' + m + "px;height:" + g + 'px;" ' + 'coordsize="' + m * 10 + "," + g * 10 + '" ' + 'fillcolor="' + e.backgroundColor + '">', '<v:path v="' + v + '"/>', '<v:stroke opacity="0" joinstyle="miter"/>', "</v:shape>"].join("\n");
            document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML");
            var b = e.id || yunpan.id(), w = '<div id="' + b + '" style="display:none;position:absolute;width:' + m + "px;height:" + g + 'px;"></div>', E = W(w).insertTo("beforeend", document.body);
            E.css(e.style, !0), E[0].insertAdjacentHTML("beforeEnd", y + '<div style="z-index:1" class="' + e.contentCls + '">' + e.html + "</div>"), this.oDom = E
        } else {
            v = "M " + h[0] + " C " + [h[1], h[2], h[3]].join(" ") + " L " + [h[4], h[5], h[6], h[7]].join(" ") + " C " + [h[8], h[9], h[10]].join(" ") + " L " + h[11] + " C " + [h[12], h[13], h[14]].join(" ") + " L " + h[15] + " C " + [h[16], h[17], h[18]].join(" ") + " Z";
            var b = e.id || yunpan.id(), w = '<div id="' + b + '" style="display:none;position:absolute;width:' + m + "px;height:" + g + 'px;"></div>', E = W(w).insertTo("beforeend", document.body);
            E.css(e.style, !0);
            var S = "http://www.w3.org/2000/svg", x = document.createElementNS(S, "svg"), T = document.createElementNS(S, "path");
            x.setAttribute("width", m), x.setAttribute("height", g), x.setAttribute("viewBox", "0 0 " + m * 10 + " " + g * 10), T.setAttribute("d", v), T.style.fill = e.backgroundColor, T.style.stroke = e.borderColor, T.style.strokeWidth = e.borderWidth * 2 * 10, T.style.strokeOpacity = e.borderOpacity, T.style.strokeLinejoin = "miter", x.appendChild(T), E[0].appendChild(x), W('<div style="z-index:1" class="' + e.contentCls + '">' + e.html + "</div>").insertTo("beforeend", E[0]), this.oDom = E
        }
        this._bindEvent()
    }

    var t = Browser.ie && parseFloat(Browser.ie) < 9 ? !0 : !1;
    return e.prototype = {
        _bindEvent: function () {
            var e = this.options.target, t = this;
            Object.isString(e) ? e = W("#" + e) : e = W(e), e.length > 0 && (e.on("mouseover", function () {
                t.show()
            }), W(document.body).on("click", function () {
                t.hide()
            }))
        }, show: function () {
            yunpan.tip.TipManager.hideAll();
            var e = this.options.hideType, t = this;
            setTimeout(function () {
                t.oDom.fadeIn()
            }, 0), (e == "leave" || e == "delay&leave") && this.oDom.on("mouseleave", function () {
                t.oDom.fadeOut()
            });
            if (e == "delay" || e == "delay&leave")this._delayId && (clearTimeout(this._delayId), this._delayId = null), this._delayId = setTimeout(function () {
                t.oDom.fadeOut()
            }, 2e3);
            e == "delay&leave" && this.oDom.on("mouseenter", function () {
                t._delayId && (clearTimeout(t._delayId), t._delayId = null)
            })
        }, hide: function () {
            this.oDom.fadeOut()
        }
    }, e
}(), yunpan.tip.QuickTip = function () {
    function e(e) {
        s && r(!0), i = e = Object.mix({
            width: 298,
            type: "success",
            container: document.body,
            align: "center",
            delay: 2e3,
            close: !1
        }, e, !0), s ? (e.cls && s.removeClass(e.cls), e.style && s.removeAttr("style")) : s = W('<div class="x-quicktip"><div class="y-alert y-alert-success"><span class="close">\u00d7</span><p class="text"></p></div></div>'), s.insertTo("beforeend", W(e.container)[0]), e.cls && s.addClass(e.cls), e.style && s.css(e.style), e.close ? s.query(".close").show().on("click", n) : s.query(".close").hide()
    }

    function t(e, t, r) {
        t = a.indexOf(t) >= 0 ? t : "success", s.query(".y-alert").replaceClass("y-alert-" + u, "y-alert-" + t), u = t;
        var f = s.query(".text");
        f.html(e), s.show();
        var l = s.getRect(), c = f.getRect();
        if (i.align == "left")s.css("left", "0px"); else if (i.align == "right")s.css("right", "0px"); else {
            var h = W(i.container).getRect(), l = s.getRect();
            s.css("left", Math.max((h.width - l.width) / 2, 0) + "px")
        }
        i.close || (o = setTimeout(n, r ? r : i.delay))
    }

    function n() {
        o = null, s.fadeOut(500, function () {
            s.css("left", "-10000px")
        })
    }

    function r(e) {
        if (s == null)return;
        o && clearTimeout(o), e ? (o = null, s.css("left", "-10000px")) : n()
    }

    var i, s = null, o, u = "success", a = ["success", "warning", "loading", "danger", "unknow"];
    return {init: e, show: t, hide: r}
}(), yunpan.tips = function () {
    var e, t, n = null;
    return {
        show: function (r, i, s) {
            e || (e = W('<div id="topTips"><span class="msg"></span><a class="close"></a></div>').insertTo("beforeend", document.body), t = e.query("span"));
            var o = i != undefined ? i : !0, u = s != undefined ? s : !1, a = e.query(".close");
            u ? a.show() : a.hide(), r = r || "\u63d0\u4ea4\u4e2d...", n && (clearTimeout(n), n = null), t.html(r), e.css("height", "28px").fadeIn(100), o && (n = setTimeout(function () {
                e.fadeOut(300)
            }, 3e3))
        }, hide: function () {
            n && (clearTimeout(n), n = null), e && e.fadeOut(100)
        }, delayHide: function () {
            n && (clearTimeout(n), n = null);
            if (!e.isVisible())return !1;
            n = setTimeout(function () {
                e.fadeOut(300)
            }, 500)
        }, showNoticeLevelSystem: function () {
            var e = W("#userLevel").getRect();
            W("#levelTip").css({left: e.left - 100 + "px", top: e.bottom + 4 + "px", display: "block"}, !0)
        }
    }
}(), Dom.ready(function () {
    SYS_CONF.showNoticeLevelSystem && yunpan.tips.showNoticeLevelSystem()
}), yunpan.cmdCenter = ObjectH.mix(yunpan.cmdCenter || {}, function () {
    function e() {
        var e = "\u9080\u8bf7\u597d\u53cb";
        m = yunpan.dialog.create({
            className: "panel-t1 inviteDiaPanel",
            title: e,
            body: w,
            dragable: !1
        }), v = W("#inviteDia"), m.on("aftershow", function () {
            var e = v.query(".copy_url_box"), t = e.query(".copy_url"), n = v.query(".invite_url textarea"), r = v.query(".cp-url-tip");
            t.hasClass("clip-on") || (yunpan.Copy2Clipboard(t[0], {
                listeners: {
                    dataRequested: function () {
                        return n.val()
                    }, aftercopy: function (e) {
                        e ? (r.query(".cp-result").html("\u590d\u5236\u6210\u529f"), r.replaceClass("copy-failure", "copy-success"), r.show(), Browser.ie == 6 ? setTimeout(function () {
                            r.hide()
                        }, 1e3) : setTimeout(function () {
                            r.fadeOut(500)
                        }, 1e3)) : (r.query(".cp-result").html('\u62b1\u6b49\uff0c\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u91cc\u4e0d\u80fd\u81ea\u52a8\u590d\u5236\u5230\u526a\u8d34\u677f\u3002\u8bf7\u4f7f\u7528CTRL+C\u6216\u9f20\u6807\u53f3\u952e\u83dc\u5355\u590d\u5236<span class="cancel"></span>'), r.replaceClass("copy-success", "copy-failure"), r.show(), r.query(".cancel").on("click", function () {
                            r.hide()
                        }))
                    }
                }
            }), t.addClass("clip-on"))
        }), f(), u(), a(), o(), l()
    }

    function t(t, r) {
        r && r.tpl && (b = r.tpl), g = t.data, m || e(), v.query(".tab_trigger_li").removeClass("active_tab"), v.query(".tab_content_li").removeClass("show_tab"), v.query(".invite_url_trigger").addClass("active_tab"), v.query(".invite_url").addClass("show_tab"), v.query(".tab_arrow").set("className", "tab_arrow tab1"), m.show(), n(g)
    }

    function n(e) {
        v.query(".verify_code").hide();
        var t = "http://yunpan.360.cn/invite/" + e, n = v.query(".mail-input input");
        s(n), r(), i(t), yunpan.cmdCenter.initMsgNum(), d(t), h()
    }

    function r() {
        v.query(".send-btn").addClass("disabled"), yunpan.tips.hide(), v.query(".tip").hide(), v.query(".msg-limit-tip").hide(), v.query(".verify_code .vc-tip").html("")
    }

    function i(e) {
        var t = b.tmpl({url: e});
        v.query(".invite_url textarea").val(t), v.query(".copy_invite").html("\u590d\u5236\u94fe\u63a5"), v.query(".mail-content .inviteurl").html(e), v.query(".mail-content .name").html(yunpan.user.userinfo.name.subByte(20, "...").encode4Html())
    }

    function s(e) {
        W("#mailList").html("").hide();
        var t = v.query(".placeholder"), n = e.getRect(), r = v.query(".mail-input").getRect(), i = n.left - r.left + 1, s = n.top - r.top;
        v.query(".placeholder").setStyle({
            left: i + "px",
            top: s + "px"
        }), e.attr("data-name", "false"), e.css("width", "338px"), t.show(), e.show(), t.html("\u8bf7\u8f93\u5165\u90ae\u7bb1\uff0c\u7528\u9017\u53f7\u3001\u5206\u53f7\u6216\u7a7a\u683c\u5206\u9694");
        try {
            e.focus()
        } catch (o) {
        }
        Browser.ie == 6 ? (v.query(".ac_wrap").css("top", "123px"), v.query(".mail-content").css("top", "132px")) : (v.query(".ac_wrap").css("top", "94px"), v.query(".mail-content").css("top", "103px"))
    }

    function o() {
        var e = v.query(".placeholder");
        e.on("click", function () {
            v.query(".mail-input input").focus()
        })
    }

    function u() {
        v.query(".invite_url textarea").on("mouseover", function () {
            W(this).select()
        });
        var e = v.query(".verify_code .vc-tip"), t = v.query(".verify_code input");
        v.query(".send-btn").on("click", function () {
            W(this).hasClass("disabled") || setTimeout(function () {
                yunpan.cmdCenter.sendInviteUrl(t.val(), g)
            }, 200)
        }), v.query(".verify_code .refresh, .verify_code img").on("click", h), v.query(".others .ok_btn").on("click", function () {
            m.hide()
        })
    }

    function a() {
        var e = v.query(".mail-input input"), t = v.query(".placeholder"), n = [108, 13, 188, 32, 186];
        yunpan.cmdCenter.initSuggest(e), e.on("keydown", function (n) {
            var r = W("#mailList li");
            e.attr("data-name") === "false" && n.keyCode != 8 && n.keyCode != 13 && (t.hide(), e.attr("data-name", "true")), r.length >= y && e.hide(), n.keyCode === 8 && !r.length && e.val().length == 1 && s(e), n.keyCode === 8 && r.length && (e.val().length || yunpan.cmdCenter.removeLiNode(r, r.item(r.length - 1), e))
        }).on("keyup", function (t) {
            var r = W("#mailList li");
            r.length < y ? v.query(".ac_wrap .selected").length || n.indexOf(t.keyCode) >= 0 && (t.keyCode === 32 ? yunpan.cmdCenter.isFinish(W(this).getValue()) && yunpan.cmdCenter.completeInput(e) : yunpan.cmdCenter.completeInput(e)) : e.hide(), yunpan.cmdCenter.resizeInput()
        }).on("blur", function () {
            var t = W("#mailList li");
            t.length < y && setTimeout(function () {
                e.attr("data-name") != "false" && yunpan.cmdCenter.completeInput(e)
            }, 16)
        })
    }

    function f() {
        function e(e) {
            var t = v.query(".tab_content_li[data-tabid='" + e + "']");
            return t
        }

        var t = v.query(".tab_trigger_li"), n = t.query("a"), r = v.query(".tab_content_li");
        n.forEach(function (n) {
            W(n).on("click", function () {
                var i = W(n).parentNode("li");
                if (!i.hasClass("active_tab")) {
                    t.removeClass("active_tab"), i.addClass("active_tab"), r.removeClass("show_tab");
                    var o = W(this).attr("data-tabid");
                    targetContentTab = e(o).addClass("show_tab"), o = o.replace("#", ""), v.query(".tab_arrow").set("className", "tab_arrow " + o), targetContentTab.hasClass("send_mail") && (targetContentTab.query(".mail-input input").focus(), W("#mailList li").length || s(targetContentTab.query(".mail-input input")))
                }
            })
        })
    }

    function l() {
        var e = v.query(".verify_code input");
        e.on("blur", function () {
            if (!v.query(".send-btn").hasClass("disabled")) {
                var t = v.query(".verify_code .vc-tip");
                e.val().length ? c(e.val()) ? t.html("") : t.html("\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef") : t.html("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801")
            }
        })
    }

    function c(e) {
        var t = /^\w{4}$/;
        if (t.test(e))return !0
    }

    function h() {
        var e = "http://captcha.360.cn/image.php?app=ypinvite&t=", t = (new Date).getTime(), n = e + t;
        v.query(".verify_code img").attr("src", n), v.query(".verify_code input").val("")
    }

    function p(e) {
        var t = new ComboBox({
            oText: e[0], refreshData: function () {
                var e = this.oText.value.split("@")[0], t = (this.oText.value.split("@")[1] || "").toLowerCase(), n = ["@sina.com", "@163.com", "@qq.com", "@126.com", "@vip.sina.com", "@sina.cn", "@hotmail.com", "@gmail.com", "@sohu.com", "@yahoo.com", "@139.com", "@wo.com.cn", "@189.cn"], r = [];
                for (var i = 0; i < n.length; i++)n[i].indexOf(t) > -1 && r.push(e + n[i]);
                this.itemsData = r
            }, onselectitem: function () {
                var t = this;
                completeInput(e)
            }, onenter: function () {
                completeInput(e)
            }
        })
    }

    function d(e) {
        var t = "\u5206\u4eab", n = "\u7528\u7528{$at}\u5427\uff0c\u8d85\u5927\u7a7a\u95f4\u7f51\u76d8\uff0c\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\u4ec0\u4e48\u7684\u76f8\u5f53\u7ed9\u529b\uff0c\u518d\u4e5f\u4e0d\u62c5\u5fc3\u6587\u4ef6\u4e22\u5931\u3002\u8fd8\u80fd\u7528\u624b\u673a\u67e5\u770b\u54e6\uff01\u4f60\u53ef\u4ee5\u8bd5\u8bd5\u770b\uff1a{$link}\n\u73b0\u5728\u6b63\u5728\u505a\u6d3b\u52a8\uff0c\u8fd8\u80fd\u8d62\u82f9\u679c\u7535\u8111\u548c\u624b\u673a\uff01", r = {
            kaixin: "http://www.jiathis.com/send/",
            douban: "http://shuo.douban.com/!service/share",
            renren: "http://www.connect.renren.com/sharer.do",
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
            tencent: "http://v.t.qq.com/share/share.php",
            sina: "http://service.t.sina.com.cn/share/share.php"
        }, i = {
            kaixin: 207,
            douban: 206,
            renren: 205,
            qzone: 204,
            tencent: 203,
            sina: 202
        }, s = {
            kaixin: {
                webid: "kaixin001",
                url: encodeURIComponent(e + "?sid=207"),
                title: encodeURIComponent(n.tmpl({at: "360\u4e91\u76d8", link: "\n" + e}))
            },
            douban: {
                name: encodeURIComponent(n.tmpl({at: "360\u4e91\u76d8", link: ""})),
                href: encodeURIComponent(e + "?sid=206")
            },
            renren: {
                url: encodeURIComponent(e + "?sid=205"),
                title: encodeURIComponent(n.tmpl({at: "360\u4e91\u76d8", link: "\n" + e + "?sid=205"}))
            },
            qzone: {
                url: encodeURIComponent(e + "?sid=204"),
                title: encodeURIComponent(n.tmpl({at: "360\u4e91\u76d8", link: "\n" + e + "?sid=204"}))
            },
            tencent: {title: encodeURIComponent(n.tmpl({at: "@i360yunpan ", link: "\n"})), url: e + "?sid=203"},
            sina: {
                title: encodeURIComponent(n.tmpl({at: "@360\u4e91\u76d8 ", link: "\n" + e + "?sid=202"})),
                appkey: "4060160539",
                content: "utf8"
            }
        }, o = encodeURIComponent(SYS_CONF.thumbBig);
        v.query(".share_to_sns a").forEach(function (e) {
            var t = W(e), n = t.attr("className");
            if (!r[n])return;
            var i = r[n], o = s[n], u = [];
            for (var a in o)u.push(a + "=" + o[a]);
            i += "?", i += u.join("&"), t.attr("href", i), t.click(function () {
            })
        })
    }

    var v, m, g, y = 100, b = "\u7528\u7528360\u4e91\u76d8\u5427\uff0c\u8d85\u5927\u7a7a\u95f4\u7f51\u76d8\uff0c\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\u4ec0\u4e48\u7684\u76f8\u5f53\u7ed9\u529b\uff0c\u518d\u4e5f\u4e0d\u62c5\u5fc3\u6587\u4ef6\u4e22\u5931\u3002\u8fd8\u80fd\u7528\u624b\u673a\u67e5\u770b\u54e6\uff01\u4f60\u53ef\u4ee5\u8bd5\u8bd5\u770b\uff1a {$url}", w = '<div id="inviteDia"> <div class="head"> <span class="title_suc">\u5df2\u6210\u529f\u751f\u6210\u9080\u8bf7\u94fe\u63a5</span></div> <div class="tab_wrap"> <ul class="tab_trigger_ul"> <li class="tab_trigger_li active_tab invite_url_trigger"><a href="#"data-tabid="#tab1"onclick="return false"hidefocus="true">\u53d1\u9001\u9080\u8bf7\u94fe\u63a5</a> <li class="tab_trigger_li"><a href="#"data-tabid="#tab2"onclick="return false"hidefocus="true">\u5206\u4eab\u5230\u5fae\u535a\u3001\u793e\u533a</a> <li class="tab_trigger_li send_mail_trigger"><a href="#"data-tabid="#tab3"onclick="return false"hidefocus="true">\u53d1\u9001\u9080\u8bf7\u94fe\u63a5\u5230\u90ae\u7bb1</a></ul> <span class="tab_arrow"></span> <ul class="tab_content_ul"> <li class="tab_content_li show_tab invite_url"data-tabid="#tab1"> <p class="tips_of_content">\u6210\u529f\u751f\u6210\u9080\u8bf7\u94fe\u63a5\uff0c\u70b9\u201c\u590d\u5236\u201d\u6309\u94ae\u53ef\u4ee5\u5c06\u5185\u5bb9\u53d1\u9001\u7ed9QQ\u3001\u98de\u4fe1\u7b49\u597d\u53cb\u3002</p> <textarea type="text" value="" readonly ></textarea> <div class="btns"> <div class="copy_url_box"><a href="###"class="copy_url"hidefocus="true"onclick="return false">\u590d\u5236</a></div></div> <div class="tip down cp-url-tip"><div class="tip-arrow"></div><p class="cp-result"></p></div> <li class="tab_content_li share_to_sns"data-tabid="#tab2"> <p class="tips_of_content">\u5c06\u5df2\u751f\u6210\u7684\u5206\u4eab\u94fe\u63a5\u4e00\u952e\u53d1\u9001\u5230\uff1a</p> <div class="weibo-share btns clearfix"> <a target="_blank"href="###"hidefocus="true"class="sina">\u65b0\u6d6a\u5fae\u535a</a> <a target="_blank"href="###"hidefocus="true"class="tencent">\u817e\u8baf\u5fae\u535a</a></div> <div class="other-share"> <span>\u5176\u5b83\uff1a</span> <a target="_blank"href="###"hidefocus="true"class="kaixin">\u5206\u4eab</a> <a target="_blank"href="###"hidefocus="true"class="douban">\u5206\u4eab</a> <a target="_blank"href="###"hidefocus="true"class="renren">\u5206\u4eab</a> <a target="_blank"href="###"hidefocus="true"class="qzone">\u5206\u4eab</a></div> <li class="tab_content_li send_mail"data-tabid="#tab3"> <p class="tips_of_content">\u5c06\u5df2\u751f\u6210\u7684\u5206\u4eab\u94fe\u63a5<strong>\u514d\u8d39</strong>\u53d1\u9001\u5230\uff1a</p> <div class="ctrl-count-tip tip"style="display:none">\u4e00\u6b21\u6700\u591a\u8f93\u5165<span class="mail-limit"></span>\u9879\uff0c\u5206\u6210\u4e24\u6279\u5206\u4eab\u5427:)</div> <div class="mail-tip tip down"style="display:none;"><div class="tip-arrow"></div>\u65e0\u6cd5\u8bc6\u522b\u8be5\u8d26\u53f7,\u5206\u4eab\u65e0\u6cd5\u53d1\u9001\u5230\u8be5\u5730\u5740</div> <div class="msg-limit-tip tip down"style="display:none;"><div class="tip-arrow"></div>\u4eca\u65e5\u7d2f\u8ba1\u77ed\u4fe1\u5df2\u8fbe\u4e0a\u9650\uff08<span class="msg-total"></span>\u6761\uff09\uff0c\u5c06\u65e0\u6cd5\u53d1\u9001</div> <div class="mail-input"> <ul id="mailList"style="display:none;"></ul> <input data-name="false"> <label class="placeholder">\u8bf7\u8f93\u5165\u90ae\u7bb1\uff0c\u7528\u9017\u53f7\u3001\u5206\u53f7\u6216\u7a7a\u683c\u5206\u9694</label></div> <div class="mail-content"> <div class="frame-arrow"></div> <p class="fix_content"> <span class="first-words">\u53d1\u9001\u5185\u5bb9\uff1a</span>\u7528\u7528360\u4e91\u76d8\u5427\uff0c\u8d85\u5927\u7a7a\u95f4\u7f51\u76d8\uff0c\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\u4ec0\u4e48\u7684\u76f8\u5f53\u7ed9\u529b\uff0c\u518d\u4e5f\u4e0d\u62c5\u5fc3\u6587\u4ef6\u4e22\u5931\u3002\u8fd8\u80fd\u7528\u624b\u673a\u67e5\u770b\u54e6\uff01\u4f60\u53ef\u4ee5\u8bd5\u8bd5\u770b\uff1a<span class="inviteurl"></span></p></div> <p class="msg-left-tip"style="display:none;">\u6bcf\u65e5\u53ef\u53d1\u9001<span class="msg-total"></span>\u6761\u514d\u8d39\u77ed\u4fe1\uff0c\u8fd8\u5269<span class="msg-left"></span>\u6761</p> <div class="verify_code"><p class="vc-tip">hhh</p><div class="vc_content"><span>\u9a8c\u8bc1\u7801\uff1a</span><input type="text"><img src="/resource/img/blank.gif"><a class="refresh"href="###"onclick="return false">\u6362\u4e00\u4e2a</a></div></div> <a class="send-btn"href="###"hidefocus="true"onclick="return false">\u53d1\u9001</a></ul></div> <div class="others clearfix"><a href="###"class="ok_btn"onclick="return false"hidefocus="true">\u5173\u95ed</a></div> </div>';
    return {showInviteDia: t, resetInput: s, refreshVerifyCode: h}
}()), yunpan.cmdCenter = ObjectH.mix(yunpan.cmdCenter || {}, function () {
    function e(e, t) {
        h = e, p = t, d = W("#inviteDia"), m = d.query(".msg-left"), g = d.query(".msg-left-tip"), y = W("#mailList")
    }

    function t(e) {
        var t = /^\w[_\.\w-]{0,31}@(\w[\w-]{0,30}\w\.){1,4}[a-z]{2,4}$/, n = /^1[358]\d{9}$/;
        return t.test(e) ? 1 : 0
    }

    function n(e) {
        var t = /[\,\uff0c\uff0c\uff0c\uff1b\uff1b\uff1b\;\s\u3000\u3000\u3000]/g;
        return t.exec(e) ? !0 : !1
    }

    function r(e) {
        var t = /[\,\uff0c\uff0c\uff0c\uff1b\uff1b\uff1b\;\s\u3000\u3000\u3000]/g, n = e.replace(t, "");
        return n
    }

    function i(e, t, n) {
        var r = t.getRect(), i = n.getRect();
        r.top - i.top < 30 ? (e.removeClass("up"), e.addClass("down"), e.css("top", r.top - i.top + 11 + "px")) : (e.removeClass("down"), e.addClass("up"), e.css("top", r.top - i.top + r.height + 56 + "px")), r.left - i.left > 200 ? (e.removeClass("mid"), e.css("left", "200px"), e.query(".tip-arrow").css("left", r.left - i.left - 150 + "px")) : (e.hasClass("mid") || e.addClass("mid"), e.css("left", r.left - i.left + 30 + "px"), e.query(".tip-arrow").css("left", "9px"))
    }

    function s() {
        var e = W(".mail-input input"), t = y.lastChild();
        if (t && t.length) {
            var n = t.getRect(), r = W(".mail-input").getRect(), i = n.width + n.left, s = r.left + r.width - i - 35;
            s < e.getValue().byteLen() * 8 ? e.css("width", "338px") : e.css("width", s + "px"), r = W(".mail-input").getRect();
            var o = r.height - 46;
            d.query(".ac_wrap").css("top", 94 + o + "px"), d.query(".mail-content").css("top", 103 + o + "px")
        }
    }

    function o(e, t, n) {
        var r = d.query(".msg-limit-tip"), i = d.query
        (".send-btn");
        t.hasClass("phone") && (h++, m.html(h), h < 0 && m.html(0), h > 0 && (m.removeClass("zero-left"), m.html(h)), h <= 5 ? g.show() : g.hide(), !t.hasClass("exceed") && W("#mailList .exceed").length && W("#mailList .exceed").item(0).removeClass("exceed"), r.hide()), t.removeNode(), W("#mailList li").length || yunpan.cmdCenter.resetInput(n), W("#mailList li.correct").length - W("#mailList li.exceed").length <= 0 && !i.hasClass("disabled") && i.addClass("disabled"), s(), n.show()
    }

    function u(e) {
        var n = W("#mailList"), u = d.query(".mail-input"), a = d.query(".send_share"), f = d.query(".msg-limit-tip"), l = d.query(".mail-tip");
        v = d.query(".send-btn");
        var c = e.getValue();
        c = r(c), e.val("");
        if (c && c.length) {
            var p;
            if (t(c) == 1) {
                p = "correct mail";
                if (c.length > 40) {
                    var w = "..." + c.substring(c.indexOf("@") - 2, c.length), E = 40 - w.length, S = c.substring(0, E);
                    c = S + w
                }
            } else t(c) == 2 ? p = "correct phone" : (p = "error", c.byteLen() > 45 && (c = c.subByte(43, "...")));
            e.hide();
            var x = W('<li class="' + p + '"><span class="msg-limit"></span><span class="mail-str">' + c + '</span><span class="cancel"></span></li>').insertTo("beforeend", n);
            y.show(), x.query(".cancel").on("click", function () {
                o(n, x, e)
            }), x.on("mouseenter", function () {
                x.addClass("hover")
            }).on("mouseleave", function () {
                x.removeClass("hover")
            }), x.hasClass("phone") && (h--, m.html(h), h < 0 && (x.addClass("exceed"), setTimeout(function () {
                i(f, x, u), Browser.ie == 6 ? (f.show(), setTimeout(function () {
                    f.hide()
                }, 3e3)) : f.fadeIn(1, function () {
                    setTimeout(function () {
                        f.fadeOut(500)
                    }, 3e3)
                })
            }, 50), x.on("mouseenter", function (e) {
                W(e.target).hasClass("exceed") && setTimeout(function () {
                    i(f, x, u), Browser.ie == 6 ? f.show() : f.fadeIn(1)
                }, 50)
            }).on("mouseleave", function (e) {
                W(e.target).hasClass("exceed") && f.hide()
            })), h <= 0 && (m.addClass("zero-left"), m.html(0)), h <= 5 ? g.show() : g.hide()), y.query("li") && y.query("li").length >= b && (W(".mail-input input").hide(), d.query(".ac_wrap").hide(), d.query(".ctrl-count-tip .mail-limit").html(b), d.query(".ctrl-count-tip").show(), setTimeout(function () {
                d.query(".ctrl-count-tip").fadeOut(500)
            }, 3e3)), e.setValue(""), u[0].scrollTop = 1e4, y.query("li.correct").length - y.query("li.exceed").length > 0 && v.hasClass("disabled") && v.removeClass("disabled");
            var T = y.lastChild();
            T && T.length && setTimeout(function () {
                x.hasClass("error") && (i(l, x, u), Browser.ie == 6 ? (l.show(), setTimeout(function () {
                    l.hide()
                }, 3e3)) : l.fadeIn(1, function () {
                    setTimeout(function () {
                        l.fadeOut(500)
                    }, 3e3)
                })), y.query("li") && y.query("li").length < b && (s(), e.show(), e.focus())
            }, 100)
        } else y.query("li").length || yunpan.cmdCenter.resetInput(e)
    }

    function a(e) {
        var t = new ComboBox({
            oText: e[0], refreshData: function () {
                var e = this.oText.value.split("@")[0], t = (this.oText.value.split("@")[1] || "").toLowerCase(), n = ["", "@sina.com", "@163.com", "@qq.com", "@126.com", "@vip.sina.com", "@sina.cn", "@hotmail.com", "@gmail.com", "@sohu.com", "@yahoo.com", "@139.com", "@wo.com.cn", "@189.cn"], r = [];
                for (var i = 0; i < n.length; i++)n[i].indexOf(t) > -1 && r.push(e + n[i]);
                this.itemsData = r
            }, onselectitem: function () {
                var t = this;
                u(e)
            }, onenter: function () {
                u(e)
            }
        })
    }

    function f(e, t, n) {
        if (!w) {
            var r = ['<div id="sendLinkMask">', '<div class="ok"><div class="okbg">\u5df2\u6210\u529f\u53d1\u9001', '<span class="mail_msg"></span>', '</div> <p class="other_msg"></p><p>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u5206\u4eab\u3002</p>', "</div>", '<div class="bg"></div>', '<div class="error"><p class="errorbg">\u7f51\u7edc\u6545\u969c\uff0c\u672a\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002</p><div class="ok-btn">\u786e\u5b9a</div></div>', "</div>"].join("");
            w = W(r).insertTo("beforeend", d.parentNode(".panel")), W("#sendLinkMask .ok-btn").on("click", function () {
                W("#sendLinkMask").hide()
            })
        }
        W("#sendLinkMask .mail").html(t), W("#sendLinkMask .msg").html(n);
        var i = W("#sendLinkMask .only-mail"), s = W("#sendLinkMask .mail_msg"), o = W("#sendLinkMask .other_msg");
        olMsg = W("#sendLinkMask .only-msg"), both = W("#sendLinkMask .both"), warning = W("#sendLinkMask .error");
        switch (e) {
            case 0:
                W("#sendLinkMask .ok").show(), s.html(' <span class="mail">' + t + "</span> \u5c01\u90ae\u4ef6\u3002").show(), n == -2 ? o.html("\u77ed\u4fe1\u56e0\u540c\u4e00IP\u6bcf\u65e5\u53d1\u9001\u9650\u5236\uff0c\u53d1\u9001\u5931\u8d25").show() : o.hide(), warning.hide();
                break;
            case 1:
                W("#sendLinkMask .ok").show(), s.html(' <span class="msg">' + n + "</span> \u6761\u77ed\u4fe1\u3002").show(), o.hide(), warning.hide();
                break;
            case 2:
                W("#sendLinkMask .ok").show(), s.html(' <span class="mail">' + t + '</span> \u5c01\u90ae\u4ef6\uff0c <span class="msg">' + n + "</span> \u6761\u77ed\u4fe1\u3002").show(), o.hide(), warning.hide();
                break;
            case 3:
                n == -2 ? warning.query(".errorbg").html("\u77ed\u4fe1\u56e0\u540c\u4e00IP\u6bcf\u65e5\u53d1\u9001\u9650\u5236\uff0c\u53d1\u9001\u5931\u8d25") : warning.query(".errorbg").html("\u7f51\u7edc\u6545\u969c\uff0c\u672a\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"), W("#sendLinkMask .ok").hide(), warning.show()
        }
        var u = d.parentNode(".panel"), a = u.getRect();
        W("#sendLinkMask").css("width", a.width - 2 + "px"), W("#sendLinkMask").css("height", a.height - 2 + "px").show(), W("#sendLinkMask .bg").css("width", a.width - 2 + "px"), W("#sendLinkMask .bg").css("height", a.height - 2 + "px").show(), e != 3 && setTimeout(function () {
            W("#sendLinkMask").fadeOut(500), yunpan.cmdCenter.resetInput(d.query(".mail-input input"))
        }, 3e3)
    }

    function l(e) {
        var t = parseInt(e.errno, 10);
        if (t === 0) {
            y.html(""), W("#newLinkDia .link-oper .tip").hide(), v.addClass("disabled");
            var n = e.data.send_mail_count, r = e.data.send_sms_count, i = 0;
            h = e.data.surplus_sms_share_count, r == -1 && (h = 0), baseLeft = h, h <= 5 ? g.show() : g.hide(), m.html(h), h == 0 ? m.addClass("zero-left") : m.removeClass("zero-left"), n > 0 && r <= 0 ? i = 0 : n <= 0 && r > 0 ? i = 1 : n > 0 && r > 0 ? i = 2 : n <= 0 && r <= 0 && (i = 3), f(i, n, r)
        } else if (t === 26020)W("#newLinkDia .verify_code .vc-tip").html("\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef"); else if (t == 26042) {
            var s = W("#newLinkDia .add_err_tip");
            s.query("span").html(e.errmsg), Browser.ie == 6 ? (s.show(), setTimeout(function () {
                s.hide()
            }, 5e3)) : s.fadeIn(1, function () {
                setTimeout(function () {
                    s.fadeOut(500)
                }, 5e3)
            })
        } else f(3, 0, 0);
        yunpan.cmdCenter.refreshVerifyCode()
    }

    function c(e, t) {
        var n = W("#mailList li"), r = "";
        for (var i = 0, s = n.length; i < s; i++)if (W(n[i]).hasClass("correct")) {
            var o = W(n[i]).query(".mail-str").html();
            r += o + "|"
        }
        r = r.substring(0, r.length - 1), r.length && Ajax.post("/task/sendSmsOremail", {
            act_id: SYS_CONF && SYS_CONF.actId || "",
            sendlist: r,
            invite_code: t
        }, function (e) {
            try {
                e = e.evalExp(), l(e)
            } catch (t) {
                throw new Error("activity:sendSmsOremail, response may be uncorrect. " + t.message)
            }
        })
    }

    var h, p, d, v, m, g, y, b = 100, w;
    return {
        initMsgNum: e,
        initSuggest: a,
        isFinish: n,
        resizeInput: s,
        sendInviteUrl: c,
        completeInput: u,
        removeLiNode: o,
        sendCallback: l
    }
}()), yunpan.user = function () {
    function e(e) {
        var t;
        e.errno === 0 ? (t = e.data, t.is_yunpan_user ? (r(), W("#tpExit").attr("href", W("#tpExit").attr("href") + "?u=" + encodeURIComponent(location.href)), W("#topPanel .top-banner").show(), W("#topPanel .user").html(yunpan.user.userinfo.name.subByte(20, "\u2026").encode4Html()), SYS_CONF.user_name = yunpan.user.userinfo.name, yunpan.user.isLogin = !0, u && typeof u == "function" && u()) : yunpan.user.from_login ? yunpan.Msg.alert("\u60a8\u4e0d\u662f\u4e91\u76d8\u7528\u6237\uff0c\u8bf7\u66f4\u6362\u5e10\u53f7!", {
            type: "warning",
            with_close: !1,
            fn: function () {
                location.reload()
            }
        }) : W("#topLogin").show()) : W("#topLogin").show()
    }

    function t(e) {
        var t;
        e.errno === 0 ? (t = e.data, yunpan.user.jsonp_url = t.url, yunpan.user.userinfo = {
            name: t.name,
            avatar: t.avatar_url
        }, loadJs(t.url + "user/yplogin?cross_domain_callback=yunpan.user.yploginCheck&t=" + Math.random())) : Cookie.remove("Q", {domain: ".yunpan.cn"})
    }

    function n() {
        QHPass.loginCallback = function (e) {
            yunpan.user.from_login = !0, loadJs("http://yunpan.360.cn/user/getrequesturl?t=" + +(new Date) + "&cross_domain_callback=yunpan.user.loginCheck")
        };
        try {
            QHPass.showLogin(QHPass.loginCallback, {
                type: "pop", captFlag: !1, afterRender: function () {
                    var e = W("#mod_quc_pop");
                    W("#qucPanelTitle").html("\u767b\u5f55360\u4e91\u76d8"), W("#loginAccount").attr("placeholder", "\u60a8\u7684360\u5e10\u53f7\uff08\u624b\u673a\u53f7/\u7528\u6237\u540d/\u90ae\u7bb1\uff09"), W("#lpassword").attr("placeholder", "\u5bc6\u7801"), e.query(".reg-new-account").replaceNode('<a class="fac" href="http://yunpan.360.cn" target="_blank">\u6ce8\u518c\u5e10\u53f7</a>'), e.query(".other").hide(), W("#gotoQuickLogin").ancestorNode("dd").removeNode()
                }, onError: function (e) {
                    W("#loginSubmit").removeClass("loading")
                }, onLoading: function () {
                    W("#loginSubmit").addClass("loading")
                }
            })
        } catch (e) {
        }
    }

    function r() {
        a.hide()
    }

    function i(e) {
        u = e, W("#error_tips").html("").removeClass("login-error"), W("#loginAccount").length || window.setTimeout(function () {
            n(), W("#loginAccount").focus()
        }, 1), W("#loginAccount").focus()
    }

    function s() {
        W("#tpExit").attr("href", W("#tpExit").attr("href") + "?u=" + encodeURIComponent(location.href))
    }

    function o() {
        a = W("#login"), loadJs("http://yunpan.360.cn/user/getrequesturl?t=" + Math.random() + "&cross_domain_callback=yunpan.user.loginCheck"), QHPass.resConfig.src = "pcw_cloud", QHPass.resConfig.loginAfterSetName = !1, QHPass.resConfig.loginOpts.err2Global = !0, QHPass.resConfig.postCharset = "utf-8"
    }

    var u, a;
    return {
        init: o,
        jsonp_url: "",
        loginCheck: t,
        yploginCheck: e,
        showLoginDia: i,
        isLogin: !1,
        userName: "",
        logout: s
    }
}();
var getId = function () {
    var e = 0;
    return function () {
        return "yunpan_" + ++e
    }
}();
Dom.ready(init);
var actionAfterLogin = "", isLoginInited = !1, isRegInited = !1, isCheckLoginEmpty = !1, loginAccount, lpassword, Lottery = function () {
    function e() {
        if (a)return;
        if (!SYS_CONF.isLoginYunpan) {
            showMsg("login"), actionAfterLogin = "reload";
            return
        }
        a = !0, f = !1, o = W(".lucky-mod li"), Ajax.post("data/dolottery", {act_id: SYS_CONF.actId}, function (e) {
            p = JSON.parse(e), p.errno && (p.data = {reward_id: "-1"});
            var t = m[p.data.reward_id + ""].index, n = -1;
            if (t) {
                var r = t.length;
                if (r == 1)n = t[0]; else if (r > 1) {
                    var i = Math.random();
                    for (var s = 0; s < r; s++)if (i <= (s + 1) / r) {
                        n = t[s];
                        break
                    }
                }
                l = o.length - u + n - 1, p.errno || (l += 2 * o.length), f = !0
            }
        }), r()
    }

    function t(e) {
        var t = e.data.used_size, n = e.data.total_size, r = t / n;
        W(".area-info .detail").html(yunpan.util.formatByte(t) + "/" + yunpan.util.formatByte(n)), r = r < 1 ? 1 : r > 100 ? 100 : r, W(".area-info .current").css("width", r + "%")
    }

    function n() {
        a = !1;
        var e = m[p.data.reward_id + ""], t;
        p.errno == 100006 ? showMsg("nochance", "\u60a8\u4eca\u65e5\u62bd\u5956\u673a\u4f1a\u5df2\u7528\u5b8c<br>\u8bf7\u660e\u65e5\u518d\u6765") : p.errno == 100016 ? showMsg("invite") : p.errno ? showMsg("nochance", p.errmsg) : e.isSpace ? (showMsg("space", e.cls, e.name), loadJs(p.data.domain + "/user/getsize/?cross_domain_callback=Lottery.updateSize&t=" + Math.random())) : showMsg("goods", e.cls, e.name), p.data.is_use_weibo && W(".weibo-one-more").html("\u5206\u4eab\u5fae\u535a");
        var n;
        p.data.surplus_lotterys > 0 ? n = "\u4f60\u8fd8\u6709 " + p.data.surplus_lotterys + " \u6b21\u62bd\u5956\u673a\u4f1a" : p.data.is_use_weibo ? p.data.invite_get_lotterys ? n = "\u60a8\u8fd8\u53ef\u4ee5\u901a\u8fc7\u9080\u8bf7\u597d\u53cb\u83b7\u53d6\u66f4\u591a\u62bd\u5956\u673a\u4f1a" : n = "\u60a8\u4eca\u65e5\u62bd\u5956\u673a\u4f1a\u5df2\u7528\u5b8c" : n = "\u60a8\u8fd8\u53ef\u4ee5\u5206\u4eab\u5fae\u535a\u83b7\u53d6\u66f4\u591a\u62bd\u5956\u673a\u4f1a", W(".lucky-mod .tips").html(n).show()
    }

    function r() {
        o.item(u).removeClass("current"), u++, u >= o.length && (u = 0), o.item(u).addClass("current"), f ? l > c ? (c++, h = setTimeout(r, d + Math.pow(2, 20 / l * c - 15) * 8)) : (f = !1, l = 0, c = 0, h = setTimeout(n, 300)) : h = setTimeout(r, d)
    }

    function i() {
        if (y)return;
        var e = g("infoForm"), t = e.uname.value.trim(), n = e.phoneNo.value.trim(), r = e.address.value.trim();
        !t || t.length < 1 ? alert("\u8bf7\u586b\u5199\u60a8\u7684\u59d3\u540d") : t.length < 2 ? alert("\u8bf7\u586b\u5199\u60a8\u7684\u771f\u5b9e\u59d3\u540d") : !n || n.length < 1 ? alert("\u8bf7\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7") : n.length < 11 ? alert("\u60a8\u586b\u5199\u7684\u624b\u673a\u53f7\u4f4d\u6570\u4e0d\u591f\uff0c\u8bf7\u68c0\u67e5") : /^\d{11}$/.test(n) ? !r || r.length < 1 ? alert("\u8bf7\u586b\u5199\u4f60\u7684\u6536\u83b7\u5730\u5740") : r.length < 5 ? alert("\u4e3a\u4fdd\u8bc1\u60a8\u80fd\u6536\u5230\u5956\u54c1\uff0c\u8bf7\u586b\u5199\u8be6\u7ec6\u5730\u5740") : showMsg("info-confirm") : alert("\u624b\u673a\u53f7\u586b\u5199\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5")
    }

    function s(e) {
        hideMsg(), showMsg("info");
        if (e != "yes")return;
        y = !0;
        var t = g("infoForm"), n = t.uname.value.trim(), r = t.phoneNo.value.trim(), i = t.address.value.trim();
        Ajax.post("/lottery/addContactInfo", {
            act_id: SYS_CONF.actId,
            user_name: n,
            phone: r,
            address: i,
            reward_id: p.data.reward_id
        }, function (e) {
            y = !1;
            var t = JSON.parse(e);
            t.errno ? (W(".pop-fail .tips").html(t.errmsg), showMsg("info-fail")) : (hideMsg(), showMsg("info-suc"))
        })
    }

    var o, u = 0, a = !1, f = !1, l = 0, c = 0, h, p, d = 50, v = 5, m = {
        "-1": {
            name: "\u8c22\u8c22\u53c2\u4e0e",
            index: [18]
        },
        101: {name: "50G\u7a7a\u95f4", index: [6, 12], cls: "gift-50g", isSpace: !0},
        102: {name: "100G\u7a7a\u95f4", index: [4, 16], cls: "gift-100g", isSpace: !0},
        103: {name: "500G\u7a7a\u95f4", index: [10], cls: "gift-500g", isSpace: !0},
        104: {name: "1T\u7a7a\u95f4", index: [0], cls: "gift-1t", isSpace: !0},
        105: {name: "10T\u7a7a\u95f4", index: [2], cls: "gift-10t", isSpace: !0},
        106: {name: "100T\u7a7a\u95f4", index: [14], cls: "gift-100t", isSpace: !0},
        112: {name: "360G\u7a7a\u95f4", index: [8], cls: "gift-360g", isSpace: !0},
        107: {name: "360\u968f\u8eabWiFi", index: [5, 19], cls: "gift-wifi"},
        108: {name: "\u9650\u91cf\u7248\u4e91\u76d8\u5b89\u4ed4", index: [13, 17], cls: "gift-anzai"},
        109: {name: "\u9650\u91cf\u7248\u4e91\u76d8\u52cb\u7ae0", index: [3, 15], cls: "gift-medal"},
        110: {name: "iPhone 5S", index: [1, 9], cls: "gift-iphone5s"},
        111: {name: "\u590f\u65b0\u5927V\u56fd\u738b\u7248", index: [7, 11], cls: "gift-vphone"}
    }, y = !1;
    return {start: e, submitCheck: i, doSubmit: s, updateSize: t}
}();
(function () {
    if (typeof window.monitor != "undefined")return;
    var e = "V1.2.6(2013.01.30)", t = "360.cn", n = function (n, r) {
        var i = document, s = navigator, o = n.screen, u = document.domain.toLowerCase(), a = s.userAgent.toLowerCase(), f = function () {
            function e(e) {
                return e != null && e.constructor != null ? Object.prototype.toString.call(e).slice(8, -1) : ""
            }

            return {
                isArray: function (t) {
                    return e(t) == "Array"
                }, isObject: function (e) {
                    return e !== null && typeof e == "object"
                }, mix: function (e, t, n) {
                    for (var r in t)if (n || !(e[r] || r in e))e[r] = t[r];
                    return e
                }, encodeURIJson: function (e) {
                    var t = [];
                    for (var n in e) {
                        if (e[n] == null)continue;
                        t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
                    }
                    return t.join("&")
                }
            }
        }(), l = {
            get: function (e) {
                var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                return (t = i.cookie.match(n)) ? unescape(t[2]) : ""
            }, set: function (e, t, n) {
                n = n || {};
                var r = n.expires;
                typeof r == "number" && (r = new Date, r.setTime(r.getTime() + n.expires)), i.cookie = e + "=" + escape(t) + (r ? ";expires=" + r.toGMTString() : "") + (n.path ? ";path=" + n.path : "") + (n.domain ? "; domain=" + n.domain : "")
            }
        }, c = {
            getProject: function () {
                return ""
            }, getReferrer: function () {
                return i.referrer
            }, getBrowser: function () {
                var e = {
                    "360se-ua": "360se",
                    TT: "tencenttraveler",
                    Maxthon: "maxthon",
                    GreenBrowser: "greenbrowser",
                    Sogou: "se 1.x / se 2.x",
                    TheWorld: "theworld"
                };
                for (var t in e)if (a.indexOf(e[t]) > -1)return t;
                var r = !1;
                try {
                    +external.twGetVersion(external.twGetSecurityID(n)).replace(/\./g, "") > 1013 && (r = !0)
                } catch (i) {
                }
                if (r)return "360se-noua";
                var s = a.match(/(msie|chrome|safari|firefox|opera)/);
                return s = s ? s[0] : "", s == "msie" && (s = a.match(/msie[^;]+/)), s
            }, getLocation: function () {
                var e = "";
                try {
                    e = location.href
                } catch (t) {
                    e = i.createElement("a"), e.href = "", e = e.href
                }
                return e = e.replace(/[?#].*$/, ""), e = /\.(s?htm|php)/.test(e) ? e : e.replace(/\/$/, "") + "/", e = e.replace(/http:\/\/\w*\.yunpan/i, "http://yunpan").replace(/\/code\/[0-9a-z]+\//i, "/code/ID/").replace(/\/lk\/[0-9a-z]{10,13}/i, "/lk/ID").replace(/\/index\/index\/invite\/.*/i, "/index/index/invite/ID").replace(/(\/\d+\/)|(\/[0-9a-z]+=+\/)/i, "/ID/").replace(/\/index\/$/i, "/").replace(/\/invite\/[a-z]{10,}/i, "/invite/ID"), e
            }, getGuid: function () {
                function e(e) {
                    var t = 0, n = 0, r = e.length - 1;
                    for (r; r >= 0; r--) {
                        var i = parseInt(e.charCodeAt(r), 10);
                        t = (t << 6 & 268435455) + i + (i << 14), (n = t & 266338304) != 0 && (t ^= n >> 21)
                    }
                    return t
                }

                function r() {
                    var t = [s.appName, s.version, s.language || s.browserLanguage, s.platform, s.userAgent, o.width, "x", o.height, o.colorDepth, i.referrer].join(""), r = t.length, u = n.history.length;
                    while (u)t += u-- ^ r++;
                    return (Math.round(Math.random() * 2147483647) ^ e(t)) * 2147483647
                }

                var a = "__guid", f = l.get(a);
                if (!f) {
                    f = [e(i.domain), r(), +(new Date) + Math.random() + Math.random()].join(".");
                    var c = {expires: 2592e7, path: "/"};
                    if (t) {
                        var h = "." + t;
                        if (u.indexOf(h) > 0 && u.lastIndexOf(h) == u.length - h.length || u == h)c.domain = h
                    }
                    l.set(a, f, c)
                }
                return function () {
                    return f
                }
            }(), getCount: function () {
                var e = "count", t = l.get(e);
                return t = (parseInt(t) || 0) + 1, l.set(e, t, {expires: 864e5, path: "/"}), function () {
                    return t
                }
            }(), getFlashVer: function () {
                var e = -1;
                if (s.plugins && s.mimeTypes.length) {
                    var t = s.plugins["Shockwave Flash"];
                    t && t.description && (e = t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
                } else if (n.ActiveXObject && !n.opera)try {
                    var r = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (r) {
                        var i = r.GetVariable("$version");
                        e = i.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (o) {
                }
                return e = parseInt(e, 10), e
            }
        }, h = {
            getBase: function () {
                return {p: c.getProject(), u: c.getLocation(), id: c.getGuid(), guid: c.getGuid()}
            }, getTrack: function () {
                return {b: c.getBrowser(), c: c.getCount(), r: c.getReferrer(), fl: c.getFlashVer()}
            }
        }, p = {trackUrl: null, clickUrl: null, areaIds: null};
        return {
            version: e, util: c, data: h, config: p, sendLog: function () {
                return n.__monitor_imgs = {}, function (e) {
                    var t = "log_" + +(new Date), r = n.__monitor_imgs[t] = new Image;
                    r.onload = r.onerror = function () {
                        n.__monitor_imgs[t] = null, delete n.__monitor_imgs[t]
                    }, r.src = e
                }
            }(), buildLog: function () {
                var e = "";
                return function (t, n) {
                    if (t === !1)return;
                    t = t || {};
                    var r = h.getBase();
                    t = f.mix(r, t, !0);
                    var i = n + f.encodeURIJson(t);
                    if (i == e)return;
                    e = i, setTimeout(function () {
                        e = ""
                    }, 500);
                    var s = f.encodeURIJson(t);
                    s += "&t=" + +(new Date), n = n.indexOf("?") > -1 ? n + "&" + s : n + "?" + s, this.sendLog(n)
                }
            }(), log: function (e, t) {
                t = t || "click";
                var n = p[t + "Url"];
                n || alert("Error : the " + t + "url does not exist!"), this.buildLog(e, n)
            }, setConf: function (e, t) {
                var n = {};
                return f.isObject(e) ? n = e : n[e] = t, this.config = f.mix(this.config, n, !0), this
            }, getTrack: function () {
                var e = this.data.getTrack();
                return this.log(e, "track"), this
            }
        }
    }(window);
    window.monitor = n
})();
try {
    monitor.setConf({
        trackUrl: "http://s.360.cn/yunpan/puv.htm",
        clickUrl: "http://s.360.cn/yunpan/click.htm",
        wpoUrl: "http://s.360.cn/yunpan/perform.htm",
        btnUrl: "http://s.360.cn/yunpan/webclick.html"
    }), monitor.getTrack(), monitor.clickLog = function (e, t) {
        this.log({c: e, cId: t || "normal"}, "click")
    }, monitor.tlog = function (e) {
        e = ObjectH.mix({qid: "qid", m: "all", a: "log"}, e, !0), this.log(e, "click")
    }, monitor.btnLog = function (e) {
        this.log({buttonid: e}, "btn")
    }, monitor.yplog = function (e, t) {
        var n = "/UserBehavior/saveLog", r = {sid: e};
        t && (r.ext = Object.stringify(t)), Ajax.get(n, r, function () {
        })
    };
    var G_ready_time;
    Dom.ready(function () {
        G_ready_time = new Date
    }), W(window).on("load", function () {
        var e = {t0: G_ready_time - G_start_time, t1: new Date - G_start_time};
        monitor.log(e, "wpo")
    })
} catch (e) {
}
