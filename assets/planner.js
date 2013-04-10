var ti = {
    stops: 0,
    routes: 0,
    specialDates: {},
    asciiStops: {},
    FLD_ID: 0,
    FLD_CITY: 1,
    FLD_AREA: 2,
    FLD_STREET: 3,
    FLD_NAME: 4,
    FLD_INFO: 5,
    FLD_LNG: 6,
    FLD_LAT: 7,
    FLD_STOPS: 8,
    FLD_DIRS: 9,
    RT_ROUTEID: 0,
    RT_ORDER: 1,
    RT_ROUTENUM: 2,
    RT_AUTHORITY: 3,
    RT_CITY: 4,
    RT_TRANSPORT: 5,
    RT_OPERATOR: 6,
    RT_VALIDITYPERIODS: 7,
    RT_SPECIALDATES: 8,
    RT_ROUTETAG: 9,
    RT_ROUTETYPE: 10,
    RT_COMMERCIAL: 11,
    RT_ROUTENAME: 12,
    RT_WEEKDAYS: 13,
    RT_ENTRY: 14,
    RT_STREETS: 15,
    RT_ROUTESTOPS: 16,
    accent_map: {
        "ą": "a",
        "ä": "a",
        "ā": "a",
        "č": "c",
        "ę": "e",
        "ė": "e",
        "į": "i",
        "ų": "u",
        "ū": "u",
        "ü": "u",
        "ž": "z",
        "ē": "e",
        "ģ": "g",
        "ī": "i",
        "ķ": "k",
        "ļ": "l",
        "ņ": "n",
        "ö": "o",
        "õ": "o",
        "š": "s",
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "e",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "й": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "x",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "shh",
        "ъ": !0,
        "ы": "y",
        "ь": !0,
        "э": "je",
        "ю": "ju",
        "я": "ja",
        "–": "-",
        "—": "-",
        "̶": "-",
        "­": "-",
        "˗": "-",
        "“": !0,
        "”": !0,
        "„": !0,
        "'": !0,
        "\"": !0
    },
    wordSeparators: "–—̶­˗“”„ _-.()'\""
};
ti.SERVER = 1,
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
},
ti.dateToMinutes = function (a) {
    return Math.floor(+a / 6e4) - a.getTimezoneOffset()
},
ti.dateToDays = function (a) {
    return Math.floor(ti.dateToMinutes(a) / 1440)
},
ti.printTime = function (a, b, c) {
    if (a < 0) return "";
    !b && b !== "" && (b = ":");
    var d = ~~a,
        e = ~~ (d / 60) % 24;
    d = d % 60;
    return (c && e < 10 ? c : "") + e + b + (d < 10 ? "0" : "") + d
},
ti.toMinutes = function (a) {
    var b = a.trim(),
        c = b.length,
        d = parseInt(b.substr(c - 2, 2), 10);
    return c > 2 ? d + parseInt(b.substr(0, c - 2), 10) * 60 : d * 60
},
ti.fDownloadUrl = function (a, b, c) {
    if (a && b && c) {
        var d;
        if (!window.XMLHttpRequest || window.location.protocol === "file:" && window.ActiveXObject) {
            try {
                d = new ActiveXObject("MSXML2.XMLHTTP.6.0")
            } catch (e) {}
            if (!d) try {
                d = new ActiveXObject("MSXML2.XMLHTTP")
            } catch (e) {}
            if (!d) try {
                d = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        } else d = new XMLHttpRequest;
        d.open(a, b, !0),
        d.onreadystatechange = function () {
            if (d.readyState == 4) if (d.status == 200 || d.status == 0) {
                var a = d.getResponseHeader("Content-Type");
                a && a.indexOf("xml") > -1 ? c(d.responseXML) : c(d.responseText)
            } else c("Error: " + d.status)
        };
        try {
            d.send(null)
        } catch (f) {
            c("Error: " + f.description)
        }
    }
},
ti.toAscii = function (a, b) {
    var c = a.toLowerCase(),
        d = c.split(""),
        e, f = ti.accent_map;
    for (var g = d.length; --g >= 0;)(e = f[d[g]]) ? (d[g] = e === !0 ? "" : e, c = !1) : b === !0 && d[g] === " " && (d[g] = "", c = !1);
    b === 2 && (c = d.join("").trim().replace(/\s+-/g, "-").replace(/-\s+/g, "-"));
    return c || d.join("")
},
ti.cloneObject = function (a) {
    var b = a instanceof Array ? [] : {};
    for (var c in a) a[c] && typeof a[c] == "object" ? b[c] = a[c].clone() : b[c] = a[c];
    return b
},
ti.naturalSort = function (a, b) {
    var c = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        d = /(^[ ]*|[ ]*$)/g,
        e = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        f = /^0x[0-9a-f]+$/i,
        g = /^0/,
        h = a.toString().replace(d, "") || "",
        i = b.toString().replace(d, "") || "",
        j = h.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000"),
        k = i.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000"),
        l = parseInt(h.match(f)) || j.length != 1 && h.match(e) && Date.parse(h),
        m = parseInt(i.match(f)) || l && i.match(e) && Date.parse(i) || null;
    if (m) {
        if (l < m) return -1;
        if (l > m) return 1
    }
    for (var n = 0, o = Math.max(j.length, k.length); n < o; n++) {
        oFxNcL = !(j[n] || "").match(g) && parseFloat(j[n]) || j[n] || 0,
        oFyNcL = !(k[n] || "").match(g) && parseFloat(k[n]) || k[n] || 0;
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return isNaN(oFxNcL) ? 1 : -1;
        typeof oFxNcL !== typeof oFyNcL && (oFxNcL += "", oFyNcL += "");
        if (oFxNcL < oFyNcL) return -1;
        if (oFxNcL > oFyNcL) return 1
    }
    return 0
},
ti.loadData = function () {
    ti.fDownloadUrl("get",   "C:/Users/Juris/Desktop/adt-bundle-windows-x86_64-20130219/workspace/RigasSatiksme/assets//routes.txt", ti.loadRoutes),
    ti.fDownloadUrl("get",   "C:/Users/Juris/Desktop/adt-bundle-windows-x86_64-20130219/workspace/RigasSatiksme/assets//stops.txt", ti.loadStops)
},
ti.loadStops = function (a) {
console.log(a);
    a = a.split("\n");
    var b = "",
        c = "",
        d = "",
        e = "",
        f = "",
        g = "",
        h = "",
        i = {},
        j = {},
        k = [],
        l = a.length,
        m = a[0].toUpperCase().split(";"),
        n = {};
    for (var o = m.length; --o >= 0;) n[m[o]] = o;
    n.ID = 0;
    for (var o = 1; o < l; o++) if (a[o].length > 1) {
        var p = a[o].split(";"),
            q = p[n.CITY];
        q && (c = q === "0" ? "" : q.trim());
        var r = b + ti.toAscii(p[n.ID], !0);
        if (q = p[n.AREA]) d = q === "0" ? "" : q.trim();
        if (q = p[n.STREET]) e = q === "0" ? "" : q.trim();
        if (q = p[n.NAME]) {
            f = q === "0" ? "" : q,
            g = ti.toAscii(q);
            var s = j[g];
            j[g] = s ? s + "," + r : r
        } else j[g] += "," + r;
        if (q = p[n.INFO]) h = q === "0" ? "" : q;
        b && (p[n.STOPS] = b + (p[n.STOPS] || "").replace(/,/g, "," + b));
        var t = {
            id: r,
            lat: +p[n.LAT] / 1e5,
            lng: +p[n.LNG] / 1e5,
            name: f,
            city: c,
            raw_data: [r, c, d, e, f, h, p[n.LNG], p[n.LAT], p[n.STOPS]].join(";")
        };
        ti.SERVER && (t.routes = [], t.neighbours = p[n.STOPS] ? p[n.STOPS].split(",") : []),
        i[r] = t,
        k.push(t)
    }
    ti.stops = i,
    ti.asciiStops = j,
    k.sort(function (a, b) {
        return a.lat < b.lat ? -1 : a.lat > b.lat ? 1 : 0
    });
    for (o = k.length; --o > 0;) if (k[o].city === "intercity") {
        var u = k[o].lat;
        for (var v = o - 1; --v >= 0;) {
            var w = u - k[v].lat;
            if (w > .015) break;
            var x = k[o].lng - k[v].lng;
            x > -.015 && x < .015 && (k[o].neighbours.push(k[v].id), k[v].neighbours.push(k[o].id))
        }
    }
    ti.routes && (ti.SERVER === !0 ? ti.loadRoutes(ti.routes) : window.setTimeout(function () {
        ti.loadRoutes(ti.routes)
    }, 10))
},
ti.loadRoutes = function (a) {
    if (typeof ti.stops !== "object") ti.routes = a;
    else {
        a = a.split("\n");
        var b = [],
            c = ti.stops,
            d = {},
            e = "",
            f = "",
            g = "",
            h = "",
            i = "",
            j = "",
            k = "",
            l = "",
            m = "",
            n = "",
            o = "",
            p = "",
            q = 0,
            r = a[0].toUpperCase().split(";"),
            s = {};
        for (var t = r.length; --t >= 0;) s[r[t]] = t;
        s.ROUTENUM = 0;
        var u = -1,
            v = a.length;
        for (var t = 1; t < v; t++) if (a[t].charAt(0) === "#") {
            var w = a[t].split("#"),
                x = null,
                y = null,
                z = new Date;
            w[1] !== "" && (x = new Date(w[1])),
            w[2] !== "" && (y = new Date(w[2]));
            if ((!x || x <= z) && (!y || y >= z)) {
                var A = {
                    comment: w[3]
                };
                w[4] && (A.departures = w[4]),
                w[5] && (A.weekdays = w[5]),
                w[6] && (A.directions = w[6]);
                var B = b[u];
                B.comments ? B.comments.push(A) : B.comments = [A]
            }
        } else if (a[t].length > 1) {
            var w = a[t].split(";"),
                C;
            if (C = w[s.AUTHORITY]) g = C === "0" ? "" : C;
            if (g === "SpecialDates") {
                var D = {},
                    E = w[s.VALIDITYPERIODS].split(","),
                    F = 0,
                    G = 0;
                for (var H = -1, I = E.length; ++H < I;) E[H] && (F = +E[H]),
                G += F,
                D[G] = !0;
                ti.specialDates[w[s.ROUTENUM]] = D;
                continue
            }++q,
            ++u;
            if (C = w[s.ROUTENUM]) e = C === "0" ? "" : C,
            q = 1;
            if (C = w[s.ROUTENAME]) f = C;
            if (C = w[s.CITY]) h = C === "0" ? "" : C,
            k = h + "_" + j,
            q = 1;
            if (C = w[s.TRANSPORT]) j = C === "0" ? "" : C,
            k = h + "_" + j,
            q = 1;
            k && (pg.cityTransportRoutes[h + "_" + j] = !0, k = "");
            if (C = w[s.OPERATOR]) l = C === "0" ? "" : C;
            if (C = w[s.VALIDITYPERIODS]) m = C === "0" ? "" : C;
            if (C = w[s.SPECIALDATES]) n = C === "0" ? "" : C;
            if (C = w[s.WEEKDAYS]) o = C === "0" ? "" : C;
            p = s.STREETS ? w[s.STREETS] : "";
            var J = ti.toAscii(w[s.ROUTESTOPS], !0).split(","),
                K = !1;
            for (var L = 0, M = J.length; L < M; ++L) {
                var N = J[L];
                N.charAt(0) === "e" ? (K || (K = []), K[L] = "1", N = N.substring(1), J[L] = N) : N.charAt(0) === "x" ? (K || (K = []), K[L] = "2", N = N.substring(1), J[L] = N) : K && (K[L] = "0"),
                i && (N = J[L] = i + N);
                var O = c[N];
                O ? (d[N] = !0, O.raw_data += ";" + u + ";" + L, (!0 || ti.SERVER) && O.routes.push(u, L)) : (J.splice(L, 1), --M, --L)
            }
            var P = [u, q, e, g, h, j, l, m, n, w[s.ROUTETAG], ti.toAscii(w[s.ROUTETYPE]), w[s.COMMERCIAL], f, o, K && K.join("") || "", p, J.join(";")].join(";");
            ++t,
            ti.SERVER === !0 ? b[u] = {
                id: u,
                authority: g,
                city: h,
                transport: j,
                num: e,
                name: f,
                stops: J,
                entry: K && K.join("") || "",
                specialDates: n.split(","),
                times: a[t],
                raw_data: P
            } : b[u] = {
                id: u,
                times: a[t],
                raw_data: P
            }
        }
        ti.routes = b;
        if (cfg.defaultCity !== "helsinki" && cfg.defaultCity !== "intercity") for (var N in c) d[N] || (c[N].name = "");
        pg.fCreateNavigation(),
        pg.fTabActivate()
    }
},
ti.fGetStopsByName = function (a) {
    if (typeof ti.stops !== "object") return [];
    var b = ti.toAscii(a),
        c = b.replace(/\W/g, ""),
        d = a.toLowerCase().replace(/\W/g, ""),
        e = [],
        f = ti.wordSeparators,
        g = ti.asciiStops;
    for (var h in g) {
        var i = h.indexOf(b);
        if (i !== -1 && (i === 0 || f.indexOf(h.charAt(i - 1)) >= 0)) {
            var j = g[h].split(",");
            for (var k = j.length; --k >= 0;) {
                var l = ti.fGetStopDetails(j[k]);
                l.name && (d === c || -1 !== l.name.toLowerCase().replace(/\W/g, "").indexOf(d)) && (l.indexOf = i, e.push(l))
            }
        }
    }
    var m = {};
    for (var k = 0; k < e.length; k++) {
        var l = e[k],
            n = parseInt(l.id, 10) || l.id,
            o = m[n];
        o ? o.id += "," + l.id : (m[n] = o = l, o.streetIsIncluded = {}),
        l.street && l.street !== "-" && !o.streetIsIncluded[l.street] && (o.streetIsIncluded[l.street] = !0, o.streets = (o.streets ? o.streets + ", " : "") + l.street)
    }
    var p = {},
        q = [];
    for (var r in m) {
        var l = m[r],
            n;
        cfg.defaultCity === "rostov" ? n = l.name + ";" + l.streets : n = l.name.replace(/\W/g, "") + ";" + l.streets;
        var o = p[n];
        o ? o.id += "," + l.id : (p[n] = l, q.push(l))
    }
    q.sort(function (a, b) {
        if (a.id.charAt(0) === "A" && b.id.charAt(0) !== "A") return -1;
        if (b.id.charAt(0) === "A" && a.id.charAt(0) !== "A") return 1;
        if (a.city === pg.city && b.city !== pg.city) return -1;
        if (a.city !== pg.city && b.city === pg.city) return 1;
        if (a.indexOf === 0 && b.indexOf !== 0) return -1;
        if (b.indexOf === 0 && a.indexOf !== 0) return 1;
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        if (a.area < b.area) return -1;
        if (b.area < a.area) return 1;
        if (a.streets < b.streets) return -1;
        if (b.streets < a.streets) return 1;
        return 0
    });
    return q
},
ti.fGetAnyStopDetails = function (a) {
    if (typeof ti.stops !== "object" || !a) return {};
    var b = typeof a == "string" ? a.split(",") : a,
        c, d, e, f;
    d = e = f = 0;
    for (var g = 0; g < b.length; ++g) {
        var h = ti.fGetStopDetails(b[g]);
        !c && h.id && (c = h),
        h && h.lat && h.lng && (d += h.lat, e += h.lng, ++f)
    }
    f && (c.latAvg = d / f, c.lngAvg = e / f);
    return c || {}
},
ti.fGetStopDetails = function (a) {
    if (typeof ti.stops !== "object" || !a) return {};
    var b = ti.stops[a],
        c;
    if (!b) {
        var d = a.indexOf(";");
        if (d > 0) {
            c = {
                id: a,
                name: i18n.mapPoint,
                neighbours: "",
                lat: parseFloat(a.substr(0, d)),
                lng: parseFloat(a.substr(d + 1)),
                raw_data: ""
            };
            return c
        }
        return {}
    }
    var e = b.raw_data.split(";");
    c = {
        id: e[ti.FLD_ID],
        city: e[ti.FLD_CITY],
        area: e[ti.FLD_AREA],
        street: e[ti.FLD_STREET],
        name: b.name,
        info: e[ti.FLD_INFO],
        neighbours: e[ti.FLD_STOPS],
        lng: ti.stops[a].lng,
        lat: ti.stops[a].lat,
        raw_data: b.raw_data
    };
    return c
},
ti.fGetTransfersAtStop = function (a, b, c) {
    var d = ti.stops,
        e = [a],
        f = parseInt(a, 10);
    if (f && "" + f !== "" + a && cfg.defaultCity !== "druskininkai") for (var g in d) f == parseInt(g, 10) && e.push(g);
    return ti.fGetRoutesAtStop(e, !1, b, c)
},
ti.fGetRoutesAtStop = function (a, b, c, d) {
    var e = d && d.dirType || "-",
        f = d && d.id || null,
        g = [],
        h = typeof a == "string" ? a.split(",") : a,
        i = e.split("-"),
        j = i[0],
        k = i[i.length - 1],
        l = j.charAt(0),
        m = k.charAt(0);
    for (var n = h.length; --n >= 0;) {
        var o = (ti.stops[h[n]] || {
            raw_data: ""
        }).raw_data.split(";"),
            p = o.length;
        for (var q = ti.FLD_DIRS; q < p; q += 2) {
            var r = ti.fGetRoutes(o[q]),
                s = +o[q + 1] < r.stops.length - 1;
            (s || c) && (b || !r.routeTag || r.id === f) && (r.stopId = h[n], e && (r.dirType.indexOf(e) < 0 && e.indexOf(r.dirType) < 0 && r.dirType.indexOf("-d") < 0 && j !== k && (r.dirType.indexOf(k) == 0 || r.dirType.indexOf(j) == r.dirType.length - 1 || r.dirType.indexOf("-" + m) < 0 && r.dirType.indexOf(j + "-") < 0 && r.dirType.indexOf(l + "-") < 0 && (r.dirType.indexOf("c") < 0 || r.dirType.indexOf("c") >= r.dirType.length - 2))) ? r.sortKey = "1" : r.sortKey = "0", r.sortKey = [cfg.transportOrder[r.transport] || "Z", ("000000" + parseInt(r.num, 10)).slice(-6), ("000000" + parseInt(r.num.substr(1), 10)).slice(-6), (r.num + "00000000000000000000").substr(0, 20), n === 0 ? "0" : "1", s ? "0" : "1", r.sortKey, ("000000" + r.order).slice(-6)].join(""), g.push(r))
        }
    }
    g.sort(function (a, b) {
        if (a.sortKey < b.sortKey) return -1;
        if (a.sortKey > b.sortKey) return 1;
        return 0
    });
    return g
},
ti.fGetRoutes = function (a, b, c, d, e, f) {
    var g = [],
        h = {},
        i = -1,
        j = 0,
        k, l, m, n, o = ti.wordSeparators;
    f && (f = ti.toAscii("" + f, 2)),
    isNaN(a) ? a && typeof a == "object" ? l = a : (k = ti.routes, i = 0, j = k.length, m = c && ti.toAscii(c, !0)) : l = ti.routes[+a];
    while (i < j) {
        i >= 0 && (l = k[i]);
        var p = l.raw_data.split(";"),
            q = p[ti.RT_CITY],
            r = p[ti.RT_TRANSPORT],
            s = p[ti.RT_ORDER],
            t = ti.toAscii(p[ti.RT_ROUTENUM], !0),
            u = p[ti.RT_ROUTETAG];
        if (i < 0 || a === q && (!b || b === r) && (!m || m === t && (!u || e === !0 || e === "0" && u.indexOf("0") < 0)) && (!d || d === p[ti.RT_ROUTETYPE])) {
            if (f) {
                var v = t.indexOf(f);
                v == 0 && t.length > f.length && "0123456789".indexOf(t.charAt(f.length)) >= 0 && (v = -1);
                if (v !== 0) {
                    var w = ti.toAscii(p[ti.RT_ROUTENAME], 2);
                    v = w.indexOf(f),
                    v > 0 && o.indexOf(w.charAt(v - 1)) < 0 && o.indexOf(f.charAt(0)) < 0 && (v = -1)
                }
                if (v >= 0) {
                    n = ti.toAscii(q + ";" + r + ";" + t + ";" + p[ti.RT_ROUTENAME], !0);
                    var x = h[n];
                    x && (v = -1, x.weekdays += p[ti.RT_WEEKDAYS])
                }
                if (v < 0 || u) {
                    ++i;
                    continue
                }
            } else if (i >= 0 && !m) {
                n = ti.toAscii(q + ";" + r + ";" + t, !0);
                var x = h[n];
                x && (x.weekdays += p[ti.RT_WEEKDAYS]);
                if (s !== "1") {
                    ++i;
                    continue
                }
            }
            var y = (p[ti.RT_VALIDITYPERIODS] || "").split(",");
            for (var z = 0; z < 7; ++z) y[z] = parseInt(y[z], 10) || 0,
            z > 0 && (y[z] += y[z - 1]);
            var A = [cfg.transportOrder[r] || "Z", ("000000" + parseInt(t, 10)).slice(-6), ("000000" + parseInt(t.substr(1), 10)).slice(-6), (t + "00000000000000000000").substr(0, 20), ("000000" + s).slice(-6)].join("");
            g.push({
                id: p[0],
                authority: p[ti.RT_AUTHORITY],
                city: q,
                transport: r,
                operator: p[ti.RT_OPERATOR],
                commercial: p[ti.RT_COMMERCIAL],
                num: p[ti.RT_ROUTENUM],
                name: p[ti.RT_ROUTENAME],
                routeTag: u,
                dirType: p[ti.RT_ROUTETYPE],
                weekdays: p[ti.RT_WEEKDAYS],
                validityPeriods: y,
                specialDates: p[ti.RT_SPECIALDATES],
                entry: p[ti.RT_ENTRY],
                streets: p[ti.RT_STREETS],
                stops: p.slice(ti.RT_ROUTESTOPS),
                times: l.times,
                order: s,
                sortKey: A
            }),
            n && (h[n] = g[g.length - 1])
        }++i
    }
    if (!j) return g[0];
    g.sort(function (a, b) {
        if (a.sortKey < b.sortKey) return -1;
        if (a.sortKey > b.sortKey) return 1;
        return ti.naturalSort(a.num, b.num) || (a.order < b.order ? -1 : a.order > b.order ? 1 : 0)
    });
    return g
},
ti.fOperatorDetails = function (a, b) {
    var c = cfg.operators[a || b];
    if (!c) return a;
    c = b && c[b] || c;
    return c[pg.language] || c.en || c
},
ti.explodeTimes = function (a) {
    var b = [],
        c = [],
        d = [],
        e = [],
        f, g, h = a.split(","),
        i, j, k = h.length,
        l = [],
        m = "+",
        n = "-";
    for (i = -1, f = 0, g = 0, j = 0; ++i < k;) {
        var o = h[i];
        if (o == "") break;
        var p = o.charAt(0);
        p === m ? l[i] = o.charAt(1) === "0" && o !== "+0" ? "2" : "1" : p === n && o.charAt(1) === "0" && (l[i] = o.charAt(2) === "0" ? "2" : "1"),
        j += +o,
        b[f++] = j
    }
    for (var q = l.length; --q >= 0;) l[q] || (l[q] = "0");
    for (var q = 0; ++i < k;) {
        var r = +h[i],
            s = h[++i];
        s === "" ? (s = f - q, k = 0) : s = +s;
        while (s-- > 0) d[q++] = r
    }--i;
    for (var q = 0, k = h.length; ++i < k;) {
        var r = +h[i],
            s = h[++i];
        s === "" ? (s = f - q, k = 0) : s = +s;
        while (s-- > 0) e[q++] = r
    }--i;
    for (var q = 0, k = h.length; ++i < k;) {
        var t = h[i],
            s = h[++i];
        s === "" ? (s = f - q, k = 0) : s = +s;
        while (s-- > 0) c[q++] = t
    }--i,
    g = 1;
    for (var q = f, u = f, v = 5, k = h.length; ++i < k;) {
        v += +h[i] - 5;
        var s = h[++i];
        s !== "" ? (s = +s, u -= s) : (s = u, u = 0);
        while (s-- > 0) b[q] = v + b[q - f],
        ++q;
        u <= 0 && (u = f, v = 5, ++g)
    }
    final_data = {
        workdays: c,
        times: b,
        tag: l.join(""),
        valid_from: d,
        valid_to: e
    };
	console.log(final_data);
    return final_data
},
ti.fGetDirTag = function (a) {
    if (a.indexOf("-d") >= 0) return "0";
    if (a.indexOf("2") >= 0) return "2";
    if (a.indexOf("3") >= 0) return "3";
    var b = a.search(/[\dcefghijklmnopqrstuvwyz]/);
    if (b > 0) {
        var c = a.indexOf("_");
        if (c < 0 || c > b) return "1"
    }
    return ""
};
var Hash = function () {
    var a = this,
        b = document.documentMode,
        c = a.history,
        d = a.location,
        e, f, g, h = function () {
            var a = d.href.indexOf("#");
            return a == -1 ? "" : decodeURI(d.href.substr(a + 1))
        },
        i = function () {
            var a = h();
            a != f && (f = a, e(a, !1), pg.timeOfActivity = (new Date).getTime())
        },
        j = function (a) {
            try {
                var b = g.contentWindow.document;
                b.open(),
                b.write("<html><body>" + a + "</body></html>"),
                b.close(),
                f = a
            } catch (c) {
                setTimeout(function () {
                    j(a)
                }, 10)
            }
        },
        k = function () {
            try {
                g.contentWindow.document
            } catch (a) {
                setTimeout(k, 10);
                return
            }
            j(f);
            var b = f;
            setInterval(function () {
                var a, c;
                try {
                    a = g.contentWindow.document.body.innerText,
                    a != b ? (b = a, d.hash = f = a, e(a, !0)) : (c = h(), c != f && j(c))
                } catch (i) {}
            }, 50)
        };
    return {
        getHash: h,
        init: function (d, j) {
            e || (e = d, f = h(), d(f, !0), a.ActiveXObject ? !b || b < 8 ? (g = j, k()) : a.attachEvent("onhashchange", i) : (c.navigationMode && (c.navigationMode = "compatible"), setInterval(i, 50)))
        },
        go: function (a) {
            a != f && (g ? j(a) : (d.hash = f = a, e(a, !1)))
        }
    }
}();
ti.findTrips = function (a) {
    a.no_just_walking = !1,
    a.reverseOriginal = a.reverse;
    if (a.attempt) {
        if (a.attempt == -1) {
            a.attempt = 1;
            if (a.results.length <= 0) {
                a.transport = a.transportOriginal,
                dijkstra(a, a.start_time, a.reverse);
                return
            }
        }
        if (a.attempt == 1 && a.results.length <= 0) {
            a.attempt = 2,
            a.reverse = -a.reverse,
            a.sort = "no sort",
            dijkstra(a, a.reverse == 1 ? 0 : 4320, a.reverse);
            return
        }
        if (a.attempt == 2 && a.results.length > 0) {
            a.attempt = 999,
            a.reverse = -a.reverse;
            var b;
            for (var c = 0; c < a.results.length; c++) a.reverse == 1 && (c == 0 || b < a.results[c].start_time) && (b = a.results[c].start_time),
            a.reverse == -1 && (c == 0 || b > a.results[c].finish_time) && (b = a.results[c].finish_time);
            dijkstra(a, b, a.reverse);
            return
        }
        if (a.attempt === 1) {
            var b = null;
            for (var c = 0; c < a.results.length; c++) {
                if (a.results[c].code == "W") continue;
                a.reverse == 1 && (!b || b > a.results[c].finish_time) && (b = a.results[c].finish_time),
                a.reverse == -1 && (!b || b < a.results[c].start_time) && (b = a.results[c].start_time)
            }
            a.results = ti.filterSearchResults(a.results, a.reverse),
            a.callback1 && a.callback1(ti.finalizeSearchResults(a.results.slice(0, 1))),
            a.attempt = 3,
            a.results0 = a.results,
            a.no_just_walking = !0;
            if (b) {
                dijkstra(a, b, -a.reverse, a.start_time);
                return
            }
            a.results = []
        }
        if (a.attempt == 3) {
            a.results.push.apply(a.results, a.results0),
            a.results = ti.filterSearchResults(a.results, a.reverse);
            if (!0 || a.results.length == 1 || a.results0.length >= a.results.length) if (a.results[0].legs.length != 1 || a.results[0].legs[0].route) {
                a.attempt = 4,
                a.results0 = a.results,
                a.no_just_walking = !0,
                dijkstra(a, a.reverse == 1 ? a.results[0].start_time + 1 : a.results[0].finish_time - 1, a.reverse);
                return
            }
        }
        a.attempt == 4 && a.results.push.apply(a.results, a.results0);
        var d = ti.finalizeSearchResults(ti.filterSearchResults(a.results, a.reverse));
        pg.optimalSearchRunning = !1;
        if (a.callback) a.callback(d, !0);
        else return d
    } else {
        if (pg.optimalSearchRunning) return;
        pg.optimalSearchRunning = !0,
        ti.timeStarted = +(new Date),
        a.attempt = 1;
        var e = a.date;
        e || (e = new Date, e = new Date(e.getFullYear(), e.getMonth(), e.getDate())),
        +e == +(new Date(2012, 3, 28)) ? a.weekday = 5 : +e == +(new Date(2012, 3, 30)) || +e == +(new Date(2012, 4, 1)) || +e == +(new Date(2012, 4, 4)) || +e == +(new Date(2012, 10, 19)) ? a.weekday = 7 : a.weekday = e.getDay() || 7,
        a.transportOriginal = ti.cloneObject(a.transport);
        if (a.transport.bus || a.transport.trol || a.transport.tram) a.transport.regionalbus && (a.transport.regionalbus = !1, a.attempt = -1),
        a.transport.commercialbus && (a.transport.commercialbus = !1, a.attempt = -1),
        a.transport.train && (a.transport.train = !1, a.attempt = -1);
        dijkstra(a, a.start_time, a.reverse)
    }
};

function dijkstra(a, b, c, d) {
    var e = !1,
        f = a.weekday,
        g = c == -1 ? a.finish_stops.split(",") : a.start_stops.split(","),
        h = c == -1 ? a.start_stops.split(",") : a.finish_stops.split(",");
    c || (e = !0, c = 1, f = a.weekdaydirect || "", a.direct_routes = []),
    a.results = [],
    b = b ? b * c : 0,
    d = d ? d * c : 7200;
    var i = b,
        j = c == 1 ? "1" : "2",
        k = c == 1 ? "2" : "1",
        l = a.route_nums ? "," + a.route_nums.toLowerCase().replace(/\s/g, "") + "," : "",
        m = a.lowFloor;
    l.indexOf(",z,") >= 0 && (m = !0, l = l.replace(/,z,/g, ""));
    var n = ti.dateToDays(a.date || new Date),
        o = a.max_changes || Infinity,
        p = a.change_time || 3,
        q = a.walk_speed_kmh || 4,
        r = a.walk_max || 2e3;
    r = e ? .05 : r / 1e3,
    r = r * r;
    var s = ti.stops,
        t = ti.routes,
        u = ti.specialDates,
        v = a.direct_routes || [],
        w = a.transport,
        x = a.commercial,
        y = a.routetypes,
        z = y != 1,
        A = a.area,
        B = 0,
        C = a.middle_stops;
    if (C) {
        B = 10;
        for (var D in C) {
            var E = s[D].routes;
            for (var F = 0; F < E.length; F += 2) t[E[F]].available = 10
        }
    }
    if (!0 || e) for (var G = t.length; --G >= 0;) {
        var H = ti.fGetRoutes(G),
            I = t[G];
        I.available = w && w[H.transport] === !1 || B && B !== I.available || l && l.indexOf("," + H.num.toLowerCase() + ",") < 0 || x && x != H.commercial || y && z != !_transport_data[H.transport].region || A && A != H.cities[0] ? 0 : 1
    }
    for (var J = v.length; --J >= 0;) v[J].available = 0;
    var K, L, M = {},
        N = {},
        O = {};
    for (var P = 1, Q = g; P <= 2; ++P) {
        for (var F = Q.length; --F >= 0;) if (Q[F].charAt(0) == "A") {
            var R = s[Q[F]];
            if (R) for (var J = R.neighbours.length; --J >= 0;) Q.push(R.neighbours[J]);
            Q[F] = "removed stop"
        } else if (Q[F].indexOf(";") > 0) {
            var S = Q[F].split(";");
            P == 1 ? K = {
                id: Q[F],
                lat: parseFloat(S[0]),
                lng: parseFloat(S[1]),
                neighbours: []
            } : (L = {
                id: Q[F],
                lat: parseFloat(S[0]),
                lng: parseFloat(S[1])
            }, N[L.id] = !0, K && (O[K.id] = !0))
        }
        Q = h
    }
    var T = [],
        U = {};
    U[i] = [];
    for (var D in s) {
        var R = s[D];
        R.time = Number.POSITIVE_INFINITY;
        if (!R.lat || !R.lng) continue;
        if (K) {
            var V = (K.lng - R.lng) * 58.1,
                W = (K.lat - R.lat) * 111.2,
                X = V * V + W * W;
            X <= r && K.neighbours.push(R.id)
        }
        if (L) {
            var V = (L.lng - R.lng) * 58.1,
                W = (L.lat - R.lat) * 111.2,
                X = V * V + W * W;
            X <= r && (O[R.id] = !0)
        }
    }
    for (var J = g.length; --J >= -1;) {
        var R = J >= 0 ? s[g[J]] : K;
        R && (R.prev_stop = !1, R.route = null, R.changes = 0, M[R.id] = !0, J == -1 && c == -1 && p ? (i -= p, U[i] = [K]) : U[i].push(R), R.time = i)
    }
    for (var J = h.length; --J >= 0;) {
        var D = h[J],
            R = s[D];
        R && (N[D] = !0)
    }
    for (var G in t) {
        var I = t[G];
        I.trip_start_time = Number.POSITIVE_INFINITY
    }
    a.finish_stops || (h = !1);
    var Y = +(new Date),
        Z = function () {
            for (var b = 0;;) {
                for (var g; !(g = U[i]) || !g.length;) if (++i > d) {
                    if (!T.length) {
                        a.results = [];
                        if (e) return [];
                        typeof window === "object" ? window.setTimeout(function () {
                            ti.findTrips(a)
                        }, 10) : ti.findTrips(a);
                        return
                    }
                    g = !1;
                    break
                }
                if (!g) break;
                g = g.pop();
                if (g.time < i || g.changes < 0) continue;
                if (++b == 3e3 && !e && typeof window === "object") {
                    +(new Date) - Y > 3e4 ? (a.results = [], window.setTimeout(function () {
                        ti.findTrips(a)
                    }, 10)) : window.setTimeout(Z, 100);
                    return
                }
                if (N[g.id]) {
                    d > i + 60 && (d = i + 60);
                    continue
                }
                var l = g.routes || [],
                    v = g.changes || 0;
                if (v <= o) for (var w = 0, x = l.length; w < x; w += 2) {
                    var y = t[l[w]];
                    if (e) {
                        if (y.available != 2 && h) continue;
                        a.direct_routes.push(y),
                        w + 2 < x && l[w + 2] == l[w] && (w += 2)
                    } else if (!y.available) continue;
                    if (typeof y.times === "string") {
                        var z = ti.fGetRoutes(y.id);
                        y.times = ti.explodeTimes(y.times),
                        y.stops = z.stops,
                        y.entry = z.entry,
                        y.specialDates = z.specialDates
                    }
                    var A = y.times,
                        B = l[w + 1],
                        D = y.stops || y.raw_data.split(";").slice(ti.RT_ROUTESTOPS);
                    if (c == 1 && B >= D.length - 1 || c == -1 && B == 0) continue;
                    var E;
                    if ((E = y.entry).charAt(B) == k) continue;
                    D[B] == D[B + c] && (B += c);
                    if (!A) continue;
                    var F = A.workdays,
                        G = A.valid_from,
                        H = A.valid_to,
                        I = A.tag,
                        J = A.times;
                    A = null;
                    var K = F.length,
                        P = K,
                        Q = f;
                    u = y.specialDates;
                    for (var R = 0, S = u.length; R < u.length; ++R) {
                        if (!u[R]) continue;
                        if (u[R++][n]) {
                            (Q = u[R]) === "*" && (Q = f);
                            break
                        }
                        u[R] === "*" && (Q = "0")
                    }
                    do {
                        var V = -1,
                            W = c == 1 ? Number.POSITIVE_INFINITY : 1,
                            X, $ = !e || !C;
                        for (var _ = P + B * K; P--;) if ((X = c * J[--_]) >= i && (X < W || e) && (!f || F[P].indexOf(Q) >= 0) && (!m || I.charAt(P) == "1") && (!H[P] || H[P] >= n) && G[P] <= n) {
                            V = _,
                            W = X;
                            if (e) {
                                if (!h) {
                                    var ba = {
                                        route: ti.fGetRoutes(y.id),
                                        start_time: W,
                                        trip_num: V % K
                                    };
                                    ba.route.stopId = g.id,
                                    T.push(ba),
                                    V = -2;
                                    continue
                                }
                                break
                            }
                        }
                        if (V < 0) {
                            if (V != -2 && !h) {
                                var ba = {
                                    route: ti.fGetRoutes(y.id),
                                    start_time: -1,
                                    trip_num: -1
                                };
                                ba.route.stopId = g.id,
                                T.push(ba)
                            }
                            break
                        }
                        var bb, bc = c * J[V % K];
                        e ? bb = D.length : bc < y.trip_start_time ? (bb = c == 1 ? D.length : 1, y.trip_start_time = bc, y.pos_max = c * B) : (bb = y.pos_max, bb > c * B && bc == y.trip_start_time && (y.pos_max = c * B)), K = c * K;
                        for (var bd = B; c * (bd += c) < bb;) {
                            V += K;
                            if (E.charAt(bd) == j) continue;
                            var be;
                            if ((be = J[V]) >= 0) {
                                be = c * be + p;
                                if (be > d) break;
                                if (be < i) continue;
                                var bf;
                                if (!(bf = s[D[bd]])) continue;
                                var bg;
                                e && !$ && ($ = bf.id in C);
                                if (N[bf.id] && $) {
                                    if (e) {
                                        y.available = 0;
                                        if (g.id.indexOf(";") < 0) for (var bh = 0; bh < bd; ++bh) {
                                            if (E.charAt(bh) == j || D[bh] == D[bh + 1]) continue;
                                            if (M[D[bh]] && J[V + K * (bh - bd)] >= 0) {
                                                g = s[D[bh]],
                                                W = J[V + K * (bh - bd)];
                                                break
                                            }
                                        }
                                        for (var bh = bb; --bh > bd;) {
                                            if (E.charAt(bh) == j || D[bh] == D[bh - 1]) continue;
                                            if (N[D[bh]] && J[V + K * (bh - bd)] >= 0) {
                                                bf = s[D[bh]],
                                                be = J[V + K * (bh - bd)];
                                                break
                                            }
                                        }
                                    }
                                    var ba = {
                                        legs: [{
                                            start_stop: g,
                                            start_time: c * W,
                                            finish_stop: bf,
                                            finish_time: c * (be - p),
                                            route: y,
                                            trip_num: V % K,
                                            start_pos: c >= 0 ? B : bd,
                                            finish_pos: c >= 0 ? bd : B
                                        }]
                                    };
                                    T.push(ba),
                                    bd = bb
                                } else {
                                    if (e) continue;
                                    if (be >= (bg = bf.time)) {
                                        if (bg < i) break;
                                        continue
                                    }
                                    if (y.available === 2) {
                                        bf.time = be,
                                        bf.changes = -1;
                                        continue
                                    }
                                    if (v < o) bf.route = y,
                                    bf.prev_stop = g,
                                    bf.prev_stop_start_time = W,
                                    bf.trip_num = V % K,
                                    bf.start_pos = c >= 0 ? B : bd,
                                    bf.finish_pos = c >= 0 ? bd : B;
                                    else continue
                                }
                                bf.time = be,
                                bf.changes = v + 1;
                                var bi = U[be];
                                bi ? bi[bi.length] = bf : U[be] = [bf]
                            }
                        }
                    } while (e);
                    J = null
                }
                if (e) continue;
                var bj = g.route || !g.prev_stop ? g : g.prev_stop,
                    bk = bj.lat,
                    bl = bj.lng,
                    bm = g.neighbours;
                for (var w = bm.length; --w >= -1;) {
                    var bf;
                    if (w < 0) if (O[bj.id]) bf = L;
                    else break;
                    else bf = s[bm[w]] || {
                        lat: 999,
                        lng: 999
                    };
                    var bn = (bl - bf.lng) * 58.1,
                        bo = (bk - bf.lat) * 111.2,
                        bp = bn * bn + bo * bo;
                    if (bp > r && (!g.name || bf.name !== g.name)) continue;
                    bp = Math.sqrt(bp);
                    var be = Math.round(bp / q * 60);
                    be += bj.time,
                    bj.route || !bj.prev_stop && c < 0 || (be += p),
                    be < i && (be = i);
                    if (be > d) continue;
                    if (N[bf.id]) {
                        var ba = {
                            legs: [{
                                start_stop: bj,
                                start_time: c * (bj.time - (bj.route ? p : 0)),
                                finish_stop: bf,
                                finish_time: c * (be - p),
                                route: null
                            }]
                        };
                        T.push(ba)
                    } else if (be < bf.time) bf.route = !1,
                    bf.prev_stop = bj,
                    bf.prev_stop_start_time = bj.time - (bj.route ? p : 0);
                    else continue;
                    bf.time = be,
                    bf.changes = v;
                    var bi = U[be];
                    bi ? bi[bi.length] = bf : U[be] = [bf]
                }
            }
            if (!h) {
                T.sort(function (a, b) {
                    if (a.route.sortKey < b.route.sortKey) return -1;
                    if (a.route.sortKey > b.route.sortKey) return 1;
                    if (a.start_time < b.start_time) return -1;
                    if (a.start_time > b.start_time) return 1;
                    return 0
                });
                return T
            }
            var bq = {},
                br = Number.POSITIVE_INFINITY;
            for (var w = T.length; --w >= 0;) {
                var ba = T[w],
                    bs = ba.legs[0].route ? ";" + ba.legs[0].route.id : "",
                    bt = ba.legs[ba.legs.length - 1];
                ba.finish_time = bt.finish_time,
                ba.walk_time = bt.route ? 0 : Math.abs(bt.finish_time - bt.start_time),
                be = ba.departure_time;
                for (var bu = ba.legs[0].start_stop; bu; bu = bu.prev_stop) {
                    if (!bu.prev_stop) break;
                    bt = {
                        start_stop: bu.prev_stop,
                        start_time: c * bu.prev_stop_start_time,
                        finish_stop: bu,
                        finish_time: c * (bu.time - p),
                        route: bu.route,
                        trip_num: bu.trip_num,
                        start_pos: bu.start_pos,
                        finish_pos: bu.finish_pos
                    },
                    bu.route ? bs = c == 1 ? ";" + bu.route.id + bs : bs + ";" + bu.route.id : (c < 0 && (!bu.prev_stop || !bu.prev_stop.prev_stop) && (bt.finish_time -= p), ba.walk_time += Math.abs(bt.finish_time - bt.start_time)),
                    ba.legs.splice(0, 0, bt)
                }
                if (c == -1) {
                    var bv = ba.legs[0];
                    if (!bv.route) {
                        var bw = ba.legs[1];
                        bw && bw.route ? (bv.start_time += bw.start_time - bv.finish_time, bv.finish_time = bw.start_time) : (bv.start_time -= p, bv.finish_time -= p)
                    }
                    ba.finish_time = ba.legs[0].start_time,
                    ba.legs = ba.legs.reverse();
                    for (var bx = -1, by = ba.legs.length; ++bx < by;) {
                        bt = ba.legs[bx];
                        var be = bt.start_time - bt.finish_time;
                        !bt.route && bx > 0 ? (bt.start_time = ba.legs[bx - 1].finish_time, bt.finish_time = bt.start_time + be) : (bt.finish_time = bt.start_time, bt.start_time -= be);
                        var g = bt.finish_stop;
                        bt.finish_stop = bt.start_stop,
                        bt.start_stop = g
                    }
                }
                var bv = ba.legs[0],
                    bw = ba.legs[1];
                if (!bv.route) if (bw && bw.route) bv.start_time += bw.start_time - p - bv.finish_time,
                bv.finish_time = bw.start_time - p;
                else if (a.no_just_walking) continue;
                ba.start_time = ba.legs[0].start_time,
                ba.travel_time = ba.finish_time - ba.start_time,
                e && (bs = ba.legs[0].start_time + "T" + bs, ba.code = bs),
                bs == "" && (bs = "W", br = ba.walk_time, ba.code = bs);
                var bz = bq[bs];
                if (!bz || c == 1 && ba.finish_time < bz.finish_time || c != 1 && ba.start_time > bz.start_time) bq[bs] = ba
            }
            if (e) a.results = T;
            else {
                var bA = [];
                for (var bs in bq) {
                    var ba = bq[bs],
                        bB = ba.code = bs + ";";
                    if (ba.walk_time >= br && bs != "W") continue;
                    for (var w = bA.length; --w >= 0;) if (bA[w].code.indexOf(bB) >= 0 || bB.indexOf(bA[w].code) >= 0) if (c == 1 && bA[w].finish_time <= ba.finish_time || c != 1 && bA[w].start_time >= ba.start_time) {
                        if (bA[w].walk_time + bA[w].travel_time <= ba.walk_time + ba.travel_time && bB.length >= bA[w].code.length) break
                    } else bA[w].walk_time + bA[w].travel_time >= ba.walk_time + ba.travel_time && bA.splice(w, 1);
                    w < 0 && bA.push(ba)
                }
                for (var w = bA.length; --w >= 0;) {
                    var ba = bA[w];
                    a.reverseOriginal == -1 ? ba.code = ba.code + "T" + ba.legs[ba.legs.length - 1].finish_time : ba.code = ba.legs[0].start_time + "T" + ba.code
                }
                a.results = bA,
                typeof window === "object" ? window.setTimeout(function () {
                    ti.findTrips(a)
                }, 10) : ti.findTrips(a)
            }
        };
    return Z()
}
ti.filterSearchResults = function (a, b) {
    for (var c = a.length; --c >= 0;) {
        if (a[c].remove) continue;
        for (j = a.length; --j >= 0;) {
            if (c === j) continue;
            a[j].code.indexOf(a[c].code) >= 0 && (a[j].remove = !0)
        }
    }
    var d = {};
    for (var c = a.length; --c >= 0;) {
        if (a[c].remove) continue;
        a[c].penalty_time = a[c].travel_time + 5 * a[c].legs.length;
        var e = d[a[c].code];
        if (!e || e.penalty_time > a[c].penalty_time) d[a[c].code] = a[c]
    }
    a = [];
    for (var f in d) a.push(d[f]);
    a.sort(function (a, b) {
        return a.penalty_time - b.penalty_time
    });
    var g = Number.POSITIVE_INFINITY;
    for (var c = a.length; --c >= 0;) a[c].ok = c < 3 ? 1 : 0,
    g > a[c].travel_time && (g = a[c].travel_time);
    a.sort(function (a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function (a, b) {
        return -(a.start_time - b.start_time)
    });
    for (var c = a.length; --c >= 0;) {
        var h = b == 1 ? a[c].finish_time - a[0].finish_time : a[0].start_time - a[c].start_time;
        h > a[0].travel_time / 2 + 60 ? a[c].ok = 0 : a[c].penalty_time > 2 * g && h > g && c >= 2 ? a[c].ok = 0 : a[c].walk_time > g ? a[c].ok = 0 : c < 3 && (a[c].ok = 1)
    }
    a.sort(function (a, b) {
        return b.ok - a.ok
    });
    for (var c = a.length; --c > 0;) {
        if (a[c].ok == 1) break;
        a.pop()
    }
    a.sort(function (a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function (a, b) {
        return -(a.start_time - b.start_time)
    });
    return a
},
ti.finalizeSearchResults = function (a) {
    var b = Array(a.length);
    for (var c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.legs;
        b[c] = {
            start_time: d.start_time,
            finish_time: d.finish_time,
            travel_time: d.travel_time,
            walk_time: d.walk_time,
            legs: [],
            code: d.code
        };
        for (var f = 0; f < e.length; f++) {
            var g = e[f],
                h = g.route ? g.route.times.workdays[g.trip_num] : "",
                i = g.start_stop && ti.fGetStopDetails(g.start_stop.id),
                j = g.finish_stop && ti.fGetStopDetails(g.finish_stop.id),
                k = {
                    trip_num: g.trip_num,
                    start_pos: g.start_pos,
                    finish_pos: g.finish_pos,
                    start_time: g.start_time,
                    finish_time: g.finish_time,
                    weekdays: h,
                    start_stop: i && {
                        id: i.id,
                        name: i.name,
                        street: i.street,
                        lat: i.lat,
                        lng: i.lng
                    },
                    finish_stop: j && {
                        id: j.id,
                        name: j.name,
                        street: j.street,
                        lat: j.lat,
                        lng: j.lng
                    }
                };
            g.route && (k.route = ti.fGetRoutes(g.route)),
            b[c].legs.push(k)
        }
    }
    return b
};

function $(a) {
    return document.getElementById(a)
}
var pg = {
    urlPrevious: "",
    urlLoaded: "",
    urlUnderSchedulePane: "",
    language: "",
    languageUnderSchedulePane: "",
    city: "",
    transport: "",
    schedule: null,
    optimalResults: [],
    cityTransportRoutes: {},
    showDeparturesWithNumbers: "",
    GMap: null,
    hashForMap: "",
    map: {},
    mapOverlays: [],
    mapStops: {},
    inputActive: null,
    stopsSuggested: [],
    stopsSuggestedForText: "",
    inputStop: "",
    inputStopText: "",
    inputStart: "",
    inputFinish: "",
    timerSuggestedStopsHide: 0,
    timerSuggestedStopsShow: 0,
    imagesFolder: "images/",
    translationFolder: "_translation/",
    browserVersion: 999
};
(function () {
    navigator.appVersion.indexOf("MSIE") >= 0 && (pg.browserVersion = parseFloat(navigator.appVersion.split("MSIE")[1])),
    typeof document.body.style.transform != "undefined" ? pg.transformCSS = "transform" : typeof document.body.style.MozTransform != "undefined" ? pg.transformCSS = "-moz-transform" : typeof document.body.style.webkitTransform != "undefined" ? pg.transformCSS = "-webkit-transform" : typeof document.body.style.msTransform != "undefined" ? pg.transformCSS = "-ms-transform" : typeof document.body.style.OTransform != "undefined" && (pg.transformCSS = "-o-transform");
    var a = ["stops.lt", "ridebus.org", "marsruty.ru"];
    for (var b = 0; b < a.length; ++b) if (window.location.host.indexOf(a[b]) >= 0) {
        pg.imagesFolder = "../images/",
        pg.translationFolder = "../_translation/";
        break
    }
    window.console || (window.console = {
        log: function () {}
    })
})(),
pg.bodyKeyDown = function (a, b) {
    b || (b = window.event ? window.event.keyCode : a.keyCode);
    if (b == 27) {
        var c = $("ulScheduleDirectionsList");
        c && c.style && c.style.display != "none" ? c.style.display = "none" : pg && pg.schedule && pg.aScheduleClose_Click(a)
    }
},
pg.fLang_Click = function (a) {
    var b = a && (a.target || a.srcElement);
    if (b && (b.tagName || "").toLowerCase() == "a") {
        if (b.innerHTML.length < 10) {
            pg.fUrlSet({
                schedule: pg.schedule,
                language: b.innerHTML
            });
            return pg.cancelEvent(a)
        }
    } else if (b && (b.tagName || "").toLowerCase() == "img") {
        pg.fUrlSet({
            schedule: pg.schedule,
            language: b.src.slice(-6, -4)
        });
        return pg.cancelEvent(a)
    }
    return pg.cancelEvent(a)
},
pg.divHeader_Click = function (a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    while (b && b.nodeName.toLowerCase() !== "a") b = b.parentNode;
    if (b && b.href && b.href.indexOf("http:") >= 0) return !0;
    pg.aScheduleClose_Click(a)
},
pg.aScheduleClose_Click = function (a) {
    a = a || window.event;
    if (pg.schedule) if (pg.urlUnderSchedulePane == "") pg.city = "nothing",
    pg.fUrlSet({
        city: pg.schedule.city,
        transport: pg.schedule.transport,
        schedule: null
    });
    else {
        var b = pg.fUrlParse(pg.urlUnderSchedulePane);
        b.language != pg.language && (b.language = pg.language, pg.city = "nothing"),
        b.schedule = null,
        pg.fUrlSet(b)
    }
    return pg.cancelEvent(a)
},
pg.fCreateLanguagesBar = function () {
    var a = $("divLang"),
        b = "",
        c = cfg.city.languages.split(",");
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        cfg.city.languageFlags ? b += "<a title=\"" + cfg.languages[e] + "\"><img src=\"" + e + ".png\" style=\"width:32px; height:26px; padding:0 5px;\"></a>" : (b += "<a title=\"" + cfg.languages[e] + "\" class=\"underlined\" href=\"#/" + e + "\">" + e + "</a>", cfg.city.navigation === "riga" && d % 3 === 2 ? b += " " : b += "&nbsp;")
    }
    a.innerHTML = b
},
pg.fTranslateStaticTexts = function () {
    if (cfg.defaultCity === "chelyabinsk" && (pg.language === "ru" || pg.language === "" && cfg.defaultLanguage === "ru")) {
        var a = i18n.lowFloorVehicles.lastIndexOf(",");
        a > 1 && (i18n.lowFloorVehicles = i18n.lowFloorVehicles.substr(0, a)),
        a = i18n.lowFloorDepartures.lastIndexOf(","),
        a > 80 && (i18n.lowFloorDepartures = i18n.lowFloorDepartures.substr(0, a) + "."),
        a = i18n.checkHandicapped.lastIndexOf(",")
    }
    cfg.defaultCity === "klaipeda" && (i18n.lowFloorDepartures = i18n.miniBusDepartures || ""),
    document.title = i18n.headerTitle,
    ($("header") || {}).innerHTML = (cfg.city.logoInHeader || "") + i18n.headerTitle,
    ($("spanYouAreHere") || {}).innerHTML = i18n.youAreHere,
    $("spanRoutesFromStop").innerHTML = i18n.departingRoutes + ":",
    $("spanPlan").innerHTML = cfg.city.navigation !== "top" ? i18n.tripPlanner : i18n.tripPlanner.replace("<br/>", " ").replace("<br>", " "),
    $("spanShowMap").innerHTML = i18n.showStopsMap,
    ($("aPlanShowMap") || {}).innerHTML = "<br/><br/>" + i18n.showStopsMap.toLowerCase(),
    ($("spanPrintSchedule") || {}).innerHTML = i18n.print,
    ($("spanReturnToRoutes") || {}).innerHTML = i18n.returnToRoutes,
    ($("spanShowDirectionsMap") || {}).innerHTML = i18n.showInMap,
    $("buttonSearch").value = i18n.searchRoute,
    $("inputReverseDepart").text = i18n.depart,
    $("inputReverseArrive").text = i18n.arrive,
    ($("earliestDeparture") || {}).innerHTML = i18n.earliestDeparture,
    ($("latestDeparture") || {}).innerHTML = i18n.latestDeparture,
    pg.specialDeparture && ($("inputTime").value = i18n[pg.customTime]),
    $("labelDepartureDate").innerHTML = i18n.departuresFor,
    $("inputDepartureDate-1").text = i18n.fromNow,
    $("inputDate0").text = $("inputDepartureDate0").text = i18n.today,
    $("inputDate1").text = $("inputDepartureDate1").text = i18n.tomorrow,
    ($("mapShowAllStops") || {}).title = i18n.mapShowAllStops;
    var b = new Date;
    for (var a = 2; a <= 6; a++) {
        var c = new Date(b.getFullYear(), b.getMonth(), b.getDate() + a);
        $("inputDate" + a).text = pg.formatDate(c),
        $("inputDepartureDate" + a).text = pg.formatDate(c)
    }
    $("labelHandicapped").title = i18n.checkHandicapped,
    $("aExtendedOptions").innerHTML = $("divContentPlannerOptionsExtended").style.display ? i18n.extendedOptions : i18n.extendedOptionsHide,
    $("labelRoutes").innerHTML = i18n.rideOnlyRoutes + ":",
    $("labelChangeTimeText").innerHTML = i18n.timeForConnection + ":",
    $("labelWalkMaxText").innerHTML = i18n.walkingMax + ":",
    $("labelWalkSpeedText").innerHTML = i18n.walkingSpeed + ":";
    var d = $("inputStop");
    d.title = i18n.typeStartStop,
    d.className == "empty" && (d.value = i18n.startStop),
    d = $("inputStart"),
    d.title = i18n.typeStartStop,
    d.className == "empty" && (d.value = i18n.startStop),
    d = $("inputFinish"),
    d.title = i18n.typeFinishStop,
    d.className == "empty" && (d.value = i18n.finishStop),
    d = $("inputRoutes"),
    d.title = i18n.typeRouteNameOrNumber,
    d.className == "empty" && (d.value = i18n.typeRouteNameOrNumber),
    $("labelInputRoutes").innerHTML = i18n.filter + ":"
},
pg.fGetCity = function (a) {
    for (var b in cfg.cities) if (cfg.cities[b].region === a) return b;
    return a
},
pg.fCreateNavigation = function () {
    var a = "<dt class=\"splitter\"></dt><!-- -->",
        b = pg.fGetCity(pg.city),
        c = 0;
    if (cfg.cities[b]) {
        var d = "",
            e = "",
            f = {};
        for (var g = 1; g <= 2; g++) {
            var h = pg.fUrlSet({
                city: b,
                transport: null,
                hashForMap: null
            }, !0);
            if (!cfg.cities[b].goHomeTimeout) {
                d += "<dt><a id=\"" + (g == 1 ? "city" : "region") + "\" href=\"#" + h + "\">" + (cfg.cities[b].logo || "") + "<span class=\"hover\">";
                var i = cfg.cities[b].name;
                i ? d += i[pg.language] || i.en || (g == 1 ? i18n.cityRoutes : i18n.regionRoutes) : d += g == 1 ? i18n.cityRoutes : i18n.regionRoutes,
                d += "</span></a></dt>"
            }
            for (var j = 0; j < cfg.cities[b].transport.length; j++) {
                var k = cfg.cities[b].transport[j],
                    l = " checked=\"checked\"";
                cfg.cities[b].transportPlannerUncheck && cfg.cities[b].transportPlannerUncheck[k] && (l = ""),
                h = pg.fUrlSet({
                    city: b,
                    transport: k,
                    hashForMap: null
                }, !0);
                var m = ((cfg.cities[b].transportTip || {})[k] || {})[pg.language];
                m && (m = " title=\"" + m + "\""),
                d += ("<dt><a id=\"" + b + "_{tr}\" href=\"#" + h + "\"" + m + "><span class=\"icon icon_{tr}\"></span><span class=\"hover\">" + i18n.transport[k] + "</span></a></dt>").replace(/{tr}/g, k),
                f[k] || (f[k] = !0, e += ("<label for=\"checkbox{tr}\"><input name=\"checkbox{tr}\" id=\"checkbox{tr}\" type=\"checkbox\" value=\"{tr}\"" + l + "/>").replace(/{tr}/g, k) + i18n.transport[k] + "</label> "),
                cfg.transportOrder[k] = ++c
            }
            b = cfg.cities[b].region;
            if (!b || !cfg.cities[b]) break;
            d += a
        }
        $("listTransports").innerHTML = d,
        $("divContentPlannerOptionsTransport").innerHTML = i18n.optionsTransport + ":" + e
    }
    cfg.transportOrder.commercialbus && cfg.transportOrder.regionalbus && (cfg.transportOrder.commercialbus = cfg.transportOrder.regionalbus)
},
pg.fLoadPage = function () {
    cfg.city.languages = cfg.city.languages || "en,ru",
    cfg.defaultLanguage = cfg.city.defaultLanguage || cfg.city.languages.split(",")[0],
    pg.showDeparturesWithNumbers !== !0 && pg.showDeparturesWithNumbers !== !1 && (pg.showDeparturesWithNumbers = cfg.city.showDeparturesWithNumbers, pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)),
    pg.fTranslateStaticTexts(),
    pg.fCreateLanguagesBar(),
    pg.loadedRoutesHash = null,
    pg.loadedDepartingRoutes = null,
    pg.loadedPlannerParams = null,
    pg.fCreateNavigation(),
    pg.fTabActivate();
    pg.schedule && pg.fScheduleLoad()
},
pg.fLoadLanguageScript = function (a) {
    $("inputTime").value == i18n.earliestDeparture ? pg.specialDeparture = "earliestDeparture" : $("inputTime").value == i18n.latestDeparture ? pg.specialDeparture = "latestDeparture" : pg.specialDeparture = null;
    var b = $("scriptLanguage");
    b && document.getElementsByTagName("head")[0].removeChild(b);
    var c = document.createElement("script");
    c.setAttribute("id", "scriptLanguage"),
    c.setAttribute("type", "text/javascript"),
    c.setAttribute("src", pg.translationFolder + a + ".js"),
    document.getElementsByTagName("head")[0].appendChild(c)
},
pg.reverseDirections_Click = function () {
    var a = pg.inputStart;
    pg.inputStart = pg.inputFinish,
    pg.inputFinish = a,
    a = $("inputStart").value,
    $("inputStart").value = $("inputFinish").value,
    $("inputFinish").value = a,
    pg.fLoadPlannerTab(!0)
},
pg.replaceHtml = function (a, b) {
    var c = a.nextSibling,
        d = a.parentNode;
    d.removeChild(a),
    a.innerHTML = b,
    c ? d.insertBefore(a, c) : d.appendChild(a)
},
pg.storeStyles = function () {
    pg.styles = {};
    var a = document.styleSheets || [];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b].rules || a[b].cssRules || [];
        for (var d = c.length; --d >= 0;) {
            var e = c[d].selectorText;
            e && (pg.styles[e] = c[d].style)
        }
    }
},
pg.getStyle = function (a) {
    return pg.styles[a]
},
pg.addCSS = function (a) {
    var b = document.createElement("style");
    b.type = "text/css",
    b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)),
    document.getElementsByTagName("head")[0].appendChild(b)
},
pg.toggleClass = function (a, b, c) {
    var d = " " + (a.className || "") + " ";
    c && d.indexOf(" " + b + " ") < 0 ? a.className = (d + b).trim() : !c && d.indexOf(" " + b + " ") >= 0 && (a.className = d.replace(" " + b + " ", "").trim())
},
pg.getOffsetTop = function (a) {
    var b = 0;
    do isNaN(a.offsetTop) || (b += a.offsetTop);
    while (a = a.offsetParent);
    return b
},
pg.cancelEvent = function (a) {
    a && (a.cancelBubble = !0, a.returnValue = !1, a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation());
    return !1
},
pg.formatDate = function (a, b) {
    typeof a == "number" && (a = new Date(a * 1e3 * 60 * 60 * 24));
    var c = a.getDate(),
        d = 1 + a.getMonth(),
        e = a.getFullYear();
    b = b || pg.language;
    if (b == "ru" || b == "ee" || b == "lv") e = c,
    c = a.getFullYear();
    return (e < 10 ? "0" : "") + e + (d < 10 ? "-0" : "-") + d + (c < 10 ? "-0" : "-") + c
},
pg.nonEmptyCount = function (a) {
    var b = 0;
    for (var c in a) a.hasOwnProperty(c) && a[c] && ++b;
    return b
},
pg.fUrlSetMap = function (a, b) {
    var c = pg.hashForMap || "map";
    a ? (typeof a != "object" && (a = {}), a.optimalRoute && (c = "map,,," + a.optimalRoute), a.maximized && c.indexOf(",max") < 0 && (c += ",max"), a.maximized === !1 && (c = c.replace(",max", "")), a.clusters && c.indexOf(",stops") < 0 && (c += ",stops"), a.clusters === !1 && (c = c.replace(",stops", ""))) : c = "";
    if (b) return c;
    pg.hashForMap = c,
    c = pg.fUrlSet(null, !0),
    c != Hash.getHash() ? Hash.go(c) : pg.fMapShow()
},
pg.fTabShowMap_Click = function (a) {
    pg.mapShowAllStops = !0,
    pg.hashForMap == "map" ? pg.fMapShow() : (pg.hashForMap = "map", pg.fUrlSet());
    return pg.cancelEvent(a)
},
pg.fTabDrive_Click = function (a) {
    pg.mapShowAllStops = !1,
    pg.hashForMap === "map" ? (pg.hashForMap = "map,drive", pg.fMapShow()) : (pg.hashForMap = "map,drive", pg.fUrlSet());
    return pg.cancelEvent(a)
},
pg.fMapHide = function () {
    pg.mapShowVehiclesInterval && (clearInterval(pg.mapShowVehiclesInterval), pg.mapShowVehiclesInterval = 0),
    document.body.className = pg.schedule ? "ScheduleDisplayed" : "",
    pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML)
},
pg.fMapShow = function () {
    var a = pg.hashForMap.split(","),
        b, c = !1;
    a[a.length - 1] == "max" && (b = !0, a.pop()),
    a[a.length - 1] == "drive" && (b = !0, a.pop()),
    a[a.length - 1] == "stops" && (c = !0, a.pop());
    var d = a[1] || cfg.defaultCity,
        e, f, g, h;
    pg.schedule ? (document.body.className = b ? "ScheduleMapDisplayedMax" : "ScheduleMapDisplayed", d = pg.schedule.city, e = pg.schedule.transport, f = pg.schedule.num, g = pg.schedule.dirType, h = pg.schedule.stopId) : (document.body.className = b ? "MapDisplayedMax" : "MapDisplayed", pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML), d = a[1] || cfg.defaultCity, e = a[2] || "", f = a[3] || "", g = a[4] || "", h = a[5] || "");
    if (pg.GMap) {
        if (typeof ti.stops !== "object" || typeof ti.routes !== "object") {
            setTimeout(pg.fMapShow, 200);
            return
        }
        var i, j;
        pg.mapShowVehiclesInterval || (pg.mapShowVehiclesInterval = setInterval(pg.fShowVehicles, 2e3), pg.fShowVehicles()),
        pg.transport == "plan" ? pg.stopLabelSelected.hide() : (h || pg.transport == "stop" && (h = pg.inputStop, pg.mapShowAllStops = !0), h ? (j = ti.fGetAnyStopDetails(h), pg.schedule ? w = pg.fUrlSet({
            schedule: {
                stopId: j.id
            }
        }, !0) : w = pg.fUrlSet({
            transport: "stop",
            stopId: j.id
        }, !0), typeof j.latAvg == "number" && typeof j.lngAvg == "number" ? (i = new GLatLng(j.latAvg, j.lngAvg), pg.stopLabelSelected.setContents(j.name, w), pg.stopLabelSelected.setPoint(i), pg.stopLabelSelected.show()) : pg.stopLabelSelected.hide()) : pg.stopLabelSelected.hide());
        if (f || pg.transport == "plan") {
            if (pg.map.city == d && pg.map.transport == e && pg.map.num == f && pg.map.dirType == g) {
                i && !pg.GMap.getBounds().containsLatLng(i) && pg.GMap.panTo(i);
                return
            }
            pg.map.city = d,
            pg.map.transport = e,
            pg.map.num = f,
            pg.map.dirType = g,
            pg.mapStops = {},
            pg.mapMarkerStart.hide(),
            pg.mapMarkerFinish.hide();
            while (pg.mapOverlays.length) pg.GMap.removeOverlay(pg.mapOverlays.pop());
            var k = 999,
                l = -999,
                m = 999,
                n = -999,
                o = "",
                p = "";
            if (pg.transport == "plan") {
                var q;
                if (f && pg.optimalResults && pg.optimalResults.length) {
                    s = f ? +f - 1 : 0,
                    s >= pg.optimalResults.length && (s = 0),
                    q = pg.optimalResults[s].legs || [],
                    p = i18n.option + " " + (s + 1);
                    for (var r = 0; r < pg.optimalResults.length; ++r) o += "<a href=\"#map,,," + (r + 1) + "\"><span class=\"icon icon_narrow" + (r == s ? " icon_checked" : "") + "\"></span>" + i18n.option + " " + (r + 1) + "</a>"
                } else pg.mapShowAllStops = !0,
                q = [{
                    start_stop: ti.fGetAnyStopDetails(pg.inputStart),
                    finish_stop: ti.fGetAnyStopDetails(pg.inputFinish)
                }];
                for (var s = q.length; s >= 0; s--) {
                    var t, j, u, v;
                    s == q.length ? (t = q[s - 1], j = t.finish_stop, v = t.finish_time, typeof j.lat == "number" && typeof j.lng == "number" && (pg.mapMarkerFinish.setPoint(new GLatLng(j.latAvg || j.lat, j.lngAvg || j.lng)), pg.mapMarkerFinish.show())) : (t = q[s], j = t.start_stop, typeof j.lat == "number" && typeof j.lng == "number" && (s == 0 && (pg.mapMarkerStart.setPoint(new GLatLng(j.latAvg || j.lat, j.lngAvg || j.lng)), pg.mapMarkerStart.show())), v = t.start_time);
                    if (!j || !j.id) continue;
                    k > j.lat && (k = j.lat),
                    m > j.lng && (m = j.lng),
                    l < j.lat && (l = j.lat),
                    n < j.lng && (n = j.lng);
                    var u = t.route || {},
                        w;
                    v = v && ti.printTime(v) + " " || "",
                    j.id.indexOf(";") < 0 && (t.route ? w = pg.fUrlSet({
                        schedule: {
                            city: u.city,
                            transport: u.transport,
                            num: u.num,
                            dirType: u.dirType,
                            stopId: j.id,
                            tripNum: (t.trip_num || -1) + 1
                        }
                    }, !0) : j.id ? w = "stop/" + j.id + "/map" : w = "map", pg.mapStops[j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: w,
                        img: u.transport || !f || s != 0 && s != q.length ? "stopOnRoute" : "stopGray",
                        name: v + j.name
                    });
                    if (!f || pg.optimalSearchRunning || !pg.optimalResults || !pg.optimalResults.length) continue;
                    j.id.indexOf(";") < 0 && s !== q.length && (u.transport || s == q.length - 1) && (pg.mapStops["transport" + j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: w,
                        img: "MarkerStart",
                        name: v + i18n.stop.toLowerCase() + "&nbsp;" + j.name,
                        transport: u.transport || "walk",
                        num: u.num || ""
                    });
                    if (s < q.length) if (u.transport) {
                        var x = {};
                        x[u.dirType] = !0,
                        pg.loadPolyline(u.city, u.transport, u.num, x, t.start_stop.lat, t.start_stop.lng, t.finish_stop.lat, t.finish_stop.lng);
                        if (!isNaN(t.start_pos) && !isNaN(t.finish_pos)) {
                            var y = typeof u.times === "string" ? ti.explodeTimes(u.times) : u.times,
                                z = y.workdays.length;
                            y = y.times;
                            for (var A = t.start_pos; ++A < t.finish_pos;) {
                                var j = ti.fGetStopDetails(u.stops[A]),
                                    w = pg.fUrlSet({
                                        schedule: {
                                            city: u.city,
                                            transport: u.transport,
                                            num: u.num,
                                            dirType: u.dirType,
                                            stopId: j.id,
                                            tripNum: (t.trip_num || -1) + 1
                                        }
                                    }, !0);
                                pg.mapStops[j.id] = {
                                    lat: j.lat,
                                    lng: j.lng,
                                    href: w,
                                    img: "stop",
                                    name: ti.printTime(y[t.trip_num + A * z]) + " " + j.name
                                }
                            }
                        }
                    } else if (pg.optimalResults) {
                        var B = new GPolyline([new GLatLng(t.start_stop.lat, t.start_stop.lng), new GLatLng(t.finish_stop.lat, t.finish_stop.lng)], "#000000", 5, .8);
                        pg.GMap.addOverlay(B),
                        pg.mapOverlays.push(B)
                    }
                }
            } else if (e) {
                pg.fShowVehicles();
                var C = ti.fGetRoutes(d, e, f, pg.schedule ? g : !1, !0),
                    x = {};
                if (C.length) {
                    var D = {};
                    for (var s = C.length; --s >= 0;) {
                        var u = C[s];
                        if (u.routeTag && u.dirType != g) continue;
                        x[u.dirType] = !g || u.dirType == g;
                        var E = "map," + u.city + "," + u.transport + "," + u.num + "," + u.dirType;
                        E = ti.toAscii(E, !0),
                        o = "<a href=\"#" + E + "\"><span class=\"icon icon_narrow" + (u.dirType == g ? " icon_checked" : "") + "\"></span>" + u.name + "</a>" + o;
                        if (!x[u.dirType]) continue;
                        for (var r = u.stops.length; --r >= 0;) {
                            j = ti.fGetStopDetails(u.stops[r]);
                            if (!j.lat || !j.lng) continue;
                            i = new GLatLng(j.lat, j.lng);
                            var w = pg.fUrlSet({
                                schedule: {
                                    city: u.city,
                                    transport: u.transport,
                                    num: u.num,
                                    dirType: u.dirType,
                                    stopId: j.id
                                }
                            }, !0);
                            pg.mapStops[j.id] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: w,
                                img: "stopOnRoute" + (!g && s ? "2" : ""),
                                name: j.name,
                                hidden: !0
                            },
                            D[j.name] = j.id,
                            k > j.lat && (k = j.lat),
                            m > j.lng && (m = j.lng),
                            l < j.lat && (l = j.lat),
                            n < j.lng && (n = j.lng),
                            (s == 0 || g) && (r == 0 || r == u.stops.length - 1) && (pg.mapStops[r == 0 ? "MarkerStart" : "MarkerFinish"] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: w,
                                img: r == 0 ? "MarkerStart" : "MarkerRed",
                                transport: e,
                                num: u.num,
                                name: (r == 0 ? i18n.stop.toLowerCase() + "&nbsp;" : "") + j.name
                            })
                        }
                    }
                    for (var F in D) pg.mapStops[D[F]].hidden = !1;
                    C.length > 1 && (E = "map," + u.city + "," + u.transport + "," + u.num, o = "<a href=\"#" + E + "\"><span class=\"icon icon_narrow" + (g ? "" : " icon_checked") + "\"></span>" + i18n.mapShowAllDirections + "</a>" + o),
                    p = "<img class=\"icon icon_narrow\" src=\"" + pg.imagesFolder + e + ".png\"/><span class=\"transfer" + e + "\">&nbsp;" + C[0].num + "</span>",
                    pg.loadPolyline(d, e, f, x)
                }
            }
            o ? (o = "<div style=\"float:left; height:17px;\"><a href=\"#\">" + p + "&nbsp;<span class=\"arrow-down\"></span><!--[if gte IE 7]><!--></a><!--<![endif]--><table class=\"dropdown\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>" + o + "<a id=\"mapShowStopsNames\" href=\"#map\" style=\"border-top:solid 1px #CCCCCC; margin-top:3px;\"><span class=\"icon icon_narrow stopsnames" + (pg.mapShowStopsNames ? " icon_checked" : "") + "\"></span>" + i18n.mapShowRouteStopsNames + "</a>" + (pg.schedule ? "" : "<a href=\"#map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapClearRoute + "</a>") + "</td></tr></table><!--[if lte IE 6]></a><![endif]--></div>", pg.$mapRoutesDropdown.innerHTML = o, pg.$mapRoutesDropdown.style.display = "") : pg.$mapRoutesDropdown.style.display = "none";
            var G = new GLatLngBounds(new GLatLng(k, m), new GLatLng(l, n)),
                H = pg.GMap.getBoundsZoomLevel(G);
            !cfg.firstZoom && pg.GMap.getBounds().containsBounds(G) && (H <= pg.GMap.getZoom() + 1 && (H = 0)),
            H && f ? (!cfg.firstZoom && H == pg.GMap.getZoom() + 1 && --H, cfg.firstZoom || H != pg.GMap.getZoom() ? pg.GMap.setCenter(G.getCenter(), H) : (pg.clusterManager.refresh(), pg.GMap.panTo(G.getCenter()))) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1,
            f && pg.clusterManager.hideMarkers()
        }
        if (!f) {
            pg.$mapRoutesDropdown.style.display = "none",
            pg.transport !== "plan" && (pg.mapMarkerStart.hide(), pg.mapMarkerFinish.hide(), pg.mapStops = {});
            while (pg.mapOverlays.length) pg.GMap.removeOverlay(pg.mapOverlays.pop());
            pg.map = {},
            pg.clusterManager.showMarkers(),
            h && j && j.id && j.id.indexOf(";") < 0 && typeof j.lat == "number" && typeof j.lng == "number" ? (pg.mapStops[h] = {
                lat: j.latAvg,
                lng: j.lngAvg,
                href: "stop/" + h,
                img: "stopOnRoute",
                name: j.name
            }, i = new GLatLng(j.lat, j.lng)) : i = null,
            i && !pg.GMap.getBounds().contains(i) ? cfg.firstZoom ? pg.GMap.setCenter(i) : pg.GMap.panTo(i) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1
        }
        setTimeout(function () {
            pg.GMap.checkResize()
        }, 100)
    } else if (pg.GMap === null) {
        pg.GMap = !1,
        $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + "</div>",
        $("preload").innerHTML = "<img src=\"" + pg.imagesFolder + "stop.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "cluster.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" />",
        cfg.firstZoom = !0;
        var I = String("." + window.location.host).split(".");
        I = I[I.length - 2] + "." + I[I.length - 1];
        var J = {
            "marsrutai.info": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQju4QTY177ZUqtiHd-QtBfjDmWeBTlPLYbFmcJsp5WVjYOKK7pxhVUGA",
            "stops.lt": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhSFiohBI8HDKcqZbSL9Blnl2N0P6xQIY1qdKcarEC3K5F1xlRHMvP2zsw",
            "stops.lt:8001": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRS_AytSF_iFi1JaeVfdJQz3w8fixRgzniHC4NzA78m-sHMkAVpJDQZPQ",
            "ridebus.org": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtcvUe0k-acda2umcpBWexvLqe7hTh8mwk-hjXKhW0nwqlbxJBU1WcfA",
            "marsrutai.lt": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQGlT3sMZUx4ELiDsrzQfh3fbE5khQ-VtHZgCpCq3rMgF4qEPGT_fD-Yw",
            "marsruty.ru": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTgEjs8cB5ffNAZuuA5xYZVRMEC_RSmeQpvGIjEAeBKsPO8v9KmXGeJdg",
            "marsruti.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTYmbSir-xnBQyBRKLAM3-zg8wZKhQcw0RK6Q3vOXEUtA6VwVQNO9N9hg",
            "rigassatiksme.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxSSbFstyt1J_asSxeW1gR9mGgEedBTJBpX_QLqdBGmCpjyPTj8ODBn8oQ",
            "tallinn.ee": "ABQIAAAAY5IFnRsLfXSjZuFUXBlQxxRmcNvZLfb84ObGC-suP-X_C6yqjBSwz9_gsefSDa8JbazmtMODjhF-SQ",
            "mupatp1.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtkVZq0yHlxGB1DBtmGoZBafDtWhSa1kgxMwsdoRr4QNd_h1rXefARdA",
            "muptu.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRG_nk74X5v3utE3dwuERMNPIBz4RRVfJ9UhZonHQJyljheWX-f5oBVhg"
        },
            K = J[I] || J["marsrutai.info"];
        cfg.defaultCity.indexOf("tallinn") >= 0 && (K = J["tallinn.ee"]);
        var L = document.createElement("script");
        L.type = "text/javascript",
        L.async = !0,
        pg.goHomeTimeout ? L.src = "map/gmaplt.js" : L.src = "http://maps.google.com/maps?file=api&v=2&hl=" + pg.language + "&sensor=false&async=2&callback=pg.GMapScriptLoaded&key=" + K;
        if (L.onprogress) {
            var M = "";
            L.onprogress = function () {
                M += ".",
                $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + M + "</div>"
            }
        }
        var N = function () {
            typeof GBrowserIsCompatible != "function" && ($("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.failedMap + "</div>", pg.GMap = null),
            L.onload = L.onreadystatechange = L.onerror = null
        };
        L.onreadystatechange = function () {
            (this.readyState == "complete" || this.readyState == "loaded") && setTimeout(N, 10)
        },
        L.onload = L.onerror = N,
        document.getElementsByTagName("head")[0].appendChild(L)
    } else pg.GMap !== !1 && pg.GMapScriptLoaded()
},
pg.GMapScriptLoaded = function () {
    if (!GBrowserIsCompatible()) {
        alert("Sorry, the Google Maps API is not compatible with this browser");
        return !1
    }
    if (typeof ti.stops !== "object" || typeof ti.routes !== "object") setTimeout(pg.GMapScriptLoaded, 200);
    else {
        pg.storeStyles(),
        pg.GMap = 0;
        if ((document.body.className || "").indexOf("Map") < 0) return;
        var a, b = cfg.cities[pg.city] || {};
        b.streetMap = b.streetMap || "GMaps";
        var c = {
            googleBarOptions: {
                style: "new"
            }
        };
        c.logoPassive = "true",
        c.suppressCopyright = "true";
        var d = pg.GMap = new GMap2($("divMap"), c);
        d.options = c.googleBarOptions;
        var e = new GMapType(G_PHYSICAL_MAP.getTileLayers(), G_PHYSICAL_MAP.getProjection(), i18n.physicalMap),
            f = new GMapType(G_SATELLITE_MAP.getTileLayers(), G_SATELLITE_MAP.getProjection(), i18n.satelliteMap),
            g = new GMapType(G_HYBRID_MAP.getTileLayers(), G_HYBRID_MAP.getProjection(), i18n.hybridMap);
        d.getMapTypes().length = 0;
        if (b.streetMap.indexOf("OSM") < 0) a = new GMapType(G_NORMAL_MAP.getTileLayers(), G_NORMAL_MAP.getProjection(), i18n.streetMap),
        d.addMapType(a),
        d.setMapType(a);
        else {
            var h = [new GTileLayer(new GCopyrightCollection("OpenStreetMap"), 0, 19)];
            h[0].getCopyright = function (a, b) {
                return {
                    prefix: "",
                    copyrightTexts: ["OpenStreetMap"]
                }
            },
            b.streetMap === "OSMlocal" ? h[0].getTileUrl = function (a, b) {
                return "osm/" + b + "/" + a.x + "/" + a.y + ".png"
            } : h[0].getTileUrl = function (a, b) {
                return "http://a.tile.openstreetmap.org/" + b + "/" + a.x + "/" + a.y + ".png"
            },
            a = new GMapType(h, G_NORMAL_MAP.getProjection(), i18n.streetMap),
            b.streetMap === "OSMlocal" && (a.getMinimumResolution = function () {
                return 10
            }, a.getMaximumResolution = function () {
                return 16
            }),
            d.addMapType(a),
            d.setMapType(a)
        }
        if (b.streetMap != "OSMlocal") {
            d.addMapType(e),
            d.addMapType(f),
            d.addMapType(g),
            d.addMapType(G_SATELLITE_3D_MAP);
            var j = new GHierarchicalMapTypeControl;
            j.addRelationship(f, g, null, !1),
            d.addControl(j, new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(55, 10)))
        }
        d.setCenter(new GLatLng(b.lat || 59.43923, b.lng || 24.7588), b.zoom || 12),
        d.enableDoubleClickZoom(),
        d.enableScrollWheelZoom(),
        d.enableContinuousZoom(),
        d.enablePinchToZoom();
        try {
            d.enableGoogleBar()
        } catch (k) {}
        d.addControl(new GLargeMapControl3D),
        d.addControl(new GScaleControl),
        pg.$mapShowAllStops = document.createElement("div"),
        pg.$mapShowAllStops.id = "divMapShowAllStops",
        pg.$mapShowAllStops.style.border = "solid 1px black",
        pg.$mapShowAllStops.style.height = "17px",
        pg.$mapShowAllStops.style.width = "17px",
        pg.$mapShowAllStops.innerHTML = "<div id=\"mapShowAllStops\" class=\"button icon_stops\" title=\"" + i18n.mapShowAllStops + "\"></div>",
        pg.$mapRoutesDropdown = document.createElement("div"),
        pg.$mapRoutesDropdown.className = "dropdown",
        b.streetMap === "OSMlocal" ? ((new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(82, 10))).apply(pg.$mapShowAllStops), (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(106, 10))).apply(pg.$mapRoutesDropdown)) : ((new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(332, 10))).apply(pg.$mapShowAllStops), (new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(356, 10))).apply(pg.$mapRoutesDropdown)),
        d.getContainer().appendChild(pg.$mapShowAllStops),
        pg.mapShowAllStops = !0,
        d.getContainer().appendChild(pg.$mapRoutesDropdown),
        pg.$mapMenu = document.createElement("div"),
        pg.$mapMenu.style.display = "none",
        pg.$mapMenu.className = "mapMenu",
        d.getContainer().appendChild(pg.$mapMenu);
        var l;
        GEvent.addDomListener(d.getContainer(), "contextmenu", function (a) {
            l = null,
            $("divSuggestedStops").style.display = "none",
            a || (a = window.event);
            var b = a && (a.target || a.srcElement);
            if (!b || b.id == "mapShowAllStops") return pg.cancelEvent(a);
            var c = b && (b.tagName || "").toLowerCase() || "";
            b && c !== "a" && c !== "img" && (b = b.parentNode, c = b && (b.tagName || "").toLowerCase() || "");
            var d = b && (c === "a" && b.href || c === "img" && b.id || "") || "";
            if (b && b.parentNode && (b.parentNode.tagName || "").toLowerCase() == "td") return pg.cancelEvent(a);
            if (d && d.indexOf("#") >= d.length - 1) return pg.cancelEvent(a);
            d ? l = b : l = {}
        }),
        GEvent.addDomListener(d.getContainer(), "click", function (a) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.inputSuggestedStops_Blur(),
            a = a || window.event;
            var b = a && (a.target || a.srcElement);
            if (b.id == "mapShowAllStops") {
                pg.mapShowAllStops = !pg.mapShowAllStops,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowStopsNames") {
                pg.mapShowStopsNames = !pg.mapShowStopsNames;
                var c = pg.$mapRoutesDropdown.innerHTML.replace("stopsnames icon_checked", "stopsnames");
                pg.$mapRoutesDropdown.innerHTML = pg.mapShowStopsNames ? c.replace("stopsnames", "stopsnames icon_checked") : c,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            var d = b && (b.tagName || "").toLowerCase() || "";
            b && d !== "a" && d !== "img" && (b = b.parentNode);
            var e = b && (d === "a" && b.href || d === "img" && b.id || "") || "";
            pg.$mapMenu && (pg.$mapMenu.style.display = "none");
            if (e.indexOf("#") < 0 || e.indexOf("#") >= e.length - 1) return pg.cancelEvent(a);
            var f = pg.fUrlParse(e);
            if (f.schedule && d !== "img") e = pg.fUrlSet({
                schedule: f.schedule
            });
            else if (f.transport == "stop" || f.schedule) {
                var g = f.schedule && f.schedule.stopId || f.inputStop,
                    h = ti.fGetAnyStopDetails(g);
                if ((b.className || "").toLowerCase().indexOf("cluster") < 0) if (d === "img") {
                    if (g) {
                        var c = [];
                        cfg.searchOnly || (f.schedule && f.schedule.stopId && c.push("<a href=\"" + e + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowTimetableFromStop + "</a>"), c.push("<a href=\"#stop/" + g + "/map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>"));
                        var i = pg.fUrlSet({
                            transport: "plan",
                            inputStart: g,
                            hashForMap: "map"
                        }, !0),
                            j = pg.fUrlSet({
                                transport: "plan",
                                inputFinish: g,
                                hashForMap: "map"
                            }, !0);
                        c.push("<a href=\"#" + i + "\"><span class=\"icon icon_stopGreen\"></span>" + (e ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                        c.push("<a href=\"#" + j + "\"><span class=\"icon icon_stopRed\"></span>" + (e ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                        c.push("<a href=\"#stop/" + g + "/map\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>"),
                        pg.$mapMenu.innerHTML = c.join(""),
                        pg.$mapMenu.style.display = "block";
                        var k = pg.$mapMenu.offsetTop;
                        if (k - pg.$mapMenu.offsetHeight > 0) {
                            k -= pg.$mapMenu.offsetHeight;
                            var l = pg.$mapMenu.offsetLeft;
                            (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(l, k))).apply(pg.$mapMenu)
                        }
                    }
                } else f.transport == "stop" && (pg.hashForMap = "map", pg.map = {}, pg.fTabStop_Click(f.inputStop));
                else h.latAvg && h.lngAvg && pg.GMap.zoomIn(new GLatLng(h.latAvg, h.lngAvg), !1, !0)
            } else f.transport == "plan" ? (pg.hashForMap = f.hashForMap, pg.map = {}, pg.optimalResults = null, pg.fTabPlanner_Click(f.inputStart, f.inputFinish)) : (pg.hashForMap = f.hashForMap, pg.hashForMap == "map" && (pg.mapShowAllStops = !0), pg.fUrlSet(pg));
            return pg.cancelEvent(a)
        }),
        GEvent.addListener(d, "click", function (a, b, c) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.$mapMenu.style.display = "none";
            var e = d.fromLatLngToContainerPixel(b || c);
            (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(e.x, e.y))).apply(pg.$mapMenu)
        }),
        GEvent.addDomListener(d.getContainer(), "mouseout", function (a) {
            a || (a = window.event);
            var b = a && (a.target || a.srcElement),
                c = d.getContainer();
            b && b == c,
            b = a.relatedTarget || a.toElement;
            while (b && (b.tagName || "").toLowerCase() != "body") {
                if (b === c) return;
                b = b.parentNode
            }
            pg.$mapMenu.style.display = "none"
        }),
        GEvent.addListener(d, "movestart", function (a) {
            pg.$mapMenu.style.display = "none"
        }),
        GEvent.addListener(d, "zoomstart", function (a) {
            pg.$mapMenu.style.display = "none"
        }),
        GEvent.addListener(d, "singlerightclick", function (a, b, c) {
            if (l) {
                var d = a.x,
                    e = a.y,
                    f = [],
                    g, h, i = (l.tagName || "").toLowerCase() || "",
                    j = i === "a" && l.href || i === "img" && l.id || "";
                if (j) {
                    f.push();
                    var k = pg.fUrlParse(j);
                    if (k.schedule && k.schedule.stopId) {
                        f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowTimetableFromStop + "</a>"),
                        g = pg.fUrlSet({
                            transport: "plan",
                            inputStart: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0),
                        h = pg.fUrlSet({
                            transport: "plan",
                            inputFinish: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        var j = pg.fUrlSet({
                            inputStop: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        f.push("<a href=\"#stop/" + k.schedule.stopId + "/map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>")
                    } else(l.className || "").toLowerCase().indexOf("cluster") < 0 ? cfg.searchOnly || f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>") : f.push("<a href=\"" + j + "\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>"),
                    g = pg.fUrlSet({
                        transport: "plan",
                        inputStart: k.inputStop,
                        hashForMap: "map"
                    }, !0),
                    h = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: k.inputStop,
                        hashForMap: "map"
                    }, !0)
                } else {
                    var m = pg.GMap.fromContainerPixelToLatLng(new GPoint(d, e)),
                        n = ("" + m.lat()).substring(0, 8) + ";" + ("" + m.lng()).substring(0, 8);
                    g = pg.fUrlSet({
                        transport: "plan",
                        inputStart: n
                    }, !0),
                    h = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: n
                    }, !0)
                }
                f.push("<a href=\"#" + g + "\"><span class=\"icon icon_stopGreen\"></span>" + (j ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                f.push("<a href=\"#" + h + "\"><span class=\"icon icon_stopRed\"></span>" + (j ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                pg.$mapMenu.innerHTML = f.join(""),
                pg.$mapMenu.style.display = "block",
                d - pg.$mapMenu.offsetWidth > 0 && (d -= pg.$mapMenu.offsetWidth),
                e - pg.$mapMenu.offsetHeight > 0 && (e -= pg.$mapMenu.offsetHeight),
                (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(d, e))).apply(pg.$mapMenu)
            }
        }),
        ELabel = function (a, b, c, d, e) {
            this.point = a,
            this.html = b,
            this.href = c,
            this.classname = d || "",
            this.pixelOffset = e || new GSize(0, 0),
            this.hidden = !1
        },
        ELabel.prototype = new GOverlay,
        ELabel.prototype.initialize = function (a) {
            var b = document.createElement("a");
            b.style.position = "absolute",
            b.className = this.classname,
            b.href = "#" + this.href,
            b.innerHTML = this.html,
            a.getPane(G_MAP_MARKER_PANE).appendChild(b),
            this.map_ = a,
            this.div_ = b;
            if (this.overlap) {
                var c = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = c
            }
            this.hidden && this.hide()
        },
        ELabel.prototype.remove = function () {
            GEvent.clearInstanceListeners(this.div_),
            this.div_.parentNode.removeChild(this.div_)
        },
        ELabel.prototype.copy = function () {
            return new ELabel(this.point, this.html, this.href, this.classname, this.pixelOffset, this.percentOpacity, this.overlap)
        },
        ELabel.prototype.redraw = function (a) {
            if (this.point && this.point.x && this.point.y) {
                var b = this.map_.fromLatLngToDivPixel(this.point),
                    c = parseInt(this.div_.clientHeight);
                this.div_.style.left = b.x + this.pixelOffset.width + "px",
                this.div_.style.top = b.y + this.pixelOffset.height - c + "px"
            }
        },
        ELabel.prototype.show = function () {
            this.div_ && (this.div_.style.display = "", this.redraw()),
            this.hidden = !1
        },
        ELabel.prototype.hide = function () {
            this.hidden || (this.div_ && (this.div_.style.display = "none"), this.hidden = !0)
        },
        ELabel.prototype.isHidden = function () {
            return this.hidden
        },
        ELabel.prototype.supportsHide = function () {
            return !0
        },
        ELabel.prototype.setContents = function (a, b) {
            this.div_.innerHTML = this.html = a,
            typeof b != "undefined" && (this.div_.href = "#" + b)
        },
        ELabel.prototype.setPoint = function (a) {
            this.point = a;
            if (this.overlap) {
                var b = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = b
            }
            this.redraw(!0)
        },
        ELabel.prototype.getPoint = ELabel.prototype.getLatLng = function () {
            return this.point
        },
        ClusterManager = function (a, b) {
            this._map = a,
            this._mapMarkers = [],
            this._markersHidden = !1,
            this._div = document.createElement("div"),
            this._div.id = "ClusterManagerStopsPane",
            this._map.getPane(G_MAP_MARKER_PANE).appendChild(this._div),
            b = b || {},
            this.fitMapToMarkers = b.fitMapToMarkers === !0,
            b.fitMapMaxZoom && (this.fitMapMaxZoom = b.fitMapMaxZoom),
            this.clusterMaxZoom = b.clusterMaxZoom ? b.clusterMaxZoom : 99,
            b.markers && this.addMarkers(b.markers),
            this.borderPadding = b.borderPadding || 256,
            this.intersectPadding = b.intersectPadding || 0,
            this.clusteringEnabled = b.clusteringEnabled !== !1,
            this.ZoomLevel = this._map.getZoom(),
            GEvent.bind(this._map, "moveend", this, this._moveEnd),
            GEvent.bind(this._map, "zoomend", this, this._zoomEnd),
            GEvent.bind(this._map, "maptypechanged", this, this._zoomEnd)
        },
        ClusterManager.prototype._zoomEnd = function () {
            pg.$mapVehicles.innerHTML = "",
            this.refresh(),
            pg.fShowVehicles()
        },
        ClusterManager.prototype._moveEnd = function () {
            this.ZoomLevel != this._map.getZoom() ? this.ZoomLevel = this._map.getZoom() : this.refresh()
        },
        ClusterManager.prototype.addMarkers = function (a) {
            if (this.fitMapToMarkers) {
                var b = new GLatLngBounds;
                for (var c = a.length; --c >= 0;) b.extend(a[c].getLatLng());
                var d = this._map.getBoundsZoomLevel(b);
                this.fitMapMaxZoom && d > this.fitMapMaxZoom && (d = this.fitMapMaxZoom),
                this._map.setCenter(b.getCenter(), d)
            }
            var e = this._map.getCurrentMapType().getProjection();
            for (var c = a.length; --c >= 0;) {
                var f = a[c],
                    g = e.fromLatLngToPixel(new GLatLng(f.lat, f.lng), 19);
                f._x = g.x,
                f._y = g.y
            }
            a.sort(function (a, b) {
                return b._y - a._y
            }),
            this._mapMarkers = a
        },
        ClusterManager.prototype.refresh = function () {
            pg.timeOfActivity = (new Date).getTime(),
            pg.toggleClass($("mapShowAllStops"), "pressed", pg.mapShowAllStops),
            pg.$mapMenu.style.display = "none";
            var a = this._markersHidden ? "Gray" : "",
                b = this._map,
                c = b.getCurrentMapType().getProjection(),
                d = [],
                e = c.fromLatLngToPixel(this._map.getBounds().getSouthWest(), 19),
                f = c.fromLatLngToPixel(this._map.getBounds().getNorthEast(), 19),
                g = this._mapMarkers,
                h = pg.mapStops,
                j, k, l, m = {};
            if (pg.mapShowAllStops) {
                var n = 19 - this._map.getZoom(),
                    o = 1 << n + 8,
                    p = e.x - o,
                    q = f.x + o,
                    r = e.y + o,
                    s = f.y - o,
                    t = this._map.getZoom(),
                    u = this.clusteringEnabled && t <= this.clusterMaxZoom;
                o = 1 << n + 3 + (t < 12 ? 1 : 0);
                for (i = g.length; --i >= 0;) {
                    j = g[i];
                    var v = j._y;
                    if (v < s || !j.name) continue;
                    if (v > r) break;
                    var w = j._x;
                    if (w >= p && w <= q) {
                        if (j.id in m) continue;
                        var x = w,
                            y = v,
                            z = [],
                            A = [],
                            B = 1;
                        if (u) {
                            var C = h[j.id],
                                D = j.name;
                            D.length > 1 && !isNaN(D.charAt(D.length - 1)) && (D = D.substring(0, D.length - 1));
                            for (var E = i; --E >= 0;) {
                                var F = g[E];
                                if (F._y > y + o) break;
                                if (F.id in m) continue;
                                F._x <= x + o && F._x >= x - o && (t < 12 || F.name.indexOf(D) == 0) && (C = C || h[F.id], m[F.id] = !0, z.push(F.id), A.push(F.name), B++, x = (w += F._x) / B, y = (v += F._y) / B)
                            }
                        }
                        if (B > 1) {
                            z.push(j.id),
                            k = c.fromPixelToLatLng(new GPoint(x, y), 19),
                            k = this._map.fromLatLngToDivPixel(k);
                            var G, H = 1;
                            if (t < 12) {
                                A.sort();
                                for (var E = A.length; --E > 0;) A[E] != A[E - 1] && ++H;
                                G = H > 2 ? i18n.totalStops + ": " + H : (A[0] + (H > 1 ? ", " + A[A.length - 1] : "")).replace(/"/g, "")
                            } else G = D.replace(/"/g, "");
                            (!C || H > 1) && d.push((H > 1 ? "<img class=\"cluster\" style=\"width:9px; height:9px;" : "<img style=\"width:8px; height:8px;") + " cursor:pointer; vertical-align:top; position:absolute;  top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" id=\"#stop/" + z.join(",") + "/map\" src=\"" + pg.imagesFolder + (H > 1 ? "cluster" : "stop") + a + ".png\" title=\"" + (window.chrome ? "" : G) + "\" />")
                        } else C || (k = b.fromLatLngToDivPixel(new GLatLng(j.lat, j.lng)), d.push("<img id=\"#stop/" + j.id + "/map\" style=\"cursor:pointer; vertical-align:top; position:absolute; width:8px; height:8px; top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" src=\"" + pg.imagesFolder + "stop" + a + ".png\" title=\"" + (window.chrome ? "" : (j.name || "").replace(/"/g, "")) + "\" />"))
                    }
                }
            }
            pg.mapLabelHeight = pg.mapLabelHeight || parseInt(pg.stopLabelSelected.div_.clientHeight, 10);
            for (l in h) {
                j = h[l],
                k = b.fromLatLngToDivPixel(new GLatLng(j.lat, j.lng));
                var G = pg.browserVersion < 7 && (!pg.mapShowStopsNames || j.hidden) ? " title=\"" + j.name.replace(/"/g, "") + "\"" : "";
                j.img == "MarkerStart" ? d.push("<a href=\"#" + j.href + "\" class=\"label_transport\" style=\"position:absolute; left:" + (k.x + 11) + "px; top:" + (k.y - 29) + "px;\"><img src=\"" + pg.imagesFolder + j.transport + ".png\" />" + (j.num && "<span class=\"transfer" + j.transport + "\" style=\"line-height:18px; vertical-align:top;\">" + j.num + "</span>&nbsp;") + "<span" + (pg.mapShowStopsNames ? "" : " class=\"unhide\"") + " style=\"line-height:18px; vertical-align:top; border:0 none;\">" + j.name + "&nbsp;</span></a><img src=\"" + pg.imagesFolder + "tip.png\" style=\"position:absolute; z-index:105; left:" + (k.x + 4) + "px; top:" + (k.y - 11) + "px;\" />") : j.img == "MarkerRed" ? d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 6) + "px; top:" + (k.y - 20) + "px;\">") : (j.img || "").indexOf("stopOnRoute") < 0 ? j.img && d.push("<a class=\"mapStop\" href=\"#" + j.href + "/map\" style=\"position:absolute; left:" + (k.x - 4) + "px; top:" + (k.y - 4) + "px;\">") : d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 5) + "px; top:" + (k.y - 5) + "px;\">"),
                j.img != "MarkerStart" && (d.push("<img id=\"#" + j.href + "/map\" src=\"" + pg.imagesFolder + j.img + ".png\"" + G + " style=\"vertical-align:top;\" /></a>"), G || d.push("<a href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x + 4) + "px; top:" + (k.y - 4 - pg.mapLabelHeight) + "px;\" class=\"mapStopName" + (pg.mapShowStopsNames && !j.hidden ? "" : "Hidden") + "\">" + j.name + "</a>"))
            }
            this._div.innerHTML = d.join("")
        },
        ClusterManager.prototype.removeMarkers = function () {
            this._div.innerHTML = "",
            this._mapMarkers = []
        },
        ClusterManager.prototype.hideMarkers = function () {
            this._markersHidden || (this._markersHidden = !0, this.refresh())
        },
        ClusterManager.prototype.showMarkers = function () {
            this._markersHidden !== !1 && (this._markersHidden = !1, this.refresh())
        },
        pg.splitEncodedPolyline = function (a, b, c, d, e, f) {
            var g = a.length,
                h = 0,
                i = [],
                j = 0,
                k = 0,
                l = Number.POSITIVE_INFINITY,
                m, n, o = 0,
                p = 0,
                q = 0;
            c *= 1e5,
            e *= 1e5,
            d *= 1e5,
            f *= 1e5;
            while (h < g) {
                var r, s = 0,
                    t = 0;
                do r = a.charCodeAt(h++) - 63,
                t |= (r & 31) << s,
                s += 5;
                while (r >= 32);
                var u = t & 1 ? ~ (t >> 1) : t >> 1;
                j += u,
                s = 0,
                t = 0;
                do r = a.charCodeAt(h++) - 63,
                t |= (r & 31) << s,
                s += 5;
                while (r >= 32);
                var v = t & 1 ? ~ (t >> 1) : t >> 1;
                k += v,
                m = (j - c) * (j - c) + (k - d) * (k - d),
                l > m && (l = m, o = p = q, n = Number.POSITIVE_INFINITY),
                m = (j - e) * (j - e) + (k - f) * (k - f),
                n > m && (n = m, p = q),
                i[q++] = j,
                i[q++] = k
            }
            var w = 0,
                x = 0,
                y = [];
            h = o;
            while (h <= p) j = i[h++],
            k = i[h++],
            y.push(pg.encodeNumber(j - w), pg.encodeNumber(k - x)),
            w = j,
            x = k;
            o /= 2,
            p /= 2;
            var z = "R" + (o < p ? b.substring(o + 1, p) + "R" : "");
            return {
                points: y.join(""),
                levels: z
            }
        },
        pg.encodeNumber = function (a) {
            a = a << 1,
            a < 0 && (a = ~a);
            var b = "";
            while (a >= 32) b += String.fromCharCode((32 | a & 31) + 63),
            a >>= 5;
            b += String.fromCharCode(a + 63);
            return b
        },
        pg.loadPolyline = function (a, b, c, d, e, f, g, h) {
            var i = cfg.city.datadir + "/" + ti.toAscii([a, b, c].join("_"), !0) + ".txt";
            ti.fDownloadUrl("get", i, function (a) {
                a.indexOf("\r\n") < 0 ? a = a.split("\n") : a = a.split("\r\n");
                var c = pg.getStyle("." + b),
                    i = .8;
                for (var j = 2; j < a.length; j += 3) {
                    if (!d[a[j - 2]]) continue;
                    var k = {
                        points: a[j - 1],
                        levels: a[j]
                    };
                    e && f && (k = pg.splitEncodedPolyline(k.points, k.levels, e, f, g, h)),
                    k.color = c && c.backgroundColor || "#0000FF",
                    k.opacity = i,
                    i = .6,
                    k.weight = 5,
                    k.zoomFactor = 2,
                    k.numLevels = 20;
                    var l = GPolyline.fromEncoded(k);
                    pg.GMap.addOverlay(l),
                    pg.mapOverlays.push(l)
                }
            })
        },
        pg.stopLabelSelected = new ELabel(new GLatLng(b.lat, b.lng), cfg.defaultCity, "map", "mapStopSelected", new GSize(4, -4)),
        pg.GMap.addOverlay(pg.stopLabelSelected),
        pg.mapLabelHeight = parseInt(pg.stopLabelSelected.div_.clientHeight, 10),
        pg.stopLabelSelected.hide();
        var m = new GIcon;
        m.image = pg.imagesFolder + "MarkerStart.png";
        var n = new GIcon;
        n.image = pg.imagesFolder + "MarkerFinish.png",
        m.shadow = n.shadow = "",
        m.iconSize = n.iconSize = new GSize(20, 34),
        m.shadowSize = n.shadowSize = new GSize(0, 0),
        m.iconAnchor = n.iconAnchor = new GPoint(10, 34),
        m.infoWindowAnchor = n.infoWindowAnchor = new GPoint(9, 2),
        m.dragCrossImage = n.dragCrossImage = pg.imagesFolder + "empty.png",
        m.dragCrossSize = n.dragCrossSize = GSize(1, 1),
        m.maxHeight = n.maxHeight = 0,
        pg.mapMarkerStart = new GMarker(new GLatLng(0, 0), {
            icon: m,
            title: i18n.mapDragToChangeStart,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function (a, b) {
                return 104
            }
        }),
        pg.mapMarkerFinish = new GMarker(new GLatLng(0, 0), {
            icon: n,
            title: i18n.mapDragToChangeFinish,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function (a, b) {
                return 104
            }
        }),
        pg.GMap.addOverlay(pg.mapMarkerStart),
        pg.mapMarkerStart.hide(),
        pg.GMap.addOverlay(pg.mapMarkerFinish),
        pg.mapMarkerFinish.hide(),
        GEvent.addListener(pg.mapMarkerStart, "dragend", function () {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerStart.getPoint(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(c, pg.inputFinish)
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragend", function () {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerFinish.getPoint(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(pg.inputStart, c)
        }),
        GEvent.addListener(pg.mapMarkerStart, "dragstart", function () {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, setTimeout(function () {
                pg.clusterManager.refresh()
            }, 100))
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragstart", function () {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, pg.clusterManager.refresh())
        });

        function o(a) {
            var b = pg.GMap.getCurrentMapType().getProjection(),
                c = b.fromLatLngToPixel(a, 19),
                d = 19 - pg.GMap.getZoom(),
                e = 1 << d + 2,
                f = c.x - e,
                g = c.x + e,
                h = c.y - e,
                j = c.y + e,
                k = pg.clusterManager._mapMarkers,
                l = [];
            for (i = k.length; --i >= 0;) {
                marker = k[i];
                var m = marker._x,
                    n = marker._y;
                if (n > j) break;
                n >= h && m >= f && m <= g && l.push(marker.id)
            }
            return l
        }
        var p = [],
            q = ti.stops;
        for (var r in q) p.push(q[r]);
        pg.clusterManager = new ClusterManager(d, {
            markers: p,
            clusterMaxZoom: 14
        }),
        pg.$mapVehicles = document.createElement("div"),
        d.getPane(G_MAP_MARKER_PANE).appendChild(pg.$mapVehicles),
        pg.fMapShow()
    }
},
pg.divMapHide_Click = function () {
    pg.fMapHide(),
    pg.hashForMap = "",
    pg.fUrlSet()
},
pg.divMapMaximize_Click = function (a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !0
    }),
    b && (pg.GMap.checkResize(), pg.GMap.setCenter(b, pg.GMap.getZoom()));
    return pg.cancelEvent(a)
},
pg.divMapRestore_Click = function (a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !1
    }),
    b && (pg.GMap.checkResize(), pg.GMap.setCenter(b, pg.GMap.getZoom()));
    return pg.cancelEvent(a)
},
pg.fShowVehicles = function () {
    cfg.city.urlGPS && ti.fDownloadUrl("GET", cfg.city.urlGPS + "?" + +(new Date), pg.fProcessGPSData)
},
pg.fProcessGPSData = function (a) {
    var b = pg.GMap.getZoom() >= 14;
    a = a.split("\n");
    var c = [],
        d = "," + pg.hashForMap + ",",
        e = pg.transport || pg.schedule && pg.schedule.transport,
        f = pg.schedule && pg.schedule.num || "",
        g = cfg.city.courseOrigin || 0,
        h = cfg.city.courseCounterClockwise ? -1 : 1;
    for (var i = a.length; i--;) {
        var j = a[i].split(",");
        if (j.length >= 4) {
            var k = j[1],
                l = ti.toAscii(k),
                m = j[0] == "1" ? "trol" : j[0] == "3" ? "tram" : "bus";
            if (pg.hashForMap === "map") {
                if (e && m !== e) continue;
                if (f && k !== f) continue
            } else if (d.indexOf("," + m + "," + l + ",") < 0) continue;
            var n, o;
            if (cfg.defaultCity === "rostov" || cfg.defaultCity === "liepaja") n = +j[2] / 1e6,
            o = +j[3] / 1e6;
            else {
                n = +j[2] / 1e4,
                o = +j[3] / 1e4;
                var p = n | 0,
                    q = p / 100 | 0,
                    r = p - q * 100 + n - p;
                n = q + r / 60;
                var p = o | 0,
                    q = p / 100 | 0,
                    r = p - q * 100 + o - p;
                o = q + r / 60
            }
            var s = new GLatLng(o, n),
                t = pg.GMap.fromLatLngToDivPixel(s),
                u = j[0] === "1" ? "dc3131" : j[0] === "3" ? "009900" : "0073ac",
                v = (j[6] || "") + (j[4] ? " " + j[4] + "km/h\"" : "");
            pg.transformCSS ? (j[5] && +j[5] < 999 && c.push("<div class=\"arrow\" style=\"left:" + (t.x - 10) + "px; top:" + (t.y - 10) + "px; background-color:#" + u + "; " + pg.transformCSS + ":rotate(" + (45 + g + +j[5] * h) + "deg);\"></div>"), c.push("<div class=\"circle\"  style=\"left:" + (t.x - 9) + "px; top:" + (t.y - 9) + "px; background-color:#" + u + (k.length > 2 ? ";font-size:smaller" : "") + ";\" title=\"" + v + "\">" + k + "</div>")) : c.push("<img src=\"http://chart.apis.google.com/chart?cht=it&chs=20x20&chco=" + u + ",00000000,00000000&chx=ffffff&chf=bg,s,00000000&ext=.png&chl=" + k + "\" title=\"" + v + "\" style=\"z-index:110; position:absolute; width:20px; height:20px; left:" + (t.x - 10) + "px; top:" + (t.y - 10) + "px;\" />")
        }
    }
    a = null,
    pg.$mapVehicles.innerHTML = c.join("")
},
pg.fScheduleShow = function (a) {
    pg.schedule || (pg.schedulePane = 1, ($("spanReturnToRoutes") || {}).href = pg.urlPrevious, pg.urlUnderSchedulePane = pg.urlPrevious, pg.languageUnderSchedulePane = pg.language),
    document.body.className.indexOf("Schedule") < 0 && (document.body.className = "ScheduleDisplayed"),
    setTimeout(function () {
        try {
            $("aDir1").focus()
        } catch (a) {}
    }, 100);
    pg.schedule && pg.schedule.city == a.city && pg.schedule.transport == a.transport && pg.schedule.num == a.num && pg.schedule.dirType == a.dirType && pg.schedule.tripNum == a.tripNum ? (pg.schedule.dirType = a.dirType, pg.schedule.stopId = a.stopId, pg.fScheduleStopActivate()) : (pg.schedule = a, $("spanDir1").innerHTML = "&nbsp;", $("spanDir2").innerHTML = "&nbsp;", $("dlDirStops1").innerHTML = "&nbsp;", $("dlDirStops2").innerHTML = "&nbsp;", $("divScheduleContentInner").innerHTML = "<br/>" + i18n.loading, pg.fScheduleLoad())
},
pg.fScheduleHide = function () {
    pg.schedule = null,
    document.body.className.indexOf("Schedule") >= 0 && (document.body.className = "", $("divMap").style.width = "100%", $("divMap").style.height = "100%")
},
pg.fScheduleLoad = function () {
    pg.schedules = null,
    cfg.city.doNotShowTimetables = cfg.city.doNotShowTimetables || {},
    $("ulScheduleDirectionsList").style.display = "none";
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") setTimeout(pg.fScheduleLoad, 200);
    else {
        var a = ti.fGetRoutes(pg.schedule.city, pg.schedule.transport, pg.schedule.num, null, "0", null);
        if (!a.length) {
            $("divScheduleContentInner").innerHTML = "Error: route not found.";
            return
        }
        var b = null,
            c = [],
            d = {};
        for (var e = 0; e < a.length; e++) {
            var f = a[e],
                g = f.name,
                h = "";
            !b && pg.schedule.dirType && pg.schedule.dirType == f.dirType && (b = f, h = "strong");
            if (!d[g + f.dirType]) {
                d[g + f.dirType] = !0;
                var i = f.dirType.split("-"),
                    j = i[0],
                    k = i[i.length - 1];
                a.length > 1 && j != "a" && k != "b" ? j != "b" && k != "a" && j.charAt(0) == "a" ? f.dirNum = 1 : (f.dirNum = 2, h = "indented" + (h ? " " + h : "")) : f.dirNum = 1;
                var l = pg.fUrlSet({
                    schedule: {
                        dirType: f.dirType
                    }
                }, !0);
                c.push("<a href=\"#" + l + "\"" + (h ? " class=\"" + h + "\"" : "") + ">" + g + "</a>")
            }
        }
        $("ulScheduleDirectionsList").innerHTML = c.join(""),
        b || (b = a[0]),
        pg.schedule.dirType = b.dirType,
        pg.schedule.dirTypes = {},
        pg.schedule.route = b;
        var m = pg.schedulePane == 2 ? 2 : 1;
        for (var n = 1; n <= 2; n++) {
            pg.schedule.dirTypes[b.dirType] = m,
            $("spanDir" + m).innerHTML = (b.num && b.num.length <= 5 ? "<span class=\"num num3 " + b.transport + "\">" + b.num + "</span>" : "") + b.name,
            c = [];
            var o = null,
                p = 0,
                q = (b.streets || "").split(",") || [],
                r, s = null,
                t, u = pg.schedule.tripNum && n == 1 && !cfg.city.doNotShowTimetables[pg.schedule.transport] ? pg.schedule.tripNum : 0;
            u && (r = typeof b.times === "string" ? ti.explodeTimes(b.times) : b.times, t = r.workdays.length, s = r.times);
            for (e = 0; e < b.stops.length; e++) {
                var v = ti.fGetStopDetails(b.stops[e]),
                    l = pg.fUrlSet({
                        schedule: {
                            dirType: b.dirType,
                            stopId: v.id,
                            tripNum: u
                        }
                    }, !0);
                c.push("<dt><a class=\"hover\" href=\"#" + l + "\">" + (s ? ti.printTime(s[u - 1 + e * t], null, "&#x2007;") + "&nbsp;&nbsp;" : "") + v.name + "</a></dt>");
                if (n == 1 && v.street) if (o != v.street) {
                    while (q[p]) q[p] = {
                        name: q[p],
                        stops: ""
                    },
                    ++p;
                    o = v.street,
                    q[p] = {
                        name: o,
                        stops: v.name,
                        hash: l
                    },
                    ++p
                } else q[p - 1].stops += ", " + v.name
            }
            $("dlDirStops" + m).innerHTML = c.join(""),
            $("dlDirStops" + m).style.display = "";
            if (n == 2) break;
            for (p = q.length; --p >= 0;) o = q[p],
            typeof o != "object" && (o = {
                name: o
            }),
            o.name = o.name.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
            o.hash && (o.name = "<a href=\"#" + o.hash + "\" class=\"hover\" title=\"" + i18n.stops + ": " + o.stops.replace(/"/g, "") + "\">" + o.name + "</a>"),
            q[p] = o.name;
            var w = "";
            q.length && (w = i18n.routeStreets + ": " + q.join(", ")),
            $("divScheduleRoute").innerHTML = "<span class=\"icon icon_" + b.transport + "\"></span><span class=\"num num3 " + b.transport + "\">" + b.num + "</span>&nbsp;&nbsp; " + w + "<div class=\"RouteDetails\"" + (pg.scheduleDetailsExpanded ? "" : " style=\"display:none;\"") + ">" + i18n.operator + ": " + ti.fOperatorDetails(b.operator, b.transport) + "</div>";
            if (a.length <= 1) break;
            m = 3 - m;
            var i = b.dirType.split("-"),
                j = i[0],
                k = i[i.length - 1],
                x = k + "-" + j,
                y = b.dirNum;
            b = null;
            for (e = 0; e < a.length; e++) {
                if (!b || y == b.dirNum && y != a[e].dirNum) b = a[e];
                if (a[e].dirType === x) {
                    b = a[e];
                    break
                }
            }
            if (!b || j == k) {
                $("dlDirStops2").style.display = "none";
                break
            }
        }
        pg.fScheduleStopActivate(),
        pg.schedule.tripNum || ($("divScheduleBody").scrollTop = 0)
    }
},
pg.aDir_Click = function (a) {
    setTimeout(function () {
        try {
            a.focus()
        } catch (b) {}
    }, 100);
    var b = $("ulScheduleDirectionsList");
    (a.id || "").indexOf("2") >= 0 && a.offsetLeft > 100 ? (pg.scheduleProposedPane = 2, b.style.right = "10px", b.style.left = "") : (pg.scheduleProposedPane = 1, b.style.left = a.offsetLeft + "px", b.style.right = ""),
    b.style.display = "block"
},
pg.aDir_Blur = function () {
    $("ulScheduleDirectionsList").style.display = "none"
},
pg.ulScheduleDirectionsList_Click = function (a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.nodeName.toLowerCase() == "a") {
        var c = b.href.split("#")[1];
        if (!c) return;
        var d = pg.fUrlParse(c);
        pg.schedulePane = pg.scheduleProposedPane || 1,
        c = pg.fUrlSet({
            schedule: {
                dirType: d.schedule.dirType,
                stopId: null,
                tripNum: 0
            }
        }, !0),
        c != Hash.getHash() ? Hash.go(c) : pg.fScheduleLoad();
        return pg.cancelEvent(a)
    }
},
pg.fScheduleStops_Click = function (a, b) {
    a = a || window.event;
    var c = a.target || a.srcElement;
    if (c.nodeName.toLowerCase() == "a") {
        pg.schedulePane = b;
        var d = c.href.split("#")[1];
        if (!d) return;
        var e = pg.fUrlParse(d);
        pg.fUrlSet({
            schedule: {
                dirType: e.schedule.dirType,
                stopId: e.schedule.stopId,
                tripNum: e.schedule.tripNum
            }
        });
        return pg.cancelEvent(a)
    }
},
pg.fTransferHideMenu = function () {
    if (pg.transfersMenuHide) {
        var a = $("divTransfersMenu");
        a.style.display = "none"
    }
},
pg.fTransfer_MouseOver = function (a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.id == "divTransfersMenu" || (b.parentNode || {}).id == "divTransfersMenu" || b.id == "checkTransfer" || b.id == "spanCheckTransfer") pg.transfersMenuHide = !1;
    else {
        var c = b.getAttribute("data-transport");
        pg.transfersMenuHide = !0;
        if (cfg.defaultCity != "tallinna-linn" && cfg.defaultCity != "riga" || typeof b.className != "string" || b.className.indexOf("transfer") < 0 || !b.href) {
            if (c && pg.transfersDisplayed) {
                pg.addSchedule = c;
                var d = !0;
                if (pg.schedules) for (var e in pg.transfersDisplayed) {
                    d = pg.transfersDisplayed[e];
                    if (d && d.transport == c && !pg.schedules[e]) {
                        d = !0;
                        break
                    }
                }
                $("checkTransfer").checked = d !== !0,
                $("spanCheckTransfer").innerHTML = i18n.transport[c.replace("-remove", "")],
                pg.transfersMenuHide = !1
            }
        } else {
            pg.addSchedule = pg.fUrlParse(b.href).schedule;
            if (pg.addSchedule) {
                var d = ti.fGetRoutes(pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num, pg.addSchedule.dirType, !0)[0];
                $("checkTransfer").checked = b.className.indexOf("active") >= 0,
                $("spanCheckTransfer").innerHTML = i18n.transport1[d.transport] + (d.num.length > 15 ? "" : " " + d.num) + " " + i18n.towards + " " + d.name,
                pg.transfersMenuHide = !1
            }
        }
        var f = $("divTransfersMenu");
        pg.transfersMenuHide ? f.style.display == "block" && pg.fTransfer_MouseOut() : (f.style.left = b.offsetLeft + "px", f.style.top = b.offsetTop + b.offsetHeight + "px", f.style.display = "block")
    }
},
pg.fTransfer_MouseOut = function () {
    pg.transfersMenuHide = !0,
    setTimeout(pg.fTransferHideMenu, 200)
},
pg.fScheduleStopActivate = function () {
    var a = "/" + pg.schedule.dirType + "/" + pg.schedule.stopId + "/",
        b = pg.schedule.dirTypes[pg.schedule.dirType],
        c;
    for (var d = 1; d <= 2; d++) {
        c = $("dlDirStops" + d).getElementsByTagName("a");
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            d == b && a && pg.schedule.stopId && ("/" + f.href + "/").indexOf(a) >= 0 ? (f.className = "current" + ti.fGetDirTag(pg.schedule.dirType), a = "") : f.className.indexOf("current") >= 0 && (f.className = "")
        }
    }
    if (a) {
        c = $("dlDirStops" + (b || 1)).getElementsByTagName("a");
        if (c && (c[0] || {}).href) {
            a = c[0].href.split("#")[1],
            pg.fUrlExecute(a);
            return
        }
    }
    $("aDir1").className = $("divScheduleLeft").className = b == 1 ? "active" : "",
    $("aDir2").className = $("divScheduleRight").className = b == 2 ? "active" : "",
    pg.browserVersion >= 8 && pg.toggleClass($("divScheduleContentInner"), "Right", b == 2),
    pg.fScheduleLoadTimetable()
},
pg.fScheduleLoadTimetable = function () {
    var a, b, c, d = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"),
        e = pg.schedules || {};
    pg.schedules || (e[d] = pg.schedule);
    var f = pg.nonEmptyCount(e) > (e[d] ? 1 : 0),
        g = ti.fGetTransfersAtStop(pg.schedule.stopId, !0, pg.schedule.route);
    pg.transfersDisplayed = {};
    var h = null,
        i = null,
        j = [],
        k = [];
    for (c = 0; c < g.length; c++) {
        a = g[c],
        d = ti.toAscii([a.city, a.transport, a.num].join("_"), !0);
        if (pg.transfersDisplayed[d]) continue;
        var l = {
            id: a.id,
            city: a.city,
            transport: a.transport,
            num: ti.toAscii(a.num, !0),
            dirType: a.dirType,
            routeTag: a.stopId,
            stopId: a.stopId
        };
        pg.transfersDisplayed[d] = l;
        if (cfg.defaultCity === "druskininkai" || cfg.defaultCity === "liepaja") parseInt(pg.schedule.num, 10) === parseInt(a.num, 10) && (e[d] = l, f = f || pg.schedule.num !== a.num);
        b = pg.fUrlSet({
            schedule: l
        }, !0),
        h !== a.transport && (h = a.transport, j.push(" <span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "\"></span>&nbsp;"));
        var m = "<a class=\"hover " + (e[d] ? "activetransfer " : "transfer") + h + "\" href=\"#" + b + "\" title=\"" + (a.name || "").replace(/"/g, "") + "\">" + g[c].num.replace(/\s/g, "&nbsp;") + "</a> ";
        j.push(m),
        e[d] && (i !== a.transport && (i = a.transport, m = " <span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "-remove\"></span>&nbsp;" + m), k.push(m), e[d].stopId = a.stopId)
    }
    j.push("<span style=\"display:inline-block; width:2px;\"></span>");
    var n = ti.fGetStopDetails(pg.schedule.stopId),
        o = (n.street ? ", " + n.street : "") + (n.area && !cfg.cities[pg.city].skipStopArea ? ", " + n.area : "") + (n.city && !cfg.cities[pg.city].skipStopCity ? ", " + n.city : "");
    n[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (o += ", " + i18n.fareZone + " " + n[cfg.cities[pg.city].stopFareZone]),
    o = o.length > 0 ? "<span class=\"details\"> (" + o.substring(2) + ")</span>" : "",
    $("divScheduleStop").innerHTML = i18n.stop + "<strong> " + n.name + "</strong>" + o + "&nbsp;&nbsp; " + j.join("");
    if (n.street) {
        var p = n.street.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
            q = $("divScheduleRoute").getElementsByTagName("a");
        for (c = q.length; --c >= 0;) q[c].innerHTML.indexOf(p) < 0 ? q[c].className == "hover strong" && (q[c].className = "hover") : q[c].className = "hover strong"
    }
    var r = [],
        s = 0,
        t = Number.POSITIVE_INFINITY,
        u = cfg.city.doNotMergeTimetables;
    pg.schedule.stopId != pg.schedule.route.stops[0] && cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[pg.transport] && (e = null);
    for (var d in e) {
        var l = e[d];
        if (!l || !l.stopId) continue;
        if (!pg.transfersDisplayed[d]) continue;
        var v = ti.fGetStopDetails(l.stopId),
            w = {},
            x = (v || {
                raw_data: ""
            }).raw_data.split(";"),
            y = l.dirType.split("-"),
            z = y[0],
            A = y[y.length - 1],
            B = z.charAt(0),
            C = A.charAt(0),
            D = ti.toAscii(pg.schedule.route.name, !0);
        for (var c = ti.FLD_DIRS; c < x.length; c += 2) {
            a = ti.fGetRoutes(x[c]);
            if (a.city === l.city && a.transport === l.transport && ti.toAscii(a.num, !0) === l.num && a.times && (!pg.schedule.route.routeTag || a.id === pg.schedule.route.id || ti.toAscii(a.name, !0) === D)) {
                if (a.dirType.indexOf(l.dirType) < 0 && l.dirType.indexOf(a.dirType) < 0 && a.dirType.indexOf("-d") < 0 && z !== A && (a.dirType.indexOf(A) == 0 || a.dirType.indexOf(z) == a.dirType.length - 1 || a.dirType.indexOf("-" + C) < 0 && a.dirType.indexOf(z + "-") < 0 && a.dirType.indexOf(B + "-") < 0 && (a.dirType.indexOf("c") < 0 || a.dirType.indexOf("c") >= a.dirType.length - 2))) continue;
                if (w[a.id]) continue;
                w[a.id] = !0,
                a.tag = (!f && a.dirType != pg.schedule.dirType && ti.toAscii(a.name, !0) !== D ? "other" : "current") + ti.fGetDirTag(a.dirType);
                if (a.tag == "current" || a.tag == "other" && a.dirType.charAt(0) == "d") a.tag = "";
                (cfg.defaultCity === "druskininkai" || cfg.defaultCity === "liepaja") && pg.schedule.num === a.num && (a.tag = "");
                var E = typeof a.times === "string" ? ti.explodeTimes(a.times) : a.times,
                    F = +x[c + 1],
                    G = E.workdays,
                    H = E.tag,
                    I = E.times,
                    J = G.length,
                    K = J;
					
                for (var L = J + F * J; K--;) {
                    var M = I[--L];
                    t > M && M >= 0 && (t = M);
                    var N = a.tag;
                    H.charAt(K) == "1" && (N = (N ? N + " " : "") + "highlighted"),
                    pg.schedule.tripNum && a.dirType == pg.schedule.dirType && pg.schedule.tripNum - 1 == K && (N = (N ? N + " " : "") + "clicked");
                    if (u) r[s++] = {
                        time: M,
                        workday: G[K],
                        route: a,
                        tag: N,
                        tripNum: K
                    };
                    else for (var O = 1; O <= 7; O++) G[K].indexOf(O) >= 0 && (r[s++] = {
                        time: M,
                        workday: O,
                        route: a,
                        tag: N,
                        tripNum: K
                    })
                }
            }
        }
    }
    r.sort(function (a, b) {
        if (a.workday < b.workday) return -1;
        if (a.workday > b.workday) return 1;
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        if (a.route.id < b.route.id) return -1;
        if (a.route.id > b.route.id) return 1;
        return 0
    });
    var P = "";
    f ? (P = "<div style=\"width:100%; margin-top:10px;\">" + k.join(" &nbsp;") + " &nbsp;<label id=\"labelShowDeparturesWithNumbers\" for=\"showDeparturesWithNumbers\"><input name=\"showDeparturesWithNumbers\" id=\"showDeparturesWithNumbers\" type=\"checkbox\" value=\"showDeparturesWithNumbers\"" + (pg.showDeparturesWithNumbers ? " checked=\"checked\"" : "") + " onclick=\"pg.fToggleNumbersAtDepartures();\" />" + i18n.showDeparturesWithRouteNumbers + "</label></div>", $("divScheduleRoute").style.display = "none") : $("divScheduleRoute").style.display = "",
    j = [];
    if (r.length) {
        var Q, R = t = ~~ (t / 60) - 1,
            S = [],
            T = [],
            U;
        for (c = 0, L = r.length; c <= L; c++) {
            if (c > 0 && (c === L || r[c].workday != r[c - 1].workday)) {
                var U = j.join(";"),
                    J = r[c - 1].workday;
                for (kk = 1; kk <= 7; ++kk) if (S[kk] === U) {
                    T[kk] += J;
                    break
                }
                kk > 7 && (S[J] = U, T[J] = "" + J);
                if (c === L) break;
                j = []
            }
            U = r[c];
            var a = U.route;
            j.push(U.time, a.city, a.transport, a.num, a.dirType)
        }
        j = [];
        for (c = 0, L = r.length; c <= L; c++) {
            if (c < L) {
                U = r[c];
                if (u) T[U.workday] = U.workday;
                else if (!T[U.workday]) continue
            }
            if (c > 0 && (c === L || U.workday != r[c - 1].workday)) {
                R != -999 && j.push("</td></tr>"),
                j.push("</tbody></table>");
                if (c === L) break
            }
            if (c == 0 || U.workday != r[c - 1].workday) R = t,
            j.push("<table class=\"timetable\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><th></th><th class=\"workdays\">" + pg.fWeekdaysName(T[r[c].workday]) + "</th></tr>");
            var V = U.time;
            if (V < 0) continue;
            var W = ~~ (V / 60);
            V = V % 60;
            if (R !== W) {
                if (R != t) {
                    j.push("</td></tr>");
                    while (++R < W) j.push("<tr><th>-</th><td></td></tr>")
                } else while (++R < W) j.push("<tr><th>&nbsp;</th><td></td></tr>");
                R = W,
                j.push("<tr><th>" + W % 24 + "</th><td" + (f ? " style=\"white-space:normal;\"" : "") + ">")
            }
            var X = U.route;
            b = pg.fUrlSet({
                schedule: {
                    city: X.city,
                    transport: X.transport,
                    num: X.num,
                    dirType: X.dirType,
                    stopId: X.stopId,
                    tripNum: U.tripNum + 1
                }
            }, !0),
            j.push("<a href=\"#" + b + "\" title=\"" + (f ? i18n.transport1[X.transport] + (X.num.length > 15 ? "" : " " + X.num) + " " + i18n.towards + " " : "") + X.name.replace(/"/g, "") + "\"" + (U.tag ? "class=\"" + U.tag + "\"" : "") + ">" + (V < 10 ? "0" : "") + V + (f ? "<span class=\"departure" + X.transport + "\">\\" + X.num + "</span></a>&#x200A;" : "</a>"))
        }
    }
    P += j.join("");
    if (pg.schedule.route && pg.schedule.route.transport) {
        a = pg.schedule.route,
        j = [];
        var Y = (cfg.operators[a.operator] || cfg.operators[a.transport] || {
            notes0: ""
        }).notes0;
        Y && (P = "<div style=\"margin-top:10px; clear:both;\">" + (Y[pg.language] || Y.en || Y) + "</div>" + P),
        Y = cfg.city.skipOperator ? "" : ti.fOperatorDetails(a.operator, a.transport),
        Y && j.push("<p class=\"noindent\"><strong>" + i18n.operator + ":</strong> " + Y + "</p>"),
        Y = (cfg.operators[a.operator] || cfg.operators[a.transport] || {
            notes: ""
        }).notes,
        Y && j.push("<p>" + (Y[pg.language] || Y.en || Y).replace("%operator", a.operator) + "</p><br /><br />"),
        e && (j.push("<p class=\"noindent\"><strong>" + i18n.scheduleCommentsInfo + ":</strong>"), Y = (cfg.operators[a.operator] || cfg.operators[a.transport] || {
            comments: ""
        }).comments, Y ? j.push("<p>" + (Y[pg.language] || Y.en || Y).replace("%operator", a.operator) + "</p>") : (i18n.scheduleDelaysWarning && i18n.scheduleDelaysWarning.length > 10 && j.push("<p>" + i18n.scheduleDelaysWarning), j.push("<p class=\"noprint\">" + i18n.scheduleComments)), P.indexOf("highlighted") >= 0 && j.push("<p>" + i18n.lowFloorDepartures), P.indexOf("other") >= 0 && (j.push("<p>" + i18n.scheduleChangedDepartures), j.push("<p class=\"noprint\">" + i18n.scheduleMouseTips))),
        $("divScheduleContentBottom").innerHTML = j.join("</p>") + "</p>"
    }
    pg.replaceHtml($("divScheduleContentInner"), P + "<div style=\"clear:both;\"></div>")
},
pg.fCheckTransfer_Click = function () {
    if (!pg.addSchedule) return !1;
    $e = $("checkTransfer");
    var a;
    pg.schedules || (a = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"), pg.schedules = {}, pg.schedules[a] = pg.schedule);
    if (typeof pg.addSchedule == "object") a = ti.toAscii([pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num].join("_")),
    pg.schedules[a] = $e.checked ? pg.addSchedule : null;
    else {
        pg.addSchedule = (pg.addSchedule || "").replace("-remove", "");
        for (var a in pg.transfersDisplayed) {
            var b = pg.transfersDisplayed[a];
            b.transport == pg.addSchedule && (pg.schedules[a] = $e.checked ? b : null)
        }
    }
    pg.fScheduleLoadTimetable();
    return
},
pg.fToggleNumbersAtDepartures = function () {
    pg.showDeparturesWithNumbers = $("showDeparturesWithNumbers").checked,
    pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)
},
pg.fWeekdaysName = function (a) {
    var b = i18n["weekdays" + a] || "";
    if (b) return b;
    var c = a.split("");
    for (var d = c.length; --d >= 0;) b = c[d],
    c[d] = i18n["weekdays" + b] || b;
    b = c.join(", ");
    return b
},
ti.findTrips = function (a) {
    a.no_just_walking = !1,
    a.reverseOriginal = a.reverse;
    if (a.attempt) {
        if (a.attempt == -1) {
            a.attempt = 1;
            if (a.results.length <= 0) {
                a.transport = a.transportOriginal,
                dijkstra(a, a.start_time, a.reverse);
                return
            }
        }
        if (a.attempt == 1 && a.results.length <= 0) {
            a.attempt = 2,
            a.reverse = -a.reverse,
            a.sort = "no sort",
            dijkstra(a, a.reverse == 1 ? 0 : 4320, a.reverse);
            return
        }
        if (a.attempt == 2 && a.results.length > 0) {
            a.attempt = 999,
            a.reverse = -a.reverse;
            var b;
            for (var c = 0; c < a.results.length; c++) a.reverse == 1 && (c == 0 || b < a.results[c].start_time) && (b = a.results[c].start_time),
            a.reverse == -1 && (c == 0 || b > a.results[c].finish_time) && (b = a.results[c].finish_time);
            dijkstra(a, b, a.reverse);
            return
        }
        if (a.attempt === 1) {
            var b = null;
            for (var c = 0; c < a.results.length; c++) {
                if (a.results[c].code == "W") continue;
                a.reverse == 1 && (!b || b > a.results[c].finish_time) && (b = a.results[c].finish_time),
                a.reverse == -1 && (!b || b < a.results[c].start_time) && (b = a.results[c].start_time)
            }
            a.results = ti.filterSearchResults(a.results, a.reverse),
            a.callback1 && a.callback1(ti.finalizeSearchResults(a.results.slice(0, 1))),
            a.attempt = 3,
            a.results0 = a.results,
            a.no_just_walking = !0;
            if (b) {
                dijkstra(a, b, -a.reverse, a.start_time);
                return
            }
            a.results = []
        }
        if (a.attempt == 3) {
            a.results.push.apply(a.results, a.results0),
            a.results = ti.filterSearchResults(a.results, a.reverse);
            if (!0 || a.results.length == 1 || a.results0.length >= a.results.length) if (a.results[0].legs.length != 1 || a.results[0].legs[0].route) {
                a.attempt = 4,
                a.results0 = a.results,
                a.no_just_walking = !0,
                dijkstra(a, a.reverse == 1 ? a.results[0].start_time + 1 : a.results[0].finish_time - 1, a.reverse);
                return
            }
        }
        a.attempt == 4 && a.results.push.apply(a.results, a.results0);
        var d = ti.finalizeSearchResults(ti.filterSearchResults(a.results, a.reverse));
        pg.optimalSearchRunning = !1;
        if (a.callback) a.callback(d, !0);
        else return d
    } else {
        if (pg.optimalSearchRunning) return;
        pg.optimalSearchRunning = !0,
        ti.timeStarted = +(new Date),
        a.attempt = 1;
        var e = a.date;
        e || (e = new Date, e = new Date(e.getFullYear(), e.getMonth(), e.getDate())),
        +e == +(new Date(2012, 3, 28)) ? a.weekday = 5 : +e == +(new Date(2012, 3, 30)) || +e == +(new Date(2012, 4, 1)) || +e == +(new Date(2012, 4, 4)) || +e == +(new Date(2012, 10, 19)) ? a.weekday = 7 : a.weekday = e.getDay() || 7,
        a.transportOriginal = ti.cloneObject(a.transport);
        if (a.transport.bus || a.transport.trol || a.transport.tram) a.transport.regionalbus && (a.transport.regionalbus = !1, a.attempt = -1),
        a.transport.commercialbus && (a.transport.commercialbus = !1, a.attempt = -1),
        a.transport.train && (a.transport.train = !1, a.attempt = -1);
        dijkstra(a, a.start_time, a.reverse)
    }
};

function dijkstra(a, b, c, d) {
    var e = !1,
        f = a.weekday,
        g = c == -1 ? a.finish_stops.split(",") : a.start_stops.split(","),
        h = c == -1 ? a.start_stops.split(",") : a.finish_stops.split(",");
    c || (e = !0, c = 1, f = a.weekdaydirect || "", a.direct_routes = []),
    a.results = [],
    b = b ? b * c : 0,
    d = d ? d * c : 7200;
    var i = b,
        j = c == 1 ? "1" : "2",
        k = c == 1 ? "2" : "1",
        l = a.route_nums ? "," + a.route_nums.toLowerCase().replace(/\s/g, "") + "," : "",
        m = a.lowFloor;
    l.indexOf(",z,") >= 0 && (m = !0, l = l.replace(/,z,/g, ""));
    var n = ti.dateToDays(a.date || new Date),
        o = a.max_changes || Infinity,
        p = a.change_time || 3,
        q = a.walk_speed_kmh || 4,
        r = a.walk_max || 2e3;
    r = e ? .05 : r / 1e3,
    r = r * r;
    var s = ti.stops,
        t = ti.routes,
        u = ti.specialDates,
        v = a.direct_routes || [],
        w = a.transport,
        x = a.commercial,
        y = a.routetypes,
        z = y != 1,
        A = a.area,
        B = 0,
        C = a.middle_stops;
    if (C) {
        B = 10;
        for (var D in C) {
            var E = s[D].routes;
            for (var F = 0; F < E.length; F += 2) t[E[F]].available = 10
        }
    }
    if (!0 || e) for (var G = t.length; --G >= 0;) {
        var H = ti.fGetRoutes(G),
            I = t[G];
        I.available = w && w[H.transport] === !1 || B && B !== I.available || l && l.indexOf("," + H.num.toLowerCase() + ",") < 0 || x && x != H.commercial || y && z != !_transport_data[H.transport].region || A && A != H.cities[0] ? 0 : 1
    }
    for (var J = v.length; --J >= 0;) v[J].available = 0;
    var K, L, M = {},
        N = {},
        O = {};
    for (var P = 1, Q = g; P <= 2; ++P) {
        for (var F = Q.length; --F >= 0;) if (Q[F].charAt(0) == "A") {
            var R = s[Q[F]];
            if (R) for (var J = R.neighbours.length; --J >= 0;) Q.push(R.neighbours[J]);
            Q[F] = "removed stop"
        } else if (Q[F].indexOf(";") > 0) {
            var S = Q[F].split(";");
            P == 1 ? K = {
                id: Q[F],
                lat: parseFloat(S[0]),
                lng: parseFloat(S[1]),
                neighbours: []
            } : (L = {
                id: Q[F],
                lat: parseFloat(S[0]),
                lng: parseFloat(S[1])
            }, N[L.id] = !0, K && (O[K.id] = !0))
        }
        Q = h
    }
    var T = [],
        U = {};
    U[i] = [];
    for (var D in s) {
        var R = s[D];
        R.time = Number.POSITIVE_INFINITY;
        if (!R.lat || !R.lng) continue;
        if (K) {
            var V = (K.lng - R.lng) * 58.1,
                W = (K.lat - R.lat) * 111.2,
                X = V * V + W * W;
            X <= r && K.neighbours.push(R.id)
        }
        if (L) {
            var V = (L.lng - R.lng) * 58.1,
                W = (L.lat - R.lat) * 111.2,
                X = V * V + W * W;
            X <= r && (O[R.id] = !0)
        }
    }
    for (var J = g.length; --J >= -1;) {
        var R = J >= 0 ? s[g[J]] : K;
        R && (R.prev_stop = !1, R.route = null, R.changes = 0, M[R.id] = !0, J == -1 && c == -1 && p ? (i -= p, U[i] = [K]) : U[i].push(R), R.time = i)
    }
    for (var J = h.length; --J >= 0;) {
        var D = h[J],
            R = s[D];
        R && (N[D] = !0)
    }
    for (var G in t) {
        var I = t[G];
        I.trip_start_time = Number.POSITIVE_INFINITY
    }
    a.finish_stops || (h = !1);
    var Y = +(new Date),
        Z = function () {
            for (var b = 0;;) {
                for (var g; !(g = U[i]) || !g.length;) if (++i > d) {
                    if (!T.length) {
                        a.results = [];
                        if (e) return [];
                        typeof window === "object" ? window.setTimeout(function () {
                            ti.findTrips(a)
                        }, 10) : ti.findTrips(a);
                        return
                    }
                    g = !1;
                    break
                }
                if (!g) break;
                g = g.pop();
                if (g.time < i || g.changes < 0) continue;
                if (++b == 3e3 && !e && typeof window === "object") {
                    +(new Date) - Y > 3e4 ? (a.results = [], window.setTimeout(function () {
                        ti.findTrips(a)
                    }, 10)) : window.setTimeout(Z, 100);
                    return
                }
                if (N[g.id]) {
                    d > i + 60 && (d = i + 60);
                    continue
                }
                var l = g.routes || [],
                    v = g.changes || 0;
                if (v <= o) for (var w = 0, x = l.length; w < x; w += 2) {
                    var y = t[l[w]];
                    if (e) {
                        if (y.available != 2 && h) continue;
                        a.direct_routes.push(y),
                        w + 2 < x && l[w + 2] == l[w] && (w += 2)
                    } else if (!y.available) continue;
                    if (typeof y.times === "string") {
                        var z = ti.fGetRoutes(y.id);
                        y.times = ti.explodeTimes(y.times),
                        y.stops = z.stops,
                        y.entry = z.entry,
                        y.specialDates = z.specialDates
                    }
                    var A = y.times,
                        B = l[w + 1],
                        D = y.stops || y.raw_data.split(";").slice(ti.RT_ROUTESTOPS);
                    if (c == 1 && B >= D.length - 1 || c == -1 && B == 0) continue;
                    var E;
                    if ((E = y.entry).charAt(B) == k) continue;
                    D[B] == D[B + c] && (B += c);
                    if (!A) continue;
                    var F = A.workdays,
                        G = A.valid_from,
                        H = A.valid_to,
                        I = A.tag,
                        J = A.times;
                    A = null;
                    var K = F.length,
                        P = K,
                        Q = f;
                    u = y.specialDates;
                    for (var R = 0, S = u.length; R < u.length; ++R) {
                        if (!u[R]) continue;
                        if (u[R++][n]) {
                            (Q = u[R]) === "*" && (Q = f);
                            break
                        }
                        u[R] === "*" && (Q = "0")
                    }
                    do {
                        var V = -1,
                            W = c == 1 ? Number.POSITIVE_INFINITY : 1,
                            X, $ = !e || !C;
                        for (var _ = P + B * K; P--;) if ((X = c * J[--_]) >= i && (X < W || e) && (!f || F[P].indexOf(Q) >= 0) && (!m || I.charAt(P) == "1") && (!H[P] || H[P] >= n) && G[P] <= n) {
                            V = _,
                            W = X;
                            if (e) {
                                if (!h) {
                                    var ba = {
                                        route: ti.fGetRoutes(y.id),
                                        start_time: W,
                                        trip_num: V % K
                                    };
                                    ba.route.stopId = g.id,
                                    T.push(ba),
                                    V = -2;
                                    continue
                                }
                                break
                            }
                        }
                        if (V < 0) {
                            if (V != -2 && !h) {
                                var ba = {
                                    route: ti.fGetRoutes(y.id),
                                    start_time: -1,
                                    trip_num: -1
                                };
                                ba.route.stopId = g.id,
                                T.push(ba)
                            }
                            break
                        }
                        var bb, bc = c * J[V % K];
                        e ? bb = D.length : bc < y.trip_start_time ? (bb = c == 1 ? D.length : 1, y.trip_start_time = bc, y.pos_max = c * B) : (bb = y.pos_max, bb > c * B && bc == y.trip_start_time && (y.pos_max = c * B)), K = c * K;
                        for (var bd = B; c * (bd += c) < bb;) {
                            V += K;
                            if (E.charAt(bd) == j) continue;
                            var be;
                            if ((be = J[V]) >= 0) {
                                be = c * be + p;
                                if (be > d) break;
                                if (be < i) continue;
                                var bf;
                                if (!(bf = s[D[bd]])) continue;
                                var bg;
                                e && !$ && ($ = bf.id in C);
                                if (N[bf.id] && $) {
                                    if (e) {
                                        y.available = 0;
                                        if (g.id.indexOf(";") < 0) for (var bh = 0; bh < bd; ++bh) {
                                            if (E.charAt(bh) == j || D[bh] == D[bh + 1]) continue;
                                            if (M[D[bh]] && J[V + K * (bh - bd)] >= 0) {
                                                g = s[D[bh]],
                                                W = J[V + K * (bh - bd)];
                                                break
                                            }
                                        }
                                        for (var bh = bb; --bh > bd;) {
                                            if (E.charAt(bh) == j || D[bh] == D[bh - 1]) continue;
                                            if (N[D[bh]] && J[V + K * (bh - bd)] >= 0) {
                                                bf = s[D[bh]],
                                                be = J[V + K * (bh - bd)];
                                                break
                                            }
                                        }
                                    }
                                    var ba = {
                                        legs: [{
                                            start_stop: g,
                                            start_time: c * W,
                                            finish_stop: bf,
                                            finish_time: c * (be - p),
                                            route: y,
                                            trip_num: V % K,
                                            start_pos: c >= 0 ? B : bd,
                                            finish_pos: c >= 0 ? bd : B
                                        }]
                                    };
                                    T.push(ba),
                                    bd = bb
                                } else {
                                    if (e) continue;
                                    if (be >= (bg = bf.time)) {
                                        if (bg < i) break;
                                        continue
                                    }
                                    if (y.available === 2) {
                                        bf.time = be,
                                        bf.changes = -1;
                                        continue
                                    }
                                    if (v < o) bf.route = y,
                                    bf.prev_stop = g,
                                    bf.prev_stop_start_time = W,
                                    bf.trip_num = V % K,
                                    bf.start_pos = c >= 0 ? B : bd,
                                    bf.finish_pos = c >= 0 ? bd : B;
                                    else continue
                                }
                                bf.time = be,
                                bf.changes = v + 1;
                                var bi = U[be];
                                bi ? bi[bi.length] = bf : U[be] = [bf]
                            }
                        }
                    } while (e);
                    J = null
                }
                if (e) continue;
                var bj = g.route || !g.prev_stop ? g : g.prev_stop,
                    bk = bj.lat,
                    bl = bj.lng,
                    bm = g.neighbours;
                for (var w = bm.length; --w >= -1;) {
                    var bf;
                    if (w < 0) if (O[bj.id]) bf = L;
                    else break;
                    else bf = s[bm[w]] || {
                        lat: 999,
                        lng: 999
                    };
                    var bn = (bl - bf.lng) * 58.1,
                        bo = (bk - bf.lat) * 111.2,
                        bp = bn * bn + bo * bo;
                    if (bp > r && (!g.name || bf.name !== g.name)) continue;
                    bp = Math.sqrt(bp);
                    var be = Math.round(bp / q * 60);
                    be += bj.time,
                    bj.route || !bj.prev_stop && c < 0 || (be += p),
                    be < i && (be = i);
                    if (be > d) continue;
                    if (N[bf.id]) {
                        var ba = {
                            legs: [{
                                start_stop: bj,
                                start_time: c * (bj.time - (bj.route ? p : 0)),
                                finish_stop: bf,
                                finish_time: c * (be - p),
                                route: null
                            }]
                        };
                        T.push(ba)
                    } else if (be < bf.time) bf.route = !1,
                    bf.prev_stop = bj,
                    bf.prev_stop_start_time = bj.time - (bj.route ? p : 0);
                    else continue;
                    bf.time = be,
                    bf.changes = v;
                    var bi = U[be];
                    bi ? bi[bi.length] = bf : U[be] = [bf]
                }
            }
            if (!h) {
                T.sort(function (a, b) {
                    if (a.route.sortKey < b.route.sortKey) return -1;
                    if (a.route.sortKey > b.route.sortKey) return 1;
                    if (a.start_time < b.start_time) return -1;
                    if (a.start_time > b.start_time) return 1;
                    return 0
                });
                return T
            }
            var bq = {},
                br = Number.POSITIVE_INFINITY;
            for (var w = T.length; --w >= 0;) {
                var ba = T[w],
                    bs = ba.legs[0].route ? ";" + ba.legs[0].route.id : "",
                    bt = ba.legs[ba.legs.length - 1];
                ba.finish_time = bt.finish_time,
                ba.walk_time = bt.route ? 0 : Math.abs(bt.finish_time - bt.start_time),
                be = ba.departure_time;
                for (var bu = ba.legs[0].start_stop; bu; bu = bu.prev_stop) {
                    if (!bu.prev_stop) break;
                    bt = {
                        start_stop: bu.prev_stop,
                        start_time: c * bu.prev_stop_start_time,
                        finish_stop: bu,
                        finish_time: c * (bu.time - p),
                        route: bu.route,
                        trip_num: bu.trip_num,
                        start_pos: bu.start_pos,
                        finish_pos: bu.finish_pos
                    },
                    bu.route ? bs = c == 1 ? ";" + bu.route.id + bs : bs + ";" + bu.route.id : (c < 0 && (!bu.prev_stop || !bu.prev_stop.prev_stop) && (bt.finish_time -= p), ba.walk_time += Math.abs(bt.finish_time - bt.start_time)),
                    ba.legs.splice(0, 0, bt)
                }
                if (c == -1) {
                    var bv = ba.legs[0];
                    if (!bv.route) {
                        var bw = ba.legs[1];
                        bw && bw.route ? (bv.start_time += bw.start_time - bv.finish_time, bv.finish_time = bw.start_time) : (bv.start_time -= p, bv.finish_time -= p)
                    }
                    ba.finish_time = ba.legs[0].start_time,
                    ba.legs = ba.legs.reverse();
                    for (var bx = -1, by = ba.legs.length; ++bx < by;) {
                        bt = ba.legs[bx];
                        var be = bt.start_time - bt.finish_time;
                        !bt.route && bx > 0 ? (bt.start_time = ba.legs[bx - 1].finish_time, bt.finish_time = bt.start_time + be) : (bt.finish_time = bt.start_time, bt.start_time -= be);
                        var g = bt.finish_stop;
                        bt.finish_stop = bt.start_stop,
                        bt.start_stop = g
                    }
                }
                var bv = ba.legs[0],
                    bw = ba.legs[1];
                if (!bv.route) if (bw && bw.route) bv.start_time += bw.start_time - p - bv.finish_time,
                bv.finish_time = bw.start_time - p;
                else if (a.no_just_walking) continue;
                ba.start_time = ba.legs[0].start_time,
                ba.travel_time = ba.finish_time - ba.start_time,
                e && (bs = ba.legs[0].start_time + "T" + bs, ba.code = bs),
                bs == "" && (bs = "W", br = ba.walk_time, ba.code = bs);
                var bz = bq[bs];
                if (!bz || c == 1 && ba.finish_time < bz.finish_time || c != 1 && ba.start_time > bz.start_time) bq[bs] = ba
            }
            if (e) a.results = T;
            else {
                var bA = [];
                for (var bs in bq) {
                    var ba = bq[bs],
                        bB = ba.code = bs + ";";
                    if (ba.walk_time >= br && bs != "W") continue;
                    for (var w = bA.length; --w >= 0;) if (bA[w].code.indexOf(bB) >= 0 || bB.indexOf(bA[w].code) >= 0) if (c == 1 && bA[w].finish_time <= ba.finish_time || c != 1 && bA[w].start_time >= ba.start_time) {
                        if (bA[w].walk_time + bA[w].travel_time <= ba.walk_time + ba.travel_time && bB.length >= bA[w].code.length) break
                    } else bA[w].walk_time + bA[w].travel_time >= ba.walk_time + ba.travel_time && bA.splice(w, 1);
                    w < 0 && bA.push(ba)
                }
                for (var w = bA.length; --w >= 0;) {
                    var ba = bA[w];
                    a.reverseOriginal == -1 ? ba.code = ba.code + "T" + ba.legs[ba.legs.length - 1].finish_time : ba.code = ba.legs[0].start_time + "T" + ba.code
                }
                a.results = bA,
                typeof window === "object" ? window.setTimeout(function () {
                    ti.findTrips(a)
                }, 10) : ti.findTrips(a)
            }
        };
    return Z()
}
ti.filterSearchResults = function (a, b) {
    for (var c = a.length; --c >= 0;) {
        if (a[c].remove) continue;
        for (j = a.length; --j >= 0;) {
            if (c === j) continue;
            a[j].code.indexOf(a[c].code) >= 0 && (a[j].remove = !0)
        }
    }
    var d = {};
    for (var c = a.length; --c >= 0;) {
        if (a[c].remove) continue;
        a[c].penalty_time = a[c].travel_time + 5 * a[c].legs.length;
        var e = d[a[c].code];
        if (!e || e.penalty_time > a[c].penalty_time) d[a[c].code] = a[c]
    }
    a = [];
    for (var f in d) a.push(d[f]);
    a.sort(function (a, b) {
        return a.penalty_time - b.penalty_time
    });
    var g = Number.POSITIVE_INFINITY;
    for (var c = a.length; --c >= 0;) a[c].ok = c < 3 ? 1 : 0,
    g > a[c].travel_time && (g = a[c].travel_time);
    a.sort(function (a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function (a, b) {
        return -(a.start_time - b.start_time)
    });
    for (var c = a.length; --c >= 0;) {
        var h = b == 1 ? a[c].finish_time - a[0].finish_time : a[0].start_time - a[c].start_time;
        h > a[0].travel_time / 2 + 60 ? a[c].ok = 0 : a[c].penalty_time > 2 * g && h > g && c >= 2 ? a[c].ok = 0 : a[c].walk_time > g ? a[c].ok = 0 : c < 3 && (a[c].ok = 1)
    }
    a.sort(function (a, b) {
        return b.ok - a.ok
    });
    for (var c = a.length; --c > 0;) {
        if (a[c].ok == 1) break;
        a.pop()
    }
    a.sort(function (a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function (a, b) {
        return -(a.start_time - b.start_time)
    });
    return a
},
ti.finalizeSearchResults = function (a) {
    var b = Array(a.length);
    for (var c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.legs;
        b[c] = {
            start_time: d.start_time,
            finish_time: d.finish_time,
            travel_time: d.travel_time,
            walk_time: d.walk_time,
            legs: [],
            code: d.code
        };
        for (var f = 0; f < e.length; f++) {
            var g = e[f],
                h = g.route ? g.route.times.workdays[g.trip_num] : "",
                i = g.start_stop && ti.fGetStopDetails(g.start_stop.id),
                j = g.finish_stop && ti.fGetStopDetails(g.finish_stop.id),
                k = {
                    trip_num: g.trip_num,
                    start_pos: g.start_pos,
                    finish_pos: g.finish_pos,
                    start_time: g.start_time,
                    finish_time: g.finish_time,
                    weekdays: h,
                    start_stop: i && {
                        id: i.id,
                        name: i.name,
                        street: i.street,
                        lat: i.lat,
                        lng: i.lng
                    },
                    finish_stop: j && {
                        id: j.id,
                        name: j.name,
                        street: j.street,
                        lat: j.lat,
                        lng: j.lng
                    }
                };
            g.route && (k.route = ti.fGetRoutes(g.route)),
            b[c].legs.push(k)
        }
    }
    return b
},
pg.inputSuggestedStops_Focus = function (a) {
    pg.inputActive !== a && (pg.inputActive = a, pg.stopsSuggestedForText = pg[pg.inputActive.id] ? pg.inputActive.value : null),
    pg.inputActive.className === "empty" && (pg.inputActive.className = "", pg.inputActive.value = "");
    pg.timerSuggestedStopsShow === !1 ? pg.timerSuggestedStopsShow = 0 : (pg.fSuggestedStopsShow(!0), pg.inputActive.select(), pg.timerSuggestedStopsShow === 0 && (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
},
pg.inputSuggestedStops_Blur = function (a) {
    if (!document.activeElement || document.activeElement.id != "divSuggestedStops") pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow),
    pg.timerSuggestedStopsShow = 0,
    a && !a.value && (a.value = a.id == "inputFinish" ? i18n.finishStop : i18n.startStop, a.className = "empty"),
    pg.timerSuggestedStopsHide || (pg.timerSuggestedStopsHide = setTimeout(function () {
        pg.timerSuggestedStopsHide = 0,
        a && a.id == "inputStop" && a.value != pg.inputStopText && pg.fSuggestedStopsSelectFirst(a),
        pg.timerSuggestedStopsShow || pg.fSuggestedStopsHide()
    }, 200))
},
pg.divSuggestedStops_Blur = function () {
    (!document.activeElement || !pg.inputActive || document.activeElement.id !== pg.inputActive.id) && pg.inputSuggestedStops_Blur(pg.inputActive)
},
pg.fSuggestedStopsShow = function (a) {
    if (pg.inputActive) {
        var b = pg.inputActive.value,
            c = $("divSuggestedStops");
        if (a !== !0 && pg.stopsSuggestedForText === b && c.style.display === "block") return;
        if (a !== !0 && pg.stopLastTyped !== b) {
            pg.stopLastTyped = b;
            return
        }
        pg.stopsSuggestedForText != b && pg.inputStopText != pg.stopSuggestedForMap && (pg[pg.inputActive.id] = ""),
        pg.stopLastTyped = b,
        typeof ti.stops === "object" && (pg.stopsSuggestedForText = b);
        var d = [];
        if (b.length < 2 || typeof ti.stops != "object") d.push("<a id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + (typeof ti.stops != "object" ? i18n.receivingData : i18n.typeSomeChars) + "</a>");
        else {
            var e = ti.fGetStopsByName(pg.stopSuggestedForMap || b);
            if (e.length == 0) d.push("<a id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + i18n.noStopsFound + "</a>");
            else {
                var f = "," + pg[pg.inputActive.id] + ",";
                for (var g = 0; g < e.length; g++) {
                    var h = e[g],
                        i = [];
                    h.city && !cfg.cities[pg.city].skipStopCity && i.push(h.city),
                    h.area && !cfg.cities[pg.city].skipStopArea && i.push(h.area),
                    h.streets && i.push(h.streets),
                    i = i.length > 0 ? "<span class=\"details\"> (" + i.join(", ") + ")</span>" : "",
                    i = "<a id=\"" + h.id + "\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></span>" + (f.indexOf("," + h.id + ",") >= 0 ? "<strong>" + h.name + "</strong>" : h.name) + i + "</a>",
                    !1 && f.indexOf("," + h.id + ",") >= 0 ? d.splice(0, 0, i) : d.push(i)
                }
            }
        }
        d.push("<a id=\"aSuggestShowMap\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_stops\"></span>" + i18n.selectFromMap + "</a>"),
        c.innerHTML = d.join("");
        if (pg.inputActive.offsetHeight) {
            var j = pg.inputActive.offsetLeft,
                k = pg.inputActive.offsetTop + pg.inputActive.offsetHeight + 1;
            pg.inputActive.id !== "inputStop" && ($("divContentWrapper").offsetLeft === 0 || j < $("divContentWrapper").offsetLeft || cfg.searchOnly) && (k += $("tblContentPlannerOptions").offsetTop, j += $("tblContentPlannerOptions").offsetLeft),
            pg.inputActive.id === "inputStop" && $("divContentWrapper").offsetLeft === 0 && (k = 0),
            pg.inputActive.id !== "inputStop" && j < $("divContentWrapper").offsetLeft && (j += $("divContentWrapper").offsetLeft, k += $("divContentWrapper").offsetTop),
            c.style.top = k + "px",
            c.style.left = j + "px"
        }
        pg.inputActive.offsetWidth > 2 && (c.style.minWidth = pg.inputActive.offsetWidth - 2 + "px"),
        c.scrollTop = 0,
        c.style.overflowX = "hidden",
        c.style.overflowY = d.length > 6 ? "scroll" : "hidden",
        c.style.height = d.length > 6 ? "156px" : "auto",
        c.style.display = "block";
        var l = $("frameHideSelects");
        l && (l.style.left = c.style.left, l.style.width = c.offsetWidth + "px", l.style.top = c.style.top, l.style.height = c.offsetHeight + "px", l.style.display = "block")
    }
},
pg.fSuggestedStopsHide = function () {
    pg.stopSuggestedForMap = "",
    $("divSuggestedStops").style.display != "none" && ($("divSuggestedStops").style.display = ($("frameHideSelects") || {
        style: {}
    }).style.display = "none")
},
pg.divSuggestedStops_MouseDown = function (a) {
    var b = a && (a.target || a.srcElement);
    return !b || b.id !== "divSuggestedStops"
},
pg.eSuggestedStops_Click = function (a) {
    pg.timerSuggestedStopsHide && (clearTimeout(pg.timerSuggestedStopsHide), pg.timerSuggestedStopsHide = 0);
    var b = a && (a.target || a.srcElement),
        c = b && (b.className || "").toLowerCase();
    b && !b.id && (b = b.parentNode);
    if (!b) return pg.cancelEvent(a);
    if (c && c.indexOf("map") >= 0) {
        pg.inputStopText = pg.stopSuggestedForMap = pg.stopSuggestedForMap || pg.stopsSuggestedForText;
        if (pg.transport == "plan") {
            var d;
            pg.inputActive.id === "inputStart" ? (pg.loadedPlannerParams = "clear start", d = "plan/" + b.id + "/" + (pg.inputFinish || "")) : (pg.loadedPlannerParams = "clear finish", d = "plan/" + (pg.inputStart || "") + "/" + b.id),
            Hash.go(d + "/map")
        } else Hash.go("stop/" + b.id + "/map");
        setTimeout(function () {
            try {
                pg.inputActive.focus()
            } catch (a) {}
        }, 100)
    }
    if (b.id && b.id.indexOf("ShowMap") >= 0) {
        pg.fSuggestedStopsHide(),
        pg.fUrlSetMap({});
        return pg.cancelEvent(a)
    }
    if (b.id && b.id.indexOf("MoreChars") < 0) {
        var e = ti.fGetAnyStopDetails(b.id);
        pg.inputActive.value = e.name,
        pg.inputActive.className = "",
        pg.stopsSuggestedForText = e.name,
        pg[pg.inputActive.id] = b.id,
        pg.fSuggestedStopsHide(),
        pg.timerSuggestedStopsShow = !1,
        pg.inputSuggestedStops_KeyDown(null, -13)
    } else {
        try {
            pg.inputActive.focus()
        } catch (f) {}
        pg[pg.inputActive.id] = ""
    }
    return pg.cancelEvent(a)
},
pg.inputSuggestedStops_KeyDown = function (a, b) {
    pg.stopSuggestedForMap = "",
    b || (b = window.event ? window.event.keyCode : a.keyCode);
    b == 27 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow), pg.timerSuggestedStopsShow = 0, pg.fSuggestedStopsHide()) : b == 13 || b == -13 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow), pg.timerSuggestedStopsShow = 0, b == 13 && pg.fSuggestedStopsSelectFirst(), pg[pg.inputActive.id] && pg.fSuggestedStopsHide(), pg.inputActive.id === "inputStop" ? pg.inputStop && pg.fTabStop_Click(pg.inputStop) : (pg.loadedPlannerParams != pg.inputStart + "/" + pg.inputFinish && (pg.loadedPlannerParams = "clear results"), pg.fTabPlanner_Click(pg.inputStart, pg.inputFinish), pg.inputActive.id === "inputStart" && pg.inputStart && !pg.inputFinish ? setTimeout(function () {
        try {
            $("inputFinish").focus()
        } catch (a) {}
    }, 100) : pg.inputActive.id === "inputFinish" && pg.inputFinish && !pg.inputStart ? setTimeout(function () {
        try {
            $("inputStart").focus()
        } catch (a) {}
    }, 100) : pg.inputStart && pg.inputFinish && setTimeout(function () {
        try {
            $("buttonSearch").focus()
        } catch (a) {}
    }, 100))) : b != 9 && (pg.inputActive.className == "empty" && (pg.inputActive.value = "", pg.inputActive.className = ""), pg.fSuggestedStopsShow(), pg.timerSuggestedStopsShow || (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
},
pg.fSuggestedStopsSelectFirst = function (a) {
    a = a || pg.inputActive;
    if (a) {
        pg[a.id] = "";
        if (a.value && a.value.length >= 2) {
            var b = ti.fGetStopsByName(a.value);
            b.length > 0 && (a.value != b[0].name && (a.value = b[0].name), pg.stopsSuggestedForText = b[0].name, pg[a.id] = b[0].id, a.id === "inputStop" && pg.fLoadDepartingRoutes())
        }
    }
},
pg.fTabStop_Click = function (a) {
    pg.fUrlSet({
        transport: "stop",
        inputStop: a || pg.inputStop
    });
    return !1
},
pg.fTabPlanner_Click = function (a, b) {
    pg.fUrlSet({
        transport: "plan",
        inputStart: a || pg.inputStart || pg.inputStop,
        inputFinish: b || pg.inputFinish
    });
    return !1
},
pg.fTabActivate = function () {
    var a = pg.city + "_" + pg.transport;
    pg.transport || (a = "city", cfg.cities[pg.city] && pg.city !== pg.fGetCity(pg.city) && (a = "region"));
    var b = $("divNav").getElementsByTagName("a");
    for (var c = b.length; --c >= 0;) b[c].id === a ? b[c].className = "active" : b[c].className.indexOf("active") >= 0 && (b[c].className = "");
    $("dt_stop").className = pg.transport === "stop" ? "active" : "";
    if (pg.transport === "stop") pg.loadedDepartingRoutes !== pg.inputStop && setTimeout(pg.fLoadDepartingRoutes, 10);
    else if (pg.transport === "plan") {
        $("plan").className = "active",
        pg.loadedPlannerParams !== pg.inputStart + "/" + pg.inputFinish && setTimeout(pg.fLoadPlannerTab, 10);
        var d = "" + $("inputTime").value;
        d.trim() === "" && (d = ti.dateToMinutes(new Date) % 1440, $("inputTime").value = ti.printTime(d))
    } else if (!pg.loadedRoutesHash || pg.loadedRoutesHash.indexOf(pg.city + "/" + pg.transport + "/") != 0) $("inputRoutes").value = pg.routesFilter = "",
    pg.inputRoutes_Blur(),
    pg.fLoadRoutesList();
    $("divContentRoutes").style.display = pg.transport === "stop" || pg.transport === "plan" ? "none" : "block",
    $("divContentDepartingRoutes").style.display = pg.transport === "stop" ? "block" : "none",
    $("divContentPlanner").style.display = pg.transport === "plan" ? "block" : "none"
},
pg.fLoadRoutesList = function () {
    var a = $("divContentRoutesResults");
    if (typeof ti.routes !== "object") pg.loadedRoutesHash = "",
    a.innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadRoutesList, 200);
    else {
        var b = $("inputRoutes").className == "empty" ? "" : ti.toAscii($("inputRoutes").value, 2);
        if (b && pg.routesFilter != b) {
            pg.routesFilter = b,
            setTimeout(pg.fLoadRoutesList, 200);
            return
        }
        pg.routesFilter = b;
        if (pg.loadedRoutesHash == pg.city + "/" + pg.transport + "/" + b) return;
        pg.loadedRoutesHash = pg.city + "/" + pg.transport + "/" + b;
        var c = ti.fGetRoutes(pg.city, pg.transport, null, null, null, b);
        if (!c || !c.length) {
            a.innerHTML = "<br/>&nbsp;" + i18n.noRoutesFound;
            return
        }
        var d = function () {
            var a = [];
            a.push("<table id=\"tblRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            for (var b = 0; b < c.length; b++) a.push(pg.fMakeRouteRowHTML(c[b], "tblRoutes", b));
            a.push("</tbody></table><br/>");
            var d = cfg.cities[pg.city].footer;
            d = d && (d[pg.language] || d.en),
            d && a.push(d);
            if (!cfg.isMobilePage) {
                cfg.programmedBy && a.push("<p id=\"programmedBy\" class=\"smalltext graytext\">" + (cfg.programmedBy[pg.language] || cfg.programmedBy.en || "") + "</p>");
                var e = cfg.cities[cfg.defaultCity].webcounter;
                e && (a.push("<a id=\"webcounter\" href=\"http://whos.amung.us/stats/" + e + "\" target=\"_blank\" style=\"float:right; position:relative; bottom:20px; padding:10px;\">"), a.push("<img width=\"80\" height=\"15\" border=\"0\" title=\"web tracker\" alt=\"web tracker\" src=\"http://whos.amung.us/swidget/" + e + ".gif\"></a>"))
            }
            pg.replaceHtml($("divContentRoutesResults"), a.join(""))
        };
        if (pg.browserVersion <= 8 && c.length > 25 && !b) {
            a.innerHTML = "<br/>" + i18n.loading,
            setTimeout(d, 100);
            return
        }
        d()
    }
},
pg.fLoadDepartingRoutes = function () {
    pg.loadedDepartingRoutes = null;
    var a = $("divContentDepartingRoutesResults"),
        b = ti.fGetAnyStopDetails(pg.inputStop);
    if (b.id) $("inputStop").value = pg.inputStopText = b.name || "",
    $("inputStop").className = "",
    pg.startStop || (pg.startStop = pg.inputStop);
    else if (!pg.inputStop && typeof ti.stops == "object") {
        var c = pg.fUrlSet({
            hashForMap: "map"
        }, !0);
        $("divContentDepartingRoutesHeader").style.display = "none",
        a.innerHTML = ("<p class=\"help\">" + i18n.searchDeparturesHelp + "<p/><p class=\"help\">" + i18n.tripPlannerHelpMap).replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + c + "\">"),
        document.activeElement && document.activeElement.id !== "inputStop" && ($("inputStop").value = i18n.startStop, $("inputStop").className = "empty", setTimeout(function () {
            try {
                $("inputStop").focus()
            } catch (a) {}
        }, 100));
        return
    }
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") a.innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadDepartingRoutes, 200);
    else {
        pg.loadedDepartingRoutes = pg.inputStop,
        pg.stopsSuggestedForText = b.name;
        var d = (b.street ? ", " + b.street : "") + (b.area && !cfg.cities[pg.city].skipStopArea ? ", " + b.area : "") + (b.city && !cfg.cities[pg.city].skipStopCity ? ", " + b.city : "");
        b[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (d += ", " + i18n.fareZone + " " + b[cfg.cities[pg.city].stopFareZone]),
        d = d.length > 0 ? "<span class=\"details\"> (" + d.substring(2) + ")</span>" : "";
        var e = [],
            c = pg.fUrlSet({
                hashForMap: "map"
            }, !0),
            f = ti.fGetRoutesAtStop(pg.inputStop, !1),
            g = {},
            h = null,
            e = [];
        for (var i = 0; i < f.length; i++) {
            var j = f[i],
                k = ti.toAscii([j.city, j.transport, j.num].join(","), !0);
            if (g[k]) continue;
            var l = {
                city: j.city,
                transport: j.transport,
                num: ti.toAscii(j.num, !0),
                dirType: j.dirType,
                stopId: j.stopId
            };
            g[k] = l;
            var m = pg.fUrlSet({
                schedule: l
            }, !0);
            h !== j.transport && (h = j.transport, e.push(" <span class=\"icon icon_narrow icon_" + j.transport + "\" data-transport=\"" + j.transport + "\"></span>&nbsp;"));
            var n = "<a class=\"hover transfer" + h + "\" href=\"#" + m + "\" title=\"" + (j.name || "").replace(/"/g, "") + "\">" + f[i].num.replace(/\s/g, "&nbsp;") + "</a> ";
            e.push(n)
        }
        e.push("<span style=\"display:inline-block; width:2px;\"></span>"),
        $("spanContentDepartingRoutesStop").innerHTML = "<a href=\"#" + c + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a>" + i18n.stop + " <strong>" + b.name + "</strong>" + d + e.join("") + "<br />",
        e = [];
        var o = new Date,
            p = +$("inputDepartureDate").value;
        p < 0 ? (p = o, startTime = ti.dateToMinutes(o) % 1440) : (p = new Date(o.getFullYear(), o.getMonth(), o.getDate() + p), startTime = -1);
        var q = {
            start_stops: pg.inputStop,
            finish_stops: "",
            date: p,
            weekdaydirect: p.getDay() || 7,
            transport: {}
        },
            r = dijkstra(q, 0 * startTime, 0);
        if (!r || !r.length) {
            a.innerHTML = "<br/>" + i18n.noDepartingRoutes;
            return
        }
        e.push("<table id=\"tblDepartingRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
        for (var s = 0, t = 0, u = ""; s < r.length; s++) {
            var j = r[s].route,
                v = ti.toAscii(j.city + ";" + j.transport + ";" + j.num + ";" + j.name, !0);
            u != v ? (u = v, t = s, r[t].route.departures = [r[s].start_time], r[t].route.tripNums = [r[s].tripNum]) : (r[t].route.departures.push(r[s].start_time), r[t].route.tripNums.push(r[s].tripNum))
        }
        for (var s = 0, t = 0; s < r.length; s++) r[s].route.departures && (e.push(pg.fMakeRouteRowHTML(r[s].route, "tblDepartingRoutes", t, startTime)), ++t);
        a.innerHTML = e.join("") + "</tbody></table>",
        $("divContentDepartingRoutesHeader").style.display = ""
    }
},
pg.fLoadPlannerTab = function (a) {
    a === !0 && (pg.optimalResults = null, pg.loadedPlannerParams = null, pg.hashForMap = "");
    var b = "" + $("inputTime").value;
    b === "" ? (b = ti.dateToMinutes(new Date) % 1440, $("inputTime").value = ti.printTime(b)) : b = ti.toMinutes(b);
    var c = ti.fGetAnyStopDetails(pg.inputStart),
        d = ti.fGetAnyStopDetails(pg.inputFinish);
    d.id ? ($("inputFinish").value = d.name || "", $("inputFinish").className = "") : !pg.inputFinish && typeof ti.stops == "object" && ($("divContentPlannerResults").innerHTML = i18n.typeFinishStop, document.activeElement && document.activeElement.id !== "inputFinish" && ($("inputFinish").value = i18n.finishStop, $("inputFinish").className = "empty"));
    if (c.id) $("inputStart").value = c.name || "",
    $("inputStart").className = "";
    else if (!pg.inputStart || typeof ti.stops == "object") $("divContentPlannerResults").innerHTML = i18n.typeStartStop,
    document.activeElement && document.activeElement.id !== "inputStart" && ($("inputStart").value = i18n.startStop, $("inputStart").className = "empty");
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") $("divContentPlannerResults").innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadPlannerTab, 200);
    else {
        if (!pg.inputStart && !pg.inputFinish || (pg.loadedPlannerParams || "").indexOf("clear") >= 0) {
            pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish,
            pg.optimalResults = null,
            pg.hashForMap && pg.hashForMap != "map" && (pg.map = {}, pg.hashForMap = "map", pg.fMapShow());
            var e = pg.fUrlSet({
                hashForMap: "map"
            }, !0);
            $("divContentPlannerResults").innerHTML = "<p class=\"help\">" + i18n.tripPlannerHelp + "</p><p class=\"help\">" + i18n.tripPlannerHelpMap.replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + e + "\">") + "</p>";
            return
        }
        pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish;
        if (!c.id || !d.id) return;
        var f = new Date,
            g = new Date(f.getFullYear(), f.getMonth(), f.getDate() + +$("inputDate").value),
            h = {
                start_stops: pg.inputStart,
                finish_stops: pg.inputFinish,
                reverse: parseInt($("inputReverse").value, 10),
                date: g,
                start_time: b,
                lowFloor: $("checkHandicapped").checked,
                transport: {},
                route_nums: ("" || $("inputRoutesFilter").value).trim(),
                walk_speed_kmh: parseInt($("inputWalkSpeed").value || 4, 10),
                walk_max: $("inputWalkMax").value,
                change_time: parseInt($("inputChangeTime").value || 3, 10),
                callback1: pg.fPrintOptimalTrips,
                callback: pg.fPrintOptimalTrips
            },
            i = pg.fGetCity(pg.city);
        for (var j = 1; j <= 2; j++) {
            for (var k = 0, l = cfg.cities[i].transport; k < l.length; k++) h.transport[l[k]] = ($("checkbox" + l[k]) || {
                checked: !0
            }).checked;
            i = cfg.cities[i].region;
            if (!i || !cfg.cities[i]) break
        }
        $("divContentPlannerResults").innerHTML = "<br/>" + i18n.calculating,
        setTimeout(function () {
            ti.findTrips(h)
        }, 100)
    }
},
pg.fPrintOptimalTrips = function (a, b) {
    pg.optimalResults = a,
    pg.map = {};
    var c = [];
    for (var d = 0; d < a.length; d++) {
        var e = a[d],
            f = a[d].legs,
            g = [],
            h = [];
        for (var i = 0; i < f.length; i++) {
            var j = f[i],
                k = j.route;
            if (k && k.transport) {
                h.push("<span class=\"icon icon_narrow icon_" + k.transport + "\" title=\"" + i18n.transport1[k.transport] + " " + k.num + " " + i18n.towards + " " + k.name + "\"></span>"),
                k.stopId = j.start_stop.id,
                k.tripNum = (j.trip_num || -1) + 1;
                var l = pg.fUrlSet({
                    schedule: k,
                    mapHash: ""
                }, !0);
                g.push("<p class=\"results\"><span class=\"icon icon_" + j.route.transport + "\"></span><span class=\"num num" + Math.min(j.route.num.length, 4) + " " + j.route.transport + "\">" + j.route.num + "</span>" + (cfg.searchOnly ? "" : "<a class=\"hover\" href=\"#" + l + "\" title=\"" + i18n.showSchedule + "\">") + i18n.transport1[j.route.transport] + " " + i18n.towards + "&nbsp;" + j.route.name + (cfg.searchOnly ? "" : "</a>") + " <br/><strong>" + ti.printTime(j.start_time) + " " + j.start_stop.name + "</strong> &rarr; " + ti.printTime(j.finish_time) + " " + j.finish_stop.name + "<span class=\"graytext\"> (" + i18n.ride + " " + (j.finish_time - j.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p>")
            } else {
                if (j.start_time == j.finish_time && parseInt(j.start_stop.id, 10) == parseInt(j.finish_stop.id, 10)) continue;
                h.push("<span class=\"icon icon_narrow icon_walk\" title=\"" + i18n.walk + " " + (j.finish_time - j.start_time) + "&nbsp;" + i18n.minutesShort + "\"></span>"),
                g.push("<p class=\"results\"><span class=\"icon icon_walk\"></span><strong>" + ti.printTime(j.start_time) + " " + j.start_stop.name + "</strong> &rarr; " + ti.printTime(j.finish_time) + " " + j.finish_stop.name + "<span class=\"graytext\"> (" + i18n.walk + " " + (j.finish_time - j.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p></a>")
            }
        }
        c.push("<div" + (d % 2 ? "" : " class=\"grey\"") + " style=\"border-bottom: solid 1px gray; padding:5px 0 5px 5px;\"><table><tbody><tr><td><a href=\"\" onclick=\"return false;\" title=\"" + (d ? i18n.showDetails : i18n.hideDetails) + "\" class=\"" + (d ? "expand" : "collapse") + "\"><span class=\"icon\"></span><strong class=\"hover\">" + i18n.option + "&nbsp;" + (d + 1) + ".</strong></a> <a href=\"#" + pg.city + "/" + pg.transport + "/map,,," + (d + 1) + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a> " + ti.printTime(e.start_time, null, "&#x2007;") + " &mdash; " + ti.printTime(e.finish_time, null, "&#x2007;") + "</span>,</td><td style=\"white-space:pre-wrap;\">" + i18n.travelDuration + "&nbsp;<strong>" + ti.printTime(e.travel_time) + "</strong>  <span style=\"white-space:nowrap;\">" + h.join("") + "</span></td></tr></tbody></table><div class=\"RouteDetails\" style=\"" + (d ? "display:none;" : "") + "\">"),
        c.push(g.join("") + "</a></div></div>")
    }
    a.length > 0 ? (pg.fTogglePlannerOptions(!1), b && document.body.className.indexOf("Map") >= 0 && (pg.mapShowAllStops = !1, pg.fUrlSetMap({
        optimalRoute: 1
    }))) : c.push("<br/>" + i18n.noOptimalRoutes);
    var m = $("divContentPlannerResults");
    m.innerHTML = c.join("")
},
pg.fMakeRouteRowHTML = function (a, b, c, d) {
    var e, f = "map," + a.city + "," + a.transport + "," + a.num;
    f = ti.toAscii(f, !0),
    b == "tblRoutes" ? (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType
        },
        hashForMap: ""
    }, !0), pg.routesFilter && (f += "," + a.dirType), f = pg.fUrlSet({
        hashForMap: f
    }, !0)) : (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType,
            stopId: a.stopId
        },
        hashForMap: ""
    }, !0), f = pg.fUrlSet({
        hashForMap: f + "," + a.dirType + "," + a.stopId
    }, !0));
    var g = "<a style=\"display:inline-block\" href=\"#" + e + "\" title=\"" + i18n.showSchedule + "\">",
        h = "",
        i = (a.validityPeriods || "").split(",")[0];
    i = isNaN(i) ? "" : ": " + i18n.validFrom + " " + pg.formatDate(+i);
    for (var j = 1; j <= 7; j++) a.weekdays.indexOf(j) < 0 ? h += "<span class=\"blankday\" title=\"" + i18n["weekdays" + j] + ": " + i18n.routeNotOperate + "\">" + i18n.weekdaysShort[j] + "</span>" : h += "<span" + (j >= 6 ? "" : " class=\"weekend\"") + " title=\"" + i18n["weekdays" + j] + i + "\">" + i18n.weekdaysShort[j] + "</span>";
    cfg.city.planHandicappedOption !== !1 && (a.weekdays.indexOf("z") >= 0 && (h += "<img src=\"images/handicapped.png\" alt=\"low floor\" title=\"" + i18n.lowFloorVehicles + "\" />"));
    var k = g + (!0 || b == "tblDepartingRoutes" ? "" : "<span class=\"icon icon_expand\" title=\"" + i18n.showDetails + "\"></span>") + "<span class=\"icon icon_" + a.transport + "\"></span>";
    a.transport == "train" ? k += "<span style=\"display:none;\">" + a.num + "</span>" : k += "<span class=\"num num" + Math.min(a.num.length, 4) + " " + a.transport + "\">" + a.num + "</span>";
    var l = "<span class=\"hover\">" + a.name + ((a.commercial || "").indexOf("E") >= 0 ? " (" + i18n.express + ")" : "") + "</span>";
    l = "<tr" + (b != "tblDepartingRoutes" && c % 2 != 0 ? " class=\"white\"" : "") + "><td class=\"routeName\"><a class=\"icon icon_map\" title=\"" + i18n.showInMap + "\" href=\"#" + f + "\"></a>" + k + l + "</a>",
    l += "</td><td class=\"weekdays\"><a href=\"#" + e + "\">" + h + "</a></td><td class=\"lastcol\"></td></tr>";
    if (b === "tblDepartingRoutes") {
        if (cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[a.transport] && a.departures.length && a.departures[0] >= 0) if (("," + pg.inputStop + ",").indexOf("," + a.stops[0] + ",") < 0) {
            l += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\">",
            l += "</td></tr>";
            return l
        }
        l += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\"><span><span class=\"icon icon_collapse\"></span><span class=\"icon";
        var m = Infinity,
            n = Infinity,
            o = 0,
            p = 18;
        for (var q = a.departures.length; --q >= 0;) {
            var r = a.departures[q];
            if (r < 0) continue;
            if (r < d) break;
            ++o;
            var s = ~~ (r / 60);
            if (m != s) {
                if (++o > p && r < d) break;
                m = s
            }
            n = r
        }
        q < 0 && o < p ? l += "\">" : l += " icon_expand\" title=\"" + i18n.stopShowAllDepartures + "\">";
        var t = -1;
        o = 0;
        for (q = 0; q < a.departures.length; ++q) {
            var r = a.departures[q];
            if (r < 0) continue;
            var s = ~~ (r / 60);
            r >= n && ++o,
            t != s && (t = s, r >= n && ++o, l += "</span></span><span style=\"display:inline-block;\"><span class=\"DeparturesHour" + (s < m || o > p ? " collapse\"" : "") + "\">&nbsp;" + s % 24 + "</span><span style=\"vertical-align:top\"" + (r < n || o > p ? " class=\"collapse\"" : "") + ">&#x200A;"),
            r == n && (l += "</span><span style=\"vertical-align:top\">"),
            o == p + 1 && (l += "</span><span style=\"vertical-align:top\" class=\"collapse\">"),
            r = r % 60,
            l += (r < 10 ? "0" : "") + r + " "
        }
        t === -1 ? l += "</span><span>" + i18n.routeNotOperate : o ? o > p && (l += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">...") : l += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">" + i18n.stopLatestDeparture + "&nbsp;" + ti.printTime(a.departures[a.departures.length - 1]),
        l += "</span></span></td></tr>",
        (t === -1 || !o) && a.dirType.indexOf("d") >= 0 && (l = "")
    }
    return l
},
pg.fContent_Click = function (a) {
    pg.stopSuggestedForMap && (pg.stopSuggestedForMap = "", pg.fSuggestedStopsHide());
    var b = a && (a.target || a.srcElement);
    if (!b) return !0;
    var c, d, e;
    for (var f = b; f; f = f.parentNode) {
        if ((f.tagName || "").toLowerCase() === "tr") break;
        d || (c = f && (f.className || "").toLowerCase(), c.indexOf("expand") < 0 ? c.indexOf("collapse") < 0 ? c.indexOf("false") < 0 ? (f.href || "").indexOf("#") >= 0 && (e = pg.fUrlParse(f.href), f.className.indexOf("map") < 0 ? e.schedule ? d = pg.fUrlSet({
            schedule: e.schedule
        }, !0) : (d = "hash", e.hashForMap = e.hashForMap || pg.hashForMap, e.language = pg.language) : d = pg.fUrlSet({
            hashForMap: e.hashForMap
        }, !0)) : (d = "false", b = f) : (d = "collapse", b = f) : (d = "expand", b = f));
        if ((f.tagName || "").toLowerCase() === "a") {
            if (f.target == "_blank") return !0;
            break
        }
        if ((f.className || "").toLowerCase() === "departuresrow" && d === "expand") {
            d = "",
            f.className = "DeparturesRowFull";
            break
        }
        if ((f.className || "").toLowerCase() === "departuresrowfull" && d === "collapse") {
            d = "",
            f.className = "DeparturesRow";
            break
        }
    }
    var g = [];
    while (f) {
        f = f.parentNode,
        g = f && f.getElementsByTagName("div") || [];
        if (g.length) break
    }
    if (d == "expand") b.className = b.className.replace("expand", "collapse"),
    b.title = i18n.hideDetails,
    (g[0] || {
        style: {}
    }).style.display = "",
    pg.schedule && (pg.scheduleDetailsExpanded = !0),
    d = "";
    else if (d == "collapse") b.className = b.className.replace("collapse", "expand"),
    b.title = i18n.showDetails,
    (g[0] || {
        style: {}
    }).style.display = "none",
    pg.schedule && (pg.scheduleDetailsExpanded = !1),
    d = "";
    else if (d == "hash") pg.fUrlSet(e),
    d = "";
    else if (d == "false") return !1;
    if (d || d === "") {
        d && Hash.go(d);
        return pg.cancelEvent(a)
    }
    return !0
},
pg.inputRoutes_KeyDown = function (a, b) {
    var c = $("inputRoutes");
    b || (b = window.event ? window.event.keyCode : a.keyCode),
    b == 27 ? (c.value = "", setTimeout(pg.fLoadRoutesList, 200)) : b != 9 && (c.className == "empty" && (c.value = "", c.className = ""), pg.routesFilter = "", setTimeout(pg.fLoadRoutesList, 200))
},
pg.inputRoutes_Focus = function () {
    $e = $("inputRoutes"),
    $e.className === "empty" && ($e.className = "", $e.value = "")
},
pg.inputRoutes_Blur = function () {
    $e = $("inputRoutes"),
    $e && !$e.value && ($e.value = i18n.typeRouteNameOrNumber, $e.className = "empty")
};

function getElementsByClassName(a, b) {
    if (!b) return [];
    return typeof b.getElementsByClassName != "undefined" ? b.getElementsByClassName(a) : document.getElementsByClassName2(a, b)
}
function getWindowWidth() {
    var a = 0;
    typeof window.innerWidth == "number" ? a = window.innerWidth : document.documentElement && document.documentElement.clientWidth ? a = document.documentElement.clientWidth : document.body && document.body.clientWidth && (a = document.body.clientWidth);
    return a
}
var timeout_id = null;

function showDepartureSelect() {
    timeout_id && clearTimeout(timeout_id);
    var a = $("inputTime"),
        b = 0;
    pg.mobile ? (b = 14, $("departure_select").style.top = "178px") : b = $("timeType").offsetWidth + $("stopInput").offsetWidth + 28,
    $("departure_select").style.left = b + "px",
    add_classname(a, "focus"),
    remove_classname($("departure_select"), "hidden"),
    a.focus()
}
function hideDepartureSelect() {
    timeout_id = window.setTimeout(function () {
        remove_classname($("inputTime"), "focus"),
        add_classname($("departure_select"), "hidden")
    }, 200)
}
function DepartureSelect(a) {
    a && ($("inputTime").value = a == 1 ? i18n.earliestDeparture || "pirmais reiss" : i18n.latestDeparture || "pēdējais reiss")
}
function show_timetable_menu(a) {
    try_focus(a),
    add_classname($("mobile_timetable_select"), "active"),
    $("mobileScheduleMenu").style.display = "block"
}
function hide_timetable_menu() {
    remove_classname($("mobile_timetable_select"), "active", 200),
    window.setTimeout(function () {
        $("mobileScheduleMenu").style.display = "none"
    }, 200)
}
function show_timetable(a, b) {
    var c = document.getElementsByClassName2("timetable", $("divScheduleContentInner"));
    remove_classname(c, "visible");
    var d = "days_" + a,
        e = document.getElementsByClassName2(d, $("divScheduleContentInner"));
    add_classname(e, "visible"),
    $("mobile_days").innerHTML = pg.fWeekdaysName(a),
    b && (remove_classname((b.parentNode || b.parentElement).getElementsByTagName("a"), "bold"), add_classname(b, "bold"), $("mobileScheduleMenu").style.display = "none")
}
document.getElementsByClassName2 = function (a, b, c) {
    var d = new Array;
    b == null && (b = document),
    c == null && (c = "*");
    var e = b.getElementsByTagName(c),
        f = e.length,
        g = new RegExp("(^|\\s)" + a + "(\\s|$)");
    for (i = 0, j = 0; i < f; i++) g.test(e[i].className) && (d[j] = e[i], j++);
    return d
};

function add_classname(a, b) {
    if (typeof a.length == "number") for (var c = 0; c < a.length; c++) add_classname(a[c], b);
    else {
        names = a.className.split(" "),
        found = !1;
        for (var c = 0; c < names.length; c++) if (names[c] == b) {
            found = !0;
            break
        }
        found || (names.push(b), a.className = names.join(" "))
    }
}
function has_classname(a, b) {
    names = a.className.split(" ");
    for (var c = 0; c < names.length; c++) if (names[c] == b) return !0;
    return !1
}
function remove_classname(a, b, c) {
    if (c) window.setTimeout(function () {
        remove_classname(a, b)
    }, c);
    else if (typeof a.length == "number") for (var d = 0; d < a.length; d++) remove_classname(a[d], b);
    else {
        names = a.className.split(" ");
        for (var d = 0; d < names.length; d++) if (names[d] == b) {
            names.splice(d, 1),
            a.className = names.join(" ");
            break
        }
    }
}
pg.fTabActivate = function () {
    var a = $("divNavRiga").getElementsByTagName("a");
    remove_classname(a, "active");
    if (pg.hashForMap == "map,page") add_classname($("aShowMap"), "active");
    else if (pg.transport === "stop") add_classname($("dt_stop"), "active"),
    pg.loadedDepartingRoutes !== pg.inputStop && setTimeout(pg.fLoadDepartingRoutes, 10);
    else if (pg.transport === "plan") {
        add_classname($("plan"), "active"),
        pg.loadedPlannerParams !== pg.inputStart + "/" + pg.inputFinish && setTimeout(pg.fLoadPlannerTab, 10);
        var b = "" + $("inputTime").value;
        b.trim() === "" && (b = ti.dateToMinutes(new Date) % 1440, $("inputTime").value = ti.printTime(b), $("inputTime").defaultValue = ti.printTime(b))
    } else pg.loadedRoutesHash && pg.loadedRoutesHash.indexOf(pg.city + "/" + pg.transport + "/") == 0 ? add_classname($("routes"), "active") : (add_classname($("routes"), "active"), $("inputRoutes").value = pg.routesFilter = "", pg.inputRoutes_Blur(), pg.fLoadRoutesList());
    var c = pg.transport === "stop" || pg.transport === "plan";
    $("divTransportTabs").style.display = c ? "none" : "block",
    $("divContentContainer").style.display = c ? "none" : "block",
    $("divContentDepartingRoutes").style.display = pg.transport === "stop" ? "block" : "none",
    $("divContentPlanner").style.display = pg.transport === "plan" ? "block" : "none"
},
pg.fCreateNavigation = function () {
    var a = pg.fGetCity(pg.city),
        b = 0;
    if (cfg.cities[a]) {
        var c = "",
            d = "",
            e = {};
        for (var f = 1; f <= 2; f++) {
            var g = pg.fUrlSet({
                city: a,
                transport: null,
                hashForMap: null
            }, !0);
            if (!cfg.cities[a].goHomeTimeout) {
                c += "<li class=\"ttype-all first" + (pg.transport == "" ? " active" : "") + "\"><a class=\"tabItem\" id=\"" + (f == 1 ? "city" : "region") + "\" href=\"#" + g + "\">";
                var h = cfg.cities[a].name;
                h ? c += h[pg.language] || h.en || (f == 1 ? i18n.cityRoutes : i18n.regionRoutes) : c += f == 1 ? i18n.cityRoutes : i18n.regionRoutes,
                c += "</a></li>"
            }
            var i = cfg.cities[a].transport.length;
            for (var j = 0; j < i; j++) {
                var k = cfg.cities[a].transport[j],
                    l = " checked=\"checked\"";
                cfg.cities[a].transportPlannerUncheck && cfg.cities[a].transportPlannerUncheck[k] && (l = ""),
                g = pg.fUrlSet({
                    city: a,
                    transport: k,
                    hashForMap: null
                }, !0);
                var m = ((cfg.cities[a].transportTip || {})[k] || {})[pg.language];
                m && (m = " title=\"" + m + "\""),
                class_name = "ttype-" + k + (c.length == 0 ? " first" : "") + (j == i - 1 ? " last" : "") + (k == pg.transport ? " active" : ""),
                c += ("<li class=\"" + class_name + "\"><a class=\"tabItem\" id=\"" + a + "_{tr}\" href=\"#" + g + "\"" + m + ">" + i18n.transport[k] + "</a></li>").replace(/{tr}/g, k),
                e[k] || (e[k] = !0, d += ("<label for=\"checkbox{tr}\"><input name=\"checkbox{tr}\" id=\"checkbox{tr}\" type=\"checkbox\" value=\"{tr}\"" + l + "/>").replace(/{tr}/g, k) + i18n.transport[k] + "</label> "),
                cfg.transportOrder[k] = ++b
            }
            a = cfg.cities[a].region;
            if (!a || !cfg.cities[a]) break
        }
        $("listTransports").innerHTML = c,
        $("divContentPlannerOptionsTransport").innerHTML = i18n.optionsTransport + ":" + (pg.mobile ? "<br/>" : "") + d
    }
    cfg.transportOrder.commercialbus && cfg.transportOrder.regionalbus && (cfg.transportOrder.commercialbus = cfg.transportOrder.regionalbus)
},
pg.fCreateLanguagesBar = function () {
    var a = $("divLang"),
        b = "",
        c = cfg.city.languages.split(",");
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        if (cfg.city.languageFlags) b += "<a title=\"" + cfg.languages[e] + "\"><img src=\"" + e + ".png\" style=\"width:32px; height:26px; padding:0 5px;\"></a>";
        else {
            var f = pg.language == e ? "active" : "underlined";
            b += "<a title=\"" + cfg.languages[e] + "\" class=\"" + f + "\" href=\"#/" + e + "\">" + e + "</a>",
            cfg.city.navigation === "riga" && d % 3 === 2 ? b += " " : b += "&nbsp;"
        }
    }
    a.innerHTML = b
},
pg.fScheduleShow = function (a) {
    pg.schedule == null ? pg.fTabActivate() : pg.schedule && pg.schedule.transport != a.transport && pg.fCreateNavigation(),
    pg.schedule || (pg.schedulePane = 1, ($("spanReturnToRoutes") || {}).href = pg.urlPrevious, pg.urlUnderSchedulePane = pg.urlPrevious, pg.languageUnderSchedulePane = pg.language),
    document.body.className.indexOf("Schedule") < 0 && (document.body.className = "ScheduleDisplayed"),
    setTimeout(function () {
        try {
            $("aDir1").focus()
        } catch (a) {}
    }, 100);
    pg.schedule && pg.schedule.city == a.city && pg.schedule.transport == a.transport && pg.schedule.num == a.num && pg.schedule.dirType == a.dirType && pg.schedule.tripNum == a.tripNum ? (pg.schedule.dirType = a.dirType, pg.schedule.stopId = a.stopId, pg.fScheduleStopActivate()) : (pg.schedule = a, $("spanDir1").innerHTML = "&nbsp;", $("spanDir2").innerHTML = "&nbsp;", $("dlDirStops1").innerHTML = "&nbsp;", $("dlDirStops2").innerHTML = "&nbsp;", $("divScheduleContentInner").innerHTML = "<br/>" + i18n.loading, pg.fScheduleLoad())
},
pg.fFooter = function () {
    html = ["<br/>"];
    var a = cfg.cities[pg.city].footer;
    a = a && (a[pg.language] || a.en),
    a && html.push(a);
    if (!cfg.isMobilePage) {
        cfg.programmedBy && html.push("<p id=\"programmedBy\" class=\"smalltext graytext\">" + (cfg.programmedBy[pg.language] || cfg.programmedBy.en || "") + "</p>");
        var b = cfg.cities[cfg.defaultCity].webcounter;
        b && (html.push("<a id=\"webcounter\" href=\"http://whos.amung.us/stats/" + b + "\" target=\"_blank\" style=\"float:right; position:relative; bottom:20px; padding:10px;\">"), html.push("<img width=\"80\" height=\"15\" border=\"0\" title=\"web tracker\" alt=\"web tracker\" src=\"http://whos.amung.us/swidget/" + b + ".gif\"></a>"))
    }
    $("divRoutesFooter").innerHTML = html.join("")
};
var current_page_el = null;

function map_close(a) {
    elements = document.getElementsByClassName2("map_opened", a),
    remove_classname(elements, "map_opened"),
    add_classname(elements, "map_closed")
}
function map_open(a) {
    current_page_el != a && (map_close(current_page_el), current_page_el = a),
    elements = document.getElementsByClassName2("map_closed", a),
    remove_classname(elements, "map_closed"),
    add_classname(elements, "map_opened")
}
function getMapContainer(a) {
    map_container = document.getElementsByClassName2("map", a, "div");
    if (map_container && map_container.length) return map_container[0];
    return !1
}
function loadGmapTo(a) {
    mapdiv = $("divMap");
    if (mapdiv == null) a.innerHTML = "<div id='divMap'></div>";
    else if (!pg.mobile) {
        var b = mapdiv.parentNode;
        b != a && (b.removeChild(mapdiv), a.innerHTML = "", a.appendChild(mapdiv))
    }
}
pg.fLoadRoutesList = function () {
    var a = $("divContentRoutesResults");
    if (typeof ti.routes !== "object") pg.loadedRoutesHash = "",
    a.innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadRoutesList, 200);
    else {
        var b = $("inputRoutes").className == "empty" ? "" : ti.toAscii($("inputRoutes").value, 2);
        if (b && pg.routesFilter != b) {
            pg.routesFilter = b,
            setTimeout(pg.fLoadRoutesList, 200);
            return
        }
        pg.routesFilter = b;
        if (pg.loadedRoutesHash == pg.city + "/" + pg.transport + "/" + b) return;
        pg.fCreateNavigation(),
        pg.fFooter(),
        pg.loadedRoutesHash = pg.city + "/" + pg.transport + "/" + b;
        var c = ti.fGetRoutes(pg.city, pg.transport, null, null, null, b);
        if (!c || !c.length) {
            a.innerHTML = "<br/>&nbsp;" + i18n.noRoutesFound;
            return
        }
        var d = function () {
            var a = [],
                b = pg.hashForMap ? " map_opened" : " map_closed";
            a.push("<div class=\"routes_scroller\"><table id=\"tblRoutes\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            for (var d = 0; d < c.length; d++) a.push(pg.fMakeRouteRowHTML(c[d], "tblRoutes", d));
            a.push("</tbody></table></div>"),
            pg.replaceHtml($("divContentRoutesResults"), a.join(""))
        };
        if (pg.browserVersion <= 8 && c.length > 25 && !b) {
            a.innerHTML = "<br/>" + i18n.loading,
            setTimeout(d, 100);
            return
        }
        d()
    }
},
pg.fScheduleLoad = function () {
    pg.schedules = null,
    $("ulScheduleDirectionsList").style.display = "none";
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") setTimeout(pg.fScheduleLoad, 200);
    else {
        var a = ti.fGetRoutes(pg.schedule.city, pg.schedule.transport, pg.schedule.num, null, "0", null);
        if (!a.length) {
            $("divScheduleContentInner").innerHTML = "Error: route not found.";
            return
        }
        var b = null,
            c = [],
            d = {};
        for (var e = 0; e < a.length; e++) {
            var f = a[e],
                g = f.name,
                h = "";
            !b && pg.schedule.dirType && pg.schedule.dirType == f.dirType && (b = f, h = "strong");
            if (!d[g + f.dirType]) {
                d[g + f.dirType] = !0;
                var i = f.dirType.split("-"),
                    j = i[0],
                    k = i[i.length - 1];
                a.length > 1 && j != "a" && k != "b" ? j != "b" && k != "a" && j.charAt(0) == "a" ? f.dirNum = 1 : (f.dirNum = 2, h = "indented" + (h ? " " + h : "")) : f.dirNum = 1;
                var l = pg.fUrlSet({
                    schedule: {
                        dirType: f.dirType
                    }
                }, !0);
                c.push("<a href=\"#" + l + "\"" + (h ? " class=\"" + h + "\"" : "") + ">" + g + "</a>")
            }
        }
        $("ulScheduleDirectionsList").innerHTML = c.join(""),
        b || (b = a[0]),
        pg.schedule.dirType = b.dirType,
        pg.schedule.dirTypes = {},
        pg.schedule.route = b;
        var m = pg.schedulePane == 2 ? 2 : 1;
        for (var n = 1; n <= 2; n++) {
            pg.schedule.dirTypes[b.dirType] = m,
            $("spanDir" + m).innerHTML = b.name,
            c = [];
            var o = null,
                p = 0,
                q = (b.streets || "").split(",") || [],
                r, s = null,
                t, u = pg.schedule.tripNum && n == 1 && !cfg.city.doNotShowTimetables[pg.schedule.transport] ? pg.schedule.tripNum : 0;
            u && (r = typeof b.times === "string" ? ti.explodeTimes(b.times) : b.times, t = r.workdays.length, s = r.times);
            for (e = 0; e < b.stops.length; e++) {
                var v = ti.fGetStopDetails(b.stops[e]),
                    l = pg.fUrlSet({
                        schedule: {
                            dirType: b.dirType,
                            stopId: v.id,
                            tripNum: u
                        }
                    }, !0);
                c.push("<dt><a class=\"" + (e % 2 ? "odd" : "even") + " hover\" href=\"#" + l + "\">" + (s ? "<b>" + ti.printTime(s[u - 1 + e * t], null, "&#x2007;") + "</b>&nbsp;&nbsp;" : "") + v.name + "</a></dt>");
                if (n == 1 && v.street) if (o != v.street) {
                    while (q[p]) q[p] = {
                        name: q[p]
                    },
                    ++p;
                    o = v.street,
                    q[p] = {
                        name: o,
                        stops: v.name,
                        hash: l
                    },
                    ++p
                } else q[p - 1].stops += ", " + v.name
            }
            $("dlDirStops" + m).innerHTML = c.join(""),
            $("dlDirStops" + m).style.display = "";
            if (n == 2) break;
            for (p = q.length; --p >= 0;) o = q[p],
            typeof o == "string" && (o = {
                name: o
            }),
            o.name.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
            o.hash && (o.name = "<a href=\"#" + o.hash + "\" class=\"hover\" title=\"" + i18n.stops + ": " + o.stops.replace(/"/g, "") + "\">" + o.name + "</a>"),
            q[p] = o.name;
            var w = "";
            q.length && (w = i18n.routeStreets + ": " + q.join(", ")),
            $("divScheduleRouteNumber").innerHTML = "<a onclick=\"pg.fTabShowMap_Click(event);return false;\" class=\"icon icon_map transportmap\" title=\"" + i18n.showInMap + "\"></a><span class=\"num num3 " + b.transport + "\">" + b.num + "</span><span class=\"print_transport\">" + i18n.transport1[b.transport] + "</span>",
            pg.mobile && ($("mobile_route_name").innerHTML = b.name),
            $("divScheduleRouteNumberCenter").innerHTML = "<span class=\"icon incircle icon_" + b.transport + "\"></span><span class=\"num num3 " + b.transport + "\">" + b.num + "</span>",
            $("divScheduleRoute").innerHTML = w + "<div class=\"RouteDetails\"" + (pg.scheduleDetailsExpanded ? "" : " style=\"display:none;\"") + ">" + i18n.operator + ": " + ti.fOperatorDetails(b.operator, b.transport) + "</div>";
            if (a.length <= 1) break;
            m = 3 - m;
            var i = b.dirType.split("-"),
                j = i[0],
                k = i[i.length - 1],
                x = k + "-" + j,
                y = b.dirNum;
            b = null;
            for (e = 0; e < a.length; e++) {
                if (!b || y == b.dirNum && y != a[e].dirNum) b = a[e];
                if (a[e].dirType === x) {
                    b = a[e];
                    break
                }
            }
            if (!b || j == k) {
                $("dlDirStops2").style.display = "none";
                break
            }
        }
        var z = pg.schedule.stopId;
        pg.fScheduleStopActivate(),
        pg.schedule.tripNum || ($("divScheduleBody").scrollTop = 0),
        schedules_container = $("divScheduleContentInner");
        var A = $("divPageSplitter");
        A && pg.toggleClass(A, "hidden", !0);
        for (var e = 0, B; B = schedules_container.childNodes[e]; e++) if (B.nodeName.toLowerCase() == "table") {
            if (B.offsetTop > 650 && B.offsetHeight > 300) {
                breaker = document.createElement("div"),
                add_classname(breaker, "page_breaker"),
                schedules_container.insertBefore(breaker, B),
                add_classname(B, "page_break_before");
                if (A) {
                    pg.toggleClass(A, "hidden", !1);
                    var C = pg.getOffsetTop(breaker);
                    A.style.top = C + breaker.offsetHeight - A.offsetHeight + "px"
                }
                break
            }
            previous_table = B
        }
        if (pg.print) {
            var D = document.getElementsByTagName("a");
            for (var e = 0; e < D.length; e++) D[e].removeAttribute("href");
            z != "" && pg.print_onload && (pg.print_onload = !1, window.print())
        }
    }
},
pg.fScheduleStopActivate = function () {
    var a = "/" + pg.schedule.dirType + "/" + pg.schedule.stopId + "/",
        b = pg.schedule.dirTypes[pg.schedule.dirType],
        c;
    for (var d = 1; d <= 2; d++) {
        c = $("dlDirStops" + d).getElementsByTagName("a");
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            if (d == b && a && pg.schedule.stopId && ("/" + f.href + "/").indexOf(a) >= 0) add_classname(f, "current" + ti.fGetDirTag(pg.schedule.dirType)),
            a = "";
            else if (f.className.indexOf("current") >= 0) {
                names = f.className.split(" ");
                for (var g = 0; g < names.length; g++) if (names[g].substr(0, 7) == "current") {
                    remove_classname(f, names[g]);
                    break
                }
            }
        }
    }
    pg.mobile && ($("divScheduleLeft").style.display = "none", $("divScheduleCenter").style.display = "block");
    if (pg.mobile && !pg.schedule.stopId) $("divScheduleLeft").style.display = "block",
    $("divScheduleCenter").style.display = "none";
    else {
        if (a) {
            c = $("dlDirStops" + (b || 1)).getElementsByTagName("a");
            if (c && (c[0] || {}).href) {
                a = c[0].href.split("#")[1],
                pg.fUrlExecute(a);
                return
            }
        }
        $("aDir1").className = $("divScheduleLeft").className = b == 1 ? "active" : "",
        $("aDir2").className = $("divScheduleRight").className = b == 2 ? "active" : "",
        pg.browserVersion >= 8 && pg.toggleClass($("divScheduleContentInner"), "Right", b == 2),
        pg.fScheduleLoadTimetable()
    }
},
pg.fScheduleLoadTimetable = function () {
    var a, b, c, d = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"),
        e = pg.schedules || {};
    pg.schedules || (e[d] = pg.schedule);
    var f = pg.nonEmptyCount(e) > (e[d] ? 1 : 0),
        g = ti.fGetTransfersAtStop(pg.schedule.stopId, !0, pg.schedule.route);
    pg.transfersDisplayed = {};
    var h = null,
        i = null,
        j = ["<span>"],
        k = ["<span>"],
        l = "";
    for (c = 0; c < g.length; c++) {
        a = g[c],
        d = ti.toAscii([a.city, a.transport, a.num].join("_"), !0),
        h && h != a.transport && (last = j.pop(), j.push(last.replace("<span class=\"comma\">,</span></a>", "</a>")));
        if (pg.transfersDisplayed[d]) continue;
        var m = {
            id: a.id,
            city: a.city,
            transport: a.transport,
            num: ti.toAscii(a.num, !0),
            dirType: a.dirType,
            routeTag: a.stopId,
            stopId: a.stopId
        };
        pg.transfersDisplayed[d] = m;
        if (cfg.defaultCity === "druskininkai" || cfg.defaultCity === "liepaja") parseInt(pg.schedule.num, 10) === parseInt(a.num, 10) && (e[d] = m, f = f || pg.schedule.num !== a.num);
        b = pg.fUrlSet({
            schedule: m
        }, !0),
        h !== a.transport && (h = a.transport, j.push("</span><span class=\"transport_line\"><span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "\"></span>&nbsp;"));
        var n = "<a class=\"hover " + (e[d] ? "activetransfer " : "transfer") + h + "\" href=\"#" + b + "\">" + g[c].num.replace(/\s/g, "&nbsp;") + (c != g.length - 1 ? "<span class=\"comma\">,</span>" : "") + "</a> ";
        j.push(n),
        e[d] && (i !== a.transport && (i = a.transport, n = "</span><span class=\"transport_line\"><span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "-remove\"></span>&nbsp;" + n), k.push(n), e[d].stopId = a.stopId)
    }
    last = j.pop(),
    j.push(last.replace("<span class=\"comma\">,</span></a>", "</a>")),
    j.push("</span><span class=\"last_transfer\"></span>"),
    k.push("</span>");
    var o = ti.fGetStopDetails(pg.schedule.stopId),
        p = (o.street ? ", " + o.street : "") + (o.area && !cfg.cities[pg.city].skipStopArea ? ", " + o.area : "") + (o.city && !cfg.cities[pg.city].skipStopCity ? ", " + o.city : "");
    o[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (p += ", " + i18n.fareZone + " " + o[cfg.cities[pg.city].stopFareZone]),
    p = p.length > 0 ? "<span class=\"details\"> (" + p.substring(2) + ")</span>" : "",
    $("divScheduleStop").innerHTML = "<strong> " + o.name + "</strong>" + p + "&nbsp;&nbsp; <div id=\"print_buttons\"><a style=\"\" target=\"_blank\" href=\"print.html" + document.location.hash + "\"><img title=\"Print preview\" style=\"cursor:pointer\" src=\"styles/images/document_print_preview.png\"></a><a onclick=\"pg.pdf();\"><img title=\"Open PDF\" style=\"margin-left:2px;cursor:pointer\" src=\"styles/images/pdf-icon-24x24.png\"></a></div>",
    $("divScheduleRoutesInStop").innerHTML = j.join("");
    if (o.street) {
        var q = o.street.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
            r = $("divScheduleRoute").getElementsByTagName("a");
        for (c = r.length; --c >= 0;) r[c].innerHTML.indexOf(q) < 0 ? r[c].className == "hover strong" && (r[c].className = "hover") : r[c].className = "hover strong"
    }
    var s = [],
        t = 0,
        u = Number.POSITIVE_INFINITY,
        v = cfg.city.doNotMergeTimetables;
    pg.schedule.stopId != pg.schedule.route.stops[0] && cfg.city.doNotShowTimetables[pg.transport] && (e = null);
    for (var d in e) {
        var m = e[d];
        if (!m || !m.stopId) continue;
        if (!pg.transfersDisplayed[d]) continue;
        var w = ti.fGetStopDetails(m.stopId),
            y = {},
            z = (w || {
                raw_data: ""
            }).raw_data.split(";"),
            A = m.dirType.split("-"),
            B = A[0],
            C = A[A.length - 1],
            D = B.charAt(0),
            E = C.charAt(0),
            F = ti.toAscii(pg.schedule.route.name, !0);
        for (var c = ti.FLD_DIRS; c < z.length; c += 2) {
            a = ti.fGetRoutes(z[c]);
            if (a.city === m.city && a.transport === m.transport && ti.toAscii(a.num, !0) === m.num && a.times && (!pg.schedule.route.routeTag || a.id === pg.schedule.route.id || ti.toAscii(a.name, !0) === F)) {
                if (a.dirType.indexOf(m.dirType) < 0 && m.dirType.indexOf(a.dirType) < 0 && a.dirType.indexOf("-d") < 0 && B !== C && (a.dirType.indexOf(C) == 0 || a.dirType.indexOf(B) == a.dirType.length - 1 || a.dirType.indexOf("-" + E) < 0 && a.dirType.indexOf(B + "-") < 0 && a.dirType.indexOf(D + "-") < 0 && (a.dirType.indexOf("c") < 0 || a.dirType.indexOf("c") >= a.dirType.length - 2))) continue;
                if (y[a.id]) continue;
                y[a.id] = !0,
                a.tag = (!f && a.dirType != pg.schedule.dirType && ti.toAscii(a.name, !0) !== F ? "other" : "current") + ti.fGetDirTag(a.dirType);
                if (a.tag == "current" || a.tag == "other" && a.dirType.charAt(0) == "d") a.tag = "";
                (cfg.defaultCity === "druskininkai" || cfg.defaultCity === "liepaja") && pg.schedule.num === a.num && (a.tag = "");
                var G = typeof a.times === "string" ? ti.explodeTimes(a.times) : a.times,
                    H = +z[c + 1],
                    I = G.workdays,
                    J = G.valid_from,
                    K = G.tag,
                    L = G.times,
                    M = I.length,
                    N = M;
                for (var O = M + H * M; N--;) {
                    var P = L[--O];
                    u > P && P >= 0 && (u = P);
                    var Q = a.tag;
                    K.charAt(N) == "1" && (Q = (Q ? Q + " " : "") + "highlighted"),
                    pg.schedule.tripNum && a.dirType == pg.schedule.dirType && pg.schedule.tripNum - 1 == N && (Q = (Q ? Q + " " : "") + "clicked");
                    if (v) s[t++] = {
                        time: P,
                        workday: I[N],
                        validFrom: J[N],
                        route: a,
                        tag: Q,
                        tripNum: N
                    };
                    else for (var R = 1; R <= 7; R++) I[N].indexOf(R) >= 0 && (s[t++] = {
                        time: P,
                        workday: R,
                        validFrom: J[N],
                        route: a,
                        tag: Q,
                        tripNum: N
                    })
                }
            }
        }
    }
    s.sort(function (a, b) {
        if (a.workday < b.workday) return -1;
        if (a.workday > b.workday) return 1;
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        if (a.route.id < b.route.id) return -1;
        if (a.route.id > b.route.id) return 1;
        return 0
    });
    var S = "";
    f ? (J = "", S = "<div style=\"width:100%; margin-top:10px;\">" + k.join("") + " &nbsp;<label id=\"labelShowDeparturesWithNumbers\" for=\"showDeparturesWithNumbers\"><input name=\"showDeparturesWithNumbers\" id=\"showDeparturesWithNumbers\" type=\"checkbox\" value=\"showDeparturesWithNumbers\"" + (pg.showDeparturesWithNumbers ? " checked=\"checked\"" : "") + " onclick=\"pg.fToggleNumbersAtDepartures();\" />" + i18n.showDeparturesWithRouteNumbers + "</label></div>", $("divScheduleRoute").style.display = "none") : $("divScheduleRoute").style.display = "",
    j = [];
    var T = [];
    if (s.length) {
        var U, V = u = ~~ (u / 60) - 1,
            W = [],
            X = [],
            Y = [],
            Z;
        for (c = 0, O = s.length; c <= O; c++) {
            if (c > 0 && (c === O || s[c].workday != s[c - 1].workday)) {
                var Z = j.join(";"),
                    M = s[c - 1].workday,
                    J = s[c - 1].validFrom;
                for (kk = 1; kk <= 7; ++kk) if (W[kk] === Z) {
                    X[kk] += M,
                    Y[kk] < J && (Y[kk] = J);
                    break
                }
                kk > 7 && (W[M] = Z, X[M] = "" + M, Y[M] = J);
                if (c === O) break;
                j = []
            }
            Z = s[c];
            var a = Z.route;
            j.push(Z.time, a.city, a.transport, a.num, a.dirType)
        }
        j = [];
        var _ = 0,
            ba = 0;
        for (c = 0, O = s.length; c <= O; c++) {
            if (c < O) {
                Z = s[c];
                if (v) X[Z.workday] = Z.workday;
                else if (!X[Z.workday]) continue
            }
            if (c > 0 && (c === O || Z.workday != s[c - 1].workday)) {
                V != -999 && j.push("</td></tr>"),
                j.push("</tbody></table>");
                if (c === O) break
            }
            if (c == 0 || Z.workday != s[c - 1].workday) {
                V = u,
                _ = 0;
                var bb = X[s[c].workday],
                    bc = pg.fWeekdaysName(bb),
                    J = Y[s[c].workday] || "";
                J && (J = "<span style=\"font-size:smaller; font-weight:normal;\">(" + i18n.validFrom + " " + pg.formatDate(+J) + ")</span>"),
                j.push("<table class=\"timetable days_" + bb + (T.length ? "" : " visible") + (ba % 2 ? " even" : " odd") + "\" cellspacing=\"0\" cellpadding=\"0\"><tbody><caption><div class=\"days_title\">" + bc + "</div>" + J + "</caption>"),
                T.push({
                    days: bb,
                    title: bc
                }),
                ba += 1
            }
            var bd = Z.time;
            if (bd < 0) continue;
            var be = ~~ (bd / 60);
            bd = bd % 60;
            if (V !== be) {
                if (V != u) {
                    j.push("</td></tr>");
                    while (++V < be) j.push("<tr><th class=\"" + (_ % 2 ? "even" : "odd") + "\">-</th><td></td></tr>"),
                    _ += 1
                } else while (++V < be) j.push("<tr><th class=\"" + (_ % 2 ? "even" : "odd") + "\">&nbsp;</th><td></td></tr>"),
                _ += 1;
                V = be,
                j.push("<tr><th class=\"" + (_ % 2 ? "even" : "odd") + "\">" + be % 24 + "</th><td" + (f ? " style=\"white-space:normal;\"" : "") + ">"),
                _ += 1
            }
            var bf = Z.route;
            b = pg.fUrlSet({
                schedule: {
                    city: bf.city,
                    transport: bf.transport,
                    num: bf.num,
                    dirType: bf.dirType,
                    stopId: bf.stopId,
                    tripNum: Z.tripNum + 1
                }
            }, !0),
            j.push("<a " + (pg.mobile ? "" : "href=\"#" + b + "\" ") + "title=\"" + (f ? i18n.transport1[bf.transport] + (bf.num.length > 15 ? "" : " " + bf.num) 
			+ " " + i18n.towards + " " : "") + bf.name.replace(/"/g, "") +
			"\"" + (Z.tag ? "class=\"" + Z.tag + "\"" : "") + ">" +
			(bd < 10 ? "0" : "") + bd +
			(f ? "<span class=\"departure" + bf.transport + "\">\\" + bf.num + "</span></a>&#x200A;" : "</a>"))
        }
    }
    if (pg.mobile) {
        select = [];
        for (x = 0; x < T.length; x++) select.push("<a " + (x == 0 ? "class=\"bold\" " : "") + "onclick=\"show_timetable(" + T[x].days + ", this)\">" + T[x].title + "</a>");
        T.length && (S += "<div style=\"margin-right:120px;\" class=\"ScheduleSelectContainer\" id=\"mobile_timetable_select\"><a class=\"active false\" href=\"\" onclick=\"show_timetable_menu(this); return false;\" onblur=\"hide_timetable_menu();\"><span class=\"hover\" id=\"mobile_days\">" + T[0].title + "</span></a></div>"),
        S += "<div class=\"mobileScheduleMenu\" id=\"mobileScheduleMenu\" style=\"margin-left:15px;margin-top:-15px;width:auto;position:absolute;top:auto;\">" + select.join(" ") + "</div>",
        S += "<div class=\"schedule_map\"><a onclick=\"pg.fTabShowMap_Click(event);return false;\"><span class=\"map_icon_mobile\">" + i18n.showInMap + "</span></a></div>"
    }
    S += j.join("");
    if (pg.schedule.route && pg.schedule.route.transport) {
        a = pg.schedule.route,
        j = [];
        var bg = (cfg.operators[a.transport + "_" + a.num] || cfg.operators[a.operator] || cfg.operators[a.transport] || {
            notes0: ""
        }).notes0;
        bg && (S = "<div class=\"schedule_note\">" + (bg[pg.language] || bg.en || bg) + "</div>" + S),
        bg = cfg.city.skipOperator ? "" : ti.fOperatorDetails(a.operator, a.transport),
        bg && j.push("<p class=\"noindent\"><strong>" + i18n.operator + ":</strong> " + bg + "</p>"),
        bg = (cfg.operators[a.transport + "_" + a.num] || cfg.operators[a.operator] || cfg.operators[a.transport] || {
            notes: ""
        }).notes,
        bg && j.push("<p>" + (bg[pg.language] || bg.en || bg).replace("%operator", a.operator) + "</p><br />"),
        e && (bg = (cfg.operators[a.operator] || cfg.operators[a.transport] || {
            comments: ""
        }).comments, bg ? j.push("<p>" + (bg[pg.language] || bg.en || bg).replace("%operator", a.operator) + "</p>") : (i18n.scheduleDelaysWarning && i18n.scheduleDelaysWarning.length > 10 && j.push("<p>" + i18n.scheduleDelaysWarning), j.push("<p class=\"noprint\">" + i18n.scheduleComments)), S.indexOf("highlighted") >= 0 && j.push("<p>" + i18n.lowFloorDepartures), S.indexOf("other") >= 0 && (j.push("<p>" + i18n.scheduleChangedDepartures), j.push("<p class=\"noprint\">" + i18n.scheduleMouseTips))),
        baloon = j.join("</p>") + "</p>",
        $("divScheduleContentBottom").innerHTML = baloon
    }
    pg.replaceHtml($("divScheduleContentInner"), S + "<div style=\"clear:both;\"></div>")
};

function try_focus(a) {
    setTimeout(function () {
        try {
            a.focus()
        } catch (b) {}
    }, 100)
}
pg.aDir_Click = function (a, b, c) {
    if (!pg.print) {
        setTimeout(function () {
            try {
                a.focus()
            } catch (b) {}
        }, 100);
        try {
            var d = $("ulScheduleDirectionsList");
            (a.id || "").indexOf("2") >= 0 && a.offsetLeft > 100 ? (pg.scheduleProposedPane = 2, d.style.right = "10px", d.style.left = "") : pg.scheduleProposedPane = 1,
            d.style.top = (c || 82) + "px",
            d.style.left = (b || 29) + "px",
            d.style.display = "block"
        } catch (e) {
            alert(e)
        }
    }
},
pg.fLoadDepartingRoutes = function () {
    pg.loadedDepartingRoutes = null;
    var a = $("divContentDepartingRoutesResults"),
        b = ti.fGetAnyStopDetails(pg.inputStop);
    if (b.id) $("inputStop").value = pg.inputStopText = b.name || "",
    $("inputStop").className = "",
    pg.startStop || (pg.startStop = pg.inputStop);
    else if (!pg.inputStop && typeof ti.stops == "object") {
        var c = pg.fUrlSet({
            hashForMap: "map"
        }, !0);
        $("divContentDepartingRoutesHeader").style.display = "none",
        a.innerHTML = ("<p class=\"help\">" + i18n.searchDeparturesHelp + "<p/><p class=\"help\">" + i18n.tripPlannerHelpMap).replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + c + "\">") + "</p>",
        document.activeElement && document.activeElement.id !== "inputStop" && ($("inputStop").value = i18n.startStop, $("inputStop").className = "empty", setTimeout(function () {
            try {
                $("inputStop").focus()
            } catch (a) {}
        }, 100));
        return
    }
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") a.innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadDepartingRoutes, 200);
    else {
        pg.loadedDepartingRoutes = pg.inputStop,
        pg.stopsSuggestedForText = b.name;
        var d = (b.street ? ", " + b.street : "") + (b.area && !cfg.cities[pg.city].skipStopArea ? ", " + b.area : "") + (b.city && !cfg.cities[pg.city].skipStopCity ? ", " + b.city : "");
        b[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (d += ", " + i18n.fareZone + " " + b[cfg.cities[pg.city].stopFareZone]),
        d = d.length > 0 ? "<span class=\"details\"> (" + d.substring(2) + ")</span>" : "";
        var e = [],
            c = pg.fUrlSet({
                hashForMap: "map"
            }, !0),
            f = ti.fGetRoutesAtStop(pg.inputStop, !1),
            g = {},
            h = null,
            e = ["<span>"];
        for (var i = 0; i < f.length; i++) {
            var j = f[i],
                k = ti.toAscii([j.city, j.transport, j.num].join(","), !0);
            if (g[k]) continue;
            var l = {
                city: j.city,
                transport: j.transport,
                num: ti.toAscii(j.num, !0),
                dirType: j.dirType,
                stopId: j.stopId
            };
            g[k] = l;
            var m = pg.fUrlSet({
                schedule: l
            }, !0);
            h !== j.transport && (h = j.transport, e.push("</span><span class=\"transport_line\"><span class=\"icon icon_narrow icon_" + j.transport + "\" data-transport=\"" + j.transport + "\"></span>&nbsp;"));
            var n = "<a class=\"hover transfer" + h + "\" href=\"#" + m + "\" title=\"" + (j.name || "").replace(/"/g, "") + "\">" + f[i].num.replace(/\s/g, "&nbsp;") + "</a> ";
            e.push(n)
        }
        e.push("</span><span class=\"last_transfer\"></span>"),
        $("spanContentDepartingRoutesStop").innerHTML = "<table style=\"width:100%;\"><tr><td><a href=\"#" + c + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a><strong>" + b.name + "</strong>" + d + "</td>" + (pg.mobile ? "</tr><tr>" : "") + "<td style=\"white-space:normal;\">" + e.join("") + "</td></tr></table>",
        e = [];
        var o = new Date,
            p = +$("inputDepartureDate").value;
        p < 0 ? (p = o, startTime = ti.dateToMinutes(o) % 1440, pg.stopSettings = "") : (p = new Date(o.getFullYear(), o.getMonth(), o.getDate() + p), startTime = -1, pg.stopSettings = pg.formatDate(p)),
        pg.fUrlSet({
            transport: "stop",
            inputStop: pg.inputStop,
            stopSettings: pg.stopSettings
        });
        var q = p.getDay() || 7;
        if (+p == +(new Date(2012, 3, 28))) q = 5;
        else if (+p == +(new Date(2012, 3, 30)) || +p == +(new Date(2012, 4, 1)) || +p == +(new Date(2012, 4, 4)) || +p == +(new Date(2012, 10, 19))) q = 7;
        var r = {
            start_stops: pg.inputStop,
            finish_stops: "",
            date: p,
            weekdaydirect: q,
            transport: {}
        },
            s = dijkstra(r, 0 * startTime, 0);
        if (!s || !s.length) {
            a.innerHTML = "<br/>" + i18n.noDepartingRoutes;
            return
        }
        var t = pg.hashForMap ? " map_opened" : " map_closed";
        e.push("<div class=\"routes_scroller\"><table id=\"tblDepartingRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
        for (var u = 0, v = 0, w = ""; u < s.length; u++) {
            var j = s[u].route,
                x = ti.toAscii(j.city + ";" + j.transport + ";" + j.num + ";" + j.name, !0);
            w != x ? (w = x, v = u, s[v].route.departures = [s[u].start_time], s[v].route.tripNums = [s[u].tripNum]) : (s[v].route.departures.push(s[u].start_time), s[v].route.tripNums.push(s[u].tripNum))
        }
        for (var u = 0, v = 0; u < s.length; u++) s[u].route.departures && (e.push(pg.fMakeRouteRowHTML(s[u].route, "tblDepartingRoutes", v, startTime)), ++v);
        a.innerHTML = e.join("") + "</tbody></table></div>",
        $("divContentDepartingRoutesHeader").style.display = "",
        pg.mobile && setTimeout(function () {
            var a = 192 - window.scrollY;
            window.scrollBy(0, a)
        }, 200)
    }
},
pg.fMakeRouteRowHTML = function (a, b, c, d) {
    var e, f = "map," + a.city + "," + a.transport + "," + a.num;
    f = ti.toAscii(f, !0),
    b == "tblRoutes" ? (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType
        },
        hashForMap: ""
    }, !0), pg.routesFilter && (f += "," + a.dirType), f = pg.fUrlSet({
        hashForMap: f
    }, !0)) : (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType,
            stopId: a.stopId
        },
        hashForMap: ""
    }, !0), f = pg.fUrlSet({
        hashForMap: f + "," + a.dirType + "," + a.stopId
    }, !0));
    var g = "<a style=\"display:inline-block\" href=\"#" + e + "\" title=\"" + i18n.showSchedule + "\">",
        h = "";
    for (var i = 1; i <= 7; i++) if (a.weekdays.indexOf(i) < 0) h += "<span class=\"blankday\" title=\"" + i18n["weekdays" + i] + ": " + i18n.routeNotOperate + "\">" + i18n.weekdaysShort[i] + "</span>";
    else {
        var j = a.validityPeriods[i - 1];
        j = j ? ": " + i18n.validFrom + " " + pg.formatDate(j) : "",
        h += "<span" + (i >= 6 ? "" : " class=\"weekend\"") + " title=\"" + i18n["weekdays" + i] + j + "\">" + i18n.weekdaysShort[i] + "</span>"
    }
    a.weekdays.indexOf("z") >= 0 && (h += "<img src=\"_images/handicapped.png\" alt=\"low floor\" title=\"" + i18n.lowFloorVehicles + "\" />");
    var k = g + (!0 || b == "tblDepartingRoutes" ? "" : "<span class=\"icon icon_expand\" title=\"" + i18n.showDetails + "\"></span>") + "<span class=\"icon icon_" + a.transport + "\"></span>";
    a.transport == "train" || a.transport == "metro" ? k += "<span style=\"display:none;\">" + a.num + "</span>" : k += "<span class=\"num num" + Math.min(a.num.length, 4) + " " + a.transport + "\">" + a.num + "</span>";
    var l = "<span class=\"hover\">" + a.name + ((a.commercial || "").indexOf("E") >= 0 ? " (" + i18n.express + ")" : "") + "</span>",
        m = pg.mobile ? "<tr><td><table style='width:100%;'>" : "";
    m += "<tr" + (b != "tblDepartingRoutes" && c % 2 != 0 ? " class=\"white\"" : "") + "><td style=\"width:26px;vertical-align:top;\"><a class=\"icon icon_map\" title=\"" + i18n.showInMap + "\" href=\"#" + f + "\"></a></td><td class=\"routeName\">" + k + l + "</a></td>",
    m += pg.mobile ? "</tr><tr class=\"weekdays" + (b != "tblDepartingRoutes" && c % 2 != 0 ? " white" : "") + "\"><td style=\"height:14px;\"></td>" : "",
    m += "<td class=\"weekdays\"><a href=\"#" + e + "\">" + h + "</a></td></tr>",
    m += pg.mobile ? "</table></td></tr>" : "";
    if (b === "tblDepartingRoutes") {
        if (cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[a.transport] && a.departures.length && a.departures[0] >= 0) if (("," + pg.inputStop + ",").indexOf("," + a.stops[0] + ",") < 0) {
            m += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\">",
            m += "</td></tr>";
            return m
        }
        m += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\"><span><span class=\"icon icon_collapse\"></span><span class=\"icon";
        var n = Infinity,
            o = Infinity,
            p = 0,
            q = 18;
        for (var r = a.departures.length; --r >= 0;) {
            var s = a.departures[r];
            if (s < 0) continue;
            if (s < d) break;
            ++p;
            var t = ~~ (s / 60);
            if (n != t) {
                if (++p > q && s < d) break;
                n = t
            }
            o = s
        }
        r < 0 && p < q ? m += "\">" : m += " icon_expand\" title=\"" + i18n.stopShowAllDepartures + "\">";
        var u = -1;
        p = 0;
        for (r = 0; r < a.departures.length; ++r) {
            var s = a.departures[r];
            if (s < 0) continue;
            var t = ~~ (s / 60);
            s >= o && ++p,
            u != t && (u = t, s >= o && ++p, m += "</span></span><span style=\"display:inline-block;\"><span class=\"DeparturesHour" + (t < n || p > q ? " collapse\"" : "") + "\">&nbsp;" + t % 24 + "</span><span style=\"vertical-align:top\"" + (s < o || p > q ? " class=\"collapse\"" : "") + ">&#x200A;"),
            s == o && (m += "</span><span style=\"vertical-align:top\">"),
            p == q + 1 && (m += "</span><span style=\"vertical-align:top\" class=\"collapse\">"),
            s = s % 60,
            m += (s < 10 ? "0" : "") + s + " "
        }
        u === -1 ? m += "</span><span>" + i18n.routeNotOperate : p ? p > q && (m += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">...") : m += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">" + i18n.stopLatestDeparture + "&nbsp;" + ti.printTime(a.departures[a.departures.length - 1]),
        m += "</span></span></td></tr>",
        (u === -1 || !p) && a.dirType.indexOf("d") >= 0 && (m = "")
    }
    return m
},
pg.fPrintOptimalTrips = function (a, b) {
    pg.optimalResults = a,
    pg.map = {};
    var c = pg.hashForMap ? " map_opened" : " map_closed",
        d = ["<div class=\"routes_scroller\">"];
    for (var e = 0; e < a.length; e++) {
        var f = a[e],
            g = a[e].legs,
            h = [],
            i = [];
        for (var j = 0; j < g.length; j++) {
            var k = g[j],
                l = k.route;
            if (l && l.transport) {
                i.push("<span class=\"icon icon_narrow icon_" + l.transport + "\" title=\"" + i18n.transport1[l.transport] + " " + l.num + " " + i18n.towards + " " + l.name + "\"></span>"),
                l.stopId = k.start_stop.id,
                l.tripNum = (k.trip_num || -1) + 1;
                var m = pg.fUrlSet({
                    schedule: l,
                    mapHash: ""
                }, !0);
                h.push("<p class=\"results\"><span class=\"icon icon_" + k.route.transport + "\"></span><span class=\"num num" + Math.min(k.route.num.length, 4) + " " + k.route.transport + "\">" + k.route.num + "</span>" + (cfg.searchOnly ? "" : "<a class=\"hover\" href=\"#" + m + "\" title=\"" + i18n.showSchedule + "\">") + i18n.transport1[k.route.transport] + " " + i18n.towards + "&nbsp;" + k.route.name + (cfg.searchOnly ? "" : "</a>") + " <br/><span class=\"ib\"><strong>" + ti.printTime(k.start_time) + " " + k.start_stop.name + "</strong> &rarr;</span> <span class=\"ib\">" + ti.printTime(k.finish_time) + " " + k.finish_stop.name + "</span> <span class=\"graytext ib\"> (" + i18n.ride + " " + (k.finish_time - k.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p>")
            } else {
                if (k.start_time == k.finish_time && parseInt(k.start_stop.id, 10) == parseInt(k.finish_stop.id, 10)) continue;
                i.push("<span class=\"icon icon_narrow icon_walk\" title=\"" + i18n.walk + " " + (k.finish_time - k.start_time) + "&nbsp;" + i18n.minutesShort + "\"></span>"),
                h.push("<p class=\"results\"><span class=\"icon icon_walk\"></span><span class=\"ib\"><strong>" + ti.printTime(k.start_time) + " " + k.start_stop.name + "</strong> &rarr;</span> <span class=\"ib\">" + ti.printTime(k.finish_time) + " " + k.finish_stop.name + "</span> <span class=\"graytext ib\"> (" + i18n.walk + " " + (k.finish_time - k.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p></a>")
            }
        }
        var n = pg.city + "/" + pg.transport + "/map,,," + (e + 1);
        d.push("<div" + (e % 2 ? "" : " class=\"grey\"") + " style=\"padding:5px 0 5px 5px;\"><table><tbody><tr><td><a href=\"#" + n + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a> </td><td><a href=\"\" onclick=\"return false;\" title=\"" + (e ? i18n.showDetails : i18n.hideDetails) + "\" class=\"" + (e ? "expand" : "collapse") + "\"><span class=\"icon\"></span><strong class=\"hover\">" + i18n.option + "&nbsp;" + (e + 1) + ".</strong></a> <span class=\"ib\">" + ti.printTime(f.start_time, null, "&#x2007;") + " &mdash; " + ti.printTime(f.finish_time, null, "&#x2007;") + "</span>" + (pg.mobile ? " <span class=\"ib\">" + i18n.travelDuration + "&nbsp;<strong>" + ti.printTime(f.travel_time) + "</strong></span>  " : ",") + "</span></td><td class=\"icons\">" + (pg.mobile ? "" : i18n.travelDuration + "&nbsp;<strong>" + ti.printTime(f.travel_time) + "</strong>  ") + "<span class=\"planner_icons\">" + i.join("") + "</span></td></tr></tbody></table><div class=\"RouteDetails\" style=\"" + (e ? "display:none;" : "") + "\">"),
        d.push(h.join("") + "</a></div></div>")
    }
    a.length > 0 ? b && document.body.className.indexOf("Map") >= 0 && (pg.mapShowAllStops = !1, pg.fUrlSetMap({
        optimalRoute: 1
    })) : d.push("<br/>" + i18n.noOptimalRoutes),
    d.push("</div>");
    var o = $("divContentPlannerResults");
    o.innerHTML = d.join("")
},
pg.fMapHide = function () {
    $("divContainer").className.indexOf("MapPage") != -1 ? (remove_classname($("divContainer"), "MapPage"), map_container_frame = "divMapPage") : map_container_frame = getCurrentPageDivId(),
    parent_frame = $(map_container_frame),
    map_close(parent_frame),
    pg.mapShowVehiclesInterval && (clearInterval(pg.mapShowVehiclesInterval), pg.mapShowVehiclesInterval = 0),
    document.body.className = pg.schedule ? "ScheduleDisplayed" : "",
    pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML)
};

function getCurrentPageDivId() {
    var a = "";
    pg.transport && pg.transport == "stop" ? a = "divContentDepartingRoutes" : pg.transport && pg.transport == "plan" ? a = "divContentPlanner" : pg.transport && pg.schedule ? a = "divScheduleContent" : a = "divContent";
    return a
}
pg.fTabShowMap_Click = function (a, b) {
    pg.mapShowAllStops = !0;
    if (b) {
        var c = pg.fGetCity(pg.city);
        pg.fUrlSet({
            city: c,
            transport: null,
            schedule: null,
            hashForMap: "map,page"
        })
    } else pg.hashForMap == "map" ? pg.fMapShow() : (pg.hashForMap = "map", pg.fUrlSet());
    return pg.cancelEvent(a)
},
pg.fMapShow = function () {
    var a = pg.hashForMap.split(","),
        b, c, d = !1;
    a[a.length - 1] == "max" && (b = !0, a.pop()),
    a[a.length - 1] == "drive" && (b = !0, a.pop()),
    a[a.length - 1] == "stops" && (d = !0, a.pop()),
    a[a.length - 1] == "page" && (d = !0, c = !0);
    var e = a[1] || cfg.defaultCity,
        f, g, h, i;
    c ? (add_classname($("divContainer"), "MapPage"), map_container_frame = "divMapPage") : (remove_classname($("divContainer"), "MapPage"), map_container_frame = getCurrentPageDivId()),
    parent_frame = $(map_container_frame),
    map_open(parent_frame),
    map_container = getMapContainer(parent_frame);
    if (map_container) loadGmapTo(map_container);
    else {
        setTimeout(pg.fMapShow, 200);
        return
    }
    pg.schedule ? (add_classname(document.body, "MapOK"), e = pg.schedule.city, f = pg.schedule.transport, g = pg.schedule.num, h = pg.schedule.dirType, i = pg.schedule.stopId) : (document.body.className = b ? "MapDisplayedMax" : "MapDisplayed", pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML), document.body.className = document.body.className + " " + (b ? "MapDisplayedMax" : "MapDisplayed"), e = a[1] || cfg.defaultCity, f = a[2] || "", g = a[3] || "", h = a[4] || "", i = a[5] || "");
    if (pg.GMap) {
        c && (a.pop(), pg.hashForMap = a.join(",")),
        pg.GMap.checkResize();
        if (typeof ti.stops !== "object" || typeof ti.routes !== "object") {
            setTimeout(pg.fMapShow, 200);
            return
        }
        var j, k;
        pg.mapShowVehiclesInterval || (pg.mapShowVehiclesInterval = setInterval(pg.fShowVehicles, 2e3), pg.fShowVehicles()),
        pg.transport == "plan" ? pg.stopLabelSelected.hide() : (i || pg.transport == "stop" && (i = pg.inputStop, pg.mapShowAllStops = !0), i ? (k = ti.fGetAnyStopDetails(i), pg.schedule ? x = pg.fUrlSet({
            schedule: {
                stopId: k.id
            }
        }, !0) : x = pg.fUrlSet({
            transport: "stop",
            stopId: k.id
        }, !0), typeof k.latAvg == "number" && typeof k.lngAvg == "number" ? (j = new GLatLng(k.latAvg, k.lngAvg), pg.stopLabelSelected.setContents(k.name, x), pg.stopLabelSelected.setPoint(j), pg.stopLabelSelected.show()) : pg.stopLabelSelected.hide()) : pg.stopLabelSelected.hide());
        if (g || pg.transport == "plan") {
            if (pg.map.city == e && pg.map.transport == f && pg.map.num == g && pg.map.dirType == h) {
                j && !pg.GMap.getBounds().containsLatLng(j) && pg.GMap.panTo(j);
                return
            }
            pg.map.city = e,
            pg.map.transport = f,
            pg.map.num = g,
            pg.map.dirType = h,
            pg.mapStops = {},
            pg.mapMarkerStart.hide(),
            pg.mapMarkerFinish.hide();
            while (pg.mapOverlays.length) pg.GMap.removeOverlay(pg.mapOverlays.pop());
            var l = 999,
                m = -999,
                n = 999,
                o = -999,
                p = "",
                q = "";
            if (pg.transport == "plan") {
                var r;
                if (g && pg.optimalResults && pg.optimalResults.length) {
                    t = g ? +g - 1 : 0,
                    t >= pg.optimalResults.length && (t = 0),
                    r = pg.optimalResults[t].legs || [],
                    q = i18n.option + " " + (t + 1);
                    for (var s = 0; s < pg.optimalResults.length; ++s) p += "<a href=\"#map,,," + (s + 1) + "\"><span class=\"icon icon_narrow" + (s == t ? " icon_checked" : "") + "\"></span>" + i18n.option + " " + (s + 1) + "</a>"
                } else pg.mapShowAllStops = !0,
                r = [{
                    start_stop: ti.fGetAnyStopDetails(pg.inputStart),
                    finish_stop: ti.fGetAnyStopDetails(pg.inputFinish)
                }];
                for (var t = r.length; t >= 0; t--) {
                    var u, k, v, w;
                    t == r.length ? (u = r[t - 1], k = u.finish_stop, w = u.finish_time, typeof k.lat == "number" && typeof k.lng == "number" && (pg.mapMarkerFinish.setPoint(new GLatLng(k.latAvg || k.lat, k.lngAvg || k.lng)), pg.mapMarkerFinish.show())) : (u = r[t], k = u.start_stop, typeof k.lat == "number" && typeof k.lng == "number" && (t == 0 && (pg.mapMarkerStart.setPoint(new GLatLng(k.latAvg || k.lat, k.lngAvg || k.lng)), pg.mapMarkerStart.show())), w = u.start_time);
                    if (!k || !k.id) continue;
                    l > k.lat && (l = k.lat),
                    n > k.lng && (n = k.lng),
                    m < k.lat && (m = k.lat),
                    o < k.lng && (o = k.lng);
                    var v = u.route || {},
                        x;
                    w = w && ti.printTime(w) + " " || "",
                    k.id.indexOf(";") < 0 && (u.route ? x = pg.fUrlSet({
                        schedule: {
                            city: v.city,
                            transport: v.transport,
                            num: v.num,
                            dirType: v.dirType,
                            stopId: k.id,
                            tripNum: (u.trip_num || -1) + 1
                        }
                    }, !0) : k.id ? x = "stop/" + k.id + "/map" : x = "map", pg.mapStops[k.id] = {
                        lat: k.latAvg || k.lat,
                        lng: k.lngAvg || k.lng,
                        href: x,
                        img: v.transport || !g || t != 0 && t != r.length ? "stopOnRoute" : "stopGray",
                        name: w + k.name
                    });
                    if (!g || pg.optimalSearchRunning || !pg.optimalResults || !pg.optimalResults.length) continue;
                    k.id.indexOf(";") < 0 && t !== r.length && (v.transport || t == r.length - 1) && (pg.mapStops["transport" + k.id] = {
                        lat: k.latAvg || k.lat,
                        lng: k.lngAvg || k.lng,
                        href: x,
                        img: "MarkerStart",
                        name: w + i18n.stop.toLowerCase() + "&nbsp;" + k.name,
                        transport: v.transport || "walk",
                        num: v.num || ""
                    });
                    if (t < r.length) if (v.transport) {
                        var y = {};
                        y[v.dirType] = !0,
                        pg.loadPolyline(v.city, v.transport, v.num, y, u.start_stop.lat, u.start_stop.lng, u.finish_stop.lat, u.finish_stop.lng);
                        if (!isNaN(u.start_pos) && !isNaN(u.finish_pos)) {
                            var z = typeof v.times === "string" ? ti.explodeTimes(v.times) : v.times,
                                A = z.workdays.length;
                            z = z.times;
                            for (var B = u.start_pos; ++B < u.finish_pos;) {
                                var k = ti.fGetStopDetails(v.stops[B]),
                                    x = pg.fUrlSet({
                                        schedule: {
                                            city: v.city,
                                            transport: v.transport,
                                            num: v.num,
                                            dirType: v.dirType,
                                            stopId: k.id,
                                            tripNum: (u.trip_num || -1) + 1
                                        }
                                    }, !0);
                                pg.mapStops[k.id] = {
                                    lat: k.lat,
                                    lng: k.lng,
                                    href: x,
                                    img: "stop",
                                    name: ti.printTime(z[u.trip_num + B * A]) + " " + k.name
                                }
                            }
                        }
                    } else if (pg.optimalResults) {
                        var C = new GPolyline([new GLatLng(u.start_stop.lat, u.start_stop.lng), new GLatLng(u.finish_stop.lat, u.finish_stop.lng)], "#000000", 5, .8);
                        pg.GMap.addOverlay(C),
                        pg.mapOverlays.push(C)
                    }
                }
            } else if (f) {
                pg.fShowVehicles();
                var D = ti.fGetRoutes(e, f, g, pg.schedule ? h : !1, !0),
                    y = {};
                if (D.length) {
                    var E = {};
                    for (var t = D.length; --t >= 0;) {
                        var v = D[t];
                        if (v.routeTag && v.dirType != h) continue;
                        y[v.dirType] = !h || v.dirType == h;
                        var F = "map," + v.city + "," + v.transport + "," + v.num + "," + v.dirType;
                        F = ti.toAscii(F, !0),
                        p = "<a href=\"#" + F + "\"><span class=\"icon icon_narrow" + (v.dirType == h ? " icon_checked" : "") + "\"></span>" + v.name + "</a>" + p;
                        if (!y[v.dirType]) continue;
                        for (var s = v.stops.length; --s >= 0;) {
                            k = ti.fGetStopDetails(v.stops[s]);
                            if (!k.lat || !k.lng) continue;
                            j = new GLatLng(k.lat, k.lng);
                            var x = pg.fUrlSet({
                                schedule: {
                                    city: v.city,
                                    transport: v.transport,
                                    num: v.num,
                                    dirType: v.dirType,
                                    stopId: k.id
                                }
                            }, !0);
                            pg.mapStops[k.id] = {
                                lat: k.lat,
                                lng: k.lng,
                                href: x,
                                img: "stopOnRoute" + (!h && t ? "2" : ""),
                                name: k.name,
                                hidden: !0
                            },
                            E[k.name] = k.id,
                            l > k.lat && (l = k.lat),
                            n > k.lng && (n = k.lng),
                            m < k.lat && (m = k.lat),
                            o < k.lng && (o = k.lng),
                            (t == 0 || h) && (s == 0 || s == v.stops.length - 1) && (pg.mapStops[s == 0 ? "MarkerStart" : "MarkerFinish"] = {
                                lat: k.lat,
                                lng: k.lng,
                                href: x,
                                img: s == 0 ? "MarkerStart" : "MarkerRed",
                                transport: f,
                                num: v.num,
                                name: (s == 0 ? i18n.stop.toLowerCase() + "&nbsp;" : "") + k.name
                            })
                        }
                    }
                    for (var G in E) pg.mapStops[E[G]].hidden = !1;
                    D.length > 1 && (F = "map," + v.city + "," + v.transport + "," + v.num, p = "<a href=\"#" + F + "\"><span class=\"icon icon_narrow" + (h ? "" : " icon_checked") + "\"></span>" + i18n.mapShowAllDirections + "</a>" + p),
                    q = "<img class=\"icon icon_narrow\" src=\"" + pg.imagesFolder + f + ".png\"/><span class=\"transfer" + f + "\">&nbsp;" + D[0].num + "</span>",
                    pg.loadPolyline(e, f, g, y)
                }
            }
            p ? (p = "<div style=\"float:left; height:17px;\"><a href=\"#\">" + q + "&nbsp;<span class=\"arrow-down\"></span><!--[if gte IE 7]><!--></a><!--<![endif]--><table class=\"dropdown\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>" + p + "<a id=\"mapShowStopsNames\" href=\"#map\" style=\"border-top:solid 1px #CCCCCC; margin-top:3px;\"><span class=\"icon icon_narrow stopsnames" + (pg.mapShowStopsNames ? " icon_checked" : "") + "\"></span>" + i18n.mapShowRouteStopsNames + "</a>" + (pg.schedule ? "" : "<a href=\"#map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapClearRoute + "</a>") + "</td></tr></table><!--[if lte IE 6]></a><![endif]--></div>", pg.$mapRoutesDropdown.innerHTML = p, pg.$mapRoutesDropdown.style.display = "") : pg.$mapRoutesDropdown.style.display = "none";
            var H = new GLatLngBounds(new GLatLng(l, n), new GLatLng(m, o)),
                I = pg.GMap.getBoundsZoomLevel(H);
            !cfg.firstZoom && pg.GMap.getBounds().containsBounds(H) && (I <= pg.GMap.getZoom() + 1 && (I = 0)),
            I && g ? (!cfg.firstZoom && I == pg.GMap.getZoom() + 1 && --I, cfg.firstZoom || I != pg.GMap.getZoom() ? pg.GMap.setCenter(H.getCenter(), I) : (pg.clusterManager.refresh(), pg.GMap.panTo(H.getCenter()))) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1,
            g && pg.clusterManager.hideMarkers()
        }
        if (!g) {
            pg.$mapRoutesDropdown.style.display = "none",
            pg.transport !== "plan" && (pg.mapMarkerStart.hide(), pg.mapMarkerFinish.hide(), pg.mapStops = {});
            while (pg.mapOverlays.length) pg.GMap.removeOverlay(pg.mapOverlays.pop());
            pg.map = {},
            pg.clusterManager.showMarkers(),
            i && k && k.id && k.id.indexOf(";") < 0 && typeof k.lat == "number" && typeof k.lng == "number" ? (pg.mapStops[i] = {
                lat: k.latAvg,
                lng: k.lngAvg,
                href: "stop/" + i,
                img: "stopOnRoute",
                name: k.name
            }, j = new GLatLng(k.lat, k.lng)) : j = null,
            j && !pg.GMap.getBounds().contains(j) ? cfg.firstZoom ? pg.GMap.setCenter(j) : pg.GMap.panTo(j) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1
        }
        setTimeout(function () {
            pg.GMap.checkResize()
        }, 100)
    } else if (pg.GMap === null) {
        pg.GMap = !1,
        $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + "</div>",
        $("preload").innerHTML = "<img src=\"" + pg.imagesFolder + "stop.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "cluster.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" />",
        cfg.firstZoom = !0;
        var J = String("." + window.location.host).split(".");
        J = J[J.length - 2] + "." + J[J.length - 1];
        var K = {
            "marsrutai.info": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQju4QTY177ZUqtiHd-QtBfjDmWeBTlPLYbFmcJsp5WVjYOKK7pxhVUGA",
            "stops.lt": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhSFiohBI8HDKcqZbSL9Blnl2N0P6xQIY1qdKcarEC3K5F1xlRHMvP2zsw",
            "stops.lt:8001": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRS_AytSF_iFi1JaeVfdJQz3w8fixRgzniHC4NzA78m-sHMkAVpJDQZPQ",
            "ridebus.org": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtcvUe0k-acda2umcpBWexvLqe7hTh8mwk-hjXKhW0nwqlbxJBU1WcfA",
            "marsrutai.lt": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQGlT3sMZUx4ELiDsrzQfh3fbE5khQ-VtHZgCpCq3rMgF4qEPGT_fD-Yw",
            "marsruty.ru": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTgEjs8cB5ffNAZuuA5xYZVRMEC_RSmeQpvGIjEAeBKsPO8v9KmXGeJdg",
            "marsruti.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTYmbSir-xnBQyBRKLAM3-zg8wZKhQcw0RK6Q3vOXEUtA6VwVQNO9N9hg",
            "rigassatiksme.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxSSbFstyt1J_asSxeW1gR9mGgEedBTJBpX_QLqdBGmCpjyPTj8ODBn8oQ",
            "tallinn.ee": "ABQIAAAAY5IFnRsLfXSjZuFUXBlQxxRmcNvZLfb84ObGC-suP-X_C6yqjBSwz9_gsefSDa8JbazmtMODjhF-SQ",
            "mupatp1.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtkVZq0yHlxGB1DBtmGoZBafDtWhSa1kgxMwsdoRr4QNd_h1rXefARdA",
            "muptu.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRG_nk74X5v3utE3dwuERMNPIBz4RRVfJ9UhZonHQJyljheWX-f5oBVhg"
        },
            L = K[J] || K["marsrutai.info"];
        cfg.defaultCity.indexOf("tallinn") >= 0 && (L = K["tallinn.ee"]);
        var M = document.createElement("script");
        M.type = "text/javascript",
        M.async = !0,
        pg.goHomeTimeout ? M.src = "map/gmaplt.js" : M.src = "http://maps.google.com/maps?file=api&v=2&hl=" + pg.language + "&sensor=false&async=2&callback=pg.GMapScriptLoaded&key=" + L;
        if (M.onprogress) {
            var N = "";
            M.onprogress = function () {
                N += ".",
                $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + N + "</div>"
            }
        }
        var O = function () {
            typeof GBrowserIsCompatible != "function" && ($("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.failedMap + "</div>", pg.GMap = null),
            M.onload = M.onreadystatechange = M.onerror = null
        };
        M.onreadystatechange = function () {
            (this.readyState == "complete" || this.readyState == "loaded") && setTimeout(O, 10)
        },
        M.onload = M.onerror = O,
        document.getElementsByTagName("head")[0].appendChild(M)
    } else pg.GMap !== !1 && pg.GMapScriptLoaded()
};

function get_parent(a) {
    return a.parentElement || a.parentNode
}
pg.fTranslateStaticTexts = function () {
    $("divHeader").className = pg.language;
    if (cfg.defaultCity === "chelyabinsk" && (pg.language === "ru" || pg.language === "" && cfg.defaultLanguage === "ru")) {
        var a = i18n.lowFloorVehicles.lastIndexOf(",");
        a > 1 && (i18n.lowFloorVehicles = i18n.lowFloorVehicles.substr(0, a)),
        a = i18n.lowFloorDepartures.lastIndexOf(","),
        a > 80 && (i18n.lowFloorDepartures = i18n.lowFloorDepartures.substr(0, a) + "."),
        a = i18n.checkHandicapped.lastIndexOf(",")
    }
    document.title = i18n.headerTitle,
    ($("header") || {}).innerHTML = (cfg.city.logoInHeader || "") + i18n.headerTitle,
    ($("spanYouAreHere") || {}).innerHTML = i18n.youAreHere,
    ($("formSearch") || {}).action = "//www.rigassatiksme.lv/" + (({
        en: "en/search/",
        ru: "ru/poisk/"
    })[pg.language] || "lv/meklet/"),
    ($("logo_link") || {}).href = ($("topMenuLink1") || {}).href = ($("topMenuLink2") || {}).href = "//www.rigassatiksme.lv/" + pg.language + "/",
    ($("topMenuLink3") || {}).href = "#/" + pg.language,
    ($("topMenuLink4") || {}).href = ($("aTickets") || {}).href = "//www.rigassatiksme.lv/" + (({
        en: "en/tickets-and-e-ticket/",
        ru: "ru/bilety-i-e-talon/"
    })[pg.language] || "lv/biletes-un-e-talons/"),
    ($("topMenuLink5") || {}).href = ($("aForGuests") || {}).href = "//www.rigassatiksme.lv/" + (({
        en: "en/for-riga-guests/",
        ru: "ru/dlya-gostei-rigi/"
    })[pg.language] || "lv/rigas-pilsetas-viesiem/"),
    ($("topMenuLink6") || {}).href = ($("aAbout") || {}).href = "//www.rigassatiksme.lv/" + (({
        en: "en/about-us/",
        ru: "ru/o-nas/"
    })[pg.language] || "lv/par-mums/"),
    ($("topMenuLink7") || {}).href = ($("aServices") || {}).href = "//www.rigassatiksme.lv/" + (({
        en: "en/services/",
        ru: "ru/uslugi/"
    })[pg.language] || "lv/pakalpojumi/"),
    ($("topMenuLink8") || {}).href = ($("aContacts") || {}).href = "//www.rigassatiksme.lv/" + (({
        en: "en/contacts/",
        ru: "ru/kontakty/"
    })[pg.language] || "lv/kontakti/"),
    ($("footer_full_version") || {}).href = "index.html#/" + pg.language;
    if (pg.mobile) {
        var b = document.getElementsByClassName2("menuItem");
        add_classname(b, getWindowWidth() < 470 ? "height54" : "height37"),
        ($("menuItemText1") || {}).innerHTML = pg.language == "en" ? "Routes and schedules" : pg.language == "ru" ? "Маршруты и расписания" : "Maršruti un laiki",
        get_parent($("menuItemText1")).href = "#/" + pg.language,
        ($("menuItemText2") || {}).innerHTML = pg.language == "en" ? "Tickets and e-ticket" : pg.language == "ru" ? "Билеты и э талон" : "Biļetes un e talons",
        ($("menuItemText3") || {}).innerHTML = pg.language == "en" ? "For Riga guests" : pg.language == "ru" ? "Для гостей Риги" : "Rīgas pilsētas viesiem",
        ($("footer_about_us") || {}).innerHTML = pg.language == "en" ? "About us" : pg.language == "ru" ? "О нас" : "Par mums",
        ($("footer_services") || {}).innerHTML = pg.language == "en" ? "Services" : pg.language == "ru" ? "Услуги" : "Pakalpojumi",
        ($("footer_contacts") || {}).innerHTML = pg.language == "en" ? "Contacts" : pg.language == "ru" ? "Контакты" : "Kontakti",
        ($("footer_full_version") || {}).innerHTML = pg.language == "en" ? "Full version" : pg.language == "ru" ? "Полная версия страницы" : "Pilnā lapas versija",
        i18n.routesAndTimetables = i18n.routesAndTimetables.replace("<br/>", " "),
        i18n.departingRoutesRiga = i18n.departingRoutesRiga.replace("<br/>", " ")
    }($("footer_title") || {}).innerHTML = pg.language == "en" ? "Toll-free information phone" : pg.language == "ru" ? "Круглосуточный бесплатный информационный телефон" : "Bezmaksas diennakts informatīvais tālrunis",
    ($("footer_partners") || {}).innerHTML = pg.language == "en" ? "Partners" : pg.language == "ru" ? "Партнеры" : "Sadarbības partneri",
    ($("footer_news") || {}).innerHTML = pg.language == "en" ? "Other types of news" : pg.language == "ru" ? "Другие виды коммуникации" : "Citi saziņas veidi",
    $("spanRoutes").innerHTML = i18n.routesAndTimetables,
    $("spanRoutesFromStop").innerHTML = i18n.departingRoutesRiga,
    $("spanPlan").innerHTML = cfg.city.navigation !== "top" ? i18n.tripPlannerRiga : i18n.tripPlannerRiga.replace("<br/>", " ").replace("<br>", " "),
    $("planner_header").innerHTML = i18n.tripPlannerRiga,
    $("stop_search").innerHTML = i18n.departingStop,
    $("spanShowMap").innerHTML = i18n.showTransportMap,
    ($("aPlanShowMap") || {}).innerHTML = "<br/><br/>" + i18n.showStopsMap.toLowerCase(),
    ($("spanPrintSchedule") || {}).innerHTML = i18n.print,
    ($("spanReturnToRoutes") || {}).innerHTML = i18n.returnToRoutes,
    ($("spanShowDirectionsMap") || {}).innerHTML = i18n.showInMap,
    $("buttonSearch").value = i18n.searchRoute,
    pg.mobile && ($("buttonSearch2").value = i18n.searchRoute),
    $("inputReverseDepartText").innerHTML = i18n.depart,
    $("inputReverseArriveText").innerHTML = i18n.arrive,
    ($("earliestDeparture") || {}).innerHTML = i18n.earliestDeparture || "pirmais reiss",
    ($("latestDeparture") || {}).innerHTML = i18n.latestDeparture || "pēdējais reiss",
    pg.specialDeparture && ($("inputTime").value = i18n[pg.specialDeparture]),
    $("labelDepartureDate").innerHTML = i18n.departuresFor,
    $("inputDepartureDate-1").text = i18n.fromNow,
    $("inputDate0").text = $("inputDepartureDate0").text = i18n.today,
    $("inputDate1").text = $("inputDepartureDate1").text = i18n.tomorrow,
    ($("mapShowAllStops") || {}).title = i18n.mapShowAllStops;
    var c = new Date;
    pg.stopSettings || ($("inputDepartureDate").value = "-1");
    for (var a = 0; a <= 6; a++) {
        var d = new Date(c.getFullYear(), c.getMonth(), c.getDate() + a);
        pg.stopSettings && pg.formatDate(d) == pg.stopSettings && ($("inputDepartureDate").value = "" + a),
        a >= 2 && ($("inputDate" + a).text = pg.formatDate(d), $("inputDepartureDate" + a).text = pg.formatDate(d))
    }
    $("labelHandicapped").title = i18n.checkHandicapped,
    $("aExtendedOptions").innerHTML = $("divContentPlannerOptionsExtended").style.display ? i18n.extendedOptions : i18n.extendedOptionsHide,
    $("labelRoutes").innerHTML = i18n.rideOnlyRoutes + ":",
    $("labelChangeTimeText").innerHTML = i18n.timeForConnection + ":",
    $("labelWalkMaxText").innerHTML = i18n.walkingMax + ":",
    $("labelWalkSpeedText").innerHTML = i18n.walkingSpeed + ":";
    var e = $("inputStop");
    e.title = i18n.typeStartStop,
    e.className == "empty" && (e.value = i18n.startStop),
    e = $("inputStart"),
    e.title = i18n.typeStartStop,
    e.className == "empty" && (e.value = i18n.startStop),
    e = $("inputFinish"),
    e.title = i18n.typeFinishStop,
    e.className == "empty" && (e.value = i18n.finishStop),
    e = $("inputRoutes"),
    e.title = i18n.typeRouteNameOrNumber,
    e.className == "empty" && (e.value = i18n.typeRouteNameOrNumber),
    $("labelInputRoutes").innerHTML = i18n.filter + ":",
    b = document.getElementsByClassName2("show_map", null, "span");
    for (var f = 0; f < b.length; f++) b[f].innerHTML = "Parādīt karti ar visām pieturām";
    b = document.getElementsByClassName2("hide_map", null, "span");
    for (var f = 0; f < b.length; f++) b[f].innerHTML = i18n.hideMap
},
pg.inputSuggestedStops_Focus = function (a) {
    pg.inputActive !== a && (pg.inputActive = a, pg.stopsSuggestedForText = pg[pg.inputActive.id] ? pg.inputActive.value : null);
    if (pg.inputActive.className === "empty") pg.inputActive.className = "",
    pg.inputActive.value = "";
    else {
        if (pg.timerSuggestedStopsShow === !1) {
            pg.timerSuggestedStopsShow = 0;
            return
        }
        pg.fSuggestedStopsShow(!0),
        pg.timerSuggestedStopsShow === 0 && (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200))
    }
},
pg.fSuggestedStopsShow = function (a) {
    if (pg.inputActive) {
        var b = pg.inputActive.value,
            c = $("divSuggestedStops");
        if (a !== !0 && pg.stopsSuggestedForText === b && c.style.display === "block") return;
        if (a !== !0 && pg.stopLastTyped !== b) {
            pg.stopLastTyped = b;
            return
        }
        pg.stopsSuggestedForText != b && pg.inputStopText != pg.stopSuggestedForMap && (pg[pg.inputActive.id] = ""),
        pg.stopLastTyped = b,
        typeof ti.stops === "object" && (pg.stopsSuggestedForText = b);
        var d = [];
        if (b.length < 2 || typeof ti.stops != "object") {
            pg.fSuggestedStopsHide();
            return
        }
        var e = ti.fGetStopsByName(pg.stopSuggestedForMap || b);
        if (e.length == 0) d.push("<a id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + i18n.noStopsFound + "</a>");
        else {
            var f = "," + pg[pg.inputActive.id] + ",";
            for (var g = 0; g < e.length; g++) {
                var h = e[g],
                    i = [];
                h.city && !cfg.cities[pg.city].skipStopCity && i.push(h.city),
                h.area && !cfg.cities[pg.city].skipStopArea && i.push(h.area),
                h.streets && i.push(h.streets),
                len = b.length,
                name = [h.name.substr(0, h.indexOf), "<em>", h.name.substr(h.indexOf, len), "</em>", h.name.substr(h.indexOf + len)].join(""),
                i = i.length > 0 ? "<span class=\"details\"> (" + i.join(", ") + ")</span>" : "",
                i = "<a id=\"" + h.id + "\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></span>" + name + i + "</a>",
                !1 && f.indexOf("," + h.id + ",") >= 0 ? d.splice(0, 0, i) : d.push(i)
            }
        }
        d.push("<a id=\"aSuggestShowMap\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_stops\"></span>" + i18n.selectFromMap + "</a>"),
        c.innerHTML = d.join("");
        if (pg.inputActive.offsetHeight) {
            var j = pg.inputActive.offsetLeft,
                k = pg.inputActive.offsetTop + pg.inputActive.offsetHeight + 1,
                l = $("divContentWrapper").offsetLeft,
                m = $("divHeader").offsetHeight;
            pg.transport == "stop" ? (c.style.top = (pg.mobile ? m + 107 : 280) + "px", c.style.left = (pg.mobile ? l + 13 : l + $("stop_input_text").offsetWidth + 59) + "px") : pg.transport == "plan" && (c.style.top = (pg.mobile ? m + (pg.inputActive.id == "inputStart" ? 107 : 152) : 314) + "px", c.style.left = l + ((pg.mobile ? 1 : 48) + j) + "px")
        }
        pg.inputActive.offsetWidth > 2 && (c.style.minWidth = pg.inputActive.offsetWidth - 2 + "px", pg.mobile && (c.style.maxWidth = pg.inputActive.offsetWidth - 2 + "px")),
        c.scrollTop = 0,
        c.style.overflowX = "hidden",
        c.style.overflowY = d.length > 6 ? "scroll" : "hidden",
        c.style.height = d.length > 6 ? "156px" : "auto",
        c.style.display = "block";
        var n = $("frameHideSelects");
        n && (n.style.left = c.style.left, n.style.width = c.offsetWidth + "px", n.style.top = c.style.top, n.style.height = c.offsetHeight + "px", n.style.display = "block")
    }
},
pg.fLoadPlannerTab = function (a) {
    a === !0 && (pg.optimalResults = null, pg.loadedPlannerParams = null, pg.hashForMap = "");
    var b = ti.fGetAnyStopDetails(pg.inputStart),
        c = ti.fGetAnyStopDetails(pg.inputFinish);
    c.id ? ($("inputFinish").value = c.name || "", $("inputFinish").className = "") : !pg.inputFinish && typeof ti.stops == "object" && ($("divContentPlannerResults").innerHTML = i18n.typeFinishStop, document.activeElement && document.activeElement.id !== "inputFinish" && ($("inputFinish").value = i18n.finishStop, $("inputFinish").className = "empty"));
    if (b.id) $("inputStart").value = b.name || "",
    $("inputStart").className = "";
    else if (!pg.inputStart || typeof ti.stops == "object") $("divContentPlannerResults").innerHTML = i18n.typeStartStop,
    document.activeElement && document.activeElement.id !== "inputStart" && ($("inputStart").value = i18n.startStop, $("inputStart").className = "empty");
    if (a !== !0 && pg.plannerSettings) {
        var d = pg.plannerSettings,
            e = d.indexOf("arrive");
        e != -1 && ($("inputReverseArrive").checked = !0, d = d.replace("arrive", ""));
        var f = d.indexOf("params");
        f != -1 && (d = d.replace("params", ""), $("divContentPlannerOptionsExtended").style.display == "none" && pg.fTogglePlannerOptions()),
        d = d.split(",");
        for (var g = 0; g < d.length; g++) if (d[g].length < 8) d[g].length && ($("inputTime").value = d[g]);
        else {
            var h = new Date;
            $("inputDate").value = "0";
            for (var i = 1; i <= 6; i++) {
                var j = new Date(h.getFullYear(), h.getMonth(), h.getDate() + i);
                if (d[g] == pg.formatDate(j, "en")) {
                    $("inputDate").value = "" + i;
                    break
                }
            }
        }
    }
    var k = "" + $("inputTime").value,
        l = $("inputReverseDepart").checked ? 1 : -1;
    k === "" ? (k = ti.dateToMinutes(new Date) % 1440, $("inputTime").value = ti.printTime(k), $("inputTime").defaultValue = ti.printTime(k)) : k == i18n.earliestDeparture ? (k = 0, l = 1) : k == i18n.latestDeparture ? (k = 1800, l = -1) : k = ti.toMinutes(k);
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") $("divContentPlannerResults").innerHTML = "<br/>" + i18n.receivingData,
    setTimeout(pg.fLoadPlannerTab, 200);
    else {
        var d = [],
            m = $("inputTime").value;
        m != $("inputTime").defaultValue && d.push(m),
        $("inputReverseDepart").checked || d.push("arrive"),
        $("divContentPlannerOptionsExtended").style.display != "none" && d.push("params");
        var n = $("inputDate").value,
            h = new Date,
            j = new Date(h.getFullYear(), h.getMonth(), h.getDate() + parseInt(n, 10));
        n != "0" && d.push(pg.formatDate(j, "en")),
        pg.plannerSettings = d.length ? d.join(",") : "",
        pg.fUrlSet({
            transport: "plan",
            inputStart: pg.inputStart || pg.inputStop,
            inputFinish: pg.inputFinish,
            plannerSettings: pg.plannerSettings
        });
        if (!pg.inputStart && !pg.inputFinish || (pg.loadedPlannerParams || "").indexOf("clear") >= 0) {
            pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish,
            pg.optimalResults = null,
            pg.hashForMap && pg.hashForMap != "map" && (pg.map = {}, pg.hashForMap = "map", pg.fMapShow());
            var o = pg.fUrlSet({
                hashForMap: "map"
            }, !0);
            $("divContentPlannerResults").innerHTML = "<p class=\"help\">" + i18n.tripPlannerHelp + "</p><p class=\"help\">" + i18n.tripPlannerHelpMap.replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + o + "\">") + "</p>";
            return
        }
        pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish;
        if (!b.id || !c.id) return;
        var h = new Date,
            j = new Date(h.getFullYear(), h.getMonth(), h.getDate() + +$("inputDate").value),
            p = {
                start_stops: pg.inputStart,
                finish_stops: pg.inputFinish,
                reverse: l,
                date: j,
                start_time: k,
                lowFloor: $("checkHandicapped").checked,
                transport: {},
                route_nums: ("" || $("inputRoutesFilter").value).trim(),
                walk_speed_kmh: parseInt($("inputWalkSpeed").value || 4, 10),
                walk_max: $("inputWalkMax").value,
                change_time: parseInt($("inputChangeTime").value || 3, 10),
                callback1: pg.fPrintOptimalTrips,
                callback: pg.fPrintOptimalTrips
            },
            q = pg.fGetCity(pg.city);
        for (var r = 1; r <= 2; r++) {
            for (var i = 0, s = cfg.cities[q].transport; i < s.length; i++) p.transport[s[i]] = ($("checkbox" + s[i]) || {
                checked: !0
            }).checked;
            q = cfg.cities[q].region;
            if (!q || !cfg.cities[q]) break
        }
        $("divContentPlannerResults").innerHTML = "<br/>" + i18n.calculating,
        setTimeout(function () {
            ti.findTrips(p),
            pg.mobile && setTimeout(function () {
                var a = $("planner_results_table").offsetTop + 100 - window.scrollY;
                window.scrollBy(0, a)
            }, 400)
        }, 100)
    }
},
pg.GMapScriptLoaded = function () {
    if (!GBrowserIsCompatible()) {
        alert("Sorry, the Google Maps API is not compatible with this browser");
        return !1
    }
    if (typeof ti.stops !== "object" || typeof ti.routes !== "object") setTimeout(pg.GMapScriptLoaded, 200);
    else {
        pg.storeStyles(),
        pg.GMap = 0;
        if ((document.body.className || "").indexOf("Map") < 0) return;
        var a, b = cfg.cities[pg.city] || {};
        b.streetMap = b.streetMap || "GMaps";
        var c = {
            googleBarOptions: {
                style: "new"
            }
        };
        c.logoPassive = "true",
        c.suppressCopyright = "true";
        var d = pg.GMap = new GMap2($("divMap"), c);
        d.options = c.googleBarOptions;
        var e = new GMapType(G_PHYSICAL_MAP.getTileLayers(), G_PHYSICAL_MAP.getProjection(), i18n.physicalMap),
            f = new GMapType(G_SATELLITE_MAP.getTileLayers(), G_SATELLITE_MAP.getProjection(), i18n.satelliteMap),
            g = new GMapType(G_HYBRID_MAP.getTileLayers(), G_HYBRID_MAP.getProjection(), i18n.hybridMap);
        d.getMapTypes().length = 0;
        if (b.streetMap.indexOf("OSM") < 0) a = new GMapType(G_NORMAL_MAP.getTileLayers(), G_NORMAL_MAP.getProjection(), i18n.streetMap),
        d.addMapType(a),
        d.setMapType(a);
        else {
            var h = [new GTileLayer(new GCopyrightCollection("OpenStreetMap"), 0, 19)];
            h[0].getCopyright = function (a, b) {
                return {
                    prefix: "",
                    copyrightTexts: ["OpenStreetMap"]
                }
            },
            b.streetMap === "OSMlocal" ? h[0].getTileUrl = function (a, b) {
                return "osm/" + b + "/" + a.x + "/" + a.y + ".png"
            } : h[0].getTileUrl = function (a, b) {
                return "http://a.tile.openstreetmap.org/" + b + "/" + a.x + "/" + a.y + ".png"
            },
            a = new GMapType(h, G_NORMAL_MAP.getProjection(), i18n.streetMap),
            b.streetMap === "OSMlocal" && (a.getMinimumResolution = function () {
                return 10
            }, a.getMaximumResolution = function () {
                return 16
            }),
            d.addMapType(a),
            d.setMapType(a)
        }
        if (b.streetMap != "OSMlocal") {
            d.addMapType(e),
            d.addMapType(f),
            d.addMapType(g),
            d.addMapType(G_SATELLITE_3D_MAP);
            var j = new GHierarchicalMapTypeControl;
            j.addRelationship(f, g, null, !1),
            d.addControl(j, new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(55, 10)))
        }
        d.setCenter(new GLatLng(b.lat || 59.43923, b.lng || 24.7588), b.zoom || 12),
        d.enableDoubleClickZoom(),
        d.enableScrollWheelZoom(),
        d.enableContinuousZoom(),
        d.enablePinchToZoom();
        try {
            d.enableGoogleBar()
        } catch (k) {}
        d.addControl(new GLargeMapControl3D),
        d.addControl(new GScaleControl),
        pg.$mapShowAllStops = document.createElement("div"),
        pg.$mapShowAllStops.id = "divMapShowAllStops",
        pg.$mapShowAllStops.style.border = "solid 1px black",
        pg.$mapShowAllStops.style.height = "17px",
        pg.$mapShowAllStops.style.width = "17px",
        pg.$mapShowAllStops.innerHTML = "<div id=\"mapShowAllStops\" class=\"button icon_stops\" title=\"" + i18n.mapShowAllStops + "\"></div>",
        pg.$mapRoutesDropdown = document.createElement("div"),
        pg.$mapRoutesDropdown.className = "dropdown",
        b.streetMap === "OSMlocal" ? ((new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(82, 10))).apply(pg.$mapShowAllStops), (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(106, 10))).apply(pg.$mapRoutesDropdown)) : ((new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(332, 10))).apply(pg.$mapShowAllStops), (new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(356, 10))).apply(pg.$mapRoutesDropdown)),
        d.getContainer().appendChild(pg.$mapShowAllStops),
        pg.mapShowAllStops = !0,
        d.getContainer().appendChild(pg.$mapRoutesDropdown),
        pg.$mapMenu = document.createElement("div"),
        pg.$mapMenu.style.display = "none",
        pg.$mapMenu.className = "mapMenu",
        d.getContainer().appendChild(pg.$mapMenu),
        pg.$transportMenu = document.createElement("div"),
        pg.$transportMenu.style.display = "none",
        pg.$transportMenu.className = "transportMenu",
        d.getContainer().appendChild(pg.$transportMenu);
        var l;
        GEvent.addDomListener(d.getContainer(), "contextmenu", function (a) {
            l = null,
            $("divSuggestedStops").style.display = "none",
            a || (a = window.event);
            var b = a && (a.target || a.srcElement);
            if (!b || b.id == "mapShowAllStops") return pg.cancelEvent(a);
            var c = b && (b.tagName || "").toLowerCase() || "";
            b && c !== "a" && c !== "img" && (b = b.parentNode, c = b && (b.tagName || "").toLowerCase() || "");
            var d = b && (c === "a" && b.href || c === "img" && b.id || "") || "";
            if (b && b.parentNode && (b.parentNode.tagName || "").toLowerCase() == "td") return pg.cancelEvent(a);
            if (d && d.indexOf("#") >= d.length - 1) return pg.cancelEvent(a);
            d ? l = b : l = {}
        }),
        GEvent.addDomListener(d.getContainer(), "click", function (a) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.inputSuggestedStops_Blur(),
            a = a || window.event;
            var b = a && (a.target || a.srcElement);
            if (b.id == "mapShowAllStops") {
                pg.mapShowAllStops = !pg.mapShowAllStops,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowStopsNames") {
                pg.mapShowStopsNames = !pg.mapShowStopsNames;
                var c = pg.$mapRoutesDropdown.innerHTML.replace("stopsnames icon_checked", "stopsnames");
                pg.$mapRoutesDropdown.innerHTML = pg.mapShowStopsNames ? c.replace("stopsnames", "stopsnames icon_checked") : c,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            var e = b && (b.tagName || "").toLowerCase() || "";
            b && e !== "a" && e !== "img" && (b = b.parentNode);
            var f = b && (e === "a" && b.href || e === "img" && b.id || "") || "";
            pg.$mapMenu && (pg.$mapMenu.style.display = "none"),
            pg.$transportMenu && (pg.$transportMenu.style.display = "none");
            if (f.indexOf("#") < 0 || f.indexOf("#") >= f.length - 1) return pg.cancelEvent(a);
            var g = pg.fUrlParse(f);
            if (g.schedule && e !== "img") f = pg.fUrlSet({
                schedule: g.schedule
            });
            else if (g.transport == "stop" || g.schedule) {
                var h = g.schedule && g.schedule.stopId || g.inputStop,
                    i = ti.fGetAnyStopDetails(h);
                if ((b.className || "").toLowerCase().indexOf("cluster") < 0) if (e === "img") {
                    if (h) {
                        var j = [],
                            k = pg.fUrlSet({
                                transport: "plan",
                                inputStart: h,
                                hashForMap: "map"
                            }, !0),
                            l = pg.fUrlSet({
                                transport: "plan",
                                inputFinish: h,
                                hashForMap: "map"
                            }, !0);
                        j.push("<br/><a href=\"#" + k + "\"><span style=\"margin-left:5px;\" class=\"icon icon_stopGreen\"></span>" + (f ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                        j.push("<br/><a href=\"#" + l + "\"><span style=\"margin-left:5px;\" class=\"icon icon_stopRed\"></span>" + (f ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                        j.push("<br/><a href=\"#stop/" + h + "/map\" class=\"cluster\"><span style=\"margin-right:3px;\" class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>");
                        var m = ti.fGetRoutesAtStop(h, !1, !0),
                            c = [],
                            n = null,
                            o = 16,
                            p = 1,
                            q = null;
                        for (var r = 0; r < m.length; r++) {
                            route = m[r],
                            n != route.transport && (n = route.transport, c.push("<br/><span class=\"icon icon_narrow icon_" + route.transport + "\"></span>"), p = 1, q = null);
                            var s = {
                                id: route.id,
                                city: route.city,
                                transport: route.transport,
                                num: ti.toAscii(route.num, !0),
                                dirType: route.dirType,
                                routeTag: route.stopId,
                                stopId: route.stopId
                            };
                            if (s.num == q) continue;
                            q = s.num;
                            var t = pg.fUrlSet({
                                schedule: s
                            }, !0),
                                u = "<a class=\"hover activetransfer " + route.transport + "\" href=\"#" + t + "\" title=\"" + (route.name || "").replace(/"/g, "") + "\">" + route.num.replace(/\s/g, "&nbsp;") + "</a> ";
                            c.push(u),
                            p % o || c.push("<br/><span style=\"margin-left:22px;\"></span>"),
                            p += 1
                        }
                        var v = ti.fGetAnyStopDetails(h).name;
                        pg.$transportMenu.innerHTML = "<div class=\"baloon_content\"><span class=\"baloon_title\">" + v + "</span>" + c.join("") + j.join("") + "</div>",
                        pg.$transportMenu.style.display = "block";
                        var w = d.getContainer(),
                            x = pg.$transportMenu.offsetTop,
                            y = pg.$transportMenu.offsetLeft,
                            z = pg.$transportMenu.offsetWidth,
                            A = pg.$transportMenu.offsetHeight;
                        if (y + z / 2 > w.offsetWidth) y = y - z,
                        x - A > 0 && (x -= A - 12),
                        (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(y, x))).apply(pg.$transportMenu);
                        else if (y - z / 2 < 0 && x - A > 0) x -= A - 12,
                        (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(y, x))).apply(pg.$transportMenu);
                        else if (x - A > 0) {
                            x -= A;
                            var B = z / 2,
                                y = y - B;
                            (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(y, x))).apply(pg.$transportMenu);
                            var C = document.createElement("div");
                            C.style.left = B - 7 + "px",
                            C.className = "baloon_arrow",
                            pg.$transportMenu.appendChild(C)
                        }
                    }
                } else g.transport == "stop" && (pg.hashForMap = "map", pg.map = {}, pg.fTabStop_Click(g.inputStop));
                else i.latAvg && i.lngAvg && pg.GMap.zoomIn(new GLatLng(i.latAvg, i.lngAvg), !1, !0)
            } else g.transport == "plan" ? (pg.hashForMap = g.hashForMap, pg.map = {}, pg.optimalResults = null, pg.fTabPlanner_Click(g.inputStart, g.inputFinish)) : (pg.hashForMap = g.hashForMap, pg.hashForMap == "map" && (pg.mapShowAllStops = !0), pg.fUrlSet(pg));
            return pg.cancelEvent(a)
        }),
        GEvent.addListener(d, "click", function (a, b, c) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none";
            var e = d.fromLatLngToContainerPixel(b || c);
            (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(e.x, e.y))).apply(pg.$mapMenu),
            (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(e.x, e.y))).apply(pg.$transportMenu)
        }),
        GEvent.addDomListener(d.getContainer(), "mouseout", function (a) {
            a || (a = window.event);
            var b = a && (a.target || a.srcElement),
                c = d.getContainer();
            b && b == c,
            b = a.relatedTarget || a.toElement;
            while (b && (b.tagName || "").toLowerCase() != "body") {
                if (b === c) return;
                b = b.parentNode
            }
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "movestart", function (a) {
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "zoomstart", function (a) {
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "singlerightclick", function (a, b, c) {
            if (l) {
                var d = a.x,
                    e = a.y,
                    f = [],
                    g, h, i = (l.tagName || "").toLowerCase() || "",
                    j = i === "a" && l.href || i === "img" && l.id || "";
                if (j) {
                    f.push();
                    var k = pg.fUrlParse(j);
                    if (k.schedule && k.schedule.stopId) {
                        f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowTimetableFromStop + "</a>"),
                        g = pg.fUrlSet({
                            transport: "plan",
                            inputStart: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0),
                        h = pg.fUrlSet({
                            transport: "plan",
                            inputFinish: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        var j = pg.fUrlSet({
                            inputStop: k.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        f.push("<a href=\"#stop/" + k.schedule.stopId + "/map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>")
                    } else(l.className || "").toLowerCase().indexOf("cluster") < 0 ? cfg.searchOnly || f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>") : f.push("<a href=\"" + j + "\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>"),
                    g = pg.fUrlSet({
                        transport: "plan",
                        inputStart: k.inputStop,
                        hashForMap: "map"
                    }, !0),
                    h = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: k.inputStop,
                        hashForMap: "map"
                    }, !0)
                } else {
                    var m = pg.GMap.fromContainerPixelToLatLng(new GPoint(d, e)),
                        n = ("" + m.lat()).substring(0, 8) + ";" + ("" + m.lng()).substring(0, 8);
                    g = pg.fUrlSet({
                        transport: "plan",
                        inputStart: n
                    }, !0),
                    h = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: n
                    }, !0)
                }
                f.push("<a href=\"#" + g + "\"><span class=\"icon icon_stopGreen\"></span>" + (j ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                f.push("<a href=\"#" + h + "\"><span class=\"icon icon_stopRed\"></span>" + (j ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                pg.$mapMenu.innerHTML = f.join(""),
                pg.$mapMenu.style.display = "block",
                d - pg.$mapMenu.offsetWidth > 0 && (d -= pg.$mapMenu.offsetWidth),
                e - pg.$mapMenu.offsetHeight > 0 && (e -= pg.$mapMenu.offsetHeight),
                (new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(d, e))).apply(pg.$mapMenu)
            }
        }),
        ELabel = function (a, b, c, d, e) {
            this.point = a,
            this.html = b,
            this.href = c,
            this.classname = d || "",
            this.pixelOffset = e || new GSize(0, 0),
            this.hidden = !1
        },
        ELabel.prototype = new GOverlay,
        ELabel.prototype.initialize = function (a) {
            var b = document.createElement("a");
            b.style.position = "absolute",
            b.className = this.classname,
            b.href = "#" + this.href,
            b.innerHTML = this.html,
            a.getPane(G_MAP_MARKER_PANE).appendChild(b),
            this.map_ = a,
            this.div_ = b;
            if (this.overlap) {
                var c = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = c
            }
            this.hidden && this.hide()
        },
        ELabel.prototype.remove = function () {
            GEvent.clearInstanceListeners(this.div_),
            this.div_.parentNode.removeChild(this.div_)
        },
        ELabel.prototype.copy = function () {
            return new ELabel(this.point, this.html, this.href, this.classname, this.pixelOffset, this.percentOpacity, this.overlap)
        },
        ELabel.prototype.redraw = function (a) {
            if (this.point && this.point.x && this.point.y) {
                var b = this.map_.fromLatLngToDivPixel(this.point),
                    c = parseInt(this.div_.clientHeight);
                this.div_.style.left = b.x + this.pixelOffset.width + "px",
                this.div_.style.top = b.y + this.pixelOffset.height - c + "px"
            }
        },
        ELabel.prototype.show = function () {
            this.div_ && (this.div_.style.display = "", this.redraw()),
            this.hidden = !1
        },
        ELabel.prototype.hide = function () {
            this.hidden || (this.div_ && (this.div_.style.display = "none"), this.hidden = !0)
        },
        ELabel.prototype.isHidden = function () {
            return this.hidden
        },
        ELabel.prototype.supportsHide = function () {
            return !0
        },
        ELabel.prototype.setContents = function (a, b) {
            this.div_.innerHTML = this.html = a,
            typeof b != "undefined" && (this.div_.href = "#" + b)
        },
        ELabel.prototype.setPoint = function (a) {
            this.point = a;
            if (this.overlap) {
                var b = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = b
            }
            this.redraw(!0)
        },
        ELabel.prototype.getPoint = ELabel.prototype.getLatLng = function () {
            return this.point
        },
        ClusterManager = function (a, b) {
            this._map = a,
            this._mapMarkers = [],
            this._markersHidden = !1,
            this._div = document.createElement("div"),
            this._div.id = "ClusterManagerStopsPane",
            this._map.getPane(G_MAP_MARKER_PANE).appendChild(this._div),
            b = b || {},
            this.fitMapToMarkers = b.fitMapToMarkers === !0,
            b.fitMapMaxZoom && (this.fitMapMaxZoom = b.fitMapMaxZoom),
            this.clusterMaxZoom = b.clusterMaxZoom ? b.clusterMaxZoom : 99,
            b.markers && this.addMarkers(b.markers),
            this.borderPadding = b.borderPadding || 256,
            this.intersectPadding = b.intersectPadding || 0,
            this.clusteringEnabled = b.clusteringEnabled !== !1,
            this.ZoomLevel = this._map.getZoom(),
            GEvent.bind(this._map, "moveend", this, this._moveEnd),
            GEvent.bind(this._map, "zoomend", this, this._zoomEnd),
            GEvent.bind(this._map, "maptypechanged", this, this._zoomEnd)
        },
        ClusterManager.prototype._zoomEnd = function () {
            pg.$mapVehicles.innerHTML = "",
            this.refresh(),
            pg.fShowVehicles()
        },
        ClusterManager.prototype._moveEnd = function () {
            this.ZoomLevel != this._map.getZoom() ? this.ZoomLevel = this._map.getZoom() : this.refresh()
        },
        ClusterManager.prototype.addMarkers = function (a) {
            if (this.fitMapToMarkers) {
                var b = new GLatLngBounds;
                for (var c = a.length; --c >= 0;) b.extend(a[c].getLatLng());
                var d = this._map.getBoundsZoomLevel(b);
                this.fitMapMaxZoom && d > this.fitMapMaxZoom && (d = this.fitMapMaxZoom),
                this._map.setCenter(b.getCenter(), d)
            }
            var e = this._map.getCurrentMapType().getProjection();
            for (var c = a.length; --c >= 0;) {
                var f = a[c],
                    g = e.fromLatLngToPixel(new GLatLng(f.lat, f.lng), 19);
                f._x = g.x,
                f._y = g.y
            }
            a.sort(function (a, b) {
                return b._y - a._y
            }),
            this._mapMarkers = a
        },
        ClusterManager.prototype.refresh = function () {
            pg.timeOfActivity = (new Date).getTime(),
            pg.toggleClass($("mapShowAllStops"), "pressed", pg.mapShowAllStops),
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none";
            var a = this._markersHidden ? "Gray" : "",
                b = this._map,
                c = b.getCurrentMapType().getProjection(),
                d = [],
                e = c.fromLatLngToPixel(this._map.getBounds().getSouthWest(), 19),
                f = c.fromLatLngToPixel(this._map.getBounds().getNorthEast(), 19),
                g = this._mapMarkers,
                h = pg.mapStops,
                j, k, l, m = {};
            if (pg.mapShowAllStops) {
                var n = 19 - this._map.getZoom(),
                    o = 1 << n + 8,
                    p = e.x - o,
                    q = f.x + o,
                    r = e.y + o,
                    s = f.y - o,
                    t = this._map.getZoom(),
                    u = this.clusteringEnabled && t <= this.clusterMaxZoom;
                o = 1 << n + 3 + (t < 12 ? 1 : 0);
                for (i = g.length; --i >= 0;) {
                    j = g[i];
                    var v = j._y;
                    if (v < s || !j.name) continue;
                    if (v > r) break;
                    var w = j._x;
                    if (w >= p && w <= q) {
                        if (j.id in m) continue;
                        var x = w,
                            y = v,
                            z = [],
                            A = [],
                            B = 1;
                        if (u) {
                            var C = h[j.id],
                                D = j.name;
                            D.length > 1 && !isNaN(D.charAt(D.length - 1)) && (D = D.substring(0, D.length - 1));
                            for (var E = i; --E >= 0;) {
                                var F = g[E];
                                if (F._y > y + o) break;
                                if (F.id in m) continue;
                                F._x <= x + o && F._x >= x - o && (t < 12 || F.name.indexOf(D) == 0) && (C = C || h[F.id], m[F.id] = !0, z.push(F.id), A.push(F.name), B++, x = (w += F._x) / B, y = (v += F._y) / B)
                            }
                        }
                        if (B > 1) {
                            z.push(j.id),
                            k = c.fromPixelToLatLng(new GPoint(x, y), 19),
                            k = this._map.fromLatLngToDivPixel(k);
                            var G, H = 1;
                            if (t < 12) {
                                A.sort();
                                for (var E = A.length; --E > 0;) A[E] != A[E - 1] && ++H;
                                G = H > 2 ? i18n.totalStops + ": " + H : (A[0] + (H > 1 ? ", " + A[A.length - 1] : "")).replace(/"/g, "")
                            } else G = D.replace(/"/g, "");
                            (!C || H > 1) && d.push((H > 1 ? "<img class=\"cluster\" style=\"width:9px; height:9px;" : "<img style=\"width:8px; height:8px;") + " cursor:pointer; vertical-align:top; position:absolute;  top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" id=\"#stop/" + z.join(",") + "/map\" src=\"" + pg.imagesFolder + (H > 1 ? "cluster" : "stop") + a + ".png\" title=\"" + (window.chrome ? "" : G) + "\" />")
                        } else C || (k = b.fromLatLngToDivPixel(new GLatLng(j.lat, j.lng)), d.push("<img id=\"#stop/" + j.id + "/map\" style=\"cursor:pointer; vertical-align:top; position:absolute; width:8px; height:8px; top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" src=\"" + pg.imagesFolder + "stop" + a + ".png\" title=\"" + (window.chrome ? "" : (j.name || "").replace(/"/g, "")) + "\" />"))
                    }
                }
            }
            pg.mapLabelHeight = pg.mapLabelHeight || parseInt(pg.stopLabelSelected.div_.clientHeight, 10);
            for (l in h) {
                j = h[l],
                k = b.fromLatLngToDivPixel(new GLatLng(j.lat, j.lng));
                var G = pg.browserVersion < 7 && (!pg.mapShowStopsNames || j.hidden) ? " title=\"" + j.name.replace(/"/g, "") + "\"" : "";
                j.img == "MarkerStart" ? d.push("<a href=\"#" + j.href + "\" class=\"label_transport\" style=\"position:absolute; left:" + (k.x + 11) + "px; top:" + (k.y - 29) + "px;\"><img src=\"" + pg.imagesFolder + j.transport + ".png\" />" + (j.num && "<span class=\"transfer" + j.transport + "\" style=\"line-height:18px; vertical-align:top;\">" + j.num + "</span>&nbsp;") + "<span" + (pg.mapShowStopsNames ? "" : " class=\"unhide\"") + " style=\"line-height:18px; vertical-align:top; border:0 none;\">" + j.name + "&nbsp;</span></a><img src=\"" + pg.imagesFolder + "tip.png\" style=\"position:absolute; z-index:105; left:" + (k.x + 4) + "px; top:" + (k.y - 11) + "px;\" />") : j.img == "MarkerRed" ? d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 6) + "px; top:" + (k.y - 20) + "px;\">") : (j.img || "").indexOf("stopOnRoute") < 0 ? j.img && d.push("<a class=\"mapStop\" href=\"#" + j.href + "/map\" style=\"position:absolute; left:" + (k.x - 4) + "px; top:" + (k.y - 4) + "px;\">") : d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 5) + "px; top:" + (k.y - 5) + "px;\">"),
                j.img != "MarkerStart" && (d.push("<img id=\"#" + j.href + "/map\" src=\"" + pg.imagesFolder + j.img + ".png\"" + G + " style=\"vertical-align:top;\" /></a>"), G || d.push("<a href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x + 4) + "px; top:" + (k.y - 4 - pg.mapLabelHeight) + "px;\" class=\"mapStopName" + (pg.mapShowStopsNames && !j.hidden ? "" : "Hidden") + "\">" + j.name + "</a>"))
            }
            this._div.innerHTML = d.join("")
        },
        ClusterManager.prototype.removeMarkers = function () {
            this._div.innerHTML = "",
            this._mapMarkers = []
        },
        ClusterManager.prototype.hideMarkers = function () {
            this._markersHidden || (this._markersHidden = !0, this.refresh())
        },
        ClusterManager.prototype.showMarkers = function () {
            this._markersHidden !== !1 && (this._markersHidden = !1, this.refresh())
        },
        pg.splitEncodedPolyline = function (a, b, c, d, e, f) {
            var g = a.length,
                h = 0,
                i = [],
                j = 0,
                k = 0,
                l = Number.POSITIVE_INFINITY,
                m, n, o = 0,
                p = 0,
                q = 0;
            c *= 1e5,
            e *= 1e5,
            d *= 1e5,
            f *= 1e5;
            while (h < g) {
                var r, s = 0,
                    t = 0;
                do r = a.charCodeAt(h++) - 63,
                t |= (r & 31) << s,
                s += 5;
                while (r >= 32);
                var u = t & 1 ? ~ (t >> 1) : t >> 1;
                j += u,
                s = 0,
                t = 0;
                do r = a.charCodeAt(h++) - 63,
                t |= (r & 31) << s,
                s += 5;
                while (r >= 32);
                var v = t & 1 ? ~ (t >> 1) : t >> 1;
                k += v,
                m = (j - c) * (j - c) + (k - d) * (k - d),
                l > m && (l = m, o = p = q, n = Number.POSITIVE_INFINITY),
                m = (j - e) * (j - e) + (k - f) * (k - f),
                n > m && (n = m, p = q),
                i[q++] = j,
                i[q++] = k
            }
            var w = 0,
                x = 0,
                y = [];
            h = o;
            while (h <= p) j = i[h++],
            k = i[h++],
            y.push(pg.encodeNumber(j - w), pg.encodeNumber(k - x)),
            w = j,
            x = k;
            o /= 2,
            p /= 2;
            var z = "R" + (o < p ? b.substring(o + 1, p) + "R" : "");
            return {
                points: y.join(""),
                levels: z
            }
        },
        pg.encodeNumber = function (a) {
            a = a << 1,
            a < 0 && (a = ~a);
            var b = "";
            while (a >= 32) b += String.fromCharCode((32 | a & 31) + 63),
            a >>= 5;
            b += String.fromCharCode(a + 63);
            return b
        },
        pg.loadPolyline = function (a, b, c, d, e, f, g, h) {
            var i = cfg.city.datadir + "/" + ti.toAscii([a, b, c].join("_"), !0) + ".txt";
            ti.fDownloadUrl("get", i, function (a) {
                a.indexOf("\r\n") < 0 ? a = a.split("\n") : a = a.split("\r\n");
                var c = pg.getStyle("." + b),
                    i = .8;
                for (var j = 2; j < a.length; j += 3) {
                    if (!d[a[j - 2]]) continue;
                    var k = {
                        points: a[j - 1],
                        levels: a[j]
                    };
                    e && f && (k = pg.splitEncodedPolyline(k.points, k.levels, e, f, g, h)),
                    k.color = c && c.backgroundColor || "#0000FF",
                    k.opacity = i,
                    i = .6,
                    k.weight = 5,
                    k.zoomFactor = 2,
                    k.numLevels = 20;
                    var l = GPolyline.fromEncoded(k);
                    pg.GMap.addOverlay(l),
                    pg.mapOverlays.push(l)
                }
            })
        },
        pg.stopLabelSelected = new ELabel(new GLatLng(b.lat, b.lng), cfg.defaultCity, "map", "mapStopSelected", new GSize(4, -4)),
        pg.GMap.addOverlay(pg.stopLabelSelected),
        pg.mapLabelHeight = parseInt(pg.stopLabelSelected.div_.clientHeight, 10),
        pg.stopLabelSelected.hide();
        var m = new GIcon;
        m.image = pg.imagesFolder + "MarkerStart.png";
        var n = new GIcon;
        n.image = pg.imagesFolder + "MarkerFinish.png",
        m.shadow = n.shadow = "",
        m.iconSize = n.iconSize = new GSize(20, 34),
        m.shadowSize = n.shadowSize = new GSize(0, 0),
        m.iconAnchor = n.iconAnchor = new GPoint(10, 34),
        m.infoWindowAnchor = n.infoWindowAnchor = new GPoint(9, 2),
        m.dragCrossImage = n.dragCrossImage = pg.imagesFolder + "empty.png",
        m.dragCrossSize = n.dragCrossSize = GSize(1, 1),
        m.maxHeight = n.maxHeight = 0,
        pg.mapMarkerStart = new GMarker(new GLatLng(0, 0), {
            icon: m,
            title: i18n.mapDragToChangeStart,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function (a, b) {
                return 104
            }
        }),
        pg.mapMarkerFinish = new GMarker(new GLatLng(0, 0), {
            icon: n,
            title: i18n.mapDragToChangeFinish,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function (a, b) {
                return 104
            }
        }),
        pg.GMap.addOverlay(pg.mapMarkerStart),
        pg.mapMarkerStart.hide(),
        pg.GMap.addOverlay(pg.mapMarkerFinish),
        pg.mapMarkerFinish.hide(),
        GEvent.addListener(pg.mapMarkerStart, "dragend", function () {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerStart.getPoint(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(c, pg.inputFinish)
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragend", function () {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerFinish.getPoint(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(pg.inputStart, c)
        }),
        GEvent.addListener(pg.mapMarkerStart, "dragstart", function () {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, setTimeout(function () {
                pg.clusterManager.refresh()
            }, 100))
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragstart", function () {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, pg.clusterManager.refresh())
        });

        function o(a) {
            var b = pg.GMap.getCurrentMapType().getProjection(),
                c = b.fromLatLngToPixel(a, 19),
                d = 19 - pg.GMap.getZoom(),
                e = 1 << d + 2,
                f = c.x - e,
                g = c.x + e,
                h = c.y - e,
                j = c.y + e,
                k = pg.clusterManager._mapMarkers,
                l = [];
            for (i = k.length; --i >= 0;) {
                marker = k[i];
                var m = marker._x,
                    n = marker._y;
                if (n > j) break;
                n >= h && m >= f && m <= g && l.push(marker.id)
            }
            return l
        }
        var p = [],
            q = ti.stops;
        for (var r in q) p.push(q[r]);
        pg.clusterManager = new ClusterManager(d, {
            markers: p,
            clusterMaxZoom: 14
        }),
        pg.$mapVehicles = document.createElement("div"),
        d.getPane(G_MAP_MARKER_PANE).appendChild(pg.$mapVehicles),
        pg.fMapShow()
    }
},
pg.fTransfer_MouseOver = function (a) {
    if (!pg.print) {
        a = a || window.event;
        var b = a.target || a.srcElement;
        if (b.id == "divTransfersMenu" || (b.parentNode || {}).id == "divTransfersMenu" || b.id == "checkTransfer" || b.id == "spanCheckTransfer") {
            pg.transfersMenuHide = !1;
            return
        }
        var c = b.getAttribute("data-transport");
        pg.transfersMenuHide = !0;
        if (cfg.defaultCity != "tallinna-linn" && cfg.defaultCity != "riga" || typeof b.className != "string" || b.className.indexOf("transfer") < 0 || !b.href) {
            if (c && pg.transfersDisplayed) {
                pg.addSchedule = c;
                var d = !0;
                if (pg.schedules) for (var e in pg.transfersDisplayed) {
                    d = pg.transfersDisplayed[e];
                    if (d && d.transport == c && !pg.schedules[e]) {
                        d = !0;
                        break
                    }
                }
                $("checkTransfer").checked = d !== !0,
                $("spanCheckTransfer").innerHTML = i18n.transport[c.replace("-remove", "")],
                pg.transfersMenuHide = !1
            }
        } else {
            pg.addSchedule = pg.fUrlParse(b.href).schedule;
            if (pg.addSchedule) {
                var d = ti.fGetRoutes(pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num, pg.addSchedule.dirType, !0)[0];
                $("checkTransfer").checked = b.className.indexOf("active") >= 0,
                $("spanCheckTransfer").innerHTML = i18n.transport1[d.transport] + (d.num.length > 15 ? "" : " " + d.num) + " " + i18n.towards + " " + d.name,
                pg.transfersMenuHide = !1
            }
        }
        var f = $("divTransfersMenu");
        pg.transfersMenuHide ? f.style.display == "block" && pg.fTransfer_MouseOut() : (f.style.left = b.offsetLeft + "px", f.style.top = b.offsetTop + b.offsetHeight + "px", f.style.display = "block", container = $("divScheduleRoutesInStop"), container.style.width = container.offsetWidth + "px")
    }
},
pg.fUrlSet = function (a, b) {
    if (a) {
        a.schedule && pg.schedule && (typeof a.schedule.city == "undefined" && (a.schedule.city = pg.schedule.city), typeof a.schedule.transport == "undefined" && (a.schedule.transport = pg.schedule.transport), typeof a.schedule.num == "undefined" && (a.schedule.num = pg.schedule.num), typeof a.schedule.dirType == "undefined" && (a.schedule.dirType = pg.schedule.dirType), typeof a.schedule.stopId == "undefined" && (a.schedule.stopId = pg.schedule.stopId));
        var c = ["city", "transport", "inputStop", "inputStart", "inputFinish", "plannerSettings", "stopSettings", "hashForMap", "language"];
        for (var d = c.length; --d >= 0;) typeof a[c[d]] == "undefined" && (a[c[d]] = pg[c[d]])
    } else a = pg;
    var e = "";
    if (a.schedule) e = (a.schedule.tripNum || "") + (e ? "/" + e : ""),
    e = (a.schedule.stopId || "") + (e ? "/" + e : ""),
    e = (a.schedule.dirType || "") + (e ? "/" + e : ""),
    e = (a.schedule.num || "") + (e ? "/" + e : ""),
    e = (a.schedule.transport || "") + (e ? "/" + e : ""),
    a.schedule.city && a.schedule.city != cfg.defaultCity && (e = a.schedule.city + (e ? "/" + e : "")),
    e += a.hashForMap ? "/map" : "";
    else {
        a.transport == "stop" ? (a.city = pg.fGetCity(a.city), e = "stop" + (a.inputStop ? "/" + a.inputStop : "") + (a.stopSettings ? "/" + a.stopSettings : "")) : a.transport == "plan" ? (a.city = pg.fGetCity(a.city), e = "plan/" + (a.inputStart || "") + "/" + (a.inputFinish ? a.inputFinish : "") + (a.plannerSettings ? "/" + a.plannerSettings : "")) : e = (a.transport || "") + (e ? "/" + e : "");
        if (!e || a.city !== cfg.defaultCity) e = a.city + (e ? "/" + e : "");
        e += a.hashForMap ? "/" + a.hashForMap : ""
    }
    e += a.language != cfg.defaultLanguage ? "/" + a.language : "",
    e = ti.toAscii(e, !0);
    if (b) return e;
    Hash.go(e);
    return e
},
pg.fUrlParse = function (a) {
    a = decodeURI(a);
    var b = {},
        c = a.indexOf("#");
    c >= 0 && (a = a.substring(c + 1)),
    a = a ? a.split("/") : [],
    a.length && ("," + cfg.city.languages + ",").indexOf("," + a[a.length - 1] + ",") >= 0 ? b.language = a.pop() : b.language = cfg.defaultLanguage,
    a.length && "map" === a[a.length - 1].substring(0, 3) ? b.hashForMap = a.pop() : b.hashForMap = "",
    b.transport = "",
    a[0] || (b.transport = typeof cfg.city.defaultTransport != "undefined" ? cfg.city.defaultTransport : cfg.city.transport[0]),
    a.length && cfg.cities[a[0]] ? b.city = a.shift() : b.city = cfg.defaultCity,
    a[0] && (b.transport = a[0], a[0] === "stop" ? (b.inputStop = a[1] || "", a.length > 2 && (b.stopSettings = a[2] || "")) : a[0] === "plan" ? (b.inputStart = a[1] || "", b.inputFinish = a[2] || "", a.length > 3 && (b.plannerSettings = a[3] || "")) : a[1] && (b.schedule = {
        city: b.city,
        transport: a[0],
        num: a[1],
        dirType: a[2] || "",
        stopId: a[3] || "",
        tripNum: isNaN(a[4]) ? 0 : +a[4]
    }));
    return b
},
pg.fUrlExecute = function (a) {
    var b = pg.fUrlParse(a),
        c = pg.language;
    pg.language = b.language;
    var d = pg.city;
    pg.city = b.city;
    var e = pg.hashForMap;
    pg.hashForMap = b.hashForMap,
    pg.transport = b.transport,
    pg.inputStop = b.inputStop || pg.inputStop,
    pg.inputStart = b.inputStart || pg.inputStart,
    pg.inputFinish = b.inputFinish || pg.inputFinish,
    pg.plannerSettings = b.plannerSettings || pg.plannerSettings,
    pg.stopSettings = b.stopSettings || pg.stopSettings,
    pg.urlPrevious = pg.urlLoaded,
    pg.urlLoaded = a,
    b.schedule ? pg.fScheduleShow(b.schedule) : (pg.fScheduleHide(), pg.fTabActivate()),
    c != pg.language && (c || pg.language != cfg.defaultLanguage) && pg.fLoadLanguageScript(pg.language),
    d !== pg.city && (cfg.cities[d] || {
        region: ""
    }).region !== pg.city && (cfg.cities[pg.city] || {
        region: ""
    }).region !== d && pg.fLoadPage(),
    pg.hashForMap ? (e !== pg.hashForMap, pg.fMapShow()) : document.body.className.indexOf("Map") >= 0 && pg.fMapHide();
    if (pg.mobile) {
        var f = "main";
        b.hashForMap == "map,page" ? f = "map" : pg.transport && (f = pg.transport),
        $("divContentWrapper").className = "mobile_" + f
    }
},
pg.fTogglePlannerOptions = function (a) {
    var b = $("divContentPlannerOptionsExtended");
    b.style.display && a !== !1 ? (b.style.display = "", $("aExtendedOptions").innerHTML = i18n.extendedOptionsHide, pg.mobile && add_classname($("divContentPlannerOptions"), "extended")) : (b.style.display = "none", $("aExtendedOptions").innerHTML = i18n.extendedOptions, pg.mobile && remove_classname($("divContentPlannerOptions"), "extended"));
    if (a) return pg.cancelEvent(a)
},
pg.pdf = function () {
    var a = new Date;
    $("print_date").innerHTML = pg.formatDate(new Date) + " " + ti.printTime(a.getHours() * 60 + a.getMinutes());
    var b = $("divScheduleRoutesInStop"),
        c = b.offsetWidth;
    b.style.width = "auto",
    document.pdf.content.value = encodeURIComponent($("divSchedule").innerHTML),
    b.style.width = b.offsetWidth + "px",
    document.pdf.submit()
}