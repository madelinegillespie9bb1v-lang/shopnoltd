define("@ember/runloop/index", ["exports", "@ember/debug", "@ember/-internals/error-handling", "@ember/-internals/metal", "backburner.js"], function(_exports, _debug, _errorHandling, _metal, _backburner2) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports._backburner = void 0;
    _exports._cancelTimers = _cancelTimers;
    _exports._getCurrentRunLoop = _getCurrentRunLoop;
    _exports._hasScheduledTimers = _hasScheduledTimers;
    _exports._rsvpErrorQueue = _exports._queues = void 0;
    _exports.begin = begin;
    _exports.bind = bind;
    _exports.cancel = cancel;
    _exports.debounce = debounce;
    _exports.end = end;
    _exports.join = join;
    _exports.later = later;
    _exports.next = next;
    _exports.once = once;
    _exports.run = run;
    _exports.schedule = schedule;
    _exports.scheduleOnce = scheduleOnce;
    _exports.throttle = throttle;
    var currentRunLoop = null;

    function _getCurrentRunLoop() {
        return currentRunLoop;
    }

    function onBegin(current) {
        currentRunLoop = current;
    }

    function onEnd(_current, next) {
        currentRunLoop = next;
        (0, _metal.flushAsyncObservers)();
    }

    function flush(queueName, next) {
        if (queueName === 'render' || queueName === _rsvpErrorQueue) {
            (0, _metal.flushAsyncObservers)();
        }
        next();
    }
    var _rsvpErrorQueue = _exports._rsvpErrorQueue = `${Math.random()}${Date.now()}`.replace('.', '');
    /**
      Array of named queues. This array determines the order in which queues
      are flushed at the end of the RunLoop. You can define your own queues by
      simply adding the queue name to this array. Normally you should not need
      to inspect or modify this property.
  
      @property queues
      @type Array
      @default ['actions', 'destroy']
      @private
    */
    var _queues = _exports._queues = ['actions',
        // used in router transitions to prevent unnecessary loading state entry
        // if all context promises resolve on the 'actions' queue first
        'routerTransitions', 'render', 'afterRender', 'destroy',
        // used to re-throw unhandled RSVP rejection errors specifically in this
        // position to avoid breaking anything rendered in the other sections
        _rsvpErrorQueue
    ];
    /**
     * @internal
     * @private
     */
    var _backburner = _exports._backburner = new _backburner2.default(_queues, {
        defaultQueue: 'actions',
        onBegin,
        onEnd,
        onErrorTarget: _errorHandling.onErrorTarget,
        onErrorMethod: 'onerror',
        flush
    });

    function run() {
        // @ts-expect-error TS doesn't like our spread args
        return _backburner.run(...arguments);
    }

    function join(methodOrTarget, methodOrArg) {
        for (var _len = arguments.length, additionalArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            additionalArgs[_key - 2] = arguments[_key];
        }
        return _backburner.join(methodOrTarget, methodOrArg, ...additionalArgs);
    }

    function bind() {
        for (var _len2 = arguments.length, curried = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            curried[_key2] = arguments[_key2];
        }
        (false && !(function(methodOrTarget, methodOrArg) {
            // Applies the same logic as backburner parseArgs for detecting if a method
            // is actually being passed.
            var length = arguments.length;
            if (length === 0) {
                return false;
            } else if (length === 1) {
                return typeof methodOrTarget === 'function';
            } else {
                return typeof methodOrArg === 'function' ||
                    // second argument is a function
                    methodOrTarget !== null && typeof methodOrArg === 'string' && methodOrArg in methodOrTarget ||
                    // second argument is the name of a method in first argument
                    typeof methodOrTarget === 'function' //first argument is a function
                ;
            }
            // @ts-expect-error TS doesn't like our spread args
        }(...curried)) && (0, _debug.assert)('could not find a suitable method to bind', function(methodOrTarget, methodOrArg) {
            var length = arguments.length;
            if (length === 0) {
                return false;
            } else if (length === 1) {
                return typeof methodOrTarget === 'function';
            } else {
                return typeof methodOrArg === 'function' || methodOrTarget !== null && typeof methodOrArg === 'string' && methodOrArg in methodOrTarget || typeof methodOrTarget === 'function';
            }
        }(...curried))); // @ts-expect-error TS doesn't like our spread args
        return function() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }
            return join(...curried.concat(args));
        };
    }
    /**
      Begins a new RunLoop. Any deferred actions invoked after the begin will
      be buffered until you invoke a matching call to `end()`. This is
      a lower-level way to use a RunLoop instead of using `run()`.
  
      ```javascript
      import { begin, end } from '@ember/runloop';
  
      begin();
      // code to be executed within a RunLoop
      end();
      ```
  
      @method begin
      @static
      @for @ember/runloop
      @return {void}
      @public
    */
    function begin() {
        _backburner.begin();
    }
    /**
      Ends a RunLoop. This must be called sometime after you call
      `begin()` to flush any deferred actions. This is a lower-level way
      to use a RunLoop instead of using `run()`.
  
      ```javascript
      import { begin, end } from '@ember/runloop';
  
      begin();
      // code to be executed within a RunLoop
      end();
      ```
  
      @method end
      @static
      @for @ember/runloop
      @return {void}
      @public
    */
    function end() {
        _backburner.end();
    }

    function schedule() {
        // @ts-expect-error TS doesn't like the rest args here
        return _backburner.schedule(...arguments);
    }
    // Used by global test teardown
    function _hasScheduledTimers() {
        return _backburner.hasTimers();
    }
    // Used by global test teardown
    function _cancelTimers() {
        _backburner.cancelTimers();
    }

    function later() {
        return _backburner.later(...arguments);
    }

    function once() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }
        // @ts-expect-error TS doesn't like the rest args here
        return _backburner.scheduleOnce('actions', ...args);
    }

    function scheduleOnce() {
        // @ts-expect-error TS doesn't like the rest args here
        return _backburner.scheduleOnce(...arguments);
    }

    function next() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }
        return _backburner.later(...args, 1);
    }
    /**
      Cancels a scheduled item. Must be a value returned by `later()`,
      `once()`, `scheduleOnce()`, `next()`, `debounce()`, or
      `throttle()`.
  
      ```javascript
      import {
        next,
        cancel,
        later,
        scheduleOnce,
        once,
        throttle,
        debounce
      } from '@ember/runloop';
  
      let runNext = next(myContext, function() {
        // will not be executed
      });
  
      cancel(runNext);
  
      let runLater = later(myContext, function() {
        // will not be executed
      }, 500);
  
      cancel(runLater);
  
      let runScheduleOnce = scheduleOnce('afterRender', myContext, function() {
        // will not be executed
      });
  
      cancel(runScheduleOnce);
  
      let runOnce = once(myContext, function() {
        // will not be executed
      });
  
      cancel(runOnce);
  
      let throttle = throttle(myContext, function() {
        // will not be executed
      }, 1, false);
  
      cancel(throttle);
  
      let debounce = debounce(myContext, function() {
        // will not be executed
      }, 1);
  
      cancel(debounce);
  
      let debounceImmediate = debounce(myContext, function() {
        // will be executed since we passed in true (immediate)
      }, 100, true);
  
      // the 100ms delay until this method can be called again will be canceled
      cancel(debounceImmediate);
      ```
  
      @method cancel
      @static
      @for @ember/runloop
      @param {Object} [timer] Timer object to cancel
      @return {Boolean} true if canceled or false/undefined if it wasn't found
      @public
    */
    function cancel(timer) {
        return _backburner.cancel(timer);
    }

    function debounce() {
        // @ts-expect-error TS doesn't like the rest args here
        return _backburner.debounce(...arguments);
    }

    function throttle() {
        // @ts-expect-error TS doesn't like the rest args here
        return _backburner.throttle(...arguments);
    }
});