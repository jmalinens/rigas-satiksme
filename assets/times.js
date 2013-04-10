365 mod 24 = 5

function explodeTimes(a) {
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
}