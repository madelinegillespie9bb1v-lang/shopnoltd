define("discourse/plugins/discourse-solved/discourse/initializers/extend-for-solved-button", ["exports", "@ember/object", "discourse/helpers/topic-status-icons", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/plugin-api", "discourse/lib/utilities", "discourse/models/topic", "discourse/models/user", "discourse/raw-views/topic-status", "discourse/widgets/post-cooked", "discourse-common/lib/icon-library", "I18n"], function(_exports, _object, _topicStatusIcons, _ajax, _ajaxError, _pluginApi, _utilities, _topic, _user, _topicStatus, _postCooked, _iconLibrary, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function clearAccepted(topic) {
        const posts = topic.get("postStream.posts");
        posts.forEach(post => {
            if (post.get("post_number") > 1) {
                post.setProperties({
                    accepted_answer: false,
                    can_accept_answer: true,
                    can_unaccept_answer: false,
                    topic_accepted_answer: false
                });
            }
        });
    }

    function unacceptPost(post) {
        if (!post.can_unaccept_answer) {
            return;
        }
        const topic = post.topic;
        post.setProperties({
            can_accept_answer: true,
            can_unaccept_answer: false,
            accepted_answer: false
        });
        topic.set("accepted_answer", undefined);
        (0, _ajax.ajax)("/solution/unaccept", {
            type: "POST",
            data: {
                id: post.id
            }
        }).catch(_ajaxError.popupAjaxError);
    }

    function acceptPost(post) {
        const topic = post.topic;
        clearAccepted(topic);
        post.setProperties({
            can_unaccept_answer: true,
            can_accept_answer: false,
            accepted_answer: true
        });
        topic.set("accepted_answer", {
            username: post.username,
            name: post.name,
            post_number: post.post_number,
            excerpt: post.cooked
        });
        (0, _ajax.ajax)("/solution/accept", {
            type: "POST",
            data: {
                id: post.id
            }
        }).catch(_ajaxError.popupAjaxError);
    }

    function initializeWithApi(api) {
        const currentUser = api.getCurrentUser();
        _topicStatusIcons.default.addObject(["has_accepted_answer", "far-check-square", "solved"]);
        api.includePostAttributes("can_accept_answer", "can_unaccept_answer", "accepted_answer", "topic_accepted_answer");
        if (api.addDiscoveryQueryParam) {
            api.addDiscoveryQueryParam("solved", {
                replace: true,
                refreshModel: true
            });
        }
        api.addPostMenuButton("solved", attrs => {
            if (attrs.can_accept_answer) {
                const isOp = currentUser ? .id === attrs.topicCreatedById;
                return {
                    action: "acceptAnswer",
                    icon: "far-check-square",
                    className: "unaccepted",
                    title: "solved.accept_answer",
                    label: isOp ? "solved.solution" : null,
                    position: attrs.topic_accepted_answer ? "second-last-hidden" : "first"
                };
            } else if (attrs.accepted_answer) {
                if (attrs.can_unaccept_answer) {
                    return {
                        action: "unacceptAnswer",
                        icon: "check-square",
                        title: "solved.unaccept_answer",
                        className: "accepted fade-out",
                        position: "first",
                        label: "solved.solution"
                    };
                } else {
                    return {
                        className: "hidden",
                        disabled: "true",
                        position: "first",
                        beforeButton(h) {
                            return h("span.accepted-text", {
                                title: _I18n.default.t("solved.accepted_description")
                            }, [h("span", (0, _iconLibrary.iconNode)("check")), h("span.accepted-label", _I18n.default.t("solved.solution"))]);
                        }
                    };
                }
            }
        });
        api.decorateWidget("post-contents:after-cooked", dec => {
            if (dec.attrs.post_number === 1) {
                const postModel = dec.getModel();
                if (postModel) {
                    const topic = postModel.topic;
                    if (topic.accepted_answer) {
                        const hasExcerpt = !!topic.accepted_answer.excerpt;
                        const withExcerpt = `
            <aside class='quote accepted-answer' data-post="${topic.get("accepted_answer").post_number}" data-topic="${topic.id}">
              <div class='title'>
                ${topic.acceptedAnswerHtml} <div class="quote-controls"><\/div>
              </div>
              <blockquote>
                ${topic.accepted_answer.excerpt}
              </blockquote>
            </aside>`;
                        const withoutExcerpt = `
            <aside class='quote accepted-answer'>
              <div class='title title-only'>
                ${topic.acceptedAnswerHtml}
              </div>
            </aside>`;
                        const cooked = new _postCooked.default({
                            cooked: hasExcerpt ? withExcerpt : withoutExcerpt
                        }, dec);
                        return dec.rawHtml(cooked.init());
                    }
                }
            }
        });
        api.attachWidgetAction("post", "acceptAnswer", function() {
            const post = this.model;
            acceptPost(post);
            this.appEvents.trigger("discourse-solved:solution-toggled", post);
            post.get("topic.postStream.posts").forEach(p => {
                p.set("topic_accepted_answer", true);
                this.appEvents.trigger("post-stream:refresh", {
                    id: p.id
                });
            });
        });
        api.attachWidgetAction("post", "unacceptAnswer", function() {
            const post = this.model;
            unacceptPost(post);
            this.appEvents.trigger("discourse-solved:solution-toggled", post);
            post.get("topic.postStream.posts").forEach(p => {
                p.set("topic_accepted_answer", false);
                this.appEvents.trigger("post-stream:refresh", {
                    id: p.id
                });
            });
        });
    }
    var _default = _exports.default = {
        name: "extend-for-solved-button",
        initialize() {
            _topic.default.reopen({
                // keeping this here cause there is complex localization
                acceptedAnswerHtml: (0, _object.computed)("accepted_answer", "id", function() {
                    const username = this.get("accepted_answer.username");
                    const name = this.get("accepted_answer.name");
                    const postNumber = this.get("accepted_answer.post_number");
                    if (!username || !postNumber) {
                        return "";
                    }
                    const displayedUser = this.siteSettings.display_name_on_posts && name ? name : (0, _utilities.formatUsername)(username);
                    return _I18n.default.t("solved.accepted_html", {
                        icon: (0, _iconLibrary.iconHTML)("check-square", {
                            class: "accepted"
                        }),
                        username_lower: username.toLowerCase(),
                        username: displayedUser,
                        post_path: `${this.url}/${postNumber}`,
                        post_number: postNumber,
                        user_path: _user.default.create({
                            username
                        }).path
                    });
                })
            });
            _topicStatus.default.reopen({
                statuses: (0, _object.computed)(function() {
                    const results = this._super(...arguments);
                    if (this.topic.has_accepted_answer) {
                        results.push({
                            openTag: "span",
                            closeTag: "span",
                            title: _I18n.default.t("topic_statuses.solved.help"),
                            icon: "far-check-square",
                            key: "solved"
                        });
                    } else if (this.topic.can_have_answer && this.siteSettings.solved_enabled && this.siteSettings.empty_box_on_unsolved) {
                        results.push({
                            openTag: "span",
                            closeTag: "span",
                            title: _I18n.default.t("solved.has_no_accepted_answer"),
                            icon: "far-square"
                        });
                    }
                    return results;
                })
            });
            (0, _pluginApi.withPluginApi)("0.1", initializeWithApi);
            (0, _pluginApi.withPluginApi)("0.8.10", api => {
                api.replaceIcon("notification.solved.accepted_notification", "check-square");
            });
            (0, _pluginApi.withPluginApi)("0.11.0", api => {
                api.addAdvancedSearchOptions({
                    statusOptions: [{
                        name: _I18n.default.t("search.advanced.statuses.solved"),
                        value: "solved"
                    }, {
                        name: _I18n.default.t("search.advanced.statuses.unsolved"),
                        value: "unsolved"
                    }]
                });
            });
            (0, _pluginApi.withPluginApi)("0.11.7", api => {
                api.addSearchSuggestion("status:solved");
                api.addSearchSuggestion("status:unsolved");
            });
        }
    };
});