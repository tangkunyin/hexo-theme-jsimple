function noty(e) {
    var t = 0, n = {
        animateOpen: "animation.open",
        animateClose: "animation.close",
        easing: "animation.easing",
        speed: "animation.speed",
        onShow: "callback.onShow",
        onShown: "callback.afterShow",
        onClose: "callback.onClose",
        onClosed: "callback.afterClose"
    };
    return jQuery.each(e, function (o, i) {
        if (n[o]) {
            t++;
            var r = n[o].split(".");
            e[r[0]] || (e[r[0]] = {}), e[r[0]][r[1]] = i ? i : function () {
            }, delete e[o]
        }
    }), e.closeWith || (e.closeWith = jQuery.noty.defaults.closeWith), e.hasOwnProperty("closeButton") && (t++, e.closeButton && e.closeWith.push("button"), delete e.closeButton), e.hasOwnProperty("closeOnSelfClick") && (t++, e.closeOnSelfClick && e.closeWith.push("click"), delete e.closeOnSelfClick), e.hasOwnProperty("closeOnSelfOver") && (t++, e.closeOnSelfOver && e.closeWith.push("hover"), delete e.closeOnSelfOver), e.hasOwnProperty("custom") && (t++, "null" != e.custom.container && (e.custom = e.custom.container)), e.hasOwnProperty("cssPrefix") && (t++, delete e.cssPrefix), "noty_theme_default" == e.theme && (t++, e.theme = "defaultTheme"), e.hasOwnProperty("dismissQueue") || (e.dismissQueue = jQuery.noty.defaults.dismissQueue), e.buttons && jQuery.each(e.buttons, function (e, n) {
        n.click && (t++, n.onClick = n.click, delete n.click), n.type && (t++, n.addClass = n.type, delete n.type)
    }), t && "undefined" != typeof console && console.warn && console.warn("You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options."), jQuery.notyRenderer.init(e)
}
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = rt.type(e);
        return "function" === n || rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function o(e, t, n) {
        if (rt.isFunction(t))return rt.grep(e, function (e, o) {
            return !!t.call(e, o, e) !== n
        });
        if (t.nodeType)return rt.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pt.test(t))return rt.filter(t, e, n);
            t = rt.filter(t, e)
        }
        return rt.grep(e, function (e) {
            return rt.inArray(e, t) >= 0 !== n
        })
    }

    function i(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function r(e) {
        var t = wt[e] = {};
        return rt.each(e.match(_t) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        mt.addEventListener ? (mt.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1)) : (mt.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
    }

    function a() {
        (mt.addEventListener || "load" === event.type || "complete" === mt.readyState) && (s(), rt.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var o = "data-" + t.replace(Tt, "-$1").toLowerCase();
            if (n = e.getAttribute(o), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : At.test(n) ? rt.parseJSON(n) : n
                } catch (i) {
                }
                rt.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function c(e) {
        var t;
        for (t in e)if (("data" !== t || !rt.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
        return !0
    }

    function u(e, t, n, o) {
        if (rt.acceptData(e)) {
            var i, r, s = rt.expando, a = e.nodeType, l = a ? rt.cache : e, c = a ? e[s] : e[s] && s;
            if (c && l[c] && (o || l[c].data) || void 0 !== n || "string" != typeof t)return c || (c = a ? e[s] = G.pop() || rt.guid++ : s), l[c] || (l[c] = a ? {} : {toJSON: rt.noop}), ("object" == typeof t || "function" == typeof t) && (o ? l[c] = rt.extend(l[c], t) : l[c].data = rt.extend(l[c].data, t)), r = l[c], o || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[rt.camelCase(t)] = n), "string" == typeof t ? (i = r[t], null == i && (i = r[rt.camelCase(t)])) : i = r, i
        }
    }

    function d(e, t, n) {
        if (rt.acceptData(e)) {
            var o, i, r = e.nodeType, s = r ? rt.cache : e, a = r ? e[rt.expando] : rt.expando;
            if (s[a]) {
                if (t && (o = n ? s[a] : s[a].data)) {
                    rt.isArray(t) ? t = t.concat(rt.map(t, rt.camelCase)) : t in o ? t = [t] : (t = rt.camelCase(t), t = t in o ? [t] : t.split(" ")), i = t.length;
                    for (; i--;)delete o[t[i]];
                    if (n ? !c(o) : !rt.isEmptyObject(o))return
                }
                (n || (delete s[a].data, c(s[a]))) && (r ? rt.cleanData([e], !0) : ot.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
            }
        }
    }

    function h() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return mt.activeElement
        } catch (e) {
        }
    }

    function m(e) {
        var t = Mt.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, o, i = 0, r = typeof e.getElementsByTagName !== kt ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== kt ? e.querySelectorAll(t || "*") : void 0;
        if (!r)for (r = [], n = e.childNodes || e; null != (o = n[i]); i++)!t || rt.nodeName(o, t) ? r.push(o) : rt.merge(r, g(o, t));
        return void 0 === t || t && rt.nodeName(e, t) ? rt.merge([e], r) : r
    }

    function b(e) {
        Lt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return rt.nodeName(e, "table") && rt.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function v(e) {
        return e.type = (null !== rt.find.attr(e, "type")) + "/" + e.type, e
    }

    function _(e) {
        var t = Gt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        for (var n, o = 0; null != (n = e[o]); o++)rt._data(n, "globalEval", !t || rt._data(t[o], "globalEval"))
    }

    function x(e, t) {
        if (1 === t.nodeType && rt.hasData(e)) {
            var n, o, i, r = rt._data(e), s = rt._data(t, r), a = r.events;
            if (a) {
                delete s.handle, s.events = {};
                for (n in a)for (o = 0, i = a[n].length; i > o; o++)rt.event.add(t, n, a[n][o])
            }
            s.data && (s.data = rt.extend({}, s.data))
        }
    }

    function C(e, t) {
        var n, o, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ot.noCloneEvent && t[rt.expando]) {
                i = rt._data(t);
                for (o in i.events)rt.removeEvent(t, o, i.handle);
                t.removeAttribute(rt.expando)
            }
            "script" === n && t.text !== e.text ? (v(t).text = e.text, _(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ot.html5Clone && e.innerHTML && !rt.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Lt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function k(t, n) {
        var o = rt(n.createElement(t)).appendTo(n.body), i = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(o[0]).display : rt.css(o[0], "display");
        return o.detach(), i
    }

    function A(e) {
        var t = mt, n = en[e];
        return n || (n = k(e, t), "none" !== n && n || (Jt = (Jt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Jt[0].contentWindow || Jt[0].contentDocument).document, t.write(), t.close(), n = k(e, t), Jt.detach()), en[e] = n), n
    }

    function T(e, t) {
        return {
            get: function () {
                var n = e();
                return null != n ? n ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
            }
        }
    }

    function S(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), o = t, i = fn.length; i--;)if (t = fn[i] + n, t in e)return t;
        return o
    }

    function E(e, t) {
        for (var n, o, i, r = [], s = 0, a = e.length; a > s; s++)o = e[s], o.style && (r[s] = rt._data(o, "olddisplay"), n = o.style.display, t ? (r[s] || "none" !== n || (o.style.display = ""), "" === o.style.display && Nt(o) && (r[s] = rt._data(o, "olddisplay", A(o.nodeName)))) : r[s] || (i = Nt(o), (n && "none" !== n || !i) && rt._data(o, "olddisplay", i ? n : rt.css(o, "display"))));
        for (s = 0; a > s; s++)o = e[s], o.style && (t && "none" !== o.style.display && "" !== o.style.display || (o.style.display = t ? r[s] || "" : "none"));
        return e
    }

    function N(e, t, n) {
        var o = un.exec(t);
        return o ? Math.max(0, o[1] - (n || 0)) + (o[2] || "px") : t
    }

    function D(e, t, n, o, i) {
        for (var r = n === (o ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2)"margin" === n && (s += rt.css(e, n + Et[r], !0, i)), o ? ("content" === n && (s -= rt.css(e, "padding" + Et[r], !0, i)), "margin" !== n && (s -= rt.css(e, "border" + Et[r] + "Width", !0, i))) : (s += rt.css(e, "padding" + Et[r], !0, i), "padding" !== n && (s += rt.css(e, "border" + Et[r] + "Width", !0, i)));
        return s
    }

    function L(e, t, n) {
        var o = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, r = tn(e), s = ot.boxSizing() && "border-box" === rt.css(e, "boxSizing", !1, r);
        if (0 >= i || null == i) {
            if (i = nn(e, t, r), (0 > i || null == i) && (i = e.style[t]), rn.test(i))return i;
            o = s && (ot.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + D(e, t, n || (s ? "border" : "content"), o, r) + "px"
    }

    function j(e, t, n, o, i) {
        return new j.prototype.init(e, t, n, o, i)
    }

    function R() {
        return setTimeout(function () {
            mn = void 0
        }), mn = rt.now()
    }

    function I(e, t) {
        var n, o = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = Et[i], o["margin" + n] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function B(e, t, n) {
        for (var o, i = (wn[t] || []).concat(wn["*"]), r = 0, s = i.length; s > r; r++)if (o = i[r].call(n, t, e))return o
    }

    function P(e, t, n) {
        var o, i, r, s, a, l, c, u, d = this, h = {}, p = e.style, f = e.nodeType && Nt(e), m = rt._data(e, "fxshow");
        n.queue || (a = rt._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, d.always(function () {
            d.always(function () {
                a.unqueued--, rt.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = rt.css(e, "display"), u = A(e.nodeName), "none" === c && (c = u), "inline" === c && "none" === rt.css(e, "float") && (ot.inlineBlockNeedsLayout && "inline" !== u ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ot.shrinkWrapBlocks() || d.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (o in t)if (i = t[o], bn.exec(i)) {
            if (delete t[o], r = r || "toggle" === i, i === (f ? "hide" : "show")) {
                if ("show" !== i || !m || void 0 === m[o])continue;
                f = !0
            }
            h[o] = m && m[o] || rt.style(e, o)
        }
        if (!rt.isEmptyObject(h)) {
            m ? "hidden" in m && (f = m.hidden) : m = rt._data(e, "fxshow", {}), r && (m.hidden = !f), f ? rt(e).show() : d.done(function () {
                rt(e).hide()
            }), d.done(function () {
                var t;
                rt._removeData(e, "fxshow");
                for (t in h)rt.style(e, t, h[t])
            });
            for (o in h)s = B(f ? m[o] : 0, o, d), o in m || (m[o] = s.start, f && (s.end = s.start, s.start = "width" === o || "height" === o ? 1 : 0))
        }
    }

    function M(e, t) {
        var n, o, i, r, s;
        for (n in e)if (o = rt.camelCase(n), i = t[o], r = e[n], rt.isArray(r) && (i = r[1], r = e[n] = r[0]), n !== o && (e[o] = r, delete e[n]), s = rt.cssHooks[o], s && "expand" in s) {
            r = s.expand(r), delete e[o];
            for (n in r)n in e || (e[n] = r[n], t[n] = i)
        } else t[o] = i
    }

    function O(e, t, n) {
        var o, i, r = 0, s = _n.length, a = rt.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (i)return !1;
            for (var t = mn || R(), n = Math.max(0, c.startTime + c.duration - t), o = n / c.duration || 0, r = 1 - o, s = 0, l = c.tweens.length; l > s; s++)c.tweens[s].run(r);
            return a.notifyWith(e, [c, r, n]), 1 > r && l ? n : (a.resolveWith(e, [c]), !1)
        }, c = a.promise({
            elem: e,
            props: rt.extend({}, t),
            opts: rt.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: mn || R(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var o = rt.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(o), o
            },
            stop: function (t) {
                var n = 0, o = t ? c.tweens.length : 0;
                if (i)return this;
                for (i = !0; o > n; n++)c.tweens[n].run(1);
                return t ? a.resolveWith(e, [c, t]) : a.rejectWith(e, [c, t]), this
            }
        }), u = c.props;
        for (M(u, c.opts.specialEasing); s > r; r++)if (o = _n[r].call(c, e, u, c.opts))return o;
        return rt.map(u, B, c), rt.isFunction(c.opts.start) && c.opts.start.call(e, c), rt.fx.timer(rt.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function F(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var o, i = 0, r = t.toLowerCase().match(_t) || [];
            if (rt.isFunction(n))for (; o = r[i++];)"+" === o.charAt(0) ? (o = o.slice(1) || "*", (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n)
        }
    }

    function H(e, t, n, o) {
        function i(a) {
            var l;
            return r[a] = !0, rt.each(e[a] || [], function (e, a) {
                var c = a(t, n, o);
                return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
            }), l
        }

        var r = {}, s = e === Un;
        return i(t.dataTypes[0]) || !r["*"] && i("*")
    }

    function q(e, t) {
        var n, o, i = rt.ajaxSettings.flatOptions || {};
        for (o in t)void 0 !== t[o] && ((i[o] ? e : n || (n = {}))[o] = t[o]);
        return n && rt.extend(!0, e, n), e
    }

    function z(e, t, n) {
        for (var o, i, r, s, a = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)for (s in a)if (a[s] && a[s].test(i)) {
            l.unshift(s);
            break
        }
        if (l[0] in n) r = l[0]; else {
            for (s in n) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    r = s;
                    break
                }
                o || (o = s)
            }
            r = r || o
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }

    function W(e, t, n, o) {
        var i, r, s, a, l, c = {}, u = e.dataTypes.slice();
        if (u[1])for (s in e.converters)c[s.toLowerCase()] = e.converters[s];
        for (r = u.shift(); r;)if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())if ("*" === r) r = l; else if ("*" !== l && l !== r) {
            if (s = c[l + " " + r] || c["* " + r], !s)for (i in c)if (a = i.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                s === !0 ? s = c[i] : c[i] !== !0 && (r = a[0], u.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"]) t = s(t); else try {
                t = s(t)
            } catch (d) {
                return {state: "parsererror", error: s ? d : "No conversion from " + l + " to " + r}
            }
        }
        return {state: "success", data: t}
    }

    function Q(e, t, n, o) {
        var i;
        if (rt.isArray(t)) rt.each(t, function (t, i) {
            n || Xn.test(e) ? o(e, i) : Q(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, o)
        }); else if (n || "object" !== rt.type(t)) o(e, t); else for (i in t)Q(e + "[" + i + "]", t[i], n, o)
    }

    function U() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function $() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function V(e) {
        return rt.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var G = [], X = G.slice, K = G.concat, Y = G.push, Z = G.indexOf, J = {}, et = J.toString, tt = J.hasOwnProperty, nt = "".trim, ot = {}, it = "1.11.0", rt = function (e, t) {
        return new rt.fn.init(e, t)
    }, st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, at = /^-ms-/, lt = /-([\da-z])/gi, ct = function (e, t) {
        return t.toUpperCase()
    };
    rt.fn = rt.prototype = {
        jquery: it, constructor: rt, selector: "", length: 0, toArray: function () {
            return X.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : X.call(this)
        }, pushStack: function (e) {
            var t = rt.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return rt.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(rt.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(X.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Y, sort: G.sort, splice: G.splice
    }, rt.extend = rt.fn.extend = function () {
        var e, t, n, o, i, r, s = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || rt.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)if (null != (i = arguments[a]))for (o in i)e = s[o], n = i[o], s !== n && (c && n && (rt.isPlainObject(n) || (t = rt.isArray(n))) ? (t ? (t = !1, r = e && rt.isArray(e) ? e : []) : r = e && rt.isPlainObject(e) ? e : {}, s[o] = rt.extend(c, r, n)) : void 0 !== n && (s[o] = n));
        return s
    }, rt.extend({
        expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === rt.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === rt.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return e - parseFloat(e) >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== rt.type(e) || e.nodeType || rt.isWindow(e))return !1;
            try {
                if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (ot.ownLast)for (t in e)return tt.call(e, t);
            for (t in e);
            return void 0 === t || tt.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? J[et.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && rt.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(at, "ms-").replace(lt, ct)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, o) {
            var i, r = 0, s = e.length, a = n(e);
            if (o) {
                if (a)for (; s > r && (i = t.apply(e[r], o), i !== !1); r++); else for (r in e)if (i = t.apply(e[r], o), i === !1)break
            } else if (a)for (; s > r && (i = t.call(e[r], r, e[r]), i !== !1); r++); else for (r in e)if (i = t.call(e[r], r, e[r]), i === !1)break;
            return e
        }, trim: nt && !nt.call("\ufeff\xa0") ? function (e) {
            return null == e ? "" : nt.call(e)
        } : function (e) {
            return null == e ? "" : (e + "").replace(st, "")
        }, makeArray: function (e, t) {
            var o = t || [];
            return null != e && (n(Object(e)) ? rt.merge(o, "string" == typeof e ? [e] : e) : Y.call(o, e)), o
        }, inArray: function (e, t, n) {
            var o;
            if (t) {
                if (Z)return Z.call(t, e, n);
                for (o = t.length, n = n ? 0 > n ? Math.max(0, o + n) : n : 0; o > n; n++)if (n in t && t[n] === e)return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, o = 0, i = e.length; n > o;)e[i++] = t[o++];
            if (n !== n)for (; void 0 !== t[o];)e[i++] = t[o++];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var o, i = [], r = 0, s = e.length, a = !n; s > r; r++)o = !t(e[r], r), o !== a && i.push(e[r]);
            return i
        }, map: function (e, t, o) {
            var i, r = 0, s = e.length, a = n(e), l = [];
            if (a)for (; s > r; r++)i = t(e[r], r, o), null != i && l.push(i); else for (r in e)i = t(e[r], r, o), null != i && l.push(i);
            return K.apply([], l)
        }, guid: 1, proxy: function (e, t) {
            var n, o, i;
            return "string" == typeof t && (i = e[t], t = e, e = i), rt.isFunction(e) ? (n = X.call(arguments, 2), o = function () {
                return e.apply(t || this, n.concat(X.call(arguments)))
            }, o.guid = e.guid = e.guid || rt.guid++, o) : void 0
        }, now: function () {
            return +new Date
        }, support: ot
    }), rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        J["[object " + t + "]"] = t.toLowerCase()
    });
    var ut = function (e) {
        function t(e, t, n, o) {
            var i, r, s, a, l, c, d, f, m, g;
            if ((t ? t.ownerDocument || t : H) !== j && L(t), t = t || j, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (a = t.nodeType) && 9 !== a)return [];
            if (I && !o) {
                if (i = yt.exec(e))if (s = i[1]) {
                    if (9 === a) {
                        if (r = t.getElementById(s), !r || !r.parentNode)return n;
                        if (r.id === s)return n.push(r), n
                    } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && O(t, r) && r.id === s)return n.push(r), n
                } else {
                    if (i[2])return J.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = i[3]) && C.getElementsByClassName && t.getElementsByClassName)return J.apply(n, t.getElementsByClassName(s)), n
                }
                if (C.qsa && (!B || !B.test(e))) {
                    if (f = d = F, m = t, g = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (c = h(e), (d = t.getAttribute("id")) ? f = d.replace(_t, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;)c[l] = f + p(c[l]);
                        m = vt.test(e) && u(t.parentNode) || t, g = c.join(",")
                    }
                    if (g)try {
                        return J.apply(n, m.querySelectorAll(g)), n
                    } catch (b) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return w(e.replace(lt, "$1"), t, n, o)
        }

        function n() {
            function e(n, o) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = o
            }

            var t = [];
            return e
        }

        function o(e) {
            return e[F] = !0, e
        }

        function i(e) {
            var t = j.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), o = e.length; o--;)k.attrHandle[n[o]] = t
        }

        function s(e, t) {
            var n = t && e, o = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
            if (o)return o;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return o(function (t) {
                return t = +t, o(function (n, o) {
                    for (var i, r = e([], n.length, t), s = r.length; s--;)n[i = r[s]] && (n[i] = !(o[i] = n[i]))
                })
            })
        }

        function u(e) {
            return e && typeof e.getElementsByTagName !== V && e
        }

        function d() {
        }

        function h(e, n) {
            var o, i, r, s, a, l, c, u = Q[e + " "];
            if (u)return n ? 0 : u.slice(0);
            for (a = e, l = [], c = k.preFilter; a;) {
                (!o || (i = ct.exec(a))) && (i && (a = a.slice(i[0].length) || a), l.push(r = [])), o = !1, (i = ut.exec(a)) && (o = i.shift(), r.push({
                    value: o,
                    type: i[0].replace(lt, " ")
                }), a = a.slice(o.length));
                for (s in k.filter)!(i = ft[s].exec(a)) || c[s] && !(i = c[s](i)) || (o = i.shift(), r.push({
                    value: o,
                    type: s,
                    matches: i
                }), a = a.slice(o.length));
                if (!o)break
            }
            return n ? a.length : a ? t.error(e) : Q(e, l).slice(0)
        }

        function p(e) {
            for (var t = 0, n = e.length, o = ""; n > t; t++)o += e[t].value;
            return o
        }

        function f(e, t, n) {
            var o = t.dir, i = n && "parentNode" === o, r = z++;
            return t.first ? function (t, n, r) {
                for (; t = t[o];)if (1 === t.nodeType || i)return e(t, n, r)
            } : function (t, n, s) {
                var a, l, c = [q, r];
                if (s) {
                    for (; t = t[o];)if ((1 === t.nodeType || i) && e(t, n, s))return !0
                } else for (; t = t[o];)if (1 === t.nodeType || i) {
                    if (l = t[F] || (t[F] = {}), (a = l[o]) && a[0] === q && a[1] === r)return c[2] = a[2];
                    if (l[o] = c, c[2] = e(t, n, s))return !0
                }
            }
        }

        function m(e) {
            return e.length > 1 ? function (t, n, o) {
                for (var i = e.length; i--;)if (!e[i](t, n, o))return !1;
                return !0
            } : e[0]
        }

        function g(e, t, n, o, i) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (!n || n(r, o, i)) && (s.push(r), c && t.push(a));
            return s
        }

        function b(e, t, n, i, r, s) {
            return i && !i[F] && (i = b(i)), r && !r[F] && (r = b(r, s)), o(function (o, s, a, l) {
                var c, u, d, h = [], p = [], f = s.length, m = o || _(t || "*", a.nodeType ? [a] : a, []), b = !e || !o && t ? m : g(m, h, e, a, l), y = n ? r || (o ? e : f || i) ? [] : s : b;
                if (n && n(b, y, a, l), i)for (c = g(y, p), i(c, [], a, l), u = c.length; u--;)(d = c[u]) && (y[p[u]] = !(b[p[u]] = d));
                if (o) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = y.length; u--;)(d = y[u]) && c.push(b[u] = d);
                            r(null, y = [], c, l)
                        }
                        for (u = y.length; u--;)(d = y[u]) && (c = r ? tt.call(o, d) : h[u]) > -1 && (o[c] = !(s[c] = d))
                    }
                } else y = g(y === s ? y.splice(f, y.length) : y), r ? r(null, s, y, l) : J.apply(s, y)
            })
        }

        function y(e) {
            for (var t, n, o, i = e.length, r = k.relative[e[0].type], s = r || k.relative[" "], a = r ? 1 : 0, l = f(function (e) {
                return e === t
            }, s, !0), c = f(function (e) {
                return tt.call(t, e) > -1
            }, s, !0), u = [function (e, n, o) {
                return !r && (o || n !== E) || ((t = n).nodeType ? l(e, n, o) : c(e, n, o))
            }]; i > a; a++)if (n = k.relative[e[a].type]) u = [f(m(u), n)]; else {
                if (n = k.filter[e[a].type].apply(null, e[a].matches), n[F]) {
                    for (o = ++a; i > o && !k.relative[e[o].type]; o++);
                    return b(a > 1 && m(u), a > 1 && p(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(lt, "$1"), n, o > a && y(e.slice(a, o)), i > o && y(e = e.slice(o)), i > o && p(e))
                }
                u.push(n)
            }
            return m(u)
        }

        function v(e, n) {
            var i = n.length > 0, r = e.length > 0, s = function (o, s, a, l, c) {
                var u, d, h, p = 0, f = "0", m = o && [], b = [], y = E, v = o || r && k.find.TAG("*", c), _ = q += null == y ? 1 : Math.random() || .1, w = v.length;
                for (c && (E = s !== j && s); f !== w && null != (u = v[f]); f++) {
                    if (r && u) {
                        for (d = 0; h = e[d++];)if (h(u, s, a)) {
                            l.push(u);
                            break
                        }
                        c && (q = _)
                    }
                    i && ((u = !h && u) && p--, o && m.push(u))
                }
                if (p += f, i && f !== p) {
                    for (d = 0; h = n[d++];)h(m, b, s, a);
                    if (o) {
                        if (p > 0)for (; f--;)m[f] || b[f] || (b[f] = Y.call(l));
                        b = g(b)
                    }
                    J.apply(l, b), c && !o && b.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return c && (q = _, E = y), m
            };
            return i ? o(s) : s
        }

        function _(e, n, o) {
            for (var i = 0, r = n.length; r > i; i++)t(e, n[i], o);
            return o
        }

        function w(e, t, n, o) {
            var i, r, s, a, l, c = h(e);
            if (!o && 1 === c.length) {
                if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && C.getById && 9 === t.nodeType && I && k.relative[r[1].type]) {
                    if (t = (k.find.ID(s.matches[0].replace(wt, xt), t) || [])[0], !t)return n;
                    e = e.slice(r.shift().value.length)
                }
                for (i = ft.needsContext.test(e) ? 0 : r.length; i-- && (s = r[i], !k.relative[a = s.type]);)if ((l = k.find[a]) && (o = l(s.matches[0].replace(wt, xt), vt.test(r[0].type) && u(t.parentNode) || t))) {
                    if (r.splice(i, 1), e = o.length && p(r), !e)return J.apply(n, o), n;
                    break
                }
            }
            return S(e, c)(o, t, !I, n, vt.test(e) && u(t.parentNode) || t), n
        }

        var x, C, k, A, T, S, E, N, D, L, j, R, I, B, P, M, O, F = "sizzle" + -new Date, H = e.document, q = 0, z = 0, W = n(), Q = n(), U = n(), $ = function (e, t) {
            return e === t && (D = !0), 0
        }, V = "undefined", G = 1 << 31, X = {}.hasOwnProperty, K = [], Y = K.pop, Z = K.push, J = K.push, et = K.slice, tt = K.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return -1
            }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ot = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", rt = it.replace("w", "w#"), st = "\\[" + ot + "*(" + it + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + rt + ")|)|)" + ot + "*\\]", at = ":(" + it + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)", lt = new RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"), ct = new RegExp("^" + ot + "*," + ot + "*"), ut = new RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"), dt = new RegExp("=" + ot + "*([^\\]'\"]*?)" + ot + "*\\]", "g"), ht = new RegExp(at), pt = new RegExp("^" + rt + "$"), ft = {
            ID: new RegExp("^#(" + it + ")"),
            CLASS: new RegExp("^\\.(" + it + ")"),
            TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + st),
            PSEUDO: new RegExp("^" + at),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + nt + ")$", "i"),
            needsContext: new RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
        }, mt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, bt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, vt = /[+~]/, _t = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"), xt = function (e, t, n) {
            var o = "0x" + t - 65536;
            return o !== o || n ? t : 0 > o ? String.fromCharCode(o + 65536) : String.fromCharCode(o >> 10 | 55296, 1023 & o | 56320)
        };
        try {
            J.apply(K = et.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType
        } catch (Ct) {
            J = {
                apply: K.length ? function (e, t) {
                    Z.apply(e, et.call(t))
                } : function (e, t) {
                    for (var n = e.length, o = 0; e[n++] = t[o++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, T = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, L = t.setDocument = function (e) {
            var t, n = e ? e.ownerDocument || e : H, o = n.defaultView;
            return n !== j && 9 === n.nodeType && n.documentElement ? (j = n, R = n.documentElement, I = !T(n), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function () {
                L()
            }, !1) : o.attachEvent && o.attachEvent("onunload", function () {
                L()
            })), C.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = i(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = bt.test(n.getElementsByClassName) && i(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), C.getById = i(function (e) {
                return R.appendChild(e).id = F, !n.getElementsByName || !n.getElementsByName(F).length
            }), C.getById ? (k.find.ID = function (e, t) {
                if (typeof t.getElementById !== V && I) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, k.filter.ID = function (e) {
                var t = e.replace(wt, xt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function (e) {
                var t = e.replace(wt, xt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = C.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, o = [], i = 0, r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[i++];)1 === n.nodeType && o.push(n);
                    return o
                }
                return r
            }, k.find.CLASS = C.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== V && I ? t.getElementsByClassName(e) : void 0
                }, P = [], B = [], (C.qsa = bt.test(n.querySelectorAll)) && (i(function (e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && B.push("[*^$]=" + ot + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || B.push("\\[" + ot + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || B.push(":checked")
            }), i(function (e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && B.push("name" + ot + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || B.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), B.push(",.*:")
            })), (C.matchesSelector = bt.test(M = R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && i(function (e) {
                C.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), P.push("!=", at)
            }), B = B.length && new RegExp(B.join("|")), P = P.length && new RegExp(P.join("|")), t = bt.test(R.compareDocumentPosition), O = t || bt.test(R.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, o = t && t.parentNode;
                return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, $ = t ? function (e, t) {
                if (e === t)return D = !0, 0;
                var o = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return o ? o : (o = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & o || !C.sortDetached && t.compareDocumentPosition(e) === o ? e === n || e.ownerDocument === H && O(H, e) ? -1 : t === n || t.ownerDocument === H && O(H, t) ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0 : 4 & o ? -1 : 1)
            } : function (e, t) {
                if (e === t)return D = !0, 0;
                var o, i = 0, r = e.parentNode, a = t.parentNode, l = [e], c = [t];
                if (!r || !a)return e === n ? -1 : t === n ? 1 : r ? -1 : a ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0;
                if (r === a)return s(e, t);
                for (o = e; o = o.parentNode;)l.unshift(o);
                for (o = t; o = o.parentNode;)c.unshift(o);
                for (; l[i] === c[i];)i++;
                return i ? s(l[i], c[i]) : l[i] === H ? -1 : c[i] === H ? 1 : 0
            }, n) : j
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== j && L(e), n = n.replace(dt, "='$1']"), !(!C.matchesSelector || !I || P && P.test(n) || B && B.test(n)))try {
                var o = M.call(e, n);
                if (o || C.disconnectedMatch || e.document && 11 !== e.document.nodeType)return o
            } catch (i) {
            }
            return t(n, j, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== j && L(e), O(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== j && L(e);
            var n = k.attrHandle[t.toLowerCase()], o = n && X.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
            return void 0 !== o ? o : C.attributes || !I ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], o = 0, i = 0;
            if (D = !C.detectDuplicates, N = !C.sortStable && e.slice(0), e.sort($), D) {
                for (; t = e[i++];)t === e[i] && (o = n.push(i));
                for (; o--;)e.splice(n[o], 1)
            }
            return N = null, e
        }, A = t.getText = function (e) {
            var t, n = "", o = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += A(e)
                } else if (3 === i || 4 === i)return e.nodeValue
            } else for (; t = e[o++];)n += A(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: o,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(wt, xt), e[3] = (e[4] || e[5] || "").replace(wt, xt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[5] && e[2];
                    return ft.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && ht.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(wt, xt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ot + ")" + e + "(" + ot + "|$)")) && W(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, o) {
                    return function (i) {
                        var r = t.attr(i, e);
                        return null == r ? "!=" === n : n ? (r += "", "=" === n ? r === o : "!=" === n ? r !== o : "^=" === n ? o && 0 === r.indexOf(o) : "*=" === n ? o && r.indexOf(o) > -1 : "$=" === n ? o && r.slice(-o.length) === o : "~=" === n ? (" " + r + " ").indexOf(o) > -1 : "|=" === n ? r === o || r.slice(0, o.length + 1) === o + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, o, i) {
                    var r = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === o && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var c, u, d, h, p, f, m = r !== s ? "nextSibling" : "previousSibling", g = t.parentNode, b = a && t.nodeName.toLowerCase(), y = !l && !a;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (d = t; d = d[m];)if (a ? d.nodeName.toLowerCase() === b : 1 === d.nodeType)return !1;
                                    f = m = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [s ? g.firstChild : g.lastChild], s && y) {
                                for (u = g[F] || (g[F] = {}), c = u[e] || [], p = c[0] === q && c[1], h = c[0] === q && c[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (h = p = 0) || f.pop();)if (1 === d.nodeType && ++h && d === t) {
                                    u[e] = [q, p, h];
                                    break
                                }
                            } else if (y && (c = (t[F] || (t[F] = {}))[e]) && c[0] === q) h = c[1]; else for (; (d = ++p && d && d[m] || (h = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== b : 1 !== d.nodeType) || !++h || (y && ((d[F] || (d[F] = {}))[e] = [q, h]), d !== t)););
                            return h -= i, h === o || h % o === 0 && h / o >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var i, r = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[F] ? r(n) : r.length > 1 ? (i = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function (e, t) {
                        for (var o, i = r(e, n), s = i.length; s--;)o = tt.call(e, i[s]), e[o] = !(t[o] = i[s])
                    }) : function (e) {
                        return r(e, 0, i)
                    }) : r
                }
            },
            pseudos: {
                not: o(function (e) {
                    var t = [], n = [], i = S(e.replace(lt, "$1"));
                    return i[F] ? o(function (e, t, n, o) {
                        for (var r, s = i(e, null, o, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                    }) : function (e, o, r) {
                        return t[0] = e, i(t, null, r, n), !n.pop()
                    }
                }), has: o(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: o(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || A(t)).indexOf(e) > -1
                    }
                }), lang: o(function (e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, xt).toLowerCase(), function (t) {
                        var n;
                        do if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === R
                }, focus: function (e) {
                    return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !k.pseudos.empty(e)
                }, header: function (e) {
                    return gt.test(e.nodeName)
                }, input: function (e) {
                    return mt.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: c(function () {
                    return [0]
                }), last: c(function (e, t) {
                    return [t - 1]
                }), eq: c(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: c(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: c(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: c(function (e, t, n) {
                    for (var o = 0 > n ? n + t : n; --o >= 0;)e.push(o);
                    return e
                }), gt: c(function (e, t, n) {
                    for (var o = 0 > n ? n + t : n; ++o < t;)e.push(o);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})k.pseudos[x] = a(x);
        for (x in{submit: !0, reset: !0})k.pseudos[x] = l(x);
        return d.prototype = k.filters = k.pseudos, k.setFilters = new d, S = t.compile = function (e, t) {
            var n, o = [], i = [], r = U[e + " "];
            if (!r) {
                for (t || (t = h(e)), n = t.length; n--;)r = y(t[n]), r[F] ? o.push(r) : i.push(r);
                r = U(e, v(i, o))
            }
            return r
        }, C.sortStable = F.split("").sort($).join("") === F, C.detectDuplicates = !!D, L(), C.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(j.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || r(nt, function (e, t, n) {
            var o;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }), t
    }(e);
    rt.find = ut, rt.expr = ut.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = ut.uniqueSort, rt.text = ut.getText, rt.isXMLDoc = ut.isXML, rt.contains = ut.contains;
    var dt = rt.expr.match.needsContext, ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pt = /^.[^:#\[\.,]*$/;
    rt.filter = function (e, t, n) {
        var o = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === o.nodeType ? rt.find.matchesSelector(o, e) ? [o] : [] : rt.find.matches(e, rt.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, rt.fn.extend({
        find: function (e) {
            var t, n = [], o = this, i = o.length;
            if ("string" != typeof e)return this.pushStack(rt(e).filter(function () {
                for (t = 0; i > t; t++)if (rt.contains(o[t], this))return !0
            }));
            for (t = 0; i > t; t++)rt.find(e, o[t], n);
            return n = this.pushStack(i > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(o(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(o(this, e || [], !0))
        }, is: function (e) {
            return !!o(this, "string" == typeof e && dt.test(e) ? rt(e) : e || [], !1).length
        }
    });
    var ft, mt = e.document, gt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, bt = rt.fn.init = function (e, t) {
        var n, o;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : gt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ft).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof rt ? t[0] : t, rt.merge(this, rt.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : mt, !0)), ht.test(n[1]) && rt.isPlainObject(t))for (n in t)rt.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (o = mt.getElementById(n[2]), o && o.parentNode) {
                if (o.id !== n[2])return ft.find(e);
                this.length = 1, this[0] = o
            }
            return this.context = mt, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : rt.isFunction(e) ? "undefined" != typeof ft.ready ? ft.ready(e) : e(rt) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), rt.makeArray(e, this))
    };
    bt.prototype = rt.fn, ft = rt(mt);
    var yt = /^(?:parents|prev(?:Until|All))/, vt = {children: !0, contents: !0, next: !0, prev: !0};
    rt.extend({
        dir: function (e, t, n) {
            for (var o = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !rt(i).is(n));)1 === i.nodeType && o.push(i), i = i[t];
            return o
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), rt.fn.extend({
        has: function (e) {
            var t, n = rt(e, this), o = n.length;
            return this.filter(function () {
                for (t = 0; o > t; t++)if (rt.contains(this, n[t]))return !0
            })
        }, closest: function (e, t) {
            for (var n, o = 0, i = this.length, r = [], s = dt.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; i > o; o++)for (n = this[o]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
                r.push(n);
                break
            }
            return this.pushStack(r.length > 1 ? rt.unique(r) : r)
        }, index: function (e) {
            return e ? "string" == typeof e ? rt.inArray(this[0], rt(e)) : rt.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(rt.unique(rt.merge(this.get(), rt(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), rt.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return rt.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return rt.dir(e, "parentNode", n)
        }, next: function (e) {
            return i(e, "nextSibling")
        }, prev: function (e) {
            return i(e, "previousSibling")
        }, nextAll: function (e) {
            return rt.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return rt.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return rt.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return rt.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return rt.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return rt.sibling(e.firstChild)
        }, contents: function (e) {
            return rt.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : rt.merge([], e.childNodes)
        }
    }, function (e, t) {
        rt.fn[e] = function (n, o) {
            var i = rt.map(this, t, n);
            return "Until" !== e.slice(-5) && (o = n), o && "string" == typeof o && (i = rt.filter(o, i)), this.length > 1 && (vt[e] || (i = rt.unique(i)), yt.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var _t = /\S+/g, wt = {};
    rt.Callbacks = function (e) {
        e = "string" == typeof e ? wt[e] || r(e) : rt.extend({}, e);
        var t, n, o, i, s, a, l = [], c = !e.once && [], u = function (r) {
            for (n = e.memory && r, o = !0, s = a || 0, a = 0, i = l.length, t = !0; l && i > s; s++)if (l[s].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, l && (c ? c.length && u(c.shift()) : n ? l = [] : d.disable())
        }, d = {
            add: function () {
                if (l) {
                    var o = l.length;
                    !function r(t) {
                        rt.each(t, function (t, n) {
                            var o = rt.type(n);
                            "function" === o ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== o && r(n)
                        })
                    }(arguments), t ? i = l.length : n && (a = o, u(n))
                }
                return this
            }, remove: function () {
                return l && rt.each(arguments, function (e, n) {
                    for (var o; (o = rt.inArray(n, l, o)) > -1;)l.splice(o, 1), t && (i >= o && i--, s >= o && s--)
                }), this
            }, has: function (e) {
                return e ? rt.inArray(e, l) > -1 : !(!l || !l.length)
            }, empty: function () {
                return l = [], i = 0, this
            }, disable: function () {
                return l = c = n = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return c = void 0, n || d.disable(), this
            }, locked: function () {
                return !c
            }, fireWith: function (e, n) {
                return !l || o && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : u(n)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!o
            }
        };
        return d
    }, rt.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", rt.Callbacks("once memory"), "resolved"], ["reject", "fail", rt.Callbacks("once memory"), "rejected"], ["notify", "progress", rt.Callbacks("memory")]], n = "pending", o = {
                state: function () {
                    return n
                }, always: function () {
                    return i.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return rt.Deferred(function (n) {
                        rt.each(t, function (t, r) {
                            var s = rt.isFunction(e[t]) && e[t];
                            i[r[1]](function () {
                                var e = s && s.apply(this, arguments);
                                e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === o ? n.promise() : this, s ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? rt.extend(e, o) : o
                }
            }, i = {};
            return o.pipe = o.then, rt.each(t, function (e, r) {
                var s = r[2], a = r[3];
                o[r[1]] = s.add, a && s.add(function () {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[r[0]] = function () {
                    return i[r[0] + "With"](this === i ? o : this, arguments), this
                }, i[r[0] + "With"] = s.fireWith
            }), o.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t, n, o, i = 0, r = X.call(arguments), s = r.length, a = 1 !== s || e && rt.isFunction(e.promise) ? s : 0, l = 1 === a ? e : rt.Deferred(), c = function (e, n, o) {
                return function (i) {
                    n[e] = this, o[e] = arguments.length > 1 ? X.call(arguments) : i, o === t ? l.notifyWith(n, o) : --a || l.resolveWith(n, o)
                }
            };
            if (s > 1)for (t = new Array(s), n = new Array(s), o = new Array(s); s > i; i++)r[i] && rt.isFunction(r[i].promise) ? r[i].promise().done(c(i, o, r)).fail(l.reject).progress(c(i, n, t)) : --a;
            return a || l.resolveWith(o, r), l.promise()
        }
    });
    var xt;
    rt.fn.ready = function (e) {
        return rt.ready.promise().done(e), this
    }, rt.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? rt.readyWait++ : rt.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--rt.readyWait : !rt.isReady) {
                if (!mt.body)return setTimeout(rt.ready);
                rt.isReady = !0, e !== !0 && --rt.readyWait > 0 || (xt.resolveWith(mt, [rt]), rt.fn.trigger && rt(mt).trigger("ready").off("ready"))
            }
        }
    }), rt.ready.promise = function (t) {
        if (!xt)if (xt = rt.Deferred(), "complete" === mt.readyState) setTimeout(rt.ready); else if (mt.addEventListener) mt.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1); else {
            mt.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
            var n = !1;
            try {
                n = null == e.frameElement && mt.documentElement
            } catch (o) {
            }
            n && n.doScroll && !function i() {
                if (!rt.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    s(), rt.ready()
                }
            }()
        }
        return xt.promise(t)
    };
    var Ct, kt = "undefined";
    for (Ct in rt(ot))break;
    ot.ownLast = "0" !== Ct, ot.inlineBlockNeedsLayout = !1, rt(function () {
        var e, t, n = mt.getElementsByTagName("body")[0];
        n && (e = mt.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = mt.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== kt && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (ot.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
    }), function () {
        var e = mt.createElement("div");
        if (null == ot.deleteExpando) {
            ot.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                ot.deleteExpando = !1
            }
        }
        e = null
    }(), rt.acceptData = function (e) {
        var t = rt.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var At = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Tt = /([A-Z])/g;
    rt.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return e = e.nodeType ? rt.cache[e[rt.expando]] : e[rt.expando], !!e && !c(e)
        },
        data: function (e, t, n) {
            return u(e, t, n)
        },
        removeData: function (e, t) {
            return d(e, t)
        },
        _data: function (e, t, n) {
            return u(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return d(e, t, !0)
        }
    }), rt.fn.extend({
        data: function (e, t) {
            var n, o, i, r = this[0], s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (i = rt.data(r), 1 === r.nodeType && !rt._data(r, "parsedAttrs"))) {
                    for (n = s.length; n--;)o = s[n].name, 0 === o.indexOf("data-") && (o = rt.camelCase(o.slice(5)), l(r, o, i[o]));
                    rt._data(r, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                rt.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                rt.data(this, e, t)
            }) : r ? l(r, e, rt.data(r, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                rt.removeData(this, e)
            })
        }
    }), rt.extend({
        queue: function (e, t, n) {
            var o;
            return e ? (t = (t || "fx") + "queue", o = rt._data(e, t), n && (!o || rt.isArray(n) ? o = rt._data(e, t, rt.makeArray(n)) : o.push(n)), o || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = rt.queue(e, t), o = n.length, i = n.shift(), r = rt._queueHooks(e, t), s = function () {
                rt.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), o--), i && ("fx" === t && n.unshift("inprogress"), delete r.stop, i.call(e, s, r)), !o && r && r.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return rt._data(e, n) || rt._data(e, n, {
                    empty: rt.Callbacks("once memory").add(function () {
                        rt._removeData(e, t + "queue"), rt._removeData(e, n)
                    })
                })
        }
    }), rt.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? rt.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = rt.queue(this, e, t);
                rt._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && rt.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                rt.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, o = 1, i = rt.Deferred(), r = this, s = this.length, a = function () {
                --o || i.resolveWith(r, [r])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)n = rt._data(r[s], e + "queueHooks"), n && n.empty && (o++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var St = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Et = ["Top", "Right", "Bottom", "Left"], Nt = function (e, t) {
        return e = t || e, "none" === rt.css(e, "display") || !rt.contains(e.ownerDocument, e)
    }, Dt = rt.access = function (e, t, n, o, i, r, s) {
        var a = 0, l = e.length, c = null == n;
        if ("object" === rt.type(n)) {
            i = !0;
            for (a in n)rt.access(e, t, a, n[a], !0, r, s)
        } else if (void 0 !== o && (i = !0, rt.isFunction(o) || (s = !0), c && (s ? (t.call(e, o), t = null) : (c = t, t = function (e, t, n) {
                return c.call(rt(e), n)
            })), t))for (; l > a; a++)t(e[a], n, s ? o : o.call(e[a], a, t(e[a], n)));
        return i ? e : c ? t.call(e) : l ? t(e[0], n) : r
    }, Lt = /^(?:checkbox|radio)$/i;
    !function () {
        var e = mt.createDocumentFragment(), t = mt.createElement("div"), n = mt.createElement("input");
        if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", ot.leadingWhitespace = 3 === t.firstChild.nodeType, ot.tbody = !t.getElementsByTagName("tbody").length, ot.htmlSerialize = !!t.getElementsByTagName("link").length, ot.html5Clone = "<:nav></:nav>" !== mt.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), ot.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", ot.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ot.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ot.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                ot.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == ot.deleteExpando) {
            ot.deleteExpando = !0;
            try {
                delete t.test
            } catch (o) {
                ot.deleteExpando = !1
            }
        }
        e = t = n = null
    }(), function () {
        var t, n, o = mt.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        })n = "on" + t, (ot[t + "Bubbles"] = n in e) || (o.setAttribute(n, "t"), ot[t + "Bubbles"] = o.attributes[n].expando === !1);
        o = null
    }();
    var jt = /^(?:input|select|textarea)$/i, Rt = /^key/, It = /^(?:mouse|contextmenu)|click/, Bt = /^(?:focusinfocus|focusoutblur)$/, Pt = /^([^.]*)(?:\.(.+)|)$/;
    rt.event = {
        global: {},
        add: function (e, t, n, o, i) {
            var r, s, a, l, c, u, d, h, p, f, m, g = rt._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = rt.guid++), (s = g.events) || (s = g.events = {}), (u = g.handle) || (u = g.handle = function (e) {
                    return typeof rt === kt || e && rt.event.triggered === e.type ? void 0 : rt.event.dispatch.apply(u.elem, arguments)
                }, u.elem = e), t = (t || "").match(_t) || [""], a = t.length; a--;)r = Pt.exec(t[a]) || [], p = m = r[1], f = (r[2] || "").split(".").sort(), p && (c = rt.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = rt.event.special[p] || {}, d = rt.extend({
                    type: p,
                    origType: m,
                    data: o,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && rt.expr.match.needsContext.test(i),
                    namespace: f.join(".")
                }, l), (h = s[p]) || (h = s[p] = [], h.delegateCount = 0, c.setup && c.setup.call(e, o, f, u) !== !1 || (e.addEventListener ? e.addEventListener(p, u, !1) : e.attachEvent && e.attachEvent("on" + p, u))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, d) : h.push(d), rt.event.global[p] = !0);
                e = null
            }
        },
        remove: function (e, t, n, o, i) {
            var r, s, a, l, c, u, d, h, p, f, m, g = rt.hasData(e) && rt._data(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(_t) || [""], c = t.length; c--;)if (a = Pt.exec(t[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                    for (d = rt.event.special[p] || {}, p = (o ? d.delegateType : d.bindType) || p, h = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = h.length; r--;)s = h[r], !i && m !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || o && o !== s.selector && ("**" !== o || !s.selector) || (h.splice(r, 1), s.selector && h.delegateCount--, d.remove && d.remove.call(e, s));
                    l && !h.length && (d.teardown && d.teardown.call(e, f, g.handle) !== !1 || rt.removeEvent(e, p, g.handle), delete u[p])
                } else for (p in u)rt.event.remove(e, p + t[c], n, o, !0);
                rt.isEmptyObject(u) && (delete g.handle, rt._removeData(e, "events"))
            }
        },
        trigger: function (t, n, o, i) {
            var r, s, a, l, c, u, d, h = [o || mt], p = tt.call(t, "type") ? t.type : t, f = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = o = o || mt, 3 !== o.nodeType && 8 !== o.nodeType && !Bt.test(p + rt.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), s = p.indexOf(":") < 0 && "on" + p, t = t[rt.expando] ? t : new rt.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = o), n = null == n ? [t] : rt.makeArray(n, [t]), c = rt.event.special[p] || {}, i || !c.trigger || c.trigger.apply(o, n) !== !1)) {
                if (!i && !c.noBubble && !rt.isWindow(o)) {
                    for (l = c.delegateType || p, Bt.test(l + p) || (a = a.parentNode); a; a = a.parentNode)h.push(a), u = a;
                    u === (o.ownerDocument || mt) && h.push(u.defaultView || u.parentWindow || e)
                }
                for (d = 0; (a = h[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? l : c.bindType || p, r = (rt._data(a, "events") || {})[t.type] && rt._data(a, "handle"), r && r.apply(a, n), r = s && a[s], r && r.apply && rt.acceptData(a) && (t.result = r.apply(a, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), n) === !1) && rt.acceptData(o) && s && o[p] && !rt.isWindow(o)) {
                    u = o[s], u && (o[s] = null), rt.event.triggered = p;
                    try {
                        o[p]()
                    } catch (m) {
                    }
                    rt.event.triggered = void 0, u && (o[s] = u)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = rt.event.fix(e);
            var t, n, o, i, r, s = [], a = X.call(arguments), l = (rt._data(this, "events") || {})[e.type] || [], c = rt.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (s = rt.event.handlers.call(this, e, l), t = 0; (i = s[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, r = 0; (o = i.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, n = ((rt.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, o, i, r, s = [], a = t.delegateCount, l = e.target;
            if (a && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (i = [], r = 0; a > r; r++)o = t[r], n = o.selector + " ", void 0 === i[n] && (i[n] = o.needsContext ? rt(n, this).index(l) >= 0 : rt.find(n, this, null, [l]).length), i[n] && i.push(o);
                i.length && s.push({elem: l, handlers: i})
            }
            return a < t.length && s.push({elem: this, handlers: t.slice(a)}), s
        },
        fix: function (e) {
            if (e[rt.expando])return e;
            var t, n, o, i = e.type, r = e, s = this.fixHooks[i];
            for (s || (this.fixHooks[i] = s = It.test(i) ? this.mouseHooks : Rt.test(i) ? this.keyHooks : {}), o = s.props ? this.props.concat(s.props) : this.props, e = new rt.Event(r), t = o.length; t--;)n = o[t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || mt), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, o, i, r = t.button, s = t.fromElement;
                return null == e.pageX && null != t.clientX && (o = e.target.ownerDocument || mt, i = o.documentElement, n = o.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== f() && this.focus)try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return rt.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, o) {
            var i = rt.extend(new rt.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            o ? rt.event.trigger(i, null, t) : rt.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, rt.removeEvent = mt.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var o = "on" + t;
        e.detachEvent && (typeof e[o] === kt && (e[o] = null), e.detachEvent(o, n))
    }, rt.Event = function (e, t) {
        return this instanceof rt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? h : p) : this.type = e, t && rt.extend(this, t), this.timeStamp = e && e.timeStamp || rt.now(), void(this[rt.expando] = !0)) : new rt.Event(e, t)
    }, rt.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = h, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = h, this.stopPropagation()
        }
    }, rt.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        rt.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, o = this, i = e.relatedTarget, r = e.handleObj;
                return (!i || i !== o && !rt.contains(o, i)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ot.submitBubbles || (rt.event.special.submit = {
        setup: function () {
            return rt.nodeName(this, "form") ? !1 : void rt.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = rt.nodeName(t, "input") || rt.nodeName(t, "button") ? t.form : void 0;
                n && !rt._data(n, "submitBubbles") && (rt.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), rt._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && rt.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return rt.nodeName(this, "form") ? !1 : void rt.event.remove(this, "._submit")
        }
    }), ot.changeBubbles || (rt.event.special.change = {
        setup: function () {
            return jt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rt.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), rt.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), rt.event.simulate("change", this, e, !0)
            })), !1) : void rt.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                jt.test(t.nodeName) && !rt._data(t, "changeBubbles") && (rt.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || rt.event.simulate("change", this.parentNode, e, !0)
                }), rt._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return rt.event.remove(this, "._change"), !jt.test(this.nodeName)
        }
    }), ot.focusinBubbles || rt.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            rt.event.simulate(t, e.target, rt.event.fix(e), !0)
        };
        rt.event.special[t] = {
            setup: function () {
                var o = this.ownerDocument || this, i = rt._data(o, t);
                i || o.addEventListener(e, n, !0), rt._data(o, t, (i || 0) + 1)
            }, teardown: function () {
                var o = this.ownerDocument || this, i = rt._data(o, t) - 1;
                i ? rt._data(o, t, i) : (o.removeEventListener(e, n, !0), rt._removeData(o, t))
            }
        }
    }), rt.fn.extend({
        on: function (e, t, n, o, i) {
            var r, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (r in e)this.on(r, t, n, e[r], i);
                return this
            }
            if (null == n && null == o ? (o = t, n = t = void 0) : null == o && ("string" == typeof t ? (o = n, n = void 0) : (o = n, n = t, t = void 0)), o === !1) o = p; else if (!o)return this;
            return 1 === i && (s = o, o = function (e) {
                return rt().off(e), s.apply(this, arguments)
            }, o.guid = s.guid || (s.guid = rt.guid++)), this.each(function () {
                rt.event.add(this, e, o, n, t)
            })
        }, one: function (e, t, n, o) {
            return this.on(e, t, n, o, 1)
        }, off: function (e, t, n) {
            var o, i;
            if (e && e.preventDefault && e.handleObj)return o = e.handleObj, rt(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof e) {
                for (i in e)this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = p), this.each(function () {
                rt.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                rt.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? rt.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Mt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ot = / jQuery\d+="(?:null|\d+)"/g, Ft = new RegExp("<(?:" + Mt + ")[\\s/>]", "i"), Ht = /^\s+/, qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, zt = /<([\w:]+)/, Wt = /<tbody/i, Qt = /<|&#?\w+;/, Ut = /<(?:script|style|link)/i, $t = /checked\s*(?:[^=]|=\s*.checked.)/i, Vt = /^$|\/(?:java|ecma)script/i, Gt = /^true\/(.*)/, Xt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Kt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ot.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Yt = m(mt), Zt = Yt.appendChild(mt.createElement("div"));
    Kt.optgroup = Kt.option, Kt.tbody = Kt.tfoot = Kt.colgroup = Kt.caption = Kt.thead, Kt.th = Kt.td, rt.extend({
        clone: function (e, t, n) {
            var o, i, r, s, a, l = rt.contains(e.ownerDocument, e);
            if (ot.html5Clone || rt.isXMLDoc(e) || !Ft.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Zt.innerHTML = e.outerHTML, Zt.removeChild(r = Zt.firstChild)), !(ot.noCloneEvent && ot.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e)))for (o = g(r), a = g(e), s = 0; null != (i = a[s]); ++s)o[s] && C(i, o[s]);
            if (t)if (n)for (a = a || g(e), o = o || g(r), s = 0; null != (i = a[s]); s++)x(i, o[s]); else x(e, r);
            return o = g(r, "script"), o.length > 0 && w(o, !l && g(e, "script")), o = a = i = null, r
        }, buildFragment: function (e, t, n, o) {
            for (var i, r, s, a, l, c, u, d = e.length, h = m(t), p = [], f = 0; d > f; f++)if (r = e[f], r || 0 === r)if ("object" === rt.type(r)) rt.merge(p, r.nodeType ? [r] : r); else if (Qt.test(r)) {
                for (a = a || h.appendChild(t.createElement("div")), l = (zt.exec(r) || ["", ""])[1].toLowerCase(), u = Kt[l] || Kt._default, a.innerHTML = u[1] + r.replace(qt, "<$1></$2>") + u[2], i = u[0]; i--;)a = a.lastChild;
                if (!ot.leadingWhitespace && Ht.test(r) && p.push(t.createTextNode(Ht.exec(r)[0])), !ot.tbody)for (r = "table" !== l || Wt.test(r) ? "<table>" !== u[1] || Wt.test(r) ? 0 : a : a.firstChild, i = r && r.childNodes.length; i--;)rt.nodeName(c = r.childNodes[i], "tbody") && !c.childNodes.length && r.removeChild(c);
                for (rt.merge(p, a.childNodes), a.textContent = ""; a.firstChild;)a.removeChild(a.firstChild);
                a = h.lastChild
            } else p.push(t.createTextNode(r));
            for (a && h.removeChild(a), ot.appendChecked || rt.grep(g(p, "input"), b), f = 0; r = p[f++];)if ((!o || -1 === rt.inArray(r, o)) && (s = rt.contains(r.ownerDocument, r), a = g(h.appendChild(r), "script"), s && w(a), n))for (i = 0; r = a[i++];)Vt.test(r.type || "") && n.push(r);
            return a = null, h
        }, cleanData: function (e, t) {
            for (var n, o, i, r, s = 0, a = rt.expando, l = rt.cache, c = ot.deleteExpando, u = rt.event.special; null != (n = e[s]); s++)if ((t || rt.acceptData(n)) && (i = n[a], r = i && l[i])) {
                if (r.events)for (o in r.events)u[o] ? rt.event.remove(n, o) : rt.removeEvent(n, o, r.handle);
                l[i] && (delete l[i], c ? delete n[a] : typeof n.removeAttribute !== kt ? n.removeAttribute(a) : n[a] = null, G.push(i))
            }
        }
    }), rt.fn.extend({
        text: function (e) {
            return Dt(this, function (e) {
                return void 0 === e ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || mt).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, o = e ? rt.filter(e, this) : this, i = 0; null != (n = o[i]); i++)t || 1 !== n.nodeType || rt.cleanData(g(n)), n.parentNode && (t && rt.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && rt.cleanData(g(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                e.options && rt.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return rt.clone(this, e, t)
            })
        }, html: function (e) {
            return Dt(this, function (e) {
                var t = this[0] || {}, n = 0, o = this.length;
                if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Ot, "") : void 0;
                if (!("string" != typeof e || Ut.test(e) || !ot.htmlSerialize && Ft.test(e) || !ot.leadingWhitespace && Ht.test(e) || Kt[(zt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(qt, "<$1></$2>");
                    try {
                        for (; o > n; n++)t = this[n] || {}, 1 === t.nodeType && (rt.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, rt.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = K.apply([], e);
            var n, o, i, r, s, a, l = 0, c = this.length, u = this, d = c - 1, h = e[0], p = rt.isFunction(h);
            if (p || c > 1 && "string" == typeof h && !ot.checkClone && $t.test(h))return this.each(function (n) {
                var o = u.eq(n);
                p && (e[0] = h.call(this, n, o.html())), o.domManip(e, t)
            });
            if (c && (a = rt.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                for (r = rt.map(g(a, "script"), v), i = r.length; c > l; l++)o = a, l !== d && (o = rt.clone(o, !0, !0), i && rt.merge(r, g(o, "script"))), t.call(this[l], o, l);
                if (i)for (s = r[r.length - 1].ownerDocument, rt.map(r, _), l = 0; i > l; l++)o = r[l], Vt.test(o.type || "") && !rt._data(o, "globalEval") && rt.contains(s, o) && (o.src ? rt._evalUrl && rt._evalUrl(o.src) : rt.globalEval((o.text || o.textContent || o.innerHTML || "").replace(Xt, "")));
                a = n = null
            }
            return this
        }
    }), rt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        rt.fn[e] = function (e) {
            for (var n, o = 0, i = [], r = rt(e), s = r.length - 1; s >= o; o++)n = o === s ? this : this.clone(!0), rt(r[o])[t](n), Y.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Jt, en = {};
    !function () {
        var e, t, n = mt.createElement("div"), o = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", ot.opacity = /^0.5/.test(e.style.opacity), ot.cssFloat = !!e.style.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ot.clearCloneStyle = "content-box" === n.style.backgroundClip, e = n = null, ot.shrinkWrapBlocks = function () {
            var e, n, i, r;
            if (null == t) {
                if (e = mt.getElementsByTagName("body")[0], !e)return;
                r = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", n = mt.createElement("div"), i = mt.createElement("div"), e.appendChild(n).appendChild(i), t = !1, typeof i.style.zoom !== kt && (i.style.cssText = o + ";width:1px;padding:1px;zoom:1", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", t = 3 !== i.offsetWidth), e.removeChild(n), e = n = i = null
            }
            return t
        }
    }();
    var tn, nn, on = /^margin/, rn = new RegExp("^(" + St + ")(?!px)[a-z%]+$", "i"), sn = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (tn = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, nn = function (e, t, n) {
        var o, i, r, s, a = e.style;
        return n = n || tn(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== s || rt.contains(e.ownerDocument, e) || (s = rt.style(e, t)), rn.test(s) && on.test(t) && (o = a.width, i = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = o, a.minWidth = i, a.maxWidth = r)), void 0 === s ? s : s + ""
    }) : mt.documentElement.currentStyle && (tn = function (e) {
        return e.currentStyle
    }, nn = function (e, t, n) {
        var o, i, r, s, a = e.style;
        return n = n || tn(e), s = n ? n[t] : void 0, null == s && a && a[t] && (s = a[t]), rn.test(s) && !sn.test(t) && (o = a.left, i = e.runtimeStyle, r = i && i.left, r && (i.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = o, r && (i.left = r)), void 0 === s ? s : s + "" || "auto"
    }), !function () {
        function t() {
            var t, n, o = mt.getElementsByTagName("body")[0];
            o && (t = mt.createElement("div"), n = mt.createElement("div"), t.style.cssText = c, o.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", rt.swap(o, null != o.style.zoom ? {zoom: 1} : {}, function () {
                i = 4 === n.offsetWidth
            }), r = !0, s = !1, a = !0, e.getComputedStyle && (s = "1%" !== (e.getComputedStyle(n, null) || {}).top, r = "4px" === (e.getComputedStyle(n, null) || {width: "4px"}).width), o.removeChild(t), n = o = null)
        }

        var n, o, i, r, s, a, l = mt.createElement("div"), c = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", u = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = l.getElementsByTagName("a")[0], n.style.cssText = "float:left;opacity:.5", ot.opacity = /^0.5/.test(n.style.opacity), ot.cssFloat = !!n.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", ot.clearCloneStyle = "content-box" === l.style.backgroundClip, n = l = null, rt.extend(ot, {
            reliableHiddenOffsets: function () {
                if (null != o)return o;
                var e, t, n, i = mt.createElement("div"), r = mt.getElementsByTagName("body")[0];
                return r ? (i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = mt.createElement("div"), e.style.cssText = c, r.appendChild(e).appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = i.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", n = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", o = n && 0 === t[0].offsetHeight, r.removeChild(e), i = r = null, o) : void 0
            }, boxSizing: function () {
                return null == i && t(), i
            }, boxSizingReliable: function () {
                return null == r && t(), r
            }, pixelPosition: function () {
                return null == s && t(), s
            }, reliableMarginRight: function () {
                var t, n, o, i;
                if (null == a && e.getComputedStyle) {
                    if (t = mt.getElementsByTagName("body")[0], !t)return;
                    n = mt.createElement("div"), o = mt.createElement("div"), n.style.cssText = c, t.appendChild(n).appendChild(o), i = o.appendChild(mt.createElement("div")), i.style.cssText = o.style.cssText = u, i.style.marginRight = i.style.width = "0", o.style.width = "1px", a = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(n)
                }
                return a
            }
        })
    }(), rt.swap = function (e, t, n, o) {
        var i, r, s = {};
        for (r in t)s[r] = e.style[r], e.style[r] = t[r];
        i = n.apply(e, o || []);
        for (r in t)e.style[r] = s[r];
        return i
    };
    var an = /alpha\([^)]*\)/i, ln = /opacity\s*=\s*([^)]*)/, cn = /^(none|table(?!-c[ea]).+)/, un = new RegExp("^(" + St + ")(.*)$", "i"), dn = new RegExp("^([+-])=(" + St + ")", "i"), hn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, pn = {letterSpacing: 0, fontWeight: 400}, fn = ["Webkit", "O", "Moz", "ms"];
    rt.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = nn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": ot.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, r, s, a = rt.camelCase(t), l = e.style;
                if (t = rt.cssProps[a] || (rt.cssProps[a] = S(l, a)), s = rt.cssHooks[t] || rt.cssHooks[a], void 0 === n)return s && "get" in s && void 0 !== (i = s.get(e, !1, o)) ? i : l[t];
                if (r = typeof n, "string" === r && (i = dn.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(rt.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || rt.cssNumber[a] || (n += "px"), ot.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, o)))))try {
                    l[t] = "", l[t] = n
                } catch (c) {
                }
            }
        },
        css: function (e, t, n, o) {
            var i, r, s, a = rt.camelCase(t);
            return t = rt.cssProps[a] || (rt.cssProps[a] = S(e.style, a)), s = rt.cssHooks[t] || rt.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = nn(e, t, o)), "normal" === r && t in pn && (r = pn[t]), "" === n || n ? (i = parseFloat(r), n === !0 || rt.isNumeric(i) ? i || 0 : r) : r
        }
    }), rt.each(["height", "width"], function (e, t) {
        rt.cssHooks[t] = {
            get: function (e, n, o) {
                return n ? 0 === e.offsetWidth && cn.test(rt.css(e, "display")) ? rt.swap(e, hn, function () {
                    return L(e, t, o)
                }) : L(e, t, o) : void 0
            }, set: function (e, n, o) {
                var i = o && tn(e);
                return N(e, n, o ? D(e, t, o, ot.boxSizing() && "border-box" === rt.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ot.opacity || (rt.cssHooks.opacity = {
        get: function (e, t) {
            return ln.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, o = e.currentStyle, i = rt.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", r = o && o.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === rt.trim(r.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || o && !o.filter) || (n.filter = an.test(r) ? r.replace(an, i) : r + " " + i)
        }
    }), rt.cssHooks.marginRight = T(ot.reliableMarginRight, function (e, t) {
        return t ? rt.swap(e, {display: "inline-block"}, nn, [e, "marginRight"]) : void 0
    }), rt.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        rt.cssHooks[e + t] = {
            expand: function (n) {
                for (var o = 0, i = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > o; o++)i[e + Et[o] + t] = r[o] || r[o - 2] || r[0];
                return i
            }
        }, on.test(e) || (rt.cssHooks[e + t].set = N)
    }), rt.fn.extend({
        css: function (e, t) {
            return Dt(this, function (e, t, n) {
                var o, i, r = {}, s = 0;
                if (rt.isArray(t)) {
                    for (o = tn(e), i = t.length; i > s; s++)r[t[s]] = rt.css(e, t[s], !1, o);
                    return r
                }
                return void 0 !== n ? rt.style(e, t, n) : rt.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return E(this, !0)
        }, hide: function () {
            return E(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Nt(this) ? rt(this).show() : rt(this).hide()
            })
        }
    }), rt.Tween = j, j.prototype = {
        constructor: j, init: function (e, t, n, o, i, r) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = o, this.unit = r || (rt.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = j.propHooks[this.prop];
            return e && e.get ? e.get(this) : j.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = j.propHooks[this.prop];
            return this.pos = t = this.options.duration ? rt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
        }
    }, j.prototype.init.prototype = j.prototype, j.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = rt.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                rt.fx.step[e.prop] ? rt.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[rt.cssProps[e.prop]] || rt.cssHooks[e.prop]) ? rt.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, rt.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, rt.fx = j.prototype.init, rt.fx.step = {};
    var mn, gn, bn = /^(?:toggle|show|hide)$/, yn = new RegExp("^(?:([+-])=|)(" + St + ")([a-z%]*)$", "i"), vn = /queueHooks$/, _n = [P], wn = {
        "*": [function (e, t) {
            var n = this.createTween(e, t), o = n.cur(), i = yn.exec(t), r = i && i[3] || (rt.cssNumber[e] ? "" : "px"), s = (rt.cssNumber[e] || "px" !== r && +o) && yn.exec(rt.css(n.elem, e)), a = 1, l = 20;
            if (s && s[3] !== r) {
                r = r || s[3], i = i || [], s = +o || 1;
                do a = a || ".5", s /= a, rt.style(n.elem, e, s + r); while (a !== (a = n.cur() / o) && 1 !== a && --l)
            }
            return i && (s = n.start = +s || +o || 0, n.unit = r, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
        }]
    };
    rt.Animation = rt.extend(O, {
        tweener: function (e, t) {
            rt.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, o = 0, i = e.length; i > o; o++)n = e[o], wn[n] = wn[n] || [], wn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? _n.unshift(e) : _n.push(e)
        }
    }), rt.speed = function (e, t, n) {
        var o = e && "object" == typeof e ? rt.extend({}, e) : {
            complete: n || !n && t || rt.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !rt.isFunction(t) && t
        };
        return o.duration = rt.fx.off ? 0 : "number" == typeof o.duration ? o.duration : o.duration in rt.fx.speeds ? rt.fx.speeds[o.duration] : rt.fx.speeds._default, (null == o.queue || o.queue === !0) && (o.queue = "fx"), o.old = o.complete, o.complete = function () {
            rt.isFunction(o.old) && o.old.call(this), o.queue && rt.dequeue(this, o.queue)
        }, o
    }, rt.fn.extend({
        fadeTo: function (e, t, n, o) {
            return this.filter(Nt).css("opacity", 0).show().end().animate({opacity: t}, e, n, o)
        }, animate: function (e, t, n, o) {
            var i = rt.isEmptyObject(e), r = rt.speed(t, n, o), s = function () {
                var t = O(this, rt.extend({}, e), r);
                (i || rt._data(this, "finish")) && t.stop(!0)
            };
            return s.finish = s, i || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
        }, stop: function (e, t, n) {
            var o = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", r = rt.timers, s = rt._data(this);
                if (i) s[i] && s[i].stop && o(s[i]); else for (i in s)s[i] && s[i].stop && vn.test(i) && o(s[i]);
                for (i = r.length; i--;)r[i].elem !== this || null != e && r[i].queue !== e || (r[i].anim.stop(n), t = !1, r.splice(i, 1));
                (t || !n) && rt.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = rt._data(this), o = n[e + "queue"], i = n[e + "queueHooks"], r = rt.timers, s = o ? o.length : 0;
                for (n.finish = !0, rt.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = r.length; t--;)r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; s > t; t++)o[t] && o[t].finish && o[t].finish.call(this);
                delete n.finish
            })
        }
    }), rt.each(["toggle", "show", "hide"], function (e, t) {
        var n = rt.fn[t];
        rt.fn[t] = function (e, o, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, o, i)
        }
    }), rt.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        rt.fn[e] = function (e, n, o) {
            return this.animate(t, e, n, o)
        }
    }), rt.timers = [], rt.fx.tick = function () {
        var e, t = rt.timers, n = 0;
        for (mn = rt.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || rt.fx.stop(), mn = void 0
    }, rt.fx.timer = function (e) {
        rt.timers.push(e), e() ? rt.fx.start() : rt.timers.pop()
    }, rt.fx.interval = 13, rt.fx.start = function () {
        gn || (gn = setInterval(rt.fx.tick, rt.fx.interval))
    }, rt.fx.stop = function () {
        clearInterval(gn), gn = null
    }, rt.fx.speeds = {slow: 600, fast: 200, _default: 400}, rt.fn.delay = function (e, t) {
        return e = rt.fx ? rt.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var o = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(o)
            }
        })
    }, function () {
        var e, t, n, o, i = mt.createElement("div");
        i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = i.getElementsByTagName("a")[0], n = mt.createElement("select"), o = n.appendChild(mt.createElement("option")), t = i.getElementsByTagName("input")[0], e.style.cssText = "top:1px", ot.getSetAttribute = "t" !== i.className, ot.style = /top/.test(e.getAttribute("style")), ot.hrefNormalized = "/a" === e.getAttribute("href"), ot.checkOn = !!t.value, ot.optSelected = o.selected, ot.enctype = !!mt.createElement("form").enctype, n.disabled = !0, ot.optDisabled = !o.disabled, t = mt.createElement("input"), t.setAttribute("value", ""), ot.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ot.radioValue = "t" === t.value, e = t = n = o = i = null
    }();
    var xn = /\r/g;
    rt.fn.extend({
        val: function (e) {
            var t, n, o, i = this[0];
            return arguments.length ? (o = rt.isFunction(e), this.each(function (n) {
                var i;
                1 === this.nodeType && (i = o ? e.call(this, n, rt(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : rt.isArray(i) && (i = rt.map(i, function (e) {
                    return null == e ? "" : e + ""
                })), t = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = rt.valHooks[i.type] || rt.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(xn, "") : null == n ? "" : n)) : void 0
        }
    }), rt.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = rt.find.attr(e, "value");
                    return null != t ? t : rt.text(e)
                }
            }, select: {
                get: function (e) {
                    for (var t, n, o = e.options, i = e.selectedIndex, r = "select-one" === e.type || 0 > i, s = r ? null : [], a = r ? i + 1 : o.length, l = 0 > i ? a : r ? i : 0; a > l; l++)if (n = o[l], !(!n.selected && l !== i || (ot.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
                        if (t = rt(n).val(), r)return t;
                        s.push(t)
                    }
                    return s
                }, set: function (e, t) {
                    for (var n, o, i = e.options, r = rt.makeArray(t), s = i.length; s--;)if (o = i[s], rt.inArray(rt.valHooks.option.get(o), r) >= 0)try {
                        o.selected = n = !0
                    } catch (a) {
                        o.scrollHeight
                    } else o.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), rt.each(["radio", "checkbox"], function () {
        rt.valHooks[this] = {
            set: function (e, t) {
                return rt.isArray(t) ? e.checked = rt.inArray(rt(e).val(), t) >= 0 : void 0
            }
        }, ot.checkOn || (rt.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Cn, kn, An = rt.expr.attrHandle, Tn = /^(?:checked|selected)$/i, Sn = ot.getSetAttribute, En = ot.input;
    rt.fn.extend({
        attr: function (e, t) {
            return Dt(this, rt.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                rt.removeAttr(this, e)
            })
        }
    }), rt.extend({
        attr: function (e, t, n) {
            var o, i, r = e.nodeType;
            return e && 3 !== r && 8 !== r && 2 !== r ? typeof e.getAttribute === kt ? rt.prop(e, t, n) : (1 === r && rt.isXMLDoc(e) || (t = t.toLowerCase(), o = rt.attrHooks[t] || (rt.expr.match.bool.test(t) ? kn : Cn)), void 0 === n ? o && "get" in o && null !== (i = o.get(e, t)) ? i : (i = rt.find.attr(e, t), null == i ? void 0 : i) : null !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void rt.removeAttr(e, t)) : void 0
        }, removeAttr: function (e, t) {
            var n, o, i = 0, r = t && t.match(_t);
            if (r && 1 === e.nodeType)for (; n = r[i++];)o = rt.propFix[n] || n, rt.expr.match.bool.test(n) ? En && Sn || !Tn.test(n) ? e[o] = !1 : e[rt.camelCase("default-" + n)] = e[o] = !1 : rt.attr(e, n, ""), e.removeAttribute(Sn ? n : o)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ot.radioValue && "radio" === t && rt.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), kn = {
        set: function (e, t, n) {
            return t === !1 ? rt.removeAttr(e, n) : En && Sn || !Tn.test(n) ? e.setAttribute(!Sn && rt.propFix[n] || n, n) : e[rt.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = An[t] || rt.find.attr;
        An[t] = En && Sn || !Tn.test(t) ? function (e, t, o) {
            var i, r;
            return o || (r = An[t], An[t] = i, i = null != n(e, t, o) ? t.toLowerCase() : null, An[t] = r), i
        } : function (e, t, n) {
            return n ? void 0 : e[rt.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), En && Sn || (rt.attrHooks.value = {
        set: function (e, t, n) {
            return rt.nodeName(e, "input") ? void(e.defaultValue = t) : Cn && Cn.set(e, t, n)
        }
    }), Sn || (Cn = {
        set: function (e, t, n) {
            var o = e.getAttributeNode(n);
            return o || e.setAttributeNode(o = e.ownerDocument.createAttribute(n)), o.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, An.id = An.name = An.coords = function (e, t, n) {
        var o;
        return n ? void 0 : (o = e.getAttributeNode(t)) && "" !== o.value ? o.value : null
    }, rt.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: Cn.set
    }, rt.attrHooks.contenteditable = {
        set: function (e, t, n) {
            Cn.set(e, "" === t ? !1 : t, n)
        }
    }, rt.each(["width", "height"], function (e, t) {
        rt.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), ot.style || (rt.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Nn = /^(?:input|select|textarea|button|object)$/i, Dn = /^(?:a|area)$/i;
    rt.fn.extend({
        prop: function (e, t) {
            return Dt(this, rt.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = rt.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {
                }
            })
        }
    }), rt.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var o, i, r, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? (r = 1 !== s || !rt.isXMLDoc(e), r && (t = rt.propFix[t] || t, i = rt.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : e[t] = n : i && "get" in i && null !== (o = i.get(e, t)) ? o : e[t]) : void 0
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = rt.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Nn.test(e.nodeName) || Dn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ot.hrefNormalized || rt.each(["href", "src"], function (e, t) {
        rt.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ot.optSelected || (rt.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        rt.propFix[this.toLowerCase()] = this
    }), ot.enctype || (rt.propFix.enctype = "encoding");
    var Ln = /[\t\r\n\f]/g;
    rt.fn.extend({
        addClass: function (e) {
            var t, n, o, i, r, s, a = 0, l = this.length, c = "string" == typeof e && e;
            if (rt.isFunction(e))return this.each(function (t) {
                rt(this).addClass(e.call(this, t, this.className))
            });
            if (c)for (t = (e || "").match(_t) || []; l > a; a++)if (n = this[a], o = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : " ")) {
                for (r = 0; i = t[r++];)o.indexOf(" " + i + " ") < 0 && (o += i + " ");
                s = rt.trim(o), n.className !== s && (n.className = s)
            }
            return this
        }, removeClass: function (e) {
            var t, n, o, i, r, s, a = 0, l = this.length, c = 0 === arguments.length || "string" == typeof e && e;
            if (rt.isFunction(e))return this.each(function (t) {
                rt(this).removeClass(e.call(this, t, this.className))
            });
            if (c)for (t = (e || "").match(_t) || []; l > a; a++)if (n = this[a], o = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : "")) {
                for (r = 0; i = t[r++];)for (; o.indexOf(" " + i + " ") >= 0;)o = o.replace(" " + i + " ", " ");
                s = e ? rt.trim(o) : "", n.className !== s && (n.className = s)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(rt.isFunction(e) ? function (n) {
                rt(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)for (var t, o = 0, i = rt(this), r = e.match(_t) || []; t = r[o++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === kt || "boolean" === n) && (this.className && rt._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : rt._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, o = this.length; o > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ln, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    }), rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        rt.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), rt.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, o) {
            return this.on(t, e, n, o)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var jn = rt.now(), Rn = /\?/, In = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    rt.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
        var n, o = null, i = rt.trim(t + "");
        return i && !rt.trim(i.replace(In, function (e, t, i, r) {
            return n && t && (o = 0), 0 === o ? e : (n = i || t, o += !r - !i, "")
        })) ? Function("return " + i)() : rt.error("Invalid JSON: " + t)
    }, rt.parseXML = function (t) {
        var n, o;
        if (!t || "string" != typeof t)return null;
        try {
            e.DOMParser ? (o = new DOMParser, n = o.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + t), n
    };
    var Bn, Pn, Mn = /#.*$/, On = /([?&])_=[^&]*/, Fn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Hn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, qn = /^(?:GET|HEAD)$/, zn = /^\/\//, Wn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qn = {}, Un = {}, $n = "*/".concat("*");
    try {
        Pn = location.href
    } catch (Vn) {
        Pn = mt.createElement("a"), Pn.href = "", Pn = Pn.href
    }
    Bn = Wn.exec(Pn.toLowerCase()) || [], rt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Pn,
            type: "GET",
            isLocal: Hn.test(Bn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $n,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": rt.parseJSON, "text xml": rt.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? q(q(e, rt.ajaxSettings), t) : q(rt.ajaxSettings, e)
        },
        ajaxPrefilter: F(Qn),
        ajaxTransport: F(Un),
        ajax: function (e, t) {
            function n(e, t, n, o) {
                var i, u, b, y, _, x = t;
                2 !== v && (v = 2, a && clearTimeout(a), c = void 0, s = o || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (y = z(d, w, n)), y = W(d, y, w, i), i ? (d.ifModified && (_ = w.getResponseHeader("Last-Modified"), _ && (rt.lastModified[r] = _), _ = w.getResponseHeader("etag"), _ && (rt.etag[r] = _)), 204 === e || "HEAD" === d.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = y.state, u = y.data, b = y.error, i = !b)) : (b = x, (e || !x) && (x = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || x) + "", i ? f.resolveWith(h, [u, x, w]) : f.rejectWith(h, [w, x, b]), w.statusCode(g), g = void 0, l && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, d, i ? u : b]), m.fireWith(h, [w, x]), l && (p.trigger("ajaxComplete", [w, d]), --rt.active || rt.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var o, i, r, s, a, l, c, u, d = rt.ajaxSetup({}, t), h = d.context || d, p = d.context && (h.nodeType || h.jquery) ? rt(h) : rt.event, f = rt.Deferred(), m = rt.Callbacks("once memory"), g = d.statusCode || {}, b = {}, y = {}, v = 0, _ = "canceled", w = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === v) {
                        if (!u)for (u = {}; t = Fn.exec(s);)u[t[1].toLowerCase()] = t[2];
                        t = u[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === v ? s : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return v || (e = y[n] = y[n] || e, b[e] = t), this
                },
                overrideMimeType: function (e) {
                    return v || (d.mimeType = e), this
                },
                statusCode: function (e) {
                    var t;
                    if (e)if (2 > v)for (t in e)g[t] = [g[t], e[t]]; else w.always(e[w.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || _;
                    return c && c.abort(t), n(0, t), this
                }
            };
            if (f.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || Pn) + "").replace(Mn, "").replace(zn, Bn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = rt.trim(d.dataType || "*").toLowerCase().match(_t) || [""], null == d.crossDomain && (o = Wn.exec(d.url.toLowerCase()), d.crossDomain = !(!o || o[1] === Bn[1] && o[2] === Bn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (Bn[3] || ("http:" === Bn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = rt.param(d.data, d.traditional)), H(Qn, d, t, w), 2 === v)return w;
            l = d.global, l && 0 === rt.active++ && rt.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !qn.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += (Rn.test(r) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = On.test(r) ? r.replace(On, "$1_=" + jn++) : r + (Rn.test(r) ? "&" : "?") + "_=" + jn++)), d.ifModified && (rt.lastModified[r] && w.setRequestHeader("If-Modified-Since", rt.lastModified[r]), rt.etag[r] && w.setRequestHeader("If-None-Match", rt.etag[r])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + $n + "; q=0.01" : "") : d.accepts["*"]);
            for (i in d.headers)w.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (d.beforeSend.call(h, w, d) === !1 || 2 === v))return w.abort();
            _ = "abort";
            for (i in{success: 1, error: 1, complete: 1})w[i](d[i]);
            if (c = H(Un, d, t, w)) {
                w.readyState = 1, l && p.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (a = setTimeout(function () {
                    w.abort("timeout")
                }, d.timeout));
                try {
                    v = 1, c.send(b, n)
                } catch (x) {
                    if (!(2 > v))throw x;
                    n(-1, x)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function (e, t, n) {
            return rt.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return rt.get(e, void 0, t, "script")
        }
    }), rt.each(["get", "post"], function (e, t) {
        rt[t] = function (e, n, o, i) {
            return rt.isFunction(n) && (i = i || o, o = n, n = void 0), rt.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: o
            })
        }
    }), rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        rt.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), rt._evalUrl = function (e) {
        return rt.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, rt.fn.extend({
        wrapAll: function (e) {
            if (rt.isFunction(e))return this.each(function (t) {
                rt(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = rt(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(rt.isFunction(e) ? function (t) {
                rt(this).wrapInner(e.call(this, t))
            } : function () {
                var t = rt(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = rt.isFunction(e);
            return this.each(function (n) {
                rt(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
            }).end()
        }
    }), rt.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ot.reliableHiddenOffsets() && "none" === (e.style && e.style.display || rt.css(e, "display"))
    }, rt.expr.filters.visible = function (e) {
        return !rt.expr.filters.hidden(e)
    };
    var Gn = /%20/g, Xn = /\[\]$/, Kn = /\r?\n/g, Yn = /^(?:submit|button|image|reset|file)$/i, Zn = /^(?:input|select|textarea|keygen)/i;
    rt.param = function (e, t) {
        var n, o = [], i = function (e, t) {
            t = rt.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(e) || e.jquery && !rt.isPlainObject(e)) rt.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)Q(n, e[n], t, i);
        return o.join("&").replace(Gn, "+")
    }, rt.fn.extend({
        serialize: function () {
            return rt.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = rt.prop(this, "elements");
                return e ? rt.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !rt(this).is(":disabled") && Zn.test(this.nodeName) && !Yn.test(e) && (this.checked || !Lt.test(e))
            }).map(function (e, t) {
                var n = rt(this).val();
                return null == n ? null : rt.isArray(n) ? rt.map(n, function (e) {
                    return {name: t.name, value: e.replace(Kn, "\r\n")}
                }) : {name: t.name, value: n.replace(Kn, "\r\n")}
            }).get()
        }
    }), rt.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && U() || $()
    } : U;
    var Jn = 0, eo = {}, to = rt.ajaxSettings.xhr();
    e.ActiveXObject && rt(e).on("unload", function () {
        for (var e in eo)eo[e](void 0, !0)
    }), ot.cors = !!to && "withCredentials" in to, to = ot.ajax = !!to, to && rt.ajaxTransport(function (e) {
        if (!e.crossDomain || ot.cors) {
            var t;
            return {
                send: function (n, o) {
                    var i, r = e.xhr(), s = ++Jn;
                    if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)r[i] = e.xhrFields[i];
                    e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n)void 0 !== n[i] && r.setRequestHeader(i, n[i] + "");
                    r.send(e.hasContent && e.data || null), t = function (n, i) {
                        var a, l, c;
                        if (t && (i || 4 === r.readyState))if (delete eo[s], t = void 0, r.onreadystatechange = rt.noop, i) 4 !== r.readyState && r.abort(); else {
                            c = {}, a = r.status, "string" == typeof r.responseText && (c.text = r.responseText);
                            try {
                                l = r.statusText
                            } catch (u) {
                                l = ""
                            }
                            a || !e.isLocal || e.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                        }
                        c && o(a, l, c, r.getAllResponseHeaders())
                    }, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = eo[s] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), rt.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return rt.globalEval(e), e
            }
        }
    }), rt.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), rt.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = mt.head || rt("head")[0] || mt.documentElement;
            return {
                send: function (o, i) {
                    t = mt.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var no = [], oo = /(=)\?(?=&|$)|\?\?/;
    rt.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = no.pop() || rt.expando + "_" + jn++;
            return this[e] = !0, e
        }
    }), rt.ajaxPrefilter("json jsonp", function (t, n, o) {
        var i, r, s, a = t.jsonp !== !1 && (oo.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && oo.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = rt.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(oo, "$1" + i) : t.jsonp !== !1 && (t.url += (Rn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return s || rt.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", r = e[i], e[i] = function () {
            s = arguments
        }, o.always(function () {
            e[i] = r, t[i] && (t.jsonpCallback = n.jsonpCallback, no.push(i)), s && rt.isFunction(r) && r(s[0]), s = r = void 0
        }), "script") : void 0
    }), rt.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || mt;
        var o = ht.exec(e), i = !n && [];
        return o ? [t.createElement(o[1])] : (o = rt.buildFragment([e], t, i), i && i.length && rt(i).remove(), rt.merge([], o.childNodes))
    };
    var io = rt.fn.load;
    rt.fn.load = function (e, t, n) {
        if ("string" != typeof e && io)return io.apply(this, arguments);
        var o, i, r, s = this, a = e.indexOf(" ");
        return a >= 0 && (o = e.slice(a, e.length), e = e.slice(0, a)), rt.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), s.length > 0 && rt.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function (e) {
            i = arguments, s.html(o ? rt("<div>").append(rt.parseHTML(e)).find(o) : e)
        }).complete(n && function (e, t) {
                s.each(n, i || [e.responseText, t, e])
            }), this
    }, rt.expr.filters.animated = function (e) {
        return rt.grep(rt.timers, function (t) {
            return e === t.elem
        }).length
    };
    var ro = e.document.documentElement;
    rt.offset = {
        setOffset: function (e, t, n) {
            var o, i, r, s, a, l, c, u = rt.css(e, "position"), d = rt(e), h = {};
            "static" === u && (e.style.position = "relative"), a = d.offset(), r = rt.css(e, "top"), l = rt.css(e, "left"), c = ("absolute" === u || "fixed" === u) && rt.inArray("auto", [r, l]) > -1, c ? (o = d.position(), s = o.top, i = o.left) : (s = parseFloat(r) || 0, i = parseFloat(l) || 0), rt.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (h.top = t.top - a.top + s), null != t.left && (h.left = t.left - a.left + i), "using" in t ? t.using.call(e, h) : d.css(h)
        }
    }, rt.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                rt.offset.setOffset(this, e, t)
            });
            var t, n, o = {top: 0, left: 0}, i = this[0], r = i && i.ownerDocument;
            return r ? (t = r.documentElement, rt.contains(t, i) ? (typeof i.getBoundingClientRect !== kt && (o = i.getBoundingClientRect()), n = V(r), {
                top: o.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: o.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : o) : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, o = this[0];
                return "fixed" === rt.css(o, "position") ? t = o.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), rt.nodeName(e[0], "html") || (n = e.offset()), n.top += rt.css(e[0], "borderTopWidth", !0), n.left += rt.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - rt.css(o, "marginTop", !0),
                    left: t.left - n.left - rt.css(o, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || ro; e && !rt.nodeName(e, "html") && "static" === rt.css(e, "position");)e = e.offsetParent;
                return e || ro
            })
        }
    }), rt.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        rt.fn[e] = function (o) {
            return Dt(this, function (e, o, i) {
                var r = V(e);
                return void 0 === i ? r ? t in r ? r[t] : r.document.documentElement[o] : e[o] : void(r ? r.scrollTo(n ? rt(r).scrollLeft() : i, n ? i : rt(r).scrollTop()) : e[o] = i)
            }, e, o, arguments.length, null)
        }
    }), rt.each(["top", "left"], function (e, t) {
        rt.cssHooks[t] = T(ot.pixelPosition, function (e, n) {
            return n ? (n = nn(e, t), rn.test(n) ? rt(e).position()[t] + "px" : n) : void 0
        })
    }), rt.each({Height: "height", Width: "width"}, function (e, t) {
        rt.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, o) {
            rt.fn[o] = function (o, i) {
                var r = arguments.length && (n || "boolean" != typeof o), s = n || (o === !0 || i === !0 ? "margin" : "border");
                return Dt(this, function (t, n, o) {
                    var i;
                    return rt.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === o ? rt.css(t, n, s) : rt.style(t, n, o, s)
                }, t, r ? o : void 0, r, null)
            }
        })
    }), rt.fn.size = function () {
        return this.length
    }, rt.fn.andSelf = rt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return rt
    });
    var so = e.jQuery, ao = e.$;
    return rt.noConflict = function (t) {
        return e.$ === rt && (e.$ = ao), t && e.jQuery === rt && (e.jQuery = so), rt
    }, typeof t === kt && (e.jQuery = e.$ = rt), rt
}), function (e, t) {
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n;
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function (t) {
            var n = e('meta[name="csrf-token"]').attr("content");
            n && t.setRequestHeader("X-CSRF-Token", n)
        },
        fire: function (t, n, o) {
            var i = e.Event(n);
            return t.trigger(i, o), i.result !== !1
        },
        confirm: function (e) {
            return confirm(e)
        },
        ajax: function (t) {
            return e.ajax(t)
        },
        href: function (e) {
            return e.attr("href")
        },
        handleRemote: function (o) {
            var i, r, s, a, l, c, u, d;
            if (n.fire(o, "ajax:before")) {
                if (a = o.data("cross-domain"), l = a === t ? null : a, c = o.data("with-credentials") || null, u = o.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, o.is("form")) {
                    i = o.attr("method"), r = o.attr("action"), s = o.serializeArray();
                    var h = o.data("ujs:submit-button");
                    h && (s.push(h), o.data("ujs:submit-button", null))
                } else o.is(n.inputChangeSelector) ? (i = o.data("method"), r = o.data("url"), s = o.serialize(), o.data("params") && (s = s + "&" + o.data("params"))) : o.is(n.buttonClickSelector) ? (i = o.data("method") || "get", r = o.data("url"), s = o.serialize(), o.data("params") && (s = s + "&" + o.data("params"))) : (i = o.data("method"), r = n.href(o), s = o.data("params") || null);
                d = {
                    type: i || "GET", data: s, dataType: u, beforeSend: function (e, i) {
                        return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), n.fire(o, "ajax:beforeSend", [e, i])
                    }, success: function (e, t, n) {
                        o.trigger("ajax:success", [e, t, n])
                    }, complete: function (e, t) {
                        o.trigger("ajax:complete", [e, t])
                    }, error: function (e, t, n) {
                        o.trigger("ajax:error", [e, t, n])
                    }, crossDomain: l
                }, c && (d.xhrFields = {withCredentials: c}), r && (d.url = r);
                var p = n.ajax(d);
                return o.trigger("ajax:send", p), p
            }
            return !1
        },
        handleMethod: function (o) {
            var i = n.href(o), r = o.data("method"), s = o.attr("target"), a = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), c = e('<form method="post" action="' + i + '"></form>'), u = '<input name="_method" value="' + r + '" type="hidden" />';
            l !== t && a !== t && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && c.attr("target", s), c.hide().append(u).appendTo("body"), c.submit()
        },
        disableFormElements: function (t) {
            t.find(n.disableSelector).each(function () {
                var t = e(this), n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
            })
        },
        enableFormElements: function (t) {
            t.find(n.enableSelector).each(function () {
                var t = e(this), n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
            })
        },
        allowAction: function (e) {
            var t, o = e.data("confirm"), i = !1;
            return o ? (n.fire(e, "confirm") && (i = n.confirm(o), t = n.fire(e, "confirm:complete", [i])), i && t) : !0
        },
        blankInputs: function (t, n, o) {
            var i, r, s = e(), a = n || "input,textarea", l = t.find(a);
            return l.each(function () {
                if (i = e(this), r = i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : i.val(), !r == !o) {
                    if (i.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + i.attr("name") + '"]').length)return !0;
                    s = s.add(i)
                }
            }), s.length ? s : !1
        },
        nonBlankInputs: function (e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function (t) {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
        },
        disableElement: function (e) {
            e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
                return n.stopEverything(e)
            })
        },
        enableElement: function (e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable")
        }
    }, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function (e, t, o) {
        e.crossDomain || n.CSRFProtection(o)
    }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function () {
        n.enableElement(e(this))
    }), e(document).delegate(n.linkClickSelector, "click.rails", function (o) {
        var i = e(this), r = i.data("method"), s = i.data("params");
        if (!n.allowAction(i))return n.stopEverything(o);
        if (i.is(n.linkDisableSelector) && n.disableElement(i), i.data("remote") !== t) {
            if (!(!o.metaKey && !o.ctrlKey || r && "GET" !== r || s))return !0;
            var a = n.handleRemote(i);
            return a === !1 ? n.enableElement(i) : a.error(function () {
                n.enableElement(i)
            }), !1
        }
        return i.data("method") ? (n.handleMethod(i), !1) : void 0
    }), e(document).delegate(n.buttonClickSelector, "click.rails", function (t) {
        var o = e(this);
        return n.allowAction(o) ? (n.handleRemote(o), !1) : n.stopEverything(t)
    }), e(document).delegate(n.inputChangeSelector, "change.rails", function (t) {
        var o = e(this);
        return n.allowAction(o) ? (n.handleRemote(o), !1) : n.stopEverything(t)
    }), e(document).delegate(n.formSubmitSelector, "submit.rails", function (o) {
        var i = e(this), r = i.data("remote") !== t, s = n.blankInputs(i, n.requiredInputSelector), a = n.nonBlankInputs(i, n.fileInputSelector);
        if (!n.allowAction(i))return n.stopEverything(o);
        if (s && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [s]))return n.stopEverything(o);
        if (r) {
            if (a) {
                setTimeout(function () {
                    n.disableFormElements(i)
                }, 13);
                var l = n.fire(i, "ajax:aborted:file", [a]);
                return l || setTimeout(function () {
                    n.enableFormElements(i)
                }, 13), l
            }
            return n.handleRemote(i), !1
        }
        setTimeout(function () {
            n.disableFormElements(i)
        }, 13)
    }), e(document).delegate(n.formInputClickSelector, "click.rails", function (t) {
        var o = e(this);
        if (!n.allowAction(o))return n.stopEverything(t);
        var i = o.attr("name"), r = i ? {name: i, value: o.val()} : null;
        o.closest("form").data("ujs:submit-button", r)
    }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
        this == t.target && n.disableFormElements(e(this))
    }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function (t) {
        this == t.target && n.enableFormElements(e(this))
    }), e(function () {
        var t = e("meta[name=csrf-token]").attr("content"), n = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + n + '"]').val(t)
    }))
}(jQuery), function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function (e) {
    function t(e) {
        return a.raw ? e : encodeURIComponent(e)
    }

    function n(e) {
        return a.raw ? e : decodeURIComponent(e)
    }

    function o(e) {
        return t(a.json ? JSON.stringify(e) : String(e))
    }

    function i(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            e = decodeURIComponent(e.replace(s, " "))
        } catch (t) {
            return
        }
        try {
            return a.json ? JSON.parse(e) : e
        } catch (t) {
        }
    }

    function r(t, n) {
        var o = a.raw ? t : i(t);
        return e.isFunction(n) ? n(o) : o
    }

    var s = /\+/g, a = e.cookie = function (i, s, l) {
        if (void 0 !== s && !e.isFunction(s)) {
            if (l = e.extend({}, a.defaults, l), "number" == typeof l.expires) {
                var c = l.expires, u = l.expires = new Date;
                u.setDate(u.getDate() + c)
            }
            return document.cookie = [t(i), "=", o(s), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
        }
        for (var d = i ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], p = 0, f = h.length; f > p; p++) {
            var m = h[p].split("="), g = n(m.shift()), b = m.join("=");
            if (i && i === g) {
                d = r(b, s);
                break
            }
            i || void 0 === (b = r(b)) || (d[g] = b)
        }
        return d
    };
    a.defaults = {}, e.removeCookie = function (t, n) {
        return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend({}, n, {expires: -1})), !0) : !1
    }
}), String.prototype.encodeHTML = function () {
    var e = {
        "&": "&#38;",
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "/": "&#47;"
    }, t = /&(?!#?\w+;)|<|>|"|'|\//g;
    return function () {
        return this ? this.replace(t, function (t) {
            return e[t] || t
        }) : this
    }
}(), function (e) {
    "undefined" == typeof e.fn.each2 && e.fn.extend({
        each2: function (t) {
            for (var n = e([0]), o = -1, i = this.length; ++o < i && (n.context = n[0] = this[o]) && t.call(n[0], o, n) !== !1;);
            return this
        }
    })
}(jQuery), function (e, t) {
    "use strict";
    function n(e, t) {
        var n, o = 0, i = t.length;
        if ("undefined" == typeof e)return -1;
        if (e.constructor === String) {
            for (; i > o; o += 1)if (0 === e.localeCompare(t[o]))return o
        } else for (; i > o; o += 1)if (n = t[o], n.constructor === String) {
            if (0 === n.localeCompare(e))return o
        } else if (n === e)return o;
        return -1
    }

    function o(e, n) {
        return e === n ? !0 : e === t || n === t ? !1 : null === e || null === n ? !1 : e.constructor === String ? 0 === e.localeCompare(n) : n.constructor === String ? 0 === n.localeCompare(e) : !1
    }

    function i(t, n) {
        var o, i, r;
        if (null === t || t.length < 1)return [];
        for (o = t.split(n), i = 0, r = o.length; r > i; i += 1)o[i] = e.trim(o[i]);
        return o
    }

    function r(e) {
        return e.outerWidth(!1) - e.width()
    }

    function s(n) {
        var o = "keyup-change-value";
        n.bind("keydown", function () {
            e.data(n, o) === t && e.data(n, o, n.val())
        }), n.bind("keyup", function () {
            var i = e.data(n, o);
            i !== t && n.val() !== i && (e.removeData(n, o), n.trigger("keyup-change"))
        })
    }

    function a(n) {
        n.bind("mousemove", function (n) {
            var o = N;
            (o === t || o.x !== n.pageX || o.y !== n.pageY) && e(n.target).trigger("mousemove-filtered", n)
        })
    }

    function l(e, n, o) {
        o = o || t;
        var i;
        return function () {
            var t = arguments;
            window.clearTimeout(i), i = window.setTimeout(function () {
                n.apply(o, t)
            }, e)
        }
    }

    function c(e) {
        var t, n = !1;
        return function () {
            return n === !1 && (t = e(), n = !0), t
        }
    }

    function u(e, t) {
        var o = l(e, function (e) {
            t.trigger("scroll-debounced", e)
        });
        t.bind("scroll", function (e) {
            n(e.target, t.get()) >= 0 && o(e)
        })
    }

    function d(e) {
        e.preventDefault(), e.stopPropagation()
    }

    function h(e) {
        e.preventDefault(), e.stopImmediatePropagation()
    }

    function p(t) {
        if (!E) {
            var n = t[0].currentStyle || window.getComputedStyle(t[0], null);
            E = e("<div></div>").css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: n.fontSize,
                fontFamily: n.fontFamily,
                fontStyle: n.fontStyle,
                fontWeight: n.fontWeight,
                letterSpacing: n.letterSpacing,
                textTransform: n.textTransform,
                whiteSpace: "nowrap"
            }), e("body").append(E)
        }
        return E.text(t.val()), E.width()
    }

    function f(e, t, n, o) {
        var i = e.toUpperCase().indexOf(t.toUpperCase()), r = t.length;
        return 0 > i ? void n.push(o(e)) : (n.push(o(e.substring(0, i))), n.push("<span class='select2-match'>"), n.push(o(e.substring(i, i + r))), n.push("</span>"), void n.push(o(e.substring(i + r, e.length))))
    }

    function m(t) {
        var n, o = 0, i = null, r = t.quietMillis || 100;
        return function (s) {
            window.clearTimeout(n), n = window.setTimeout(function () {
                o += 1;
                var n = o, r = t.data, a = t.transport || e.ajax, l = t.traditional || !1, c = t.type || "GET";
                r = r.call(this, s.term, s.page, s.context), null !== i && i.abort(), i = a.call(null, {
                    url: "function" == typeof t.url ? t.url() : t.url,
                    dataType: t.dataType,
                    data: r,
                    type: c,
                    traditional: l,
                    success: function (e) {
                        if (!(o > n)) {
                            var i = t.results(e, s.page);
                            s.callback(i)
                        }
                    }
                })
            }, r)
        }
    }

    function g(t) {
        var n, o = t, i = function (e) {
            return "" + e.text
        };
        return e.isArray(o) || (i = o.text, e.isFunction(i) || (n = o.text, i = function (e) {
            return e[n]
        }), o = o.results), function (t) {
            var n, r = t.term, s = {results: []};
            return "" === r ? void t.callback({results: o}) : (n = function (o, s) {
                var a, l;
                if (o = o[0], o.children) {
                    a = {};
                    for (l in o)o.hasOwnProperty(l) && (a[l] = o[l]);
                    a.children = [], e(o.children).each2(function (e, t) {
                        n(t, a.children)
                    }), (a.children.length || t.matcher(r, i(a))) && s.push(a)
                } else t.matcher(r, i(o)) && s.push(o)
            }, e(o).each2(function (e, t) {
                n(t, s.results)
            }), void t.callback(s))
        }
    }

    function b(n) {
        return e.isFunction(n) ? n : function (o) {
            var i = o.term, r = {results: []};
            e(n).each(function () {
                var e = this.text !== t, n = e ? this.text : this;
                ("" === i || o.matcher(i, n)) && r.results.push(e ? this : {id: this, text: this})
            }), o.callback(r)
        }
    }

    function y(t) {
        if (e.isFunction(t))return !0;
        if (!t)return !1;
        throw new Error("formatterName must be a function or a falsy value")
    }

    function v(t) {
        return e.isFunction(t) ? t() : t
    }

    function _(t) {
        var n = 0;
        return e.each(t, function (e, t) {
            t.children ? n += _(t.children) : n++
        }), n
    }

    function w(e, n, i, r) {
        var s, a, l, c, u, d = e, h = !1;
        if (!r.createSearchChoice || !r.tokenSeparators || r.tokenSeparators.length < 1)return t;
        for (; ;) {
            for (a = -1, l = 0, c = r.tokenSeparators.length; c > l && (u = r.tokenSeparators[l], a = e.indexOf(u), !(a >= 0)); l++);
            if (0 > a)break;
            if (s = e.substring(0, a), e = e.substring(a + u.length), s.length > 0 && (s = r.createSearchChoice(s, n), s !== t && null !== s && r.id(s) !== t && null !== r.id(s))) {
                for (h = !1, l = 0, c = n.length; c > l; l++)if (o(r.id(s), r.id(n[l]))) {
                    h = !0;
                    break
                }
                h || i(s)
            }
        }
        return 0 != d.localeCompare(e) ? e : void 0
    }

    function x(t, n) {
        var o = function () {
        };
        return o.prototype = new t, o.prototype.constructor = o, o.prototype.parent = t.prototype, o.prototype = e.extend(o.prototype, n), o
    }

    if (window.Select2 === t) {
        var C, k, A, T, S, E, N, D;
        C = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function (e) {
                switch (e = e.which ? e.which : e) {
                    case C.LEFT:
                    case C.RIGHT:
                    case C.UP:
                    case C.DOWN:
                        return !0
                }
                return !1
            },
            isControl: function (e) {
                var t = e.which;
                switch (t) {
                    case C.SHIFT:
                    case C.CTRL:
                    case C.ALT:
                        return !0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function (e) {
                return e = e.which ? e.which : e, e >= 112 && 123 >= e
            }
        }, D = e(document), S = function () {
            var e = 1;
            return function () {
                return e++
            }
        }(), D.bind("mousemove", function (e) {
            N = {x: e.pageX, y: e.pageY}
        }), D.ready(function () {
            D.bind("mousedown touchend", function (n) {
                var o, i = e(n.target).closest("div.select2-container").get(0), r = null;
                i && (D.find("div.select2-container-active").each(function () {
                    this !== i && e(this).data("select2").blur()
                }), r = e(i).data("select2").dropdown.get(0)), i = r || e(n.target).closest("div.select2-drop").get(0), D.find("div.select2-drop-active").each(function () {
                    this !== i && e(this).data("select2").blur()
                }), i = e(n.target), o = i.attr("for"), "LABEL" === n.target.tagName && o && o.length > 0 && (o = o.replace(/([\[\].])/g, "\\$1"), i = e("#" + o), i = i.data("select2"), i !== t && (i.focus(), n.preventDefault()))
            })
        }), k = x(Object, {
            bind: function (e) {
                var t = this;
                return function () {
                    e.apply(t, arguments)
                }
            }, init: function (n) {
                var o, i, r = ".select2-results";
                this.opts = n = this.prepareOpts(n), this.id = n.id, n.element.data("select2") !== t && null !== n.element.data("select2") && this.destroy(), this.enabled = !0, this.container = this.createContainer(), this.containerId = "s2id_" + (n.element.attr("id") || "autogen" + S()), this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.body = c(function () {
                    return n.element.closest("body")
                }), n.element.attr("class") !== t && this.container.addClass(n.element.attr("class").replace(/validate\[[\S ]+] ?/, "")), this.container.css(v(n.containerCss)), this.container.addClass(v(n.containerCssClass)), this.opts.element.data("select2", this).hide().before(this.container), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), this.dropdown.addClass(v(n.dropdownCssClass)), this.dropdown.data("select2", this), this.results = o = this.container.find(r), this.search = i = this.container.find("input.select2-input"), i.attr("tabIndex", this.opts.element.attr("tabIndex")), this.resultsPage = 0, this.context = null, this.initContainer(), this.initContainerWidth(), a(this.results), this.dropdown.delegate(r, "mousemove-filtered", this.bind(this.highlightUnderEvent)), u(80, this.results), this.dropdown.delegate(r, "scroll-debounced", this.bind(this.loadMoreIfNeeded)), e.fn.mousewheel && o.mousewheel(function (e, t, n, i) {
                    var r = o.scrollTop();
                    i > 0 && 0 >= r - i ? (o.scrollTop(0), d(e)) : 0 > i && o.get(0).scrollHeight - o.scrollTop() + i <= o.height() && (o.scrollTop(o.get(0).scrollHeight - o.height()), d(e))
                }), s(i), i.bind("keyup-change", this.bind(this.updateResults)), i.bind("focus", function () {
                    i.addClass("select2-focused"), " " === i.val() && i.val("")
                }), i.bind("blur", function () {
                    i.removeClass("select2-focused")
                }), this.dropdown.delegate(r, "mouseup", this.bind(function (t) {
                    e(t.target).closest(".select2-result-selectable:not(.select2-disabled)").length > 0 ? (this.highlightUnderEvent(t), this.selectHighlighted(t)) : this.focusSearch(), d(t)
                })), this.dropdown.bind("click mouseup mousedown", function (e) {
                    e.stopPropagation()
                }), e.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), (n.element.is(":disabled") || n.element.is("[readonly='readonly']")) && this.disable()
            }, destroy: function () {
                var e = this.opts.element.data("select2");
                e !== t && (e.container.remove(), e.dropdown.remove(), e.opts.element.removeData("select2").unbind(".select2").show())
            }, prepareOpts: function (n) {
                var r, s, a, l;
                if (r = n.element, "select" === r.get(0).tagName.toLowerCase() && (this.select = s = n.element), s && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                        if (this in n)throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                    }), n = e.extend({}, {
                        populateResults: function (o, i, r) {
                            var s, a = this.opts.id, l = this;
                            (s = function (o, i, c) {
                                var u, d, h, p, f, m, g, b, y, v;
                                for (o = n.sortResults(o, i, r), u = 0, d = o.length; d > u; u += 1)h = o[u], f = h.disabled === !0, p = !f && a(h) !== t, m = h.children && h.children.length > 0, g = e("<li></li>"), g.addClass("select2-results-dept-" + c), g.addClass("select2-result"), g.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"), f && g.addClass("select2-disabled"), m && g.addClass("select2-result-with-children"), g.addClass(l.opts.formatResultCssClass(h)), b = e("<div></div>"), b.addClass("select2-result-label"), v = n.formatResult(h, b, r), v !== t && b.html(v), g.append(b), m && (y = e("<ul></ul>"), y.addClass("select2-result-sub"), s(h.children, y, c + 1), g.append(y)), g.data("select2-data", h), i.append(g)
                            })(i, o, 0)
                        }
                    }, e.fn.select2.defaults, n), "function" != typeof n.id && (a = n.id, n.id = function (e) {
                        return e[a]
                    }), s ? (n.query = this.bind(function (n) {
                        var i, s, a, l = {results: [], more: !1}, c = n.term;
                        a = function (e, t) {
                            var i;
                            e.is("option") ? n.matcher(c, e.text(), e) && t.push({
                                id: e.attr("value"),
                                text: e.text(),
                                element: e.get(),
                                css: e.attr("class"),
                                disabled: o(e.attr("disabled"), "disabled")
                            }) : e.is("optgroup") && (i = {
                                text: e.attr("label"),
                                children: [],
                                element: e.get(),
                                css: e.attr("class")
                            }, e.children().each2(function (e, t) {
                                a(t, i.children)
                            }), i.children.length > 0 && t.push(i))
                        }, i = r.children(), this.getPlaceholder() !== t && i.length > 0 && (s = i[0], "" === e(s).text() && (i = i.not(s))), i.each2(function (e, t) {
                            a(t, l.results)
                        }), n.callback(l)
                    }), n.id = function (e) {
                        return e.id
                    }, n.formatResultCssClass = function (e) {
                        return e.css
                    }) : "query" in n || ("ajax" in n ? (l = n.element.data("ajax-url"), l && l.length > 0 && (n.ajax.url = l), n.query = m(n.ajax)) : "data" in n ? n.query = g(n.data) : "tags" in n && (n.query = b(n.tags), n.createSearchChoice === t && (n.createSearchChoice = function (e) {
                        return {id: e, text: e}
                    }), n.initSelection = function (t, r) {
                        var s = [];
                        e(i(t.val(), n.separator)).each(function () {
                            var t = this, i = this, r = n.tags;
                            e.isFunction(r) && (r = r()), e(r).each(function () {
                                return o(this.id, t) ? (i = this.text, !1) : void 0
                            }), s.push({id: t, text: i})
                        }), r(s)
                    })), "function" != typeof n.query)throw"query function not defined for Select2 " + n.element.attr("id");
                return n
            }, monitorSource: function () {
                this.opts.element.bind("change.select2", this.bind(function () {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                }))
            }, triggerChange: function (t) {
                t = t || {}, t = e.extend({}, t, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(t), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            }, enable: function () {
                this.enabled || (this.enabled = !0, this.container.removeClass("select2-container-disabled"), this.opts.element.removeAttr("disabled"))
            }, disable: function () {
                this.enabled && (this.close(), this.enabled = !1, this.container.addClass("select2-container-disabled"), this.opts.element.attr("disabled", "disabled"))
            }, opened: function () {
                return this.container.hasClass("select2-dropdown-open")
            }, positionDropdown: function () {
                var t, n, o, i = this.container.offset(), r = this.container.outerHeight(!1), s = this.container.outerWidth(!1), a = this.dropdown.outerHeight(!1), l = e(window).scrollLeft() + document.documentElement.clientWidth, c = e(window).scrollTop() + document.documentElement.clientHeight, u = i.top + r, d = i.left, h = c >= u + a, p = i.top - a >= this.body().scrollTop(), f = this.dropdown.outerWidth(!1), m = l >= d + f, g = this.dropdown.hasClass("select2-drop-above");
                "static" !== this.body().css("position") && (t = this.body().offset(), u -= t.top, d -= t.left), g ? (n = !0, !p && h && (n = !1)) : (n = !1, !h && p && (n = !0)), m || (d = i.left + s - f), n ? (u = i.top - a, this.container.addClass("select2-drop-above"), this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")), o = e.extend({
                    top: u,
                    left: d,
                    width: s
                }, v(this.opts.dropdownCss)), this.dropdown.css(o)
            }, shouldOpen: function () {
                var t;
                return this.opened() ? !1 : (t = e.Event("open"), this.opts.element.trigger(t), !t.isDefaultPrevented())
            }, clearDropdownAlignmentPreference: function () {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            }, open: function () {
                return this.shouldOpen() ? (window.setTimeout(this.bind(this.opening), 1), !0) : !1
            }, opening: function () {
                var t = this.containerId, n = this.containerSelector, o = "scroll." + t, i = "resize." + t;
                this.container.parents().each(function () {
                    e(this).bind(o, function () {
                        var t = e(n);
                        0 == t.length && e(this).unbind(o), t.select2("close")
                    })
                }), window.setTimeout(function () {
                    e(window).bind(i, function () {
                        var t = e(n);
                        0 == t.length && e(window).unbind(i), t.select2("close")
                    })
                }, 10), this.clearDropdownAlignmentPreference(), " " === this.search.val() && this.search.val(""), this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.updateResults(!0), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active"), this.ensureHighlightVisible(), this.focusSearch()
            }, close: function () {
                if (this.opened()) {
                    var t = this;
                    this.container.parents().each(function () {
                        e(this).unbind("scroll." + t.containerId)
                    }), e(window).unbind("resize." + this.containerId), this.clearDropdownAlignmentPreference(), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), this.clearSearch(), this.opts.element.trigger(e.Event("close"))
                }
            }, clearSearch: function () {
            }, ensureHighlightVisible: function () {
                var t, n, o, i, r, s, a, l = this.results;
                if (n = this.highlight(), !(0 > n)) {
                    if (0 == n)return void l.scrollTop(0);
                    t = l.find(".select2-result-selectable"), o = e(t[n]), i = o.offset().top + o.outerHeight(!0), n === t.length - 1 && (a = l.find("li.select2-more-results"), a.length > 0 && (i = a.offset().top + a.outerHeight(!0))), r = l.offset().top + l.outerHeight(!0), i > r && l.scrollTop(l.scrollTop() + (i - r)), s = o.offset().top - l.offset().top, 0 > s && "none" != o.css("display") && l.scrollTop(l.scrollTop() + s)
                }
            }, moveHighlight: function (t) {
                for (var n = this.results.find(".select2-result-selectable"), o = this.highlight(); o > -1 && o < n.length;) {
                    o += t;
                    var i = e(n[o]);
                    if (i.hasClass("select2-result-selectable") && !i.hasClass("select2-disabled")) {
                        this.highlight(o);
                        break
                    }
                }
            }, highlight: function (t) {
                var o = this.results.find(".select2-result-selectable").not(".select2-disabled");
                return 0 === arguments.length ? n(o.filter(".select2-highlighted")[0], o.get()) : (t >= o.length && (t = o.length - 1), 0 > t && (t = 0), o.removeClass("select2-highlighted"), e(o[t]).addClass("select2-highlighted"), void this.ensureHighlightVisible())
            }, countSelectableResults: function () {
                return this.results.find(".select2-result-selectable").not(".select2-disabled").length
            }, highlightUnderEvent: function (t) {
                var n = e(t.target).closest(".select2-result-selectable");
                if (n.length > 0 && !n.is(".select2-highlighted")) {
                    var o = this.results.find(".select2-result-selectable");
                    this.highlight(o.index(n))
                } else 0 == n.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            }, loadMoreIfNeeded: function () {
                var e, t = this.results, n = t.find("li.select2-more-results"), o = this.resultsPage + 1, i = this, r = this.search.val(), s = this.context;
                0 !== n.length && (e = n.offset().top - t.offset().top - t.height(), e <= this.opts.loadMorePadding && (n.addClass("select2-active"), this.opts.query({
                    term: r,
                    page: o,
                    context: s,
                    matcher: this.opts.matcher,
                    callback: this.bind(function (e) {
                        i.opened() && (i.opts.populateResults.call(this, t, e.results, {
                            term: r,
                            page: o,
                            context: s
                        }), e.more === !0 ? (n.detach().appendTo(t).text(i.opts.formatLoadMore(o + 1)), window.setTimeout(function () {
                            i.loadMoreIfNeeded()
                        }, 10)) : n.remove(), i.positionDropdown(), i.resultsPage = o)
                    })
                })))
            }, tokenize: function () {
            }, updateResults: function (n) {
                function i() {
                    c.scrollTop(0), l.removeClass("select2-active"), d.positionDropdown()
                }

                function r(e) {
                    c.html(e), i()
                }

                var s, a, l = this.search, c = this.results, u = this.opts, d = this;
                if (n === !0 || this.showSearchInput !== !1 && this.opened()) {
                    if (l.addClass("select2-active"), u.maximumSelectionSize >= 1 && (s = this.data(), e.isArray(s) && s.length >= u.maximumSelectionSize && y(u.formatSelectionTooBig, "formatSelectionTooBig")))return void r("<li class='select2-selection-limit'>" + u.formatSelectionTooBig(u.maximumSelectionSize) + "</li>");
                    if (l.val().length < u.minimumInputLength)return void r(y(u.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + u.formatInputTooShort(l.val(), u.minimumInputLength) + "</li>" : "");
                    if (u.formatSearching() && r("<li class='select2-searching'>" + u.formatSearching() + "</li>"), u.maximumInputLength && l.val().length > u.maximumInputLength)return void r(y(u.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + u.formatInputTooLong(l.val(), u.maximumInputLength) + "</li>" : "");
                    a = this.tokenize(), a != t && null != a && l.val(a), this.resultsPage = 1, u.query({
                        term: l.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: u.matcher,
                        callback: this.bind(function (s) {
                            var a;
                            if (this.opened()) {
                                if (this.context = s.context === t ? null : s.context, this.opts.createSearchChoice && "" !== l.val() && (a = this.opts.createSearchChoice.call(null, l.val(), s.results), a !== t && null !== a && d.id(a) !== t && null !== d.id(a) && 0 === e(s.results).filter(function () {
                                        return o(d.id(this), d.id(a))
                                    }).length && s.results.unshift(a)), 0 === s.results.length && y(u.formatNoMatches, "formatNoMatches"))return void r("<li class='select2-no-results'>" + u.formatNoMatches(l.val()) + "</li>");
                                c.empty(), d.opts.populateResults.call(this, c, s.results, {
                                    term: l.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), s.more === !0 && y(u.formatLoadMore, "formatLoadMore") && (c.append("<li class='select2-more-results'>" + d.opts.escapeMarkup(u.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function () {
                                    d.loadMoreIfNeeded()
                                }, 10)), this.postprocessResults(s, n), i()
                            }
                        })
                    })
                }
            }, cancel: function () {
                this.close()
            }, blur: function () {
                this.opts.selectOnBlur && this.selectHighlighted({noFocus: !0}), this.close(), this.container.removeClass("select2-container-active"), this.dropdown.removeClass("select2-drop-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.opts.element.triggerHandler("blur")
            }, focusSearch: function () {
                this.search.show(), this.search.focus(), window.setTimeout(this.bind(function () {
                    this.search.show(), this.search.focus(), this.search.val(this.search.val())
                }), 10)
            }, selectHighlighted: function (e) {
                var t = this.highlight(), n = this.results.find(".select2-highlighted").not(".select2-disabled"), o = n.closest(".select2-result-selectable").data("select2-data");
                o && (n.addClass("select2-disabled"), this.highlight(t), this.onSelect(o, e))
            }, getPlaceholder: function () {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            }, initContainerWidth: function () {
                function n() {
                    var n, o, i, r, s;
                    if ("off" === this.opts.width)return null;
                    if ("element" === this.opts.width)return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (n = this.opts.element.attr("style"), n !== t)for (o = n.split(";"), r = 0, s = o.length; s > r; r += 1)if (i = o[r].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/), null !== i && i.length >= 1)return i[1];
                        return "resolve" === this.opts.width ? (n = this.opts.element.css("width"), n.indexOf("%") > 0 ? n : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }

                var o = n.call(this);
                null !== o && this.container.attr("style", "width: " + o)
            }
        }), A = x(k, {
            createContainer: function () {
                var t = e("<div></div>", {"class": "select2-container"}).html(["    <a href='javascript:void(0)' onclick='return false;' class='select2-choice'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "    <div class='select2-drop select2-offscreen'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            }, opening: function () {
                this.search.show(), this.parent.opening.apply(this, arguments), this.dropdown.removeClass("select2-offscreen")
            }, close: function () {
                this.opened() && (this.parent.close.apply(this, arguments), this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show())
            }, focus: function () {
                this.close(), this.selection.focus()
            }, isFocused: function () {
                return this.selection[0] === document.activeElement
            }, cancel: function () {
                this.parent.cancel.apply(this, arguments), this.selection.focus()
            }, initContainer: function () {
                var e, t = this.container, n = this.dropdown, o = !1;
                this.selection = e = t.find(".select2-choice"), this.search.bind("keydown", this.bind(function (e) {
                    if (this.enabled) {
                        if (e.which === C.PAGE_UP || e.which === C.PAGE_DOWN)return void d(e);
                        if (this.opened())switch (e.which) {
                            case C.UP:
                            case C.DOWN:
                                return this.moveHighlight(e.which === C.UP ? -1 : 1), void d(e);
                            case C.TAB:
                            case C.ENTER:
                                return this.selectHighlighted(), void d(e);
                            case C.ESC:
                                return this.cancel(e), void d(e)
                        } else {
                            if (e.which === C.TAB || C.isControl(e) || C.isFunctionKey(e) || e.which === C.ESC)return;
                            if (this.opts.openOnEnter === !1 && e.which === C.ENTER)return;
                            if (this.open(), e.which === C.ENTER)return
                        }
                    }
                })), this.search.bind("focus", this.bind(function () {
                    this.selection.attr("tabIndex", "-1")
                })), this.search.bind("blur", this.bind(function () {
                    this.opened() || this.container.removeClass("select2-container-active"), window.setTimeout(this.bind(function () {
                        var e = this.opts.element.attr("tabIndex") || 0;
                        e ? this.selection.attr("tabIndex", e) : this.selection.removeAttr("tabIndex")
                    }), 10)
                })), e.delegate("abbr", "mousedown", this.bind(function (e) {
                    this.enabled && (this.clear(), h(e), this.close(), this.triggerChange(), this.selection.focus())
                })), e.bind("mousedown", this.bind(function () {
                    o = !0, this.opened() ? (this.close(), this.selection.focus()) : this.enabled && this.open(), o = !1
                })), n.bind("mousedown", this.bind(function () {
                    this.search.focus()
                })), e.bind("focus", this.bind(function () {
                    this.container.addClass("select2-container-active"), this.search.attr("tabIndex", "-1")
                })), e.bind("blur", this.bind(function () {
                    this.opened() || this.container.removeClass("select2-container-active"), window.setTimeout(this.bind(function () {
                        this.search.attr("tabIndex", this.opts.element.attr("tabIndex") || 0)
                    }), 10)
                })), e.bind("keydown", this.bind(function (e) {
                    return this.enabled ? e.which == C.DOWN || e.which == C.UP || e.which == C.ENTER && this.opts.openOnEnter ? (this.open(), void d(e)) : e.which == C.DELETE || e.which == C.BACKSPACE ? (this.opts.allowClear && this.clear(), void d(e)) : void 0 : void 0
                })), e.bind("keypress", this.bind(function (e) {
                    var t = String.fromCharCode(e.which);
                    this.search.val(t), this.open()
                })), this.setPlaceholder(), this.search.bind("focus", this.bind(function () {
                    this.container.addClass("select2-container-active")
                }))
            }, clear: function () {
                this.opts.element.val(""), this.selection.find("span").empty(), this.selection.removeData("select2-data"), this.setPlaceholder()
            }, initSelection: function () {
                if ("" === this.opts.element.val() && "" === this.opts.element.text()) this.close(), this.setPlaceholder(); else {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function (n) {
                        n !== t && null !== n && (e.updateSelection(n), e.close(), e.setPlaceholder())
                    })
                }
            }, prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() && (t.initSelection = function (t, n) {
                    var o = t.find(":selected");
                    e.isFunction(n) && n({id: o.attr("value"), text: o.text(), element: o})
                }), t
            }, setPlaceholder: function () {
                var e = this.getPlaceholder();
                if ("" === this.opts.element.val() && e !== t) {
                    if (this.select && "" !== this.select.find("option:first").text())return;
                    this.selection.find("span").html(this.opts.escapeMarkup(e)), this.selection.addClass("select2-default"), this.selection.find("abbr").hide()
                }
            }, postprocessResults: function (t, n) {
                var i = 0, r = this, s = !0;
                this.results.find(".select2-result-selectable").each2(function (e, t) {
                    return o(r.id(t.data("select2-data")), r.opts.element.val()) ? (i = e, !1) : void 0
                }), this.highlight(i), n === !0 && (s = this.showSearchInput = _(t.results) >= this.opts.minimumResultsForSearch, this.dropdown.find(".select2-search")[s ? "removeClass" : "addClass"]("select2-search-hidden"), e(this.dropdown, this.container)[s ? "addClass" : "removeClass"]("select2-with-searchbox"))
            }, onSelect: function (e, t) {
                var n = this.opts.element.val();
                this.opts.element.val(this.id(e)), this.updateSelection(e), this.close(), t && t.noFocus || this.selection.focus(), o(n, this.id(e)) || this.triggerChange()
            }, updateSelection: function (e) {
                var n, o = this.selection.find("span");
                this.selection.data("select2-data", e), o.empty(), n = this.opts.formatSelection(e, o), n !== t && o.append(this.opts.escapeMarkup(n)), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== t && this.selection.find("abbr").show()
            }, val: function () {
                var e, n = null, o = this;
                if (0 === arguments.length)return this.opts.element.val();
                if (e = arguments[0], this.select) this.select.val(e).find(":selected").each2(function (e, t) {
                    return n = {id: t.attr("value"), text: t.text()}, !1
                }), this.updateSelection(n), this.setPlaceholder(), this.triggerChange(); else {
                    if (this.opts.initSelection === t)throw new Error("cannot call val() if initSelection() is not defined");
                    if (!e)return this.clear(), void this.triggerChange();
                    this.opts.element.val(e), this.opts.initSelection(this.opts.element, function (e) {
                        o.opts.element.val(e ? o.id(e) : ""), o.updateSelection(e), o.setPlaceholder(), o.triggerChange()
                    })
                }
            }, clearSearch: function () {
                this.search.val("")
            }, data: function (e) {
                var n;
                return 0 === arguments.length ? (n = this.selection.data("select2-data"), n == t && (n = null), n) : void(e && "" !== e ? (this.opts.element.val(e ? this.id(e) : ""), this.updateSelection(e)) : this.clear())
            }
        }), T = x(k, {
            createContainer: function () {
                var t = e("<div></div>", {"class": "select2-container select2-container-multi"}).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            }, prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() && (t.initSelection = function (t, n) {
                    var o = [];
                    t.find(":selected").each2(function (e, t) {
                        o.push({id: t.attr("value"), text: t.text(), element: t})
                    }), e.isFunction(n) && n(o)
                }), t
            }, initContainer: function () {
                var t, n = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = t = this.container.find(n), this.search.bind("keydown", this.bind(function (e) {
                    if (this.enabled) {
                        if (e.which === C.BACKSPACE && "" === this.search.val()) {
                            this.close();
                            var n, o = t.find(".select2-search-choice-focus");
                            if (o.length > 0)return this.unselect(o.first()), this.search.width(10), void d(e);
                            n = t.find(".select2-search-choice:not(.select2-locked)"), n.length > 0 && n.last().addClass("select2-search-choice-focus")
                        } else t.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened())switch (e.which) {
                            case C.UP:
                            case C.DOWN:
                                return this.moveHighlight(e.which === C.UP ? -1 : 1), void d(e);
                            case C.ENTER:
                            case C.TAB:
                                return this.selectHighlighted(), void d(e);
                            case C.ESC:
                                return this.cancel(e), void d(e)
                        }
                        e.which === C.TAB || C.isControl(e) || C.isFunctionKey(e) || e.which === C.BACKSPACE || e.which === C.ESC || (this.opts.openOnEnter !== !1 || e.which !== C.ENTER) && (this.open(), (e.which === C.PAGE_UP || e.which === C.PAGE_DOWN) && d(e))
                    }
                })), this.search.bind("keyup", this.bind(this.resizeSearch)), this.search.bind("blur", this.bind(function (e) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.clearSearch(), e.stopImmediatePropagation()
                })), this.container.delegate(n, "mousedown", this.bind(function (t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").length > 0 || (this.clearPlaceholder(), this.open(), this.focusSearch(), t.preventDefault()))
                })), this.container.delegate(n, "focus", this.bind(function () {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.clearSearch()
            }, enable: function () {
                this.enabled || (this.parent.enable.apply(this, arguments), this.search.removeAttr("disabled"))
            }, disable: function () {
                this.enabled && (this.parent.disable.apply(this, arguments), this.search.attr("disabled", !0))
            }, initSelection: function () {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function (n) {
                        n !== t && null !== n && (e.updateSelection(n), e.close(), e.clearSearch())
                    })
                }
            }, clearSearch: function () {
                var e = this.getPlaceholder();
                e !== t && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"), this.resizeSearch()) : this.search.val(" ").width(10)
            }, clearPlaceholder: function () {
                this.search.hasClass("select2-default") ? this.search.val("").removeClass("select2-default") : " " === this.search.val() && this.search.val("")
            }, opening: function () {
                this.parent.opening.apply(this, arguments), this.clearPlaceholder(), this.resizeSearch(), this.focusSearch()
            }, close: function () {
                this.opened() && this.parent.close.apply(this, arguments)
            }, focus: function () {
                this.close(), this.search.focus()
            }, isFocused: function () {
                return this.search.hasClass("select2-focused")
            }, updateSelection: function (t) {
                var o = [], i = [], r = this;
                e(t).each(function () {
                    n(r.id(this), o) < 0 && (o.push(r.id(this)), i.push(this))
                }), t = i, this.selection.find(".select2-search-choice").remove(), e(t).each(function () {
                    r.addSelectedChoice(this)
                }), r.postprocessResults()
            }, tokenize: function () {
                var e = this.search.val();
                e = this.opts.tokenizer(e, this.data(), this.bind(this.onSelect), this.opts), null != e && e != t && (this.search.val(e), e.length > 0 && this.open())
            }, onSelect: function (e, t) {
                this.addSelectedChoice(e), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.positionDropdown()) : this.close(), this.triggerChange({added: e}), t && t.noFocus || this.focusSearch()
            }, cancel: function () {
                this.close(), this.focusSearch()
            }, addSelectedChoice: function (n) {
                var o, i = !n.locked, r = e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), s = e("<li class='select2-search-choice select2-locked'><div></div></li>"), a = i ? r : s, l = this.id(n), c = this.getVal();
                o = this.opts.formatSelection(n, a.find("div")), o != t && a.find("div").replaceWith("<div>" + this.opts.escapeMarkup(o) + "</div>"), i && a.find(".select2-search-choice-close").bind("mousedown", d).bind("click dblclick", this.bind(function (t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function () {
                        this.unselect(e(t.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                    })).dequeue(), d(t))
                })).bind("focus", this.bind(function () {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), a.data("select2-data", n), a.insertBefore(this.searchContainer), c.push(l), this.setVal(c)
            }, unselect: function (e) {
                var t, o, i = this.getVal();
                if (e = e.closest(".select2-search-choice"), 0 === e.length)throw"Invalid argument: " + e + ". Must be .select2-search-choice";
                t = e.data("select2-data"), o = n(this.id(t), i), o >= 0 && (i.splice(o, 1), this.setVal(i), this.select && this.postprocessResults()), e.remove(), this.triggerChange({removed: t})
            }, postprocessResults: function () {
                var e = this.getVal(), t = this.results.find(".select2-result-selectable"), o = this.results.find(".select2-result-with-children"), i = this;
                t.each2(function (t, o) {
                    var r = i.id(o.data("select2-data"));
                    n(r, e) >= 0 ? o.addClass("select2-disabled").removeClass("select2-result-selectable") : o.removeClass("select2-disabled").addClass("select2-result-selectable")
                }), o.each2(function (e, t) {
                    t.is(".select2-result-selectable") || 0 != t.find(".select2-result-selectable").length ? t.removeClass("select2-disabled") : t.addClass("select2-disabled")
                }), -1 == this.highlight() && t.each2(function (e, t) {
                    return !t.hasClass("select2-disabled") && t.hasClass("select2-result-selectable") ? (i.highlight(0), !1) : void 0
                })
            }, resizeSearch: function () {
                var e, t, n, o, i, s = r(this.search);
                e = p(this.search) + 10, t = this.search.offset().left, n = this.selection.width(), o = this.selection.offset().left, i = n - (t - o) - s, e > i && (i = n - s), 40 > i && (i = n - s), 0 >= i && (i = e), this.search.width(i)
            }, getVal: function () {
                var e;
                return this.select ? (e = this.select.val(), null === e ? [] : e) : (e = this.opts.element.val(), i(e, this.opts.separator))
            }, setVal: function (t) {
                var o;
                this.select ? this.select.val(t) : (o = [], e(t).each(function () {
                    n(this, o) < 0 && o.push(this)
                }), this.opts.element.val(0 === o.length ? "" : o.join(this.opts.separator)))
            }, val: function () {
                var n, o = [], i = this;
                if (0 === arguments.length)return this.getVal();
                if (n = arguments[0], !n)return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void this.triggerChange();
                if (this.setVal(n), this.select) this.select.find(":selected").each(function () {
                    o.push({id: e(this).attr("value"), text: e(this).text()})
                }), this.updateSelection(o), this.triggerChange(); else {
                    if (this.opts.initSelection === t)throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function (t) {
                        var n = e(t).map(i.id);
                        i.setVal(n), i.updateSelection(t), i.clearSearch(), i.triggerChange()
                    })
                }
                this.clearSearch()
            }, onSortStart: function () {
                if (this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            }, onSortEnd: function () {
                var t = [], n = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
                    t.push(n.opts.id(e(this).data("select2-data")))
                }), this.setVal(t), this.triggerChange()
            }, data: function (t) {
                var n, o = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function () {
                    return e(this).data("select2-data")
                }).get() : (t || (t = []), n = e.map(t, function (e) {
                    return o.opts.id(e)
                }), this.setVal(n), this.updateSelection(t), this.clearSearch(), void 0)
            }
        }), e.fn.select2 = function () {
            var o, i, r, s, a = Array.prototype.slice.call(arguments, 0), l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
            return this.each(function () {
                if (0 === a.length || "object" == typeof a[0]) o = 0 === a.length ? {} : e.extend({}, a[0]), o.element = e(this), "select" === o.element.get(0).tagName.toLowerCase() ? s = o.element.attr("multiple") : (s = o.multiple || !1, "tags" in o && (o.multiple = s = !0)), i = s ? new T : new A, i.init(o); else {
                    if ("string" != typeof a[0])throw"Invalid arguments to select2 plugin: " + a;
                    if (n(a[0], l) < 0)throw"Unknown method: " + a[0];
                    if (r = t, i = e(this).data("select2"), i === t)return;
                    if (r = "container" === a[0] ? i.container : i[a[0]].apply(i, a.slice(1)), r !== t)return !1
                }
            }), r === t ? this : r
        }, e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function (e, t, n) {
                var o = [];
                return f(e.text, n.term, o, this.escapeMarkup), o.join("")
            },
            formatSelection: function (e) {
                return e ? e.text : t
            },
            sortResults: function (e) {
                return e
            },
            formatResultCssClass: function () {
                return t
            },
            formatNoMatches: function () {
                return "No matches found"
            },
            formatInputTooShort: function (e, t) {
                var n = t - e.length;
                return "Please enter " + n + " more character" + (1 == n ? "" : "s")
            },
            formatInputTooLong: function (e, t) {
                var n = e.length - t;
                return "Please enter " + n + " less character" + (1 == n ? "" : "s")
            },
            formatSelectionTooBig: function (e) {
                return "You can only select " + e + " item" + (1 == e ? "" : "s")
            },
            formatLoadMore: function () {
                return "Loading more results..."
            },
            formatSearching: function () {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function (e) {
                return e.id
            },
            matcher: function (e, t) {
                return t.toUpperCase().indexOf(e.toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: w,
            escapeMarkup: function (e) {
                var t = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&apos;",
                    "/": "&#47;"
                };
                return String(e).replace(/[&<>"'/\\]/g, function (e) {
                    return t[e[0]]
                })
            },
            blurOnChange: !1,
            selectOnBlur: !1
        }, window.Select2 = {
            query: {ajax: m, local: g, tags: b},
            util: {debounce: l, markMatch: f},
            "class": {"abstract": k, single: A, multi: T}
        }
    }
}(jQuery), function (e) {
    function t(e, t, i) {
        var r = e[0], s = /er/.test(i) ? _indeterminate : /bl/.test(i) ? f : h, a = i == _update ? {
            checked: r[h],
            disabled: r[f],
            indeterminate: "true" == e.attr(_indeterminate) || "false" == e.attr(_determinate)
        } : r[s];
        if (/^(ch|di|in)/.test(i) && !a) n(e, s); else if (/^(un|en|de)/.test(i) && a) o(e, s); else if (i == _update)for (var l in a)a[l] ? n(e, l, !0) : o(e, l, !0); else t && "toggle" != i || (t || e[_callback]("ifClicked"), a ? r[_type] !== d && o(e, s) : n(e, s))
    }

    function n(t, n, i) {
        var u = t[0], m = t.parent(), g = n == h, b = n == _indeterminate, y = n == f, v = b ? _determinate : g ? p : "enabled", _ = r(t, v + s(u[_type])), w = r(t, n + s(u[_type]));
        if (u[n] !== !0) {
            if (!i && n == h && u[_type] == d && u.name) {
                var x = t.closest("form"), C = 'input[name="' + u.name + '"]';
                C = x.length ? x.find(C) : e(C), C.each(function () {
                    this !== u && e(this).data(l) && o(e(this), n)
                })
            }
            b ? (u[n] = !0, u[h] && o(t, h, "force")) : (i || (u[n] = !0), g && u[_indeterminate] && o(t, _indeterminate, !1)), a(t, g, n, i)
        }
        u[f] && r(t, _cursor, !0) && m.find("." + c).css(_cursor, "default"), m[_add](w || r(t, n) || ""), m.attr("role") && !b && m.attr("aria-" + (y ? f : h), "true"), m[_remove](_ || r(t, v) || "")
    }

    function o(e, t, n) {
        var o = e[0], i = e.parent(), l = t == h, u = t == _indeterminate, d = t == f, m = u ? _determinate : l ? p : "enabled", g = r(e, m + s(o[_type])), b = r(e, t + s(o[_type]));
        o[t] !== !1 && ((u || !n || "force" == n) && (o[t] = !1), a(e, l, m, n)), !o[f] && r(e, _cursor, !0) && i.find("." + c).css(_cursor, "pointer"), i[_remove](b || r(e, t) || ""), i.attr("role") && !u && i.attr("aria-" + (d ? f : h), "false"), i[_add](g || r(e, m) || "")
    }

    function i(t, n) {
        t.data(l) && (t.parent().html(t.attr("style", t.data(l).s || "")), n && t[_callback](n), t.off(".i").unwrap(), e(_label + '[for="' + t[0].id + '"]').add(t.closest(_label)).off(".i"))
    }

    function r(e, t, n) {
        return e.data(l) ? e.data(l).o[t + (n ? "" : "Class")] : void 0
    }

    function s(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function a(e, t, n, o) {
        o || (t && e[_callback]("ifToggled"), e[_callback]("ifChanged")[_callback]("if" + s(n)))
    }

    var l = "iCheck", c = l + "-helper", u = "checkbox", d = "radio", h = "checked", p = "un" + h, f = "disabled";
    _determinate = "determinate", _indeterminate = "in" + _determinate, _update = "update", _type = "type", _click = "click", _touch = "touchbegin.i touchend.i", _add = "addClass", _remove = "removeClass", _callback = "trigger", _label = "label", _cursor = "cursor", _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent), e.fn[l] = function (r, s) {
        var a = 'input[type="' + u + '"], input[type="' + d + '"]', p = e(), m = function (t) {
            t.each(function () {
                var t = e(this);
                p = p.add(t.is(a) ? t : t.find(a))
            })
        };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(r))return r = r.toLowerCase(), m(this), p.each(function () {
            var n = e(this);
            "destroy" == r ? i(n, "ifDestroyed") : t(n, !0, r), e.isFunction(s) && s()
        });
        if ("object" != typeof r && r)return this;
        var g = e.extend({
            checkedClass: h,
            disabledClass: f,
            indeterminateClass: _indeterminate,
            labelHover: !0
        }, r), b = g.handle, y = g.hoverClass || "hover", v = g.focusClass || "focus", _ = g.activeClass || "active", w = !!g.labelHover, x = g.labelHoverClass || "hover", C = 0 | ("" + g.increaseArea).replace("%", "");
        return (b == u || b == d) && (a = 'input[type="' + b + '"]'), -50 > C && (C = -50), m(this), p.each(function () {
            var r = e(this);
            i(r);
            var s, a = this, p = a.id, m = -C + "%", b = 100 + 2 * C + "%", k = {
                position: "absolute",
                top: m,
                left: m,
                display: "block",
                width: b,
                height: b,
                margin: 0,
                padding: 0,
                background: "#fff",
                border: 0,
                opacity: 0
            }, A = _mobile ? {position: "absolute", visibility: "hidden"} : C ? k : {
                position: "absolute",
                opacity: 0
            }, T = a[_type] == u ? g.checkboxClass || "i" + u : g.radioClass || "i" + d, S = e(_label + '[for="' + p + '"]').add(r.closest(_label)), E = !!g.aria, N = l + "-" + Math.random().toString(36).substr(2, 6), D = '<div class="' + T + '" ' + (E ? 'role="' + a[_type] + '" ' : "");
            E && S.each(function () {
                D += 'aria-labelledby="', this.id ? D += this.id : (this.id = N, D += N), D += '"'
            }), D = r.wrap(D + "/>")[_callback]("ifCreated").parent().append(g.insert), s = e('<ins class="' + c + '"/>').css(k).appendTo(D), r.data(l, {
                o: g,
                s: r.attr("style")
            }).css(A), !!g.inheritClass && D[_add](a.className || ""), !!g.inheritID && p && D.attr("id", l + "-" + p), "static" == D.css("position") && D.css("position", "relative"), t(r, !0, _update), S.length && S.on(_click + ".i mouseover.i mouseout.i " + _touch, function (n) {
                var o = n[_type], i = e(this);
                if (!a[f]) {
                    if (o == _click) {
                        if (e(n.target).is("a"))return;
                        t(r, !1, !0)
                    } else w && (/ut|nd/.test(o) ? (D[_remove](y), i[_remove](x)) : (D[_add](y), i[_add](x)));
                    if (!_mobile)return !1;
                    n.stopPropagation()
                }
            }), r.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (e) {
                var t = e[_type], i = e.keyCode;
                return t == _click ? !1 : "keydown" == t && 32 == i ? (a[_type] == d && a[h] || (a[h] ? o(r, h) : n(r, h)), !1) : void("keyup" == t && a[_type] == d ? !a[h] && n(r, h) : /us|ur/.test(t) && D["blur" == t ? _remove : _add](v))
            }), s.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function (e) {
                var n = e[_type], o = /wn|up/.test(n) ? _ : y;
                if (!a[f]) {
                    if (n == _click ? t(r, !1, !0) : (/wn|er|in/.test(n) ? D[_add](o) : D[_remove](o + " " + _), S.length && w && o == y && S[/ut|nd/.test(n) ? _remove : _add](x)), !_mobile)return !1;
                    e.stopPropagation()
                }
            })
        })
    }
}(window.jQuery || window.Zepto), "function" != typeof Object.create && (Object.create = function (e) {
    function t() {
    }

    return t.prototype = e, new t
}), function (e) {
    var t = {
        init: function (t) {
            return this.options = e.extend({}, e.noty.defaults, t), this.options.layout = this.options.custom ? e.noty.layouts.inline : e.noty.layouts[this.options.layout], this.options.theme = e.noty.themes[this.options.theme], delete t.layout, delete t.theme, this.options = e.extend({}, this.options, this.options.layout.options), this.options.id = "noty_" + (new Date).getTime() * Math.floor(1e6 * Math.random()), this.options = e.extend({}, this.options, t), this._build(), this
        }, _build: function () {
            var t = e('<div class="noty_bar"></div>').attr("id", this.options.id);
            if (t.append(this.options.template).find(".noty_text").html(this.options.text), this.$bar = null !== this.options.layout.parent.object ? e(this.options.layout.parent.object).css(this.options.layout.parent.css).append(t) : t, this.options.buttons) {
                this.options.closeWith = [], this.options.timeout = !1;
                var n = e("<div/>").addClass("noty_buttons");
                null !== this.options.layout.parent.object ? this.$bar.find(".noty_bar").append(n) : this.$bar.append(n);
                var o = this;
                e.each(this.options.buttons, function (t, n) {
                    var i = e("<button/>").addClass(n.addClass ? n.addClass : "gray").html(n.text).appendTo(o.$bar.find(".noty_buttons")).bind("click", function () {
                        e.isFunction(n.onClick) && n.onClick.call(i, o)
                    })
                })
            }
            this.$message = this.$bar.find(".noty_message"), this.$closeButton = this.$bar.find(".noty_close"), this.$buttons = this.$bar.find(".noty_buttons"), e.noty.store[this.options.id] = this
        }, show: function () {
            var t = this;
            return e(t.options.layout.container.selector).append(t.$bar), t.options.theme.style.apply(t), "function" === e.type(t.options.layout.css) ? this.options.layout.css.apply(t.$bar) : t.$bar.css(this.options.layout.css || {}), t.$bar.addClass(t.options.layout.addClass), t.options.layout.container.style.apply(e(t.options.layout.container.selector)), t.options.theme.callback.onShow.apply(this), e.inArray("click", t.options.closeWith) > -1 && t.$bar.css("cursor", "pointer").one("click", function () {
                t.close()
            }), e.inArray("hover", t.options.closeWith) > -1 && t.$bar.one("mouseenter", function () {
                t.close()
            }), e.inArray("button", t.options.closeWith) > -1 && t.$closeButton.one("click", function () {
                t.close()
            }), -1 == e.inArray("button", t.options.closeWith) && t.$closeButton.remove(), t.options.callback.onShow && t.options.callback.onShow.apply(t), t.$bar.animate(t.options.animation.open, t.options.animation.speed, t.options.animation.easing, function () {
                t.options.callback.afterShow && t.options.callback.afterShow.apply(t), t.shown = !0
            }), t.options.timeout && t.$bar.delay(t.options.timeout).promise().done(function () {
                t.close()
            }), this
        }, close: function () {
            if (!this.closed) {
                var t = this;
                if (!this.shown) {
                    var n = [];
                    return e.each(e.noty.queue, function (e, o) {
                        o.options.id != t.options.id && n.push(o)
                    }), void(e.noty.queue = n)
                }
                t.$bar.addClass("i-am-closing-now"), t.options.callback.onClose && t.options.callback.onClose.apply(t), t.$bar.clearQueue().stop().animate(t.options.animation.close, t.options.animation.speed, t.options.animation.easing, function () {
                    t.options.callback.afterClose && t.options.callback.afterClose.apply(t)
                }).promise().done(function () {
                    t.options.modal && (e.notyRenderer.setModalCount(-1), 0 == e.notyRenderer.getModalCount() && e(".noty_modal").fadeOut("fast", function () {
                        e(this).remove()
                    })), e.notyRenderer.setLayoutCountFor(t, -1), 0 == e.notyRenderer.getLayoutCountFor(t) && e(t.options.layout.container.selector).remove(), "undefined" != typeof t.$bar && null !== t.$bar && (t.$bar.remove(), t.$bar = null, t.closed = !0), delete e.noty.store[t.options.id], t.options.theme.callback.onClose.apply(t), t.options.dismissQueue || (e.noty.ontap = !0, e.notyRenderer.render())
                })
            }
        }, setText: function (e) {
            return this.closed || (this.options.text = e, this.$bar.find(".noty_text").html(e)), this
        }, setType: function (e) {
            return this.closed || (this.options.type = e, this.options.theme.style.apply(this), this.options.theme.callback.onShow.apply(this)), this
        }, setTimeout: function (e) {
            if (!this.closed) {
                var t = this;
                this.options.timeout = e, t.$bar.delay(t.options.timeout).promise().done(function () {
                    t.close()
                })
            }
            return this
        }, closed: !1, shown: !1
    };
    e.notyRenderer = {}, e.notyRenderer.init = function (n) {
        var o = Object.create(t).init(n);
        return o.options.force ? e.noty.queue.unshift(o) : e.noty.queue.push(o), e.notyRenderer.render(), "object" == e.noty.returns ? o : o.options.id
    }, e.notyRenderer.render = function () {
        var t = e.noty.queue[0];
        "object" === e.type(t) ? t.options.dismissQueue ? e.notyRenderer.show(e.noty.queue.shift()) : e.noty.ontap && (e.notyRenderer.show(e.noty.queue.shift()), e.noty.ontap = !1) : e.noty.ontap = !0
    }, e.notyRenderer.show = function (t) {
        t.options.modal && (e.notyRenderer.createModalFor(t), e.notyRenderer.setModalCount(1)), 0 == e(t.options.layout.container.selector).length ? t.options.custom ? t.options.custom.append(e(t.options.layout.container.object).addClass("i-am-new")) : e("body").append(e(t.options.layout.container.object).addClass("i-am-new")) : e(t.options.layout.container.selector).removeClass("i-am-new"), e.notyRenderer.setLayoutCountFor(t, 1), t.show()
    }, e.notyRenderer.createModalFor = function (t) {
        0 == e(".noty_modal").length && e("<div/>").addClass("noty_modal").data("noty_modal_count", 0).css(t.options.theme.modal.css).prependTo(e("body")).fadeIn("fast")
    }, e.notyRenderer.getLayoutCountFor = function (t) {
        return e(t.options.layout.container.selector).data("noty_layout_count") || 0
    }, e.notyRenderer.setLayoutCountFor = function (t, n) {
        return e(t.options.layout.container.selector).data("noty_layout_count", e.notyRenderer.getLayoutCountFor(t) + n)
    }, e.notyRenderer.getModalCount = function () {
        return e(".noty_modal").data("noty_modal_count") || 0
    }, e.notyRenderer.setModalCount = function (t) {
        return e(".noty_modal").data("noty_modal_count", e.notyRenderer.getModalCount() + t)
    }, e.fn.noty = function (t) {
        return t.custom = e(this), e.notyRenderer.init(t)
    }, e.noty = {}, e.noty.queue = [], e.noty.ontap = !0, e.noty.layouts = {}, e.noty.themes = {}, e.noty.returns = "object", e.noty.store = {}, e.noty.get = function (t) {
        return e.noty.store.hasOwnProperty(t) ? e.noty.store[t] : !1
    }, e.noty.close = function (t) {
        return e.noty.get(t) ? e.noty.get(t).close() : !1
    }, e.noty.setText = function (t, n) {
        return e.noty.get(t) ? e.noty.get(t).setText(n) : !1
    }, e.noty.setType = function (t, n) {
        return e.noty.get(t) ? e.noty.get(t).setType(n) : !1
    }, e.noty.clearQueue = function () {
        e.noty.queue = []
    }, e.noty.closeAll = function () {
        e.noty.clearQueue(), e.each(e.noty.store, function (e, t) {
            t.close()
        })
    };
    var n = window.alert;
    e.noty.consumeAlert = function (t) {
        window.alert = function (n) {
            t ? t.text = n : t = {text: n}, e.notyRenderer.init(t)
        }
    }, e.noty.stopConsumeAlert = function () {
        window.alert = n
    }, e.noty.defaults = {
        layout: "top",
        theme: "defaultTheme",
        type: "alert",
        text: "",
        dismissQueue: !0,
        template: '<div class="noty_message"><div class="noty_close"></div><span class="noty_text"></span></div>',
        animation: {open: {height: "toggle"}, close: {height: "toggle"}, easing: "swing", speed: 500},
        timeout: !1,
        force: !1,
        modal: !1,
        closeWith: ["click"],
        callback: {
            onShow: function () {
            }, afterShow: function () {
            }, onClose: function () {
            }, afterClose: function () {
            }
        },
        buttons: !1
    }, e(window).resize(function () {
        e.each(e.noty.layouts, function (t, n) {
            n.container.style.apply(e(n.container.selector))
        })
    })
}(jQuery), function (e) {
    e.noty.layouts.bottom = {
        name: "bottom",
        options: {},
        container: {
            object: '<ul id="noty_bottom_layout_container" />',
            selector: "ul#noty_bottom_layout_container",
            style: function () {
                e(this).css({
                    bottom: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.bottomCenter = {
        name: "bottomCenter",
        options: {},
        container: {
            object: '<ul id="noty_bottomCenter_layout_container" />',
            selector: "ul#noty_bottomCenter_layout_container",
            style: function () {
                e(this).css({
                    bottom: 20,
                    left: 0,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), e(this).css({left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.bottomLeft = {
        name: "bottomLeft",
        options: {},
        container: {
            object: '<ul id="noty_bottomLeft_layout_container" />',
            selector: "ul#noty_bottomLeft_layout_container",
            style: function () {
                e(this).css({
                    bottom: 20,
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && e(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.bottomRight = {
        name: "bottomRight",
        options: {},
        container: {
            object: '<ul id="noty_bottomRight_layout_container" />',
            selector: "ul#noty_bottomRight_layout_container",
            style: function () {
                e(this).css({
                    bottom: 20,
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && e(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.center = {
        name: "center",
        options: {},
        container: {
            object: '<ul id="noty_center_layout_container" />',
            selector: "ul#noty_center_layout_container",
            style: function () {
                e(this).css({
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t), t.find(".i-am-closing-now").remove(), t.find("li").css("display", "block");
                var n = t.height();
                t.remove(), e(this).hasClass("i-am-new") ? e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }, 500)
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.centerLeft = {
        name: "centerLeft",
        options: {},
        container: {
            object: '<ul id="noty_centerLeft_layout_container" />',
            selector: "ul#noty_centerLeft_layout_container",
            style: function () {
                e(this).css({
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t), t.find(".i-am-closing-now").remove(), t.find("li").css("display", "block");
                var n = t.height();
                t.remove(), e(this).hasClass("i-am-new") ? e(this).css({top: (e(window).height() - n) / 2 + "px"}) : e(this).animate({top: (e(window).height() - n) / 2 + "px"}, 500), window.innerWidth < 600 && e(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.centerRight = {
        name: "centerRight",
        options: {},
        container: {
            object: '<ul id="noty_centerRight_layout_container" />',
            selector: "ul#noty_centerRight_layout_container",
            style: function () {
                e(this).css({
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t), t.find(".i-am-closing-now").remove(), t.find("li").css("display", "block");
                var n = t.height();
                t.remove(), e(this).hasClass("i-am-new") ? e(this).css({top: (e(window).height() - n) / 2 + "px"}) : e(this).animate({top: (e(window).height() - n) / 2 + "px"}, 500), window.innerWidth < 600 && e(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.inline = {
        name: "inline",
        options: {},
        container: {
            object: '<ul id="noty_inline_layout_container" />',
            selector: "ul#noty_inline_layout_container",
            style: function () {
                e(this).css({
                    width: "100%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.maleskineCenter = {
        name: "maleskineCenter",
        options: {},
        container: {
            object: '<ul id="noty_center_layout_container" />',
            selector: "ul#noty_center_layout_container",
            style: function () {
                width = e.noty.layouts.maleskineCenter.css.width, e(this).css({
                    position: "fixed",
                    width: width,
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), e(this).addClass("maleskine-confirm-center");
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t), t.find(".i-am-closing-now").remove(), t.find("li").css("display", "block");
                var n = t.height();
                t.remove(), e(this).hasClass("i-am-new") ? e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }, 500)
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: "",
        defaultWidth: "310px"
    }
}(jQuery), function (e) {
    e.noty.layouts.maleskineTopCenter = {
        name: "maleskineTopCenter",
        options: {},
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: "ul#noty_topCenter_layout_container",
            style: function () {
                e(this).css({
                    top: 0,
                    left: 0,
                    position: "fixed",
                    width: "500px",
                    height: "auto",
                    listStyleType: "none",
                    zIndex: 1e7
                }), e(this).addClass("top-center-with-action"), e(this).find(".noty_close").css("display", "block"), e(this).css({left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.maleskineTopRight = {
        name: "maleskineTopRight",
        options: {},
        container: {
            object: '<ul id="noty_topRight_layout_container" />',
            selector: "ul#noty_topRight_layout_container",
            style: function () {
                e(this).css({
                    top: 10,
                    right: 10,
                    position: "fixed",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), e(this).addClass("maleskine-top-right"), window.innerWidth < 600 && e(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.top = {
        name: "top",
        options: {},
        container: {
            object: '<ul id="noty_top_layout_container" />',
            selector: "ul#noty_top_layout_container",
            style: function () {
                e(this).css({
                    top: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.topCenter = {
        name: "topCenter",
        options: {},
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: "ul#noty_topCenter_layout_container",
            style: function () {
                e(this).css({
                    top: 20,
                    left: 0,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }), e(this).css({left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.topLeft = {
        name: "topLeft",
        options: {},
        container: {
            object: '<ul id="noty_topLeft_layout_container" />',
            selector: "ul#noty_topLeft_layout_container",
            style: function () {
                e(this).css({
                    top: 20,
                    left: 20,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && e(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.layouts.topRight = {
        name: "topRight",
        options: {},
        container: {
            object: '<ul id="noty_topRight_layout_container" />',
            selector: "ul#noty_topRight_layout_container",
            style: function () {
                e(this).css({
                    top: 20,
                    right: 20,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && e(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }
}(jQuery), function (e) {
    e.noty.themes.defaultTheme = {
        name: "defaultTheme",
        helpers: {
            borderFix: function () {
                if (this.options.dismissQueue) {
                    var t = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                        case"top":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).last().css({borderRadius: "0px 0px 5px 5px"});
                            break;
                        case"topCenter":
                        case"topLeft":
                        case"topRight":
                        case"bottomCenter":
                        case"bottomLeft":
                        case"bottomRight":
                        case"center":
                        case"centerLeft":
                        case"centerRight":
                        case"inline":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).first().css({
                                "border-top-left-radius": "5px",
                                "border-top-right-radius": "5px"
                            }), e(t).last().css({
                                "border-bottom-left-radius": "5px",
                                "border-bottom-right-radius": "5px"
                            });
                            break;
                        case"bottom":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).first().css({borderRadius: "5px 5px 0px 0px"})
                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function () {
            switch (this.$bar.css({
                overflow: "hidden",
                background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==') repeat-x scroll left top #fff"
            }), this.$message.css({
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "8px 10px 9px",
                width: "auto",
                position: "relative"
            }), this.$closeButton.css({
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 5,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            }), this.$buttons.find("button").css({marginLeft: 5}), this.$buttons.find("button:first").css({marginLeft: 0}), this.$bar.bind({
                mouseenter: function () {
                    e(this).find(".noty_close").fadeIn()
                }, mouseleave: function () {
                    e(this).find(".noty_close").fadeOut()
                }
            }), this.options.layout.name) {
                case"top":
                    this.$bar.css({
                        borderRadius: "0px 0px 5px 5px",
                        borderBottom: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                case"topCenter":
                case"center":
                case"bottomCenter":
                case"inline":
                    this.$bar.css({
                        borderRadius: "5px",
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({fontSize: "13px", textAlign: "center"});
                    break;
                case"topLeft":
                case"topRight":
                case"bottomLeft":
                case"bottomRight":
                case"centerLeft":
                case"centerRight":
                    this.$bar.css({
                        borderRadius: "5px",
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({fontSize: "13px", textAlign: "left"});
                    break;
                case"bottom":
                    this.$bar.css({
                        borderRadius: "5px 5px 0px 0px",
                        borderTop: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                default:
                    this.$bar.css({border: "2px solid #eee", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"})
            }
            switch (this.options.type) {
                case"alert":
                case"notification":
                    this.$bar.css({backgroundColor: "#FFF", borderColor: "#CCC", color: "#444"});
                    break;
                case"warning":
                    this.$bar.css({
                        backgroundColor: "#FFEAA8",
                        borderColor: "#FFC237",
                        color: "#826200"
                    }), this.$buttons.css({borderTop: "1px solid #FFC237"});
                    break;
                case"error":
                    this.$bar.css({
                        backgroundColor: "red",
                        borderColor: "darkred",
                        color: "#FFF"
                    }), this.$message.css({fontWeight: "bold"}), this.$buttons.css({borderTop: "1px solid darkred"});
                    break;
                case"information":
                    this.$bar.css({
                        backgroundColor: "#57B7E2",
                        borderColor: "#0B90C4",
                        color: "#FFF"
                    }), this.$buttons.css({borderTop: "1px solid #0B90C4"});
                    break;
                case"success":
                    this.$bar.css({
                        backgroundColor: "lightgreen",
                        borderColor: "#50C24E",
                        color: "darkgreen"
                    }), this.$buttons.css({borderTop: "1px solid #50C24E"});
                    break;
                default:
                    this.$bar.css({backgroundColor: "#FFF", borderColor: "#CCC", color: "#444"})
            }
        },
        callback: {
            onShow: function () {
                e.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            }, onClose: function () {
                e.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            }
        }
    }
}(jQuery), function (e) {
    e.noty.themes.maleskineTheme = {
        name: "maleskineTheme",
        helpers: {
            borderFix: function () {
                if (this.options.dismissQueue) {
                    var t = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                        case"top":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).last().css({borderRadius: "0px 0px 5px 5px"});
                            break;
                        case"topCenter":
                        case"topLeft":
                        case"topRight":
                        case"maleskineTopCenter":
                        case"maleskineTopRight":
                        case"bottomCenter":
                        case"bottomLeft":
                        case"bottomRight":
                        case"center":
                        case"centerLeft":
                        case"centerRight":
                        case"inline":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).first().css({
                                "border-top-left-radius": "5px",
                                "border-top-right-radius": "5px"
                            }), e(t).last().css({
                                "border-bottom-left-radius": "5px",
                                "border-bottom-right-radius": "5px"
                            });
                            break;
                        case"maleskineCenter":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).first().css({
                                "border-top-left-radius": "5px",
                                "border-top-right-radius": "5px"
                            }), e(t).last().css({
                                "border-bottom-left-radius": "5px",
                                "border-bottom-right-radius": "5px"
                            });
                            break;
                        case"bottom":
                            e(t).css({borderRadius: "0px 0px 0px 0px"}), e(t).first().css({borderRadius: "5px 5px 0px 0px"})
                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "$white",
                zIndex: 1e4,
                opacity: .95,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function () {
            switch (this.$bar.css({overflow: "hidden"}), this.$message.css({}), this.$closeButton.css({
                "float": "right",
                margin: "4px 0 0 10px",
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 10,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#f5f5f5"
            }), this.$buttons.find("button").css({marginLeft: 5}), this.$buttons.find("button:first").css({marginLeft: 0}), this.options.layout.name) {
                case"top":
                    this.$bar.css({});
                    break;
                case"topCenter":
                case"center":
                case"bottomCenter":
                case"inline":
                case"maleskineCenter":
                case"maleskineTopCenter":
                    this.$bar.css({}), this.$message.css({fontSize: "13px", textAlign: "center"});
                    break;
                case"topLeft":
                case"topRight":
                case"maleskineTopRight":
                case"bottomLeft":
                case"bottomRight":
                case"centerLeft":
                case"centerRight":
                    this.$bar.css({}), this.$message.css({fontSize: "13px", textAlign: "left"});
                    break;
                case"bottom":
                    this.$bar.css({});
                    break;
                default:
                    this.$bar.css({})
            }
            switch (this.options.type) {
                case"alert":
                case"notification":
                    this.$bar.css({backgroundColor: "#FFF", borderColor: "#CCC", color: "#444"});
                    break;
                case"warning":
                    this.$bar.css({
                        backgroundColor: "#FFEAA8",
                        borderColor: "#FFC237",
                        color: "#826200"
                    }), this.$buttons.css({borderTop: "1px solid #FFC237"});
                    break;
                case"error":
                    this.$bar.css({
                        backgroundColor: "#e58c7c",
                        borderColor: "darkred",
                        color: "#FFF"
                    }), this.$message.css({fontWeight: "bold"}), this.$buttons.css({borderTop: "1px solid darkred"});
                    break;
                case"information":
                    this.$bar.css({
                        backgroundColor: "#57B7E2",
                        borderColor: "#0B90C4",
                        color: "#FFF"
                    }), this.$buttons.css({borderTop: "1px solid #0B90C4"});
                    break;
                case"maleskineInformation":
                    this.$bar.css({}), this.$buttons.css({borderTop: "1px solid #0B90C4"});
                    break;
                case"success":
                    this.$bar.css({
                        backgroundColor: "lightgreen",
                        borderColor: "#50C24E",
                        color: "darkgreen"
                    }), this.$buttons.css({borderTop: "1px solid #50C24E"});
                    break;
                default:
                    this.$bar.css({backgroundColor: "#FFF", borderColor: "#CCC", color: "#444"})
            }
        },
        callback: {
            onShow: function () {
                e.noty.themes.maleskineTheme.helpers.borderFix.apply(this)
            }, onClose: function () {
                e.noty.themes.maleskineTheme.helpers.borderFix.apply(this)
            }
        }
    }
}(jQuery);
var QRCode;
!function () {
    function e(e) {
        this.mode = c.MODE_8BIT_BYTE, this.data = e, this.parsedData = [];
        for (var t = [], n = 0, o = this.data.length; o > n; n++) {
            var i = this.data.charCodeAt(n);
            i > 65536 ? (t[0] = 240 | (1835008 & i) >>> 18, t[1] = 128 | (258048 & i) >>> 12, t[2] = 128 | (4032 & i) >>> 6, t[3] = 128 | 63 & i) : i > 2048 ? (t[0] = 224 | (61440 & i) >>> 12, t[1] = 128 | (4032 & i) >>> 6, t[2] = 128 | 63 & i) : i > 128 ? (t[0] = 192 | (1984 & i) >>> 6, t[1] = 128 | 63 & i) : t[0] = i, this.parsedData = this.parsedData.concat(t)
        }
        this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
    }

    function t(e, t) {
        this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
    }

    function n(e, t) {
        if (void 0 == e.length)throw new Error(e.length + "/" + t);
        for (var n = 0; n < e.length && 0 == e[n];)n++;
        this.num = new Array(e.length - n + t);
        for (var o = 0; o < e.length - n; o++)this.num[o] = e[o + n]
    }

    function o(e, t) {
        this.totalCount = e, this.dataCount = t
    }

    function i() {
        this.buffer = [], this.length = 0
    }

    function r() {
        return "undefined" != typeof CanvasRenderingContext2D
    }

    function s() {
        var e = !1, t = navigator.userAgent;
        return /android/i.test(t) && (e = !0, aMat = t.toString().match(/android ([0-9]\.[0-9])/i), aMat && aMat[1] && (e = parseFloat(aMat[1]))), e
    }

    function a(e, t) {
        for (var n = 1, o = l(e), i = 0, r = m.length; r >= i; i++) {
            var s = 0;
            switch (t) {
                case u.L:
                    s = m[i][0];
                    break;
                case u.M:
                    s = m[i][1];
                    break;
                case u.Q:
                    s = m[i][2];
                    break;
                case u.H:
                    s = m[i][3]
            }
            if (s >= o)break;
            n++
        }
        if (n > m.length)throw new Error("Too long data");
        return n
    }

    function l(e) {
        var t = encodeURI(e).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return t.length + (t.length != e ? 3 : 0)
    }

    e.prototype = {
        getLength: function () {
            return this.parsedData.length
        }, write: function (e) {
            for (var t = 0, n = this.parsedData.length; n > t; t++)e.put(this.parsedData[t], 8)
        }
    }, t.prototype = {
        addData: function (t) {
            var n = new e(t);
            this.dataList.push(n), this.dataCache = null
        }, isDark: function (e, t) {
            if (0 > e || this.moduleCount <= e || 0 > t || this.moduleCount <= t)throw new Error(e + "," + t);
            return this.modules[e][t]
        }, getModuleCount: function () {
            return this.moduleCount
        }, make: function () {
            this.makeImpl(!1, this.getBestMaskPattern())
        }, makeImpl: function (e, n) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var o = 0; o < this.moduleCount; o++) {
                this.modules[o] = new Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++)this.modules[o][i] = null
            }
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, n), this.typeNumber >= 7 && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, n)
        }, setupPositionProbePattern: function (e, t) {
            for (var n = -1; 7 >= n; n++)if (!(-1 >= e + n || this.moduleCount <= e + n))for (var o = -1; 7 >= o; o++)-1 >= t + o || this.moduleCount <= t + o || (this.modules[e + n][t + o] = n >= 0 && 6 >= n && (0 == o || 6 == o) || o >= 0 && 6 >= o && (0 == n || 6 == n) || n >= 2 && 4 >= n && o >= 2 && 4 >= o ? !0 : !1)
        }, getBestMaskPattern: function () {
            for (var e = 0, t = 0, n = 0; 8 > n; n++) {
                this.makeImpl(!0, n);
                var o = h.getLostPoint(this);
                (0 == n || e > o) && (e = o, t = n)
            }
            return t
        }, createMovieClip: function (e, t, n) {
            var o = e.createEmptyMovieClip(t, n), i = 1;
            this.make();
            for (var r = 0; r < this.modules.length; r++)for (var s = r * i, a = 0; a < this.modules[r].length; a++) {
                var l = a * i, c = this.modules[r][a];
                c && (o.beginFill(0, 100), o.moveTo(l, s), o.lineTo(l + i, s), o.lineTo(l + i, s + i), o.lineTo(l, s + i), o.endFill())
            }
            return o
        }, setupTimingPattern: function () {
            for (var e = 8; e < this.moduleCount - 8; e++)null == this.modules[e][6] && (this.modules[e][6] = 0 == e % 2);
            for (var t = 8; t < this.moduleCount - 8; t++)null == this.modules[6][t] && (this.modules[6][t] = 0 == t % 2)
        }, setupPositionAdjustPattern: function () {
            for (var e = h.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)for (var n = 0; n < e.length; n++) {
                var o = e[t], i = e[n];
                if (null == this.modules[o][i])for (var r = -2; 2 >= r; r++)for (var s = -2; 2 >= s; s++)this.modules[o + r][i + s] = -2 == r || 2 == r || -2 == s || 2 == s || 0 == r && 0 == s ? !0 : !1
            }
        }, setupTypeNumber: function (e) {
            for (var t = h.getBCHTypeNumber(this.typeNumber), n = 0; 18 > n; n++) {
                var o = !e && 1 == (1 & t >> n);
                this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = o
            }
            for (var n = 0; 18 > n; n++) {
                var o = !e && 1 == (1 & t >> n);
                this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = o
            }
        }, setupTypeInfo: function (e, t) {
            for (var n = this.errorCorrectLevel << 3 | t, o = h.getBCHTypeInfo(n), i = 0; 15 > i; i++) {
                var r = !e && 1 == (1 & o >> i);
                6 > i ? this.modules[i][8] = r : 8 > i ? this.modules[i + 1][8] = r : this.modules[this.moduleCount - 15 + i][8] = r
            }
            for (var i = 0; 15 > i; i++) {
                var r = !e && 1 == (1 & o >> i);
                8 > i ? this.modules[8][this.moduleCount - i - 1] = r : 9 > i ? this.modules[8][15 - i - 1 + 1] = r : this.modules[8][15 - i - 1] = r
            }
            this.modules[this.moduleCount - 8][8] = !e
        }, mapData: function (e, t) {
            for (var n = -1, o = this.moduleCount - 1, i = 7, r = 0, s = this.moduleCount - 1; s > 0; s -= 2)for (6 == s && s--; ;) {
                for (var a = 0; 2 > a; a++)if (null == this.modules[o][s - a]) {
                    var l = !1;
                    r < e.length && (l = 1 == (1 & e[r] >>> i));
                    var c = h.getMask(t, o, s - a);
                    c && (l = !l), this.modules[o][s - a] = l, i--, -1 == i && (r++, i = 7)
                }
                if (o += n, 0 > o || this.moduleCount <= o) {
                    o -= n, n = -n;
                    break
                }
            }
        }
    }, t.PAD0 = 236, t.PAD1 = 17, t.createData = function (e, n, r) {
        for (var s = o.getRSBlocks(e, n), a = new i, l = 0; l < r.length; l++) {
            var c = r[l];
            a.put(c.mode, 4), a.put(c.getLength(), h.getLengthInBits(c.mode, e)), c.write(a)
        }
        for (var u = 0, l = 0; l < s.length; l++)u += s[l].dataCount;
        if (a.getLengthInBits() > 8 * u)throw new Error("code length overflow. (" + a.getLengthInBits() + ">" + 8 * u + ")");
        for (a.getLengthInBits() + 4 <= 8 * u && a.put(0, 4); 0 != a.getLengthInBits() % 8;)a.putBit(!1);
        for (; !(a.getLengthInBits() >= 8 * u) && (a.put(t.PAD0, 8), !(a.getLengthInBits() >= 8 * u));)a.put(t.PAD1, 8);
        return t.createBytes(a, s)
    }, t.createBytes = function (e, t) {
        for (var o = 0, i = 0, r = 0, s = new Array(t.length), a = new Array(t.length), l = 0; l < t.length; l++) {
            var c = t[l].dataCount, u = t[l].totalCount - c;
            i = Math.max(i, c), r = Math.max(r, u), s[l] = new Array(c);
            for (var d = 0; d < s[l].length; d++)s[l][d] = 255 & e.buffer[d + o];
            o += c;
            var p = h.getErrorCorrectPolynomial(u), f = new n(s[l], p.getLength() - 1), m = f.mod(p);
            a[l] = new Array(p.getLength() - 1);
            for (var d = 0; d < a[l].length; d++) {
                var g = d + m.getLength() - a[l].length;
                a[l][d] = g >= 0 ? m.get(g) : 0
            }
        }
        for (var b = 0, d = 0; d < t.length; d++)b += t[d].totalCount;
        for (var y = new Array(b), v = 0, d = 0; i > d; d++)for (var l = 0; l < t.length; l++)d < s[l].length && (y[v++] = s[l][d]);
        for (var d = 0; r > d; d++)for (var l = 0; l < t.length; l++)d < a[l].length && (y[v++] = a[l][d]);
        return y
    };
    for (var c = {MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8}, u = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    }, d = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    }, h = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function (e) {
            for (var t = e << 10; h.getBCHDigit(t) - h.getBCHDigit(h.G15) >= 0;)t ^= h.G15 << h.getBCHDigit(t) - h.getBCHDigit(h.G15);
            return (e << 10 | t) ^ h.G15_MASK
        },
        getBCHTypeNumber: function (e) {
            for (var t = e << 12; h.getBCHDigit(t) - h.getBCHDigit(h.G18) >= 0;)t ^= h.G18 << h.getBCHDigit(t) - h.getBCHDigit(h.G18);
            return e << 12 | t
        },
        getBCHDigit: function (e) {
            for (var t = 0; 0 != e;)t++, e >>>= 1;
            return t
        },
        getPatternPosition: function (e) {
            return h.PATTERN_POSITION_TABLE[e - 1]
        },
        getMask: function (e, t, n) {
            switch (e) {
                case d.PATTERN000:
                    return 0 == (t + n) % 2;
                case d.PATTERN001:
                    return 0 == t % 2;
                case d.PATTERN010:
                    return 0 == n % 3;
                case d.PATTERN011:
                    return 0 == (t + n) % 3;
                case d.PATTERN100:
                    return 0 == (Math.floor(t / 2) + Math.floor(n / 3)) % 2;
                case d.PATTERN101:
                    return 0 == t * n % 2 + t * n % 3;
                case d.PATTERN110:
                    return 0 == (t * n % 2 + t * n % 3) % 2;
                case d.PATTERN111:
                    return 0 == (t * n % 3 + (t + n) % 2) % 2;
                default:
                    throw new Error("bad maskPattern:" + e)
            }
        },
        getErrorCorrectPolynomial: function (e) {
            for (var t = new n([1], 0), o = 0; e > o; o++)t = t.multiply(new n([1, p.gexp(o)], 0));
            return t
        },
        getLengthInBits: function (e, t) {
            if (t >= 1 && 10 > t)switch (e) {
                case c.MODE_NUMBER:
                    return 10;
                case c.MODE_ALPHA_NUM:
                    return 9;
                case c.MODE_8BIT_BYTE:
                    return 8;
                case c.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + e)
            } else if (27 > t)switch (e) {
                case c.MODE_NUMBER:
                    return 12;
                case c.MODE_ALPHA_NUM:
                    return 11;
                case c.MODE_8BIT_BYTE:
                    return 16;
                case c.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + e)
            } else {
                if (!(41 > t))throw new Error("type:" + t);
                switch (e) {
                    case c.MODE_NUMBER:
                        return 14;
                    case c.MODE_ALPHA_NUM:
                        return 13;
                    case c.MODE_8BIT_BYTE:
                        return 16;
                    case c.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + e)
                }
            }
        },
        getLostPoint: function (e) {
            for (var t = e.getModuleCount(), n = 0, o = 0; t > o; o++)for (var i = 0; t > i; i++) {
                for (var r = 0, s = e.isDark(o, i), a = -1; 1 >= a; a++)if (!(0 > o + a || o + a >= t))for (var l = -1; 1 >= l; l++)0 > i + l || i + l >= t || (0 != a || 0 != l) && s == e.isDark(o + a, i + l) && r++;
                r > 5 && (n += 3 + r - 5)
            }
            for (var o = 0; t - 1 > o; o++)for (var i = 0; t - 1 > i; i++) {
                var c = 0;
                e.isDark(o, i) && c++, e.isDark(o + 1, i) && c++, e.isDark(o, i + 1) && c++, e.isDark(o + 1, i + 1) && c++, (0 == c || 4 == c) && (n += 3)
            }
            for (var o = 0; t > o; o++)for (var i = 0; t - 6 > i; i++)e.isDark(o, i) && !e.isDark(o, i + 1) && e.isDark(o, i + 2) && e.isDark(o, i + 3) && e.isDark(o, i + 4) && !e.isDark(o, i + 5) && e.isDark(o, i + 6) && (n += 40);
            for (var i = 0; t > i; i++)for (var o = 0; t - 6 > o; o++)e.isDark(o, i) && !e.isDark(o + 1, i) && e.isDark(o + 2, i) && e.isDark(o + 3, i) && e.isDark(o + 4, i) && !e.isDark(o + 5, i) && e.isDark(o + 6, i) && (n += 40);
            for (var u = 0, i = 0; t > i; i++)for (var o = 0; t > o; o++)e.isDark(o, i) && u++;
            var d = Math.abs(100 * u / t / t - 50) / 5;
            return n += 10 * d
        }
    }, p = {
        glog: function (e) {
            if (1 > e)throw new Error("glog(" + e + ")");
            return p.LOG_TABLE[e]
        }, gexp: function (e) {
            for (; 0 > e;)e += 255;
            for (; e >= 256;)e -= 255;
            return p.EXP_TABLE[e]
        }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
    }, f = 0; 8 > f; f++)p.EXP_TABLE[f] = 1 << f;
    for (var f = 8; 256 > f; f++)p.EXP_TABLE[f] = p.EXP_TABLE[f - 4] ^ p.EXP_TABLE[f - 5] ^ p.EXP_TABLE[f - 6] ^ p.EXP_TABLE[f - 8];
    for (var f = 0; 255 > f; f++)p.LOG_TABLE[p.EXP_TABLE[f]] = f;
    n.prototype = {
        get: function (e) {
            return this.num[e]
        }, getLength: function () {
            return this.num.length
        }, multiply: function (e) {
            for (var t = new Array(this.getLength() + e.getLength() - 1), o = 0; o < this.getLength(); o++)for (var i = 0; i < e.getLength(); i++)t[o + i] ^= p.gexp(p.glog(this.get(o)) + p.glog(e.get(i)));
            return new n(t, 0)
        }, mod: function (e) {
            if (this.getLength() - e.getLength() < 0)return this;
            for (var t = p.glog(this.get(0)) - p.glog(e.get(0)), o = new Array(this.getLength()), i = 0; i < this.getLength(); i++)o[i] = this.get(i);
            for (var i = 0; i < e.getLength(); i++)o[i] ^= p.gexp(p.glog(e.get(i)) + t);
            return new n(o, 0).mod(e)
        }
    }, o.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], o.getRSBlocks = function (e, t) {
        var n = o.getRsBlockTable(e, t);
        if (void 0 == n)throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
        for (var i = n.length / 3, r = [], s = 0; i > s; s++)for (var a = n[3 * s + 0], l = n[3 * s + 1], c = n[3 * s + 2], u = 0; a > u; u++)r.push(new o(l, c));
        return r
    }, o.getRsBlockTable = function (e, t) {
        switch (t) {
            case u.L:
                return o.RS_BLOCK_TABLE[4 * (e - 1) + 0];
            case u.M:
                return o.RS_BLOCK_TABLE[4 * (e - 1) + 1];
            case u.Q:
                return o.RS_BLOCK_TABLE[4 * (e - 1) + 2];
            case u.H:
                return o.RS_BLOCK_TABLE[4 * (e - 1) + 3];
            default:
                return void 0
        }
    }, i.prototype = {
        get: function (e) {
            var t = Math.floor(e / 8);
            return 1 == (1 & this.buffer[t] >>> 7 - e % 8)
        }, put: function (e, t) {
            for (var n = 0; t > n; n++)this.putBit(1 == (1 & e >>> t - n - 1))
        }, getLengthInBits: function () {
            return this.length
        }, putBit: function (e) {
            var t = Math.floor(this.length / 8);
            this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
        }
    };
    var m = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]], g = function () {
        var e = function (e, t) {
            this._el = e, this._htOption = t
        };
        return e.prototype.draw = function (e) {
            function t(e, t) {
                var n = document.createElementNS("http://www.w3.org/2000/svg", e);
                for (var o in t)t.hasOwnProperty(o) && n.setAttribute(o, t[o]);
                return n
            }

            var n = this._htOption, o = this._el, i = e.getModuleCount();
            Math.floor(n.width / i), Math.floor(n.height / i), this.clear();
            var r = t("svg", {
                viewBox: "0 0 " + String(i) + " " + String(i),
                width: "100%",
                height: "100%",
                fill: n.colorLight
            });
            r.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), o.appendChild(r), r.appendChild(t("rect", {
                fill: n.colorDark,
                width: "1",
                height: "1",
                id: "template"
            }));
            for (var s = 0; i > s; s++)for (var a = 0; i > a; a++)if (e.isDark(s, a)) {
                var l = t("use", {x: String(s), y: String(a)});
                l.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), r.appendChild(l)
            }
        }, e.prototype.clear = function () {
            for (; this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)
        }, e
    }(), b = "svg" === document.documentElement.tagName.toLowerCase(), y = b ? g : r() ? function () {
        function e() {
            this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
        }

        function t(e, t) {
            var n = this;
            if (n._fFail = t, n._fSuccess = e, null === n._bSupportDataURI) {
                var o = document.createElement("img"), i = function () {
                    n._bSupportDataURI = !1, n._fFail && _fFail.call(n)
                }, r = function () {
                    n._bSupportDataURI = !0, n._fSuccess && n._fSuccess.call(n)
                };
                return o.onabort = i, o.onerror = i, o.onload = r, void(o.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
            }
            n._bSupportDataURI === !0 && n._fSuccess ? n._fSuccess.call(n) : n._bSupportDataURI === !1 && n._fFail && n._fFail.call(n)
        }

        if (this._android && this._android <= 2.1) {
            var n = 1 / window.devicePixelRatio, o = CanvasRenderingContext2D.prototype.drawImage;
            CanvasRenderingContext2D.prototype.drawImage = function (e, t, i, r, s, a, l, c) {
                if ("nodeName" in e && /img/i.test(e.nodeName))for (var u = arguments.length - 1; u >= 1; u--)arguments[u] = arguments[u] * n; else"undefined" == typeof c && (arguments[1] *= n, arguments[2] *= n, arguments[3] *= n, arguments[4] *= n);
                o.apply(this, arguments)
            }
        }
        var i = function (e, t) {
            this._bIsPainted = !1, this._android = s(), this._htOption = t, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = t.width, this._elCanvas.height = t.height, e.appendChild(this._elCanvas), this._el = e, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
        };
        return i.prototype.draw = function (e) {
            var t = this._elImage, n = this._oContext, o = this._htOption, i = e.getModuleCount(), r = o.width / i, s = o.height / i, a = Math.round(r), l = Math.round(s);
            t.style.display = "none", this.clear();
            for (var c = 0; i > c; c++)for (var u = 0; i > u; u++) {
                var d = e.isDark(c, u), h = u * r, p = c * s;
                n.strokeStyle = d ? o.colorDark : o.colorLight, n.lineWidth = 1, n.fillStyle = d ? o.colorDark : o.colorLight, n.fillRect(h, p, r, s), n.strokeRect(Math.floor(h) + .5, Math.floor(p) + .5, a, l), n.strokeRect(Math.ceil(h) - .5, Math.ceil(p) - .5, a, l)
            }
            this._bIsPainted = !0
        }, i.prototype.makeImage = function () {
            this._bIsPainted && t.call(this, e)
        }, i.prototype.isPainted = function () {
            return this._bIsPainted
        }, i.prototype.clear = function () {
            this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1
        }, i.prototype.round = function (e) {
            return e ? Math.floor(1e3 * e) / 1e3 : e
        }, i
    }() : function () {
        var e = function (e, t) {
            this._el = e, this._htOption = t
        };
        return e.prototype.draw = function (e) {
            for (var t = this._htOption, n = this._el, o = e.getModuleCount(), i = Math.floor(t.width / o), r = Math.floor(t.height / o), s = ['<table style="border:0;border-collapse:collapse;">'], a = 0; o > a; a++) {
                s.push("<tr>");
                for (var l = 0; o > l; l++)s.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + i + "px;height:" + r + "px;background-color:" + (e.isDark(a, l) ? t.colorDark : t.colorLight) + ';"></td>');
                s.push("</tr>")
            }
            s.push("</table>"), n.innerHTML = s.join("");
            var c = n.childNodes[0], u = (t.width - c.offsetWidth) / 2, d = (t.height - c.offsetHeight) / 2;
            u > 0 && d > 0 && (c.style.margin = d + "px " + u + "px")
        }, e.prototype.clear = function () {
            this._el.innerHTML = ""
        }, e
    }();
    QRCode = function (e, t) {
        if (this._htOption = {
                width: 256,
                height: 256,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: u.H
            }, "string" == typeof t && (t = {text: t}), t)for (var n in t)this._htOption[n] = t[n];
        "string" == typeof e && (e = document.getElementById(e)), this._android = s(), this._el = e, this._oQRCode = null, this._oDrawing = new y(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
    }, QRCode.prototype.makeCode = function (e) {
        this._oQRCode = new t(a(e, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(e), this._oQRCode.make(), this._el.title = e, this._oDrawing.draw(this._oQRCode), this.makeImage()
    }, QRCode.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
    }, QRCode.prototype.clear = function () {
        this._oDrawing.clear()
    }, QRCode.CorrectLevel = u
}();
var I18n = I18n || {};
I18n.defaultLocale = "en", I18n.fallbacks = !1, I18n.defaultSeparator = ".", I18n.locale = null, I18n.PLACEHOLDER = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm, I18n.isValidNode = function (e, t, n) {
    return null !== e[t] && e[t] !== n
}, I18n.lookup = function (e, t) {
    var n, t = t || {}, o = e, i = this.prepareOptions(I18n.translations), r = i[t.locale || I18n.currentLocale()], t = this.prepareOptions(t);
    if (r) {
        for ("object" == typeof e && (e = e.join(this.defaultSeparator)), t.scope && (e = t.scope.toString() + this.defaultSeparator + e), e = e.split(this.defaultSeparator); e.length > 0;)if (n = e.shift(), r = r[n], !r) {
            I18n.fallbacks && !t.fallback && (r = I18n.lookup(o, this.prepareOptions({
                locale: I18n.defaultLocale,
                fallback: !0
            }, t)));
            break
        }
        return !r && this.isValidNode(t, "defaultValue") && (r = t.defaultValue), r
    }
}, I18n.prepareOptions = function () {
    for (var e, t = {}, n = arguments.length, o = 0; n > o; o++)if (e = arguments[o])for (var i in e)this.isValidNode(t, i) || (t[i] = e[i]);
    return t
}, I18n.interpolate = function (e, t) {
    t = this.prepareOptions(t);
    var n, o, i, r = e.match(this.PLACEHOLDER);
    if (!r)return e;
    for (var s = 0; n = r[s]; s++)i = n.replace(this.PLACEHOLDER, "$1"), o = t[i], this.isValidNode(t, i) || (o = "[missing " + n + " value]"), regex = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(regex, o);
    return e
}, I18n.translate = function (e, t) {
    t = this.prepareOptions(t);
    var n = this.lookup(e, t);
    try {
        return "object" == typeof n ? "number" == typeof t.count ? this.pluralize(t.count, e, t) : n : this.interpolate(n, t)
    } catch (o) {
        return this.missingTranslation(e)
    }
}, I18n.localize = function (e, t) {
    switch (e) {
        case"currency":
            return this.toCurrency(t);
        case"number":
            return e = this.lookup("number.format"), this.toNumber(t, e);
        case"percentage":
            return this.toPercentage(t);
        default:
            return e.match(/^(date|time)/) ? this.toTime(e, t) : t.toString()
    }
}, I18n.parseDate = function (e) {
    var t, n;
    if ("object" == typeof e)return e;
    if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)) {
        for (var o = 1; 6 >= o; o++)t[o] = parseInt(t[o], 10) || 0;
        t[2] -= 1, n = t[7] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6])) : new Date(t[1], t[2], t[3], t[4], t[5], t[6])
    } else"number" == typeof e ? (n = new Date, n.setTime(e)) : e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (n = new Date, n.setTime(Date.parse(e))) : (n = new Date, n.setTime(Date.parse(e)));
    return n
}, I18n.toTime = function (e, t) {
    var n = this.parseDate(t), o = this.lookup(e);
    return n.toString().match(/invalid/i) ? n.toString() : o ? this.strftime(n, o) : n.toString()
}, I18n.strftime = function (e, t) {
    var n = this.lookup("date");
    if (!n)return e.toString();
    n.meridian = n.meridian || ["AM", "PM"];
    var o = e.getDay(), i = e.getDate(), r = e.getFullYear(), s = e.getMonth() + 1, a = e.getHours(), l = a, c = a > 11 ? 1 : 0, u = e.getSeconds(), d = e.getMinutes(), h = e.getTimezoneOffset(), p = Math.floor(Math.abs(h / 60)), f = Math.abs(h) - 60 * p, m = (h > 0 ? "-" : "+") + (p.toString().length < 2 ? "0" + p : p) + (f.toString().length < 2 ? "0" + f : f);
    l > 12 ? l -= 12 : 0 === l && (l = 12);
    var g = function (e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    }, b = t;
    return b = b.replace("%a", n.abbr_day_names[o]), b = b.replace("%A", n.day_names[o]), b = b.replace("%b", n.abbr_month_names[s]), b = b.replace("%B", n.month_names[s]), b = b.replace("%d", g(i)), b = b.replace("%e", i), b = b.replace("%-d", i), b = b.replace("%H", g(a)), b = b.replace("%-H", a), b = b.replace("%I", g(l)), b = b.replace("%-I", l), b = b.replace("%m", g(s)), b = b.replace("%-m", s), b = b.replace("%M", g(d)), b = b.replace("%-M", d), b = b.replace("%p", n.meridian[c]), b = b.replace("%S", g(u)), b = b.replace("%-S", u), b = b.replace("%w", o), b = b.replace("%y", g(r)), b = b.replace("%-y", g(r).replace(/^0+/, "")), b = b.replace("%Y", r), b = b.replace("%z", m)
}, I18n.toNumber = function (e, t) {
    t = this.prepareOptions(t, this.lookup("number.format"), {
        precision: 3,
        separator: ".",
        delimiter: ",",
        strip_insignificant_zeros: !1
    });
    var n, o, i = 0 > e, r = Math.abs(e).toFixed(t.precision).toString(), s = r.split("."), a = [];
    for (e = s[0], n = s[1]; e.length > 0;)a.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
    if (o = a.join(t.delimiter), t.precision > 0 && (o += t.separator + s[1]), i && (o = "-" + o), t.strip_insignificant_zeros) {
        var l = {separator: new RegExp(t.separator.replace(/\./, "\\.") + "$"), zeros: /0+$/};
        o = o.replace(l.zeros, "").replace(l.separator, "")
    }
    return o
}, I18n.toCurrency = function (e, t) {
    return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), {
        unit: "$",
        precision: 2,
        format: "%u%n",
        delimiter: ",",
        separator: "."
    }), e = this.toNumber(e, t), e = t.format.replace("%u", t.unit).replace("%n", e)
}, I18n.toHumanSize = function (e, t) {
    for (var n, o, i = 1024, r = e, s = 0; r >= i && 4 > s;)r /= i, s += 1;
    return 0 === s ? (n = this.t("number.human.storage_units.units.byte", {count: r}), o = 0) : (n = this.t("number.human.storage_units.units." + [null, "kb", "mb", "gb", "tb"][s]), o = r - Math.floor(r) === 0 ? 0 : 1), t = this.prepareOptions(t, {
        precision: o,
        format: "%n%u",
        delimiter: ""
    }), e = this.toNumber(r, t), e = t.format.replace("%u", n).replace("%n", e)
}, I18n.toPercentage = function (e, t) {
    return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), {
        precision: 3,
        separator: ".",
        delimiter: ""
    }), e = this.toNumber(e, t), e + "%"
}, I18n.pluralize = function (e, t, n) {
    var o;
    try {
        o = this.lookup(t, n)
    } catch (i) {
    }
    if (!o)return this.missingTranslation(t);
    var r;
    switch (n = this.prepareOptions(n), n.count = e.toString(), Math.abs(e)) {
        case 0:
            r = this.isValidNode(o, "zero") ? o.zero : this.isValidNode(o, "none") ? o.none : this.isValidNode(o, "other") ? o.other : this.missingTranslation(t, "zero");
            break;
        case 1:
            r = this.isValidNode(o, "one") ? o.one : this.missingTranslation(t, "one");
            break;
        default:
            r = this.isValidNode(o, "other") ? o.other : this.missingTranslation(t, "other")
    }
    return this.interpolate(r, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, function () {
    var e, t, n, o, i, r, s = {}.hasOwnProperty;
    r = "undefined" != typeof exports && null !== exports ? exports : this, t = function (e) {
        this.message = e
    }, t.prototype = new Error, i = {prefix: "", default_url_options: {}}, e = {
        GROUP: 1,
        CAT: 2,
        SYMBOL: 3,
        OR: 4,
        STAR: 5,
        LITERAL: 6,
        SLASH: 7,
        DOT: 8
    }, n = {
        serialize: function (e, t) {
            var n, o, i, a, l, c, u, d;
            if (null == t && (t = null), !e)return "";
            if (!t && "object" !== this.get_object_type(e))throw new Error("Url parameters should be a javascript hash");
            if (r.jQuery)return l = r.jQuery.param(e), l ? l : "";
            switch (c = [], this.get_object_type(e)) {
                case"array":
                    for (o = u = 0, d = e.length; d > u; o = ++u)n = e[o], c.push(this.serialize(n, t + "[]"));
                    break;
                case"object":
                    for (i in e)s.call(e, i) && (a = e[i], null != a && (null != t && (i = "" + t + "[" + i + "]"), c.push(this.serialize(a, i))));
                    break;
                default:
                    e && c.push("" + encodeURIComponent(t.toString()) + "=" + encodeURIComponent(e.toString()))
            }
            return c.length ? c.join("&") : ""
        }, clean_path: function (e) {
            var t;
            return e = e.split("://"), t = e.length - 1, e[t] = e[t].replace(/\/+/g, "/"), e.join("://")
        }, set_default_url_options: function (e, t) {
            var n, o, r, s, a;
            for (a = [], n = r = 0, s = e.length; s > r; n = ++r)o = e[n], !t.hasOwnProperty(o) && i.default_url_options.hasOwnProperty(o) && a.push(t[o] = i.default_url_options[o]);
            return a
        }, extract_anchor: function (e) {
            var t;
            return t = "", e.hasOwnProperty("anchor") && (t = "#" + e.anchor, delete e.anchor), t
        }, extract_trailing_slash: function (e) {
            var t;
            return t = !1, i.default_url_options.hasOwnProperty("trailing_slash") && (t = i.default_url_options.trailing_slash), e.hasOwnProperty("trailing_slash") && (t = e.trailing_slash, delete e.trailing_slash), t
        }, extract_options: function (e, t) {
            var n;
            return n = t[t.length - 1], t.length > e || null != n && "object" === this.get_object_type(n) && !this.look_like_serialized_model(n) ? t.pop() : {}
        }, look_like_serialized_model: function (e) {
            return "id" in e || "to_param" in e
        }, path_identifier: function (e) {
            var t;
            return 0 === e ? "0" : e ? (t = e, "object" === this.get_object_type(e) && (t = "to_param" in e ? e.to_param : "id" in e ? e.id : e, "function" === this.get_object_type(t) && (t = t.call(e))), t.toString()) : ""
        }, clone: function (e) {
            var t, n, o;
            if (null == e || "object" !== this.get_object_type(e))return e;
            n = e.constructor();
            for (o in e)s.call(e, o) && (t = e[o], n[o] = t);
            return n
        }, prepare_parameters: function (e, t, n) {
            var o, i, r, s, a;
            for (i = this.clone(n) || {}, o = s = 0, a = e.length; a > s; o = ++s)r = e[o], o < t.length && (i[r] = t[o]);
            return i
        }, build_path: function (e, t, o, i) {
            var r, s, a, l, c, u, d;
            if (i = Array.prototype.slice.call(i), s = this.extract_options(e.length, i), i.length > e.length)throw new Error("Too many parameters provided for path");
            return a = this.prepare_parameters(e, i, s), this.set_default_url_options(t, a), r = this.extract_anchor(a), c = this.extract_trailing_slash(a), l = "" + this.get_prefix() + this.visit(o, a), u = n.clean_path("" + l), c === !0 && (u = u.replace(/(.*?)[\/]?$/, "$1/")), (d = this.serialize(a)).length && (u += "?" + d), u += r
        }, visit: function (n, o, i) {
            var r, s, a, l, c, u;
            switch (null == i && (i = !1), c = n[0], r = n[1], a = n[2], c) {
                case e.GROUP:
                    return this.visit(r, o, !0);
                case e.STAR:
                    return this.visit_globbing(r, o, !0);
                case e.LITERAL:
                case e.SLASH:
                case e.DOT:
                    return r;
                case e.CAT:
                    return s = this.visit(r, o, i), l = this.visit(a, o, i), !i || s && l ? "" + s + l : "";
                case e.SYMBOL:
                    if (u = o[r], null != u)return delete o[r], this.path_identifier(u);
                    if (i)return "";
                    throw new t("Route parameter missing: " + r);
                default:
                    throw new Error("Unknown Rails node type")
            }
        }, visit_globbing: function (e, t, n) {
            var o, i, r, s;
            return r = e[0], o = e[1], i = e[2], o.replace(/^\*/i, "") !== o && (e[1] = o = o.replace(/^\*/i, "")), s = t[o], null == s ? this.visit(e, t, n) : (t[o] = function () {
                switch (this.get_object_type(s)) {
                    case"array":
                        return s.join("/");
                    default:
                        return s
                }
            }.call(this), this.visit(e, t, n))
        }, get_prefix: function () {
            var e;
            return e = i.prefix, "" !== e && (e = e.match("/$") ? e : "" + e + "/"), e
        }, _classToTypeCache: null, _classToType: function () {
            var e, t, n, o;
            if (null != this._classToTypeCache)return this._classToTypeCache;
            for (this._classToTypeCache = {}, o = "Boolean Number String Function Array Date RegExp Object Error".split(" "), t = 0, n = o.length; n > t; t++)e = o[t], this._classToTypeCache["[object " + e + "]"] = e.toLowerCase();
            return this._classToTypeCache
        }, get_object_type: function (e) {
            return r.jQuery && null != r.jQuery.type ? r.jQuery.type(e) : null == e ? "" + e : "object" == typeof e || "function" == typeof e ? this._classToType()[Object.prototype.toString.call(e)] || "object" : typeof e
        }
    }, o = function () {
        var e;
        return e = function (t, n) {
            var o, i;
            return i = n ? n.split(".") : [], i.length ? (o = i.shift(), t[o] = t[o] || {}, e(t[o], i.join("."))) : void 0
        }, e(r, "Routes"), r.Routes = {
            activities_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "activities", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, apply_to_unbind_alipay_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "wallet", !1], [2, [7, "/", !1], [2, [6, "apply_to_unbind_alipay", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, bookmark_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "bookmark", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, bookmarks_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "bookmarks", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, chat_chat_messages_path: function () {
                return n.build_path(["chat_id"], ["format"], [2, [7, "/", !1], [2, [6, "chats", !1], [2, [7, "/", !1], [2, [3, "chat_id", !1], [2, [7, "/", !1], [2, [6, "chat_messages", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, chats_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "chats", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, collection_collection_invitations_path: function () {
                return n.build_path(["collection_id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "collection_id", !1], [2, [7, "/", !1], [2, [6, "collection_invitations", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, collection_menu_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "collection_menu", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, collection_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection_notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, collection_notes_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collection_notes", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, collections_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, comment_like_path: function () {
                return n.build_path(["comment_id", "id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "comment_id", !1], [2, [7, "/", !1], [2, [6, "likes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, comment_likes_path: function () {
                return n.build_path(["comment_id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "comment_id", !1], [2, [7, "/", !1], [2, [6, "likes", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, destroy_user_session_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "sign_out", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, dismiss_comment_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "dismiss", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, do_search_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "search", !1], [2, [7, "/", !1], [2, [6, "do", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, edit_editor_newsletter_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "edit", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, editable_collections_user_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [6, "editable", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, editor_newsletter_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, editor_newsletters_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, external_pages_info_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "external_pages", !1], [2, [7, "/", !1], [2, [6, "info", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, fetch_collection_editor_collection_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_collection", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, fetch_notebook_editor_notebook_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "notebooks", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_notebook", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, fetch_public_note_editor_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_public_note", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, fetch_user_editor_user_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_user", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, following_collections_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [6, "following", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, likes_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "likes", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, list_notebook_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notebooks", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "latest", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, message_inbox_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "messages", !1], [2, [7, "/", !1], [2, [6, "inbox", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, mobile_phone_bind_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "mobile_phone", !1], [2, [7, "/", !1], [2, [6, "bind", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, mobile_phone_send_code_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "mobile_phone", !1], [2, [7, "/", !1], [2, [6, "send_code", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, more_children_comment_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "more_children", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, new_chat_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "chats", !1], [2, [7, "/", !1], [2, [6, "new", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, new_collection_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [6, "new", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, new_collection_submission_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collection_submissions", !1], [2, [7, "/", !1], [2, [6, "new", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, new_editor_newsletter_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [6, "new", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, new_feedback_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "contact", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, new_user_session_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "sign_in", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, note_comment_path: function () {
                return n.build_path(["note_id", "id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, note_comments_path: function () {
                return n.build_path(["note_id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "comments", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, note_further_reading_path: function () {
                return n.build_path(["note_id", "id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "further_readings", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, note_further_readings_path: function () {
                return n.build_path(["note_id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "further_readings", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, notebook_menu_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "notebook_menu", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, notifications_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "notifications", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, pingpp_charge_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "pingpp_charges", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, preferences_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "preferences", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, refresh_captcha_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "captchas", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "refresh", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, reject_admin_weibo_auth_application_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "admin", !1], [2, [7, "/", !1], [2, [6, "weibo_auth_applications", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "reject", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, reject_editor_weibo_auth_application_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "weibo_auth_applications", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "reject", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, resolve_admin_abuse_report_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "admin", !1], [2, [7, "/", !1], [2, [6, "abuse_reports", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "resolve", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            }, rewards_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "rewards", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, root_path: function () {
                return n.build_path([], [], [7, "/", !1], arguments)
            }, search_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "search", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, search_users_chats_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "chats", !1], [2, [7, "/", !1], [2, [6, "search_users", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, send_confirmation_email_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "settings", !1], [2, [7, "/", !1], [2, [6, "send_confirmation_email", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, send_password_reset_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "settings", !1], [2, [7, "/", !1], [2, [6, "send_password_reset", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, send_sms_verification_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "send_sms_verification", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, settings_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "settings", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, share_buttons_note_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "share_buttons", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, show_collection_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, show_note_path: function () {
                return n.build_path(["slug"], ["format"], [2, [7, "/", !1], [2, [6, "p", !1], [2, [7, "/", !1], [2, [3, "slug", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, subscribe_collection_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "subscribe", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, subscribers_collection_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "subscribers", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, toggle_default_tab_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "preferences", !1], [2, [7, "/", !1], [2, [6, "toggle_default_tab", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, top_daily_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "top", !1], [2, [7, "/", !1], [2, [6, "daily", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, unbind_alipay_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "wallet", !1], [2, [7, "/", !1], [2, [6, "unbind_alipay", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, undismiss_comment_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "undismiss", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, unsubscribe_collection_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "unsubscribe", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, update_further_reading_state_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "update_further_reading_state", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, user_path: function () {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, user_avatar_path: function () {
                return n.build_path(["user_id"], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "user_id", !1], [2, [7, "/", !1], [2, [6, "avatar", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, user_password_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [6, "password", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }, user_timeline_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "timeline", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, verify_sms_token_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "verify_sms_token", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, videos_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "videos", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, writer_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            }, writer_search_collections_by_title_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [2, [7, "/", !1], [2, [6, "search", !1], [2, [7, "/", !1], [2, [6, "collections_by_title", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            }, writer_submissions_path: function () {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [2, [7, "/", !1], [2, [6, "submissions", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }
        }, r.Routes.options = i, r.Routes
    }, "function" == typeof define && define.amd ? define([], function () {
        return o()
    }) : o()
}.call(this);
var I18n = I18n || {};
I18n.translations = I18n.translations || {}, I18n.translations["zh-CN"] = {
    recommended: {
        title_done: "\u70b9\u51fb\u5e95\u90e8\u300c\u5b8c\u6210\u300d\u6309\u94ae\u5373\u53ef\u5b8c\u6210\u5173\u6ce8\u3002",
        title: "\u60a8\u8fd8\u6ca1\u6709\u5173\u6ce8\u4efb\u4f55\u4e13\u9898\uff0c\u5173\u6ce8\u4e00\u4e9b\u611f\u5174\u8da3\u7684\u4e13\u9898\uff0c\u5f00\u59cb\u9605\u8bfb\u4f18\u79c0\u7684\u6587\u7ae0\u5427\u3002"
    },
    kalamu: {
        link_format_error: "\u4ec5\u652f\u6301http, https, ftp\u94fe\u63a5\u3002",
        insert_image: "\u63d2\u5165\u56fe\u7247",
        insert_video: "\u63d2\u5165\u89c6\u9891",
        local_image: "\u672c\u5730\u4e0a\u4f20",
        or: "\u6216",
        internet_image: "\u7f51\u7edc\u56fe\u7247",
        select_image: "\u9009\u62e9\u56fe\u7247",
        cancel: "\u53d6\u6d88",
        image_url: "\u56fe\u7247\u94fe\u63a5",
        ok: "\u786e\u8ba4",
        processing: "\u4e0a\u4f20\u4e2d...",
        failed: "\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002",
        image_url_blank: "\u8bf7\u8f93\u5165\u94fe\u63a5",
        insert_link: "\u63d2\u5165\u94fe\u63a5",
        link_url: "\u94fe\u63a5\u5730\u5740",
        link_text: "\u94fe\u63a5\u6587\u672c",
        video_url: "\u8bf7\u8f93\u5165\u89c6\u9891\u94fe\u63a5",
        loading_video: "\u6b63\u5728\u52a0\u8f7d\u89c6\u9891\uff0c\u8bf7\u7a0d\u7b49\u2026\u2026",
        video_source_support_start: "\u76ee\u524d\u53ea\u652f\u6301",
        video_source_support_yk: "\u4f18\u9177",
        video_source_support_td: "\u571f\u8c46",
        video_source_support_and: "\u4e0e",
        video_source_support_tx: "\u817e\u8baf\u89c6\u9891",
        video_source_support_acfun: "A\u7ad9\u89c6\u9891",
        video_source_support_bilibili: "B\u7ad9\u89c6\u9891",
        wrong_video_source: "\u89c6\u9891\u6765\u6e90\u4e0d\u652f\u6301\uff01\u8bf7\u8f93\u5165\u652f\u6301\u7684\u89c6\u9891\u5730\u5740\uff01",
        fetch_video_info_failed: "\u62b1\u6b49\uff0c\u60a8\u8f93\u5165\u7684\u5730\u5740\u65e0\u6cd5\u8bc6\u522b\uff01",
        close_video: "\u6536\u8d77\u89c6\u9891",
        too_more_video: "\u5355\u7bc7\u6587\u7ae0\u6700\u591a\u53ea\u80fd\u653e{{limit}}\u4e2a\u89c6\u9891\u54df\uff01",
        wrong_image_file_format: "\u56fe\u7247\u683c\u5f0f\u9519\u8bef,\u8bf7\u4f7f\u7528jpg/jpeg/png/gif\u6587\u4ef6\u3002",
        size_excceed_limit: "\u6587\u4ef6\u5927\u5c0f\u8d85\u8fc7\u9650\u5236, \u8bf7\u9009\u62e95MB\u4ee5\u4e0b\u7684\u6587\u4ef6\u3002",
        image_url_blank: "\u8bf7\u586b\u5199\u56fe\u7247\u5730\u5740\u3002",
        image_protocol_not_supported: "\u6211\u4eec\u76ee\u524d\u4e0d\u652f\u6301\u8be5\u534f\u8bae\u3002",
        select_image: "\u9009\u62e9\u56fe\u7247\u4e0a\u4f20",
        image_privacy: "\u6709\u5173\u56fe\u7247\u79c1\u5bc6\u6027\u70b9\u51fb\u95ee\u53f7\u4e86\u89e3\u66f4\u591a",
        upload_internal_server_error: "\u4e0a\u4f20\u5931\u8d25, \u8bf7\u91cd\u8bd5\u3002",
        "image-uploading": "\u6b63\u5728\u4e0a\u4f20...",
        "retry-upload-image": "\u91cd\u65b0\u4e0a\u4f20",
        "cannot-save-with-empty-title": "\u6587\u7ae0\u6807\u9898\u4e0d\u5f97\u4e3a\u7a7a\uff01",
        "cannot-save-while-uploading": "\u56fe\u7247\u6b63\u5728\u4e0a\u4f20\uff0c\u6682\u4e0d\u80fd\u53d1\u5e03\u6587\u7ae0\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01",
        "stop-save-with-extra-image": "\u6587\u7ae0\u91cc\u542b\u6709\u5916\u7f51\u56fe\u7247\uff0c\u53ef\u80fd\u4f1a\u7531\u4e8e\u5404\u79cd\u539f\u56e0\u5bfc\u81f4\u522b\u7684\u7528\u6237\u65e0\u6cd5\u6b63\u5e38\u6d4f\u89c8\uff0c\u662f\u5426\u5c06\u8fd9\u4e9b\u56fe\u7247\u4e0a\u4f20\u5230\u7b80\u4e66\u56fe\u5e8a\uff1f",
        "upload-all-extra-images": "\u73b0\u5728\u4e0a\u4f20",
        "continue-saving": "\u7ee7\u7eed\u53d1\u5e03",
        auto_upload_external_images: '\u6b63\u5728\u4e0a\u4f20\u56fe\u7247\uff08<span class="auto_uploading_done">0</span> / <span class="auto_uploading_total">0</span>\uff09',
        auto_upload_external_images_finished: "\u6b63\u5728\u53d1\u5e03\u6587\u7ae0",
        cancel_auto_uploading: "\u53d6\u6d88\u4e0a\u4f20",
        auto_uploading: "\u6b63\u5728\u4e0a\u4f20",
        auto_public_done: "\u53d1\u5e03\u6210\u529f",
        auto_public_fail: "\u53d1\u5e03\u5931\u8d25"
    },
    ie_warning: {
        title: "\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
        upgrade_ie: '\u8bf7\u5347\u7ea7\u60a8\u7684 IE \u6d4f\u89c8\u5668\uff0c <a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-9/worldwide-languages">\u70b9\u6b64\u5904\u5347\u7ea7</a>\u3002',
        use_chrome: '\u6211\u4eec\u63a8\u8350\u4f7f\u7528 <a href="http://www.google.com/chrome" class="use-chrome">Google Chrome </a>\u6765\u8bbf\u95ee\u7b80\u4e66\u83b7\u53d6\u6700\u4f73\u7684\u7528\u6237\u4f53\u9a8c\u3002',
        skip: "\u8df3\u8fc7"
    },
    recycle: {
        list: {title: "\u56de\u6536\u7ad9 ({{count}})"},
        entry: {
            days_left_before_destroy: "{{days}} \u5929\u540e\u6e05\u9664",
            destroy_date: "\u5c06\u4e8e {{date}} \u540e\u6e05\u9664"
        },
        content: {
            put_back: "\u6062\u590d\u6587\u7ae0",
            delete_forever: "\u5f7b\u5e95\u5220\u9664",
            delete_forever_confirm: "\u786e\u8ba4\u5f7b\u5e95\u5220\u9664\u6587\u7ae0\u300a{{title}}\u300b\uff0c\u8be5\u64cd\u4f5c\u65e0\u6cd5\u9006\u8f6c\u3002"
        }
    },
    reading: {
        sign_in: {
            go_to_domestic: "\u624b\u673a/\u90ae\u7bb1\u767b\u5f55",
            go_to_foreign: "\u6d77\u5916\u624b\u673a\u767b\u5f55"
        },
        modals: {
            sms_bind_modal: {
                title: "\u7ed1\u5b9a\u624b\u673a",
                send_sms_code: "\u53d1\u9001\u9a8c\u8bc1\u7801",
                ok: "\u5b8c\u6210\u9a8c\u8bc1",
                mobile_number_empty: "\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801",
                code_empty: "\u8bf7\u8f93\u5165\u60a8\u6536\u5230\u7684\u516d\u4f4d\u77ed\u4fe1\u9a8c\u8bc1\u7801",
                pls_enter_mobile_number: "\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801",
                pls_enter_code: "\u8bf7\u8f93\u5165\u6536\u5230\u7684\u77ed\u4fe1\u9a8c\u8bc1\u7801"
            }
        },
        search: {
            not_found: "\u672a\u627e\u5230\u76f8\u5173\u5185\u5bb9",
            retry: "\u91cd\u8bd5",
            feedback: "\u5411\u7b80\u4e66\u53cd\u9988",
            not_found_collection: "\u7b80\u4e66\u4e0a\u8fd8\u6ca1\u6709\u76f8\u5173\u4e13\u9898\uff0c\u5c1d\u8bd5\u641c\u7d22\u5176\u4ed6\u5173\u952e\u8bcd\u6216\u81ea\u5df1\u521b\u5efa\u4e00\u4e2a",
            new_collection: "\u65b0\u5efa\u4e13\u9898",
            notes: {
                footer: {
                    views: "\xb7 \u9605\u8bfb {{count}}",
                    likes: "\xb7 \u559c\u6b22 {{count}}",
                    rewards: "\xb7 \u6253\u8d4f {{count}}",
                    comments: "\xb7 \u8bc4\u8bba {{count}}"
                }
            },
            users: {footer: "\u5199\u4e86 {{total_wordage}} \u4e2a\u5b57, {{public_notes_count}} \u7bc7\u6587\u7ae0, \u5f97\u5230\u4e86 {{total_likes_count}} \u4e2a\u8d5e, \u88ab {{followers_count}} \u4eba\u5173\u6ce8"},
            errors: {"default": "\u975e\u5e38\u62b1\u6b49\uff0c\u670d\u52a1\u5668\u51fa\u73b0\u4e86\u4e00\u4e2a\u95ee\u9898\uff0c\u5de5\u7a0b\u5e08\u4eec\u6b63\u5728\u89e3\u51b3\u4e2d..."},
            collections: {
                footer: {
                    editing: "\u30fb\u7f16,",
                    meta: "{{public_notes_count}} \u7bc7\u6587\u7ae0, {{likes_count}} \u4eba\u5173\u6ce8"
                }
            },
            notebooks: {footer: "{{public_notes_count}} \u7bc7\u6587\u7ae0, {{subscribers_count}} \u4eba\u5173\u6ce8"},
            pagination: {prev: "\u4e0a\u4e00\u9875", next: "\u4e0b\u4e00\u9875"}
        },
        captcha: {
            geetest_validate_empty: "\u8bf7\u5b8c\u6210\u6ed1\u5757\u9a8c\u8bc1",
            captcha_validate_empty: "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801",
            image_captcha_code_empty: "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801",
            placeholder: "\u9a8c\u8bc1\u7801",
            refresh_button: "\u770b\u4e0d\u6e05\u695a\uff1f\u6362\u4e00\u5f20",
            invalid_message: "\u9a8c\u8bc1\u7801{{message}}"
        },
        withdrawal: {
            amount_tip_original: "* \u6bcf\u6b21\u63d0\u73b0\u6536\u53d6 {{rate}}% \u624b\u7eed\u8d39",
            amount_tip: "* \u6bcf\u6b21\u63d0\u73b0\u6536\u53d6 {{rate}}% \u624b\u7eed\u8d39, \u60a8\u5c06\u6536\u5230: {{amount}} \u5143\u3002"
        },
        abuse_report: {
            confirm: "\u662f\u5426\u4e3e\u62a5\uff1f",
            report_success: "\u4e3e\u62a5\u6210\u529f",
            no_reason: "\u8bf7\u586b\u5199\u4e3e\u62a5\u539f\u56e0",
            report: "\u4e3e\u62a5",
            ad: "\u5e7f\u544a\u53ca\u5783\u573e\u4fe1\u606f",
            other: "\u5176\u4ed6"
        },
        notes: {
            show: {
                like_item_tooltip: "{{nickname}} {{timeago}}\u559c\u6b22\u4e86\u8fd9\u7bc7\u6587\u7ae0",
                contribute_status: {
                    approved: "\uff08\u5df2\u6536\u5165\uff09",
                    pending: "\uff08\u7b49\u5f85\u4e2d\uff09"
                },
                reward: {
                    total_count: "{{total_count}} \u4eba\u6253\u8d4f\u4e86\u8fd9\u7bc7\u6587\u7ae0",
                    tooltip: "{{nickname}} \xb7 {{timeago}}"
                }
            }, list: {follow: "\u5173\u6ce8\u4f5c\u8005{{nickname}}", unfollow: "\u53d6\u6d88\u5173\u6ce8"}
        },
        chats: {search_friends: {no_result: "\u672a\u627e\u5230\u76f8\u5173\u7528\u6237"}},
        wordage: "\u5b57\u6570{{wordage}}",
        views_count: "\u9605\u8bfb{{count}}",
        likes_count: "\u559c\u6b22{{count}}",
        comments_count: "\u8bc4\u8bba{{count}}",
        self_destroy_done: "\u7528\u6237\u5df2\u6210\u529f\u5220\u9664\uff0c\u73b0\u5728\u6b63\u5728\u8df3\u8f6c\u56de\u9996\u9875...",
        registration_complete: "\u6ce8\u518c\u6210\u529f\uff0c\u6b63\u5728\u8df3\u8f6c...",
        errors: {email_invalid: "\u90ae\u4ef6\u5730\u5740\u683c\u5f0f\u6709\u8bef"},
        btn_group: {
            add_to_collection: "\u52a0\u5165\u4e13\u9898",
            bookmark: "\u6536\u85cf\u6587\u7ae0",
            share: "\u5206\u4eab\u6587\u7ae0"
        },
        bookmark: "\u6536\u85cf\u6587\u7ae0",
        bookmarked: "\u6536\u85cf\u6210\u529f",
        unbookmarked: "\u53d6\u6d88\u6536\u85cf\u6210\u529f",
        download_changweibo_image: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247",
        following: " \u6b63\u5728\u5173\u6ce8",
        unfollow: " \u53d6\u6d88\u5173\u6ce8",
        subscribe: " \u6dfb\u52a0\u5173\u6ce8",
        subscribing: " \u6b63\u5728\u5173\u6ce8",
        unsubscribe: " \u53d6\u6d88\u5173\u6ce8",
        show_description: "\u5c55\u5f00\u63cf\u8ff0",
        hidden_description: "\u6536\u8d77\u63cf\u8ff0",
        bian: " \u7f16",
        remove: "\u79fb\u9664",
        comment: {
            undismiss_button: "\u64a4\u9500",
            dismiss_info: "\u8bc4\u8bba\u5df2\u5220\u9664",
            undismiss_info: "\u8bc4\u8bba\u5df2\u6062\u590d",
            delete_confirm: "\u786e\u5b9a\u8981\u5220\u9664\u8bc4\u8bba\u4e48?",
            delete_button: "\u5220\u9664",
            dismiss_button: "\u5220\u9664",
            reply_button: "\u56de\u590d",
            like: "\u559c\u6b22",
            floor: "{{floor}} \u697c",
            description: "\u8fd8\u6709 {{length}} \u6761\u8bc4\u8bba\uff0c",
            more: " \u5c55\u5f00\u67e5\u770b",
            show: "\u56de\u590d",
            collapse: "\u6536\u8d77",
            expand: "\u5c55\u5f00",
            form: {
                submit_button: "\u53d1 \u8868",
                submitting_comment_disable: "\u63d0\u4ea4\u4e2d...",
                content_placeholder: "\u5199\u4e0b\u4f60\u7684\u8bc4\u8bba\u2026",
                hotkey: {mac: "\u2318+Return \u53d1\u8868", other: "Ctrl+Enter \u53d1\u8868"}
            },
            footer: {add_comment: " \u6dfb\u52a0\u65b0\u56de\u590d"}
        },
        reject: {
            title: "\u62d2\u7edd\u6295\u7a3f",
            description: "\u56de\u4e2a\u4fe1\u7ed9\u6295\u7a3f\u8005\uff0c\u544a\u77e5\u60a8\u62d2\u7edd\u7684\u7406\u7531\uff0c\u4e5f\u53ef\u4ee5\u4e0d\u586b\u3002",
            placeholder: "\u7ee7\u7eed\u52a0\u6cb9\u4ec0\u4e48\u7684\u2026\u2026",
            close: "\u5173\u95ed",
            submit: "\u786e\u5b9a"
        },
        further_reading: {
            button: {
                "continue": "\u7ee7\u7eed",
                save: "\u4fdd\u5b58",
                load: "\u786e\u5b9a",
                cancel: "\u53d6\u6d88",
                "delete": " \u5220\u9664"
            },
            from: " \u6765\u81ea ",
            add: "\u6dfb\u52a0",
            states: {"private": " \u79c1\u6709", "public": " \u516c\u5f00", dismiss: " \u5220\u9664"},
            load_link_error: "\u51fa\u9519\u4e86\uff0c\u6211\u4eec\u4e0d\u80fd\u52a0\u8f7d\u8fd9\u6761\u94fe\u63a5\uff01",
            undo_link: "\u94fe\u63a5{{state}} \u6210\u529f\u30fb<a class='undo' data-further-reading-id='{{id}}' data-state='{{originState}}' href='javascript:void(null)'>\u64a4\u9500</a>",
            link_text_placeholder: "\u7c98\u8d34\u6216\u8f93\u5165\u94fe\u63a5",
            title_placeholder: "\u6807\u9898",
            description_placeholder: "\u6dfb\u52a0\u63cf\u8ff0",
            delete_success: "\u62d3\u5c55\u9605\u8bfb\u5220\u9664\u6210\u529f"
        },
        timeline: {
            show_comments: "\u67e5\u770b\u8bc4\u8bba",
            collapse_comments: "\u6536\u8d77\u8bc4\u8bba",
            reply: "\u56de\u590d",
            "delete": "\u5220\u9664"
        },
        self_destruction_confirm: "\u8bf7\u786e\u8ba4\u60a8\u786e\u5b9e\u8981\u5220\u9664\u60a8\u7684\u8d26\u6237, \u6b64\u64cd\u4f5c\u65e0\u6cd5\u6062\u590d!",
        delete_comment_confirm: "\u786e\u5b9a\u8981\u5220\u9664\u8bc4\u8bba\u4e48?",
        collections: {
            select_note: "\u8bf7\u9009\u62e9\u6587\u7ae0\uff1a",
            select_note_error: "\u8bf7\u9009\u62e9\u4e00\u7bc7\u6587\u7ae0",
            show: {
                subscriber_tooltip: "{{nickname}} {{timeago}}\u5173\u6ce8\u4e86\u8fd9\u4e2a\u4e13\u9898",
                subscribers_count_tooltip: "\u67e5\u770b\u6240\u6709\u5173\u6ce8\u7528\u6237",
                can_not_contribute: "\u8be5\u4e13\u9898\u6682\u4e0d\u63a5\u53d7\u6295\u7a3f",
                invited: "\u5df2\u9080\u8bf7",
                invite_success: "\u9080\u8bf7\u6210\u529f",
                include_info_tooltip: "{{timeago}}\u6536\u5165",
                include_info_tooltip_from_editor: "\u7531 {{nickname}} {{timeago}}\u6536\u5165"
            }
        },
        social_sharing: {
            trailing_jianshushe: "- \u7b80\u4e66\u793e",
            share_to_label: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                tweibo: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+",
                renren: "\u5206\u4eab\u5230\u4eba\u4eba\u7f51",
                weixin: "\u5206\u4eab\u5230\u5fae\u4fe1",
                changweibo: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247"
            },
            self_share_note_text: "\u6211\u5199\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
            reader_share_note_text: "#\u6211\u5728\u770b\u7b80\u4e66# \u63a8\u8350 {{user} \u7684\u6587\u7ae0\u300a{{note_title}}\u300b",
            self_share_notebook_text: "\u6211\u53d1\u5e03\u4e86\u6587\u96c6\u300a{{notebook_title}}\u300b",
            reader_share_notebook_text: "#\u6211\u5728\u770b\u7b80\u4e66# \u63a8\u8350 {{user}} \u7684\u6587\u96c6\u300a{{notebook_title}}\u300b",
            share_collection_text: "#\u6211\u5728\u770b\u7b80\u4e66# \u63a8\u8350\u4e13\u9898\u300a{{collection_title}}\u300b",
            official_account: "\uff08 \u5206\u4eab\u81ea {{account}} \uff09"
        },
        rewards: {
            amount_less_than_zero: "\u6253\u8d4f\u91d1\u989d\u4e0d\u80fd\u5c0f\u4e8e1\u5143",
            amount_greater_than_maximum: "\u6253\u8d4f\u91d1\u989d\u4e0d\u80fd\u5927\u4e8e1\u4e07\u5143",
            amount_greater_than_limit: "\u6253\u8d4f\u91d1\u989d\u4e0d\u80fd\u5927\u4e8e200\u5143",
            amount_greater_than_balance: "\u7b80\u4e66\u4f59\u989d\u4e0d\u8db3\uff0c\u8bf7\u5145\u503c\u6216\u8005\u4f7f\u7528\u5176\u5b83\u652f\u4ed8\u65b9\u5f0f",
            pay_now: "\u7acb\u5373\u652f\u4ed8"
        },
        copyright: {
            link: "\u539f\u6587\u94fe\u63a5\uff1a",
            author_type: "\u7b80\u4e66\u4f5c\u8005",
            singed_author_type: "\u7b80\u4e66\u7b7e\u7ea6\u4f5c\u8005",
            message: "\u8457\u4f5c\u6743\u5f52\u4f5c\u8005\u6240\u6709\uff0c\u8f6c\u8f7d\u8bf7\u8054\u7cfb\u4f5c\u8005\u83b7\u5f97\u6388\u6743\uff0c\u5e76\u6807\u6ce8\u201c\u7b80\u4e66\u4f5c\u8005\u201d\u3002",
            signed_message: "\u8457\u4f5c\u6743\u5f52\u4f5c\u8005\u6240\u6709\uff0c\u8f6c\u8f7d\u8bf7\u8054\u7cfb\u4f5c\u8005\u83b7\u5f97\u6388\u6743\uff0c\u5e76\u6807\u6ce8\u201c\u7b80\u4e66\u7b7e\u7ea6\u4f5c\u8005\u201d\u3002"
        }
    },
    note_logs: {
        list_title: "\u5171 {{count}} \u6761\u5386\u53f2\u7248\u672c",
        apply_this_log: "\u6062\u590d\u5230\u8fd9\u4e2a\u7248\u672c",
        filter: "\u7b5b\u9009",
        types: {
            autosave: "\u81ea\u52a8\u4fdd\u5b58",
            publish: "\u516c\u5f00\u53d1\u5e03\u6587\u7ae0",
            post_updates: "\u53d1\u5e03\u66f4\u65b0",
            before_restore: "\u7248\u672c\u6062\u590d"
        },
        apps: {maleskine: "\u7f51\u9875\u7aef", hugo: "iOS App", haruki: "Android App"}
    },
    browser_tip: {
        title: "\u522b\u518d\u62d6\u5ef6\uff0c\u662f\u65f6\u5019\u66f4\u65b0\u60a8\u7684\u6d4f\u89c8\u5668\u5566",
        intro: "\u4e3a\u4e86\u7ed9\u60a8\u5e26\u6765\u66f4\u4f18\u8d28\u7684\u5728\u7ebf\u5199\u4f5c\u4f53\u9a8c\uff0c\u7b80\u4e66\u5efa\u8bae\u60a8\u4f7f\u7528\u6700\u65b0\u7248\u672c\u7684 Chrome \u6d4f\u89c8\u5668\u6216\u5176\u4ed6\u63a8\u8350\u6d4f\u89c8\u5668\u8fdb\u884c\u5199\u4f5c\u3002",
        download: "\u5b98\u65b9\u7f51\u7ad9"
    },
    new_notebook: "\u65b0\u5efa\u6587\u96c6",
    new_notebook_name: "\u65b0\u6587\u96c6\u540d",
    new_note: "\u65b0\u5efa\u6587\u7ae0",
    default_note_title: "\u65e0\u6807\u9898\u6587\u7ae0",
    delete_notebook_confirm: "\u786e\u8ba4\u5220\u9664\u6587\u96c6\u300a{{title}}\u300b\uff0c\u6587\u96c6\u5185\u6587\u7ae0\u5c06\u4f1a\u88ab\u79fb\u52a8\u5230\u56de\u6536\u7ad9\u3002",
    delete_note_confirm: "\u786e\u8ba4\u5220\u9664\u6587\u7ae0\u300a{{title}}\u300b\uff0c\u6587\u7ae0\u5c06\u88ab\u79fb\u52a8\u5230\u56de\u6536\u7ad9\uff0c\u60a8\u53ef\u4ee5\u5728\u90a3\u91cc\u6062\u590d\u5b83\u300260\u5929\u540e\u5c06\u88ab\u5f7b\u5e95\u5220\u9664\u3002",
    rename_notebook: "\u4fee\u6539\u6587\u96c6\u540d",
    delete_notebook: "\u5220\u9664\u6587\u96c6",
    saving: "\u4fdd\u5b58\u4e2d...",
    saved: "\u5df2\u4fdd\u5b58",
    compiled: "\u66f4\u65b0\u5df2\u6210\u529f\u53d1\u5e03",
    saved_partially: "\u6587\u7ae0\u8fc7\u957f, \u5c3e\u7aef\u90e8\u5206\u5185\u5bb9\u672a\u4fdd\u5b58",
    change_notebook_placeholder: "\u8bf7\u9009\u62e9\u76ee\u6807\u6587\u96c6..",
    wordage: "\u5b57\u6570: {{wordage}}",
    commerical_placeholder: "\u5c5e\u4e8e\u5199\u4f5c\u8005\u7684\u6587\u96c6, \u4e00\u4e2a\u7b80\u6d01\u800c\u4f18\u96c5\u7684\u73af\u5883\u8ba9\u4f60\u4e13\u6ce8\u4e8e\u4e66\u5199\u3002",
    notebook_name_placeholder: "\u8bf7\u8f93\u5165\u6587\u96c6\u540d...",
    nickname_format_invalid: "\u6635\u79f0\u683c\u5f0f\u4e0d\u6b63\u786e",
    nickname: "\u6635\u79f0",
    spine_ajax_pending: "\u5b58\u50a8\u8bf7\u6c42\u5c1a\u672a\u5168\u90e8\u5b8c\u6210, \u672a\u4fdd\u5b58\u6570\u636e\u5c06\u4f1a\u4e22\u5931, \u786e\u5b9a\u8981\u79bb\u5f00\u9875\u9762\u4e48?",
    form_dirty: "\u68c0\u6d4b\u5230\u6709\u672a\u4fdd\u5b58\u7684\u6570\u636e, \u786e\u5b9a\u8981\u79bb\u5f00\u9875\u9762\u4e48?",
    toggle_to_markdown: "\u5207\u6362\u7f16\u8f91\u5668\u4e3a\u300cMarkdown\u7f16\u8f91\u5668\u300d",
    toggle_to_plain: "\u5207\u6362\u7f16\u8f91\u5668\u4e3a\u300c\u5bcc\u6587\u672c\u7f16\u8f91\u5668\u300d",
    suggest_chrome: "\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer, \u6211\u4eec\u5efa\u8bae\u4f7f\u7528 Google Chrome \u8bbf\u95ee\u300e\u7b80\u4e66\u300f\u4ee5\u83b7\u5f97\u6700\u4f73\u4f53\u9a8c\u3002",
    suggest_upgrade: "\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer 8/9, \u5728\u6b64\u60c5\u51b5\u4e0b, \u4f1a\u51fa\u73b0\u6027\u80fd\u95ee\u9898, \u5e76\u4e14\u6211\u4eec\u65e0\u6cd5\u63d0\u4f9b\u5b8c\u6574\u7684\u529f\u80fd, \u5efa\u8bae\u4f7f\u7528 Google Chrome \u8bbf\u95ee\u300e\u7b80\u4e66\u300f\u4ee5\u83b7\u5f97\u6700\u4f73\u4f53\u9a8c, \u6216\u662f\u5347\u7ea7\u81f3 Internet Explorer 10\u3002",
    chrome_bug: "\u6211\u4eec\u53d1\u73b0\u60a8\u5f53\u524d\u7684 Chrome \u7248\u672c(33.0.1750.152)\u5b58\u5728\u5df2\u77e5bug, \u5728\u5f53\u524d Chrome \u7248\u672c\u4e0b\u60a8\u5c06\u65e0\u6cd5\u5728\u5bcc\u6587\u672c\u7f16\u8f91\u5668\u4e2d\u4e0a\u4f20\u56fe\u7247/\u7f16\u8f91\u94fe\u63a5, \u8bf7\u5347\u7ea7\u81f3\u6700\u65b0Chrome\u7248\u672c\u3002",
    restore_a_locale_copy: "\u6211\u4eec\u4ece\u672c\u5730\u5b58\u50a8\u4e2d\u6062\u590d\u4e86\u60a8\u7684\u8fd9\u7bc7\u6587\u7ae0, \u5982\u679c\u4ed6\u4e0d\u662f\u6700\u65b0\u7248\u60a8\u53ef\u4ee5: ",
    leaving_note_unsaved: "\u60a8\u7684\u6587\u7ae0\u5df2\u7ecf\u4fee\u6539, \u5e76\u4e14\u5c1a\u672a\u4fdd\u5b58, \u662f\u5426\u4fdd\u5b58?",
    press_esc_to_leave: "\u6309 Esc \u9000\u51fa.",
    new_note_bottom: "\u5728\u4e0b\u65b9\u65b0\u5efa\u6587\u7ae0",
    ajax_error: "\u51fa\u73b0\u9519\u8bef, \u8bf7\u5907\u4efd\u60a8\u5f53\u524d\u7684\u4f5c\u54c1\u5e76\u5237\u65b0\u9875\u9762.",
    publish: "\u53d1\u5e03\u6587\u7ae0",
    published: "\u5df2\u53d1\u5e03",
    unpublish: "\u53d6\u6d88\u53d1\u5e03",
    publish_changes: "\u53d1\u5e03\u66f4\u65b0",
    publishing: "\u53d1\u5e03\u4e2d...",
    toolbar: {
        writing_mode: "\u5207\u6362\u5230\u5199\u4f5c\u6a21\u5f0f",
        preview_mode: "\u5207\u6362\u5230\u9884\u89c8\u6a21\u5f0f",
        "return": "\u8fd4\u56de",
        save: "\u4fdd\u5b58",
        redo: "\u91cd\u505a",
        undo: "\u64a4\u9500",
        bold: "\u7c97\u4f53",
        italic: "\u659c\u4f53",
        strikethrough: "\u5220\u9664\u7ebf",
        blockquote: "\u5f15\u7528",
        heading1: "\u6807\u9898\u4e00",
        heading2: "\u6807\u9898\u4e8c",
        heading3: "\u6807\u9898\u4e09",
        heading4: "\u6807\u9898\u56db",
        headline: "\u5206\u5272\u7ebf",
        insert_link: "\u63d2\u5165\u94fe\u63a5",
        insert_image: "\u63d2\u5165\u56fe\u7247",
        insert_video: "\u63d2\u5165\u89c6\u9891",
        history: "\u5386\u53f2\u7248\u672c"
    },
    errors: {
        401: "\u51fa\u73b0\u5b89\u5168\u9a8c\u8bc1\u9519\u8bef, \u8bf7\u624b\u52a8\u4fdd\u5b58\u5f53\u524d\u4f5c\u54c1, \u5237\u65b0\u9875\u9762\u91cd\u8bd5.",
        404: '\u8bf7\u6c42\u7684\u6587\u7ae0/\u6587\u96c6\u4e0d\u5b58\u5728, \u8bf7<a href="http://www.jianshu.com/writer/#/">\u70b9\u6b64\u5237\u65b0\u9875\u9762</a>.',
        500: "\u670d\u52a1\u5668\u9519\u8bef, \u8bf7\u624b\u52a8\u4fdd\u5b58\u5f53\u524d\u4f5c\u54c1, \u5237\u65b0\u9875\u9762\u91cd\u8bd5.",
        content_overflow: "\u5f53\u524d\u6587\u7ae0\u5185\u5bb9\u8fc7\u957f, \u7bc7\u5c3e\u90e8\u5206\u5185\u5bb9\u65e0\u6cd5\u4fdd\u5b58, \u8bf7\u5148\u624b\u52a8\u5907\u4efd\uff0c\u7136\u540e\u65b0\u5efa\u6587\u7ae0\u5206\u5f00\u4e66\u5199!",
        writer_version_conflict: "\u60a8\u5df2\u5728\u5176\u4ed6\u7a97\u53e3\u4e2d\u5bf9\u672c\u6587\u8fdb\u884c\u4e86\u66f4\u65b0\uff0c\u4ee5\u9632\u4e22\u5931\u4efb\u4f55\u6587\u5b57\uff0c\u8bf7\u624b\u52a8\u5907\u4efd\u5f53\u524d\u6539\u52a8\uff0c\u5237\u65b0\u672c\u9875\u540e\u7ee7\u7eed"
    },
    warnings: {content_too_large: "\u5f53\u524d\u6587\u7ae0\u957f\u5ea6\u6b63\u5728\u63a5\u8fd1\u7b80\u4e66\u7684\u9650\u5ea6, \u8bf7\u8003\u8651\u5206\u7bc7\u4e66\u5199\u5427"},
    network: {
        issue: "\u7f51\u7edc\u8fde\u63a5\u901f\u5ea6\u8fc7\u6162\u6216\u6b63\u5728\u51fa\u73b0\u95ee\u9898, \u53ef\u80fd\u6062\u590d, \u53ef\u4ee5\u7ee7\u7eed\u64cd\u4f5c.",
        down: "\u7f51\u7edc\u8fde\u63a5\u8fde\u7eed\u51fa\u9519, \u8bf7\u52a1\u5fc5\u5907\u4efd\u60a8\u5f53\u524d\u7684\u4f5c\u54c1\u5e76\u5237\u65b0\u9875\u9762!",
        back: "\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u5df2\u6062\u590d\u3002"
    },
    navbar: {
        homepage: "\u9996\u9875",
        collections: "\u4e13\u9898",
        top: "\u7b80\u4e66\u70ed\u95e8",
        timeline: "\u7b80\u53cb\u5708",
        writer: "\u5199\u6587\u7ae0",
        user_homepage: "\u6211\u7684\u4e3b\u9875",
        favourites: "\u6211\u559c\u6b22\u7684",
        bookmarks: "\u6211\u7684\u6536\u85cf",
        notifications: "\u63d0\u9192",
        messages: "\u7b80\u4fe1",
        view_mode: "\u663e\u793a\u6a21\u5f0f",
        settings: "\u8bbe\u7f6e",
        sign_out: "\u767b\u51fa"
    },
    note_modified: {
        mac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8bf7\u6309 command + s \u4fdd\u5b58\u3002",
        nonmac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8bf7\u6309 ctrl + s \u4fdd\u5b58\u3002"
    },
    note: {
        untitled: "\u65e0\u6807\u9898\u6587\u7ae0",
        collection: {adding: "\u52a0\u8f7d\u4e2d\u2026\u2026"},
        dropdown: {
            share_directly: "\u76f4\u63a5\u53d1\u5e03",
            move_note: "\u79fb\u52a8\u6587\u7ae0",
            shared: "\u5df2\u53d1\u5e03",
            share_to: "\u5206\u4eab\u5230",
            delete_note: "\u5220\u9664\u6587\u7ae0",
            revision_history: "\u5386\u53f2\u7248\u672c",
            share_to_sns: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                tweibo: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+"
            },
            open_in_new_window: "\u5728\u65b0\u7a97\u53e3\u6253\u5f00",
            stop_sharing: "\u505c\u6b62\u5206\u4eab"
        },
        moving: {title: "\u79fb\u52a8\u6587\u7ae0\u5230"},
        share: {
            title: "\u76f4\u63a5\u53d1\u5e03",
            help: "\u70b9\u51fb\u201c\u53d1\u5e03\u201d\u6309\u94ae\u540e\u6587\u7ae0\u5c06\u4f1a\u751f\u6210\u4e00\u4e2a\u201c\u56fa\u5b9a\u94fe\u63a5\u201d\uff0c\u4ed6\u4eba\u901a\u8fc7\u8be5\u56fa\u5b9a\u94fe\u63a5\u5373\u53ef\u8bbf\u95ee\u4f60\u7684\u6587\u7ae0\uff0c\u4f60\u4e5f\u53ef\u4ee5\u968f\u540e\u5c06\u56fa\u5b9a\u94fe\u63a5\u544a\u77e5\u4ed6\u4eba\u6216\u8005\u5206\u4eab\u5230\u4f60\u7684\u793e\u4ea4\u7f51\u7edc\u3002",
            permanent_link: "\u56fa\u5b9a\u94fe\u63a5\u5730\u5740",
            success: "\u6587\u7ae0\u53d1\u5e03\u6210\u529f\uff01",
            to_sns: "\u4f60\u8fd8\u53ef\u4ee5\u5206\u4eab\u6587\u7ae0\u5230\u793e\u4ea4\u7f51\u7edc:",
            share_note: "\u5206\u4eab\u6587\u7ae0",
            click_to_show: "\u70b9\u51fb\u6807\u9898\u53ef\u4ee5\u67e5\u770b\u5df2\u53d1\u5e03\u7684\u6587\u7ae0"
        },
        contribute: {
            hint: "\u4e3a\u4e86\u60a8\u7684\u6587\u7ae0\u88ab\u66f4\u591a\u4eba\u53d1\u73b0\uff0c\u60a8\u53ef\u4ee5\u9009\u62e9\u6295\u7a3f\u5230\u5bf9\u5e94\u4e13\u9898",
            contribute_to_collection: "\u6295\u7a3f",
            add_to_collection: "\u6536\u5165\u4e13\u9898",
            pending: "\u7b49\u5f85\u5ba1\u6838",
            remove_from_collection: "\u4ece\u4e13\u9898\u79fb\u9664",
            collection_info: "{{notes_count}} \u7bc7\u6587\u7ae0\uff0c{{subscribers_count}} \u4eba\u5173\u6ce8",
            similar_collections: "\u4ee5\u4e0b\u4e13\u9898\u53ef\u80fd\u4e0e\u60a8\u7684\u6587\u7ae0\u76f8\u5173\uff1a",
            editable_collections: "\u6211\u7f16\u8f91\u7684\u4e13\u9898\uff1a",
            no_search_result: "\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u4e13\u9898"
        },
        shareToWeibo: {
            share: "\u5206 \u4eab",
            done: "\u5e26\u957f\u5fae\u535a\u56fe\u7247\u5206\u4eab",
            download: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247",
            processing: "\u6b63\u5728\u751f\u6210\u957f\u5fae\u535a\u56fe\u7247",
            processingNotice: "\u5982\u679c\u60a8\u4e0d\u9700\u8981\u5e26\u957f\u5fae\u535a\u5206\u4eab\uff0c\u53ef\u70b9\u51fb\u4e0b\u9762\u7684\u5206\u4eab\u6309\u94ae\u76f4\u63a5\u5206\u4eab\uff0c\u65e0\u9700\u7b49\u5f85\u3002"
        }
    },
    share: {
        text: "\u6211\u5199\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
        official_account: "\uff08 \u5206\u4eab\u81ea @{{official_account}} \uff09",
        trailing_jianshushe: "- \u7b80\u4e66\u793e"
    },
    button: {
        submitting: "\u6b63\u5728\u63d0\u4ea4...",
        submit_failed: "\u53d1\u9001\u5931\u8d25",
        submit: "\u63d0\u4ea4",
        cancel: "\u53d6\u6d88",
        close: "\u5173\u95ed",
        publish: "\u53d1\u5e03",
        ok: "\u786e\u8ba4",
        undo: "\u64a4\u9500",
        upload_image_notice: "\u5c06\u56fe\u7247\u6587\u4ef6\u76f4\u63a5\u62d6\u52a8\u5230\u7f16\u8f91\u533a\u57df\u5373\u53ef\u4e0a\u4f20",
        upload_image_paste_notice: "\u6216\u8005\u4e5f\u53ef\u4ee5\u5c06\u526a\u8d34\u677f\u91cc\u7684\u56fe\u7247\u76f4\u63a5\u7c98\u8d34\u8fdb\u7f16\u8f91\u533a\u57df"
    },
    "jquery-timeago": {
        prefixAgo: null,
        prefixFromNow: "\u4ece\u73b0\u5728\u5f00\u59cb",
        suffixAgo: "\u4e4b\u524d",
        suffixFromNow: null,
        seconds: "\u4e0d\u52301\u5206\u949f",
        minute: "\u5927\u7ea61\u5206\u949f",
        minutes: "%d\u5206\u949f",
        hour: "\u5927\u7ea61\u5c0f\u65f6",
        hours: "\u5927\u7ea6%d\u5c0f\u65f6",
        day: "1\u5929",
        days: "%d\u5929",
        month: "\u5927\u7ea61\u4e2a\u6708",
        months: "%d\u6708",
        year: "\u5927\u7ea61\u5e74",
        years: "%d\u5e74",
        numbers: [],
        wordSeparator: ""
    },
    date: {
        abbr_day_names: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        abbr_month_names: [null, "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        day_names: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
        formats: {"default": "%Y-%m-%d", "long": "%Y\u5e74%b%d\u65e5", "short": "%b%d\u65e5"},
        month_names: [null, "\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        order: ["year", "month", "day"]
    },
    datetime: {
        distance_in_words: {
            about_x_hours: {
                one: "\u5927\u7ea6\u4e00\u5c0f\u65f6",
                other: "\u5927\u7ea6 %{count} \u5c0f\u65f6"
            },
            about_x_months: {one: "\u5927\u7ea6\u4e00\u4e2a\u6708", other: "\u5927\u7ea6 %{count} \u4e2a\u6708"},
            about_x_years: {one: "\u5927\u7ea6\u4e00\u5e74", other: "\u5927\u7ea6 %{count} \u5e74"},
            almost_x_years: {one: "\u63a5\u8fd1\u4e00\u5e74", other: "\u63a5\u8fd1 %{count} \u5e74"},
            half_a_minute: "\u534a\u5206\u949f",
            less_than_x_minutes: {one: "\u4e0d\u5230\u4e00\u5206\u949f", other: "\u4e0d\u5230 %{count} \u5206\u949f"},
            less_than_x_seconds: {one: "\u4e0d\u5230\u4e00\u79d2", other: "\u4e0d\u5230 %{count} \u79d2"},
            over_x_years: {one: "\u4e00\u5e74\u591a", other: "%{count} \u5e74\u591a"},
            x_days: {one: "\u4e00\u5929", other: "%{count} \u5929"},
            x_minutes: {one: "\u4e00\u5206\u949f", other: "%{count} \u5206\u949f"},
            x_months: {one: "\u4e00\u4e2a\u6708", other: "%{count} \u4e2a\u6708"},
            x_seconds: {one: "\u4e00\u79d2", other: "%{count} \u79d2"}
        }, prompts: {day: "\u65e5", hour: "\u65f6", minute: "\u5206", month: "\u6708", second: "\u79d2", year: "\u5e74"}
    }
};
var I18n = I18n || {};
I18n.translations = I18n.translations || {}, I18n.translations["zh-TW"] = {
    recommended: {
        title_done: "\u9ede\u64ca\u5e95\u90e8\u300c\u5b8c\u6210\u300d\u6309\u9215\u5373\u53ef\u5b8c\u6210\u95dc\u6ce8\u3002",
        title: "\u60a8\u9084\u6c92\u6709\u95dc\u6ce8\u4efb\u4f55\u5c08\u984c\uff0c\u95dc\u6ce8\u4e00\u4e9b\u611f\u8208\u8da3\u7684\u5c08\u984c\uff0c\u958b\u59cb\u95b1\u8b80\u512a\u79c0\u7684\u6587\u7ae0\u5427\u3002"
    },
    kalamu: {
        link_format_error: "\u50c5\u652f\u6301http, https, ftp\u93c8\u63a5\u3002",
        insert_image: "\u63d2\u5165\u5716\u7247",
        insert_video: "\u63d2\u5165\u8996\u983b",
        local_image: "\u672c\u5730\u4e0a\u8f09",
        or: "\u6216",
        internet_image: "\u7db2\u7d61\u5716\u7247",
        select_image: "\u9078\u64c7\u5716\u7247",
        cancel: "\u53d6\u6d88",
        image_url: "\u5716\u7247\u93c8\u63a5",
        ok: "\u78ba\u8a8d",
        processing: "\u4e0a\u8f09\u4e2d...",
        failed: "\u4e0a\u8f09\u5931\u6557\uff0c\u8acb\u91cd\u8a66\u3002",
        image_url_blank: "\u8acb\u8f38\u5165\u93c8\u63a5",
        insert_link: "\u63d2\u5165\u93c8\u63a5",
        link_url: "\u93c8\u63a5\u5730\u5740",
        link_text: "\u93c8\u63a5\u6587\u672c",
        video_url: "\u8acb\u8f38\u5165\u8996\u983b\u93c8\u63a5",
        loading_video: "\u6b63\u5728\u52a0\u8f09\u8996\u983b\uff0c\u8acb\u7a0d\u7b49\u2026\u2026",
        video_source_support_start: "\u76ee\u524d\u53ea\u652f\u6301",
        video_source_support_yk: "\u512a\u9177",
        video_source_support_td: "\u571f\u8c46",
        video_source_support_and: "\u8207",
        video_source_support_tx: "\u9a30\u8a0a\u8996\u983b",
        video_source_support_acfun: "ACFun\u8996\u983b",
        video_source_support_bilibili: "BiliBili\u8996\u983b",
        wrong_video_source: "\u8996\u983b\u4f86\u6e90\u4e0d\u652f\u6301\uff01\u8acb\u8f38\u5165\u652f\u6301\u7684\u8996\u983b\u5730\u5740\uff01",
        fetch_video_info_failed: "\u62b1\u6b49\uff0c\u60a8\u8f38\u5165\u7684\u5730\u5740\u7121\u6cd5\u8b58\u5225\uff01",
        close_video: "\u6536\u8d77\u8996\u983b",
        too_more_video: "\u55ae\u7bc7\u6587\u7ae0\u6700\u591a\u53ea\u80fd\u653e{{limit}}\u500b\u8996\u983b\u55b2\uff01",
        wrong_image_file_format: "\u5716\u7247\u683c\u5f0f\u932f\u8aa4,\u8acb\u4f7f\u7528jpg/jpeg/png/gif\u6587\u4ef6\u3002",
        size_excceed_limit: "\u6587\u4ef6\u5927\u5c0f\u8d85\u904e\u9650\u5236, \u8acb\u9078\u64c75MB\u4ee5\u4e0b\u7684\u6587\u4ef6\u3002",
        image_url_blank: "\u8acb\u586b\u5beb\u5716\u7247\u5730\u5740\u3002",
        image_protocol_not_supported: "\u6211\u5011\u76ee\u524d\u4e0d\u652f\u6301\u8a72\u5354\u8b70\u3002",
        select_image: "\u9078\u64c7\u5716\u7247\u4e0a\u8f09",
        image_privacy: "\u6709\u95dc\u5716\u7247\u79c1\u5bc6\u6027\u9ede\u64ca\u554f\u865f\u77ad\u89e3\u66f4\u591a",
        upload_internal_server_error: "\u4e0a\u8f09\u5931\u6557, \u8acb\u91cd\u8a66\u3002",
        "image-uploading": "\u6b63\u5728\u4e0a\u50b3...",
        "retry-upload-image": "\u91cd\u65b0\u4e0a\u50b3",
        "cannot-save-with-empty-title": "\u6587\u7ae0\u6a19\u984c\u4e0d\u5f97\u70ba\u7a7a\uff01",
        "cannot-save-while-uploading": "\u5716\u7247\u6b63\u5728\u4e0a\u50b3\uff0c\u66ab\u4e0d\u80fd\u767c\u5e03\u6587\u7ae0\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66\uff01",
        "stop-save-with-extra-image": "\u6587\u7ae0\u88cf\u542b\u6709\u5916\u7db2\u5716\u7247\uff0c\u53ef\u80fd\u6703\u7531\u65bc\u5404\u7a2e\u539f\u56e0\u5c0e\u81f4\u5225\u7684\u7528\u6236\u7121\u6cd5\u6b63\u5e38\u700f\u89bd\uff0c\u662f\u5426\u5c07\u9019\u4e9b\u5716\u7247\u4e0a\u50b3\u5230\u7c21\u66f8\u5716\u5e8a\uff1f",
        "upload-all-extra-images": "\u73fe\u5728\u4e0a\u50b3",
        "continue-saving": "\u7e7c\u7e8c\u767c\u5e03",
        auto_upload_external_images: '\u6b63\u5728\u4e0a\u50b3\u5716\u7247\uff08<span class="auto_uploading_done">0</span> / <span class="auto_uploading_total">0</span>\uff09',
        auto_upload_external_images_finished: "\u6b63\u5728\u767c\u5e03\u6587\u7ae0",
        cancel_auto_uploading: "\u53d6\u6d88\u4e0a\u50b3",
        auto_uploading: "\u6b63\u5728\u4e0a\u8f09",
        auto_public_done: "\u767c\u5e03\u6210\u529f",
        auto_public_fail: "\u767c\u5e03\u5931\u6557"
    },
    ie_warning: {
        title: "\u60a8\u7684\u700f\u89bd\u5668\u7248\u672c\u904e\u4f4e",
        upgrade_ie: '\u8acb\u5347\u7d1a\u60a8\u7684 IE \u700f\u89bd\u5668\uff0c <a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-9/worldwide-languages">\u9ede\u6b64\u8655\u5347\u7d1a</a>\u3002',
        use_chrome: '\u6211\u5011\u63a8\u85a6\u4f7f\u7528 <a href="http://www.google.com/chrome" class="use-chrome">Google Chrome </a>\u4f86\u8a2a\u554f\u7c21\u66f8\u7372\u53d6\u6700\u4f73\u7684\u7528\u6236\u9ad4\u9a57\u3002',
        skip: "\u8df3\u904e"
    },
    recycle: {
        list: {title: "\u56de\u6536\u7ad9 ({{count}})"},
        entry: {
            days_left_before_destroy: "{{days}} \u5929\u540e\u6e05\u9664",
            destroy_date: "\u5c07\u65bc {{date}} \u5f8c\u6e05\u9664"
        },
        content: {
            put_back: "\u6062\u5fa9\u6587\u7ae0",
            delete_forever: "\u5fb9\u5e95\u522a\u9664",
            delete_forever_confirm: "\u78ba\u8a8d\u5fb9\u5e95\u522a\u9664\u6587\u7ae0\u300a{{title}}\u300b\uff0c\u8a72\u64cd\u4f5c\u7121\u6cd5\u9006\u8f49\u3002"
        }
    },
    reading: {
        sign_in: {
            go_to_domestic: "\u624b\u6a5f/\u90f5\u7bb1\u767b\u9304",
            go_to_foreign: "\u6d77\u5916\u624b\u6a5f\u767b\u9304"
        },
        modals: {
            sms_bind_modal: {
                title: "\u7d81\u5b9a\u624b\u6a5f",
                send_sms_code: "\u767c\u9001\u9a57\u8b49\u78bc",
                ok: "\u5b8c\u6210\u9a57\u8b49",
                mobile_number_empty: "\u8acb\u8f38\u5165\u624b\u6a5f\u865f\u78bc",
                code_empty: "\u8acb\u8f38\u5165\u60a8\u6536\u5230\u7684\u516d\u4f4d\u77ed\u4fe1\u9a57\u8b49\u78bc",
                pls_enter_mobile_number: "\u8acb\u8f38\u5165\u624b\u6a5f\u865f\u78bc",
                pls_enter_code: "\u8acb\u8f38\u5165\u6536\u5230\u7684\u77ed\u4fe1\u9a57\u8b49\u78bc"
            }
        },
        search: {
            retry: "\u91cd\u8a66",
            feedback: "\u5411\u7c21\u66f8\u53cd\u994b",
            not_found: "\u672a\u627e\u5230\u76f8\u95dc\u5167\u5bb9",
            not_found_collection: "\u7c21\u66f8\u4e0a\u9084\u6c92\u6709\u76f8\u95dc\u5c08\u984c\uff0c\u5617\u8a66\u641c\u7d22\u5176\u4ed6\u95dc\u9375\u8a5e\u6216\u81ea\u5df1\u5275\u5efa\u4e00\u500b",
            new_collection: "\u65b0\u5efa\u5c08\u984c",
            errors: {"default": "\u975e\u5e38\u62b1\u6b49\uff0c\u670d\u52d9\u5668\u51fa\u73fe\u4e86\u4e00\u4e2a\u554f\u984c\uff0c\u5de5\u7a0b\u5e2b\u5011\u6b63\u5728\u89e3\u6c7a\u4e2d..."},
            notes: {
                footer: {
                    views: "\xb7 \u95b1\u8b80 {{count}}",
                    likes: "\xb7 \u559c\u6b61 {{count}}",
                    rewards: "\xb7 \u6253\u8cde {{count}}",
                    comments: "\xb7 \u8a55\u8ad6 {{count}}"
                }
            },
            users: {footer: "\u5beb\u4e86 {{total_wordage}} \u500b\u5b57, {{public_notes_count}} \u7bc7\u6587\u7ae0, \u5f97\u5230\u4e86 {{total_likes_count}} \u500b\u8d0a, \u88ab {{followers_count}} \u4eba\u95dc\u6ce8"},
            collections: {
                footer: {
                    editing: "\u30fb\u7de8,",
                    meta: "{{public_notes_count}} \u7bc7\u6587\u7ae0, {{likes_count}} \u4eba\u95dc\u6ce8"
                }
            },
            notebooks: {footer: "{{public_notes_count}} \u7bc7\u6587\u7ae0, {{subscribers_count}} \u4eba\u95dc\u6ce8"},
            pagination: {prev: "\u4e0a\u4e00\u9801", next: "\u4e0b\u4e00\u9801"}
        },
        captcha: {
            geetest_validate_empty: "\u8acb\u5b8c\u6210\u6ed1\u584a\u9a57\u8b49",
            captcha_validate_empty: "\u8acb\u586b\u5beb\u9a57\u8b49\u78bc",
            image_captcha_code_empty: "\u8acb\u586b\u5beb\u9a57\u8b49\u78bc",
            placeholder: "\u9a57\u8b49\u78bc",
            refresh_button: "\u770b\u4e0d\u6e05\u695a\uff1f\u63db\u4e00\u5f35",
            invalid_message: "\u9a57\u8b49\u78bc{{message}}"
        },
        withdrawal: {
            amount_tip_original: "* \u6bcf\u6b21\u63d0\u73fe\u6536\u53d6 {{rate}}% \u624b\u7e8c\u8cbb",
            amount_tip: "* \u6bcf\u6b21\u63d0\u73fe\u6536\u53d6 {{rate}}% \u624b\u7e8c\u8cbb, \u60a8\u5c07\u6536\u5230: {{amount}} \u5143\u3002"
        },
        abuse_report: {
            confirm: "\u662f\u5426\u8209\u5831\uff1f",
            report_success: "\u8209\u5831\u6210\u529f",
            no_reason: "\u8acb\u586b\u5beb\u8209\u5831\u539f\u56e0",
            report: "\u8209\u5831",
            ad: "\u5ee3\u544a\u53ca\u5783\u573e\u4fe1\u606f",
            other: "\u5176\u4ed6"
        },
        notes: {
            show: {
                like_item_tooltip: "{{nickname}} {{timeago}}\u559c\u6b61\u4e86\u9019\u7bc7\u6587\u7ae0",
                contribute_status: {
                    approved: "\uff08\u5df2\u6536\u5165\uff09",
                    pending: "\uff08\u7b49\u5f85\u4e2d\uff09"
                },
                reward: {
                    total_count: "{{total_count}} \u4eba\u6253\u8cde\u4e86\u9019\u7bc7\u6587\u7ae0",
                    tooltip: "{{nickname}} \xb7 {{timeago}}"
                }
            }, list: {follow: "\u95dc\u6ce8\u4f5c\u8005{{nickname}}", unfollow: "\u53d6\u6d88\u95dc\u6ce8"}
        },
        chats: {search_friends: {no_result: "\u672a\u627e\u5230\u76f8\u95dc\u7528\u6236"}},
        wordage: "\u5b57\u6578{{wordage}}",
        views_count: "\u95b1\u8b80{{count}}",
        likes_count: "\u559c\u6b61{{count}}",
        comments_count: "\u8a55\u8ad6{{count}}",
        self_destroy_done: "\u7528\u6236\u5df2\u6210\u529f\u522a\u9664\uff0c\u73fe\u5728\u6b63\u5728\u8df3\u8f49\u56de\u9996\u9801...",
        registration_complete: "\u8a3b\u518a\u6210\u529f\uff0c\u6b63\u5728\u8df3\u8f49...",
        errors: {email_invalid: "\u96fb\u5b50\u4fe1\u7bb1\u683c\u5f0f\u6709\u8aa4"},
        btn_group: {
            add_to_collection: "\u52a0\u5165\u5c08\u984c",
            bookmark: "\u6536\u85cf\u6587\u7ae0",
            share: "\u5206\u4eab\u6587\u7ae0"
        },
        bookmark: "\u6536\u85cf\u6587\u7ae0",
        bookmarked: "\u6536\u85cf\u6210\u529f",
        unbookmarked: "\u53d6\u6d88\u6536\u85cf\u6210\u529f",
        download_changweibo_image: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247",
        following: " \u6b63\u5728\u95dc\u6ce8",
        unfollow: " \u53d6\u6d88\u95dc\u6ce8",
        subscribe: " \u6dfb\u52a0\u95dc\u6ce8",
        subscribing: " \u6b63\u5728\u95dc\u6ce8",
        unsubscribe: " \u53d6\u6d88\u95dc\u6ce8",
        show_description: "\u5c55\u958b\u63cf\u8ff0",
        hidden_description: "\u6536\u8d77\u63cf\u8ff0",
        bian: " \u7de8",
        remove: "\u79fb\u9664",
        comment: {
            undismiss_button: "\u64a4\u92b7",
            dismiss_info: "\u8a55\u8ad6\u5df2\u522a\u9664",
            undismiss_info: "\u8a55\u8ad6\u5df2\u6062\u5fa9",
            delete_confirm: "\u78ba\u5b9a\u8981\u522a\u9664\u8a55\u8ad6\u9ebc?",
            delete_button: "\u522a\u9664",
            dismiss_button: "\u522a\u9664",
            reply_button: "\u56de\u8986",
            like: "\u559c\u6b61",
            floor: "{{floor}} \u6a13",
            description: "\u9084\u6709 {{length}} \u689d\u8a55\u8ad6\uff0c",
            more: " \u5c55\u958b\u67e5\u770b",
            show: "\u56de\u5fa9",
            collapse: "\u6536\u8d77",
            expand: "\u5c55\u958b",
            form: {
                submit_button: "\u767c \u8868",
                submitting_comment_disable: "\u63d0\u4ea4\u4e2d...",
                content_placeholder: "\u5beb\u4e0b\u4f60\u7684\u8a55\u8ad6\u2026",
                hotkey: {mac: "\u2318+Return \u767c\u8868", other: "Ctrl+Enter \u767c\u8868"}
            },
            footer: {add_comment: " \u6dfb\u52a0\u65b0\u56de\u8986"}
        },
        reject: {
            title: "\u62d2\u7d55\u6295\u7a3f",
            description: "\u56de\u500b\u4fe1\u7d66\u6295\u7a3f\u8005\uff0c\u544a\u77e5\u60a8\u62d2\u7d55\u7684\u7406\u7531\u3002\u53ef\u4ee5\u4e0d\u586b\u3002",
            placeholder: "\u7e7c\u7e8c\u52a0\u6cb9\u4ec0\u9ebc\u7684\u2026\u2026",
            close: "\u95dc\u9589",
            submit: "\u78ba\u5b9a"
        },
        further_reading: {
            button: {
                "continue": "\u7e7c\u7e8c",
                save: "\u4fdd\u5b58",
                load: "\u78ba\u5b9a",
                cancel: "\u53d6\u6d88",
                "delete": " \u522a\u9664"
            },
            from: " \u4f86\u81ea ",
            add: "\u6dfb\u52a0",
            states: {"private": " \u79c1\u6709", "public": " \u516c\u958b", dismiss: " \u522a\u9664"},
            load_link_error: "\u51fa\u932f\u4e86\uff0c\u6211\u5011\u4e0d\u80fd\u52a0\u8f09\u9019\u689d\u93c8\u63a5\uff01",
            undo_link: "\u93c8\u63a5{{state}} \u6210\u529f\u30fb<a class='undo' data-further-reading-id='{{id}}' data-state='{{originState}}' href='javascript:void(null)'>\u64a4\u92b7</a>",
            link_text_placeholder: "\u7c98\u8cbc\u6216\u8f38\u5165\u93c8\u63a5",
            title_placeholder: "\u6a19\u984c",
            description_placeholder: "\u6dfb\u52a0\u63cf\u8ff0",
            delete_success: "\u62d3\u5c55\u95b1\u8b80\u522a\u9664\u6210\u529f"
        },
        timeline: {
            show_comments: "\u67e5\u770b\u8a55\u8ad6",
            collapse_comments: "\u6536\u8d77\u8a55\u8ad6",
            reply: "\u56de\u8986",
            "delete": "\u522a\u9664"
        },
        self_destruction_confirm: "\u8acb\u78ba\u8a8d\u60a8\u78ba\u5be6\u8981\u522a\u9664\u60a8\u7684\u5e33\u6236, \u6b64\u64cd\u4f5c\u7121\u6cd5\u6062\u5fa9!",
        delete_comment_confirm: "\u78ba\u5b9a\u8981\u522a\u9664\u8a55\u8ad6\u9ebc?",
        collections: {
            select_note: "\u8acb\u9078\u64c7\u6587\u7ae0\uff1a",
            select_note_error: "\u8acb\u9078\u64c7\u4e00\u7bc7\u6587\u7ae0\u3002",
            show: {
                subscriber_tooltip: "{{nickname}} {{timeago}}\u95dc\u6ce8\u4e86\u9019\u500b\u5c08\u984c",
                subscribers_count_tooltip: "\u67e5\u770b\u6240\u6709\u95dc\u6ce8\u7528\u6236",
                can_not_contribute: "\u8a72\u5c08\u984c\u66ab\u4e0d\u63a5\u53d7\u6295\u7a3f",
                invited: "\u5df2\u9080\u8acb",
                invite_success: "\u9080\u8acb\u6210\u529f",
                include_info_tooltip: "{{timeago}}\u6536\u5165",
                include_info_tooltip_from_editor: "\u7531 {{nickname}} {{timeago}}\u6536\u5165"
            }
        },
        social_sharing: {
            trailing_jianshushe: "- \u7c21\u66f8\u793e",
            share_to_label: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                tweibo: "\u5206\u4eab\u5230\u9a30\u8a0a\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u9593",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+",
                renren: "\u5206\u4eab\u5230\u4eba\u4eba\u7db2",
                weixin: "\u5206\u4eab\u5230\u5fae\u4fe1",
                changweibo: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247"
            },
            self_share_note_text: "\u6211\u5beb\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
            reader_share_note_text: "\u63a8\u85a6 {{user} \u7684\u6587\u7ae0\u300a{{note_title}}\u300b",
            self_share_notebook_text: "\u6211\u767c\u4f48\u4e86\u6587\u96c6\u300a{{notebook_title}}\u300b",
            reader_share_notebook_text: "\u63a8\u85a6 {{user} \u7684\u6587\u96c6\u300a{{notebook_title}}\u300b",
            share_collection_text: "\u63a8\u85a6\u5c08\u984c\u300a{{collection_title}}\u300b",
            official_account: "\uff08 \u5206\u4eab\u81ea {{account}} \uff09"
        },
        rewards: {
            amount_less_than_zero: "\u6253\u8cde\u91d1\u984d\u4e0d\u80fd\u5c0f\u65bc1\u5143",
            amount_greater_than_maximum: "\u6253\u8cde\u91d1\u984d\u4e0d\u80fd\u5927\u65bc1\u842c\u5143",
            amount_greater_than_limit: "\u6253\u8cde\u91d1\u984d\u4e0d\u80fd\u5927\u65bc200\u5143",
            amount_greater_than_balance: "\u7c21\u66f8\u9918\u984d\u4e0d\u8db3\uff0c\u8acb\u5145\u503c\u6216\u8005\u4f7f\u7528\u5176\u5b83\u652f\u4ed8\u65b9\u5f0f",
            pay_now: "\u7acb\u5373\u652f\u4ed8"
        },
        copyright: {
            link: "\u539f\u6587\u93c8\u63a5\uff1a",
            author_type: "\u7c21\u66f8\u4f5c\u8005",
            singed_author_type: "\u7c21\u66f8\u7c64\u7d04\u4f5c\u8005",
            message: "\u8457\u4f5c\u6b0a\u6b78\u4f5c\u8005\u6240\u6709\uff0c\u8f49\u8f09\u8acb\u806f\u7e6b\u4f5c\u8005\u7372\u5f97\u6388\u6b0a\uff0c\u4e26\u6a19\u8a3b\u201c\u7c21\u66f8\u4f5c\u8005\u201d\u3002",
            signed_message: "\u8457\u4f5c\u6b0a\u6b78\u4f5c\u8005\u6240\u6709\uff0c\u8f49\u8f09\u8acb\u806f\u7e6b\u4f5c\u8005\u7372\u5f97\u6388\u6b0a\uff0c\u4e26\u6a19\u8a3b\u201c\u7c21\u66f8\u7c64\u7d04\u4f5c\u8005\u201d\u3002"
        }
    },
    note_logs: {
        list_title: "\u5171 {{count}} \u689d\u6b77\u53f2\u8a18\u9304",
        apply_this_log: "\u6062\u5fa9\u5230\u9019\u500b\u7248\u672c",
        filter: "\u7be9\u9078",
        types: {
            autosave: "\u81ea\u52d5\u4fdd\u5b58",
            publish: "\u516c\u958b\u767c\u4f48\u6587\u7ae0",
            post_updates: "\u767c\u4f48\u66f4\u65b0",
            before_restore: "\u7248\u672c\u6062\u5fa9"
        }
    },
    browser_tip: {
        title: "\u5225\u518d\u62d6\u5ef6\uff0c\u662f\u6642\u5019\u66f4\u65b0\u60a8\u7684\u700f\u89bd\u5668\u5566",
        intro: "\u7232\u4e86\u7d66\u60a8\u5e36\u4f86\u66f4\u512a\u8cea\u7684\u5728\u7dda\u5beb\u4f5c\u9ad4\u9a57\uff0c\u7c21\u66f8\u5efa\u8b70\u60a8\u4f7f\u7528\u6700\u65b0\u7248\u672c\u7684 Chrome \u700f\u89bd\u5668\u6216\u5176\u4ed6\u63a8\u85a6\u700f\u89bd\u5668\u9032\u884c\u5beb\u4f5c\u3002",
        download: "\u5b98\u65b9\u7db2\u7ad9"
    },
    new_notebook: "\u65b0\u5efa\u6587\u96c6",
    new_notebook_name: "\u65b0\u6587\u96c6\u540d",
    new_note: "\u65b0\u5efa\u6587\u7ae0",
    default_note_title: "\u7121\u6a19\u984c\u6587\u7ae0",
    delete_notebook_confirm: "\u78ba\u8a8d\u522a\u9664\u6587\u96c6\u300a{{title}}\u300b\uff0c\u6587\u96c6\u5167\u6587\u7ae0\u5c07\u6703\u88ab\u79fb\u52d5\u5230\u56de\u6536\u7ad9\u3002",
    delete_note_confirm: "\u78ba\u8a8d\u522a\u9664\u6587\u7ae0\u300a{{title}}\u300b\uff0c\u6587\u7ae0\u5c07\u88ab\u79fb\u52d5\u5230\u56de\u6536\u7ad9\uff0c\u60a8\u53ef\u4ee5\u5728\u90a3\u88cf\u6062\u5fa9\u5b83\u300260\u5929\u540e\u5c07\u88ab\u5fb9\u5e95\u522a\u9664\u3002",
    rename_notebook: "\u4fee\u6539\u6587\u96c6\u540d",
    delete_notebook: "\u522a\u9664\u6587\u96c6",
    saving: "\u4fdd\u5b58\u4e2d...",
    saved: "\u5df2\u4fdd\u5b58",
    compiled: "\u66f4\u65b0\u5df2\u6210\u529f\u767c\u4f48",
    saved_partially: "\u6587\u7ae0\u904e\u9577, \u5c3e\u7aef\u90e8\u5206\u5167\u5bb9\u672a\u4fdd\u5b58",
    change_notebook_placeholder: "\u8acb\u9078\u64c7\u76ee\u6a19\u6587\u96c6..",
    wordage: "\u5b57\u6578: {{wordage}}",
    commerical_placeholder: "\u5c6c\u65bc\u5beb\u4f5c\u8005\u7684\u6587\u96c6, \u4e00\u500b\u7c21\u6f54\u800c\u512a\u96c5\u7684\u74b0\u5883\u8b93\u4f60\u5c08\u6ce8\u65bc\u66f8\u5beb\u3002",
    notebook_name_placeholder: "\u8acb\u8f38\u5165\u6587\u96c6\u540d...",
    nickname_format_invalid: "\u66b1\u7a31\u683c\u5f0f\u4e0d\u6b63\u78ba",
    nickname: "\u66b1\u7a31",
    spine_ajax_pending: "\u5b58\u5132\u8acb\u6c42\u5c1a\u672a\u5168\u90e8\u5b8c\u6210, \u672a\u4fdd\u5b58\u6578\u64da\u5c07\u6703\u4e1f\u5931, \u78ba\u5b9a\u8981\u96e2\u958b\u9801\u9762\u9ebc?",
    form_dirty: "\u6aa2\u6e2c\u5230\u6709\u672a\u4fdd\u5b58\u7684\u6578\u64da, \u78ba\u5b9a\u8981\u96e2\u958b\u9801\u9762\u9ebc?",
    toggle_to_markdown: "\u5207\u63db\u7de8\u8f2f\u5668\u7232\u300cMarkdown\u7de8\u8f2f\u5668\u300d",
    toggle_to_plain: "\u5207\u63db\u7de8\u8f2f\u5668\u7232\u300c\u5bcc\u6587\u5b57\u683c\u5f0f\u7de8\u8f2f\u5668\u300d",
    suggest_chrome: "\u6aa2\u6e2c\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer, \u6211\u5011\u5efa\u8b70\u4f7f\u7528 Google Chrome \u8a2a\u554f\u300e\u7c21\u66f8\u300f\u4ee5\u7372\u5f97\u6700\u4f73\u9ad4\u9a57\u3002",
    suggest_upgrade: "\u6aa2\u6e2c\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer 8/9, \u5728\u6b64\u60c5\u6cc1\u4e0b, \u6703\u51fa\u73fe\u6027\u80fd\u554f\u984c, \u4e26\u4e14\u6211\u5011\u7121\u6cd5\u63d0\u4f9b\u5b8c\u6574\u7684\u529f\u80fd, \u5efa\u8b70\u4f7f\u7528 Google Chrome \u8a2a\u554f\u300e\u7c21\u66f8\u300f\u4ee5\u7372\u5f97\u6700\u4f73\u9ad4\u9a57, \u6216\u662f\u5347\u7d1a\u81f3 Internet Explorer 10\u3002",
    chrome_bug: "\u6211\u5011\u767c\u73fe\u60a8\u7576\u524d\u7684\u700f\u89bd\u5668\u7248\u672c\uff0833.0.1750.152\uff09\u5b58\u5728\u5df2\u77e5\u7684bug\uff0c\u5728\u7576\u524d\u7684 Chrome \u7248\u672c\u4e0b\u60a8\u5c07\u7121\u6cd5\u5728\u5bcc\u6587\u672c\u7de8\u8f2f\u5668\u4e2d\u4e0a\u8f09\u5716\u7247/\u7de8\u8f2f\u93c8\u63a5\uff0c\u8acb\u5347\u7d1a\u81f3\u6700\u65b0\u7684Chrome\u7248\u672c\u3002",
    restore_a_locale_copy: "\u6211\u5011\u5f9e\u672c\u5730\u5b58\u5132\u4e2d\u6062\u5fa9\u4e86\u60a8\u7684\u9019\u7bc7\u6587\u7ae0, \u5982\u679c\u4ed6\u4e0d\u662f\u6700\u65b0\u7248\u60a8\u53ef\u4ee5: ",
    leaving_note_unsaved: "\u60a8\u7684\u6587\u7ae0\u5df2\u7d93\u4fee\u6539, \u4e26\u4e14\u5c1a\u672a\u4fdd\u5b58, \u662f\u5426\u4fdd\u5b58?",
    press_esc_to_leave: "\u6309 Esc\u9375 \u9000\u51fa.",
    new_note_bottom: "\u5728\u4e0b\u65b9\u65b0\u5efa\u6587\u7ae0",
    ajax_error: "\u51fa\u73fe\u932f\u8aa4, \u8acb\u5099\u4efd\u60a8\u7576\u524d\u7684\u4f5c\u54c1\u4e26\u5237\u65b0\u9801\u9762.",
    publish: "\u767c\u4f48\u6587\u7ae0",
    published: "\u5df2\u767c\u4f48",
    unpublish: "\u53d6\u6d88\u767c\u4f48",
    publish_changes: "\u767c\u4f48\u66f4\u65b0",
    publishing: "\u767c\u4f48\u4e2d...",
    toolbar: {
        writing_mode: "\u5207\u63db\u5230\u5beb\u4f5c\u6a21\u5f0f",
        preview_mode: "\u5207\u63db\u5230\u9810\u89bd\u6a21\u5f0f",
        "return": "\u8fd4\u56de",
        save: "\u4fdd\u5b58",
        redo: "\u91cd\u505a",
        undo: "\u64a4\u92b7",
        bold: "\u7c97\u9ad4",
        italic: "\u659c\u9ad4",
        strikethrough: "\u522a\u9664\u7dda",
        blockquote: "\u5f15\u7528",
        heading1: "\u6a19\u984c\u4e00",
        heading2: "\u6a19\u984c\u4e8c",
        heading3: "\u6a19\u984c\u4e09",
        heading4: "\u6a19\u984c\u56db",
        headline: "\u5206\u5272\u7dda",
        insert_link: "\u63d2\u5165\u93c8\u63a5",
        insert_image: "\u63d2\u5165\u5716\u7247",
        insert_video: "\u63d2\u5165\u8996\u983b",
        history: "\u6b77\u53f2\u7248\u672c"
    },
    errors: {
        401: "\u51fa\u73fe\u5b89\u5168\u9a57\u8b49\u932f\u8aa4, \u8acb\u624b\u52d5\u4fdd\u5b58\u7576\u524d\u4f5c\u54c1, \u5237\u65b0\u9801\u9762\u91cd\u8a66.",
        404: '\u8acb\u6c42\u7684\u6587\u7ae0/\u6587\u96c6\u4e0d\u5b58\u5728, \u8acb<a href="http://www.jianshu.com/writer/#/">\u9ede\u6b64\u5237\u65b0\u9801\u9762</a>.',
        500: "\u670d\u52d9\u5668\u932f\u8aa4, \u8acb\u624b\u52d5\u4fdd\u5b58\u7576\u524d\u4f5c\u54c1, \u5237\u65b0\u9801\u9762\u91cd\u8a66.",
        content_overflow: "\u7576\u524d\u6587\u7ae0\u5167\u5bb9\u904e\u9577, \u7bc7\u5c3e\u90e8\u5206\u5167\u5bb9\u7121\u6cd5\u4fdd\u5b58, \u8acb\u5148\u624b\u52d5\u5099\u4efd\uff0c\u7136\u5f8c\u65b0\u5efa\u6587\u7ae0\u5206\u958b\u66f8\u5beb!",
        writer_version_conflict: "\u60a8\u5df2\u5728\u5176\u4ed6\u7a97\u53e3\u4e2d\u5c0d\u672c\u6587\u9032\u884c\u4e86\u66f4\u65b0\uff0c\u4ee5\u9632\u4e1f\u5931\u4efb\u4f55\u6587\u5b57\uff0c\u8acb\u624b\u52d5\u5099\u4efd\u7576\u524d\u6539\u52d5\uff0c\u5237\u65b0\u672c\u9801\u5f8c\u7e7c\u7e8c"
    },
    warnings: {content_too_large: "\u7576\u524d\u6587\u7ae0\u9577\u5ea6\u6b63\u5728\u63a5\u8fd1\u7c21\u66f8\u7684\u9650\u5ea6, \u8acb\u8003\u616e\u5206\u7bc7\u66f8\u5beb\u5427"},
    network: {
        issue: "\u7db2\u7d61\u9023\u63a5\u901f\u5ea6\u904e\u6162, \u53ef\u80fd\u6062\u5fa9, \u53ef\u4ee5\u7e7c\u7e8c\u64cd\u4f5c.",
        down: "\u7db2\u7d61\u9023\u63a5\u9023\u7e8c\u51fa\u932f, \u8acb\u52d9\u5fc5\u5099\u4efd\u60a8\u7576\u524d\u7684\u4f5c\u54c1\u4e26\u5237\u65b0\u9801\u9762!",
        back: "\u60a8\u7684\u7db2\u7d61\u9023\u63a5\u5df2\u6062\u5fa9\u3002"
    },
    navbar: {
        homepage: "\u9996\u9801",
        collections: "\u5c08\u984c",
        top: "\u7c21\u66f8\u71b1\u9580",
        timeline: "\u7c21\u53cb\u5708",
        writer: "\u5beb\u6587\u7ae0",
        user_homepage: "\u6211\u7684\u4e3b\u9801",
        favourites: "\u6211\u559c\u6b61\u7684",
        bookmarks: "\u6211\u7684\u6536\u85cf",
        notifications: "\u63d0\u9192",
        messages: "\u7c21\u4fe1",
        view_mode: "\u986f\u793a\u6a21\u5f0f",
        settings: "\u8a2d\u5b9a",
        sign_out: "\u767b\u51fa"
    },
    note_modified: {
        mac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8acb\u6309 command + s \u4fdd\u5b58\u3002",
        nonmac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8acb\u6309 ctrl + s \u4fdd\u5b58\u3002"
    },
    note: {
        untitled: "\u7121\u6a19\u984c\u6587\u7ae0",
        collection: {adding: "\u52a0\u8f09\u4e2d\u2026\u2026"},
        dropdown: {
            share_directly: "\u76f4\u63a5\u767c\u4f48",
            move_note: "\u79fb\u52d5\u6587\u7ae0",
            shared: "\u5df2\u767c\u4f48",
            share_to: "\u5206\u4eab\u5230",
            delete_note: "\u522a\u9664\u6587\u7ae0",
            revision_history: "\u6b77\u53f2\u7248\u672c",
            share_to_sns: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                tweibo: "\u5206\u4eab\u5230\u9a30\u8a0a\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u9593",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+"
            },
            open_in_new_window: "\u5728\u65b0\u7a97\u53e3\u6253\u958b",
            stop_sharing: "\u505c\u6b62\u5206\u4eab"
        },
        moving: {title: "\u79fb\u52d5\u6587\u7ae0\u5230"},
        share: {
            title: "\u76f4\u63a5\u767c\u4f48",
            help: "\u9ede\u64ca\u201c\u767c\u4f48\u201d\u6309\u9215\u5f8c\u6587\u7ae0\u5c07\u6703\u751f\u6210\u4e00\u500b\u201c\u56fa\u5b9a\u9023\u7d50\u201d\uff0c\u4ed6\u4eba\u901a\u904e\u8a72\u56fa\u5b9a\u93c8\u63a5\u5373\u53ef\u8a2a\u554f\u4f60\u7684\u6587\u7ae0\uff0c\u4f60\u4e5f\u53ef\u4ee5\u96a8\u5f8c\u5c07\u56fa\u5b9a\u9023\u7d50\u544a\u77e5\u4ed6\u4eba\u6216\u8005\u5206\u4eab\u5230\u4f60\u7684\u793e\u4ea4\u7db2\u8def\u3002",
            permanent_link: "\u56fa\u5b9a\u9023\u7d50\u5730\u5740",
            success: "\u6587\u7ae0\u767c\u4f48\u6210\u529f\uff01",
            to_sns: "\u4f60\u9084\u53ef\u4ee5\u5206\u4eab\u6587\u7ae0\u5230\u793e\u4ea4\u7db2\u8def:",
            share_note: "\u5206\u4eab\u6587\u7ae0",
            click_to_show: "\u9ede\u64ca\u6a19\u984c\u53ef\u4ee5\u8f49\u5230\u5df2\u767c\u4f48\u7684\u6587\u7ae0"
        },
        contribute: {
            hint: "\u7232\u4e86\u60a8\u7684\u6587\u7ae0\u88ab\u66f4\u591a\u4eba\u767c\u73fe\uff0c\u60a8\u53ef\u4ee5\u9078\u64c7\u6295\u7a3f\u5230\u5c0d\u61c9\u5c08\u984c",
            add_to_collection: "\u52a0\u5165\u5c08\u984c",
            contribute_to_collection: "\u6295\u7a3f",
            pending: "\u7b49\u5f85\u5be9\u8988",
            remove_from_collection: "\u5f9e\u5c08\u984c\u79fb\u9664",
            collection_info: "{{notes_count}} \u7bc7\u6587\u7ae0\uff0c{{subscribers_count}} \u4eba\u95dc\u6ce8",
            similar_collections: "\u4ee5\u4e0b\u5c08\u984c\u53ef\u80fd\u4e0e\u60a8\u7684\u6587\u7ae0\u76f8\u95dc\uff1a",
            editable_collections: "\u6211\u7de8\u8f2f\u7684\u5c08\u984c\uff1a",
            no_search_result: "\u7121\u6cd5\u627e\u5230\u76f8\u95dc\u7684\u5c08\u984c"
        },
        shareToWeibo: {
            share: "\u5206 \u4eab",
            done: "\u5e26\u9577\u5fae\u535a\u5206\u4eab",
            download: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247",
            processing: "\u7372\u53d6\u9577\u5fae\u535a\u5716\u7247\u4e2d",
            processingNotice: "\u5982\u679c\u60a8\u4e0d\u9700\u8981\u5e36\u9577\u5fae\u535a\u5206\u4eab\uff0c\u53ef\u9ede\u64ca\u4e0b\u9762\u7684\u5206\u4eab\u6309\u9215\u76f4\u63a5\u5206\u4eab\uff0c\u7121\u9700\u7b49\u5f85\u3002"
        }
    },
    share: {
        text: "\u6211\u5beb\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
        official_account: "\uff08 \u5206\u4eab\u81ea @{{official_account}} \uff09",
        trailing_jianshushe: "- \u7c21\u66f8\u793e"
    },
    button: {
        submitting: "\u6b63\u5728\u63d0\u4ea4...",
        submit_failed: "\u767c\u9001\u5931\u6557",
        submit: "\u63d0\u4ea4",
        cancel: "\u53d6\u6d88",
        close: "\u95dc\u9589",
        publish: "\u767c\u4f48",
        ok: "\u78ba\u8a8d",
        undo: "\u64a4\u92b7",
        upload_image_notice: "\u5c07\u5716\u7247\u6587\u4ef6\u76f4\u63a5\u62d6\u52d5\u5230\u7de8\u8f2f\u5340\u57df\u5373\u53ef\u4e0a\u8f09",
        upload_image_paste_notice: "\u6216\u8005\u4e5f\u53ef\u4ee5\u5c07\u526a\u8cbc\u677f\u88cf\u7684\u5716\u7247\u76f4\u63a5\u7c98\u8cbc\u9032\u7de8\u8f2f\u5340\u57df"
    },
    "jquery-timeago": {
        prefixAgo: null,
        prefixFromNow: "\u5f9e\u73fe\u5728\u958b\u59cb",
        suffixAgo: "\u4e4b\u524d",
        suffixFromNow: null,
        seconds: "\u4e0d\u52301\u5206\u9418",
        minute: "\u5927\u7d041\u5206\u9418",
        minutes: "%d\u5206\u9418",
        hour: "\u5927\u7d041\u5c0f\u6642",
        hours: "%d\u5c0f\u6642",
        day: "\u5927\u7d041\u5929",
        days: "%d\u5929",
        month: "\u5927\u7d041\u500b\u6708",
        months: "%d\u500b\u6708",
        year: "\u5927\u7d041\u5e74",
        years: "%d\u5e74",
        numbers: [],
        wordSeparator: ""
    },
    date: {
        abbr_day_names: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        abbr_month_names: [null, "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        day_names: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
        formats: {"default": "%Y-%m-%d", "long": "%Y\u5e74%b%d\u65e5", "short": "%b%d\u65e5"},
        month_names: [null, "\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        order: ["year", "month", "day"]
    },
    datetime: {
        distance_in_words: {
            about_x_hours: {
                one: "\u5927\u7ea6\u4e00\u5c0f\u65f6",
                other: "\u5927\u7ea6 %{count} \u5c0f\u65f6"
            },
            about_x_months: {one: "\u5927\u7ea6\u4e00\u4e2a\u6708", other: "\u5927\u7ea6 %{count} \u4e2a\u6708"},
            about_x_years: {one: "\u5927\u7ea6\u4e00\u5e74", other: "\u5927\u7ea6 %{count} \u5e74"},
            almost_x_years: {one: "\u63a5\u8fd1\u4e00\u5e74", other: "\u63a5\u8fd1 %{count} \u5e74"},
            half_a_minute: "\u534a\u5206\u949f",
            less_than_x_minutes: {one: "\u4e0d\u5230\u4e00\u5206\u949f", other: "\u4e0d\u5230 %{count} \u5206\u949f"},
            less_than_x_seconds: {one: "\u4e0d\u5230\u4e00\u79d2", other: "\u4e0d\u5230 %{count} \u79d2"},
            over_x_years: {one: "\u4e00\u5e74\u591a", other: "%{count} \u5e74\u591a"},
            x_days: {one: "\u4e00\u5929", other: "%{count} \u5929"},
            x_minutes: {one: "\u4e00\u5206\u949f", other: "%{count} \u5206\u949f"},
            x_months: {one: "\u4e00\u4e2a\u6708", other: "%{count} \u4e2a\u6708"},
            x_seconds: {one: "\u4e00\u79d2", other: "%{count} \u79d2"}
        }, prompts: {day: "\u65e5", hour: "\u65f6", minute: "\u5206", month: "\u6708", second: "\u79d2", year: "\u5e74"}
    }
}, !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled", n = this.$element, o = n.data(), i = n.is("input") ? "val" : "html";
        e += "Text", o.resetText || n.data("resetText", n[i]()), n[i](o[e] || this.options[e]), setTimeout(function () {
            "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function (n) {
        return this.each(function () {
            var o = e(this), i = o.data("button"), r = "object" == typeof n && n;
            i || o.data("button", i = new t(this, r)), "toggle" == n ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e.fn.button.noConflict = function () {
        return e.fn.button = n, this
    }, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), !function (e) {
    "use strict";
    function t() {
        e(".dropdown-backdrop").remove(), e(o).each(function () {
            n(e(this)).removeClass("open")
        })
    }

    function n(t) {
        var n, o = t.attr("data-target");
        return o || (o = t.attr("href"), o = o && /#/.test(o) && o.replace(/.*(?=#[^\s]*$)/, "")), n = o && e(o), n && n.length || (n = t.parent()), n
    }

    var o = "[data-toggle=dropdown]", i = function (t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function () {
            n.parent().removeClass("open")
        })
    };
    i.prototype = {
        constructor: i, toggle: function () {
            var o, i, r = e(this);
            if (!r.is(".disabled, :disabled"))return o = n(r), i = o.hasClass("open"), t(), i || ("ontouchstart" in document.documentElement && e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", t), o.toggleClass("open")), r.focus(), !1
        }, keydown: function (t) {
            var i, r, s, a, l;
            if (/(38|40|27)/.test(t.keyCode) && (i = e(this), t.preventDefault(), t.stopPropagation(), !i.is(".disabled, :disabled"))) {
                if (s = n(i), a = s.hasClass("open"), !a || a && 27 == t.keyCode)return 27 == t.which && s.find(o).focus(), i.click();
                r = e("[role=menu] li:not(.divider):visible a", s), r.length && (l = r.index(r.filter(":focus")), 38 == t.keyCode && l > 0 && l--, 40 == t.keyCode && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).focus())
            }
        }
    };
    var r = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this), o = n.data("dropdown");
            o || n.data("dropdown", o = new i(this)), "string" == typeof t && o[t].call(n)
        })
    }, e.fn.dropdown.Constructor = i, e.fn.dropdown.noConflict = function () {
        return e.fn.dropdown = r, this
    }, e(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", o, i.prototype.toggle).on("keydown.dropdown.data-api", o + ", [role=menu]", i.prototype.keydown)
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t, init: function (t, n, o) {
            var i, r, s, a, l;
            for (this.type = t, this.$element = e(n), this.options = this.getOptions(o), this.enabled = !0, s = this.options.trigger.split(" "), l = s.length; l--;)a = s[l], "click" == a ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != a && (i = "hover" == a ? "mouseenter" : "focus", r = "hover" == a ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        }, enter: function (t) {
            var n, o = e.fn[this.type].defaults, i = {};
            return this._options && e.each(this._options, function (e, t) {
                o[e] != t && (i[e] = t)
            }, this), n = e(t.currentTarget)[this.type](i).data(this.type), n.options.delay && n.options.delay.show ? (clearTimeout(this.timeout), n.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show))) : n.show()
        }, leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide))) : n.hide()
        }, show: function () {
            var t, n, o, i, r, s, a = e.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented())return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), r = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), o = t[0].offsetWidth, i = t[0].offsetHeight, r) {
                    case"bottom":
                        s = {top: n.top + n.height, left: n.left + n.width / 2 - o / 2};
                        break;
                    case"top":
                        s = {top: n.top - i, left: n.left + n.width / 2 - o / 2};
                        break;
                    case"left":
                        s = {top: n.top + n.height / 2 - i / 2, left: n.left - o};
                        break;
                    case"right":
                        s = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
                }
                this.applyPlacement(s, r), this.$element.trigger("shown")
            }
        }, applyPlacement: function (e, t) {
            var n, o, i, r, s = this.tip(), a = s[0].offsetWidth, l = s[0].offsetHeight;
            s.offset(e).addClass(t).addClass("in"), n = s[0].offsetWidth, o = s[0].offsetHeight, "top" == t && o != l && (e.top = e.top + l - o, r = !0), "bottom" == t || "top" == t ? (i = 0, e.left < 0 && (i = -2 * e.left, e.left = 0, s.offset(e), n = s[0].offsetWidth, o = s[0].offsetHeight), this.replaceArrow(i - a + n, n, "left")) : this.replaceArrow(o - l, o, "top"), r && s.offset(e)
        }, replaceArrow: function (e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function t() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.detach()
                })
            }

            var n = this.tip(), o = e.Event("hide");
            return this.$element.trigger(o), o.isDefaultPrevented() ? void 0 : (n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : n.detach(), this.$element.trigger("hidden"), this)
        }, fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var t = this.$element[0];
            return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        }, tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function (n) {
        return this.each(function () {
            var o = e(this), i = o.data("tooltip"), r = "object" == typeof n && n;
            i || o.data("tooltip", i = new t(this, r)), "string" == typeof n && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = n, this
    }
}(window.jQuery), function () {
    window.Maleskine = {}
}.call(this), function () {
    Maleskine.CommonImages = {
        host: "http://baijii-common.b0.upaiyun.com", social_icon: function (e, t, n) {
            return Maleskine.CommonImages.host + "/social_icons/" + t + "x" + n + "/" + e + ".png"
        }, loader: function (e) {
            return Maleskine.CommonImages.host + "/loaders/" + e + ".gif"
        }
    }
}.call(this), function () {
    Maleskine.Settings = {
        emoji_host: "http://assets.jianshu.io",
        asset_host: "",
        qiniu_host: "http://upload.jianshu.io",
        faye_url: "http://faye.jianshu.io:28888/pubsub",
        weibo: {appKey: "1881139527"},
        douban: {appKey: "07b4f47aa74e2448171edd6ff5ea6cd8"},
        uploadImageSizeLimit: "10000000",
        official_weibo: {weibo: "\u7b80\u4e66", tweibo: "jianshuio", twitter: "jianshucom"},
        mention_official_account: function (e) {
            var t;
            return (t = Maleskine.Settings.official_weibo[e]) ? I18n.t("share.official_account", {official_account: t}) : ""
        }
    }
}.call(this), function () {
    Maleskine.BrowserDetector = {
        isMac: function () {
            return $("body").hasClass("mac")
        }, isWin: function () {
            return $("body").hasClass("mac")
        }, isIE8: function () {
            return $("html").hasClass("ie8") || $("body").hasClass("ie8")
        }, isIE9: function () {
            return $("html").hasClass("ie9") || $("body").hasClass("ie9")
        }, isNotIE8NorIE9: function () {
            return !Maleskine.BrowserDetector.isIE8() && !Maleskine.BrowserDetector.isIE9()
        }, isIE10: function () {
            return $("body").hasClass("ie10")
        }, isMozilla: function () {
            return $("body").hasClass("mozilla")
        }, isIE11: function () {
            return $("body").hasClass("ie11")
        }, isIE: function () {
            return $("body").hasClass("ie")
        }, lessThanIE8: function () {
            return $("html").hasClass("lt-ie8")
        }, isMobile: function () {
            return null != Modernizr.touch && Modernizr.touch
        }, canPasteImage: function () {
            return window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0 || window.navigator.userAgent.toLowerCase().indexOf("chromium")
        }, canUseSelection: function () {
            var e;
            return Maleskine.BrowserDetector.__privates = Maleskine.BrowserDetector.__privates || {}, Maleskine.BrowserDetector.__privates.can_use_selection !== !0 && Maleskine.BrowserDetector.__privates.can_use_selection !== !1 && (e = $("textarea"), Maleskine.BrowserDetector.__privates.can_use_selection = !isNaN(e[0].selectionStart)), Maleskine.BrowserDetector.__privates.can_use_selection
        }, canInsertHTML: function () {
            return Maleskine.BrowserDetector.__privates = Maleskine.BrowserDetector.__privates || {}, Maleskine.BrowserDetector.__privates.can_insert_html !== !0 && Maleskine.BrowserDetector.__privates.can_insert_html !== !1 && (Maleskine.BrowserDetector.__privates.can_insert_html = !$("body").hasClass("mozilla") && document.queryCommandSupported("insertHTML")), Maleskine.BrowserDetector.__privates.can_insert_html
        }, canScrollManually: function () {
            return Maleskine.BrowserDetector.__privates = Maleskine.BrowserDetector.__privates || {}, Maleskine.BrowserDetector.__privates.can_scroll_manually !== !0 && Maleskine.BrowserDetector.__privates.can_scroll_manually !== !1 && (Maleskine.BrowserDetector.__privates.can_scroll_manually = !isNaN(window.scrollY) && !!window.scrollTo), Maleskine.BrowserDetector.__privates.can_scroll_manually
        }
    }
}.call(this), function () {
    !function (e) {
        return e.fn.padding = function (e) {
            return parseInt(this.css("padding-" + e), 10)
        }, e.fn.cssHeight = function () {
            return parseInt(this.css("height"), 10)
        }, e.fn.cssWidth = function () {
            return parseInt(this.css("width"), 10)
        }
    }(jQuery)
}.call(this), function () {
    Maleskine.Utils = {
        getVideoCoverImage: function (e, t) {
            return null == t && (t = null), null != t ? Maleskine.Settings.qiniu_host + "/videos/cover_imgs/" + e + "?imageView2/1/w/" + t + "/h/" + t : Maleskine.Settings.qiniu_host + "/videos/cover_imgs/" + e
        }, setCookie: function (e, t) {
            var n, o;
            return n = new Date, o = n.getTime(), o += 31536e9, n.setTime(o), document.cookie = e + "=" + t + "; expires=" + n.toGMTString() + "; path=/"
        }, toTitleCase: function (e) {
            return e.replace(/\w\S*/g, function (e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            })
        }, fromClassNameToClassName: function (e) {
            return null != e ? (e = e.replace(/\-/g, " "), e = Maleskine.Utils.toTitleCase(e), e.replace(/\s/g, "")) : void 0
        }, removeHtmlTags: function () {
            return function (e) {
                var t;
                return t = /<\/?(a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|data|datagrid|datalist|dd|del|details|dfn|div|dl|dt|em|embed|eventsource|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|font|keygen|label|legend|li|link|mark|map|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|ruby|rp|rt|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr).*?\/?>/gim, e.replace(t, "")
            }
        }(this), findNodeWithTags: function (e, t) {
            var n;
            for ($.isArray(t) || (t = [t]); e;) {
                if (3 !== e.nodeType && (n = t.indexOf(e.tagName), -1 !== n))return e;
                e = e.parentNode
            }
            return null
        }, secureRandom: function (e) {
            var t, n, o;
            for (null == e && (e = 5), o = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 0; e > t;)o += n.charAt(Math.floor(Math.random() * n.length)), t++;
            return o
        }, uuid: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t, n;
                return t = 16 * Math.random() | 0, n = "x" === e ? t : 3 & t | 8, n.toString(16)
            })
        }, setDay: function () {
            return function () {
                return $("body").removeClass("reader-night-mode").addClass("reader-day-mode"), Maleskine.Utils.setCookie("read_mode", "day"), $.ajax({
                    url: Routes.preferences_path(),
                    type: "PUT",
                    data: {read_mode: "day"}
                })
            }
        }(this), setNight: function () {
            return $("body").removeClass("reader-day-mode").addClass("reader-night-mode"), Maleskine.Utils.setCookie("read_mode", "night"), $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {read_mode: "night"}
            })
        }, setFont1: function () {
            return $("body").removeClass("reader-font2").addClass("reader-font1"), Maleskine.Utils.setCookie("default_font", "font1"), $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {default_font: "font1"}
            })
        }, setFont2: function () {
            return $("body").removeClass("reader-font1").addClass("reader-font2"), Maleskine.Utils.setCookie("default_font", "font2"), $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {default_font: "font2"}
            })
        }, format_number_short: function (e) {
            var t;
            return t = e - 0, t >= 1e3 ? Math.floor(t / 1e3) + "." + Math.floor(t % 1e3 / 100) + "K" : t + ""
        }, initLaddaButton: function (e) {
            var t, n, o, i, r, s;
            for (r = $(e).find("button.ladda-button[data-remote]"), s = [], t = 0, i = r.length; i > t; t++)o = r[t], n = Ladda.create(o), $(o).on("ajax:beforeSend", function () {
                return function () {
                    return n.start()
                }
            }(this)), s.push($(o).on("ajax:complete", function () {
                return function () {
                    return n.stop()
                }
            }(this)));
            return s
        }, initModule: function (e) {
            var t, n, o;
            return t = $(e), o = Maleskine.Utils.fromClassNameToClassName(t.data("js-module")), o.length > 0 ? n = "function" == typeof Maleskine[o] ? new Maleskine[o]({el: t}) : void 0 : void 0
        }, initModulesInElement: function (e) {
            var t;
            return t = $(e), t.length > 0 ? t.find("[data-js-module]").each(function (e, t) {
                return Maleskine.Utils.initModule(t)
            }) : void 0
        }, initFollowButtonEvents: function (e) {
            return e.on("ajax:success", ".follow a", function (e, t) {
                var n;
                return n = $(e.currentTarget), n.parent().removeClass("btn-success").addClass("following"), n.html("<i class='fa fa-fw fa-check'></i><span>" + I18n.t("reading.subscribing") + "</span>"), n.data("collection-id") && n.attr("href", Routes.unsubscribe_collection_path(n.data("collection-id"))), n.siblings("span").text(t.subscribers_count), n.parent().next("[data-toggle=dropdown]").removeClass("btn-success"), Maleskine.AuthorCard.clearCachedCard(n.data("user-slug"))
            }), e.on("ajax:success", ".following a", function (e, t) {
                var n;
                return n = $(e.currentTarget), n.parent().removeClass("following").addClass("btn-success"), n.html("<i class='fa fa-fw fa-plus'></i><span>" + I18n.t("reading.subscribe") + "</span>"), n.data("collection-id") && n.attr("href", Routes.subscribe_collection_path(n.data("collection-id"))), n.siblings("span").text(t.subscribers_count), n.parent().next("[data-toggle=dropdown]").addClass("btn-success"), Maleskine.AuthorCard.clearCachedCard(n.data("user-slug"))
            })
        }, doesVideoURLAvailable: function (e) {
            var t;
            return t = /^https?:\/\/(?:[\w\.]*?\.(?:youku|tudou|qq|bilibili)\.com|[\w\.\-]*?\.acgvideo\.com)\//i, !!e.match(t)
        }, generateQRcode: function (e, t, n) {
            return null == n && (n = {width: 170, height: 170}), new QRCode(e, {
                text: t,
                width: n.width,
                height: n.height,
                correctLevel: QRCode.CorrectLevel.M
            })
        }
    }
}.call(this);