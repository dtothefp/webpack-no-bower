var path = require('path');
var webpack = require('webpack');
var join = path.join;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var plugins = [
  new webpack.ProvidePlugin({
      JSON: 'JSON',
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment-timezone',
      'window.jquery': 'jquery',
      'Backbone.Validation': 'backbone-validation',
      Mustache: 'mustache',
      '_': 'lodash',
      Backbone: 'backbone',
      Pikaday: 'pikaday',
      Waypoint: 'waypoints',
      'global.moment': 'moment-timezone',
      'global._': 'lodash',
      'global.Backbone': 'backbone',
      'global.Mustache': 'mustache',
      'global.Pikaday': 'pikaday',
      'global.Waypoint': 'waypoints'
  }),
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.FileAppendPlugin(['/src/waypoint.js'])
  ]),
  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: 0
  })
];

module.exports = {
  entry: {
    vendor: [
      'jquery',
      'jquery.cookie',
      'console-polyfill',
      'es5-shim',
      'json3',
      'mustache',
      'moment-timezone',
      'lodash',
      'backbone',
      'backbone-validation',
      'pikaday',
      'waypoints'
    ],
    moment: './src/moment.js',
    mustache: './src/mustache.js',
    lodash: './src/lodash.js',
    backbone: './src/backbone.js',
    pikaday: './src/pikaday.js',
    waypoints: './src/waypoints.js'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: {
    jquery: 'jQuery',
    JSON: 'JSON'
  },
  resolve: {
    alias: {
      underscore: 'lodash'
    }
  },
  module: {
    loaders: [
      {
        test: /node_modules\/waypoints\//,
        loader: 'imports?window=>{}!exports?window.Waypoint'
      },
      {
        test: require.resolve('backbone'),
        loader: 'expose?Backbone'
      },
      {
        test: require.resolve('backbone-validation'),
        loader: 'expose?Backbone.Validation'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: plugins
};
