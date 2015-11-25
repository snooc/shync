const gulp = require('gulp');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const del = require('del');
const exec = require('child_process').exec;
const electronPB = require('electron-prebuilt');

// Configuration
// -----------------------------------------------------------------------------
const paths = {
  build: './build',
  static: './static/**/*',
  js: './src/**/*.js'
}
const babelConfig = {
  presets: ['es2015']
};


// Build Cleanup
// -----------------------------------------------------------------------------
function clean(done) {
  return del([paths.build], done);
}

// Static Files
// -----------------------------------------------------------------------------
function static() {
  return gulp.src(paths.static)
    .pipe(gulp.dest(paths.build))
    .pipe(livereload());
}

// Javascript
// -----------------------------------------------------------------------------
function js() {
  return gulp.src(paths.js)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(paths.build))
    .pipe(livereload());
}

// Javascript
// -----------------------------------------------------------------------------
function electron(done) {
  const child = exec(electronPB + ' ' + paths.build + '/main.js', {
    env: {
      SHYNC_ENV: 'development'
    }
  }, (err, stdout, stderr) => {
    if (err) {
      done(err)
    }

    done();
  });
}

// Javascript
// -----------------------------------------------------------------------------
function watch() {
  livereload.listen();
  gulp.watch(paths.js, gulp.parallel(js));
  gulp.watch(paths.static, gulp.parallel(static));
}

// Gulp
// -----------------------------------------------------------------------------
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(static, js)
));

gulp.task('dev', gulp.series(
  clean,
  gulp.parallel(static, js),
  gulp.parallel(electron, watch)
));
