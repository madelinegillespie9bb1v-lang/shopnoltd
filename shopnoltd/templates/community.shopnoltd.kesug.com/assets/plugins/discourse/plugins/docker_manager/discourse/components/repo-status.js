define("discourse/plugins/docker_manager/discourse/components/repo-status", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/helpers/format-date", "discourse-common/helpers/d-icon", "discourse-common/helpers/i18n", "I18n", "discourse/plugins/docker_manager/discourse/helpers/commit-url", "discourse/plugins/docker_manager/discourse/helpers/new-commits", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _service, _dButton, _formatDate, _dIcon, _i18n, _I18n, _commitUrl, _newCommits, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class RepoStatus extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "upgradeStore", [_service.inject]))();#
        upgradeStore = (() => (dt7948.i(this, "upgradeStore"), void 0))();
        get upgradeDisabled() {
            // Allow to see the currently running update
            if (this.args.upgradingRepo) {
                return false;
            }
            // Disable other buttons when an update is running
            if (this.upgradeStore.running) {
                return true;
            }
            // docker_manager has to be updated before other plugins
            return !this.args.managerRepo.upToDate && this.args.managerRepo !== this.args.repo;
        }
        get upgradeButtonLabel() {
            if (this.args.repo.upgrading) {
                return _I18n.default.t("admin.docker.updating");
            } else {
                return _I18n.default.t("admin.docker.update_action");
            }
        }
        upgrade() {
            this.router.transitionTo("update.show", this.args.repo);
        }
        static# _3 = (() => dt7948.n(this.prototype, "upgrade", [_object.action]))();
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <tr class="repo {{if @repo.hasNewVersion 'new-version'}}">
                  <td>
                    <div class="repo__name">
                      {{@repo.nameTitleized}}
                    </div>
                    {{#if @repo.author}}
                      <div class="repo__author">
                        {{@repo.author}}
                      </div>
                    {{/if}}
                    {{#if @repo.plugin}}
                      <div class="repo__about">
                        {{@repo.plugin.about}}
                        {{#if @repo.linkUrl}}
                          <a
                            href={{@repo.linkUrl}}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {{i18n "admin.plugins.learn_more"}}
                            {{icon "external-link-alt"}}
                          </a>
                        {{/if}}
                      </div>
                    {{/if}}
                    {{#if @repo.hasNewVersion}}
                      <div class="repo__new-version">
                        {{i18n "admin.docker.new_version_available"}}
                      </div>
                    {{/if}}
                  </td>
    
                  <td>
                    {{CommitUrl "current" @repo.version @repo.prettyVersion @repo.url}}
                  </td>
    
                  <td>{{FormatDate @repo.latest.date leaveAgo="true"}}</td>
                  <td>
                    <ul class="repo__latest-version">
                      <li>
                        {{CommitUrl
                          "new"
                          @repo.latest.version
                          @repo.prettyLatestVersion
                          @repo.url
                        }}
                      </li>
                      <li class="new-commits">
                        {{NewCommits
                          @repo.latest.commits_behind
                          @repo.version
                          @repo.latest.version
                          @repo.url
                        }}
                      </li>
                    </ul>
                  </td>
                  <td class="repo__status">
                    {{#if @repo.checkingStatus}}
                      {{i18n "admin.docker.checking"}}
                    {{else if @repo.upToDate}}
                      {{i18n "admin.docker.up_to_date"}}
                    {{else}}
                      <DButton
                        @action={{this.upgrade}}
                        @disabled={{this.upgradeDisabled}}
                        @translatedLabel={{this.upgradeButtonLabel}}
                        class="upgrade-button"
                      />
                    {{/if}}
                  </td>
                </tr>
              
            */
            {
                "id": "6BNb/NY8",
                "block": "[[[1,\"\\n    \"],[10,\"tr\"],[15,0,[29,[\"repo \",[52,[30,1,[\"hasNewVersion\"]],\"new-version\"]]]],[12],[1,\"\\n      \"],[10,\"td\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"repo__name\"],[12],[1,\"\\n          \"],[1,[30,1,[\"nameTitleized\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,1,[\"author\"]],[[[1,\"          \"],[10,0],[14,0,\"repo__author\"],[12],[1,\"\\n            \"],[1,[30,1,[\"author\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[41,[30,1,[\"plugin\"]],[[[1,\"          \"],[10,0],[14,0,\"repo__about\"],[12],[1,\"\\n            \"],[1,[30,1,[\"plugin\",\"about\"]]],[1,\"\\n\"],[41,[30,1,[\"linkUrl\"]],[[[1,\"              \"],[10,3],[15,6,[30,1,[\"linkUrl\"]]],[14,\"rel\",\"noopener noreferrer\"],[14,\"target\",\"_blank\"],[12],[1,\"\\n                \"],[1,[28,[32,0],[\"admin.plugins.learn_more\"],null]],[1,\"\\n                \"],[1,[28,[32,1],[\"external-link-alt\"],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[41,[30,1,[\"hasNewVersion\"]],[[[1,\"          \"],[10,0],[14,0,\"repo__new-version\"],[12],[1,\"\\n            \"],[1,[28,[32,0],[\"admin.docker.new_version_available\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,\"td\"],[12],[1,\"\\n        \"],[1,[28,[32,2],[\"current\",[30,1,[\"version\"]],[30,1,[\"prettyVersion\"]],[30,1,[\"url\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"td\"],[12],[1,[28,[32,3],[[30,1,[\"latest\",\"date\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n      \"],[10,\"td\"],[12],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"repo__latest-version\"],[12],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[1,[28,[32,2],[\"new\",[30,1,[\"latest\",\"version\"]],[30,1,[\"prettyLatestVersion\"]],[30,1,[\"url\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"new-commits\"],[12],[1,\"\\n            \"],[1,[28,[32,4],[[30,1,[\"latest\",\"commits_behind\"]],[30,1,[\"version\"]],[30,1,[\"latest\",\"version\"]],[30,1,[\"url\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"td\"],[14,0,\"repo__status\"],[12],[1,\"\\n\"],[41,[30,1,[\"checkingStatus\"]],[[[1,\"          \"],[1,[28,[32,0],[\"admin.docker.checking\"],null]],[1,\"\\n\"]],[]],[[[41,[30,1,[\"upToDate\"]],[[[1,\"          \"],[1,[28,[32,0],[\"admin.docker.up_to_date\"],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[32,5],[[24,0,\"upgrade-button\"]],[[\"@action\",\"@disabled\",\"@translatedLabel\"],[[30,0,[\"upgrade\"]],[30,0,[\"upgradeDisabled\"]],[30,0,[\"upgradeButtonLabel\"]]]],null],[1,\"\\n        \"]],[]]]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[\"@repo\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/docker_manager/discourse/components/repo-status.js",
                "scope": () => [_i18n.default, _dIcon.default, _commitUrl.default, _formatDate.default, _newCommits.default, _dButton.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = RepoStatus;
});