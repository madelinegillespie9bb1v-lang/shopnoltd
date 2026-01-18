define("@ember/-internals/bootstrap/index", ["require"], function(_require) {
    "use strict";

    (function bootstrap() {
        // Bootstrap Node module
        if (typeof module === 'object' && typeof module.require === 'function') {
            module.exports = (0, _require.default)("ember").default;
        }
    })();
});