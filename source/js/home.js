!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    function e() {
        var e = i(this), r = o.settings;
        return isNaN(e.datetime) || (0 == r.cutoff || Math.abs(a(e.datetime)) < r.cutoff) && t(this).text(n(e.datetime)), this
    }

    function i(e) {
        if (e = t(e), !e.data("timeago")) {
            e.data("timeago", {datetime: o.datetime(e)});
            var i = t.trim(e.text());
            o.settings.localeTitle ? e.attr("title", e.data("timeago").datetime.toLocaleString()) : !(i.length > 0) || o.isTime(e) && e.attr("title") || e.attr("title", i)
        }
        return e.data("timeago")
    }

    function n(t) {
        return o.inWords(a(t))
    }

    function a(t) {
        return (new Date).getTime() - t.getTime()
    }

    t.timeago = function (e) {
        return n(e instanceof Date ? e : "string" == typeof e ? t.timeago.parse(e) : "number" == typeof e ? new Date(e) : t.timeago.datetime(e))
    };
    var o = t.timeago;
    t.extend(t.timeago, {
        settings: {
            refreshMillis: 6e4,
            allowPast: !0,
            allowFuture: !1,
            localeTitle: !1,
            cutoff: 0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                inPast: "any moment now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        }, inWords: function (e) {
            function i(i, a) {
                var o = t.isFunction(i) ? i(a, e) : i, r = n.numbers && n.numbers[a] || a;
                return o.replace(/%d/i, r)
            }

            if (!this.settings.allowPast && !this.settings.allowFuture)throw"timeago allowPast and allowFuture settings can not both be set to false.";
            var n = this.settings.strings, a = n.prefixAgo, o = n.suffixAgo;
            if (this.settings.allowFuture && 0 > e && (a = n.prefixFromNow, o = n.suffixFromNow), !this.settings.allowPast && e >= 0)return this.settings.strings.inPast;
            var r = Math.abs(e) / 1e3, s = r / 60, u = s / 60, l = u / 24, c = l / 365, d = 45 > r && i(n.seconds, Math.round(r)) || 90 > r && i(n.minute, 1) || 45 > s && i(n.minutes, Math.round(s)) || 90 > s && i(n.hour, 1) || 24 > u && i(n.hours, Math.round(u)) || 42 > u && i(n.day, 1) || 30 > l && i(n.days, Math.round(l)) || 45 > l && i(n.month, 1) || 365 > l && i(n.months, Math.round(l / 30)) || 1.5 > c && i(n.year, 1) || i(n.years, Math.round(c)), h = n.wordSeparator || "";
            return void 0 === n.wordSeparator && (h = " "), t.trim([a, d, o].join(h))
        }, parse: function (e) {
            var i = t.trim(e);
            return i = i.replace(/\.\d+/, ""), i = i.replace(/-/, "/").replace(/-/, "/"), i = i.replace(/T/, " ").replace(/Z/, " UTC"), i = i.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), i = i.replace(/([\+\-]\d\d)$/, " $100"), new Date(i)
        }, datetime: function (e) {
            var i = t(e).attr(o.isTime(e) ? "datetime" : "title");
            return o.parse(i)
        }, isTime: function (e) {
            return "time" === t(e).get(0).tagName.toLowerCase()
        }
    });
    var r = {
        init: function () {
            var i = t.proxy(e, this);
            i();
            var n = o.settings;
            n.refreshMillis > 0 && (this._timeagoInterval = setInterval(i, n.refreshMillis))
        }, update: function (i) {
            var n = o.parse(i);
            t(this).data("timeago", {datetime: n}), o.settings.localeTitle && t(this).attr("title", n.toLocaleString()), e.apply(this)
        }, updateFromDOM: function () {
            t(this).data("timeago", {datetime: o.parse(t(this).attr(o.isTime(this) ? "datetime" : "title"))}), e.apply(this)
        }, dispose: function () {
            this._timeagoInterval && (window.clearInterval(this._timeagoInterval), this._timeagoInterval = null)
        }
    };
    t.fn.timeago = function (t, e) {
        var i = t ? r[t] : r.init;
        if (!i)throw new Error("Unknown function name '" + t + "' for timeago");
        return this.each(function () {
            i.call(this, e)
        }), this
    }, document.createElement("abbr"), document.createElement("time")
}), function () {
    var t = function (t, i) {
        function n() {
            this.constructor = t
        }

        for (var a in i)e.call(i, a) && (t[a] = i[a]);
        return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
    }, e = {}.hasOwnProperty;
    Maleskine.CollectionCategory = function (e) {
        function i() {
            i.__super__.constructor.apply(this, arguments), $("#collection-categories-nav").on("click", "a[data-category-id]", function (t) {
                return function (e) {
                    var i;
                    return i = $(e.currentTarget).data("category-id"), t.addActiveClass(e), $.ajax({
                        url: $("#collection-categories-nav").data("fetch-url"),
                        data: {category_id: i},
                        dataType: "script",
                        type: "GET",
                        beforeSend: function (e) {
                            return t.loader.show(), e.setRequestHeader("X-PJAX", "true")
                        }
                    }).done(function () {
                        return Maleskine.Utils.initLaddaButton($("#list-container"))
                    }).always(function () {
                        return t.loader.hide()
                    })
                }
            }(this)), $("#collection-categories-nav").on("click", "a[data-dimension]", function (t) {
                return function (e) {
                    return t.addActiveClass(e), $.ajax({
                        url: "/trending/" + $(e.currentTarget).data("dimension"),
                        dataType: "script",
                        type: "GET",
                        beforeSend: function (e) {
                            return t.loader.show(), e.setRequestHeader("X-PJAX", "true")
                        }
                    }).done(function () {
                        return Maleskine.Utils.initLaddaButton($("#list-container"))
                    }).always(function () {
                        return t.loader.hide()
                    })
                }
            }(this)), $(".submit-btn").css("width", $(".subscribe-guide").outerWidth()), $(window).resize(function () {
                return function () {
                    return $(".submit-btn").css("width", $(".subscribe-guide").outerWidth())
                }
            }(this))
        }

        return t(i, e), i.prototype.elements = {
            ".category": "collectionCategory",
            ".loader-tiny": "loader"
        }, i.prototype.addActiveClass = function (t) {
            return $("ul.sort-nav li").removeClass("active"), $(t.currentTarget).parent().addClass("active")
        }, i
    }(Maleskine.BaseModule)
}.call(this), function () {
    var t = function (t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }, e = function (t, e) {
        function n() {
            this.constructor = t
        }

        for (var a in e)i.call(e, a) && (t[a] = e[a]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    }, i = {}.hasOwnProperty;
    Maleskine.List = function (i) {
        function n() {
            this.loadOrigins = t(this.loadOrigins, this), this.initSharedAt = t(this.initSharedAt, this), n.__super__.constructor.apply(this, arguments), $.timeago.settings.strings = I18n.t("jquery-timeago"), this.initSharedAt(), this.initFollowingState(), this.loadOrigins(), this.el.find("p.list-top").on("ajax:success", "a", function (t) {
                return function (e) {
                    return $(e.currentTarget).closest("span").tooltip("destroy"), setTimeout(function () {
                        return t.initTooltip()
                    }, 20)
                }
            }(this)), $("div.list-footer i[data-toggle='tooltip']").tooltip()
        }

        return e(n, i), n.prototype.initFollowingState = function () {
            return $("body").on("mouseenter", "p.list-top span.following", function () {
                return $(this).find("a").html("<i class='fa fa-fw fa-times'></i><span>" + I18n.t("reading.unfollow") + "</span>")
            }), $("body").on("mouseleave", "p.list-top span.following", function () {
                return $(this).find("a").html("<i class='fa fa-fw fa-check'></i><span>" + I18n.t("reading.following") + "</span>")
            })
        }, n.prototype.initSharedAt = function () {
            return $.each($("p.list-top span.time"), function () {
                return $(this).html($.timeago(new Date($(this).data("sharedAt"))))
            }), this.initTooltip()
        }, n.prototype.initTooltip = function () {
            return $("p.list-top span.btn-success.follow").tooltip({
                title: function () {
                    return I18n.t("reading.notes.list.follow", {nickname: $(this).closest("span").prev().text()})
                }
            })
        }, n.prototype.loadOrigins = function () {
            return this.el.find("div.list-footer [data-note-id]").on("click", function () {
                return $(this).closest("div").hasClass("open") ? void 0 : $.ajax({
                    method: "get",
                    dataType: "html",
                    url: $(this).data("url"),
                    success: function (t) {
                        return function (e) {
                            return $(t).next().find("ul").html(e)
                        }
                    }(this)
                })
            })
        }, n
    }(Maleskine.BaseModule)
}.call(this), function () {
    var t = function (t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }, e = function (t, e) {
        function n() {
            this.constructor = t
        }

        for (var a in e)i.call(e, a) && (t[a] = e[a]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    }, i = {}.hasOwnProperty;
    Maleskine.Recommendation = function (i) {
        function n() {
            this.settingTabs = t(this.settingTabs, this), this.resetTabNavigationWidth = t(this.resetTabNavigationWidth, this);
            var e;
            n.__super__.constructor.apply(this, arguments), this.mainTab.pjaxTab(), this.listPart.on("pjax:success", function () {
                return function () {
                    return e.initSharedAt(), e.loadOrigins(), $("i[data-toggle=tooltip]").tooltip()
                }
            }(this)), this.loginModal.on("hidden", function (t) {
                return function () {
                    return t.setCookie("signin_redirect", window.location.pathname)
                }
            }(this)), this.resetTabNavigationWidth(), $(window).resize(this.resetTabNavigationWidth), e = new Maleskine.List({el: this.el}), $("#list-recommended").on("ajax:success", "div.follow a[data-remote]", function () {
                var t, e;
                return t = $("div.submit-btn"), e = $("h4.guide-title"), /unsubscribe/.test($(this).attr("href")) ? $("div.subscribe-guide").data("subscriptions-count", $("div.subscribe-guide").data("subscriptions-count") - 1) : $("div.subscribe-guide").data("subscriptions-count", $("div.subscribe-guide").data("subscriptions-count") + 1), $("div.subscribe-guide").data("subscriptions-count") > 0 ? (e.html(I18n.t("recommended.title_done")), t.fadeIn("fast")) : (e.html(I18n.t("recommended.title")), t.fadeOut("fast"))
            })
        }

        return e(n, i), n.prototype.elements = {
            "#write-button": "writeButton",
            "#login-modal": "loginModal",
            "ul.navigation": "mainTab",
            "div.page-title": "titlePart",
            "#list-container": "listPart",
            ".loader-tiny": "tabLoader"
        }, n.prototype.events = {"click li.switch-default-tab a": "settingTabs"}, n.prototype.resetTabNavigationWidth = function () {
            return this.titlePart.css("width", this.listPart.cssWidth())
        }, n.prototype.settingTabs = function () {
            var t;
            return this.mainTab.hasClass("settings") ? (this.tabLoader.show(), window.location = "/") : (this.mainTab.addClass("settings"), this.mainTab.sortable({
                items: "li[data-name]:not(.disabled)",
                axis: "x",
                update: function (t) {
                    return function () {
                        var e, i;
                        return i = t.mainTab.data("user-slug"), e = t.mainTab.find("li[data-name]").map(function () {
                            return $(this).data("name")
                        }), $.ajax(Routes.user_path(i), {data: {user: {homepage_tabs: e.get().join()}}, type: "PUT"})
                    }
                }(this)
            }).disableSelection(), t = this.mainTab.find("li.switch-default-tab a"), t.tooltip("destroy"), t.attr("title", I18n.t("kalamu.ok")), t.tooltip())
        }, n
    }(Maleskine.BaseModule)
}.call(this), function () {
    var t = function (t, i) {
        function n() {
            this.constructor = t
        }

        for (var a in i)e.call(i, a) && (t[a] = i[a]);
        return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
    }, e = {}.hasOwnProperty;
    Maleskine.TrendingNotes = function (e) {
        function i() {
            i.__super__.constructor.apply(this, arguments), $("#trending-categories a[data-dimension]").on("click", function (t) {
                return function (e) {
                    return $("#trending-categories li").removeClass("active"), $(e.currentTarget).parent().addClass("active"), $.ajax({
                        url: "/trending/" + $(e.currentTarget).data("dimension"),
                        dataType: "script",
                        type: "GET",
                        beforeSend: function (e) {
                            return t.loader.show(), e.setRequestHeader("X-PJAX", "true")
                        }
                    }).done(function () {
                        return Maleskine.Utils.initLaddaButton($("#list-container"))
                    }).always(function () {
                        return t.loader.hide()
                    })
                }
            }(this))
        }

        return t(i, e), i.prototype.elements = {".loader-tiny": "loader"}, i
    }(Maleskine.BaseModule)
}.call(this), function () {
    $(function () {
        return new QRCode($("#time-machine-modal .modal-body")[0], {
            text: $("#time-machine-modal").data("stats2015-url"),
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.M
        })
    })
}.call(this);