var path = require('path');
var webpack = require('webpack');
var join = path.join;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var plugins = [
  new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      moment: 'moment-timezone',
      '_': 'underscore',
      Backbone: 'backbone',
      Pikaday: 'pikaday',
      Oform: 'oForm'
  }),
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.FileAppendPlugin(['/src/oForm.js'])
  ]),
  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'commons.js',
    minChunks: 0
  })
];

module.exports = {
  entry: {
    vendor: [
      'underscore',
      'backbone',
      'mustache',
      'moment-timezone',
      'pikaday',
      'Oform'
    ],
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
      {
        test: /node_modules\/oForm\//,
        loader: 'imports?window=>{}!exports?window.Oform'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: plugins
};
