import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import config from '../config.json';

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
