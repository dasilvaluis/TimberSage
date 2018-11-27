import gulp from 'gulp';
import del from 'del';
import config from '../config.json';

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', () => {
  del.bind(null, [config.paths.dist], { force: true });
});
