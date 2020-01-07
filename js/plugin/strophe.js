/*! strophe.js v1.1.3 - built on 20-01-2014 */
function b64_sha1(a) {
    return binb2b64(core_sha1(str2binb(a), 8 * a.length))
}

function str_sha1(a) {
    return binb2str(core_sha1(str2binb(a), 8 * a.length))
}

function b64_hmac_sha1(a, b) {
    return binb2b64(core_hmac_sha1(a, b))
}

function str_hmac_sha1(a, b) {
    return binb2str(core_hmac_sha1(a, b))
}

function core_sha1(a, b) {
    a[b >> 5] |= 128 << 24 - b % 32, a[(b + 64 >> 9 << 4) + 15] = b;
    var c, d, e, f, g, h, i, j, k = new Array(80),
        l = 1732584193,
        m = -271733879,
        n = -1732584194,
        o = 271733878,
        p = -1009589776;
    for (c = 0; c < a.length; c += 16) {
        for (f = l, g = m, h = n, i = o, j = p, d = 0; 80 > d; d++) k[d] = 16 > d ? a[c + d] : rol(k[d - 3] ^ k[d - 8] ^
            k[d - 14] ^ k[d - 16], 1), e = safe_add(safe_add(rol(l, 5), sha1_ft(d, m, n, o)), safe_add(safe_add(p,
            k[d]), sha1_kt(d))), p = o, o = n, n = rol(m, 30), m = l, l = e;
        l = safe_add(l, f), m = safe_add(m, g), n = safe_add(n, h), o = safe_add(o, i), p = safe_add(p, j)
    }
    return [l, m, n, o, p]
}

function sha1_ft(a, b, c, d) {
    return 20 > a ? b & c | ~b & d : 40 > a ? b ^ c ^ d : 60 > a ? b & c | b & d | c & d : b ^ c ^ d
}

function sha1_kt(a) {
    return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
}

function core_hmac_sha1(a, b) {
    var c = str2binb(a);
    c.length > 16 && (c = core_sha1(c, 8 * a.length));
    for (var d = new Array(16), e = new Array(16), f = 0; 16 > f; f++) d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
    var g = core_sha1(d.concat(str2binb(b)), 512 + 8 * b.length);
    return core_sha1(e.concat(g), 672)
}

function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}

function rol(a, b) {
    return a << b | a >>> 32 - b
}

function str2binb(a) {
    for (var b = [], c = 255, d = 0; d < 8 * a.length; d += 8) b[d >> 5] |= (a.charCodeAt(d / 8) & c) << 24 - d % 32;
    return b
}

function binb2str(a) {
    for (var b = "", c = 255, d = 0; d < 32 * a.length; d += 8) b += String.fromCharCode(a[d >> 5] >>> 24 - d % 32 & c);
    return b
}

