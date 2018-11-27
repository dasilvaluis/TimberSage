import gulp from 'gulp';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import config from '../config.json';

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
