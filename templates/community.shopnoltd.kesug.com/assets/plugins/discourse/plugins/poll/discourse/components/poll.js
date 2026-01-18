define("discourse/plugins/poll/discourse/components/poll", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/modifier", "@ember/object", "@ember/render-modifiers/modifiers/did-update", "@ember/service", "@ember/template", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/round", "discourse-common/helpers/d-icon", "discourse-common/helpers/i18n", "discourse-i18n", "discourse/plugins/poll/discourse/components/modal/poll-breakdown", "discourse/plugins/poll/discourse/components/modal/poll-ui-builder", "discourse/plugins/poll/discourse/components/poll-buttons-dropdown", "discourse/plugins/poll/discourse/components/poll-info", "discourse/plugins/poll/discourse/components/poll-options", "discourse/plugins/poll/discourse/components/poll-results-pie", "discourse/plugins/poll/discourse/components/poll-results-tabs", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _modifier, _object, _didUpdate, _service, _template2, _ajax, _ajaxError, _round, _dIcon, _i18n, _discourseI18n, _pollBreakdown, _pollUiBuilder, _pollButtonsDropdown, _pollInfo, _pollOptions, _pollResultsPie, _pollResultsTabs, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const FETCH_VOTERS_COUNT = 25;
    const STAFF_ONLY = "staff_only";
    const MULTIPLE = "multiple";
    const NUMBER = "number";
    const REGULAR = "regular";
    const RANKED_CHOICE = "ranked_choice";
    const ON_VOTE = "on_vote";
    const ON_CLOSE = "on_close";
    const CLOSED_STATUS = "closed";
    const OPEN_STATUS = "open";
    class PollComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "router", [_service.service]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "appEvents", [_service.service]))();#
        appEvents = (() => (dt7948.i(this, "appEvents"), void 0))();
        static# _5 = (() => dt7948.g(this.prototype, "dialog", [_service.service]))();#
        dialog = (() => (dt7948.i(this, "dialog"), void 0))();
        static# _6 = (() => dt7948.g(this.prototype, "modal", [_service.service]))();#
        modal = (() => (dt7948.i(this, "modal"), void 0))();
        static# _7 = (() => dt7948.g(this.prototype, "vote", [_tracking.tracked], function() {
            return this.args.post.polls_votes ? .[this.args.poll.name] || [];
        }))();#
        vote = (() => (dt7948.i(this, "vote"), void 0))();
        static# _8 = (() => dt7948.g(this.prototype, "preloadedVoters", [_tracking.tracked], function() {
            return this.defaultPreloadedVoters();
        }))();#
        preloadedVoters = (() => (dt7948.i(this, "preloadedVoters"), void 0))();
        static# _9 = (() => dt7948.g(this.prototype, "voterListExpanded", [_tracking.tracked], function() {
            return false;
        }))();#
        voterListExpanded = (() => (dt7948.i(this, "voterListExpanded"), void 0))();
        static# _10 = (() => dt7948.g(this.prototype, "hasSavedVote", [_tracking.tracked], function() {
            return this.vote.length > 0;
        }))();#
        hasSavedVote = (() => (dt7948.i(this, "hasSavedVote"), void 0))();
        static# _11 = (() => dt7948.g(this.prototype, "showResults", [_tracking.tracked], function() {
            return !(this.poll.results === ON_CLOSE && !this.closed) && (this.hasSavedVote || this.topicArchived && !this.staffOnly || this.closed && !this.staffOnly);
        }))();#
        showResults = (() => (dt7948.i(this, "showResults"), void 0))();
        static# _12 = (() => dt7948.g(this.prototype, "showTally", [_tracking.tracked], function() {
            return false;
        }))();#
        showTally = (() => (dt7948.i(this, "showTally"), void 0))();
        checkUserGroups = (user1, poll1) => {
            const pollGroups1 = poll1 && poll1.groups && poll1.groups.split(",").map(g1 => g1.toLowerCase());
            if (!pollGroups1) {
                return true;
            }
            const userGroups1 = user1 && user1.groups && user1.groups.map(g1 => g1.name.toLowerCase());
            return userGroups1 && pollGroups1.some(g1 => userGroups1.includes(g1));
        };
        areRanksValid = arr1 => {
            let ranks1 = new Set(); // Using a Set to keep track of unique ranks
            let hasNonZeroDuplicate1 = false;
            arr1.forEach(obj1 => {
                const rank1 = obj1.rank;
                if (rank1 !== 0) {
                    if (ranks1.has(rank1)) {
                        hasNonZeroDuplicate1 = true;
                        return; // Exit forEach loop if a non-zero duplicate is found
                    }
                    ranks1.add(rank1);
                }
            });
            return !hasNonZeroDuplicate1;
        };
        _toggleOption = (() => {
            var _this = this;
            return function(option1) {
                let rank1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                if (_this.isMultiple) {
                    const chosenIdx1 = _this.vote.indexOf(option1.id);
                    if (chosenIdx1 !== -1) {
                        _this.vote.splice(chosenIdx1, 1);
                    } else {
                        _this.vote.push(option1.id);
                    }
                } else if (_this.isRankedChoice) {
                    _this.options.forEach(candidate1 => {
                        const chosenIdx1 = _this.vote.findIndex(object1 => object1.digest === candidate1.id);
                        if (chosenIdx1 === -1) {
                            _this.vote.push({
                                digest: candidate1.id,
                                rank: candidate1.id === option1 ? rank1 : 0
                            });
                        } else {
                            if (candidate1.id === option1) {
                                _this.vote[chosenIdx1].rank = rank1;
                            }
                        }
                    });
                } else {
                    _this.vote = [option1.id];
                }
                _this.vote = [..._this.vote];
            };
        })();
        get poll() {
            return this.args.poll;
        }
        defaultPreloadedVoters() {
            const preloadedVoters1 = {};
            if (this.poll.public && this.poll.preloaded_voters) {
                Object.keys(this.poll.preloaded_voters).forEach(key1 => {
                    preloadedVoters1[key1] = {
                        voters: this.poll.preloaded_voters[key1],
                        loading: false
                    };
                });
            }
            this.options.forEach(option1 => {
                if (!preloadedVoters1[option1.id]) {
                    preloadedVoters1[option1.id] = {
                        voters: [],
                        loading: false
                    };
                }
            });
            return preloadedVoters1;
        }
        get id() {
            return `${this.args.poll.name}-${this.args.post.id}`;
        }
        get post() {
            return this.args.post;
        }
        get groupableUserFields() {
            return this.siteSettings.poll_groupable_user_fields.split("|").filter(Boolean);
        }
        get isStaff() {
            return this.currentUser ? .staff;
        }
        get titleHTML() {
            return (0, _template2.htmlSafe)(this.args.titleHTML);
        }
        get topicArchived() {
            return this.post.get("topic.archived");
        }
        get isRankedChoice() {
            return this.poll.type === RANKED_CHOICE;
        }
        get staffOnly() {
            return this.poll.results === STAFF_ONLY;
        }
        get isMultiple() {
            return this.poll.type === MULTIPLE;
        }
        get isNumber() {
            return this.poll.type === NUMBER;
        }
        get isMe() {
            return this.currentUser && this.post.user_id === this.currentUser.id;
        }
        get status() {
            return this.poll.status;
        }
        async castVotes(option1) {
            if (!this.canCastVotes) {
                return;
            }
            if (!this.currentUser) {
                return;
            }
            try {
                const {
                    poll: poll1
                } = await (0, _ajax.ajax)("/polls/vote", {
                    type: "PUT",
                    data: {
                        post_id: this.post.id,
                        poll_name: this.poll.name,
                        options: this.vote
                    }
                });
                this.hasSavedVote = true;
                Object.assign(this.poll, poll1);
                this.appEvents.trigger("poll:voted", poll1, this.post, this.vote);
                if (this.poll.results !== ON_CLOSE) {
                    this.showResults = true;
                }
                if (this.poll.results === STAFF_ONLY) {
                    if (this.currentUser && this.currentUser.staff) {
                        this.showResults = true;
                    } else {
                        this.showResults = false;
                    }
                }
            } catch (error1) {
                if (error1) {
                    if (!this.isMultiple && !this.isRankedChoice) {
                        this._toggleOption(option1);
                    }
                    (0, _ajaxError.popupAjaxError)(error1);
                } else {
                    this.dialog.alert(_discourseI18n.default.t("poll.error_while_casting_votes"));
                }
            }
        }
        static# _13 = (() => dt7948.n(this.prototype, "castVotes", [_object.action]))();
        get options() {
            let enrichedOptions1 = this.poll.options;
            if (this.isRankedChoice) {
                enrichedOptions1.forEach(candidate1 => {
                    const chosenIdx1 = this.vote.findIndex(object1 => object1.digest === candidate1.id);
                    if (chosenIdx1 === -1) {
                        candidate1.rank = 0;
                    } else {
                        candidate1.rank = this.vote[chosenIdx1].rank;
                    }
                });
            }
            return enrichedOptions1;
        }
        get voters() {
            return this.poll.voters;
        }
        get rankedChoiceOutcome() {
            return this.poll.ranked_choice_outcome || [];
        }
        get min() {
            let min1 = parseInt(this.poll.min, 10);
            if (isNaN(min1) || min1 < 0) {
                min1 = 1;
            }
            return min1;
        }
        get max() {
            let max1 = parseInt(this.poll.max, 10);
            const numOptions1 = this.poll.options.length;
            if (isNaN(max1) || max1 > numOptions1) {
                max1 = numOptions1;
            }
            return max1;
        }
        get closed() {
            return this.status === CLOSED_STATUS || this.isAutomaticallyClosed;
        }
        get isAutomaticallyClosed() {
            return (this.poll.close ? ? false) && moment.utc(this.poll.close, "YYYY-MM-DD HH:mm:ss Z") <= moment();
        }
        get hasVoted() {
            return this.vote ? .length > 0;
        }
        get hideResultsDisabled() {
            return !this.staffOnly && (this.closed || this.topicArchived);
        }
        toggleOption(option1) {
            let rank1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if (this.closed) {
                return;
            }
            if (!this.currentUser) {
                // unlikely, handled by template logic
                return;
            }
            if (!this.checkUserGroups(this.currentUser, this.poll)) {
                return;
            }
            if (!this.isMultiple && !this.isRankedChoice && this.vote.length === 1 && this.vote[0] === option1.id) {
                return this.removeVote();
            }
            if (!this.isMultiple && !this.isRankedChoice) {
                this.vote.length = 0;
            }
            this._toggleOption(option1, rank1);
            if (!this.isMultiple && !this.isRankedChoice) {
                this.castVotes(option1);
            }
        }
        static# _14 = (() => dt7948.n(this.prototype, "toggleOption", [_object.action]))();
        toggleResults() {
            this.showResults = !this.showResults;
        }
        static# _15 = (() => dt7948.n(this.prototype, "toggleResults", [_object.action]))();
        get canCastVotes() {
            if (this.closed || !this.currentUser) {
                return false;
            }
            const selectedOptionCount1 = this.vote ? .length || 0;
            if (this.isMultiple) {
                return selectedOptionCount1 >= this.min && selectedOptionCount1 <= this.max;
            }
            if (this.isRankedChoice) {
                return this.options.length === this.vote ? .length && this.areRanksValid(this.vote);
            }
            return selectedOptionCount1 > 0;
        }
        get notInVotingGroup() {
            return !this.checkUserGroups(this.currentUser, this.poll);
        }
        get pollGroups() {
            return _discourseI18n.default.t("poll.results.groups.title", {
                groups: this.poll.groups
            });
        }
        get showCastVotesButton() {
            return (this.isMultiple || this.isRankedChoice) && !this.showResults;
        }
        get castVotesButtonClass() {
            return `btn cast-votes ${this.canCastVotes ? "btn-primary" : "btn-default"}`;
        }
        get castVotesButtonIcon() {
            return !this.castVotesDisabled ? "check" : "far-square";
        }
        get castVotesDisabled() {
            return !this.canCastVotes;
        }
        get showHideResultsButton() {
            return this.showResults && !this.hideResultsDisabled;
        }
        get showShowResultsButton() {
            return !this.showResults && !this.hideResultsDisabled && !(this.poll.results === ON_VOTE && !this.hasSavedVote && !this.isMe) && !(this.poll.results === ON_CLOSE && !this.closed) && !(this.poll.results === STAFF_ONLY && !this.isStaff) && this.voters > 0;
        }
        get showRemoveVoteButton() {
            return !this.showResults && !this.closed && !this.hideResultsDisabled && this.hasSavedVote;
        }
        get isCheckbox() {
            return this.isMultiple;
        }
        get resultsWidgetTypeClass() {
            const type1 = this.poll.type;
            return this.isNumber || this.poll.chart_type !== _pollUiBuilder.PIE_CHART_TYPE ? `discourse-poll-${type1}-results` : "discourse-poll-pie-chart";
        }
        get resultsPie() {
            return this.poll.chart_type === _pollUiBuilder.PIE_CHART_TYPE;
        }
        get averageRating() {
            const totalScore1 = this.options.reduce((total1, o1) => {
                return total1 + parseInt(o1.html, 10) * parseInt(o1.votes, 10);
            }, 0);
            const average1 = this.voters === 0 ? 0 : (0, _round.default)(totalScore1 / this.voters, -2);
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.average_rating", {
                average: average1
            }));
        }
        get availableDisplayMode() {
            if (!this.showResults || this.poll.chart_type === _pollUiBuilder.PIE_CHART_TYPE || ![_pollUiBuilder.REGULAR_POLL_TYPE, _pollUiBuilder.MULTIPLE_POLL_TYPE].includes(this.poll.type)) {
                return null;
            }
            return this.showTally ? "showPercentage" : "showTally";
        }
        updatedVoters() {
            if (!this.voterListExpanded) {
                this.preloadedVoters = this.defaultPreloadedVoters();
            }
        }
        static# _16 = (() => dt7948.n(this.prototype, "updatedVoters", [_object.action]))();
        fetchVoters(optionId1) {
            let votersCount1;
            let preloadedVoters1 = this.preloadedVoters;
            Object.keys(preloadedVoters1).forEach(key1 => {
                if (key1 === optionId1) {
                    preloadedVoters1[key1].loading = true;
                }
            });
            this.preloadedVoters = Object.assign(preloadedVoters1);
            votersCount1 = this.options.find(option1 => option1.id === optionId1).voters.length;
            return (0, _ajax.ajax)("/polls/voters.json", {
                data: {
                    post_id: this.post.id,
                    poll_name: this.poll.name,
                    option_id: optionId1,
                    page: Math.floor(votersCount1 / FETCH_VOTERS_COUNT) + 1,
                    limit: FETCH_VOTERS_COUNT
                }
            }).then(result1 => {
                this.voterListExpanded = true;
                const voters1 = optionId1 ? this.preloadedVoters[optionId1].voters : this.preloadedVoters;
                const newVoters1 = optionId1 ? result1.voters[optionId1] : result1.voters;
                if (this.isRankedChoice) {
                    this.preloadedVoters[optionId1].voters = [...new Set([...newVoters1])];
                } else {
                    const votersSet1 = new Set(voters1.map(voter1 => voter1.username));
                    newVoters1.forEach(voter1 => {
                        if (!votersSet1.has(voter1.username)) {
                            votersSet1.add(voter1.username);
                            voters1.push(voter1);
                        }
                    });
                    // remove users who changed their vote
                    if (this.poll.type === REGULAR) {
                        Object.keys(this.preloadedVoters).forEach(otherOptionId1 => {
                            if (optionId1 !== otherOptionId1) {
                                this.preloadedVoters[otherOptionId1].voters = this.preloadedVoters[otherOptionId1].voters.filter(voter1 => !votersSet1.has(voter1.username));
                            }
                        });
                    }
                }
            }).catch(error1 => {
                if (error1) {
                    (0, _ajaxError.popupAjaxError)(error1);
                } else {
                    this.dialog.alert(_discourseI18n.default.t("poll.error_while_fetching_voters"));
                }
            }).finally(() => {
                preloadedVoters1 = this.preloadedVoters;
                preloadedVoters1[optionId1].loading = false;
                this.preloadedVoters = Object.assign(preloadedVoters1);
            });
        }
        static# _17 = (() => dt7948.n(this.prototype, "fetchVoters", [_object.action]))();
        dropDownClick(dropDownAction1) {
            this[dropDownAction1]();
        }
        static# _18 = (() => dt7948.n(this.prototype, "dropDownClick", [_object.action]))();
        removeVote() {
            return (0, _ajax.ajax)("/polls/vote", {
                type: "DELETE",
                data: {
                    post_id: this.post.id,
                    poll_name: this.poll.name
                }
            }).then(_ref => {
                let {
                    poll: poll1
                } = _ref;
                if (this.poll.type === RANKED_CHOICE) {
                    poll1.options.forEach(option1 => {
                        option1.rank = 0;
                    });
                }
                this.vote = Object.assign([]);
                this.hasSavedVote = false;
                this.appEvents.trigger("poll:voted", poll1, this.post, this.vote);
                this.showResults = false;
            }).catch(error1 => (0, _ajaxError.popupAjaxError)(error1));
        }
        static# _19 = (() => dt7948.n(this.prototype, "removeVote", [_object.action]))();
        toggleStatus() {
            if (this.isAutomaticallyClosed) {
                return;
            }
            this.dialog.yesNoConfirm({
                message: _discourseI18n.default.t(this.closed ? "poll.open.confirm" : "poll.close.confirm"),
                didConfirm: () => {
                    const status1 = this.closed ? OPEN_STATUS : CLOSED_STATUS;
                    (0, _ajax.ajax)("/polls/toggle_status", {
                        type: "PUT",
                        data: {
                            post_id: this.post.id,
                            poll_name: this.poll.name,
                            status: status1
                        }
                    }).then(() => {
                        this.poll.status = status1;
                        if (this.poll.results === ON_CLOSE || this.poll.results === "always") {
                            this.showResults = this.status === CLOSED_STATUS;
                        }
                        // Votes are only included in serialized results for results=ON_CLOSE when
                        // the poll is closed, so we must refresh the page to pick these up.
                        if (this.poll.results === ON_CLOSE && this.status === CLOSED_STATUS) {
                            this.router.refresh();
                        }
                    }).catch(error1 => {
                        if (error1) {
                            (0, _ajaxError.popupAjaxError)(error1);
                        } else {
                            this.dialog.alert(_discourseI18n.default.t("poll.error_while_toggling_status"));
                        }
                    });
                }
            });
        }
        static# _20 = (() => dt7948.n(this.prototype, "toggleStatus", [_object.action]))();
        showBreakdown() {
            this.modal.show(_pollBreakdown.default, {
                model: {
                    poll: this.poll,
                    post: this.post
                }
            });
        }
        static# _21 = (() => dt7948.n(this.prototype, "showBreakdown", [_object.action]))();
        exportResults() {
            const queryID1 = this.poll.type === RANKED_CHOICE ? this.siteSettings.poll_export_ranked_choice_data_explorer_query_id : this.siteSettings.poll_export_data_explorer_query_id;
            // This uses the Data Explorer plugin export as CSV route
            // There is detection to check if the plugin is enabled before showing the button
            (0, _ajax.ajax)(`/admin/plugins/explorer/queries/${queryID1}/run.csv`, {
                type: "POST",
                data: {
                    // needed for data-explorer route compatibility
                    params: JSON.stringify({
                        poll_name: this.poll.name,
                        post_id: this.post.id.toString()
                    }),
                    explain: false,
                    limit: 1000000,
                    download: 1
                }
            }).then(csvContent1 => {
                const downloadLink1 = document.createElement("a");
                const blob1 = new Blob([csvContent1], {
                    type: "text/csv;charset=utf-8;"
                });
                downloadLink1.href = URL.createObjectURL(blob1);
                downloadLink1.setAttribute("download", `poll-export-${this.poll.name}-${this.post.id}.csv`);
                downloadLink1.click();
                downloadLink1.remove();
            }).catch(error1 => {
                if (error1) {
                    (0, _ajaxError.popupAjaxError)(error1);
                } else {
                    this.dialog.alert(_discourseI18n.default.t("poll.error_while_exporting_results"));
                }
            });
        }
        static# _22 = (() => dt7948.n(this.prototype, "exportResults", [_object.action]))();
        toggleDisplayMode() {
            this.showTally = !this.showTally;
        }
        static# _23 = (() => dt7948.n(this.prototype, "toggleDisplayMode", [_object.action]))();
        static# _24 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="poll">
                  <div
                    {{didUpdate this.updatedVoters this.poll.preloaded_voters}}
                    class="poll-container"
                  >
                    {{this.titleHTML}}
                    {{#if this.notInVotingGroup}}
                      <div class="alert alert-danger">{{this.pollGroups}}</div>
                    {{/if}}
                    {{#if this.showResults}}
                      <div class={{this.resultsWidgetTypeClass}}>
                        {{#if this.isNumber}}
                          <span>{{this.averageRating}}</span>
                        {{else}}
                          {{#if this.resultsPie}}
                            <PollResultsPie @id={{this.id}} @options={{this.options}} />
                          {{else}}
                            <PollResultsTabs
                              @options={{this.options}}
                              @pollName={{this.poll.name}}
                              @pollType={{this.poll.type}}
                              @isRankedChoice={{this.isRankedChoice}}
                              @isPublic={{this.poll.public}}
                              @postId={{this.post.id}}
                              @vote={{this.vote}}
                              @voters={{this.preloadedVoters}}
                              @votersCount={{this.poll.voters}}
                              @fetchVoters={{this.fetchVoters}}
                              @rankedChoiceOutcome={{this.rankedChoiceOutcome}}
                              @showTally={{this.showTally}}
                            />
                          {{/if}}
                        {{/if}}
                      </div>
                    {{else}}
                      <PollOptions
                        @isCheckbox={{this.isCheckbox}}
                        @isRankedChoice={{this.isRankedChoice}}
                        @options={{this.options}}
                        @votes={{this.vote}}
                        @sendOptionSelect={{this.toggleOption}}
                      />
                    {{/if}}
                  </div>
                  <PollInfo
                    @options={{this.options}}
                    @min={{this.min}}
                    @max={{this.max}}
                    @isMultiple={{this.isMultiple}}
                    @close={{this.close}}
                    @closed={{this.closed}}
                    @results={{this.poll.results}}
                    @showResults={{this.showResults}}
                    @postUserId={{this.poll.post.user_id}}
                    @isPublic={{this.poll.public}}
                    @hasVoted={{this.hasVoted}}
                    @voters={{this.voters}}
                  />
                  <div class="poll-buttons">
                    {{#if this.showCastVotesButton}}
                      <button
                        class={{this.castVotesButtonClass}}
                        title={{i18n "poll.cast-votes.title"}}
                        disabled={{this.castVotesDisabled}}
                        {{on "click" this.castVotes}}
                      >
                        {{icon this.castVotesButtonIcon}}
                        <span class="d-button-label">{{i18n "poll.cast-votes.label"}}</span>
                      </button>
                    {{/if}}
    
                    {{#if this.showHideResultsButton}}
                      <button
                        class="btn btn-default toggle-results"
                        title={{i18n "poll.hide-results.title"}}
                        {{on "click" this.toggleResults}}
                      >
                        {{icon "chevron-left"}}
                        <span class="d-button-label">{{i18n
                            "poll.hide-results.label"
                          }}</span>
                      </button>
                    {{/if}}
    
                    {{#if this.showShowResultsButton}}
                      <button
                        class="btn btn-default toggle-results"
                        title={{i18n "poll.show-results.title"}}
                        {{on "click" this.toggleResults}}
                      >
                        {{icon "chart-bar"}}
                        <span class="d-button-label">{{i18n
                            "poll.show-results.label"
                          }}</span>
                      </button>
                    {{/if}}
    
                    {{#if this.showRemoveVoteButton}}
                      <button
                        class="btn btn-default remove-vote"
                        title={{i18n "poll.remove-vote.title"}}
                        {{on "click" this.removeVote}}
                      >
                        {{icon "arrow-rotate-left"}}
                        <span class="d-button-label">{{i18n
                            "poll.remove-vote.label"
                          }}</span>
                      </button>
                    {{/if}}
    
                    <PollButtonsDropdown
                      @closed={{this.closed}}
                      @voters={{this.voters}}
                      @isStaff={{this.isStaff}}
                      @isMe={{this.isMe}}
                      @isRankedChoice={{this.isRankedChoice}}
                      @topicArchived={{this.topicArchived}}
                      @groupableUserFields={{this.groupableUserFields}}
                      @isAutomaticallyClosed={{this.isAutomaticallyClosed}}
                      @dropDownClick={{this.dropDownClick}}
                      @availableDisplayMode={{this.availableDisplayMode}}
                    />
                  </div>
                </div>
              
            */
            {
                "id": "Nhwy9swv",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"poll\"],[12],[1,\"\\n      \"],[11,0],[24,0,\"poll-container\"],[4,[32,0],[[30,0,[\"updatedVoters\"]],[30,0,[\"poll\",\"preloaded_voters\"]]],null],[12],[1,\"\\n        \"],[1,[30,0,[\"titleHTML\"]]],[1,\"\\n\"],[41,[30,0,[\"notInVotingGroup\"]],[[[1,\"          \"],[10,0],[14,0,\"alert alert-danger\"],[12],[1,[30,0,[\"pollGroups\"]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showResults\"]],[[[1,\"          \"],[10,0],[15,0,[30,0,[\"resultsWidgetTypeClass\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"isNumber\"]],[[[1,\"              \"],[10,1],[12],[1,[30,0,[\"averageRating\"]]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"resultsPie\"]],[[[1,\"                \"],[8,[32,1],null,[[\"@id\",\"@options\"],[[30,0,[\"id\"]],[30,0,[\"options\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"                \"],[8,[32,2],null,[[\"@options\",\"@pollName\",\"@pollType\",\"@isRankedChoice\",\"@isPublic\",\"@postId\",\"@vote\",\"@voters\",\"@votersCount\",\"@fetchVoters\",\"@rankedChoiceOutcome\",\"@showTally\"],[[30,0,[\"options\"]],[30,0,[\"poll\",\"name\"]],[30,0,[\"poll\",\"type\"]],[30,0,[\"isRankedChoice\"]],[30,0,[\"poll\",\"public\"]],[30,0,[\"post\",\"id\"]],[30,0,[\"vote\"]],[30,0,[\"preloadedVoters\"]],[30,0,[\"poll\",\"voters\"]],[30,0,[\"fetchVoters\"]],[30,0,[\"rankedChoiceOutcome\"]],[30,0,[\"showTally\"]]]],null],[1,\"\\n\"]],[]]]],[]]],[1,\"          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[32,3],null,[[\"@isCheckbox\",\"@isRankedChoice\",\"@options\",\"@votes\",\"@sendOptionSelect\"],[[30,0,[\"isCheckbox\"]],[30,0,[\"isRankedChoice\"]],[30,0,[\"options\"]],[30,0,[\"vote\"]],[30,0,[\"toggleOption\"]]]],null],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n      \"],[8,[32,4],null,[[\"@options\",\"@min\",\"@max\",\"@isMultiple\",\"@close\",\"@closed\",\"@results\",\"@showResults\",\"@postUserId\",\"@isPublic\",\"@hasVoted\",\"@voters\"],[[30,0,[\"options\"]],[30,0,[\"min\"]],[30,0,[\"max\"]],[30,0,[\"isMultiple\"]],[30,0,[\"close\"]],[30,0,[\"closed\"]],[30,0,[\"poll\",\"results\"]],[30,0,[\"showResults\"]],[30,0,[\"poll\",\"post\",\"user_id\"]],[30,0,[\"poll\",\"public\"]],[30,0,[\"hasVoted\"]],[30,0,[\"voters\"]]]],null],[1,\"\\n      \"],[10,0],[14,0,\"poll-buttons\"],[12],[1,\"\\n\"],[41,[30,0,[\"showCastVotesButton\"]],[[[1,\"          \"],[11,\"button\"],[16,0,[30,0,[\"castVotesButtonClass\"]]],[16,\"title\",[28,[32,5],[\"poll.cast-votes.title\"],null]],[16,\"disabled\",[30,0,[\"castVotesDisabled\"]]],[4,[32,6],[\"click\",[30,0,[\"castVotes\"]]],null],[12],[1,\"\\n            \"],[1,[28,[32,7],[[30,0,[\"castVotesButtonIcon\"]]],null]],[1,\"\\n            \"],[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[32,5],[\"poll.cast-votes.label\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showHideResultsButton\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-default toggle-results\"],[16,\"title\",[28,[32,5],[\"poll.hide-results.title\"],null]],[4,[32,6],[\"click\",[30,0,[\"toggleResults\"]]],null],[12],[1,\"\\n            \"],[1,[28,[32,7],[\"chevron-left\"],null]],[1,\"\\n            \"],[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[32,5],[\"poll.hide-results.label\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showShowResultsButton\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-default toggle-results\"],[16,\"title\",[28,[32,5],[\"poll.show-results.title\"],null]],[4,[32,6],[\"click\",[30,0,[\"toggleResults\"]]],null],[12],[1,\"\\n            \"],[1,[28,[32,7],[\"chart-bar\"],null]],[1,\"\\n            \"],[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[32,5],[\"poll.show-results.label\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showRemoveVoteButton\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-default remove-vote\"],[16,\"title\",[28,[32,5],[\"poll.remove-vote.title\"],null]],[4,[32,6],[\"click\",[30,0,[\"removeVote\"]]],null],[12],[1,\"\\n            \"],[1,[28,[32,7],[\"arrow-rotate-left\"],null]],[1,\"\\n            \"],[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[32,5],[\"poll.remove-vote.label\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[8,[32,8],null,[[\"@closed\",\"@voters\",\"@isStaff\",\"@isMe\",\"@isRankedChoice\",\"@topicArchived\",\"@groupableUserFields\",\"@isAutomaticallyClosed\",\"@dropDownClick\",\"@availableDisplayMode\"],[[30,0,[\"closed\"]],[30,0,[\"voters\"]],[30,0,[\"isStaff\"]],[30,0,[\"isMe\"]],[30,0,[\"isRankedChoice\"]],[30,0,[\"topicArchived\"]],[30,0,[\"groupableUserFields\"]],[30,0,[\"isAutomaticallyClosed\"]],[30,0,[\"dropDownClick\"]],[30,0,[\"availableDisplayMode\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll.js",
                "scope": () => [_didUpdate.default, _pollResultsPie.default, _pollResultsTabs.default, _pollOptions.default, _pollInfo.default, _i18n.default, _modifier.on, _dIcon.default, _pollButtonsDropdown.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollComponent;
});