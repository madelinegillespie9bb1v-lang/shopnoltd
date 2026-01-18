define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/topic-above-post-stream/topic-removed-notification", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const DELETED_CHANNEL_PREFIX = "/discourse-akismet/topic-deleted/";
    var _default = _exports.default = {
        setupComponent(args, component) {
            component.messageBus.subscribe(`${DELETED_CHANNEL_PREFIX}${args.model.id}`, () => {
                component.set("akismetFlaggedTopic", true);
            });
        },
        teardownComponent(component) {
            component.messageBus.unsubscribe(`${DELETED_CHANNEL_PREFIX}${component.model.id}`);
        }
    };
});