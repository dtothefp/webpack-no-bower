import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import sequence from 'run-sequence';
import makeConfig from './webpack.config.js';

const runWebpack = (task, cb) => {
  let config = makeConfig({task});
  let compiler = webpack(config);

  //compiler.watch({
    //aggregateTimeout: 1000,
    //poll: true
  //}, (err, stats) => {
    //if(err) throw new Error(err);

    //gutil.log(stats.toString());
    //if(cb) {
      //let ogCb = cb;
      //cb = null;
      //ogCb();
    //} else {
      //browserSync.reload();
    //}
  //});

  const server = new WebpackDevServer(compiler, {
    contentBase: './dist',
    hot: true,
    quiet: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: '/',
    //headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true },
    //historyApiFallback: false,
    //proxy: {
      //'*': 'http://localhost:3002'
    //}
  });

  server.listen(8080, 'localhost', cb);
};

gulp.task('copy', () => {
  return gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('webpack:head', runWebpack.bind(gulp, 'head'));

gulp.task('webpack:body', runWebpack.bind(gulp, 'body'));

gulp.task('webpack', (cb) => {
  sequence(
    'webpack:head',
    'webpack:body',
    cb
  );
});

gulp.task('default', (cb) => {
  sequence(
    'copy',
    'webpack',
    'browser-sync',
    cb
  );
});

gulp.task('browser-sync', (cb) => {
  browserSync({
    server: './dist'
  }, cb);
});


//gulp.task('watch', ['default'], (cb) => {
//gulp.watch('./dist/**/*.js').on('change', browserSync.reload);
//});



