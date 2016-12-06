// ## Globals
var argv          = require('minimist')(process.argv.slice(2)),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync').create(),
    changed       = require('gulp-changed'),
    concat        = require('gulp-concat'),
    flatten       = require('gulp-flatten'),
    gulp          = require('gulp'),
    gulpif        = require('gulp-if'),
    imagemin      = require('gulp-imagemin'),
    jshint        = require('gulp-jshint'),
    lazypipe      = require('lazypipe'),
    less          = require('gulp-less'),
    merge         = require('merge-stream'),
    cssNano       = require('gulp-cssnano'),
    plumber       = require('gulp-plumber'),
    rev           = require('gulp-rev'),
    runSequence   = require('run-sequence'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify'),
    notify        = require('gulp-notify');

// CLI options
var enabled = {
  // Enable static asset revisioning when `--production`
  rev: argv.production,
  // Disable source maps when `--production`
  maps: !argv.production,
  // Fail styles task on error when `--production`
  failStyleTask: argv.production,
  // Fail due to JSHint warnings only when `--production`
  failJSHint: argv.production,
  // Strip debug statments from javascript when `--production`
  stripJSDebug: argv.production,
  // Minify CSS and JS when `--production`
  minify: argv.production
};


var config  = require('./config.json'),
    deps    = config.dependencies,
    paths   = config.paths;

// Path to the compiled assets manifest in the dist directory
var revManifest = paths.dist + 'assets.json';

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
        errLogToConsole: !enabled.failStyleTask
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


/**
 * Iterates over dependency lists and concatenates each path in an array
 * @param {array} list List of dependencies to be iterated
 * @returns Array of dependencies paths
 */
var sources = function (list){
    var sources = [];
    list.forEach(function(dep) {
        sources.push(paths.source + dep);
    });
    return sources;
};


// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
var writeToManifest = function(directory) {
  return lazypipe()
    .pipe(gulp.dest, paths.dist + directory)
    .pipe(browserSync.stream, {match: '**/*.{js,css}'})
    .pipe(rev.manifest, revManifest, {
      base: paths.dist,
      merge: true
    })
    .pipe(gulp.dest, paths.dist)();
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

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', ['jshint'], function() {
  return gulp.src(deps.js)
    .pipe(jsTasks('main.js'))
    .pipe(writeToManifest('scripts'));
});

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function() {
  return gulp.src(deps.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist + 'fonts'))
    .pipe(browserSync.stream());
});

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function() {
  return gulp.src(deps.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest(paths.dist + 'images'))
    .pipe(browserSync.stream());
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js'].concat('assets/scripts/**/*'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [paths.dist]));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function() {
  browserSync.init({
    files: config.watch,
    proxy: config.devUrl,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
  gulp.watch([paths.source + 'styles/**/*'], ['styles']);
  gulp.watch([paths.source + 'scripts/**/*'], ['jshint', 'scripts']);
  gulp.watch([paths.source + 'fonts/**/*'], ['fonts']);
  gulp.watch([paths.source + 'images/**/*'], ['images']);
  gulp.watch(['assets/config.json'], ['build']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function(callback) {
  runSequence('styles', 'scripts', ['fonts', 'images'], callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
