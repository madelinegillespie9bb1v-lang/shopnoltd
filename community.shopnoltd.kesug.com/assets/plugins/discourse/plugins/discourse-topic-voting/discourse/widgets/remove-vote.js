define("discourse/plugins/discourse-topic-voting/discourse/widgets/remove-vote", ["exports", "discourse/widgets/widget", "discourse-common/lib/icon-library", "I18n"], function(_exports, _widget, _iconLibrary, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _widget.createWidget)("remove-vote", {
        tagName: "div.remove-vote",
        buildClasses() {
            return "vote-option";
        },
        html() {
            return [(0, _iconLibrary.iconNode)("times"), _I18n.default.t("topic_voting.remove_vote")];
        },
        click() {
            this.sendWidgetAction("removeVote");
        }
    });
});