function binb2b64(a) {
    for (var b, c, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = "", f = 0; f < 4 * a.length; f +=
        3)
        for (b = (a[f >> 2] >> 8 * (3 - f % 4) & 255) << 16 | (a[f + 1 >> 2] >> 8 * (3 - (f + 1) % 4) & 255) << 8 | a[f +
                2 >> 2] >> 8 * (3 - (f + 2) % 4) & 255, c = 0; 4 > c; c++) e += 8 * f + 6 * c > 32 * a.length ? "=" : d
            .charAt(b >> 6 * (3 - c) & 63);
    return e
}
var Base64 = function () {
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            b = {
                encode: function (b) {
                    var c, d, e, f, g, h, i, j = "",
                        k = 0;
                    do c = b.charCodeAt(k++), d = b.charCodeAt(k++), e = b.charCodeAt(k++), f = c >> 2, g = (3 & c) <<
                        4 | d >> 4, h = (15 & d) << 2 | e >> 6, i = 63 & e, isNaN(d) ? h = i = 64 : isNaN(e) && (i =
                            64), j = j + a.charAt(f) + a.charAt(g) + a.charAt(h) + a.charAt(i); while (k < b.length);
                    return j
                },
                decode: function (b) {
                    var c, d, e, f, g, h, i, j = "",
                        k = 0;
                    b = b.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    do f = a.indexOf(b.charAt(k++)), g = a.indexOf(b.charAt(k++)), h = a.indexOf(b.charAt(k++)), i =
                        a.indexOf(b.charAt(k++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 |
                        i, j += String.fromCharCode(c), 64 != h && (j += String.fromCharCode(d)), 64 != i && (j +=
                            String.fromCharCode(e)); while (k < b.length);
                    return j
                }
            };
        return b
    }(),
    MD5 = function () {
        var a = function (a, b) {
                var c = (65535 & a) + (65535 & b),
                    d = (a >> 16) + (b >> 16) + (c >> 16);
                return d << 16 | 65535 & c
            },
            b = function (a, b) {
                return a << b | a >>> 32 - b
            },
            c = function (a) {
                for (var b = [], c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << c % 32;
                return b
            },
            d = function (a) {
                for (var b = "", c = 0; c < 32 * a.length; c += 8) b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
                return b
            },
            e = function (a) {
                for (var b = "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(a[d >> 2] >> d % 4 *
                    8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
                return c
            },
            f = function (c, d, e, f, g, h) {
                return a(b(a(a(d, c), a(f, h)), g), e)
            },
            g = function (a, b, c, d, e, g, h) {
                return f(b & c | ~b & d, a, b, e, g, h)
            },
            h = function (a, b, c, d, e, g, h) {
                return f(b & d | c & ~d, a, b, e, g, h)
            },
            i = function (a, b, c, d, e, g, h) {
                return f(b ^ c ^ d, a, b, e, g, h)
            },
            j = function (a, b, c, d, e, g, h) {
                return f(c ^ (b | ~d), a, b, e, g, h)
            },
            k = function (b, c) {
                b[c >> 5] |= 128 << c % 32, b[(c + 64 >>> 9 << 4) + 14] = c;
                for (var d, e, f, k, l = 1732584193, m = -271733879, n = -1732584194, o = 271733878, p = 0; p < b.length; p +=
                    16) d = l, e = m, f = n, k = o, l = g(l, m, n, o, b[p + 0], 7, -680876936), o = g(o, l, m, n, b[p +
                    1], 12, -389564586), n = g(n, o, l, m, b[p + 2], 17, 606105819), m = g(m, n, o, l, b[p + 3], 22,
                    -1044525330), l = g(l, m, n, o, b[p + 4], 7, -176418897), o = g(o, l, m, n, b[p + 5], 12,
                    1200080426), n = g(n, o, l, m, b[p + 6], 17, -1473231341), m = g(m, n, o, l, b[p + 7], 22, -
                    45705983), l = g(l, m, n, o, b[p + 8], 7, 1770035416), o = g(o, l, m, n, b[p + 9], 12, -
                    1958414417), n = g(n, o, l, m, b[p + 10], 17, -42063), m = g(m, n, o, l, b[p + 11], 22, -
                    1990404162), l = g(l, m, n, o, b[p + 12], 7, 1804603682), o = g(o, l, m, n, b[p + 13], 12, -
                    40341101), n = g(n, o, l, m, b[p + 14], 17, -1502002290), m = g(m, n, o, l, b[p + 15], 22,
                    1236535329), l = h(l, m, n, o, b[p + 1], 5, -165796510), o = h(o, l, m, n, b[p + 6], 9, -
                    1069501632), n = h(n, o, l, m, b[p + 11], 14, 643717713), m = h(m, n, o, l, b[p + 0], 20, -
                    373897302), l = h(l, m, n, o, b[p + 5], 5, -701558691), o = h(o, l, m, n, b[p + 10], 9,
                    38016083), n = h(n, o, l, m, b[p + 15], 14, -660478335), m = h(m, n, o, l, b[p + 4], 20, -
                    405537848), l = h(l, m, n, o, b[p + 9], 5, 568446438), o = h(o, l, m, n, b[p + 14], 9, -
                    1019803690), n = h(n, o, l, m, b[p + 3], 14, -187363961), m = h(m, n, o, l, b[p + 8], 20,
                    1163531501), l = h(l, m, n, o, b[p + 13], 5, -1444681467), o = h(o, l, m, n, b[p + 2], 9, -
                    51403784), n = h(n, o, l, m, b[p + 7], 14, 1735328473), m = h(m, n, o, l, b[p + 12], 20, -
                    1926607734), l = i(l, m, n, o, b[p + 5], 4, -378558), o = i(o, l, m, n, b[p + 8], 11, -
                    2022574463), n = i(n, o, l, m, b[p + 11], 16, 1839030562), m = i(m, n, o, l, b[p + 14], 23, -
                    35309556), l = i(l, m, n, o, b[p + 1], 4, -1530992060), o = i(o, l, m, n, b[p + 4], 11,
                    1272893353), n = i(n, o, l, m, b[p + 7], 16, -155497632), m = i(m, n, o, l, b[p + 10], 23, -
                    1094730640), l = i(l, m, n, o, b[p + 13], 4, 681279174), o = i(o, l, m, n, b[p + 0], 11, -
                    358537222), n = i(n, o, l, m, b[p + 3], 16, -722521979), m = i(m, n, o, l, b[p + 6], 23,
                    76029189), l = i(l, m, n, o, b[p + 9], 4, -640364487), o = i(o, l, m, n, b[p + 12], 11, -
                    421815835), n = i(n, o, l, m, b[p + 15], 16, 530742520), m = i(m, n, o, l, b[p + 2], 23, -
                    995338651), l = j(l, m, n, o, b[p + 0], 6, -198630844), o = j(o, l, m, n, b[p + 7], 10,
                    1126891415), n = j(n, o, l, m, b[p + 14], 15, -1416354905), m = j(m, n, o, l, b[p + 5], 21, -
                    57434055), l = j(l, m, n, o, b[p + 12], 6, 1700485571), o = j(o, l, m, n, b[p + 3], 10, -
                    1894986606), n = j(n, o, l, m, b[p + 10], 15, -1051523), m = j(m, n, o, l, b[p + 1], 21, -
                    2054922799), l = j(l, m, n, o, b[p + 8], 6, 1873313359), o = j(o, l, m, n, b[p + 15], 10, -
                    30611744), n = j(n, o, l, m, b[p + 6], 15, -1560198380), m = j(m, n, o, l, b[p + 13], 21,
                    1309151649), l = j(l, m, n, o, b[p + 4], 6, -145523070), o = j(o, l, m, n, b[p + 11], 10, -
                    1120210379), n = j(n, o, l, m, b[p + 2], 15, 718787259), m = j(m, n, o, l, b[p + 9], 21, -
                    343485551), l = a(l, d), m = a(m, e), n = a(n, f), o = a(o, k);
                return [l, m, n, o]
            },
            l = {
                hexdigest: function (a) {
                    return e(k(c(a), 8 * a.length))
                },
                hash: function (a) {
                    return d(k(c(a), 8 * a.length))
                }
            };
        return l
    }();
Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this,
            c = Array.prototype.slice,
            d = Array.prototype.concat,
            e = c.call(arguments, 1);
        return function () {
            return b.apply(a ? a : this, d.call(e, c.call(arguments, 0)))
        }
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        var b = this.length,
            c = Number(arguments[1]) || 0;
        for (c = 0 > c ? Math.ceil(c) : Math.floor(c), 0 > c && (c += b); b > c; c++)
            if (c in this && this[c] === a) return c;
        return -1
    }),
    function (a) {
        function b(a, b) {
            return new f.Builder(a, b)
        }

        function c(a) {
            return new f.Builder("message", a)
        }

        function d(a) {
            return new f.Builder("iq", a)
        }

        function e(a) {
            return new f.Builder("presence", a)
        }
        var f;
        f = {
                VERSION: "1.1.3",
                NS: {
                    HTTPBIND: "http://jabber.org/protocol/httpbind",
                    BOSH: "urn:xmpp:xbosh",
                    CLIENT: "jabber:client",
                    AUTH: "jabber:iq:auth",
                    ROSTER: "jabber:iq:roster",
                    PROFILE: "jabber:iq:profile",
                    DISCO_INFO: "http://jabber.org/protocol/disco#info",
                    DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
                    MUC: "http://jabber.org/protocol/muc",
                    SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
                    STREAM: "http://etherx.jabber.org/streams",
                    BIND: "urn:ietf:params:xml:ns:xmpp-bind",
                    SESSION: "urn:ietf:params:xml:ns:xmpp-session",
                    VERSION: "jabber:iq:version",
                    STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
                    XHTML_IM: "http://jabber.org/protocol/xhtml-im",
                    XHTML: "http://www.w3.org/1999/xhtml"
                },
                XHTML: {
                    tags: ["a", "blockquote", "br", "cite", "em", "img", "li", "ol", "p", "span", "strong", "ul",
                        "body"],
                    attributes: {
                        a: ["href"],
                        blockquote: ["style"],
                        br: [],
                        cite: ["style"],
                        em: [],
                        img: ["src", "alt", "style", "height", "width"],
                        li: ["style"],
                        ol: ["style"],
                        p: ["style"],
                        span: ["style"],
                        strong: [],
                        ul: ["style"],
                        body: []
                    },
                    css: ["background-color", "color", "font-family", "font-size", "font-style", "font-weight",
                        "margin-left", "margin-right", "text-align", "text-decoration"],
                    validTag: function (a) {
                        for (var b = 0; b < f.XHTML.tags.length; b++)
                            if (a == f.XHTML.tags[b]) return !0;
                        return !1
                    },
                    validAttribute: function (a, b) {
                        if ("undefined" != typeof f.XHTML.attributes[a] && f.XHTML.attributes[a].length > 0)
                            for (var c = 0; c < f.XHTML.attributes[a].length; c++)
                                if (b == f.XHTML.attributes[a][c]) return !0;
                        return !1
                    },
                    validCSS: function (a) {
                        for (var b = 0; b < f.XHTML.css.length; b++)
                            if (a == f.XHTML.css[b]) return !0;
                        return !1
                    }
                },
                Status: {
                    ERROR: 0,
                    CONNECTING: 1,
                    CONNFAIL: 2,
                    AUTHENTICATING: 3,
                    AUTHFAIL: 4,
                    CONNECTED: 5,
                    DISCONNECTED: 6,
                    DISCONNECTING: 7,
                    ATTACHED: 8
                },
                LogLevel: {
                    DEBUG: 0,
                    INFO: 1,
                    WARN: 2,
                    ERROR: 3,
                    FATAL: 4
                },
                ElementType: {
                    NORMAL: 1,
                    TEXT: 3,
                    CDATA: 4,
                    FRAGMENT: 11
                },
                TIMEOUT: 1.1,
                SECONDARY_TIMEOUT: .1,
                addNamespace: function (a, b) {
                    f.NS[a] = b
                },
                forEachChild: function (a, b, c) {
                    var d, e;
                    for (d = 0; d < a.childNodes.length; d++) e = a.childNodes[d], e.nodeType != f.ElementType.NORMAL ||
                        b && !this.isTagEqual(e, b) || c(e)
                },
                isTagEqual: function (a, b) {
                    return a.tagName.toLowerCase() == b.toLowerCase()
                },
                _xmlGenerator: null,
                _makeGenerator: function () {
                    var a;
                    return void 0 === document.implementation.createDocument || document.implementation.createDocument &&
                        document.documentMode && document.documentMode < 10 ? (a = this._getIEXmlDom(), a.appendChild(
                            a.createElement("strophe"))) : a = document.implementation.createDocument(
                            "jabber:client", "strophe", null), a
                },
                xmlGenerator: function () {
                    return f._xmlGenerator || (f._xmlGenerator = f._makeGenerator()), f._xmlGenerator
                },
                _getIEXmlDom: function () {
                    for (var a = null, b = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0",
                            "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
                            "MSXML.DOMDocument", "Microsoft.XMLDOM"], c = 0; c < b.length && null === a; c++) try {
                        a = new ActiveXObject(b[c])
                    } catch (d) {
                        a = null
                    }
                    return a
                },
                xmlElement: function (a) {
                    if (!a) return null;
                    var b, c, d, e = f.xmlGenerator().createElement(a);
                    for (b = 1; b < arguments.length; b++)
                        if (arguments[b])
                            if ("string" == typeof arguments[b] || "number" == typeof arguments[b]) e.appendChild(f
                                .xmlTextNode(arguments[b]));
                            else if ("object" == typeof arguments[b] && "function" == typeof arguments[b].sort)
                        for (c = 0; c < arguments[b].length; c++) "object" == typeof arguments[b][c] && "function" ==
                            typeof arguments[b][c].sort && e.setAttribute(arguments[b][c][0], arguments[b][c][1]);
                    else if ("object" == typeof arguments[b])
                        for (d in arguments[b]) arguments[b].hasOwnProperty(d) && e.setAttribute(d, arguments[b][d]);
                    return e
                },
                xmlescape: function (a) {
                    return a = a.replace(/\&/g, "&"), a = a.replace(/</g, "<"), a = a.replace(/>/g, ">"),
                        a = a.replace(/'/g, "'"), a = a.replace(/"/g, "")
                },
                xmlTextNode: function (a) {
                    return f.xmlGenerator().createTextNode(a)
                },
                xmlHtmlNode: function (a) {
                    var b;
                    if (window.DOMParser) {
                        var c = new DOMParser;
                        b = c.parseFromString(a, "text/xml")
                    } else b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a);
                    return b
                },
                getText: function (a) {
                    if (!a) return null;
                    var b = "";
                    0 === a.childNodes.length && a.nodeType == f.ElementType.TEXT && (b += a.nodeValue);
                    for (var c = 0; c < a.childNodes.length; c++) a.childNodes[c].nodeType == f.ElementType.TEXT &&
                        (b += a.childNodes[c].nodeValue);
                    return f.xmlescape(b)
                },
                copyElement: function (a) {
                    var b, c;
                    if (a.nodeType == f.ElementType.NORMAL) {
                        for (c = f.xmlElement(a.tagName), b = 0; b < a.attributes.length; b++) c.setAttribute(a.attributes[
                            b].nodeName.toLowerCase(), a.attributes[b].value);
                        for (b = 0; b < a.childNodes.length; b++) c.appendChild(f.copyElement(a.childNodes[b]))
                    } else a.nodeType == f.ElementType.TEXT && (c = f.xmlGenerator().createTextNode(a.nodeValue));
                    return c
                },
                createHtml: function (a) {
                    var b, c, d, e, g, h, i, j, k, l, m;
                    if (a.nodeType == f.ElementType.NORMAL)
                        if (e = a.nodeName.toLowerCase(), f.XHTML.validTag(e)) try {
                            for (c = f.xmlElement(e), b = 0; b < f.XHTML.attributes[e].length; b++)
                                if (g = f.XHTML.attributes[e][b], h = a.getAttribute(g), "undefined" != typeof h &&
                                    null !== h && "" !== h && h !== !1 && 0 !== h)
                                    if ("style" == g && "object" == typeof h && "undefined" != typeof h.cssText &&
                                        (h = h.cssText), "style" == g) {
                                        for (i = [], j = h.split(";"), d = 0; d < j.length; d++) k = j[d].split(
                                                ":"), l = k[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase(),
                                            f.XHTML.validCSS(l) && (m = k[1].replace(/^\s*/, "").replace(/\s*$/,
                                                ""), i.push(l + ": " + m));
                                        i.length > 0 && (h = i.join("; "), c.setAttribute(g, h))
                                    } else c.setAttribute(g, h);
                            for (b = 0; b < a.childNodes.length; b++) c.appendChild(f.createHtml(a.childNodes[b]))
                        } catch (n) {
                            c = f.xmlTextNode("")
                        } else
                            for (c = f.xmlGenerator().createDocumentFragment(), b = 0; b < a.childNodes.length; b++)
                                c.appendChild(f.createHtml(a.childNodes[b]));
                        else if (a.nodeType == f.ElementType.FRAGMENT)
                        for (c = f.xmlGenerator().createDocumentFragment(), b = 0; b < a.childNodes.length; b++) c.appendChild(
                            f.createHtml(a.childNodes[b]));
                    else a.nodeType == f.ElementType.TEXT && (c = f.xmlTextNode(a.nodeValue));
                    return c
                },
                escapeNode: function (a) {
                    return a.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/\"/g,
                        "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(
                        /:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40")
                },
                unescapeNode: function (a) {
                    return a.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'")
                        .replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(
                            /\\40/g, "@").replace(/\\5c/g, "\\")
                },
                getNodeFromJid: function (a) {
                    return a.indexOf("@") < 0 ? null : a.split("@")[0]
                },
                getDomainFromJid: function (a) {
                    var b = f.getBareJidFromJid(a);
                    if (b.indexOf("@") < 0) return b;
                    var c = b.split("@");
                    return c.splice(0, 1), c.join("@")
                },
                getResourceFromJid: function (a) {
                    var b = a.split("/");
                    return b.length < 2 ? null : (b.splice(0, 1), b.join("/"))
                },
                getBareJidFromJid: function (a) {
                    return a ? a.split("/")[0] : null
                },
                log: function () {},
                debug: function (a) {
                    this.log(this.LogLevel.DEBUG, a)
                },
                info: function (a) {
                    this.log(this.LogLevel.INFO, a)
                },
                warn: function (a) {
                    this.log(this.LogLevel.WARN, a)
                },
                error: function (a) {
                    this.log(this.LogLevel.ERROR, a)
                },
                fatal: function (a) {
                    this.log(this.LogLevel.FATAL, a)
                },
                serialize: function (a) {
                    var b;
                    if (!a) return null;
                    "function" == typeof a.tree && (a = a.tree());
                    var c, d, e = a.nodeName;
                    for (a.getAttribute("_realname") && (e = a.getAttribute("_realname")), b = "<" + e, c = 0; c <
                        a.attributes.length; c++) "_realname" != a.attributes[c].nodeName && (b += " " + a.attributes[
                        c].nodeName.toLowerCase() + "='" + a.attributes[c].value.replace(/&/g, "&").replace(
                        /\'/g, "'").replace(/>/g, ">").replace(/</g, "<") + "'");
                    if (a.childNodes.length > 0) {
                        for (b += ">", c = 0; c < a.childNodes.length; c++) switch (d = a.childNodes[c], d.nodeType) {
                            case f.ElementType.NORMAL:
                                b += f.serialize(d);
                                break;
                            case f.ElementType.TEXT:
                                b += f.xmlescape(d.nodeValue);
                                break;
                            case f.ElementType.CDATA:
                                b += "<![CDATA[" + d.nodeValue + "]]>"
                        }
                        b += "</" + e + ">"
                    } else b += "/>";
                    return b
                },
                _requestId: 0,
                _connectionPlugins: {},
                addConnectionPlugin: function (a, b) {
                    f._connectionPlugins[a] = b
                }
            }, f.Builder = function (a, b) {
                ("presence" == a || "message" == a || "iq" == a) && (b && !b.xmlns ? b.xmlns = f.NS.CLIENT : b || (b = {
                    xmlns: f.NS.CLIENT
                })), this.nodeTree = f.xmlElement(a, b), this.node = this.nodeTree
            }, f.Builder.prototype = {
                tree: function () {
                    return this.nodeTree
                },
                toString: function () {
                    return f.serialize(this.nodeTree)
                },
                up: function () {
                    return this.node = this.node.parentNode, this
                },
                attrs: function (a) {
                    for (var b in a) a.hasOwnProperty(b) && this.node.setAttribute(b, a[b]);
                    return this
                },
                c: function (a, b, c) {
                    var d = f.xmlElement(a, b, c);
                    return this.node.appendChild(d), c || (this.node = d), this
                },
                cnode: function (a) {
                    var b, c = f.xmlGenerator();
                    try {
                        b = void 0 !== c.importNode
                    } catch (d) {
                        b = !1
                    }
                    var e = b ? c.importNode(a, !0) : f.copyElement(a);
                    return this.node.appendChild(e), this.node = e, this
                },
                t: function (a) {
                    var b = f.xmlTextNode(a);
                    return this.node.appendChild(b), this
                },
                h: function (a) {
                    var b = document.createElement("body");
                    b.innerHTML = a;
                    for (var c = f.createHtml(b); c.childNodes.length > 0;) this.node.appendChild(c.childNodes[0]);
                    return this
                }
            }, f.Handler = function (a, b, c, d, e, g, h) {
                this.handler = a, this.ns = b, this.name = c, this.type = d, this.id = e, this.options = h || {
                        matchBare: !1
                    }, this.options.matchBare || (this.options.matchBare = !1), this.from = this.options.matchBare ? g ?
                    f.getBareJidFromJid(g) : null : g, this.user = !0
            }, f.Handler.prototype = {
                isMatch: function (a) {
                    var b, c = null;
                    if (c = this.options.matchBare ? f.getBareJidFromJid(a.getAttribute("from")) : a.getAttribute(
                            "from"), b = !1, this.ns) {
                        var d = this;
                        f.forEachChild(a, null, function (a) {
                            a.getAttribute("xmlns") == d.ns && (b = !0)
                        }), b = b || a.getAttribute("xmlns") == this.ns
                    } else b = !0;
                    return !b || this.name && !f.isTagEqual(a, this.name) || this.type && a.getAttribute("type") !=
                        this.type || this.id && a.getAttribute("id") != this.id || this.from && c != this.from ? !1 :
                        !0
                },
                run: function (a) {
                    var b = null;
                    try {
                        b = this.handler(a)
                    } catch (c) {
                        throw c.sourceURL ? f.fatal("error: " + this.handler + " " + c.sourceURL + ":" + c.line +
                            " - " + c.name + ": " + c.message) : c.fileName ? ("undefined" != typeof console &&
                            (console.trace(), console.error(this.handler, " - error - ", c, c.message)), f.fatal(
                                "error: " + this.handler + " " + c.fileName + ":" + c.lineNumber + " - " + c.name +
                                ": " + c.message)) : f.fatal("error: " + c.message + "\n" + c.stack), c
                    }
                    return b
                },
                toString: function () {
                    return "{Handler: " + this.handler + "(" + this.name + "," + this.id + "," + this.ns + ")}"
                }
            }, f.TimedHandler = function (a, b) {
                this.period = a, this.handler = b, this.lastCalled = (new Date).getTime(), this.user = !0
            }, f.TimedHandler.prototype = {
                run: function () {
                    return this.lastCalled = (new Date).getTime(), this.handler()
                },
                reset: function () {
                    this.lastCalled = (new Date).getTime()
                },
                toString: function () {
                    return "{TimedHandler: " + this.handler + "(" + this.period + ")}"
                }
            }, f.Connection = function (a, b) {
                this.service = a, this.options = b || {};
                var c = this.options.protocol || "";
                this._proto = 0 === a.indexOf("ws:") || 0 === a.indexOf("wss:") || 0 === c.indexOf("ws") ? new f.Websocket(
                        this) : new f.Bosh(this), this.jid = "", this.domain = null, this.features = null, this._sasl_data = {},
                    this.do_session = !1, this.do_bind = !1, this.timedHandlers = [], this.handlers = [], this.removeTimeds = [],
                    this.removeHandlers = [], this.addTimeds = [], this.addHandlers = [], this._authentication = {},
                    this._idleTimeout = null, this._disconnectTimeout = null, this.do_authentication = !0, this.authenticated = !
                    1, this.disconnecting = !1, this.connected = !1, this.errors = 0, this.paused = !1, this._data = [],
                    this._uniqueId = 0, this._sasl_success_handler = null, this._sasl_failure_handler = null, this._sasl_challenge_handler =
                    null, this.maxRetries = 5, this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
                for (var d in f._connectionPlugins)
                    if (f._connectionPlugins.hasOwnProperty(d)) {
                        var e = f._connectionPlugins[d],
                            g = function () {};
                        g.prototype = e, this[d] = new g, this[d].init(this)
                    }
            }, f.Connection.prototype = {
                reset: function () {
                    this._proto._reset(), this.do_session = !1, this.do_bind = !1, this.timedHandlers = [], this.handlers = [],
                        this.removeTimeds = [], this.removeHandlers = [], this.addTimeds = [], this.addHandlers = [],
                        this._authentication = {}, this.authenticated = !1, this.disconnecting = !1, this.connected = !
                        1, this.errors = 0, this._requests = [], this._uniqueId = 0
                },
                pause: function () {
                    this.paused = !0
                },
                resume: function () {
                    this.paused = !1
                },
                getUniqueId: function (a) {
                    return "string" == typeof a || "number" == typeof a ? ++this._uniqueId + ":" + a : ++this._uniqueId +
                        ""
                },
                connect: function (a, b, c, d, e, g) {
                    this.jid = a, this.authzid = f.getBareJidFromJid(this.jid), this.authcid = f.getNodeFromJid(
                            this.jid), this.pass = b, this.servtype = "xmpp", this.connect_callback = c, this.disconnecting = !
                        1, this.connected = !1, this.authenticated = !1, this.errors = 0, this.domain = f.getDomainFromJid(
                            this.jid), this._changeConnectStatus(f.Status.CONNECTING, null), this._proto._connect(d,
                            e, g)
                },
                attach: function (a, b, c, d, e, f, g) {
                    this._proto._attach(a, b, c, d, e, f, g)
                },
                xmlInput: function () {},
                xmlOutput: function () {},
                rawInput: function () {},
                rawOutput: function () {},
                send: function (a) {
                    if (null !== a) {
                        if ("function" == typeof a.sort)
                            for (var b = 0; b < a.length; b++) this._queueData(a[b]);
                        else "function" == typeof a.tree ? this._queueData(a.tree()) : this._queueData(a);
                        this._proto._send()
                    }
                },
                flush: function () {
                    clearTimeout(this._idleTimeout), this._onIdle()
                },
                sendIQ: function (a, b, c, d) {
                    var e = null,
                        f = this;
                    "function" == typeof a.tree && (a = a.tree());
                    var g = a.getAttribute("id");
                    g || (g = this.getUniqueId("sendIQ"), a.setAttribute("id", g));
                    var h = this.addHandler(function (a) {
                        e && f.deleteTimedHandler(e);
                        var d = a.getAttribute("type");
                        if ("result" == d) b && b(a);
                        else {
                            if ("error" != d) throw {
                                name: "StropheError",
                                message: "Got bad IQ type of " + d
                            };
                            c && c(a)
                        }
                    }, null, "iq", null, g);
                    return d && (e = this.addTimedHandler(d, function () {
                        return f.deleteHandler(h), c && c(null), !1
                    })), this.send(a), g
                },
                _queueData: function (a) {
                    if (null === a || !a.tagName || !a.childNodes) throw {
                        name: "StropheError",
                        message: "Cannot queue non-DOMElement."
                    };
                    this._data.push(a)
                },
                _sendRestart: function () {
                    this._data.push("restart"), this._proto._sendRestart(), this._idleTimeout = setTimeout(this._onIdle
                        .bind(this), 100)
                },
                addTimedHandler: function (a, b) {
                    var c = new f.TimedHandler(a, b);
                    return this.addTimeds.push(c), c
                },
                deleteTimedHandler: function (a) {
                    this.removeTimeds.push(a)
                },
                addHandler: function (a, b, c, d, e, g, h) {
                    var i = new f.Handler(a, b, c, d, e, g, h);
                    return this.addHandlers.push(i), i
                },
                deleteHandler: function (a) {
                    this.removeHandlers.push(a)
                },
                disconnect: function (a) {
                    if (this._changeConnectStatus(f.Status.DISCONNECTING, a), f.info(
                            "Disconnect was called because: " + a), this.connected) {
                        var b = !1;
                        this.disconnecting = !0, this.authenticated && (b = e({
                            xmlns: f.NS.CLIENT,
                            type: "unavailable"
                        })), this._disconnectTimeout = this._addSysTimedHandler(3e3, this._onDisconnectTimeout.bind(
                            this)), this._proto._disconnect(b)
                    }
                },
                _changeConnectStatus: function (a, b) {
                    for (var c in f._connectionPlugins)
                        if (f._connectionPlugins.hasOwnProperty(c)) {
                            var d = this[c];
                            if (d.statusChanged) try {
                                d.statusChanged(a, b)
                            } catch (e) {
                                f.error("" + c + " plugin caused an exception changing status: " + e)
                            }
                        } if (this.connect_callback) try {
                        this.connect_callback(a, b)
                    } catch (g) {
                        f.error("User connection callback caused an exception: " + g)
                    }
                },
                _doDisconnect: function () {
                    null !== this._disconnectTimeout && (this.deleteTimedHandler(this._disconnectTimeout), this._disconnectTimeout =
                            null), f.info("_doDisconnect was called"), this._proto._doDisconnect(), this.authenticated = !
                        1, this.disconnecting = !1, this.handlers = [], this.timedHandlers = [], this.removeTimeds = [],
                        this.removeHandlers = [], this.addTimeds = [], this.addHandlers = [], this._changeConnectStatus(
                            f.Status.DISCONNECTED, null), this.connected = !1
                },
                _dataRecv: function (a, b) {
                    f.info("_dataRecv called");
                    var c = this._proto._reqToData(a);
                    if (null !== c) {
                        this.xmlInput !== f.Connection.prototype.xmlInput && (c.nodeName === this._proto.strip && c
                                .childNodes.length ? this.xmlInput(c.childNodes[0]) : this.xmlInput(c)), this.rawInput !==
                            f.Connection.prototype.rawInput && (b ? this.rawInput(b) : this.rawInput(f.serialize(c)));
                        for (var d, e; this.removeHandlers.length > 0;) e = this.removeHandlers.pop(), d = this.handlers
                            .indexOf(e), d >= 0 && this.handlers.splice(d, 1);
                        for (; this.addHandlers.length > 0;) this.handlers.push(this.addHandlers.pop());
                        if (this.disconnecting && this._proto._emptyQueue()) return this._doDisconnect(), void 0;
                        var g, h, i = c.getAttribute("type");
                        if (null !== i && "terminate" == i) {
                            if (this.disconnecting) return;
                            return g = c.getAttribute("condition"), h = c.getElementsByTagName("conflict"), null !==
                                g ? ("remote-stream-error" == g && h.length > 0 && (g = "conflict"), this._changeConnectStatus(
                                    f.Status.CONNFAIL, g)) : this._changeConnectStatus(f.Status.CONNFAIL, "unknown"),
                                this.disconnect("unknown stream-error"), void 0
                        }
                        var j = this;
                        f.forEachChild(c, null, function (a) {
                            var b, c;
                            for (c = j.handlers, j.handlers = [], b = 0; b < c.length; b++) {
                                var d = c[b];
                                try {
                                    !d.isMatch(a) || !j.authenticated && d.user ? j.handlers.push(d) : d.run(
                                        a) && j.handlers.push(d)
                                } catch (e) {
                                    f.warn("Removing Strophe handlers due to uncaught exception: " + e.message)
                                }
                            }
                        })
                    }
                },
                mechanisms: {},
                _connect_cb: function (a, b, c) {
                    f.info("_connect_cb was called"), this.connected = !0;
                    var d = this._proto._reqToData(a);
                    if (d) {
                        this.xmlInput !== f.Connection.prototype.xmlInput && (d.nodeName === this._proto.strip && d
                                .childNodes.length ? this.xmlInput(d.childNodes[0]) : this.xmlInput(d)), this.rawInput !==
                            f.Connection.prototype.rawInput && (c ? this.rawInput(c) : this.rawInput(f.serialize(d)));
                        var e = this._proto._connect_cb(d);
                        if (e !== f.Status.CONNFAIL) {
                            this._authentication.sasl_scram_sha1 = !1, this._authentication.sasl_plain = !1, this._authentication
                                .sasl_digest_md5 = !1, this._authentication.sasl_anonymous = !1, this._authentication
                                .legacy_auth = !1;
                            var g = d.getElementsByTagName("stream:features").length > 0;
                            g || (g = d.getElementsByTagName("features").length > 0);
                            var h, i, j = d.getElementsByTagName("mechanism"),
                                k = [],
                                l = !1;
                            if (!g) return this._proto._no_auth_received(b), void 0;
                            if (j.length > 0)
                                for (h = 0; h < j.length; h++) i = f.getText(j[h]), this.mechanisms[i] && k.push(
                                    this.mechanisms[i]);
                            return this._authentication.legacy_auth = d.getElementsByTagName("auth").length > 0, (l =
                                this._authentication.legacy_auth || k.length > 0) ? (this.do_authentication !==
                                !1 && this.authenticate(k), void 0) : (this._proto._no_auth_received(b), void 0)
                        }
                    }
                },
                authenticate: function (a) {
                    var c;
                    for (c = 0; c < a.length - 1; ++c) {
                        for (var e = c, g = c + 1; g < a.length; ++g) a[g].prototype.priority > a[e].prototype.priority &&
                            (e = g);
                        if (e != c) {
                            var h = a[c];
                            a[c] = a[e], a[e] = h
                        }
                    }
                    var i = !1;
                    for (c = 0; c < a.length; ++c)
                        if (a[c].test(this)) {
                            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null,
                                    "success", null, null), this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb
                                    .bind(this), null, "failure", null, null), this._sasl_challenge_handler = this._addSysHandler(
                                    this._sasl_challenge_cb.bind(this), null, "challenge", null, null), this._sasl_mechanism =
                                new a[c], this._sasl_mechanism.onStart(this);
                            var j = b("auth", {
                                xmlns: f.NS.SASL,
                                mechanism: this._sasl_mechanism.name
                            });
                            if (this._sasl_mechanism.isClientFirst) {
                                var k = this._sasl_mechanism.onChallenge(this, null);
                                j.t(Base64.encode(k))
                            }
                            this.send(j.tree()), i = !0;
                            break
                        } i || (null === f.getNodeFromJid(this.jid) ? (this._changeConnectStatus(f.Status.CONNFAIL,
                        "x-strophe-bad-non-anon-jid"), this.disconnect("x-strophe-bad-non-anon-jid")) : (
                        this._changeConnectStatus(f.Status.AUTHENTICATING, null), this._addSysHandler(this._auth1_cb
                            .bind(this), null, null, null, "_auth_1"), this.send(d({
                            type: "get",
                            to: this.domain,
                            id: "_auth_1"
                        }).c("query", {
                            xmlns: f.NS.AUTH
                        }).c("username", {}).t(f.getNodeFromJid(this.jid)).tree())))
                },
                _sasl_challenge_cb: function (a) {
                    var c = Base64.decode(f.getText(a)),
                        d = this._sasl_mechanism.onChallenge(this, c),
                        e = b("response", {
                            xmlns: f.NS.SASL
                        });
                    return "" !== d && e.t(Base64.encode(d)), this.send(e.tree()), !0
                },
                _auth1_cb: function () {
                    var a = d({
                        type: "set",
                        id: "_auth_2"
                    }).c("query", {
                        xmlns: f.NS.AUTH
                    }).c("username", {}).t(f.getNodeFromJid(this.jid)).up().c("password").t(this.pass);
                    return f.getResourceFromJid(this.jid) || (this.jid = f.getBareJidFromJid(this.jid) + "/strophe"),
                        a.up().c("resource", {}).t(f.getResourceFromJid(this.jid)), this._addSysHandler(this._auth2_cb
                            .bind(this), null, null, null, "_auth_2"), this.send(a.tree()), !1
                },
                _sasl_success_cb: function (a) {
                    if (this._sasl_data["server-signature"]) {
                        var b, c = Base64.decode(f.getText(a)),
                            d = /([a-z]+)=([^,]+)(,|$)/,
                            e = c.match(d);
                        if ("v" == e[1] && (b = e[2]), b != this._sasl_data["server-signature"]) return this.deleteHandler(
                                this._sasl_failure_handler), this._sasl_failure_handler = null, this._sasl_challenge_handler &&
                            (this.deleteHandler(this._sasl_challenge_handler), this._sasl_challenge_handler =
                                null), this._sasl_data = {}, this._sasl_failure_cb(null)
                    }
                    return f.info("SASL authentication succeeded."), this._sasl_mechanism && this._sasl_mechanism.onSuccess(),
                        this.deleteHandler(this._sasl_failure_handler), this._sasl_failure_handler = null, this._sasl_challenge_handler &&
                        (this.deleteHandler(this._sasl_challenge_handler), this._sasl_challenge_handler = null),
                        this._addSysHandler(this._sasl_auth1_cb.bind(this), null, "stream:features", null, null),
                        this._sendRestart(), !1
                },
                _sasl_auth1_cb: function (a) {
                    this.features = a;
                    var b, c;
                    for (b = 0; b < a.childNodes.length; b++) c = a.childNodes[b], "bind" == c.nodeName && (this.do_bind = !
                        0), "session" == c.nodeName && (this.do_session = !0);
                    if (!this.do_bind) return this._changeConnectStatus(f.Status.AUTHFAIL, null), !1;
                    this._addSysHandler(this._sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2");
                    var e = f.getResourceFromJid(this.jid);
                    return e ? this.send(d({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: f.NS.BIND
                    }).c("resource", {}).t(e).tree()) : this.send(d({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: f.NS.BIND
                    }).tree()), !1
                },
                _sasl_bind_cb: function (a) {
                    if ("error" == a.getAttribute("type")) {
                        f.info("SASL binding failed.");
                        var b, c = a.getElementsByTagName("conflict");
                        return c.length > 0 && (b = "conflict"), this._changeConnectStatus(f.Status.AUTHFAIL, b), !
                            1
                    }
                    var e, g = a.getElementsByTagName("bind");
                    return g.length > 0 ? (e = g[0].getElementsByTagName("jid"), e.length > 0 && (this.jid = f.getText(
                        e[0]), this.do_session ? (this._addSysHandler(this._sasl_session_cb.bind(this),
                        null, null, null, "_session_auth_2"), this.send(d({
                        type: "set",
                        id: "_session_auth_2"
                    }).c("session", {
                        xmlns: f.NS.SESSION
                    }).tree())) : (this.authenticated = !0, this._changeConnectStatus(f.Status.CONNECTED,
                        null))), void 0) : (f.info("SASL binding failed."), this._changeConnectStatus(f.Status.AUTHFAIL,
                        null), !1)
                },
                _sasl_session_cb: function (a) {
                    if ("result" == a.getAttribute("type")) this.authenticated = !0, this._changeConnectStatus(f.Status
                        .CONNECTED, null);
                    else if ("error" == a.getAttribute("type")) return f.info("Session creation failed."), this._changeConnectStatus(
                        f.Status.AUTHFAIL, null), !1;
                    return !1
                },
                _sasl_failure_cb: function () {
                    return this._sasl_success_handler && (this.deleteHandler(this._sasl_success_handler), this._sasl_success_handler =
                            null), this._sasl_challenge_handler && (this.deleteHandler(this._sasl_challenge_handler),
                            this._sasl_challenge_handler = null), this._sasl_mechanism && this._sasl_mechanism.onFailure(),
                        this._changeConnectStatus(f.Status.AUTHFAIL, null), !1
                },
                _auth2_cb: function (a) {
                    return "result" == a.getAttribute("type") ? (this.authenticated = !0, this._changeConnectStatus(
                        f.Status.CONNECTED, null)) : "error" == a.getAttribute("type") && (this._changeConnectStatus(
                        f.Status.AUTHFAIL, null), this.disconnect("authentication failed")), !1
                },
                _addSysTimedHandler: function (a, b) {
                    var c = new f.TimedHandler(a, b);
                    return c.user = !1, this.addTimeds.push(c), c
                },
                _addSysHandler: function (a, b, c, d, e) {
                    var g = new f.Handler(a, b, c, d, e);
                    return g.user = !1, this.addHandlers.push(g), g
                },
                _onDisconnectTimeout: function () {
                    return f.info("_onDisconnectTimeout was called"), this._proto._onDisconnectTimeout(), this._doDisconnect(),
                        !1
                },
                _onIdle: function () {
                    for (var a, b, c, d; this.addTimeds.length > 0;) this.timedHandlers.push(this.addTimeds.pop());
                    for (; this.removeTimeds.length > 0;) b = this.removeTimeds.pop(), a = this.timedHandlers.indexOf(
                        b), a >= 0 && this.timedHandlers.splice(a, 1);
                    var e = (new Date).getTime();
                    for (d = [], a = 0; a < this.timedHandlers.length; a++) b = this.timedHandlers[a], (this.authenticated ||
                        !b.user) && (c = b.lastCalled + b.period, 0 >= c - e ? b.run() && d.push(b) : d.push(b));
                    this.timedHandlers = d, clearTimeout(this._idleTimeout), this._proto._onIdle(), this.connected &&
                        (this._idleTimeout = setTimeout(this._onIdle.bind(this), 100))
                }
            }, a && a(f, b, c, d, e), f.SASLMechanism = function (a, b, c) {
                this.name = a, this.isClientFirst = b, this.priority = c
            }, f.SASLMechanism.prototype = {
                test: function () {
                    return !0
                },
                onStart: function (a) {
                    this._connection = a
                },
                onChallenge: function () {
                    throw new Error("You should implement challenge handling!")
                },
                onFailure: function () {
                    this._connection = null
                },
                onSuccess: function () {
                    this._connection = null
                }
            }, f.SASLAnonymous = function () {}, f.SASLAnonymous.prototype = new f.SASLMechanism("ANONYMOUS", !1, 10),
            f.SASLAnonymous.test = function (a) {
                return null === a.authcid
            }, f.Connection.prototype.mechanisms[f.SASLAnonymous.prototype.name] = f.SASLAnonymous, f.SASLPlain =
            function () {}, f.SASLPlain.prototype = new f.SASLMechanism("PLAIN", !0, 20), f.SASLPlain.test = function (
                a) {
                return null !== a.authcid
            }, f.SASLPlain.prototype.onChallenge = function (a) {
                var b = a.authzid;
                return b += "\x00", b += a.authcid, b += "\x00", b += a.pass
            }, f.Connection.prototype.mechanisms[f.SASLPlain.prototype.name] = f.SASLPlain, f.SASLSHA1 = function () {},
            f.SASLSHA1.prototype = new f.SASLMechanism("SCRAM-SHA-1", !0, 40), f.SASLSHA1.test = function (a) {
                return null !== a.authcid
            }, f.SASLSHA1.prototype.onChallenge = function (a, b, c) {
                var d = c || MD5.hexdigest(1234567890 * Math.random()),
                    e = "n=" + a.authcid;
                return e += ",r=", e += d, a._sasl_data.cnonce = d, a._sasl_data["client-first-message-bare"] = e, e =
                    "n,," + e, this.onChallenge = function (a, b) {
                        for (var c, d, e, f, g, h, i, j, k, l, m, n = "c=biws,", o = a._sasl_data[
                                    "client-first-message-bare"] + "," + b + ",", p = a._sasl_data.cnonce, q =
                                /([a-z]+)=([^,]+)(,|$)/; b.match(q);) {
                            var r = b.match(q);
                            switch (b = b.replace(r[0], ""), r[1]) {
                                case "r":
                                    c = r[2];
                                    break;
                                case "s":
                                    d = r[2];
                                    break;
                                case "i":
                                    e = r[2]
                            }
                        }
                        if (c.substr(0, p.length) !== p) return a._sasl_data = {}, a._sasl_failure_cb();
                        for (n += "r=" + c, o += n, d = Base64.decode(d), d += "\x00\x00\x00", f = h = core_hmac_sha1(
                                a.pass, d), i = 1; e > i; i++) {
                            for (g = core_hmac_sha1(a.pass, binb2str(h)), j = 0; 5 > j; j++) f[j] ^= g[j];
                            h = g
                        }
                        for (f = binb2str(f), k = core_hmac_sha1(f, "Client Key"), l = str_hmac_sha1(f, "Server Key"),
                            m = core_hmac_sha1(str_sha1(binb2str(k)), o), a._sasl_data["server-signature"] =
                            b64_hmac_sha1(l, o), j = 0; 5 > j; j++) k[j] ^= m[j];
                        return n += ",p=" + Base64.encode(binb2str(k))
                    }.bind(this), e
            }, f.Connection.prototype.mechanisms[f.SASLSHA1.prototype.name] = f.SASLSHA1, f.SASLMD5 = function () {}, f
            .SASLMD5.prototype = new f.SASLMechanism("DIGEST-MD5", !1, 30), f.SASLMD5.test = function (a) {
                return null !== a.authcid
            }, f.SASLMD5.prototype._quote = function (a) {
                return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
            }, f.SASLMD5.prototype.onChallenge = function (a, b, c) {
                for (var d, e = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/, f = c || MD5.hexdigest("" + 1234567890 * Math.random()),
                        g = "", h = null, i = "", j = ""; b.match(e);) switch (d = b.match(e), b = b.replace(d[0], ""),
                    d[2] = d[2].replace(/^"(.+)"$/, "$1"), d[1]) {
                    case "realm":
                        g = d[2];
                        break;
                    case "nonce":
                        i = d[2];
                        break;
                    case "qop":
                        j = d[2];
                        break;
                    case "host":
                        h = d[2]
                }
                var k = a.servtype + "/" + a.domain;
                null !== h && (k = k + "/" + h);
                var l = MD5.hash(a.authcid + ":" + g + ":" + this._connection.pass) + ":" + i + ":" + f,
                    m = "AUTHENTICATE:" + k,
                    n = "";
                return n += "charset=utf-8,", n += "username=" + this._quote(a.authcid) + ",", n += "realm=" + this._quote(
                        g) + ",", n += "nonce=" + this._quote(i) + ",", n += "nc=00000001,", n += "cnonce=" + this._quote(
                        f) + ",", n += "digest-uri=" + this._quote(k) + ",", n += "response=" + MD5.hexdigest(MD5.hexdigest(
                        l) + ":" + i + ":00000001:" + f + ":auth:" + MD5.hexdigest(m)) + ",", n += "qop=auth", this.onChallenge =
                    function () {
                        return ""
                    }.bind(this), n
            }, f.Connection.prototype.mechanisms[f.SASLMD5.prototype.name] = f.SASLMD5
    }(function () {
        window.Strophe = arguments[0], window.$build = arguments[1], window.$msg = arguments[2], window.$iq =
            arguments[3], window.$pres = arguments[4]
    }), Strophe.Request = function (a, b, c, d) {
        this.id = ++Strophe._requestId, this.xmlData = a, this.data = Strophe.serialize(a), this.origFunc = b, this.func =
            b, this.rid = c, this.date = 0 / 0, this.sends = d || 0, this.abort = !1, this.dead = null, this.age =
            function () {
                if (!this.date) return 0;
                var a = new Date;
                return (a - this.date) / 1e3
            }, this.timeDead = function () {
                if (!this.dead) return 0;
                var a = new Date;
                return (a - this.dead) / 1e3
            }, this.xhr = this._newXHR()
    }, Strophe.Request.prototype = {
        getResponse: function () {
            var a = null;
            if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
                if (a = this.xhr.responseXML.documentElement, "parsererror" == a.tagName) throw Strophe.error(
                        "invalid response received"), Strophe.error("responseText: " + this.xhr.responseText),
                    Strophe.error("responseXML: " + Strophe.serialize(this.xhr.responseXML)), "parsererror"
            } else this.xhr.responseText && (Strophe.error("invalid response received"), Strophe.error(
                "responseText: " + this.xhr.responseText), Strophe.error("responseXML: " + Strophe.serialize(
                this.xhr.responseXML)));
            return a
        },
        _newXHR: function () {
            var a = null;
            return window.XMLHttpRequest ? (a = new XMLHttpRequest, a.overrideMimeType && a.overrideMimeType(
                    "text/xml")) : window.ActiveXObject && (a = new ActiveXObject("Microsoft.XMLHTTP")), a.onreadystatechange =
                this.func.bind(null, this), a
        }
    }, Strophe.Bosh = function (a) {
        this._conn = a, this.rid = Math.floor(4294967295 * Math.random()), this.sid = null, this.hold = 1, this.wait =
            60, this.window = 5, this._requests = []
    }, Strophe.Bosh.prototype = {
        strip: null,
        _buildBody: function () {
            var a = $build("body", {
                rid: this.rid++,
                xmlns: Strophe.NS.HTTPBIND
            });
            return null !== this.sid && a.attrs({
                sid: this.sid
            }), a
        },
        _reset: function () {
            this.rid = Math.floor(4294967295 * Math.random()), this.sid = null
        },
        _connect: function (a, b, c) {
            this.wait = a || this.wait, this.hold = b || this.hold;
            var d = this._buildBody().attrs({
                to: this._conn.domain,
                "xml:lang": "en",
                wait: this.wait,
                hold: this.hold,
                content: "text/xml; charset=utf-8",
                ver: "1.6",
                "xmpp:version": "1.0",
                "xmlns:xmpp": Strophe.NS.BOSH
            });
            c && d.attrs({
                route: c
            });
            var e = this._conn._connect_cb;
            this._requests.push(new Strophe.Request(d.tree(), this._onRequestStateChange.bind(this, e.bind(this._conn)),
                d.tree().getAttribute("rid"))), this._throttledRequestHandler()
        },
        _attach: function (a, b, c, d, e, f, g) {
            this._conn.jid = a, this.sid = b, this.rid = c, this._conn.connect_callback = d, this._conn.domain =
                Strophe.getDomainFromJid(this._conn.jid), this._conn.authenticated = !0, this._conn.connected = !0,
                this.wait = e || this.wait, this.hold = f || this.hold, this.window = g || this.window, this._conn._changeConnectStatus(
                    Strophe.Status.ATTACHED, null)
        },
        _connect_cb: function (a) {
            var b, c, d = a.getAttribute("type");
            if (null !== d && "terminate" == d) return Strophe.error("BOSH-Connection failed: " + b), b = a.getAttribute(
                    "condition"), c = a.getElementsByTagName("conflict"), null !== b ? ("remote-stream-error" ==
                    b && c.length > 0 && (b = "conflict"), this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                        b)) : this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown"), this._conn._doDisconnect(),
                Strophe.Status.CONNFAIL;
            this.sid || (this.sid = a.getAttribute("sid"));
            var e = a.getAttribute("requests");
            e && (this.window = parseInt(e, 10));
            var f = a.getAttribute("hold");
            f && (this.hold = parseInt(f, 10));
            var g = a.getAttribute("wait");
            g && (this.wait = parseInt(g, 10))
        },
        _disconnect: function (a) {
            this._sendTerminate(a)
        },
        _doDisconnect: function () {
            this.sid = null, this.rid = Math.floor(4294967295 * Math.random())
        },
        _emptyQueue: function () {
            return 0 === this._requests.length
        },
        _hitError: function (a) {
            this.errors++, Strophe.warn("request errored, status: " + a + ", number of errors: " + this.errors),
                this.errors > 4 && this._onDisconnectTimeout()
        },
        _no_auth_received: function (a) {
            a = a ? a.bind(this._conn) : this._conn._connect_cb.bind(this._conn);
            var b = this._buildBody();
            this._requests.push(new Strophe.Request(b.tree(), this._onRequestStateChange.bind(this, a.bind(this._conn)),
                b.tree().getAttribute("rid"))), this._throttledRequestHandler()
        },
        _onDisconnectTimeout: function () {
            for (var a; this._requests.length > 0;) a = this._requests.pop(), a.abort = !0, a.xhr.abort(), a.xhr.onreadystatechange =
                function () {}
        },
        _onIdle: function () {
            var a = this._conn._data;
            if (this._conn.authenticated && 0 === this._requests.length && 0 === a.length && !this._conn.disconnecting &&
                (Strophe.info("no requests during idle cycle, sending blank request"), a.push(null)), this._requests
                .length < 2 && a.length > 0 && !this._conn.paused) {
                for (var b = this._buildBody(), c = 0; c < a.length; c++) null !== a[c] && ("restart" === a[c] ? b.attrs({
                    to: this._conn.domain,
                    "xml:lang": "en",
                    "xmpp:restart": "true",
                    "xmlns:xmpp": Strophe.NS.BOSH
                }) : b.cnode(a[c]).up());
                delete this._conn._data, this._conn._data = [], this._requests.push(new Strophe.Request(b.tree(),
                    this._onRequestStateChange.bind(this, this._conn._dataRecv.bind(this._conn)), b.tree().getAttribute(
                        "rid"))), this._processRequest(this._requests.length - 1)
            }
            if (this._requests.length > 0) {
                var d = this._requests[0].age();
                null !== this._requests[0].dead && this._requests[0].timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT *
                        this.wait) && this._throttledRequestHandler(), d > Math.floor(Strophe.TIMEOUT * this.wait) &&
                    (Strophe.warn("Request " + this._requests[0].id + " timed out, over " + Math.floor(Strophe.TIMEOUT *
                        this.wait) + " seconds since last activity"), this._throttledRequestHandler())
            }
        },
        _onRequestStateChange: function (a, b) {
            if (Strophe.debug("request id " + b.id + "." + b.sends + " state changed to " + b.xhr.readyState), b.abort)
                return b.abort = !1, void 0;
            var c;
            if (4 == b.xhr.readyState) {
                c = 0;
                try {
                    c = b.xhr.status
                } catch (d) {}
                if ("undefined" == typeof c && (c = 0), this.disconnecting && c >= 400) return this._hitError(c),
                    void 0;
                var e = this._requests[0] == b,
                    f = this._requests[1] == b;
                (c > 0 && 500 > c || b.sends > 5) && (this._removeRequest(b), Strophe.debug("request id " + b.id +
                    " should now be removed")), 200 == c ? ((f || e && this._requests.length > 0 && this._requests[
                            0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) && this._restartRequest(0),
                        Strophe.debug("request id " + b.id + "." + b.sends + " got 200"), a(b), this.errors = 0) :
                    (Strophe.error("request id " + b.id + "." + b.sends + " error " + c + " happened"), (0 === c ||
                        c >= 400 && 600 > c || c >= 12e3) && (this._hitError(c), c >= 400 && 500 > c && (this._conn
                        ._changeConnectStatus(Strophe.Status.DISCONNECTING, null), this._conn._doDisconnect()
                    ))), c > 0 && 500 > c || b.sends > 5 || this._throttledRequestHandler()
            }
        },
        _processRequest: function (a) {
            var b = this,
                c = this._requests[a],
                d = -1;
            try {
                4 == c.xhr.readyState && (d = c.xhr.status)
            } catch (e) {
                Strophe.error("caught an error in _requests[" + a + "], reqStatus: " + d)
            }
            if ("undefined" == typeof d && (d = -1), c.sends > this.maxRetries) return this._onDisconnectTimeout(),
                void 0;
            var f = c.age(),
                g = !isNaN(f) && f > Math.floor(Strophe.TIMEOUT * this.wait),
                h = null !== c.dead && c.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait),
                i = 4 == c.xhr.readyState && (1 > d || d >= 500);
            if ((g || h || i) && (h && Strophe.error("Request " + this._requests[a].id +
                        " timed out (secondary), restarting"), c.abort = !0, c.xhr.abort(), c.xhr.onreadystatechange =
                    function () {}, this._requests[a] = new Strophe.Request(c.xmlData, c.origFunc, c.rid, c.sends),
                    c = this._requests[a]), 0 === c.xhr.readyState) {
                Strophe.debug("request id " + c.id + "." + c.sends + " posting");
                try {
                    c.xhr.open("POST", this._conn.service, this._conn.options.sync ? !1 : !0)
                } catch (j) {
                    return Strophe.error("XHR open failed."), this._conn.connected || this._conn._changeConnectStatus(
                        Strophe.Status.CONNFAIL, "bad-service"), this._conn.disconnect(), void 0
                }
                var k = function () {
                    if (c.date = new Date, b._conn.options.customHeaders) {
                        var a = b._conn.options.customHeaders;
                        for (var d in a) a.hasOwnProperty(d) && c.xhr.setRequestHeader(d, a[d])
                    }
                    c.xhr.send(c.data)
                };
                if (c.sends > 1) {
                    var l = 1e3 * Math.min(Math.floor(Strophe.TIMEOUT * this.wait), Math.pow(c.sends, 3));
                    setTimeout(k, l)
                } else k();
                c.sends++, this._conn.xmlOutput !== Strophe.Connection.prototype.xmlOutput && (c.xmlData.nodeName ===
                        this.strip && c.xmlData.childNodes.length ? this._conn.xmlOutput(c.xmlData.childNodes[0]) :
                        this._conn.xmlOutput(c.xmlData)), this._conn.rawOutput !== Strophe.Connection.prototype.rawOutput &&
                    this._conn.rawOutput(c.data)
            } else Strophe.debug("_processRequest: " + (0 === a ? "first" : "second") +
                " request has readyState of " + c.xhr.readyState)
        },
        _removeRequest: function (a) {
            Strophe.debug("removing request");
            var b;
            for (b = this._requests.length - 1; b >= 0; b--) a == this._requests[b] && this._requests.splice(b, 1);
            a.xhr.onreadystatechange = function () {}, this._throttledRequestHandler()
        },
        _restartRequest: function (a) {
            var b = this._requests[a];
            null === b.dead && (b.dead = new Date), this._processRequest(a)
        },
        _reqToData: function (a) {
            try {
                return a.getResponse()
            } catch (b) {
                if ("parsererror" != b) throw b;
                this._conn.disconnect("strophe-parsererror")
            }
        },
        _sendTerminate: function (a) {
            Strophe.info("_sendTerminate was called");
            var b = this._buildBody().attrs({
                type: "terminate"
            });
            a && b.cnode(a.tree());
            var c = new Strophe.Request(b.tree(), this._onRequestStateChange.bind(this, this._conn._dataRecv.bind(
                this._conn)), b.tree().getAttribute("rid"));
            this._requests.push(c), this._throttledRequestHandler()
        },
        _send: function () {
            clearTimeout(this._conn._idleTimeout), this._throttledRequestHandler(), this._conn._idleTimeout =
                setTimeout(this._conn._onIdle.bind(this._conn), 100)
        },
        _sendRestart: function () {
            this._throttledRequestHandler(), clearTimeout(this._conn._idleTimeout)
        },
        _throttledRequestHandler: function () {
            this._requests ? Strophe.debug("_throttledRequestHandler called with " + this._requests.length +
                    " requests") : Strophe.debug("_throttledRequestHandler called with undefined requests"), this._requests &&
                0 !== this._requests.length && (this._requests.length > 0 && this._processRequest(0), this._requests
                    .length > 1 && Math.abs(this._requests[0].rid - this._requests[1].rid) < this.window && this._processRequest(
                        1))
        }
    }, Strophe.Websocket = function (a) {
        this._conn = a, this.strip = "stream:stream";
        var b = a.service;
        if (0 !== b.indexOf("ws:") && 0 !== b.indexOf("wss:")) {
            var c = "";
            c += "ws" === a.options.protocol && "https:" !== window.location.protocol ? "ws" : "wss", c += "://" +
                window.location.host, c += 0 !== b.indexOf("/") ? window.location.pathname + b : b, a.service = c
        }
    }, Strophe.Websocket.prototype = {
        _buildStream: function () {
            return $build("stream:stream", {
                to: this._conn.domain,
                xmlns: Strophe.NS.CLIENT,
                "xmlns:stream": Strophe.NS.STREAM,
                version: "1.0"
            })
        },
        _check_streamerror: function (a, b) {
            var c = a.getElementsByTagName("stream:error");
            if (0 === c.length) return !1;
            for (var d = c[0], e = "", f = "", g = "urn:ietf:params:xml:ns:xmpp-streams", h = 0; h < d.childNodes.length; h++) {
                var i = d.childNodes[h];
                if (i.getAttribute("xmlns") !== g) break;
                "text" === i.nodeName ? f = i.textContent : e = i.nodeName
            }
            var j = "WebSocket stream error: ";
            return j += e ? e : "unknown", f && (j += " - " + e), Strophe.error(j), this._conn._changeConnectStatus(
                b, e), this._conn._doDisconnect(), !0
        },
        _reset: function () {},
        _connect: function () {
            this._closeSocket(), this.socket = new WebSocket(this._conn.service, "xmpp"), this.socket.onopen = this
                ._onOpen.bind(this), this.socket.onerror = this._onError.bind(this), this.socket.onclose = this._onClose
                .bind(this), this.socket.onmessage = this._connect_cb_wrapper.bind(this)
        },
        _connect_cb: function (a) {
            var b = this._check_streamerror(a, Strophe.Status.CONNFAIL);
            return b ? Strophe.Status.CONNFAIL : void 0
        },
        _handleStreamStart: function (a) {
            var b = !1,
                c = a.getAttribute("xmlns");
            "string" != typeof c ? b = "Missing xmlns in stream:stream" : c !== Strophe.NS.CLIENT && (b =
                "Wrong xmlns in stream:stream: " + c);
            var d = a.namespaceURI;
            "string" != typeof d ? b = "Missing xmlns:stream in stream:stream" : d !== Strophe.NS.STREAM && (b =
                "Wrong xmlns:stream in stream:stream: " + d);
            var e = a.getAttribute("version");
            return "string" != typeof e ? b = "Missing version in stream:stream" : "1.0" !== e && (b =
                "Wrong version in stream:stream: " + e), b ? (this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                b), this._conn._doDisconnect(), !1) : !0
        },
        _connect_cb_wrapper: function (a) {
            if (0 === a.data.indexOf("<stream:stream ") || 0 === a.data.indexOf("<?xml")) {
                var b = a.data.replace(/^(<\?.*?\?>\s*)*/, "");
                if ("" === b) return;
                b = a.data.replace(/<stream:stream (.*[^\/])>/, "<stream:stream $1/>");
                var c = (new DOMParser).parseFromString(b, "text/xml").documentElement;
                this._conn.xmlInput(c), this._conn.rawInput(a.data), this._handleStreamStart(c) && (this._connect_cb(
                    c), this.streamStart = a.data.replace(/^<stream:(.*)\/>$/, "<stream:$1>"))
            } else {
                if ("</stream:stream>" === a.data) return this._conn.rawInput(a.data), this._conn.xmlInput(document
                    .createElement("stream:stream")), this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                    "Received closing stream"), this._conn._doDisconnect(), void 0;
                var d = this._streamWrap(a.data),
                    e = (new DOMParser).parseFromString(d, "text/xml").documentElement;
                this.socket.onmessage = this._onMessage.bind(this), this._conn._connect_cb(e, null, a.data)
            }
        },
        _disconnect: function (a) {
            if (this.socket.readyState !== WebSocket.CLOSED) {
                a && this._conn.send(a);
                var b = "</stream:stream>";
                this._conn.xmlOutput(document.createElement("stream:stream")), this._conn.rawOutput(b);
                try {
                    this.socket.send(b)
                } catch (c) {
                    Strophe.info("Couldn't send closing stream tag.")
                }
            }
            this._conn._doDisconnect()
        },
        _doDisconnect: function () {
            Strophe.info("WebSockets _doDisconnect was called"), this._closeSocket()
        },
        _streamWrap: function (a) {
            return this.streamStart + a + "</stream:stream>"
        },
        _closeSocket: function () {
            if (this.socket) try {
                this.socket.close()
            } catch (a) {}
            this.socket = null
        },
        _emptyQueue: function () {
            return !0
        },
        _onClose: function () {
            this._conn.connected && !this._conn.disconnecting ? (Strophe.error("Websocket closed unexcectedly"),
                this._conn._doDisconnect()) : Strophe.info("Websocket closed")
        },
        _no_auth_received: function (a) {
            Strophe.error("Server did not send any auth methods"), this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                "Server did not send any auth methods"), a && (a = a.bind(this._conn))(), this._conn._doDisconnect()
        },
        _onDisconnectTimeout: function () {},
        _onError: function (a) {
            Strophe.error("Websocket error " + a), this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                "The WebSocket connection could not be established was disconnected."), this._disconnect()
        },
        _onIdle: function () {
            var a = this._conn._data;
            if (a.length > 0 && !this._conn.paused) {
                for (var b = 0; b < a.length; b++)
                    if (null !== a[b]) {
                        var c, d;
                        "restart" === a[b] ? (c = this._buildStream(), d = this._removeClosingTag(c), c = c.tree()) :
                            (c = a[b], d = Strophe.serialize(c)), this._conn.xmlOutput(c), this._conn.rawOutput(d),
                            this.socket.send(d)
                    } this._conn._data = []
            }
        },
        _onMessage: function (a) {
            var b, c;
            if ("</stream:stream>" === a.data) {
                var d = "</stream:stream>";
                return this._conn.rawInput(d), this._conn.xmlInput(document.createElement("stream:stream")), this._conn
                    .disconnecting || this._conn._doDisconnect(), void 0
            }
            if (0 === a.data.search("<stream:stream ")) {
                if (c = a.data.replace(/<stream:stream (.*[^\/])>/, "<stream:stream $1/>"), b = (new DOMParser).parseFromString(
                        c, "text/xml").documentElement, !this._handleStreamStart(b)) return
            } else c = this._streamWrap(a.data), b = (new DOMParser).parseFromString(c, "text/xml").documentElement;
            if (!this._check_streamerror(b, Strophe.Status.ERROR)) return this._conn.disconnecting && "presence" ===
                b.firstChild.nodeName && "unavailable" === b.firstChild.getAttribute("type") ? (this._conn.xmlInput(
                    b), this._conn.rawInput(Strophe.serialize(b)), void 0) : (this._conn._dataRecv(b, a.data),
                    void 0)
        },
        _onOpen: function () {
            Strophe.info("Websocket open");
            var a = this._buildStream();
            this._conn.xmlOutput(a.tree());
            var b = this._removeClosingTag(a);
            this._conn.rawOutput(b), this.socket.send(b)
        },
        _removeClosingTag: function (a) {
            var b = Strophe.serialize(a);
            return b = b.replace(/<(stream:stream .*[^\/])\/>$/, "<$1>")
        },
        _reqToData: function (a) {
            return a
        },
        _send: function () {
            this._conn.flush()
        },
        _sendRestart: function () {
            clearTimeout(this._conn._idleTimeout), this._conn._onIdle.bind(this._conn)()
        }
    };