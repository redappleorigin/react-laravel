webpackJsonp([1],{

/***/ 0:
/*!*****************************************!*\
  !*** ./resources/react/server.entry.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _path = __webpack_require__(/*! path */ 615);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(/*! react */ 303);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 620);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 591);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 516);
	
	var _redial = __webpack_require__(/*! redial */ 299);
	
	var _aphrodite = __webpack_require__(/*! aphrodite */ 537);
	
	var _store = __webpack_require__(/*! ./common/store */ 624);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 583);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _createReducer = __webpack_require__(/*! ./createReducer */ 580);
	
	var _createReducer2 = _interopRequireDefault(_createReducer);
	
	var _routes = __webpack_require__(/*! ./routes */ 581);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _Html = __webpack_require__(/*! ./Html */ 626);
	
	var _Html2 = _interopRequireDefault(_Html);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var req = global.req;
	
	var store = (0, _store.configureStore)({
	    sourceRequest: {
	        protocol: req.headers['x-forwarded-proto'] || req.protocol,
	        host: req.headers.host
	    }
	});
	
	var routes = (0, _routes2.default)(store);
	var history = (0, _reactRouter.createMemoryHistory)(req.originalUrl);
	var dispatch = store.dispatch;
	
	
	(0, _reactRouter.match)({ routes: routes, history: history }, function (err, redirectLocation, renderProps) {
	    if (err) {
	        console.error(err);
	        return print('Internal server error');
	    }
	
	    if (!renderProps) {
	        return print('Not found');
	    }
	
	    var components = renderProps.components;
	
	    // Define locals to be provided to all lifecycle hooks:
	    var locals = {
	        path: renderProps.location.pathname,
	        query: renderProps.location.query,
	        params: renderProps.params,
	
	        // Allow lifecycle hooks to dispatch Redux actions:
	        dispatch: dispatch
	    };
	
	    (0, _redial.trigger)('fetch', components, locals).then(function () {
	        var initialState = store.getState();
	        var InitialView = _react2.default.createElement(
	            _reactRedux.Provider,
	            { store: store },
	            _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	        );
	
	        // just call html = ReactDOM.renderToString(InitialView)
	        // to if you don't want Aphrodite. Also change renderFullPage
	        // accordingly
	        var data = _aphrodite.StyleSheetServer.renderStatic(function () {
	            return _server2.default.renderToString(InitialView);
	        });
	        var head = _reactHelmet2.default.rewind();
	
	        var props = _extends({
	            head: head,
	            initialState: initialState
	        }, data);
	
	        var markup = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, props));
	
	        var html = ['<!DOCTYPE html>', markup].join("\n");
	
	        print(html);
	
	        // print(`
	        //     <!DOCTYPE html>
	        //     <html lang="en">
	        //     <head>
	        //     <meta charSet="utf-8" />
	        //     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
	        //     ${head.title.toString()}
	        //     <meta name="viewport" content="width=device-width, initial-scale=1" />
	        //     ${head.meta.toString()}
	        //     ${head.link.toString()}
	        //     <style>
	        //     html {
	        //         box-sizing: border-box
	        //     }
	        //
	        //     *,
	        //     *::before,
	        //     *::after {
	        //         box-sizing: border-box
	        //     }
	        //
	        //     html {
	        //         font-size: 100%;
	        //         -ms-overflow-style: scrollbar;
	        //         -webkit-tap-highlight-color: rgba(0,0,0,0);
	        //         height: 100%;
	        //     }
	        //
	        //     body {
	        //         font-size: 1rem;
	        //         background-color: #fff;
	        //         color: #555;
	        //         -webkit-font-smoothing: antialiased;
	        //         -moz-osx-font-smoothing: grayscale;
	        //         font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
	        //     }
	        //
	        //     h1,h2,h3,h4,h5,h6 {
	        //         margin: 0;
	        //         padding: 0;
	        //     }
	        //     </style>
	        //     <style data-aphrodite>${data.css.content}</style>
	        //     </head>
	        //     <body>
	        //     <div id="root">${data.html}</div>
	        //     <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
	        //     <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
	        //     <script src="js/common.js"></script>
	        //     <script async src="js/Client.js" ></script>
	        //     </body>
	        //     </html>
	        // `)
	    }).catch(function (e) {
	        return console.log(e);
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 615:
/*!************************!*\
  !*** ./~/path/path.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	var process = process || {};
	(function () {
	  "use strict";
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	var isWindows = process.platform === 'win32';
	var util = __webpack_require__(/*! util */ 616);
	
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	
	if (isWindows) {
	  // Regex to split a windows path into three parts: [*, device, slash,
	  // tail] windows-only
	  var splitDeviceRe =
	      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	
	  // Regex to split the tail part of the above into [*, dir, basename, ext]
	  var splitTailRe =
	      /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
	
	  // Function to split a filename into [root, dir, basename, ext]
	  // windows version
	  var splitPath = function(filename) {
	    // Separate device+slash from tail
	    var result = splitDeviceRe.exec(filename),
	        device = (result[1] || '') + (result[2] || ''),
	        tail = result[3] || '';
	    // Split the tail into dir, basename and extension
	    var result2 = splitTailRe.exec(tail),
	        dir = result2[1],
	        basename = result2[2],
	        ext = result2[3];
	    return [device, dir, basename, ext];
	  };
	
	  var normalizeUNCRoot = function(device) {
	    return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
	  };
	
	  // path.resolve([from ...], to)
	  // windows version
	  exports.resolve = function() {
	    var resolvedDevice = '',
	        resolvedTail = '',
	        resolvedAbsolute = false;
	
	    for (var i = arguments.length - 1; i >= -1; i--) {
	      var path;
	      if (i >= 0) {
	        path = arguments[i];
	      } else if (!resolvedDevice) {
	        path = process.cwd();
	      } else {
	        // Windows has the concept of drive-specific current working
	        // directories. If we've resolved a drive letter but not yet an
	        // absolute path, get cwd for that drive. We're sure the device is not
	        // an unc path at this points, because unc paths are always absolute.
	        path = process.env['=' + resolvedDevice];
	        // Verify that a drive-local cwd was found and that it actually points
	        // to our drive. If not, default to the drive's root.
	        if (!path || path.substr(0, 3).toLowerCase() !==
	            resolvedDevice.toLowerCase() + '\\') {
	          path = resolvedDevice + '\\';
	        }
	      }
	
	      // Skip empty and invalid entries
	      if (!util.isString(path)) {
	        throw new TypeError('Arguments to path.resolve must be strings');
	      } else if (!path) {
	        continue;
	      }
	
	      var result = splitDeviceRe.exec(path),
	          device = result[1] || '',
	          isUnc = device && device.charAt(1) !== ':',
	          isAbsolute = exports.isAbsolute(path),
	          tail = result[3];
	
	      if (device &&
	          resolvedDevice &&
	          device.toLowerCase() !== resolvedDevice.toLowerCase()) {
	        // This path points to another device so it is not applicable
	        continue;
	      }
	
	      if (!resolvedDevice) {
	        resolvedDevice = device;
	      }
	      if (!resolvedAbsolute) {
	        resolvedTail = tail + '\\' + resolvedTail;
	        resolvedAbsolute = isAbsolute;
	      }
	
	      if (resolvedDevice && resolvedAbsolute) {
	        break;
	      }
	    }
	
	    // Convert slashes to backslashes when `resolvedDevice` points to an UNC
	    // root. Also squash multiple slashes into a single one where appropriate.
	    if (isUnc) {
	      resolvedDevice = normalizeUNCRoot(resolvedDevice);
	    }
	
	    // At this point the path should be resolved to a full absolute path,
	    // but handle relative paths to be safe (might happen when process.cwd()
	    // fails)
	
	    // Normalize the tail path
	
	    function f(p) {
	      return !!p;
	    }
	
	    resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/).filter(f),
	                                  !resolvedAbsolute).join('\\');
	
	    return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
	           '.';
	  };
	
	  // windows version
	  exports.normalize = function(path) {
	    var result = splitDeviceRe.exec(path),
	        device = result[1] || '',
	        isUnc = device && device.charAt(1) !== ':',
	        isAbsolute = exports.isAbsolute(path),
	        tail = result[3],
	        trailingSlash = /[\\\/]$/.test(tail);
	
	    // If device is a drive letter, we'll normalize to lower case.
	    if (device && device.charAt(1) === ':') {
	      device = device[0].toLowerCase() + device.substr(1);
	    }
	
	    // Normalize the tail path
	    tail = normalizeArray(tail.split(/[\\\/]+/).filter(function(p) {
	      return !!p;
	    }), !isAbsolute).join('\\');
	
	    if (!tail && !isAbsolute) {
	      tail = '.';
	    }
	    if (tail && trailingSlash) {
	      tail += '\\';
	    }
	
	    // Convert slashes to backslashes when `device` points to an UNC root.
	    // Also squash multiple slashes into a single one where appropriate.
	    if (isUnc) {
	      device = normalizeUNCRoot(device);
	    }
	
	    return device + (isAbsolute ? '\\' : '') + tail;
	  };
	
	  // windows version
	  exports.isAbsolute = function(path) {
	    var result = splitDeviceRe.exec(path),
	        device = result[1] || '',
	        isUnc = !!device && device.charAt(1) !== ':';
	    // UNC paths are always absolute
	    return !!result[2] || isUnc;
	  };
	
	  // windows version
	  exports.join = function() {
	    function f(p) {
	      if (!util.isString(p)) {
	        throw new TypeError('Arguments to path.join must be strings');
	      }
	      return p;
	    }
	
	    var paths = Array.prototype.filter.call(arguments, f);
	    var joined = paths.join('\\');
	
	    // Make sure that the joined path doesn't start with two slashes, because
	    // normalize() will mistake it for an UNC path then.
	    //
	    // This step is skipped when it is very clear that the user actually
	    // intended to point at an UNC path. This is assumed when the first
	    // non-empty string arguments starts with exactly two slashes followed by
	    // at least one more non-slash character.
	    //
	    // Note that for normalize() to treat a path as an UNC path it needs to
	    // have at least 2 components, so we don't filter for that here.
	    // This means that the user can use join to construct UNC paths from
	    // a server name and a share name; for example:
	    //   path.join('//server', 'share') -> '\\\\server\\share\')
	    if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
	      joined = joined.replace(/^[\\\/]{2,}/, '\\');
	    }
	
	    return exports.normalize(joined);
	  };
	
	  // path.relative(from, to)
	  // it will solve the relative path from 'from' to 'to', for instance:
	  // from = 'C:\\orandea\\test\\aaa'
	  // to = 'C:\\orandea\\impl\\bbb'
	  // The output of the function should be: '..\\..\\impl\\bbb'
	  // windows version
	  exports.relative = function(from, to) {
	    from = exports.resolve(from);
	    to = exports.resolve(to);
	
	    // windows is not case sensitive
	    var lowerFrom = from.toLowerCase();
	    var lowerTo = to.toLowerCase();
	
	    function trim(arr) {
	      var start = 0;
	      for (; start < arr.length; start++) {
	        if (arr[start] !== '') break;
	      }
	
	      var end = arr.length - 1;
	      for (; end >= 0; end--) {
	        if (arr[end] !== '') break;
	      }
	
	      if (start > end) return [];
	      return arr.slice(start, end + 1);
	    }
	
	    var toParts = trim(to.split('\\'));
	
	    var lowerFromParts = trim(lowerFrom.split('\\'));
	    var lowerToParts = trim(lowerTo.split('\\'));
	
	    var length = Math.min(lowerFromParts.length, lowerToParts.length);
	    var samePartsLength = length;
	    for (var i = 0; i < length; i++) {
	      if (lowerFromParts[i] !== lowerToParts[i]) {
	        samePartsLength = i;
	        break;
	      }
	    }
	
	    if (samePartsLength == 0) {
	      return to;
	    }
	
	    var outputParts = [];
	    for (var i = samePartsLength; i < lowerFromParts.length; i++) {
	      outputParts.push('..');
	    }
	
	    outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	    return outputParts.join('\\');
	  };
	
	  exports.sep = '\\';
	  exports.delimiter = ';';
	
	} else /* posix */ {
	
	  // Split a filename into [root, dir, basename, ext], unix version
	  // 'root' is just a slash, or nothing.
	  var splitPathRe =
	      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	  var splitPath = function(filename) {
	    return splitPathRe.exec(filename).slice(1);
	  };
	
	  // path.resolve([from ...], to)
	  // posix version
	  exports.resolve = function() {
	    var resolvedPath = '',
	        resolvedAbsolute = false;
	
	    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	      var path = (i >= 0) ? arguments[i] : process.cwd();
	
	      // Skip empty and invalid entries
	      if (!util.isString(path)) {
	        throw new TypeError('Arguments to path.resolve must be strings');
	      } else if (!path) {
	        continue;
	      }
	
	      resolvedPath = path + '/' + resolvedPath;
	      resolvedAbsolute = path.charAt(0) === '/';
	    }
	
	    // At this point the path should be resolved to a full absolute path, but
	    // handle relative paths to be safe (might happen when process.cwd() fails)
	
	    // Normalize the path
	    resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
	      return !!p;
	    }), !resolvedAbsolute).join('/');
	
	    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	  };
	
	  // path.normalize(path)
	  // posix version
	  exports.normalize = function(path) {
	    var isAbsolute = exports.isAbsolute(path),
	        trailingSlash = path[path.length - 1] === '/',
	        segments = path.split('/'),
	        nonEmptySegments = [];
	
	    // Normalize the path
	    for (var i = 0; i < segments.length; i++) {
	      if (segments[i]) {
	        nonEmptySegments.push(segments[i]);
	      }
	    }
	    path = normalizeArray(nonEmptySegments, !isAbsolute).join('/');
	
	    if (!path && !isAbsolute) {
	      path = '.';
	    }
	    if (path && trailingSlash) {
	      path += '/';
	    }
	
	    return (isAbsolute ? '/' : '') + path;
	  };
	
	  // posix version
	  exports.isAbsolute = function(path) {
	    return path.charAt(0) === '/';
	  };
	
	  // posix version
	  exports.join = function() {
	    var path = '';
	    for (var i = 0; i < arguments.length; i++) {
	      var segment = arguments[i];
	      if (!util.isString(segment)) {
	        throw new TypeError('Arguments to path.join must be strings');
	      }
	      if (segment) {
	        if (!path) {
	          path += segment;
	        } else {
	          path += '/' + segment;
	        }
	      }
	    }
	    return exports.normalize(path);
	  };
	
	
	  // path.relative(from, to)
	  // posix version
	  exports.relative = function(from, to) {
	    from = exports.resolve(from).substr(1);
	    to = exports.resolve(to).substr(1);
	
	    function trim(arr) {
	      var start = 0;
	      for (; start < arr.length; start++) {
	        if (arr[start] !== '') break;
	      }
	
	      var end = arr.length - 1;
	      for (; end >= 0; end--) {
	        if (arr[end] !== '') break;
	      }
	
	      if (start > end) return [];
	      return arr.slice(start, end + 1);
	    }
	
	    var fromParts = trim(from.split('/'));
	    var toParts = trim(to.split('/'));
	
	    var length = Math.min(fromParts.length, toParts.length);
	    var samePartsLength = length;
	    for (var i = 0; i < length; i++) {
	      if (fromParts[i] !== toParts[i]) {
	        samePartsLength = i;
	        break;
	      }
	    }
	
	    var outputParts = [];
	    for (var i = samePartsLength; i < fromParts.length; i++) {
	      outputParts.push('..');
	    }
	
	    outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	    return outputParts.join('/');
	  };
	
	  exports.sep = '/';
	  exports.delimiter = ':';
	}
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	
	exports.exists = util.deprecate(function(path, callback) {
	  __webpack_require__(/*! fs */ 619).exists(path, callback);
	}, 'path.exists is now called `fs.exists`.');
	
	
	exports.existsSync = util.deprecate(function(path) {
	  return __webpack_require__(/*! fs */ 619).existsSync(path);
	}, 'path.existsSync is now called `fs.existsSync`.');
	
	
	if (isWindows) {
	  exports._makeLong = function(path) {
	    // Note: this will *probably* throw somewhere.
	    if (!util.isString(path))
	      return path;
	
	    if (!path) {
	      return '';
	    }
	
	    var resolvedPath = exports.resolve(path);
	
	    if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
	      // path is local filesystem path, which needs to be converted
	      // to long UNC path.
	      return '\\\\?\\' + resolvedPath;
	    } else if (/^\\\\[^?.]/.test(resolvedPath)) {
	      // path is network UNC path, which needs to be converted
	      // to long UNC path.
	      return '\\\\?\\UNC\\' + resolvedPath.substring(2);
	    }
	
	    return path;
	  };
	} else {
	  exports._makeLong = function(path) {
	    return path;
	  };
	}
	}());


