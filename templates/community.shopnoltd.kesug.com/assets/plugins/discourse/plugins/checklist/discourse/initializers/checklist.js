define("discourse/plugins/checklist/discourse/initializers/checklist", ["exports", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/plugin-api", "discourse-common/lib/icon-library", "discourse-i18n"], function(_exports, _ajax, _ajaxError, _pluginApi, _iconLibrary, _discourseI18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.checklistSyntax = checklistSyntax;
    _exports.default = void 0;

    function initializePlugin(api) {
        const siteSettings = api.container.lookup("service:site-settings");
        if (siteSettings.checklist_enabled) {
            api.decorateCookedElement(checklistSyntax);
        }
    }

    function isWhitespaceNode(node) {
        return node.nodeType === 3 && node.nodeValue.match(/^\s*$/);
    }

    function hasPrecedingContent(node) {
        let sibling = node.previousSibling;
        while (sibling) {
            if (!isWhitespaceNode(sibling)) {
                return true;
            }
            sibling = sibling.previousSibling;
        }
        return false;
    }

    function addUlClasses(boxes) {
        boxes.forEach(val => {
            let parent = val.parentElement;
            if (parent.nodeName === "P" && parent.parentElement.firstElementChild === parent) {
                parent = parent.parentElement;
            }
            if (parent.nodeName === "LI" && parent.parentElement.nodeName === "UL" && !hasPrecedingContent(val)) {
                parent.classList.add("has-checkbox");
                val.classList.add("list-item-checkbox");
                if (!val.nextSibling) {
                    val.insertAdjacentHTML("afterend", "&#8203;"); // Ensure otherwise empty <li> does not collapse height
                }
            }
        });
    }

    function checklistSyntax(elem, postDecorator) {
        const boxes = [...elem.getElementsByClassName("chcklst-box")];
        addUlClasses(boxes);
        if (!postDecorator) {
            return;
        }
        const postWidget = postDecorator.widget;
        const postModel = postDecorator.getModel();
        if (!postModel.can_edit) {
            return;
        }
        boxes.forEach((val, idx) => {
            val.onclick = async event => {
                const box = event.currentTarget;
                const classList = box.classList;
                if (classList.contains("permanent") || classList.contains("readonly")) {
                    return;
                }
                const newValue = classList.contains("checked") ? "[ ]" : "[x]";
                const template = document.createElement("template");
                template.innerHTML = (0, _iconLibrary.iconHTML)("spinner", {
                    class: "fa-spin list-item-checkbox"
                });
                box.insertAdjacentElement("afterend", template.content.firstChild);
                box.classList.add("hidden");
                boxes.forEach(e => e.classList.add("readonly"));
                try {
                    const post = await (0, _ajax.ajax)(`/posts/${postModel.id}`);
                    const blocks = [];

                    // Computing offsets where checkbox are not evaluated (i.e. inside
                    // code blocks).
                    [
                        // inline code
                        /`[^`\n]*\n?[^`\n]*`/gm,
                        // multi-line code
                        /^```[^]*?^```/gm,
                        // bbcode
                        /\[code\][^]*?\[\/code\]/gm,
                        // italic/bold
                        /_(?=\S).*?\S_/gm,
                        // strikethrough
                        /~~(?=\S).*?\S~~/gm
                    ].forEach(regex => {
                        let match;
                        while ((match = regex.exec(post.raw)) != null) {
                            blocks.push([match.index, match.index + match[0].length]);
                        }
                    });
                    [
                        // italic/bold
                        /([^\[\n]|^)\*\S.+?\S\*(?=[^\]\n]|$)/gm
                    ].forEach(regex => {
                        let match;
                        while ((match = regex.exec(post.raw)) != null) {
                            // Simulate lookbehind - skip the first character
                            blocks.push([match.index + 1, match.index + match[0].length]);
                        }
                    });

                    // make the first run go to index = 0
                    let nth = -1;
                    let found = false;
                    const newRaw = post.raw.replace(/\[( |x)?\]/gi, (match, ignored, off) => {
                        if (found) {
                            return match;
                        }

                        // skip empty image URLs - "![](https://example.com/image.jpg)"
                        if (off > 0 && post.raw[off - 1] === "!") {
                            return match;
                        }
                        nth += blocks.every(b => b[0] >= off + match.length || off > b[1]);
                        if (nth === idx) {
                            found = true; // Do not replace any further matches
                            return newValue;
                        }
                        return match;
                    });
                    await postModel.save({
                        raw: newRaw,
                        edit_reason: _discourseI18n.default.t("checklist.edit_reason")
                    });
                    postWidget.attrs.isSaving = false;
                    postWidget.scheduleRerender();
                } catch (e) {
                    (0, _ajaxError.popupAjaxError)(e);
                } finally {
                    boxes.forEach(e => e.classList.remove("readonly"));
                    box.classList.remove("hidden");
                    box.parentElement.querySelector(".fa-spin").remove();
                }
            };
        });
    }
    var _default = _exports.default = {
        name: "checklist",
        initialize() {
            (0, _pluginApi.withPluginApi)("0.1", api => initializePlugin(api));
        }
    };
});