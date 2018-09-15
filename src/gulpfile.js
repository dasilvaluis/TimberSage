// Locals
var argv            = require('minimist')(process.argv.slice(2));

// Globals
global.browserSync  = require('browser-sync').create();
global.del          = require('del');
global.lazypipe     = require('lazypipe');
global.gulp         = require('gulp');
global.gulpif       = require('gulp-if');
global.merge        = require('merge-stream');
global.plumber      = require('gulp-plumber');
global.rev          = require('gulp-rev');
global.runSequence  = require('run-sequence');

// CLI options
global.enabled = {
  // Enable static asset revisioning when `--prod`
  rev: argv.prod,
  // Disable source maps when `--prod`
  maps: !argv.prod,
  // Fail styles task on error when `--prod`
  failStyleTask: argv.prod,
  // Fail due to JSHint warnings only when `--prod`
  failESHint: argv.prod,
  // Strip debug statments from javascript when `--prod`
  stripJSDebug: argv.prod,
  // Minify CSS and JS when `--prod`
  minify: argv.prod,
  // Generate POT file when '--prod'
  generatePOT: argv.prod,
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
