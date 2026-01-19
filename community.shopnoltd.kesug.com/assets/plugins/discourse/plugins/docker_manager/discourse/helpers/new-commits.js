define("discourse/plugins/docker_manager/discourse/helpers/new-commits", ["exports", "@ember/component/helper", "@ember/template", "I18n"], function(_exports, _helper, _template, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _helper.helper)(function(params) {
        const [commitsBehind, oldSha, newSha, url] = params;
        if (!commitsBehind) {
            return "";
        }
        if (parseInt(commitsBehind, 10) === 0) {
            return "";
        }
        let description = _I18n.default.t("admin.docker.commits", {
            count: commitsBehind
        });
        if (!url) {
            return description;
        }
        const _url = url.substr(0, url.search(/(\.git)?$/));
        description = `<a href='${_url}/compare/${oldSha}...${newSha}'>${description}</a>`;
        return new _template.htmlSafe(description);
    });
});