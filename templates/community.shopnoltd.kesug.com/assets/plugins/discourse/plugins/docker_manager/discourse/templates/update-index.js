define("discourse/plugins/docker_manager/discourse/templates/update-index", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="updates-heading">
          <h3>{{i18n "admin.docker.update_title"}}</h3>
          {{#unless this.outdated}}
            <DButton
              disabled={{this.upgradeAllButtonDisabled}}
              id="upgrade-all"
              class="btn btn-primary"
              type="button"
              {{on "click" this.upgradeAllButton}}
            >
              {{#if this.allUpToDate}}
                {{i18n "admin.docker.all_up_to_date"}}
              {{else}}
                {{i18n "admin.docker.update_all"}}
              {{/if}}
            </DButton>
          {{/unless}}
        </div>
  
        {{#if this.outdated}}
          <h2>{{i18n "admin.docker.outdated_image_header"}}</h2>
          <p>{{i18n "admin.docker.outdated_image_info"}}</p>
  
          {{! prettier-ignore }}
          <pre>
            cd /var/discourse
            git pull
            ./launcher rebuild app
          </pre>
          <p>
            <a
              href="https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325"
            >
              {{i18n "admin.docker.outdated_image_link"}}
            </a>
          </p>
        {{else}}
  
          <table class="table admin-repos" id="repos">
            <thead>
              <th style="width: 40%">{{i18n "admin.docker.repo.name"}}</th>
              <th>{{i18n "admin.docker.repo.commit_hash"}}</th>
              <th>{{i18n "admin.docker.repo.last_updated"}}</th>
              <th>{{i18n "admin.docker.repo.latest_version"}}</th>
              <th align="center">{{i18n "admin.docker.repo.status"}}</th>
            </thead>
            <tbody>
              {{#each this.model as |repo|}}
                <RepoStatus
                  @repo={{repo}}
                  @upgradingRepo={{repo.upgrading}}
                  @managerRepo={{this.managerRepo}}
                />
              {{/each}}
            </tbody>
          </table>
        {{/if}}
        */
        {
            "id": "LD2omxOf",
            "block": "[[[10,0],[14,0,\"updates-heading\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[28,[35,0],[\"admin.docker.update_title\"],null]],[13],[1,\"\\n\"],[41,[51,[30,0,[\"outdated\"]]],[[[1,\"    \"],[8,[39,2],[[16,\"disabled\",[30,0,[\"upgradeAllButtonDisabled\"]]],[24,1,\"upgrade-all\"],[24,0,\"btn btn-primary\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"upgradeAllButton\"]]],null]],null,[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"allUpToDate\"]],[[[1,\"        \"],[1,[28,[35,0],[\"admin.docker.all_up_to_date\"],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,0],[\"admin.docker.update_all\"],null]],[1,\"\\n\"]],[]]],[1,\"    \"]],[]]]]],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"outdated\"]],[[[1,\"  \"],[10,\"h2\"],[12],[1,[28,[35,0],[\"admin.docker.outdated_image_header\"],null]],[13],[1,\"\\n  \"],[10,2],[12],[1,[28,[35,0],[\"admin.docker.outdated_image_info\"],null]],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"pre\"],[12],[1,\"    cd /var/discourse\\n    git pull\\n    ./launcher rebuild app\\n  \"],[13],[1,\"\\n  \"],[10,2],[12],[1,\"\\n    \"],[10,3],[14,6,\"https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.docker.outdated_image_link\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"\\n  \"],[10,\"table\"],[14,0,\"table admin-repos\"],[14,1,\"repos\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"th\"],[14,5,\"width: 40%\"],[12],[1,[28,[35,0],[\"admin.docker.repo.name\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,0],[\"admin.docker.repo.commit_hash\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,0],[\"admin.docker.repo.last_updated\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,0],[\"admin.docker.repo.latest_version\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[14,\"align\",\"center\"],[12],[1,[28,[35,0],[\"admin.docker.repo.status\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"        \"],[8,[39,7],null,[[\"@repo\",\"@upgradingRepo\",\"@managerRepo\"],[[30,1],[30,1,[\"upgrading\"]],[30,0,[\"managerRepo\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"repo\"],false,[\"i18n\",\"unless\",\"d-button\",\"on\",\"if\",\"each\",\"-track-array\",\"repo-status\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/templates/update-index.hbs",
            "isStrictMode": false
        });
});