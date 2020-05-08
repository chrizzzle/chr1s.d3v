if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        var ce = new window.CustomEvent('test', { cancelable: true });
        ce.preventDefault();
        if (ce.defaultPrevented !== true) {
            // IE has problems with .preventDefault() on custom events
            // http://stackoverflow.com/questions/23349191
            throw new Error('Could not prevent default');
        }
    } catch (e) {
        var CustomEvent = function(event, params) {
            var evt, origPrevent;
            params = params || {};
            params.bubbles = !!params.bubbles;
            params.cancelable = !!params.cancelable;

            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(
                event,
                params.bubbles,
                params.cancelable,
                params.detail
            );
            origPrevent = evt.preventDefault;
            evt.preventDefault = function() {
                origPrevent.call(this);
                try {
                    Object.defineProperty(this, 'defaultPrevented', {
                        get: function() {
                            return true;
                        }
                    });
                } catch (e) {
                    this.defaultPrevented = true;
                }
            };
            return evt;
        };

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent; // expose definition to window
    }
})();

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}