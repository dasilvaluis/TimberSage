const gulp = require('gulp');
const flatten = require('gulp-flatten');
const browserSync = require('browser-sync');
const config = require('../config.json');

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', () => {
  const output = gulp.src(config.dependencies.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(`${config.paths.dist}/fonts`))
    .pipe(browserSync.stream());
  return output;
});
