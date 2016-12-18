// Locals
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