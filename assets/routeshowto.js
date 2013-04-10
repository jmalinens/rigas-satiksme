ti.loadRoutes = function(a) {
    if (typeof ti.stops !== "object")
        ti.routes = a;
    else {
        a = a.split("\n");
        var b = [], c = ti.stops, d = {}, e = "", f = "", g = "", h = "", i = "", j = "", k = "", l = "", m = "", n = "", o = "", p = "", q = 0, r = a[0].toUpperCase().split(";"), s = {};
        for (var t = r.length; --t >= 0; )
            s[r[t]] = t;
        s.ROUTENUM = 0;
        var u = -1, v = a.length;
        for (var t = 1; t < v; t++)
            if (a[t].charAt(0) === "#") {
                var w = a[t].split("#"), x = null, y = null, z = new Date;
                w[1] !== "" && (x = new Date(w[1])), w[2] !== "" && (y = new Date(w[2]));
                if ((!x || x <= z) && (!y || y >= z)) {
                    var A = {comment: w[3]};
                    w[4] && (A.departures = w[4]), w[5] && (A.weekdays = w[5]), w[6] && (A.directions = w[6]);
                    var B = b[u];
                    B.comments ? B.comments.push(A) : B.comments = [A]
                }
            } else if (a[t].length > 1) {
                var w = a[t].split(";"), C;
                if (C = w[s.AUTHORITY])
                    g = C === "0" ? "" : C;
                if (g === "SpecialDates") {
                    var D = {}, E = w[s.VALIDITYPERIODS].split(","), F = 0, G = 0;
                    for (var H = -1, I = E.length; ++H < I; )
                        E[H] && (F = +E[H]), G += F, D[G] = !0;
                    ti.specialDates[w[s.ROUTENUM]] = D;
                    continue
                }
                ++q, ++u;
                if (C = w[s.ROUTENUM])
                    e = C === "0" ? "" : C, q = 1;
                if (C = w[s.ROUTENAME])
                    f = C;
                if (C = w[s.CITY])
                    h = C === "0" ? "" : C, k = h + "_" + j, q = 1;
                if (C = w[s.TRANSPORT])
                    j = C === "0" ? "" : C, k = h + "_" + j, q = 1;
                k && (pg.cityTransportRoutes[h + "_" + j] = !0, k = "");
                if (C = w[s.OPERATOR])
                    l = C === "0" ? "" : C;
                if (C = w[s.VALIDITYPERIODS])
                    m = C === "0" ? "" : C;
                if (C = w[s.SPECIALDATES])
                    n = C === "0" ? "" : C;
                if (C = w[s.WEEKDAYS])
                    o = C === "0" ? "" : C;
                p = s.STREETS ? w[s.STREETS] : "";
                var J = ti.toAscii(w[s.ROUTESTOPS], !0).split(","), K = !1;
                for (var L = 0, M = J.length; L < M; ++L) {
                    var N = J[L];
                    N.charAt(0) === "e" ? (K || (K = []), K[L] = "1", N = N.substring(1), J[L] = N) : N.charAt(0) === "x" ? (K || (K = []), K[L] = "2", N = N.substring(1), J[L] = N) : K && (K[L] = "0"), i && (N = J[L] = i + N);
                    var O = c[N];
                    O ? (d[N] = !0, O.raw_data += ";" + u + ";" + L, (!0 || ti.SERVER) && O.routes.push(u, L)) : (J.splice(L, 1), --M, --L)
                }
                var P = [
				u, q, e, g, h, j, l, m, n,
				w[s.ROUTETAG],
				ti.toAscii(w[s.ROUTETYPE]),
				w[s.COMMERCIAL],
				f, o,
				K && K.join("") || "",
				p,
				J.join(";")].join(";");
                ++t, ti.SERVER === !0 ? b[u] = {
				id: u,
				authority: g,
				city: h,
				transport: j,
				num: e,
				name: f,
				stops: J,
				entry: K && K.join("") || "",
				specialDates: n.split(","),times: a[t],
				raw_data: P
				} : b[u] = {id: u,times: a[t],raw_data: P}
            }
        ti.routes = b;
        if (cfg.defaultCity !== "helsinki" && cfg.defaultCity !== "intercity")
            for (var N in c)
                d[N] || (c[N].name = "");
        pg.fCreateNavigation(), pg.fTabActivate()
    }
},
ti.loadStops = function(a) {
    a = a.split("\n");
    var b = "", c = "", d = "", e = "", f = "", g = "", h = "", i = {}, j = {}, k = [], l = a.length, m = a[0].toUpperCase().split(";"), n = {};
    for (var o = m.length; --o >= 0; )
        n[m[o]] = o;
    n.ID = 0;
    for (var o = 1; o < l; o++)
        if (a[o].length > 1) {
            var p = a[o].split(";"), q = p[n.CITY];
            q && (c = q === "0" ? "" : q.trim());
            var r = b + ti.toAscii(p[n.ID], !0);
            if (q = p[n.AREA])
                d = q === "0" ? "" : q.trim();
            if (q = p[n.STREET])
                e = q === "0" ? "" : q.trim();
            if (q = p[n.NAME]) {
                f = q === "0" ? "" : q, g = ti.toAscii(q);
                var s = j[g];
                j[g] = s ? s + "," + r : r
            } else
                j[g] += "," + r;
            if (q = p[n.INFO])
                h = q === "0" ? "" : q;
            b && (p[n.STOPS] = b + (p[n.STOPS] || "").replace(/,/g, "," + b));
            var t = {id: r,lat: +p[n.LAT] / 1e5,lng: +p[n.LNG] / 1e5,name: f,city: c,raw_data: [r, c, d, e, f, h, p[n.LNG], p[n.LAT], p[n.STOPS]].join(";")};
            ti.SERVER && (t.routes = [], t.neighbours = p[n.STOPS] ? p[n.STOPS].split(",") : []), i[r] = t, k.push(t)
        }
    ti.stops = i, ti.asciiStops = j, k.sort(function(a, b) {
        return a.lat < b.lat ? -1 : a.lat > b.lat ? 1 : 0
    });
    for (o = k.length; --o > 0; )
        if (k[o].city === "intercity") {
            var u = k[o].lat;
            for (var v = o - 1; --v >= 0; ) {
                var w = u - k[v].lat;
                if (w > .015)
                    break;
                var x = k[o].lng - k[v].lng;
                x > -.015 && x < .015 && (k[o].neighbours.push(k[v].id), k[v].neighbours.push(k[o].id))
            }
        }
    ti.routes && (ti.SERVER === !0 ? ti.loadRoutes(ti.routes) : window.setTimeout(function() {
        ti.loadRoutes(ti.routes)
    }, 10))
}


