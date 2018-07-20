var a2a_config = a2a_config || {};
a2a_config.vars = {
    vars: ["menu_type", "static_server", "linkmedia", "linkname", "linkurl", "linkname_escape", ["http_s", "http:" != document.location.protocol ? "s" : ""], "show_title", "onclick", "num_services", "hide_embeds", "prioritize", "exclude_services", "custom_services", ["templates", {}], "orientation", ["track_links", !1],
        ["track_links_key", ""], "tracking_callback", "track_pub", "color_main", "color_bg", "color_border", "color_link_text", "color_link_text_hover", "color_arrow", "color_arrow_hover", ["localize", "", 1],
        ["add_services", !1, 1], "locale", "delay", "icon_color", "no_3p", "show_menu", "target"
    ],
    process: function() {
        for (var e, a, t, n, i, o = a2a_config.vars.vars, l = 0, r = "a2a_", s = o.length; l < s; l++)
            if ("string" == typeof o[l] ? (e = o[l], a = window[r + e], n = !1) : (e = o[l][0], a = window[r + e], t = o[l][1], n = !0, i = o[l][2]), void 0 !== a && null != a) {
                if (a2a_config[e] = a, !i) try {
                    delete window[r + e]
                } catch (c) {
                    window[r + e] = null
                }
            } else n && !a2a_config[e] && (a2a_config[e] = t)
    }
}, a2a_config.vars.process(), a2a_config.static_server = a2a_config.static_server || "https://static.addtoany.com/menu";
var a2a = a2a || {
    static_addtoany: "https://static.addtoany.com/menu",
    total: 0,
    kit_services: [],
    icons_img_url: a2a_config.static_server + "/icons.36.png",
    head_tag: document.getElementsByTagName("head")[0],
    canonical_url: function() {
        if (!document.querySelector) return !1;
        var e, a = document.querySelector('meta[property="og:url"]');
        return a ? a.content : !!(e = document.querySelector('link[rel="canonical"]')) && e.href
    }(),
    ieo: function() {
        for (var e = -1, a = document.createElement("b"); a.innerHTML = "\x3c!--[if gt IE " + ++e + "]>1<![endif]--\x3e", +a.innerHTML;);
        return a2a.ieo = function() {
            return e
        }, e
    },
    quirks: document.compatMode && "BackCompat" == document.compatMode ? 1 : null,
    has_menter: document.documentElement && "onmouseenter" in document.documentElement,
    has_touch: "ontouchend" in window,
    has_pointer: window.PointerEvent || navigator.msPointerEnabled,
    fn_queue: [],
    dom: {
        isReady: !1,
        ready: function(e) {
            var a = function() {
                    if (!document.body) return setTimeout(a2a.dom.ready(e));
                    e(), a2a.dom.isReady = !0
                },
                t = function(e) {
                    (document.addEventListener || "load" === e.type || "complete" === document.readyState) && (n(), a())
                },
                n = function() {
                    document.addEventListener ? (document.removeEventListener("DOMContentLoaded", t, !1), window.removeEventListener("load", t, !1)) : (document.detachEvent("onreadystatechange", t), window.detachEvent("onload", t))
                };
            if ("complete" === document.readyState) a();
            else if (document.addEventListener) document.addEventListener("DOMContentLoaded", t, !1), window.addEventListener("load", t, !1);
            else {
                document.attachEvent("onreadystatechange", t), window.attachEvent("onload", t);
                var i = !1;
                try {
                    i = null == window.frameElement && document.documentElement
                } catch (o) {}
                i && i.doScroll && function l() {
                    if (!a2a.dom.isReady) {
                        try {
                            i.doScroll("left")
                        } catch (o) {
                            return setTimeout(l, 50)
                        }
                        n(), a()
                    }
                }()
            }
        }
    },
    ready: function() {
        a2a.locale || (a2a.type = "page", a2a.cbs("ready"), a2a.ready = function() {})
    },
    init: function(e, a, t) {
        var n, i, o, l, r, s, c = a2a.c,
            d = (a = a || {}, {}),
            u = null,
            p = {},
            m = location.href,
            _ = function(e, a) {
                a2a.total++, a2a.n = a2a.total, a2a["n" + a2a.n] = e;
                var t, n, i = e.node = a2a.set_this_index(e.node),
                    o = document.createElement("div"),
                    l = a2a.getData(i)["a2a-media"],
                    r = a2a.getData(i)["a2a-title"],
                    s = a2a.getData(i)["a2a-url"];
                i ? (e.linkname_escape && (n = a2a.getByClass("a2a_linkname_escape", i.parentNode)[0] || a2a.getByClass("a2a_linkname_escape", i.parentNode.parentNode)[0]) && (e.linkname = n.textContent || n.innerText), e.linkmedia = a.linkmedia = l || e.linkmedia, e.linkname = a.linkname = r || e.linkname, e.linkurl = a.linkurl = s || e.linkurl, r && (e.linkname_implicit = !1), s && (e.linkurl_implicit = !1), "textContent" in document ? o.textContent = e.linkname : o.innerText = e.linkname, (t = o.childNodes[0]) && (e.linkname = t.nodeValue), delete o, i.a2a_kit ? a2a.kit(e, a) : a2a.button(e)) : a2a.c.show_menu || a2a.total--
            };
        for (var f in a2a.make_once(e), a) c[f] = a[f];
        for (var f in c) d[f] = c[f];
        if (i = c.target)
            if ("string" == typeof i) {
                if (o = i.substr(0, 1), l = i.substr(1), "." == o) return a2a.multi_init(a2a.HTMLcollToArray(a2a.getByClass(l, document)), e, a), void(c.target = !1);
                (n = (u = a2a.gEl(l)).className).indexOf("a2a_kit") >= 0 && n.indexOf("a2a_target") < 0 && (u = null)
            } else u = c.target;
        (e = c.menu_type ? "mail" : e) && (a2a.type = e, c.vars.process()), p.type = a2a.type, p.node = u, p.linkmedia = c.linkmedia, p.linkname = c.linkname || document.title || location.href, p.linkurl = c.linkurl || location.href, p.linkname_escape = c.linkname_escape, p.linkname_implicit = !c.linkname_escape && (document.title || m) == p.linkname, p.linkurl_implicit = m == p.linkurl, p.orientation = c.orientation || !1, p.track_links = c.track_links || !1, p.track_links_key = c.track_links_key || "", p.track_pub = c.track_pub || !1, c.linkmedia = c.linkname = c.linkurl = c.linkname_escape = c.show_title = c.custom_services = c.exclude_services = c.orientation = c.track_pub = c.target = !1, "custom" == c.track_links && (c.track_links = !1, c.track_links_key = ""), a2a.last_type = a2a.type, window["a2a" + a2a.type + "_init"] = 1, a2a.locale && !t ? a2a.fn_queue.push((r = p, s = d, function() {
            _(r, s)
        })) : (_(p, d), c.menu_type = !1, a2a.init_show())
    },
    init_all: function(e) {
        !a2a.unindexed(function(a) {
            a.className.indexOf("a2a_follow") >= 0 ? a2a.init("feed") : a2a.init(e)
        }, !0) && a2a.gEl("a2a_menu_container") && a2a.init(e)
    },
    multi_init: function(e, a, t) {
        for (var n = 0, i = e.length; n < i; n++) t.target = e[n], a2a.init(a, t)
    },
    button: function(e) {
        var a = e.node,
            t = e.type,
            n = a2a.gEl("a2a" + t + "_dropdown"),
            i = a2a.has_menter,
            o = a.firstChild;
        a.getAttribute("onclick") && -1 != (a.getAttribute("onclick") + "").indexOf("a2a_") || a.getAttribute("onmouseover") && -1 != (a.getAttribute("onmouseover") + "").indexOf("a2a_") || (a2a.add_event(a, "click", function(e) {
            if (a2a.preventDefault(e), a2a.stopPropagation(e), "block" == n.style.display) {
                var i = a2a[t].time_open;
                a2a[t].onclick || i && "OK" == i ? a2a.toggle_dropdown("none", t) : (a2a[t].last_focus = document.activeElement, n.focus())
            } else a2a.show_menu(a), a2a[t].last_focus = document.activeElement, n.focus()
        }), !a2a[a2a.type].onclick && i && (a2a.c.delay ? a.onmouseenter = function() {
            a2a[a2a.type].over_delay = setTimeout(function() {
                a2a.show_menu(a)
            }, a2a.c.delay)
        } : a.onmouseenter = function() {
            a2a.show_menu(a)
        }, a.onmouseleave = function() {
            a2a.miniLeaveDelay(), a2a[a2a.type].over_delay && clearTimeout(a2a[a2a.type].over_delay)
        })), "a" == a.tagName.toLowerCase() && "page" == a2a.type && (a.href = "https://www.addtoany.com/share#url=" + encodeURIComponent(e.linkurl) + "&title=" + encodeURIComponent(e.linkname).replace(/'/g, "%27")), o && "undefined" != typeof o.srcset && /\/share_save_171_16.(?:gif|png)$/.test(o.src) && (o.srcset = "https://static.addtoany.com/buttons/share_save_342_32.png 2x")
    },
    kit: function(e, a) {
        var t, n, i, o, l, r = a2a.type,
            s = {
                behance: {
                    name: "Behance",
                    icon: "behance",
                    color: "007EFF",
                    url: "https://www.behance.net/${id}"
                },
                facebook: {
                    name: "Facebook",
                    icon: "facebook",
                    color: "3B5998",
                    url: "https://www.facebook.com/${id}"
                },
                flickr: {
                    name: "Flickr",
                    icon: "flickr",
                    color: "FF0084",
                    url: "https://www.flickr.com/photos/${id}"
                },
                foursquare: {
                    name: "Foursquare",
                    icon: "foursquare",
                    color: "F94877",
                    url: "https://foursquare.com/${id}"
                },
                github: {
                    name: "GitHub",
                    icon: "github",
                    color: "2A2A2A",
                    url: "https://github.com/${id}"
                },
                google_plus: {
                    name: "Google+",
                    icon: "google_plus",
                    color: "DD4B39",
                    url: "https://plus.google.com/${id}"
                },
                instagram: {
                    name: "Instagram",
                    icon: "instagram",
                    color: "E4405F",
                    url: "https://www.instagram.com/${id}"
                },
                linkedin: {
                    name: "LinkedIn",
                    icon: "linkedin",
                    color: "007BB5",
                    url: "https://www.linkedin.com/in/${id}"
                },
                linkedin_company: {
                    name: "LinkedIn",
                    icon: "linkedin",
                    color: "007BB5",
                    url: "https://www.linkedin.com/company/${id}"
                },
                medium: {
                    name: "Medium",
                    icon: "medium",
                    color: "2A2A2A",
                    url: "https://medium.com/@${id}"
                },
                pinterest: {
                    name: "Pinterest",
                    icon: "pinterest",
                    color: "BD081C",
                    url: "https://www.pinterest.com/${id}"
                },
                snapchat: {
                    name: "Snapchat",
                    icon: "snapchat",
                    color: "2A2A2A",
                    url: "https://www.snapchat.com/add/${id}"
                },
                tumblr: {
                    name: "Tumblr",
                    icon: "tumblr",
                    color: "35465C",
                    url: "http://${id}.tumblr.com"
                },
                twitter: {
                    name: "Twitter",
                    icon: "twitter",
                    color: "55ACEE",
                    url: "https://twitter.com/${id}"
                },
                vimeo: {
                    name: "Vimeo",
                    icon: "vimeo",
                    color: "1AB7EA",
                    url: "https://vimeo.com/${id}"
                },
                youtube: {
                    name: "YouTube",
                    icon: "youtube",
                    color: "FF0000",
                    url: "https://www.youtube.com/user/${id}"
                },
                youtube_channel: {
                    name: "YouTube Channel",
                    icon: "youtube",
                    color: "FF0000",
                    url: "https://www.youtube.com/channel/${id}"
                }
            },
            c = ["facebook_like", "twitter_tweet", "google_plusone", "google_plus_share", "pinterest_pin", "linkedin_share"],
            d = a2a.counters.avail,
            u = function(e, a) {
                if (e && !a2a.in_array(e, c))
                    for (var t = 0, n = a ? a2a[r].services : a2a.services, i = n.length; t < i; t++)
                        if (e == n[t][1]) return [n[t][0], n[t][2], n[t][3], n[t][4], n[t][5]];
                return !a && [e, e]
            },
            p = function(e, a) {
                for (var t, n = 0, i = e.attributes.length, o = a; n < i; n++)(t = e.attributes[n]).name && "data-" == t.name.substr(0, 5) && (o[t.name.substr(5)] = t.value);
                return o
            },
            m = function() {
                x = e.linkurl = a2a.getData(g)["a2a-url"] || x, E = e.linkname = a2a.getData(g)["a2a-title"] || E, C = e.linkmedia = a2a.getData(g)["a2a-media"] || C, a2a.linker(this)
            },
            _ = function(a, t, n) {
                var i = {
                        node: t,
                        service: a,
                        title: E,
                        url: x,
                        media: C,
                        mediaNode: g.a2a_mediaNode
                    },
                    o = a2a.cbs("share", i);
                void 0 !== o && (o.url && (e.linkurl = o.url, e.linkurl_implicit = !1), o.title && (e.linkname = o.title, e.linkname_implicit = !1), o.media && (e.linkmedia = o.media), a2a.linker(t), o.stop && n && a2a.preventDefault(n))
            },
            f = a2a.c.templates,
            g = e.node,
            h = a2a.getData(g),
            y = g.a2a_follow,
            v = a2a.HTMLcollToArray(g.getElementsByTagName("a")),
            k = v.length,
            w = document.createElement("div"),
            b = encodeURIComponent,
            x = e.linkurl,
            A = b(e.linkurl).replace(/'/g, "%27"),
            E = e.linkname,
            C = (b(e.linkname).replace(/'/g, "%27"), e.linkmedia),
            B = (C && b(e.linkmedia).replace(/'/g, "%27"), h["a2a-icon-color"] || a2a.c.icon_color),
            S = B ? B.split(",", 2) : B,
            F = S ? S[0] : S,
            T = S ? S[1] : S,
            N = g.className.match(/a2a_kit_size_([\w\.]+)(?:\s|$)/),
            L = N ? N[1] : "16",
            D = L + "px",
            z = "a2a_svg a2a_s__default a2a_s_",
            I = {},
            j = {},
            M = e.linkurl_implicit && a2a.canonical_url ? encodeURIComponent(a2a.canonical_url).replace(/'/g, "%27") : A,
            H = g.className.indexOf("a2a_vertical_style") >= 0;
        L && !isNaN(L) && (a2a.svg.load(), B && "unset" != B && a2a.svg.works() && (F && "unset" != F && (I.backgroundColor = F), T && "unset" != T.trim() && (T = T.trim())), g.style.lineHeight = j.height = j.lineHeight = D, j.width = 2 * L + "px", j.fontSize = "16px", H && (j.height = j.lineHeight = L / 2 + "px", j.fontSize = "10px", j.width = L + "px"), 32 != L && (I.backgroundSize = I.height = I.lineHeight = I.width = D, j.borderRadius = I.borderRadius = (.14 * L).toFixed() + "px", j.fontSize = (parseInt(j.height, 10) + (H ? 4 : 0)) / 2 + "px")), a2a.kit.facebook_like = function() {
            ce.href = x, ce.width = "90", ce.layout = "button_count", ce.ref = "addtoany", ce = p(U, ce), U.style.width = ce.width + "px";
            var e, a, t, n, i = a2a.i18n();
            for (var o in 2 == (i = i ? i.replace(/-/g, "_") : "en_US").length && (i += "_" + i.toUpperCase()), ce) se += " data-" + o + '="' + ce[o] + '"';
            window.fbAsyncInit || (window.fbAsyncInit = function() {
                FB.init({
                    appId: "0",
                    status: !1,
                    xfbml: !0,
                    version: "v2.11"
                }), FB.Event.subscribe("edge.create", function(e, a) {
                    a2a.GA.track("Facebook Like", "facebook_like", e, "pages", "AddToAny Share/Save Button"), _("Facebook Like", U)
                })
            }, (O = document.createElement("span")).id = "fb-root", document.body.insertBefore(O, document.body.firstChild)), a2a.kit.facebook_like_script || (e = document, a = "facebook-jssdk", n = e.getElementsByTagName("script")[0], e.getElementById(a) || ((t = e.createElement("script")).id = a, t.src = "https://connect.facebook.net/" + i + "/sdk.js#xfbml=1&version=v2.11", n.parentNode.insertBefore(t, n))), a2a.kit.facebook_like_script = 1, U.innerHTML = '<div class="fb-like"' + se + "></div>";
            try {
                FB.XFBML.parse(U)
            } catch (l) {}
        }, a2a.kit.twitter_tweet = function() {
            ce.url = x, ce.lang = a2a.i18n() || "en", ce.related = "GeanRamos,omadrugador";
            var e = f.twitter,
                a = "string" == typeof e ? e.lastIndexOf("@") : null;
            a && -1 !== a && (a++, a = (a = e.substr(a).split(" ", 1))[0].replace(/:/g, "").replace(/\//g, "").replace(/-/g, "").replace(/\./g, "").replace(/,/g, "").replace(/;/g, "").replace(/!/g, ""), ce.related = a + ",AddToAny"), ce = p(U, ce);
            var t, n, i, o, l, r = document.createElement("a");
            for (var s in r.className = "twitter-share-button", ce) r.setAttribute("data-" + s, ce[s]);
            U.appendChild(r), a2a.kit.twitter_tweet_script || (t = document, n = "twitter-wjs", l = t.getElementsByTagName("script")[0], t.getElementById(n) || ((o = t.createElement("script")).id = n, o.src = "https://platform.twitter.com/widgets.js", l.parentNode.insertBefore(o, l), window.twttr = window.twttr || (i = {
                _e: [],
                ready: function(e) {
                    i._e.push(e)
                }
            }))), a2a.kit.twitter_tweet_script = 1;
            try {
                twttr.ready(function(e) {
                    a2a.twitter_bind || (e.events.bind("click", function(e) {
                        if (e && "tweet" == e.region) {
                            var a = function() {
                                var a = e.target.src.split("#")[1] || "";
                                if (a && a.indexOf("url=") > -1) {
                                    for (var t = {}, n = a.split("&"), i = n.length, o = 0; o < i; o++) {
                                        var l = n[o].split("=");
                                        t[l[0]] = l[1]
                                    }
                                    return t
                                }
                                return !1
                            }();
                            a && a.url && (a2a.GA.track("Twitter Tweet", "twitter_tweet", unescape(a.url), "pages", "AddToAny Share/Save Button"), _("Twitter Tweet", U))
                        }
                    }), a2a.twitter_bind = 1), e.widgets && e.widgets.load()
                })
            } catch (c) {}
        }, a2a.kit.pinterest_pin = function() {
            ce["pin-config"] = "beside", ce["pin-do"] = "buttonPin", ce.media = C, ce.url = x, ce = p(U, ce);
            var e, a, t, n = document.createElement("a");
            for (var i in ce) n.setAttribute("data-" + i, ce[i]);
            "beside" == ce["pin-config"] && "buttonPin" == ce["pin-do"] && (U.style.width = "76px"), n.href = "https://www.pinterest.com/pin/create/button/?url=" + ce.url + (ce.media ? "&media=" + ce.media : "") + (ce.description ? "&description=" + encodeURIComponent(ce.description).replace(/'/g, "%27") : ""), a2a.add_event(U, "click", function() {
                a2a.GA.track("Pinterest Pin", "pinterest_pin", x, "pages", "AddToAny Share/Save Button"), _("Pinterest Pin", U)
            }), U.appendChild(n), a2a.kit.pinterest_pin_script || (e = document, a = e.createElement("script"), t = e.getElementsByTagName("script")[0], a.type = "text/javascript", a.async = !0, a.src = "https://assets.pinterest.com/js/pinit.js", t.parentNode.insertBefore(a, t)), a2a.kit.pinterest_pin_script = 1
        }, a2a.kit.linkedin_share = function() {
            for (var e in ce.onsuccess = "a2a.kit.linkedin_share_event", ce.url = x, ce = p(U, ce)) se += " data-" + e + '="' + ce[e] + '"';
            var a, t, n;
            a2a.kit.linkedin_share_event = function() {
                a2a.GA.track("LinkedIn Share", "linkedin_share", x, "pages", "AddToAny Share/Save Button"), _("LinkedIn Share", U)
            }, a2a.kit.linkedin_share_script || (a = document, t = a.createElement("script"), n = a.getElementsByTagName("script")[0], t.type = "text/javascript", t.async = !0, t.src = "https://platform.linkedin.com/in.js", n.parentNode.insertBefore(t, n)), a2a.kit.linkedin_share_script = 1, U.innerHTML = '<script type="IN/Share"' + se + "><\/script>"
        }, a2a.kit.google_plus = function() {
            window.google_plus_cb_a2a = function(e) {
                e.state && "off" == e.state || (a2a.GA.track("Google +1", "google_plusone", e.href, "pages", "AddToAny Share/Save Button"), _("Google +1", U))
            }, ce.href = x, ce.size = "medium", ce.annotation = "bubble", "google_plus_share" == K && (ce.action = "share"), ce = p(U, ce);
            var e, a, t, n = a2a.i18n() || "pt-BR";
            for (var i in window.___gcfg = window.___gcfg || {
                    lang: n
                }, ce) se += " data-" + i + '="' + ce[i] + '"';
            U.innerHTML = '<div class="g-plus' + ("share" == ce.action ? "" : "one") + '" data-callback="google_plus_cb_a2a"' + se + "></div>", a2a.kit.google_plus_script || (e = document, a = e.createElement("script"), t = e.getElementsByTagName("script")[0], a.type = "text/javascript", a.async = !0, a.src = "https://apis.google.com/js/platform.js", t.parentNode.insertBefore(a, t), a2a.kit.google_plus_script = 1)
        }, a2a.kit.google_plusone = a2a.kit.google_plus_share = a2a.kit.google_plus;
        for (var P = 0; P < k; P++) {
            var O, R, $, q, U = v[P],
                W = U.className,
                G = W.match(/a2a_button_([\w\.]+)(?:\s|$)/),
                Y = W.indexOf("a2a_dd") >= 0,
                V = W.indexOf("a2a_counter") >= 0,
                K = !!G && G[1],
                J = U.childNodes,
                X = u(K),
                Q = y && s[K] ? s[K].name : X[0],
                Z = " noopener",
                ee = "_blank",
                ae = y && s[K] ? s[K].icon : X[1],
                te = y && s[K] ? s[K].color : X[2] || "CAE0FF",
                ne = X[3] || {},
                ie = ne.type,
                oe = X[4],
                le = !1,
                re = !1,
                se = "",
                ce = {};
            if (Y ? (a.target = U, a2a.init(r, a, 1), K = "a2a", te = "0166FF", ae = "a2a", re = !!V && 1) : "feed" == K || "print" == K ? (ee = "", Z = "") : V && K && a2a.in_array(K, d) ? re = 1 : K && a2a.in_array(K, c) && (a2a.kit[K](), le = 1), K && !le) {
                if (Y || (U.target = ee, !y || !s[K] && u(K, !0) ? "feed" == K ? U.href = U.href || e.linkurl : (U.href = "/#" + K, a2a.add_event(U, "mousedown", m), a2a.add_event(U, "keydown", m), U.rel = "nofollow" + Z) : U.href = (n = K, i = void 0, void 0, l = void 0, o = p(t = U, {})["a2a-follow"], l = s[n], o && l && (i = l.url.replace("${id}", o)), i || t.href), U.a2a = {}, U.a2a.customserviceuri = oe, U.a2a.stype = ie, U.a2a.linkurl = e.linkurl, U.a2a.servicename = Q, U.a2a.safename = K, ne.src && (U.a2a.js_src = ne.src), ne.url && (U.a2a.url = ne.url), ne.pu && (U.a2a.popup = 1), ne.media && (U.a2a.media = 1), y || a2a.add_event(U, "click", function(e, a, t, n, i) {
                        return function(o) {
                            var l = screen.height,
                                s = "event=service_click&url=" + b(location.href) + "&title=" + b(document.title || "") + "&ev_service=" + b(e) + "&ev_service_type=kit&ev_menu_type=" + r + "&ev_url=" + b(t) + "&ev_title=" + b(n).replace(/'/g, "%27");
                            _(a, i, o), i.a2a.popup && !a2a.defaultPrevented(o) && "javascript:" != i.href.substr(0, 11) && (a2a.preventDefault(o), window.open(i.href, "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + (l > 450 ? Math.round(l / 2 - 225) : 40) + ",left=" + Math.round(screen.width / 2 - 275))), a2a.util_frame_post(r, s), a2a.GA.track(a, e, t, "pages", "AddToAny Share/Save Button")
                        }
                    }(K, Q, x, E, U))), J.length) {
                    for (var de, ue = 0, pe = J.length; ue < pe; ue++)
                        if (de = J[ue].className, 1 == J[ue].nodeType && "a2a_label" != de && (q = !0, "string" == typeof de && de.indexOf("a2a_count") >= 0)) {
                            $ = !0;
                            break
                        }
                    if (!q) {
                        for (var me in (O = document.createElement("span")).className = z + ae + " a2a_img_text", te && (O.style.backgroundColor = "#" + te), "pending" !== (R = a2a.svg.get(ae, O, T)) && (O.innerHTML = R), I) O.style[me] = I[me];
                        U.insertBefore(O, J[0])
                    }
                } else {
                    for (var me in (O = document.createElement("span")).className = z + ae, te && (O.style.backgroundColor = "#" + te), "pending" !== (R = a2a.svg.get(ae, O, T)) && (O.innerHTML = R), I) O.style[me] = I[me];
                    U.appendChild(O), (O = document.createElement("span")).className = "a2a_label", O.innerHTML = Q || ("feed" == r ? a2a.c.localize.Subscribe : a2a.c.localize.Share), U.appendChild(O)
                }
                if (H && L && L < 20 && (re = !1), re && !$) {
                    for (var me in (O = document.createElement("span")).className = "a2a_count", O.a2a = {}, O.a2a.kit = g, j) O.style[me] = j[me];
                    U.appendChild(O), Y ? (O.a2a.is_a2a_dd_counter = 1, a2a.counters.get("facebook", O, M), g.a2a_dd_counter = O) : a2a.counters.get(K, O, M)
                }
                "a2a_dd" != W && a2a.kit_services.push(U)
            }
        }
        g.className.indexOf("a2a_default_style") >= 0 && (w.style.clear = "both", g.appendChild(w))
    },
    counters: {
        get: function(e, a, t, n) {
            a2a_config.counts;
            var i, o, l = decodeURIComponent(t),
                r = a2a.counters.bonus(e, l, t, a.a2a.kit),
                s = "",
                c = a2a.counters[e],
                d = c.api,
                u = (c.cb, a.a2a.is_a2a_dd_counter);
            !n && r && (s = "2", a2a.counters.get(e, a, r, !0)), "undefined" == typeof(i = c[l] = c[l] || {}).num ? (i.queued = i.queued || [], i.queued.push(a), c.n = c.n || 0, c.n++, c["cb" + c.n] = function(t) {
                var n = a2a.counters[e].cb(t, a);
                if (void 0 !== n)
                    for (var o = 0; o < i.queued.length; o++) queued_count_element = i.queued[o], i.num = n, queued_count_element.a2a.is_a2a_dd_counter ? a2a.counters.sum(queued_count_element, n, e + s) : a2a.counters.set(queued_count_element, n, e + s)
            }, 1 == i.queued.length && (o = d[0] + t + (d[1] || "&callback") + "=a2a.counters." + e + ".cb" + c.n, a2a.dom.ready(function() {
                a2a.loadExtScript(o)
            }))) : u ? a2a.counters.sum(a, i.num, e + s) : a2a.counters.set(a, i.num, e + s)
        },
        set: function(e, a, t) {
            var n = a;
            a = "undefined" != typeof e.a2a.last_count ? e.a2a.last_count + a : a, e.innerHTML = "<span>" + a2a.counters.format(a) + "</span>", "a2a" != t && (e.a2a.last_count = n, a2a.counters.sum(e, n, t))
        },
        sum: function(e, a, t) {
            var n = e.a2a.kit,
                i = n.a2a_counts_sum || 0,
                o = n.a2a_counts_summed;
            o && o.indexOf(t) > -1 || ("a2a" != t && (i = n.a2a_counts_sum = i + a, (o = n.a2a_counts_summed = o || []).push(t)), n.a2a_dd_counter && a2a.counters.set(n.a2a_dd_counter, i, "a2a"))
        },
        format: function(e) {
            return e > 999 && (e = e < 1e6 ? e > 1e4 ? (e / 1e3).toFixed() + "k" : (e += "").charAt(0) + "," + e.substring(1) : e < 1e9 ? (e / 1e6).toFixed(e % 1e6 > 94999) + "M" : "1B+"), e
        },
        bonus: function(e, a, t, n) {
            var i, o, l, r = a2a_config.counts,
                s = "%3A%2F%2F";
            return r && (r.recover_protocol && "http" === r.recover_protocol && (i = t.replace(/^https%/, "http%"), a = decodeURIComponent(i)), r.recover_domain && (i = encodeURIComponent(a.replace(/^(https?\:\/\/)(?:[^\/?#]+)([\/?#]|$)/i, "$1" + r.recover_domain + "$2")), a = decodeURIComponent(i)), r.recover && "function" == typeof r.recover && ((o = document.createElement("a")).href = a, l = {
                url: a,
                pathParts: o.pathname.split("/"),
                domain: o.hostname,
                protocol: o.protocol,
                kit: n
            }, i = encodeURIComponent(r.recover(l)))), !(!i || i === t || -1 !== ["tumblr"].indexOf(e) && i.split(s).pop() === t.split(s).pop()) && i
        },
        avail: ["facebook", "pinterest", "reddit", "tumblr"],
        facebook: {
            api: ["https://graph.facebook.com/?id=", "&callback"],
            cb: function(e, a) {
                return e && e.share && !isNaN(e.share.share_count) ? e.share.share_count : 0
            }
        },
        pinterest: {
            api: ["https://widgets.pinterest.com/v1/urls/count.json?url="],
            cb: function(e, a) {
                if (e && !isNaN(e.count)) return e.count
            }
        },
        reddit: {
            api: ["https://www.reddit.com/api/info.json?url=", "&jsonp"],
            cb: function(e, a) {
                var t = e.data;
                if (e && t && t.children) {
                    for (var n, i = 0, o = [], l = t.children; i < l.length; i++)(n = l[i].data) && !isNaN(n.ups) && o.push(n.ups);
                    return o.length > 0 ? Math.max.apply(null, o) : 0
                }
            }
        },
        tumblr: {
            api: ["https://api.tumblr.com/v2/share/stats?url="],
            cb: function(e, a) {
                if (e && e.response && !isNaN(e.response.note_count)) return e.response.note_count
            }
        },
        twitter: {
            api: ["https://cdn.api.twitter.com/1/urls/count.json?url="],
            cb: function(e, a) {
                if (e && !isNaN(e.count)) return e.count
            }
        }
    },
    overlays: function() {
        var e = a2a.c.overlays || [],
            a = !!a2a.evOpts() && {
                passive: !0
            },
            t = window,
            n = t.innerWidth,
            i = t.innerHeight,
            o = n && (n < 375 || i < 375) ? 150 : 200,
            l = 200,
            r = location.href,
            s = document.title || r;

        function c(e, a, t, n) {
            var i, c, d, u, p, m, _, f, g, h, y = (h = e).target ? 3 === h.target.nodeType ? h.target.parentNode : h.target : h.srcElement,
                v = y,
                k = 0,
                b = 0,
                x = y.longDesc;
            if (a2a.matches(y, n) && "false" !== y.getAttribute("data-a2a-overlay")) {
                if (d = y.width < o || y.height < o, u = "naturalWidth" in y && (y.naturalWidth < l || y.naturalHeight < l), d || u) return;
                c = a2a.getPos(y), a.style.display = "", p = a.clientHeight || a.offsetHeight, m = a.clientWidth || a.offsetWidth, t[0] && ("bottom" === t[0] ? b = y.height - p : "center" === t[0] && (b = w((y.height - p) / 2))), t[1] && ("right" === t[1] ? k = y.width - m : "center" === t[1] && (k = w((y.width - m) / 2))), _ = c.left + k, f = c.top + b, a.style.left = _ + "px", a.style.top = f + "px", a.setAttribute("data-a2a-media", y.src), a.a2a_mediaNode = y, y.alt ? a.setAttribute("data-a2a-title", y.alt) : a.setAttribute("data-a2a-title", s), !x || "#" !== x.substr(0, 1) && "http" !== x.substr(0, 4) ? a.setAttribute("data-a2a-url", r) : (g = "#" === x.substr(0, 1) ? r.split("#")[0] + y.longDesc : x, a.setAttribute("data-a2a-url", g))
            } else if ("none" !== a.style.display) {
                for (;
                    (i = v) && "body" !== v.tagName.toLowerCase();) {
                    if (i === a) return;
                    v = v.parentNode
                }
                a.style.display = "none"
            }
        }
        for (var d = 0, u = e.length; d < u; d++) {
            var p, m = e[d],
                _ = m.services || ["pinterest", "facebook"],
                f = "",
                g = m.html,
                h = m.position,
                y = m.style,
                v = m.size || 32,
                k = m.target,
                w = Math.round;
            if (h = h && h.length > 2 ? h.split(" ") : ["top", "left"], y = !y || "horizontal" !== y && "default" !== y ? "vertical" : "default", k = k || "img", g) document.body.insertAdjacentHTML("beforeend", g), p = document.body.lastChild;
            else {
                for (var b = 0, x = _.length; b < x; b++) {
                    f += '<a class="a2a_button_' + _[b] + '"></a>'
                }(p = document.createElement("div")).className = "a2a_kit a2a_kit_size_" + v + " a2a_overlay_style a2a_" + y + "_style", p.innerHTML = f, p.setAttribute("data-a2a-title", s), p.setAttribute("data-a2a-url", r), document.body.insertBefore(p, null)
            }
            p.style.display = "none", p.style.position = "absolute", a2a.add_event(document.body, "mouseover", function(e, a, t) {
                return function(n) {
                    c(n, e, a, t)
                }
            }(p, h, k), a)
        }
        a2a.c.overlays = []
    },
    init_show: function() {
        var e = a2a_config,
            a = a2a[a2a.type],
            t = a2a.show_menu;
        e.bookmarklet && (a.no_hide = 1, t()), e.show_menu && (a.no_hide = 1, t(!1, e.show_menu))
    },
    unindexed: function(e, a) {
        function t(a) {
            for (var t, n, i = 0, o = a.length; i < o; i++)
                if (("undefined" == typeof(t = a[i]).a2a_index || "" === t.a2a_index) && t.className.indexOf("a2a_target") < 0 && t.parentNode.className.indexOf("a2a_kit") < 0 && (n = e(t)), n) return n;
            return null
        }
        if (a) return t(a2a.getByClass("a2a_kit", document)) || t(a2a.HTMLcollToArray(document.getElementsByName("a2a_dd")).concat(a2a.getByClass("a2a_dd", document)));
        t(a2a.getByClass("a2a_kit", document).concat(a2a.getByClass("a2a_dd", document), a2a.HTMLcollToArray(document.getElementsByName("a2a_dd"))))
    },
    set_this_index: function(e) {
        var a = a2a.n;

        function t(e) {
            if (!(e.className.indexOf("a2a_kit") >= 0)) return !1;
            e.a2a_kit = 1, e.className.indexOf("a2a_follow") >= 0 && (e.a2a_follow = 1)
        }
        return e ? (e.a2a_index = a, t(e), e) : a2a.unindexed(function(e) {
            return e.a2a_index = a, t(e), e
        }, !0)
    },
    gEl: function(e) {
        return document.getElementById(e)
    },
    getByClass: function(e, a, t) {
        return document.getElementsByClassName && /\{\s*\[native code\]\s*\}/.test("" + document.getElementsByClassName) ? a2a.getByClass = function(e, a, t) {
            for (var n, i = (a = a || a2a.gEl("a2a" + a2a.type + "_dropdown")).getElementsByClassName(e), o = t ? new RegExp("\\b" + t + "\\b", "i") : null, l = [], r = 0, s = i.length; r < s; r += 1) n = i[r], o && !o.test(n.nodeName) || l.push(n);
            return l
        } : document.evaluate ? a2a.getByClass = function(e, a, t) {
            t = t || "*", a = a || a2a.gEl("a2a" + a2a.type + "_dropdown");
            for (var n, i, o = e.split(" "), l = "", r = "http://www.w3.org/1999/xhtml", s = document.documentElement.namespaceURI === r ? r : null, c = [], d = 0, u = o.length; d < u; d += 1) l += "[contains(concat(' ',@class,' '), ' " + o[d] + " ')]";
            try {
                n = document.evaluate(".//" + t + l, a, s, 0, null)
            } catch (p) {
                n = document.evaluate(".//" + t + l, a, null, 0, null)
            }
            for (; i = n.iterateNext();) c.push(i);
            return c
        } : a2a.getByClass = function(e, a, t) {
            t = t || "*", a = a || a2a.gEl("a2a" + a2a.type + "_dropdown");
            for (var n, i, o = e.split(" "), l = [], r = "*" === t && a.all ? a.all : a.getElementsByTagName(t), s = [], c = 0, d = o.length; c < d; c += 1) l.push(new RegExp("(^|\\s)" + o[c] + "(\\s|$)"));
            for (var u = 0, p = r.length; u < p; u += 1) {
                n = r[u], i = !1;
                for (var m = 0, _ = l.length; m < _ && (i = l[m].test(n.className)); m += 1);
                i && s.push(n)
            }
            return s
        }, a2a.getByClass(e, a, t)
    },
    HTMLcollToArray: function(e) {
        for (var a = [], t = e.length, n = 0; n < t; n++) a[a.length] = e[n];
        return a
    },
    matches: function(e, a) {
        var t, n = "MatchesSelector",
            i = "ms" + n,
            o = "webkit" + n;
        if (e.matches) t = "matches";
        else if (e[i]) t = i;
        else {
            if (!e[o]) return a2a.matches = function(e, a) {
                return !1
            }, !1;
            t = o
        }
        return a2a.matches = function(e, a) {
            return e[t](a)
        }, a2a.matches(e, a)
    },
    evOpts: function() {
        var e = !1;
        try {
            var a = Object.defineProperty({}, "passive", {
                get: function() {
                    e = !0
                }
            });
            window.addEventListener("test", null, a)
        } catch (t) {}
        return a2a.evOpts = function() {
            return e
        }, e
    },
    add_event: function(e, a, t, n) {
        if (e.addEventListener) {
            if ("object" == typeof n) {
                var i = !!n.useCapture;
                n = a2a.evOpts() ? n : i
            }
            return e.addEventListener(a, t, n), {
                destroy: function() {
                    e.removeEventListener(a, t, n)
                }
            }
        }
        var o = function() {
            t.call(e, window.event)
        };
        return e.attachEvent("on" + a, o), {
            destroy: function() {
                e.detachEvent("on" + a, o)
            }
        }
    },
    stopPropagation: function(e) {
        e || (e = window.event), e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
    },
    preventDefault: function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
    defaultPrevented: function(e) {
        return !!(e.defaultPrevented || !1 === e.returnValue || "undefined" == typeof e.defaultPrevented && e.getPreventDefault && e.getPreventDefault())
    },
    onLoad: function(e) {
        var a = window.onload;
        "function" != typeof window.onload ? window.onload = e : window.onload = function() {
            a && a(), e()
        }
    },
    in_array: function(e, a, t, n, i) {
        if ("object" == typeof a) {
            e = e.toLowerCase();
            for (var o, l = a.length, r = 0; r < l; r++)
                if (o = n ? a[r][n] : a[r], o = i ? o[i] : o, t) {
                    if (e == o.toLowerCase()) return a[r]
                } else if (-1 != e.indexOf(o.toLowerCase()) && "" !== o) return a[r]
        }
        return !1
    },
    serialize: function(e, a) {
        var t = [];
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var i = a ? a + "[" + n + "]" : n,
                    o = e[n];
                t.push("object" == typeof o ? a2a.serialize(o, i) : encodeURIComponent(i) + "=" + encodeURIComponent(o))
            }
        return t.join("&")
    },
    miniLeaveDelay: function() {
        var e = a2a.type,
            a = "a2a" + e,
            t = a2a.gEl,
            n = a2a.getStyle;
        "none" != n(t(a + "_dropdown"), "display") && "none" == n(t(a + "_full"), "display") && (a2a[e].out_delay = setTimeout(function() {
            a2a.toggle_dropdown("none", e), a2a[e].out_delay = null
        }, 501))
    },
    miniEnterStay: function() {
        a2a[a2a.type].out_delay && clearTimeout(a2a[a2a.type].out_delay)
    },
    toggle_dropdown: function(e, a) {
        if ("none" != e || !a2a[a].no_hide) {
            var t = a2a.gEl,
                n = t("a2a" + a + "_dropdown"),
                i = t("a2a" + a + "_shim"),
                o = (document.activeElement, a2a.show_menu.key_listener);
            n.style.display = e, i && "none" == a2a.getStyle(t("a2a" + a + "_full"), "display") && (i.style.display = e), a2a.miniEnterStay(), "none" == e ? (a2a.show_menu["doc_click_listener_" + a].destroy(), delete a2a[a].doc_click_close_mini, delete a2a[a].time_open, o && o[a] && o[a].destroy()) : a2a[a].onclick || a2a[a].time_open || (a2a[a].time_open = setTimeout(function() {
                a2a[a].time_open = "OK"
            }, 501))
        }
    },
    getData: function(e) {
        if (!e) return {};
        for (var a, t = 0, n = e.attributes.length, i = {}; t < n; t++)(a = e.attributes[t]).name && "data-" == a.name.substr(0, 5) && (i[a.name.substr(5)] = a.value);
        return i
    },
    getStyle: function(e, a) {
        return e.currentStyle ? e.currentStyle[a.replace(/-(\w)/gi, function(e, a) {
            return a.toUpperCase()
        })] : window.getComputedStyle(e, null).getPropertyValue(a)
    },
    getPos: function(e) {
        var a, t = Math.round;
        return "undefined" == typeof e.getBoundingClientRect ? a2a.getPosOld(e) : {
            left: t((a = e.getBoundingClientRect()).left + a2a.getScrollDocDims("w")),
            top: t(a.top + a2a.getScrollDocDims("h"))
        }
    },
    getPosOld: function(e) {
        var a = 0,
            t = 0;
        do {
            a += e.offsetLeft || 0, t += e.offsetTop || 0, e = e.offsetParent
        } while (e);
        return {
            left: a,
            top: t
        }
    },
    getDocDims: function(e) {
        var a = 0,
            t = 0;
        return "number" == typeof window.innerWidth ? (a = window.innerWidth, t = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (a = document.documentElement.clientWidth, t = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (a = document.body.clientWidth, t = document.body.clientHeight), "w" == e ? a : t
    },
    getScrollDocDims: function(e) {
        var a = 0,
            t = 0;
        return "number" == typeof window.pageYOffset ? (a = window.pageXOffset, t = window.pageYOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (a = document.body.scrollLeft, t = document.body.scrollTop) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (a = document.documentElement.scrollLeft, t = document.documentElement.scrollTop), "w" == e ? a : t
    },
    show_more_less: function(e) {
        var a = "a2a" + a2a.type;
        (0, a2a.gEl)(a + "_show_more_less");
        a2a.show_full(!0), a2a.embeds_fix(!0)
    },
    focus_find: function() {
        var e = a2a.gEl("a2a" + a2a.type + "_find");
        "none" != e.parentNode.style.display && e.focus()
    },
    default_services: function(e) {
        for (var a = e || a2a.type, t = a2a[a].main_services_col_1, n = t.length, i = 0; i < n; i++) t[i].style.display = ""
    },
    do_find: function() {
        var e, a = a2a.type,
            t = a2a[a].main_services,
            n = t.length,
            i = a2a.gEl("a2a" + a + "_find").value,
            o = a2a.in_array;
        if ("" !== i) {
            e = i.split(" ");
            for (var l = 0; l < n; l++) o(t[l].a2a.serviceNameLowerCase, e, !1) ? t[l].style.display = "" : t[l].style.display = "none"
        } else a2a.default_services()
    },
    selection: function(e) {
        var a, t, n = document.getElementsByTagName("meta"),
            i = n.length;
        if (window.getSelection) a = window.getSelection() + "";
        else if (document.selection) {
            try {
                a = document.selection.createRange()
            } catch (s) {
                a = ""
            }
            a = a.text ? a.text : ""
        }
        if (a && "" !== a) return a;
        if (a2a["n" + a2a.n].linkurl === location.href && -1 === ["facebook", "twitter", "linkedin", "google_plus"].indexOf(e))
            for (var o, l, r = 0; r < i; r++)
                if (o = (o = n[r].getAttribute("name")) ? o.toLowerCase() : "", l = (l = n[r].getAttribute("property")) ? l.toLowerCase() : "", o && "description" === o || l && "og:description" === l) {
                    t = n[r].getAttribute("content");
                    break
                }
        return t ? t.substring(0, 1200) : ""
    },
    collections: function(e) {
        var a = a2a.gEl,
            t = a2a[e],
            n = "a2a" + e;
        t.main_services_col_1 = a2a.getByClass("a2a_i", a(n + "_full_services"), "a"), t.main_services = t.main_services_col_1, t.email_services = a2a.getByClass("a2a_i", a(n + "_2_col1", "a")), t.all_services = t.main_services.concat(t.email_services)
    },
    cbs: function(e, a) {
        var t = a2a.c.callbacks || [],
            n = a2a.c.tracking_callback,
            i = {};
        n && (n[e] ? t.push(n) : n[0] == e ? (i[e] = n[1], t.push(i)) : "function" == typeof n && (i[e] = n, t.push(i)), a2a.c.tracking_callback = null);
        for (var o, l = 0, r = t.length; l < r; l++)
            if ("function" == typeof(o = t[l][e]) && (returned = o(a), "ready" == e && (o = null), "undefined" != typeof returned)) return returned
    },
    linker: function(e) {
        var a, t, n = location.href,
            i = document.title || n,
            o = a2a["n" + (e.parentNode.a2a_index || a2a.n)],
            l = o.type,
            r = e.a2a.safename,
            s = o.linkurl_implicit && n != o.linkurl ? n : o.linkurl,
            c = encodeURIComponent(s).replace(/'/g, "%27"),
            d = o.linkname_implicit && i != o.linkname ? i : o.linkname,
            u = encodeURIComponent(d).replace(/'/g, "%27"),
            p = o.linkmedia,
            m = !!p && encodeURIComponent(p).replace(/'/g, "%27"),
            _ = encodeURIComponent(a2a.selection(r)).replace(/'/g, "%27"),
            f = !o.track_links || "page" != l && "mail" != l ? "" : "&linktrack=" + o.track_links + "&linktrackkey=" + encodeURIComponent(o.track_links_key),
            g = e.a2a.customserviceuri || !1,
            h = e.a2a.stype,
            y = e.a2a.js_src,
            v = e.a2a.url,
            k = e.a2a.media,
            w = a2a.c.templates,
            b = w[r],
            x = "email";

        function A(e) {
            return encodeURIComponent(e).replace(/'/g, "%27").replace("%24%7Blink%7D", "${link}").replace("%24%7Blink_noenc%7D", "${link_noenc}").replace("%24%7Blink_nohttp%7D", "${link_nohttp}").replace("%24%7Btitle%7D", "${title}").replace("%24%7Bmedia%7D", "${media}")
        }
        if (k && m);
        else if (h && "js" == h && y) e.target = "", a = "javascript:" == y.substr(0, 11) ? y.replace("${link}", s) : 'javascript:a2a.loadExtScript("' + y + '")';
        else if (v && (r != x || r == x && a2a.has_touch) && !f) {
            if (e.target = "", "object" == typeof b)
                for (var E in b) v = a2a.urlParam(v, E, A(b[E]));
            else "string" == typeof b && (v = a2a.urlParam(v, "text", A(b)));
            a = v.replace("${link}", c).replace("${media}", m).replace("${link_noenc}", s).replace("${link_nohttp}", s.replace(/^https?:\/\//, "")).replace("${title}", u)
        } else g && "undefined" != g && (a = g.replace(/A2A_LINKNAME_ENC/, u).replace(/A2A_LINKURL_ENC/, c).replace(/A2A_LINKNOTE_ENC/, _));
        return e.href = a || "http" + a2a.c.http_s + "://www.addtoany.com/add_to/" + r + "?linkurl=" + c + "&linkname=" + u + (m ? "&linkmedia=" + m : "") + f + (t = "", b ? t = "&" + a2a.serialize({
            template: b
        }) : w[x] && h && h == x && (t = "&" + a2a.serialize({
            template: w[x]
        })), t) + ("feed" == l ? "&type=feed" : "") + "&linknote=" + _, !0
    },
    show_full: function(e) {
        var a = a2a.type,
            t = "a2a" + a,
            n = a2a.gEl,
            i = a2a.getByClass,
            o = n(t + "_find"),
            l = n(t + "_overlay"),
            r = n(t + "_shim"),
            s = n(t + "_full"),
            c = i("a2a_full_header", s)[0],
            d = n(t + "_full_services"),
            u = i("a2a_full_footer", s)[0];
        s.classList && a2a.getStyle(l, "transition-duration") && (s.classList.add("a2a_starting"), l.classList.add("a2a_starting")), s.style.display = l.style.display = "block", r && (r.style.display = "block"), s.classList && setTimeout(function() {
            s.classList.remove("a2a_starting"), l.classList.remove("a2a_starting")
        }, 1), d.style.cssText = "height:calc(10px)", d.style.height.length && (d.style.height = "calc(100% - " + (c.offsetHeight + u.offsetHeight) + "px)"), s.focus(), a2a.show_full.key_listener = a2a.add_event(document, "keydown", function(e) {
            var t = (e = e || window.event).which || e.keyCode,
                n = document.activeElement;
            27 == t && o != n ? a2a.hide_full(a) : t > 40 && t < 91 && o != n && o.focus()
        }), e && a2a.stats("full")
    },
    hide_full: function(e) {
        var a = a2a.gEl,
            t = "a2a" + e,
            n = a(t + "_full"),
            i = a(t + "_overlay");

        function o() {
            i.style.display = n.style.display = a(t + "_modal").style.display = "none", shim = a(t + "_shim"), shim && ("none" == a2a.getStyle(a(t + "_dropdown"), "display") ? shim.style.display = "none" : (a2a.embeds_fix(), a(t + "_show_more_less").focus())), a2a.show_full.key_listener.destroy(), setTimeout(function() {
                delete a2a.show_full.key_listener
            }, 1), i.addEventListener && i.removeEventListener("transitionend", o, !1)
        }
        n.classList && a2a.getStyle(i, "transition-duration") ? (i.addEventListener("transitionend", o, !1), n.classList.add("a2a_starting"), i.classList.add("a2a_starting")) : o()
    },
    show_menu: function(e, a) {
        e ? a2a.n = e.a2a_index : (a2a.n = a2a.total, a2a[a2a.type].no_hide = 1);
        var t, n, i, o, l, r, s, c, d, u, p = a2a["n" + a2a.n],
            m = a2a.type = p.type,
            _ = "a2a" + m,
            f = a2a.gEl(_ + "_dropdown"),
            g = a2a.has_touch,
            h = g ? "touchstart" : "click",
            y = !(!g || !a2a.evOpts()) && {
                passive: !0
            };
        a2a.gEl(_ + "_title").value = p.linkname, a2a.toggle_dropdown("block", m), t = [f.clientWidth, f.clientHeight], n = a2a.getDocDims("w"), i = a2a.getDocDims("h"), o = a2a.getScrollDocDims("w"), l = a2a.getScrollDocDims("h"), e ? ((r = e.getElementsByTagName("img")[0]) ? (s = a2a.getPos(r), c = r.clientWidth, d = r.clientHeight) : (s = a2a.getPos(e), c = e.offsetWidth, d = e.offsetHeight), s.left - o + t[0] + c > n && (s.left = s.left - t[0] + c - 8), ("up" == p.orientation || "down" != p.orientation && s.top - l + t[1] + d > i && s.top > t[1]) && (s.top = s.top - t[1] - d), f.style.left = (s.left < 0 ? 0 : s.left) + 2 + "px", f.style.top = s.top + d + "px", a2a.embeds_fix()) : (a || (a = {}), f.style.position = a.position || "absolute", f.style.left = a.left || n / 2 - t[0] / 2 + "px", f.style.top = a.top || i / 2 - t[1] / 2 + "px"), a2a[m].doc_click_close_mini || a2a[m].no_hide || (a2a[m].doc_click_close_mini = (u = m, function(e) {
            !a2a.ieo() && "number" == typeof e.button && e.button > 0 || (a2a[m].last_focus && a2a[m].last_focus.focus(), a2a.toggle_dropdown("none", u))
        }), a2a.show_menu["doc_click_listener_" + m] = a2a.add_event(document, h, a2a[m].doc_click_close_mini, y)), a2a.show_menu.key_listener = a2a.show_menu.key_listener || {}, a2a.show_menu.key_listener[m] = a2a.add_event(document, "keydown", function(e) {
            27 != ((e = e || window.event).which || e.keyCode) || a2a.show_full.key_listener || a2a.toggle_dropdown("none", m)
        }), a2a.svg.load();
        var v = encodeURIComponent,
            k = "event=menu_show&url=" + v(location.href) + "&title=" + v(document.title || "") + "&ev_menu_type=" + m;
        a2a.util_frame_post(m, k)
    },
    embeds_fix: function(e) {
        var a, t, n, i, o, l = a2a.gEl,
            r = "a2a" + a2a.type,
            s = l(r + "_shim");
        s || ((s = document.createElement("iframe")).className = "a2a_shim", s.id = r + "_shim", s.title = "AddToAny Shim", s.setAttribute("frameBorder", "0"), s.setAttribute("src", 'javascript:"";'), s.tabIndex = -1, document.body.appendChild(s)), e ? (s.style.left = s.style.top = "0", s.style.width = "", s.style.height = "") : (a = l(r + "_dropdown"), t = parseInt(a.style.left), n = parseInt(a.style.top), i = a.clientWidth || a.offsetWidth, o = a.clientHeight || a.offsetHeight, s.style.left = t + "px", s.style.top = n + "px", s.style.width = i + "px", s.style.height = o + "px")
    },
    bmBrowser: function(e) {
        var a = a2a.c.localize.Bookmark,
            t = a2a["n" + a2a.n];
        if (document.all ? 1 == e ? a = a2a.c.localize.AddToYourFavorites : window.external.AddFavorite(t.linkurl, t.linkname) : 1 != e && (a2a.gEl("a2apage_note_BROWSER").innerHTML = '<div class="a2a_note_note">' + a2a.c.localize.BookmarkInstructions + "</div>"), 1 == e) return a
    },
    copyLink: function(e) {
        var a = "page",
            t = "a2a" + a,
            n = a2a.gEl,
            i = (a2a.getByClass, n(t + "_overlay")),
            o = (n(t + "_shim"), n(t + "_full")),
            l = n(t + "_modal"),
            r = n("a2a_copy_link_copied"),
            s = n("a2a_copy_link_text");
        a2a.copyLink.full_shown = "none" != a2a.getStyle(o, "display"), a2a.copyLink.clickListen || (a2a.add_event(s, "click", function(e) {
            s.setSelectionRange ? s.setSelectionRange(0, s.value.length) : s.select(), document.execCommand && document.execCommand("copy") && (r.style.display = "block", setTimeout(function() {
                l.style.display = r.style.display = "none", a2a.copyLink.full_shown ? o.style.display = "block" : a2a.hide_full(a)
            }, 700))
        }), a2a.copyLink.clickListen = 1), a2a.type = a, "none" == a2a.getStyle(i, "display") && a2a.show_full(), o.style.display = "none", s.value = e, i.style.display = l.style.display = "block", l.focus(), a2a.stats("copy")
    },
    loadExtScript: function(e, a, t) {
        var n = document.createElement("script");
        if (n.charset = "UTF-8", n.src = e, document.body.appendChild(n), "function" == typeof a) var i = setInterval(function() {
            var e = !1;
            try {
                e = a.call()
            } catch (n) {}
            e && (clearInterval(i), t.call())
        }, 100)
    },
    stats: function(e) {
        if (a2a.stats.a2a = a2a.stats.a2a || {}, !a2a.stats.a2a[e]) {
            var a = "object" == typeof window.google_prev_clients ? "&as=1" : "",
                t = new XMLHttpRequest;
            t.open("POST", "https://stats.addtoany.com/menu"), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.timeout = 3e3, t.ontimeout = function(e) {
                t.abort()
            }, t.send("view=" + e + a), a2a.stats.a2a[e] = 1
        }
    },
    track: function(e) {
        var a = new Image(1, 1);
        a.src = e, a.width = 1, a.height = 1
    },
    GA: function(e) {
        var a = window,
            t = a2a.type,
            n = function() {
                if ("function" == typeof urchinTracker) a2a.GA.track = function(e, a, t, n, i) {
                    urchinTracker("/addtoany.com/" + n), urchinTracker("/addtoany.com/" + n + "/" + (t || a2a["n" + a2a.n].linkurl)), urchinTracker("/addtoany.com/services/" + a)
                };
                else if ("object" == typeof pageTracker && "object" == typeof _gat) a2a.GA.track = function(e, a, n, i, o) {
                    "feed" != t && (_gat._anonymizeIp(), _gat._forceSSL(), pageTracker._trackSocial("AddToAny", e, n || a2a["n" + a2a.n].linkurl))
                };
                else if ("object" == typeof _gaq) a2a.GA.track = function(e, a, n, i, o) {
                    "feed" != t && (_gaq.push(["_gat._anonymizeIp"]), _gaq.push(["_gat._forceSSL"]), _gaq.push(["_trackSocial", "AddToAny", e, n || a2a["n" + a2a.n].linkurl]))
                };
                else {
                    if ("string" != typeof GoogleAnalyticsObject) return;
                    a2a.GA.track = function(e, n, i, o, l) {
                        if ("feed" != t) {
                            var r = i || a2a["n" + a2a.n].linkurl;
                            a[GoogleAnalyticsObject]("send", "social", {
                                anonymizeIp: !0,
                                forceSSL: !0,
                                socialNetwork: "AddToAny",
                                socialAction: e,
                                socialTarget: r,
                                page: r
                            })
                        }
                    }
                }
            };
        a2a.GA.track = function() {}, e || /loaded|complete/.test(document.readyState) ? n() : a2a.onLoad(n)
    },
    add_services: function() {
        var e, a = a2a.type,
            t = a2a.gEl,
            n = parseInt(a2a[a].num_services),
            i = t("a2a" + a + "_full_services"),
            o = t("a2a" + a + "_mini_services");
        if (a2a[a].custom_services) {
            var l = (d = a2a[a].custom_services).length,
                r = a2a.make_service;
            d.reverse();
            for (var s, c = 0; c < l; c++) d[c] && (1, s = r(d[c][0], d[c][0].replace(/ /g, "_"), !1, null, {}, d[c][1], d[c][2]), i.insertBefore(s, i.firstChild), s = r(d[c][0], d[c][0].replace(/ /g, "_"), !1, null, {}, d[c][1], d[c][2]), o.insertBefore(s, o.firstChild))
        }
        if ("page" == a && a2a.c.add_services) {
            l = (d = a2a.c.add_services).length, r = a2a.make_service;
            var d, u = a2a.c.http_s;
            for (c = 0; c < l; c++) d[c] && (1, u && (d[c].icon = !1), s = r(d[c].name, d[c].safe_name, !1, null, {}, !1, d[c].icon), i.insertBefore(s, i.firstChild), s = r(d[c].name, d[c].safe_name, !1, null, {}, !1, d[c].icon), o.insertBefore(s, o.firstChild))
        }
        if ((e = a2a.getByClass("a2a_i", o, "a")).length > n) {
            c = 0;
            for (var p = e.length; c < p - n; c++) o.removeChild(o.lastChild)
        }
    },
    util_frame_make: function(e) {
        var a = document.createElement("iframe"),
            t = document.createElement("div"),
            n = encodeURIComponent,
            i = document.referrer ? n(document.referrer) : "",
            o = n(location.href),
            l = (n(document.title || ""), navigator.browserLanguage || navigator.language, a2a.c.no_3p ? "&no_3p=1" : "");
        a.id = "a2a" + e + "_sm_ifr", a.width = a.height = 1, a.style.width = a.style.height = t.style.width = t.style.height = "1px", a.style.top = a.style.left = a.frameborder = a.style.border = 0, a.style.position = t.style.position = "absolute", a.style.zIndex = t.style.zIndex = 1e5, a.title = "AddToAny Utility Frame", a.setAttribute("transparency", "true"), a.setAttribute("allowTransparency", "true"), a.setAttribute("frameBorder", "0"), a.src = "https://static.addtoany.com/menu/sm.18.html#type=" + e + "&event=load&url=" + o + "&referrer=" + i + l, t.style.top = "0", t.style.visibility = "hidden", a2a.gEl("a2a" + e + "_dropdown").parentNode.insertBefore(t, null), t.insertBefore(a, null)
    },
    util_frame_listen: function(e) {
        a2a.util_frame_make(e), window.postMessage && !a2a[e].message_event && (a2a.add_event(window, "message", function(e) {
            if (".addtoany.com" === e.origin.substr(-13)) {
                var a = "string" == typeof e.data ? e.data.split("=") : [""],
                    t = a[0].substr(4),
                    n = a[1],
                    i = t.substr(0, 4);
                if (a2a.c.http_s = "s", -1 === ["page", "feed", "mail"].indexOf(i)) return;
                t == i + "_services" && (n = "" != n && n.split(","), a2a.top_services(n, i, " a2a_sss"), a2a.collections(i), a2a.default_services(i)), a2a.gEl("a2a" + i + "_sm_ifr").style.display = "none"
            }
        }), a2a[e].message_event = 1)
    },
    util_frame_post: function(e, a) {
        window.postMessage && a2a.gEl("a2a" + e + "_sm_ifr").contentWindow.postMessage(a, "*")
    },
    urlParam: function(e, a, t) {
        var n, i, o = new RegExp("[?&]" + a.replace(/[.\\+*?\[\^\]$(){}=!<>|:\-]/g, "\\$&") + "=([^&#]*)", "i"),
            l = o.exec(e);
        null === l ? i = e + (n = /\?/.test(e) ? "&" : "?") + a + "=" + t : (n = l[0].charAt(0), i = e.replace(o, n + a + "=" + t));
        return i
    },
    fix_icons: function() {
        var e = a2a.ieo();
        if (e && e < 9) {
            var a = (a = a2a.getByClass("a2a_s_a2a", document))[0],
                t = a2a.fix_icons.tryNum || 0;
            if (a && !a.a2aFixed && !a.currentStyle.backgroundImage.split('"')[1] && t < 999) return a2a.fix_icons.tryNum = t + 1, setTimeout(a2a.fix_icons, 99);
            for (var n, i, o, l, r = 0, s = a2a.getByClass("a2a_svg", document), c = s.length; r < c; r++) i = (n = (l = s[r]).currentStyle).backgroundImage.split('"')[1], !l.a2aFixed && i && ((o = new Image).style.backgroundColor = n.backgroundColor, o.style.border = 0, o.style.height = n.height, o.style.width = n.width, o.src = i, l.style.background = "none", l.insertBefore(o, l.firstChild)), l.a2aFixed = 1
        } else fix_icons = function() {}
    },
    arrange_services: function() {
        var e = a2a.type,
            a = a2a.c.prioritize;
        a && a2a.top_services(a, e), a2a.add_services()
    },
    top_services: function(e, a, t) {
        var n = a || a2a.type,
            i = a2a.in_array,
            o = a2a.make_service,
            l = parseInt(a2a[n].num_services),
            r = a2a.gEl("a2a" + n + "_full_services"),
            s = a2a.gEl("a2a" + n + "_mini_services"),
            c = a2a.getByClass("a2a_i", r, "a"),
            d = a2a.getByClass("a2a_i", s, "a"),
            u = [];
        if (e) {
            var p = e.length - 1;
            for (t = t; p > -1; p--) {
                var m = i(e[p], c, !0, "a2a", "safename");
                m && (t && (m.className = m.className + t), r.insertBefore(m, r.firstChild), u.push(m))
            }
            if (u.length > 0) {
                var _, f, g;
                for (p = 0, t = t; p < u.length; p++) g = (_ = i(u[p].a2a.safename, d, !0, "a2a", "safename")) ? _ : o((f = u[p].a2a).servicename, f.safename, f.serviceIcon, f.serviceColor, {
                    src: f.js_src,
                    url: f.url,
                    type: f.serviceType,
                    pu: f.popup,
                    media: f.media
                }), t && (g.className = g.className + t), s.insertBefore(g, s.firstChild);
                if ((d = a2a.getByClass("a2a_i", s, "a")).length > l) {
                    p = 0;
                    for (var h = d.length; p < h - l; p++) s.removeChild(s.lastChild)
                }
            }
        }
    },
    css: function() {
        var e, a, t = a2a.type,
            n = a2a.c,
            i = n.css = document.createElement("style"),
            o = n.color_main || "EEE",
            l = n.color_bg || "FFF",
            r = n.color_border || "CCC",
            s = n.color_link_text || "0166FF",
            c = n.color_link_text_hover || "2A2A2A",
            d = (n.color_link_text_hover, n.color_link_text || "2A2A2A"),
            u = (o.toLowerCase(), n.color_link_text || "2A2A2A"),
            p = n.color_border || r,
            m = ".a2a_",
            _ = "{background-position:0 ",
            f = "px!important}",
            g = m + "i_",
            h = f + g,
            y = m + "menu",
            v = "border",
            k = "background-color:",
            w = "color:",
            b = "margin:",
            x = "padding:";
        e = y + "," + y + " *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;float:none;" + b + "0;" + x + "0;position:static;height:auto;width:auto}" + y + "{" + v + "-radius:6px;display:none;direction:ltr;background:#" + l + ';font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;' + w + "#000;line-height:12px;" + v + ":1px solid #" + r + ";vertical-align:baseline;outline:0;overflow:hidden}" + m + "mini{min-width:200px;position:absolute;width:300px;z-index:9999997}" + m + "overlay{display:none;background:#" + r + ';_height:expression( ((e=document.documentElement.clientHeight)?e:document.body.clientHeight)+"px" );_width:expression( ((e=document.documentElement.clientWidth)?e:document.body.clientWidth)+"px" );filter:alpha(opacity=50);opacity:.7;position:fixed;_position:absolute;top:0;right:0;left:0;bottom:0;z-index:9999998;-webkit-tap-highlight-' + w + "rgba(0,0,0,0);transition:opacity .14s}" + m + "full{background:#" + l + ';height:auto;height:calc(320px);top:15%;_top:expression(40+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+"px");left:50%;margin-left:-320px;position:fixed;_position:absolute;text-align:center;width:640px;z-index:9999999;transition:transform .14s,opacity .14s}' + m + "full_footer," + m + "full_header," + m + "full_services{" + v + ":0;" + b + "0;" + x + "12px;box-sizing:" + v + "-box}" + m + "full_header{padding-bottom:8px}" + m + "full_services{height:280px;overflow-y:scroll;" + x + "0 12px;-webkit-overflow-scrolling:touch}" + m + "full_services " + m + "i{display:inline-block;float:none;width:181px;width:calc(33.334% - 18px)}div" + m + "full_footer{font-size:12px;text-align:center;" + x + "8px 14px}div" + m + "full_footer a,div" + m + "full_footer a:visited{display:inline;font-size:12px;line-height:14px;" + x + "8px 14px}div" + m + "full_footer a:focus,div" + m + "full_footer a:hover{background:0 0;" + v + ":0;" + w + "#" + s + "}div" + m + "full_footer a span" + m + "s_a2a,div" + m + "full_footer a span" + m + "w_a2a{background-size:14px;" + v + "-radius:3px;display:inline-block;height:14px;line-height:14px;" + b + "0 3px 0 0;vertical-align:top;*vertical-align:middle;width:14px}" + m + "modal{background:#" + l + ';font:24px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;height:auto;top:50%;_top:expression(40+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+"px");left:50%;margin-left:-320px;margin-top:-36px;position:fixed;_position:absolute;text-align:center;width:640px;z-index:9999999;transition:transform .14s,opacity .14s;-webkit-tap-highlight-' + w + "rgba(0,0,0,0)}" + m + "copy_link_container{position:relative}span" + m + "s_link#a2a_copy_link_icon,span" + m + "w_link#a2a_copy_link_icon{background-size:48px;" + v + "-radius:0;display:inline-block;height:48px;left:0;line-height:48px;" + b + "0 3px 0 0;position:absolute;vertical-align:top;*vertical-align:middle;width:48px}#a2a" + t + "_modal input#a2a_copy_link_text{" + k + "transparent;_" + k + "#" + l + ";" + v + ":0;" + w + "#" + u + ";font:inherit;height:48px;left:62px;" + x + "0;position:relative;width:564px;width:calc(100% - 76px)}#a2a_copy_link_copied{" + k + "#0166ff;background:linear-gradient(90deg,#0166ff 80%,#9cbfff);" + w + "#fff;display:none;font:inherit;font-size:16px;" + x + "6px 8px}@media print{" + m + "floating_style," + y + "," + m + "overlay{visibility:hidden}}@keyframes a2aFadeIn{from{opacity:0}to{opacity:1}}" + m + "starting{opacity:0}" + m + "starting" + m + "full{transform:scale(.8)}@media (max-width:639px){" + m + "full{" + v + "-radius:0;top:15%;left:0;margin-left:auto;width:100%}" + m + "modal{left:0;margin-left:10px;width:calc(100% - 20px)}}@media (min-width:318px) and (max-width:437px){" + m + "full " + m + "full_services " + m + "i{width:calc(50% - 18px)}}@media (max-width:317px){" + m + "full " + m + "full_services " + m + "i{width:calc(100% - 18px)}}@media (max-height:436px){" + m + "full{bottom:40px;height:auto;top:40px}}" + y + " a{" + w + "#" + s + ';text-decoration:none;font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;line-height:14px;height:auto;width:auto;outline:0;-moz-outline:none}' + y + " a:visited{" + w + "#" + s + "}" + y + " a:active," + y + " a:focus," + y + " a:hover{" + w + "#" + c + ";" + v + "-" + w + "#" + o + ";" + v + "-style:solid;" + k + "#" + o + ";text-decoration:none}" + y + " span" + m + "s_find{background-size:24px;height:24px;left:8px;position:absolute;top:7px;width:24px}" + y + " span" + m + "s_find svg{" + k + "#" + l + "}" + y + " span" + m + "s_find svg path{fill:#" + p + "}#a2a_menu_container{display:inline-block}#a2a_menu_container{_display:inline}" + y + "_find_container{" + v + ":1px solid #" + p + ";" + v + "-radius:6px;" + x + "2px 24px 2px 0;position:relative;text-align:left}" + m + "cols_container " + m + "col1{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}#a2a" + t + "_modal input,#a2a" + t + "_modal input[type=text]," + y + " input," + y + " input[type=text]{display:block;background-image:none;box-shadow:none;line-height:100%;" + b + "0;outline:0;overflow:hidden;" + x + "0;-moz-box-shadow:none;-webkit-box-shadow:none;-webkit-appearance:none}#a2a" + t + "_find_container input,#a2a" + t + "_find_container input[type=text]{" + k + "transparent;_" + k + "#" + l + ";" + v + ":0;" + w + "#" + u + ";font:inherit;font-size:16px;height:28px;line-height:20px;left:38px;outline:0;" + b + "0;" + x + "2px 0;position:relative;width:99%}" + ("undefined" != typeof document.body.style.maxHeight ? m + "clear{clear:both}" : m + "clear{clear:both;height:0;width:0;line-height:0;font-size:0}") + " " + m + "svg{background-repeat:no-repeat;display:block;overflow:hidden;height:32px;line-height:32px;width:32px}" + m + "svg svg{background-repeat:no-repeat;background-position:50% 50%;" + v + ":none;display:block;left:0;" + b + "0 auto;overflow:hidden;" + x + "0;position:relative;top:0;width:auto;height:auto}a" + m + "i,i" + m + "i{display:block;float:left;" + v + ":1px solid #" + l + ";line-height:24px;" + x + "6px 8px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:132px}a" + m + "i span,a" + m + "more span{display:inline-block;overflow:hidden;vertical-align:top;*vertical-align:middle}a" + m + "i " + m + "svg{" + b + "0 6px 0 0}a" + m + "i " + m + "svg,a" + m + "more " + m + "svg{background-size:24px;height:24px;line-height:24px;width:24px}a" + m + "sss:hover{" + v + "-left:1px solid #" + r + "}a" + y + "_show_more_less{" + v + "-bottom:1px solid #" + l + ";" + v + "-left:0;" + v + "-right:0;line-height:24px;" + b + "6px 0 0;" + x + "6px;-webkit-touch-callout:none}a" + y + "_show_more_less span{display:inline-block;height:24px;" + b + "0 6px 0 0}" + m + "kit " + m + "svg{background-repeat:repeat}" + m + "default_style a{float:left;line-height:16px;" + x + "0 2px}" + m + "default_style a:hover " + m + "svg," + m + "floating_style a:hover " + m + "svg," + m + "overlay_style a:hover " + m + "svg svg{opacity:.7}" + m + "overlay_style" + m + "default_style a:hover " + m + "svg{opacity:1}" + m + "default_style " + m + "count," + m + "default_style " + m + "svg," + m + "floating_style " + m + "svg," + y + " " + m + "svg," + m + "vertical_style " + m + "count," + m + "vertical_style " + m + "svg{" + v + "-radius:4px}" + m + "default_style " + m + "counter img," + m + "default_style " + m + "dd," + m + "default_style " + m + "svg{float:left}" + m + "default_style " + m + "img_text{margin-right:4px}" + m + "default_style " + m + "divider{" + v + "-left:1px solid #000;display:inline;float:left;height:16px;line-height:16px;" + b + "0 5px}" + m + "kit a{cursor:pointer}" + m + "floating_style{" + k + "transparent;" + v + "-radius:6px;position:fixed;z-index:9999995}" + m + "floating_style," + m + "overlay_style{animation:a2aFadeIn .2s ease-in;" + x + "4px}" + m + "vertical_style a{clear:left;display:block;overflow:hidden;" + x + "4px;text-decoration:none}" + m + "floating_style" + m + "default_style{bottom:0}" + m + "floating_style" + m + "default_style a," + m + "overlay_style" + m + "default_style a{" + x + "4px}" + m + "count{" + k + "#fff;" + v + ":1px solid #ccc;box-sizing:" + v + "-box;" + w + "#2a2a2a;display:block;float:left;font:12px Arial,Helvetica,sans-serif;height:16px;margin-left:4px;position:relative;text-align:center;width:50px}" + m + "count:after," + m + "count:before{" + v + ":solid transparent;" + v + '-width:4px 4px 4px 0;content:"";height:0;left:0;line-height:0;' + b + "-4px 0 0 -4px;position:absolute;top:50%;width:0}" + m + "count:before{" + v + "-right-" + w + "#ccc}" + m + "count:after{" + v + "-right-" + w + "#fff;margin-left:-3px}" + m + "count span{animation:a2aFadeIn .14s ease-in}" + m + "vertical_style " + m + "counter img{display:block}" + m + "vertical_style " + m + "count{float:none;margin-left:0;margin-top:6px}" + m + "vertical_style " + m + "count:after," + m + "vertical_style " + m + "count:before{" + v + ":solid transparent;" + v + '-width:0 4px 4px 4px;content:"";height:0;left:50%;line-height:0;' + b + "-4px 0 0 -4px;position:absolute;top:0;width:0}" + m + "vertical_style " + m + "count:before{" + v + "-bottom-" + w + "#ccc}" + m + "vertical_style " + m + "count:after{" + v + "-bottom-" + w + "#fff;margin-top:-3px}" + m + "nowrap{white-space:nowrap}" + m + "note{" + b + "0 auto;" + x + "9px;font-size:12px;text-align:center}" + m + "note " + m + "note_note{" + b + "0;" + w + "#" + d + "}" + m + "wide a{display:block;margin-top:3px;" + v + "-top:1px solid #" + o + ";text-align:center}" + m + "label{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:polygon(0 0,0 0,0 0);-webkit-clip-path:polygon(0 0,0 0,0 0);overflow:hidden;height:1px;width:1px}iframe" + m + "shim{" + k + "transparent;" + v + ':0;bottom:0;filter:alpha(opacity=0);height:100%;left:0;right:0;top:0;position:absolute;width:100%;z-index:9999996;_height:expression( ((e=document.documentElement.clientHeight)?e:document.body.clientHeight)+"px" );_width:expression( ((e=document.documentElement.clientWidth)?e:document.body.clientWidth)+"px" )}' + m + "kit," + y + "," + m + "modal," + m + "overlay{-ms-touch-action:manipulation;touch-action:manipulation}" + m + "dd img{" + v + ":0}" + m + 'button_facebook_like iframe{max-width:none}iframe[id^=PIN_][id$="_nag"]{display:none!important}' + g + "a2a" + _ + "0!important}" + g + "a2a_sm" + _ + "-17" + h + "agregator" + _ + "-34" + h + "amazon" + _ + "-51" + h + "aol" + _ + "-68" + h + "app_net" + _ + "-85" + h + "baidu" + _ + "-102" + h + "balatarin" + _ + "-119" + h + "behance" + _ + "-136" + h + "bibsonomy" + _ + "-153" + h + "bitty" + _ + "-170" + h + "blinklist" + _ + "-187" + h + "blogger" + _ + "-204" + h + "blogmarks" + _ + "-221" + h + "bookmark" + _ + "-238" + h + "bookmarks_fr" + _ + "-255" + h + "box" + _ + "-272" + h + "buddymarks" + _ + "-289" + h + "buffer" + _ + "-306" + h + "care2" + _ + "-323" + h + "chrome" + _ + "-340" + h + "citeulike" + _ + "-357" + h + "dailyrotation" + _ + "-374" + h + "default" + _ + "-391" + h + "delicious" + _ + "-408" + h + "designfloat" + _ + "-425" + h + "diary_ru" + _ + "-442" + h + "diaspora" + _ + "-459" + h + "digg" + _ + "-476" + h + "dihitt" + _ + "-493" + h + "diigo" + _ + "-510" + h + "dzone" + _ + "-527" + h + "email" + _ + "-544" + h + "evernote" + _ + "-561" + h + "facebook" + _ + "-578" + h + "fark" + _ + "-595" + h + "feed" + _ + "-612" + h + "feedblitz" + _ + "-629" + h + "feedbucket" + _ + "-646" + h + "feedly" + _ + "-663" + h + "feedmailer" + _ + "-680" + h + "find" + _ + "-697" + h + "firefox" + _ + "-714" + h + "flickr" + _ + "-731" + h + "flipboard" + _ + "-748" + h + "folkd" + _ + "-765" + h + "foursquare" + _ + "-782" + h + "github" + _ + "-799" + h + "gmail" + _ + "-816" + h + "google" + _ + "-833" + h + "google_classroom" + _ + "-850" + h + "google_plus" + _ + "-867" + h + "hatena" + _ + "-884" + h + "instapaper" + _ + "-901" + h + "itunes" + _ + "-918" + h + "jamespot" + _ + "-935" + h + "kakao" + _ + "-952" + h + "kik" + _ + "-969" + h + "kindle" + _ + "-986" + h + "klipfolio" + _ + "-1003" + h + "known" + _ + "-1020" + h + "line" + _ + "-1037" + h + "link" + _ + "-1054" + h + "linkedin" + _ + "-1071" + h + "livejournal" + _ + "-1088" + h + "mail_ru" + _ + "-1105" + h + "mendeley" + _ + "-1122" + h + "meneame" + _ + "-1139" + h + "miro" + _ + "-1156" + h + "mixi" + _ + "-1173" + h + "myspace" + _ + "-1190" + h + "netlog" + _ + "-1207" + h + "netvibes" + _ + "-1224" + h + "netvouz" + _ + "-1241" + h + "newsalloy" + _ + "-1258" + h + "newsisfree" + _ + "-1275" + h + "newsvine" + _ + "-1292" + h + "nujij" + _ + "-1309" + h + "odnoklassniki" + _ + "-1326" + h + "oknotizie" + _ + "-1343" + h + "oldreader" + _ + "-1360" + h + "outlook_com" + _ + "-1377" + h + "pinboard" + _ + "-1394" + h + "pinterest" + _ + "-1411" + h + "plurk" + _ + "-1428" + h + "pocket" + _ + "-1445" + h + "podnova" + _ + "-1462" + h + "print" + _ + "-1479" + h + "printfriendly" + _ + "-1496" + h + "protopage" + _ + "-1513" + h + "pusha" + _ + "-1530" + h + "qzone" + _ + "-1547" + h + "reddit" + _ + "-1564" + h + "rediff" + _ + "-1581" + h + "renren" + _ + "-1598" + h + "segnalo" + _ + "-1615" + h + "share" + _ + "-1632" + h + "sina_weibo" + _ + "-1649" + h + "sitejot" + _ + "-1666" + h + "skype" + _ + "-1683" + h + "slashdot" + _ + "-1700" + h + "sms" + _ + "-1717" + h + "snapchat" + _ + "-1734" + h + "stumbleupon" + _ + "-1751" + h + "stumpedia" + _ + "-1768" + h + "svejo" + _ + "-1785" + h + "symbaloo" + _ + "-1802" + h + "telegram" + _ + "-1819" + h + "thefreedictionary" + _ + "-1836" + h + "thefreelibrary" + _ + "-1853" + h + "tumblr" + _ + "-1870" + h + "twiddla" + _ + "-1887" + h, e += "twitter" + _ + "-1904" + h + "typepad" + _ + "-1921" + h + "viadeo" + _ + "-1938" + h + "viber" + _ + "-1955" + h + "vimeo" + _ + "-1972" + h + "vk" + _ + "-1989" + h + "wanelo" + _ + "-2006" + h + "webnews" + _ + "-2023" + h + "wechat" + _ + "-2040" + h + "whatsapp" + _ + "-2057" + h + "winksite" + _ + "-2074" + h + "wordpress" + _ + "-2091" + h + "wykop" + _ + "-2108" + h + "xing" + _ + "-2125" + h + "y18" + _ + "-2142" + h + "yahoo" + _ + "-2159" + h + "yim" + _ + "-2176" + h + "yoolink" + _ + "-2193" + h + "youmob" + _ + "-2210" + h + "youtube" + _ + "-2227" + h + "yummly" + _ + "-2244" + f, i.setAttribute("type", "text/css"), a2a.head_tag.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : (a = document.createTextNode(e), i.appendChild(a))
    },
    svg_css: function() {
        a2a.init("page");
        var e = a2a.c.css.sheet || a2a.c.css.styleSheet || {},
            a = "insertRule" in e,
            t = "addRule" in e;
        all_services = a2a.services.concat([
            [0, 0, "a2a", "0166FF"]
        ]);
        for (var n, i, o = 0, l = all_services.length; o < l; o++) n = ".a2a_s_" + all_services[o][2], i = "background-color:#" + all_services[o][3] + ";", a ? e.insertRule(n + "{" + i + "}", 0) : t && e.addRule(n, i, 0);
        a2a.svg.load(!0), a2a.svg_css = function() {}
    },
    svg: {
        icons: {},
        queue: [],
        tagO: '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">',
        tagC: "</svg>",
        fill: function(e, a) {
            return e.replace(/#FFF/gi, a)
        },
        get: function(e, a, t) {
            var n = a2a.svg,
                i = n.fill;
            return icons = n.icons, svg_tag_open = n.tagO, svg_tag_close = n.tagC, svg_src = icons[e], svg_src_default = icons.a2a, svg_src ? (svg_src = t ? i(svg_src, t) : svg_src, svg_tag_open + svg_src + svg_tag_close) : svg_src_default ? (svg_src_default = t ? i(svg_src_default, t) : svg_src_default, svg_tag_open + svg_src_default + svg_tag_close) : (a2a.svg.queue.push({
                name: e,
                node: a,
                color: t
            }), "pending")
        },
        set: function(e) {
            var a = a2a.svg,
                t = a.queue;
            if (icons = a.icons = e, svg_tag_open = a.tagO, svg_tag_close = a.tagC, icons.a2a)
                for (var n, i, o, l = 0, r = t.length; l < r; l++) i = (n = t[l]).name, color = n.color, o = icons[i] ? icons[i] : icons.a2a, o = color ? a.fill(o, color) : o, n.node.innerHTML = svg_tag_open + o + svg_tag_close
        },
        load: function(e) {
            var a = a2a.svg.works(),
                t = new window.Image;
            t.onerror = function() {
                a2a.svg.loadCSS(!1)
            }, t.onload = function() {
                var n, i = 1 === t.width && 1 === t.height;
                a && !e ? a2a.svg.loadJS(document) : a2a.svg.loadCSS(i), a2a.svg.load = (n = i, function(e) {
                    e && a2a.svg.loadCSS(n)
                })
            }, a2a.svg.load = function() {}, t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        },
        loadCSS: function(e) {
            var a = a2a.static_addtoany,
                t = a2a.c.static_server,
                n = a2a.fix_icons,
                i = a2a.svg.works(),
                o = window.document.createElement("link"),
                l = e && i && t != a ? t + "/" : a + "/svg/";
            o.rel = "stylesheet", o.href = l + ["icons.26.svg.css", "icons.26.png.css", "icons.26.old.css"][e && i ? 0 : e ? 1 : 2], a2a.head_tag.appendChild(o), n(), a2a.svg.loadCSS = n
        },
        loadJS: function() {
            var e = document,
                a = a2a.c.static_server,
                t = e.createElement("script"),
                n = e.getElementsByTagName("script")[0],
                i = a != a2a.static_addtoany ? a + "/" : a + "/svg/";
            t.async = !0, t.src = i + "icons.26.svg.js", n.parentNode.insertBefore(t, n), a2a.svg.loadJS = function() {}
        },
        works: function() {
            var e = document,
                a = !(!e.createElementNS || !e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") || window.opera && -1 === navigator.userAgent.indexOf("Chrome"));
            return a2a.svg.works = function() {
                return a
            }, a
        }
    },
    make_service: function(e, a, t, n, i, o, l) {
        var r, s, c = document.createElement("a"),
            d = a2a.c,
            u = function() {
                a2a.linker(this)
            },
            p = a2a.type,
            m = (i = i || {}, "a2a_svg a2a_s__default"),
            _ = d.icon_color,
            f = _ ? _.split(",", 2) : _,
            g = f ? f[0] : f,
            h = f ? f[1] : f;
        return c.rel = "nofollow noopener", c.className = "a2a_i", c.href = "/#" + a, c.target = "_blank", c.a2a = {}, c.a2a.safename = a, c.a2a.servicename = e, c.a2a.serviceNameLowerCase = e.toLowerCase(), c.a2a.serviceIcon = t, c.a2a.serviceColor = n, c.a2a.serviceType = i.type, c.innerHTML = "<span></span>" + e + " ", r = c.firstChild, i.type && (c.a2a.stype = i.type), i.src && (c.a2a.js_src = i.src), i.url && (c.a2a.url = i.url), i.pu && (c.a2a.popup = 1), i.media && (c.a2a.media = 1), o && (c.a2a.customserviceuri = o), l ? (r.style.backgroundImage = "url(" + l + ")", r.className = m) : _ && a2a.svg.works() ? (r.className = m + " a2a_s_" + t, g && "unset" != g ? r.style.backgroundColor = g : n && (r.style.backgroundColor = "#" + n), h && (h = h.trim())) : t ? (r.className = m + " a2a_s_" + t, n && (r.style.backgroundColor = "#" + n)) : r.className = m, l || "pending" !== (s = a2a.svg.get(t, r, h)) && (r.innerHTML = s), a2a.add_event(c, "mousedown", u), a2a.add_event(c, "keydown", u), a2a.add_event(c, "click", function(a) {
            var t = a2a["n" + a2a.n],
                n = {
                    node: c,
                    service: e,
                    title: t.linkname,
                    url: t.linkurl,
                    media: t.linkmedia
                },
                i = a2a.cbs("share", n);
            void 0 !== i && (i.url && (t.linkurl = i.url, t.linkurl_implicit = !1), i.title && (t.linkname = i.title, t.linkname_implicit = !1), i.media && (t.linkmedia = i.media), a2a.linker(c), i.stop && a2a.preventDefault(a))
        }), a2a.add_event(c, "click", function(t) {
            var n = encodeURIComponent,
                i = a2a["n" + a2a.n],
                o = "page" == p ? "pages" : "subscriptions",
                l = "page" == p ? "AddToAny Share/Save Button" : "AddToAny Subscribe Button",
                r = screen.height,
                s = "event=service_click&url=" + n(location.href) + "&title=" + n(document.title || "") + "&ev_service=" + n(a) + "&ev_service_type=menu&ev_menu_type=" + p + "&ev_url=" + n(i.linkurl) + "&ev_title=" + n(i.linkname).replace(/'/g, "%27");
            c.a2a.popup && !a2a.defaultPrevented(t) && "javascript:" != c.href.substr(0, 11) && (a2a.preventDefault(t), window.open(c.href, "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + (r > 450 ? Math.round(r / 2 - 225) : 40) + ",left=" + Math.round(screen.width / 2 - 275))), a2a.util_frame_post(p, s), a2a.GA.track(e, a, i.linkurl, o, l)
        }), c
    },
    i18n: function() {
        if (a2a.c.static_server != a2a.static_addtoany) return !1;
        var e = ["ar", "id", "ms", "bn", "bs", "bg", "ca", "ca-AD", "ca-ES", "cs", "cy", "da", "de", "dv", "el", "et", "es", "es-AR", "es-VE", "eo", "en-US", "eu", "fa", "fr", "fr-CA", "gd", "he", "hi", "hr", "is", "it", "ja", "ko", "ku", "lv", "lt", "li", "hu", "mk", "nl", "no", "pl", "pt", "pt-BR", "pt-PT", "ro", "ru", "sr", "fi", "sk", "sl", "sv", "ta", "te", "tr", "uk", "vi", "zh-CN", "zh-TW"],
            a = a2a.c.locale || (navigator.browserLanguage || navigator.language).toLowerCase(),
            t = a2a.in_array(a, e, !0);
        if (!t) {
            var n = a.indexOf("-"); - 1 != n && (t = a2a.in_array(a.substr(0, n), e, !0))
        }
        return !("en-us" == a || !t) && t
    }
};
a2a.c = a2a_config, a2a.make_once = function(e) {
    if (a2a.type = a2a.c.menu_type || e, !a2a[a2a.type] && !window["a2a" + a2a.type + "_init"]) {
        a2a[a2a.type] = {}, window.a2a_show_dropdown = a2a.show_menu, window.a2a_miniLeaveDelay = a2a.miniLeaveDelay, window.a2a_init = a2a.init, a2a["create_" + a2a.type + "_dropdown"] = function(e, a) {
            var t, n, i, o = a2a.gEl,
                l = a2a.type = e,
                r = "a2a" + l,
                s = a2a.c,
                c = a2a.ieo(),
                d = a2a.has_menter,
                u = document.createElement("i"),
                p = document.createDocumentFragment(),
                m = document.createDocumentFragment(),
                _ = (document.createElement("a"), s.icon_color),
                f = _ ? _.split(",", 2) : _,
                g = f ? f[0] : f,
                h = f ? f[1] : f,
                y = "a2a_svg a2a_s__default a2a_s_",
                v = h || "#FFF",
                k = ' style="background-color:' + (g && "unset" != g ? g : "#0166ff") + '"',
                w = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="' + v + '"><path d="M14 7h4v18h-4z"/><path d="M7 14h18v4H7z"/></g></svg>',
                b = s.localize;
            a2a.css(), b = s.localize = {
                Share: b.Share || "Share",
                Save: b.Save || "Save",
                Subscribe: b.Subscribe || "Subscribe",
                Email: b.Email || "Email",
                Bookmark: b.Bookmark || "Bookmark",
                ShowAll: b.ShowAll || "Show all",
                ShowLess: b.ShowLess || "Show less",
                FindAnyServiceToAddTo: b.FindAnyServiceToAddTo || "Find any service",
                PoweredBy: b.PoweredBy || "By",
                AnyEmail: "Any email",
                ShareViaEmail: b.ShareViaEmail || "Share via email",
                SubscribeViaEmail: b.SubscribeViaEmail || "Subscribe via email",
                BookmarkInYourBrowser: b.BookmarkInYourBrowser || "Bookmark in your browser",
                BookmarkInstructions: b.BookmarkInstructions || "Press Ctrl+D or &#8984;+D to bookmark this page",
                AddToYourFavorites: b.AddToYourFavorites || "Add to Favorites",
                SendFromWebOrProgram: b.SendFromWebOrProgram || "Send from any other email service",
                EmailProgram: b.EmailProgram || "Email application",
                More: b.More || "More&#8230;"
            };
            var x = '<div class="a2a_overlay" id="a2a' + l + '_overlay"></div>';
            x += '<div id="a2a' + l + '_modal" class="a2a_menu a2a_modal" role="dialog" tabindex="-1" aria-label="Copy link" style="display:none">', "page" == l && (x += '<div class="a2a_copy_link_container"><span id="a2a_copy_link_icon" class="a2a_svg a2a_s_link"' + k + ' onclick="a2a.gEl(\'a2a_copy_link_text\').click()"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="' + v + '" d="M24.4 21.18c0-.36-.1-.67-.36-.92l-2.8-2.8a1.24 1.24 0 0 0-.92-.38c-.38 0-.7.14-.97.43.02.04.1.12.25.26l.3.3.2.24c.08.12.14.24.17.35.03.1.05.23.05.37 0 .36-.13.66-.38.92a1.25 1.25 0 0 1-.92.37 1.4 1.4 0 0 1-.37-.03 1.06 1.06 0 0 1-.35-.18 2.27 2.27 0 0 1-.25-.2 6.82 6.82 0 0 1-.3-.3l-.24-.25c-.3.28-.44.6-.44.98 0 .36.13.66.38.92l2.78 2.8c.24.23.54.35.9.35.37 0 .68-.12.93-.35l1.98-1.97c.26-.25.38-.55.38-.9zm-9.46-9.5c0-.37-.13-.67-.38-.92l-2.78-2.8a1.24 1.24 0 0 0-.9-.37c-.36 0-.67.1-.93.35L7.97 9.92c-.26.25-.38.55-.38.9 0 .36.1.67.37.92l2.8 2.8c.24.25.55.37.92.37.36 0 .7-.13.96-.4-.03-.04-.1-.12-.26-.26s-.24-.23-.3-.3a2.67 2.67 0 0 1-.2-.24 1.05 1.05 0 0 1-.17-.35 1.4 1.4 0 0 1-.04-.37c0-.36.1-.66.36-.9.26-.26.56-.4.92-.4.14 0 .26.03.37.06.12.03.23.1.35.17.1.1.2.16.25.2l.3.3.24.26c.3-.28.44-.6.44-.98zM27 21.17c0 1.07-.38 2-1.15 2.73l-1.98 1.98c-.74.75-1.66 1.12-2.73 1.12-1.1 0-2-.38-2.75-1.14l-2.8-2.8c-.74-.74-1.1-1.65-1.1-2.73 0-1.1.38-2.04 1.17-2.82l-1.18-1.17c-.8.8-1.72 1.18-2.82 1.18-1.08 0-2-.36-2.75-1.12l-2.8-2.8C5.38 12.8 5 11.9 5 10.82c0-1.08.38-2 1.15-2.74L8.13 6.1C8.87 5.37 9.78 5 10.86 5c1.1 0 2 .38 2.75 1.15l2.8 2.8c.74.73 1.1 1.65 1.1 2.72 0 1.1-.38 2.05-1.17 2.82l1.18 1.18c.8-.8 1.72-1.2 2.82-1.2 1.08 0 2 .4 2.75 1.14l2.8 2.8c.76.76 1.13 1.68 1.13 2.76z"/></svg></span><input id="a2a_copy_link_text" type="text" title="Copy link"/><div id="a2a_copy_link_copied">&check;</div></div>'), x += "</div>", x += '<div class="a2a_menu a2a_full" id="a2a' + l + '_full" role="dialog" tabindex="-1" aria-label="' + ("feed" == l ? b.Subscribe : b.Share) + '"><div class="a2a_full_header"><div id="a2a' + l + '_find_container" class="a2a_menu_find_container"><input id="a2a' + l + '_find" class="a2a_menu_find" type="text" onclick="a2a.focus_find()" onkeyup="a2a.do_find()" autocomplete="off" title="' + b.FindAnyServiceToAddTo + '"/><span id="a2a' + l + '_find_icon" class="a2a_svg a2a_s_find" onclick="a2a.focus_find()"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M19.7 18.2l-4.5-4.5c.7-1.1 1.2-2.3 1.2-3.6 0-3.5-2.8-6.3-6.3-6.3s-6.3 2.8-6.3 6.3 2.8 6.3 6.3 6.3c1.4 0 2.6-.4 3.6-1.2l4.5 4.5c.6.6 1.3.7 1.7.2.5-.4.4-1.1-.2-1.7zm-9.6-3.6c-2.5 0-4.5-2.1-4.5-4.5 0-2.5 2.1-4.5 4.5-4.5 2.5 0 4.5 2.1 4.5 4.5s-2 4.5-4.5 4.5z"/></svg></span></div></div><div class="a2a_full_services" id="a2a' + l + '_full_services" role="presentation"></div><div class="a2a_full_footer"><a href="https://gean.ml" title="Gean Ramos" rel="noopener" target="_blank"><span class="' + y + 'a2a"' + k + ">" + w + '</span>GeanRamos</a></div></div><div id="a2a' + l + '_dropdown" class="a2a_menu a2a_mini"' + (d ? ' onmouseenter="a2a.miniEnterStay()"' : "") + (!a2a[l].onclick && d ? ' onmouseleave="a2a.miniLeaveDelay()"' : "") + ' tabindex="-1" aria-label="' + ("feed" == l ? b.Subscribe : b.Share) + '" style="display:none"><div id="a2a' + l + '_title_container" class="a2a_menu_title_container" style="display:none"><div id="a2a' + l + '_title" class="a2a_menu_title"></div></div><div class="a2a_mini_services" id="a2a' + l + '_mini_services"></div>', x += '<div id="a2a' + l + '_cols_container" class="a2a_cols_container"><div class="a2a_col1" id="a2a' + l + '_col1"' + ("mail" == l ? ' style="display:none"' : "") + '></div><div id="a2a' + l + '_2_col1"' + ("mail" != l ? ' style="display:none"' : "") + '></div><div class="a2a_clear"></div></div>', "mail" != l && (x += '<div class="a2a' + l + '_wide a2a_wide"><a href="" id="a2a' + l + '_show_more_less" class="a2a_menu_show_more_less a2a_more" title="' + b.ShowAll + '"><span class="' + y + 'a2a"' + k + ">" + w + "</span>" + b.More + "</a></div>"), x += "</div>";
            var A = "a2a_menu_container",
                E = o(A) || document.createElement("div");
            a2a.add_event(E, "click", a2a.stopPropagation), a2a.add_event(E, "touchstart", a2a.stopPropagation, !!a2a.evOpts() && {
                passive: !0
            }), E.innerHTML = x, E.id != A && (E.style.position = "static", c && c < 9 ? document.body.insertBefore(E, document.body.firstChild) : document.body.insertBefore(E, null));
            var C = a2a.make_service;
            if ("mail" != l) {
                for (var B = 0, S = a.most, F = S.length, T = parseInt(a2a[l].num_services), N = 0, L = a2a[l].exclude_services; B < F; B++) {
                    var D = S[B];
                    L && a2a.in_array(D[1], L, !0) || p.appendChild(C(D[0], D[1], D[2], D[3], D[4])), !(N < T) || L && a2a.in_array(D[1], L, !0) || (m.appendChild(C(D[0], D[1], D[2], D[3], D[4])), N++)
                }
                o(r + "_full_services").appendChild(p), o(r + "_mini_services").appendChild(m)
            }
            t = o(r + "_full_services"), u.className = "a2a_i", n = u.cloneNode(), t.appendChild(u), t.appendChild(n);
            B = 0;
            for (var z = a.email, I = z.length; B < I; B++) {
                D = z[B];
                L && a2a.in_array(D[1], L, !0) || o(r + "_2_col1").appendChild(C(D[0], D[1], D[2], D[3], D[4]))
            }
            if ("feed" != l) {
                var j = C("Email app", "email_app", "email", null, null, "mailto:?subject=A2A_LINKNAME_ENC&body=A2A_LINKURL_ENC");
                j.className = "a2a_i a2a_emailer a2a_email_client", j.id = "a2a" + l + "_email_client", j.target = "", o(r + "_2_col1").appendChild(j)
            }
            a2a[l].services = a.most.concat(a.email), "mail" != l && (a2a.add_event(o(r + "_overlay"), "click", function(e) {
                a2a.hide_full(l)
            }), a2a.add_event(o(r + "_show_more_less"), "click", function(e) {
                a2a.preventDefault(e), a2a.show_more_less()
            })), a2a.arrange_services(), a2a.util_frame_listen(l), a2a.collections(l), a2a.default_services(), "mail" != l && ((i = o(r + "_find")).onkeydown = function(e) {
                var a = (e = e || window.event).which || e.keyCode,
                    t = a2a.type;
                if (13 == a) {
                    for (var n, o = 0, l = a2a[t].main_services, r = l.length; o < r; o++)
                        if ("none" != (n = l[o]).style.display) return n.focus(), !1
                } else 27 == a && ("" == i.value && i.blur(), i.value = "", a2a.do_find())
            })
        };
        var a = {
            page: {
                most: [
                    ["Facebook", "facebook", "facebook", "3B5998", {
                        media: 1,
                        pu: 1
                    }],
                    ["Twitter", "twitter", "twitter", "55ACEE", {
                        pu: 1
                    }],
                    ["Google+", "google_plus", "google_plus", "DD4B39", {
                        pu: 1
                    }],
                    ["Pinterest", "pinterest", "pinterest", "BD081C", {
                        type: "js",
                        src: "https://static.addtoany.com/menu/pinmarklet.js",
                        media: 1,
                        pu: 1
                    }],
                    ["Email", "email", "email", "0166FF", {
                        url: "mailto:?subject=${title}&body=${link}"
                    }],
                    ["LinkedIn", "linkedin", "linkedin", "007BB5", {
                        pu: 1
                    }],
                    ["Reddit", "reddit", "reddit", "ff4500"],
                    ["Tumblr", "tumblr", "tumblr", "35465C", {
                        pu: 1
                    }],
                    ["WordPress", "wordpress", "wordpress", "464646"],
                    ["Google Gmail", "google_gmail", "gmail", "DD5347", {
                        type: "email",
                        pu: 1
                    }],
                    ["WhatsApp", "whatsapp", "whatsapp", "12AF0A"],
                    ["StumbleUpon", "stumbleupon", "stumbleupon", "EF4E23"],
                    ["Amazon Wish List", "amazon_wish_list", "amazon", "F90"],
                    ["AOL Mail", "aol_mail", "aol", "2A2A2A", {
                        type: "email",
                        pu: 1
                    }],
                    ["Balatarin", "balatarin", "balatarin", "079948"],
                    ["BibSonomy", "bibsonomy", "bibsonomy", "2A2A2A"],
                    ["Bitty Browser", "bitty_browser", "bitty", "999"],
                    ["Blinklist", "blinklist", "blinklist", "3D3C3B"],
                    ["Blogger", "blogger", "blogger", "FDA352"],
                    ["BlogMarks", "blogmarks", "blogmarks", "535353"],
                    ["Bookmarks.fr", "bookmarks_fr", "bookmarks_fr", "96C044"],
                    ["Box.net", "box_net", "box", "1A74B0"],
                    ["Buffer", "buffer", "buffer", "2A2A2A"],
                    ["Care2 News", "care2_news", "care2", "6EB43F"],
                    ["CiteULike", "citeulike", "citeulike", "2781CD"],
                    ["Copy Link", "copy_link", "link", "0166FF", {
                        type: "js",
                        src: "javascript:a2a.copyLink('${link}')"
                    }],
                    ["Delicious", "delicious", "delicious", "39F"],
                    ["Design Float", "design_float", "designfloat", "8AC8FF"],
                    ["Diary.Ru", "diary_ru", "diary_ru", "912D31"],
                    ["Diaspora", "diaspora", "diaspora", "2E3436"],
                    ["Digg", "digg", "digg", "2A2A2A"],
                    ["Diigo", "diigo", "diigo", "4A8BCA"],
                    ["Douban", "douban", "douban", "071", {
                        pu: 1
                    }],
                    ["Draugiem", "draugiem", "draugiem", "F60", {
                        pu: 1
                    }],
                    ["DZone", "dzone", "dzone", "82C251"],
                    ["Evernote", "evernote", "evernote", "8BE056"],
                    ["Facebook Messenger", "facebook_messenger", "facebook_messenger", "0084FF", {
                        pu: 1
                    }],
                    ["Fark", "fark", "fark", "555"],
                    ["Flipboard", "flipboard", "flipboard", "C00", {
                        pu: 1
                    }],
                    ["Folkd", "folkd", "folkd", "0F70B2"],
                    ["Google Bookmarks", "google_bookmarks", "google", "4285F4"],
                    ["Google Classroom", "google_classroom", "google_classroom", "FFC112"],
                    ["Hacker News", "hacker_news", "y18", "F60"],
                    ["Hatena", "hatena", "hatena", "00A6DB"],
                    ["Houzz", "houzz", "houzz", "7AC143", {
                        type: "js",
                        src: "https://www.houzz.com/js/clipperBookmarklet.js",
                        media: 1
                    }],
                    ["Instapaper", "instapaper", "instapaper", "2A2A2A"],
                    ["Kakao", "kakao", "kakao", "FCB700", {
                        pu: 1
                    }],
                    ["Kik", "kik", "kik", "2A2A2A"],
                    ["Kindle It", "kindle_it", "kindle", "2A2A2A"],
                    ["Known", "known", "known", "2A2A2A"],
                    ["Line", "line", "line", "00C300"],
                    ["LiveJournal", "livejournal", "livejournal", "113140"],
                    ["Mail.Ru", "mail_ru", "mail_ru", "356FAC"],
                    ["Mendeley", "mendeley", "mendeley", "A70805"],
                    ["Meneame", "meneame", "meneame", "FF7D12"],
                    ["Mixi", "mixi", "mixi", "D1AD5A"],
                    ["MySpace", "myspace", "myspace", "2A2A2A"],
                    ["Netvouz", "netvouz", "netvouz", "6C3"],
                    ["Odnoklassniki", "odnoklassniki", "odnoklassniki", "F2720C"],
                    ["Oknotizie", "oknotizie", "oknotizie", "88D32D"],
                    ["Outlook.com", "outlook_com", "outlook_com", "0072C6", {
                        type: "email"
                    }],
                    ["Papaly", "papaly", "papaly", "3AC0F6", {
                        pu: 1
                    }],
                    ["Pinboard", "pinboard", "pinboard", "1341DE", {
                        pu: 1
                    }],
                    ["Plurk", "plurk", "plurk", "CF682F"],
                    ["Pocket", "pocket", "pocket", "EE4056"],
                    ["Polyvore", "polyvore", "polyvore", "2A2A2A", {
                        type: "js",
                        src: "https://static.addtoany.com/menu/polyvore.js",
                        media: 1,
                        pu: 1
                    }],
                    ["Print", "print", "print", "0166FF", {
                        type: "js",
                        src: "javascript:print()"
                    }],
                    ["PrintFriendly", "printfriendly", "printfriendly", "6D9F00"],
                    ["Protopage Bookmarks", "protopage_bookmarks", "protopage", "413FFF"],
                    ["Pusha", "pusha", "pusha", "0072B8"],
                    ["Qzone", "qzone", "qzone", "2B82D9"],
                    ["Rediff MyPage", "rediff", "rediff", "D20000"],
                    ["Refind", "refind", "refind", "1492ef"],
                    ["Renren", "renren", "renren", "005EAC", {
                        pu: 1
                    }],
                    ["Sina Weibo", "sina_weibo", "sina_weibo", "E6162D"],
                    ["SiteJot", "sitejot", "sitejot", "FFC808"],
                    ["Skype", "skype", "skype", "00AFF0"],
                    ["Slashdot", "slashdot", "slashdot", "004242"],
                    ["SMS", "sms", "sms", "6CBE45", {
                        url: "sms:?&body=${title}%20${link}"
                    }],
                    ["StockTwits", "stocktwits", "stocktwits", "40576F", {
                        pu: 1
                    }],
                    ["Svejo", "svejo", "svejo", "5BD428"],
                    ["Symbaloo Feeds", "symbaloo_feeds", "symbaloo", "6DA8F7"],
                    ["Telegram", "telegram", "telegram", "2CA5E0"],
                    ["Threema", "threema", "threema", "2A2A2A", {
                        url: "threema://compose?text=${title}%20${link}"
                    }],
                    ["Trello", "trello", "trello", "0079BF", {
                        pu: 1
                    }],
                    ["Tuenti", "tuenti", "tuenti", "0075C9"],
                    ["Twiddla", "twiddla", "twiddla", "2A2A2A"],
                    ["TypePad Post", "typepad_post", "typepad", "D2DE61"],
                    ["Viadeo", "viadeo", "viadeo", "2A2A2A", {
                        pu: 1
                    }],
                    ["Viber", "viber", "viber", "7C529E", {
                        url: "viber://forward?text=${title}%20${link}"
                    }],
                    ["VK", "vk", "vk", "587EA3", {
                        pu: 1
                    }],
                    ["Wanelo", "wanelo", "wanelo", "9cb092"],
                    ["WeChat", "wechat", "wechat", "7BB32E"],
                    ["Wykop", "wykop", "wykop", "367DA9"],
                    ["XING", "xing", "xing", "165B66", {
                        pu: 1
                    }],
                    ["Yahoo Bookmarks", "yahoo_bookmarks", "yahoo", "400090"],
                    ["Yahoo Mail", "yahoo_mail", "yahoo", "400090", {
                        type: "email"
                    }],
                    ["Yahoo Messenger", "yahoo_messenger", "yim", "400090", {
                        url: "ymsgr:sendim?+&m=${link}"
                    }],
                    ["Yoolink", "yoolink", "yoolink", "A2C538"],
                    ["Yummly", "yummly", "yummly", "E16120", {
                        type: "js",
                        src: "https://www.yummly.com/js/yumlet.js",
                        media: 1,
                        pu: 1
                    }]
                ],
                email: [
                    ["Google Gmail", "google_gmail", "gmail", "DD5347", {
                        type: "email",
                        pu: 1
                    }],
                    ["AOL Mail", "aol_mail", "aol", "2A2A2A", {
                        type: "email",
                        pu: 1
                    }],
                    ["Outlook.com", "outlook_com", "outlook_com", "0072C6", {
                        type: "email"
                    }],
                    ["Yahoo Mail", "yahoo_mail", "yahoo", "400090", {
                        type: "email"
                    }]
                ]
            },
            feed: {
                most: [
                    ["Feed", "feed", "feed", "E3702D", {
                        url: "${link_noenc}"
                    }],
                    ["Feedly", "feedly", "feedly", "2BB24C"],
                    ["My Yahoo", "my_yahoo", "yahoo", "400090"],
                    ["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", {
                        type: "email"
                    }],
                    ["AOL Reader", "my_aol", "aol", "2A2A2A"],
                    ["The Old Reader", "oldreader", "oldreader", "D73F31"],
                    ["Agregator", "agregator", "agregator", "359440"],
                    ["Bitty Browser Preview", "bitty_browser_preview", "bitty", "999"],
                    ["Daily Rotation", "daily_rotation", "dailyrotation", "2A2A2A"],
                    ["Feed Mailer", "feed_mailer", "feedmailer", "78A8D1"],
                    ["FeedBucket", "feedbucket", "feedbucket", "E3702D"],
                    ["iTunes", "itunes", "itunes", "FB233A", {
                        url: "itpc://${link_nohttp}"
                    }],
                    ["Miro", "miro", "miro", "D41700"],
                    ["Netvibes", "netvibes", "netvibes", "7CA900"],
                    ["NewsAlloy", "newsalloy", "newsalloy", "8E2B3D"],
                    ["NewsIsFree", "newsisfree", "newsisfree", "316CA9"],
                    ["Outlook", "outlook", "outlook_com", "0072C6", {
                        url: "feed://${link_nohttp}"
                    }],
                    ["PodNova", "podnova", "podnova", "B50419"],
                    ["Protopage News Feeds", "protopage_news_feeds", "protopage", "413FFF"],
                    ["Symbaloo Bookmarks", "symbaloo_bookmarks", "symbaloo", "6DA8F7"],
                    ["The Free Dictionary", "the_free_dictionary", "thefreedictionary", "004B85"],
                    ["The Free Library", "the_free_library", "thefreelibrary", "004B85"],
                    ["WINKsite", "winksite", "winksite", "6FE738"]
                ],
                email: [
                    ["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", {
                        type: "email"
                    }]
                ]
            }
        };
        a2a.services = a.page.most.concat(a.feed.most);
        var t = a2a.type,
            n = a2a[t],
            i = "feed" == t ? "feed" : "page",
            o = a2a.c;
        location.host.split(".").slice(-1);
        n.onclick = o.onclick || !1, n.show_title = o.show_title || !1, n.num_services = o.num_services || 8, n.exclude_services = o.exclude_services || !1, n.custom_services = o.custom_services || !1, a2a.locale = a2a.i18n(), a2a.locale && "custom" != a2a.locale ? (a2a.loadExtScript(o.static_server + "/locale/" + a2a.locale + ".js", function() {
            return "" != a2a_localize
        }, function() {
            for (o.localize = a2a_localize, a2a["create_" + a2a.type + "_dropdown"](t, a[i]); a2a.fn_queue.length > 0;) a2a.fn_queue.shift()();
            a2a.locale = null, a2a.GA(1), a2a.init_show(), a2a.ready()
        }), o.menu_type = !1) : (a2a["create_" + a2a.type + "_dropdown"](t, a[i]), a2a.GA())
    }
}, document.body && (a2a.overlays(), a2a.init_all("page"), a2a.ready()), a2a.dom.ready(function() {
    a2a.overlays(), a2a.init_all("page"), a2a.ready()
});
