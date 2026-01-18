define("discourse/plugins/spoiler-alert/initializers/spoiler-alert", ["exports", "discourse/lib/plugin-api", "discourse/lib/to-markdown", "discourse/plugins/spoiler-alert/lib/apply-spoiler"], function(_exports, _pluginApi, _toMarkdown, _applySpoiler) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    _exports.initializeSpoiler = initializeSpoiler;

    function spoil(element) {
        element.querySelectorAll(".spoiler").forEach(spoiler => {
            spoiler.classList.remove("spoiler");
            spoiler.classList.add("spoiled");
            (0, _applySpoiler.default)(spoiler);
        });
    }

    function initializeSpoiler(api) {
        api.decorateCookedElement(spoil, {
            id: "spoiler-alert"
        });
        api.addComposerToolbarPopupMenuOption({
            icon: "wand-magic",
            label: "spoiler.title",
            action: toolbarEvent => {
                toolbarEvent.applySurround("[spoiler]", "[/spoiler]", "spoiler_text", {
                    multiline: false,
                    useBlockMode: true
                });
            }
        });
        (0, _toMarkdown.addTagDecorateCallback)(function() {
            const {
                attributes
            } = this.element;
            if (/\bspoiled\b/.test(attributes.class)) {
                this.prefix = "[spoiler]";
                this.suffix = "[/spoiler]";
            }
        });
        (0, _toMarkdown.addBlockDecorateCallback)(function(text) {
            const {
                name,
                attributes
            } = this.element;
            if (name === "div" && /\bspoiled\b/.test(attributes.class)) {
                this.prefix = "[spoiler]\n";
                this.suffix = "\n[/spoiler]";
                return text.trim();
            }
        });
    }
    var _default = _exports.default = {
        name: "spoiler-alert",
        initialize(container) {
            const siteSettings = container.lookup("service:site-settings");
            if (siteSettings.spoiler_enabled) {
                (0, _pluginApi.withPluginApi)("1.15.0", initializeSpoiler);
            }
        }
    };
});