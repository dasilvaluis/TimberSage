// Locals
var merge           = require('merge-stream');
var runSequence     = require('run-sequence');
var argv            = require('minimist')(process.argv.slice(2));

// Globals
global.rev          = require('gulp-rev');
global.plumber      = require('gulp-plumber');
global.lazypipe     = require('lazypipe');
global.gulp         = require('gulp');
global.gulpif       = require('gulp-if');
global.browserSync  = require('browser-sync').create();

// CLI options
global.enabled = {
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

global.config = require('./config.json'),
global.deps   = config.dependencies,
global.paths  = config.paths;

// Path to the compiled assets manifest in the dist directory
var revManifest = paths.dist + 'assets.json';

// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
global.writeToManifest = function(directory) {
  return lazypipe()
    .pipe(gulp.dest, paths.dist + directory)
    .pipe(browserSync.stream, {match: '**/*.{js,css}'})
    .pipe(rev.manifest, revManifest, {
      base: paths.dist,
      merge: true
    })
    .pipe(gulp.dest, paths.dist)();
};

require('require-dir')('./gulp-tasks');

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
  gulp.watch([paths.source + 'scripts/**/*'], ['scripts']);
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
