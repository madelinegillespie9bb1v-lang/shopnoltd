define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-button", ["exports", "virtual-dom", "discourse/lib/cookie", "discourse/lib/transformer", "discourse/widgets/widget", "I18n"], function(_exports, _virtualDom, _cookie, _transformer, _widget, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _widget.createWidget)("vote-button", {
        tagName: "div",
        buildClasses(attrs) {
            let buttonClass = "";
            if (attrs.closed) {
                buttonClass = "voting-closed";
            } else {
                if (!attrs.user_voted) {
                    buttonClass = "nonvote";
                } else {
                    if (this.currentUser && this.currentUser.votes_exceeded) {
                        buttonClass = "vote-limited nonvote";
                    } else {
                        buttonClass = "vote";
                    }
                }
            }
            if (this.siteSettings.topic_voting_show_who_voted) {
                buttonClass += " show-pointer";
            }
            return buttonClass;
        },
        buildButtonTitle(attrs) {
            if (this.currentUser) {
                if (attrs.closed) {
                    return _I18n.default.t("topic_voting.voting_closed_title");
                }
                if (attrs.user_voted) {
                    return _I18n.default.t("topic_voting.voted_title");
                }
                if (this.currentUser.votes_exceeded) {
                    return _I18n.default.t("topic_voting.voting_limit");
                }
                return _I18n.default.t("topic_voting.vote_title");
            }
            if (attrs.vote_count) {
                return _I18n.default.t("topic_voting.anonymous_button", {
                    count: attrs.vote_count
                });
            }
            return _I18n.default.t("topic_voting.anonymous_button", {
                count: 1
            });
        },
        html(attrs) {
            return (0, _virtualDom.h)("button", {
                attributes: {
                    title: this.currentUser ? _I18n.default.t("topic_voting.votes_left_button_title", {
                        count: this.currentUser.votes_left
                    }) : ""
                },
                className: "btn btn-primary vote-button"
            }, this.buildButtonTitle(attrs));
        },
        click() {
            (0, _transformer.applyBehaviorTransformer)("topic-vote-button-click", () => {
                if (!this.currentUser) {
                    this.sendWidgetAction("showLogin");
                    (0, _cookie.default)("destination_url", window.location.href, {
                        path: "/"
                    });
                    return;
                }
                if (!this.attrs.closed && this.parentWidget.state.allowClick && !this.attrs.user_voted && !this.currentUser.votes_exceeded) {
                    this.parentWidget.state.allowClick = false;
                    this.parentWidget.state.initialVote = true;
                    this.sendWidgetAction("addVote");
                }
                if (this.attrs.user_voted || this.currentUser.votes_exceeded) {
                    document.querySelector(".vote-options").classList.toggle("hidden");
                }
            });
        },
        clickOutside() {
            document.querySelector(".vote-options").classList.add("hidden");
            this.parentWidget.state.initialVote = false;
        }
    });
});