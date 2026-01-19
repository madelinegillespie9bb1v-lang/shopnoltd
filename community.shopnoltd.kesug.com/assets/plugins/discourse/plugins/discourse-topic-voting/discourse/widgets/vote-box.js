define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-box", ["exports", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/widgets/raw-html", "discourse/widgets/widget", "I18n"], function(_exports, _ajax, _ajaxError, _rawHtml, _widget, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _widget.createWidget)("vote-box", {
        tagName: "div.voting-wrapper",
        buildKey: () => "vote-box",
        buildClasses() {
            if (this.siteSettings.topic_voting_show_who_voted) {
                return "show-pointer";
            }
        },
        defaultState() {
            return {
                allowClick: true,
                initialVote: false
            };
        },
        html(attrs, state) {
            let voteCount = this.attach("vote-count", attrs);
            let voteButton = this.attach("vote-button", attrs);
            let voteOptions = this.attach("vote-options", attrs);
            let contents = [voteCount, voteButton, voteOptions];
            if (state.votesAlert > 0) {
                const html = "<div class='voting-popup-menu vote-options popup-menu'>" + _I18n.default.t("topic_voting.votes_left", {
                    count: state.votesAlert,
                    path: this.currentUser.get("path") + "/activity/votes"
                }) + "</div>";
                contents.push(new _rawHtml.default({
                    html
                }));
            }
            return contents;
        },
        hideVotesAlert() {
            if (this.state.votesAlert) {
                this.state.votesAlert = null;
                this.scheduleRerender();
            }
        },
        click() {
            this.hideVotesAlert();
        },
        clickOutside() {
            this.hideVotesAlert();
        },
        addVote() {
            let topic = this.attrs;
            let state = this.state;
            return (0, _ajax.ajax)("/voting/vote", {
                type: "POST",
                data: {
                    topic_id: topic.id
                }
            }).then(result => {
                topic.set("vote_count", result.vote_count);
                topic.set("user_voted", true);
                this.currentUser.setProperties({
                    votes_exceeded: !result.can_vote,
                    votes_left: result.votes_left
                });
                if (result.alert) {
                    state.votesAlert = result.votes_left;
                }
                topic.set("who_voted", result.who_voted);
                state.allowClick = true;
                this.scheduleRerender();
            }).catch(_ajaxError.popupAjaxError);
        },
        removeVote() {
            let topic = this.attrs;
            let state = this.state;
            return (0, _ajax.ajax)("/voting/unvote", {
                type: "POST",
                data: {
                    topic_id: topic.id
                }
            }).then(result => {
                topic.set("vote_count", result.vote_count);
                topic.set("user_voted", false);
                this.currentUser.setProperties({
                    votes_exceeded: !result.can_vote,
                    votes_left: result.votes_left
                });
                topic.set("who_voted", result.who_voted);
                state.allowClick = true;
                this.scheduleRerender();
            }).catch(_ajaxError.popupAjaxError);
        }
    });
});