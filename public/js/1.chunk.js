webpackJsonp([1],{

/***/ 596:
/*!*********************************************************!*\
  !*** ./resources/react/common/routes/PostList/index.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createRoutes;
	
	var _store = __webpack_require__(/*! ../../store */ 559);
	
	if (false) require.ensure = function (d, c) {
	  return c(require);
	};
	function createRoutes(store) {
	  return {
	    path: 'posts',
	    getComponents: function getComponents(location, cb) {
	      __webpack_require__.e/* nsure */(2, function (require) {
	        var PostPage = __webpack_require__(/*! ./containers/PostList */ 597).default;
	        var postReducer = __webpack_require__(/*! ./reducer */ 614).default;
	        (0, _store.injectAsyncReducer)(store, 'posts', postReducer);
	        cb(null, PostPage);
	      });
	    }
	  };
	}

/***/ },

/***/ 617:
/*!*****************************************************!*\
  !*** ./resources/react/common/routes/Post/index.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createRoutes;
	
	var _store = __webpack_require__(/*! ../../store */ 559);
	
	if (false) require.ensure = function (d, c) {
	  return c(require);
	};
	function createRoutes(store) {
	  return {
	    path: 'post/:slug',
	    getComponents: function getComponents(location, cb) {
	      __webpack_require__.e/* nsure */(3, function (require) {
	        var PostPage = __webpack_require__(/*! ./containers/PostPage */ 618).default;
	        var postReducer = __webpack_require__(/*! ./reducer */ 621).default;
	        (0, _store.injectAsyncReducer)(store, 'currentPost', postReducer);
	        cb(null, PostPage);
	      });
	    }
	  };
	}

/***/ },

/***/ 620:
/*!*******************************************************!*\
  !*** ./resources/react/common/components/NotFound.js ***!
  \*******************************************************/
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
	
	var NotFound = function NotFound() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_reactHelmet2.default, { title: 'Not Found' }),
	    _react2.default.createElement(
	      'h1',
	      null,
	      'Page Not Found!'
	    )
	  );
	};
	
	exports.default = NotFound;

/***/ },

/***/ 622:
/*!*********************************************************!*\
  !*** ./resources/react/common/routes/NotFound/index.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NotFound = __webpack_require__(/*! ../../components/NotFound */ 620);
	
	var _NotFound2 = _interopRequireDefault(_NotFound);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  path: '*',
	  component: _NotFound2.default
	};

/***/ }

});
//# sourceMappingURL=1.chunk.js.map