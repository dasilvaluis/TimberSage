import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cssNano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
import moduleImporter from 'sass-module-importer';
import lazypipe from 'lazypipe';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import config from '../config.json';
import enabled from '../enabled.js';

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
