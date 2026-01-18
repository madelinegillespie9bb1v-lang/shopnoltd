define("discourse/plugins/docker_manager/discourse/helpers/commit-url", ["exports", "@ember/template"], function(_exports, _template) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = commitUrl;

    function commitUrl(cssClass, version, prettyVersion, url) {
        if (!prettyVersion) {
            return "";
        }
        if (!url) {
            return prettyVersion;
        }
        const repoUrl = url.substr(0, url.search(/(\.git)?$/));
        const description = `<a class='${cssClass} commit-hash' title='${version}' href='${repoUrl}/commit/${version}'>${prettyVersion}</a>`;
        return new _template.htmlSafe(description);
    }
});