/***/ },

/***/ 616:
/*!************************!*\
  !*** ./~/util/util.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ 617);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(/*! inherits */ 618);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! ./~/process/browser.js */ 295)))

/***/ },

/***/ 617:
/*!*******************************************!*\
  !*** ./~/util/support/isBufferBrowser.js ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },

/***/ 618:
/*!****************************************!*\
  !*** ./~/inherits/inherits_browser.js ***!
  \****************************************/
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },

/***/ 619:
/*!*******************************************!*\
  !*** ./~/node-libs-browser/mock/empty.js ***!
  \*******************************************/
/***/ function(module, exports) {



/***/ },

/***/ 620:
/*!*******************************!*\
  !*** ./~/react-dom/server.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! react/lib/ReactDOMServer */ 621);


/***/ },

/***/ 621:
/*!***************************************!*\
  !*** ./~/react/lib/ReactDOMServer.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMServer
	 */
	
	'use strict';
	
	var ReactDefaultInjection = __webpack_require__(/*! ./ReactDefaultInjection */ 339);
	var ReactServerRendering = __webpack_require__(/*! ./ReactServerRendering */ 622);
	var ReactVersion = __webpack_require__(/*! ./ReactVersion */ 332);
	
	ReactDefaultInjection.inject();
	
	var ReactDOMServer = {
	  renderToString: ReactServerRendering.renderToString,
	  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
	  version: ReactVersion
	};
	
	module.exports = ReactDOMServer;

