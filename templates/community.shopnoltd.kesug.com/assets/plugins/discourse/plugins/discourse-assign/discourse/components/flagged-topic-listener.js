define("discourse/plugins/discourse-assign/discourse/components/flagged-topic-listener", ["exports", "@ember/component", "@ember/object"], function(_exports, _component, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function assignIfEqual(topic, data) {
        if (topic && topic.id === data.topic_id) {
            (0, _object.set)(topic, "assigned_to_user", data.assigned_to);
        }
    }
    class FlaggedTopicListener extends _component.default {
        didInsertElement() {
            super.didInsertElement(...arguments);
            this.messageBus.subscribe("/staff/topic-assignment", data => {
                if (this.flaggedTopics) {
                    this.flaggedTopics.forEach(ft => assignIfEqual(ft.topic, data));
                } else {
                    assignIfEqual(this.topic, data);
                }
            });
        }
        willDestroyElement() {
            super.willDestroyElement(...arguments);
            this.messageBus.unsubscribe("/staff/topic-assignment");
        }
    }
    _exports.default = FlaggedTopicListener;
});