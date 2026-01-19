define("discourse/plugins/poll/discourse/initializers/extend-for-poll", ["exports", "@glimmer/tracking", "@ember/object", "@ember-compat/tracked-built-ins", "discourse/lib/plugin-api", "discourse-common/utils/decorators", "discourse/plugins/poll/discourse/components/modal/poll-ui-builder", "discourse/plugins/poll/discourse/components/poll", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function(_exports, _tracking, _object, _trackedBuiltIns, _pluginApi, _decorators, _pollUiBuilder, _poll, _component, _templateFactory, _templateOnly) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function attachPolls(elem, helper) {
        let pollNodes = [...elem.querySelectorAll(".poll")];
        pollNodes = pollNodes.filter(node1 => node1.parentNode.tagName !== "BLOCKQUOTE");
        if (!pollNodes.length || !helper) {
            return;
        }
        const post = helper.getModel();
        const polls = post.pollsObject;
        pollNodes.forEach(pollNode => {
            const pollName = pollNode.dataset.pollName;
            let poll = polls[pollName];
            let pollPost = post;
            const quotedId = pollNode.closest(".expanded-quote") ? .dataset.postId;
            if (quotedId && post.quoted[quotedId]) {
                pollPost = _object.default.create(post.quoted[quotedId]);
                poll = new _trackedBuiltIns.TrackedObject(pollPost.polls.find(p1 => p1.name === pollName));
            }
            if (poll) {
                const titleHTML = pollNode.querySelector(".poll-title") ? .outerHTML;
                const newPollNode = document.createElement("div");
                Object.assign(newPollNode.dataset, {
                    pollName: poll.name,
                    pollType: poll.type
                });
                newPollNode.classList.add("poll-outer");
                if (poll.chart_type === _pollUiBuilder.PIE_CHART_TYPE) {
                    newPollNode.classList.add("pie");
                }
                pollNode.replaceWith(newPollNode);
                helper.renderGlimmer(newPollNode, (0, _component.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
                    /*
                      
                            <Poll @poll={{poll}} @post={{post}} @titleHTML={{titleHTML}} />
                          
                    */
                    {
                        "id": "5LFxqpVn",
                        "block": "[[[1,\"\\n        \"],[8,[32,0],null,[[\"@poll\",\"@post\",\"@titleHTML\"],[[32,1],[32,2],[32,3]]],null],[1,\"\\n      \"]],[],false,[]]",
                        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/initializers/extend-for-poll.js",
                        "scope": () => [_poll.default, poll, post, titleHTML],
                        "isStrictMode": true
                    }), (0, _templateOnly.default)(undefined, undefined)));
            }
        });
    }

    function initializePolls(api1) {
        api1.modifyClass("controller:topic", Superclass1 => class extends Superclass1 {
            subscribe() {
                super.subscribe(...arguments);
                this.messageBus.subscribe(`/polls/${this.model.id}`, this._onPollMessage);
            }
            unsubscribe() {
                this.messageBus.unsubscribe("/polls/*", this._onPollMessage);
                super.unsubscribe(...arguments);
            }
            _onPollMessage(msg1) {
                const post1 = this.get("model.postStream").findLoadedPost(msg1.post_id);
                if (post1) {
                    post1.polls = msg1.polls;
                }
            }
            static# _ = (() => dt7948.n(this.prototype, "_onPollMessage", [_decorators.bind]))();
        });
        api1.modifyClass("model:post", Superclass1 => class extends Superclass1 {
            static# _ = (() => dt7948.g(this.prototype, "pollsObject", [_tracking.tracked], function() {
                return new _trackedBuiltIns.TrackedObject();
            }))();#
            pollsObject = (() => (dt7948.i(this, "pollsObject"), void 0))();
            static# _2 = (() => dt7948.g(this.prototype, "_polls", [_tracking.tracked]))();#
            _polls = (() => (dt7948.i(this, "_polls"), void 0))();
            get polls() {
                return this._polls;
            }
            set polls(value1) {
                this._polls = value1;
                this._refreshPollsObject();
            }
            _refreshPollsObject() {
                for (const rawPoll1 of this.polls) {
                    const name1 = rawPoll1.name;
                    this.pollsObject[name1] || = new _trackedBuiltIns.TrackedObject();
                    Object.assign(this.pollsObject[name1], rawPoll1);
                }
            }
        });
        api1.decorateCookedElement(attachPolls, {
            onlyStream: true
        });
        const siteSettings1 = api1.container.lookup("service:site-settings");
        if (siteSettings1.poll_enabled) {
            api1.addSearchSuggestion("in:polls");
        }
    }
    var _default = _exports.default = {
        name: "extend-for-poll",
        initialize() {
            (0, _pluginApi.withPluginApi)("0.8.7", initializePolls);
        }
    };
});