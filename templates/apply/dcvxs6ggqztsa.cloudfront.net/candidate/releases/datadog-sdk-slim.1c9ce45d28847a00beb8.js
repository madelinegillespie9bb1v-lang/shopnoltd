"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [486], {
        88130: (e, t, n) => {
            n.r(t), n.d(t, {
                DefaultPrivacyLevel: () => o.WA,
                datadogRum: () => l
            });
            var r, a = n(98056),
                u = n(56603),
                i = n(17168),
                c = n(51752),
                o = n(62256),
                l = (0, i.AB)(i.rJ, (r = c.l, {
                    start: c.l,
                    stop: c.l,
                    onRumStart: function(e, t) {
                        r = function() {
                            return function(e) {
                                return (0, i.dx)(e, {
                                    errorType: "slim-package"
                                })
                            }(t)
                        }
                    },
                    isRecording: function() {
                        return !1
                    },
                    getReplayStats: function() {},
                    getSessionReplayLink: function() {
                        return r()
                    }
                }));
            (0, a.Z)((0, u.V)(), "DD_RUM", l)
        }
    }
]);