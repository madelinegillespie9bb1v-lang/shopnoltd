define("discourse/plugins/spoiler-alert/lib/apply-spoiler", ["exports", "discourse-i18n"], function(_exports, _discourseI18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = applySpoiler;
    const INTERACTIVE_SELECTOR = ["a", "area", "audio", "button", "details", "embed", "iframe", "img.animated", "input", "map", "object", "option", "portal", "select", "textarea", "track", "video", ".lightbox"].join(", ");

    function isInteractive(event) {
        return event.defaultPrevented || event.target.closest(INTERACTIVE_SELECTOR);
    }

    function noTextSelected() {
        return window.getSelection() + "" === "";
    }

    function setAttributes(element, attributes) {
        Object.entries(attributes).forEach(_ref => {
            let [key, value] = _ref;
            if (value === null) {
                element.removeAttribute(key);
            } else {
                element.setAttribute(key, value);
            }
        });
    }

    function _setSpoilerHidden(element) {
        const spoilerHiddenAttributes = {
            role: "button",
            tabindex: "0",
            "data-spoiler-state": "blurred",
            "aria-expanded": false,
            "aria-label": _discourseI18n.default.t("spoiler.label.show"),
            "aria-live": "polite"
        };

        // Set default attributes & classes on spoiler
        setAttributes(element, spoilerHiddenAttributes);
        element.classList.add("spoiler-blurred");

        // Set aria-hidden for all children of the spoiler
        Array.from(element.children).forEach(e => {
            e.setAttribute("aria-hidden", true);
        });
    }

    function _setSpoilerVisible(element) {
        const spoilerVisibleAttributes = {
            "data-spoiler-state": "revealed",
            "aria-expanded": true,
            "aria-label": null,
            role: null
        };

        // Set attributes & classes for when spoiler is visible
        setAttributes(element, spoilerVisibleAttributes);
        element.classList.remove("spoiler-blurred");

        // Remove aria-hidden for all children of the spoiler when visible
        Array.from(element.children).forEach(e => {
            e.removeAttribute("aria-hidden");
        });
    }

    function toggleSpoiler(event, element) {
        if (element.getAttribute("data-spoiler-state") === "blurred") {
            _setSpoilerVisible(element);
            event.preventDefault();
        } else if (!isInteractive(event) && noTextSelected()) {
            _setSpoilerHidden(element);
        }
    }

    function applySpoiler(element) {
        _setSpoilerHidden(element);
        element.addEventListener("click", event => {
            toggleSpoiler(event, element);
        });
        element.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                toggleSpoiler(event, element);
            }
        });
    }
});