/***/ },

/***/ 622:
/*!*********************************************!*\
  !*** ./~/react/lib/ReactServerRendering.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactServerRendering
	 */
	'use strict';
	
	var _prodInvariant = __webpack_require__(/*! ./reactProdInvariant */ 308);
	
	var ReactDOMContainerInfo = __webpack_require__(/*! ./ReactDOMContainerInfo */ 464);
	var ReactDefaultBatchingStrategy = __webpack_require__(/*! ./ReactDefaultBatchingStrategy */ 437);
	var ReactElement = __webpack_require__(/*! ./ReactElement */ 310);
	var ReactInstrumentation = __webpack_require__(/*! ./ReactInstrumentation */ 359);
	var ReactMarkupChecksum = __webpack_require__(/*! ./ReactMarkupChecksum */ 466);
	var ReactReconciler = __webpack_require__(/*! ./ReactReconciler */ 365);
	var ReactServerBatchingStrategy = __webpack_require__(/*! ./ReactServerBatchingStrategy */ 623);
	var ReactServerRenderingTransaction = __webpack_require__(/*! ./ReactServerRenderingTransaction */ 431);
	var ReactUpdates = __webpack_require__(/*! ./ReactUpdates */ 356);
	
	var emptyObject = __webpack_require__(/*! fbjs/lib/emptyObject */ 320);
	var instantiateReactComponent = __webpack_require__(/*! ./instantiateReactComponent */ 423);
	var invariant = __webpack_require__(/*! fbjs/lib/invariant */ 309);
	
	/**
	 * @param {ReactElement} element
	 * @return {string} the HTML markup
	 */
	function renderToStringImpl(element, makeStaticMarkup) {
	  var transaction;
	  try {
	    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
	
	    transaction = ReactServerRenderingTransaction.getPooled(makeStaticMarkup);
	
	    return transaction.perform(function () {
	      if (process.env.NODE_ENV !== 'production') {
	        ReactInstrumentation.debugTool.onBeginFlush();
	      }
	      var componentInstance = instantiateReactComponent(element);
	      var markup = ReactReconciler.mountComponent(componentInstance, transaction, null, ReactDOMContainerInfo(), emptyObject);
	      if (process.env.NODE_ENV !== 'production') {
	        ReactInstrumentation.debugTool.onUnmountComponent(componentInstance._debugID);
	        ReactInstrumentation.debugTool.onEndFlush();
	      }
	      if (!makeStaticMarkup) {
	        markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
	      }
	      return markup;
	    }, null);
	  } finally {
	    ReactServerRenderingTransaction.release(transaction);
	    // Revert to the DOM batching strategy since these two renderers
	    // currently share these stateful modules.
	    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
	  }
	}
	
	/**
	 * Render a ReactElement to its initial HTML. This should only be used on the
	 * server.
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
	 */
	function renderToString(element) {
	  !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : _prodInvariant('46') : void 0;
	  return renderToStringImpl(element, false);
	}
	
	/**
	 * Similar to renderToString, except this doesn't create extra DOM attributes
	 * such as data-react-id that React uses internally.
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
	 */
	function renderToStaticMarkup(element) {
	  !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : _prodInvariant('47') : void 0;
	  return renderToStringImpl(element, true);
	}
	
	module.exports = {
	  renderToString: renderToString,
	  renderToStaticMarkup: renderToStaticMarkup
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 295)))

