define("discourse/plugins/discourse-solved/discourse/initializers/add-topic-list-class", ["exports", "discourse/components/topic-list-item", "discourse-common/utils/decorators"], function(_exports, _topicListItem, _decorators) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "add-topic-list-class",
        initialize() {
            _topicListItem.default.reopen(dt7948.p({
                unboundClassNames() {
                    let classList = this._super(...arguments);
                    if (this.topic.has_accepted_answer) {
                        classList += " status-solved";
                    }
                    return classList;
                }
            }, [
                ["method", "unboundClassNames", [(0, _decorators.default)()]]
            ]));
        }
    };
});