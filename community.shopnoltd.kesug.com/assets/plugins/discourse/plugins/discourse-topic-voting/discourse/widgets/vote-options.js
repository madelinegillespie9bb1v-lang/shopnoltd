define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-options", ["exports", "virtual-dom", "discourse/widgets/widget", "I18n"], function(_exports, _virtualDom, _widget, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _widget.createWidget)("vote-options", {
        tagName: "div.vote-options",
        buildClasses() {
            return "voting-popup-menu popup-menu hidden";
        },
        html(attrs) {
            let contents = [];
            if (attrs.user_voted) {
                contents.push(this.attach("remove-vote", attrs));
            } else if (this.currentUser && this.currentUser.votes_exceeded && !attrs.user_voted) {
                contents.push([(0, _virtualDom.h)("div", _I18n.default.t("topic_voting.reached_limit")), (0, _virtualDom.h)("p", (0, _virtualDom.h)("a", {
                    href: this.currentUser.get("path") + "/activity/votes"
                }, _I18n.default.t("topic_voting.list_votes")))]);
            }
            return contents;
        }
    });
});