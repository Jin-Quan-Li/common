/** 转rem单位js */
!function(e, t) {
    function i() {
        var t = o.getBoundingClientRect().width;
        t / a > 750 && (t = 750 * a);
        var i = t / 10;
        o.style.fontSize = i + "px", d.rem = e.rem = i
}
var n, r = e.document,
    o = r.documentElement,
    a = (r.querySelector('meta[name="viewport"]'), r.querySelector('meta[name="flexible"]'), 0),
    d = t.flexible || (t.flexible = {});
if (!a) {
    var l = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)),
        m = e.devicePixelRatio;
    a = l ? m >= 3 && (!a || a >= 3) ? 3 : m >= 2 && (!a || a >= 2) ? 2 : 1 : 1
}
o.setAttribute("data-dpr", a), e.addEventListener("resize", function() {
    clearTimeout(n), n = setTimeout(i, 300)
}, !1), e.addEventListener("pageshow", function(e) {
        e.persisted && (clearTimeout(n), n = setTimeout(i, 300))
    }, !1), i(), d.dpr = e.dpr = a, d.refreshRem = i
}(window, window.lib || (window.lib = {}));