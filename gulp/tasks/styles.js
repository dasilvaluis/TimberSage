var sass            = require('gulp-sass');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var cssNano         = require('gulp-cssnano');
var sourcemaps      = require('gulp-sourcemaps');
var concat          = require('gulp-concat');
var notify          = require('gulp-notify');
var moduleImporter  = require('sass-module-importer');

// ### CSS processing pipeline
// Example
// ```
// gulp.src(cssFiles)
//   .pipe(cssTasks('main.css')
//   .pipe(gulp.dest(paths.dist + 'styles'))
// ```
var cssTasks = function(filename) {
  return lazypipe()
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.init());
    })
    .pipe(function() {
      return gulpif('*.less', less());
    })
    .pipe(function() {
      return gulpif('*.scss', sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        errLogToConsole: !enabled.failStyleTask,
        importer: moduleImporter()
      }));
    })
    .pipe(concat, filename)
    .pipe(autoprefixer, {
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    })
    .pipe(function() {
      return gulpif(enabled.minify, cssNano({
        safe: true
      }));
    })
    .pipe(function() {
      return gulpif(enabled.rev, rev());
    })
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.write('.', {
        sourceRoot: paths.source + 'styles'
      }));
    })();
};


// ## Gulp tasks
// Run `gulp -T` for a task summary

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', function() {
  return gulp.src(deps.css)
    .pipe(gulpif(!enabled.failStyleTask, plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')
    })))
    .pipe(cssTasks('main.css'))
    .pipe(writeToManifest('styles'));
});
