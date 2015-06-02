#### Demo Of Vendor Shimming in Webpack

- jQuery is provided from CDN but webpack automatically makes closure passing in `$` when it sees jQuery being used.
- console-polyfill, json3, es5-shim, and jquery-cookie are `require`d and made available for all bundles 
- Backbone, moment, pikaday, and underscore are bundled automatically when webpack sees them referenced => in `dist/`
```js
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(98), __webpack_require__(1)))
```
- advantages is all code is tracked via dependency graph and libraries need not be hardcoded in repo or attached to global scope
- future advantages is mulitiple bundles per page that reference the same libs (Backbone, underscore...) thos libs will be broken out by CommonsChunksPlugin so bundles do not have duplicate code
- Mustache templates can be removed from `<script>` tags and compiled from HTML files using the [mustache-loader](https://github.com/deepsweet/mustache-loader)

#### To Test
`npm i`
`npm i -g webpack`
run `webpack`
`open index.html` or `python -m SimpleHTTPServer`
