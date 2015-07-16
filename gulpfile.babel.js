import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import sequence from 'run-sequence';
import makeConfig from './webpack.config.js';

const runWebpack = (task, cb) => {
  let config = makeConfig({task});
  let compiler = webpack(config);

  compiler.watch({
    aggregateTimeout: 1000,
    poll: true
  }, (err, stats) => {
    if(err) throw new Error(err);

    gutil.log(stats.toString());
    if(cb) {
      let ogCb = cb;
      cb = null;
      ogCb();
    } else {
      browserSync.reload();
    }
  });
};

gulp.task('copy', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack:head', runWebpack.bind(gulp, 'head'));

gulp.task('webpack:body', runWebpack.bind(gulp, 'body'));

gulp.task('default', (cb) => {
  sequence(
    'copy',
    'webpack:head',
    'webpack:body',
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



