define("discourse/plugins/poll/discourse/components/poll-info", ["exports", "@glimmer/component", "@ember/service", "@ember/template", "discourse/lib/formatter", "discourse-common/helpers/d-icon", "discourse-i18n", "@ember/component", "@ember/template-factory"], function(_exports, _component, _service, _template2, _formatter, _dIcon, _discourseI18n, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const ON_VOTE = "on_vote";
    const ON_CLOSE = "on_close";
    const STAFF_ONLY = "staff_only";
    class PollInfoComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        get multipleHelpText() {
            const {
                min: min1,
                max: max1,
                options: options1
            } = this.args;
            const optionsCount1 = options1.length;
            if (max1 > 0) {
                if (min1 === max1 && min1 > 1) {
                    return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.multiple.help.x_options", {
                        count: min1
                    }));
                }
                if (min1 > 1) {
                    if (max1 < optionsCount1) {
                        return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.multiple.help.between_min_and_max_options", {
                            min: min1,
                            max: max1
                        }));
                    }
                    return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.multiple.help.at_least_min_options", {
                        count: min1
                    }));
                }
                if (max1 <= optionsCount1) {
                    return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.multiple.help.up_to_max_options", {
                        count: max1
                    }));
                }
            }
        }
        get votersLabel() {
            return _discourseI18n.default.t("poll.voters", {
                count: this.args.voters
            });
        }
        get showTotalVotes() {
            return this.args.isMultiple && (this.args.showResults || this.args.closed);
        }
        get totalVotes() {
            return this.args.options.reduce((total1, o1) => {
                return total1 + parseInt(o1.votes, 10);
            }, 0);
        }
        get totalVotesLabel() {
            return _discourseI18n.default.t("poll.total_votes", {
                count: this.totalVotes
            });
        }
        get automaticCloseAgeLabel() {
            return _discourseI18n.default.t("poll.automatic_close.age", this.age);
        }
        get automaticCloseClosesInLabel() {
            return _discourseI18n.default.t("poll.automatic_close.closes_in", this.timeLeft);
        }
        get showMultipleHelpText() {
            return this.args.isMultiple && !this.args.showResults && !this.args.closed;
        }
        get closeTitle() {
            const closeDate1 = moment.utc(this.args.close, "YYYY-MM-DD HH:mm:ss Z");
            if (closeDate1.isValid()) {
                return closeDate1.format("LLL");
            } else {
                return "";
            }
        }
        get age() {
            const closeDate1 = moment.utc(this.args.close, "YYYY-MM-DD HH:mm:ss Z");
            if (closeDate1.isValid()) {
                return (0, _formatter.relativeAge)(closeDate1.toDate(), {
                    addAgo: true
                });
            } else {
                return 0;
            }
        }
        get timeLeft() {
            const closeDate1 = moment.utc(this.args.close, "YYYY-MM-DD HH:mm:ss Z");
            if (closeDate1.isValid()) {
                return moment().to(closeDate1, true);
            } else {
                return 0;
            }
        }
        get resultsOnVote() {
            return this.args.results === ON_VOTE && !this.args.hasVoted && !(this.currentUser && this.args.postUserId === this.currentUser.id);
        }
        get resultsOnVoteTitle() {
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.results.vote.title"));
        }
        get resultsOnClose() {
            return this.args.results === ON_CLOSE && !this.args.closed;
        }
        get resultsOnCloseTitle() {
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.results.closed.title"));
        }
        get resultsStaffOnly() {
            return this.args.results === STAFF_ONLY && !(this.currentUser && this.currentUser.staff);
        }
        get resultsStaffOnlyTitle() {
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.results.staff.title"));
        }
        get publicTitle() {
            return !this.args.closed && !this.args.showResults && this.args.isPublic && this.args.results !== STAFF_ONLY;
        }
        get publicTitleLabel() {
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.public.title"));
        }
        get showInstructionsSection() {
            return this.showMultipleHelpText || this.args.close || this.resultsOnVote || this.resultsOnClose || this.resultsStaffOnly || this.publicTitle;
        }
        static# _2 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="poll-info">
                  <div class="poll-info_counts">
                    <div class="poll-info_counts-count">
                      <span class="info-number">{{@voters}}</span>
                      <span class="info-label">{{this.votersLabel}}</span>
                    </div>
                    {{#if this.showTotalVotes}}
                      <div class="poll-info_counts-count">
                        <span class="info-number">{{this.totalVotes}}</span>
                        <span class="info-label">{{this.totalVotesLabel}}</span>
                      </div>
                    {{/if}}
                  </div>
                  {{#if this.showInstructionsSection}}
                    <ul class="poll-info_instructions">
                      {{#if this.showMultipleHelpText}}
                        <li class="multiple-help-text">
                          {{icon "list-ul"}}
                          <span>{{this.multipleHelpText}}</span>
                        </li>
                      {{/if}}
                      {{#if this.poll.close}}
                        {{#if this.isAutomaticallyClosed}}
                          <li title={{this.title}}>
                            {{icon "lock"}}
                            <span>{{this.automaticCloseAgeLabel}}</span>
                          </li>
                        {{else}}
                          <li title={{this.title}}>
                            {{icon "far-clock"}}
                            <span>{{this.automaticCloseClosesInLabel}}</span>
                          </li>
                        {{/if}}
                      {{/if}}
                      {{#if this.resultsOnVote}}
                        <li class="results-on-vote">
                          {{icon "check"}}
                          <span>{{this.resultsOnVoteTitle}}</span>
                        </li>
                      {{/if}}
                      {{#if this.resultsOnClose}}
                        <li class="results-on-close">
                          {{icon "lock"}}
                          <span>{{this.resultsOnCloseTitle}}</span>
                        </li>
                      {{/if}}
                      {{#if this.resultsStaffOnly}}
                        <li class="results-staff-only">
                          {{icon "shield-halved"}}
                          <span>{{this.resultsStaffOnlyTitle}}</span>
                        </li>
                      {{/if}}
                      {{#if this.publicTitle}}
                        <li class="is-public">
                          {{icon "far-eye"}}
                          <span>{{this.publicTitleLabel}}</span>
                        </li>
                      {{/if}}
                    </ul>
                  {{/if}}
                </div>
              
            */
            {
                "id": "0nux6psB",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"poll-info\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"poll-info_counts\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"poll-info_counts-count\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"info-number\"],[12],[1,[30,1]],[13],[1,\"\\n          \"],[10,1],[14,0,\"info-label\"],[12],[1,[30,0,[\"votersLabel\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"showTotalVotes\"]],[[[1,\"          \"],[10,0],[14,0,\"poll-info_counts-count\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"info-number\"],[12],[1,[30,0,[\"totalVotes\"]]],[13],[1,\"\\n            \"],[10,1],[14,0,\"info-label\"],[12],[1,[30,0,[\"totalVotesLabel\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"],[41,[30,0,[\"showInstructionsSection\"]],[[[1,\"        \"],[10,\"ul\"],[14,0,\"poll-info_instructions\"],[12],[1,\"\\n\"],[41,[30,0,[\"showMultipleHelpText\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"multiple-help-text\"],[12],[1,\"\\n              \"],[1,[28,[32,0],[\"list-ul\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[30,0,[\"multipleHelpText\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"poll\",\"close\"]],[[[41,[30,0,[\"isAutomaticallyClosed\"]],[[[1,\"              \"],[10,\"li\"],[15,\"title\",[30,0,[\"title\"]]],[12],[1,\"\\n                \"],[1,[28,[32,0],[\"lock\"],null]],[1,\"\\n                \"],[10,1],[12],[1,[30,0,[\"automaticCloseAgeLabel\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,\"li\"],[15,\"title\",[30,0,[\"title\"]]],[12],[1,\"\\n                \"],[1,[28,[32,0],[\"far-clock\"],null]],[1,\"\\n                \"],[10,1],[12],[1,[30,0,[\"automaticCloseClosesInLabel\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]]],[]],null],[41,[30,0,[\"resultsOnVote\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"results-on-vote\"],[12],[1,\"\\n              \"],[1,[28,[32,0],[\"check\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[30,0,[\"resultsOnVoteTitle\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"resultsOnClose\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"results-on-close\"],[12],[1,\"\\n              \"],[1,[28,[32,0],[\"lock\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[30,0,[\"resultsOnCloseTitle\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"resultsStaffOnly\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"results-staff-only\"],[12],[1,\"\\n              \"],[1,[28,[32,0],[\"shield-halved\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[30,0,[\"resultsStaffOnlyTitle\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"publicTitle\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"is-public\"],[12],[1,\"\\n              \"],[1,[28,[32,0],[\"far-eye\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[30,0,[\"publicTitleLabel\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[\"@voters\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-info.js",
                "scope": () => [_dIcon.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollInfoComponent;
});