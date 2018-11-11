const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const merge = require('merge-stream');
const lazypipe = require('lazypipe');
const browserSync = require('browser-sync');
const config = require('../config.json');
const enabled = require('../enabled.js');

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(paths.dist + 'scripts'))
// ```
function jsTasks(independent = false) {
  return lazypipe()
    .pipe(() => gulpif(enabled.maps, sourcemaps.init()))
    .pipe(() => gulpif(!independent, concat('main.js')))
    .pipe(() => gulpif(enabled.minify, uglify({
      compress: { drop_debugger: enabled.stripJSDebug },
    })))
    .pipe(() => gulpif(enabled.maps, sourcemaps.write('.', {
      sourceRoot: `${config.paths.source}/scripts`,
    })))();
}

// ### ESLint
// `gulp eslint` - Lints configuration JSON and project JS.
// Configure linter options in eslint.json
gulp.task('eslint', () => {
  const output = gulp.src(config.jslintFiles)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({ configFile: 'eslint.json' }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpif(enabled.failJSHint, eslint.failAfterError()));
  return output;
});

// ### Scripts
// `gulp scripts` - Runs ESLint then compiles, combines, and optimizes JS
gulp.task('scripts', () => {
  const merged = merge();
  merged.add(
    gulp.src(config.dependencies.js.main)
      .pipe(jsTasks())
  );
  merged.add(
    gulp.src(config.dependencies.js.independent)
      .pipe(jsTasks(true))
  );
  return merged.pipe(gulp.dest(`${config.paths.dist}/scripts`))
    .pipe(browserSync.stream());
});
