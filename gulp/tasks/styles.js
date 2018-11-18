const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssNano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const moduleImporter = require('sass-module-importer');
const lazypipe = require('lazypipe');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const config = require('../config.json');

// ### CSS processing pipeline
// Example
// ```
// gulp.src(cssFiles)
//   .pipe(cssTasks('main.css')
//   .pipe(gulp.dest(paths.dist + 'styles'))
// ```
function cssTasks(filename) {
  return lazypipe()
    .pipe(() => gulpif(enabled.maps, sourcemaps.init()))
    .pipe(() => gulpif('*.less', less()))
    .pipe(() => gulpif('*.scss', sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      errLogToConsole: !enabled.failStyleTask,
      importer: moduleImporter(),
    })))
    .pipe(concat, filename)
    .pipe(autoprefixer, {
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12',
      ],
    })
    .pipe(() => gulpif(enabled.minify, cssNano({
      safe: true,
    })))
    .pipe(() => gulpif(enabled.maps, sourcemaps.write('.', {
      sourceRoot: `${config.paths.source}/styles`,
    })))();
}


// ## Gulp tasks
// Run `gulp -T` for a task summary

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', () => {
  const output = gulp.src(config.dependencies.css)
    .pipe(gulpif(!enabled.failStyleTask, plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    })))
    .pipe(cssTasks('main.css'))
    .pipe(gulp.dest(`${config.paths.dist}/styles`))
    .pipe(browserSync.stream());
  return output;
});
