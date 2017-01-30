var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var eslint      = require('gulp-eslint');

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(paths.dist + 'scripts'))
// ```
var jsTasks = function(filename) {
  return lazypipe()
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.init());
    })
    .pipe(concat, filename)
    .pipe(function() {
      return gulpif(enabled.minify, uglify({
          compress: {
            'drop_debugger': enabled.stripJSDebug
          }
      }));
    })
    .pipe(function() {
      return gulpif(enabled.rev, rev());
    })
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.write('.', {
        sourceRoot: paths.source + 'scripts'
      }));
    })();
};

// ### Scripts
// `gulp scripts` - Runs ESLint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', ['eslint'], function() {
  return gulp.src(deps.js)
    .pipe(jsTasks('main.js'))
    .pipe(writeToManifest('scripts'));
});

// ### ESLint
// `gulp eslint` - Lints configuration JSON and project JS.
// Configure linter options in eslint.json
gulp.task('eslint', function() { 
  return gulp.src(['../gulpfile.js', '../config.json'].concat(config.jslintFiles))
    // eslint() attaches the lint output to the "eslint" property 
    // of the file object so it can be used by other modules. 
    .pipe(eslint({configFile: 'eslint.json'}))
    // eslint.format() outputs the lint results to the console. 
    // Alternatively use eslint.formatEach() (see Docs). 
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on 
    // lint error, return the stream and pipe to failAfterError last. 
    .pipe(gulpif(enabled.failJSHint, eslint.failAfterError()));
});