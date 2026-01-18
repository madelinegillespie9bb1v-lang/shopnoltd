define("discourse/plugins/footnote/initializers/inline-footnotes", ["exports", "@popperjs/core", "discourse/lib/plugin-api", "discourse-common/lib/icon-library"], function(_exports, _core, _pluginApi, _iconLibrary) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    let inlineFootnotePopper;

    function applyInlineFootnotes(elem) {
        const footnoteRefs = elem.querySelectorAll("sup.footnote-ref");
        footnoteRefs.forEach(footnoteRef => {
            const refLink = footnoteRef.querySelector("a");
            if (!refLink) {
                return;
            }
            const expandableFootnote = document.createElement("a");
            expandableFootnote.classList.add("expand-footnote");
            expandableFootnote.innerHTML = (0, _iconLibrary.iconHTML)("ellipsis");
            expandableFootnote.href = "";
            expandableFootnote.role = "button";
            expandableFootnote.dataset.footnoteId = refLink.getAttribute("href");
            footnoteRef.after(expandableFootnote);
        });
        if (footnoteRefs.length) {
            elem.classList.add("inline-footnotes");
        }
    }

    function buildTooltip() {
        const template = document.createElement("template");
        template.innerHTML = `
    <div id="footnote-tooltip" role="tooltip">
      <div class="footnote-tooltip-content"></div>
      <div id="arrow" data-popper-arrow></div>
    </div>
  `.trim();
        return template.content.firstChild;
    }

    function footnoteEventHandler(event) {
        const tooltip = document.getElementById("footnote-tooltip");
        const displayedFootnoteId = tooltip ? .dataset.footnoteId;
        const expandableFootnote = event.target;
        const footnoteId = expandableFootnote.dataset.footnoteId;
        inlineFootnotePopper ? .destroy();
        tooltip ? .removeAttribute("data-show");
        tooltip ? .removeAttribute("data-footnote-id");
        if (!event.target.classList.contains("expand-footnote")) {
            // dismissing the tooltip by clicking outside
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (displayedFootnoteId === footnoteId) {
            // dismissing the tooltip by clicking the footnote button
            return;
        }

        // append footnote to tooltip body
        const footnoteContent = tooltip.querySelector(".footnote-tooltip-content");
        let cooked = expandableFootnote.closest(".cooked");
        if (cooked.dataset.refPostId != null) {
            // For full screen tables, redirect
            cooked = document.querySelector(`article[data-post-id="${cooked.dataset.refPostId}"] .cooked`);
        }
        const newContent = cooked.querySelector(footnoteId);
        footnoteContent.innerHTML = newContent.innerHTML;

        // display tooltip
        tooltip.dataset.show = "";
        tooltip.dataset.footnoteId = footnoteId;

        // setup popper
        inlineFootnotePopper ? .destroy();
        inlineFootnotePopper = (0, _core.createPopper)(expandableFootnote, tooltip, {
            modifiers: [{
                name: "arrow",
                options: {
                    element: tooltip.querySelector("#arrow")
                }
            }, {
                name: "preventOverflow",
                options: {
                    altAxis: true,
                    padding: 5
                }
            }, {
                name: "offset",
                options: {
                    offset: [0, 12]
                }
            }]
        });
    }
    var _default = _exports.default = {
        name: "inline-footnotes",
        initialize(container) {
            if (!container.lookup("service:site-settings").display_footnotes_inline) {
                return;
            }
            document.body.append(buildTooltip());
            window.addEventListener("click", footnoteEventHandler, true);
            (0, _pluginApi.withPluginApi)("0.8.9", api => {
                api.decorateCookedElement(elem => applyInlineFootnotes(elem), {
                    onlyStream: true,
                    id: "inline-footnotes"
                });
                api.onPageChange(() => {
                    inlineFootnotePopper ? .destroy();
                    const tooltip = document.getElementById("footnote-tooltip");
                    tooltip ? .removeAttribute("data-show");
                    tooltip ? .removeAttribute("data-footnote-id");
                });
            });
        },
        teardown() {
            inlineFootnotePopper ? .destroy();
            window.removeEventListener("click", footnoteEventHandler);
            document.getElementById("footnote-tooltip") ? .remove();
        }
    };
});