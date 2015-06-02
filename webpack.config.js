var path = require('path');
var webpack = require('webpack');
var join = path.join;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var plugins = [
  new webpack.ProvidePlugin({
      $: 'jquery',
      moment: 'moment-timezone',
      '_': 'underscore',
      Backbone: 'backbone',
      Pikaday: 'pikaday'
  }),
  //new CommonsChunkPlugin({
    //name: 'vendor',
    //filename: 'commons.js',
    //minChunks: 0
  //})
];

module.exports = {
  entry: {
    //vendor: [
      //'underscore',
      //'backbone',
      //'mustache',
      //'moment-timezone',
      //'pikaday'
    //],
    main: './src/index.js',
    page: './src/page.js'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [
      //{
        //test: /node_modules\/(console-polyfill|json3|es5-shim)\//,
        //loader: 'script-loader'
      //},
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: plugins
};
