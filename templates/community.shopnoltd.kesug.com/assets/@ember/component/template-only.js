define("@ember/component/template-only", ["exports", "@glimmer/runtime"], function(_exports, _runtime) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
      @module @ember/component/template-only
      @public
    */

    // NOTES:
    //
    // 1. The generic here is for a *signature: a way to hang information for tools
    //    like Glint which can provide typey checking for component templates using
    //    information supplied via this generic. While it may appear useless on this
    //    class definition and extension, it is used by external tools and should
    //    not be removed.
    // 2. SAFETY: this cast is *throwing away* information that is not part of the
    //    public API and replacing it with something which has the same calling
    //    contract, but much less information (since we do not want to expose the
    //    internal APIs like `moduleName` etc.).
    // prettier-ignore
    var templateOnly = _runtime.templateOnlyComponent;
    var _default = _exports.default = templateOnly;
});