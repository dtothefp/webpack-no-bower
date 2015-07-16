import path, {join} from 'path';
import webpack from 'webpack';
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

export default function(opts) {
  var {task} = opts;
  let entry = {};

  const getWebpackConfig = (task) => {
    var provideConfig = {
      head: {
        JSON: 'JSON',
        $: 'jquery',
        jQuery: 'jquery',
        'window.jquery': 'jquery',
      },
      body: {
        JSON: 'JSON',
        $: 'jquery',
        jQuery: 'jquery',
        'window.jquery': 'jquery',
        moment: 'moment-timezone',
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
      }
    };

    var plugins = [
      new webpack.ProvidePlugin(provideConfig[task]),
      new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.FileAppendPlugin(['/src/waypoint.js'])
      ])
    ];

    if(task === 'head') {
      entry['head-script'] = './src/head-script.js';
    } else {
      plugins.push.apply(plugins, [
        new CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.js',
          minChunks: Infinity
        })
      ]);

      entry = {
        vendor: [
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
      };
    }

    return {
      entry,
      plugins
    };
  };

  var config = getWebpackConfig(task);

  return {
    entry: config.entry,
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
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel?optional[]=runtime&stage=0'
        },
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
    plugins: config.plugins
  };

}