/***/ },

/***/ 623:
/*!****************************************************!*\
  !*** ./~/react/lib/ReactServerBatchingStrategy.js ***!
  \****************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactServerBatchingStrategy
	 */
	
	'use strict';
	
	var ReactServerBatchingStrategy = {
	  isBatchingUpdates: false,
	  batchedUpdates: function (callback) {
	    // Don't do anything here. During the server rendering we don't want to
	    // schedule any updates. We will simply ignore them.
	  }
	};
	
	module.exports = ReactServerBatchingStrategy;

/***/ },

/***/ 624:
/*!*****************************************!*\
  !*** ./resources/react/common/store.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.configureStore = configureStore;
	exports.injectAsyncReducer = injectAsyncReducer;
	
	var _redux = __webpack_require__(/*! redux */ 523);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 560);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _axios = __webpack_require__(/*! axios */ 561);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _createReducer = __webpack_require__(/*! ./createReducer */ 625);
	
	var _createReducer2 = _interopRequireDefault(_createReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(initialState) {
	  var store = (0, _redux.createStore)((0, _createReducer2.default)(), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument({ axios: _axios2.default })), process.env.NODE_ENV === 'development' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
	    return f;
	  }));
	
	  store.asyncReducers = {};
	
	  if (process.env.NODE_ENV === 'development') {
	    if (false) {
	      module.hot.accept('./createReducer', function () {
	        return store.replaceReducer(require('./createReducer').default);
	      });
	    }
	  }
	
	  return store;
	}
	
	function injectAsyncReducer(store, name, asyncReducer) {
	  store.asyncReducers[name] = asyncReducer;
	  store.replaceReducer((0, _createReducer2.default)(store.asyncReducers));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 295)))

