define("discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create", ["exports", "@ember/component", "@ember/object", "@ember/object/computed", "@ember/runloop", "@ember-decorators/object", "discourse/lib/computed", "discourse/lib/local-dates", "discourse/lib/text", "discourse-common/config/environment", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", "@ember/template-factory"], function(_exports, _component, _object, _computed, _runloop, _object2, _computed2, _localDates, _text, _environment, _decorators, _discourseI18n, _localDateMarkupGenerator, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <DModal
          @title={{i18n "discourse_local_dates.title"}}
          @closeModal={{@closeModal}}
          class="discourse-local-dates-create-modal -large"
        >
          <:body>
            <div class="form">
              {{#if this.isValid}}
                {{#if this.timezoneIsDifferentFromUserTimezone}}
                  <div class="preview alert alert-info">
                    {{i18n "discourse_local_dates.create.form.current_timezone"}}
                    <b>{{this.formattedCurrentUserTimezone}}</b>{{this.currentPreview}}
                  </div>
                {{/if}}
              {{else}}
                <div class="validation-error alert alert-error">
                  {{i18n "discourse_local_dates.create.form.invalid_date"}}
                </div>
              {{/if}}
  
              {{this.computeDate}}
  
              <div class="date-time-configuration">
                <div class="inputs-panel">
                  <div
                    class="date-time-control from
                      {{if this.fromSelected 'is-selected'}}
                      {{if this.fromFilled 'is-filled'}}"
                  >
                    {{d-icon "calendar-days"}}
                    <DButton
                      @action={{this.focusFrom}}
                      @translatedLabel={{this.formattedFrom}}
                      id="from-date-time"
                      class="date-time"
                      autofocus
                    />
                  </div>
  
                  <div
                    class="date-time-control to
                      {{if this.toSelected 'is-selected'}}
                      {{if this.toFilled 'is-filled'}}"
                  >
                    {{d-icon "calendar-days"}}
                    <DButton
                      @action={{this.focusTo}}
                      @translatedLabel={{this.formattedTo}}
                      class="date-time"
                    />
                    {{#if this.toFilled}}
                      <DButton
                        @action={{this.eraseToDateTime}}
                        @icon="xmark"
                        class="delete-to-date"
                      />
                    {{/if}}
                  </div>
  
                  {{#if this.site.desktopView}}
                    <TimezoneInput
                      @options={{hash icon="globe"}}
                      @value={{this.timezone}}
                      @onChange={{fn (mut this.timezone)}}
                    />
                  {{/if}}
                </div>
  
                <div class="picker-panel">
                  <CalendarDateTimeInput
                    @datePickerId="local-date-create-form"
                    @date={{this.selectedDate}}
                    @time={{this.selectedTime}}
                    @minDate={{this.minDate}}
                    @timeFormat={{this.timeFormat}}
                    @dateFormat={{this.dateFormat}}
                    @onChangeDate={{this.changeSelectedDate}}
                    @onChangeTime={{this.changeSelectedTime}}
                  />
                </div>
  
                {{#if this.site.mobileView}}
                  <TimezoneInput
                    @value={{this.timezone}}
                    @options={{hash icon="globe"}}
                    @onChange={{fn (mut this.timezone)}}
                  />
                {{/if}}
              </div>
  
              {{#if this.advancedMode}}
                <div class="advanced-options">
                  {{#unless this.isRange}}
                    <div class="control-group recurrence">
                      <label class="control-label">
                        {{i18n "discourse_local_dates.create.form.recurring_title"}}
                      </label>
                      <p>{{html-safe
                          (i18n
                            "discourse_local_dates.create.form.recurring_description"
                          )
                        }}</p>
                      <div class="controls">
                        <ComboBox
                          @content={{this.recurringOptions}}
                          @value={{this.recurring}}
                          @onChange={{fn (mut this.recurring)}}
                          @options={{hash
                            none="discourse_local_dates.create.form.recurring_none"
                          }}
                          class="recurrence-input"
                        />
                      </div>
                    </div>
                  {{/unless}}
  
                  <div class="control-group timezones">
                    <label>{{i18n
                        "discourse_local_dates.create.form.timezones_title"
                      }}</label>
                    <p>{{i18n
                        "discourse_local_dates.create.form.timezones_description"
                      }}</p>
                    <div class="controls">
                      <MultiSelect
                        @valueProperty={{null}}
                        @nameProperty={{null}}
                        @content={{this.allTimezones}}
                        @value={{this.timezones}}
                        @options={{hash allowAny=false maximum=5}}
                        class="timezones-input"
                      />
                    </div>
                  </div>
  
                  <div class="control-group format">
                    <label>{{i18n
                        "discourse_local_dates.create.form.format_title"
                      }}</label>
                    <p>
                      {{i18n "discourse_local_dates.create.form.format_description"}}
                      <a
                        target="_blank"
                        href="https://momentjs.com/docs/#/parsing/string-format/"
                        rel="noopener noreferrer"
                      >
                        {{d-icon "circle-question"}}
                      </a>
                    </p>
                    <div class="controls">
                      <TextField @value={{this.format}} class="format-input" />
                    </div>
                  </div>
                  <div class="control-group">
                    <ul class="formats">
                      {{#each this.previewedFormats as |previewedFormat|}}
                        <li class="format">
                          <a
                            class="moment-format"
                            href
                            {{on "click" (fn this.updateFormat previewedFormat.format)}}
                          >
                            {{previewedFormat.format}}
                          </a>
                          <span class="previewed-format">
                            {{previewedFormat.preview}}
                          </span>
                        </li>
                      {{/each}}
                    </ul>
                  </div>
                </div>
              {{/if}}
            </div>
          </:body>
  
          <:footer>
  
            {{#if this.isValid}}
              <DButton
                @action={{this.save}}
                @label="discourse_local_dates.create.form.insert"
                class="btn-primary"
              />
            {{/if}}
  
            <DButton
              @action={{this.cancel}}
              @translatedLabel={{i18n "cancel"}}
              class="btn-flat"
            />
  
            <DButton
              @action={{this.toggleAdvancedMode}}
              @icon="gear"
              @label={{this.toggleModeBtnLabel}}
              class="btn-default advanced-mode-btn"
            />
          </:footer>
        </DModal>
        */
        {
            "id": "G8c0lIEZ",
            "block": "[[[8,[39,0],[[24,0,\"discourse-local-dates-create-modal -large\"]],[[\"@title\",\"@closeModal\"],[[28,[37,1],[\"discourse_local_dates.title\"],null],[30,1]]],[[\"body\",\"footer\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"isValid\"]],[[[41,[30,0,[\"timezoneIsDifferentFromUserTimezone\"]],[[[1,\"          \"],[10,0],[14,0,\"preview alert alert-info\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"discourse_local_dates.create.form.current_timezone\"],null]],[1,\"\\n            \"],[10,\"b\"],[12],[1,[30,0,[\"formattedCurrentUserTimezone\"]]],[13],[1,[30,0,[\"currentPreview\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"        \"],[10,0],[14,0,\"validation-error alert alert-error\"],[12],[1,\"\\n          \"],[1,[28,[35,1],[\"discourse_local_dates.create.form.invalid_date\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n      \"],[1,[30,0,[\"computeDate\"]]],[1,\"\\n\\n      \"],[10,0],[14,0,\"date-time-configuration\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"inputs-panel\"],[12],[1,\"\\n          \"],[10,0],[15,0,[29,[\"date-time-control from\\n              \",[52,[30,0,[\"fromSelected\"]],\"is-selected\"],\"\\n              \",[52,[30,0,[\"fromFilled\"]],\"is-filled\"]]]],[12],[1,\"\\n            \"],[1,[28,[35,3],[\"calendar-days\"],null]],[1,\"\\n            \"],[8,[39,4],[[24,1,\"from-date-time\"],[24,0,\"date-time\"],[24,\"autofocus\",\"\"]],[[\"@action\",\"@translatedLabel\"],[[30,0,[\"focusFrom\"]],[30,0,[\"formattedFrom\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[15,0,[29,[\"date-time-control to\\n              \",[52,[30,0,[\"toSelected\"]],\"is-selected\"],\"\\n              \",[52,[30,0,[\"toFilled\"]],\"is-filled\"]]]],[12],[1,\"\\n            \"],[1,[28,[35,3],[\"calendar-days\"],null]],[1,\"\\n            \"],[8,[39,4],[[24,0,\"date-time\"]],[[\"@action\",\"@translatedLabel\"],[[30,0,[\"focusTo\"]],[30,0,[\"formattedTo\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"toFilled\"]],[[[1,\"              \"],[8,[39,4],[[24,0,\"delete-to-date\"]],[[\"@action\",\"@icon\"],[[30,0,[\"eraseToDateTime\"]],\"xmark\"]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"desktopView\"]],[[[1,\"            \"],[8,[39,5],null,[[\"@options\",\"@value\",\"@onChange\"],[[28,[37,6],null,[[\"icon\"],[\"globe\"]]],[30,0,[\"timezone\"]],[28,[37,7],[[28,[37,8],[[30,0,[\"timezone\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"picker-panel\"],[12],[1,\"\\n          \"],[8,[39,9],null,[[\"@datePickerId\",\"@date\",\"@time\",\"@minDate\",\"@timeFormat\",\"@dateFormat\",\"@onChangeDate\",\"@onChangeTime\"],[\"local-date-create-form\",[30,0,[\"selectedDate\"]],[30,0,[\"selectedTime\"]],[30,0,[\"minDate\"]],[30,0,[\"timeFormat\"]],[30,0,[\"dateFormat\"]],[30,0,[\"changeSelectedDate\"]],[30,0,[\"changeSelectedTime\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"          \"],[8,[39,5],null,[[\"@value\",\"@options\",\"@onChange\"],[[30,0,[\"timezone\"]],[28,[37,6],null,[[\"icon\"],[\"globe\"]]],[28,[37,7],[[28,[37,8],[[30,0,[\"timezone\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"advancedMode\"]],[[[1,\"        \"],[10,0],[14,0,\"advanced-options\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"isRange\"]]],[[[1,\"            \"],[10,0],[14,0,\"control-group recurrence\"],[12],[1,\"\\n              \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n                \"],[1,[28,[35,1],[\"discourse_local_dates.create.form.recurring_title\"],null]],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,2],[12],[1,[28,[35,11],[[28,[37,1],[\"discourse_local_dates.create.form.recurring_description\"],null]],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n                \"],[8,[39,12],[[24,0,\"recurrence-input\"]],[[\"@content\",\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"recurringOptions\"]],[30,0,[\"recurring\"]],[28,[37,7],[[28,[37,8],[[30,0,[\"recurring\"]]],null]],null],[28,[37,6],null,[[\"none\"],[\"discourse_local_dates.create.form.recurring_none\"]]]]],null],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[10,0],[14,0,\"control-group timezones\"],[12],[1,\"\\n            \"],[10,\"label\"],[12],[1,[28,[35,1],[\"discourse_local_dates.create.form.timezones_title\"],null]],[13],[1,\"\\n            \"],[10,2],[12],[1,[28,[35,1],[\"discourse_local_dates.create.form.timezones_description\"],null]],[13],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[8,[39,13],[[24,0,\"timezones-input\"]],[[\"@valueProperty\",\"@nameProperty\",\"@content\",\"@value\",\"@options\"],[null,null,[30,0,[\"allTimezones\"]],[30,0,[\"timezones\"]],[28,[37,6],null,[[\"allowAny\",\"maximum\"],[false,5]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"control-group format\"],[12],[1,\"\\n            \"],[10,\"label\"],[12],[1,[28,[35,1],[\"discourse_local_dates.create.form.format_title\"],null]],[13],[1,\"\\n            \"],[10,2],[12],[1,\"\\n              \"],[1,[28,[35,1],[\"discourse_local_dates.create.form.format_description\"],null]],[1,\"\\n              \"],[10,3],[14,\"target\",\"_blank\"],[14,6,\"https://momentjs.com/docs/#/parsing/string-format/\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"\\n                \"],[1,[28,[35,3],[\"circle-question\"],null]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[8,[39,14],[[24,0,\"format-input\"]],[[\"@value\"],[[30,0,[\"format\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n            \"],[10,\"ul\"],[14,0,\"formats\"],[12],[1,\"\\n\"],[42,[28,[37,16],[[28,[37,16],[[30,0,[\"previewedFormats\"]]],null]],null],null,[[[1,\"                \"],[10,\"li\"],[14,0,\"format\"],[12],[1,\"\\n                  \"],[11,3],[24,0,\"moment-format\"],[24,6,\"\"],[4,[38,17],[\"click\",[28,[37,7],[[30,0,[\"updateFormat\"]],[30,2,[\"format\"]]],null]],null],[12],[1,\"\\n                    \"],[1,[30,2,[\"format\"]]],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,1],[14,0,\"previewed-format\"],[12],[1,\"\\n                    \"],[1,[30,2,[\"preview\"]]],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[2]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[]],[[[1,\"\\n\\n\"],[41,[30,0,[\"isValid\"]],[[[1,\"      \"],[8,[39,4],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\"],[[30,0,[\"save\"]],\"discourse_local_dates.create.form.insert\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,4],[[24,0,\"btn-flat\"]],[[\"@action\",\"@translatedLabel\"],[[30,0,[\"cancel\"]],[28,[37,1],[\"cancel\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,4],[[24,0,\"btn-default advanced-mode-btn\"]],[[\"@action\",\"@icon\",\"@label\"],[[30,0,[\"toggleAdvancedMode\"]],\"gear\",[30,0,[\"toggleModeBtnLabel\"]]]],null],[1,\"\\n  \"]],[]]]]]],[\"@closeModal\",\"previewedFormat\"],false,[\"d-modal\",\"i18n\",\"if\",\"d-icon\",\"d-button\",\"timezone-input\",\"hash\",\"fn\",\"mut\",\"calendar-date-time-input\",\"unless\",\"html-safe\",\"combo-box\",\"multi-select\",\"text-field\",\"each\",\"-track-array\",\"on\"]]",
            "moduleName": "discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create.hbs",
            "isStrictMode": false
        });
    class LocalDatesCreate extends _component.default {
        timeFormat = "HH:mm:ss";
        dateFormat = "YYYY-MM-DD";
        dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
        date = null;
        toDate = null;
        time = null;
        toTime = null;
        format = null;
        formats = null;
        recurring = null;
        advancedMode = false;
        timezone = null;
        fromSelected = null;
        toSelected = null;
        static# _ = (() => dt7948.g(this.prototype, "fromFilled", [(0, _computed.notEmpty)("date")]))();#
        fromFilled = (() => (dt7948.i(this, "fromFilled"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "toFilled", [(0, _computed.notEmpty)("toDate")]))();#
        toFilled = (() => (dt7948.i(this, "toFilled"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "timezoneIsDifferentFromUserTimezone", [(0, _computed2.propertyNotEqual)("currentUserTimezone", "options.timezone")]))();#
        timezoneIsDifferentFromUserTimezone = (() => (dt7948.i(this, "timezoneIsDifferentFromUserTimezone"), void 0))();
        init() {
            super.init(...arguments);
            this._picker = null;
            this.setProperties({
                timezones: [],
                formats: (this.siteSettings.discourse_local_dates_default_formats || "").split("|").filter(f => f),
                timezone: this.currentUserTimezone,
                date: moment().format(this.dateFormat)
            });
        }
        didInsertElement() {
            super.didInsertElement(...arguments);
            this.send("focusFrom");
        }
        configChanged() {
            this._renderPreview();
        }
        static# _4 = (() => dt7948.n(this.prototype, "configChanged", [(0, _object2.observes)("computedConfig.{from,to,options}", "options", "isValid", "isRange")]))();
        async _renderPreview() {
            if (this.markup) {
                const result = await (0, _text.cook)(this.markup);
                this.set("currentPreview", result);
                (0, _runloop.schedule)("afterRender", () => {
                    (0, _localDates.applyLocalDates)(document.querySelectorAll(".preview .discourse-local-date"), this.siteSettings);
                });
            }
        }
        static# _5 = (() => dt7948.n(this.prototype, "_renderPreview", [(0, _decorators.debounce)(_environment.INPUT_DELAY)]))();
        isRange(date, toDate, toTime) {
            return date && (toDate || toTime);
        }
        static# _6 = (() => dt7948.n(this.prototype, "isRange", [(0, _decorators.default)("date", "toDate", "toTime")]))();
        isValid(config, isRange) {
            const fromConfig = config.from;
            if (!config.from.dateTime || !config.from.dateTime.isValid()) {
                return false;
            }
            if (isRange) {
                const toConfig = config.to;
                if (!toConfig.dateTime || !toConfig.dateTime.isValid() || toConfig.dateTime.diff(fromConfig.dateTime) < 0) {
                    return false;
                }
            }
            return true;
        }
        static# _7 = (() => dt7948.n(this.prototype, "isValid", [(0, _decorators.default)("computedConfig", "isRange")]))();
        fromConfig(date, time, isRange) {
            let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            const timeInferred = time ? false : true;
            let dateTime;
            if (!timeInferred) {
                dateTime = moment.tz(`${date} ${time}`, options.timezone);
            } else {
                dateTime = moment.tz(date, options.timezone);
            }
            if (!timeInferred) {
                time = dateTime.format(this.timeFormat);
            }
            let format = options.format;
            if (timeInferred && this.formats.includes(format)) {
                format = "LL";
            }
            return _object.default.create({
                date: dateTime.format(this.dateFormat),
                time,
                dateTime,
                format,
                range: isRange ? "start" : false
            });
        }
        static# _8 = (() => dt7948.n(this.prototype, "fromConfig", [(0, _decorators.default)("date", "time", "isRange", "options.{format,timezone}")]))();
        toConfig(date, time, isRange) {
            let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            const timeInferred = time ? false : true;
            if (time && !date) {
                date = moment().format(this.dateFormat);
            }
            let dateTime;
            if (!timeInferred) {
                dateTime = moment.tz(`${date} ${time}`, options.timezone);
            } else {
                dateTime = moment.tz(date, options.timezone).endOf("day");
            }
            if (!timeInferred) {
                time = dateTime.format(this.timeFormat);
            }
            let format = options.format;
            if (timeInferred && this.formats.includes(format)) {
                format = "LL";
            }
            return _object.default.create({
                date: dateTime.format(this.dateFormat),
                time,
                dateTime,
                format,
                range: isRange ? "end" : false
            });
        }
        static# _9 = (() => dt7948.n(this.prototype, "toConfig", [(0, _decorators.default)("toDate", "toTime", "isRange", "options.{timezone,format}")]))();
        options(recurring, timezones, timezone, format) {
            return _object.default.create({
                recurring,
                timezones,
                timezone,
                format
            });
        }
        static# _10 = (() => dt7948.n(this.prototype, "options", [(0, _decorators.default)("recurring", "timezones", "timezone", "format")]))();
        computedConfig(fromConfig, toConfig, options) {
            return _object.default.create({
                from: fromConfig,
                to: toConfig,
                options
            });
        }
        static# _11 = (() => dt7948.n(this.prototype, "computedConfig", [(0, _decorators.default)("fromConfig.{date}", "toConfig.{date}", "options.{recurring,timezones,timezone,format}")]))();
        currentUserTimezone() {
            return this.currentUser.user_option.timezone || moment.tz.guess();
        }
        static# _12 = (() => dt7948.n(this.prototype, "currentUserTimezone", [_decorators.default]))();
        allTimezones() {
            return moment.tz.names();
        }
        static# _13 = (() => dt7948.n(this.prototype, "allTimezones", [_decorators.default]))();
        formattedCurrentUserTimezone(timezone) {
            return timezone.replace("_", " ").replace("Etc/", "").replace("/", ", ");
        }
        static# _14 = (() => dt7948.n(this.prototype, "formattedCurrentUserTimezone", [(0, _decorators.default)("currentUserTimezone")]))();
        previewedFormats(formats) {
            return formats.map(format => {
                return {
                    format,
                    preview: moment().format(format)
                };
            });
        }
        static# _15 = (() => dt7948.n(this.prototype, "previewedFormats", [(0, _decorators.default)("formats")]))();
        recurringOptions() {
            const key = "discourse_local_dates.create.form.recurring";
            return [{
                name: _discourseI18n.default.t(`${key}.every_day`),
                id: "1.days"
            }, {
                name: _discourseI18n.default.t(`${key}.every_week`),
                id: "1.weeks"
            }, {
                name: _discourseI18n.default.t(`${key}.every_two_weeks`),
                id: "2.weeks"
            }, {
                name: _discourseI18n.default.t(`${key}.every_month`),
                id: "1.months"
            }, {
                name: _discourseI18n.default.t(`${key}.every_two_months`),
                id: "2.months"
            }, {
                name: _discourseI18n.default.t(`${key}.every_three_months`),
                id: "3.months"
            }, {
                name: _discourseI18n.default.t(`${key}.every_six_months`),
                id: "6.months"
            }, {
                name: _discourseI18n.default.t(`${key}.every_year`),
                id: "1.years"
            }];
        }
        static# _16 = (() => dt7948.n(this.prototype, "recurringOptions", [_decorators.default]))();
        _generateDateMarkup(fromDateTime, options, isRange, toDateTime) {
            return (0, _localDateMarkupGenerator.default)(fromDateTime, options, isRange, toDateTime);
        }
        toggleModeBtnLabel(advancedMode) {
            return advancedMode ? "discourse_local_dates.create.form.simple_mode" : "discourse_local_dates.create.form.advanced_mode";
        }
        static# _17 = (() => dt7948.n(this.prototype, "toggleModeBtnLabel", [(0, _decorators.default)("advancedMode")]))();
        markup(config, options, isValid, isRange) {
            let text;
            if (isValid && config.from) {
                if (config.to && config.to.range) {
                    text = this._generateDateMarkup(config.from, options, isRange, config.to);
                } else {
                    text = this._generateDateMarkup(config.from, options, isRange);
                }
            }
            return text;
        }
        static# _18 = (() => dt7948.n(this.prototype, "markup", [(0, _decorators.default)("computedConfig.{from,to,options}", "options", "isValid", "isRange")]))();
        formattedFrom(dateTime) {
            return dateTime.format("LLLL");
        }
        static# _19 = (() => dt7948.n(this.prototype, "formattedFrom", [(0, _decorators.default)("fromConfig.dateTime")]))();
        formattedTo(dateTime, toSelected) {
            const emptyText = toSelected ? "&nbsp;" : _discourseI18n.default.t("discourse_local_dates.create.form.until");
            return dateTime.isValid() ? dateTime.format("LLLL") : emptyText;
        }
        static# _20 = (() => dt7948.n(this.prototype, "formattedTo", [(0, _decorators.default)("toConfig.dateTime", "toSelected")]))();
        updateFormat(format, event) {
            event ? .preventDefault();
            this.set("format", format);
        }
        static# _21 = (() => dt7948.n(this.prototype, "updateFormat", [_object.action]))();
        selectedDate(fromSelected) {
            return fromSelected ? this.date : this.toDate;
        }
        static# _22 = (() => dt7948.n(this.prototype, "selectedDate", [(0, _decorators.default)("fromSelected", "toSelected")]))();
        selectedTime(fromSelected) {
            return fromSelected ? this.time : this.toTime;
        }
        static# _23 = (() => dt7948.n(this.prototype, "selectedTime", [(0, _decorators.default)("fromSelected", "toSelected")]))();
        changeSelectedDate(date) {
            if (this.fromSelected) {
                this.set("date", date);
            } else {
                this.set("toDate", date);
            }
        }
        static# _24 = (() => dt7948.n(this.prototype, "changeSelectedDate", [_object.action]))();
        changeSelectedTime(time) {
            if (this.fromSelected) {
                this.set("time", time);
            } else {
                this.set("toTime", time);
            }
        }
        static# _25 = (() => dt7948.n(this.prototype, "changeSelectedTime", [_object.action]))();
        eraseToDateTime() {
            this.setProperties({
                toDate: null,
                toTime: null
            });
            this.focusFrom();
        }
        static# _26 = (() => dt7948.n(this.prototype, "eraseToDateTime", [_object.action]))();
        focusFrom() {
            this.setProperties({
                fromSelected: true,
                toSelected: false,
                minDate: null
            });
        }
        static# _27 = (() => dt7948.n(this.prototype, "focusFrom", [_object.action]))();
        focusTo() {
            this.setProperties({
                toSelected: true,
                fromSelected: false,
                minDate: this.get("fromConfig.date")
            });
        }
        static# _28 = (() => dt7948.n(this.prototype, "focusTo", [_object.action]))();
        toggleAdvancedMode() {
            this.toggleProperty("advancedMode");
        }
        static# _29 = (() => dt7948.n(this.prototype, "toggleAdvancedMode", [_object.action]))();
        save() {
            const markup = this.markup;
            if (markup) {
                this.closeModal();
                this.model.insertDate(markup);
            }
        }
        static# _30 = (() => dt7948.n(this.prototype, "save", [_object.action]))();
        cancel() {
            this.closeModal();
        }
        static# _31 = (() => dt7948.n(this.prototype, "cancel", [_object.action]))();
    }
    _exports.default = LocalDatesCreate;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, LocalDatesCreate);
});