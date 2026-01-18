define("@ember/routing/lib/location-utils", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.getFullPath = getFullPath;
    _exports.getHash = getHash;
    _exports.getOrigin = getOrigin;
    _exports.getPath = getPath;
    _exports.getQuery = getQuery;
    _exports.replacePath = replacePath;
    /**
      @private
  
      Returns the current `location.pathname`, normalized for IE inconsistencies.
    */
    function getPath(location) {
        var pathname = location.pathname;
        // Various versions of IE/Opera don't always return a leading slash
        if (pathname[0] !== '/') {
            pathname = `/${pathname}`;
        }
        return pathname;
    }
    /**
      @private
  
      Returns the current `location.search`.
    */
    function getQuery(location) {
        return location.search;
    }
    /**
      @private
  
      Returns the hash or empty string
    */
    function getHash(location) {
        if (location.hash !== undefined) {
            return location.hash.substring(0);
        }
        return '';
    }

    function getFullPath(location) {
        return getPath(location) + getQuery(location) + getHash(location);
    }

    function getOrigin(location) {
        var origin = location.origin;
        // Older browsers, especially IE, don't have origin
        if (!origin) {
            origin = `${location.protocol}//${location.hostname}`;
            if (location.port) {
                origin += `:${location.port}`;
            }
        }
        return origin;
    }
    /**
      Replaces the current location, making sure we explicitly include the origin
      to prevent redirecting to a different origin.
  
      @private
    */
    function replacePath(location, path) {
        location.replace(getOrigin(location) + path);
    }
});