/***/ },

/***/ 625:
/*!*************************************************!*\
  !*** ./resources/react/common/createReducer.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createReducer;
	
	var _redux = __webpack_require__(/*! redux */ 523);
	
	var sourceRequest = function sourceRequest() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {
	    host: '',
	    protocol: ''
	  } : arguments[0];
	  var action = arguments[1];
	  return state;
	};
	
	// Only combine reducers needed for initial render, others will be
	// added async
	function createReducer(asyncReducers) {
	  return (0, _redux.combineReducers)(_extends({
	    sourceRequest: sourceRequest
	  }, asyncReducers));
	}

/***/ },

/***/ 626:
/*!*********************************!*\
  !*** ./resources/react/Html.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 303);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 583);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	// This is only used for server rendering!!!
	var Html = function Html(_ref) {
	    var head = _ref.head;
	    var css = _ref.css;
	    var initialState = _ref.initialState;
	
	    var props = _objectWithoutProperties(_ref, ['head', 'css', 'initialState']);
	
	    var attrs = head.htmlAttributes && head.htmlAttributes.toComponent() || [];
	    var title = head.title && head.title.toComponent() || [];
	    var meta = head.meta && head.meta.toComponent() || [];
	    var link = head.link && head.link.toComponent() || [];
	    // const script = head.script && head.script.toComponent() || [];
	
	    return _react2.default.createElement(
	        'html',
	        attrs,
	        _react2.default.createElement(
	            'head',
	            null,
	            title,
	            meta,
	            link,
	            _react2.default.createElement(
	                'style',
	                null,
	                '\n                    body {\n                        font-family: \'Lato\';\n                    }\n\n                    .fa-btn {\n                        margin-right: 6px;\n                    }\n                '
	            )
	        ),
	        _react2.default.createElement(
	            'body',
	            { id: 'app-layout' },
	            _react2.default.createElement('div', {
	                id: 'root',
	                dangerouslySetInnerHTML: { __html: props.html }
	            }),
	            _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.renderedClassNames = ' + JSON.stringify(css.renderedClassNames) + ';' } }),
	            _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.INITIAL_STATE = ' + JSON.stringify(initialState) + ';' } }),
	            _react2.default.createElement('script', { src: 'js/common.js' }),
	            _react2.default.createElement('script', { src: 'js/Client.js' }),
	            _react2.default.createElement('script', {
	                src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js',
	                integrity: 'sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb',
	                crossOrigin: 'anonymous'
	            }),
	            _react2.default.createElement('script', {
	                src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js',
	                integrity: 'sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS',
	                crossOrigin: 'anonymous'
	            })
	        )
	    );
	};
	
	exports.default = Html;

/***/ }

});
//# sourceMappingURL=Server.js.map