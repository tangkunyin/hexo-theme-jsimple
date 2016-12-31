!function (e) {
    function t(t, n, r) {
        var a = this;
        return this.on("click.pjax", t, function (t) {
            var o = e.extend({}, h(n, r));
            o.container || (o.container = e(this).attr("data-pjax") || a), i(t, o)
        })
    }

    function i(t, i, n) {
        n = h(i, n);
        var a = t.currentTarget;
        if ("A" !== a.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== a.protocol || location.hostname !== a.hostname || a.hash && a.href.replace(a.hash, "") === location.href.replace(location.hash, "") || a.href === location.href + "#")) {
            var o = {
                url: a.href,
                container: e(a).attr("data-pjax"),
                target: a
            }, s = e.extend({}, o, n), l = e.Event("pjax:click");
            e(a).trigger(l, [s]), l.isDefaultPrevented() || (r(s), t.preventDefault(), e(a).trigger("pjax:clicked", [s]))
        }
    }

    function n(t, i, n) {
        n = h(i, n);
        var a = t.currentTarget;
        if ("FORM" !== a.tagName.toUpperCase())throw"$.pjax.submit requires a form element";
        var o = {
            type: a.method.toUpperCase(),
            url: a.action,
            data: e(a).serializeArray(),
            container: e(a).attr("data-pjax"),
            target: a
        };
        r(e.extend({}, o, n)), t.preventDefault()
    }

    function r(t) {
        function i(t, i) {
            var r = e.Event(t, {relatedTarget: n});
            return s.trigger(r, i), !r.isDefaultPrevented()
        }

        t = e.extend(!0, {}, e.ajaxSettings, r.defaults, t), e.isFunction(t.url) && (t.url = t.url());
        var n = t.target, a = d(t.url).hash, s = t.context = p(t.container);
        t.data || (t.data = {}), t.data._pjax = s.selector;
        var l;
        t.beforeSend = function (e, n) {
            return "GET" !== n.type && (n.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", s.selector), i("pjax:beforeSend", [e, n]) ? (n.timeout > 0 && (l = setTimeout(function () {
                i("pjax:timeout", [e, t]) && e.abort("timeout")
            }, n.timeout), n.timeout = 0), void(t.requestUrl = d(n.url).href)) : !1
        }, t.complete = function (e, n) {
            l && clearTimeout(l), i("pjax:complete", [e, n, t]), i("pjax:end", [e, t])
        }, t.error = function (e, n, r) {
            var a = g("", e, t), s = i("pjax:error", [e, n, r, t]);
            "GET" == t.type && "abort" !== n && s && o(a.url)
        }, t.success = function (n, l, u) {
            var h = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version, p = u.getResponseHeader("X-PJAX-Version"), f = g(n, u, t);
            if (h && p && h !== p)return void o(f.url);
            if (!f.contents)return void o(f.url);
            r.state = {
                id: t.id || c(),
                url: f.url,
                title: f.title,
                container: s.selector,
                fragment: t.fragment,
                timeout: t.timeout
            }, (t.push || t.replace) && window.history.replaceState(r.state, f.title, f.url);
            try {
                document.activeElement.blur()
            } catch (m) {
            }
            f.title && (document.title = f.title), s.html(f.contents);
            var b = s.find("input[autofocus], textarea[autofocus]").last()[0];
            if (b && document.activeElement !== b && b.focus(), v(f.scripts), "number" == typeof t.scrollTo && e(window).scrollTop(t.scrollTo), "" !== a) {
                var y = d(f.url);
                y.hash = a, r.state.url = y.href, window.history.replaceState(r.state, f.title, y.href);
                var C = e(y.hash);
                C.length && e(window).scrollTop(C.offset().top)
            }
            i("pjax:success", [n, l, u, t])
        }, r.state || (r.state = {
            id: c(),
            url: window.location.href,
            title: document.title,
            container: s.selector,
            fragment: t.fragment,
            timeout: t.timeout
        }, window.history.replaceState(r.state, document.title));
        var h = r.xhr;
        h && h.readyState < 4 && (h.onreadystatechange = e.noop, h.abort()), r.options = t;
        var h = r.xhr = e.ajax(t);
        return h.readyState > 0 && (t.push && !t.replace && (b(r.state.id, s.clone().contents()), window.history.pushState(null, "", u(t.requestUrl))), i("pjax:start", [h, t]), i("pjax:send", [h, t])), r.xhr
    }

    function a(t, i) {
        var n = {url: window.location.href, push: !1, replace: !0, scrollTo: !1};
        return r(e.extend(n, h(t, i)))
    }

    function o(e) {
        window.history.replaceState(null, "", "#"), window.location.replace(e)
    }

    function s(t) {
        var i = t.state;
        if (i && i.container) {
            if (_ && T == i.url)return;
            if (r.state && r.state.id === i.id)return;
            var n = e(i.container);
            if (n.length) {
                var a, s = x[i.id];
                r.state && (a = r.state.id < i.id ? "forward" : "back", y(a, r.state.id, n.clone().contents()));
                var l = e.Event("pjax:popstate", {state: i, direction: a});
                n.trigger(l);
                var c = {
                    id: i.id,
                    url: i.url,
                    container: n,
                    push: !1,
                    fragment: i.fragment,
                    timeout: i.timeout,
                    scrollTo: !1
                };
                s ? (n.trigger("pjax:start", [null, c]), i.title && (document.title = i.title), n.html(s), r.state = i, n.trigger("pjax:end", [null, c])) : r(c), n[0].offsetHeight
            } else o(location.href)
        }
        _ = !1
    }

    function l(t) {
        var i = e.isFunction(t.url) ? t.url() : t.url, n = t.type ? t.type.toUpperCase() : "GET", r = e("<form>", {
            method: "GET" === n ? "GET" : "POST",
            action: i,
            style: "display:none"
        });
        "GET" !== n && "POST" !== n && r.append(e("<input>", {
            type: "hidden",
            name: "_method",
            value: n.toLowerCase()
        }));
        var a = t.data;
        if ("string" == typeof a) e.each(a.split("&"), function (t, i) {
            var n = i.split("=");
            r.append(e("<input>", {type: "hidden", name: n[0], value: n[1]}))
        }); else if ("object" == typeof a)for (key in a)r.append(e("<input>", {
            type: "hidden",
            name: key,
            value: a[key]
        }));
        e(document.body).append(r), r.submit()
    }

    function c() {
        return (new Date).getTime()
    }

    function u(e) {
        return e.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }

    function d(e) {
        var t = document.createElement("a");
        return t.href = e, t
    }

    function h(t, i) {
        return t && i ? i.container = t : i = e.isPlainObject(t) ? t : {container: t}, i.container && (i.container = p(i.container)), i
    }

    function p(t) {
        if (t = e(t), t.length) {
            if ("" !== t.selector && t.context === document)return t;
            if (t.attr("id"))return e("#" + t.attr("id"));
            throw"cant get selector for pjax container!"
        }
        throw"no pjax container for " + t.selector
    }

    function f(e, t) {
        return e.filter(t).add(e.find(t))
    }

    function m(t) {
        return e.parseHTML(t, document, !0)
    }

    function g(t, i, n) {
        var r = {};
        if (r.url = u(i.getResponseHeader("X-PJAX-URL") || n.requestUrl), /<html/i.test(t))var a = e(m(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])), o = e(m(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0])); else var a = o = e(m(t));
        if (0 === o.length)return r;
        if (r.title = f(a, "title").last().text(), n.fragment) {
            if ("body" === n.fragment)var s = o; else var s = f(o, n.fragment).first();
            s.length && (r.contents = s.contents(), r.title || (r.title = s.attr("title") || s.data("title")))
        } else/<html/i.test(t) || (r.contents = o);
        return r.contents && (r.contents = r.contents.not(function () {
            return e(this).is("title")
        }), r.contents.find("title").remove(), r.scripts = f(r.contents, "script[src]").remove(), r.contents = r.contents.not(r.scripts)), r.title && (r.title = e.trim(r.title)), r
    }

    function v(t) {
        if (t) {
            var i = e("script[src]");
            t.each(function () {
                var t = this.src, n = i.filter(function () {
                    return this.src === t
                });
                if (!n.length) {
                    var r = document.createElement("script");
                    r.type = e(this).attr("type"), r.src = e(this).attr("src"), document.head.appendChild(r)
                }
            })
        }
    }

    function b(e, t) {
        for (x[e] = t, M.push(e); k.length;)delete x[k.shift()];
        for (; M.length > r.defaults.maxCacheLength;)delete x[M.shift()]
    }

    function y(e, t, i) {
        var n, r;
        x[t] = i, "forward" === e ? (n = M, r = k) : (n = k, r = M), n.push(t), (t = r.pop()) && delete x[t]
    }

    function C() {
        return e("meta").filter(function () {
            var t = e(this).attr("http-equiv");
            return t && "X-PJAX-VERSION" === t.toUpperCase()
        }).attr("content")
    }

    function S() {
        e.fn.pjax = t, e.pjax = r, e.pjax.enable = e.noop, e.pjax.disable = w, e.pjax.click = i, e.pjax.submit = n, e.pjax.reload = a, e.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: C
        }, e(window).on("popstate.pjax", s)
    }

    function w() {
        e.fn.pjax = function () {
            return this
        }, e.pjax = l, e.pjax.enable = S, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function () {
            window.location.reload()
        }, e(window).off("popstate.pjax", s)
    }

    var _ = !0, T = window.location.href, D = window.history.state;
    D && D.container && (r.state = D), "state" in window.history && (_ = !1);
    var x = {}, k = [], M = [];
    e.inArray("state", e.event.props) < 0 && e.event.props.push("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/), e.support.pjax ? S() : w()
}(jQuery), function (e, t) {
    var i = function (e, t, i, n) {
        var r = null, a = 0;
        return (isNaN(t) || 0 > t) && (t = 100), (isNaN(n) || 0 > n || n > t) && (n = t), "function" != typeof i ? i ? function () {
            var t = this, i = arguments;
            e.apply(t, i)
        } : function () {
            function i() {
                var l = (new Date).getTime() - a;
                l > t ? (e.apply(o, s), r = null) : r = setTimeout(i, n)
            }

            var o = this, s = arguments;
            r && clearTimeout(r), a = (new Date).getTime(), r = setTimeout(i, n)
        } : function () {
            function o() {
                var c = (new Date).getTime() - a;
                c > t || i() ? (e.apply(s, l), r = null) : r = setTimeout(o, n)
            }

            var s = this, l = arguments;
            r ? (clearTimeout(r), r = null) : i() ? e.apply(s, l) : (a = (new Date).getTime(), r = setTimeout(o, n))
        }
    };
    e.fn.waitFor = i, e.fn[t] = function (e) {
        return e ? this.bind("resize", i(e)) : this.trigger(t)
    }
}(jQuery || Zepto, "smartResize"), function (e) {
    function t(t) {
        {
            var i = t.target;
            e(i).offset()
        }
        i.dragging = !0, i.dragX = t.clientX, i.dragY = t.clientY, i.dragLeft = parseInt(i.style.left, 10), i.dragTop = parseInt(i.style.top, 10), i.style.transition = "all 0ms linear"
    }

    function i(e) {
        var t = e.target;
        if (t.dragging) {
            if (!isNaN(e.which) && 1 !== e.which)return void n(e);
            t.style.left = e.clientX - t.dragX + t.dragLeft + "px", t.style.top = e.clientY - t.dragY + t.dragTop + "px"
        }
    }

    function n(e) {
        var t = e.target, i = Math.abs(t.dragLeft - parseInt(t.style.left, 10)), n = Math.abs(t.dragTop - parseInt(t.style.top, 10));
        20 > i && 20 > n ? t.dragging = !1 : setTimeout(function () {
            t.dragging = !1
        }, 10), t.style.transition = ""
    }

    var r = null, a = {}, o = "click", s = {
        frameFill: .95,
        smartReisze: !0,
        zIndex: 1e3,
        container: null,
        width: 0,
        height: 0,
        group: "default",
        viewport: function (e) {
            return e
        },
        close: [{selector: "document", event: "keyup", condition: {keyCode: 27}}, {
            selector: ".imagebubble-backmask",
            event: o
        }],
        callbacks: {
            show: function () {
            }, hide: function () {
            }, shown: function () {
            }, hidden: function () {
            }
        },
        showTitle: !0,
        showMenu: !0,
        zoomLimit: "width",
        zoomRate: .98
    }, l = e('<div class="imagebubble-menu" />'), c = e('<div class="imagebubble-button zoomOut" />').html("+").appendTo(l), u = e('<a class="imagebubble-button downPic" />').appendTo(l).attr("target", "_blank"), d = e('<div class="imagebubble-button zoomIn" />').html("-").appendTo(l);
    l.on(o, function (e) {
        e.stopPropagation()
    }), d.on(o, function () {
        var t = e(this), i = t.parent().parent(), n = i.find(".imagebubble-ghost.selected"), r = parseInt(n.attr("scale"), 10) || 10;
        r -= 1, 1 > r && (r = 1), n.attr("scale", r).css({transform: "scale(" + r / 10 + ")"}), n[0].__showWidgets(n[0].__rect, r)
    }), c.on(o, function () {
        var t = e(this), i = t.parent().parent(), n = i.find(".imagebubble-ghost.selected"), r = parseInt(n.attr("scale"), 10) || 10, a = n[0].zoomLimit;
        r += 1, "width" === a ? n.width() * r > n[0].limitWidth * n[0].zoomRate && (r -= 1) : "height" === a ? n.height() * r > n[0].limitHeight * n[0].zoomRate && (r -= 1) : "draggable" !== a && (n.width() * r > n[0].limitWidth * n[0].zoomRate || n.height() * r > n[0].limitHeight * n[0].zoomRate) && (r -= 1), n.attr("scale", r).css({transform: "scale(" + r / 10 + ")"}), n[0].__showWidgets(n[0].__rect, r)
    }), e.fn.imageBubble = function (c) {
        function d(e, t, i, n) {
            var r = i.width * n, a = i.height * n, o = 1, s = 0, l = {};
            return r >= e && a >= t ? (l.width = e, l.height = t) : e > r && t > a ? (o = r / e, s = a / t, o > s && (o = s), l.width = e * o, l.height = t * o) : e > r ? (o = t / e, l.width = r, l.height = r * o) : (o = e / t, l.height = a, l.width = a * o), l.top = .5 * (i.height - l.height) + i.offsetTop, l.left = .5 * (i.width - l.width) + i.offsetLeft, l
        }

        function h() {
            f.find(".imagebubble-bubble").trigger(o)
        }

        function p() {
            var t, i, n, r = g.mask.find(".imagebubble-ghost"), a = {};
            m.container.hasClass("imagebubble-mode-on") && g.mask.css({
                width: m.container.width(),
                height: m.container.height()
            }), r.each(function (o) {
                var s, l;
                o = r[o], s = o._origin, o = e(o), l = o.hasClass("selected"), s[0].__setRect(), l ? (t = o[0].naturalWidth, i = o[0].naturalHeight, v = g.getBoundingClientRect(), n = m.viewport(v), n.offsetTop = n.top - v.top, n.offsetLeft = n.left - v.left, o[0].limitWidth = n.width, o[0].limitHeight = n.height, a = d(t, i, n, m.frameFill), o.css({
                    top: a.top,
                    left: a.left,
                    width: a.width,
                    height: a.height
                }), o[0].__rect = a, o[0].__showWidgets(a)) : (v = g.getBoundingClientRect(), o[0].__reset())
            })
        }

        if (!(Maleskine.BrowserDetector && Maleskine.BrowserDetector.isIE() && (Maleskine.BrowserDetector.isIE9() || Maleskine.BrowserDetector.isIE8() || Maleskine.BrowserDetector.lessThanIE8()))) {
            r || (r = e(window), s.container = e(document.body));
            var f = e(this), m = e.extend(!0, s, c);
            m.container.addClass("imagebubble-container").addClass("imagebubble-mode-off"), a[c.group] = a[c.group] || null;
            var g = m.container[0], v = g.getBoundingClientRect();
            g.mask || (g.mask = e('<div class="imagebubble-backmask image-package" />').css({"z-index": m.zIndex}).appendTo(m.container).on(o, h)), this.each(function () {
                var s = e(this), h = s.find("img");
                if ((g.contains(this) || g === this) && "ImageBubble" === s.attr("widget") && h.length > 0) {
                    s.addClass("imagebubble"), h.each(function () {
                        var s = e(this), h = s.data("updateImageBubble");
                        if (h)return void h(s.attr("data-original-src"), s.attr("alt"));
                        var f, b, y, C = this.getBoundingClientRect(), S = s.data("title") || s.attr("alt") || "", w = m.showTitle && !!S && S.length > 0, _ = e('<img class="imagebubble-ghost" />').attr("src", s.attr("data-original-src")).load(function () {
                            function e(e) {
                                if (!D) {
                                    if (D = !0, T) {
                                        if (_[0].dragging || a[c.group] !== s)return D = !1, void e.stopPropagation();
                                        m.callbacks.hide(), m.container.removeClass("imagebubble-mode-on").addClass("imagebubble-mode-off"), s.css({opacity: s[0].originalOpacity || 1}).removeClass("imagebubble-bubble"), _.css({
                                            top: C.top - v.top,
                                            left: C.left - v.left,
                                            width: C.width,
                                            height: C.height,
                                            transform: "scale(1)"
                                        }).removeClass("selected").attr("scale", 10), w && y.removeClass("enable"), setTimeout(b, 250)
                                    } else {
                                        if (null !== a[c.group] && a[c.group] !== s)return void(D = !1);
                                        a[c.group] = s, m.callbacks.show(), s[0].__setRect(), window.getComputedStyle ? s[0].originalOpacity = window.getComputedStyle(s[0]).opacity : document.defaultView && document.defaultView.getComputedStyle ? s[0].originalOpacity = document.defaultView.getComputedStyle(s[0]).opacity : s[0].currentStyle && (s[0].originalOpacity = s[0].currentStyle.opacity), v = g.getBoundingClientRect(), h = m.viewport(v), h.offsetTop = h.top - v.top, h.offsetLeft = h.left - v.left, _[0].limitWidth = h.width, _[0].limitHeight = h.height, g.mask.css({
                                            top: 0,
                                            width: m.container.width(),
                                            height: m.container.height(),
                                            display: "block"
                                        }), setTimeout(function () {
                                            n = d(t, i, h, m.frameFill), m.container.removeClass("imagebubble-mode-off").addClass("imagebubble-mode-on"), s.css({opacity: 0}).addClass("imagebubble-bubble"), _.css({
                                                top: n.top,
                                                left: n.left,
                                                width: n.width,
                                                height: n.height
                                            }).addClass("selected"), _[0].__rect = n, _[0].__showWidgets(n), setTimeout(f, 250)
                                        }, 0)
                                    }
                                    e.stopPropagation()
                                }
                            }

                            var t = _[0].naturalWidth, i = _[0].naturalHeight, n = {}, h = {};
                            g.mask.append(_.css({
                                top: C.top - v.top,
                                left: C.left - v.left,
                                width: s.width(),
                                height: s.height()
                            })), s.addClass("imagebubble-image"), _[0]._origin = s, s.on(o, e), _.on(o, e), _[0].__showWidgets = function (e, t) {
                                var i, n = {};
                                t = t || 10, t /= 10, m.showMenu ? (g.mask[0].contains(l[0]) || g.mask.append(l), n = l[0].getBoundingClientRect(), n = {
                                    top: e.top + e.height * (1 + t) * .5 + 10,
                                    win_bottom: r.scrollTop() + r.height() - n.height - 20
                                }, w && (i = y[0].getBoundingClientRect(), n.img_bottom = n.top, n.top += i.height + 10), n.top > n.win_bottom ? (l.addClass("in_pic"), n.top = n.win_bottom) : l.removeClass("in_pic"), l.css({top: n.top}), u.attr("href", s.attr("data-original-src")), w && (n.top = n.top - i.height - 10, n.top < n.img_bottom ? y.addClass("in_pic") : y.removeClass("in_pic"), y.addClass("enable").css({
                                    top: n.top,
                                    "margin-left": -i.width / 2
                                }))) : w && (n = y[0].getBoundingClientRect(), n = {
                                    width: n.width,
                                    top: e.top + e.height * (1 + t) * .5 + 10,
                                    win_bottom: r.scrollTop() + r.height() - n.height - 20
                                }, n.top > n.win_bottom ? (y.addClass("in_pic"), n.top = n.win_bottom) : y.removeClass("in_pic"), y.addClass("enable").css({
                                    top: n.top,
                                    "margin-left": -n.width / 2
                                }))
                            }, _[0].__reset = function () {
                                _.css({top: C.top - v.top, left: C.left - v.left, width: s.width(), height: s.height()})
                            }, s.data("updateImageBubble", function (e, t) {
                                e && _.attr("src", e), t && m.showTitle && (w = t.length > 0, y.html(w ? t : ""))
                            }), _.load(function () {
                                t = _[0].naturalWidth, i = _[0].naturalHeight, p()
                            }), p()
                        }), T = !1, D = !1;
                        _[0].zoomLimit = m.zoomLimit, _[0].zoomRate = 10 * m.zoomRate, "draggable" === m.zoomLimit && _.attr("draggable", !1).on("mousedown", t).on("mousemove", i).on("mouseup", n), f = function () {
                            T = !0, D = !1, m.callbacks.shown()
                        }, b = function () {
                            g.mask.css({
                                top: 0,
                                width: 0,
                                height: 0,
                                display: "none"
                            }), w && y.removeClass("enable"), T = !1, D = !1, a[c.group] = null, m.callbacks.hidden()
                        }, s[0].__setRect = function () {
                            C = s[0].getBoundingClientRect()
                        }, w && (y = e('<div class="image-caption" />').html(S).appendTo(g.mask))
                    })
                }
            }), m.close && m.close.map(function (t) {
                "window" === t.selector ? r.on(t.event, h) : "document" === t.selector ? t.condition ? e(document).on(t.event, function (e) {
                    var i, n = !0;
                    for (i in t.condition)if (e[i] && e[i] !== t.condition[i]) {
                        n = !1;
                        break
                    }
                    n && h()
                }) : e(document).on(t.event, h) : e(document).on(t.event, t.selector, h)
            }), m.smartReisze ? e(window).smartResize(p) : e(window).resize(p), p()
        }
    }
}(jQuery || Zepto), !function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Vue = t()
}(this, function () {
    "use strict";
    function e(t, n, r) {
        if (i(t, n))return void(t[n] = r);
        if (t._isVue)return void e(t._data, n, r);
        var a = t.__ob__;
        if (!a)return void(t[n] = r);
        if (a.convert(n, r), a.dep.notify(), a.vms)for (var o = a.vms.length; o--;) {
            var s = a.vms[o];
            s._proxy(n), s._digest()
        }
        return r
    }

    function t(e, t) {
        if (i(e, t)) {
            delete e[t];
            var n = e.__ob__;
            if (n && (n.dep.notify(), n.vms))for (var r = n.vms.length; r--;) {
                var a = n.vms[r];
                a._unproxy(t), a._digest()
            }
        }
    }

    function i(e, t) {
        return gn.call(e, t)
    }

    function n(e) {
        return vn.test(e)
    }

    function r(e) {
        var t = (e + "").charCodeAt(0);
        return 36 === t || 95 === t
    }

    function a(e) {
        return null == e ? "" : e.toString()
    }

    function o(e) {
        if ("string" != typeof e)return e;
        var t = Number(e);
        return isNaN(t) ? e : t
    }

    function s(e) {
        return "true" === e ? !0 : "false" === e ? !1 : e
    }

    function l(e) {
        var t = e.charCodeAt(0), i = e.charCodeAt(e.length - 1);
        return t !== i || 34 !== t && 39 !== t ? e : e.slice(1, -1)
    }

    function c(e) {
        return e.replace(bn, u)
    }

    function u(e, t) {
        return t ? t.toUpperCase() : ""
    }

    function d(e) {
        return e.replace(yn, "$1-$2").toLowerCase()
    }

    function h(e) {
        return e.replace(Cn, u)
    }

    function p(e, t) {
        return function (i) {
            var n = arguments.length;
            return n ? n > 1 ? e.apply(t, arguments) : e.call(t, i) : e.call(t)
        }
    }

    function f(e, t) {
        t = t || 0;
        for (var i = e.length - t, n = new Array(i); i--;)n[i] = e[i + t];
        return n
    }

    function m(e, t) {
        for (var i = Object.keys(t), n = i.length; n--;)e[i[n]] = t[i[n]];
        return e
    }

    function g(e) {
        return null !== e && "object" == typeof e
    }

    function v(e) {
        return Sn.call(e) === wn
    }

    function b(e, t, i, n) {
        Object.defineProperty(e, t, {value: i, enumerable: !!n, writable: !0, configurable: !0})
    }

    function y(e, t) {
        var i, n, r, a, o, s = function l() {
            var s = Date.now() - a;
            t > s && s >= 0 ? i = setTimeout(l, t - s) : (i = null, o = e.apply(r, n), i || (r = n = null))
        };
        return function () {
            return r = this, n = arguments, a = Date.now(), i || (i = setTimeout(s, t)), o
        }
    }

    function C(e, t) {
        for (var i = e.length; i--;)if (e[i] === t)return i;
        return -1
    }

    function S(e) {
        var t = function i() {
            return i.cancelled ? void 0 : e.apply(this, arguments)
        };
        return t.cancel = function () {
            t.cancelled = !0
        }, t
    }

    function w(e, t) {
        return e == t || (g(e) && g(t) ? JSON.stringify(e) === JSON.stringify(t) : !1)
    }

    function _(e) {
        this.size = 0, this.limit = e, this.head = this.tail = void 0, this._keymap = Object.create(null)
    }

    function T() {
        var e, t = $n.slice(Gn, Hn).trim();
        if (t) {
            e = {};
            var i = t.match(Qn);
            e.name = i[0], i.length > 1 && (e.args = i.slice(1).map(D))
        }
        e && (En.filters = En.filters || []).push(e), Gn = Hn + 1
    }

    function D(e) {
        if (Kn.test(e))return {value: o(e), dynamic: !1};
        var t = l(e), i = t === e;
        return {value: i ? e : t, dynamic: i}
    }

    function x(e) {
        var t = Jn.get(e);
        if (t)return t;
        for ($n = e, Un = Vn = !1, qn = zn = Wn = 0, Gn = 0, En = {}, Hn = 0, jn = $n.length; jn > Hn; Hn++)if (On = Rn, Rn = $n.charCodeAt(Hn), Un) 39 === Rn && 92 !== On && (Un = !Un); else if (Vn) 34 === Rn && 92 !== On && (Vn = !Vn); else if (124 === Rn && 124 !== $n.charCodeAt(Hn + 1) && 124 !== $n.charCodeAt(Hn - 1)) null == En.expression ? (Gn = Hn + 1, En.expression = $n.slice(0, Hn).trim()) : T(); else switch (Rn) {
            case 34:
                Vn = !0;
                break;
            case 39:
                Un = !0;
                break;
            case 40:
                Wn++;
                break;
            case 41:
                Wn--;
                break;
            case 91:
                zn++;
                break;
            case 93:
                zn--;
                break;
            case 123:
                qn++;
                break;
            case 125:
                qn--
        }
        return null == En.expression ? En.expression = $n.slice(0, Hn).trim() : 0 !== Gn && T(), Jn.put(e, En), En
    }

    function k(e) {
        return e.replace(Yn, "\\$&")
    }

    function M() {
        var e = k(or.delimiters[0]), t = k(or.delimiters[1]), i = k(or.unsafeDelimiters[0]), n = k(or.unsafeDelimiters[1]);
        er = new RegExp(i + "(.+?)" + n + "|" + e + "(.+?)" + t, "g"), tr = new RegExp("^" + i + ".*" + n + "$"), Xn = new _(1e3)
    }

    function P(e) {
        Xn || M();
        var t = Xn.get(e);
        if (t)return t;
        if (e = e.replace(/\n/g, ""), !er.test(e))return null;
        for (var i, n, r, a, o, s, l = [], c = er.lastIndex = 0; i = er.exec(e);)n = i.index, n > c && l.push({value: e.slice(c, n)}), r = tr.test(i[0]), a = r ? i[1] : i[2], o = a.charCodeAt(0), s = 42 === o, a = s ? a.slice(1) : a, l.push({
            tag: !0,
            value: a.trim(),
            html: r,
            oneTime: s
        }), c = n + i[0].length;
        return c < e.length && l.push({value: e.slice(c)}), Xn.put(e, l), l
    }

    function L(e, t) {
        return e.length > 1 ? e.map(function (e) {
            return F(e, t)
        }).join("+") : F(e[0], t, !0)
    }

    function F(e, t, i) {
        return e.tag ? e.oneTime && t ? '"' + t.$eval(e.value) + '"' : N(e.value, i) : '"' + e.value + '"'
    }

    function N(e, t) {
        if (ir.test(e)) {
            var i = x(e);
            return i.filters ? "this._applyFilters(" + i.expression + ",null," + JSON.stringify(i.filters) + ",false)" : "(" + e + ")"
        }
        return t ? e : "(" + e + ")"
    }

    function A(e, t, i, n) {
        $(e, 1, function () {
            t.appendChild(e)
        }, i, n)
    }

    function B(e, t, i, n) {
        $(e, 1, function () {
            G(e, t)
        }, i, n)
    }

    function I(e, t, i) {
        $(e, -1, function () {
            V(e)
        }, t, i)
    }

    function $(e, t, i, n, r) {
        var a = e.__v_trans;
        if (!a || !a.hooks && !Pn || !n._isCompiled || n.$parent && !n.$parent._isCompiled)return i(), void(r && r());
        var o = t > 0 ? "enter" : "leave";
        a[o](i, r)
    }

    function E(e) {
        return "string" == typeof e && (e = document.querySelector(e)), e
    }

    function R(e) {
        var t = document.documentElement, i = e && e.parentNode;
        return t === e || t === i || !(!i || 1 !== i.nodeType || !t.contains(i))
    }

    function O(e, t) {
        var i = e.getAttribute(t);
        return null !== i && e.removeAttribute(t), i
    }

    function H(e, t) {
        var i = O(e, ":" + t);
        return null === i && (i = O(e, "v-bind:" + t)), i
    }

    function j(e, t) {
        return e.hasAttribute(t) || e.hasAttribute(":" + t) || e.hasAttribute("v-bind:" + t)
    }

    function G(e, t) {
        t.parentNode.insertBefore(e, t)
    }

    function U(e, t) {
        t.nextSibling ? G(e, t.nextSibling) : t.parentNode.appendChild(e)
    }

    function V(e) {
        e.parentNode.removeChild(e)
    }

    function q(e, t) {
        t.firstChild ? G(e, t.firstChild) : t.appendChild(e)
    }

    function z(e, t) {
        var i = e.parentNode;
        i && i.replaceChild(t, e)
    }

    function W(e, t, i) {
        e.addEventListener(t, i)
    }

    function J(e, t, i) {
        e.removeEventListener(t, i)
    }

    function Q(e, t) {
        !xn || e instanceof SVGElement ? e.setAttribute("class", t) : e.className = t
    }

    function K(e, t) {
        if (e.classList) e.classList.add(t); else {
            var i = " " + (e.getAttribute("class") || "") + " ";
            i.indexOf(" " + t + " ") < 0 && Q(e, (i + t).trim())
        }
    }

    function Z(e, t) {
        if (e.classList) e.classList.remove(t); else {
            for (var i = " " + (e.getAttribute("class") || "") + " ", n = " " + t + " "; i.indexOf(n) >= 0;)i = i.replace(n, " ");
            Q(e, i.trim())
        }
        e.className || e.removeAttribute("class")
    }

    function Y(e, t) {
        var i, n;
        if (tt(e) && e.content instanceof DocumentFragment && (e = e.content), e.hasChildNodes())for (X(e), n = t ? document.createDocumentFragment() : document.createElement("div"); i = e.firstChild;)n.appendChild(i);
        return n
    }

    function X(e) {
        et(e, e.firstChild), et(e, e.lastChild)
    }

    function et(e, t) {
        t && 3 === t.nodeType && !t.data.trim() && e.removeChild(t)
    }

    function tt(e) {
        return e.tagName && "template" === e.tagName.toLowerCase()
    }

    function it(e, t) {
        var i = or.debug ? document.createComment(e) : document.createTextNode(t ? " " : "");
        return i.__vue_anchor = !0, i
    }

    function nt(e) {
        if (e.hasAttributes())for (var t = e.attributes, i = 0, n = t.length; n > i; i++) {
            var r = t[i].name;
            if (lr.test(r))return c(r.replace(lr, ""))
        }
    }

    function rt(e, t, i) {
        for (var n; e !== t;)n = e.nextSibling, i(e), e = n;
        i(t)
    }

    function at(e, t, i, n, r) {
        function a() {
            if (s++, o && s >= l.length) {
                for (var e = 0; e < l.length; e++)n.appendChild(l[e]);
                r && r()
            }
        }

        var o = !1, s = 0, l = [];
        rt(e, t, function (e) {
            e === t && (o = !0), l.push(e), I(e, i, a)
        })
    }

    function ot(e, t) {
        var i = e.tagName.toLowerCase(), n = e.hasAttributes();
        if (cr.test(i) || ur.test(i)) {
            if (n)return st(e)
        } else {
            if (vt(t, "components", i))return {id: i};
            var r = n && st(e);
            if (r)return r
        }
    }

    function st(e) {
        var t = O(e, "is");
        return null != t ? {id: t} : (t = H(e, "is"), null != t ? {id: t, dynamic: !0} : void 0)
    }

    function lt(e, t, i) {
        var n = t.path;
        i = ut(t, i), e[n] = e._data[n] = ct(t, i) ? i : void 0
    }

    function ct(e, t) {
        if (null === e.raw && !e.required)return !0;
        var i, n = e.options, r = n.type, a = !0;
        if (r && (r === String ? (i = "string", a = typeof t === i) : r === Number ? (i = "number", a = "number" == typeof t) : r === Boolean ? (i = "boolean", a = "boolean" == typeof t) : r === Function ? (i = "function", a = "function" == typeof t) : r === Object ? (i = "object", a = v(t)) : r === Array ? (i = "array", a = _n(t)) : a = t instanceof r), !a)return !1;
        var o = n.validator;
        return o && !o.call(null, t) ? !1 : !0
    }

    function ut(e, t) {
        var i = e.options.coerce;
        return i ? i(t) : t
    }

    function dt(t, n) {
        var r, a, o;
        for (r in n)a = t[r], o = n[r], i(t, r) ? g(a) && g(o) && dt(a, o) : e(t, r, o);
        return t
    }

    function ht(e, t) {
        var i = Object.create(e);
        return t ? m(i, mt(t)) : i
    }

    function pt(e) {
        if (e.components)for (var t, i = e.components = mt(e.components), n = Object.keys(i), r = 0, a = n.length; a > r; r++) {
            var o = n[r];
            cr.test(o) || ur.test(o) || (t = i[o], v(t) && (i[o] = un.extend(t)))
        }
    }

    function ft(e) {
        var t, i, n = e.props;
        if (_n(n))for (e.props = {}, t = n.length; t--;)i = n[t], "string" == typeof i ? e.props[i] = null : i.name && (e.props[i.name] = i); else if (v(n)) {
            var r = Object.keys(n);
            for (t = r.length; t--;)i = n[r[t]], "function" == typeof i && (n[r[t]] = {type: i})
        }
    }

    function mt(e) {
        if (_n(e)) {
            for (var t, i = {}, n = e.length; n--;) {
                t = e[n];
                var r = "function" == typeof t ? t.options && t.options.name || t.id : t.name || t.id;
                r && (i[r] = t)
            }
            return i
        }
        return e
    }

    function gt(e, t, n) {
        function r(i) {
            var r = dr[i] || hr;
            o[i] = r(e[i], t[i], n, i)
        }

        pt(t), ft(t);
        var a, o = {};
        if (t.mixins)for (var s = 0, l = t.mixins.length; l > s; s++)e = gt(e, t.mixins[s], n);
        for (a in e)r(a);
        for (a in t)i(e, a) || r(a);
        return o
    }

    function vt(e, t, i) {
        var n, r = e[t];
        return r[i] || r[n = c(i)] || r[n.charAt(0).toUpperCase() + n.slice(1)]
    }

    function bt() {
    }

    function yt() {
        this.id = mr++, this.subs = []
    }

    function Ct(e) {
        if (this.value = e, this.dep = new yt, b(e, "__ob__", this), _n(e)) {
            var t = Tn ? St : wt;
            t(e, fr, gr), this.observeArray(e)
        } else this.walk(e)
    }

    function St(e, t) {
        e.__proto__ = t
    }

    function wt(e, t, i) {
        for (var n = 0, r = i.length; r > n; n++) {
            var a = i[n];
            b(e, a, t[a])
        }
    }

    function _t(e, t) {
        if (e && "object" == typeof e) {
            var n;
            return i(e, "__ob__") && e.__ob__ instanceof Ct ? n = e.__ob__ : (_n(e) || v(e)) && Object.isExtensible(e) && !e._isVue && (n = new Ct(e)), n && t && n.addVm(t), n
        }
    }

    function Tt(e, t, i) {
        var n, r, a = new yt;
        if (or.convertAllProperties) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (o && o.configurable === !1)return;
            n = o && o.get, r = o && o.set
        }
        var s = _t(i);
        Object.defineProperty(e, t, {
            enumerable: !0, configurable: !0, get: function () {
                var t = n ? n.call(e) : i;
                if (yt.target && (a.depend(), s && s.dep.depend(), _n(t)))for (var r, o = 0, l = t.length; l > o; o++)r = t[o], r && r.__ob__ && r.__ob__.dep.depend();
                return t
            }, set: function (t) {
                var o = n ? n.call(e) : i;
                t !== o && (r ? r.call(e, t) : i = t, s = _t(t), a.notify())
            }
        })
    }

    function Dt(e) {
        e.prototype._init = function (e) {
            e = e || {}, this.$el = null, this.$parent = e.parent, this.$root = this.$parent ? this.$parent.$root : this, this.$children = [], this.$refs = {}, this.$els = {}, this._watchers = [], this._directives = [], this._uid = br++, this._isVue = !0, this._events = {}, this._eventsCount = {}, this._isFragment = !1, this._fragment = this._fragmentStart = this._fragmentEnd = null, this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = !1, this._unlinkFn = null, this._context = e._context || this.$parent, this._scope = e._scope, this._frag = e._frag, this._frag && this._frag.children.push(this), this.$parent && this.$parent.$children.push(this), e = this.$options = gt(this.constructor.options, e, this), this._updateRef(), this._data = {}, this._callHook("init"), this._initState(), this._initEvents(), this._callHook("created"), e.el && this.$mount(e.el)
        }
    }

    function xt(e) {
        if (void 0 === e)return "eof";
        var t = e.charCodeAt(0);
        switch (t) {
            case 91:
            case 93:
            case 46:
            case 34:
            case 39:
            case 48:
                return e;
            case 95:
            case 36:
                return "ident";
            case 32:
            case 9:
            case 10:
            case 13:
            case 160:
            case 65279:
            case 8232:
            case 8233:
                return "ws"
        }
        return t >= 97 && 122 >= t || t >= 65 && 90 >= t ? "ident" : t >= 49 && 57 >= t ? "number" : "else"
    }

    function kt(e) {
        var t = e.trim();
        return "0" === e.charAt(0) && isNaN(e) ? !1 : n(t) ? l(t) : "*" + t
    }

    function Mt(e) {
        function t() {
            var t = e[u + 1];
            return d === Pr && "'" === t || d === Lr && '"' === t ? (u++, n = "\\" + t, p[Cr](), !0) : void 0
        }

        var i, n, r, a, o, s, l, c = [], u = -1, d = Tr, h = 0, p = [];
        for (p[Sr] = function () {
            void 0 !== r && (c.push(r), r = void 0)
        }, p[Cr] = function () {
            void 0 === r ? r = n : r += n
        }, p[wr] = function () {
            p[Cr](), h++
        }, p[_r] = function () {
            if (h > 0) h--, d = Mr, p[Cr](); else {
                if (h = 0, r = kt(r), r === !1)return !1;
                p[Sr]()
            }
        }; null != d;)if (u++, i = e[u], "\\" !== i || !t()) {
            if (a = xt(i), l = Ar[d], o = l[a] || l["else"] || Nr, o === Nr)return;
            if (d = o[0], s = p[o[1]], s && (n = o[2], n = void 0 === n ? i : n, s() === !1))return;
            if (d === Fr)return c.raw = e, c
        }
    }

    function Pt(e) {
        var t = yr.get(e);
        return t || (t = Mt(e), t && yr.put(e, t)), t
    }

    function Lt(e, t) {
        return Rt(t).get(e)
    }

    function Ft(t, i, n) {
        var r = t;
        if ("string" == typeof i && (i = Mt(i)), !i || !g(t))return !1;
        for (var a, o, s = 0, l = i.length; l > s; s++)a = t, o = i[s], "*" === o.charAt(0) && (o = Rt(o.slice(1)).get.call(r, r)), l - 1 > s ? (t = t[o], g(t) || (t = {}, e(a, o, t))) : _n(t) ? t.$set(o, n) : o in t ? t[o] = n : e(t, o, n);
        return !0
    }

    function Nt(e, t) {
        var i = Wr.length;
        return Wr[i] = t ? e.replace(jr, "\\n") : e, '"' + i + '"'
    }

    function At(e) {
        var t = e.charAt(0), i = e.slice(1);
        return Er.test(i) ? e : (i = i.indexOf('"') > -1 ? i.replace(Ur, Bt) : i, t + "scope." + i)
    }

    function Bt(e, t) {
        return Wr[t]
    }

    function It(e) {
        Or.test(e), Wr.length = 0;
        var t = e.replace(Gr, Nt).replace(Hr, "");
        return t = (" " + t).replace(qr, At).replace(Ur, Bt), $t(t)
    }

    function $t(e) {
        try {
            return new Function("scope", "return " + e + ";")
        } catch (t) {
        }
    }

    function Et(e) {
        var t = Pt(e);
        return t ? function (e, i) {
            Ft(e, t, i)
        } : void 0
    }

    function Rt(e, t) {
        e = e.trim();
        var i = Ir.get(e);
        if (i)return t && !i.set && (i.set = Et(i.exp)), i;
        var n = {exp: e};
        return n.get = Ot(e) && e.indexOf("[") < 0 ? $t("scope." + e) : It(e), t && (n.set = Et(e)), Ir.put(e, n), n
    }

    function Ot(e) {
        return Vr.test(e) && !zr.test(e) && "Math." !== e.slice(0, 5)
    }

    function Ht() {
        Qr = [], Kr = [], Zr = {}, Yr = {}, Xr = ea = !1
    }

    function jt() {
        Gt(Qr), ea = !0, Gt(Kr), Ht()
    }

    function Gt(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t], n = i.id;
            Zr[n] = null, i.run()
        }
    }

    function Ut(e) {
        var t = e.id;
        if (null == Zr[t]) {
            if (ea && !e.user)return void e.run();
            var i = e.user ? Kr : Qr;
            Zr[t] = i.length, i.push(e), Xr || (Xr = !0, Bn(jt))
        }
    }

    function Vt(e, t, i, n) {
        n && m(this, n);
        var r = "function" == typeof t;
        if (this.vm = e, e._watchers.push(this), this.expression = r ? t.toString() : t, this.cb = i, this.id = ++ta, this.active = !0, this.dirty = this.lazy, this.deps = Object.create(null), this.newDeps = null, this.prevError = null, r) this.getter = t, this.setter = void 0; else {
            var a = Rt(t, this.twoWay);
            this.getter = a.get, this.setter = a.set
        }
        this.value = this.lazy ? void 0 : this.get(), this.queued = this.shallow = !1
    }

    function qt(e) {
        var t, i;
        if (_n(e))for (t = e.length; t--;)qt(e[t]); else if (g(e))for (i = Object.keys(e), t = i.length; t--;)qt(e[i[t]])
    }

    function zt(e) {
        if (ba[e])return ba[e];
        var t = Wt(e);
        return ba[e] = ba[t] = t, t
    }

    function Wt(e) {
        e = d(e);
        var t = c(e), i = t.charAt(0).toUpperCase() + t.slice(1);
        if (ya || (ya = document.createElement("div")), t in ya.style)return e;
        for (var n, r = ma.length; r--;)if (n = ga[r] + i, n in ya.style)return ma[r] + e
    }

    function Jt(e, t) {
        var i = t.map(function (e) {
            var t = e.charCodeAt(0);
            return t > 47 && 58 > t ? parseInt(e, 10) : 1 === e.length && (t = e.toUpperCase().charCodeAt(0), t > 64 && 91 > t) ? t : ka[e]
        });
        return function (t) {
            return i.indexOf(t.keyCode) > -1 ? e.call(this, t) : void 0
        }
    }

    function Qt(e) {
        return function (t) {
            return t.stopPropagation(), e.call(this, t)
        }
    }

    function Kt(e) {
        return function (t) {
            return t.preventDefault(), e.call(this, t)
        }
    }

    function Zt(e, t, i) {
        for (var n, r, a, o = t ? [] : null, s = 0, l = e.options.length; l > s; s++)if (n = e.options[s], a = i ? n.hasAttribute("selected") : n.selected) {
            if (r = n.hasOwnProperty("_value") ? n._value : n.value, !t)return r;
            o.push(r)
        }
        return o
    }

    function Yt(e, t) {
        for (var i = e.length; i--;)if (w(e[i], t))return i;
        return -1
    }

    function Xt(e) {
        return tt(e) && e.content instanceof DocumentFragment
    }

    function ei(e, t) {
        var i = $a.get(e);
        if (i)return i;
        var n = document.createDocumentFragment(), r = e.match(Oa), a = Ha.test(e);
        if (r || a) {
            var o = r && r[1], s = Ra[o] || Ra.efault, l = s[0], c = s[1], u = s[2], d = document.createElement("div"), h = t ? e : e.trim();
            for (d.innerHTML = c + h + u; l--;)d = d.lastChild;
            for (var p; p = d.firstChild;)n.appendChild(p)
        } else n.appendChild(document.createTextNode(e));
        return $a.put(e, n), n
    }

    function ti(e) {
        if (Xt(e))return X(e.content), e.content;
        if ("SCRIPT" === e.tagName)return ei(e.textContent);
        for (var t, i = ii(e), n = document.createDocumentFragment(); t = i.firstChild;)n.appendChild(t);
        return X(n), n
    }

    function ii(e) {
        if (!e.querySelectorAll)return e.cloneNode();
        var t, i, n, r = e.cloneNode(!0);
        if (ja) {
            var a = r;
            if (Xt(e) && (e = e.content, a = r.content), i = e.querySelectorAll("template"), i.length)for (n = a.querySelectorAll("template"), t = n.length; t--;)n[t].parentNode.replaceChild(ii(i[t]), n[t])
        }
        if (Ga)if ("TEXTAREA" === e.tagName) r.value = e.value; else if (i = e.querySelectorAll("textarea"), i.length)for (n = r.querySelectorAll("textarea"), t = n.length; t--;)n[t].value = i[t].value;
        return r
    }

    function ni(e, t, i) {
        var n, r;
        return e instanceof DocumentFragment ? (X(e), t ? ii(e) : e) : ("string" == typeof e ? i || "#" !== e.charAt(0) ? r = ei(e, i) : (r = Ea.get(e), r || (n = document.getElementById(e.slice(1)), n && (r = ti(n), Ea.put(e, r)))) : e.nodeType && (r = ti(e)), r && t ? ii(r) : r)
    }

    function ri(e, t, i, n, r, a) {
        this.children = [], this.childFrags = [], this.vm = t, this.scope = r, this.inserted = !1, this.parentFrag = a, a && a.childFrags.push(this), this.unlink = e(t, i, n, r, this);
        var o = this.single = 1 === i.childNodes.length && !i.childNodes[0].__vue_anchor;
        o ? (this.node = i.childNodes[0], this.before = ai, this.remove = oi) : (this.node = it("fragment-start"), this.end = it("fragment-end"), this.frag = i, q(this.node, i), i.appendChild(this.end), this.before = si, this.remove = li), this.node.__vfrag__ = this
    }

    function ai(e, t) {
        this.inserted = !0;
        var i = t !== !1 ? B : G;
        i(this.node, e, this.vm), R(this.node) && this.callHook(ci)
    }

    function oi() {
        this.inserted = !1;
        var e = R(this.node), t = this;
        this.beforeRemove(), I(this.node, this.vm, function () {
            e && t.callHook(ui), t.destroy()
        })
    }

    function si(e, t) {
        this.inserted = !0;
        var i = this.vm, n = t !== !1 ? B : G;
        rt(this.node, this.end, function (t) {
            n(t, e, i)
        }), R(this.node) && this.callHook(ci)
    }

    function li() {
        this.inserted = !1;
        var e = this, t = R(this.node);
        this.beforeRemove(), at(this.node, this.end, this.vm, this.frag, function () {
            t && e.callHook(ui), e.destroy()
        })
    }

    function ci(e) {
        e._isAttached || e._callHook("attached")
    }

    function ui(e) {
        e._isAttached && e._callHook("detached")
    }

    function di(e, t) {
        this.vm = e;
        var i, n = "string" == typeof t;
        n || tt(t) ? i = ni(t, !0) : (i = document.createDocumentFragment(), i.appendChild(t)), this.template = i;
        var r, a = e.constructor.cid;
        if (a > 0) {
            var o = a + (n ? t : t.outerHTML);
            r = Va.get(o), r || (r = Ti(i, e.$options, !0), Va.put(o, r))
        } else r = Ti(i, e.$options, !0);
        this.linker = r
    }

    function hi(e, t, i) {
        var n = e.node.previousSibling;
        if (n) {
            for (e = n.__vfrag__; !(e && e.forId === i && e.inserted || n === t);) {
                if (n = n.previousSibling, !n)return;
                e = n.__vfrag__
            }
            return e
        }
    }

    function pi(e) {
        var t = e.node;
        if (e.end)for (; !t.__vue__ && t !== e.end && t.nextSibling;)t = t.nextSibling;
        return t.__vue__
    }

    function fi(e) {
        for (var t = -1, i = new Array(e); ++t < e;)i[t] = t;
        return i
    }

    function mi(e) {
        Za.push(e), Ya || (Ya = !0, Bn(gi))
    }

    function gi() {
        for (var e = document.documentElement.offsetHeight, t = 0; t < Za.length; t++)Za[t]();
        return Za = [], Ya = !1, e
    }

    function vi(e, t, i, n) {
        this.id = t, this.el = e, this.enterClass = i && i.enterClass || t + "-enter", this.leaveClass = i && i.leaveClass || t + "-leave", this.hooks = i, this.vm = n, this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null, this.justEntered = !1, this.entered = this.left = !1, this.typeCache = {}, this.type = i && i.type;
        var r = this;
        ["enterNextTick", "enterDone", "leaveNextTick", "leaveDone"].forEach(function (e) {
            r[e] = p(r[e], r)
        })
    }

    function bi(e) {
        return !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }

    function yi(e) {
        for (var t = {}, i = e.trim().split(/\s+/), n = i.length; n--;)t[i[n]] = !0;
        return t
    }

    function Ci(e, t) {
        return _n(e) ? e.indexOf(t) > -1 : i(e, t)
    }

    function Si(e, t) {
        for (var i, r, a, o, s, l, u, h = [], p = Object.keys(t), f = p.length; f--;)r = p[f], i = t[r] || ho, s = c(r), po.test(s) && (u = {
            name: r,
            path: s,
            options: i,
            mode: uo.ONE_WAY,
            raw: null
        }, a = d(r), null === (o = H(e, a)) && (null !== (o = H(e, a + ".sync")) ? u.mode = uo.TWO_WAY : null !== (o = H(e, a + ".once")) && (u.mode = uo.ONE_TIME)), null !== o ? (u.raw = o, l = x(o), o = l.expression, u.filters = l.filters, n(o) && !l.filters ? u.optimizedLiteral = !0 : u.dynamic = !0, u.parentPath = o) : null !== (o = O(e, a)) ? u.raw = o : i.required, h.push(u));
        return wi(h)
    }

    function wi(e) {
        return function (t, i) {
            t._props = {};
            for (var n, r, a, c, u, d = e.length; d--;)if (n = e[d], u = n.raw, r = n.path, a = n.options, t._props[r] = n, null === u) lt(t, n, _i(t, a)); else if (n.dynamic) t._context && (n.mode === uo.ONE_TIME ? (c = (i || t._context).$get(n.parentPath), lt(t, n, c)) : t._bindDir({
                name: "prop",
                def: oo,
                prop: n
            }, null, null, i)); else if (n.optimizedLiteral) {
                var h = l(u);
                c = h === u ? s(o(u)) : h, lt(t, n, c)
            } else c = a.type === Boolean && "" === u ? !0 : u, lt(t, n, c)
        }
    }

    function _i(e, t) {
        if (!i(t, "default"))return t.type === Boolean ? !1 : void 0;
        var n = t["default"];
        return g(n), "function" == typeof n && t.type !== Function ? n.call(e) : n
    }

    function Ti(e, t, i) {
        var n = i || !t._asComponent ? Fi(e, t) : null, r = n && n.terminal || "SCRIPT" === e.tagName || !e.hasChildNodes() ? null : Ei(e.childNodes, t);
        return function (e, t, i, a, o) {
            var s = f(t.childNodes), l = Di(function () {
                n && n(e, t, i, a, o), r && r(e, s, i, a, o)
            }, e);
            return ki(e, l)
        }
    }

    function Di(e, t) {
        var i = t._directives.length;
        e();
        var n = t._directives.slice(i);
        n.sort(xi);
        for (var r = 0, a = n.length; a > r; r++)n[r]._bind();
        return n
    }

    function xi(e, t) {
        return e = e.descriptor.def.priority || Co, t = t.descriptor.def.priority || Co, e > t ? -1 : e === t ? 0 : 1
    }

    function ki(e, t, i, n) {
        function r(r) {
            Mi(e, t, r), i && n && Mi(i, n)
        }

        return r.dirs = t, r
    }

    function Mi(e, t, i) {
        for (var n = t.length; n--;)t[n]._teardown(), i || e._directives.$remove(t[n])
    }

    function Pi(e, t, i, n) {
        var r = Si(t, i), a = Di(function () {
            r(e, n)
        }, e);
        return ki(e, a)
    }

    function Li(e, t, i) {
        var n, r, a = t._containerAttrs, o = t._replacerAttrs;
        return 11 !== e.nodeType && (t._asComponent ? (a && i && (n = Vi(a, i)), o && (r = Vi(o, t))) : r = Vi(e.attributes, t)), t._containerAttrs = t._replacerAttrs = null, function (e, t, i) {
            var a, o = e._context;
            o && n && (a = Di(function () {
                n(o, t, null, i)
            }, o));
            var s = Di(function () {
                r && r(e, t)
            }, e);
            return ki(e, s, o, a)
        }
    }

    function Fi(e, t) {
        var i = e.nodeType;
        return 1 === i && "SCRIPT" !== e.tagName ? Ni(e, t) : 3 === i && e.data.trim() ? Ai(e, t) : null
    }

    function Ni(e, t) {
        if ("TEXTAREA" === e.tagName) {
            var i = P(e.value);
            i && (e.setAttribute(":value", L(i)), e.value = "")
        }
        var n, r = e.hasAttributes();
        return r && (n = ji(e, t)), n || (n = Oi(e, t)), n || (n = Hi(e, t)), !n && r && (n = Vi(e.attributes, t)), n
    }

    function Ai(e, t) {
        if (e._skip)return Bi;
        var i = P(e.wholeText);
        if (!i)return null;
        for (var n = e.nextSibling; n && 3 === n.nodeType;)n._skip = !0, n = n.nextSibling;
        for (var r, a, o = document.createDocumentFragment(), s = 0, l = i.length; l > s; s++)a = i[s], r = a.tag ? Ii(a, t) : document.createTextNode(a.value), o.appendChild(r);
        return $i(i, o, t)
    }

    function Bi(e, t) {
        V(t)
    }

    function Ii(e) {
        function t(t) {
            if (!e.descriptor) {
                var i = x(e.value);
                e.descriptor = {name: t, def: Ka[t], expression: i.expression, filters: i.filters}
            }
        }

        var i;
        return e.oneTime ? i = document.createTextNode(e.value) : e.html ? (i = document.createComment("v-html"), t("html")) : (i = document.createTextNode(" "), t("text")), i
    }

    function $i(e, t) {
        return function (i, n, r, a) {
            for (var o, s, l, c = t.cloneNode(!0), u = f(c.childNodes), d = 0, h = e.length; h > d; d++)o = e[d], s = o.value, o.tag && (l = u[d], o.oneTime ? (s = (a || i).$eval(s), o.html ? z(l, ni(s, !0)) : l.data = s) : i._bindDir(o.descriptor, l, r, a));
            z(n, c)
        }
    }

    function Ei(e, t) {
        for (var i, n, r, a = [], o = 0, s = e.length; s > o; o++)r = e[o], i = Fi(r, t), n = i && i.terminal || "SCRIPT" === r.tagName || !r.hasChildNodes() ? null : Ei(r.childNodes, t), a.push(i, n);
        return a.length ? Ri(a) : null
    }

    function Ri(e) {
        return function (t, i, n, r, a) {
            for (var o, s, l, c = 0, u = 0, d = e.length; d > c; u++) {
                o = i[u], s = e[c++], l = e[c++];
                var h = f(o.childNodes);
                s && s(t, o, n, r, a), l && l(t, h, n, r, a)
            }
        }
    }

    function Oi(e, t) {
        var i = e.tagName.toLowerCase();
        if (!cr.test(i)) {
            "slot" === i && j(e, "name") && (i = "_namedSlot");
            var n = vt(t, "elementDirectives", i);
            return n ? Ui(e, i, "", t, n) : void 0
        }
    }

    function Hi(e, t) {
        var i = ot(e, t);
        if (i) {
            var n = nt(e), r = {
                name: "component",
                ref: n,
                expression: i.id,
                def: co.component,
                modifiers: {literal: !i.dynamic}
            }, a = function (e, t, i, a, o) {
                n && Tt((a || e).$refs, n, null), e._bindDir(r, t, i, a, o)
            };
            return a.terminal = !0, a
        }
    }

    function ji(e, t) {
        if (null !== O(e, "v-pre"))return Gi;
        if (e.hasAttribute("v-else")) {
            var i = e.previousElementSibling;
            if (i && i.hasAttribute("v-if"))return Gi
        }
        for (var n, r, a = 0, o = yo.length; o > a; a++)if (r = yo[a], n = e.getAttribute("v-" + r), null != n)return Ui(e, r, n, t)
    }

    function Gi() {
    }

    function Ui(e, t, i, n, r) {
        var a = x(i), o = {name: t, expression: a.expression, filters: a.filters, raw: i, def: r || Ka[t]};
        ("for" === t || "router-view" === t) && (o.ref = nt(e));
        var s = function (e, t, i, n, r) {
            o.ref && Tt((n || e).$refs, o.ref, null), e._bindDir(o, t, i, n, r)
        };
        return s.terminal = !0, s
    }

    function Vi(e, t) {
        function i(e, t, i) {
            var n = i && Wi(i), r = !n && x(a);
            f.push({
                name: e,
                attr: o,
                raw: s,
                def: t,
                arg: c,
                modifiers: u,
                expression: r && r.expression,
                filters: r && r.filters,
                interp: i,
                hasOneTime: n
            })
        }

        for (var n, r, a, o, s, l, c, u, d, h, p = e.length, f = []; p--;)if (n = e[p], r = o = n.name, a = s = n.value, h = P(a), c = null, u = qi(r), r = r.replace(vo, ""), h) a = L(h), c = r, i("bind", Ka.bind, h); else if (bo.test(r)) u.literal = !fo.test(r), i("transition", co.transition); else if (mo.test(r)) c = r.replace(mo, ""), i("on", Ka.on); else if (fo.test(r)) l = r.replace(fo, ""), "style" === l || "class" === l ? i(l, co[l]) : (c = l, i("bind", Ka.bind)); else if (0 === r.indexOf("v-")) {
            if (c = (c = r.match(go)) && c[1], c && (r = r.replace(go, "")), l = r.slice(2), "else" === l)continue;
            d = vt(t, "directives", l), d && i(l, d)
        }
        return f.length ? zi(f) : void 0
    }

    function qi(e) {
        var t = Object.create(null), i = e.match(vo);
        if (i)for (var n = i.length; n--;)t[i[n].slice(1)] = !0;
        return t
    }

    function zi(e) {
        return function (t, i, n, r, a) {
            for (var o = e.length; o--;)t._bindDir(e[o], i, n, r, a)
        }
    }

    function Wi(e) {
        for (var t = e.length; t--;)if (e[t].oneTime)return !0
    }

    function Ji(e, t) {
        return t && (t._containerAttrs = Ki(e)), tt(e) && (e = ni(e)), t && (t._asComponent && !t.template && (t.template = "<slot></slot>"), t.template && (t._content = Y(e), e = Qi(e, t))), e instanceof DocumentFragment && (q(it("v-start", !0), e), e.appendChild(it("v-end", !0))), e
    }

    function Qi(e, t) {
        var i = t.template, n = ni(i, !0);
        if (n) {
            var r = n.firstChild, a = r.tagName && r.tagName.toLowerCase();
            return t.replace ? (e === document.body, n.childNodes.length > 1 || 1 !== r.nodeType || "component" === a || vt(t, "components", a) || j(r, "is") || vt(t, "elementDirectives", a) || r.hasAttribute("v-for") || r.hasAttribute("v-if") ? n : (t._replacerAttrs = Ki(r), Zi(e, r), r)) : (e.appendChild(n), e)
        }
    }

    function Ki(e) {
        return 1 === e.nodeType && e.hasAttributes() ? f(e.attributes) : void 0
    }

    function Zi(e, t) {
        for (var i, n, r = e.attributes, a = r.length; a--;)i = r[a].name, n = r[a].value, t.hasAttribute(i) || So.test(i) ? "class" !== i || P(n) || n.split(/\s+/).forEach(function (e) {
            K(t, e)
        }) : t.setAttribute(i, n)
    }

    function Yi(t) {
        function n() {
        }

        function a(e, t) {
            var i = new Vt(t, e, null, {lazy: !0});
            return function () {
                return i.dirty && i.evaluate(), yt.target && i.depend(), i.value
            }
        }

        Object.defineProperty(t.prototype, "$data", {
            get: function () {
                return this._data
            }, set: function (e) {
                e !== this._data && this._setData(e)
            }
        }), t.prototype._initState = function () {
            this._initProps(), this._initMeta(), this._initMethods(), this._initData(), this._initComputed()
        }, t.prototype._initProps = function () {
            var e = this.$options, t = e.el, i = e.props;
            t = e.el = E(t), this._propsUnlinkFn = t && 1 === t.nodeType && i ? Pi(this, t, i, this._scope) : null
        }, t.prototype._initData = function () {
            var t = this._data, n = this.$options.data, r = n && n();
            if (r) {
                this._data = r;
                for (var a in t)null === this._props[a].raw && i(r, a) || e(r, a, t[a])
            }
            var o, s, l = this._data, c = Object.keys(l);
            for (o = c.length; o--;)s = c[o], this._proxy(s);
            _t(l, this)
        }, t.prototype._setData = function (e) {
            e = e || {};
            var t = this._data;
            this._data = e;
            var n, r, a;
            for (n = Object.keys(t), a = n.length; a--;)r = n[a], r in e || this._unproxy(r);
            for (n = Object.keys(e), a = n.length; a--;)r = n[a], i(this, r) || this._proxy(r);
            t.__ob__.removeVm(this), _t(e, this), this._digest()
        }, t.prototype._proxy = function (e) {
            if (!r(e)) {
                var t = this;
                Object.defineProperty(t, e, {
                    configurable: !0, enumerable: !0, get: function () {
                        return t._data[e]
                    }, set: function (i) {
                        t._data[e] = i
                    }
                })
            }
        }, t.prototype._unproxy = function (e) {
            r(e) || delete this[e]
        }, t.prototype._digest = function () {
            for (var e = 0, t = this._watchers.length; t > e; e++)this._watchers[e].update(!0)
        }, t.prototype._initComputed = function () {
            var e = this.$options.computed;
            if (e)for (var t in e) {
                var i = e[t], r = {enumerable: !0, configurable: !0};
                "function" == typeof i ? (r.get = a(i, this), r.set = n) : (r.get = i.get ? i.cache !== !1 ? a(i.get, this) : p(i.get, this) : n, r.set = i.set ? p(i.set, this) : n), Object.defineProperty(this, t, r)
            }
        }, t.prototype._initMethods = function () {
            var e = this.$options.methods;
            if (e)for (var t in e)this[t] = p(e[t], this)
        }, t.prototype._initMeta = function () {
            var e = this.$options._meta;
            if (e)for (var t in e)Tt(this, t, e[t])
        }
    }

    function Xi(e) {
        function t(e, t) {
            for (var i, n, r = t.attributes, a = 0, o = r.length; o > a; a++)i = r[a].name, _o.test(i) && (i = i.replace(_o, ""), n = (e._scope || e._context).$eval(r[a].value, !0), n._fromParent = !0, e.$on(i.replace(_o), n))
        }

        function i(e, t, i) {
            if (i) {
                var r, a, o, s;
                for (a in i)if (r = i[a], _n(r))for (o = 0, s = r.length; s > o; o++)n(e, t, a, r[o]); else n(e, t, a, r)
            }
        }

        function n(e, t, i, r, a) {
            var o = typeof r;
            if ("function" === o) e[t](i, r, a); else if ("string" === o) {
                var s = e.$options.methods, l = s && s[r];
                l && e[t](i, l, a)
            } else r && "object" === o && n(e, t, i, r.handler, r)
        }

        function r() {
            this._isAttached || (this._isAttached = !0, this.$children.forEach(a))
        }

        function a(e) {
            !e._isAttached && R(e.$el) && e._callHook("attached")
        }

        function o() {
            this._isAttached && (this._isAttached = !1, this.$children.forEach(s))
        }

        function s(e) {
            e._isAttached && !R(e.$el) && e._callHook("detached")
        }

        e.prototype._initEvents = function () {
            var e = this.$options;
            e._asComponent && t(this, e.el), i(this, "$on", e.events), i(this, "$watch", e.watch)
        }, e.prototype._initDOMHooks = function () {
            this.$on("hook:attached", r), this.$on("hook:detached", o)
        }, e.prototype._callHook = function (e) {
            this.$emit("pre-hook:" + e);
            var t = this.$options[e];
            if (t)for (var i = 0, n = t.length; n > i; i++)t[i].call(this);
            this.$emit("hook:" + e)
        }
    }

    function en() {
    }

    function tn(e, t, i, n, r, a) {
        this.vm = t, this.el = i, this.descriptor = e, this.name = e.name, this.expression = e.expression, this.arg = e.arg, this.modifiers = e.modifiers, this.filters = e.filters, this.literal = this.modifiers && this.modifiers.literal, this._locked = !1, this._bound = !1, this._listeners = null, this._host = n, this._scope = r, this._frag = a
    }

    function nn(e) {
        e.prototype._updateRef = function (e) {
            var t = this.$options._ref;
            if (t) {
                var i = (this._scope || this._context).$refs;
                e ? i[t] === this && (i[t] = null) : i[t] = this
            }
        }, e.prototype._compile = function (e) {
            var t = this.$options, i = e;
            if (e = Ji(e, t), this._initElement(e), 1 !== e.nodeType || null === O(e, "v-pre")) {
                var n, r = this._context && this._context.$options, a = Li(e, t, r), o = this.constructor;
                t._linkerCachable && (n = o.linker, n || (n = o.linker = Ti(e, t)));
                var s = a(this, e, this._scope), l = n ? n(this, e) : Ti(e, t)(this, e);
                return this._unlinkFn = function () {
                    s(), l(!0)
                }, t.replace && z(i, e), this._isCompiled = !0, this._callHook("compiled"), e
            }
        }, e.prototype._initElement = function (e) {
            e instanceof DocumentFragment ? (this._isFragment = !0, this.$el = this._fragmentStart = e.firstChild, this._fragmentEnd = e.lastChild, 3 === this._fragmentStart.nodeType && (this._fragmentStart.data = this._fragmentEnd.data = ""), this._fragment = e) : this.$el = e, this.$el.__vue__ = this, this._callHook("beforeCompile")
        }, e.prototype._bindDir = function (e, t, i, n, r) {
            this._directives.push(new tn(e, this, t, i, n, r))
        }, e.prototype._destroy = function (e, t) {
            if (this._isBeingDestroyed)return void(t || this._cleanup());
            var i, n, r = this, a = function () {
                !i || n || t || r._cleanup()
            };
            e && this.$el && (n = !0, this.$remove(function () {
                n = !1, a()
            })), this._callHook("beforeDestroy"), this._isBeingDestroyed = !0;
            var o, s = this.$parent;
            for (s && !s._isBeingDestroyed && (s.$children.$remove(this), this._updateRef(!0)), o = this.$children.length; o--;)this.$children[o].$destroy();
            for (this._propsUnlinkFn && this._propsUnlinkFn(), this._unlinkFn && this._unlinkFn(), o = this._watchers.length; o--;)this._watchers[o].teardown();
            this.$el && (this.$el.__vue__ = null), i = !0, a()
        }, e.prototype._cleanup = function () {
            this._isDestroyed || (this._frag && this._frag.children.$remove(this), this._data.__ob__ && this._data.__ob__.removeVm(this), this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null, this._isDestroyed = !0, this._callHook("destroyed"), this.$off())
        }
    }

    function rn(e) {
        e.prototype._applyFilters = function (e, t, i, n) {
            var r, a, o, s, l, c, u, d, h;
            for (c = 0, u = i.length; u > c; c++)if (r = i[c], a = vt(this.$options, "filters", r.name), a && (a = n ? a.write : a.read || a, "function" == typeof a)) {
                if (o = n ? [e, t] : [e], l = n ? 2 : 1, r.args)for (d = 0, h = r.args.length; h > d; d++)s = r.args[d], o[d + l] = s.dynamic ? this.$get(s.value) : s.value;
                e = a.apply(this, o)
            }
            return e
        }, e.prototype._resolveComponent = function (t, i) {
            var n = vt(this.$options, "components", t);
            if (n)if (n.options) i(n); else if (n.resolved) i(n.resolved); else if (n.requested) n.pendingCallbacks.push(i); else {
                n.requested = !0;
                var r = n.pendingCallbacks = [i];
                n(function (t) {
                    v(t) && (t = e.extend(t)), n.resolved = t;
                    for (var i = 0, a = r.length; a > i; i++)r[i](t)
                }, function () {
                })
            }
        }
    }

    function an(i) {
        function n(e) {
            return new Function("return function " + h(e) + " (options) { this._init(options) }")()
        }

        i.util = vr, i.config = or, i.set = e, i["delete"] = t, i.nextTick = Bn, i.compiler = wo, i.FragmentFactory = di, i.internalDirectives = co, i.parsers = {
            path: Br,
            text: nr,
            template: Ua,
            directive: Zn,
            expression: Jr
        }, i.cid = 0;
        var r = 1;
        i.extend = function (e) {
            e = e || {};
            var t = this, i = 0 === t.cid;
            if (i && e._Ctor)return e._Ctor;
            var a = e.name || t.options.name, o = n(a || "VueComponent");
            return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.cid = r++, o.options = gt(t.options, e), o["super"] = t, o.extend = t.extend, or._assetTypes.forEach(function (e) {
                o[e] = t[e]
            }), a && (o.options.components[a] = o), i && (e._Ctor = o), o
        }, i.use = function (e) {
            if (!e.installed) {
                var t = f(arguments, 1);
                return t.unshift(this), "function" == typeof e.install ? e.install.apply(e, t) : e.apply(null, t), e.installed = !0, this
            }
        }, i.mixin = function (e) {
            i.options = gt(i.options, e)
        }, or._assetTypes.forEach(function (e) {
            i[e] = function (t, n) {
                return n ? ("component" === e && v(n) && (n.name = t, n = i.extend(n)), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t]
            }
        })
    }

    function on(e) {
        function i(e) {
            return JSON.parse(JSON.stringify(e))
        }

        e.prototype.$get = function (e, t) {
            var i = Rt(e);
            if (i) {
                if (t && !Ot(e)) {
                    var n = this;
                    return function () {
                        n.$arguments = f(arguments);
                        var e = i.get.call(n, n);
                        return n.$arguments = null, e
                    }
                }
                try {
                    return i.get.call(this, this)
                } catch (r) {
                }
            }
        }, e.prototype.$set = function (e, t) {
            var i = Rt(e, !0);
            i && i.set && i.set.call(this, this, t)
        }, e.prototype.$delete = function (e) {
            t(this._data, e)
        }, e.prototype.$watch = function (e, t, i) {
            var n, r = this;
            "string" == typeof e && (n = x(e), e = n.expression);
            var a = new Vt(r, e, t, {
                deep: i && i.deep,
                sync: i && i.sync,
                filters: n && n.filters,
                user: !i || i.user !== !1
            });
            return i && i.immediate && t.call(r, a.value), function () {
                a.teardown()
            }
        }, e.prototype.$eval = function (e, t) {
            if (To.test(e)) {
                var i = x(e), n = this.$get(i.expression, t);
                return i.filters ? this._applyFilters(n, null, i.filters) : n
            }
            return this.$get(e, t)
        }, e.prototype.$interpolate = function (e) {
            var t = P(e), i = this;
            return t ? 1 === t.length ? i.$eval(t[0].value) + "" : t.map(function (e) {
                return e.tag ? i.$eval(e.value) : e.value
            }).join("") : e
        }, e.prototype.$log = function (e) {
            var t = e ? Lt(this._data, e) : this._data;
            if (t && (t = i(t)), !e)for (var n in this.$options.computed)t[n] = i(this[n]);
            console.log(t)
        }
    }

    function sn(e) {
        function t(e, t, n, r, a, o) {
            t = i(t);
            var s = !R(t), l = r === !1 || s ? a : o, c = !s && !e._isAttached && !R(e.$el);
            return e._isFragment ? (rt(e._fragmentStart, e._fragmentEnd, function (i) {
                l(i, t, e)
            }), n && n()) : l(e.$el, t, e, n), c && e._callHook("attached"), e
        }

        function i(e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }

        function n(e, t, i, n) {
            t.appendChild(e), n && n()
        }

        function r(e, t, i, n) {
            G(e, t), n && n()
        }

        function a(e, t, i) {
            V(e), i && i()
        }

        e.prototype.$nextTick = function (e) {
            Bn(e, this)
        }, e.prototype.$appendTo = function (e, i, r) {
            return t(this, e, i, r, n, A)
        }, e.prototype.$prependTo = function (e, t, n) {
            return e = i(e), e.hasChildNodes() ? this.$before(e.firstChild, t, n) : this.$appendTo(e, t, n), this
        }, e.prototype.$before = function (e, i, n) {
            return t(this, e, i, n, r, B)
        }, e.prototype.$after = function (e, t, n) {
            return e = i(e), e.nextSibling ? this.$before(e.nextSibling, t, n) : this.$appendTo(e.parentNode, t, n), this
        }, e.prototype.$remove = function (e, t) {
            if (!this.$el.parentNode)return e && e();
            var i = this._isAttached && R(this.$el);
            i || (t = !1);
            var n = this, r = function () {
                i && n._callHook("detached"), e && e()
            };
            if (this._isFragment) at(this._fragmentStart, this._fragmentEnd, this, this._fragment, r); else {
                var o = t === !1 ? a : I;
                o(this.$el, this, r)
            }
            return this
        }
    }

    function ln(e) {
        function t(e, t, n) {
            var r = e.$parent;
            if (r && n && !i.test(t))for (; r;)r._eventsCount[t] = (r._eventsCount[t] || 0) + n, r = r.$parent
        }

        e.prototype.$on = function (e, i) {
            return (this._events[e] || (this._events[e] = [])).push(i), t(this, e, 1), this
        }, e.prototype.$once = function (e, t) {
            function i() {
                n.$off(e, i), t.apply(this, arguments)
            }

            var n = this;
            return i.fn = t, this.$on(e, i), this
        }, e.prototype.$off = function (e, i) {
            var n;
            if (!arguments.length) {
                if (this.$parent)for (e in this._events)n = this._events[e], n && t(this, e, -n.length);
                return this._events = {}, this
            }
            if (n = this._events[e], !n)return this;
            if (1 === arguments.length)return t(this, e, -n.length), this._events[e] = null, this;
            for (var r, a = n.length; a--;)if (r = n[a], r === i || r.fn === i) {
                t(this, e, -1), n.splice(a, 1);
                break
            }
            return this
        }, e.prototype.$emit = function (e) {
            var t = "string" == typeof e;
            e = t ? e : e.name;
            var i = this._events[e], n = t || !i;
            if (i) {
                i = i.length > 1 ? f(i) : i;
                var r = t && i.some(function (e) {
                        return e._fromParent
                    });
                r && (n = !1);
                for (var a = f(arguments, 1), o = 0, s = i.length; s > o; o++) {
                    var l = i[o], c = l.apply(this, a);
                    c !== !0 || r && !l._fromParent || (n = !0)
                }
            }
            return n
        }, e.prototype.$broadcast = function (e) {
            var t = "string" == typeof e;
            if (e = t ? e : e.name, this._eventsCount[e]) {
                var i = this.$children, n = f(arguments);
                t && (n[0] = {name: e, source: this});
                for (var r = 0, a = i.length; a > r; r++) {
                    var o = i[r], s = o.$emit.apply(o, n);
                    s && o.$broadcast.apply(o, n)
                }
                return this
            }
        }, e.prototype.$dispatch = function (e) {
            var t = this.$emit.apply(this, arguments);
            if (t) {
                var i = this.$parent, n = f(arguments);
                for (n[0] = {name: e, source: this}; i;)t = i.$emit.apply(i, n), i = t ? i.$parent : null;
                return this
            }
        };
        var i = /^hook:/
    }

    function cn(e) {
        function t() {
            this._isAttached = !0, this._isReady = !0, this._callHook("ready")
        }

        e.prototype.$mount = function (e) {
            return this._isCompiled ? void 0 : (e = E(e), e || (e = document.createElement("div")), this._compile(e), this._initDOMHooks(), R(this.$el) ? (this._callHook("attached"), t.call(this)) : this.$once("hook:attached", t), this)
        }, e.prototype.$destroy = function (e, t) {
            this._destroy(e, t)
        }, e.prototype.$compile = function (e, t, i, n) {
            return Ti(e, this.$options, !0)(this, e, t, i, n)
        }
    }

    function un(e) {
        this._init(e)
    }

    function dn(e, t, i) {
        return i = i ? parseInt(i, 10) : 0, t = o(t), "number" == typeof t ? e.slice(i, i + t) : e
    }

    function hn(e, t, i) {
        if (e = Do(e), null == t)return e;
        if ("function" == typeof t)return e.filter(t);
        t = ("" + t).toLowerCase();
        for (var n, r, a, o, s = "in" === i ? 3 : 2, l = f(arguments, s).reduce(function (e, t) {
            return e.concat(t)
        }, []), c = [], u = 0, d = e.length; d > u; u++)if (n = e[u], a = n && n.$value || n, o = l.length) {
            for (; o--;)if (r = l[o], "$key" === r && fn(n.$key, t) || fn(Lt(a, r), t)) {
                c.push(n);
                break
            }
        } else fn(n, t) && c.push(n);
        return c
    }

    function pn(e, t, i) {
        if (e = Do(e), !t)return e;
        var n = i && 0 > i ? -1 : 1;
        return e.slice().sort(function (e, i) {
            return "$key" !== t && (g(e) && "$value" in e && (e = e.$value), g(i) && "$value" in i && (i = i.$value)), e = g(e) ? Lt(e, t) : e, i = g(i) ? Lt(i, t) : i, e === i ? 0 : e > i ? n : -n
        })
    }

    function fn(e, t) {
        var i;
        if (v(e)) {
            var n = Object.keys(e);
            for (i = n.length; i--;)if (fn(e[n[i]], t))return !0
        } else if (_n(e)) {
            for (i = e.length; i--;)if (fn(e[i], t))return !0
        } else if (null != e)return e.toString().toLowerCase().indexOf(t) > -1
    }

    function mn(e, t, i) {
        function n(e) {
            !tt(e) || e.hasAttribute("v-if") || e.hasAttribute("v-for") || (e = ni(e)), e = ii(e), r.appendChild(e)
        }

        for (var r = document.createDocumentFragment(), a = 0, o = e.length; o > a; a++) {
            var s = e[a];
            i && !s.__v_selected ? n(s) : i || s.parentNode !== t || (s.__v_selected = !0, n(s))
        }
        return r
    }

    var gn = Object.prototype.hasOwnProperty, vn = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/, bn = /-(\w)/g, yn = /([a-z\d])([A-Z])/g, Cn = /(?:^|[-_\/])(\w)/g, Sn = Object.prototype.toString, wn = "[object Object]", _n = Array.isArray, Tn = "__proto__" in {}, Dn = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window), xn = Dn && navigator.userAgent.toLowerCase().indexOf("msie 9.0") > 0, kn = Dn && navigator.userAgent.toLowerCase().indexOf("android") > 0, Mn = void 0, Pn = void 0, Ln = void 0, Fn = void 0;
    if (Dn && !xn) {
        var Nn = void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend, An = void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend;
        Mn = Nn ? "WebkitTransition" : "transition", Pn = Nn ? "webkitTransitionEnd" : "transitionend", Ln = An ? "WebkitAnimation" : "animation", Fn = An ? "webkitAnimationEnd" : "animationend"
    }
    var Bn = function () {
        function e() {
            n = !1;
            var e = i.slice(0);
            i = [];
            for (var t = 0; t < e.length; t++)e[t]()
        }

        var t, i = [], n = !1;
        if ("undefined" != typeof MutationObserver) {
            var r = 1, a = new MutationObserver(e), o = document.createTextNode(r);
            a.observe(o, {characterData: !0}), t = function () {
                r = (r + 1) % 2, o.data = r
            }
        } else t = setTimeout;
        return function (r, a) {
            var o = a ? function () {
                r.call(a)
            } : r;
            i.push(o), n || (n = !0, t(e, 0))
        }
    }(), In = _.prototype;
    In.put = function (e, t) {
        var i;
        this.size === this.limit && (i = this.shift());
        var n = this.get(e, !0);
        return n || (n = {key: e}, this._keymap[e] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, this.tail = n, this.size++), n.value = t, i
    }, In.shift = function () {
        var e = this.head;
        return e && (this.head = this.head.newer, this.head.older = void 0, e.newer = e.older = void 0, this._keymap[e.key] = void 0, this.size--), e
    }, In.get = function (e, t) {
        var i = this._keymap[e];
        return void 0 !== i ? i === this.tail ? t ? i : i.value : (i.newer && (i === this.head && (this.head = i.newer), i.newer.older = i.older), i.older && (i.older.newer = i.newer), i.newer = void 0, i.older = this.tail, this.tail && (this.tail.newer = i), this.tail = i, t ? i : i.value) : void 0
    };
    var $n, En, Rn, On, Hn, jn, Gn, Un, Vn, qn, zn, Wn, Jn = new _(1e3), Qn = /[^\s'"]+|'[^']*'|"[^"]*"/g, Kn = /^in$|^-?\d+/, Zn = Object.freeze({parseDirective: x}), Yn = /[-.*+?^${}()|[\]\/\\]/g, Xn = void 0, er = void 0, tr = void 0, ir = /[^|]\|[^|]/, nr = Object.freeze({
        compileRegex: M,
        parseText: P,
        tokensToExp: L
    }), rr = ["{{", "}}"], ar = ["{{{", "}}}"], or = Object.defineProperties({
        debug: !1,
        silent: !1,
        async: !0,
        warnExpressionErrors: !0,
        convertAllProperties: !1,
        _delimitersChanged: !0,
        _assetTypes: ["component", "directive", "elementDirective", "filter", "transition", "partial"],
        _propBindingModes: {ONE_WAY: 0, TWO_WAY: 1, ONE_TIME: 2},
        _maxUpdateCount: 100
    }, {
        delimiters: {
            get: function () {
                return rr
            }, set: function (e) {
                rr = e, M()
            }, configurable: !0, enumerable: !0
        }, unsafeDelimiters: {
            get: function () {
                return ar
            }, set: function (e) {
                ar = e, M()
            }, configurable: !0, enumerable: !0
        }
    }), sr = void 0, lr = /^v-ref:/, cr = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/, ur = /^(slot|partial|component)$/, dr = or.optionMergeStrategies = Object.create(null);
    dr.data = function (e, t, i) {
        return i ? e || t ? function () {
            var n = "function" == typeof t ? t.call(i) : t, r = "function" == typeof e ? e.call(i) : void 0;
            return n ? dt(n, r) : r
        } : void 0 : t ? "function" != typeof t ? e : e ? function () {
            return dt(t.call(this), e.call(this))
        } : t : e
    }, dr.el = function (e, t, i) {
        if (i || !t || "function" == typeof t) {
            var n = t || e;
            return i && "function" == typeof n ? n.call(i) : n
        }
    }, dr.init = dr.created = dr.ready = dr.attached = dr.detached = dr.beforeCompile = dr.compiled = dr.beforeDestroy = dr.destroyed = function (e, t) {
        return t ? e ? e.concat(t) : _n(t) ? t : [t] : e
    }, dr.paramAttributes = function () {
    }, or._assetTypes.forEach(function (e) {
        dr[e + "s"] = ht
    }), dr.watch = dr.events = function (e, t) {
        if (!t)return e;
        if (!e)return t;
        var i = {};
        m(i, e);
        for (var n in t) {
            var r = i[n], a = t[n];
            r && !_n(r) && (r = [r]), i[n] = r ? r.concat(a) : [a]
        }
        return i
    }, dr.props = dr.methods = dr.computed = function (e, t) {
        if (!t)return e;
        if (!e)return t;
        var i = Object.create(null);
        return m(i, e), m(i, t), i
    };
    var hr = function (e, t) {
        return void 0 === t ? e : t
    }, pr = Array.prototype, fr = Object.create(pr);
    ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
        var t = pr[e];
        b(fr, e, function () {
            for (var i = arguments.length, n = new Array(i); i--;)n[i] = arguments[i];
            var r, a = t.apply(this, n), o = this.__ob__;
            switch (e) {
                case"push":
                    r = n;
                    break;
                case"unshift":
                    r = n;
                    break;
                case"splice":
                    r = n.slice(2)
            }
            return r && o.observeArray(r), o.dep.notify(), a
        })
    }), b(pr, "$set", function (e, t) {
        return e >= this.length && (this.length = Number(e) + 1), this.splice(e, 1, t)[0]
    }), b(pr, "$remove", function (e) {
        if (this.length) {
            var t = C(this, e);
            return t > -1 ? this.splice(t, 1) : void 0
        }
    });
    var mr = 0;
    yt.target = null, yt.prototype.addSub = function (e) {
        this.subs.push(e)
    }, yt.prototype.removeSub = function (e) {
        this.subs.$remove(e)
    }, yt.prototype.depend = function () {
        yt.target.addDep(this)
    }, yt.prototype.notify = function () {
        for (var e = f(this.subs), t = 0, i = e.length; i > t; t++)e[t].update()
    };
    var gr = Object.getOwnPropertyNames(fr);
    Ct.prototype.walk = function (e) {
        for (var t = Object.keys(e), i = 0, n = t.length; n > i; i++)this.convert(t[i], e[t[i]])
    }, Ct.prototype.observeArray = function (e) {
        for (var t = 0, i = e.length; i > t; t++)_t(e[t])
    }, Ct.prototype.convert = function (e, t) {
        Tt(this.value, e, t)
    }, Ct.prototype.addVm = function (e) {
        (this.vms || (this.vms = [])).push(e)
    }, Ct.prototype.removeVm = function (e) {
        this.vms.$remove(e)
    };
    var vr = Object.freeze({
        defineReactive: Tt,
        set: e,
        del: t,
        hasOwn: i,
        isLiteral: n,
        isReserved: r,
        _toString: a,
        toNumber: o,
        toBoolean: s,
        stripQuotes: l,
        camelize: c,
        hyphenate: d,
        classify: h,
        bind: p,
        toArray: f,
        extend: m,
        isObject: g,
        isPlainObject: v,
        def: b,
        debounce: y,
        indexOf: C,
        cancellable: S,
        looseEqual: w,
        isArray: _n,
        hasProto: Tn,
        inBrowser: Dn,
        isIE9: xn,
        isAndroid: kn,
        get transitionProp() {
            return Mn
        },
        get transitionEndEvent() {
            return Pn
        },
        get animationProp() {
            return Ln
        },
        get animationEndEvent() {
            return Fn
        },
        nextTick: Bn,
        query: E,
        inDoc: R,
        getAttr: O,
        getBindAttr: H,
        hasBindAttr: j,
        before: G,
        after: U,
        remove: V,
        prepend: q,
        replace: z,
        on: W,
        off: J,
        setClass: Q,
        addClass: K,
        removeClass: Z,
        extractContent: Y,
        trimNode: X,
        isTemplate: tt,
        createAnchor: it,
        findRef: nt,
        mapNodeRange: rt,
        removeNodeRange: at,
        mergeOptions: gt,
        resolveAsset: vt,
        assertAsset: bt,
        checkComponentAttr: ot,
        initProp: lt,
        assertProp: ct,
        coerceProp: ut,
        commonTagRE: cr,
        reservedTagRE: ur,
        warn: sr
    }), br = 0, yr = new _(1e3), Cr = 0, Sr = 1, wr = 2, _r = 3, Tr = 0, Dr = 1, xr = 2, kr = 3, Mr = 4, Pr = 5, Lr = 6, Fr = 7, Nr = 8, Ar = [];
    Ar[Tr] = {ws: [Tr], ident: [kr, Cr], "[": [Mr], eof: [Fr]}, Ar[Dr] = {
        ws: [Dr],
        ".": [xr],
        "[": [Mr],
        eof: [Fr]
    }, Ar[xr] = {ws: [xr], ident: [kr, Cr]}, Ar[kr] = {
        ident: [kr, Cr],
        0: [kr, Cr],
        number: [kr, Cr],
        ws: [Dr, Sr],
        ".": [xr, Sr],
        "[": [Mr, Sr],
        eof: [Fr, Sr]
    }, Ar[Mr] = {
        "'": [Pr, Cr],
        '"': [Lr, Cr],
        "[": [Mr, wr],
        "]": [Dr, _r],
        eof: Nr,
        "else": [Mr, Cr]
    }, Ar[Pr] = {"'": [Mr, Cr], eof: Nr, "else": [Pr, Cr]}, Ar[Lr] = {'"': [Mr, Cr], eof: Nr, "else": [Lr, Cr]};
    var Br = Object.freeze({
        parsePath: Pt,
        getPath: Lt,
        setPath: Ft
    }), Ir = new _(1e3), $r = "Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat", Er = new RegExp("^(" + $r.replace(/,/g, "\\b|") + "\\b)"), Rr = "break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,proctected,static,interface,private,public", Or = new RegExp("^(" + Rr.replace(/,/g, "\\b|") + "\\b)"), Hr = /\s/g, jr = /\n/g, Gr = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g, Ur = /"(\d+)"/g, Vr = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/, qr = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g, zr = /^(?:true|false)$/, Wr = [], Jr = Object.freeze({
        parseExpression: Rt,
        isSimplePath: Ot
    }), Qr = [], Kr = [], Zr = {}, Yr = {}, Xr = !1, ea = !1, ta = 0;
    Vt.prototype.addDep = function (e) {
        var t = e.id;
        this.newDeps[t] || (this.newDeps[t] = e, this.deps[t] || (this.deps[t] = e, e.addSub(this)))
    }, Vt.prototype.get = function () {
        this.beforeGet();
        var e, t = this.scope || this.vm;
        try {
            e = this.getter.call(t, t)
        } catch (i) {
        }
        return this.deep && qt(e), this.preProcess && (e = this.preProcess(e)), this.filters && (e = t._applyFilters(e, null, this.filters, !1)), this.postProcess && (e = this.postProcess(e)), this.afterGet(), e
    }, Vt.prototype.set = function (e) {
        var t = this.scope || this.vm;
        this.filters && (e = t._applyFilters(e, this.value, this.filters, !0));
        try {
            this.setter.call(t, t, e)
        } catch (i) {
        }
        var n = t.$forContext;
        if (n && n.alias === this.expression) {
            if (n.filters)return;
            n._withLock(function () {
                t.$key ? n.rawValue[t.$key] = e : n.rawValue.$set(t.$index, e)
            })
        }
    }, Vt.prototype.beforeGet = function () {
        yt.target = this, this.newDeps = Object.create(null)
    }, Vt.prototype.afterGet = function () {
        yt.target = null;
        for (var e = Object.keys(this.deps), t = e.length; t--;) {
            var i = e[t];
            this.newDeps[i] || this.deps[i].removeSub(this)
        }
        this.deps = this.newDeps
    }, Vt.prototype.update = function (e) {
        this.lazy ? this.dirty = !0 : this.sync || !or.async ? this.run() : (this.shallow = this.queued ? e ? this.shallow : !1 : !!e, this.queued = !0, Ut(this))
    }, Vt.prototype.run = function () {
        if (this.active) {
            var e = this.get();
            if (e !== this.value || (g(e) || this.deep) && !this.shallow) {
                var t = this.value;
                this.value = e, this.prevError, this.cb.call(this.vm, e, t)
            }
            this.queued = this.shallow = !1
        }
    }, Vt.prototype.evaluate = function () {
        var e = yt.target;
        this.value = this.get(), this.dirty = !1, yt.target = e
    }, Vt.prototype.depend = function () {
        for (var e = Object.keys(this.deps), t = e.length; t--;)this.deps[e[t]].depend()
    }, Vt.prototype.teardown = function () {
        if (this.active) {
            this.vm._isBeingDestroyed || this.vm._watchers.$remove(this);
            for (var e = Object.keys(this.deps), t = e.length; t--;)this.deps[e[t]].removeSub(this);
            this.active = !1, this.vm = this.cb = this.value = null
        }
    };
    var ia = {
        bind: function () {
            var e = this.el;
            this.vm.$once("pre-hook:compiled", function () {
                e.removeAttribute("v-cloak")
            })
        }
    }, na = {
        bind: function () {
        }
    }, ra = 700, aa = 800, oa = 850, sa = 1100, la = 1500, ca = 1500, ua = 1750, da = 2e3, ha = 2e3, pa = 2100, fa = {
        priority: la,
        bind: function () {
            if (this.arg) {
                var e = this.id = c(this.arg), t = (this._scope || this.vm).$els;
                i(t, e) ? t[e] = this.el : Tt(t, e, this.el)
            }
        },
        unbind: function () {
            var e = (this._scope || this.vm).$els;
            e[this.id] === this.el && (e[this.id] = null)
        }
    }, ma = ["-webkit-", "-moz-", "-ms-"], ga = ["Webkit", "Moz", "ms"], va = /!important;?$/, ba = Object.create(null), ya = null, Ca = {
        deep: !0,
        update: function (e) {
            "string" == typeof e ? this.el.style.cssText = e : this.handleObject(_n(e) ? e.reduce(m, {}) : e || {})
        },
        handleObject: function (e) {
            var t, i, n = this.cache || (this.cache = {});
            for (t in n)t in e || (this.handleSingle(t, null), delete n[t]);
            for (t in e)i = e[t], i !== n[t] && (n[t] = i, this.handleSingle(t, i))
        },
        handleSingle: function (e, t) {
            if (e = zt(e))if (null != t && (t += ""), t) {
                var i = va.test(t) ? "important" : "";
                i && (t = t.replace(va, "").trim()), this.el.style.setProperty(e, t, i)
            } else this.el.style.removeProperty(e)
        }
    }, Sa = "http://www.w3.org/1999/xlink", wa = /^xlink:/, _a = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/, Ta = /^(?:value|checked|selected|muted)$/, Da = {
        value: "_value",
        "true-value": "_trueValue",
        "false-value": "_falseValue"
    }, xa = {
        priority: oa, bind: function () {
            var e = this.arg, t = this.el.tagName;
            e || (this.deep = !0);
            var i = this.descriptor, n = i.interp;
            n && (i.hasOneTime && (this.expression = L(n, this._scope || this.vm)), (_a.test(e) || "name" === e && ("PARTIAL" === t || "SLOT" === t)) && (this.el.removeAttribute(e), this.invalid = !0))
        }, update: function (e) {
            if (!this.invalid) {
                var t = this.arg;
                this.arg ? this.handleSingle(t, e) : this.handleObject(e || {})
            }
        }, handleObject: Ca.handleObject, handleSingle: function (e, t) {
            var i = this.el, n = this.descriptor.interp;
            !n && Ta.test(e) && e in i && (i[e] = "value" === e && null == t ? "" : t);
            var r = Da[e];
            if (!n && r) {
                i[r] = t;
                var a = i.__v_model;
                a && a.listener()
            }
            return "value" === e && "TEXTAREA" === i.tagName ? void i.removeAttribute(e) : void(null != t && t !== !1 ? "class" === e ? (i.__v_trans && (t += " " + i.__v_trans.id + "-transition"), Q(i, t)) : wa.test(e) ? i.setAttributeNS(Sa, e, t) : i.setAttribute(e, t) : i.removeAttribute(e))
        }
    }, ka = {
        esc: 27,
        tab: 9,
        enter: 13,
        space: 32,
        "delete": 46,
        up: 38,
        left: 37,
        right: 39,
        down: 40
    }, Ma = {
        acceptStatement: !0, priority: ra, bind: function () {
            if ("IFRAME" === this.el.tagName && "load" !== this.arg) {
                var e = this;
                this.iframeBind = function () {
                    W(e.el.contentWindow, e.arg, e.handler)
                }, this.on("load", this.iframeBind)
            }
        }, update: function (e) {
            if (this.descriptor.raw || (e = function () {
                }), "function" == typeof e) {
                this.modifiers.stop && (e = Qt(e)), this.modifiers.prevent && (e = Kt(e));
                var t = Object.keys(this.modifiers).filter(function (e) {
                    return "stop" !== e && "prevent" !== e
                });
                t.length && (e = Jt(e, t)), this.reset(), this.handler = e, this.iframeBind ? this.iframeBind() : W(this.el, this.arg, this.handler)
            }
        }, reset: function () {
            var e = this.iframeBind ? this.el.contentWindow : this.el;
            this.handler && J(e, this.arg, this.handler)
        }, unbind: function () {
            this.reset()
        }
    }, Pa = {
        bind: function () {
            function e() {
                var e = i.checked;
                return e && i.hasOwnProperty("_trueValue") ? i._trueValue : !e && i.hasOwnProperty("_falseValue") ? i._falseValue : e
            }

            var t = this, i = this.el;
            this.getValue = function () {
                return i.hasOwnProperty("_value") ? i._value : t.params.number ? o(i.value) : i.value
            }, this.listener = function () {
                var n = t._watcher.value;
                if (_n(n)) {
                    var r = t.getValue();
                    i.checked ? C(n, r) < 0 && n.push(r) : n.$remove(r)
                } else t.set(e())
            }, this.on("change", this.listener), i.hasAttribute("checked") && (this.afterBind = this.listener)
        }, update: function (e) {
            var t = this.el;
            t.checked = _n(e) ? C(e, this.getValue()) > -1 : t.hasOwnProperty("_trueValue") ? w(e, t._trueValue) : !!e
        }
    }, La = {
        bind: function () {
            var e = this, t = this.el;
            this.forceUpdate = function () {
                e._watcher && e.update(e._watcher.get())
            };
            var i = this.multiple = t.hasAttribute("multiple");
            this.listener = function () {
                var n = Zt(t, i);
                n = e.params.number ? _n(n) ? n.map(o) : o(n) : n, e.set(n)
            }, this.on("change", this.listener);
            var n = Zt(t, i, !0);
            (i && n.length || !i && null !== n) && (this.afterBind = this.listener), this.vm.$on("hook:attached", this.forceUpdate)
        }, update: function (e) {
            var t = this.el;
            t.selectedIndex = -1;
            for (var i, n, r = this.multiple && _n(e), a = t.options, o = a.length; o--;)i = a[o], n = i.hasOwnProperty("_value") ? i._value : i.value, i.selected = r ? Yt(e, n) > -1 : w(e, n)
        }, unbind: function () {
            this.vm.$off("hook:attached", this.forceUpdate)
        }
    }, Fa = {
        bind: function () {
            var e = this, t = this.el;
            this.getValue = function () {
                if (t.hasOwnProperty("_value"))return t._value;
                var i = t.value;
                return e.params.number && (i = o(i)), i
            }, this.listener = function () {
                e.set(e.getValue())
            }, this.on("change", this.listener), t.hasAttribute("checked") && (this.afterBind = this.listener)
        }, update: function (e) {
            this.el.checked = w(e, this.getValue())
        }
    }, Na = {
        bind: function () {
            var e = this, t = this.el, i = "range" === t.type, n = this.params.lazy, r = this.params.number, a = this.params.debounce, s = !1;
            kn || i || (this.on("compositionstart", function () {
                s = !0
            }), this.on("compositionend", function () {
                s = !1, n || e.listener()
            })), this.focused = !1, i || n || (this.on("focus", function () {
                e.focused = !0
            }), this.on("blur", function () {
                e.focused = !1, (!e._frag || e._frag.inserted) && e.rawListener()
            })), this.listener = this.rawListener = function () {
                if (!s && e._bound) {
                    var n = r || i ? o(t.value) : t.value;
                    e.set(n), Bn(function () {
                        e._bound && !e.focused && e.update(e._watcher.value)
                    })
                }
            }, a && (this.listener = y(this.listener, a)), this.hasjQuery = "function" == typeof jQuery, this.hasjQuery ? (jQuery(t).on("change", this.listener), n || jQuery(t).on("input", this.listener)) : (this.on("change", this.listener), n || this.on("input", this.listener)), !n && xn && (this.on("cut", function () {
                Bn(e.listener)
            }), this.on("keyup", function (t) {
                (46 === t.keyCode || 8 === t.keyCode) && e.listener()
            })), (t.hasAttribute("value") || "TEXTAREA" === t.tagName && t.value.trim()) && (this.afterBind = this.listener)
        }, update: function (e) {
            this.el.value = a(e)
        }, unbind: function () {
            var e = this.el;
            this.hasjQuery && (jQuery(e).off("change", this.listener), jQuery(e).off("input", this.listener))
        }
    }, Aa = {text: Na, radio: Fa, select: La, checkbox: Pa}, Ba = {
        priority: aa,
        twoWay: !0,
        handlers: Aa,
        params: ["lazy", "number", "debounce"],
        bind: function () {
            this.checkFilters(), this.hasRead && !this.hasWrite;
            var e, t = this.el, i = t.tagName;
            if ("INPUT" === i) e = Aa[t.type] || Aa.text; else if ("SELECT" === i) e = Aa.select; else {
                if ("TEXTAREA" !== i)return;
                e = Aa.text
            }
            t.__v_model = this, e.bind.call(this), this.update = e.update, this._unbind = e.unbind
        },
        checkFilters: function () {
            var e = this.filters;
            if (e)for (var t = e.length; t--;) {
                var i = vt(this.vm.$options, "filters", e[t].name);
                ("function" == typeof i || i.read) && (this.hasRead = !0), i.write && (this.hasWrite = !0)
            }
        },
        unbind: function () {
            this.el.__v_model = null, this._unbind && this._unbind()
        }
    }, Ia = {
        bind: function () {
            var e = this.el.nextElementSibling;
            e && null !== O(e, "v-else") && (this.elseEl = e)
        }, update: function (e) {
            this.apply(this.el, e), this.elseEl && this.apply(this.elseEl, !e)
        }, apply: function (e, t) {
            function i() {
                e.style.display = t ? "" : "none"
            }

            R(e) ? $(e, t ? 1 : -1, i, this.vm) : i()
        }
    }, $a = new _(1e3), Ea = new _(1e3), Ra = {
        efault: [0, "", ""],
        legend: [1, "<fieldset>", "</fieldset>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"]
    };
    Ra.td = Ra.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], Ra.option = Ra.optgroup = [1, '<select multiple="multiple">', "</select>"], Ra.thead = Ra.tbody = Ra.colgroup = Ra.caption = Ra.tfoot = [1, "<table>", "</table>"], Ra.g = Ra.defs = Ra.symbol = Ra.use = Ra.image = Ra.text = Ra.circle = Ra.ellipse = Ra.line = Ra.path = Ra.polygon = Ra.polyline = Ra.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">', "</svg>"];
    var Oa = /<([\w:]+)/, Ha = /&#?\w+?;/, ja = function () {
        if (Dn) {
            var e = document.createElement("div");
            return e.innerHTML = "<template>1</template>", !e.cloneNode(!0).firstChild.innerHTML
        }
        return !1
    }(), Ga = function () {
        if (Dn) {
            var e = document.createElement("textarea");
            return e.placeholder = "t", "t" === e.cloneNode(!0).value
        }
        return !1
    }(), Ua = Object.freeze({cloneNode: ii, parseTemplate: ni});
    ri.prototype.callHook = function (e) {
        var t, i;
        for (t = 0, i = this.childFrags.length; i > t; t++)this.childFrags[t].callHook(e);
        for (t = 0, i = this.children.length; i > t; t++)e(this.children[t])
    }, ri.prototype.beforeRemove = function () {
        var e, t;
        for (e = 0, t = this.childFrags.length; t > e; e++)this.childFrags[e].beforeRemove(!1);
        for (e = 0, t = this.children.length; t > e; e++)this.children[e].$destroy(!1, !0);
        var i = this.unlink.dirs;
        for (e = 0, t = i.length; t > e; e++)i[e]._watcher && i[e]._watcher.teardown()
    }, ri.prototype.destroy = function () {
        this.parentFrag && this.parentFrag.childFrags.$remove(this), this.node.__vfrag__ = null, this.unlink()
    };
    var Va = new _(5e3);
    di.prototype.create = function (e, t, i) {
        var n = ii(this.template);
        return new ri(this.linker, this.vm, n, e, t, i)
    };
    var qa = {
        priority: ha, bind: function () {
            var e = this.el;
            if (e.__vue__) this.invalid = !0; else {
                var t = e.nextElementSibling;
                t && null !== O(t, "v-else") && (V(t), this.elseFactory = new di(this.vm, t)), this.anchor = it("v-if"), z(e, this.anchor), this.factory = new di(this.vm, e)
            }
        }, update: function (e) {
            this.invalid || (e ? this.frag || this.insert() : this.remove())
        }, insert: function () {
            this.elseFrag && (this.elseFrag.remove(), this.elseFrag = null), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor)
        }, remove: function () {
            this.frag && (this.frag.remove(), this.frag = null), this.elseFactory && !this.elseFrag && (this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag), this.elseFrag.before(this.anchor))
        }, unbind: function () {
            this.frag && this.frag.destroy()
        }
    }, za = 0, Wa = {
        priority: da,
        params: ["track-by", "stagger", "enter-stagger", "leave-stagger"],
        bind: function () {
            var e = this.expression.match(/(.*) in (.*)/);
            if (e) {
                var t = e[1].match(/\((.*),(.*)\)/);
                t ? (this.iterator = t[1].trim(), this.alias = t[2].trim()) : this.alias = e[1].trim(), this.expression = e[2]
            }
            if (this.alias) {
                this.id = "__v-for__" + ++za;
                var i = this.el.tagName;
                this.isOption = ("OPTION" === i || "OPTGROUP" === i) && "SELECT" === this.el.parentNode.tagName, this.start = it("v-for-start"), this.end = it("v-for-end"), z(this.el, this.end), G(this.start, this.end), this.cache = Object.create(null), this.factory = new di(this.vm, this.el)
            }
        },
        update: function (e) {
            this.diff(e), this.updateRef(), this.updateModel()
        },
        diff: function (e) {
            var t, n, r, a, o, s, l = e[0], c = this.fromObject = g(l) && i(l, "$key") && i(l, "$value"), u = this.params.trackBy, d = this.frags, h = this.frags = new Array(e.length), p = this.alias, f = this.iterator, m = this.start, v = this.end, b = R(m), y = !d;
            for (t = 0, n = e.length; n > t; t++)l = e[t], a = c ? l.$key : null, o = c ? l.$value : l, s = !g(o), r = !y && this.getCachedFrag(o, t, a), r ? (r.reused = !0, r.scope.$index = t, a && (r.scope.$key = a), f && (r.scope[f] = null !== a ? a : t), (u || c || s) && (r.scope[p] = o)) : (r = this.create(o, p, t, a), r.fresh = !y), h[t] = r, y && r.before(v);
            if (!y) {
                var C = 0, S = d.length - h.length;
                for (t = 0, n = d.length; n > t; t++)r = d[t], r.reused || (this.deleteCachedFrag(r), this.remove(r, C++, S, b));
                var w, _, T, D = 0;
                for (t = 0, n = h.length; n > t; t++)r = h[t], w = h[t - 1], _ = w ? w.staggerCb ? w.staggerAnchor : w.end || w.node : m, r.reused && !r.staggerCb ? (T = hi(r, m, this.id), T === w || T && hi(T, m, this.id) === w || this.move(r, _)) : this.insert(r, D++, _, b), r.reused = r.fresh = !1
            }
        },
        create: function (e, t, i, n) {
            var r = this._host, a = this._scope || this.vm, o = Object.create(a);
            o.$refs = Object.create(a.$refs), o.$els = Object.create(a.$els), o.$parent = a, o.$forContext = this, Tt(o, t, e), Tt(o, "$index", i), n ? Tt(o, "$key", n) : o.$key && b(o, "$key", null), this.iterator && Tt(o, this.iterator, null !== n ? n : i);
            var s = this.factory.create(r, o, this._frag);
            return s.forId = this.id, this.cacheFrag(e, s, i, n), s
        },
        updateRef: function () {
            var e = this.descriptor.ref;
            if (e) {
                var t, i = (this._scope || this.vm).$refs;
                this.fromObject ? (t = {}, this.frags.forEach(function (e) {
                    t[e.scope.$key] = pi(e)
                })) : t = this.frags.map(pi), i[e] = t
            }
        },
        updateModel: function () {
            if (this.isOption) {
                var e = this.start.parentNode, t = e && e.__v_model;
                t && t.forceUpdate()
            }
        },
        insert: function (e, t, i, n) {
            e.staggerCb && (e.staggerCb.cancel(), e.staggerCb = null);
            var r = this.getStagger(e, t, null, "enter");
            if (n && r) {
                var a = e.staggerAnchor;
                a || (a = e.staggerAnchor = it("stagger-anchor"), a.__vfrag__ = e), U(a, i);
                var o = e.staggerCb = S(function () {
                    e.staggerCb = null, e.before(a), V(a)
                });
                setTimeout(o, r)
            } else e.before(i.nextSibling)
        },
        remove: function (e, t, i, n) {
            if (e.staggerCb)return e.staggerCb.cancel(), void(e.staggerCb = null);
            var r = this.getStagger(e, t, i, "leave");
            if (n && r) {
                var a = e.staggerCb = S(function () {
                    e.staggerCb = null, e.remove()
                });
                setTimeout(a, r)
            } else e.remove()
        },
        move: function (e, t) {
            t.nextSibling || this.end.parentNode.appendChild(this.end), e.before(t.nextSibling, !1)
        },
        cacheFrag: function (e, t, n, r) {
            var a, o = this.params.trackBy, s = this.cache, l = !g(e);
            r || o || l ? (a = o ? "$index" === o ? n : e[o] : r || e, s[a] || (s[a] = t)) : (a = this.id, i(e, a) ? null === e[a] && (e[a] = t) : b(e, a, t)), t.raw = e
        },
        getCachedFrag: function (e, t, i) {
            var n, r = this.params.trackBy, a = !g(e);
            if (i || r || a) {
                var o = r ? "$index" === r ? t : e[r] : i || e;
                n = this.cache[o]
            } else n = e[this.id];
            return n && (n.reused || n.fresh), n
        },
        deleteCachedFrag: function (e) {
            var t = e.raw, n = this.params.trackBy, r = e.scope, a = r.$index, o = i(r, "$key") && r.$key, s = !g(t);
            if (n || o || s) {
                var l = n ? "$index" === n ? a : t[n] : o || t;
                this.cache[l] = null
            } else t[this.id] = null, e.raw = null
        },
        getStagger: function (e, t, i, n) {
            n += "Stagger";
            var r = e.node.__v_trans, a = r && r.hooks, o = a && (a[n] || a.stagger);
            return o ? o.call(e, t, i) : t * parseInt(this.params[n] || this.params.stagger, 10)
        },
        _preProcess: function (e) {
            return this.rawValue = e, e
        },
        _postProcess: function (e) {
            if (_n(e))return e;
            if (v(e)) {
                for (var t, i = Object.keys(e), n = i.length, r = new Array(n); n--;)t = i[n], r[n] = {
                    $key: t,
                    $value: e[t]
                };
                return r
            }
            return "number" == typeof e && (e = fi(e)), e || []
        },
        unbind: function () {
            if (this.descriptor.ref && ((this._scope || this.vm).$refs[this.descriptor.ref] = null), this.frags)for (var e, t = this.frags.length; t--;)e = this.frags[t], this.deleteCachedFrag(e), e.destroy()
        }
    }, Ja = {
        bind: function () {
            8 === this.el.nodeType && (this.nodes = [], this.anchor = it("v-html"), z(this.el, this.anchor))
        }, update: function (e) {
            e = a(e), this.nodes ? this.swap(e) : this.el.innerHTML = e
        }, swap: function (e) {
            for (var t = this.nodes.length; t--;)V(this.nodes[t]);
            var i = ni(e, !0, !0);
            this.nodes = f(i.childNodes), G(i, this.anchor)
        }
    }, Qa = {
        bind: function () {
            this.attr = 3 === this.el.nodeType ? "data" : "textContent"
        }, update: function (e) {
            this.el[this.attr] = a(e)
        }
    }, Ka = {
        text: Qa,
        html: Ja,
        "for": Wa,
        "if": qa,
        show: Ia,
        model: Ba,
        on: Ma,
        bind: xa,
        el: fa,
        ref: na,
        cloak: ia
    }, Za = [], Ya = !1, Xa = "transition", eo = "animation", to = Mn + "Duration", io = Ln + "Duration", no = vi.prototype;
    no.enter = function (e, t) {
        this.cancelPending(), this.callHook("beforeEnter"), this.cb = t, K(this.el, this.enterClass), e(), this.entered = !1, this.callHookWithCb("enter"), this.entered || (this.cancel = this.hooks && this.hooks.enterCancelled, mi(this.enterNextTick))
    }, no.enterNextTick = function () {
        this.justEntered = !0;
        var e = this;
        setTimeout(function () {
            e.justEntered = !1
        }, 17);
        var t = this.enterDone, i = this.getCssTransitionType(this.enterClass);
        this.pendingJsCb ? i === Xa && Z(this.el, this.enterClass) : i === Xa ? (Z(this.el, this.enterClass), this.setupCssCb(Pn, t)) : i === eo ? this.setupCssCb(Fn, t) : t()
    }, no.enterDone = function () {
        this.entered = !0, this.cancel = this.pendingJsCb = null, Z(this.el, this.enterClass), this.callHook("afterEnter"), this.cb && this.cb()
    }, no.leave = function (e, t) {
        this.cancelPending(), this.callHook("beforeLeave"), this.op = e, this.cb = t, K(this.el, this.leaveClass), this.left = !1, this.callHookWithCb("leave"), this.left || (this.cancel = this.hooks && this.hooks.leaveCancelled, this.op && !this.pendingJsCb && (this.justEntered ? this.leaveDone() : mi(this.leaveNextTick)))
    }, no.leaveNextTick = function () {
        var e = this.getCssTransitionType(this.leaveClass);
        if (e) {
            var t = e === Xa ? Pn : Fn;
            this.setupCssCb(t, this.leaveDone)
        } else this.leaveDone()
    }, no.leaveDone = function () {
        this.left = !0, this.cancel = this.pendingJsCb = null, this.op(), Z(this.el, this.leaveClass), this.callHook("afterLeave"), this.cb && this.cb(), this.op = null
    }, no.cancelPending = function () {
        this.op = this.cb = null;
        var e = !1;
        this.pendingCssCb && (e = !0, J(this.el, this.pendingCssEvent, this.pendingCssCb), this.pendingCssEvent = this.pendingCssCb = null), this.pendingJsCb && (e = !0, this.pendingJsCb.cancel(), this.pendingJsCb = null), e && (Z(this.el, this.enterClass), Z(this.el, this.leaveClass)), this.cancel && (this.cancel.call(this.vm, this.el), this.cancel = null)
    }, no.callHook = function (e) {
        this.hooks && this.hooks[e] && this.hooks[e].call(this.vm, this.el)
    }, no.callHookWithCb = function (e) {
        var t = this.hooks && this.hooks[e];
        t && (t.length > 1 && (this.pendingJsCb = S(this[e + "Done"])), t.call(this.vm, this.el, this.pendingJsCb))
    }, no.getCssTransitionType = function (e) {
        if (!(!Pn || document.hidden || this.hooks && this.hooks.css === !1 || bi(this.el))) {
            var t = this.type || this.typeCache[e];
            if (t)return t;
            var i = this.el.style, n = window.getComputedStyle(this.el), r = i[to] || n[to];
            if (r && "0s" !== r) t = Xa; else {
                var a = i[io] || n[io];
                a && "0s" !== a && (t = eo)
            }
            return t && (this.typeCache[e] = t), t
        }
    }, no.setupCssCb = function (e, t) {
        this.pendingCssEvent = e;
        var i = this, n = this.el, r = this.pendingCssCb = function (a) {
            a.target === n && (J(n, e, r), i.pendingCssEvent = i.pendingCssCb = null, !i.pendingJsCb && t && t())
        };
        W(n, e, r)
    };
    var ro = {
        priority: sa, update: function (e, t) {
            var i = this.el, n = vt(this.vm.$options, "transitions", e);
            e = e || "v", i.__v_trans = new vi(i, e, n, this.el.__vue__ || this.vm), t && Z(i, t + "-transition"), K(i, e + "-transition")
        }
    }, ao = or._propBindingModes, oo = {
        bind: function () {
            var e = this.vm, t = e._context, i = this.descriptor.prop, n = i.path, r = i.parentPath, a = i.mode === ao.TWO_WAY, o = this.parentWatcher = new Vt(t, r, function (t) {
                t = ut(i, t), ct(i, t) && (e[n] = t)
            }, {twoWay: a, filters: i.filters, scope: this._scope});
            if (lt(e, i, o.value), a) {
                var s = this;
                e.$once("pre-hook:created", function () {
                    s.childWatcher = new Vt(e, n, function (e) {
                        o.set(e)
                    }, {sync: !0})
                })
            }
        }, unbind: function () {
            this.parentWatcher.teardown(), this.childWatcher && this.childWatcher.teardown()
        }
    }, so = {
        priority: ca, params: ["keep-alive", "transition-mode", "inline-template"], bind: function () {
            this.el.__vue__ || (this.keepAlive = this.params.keepAlive, this.keepAlive && (this.cache = {}), this.params.inlineTemplate && (this.inlineTemplate = Y(this.el, !0)), this.pendingComponentCb = this.Component = null, this.pendingRemovals = 0, this.pendingRemovalCb = null, this.anchor = it("v-component"), z(this.el, this.anchor), this.el.removeAttribute("is"), this.descriptor.ref && this.el.removeAttribute("v-ref:" + d(this.descriptor.ref)), this.literal && this.setComponent(this.expression))
        }, update: function (e) {
            this.literal || this.setComponent(e)
        }, setComponent: function (e, t) {
            if (this.invalidatePending(), e) {
                var i = this;
                this.resolveComponent(e, function () {
                    i.mountComponent(t)
                })
            } else this.unbuild(!0), this.remove(this.childVM, t), this.childVM = null
        }, resolveComponent: function (e, t) {
            var i = this;
            this.pendingComponentCb = S(function (n) {
                i.ComponentName = n.options.name || e, i.Component = n, t()
            }), this.vm._resolveComponent(e, this.pendingComponentCb)
        }, mountComponent: function (e) {
            this.unbuild(!0);
            var t = this, i = this.Component.options.activate, n = this.getCached(), r = this.build();
            i && !n ? (this.waitingFor = r, i.call(r, function () {
                t.waitingFor === r && (t.waitingFor = null, t.transition(r, e))
            })) : (n && r._updateRef(), this.transition(r, e))
        }, invalidatePending: function () {
            this.pendingComponentCb && (this.pendingComponentCb.cancel(), this.pendingComponentCb = null)
        }, build: function (e) {
            var t = this.getCached();
            if (t)return t;
            if (this.Component) {
                var i = {
                    name: this.ComponentName,
                    el: ii(this.el),
                    template: this.inlineTemplate,
                    parent: this._host || this.vm,
                    _linkerCachable: !this.inlineTemplate,
                    _ref: this.descriptor.ref,
                    _asComponent: !0,
                    _isRouterView: this._isRouterView,
                    _context: this.vm,
                    _scope: this._scope,
                    _frag: this._frag
                };
                e && m(i, e);
                var n = new this.Component(i);
                return this.keepAlive && (this.cache[this.Component.cid] = n), n
            }
        }, getCached: function () {
            return this.keepAlive && this.cache[this.Component.cid]
        }, unbuild: function (e) {
            this.waitingFor && (this.waitingFor.$destroy(), this.waitingFor = null);
            var t = this.childVM;
            return !t || this.keepAlive ? void(t && t._updateRef(!0)) : void t.$destroy(!1, e)
        }, remove: function (e, t) {
            var i = this.keepAlive;
            if (e) {
                this.pendingRemovals++, this.pendingRemovalCb = t;
                var n = this;
                e.$remove(function () {
                    n.pendingRemovals--, i || e._cleanup(), !n.pendingRemovals && n.pendingRemovalCb && (n.pendingRemovalCb(), n.pendingRemovalCb = null)
                })
            } else t && t()
        }, transition: function (e, t) {
            var i = this, n = this.childVM;
            switch (this.childVM = e, i.params.transitionMode) {
                case"in-out":
                    e.$before(i.anchor, function () {
                        i.remove(n, t)
                    });
                    break;
                case"out-in":
                    i.remove(n, function () {
                        e.$before(i.anchor, t)
                    });
                    break;
                default:
                    i.remove(n), e.$before(i.anchor, t)
            }
        }, unbind: function () {
            if (this.invalidatePending(), this.unbuild(), this.cache) {
                for (var e in this.cache)this.cache[e].$destroy();
                this.cache = null
            }
        }
    }, lo = {
        deep: !0, update: function (e) {
            e && "string" == typeof e ? this.handleObject(yi(e)) : v(e) ? this.handleObject(e) : _n(e) ? this.handleArray(e) : this.cleanup()
        }, handleObject: function (e) {
            this.cleanup(e);
            for (var t = this.prevKeys = Object.keys(e), i = 0, n = t.length; n > i; i++) {
                var r = t[i];
                e[r] ? K(this.el, r) : Z(this.el, r)
            }
        }, handleArray: function (e) {
            this.cleanup(e);
            for (var t = 0, i = e.length; i > t; t++)e[t] && K(this.el, e[t]);
            this.prevKeys = e.slice()
        }, cleanup: function (e) {
            if (this.prevKeys)for (var t = this.prevKeys.length; t--;) {
                var i = this.prevKeys[t];
                !i || e && Ci(e, i) || Z(this.el, i)
            }
        }
    }, co = {
        style: Ca,
        "class": lo,
        component: so,
        prop: oo,
        transition: ro
    }, uo = or._propBindingModes, ho = {}, po = /^[$_a-zA-Z]+[\w$]*$/, fo = /^v-bind:|^:/, mo = /^v-on:|^@/, go = /:(.*)$/, vo = /\.[^\.]+/g, bo = /^(v-bind:|:)?transition$/, yo = ["for", "if"], Co = 1e3;
    Gi.terminal = !0;
    var So = /[^\w\-:\.]/, wo = Object.freeze({
        compile: Ti,
        compileAndLinkProps: Pi,
        compileRoot: Li,
        terminalDirectives: yo,
        transclude: Ji
    }), _o = /^v-on:|^@/;
    tn.prototype._bind = function () {
        var e = this.name, t = this.descriptor;
        if (("cloak" !== e || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
            var i = t.attr || "v-" + e;
            this.el.removeAttribute(i)
        }
        var n = t.def;
        if ("function" == typeof n ? this.update = n : m(this, n), this._setupParams(), this.bind && this.bind(), this._bound = !0, this.literal) this.update && this.update(t.raw); else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
            var r = this;
            this._update = this.update ? function (e, t) {
                r._locked || r.update(e, t)
            } : en;
            var a = this._preProcess ? p(this._preProcess, this) : null, o = this._postProcess ? p(this._postProcess, this) : null, s = this._watcher = new Vt(this.vm, this.expression, this._update, {
                filters: this.filters,
                twoWay: this.twoWay,
                deep: this.deep,
                preProcess: a,
                postProcess: o,
                scope: this._scope
            });
            this.afterBind ? this.afterBind() : this.update && this.update(s.value)
        }
    }, tn.prototype._setupParams = function () {
        if (this.params) {
            var e = this.params;
            this.params = Object.create(null);
            for (var t, i, n, r = e.length; r--;)t = e[r], n = c(t), i = H(this.el, t), null != i ? this._setupParamWatcher(n, i) : (i = O(this.el, t), null != i && (this.params[n] = "" === i ? !0 : i))
        }
    }, tn.prototype._setupParamWatcher = function (e, t) {
        var i = this, n = !1, r = (this._scope || this.vm).$watch(t, function (t, r) {
            if (i.params[e] = t, n) {
                var a = i.paramWatchers && i.paramWatchers[e];
                a && a.call(i, t, r)
            } else n = !0
        }, {immediate: !0, user: !1});
        (this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(r)
    }, tn.prototype._checkStatement = function () {
        var e = this.expression;
        if (e && this.acceptStatement && !Ot(e)) {
            var t = Rt(e).get, i = this._scope || this.vm, n = function (e) {
                i.$event = e, t.call(i, i), i.$event = null
            };
            return this.filters && (n = i._applyFilters(n, null, this.filters)), this.update(n), !0
        }
    }, tn.prototype.set = function (e) {
        this.twoWay && this._withLock(function () {
            this._watcher.set(e)
        })
    }, tn.prototype._withLock = function (e) {
        var t = this;
        t._locked = !0, e.call(t), Bn(function () {
            t._locked = !1
        })
    }, tn.prototype.on = function (e, t) {
        W(this.el, e, t), (this._listeners || (this._listeners = [])).push([e, t])
    }, tn.prototype._teardown = function () {
        if (this._bound) {
            this._bound = !1, this.unbind && this.unbind(), this._watcher && this._watcher.teardown();
            var e, t = this._listeners;
            if (t)for (e = t.length; e--;)J(this.el, t[e][0], t[e][1]);
            var i = this._paramUnwatchFns;
            if (i)for (e = i.length; e--;)i[e]();
            this.vm = this.el = this._watcher = this._listeners = null
        }
    };
    var To = /[^|]\|[^|]/;
    Dt(un), Yi(un), Xi(un), nn(un), rn(un), an(un), on(un), sn(un), ln(un), cn(un);
    var Do = Wa._postProcess, xo = /(\d{3})(?=\d)/g, ko = {
        orderBy: pn,
        filterBy: hn,
        limitBy: dn,
        json: {
            read: function (e, t) {
                return "string" == typeof e ? e : JSON.stringify(e, null, Number(t) || 2)
            }, write: function (e) {
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return e
                }
            }
        },
        capitalize: function (e) {
            return e || 0 === e ? (e = e.toString(), e.charAt(0).toUpperCase() + e.slice(1)) : ""
        },
        uppercase: function (e) {
            return e || 0 === e ? e.toString().toUpperCase() : ""
        },
        lowercase: function (e) {
            return e || 0 === e ? e.toString().toLowerCase() : ""
        },
        currency: function (e, t) {
            if (e = parseFloat(e), !isFinite(e) || !e && 0 !== e)return "";
            t = null != t ? t : "$";
            var i = Math.abs(e).toFixed(2), n = i.slice(0, -3), r = n.length % 3, a = r > 0 ? n.slice(0, r) + (n.length > 3 ? "," : "") : "", o = i.slice(-3), s = 0 > e ? "-" : "";
            return t + s + a + n.slice(r).replace(xo, "$1,") + o
        },
        pluralize: function (e) {
            var t = f(arguments, 1);
            return t.length > 1 ? t[e % 10 - 1] || t[t.length - 1] : t[0] + (1 === e ? "" : "s")
        },
        debounce: function (e, t) {
            return e ? (t || (t = 300), y(e, t)) : void 0
        }
    }, Mo = {
        priority: ua, params: ["name"], paramWatchers: {
            name: function (e) {
                qa.remove.call(this), e && this.insert(e)
            }
        }, bind: function () {
            this.anchor = it("v-partial"), z(this.el, this.anchor), this.insert(this.params.name)
        }, insert: function (e) {
            var t = vt(this.vm.$options, "partials", e);
            t && (this.factory = new di(this.vm, t), qa.insert.call(this))
        }, unbind: function () {
            this.frag && this.frag.destroy()
        }
    }, Po = {
        priority: pa, bind: function () {
            var e = this.vm, t = e.$options._content;
            if (!t)return void this.fallback();
            var i = e._context, n = this.params && this.params.name;
            if (n) {
                var r = '[slot="' + n + '"]', a = t.querySelectorAll(r);
                a.length ? this.tryCompile(mn(a, t), i, e) : this.fallback()
            } else this.tryCompile(mn(t.childNodes, t, !0), i, e)
        }, tryCompile: function (e, t, i) {
            e.hasChildNodes() ? this.compile(e, t, i) : this.fallback()
        }, compile: function (e, t, i) {
            if (e && t) {
                var n = i ? i._scope : this._scope;
                this.unlink = t.$compile(e, i, n, this._frag)
            }
            e ? z(this.el, e) : V(this.el)
        }, fallback: function () {
            this.compile(Y(this.el, !0), this.vm)
        }, unbind: function () {
            this.unlink && this.unlink()
        }
    }, Lo = m(m({}, Po), {priority: Po.priority + 1, params: ["name"]}), Fo = {slot: Po, _namedSlot: Lo, partial: Mo};
    return un.version = "1.0.15", un.options = {
        directives: Ka,
        elementDirectives: Fo,
        filters: ko,
        transitions: {},
        components: {},
        partials: {},
        replace: !0
    }, un
}), !function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VueResource = t() : e.VueResource = t()
}(this, function () {
    return function (e) {
        function t(n) {
            if (i[n])return i[n].exports;
            var r = i[n] = {exports: {}, id: n, loaded: !1};
            return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }

        var i = {};
        return t.m = e, t.c = i, t.p = "", t(0)
    }([function (e, t, i) {
        function n(e) {
            var t = i(1);
            t.config = e.config, t.warning = e.util.warn, t.nextTick = e.util.nextTick, e.url = i(2), e.http = i(8), e.resource = i(23), e.Promise = i(10), Object.defineProperties(e.prototype, {
                $url: {
                    get: function () {
                        return t.options(e.url, this, this.$options.url)
                    }
                }, $http: {
                    get: function () {
                        return t.options(e.http, this, this.$options.http)
                    }
                }, $resource: {
                    get: function () {
                        return e.resource.bind(this)
                    }
                }, $promise: {
                    get: function () {
                        return function (t) {
                            return new e.Promise(t, this)
                        }.bind(this)
                    }
                }
            })
        }

        window.Vue && Vue.use(n), e.exports = n
    }, function (e, t) {
        function i(e, t, r) {
            for (var a in t)r && (n.isPlainObject(t[a]) || n.isArray(t[a])) ? (n.isPlainObject(t[a]) && !n.isPlainObject(e[a]) && (e[a] = {}), n.isArray(t[a]) && !n.isArray(e[a]) && (e[a] = []), i(e[a], t[a], r)) : void 0 !== t[a] && (e[a] = t[a])
        }

        var n = t, r = [], a = window.console;
        n.warn = function (e) {
            a && n.warning && (!n.config.silent || n.config.debug) && a.warn("[VueResource warn]: " + e)
        }, n.error = function (e) {
            a && a.error(e)
        }, n.trim = function (e) {
            return e.replace(/^\s*|\s*$/g, "")
        }, n.toLower = function (e) {
            return e ? e.toLowerCase() : ""
        }, n.isArray = Array.isArray, n.isString = function (e) {
            return "string" == typeof e
        }, n.isFunction = function (e) {
            return "function" == typeof e
        }, n.isObject = function (e) {
            return null !== e && "object" == typeof e
        }, n.isPlainObject = function (e) {
            return n.isObject(e) && Object.getPrototypeOf(e) == Object.prototype
        }, n.options = function (e, t, i) {
            return i = i || {}, n.isFunction(i) && (i = i.call(t)), n.merge(e.bind({
                $vm: t,
                $options: i
            }), e, {$options: i})
        }, n.each = function (e, t) {
            var i, r;
            if ("number" == typeof e.length)for (i = 0; i < e.length; i++)t.call(e[i], e[i], i); else if (n.isObject(e))for (r in e)e.hasOwnProperty(r) && t.call(e[r], e[r], r);
            return e
        }, n.defaults = function (e, t) {
            for (var i in t)void 0 === e[i] && (e[i] = t[i]);
            return e
        }, n.extend = function (e) {
            var t = r.slice.call(arguments, 1);
            return t.forEach(function (t) {
                i(e, t)
            }), e
        }, n.merge = function (e) {
            var t = r.slice.call(arguments, 1);
            return t.forEach(function (t) {
                i(e, t, !0)
            }), e
        }
    }, function (e, t, i) {
        function n(e, t) {
            var i, a = e;
            return o.isString(e) && (a = {
                url: e,
                params: t
            }), a = o.merge({}, n.options, this.$options, a), n.transforms.forEach(function (e) {
                i = r(e, i, this.$vm)
            }, this), i(a)
        }

        function r(e, t, i) {
            return function (n) {
                return e.call(i, n, t)
            }
        }

        function a(e, t, i) {
            var n, r = o.isArray(t), s = o.isPlainObject(t);
            o.each(t, function (t, l) {
                n = o.isObject(t) || o.isArray(t), i && (l = i + "[" + (s || n ? l : "") + "]"), !i && r ? e.add(t.name, t.value) : n ? a(e, t, l) : e.add(l, t)
            })
        }

        var o = i(1), s = document.documentMode, l = document.createElement("a");
        n.options = {
            url: "",
            root: null,
            params: {}
        }, n.transforms = [i(3), i(5), i(6), i(7)], n.params = function (e) {
            var t = [], i = encodeURIComponent;
            return t.add = function (e, t) {
                o.isFunction(t) && (t = t()), null === t && (t = ""), this.push(i(e) + "=" + i(t))
            }, a(t, e), t.join("&").replace(/%20/g, "+")
        }, n.parse = function (e) {
            return s && (l.href = e, e = l.href), l.href = e, {
                href: l.href,
                protocol: l.protocol ? l.protocol.replace(/:$/, "") : "",
                port: l.port,
                host: l.host,
                hostname: l.hostname,
                pathname: "/" === l.pathname.charAt(0) ? l.pathname : "/" + l.pathname,
                search: l.search ? l.search.replace(/^\?/, "") : "",
                hash: l.hash ? l.hash.replace(/^#/, "") : ""
            }
        }, e.exports = o.url = n
    }, function (e, t, i) {
        var n = i(4);
        e.exports = function (e) {
            var t = [], i = n.expand(e.url, e.params, t);
            return t.forEach(function (t) {
                delete e.params[t]
            }), i
        }
    }, function (e, t) {
        t.expand = function (e, t, i) {
            var n = this.parse(e), r = n.expand(t);
            return i && i.push.apply(i, n.vars), r
        }, t.parse = function (e) {
            var i = ["+", "#", ".", "/", ";", "?", "&"], n = [];
            return {
                vars: n, expand: function (r) {
                    return e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (e, a, o) {
                        if (a) {
                            var s = null, l = [];
                            if (-1 !== i.indexOf(a.charAt(0)) && (s = a.charAt(0), a = a.substr(1)), a.split(/,/g).forEach(function (e) {
                                    var i = /([^:\*]*)(?::(\d+)|(\*))?/.exec(e);
                                    l.push.apply(l, t.getValues(r, s, i[1], i[2] || i[3])), n.push(i[1])
                                }), s && "+" !== s) {
                                var c = ",";
                                return "?" === s ? c = "&" : "#" !== s && (c = s), (0 !== l.length ? s : "") + l.join(c)
                            }
                            return l.join(",")
                        }
                        return t.encodeReserved(o)
                    })
                }
            }
        }, t.getValues = function (e, t, i, n) {
            var r = e[i], a = [];
            if (this.isDefined(r) && "" !== r)if ("string" == typeof r || "number" == typeof r || "boolean" == typeof r) r = r.toString(), n && "*" !== n && (r = r.substring(0, parseInt(n, 10))), a.push(this.encodeValue(t, r, this.isKeyOperator(t) ? i : null)); else if ("*" === n) Array.isArray(r) ? r.filter(this.isDefined).forEach(function (e) {
                a.push(this.encodeValue(t, e, this.isKeyOperator(t) ? i : null))
            }, this) : Object.keys(r).forEach(function (e) {
                this.isDefined(r[e]) && a.push(this.encodeValue(t, r[e], e))
            }, this); else {
                var o = [];
                Array.isArray(r) ? r.filter(this.isDefined).forEach(function (e) {
                    o.push(this.encodeValue(t, e))
                }, this) : Object.keys(r).forEach(function (e) {
                    this.isDefined(r[e]) && (o.push(encodeURIComponent(e)), o.push(this.encodeValue(t, r[e].toString())))
                }, this), this.isKeyOperator(t) ? a.push(encodeURIComponent(i) + "=" + o.join(",")) : 0 !== o.length && a.push(o.join(","))
            } else";" === t ? a.push(encodeURIComponent(i)) : "" !== r || "&" !== t && "?" !== t ? "" === r && a.push("") : a.push(encodeURIComponent(i) + "=");
            return a
        }, t.isDefined = function (e) {
            return void 0 !== e && null !== e
        }, t.isKeyOperator = function (e) {
            return ";" === e || "&" === e || "?" === e
        }, t.encodeValue = function (e, t, i) {
            return t = "+" === e || "#" === e ? this.encodeReserved(t) : encodeURIComponent(t), i ? encodeURIComponent(i) + "=" + t : t
        }, t.encodeReserved = function (e) {
            return e.split(/(%[0-9A-Fa-f]{2})/g).map(function (e) {
                return /%[0-9A-Fa-f]/.test(e) || (e = encodeURI(e)), e
            }).join("")
        }
    }, function (e, t, i) {
        function n(e) {
            return r(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }

        function r(e, t) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
        }

        var a = i(1);
        e.exports = function (e, t) {
            var i = [], r = t(e);
            return r = r.replace(/(\/?):([a-z]\w*)/gi, function (t, r, o) {
                return a.warn("The `:" + o + "` parameter syntax has been deprecated. Use the `{" + o + "}` syntax instead."), e.params[o] ? (i.push(o), r + n(e.params[o])) : ""
            }), i.forEach(function (t) {
                delete e.params[t]
            }), r
        }
    }, function (e, t, i) {
        var n = i(1);
        e.exports = function (e, t) {
            var i = Object.keys(n.url.options.params), r = {}, a = t(e);
            return n.each(e.params, function (e, t) {
                -1 === i.indexOf(t) && (r[t] = e)
            }), r = n.url.params(r), r && (a += (-1 == a.indexOf("?") ? "?" : "&") + r), a
        }
    }, function (e, t, i) {
        var n = i(1);
        e.exports = function (e, t) {
            var i = t(e);
            return n.isString(e.root) && !i.match(/^(https?:)?\//) && (i = e.root + "/" + i), i
        }
    }, function (e, t, i) {
        function n(e, t) {
            var i, l, c = a;
            return n.interceptors.forEach(function (e) {
                c = s(e, this.$vm)(c)
            }, this), t = r.isObject(e) ? e : r.extend({url: e}, t), i = r.merge({}, n.options, this.$options, t), l = c(i).bind(this.$vm).then(function (e) {
                return e.ok ? e : o.reject(e)
            }, function (e) {
                return e instanceof Error && r.error(e), o.reject(e)
            }), i.success && l.success(i.success), i.error && l.error(i.error), l
        }

        var r = i(1), a = i(9), o = i(10), s = i(13), l = {"Content-Type": "application/json"};
        n.options = {
            method: "get",
            data: "",
            params: {},
            headers: {},
            xhr: null,
            jsonp: "callback",
            beforeSend: null,
            crossOrigin: null,
            emulateHTTP: !1,
            emulateJSON: !1,
            timeout: 0
        }, n.interceptors = [i(14), i(15), i(16), i(18), i(19), i(20), i(21)], n.headers = {
            put: l,
            post: l,
            patch: l,
            "delete": l,
            common: {Accept: "application/json, text/plain, */*"},
            custom: {"X-Requested-With": "XMLHttpRequest"}
        }, ["get", "put", "post", "patch", "delete", "jsonp"].forEach(function (e) {
            n[e] = function (t, i, n, a) {
                return r.isFunction(i) && (a = n, n = i, i = void 0), r.isObject(n) && (a = n, n = void 0), this(t, r.extend({
                    method: e,
                    data: i,
                    success: n
                }, a))
            }
        }), e.exports = r.http = n
    }, function (e, t, i) {
        function n(e) {
            var t, i, n, a = {};
            return r.isString(e) && r.each(e.split("\n"), function (e) {
                n = e.indexOf(":"), i = r.trim(r.toLower(e.slice(0, n))), t = r.trim(e.slice(n + 1)), a[i] ? r.isArray(a[i]) ? a[i].push(t) : a[i] = [a[i], t] : a[i] = t
            }), a
        }

        var r = i(1), a = i(10), o = i(12);
        e.exports = function (e) {
            var t = (e.client || o)(e);
            return a.resolve(t).then(function (e) {
                if (e.headers) {
                    var t = n(e.headers);
                    e.headers = function (e) {
                        return e ? t[r.toLower(e)] : t
                    }
                }
                return e.ok = e.status >= 200 && e.status < 300, e
            })
        }
    }, function (e, t, i) {
        function n(e, t) {
            this.promise = e instanceof a ? e : new a(e.bind(t)), this.context = t
        }

        var r = i(1), a = window.Promise || i(11);
        n.all = function (e, t) {
            return new n(a.all(e), t)
        }, n.resolve = function (e, t) {
            return new n(a.resolve(e), t)
        }, n.reject = function (e, t) {
            return new n(a.reject(e), t)
        }, n.race = function (e, t) {
            return new n(a.race(e), t)
        };
        var o = n.prototype;
        o.bind = function (e) {
            return this.context = e, this
        }, o.then = function (e, t) {
            return e && e.bind && this.context && (e = e.bind(this.context)), t && t.bind && this.context && (t = t.bind(this.context)), this.promise = this.promise.then(e, t), this
        }, o["catch"] = function (e) {
            return e && e.bind && this.context && (e = e.bind(this.context)), this.promise = this.promise["catch"](e), this
        }, o["finally"] = function (e) {
            return this.then(function (t) {
                return e.call(this), t
            }, function (t) {
                return e.call(this), a.reject(t)
            })
        }, o.success = function (e) {
            return r.warn("The `success` method has been deprecated. Use the `then` method instead."), this.then(function (t) {
                return e.call(this, t.data, t.status, t) || t
            })
        }, o.error = function (e) {
            return r.warn("The `error` method has been deprecated. Use the `catch` method instead."), this["catch"](function (t) {
                return e.call(this, t.data, t.status, t) || t
            })
        }, o.always = function (e) {
            r.warn("The `always` method has been deprecated. Use the `finally` method instead.");
            var t = function (t) {
                return e.call(this, t.data, t.status, t) || t
            };
            return this.then(t, t)
        }, e.exports = n
    }, function (e, t, i) {
        function n(e) {
            this.state = s, this.value = void 0, this.deferred = [];
            var t = this;
            try {
                e(function (e) {
                    t.resolve(e)
                }, function (e) {
                    t.reject(e)
                })
            } catch (i) {
                t.reject(i)
            }
        }

        var r = i(1), a = 0, o = 1, s = 2;
        n.reject = function (e) {
            return new n(function (t, i) {
                i(e)
            })
        }, n.resolve = function (e) {
            return new n(function (t) {
                t(e)
            })
        }, n.all = function (e) {
            return new n(function (t, i) {
                function r(i) {
                    return function (n) {
                        o[i] = n, a += 1, a === e.length && t(o)
                    }
                }

                var a = 0, o = [];
                0 === e.length && t(o);
                for (var s = 0; s < e.length; s += 1)n.resolve(e[s]).then(r(s), i)
            })
        }, n.race = function (e) {
            return new n(function (t, i) {
                for (var r = 0; r < e.length; r += 1)n.resolve(e[r]).then(t, i)
            })
        };
        var l = n.prototype;
        l.resolve = function (e) {
            var t = this;
            if (t.state === s) {
                if (e === t)throw new TypeError("Promise settled with itself.");
                var i = !1;
                try {
                    var n = e && e.then;
                    if (null !== e && "object" == typeof e && "function" == typeof n)return void n.call(e, function (e) {
                        i || t.resolve(e), i = !0
                    }, function (e) {
                        i || t.reject(e), i = !0
                    })
                } catch (r) {
                    return void(i || t.reject(r))
                }
                t.state = a, t.value = e, t.notify()
            }
        }, l.reject = function (e) {
            var t = this;
            if (t.state === s) {
                if (e === t)throw new TypeError("Promise settled with itself.");
                t.state = o, t.value = e, t.notify()
            }
        }, l.notify = function () {
            var e = this;
            r.nextTick(function () {
                if (e.state !== s)for (; e.deferred.length;) {
                    var t = e.deferred.shift(), i = t[0], n = t[1], r = t[2], l = t[3];
                    try {
                        e.state === a ? r("function" == typeof i ? i.call(void 0, e.value) : e.value) : e.state === o && ("function" == typeof n ? r(n.call(void 0, e.value)) : l(e.value))
                    } catch (c) {
                        l(c)
                    }
                }
            })
        }, l.then = function (e, t) {
            var i = this;
            return new n(function (n, r) {
                i.deferred.push([e, t, n, r]), i.notify()
            })
        }, l["catch"] = function (e) {
            return this.then(void 0, e)
        }, e.exports = n
    }, function (e, t, i) {
        var n = i(1), r = i(10);
        e.exports = function (e) {
            return new r(function (t) {
                var i, r = new XMLHttpRequest, a = {request: e};
                e.cancel = function () {
                    r.abort()
                }, r.open(e.method, n.url(e), !0), n.isPlainObject(e.xhr) && n.extend(r, e.xhr), n.each(e.headers || {}, function (e, t) {
                    r.setRequestHeader(t, e)
                }), i = function () {
                    a.data = r.responseText, a.status = r.status, a.statusText = r.statusText, a.headers = r.getAllResponseHeaders(), t(a)
                }, r.onload = i, r.onabort = i, r.onerror = i, r.send(e.data)
            })
        }
    }, function (e, t, i) {
        function n(e, t, i) {
            var n = a.resolve(e);
            return arguments.length < 2 ? n : n.then(t, i)
        }

        var r = i(1), a = i(10);
        e.exports = function (e, t) {
            return function (i) {
                return r.isFunction(e) && (e = e.call(t, a)), function (a) {
                    return r.isFunction(e.request) && (a = e.request.call(t, a)), n(a, function (a) {
                        return n(i(a), function (i) {
                            return r.isFunction(e.response) && (i = e.response.call(t, i)), i
                        })
                    })
                }
            }
        }
    }, function (e, t, i) {
        var n = i(1);
        e.exports = {
            request: function (e) {
                return n.isFunction(e.beforeSend) && e.beforeSend.call(this, e), e
            }
        }
    }, function (e) {
        e.exports = function () {
            var e;
            return {
                request: function (t) {
                    return t.timeout && (e = setTimeout(function () {
                        t.cancel()
                    }, t.timeout)), t
                }, response: function (t) {
                    return clearTimeout(e), t
                }
            }
        }
    }, function (e, t, i) {
        var n = i(17);
        e.exports = {
            request: function (e) {
                return "JSONP" == e.method && (e.client = n), e
            }
        }
    }, function (e, t, i) {
        var n = i(1), r = i(10);
        e.exports = function (e) {
            return new r(function (t) {
                var i, r, a = "_jsonp" + Math.random().toString(36).substr(2), o = {request: e, data: null};
                e.params[e.jsonp] = a, e.cancel = function () {
                    i({type: "cancel"})
                }, r = document.createElement("script"), r.src = n.url(e), r.type = "text/javascript", r.async = !0, window[a] = function (e) {
                    o.data = e
                }, i = function (e) {
                    o.status = "load" === e.type && null !== o.data ? 200 : "error" === e.type ? 404 : 0, t(o), delete window[a], document.body.removeChild(r)
                }, r.onload = i, r.onerror = i, document.body.appendChild(r)
            })
        }
    }, function (e) {
        e.exports = {
            request: function (e) {
                return e.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(e.method) && (e.headers["X-HTTP-Method-Override"] = e.method, e.method = "POST"), e
            }
        }
    }, function (e, t, i) {
        var n = i(1);
        e.exports = {
            request: function (e) {
                return e.emulateJSON && n.isPlainObject(e.data) && (e.headers["Content-Type"] = "application/x-www-form-urlencoded", e.data = n.url.params(e.data)), n.isObject(e.data) && /FormData/i.test(e.data.toString()) && delete e.headers["Content-Type"], n.isPlainObject(e.data) && (e.data = JSON.stringify(e.data)), e
            }, response: function (e) {
                try {
                    e.data = JSON.parse(e.data)
                } catch (t) {
                }
                return e
            }
        }
    }, function (e, t, i) {
        var n = i(1);
        e.exports = {
            request: function (e) {
                return e.method = e.method.toUpperCase(), e.headers = n.extend({}, n.http.headers.common, e.crossOrigin ? {} : n.http.headers.custom, n.http.headers[e.method.toLowerCase()], e.headers), n.isPlainObject(e.data) && /^(GET|JSONP)$/i.test(e.method) && (n.extend(e.params, e.data), delete e.data), e
            }
        }
    }, function (e, t, i) {
        function n(e) {
            var t = r.url.parse(r.url(e));
            return t.protocol !== s.protocol || t.host !== s.host
        }

        var r = i(1), a = i(22), o = "withCredentials" in new XMLHttpRequest, s = r.url.parse(location.href);
        e.exports = {
            request: function (e) {
                return null === e.crossOrigin && (e.crossOrigin = n(e)), e.crossOrigin && (o || (e.client = a), e.emulateHTTP = !1), e
            }
        }
    }, function (e, t, i) {
        var n = i(1), r = i(10);
        e.exports = function (e) {
            return new r(function (t) {
                var i, r = new XDomainRequest, a = {request: e};
                e.cancel = function () {
                    r.abort()
                }, r.open(e.method, n.url(e), !0), i = function () {
                    a.data = r.responseText, a.status = r.status, a.statusText = r.statusText, t(a)
                }, r.timeout = 0, r.onload = i, r.onabort = i, r.onerror = i, r.ontimeout = function () {
                }, r.onprogress = function () {
                }, r.send(e.data)
            })
        }
    }, function (e, t, i) {
        function n(e, t, i, o) {
            var s = this, l = {};
            return i = a.extend({}, n.actions, i), a.each(i, function (i, n) {
                i = a.merge({url: e, params: t || {}}, o, i), l[n] = function () {
                    return (s.$http || a.http)(r(i, arguments))
                }
            }), l
        }

        function r(e, t) {
            var i, n, r, o = a.extend({}, e), s = {};
            switch (t.length) {
                case 4:
                    r = t[3], n = t[2];
                case 3:
                case 2:
                    if (!a.isFunction(t[1])) {
                        s = t[0], i = t[1], n = t[2];
                        break
                    }
                    if (a.isFunction(t[0])) {
                        n = t[0], r = t[1];
                        break
                    }
                    n = t[1], r = t[2];
                case 1:
                    a.isFunction(t[0]) ? n = t[0] : /^(POST|PUT|PATCH)$/i.test(o.method) ? i = t[0] : s = t[0];
                    break;
                case 0:
                    break;
                default:
                    throw"Expected up to 4 arguments [params, data, success, error], got " + t.length + " arguments"
            }
            return o.data = i, o.params = a.extend({}, o.params, s), n && (o.success = n), r && (o.error = r), o
        }

        var a = i(1);
        n.actions = {
            get: {method: "GET"},
            save: {method: "POST"},
            query: {method: "GET"},
            update: {method: "PUT"},
            remove: {method: "DELETE"},
            "delete": {method: "DELETE"}
        }, e.exports = a.resource = n
    }])
}), function (e, t) {
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Spinner = t()
}(this, function () {
    "use strict";
    function e(e, t) {
        var i, n = document.createElement(e || "div");
        for (i in t)n[i] = t[i];
        return n
    }

    function t(e) {
        for (var t = 1, i = arguments.length; i > t; t++)e.appendChild(arguments[t]);
        return e
    }

    function i(e, t, i, n) {
        var r = ["opacity", t, ~~(100 * e), i, n].join("-"), a = .01 + i / n * 100, o = Math.max(1 - (1 - e) / t * (100 - a), e), s = c.substring(0, c.indexOf("Animation")).toLowerCase(), l = s && "-" + s + "-" || "";
        return d[r] || (h.insertRule("@" + l + "keyframes " + r + "{0%{opacity:" + o + "}" + a + "%{opacity:" + e + "}" + (a + .01) + "%{opacity:1}" + (a + t) % 100 + "%{opacity:" + e + "}100%{opacity:" + o + "}}", h.cssRules.length), d[r] = 1), r
    }

    function n(e, t) {
        var i, n, r = e.style;
        if (void 0 !== r[t])return t;
        for (t = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < u.length; n++)if (i = u[n] + t, void 0 !== r[i])return i
    }

    function r(e, t) {
        for (var i in t)try {
            e.style[n(e, i) || i] = t[i]
        } catch (r) {
            e.style.zIndex = 1
        }
        return e
    }

    function a(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i)void 0 === e[n] && (e[n] = i[n])
        }
        return e
    }

    function o(e) {
        for (var t = {x: e.offsetLeft, y: e.offsetTop}; e = e.offsetParent;)t.x += e.offsetLeft, t.y += e.offsetTop;
        return t
    }

    function s(e) {
        return "undefined" == typeof this ? new s(e) : void(this.opts = a(e || {}, s.defaults, p))
    }

    function l() {
        function i(t, i) {
            return e("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', i)
        }

        h.addRule(".spin-vml", "behavior:url(#default#VML)"), s.prototype.lines = function (e, n) {
            function a() {
                return r(i("group", {coordsize: c + " " + c, coordorigin: -l + " " + -l}), {width: c, height: c})
            }

            function o(e, o, s) {
                t(d, t(r(a(), {
                    rotation: 360 / n.lines * e + "deg",
                    left: ~~o
                }), t(r(i("roundrect", {arcsize: n.corners}), {
                    width: l,
                    height: n.width,
                    left: n.radius,
                    top: -n.width >> 1,
                    filter: s
                }), i("fill", {color: n.color, opacity: n.opacity}), i("stroke", {opacity: 0}))))
            }

            var s, l = n.length + n.width, c = 2 * l, u = 2 * -(n.width + n.length) + "px", d = r(a(), {
                position: "absolute",
                top: u,
                left: u
            });
            if (n.shadow)for (s = 1; s <= n.lines; s++)o(s, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (s = 1; s <= n.lines; s++)o(s);
            return t(e, d)
        }, s.prototype.opacity = function (e, t, i, n) {
            var r = e.firstChild;
            n = n.shadow && n.lines || 0, r && t + n < r.childNodes.length && (r = r.childNodes[t + n], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = i))
        }
    }

    var c, u = ["webkit", "Moz", "ms", "O"], d = {}, h = function () {
        var i = e("style", {type: "text/css"});
        return t(document.getElementsByTagName("head")[0], i), i.sheet || i.styleSheet
    }(), p = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
    };
    s.defaults = {}, a(s.prototype, {
        spin: function (t) {
            this.stop();
            var i, n, a = this, s = a.opts, l = a.el = r(e(0, {className: s.className}), {
                position: s.position,
                width: 0,
                zIndex: s.zIndex
            }), u = s.radius + s.length + s.width;
            if (t && (t.insertBefore(l, t.firstChild || null), n = o(t), i = o(l), r(l, {
                    left: ("auto" == s.left ? n.x - i.x + (t.offsetWidth >> 1) : parseInt(s.left, 10) + u) + "px",
                    top: ("auto" == s.top ? n.y - i.y + (t.offsetHeight >> 1) : parseInt(s.top, 10) + u) + "px"
                })), l.setAttribute("role", "progressbar"), a.lines(l, a.opts), !c) {
                var d, h = 0, p = (s.lines - 1) * (1 - s.direction) / 2, f = s.fps, m = f / s.speed, g = (1 - s.opacity) / (m * s.trail / 100), v = m / s.lines;
                !function b() {
                    h++;
                    for (var e = 0; e < s.lines; e++)d = Math.max(1 - (h + (s.lines - e) * v) % m * g, s.opacity), a.opacity(l, e * s.direction + p, d, s);
                    a.timeout = a.el && setTimeout(b, ~~(1e3 / f))
                }()
            }
            return a
        }, stop: function () {
            var e = this.el;
            return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = void 0), this
        }, lines: function (n, a) {
            function o(t, i) {
                return r(e(), {
                    position: "absolute",
                    width: a.length + a.width + "px",
                    height: a.width + "px",
                    background: t,
                    boxShadow: i,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / a.lines * l + a.rotate) + "deg) translate(" + a.radius + "px,0)",
                    borderRadius: (a.corners * a.width >> 1) + "px"
                })
            }

            for (var s, l = 0, u = (a.lines - 1) * (1 - a.direction) / 2; l < a.lines; l++)s = r(e(), {
                position: "absolute",
                top: 1 + ~(a.width / 2) + "px",
                transform: a.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: a.opacity,
                animation: c && i(a.opacity, a.trail, u + l * a.direction, a.lines) + " " + 1 / a.speed + "s linear infinite"
            }), a.shadow && t(s, r(o("#000", "0 0 4px #000"), {top: "2px"})), t(n, t(s, o(a.color, "0 0 1px rgba(0,0,0,.1)")));
            return n
        }, opacity: function (e, t, i) {
            t < e.childNodes.length && (e.childNodes[t].style.opacity = i)
        }
    });
    var f = r(e("group"), {behavior: "url(#default#VML)"});
    return !n(f, "transform") && f.adj ? l() : c = n(f, "animation"), s
}), function (e, t) {
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(["./spin"], t) : e.Ladda = t(e.Spinner)
}(this, function (e) {
    "use strict";
    function t(e) {
        if ("undefined" == typeof e)throw"Button target must be defined.";
        var t = r(e, e.getAttribute("data-size")), i = document.createElement("span");
        i.className = "ladda-spinner", e.appendChild(i);
        var n, o = {
            start: function () {
                return e.setAttribute("disabled", ""), e.setAttribute("data-loading", ""), Maleskine.BrowserDetector.isIE() && Maleskine.BrowserDetector.isIE8() && $(e).find(".ladda-label").css("left", "-999%"), clearTimeout(n), t.spin(i), this.setProgress(0), this
            }, stop: function () {
                return e.removeAttribute("disabled"), e.removeAttribute("data-loading"), clearTimeout(n), n = setTimeout(function () {
                    t.stop()
                }, 1e3), this
            }, toggle: function () {
                return this.isLoading() ? this.stop() : this.start(), this
            }, setProgress: function (t) {
                var i = e.querySelector(".ladda-progress");
                0 === t && i && i.parentNode ? i.parentNode.removeChild(i) : (i || (i = document.createElement("div"), i.className = "ladda-progress", e.appendChild(i)), i.style.width = (t || 0) * e.offsetWidth + "px")
            }, enable: function () {
                return this.stop(), this
            }, disable: function () {
                return this.stop(), e.setAttribute("disabled", ""), this
            }, isLoading: function () {
                return e.hasAttribute("data-loading")
            }
        };
        return a.push(o), o
    }

    function i(e, i) {
        i = i || {};
        var n = [];
        "string" == typeof e ? n = [].slice.call(document.querySelectorAll(e)) : "object" == typeof e && "string" == typeof e.nodeName && (n = [n]);
        for (var r = 0, a = n.length; a > r; r++)!function () {
            var e = n[r];
            if ("function" == typeof e.addEventListener) {
                var a = t(e), o = -1;
                e.addEventListener("click", function () {
                    a.start(), "number" == typeof i.timeout && (clearTimeout(o), o = setTimeout(a.stop, i.timeout)), "function" == typeof i.callback && i.callback.apply(null, [a])
                }, !1)
            }
        }()
    }

    function n() {
        for (var e = 0, t = a.length; t > e; e++)a[e].stop()
    }

    function r(t) {
        var i = t.offsetHeight;
        i > 32 && (i *= .8);
        var n = 12, r = .2 * i, a = .6 * r, o = 7 > r ? 2 : 3;
        return new e({
            color: "#fff",
            lines: n,
            radius: r,
            length: a,
            width: o,
            zIndex: "initial",
            top: "auto",
            left: "auto",
            className: ""
        })
    }

    var a = [];
    return {bind: i, create: t, stopAll: n}
}), !function (e) {
    "use strict";
    var t = function (t, i) {
        this.options = i, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, i = e.Event("show");
            this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var i = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), i && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), i ? t.$element.one(e.support.transition.end, function () {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            }))
        }, hide: function (t) {
            t && t.preventDefault();
            t = e.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] === e.target || t.$element.has(e.target).length || t.$element.focus()
            })
        }, escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                27 == t.which && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var t = this, i = setTimeout(function () {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(i), t.hideModal()
            })
        }, hideModal: function () {
            var e = this;
            this.$element.hide(), this.backdrop(function () {
                e.removeBackdrop(), e.$element.trigger("hidden")
            })
        }, removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (t) {
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = e.support.transition && i;
                if (this.$backdrop = e('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t)return;
                n ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
        }
    };
    var i = e.fn.modal;
    e.fn.modal = function (i) {
        return this.each(function () {
            var n = e(this), r = n.data("modal"), a = e.extend({}, e.fn.modal.defaults, n.data(), "object" == typeof i && i);
            r || n.data("modal", r = new t(this, a)), "string" == typeof i ? r[i]() : a.show && r.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function () {
        return e.fn.modal = i, this
    }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
        var i = e(this), n = i.attr("href"), r = e(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")), a = r.data("modal") ? "toggle" : e.extend({remote: !/#/.test(n) && n}, r.data(), i.data());
        t.preventDefault(), r.modal(a).one("hide", function () {
            i.focus()
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t, init: function (t, i, n) {
            var r, a, o, s, l;
            for (this.type = t, this.$element = e(i), this.options = this.getOptions(n), this.enabled = !0, o = this.options.trigger.split(" "), l = o.length; l--;)s = o[l], "click" == s ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != s && (r = "hover" == s ? "mouseenter" : "focus", a = "hover" == s ? "mouseleave" : "blur", this.$element.on(r + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
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
            var i, n = e.fn[this.type].defaults, r = {};
            return this._options && e.each(this._options, function (e, t) {
                n[e] != t && (r[e] = t)
            }, this), i = e(t.currentTarget)[this.type](r).data(this.type), i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show))) : i.show()
        }, leave: function (t) {
            var i = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), i.options.delay && i.options.delay.hide ? (i.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide))) : i.hide()
        }, show: function () {
            var t, i, n, r, a, o, s = e.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(s), s.isDefaultPrevented())return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), a = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), i = this.getPosition(), n = t[0].offsetWidth, r = t[0].offsetHeight, a) {
                    case"bottom":
                        o = {top: i.top + i.height, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"top":
                        o = {top: i.top - r, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"left":
                        o = {top: i.top + i.height / 2 - r / 2, left: i.left - n};
                        break;
                    case"right":
                        o = {top: i.top + i.height / 2 - r / 2, left: i.left + i.width}
                }
                this.applyPlacement(o, a), this.$element.trigger("shown")
            }
        }, applyPlacement: function (e, t) {
            var i, n, r, a, o = this.tip(), s = o[0].offsetWidth, l = o[0].offsetHeight;
            o.offset(e).addClass(t).addClass("in"), i = o[0].offsetWidth, n = o[0].offsetHeight, "top" == t && n != l && (e.top = e.top + l - n, a = !0), "bottom" == t || "top" == t ? (r = 0, e.left < 0 && (r = -2 * e.left, e.left = 0, o.offset(e), i = o[0].offsetWidth, n = o[0].offsetHeight), this.replaceArrow(r - s + i, i, "left")) : this.replaceArrow(n - l, n, "top"), a && o.offset(e)
        }, replaceArrow: function (e, t, i) {
            this.arrow().css(i, e ? 50 * (1 - e / t) + "%" : "")
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function t() {
                var t = setTimeout(function () {
                    i.off(e.support.transition.end).detach()
                }, 500);
                i.one(e.support.transition.end, function () {
                    clearTimeout(t), i.detach()
                })
            }

            var i = this.tip(), n = e.Event("hide");
            return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (i.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : i.detach(), this.$element.trigger("hidden"), this)
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
            var e, t = this.$element, i = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(t[0]) : i.title)
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
            var i = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            i.tip().hasClass("in") ? i.hide() : i.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var i = e.fn.tooltip;
    e.fn.tooltip = function (i) {
        return this.each(function () {
            var n = e(this), r = n.data("tooltip"), a = "object" == typeof i && i;
            r || n.data("tooltip", r = new t(this, a)), "string" == typeof i && r[i]()
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
        return e.fn.tooltip = i, this
    }
}(window.jQuery), !function (e) {
    function t() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    var i = function (t, i) {
        var n = this;
        this.element = e(t), this.container = i.container || "body", this.language = i.language || this.element.data("date-language") || "en", this.language = this.language in r ? this.language : "en", this.isRTL = r[this.language].rtl || !1, this.formatType = i.formatType || this.element.data("format-type") || "standard", this.format = a.parseFormat(i.format || this.element.data("date-format") || r[this.language].format || a.getDefaultFormat(this.formatType, "input"), this.formatType), this.isInline = !1, this.isVisible = !1, this.isInput = this.element.is("input"), this.fontAwesome = i.fontAwesome || this.element.data("font-awesome") || !1, this.bootcssVer = i.bootcssVer || (this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2), this.component = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar .fa-calendar .fa-clock-o").parent() : !1, this.componentReset = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove, .input-group-addon .fa-times").parent() : this.element.find(".add-on .icon-remove, .add-on .fa-times").parent() : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.linkField = i.linkField || this.element.data("link-field") || !1, this.linkFormat = a.parseFormat(i.linkFormat || this.element.data("link-format") || a.getDefaultFormat(this.formatType, "link"), this.formatType), this.minuteStep = i.minuteStep || this.element.data("minute-step") || 5, this.pickerPosition = i.pickerPosition || this.element.data("picker-position") || "bottom-right", this.showMeridian = i.showMeridian || this.element.data("show-meridian") || !1, this.initialDate = i.initialDate || new Date, this.zIndex = i.zIndex || this.element.data("z-index") || void 0, this.icons = {
            leftArrow: this.fontAwesome ? "fa-arrow-left" : 3 === this.bootcssVer ? "glyphicon-arrow-left" : "icon-arrow-left",
            rightArrow: this.fontAwesome ? "fa-arrow-right" : 3 === this.bootcssVer ? "glyphicon-arrow-right" : "icon-arrow-right"
        }, this.icontype = this.fontAwesome ? "fa" : "glyphicon", this._attachEvents(), this.formatViewType = "datetime", "formatViewType" in i ? this.formatViewType = i.formatViewType : "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType")), this.minView = 0, "minView" in i ? this.minView = i.minView : "minView" in this.element.data() && (this.minView = this.element.data("min-view")), this.minView = a.convertViewMode(this.minView), this.maxView = a.modes.length - 1, "maxView" in i ? this.maxView = i.maxView : "maxView" in this.element.data() && (this.maxView = this.element.data("max-view")), this.maxView = a.convertViewMode(this.maxView), this.wheelViewModeNavigation = !1, "wheelViewModeNavigation" in i ? this.wheelViewModeNavigation = i.wheelViewModeNavigation : "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")), this.wheelViewModeNavigationInverseDirection = !1, "wheelViewModeNavigationInverseDirection" in i ? this.wheelViewModeNavigationInverseDirection = i.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")), this.wheelViewModeNavigationDelay = 100, "wheelViewModeNavigationDelay" in i ? this.wheelViewModeNavigationDelay = i.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")), this.startViewMode = 2, "startView" in i ? this.startViewMode = i.startView : "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view")), this.startViewMode = a.convertViewMode(this.startViewMode), this.viewMode = this.startViewMode, this.viewSelect = this.minView, "viewSelect" in i ? this.viewSelect = i.viewSelect : "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select")), this.viewSelect = a.convertViewMode(this.viewSelect), this.forceParse = !0, "forceParse" in i ? this.forceParse = i.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse"));
        for (var o = 3 === this.bootcssVer ? a.templateV3 : a.template; -1 !== o.indexOf("{iconType}");)o = o.replace("{iconType}", this.icontype);
        for (; -1 !== o.indexOf("{leftArrow}");)o = o.replace("{leftArrow}", this.icons.leftArrow);
        for (; -1 !== o.indexOf("{rightArrow}");)o = o.replace("{rightArrow}", this.icons.rightArrow);
        if (this.picker = e(o).appendTo(this.isInline ? this.element : this.container).on({
                click: e.proxy(this.click, this),
                mousedown: e.proxy(this.mousedown, this)
            }), this.wheelViewModeNavigation && (e.fn.mousewheel ? this.picker.on({mousewheel: e.proxy(this.mousewheel, this)}) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")), this.picker.addClass(this.isInline ? "datetimepicker-inline" : "datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu"), this.isRTL) {
            this.picker.addClass("datetimepicker-rtl");
            var s = 3 === this.bootcssVer ? ".prev span, .next span" : ".prev i, .next i";
            this.picker.find(s).toggleClass(this.icons.leftArrow + " " + this.icons.rightArrow)
        }
        e(document).on("mousedown", function (t) {
            0 === e(t.target).closest(".datetimepicker").length && n.hide()
        }), this.autoclose = !1, "autoclose" in i ? this.autoclose = i.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation" in i ? this.keyboardNavigation = i.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.todayBtn = i.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = i.todayHighlight || this.element.data("date-today-highlight") || !1, this.weekStart = (i.weekStart || this.element.data("date-weekstart") || r[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -1 / 0, this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(i.startDate || this.element.data("date-startdate")), this.setEndDate(i.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(i.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.setMinutesDisabled(i.minutesDisabled || this.element.data("date-minute-disabled")), this.setHoursDisabled(i.hoursDisabled || this.element.data("date-hour-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
    };
    i.prototype = {
        constructor: i, _events: [], _attachEvents: function () {
            this._detachEvents(), this.isInput ? this._events = [[this.element, {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }], [this.component, {click: e.proxy(this.show, this)}]], this.componentReset && this._events.push([this.componentReset, {click: e.proxy(this.reset, this)}])) : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: e.proxy(this.show, this)}]];
            for (var t, i, n = 0; n < this._events.length; n++)t = this._events[n][0], i = this._events[n][1], t.on(i)
        }, _detachEvents: function () {
            for (var e, t, i = 0; i < this._events.length; i++)e = this._events[i][0], t = this._events[i][1], e.off(t);
            this._events = []
        }, show: function (t) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.forceParse && this.update(), this.place(), e(window).on("resize", e.proxy(this.place, this)), t && (t.stopPropagation(), t.preventDefault()), this.isVisible = !0, this.element.trigger({
                type: "show",
                date: this.date
            })
        }, hide: function () {
            this.isVisible && (this.isInline || (this.picker.hide(), e(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || e(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.isVisible = !1, this.element.trigger({
                type: "hide",
                date: this.date
            })))
        }, remove: function () {
            this._detachEvents(), this.picker.remove(), delete this.picker, delete this.element.data().datetimepicker
        }, getDate: function () {
            var e = this.getUTCDate();
            return new Date(e.getTime() + 6e4 * e.getTimezoneOffset())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (e) {
            this.setUTCDate(new Date(e.getTime() - 6e4 * e.getTimezoneOffset()))
        }, setUTCDate: function (e) {
            e >= this.startDate && e <= this.endDate ? (this.date = e, this.setValue(), this.viewDate = this.date, this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: e,
                startDate: this.startDate,
                endDate: this.endDate
            })
        }, setFormat: function (e) {
            this.format = a.parseFormat(e, this.formatType);
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val() && this.setValue()
        }, setValue: function () {
            var t = this.getFormattedDate();
            this.isInput ? this.element.val(t) : (this.component && this.element.find("input").val(t), this.element.data("date", t)), this.linkField && e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        }, getFormattedDate: function (e) {
            return void 0 == e && (e = this.format), a.formatDate(this.date, e, this.language, this.formatType)
        }, setStartDate: function (e) {
            this.startDate = e || -1 / 0, this.startDate !== -1 / 0 && (this.startDate = a.parseDate(this.startDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setEndDate: function (e) {
            this.endDate = e || 1 / 0, 1 / 0 !== this.endDate && (this.endDate = a.parseDate(this.endDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (t) {
            this.daysOfWeekDisabled = t || [], e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function (e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        }, setMinutesDisabled: function (t) {
            this.minutesDisabled = t || [], e.isArray(this.minutesDisabled) || (this.minutesDisabled = this.minutesDisabled.split(/,\s*/)), this.minutesDisabled = e.map(this.minutesDisabled, function (e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        }, setHoursDisabled: function (t) {
            this.hoursDisabled = t || [], e.isArray(this.hoursDisabled) || (this.hoursDisabled = this.hoursDisabled.split(/,\s*/)), this.hoursDisabled = e.map(this.hoursDisabled, function (e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                if (!this.zIndex) {
                    var t = 0;
                    e("div").each(function () {
                        var i = parseInt(e(this).css("zIndex"), 10);
                        i > t && (t = i)
                    }), this.zIndex = t + 10
                }
                var i, n, r, a;
                a = this.container instanceof e ? this.container.offset() : e(this.container).offset(), this.component ? (i = this.component.offset(), r = i.left, ("bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition) && (r += this.component.outerWidth() - this.picker.outerWidth())) : (i = this.element.offset(), r = i.left), r + 220 > document.body.clientWidth && (r = document.body.clientWidth - 220), n = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? i.top - this.picker.outerHeight() : i.top + this.height, n -= a.top, r -= a.left, "body" != this.container && (n += document.body.scrollTop), this.picker.css({
                    top: n,
                    left: r,
                    zIndex: this.zIndex
                })
            }
        }, update: function () {
            var e, t = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (e = arguments[0], t = !0) : (e = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate, ("string" == typeof e || e instanceof String) && (e = e.replace(/^\s+|\s+$/g, ""))), e || (e = new Date, t = !1), this.date = a.parseDate(e, this.format, this.language, this.formatType), t && this.setValue(), this.viewDate = new Date(this.date < this.startDate ? this.startDate : this.date > this.endDate ? this.endDate : this.date), this.fill()
        }, fillDow: function () {
            for (var e = this.weekStart, t = "<tr>"; e < this.weekStart + 7;)t += '<th class="dow">' + r[this.language].daysMin[e++ % 7] + "</th>";
            t += "</tr>", this.picker.find(".datetimepicker-days thead").append(t)
        }, fillMonths: function () {
            for (var e = "", t = 0; 12 > t;)e += '<span class="month">' + r[this.language].monthsShort[t++] + "</span>";
            this.picker.find(".datetimepicker-months td").html(e)
        }, fill: function () {
            if (null != this.date && null != this.viewDate) {
                var i = new Date(this.viewDate), n = i.getUTCFullYear(), o = i.getUTCMonth(), s = i.getUTCDate(), l = i.getUTCHours(), c = i.getUTCMinutes(), u = this.startDate !== -1 / 0 ? this.startDate.getUTCFullYear() : -1 / 0, d = this.startDate !== -1 / 0 ? this.startDate.getUTCMonth() + 1 : -1 / 0, h = 1 / 0 !== this.endDate ? this.endDate.getUTCFullYear() : 1 / 0, p = 1 / 0 !== this.endDate ? this.endDate.getUTCMonth() + 1 : 1 / 0, f = new t(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(), m = new Date;
                if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(r[this.language].months[o] + " " + n), "time" == this.formatViewType) {
                    var g = this.getFormattedDate();
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(g), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(g)
                } else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(s + " " + r[this.language].months[o] + " " + n), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(s + " " + r[this.language].months[o] + " " + n);
                this.picker.find("tfoot th.today").text(r[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var v = t(n, o - 1, 28, 0, 0, 0, 0), b = a.getDaysInMonth(v.getUTCFullYear(), v.getUTCMonth());
                v.setUTCDate(b), v.setUTCDate(b - (v.getUTCDay() - this.weekStart + 7) % 7);
                var y = new Date(v);
                y.setUTCDate(y.getUTCDate() + 42), y = y.valueOf();
                for (var C, S = []; v.valueOf() < y;)v.getUTCDay() == this.weekStart && S.push("<tr>"), C = "", v.getUTCFullYear() < n || v.getUTCFullYear() == n && v.getUTCMonth() < o ? C += " old" : (v.getUTCFullYear() > n || v.getUTCFullYear() == n && v.getUTCMonth() > o) && (C += " new"), this.todayHighlight && v.getUTCFullYear() == m.getFullYear() && v.getUTCMonth() == m.getMonth() && v.getUTCDate() == m.getDate() && (C += " today"), v.valueOf() == f && (C += " active"), (v.valueOf() + 864e5 <= this.startDate || v.valueOf() > this.endDate || -1 !== e.inArray(v.getUTCDay(), this.daysOfWeekDisabled)) && (C += " disabled"), S.push('<td class="day' + C + '">' + v.getUTCDate() + "</td>"), v.getUTCDay() == this.weekEnd && S.push("</tr>"), v.setUTCDate(v.getUTCDate() + 1);
                this.picker.find(".datetimepicker-days tbody").empty().append(S.join("")), S = [];
                for (var w = "", _ = "", T = "", D = this.hoursDisabled || [], x = 0; 24 > x; x++)if (-1 === D.indexOf(x)) {
                    var k = t(n, o, s, x);
                    C = "", k.valueOf() + 36e5 <= this.startDate || k.valueOf() > this.endDate ? C += " disabled" : l == x && (C += " active"), this.showMeridian && 2 == r[this.language].meridiem.length ? (_ = 12 > x ? r[this.language].meridiem[0] : r[this.language].meridiem[1], _ != T && ("" != T && S.push("</fieldset>"), S.push('<fieldset class="hour"><legend>' + _.toUpperCase() + "</legend>")), T = _, w = x % 12 ? x % 12 : 12, S.push('<span class="hour' + C + " hour_" + (12 > x ? "am" : "pm") + '">' + w + "</span>"), 23 == x && S.push("</fieldset>")) : (w = x + ":00", S.push('<span class="hour' + C + '">' + w + "</span>"))
                }
                this.picker.find(".datetimepicker-hours td").html(S.join("")), S = [], w = "", _ = "", T = "";
                for (var M = this.minutesDisabled || [], x = 0; 60 > x; x += this.minuteStep)if (-1 === M.indexOf(x)) {
                    var k = t(n, o, s, l, x, 0);
                    C = "", k.valueOf() < this.startDate || k.valueOf() > this.endDate ? C += " disabled" : Math.floor(c / this.minuteStep) == Math.floor(x / this.minuteStep) && (C += " active"), this.showMeridian && 2 == r[this.language].meridiem.length ? (_ = 12 > l ? r[this.language].meridiem[0] : r[this.language].meridiem[1], _ != T && ("" != T && S.push("</fieldset>"), S.push('<fieldset class="minute"><legend>' + _.toUpperCase() + "</legend>")), T = _, w = l % 12 ? l % 12 : 12, S.push('<span class="minute' + C + '">' + w + ":" + (10 > x ? "0" + x : x) + "</span>"), 59 == x && S.push("</fieldset>")) : (w = x + ":00", S.push('<span class="minute' + C + '">' + l + ":" + (10 > x ? "0" + x : x) + "</span>"))
                }
                this.picker.find(".datetimepicker-minutes td").html(S.join(""));
                var P = this.date.getUTCFullYear(), L = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(n).end().find("span").removeClass("active");
                P == n && L.eq(this.date.getUTCMonth() + 2).addClass("active"), (u > n || n > h) && L.addClass("disabled"), n == u && L.slice(0, d + 1).addClass("disabled"), n == h && L.slice(p).addClass("disabled"), S = "", n = 10 * parseInt(n / 10, 10);
                var F = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(n + "-" + (n + 9)).end().find("td");
                n -= 1;
                for (var x = -1; 11 > x; x++)S += '<span class="year' + (-1 == x || 10 == x ? " old" : "") + (P == n ? " active" : "") + (u > n || n > h ? " disabled" : "") + '">' + n + "</span>", n += 1;
                F.html(S), this.place()
            }
        }, updateNavArrows: function () {
            var e = new Date(this.viewDate), t = e.getUTCFullYear(), i = e.getUTCMonth(), n = e.getUTCDate(), r = e.getUTCHours();
            switch (this.viewMode) {
                case 0:
                    this.picker.find(".prev").css(this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() && r <= this.startDate.getUTCHours() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.endDate && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() && r >= this.endDate.getUTCHours() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 1:
                    this.picker.find(".prev").css(this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.endDate && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 2:
                    this.picker.find(".prev").css(this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.endDate && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"});
                    break;
                case 3:
                case 4:
                    this.picker.find(".prev").css(this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.endDate && t >= this.endDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"})
            }
        }, mousewheel: function (t) {
            if (t.preventDefault(), t.stopPropagation(), !this.wheelPause) {
                this.wheelPause = !0;
                var i = t.originalEvent, n = i.wheelDelta, r = n > 0 ? 1 : 0 === n ? 0 : -1;
                this.wheelViewModeNavigationInverseDirection && (r = -r), this.showMode(r), setTimeout(e.proxy(function () {
                    this.wheelPause = !1
                }, this), this.wheelViewModeNavigationDelay)
            }
        }, click: function (i) {
            i.stopPropagation(), i.preventDefault();
            var n = e(i.target).closest("span, td, th, legend");
            if (n.is("." + this.icontype) && (n = e(n).parent().closest("span, td, th, legend")), 1 == n.length) {
                if (n.is(".disabled"))return void this.element.trigger({
                    type: "outOfRange",
                    date: this.viewDate,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                switch (n[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (n[0].className) {
                            case"switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                var r = a.modes[this.viewMode].navStep * ("prev" == n[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, r);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, r);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, r);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, r)
                                }
                                this.fill(), this.element.trigger({
                                    type: n[0].className + ":" + this.convertViewModeText(this.viewMode),
                                    date: this.viewDate,
                                    startDate: this.startDate,
                                    endDate: this.endDate
                                });
                                break;
                            case"today":
                                var o = new Date;
                                o = t(o.getFullYear(), o.getMonth(), o.getDate(), o.getHours(), o.getMinutes(), o.getSeconds(), 0), o < this.startDate ? o = this.startDate : o > this.endDate && (o = this.endDate), this.viewMode = this.startViewMode, this.showMode(0), this._setDate(o), this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"span":
                        if (!n.is(".disabled")) {
                            var s = this.viewDate.getUTCFullYear(), l = this.viewDate.getUTCMonth(), c = this.viewDate.getUTCDate(), u = this.viewDate.getUTCHours(), d = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                            if (n.is(".month") ? (this.viewDate.setUTCDate(1), l = n.parent().find("span").index(n), c = this.viewDate.getUTCDate(), this.viewDate.setUTCMonth(l), this.element.trigger({
                                    type: "changeMonth",
                                    date: this.viewDate
                                }), this.viewSelect >= 3 && this._setDate(t(s, l, c, u, d, h, 0))) : n.is(".year") ? (this.viewDate.setUTCDate(1), s = parseInt(n.text(), 10) || 0, this.viewDate.setUTCFullYear(s), this.element.trigger({
                                    type: "changeYear",
                                    date: this.viewDate
                                }), this.viewSelect >= 4 && this._setDate(t(s, l, c, u, d, h, 0))) : n.is(".hour") ? (u = parseInt(n.text(), 10) || 0, (n.hasClass("hour_am") || n.hasClass("hour_pm")) && (12 == u && n.hasClass("hour_am") ? u = 0 : 12 != u && n.hasClass("hour_pm") && (u += 12)), this.viewDate.setUTCHours(u), this.element.trigger({
                                    type: "changeHour",
                                    date: this.viewDate
                                }), this.viewSelect >= 1 && this._setDate(t(s, l, c, u, d, h, 0))) : n.is(".minute") && (d = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0, this.viewDate.setUTCMinutes(d), this.element.trigger({
                                    type: "changeMinute",
                                    date: this.viewDate
                                }), this.viewSelect >= 0 && this._setDate(t(s, l, c, u, d, h, 0))), 0 != this.viewMode) {
                                var p = this.viewMode;
                                this.showMode(-1), this.fill(), p == this.viewMode && this.autoclose && this.hide()
                            } else this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"td":
                        if (n.is(".day") && !n.is(".disabled")) {
                            var c = parseInt(n.text(), 10) || 1, s = this.viewDate.getUTCFullYear(), l = this.viewDate.getUTCMonth(), u = this.viewDate.getUTCHours(), d = this.viewDate.getUTCMinutes(), h = this.viewDate.getUTCSeconds();
                            n.is(".old") ? 0 === l ? (l = 11, s -= 1) : l -= 1 : n.is(".new") && (11 == l ? (l = 0, s += 1) : l += 1), this.viewDate.setUTCFullYear(s), this.viewDate.setUTCMonth(l, c), this.element.trigger({
                                type: "changeDay",
                                date: this.viewDate
                            }), this.viewSelect >= 2 && this._setDate(t(s, l, c, u, d, h, 0))
                        }
                        var p = this.viewMode;
                        this.showMode(-1), this.fill(), p == this.viewMode && this.autoclose && this.hide()
                }
            }
        }, _setDate: function (e, t) {
            t && "date" != t || (this.date = e), t && "view" != t || (this.viewDate = e), this.fill(), this.setValue();
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && (i.change(), this.autoclose && (!t || "date" == t)), this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        }, moveMinute: function (e, t) {
            if (!t)return e;
            var i = new Date(e.valueOf());
            return i.setUTCMinutes(i.getUTCMinutes() + t * this.minuteStep), i
        }, moveHour: function (e, t) {
            if (!t)return e;
            var i = new Date(e.valueOf());
            return i.setUTCHours(i.getUTCHours() + t), i
        }, moveDate: function (e, t) {
            if (!t)return e;
            var i = new Date(e.valueOf());
            return i.setUTCDate(i.getUTCDate() + t), i
        }, moveMonth: function (e, t) {
            if (!t)return e;
            var i, n, r = new Date(e.valueOf()), a = r.getUTCDate(), o = r.getUTCMonth(), s = Math.abs(t);
            if (t = t > 0 ? 1 : -1, 1 == s) n = -1 == t ? function () {
                return r.getUTCMonth() == o
            } : function () {
                return r.getUTCMonth() != i
            }, i = o + t, r.setUTCMonth(i), (0 > i || i > 11) && (i = (i + 12) % 12); else {
                for (var l = 0; s > l; l++)r = this.moveMonth(r, t);
                i = r.getUTCMonth(), r.setUTCDate(a), n = function () {
                    return i != r.getUTCMonth()
                }
            }
            for (; n();)r.setUTCDate(--a), r.setUTCMonth(i);
            return r
        }, moveYear: function (e, t) {
            return this.moveMonth(e, 12 * t)
        }, dateWithinRange: function (e) {
            return e >= this.startDate && e <= this.endDate
        }, keydown: function (e) {
            if (this.picker.is(":not(:visible)"))return void(27 == e.keyCode && this.show());
            var t, i, n, r = !1;
            switch (e.keyCode) {
                case 27:
                    this.hide(), e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation)break;
                    t = 37 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, t), n = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (i = this.moveMonth(this.date, t), n = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (i = this.moveDate(this.date, t), n = this.moveDate(this.viewDate, t)) : 1 == viewMode ? (i = this.moveHour(this.date, t), n = this.moveHour(this.viewDate, t)) : 0 == viewMode && (i = this.moveMinute(this.date, t), n = this.moveMinute(this.viewDate, t)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), e.preventDefault(), r = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation)break;
                    t = 38 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, t), n = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (i = this.moveMonth(this.date, t), n = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (i = this.moveDate(this.date, 7 * t), n = this.moveDate(this.viewDate, 7 * t)) : 1 == viewMode ? this.showMeridian ? (i = this.moveHour(this.date, 6 * t), n = this.moveHour(this.viewDate, 6 * t)) : (i = this.moveHour(this.date, 4 * t), n = this.moveHour(this.viewDate, 4 * t)) : 0 == viewMode && (i = this.moveMinute(this.date, 4 * t), n = this.moveMinute(this.viewDate, 4 * t)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), e.preventDefault(), r = !0);
                    break;
                case 13:
                    if (0 != this.viewMode) {
                        var a = this.viewMode;
                        this.showMode(-1), this.fill(), a == this.viewMode && this.autoclose && this.hide()
                    } else this.fill(), this.autoclose && this.hide();
                    e.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (r) {
                var o;
                this.isInput ? o = this.element : this.component && (o = this.element.find("input")), o && o.change(), this.element.trigger({
                    type: "changeDate",
                    date: this.date
                })
            }
        }, showMode: function (e) {
            if (e) {
                var t = Math.max(0, Math.min(a.modes.length - 1, this.viewMode + e));
                t >= this.minView && t <= this.maxView && (this.element.trigger({
                    type: "changeMode",
                    date: this.viewDate,
                    oldViewMode: this.viewMode,
                    newViewMode: t
                }), this.viewMode = t)
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + a.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }, reset: function () {
            this._setDate(null, "date")
        }, convertViewModeText: function (e) {
            switch (e) {
                case 4:
                    return "decade";
                case 3:
                    return "year";
                case 2:
                    return "month";
                case 1:
                    return "day";
                case 0:
                    return "hour"
            }
        }
    };
    var n = e.fn.datetimepicker;
    e.fn.datetimepicker = function (t) {
        var n = Array.apply(null, arguments);
        n.shift();
        var r;
        return this.each(function () {
            var a = e(this), o = a.data("datetimepicker"), s = "object" == typeof t && t;
            return o || a.data("datetimepicker", o = new i(this, e.extend({}, e.fn.datetimepicker.defaults, s))), "string" == typeof t && "function" == typeof o[t] && (r = o[t].apply(o, n), void 0 !== r) ? !1 : void 0
        }), void 0 !== r ? r : this
    }, e.fn.datetimepicker.defaults = {}, e.fn.datetimepicker.Constructor = i;
    var r = e.fn.datetimepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today"
        }
    }, a = {
        modes: [{clsName: "minutes", navFnc: "Hours", navStep: 1}, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {clsName: "days", navFnc: "Month", navStep: 1}, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        },
        getDaysInMonth: function (e, t) {
            return [31, a.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        getDefaultFormat: function (e, t) {
            if ("standard" == e)return "input" == t ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if ("php" == e)return "input" == t ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw new Error("Invalid format type.")
        },
        validParts: function (e) {
            if ("standard" == e)return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == e)return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.")
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function (e, t) {
            var i = e.replace(this.validParts(t), "\x00").split("\x00"), n = e.match(this.validParts(t));
            if (!i || !i.length || !n || 0 == n.length)throw new Error("Invalid date format.");
            return {separators: i, parts: n}
        },
        parseDate: function (n, a, o, s) {
            if (n instanceof Date) {
                var l = new Date(n.valueOf() - 6e4 * n.getTimezoneOffset());
                return l.setMilliseconds(0), l
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(n) && (a = this.parseFormat("yyyy-mm-dd", s)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(n) && (a = this.parseFormat("yyyy-mm-dd hh:ii", s)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(n) && (a = this.parseFormat("yyyy-mm-dd hh:ii:ss", s)), /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)) {
                var c, u, d = /([-+]\d+)([dmwy])/, h = n.match(/([-+]\d+)([dmwy])/g);
                n = new Date;
                for (var p = 0; p < h.length; p++)switch (c = d.exec(h[p]), u = parseInt(c[1]), c[2]) {
                    case"d":
                        n.setUTCDate(n.getUTCDate() + u);
                        break;
                    case"m":
                        n = i.prototype.moveMonth.call(i.prototype, n, u);
                        break;
                    case"w":
                        n.setUTCDate(n.getUTCDate() + 7 * u);
                        break;
                    case"y":
                        n = i.prototype.moveYear.call(i.prototype, n, u)
                }
                return t(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), 0)
            }
            var f, m, c, h = n && n.toString().match(this.nonpunctuation) || [], n = new Date(0, 0, 0, 0, 0, 0, 0), g = {}, v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"], b = {
                hh: function (e, t) {
                    return e.setUTCHours(t)
                }, h: function (e, t) {
                    return e.setUTCHours(t)
                }, HH: function (e, t) {
                    return e.setUTCHours(12 == t ? 0 : t)
                }, H: function (e, t) {
                    return e.setUTCHours(12 == t ? 0 : t)
                }, ii: function (e, t) {
                    return e.setUTCMinutes(t)
                }, i: function (e, t) {
                    return e.setUTCMinutes(t)
                }, ss: function (e, t) {
                    return e.setUTCSeconds(t)
                }, s: function (e, t) {
                    return e.setUTCSeconds(t)
                }, yyyy: function (e, t) {
                    return e.setUTCFullYear(t)
                }, yy: function (e, t) {
                    return e.setUTCFullYear(2e3 + t)
                }, m: function (e, t) {
                    for (t -= 1; 0 > t;)t += 12;
                    for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() != t;) {
                        if (isNaN(e.getUTCMonth()))return e;
                        e.setUTCDate(e.getUTCDate() - 1)
                    }
                    return e
                }, d: function (e, t) {
                    return e.setUTCDate(t)
                }, p: function (e, t) {
                    return e.setUTCHours(1 == t ? e.getUTCHours() + 12 : e.getUTCHours())
                }
            };
            if (b.M = b.MM = b.mm = b.m, b.dd = b.d, b.P = b.p, n = t(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()), h.length == a.parts.length) {
                for (var p = 0, y = a.parts.length; y > p; p++) {
                    if (f = parseInt(h[p], 10), c = a.parts[p], isNaN(f))switch (c) {
                        case"MM":
                            m = e(r[o].months).filter(function () {
                                var e = this.slice(0, h[p].length), t = h[p].slice(0, e.length);
                                return e == t
                            }), f = e.inArray(m[0], r[o].months) + 1;
                            break;
                        case"M":
                            m = e(r[o].monthsShort).filter(function () {
                                var e = this.slice(0, h[p].length), t = h[p].slice(0, e.length);
                                return e.toLowerCase() == t.toLowerCase()
                            }), f = e.inArray(m[0], r[o].monthsShort) + 1;
                            break;
                        case"p":
                        case"P":
                            f = e.inArray(h[p].toLowerCase(), r[o].meridiem)
                    }
                    g[c] = f
                }
                for (var C, p = 0; p < v.length; p++)C = v[p], C in g && !isNaN(g[C]) && b[C](n, g[C])
            }
            return n
        },
        formatDate: function (t, i, n, o) {
            if (null == t)return "";
            var s;
            if ("standard" == o) s = {
                yy: t.getUTCFullYear().toString().substring(2),
                yyyy: t.getUTCFullYear(),
                m: t.getUTCMonth() + 1,
                M: r[n].monthsShort[t.getUTCMonth()],
                MM: r[n].months[t.getUTCMonth()],
                d: t.getUTCDate(),
                D: r[n].daysShort[t.getUTCDay()],
                DD: r[n].days[t.getUTCDay()],
                p: 2 == r[n].meridiem.length ? r[n].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                h: t.getUTCHours(),
                i: t.getUTCMinutes(),
                s: t.getUTCSeconds()
            }, s.H = 2 == r[n].meridiem.length ? s.h % 12 == 0 ? 12 : s.h % 12 : s.h, s.HH = (s.H < 10 ? "0" : "") + s.H, s.P = s.p.toUpperCase(), s.hh = (s.h < 10 ? "0" : "") + s.h, s.ii = (s.i < 10 ? "0" : "") + s.i, s.ss = (s.s < 10 ? "0" : "") + s.s, s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m; else {
                if ("php" != o)throw new Error("Invalid format type.");
                s = {
                    y: t.getUTCFullYear().toString().substring(2),
                    Y: t.getUTCFullYear(),
                    F: r[n].months[t.getUTCMonth()],
                    M: r[n].monthsShort[t.getUTCMonth()],
                    n: t.getUTCMonth() + 1,
                    t: a.getDaysInMonth(t.getUTCFullYear(), t.getUTCMonth()),
                    j: t.getUTCDate(),
                    l: r[n].days[t.getUTCDay()],
                    D: r[n].daysShort[t.getUTCDay()],
                    w: t.getUTCDay(),
                    N: 0 == t.getUTCDay() ? 7 : t.getUTCDay(),
                    S: t.getUTCDate() % 10 <= r[n].suffix.length ? r[n].suffix[t.getUTCDate() % 10 - 1] : "",
                    a: 2 == r[n].meridiem.length ? r[n].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                    g: t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
                    G: t.getUTCHours(),
                    i: t.getUTCMinutes(),
                    s: t.getUTCSeconds()
                }, s.m = (s.n < 10 ? "0" : "") + s.n, s.d = (s.j < 10 ? "0" : "") + s.j, s.A = s.a.toString().toUpperCase(), s.h = (s.g < 10 ? "0" : "") + s.g, s.H = (s.G < 10 ? "0" : "") + s.G, s.i = (s.i < 10 ? "0" : "") + s.i, s.s = (s.s < 10 ? "0" : "") + s.s
            }
            for (var t = [], l = e.extend([], i.separators), c = 0, u = i.parts.length; u > c; c++)l.length && t.push(l.shift()), t.push(s[i.parts[c]]);
            return l.length && t.push(l.shift()), t.join("")
        },
        convertViewMode: function (e) {
            switch (e) {
                case 4:
                case"decade":
                    e = 4;
                    break;
                case 3:
                case"year":
                    e = 3;
                    break;
                case 2:
                case"month":
                    e = 2;
                    break;
                case 1:
                case"day":
                    e = 1;
                    break;
                case 0:
                case"hour":
                    e = 0
            }
            return e
        },
        headTemplate: '<thead><tr><th class="prev"><i class="{leftArrow}"/></th><th colspan="5" class="switch"></th><th class="next"><i class="{rightArrow}"/></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><span class="{iconType} {leftArrow}"></span> </th><th colspan="5" class="switch"></th><th class="next"><span class="{iconType} {rightArrow}"></span> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    a.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + a.headTemplate + "<tbody></tbody>" + a.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + "</table></div></div>", a.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + a.headTemplateV3 + "<tbody></tbody>" + a.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + "</table></div></div>", e.fn.datetimepicker.DPGlobal = a, e.fn.datetimepicker.noConflict = function () {
        return e.fn.datetimepicker = n, this
    }, e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function (t) {
        var i = e(this);
        i.data("datetimepicker") || (t.preventDefault(), i.datetimepicker("show"))
    }), e(function () {
        e('[data-provide="datetimepicker-inline"]').datetimepicker()
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t, setContent: function () {
            var e = this.tip(), t = this.getTitle(), i = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](i), e.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var e, t = this.$element, i = this.options;
            return e = ("function" == typeof i.content ? i.content.call(t[0]) : i.content) || t.attr("data-content")
        }, tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var i = e.fn.popover;
    e.fn.popover = function (i) {
        return this.each(function () {
            var n = e(this), r = n.data("popover"), a = "object" == typeof i && i;
            r || n.data("popover", r = new t(this, a)), "string" == typeof i && r[i]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.fn.popover.noConflict = function () {
        return e.fn.popover = i, this
    }
}(window.jQuery), !function (e) {
    "undefined" != typeof global && "undefined" != typeof exports && (global.hljs = e(exports)), "undefined" != typeof window && (window.hljs = e({})), "function" == typeof define && define.amd && define("hljs", [], function () {
        return window.hljs
    })
}(function (e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function i(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var i = e && e.exec(t);
        return i && 0 == i.index
    }

    function r(e) {
        return /no-?highlight|plain|text/.test(e)
    }

    function a(e) {
        var t, i, n, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "", i = /\blang(?:uage)?-([\w-]+)\b/.exec(a))return C(i[1]) ? i[1] : "no-highlight";
        for (a = a.split(/\s+/), t = 0, n = a.length; n > t; t++)if (C(a[t]) || r(a[t]))return a[t]
    }

    function o(e, t) {
        var i, n = {};
        for (i in e)n[i] = e[i];
        if (t)for (i in t)n[i] = t[i];
        return n
    }

    function s(e) {
        var t = [];
        return function n(e, r) {
            for (var a = e.firstChild; a; a = a.nextSibling)3 == a.nodeType ? r += a.nodeValue.length : 1 == a.nodeType && (t.push({
                event: "start",
                offset: r,
                node: a
            }), r = n(a, r), i(a).match(/br|hr|img|input/) || t.push({event: "stop", offset: r, node: a}));
            return r
        }(e, 0), t
    }

    function l(e, n, r) {
        function a() {
            return e.length && n.length ? e[0].offset != n[0].offset ? e[0].offset < n[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
        }

        function o(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }

            u += "<" + i(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function s(e) {
            u += "</" + i(e) + ">"
        }

        function l(e) {
            ("start" == e.event ? o : s)(e.node)
        }

        for (var c = 0, u = "", d = []; e.length || n.length;) {
            var h = a();
            if (u += t(r.substr(c, h[0].offset - c)), c = h[0].offset, h == e) {
                d.reverse().forEach(s);
                do l(h.splice(0, 1)[0]), h = a(); while (h == e && h.length && h[0].offset == c);
                d.reverse().forEach(o)
            } else"start" == h[0].event ? d.push(h[0].node) : d.pop(), l(h.splice(0, 1)[0])
        }
        return u + t(r.substr(c))
    }

    function c(e) {
        function t(e) {
            return e && e.source || e
        }

        function i(i, n) {
            return new RegExp(t(i), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(r, a) {
            if (!r.compiled) {
                if (r.compiled = !0, r.k = r.k || r.bK, r.k) {
                    var s = {}, l = function (t, i) {
                        e.cI && (i = i.toLowerCase()), i.split(" ").forEach(function (e) {
                            var i = e.split("|");
                            s[i[0]] = [t, i[1] ? Number(i[1]) : 1]
                        })
                    };
                    "string" == typeof r.k ? l("keyword", r.k) : Object.keys(r.k).forEach(function (e) {
                        l(e, r.k[e])
                    }), r.k = s
                }
                r.lR = i(r.l || /\b\w+\b/, !0), a && (r.bK && (r.b = "\\b(" + r.bK.split(" ").join("|") + ")\\b"), r.b || (r.b = /\B|\b/), r.bR = i(r.b), r.e || r.eW || (r.e = /\B|\b/), r.e && (r.eR = i(r.e)), r.tE = t(r.e) || "", r.eW && a.tE && (r.tE += (r.e ? "|" : "") + a.tE)), r.i && (r.iR = i(r.i)), void 0 === r.r && (r.r = 1), r.c || (r.c = []);
                var c = [];
                r.c.forEach(function (e) {
                    e.v ? e.v.forEach(function (t) {
                        c.push(o(e, t))
                    }) : c.push("self" == e ? r : e)
                }), r.c = c, r.c.forEach(function (e) {
                    n(e, r)
                }), r.starts && n(r.starts, a);
                var u = r.c.map(function (e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([r.tE, r.i]).map(t).filter(Boolean);
                r.t = u.length ? i(u.join("|"), !0) : {
                    exec: function () {
                        return null
                    }
                }
            }
        }

        n(e)
    }

    function u(e, i, r, a) {
        function o(e, t) {
            for (var i = 0; i < t.c.length; i++)if (n(t.c[i].bR, e))return t.c[i]
        }

        function s(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;)e = e.parent;
                return e
            }
            return e.eW ? s(e.parent, t) : void 0
        }

        function l(e, t) {
            return !r && n(t.iR, e)
        }

        function h(e, t) {
            var i = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(i) && e.k[i]
        }

        function p(e, t, i, n) {
            var r = n ? "" : S.classPrefix, a = '<span class="' + r, o = i ? "" : "</span>";
            return a += e + '">', a + t + o
        }

        function f() {
            if (!T.k)return t(k);
            var e = "", i = 0;
            T.lR.lastIndex = 0;
            for (var n = T.lR.exec(k); n;) {
                e += t(k.substr(i, n.index - i));
                var r = h(T, n);
                r ? (M += r[1], e += p(r[0], t(n[0]))) : e += t(n[0]), i = T.lR.lastIndex, n = T.lR.exec(k)
            }
            return e + t(k.substr(i))
        }

        function m() {
            var e = "string" == typeof T.sL;
            if (e && !w[T.sL])return t(k);
            var i = e ? u(T.sL, k, !0, D[T.sL]) : d(k, T.sL.length ? T.sL : void 0);
            return T.r > 0 && (M += i.r), e && (D[T.sL] = i.top), p(i.language, i.value, !1, !0)
        }

        function g() {
            return void 0 !== T.sL ? m() : f()
        }

        function v(e, i) {
            var n = e.cN ? p(e.cN, "", !0) : "";
            e.rB ? (x += n, k = "") : e.eB ? (x += t(i) + n, k = "") : (x += n, k = i), T = Object.create(e, {parent: {value: T}})
        }

        function b(e, i) {
            if (k += e, void 0 === i)return x += g(), 0;
            var n = o(i, T);
            if (n)return x += g(), v(n, i), n.rB ? 0 : i.length;
            var r = s(T, i);
            if (r) {
                var a = T;
                a.rE || a.eE || (k += i), x += g();
                do T.cN && (x += "</span>"), M += T.r, T = T.parent; while (T != r.parent);
                return a.eE && (x += t(i)), k = "", r.starts && v(r.starts, ""), a.rE ? 0 : i.length
            }
            if (l(i, T))throw new Error('Illegal lexeme "' + i + '" for mode "' + (T.cN || "<unnamed>") + '"');
            return k += i, i.length || 1
        }

        var y = C(e);
        if (!y)throw new Error('Unknown language: "' + e + '"');
        c(y);
        var _, T = a || y, D = {}, x = "";
        for (_ = T; _ != y; _ = _.parent)_.cN && (x = p(_.cN, "", !0) + x);
        var k = "", M = 0;
        try {
            for (var P, L, F = 0; T.t.lastIndex = F, P = T.t.exec(i), P;)L = b(i.substr(F, P.index - F), P[0]), F = P.index + L;
            for (b(i.substr(F)), _ = T; _.parent; _ = _.parent)_.cN && (x += "</span>");
            return {r: M, value: x, language: e, top: T}
        } catch (N) {
            if (-1 != N.message.indexOf("Illegal"))return {r: 0, value: t(i)};
            throw N
        }
    }

    function d(e, i) {
        i = i || S.languages || Object.keys(w);
        var n = {r: 0, value: t(e)}, r = n;
        return i.forEach(function (t) {
            if (C(t)) {
                var i = u(t, e, !1);
                i.language = t, i.r > r.r && (r = i), i.r > n.r && (r = n, n = i)
            }
        }), r.language && (n.second_best = r), n
    }

    function h(e) {
        return S.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, t) {
            return t.replace(/\t/g, S.tabReplace)
        })), S.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function p(e, t, i) {
        var n = t ? _[t] : i, r = [e.trim()];
        return e.match(/\bhljs\b/) || r.push("hljs"), -1 === e.indexOf(n) && r.push(n), r.join(" ").trim()
    }

    function f(e) {
        var t = a(e);
        if (!r(t)) {
            var i;
            S.useBR ? (i = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), i.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : i = e;
            var n = i.textContent, o = t ? u(t, n, !0) : d(n), c = s(i);
            if (c.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = o.value, o.value = l(c, s(f), n)
            }
            o.value = h(o.value), e.innerHTML = o.value, e.className = p(e.className, t, o.language), e.result = {
                language: o.language,
                re: o.r
            }, o.second_best && (e.second_best = {language: o.second_best.language, re: o.second_best.r})
        }
    }

    function m(e) {
        S = o(S, e)
    }

    function g() {
        if (!g.called) {
            g.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }

    function v() {
        addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
    }

    function b(t, i) {
        var n = w[t] = i(e);
        n.aliases && n.aliases.forEach(function (e) {
            _[e] = t
        })
    }

    function y() {
        return Object.keys(w)
    }

    function C(e) {
        return w[e] || w[_[e]]
    }

    var S = {classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0}, w = {}, _ = {};
    return e.highlight = u, e.highlightAuto = d, e.fixMarkup = h, e.highlightBlock = f, e.configure = m, e.initHighlighting = g, e.initHighlightingOnLoad = v, e.registerLanguage = b, e.listLanguages = y, e.getLanguage = C, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE]}, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/}, e.C = function (t, i, n) {
        var r = e.inherit({cN: "comment", b: t, e: i, c: []}, n || {});
        return r.c.push(e.PWM), r.c.push({cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0}), r
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {cN: "number", b: e.CNR, r: 0}, e.BNM = {cN: "number", b: e.BNR, r: 0}, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {b: /\[/, e: /\]/, r: 0, c: [e.BE]}]
    }, e.TM = {cN: "title", b: e.IR, r: 0}, e.UTM = {cN: "title", b: e.UIR, r: 0}, e
});
var hljs;
"undefined" != typeof global && (hljs = global.hljs), "undefined" != typeof window && (hljs = window.hljs), hljs.registerLanguage("objectivec", function (e) {
    var t = {
        cN: "built_in",
        b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"
    }, i = {
        keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    }, n = /[a-zA-Z@][a-zA-Z0-9_]*/, r = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: i,
        l: n,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{b: '@"', e: '"', i: "\\n", c: [e.BE]}, {b: "'", e: "[^\\\\]'", i: "[^\\\\][^']"}]
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            c: [{cN: "title", v: [{b: '"', e: '"'}, {b: "<", e: ">"}]}]
        }, {
            cN: "class",
            b: "(" + r.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: r,
            l: n,
            c: [e.UTM]
        }, {cN: "variable", b: "\\." + e.UIR, r: 0}]
    }
}), hljs.registerLanguage("bash", function (e) {
    var t = {cN: "variable", v: [{b: /\$[\w\d#@][\w\d_]*/}, {b: /\$\{(.*?)}/}]}, i = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [e.BE, t, {cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE]}]
    }, n = {cN: "string", b: /'/, e: /'/};
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{cN: "shebang", b: /^#![^\n]+sh\s*$/, r: 10}, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {b: /\w[\w\d_]*/})],
            r: 0
        }, e.HCM, e.NM, i, n, t]
    }
}), hljs.registerLanguage("lisp", function (e) {
    var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*", i = "\\|[^]*?\\|", n = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?", r = {
        cN: "shebang",
        b: "^#!",
        e: "$"
    }, a = {cN: "literal", b: "\\b(t{1}|nil)\\b"}, o = {
        cN: "number",
        v: [{
            b: n,
            r: 0
        }, {b: "#(b|B)[0-1]+(/[0-1]+)?"}, {b: "#(o|O)[0-7]+(/[0-7]+)?"}, {b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"}, {
            b: "#(c|C)\\(" + n + " +" + n,
            e: "\\)"
        }]
    }, s = e.inherit(e.QSM, {i: null}), l = e.C(";", "$", {r: 0}), c = {
        cN: "variable",
        b: "\\*",
        e: "\\*"
    }, u = {cN: "keyword", b: "[:&]" + t}, d = {b: t, r: 0}, h = {b: i}, p = {
        b: "\\(",
        e: "\\)",
        c: ["self", a, s, o, d]
    }, f = {
        cN: "quoted",
        c: [o, s, c, u, p, d],
        v: [{b: "['`]\\(", e: "\\)"}, {b: "\\(quote ", e: "\\)", k: "quote"}, {b: "'" + i}]
    }, m = {cN: "quoted", v: [{b: "'" + t}, {b: "#'" + t + "(::" + t + ")*"}]}, g = {
        cN: "list",
        b: "\\(\\s*",
        e: "\\)"
    }, v = {eW: !0, r: 0};
    return g.c = [{cN: "keyword", v: [{b: t}, {b: i}]}, v], v.c = [f, m, g, a, o, s, l, c, u, h, d], {
        i: /\S/,
        c: [o, r, a, s, l, f, m, g, d]
    }
}), hljs.registerLanguage("scala", function (e) {
    var t = {cN: "annotation", b: "@[A-Za-z]+"}, i = {cN: "string", b: 'u?r?"""', e: '"""', r: 10}, n = {
        cN: "symbol",
        b: "'\\w[\\w\\d_]*(?!')"
    }, r = {cN: "type", b: "\\b[A-Z][A-Za-z0-9_]*", r: 0}, a = {
        cN: "title",
        b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        r: 0
    }, o = {
        cN: "class",
        bK: "class object trait type",
        e: /[:={\[(\n;]/,
        c: [{cN: "keyword", bK: "extends with", r: 10}, a]
    }, s = {cN: "function", bK: "def val", e: /[:={\[(\n;]/, c: [a]};
    return {
        k: {
            literal: "true false null",
            keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
        }, c: [e.CLCM, e.CBCM, i, e.QSM, n, r, s, o, e.CNM, t]
    }
}), hljs.registerLanguage("xml", function (e) {
    var t = "[A-Za-z0-9\\._:-]+", i = {b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php"}, n = {
        eW: !0,
        i: /</,
        r: 0,
        c: [i, {cN: "attribute", b: t, r: 0}, {
            b: "=",
            r: 0,
            c: [{cN: "value", c: [i], v: [{b: /"/, e: /"/}, {b: /'/, e: /'/}, {b: /[^\s\/>]+/}]}]
        }]
    };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{b: "\\[", e: "\\]"}]
        }, e.C("<!--", "-->", {r: 10}), {cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10}, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {title: "style"},
            c: [n],
            starts: {e: "</style>", rE: !0, sL: "css"}
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {title: "script"},
            c: [n],
            starts: {e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars"]}
        }, i, {cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10}, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{cN: "title", b: /[^ \/><\n\t]+/, r: 0}, n]
        }]
    }
}), hljs.registerLanguage("perl", function (e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", i = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: t
    }, n = {b: "->{", e: "}"}, r = {
        cN: "variable",
        v: [{b: /\$\d/}, {b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/}, {b: /[\$%@][^\s\w{]/, r: 0}]
    }, a = [e.BE, i, r], o = [r, e.HCM, e.C("^\\=\\w", "\\=cut", {eW: !0}), n, {
        cN: "string",
        c: a,
        v: [{b: "q[qwxr]?\\s*\\(", e: "\\)", r: 5}, {b: "q[qwxr]?\\s*\\[", e: "\\]", r: 5}, {
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            r: 5
        }, {b: "q[qwxr]?\\s*\\|", e: "\\|", r: 5}, {b: "q[qwxr]?\\s*\\<", e: "\\>", r: 5}, {
            b: "qw\\s+q",
            e: "q",
            r: 5
        }, {b: "'", e: "'", c: [e.BE]}, {b: '"', e: '"'}, {b: "`", e: "`", c: [e.BE]}, {
            b: "{\\w+}",
            c: [],
            r: 0
        }, {b: "-?\\w+\\s*\\=\\>", c: [], r: 0}]
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [e.HCM, {cN: "regexp", b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*", r: 10}, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [e.BE],
            r: 0
        }]
    }, {cN: "sub", bK: "sub", e: "(\\s*\\(.*?\\))?[;{]", r: 5}, {cN: "operator", b: "-\\w\\b", r: 0}, {
        b: "^__DATA__$",
        e: "^__END__$",
        sL: "mojolicious",
        c: [{b: "^@@.*", e: "$", cN: "comment"}]
    }];
    return i.c = o, n.c = o, {aliases: ["pl"], k: t, c: o}
}), hljs.registerLanguage("markdown", function () {
    return {
        aliases: ["md", "mkdown", "mkd"],
        c: [{cN: "header", v: [{b: "^#{1,6}", e: "$"}, {b: "^.+?\\n[=-]{2,}$"}]}, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+"}, {cN: "strong", b: "[*_]{2}.+?[*_]{2}"}, {
            cN: "emphasis",
            v: [{b: "\\*.+?\\*"}, {b: "_.+?_", r: 0}]
        }, {cN: "blockquote", b: "^>\\s+", e: "$"}, {
            cN: "code",
            v: [{b: "`.+?`"}, {b: "^( {4}|	)", e: "$", r: 0}]
        }, {cN: "horizontal_rule", b: "^[-\\*]{3,}", e: "$"}, {
            b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            rB: !0,
            c: [{cN: "link_label", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0}, {
                cN: "link_url",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {cN: "link_reference", b: "\\]\\[", e: "\\]", eB: !0, eE: !0}],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            rB: !0,
            c: [{cN: "link_reference", b: "\\[", e: "\\]:", eB: !0, eE: !0, starts: {cN: "link_url", e: "$"}}]
        }]
    }
}), hljs.registerLanguage("python", function (e) {
    var t = {cN: "prompt", b: /^(>>>|\.\.\.) /}, i = {
        cN: "string",
        c: [e.BE],
        v: [{b: /(u|b)?r?'''/, e: /'''/, c: [t], r: 10}, {b: /(u|b)?r?"""/, e: /"""/, c: [t], r: 10}, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {b: /(u|r|ur)"/, e: /"/, r: 10}, {b: /(b|br)'/, e: /'/}, {b: /(b|br)"/, e: /"/}, e.ASM, e.QSM]
    }, n = {
        cN: "number",
        r: 0,
        v: [{b: e.BNR + "[lLjJ]?"}, {b: "\\b(0o[0-7]+)[lLjJ]?"}, {b: e.CNR + "[lLjJ]?"}]
    }, r = {cN: "params", b: /\(/, e: /\)/, c: ["self", t, n, i]};
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, n, i, e.HCM, {
            v: [{cN: "function", bK: "def", r: 10}, {cN: "class", bK: "class"}],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, r]
        }, {cN: "decorator", b: /^[\t ]*@/, e: /$/}, {b: /\b(print|exec)\(/}]
    }
}), hljs.registerLanguage("cs", function (e) {
    var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield", i = e.IR + "(<" + e.IR + ">)?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{cN: "xmlDocTag", v: [{b: "///", r: 0}, {b: "<!--|-->"}, {b: "</?", e: ">"}]}]
        }), e.CLCM, e.CBCM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {cN: "string", b: '@"', e: '"', c: [{b: '""'}]}, e.ASM, e.QSM, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [{cN: "title", b: "[a-zA-Z](\\.?\\w)*", r: 0}, e.CLCM, e.CBCM]
        }, {bK: "new return throw await", r: 0}, {
            cN: "function",
            b: "(" + i + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{b: e.IR + "\\s*\\(", rB: !0, c: [e.TM], r: 0}, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
}), hljs.registerLanguage("r", function (e) {
    var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
    return {
        c: [e.HCM, {
            b: t,
            l: t,
            k: {
                keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
                literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
            },
            r: 0
        }, {cN: "number", b: "0[xX][0-9a-fA-F]+[Li]?\\b", r: 0}, {
            cN: "number",
            b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            r: 0
        }, {cN: "number", b: "\\d+\\.(?!\\d)(?:i\\b)?", r: 0}, {
            cN: "number",
            b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {cN: "number", b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b", r: 0}, {b: "`", e: "`", r: 0}, {
            cN: "string",
            c: [e.BE],
            v: [{b: '"', e: '"'}, {b: "'", e: "'"}]
        }]
    }
}), hljs.registerLanguage("tex", function (e) {
    var t = {cN: "command", b: "\\\\[a-zA-Z\u0430-\u044f\u0410-\u044f]+[\\*]?"}, i = {
        cN: "command",
        b: "\\\\[^a-zA-Z\u0430-\u044f\u0410-\u044f0-9]"
    }, n = {cN: "special", b: "[{}\\[\\]\\&#~]", r: 0};
    return {
        c: [{
            b: "\\\\[a-zA-Z\u0430-\u044f\u0410-\u044f]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
            rB: !0,
            c: [t, i, {cN: "number", b: " *=", e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?", eB: !0}],
            r: 10
        }, t, i, n, {cN: "formula", b: "\\$\\$", e: "\\$\\$", c: [t, i, n], r: 0}, {
            cN: "formula",
            b: "\\$",
            e: "\\$",
            c: [t, i, n],
            r: 0
        }, e.C("%", "$", {r: 0})]
    }
}), hljs.registerLanguage("sql", function (e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>]/,
        c: [{
            cN: "operator",
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release|0 unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            k: {
                keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last|0 last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link|0 list|0 listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock|0 locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop|0 low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise|0 rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release|0 release_lock relies_on relocate rely rem remainder repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{cN: "string", b: "'", e: "'", c: [e.BE, {b: "''"}]}, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {b: '""'}]
            }, {cN: "string", b: "`", e: "`", c: [e.BE]}, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}), hljs.registerLanguage("scheme", function (e) {
    var t = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+", i = "(\\-|\\+)?\\d+([./]\\d+)?", n = i + "[+\\-]" + i + "i", r = {built_in: "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"}, a = {
        cN: "shebang",
        b: "^#!",
        e: "$"
    }, o = {cN: "literal", b: "(#t|#f|#\\\\" + t + "|#\\\\.)"}, s = {
        cN: "number",
        v: [{b: i, r: 0}, {
            b: n,
            r: 0
        }, {b: "#b[0-1]+(/[0-1]+)?"}, {b: "#o[0-7]+(/[0-7]+)?"}, {b: "#x[0-9a-f]+(/[0-9a-f]+)?"}]
    }, l = e.QSM, c = [e.C(";", "$", {r: 0}), e.C("#\\|", "\\|#")], u = {b: t, r: 0}, d = {
        cN: "variable",
        b: "'" + t
    }, h = {eW: !0, r: 0}, p = {
        cN: "list",
        v: [{b: "\\(", e: "\\)"}, {b: "\\[", e: "\\]"}],
        c: [{cN: "keyword", b: t, l: t, k: r}, h]
    };
    return h.c = [o, s, l, u, d, p].concat(c), {i: /\S/, c: [a, s, l, d, p].concat(c)}
}), hljs.registerLanguage("php", function (e) {
    var t = {cN: "variable", b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"}, i = {
        cN: "preprocessor",
        b: /<\?(php)?|\?>/
    }, n = {
        cN: "string",
        c: [e.BE, i],
        v: [{b: 'b"', e: '"'}, {b: "b'", e: "'"}, e.inherit(e.ASM, {i: null}), e.inherit(e.QSM, {i: null})]
    }, r = {v: [e.BNM, e.CNM]};
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }, i]
        }), e.C("__halt_compiler.+?;", !1, {eW: !0, k: "__halt_compiler", l: e.UIR}), {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [e.BE]
        }, i, t, {b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/}, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {cN: "params", b: "\\(", e: "\\)", c: ["self", t, e.CBCM, n, r]}]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{bK: "extends implements"}, e.UTM]
        }, {bK: "namespace", e: ";", i: /[\.']/, c: [e.UTM]}, {bK: "use", e: ";", c: [e.UTM]}, {b: "=>"}, n, r]
    }
}), hljs.registerLanguage("java", function (e) {
    var t = e.UIR + "(<" + e.UIR + ">)?", i = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private", n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?", r = {
        cN: "number",
        b: n,
        r: 0
    };
    return {
        aliases: ["jsp"],
        k: i,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{cN: "doctag", b: "@[A-Za-z]+"}]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{bK: "extends implements"}, e.UTM]
        }, {bK: "new throw return else", r: 0}, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: i,
            c: [{b: e.UIR + "\\s*\\(", rB: !0, r: 0, c: [e.UTM]}, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: i,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, r, {cN: "annotation", b: "@[A-Za-z]+"}]
    }
}), hljs.registerLanguage("mathematica", function (e) {
    return {
        aliases: ["mma"],
        l: "(\\$|\\b)" + e.IR + "\\b",
        k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
        c: [{cN: "comment", b: /\(\*/, e: /\*\)/}, e.ASM, e.QSM, e.CNM, {cN: "list", b: /\{/, e: /\}/, i: /:/}]
    }
}), hljs.registerLanguage("cpp", function (e) {
    var t = {cN: "keyword", b: "\\b[a-z\\d_]*_t\\b"}, i = {
        cN: "string",
        v: [e.inherit(e.QSM, {b: '((u8?|U)|L)?"'}), {b: '(u8?|U)?R"', e: '"', c: [e.BE]}, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    }, n = {
        cN: "number",
        v: [{b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"}, {b: e.CNR}]
    }, r = e.IR + "\\s*\\(", a = {
        keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
        built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
        literal: "true false nullptr NULL"
    };
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: a,
        i: "</",
        c: [t, e.CLCM, e.CBCM, n, i, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line pragma ifdef ifndef",
            c: [{b: /\\\n/, r: 0}, {
                bK: "include",
                e: "$",
                c: [i, {cN: "string", b: "<", e: ">", i: "\\n"}]
            }, i, n, e.CLCM, e.CBCM]
        }, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: a,
            c: ["self", t]
        }, {b: e.IR + "::", k: a}, {bK: "new throw return else", r: 0}, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + r,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: a,
            c: [{b: r, rB: !0, c: [e.TM], r: 0}, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: a,
                r: 0,
                c: [e.CLCM, e.CBCM, i, n]
            }, e.CLCM, e.CBCM]
        }]
    }
}), hljs.registerLanguage("javascript", function (e) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{cN: "pi", r: 10, b: /^\s*['"]use (strict|asm)['"]/}, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {cN: "subst", b: "\\$\\{", e: "\\}"}]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{b: "\\b(0[bB][01]+)"}, {b: "\\b(0[oO][0-7]+)"}, {b: e.CNR}],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {b: /</, e: />\s*[);\]]/, r: 0, sL: "xml"}],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/}), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {b: /\$[(.]/}, {b: "\\." + e.IR, r: 0}, {
            bK: "import",
            e: "[;$]",
            k: "import from as",
            c: [e.ASM, e.QSM]
        }, {cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{bK: "extends"}, e.UTM]}],
        i: /#/
    }
}), hljs.registerLanguage("swift", function (e) {
    var t = {
        keyword: "class deinit enum extension func import init let protocol static struct subscript typealias var break case continue default do else fallthrough if in for return switch where while as dynamicType is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ __LINE__ associativity didSet get infix inout left mutating none nonmutating operator override postfix precedence prefix right set unowned unowned safe unsafe weak willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue assert bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced join lexicographicalCompare map max maxElement min minElement numericCast partition posix print println quickSort reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof strideofValue swap swift toString transcode underestimateCount unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafePointers withVaList"
    }, i = {cN: "type", b: "\\b[A-Z][\\w']*", r: 0}, n = e.C("/\\*", "\\*/", {c: ["self"]}), r = {
        cN: "subst",
        b: /\\\(/,
        e: "\\)",
        k: t,
        c: []
    }, a = {
        cN: "number",
        b: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
        r: 0
    }, o = e.inherit(e.QSM, {c: [r, e.BE]});
    return r.c = [a], {
        k: t,
        c: [o, e.CLCM, n, i, a, {
            cN: "func",
            bK: "func",
            e: "{",
            eE: !0,
            c: [e.inherit(e.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/, i: /\(/}), {
                cN: "generics",
                b: /</,
                e: />/,
                i: />/
            }, {cN: "params", b: /\(/, e: /\)/, endsParent: !0, k: t, c: ["self", a, o, e.CBCM, {b: ":"}], i: /["']/}],
            i: /\[|%/
        }, {
            cN: "class",
            bK: "struct protocol class extension enum",
            k: t,
            e: "\\{",
            eE: !0,
            c: [e.inherit(e.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/})]
        }, {
            cN: "preprocessor",
            b: "(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix)"
        }]
    }
}), hljs.registerLanguage("matlab", function (e) {
    var t = [e.CNM, {cN: "string", b: "'", e: "'", c: [e.BE, {b: "''"}]}], i = {
        r: 0,
        c: [{cN: "operator", b: /'['\.]*/}]
    };
    return {
        k: {
            keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
            built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
        },
        i: '(//|"|#|/\\*|\\s+/\\w+)',
        c: [{
            cN: "function",
            bK: "function",
            e: "$",
            c: [e.UTM, {cN: "params", b: "\\(", e: "\\)"}, {cN: "params", b: "\\[", e: "\\]"}]
        }, {
            b: /[a-zA-Z_][a-zA-Z_0-9]*'['\.]*/,
            rB: !0,
            r: 0,
            c: [{b: /[a-zA-Z_][a-zA-Z_0-9]*/, r: 0}, i.c[0]]
        }, {cN: "matrix", b: "\\[", e: "\\]", c: t, r: 0, starts: i}, {
            cN: "cell",
            b: "\\{",
            e: /}/,
            c: t,
            r: 0,
            starts: i
        }, {b: /\)/, r: 0, starts: i}, e.C("^\\s*\\%\\{\\s*$", "^\\s*\\%\\}\\s*$"), e.C("\\%", "$")].concat(t)
    }
}), hljs.registerLanguage("ruby", function (e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", i = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor", n = {
        cN: "doctag",
        b: "@[A-Za-z]+"
    }, r = {cN: "value", b: "#<", e: ">"}, a = [e.C("#", "$", {c: [n]}), e.C("^\\=begin", "^\\=end", {
        c: [n],
        r: 10
    }), e.C("^__END__", "\\n$")], o = {cN: "subst", b: "#\\{", e: "}", k: i}, s = {
        cN: "string",
        c: [e.BE, o],
        v: [{b: /'/, e: /'/}, {b: /"/, e: /"/}, {b: /`/, e: /`/}, {b: "%[qQwWx]?\\(", e: "\\)"}, {
            b: "%[qQwWx]?\\[",
            e: "\\]"
        }, {b: "%[qQwWx]?{", e: "}"}, {b: "%[qQwWx]?<", e: ">"}, {b: "%[qQwWx]?/", e: "/"}, {
            b: "%[qQwWx]?%",
            e: "%"
        }, {b: "%[qQwWx]?-", e: "-"}, {
            b: "%[qQwWx]?\\|",
            e: "\\|"
        }, {b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]
    }, l = {cN: "params", b: "\\(", e: "\\)", k: i}, c = [s, r, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [e.inherit(e.TM, {b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}), {
            cN: "inheritance",
            b: "<\\s*",
            c: [{cN: "parent", b: "(" + e.IR + "::)?" + e.IR}]
        }].concat(a)
    }, {cN: "function", bK: "def", e: "$|;", r: 0, c: [e.inherit(e.TM, {b: t}), l].concat(a)}, {
        cN: "constant",
        b: "(::)?(\\b[A-Z]\\w*(::)?)+",
        r: 0
    }, {cN: "symbol", b: e.UIR + "(\\!|\\?)?:", r: 0}, {cN: "symbol", b: ":", c: [s, {b: t}], r: 0}, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {cN: "variable", b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"}, {
        b: "(" + e.RSR + ")\\s*",
        c: [r, {
            cN: "regexp",
            c: [e.BE, o],
            i: /\n/,
            v: [{b: "/", e: "/[a-z]*"}, {b: "%r{", e: "}[a-z]*"}, {b: "%r\\(", e: "\\)[a-z]*"}, {
                b: "%r!",
                e: "![a-z]*"
            }, {b: "%r\\[", e: "\\][a-z]*"}]
        }].concat(a),
        r: 0
    }].concat(a);
    o.c = c, l.c = c;
    var u = "[>?]>", d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>", h = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>", p = [{
        b: /^\s*=>/,
        cN: "status",
        starts: {e: "$", c: c}
    }, {cN: "prompt", b: "^(" + u + "|" + d + "|" + h + ")", starts: {e: "$", c: c}}];
    return {aliases: ["rb", "gemspec", "podspec", "thor", "irb"], k: i, c: a.concat(p).concat(c)}
}), hljs.registerLanguage("css", function (e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*", i = {cN: "function", b: t + "\\(", rB: !0, eE: !0, e: "\\("}, n = {
        cN: "rule",
        b: /[A-Z\_\.\-]+\s*:/,
        rB: !0,
        e: ";",
        eW: !0,
        c: [{
            cN: "attribute",
            b: /\S/,
            e: ":",
            eE: !0,
            starts: {
                cN: "value",
                eW: !0,
                eE: !0,
                c: [i, e.CSSNM, e.QSM, e.ASM, e.CBCM, {cN: "hexcolor", b: "#[0-9A-Fa-f]+"}, {
                    cN: "important",
                    b: "!important"
                }]
            }
        }]
    };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, n, {cN: "id", b: /\#[A-Za-z0-9_-]+/}, {cN: "class", b: /\.[A-Za-z0-9_-]+/}, {
            cN: "attr_selector",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {cN: "pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/}, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{cN: "keyword", b: /\S+/}, {b: /\s/, eW: !0, eE: !0, r: 0, c: [i, e.ASM, e.QSM, e.CSSNM]}]
        }, {cN: "tag", b: t, r: 0}, {cN: "rules", b: "{", e: "}", i: /\S/, c: [e.CBCM, n]}]
    }
}), hljs.registerLanguage("coffeescript", function (e) {
    var t = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        built_in: "npm require console print module global window document"
    }, i = "[A-Za-z$_][0-9A-Za-z$_]*", n = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: t
    }, r = [e.BNM, e.inherit(e.CNM, {starts: {e: "(\\s*/)?", r: 0}}), {
        cN: "string",
        v: [{b: /'''/, e: /'''/, c: [e.BE]}, {b: /'/, e: /'/, c: [e.BE]}, {b: /"""/, e: /"""/, c: [e.BE, n]}, {
            b: /"/,
            e: /"/,
            c: [e.BE, n]
        }]
    }, {
        cN: "regexp",
        v: [{b: "///", e: "///", c: [n, e.HCM]}, {b: "//[gim]*", r: 0}, {b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]
    }, {cN: "property", b: "@" + i}, {b: "`", e: "`", eB: !0, eE: !0, sL: "javascript"}];
    n.c = r;
    var a = e.inherit(e.TM, {b: i}), o = "(\\(.*\\))?\\s*\\B[-=]>", s = {
        cN: "params",
        b: "\\([^\\(]",
        rB: !0,
        c: [{b: /\(/, e: /\)/, k: t, c: ["self"].concat(r)}]
    };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: r.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + i + "\\s*=\\s*" + o,
            e: "[-=]>",
            rB: !0,
            c: [a, s]
        }, {b: /[:\(,=]\s*/, r: 0, c: [{cN: "function", b: o, e: "[-=]>", rB: !0, c: [s]}]}, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{bK: "extends", eW: !0, i: /[:="\[\]]/, c: [a]}, a]
        }, {cN: "attribute", b: i + ":", e: ":", rB: !0, rE: !0, r: 0}])
    }
}), hljs.registerLanguage("json", function (e) {
    var t = {literal: "true false null"}, i = [e.QSM, e.CNM], n = {
        cN: "value",
        e: ",",
        eW: !0,
        eE: !0,
        c: i,
        k: t
    }, r = {
        b: "{",
        e: "}",
        c: [{cN: "attribute", b: '\\s*"', e: '"\\s*:\\s*', eB: !0, eE: !0, c: [e.BE], i: "\\n", starts: n}],
        i: "\\S"
    }, a = {b: "\\[", e: "\\]", c: [e.inherit(n, {cN: null})], i: "\\S"};
    return i.splice(i.length, 0, r, a), {c: i, k: t, i: "\\S"}
}), function () {
    $("pre code").each(function (e, t) {
        var i, n, r, a;
        return t = $(t), i = t.parent(), n = t.text(), r = t.attr("class"), r && hljs.listLanguages().indexOf(r) >= 0 ? (a = hljs.highlight(r, n, !0), a = a.value) : (a = hljs.highlightAuto(n), r = a.language, t.attr("class", r), a = a.value), i.attr("class", "hljs " + r), t.html(a)
    })
}.call(this), function () {
    !function () {
        var e;
        return e = $.fn.popover.Constructor.prototype.setContent, $.fn.popover.Constructor.prototype.setContent = function () {
            return e.call(this), this.options.onShown ? this.options.onShown(this) : void 0
        }
    }(jQuery)
}.call(this), function () {
    Maleskine.BaseModule = function () {
        function e(e) {
            var t, i, n;
            this.options = e, i = this.options;
            for (t in i)n = i[t], this[t] = n;
            this.elements || (this.elements = this.constructor.elements), this.events || (this.events = this.constructor.events), this.elements && this.refreshElements(), this.events && this.delegateEvents(this.events), $(window).scroll(function () {
                var e, t, i, n, r, a;
                if (r = $(document).height() / $(window).height() * ($(window).height() / 3), $(window).scrollTop() > $(document).height() - $(window).height() - r) {
                    for (n = $("[infiscroll-url]"), a = [], e = 0, t = n.length; t > e; e++)i = n[e], a.push($(i).infiScroll());
                    return a
                }
            })
        }

        return e.prototype.eventSplitter = /^(\S+)\s*(.*)$/, e.prototype.refreshElements = function () {
            var e, t, i, n;
            t = this.elements, i = [];
            for (e in t)n = t[e], i.push(this[n] = this.$(e));
            return i
        }, e.prototype.delegateEvents = function (e) {
            var t, i, n, r, a, o;
            a = [];
            for (i in e) {
                if (r = e[i], "function" == typeof r) r = function (e) {
                    return function (t) {
                        return function () {
                            return t.apply(e, arguments), !0
                        }
                    }
                }(this)(r); else {
                    if (!this[r])throw new Error(r + " doesn't exist");
                    r = function (e) {
                        return function (t) {
                            return function () {
                                return e[t].apply(e, arguments), !0
                            }
                        }
                    }(this)(r)
                }
                n = i.match(this.eventSplitter), t = n[1], o = n[2], a.push("" === o ? this.el.bind(t, r) : this.el.delegate(o, t, r))
            }
            return a
        }, e.prototype.$ = function (e) {
            return $(e, this.el)
        }, e.prototype.notyInfo = function (e) {
            return noty({text: e, layout: "topCenter", type: "information", timeout: 2200, theme: "maleskineTheme"})
        }, e.prototype.notyError = function (e) {
            return noty({text: e, layout: "topCenter", type: "error", timeout: 3500, theme: "maleskineTheme"})
        }, e.prototype.setCookie = function (e, t) {
            return Maleskine.Utils.setCookie(e, t)
        }, e.prototype.infiniteScroll = function () {
            return $(".pagination").length || $("#list-container .load-more").length > 0 ? ($(window).scroll(function () {
                var e, t;
                if (e = $(document).height() / $(window).height() * ($(window).height() / 3), $(".pagination").length > 0) {
                    if (t = $(".pagination .next").children("a").attr("href"), t && $(window).scrollTop() > $(document).height() - $(window).height() - e)return $(".pagination").text(""), $.getScript(t)
                } else if ($("#list-container .load-more").length > 0 && (t = $("#list-container .load-more .ladda-button").data("url"), t && $(window).scrollTop() > $(document).height() - $(window).height() - e))return $("#list-container .load-more").text(""), $.getScript(t)
            }), $(window).scroll()) : void 0
        }, e.prototype.getURLParmeter = function (e) {
            var t, i, n, r, a, o;
            for (n = window.location.search.substring(1), a = n.split("&"), t = 0, i = a.length; i > t; t++)if (o = a[t], r = o.split("="), r[0] === e)return r[1];
            return ""
        }, e.prototype.scrollToAnchor = function (e) {
            var t;
            return t = $("#" + e), "undefined" != typeof t.offset() ? $("html, body").animate({scrollTop: t.offset().top}, 1e3) : void 0
        }, e.prototype.changeBrowserUrl = function (e, t) {
            var i;
            return "undefined" != typeof history.pushState ? (i = {
                title: e,
                url: t
            }, history.pushState(i, i.title, i.url)) : console.log("Browser does not support HTML5.")
        }, e.prototype.stopEvent = function (e) {
            return e || (e = window.event), e.cancelBubble = !0, e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), !1
        }, e
    }()
}.call(this), function () {
    var e = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    Maleskine.BaseModal = function () {
        function t() {
            this.shown = e(this.shown, this), this.hidden = e(this.hidden, this), this.show = e(this.show, this), this.close = e(this.close, this), this.template || (this.template = this.constructor.template), this.id = "modal-" + Date.now(), this.selector = "#" + this.id, $("body").append(JST.render("modals/" + this.template, {modal_id: this.id})), this.el = $("#" + this.id), this.elements || (this.elements = this.constructor.elements), this.events || (this.events = this.constructor.events), this.elements && this.refreshElements(), this.events && this.delegateEvents(this.events), this.baseVue = Vue.extend({
                el: function (e) {
                    return function () {
                        return e.selector
                    }
                }(this), data: function () {
                    return {error: "", info: "", isAjaxLoading: !1}
                }, methods: {
                    ajaxStart: function () {
                        return this.$set("isAjaxLoading", !0)
                    }, ajaxStop: function () {
                        return this.$set("isAjaxLoading", !1)
                    }, clearMessages: function () {
                        return this.$set("error", ""), this.$set("info", "")
                    }, setInfoMessage: function (e) {
                        return this.clearMessages(), this.$set("info", e)
                    }, setErrMessage: function (e) {
                        return this.clearMessages(), this.$set("error", e)
                    }, closeModal: function (e) {
                        return function () {
                            return e.close()
                        }
                    }(this)
                }
            }), this.vueify()
        }

        return t.prototype.eventSplitter = /^(\S+)\s*(.*)$/, t.prototype.events = {"click .close": "close"}, t.prototype.open = function () {
            return this.el.modal("show")
        }, t.prototype.close = function () {
            return this.el.modal("hide"), this.vue.$destroy(), this.el.remove()
        }, t.prototype.show = function () {
        }, t.prototype.hidden = function () {
        }, t.prototype.shown = function () {
            return null != this.fullscreen ? $(".modal-backdrop").css("background", "#FFF").css("opacity", 1) : void 0
        }, t.prototype.refreshElements = function () {
            var e, t, i, n;
            t = this.elements, i = [];
            for (e in t)n = t[e], i.push(this[n] = this.$(e));
            return i
        }, t.prototype.delegateEvents = function (e) {
            var t, i, n, r, a, o;
            a = [];
            for (i in e) {
                if (r = e[i], "function" == typeof r) r = function (e) {
                    return function (t) {
                        return function () {
                            return t.apply(e, arguments), !0
                        }
                    }
                }(this)(r); else {
                    if (!this[r])throw new Error(r + " doesn't exist");
                    r = function (e) {
                        return function (t) {
                            return function () {
                                return e[t].apply(e, arguments), !0
                            }
                        }
                    }(this)(r)
                }
                n = i.match(this.eventSplitter), t = n[1], o = n[2], a.push("" === o ? this.el.bind(t, r) : this.el.delegate(o, t, r))
            }
            return a
        }, t.prototype.$ = function (e) {
            return $(e, this.el)
        }, t
    }()
}.call(this), function () {
    var e = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }, t = function (e, t) {
        function n() {
            this.constructor = e
        }

        for (var r in t)i.call(t, r) && (e[r] = t[r]);
        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
    }, i = {}.hasOwnProperty;
    Maleskine.SmsBindModal = function (i) {
        function n() {
            this.vueify = e(this.vueify, this), n.__super__.constructor.apply(this, arguments)
        }

        return t(n, i), n.prototype.template = "sms_bind_modal", n.prototype.vueify = function () {
            return this.vue = new this.baseVue({
                el: this.selector,
                data: {
                    submitDisabled: !1,
                    isCoolingDown: !1,
                    coolingDownSeconds: 60,
                    important_countries: [],
                    all_countries: [],
                    selectedCallingCode: "86",
                    selectedISOCode: "CN"
                },
                beforeDestroy: function () {
                    return null != this.$data.timeoutHandler ? clearTimeout(this.$data.timeoutHandler) : void 0
                },
                created: function () {
                    return this.$http.get("/countries").then(function (e) {
                        return this.$data.all_countries = e.data.all_countries, this.$data.important_countries = e.data.important_countries
                    })
                },
                methods: {
                    countryChanged: function (e) {
                        var t;
                        return t = e.currentTarget, this.$set("selectedISOCode", t.getAttribute("data-iso-code")), this.$set("selectedCallingCode", t.getAttribute("data-calling-code"))
                    }, sendCode: function () {
                        return null != this.$data.mobileNumber && this.$data.mobileNumber.length > 0 ? (this.ajaxStart(), this.$http.post(Routes.mobile_phone_send_code_path(), {
                            mobile_number: this.mobileNumber,
                            iso_code: this.selectedISOCode
                        }).then(function (e) {
                            return this.ajaxStop(), this.setInfoMessage(e.data.message), this.startCountingDown()
                        }, function (e) {
                            return this.ajaxStop(), this.setErrMessage(e.data.message), null != e.cooldown.present && e.cooldown > 0 ? this.startCountingDown(e.cooldown) : void 0
                        })) : this.$set("error", I18n.t("reading.modals.sms_bind_modal.mobile_number_empty"))
                    }, startCountingDown: function (e) {
                        var t;
                        return null == e && (e = 60), t = this, this.$set("isCoolingDown", !0), this.$set("coolingDownSeconds", e), this.intervalHandler = setInterval(function () {
                            return t.$data.coolingDownSeconds = t.$data.coolingDownSeconds - 1, 0 === t.$data.coolingDownSeconds ? t.resetCountingDown() : void 0
                        }, 1e3)
                    }, resetCountingDown: function () {
                        return clearInterval(this.intervalHandler), this.$set("isCoolingDown", !1), this.$set("coolingDownSeconds", 60)
                    }, submit: function () {
                        return null == this.mobileNumber || 0 === this.mobileNumber.length ? this.setErrMessage(I18n.t("reading.modals.sms_bind_modal.mobile_number_empty")) : null == this.code || 0 === this.code.length ? this.setErrMessage(I18n.t("reading.modals.sms_bind_modal.code_empty")) : (this.ajaxStart(), this.$set("submitDisabled", !0), this.$http.put(Routes.mobile_phone_bind_path(), {
                            mobile_number: this.mobileNumber,
                            iso_code: this.selectedISOCode,
                            code: this.code
                        }).then(function (e) {
                            return this.$set("submitDisabled", !1), this.ajaxStop(), this.setInfoMessage(e.data.message), setTimeout(function () {
                                return window.location.reload()
                            }, 1200)
                        }, function (e) {
                            return this.$set("submitDisabled", !1), this.ajaxStop(), this.setErrMessage(e.data.message)
                        }))
                    }
                }
            })
        }, n.prototype.open = function () {
            return n.__super__.open.apply(this, arguments)
        }, n
    }(Maleskine.BaseModal)
}.call(this), function () {
    Maleskine.AuthorCard = {
        cachedCards: {},
        authorElementSelector: ".maleskine-author",
        authorCardPath: function (e) {
            return "/users/" + e + "/author_card"
        },
        loadingHtml: "<img src='" + Maleskine.CommonImages.loader("tiny") + "' class='loading loader-tiny'>",
        clearCachedCard: function (e) {
            return Maleskine.AuthorCard.cachedCards[e] = null
        },
        setCurrentCard: function (e) {
            return null != Maleskine.AuthorCard.currentCard && (clearInterval(Maleskine.AuthorCard.currentCard.timeoutHandle), Maleskine.AuthorCard.currentCard = null), Maleskine.AuthorCard.currentCard = {}, Maleskine.AuthorCard.currentCard.authorElement = e, Maleskine.AuthorCard.currentCard.slug = e.data("user-slug"), Maleskine.AuthorCard.currentCard.timeoutHandle = setInterval(Maleskine.AuthorCard.checkCard, 400)
        },
        isCurrentCard: function (e) {
            return null != Maleskine.AuthorCard.currentCard && Maleskine.AuthorCard.currentCard.authorElement === e ? !0 : !1
        },
        checkCard: function () {
            var e, t;
            return null == Maleskine.AuthorCard.currentCard || (e = Maleskine.AuthorCard.currentCard.authorElement, t = $(".popover"), e.is(":hover") || t.is(":hover")) ? void 0 : Maleskine.AuthorCard.closeCurrentCard()
        },
        closeCurrentCard: function () {
            var e;
            return null != Maleskine.AuthorCard.currentCard ? (e = Maleskine.AuthorCard.currentCard.authorElement, e.popover("hide"), clearInterval(Maleskine.AuthorCard.currentCard.timeoutHandle), Maleskine.AuthorCard.currentCard = null, e.popover("destroy")) : void 0
        },
        initAuthorCards: function () {
            return $("body").on("mouseenter", ".popover .following a", function () {
                return $(this).addClass("unfollow").html("<i class='fa fa-times'></i>" + I18n.t("reading.unfollow"))
            }), $("body").on("mouseleave", ".popover .following a", function () {
                return $(this).removeClass("unfollow").html("<i class='fa fa-check'></i>" + I18n.t("reading.following"))
            }), $("body").on("mouseenter", Maleskine.AuthorCard.authorElementSelector, function (e) {
                var t, i, n, r;
                return t = $(e.currentTarget), r = t.data("user-slug"), Maleskine.AuthorCard.isCurrentCard(t) ? void 0 : (Maleskine.AuthorCard.closeCurrentCard(), i = Maleskine.AuthorCard.cardContent(t), n = t.data("placement") || "bottom", t.popover({
                    trigger: "manual",
                    html: !0,
                    content: i,
                    placement: n,
                    container: "body"
                }), t.popover("show"), Maleskine.AuthorCard.setCurrentCard(t))
            })
        },
        cardContent: function (e) {
            var t;
            return t = e.data("user-slug"), null != Maleskine.AuthorCard.cachedCards[t] ? Maleskine.AuthorCard.cachedCards[t] : (Maleskine.AuthorCard.loadContent(e), Maleskine.AuthorCard.loadingHtml)
        },
        loadContent: function (e) {
            var t;
            return t = e.data("user-slug"), $.get(this.authorCardPath(t), function () {
                return function (i) {
                    var n, r;
                    return Maleskine.AuthorCard.cachedCards[t] = i, Maleskine.AuthorCard.isCurrentCard(e) && ($(".popover-content").html(i), "left" === e.data("placement")) ? (n = $(".popover").outerHeight() / 2 - 29, r = $(".popover").offset().top - n, $(".popover").css("top", r)) : void 0
                }
            }(this))
        }
    }
}.call(this), function () {
    !function (e) {
        return e.fn.ajaxTab = function (t) {
            var i, n, r;
            return r = e(this), i = e(r.data("container")), n = r.find(r.data("loader")), null != i ? r.on("click", "li > a", function (a) {
                var o, s;
                return s = e(this).attr("href"), o = e(e(this).parent()), o.hasClass("disabled") || o.hasClass("active") ? a.preventDefault() : (a.preventDefault(), o.siblings().removeClass("active"), o.addClass("active"), e.ajax({
                    url: s,
                    type: "GET",
                    dataType: "html",
                    beforeSend: function () {
                        return function (e) {
                            return n.show(), e.setRequestHeader("X-PJAX", "true")
                        }
                    }(this),
                    success: function () {
                        return function (e) {
                            return n.hide(), i.html(e), Maleskine.Utils.initModulesInElement(i), Maleskine.Utils.initLaddaButton(i), i.find("a[data-toggle=tooltip]").tooltip(), "function" == typeof t.success ? t.success.call(r[0], r[0], i[0], n[0]) : void 0
                        }
                    }(this)
                }))
            }) : void 0
        }
    }(jQuery)
}.call(this), function (e) {
    e.fn.downloadApp = function () {
        return this.on("click", function () {
            var e = navigator.userAgent.toLowerCase();
            /android/.test(e) && (window.location = e.match(/micromessenger|qq|mqqbrowser/) ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshu.haruki" : "http://downloads.jianshu.io/apps/haruki/JianShu-1.10.3.apk"), /iphone|ipad|ipod/.test(e) && (window.location = e.match(/micromessenger|qq|mqqbrowser/) ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshu.haruki" : "https://itunes.apple.com/cn/app/jian-shu/id888237539?ls=1&mt=8")
        }), this
    }
}(jQuery), function () {
    $(document).on("ajax:success", "a[data-mcomponent=easy-bookmark]", function (e, t) {
        var i;
        return i = $(e.currentTarget), t.bookmarked ? (i.removeClass("bookmark").addClass("bookmarked"), $(e.currentTarget).html("<i class='fa fa-bookmark'></i><span>" + I18n.t("reading.bookmark") + "</span>")) : (i.removeClass("bookmarked").addClass("bookmark"), $(e.currentTarget).html("<i class='fa fa-bookmark-o'></i><span>" + I18n.t("reading.bookmark") + "</span>"))
    })
}.call(this), function () {
    $(document).on("ajax:success", "a[data-mcomponent=easy-like]", function (e, t) {
        return $(e.currentTarget).html("<i class='" + (t.liked ? "fa fa-heart" : "fa fa-heart-o") + "'></i>" + t.liked_count)
    })
}.call(this), function () {
    $(function () {
        return Maleskine.BrowserDetector.isNotIE8NorIE9() ? void 0 : $("[placeholder]").focus(function () {
            var e;
            return e = $(this), e.val() === e.attr("placeholder") ? (e.val(""), e.removeClass("placeholder")) : void 0
        }).blur(function () {
            var e;
            return e = $(this), "" === e.val() || e.val() === e.attr("placeholder") ? (e.addClass("placeholder"), e.val(e.attr("placeholder"))) : void 0
        }).blur()
    })
}.call(this), function () {
    !function (e) {
        return e.fn.highlight = function () {
            return e(this).each(function () {
                var t;
                return t = e(this), t.before("<div/>"), t.prev().width(t.width()).height(t.height()).css({
                    position: "absolute",
                    "background-color": "#ffff99",
                    opacity: ".9"
                }).fadeOut(500).queue(function () {
                    return e(this).remove()
                })
            })
        }
    }(jQuery)
}.call(this), function () {
    $(function () {
        var e, t, i;
        return Maleskine.BrowserDetector.isNotIE8NorIE9() ? (t = /\?imageView2\/\d\/\w\/\d{2,}\/\w\/\w{1,3}/gi, e = $("#show-note-container"), i = $("div.image-package"), i.map(function () {
            return function (n) {
                var r, a, o, s;
                return n = $(i[n]), n.hasClass("imagebubble-backmask") || (r = n.attr("widget"), "ImageBubble" === r) ? void 0 : (n.attr("widget", "ImageBubble"), o = n.find("img"), a = n.find(".image-caption"), r = a.html(), r || (r = o.attr("alt"), a.html(r)), o.data("title", r), s = o.attr("data-original-src"), s || (s = o.attr("src"), s = s.replace(t, "")), o.attr("data-original-src", s), n.imageBubble({
                    container: e,
                    showMenu: !1,
                    viewport: function (e) {
                        var t, i;
                        return i = $(window), t = {
                            top: 0,
                            left: 0,
                            width: i.width(),
                            height: i.height()
                        }, t.bottom = t.top + t.height, t.right = t.left + t.width, t.top < e.top && (t.top = e.top), t.bottom > e.bottom && (t.bottom = e.bottom), t.left < e.left && (t.left = e.left), t.right > e.right && (t.right = e.right), t.width = t.right - t.left, t.height = t.bottom - t.top, t
                    },
                    callbacks: {
                        show: function () {
                            return a.css({opacity: 0})
                        }, hide: function () {
                            return a.css({opacity: 1})
                        }
                    }
                }))
            }
        }(this))) : void 0
    })
}.call(this), function () {
    !function (e) {
        return e.fn.infiScrollSetup = function (e) {
            return window.InfiScroll = window.InfiScroll || {}, window.InfiScroll[this[0]] = e
        }, e.fn.infiScroll = function (t) {
            var i, n, r, a, o, s, l;
            return o = t || {}, i = this, l = (i.data("page") || 1) + 1, a = i.data("eof") || !1, s = i.data("infiscroll-loading") || !1, n = e(i.attr("infiScroll-loader")), r = window.InfiScroll[i[0]], a || s ? void 0 : e.ajax({
                url: i.attr("infiScroll-url"),
                type: "GET",
                dataType: "html",
                data: {page: l},
                beforeSend: function () {
                    return function (e) {
                        return i.data("infiscroll-loading", !0), n.length > 0 && n.show(), e.setRequestHeader("X-INFISCROLL", "true")
                    }
                }(this),
                success: function () {
                    return function (t) {
                        var a;
                        return i.data("page", l), t.trim().length > 0 ? (a = e(t), r && r.success && "function" == typeof r.success && r.success.call(i, a, n), n.length > 0 ? n.preappend(a) : i.append(a)) : i.data("eof", !0)
                    }
                }(this),
                complete: function () {
                    return i.data("infiscroll-loading", !1), n.length > 0 ? n.hide() : void 0
                }
            })
        }
    }(jQuery)
}.call(this), function () {
    !function (e) {
        return e.fn.pjaxTab = function (t) {
            var i, n, r, a, o, s;
            return o = t || {}, r = e(this), s = r.data("loader"), a = r.data("container"), i = e(a), n = r.find(s), null != i ? (r.pjax("li:not(.disabled) > a[data-pjax]", a), i.on("pjax:beforeSend", function () {
                return function (t, i) {
                    return n.length > 0 && n.show(), e.isFunction(o.beforeSend) ? o.beforeSend(t, i) : void 0
                }
            }(this)), i.on("pjax:success", function () {
                return function (t, a, l, c) {
                    return Maleskine.Utils.initModulesInElement(i), Maleskine.Utils.initLaddaButton(i), i.find("a[data-toggle=tooltip]").tooltip(), n = r.find(s), e.isFunction(o.success) ? o.success(t, a, l, c) : void 0
                }
            }(this)), i.on("pjax:complete", function () {
                return function (t, i, r) {
                    return n.length > 0 && n.hide(), e.isFunction(o.complete) ? o.complete(t, i, r) : void 0
                }
            }(this)), r.on("click", "li > a[data-pjax]", function () {
                var t, i;
                return i = e(this).attr("href"), t = e(e(this).parent()), t.hasClass("disabled") ? void 0 : (t.siblings().removeClass("active"), t.addClass("active"))
            })) : void 0
        }
    }(jQuery)
}.call(this), function () {
    !function (e) {
        return e.fn.toggleHeader = function (t, i) {
            var n, r, a, o, s, l;
            return n = e(this), a = !1, s = 0, r = 5, l = n.outerHeight(), e(window).scroll(function () {
                return a = !0
            }), setInterval(function () {
                return a ? (o(), a = !1) : void 0
            }, 150), o = function () {
                var a;
                return a = e(this).scrollTop(), Math.abs(s - a) <= r ? void 0 : (a > s && a > l ? (n.addClass(t), e(i).modal("hide")) : a + e(window).height() < e(document).height() && n.removeClass(t), s = a)
            }
        }
    }(jQuery)
}.call(this), function () {
    !function (e) {
        var t, i;
        return i = {
            allowMultiple: !1, globalDrop: !1, dropZone: null, send: function () {
            }
        }, t = function () {
            function e(e) {
                var t, i;
                for (i in e)t = e[i], null != t && (this[i] = t)
            }

            return e
        }(), t.prototype = i, e.fn.imageUpload = function (e) {
            return e = new t(e), this.attr("multiple", e.allowMultiple), this.on("change", function () {
                return function (t) {
                    var i, n, r, a, o;
                    if (t.preventDefault(), t.stopPropagation(), n = [], e.allowMultiple)for (o = t.target.files, r = 0, a = o.length; a > r; r++)i = o[r], n.push(i); else n.push(t.target.files[0]);
                    return e.send(n)
                }
            }(this)), Modernizr.draganddrop && (e.globalDrop === !0 && (window.ondrop = function () {
                return function (t) {
                    var i, n, r, a, o;
                    if (t.preventDefault(), t.stopPropagation(), n = [], e.allowMultiple)for (o = t.dataTransfer.files, r = 0, a = o.length; a > r; r++)i = o[r], n.push(i); else n.push(t.dataTransfer.files[0]);
                    return e.send(n)
                }
            }(this)), null != e.dropZone && e.dropZone.on("drop", function () {
                return function (t) {
                    var i, n, r, a, o;
                    if (e.dropZone.focus(), t.preventDefault(), t.stopPropagation(), n = [], e.allowMultiple)for (o = t.originalEvent.dataTransfer.files, r = 0, a = o.length; a > r; r++)i = o[r], n.push(i); else n.push(t.originalEvent.dataTransfer.files[0]);
                    return e.send(n)
                }
            }(this))), this
        }
    }(jQuery)
}.call(this), function () {
    var e, t, i;
    i = ["keyup", !1, "blur", !1, "focus", !1, "drop", !0, "change", !1, "input", !1, "textInput", !1, "paste", !0, "cut", !0, "copy", !0, "contextmenu", !0], Maleskine.BrowserDetector.isIE() || (e = document.createElement("input"), t = "oninput" in e, t || (e.setAttribute("oninput", "return;"), t = "function" == typeof e.oninput), e = null, t && (i = ["input", !1, "textInput", !1])), $.fn.userChange = function (e, t) {
        var n;
        return $(this).data("userChangeCallback", e), $(this).data("userChangeData", t), n = function (i, r) {
            var a, o, s;
            return o = this, s = $(this), this.value !== s.data("priorValue") ? (s.data("priorValue", this.value), e.call(this, i, t)) : r ? (a = $.extend({}, i), setTimeout(function () {
                return n.call(o, a, !1)
            }, 1)) : void 0
        }, this.each(function () {
            var e, t, r;
            for (r = $(this).data("priorValue", this.value), e = 0, t = []; e < i.length;)!function (e) {
                return r.on(i[e], function (t) {
                    return n.call(this, t, i[e + 1])
                })
            }(e), t.push(e += 2);
            return t
        })
    }, $.fn.forceUpdateUserChangeData = function () {
        var e, t, i, n;
        if (n = $(this), i = n.data("priorValue"), t = this.value || this.val(), this.value !== i) {
            if (n.data("priorValue", t), e = n.data("userChangeCallback"), !e)return;
            return e.call(this, null, n.data("userChangeData"))
        }
    }
}.call(this), function () {
    $(function () {
        var e, t;
        return e = 10, t = function (e, t, i, n, r) {
            var a;
            return "bilibili" === n ? (a = '<div class="video-player player">', a += '<video width="' + t + '" height="' + i + '" preload="auto" controls="true">', a += '<source src="' + e + '" type="video/mp4">', a += '<object type="application/x-shockwave-flash" data="http://static.hdslb.com/play.swf" class="flash" style="width:' + t + "px; height:" + i + 'px;">', a += '<param name="bgcolor" value="#ffffff">', a += '<param name="allowfullscreeninteractive" value="true">', a += '<param name="allowfullscreen" value="true">', a += '<param name="quality" value="high">', a += '<param name="allowscriptaccess" value="always">', a += '<param name="wmode" value="direct">', a += '<param name="flashvars" value="' + r + '">', a += "</object>", a += "</video>", a += "</div>") : a = '<iframe class="player" src="' + e + '" height="' + i + '" width="' + t + '" frameborder=0 allowfullscreen style="width:' + t + "px; height:" + i + 'px;"></iframe>', a
        }, $.fn.activateVideo = Maleskine.BrowserDetector.isIE8() || Maleskine.BrowserDetector.lessThanIE8() ? function () {
            return $(this).find("div.video-package").each(function (e, t) {
                return t = $(t), t.html('<div class="video-description">\u60a8\u6240\u7528\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u89c6\u9891\u64ad\u653e\uff0c\u8bf7\u66f4\u65b0\u6d4f\u89c8\u5668\uff01</div>')
            })
        } : function () {
            var i, n, r;
            return n = $(this), r = n.width(), r = Math.round(r), i = Math.round(r / 6 * 5), n.find("div.video-package").each(function (n, a) {
                var o, s, l, c, u, d, h, p, f, m, g, v, b;
                return a = $(a), n >= e ? void a.remove() : (v = a.attr("data-video-url"), v && Maleskine.Utils.doesVideoURLAvailable(v) ? (f = a.attr("data-provider"), u = a.attr("data-flash-url"), p = $(t(v, r, i, f, u)), c = a.attr("data-cover-uuid"), o = a.find(".video-description"), s = o.html(), h = $('<div class="video-placeholder-area">' + s + "</div>"), h.css({width: r + "px"}), b = $('<img class="video-cover">'), b.attr("src", Maleskine.Utils.getVideoCoverImage(c, 90)), h.append(b), o.html(""), a.find("br").before(h), l = $('<div class="video-close-button"><i class="fa fa-eject"></i> \u6536\u8d77\u89c6\u9891</div>'), l.css({display: "none"}), m = $('<div class="video-provider-button"><i class="fa fa-external-link"></i> \u8f6c\u5230\u89c6\u9891\u9875</div>'), m.css({display: "none"}), "bilibili" === f && (l.css({"margin-top": "-20px"}), m.css({"margin-top": "-20px"}), d = u.split("&"), d = d.filter(function (e) {
                    return e.indexOf("aid") >= 0
                }), d.length > 0 ? (d = d[0], d = d.split("="), d = d[1] || "") : d = "", d = "" === d ? "http://www.bilibili.com/" : "http://www.bilibili.com/video/av" + d + "/", m.on("click", function () {
                    return window.open(d)
                })), a.append(l), a.append(m), g = !1, h.on("click", function () {
                    var e;
                    if (!g)return g = !0, h.after(p), e = !1, h.hide(), a.css({"margin-bottom": "50px"}), l.css({display: "block"}), "bilibili" === f ? m.css({display: "block"}) : void 0
                }), l.on("click", function () {
                    return g ? (g = !1, p.remove(), h.show(), a.css({"margin-bottom": ""}), l.css({display: "none"}), m.css({display: "none"})) : void 0
                })) : void a.remove())
            })
        }
    })
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/chats/friends"] = function (e) {
        var t = "", i = e.friends;
        if (i)for (var n, r = -1, a = i.length - 1; a > r;)n = i[r += 1], t += '<li> <a href="' + (Routes.new_chat_path({mail_to: n.id}) || "").toString().encodeHTML() + '">' + (n.name || "").toString().encodeHTML() + "</a></li>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/chats/message"] = function (e) {
        var t = '<li class="message_l" data-timestamp="' + (e.timestamp || "").toString().encodeHTML() + '" data-uuid="' + (e.uuid || "").toString().encodeHTML() + '"> <a class="avatar" href="' + (e.sender.path || "").toString().encodeHTML() + '">' + e.sender.avatar + "</a> <div><span>" + e.compiled_content + "</span></div></li>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/collection_submissions/reject"] = function (e) {
        var t = '<form accept-charset="UTF-8" action="/collection_submissions/' + (e.collectionSubmissionId || "").toString().encodeHTML() + '/reject" data-remote="true" method="post"> <div class="modal-header"> <b>' + (I18n.t("reading.reject.title") || "").toString().encodeHTML() + '</b> </div> <div class="modal-body"> <p>' + (I18n.t("reading.reject.description") || "").toString().encodeHTML() + '</p> <textarea id="content" name="content" placeholder="' + (I18n.t("reading.reject.placeholder") || "").toString().encodeHTML() + '"></textarea> </div> <div class="modal-footer"> <button class="btn" data-dismiss="modal" aria-hidden="true">' + (I18n.t("reading.reject.close") || "").toString().encodeHTML() + '</button> <input class="btn btn-info" name="commit" type="submit" value="' + (I18n.t("reading.reject.submit") || "").toString().encodeHTML() + '"> </div></form>';
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/child_comment"] = function (e) {
        var t = '<div class="child-comment" id="comment-' + (e.id || "").toString().encodeHTML() + '" data-id="' + (e.id || "").toString().encodeHTML() + '" data-state="new"> <p> <a class="blue-link" href="' + (e.author.path || "").toString().encodeHTML() + '">' + (e.author.name || "").toString().encodeHTML() + "</a>\uff1a " + e.compiled_content + ' </p> <div class="child-comment-footer clearfix text-right"> <a data-nickname="' + (e.author.name || "").toString().encodeHTML() + '" class="reply" href="javascript:void(null)" data-id="' + (e.parent_id || "").toString().encodeHTML() + '">' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + '</a> <a data-confirm="' + (I18n.t("reading.comment.delete_confirm") || "").toString().encodeHTML() + '" class="delete" data-remote="true" data-commenter-id="' + (e.author.id || "").toString().encodeHTML() + '" rel="nofollow" data-method="delete" data-type="json" href="' + (e.destroy_path || "").toString().encodeHTML() + '">' + (I18n.t("reading.comment.delete_button") || "").toString().encodeHTML() + '</a> <span class="reply-time pull-left"><a href="' + (e.anchor_path || "").toString().encodeHTML() + '">' + (e.created_at || "").toString().encodeHTML() + "</a></span> </div></div>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/entity"] = function (e) {
        var t = '<div class="note-comment clearfix" id="comment-' + (e.id || "").toString().encodeHTML() + '" data-state="new"> <div class="content"> <div class="meta-top"> <a href="' + (e.author.path || "").toString().encodeHTML() + '"> <div class="avatar"><img thumbnail="90x90" quality="100" src="' + (e.author.avatar || "").toString().encodeHTML() + '" alt="1"></div> </a> <p><a class="author-name" href="' + (e.author.path || "").toString().encodeHTML() + '">' + (e.author.name || "").toString().encodeHTML() + '</a></p> <span class="reply-time"> <small>' + (I18n.t("reading.comment.floor", {floor: e.floor}) || "").toString().encodeHTML() + ' \xb7 </small> <a href="' + (e.anchor_path || "").toString().encodeHTML() + '">' + (e.created_at || "").toString().encodeHTML() + "</a></span> </div> <p>" + e.compiled_content + '</p> <div class="comment-footer clearfix text-right"> <a data-id="' + (e.id || "").toString().encodeHTML() + '" class="like pull-left" href="javascript:void(0)"> <i class="fa fa-heart-o"></i>' + (I18n.t("reading.comment.like") || "").toString().encodeHTML() + '<span>(0)</span> </a> <a data-nickname="' + (e.author.name || "").toString().encodeHTML() + '" data-id="' + (e.id || "").toString().encodeHTML() + '" class="reply" href="javascript:void(0)">' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + '</a> <a data-confirm="' + (I18n.t("reading.comment.delete_confirm") || "").toString().encodeHTML() + '" class="delete" data-remote="true" data-commenter-id="' + (e.author.id || "").toString().encodeHTML() + '" rel="nofollow" data-method="delete" data-type="json" href="' + (e.destroy_path || "").toString().encodeHTML() + '">' + (I18n.t("reading.comment.delete_button") || "").toString().encodeHTML() + '</a> </div> <div class="child-comment-list hide"> <div data-state="remaining-child-comments"></div> </div> </div></div>';
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/footer"] = function (e) {
        var t = "";
        return e.currentUser ? (t += " ", e.currentUser.id == e.comment.userId ? t += ' <a class="delete pull-right" data-confirm="' + (I18n.t("reading.comment.delete_confirm") || "").toString().encodeHTML() + '" data-method="delete" data-remote="true" href="' + (Routes.note_comment_path(e.note.id, e.comment.id) || "").toString().encodeHTML() + '" rel="nofollow"> ' + (I18n.t("reading.comment.delete_button") || "").toString().encodeHTML() + " </a> " : e.currentUser.id == e.noteAuthor.id && (t += ' <a class="dismiss pull-right" data-method="post" data-remote="true" data-type="json" href="' + (Routes.dismiss_comment_path(e.comment.id) || "").toString().encodeHTML() + '" rel="nofollow"> ' + (I18n.t("reading.comment.dismiss_button") || "").toString().encodeHTML() + " </a> "), t += " ", e.blocking || (t += ' <a class="reply pull-right" data-nickname="' + (e.comment.userName || "").toString().encodeHTML() + '" href="javascript:void(null)"> ' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + " </a> " + JST.render("comment/like_button", {
                current_user_liked: e.comment.currentUserLiked,
                like_id: e.comment.likeId,
                likeable_id: e.comment.id,
                likes_count: e.comment.likesCount
            }) + " ", e.currentUser.id != e.comment.userId && (t += ' <div class="dropdown pull-right report"> <a class="report_comment pull-right" href="#" data-toggle="dropdown"> ' + (I18n.t("reading.abuse_report.report") || "").toString().encodeHTML() + ' </a> <ul class="dropdown-menu arrow-top"> <li> <a href="' + (Routes.abuse_reports_path({
                abuse_report: {
                    abuse_reportable_id: e.comment.id,
                    abuse_reportable_type: "Comment",
                    type: "ad"
                }
            }) || "").toString().encodeHTML() + '" data-type="json" data-method="post" data-remote="true"> ' + (I18n.t("reading.abuse_report.ad") || "").toString().encodeHTML() + ' </a> </li> <li><a href="" data-toggle="modal" data-id="' + (e.comment.id || "").toString().encodeHTML() + '" data-type="Comment">' + (I18n.t("reading.abuse_report.other") || "").toString().encodeHTML() + "</a></li> </ul> </div> "), t += " ")) : t += ' <a class="reply pull-right" data-signin-link="true" data-toggle="modal" href="' + (Routes.new_user_session_path() || "").toString().encodeHTML() + '"> <i class="fa fa-reply"></i>' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + " </a>", t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/footer_metabar"] = function (e) {
        var t = '<div class="comment-toolbar clearfix"> <span class="pull-right"> <a href="javascript:void(0)" data-id=' + (e.parentId || "").toString().encodeHTML() + ' class="reply"> <i class="fa fa-pencil"></i>' + (I18n.t("reading.comment.footer.add_comment") || "").toString().encodeHTML() + " </a> </span></div>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/form"] = function (e) {
        var t = '<form class="new-child-comment" action="' + (Routes.note_comments_path(e.noteId) || "").toString().encodeHTML() + '" accept-charset="UTF-8" data-remote="true" data-type="json" method="post"> <input type="hidden" name="comment[parent_id]" value="' + (e.parentId || "").toString().encodeHTML() + '"> <div class="comment-text"> <textarea maxlength="2000" placeholder="' + (I18n.t("reading.comment.form.content_placeholder") || "").toString().encodeHTML() + '" class="mousetrap" name="comment[content]"></textarea> <div> <input type="submit" name="commit" value="' + (I18n.t("reading.comment.form.submit_button") || "").toString().encodeHTML() + '" class="btn btn-small btn-info" data-disable-with="' + (I18n.t("reading.comment.form.submitting_comment_disable") || "").toString().encodeHTML() + '"> <div class="emoji"> <a href="#emoji-modal" data-toggle="modal"><i class="fa fa-smile-o"></i></a> <span class="hotkey"> ';
        return t += Maleskine.BrowserDetector.isMac() ? " " + (I18n.t("reading.comment.form.hotkey.mac") || "").toString().encodeHTML() + " " : " " + (I18n.t("reading.comment.form.hotkey.other") || "").toString().encodeHTML() + " ", t += ' </span> <span class="warning" style="display: none"><i class="fa fa-exclamation-circle"></i><span class="warning-text"></span></span> </div> </div> </div></form>'
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/paginator"] = function (e) {
        var t = '<div class="pagination clearfix"><ul>';
        e.current_page > 1 && (t += '<li class="next"><a href="javascript:void(null)" data-page="' + (e.current_page - 1) + '" rel="last"><i class="fa fa-angle-left"></i></a></li>');
        for (var i = 1; i <= e.total_pages; i++)i == e.current_page && (t += '<li class="active"><a href="javascript:void(null)">' + (i || "").toString().encodeHTML() + "</a></li>"), i != e.current_page && (t += '<li class=""><a href="javascript:void(null)" data-page="' + i + '" >' + (i || "").toString().encodeHTML() + "</a></li>");
        return e.current_page < e.total_pages && (t += '<li class="next"><a href="javascript:void(null)" data-page="' + (e.current_page + 1) + '" rel="next"><i class="fa fa-angle-right"></i></a></li>'), t += "</ul></div>"
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/comment/timeline_comments_item"] = function (e) {
        var t = '<p><a href="' + (e.author.path || "").toString().encodeHTML() + '" class="author-avatar" data-toggle="tooltip" data-placement="left" data-original-title="' + (e.author.name || "").toString().encodeHTML() + '" target="_blank"><img src="' + (e.author.avatar || "").toString().encodeHTML() + '" /></a>' + e.compiled_content;
        return e.can_reply && (t += ' <a href="javascript:void(null)" class="reply" data-nickname="' + (e.author.name || "").toString().encodeHTML() + '">' + (I18n.t("reading.timeline.reply") || "").toString().encodeHTML() + "</a>"), Maleskine.currentUserSlug == e.author.slug && (t += '<a href="javascript:void(null)" class="delete" data-destroy-url="' + e.destroy_path + '">' + (I18n.t("reading.timeline.delete") || "").toString().encodeHTML() + "</a>"), t += "</p>"
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/common/captcha"] = function (e) {
        var t = '<input id="captcha_key" name="captcha_key" type="hidden" value="' + (e.captcha_key || "").toString().encodeHTML() + '">';
        return e.skip_captcha || (t += ' <input id="captcha" name="captcha" placeholder="' + (I18n.t("reading.captcha.placeholder") || "").toString().encodeHTML() + '" type="text"> <a href="javascript:void(null)" class="refresh_captcha"> <img alt="captcha img" src="' + (e.captcha_image_url || "").toString().encodeHTML() + '"> </a> <p class="text-right"><a href="javascript:void(null)" class="refresh_captcha">' + (I18n.t("reading.captcha.refresh_button") || "").toString().encodeHTML() + "</a></p>"), t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/modals/sms_bind_modal"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<div id="'), i.push(n(this.modal_id)), i.push('" class="modal setting-modal sms-bind-modal hide fade" tabindex="-1" aria-labelledby="\u8eab\u4efd\u9a8c\u8bc1 Modal" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close"><span aria-hidden="true">&times;</span></button>\n  </div>\n  <div class="modal-body">\n    <h4>'), i.push(n(I18n.t("reading.modals.sms_bind_modal.title"))), i.push('<img v-if="isAjaxLoading" class=\'loading\' src=\'http://baijii-common.b0.upaiyun.com/loaders/tiny.gif\'></h4>\n    <div class="sms-binding">\n      <div class="choose_phone clearfix">\n        <a class="selector btn dropdown-toggle" data-toggle="dropdown" data-iso-code="{{ selectedISOCode }}">+{{ selectedCallingCode }} <span class="caret"></span></a>\n        <ul class="nation_code dropdown-menu" role="menu">\n          <template v-for="country in important_countries">\n            <li @click="countryChanged($event)" data-calling-code="{{ country.calling_code }}" data-iso-code="{{ country.iso_code }}"><a tabindex="-1" href="javascript:void(null)"><span class="nation_code">+{{ country.calling_code }}</span><span class="nation_name">{{ country.name }}</span></a></li>\n          </template>\n          <li class="separate_line"></li>\n          <template v-for="country in all_countries">\n            <li @click="countryChanged($event)" data-calling-code="{{ country.calling_code }}" data-iso-code="{{ country.iso_code }}"><a tabindex="-1" href="javascript:void(null)"><span class="nation_code">+{{ country.calling_code }}</span><span class="nation_name">{{ country.name }}</span></a></li>\n          </template>\n        </ul>\n        <input type="text" v-model=\'mobileNumber\' placeholder="'), i.push(n(I18n.t("reading.modals.sms_bind_modal.pls_enter_mobile_number"))), i.push('">\n        <button v-if="!isCoolingDown"  @click="sendCode($event)" class="btn btn-large btn-success" type="button" >'), i.push(n(I18n.t("reading.modals.sms_bind_modal.send_sms_code"))), i.push('</button>\n        <button v-if="isCoolingDown" class="btn btn-large btn-success disabled" type="button" >{{ coolingDownSeconds }}s</button>\n      </div>\n      <div class="get-captcha clearfix">\n        <input v-model=\'code\' type="text" placeholder="'), i.push(n(I18n.t("reading.modals.sms_bind_modal.pls_enter_code"))), i.push('">\n      </div>\n    </div>\n    <small v-if="error.length > 0" class="text-error"><i class="fa fa-fw fa-exclamation-circle"></i>{{ error }}</small>\n    <small v-if="info.length > 0"  class="text-info"><i class="fa fa-fw fa-exclamation-circle"></i>{{ info }}</small>\n  </div>\n  <div class="modal-footer">\n    <button @click="submit" type="button" class="btn btn-large btn-info {{ submitDisabled ? \'disabled\' : \'\' }}">'), i.push(n(I18n.t("reading.modals.sms_bind_modal.ok"))), i.push("</button>\n  </div>\n</div>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/collection"] = function (e) {
        var t = "", i = e.collections;
        if (i)for (var n, r = -1, a = i.length - 1; a > r;)n = i[r += 1], t += ' <li id="collection_' + (n.id || "").toString().encodeHTML() + '" class="' + (n.has_note ? "approved" : "").toString().encodeHTML() + '"> ', t += n.has_note ? ' <a href="javascript:void(null)" class="add"> <div class="avatar"> <img alt="' + (n.image_file_name || "").toString().encodeHTML() + '" src="' + (n.image_source || "").toString().encodeHTML() + '" thumbnail="180x180"> </div> <h5> ' + (n.title || "").toString().encodeHTML() + " " + (I18n.t("reading.notes.show.contribute_status.approved") || "").toString().encodeHTML() + " </h5> <small>" + (n.owner_name || "").toString().encodeHTML() + (I18n.t("reading.bian") || "").toString().encodeHTML() + '</small> </a> <a href="/collection_notes/' + (n.collection_note_id || "").toString().encodeHTML() + '" class="delete" data-method="delete" data-remote="true" rel="nofollow">' + (I18n.t("reading.remove") || "").toString().encodeHTML() + "</a> " : ' <a href="' + (Routes.collection_notes_path({
            note_id: e.note_id,
            collection_id: n.id
        }) || "").toString().encodeHTML() + '" class="add" data-method="post" data-remote="true" rel="nofollow"> <div class="avatar"> <img alt="' + (n.image_file_name || "").toString().encodeHTML() + '" src="' + (n.image_source || "").toString().encodeHTML() + '" thumbnail="180x180"> </div> <h5>' + (n.title || "").toString().encodeHTML() + "</h5> <small>" + (n.owner_name || "").toString().encodeHTML() + (I18n.t("reading.bian") || "").toString().encodeHTML() + "</small> </a> ", t += " </li>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/further_reading_content"] = function (e) {
        var t = '<div id="further-reading-form" class="active"> <i class="fa fa-plus-circle"></i> <div id="reading-info" class="reading-info"> <h6 id="further-reading-title" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.title_placeholder") || "").toString().encodeHTML() + '">' + (e.data.title || "").toString().encodeHTML() + '</h6> \u2009\u2014\u2009 <span id="further-reading-description" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.description_placeholder") || "").toString().encodeHTML() + '">' + (e.data.description || "").toString().encodeHTML() + '</span> </div> <div id="reading-footer"> <p class="article-origin"> <span><a href="' + (Routes.user_path(e.slug) || "").toString().encodeHTML() + '" target="_blank">' + (e.nickname || "").toString().encodeHTML() + '</a>\u30fb <a id="further-reading-url" href="' + (e.data.url || "").toString().encodeHTML() + '" target="_blank">' + (e.data.host || "").toString().encodeHTML() + '</a></span> </p> </div> <a id="submit-further-reading" class="btn-link left">' + (I18n.t("reading.further_reading.button.save") || "").toString().encodeHTML() + '</a> <a id="cancel-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.cancel") || "").toString().encodeHTML() + "</a></div>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/further_reading_item"] = function (e) {
        var t = '<li id="further_reading_' + (e.id || "").toString().encodeHTML() + '" data-can-be-dismissed="' + (e.can_be_dismissed || "").toString().encodeHTML() + '"> <a class="reading-title" href="' + (e.url || "").toString().encodeHTML() + '"> <h6>' + (e.title || "").toString().encodeHTML() + "</h6> ";
        return e.description && (t += " \u2014 " + (e.description || "").toString().encodeHTML() + " "), t += ' </a> <div class="article-origin"> <a href="' + (Routes.user_path(e.user_slug) || "").toString().encodeHTML() + '">' + (e.user_name || "").toString().encodeHTML() + '</a>\u30fb <a href="' + (e.url || "").toString().encodeHTML() + '"> ', t += e.fr_author ? " " + (e.host || "").toString().encodeHTML() + " " : " " + (e.host || "").toString().encodeHTML() + " \u2192 ", t += " </a> ", e.fr_author && (t += ' \u30fb <a id="delete-further-reading" data-further-reading-id="' + (e.id || "").toString().encodeHTML() + '" href="javascript:void(null)"> ' + (I18n.t("reading.further_reading.button.delete") || "").toString().encodeHTML() + " </a> "), t += " ", e.note_author ? t += " " + JST.render("note/further_reading_states", {
                id: e.id,
                state: e.state,
                can_be_dismissed: e.can_be_dismissed
            }) + " " : "private" == e.state && (t += ' <a href="javascript:void(null)" class="reading-states"><i class="fa fa-eye-slash"></i>' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + "</a> "), t += " </div></li>"
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/further_reading_link"] = function () {
        var e = '<div id="further-reading-form" class="active"> <i class="fa fa-plus-circle"></i> <span id="further-reading-link-text" class="reading-link-text placeholder" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.link_text_placeholder") || "").toString().encodeHTML() + '"></span> <img alt="Loader-tiny" class="hide loader-tiny" id="loader" src="' + Maleskine.CommonImages.loader("tiny") + '"> <br> <a id="load-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.load") || "").toString().encodeHTML() + '</a> <a id="cancel-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.cancel") || "").toString().encodeHTML() + "</a></div>";
        return e
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/further_reading_states"] = function (e) {
        var t = '<ul class="unstyled edit further-reading-states" data-origin-state="' + (e.state || "").toString().encodeHTML() + '" data-further-reading-id="' + (e.id || "").toString().encodeHTML() + '"> ';
        return "private" == e.state ? (t += ' <li><a href="javascript:void(null)"><i class="fa fa-eye-slash"></i>' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="public"> <a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + "</a> </li> ", e.can_be_dismissed && (t += ' <li class="hide state-item" data-state="dismiss"> <a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + "</a> </li> "), t += " ") : "public" == e.state ? (t += ' <li><a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="private"> <a href="javascript:void(null)"><i class="fa fa-eye-slash"></i> ' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + "</a> </li> ", e.can_be_dismissed && (t += ' <li class="hide state-item" data-state="dismiss"> <a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + "</a> </li> "), t += " ") : t += ' <li><a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="private"> <a href="javascript:void(null)"><i class="fa fa-eye-slash"></i> ' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + '</a> </li> <li class="hide state-item" data-state="public"> <a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + "</a> </li> ", t += "</ul>"
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/like_item"] = function (e) {
        var t = '<li data-user-id="' + (e.user.id || "").toString().encodeHTML() + '"> <a class="avatar" href="' + (Routes.user_path(e.user.slug) || "").toString().encodeHTML() + '"> <img src="' + (e.user.avatar_source || "").toString().encodeHTML() + '" /> </a> <a class="blue-link" href="' + (Routes.user_path(e.user.slug) || "").toString().encodeHTML() + '">' + (e.user.nickname || "").toString().encodeHTML() + '</a> <span class="time">' + (e.created_at || "").toString().encodeHTML() + "</span></li>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/reward_item"] = function (e) {
        var t = '<a href="' + (e.payer_url || "").toString().encodeHTML() + '" class="avatar" data-nickname="' + (e.nickname || "").toString().encodeHTML() + '" data-created-at="' + (e.created_at || "").toString().encodeHTML() + '"> <img src="' + (e.avatar_source || "").toString().encodeHTML() + '" /></a>';
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/reward_item_in_modal"] = function (e) {
        var t = "", i = e.rewards;
        if (i)for (var n, r = -1, a = i.length - 1; a > r;)n = i[r += 1], t += "<li> ", t += n.buyer.slug ? ' <a class="avatar" href="' + (Routes.user_path(n.buyer.slug) || "").toString().encodeHTML() + '"> <img src="' + (n.buyer.avatar_url || "").toString().encodeHTML() + '" quality="100" thumbnail="90x90"> </a> <a class="blue-link" href="' + (Routes.user_path(n.buyer.slug) || "").toString().encodeHTML() + '">' + (n.buyer.nickname || "").toString().encodeHTML() + "</a> " : ' <a class="avatar" href="javascript:void(null)"> <img src="' + (n.buyer.avatar_url || "").toString().encodeHTML() + '" quality="100" thumbnail="90x90"> </a> <a class="blue-link" href="javascript:void(null)">' + (n.buyer.nickname || "").toString().encodeHTML() + "</a> ", t += ' <span class="time">' + (n.created_at || "").toString().encodeHTML() + "</span> ", n.message && (t += " <p>" + (n.message || "").toString().encodeHTML() + "</p> "), t += "</li>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/note/share_buttons"] = function (e) {
        var t = "";
        return e.display_collection_button && (t += '<a href="javascript:void(null)" class="add-collection" data-toggle="modal" data-target="#contribute-modal"> <i class="fa fa-plus"></i><span>\u52a0\u5165\u4e13\u9898</span></a>'), t += Maleskine.isLogined() ? '<a data-type="json" data-mcomponent="easy-bookmark" class="bookmark" data-remote="true" rel="nofollow" data-method="post" href="' + (Routes.bookmark_note_path(e.note_id) || "").toString().encodeHTML() + '"> <i class="fa fa-bookmark-o"></i><span>\u6536\u85cf\u6587\u7ae0</span></a>' : '<a class="bookmark" data-signin-link="true" data-toggle="modal" href="/sign_in"> <i class="fa fa-bookmark-o"></i><span>\u6536\u85cf\u6587\u7ae0</span></a>', t += '<span> <a href="javascript:void(null)" data-toggle="dropdown"><i class="fa fa-share-square-o"></i> \u5206\u4eab</a> <ul class="dropdown-menu arrow-top"> <li> <a href="' + (e.share_urls.weibo || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("weibo", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.douban || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("douban", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.tweibo || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("tweibo", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.qzone || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("qzone", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.twitter || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("twitter", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.facebook || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("facebook", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.google_plus || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("google_plus", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> <li> <a href="' + (e.share_urls.renren || "").toString().encodeHTML() + '"> <img src="' + (Maleskine.CommonImages.social_icon("renren", 32, 32) || "").toString().encodeHTML() + '" /> </a> </li> </ul></span>'
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/rewards/wx_pub_qr_pay"] = function (e) {
        var t = '<div id="wx-pub-qr-pay-modal" class="modal hide fade wx-pub-qr-pay-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\xd7</button> </div> <div class="modal-body"> <h4>\u5fae\u4fe1\u626b\u7801\u652f\u4ed8</h4> <p>\u6253\u8d4f\u91d1\u989d\uff1a<span><i class="fa fa-yen"></i>' + (e.amount || "").toString().encodeHTML() + "</span></p> </div></div>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/collections"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                var e, t, r, a, o;
                for (i.push('<li>\n  <h4 class="tltle">\n    <a href="'), i.push(n(Routes.show_collection_path(this.entry.slug))), i.push('" target="_blank">\n      <i class="fa fa-th"></i>\n      '), i.push(n(this.entry.title)), i.push("\n    </a>\n  </h4>\n  "), i.push(this.entry.content), i.push('\n  <p class="footer">\n    <!-- \u5fc5\u987b\u5199\u5728\u4e00\u884c\u91cc\u9762\uff0c\u8fd9\u6837 eco \u4e0d\u4f1a\u8f93\u51fa\u591a\u4f59\u7684\u7a7a\u683c -->\n    '), o = this.entry.editors, r = t = 0, a = o.length; a > t; r = ++t)e = o[r], i.push('<a href="'), i.push(n(Routes.user_path({id: e.slug}))), i.push('">'), i.push(n(e.nickname)), i.push("</a>"), r !== this.entry.editors.length - 1 && i.push(n("\u3001"));
                i.push(n(I18n.t("reading.search.collections.footer.editing"))), i.push("\n    "), i.push(n(I18n.t("reading.search.collections.footer.meta", {
                    public_notes_count: this.entry.public_notes_count,
                    likes_count: this.entry.likes_count
                }))), i.push("\n  </p>\n</li>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/error"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<div class="no-results text-center">\n  <i class="fa fa-search fa-2x"></i>\n  <h5>'), i.push(n(this.message)), i.push("</h5>\n\n  "), 429 === this.statusCode ? (i.push('\n    <a class="btn btn-rounded btn-success" href="javascript:(null)" data-retry>'), i.push(n(I18n.t("reading.search.retry"))), i.push("</a>\n  ")) : (i.push('\n    <a class="btn btn-rounded btn-success" href="'), i.push(n(Routes.new_feedback_path())), i.push('" data-retry>'), i.push(n(I18n.t("reading.search.feedback"))), i.push("</a>\n  ")), i.push("\n</div>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/no_result"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<div class="no-results text-center">\n  <i class="fa fa-search fa-2x"></i>\n  <h5>'), i.push(n(I18n.t("reading.search.not_found"))), i.push("</h5>\n</div>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/no_result_collection"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<div class="no-results text-center">\n  <i class="fa fa-search fa-2x"></i>\n  <h5>'), i.push(n(I18n.t("reading.search.not_found"))), i.push("</h5>\n  <p>"), i.push(n(I18n.t("reading.search.not_found_collection"))), i.push('</p>\n  <a class="btn btn-rounded btn-success" href="'), i.push(n(Routes.new_collection_path())), i.push('">'), i.push(n(I18n.t("reading.search.new_collection"))), i.push("</a>\n</div>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/notebooks"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<li>\n  <h4 class="tltle">\n    <a href="'), i.push(n(Routes.list_notebook_path({id: this.entry.id}))), i.push('" target="_blank">\n      <i class="fa fa-book"></i>\n      '), i.push(n(this.entry.name)), i.push('\n    </a>\n  </h4>\n  <p class="footer">\n    <!-- \u5fc5\u987b\u5199\u5728\u4e00\u884c\u91cc\u9762\uff0c\u8fd9\u6837 eco \u4e0d\u4f1a\u8f93\u51fa\u591a\u4f59\u7684\u7a7a\u683c -->\n    <a href="'), i.push(n(Routes.user_path({id: this.entry.user.slug}))), i.push('">'), i.push(n(this.entry.user.nickname + "\u30fb\u8457")), i.push("</a>,\n    "), i.push(n(I18n.t("reading.search.notebooks.footer", {
                    public_notes_count: this.entry.public_notes_count,
                    subscribers_count: this.entry.subscribers_count
                }))), i.push("\n  </p>\n</li>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/notes"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<li>\n  <h4 class="title">\n    <a href="'), i.push(n(Routes.show_note_path(this.entry.slug))), i.push('" target="_blank">\n      <i class="fa fa-file-text"></i>\n      '), i.push(this.entry.title), i.push("\n    </a> \n  </h4>\n  <p>"), i.push(this.entry.content), i.push('</p>\n  <div class="list-footer">\n    <a href="'), i.push(n(Routes.user_path(this.entry.user.slug))), i.push('">'), i.push(this.entry.user.nickname), i.push('</a>\n    <a href="'), i.push(n(Routes.show_note_path(this.entry.slug))), i.push('">'), i.push(n(I18n.t("reading.search.notes.footer.views", {count: this.entry.views_count}))), i.push('</a>\n    <a target="_blank" href="'), i.push(n(Routes.show_note_path(this.entry.slug) + "#comments")), i.push('">'), i.push(n(I18n.t("reading.search.notes.footer.comments", {count: this.entry.public_comments_count}))), i.push("</a>\n    <span>"), i.push(n(I18n.t("reading.search.notes.footer.likes", {count: this.entry.likes_count}))), i.push("</span>\n    "), this.entry.total_rewards_count > 0 && i.push("<span>" + I18n.t("reading.search.notes.footer.rewards", {count: this.entry.total_rewards_count}) + "</span>"), i.push('\n    \xb7 <span data-timeago title="'), i.push(n(this.entry.first_shared_at)), i.push('"></span>\n  </div>\n</li>\n')
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/pagination"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                var e, t, r, a, o, s, l;
                if (i.push('<div class="pagination">\n  <ul>\n    <!-- Prev -->\n    '), 1 !== this.currentPage && (i.push('\n      <li data-page="'), i.push(n(this.currentPage - 1)), i.push('"><a href="javascript:void(null)">'), i.push(n(I18n.t("reading.search.pagination.prev"))), i.push("</a></li>\n    ")), i.push("\n\n    <!-- On the left -->\n    "), this.leftCount > 0) {
                    for (i.push("\n      "), e = t = a = this.currentPage - this.leftCount, o = this.currentPage - 1; o >= a ? o >= t : t >= o; e = o >= a ? ++t : --t)i.push('\n        <li data-page="'), i.push(n(e)), i.push('"><a href="javascript:void(null)">'), i.push(n(e)), i.push("</a></li>\n      ");
                    i.push("\n    ")
                }
                if (i.push('\n\n    <li class="active"><a href="javascript:void(null)">'), i.push(n(this.currentPage)), i.push("</a></li>\n\n    <!-- On the right -->\n    "), this.rightCount > 0) {
                    for (i.push("\n      "), e = r = s = this.currentPage + 1, l = this.currentPage + this.rightCount; l >= s ? l >= r : r >= l; e = l >= s ? ++r : --r)i.push('\n        <li data-page="'), i.push(n(e)), i.push('"><a href="javascript:void(null)">'), i.push(n(e)), i.push("</a></li>\n      ");
                    i.push("\n    ")
                }
                i.push("\n\n    <!-- Next -->\n    "), this.page !== this.totalPages && (i.push('\n      <li data-page="'), i.push(n(this.currentPage + 1)), i.push('"><a href="javascript:void(null)">'), i.push(n(I18n.t("reading.search.pagination.next"))), i.push("</a></li>\n    ")), i.push("\n  </ul>\n</div>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/results"] = function (e) {
        e || (e = {});
        var t, i = [], n = e.safe, r = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, r || (r = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                var e, t, n, r;
                for (i.push('<ul class="unstyled list">\n  '), r = this.entries, t = 0, n = r.length; n > t; t++)e = r[t], i.push("\n    "), i.push(JST.render("search/" + this.type, {
                    type: this.type,
                    entry: e
                })), i.push("\n  ");
                i.push("\n</ul>\n")
            }).call(this)
        }.call(e), e.safe = n, e.escape = r, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/search/users"] = function (e) {
        e || (e = {});
        var t, i = [], n = function (e) {
            return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? a(e) : ""
        }, r = e.safe, a = e.escape;
        return t = e.safe = function (e) {
            if (e && e.ecoSafe)return e;
            ("undefined" == typeof e || null == e) && (e = "");
            var t = new String(e);
            return t.ecoSafe = !0, t
        }, a || (a = e.escape = function (e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }), function () {
            (function () {
                i.push('<li>\n  <h4 class="tltle">\n    <a class="avatar" href="'), i.push(n(Routes.user_path(this.entry.slug))), i.push('" target="_blank">\n      <img style="width: 30px" src="'), i.push(n(this.entry.avatar_url)), i.push('" alt="100">\n      '), i.push(n(this.entry.nickname)), i.push('\n    </a>\n  </h4>\n  <p class="footer">\n    '), i.push(n(I18n.t("reading.search.users.footer", {
                    total_wordage: this.entry.total_wordage,
                    public_notes_count: this.entry.public_notes_count,
                    total_likes_count: this.entry.total_likes_count,
                    followers_count: this.entry.followers_count
                }))), i.push("\n  </p>\n</li>\n")
            }).call(this)
        }.call(e), e.safe = r, e.escape = a, i.join("")
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/social/share_buttons"] = function (e) {
        var t = "<h1>" + (e.title || "").toString().encodeHTML() + "</h1>";
        return t
    }
}.call(this), function () {
    this.JST || (this.JST = {}), this.JST["reading/templates/social/timeline_comments"] = function () {
        var e = "";
        return e
    }
}.call(this), function () {
    $(function () {
        var e, t, i, n, r;
        return Maleskine.currentUserId = $("#current_user_id").attr("value"), Maleskine.currentUserSlug = $("#current_user_slug").attr("value"), Maleskine.isLogined = function () {
            return null != Maleskine.currentUserId
        }, JST.render = function (e, t) {
            return JST["reading/templates/" + e](t)
        }, $(".show-content").activateVideo(), $(".modal").on("shown", function () {
            return $(this).hasClass("fullscreen") ? $(".modal-backdrop").css("background", "#FFF").css("opacity", 1) : void 0
        }), r = Maleskine.BrowserDetector.isMobile() ? "touchend" : "click", $(".set-view-mode").on(r, function () {
            var e;
            return e = $(this), e.hasClass("daytime") ? (Maleskine.Utils.setNight(), e.removeClass("daytime").addClass("nighttime").html('<i class="fa fa-sun-o">')) : (Maleskine.Utils.setDay(), e.removeClass("nighttime").addClass("daytime").html('<i class="fa fa-moon-o">'))
        }), $.support.pjax && ($.pjax.defaults.timeout = !1), I18n.defaultLocale = "zh-CN", I18n.locale = $("body").data("locale"), $(".shutdown").length > 0 && (n = $(".shutdown").data("notice-id"), $.cookie("hide_notice") !== n && ($(".shutdown > i").click(function () {
            return $.cookie("hide_notice", n, {path: "/"}), $(".shutdown").slideToggle()
        }), $(".shutdown").slideToggle())), Maleskine.Utils.initLaddaButton($("body")), $("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"}), $("input[type=radio]").iCheck({radioClass: "iradio_minimal"}), Maleskine.BrowserDetector.lessThanIE8() && (i = $("<div id='ie-alert'></div>"), i.append('<div class="mock"></div><div class="content"></div>'), i.find(".content").append('<h2><span class="exclamation-circle">!</span>' + I18n.t("ie_warning.title") + "</h2>"), i.find(".content").append("<br />"), i.find(".content").append('<p class="show-link"> ' + I18n.t("ie_warning.upgrade_ie") + "<br />" + I18n.t("ie_warning.use_chrome") + "</p>"), i.find(".content").append('<p class="skip"><a href="javascript:void(null);" onclick="$(\'#ie-alert\').remove();">' + I18n.t("ie_warning.skip") + "</a></p>"), $("body").prepend(i)), $("img[lazy-avatar]").length > 0 && $(window).on("load", function () {
            var e, t, i, n, r;
            for (n = $("img[lazy-avatar]"), r = [], t = 0, i = n.length; i > t; t++)e = n[t], r.push($(e).attr("src", $(e).attr("lazy-avatar")));
            return r
        }), $("select[data-enable-select2]").length > 0 && ($("select[data-enable-select2]").data("old-val", $("select[data-enable-select2]").val()), $("select[data-enable-select2]").select2().on("change", function () {
            var e, t, i, n, r, a, o, s;
            for (o = $(this).data("old-val") || [], a = $(this).val() || [], t = null, o.length > a.length ? (e = o, s = a) : (s = o, e = a), n = 0, r = e.length; r > n; n++)if (i = e[n], s.indexOf(i) < 0) {
                t = i;
                break
            }
            return $.post($(this).data("update_url"), {collection_id: t}), $("select[data-enable-select2]").data("old-val", $("select[data-enable-select2]").val())
        })), $("[data-toggle=tooltip]").tooltip(), $("a[data-toggle=popover]").popover(), t = $("#flash"), e = $("#error_explanation ul > li"), t.length > 0 && $.each(t.children(), function () {
            return function (e, t) {
                var i, n, r;
                return r = $(t).data("flash-type"), n = "notice" === r ? "information" : "error", i = "notice" === r ? 2200 : 3500, $.each($(t).children(), function (e, t) {
                    return noty({text: $(t).text(), layout: "topCenter", type: n, timeout: i, theme: "maleskineTheme"})
                })
            }
        }(this)), e.length > 0 && $.each(e, function () {
            return function (e, t) {
                return noty({
                    text: $(t).text(),
                    layout: "topCenter",
                    type: "error",
                    timeout: 3e3,
                    theme: "maleskineTheme"
                })
            }
        }(this)), Maleskine.Utils.initModulesInElement($(document)), Maleskine.BrowserDetector.isIE8() || Maleskine.AuthorCard.initAuthorCards(), Maleskine.Utils.initFollowButtonEvents($("body"))
    })
}.call(this), function () {
    var e = function (e, i) {
        function n() {
            this.constructor = e
        }

        for (var r in i)t.call(i, r) && (e[r] = i[r]);
        return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
    }, t = {}.hasOwnProperty;
    Maleskine.ViewModeModal = function (t) {
        function i() {
            i.__super__.constructor.apply(this, arguments), this.bgButtons.on("click", function (e) {
                return function (t) {
                    var i;
                    return i = $(t.currentTarget), $("body").removeClass("reader-day-mode").removeClass("reader-night-mode").addClass("reader-" + i.data("mode") + "-mode"), i.siblings().removeClass("active"), i.addClass("active"), i.find("i").addClass("active"), e.setCookie("read_mode", i.data("mode"))
                }
            }(this)), this.fontButtons.on("click", function (e) {
                return function (t) {
                    var i;
                    return i = $(t.currentTarget), $("body").removeClass("reader-font1").removeClass("reader-font2").addClass("reader-" + i.data("font")), i.siblings().removeClass("active"), i.addClass("active"), e.setCookie("default_font", i.data("font"))
                }
            }(this)), this.localeButtons.on("click", function (e) {
                return function (t) {
                    var i;
                    return i = $(t.currentTarget), "javascript:void(null);" === i.prop("href") ? (e.setCookie("locale", i.data("locale")), location.reload()) : setTimeout(function () {
                        return location.reload()
                    }, 200)
                }
            }(this))
        }

        return e(i, t), i.prototype.elements = {
            "div.change-background > a": "bgButtons",
            "div.change-font > a": "fontButtons",
            "div.change-locale > a": "localeButtons"
        }, i
    }(Maleskine.BaseModule)
}.call(this), function () {
    var e = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }, t = function (e, t) {
        function n() {
            this.constructor = e
        }

        for (var r in t)i.call(t, r) && (e[r] = t[r]);
        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
    }, i = {}.hasOwnProperty;
    Maleskine.Captcha = function (i) {
        function n() {
            this.refreshImageCaptcha = e(this.refreshImageCaptcha, this);
            var t, i;
            n.__super__.constructor.apply(this, arguments), this.captchaType = this.el.data("captcha-type"), this.form = this.el.parents("form"), "geetest" === this.captchaType ? (i = {
                challenge: this.geetestChallenge.val(),
                success: 1,
                gt: this.geetestGt.val(),
                product: "float",
                lang: "zh-cn",
                https: !1
            }, t = new window.Geetest(i), t.appendTo("#geetest-area"), t.onSuccess(function (e) {
                return function () {
                    var i;
                    return i = t.getValidate(), e.geetestChallenge.val(i.geetest_challenge), e.geetestValidate.val(i.geetest_validate), e.geetestSeccode.val(i.geetest_seccode)
                }
            }(this)), null != this.form && this.form.length > 0 && this.form.on("submit", function (e) {
                return function () {
                    return 0 === e.geetestChallenge.length || 0 === e.geetestValidate.val().length || 0 === e.geetestSeccode.val().length ? (e.notyError(I18n.t("reading.captcha.geetest_validate_empty")), !1) : !0
                }
            }(this))) : "image" === this.captchaType && (this.$(".refresh_captcha").on("click", function () {
                return function () {
                    return console.log("Refresh captcha")
                }
            }(this)), null != this.form && this.form.length > 0 && this.form.on("submit", function (e) {
                return function () {
                    return 0 === e.imageCaptchaCode.length ? (e.notyError(I18n.t("reading.captcha.image_captcha_code_empty")), !1) : !0
                }
            }(this)))
        }

        return t(n, i), n.prototype.elements = {
            "input[name='captcha[validation][challenge]']": "geetestChallenge",
            "input[name='captcha[validation][validate]']": "geetestValidate",
            "input[name='captcha[validation][seccode]']": "geetestSeccode",
            "input[name='captcha[validation][gt]']": "geetestGt",
            "input[name='captcha[validation][code]']": "imageCaptchaCode",
            "input[name='captcha[id]']": "captchaId",
            "#geetest-area": "geetestArea"
        }, n.prototype.events = {"click .refresh_captcha": "refreshImageCaptcha"}, n.prototype.refreshImageCaptcha = function () {
            return $.post(Routes.refresh_captcha_path({id: this.captchaId.val()}), function (e) {
                return function (t) {
                    return e.$("img").attr("src", t.url)
                }
            }(this))
        }, n
    }(Maleskine.BaseModule)
}.call(this), function () {
    $(".ad-selector").hover(function () {
        $(".ad-container").css("display", "block")
    }, function () {
        $(".ad-container").css("display", "none")
    }), $(".ad-container").hover(function () {
        $(this).css("display", "block")
    }, function () {
        $(this).css("display", "none")
    })
}.call(this);