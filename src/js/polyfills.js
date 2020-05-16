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



if (typeof Blob !== 'undefined' && (typeof FormData === 'undefined' || !FormData.prototype.keys)) {
    const global = typeof window === 'object'
        ? window
        : typeof self === 'object' ? self : this

    // keep a reference to native implementation
    const _FormData = global.FormData

    // To be monkey patched
    const _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send
    const _fetch = global.Request && global.fetch
    const _sendBeacon = global.navigator && global.navigator.sendBeacon

    // Unable to patch Request constructor correctly
    // const _Request = global.Request
    // only way is to use ES6 class extend
    // https://github.com/babel/babel/issues/1966

    const stringTag = global.Symbol && Symbol.toStringTag

    // Add missing stringTags to blob and files
    if (stringTag) {
        if (!Blob.prototype[stringTag]) {
            Blob.prototype[stringTag] = 'Blob'
        }

        if ('File' in global && !File.prototype[stringTag]) {
            File.prototype[stringTag] = 'File'
        }
    }

    // Fix so you can construct your own File
    try {
        new File([], '') // eslint-disable-line
    } catch (a) {
        global.File = function File(b, d, c) {
            const blob = new Blob(b, c)
            const t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date()

            Object.defineProperties(blob, {
                name: {
                    value: d
                },
                lastModifiedDate: {
                    value: t
                },
                lastModified: {
                    value: +t
                },
                toString: {
                    value() {
                        return '[object File]'
                    }
                }
            })

            if (stringTag) {
                Object.defineProperty(blob, stringTag, {
                    value: 'File'
                })
            }

            return blob
        }
    }

    function normalizeValue([name, value, filename]) {
        if (value instanceof Blob) {
            // Should always returns a new File instance
            // console.assert(fd.get(x) !== fd.get(x))
            value = new File([value], filename, {
                type: value.type,
                lastModified: value.lastModified
            })
        }

        return [name, value]
    }

    function ensureArgs(args, expected) {
        if (args.length < expected) {
            throw new TypeError(`${expected} argument required, but only ${args.length} present.`)
        }
    }

    function normalizeArgs(name, value, filename) {
        return value instanceof Blob
            // normalize name and filename if adding an attachment
            ? [String(name), value, filename !== undefined
                ? filename + '' // Cast filename to string if 3th arg isn't undefined
                : typeof value.name === 'string' // if name prop exist
                    ? value.name // Use File.name
                    : 'blob'] // otherwise fallback to Blob

            // If no attachment, just cast the args to strings
            : [String(name), String(value)]
    }

    // normalize linefeeds for textareas
    // https://html.spec.whatwg.org/multipage/form-elements.html#textarea-line-break-normalisation-transformation
    function normalizeLinefeeds(value) {
        return value.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n')
    }

    function each(arr, cb) {
        for (let i = 0; i < arr.length; i++) {
            cb(arr[i])
        }
    }
}