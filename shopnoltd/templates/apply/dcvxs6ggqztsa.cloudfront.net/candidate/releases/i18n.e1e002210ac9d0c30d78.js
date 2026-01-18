(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [6179], {
        79640: (e, o, a) => {
            "use strict";
            a.d(o, {
                v2: () => O,
                Ay: () => x,
                AU: () => j,
                Ts: () => I
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(76158), a(85927), a(94773), a(33951), a(85218), a(1496), a(94119), a(52209), a(48996), a(42167), a(29882), a(58981), a(61347), a(74697), a(28028);
            var r = a(48958),
                t = a(80497),
                n = a(60065),
                i = a(79970),
                s = a(13225),
                l = a(89130),
                d = a.n(l),
                u = a(56687),
                c = a(51613);

            function p(e) {
                return p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, p(e)
            }

            function m(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != p(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != p(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == p(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            var h = Object.freeze({
                en: "en",
                el: "el",
                fr: "fr",
                pt: "pt",
                es: "es",
                de: "de"
            });
            Object.freeze(m(m(m(m(m(m({}, h.en, "English"), h.el, "Greek"), h.fr, "French"), h.pt, "Portuguese"), h.es, "Spanish"), h.de, "German"));
            var f = function(e) {
                    var o = {};
                    return e.keys().forEach((function(a) {
                        return o[a.split("/")[1].split(".")[0]] = e(a).default
                    })), o
                },
                g = f(a(46024)),
                b = (f(a(99479)), a(64391));

            function v(e) {
                return v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, v(e)
            }

            function y(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function w(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? y(Object(a), !0).forEach((function(o) {
                        S(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : y(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function S(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != v(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != v(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == v(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            var _ = (0, b.T)(a(34753)),
                k = (0, b.T)(a(99479)),
                q = Object.freeze(Object.keys(k)),
                E = Object.freeze(Object.keys(_)),
                A = {};
            E.forEach((function(e) {
                return A[e] = a(59350)("./".concat("en" === e ? "en-US" : e, "/index.js"))
            }));
            var P = s.Ay.use(c.r9).use(d()).init({
                interpolation: {
                    escapeValue: !1
                },
                detection: {
                    order: ["htmlTag"]
                },
                fallbackLng: {
                    "en-AU": ["en"],
                    "en-BZ": ["en"],
                    "en-CA": ["en"],
                    "en-CB": ["en"],
                    "en-GB": ["en"],
                    "en-IN": ["en"],
                    "en-IE": ["en"],
                    "en-JM": ["en"],
                    "en-NZ": ["en"],
                    "en-PH": ["en"],
                    "en-ZA": ["en"],
                    "en-TT": ["en"],
                    "en-US": ["en"],
                    "fr-BE": ["fr"],
                    "fr-CA": ["fr"],
                    "fr-LU": ["fr"],
                    "fr-CH": ["fr"],
                    "de-AT": ["de"],
                    "de-DE": ["de"],
                    "de-LI": ["de"],
                    "de-LU": ["de"],
                    "de-CH": ["de"],
                    "es-BT": ["es"],
                    "es-CO": ["es"],
                    "es-CR": ["es"],
                    "es-MX": ["es"],
                    "es-PY": ["es"],
                    "es-PE": ["es"],
                    "es-ES": ["es"],
                    "pt-BR": ["pt"],
                    "pt-PT": ["pt"],
                    default: ["en"]
                }
            });
            E.forEach((function(e) {
                s.Ay.addResourceBundle(e, "translation", _[e], !0, !0), s.Ay.addResourceBundle(e, "translation", g[e], !0, !1)
            })), q.forEach((function(e) {
                return s.Ay.addResourceBundle(e, "shared", k[e])
            })), s.Ay.getSharedResources = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.Ay.language;
                if (k) {
                    var o = q.find((function(o) {
                        return o === e
                    }));
                    return s.Ay.getResourceBundle(o || "en", "shared")
                }
            };
            var D = function(e, o) {
                return function(a, r, t) {
                    var n = function(e) {
                        var o, a = null === (o = _[e].advanced.component) || void 0 === o || null === (o = o.job) || void 0 === o ? void 0 : o.posted_few_hours_ago;
                        return {
                            lessThanXSeconds: a,
                            xSeconds: a,
                            halfAMinute: a,
                            lessThanXMinutes: a,
                            xMinutes: a,
                            aboutXHours: a
                        }
                    }(o)[a];
                    return n && null != t && t.addSuffix && (null == t ? void 0 : t.comparison) <= 0 ? n : e(a, r, t)
                }
            };
            s.Ay.formatDistance = function(e) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.Ay.language;
                if (!e) return "";
                if (e = e instanceof Date ? e : new Date(e), (0, i.A)(e)) return s.Ay.getFixedT(o)("today");
                var a = A[o] && w(w({}, A[o]), {}, {
                        formatDistance: D(A[o].formatDistance, o)
                    }),
                    r = Date.now();
                return (0, t.A)((0, n.A)(e, r) ? r : e, r, {
                    addSuffix: !0,
                    locale: a
                })
            }, s.Ay.localizedFormatDistance = function(e, o) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return (0, t.A)(e, o, w(w({}, a), {}, {
                    locale: A[s.Ay.language]
                }))
            }, s.Ay.localizedFormat = function(e, o) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return (0, r.A)(e, o, w(w({}, a), {}, {
                    locale: A[s.Ay.language]
                }))
            };
            var z = function(e) {
                    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document.querySelector("html");
                    return Promise.resolve(o && o.setAttribute("lang", e))
                },
                O = function(e) {
                    return z(e).then((function() {
                        return s.Ay.changeLanguage(e)
                    }))
                };
            s.Ay.on("languageChanged", z);
            var j = function(e) {
                    return u.stringify(w(w({}, u.parse(window.location.search || "") || {}), {}, {
                        lng: e
                    }))
                },
                I = function() {
                    return P
                };
            const x = s.Ay
        },
        7597: (e, o, a) => {
            "use strict";
            a.d(o, {
                F2: () => t,
                v2: () => r.v2,
                Ay: () => r.Ay,
                AU: () => r.AU,
                Ts: () => r.Ts,
                mX: () => s,
                Sw: () => l
            });
            var r = a(79640);
            const t = (0, a(57571).A)(r.Ay);

            function n(e) {
                return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, n(e)
            }

            function i(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != n(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != n(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == n(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            a(93832), a(81984), a(56030), a(1233), a(85927), a(94773), a(33951), a(85218), a(48996), a(58981), a(28028);
            var s = Object.freeze({
                de: "de",
                el: "el",
                en: "en",
                es: "es",
                fr: "fr",
                pt: "pt"
            });
            const l = Object.freeze(i(i(i(i(i(i({}, s.en, "English"), s.el, "Greek"), s.fr, "French"), s.pt, "Portuguese"), s.es, "Spanish"), s.de, "German"))
        },
        85204: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            const r = JSON.parse('{"component":{"departments":{"blankslate":{"message":"Es scheint im Moment keine Abteilungen zu geben.","title":"Leider gibt es keine Abteilungen."},"jobs":"{{count}} offene Stelle","jobs_plural":"{{count}} offene Stellen","no_jobs":"Keine offenen Stellen","view":"Stellenanzeigen"},"header":{"button":"Direkt zu den Stellenanzeigen"},"job":{"posted_few_hours_ago":"ein paar Stunden","workplace":{"hybrid":"Hybrid","onsite":"Vor Ort","remote":"Remote"}},"jobs":{"blankslate":{"nojobsmessage":"Wir haben von Zeit zu Zeit neue Stellen, also schauen Sie bitte bald wieder vorbei!","nojobstitle":"Leider sind derzeit keine freien Stellen verfügbar","noresultsmessage":"Versuchen Sie, Filter zu entfernen oder Ihre Suche zu verfeinern.","noresultstitle":"Leider wurden keine Stellen gefunden, die diesen Kriterien entsprechen."}}}}'),
                t = JSON.parse('{"careers":{"account":{"description":{"showless":"Weniger anzeigen","showmore":"Mehr anzeigen","title":"Karriere bei {{account}}"},"website":"Webseite anzeigen"},"blankslate":{"noOpenings":{"message":"Wir haben von Zeit zu Zeit neue Stellen, also schauen Sie bitte bald wieder vorbei!","title":"Leider sind derzeit keine freien Stellen verfügbar"},"noResults":{"message":"Versuchen Sie, Filter zu entfernen oder Ihre Suche zu verfeinern.","title":"Leider wurden keine Stellen gefunden, die diesen Kriterien entsprechen."}},"emailmyresume":{"button":"Lebenslauf per E-Mail senden","description":"Nicht das Richtige dabei? Senden Sie Ihren Lebenslauf per E-Mail, um für zukünftige freie Stellen in Betracht gezogen zu werden."},"job":{"apply":"Bewerben","dataDeleted":"Ihre personenbezogenen Daten wurden erfolgreich gelöscht.","notFound":"Diese Stelle steht nicht länger zur Verfügung."},"search":{"filters":{"apply":"Filter anwenden","autofilterAlert":"Wir haben Ihren Standort ermittelt und zeigen Stellen in {{location}}. Setzen Sie die Filter zurück, um Stellen an allen Standorten anzuzeigen.","clear":"Filter zurücksetzen","department":"Abteilung","filter":"Stellen filtern","filters":"Filtern","location":"Standort","remote":"Nur Telearbeit","search":"Suchen","workplace":"Arbeitsstandort","worktype":"Beschäftigungsart"},"input":"Stellen suchen …","loadmore":"Mehr anzeigen","title":"Offene Stellen","total":"{{count}} Stelle","total_plural":"{{count}} Stellen"}},"errors":{"action":"Zur Homepage","notFound":{"message":"Unter Umständen wurde die Seite entfernt, umbenannt oder ist vorübergehend nicht verfügbar.","title":"Diese Seite konnte leider nicht geladen werden."},"surveyNotFound":{"title":""},"offline":{"message":"Ihre Internetverbindung scheint ausgefallen zu sein. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.","title":"Keine Internetverbindung."},"pageNotFound":{"button":"Traumjob finden","message":"Offenbar können wir diese Seite nicht finden.","subMessage":"Sie suchen nach einem neuen Job? Erkunden Sie tausende freier Stellen.","title":"Seite nicht gefunden."},"server":{"message":"Unter Umständen wurde die Seite entfernt, umbenannt oder ist vorübergehend nicht verfügbar.","title":"Ein Fehler ist aufgetreten. Wir arbeiten daran."},"unknown":{"message":"Unter Umständen wurde die Seite entfernt, umbenannt oder ist vorübergehend nicht verfügbar.","title":"Ein unbekannter Fehler ist aufgetreten."}},"footer":{"accessibility":"Barrierefreiheit","ccpa":"Wenn Sie ein in Kalifornien ansässiger Bewerber sind, können Sie <a href=\\"{{url}}\\" target=\\"_blank\\">dieser Datenschutzerklärung</a> weitere Details entnehmen.","complianceNotice":"{{account}} erhebt und verarbeitet personenbezogene Daten in Übereinstimmung mit den gültigen Datenschutzvorschriften.","cookieSettings":"Cookie-Einstellungen","eeoc":"{{account}} unterscheidet bei der Bereitstellung von Beschäftigungsmöglichkeiten und der damit verbundenen \\nLeistungen nicht im Hinblick auf ethnische Zugehörigkeit, Geschlecht, Hautfarbe, Religion, Alter, nationale Herkunft, Familienstand, Behinderung, Veteranenstatus, genetische Informationen, sexuelle Orientierung, Geschlechtsidentität oder andere gesetzlich verbotenen Gründe.","gdpr":"Wenn Sie ein in Europa ansässiger Bewerber sind, können Sie <a href=\\"{{url}}\\" target=\\"_blank\\">dieser Datenschutzerklärung</a> weitere Details entnehmen.","help":"Hilfe","poweredBy":"Präsentiert von","viewAllJobs":"Alle Stellenanzeigen","viewWebsite":"Webseite anzeigen"},"i18n":{"picker":"Die ausgewählte Sprache ist {{language}}"},"job":{"applicationForm":"Bewerbung","apply":"Auf diese Stelle bewerben","benefits":"Leistungen","description":"Beschreibung","overview":"Übersicht","posted":"Veröffentlicht","remote":"Telearbeit","requirements":"Anforderungen","share":"Diese Stelle teilen","type":{"contract":"Vertrag","full":"Vollzeit","other":"Sonstiges","part":"Teilzeit","temporary":"Befristet"}},"survey":{"error":{"footer":"Zur Erinnerung: Ihre Antworten sind völlig anonym und werden nicht für den Einstellungsprozess verwendet.","message":"Sie haben diese Umfrage schon beantwortet.","title":"Hallo nochmal!"},"expired":{"message":"The survey you’re looking for is no longer available.","title":"Hmmm..."},"participation":"Möchten Sie {{name}} helfen, besser zu werden? Füllen Sie unsere optionale Umfrage aus:","questions":"Fragen","skip":"Umfrage überspringen","skipped":{"message":"Sie sind jetzt bereit. Danke!","title":"Umfrage übersprungen."},"submit":"Umfrage übermitteln","success":{"footer":"Sie werden nicht im Einstellungsprozess verwendet.","message":"Ihre Antworten sind völlig anonym.","title":"Vielen Dank für das Beantworten der Umfrage!"}},"today":"heute"}'),
                n = JSON.parse('{"complain":{"paragraph_1":"Wir hoffen, dass wir alle Anfragen oder Sorgen, die Sie in Bezug auf die Nutzung Ihrer Daten durch uns haben, lösen können.","paragraph_2":"Die&nbsp;<a href=\\"{{url}}\\">DSGVO</a>&nbsp; gibt Ihnen außerdem das Recht, eine Beschwerde bei einer Aufsichtsbehörde in dem Land der Europäischen Union (oder des Europäischen Wirtschaftsraums), in dem Sie arbeiten, regelmäßig leben oder in dem der mutmaßliche Verstoß gegen Datenschutzgesetze stattgefunden hat, einzureichen. Die Aufsichtsbehörde im Vereinigten Königreich ist der Informationsbeauftragte, der wie folgt erreicht werden kann:&nbsp;<a href=\\"http://ico.org.uk/concerns/\\">http://ico.org.uk/concerns/</a> oder unter der Telefonnummer <a href=\\"tel:+443031231113\\">+44303-123-1113</a>.","title":"Beschwerden"},"contact":{"paragraph":"Alle Fragen, Anmerkungen oder Anträge in Bezug auf diese Datenschutzerklärung sind zu richten an <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>.","title":"Kontakt"},"disclosure":{"paragraph_1":"Wie vorstehend ausgeführt, geben wir Ihre Daten weiter an dritte Dienstleister, einschließlich Workable, welche die Daten ausschließlich in Übereinstimmung mit unseren Anweisungen oder wie gesetzlich vorgeschrieben nutzen.","paragraph_2":"Wenn Sie sich über die Funktion Indeed Apply um eine offene Stelle beworben und einer solchen Offenlegung zugestimmt haben, legen wir gegenüber Indeed bestimmte personenbezogene Daten offen, die wir führen, einschließlich, jedoch nicht beschränkt auf eine einzigartige Kennung, die Indeed verwendet, um Sie zu identifizieren und die Informationen über Ihren Fortschritt im Einstellungsvorgang für die freie Stelle sowie materielle, immaterielle, visuelle, elektronische, aktuelle oder zukünftige Daten, die wir über Sie führen, z. B. Name, Kontaktdaten und weitere Angaben zur Analyse von Daten über Sie als Bewerber (gemeinsam die „Dispositionsdaten“). Die Datenschutzerklärung von Indeed in Bezug auf Indeeds Nutzung der Dispositionsdaten steht auf der Website von Indeed zur Verfügung.","paragraph_3":"Wenn Sie sich über einen anderen Dienstleister um eine freie Stelle beworben haben, legen wir ggf. Daten, die den vorstehend beschriebenen Dispositionsdaten ähneln, gegenüber einem solchen Dienstleister offen. Der Dienstleister ist der Datenverantwortliche in Bezug auf diese Daten und ist damit verantwortlich für die Einhaltung aller geltenden Vorschriften in Bezug auf die Nutzung der Daten nach der Übertragung durch uns.","title":"Offenlegung Ihrer Daten"},"mostrecent":"die aktuelle Version hier","notice":{"outside_eea":{"paragraph_1":"Da wir in <span data-id=\\"placeholder\\">{{country_code}}</span> ansässig sind, haben wir <span data-id=\\"placeholder\\">{{appointed_representative}}</span> zu unserem Vertreter im EWR ernannt. Die Kontaktdaten lauten <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Unser ernannter Vertreter im Europäischen Wirtschaftsraum (EWR)"},"paragraph_1":"<span data-id=\\"placeholder\\">{{trading_info}}</span> („wir“, „uns“) ist verpflichtet, Ihre Privatsphäre zu schützen und zu respektieren. Diese Datenschutzerklärung (zusammen mit den weiteren Dokumenten, auf die hierin Bezug genommen wird) legt die Grundlage fest, auf der wir die personenbezogenen Daten, die wir über Sie erhoben oder die Sie uns zur Verfügung gestellt haben, im Rahmen unseres Rekrutierungsvorgangs verarbeiten. Bitte lesen Sie die folgenden Informationen aufmerksam, um unsere Ansichten und Vorgehensweisen im Umgang mit Ihren personenbezogenen Daten zu verstehen.","paragraph_2":"Im Rahmen der Datenschutz-Grundverordnung („DSGVO“) ist der Datenverantwortliche <span data-id=\\"placeholder\\">{{company_name}}</span>.","paragraph_3":"Wir arbeiten mit Workable, einer von Workable Software Limited angebotenen Online-Anwendung, um unseren Rekrutierungsvorgang zu unterstützen. Workable verarbeitet personenbezogene Daten als Auftragsverarbeiter in unserem Namen. Workable darf Ihre personenbezogenen Daten ausschließlich in Übereinstimmung mit unseren Anweisungen verarbeiten.","paragraph_4":"Wenn Sie sich um eine von uns veröffentlichte Stelle bewerben, gelten die Bestimmungen dieser Datenschutzerklärung für unsere Verarbeitung Ihrer personenbezogenen Daten ebenso wie die weitere Datenschutzerklärung, die wir Ihnen separat zur Verfügung gestellt haben oder die auf unserer Website abgerufen werden kann.","paragraph_5":"Wenn Sie sich über die Bewerbungsfunktion einer Stellenbörse oder eines ähnlichen Online-Dienstleisters („Partner“) um eine Stelle bewerben, sollten Sie beachten, dass der jeweilige Partner Ihre personenbezogenen Daten aufbewahren und auch Daten von uns in Bezug auf den Fortgang Ihrer Bewerbung erheben kann. Jede Nutzung Ihrer Daten durch den Partner erfolgt in Übereinstimmung mit dessen Datenschutzerklärung.","title":"Datenschutzerklärung für die Rekrutierung"},"personal_information":{"item_1":"Angaben, die Sie machen, wenn Sie sich um eine Stelle bewerben. Dazu zählen Daten, die über eine Online-Stellenbörse, per E-Mail, persönlich bei Vorstellungsgesprächen und/oder über andere Wege zur Verfügung gestellt werden.","item_2":"Insbesondere verarbeiten wir personenbezogene Daten wie Name, E-Mail-Adresse, Anschrift, Geburtsdatum, Qualifikationen, Erfahrung, Informationen über vorherige Beschäftigungsverhältnisse, Fähigkeiten und Erfahrungen, die Sie uns vorlegen, sowie Ihr Video für den Fall, dass Sie Ihr Vorstellungsgespräch mit der Funktion Video-Vorstellungsgespräch führen.","item_3":"Wenn Sie uns kontaktieren, führen wir ggf. eine Aufzeichnung zu der Korrespondenz.","item_4":"Eine Aufzeichnung zum Fortgang des Personalbeschaffungsvorgangs.","item_5":"Angaben zu Ihren Besuchen auf der Workable-Website, einschließlich, jedoch nicht beschränkt auf Traffic-Daten, Standortdaten, Webprotokolle und weitere Kommunikationsdaten, die Website, über die Sie auf die Workable-Website geleitet wurden und die Ressourcen, auf die Sie zugreifen.","item_6":"","paragraph_1":"Wir erheben und verarbeiten einige oder alle Arten der folgenden Daten über Sie:","paragraph_2":"Workable gewährt uns die Möglichkeit, die Daten, die Sie uns vorlegen, mit anderen öffentlich verfügbaren Informationen über Sie, die Sie im Internet veröffentlicht haben, zu verbinden – dazu zählen Quellen wie LinkedIn und andere Social-Media-Profile.","paragraph_3":"Mit Hilfe der Technologie von Workable können wir verschiedene Datenbanken durchsuchen – einige davon sind öffentlich verfügbar, andere nicht –, die Ihre personenbezogenen Daten enthalten können (einschließlich Ihres Lebenslaufs), um potenzielle Kandidaten für unsere freien Stellen auszumachen. Wenn wir Sie auf diesem Weg finden, erhalten wir Ihre personenbezogenen Daten von diesen Quellen.","paragraph_4":"Unter Umständen erhalten wir Ihre personenbezogenen Daten von einem Dritten, der Sie als Kandidat für eine freie Stelle oder für unser Unternehmen im Allgemeinen empfiehlt.","subtitle_1":"Daten, die wir über Sie erheben","subtitle_2":"Daten, die wir mittels anderer Quellen erheben","title":"Ihre personenbezogenen Daten"},"read":"Lesen Sie","store":{"item_1":"Löschung Ihrer personenbezogenen Daten durch Sie (oder eine andere, vom Kunden beauftragte Person) oder","item_10":"Anderweitige Beschränkung der Verarbeitung Ihrer personenbezogenen Daten unter bestimmten Umständen","item_11":"Geltendmachung von Schadenersatzansprüchen im Fall unseres Verstoßes gegen Datenschutzvorschriften","item_12":"Kontaktieren Sie uns über die nachfolgenden Kontaktdaten,","item_13":"Legen Sie uns ausreichende Informationen vor, damit wir Sie identifizieren können,","item_14":"Legen Sie uns einen Identitäts- und Adressnachweis vor und","item_15":"Lassen Sie uns wissen, auf welche Daten sich Ihre Aufforderung bezieht.","item_2":"Eingang einer schriftlichen Aufforderung durch Sie (oder eine andere, vom Kunden beauftragte Person) bei uns.","item_3":"Zugriff auf Ihre personenbezogenen Daten und bestimmte ergänzende Informationen, auf die diese Datenschutzerklärung bereits ausgerichtet ist","item_4":"Aufforderung zur Berichtigung von Fehlern in Bezug auf Ihre Daten, die wir führen","item_5":"Aufforderung zur Löschung Ihrer personenbezogenen Daten in Bezug auf bestimmte Situationen","item_6":"Erhalt der personenbezogenen Daten, die Sie uns vorgelegt haben, in einem strukturierten, gängigen und maschinenlesbaren Format sowie das Recht auf Übertragung dieser Daten an einen Dritten in bestimmten Situationen","item_7":"Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten zu Zwecken des Direktmarketings","item_8":"Widerspruch gegen automatisierte Entscheidungen, die rechtliche Wirkung in Bezug auf Ihre Person entfalten oder sich auf ähnliche Weise auswirken","item_9":"Widerspruch gegen unsere fortgesetzte Verarbeitung Ihrer personenbezogenen Daten in bestimmten Situationen","paragraph_1":"Wir ergreifen angemessene Maßnahmen, um sicherzustellen, dass alle personenbezogenen Daten sicher verwahrt werden, einschließlich Maßnahmen zur Verhinderung des versehentlichen Verlustes oder der nicht autorisierten Nutzung von personenbezogenen Daten oder des nicht autorisierten Zugriffs auf diese. Wir begrenzen den Zugriff auf Ihre personenbezogenen Daten auf die Personen, die die Daten aus geschäftlichen Gründen kennen müssen. Die Personen, die Ihre personenbezogenen Daten verarbeiten, tun dies ausschließlich mit unserer Autorisierung und unterliegen einer Geheimhaltungsverpflichtung.","paragraph_10":"Für weitere Informationen zu diesen Rechten, einschließlich der Umstände, in denen sie gelten, siehe <a href=\\"{{url}}\\">Hinweise des britischen Datenschutzbeauftragten (ICO) zu den Rechten betroffener Personen unter der Datenschutz-Grundverordnung</a>.","paragraph_11":"Falls Sie eines dieser Rechte ausüben möchten:","paragraph_2":"Wir folgen außerdem festgelegten Vorgehensweisen im Umgang mit mutmaßlichen Sicherheitsverstößen. Wir informieren Sie und die zuständigen Regulierungsbehörden über mutmaßliche Sicherheitsverstöße, wenn wir dazu gesetzlich verpflichtet sind.","paragraph_3":"Leider ist die Übertragung von Daten über das Internet nicht vollständig sicher. Wenngleich wir unser Bestes tun, um Ihre personenbezogenen Daten zu schützen, können wir die Sicherheit Ihrer Daten, die online übertragen werden, nicht garantieren, daher erfolgt jede Übertragung auf Ihr eigenes Risiko.","paragraph_4":"Wenn wir Ihre personenbezogenen Daten in unseren Systemen speichern, erfolgt dies hier: <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"Die Daten, die wir über die Dienste von Workable über Sie erheben und verarbeiten, können an einen Ort außerhalb des Europäische Wirtschaftsraums („EWR“) übertragen und dort gespeichert werden. Sie können außerdem von Mitarbeitern außerhalb des EWR verarbeitet werden, die für uns oder einen unserer Zulieferer arbeiten. Solche Mitarbeiter sind unter anderem mit der Bearbeitung Ihrer Aufträge, Ihrer Zahlungsdaten sowie der Bereitstellung von Unterstützungsdienstleistungen befasst. Indem Sie Ihre personenbezogenen Daten vorlegen, stimmen Sie der Übertragung, Speicherung und Verarbeitung zu.","paragraph_6":"Insbesondere können Ihre Daten i) für Mitarbeiter von Workable in den USA zugänglich sein oder ii) durch den Hosting-Dienstleister von Workable auf Servern in den USA oder in der EU gespeichert werden. In den USA gelten nicht dieselben Datenschutzvorschriften wie im Vereinigten Königreich und dem EWR. Workable Software Limited hat eine Auftragsverarbeitervereinbarung mit den Unternehmen seiner Gruppe im Ausland sowie mit allen Auftragsverarbeitern geschlossen. Diese Auftragsverarbeitervereinbarungen sollen den Schutz Ihrer Datenschutzrechte unterstützen und Ihnen für den unwahrscheinlichen Fall eines Missbrauchs Ihrer personenbezogenen Daten Rechtsmittel an die Hand geben.","paragraph_7":"Falls Sie weitere Informationen benötigen, kontaktieren Sie uns bitte (siehe nachfolgenden Abschnitt „Kontakt“). Wir übertragen Ihre personenbezogenen Daten darüber hinaus nicht nach außerhalb des Vereinigten Königreichs oder des EWR oder an Organisationen (oder untergeordnete Stellen), die dem Völkerrecht unterliegen oder die unter einem Abkommen zwischen zwei oder mehr Ländern gegründet werden.","paragraph_8":"Ihre personenbezogenen Daten werden mit Eintritt eines der folgenden Ereignisse gelöscht:","paragraph_9":"Unter der <a href=\\"{{url}}\\">Datenschutz-Grundverordnung</a> stehen Ihnen eine Reihe von Rechten kostenlos zur Verfügung. Zusammengefasst sind dies die folgenden Rechte:","retention":"Wir bewahren Ihre Daten nur so lange auf, wie wir Sie für eine offene oder zukünftige Position in Betracht ziehen.","retention_count":"Wir bewahren alle Daten über einen Zeitraum von <span data-id=\\"placeholder\\">{{count}}</span> Monat hinweg auf.","retention_count_plural":"Wir bewahren alle Daten über einen Zeitraum von <span data-id=\\"placeholder\\">{{count}}</span> Monaten hinweg auf.","subtitle_1":"Sicherheit","subtitle_2":"Wo wir Ihre personenbezogenen Daten speichern","subtitle_3":"Wie lange wir Ihre personenbezogenen Daten aufbewahren","subtitle_4":"Ihre Rechte","title":"Wie wir Ihre personenbezogenen Daten speichern"},"updated":"Diese Datenschutzerklärung wurde aktualisiert.","uses":{"item_1":"Zur Berücksichtigung Ihrer Bewerbung in Bezug auf eine Stelle, um die Sie sich beworben haben.","item_2":"Zur Berücksichtigung Ihrer Bewerbung in Bezug auf andere Stellen.","item_3":"Um mit Ihnen über den Rekrutierungsvorgang zu kommunizieren.","item_4":"Um Daten, die wir von Ihnen erhalten haben, mit Informationen von dritten Datendienstleistern zu verbinden.","item_5":"Um geeignete Kandidaten für unsere freien Stellen zu finden.","item_6":"Um unsere Dienstleister (wie Workable und dessen Auftragsverarbeiter und Datendienstleister) und Partner (wie Stellenbörsen, über die Sie sich ggf. beworben haben) bei der Verbesserung ihres Services zu unterstützen.","paragraph_1":"Wir beziehen uns auf rechtmäßige Interessen als Grundlage, auf der wir Ihre personenbezogenen Daten erheben und verarbeiten. Unser berechtigtes Interesse ist die Rekrutierung von Mitarbeitern für unser Unternehmen.","paragraph_3":"Wir nutzen die über Sie gespeicherten Daten zu folgenden Zwecken:","paragraph_4":"Wir nutzen die Technologie von Workable ggf., um geeignete Kandidaten auf der Grundlage der von uns festgelegten oder allgemein für die Stelle, um die Sie sich beworben haben, geltenden Kriterien auszuwählen. Der Vorgang des Findens geeigneter Kandidaten läuft automatisch ab, jedoch wird jede Entscheidung dazu, wer eine freie Stelle besetzt, von unseren Mitarbeitern getroffen.","subtitle_1":"Rechtmäßige Grundlage für die Verarbeitung","subtitle_2":"Verarbeitungszweck","subtitle_3":"Automatisierte Entscheidung/Profilerstellung","title":"Nutzung Ihrer Daten"}}');
            var i = a(82144),
                s = a(48706);

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, t), {}, {
                advanced: r,
                eeoc: i,
                gdpr: n,
                siteEditor: s
            })
        },
        7831: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            const r = JSON.parse('{"component":{"departments":{"blankslate":{"message":"Φαίνεται πως δεν υπάρχουν τμήματα αυτήν τη στιγμή.","title":"Λυπούμαστε, δεν υπάρχουν τμήματα."},"jobs":"{{count}} θέση εργασίας","jobs_plural":"{{count}} θέσεις εργασίας","no_jobs":"Καμία διαθέσιμη θέση εργασίας","view":"Προβολή όλων των θέσεων εργασίας"},"header":{"button":"Προβολή όλων των θέσεων εργασίας"},"job":{"posted_few_hours_ago":"πριν λίγες ώρες","workplace":{"hybrid":"Υβριδική","onsite":"Φυσική παρουσία","remote":"Εξ αποστάσεως"}},"jobs":{"blankslate":{"nojobsmessage":"Ανοίγουμε νέες θέσεις εργασίας κατά καιρούς, οπότε μπορείτε να ξαναελέγξετε σύντομα!","nojobstitle":"Λυπούμαστε, δεν υπάρχουν διαθέσιμες θέσεις εργασίας αυτήν τη στιγμή.","noresultsmessage":"Προσπαθήστε να αφαιρέσετε φίλτρα ή να τροποποιήσετε την αναζήτησή σας.","noresultstitle":"Λυπούμαστε, δεν βρέθηκαν θέσεις εργασίας που να ταιριάζουν με αυτά τα κριτήρια."}}}}'),
                t = JSON.parse('{"careers":{"account":{"description":{"showless":"Προβολή λιγότερων","showmore":"Προβολή περισσοτέρων","title":"Θέσεις εργασίας στην εταιρεία {{account}}"},"website":"Προβολή ιστότοπου"},"blankslate":{"noOpenings":{"message":"Ανοίγουμε νέες θέσεις εργασίας κατά καιρούς, οπότε μπορείτε να ξαναελέγξετε σύντομα!","title":"Λυπούμαστε, δεν υπάρχουν διαθέσιμες θέσεις εργασίας αυτήν τη στιγμή."},"noResults":{"message":"Προσπαθήστε να αφαιρέσετε φίλτρα ή να τροποποιήσετε την αναζήτησή σας.","title":"Λυπούμαστε, δεν βρέθηκαν θέσεις εργασίας που να ταιριάζουν με αυτά τα κριτήρια."}},"emailmyresume":{"button":"Αποστολή του βιογραφικού μου με email","description":"Δεν βρήκατε κάποια θέση που σας ενδιαφέρει; Στείλτε με email το βιογραφικό σας, για να περιληφθείτε στη διαδικασία αξιολόγησης για νέες θέσεις που θα προκύψουν στο μέλλον."},"job":{"apply":"Υποβολή αίτησης","dataDeleted":"Τα προσωπικά σας δεδομένα διαγράφηκαν με επιτυχία.","notFound":"Αυτή η θέση εργασίας δεν είναι πλέον διαθέσιμη."},"search":{"filters":{"apply":"Εφαρμογή φίλτρων","autofilterAlert":"Έχουμε υπολογίσει την τοποθεσία σας και σας εμφανίζουμε θέσεις στην τοποθεσία {{location}}. Καταργήστε τα φίλτρα, για να εμφανίσετε εργασίες σε όλες τις τοποθεσίες.","clear":"Κατάργηση φίλτρων","department":"Τμήμα","filter":"Φιλτράρισμα θέσεων εργασίας","filters":"Φίλτρα","location":"Τοποθεσία","remote":"Μόνο από απόσταση","search":"Αναζήτηση","workplace":"Έδρα εργασίας","worktype":"Είδος εργασίας"},"input":"Αναζήτηση θέσεων εργασίας…","loadmore":"Προβολή περισσοτέρων","title":"Κενές θέσεις εργασίας","total":"{{count}} θέση εργασίας","total_plural":"{{count}} θέσεις εργασίας"}},"errors":{"action":"Μετάβαση στην αρχική σελίδα","notFound":{"message":"Η σελίδα που ψάχνετε μπορεί να έχει αφαιρεθεί, να έχει αλλάξει όνομα ή να είναι προσωρινά μη διαθέσιμη.","title":"Λυπούμαστε, αυτή η σελίδα δεν μπορεί να φορτωθεί."},"surveyNotFound":{"title":"Η έρευνα δεν βρέθηκε!"},"offline":{"message":"Η σύνδεσή σας στο διαδίκτυο πρέπει να έχει διακοπεί. Ελέγξτε τη σύνδεσή σας στο διαδίκτυο και προσπαθήστε ξανά.","title":"Δεν υπάρχει σύνδεση στο διαδίκτυο."},"pageNotFound":{"button":"Βρείτε τη θέση εργασίας των ονείρων σας","message":"Φαίνεται πως δεν μπορούμε να βρούμε αυτήν τη σελίδα.","subMessage":"Αναζητάτε την επόμενη θέση εργασίας σας; Δείτε χιλιάδες θέσεις εργασίας.","title":"Η σελίδα δεν βρέθηκε."},"server":{"message":"Η σελίδα που ψάχνετε μπορεί να έχει αφαιρεθεί, να έχει αλλάξει όνομα ή να είναι προσωρινά μη διαθέσιμη.","title":"Λυπούμαστε, παρουσιάστηκε σφάλμα. Προσπαθούμε να το διορθώσουμε."},"unknown":{"message":"Η σελίδα που ψάχνετε μπορεί να έχει αφαιρεθεί, να έχει αλλάξει όνομα ή να είναι προσωρινά μη διαθέσιμη.","title":"Λυπούμαστε, παρουσιάστηκε άγνωστο σφάλμα."}},"footer":{"accessibility":"Προσβασιμότητα","ccpa":"Αν είστε υποψήφιος για θέση εργασίας από την Καλιφόρνια, ανατρέξτε στην παρούσα <a href=\\"{{url}}\\" target=\\"_blank\\">ειδοποίηση απορρήτου</a>, για περισσότερες λεπτομέρειες.","complianceNotice":"Η εταιρεία {{account}} συλλέγει και επεξεργάζεται προσωπικά δεδομένα σύμφωνα με τους ισχύοντες νόμους προστασίας δεδομένων.","cookieSettings":"Ρυθμίσεις cookies","eeoc":"Η εταιρεία {{account}} δεν προβαίνει σε διακρίσεις λόγω φυλής, φύλου, χρώματος, θρησκείας, ηλικίας, εθνικής καταγωγής, οικογενειακής κατάστασης, αναπηρίας, καθεστώτος βετεράνου, γενετικών πληροφοριών, γενετήσιου προσανατολισμού, ταυτότητας φύλου ή για οποιονδήποτε άλλο λόγο που απαγορεύεται από τον νόμο, κατά την παροχή ευκαιριών απασχόλησης και παροχών.","gdpr":"Αν είστε υποψήφιος για θέση εργασίας από χώρα της Ευρωπαϊκής Ένωσης, ανατρέξτε στην παρούσα <a href=\\"{{url}}\\" target=\\"_blank\\">ειδοποίηση απορρήτου</a> για περισσότερες λεπτομέρειες.","help":"Βοήθεια","poweredBy":"Δημιουργήθηκε από","viewAllJobs":"Προβολή όλων των θέσεων εργασίας","viewWebsite":"Προβολή ιστότοπου"},"i18n":{"picker":"Η επιλεγμένη γλώσσα είναι τα {{language}}"},"job":{"applicationForm":"Αίτηση","apply":"Υποβολή αίτησης","benefits":"Παροχές","description":"Περιγραφή","overview":"Επισκόπηση","posted":"Αναρτήθηκε","remote":"εξ αποστάσεως","requirements":"Απαιτήσεις","share":"Κοινοποίηση αυτής της θέσης εργασίας","type":{"contract":"Με σύμβαση χρόνου","full":"Πλήρης απασχόληση","other":"Άλλο","part":"Μερική απασχόληση","temporary":"Προσωρινή"}},"survey":{"error":{"footer":"Σας υπενθυμίζουμε ότι οι απαντήσεις σας είναι απολύτως ανώνυμες και δεν θα χρησιμοποιηθούν κατα τη διαδικασία πρόσληψης.","message":"Συμπληρώσατε ήδη την έρευνα.","title":"Γεια σας και πάλι!"},"expired":{"message":"Η έρευνα που αναζητάτε δεν είναι πλέον διαθέσιμη.","title":"Χμμμ..."},"participation":"Θέλετε να συμβάλετε στη βελίτωση της {{name}}; Συμπληρώστε προαιρετικά αυτήν την έρευνα:","questions":"Ερωτήσεις","skip":"Παράλειψη έρευνας","skipped":{"message":"Όλα είναι εντάξει, ευχαριστούμε!","title":"Έγινε παράλειψη της έρευνας."},"submit":"Υποβολή έρευνας","success":{"footer":"Δεν θα χρησιμοποιηθούν κατά τη διαδικασία πρόσληψης.","message":"Οι απαντήσεις σας είναι απολύτως ανώνυμες.","title":"Ευχαριστούμε που συμπληρώσατε την έρευνα!"}},"today":"σήμερα"}'),
                n = JSON.parse('{"complain":{"paragraph_1":"Ελπίζουμε ότι μπορούμε να επιλύσουμε οποιαδήποτε απορία ή ανησυχία σας σχετικά με τη χρήση των πληροφοριών σας από εμάς.","paragraph_2":"Ο&nbsp;<a href=\\"{{url}}\\">Γενικός Κανονισμός Προστασίας Δεδομένων</a>&nbsp; και ο ΓΚΠΔ του Ηνωμένου Βασιλείου σας δίνουν επίσης το δικαίωμα να υποβάλετε καταγγελία σε εποπτική αρχή, ιδίως (σύμφωνα με τον ΓΚΠΔ) στο κράτος της Ευρωπαϊκής Ένωσης (ή του Ευρωπαϊκού Οικονομικού Χώρου) όπου εργάζεστε, ζείτε συνήθως ή όπου συνέβη οποιαδήποτε εικαζόμενη παραβίαση των νόμων περί προστασίας δεδομένων.","title":"Πώς να υποβάλετε καταγγελία"},"contact":{"paragraph":"Όλες οι ερωτήσεις, τα σχόλια και τα αιτήματα σχετικά με την παρούσα Δήλωση Απορρήτου πρέπει να απευθύνονται στην διεύθυνση <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>","title":"Επικοινωνία"},"disclosure":{"paragraph_1":"Όπως ορίζεται ανωτέρω, διαβιβάζουμε τις πληροφορίες σας στους τρίτους παρόχους υπηρεσιών μας, συμπεριλαμβανομένης της Workable, οι οποίοι τις χρησιμοποιούν μόνο σύμφωνα με τις οδηγίες μας και όπως άλλως απαιτείται από το νόμο.","paragraph_2":"Σε περίπτωση που έχετε υποβάλει αίτηση για μια θέση εργασίας μέσω της λειτουργίας Indeed Apply, θα κοινοποιήσουμε στην Indeed ορισμένα προσωπικά δεδομένα που έχουμε στην διάθεσή μας, όπως ενδεικτικά ένα μοναδικό αναγνωριστικό που χρησιμοποιείται από την Indeed για την ταυτοποίησή σας και πληροφορίες σχετικά με την πρόοδό σας στην διαδικασία πρόσληψής μας για την αντίστοιχη θέση εργασίας, καθώς και υλικές, άυλες, οπτικές, ηλεκτρονικές, παρούσες ή μελλοντικές πληροφορίες που έχουμε στην διάθεσή μας για εσάς, όπως το όνομά σας, τα στοιχεία επικοινωνίας σας και άλλες πληροφορίες που αφορούν την ανάλυση δεδομένων που σας αφορούν ως υποψήφιο για εργασία (συλλογικά «Δεδομένα Διάθεσης»). Η Δήλωση απορρήτου της Indeed σχετικά με τη χρήση των Δεδομένων Διάθεσης από την Indeed είναι διαθέσιμη στον ιστότοπο της Indeed.","paragraph_3":"Σε περίπτωση που έχετε υποβάλει αίτηση για μια θέση εργασίας μέσω άλλου παρόχου υπηρεσιών, ενδέχεται να γνωστοποιήσουμε στον εν λόγω πάροχο υπηρεσιών δεδομένα παρόμοια με τα Δεδομένα Διάθεσης που ορίζονται ανωτέρω. Ο πάροχος υπηρεσιών θα είναι ο υπεύθυνος επεξεργασίας των δεδομένων αυτών και, ως εκ τούτου, θα είναι υπεύθυνος για τη συμμόρφωση με όλη την ισχύουσα νομοθεσία όσον αφορά τη χρήση των εν λόγω δεδομένων μετά τη διαβίβασή τους από εμάς.","title":"Κοινοποίηση των πληροφοριών σας"},"mostrecent":"την πιο πρόσφατη έκδοση","notice":{"outside_eea":{"paragraph_1":"Δεδομένου ότι η έδρα μας είναι στη(ν)/στο <span data-id=\\"placeholder\\">{{country_code}}</span>, έχουμε διορίσει ως αντιπρόσωπό μας στον ΕΟΧ τον/την <span data-id=\\"placeholder\\">{{appointed_representative}}</span>. Τα στοιχεία επικοινωνίας του/της είναι <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Ο διορισμένος αντιπρόσωπός μας στον Ευρωπαϊκό Οικονομικό Χώρο (ΕΟΧ)"},"paragraph_1":"Η <span data-id=\\"placeholder\\">{{trading_info}}</span> (\\"εμείς\\" ή \\"εμάς\\") δεσμεύεται να προστατεύει και να σέβεται το απόρρητό σας. Η παρούσα Δήλωση Απορρήτου (μαζί με οποιοδήποτε άλλο έγγραφο αναφέρεται εντός αυτής) καθορίζει τη βάση με την οποία επεξεργαζόμαστε τα προσωπικά δεδομένα που συλλέγουμε από εσάς, ή που μας παρέχετε, στο πλαίσιο των διαδικασιών πρόσληψής μας. Παρακαλούμε διαβάστε την προσεκτικά για να κατανοήσετε τις απόψεις και τις πρακτικές μας σχετικά με τα προσωπικά σας δεδομένα και τον τρόπο με τον οποίο θα τα επεξεργαστούμε.","paragraph_2":"Για τους σκοπούς του Γενικού Κανονισμού για την Προστασία Δεδομένων («ΓΚΠΔ») και του Γενικού Κανονισμού για την Προστασία Δεδομένων του Ηνωμένου Βασιλείου («ΓΚΠΔ του Ηνωμένου Βασιλείου») και του Νόμου περί Προστασίας Δεδομένων του Ηνωμένου Βασιλείου του 2018, ο υπεύθυνος επεξεργασίας δεδομένων είναι η εταιρεία <span data-id=\\"placeholder\\">{{company_name}}</span>","paragraph_3":"Χρησιμοποιούμε την Workable, μια ηλεκτρονική εφαρμογή που παρέχεται από την Workable Software Limited, για να βοηθήσουμε στη διαδικασία πρόσληψής μας. Χρησιμοποιούμε την Workable, η οποία λειτουργεί ως εκτελών την επεξεργασία, για την επεξεργασία προσωπικών δεδομένων. Η Workable δικαιούται να επεξεργάζεται τα προσωπικά σας δεδομένα μόνο σύμφωνα με τις οδηγίες μας.","paragraph_4":"Σε περίπτωση που υποβάλετε αίτηση για μια θέση εργασίας που έχει αναρτηθεί από εμάς, η παρούσα Δήλωση Απορρήτου θα ισχύει συμπληρωματικά οποιαδήποτε άλλης Δήλωσης Απορρήτου, η οποία σας έχει παρασχεθεί ξεχωριστά ή είναι διαθέσιμη στον ιστότοπό μας.","paragraph_5":"Όταν υποβάλλετε αίτηση για μια θέση εργασίας μέσω αίτησης σε ιστοσελίδα ευρέσεως εργασίας ή παρόμοιου παρόχου («Συνεργάτη»), θα πρέπει να σημειώσετε ότι ο σχετικός Συνεργάτης μπορεί να διατηρήσει τα προσωπικά σας δεδομένα και μπορεί επίσης να συλλέξει δεδομένα από εμάς σχετικά με την πρόοδο της αίτησής σας. Οποιαδήποτε χρήση των δεδομένων σας από τον Συνεργάτη θα γίνεται σύμφωνα με τη Δήλωση Απορρήτου του Συνεργάτη.","title":"Δήλωση Απορρήτου Υποψηφίων"},"personal_information":{"item_1":"Πληροφορίες που παρέχετε όταν υποβάλλετε αίτηση για μια θέση εργασίας. Αυτό περιλαμβάνει τις πληροφορίες που παρέχονται είτε μέσω ιστοσελίδας ευρέσεως εργασίας, είτε μέσω ηλεκτρονικού ταχυδρομείου ή αυτοπροσώπως σε συνεντεύξεις ή/και με οποιαδήποτε άλλη μέθοδο.","item_2":"Ειδικότερα, επεξεργαζόμαστε προσωπικά στοιχεία που μας παρέχετε όπως το όνομα, τη διεύθυνση ηλεκτρονικού ταχυδρομείου, τη διεύθυνση, τον αριθμό τηλεφώνου, την ημερομηνία γέννησης, τα προσόντα, την εμπειρία, λεπτομέρειες σχετικά με το ιστορικό απασχόλησής σας, τις δεξιότητες και την εμπειρία σας, καθώς και το βίντεό σας σε περίπτωση που διεξάγετε τη συνέντευξή σας χρησιμοποιώντας της λειτουργίας «βιντεοσκοπημένη συνέντευξη».","item_3":"Εάν επικοινωνήσετε μαζί μας, ενδέχεται να διατηρήσουμε αρχείο αυτής της αλληλογραφίας.","item_4":"Ένα αρχείο της προόδου σας κατά τη διάρκεια της διαδικασίας πρόσληψης.","item_5":"Λεπτομέρειες σχετικά με τις επισκέψεις σας στην ιστοσελίδα της Workable, συμπεριλαμβανομένων, ενδεικτικά, δεδομένων επισκεψιμότητας, δεδομένων τοποθεσίας, ιστολογίων και άλλων δεδομένων επικοινωνίας, του ιστότοπου που σας παρέπεμψε στον Ιστότοπο της Workable και των πόρων στους οποίους έχετε πρόσβαση.","item_6":"Η βιντεοσκοπημένη συνέντευξή σας σε περίπτωση που η συνέντευξή σας πραγματοποιήθηκε μέσω της λειτουργίας «βιντεοσκοπημένη συνέντευξη».","paragraph_1":"Συλλέγουμε και επεξεργαζόμαστε μερικούς ή όλους τους ακόλουθους τύπους πληροφοριών από εσάς","paragraph_2":"Η Workable μας παρέχει τη δυνατότητα να συνδέσουμε τα δεδομένα που μας παρέχετε, με άλλες πληροφορίες σχετικά με εσάς οι οποίες είναι δημόσια διαθέσιμες και τις οποίες έχετε δημοσιεύσει στο διαδίκτυο. Τέτοιες πληροφορίες μπορεί να περιλαμβάνουν πηγές όπως το LinkedIn και άλλα προφίλ σας στα μέσα κοινωνικής δικτύωσης.","paragraph_3":"Η τεχνολογία της Workable μας επιτρέπει να αναζητούμε διάφορες βάσεις δεδομένων - άλλες δημόσια διαθέσιμες και άλλες όχι, οι οποίες μπορεί να περιλαμβάνουν τα προσωπικά σας δεδομένα (συμπεριλαμβανομένου του βιογραφικού σας σημειώματος ή του C.V. σας), για να βρούμε πιθανούς υποψηφίους για την κάλυψη των κενών θέσεων εργασίας μας. Σε περίπτωση που σας βρούμε με αυτόν τον τρόπο, θα λάβουμε τα προσωπικά σας δεδομένα από αυτές τις πηγές.","paragraph_4":"Ενδέχεται να λάβουμε τα προσωπικά σας δεδομένα από τρίτους που σας προτείνουν ως υποψήφιο για μια συγκεκριμένη θέση εργασίας ή για την επιχείρησή μας γενικότερα.","subtitle_1":"Πληροφορίες που συλλέγουμε από εσάς","subtitle_2":"Πληροφορίες που λαμβάνουμε από τρίτους","title":"Τα Προσωπικά σας Δεδομένα"},"read":"Διαβάστε","store":{"item_1":"διαγραφή των προσωπικών σας δεδομένων από εσάς (ή από άλλο πρόσωπο που έχετε αναθέσει), ή","item_10":"Να περιορίσετε την επεξεργασία των προσωπικών σας δεδομένων σε ορισμένες περιπτώσεις","item_11":"Να διεκδικήσετε αποζημίωση για ζημίες που προκλήθηκαν από την παραβίαση της νομοθεσίας περί προστασίας δεδομένων.","item_12":"Επικοινωνήστε μαζί μας χρησιμοποιώντας τα παρακάτω στοιχεία επικοινωνίας","item_13":"Δώστε μας αρκετές πληροφορίες για να σας ταυτοποιήσουμε,","item_14":"Παρέχετε σε εμάς απόδειξη της ταυτότητας και της διεύθυνσής σας,","item_15":"Ενημερώστε μας για τις πληροφορίες τις οποίες αφορά το αίτημά σας.","item_2":"παραλαβή γραπτού αιτήματος από εσάς (ή άλλο πρόσωπο που έχετε αναθέσει) προς εμάς.","item_3":"Πρόσβαση στα προσωπικά σας δεδομένα και άλλες συμπληρωματικές πληροφορίες για τις οποίες έχει ήδη προβλεφθεί η παρούσα Πολιτική,","item_4":"Διόρθωση τυχόν ανακριβειών στα προσωπικά δεδομένα σας,","item_5":"Διαγραφή των προσωπικών δεδομένων που σας αφορούν, σε συγκεκριμένες περιπτώσεις,","item_6":"Λήψη των προσωπικών δεδομένων που σας αφορούν και τα οποία μας έχετε παράσχει, σε δομημένο, κοινώς χρησιμοποιούμενο και αναγνώσιμο από μηχανήματα μορφότυπο, καθώς και το δικαίωμα να διαβιβάζετε τα εν λόγω δεδομένα σε άλλον υπεύθυνο επεξεργασίας σε ορισμένες περιπτώσεις,","item_7":"Να αντιταχθείτε ανά πάσα στιγμή, στην επεξεργασία των προσωπικών δεδομένων που σας αφορούν για άμεσης εμπορικής προώθησης,","item_8":"Να αντιταχθείτε  στη λήψη αποφάσεων που λαμβάνονται αποκλειστικά βάσει αυτοματοποιημένης επεξεργασίας η οποία παράγει έννομα αποτελέσματα που σας αφορούν ή σας επηρεάζουν με σημαντικά με παρόμοιο τρόπο,","item_9":"Να ζητήσετε τον περιορισμό της επεξεργασίας των προσωπικών σας δεδομένων, σε συγκεκριμένες περιπτώσεις,","paragraph_1":"Λαμβάνουμε τα κατάλληλα μέτρα για να διασφαλίσουμε ότι όλα τα προσωπικά δεδομένα διατηρούνται ασφαλή, συμπεριλαμβανομένων μέτρων ασφαλείας για να αποτρέψουμε την τυχαία απώλεια, χρήση ή πρόσβαση σε προσωπικά δεδομένα με μη εξουσιοδοτημένο τρόπο.","paragraph_10":"Για περισσότερες πληροφορίες σχετικά με καθένα από αυτά τα δικαιώματα, συμπεριλαμβανομένων των περιστάσεων υπό τις οποίες εφαρμόζονται, ανατρέξτε στην ενότητα <a href=\\"{{url}}\\">Οδηγία από το Γραφείο του Επιτρόπου Πληροφοριών (ICO) του ΗΒ σχετικά με τα ατομικά δικαιώματα βάσει του Γενικού Κανονισμού Προστασίας Δεδομένων.</a>","paragraph_11":"Εάν θέλετε να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, παρακαλούμε:","paragraph_2":"Περιορίζουμε την πρόσβαση στα προσωπικά σας δεδομένα σε όσους έχουν πραγματική επαγγελματική ανάγκη να τα γνωρίζουν. Όσοι επεξεργάζονται τις πληροφορίες σας θα το κάνουν μόνο με εξουσιοδοτημένο τρόπο και υπόκεινται σε υποχρεώσεις εμπιστευτικότητας.","paragraph_3":"Διαθέτουμε επίσης διαδικασίες για την αντιμετώπιση οποιασδήποτε υποψίας παραβίασης της ασφάλειας των δεδομένων. Θα ειδοποιήσουμε εσάς και κάθε αρμόδια αρχή για μια ύποπτη παραβίαση της ασφάλειας των δεδομένων, εφόσον είμαστε υποχρεωμένοι από το νόμο να το πράξουμε.","paragraph_4":"Όταν αποθηκεύουμε τα προσωπικά σας δεδομένα στα δικά μας συστήματα, αυτά αποθηκεύονται <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"Τα δεδομένα που συλλέγουμε από εσάς και επεξεργαζόμαστε χρησιμοποιώντας τις Υπηρεσίες της Workable ενδέχεται να μεταφερθούν και να αποθηκευτούν σε προορισμό εκτός του Ηνωμένου Βασιλείου («Ηνωμένο Βασίλειο») ή του Ευρωπαϊκού Οικονομικού Χώρου («ΕΟΧ»). Ενδέχεται επίσης να υποβληθούν σε επεξεργασία από προσωπικό που δραστηριοποιείται εκτός του Ηνωμένου Βασιλείου ή του ΕΟΧ και εργάζεται για εμάς ή για έναν από τους προμηθευτές μας. Το εν λόγω προσωπικό ενδέχεται να ασχολείται, μεταξύ άλλων, με την παροχή υπηρεσιών υποστήριξης πελατών. Με την υποβολή των προσωπικών σας δεδομένων, συμφωνείτε με αυτή τη διαβίβαση, αποθήκευση ή επεξεργασία.","paragraph_6":"Ειδικότερα, τα δεδομένα σας μπορεί να είναι προσβάσιμα i) στο προσωπικό της Workable στις ΗΠΑ ή ii) μπορεί να αποθηκεύονται από τον πάροχο υπηρεσιών φιλοξενίας της Workable σε διακομιστές στις ΗΠΑ καθώς και στην ΕΕ. Οι ΗΠΑ δεν έχουν τους ίδιους νόμους περί προστασίας δεδομένων με το Ηνωμένο Βασίλειο και τον ΕΟΧ. Μεταξύ της Workable Software Limited και των εταιρειών του ομίλου της στο εξωτερικό, καθώς και μεταξύ της Workable Software Limited και κάθε εκτελούντος την επεξεργασία των δεδομένων της έχει υπογραφεί Συμφωνία Επεξεργασίας Δεδομένων. Αυτές οι συμφωνίες με τους εκτελούντες την επεξεργασία δεδομένων έχουν σχεδιαστεί για να συμβάλλουν στη διασφάλιση των δικαιωμάτων σας στην προστασία της ιδιωτικής ζωής και να σας παρέχουν ένδικα μέσα στην ελάχιστα πιθανή περίπτωση κατάχρησης των προσωπικών σας δεδομένων.","paragraph_7":"Αν θέλετε περισσότερες πληροφορίες, παρακαλούμε επικοινωνήστε μαζί μας (βλ. «Επικοινωνία» παρακάτω). Δεν θα διαβιβάσουμε με άλλο τρόπο τα προσωπικά σας δεδομένα εκτός του Ηνωμένου Βασιλείου ή του ΕΟΧ ή σε οποιονδήποτε οργανισμό (ή δευτερεύοντες φορείς) που διέπεται από το δημόσιο διεθνές δίκαιο ή που έχει συσταθεί βάσει οποιασδήποτε συμφωνίας μεταξύ δύο ή περισσότερων χωρών.","paragraph_8":"Τα προσωπικά σας δεδομένα θα διαγραφούν σε ένα από τα ακόλουθα περιστατικά:","paragraph_9":"Με την επιφύλαξη της τοπικής νομοθεσίας περί προστασίας δεδομένων και ιδίως του <a href=\\"{{url}}\\">Γενικό Κανονισμού Προστασίας Δεδομένων</a> και του ΓΚΠΔ του Ηνωμένου Βασιλείου, έχετε ορισμένα σημαντικά δικαιώματα δωρεάν. Συνοπτικά, αυτά περιλαμβάνουν τα εξής δικαιώματα:","retention":"Θα διατηρούμε τα δεδομένα σας μόνο για όσο διάστημα η αίτησή σας εξετάζεται για μια υφιστάμενη ή μελλοντική θέση εργασίας.","retention_count":"Θα διατηρήσουμε όλα τα δεδομένα για <span data-id=\\"placeholder\\">{{count}}</span> μήνα.","retention_count_plural":"Θα διατηρήσουμε όλα τα δεδομένα για <span data-id=\\"placeholder\\">{{count}}</span> μήνες.","subtitle_1":"Ασφάλεια","subtitle_2":"Πού αποθηκεύουμε τα προσωπικά σας δεδομένα","subtitle_3":"Πόσο καιρό διατηρούμε τα προσωπικά σας δεδομένα","subtitle_4":"Τα δικαιώματά σας","title":"Πώς αποθηκεύουμε τα προσωπικά σας δεδομένα"},"updated":"Αυτή η Ειδοποίηση απορρήτου έχει ενημερωθεί.","uses":{"item_1":"Για να εξετάσουμε την αίτησή σας σε σχέση με την θέση εργασίας που σας ενδιαφέρει.","item_2":"Για να εξετάσουμε την αίτησή σας σε σχέση με άλλες τυχόν θέσεις εργασίας.","item_3":"Για να επικοινωνήσουμε μαζί σας στο πλαίσιο της διαδικασίας πρόσληψης.","item_4":"Για να εμπλουτίσουμε τις πληροφορίες που λαμβάνουμε από εσάς με πληροφορίες που λαμβάνουμε από τρίτους παρόχους δεδομένων.","item_5":"Για την εξεύρεση κατάλληλων υποψηφίων για την κάλυψη των κενών θέσεων εργασίας μας.","item_6":"Για να βοηθήσουμε τους παρόχους υπηρεσιών μας (όπως η Workable και οι εκτελούντες την επεξεργασία και οι πάροχοι δεδομένων της) και τους συνεργάτες μας (όπως οι ιστοσελίδες ευρέσεως εργασίας μέσω των οποίων μπορεί να έχετε υποβάλει αίτηση) να βελτιώσουν και να αναπτύξουν τις υπηρεσίες τους.","paragraph_1":"Η νομική βάση για να συλλέγουμε και χρησιμοποιούμε τα προσωπικά σας δεδομένα είναι το έννομο συμφέρον μας, το οποίο είναι η πρόσληψη προσωπικού για την επιχείρησή μας.","paragraph_3":"Χρησιμοποιούμε τις πληροφορίες που διατηρούμε για εσάς με τους ακόλουθους τρόπους:","paragraph_4":"Ενδέχεται να χρησιμοποιήσουμε την τεχνολογία της Workable για να επιλέξουμε τους κατάλληλους υποψηφίους και για να τους εξετάσουμε βάσει κριτηρίων που προσδιορίζονται ρητά από εμάς ή τυπικών κριτηρίων σε σχέση με το ρόλο για τον οποίο έχετε υποβάλει αίτηση. Η διαδικασία ευρέσεως κατάλληλων υποψηφίων είναι αυτόματη, ωστόσο, οποιαδήποτε απόφαση σχετικά με το ποιον θα προσλάβουμε για την κάλυψη της κενής θέσης εργασίας θα ληφθεί από το προσωπικό μας.","subtitle_1":"Νομική βάση για την επεξεργασία","subtitle_2":"Σκοποί επεξεργασίας των πληροφοριών σας","subtitle_3":"Αυτοματοποιημένη λήψη αποφάσεων / κατάρτιση προφίλ","title":"Χρήσεις των πληροφοριών σας"}}');
            var i = a(82144),
                s = a(48706);

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, t), {}, {
                advanced: r,
                eeoc: i,
                gdpr: n,
                siteEditor: s
            })
        },
        17347: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            const r = JSON.parse('{"component":{"departments":{"blankslate":{"message":"It seems there are no departments at the moment.","title":"Sorry, there are no departments."},"jobs":"{{count}} open job","jobs_plural":"{{count}} open jobs","no_jobs":"No open jobs","view":"View jobs"},"header":{"button":"View jobs"},"job":{"posted_few_hours_ago":"few hours ago","workplace":{"hybrid":"Hybrid","onsite":"On-site","remote":"Remote"}},"jobs":{"blankslate":{"nojobsmessage":"We open new jobs from time to time, so please check again soon!","nojobstitle":"Sorry, no job openings at the moment.","noresultsmessage":"Try removing filters or refine your search.","noresultstitle":"Sorry, no job found matching these criteria."}}}}'),
                t = JSON.parse('{"careers":{"account":{"description":{"showless":"Show less","showmore":"Show more","title":"Careers at {{account}}"},"website":"View website"},"blankslate":{"noOpenings":{"message":"We open new jobs from time to time, so please check again soon!","title":"Sorry, no job openings at the moment"},"noResults":{"message":"Try removing filters or refine your search.","title":"Sorry, no jobs found matching this criteria."}},"emailmyresume":{"button":"Email my resume","description":"Can\'t find the right role? Email your resume to be considered for new positions in the future."},"job":{"apply":"Apply","dataDeleted":"Your personal data was deleted successfully.","notFound":"This job is no longer available."},"search":{"filters":{"apply":"Apply filters","autofilterAlert":"We’ve detected your location and are showing jobs in {{location}}. Clear the filters to display jobs in all locations.","clear":"Clear filters","department":"Department","filter":"Filter jobs","filters":"Filters","location":"Location","remote":"Remote only","search":"Search","workplace":"Workplace type","worktype":"Work type"},"input":"Search jobs…","loadmore":"Show more","title":"Job Openings","total":"{{count}} job","total_plural":"{{count}} jobs"}},"errors":{"action":"Go to homepage","notFound":{"message":"The page you are looking for might have been removed, had its name changed or is temporarily unavailable.","title":"Sorry, this page could not be loaded."},"surveyNotFound":{"title":"Survey not found!"},"offline":{"message":"Your internet connection must be down. Check your internet connection and try again.","title":"No internet connection."},"pageNotFound":{"button":"Find your dream job","message":"It seems we cannot find this page.","subMessage":"Looking for your next role? Explore thousands of jobs.","title":"Page not found."},"server":{"message":"The page you are looking for might have been removed, had its name changed or is temporarily unavailable.","title":"Sorry an error occurred. We are working on this."},"unknown":{"message":"The page you are looking for might have been removed, had its name changed or is temporarily unavailable.","title":"Sorry, an unknown error occurred."}},"footer":{"accessibility":"Accessibility","ccpa":"If you are a California Job Applicant see the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","complianceNotice":"{{account}} collects and processes personal data in accordance with applicable data protection laws.","cookieSettings":"Cookie settings","eeoc":"{{account}} does not discriminate on the basis of race, sex, color, religion, age, national origin, marital status, disability, veteran status, genetic information, sexual orientation, gender identity or any other reason prohibited by law in provision of employment opportunities and benefits.","gdpr":"If you are a European Job Applicant see the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","help":"Help","poweredBy":"Powered by","viewAllJobs":"View all jobs","viewWebsite":"View website"},"i18n":{"picker":"Selected language is {{language}}"},"job":{"applicationForm":"Application","apply":"Apply for this job","benefits":"Benefits","description":"Description","overview":"Overview","posted":"Posted","remote":"remote","requirements":"Requirements","share":"Share this job","type":{"contract":"Contract","full":"Full time","other":"Other","part":"Part time","temporary":"Temporary"}},"survey":{"error":{"footer":"As a reminder, your responses are completely anonymous and will not be used in the hiring process.","message":"You already completed this survey.","title":"Hi again!"},"expired":{"message":"The survey you’re looking for is no longer available.","title":"Hmmm..."},"participation":"Want to help {{name}} improve? Complete our optional survey:","questions":"Questions","skip":"Skip survey","skipped":{"message":"You’re all set, thanks!","title":"Survey skipped."},"submit":"Submit survey","success":{"footer":"They will not be used in the hiring process.","message":"Your responses are completely anonymous.","title":"Thanks for completing the survey!"}},"today":"today"}');
            var n = a(82144);
            const i = JSON.parse('{"complain":{"paragraph_1":"We hope that We can resolve any query or concern you raise about Our use of your information.","paragraph_2":"The&nbsp;<a href=\\"{{url}}\\">General Data Protection Regulation</a>&nbsp; and the UK GDPR also give you right to lodge a complaint with a supervisory authority, in particular (under the GDPR) in the European Union (or European Economic Area) state where you work, normally live or where any alleged infringement of data protection laws occurred.","title":"How to complain"},"contact":{"paragraph":"All questions, comments and requests regarding this Privacy Notice should be addressed to <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>","title":"Contact"},"disclosure":{"paragraph_1":"As set out above, We pass your information to our third party service providers, including Workable, who use it only in accordance with our instructions and as otherwise required by law.","paragraph_2":"Where you have applied for a job opening through the Indeed Apply functionality, We will disclose to Indeed certain personal data that We hold, including but not limited to a unique identifier used by Indeed to identify you, and information about your progress through our hiring process for the applicable job opening, as well as tangible, intangible, visual, electronic, present, or future information that We hold about you, such as your name, contact details and other information involving analysis of data relating to you as an applicant for employment (collectively “Disposition Data”). Indeed’s Privacy Notice in respect of Indeed’s use of the Disposition Data is available on Indeed’s website.","paragraph_3":"Where you have applied to a job opening through another service provider, We may disclose data similar to the Disposition Data defined above to such service provider. The service provider shall be the data controller of this data and shall therefore be responsible for complying with all applicable law in respect of the use of that data following its transfer by Us.","title":"Disclosure of Your Information"},"mostrecent":"the most recent version","notice":{"outside_eea":{"paragraph_1":"As We are based in <span data-id=\\"placeholder\\">{{country_code}}</span>, We have appointed <span data-id=\\"placeholder\\">{{appointed_representative}}</span> to be our representative within the EEA. Their contact details are <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Our Appointed Representative In The European Economic Area (EEA)"},"paragraph_1":"<span data-id=\\"placeholder\\">{{trading_info}}</span> (“We”, “Us”) are committed to protecting and respecting your privacy. This Privacy Notice (together with any other documents referred to herein) sets out the basis on which the personal data collected from you, or that you provide to Us, will be processed by Us in connection with our recruitment processes. Please read the following carefully to understand our views and practices regarding your personal data and how We will treat it.","paragraph_2":"For the purpose of the General Data Protection Regulation (“GDPR”) and the United Kingdom General Data Protection Regulation (“UK GDPR”) and the UK Data Protection Act 2018, the Data Controller is <span data-id=\\"placeholder\\">{{company_name}}</span>","paragraph_3":"We use Workable, an online application provided by Workable Software Limited, to assist with our recruitment process. We use Workable to process personal information as a data processor on our behalf. Workable is only entitled to process your personal data in accordance with our instructions.","paragraph_4":"Where you apply for a job opening posted by Us, these Privacy Notice provisions will apply to our processing of your personal information in addition to our other Privacy Notice which has been provided to you separately or is available on our Website.","paragraph_5":"Where you apply for a job opening via the application function on a job site or similar online service provider (“Partner”), you should note that the relevant Partner may retain your personal data and may also collect data from Us in respect of the progress of your application. Any use by the Partner of your data will be in accordance with the Partner’s Privacy Notice.","title":"Recruitment Privacy Notice"},"personal_information":{"item_1":"Information that you provide when you apply for a role. This includes information provided through an online job site, via email, in person at interviews and/or by any other method.","item_2":"In particular, We process personal details such as name, email address, address, telephone number, date of birth, qualifications, experience, information relating to your employment history, skills and experience that you provide to Us, as well as your video in case you conduct your interview using the Video Interview feature.","item_3":"If you contact Us, We may keep a record of that correspondence.","item_4":"A record of your progress through any hiring process that We may conduct.","item_5":"Details of your visits to Workable’s Website including, but not limited to, traffic data, location data, weblogs and other communication data, the site that referred you to Workable’s Website and the resources that you access.","item_6":"Your video interview in case your interview was performed through the video interview feature.","paragraph_1":"We collect and process some or all of the following types of information from you:","paragraph_2":"Workable provides Us with the facility to link the data you provide to Us, with other publicly available information about you that you have published on the Internet – this may include sources such as LinkedIn and other social media profiles.","paragraph_3":"Workable’s technology allows Us to search various databases – some publicly available and others not, which may include your personal data (include your CV or Resumé), to find possible candidates to fill our job openings. Where We find you in this way We will obtain your personal data from these sources.","paragraph_4":"We may receive your personal data from a third party who recommends you as a candidate for a specific job opening or for our business more generally.","subtitle_1":"Information We collect from you","subtitle_2":"Information We collect from other sources","title":"Your Personal Information"},"read":"Read","store":{"item_1":"deletion of your personal information by you (or by another person engaged by you); or","item_10":"otherwise restrict our processing of your personal data in certain circumstances","item_11":"claim compensation for damages caused by our breach of any data protection laws.","item_12":"contact Us using our contact details below,","item_13":"let Us have enough information to identify you,","item_14":"let Us have proof of your identity and address, and","item_15":"let Us know the information to which your request relates.","item_2":"receipt of a written request by you (or another person engaged by you) to us.","item_3":"access to your personal data and to certain other supplementary information that this Privacy Notice is already designed to address","item_4":"require Us to correct any mistakes in your information which We hold","item_5":"require the erasure of personal data concerning you in certain situations","item_6":"receive the personal data concerning you which you have provided to Us, in a structured, commonly used and machine-readable format and have the right to transmit those data to a third party in certain situations","item_7":"object at any time to processing of personal data concerning you for direct marketing","item_8":"object to decisions being taken by automated means which produce legal effects concerning you or similarly significantly affect you","item_9":"object in certain other situations to our continued processing of your personal data","paragraph_1":"We take appropriate measures to ensure that all personal data is kept secure including security measures to prevent personal data from being accidentally lost, or used or accessed in an unauthorised way. We limit access to your personal data to those who have a genuine business need to know it. Those processing your information will do so only in an authorised manner and are subject to a duty of confidentiality.","paragraph_10":"For further information on each of those rights, including the circumstances in which they apply, see the <a href=\\"{{url}}\\">Guidance from the UK Information Commissioner’s Office (ICO) on individuals rights under the General Data Protection Regulation.</a>","paragraph_11":"If you would like to exercise any of those rights, please:","paragraph_2":"We also have procedures in place to deal with any suspected data security breach. We will notify you and any applicable regulator of a suspected data security breach where We are legally required to do so.","paragraph_3":"Unfortunately, the transmission of information via the internet is not completely secure. Although We will do our best to protect your personal data, We cannot guarantee the security of your data transmitted through any online means, therefore any transmission remains at your own risk.","paragraph_4":"Where We store your personal data in our own systems, it is stored <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"The data that We collect from you and process using Workable’s Services may be transferred to, and stored at, a destination outside the United Kingdom (“UK”) or the European Economic Area (\\"EEA\\"). It may also be processed by staff operating outside the UK or the EEA who work for Us or for one of our suppliers. Such staff maybe engaged in, among other things, the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing.","paragraph_6":"In particular, your data may be accessible to i) Workable’s staff in the USA or ii) may be stored by Workable’s hosting service provider on servers in the USA as well as in the EU. The USA does not have the same data protection laws as the United Kingdom and EEA. A Data Processor Agreement has been signed between Workable Software Limited and its overseas group companies, and between Workable Software Limited and each of its data processors. These data processor agreements are designed to help safeguard your privacy rights and give you remedies in the unlikely event of a misuse of your personal data.","paragraph_7":"If you would like further information please contact Us (see ‘Contact’ below). We will not otherwise transfer your personal data outside of the United Kingdom or EEA or to any organisation (or subordinate bodies) governed by public international law or which is set up under any agreement between two or more countries.","paragraph_8":"Your personal information will be deleted on one of the following occurrences:","paragraph_9":"Subject to local data protection laws and in particular under the <a href=\\"{{url}}\\">GDPR</a> and the UK GDPR, you have a number of important rights free of charge. In summary, those include rights to:","retention":"We will only keep your data while We are considering you for an open or future position.","retention_count":"We will hold all the data for <span data-id=\\"placeholder\\">{{count}}</span> month.","retention_count_plural":"We will hold all the data for <span data-id=\\"placeholder\\">{{count}}</span> months.","subtitle_1":"Security","subtitle_2":"Where We store your personal data","subtitle_3":"How long We keep your personal data","subtitle_4":"Your rights","title":"How We store your personal data"},"updated":"This Privacy Notice has been updated.","uses":{"item_1":"To consider your application in respect of a role for which you have applied.","item_2":"To consider your application in respect of other roles.","item_3":"To communicate with you in respect of the recruitment process.","item_4":"To enhance any information that We receive from you with information obtained from third party data providers.","item_5":"To find appropriate candidates to fill our job openings.","item_6":"To help our service providers (such as Workable and its processors and data providers) and Partners (such as the job sites through which you may have applied) improve and develop their services.","paragraph_1":"We rely on legitimate interest as the lawful basis on which We collect and use your personal data. Our legitimate interests are the recruitment of staff for our business.","paragraph_3":"We use information held about you in the following ways:","paragraph_4":"We may use Workable’s technology to select appropriate candidates for Us to consider based on criteria expressly identified by us, or typical in relation to the role for which you have applied. The process of finding suitable candidates is automatic, however, any decision as to who We will engage to fill the job opening will be made by our staff.","subtitle_1":"Lawful basis for processing","subtitle_2":"Purposes of processing","subtitle_3":"Automated decision making/profiling","title":"Uses made of your information"}}');
            var s = a(48706);

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, t), {}, {
                advanced: r,
                eeoc: n,
                gdpr: i,
                siteEditor: s
            })
        },
        28021: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            var r = a(48706);
            const t = JSON.parse('{"component":{"departments":{"blankslate":{"message":"Parece que no hay ningún departamento en estos momentos.","title":"Lamentamos comunicarle que no hay ningún departamento."},"jobs":"{{count}} vacante","jobs_plural":"{{count}} vacantes","no_jobs":"No hay puestos abiertos","view":"Ver puestos"},"header":{"button":"Ver puestos"},"job":{"posted_few_hours_ago":"hace unas horas","workplace":{"hybrid":"Híbrido","onsite":"Presencial","remote":"Remoto"}},"jobs":{"blankslate":{"nojobsmessage":"Publicamos vacantes con frecuencia, así que vuelva a intentarlo pronto.","nojobstitle":"Lo sentimos, no hay vacantes en este momento","noresultsmessage":"Pruebe a eliminar los filtros o a acotar la búsqueda.","noresultstitle":"Lo sentimos, no se han encontrado puestos con estos criterios."}}}}'),
                n = JSON.parse('{"careers":{"account":{"description":{"showless":"Mostrar menos","showmore":"Mostrar más","title":"Empleo en {{account}}"},"website":"Ver sitio web"},"blankslate":{"noOpenings":{"message":"Publicamos vacantes con frecuencia, así que vuelva a intentarlo pronto.","title":"Lo sentimos, no hay vacantes en este momento"},"noResults":{"message":"Pruebe a eliminar los filtros o a acotar la búsqueda.","title":"Lo sentimos, no se han encontrado puestos con estos criterios."}},"emailmyresume":{"button":"Enviar mi currículum por correo electrónico","description":"¿No encuentra el puesto adecuado? Envíe su currículum por correo electrónico y lo evaluaremos cuando salgan más puestos."},"job":{"apply":"Presentar candidatura","dataDeleted":"Sus datos personales se han eliminado correctamente.","notFound":"Este puesto ya no está disponible."},"search":{"filters":{"apply":"Aplicar filtros","autofilterAlert":"Hemos determinado su ubicación y le mostramos los puestos que hay en {{location}}. Borre los filtros si quiere ver puestos de cualquier lugar.","clear":"Borrar filtros","department":"Departamento","filter":"Filtrar puestos","filters":"Filtros","location":"Ubicación","remote":"Solo a distancia","search":"Buscar","workplace":"Lugar de trabajo","worktype":"Tipo de trabajo"},"input":"Buscar puestos…","loadmore":"Mostrar más","title":"Vacantes","total":"{{count}} puesto","total_plural":"{{count}} puestos"}},"errors":{"action":"Ir a la página de inicio","notFound":{"message":"Es posible que la página que busca se haya eliminado, haya cambiado de nombre o no esté disponible temporalmente.","title":"Lo sentimos, no hemos podido cargar esta página."},"surveyNotFound":{"title":""},"offline":{"message":"Parece que no tiene conexión a Internet. Compruébelo e inténtelo de nuevo.","title":"No hay conexión a Internet."},"pageNotFound":{"button":"Encuentre el trabajo de sus sueños","message":"Parece que no podemos encontrar esta página.","subMessage":"¿Busca un nuevo empleo? Explore entre miles de puestos.","title":"Página no encontrada."},"server":{"message":"Es posible que la página que busca se haya eliminado, haya cambiado de nombre o no esté disponible temporalmente.","title":"Se ha producido un error. Estamos trabajando en ello."},"unknown":{"message":"Es posible que la página que busca se haya eliminado, haya cambiado de nombre o no esté disponible temporalmente.","title":"Lo sentimos, se ha producido un error desconocido."}},"footer":{"accessibility":"Accesibilidad","ccpa":"Si es un candidato de California, consulte el aviso de <a href=\\"{{url}}\\" target=\\"_blank\\">privacidad</a> para obtener más información.","complianceNotice":"{{account}} recopila y trata los datos personales de acuerdo con la legislación en materia de protección de datos vigente.","cookieSettings":"Configuración de cookies","eeoc":"{{account}} no discrimina por razón de raza, sexo, color, religión, edad, nacionalidad, estado civil, discapacidad, condición de veterano de guerra, información genética, orientación sexual, identidad de género o cualquier otro motivo prohibido por la ley a la hora de conceder oportunidades y prestaciones laborales.","gdpr":"Si es un candidato europeo, consulte el aviso de <a href=\\"{{url}}\\" target=\\"_blank\\">privacidad</a> para obtener más información.","help":"Ayuda","poweredBy":"Con la tecnología de","viewAllJobs":"Ver todos los puestos","viewWebsite":"Ver sitio web"},"i18n":{"picker":"El idioma seleccionado es el {{language}}"},"job":{"applicationForm":"Candidatura","apply":"Presentar candidatura para este puesto","benefits":"Prestaciones","description":"Descripción","overview":"Información general","posted":"Publicado","remote":"a distancia","requirements":"Requisitos","share":"Compartir este puesto","type":{"contract":"Contrato","full":"Jornada completa","other":"Otro","part":"A tiempo parcial","temporary":"Temporal"}},"survey":{"error":{"footer":"Le recordamos que sus respuestas son plenamente anónimas y no tendrán relevancia durante el proceso de contratación.","message":"Ya ha participado en esta encuesta.","title":"¡Hola de nuevo!"},"expired":{"message":"The survey you’re looking for is no longer available.","title":"Hmmm..."},"participation":"¿Desea ayudar a mejorar {{name}}? Participe entonces en nuestra encuesta opcional:","questions":"Preguntas","skip":"Omitir encuesta","skipped":{"message":"¡Hemos acabado, gracias!","title":"Encuesta omitida."},"submit":"Enviar encuesta","success":{"footer":"No tendrá relevancia durante el proceso de contratación.","message":"Sus respuestas son plenamente anónimas.","title":"¡Gracias por participar en la encuesta!"}},"today":"hoy"}'),
                i = JSON.parse('{"gender":{"header":"Sexo","options":{"female":"Mujer","male":"Hombre","undisclosed":"Prefiero no responder"}},"opportunityemployer":{"description":"Le solicitamos (aunque no es obligatorio) que rellene los datos personales que pedimos a continuación. Esta información solo se utilizará para la elaboración de informes de índole gubernamental y no como criterio de selección en el proceso de contratación.","emailprompt":"Si no puede completar la encuesta de EEO ahora porque prefiere hacerlo en otro momento, no se preocupe. En breve, le enviaremos un correo electrónico con el enlace para poder hacerlo.","header":"Ayúdenos a ser una empresa que ofrece igualdad de oportunidades"},"race":{"header":"Raza o etnia","options":{"americanIndian":{"explanation":"Una persona originaria de los pueblos indígenas de América del Norte, América Central y América del Sur que mantiene una filiación tribal o un vínculo comunitario.","label":"Indios americanos o nativos de Alaska (ni hispano ni latino)"},"asian":{"explanation":"Una persona originaria de los países del Extremo Oriente, el Sudeste Asiático o del subcontinente indio, como, por ejemplo, Camboya, China, la India, Japón, Corea, Malasia, Pakistán, Filipinas, Tailandia y Vietnam.","label":"Oriental (ni hispano ni latino)"},"black":{"explanation":"Un persona originaria de los grupos raciales negros de África.","label":"Negro o afroamericano (ni hispano ni latino)"},"hispanicLatino":{"explanation":"Una persona de origen cubano, mexicano, puertorriqueño, de América Central o América del Sur, o de otro origen o cultura de carácter hispánico independientemente de su raza.","label":"Hispano o latino"},"multiracial":{"explanation":"Todas las personas que se identifican con más de una de las cinco razas anteriores.","label":"Dos o más razas (ni hispano ni latino)"},"nativeHawaiian":{"explanation":"Una persona originaria de Hawái, Guam, Samoa u otras islas del Pacífico.","label":"Nativo de Hawái u otras islas del Pacífico (ni hispano ni latino)"},"undisclosed":{"label":"Prefiero no responder"},"white":{"explanation":"Una persona originaria de Europa, Oriente Medio o África del Norte.","label":"Caucásico (ni hispano ni latino)"}}},"skip":"Omitir la encuesta de EEO por ahora","submitted":{"footer":"La información facilitada se utilizará únicamente para verificar que se cumple la igualdad de oportunidades y no como criterio de selección en el proceso de contratación.","message":"Ya ha rellenado el formulario EEO."},"veteran":{"disabledReasons":{"reasons":{"active":"Un \\"veterano con insignia de campaña o en servicio activo en tiempo de guerra\\" es un veterano que estuvo en el servicio activo militar por tierra, mar o aire estadounidense en una guerra, o bien en una campaña o expedición por la que se le haya concedido una insignia de campaña conforme a la administración del Departamento de Defensa de EE. UU.","armed":"Un \\"veterano condecorado por sus servicios a las Fuerzas Armadas\\" es aquel que, estando en el servicio activo militar por tierra, mar o aire estadounidense, participó en una operación militar por la que se le concedió una medalla por sus servicios a las Fuerzas Armadas conforme a la Orden Ejecutiva 12985.","discharged":"Una persona que fue licenciada o dada de baja del servicio militar activo a causa de una discapacidad relacionada con el servicio.","separated":"\\"Veterano recientemente licenciado\\" hace referencia a cualquier veterano de guerra que se encuentre en el período de tres años posterior a la fecha de su licenciamiento o baja del servicio militar activo de tierra, mar y aire estadounidense.","usMilitary":"Un veterano del servicio militar por tierra, mar y aire estadounidense que tiene derecho a indemnización (o que tendría derecho a indemnización de no recibir la paga de militar retirado) de acuerdo con la administración del secretario de Asuntos de Veteranos de Guerra; o bien"},"text":"Un \\"veterano con discapacidad\\" es aquel que cumple uno de los siguientes casos:"},"header":"Condición de veterano de guerra","p1":"Esta empresa es un contratista del gobierno sujeto a la Ley de Asistencia de Reajuste de los Veteranos de la Era de Vietnam de 1974, modificada por la Ley de Empleo para Veteranos de 2002, 38 U.S.C. 4212 (VEVRAA, por sus siglas en inglés), que exige que los contratistas del gobierno adopten medidas positivas para emplear y anticipar el empleo de: (1) veteranos con discapacidad; (2) veteranos recientemente licenciados; (3) veteranos con insignia de campaña o en servicio activo en tiempo de guerra; y (4) veteranos condecorados por sus servicios a las Fuerzas Armadas. Estas clasificaciones se definen de la siguiente manera:","p2":"Los veteranos protegidos podrían tener derechos adicionales conforme a la Ley de Derechos de Empleo y Reempleo de Servicios Uniformados (USERRA, por sus siglas en inglés). Concretamente, si usted tuvo que ausentarse de su empleo para servir en un servicio uniformado, podría tener derecho a que su empresa vuelva a emplearle en el puesto que actualmente tendría con una razonable certidumbre si no hubiera tenido que ausentarse por este servicio. Para obtener más información, llame de forma gratuita al Servicio de Formación y Empleo de Veteranos (VETS, por sus siglas en inglés) del Departamento de Empleo de EE. UU.: 1-866-4-USA-DOL.","p3":"Si cree que pertenece a alguna de las categorías de veteranos protegidos indicadas anteriormente, marque a continuación las casillas que correspondan. Como contratista del gobierno sujeto a la VEVRAA, solicitamos esta información para medir la eficacia de la sensibilización y de los esfuerzos positivos de contratación que realizamos de conformidad con la VEVRAA.","p4":"El envío de esta información es voluntario, de modo que negarse a hacerlo no tendrá consecuencias negativas para usted. La información facilitada se utilizará exclusivamente de conformidad con la Ley de Asistencia de Reajuste de los Veteranos de la Era de Vietnam de 1974, en su versión modificada.","p5":"La información que envíe seguirá siendo confidencial, excepto que (i) se informe a supervisores y directores sobre restricciones en el trabajo o los deberes de los veteranos con discapacidad y sobre las adaptaciones que puedan necesitarse; (ii) se informe al personal de primeros auxilios y de seguridad, cuando proceda, sobre si tiene una enfermedad que podría requerir un tratamiento de emergencia, y (iii) se informe a los funcionarios del gobierno encargados de hacer cumplir la legislación dictada por la Oficina de los Programas de Cumplimiento de Contratos Federales o la Ley de Estadounidenses con Discapacidad.","question":{"answers":{"notProtected":"NO SOY UN VETERANO PROTEGIDO","protected":"ME IDENTIFICO CON UNA O MÁS DE LAS CLASIFICACIONES DE VETERANO PROTEGIDO INDICADAS MÁS ARRIBA","undisclosed":"PREFIERO NO REVELAR MI CONDICIÓN DE VETERANO PROTEGIDO"},"text":"Marque una de las siguientes casillas:"}},"voluntary":{"header":"Revelación voluntaria de discapacidad","information":{"sentence1":"Formulario de revelación voluntaria de discapacidad CC-305","sentence2":"Número de control OMB 1250-0005","sentence3":"Válido hasta el 30/04/2026"},"notice":{"p1":"DECLARACIÓN PÚBLICA DE CARGA: De acuerdo con la Ley de Reducción de Trámites de 1995, ninguna persona está obligada a responder a una recopilación de información a menos que dicha recopilación muestre un número de control OMB válido. Esta encuesta debería completarse en unos 5 minutos."},"questions":{"question1":{"answer":{"p1":"Somos un contratista o subcontratista federal. La ley nos obliga a ofrecer igualdad de oportunidades de empleo a las personas con discapacidad cualificadas. Nuestro objetivo es que al menos el 7% de nuestros trabajadores sean personas con discapacidad. La ley dice que debemos medir nuestro progreso hacia este objetivo. Para ello, debemos preguntar a los solicitantes y a los empleados si tienen o han tenido alguna discapacidad. Las personas pueden convertirse en discapacitadas, por lo que debemos hacer esta pregunta al menos cada cinco años.","p2":"Rellenar este formulario es voluntario y esperamos que decida hacerlo. Su respuesta es confidencial. Nadie que tome decisiones de contratación la verá. Su decisión de rellenar el formulario y su respuesta no le perjudicarán en modo alguno. Si desea obtener más información sobre la ley o este formulario, visite el sitio web de la Oficina de Programas de Cumplimiento de Contratos Federales (OFCCP) del Departamento de Trabajo de EE.UU. en&nbsp;<a href=\\"{{url}}\\" target=\\"blank\\" rel=\\"noreferrer\\">www.dol.gov/ofccp</a>."},"question":"¿Por le pedimos que rellene este formulario?"},"question2":{"answer":{"disabilities":{"options1":"<li>Autismo</li><li>Trastorno autoinmune (por ej.: lupus, fibromialgia, artritis reumatoide o VIH/SIDA)</li><li>Ceguera o visión reducida </li><li>Cáncer</li><li>Enfermedad cardiovascular o del corazón</li><li>Celiaquía</li><li>Parálisis cerebral</li><li>Sordera o dificultades auditivas</li>","options2":"<li>Depresión o ansiedad</li><li>Diabetes</li><li>Epilepsia</li><li>Trastornos gastrointestinales (por ej.: enfermedad de Crohn o síndrome del colon irritable)</li><li>Discapacidad intelectual</li><li>Falta o amputación parcial o total de extremidades</li><li>Trastorno del sistema nervioso (por ej.: migrañas, Parkinson o esclerosis múltiple)</li><li>Trastorno psiquiátrico (por ej.: trastorno bipolar, esquizofrenia, trastorno por estrés postraumático o depresión grave)</li>","options3":"<li>Afección del sistema nervioso, por ejemplo, migrañas, enfermedad de Parkinson, esclerosis múltiple (EM)</li><li>Neurodivergencia, por ejemplo, trastorno por déficit de atención con hiperactividad (TDAH), trastorno del espectro autista, dislexia, dispraxia u otras dificultades de aprendizaje</li><li>Parálisis parcial o total (por cualquier causa)</li><li>Afecciones pulmonares o respiratorias, por ejemplo, tuberculosis, asma, enfisema</li><li>Baja estatura (enanismo)</li><li>Lesión cerebral traumática</li>","text":"Como ejemplos de discapacidad, podemos citar las siguientes:"},"p1":"Se considera que tiene una discapacidad si padece alguna incapacidad física o mental o una enfermedad que le impida desempeñar de forma considerable una actividad vital principal, o si tiene un historial médico en el que se refleje dicha incapacidad o enfermedad."},"question":"¿Cómo sé si tengo una discapacidad?"},"question3":{"options":{"no":" No, no tengo ninguna discapacidad ni la he tenido en el pasado","undisclosed":"No quiero contestar","yes":"Sí, tengo una discapacidad o la he tenido en el pasado"},"question":"Marque una de las siguientes casillas:"}}}}'),
                s = JSON.parse('{"complain":{"paragraph_1":"Esperamos poder resolver cualquier duda o consulta que tenga sobre uso que hacemos de su información.","paragraph_2":"El &nbsp;<a href=\\"{{url}}\\">Reglamento General de Protección de Datos</a>&nbsp; también le otorga el derecho a presentar una queja ante una autoridad supervisora, concretamente en el estado de la Unión Europea (o Espacio Económico Europeo) donde trabaje, donde resida habitualmente o donde se haya producido el supuesto quebrantamiento a la legislación de protección de datos. La autoridad supervisora en el Reino Unido es el Comisario de Información, cuyos datos de contacto puede encontrar aquí: &nbsp;<a href=\\"http://ico.org.uk/concerns/\\">http://ico.org.uk/concerns/</a>. Si lo prefiere, también puede llamar por teléfono al <a href=\\"tel:+443031231113\\">+44303-123-1113</a>.","title":"Cómo presentar una queja"},"contact":{"paragraph":"Todas las preguntas, solicitudes y comentarios relativos a este aviso de privacidad deberán dirigirse a <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>","title":"Contacto"},"disclosure":{"paragraph_1":"Como se ha estipulado anteriormente, enviamos su información a nuestros proveedores de servicios terceros, como Workable, y estos la utilizan de acuerdo con nuestras instrucciones o para lo que la ley disponga.","paragraph_2":"Si ha enviado una candidatura para una vacante a través de la funcionalidad correspondiente de Indeed y ha aceptado divulgar su información, compartiremos con Indeed determinados datos personales que tenemos sobre usted, incluyendo, aunque sin limitación, un identificador único que Indeed utilizará para identificar su perfil y la información sobre su progreso en nuestro proceso de contratación para la vacante en cuestión, así como la información tangible, intangible, visual, electrónica, presente o futura que conservamos sobre usted, como su nombre, sus datos de contacto y otra información que lo defina como candidato a un empleo (en conjunto, \\"Datos de disposición\\"). El aviso de privacidad de Indeed con respecto al uso que hace de los Datos de disposición está disponible en el sitio web de Indeed.","paragraph_3":"Si ha solicitado una vacante a través de otro proveedor de servicios, es posible que compartamos datos similares a los Datos de disposición, anteriormente definidos, con ese proveedor de servicios. El proveedor de servicios será el responsable del tratamiento de estos datos y, por tanto, el responsable de cumplir con la legislación vigente con respecto al uso de dichos datos una vez que nosotros se los hayamos transferido.","title":"Divulgación de su información"},"mostrecent":"la versión más reciente","notice":{"outside_eea":{"paragraph_1":"Como nuestra sede se encuentra en <span data-id=\\"placeholder\\">{{country_code}}</span>, hemos designado a <span data-id=\\"placeholder\\">{{appointed_representative}}</span> como nuestro representante en el EEE. Estos son sus datos de contacto: <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Nuestro representante designado en el Espacio Económico Europeo (EEE)"},"paragraph_1":"<span data-id=\\"placeholder\\">{{trading_info}}</span> (\\"nosotros\\", \\"nos\\", etc.) nos comprometemos a proteger y respetar su privacidad. Este aviso de privacidad (junto con cualquier otro documento al que hagamos referencia en el presente) estipula la base sobre la que trataremos los datos recopilados sobre usted, o que usted nos envíe, en nuestros procesos de selección de personal. Lea detenidamente la información que presentamos a continuación para entender nuestras opiniones y prácticas relativas a sus datos personales, y cómo los trataremos.","paragraph_2":"A efectos del Reglamento General de Protección de Datos (RGPD), el responsable del tratamiento de datos es <span data-id=\\"placeholder\\">{{company_name}}</span>","paragraph_3":"Utilizamos Workable, una aplicación en línea de Workable Software Limited, como ayuda en nuestros procesos de selección de personal, así como para que actúe como responsable del tratamiento de la información personal en nuestro nombre. Workable solo tiene derecho a tratar sus datos personales de acuerdo con nuestras instrucciones.","paragraph_4":"Si envía su candidatura para un puesto que nosotros publiquemos, se aplicarán estas cláusulas del aviso de privacidad al tratamiento de su información personal, así como a cualquier otro aviso de privacidad que le hayamos enviado de forma independiente o que aparezca en nuestro sitio web.","paragraph_5":"Si envía una candidatura para un puesto a través de la función correspondiente en un sitio de ofertas de empleo o a través de un proveedor de servicios en línea similares (\\"Partner\\"), debe tener en cuenta que el Partner pertinente podría retener sus datos personales y recopilar datos nuestros con respecto al progreso de su candidatura. Todo uso que el Partner haga de sus datos será de conformidad con el aviso de privacidad del susodicho.","title":"Aviso de privacidad para la selección de personal"},"personal_information":{"item_1":"Información que nos envíe al presentar su candidatura para un puesto. Esto engloba la información personal enviada a través de un sitio de ofertas de empleo en línea, correo electrónico, en persona durante las entrevistas o por cualquier otro método.","item_2":"En concreto, tratamos datos personales tales como el nombre, la dirección de correo electrónico, la dirección postal, la fecha de nacimiento, las titulaciones, la experiencia profesional, la información relativa a su historial laboral, así como las habilidades y conocimientos que nos envíe, así como tu video en caso de que realices tu entrevista usando la función Video Entrevista.","item_3":"Si se pone en contacto con nosotros, es posible que conservemos un registro de esa comunicación.","item_4":"Un registro de su progreso en cualquier proceso de contratación que pudiéramos llevar a cabo.","item_5":"Detalles de sus visitas al sitio web de Workable, incluyendo, aunque sin limitación, datos del tráfico, datos de ubicación, blogs y otros datos de comunicación, el sitio que le remitió al sitio web de Workable y los recursos a los que accede.","item_6":"","paragraph_1":"Recopilamos y tratamos todos o algunos de los siguientes tipos de información sobre usted:","paragraph_2":"Workable nos permite vincular los datos que usted nos envía con la información que haya publicado en Internet, como puede ser su perfil de LinkedIn y otras páginas de redes sociales.","paragraph_3":"La tecnología de Workable nos permite buscar en diversas bases de datos (algunas públicas y otras no) que podrían incluir sus datos personales (como su currículum) con el fin de encontrar posibles candidatos para cubrir nuestras ofertas de empleo. Si le encontráramos de esta manera, obtendríamos sus datos personales de dichas fuentes.","paragraph_4":"Podríamos recibir sus datos personales de un tercero que le recomienda como candidato para una vacante concreta o, de manera más general, para alguno de los procesos de contratación de nuestra empresa.","subtitle_1":"Información que recopilamos de usted","subtitle_2":"Información que recopilamos de otras fuentes","title":"Su información personal"},"read":"Leer","store":{"item_1":"borrado de su información personal por su parte (o por otra persona designada por el Cliente); o","item_10":"restringir de otra manera el tratamiento que hacemos de sus datos personales en determinadas circunstancias;","item_11":"reclamar una indemnización por los daños causados debido al quebrantamiento de cualquier legislación en materia de protección de datos por nuestra parte.","item_12":"póngase en contacto con nosotros a través de nuestros datos de contacto, que se indican a continuación;","item_13":"envíenos suficiente información para poder identificarle;","item_14":"envíenos una prueba de identidad y de dirección; e","item_15":"indíquenos la información a la que se refiere su solicitud.","item_2":"recepción por nuestra parte de su solicitud por escrito (o de otra persona designada por el Cliente).","item_3":"el acceso a sus datos personales y a otra información complementaria que este aviso de privacidad ya está diseñado para cubrir;","item_4":"exigirnos corregir cualquier error en su información que nosotros conservamos;","item_5":"exigir el borrado de datos personales relacionados con usted en determinadas situaciones;","item_6":"recibir los datos personales sobre usted que nos haya enviado, en un formato legible mecánicamente, de uso común y estructurado, y tener el derecho a transmitir esos datos a un tercero en determinadas situaciones;","item_7":"oponerse en todo momento al tratamiento de datos personales relacionados con usted para fines de marketing directo;","item_8":"oponerse a decisiones tomadas por medios automatizados que causan efectos legales relacionados con usted o que le afecten significativamente de manera similar;","item_9":"oponerse en otras situaciones determinadas al tratamiento continuado que hacemos de sus datos personales;","paragraph_1":"Adoptamos las medidas adecuadas para garantizar que todos los datos personales se conserven de forma segura, como medidas de seguridad para evitar que se pierdan accidentalmente, se utilicen o se acceda a ellos de forma no autorizada. Restringimos el acceso a sus datos personales únicamente a aquellas empresas que tengan la necesidad genuina de conocerlos. Quienes se encarguen de tratar su información lo harán exclusivamente de una manera autorizada y sujeta al deber de confidencialidad.","paragraph_10":"Para obtener más información sobre cada uno de estos derechos, así como las circunstancias en las que se aplican, consulte la <a href=\\"{{url}}\\">guía de la Oficina del Comisario de Información del Reino Unido (ICO, por sus siglas en inglés) en materia de derechos individuales conforme al Reglamento General de Protección de Datos.</a>","paragraph_11":"Si desea ejercer alguno de estos derechos:","paragraph_2":"También instauramos procedimientos para ocuparnos de cualquier sospecha de fallo en la seguridad de los datos. Le notificaremos a usted y a cualquier organismo reglamentario pertinente sobre cualquier sospecha de fallo en la seguridad de los datos siempre que estemos obligados a ello.","paragraph_3":"Lamentablemente, la transmisión de información a través de Internet no resulta completamente segura. Aunque hacemos todo lo posible por proteger sus datos personales, no podemos garantizar la seguridad de la transmisión de sus datos a través de cualquier medio en línea y, por tanto, toda transmisión que haga será por su cuenta y riesgo.","paragraph_4":"Si almacenamos sus datos personales en nuestros sistemas, lo haremos <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"Los datos que recopilamos sobre usted y que tratamos mediante los servicios de Workable podrían transferirse a un destino ubicado fuera del Espacio Económico Europeo (EEE) y almacenarse allí. También podrían tratarse por parte de personal ubicado fuera del EEE que trabaja para nosotros o uno de nuestros proveedores. Dicho personal podría intervenir, entre otros casos, para responder a sus solicitudes, tratar su información de pago y facilitar la prestación de servicios de asistencia. Al enviar sus datos personales, usted acepta este almacenamiento, transferencia o tratamiento de datos.","paragraph_6":"En concreto, sus datos podrían ser accesibles para i) el personal de Workable en EE. UU. o ii) podrían almacenarse por parte del proveedor de servicios de hosting de Workable en servidores ubicados tanto en EE. UU. como en la UE. Estados Unidos no ofrece la misma legislación de protección de datos que el Reino Unido o el EEE. Por tanto, se ha firmado un acuerdo de tratamiento de datos entre Workable Software Limited y las empresas del grupo extranjeras, así como entre Workable Software Limited y cada uno de sus encargados del tratamiento de datos. Estos acuerdos de tratamiento de datos se han diseñado para ayudar a salvaguardar sus derechos de privacidad y ofrecerle recursos en el caso poco probable de un uso indebido de sus datos personales.","paragraph_7":"Si necesita más información, póngase en contacto con nosotros (apartado de \\"Contacto\\"). No transferiremos, por lo demás, sus datos personales fuera del Reino Unido o el EEE, ni a cualquier organización (u organismos subordinados) que se rija por el derecho internacional público o que se estipule mediante cualquier acuerdo suscrito entre dos o más países.","paragraph_8":"Su información personal se eliminará si tiene lugar una de las causas siguientes:","paragraph_9":"Conforme al <a href=\\"{{url}}\\">Reglamento General de Protección de Datos</a>, dispone de numerosos derechos importantes de forma gratuita. En resumen, entre estos derechos, se incluyen:","retention":"Solo conservaremos sus datos mientras evaluemos su perfil para una vacante actual o próxima.","retention_count":"Conservaremos todos sus datos durante <span data-id=\\"placeholder\\">{{count}}</span> mes.","retention_count_plural":"Conservaremos todos sus datos durante <span data-id=\\"placeholder\\">{{count}}</span> meses.","subtitle_1":"Seguridad","subtitle_2":"Dónde almacenamos sus datos personales","subtitle_3":"Durante cuánto tiempo conservamos sus datos personales","subtitle_4":"Sus derechos","title":"Cómo almacenamos sus datos personales"},"updated":"Se ha actualizado este aviso de privacidad.","uses":{"item_1":"Para tener en cuenta su candidatura para un puesto al que usted se ha presentado.","item_2":"Para tener en cuenta su candidatura para otros puestos.","item_3":"Para comunicarnos con usted sobre el proceso de selección.","item_4":"Para completar la información que recibamos de usted con otra que recibamos de proveedores de datos de terceros.","item_5":"Para buscar candidatos idóneos que puedan cubrir nuestras vacantes.","item_6":"Para ayudar a nuestros proveedores de servicios (como Workable y sus proveedores y responsables del tratamiento de datos) y Partners (como los sitios de ofertas de empleo a través de los que usted podría haber presentado su candidatura) a mejorar sus servicios.","paragraph_1":"Nos basamos en el interés legítimo como fundamento jurídico sobre el que recopilamos y usamos sus datos personales. Así pues, nuestro interés legítimo es la selección de personal para nuestra empresa.","paragraph_3":"Utilizamos la información que guardamos sobre usted de las maneras siguientes:","paragraph_4":"Podríamos utilizar la tecnología de Workable para seleccionar candidatos idóneos y considerarlos según los criterios que nosotros mismos hemos identificado de forma expresa o en relación con el puesto que haya solicitado. No obstante, aunque el proceso de búsqueda de candidatos idóneos es automático, toda decisión relativa a quién seleccionamos para cubrir una determinada vacante la toma nuestro personal.","subtitle_1":"Fundamento jurídico del tratamiento","subtitle_2":"Objetivos del tratamiento","subtitle_3":"Elaboración de perfiles/toma de decisiones automatizada","title":"Uso que se hace de su información"}}');

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, n), {}, {
                advanced: t,
                eeoc: i,
                gdpr: s,
                siteEditor: r
            })
        },
        25405: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            var r = a(82144),
                t = a(48706);
            const n = JSON.parse('{"component":{"departments":{"blankslate":{"message":"Il n\'y a aucun service pour le moment.","title":"Aucun service."},"jobs":"{{count}} poste vacant","jobs_plural":"{{count}} postes vacants","no_jobs":"Aucun poste vacant","view":"Afficher les postes"},"header":{"button":"Afficher les postes"},"job":{"posted_few_hours_ago":"il y a quelques heures","workplace":{"hybrid":"Hybride","onsite":"Sur site","remote":"À distance"}},"jobs":{"blankslate":{"nojobsmessage":"Nous proposons des postes vacants de temps à autre, c\'est pourquoi nous vous recommandons de revenir bientôt !","nojobstitle":"Désolés, il n\'y a aucun poste vacant pour le moment","noresultsmessage":"Essayez de supprimer des filtres ou d\'affiner votre recherche.","noresultstitle":"Désolés, aucun poste correspondant à ce critère n\'a été trouvé."}}}}'),
                i = JSON.parse('{"careers":{"account":{"description":{"showless":"Afficher moins","showmore":"Afficher plus","title":"Carrières chez {{account}}"},"website":"Afficher le site Web"},"blankslate":{"noOpenings":{"message":"Nous proposons des postes vacants de temps à autre, c\'est pourquoi nous vous recommandons de revenir bientôt !","title":"Désolés, il n\'y a aucun poste vacant pour le moment"},"noResults":{"message":"Essayez de supprimer des filtres ou d\'affiner votre recherche.","title":"Désolés, aucun poste correspondant à ce critère n\'a été trouvé."}},"emailmyresume":{"button":"Envoyer mon CV par e-mail","description":"Vous n\'arrivez pas à trouver le bon poste ? Envoyez votre CV par e-mail pour que votre candidature à des postes futurs soit prise en compte."},"job":{"apply":"Postuler","dataDeleted":"Vous données personnelles ont bien été supprimées.","notFound":"Ce poste n\'est plus disponible."},"search":{"filters":{"apply":"Appliquer des filtres","autofilterAlert":"Nous avons détecté votre emplacement ({{location}}) et affichons les postes qui y sont proposés. Effacez les filtres pour afficher les postes dans tous les emplacements.","clear":"Effacer les filtres","department":"Service","filter":"Filtrer les postes","filters":"Filtres","location":"Localisation","remote":"À distance uniquement","search":"Rechercher","workplace":"Mode de travail","worktype":"Type de contrat"},"input":"Recherche de postes…","loadmore":"Afficher plus","title":"Postes à pourvoir","total":"{{count}} poste","total_plural":"{{count}} postes"}},"errors":{"action":"Accéder à la page d\'accueil","notFound":{"message":"Il se peut que la page que vous recherchez ait été supprimée, renommée ou soit temporairement indisponible.","title":"Désolés, cette page n\'a pas pu être chargée."},"surveyNotFound":{"title":""},"offline":{"message":"Votre connexion Internet a dû être interrompue. Vérifiez-la et réessayez.","title":"Aucune connexion Internet."},"pageNotFound":{"button":"Trouver le poste de vos rêves","message":"Il semble que nous n\'ayons pas trouvé cette page.","subMessage":"Vous recherchez votre futur poste ? Découvrez des milliers d\'emplois.","title":"Page non trouvée."},"server":{"message":"Il se peut que la page que vous recherchez ait été supprimée, renommée ou soit temporairement indisponible.","title":"Désolés, une erreur s\'est produite. Nous nous efforçons de résoudre le problème."},"unknown":{"message":"Il se peut que la page que vous recherchez ait été supprimée, renommée ou soit temporairement indisponible.","title":"Désolés, une erreur inconnue s\'est produite."}},"footer":{"accessibility":"Accessibilité","ccpa":"Si vous êtes candidat à un poste en Californie, consultez <a href=\\"{{url}}\\" target=\\"_blank\\">de confidentialité</a> pour obtenir davantage de détails.","complianceNotice":"{{account}} recueille et traite les données personnelles conformément aux lois relatives à la protection des données en vigueur.","cookieSettings":"Paramètres des cookies","eeoc":"{{account}} ne pratique aucune discrimination basée sur l\'origine ethnique, le genre, la couleur, la religion, l\'âge, le statut marital, l\'invalidité, le statut d\'ancien combattant, les données génétiques, l\'orientation/identité sexuelle, ou toute autre raison interdite par la loi en matière d\'opportunités de travail et d\'avantages sociaux.","gdpr":"Si vous êtes candidat à un poste européen, consultez <a href=\\"{{url}}\\" target=\\"_blank\\">de confidentialité</a> pour obtenir davantage de détails.","help":"Aide","poweredBy":"Optimisé par","viewAllJobs":"Afficher tous les postes","viewWebsite":"Afficher le site Web"},"i18n":{"picker":"Langue sélectionnée : {{language}}"},"job":{"applicationForm":"Candidature","apply":"Postuler","benefits":"Avantages","description":"Descriptif","overview":"Aperçu","posted":"Publié","remote":"à distance","requirements":"Profil","share":"Partager ce poste","type":{"contract":"Contrat","full":"Temps plein","other":"Autre","part":"Temps partiel","temporary":"Intérimaire"}},"survey":{"error":{"footer":"Rappel : vos réponses sont entièrement anonymes et ne seront pas utilisées durant le processus de recrutement.","message":"Vous avez déjà répondu à cette enquête.","title":"Re-bonjour !"},"expired":{"message":"The survey you’re looking for is no longer available.","title":"Hmmm..."},"participation":"Vous souhaitez aider {{name}} à s\'améliorer ? Répondez à notre enquête facultative :","questions":"Questions","skip":"Ignorer l\'enquête","skipped":{"message":"Vous avez terminé, merci !","title":"Enquête ignorée."},"submit":"Envoyer l\'enquête","success":{"footer":"Elles ne seront pas utilisées durant le processus de recrutement.","message":"Vos réponses sont entièrement anonymes.","title":"Merci d\'avoir répondu à l\'enquête !"}},"today":"aujourd\'hui"}'),
                s = JSON.parse('{"complain":{"paragraph_1":"Nous espérons que nous pourrons résoudre les demandes ou les problèmes que vous avez soulevés à propos de notre utilisation de vos informations.","paragraph_2":"Le <a href=\\"{{url}}\\">Règlement général sur la protection des données</a> vous autorise également à déposer une plainte auprès d\'une autorité de contrôle, notamment dans le pays européen (ou l\'Espace économique européen) dans lequel vous travaillez, vous résidez habituellement ou là où toute autre violation des lois sur la protection des données a pu être commise. L\'autorité de contrôle au Royaume-Uni est le commissaire à l\'information que vous pourrez contacter par mail à l\'adresse suivante : <a href=\\"http://ico.org.uk/concerns/\\">http://ico.org.uk/concerns/</a> ou par téléphone au : <a href=\\"tel:+443031231113\\">+44303-123-1113</a>.","title":"La manière de déposer plainte"},"contact":{"paragraph":"L\'ensemble des questions, commentaires et demandes à l\'égard dudit avis de confidentialité doivent être envoyés à <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>","title":"Contact"},"disclosure":{"paragraph_1":"Comme indiqué ci-dessus, nous transmettons vos informations à nos fournisseurs de services tiers, y compris Workable, qui les utilise uniquement conformément à nos instructions et tel que le stipule la loi.","paragraph_2":"Si vous candidatez à un poste vacant par le biais de la fonctionnalité Indeed Apply, et si vous avez consenti à cette divulgation, nous divulguerons à Indeed certaines données personnelles que nous conservons, y compris, mais sans s\'y limiter, un identifiant unique utilisé par Indeed afin de vous identifier, et les informations sur votre progression au cours de notre processus de recrutement pour le poste vacant pertinent, ainsi que les renseignements tangibles, intangibles, visuels, électroniques, actuels ou futurs que nous détenons à votre sujet, tels que votre nom, vos coordonnées et d\'autres données vous concernant impliquant leur analyse en tant que candidat à un poste (collectivement « Données disponibles »). L\'avis de confidentialité d\'Indeed relatif à son utilisation des données disponibles est accessible sur le site Web d\'Indeed.","paragraph_3":"Si vous candidatez à un poste vacant par le biais d\'un autre fournisseur de services, nous pouvons divulguer des données semblables à celles disponibles définies ci-dessus audit prestataire de services, qui sera le responsable du traitement desdites données, et par conséquent, chargé de respecter l\'ensemble des lois en vigueur en matière d\'utilisation desdites données une fois ces dernières transmises par nos soins.","title":"La divulgation de vos informations"},"mostrecent":"la dernière version","notice":{"outside_eea":{"paragraph_1":"Étant basés à <span data-id=\\"placeholder\\">{{country_code}}</span>, nous avons désigné <span data-id=\\"placeholder\\">{{appointed_representative}}</span> pour être notre représentant au sein de l\'EEE. Ses coordonnées sont les suivantes <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Notre représentant désigné dans l\'Espace économique européen (EEE)"},"paragraph_1":"<span data-id=\\"placeholder\\">{{trading_info}}</span> Nous (« nous », « notre », « nos ») nous engageons à protéger et à respecter votre vie privée. Le présent avis de confidentialité (conjointement avec les autres documents désignés ci-après) définit les fondements selon lesquels les données personnelles recueillies auprès de vous, ou que vous nous fournissez, seront traitées par nous dans le cadre de notre processus de recrutement. Veuillez lire attentivement les éléments suivants pour prendre connaissance de nos visions et pratiques concernant vos données personnelles et la manière dont nous les traitons.","paragraph_2":"Conformément au Règlement général sur la protection des données (« RGPD »), le responsable du traitement des données est <span data-id=\\"placeholder\\">{{company_name}}</span>","paragraph_3":"Nous utilisons Workable, une application en ligne fournie par Workable Software Limited, pour faciliter notre processus de recrutement. Nous utilisons Workable pour traiter les informations personnelles comme un processeur de données pour notre compte. Workable est uniquement autorisé à traiter vos données personnelles selon nos instructions.","paragraph_4":"Si vous candidatez à un poste vacant que nous avons publié, les présentes dispositions de l\'avis de confidentialité s\'appliqueront non seulement à notre traitement de vos informations personnelles, mais également à notre autre avis de confidentialité, qui vous a été fourni séparément ou est disponible sur notre site Web.","paragraph_5":"Si vous candidatez à un poste vacant par le biais de la fonction applicative sur un site d\'emploi ou auprès d\'un prestataire de services en ligne semblable (« Partenaire »), vous remarquerez que le Partenaire en question peut conserver vos données personnelles et recueillir également des informations auprès de nous au titre de l\'avancement de votre candidature. Toute utilisation de vos données par le Partenaire sera conforme à son avis de confidentialité.","title":"Avis de confidentialité en matière de recrutement"},"personal_information":{"item_1":"Les informations que vous fournissez lorsque vous candidatez à un poste. Cela comprend des renseignements fournis par le biais d\'un site d\'emploi en ligne, par e-mail, en personne au cours d\'entretiens et/ou par tout autre moyen.","item_2":"Nous traitons notamment vos données personnelles telles que le nom, l\'adresse e-mail, l\'adresse postale, la date de naissance, les diplômes, l\'expérience, les informations relatives à votre expérience professionnelle, vos compétences et vos formations que vous nous fournissez, ainsi que votre vidéo dans le cas où vous mèneriez votre interview en utilisant la fonction Interview vidéo.","item_3":"Si vous nous contactez, nous pouvons conserver ces échanges.","item_4":"Un enregistrement de votre progression dans le cadre des processus de recrutement que nous pouvons mener.","item_5":"Les détails de vos visites sur le site Web de Workable y compris, mais sans s\'y limiter, les données sur le trafic et l\'emplacement, les blogs et les autres données relatives aux communications, le site qui vous a renvoyé au site Web de Workable et les ressources auxquelles vous avez accès.","item_6":"","paragraph_1":"Nous recueillons et traitons certains des types ou tous les types suivants d\'informations auprès de vous :","paragraph_2":"Workable nous permet d\'associer facilement les données que vous nous fournissez avec d\'autres informations accessibles au public vous concernant que vous avez publiées sur Internet. Il peut s\'agir de sources telles que LinkedIn et d\'autres profils de réseaux sociaux.","paragraph_3":"La technologie de Workable nous permet de rechercher dans plusieurs bases de données, certaines accessibles au public et d\'autres non, qui peuvent inclure vos données personnelles (notamment votre CV), afin de trouver des candidats potentiels pour occuper nos postes vacants. Si nous vous trouvons de cette manière, nous obtiendrons vos informations personnelles à partir de ces sources.","paragraph_4":"Nous pouvons obtenir vos données personnelles auprès d\'un tiers qui vous recommande en tant que candidat à un poste vacant spécifique ou pour participer à notre activité de manière plus large.","subtitle_1":"Les informations que nous recueillons auprès de vous","subtitle_2":"Les informations que nous recueillons auprès d\'autres sources","title":"Vos données personnelles"},"read":"Lire","store":{"item_1":"votre suppression de vos informations personnelles (ou leur suppression par une autre personne embauchée par le client) ; ou","item_10":"de limiter autrement notre traitement de vos données personnelles dans certains cas ;","item_11":"de réclamer des réparations en cas de dommages résultant de notre violation des lois sur la protection des données.","item_12":"nous contacter par le biais de nos coordonnées ci-après ;","item_13":"nous fournir suffisamment d\'informations pour vous identifier ;","item_14":"nous fournir un justificatif de votre identité et de votre domicile ; et","item_15":"nous fournir les informations auxquelles votre demande se rapporte.","item_2":"votre demande écrite reçue par nous (ou la demande d\'une autre personne embauchée par le client).","item_3":"d\'accéder à vos données personnelles et à certaines autres informations supplémentaires que le présent avis de confidentialité a déjà traitées ;","item_4":"de nous demander de rectifier les erreurs dans les informations que nous détenons sur vous ;","item_5":"de demander l\'effacement des données personnelles vous concernant dans certains cas ;","item_6":"de recevoir vos données personnelles que vous nous avez fournies, sous forme de document informatisé, couramment utilisé et structuré, et de transmettre lesdites données à un tiers dans certains cas ;","item_7":"de s\'opposer, à tout moment, au traitement de vos données personnelles à des fins de marketing direct ;","item_8":"de contester les décisions prises par des moyens automatiques produisant des effets juridiques sur vous et vous impactant de manière notable ;","item_9":"de s\'opposer dans certains autres cas à notre traitement permanent de vos données personnelles ;","paragraph_1":"Nous prenons les mesures nécessaires afin de veiller à ce que l\'ensemble des données personnelles demeurent confidentielles, y compris des mesures de sécurité afin d\'éviter que les informations personnelles soient perdues par mégarde, ou utilisées ou accessibles d\'une façon illégale. Nous limitons leur accès aux personnes ayant besoin d\'en connaître la teneur dans le cadre de leur travail. Ceux qui traitent vos informations le font uniquement de manière légale et sont soumis au devoir de confidentialité.","paragraph_10":"Si vous souhaitez davantage d\'informations sur chacun de ces droits, y compris les cas dans lesquels ils s\'appliquent, consultez la <a href=\\"{{url}}\\">directive du Bureau du commissaire à l\'information britannique (ICO) sur les droits des individus, conformément au Règlement général sur la protection des données.</a>","paragraph_11":"Si vous souhaitez exercer l\'un de ces droits, veuillez :","paragraph_2":"Par ailleurs, nous avons mis en place des procédures pour faire face à toute violation présumée en matière de sécurité des données. Si la loi nous y oblige, nous vous en aviserons ainsi que les autorités de réglementation pertinentes.","paragraph_3":"Malheureusement, transmettre des informations via Internet n\'est pas totalement sûr. Bien que nous fassions de notre mieux pour protéger vos données personnelles, nous ne pouvons pas garantir la sécurité de vos données transmises par le biais de tout moyen en ligne. Par conséquent, toute transmission demeure à vos risques et périls.","paragraph_4":"L\'endroit où nous stockons vos données personnelles dans nos systèmes est le suivant <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"Les données que nous recueillons auprès de vous et que nous traitons par le biais des services de Workable peuvent être transférées vers une destination hors de l\'Espace économique européen (« EEE ») et stockées à cet endroit. Par ailleurs, elles peuvent être traitées par des employés opérant hors de l\'EEE et travaillant pour nous ou pour l\'un de nos fournisseurs. Ledit personnel peut être notamment chargé d\'exécuter vos commandes, de traiter les informations relatives à vos paiements et de fournir des services d\'assistance. Par l\'envoi de vos données personnelles, vous acceptez ce transfert, stockage ou traitement.","paragraph_6":"Vos données peuvent être notamment accessibles par i) les employés de Workable aux États-Unis ou ii) un fournisseur de services d\'hébergement de Workable sur des serveurs aux États-Unis ainsi qu\'en Europe. Les États-Unis ne disposent pas des mêmes lois en matière de protection des données que le Royaume-Uni et l\'EEE. Un accord sur le traitement des données a été signé entre Workable Software Limited et les sociétés internationales de son groupe, et entre Workable Software Limited et chacun de ses sous-traitants de données. Lesdits accords sur le traitement des données visent à protéger vos droits à la vie privée et vous offrent des solutions dans le cas improbable d\'une mauvaise utilisation de vos données personnelles.","paragraph_7":"Si vous souhaitez obtenir davantage d\'informations, veuillez nous contacter (voir la rubrique « Contact » ci-dessous). Nous ne transmettrons pas autrement vos données personnelles hors du Royaume-Uni ou de l\'EEE, ou à toute organisation (ou organes subordonnés) régie par le droit public international ou établie en vertu de tout accord entre deux ou plusieurs pays.","paragraph_8":"Vos informations personnelles seront supprimées dans l\'un des cas suivants :","paragraph_9":"En vertu du <a href=\\"{{url}}\\">Règlement général sur la protection des données</a>, vous disposez d\'un certain nombre de droits libres de toute obligation. Pour résumer, ils comprennent les droits :","retention":"Nous conserverons vos données uniquement pendant notre examen de votre candidature à un poste vacant ou futur.","retention_count":"Nous conserverons l\'ensemble des données pendant <span data-id=\\"placeholder\\">{{count}}</span> mois.","retention_count_plural":"Nous conserverons l\'ensemble des données pendant <span data-id=\\"placeholder\\">{{count}}</span> mois.","subtitle_1":"La sécurité","subtitle_2":"L\'endroit où nous stockons vos données personnelles","subtitle_3":"La durée pendant laquelle nous stockons vos données personnelles","subtitle_4":"Vos droits","title":"La façon dont nous stockons vos données personnelles"},"updated":"Le présent avis de confidentialité a été mis à jour.","uses":{"item_1":"Pour prendre en compte votre candidature à un poste auquel vous avez postulé.","item_2":"Pour prendre en compte votre candidature à d\'autres postes.","item_3":"Pour communiquer avec vous concernant le processus de recrutement.","item_4":"Pour enrichir les informations que nous obtenons à votre sujet des renseignements reçus de fournisseurs de données tiers.","item_5":"Pour trouver des candidats adéquats pour occuper nos postes vacants.","item_6":"Pour aider nos fournisseurs de services (tels que Workable et ses sous-traitants et fournisseurs de données) et Partenaires (comme les sites d\'emploi sur lesquels vous avez pu postuler) à améliorer leurs services.","paragraph_1":"Nous nous appuyons sur les intérêts légitimes, qui sont le recrutement du personnel pour notre activité, comme étant les bases juridiques selon lesquelles nous recueillons et utilisons vos données personnelles.","paragraph_3":"Nous utilisons les informations que nous avons conservées à votre sujet comme suit :","paragraph_4":"Nous pouvons utiliser la technologie de Workable afin de sélectionner les candidats adéquats selon les critères que nous avons expressément identifiés, ou types en fonction du poste auquel vous avez postulé. Le processus de recherche de candidats adéquats se fait automatiquement. Toutefois, les décisions pour savoir qui nous embaucherons pour occuper le poste vacant seront prises par notre personnel.","subtitle_1":"Les bases juridiques en matière de traitement","subtitle_2":"Les fins du traitement","subtitle_3":"Création de profils / Prise de décisions automatique","title":"Les utilisations de vos informations"}}');

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, i), {}, {
                advanced: n,
                eeoc: r,
                gdpr: s,
                siteEditor: t
            })
        },
        7286: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => p
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(48996), a(58981), a(74697), a(28028);
            var r = a(48706);
            const t = JSON.parse('{"component":{"departments":{"blankslate":{"message":"Parece que não há nenhum departamento no momento.","title":"Não há nenhum departamento."},"jobs":"{{count}} vaga de emprego","jobs_plural":"{{count}} vagas de emprego","no_jobs":"Sem vagas de emprego","view":"Ver vagas de emprego"},"header":{"button":"Ver vagas de emprego"},"job":{"posted_few_hours_ago":"há algumas horas","workplace":{"hybrid":"Híbrido","onsite":"Presencial","remote":"Remoto"}},"jobs":{"blankslate":{"nojobsmessage":"Retorne em breve, pois disponibilizamos novas vagas periodicamente!","nojobstitle":"Não há vagas de emprego no momento","noresultsmessage":"Tente remover filtros ou refinar sua pesquisa.","noresultstitle":"Não encontramos nenhuma vaga que corresponda a esses critérios."}}}}'),
                n = JSON.parse('{"careers":{"account":{"description":{"showless":"Mostrar menos","showmore":"Mostrar mais","title":"Carreiras na empresa {{account}}"},"website":"Visualizar site"},"blankslate":{"noOpenings":{"message":"Retorne em breve, pois disponibilizamos novas vagas periodicamente!","title":"Não há vagas de emprego no momento"},"noResults":{"message":"Tente remover filtros ou refinar sua pesquisa.","title":"Não encontramos nenhuma vaga que corresponda a esses critérios."}},"emailmyresume":{"button":"Enviar meu currículo por e-mail","description":"Não encontrou o cargo certo? Envie o seu currículo por e-mail para ser considerado para novas vagas no futuro."},"job":{"apply":"Candidatar-se","dataDeleted":"Seus dados pessoais foram excluídos.","notFound":"Esta vaga de emprego não está mais disponível."},"search":{"filters":{"apply":"Aplicar filtros","autofilterAlert":"Detectamos sua localização e estamos exibindo as vagas de emprego desse local ({{location}}). Limpe os filtros para exibir vagas de todos os locais.","clear":"Limpar filtros","department":"Departamento","filter":"Filtrar vagas de emprego","filters":"Filtros","location":"Local","remote":"Somente remoto","search":"Pesquisar","workplace":"Local de trabalho","worktype":"Tipo de emprego"},"input":"Pesquisar vagas de emprego...","loadmore":"Mostrar mais","title":"Vagas de emprego","total":"{{count}} vaga de emprego","total_plural":"{{count}} vagas de emprego"}},"errors":{"action":"ir para a Página Inicial","notFound":{"message":"A página que você está procurando pode ter sido removida, o seu nome pode ter sido alterado ou está temporariamente indisponível.","title":"Infelizmente, não foi possível carregar esta página."},"surveyNotFound":{"title":""},"offline":{"message":"Sua conexão com a internet parece estar com problemas. Verifique a conexão e tente novamente.","title":"Sem conexão com a Internet."},"pageNotFound":{"button":"Encontre o emprego dos seus sonhos","message":"Parece que não conseguimos encontrar esta página.","subMessage":"Procurando o seu próximo cargo? Explore milhares de vagas de emprego.","title":"Página não encontrada."},"server":{"message":"A página que você está procurando pode ter sido removida, o seu nome pode ter sido alterado ou está temporariamente indisponível.","title":"Infelizmente, ocorreu um erro. Estamos trabalhando nisso."},"unknown":{"message":"A página que você está procurando pode ter sido removida, o seu nome pode ter sido alterado ou está temporariamente indisponível.","title":"Infelizmente, ocorreu um erro desconhecido."}},"footer":{"accessibility":"Acessibilidade","ccpa":"Se você é um candidato a vaga da Califórnia, leia o aviso de <a href=\\"{{url}}\\" target=\\"_blank\\">privacidade disponível</a> para obter mais detalhes.","complianceNotice":"A empresa {{account}} coleta e processa dados pessoais de acordo com as leis de proteção de dados aplicáveis.","cookieSettings":"Configurações de cookies","eeoc":"{{account}} não discrimina com base em raça, sexo, cor, religião, idade, nacionalidade, estado civil, deficiência, status de veterano, informações genéticas, orientação sexual, identidade de gênero ou por qualquer outro motivo proibido por lei nas oportunidades de emprego e benefícios.","gdpr":"Se você é um candidato a vaga europeu, leia o aviso de <a href=\\"{{url}}\\" target=\\"_blank\\">privacidade disponível</a> para obter mais detalhes.","help":"Ajuda","poweredBy":"Desenvolvido por","viewAllJobs":"Ver todas as vagas de emprego","viewWebsite":"Visualizar site"},"i18n":{"picker":"O idioma escolhido é {{language}}"},"job":{"applicationForm":"Candidatura","apply":"Candidatar-se para esta vaga","benefits":"Benefícios","description":"Descrição","overview":"Visão geral","posted":"Publicado","remote":"remoto","requirements":"Requisitos","share":"Compartilhar esta vaga","type":{"contract":"Contrato","full":"Período integral","other":"Outro","part":"Meio período","temporary":"Temporário"}},"survey":{"error":{"footer":"Lembramos que suas respostas são totalmente anônimas e não serão usadas no processo de contratação.","message":"Você já respondeu a esta pesquisa.","title":"Olá mais uma vez!"},"expired":{"message":"The survey you’re looking for is no longer available.","title":"Hmmm..."},"participation":"Quer ajudar a empresa {{name}} a melhorar? Responda à nossa pesquisa opcional:","questions":"Perguntas","skip":"Ignorar pesquisa","skipped":{"message":"Tudo pronto. Obrigado!","title":"A pesquisa foi ignorada."},"submit":"Enviar pesquisa","success":{"footer":"Elas não serão usadas no processo de contratação.","message":"Suas respostas são totalmente anônimas.","title":"Obrigado por responder à pesquisa!"}},"today":"hoje"}'),
                i = JSON.parse('{"gender":{"header":"Gênero","options":{"female":"Feminino","male":"Masculino","undisclosed":"Prefiro não responder"}},"opportunityemployer":{"description":"Solicitamos que você preencha os dados pessoais abaixo (o preenchimento não é obrigatório). Essas informações serão usadas apenas para fins estatísticos governamentais, e não como critérios de seleção do processo de contratação.","emailprompt":"Se você não pode responder à pesquisa EEO agora, mas gostaria de fazer isso mais tarde, não se preocupe. Enviaremos um e-mail com um link para a pesquisa em breve.","header":"Ajude-nos a ser uma empresa que oferece oportunidades iguais de trabalho"},"race":{"header":"Raça ou etnia","options":{"americanIndian":{"explanation":"Uma pessoa descendente de qualquer um dos povos originais das Américas do Norte, Central e do Sul e que mantém afiliação tribal ou vínculo com a comunidade.","label":"Índio americano ou nativo do Alasca (não hispânico nem latino)"},"asian":{"explanation":"Uma pessoa descendente de qualquer um dos povos originais do Extremo Oriente, Sudeste Asiático ou Subcontinente Indiano, incluindo, por exemplo, Camboja, China, Coreia, Filipinas, Índia, Japão, Malásia, Paquistão, Tailândia e Vietnã.","label":"Asiático (não hispânico nem latino)"},"black":{"explanation":"Uma pessoa descendente de qualquer um dos grupos raciais negros da África.","label":"Negro ou afro-americano (não hispânico nem latino)"},"hispanicLatino":{"explanation":"Uma pessoa da cultura cubana, mexicana, porto-riquenha, sul-americana ou centro-americana ou de outra cultura ou origem espanhola, independentemente da raça.","label":"Hispânico ou latino"},"multiracial":{"explanation":"Todas as pessoas que se identificam com mais de uma das cinco raças acima.","label":"Duas ou mais raças (que não sejam hispânico nem latino)"},"nativeHawaiian":{"explanation":"Uma pessoa descendente de qualquer um dos povos do Havaí, de Guam, de Samoa ou de outras ilhas do Pacífico.","label":"Nativo do Havaí ou de outras ilhas do Pacífico (não hispânico nem latino)"},"undisclosed":{"label":"Prefiro não responder"},"white":{"explanation":"Uma pessoa descendente de qualquer um dos povos originais da Europa, do Oriente Médio ou do norte da África.","label":"Branco (não hispânico nem latino)"}}},"skip":"Ignorar a pesquisa EEO por enquanto","submitted":{"footer":"As informações que você forneceu serão usadas apenas para monitorar a conformidade com as normas de igualdade de oportunidades, e não como critérios de seleção do processo de contratação.","message":"Você já preencheu o formulário EEO."},"veteran":{"disabledReasons":{"reasons":{"active":"Um \\"veterano de guerra que prestou serviço ativo ou com insígnia de campanha\\" é aquele com serviço ativo militar terrestre, naval ou aéreo dos EUA durante uma guerra ou em uma campanha ou expedição para a qual uma insígnia de campanha foi autorizada de acordo com as leis administradas pelo Departamento de Defesa.","armed":"Um \\"veterano com medalha de serviço das Forças Armadas\\" é aquele que, enquanto estava em serviço ativo militar terrestre, naval ou aéreo dos EUA, participou de uma operação militar dos Estados Unidos pela qual foi condecorado com uma medalha de serviço das Forças Armadas de acordo com a Ordem Executiva 12985.","discharged":"Uma pessoa que foi dispensada ou liberada do serviço ativo por conta de uma deficiência relacionada ao serviço.","separated":"Um \\"veterano recentemente separado\\" é qualquer veterano em um período de três anos contados a partir da data da dispensa ou liberação do veterano do serviço ativo militar terrestre, naval ou aéreo dos EUA.","usMilitary":"Um veterano do serviço militar terrestre, naval ou aéreo dos EUA que tenha direito a uma indenização (ou que, se não recebesse aposentadoria militar, teria direito a uma indenização) de acordo com as leis administradas pela Secretaria de Assuntos dos Veteranos; ou"},"text":"Um \\"veterano com deficiência\\" deve se encaixar em uma das seguintes definições:"},"header":"Status de veterano","p1":"O empregador é um prestador de serviços para o governo que está sujeito à Lei da Assistência ao Reajustamento dos Veteranos da Era do Vietnã (1974), conforme alterada pela Lei de Empregos para Veteranos (2002), 38 U.S.C. 4212 (VEVRAA), que exige que os prestadores de serviços para o governo adotem ações afirmativas para o emprego e progresso profissional de: (1) veteranos com deficiência, (2) veteranos recentemente separados, (3) veteranos de guerra que prestaram serviço ativo ou com insígnia de campanha e (4) veteranos com medalha de serviço das Forças Armadas. Essas classificações são definidas da seguinte maneira:","p2":"Os veteranos protegidos podem ter mais direitos de acordo com a USERRA, a Lei de Direitos de Emprego e Reemprego das Forças Uniformizadas. Especialmente, se o veterano afastou-se do emprego para prestar serviço nas forças uniformizadas, poderá ter o direito de ser readmitido pelo seu empregador no cargo que estaria ocupando, com razoável segurança, se não fosse a ausência devido ao serviço. Para obter mais informações, ligue gratuitamente para o número do Serviço de Treinamento e Emprego para Veteranos (VETS, na sigla em inglês) do Departamento de Trabalho dos EUA: 1-866-4-USA-DOL.","p3":"Se você acha que se enquadra em qualquer uma das categorias de veteranos protegidos listadas acima, indique assinalando a caixa apropriada abaixo. Como prestador de serviços ao governo sujeito à VEVRAA, solicitamos essas informações para avaliarmos a eficácia dos esforços de abordagem e recrutamento positivo que realizamos de acordo com a VEVRAA.","p4":"O envio dessas informações é voluntário, e a sua recusa em fornecê-las não sujeitará você a nenhum tipo de tratamento adverso. As informações fornecidas serão usadas apenas de maneira compatível com a Lei de Assistência ao Reajustamento dos Veteranos da Era do Vietnã (1974), conforme alterada.","p5":"As informações que você enviar serão mantidas em sigilo, com exceção de que (i) os supervisores e gerentes podem ser informados sobre as restrições de trabalho ou tarefas de veteranos deficientes e sobre as adaptações necessárias; (ii) as equipes de primeiros socorros e segurança podem ser informadas, quando e na medida apropriada, sobre alguma condição médica que possa exigir tratamento de emergência; e (iii) funcionários do governo envolvidos na execução das leis administradas pelo Gabinete de Programas Federais de Conformidade de Contratos ou da Lei dos Americanos com Deficiência podem ser informados.","question":{"answers":{"notProtected":"NÃO SOU UM VETERANO PROTEGIDO","protected":"EU ME IDENTIFICO EM UMA OU MAIS DAS CLASSIFICAÇÕES DE VETERANO PROTEGIDO LISTADAS ACIMA","undisclosed":"PREFIRO NÃO IDENTIFICAR A MINHA CONDIÇÃO DE VETERANO PROTEGIDO"},"text":"Marque uma das caixas abaixo:"}},"voluntary":{"header":"Autoidentificação voluntária de pessoas com deficiência","information":{"sentence1":"Formulário CC-305 de autoidentificação voluntária de pessoas com deficiência","sentence2":"Número de controle OMB 1250-0005","sentence3":"Expira em 30/04/2026"},"notice":{"p1":"DECLARAÇÃO DE CUSTOS PÚBLICOS INDIRETOS: De acordo com a Lei de Redução da Burocracia (1995), nenhuma pessoa é obrigada a responder a uma coleta de informações, a menos que essa coleta exiba um número de controle OMB válido. Esta pesquisa deve levar cerca de 5 minutos para ser respondida."},"questions":{"question1":{"answer":{"p1":"Somos um contratante ou subcontratante federal. A lei exige que forneçamos igual oportunidade de emprego para pessoas qualificadas com deficiências. Temos a meta de que pelo menos 7% de nossos trabalhadores sejam pessoas com deficiência. A lei diz que devemos medir nosso progresso em relação a essa meta. Para isso, devemos perguntar aos candidatos e funcionários se eles têm deficiência ou já tiveram uma. As pessoas podem se tornar deficientes, então precisamos fazer essa pergunta pelo menos a cada cinco anos.","p2":"Preencher este formulário é voluntário e esperamos que você escolha fazê-lo. Sua resposta é confidencial. Ninguém que tome decisões de contratação a verá. Sua decisão de preencher o formulário e sua resposta não prejudicará você de forma alguma. Se você quiser saber mais sobre a lei ou este formulário, visite o site do Escritório de Programas de Conformidade de Contratos Federais do Departamento de Trabalho dos EUA (OFCCP, na sigla em inglês) em: <a href=\\"{{url}}\\" target=\\"blank\\" rel=\\"noreferrer\\">www.dol.gov/ofccp</a>."},"question":"Por que pedimos para você preencher este formulário?"},"question2":{"answer":{"disabilities":{"options1":"<li>Autismo</li><li>Doença autoimune (por exemplo, lúpus, fibromialgia, artrite reumatoide ou HIV/AIDS</li><li>Cegueira ou visão subnormal </li><li>Câncer</li><li>Doença cardiovascular ou cardíaca</li><li>Doença celíaca</li><li>Paralisia cerebral</li><li>Surdez parcial ou total</li>","options2":"<li>Depressão ou ansiedade</li><li>Diabetes</li><li>Epilepsia</li><li>Transtornos gastrointestinais (por exemplo, doença de Chron ou síndrome do cólon irritável)</li><li>Deficiência intelectual</li><li>Membros amputados ou parcialmente amputados</li><li>Distúrbios relacionados ao sistema nervoso (por exemplo, enxaqueca, doença de Parkinson ou esclerose múltipla)</li><li>Distúrbio psiquiátrico (por exemplo, transtorno bipolar, esquizofrenia, transtorno de estresse pós-traumático ou transtorno depressivo maior)</li>","options3":"<li>Condição do sistema nervoso, por exemplo, enxaquecas, doença de Parkinson, esclerose múltipla (EM)</li><li>Neurodivergência, por exemplo, transtorno do déficit de atenção / hiperatividade (TDAH), transtorno do espectro autista, dislexia, dispraxia, outras deficiências de aprendizagem</li><li>Paralisia parcial ou completa (qualquer causa)</li><li>Condições pulmonares ou respiratórias, por exemplo, tuberculose, asma, enfisema</li><li>Estatura baixa (nanismo)</li><li>Lesão cerebral traumática</li>","text":"As deficiências incluem, entre outras:"},"p1":"Considera-se portadora de deficiência uma pessoa que tenha algum tipo de deficiência física ou mental ou uma condição médica que limite substancialmente uma atividade importante da vida, ou que tenha um histórico ou registro dessa deficiência ou condição médica."},"question":"Como faço para saber se sou portador de alguma deficiência?"},"question3":{"options":{"no":"Não, eu não tenho deficiência e nunca tive deficiência no passado.","undisclosed":"Eu não quero responder.","yes":"Sim, eu tenho uma deficiência ou já tive uma no passado."},"question":"Marque uma das caixas abaixo:"}}}}'),
                s = JSON.parse('{"complain":{"paragraph_1":"Esperamos que possamos esclarecer qualquer dúvida ou preocupação que você tenha sobre o Nosso uso de suas informações.","paragraph_2":"O <a href=\\"{{url}}\\">Regulamento Geral sobre a Proteção de Dados</a> também lhe dá o direito de apresentar uma reclamação para uma autoridade supervisora, em particular em um membro da União Europeia (ou do Espaço Econômico Europeu) em que você trabalhe, resida normalmente ou onde tenha ocorrido uma suposta violação das leis de proteção de dados. A autoridade supervisora do Reino Unido é o Comissário de Informação, que pode ser contatado em <a href=\\"http://ico.org.uk/concerns/\\">http://ico.org.uk/concerns/</a> ou pelo telefone <a href=\\"tel:+443031231113\\">+44303-123-1113</a>.","title":"Como enviar reclamações"},"contact":{"paragraph":"Todos os comentários, dúvidas e solicitações relacionados a este Aviso de privacidade devem ser enviados a <a href=\\"mailto:{{privacy_contact_email}}\\" data-id=\\"placeholder\\">{{privacy_contact_email}}</a>","title":"Contato"},"disclosure":{"paragraph_1":"Conforme estabelecido acima, Nós repassamos as suas informações para Nossos provedores de serviços terceirizados, incluindo o Workable, que as utilizam apenas de acordo com as Nossas instruções e conforme exigido por lei.","paragraph_2":"Nos casos em que você se candidatar a uma vaga de emprego por meio da ferramenta Indeed Apply e consentir com essa divulgação, divulgaremos à Indeed determinados dados pessoais que armazenamos, incluindo, entre outros, um identificador exclusivo usado pela Indeed para identificar você e informações sobre o seu progresso no Nosso processo de contratação para a vaga aplicável, bem como informações tangíveis, intangíveis, visuais, eletrônicas, presentes ou futuras que mantemos sobre você, como seu nome, detalhes de contato e outras informações que envolvam análise de dados relacionados a você como um candidato a uma vaga de emprego (coletivamente, \\"Dados de Disposição\\"). O Aviso de privacidade da Indeed em relação ao uso dos Dados de Disposição da Indeed está disponível no site da Indeed.","paragraph_3":"Nos casos em que você se candidatar a uma vaga de emprego por meio de outro provedor de serviços, poderemos divulgar dados semelhantes aos Dados de Disposição definidos acima para esse provedor de serviços. O provedor de serviços será o controlador desses dados e, portanto, será responsável pelo cumprimento de todas as leis aplicáveis em relação ao uso desses dados após a Nossa transferência.","title":"Divulgação de suas informações"},"mostrecent":"a versão mais recente","notice":{"outside_eea":{"paragraph_1":"Como o país em que estamos sediados (<span data-id=\\"placeholder\\">{{country_code}}</span>) não faz parte do Espaço Econômico Europeu, designamos <span data-id=\\"placeholder\\">{{appointed_representative}}</span> para ser nosso representante no EEE. Os detalhes de contato são <span data-id=\\"placeholder\\">{{representative_contact_info}}</span>.","title":"Nosso Representante Designado no Espaço Econômico Europeu (EEE)"},"paragraph_1":"<span data-id=\\"placeholder\\">{{trading_info}}</span> (\\"Nós\\", \\"Nos\\", \\"Nosso(a)(s)/\\") estamos comprometidos em proteger e respeitar a sua privacidade. Este Aviso de privacidade (juntamente com outros documentos mencionados aqui) estabelece a base na qual os dados pessoais coletados sobre você, ou que você Nos fornece, serão processados por Nós em conexão com Nossos processos de recrutamento. Leia o texto a seguir com atenção para entender Nossas visões e práticas com relação aos seus dados pessoais e como Nós iremos tratá-los.","paragraph_2":"Para os fins do Regulamento Geral sobre a Proteção de Dados (\\"RGPD\\"), o Controlador de Dados é a empresa <span data-id=\\"placeholder\\">{{company_name}}</span>.","paragraph_3":"Usamos o Workable, um aplicativo on-line oferecido pela Workable Software Limited, para ajudar no Nosso processo de recrutamento. Utilizamos o Workable para processar informações pessoais como um processador de dados em Nosso nome. O Workable só tem direito de processar seus dados pessoais de acordo com as Nossas instruções.","paragraph_4":"Quando você se candidatar a uma vaga de emprego publicada por Nós, estas disposições do Aviso de privacidade se aplicarão ao Nosso processamento de suas informações pessoais, além do Nosso outro Aviso de privacidade que lhe foi fornecido separadamente ou está disponível em Nosso site.","paragraph_5":"Quando você se candidatar a uma vaga por meio de um formulário de candidatura em um site de empregos ou em um provedor de serviços on-line semelhante (\\"Parceiro\\"), observe que o Parceiro em questão poderá reter seus dados pessoais e também coletar Nossos dados relacionados ao progresso da sua candidatura. Qualquer uso dos seus dados pelo Parceiro ocorrerá de acordo com o Aviso de privacidade do Parceiro.","title":"Aviso de privacidade para recrutamento"},"personal_information":{"item_1":"Informações que você fornece ao se candidatar a um cargo. Isso inclui informações fornecidas por meio de um site de empregos on-line, por e-mail, pessoalmente em entrevistas e/ou por qualquer outro método.","item_2":"Em particular, processamos dados pessoais como nome, endereço de e-mail, endereço, data de nascimento, qualificações, experiência, informações relacionadas ao seu histórico profissional, habilidades e experiência fornecidos a Nós por você, assim como seu vídeo, caso conduza sua entrevista utilizando o recurso Entrevista por Vídeo.","item_3":"Se você entrar em contato conosco, poderemos manter um registro dessa correspondência.","item_4":"Um registro do seu progresso em qualquer processo de contratação que Nós possamos vir a conduzir.","item_5":"Detalhes de suas visitas ao site do Workable, incluindo, entre outros, dados de tráfego, dados de localização, weblogs e outros dados de comunicação, o site que encaminhou você para o site do Workable e os recursos que você acessa.","item_6":"","paragraph_1":"Coletamos e processamos alguns ou todos os seguintes tipos de informações suas:","paragraph_2":"O Workable Nos possibilita vincular os dados que você Nos fornece a outras informações disponíveis publicamente sobre você que você tenha publicado na internet. Isso pode incluir fontes como o perfil no LinkedIn e outros perfis em redes sociais.","paragraph_3":"A tecnologia do Workable nos permite pesquisar em diversos bancos de dados, alguns disponíveis publicamente e outros não, os quais podem incluir seus dados pessoais (incluindo seu currículo), para encontrar possíveis candidatos interessados para preencher Nossas vagas de emprego. Caso você seja encontrado dessa maneira, obteremos seus dados pessoais dessas fontes.","paragraph_4":"Poderemos receber seus dados pessoais de terceiros que recomendarem você como candidato para uma vaga de emprego específica ou para Nossos negócios em geral.","subtitle_1":"Informações que Nós coletamos de você","subtitle_2":"Informações que coletamos de outras fontes","title":"Suas informações pessoais"},"read":"Leia","store":{"item_1":"exclusão de suas informações pessoais por você (ou por outra pessoa relacionada com o Cliente); ou","item_10":"restringir de outra maneira o Nosso processamento de seus dados pessoais em determinadas circunstâncias;","item_11":"reivindicar indenização por danos causados por Nossa violação de qualquer lei de proteção de dados.","item_12":"entre em contato conosco usando os Nossos detalhes de contato abaixo;","item_13":"forneça a Nós informações suficientes para identificá-lo;","item_14":"envie a Nós uma comprovação de sua identidade e seu endereço; e","item_15":"informe a Nós os dados relacionados à sua solicitação.","item_2":"recebimento de uma solicitação por escrito enviada por você (ou outra pessoa relacionada com o Cliente) para nós.","item_3":"acesso aos seus dados pessoais e a outras informações complementares já discriminadas neste Aviso de privacidade;","item_4":"exigir que corrijamos quaisquer erros em informações suas que mantenhamos;","item_5":"exigir a exclusão de dados pessoais relacionados a você em determinadas situações;","item_6":"receber os dados pessoais que você nos forneceu, em um formato estruturado, comumente usado e legível por computadores e ter o direito de transmitir esses dados a terceiros em determinadas situações;","item_7":"opor-se a qualquer momento ao processamento de dados pessoais relacionados a você para fins de marketing direto;","item_8":"opor-se às decisões tomadas por meios automatizados que produzam efeitos legais que digam respeito a você ou que similarmente afetem você de modo significativo;","item_9":"opor-se em determinadas situações ao Nosso processamento contínuo de seus dados pessoais;","paragraph_1":"Nós tomamos as medidas apropriadas para garantir que todos os dados pessoais sejam mantidos em segurança, incluindo medidas de segurança para impedir que dados pessoais sejam acidentalmente perdidos, usados ou acessados de forma não autorizada. Limitamos o acesso aos seus dados pessoais àqueles que têm razões legítimas para acessá-los. Quem processar suas informações o fará apenas de maneira autorizada e estará sujeito a um acordo de confidencialidade.","paragraph_10":"Para obter mais informações sobre cada um desses direitos, incluindo as circunstâncias nas quais eles se aplicam, consulte a <a href=\\"{{url}}\\">Orientação do Gabinete do Comissário de Informação (OIC, na sigla em inglês) do Reino Unido sobre os direitos dos indivíduos de acordo com o Regulamento Geral sobre a Proteção de Dados</a>","paragraph_11":"Se você deseja exercer algum desses direitos, por favor:","paragraph_2":"Também temos procedimentos para lidar com qualquer suspeita de violação da segurança dos dados. Notificaremos você e qualquer regulador aplicável sobre uma suspeita de violação da segurança dos dados quando isso for exigido por lei.","paragraph_3":"Infelizmente, a transmissão de informações pela internet não é completamente segura. Embora façamos o possível para proteger os seus dados pessoais, não podemos garantir a segurança de seus dados transmitidos por qualquer meio on-line; portanto, qualquer transmissão é realizada por sua conta e risco.","paragraph_4":"Armazenamos os seus dados pessoais em Nossos próprios sistemas. Eles são armazenados em <span data-id=\\"placeholder\\">{{internal_data_processing_location}}</span>.","paragraph_5":"Os seus dados que coletamos e processamos usando os serviços do Workable podem ser transferidos e armazenados em um destino fora do Espaço Econômico Europeu (\\"EEE\\"). Os dados também podem ser processados por uma equipe com operações fora do EEE que trabalhe para Nós ou para um dos Nossos fornecedores. Essa equipe pode estar envolvida, entre outras coisas, no atendimento de seus pedidos, no processamento de seus detalhes de pagamento e na prestação de serviços de suporte. Ao enviar seus dados pessoais, você concorda com tal transferência, armazenamento ou processamento.","paragraph_6":"Em particular, seus dados podem i) estar acessíveis para a equipe do Workable nos EUA ou ii) ser armazenados pelo provedor de serviços de hospedagem do Workable em servidores nos EUA e na União Europeia. Os EUA não possuem as mesmas leis de proteção de dados que o Reino Unido e o EEE. Um Contrato de Processador de Dados foi assinado entre a Workable Software Limited e as empresas do grupo no exterior, e entre a Workable Software Limited e cada um de seus processadores de dados. Esses contratos de processador de dados foram criados para ajudar a proteger os seus direitos de privacidade e fornecer soluções no caso improvável de uso indevido de seus dados pessoais.","paragraph_7":"Se precisar de mais informações, entre em contato conosco (veja a seção \\"Contato\\" abaixo). Não transferiremos seus dados pessoais de outra forma para fora do Reino Unido nem do EEE, nem para nenhuma organização (ou órgão subordinado) regida pelo direito internacional público ou que esteja estabelecida sob qualquer contrato entre dois ou mais países. ","paragraph_8":"Suas informações pessoais serão excluídas em alguma das seguintes situações:","paragraph_9":"Nos termos do <a href=\\"{{url}}\\">Regulamento Geral sobre a Proteção de Dados</a>, você possui vários direitos importantes e gratuitos. Em resumo, esses direitos incluem:","retention":"Somente manteremos seus dados enquanto estivermos considerando você para uma vaga aberta ou futura.","retention_count":"Manteremos todos os dados por <span data-id=\\"placeholder\\">{{count}}</span> mês.","retention_count_plural":"Manteremos todos os dados por <span data-id=\\"placeholder\\">{{count}}</span> meses.","subtitle_1":"Segurança","subtitle_2":"Onde armazenamos seus dados pessoais","subtitle_3":"Por quanto tempo mantemos seus dados pessoais","subtitle_4":"Seus direitos","title":"Como armazenamos seus dados pessoais"},"updated":"Este Aviso de Privacidade foi atualizado.","uses":{"item_1":"Para considerar a sua candidatura para uma vaga para a qual você se candidatou.","item_2":"Para considerar sua candidatura em relação a outras vagas.","item_3":"Para Nos comunicarmos com você em relação ao processo de recrutamento.","item_4":"Para enriquecer qualquer informação que recebamos de você com informações obtidas de fornecedores de dados terceirizados.","item_5":"Para encontrar candidatos interessados adequados para preencher Nossas vagas de emprego.","item_6":"Para ajudar Nossos provedores de serviços (como o Workable e seus processadores e fornecedores de dados) e Parceiros (como os sites de empregos nos quais você tenha se candidatado) a melhorar seus serviços.","paragraph_1":"Contamos com o interesse legítimo como base jurídica pela qual coletamos e usamos os seus dados pessoais. Nossos interesses legítimos consistem no recrutamento de funcionários para os Nossos negócios.","paragraph_3":"Usamos as informações armazenadas sobre você das seguintes maneiras:","paragraph_4":"Podemos usar a tecnologia do Workable para selecionar candidatos apropriados a serem considerados com base em critérios expressamente identificados por Nós ou típicos do cargo para o qual você se candidatou. O processo de busca de candidatos adequados é automatizado; no entanto, qualquer decisão sobre quem abordaremos para preencher a vaga será tomada por Nossa equipe.","subtitle_1":"Base jurídica para o processamento","subtitle_2":"Finalidades do processamento","subtitle_3":"Tomada de decisões/criação de perfil automatizadas","title":"Como suas informações são usadas"}}');

            function l(e) {
                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l(e)
            }

            function d(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function u(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var a = null != arguments[o] ? arguments[o] : {};
                    o % 2 ? d(Object(a), !0).forEach((function(o) {
                        c(e, o, a[o])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach((function(o) {
                        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                    }))
                }
                return e
            }

            function c(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != l(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != l(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == l(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const p = u(u({}, n), {}, {
                advanced: t,
                eeoc: i,
                gdpr: s,
                siteEditor: r
            })
        },
        13503: (e, o, a) => {
            "use strict";
            a.d(o, {
                A: () => y
            }), a(93832), a(81984), a(56030), a(52979), a(76158), a(1233), a(60896), a(85927), a(83283), a(46187), a(94773), a(33951), a(18544), a(52209), a(48996), a(29882), a(86342), a(58981), a(61347), a(28028);
            var r = a(34554),
                t = a(70851),
                n = a(19548),
                i = a.n(n),
                s = a(99860),
                l = a(63631),
                d = a(62312),
                u = a(7597),
                c = a(27365),
                p = a(95531);
            a(85218);
            const m = Object.freeze({
                de: {
                    desktop: "Deutsch",
                    mobile: "DE"
                },
                el: {
                    desktop: "Ελληνικά",
                    mobile: "ΕΛ"
                },
                en: {
                    desktop: "English",
                    mobile: "EN"
                },
                es: {
                    desktop: "Español",
                    mobile: "ES"
                },
                fr: {
                    desktop: "Français",
                    mobile: "FR"
                },
                pt: {
                    desktop: "Português",
                    mobile: "PT"
                }
            });

            function h(e) {
                return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, h(e)
            }
            var f = ["allLanguages"];

            function g() {
                return g = Object.assign ? Object.assign.bind() : function(e) {
                    for (var o = 1; o < arguments.length; o++) {
                        var a = arguments[o];
                        for (var r in a)({}).hasOwnProperty.call(a, r) && (e[r] = a[r])
                    }
                    return e
                }, g.apply(null, arguments)
            }
            var b = function(e) {
                    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "desktop";
                    if (e) {
                        var a = Object.keys(m).find((function(o) {
                            return e.includes(o)
                        }));
                        return m && a && m[a] && m[a][o] || null
                    }
                },
                v = function(e) {
                    var o, a = e.as,
                        n = void 0 === a ? s.A : a,
                        d = e.className,
                        c = e.defaultLanguage,
                        m = e.disabled,
                        f = e.languages,
                        g = ((0, r.useContext)(p.A) || {}).locale,
                        v = (o = g, f && f.find((function(e) {
                            return o && o.includes(e)
                        })) ? g : c),
                        y = f.map((function(e, o) {
                            var a, n, i, l = v && v.includes && v.includes(e);
                            return r.createElement(s.A, {
                                key: o,
                                onClick: function() {
                                    return window.location.search = (0, u.AU)(e)
                                },
                                selected: l
                            }, r.createElement("div", {
                                className: (0, t.A)("styles--2TfKY", (a = {}, n = "styles--2GYDF", i = l, (n = function(e) {
                                    var o = function(e, o) {
                                        if ("object" != h(e) || !e) return e;
                                        var a = e[Symbol.toPrimitive];
                                        if (void 0 !== a) {
                                            var r = a.call(e, "string");
                                            if ("object" != h(r)) return r;
                                            throw new TypeError("@@toPrimitive must return a primitive value.")
                                        }
                                        return String(e)
                                    }(e);
                                    return "symbol" == h(o) ? o : o + ""
                                }(n)) in a ? Object.defineProperty(a, n, {
                                    value: i,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : a[n] = i, a)),
                                "data-ui": e
                            }, r.createElement("div", {
                                className: "styles--3plgY"
                            }, b(e))))
                        })),
                        w = b(v || "en"),
                        S = b(v || "en", "mobile");
                    return r.createElement("div", {
                        className: (0, t.A)(i()(["styles--2VeYI", d]))
                    }, r.createElement(l.Ay, {
                        "aria-label": u.Ay.t("i18n.picker", {
                            language: w
                        }),
                        as: n,
                        disabled: m,
                        right: !0,
                        type: "button"
                    }, r.createElement("span", {
                        className: "styles--1vKes",
                        "data-ui": "language-picker"
                    }, r.createElement("span", {
                        className: "styles--2F9JO"
                    }, w), r.createElement("span", {
                        className: "styles--3Ysm_"
                    }, S)), y))
                };
            const y = function(e) {
                var o = e.allLanguages,
                    a = function(e, o) {
                        if (null == e) return {};
                        var a, r, t = function(e, o) {
                            if (null == e) return {};
                            var a = {};
                            for (var r in e)
                                if ({}.hasOwnProperty.call(e, r)) {
                                    if (o.includes(r)) continue;
                                    a[r] = e[r]
                                }
                            return a
                        }(e, o);
                        if (Object.getOwnPropertySymbols) {
                            var n = Object.getOwnPropertySymbols(e);
                            for (r = 0; r < n.length; r++) a = n[r], o.includes(a) || {}.propertyIsEnumerable.call(e, a) && (t[a] = e[a])
                        }
                        return t
                    }(e, f),
                    t = ((0, r.useContext)(c.A) || {}).accountDetails,
                    n = (void 0 === t ? {} : t).languages,
                    i = void 0 === n ? {} : n,
                    s = i.default,
                    l = i.options;
                if (!l) return null;
                var u = o ? l.map((function(e) {
                    return e.name
                })) : function(e) {
                    return "string" == typeof e.find((function() {
                        return !0
                    })) ? e : e.filter((function(e) {
                        return !!e.visible
                    })).map((function(e) {
                        return e.name
                    }))
                }(l);
                if (u.length < 2) return null;
                var p = (0, d.A)({
                    defaultLanguage: s,
                    languages: u.map((function(e) {
                        return {
                            displayedName: b(e),
                            name: e
                        }
                    }))
                }).map((function(e) {
                    return e.name
                }));
                return r.createElement(v, g({
                    defaultLanguage: s || "en",
                    languages: p
                }, a))
            }
        },
        6032: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Stellenbeschreibung verbergen","show":"Stellenbeschreibung anzeigen"},"preventUser":"Sie haben Ihr Bewerbungsformular noch nicht übermittelt. Sind Sie sicher, dass Sie diese Seite verlassen möchten?"},"hints":{"required":"Pflichtfelder"},"sections":{"personal":"Persönliche Angaben","profile":"Profil","details":"Details"},"fields":{"education":"Ausbildung","experience":"Erfahrung","lastname":"Nachname","firstname":"Vorname","email":{"title":"E-Mail-Adresse","avatarFetched":"Wir haben Ihrer Bewerbung ein Profilbild hinzugefügt."},"resumeLabel":"Lebenslauf","summary":"Zusammenfassung","address":"Adresse","photo":"Foto","headline":"Betreff","phone":"Telefonnummer","coverLetter":"Anschreiben","optional":"Optional","required":"Dies ist ein Pflichtfeld.","delete":"Löschen","edit":"Bearbeiten","add":"Hinzufügen","update":"Speichern","cancel":"Abbrechen","clear":"Löschen","options":"Optionen für","dates":{"present":"Heute","until":"Bis","period":"Zeitraum","current":"Gegenwärtige"},"select":{"placeholder":"Option auswählen …"},"avatar":{"fetching":"Profilbild für diese E-Mail-Adresse wird abrufen","crop":{"title":"Ihr Foto zuschneiden","area":"Wählen Sie den anzupassenden Bereich aus.","preview":"Vorschau","useAnother":"Ein anderes Foto verwenden","action":"Hochladen"}},"resume":{"error":{"bigFile":"Die Datei ist zu groß.","generalError":"Etwas ist schiefgelaufen. Wir arbeiten daran, bitte versuchen Sie es später erneut."},"helperText":"Maximale Dateigröße {{size}}, akzeptable Dateitypen {{types}}."},"sms":{"text":"Ich bin damit einverstanden, dass das Personalbeschaffungsteam dieses Jobs mich per SMS kontaktiert."},"gdpr":{"text":"Ich habe den Inhalt der <a href=\\"{{url}}\\" target=\\"_blank\\">Datenschutzerklärung</a> gelesen und verstanden und akzeptiere ihn. Außerdem stimme ich der Verarbeitung meiner Daten im Rahmen dieser Bewerbung zu.","error":"Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren."},"endDate":{"error":{"past":"Bitte wählen Sie ein Enddatum, das nach dem Startdatum liegt.","future":"Das Enddatum muss in der Vergangenheit liegen"}},"startDate":{"error":"Das Startdatum darf nicht in der Zukunft liegen."}},"quickApply":{"title":"Automatisches Ausfüllen der Bewerbung","text":"Sparen Sie Zeit, indem Sie Ihren Lebenslauf in einem der folgenden Formate importieren: {{fileTypesString}}.","text_one":"Sparen Sie Zeit, indem Sie Ihren Lebenslauf in einem der folgenden Formate importieren: {{fileTypesString}}.","text_plural":"Sparen Sie Zeit, indem Sie Ihren Lebenslauf in einem der folgenden Formate importieren: {{fileTypesString}}.","text_other":"Sparen Sie Zeit, indem Sie Ihren Lebenslauf in einem der folgenden Formate importieren: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Lebenslauf importieren von","computer":"meinem Computer","device":"meinem Gerät","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Bitte verwenden Sie eine andere Datei.","parseFailure":"Wir konnten diese Datei nicht verwenden. Bitte wählen Sie eine andere Datei oder geben Sie die Daten manuell ein.","success":"Automatisches Ausfüllen abgeschlossen! Bitte prüfen Sie die Informationen, die wir nachfolgend ausgefüllt haben.","offline":"Ihre Internetverbindung scheint ausgefallen zu sein. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.","unknown":"Bitte laden Sie Ihre Seite neu."},"modal":{"title":"Erstellung Ihres Profils …","subtitle":"Informationen werden importiert und Felder automatisch ausgefüllt."}},"accountGdpr":"{{accountName}} collects and processes personal data in accordance with applicable data protection laws. Please review the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","submit":{"button":"Bewerbung übermitteln","survey":"Umfrage übermitteln","error":"Etwas ist schiefgelaufen. Wir arbeiten daran, bitte versuchen Sie es später erneut.","validationError":"Es gibt einige Probleme mit Ihrer Bewerbung. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.","groupUnsavedChanges":"Sie haben nicht gespeicherte Änderungen. Bitte speichern Sie die Änderungen, um fortzufahren."},"submitting":{"button":"Übermitteln …"},"success":{"title":"Vielen Dank!","message":{"formSubmitted":"Ihre Bewerbung wurde erfolgreich übermittelt.","eeocSubmitted":"Ihr EEO-Formular wurde erfolgreich übermittelt."},"footer":{"formSubmitted":"Eine Kopie Ihrer Bewerbung wird für Ihre Unterlagen an {{email}} gesendet.","skipped":"Falls Sie noch nicht an der EEO-Umfrage teilgenommen haben, dies jedoch später nachholen möchten, gibt es eine zweite Chance. Wir senden Ihnen in Kürze eine E-Mail mit dem Link.","eeocSubmitted":"Ihre Angaben werden ausschließlich zur Überwachung der Einhaltung der Chancengleichheit verwendet und stellen keine Auswahlkriterien für den Einstellungsprozess dar."}},"validations":{"required":"Dies ist ein Pflichtfeld.","phone":{"notNumber":"Die Telefonnummer ist ungültig.","tooLong":"Die Telefonnummer ist zu lang.","tooShort":"Die Telefonnummer ist zu kurz.","countryCode":"Die Ländervorwahl ist ungültig.","unknown":"Die Telefonnummer ist ungültig."},"email":{"invalid":"Geben Sie eine gültige E-Mail-Adresse ein."},"number":{"notNumber":"Geben Sie eine gültige Telefonnummer ein.","tooLong":"Diese Telefonnummer darf höchstens {{maxLength}} Zeichen enthalten."},"url":{"invalid":"Geben Sie eine gültige URL ein."}}}}')
        },
        62758: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Απόκρυψη περιγραφής θέσης εργασίας","show":"Προβολή περιγραφής θέσης εργασίας"},"preventUser":"Δεν έχετε υποβάλλει ακόμα το έντυπο της αίτησής σας. Θέλετε σίγουρα να αποχωρήσετε από αυτήν τη σελίδα;"},"hints":{"required":"Υποχρεωτικά πεδία"},"sections":{"personal":"Προσωπικές πληροφορίες","profile":"Προφίλ","details":"Λεπτομέρειες"},"fields":{"education":"Εκπαίδευση","experience":"Εμπειρία","lastname":"Επώνυμο","firstname":"Όνομα","email":{"title":"Email","avatarFetched":"Προσθέσαμε μια φωτογραφία προφίλ στην αίτησή σας"},"resumeLabel":"Βιογραφικό","summary":"Περίληψη","address":"Διεύθυνση","addressTooltip":"Η τοποθεσία σου συμπληρώθηκε αυτόματα. Έλεγξε και ενημέρωσέ την αν χρειάζεται.","photo":"Φωτογραφία","headline":"Επικεφαλίδα","phone":"Τηλέφωνο","coverLetter":"Συνοδευτική επιστολή","optional":"Προαιρετικό","required":"Αυτό είναι υποχρεωτικό πεδίο.","delete":"Διαγραφή","edit":"Επεξεργασία","add":"Προσθήκη","update":"Ενημέρωση","cancel":"Ακύρωση","clear":"Εκκαθάριση","options":"Επιλογές για","dates":{"present":"Τώρα","until":"Μέχρι","period":"Περίοδος","current":"Τώρα"},"select":{"placeholder":"Κάντε μια επιλογή…"},"avatar":{"fetching":"Γίνεται λήψη μιας φωτογραφίας προφίλ για αυτό το email","crop":{"title":"Προσαρμόστε τη φωτογραφία σας","area":"Επιλέξτε την περιοχή που θέλετε να περικόψετε.","preview":"Προεπισκόπηση","useAnother":"Ανέβασε άλλη φωτογραφία","action":"Ανέβασμα"}},"resume":{"error":{"bigFile":"Το αρχείο είναι πολύ μεγάλο","generalError":"Κάτι δεν πήγε καλά. Προσπαθούμε να το διορθώσουμε, δοκιμάστε ξανά αργότερα."},"helperText":"Μέγιστο μέγεθος αρχείου {{size}} - αποδεκτοί τύποι αρχείων {{types}}."},"sms":{"text":"Δέχομαι να επικοινωνήσει μαζί μου η ομάδα προσλήψεων για αυτή τη θέση εργασίας μέσω γραπτού μηνύματος."},"gdpr":{"text":"Έχω διαβάσει, κατανοήσει και αποδέχομαι το περιεχόμενο της <a href=\\"{{url}}\\" target=\\"_blank\\">Ειδοποίησης απορρήτου</a> και συναινώ στην επεξεργασία των δεδομένων μου στο πλαίσιο αυτής της αίτησης.","error":"Αποδεχθείτε την Ειδοποίηση απορρήτου για να συνεχίσετε."},"endDate":{"error":{"past":"Επιλέξτε μια ημερομηνία λήξης που είναι μετά την ημερομηνία έναρξης.","future":"Η ημερομηνία λήξης πρέπει να είναι στο παρελθόν."}},"startDate":{"error":"Η ημερομηνία έναρξης δεν μπορεί να είναι στο μέλλον."}},"quickApply":{"title":"ΑΥΤΟΜΑΤΗ ΣΥΜΠΛΗΡΩΣΗ ΑΙΤΗΣΗΣ","text":"Κερδίστε χρόνο εισάγοντας το βιογραφικό σας σε μία από τις ακόλουθες μορφές αρχείου: {{fileTypesString}}.","text_one":"Κερδίστε χρόνο εισάγοντας το βιογραφικό σας σε μία από τις ακόλουθες μορφές αρχείου: {{fileTypesString}}.","text_plural":"Κερδίστε χρόνο εισάγοντας το βιογραφικό σας σε μία από τις ακόλουθες μορφές αρχείου: {{fileTypesString}}.","text_other":"Κερδίστε χρόνο εισάγοντας το βιογραφικό σας σε μία από τις ακόλουθες μορφές αρχείου: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Εισαγωγή βιογραφικού από","computer":"Τον υπολογιστή μου","device":"Τη συσκευή μου","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Χρησιμοποιήστε διαφορετικό αρχείο.","parseFailure":"Δεν μπορέσαμε να χρησιμοποιήσουμε αυτό το αρχείο. Διαλέξτε άλλο αρχείο ή συμπληρώστε το μόνοι σας.","success":"Η αυτόματη συμπλήρωση ολοκληρώθηκε! Ελέγξτε τις πληροφορίες που έχουμε συμπληρώσει παρακάτω.","offline":"Η σύνδεσή σας στο διαδίκτυο πρέπει να έχει διακοπεί. Ελέγξτε τη σύνδεσή σας στο διαδίκτυο και προσπαθήστε ξανά.","unknown":"Ανανεώστε τη σελίδα σας."},"modal":{"title":"Δημιουργούμε το προφίλ σας…","subtitle":"Εισαγωγή πληροφοριών και αυτόματη συμπλήρωση πεδίων."}},"accountGdpr":"Η εταιρεία {{accountName}} συλλέγει και επεξεργάζεται δεδομένα προσωπικού χαρακτήρα σύμφωνα με τους ισχύοντες νόμους για την προστασία δεδομένων. Μπορείς να ανατρέξεις στη <a href=\\"{{url}}\\" target=\\"_blank\\">δήλωση απορρήτου</a> για περισσότερες λεπτομέρειες.","submit":{"button":"Υποβολή αίτησης","survey":"Υποβολή έρευνας","error":"Κάτι δεν πήγε καλά. Προσπαθούμε να το διορθώσουμε, δοκιμάστε ξανά αργότερα.","validationError":"Υπάρχει κάποιο θέμα με την αίτησή σας. Ελέγξτε τα δεδομένα σας και προσπαθήστε ξανά.","groupUnsavedChanges":"Υπάρχουν μη αποθηκευμένες αλλαγές. Αποθηκεύστε τις για να συνεχίσετε.","turnstileError":"Δεν μπορέσαμε να επεξεργαστούμε την αίτησή σου. Άλλαξε πρόγραμμα περιήγησης και προσπάθησε ξανά."},"submitting":{"button":"Υποβολή…"},"success":{"title":"Ευχαριστούμε!","message":{"formSubmitted":"Η αίτησή σας υποβλήθηκε με επιτυχία.","eeocSubmitted":"Το έντυπό σας ΕΕΟ υποβλήθηκε με επιτυχία."},"footer":{"formSubmitted":"Αντίγραφο της αίτησής σας θα αποσταλεί στη διεύθυνση {{email}} για τα αρχεία σας.","skipped":"Εάν δεν είχατε την ευκαιρία να συμπληρώσετε την έρευνα ΕΕΟ, αλλά θα θέλατε να τη συμπληρώσετε αργότερα, έχετε μια δεύτερη ευκαιρία. Σύντομα θα σας στείλουμε ένα email με τον σύνδεσμο.","eeocSubmitted":"Οι πληροφορίες που δώσατε θα χρησιμοποιηθούν αποκλειστικά για την παρακολούθηση της συμμόρφωσης με τις απαιτήσεις περί ίσων ευκαιριών και όχι ως κριτήρια επιλογής για τη διαδικασία πρόσληψης."}},"validations":{"required":"Αυτό το πεδίο είναι υποχρεωτικό.","phone":{"notNumber":"Ο τηλεφωνικός αριθμός δεν είναι έγκυρος.","tooLong":"Ο τηλεφωνικός αριθμός είναι πολύ μεγάλος.","tooShort":"Ο τηλεφωνικός αριθμός είναι πολύ μικρός.","countryCode":"Ο κωδικός της χώρας δεν είναι έγκυρος.","unknown":"Ο τηλεφωνικός αριθμός δεν είναι έγκυρος."},"email":{"invalid":"Πρέπει να δώσετε έγκυρη διεύθυνση email."},"number":{"notNumber":"Πρέπει να δώσετε έναν έγκυρο αριθμό.","tooLong":"Αυτός ο αριθμός πρέπει να περιλαμβάνει έως {{maxLength}} χαρακτήρες."},"url":{"invalid":"Αυτή η διεύθυνση url θα πρέπει να είναι έγκυρη."}}}}')
        },
        15495: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Hide job description","show":"View job description"},"preventUser":"You have not yet submitted your application form. Are you sure you want to leave this page?"},"hints":{"required":"Required fields"},"sections":{"personal":"Personal information","profile":"Profile","details":"Details"},"fields":{"education":"Education","experience":"Experience","lastname":"Last name","firstname":"First name","email":{"title":"Email","avatarFetched":"We\'ve added a profile picture to your application"},"resumeLabel":"Resume","summary":"Summary","address":"Address","addressTooltip":"Your location is autofilled. Please check and update if needed.","photo":"Photo","headline":"Headline","phone":"Phone","coverLetter":"Cover letter","optional":"Optional","required":"This is a required field.","delete":"Delete","edit":"Edit","add":"Add","update":"Update","cancel":"Cancel","clear":"Clear","options":"Options for","dates":{"present":"Present","until":"Until","period":"Period","current":"Current"},"select":{"placeholder":"Select an option…"},"avatar":{"fetching":"Fetching a profile picture for this email","crop":{"title":"Crop your photo","area":"Select the area to be cropped.","preview":"Preview","useAnother":"Use another photo","action":"Upload"}},"resume":{"error":{"bigFile":"File is too big","generalError":"Something went wrong. We are working on this, please try again later."},"helperText":"Maximum file size {{size}} - acceptable file types {{types}}."},"sms":{"text":"I consent to the hiring team of this job contacting me via text message."},"gdpr":{"text":"I have read, understand and accept the content of the <a href=\\"{{url}}\\" target=\\"_blank\\">Privacy Notice</a> and consent to the processing of my data as part of this application.","error":"Please accept the Privacy Notice to continue."},"endDate":{"error":{"past":"Please choose an end date that is after the start date.","future":"End date must be in the past."}},"startDate":{"error":"Start date must not be in the future."}},"quickApply":{"title":"Autofill application","text":"Save time by importing your resume in one of the following formats: {{fileTypesString}}.","text_one":"Save time by importing your resume in one of the following formats: {{fileTypesString}}.","text_plural":"Save time by importing your resume in one of the following formats: {{fileTypesString}}.","text_other":"Save time by importing your resume in one of the following formats: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Import resume from","computer":"My computer","device":"My device","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Please use a different file.","parseFailure":"We couldn’t use this file. Please choose another one, or fill in manually.","success":"Autofill completed! Please review the information we have filled in below.","offline":"Your internet connection must be down. Check your internet connection and try again.","unknown":"Please refresh your page."},"modal":{"title":"Building your profile…","subtitle":"Importing information and autofilling fields."}},"accountGdpr":"{{accountName}} collects and processes personal data in accordance with applicable data protection laws. Please review the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","submit":{"button":"Submit application","survey":"Submit survey","error":"Something went wrong. We are working on this, please try again later.","validationError":"There are some issues with your application. Please revisit your data and try again.","groupUnsavedChanges":"You have unsaved changes. Please save them, in order to proceed.","turnstileError":"We couldn\'t process your request. Please access the application from a different browser and try again."},"submitting":{"button":"Submitting…"},"success":{"title":"Thank you!","message":{"formSubmitted":"Your application has been submitted successfully.","eeocSubmitted":"Your EEO form has been submitted successfully."},"footer":{"formSubmitted":"Α copy of your application will be sent to {{email}} for your records.","skipped":"If you didn’t get the chance to complete EEO survey, but would like to do it later, you have a second chance. We’ll be sending you an email with the link shortly.","eeocSubmitted":"The information you provided will be solely used to monitor equal opportunity compliance and not as a selection criteria for the hiring process."}},"validations":{"required":"This field is required.","phone":{"notNumber":"The phone number is invalid.","tooLong":"The phone number is too long.","tooShort":"The phone number is too short.","countryCode":"The country code is invalid.","unknown":"The phone number is invalid."},"email":{"invalid":"This must be a valid email."},"number":{"notNumber":"This must be a valid number.","tooLong":"This number must be at most {{maxLength}} characters."},"url":{"invalid":"This must be a valid url."}}}}')
        },
        60787: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Ocultar descripción del puesto","show":"Ver descripción del puesto"},"preventUser":"Aún no ha enviado su candidatura. ¿Seguro que desea salir de esta página?"},"hints":{"required":"Campos obligatorios"},"sections":{"personal":"Información personal","profile":"Perfil","details":"Detalles"},"fields":{"education":"Formación","experience":"Experiencia","lastname":"Apellidos","firstname":"Nombre","email":{"title":"Correo electrónico","avatarFetched":"Hemos añadido una foto de perfil a su candidatura"},"resumeLabel":"Currículum","summary":"Resumen","address":"Dirección","photo":"Fotografía","headline":"Cargo actual","phone":"Teléfono","coverLetter":"Carta de presentación","optional":"Opcional","required":"este es un campo obligatorio.","delete":"Eliminar","edit":"Editar","add":"Añadir","update":"Guardar","cancel":"Cancelar","clear":"Borrar","options":"Opciones para","dates":{"present":"Actualidad","until":"Hasta","period":"Periodo","current":"Actual"},"select":{"placeholder":"Seleccione una opción…"},"avatar":{"fetching":"Buscando una foto de perfil para este correo electrónico","crop":{"title":"Recorte su fotografía","area":"Seleccione el área que desea recortar.","preview":"Vista previa","useAnother":"Utilizar otra fotografía","action":"Cargar"}},"resume":{"error":{"bigFile":"El archivo es demasiado grande","generalError":"Se ha producido un error y estamos trabajando para solucionarlo. Inténtelo de nuevo más tarde."},"helperText":"Tamaño máximo del archivo: {{size}} - Tipos de archivo aceptables: {{types}}"},"sms":{"text":"Consiento que el equipo de contratación de este puesto contacte conmigo por mensaje de texto."},"gdpr":{"text":"He leído el <a href=\\"{{url}}\\" target=\\"_blank\\">aviso de privacidad</a>, lo entiendo, acepto y doy mi consentimiento para que se traten mis datos como parte de esta candidatura.","error":"Acepte el aviso de privacidad para continuar."},"endDate":{"error":{"past":"Elija una fecha de finalización que sea posterior a la fecha de inicio.","future":"La fecha de finalización debe ser una fecha pasada."}},"startDate":{"error":"La fecha de inicio no debe ser una fecha futura."}},"quickApply":{"title":"Rellenar la candidatura automáticamente","text":"Importe su currículum en uno de los siguientes formatos para ahorrar tiempo: {{fileTypesString}}.","text_one":"Importe su currículum en uno de los siguientes formatos para ahorrar tiempo: {{fileTypesString}}.","text_plural":"Importe su currículum en uno de los siguientes formatos para ahorrar tiempo: {{fileTypesString}}.","text_other":"Importe su currículum en uno de los siguientes formatos para ahorrar tiempo: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Importar currículum de","computer":"Mi ordenador","device":"Mi dispositivo","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Utilice un archivo diferente.","parseFailure":"No hemos podido utilizar este archivo. Elija otro o rellene los datos manualmente.","success":"¡La candidatura se ha rellenado automáticamente! Revise la información a continuación.","offline":"Parece que no tiene conexión a Internet. Compruébelo e inténtelo de nuevo.","unknown":"Actualice su página."},"modal":{"title":"Creando su perfil…","subtitle":"Importando información y rellenando los campos automáticamente."}},"accountGdpr":"{{accountName}} collects and processes personal data in accordance with applicable data protection laws. Please review the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","submit":{"button":"Enviar candidatura","survey":"Enviar encuesta","error":"Se ha producido un error y estamos trabajando para solucionarlo. Inténtelo de nuevo más tarde.","validationError":"Su candidatura presenta algunos problemas. Revise sus datos e inténtelo de nuevo.","groupUnsavedChanges":"No ha guardado los cambios. Guárdelos para poder continuar."},"submitting":{"button":"Enviando…"},"success":{"title":"¡Gracias!","message":{"formSubmitted":"Su candidatura se ha enviado correctamente.","eeocSubmitted":"Su formulario de EEO se ha enviado correctamente."},"footer":{"formSubmitted":"Enviaremos una copia de su candidatura a {{email}} para que pueda guardarla.","skipped":"Si no pudo rellenar la encuesta de EEO en su día porque prefería hacerlo en otro momento, tiene otra oportunidad. En breve, le enviaremos un correo electrónico con el enlace.","eeocSubmitted":"La información facilitada se utilizará únicamente para verificar que se cumple la igualdad de oportunidades y no como criterio de selección en el proceso de contratación."}},"validations":{"required":"Este campo es obligatorio.","phone":{"notNumber":"El número de teléfono no es válido.","tooLong":"El número de teléfono es demasiado largo.","tooShort":"El número de teléfono es demasiado corto.","countryCode":"El código de país no es válido.","unknown":"El número de teléfono no es válido."},"email":{"invalid":"Se necesita un correo electrónico válido."},"number":{"notNumber":"Se necesita un número válido.","tooLong":"Este número no puede tener más de {{maxLength}} caracteres"},"url":{"invalid":"Se necesita una URL válida."}}}}')
        },
        68100: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Masquer le descriptif de poste","show":"Afficher le descriptif de poste"},"preventUser":"Vous n\'avez pas encore envoyé votre candidature. Voulez-vous vraiment quitter cette page ?"},"hints":{"required":"Champs obligatoires"},"sections":{"personal":"Données personnelles","profile":"Profil","details":"Détails"},"fields":{"education":"Formation","experience":"Expérience","lastname":"Nom","firstname":"Prénom","email":{"title":"E-mail","avatarFetched":"Nous avons ajouté une photo de profil à votre candidature"},"resumeLabel":"CV","summary":"Résumé","address":"Adresse","photo":"Photo","headline":"Titre","phone":"Téléphone","coverLetter":"Lettre de motivation","optional":"Facultatif","required":"Ce champ est obligatoire.","delete":"Supprimer","edit":"Modifier","add":"Ajouter","update":"Enregistrer","cancel":"Annuler","clear":"Effacer","options":"Options pour","dates":{"present":"Maintenant","until":"Jusqu\'à","period":"Période","current":"Actual"},"select":{"placeholder":"Sélectionnez une option…"},"avatar":{"fetching":"Récupération d\'une photo de profil pour cet e-mail","crop":{"title":"Recadrer votre photo","area":"Sélectionner la zone à recadrer.   ","preview":"Aperçu","useAnother":"Utiliser une autre photo","action":"Importer"}},"resume":{"error":{"bigFile":"Le fichier est trop volumineux","generalError":"Une erreur s\'est produite. Nous nous efforçons de résoudre le problème. Veuillez réessayer ultérieurement."},"helperText":"Taille de fichier maximale {{size}} - types de fichiers acceptés {{types}}."},"sms":{"text":"J\'accepte d\'être contacté par message texte pour ce poste par l\'équipe chargée du recrutement."},"gdpr":{"text":"J\'ai pris connaissance du contenu de l\'<a href=\\"{{url}}\\" target=\\"_blank\\">avis de confidentialité</a> et l\'accepte, et je consens au traitement de mes données dans le cadre de cette candidature.","error":"Veuillez accepter l\'avis de confidentialité pour continuer."},"endDate":{"error":{"past":"Veuillez sélectionner une date de fin postérieure à la date de début.","future":"La date de fin doit être postérieure."}},"startDate":{"error":"La date de début ne doit pas se situer dans le futur."}},"quickApply":{"title":"Remplir la candidature automatiquement","text":"Gagnez du temps en important votre CV dans l\'un des formats suivants: {{fileTypesString}}.","text_one":"Gagnez du temps en important votre CV dans l\'un des formats suivants: {{fileTypesString}}.","text_plural":"Gagnez du temps en important votre CV dans l\'un des formats suivants: {{fileTypesString}}.","text_other":"Gagnez du temps en important votre CV dans l\'un des formats suivants: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Importer le CV à partir de","computer":"Mon ordinateur","device":"Mon appareil","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Veuillez utiliser un autre fichier.","parseFailure":"Nous ne pourrons pas utiliser ce fichier. Veuillez en sélectionner un autre, ou remplissez les rubriques manuellement.","success":"Remplissage automatique terminé ! Veuillez vérifier les informations que nous avons remplies ci-après.","offline":"Votre connexion Internet a dû être interrompue. Vérifiez-la et réessayez.","unknown":"Veuillez actualiser votre page."},"modal":{"title":"Création de votre profil…","subtitle":"Importation des informations et remplissage automatique des champs."}},"accountGdpr":"{{accountName}} collects and processes personal data in accordance with applicable data protection laws. Please review the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","submit":{"button":"Envoyer la candidature","survey":"Envoyer l\'enquête","error":"Une erreur s\'est produite. Nous nous efforçons de résoudre le problème. Veuillez réessayer ultérieurement.","validationError":"Votre candidature comprend des erreurs. Veuillez vérifier à nouveau vos données et réessayer.","groupUnsavedChanges":"Des modifications n\'ont pas été enregistrées. Veuillez les enregistrer pour continuer."},"submitting":{"button":"Envoi en cours…"},"success":{"title":"Merci !","message":{"formSubmitted":"Votre candidature a bien été envoyée.","eeocSubmitted":"Votre formulaire EEO a bien été envoyé."},"footer":{"formSubmitted":"Une copie de votre candidature sera envoyée à {{email}} pour vos archives.","skipped":"Si vous n\'avez pas pu répondre à l\'enquête EEO, mais souhaitez le faire ultérieurement, cela est tout à fait possible. Nous vous enverrons sous peu un e-mail avec le lien.","eeocSubmitted":"Les informations fournies seront uniquement utilisées pour vérifier si vous vous conformez à l\'équité à l\'emploi et ne serviront pas de critère de sélection dans le cadre du processus d\'embauche."}},"validations":{"required":"Ce champ est obligatoire.","phone":{"notNumber":"Le numéro de téléphone n\'est pas valide.","tooLong":"Le numéro de téléphone est trop long.","tooShort":"Le numéro de téléphone est trop court.","countryCode":"Le code du pays n\'est pas valide.","unknown":"Le numéro de téléphone n\'est pas valide."},"email":{"invalid":"Il doit s\'agir d\'une adresse e-mail valide."},"number":{"notNumber":"Il doit s\'agir d\'un numéro valide.","tooLong":"Ce numéro doit comporter au maximum {{maxLength}} caractères."},"url":{"invalid":"L\'URL doit être valide."}}}}')
        },
        37018: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                de: () => r.default,
                el: () => t.default,
                en: () => n.default,
                es: () => i.default,
                fr: () => s.default,
                pt: () => l.default
            });
            var r = a(6032),
                t = a(62758),
                n = a(15495),
                i = a(60787),
                s = a(68100),
                l = a(82344)
        },
        82344: (e, o, a) => {
            "use strict";
            a.r(o), a.d(o, {
                default: () => r
            });
            const r = JSON.parse('{"form":{"job":{"description":{"hide":"Ocultar a descrição da vaga","show":"Ver a descrição da vaga"},"preventUser":"Você ainda não enviou seu formulário de candidatura. Tem certeza de que deseja sair desta página?"},"hints":{"required":"Campos obrigatórios"},"sections":{"personal":"Informações pessoais","profile":"Perfil","details":"Dados"},"fields":{"education":"Formação","experience":"Experiência","lastname":"Sobrenome","firstname":"Nome","email":{"title":"E-mail","avatarFetched":"Adicionamos uma foto de perfil à sua candidatura"},"resumeLabel":"Currículo ","summary":"Resumo","address":"Endereço","photo":"Foto","headline":"Título","phone":"Telefone","coverLetter":"Carta de apresentação","optional":"Opcional","required":"Este é um campo obrigatório.","delete":"Excluir","edit":"Editar","add":"Adicionar","update":"Salvar","cancel":"Cancelar","clear":"Limpar","options":"Options for","dates":{"present":"Atual","until":"Até","period":"Período","current":"Atual"},"select":{"placeholder":"Selecione uma opção…"},"avatar":{"fetching":"Buscando uma foto de perfil para este e-mail","crop":{"title":"Cortar sua foto","area":"Selecione a área a ser cortada.","preview":"Pré-visualização","useAnother":"Usar outra foto","action":"Enviar"}},"resume":{"error":{"bigFile":"O arquivo é muito grande","generalError":"Algo deu errado. Estamos trabalhando para resolver o problema. Tente novamente mais tarde."},"helperText":"Tamanho máximo do arquivo {{size}} - tipos de arquivo aceitos {{types}}."},"sms":{"text":"Aceito receber mensagens de texto da equipe de contratação desta vaga."},"gdpr":{"text":"Li, compreendo e aceito o conteúdo do <a href=\\"{{url}}\\" target=\\"_blank\\">Aviso de privacidade</a> e concordo com o processamento dos meus dados como parte desta candidatura.","error":"Aceite o Aviso de privacidade para continuar."},"endDate":{"error":{"past":"Escolha uma data de término posterior à data de início.","future":"A data de término precisa estar no passado."}},"startDate":{"error":"A data de início não pode estar no futuro."}},"quickApply":{"title":"Preencher automaticamente a candidatura","text":"Importe o seu currículo em um dos seguintes formatos para ganhar tempo: {{fileTypesString}}.","text_one":"Importe o seu currículo em um dos seguintes formatos para ganhar tempo: {{fileTypesString}}.","text_plural":"Importe o seu currículo em um dos seguintes formatos para ganhar tempo: {{fileTypesString}}.","text_other":"Importe o seu currículo em um dos seguintes formatos para ganhar tempo: {{fileTypes, list(type: \'disjunction\')}}.","button":{"text":"Importar currículo de","computer":"Meu computador","device":"Meu dispositivo","dropbox":"Dropbox","googleDrive":"Google Drive"},"alert":{"useDifferentFile":"Use um arquivo diferente.","parseFailure":"Não foi possível usar este arquivo. Escolha outro ou preencha manualmente.","success":"Preenchimento automático concluído! Revise abaixo as informações que preenchemos.","offline":"Sua conexão com a internet parece estar com problemas. Verifique a conexão e tente novamente.","unknown":"Atualize sua página."},"modal":{"title":"Criando seu perfil...","subtitle":"Importando informações e preenchendo os campos automaticamente."}},"accountGdpr":"{{accountName}} collects and processes personal data in accordance with applicable data protection laws. Please review the <a href=\\"{{url}}\\" target=\\"_blank\\">privacy notice</a> for further details.","submit":{"button":"Enviar candidatura","survey":"Enviar pesquisa","error":"Algo deu errado. Estamos trabalhando para resolver o problema. Tente novamente mais tarde.","validationError":"Sua candidatura tem alguns problemas. Confira seus dados e tente novamente.","groupUnsavedChanges":"Algumas alterações não foram salvas. Salve-as para continuar."},"submitting":{"button":"Enviando…"},"success":{"title":"Obrigado!","message":{"formSubmitted":"Sua candidatura foi enviada.","eeocSubmitted":"Seu formulário EEO foi enviado."},"footer":{"formSubmitted":"Uma cópia da sua candidatura será enviada para {{email}}.","skipped":"Se você não concluiu a pesquisa EEO, mas gostaria de fazer isso mais tarde, você tem uma segunda chance. Em breve, enviaremos um e-mail com o link.","eeocSubmitted":"As informações que você forneceu serão usadas apenas para monitorar a conformidade com as normas de igualdade de oportunidades, e não como critérios de seleção do processo de contratação."}},"validations":{"required":"Este campo é obrigatório.","phone":{"notNumber":"O número de telefone não é válido.","tooLong":"O número do telefone é muito longo.","tooShort":"O número do telefone é muito curto.","countryCode":"O código do país não é válido.","unknown":"O número de telefone não é válido."},"email":{"invalid":"Forneça um e-mail válido."},"number":{"notNumber":"Forneça um número válido.","tooLong":"O número precisa ter no máximo {{maxLength}} caracteres."},"url":{"invalid":"Forneça um URL válido."}}}}')
        },
        22780: (e, o, a) => {
            "use strict";
            a.d(o, {
                A: () => t,
                s: () => n
            });
            var r = a(34554);
            const t = (0, r.createContext)();
            var n = function() {
                var e = (0, r.useContext)(t);
                if (void 0 === e) throw new Error("useI18n must be used within a I18nContext");
                return e
            }
        },
        57571: (e, o, a) => {
            "use strict";
            a.d(o, {
                A: () => d
            }), a(93832), a(81984), a(56030), a(1233), a(52979), a(60896), a(85927), a(94773), a(33951), a(1496), a(94119), a(52209), a(86342), a(58981), a(74697), a(28028), a(48996), a(42167);
            var r = a(34554),
                t = a(32833);

            function n(e) {
                return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, n(e)
            }
            var i = ["Node", "children", "className", "style", "data-ui", "data-role"];

            function s(e, o) {
                var a = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    o && (r = r.filter((function(o) {
                        return Object.getOwnPropertyDescriptor(e, o).enumerable
                    }))), a.push.apply(a, r)
                }
                return a
            }

            function l(e, o, a) {
                return (o = function(e) {
                    var o = function(e, o) {
                        if ("object" != n(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, "string");
                            if ("object" != n(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == n(o) ? o : o + ""
                }(o)) in e ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e
            }
            const d = function(e) {
                return function(o) {
                    var a = o.Node,
                        n = void 0 === a ? "span" : a,
                        d = o.children,
                        u = o.className,
                        c = o.style,
                        p = o["data-ui"],
                        m = o["data-role"],
                        h = function(e, o) {
                            if (null == e) return {};
                            var a, r, t = function(e, o) {
                                if (null == e) return {};
                                var a = {};
                                for (var r in e)
                                    if ({}.hasOwnProperty.call(e, r)) {
                                        if (o.includes(r)) continue;
                                        a[r] = e[r]
                                    }
                                return a
                            }(e, o);
                            if (Object.getOwnPropertySymbols) {
                                var n = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < n.length; r++) a = n[r], o.includes(a) || {}.propertyIsEnumerable.call(e, a) && (t[a] = e[a])
                            }
                            return t
                        }(o, i);
                    return r.createElement(n, {
                        "data-ui": p,
                        "data-role": m,
                        className: u,
                        style: c
                    }, (0, t.Ay)(e.t(r.Children.toArray(d)[0], function(e) {
                        for (var o = 1; o < arguments.length; o++) {
                            var a = null != arguments[o] ? arguments[o] : {};
                            o % 2 ? s(Object(a), !0).forEach((function(o) {
                                l(e, o, a[o])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : s(Object(a)).forEach((function(o) {
                                Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(a, o))
                            }))
                        }
                        return e
                    }({}, h))))
                }
            }
        },
        93900: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            o.default = {
                name: "cookie",
                lookup: function(e) {
                    var o = void 0;
                    if (e.lookupCookie && "undefined" != typeof document) {
                        var a = function(e) {
                            for (var o = e + "=", a = document.cookie.split(";"), r = 0; r < a.length; r++) {
                                for (var t = a[r];
                                    " " === t.charAt(0);) t = t.substring(1, t.length);
                                if (0 === t.indexOf(o)) return t.substring(o.length, t.length)
                            }
                            return null
                        }(e.lookupCookie);
                        a && (o = a)
                    }
                    return o
                },
                cacheUserLanguage: function(e, o) {
                    o.lookupCookie && "undefined" != typeof document && function(e, o, a, r) {
                        var t = void 0;
                        if (a) {
                            var n = new Date;
                            n.setTime(n.getTime() + 60 * a * 1e3), t = "; expires=" + n.toGMTString()
                        } else t = "";
                        r = r ? "domain=" + r + ";" : "", document.cookie = e + "=" + o + t + ";" + r + "path=/"
                    }(o.lookupCookie, e, o.cookieMinutes, o.cookieDomain)
                }
            }
        },
        24471: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = {
                name: "htmlTag",
                lookup: function(e) {
                    var o = void 0,
                        a = e.htmlTag || ("undefined" != typeof document ? document.documentElement : null);
                    return a && "function" == typeof a.getAttribute && (o = a.getAttribute("lang")), o
                }
            }
        },
        66162: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var a = void 0;
            try {
                a = "undefined" !== window && null !== window.localStorage;
                var r = "i18next.translate.boo";
                window.localStorage.setItem(r, "foo"), window.localStorage.removeItem(r)
            } catch (e) {
                a = !1
            }
            o.default = {
                name: "localStorage",
                lookup: function(e) {
                    var o = void 0;
                    if (e.lookupLocalStorage && a) {
                        var r = window.localStorage.getItem(e.lookupLocalStorage);
                        r && (o = r)
                    }
                    return o
                },
                cacheUserLanguage: function(e, o) {
                    o.lookupLocalStorage && a && window.localStorage.setItem(o.lookupLocalStorage, e)
                }
            }
        },
        25313: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = {
                name: "navigator",
                lookup: function(e) {
                    var o = [];
                    if ("undefined" != typeof navigator) {
                        if (navigator.languages)
                            for (var a = 0; a < navigator.languages.length; a++) o.push(navigator.languages[a]);
                        navigator.userLanguage && o.push(navigator.userLanguage), navigator.language && o.push(navigator.language)
                    }
                    return o.length > 0 ? o : void 0
                }
            }
        },
        66545: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = {
                name: "path",
                lookup: function(e) {
                    var o = void 0;
                    if ("undefined" != typeof window) {
                        var a = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
                        if (a instanceof Array)
                            if ("number" == typeof e.lookupFromPathIndex) {
                                if ("string" != typeof a[e.lookupFromPathIndex]) return;
                                o = a[e.lookupFromPathIndex].replace("/", "")
                            } else o = a[0].replace("/", "")
                    }
                    return o
                }
            }
        },
        76009: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = {
                name: "querystring",
                lookup: function(e) {
                    var o = void 0;
                    if ("undefined" != typeof window)
                        for (var a = window.location.search.substring(1).split("&"), r = 0; r < a.length; r++) {
                            var t = a[r].indexOf("=");
                            t > 0 && a[r].substring(0, t) === e.lookupQuerystring && (o = a[r].substring(t + 1))
                        }
                    return o
                }
            }
        },
        17298: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = {
                name: "subdomain",
                lookup: function(e) {
                    var o = void 0;
                    if ("undefined" != typeof window) {
                        var a = window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);
                        a instanceof Array && (o = "number" == typeof e.lookupFromSubdomainIndex ? a[e.lookupFromSubdomainIndex].replace("http://", "").replace("https://", "").replace(".", "") : a[0].replace("http://", "").replace("https://", "").replace(".", ""))
                    }
                    return o
                }
            }
        },
        42630: (e, o, a) => {
            "use strict";
            var r = function() {
                    function e(e, o) {
                        for (var a = 0; a < o.length; a++) {
                            var r = o[a];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(o, a, r) {
                        return a && e(o.prototype, a), r && e(o, r), o
                    }
                }(),
                t = function(e) {
                    if (e && e.__esModule) return e;
                    var o = {};
                    if (null != e)
                        for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (o[a] = e[a]);
                    return o.default = e, o
                }(a(32615)),
                n = p(a(93900)),
                i = p(a(76009)),
                s = p(a(66162)),
                l = p(a(25313)),
                d = p(a(24471)),
                u = p(a(66545)),
                c = p(a(17298));

            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var m = function() {
                function e(o) {
                    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    ! function(e, o) {
                        if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.type = "languageDetector", this.detectors = {}, this.init(o, a)
                }
                return r(e, [{
                    key: "init",
                    value: function(e) {
                        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        this.services = e, this.options = t.defaults(o, this.options || {}, {
                            order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
                            lookupQuerystring: "lng",
                            lookupCookie: "i18next",
                            lookupLocalStorage: "i18nextLng",
                            caches: ["localStorage"],
                            excludeCacheFor: ["cimode"]
                        }), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = a, this.addDetector(n.default), this.addDetector(i.default), this.addDetector(s.default), this.addDetector(l.default), this.addDetector(d.default), this.addDetector(u.default), this.addDetector(c.default)
                    }
                }, {
                    key: "addDetector",
                    value: function(e) {
                        this.detectors[e.name] = e
                    }
                }, {
                    key: "detect",
                    value: function(e) {
                        var o = this;
                        e || (e = this.options.order);
                        var a = [];
                        e.forEach((function(e) {
                            if (o.detectors[e]) {
                                var r = o.detectors[e].lookup(o.options);
                                r && "string" == typeof r && (r = [r]), r && (a = a.concat(r))
                            }
                        }));
                        var r = void 0;
                        if (a.forEach((function(e) {
                                if (!r) {
                                    var a = o.services.languageUtils.formatLanguageCode(e);
                                    o.services.languageUtils.isWhitelisted(a) && (r = a)
                                }
                            })), !r) {
                            var t = this.i18nOptions.fallbackLng;
                            "string" == typeof t && (t = [t]), t || (t = []), r = "[object Array]" === Object.prototype.toString.apply(t) ? t[0] : t[0] || t.default && t.default[0]
                        }
                        return r
                    }
                }, {
                    key: "cacheUserLanguage",
                    value: function(e, o) {
                        var a = this;
                        o || (o = this.options.caches), o && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(e) > -1 || o.forEach((function(o) {
                            a.detectors[o] && a.detectors[o].cacheUserLanguage(e, a.options)
                        })))
                    }
                }]), e
            }();
            m.type = "languageDetector", o.A = m
        },
        32615: (e, o) => {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.defaults = function(e) {
                return r.call(t.call(arguments, 1), (function(o) {
                    if (o)
                        for (var a in o) void 0 === e[a] && (e[a] = o[a])
                })), e
            }, o.extend = function(e) {
                return r.call(t.call(arguments, 1), (function(o) {
                    if (o)
                        for (var a in o) e[a] = o[a]
                })), e
            };
            var a = [],
                r = a.forEach,
                t = a.slice
        },
        89130: (e, o, a) => {
            var r = a(42630).A;
            e.exports = r, e.exports.default = r
        },
        82144: e => {
            "use strict";
            e.exports = JSON.parse('{"gender":{"header":"Gender","options":{"female":"Female","male":"Male","undisclosed":"I don\'t wish to answer"}},"opportunityemployer":{"description":"You are requested (but not required) to fill in the personal data below. This information will only be used for government reporting purposes and not as selection criteria for the hiring process.","emailprompt":"If you can\'t complete the EEO survey now, but would like to do it later, don\'t worry; we\'ll be sending you an email with a link to the survey shortly.","header":"Help us be an equal opportunity employer"},"race":{"header":"Race or ethnicity","options":{"americanIndian":{"explanation":"A person having origins in any of the original peoples of North and South America (including Central America), and who maintain tribal affiliation or community attachment.","label":"American Indian or Alaska Native (Not Hispanic or Latino)"},"asian":{"explanation":"A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent, including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam.","label":"Asian (Not Hispanic or Latino)"},"black":{"explanation":"A person having origins in any of the black racial groups of Africa.","label":"Black or African American (Not Hispanic or Latino)"},"hispanicLatino":{"explanation":"A person of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin regardless of race.","label":"Hispanic or Latino"},"multiracial":{"explanation":"All persons who identify with more than one of the above five races.","label":"Two or More Races (Not Hispanic or Latino)"},"nativeHawaiian":{"explanation":"A person having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands.","label":"Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)"},"undisclosed":{"label":"I don\'t wish to answer"},"white":{"explanation":"A person having origins in any of the original peoples of Europe, the Middle East, or North Africa.","label":"White (Not Hispanic or Latino)"}}},"skip":"Skip EEO survey for now","submitted":{"footer":"The information you provided will be solely used to monitor equal opportunity compliance and not as a selection criteria for the hiring process.","message":"You already completed the EEO form."},"veteran":{"disabledReasons":{"reasons":{"active":"An “active duty wartime or campaign badge veteran” means a veteran who served on active duty in the U.S. military, ground, naval or air service during a war, or in a campaign or expedition for which a campaign badge has been authorized under the laws administered by the Department of Defense.","armed":"An “Armed forces service medal veteran” means a veteran who, while serving on active duty in the U.S. military, ground, naval or air service, participated in a United States military operation for which an Armed Forces service medal was awarded pursuant to Executive Order 12985.","discharged":"A person who was discharged or released from active duty because of a service-connected disability.","separated":"A “recently separated veteran” means any veteran during the three-year period beginning on the date of such veteran\'s discharge or release from active duty in the U.S. military, ground, naval, or air service.","usMilitary":"A veteran of the U.S. military, ground, naval or air service who is entitled to compensation (or who but for the receipt of military retired pay would be entitled to compensation) under laws administered by the Secretary of Veterans Affairs; or"},"text":"A “disabled veteran” is one of the following:"},"header":"Veteran status","p1":"This employer is a Government contractor subject to the Vietnam Era Veterans\' Readjustment Assistance Act of 1974, as amended by the Jobs for Veterans Act of 2002, 38 U.S.C. 4212 (VEVRAA), which requires Government contractors to take affirmative action to employ and advance in employment: (1) disabled veterans; (2) recently separated veterans; (3) active duty wartime or campaign badge veterans; and (4) Armed Forces service medal veterans. These classifications are defined as follows:","p2":"Protected veterans may have additional rights under USERRA—the Uniformed Services Employment and Reemployment Rights Act. In particular, if you were absent from employment in order to perform service in the uniformed service, you may be entitled to be reemployed by your employer in the position you would have obtained with reasonable certainty if not for the absence due to service. For more information, call the U.S. Department of Labor\'s Veterans Employment and Training Service (VETS), toll-free, at 1-866-4-USA-DOL.","p3":"If you believe you belong to any of the categories of protected veterans listed above, please indicate by checking the appropriate box below. As a Government contractor subject to VEVRAA, we request this information in order to measure the effectiveness of the outreach and positive recruitment efforts we undertake pursuant to VEVRAA.","p4":"Submission of this information is voluntary and refusal to provide it will not subject you to any adverse treatment. The information provided will be used only in ways that are not inconsistent with the Vietnam Era Veterans\' Readjustment Assistance Act of 1974, as amended.","p5":"The information you submit will be kept confidential, except that (i) supervisors and managers may be informed regarding restrictions on the work or duties of disabled veterans, and regarding necessary accommodations; (ii) first aid and safety personnel may be informed, when and to the extent appropriate, if you have a condition that might require emergency treatment; and (iii) Government officials engaged in enforcing laws administered by the Office of Federal Contract Compliance Programs, or enforcing the Americans with Disabilities Act, may be informed.","question":{"answers":{"notProtected":"I AM NOT A PROTECTED VETERAN","protected":"I IDENTIFY AS ONE OR MORE OF THE CLASSIFICATIONS OF PROTECTED VETERAN LISTED ABOVE","undisclosed":"I CHOOSE NOT TO SELF-IDENTIFY MY PROTECTED VETERAN STATUS"},"text":"Please check one of the boxes below:"}},"voluntary":{"header":"Voluntary Self-Identification of Disability","information":{"sentence1":"Voluntary Self-Identification of Disability Form CC-305","sentence2":"OMB Control Number 1250-0005","sentence3":"Expires 04/30/2026"},"notice":{"p1":"PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act of 1995 no persons are required to respond to a collection of information unless such collection displays a valid OMB control number. This survey should take about 5 minutes to complete."},"questions":{"question1":{"answer":{"p1":"We are a federal contractor or subcontractor. The law requires us to provide equal employment opportunity to qualified people with disabilities. We have a goal of having at least 7% of our workers as people with disabilities. The law says we must measure our progress towards this goal. To do this, we must ask applicants and employees if they have a disability or have ever had one. People can become disabled, so we need to ask this question at least every five years.","p2":"Completing this form is voluntary, and we hope that you will choose to do so. Your answer is confidential. No one who makes hiring decisions will see it. Your decision to complete the form and your answer will not harm you in any way. If you want to learn more about the law or this form, visit the U.S. Department of Labor’s Office of Federal Contract Compliance Programs (OFCCP) website at <a href=\\"{{url}}\\" target=\\"blank\\" rel=\\"noreferrer\\">www.dol.gov/ofccp</a>."},"question":"Why are you being asked to complete this form?"},"question2":{"answer":{"disabilities":{"options1":"<li>Alcohol or other substance use disorder (not currently using drugs illegally)</li><li>Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, HIV/AIDS</li><li>Blind or low vision</li><li>Cancer (past or present)</li><li>Cardiovascular or heart disease</li><li>Celiac disease</li><li>Cerebral palsy</li><li>Deaf or serious difficulty hearing</li><li>Diabetes</li>","options2":"<li>Disfigurement, for example, disfigurement caused by burns, wounds, accidents, or congenital disorders</li><li>Epilepsy or other seizure disorder</li><li>Gastrointestinal disorders, for example, Crohn\'s Disease, irritable bowel syndrome</li><li>Intellectual or developmental disability</li><li>Mental health conditions, for example, depression, bipolar disorder, anxiety disorder, schizophrenia, PTSD</li><li>Missing limbs or partially missing limbs</li><li>Mobility impairment, benefiting from the use of a wheelchair, scooter, walker, leg brace(s) and/or other supports</li>","options3":"<li>Nervous system condition, for example, migraine headaches, Parkinson’s disease, multiple sclerosis (MS)</li><li>Neurodivergence, for example, attention-deficit/hyperactivity disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia, other learning disabilities</li><li>Partial or complete paralysis (any cause)</li><li>Pulmonary or respiratory conditions, for example, tuberculosis, asthma, emphysema</li><li>Short stature (dwarfism)</li><li>Traumatic brain injury</li>","text":"Disabilities include, but are not limited to:"},"p1":"A disability is a condition that substantially limits one or more of your “major life activities”. If you have or have ever had such a condition, you are a person with a disability."},"question":"How do I know I have a disability?"},"question3":{"options":{"no":"No, I do not have a disability and have not had one in the past","undisclosed":"I do not want to answer","yes":"Yes, I have a disability, or have had one in the past"},"question":"Please check one of the boxes below:"}}}}')
        },
        48706: e => {
            "use strict";
            e.exports = JSON.parse('{"alerts":{"firsttimepublishconfirmation":{"cancel":"No, do not publish","confirm":"Yes, I want to publish","header":"Ready to publish?","listItemOne":"This new careers page will replace your current Workable-hosted careers page.","listItemTwo":"All URLs for your current Workable-hosted careers page will be redirected to this new careers page.","note":"<strong>Please note:</strong> Once published, you will not be able to revert to your current careers page, however, you can edit and republish this new page at any time.","title":"What happens when you publish:"},"importLanguageContent":{"accept":"Import {{defaultLanguage}} version","button":"Import content from {{defaultLanguage}} version","content":"Importing the {{defaultLanguage}} version will overwrite any content in the {{selectedLanguage}} version.","decline":"Cancel","flash":"All the content from the draft of the {{defaultLanguage}} careers page was imported to the draft of the {{selectedLanguage}} careers page. Happy translating!","text":"Welcome to the {{selectedLanguage}} version of your careers page. It hasn’t been edited, yet. To make translating a bit easier, you have the option to import the content from your {{defaultLanguage}} version."},"notpublishedyet":{"message":"Welcome to the Advanced Careers Page builder. You can play around and make changes until you make this new careers page perfect! Your current careers page is live at {{url}} and will remain there until you publish this one.","title":"Welcome to your new careers page builder!"},"stylesFirstChange":"Style changes (colors, font, and font size) are global and will be saved for every language version of your careers page."},"component":{"actions":{"delete":"Delete","moveDown":"Move Down","moveLeft":"Move Left","moveRight":"Move Right","moveUp":"Move Up"},"benefit":{"bodyPlaceholder":"Add a short description about this benefit. Maybe describe how it makes your employees’ lives easier, how popular it is, etc.","titlePlaceholder":"Benefit goes here"},"benefits":{"addChild":"Add one more","editIcon":"Edit","iconPicker":{"coloredExplanation":"This style has colors and will not use your brand colors.","icons":"Icons","question":"Want to use a different style for all icons?","tooltips":{"activities":"Recreation activities","bonus":"Performance bonus","car":"Company car","coffee":"Coffee","disability":"Disability insurance","flexibleSchedule":"Flexible work schedule","food":"Food","gym":"Gym membership","healthInsurance":"Health insurance","leaveDays":"Extra leave days","lifeInsurance":"Life insurance","pto":"Paid time off","relocation":"Relocation assistance","retirement":"Retirement benefits accounts","stockOption":"Stock option plan","wellness":"Wellness programs"}},"info":"Add a section to talk about all the benefits and perks that your company offers to all the employees.","name":"Benefits","settings":{"body":"Benefits have a description paragraph","filters":"Benefits look and feel","icon":"Benefits have an icon","iconStyles":"Icon styles","title":"Benefits have a title"},"settingsTitle":"Benefits section","subtitlePlaceholder":"Add a short summary of your benefits here","titlePlaceholder":"Add a heading about your benefits"},"caption":{"bodyPlaceholder":"Use this area to write a caption or add any context to your image.","info":"Add an image with text to highlight anything you’d like - it’s basically the swiss army knife of sections.","name":"Image with text","settings":{"layout":"Layout","left":"Show image on the left and text on the right.","right":"Show image on the right and text on the left."},"settingsTitle":"Image with text section","subtitlePlaceholder":"This is the swiss army knife of sections – use this to describe or highlight anything you’d like.","titlePlaceholder":"Add a heading about your image with text"},"controls":{"delete":"Delete this section","edit":"Edit this {{sectionType}} section","more":"Other options","moveDown":"Move this section down","moveUp":"Move this section up"},"departments":{"info":"Add a section to show off your company’s departments and display the open jobs per department.","name":"Departments","settings":{"all":"Display all departments automatically","button":"Show button to job list","columns":"Columns","counttip":{"level":"only top level departments are shown","level_2":"up to 2nd level departments are shown","level_3":"up to 3rd level departments are shown","level_more":"up to {{count}}th level departments are shown","total":"{{count}} of {{total}}"},"editormodal":{"tip":"Admins created the candidate-facing departments for your account. Use the toggles below to control which ones are visible in the Departments section. This does not affect the Jobs section - all jobs in all departments will still be visible.","title":"Pick and choose departments","tree":{"title":"Departments","toggle":{"off":"This department is hidden and will not be displayed in your public careers page.","on":"This department will be displayed in your public careers page.","text":"Visible"}}},"filters":"Visibility","layout":"Look and feel","select":"Select departments","selected":"Pick and choose departments","style":{"rounded":"Every department is displayed with a round photo, its name and the number of open positions.","square":"Every department is displayed with its name and the number of open positions in a colored rectangle.","title":"Style"},"tip":"Your company’s departments will be added to this section automatically. Any changes to departments will have to be done on the Departments page by an admin of your account.","withOpenJobsOnly":"Show only departments that have open jobs"},"settingsTitle":"Departments section","subtitlePlaceholder":"Add some context to your departments and how you’re structured.","titlePlaceholder":"Add a heading about your departments"},"description":{"bodyPlaceholder":"Use this text section to describe anything. Keep it concise so it’s easy to read.","info":"Describe or highlight anything you’d like with this all-text section.","name":"Paragraph","settings":{"columns":"Columns","layout":"Text Layout","oneColumn":"1 column","twoColumns":"2 columns"},"settingsTitle":"Paragraph section","subtitlePlaceholder":"Add a subheading","titlePlaceholder":"Add a heading for this paragraph"},"gallery":{"addChild":"Add one more","info":"Add a section that will contain images of your people, your offices, your products to give an idea of your culture.","name":"Image Gallery","settingsTitle":"Image Gallery section","subtitlePlaceholder":"Add an introduction to your pictures and why you included them.","titlePlaceholder":"Add a heading about your image gallery"},"header":{"name":"Header","settingsTitle":"Header section","subtitlePlaceholder":"Add a bit about your company here. What are you all about? Explain what you do, how you do it, and why you do it.","titlePlaceholder":"Add a heading for your careers page"},"jobs":{"name":"Jobs","settings":{"emailmyresume":"Talent pool","filters":"Job search and filtering","job":"Job entries","showemailmyresume":"Show Talent pool","showfilters":{"label":"Show job search","tip":"The search bar will only appear when you have more than 5 jobs posted."},"showpostedon":"Show date of job posting","tip":"Your open jobs will be added to this section automatically. Any changes of the jobs will have to be done in the job editor by an admin of your account."},"settingsTitle":"Jobs section","subtitlePlaceholder":"Add some context about what’s available or how to send in their resume (at the bottom of this section) if current jobs aren’t a fit.","talentPoolPlaceholder":"Invite candidates to email their resume if current jobs aren’t a fit.","titlePlaceholder":"Add a heading about your job openings"},"maps":{"addressPlaceholder":"Type an address or place name to find in Google Maps","info":"Add a section to talk about all the benefits and perks that your company offers to all the employees.","labelPlaceholder":"Add a location","name":"Locations","settingsTitle":"Locations section","subtitlePlaceholder":"Add some information about your office locations and why you’re in those locations.","titlePlaceholder":"Add a heading about your locations"},"ruler":{"another":"Choose another image","inform":"Images are auto-compressed for the best viewing experience for your site.","preview":"Preview","save":"Save changes","selectArea":"Select the area to be cropped","title":"Crop your image"},"settings":{"background":{"color":"Background Color","descriptionText":"Your background image will scale based on the amount of content in your section and the user’s device. For this reason, a landscape image with a width of at least 1920 pixels is recommended.","descriptionTitle":"Background Image","image":"Image","position":{"bottomCenter":{"description":"When the image is scaled, the focus will be on the bottom-center of your image.","title":"bottom-center"},"bottomLeft":{"description":"When the image is scaled, the focus will be on the bottom-left of your image.","title":"bottom-left"},"bottomRight":{"description":"When the image is scaled, the focus will be on the bottom-right of your image.","title":"bottom-right"},"centerCenter":{"description":"Center : When the image is scaled, the focus will be on the center of your image.","title":"center"},"centerLeft":{"description":"When the image is scaled, the focus will be on the center-left of your image.","title":"center-left"},"centerRight":{"description":"When the image is scaled, the focus will be on the center-right of your image.","title":"center-right"},"label":"Image position","tip":{"action":"View our Frequently Asked Questions","message":"To see how your image scales on different devices, use the Save & preview option in the navigation bar."},"topCenter":{"description":"When the image is scaled, the focus will be on the top-center of your image.","title":"top-center"},"topLeft":{"description":"When the image is scaled, the focus will be on the top-left of your image.","title":"top-left"},"topRight":{"description":"When the image is scaled, the focus will be on the top-right of your image.","title":"top-right"}},"sizeError":"File is too big.","title":"Background","tooltip":{"color":"Use a solid color as the background of this section","image":"Use an image as the background of this section"},"unsupported":"Unsupported file type"},"content":"Content","defaultSubtitle":"Add section description","defaultTitle":"Add section title","header":{"button":"Show button to open jobs list","layout":{"title":"Header layout","tooltip":{"center":"Align the content in the center.","left":"Align the content to the left."}}},"logo":{"label":"Logo","slider":{"description":"Use the slider to choose your logo size.","largest":"Large","smallest":"Small","title":"Logo size","tooltip":"Smallest display height: {{small}}px\\nLargest display height: {{large}}px"},"toggle":"Show company logo","tooltip":"Maximum file size {{size}} - acceptable file types {{types}}.","unsupported":"Unsupported file type"},"style":"Style","subtitleToggle":"Section description","testimonials":"Testimonials","titleToggle":"Section heading","video":"Video"},"social":{"add":"Add Social Media URL","hint":"Add the URL address for each social medium or leave blank if you don’t want to show one.","info":"Add a section with links to your most popular social media for people to follow and find out more","name":"Social Media","settingsTitle":"Social Media section","subtitlePlaceholder":"Add information about what you post, and why they should follow.","titlePlaceholder":"Add a heading about your social media","urlPlaceholder":"Paste your https://{{type}}.com/ link here","urlSettingsTitle":"Social Media URLs"},"stats":{"countPlaceholder":"Add a number","info":"Add a section about your eye-catching numbers or statistics.","labelPlaceholder":"Add the units or additional info","name":"Numbers","settings":{"columns":"Columns","fourColumns":"4 columns","layout":"Look and feel","threeColumns":"3 columns"},"settingsTitle":"Numbers section","subtitlePlaceholder":"Add some context about your eye-catching numbers or statistics.","titlePlaceholder":"Add a heading about your numbers"},"testimonial":{"bodyPlaceholder":"This is where you put your testimonial. Include a picture with their bright smile. Remember, it’s good to have variation between departments, locations, and seniority.","byPlaceholder":"Name - Job"},"testimonials":{"info":"Add a section with words and pictures of your current employees to promote why one should work there.","name":"Testimonials","settingsTitle":"Testimonials section","subtitlePlaceholder":"Add some context for your testimonials. “Hear from our employees” or something similar.","titlePlaceholder":"Add a heading about your testimonials"},"video":{"add":"Add video URL","edit":"Edit video URL","help":"You can add URLs from YouTube or Vimeo.","info":"Add a section that will contain a video to show off your culture, your offices, your people","name":"Video","settingsTitle":"Video section","subtitlePlaceholder":"Add more information about the video and what it showcases.","titlePlaceholder":"Add a heading about your video","url":"Video URL","videoTitle":"Video section"}},"customErrors":{"header":{"backgroundImage":{"missing":"Header (Background image)"}}},"edit":{"defaultLanguage":"Default language","edit":"Edit","errors":{"403":"Hm, it appears you no longer have access. Please refresh the page or contact your administrator","409":"Hm, it appears someone else has published a newer version. Please refresh the page.","412":"Hm, it appears someone else just saved. Please refresh the page.","500":"Sorry, there’s a server error. Please try again in a few minutes.","network":"Sorry, couldn’t save. Please check your internet connection.","publish":{"text":"Please update the invalid or missing fields in this section:","text_plural":"Please update the invalid or missing fields in these sections:","title":"Invalid or missing fields"},"unknown":"Unknown error"},"failed":{"publish":"Something went wrong while publishing","save":"Something went wrong while saving"},"photo":"Edit photo","preventUser":"You have not yet saved your changes. Are you sure you want to leave this page?","preview":"Preview page","previewTitle":"See what your site looks like on desktop, tablet and mobile.","publish":"Publish","published":"Page published","publishedSuccess":{"withLanguages":"The {{language}} careers page is now published. You will see the changes by refreshing this page in a few minutes: {{url}}","withoutLanguages":"This careers page is now published. You will see the changes by refreshing this page in a few minutes: {{url}}"},"publishing":"Publishing","publishTitle":"Publish your site so it’s live and people can see it.","publishTitleOnDisabledLanguage":"{{language}} is disabled for your account, so you can only edit the page. To publish this language to your careers page, an admin needs to enable {{language}} from the Language kit page in their Workable settings.","publishWithLng":"Publish {{language}} page","redo":"Redo your last action","rich":{"bold":{"shortcut":"Bold ({{shortcutButton}}+B)","text":"Bold"},"clear":"Clear formatting","color":"Color","italic":{"shortcut":"Italic ({{shortcutButton}}+I)","text":"Italic"},"link":{"insert":"Insert link","label":"Link","linkPlaceholder":"Paste a web link or an email address","remove":"Remove link","text":"Text","textPlaceholder":"Insert text"},"underline":{"shortcut":"Underline ({{shortcutButton}}+U)","text":"Underline"}},"save":"Save & preview page","saveAndPreviewTitle":"Save this draft & see what your site looks like on desktop, tablet and mobile.","saved":"Draft saved","savedTitle":"This draft is saved. Your changes are automatically saved every 10 seconds.","saving":"Saving draft","sizeError":"Your image should be no more than {{size}}MB in size. Please try another one.","systemLanguage":"To change the system language, go to your <profile_link>profile settings</profile_link>.","undo":"Undo your last action","upload":"Upload","defaultSettingsTitle":""},"pagetitle":{"edit":"Builder - Careers Page - {{account}}","preview":"Preview - Careers Page - {{account}}"},"preview":{"desktop":"Desktop","desktopTitle":"See what your site looks like on desktop.","mobile":"Mobile","mobileTitle":"See what your site looks like on mobile.","share":"Share","shared":"Preview link copied to clipboard. Easily show others what the page will look like.","tablet":"Tablet","tabletTitle":"See what your site looks like on tablet."},"section":{"add":"Add a new section to the page"},"sidebar":{"colors":{"brandColor1":"Buttons, icons, and links","brandColor2":"Heading text","brandColor3":"Descriptive text","description":"Change the colors of your page elements that will be used across your site.","error":"Color needs to be in hex code format #RRGGBB (Red, Green, Blue)","mainBrandColor":"Primary brand color","mainColorDescription":"Your brand’s primary color will be used to emphasize actions and highlighted information (buttons and links) on all the candidate facing pages and emails.","picker":"Choose color","secondaryBrandColors":"Secondary brand colors","secondaryColorDescription":"Choose your secondary colors – they’ll be used for text.","title":"Page colors"},"hide":"Hide settings","hint":"Customize the colors, fonts, and text size to get the feel you want. Try changing each to see how the page updates.","settings":{"activity":{"by":"by","disabledLanguage":"{{language}} is disabled for your account, so you can only edit the page. To publish this language to your careers page, an admin needs to enable {{language}} from the Language kit page in their Workable settings.","lastPublished":"Last Published","notPublished":"Not Published","published":"Published","site":"{{language}} site","status":"Status","viewCareersPage":"View published {{language}} careers page"},"activityOptionTitle":"Site Activity","favicon":{"default":"Your favicon is currently the default Workable logo.","description":"A favicon is a small icon next to your site title. Get a custom favicon to help visitors recognize your brand and to stand out in their browser tabs.","label":"Favicon image","sizeError":"File is too big.","title":"Favicon","tooltip":"Recommended image size is 32x32 pixels. Acceptable file types .ico, .png","unsupported":"Unsupported file type","viewed":"Your custom favicon can be viewed once the site is published."},"settingsOptionTitle":"Site Settings","show":"Manage your site’s settings","title":"Site"},"show":"Customize the styles and overall look of your site and brand.","title":"Styles","tooltips":{"bodyFont":"Descriptive (typically long form) text will use this font.","brandColor1":"Buttons, icons, and links will be in this color. We recommend using your primary brand color. This color will be used also on job ads and emails to candidates.","brandColor2":"Section heading text will be in this color.","brandColor3":"Descriptive (typically long form) text will be in this color.","headingFont":"Section headings will use this font."},"typography":{"bodyFont":"Descriptive text font","description":"Use the slider to adjust the size of your text. Use the dropdowns to choose your fonts.","headingFont":"Heading font","large":"Large","medium":"Medium","small":"Small","title":"Text size and font"}},"tour":{"add":{"body":"Add more content to appeal to more candidates. You can add new, content rich sections at any time to express your brand in your own way. Choose a template for your new section then add your own text and styling – that’s it!","title":"Add a new section with ready-made templates"},"edit":{"body":"Your careers page is broken down into sections. Use <strong>Edit</strong> to update a section’s content and styling. <br /> Use the side panel to add remove parts of the section, and click directly on the text to change the content.","title":"Edit a section of your page"},"language":{"body":"Say hello (hola, or bonjour) to different versions of your careers page for different languages. Your styling is carried over to each version so all you have to do is translate or update the content. To make it easier, you can import your {{language}} version and translate from there.","title":"Your careers page speaks different languages!"},"styles":{"body":"Ensure you’re on brand by controlling the look and feel of your entire careers page in <strong>Styles</strong>. Apply your own style guide to the page by adding your own color hexcodes and typography.","title":"Add your own style"},"welcome":{"body":"Time for a quick overview of the tools that’ll help you start building your perfect careers page.","next":"Take a look","title":"Welcome to your careers page builder!"}}}')
        }
    }
]);