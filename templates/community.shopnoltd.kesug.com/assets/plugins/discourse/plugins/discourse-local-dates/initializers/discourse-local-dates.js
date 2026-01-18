define("discourse/plugins/discourse-local-dates/initializers/discourse-local-dates", ["exports", "@ember/owner", "@ember/service", "@ember/template", "discourse/lib/download-calendar", "discourse/lib/plugin-api", "discourse/lib/to-markdown", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", "discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create", "discourse/plugins/discourse-local-dates/lib/local-date-builder"], function(_exports, _owner, _service, _template, _downloadCalendar, _pluginApi, _toMarkdown, _iconLibrary, _decorators, _discourseI18n, _localDateMarkupGenerator, _localDatesCreate, _localDateBuilder) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.applyLocalDates = applyLocalDates;
    _exports.default = void 0;
    // Import applyLocalDates from discourse/lib/local-dates instead
    function applyLocalDates(dates, siteSettings) {
        if (!siteSettings.discourse_local_dates_enabled) {
            return;
        }
        const currentUserTZ = moment.tz.guess();
        dates.forEach((element, index, arr) => {
            const opts = buildOptionsFromElement(element, siteSettings);
            if (element.attributes["data-range"] ? .value === "to" && index !== 0 && arr[index - 1].attributes["data-range"] ? .value === "from") {
                const fromElement = arr[index - 1];
                if (_rangeIsSameLocalDay(fromElement, element)) {
                    opts.sameLocalDayAsFrom = true;
                }
            }
            const localDateBuilder = new _localDateBuilder.default(opts, currentUserTZ).build();
            element.innerText = "";
            element.insertAdjacentHTML("beforeend", `${(0, _iconLibrary.iconHTML)("earth-americas")}
        <span class="relative-time">${localDateBuilder.formatted}</span>`);
            element.setAttribute("aria-label", localDateBuilder.textPreview);
            const classes = ["cooked-date"];
            if (localDateBuilder.pastEvent) {
                classes.push("past");
            }
            element.classList.add(...classes);
        });
    }

    function _rangeIsSameLocalDay(fromElement, toElement) {
        if (!fromElement.attributes["data-time"] || !toElement.attributes["data-time"]) {
            return false;
        }
        const timezone = fromElement.attributes["data-timezone"].value;
        const from = moment(_getDateFromElement(fromElement)).tz(timezone);
        const to = moment(_getDateFromElement(toElement)).tz(timezone);
        return from.isSame(to, "day");
    }

    function _getDateFromElement(element) {
        return `${element.attributes["data-date"].value}T${element.attributes["data-time"].value}`;
    }

    function buildOptionsFromElement(element, siteSettings) {
        const opts = {};
        const dataset = element.dataset;
        if (_rangeElements(element).length === 2) {
            opts.duration = _calculateDuration(element);
        }
        opts.time = dataset.time;
        opts.date = dataset.date;
        opts.recurring = dataset.recurring;
        opts.timezones = (dataset.timezones || siteSettings.discourse_local_dates_default_timezones || "Etc/UTC").split("|").filter(Boolean);
        opts.timezone = dataset.timezone;
        opts.calendar = (dataset.calendar || "on") === "on";
        opts.displayedTimezone = dataset.displayedTimezone;
        opts.format = dataset.format || (opts.time ? "LLL" : "LL");
        opts.countdown = dataset.countdown;
        return opts;
    }

    function buildOptionsFromMarkdownTag(element) {
        const opts = {};

        // siteSettings defaults as used by buildOptionsFromElement are purposefully
        // ommitted to reproduce exactly what was on the original element
        opts.time = element.attributes["data-time"];
        opts.date = element.attributes["data-date"];
        opts.recurring = element.attributes["data-recurring"];
        opts.timezones = element.attributes["data-timezones"];
        opts.timezone = element.attributes["data-timezone"];
        opts.calendar = (element.attributes["data-calendar"] || "on") === "on";
        opts.displayedTimezone = element.attributes["data-displayed-timezone"];
        opts.format = element.attributes["data-format"];
        opts.countdown = element.attributes["data-countdown"];
        opts.range = element.attributes["data-range"];
        return opts;
    }

    function _rangeElements(element) {
        if (!element.parentElement) {
            return [];
        }
        if (element.dataset.range) {
            return _partitionedRanges(element).find(pair => pair.includes(element));
        }
        return [element];
    }

    function _partitionedRanges(element) {
        const partitions = [];
        const ranges = Array.from(element.parentElement.children).filter(span => span.dataset.range);
        while (ranges.length > 0) {
            partitions.push(ranges.splice(0, 2));
        }
        return partitions;
    }

    function initializeDiscourseLocalDates(api) {
        const siteSettings = api.container.lookup("service:site-settings");
        const defaultTitle = _discourseI18n.default.t("discourse_local_dates.default_title", {
            site_name: siteSettings.title
        });
        api.decorateCookedElement((elem, helper) => {
            const dates = elem.querySelectorAll(".discourse-local-date");
            applyLocalDates(dates, siteSettings);
            const topicTitle = helper ? .getModel() ? .topic ? .title;
            dates.forEach(date => {
                date.dataset.title = date.dataset.title || topicTitle || defaultTitle;
            });
        });
        api.onToolbarCreate(toolbar => {
            toolbar.addButton({
                title: "discourse_local_dates.title",
                id: "local-dates",
                group: "extras",
                icon: "calendar-days",
                sendAction: event => toolbar.context.send("insertDiscourseLocalDate", event)
            });
        });
        api.modifyClass("component:d-editor", {
            modal: (0, _service.service)(),
            pluginId: "discourse-local-dates",
            actions: {
                insertDiscourseLocalDate(toolbarEvent) {
                    this.modal.show(_localDatesCreate.default, {
                        model: {
                            insertDate: markup => {
                                toolbarEvent.addText(markup);
                            }
                        }
                    });
                }
            }
        });
        (0, _toMarkdown.addTextDecorateCallback)(function(text, nextElement, _previousElement, metadata) {
            if (metadata.discourseLocalDateStartRangeOpts && nextElement ? .attributes.class ? .includes("discourse-local-date") && text === "→") {
                return "";
            }
        });
        (0, _toMarkdown.addTagDecorateCallback)(function() {
            if (this.element.attributes.class ? .includes("discourse-local-date")) {
                if (this.metadata.discourseLocalDateStartRangeOpts) {
                    const startRangeOpts = this.metadata.discourseLocalDateStartRangeOpts;
                    const endRangeOpts = buildOptionsFromMarkdownTag(this.element);
                    const markup = (0, _localDateMarkupGenerator.default)({
                        date: startRangeOpts.date,
                        time: startRangeOpts.time,
                        format: startRangeOpts.format
                    }, endRangeOpts, true, {
                        date: endRangeOpts.date,
                        time: endRangeOpts.time,
                        format: endRangeOpts.format
                    });
                    this.prefix = markup;
                    this.metadata.discourseLocalDateStartRangeOpts = null;
                    return "";
                }
                if (this.element.attributes["data-range"] === "true" || this.element.attributes["data-range"] === "from" || this.element.attributes["data-range"] === "to") {
                    this.metadata.discourseLocalDateStartRangeOpts = buildOptionsFromMarkdownTag(this.element);
                    return "";
                }
                const opts = buildOptionsFromMarkdownTag(this.element, siteSettings);
                const markup = (0, _localDateMarkupGenerator.default)({
                    date: opts.date,
                    time: opts.time,
                    format: opts.format
                }, opts, false);
                this.prefix = markup;
                return "";
            }
        });
    }

    function buildHtmlPreview(element, siteSettings) {
        const opts = buildOptionsFromElement(element, siteSettings);
        const localDateBuilder = new _localDateBuilder.default(opts, moment.tz.guess()).build();
        const htmlPreviews = localDateBuilder.previews.map(preview => {
            const previewNode = document.createElement("div");
            previewNode.classList.add("preview");
            if (preview.current) {
                previewNode.classList.add("current");
            }
            const timezoneNode = document.createElement("span");
            timezoneNode.classList.add("timezone");
            timezoneNode.innerText = preview.timezone;
            previewNode.appendChild(timezoneNode);
            const dateTimeNode = document.createElement("span");
            dateTimeNode.classList.add("date-time");
            dateTimeNode.innerHTML = preview.formatted;
            previewNode.appendChild(dateTimeNode);
            return previewNode;
        });
        const previewsNode = document.createElement("div");
        previewsNode.classList.add("locale-dates-previews");
        htmlPreviews.forEach(htmlPreview => previewsNode.appendChild(htmlPreview));
        const calendarNode = _downloadCalendarNode(element);
        if (calendarNode) {
            previewsNode.appendChild(calendarNode);
        }
        return previewsNode.outerHTML;
    }

    function calculateStartAndEndDate(startDataset, endDataset) {
        let startDate, endDate;
        startDate = moment.tz(`${startDataset.date} ${startDataset.time || ""}`.trim(), startDataset.timezone);
        if (endDataset) {
            endDate = moment.tz(`${endDataset.date} ${endDataset.time || ""}`.trim(), endDataset.timezone);
        }
        return [startDate, endDate];
    }

    function _downloadCalendarNode(element) {
        const [startDataset, endDataset] = _rangeElements(element).map(dateElement => dateElement.dataset);
        const [startDate, endDate] = calculateStartAndEndDate(startDataset, endDataset);
        if (startDate < moment().tz(startDataset.timezone)) {
            return false;
        }
        const node = document.createElement("div");
        node.classList.add("download-calendar");
        node.innerHTML = `${(0, _iconLibrary.renderIcon)("string", "file")} ${_discourseI18n.default.t("download_calendar.add_to_calendar")}`;
        node.setAttribute("data-starts-at", startDate.toISOString());
        if (endDataset) {
            node.setAttribute("data-ends-at", endDate.toISOString());
        }
        if (!startDataset.time && !endDataset) {
            node.setAttribute("data-ends-at", startDate.add(24, "hours").toISOString());
        }
        node.setAttribute("data-title", startDataset.title);
        return node;
    }

    function _calculateDuration(element) {
        const [startDataset, endDataset] = _rangeElements(element).map(dateElement => dateElement.dataset);
        const startDateTime = moment(`${startDataset.date} ${startDataset.time || ""}`.trim());
        const endDateTime = moment(`${endDataset.date} ${endDataset.time || ""}`.trim());
        const duration = endDateTime.diff(startDateTime, "minutes");

        // negative duration is used when we calculate difference for end date from range
        return element.dataset === startDataset ? duration : -duration;
    }
    class LocalDatesInit {
        static# _ = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "tooltip", [_service.service]))();#
        tooltip = (() => (dt7948.i(this, "tooltip"), void 0))();
        constructor(owner) {
            (0, _owner.setOwner)(this, owner);
            window.addEventListener("click", this.showDatePopover, {
                passive: true
            });
            if (this.siteSettings.discourse_local_dates_enabled) {
                (0, _pluginApi.withPluginApi)("0.8.8", initializeDiscourseLocalDates);
            }
        }
        showDatePopover(event) {
            if (event ? .target ? .classList ? .contains("download-calendar")) {
                const dataset = event.target.dataset;
                (0, _downloadCalendar.downloadCalendar)(dataset.title, [{
                    startsAt: dataset.startsAt,
                    endsAt: dataset.endsAt
                }]);
                return this.tooltip.close("local-date");
            }
            if (!event ? .target ? .classList ? .contains("discourse-local-date")) {
                return;
            }
            return this.tooltip.show(event.target, {
                identifier: "local-date",
                content: (0, _template.htmlSafe)(buildHtmlPreview(event.target, this.siteSettings))
            });
        }
        static# _3 = (() => dt7948.n(this.prototype, "showDatePopover", [_decorators.bind]))();
        teardown() {
            window.removeEventListener("click", this.showDatePopover);
        }
    }
    var _default = _exports.default = {
        initialize(owner) {
            this.instance = new LocalDatesInit(owner);
        },
        teardown() {
            this.instance.teardown();
            this.instance = null;
        }
    };
});