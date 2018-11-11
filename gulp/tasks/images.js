const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const config = require('../config.json');

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', () => {
  const output = gulp.src(config.dependencies.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }]
    }))
    .pipe(gulp.dest(`${config.paths.dist}/images`))
    .pipe(browserSync.stream());
  return output;
});