ti.fGetStopDetails = function(a) {
    if (typeof ti.stops !== "object" || !a)
        return {};
    var b = ti.stops[a], c;
    if (!b) {
        var d = a.indexOf(";");
        if (d > 0) {
            c = {id: a,name: i18n.mapPoint,neighbours: "",lat: parseFloat(a.substr(0, d)),lng: parseFloat(a.substr(d + 1)),raw_data: ""};
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
	name: b.name,info: e[ti.FLD_INFO],
	neighbours: e[ti.FLD_STOPS],
	lng: ti.stops[a].lng,lat: ti.stops[a].lat,
	raw_data: b.raw_data
	};
    return c
}

//FLD_DIRS = 9

w = ti.fGetStopDetails(m.stopId);
w = 
area: ""
city: ""
id: "1600"
info: ""
lat: 56.94854
lng: 24.12378
name: "E. Birznieka - Upīša iela"
neighbours: "0074,0709,2072"
raw_data: "1600;;;E.Birznieka-Upīša;E. Birznieka - Upīša iela;;2412378;5694854;0074,0709,2072;143;1;158;1;214;1;354;0;355;15;357;13;358;9"
street: "E.Birznieka-Upīša"

raw_data_masiivs = ["1600", "", "", "E.Birznieka-Upīša", "E. Birznieka - Upīša iela", "", "2412378", "5694854", "0074,0709,2072", "143", "1", "158", "1", "214", "1", "354", "0", "355", "15", "357", "13", "358", "9"];
raw_data_masiivs[9] = 143
raw_data_masivs.length = 23

//raw_data_masivs = (w || {raw_data: ""}).raw_data.split(";")
//       for (var c = ti.FLD_DIRS; c < raw_data_masivs.length; c += 2) {
//       for (var c = 9; c < 23; c += 2) {
//            a = ti.fGetRoutes(raw_data_masivs[c]);
//H = +raw_data_masivs[c + 1]
// for (var O = M + H * M; N--; ) {

} //var O

} //var c

x = explodeTimes():

nWorkdaysLength = nWorkdaysLength2 = x.workdays.length;
for (nWorkdaysLength; nWorkdaysLength2--; ) {
 //255 un zemāk
 minute = x.times[nWorkdaysLength2];
 
 real_minute = minute mod 60
}